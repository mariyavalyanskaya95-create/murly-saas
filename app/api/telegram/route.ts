import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { linksOf, menuAnswer, notLinked, teacherAnswer, teacherOf } from '@/lib/tg-menu';
import { buttonAction, customMarker, parseAmount, payAskCustom, payPickAmount, payPickStudent, paySave, payUndo, replyKeyboard } from '@/lib/tg-bot-ui';
import { L, LANG_ASK, LANG_KEYBOARD, parsePayload, setupBotProfile, tgApi, setupWebhook, teacherLink, tgReady, tgSend, webhookSecret } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

// Вебхук бота: /start <код> прив’язує Telegram до учня, батьків або вчителя; /language і кнопки міняють мову
type Upd = {
  message?: { chat?: { id?: number }; text?: string; reply_to_message?: { text?: string } };
  callback_query?: { id: string; data?: string; message?: { chat?: { id?: number }; message_id?: number } };
};
// Постійне меню-кнопки внизу: для вчителя, учня чи батьків (або всі разом, якщо це один Telegram)
async function sendMenu(chat: number) {
  const [{ lang: sl, links }, teacher] = await Promise.all([linksOf(chat), teacherOf(chat)]);
  if (!teacher && !links.length) return;
  const lang = teacher?.lang ?? sl;
  const kb = replyKeyboard(lang, {
    teacher: Boolean(teacher), student: links.length > 0,
    canPay: links.some((k) => k.role === 'parent' || Boolean(k.s.is_adult)), coins: links.some((k) => !k.s.is_adult),
  });
  const hi = teacher
    ? L(lang, { uk: '🐱 <b>Murly</b> · кабінет учителя\nМеню завжди внизу: оплати, перевірка, розклад.', ru: '🐱 <b>Murly</b> · кабинет учителя\nМеню всегда внизу: оплаты, проверка, расписание.', en: '🐱 <b>Murly</b> · teacher\nThe menu is always at the bottom: payments, reviews, schedule.' })
    : L(lang, { uk: '🐱 <b>Murly</b>\nМеню завжди внизу: заняття, домашка, успішність.', ru: '🐱 <b>Murly</b>\nМеню всегда внизу: занятия, домашка, успеваемость.', en: '🐱 <b>Murly</b>\nThe menu is always at the bottom: lessons, homework, progress.' });
  await tgApi('sendMessage', { chat_id: chat, text: hi, parse_mode: 'HTML', reply_markup: kb });
}
const html = (chat: number, text: string, reply_markup?: unknown) => tgApi('sendMessage', { chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true, ...(reply_markup ? { reply_markup } : {}) });
const DONE_LANG = { uk: 'Готово! Повідомлення будуть українською.', ru: 'Готово! Сообщения будут на русском.', en: 'Done! Messages will be in English.' };

// Змінити мову всюди, де цей чат підключений (учень, батьки, вчитель)
async function setLang(chat: number, lang: 'uk' | 'ru' | 'en') {
  const c = encodeURIComponent(String(chat));
  await Promise.all([
    db.patchWhere(`students?tg_chat_id=eq.${c}`, { tg_lang: lang }).catch(() => null),
    db.patchWhere(`students?parent_tg_chat_id=eq.${c}`, { parent_tg_lang: lang }).catch(() => null),
    db.patchWhere(`teacher_settings?tg_chat_id=eq.${c}`, { tg_lang: lang }).catch(() => null),
  ]);
}

export async function POST(req: Request) {
  if (!tgReady() || req.headers.get('x-telegram-bot-api-secret-token') !== webhookSecret()) return NextResponse.json({ ok: false }, { status: 401 });
  const u = await req.json().catch(() => null) as Upd | null;

  // натиснули кнопку мови
  const cq = u?.callback_query;
  // кнопки меню: оплата, успішність, монетки, заняття, домашка
  // кнопки вчителя
  if (cq && /^t[paou]:/.test(cq.data || '')) {
    const chat = cq.message?.chat?.id;
    await tgApi('answerCallbackQuery', { callback_query_id: cq.id });
    const teacher = chat && dbReady() ? await teacherOf(chat) : null;
    if (!chat || !teacher) return NextResponse.json({ ok: true });
    const [kind, a, b] = (cq.data || '').split(':');
    if (kind === 'tp') { const r = await payPickAmount(teacher.lang, teacher.id, a); await html(chat, r.text, r.reply_markup); }
    if (kind === 'ta') { const n = parseAmount(b); if (n) { const r = await paySave(teacher.lang, teacher.id, a, n); await html(chat, r.text, r.reply_markup); } }
    if (kind === 'to') { const r = await payAskCustom(teacher.lang, teacher.id, a); if (r) await html(chat, r.text, r.reply_markup); }
    if (kind === 'tu') {
      const id = (cq.data || '').slice(3);
      const msg = await payUndo(teacher.lang, teacher.id, id);
      if (msg) await tgApi('editMessageText', { chat_id: chat, message_id: cq.message?.message_id, text: msg });
    }
    return NextResponse.json({ ok: true });
  }
  if (cq && /^t:/.test(cq.data || '')) {
    const chat = cq.message?.chat?.id;
    await tgApi('answerCallbackQuery', { callback_query_id: cq.id });
    const teacher = chat && dbReady() ? await teacherOf(chat) : null;
    if (chat && teacher) {
      const text = await teacherAnswer((cq.data || '').slice(2), teacher.lang, teacher.id);
      if (text) await html(chat, text);
    }
    return NextResponse.json({ ok: true });
  }
  if (cq && /^m:/.test(cq.data || '')) {
    const chat = cq.message?.chat?.id;
    await tgApi('answerCallbackQuery', { callback_query_id: cq.id });
    if (!chat || !dbReady()) return NextResponse.json({ ok: true });
    const kind = (cq.data || '').slice(2);
    if (kind === 'lang') { await tgApi('sendMessage', { chat_id: chat, text: LANG_ASK, reply_markup: LANG_KEYBOARD }); return NextResponse.json({ ok: true }); }
    const { lang, links } = await linksOf(chat);
    if (!links.length) { await tgSend(chat, notLinked); return NextResponse.json({ ok: true }); }
    const text = await menuAnswer(kind, lang, links);
    await html(chat, text);
    return NextResponse.json({ ok: true });
  }
  if (cq) {
    const lang = /^lang:(uk|ru|en)$/.exec(cq.data || '')?.[1] as 'uk' | 'ru' | 'en' | undefined;
    const chat = cq.message?.chat?.id;
    if (lang && chat && dbReady()) {
      await setLang(chat, lang);
      await tgApi('answerCallbackQuery', { callback_query_id: cq.id, text: DONE_LANG[lang] });
      await tgApi('editMessageText', { chat_id: chat, message_id: cq.message?.message_id, text: DONE_LANG[lang] });
      await sendMenu(chat);
    } else await tgApi('answerCallbackQuery', { callback_query_id: cq.id });
    return NextResponse.json({ ok: true });
  }

  const chat = u?.message?.chat?.id; const text = u?.message?.text || '';
  if (!chat) return NextResponse.json({ ok: true });
  // відповідь сумою на «Інша сума»
  const marker = customMarker(u?.message?.reply_to_message?.text || '');
  if (marker && dbReady()) {
    const teacher = await teacherOf(chat);
    if (teacher) {
      const n = parseAmount(text);
      if (!n) await tgSend(chat, L(teacher.lang, { uk: 'Не зрозуміла суму. Напиши лише число, наприклад 1200.', ru: 'Не поняла сумму. Напиши только число, например 1200.', en: 'I did not get the amount. Type just a number, e.g. 1200.' }));
      else { const r = await paySave(teacher.lang, teacher.id, marker, n); await html(chat, r.text, r.reply_markup); }
      return NextResponse.json({ ok: true });
    }
  }
  // кнопки постійного меню
  const act = buttonAction(text);
  if (act && dbReady()) {
    if (act === 'lang') { await tgApi('sendMessage', { chat_id: chat, text: LANG_ASK, reply_markup: LANG_KEYBOARD }); return NextResponse.json({ ok: true }); }
    if (['addpay', 'review', 'debts', 'today'].includes(act)) {
      const teacher = await teacherOf(chat);
      if (teacher) {
        if (act === 'addpay') { const r = await payPickStudent(teacher.lang, teacher.id); await html(chat, r.text, r.reply_markup); }
        else { const t2 = await teacherAnswer(act === 'debts' ? 'pay' : act, teacher.lang, teacher.id); if (t2) await html(chat, t2); }
      }
      return NextResponse.json({ ok: true });
    }
    const { lang, links } = await linksOf(chat);
    if (!links.length) { await tgSend(chat, notLinked); return NextResponse.json({ ok: true }); }
    await html(chat, await menuAnswer(act, lang, links));
    return NextResponse.json({ ok: true });
  }
  if (/^\/(menu|help)\b/i.test(text)) {
    if (dbReady()) await sendMenu(chat);
    return NextResponse.json({ ok: true });
  }
  if (/^\/(language|lang|mova|yazyk)\b/i.test(text)) {
    await tgApi('sendMessage', { chat_id: chat, text: LANG_ASK, reply_markup: LANG_KEYBOARD });
    return NextResponse.json({ ok: true });
  }
  const m = /^\/start(?:\s+(\S+))?/.exec(text);
  const p = m?.[1] ? parsePayload(m[1]) : null;
  if (!p || !dbReady()) {
    await tgSend(chat, 'Привіт! Це бот Murly. Щоб отримувати сповіщення, відкрий посилання від учителя або натисни «Підключити Telegram» у своєму кабінеті на murly.com.ua.\n\nПривет! Это бот Murly. Чтобы получать уведомления, открой ссылку от учителя или нажми «Подключить Telegram» в кабинете на murly.com.ua.\n\nHi! This is the Murly bot. To get notifications, open the link from your teacher or press Connect Telegram in your account on murly.com.ua.');
    return NextResponse.json({ ok: true });
  }
  try {
    if (p.kind === 'student') {
      await db.patchWhere(`students?id=eq.${encodeURIComponent(p.id)}`, { tg_chat_id: String(chat), tg_lang: p.lang });
      await tgSend(chat, L(p.lang, {
        uk: 'Готово! Тепер сюди приходитимуть нові домашки, нагадування про заняття і коментарі вчителя.',
        ru: 'Готово! Теперь сюда будут приходить новые домашки, напоминания о занятиях и комментарии учителя.',
        en: 'Done! New homework, lesson reminders and teacher comments will come here.',
      }));
    } else if (p.kind === 'parent') {
      await db.patchWhere(`students?id=eq.${encodeURIComponent(p.id)}`, { parent_tg_chat_id: String(chat), parent_tg_lang: p.lang });
      await tgSend(chat, L(p.lang, {
        uk: 'Готово! Сюди приходитимуть нові домашки дитини від учителя.',
        ru: 'Готово! Сюда будут приходить новые домашки ребёнка от учителя.',
        en: 'Done! Your child’s new homework from the teacher will come here.',
      }));
    } else {
      await db.upsert('teacher_settings', [{ teacher_id: p.id, tg_chat_id: String(chat), tg_lang: p.lang }]);
      await tgSend(chat, L(p.lang, {
        uk: 'Готово! Сюди приходитимуть здані домашки ваших учнів.',
        ru: 'Готово! Сюда будут приходить сданные домашки ваших учеников.',
        en: 'Done! Homework your students hand in will come here.',
      }));
    }
    // одразу пропонуємо обрати мову
    await tgApi('sendMessage', { chat_id: chat, text: LANG_ASK, reply_markup: LANG_KEYBOARD });
  } catch {
    await tgSend(chat, 'Не вдалося підключити. Спробуй ще раз пізніше. / Не удалось подключить, попробуй позже. / Could not connect, please try again later.');
  }
  return NextResponse.json({ ok: true });
}

// Для вчителя: стан бота, посилання для підключення, налаштування вебхука
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (!tgReady()) return NextResponse.json({ ready: false });
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'uk';
  let linked = false;
  try { const r = await db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(userId)}&select=tg_chat_id`); linked = Boolean(r[0]?.tg_chat_id); } catch { /* */ }
  const hook = url.searchParams.get('setup') ? await setupWebhook(url.origin) : undefined;
  const profile = url.searchParams.get('profile') ? await setupBotProfile() : undefined;
  // діагностика вебхука (без токена)
  let diag: Record<string, unknown> | undefined;
  if (url.searchParams.get('diag')) {
    const w = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getWebhookInfo`).then((r) => r.json()).catch(() => null);
    diag = w?.result ? { url: w.result.url, pending: w.result.pending_update_count, lastError: w.result.last_error_message, lastErrorAt: w.result.last_error_date } : { error: 'no_info' };
  }
  return NextResponse.json({ ready: true, linked, link: teacherLink(userId, lang), hook, profile, diag });
}

// Тестове повідомлення вчителю: PUT /api/telegram
export async function PUT() {
  const { userId } = await auth();
  if (!userId || !tgReady() || !dbReady()) return NextResponse.json({ ok: false }, { status: 400 });
  const r = await db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(userId)}&select=tg_chat_id,tg_lang`).catch(() => []);
  const chat = r[0]?.tg_chat_id;
  if (!chat) return NextResponse.json({ ok: false, error: 'not_linked' });
  const ok = await tgSend(String(chat), L(String(r[0]?.tg_lang || 'uk'), { uk: 'Тест від Murly: сповіщення працюють ✓', ru: 'Тест от Murly: уведомления работают ✓', en: 'Murly test: notifications work ✓' }));
  return NextResponse.json({ ok });
}
