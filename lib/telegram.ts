// Сповіщення в Telegram через свого бота (безкоштовно).
// Потрібні змінні середовища у Vercel: TELEGRAM_BOT_TOKEN і TELEGRAM_BOT_USERNAME (без @).
// Їх вводить власниця сайту сама, у коді ключів немає.
import { createHash, createHmac } from 'crypto';
import { db, dbReady } from './db';

const TOKEN = () => process.env.TELEGRAM_BOT_TOKEN || '';
export const botUsername = () => (process.env.TELEGRAM_BOT_USERNAME || '').replace(/^@/, '');
export const tgReady = () => Boolean(TOKEN() && botUsername());

// секрет для вебхука і підписів: похідний від токена, окремо задавати не треба
export const webhookSecret = () => createHash('sha256').update(`murly-webhook:${TOKEN()}`).digest('hex').slice(0, 48);
const sig = (s: string) => createHmac('sha256', TOKEN()).update(s).digest('base64url').slice(0, 10).replace(/[^A-Za-z0-9]/g, 'x');

type Lang = 'uk' | 'ru' | 'en';
const LANGS: Lang[] = ['uk', 'ru', 'en'];

// Посилання «Підключити Telegram»: t.me/bot?start=<payload>, payload до 64 символів [A-Za-z0-9_-]
export function studentLink(studentId: string, lang: string) {
  if (!tgReady()) return '';
  const id = studentId.replace(/-/g, '');
  const l = LANGS.includes(lang as Lang) ? lang : 'uk';
  return `https://t.me/${botUsername()}?start=s${id}_${l}_${sig(`s${id}${l}`)}`;
}
// Батьки учня: окремий чат, у той самий запис учня (parent_tg_chat_id)
export function parentLink(studentId: string, lang: string) {
  if (!tgReady()) return '';
  const id = studentId.replace(/-/g, '');
  const l = LANGS.includes(lang as Lang) ? lang : 'uk';
  return `https://t.me/${botUsername()}?start=p${id}_${l}_${sig(`p${id}${l}`)}`;
}
export function teacherLink(teacherId: string, lang: string) {
  if (!tgReady()) return '';
  const id = teacherId.replace(/^user_/, '');
  const l = LANGS.includes(lang as Lang) ? lang : 'uk';
  return `https://t.me/${botUsername()}?start=t${id}_${l}_${sig(`t${id}${l}`)}`;
}

export function parsePayload(p: string): { kind: 'student' | 'parent' | 'teacher'; id: string; lang: Lang } | null {
  const m = /^([stp])([A-Za-z0-9]+)_(uk|ru|en)_([A-Za-z0-9]{10})$/.exec(p.trim());
  if (!m || sig(`${m[1]}${m[2]}${m[3]}`) !== m[4]) return null;
  if (m[1] === 's' || m[1] === 'p') {
    const h = m[2];
    if (h.length !== 32) return null;
    return { kind: m[1] === 's' ? 'student' : 'parent', id: `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`, lang: m[3] as Lang };
  }
  return { kind: 'teacher', id: `user_${m[2]}`, lang: m[3] as Lang };
}

export async function tgSend(chatId: string | number, text: string, button?: { text: string; url: string }) {
  if (!TOKEN() || !chatId) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${TOKEN()}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true, ...(button ? { reply_markup: { inline_keyboard: [[button]] } } : {}) }),
    });
    return r.ok;
  } catch { return false; }
}

// Довільний виклик Bot API (токен лишається на сервері)
export async function tgApi(method: string, body: Record<string, unknown>) {
  if (!TOKEN()) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${TOKEN()}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return r.ok;
  } catch { return false; }
}
// Кнопки вибору мови повідомлень
export const LANG_KEYBOARD = { inline_keyboard: [[{ text: 'Українська', callback_data: 'lang:uk' }, { text: 'English', callback_data: 'lang:en' }, { text: 'Русский', callback_data: 'lang:ru' }]] };
export const LANG_ASK = 'Мова повідомлень / Language / Язык сообщений:';

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const L = (lang: string | null | undefined, o: { uk: string; ru: string; en: string }) => (lang === 'ru' ? o.ru : lang === 'en' ? o.en : o.uk);
export const SITE = 'https://murly.com.ua';

// Сповістити учня (якщо він підключив Telegram). Помилки не ламають основну дію.
export async function notifyStudent(studentId: string, msg: (lang: string) => string, button?: (lang: string) => { text: string; url: string }) {
  if (!tgReady() || !dbReady()) return;
  try {
    const r = await db.query(`students?id=eq.${encodeURIComponent(studentId)}&select=tg_chat_id,tg_lang`);
    const chat = r[0]?.tg_chat_id; const lang = String(r[0]?.tg_lang || 'uk');
    if (chat) await tgSend(String(chat), msg(lang), button?.(lang));
  } catch { /* колонок ще нема або Telegram недоступний */ }
}
// Сповістити батьків учня (якщо вони підключили Telegram)
export async function notifyParent(studentId: string, msg: (lang: string) => string, button?: (lang: string) => { text: string; url: string }) {
  if (!tgReady() || !dbReady()) return false;
  try {
    const r = await db.query(`students?id=eq.${encodeURIComponent(studentId)}&select=parent_tg_chat_id,parent_tg_lang`);
    const chat = r[0]?.parent_tg_chat_id; const lang = String(r[0]?.parent_tg_lang || 'uk');
    if (chat) return await tgSend(String(chat), msg(lang), button?.(lang));
  } catch { /* */ }
  return false;
}
export async function notifyTeacher(teacherId: string, msg: (lang: string) => string, button?: (lang: string) => { text: string; url: string }) {
  if (!tgReady() || !dbReady()) return;
  try {
    const r = await db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(teacherId)}&select=tg_chat_id,tg_lang`);
    const chat = r[0]?.tg_chat_id; const lang = String(r[0]?.tg_lang || 'uk');
    if (chat) await tgSend(String(chat), msg(lang), button?.(lang));
  } catch { /* */ }
}

// Підключити вебхук (викликає вчитель із налаштувань)
export async function setupWebhook(origin: string) {
  if (!TOKEN()) return false;
  const r = await fetch(`https://api.telegram.org/bot${TOKEN()}/setWebhook`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: `${origin}/api/telegram`, secret_token: webhookSecret(), allowed_updates: ['message', 'callback_query'] }),
  }).catch(() => null);
  return Boolean(r && r.ok);
}

// Оформлення бота: опис (екран до Start), короткий опис (профіль) і меню команд, для uk/ru/en
const BOT_TEXT: Record<Lang, { description: string; short: string; start: string; lang: string }> = {
  uk: {
    description: 'Привіт! Я бот Murly, помічник для занять англійською на murly.com.ua.\n\nЩо я надсилаю:\n• нові домашки від учителя і термін здачі\n• нагадування про заняття зранку\n• оцінки й коментарі після перевірки\n• батькам: яку домашку отримала дитина\n\nМову повідомлень можна змінити командою /language.\n\nЯк підключити: відкрий посилання від учителя або натисни «Підключити Telegram» у своєму кабінеті на сайті, а потім Start.',
    short: 'Домашки, нагадування про заняття й коментарі вчителя з Murly просто в Telegram.',
    start: 'Підключити сповіщення',
    lang: 'Мова повідомлень',
  },
  ru: {
    description: 'Привет! Я бот Murly, помощник для занятий английским на murly.com.ua.\n\nЧто я присылаю:\n• новые домашки от учителя и срок сдачи\n• напоминания о занятиях утром\n• оценки и комментарии после проверки\n• родителям: какую домашку получил ребёнок\n\nЯзык сообщений можно сменить командой /language.\n\nКак подключить: открой ссылку от учителя или нажми «Подключить Telegram» в своём кабинете на сайте, а потом Start.',
    short: 'Домашки, напоминания о занятиях и комментарии учителя из Murly прямо в Telegram.',
    start: 'Подключить уведомления',
    lang: 'Язык сообщений',
  },
  en: {
    description: 'Hi! I am the Murly bot, your helper for English lessons on murly.com.ua.\n\nWhat I send:\n• new homework from your teacher and the due date\n• morning lesson reminders\n• scores and comments after checking\n• for parents: what homework your child got\n\nChange the message language with /language.\n\nHow to connect: open the link from your teacher or press Connect Telegram in your account on the site, then Start.',
    short: 'Homework, lesson reminders and teacher comments from Murly, right in Telegram.',
    start: 'Turn on notifications',
    lang: 'Message language',
  },
};
export async function setupBotProfile() {
  if (!TOKEN()) return false;
  const call = (m: string, body: Record<string, unknown>) => fetch(`https://api.telegram.org/bot${TOKEN()}/${m}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  }).then((r) => r.ok).catch(() => false);
  const res: boolean[] = [];
  for (const l of LANGS) {
    const x = BOT_TEXT[l]; const lc = l === 'uk' ? {} : { language_code: l };
    res.push(await call('setMyDescription', { description: x.description, ...lc }));
    res.push(await call('setMyShortDescription', { short_description: x.short, ...lc }));
    res.push(await call('setMyCommands', { commands: [{ command: 'start', description: x.start }, { command: 'language', description: x.lang }], ...lc }));
  }
  // українська ще й окремо з кодом uk, щоб українська мова застосунку теж бачила свій текст
  const u = BOT_TEXT.uk;
  res.push(await call('setMyDescription', { description: u.description, language_code: 'uk' }));
  res.push(await call('setMyShortDescription', { short_description: u.short, language_code: 'uk' }));
  res.push(await call('setMyCommands', { commands: [{ command: 'start', description: u.start }, { command: 'language', description: u.lang }], language_code: 'uk' }));
  return res.every(Boolean);
}
