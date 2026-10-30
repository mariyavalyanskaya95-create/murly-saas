// Бот Murly: постійне меню-кнопки внизу і запис оплат учителем.
// Емодзі тут лише в кнопках бота (так просила власниця), на сайті їх немає.
import { db } from './db';
import { L, esc } from './telegram';
import { teacherBalances } from './tg-menu';

type Lang = 'uk' | 'ru' | 'en';
type T3 = { uk: string; ru: string; en: string };
const enc = encodeURIComponent;

// Кнопки меню: дія -> підписи трьома мовами
export const BTN: Record<string, T3> = {
  addpay: { uk: '💳 Оплатили', ru: '💳 Оплатили', en: '💳 Payment received' },
  review: { uk: '📝 На перевірку', ru: '📝 На проверку', en: '📝 To review' },
  debts: { uk: '💰 Оплати й борги', ru: '💰 Оплаты и долги', en: '💰 Payments' },
  today: { uk: '📅 Розклад', ru: '📅 Расписание', en: '📅 Schedule' },
  pay: { uk: '💰 Оплата', ru: '💰 Оплата', en: '💰 Payments' },
  stats: { uk: '📊 Успішність', ru: '📊 Успеваемость', en: '📊 Progress' },
  next: { uk: '📅 Заняття', ru: '📅 Занятия', en: '📅 Lessons' },
  hw: { uk: '📝 Домашка', ru: '📝 Домашка', en: '📝 Homework' },
  coins: { uk: '🪙 Монетки', ru: '🪙 Монетки', en: '🪙 Coins' },
  lang: { uk: '🌐 Мова', ru: '🌐 Язык', en: '🌐 Language' },
};
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N} ]+/gu, '').replace(/\s+/g, ' ').trim();
const INDEX: Record<string, string> = {};
for (const [k, v] of Object.entries(BTN)) for (const x of [v.uk, v.ru, v.en]) if (!INDEX[norm(x)]) INDEX[norm(x)] = k;
// «💰 Оплата» у вчителя і в батьків однакова за словами з різними діями, тому розрізняємо роль у вебхуку
export const buttonAction = (text: string) => INDEX[norm(text)] || null;

// Постійна клавіатура внизу (вчитель і/або учень чи батьки)
export function replyKeyboard(lang: Lang, o: { teacher?: boolean; canPay?: boolean; coins?: boolean; student?: boolean }) {
  const b = (k: string) => ({ text: L(lang, BTN[k]) });
  const rows: { text: string }[][] = [];
  if (o.teacher) {
    rows.push([b('addpay'), b('debts')]);
    rows.push([b('review'), b('today')]);
  }
  if (o.student) {
    const r1 = [b('next'), b('hw')];
    const r2 = [b('stats')];
    if (o.canPay) r2.push(b('pay'));
    if (o.coins) r2.push(b('coins'));
    rows.push(r1, r2);
  }
  rows.push([b('lang')]);
  return { keyboard: rows, resize_keyboard: true, is_persistent: true, input_field_placeholder: L(lang, { uk: 'Обери кнопку нижче', ru: 'Выбери кнопку ниже', en: 'Pick a button below' }) };
}

const money = (n: number, lang: Lang) => `${Math.round(n).toLocaleString(lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'uk-UA')} ₴`;

async function myStudents(teacherId: string) {
  const r = await db.query(`students?teacher_id=eq.${enc(teacherId)}&select=id,name,price&order=name.asc`).catch(() => []);
  return r.map((s) => ({ id: String(s.id), name: String(s.name || ''), price: Number(s.price) || 0 }));
}

// Крок 1: список учнів кнопками
export async function payPickStudent(lang: Lang, teacherId: string) {
  const st = await myStudents(teacherId);
  if (!st.length) return { text: L(lang, { uk: 'У тебе ще немає учнів.', ru: 'У тебя пока нет учеников.', en: 'You have no students yet.' }) };
  const rows: { text: string; callback_data: string }[][] = [];
  st.forEach((s, i) => { if (i % 2 === 0) rows.push([]); rows[rows.length - 1].push({ text: s.name.slice(0, 28) || '…', callback_data: `tp:${s.id.slice(0, 8)}` }); });
  return { text: L(lang, { uk: '💳 <b>Хто оплатив?</b>', ru: '💳 <b>Кто оплатил?</b>', en: '💳 <b>Who paid?</b>' }), reply_markup: { inline_keyboard: rows } };
}

async function findStudent(teacherId: string, id8: string) {
  return (await myStudents(teacherId)).find((s) => s.id.startsWith(id8)) || null;
}

// Крок 2: сума (швидкі кнопки за ціною заняття + «Інша сума»)
export async function payPickAmount(lang: Lang, teacherId: string, id8: string) {
  const s = await findStudent(teacherId, id8);
  if (!s) return { text: L(lang, { uk: 'Учня не знайдено.', ru: 'Ученик не найден.', en: 'Student not found.' }) };
  const opts = s.price ? [1, 4, 8].map((n) => ({ text: `${n} ${L(lang, { uk: 'зан.', ru: 'зан.', en: n === 1 ? 'lesson' : 'lessons' })} · ${money(n * s.price, lang)}`, callback_data: `ta:${id8}:${n * s.price}` })) : [];
  const rows = opts.map((o) => [o]);
  rows.push([{ text: L(lang, { uk: '✏️ Інша сума', ru: '✏️ Другая сумма', en: '✏️ Other amount' }), callback_data: `to:${id8}` }]);
  return {
    text: `💳 <b>${esc(s.name)}</b>\n${L(lang, { uk: 'Скільки оплатили?', ru: 'Сколько оплатили?', en: 'How much was paid?' })}${s.price ? `\n${L(lang, { uk: 'Ціна заняття', ru: 'Цена занятия', en: 'Lesson price' })}: ${money(s.price, lang)}` : ''}`,
    reply_markup: { inline_keyboard: rows },
  };
}

// «Інша сума»: просимо відповісти числом (маркер #id8 у тексті, щоб зрозуміти, кому)
export async function payAskCustom(lang: Lang, teacherId: string, id8: string) {
  const s = await findStudent(teacherId, id8);
  if (!s) return null;
  return {
    text: `✏️ ${L(lang, { uk: 'Напиши суму для', ru: 'Напиши сумму для', en: 'Type the amount for' })} <b>${esc(s.name)}</b>, ${L(lang, { uk: 'наприклад 1200', ru: 'например 1200', en: 'e.g. 1200' })}\n#${id8}`,
    reply_markup: { force_reply: true, input_field_placeholder: '1200' },
  };
}
export const customMarker = (replyText: string) => /#([0-9a-f]{8})\s*$/i.exec(replyText || '')?.[1] || null;
export const parseAmount = (s: string) => {
  const n = Number(String(s).replace(/[^\d.,]/g, '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 && n <= 1000000 ? Math.round(n) : null;
};

// Крок 3: записуємо оплату і показуємо новий баланс
export async function paySave(lang: Lang, teacherId: string, id8: string, amount: number) {
  const s = await findStudent(teacherId, id8);
  if (!s) return { text: L(lang, { uk: 'Учня не знайдено.', ru: 'Ученик не найден.', en: 'Student not found.' }) };
  const id = crypto.randomUUID();
  await db.insert('payments', [{ id, teacher_id: teacherId, student_id: s.id, amount, note: 'Telegram', at: new Date().toISOString() }]);
  const bal = (await teacherBalances(teacherId)).find((x) => x.name === s.name);
  let state = '';
  if (bal) {
    const lessons = bal.price ? Math.round(Math.abs(bal.b) / bal.price) : 0;
    state = bal.b < 0
      ? L(lang, { uk: `Ще до оплати: ${money(-bal.b, lang)}`, ru: `Ещё к оплате: ${money(-bal.b, lang)}`, en: `Still to pay: ${money(-bal.b, lang)}` })
      : bal.b > 0
        ? L(lang, { uk: `Оплачено наперед: ${money(bal.b, lang)}`, ru: `Оплачено наперёд: ${money(bal.b, lang)}`, en: `Paid in advance: ${money(bal.b, lang)}` }) + (lessons ? ` (≈ ${lessons} ${L(lang, { uk: 'зан.', ru: 'зан.', en: 'lessons' })})` : '')
        : L(lang, { uk: 'Боргу немає', ru: 'Долга нет', en: 'Nothing owed' });
  }
  return {
    text: `✅ <b>${esc(s.name)}</b> +${money(amount, lang)}\n${state}`,
    reply_markup: { inline_keyboard: [[{ text: L(lang, { uk: '↩️ Скасувати', ru: '↩️ Отменить', en: '↩️ Undo' }), callback_data: `tu:${id}` }]] },
  };
}

export async function payUndo(lang: Lang, teacherId: string, paymentId: string) {
  if (!/^[0-9a-f-]{36}$/i.test(paymentId)) return null;
  await db.query(`payments?id=eq.${enc(paymentId)}&teacher_id=eq.${enc(teacherId)}&select=id`).then(async (r) => {
    if (r[0]) await db.remove('payments', teacherId, paymentId);
  }).catch(() => null);
  return L(lang, { uk: '↩️ Оплату скасовано.', ru: '↩️ Оплата отменена.', en: '↩️ Payment cancelled.' });
}
