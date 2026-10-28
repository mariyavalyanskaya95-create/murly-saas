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
export function teacherLink(teacherId: string, lang: string) {
  if (!tgReady()) return '';
  const id = teacherId.replace(/^user_/, '');
  const l = LANGS.includes(lang as Lang) ? lang : 'uk';
  return `https://t.me/${botUsername()}?start=t${id}_${l}_${sig(`t${id}${l}`)}`;
}

export function parsePayload(p: string): { kind: 'student' | 'teacher'; id: string; lang: Lang } | null {
  const m = /^([st])([A-Za-z0-9]+)_(uk|ru|en)_([A-Za-z0-9]{10})$/.exec(p.trim());
  if (!m || sig(`${m[1]}${m[2]}${m[3]}`) !== m[4]) return null;
  if (m[1] === 's') {
    const h = m[2];
    if (h.length !== 32) return null;
    return { kind: 'student', id: `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`, lang: m[3] as Lang };
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
    body: JSON.stringify({ url: `${origin}/api/telegram`, secret_token: webhookSecret(), allowed_updates: ['message'] }),
  }).catch(() => null);
  return Boolean(r && r.ok);
}
