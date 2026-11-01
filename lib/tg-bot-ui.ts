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
  attend: { uk: '✅ Відмітити урок', ru: '✅ Отметить урок', en: '✅ Mark a lesson' },
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
    rows.push([b('attend'), b('addpay')]);
    rows.push([b('debts'), b('review')]);
    rows.push([b('today')]);
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

async function balanceLine(lang: Lang, teacherId: string, name: string) {
  const bal = (await teacherBalances(teacherId)).find((x) => x.name === name);
  if (!bal) return '';
  const lessons = bal.price ? Math.round(Math.abs(bal.b) / bal.price) : 0;
  return bal.b < 0
    ? L(lang, { uk: `До оплати: ${money(-bal.b, lang)}`, ru: `К оплате: ${money(-bal.b, lang)}`, en: `To pay: ${money(-bal.b, lang)}` }) + (lessons ? ` (≈ ${lessons} ${L(lang, { uk: 'зан.', ru: 'зан.', en: 'lessons' })})` : '')
    : bal.b > 0
      ? L(lang, { uk: `Оплачено наперед: ${money(bal.b, lang)}`, ru: `Оплачено наперёд: ${money(bal.b, lang)}`, en: `Paid in advance: ${money(bal.b, lang)}` }) + (lessons ? ` (≈ ${lessons} ${L(lang, { uk: 'зан.', ru: 'зан.', en: 'lessons' })})` : '')
      : L(lang, { uk: 'Боргу немає', ru: 'Долга нет', en: 'Nothing owed' });
}

// ---------- Відмітити урок ----------
const TZ = 'Europe/Kyiv';
const when = (iso: unknown, lang: Lang) => new Date(String(iso)).toLocaleString(lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'uk-UA', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: TZ });

async function recentLessons(teacherId: string) {
  const from = new Date(Date.now() - 4 * 86400000).toISOString();
  const to = new Date(Date.now() + 4 * 3600000).toISOString();
  return db.query(`lessons?teacher_id=eq.${enc(teacherId)}&status=eq.planned&start=gte.${enc(from)}&start=lt.${enc(to)}&select=id,student_id,start,topic&order=start.desc&limit=14`).catch(() => []);
}

// Крок 1: найближчі незакриті заняття (за останні 4 дні і на найближчі години) + «урок не з розкладу»
export async function attendPick(lang: Lang, teacherId: string) {
  const [ls, st] = await Promise.all([recentLessons(teacherId), myStudents(teacherId)]);
  const nm = (id: unknown) => st.find((x) => x.id === id)?.name || '';
  const rows: { text: string; callback_data: string }[][] = ls.map((l) => [{ text: `${when(l.start, lang)} · ${nm(l.student_id)}`.slice(0, 60), callback_data: `tl:${String(l.id).slice(0, 8)}` }]);
  rows.push([{ text: L(lang, { uk: '➕ Урок не з розкладу', ru: '➕ Урок не из расписания', en: '➕ Unscheduled lesson' }), callback_data: 'tn:0' }]);
  const head = ls.length
    ? L(lang, { uk: '✅ <b>Який урок відмітити?</b>', ru: '✅ <b>Какой урок отметить?</b>', en: '✅ <b>Which lesson?</b>' })
    : L(lang, { uk: '✅ Незакритих уроків за останні дні немає. Можна відмітити урок не з розкладу.', ru: '✅ Незакрытых уроков за последние дни нет. Можно отметить урок не из расписания.', en: '✅ No open lessons in the last days. You can mark an unscheduled one.' });
  return { text: head, reply_markup: { inline_keyboard: rows } };
}

// Крок 2: був / пропустив / скасовано
export async function attendAsk(lang: Lang, teacherId: string, id8: string) {
  const [ls, st] = await Promise.all([recentLessons(teacherId), myStudents(teacherId)]);
  const l = ls.find((x) => String(x.id).startsWith(id8));
  if (!l) return { text: L(lang, { uk: 'Урок уже відмічено або не знайдено.', ru: 'Урок уже отмечен или не найден.', en: 'Lesson already marked or not found.' }) };
  const name = st.find((x) => x.id === l.student_id)?.name || '';
  return {
    text: `<b>${esc(name)}</b> · ${when(l.start, lang)}${l.topic ? `\n${esc(String(l.topic))}` : ''}`,
    reply_markup: { inline_keyboard: [[
      { text: L(lang, { uk: '✅ Був', ru: '✅ Был', en: '✅ Attended' }), callback_data: `tx:${id8}:d` },
      { text: L(lang, { uk: '❌ Пропустив', ru: '❌ Пропустил', en: '❌ Missed' }), callback_data: `tx:${id8}:m` },
      { text: L(lang, { uk: '🚫 Скасовано', ru: '🚫 Отменён', en: '🚫 Cancelled' }), callback_data: `tx:${id8}:c` },
    ]] },
  };
}

// Крок 3: зберегти статус, показати баланс, кнопка «Скасувати»
export async function attendSave(lang: Lang, teacherId: string, id8: string, code: string) {
  const status = code === 'd' ? 'done' : code === 'm' ? 'missed' : code === 'c' ? 'cancelled' : '';
  const [ls, st] = await Promise.all([recentLessons(teacherId), myStudents(teacherId)]);
  const l = ls.find((x) => String(x.id).startsWith(id8));
  if (!status || !l) return { text: L(lang, { uk: 'Урок уже відмічено або не знайдено.', ru: 'Урок уже отмечен или не найден.', en: 'Lesson already marked or not found.' }) };
  await db.update('lessons', teacherId, String(l.id), { status });
  const name = st.find((x) => x.id === l.student_id)?.name || '';
  const what = status === 'done' ? L(lang, { uk: 'був на уроці', ru: 'был на уроке', en: 'attended' }) : status === 'missed' ? L(lang, { uk: 'пропустив урок', ru: 'пропустил урок', en: 'missed the lesson' }) : L(lang, { uk: 'урок скасовано', ru: 'урок отменён', en: 'lesson cancelled' });
  const bal = status === 'done' ? await balanceLine(lang, teacherId, name) : '';
  return {
    text: `${status === 'done' ? '✅' : status === 'missed' ? '❌' : '🚫'} <b>${esc(name)}</b>: ${what} · ${when(l.start, lang)}${bal ? `\n${bal}` : ''}`,
    reply_markup: { inline_keyboard: [[{ text: L(lang, { uk: '↩️ Скасувати', ru: '↩️ Отменить', en: '↩️ Undo' }), callback_data: `tr:${l.id}` }]] },
  };
}
export async function attendUndo(lang: Lang, teacherId: string, lessonId: string) {
  if (!/^[0-9a-f-]{36}$/i.test(lessonId)) return null;
  await db.update('lessons', teacherId, lessonId, { status: 'planned' }).catch(() => null);
  return L(lang, { uk: '↩️ Відмітку знято, урок знову в розкладі.', ru: '↩️ Отметка снята, урок снова в расписании.', en: '↩️ Mark removed, the lesson is back in the schedule.' });
}

// Урок не з розкладу: обираємо учня і одразу записуємо проведене заняття зараз
export async function adhocPick(lang: Lang, teacherId: string) {
  const st = await myStudents(teacherId);
  const rows: { text: string; callback_data: string }[][] = [];
  st.forEach((s, i) => { if (i % 2 === 0) rows.push([]); rows[rows.length - 1].push({ text: s.name.slice(0, 28) || '…', callback_data: `tn:${s.id.slice(0, 8)}` }); });
  return { text: L(lang, { uk: '➕ <b>З ким був урок?</b>', ru: '➕ <b>С кем был урок?</b>', en: '➕ <b>Who was the lesson with?</b>' }), reply_markup: { inline_keyboard: rows } };
}
export async function adhocSave(lang: Lang, teacherId: string, id8: string) {
  const s = await findStudent(teacherId, id8);
  if (!s) return { text: L(lang, { uk: 'Учня не знайдено.', ru: 'Ученик не найден.', en: 'Student not found.' }) };
  const id = crypto.randomUUID();
  await db.insert('lessons', [{ id, teacher_id: teacherId, student_id: s.id, start: new Date().toISOString(), duration: 60, status: 'done' }]);
  const bal = await balanceLine(lang, teacherId, s.name);
  return {
    text: `✅ <b>${esc(s.name)}</b>: ${L(lang, { uk: 'урок записано як проведений', ru: 'урок записан как проведённый', en: 'lesson recorded as held' })}${bal ? `\n${bal}` : ''}`,
    reply_markup: { inline_keyboard: [[{ text: L(lang, { uk: '↩️ Скасувати', ru: '↩️ Отменить', en: '↩️ Undo' }), callback_data: `tz:${id}` }]] },
  };
}
export async function adhocUndo(lang: Lang, teacherId: string, lessonId: string) {
  if (!/^[0-9a-f-]{36}$/i.test(lessonId)) return null;
  await db.remove('lessons', teacherId, lessonId).catch(() => null);
  return L(lang, { uk: '↩️ Урок видалено.', ru: '↩️ Урок удалён.', en: '↩️ Lesson removed.' });
}

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
