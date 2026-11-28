// Разовий лист-привітання всім учителям, які зареєструвалися до 29.11.2026 (українською).
// Розповідає про переваги Murly і як почати. Шлемо один раз (privateMetadata.helloMailed).
// Заодно ставимо welcomeMailed, щоб наступного дня не прийшов ще й звичайний лист новачку.
// Нових учителів (з 29.11) не чіпаємо: їм іде звичайний лист з lib/welcome-mail.ts.
import { clerkClient } from '@clerk/nextjs/server';
import { db } from './db';
import { mailReady } from './shop-server';

const SITE = 'https://murly.com.ua';
const CUTOFF = Date.parse('2026-11-29T00:00:00+02:00');
const enc = encodeURIComponent;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const PERKS: [string, string][] = [
  ['110+ готових уроків на 60 хвилин.', 'Від A1 до C1, для дітей, підлітків і дорослих. Версія вчителя з відповідями і підказками, показ екрана на занятті.'],
  ['Домашка перевіряється сама.', 'Учень одразу бачить бал і помилки, вам лишається глянути лише письмові відповіді.'],
  ['Розклад і оплати разом.', 'Повторювані заняття, баланс кожного учня, хто скільки винен. Без таблиць і нотаток у телефоні.'],
  ['Telegram-бот.', 'Нагадує учням про заняття й домашку, а вам пише, хто здав роботу і хто оплатив.'],
  ['Учні хочуть вчитися.', 'Монетки й рівні за навчання, острів Murly, командна гра на занятті.'],
  ['Батьки бачать прогрес.', 'Окреме посилання для батьків: заняття, домашка, бали.'],
];
const STEPS = [
  'Додайте учня: потрібне лише ім’я.',
  'Відкрийте готовий урок і покажіть екран на занятті.',
  'Задайте домашку одним натисканням.',
  'Заплануйте заняття, Murly сам нагадає учню.',
];

export const HELLO_SUBJECT = 'Раді вас бачити в Murly! Ось що вміє ваш кабінет';

export function helloHtml(name: string) {
  const p = (t: string, m = '0 0 8px') => `<p style="margin:${m}">${t}</p>`;
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1B2140;font-size:16px;line-height:1.5">
<h2 style="color:#534AB7;margin:0 0 12px">Murly</h2>
<p style="font-size:20px;font-weight:bold;margin:0 0 12px">${name ? name + ', в' : 'В'}ітаємо в Murly!</p>
${p('Дякуємо, що ви з нами. Murly зібрав в одному місці все, що потрібно вчителю англійської, щоб менше часу йшло на рутину і більше на самі заняття.', '0 0 10px')}
${p('<b>Що вже є у вашому кабінеті:</b>', '16px 0 8px')}
${PERKS.map(([b, t]) => p(`<b>${b}</b> ${t}`)).join('\n')}
${p('<b>Як почати за 4 кроки:</b>', '16px 0 8px')}
${STEPS.map((s, i) => p(`${i + 1}. ${s}`, '0 0 4px')).join('\n')}
<p style="margin:20px 0"><a href="${SITE}/teacher/guide" style="display:inline-block;background:#534AB7;color:#fff;padding:14px 26px;border-radius:999px;text-decoration:none;font-weight:bold">Відкрити кабінет</a></p>
<p style="font-size:14px;color:#5a607a">Зараз усе в Murly безкоштовно. Є питання чи ідея? Просто дайте відповідь на цей лист, ми прочитаємо.</p>
<p style="font-size:13px;color:#8a90a8">Murly · ${SITE}</p></div>`;
}

function escName(s: string) {
  return s.replace(/[<>&"]/g, '').trim().slice(0, 40);
}

export async function helloTeachers() {
  if (!mailReady()) return { skipped: 'no_mail_key' };
  const owners = await db.query('teacher_settings?is_owner=eq.true&select=teacher_id').catch(() => []);
  const ownerIds = new Set((owners as { teacher_id: string }[]).map((o) => o.teacher_id));
  const c = await clerkClient();
  const list = await c.users.getUserList({ orderBy: '-created_at', limit: 200 });
  let sent = 0;
  for (const u of list.data) {
    if (u.createdAt >= CUTOFF) continue;
    if (ownerIds.has(u.id)) continue;
    const priv = (u.privateMetadata ?? {}) as { helloMailed?: boolean };
    if (priv.helloMailed) continue;
    const mail = (u.primaryEmailAddress?.emailAddress || u.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
    if (!mail || mail.endsWith('@pupil.murly.com.ua')) continue;
    const meta = (u.unsafeMetadata ?? {}) as { role?: string };
    if (meta.role === 'student') continue;
    const isPupil = (await db.query(`students?user_id=eq.${enc(u.id)}&select=id&limit=1`).catch(() => [])).length > 0;
    if (isPupil) continue;
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.SHOP_FROM || 'Murly <hello@murly.com.ua>',
        reply_to: 'hello@murly.com.ua',
        to: [mail],
        subject: HELLO_SUBJECT,
        html: helloHtml(escName(u.firstName || '')),
      }),
    }).catch(() => null);
    if (r?.ok) {
      sent++;
      await c.users.updateUserMetadata(u.id, { privateMetadata: { helloMailed: true, welcomeMailed: true } }).catch(() => null);
    } else console.error('hello mail failed', u.id, r?.status);
    await sleep(600); // Resend: не більше 2 листів на секунду
  }
  return { sent };
}
