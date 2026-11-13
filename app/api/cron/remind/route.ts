import { NextResponse } from 'next/server';
import { db, dbReady } from '@/lib/db';
import { L, SITE, esc, notifyParent, tgReady, tgSend } from '@/lib/telegram';
import { teacherBalances } from '@/lib/tg-menu';
import { PAID_ENABLED } from '@/lib/plans';

export const dynamic = 'force-dynamic';


// Щоранку: нагадування про сьогоднішні заняття і домашку, яку треба здати до завтра
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const okAuth = secret ? req.headers.get('authorization') === `Bearer ${secret}` : (req.headers.get('user-agent') || '').includes('vercel-cron');
  if (!okAuth) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (!tgReady() || !dbReady()) return NextResponse.json({ skipped: true });

  await payReminders().catch((e) => console.error(e));
  await trialTips().catch((e) => console.error(e));
  // Ранкові повідомлення учням і вчителям тепер у /api/cron/morning (за місцевим часом кожного)
  return NextResponse.json({ ok: true });
}

// Пробний місяць: на 7-й день порада, що спробувати; на 25-й нагадування, що місяць закінчується (тільки коли є оплати)
async function trialTips() {
  const rows = await db.query('teacher_settings?tg_chat_id=not.is.null&trial_started_at=not.is.null&select=teacher_id,tg_chat_id,tg_lang,trial_started_at,tips_sent').catch(() => []);
  for (const r of rows) {
    const day = Math.floor((Date.now() - Date.parse(String(r.trial_started_at))) / 864e5);
    const sent = Number(r.tips_sent || 0);
    const lang = String(r.tg_lang || 'uk');
    let text = ''; let next = sent;
    if (day >= 7 && day < 14 && sent < 1) {
      next = 1;
      text = L(lang, {
        uk: '💡 <b>Тиждень з Murly!</b> Три речі, які варто спробувати:\n\n• <b>Activities</b>: готові слайди для розмовної практики, показуй на весь екран\n• <b>Кімната уроку</b>: відео й дошка в одному місці\n• <b>Оплати тут, у боті</b>: кнопка «Оплата», і баланс учня рахується сам',
        ru: '💡 <b>Неделя с Murly!</b> Три вещи, которые стоит попробовать:\n\n• <b>Activities</b>: готовые слайды для разговорной практики, показывай на весь экран\n• <b>Комната урока</b>: видео и доска в одном месте\n• <b>Оплаты здесь, в боте</b>: кнопка «Оплата», и баланс ученика считается сам',
        en: '💡 <b>One week with Murly!</b> Three things worth trying:\n\n• <b>Activities</b>: ready speaking slides, show them full screen\n• <b>Lesson room</b>: video and whiteboard in one place\n• <b>Payments right here in the bot</b>: tap “Payment” and the balance updates itself',
      });
    } else if (PAID_ENABLED && day >= 25 && day < 30 && sent < 2) {
      next = 2;
      text = L(lang, {
        uk: '⏳ Безкоштовний місяць закінчується через кілька днів. Щоб лишити всіх учнів і всі матеріали, обери Pro. Якщо ні, кабінет перейде на «Старт»: дані збережуться, активними будуть 3 учні.',
        ru: '⏳ Бесплатный месяц заканчивается через несколько дней. Чтобы оставить всех учеников и все материалы, выбери Pro. Если нет, кабинет перейдёт на «Старт»: данные сохранятся, активными будут 3 ученика.',
        en: '⏳ Your free month ends in a few days. To keep all students and materials, choose Pro. Otherwise the dashboard moves to Start: your data stays, and 3 students remain active.',
      });
    }
    if (!text) continue;
    const ok = await tgSend(String(r.tg_chat_id), text, { text: L(lang, { uk: 'Відкрити Murly', ru: 'Открыть Murly', en: 'Open Murly' }), url: next === 2 ? `${SITE}/pricing` : `${SITE}/activities` });
    if (ok) await db.patchWhere(`teacher_settings?teacher_id=eq.${encodeURIComponent(String(r.teacher_id))}`, { tips_sent: next });
  }
}

// Нагадування про оплату: вчитель вмикає для конкретного учня. Не частіше разу на 7 днів.
// Дорослому пишемо йому, за дитину пишемо батькам (дитині про гроші не пишемо).
async function payReminders() {
  const rows = await db.query('students?pay_remind=is.true&select=id,name,teacher_id,is_adult,tg_chat_id,tg_lang,pay_reminded_at').catch(() => []);
  if (!rows.length) return;
  const week = Date.now() - 7 * 864e5;
  const byT = new Map<string, typeof rows>();
  rows.forEach((r) => { const k = String(r.teacher_id); byT.set(k, [...(byT.get(k) ?? []), r]); });
  for (const [tid, list] of Array.from(byT.entries())) {
    const due = list.filter((r) => !r.pay_reminded_at || new Date(String(r.pay_reminded_at)).getTime() < week);
    if (!due.length) continue;
    const [bal, ts] = await Promise.all([
      teacherBalances(tid).catch(() => []),
      db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(tid)}&select=name`).catch(() => []),
    ]);
    const tname = String(ts[0]?.name || '').trim();
    for (const r of due) {
      const b = bal.find((x) => x.id === String(r.id));
      if (!b || b.b >= 0) continue;
      const sum = Math.round(-b.b); const n = b.price ? Math.ceil(-b.b / b.price) : 0;
      const from = (lang: string) => tname ? L(lang, { uk: `Нагадування від ${esc(tname)}`, ru: `Напоминание от ${esc(tname)}`, en: `A reminder from ${esc(tname)}` }) : L(lang, { uk: 'Нагадування від вчителя', ru: 'Напоминание от учителя', en: 'A reminder from your teacher' });
      const lessons = (lang: string) => n ? ` (${n} ${L(lang, { uk: 'зан.', ru: 'зан.', en: n === 1 ? 'lesson' : 'lessons' })})` : '';
      const tail = (lang: string) => L(lang, { uk: 'Якщо ви вже оплатили, просто не зважайте на це повідомлення. Дякуємо!', ru: 'Если вы уже оплатили, просто не обращайте внимания на это сообщение. Спасибо!', en: 'If you have already paid, please ignore this message. Thank you!' });
      let ok = false;
      if (r.is_adult) {
        if (r.tg_chat_id) { const lang = String(r.tg_lang || 'uk'); ok = await tgSend(String(r.tg_chat_id), `💳 ${from(lang)}\n\n${L(lang, { uk: 'За заняття англійською є заборгованість', ru: 'За занятия английским есть задолженность', en: 'There is an outstanding balance for your English lessons' })}: <b>${sum} ₴</b>${lessons(lang)}.\n\n${tail(lang)}`); }
      } else {
        const nm = esc(String(r.name || ''));
        ok = await notifyParent(String(r.id), (lang) => `💳 ${from(lang)}\n\n${L(lang, { uk: `За заняття ${nm} є заборгованість`, ru: `За занятия ${nm} есть задолженность`, en: `There is an outstanding balance for ${nm}'s lessons` })}: <b>${sum} ₴</b>${lessons(lang)}.\n\n${tail(lang)}`);
      }
      if (ok) await db.patchWhere(`students?id=eq.${encodeURIComponent(String(r.id))}`, { pay_reminded_at: new Date().toISOString() }).catch(() => null);
    }
  }
}
