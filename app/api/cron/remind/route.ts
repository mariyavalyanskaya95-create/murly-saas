import { NextResponse } from 'next/server';
import { db, dbReady } from '@/lib/db';
import { L, SITE, esc, tgApi, tgReady, tgSend } from '@/lib/telegram';
import { teacherBalances, teacherKeyboard } from '@/lib/tg-menu';
import { PAID_ENABLED } from '@/lib/plans';

import { uniqLessons } from '@/lib/lesson-dedupe';
export const dynamic = 'force-dynamic';

const TZ = 'Europe/Kyiv';
const time = (iso: string, lang: string) => new Date(iso).toLocaleTimeString(lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'uk-UA', { hour: '2-digit', minute: '2-digit', timeZone: TZ });

// Щоранку: нагадування про сьогоднішні заняття і домашку, яку треба здати до завтра
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const okAuth = secret ? req.headers.get('authorization') === `Bearer ${secret}` : (req.headers.get('user-agent') || '').includes('vercel-cron');
  if (!okAuth) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (!tgReady() || !dbReady()) return NextResponse.json({ skipped: true });

  const tsent = await teacherMorning().catch(() => 0);
  await trialTips().catch((e) => console.error(e));
  const students = await db.query('students?tg_chat_id=not.is.null&select=id,name,tg_chat_id,tg_lang').catch(() => []);
  if (!students.length) return NextResponse.json({ sent: 0, teachers: tsent });
  const now = Date.now();
  const in24 = new Date(now + 24 * 3600 * 1000).toISOString();
  const ids = students.map((s) => String(s.id)).join(',');
  const [lessons, hw, dueWords] = await Promise.all([
    db.query(`lessons?student_id=in.(${ids})&status=eq.planned&start=gte.${encodeURIComponent(new Date(now).toISOString())}&start=lt.${encodeURIComponent(in24)}&select=student_id,start,topic&order=start.asc`).catch(() => []),
    db.query(`homework?student_id=in.(${ids})&status=eq.assigned&due=gte.${encodeURIComponent(new Date(now).toISOString())}&due=lt.${encodeURIComponent(in24)}&select=student_id,title,due`).catch(() => []),
    db.query(`words?student_id=in.(${ids})&or=(srs_due.is.null,srs_due.lte.${encodeURIComponent(new Date(now).toISOString())})&select=student_id`).catch(() => []),
  ]);
  const lessonsU = uniqLessons(lessons);
  let sent = 0;
  for (const s of students) {
    const lang = String(s.tg_lang || 'uk');
    const ls = lessonsU.filter((l) => l.student_id === s.id);
    const hs = hw.filter((h) => h.student_id === s.id);
    const wn = Math.min(15, dueWords.filter((w) => w.student_id === s.id).length);
    if (!ls.length && !hs.length && wn < 4) continue;
    const lines: string[] = [];
    ls.forEach((l) => lines.push(`📅 ${L(lang, { uk: 'Заняття о', ru: 'Занятие в', en: 'Lesson at' })} <b>${time(String(l.start), lang)}</b>${l.topic ? `: ${esc(String(l.topic))}` : ''}`));
    if (wn >= 4) lines.push(`🔁 ${L(lang, { uk: 'Слова на сьогодні', ru: 'Слова на сегодня', en: 'Words for today' })}: <b>${wn}</b> (5 ${L(lang, { uk: 'хв', ru: 'мин', en: 'min' })})`);
    hs.forEach((h) => lines.push(`📝 ${L(lang, { uk: 'Здати до', ru: 'Сдать до', en: 'Due by' })} <b>${time(String(h.due), lang)}</b>: ${esc(String(h.title))}`));
    const ok = await tgSend(String(s.tg_chat_id), `${L(lang, { uk: 'Доброго ранку! Сьогодні:', ru: 'Доброе утро! Сегодня:', en: 'Good morning! Today:' })}\n${lines.join('\n')}`,
      { text: L(lang, { uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' }), url: `${SITE}/student` });
    if (ok) sent++;
  }
  return NextResponse.json({ sent, teachers: tsent });
}

// Учителю зранку: заняття на сьогодні, скільки чекає перевірки, хто чекає оплати
async function teacherMorning() {
  const teachers = await db.query('teacher_settings?tg_chat_id=not.is.null&select=teacher_id,tg_chat_id,tg_lang').catch(() => []);
  const now = new Date(); const in24 = new Date(now.getTime() + 24 * 3600 * 1000);
  let n = 0;
  for (const tr of teachers) {
    const T = encodeURIComponent(String(tr.teacher_id)); const lang = String(tr.tg_lang || 'uk');
    const [ls, st, rev, bal] = await Promise.all([
      db.query(`lessons?teacher_id=eq.${T}&status=eq.planned&start=gte.${encodeURIComponent(now.toISOString())}&start=lt.${encodeURIComponent(in24.toISOString())}&select=student_id,start,topic&order=start.asc`).catch(() => []),
      db.query(`students?teacher_id=eq.${T}&select=id,name`).catch(() => []),
      db.query(`homework?teacher_id=eq.${T}&status=eq.done&select=id`).catch(() => []),
      teacherBalances(String(tr.teacher_id)).catch(() => []),
    ]);
    const lsU = uniqLessons(ls);
    const owe = bal.filter((x) => x.b < 0);
    if (!lsU.length && !rev.length && !owe.length) continue;
    const nm = (id: unknown) => esc(String(st.find((x) => x.id === id)?.name || ''));
    const lines: string[] = [];
    if (lsU.length) {
      lines.push(`<b>${L(lang, { uk: 'Заняття', ru: 'Занятия', en: 'Lessons' })}</b>`);
      lsU.forEach((l) => lines.push(`${time(String(l.start), lang)} ${nm(l.student_id)}${l.topic ? `: ${esc(String(l.topic))}` : ''}`));
    }
    if (rev.length) lines.push('', L(lang, { uk: `На перевірку: <b>${rev.length}</b>`, ru: `На проверку: <b>${rev.length}</b>`, en: `To review: <b>${rev.length}</b>` }));
    if (owe.length) lines.push(L(lang, { uk: `Чекають оплати: <b>${owe.length}</b> (${owe.map((x) => esc(x.name)).join(', ')})`, ru: `Ждут оплаты: <b>${owe.length}</b> (${owe.map((x) => esc(x.name)).join(', ')})`, en: `Awaiting payment: <b>${owe.length}</b> (${owe.map((x) => esc(x.name)).join(', ')})` }));
    const ok = await tgApi('sendMessage', { chat_id: String(tr.tg_chat_id), parse_mode: 'HTML', disable_web_page_preview: true,
      text: `${L(lang, { uk: 'Доброго ранку! Ваш день:', ru: 'Доброе утро! Ваш день:', en: 'Good morning! Your day:' })}\n\n${lines.join('\n').replace(/^\n+/, '')}`,
      reply_markup: teacherKeyboard(lang === 'ru' || lang === 'en' ? lang : 'uk') });
    if (ok) n++;
  }
  return n;
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
