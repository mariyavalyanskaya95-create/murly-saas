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
    ], [
      { text: L(lang, { uk: '💸 Не прийшов, оплату списати', ru: '💸 Не пришёл, оплату списать', en: '💸 No-show, charge it' }), callback_data: `tx:${id8}:p` },
    ]] },
  };
}

// Крок 3: зберегти статус, показати баланс, кнопка «Скасувати»
export async function attendSave(lang: Lang, teacherId: string, id8: string, code: string) {
  const status = code === 'd' ? 'done' : code === 'm' ? 'missed' : code === 'p' ? 'charged' : code === 'c' ? 'cancelled' : '';
  const [ls, st] = await Promise.all([recentLessons(teacherId), myStudents(teacherId)]);
  const l = ls.find((x) => String(x.id).startsWith(id8));
  if (!status || !l) return { text: L(lang, { uk: 'Урок уже відмічено або не знайдено.', ru: 'Урок уже отмечен или не найден.', en: 'Lesson already marked or not found.' }) };
  await db.update('lessons', teacherId, String(l.id), { status });
  const name = st.find((x) => x.id === l.student_id)?.name || '';
  const what = status === 'done' ? L(lang, { uk: 'був на уроці', ru: 'был на уроке', en: 'attended' }) : status === 'charged' ? L(lang, { uk: 'не прийшов, урок оплачений', ru: 'не пришёл, урок оплачен', en: 'no-show, lesson charged' }) : status === 'missed' ? L(lang, { uk: 'пропустив урок', ru: 'пропустил урок', en: 'missed the lesson' }) : L(lang, { uk: 'урок скасовано', ru: 'урок отменён', en: 'lesson cancelled' });
  const bal = status === 'done' || status === 'charged' ? await balanceLine(lang, teacherId, name) : '';
  return {
    text: `${status === 'done' ? '✅' : status === 'charged' ? '💸' : status === 'missed' ? '❌' : '🚫'} <b>${esc(name)}</b>: ${what} · ${when(l.start, lang)}${bal ? `\n${bal}` : ''}`,
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

// ---------- Оплата звичайним повідомленням ----------
// «Аня оплатила 1600», «оплата Ігор 4 уроки», «від Полини прийшло 800 грн», «Yeva +1200», «Соломія 2 заняття»
const fold = (s: string) => s.toLowerCase().replace(/[іїий]/g, 'и').replace(/[єё]/g, 'е').replace(/ы/g, 'и').replace(/ʼ|’|'/g, '');
const LESSON_WORD = /^(урок|занят|lesson|пар)/;
export async function payFromText(lang: Lang, teacherId: string, text: string) {
  const st = await myStudents(teacherId);
  const words = fold(text).split(/[^\p{L}\p{N}+.,]+/u).filter(Boolean);
  // сума або кількість уроків
  const raw = fold(text).replace(/(\d)[\s.](?=\d{3}\b)/g, '$1');
  const nm = /(\d+(?:[.,]\d+)?)\s*([\p{L}₴]*)/u.exec(raw);
  let amount: number | null = null; let lessons = 0;
  if (nm) {
    const n = Math.round(Number(nm[1].replace(',', '.')));
    const unit = nm[2] || '';
    if (LESSON_WORD.test(unit) || (!/грн|uah|₴|гр/.test(unit) && n > 0 && n <= 20)) lessons = n; else if (n > 0 && n <= 1000000) amount = n;
  }
  // учень за іменем (з відмінками: Аня, Ані, Аню; Ігор, Ігоря)
  const hits = st.filter((s) => {
    const first = fold(s.name.split(/\s+/)[0] || '');
    if (first.length < 2) return false;
    const stem = first.slice(0, Math.max(2, Math.min(first.length - 1, 5)));
    return words.some((w) => w.startsWith(stem) && w.length <= first.length + 3);
  });
  const price = (s: { price: number }) => (lessons ? lessons * s.price : amount || 0);
  if (hits.length === 1) {
    const s = hits[0];
    const sum = price(s);
    if (sum > 0) return paySave(lang, teacherId, s.id.slice(0, 8), sum);
    return payPickAmount(lang, teacherId, s.id.slice(0, 8));
  }
  const pool = hits.length > 1 ? hits : st;
  if ((amount || lessons) && pool.length) {
    const rows: { text: string; callback_data: string }[][] = [];
    pool.forEach((s, i) => { const sum = price(s); if (!sum) return; if (i % 2 === 0 || !rows.length) rows.push([]); rows[rows.length - 1].push({ text: `${s.name.slice(0, 20)} · ${money(sum, lang)}`, callback_data: `ta:${s.id.slice(0, 8)}:${sum}` }); });
    if (rows.length) return { text: L(lang, { uk: '💳 <b>Від кого оплата?</b>', ru: '💳 <b>От кого оплата?</b>', en: '💳 <b>Who is the payment from?</b>' }), reply_markup: { inline_keyboard: rows } };
  }
  return {
    text: L(lang, {
      uk: 'Щоб записати оплату, напиши, наприклад:\n«Аня оплатила 1600»\n«Ігор 4 уроки»\n«від Полини прийшло 800 грн»\n\nАбо натисни «💳 Оплатили» внизу.',
      ru: 'Чтобы записать оплату, напиши, например:\n«Аня оплатила 1600»\n«Игорь 4 урока»\n«от Полины пришло 800 грн»\n\nИли нажми «💳 Оплатили» внизу.',
      en: 'To record a payment, write for example:\n“Anna paid 1600”\n“Ihor 4 lessons”\n\nOr tap “💳 Payment received” below.',
    }),
  };
}

// ---------- Домашка на перевірку: список кнопками, перегляд відповідей повідомленням ----------
import type { Section } from './exercise';
import { grade, normalizeSections } from './exercise';
import { notifyStudent, SITE } from './telegram';

async function doneHomework(teacherId: string) {
  return db.query(`homework?teacher_id=eq.${enc(teacherId)}&status=eq.done&select=id,student_id,title,kind,game,score,total,answer,items,answers,overrides,done_at,student_note&order=done_at.asc&limit=30`).catch(() => []);
}

export async function reviewList(lang: Lang, teacherId: string) {
  const [hw, st] = await Promise.all([doneHomework(teacherId), myStudents(teacherId)]);
  if (!hw.length) return { text: L(lang, { uk: '📝 Усе перевірено, нових здач немає.', ru: '📝 Всё проверено, новых сдач нет.', en: '📝 All checked, nothing new.' }) };
  const nm = (id: unknown) => st.find((s) => s.id === id)?.name || '';
  const rows = hw.slice(0, 20).map((h) => [{ text: `${nm(h.student_id)} · ${String(h.title || '')}${Number(h.total) ? ` · ${h.score}/${h.total}` : ''}`.slice(0, 60), callback_data: `th:${String(h.id).slice(0, 8)}` }]);
  return { text: L(lang, { uk: `📝 <b>На перевірку: ${hw.length}</b>\nНатисни, щоб подивитися відповіді.`, ru: `📝 <b>На проверку: ${hw.length}</b>\nНажми, чтобы посмотреть ответы.`, en: `📝 <b>To review: ${hw.length}</b>\nTap to see the answers.` }), reply_markup: { inline_keyboard: rows } };
}

// Текст відповідей учня: пропуски з позначками ✓ / ✗ і правильним варіантом
function answersText(sections: Section[], answers: Record<string, string>, overrides: Record<string, boolean>) {
  const { marks } = grade(sections, answers, overrides);
  const out: string[] = [];
  sections.forEach((s, si) => {
    out.push(`\n<b>${esc(s.instruction || '')}</b>`);
    s.tasks.forEach((t, ti) => {
      if (s.type === 'translate') {
        const k = `${si}.${ti}.0`;
        out.push(`${ti + 1}. ${esc(t.prompt || '')} → ${esc(answers[k] || '…')} ${marks[k] ? '✅' : `❌ (${esc(t.answers?.[0] || '')})`}`);
      } else if (s.type === 'open' || s.type === 'scale' || s.type === 'voice') {
        const k = `${si}.${ti}.0`;
        const a = answers[k] || '';
        out.push(`${ti + 1}. ${esc(t.prompt || '')}\n   ✍️ ${s.type === 'voice' ? (a ? '🎙 аудіо на сайті' : '…') : esc(a || '…')}`);
      } else {
        const line = (t.parts ?? []).map((p, pi) => {
          if (p.t === 'text') return esc(p.v);
          const k = `${si}.${ti}.${pi}`;
          const given = answers[k] || '…';
          const right = p.t === 'gap' ? p.answers[0] : p.options[0];
          if (p.t === 'gap' && !p.answers.length) return `[${esc(given)}]`;
          return marks[k] ? `[<b>${esc(given)}</b> ✅]` : `[<s>${esc(given)}</s> ❌ ${esc(right || '')}]`;
        }).join('');
        out.push(`${ti + 1}. ${line}`);
      }
    });
  });
  return out.join('\n');
}

export async function hwView(lang: Lang, teacherId: string, id8: string) {
  const [hw, st] = await Promise.all([doneHomework(teacherId), myStudents(teacherId)]);
  const h = hw.find((x) => String(x.id).startsWith(id8));
  if (!h) return { text: L(lang, { uk: 'Цю домашку вже перевірено або не знайдено.', ru: 'Эту домашку уже проверили или не нашли.', en: 'Already checked or not found.' }) };
  const name = st.find((s) => s.id === h.student_id)?.name || '';
  let body = '';
  if (h.kind === 'text') body = `\n✍️ ${esc(String(h.answer || '…'))}`;
  else if (h.kind === 'exercise' && Array.isArray(h.items)) body = answersText(normalizeSections(h.items as Section[]) ?? [], (h.answers as Record<string, string>) || {}, (h.overrides as Record<string, boolean>) || {});
  else body = `\n${L(lang, { uk: 'Гра або тест: результат зараховано автоматично.', ru: 'Игра или тест: результат засчитан автоматически.', en: 'Game or test: scored automatically.' })}`;
  if (h.student_note) body += `\n\n🗒 <b>${L(lang, { uk: 'Заметки учня', ru: 'Заметки ученика', en: 'Student notes' })}:</b>\n${esc(String(h.student_note))}`;
  let text = `📝 <b>${esc(name)}</b> · ${esc(String(h.title || ''))}${Number(h.total) ? `\n${L(lang, { uk: 'Результат', ru: 'Результат', en: 'Score' })}: <b>${h.score}/${h.total}</b>` : ''}\n${body}`;
  if (text.length > 3800) text = `${text.slice(0, 3700)}\n…\n${L(lang, { uk: 'Повністю на сайті', ru: 'Полностью на сайте', en: 'Full version on the site' })}`;
  return {
    text,
    reply_markup: { inline_keyboard: [
      [{ text: L(lang, { uk: '✅ Перевірено', ru: '✅ Проверено', en: '✅ Checked' }), callback_data: `th:${id8}:c` }, { text: L(lang, { uk: '💬 Написати відгук', ru: '💬 Написать отзыв', en: '💬 Add feedback' }), callback_data: `th:${id8}:f` }],
      [{ text: L(lang, { uk: '🌐 Відкрити на сайті', ru: '🌐 Открыть на сайте', en: '🌐 Open on the site' }), url: `${SITE}/teacher/review` }],
    ] },
  };
}

// «Перевірено» (з відгуком або без): статус checked і повідомлення учню
export async function hwCheck(lang: Lang, teacherId: string, id8: string, feedback?: string) {
  const hw = await doneHomework(teacherId);
  const h = hw.find((x) => String(x.id).startsWith(id8));
  if (!h) return L(lang, { uk: 'Цю домашку вже перевірено.', ru: 'Эту домашку уже проверили.', en: 'Already checked.' });
  await db.update('homework', teacherId, String(h.id), { status: 'checked', ...(feedback ? { feedback } : {}) });
  await notifyStudent(String(h.student_id), (l) => `${L(l, { uk: 'Учитель перевірив', ru: 'Учитель проверил', en: 'Your teacher checked' })}: <b>${esc(String(h.title))}</b>${Number(h.total) ? ` (${h.score}/${h.total})` : ''}${feedback ? `\n\n${esc(feedback)}` : ''}`,
    (l) => ({ text: L(l, { uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' }), url: `${SITE}/student` }));
  return L(lang, { uk: `✅ Перевірено${feedback ? ', відгук надіслано учню' : ''}.`, ru: `✅ Проверено${feedback ? ', отзыв отправлен ученику' : ''}.`, en: `✅ Checked${feedback ? ', feedback sent to the student' : ''}.` });
}
export function hwAskFeedback(lang: Lang, id8: string) {
  return {
    text: `💬 ${L(lang, { uk: 'Напиши відгук учню у відповідь на це повідомлення.', ru: 'Напиши отзыв ученику в ответ на это сообщение.', en: 'Reply to this message with your feedback.' })}\n#r-${id8}`,
    reply_markup: { force_reply: true, input_field_placeholder: L(lang, { uk: 'Молодець! Зверни увагу на...', ru: 'Молодец! Обрати внимание на...', en: 'Well done! Pay attention to...' }) },
  };
}
export const feedbackMarker = (replyText: string) => /#r-([0-9a-f]{8})\s*$/i.exec(replyText || '')?.[1] || null;
