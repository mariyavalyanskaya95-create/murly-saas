// Відправка через Resend (домен murly.com.ua підтверджено, ключ RESEND_API_KEY у Vercel)
// Лист новачкам наступного дня після реєстрації: один простий наступний крок.
// Вчителю без учнів: «Додайте першого учня за 1 хвилину». Учню: «Почніть з тесту на рівень або гри».
// Шлемо один раз (позначка в privateMetadata.welcomeMailed). Без ключа Resend нічого не робимо.
import { clerkClient } from '@clerk/nextjs/server';
import { db } from './db';
import { mailReady } from './shop-server';

const SITE = 'https://murly.com.ua';
const enc = encodeURIComponent;

function wrap(title: string, lines: string[], btn: string, link: string, extra: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1B2140;font-size:16px;line-height:1.5">
<h2 style="color:#534AB7;margin:0 0 12px">Murly</h2>
<p style="font-size:20px;font-weight:bold;margin:0 0 12px">${title}</p>
${lines.map((l) => `<p style="margin:0 0 10px">${l}</p>`).join('')}
<p style="margin:18px 0"><a href="${link}" style="display:inline-block;background:#534AB7;color:#fff;padding:14px 26px;border-radius:999px;text-decoration:none;font-weight:bold">${btn}</a></p>
<p style="font-size:14px;color:#5a607a">${extra}</p>
<p style="font-size:13px;color:#8a90a8">Murly · ${SITE}</p></div>`;
}

function teacherMail(name: string, ru: boolean) {
  const link = `${SITE}/teacher?start=student`;
  return ru
    ? { subject: 'Добавьте первого ученика за 1 минуту', html: wrap(`${name ? name + ', в' : 'В'}аш кабинет Murly готов!`, ['Первый шаг самый простой: добавьте одного ученика. Нужно только имя.', 'Ученик сразу получит свой кабинет: домашка с автопроверкой, словарь, игры. А у вас появятся расписание, оплаты и готовые уроки, которые можно открыть прямо на занятии.'], 'Добавить ученика', link, 'Не хотите пока добавлять? Откройте готовые уроки: ' + `${SITE}/teacher/lessons`) }
    : { subject: 'Додайте першого учня за 1 хвилину', html: wrap(`${name ? name + ', в' : 'В'}аш кабінет Murly готовий!`, ['Перший крок найпростіший: додайте одного учня. Потрібне лише ім’я.', 'Учень одразу отримає свій кабінет: домашка з автоперевіркою, словник, ігри. А у вас з’являться розклад, оплати й готові уроки, які можна відкрити просто на занятті.'], 'Додати учня', link, 'Поки не хочете додавати? Відкрийте готові уроки: ' + `${SITE}/teacher/lessons`) };
}

function studentMail(name: string, ru: boolean) {
  const link = `${SITE}/level-test`;
  return ru
    ? { subject: 'С чего начать в Murly', html: wrap(`${name ? name + ', п' : 'П'}ривет!`, ['Начните с короткого теста на уровень: 10 минут, и мы подскажем, что учить дальше.', 'А потом можно играть: остров Murly, игры со словами и уроки по играм.'], 'Пройти тест', link, 'Игры: ' + `${SITE}/games`) }
    : { subject: 'З чого почати в Murly', html: wrap(`${name ? name + ', п' : 'П'}ривіт!`, ['Почніть з короткого тесту на рівень: 10 хвилин, і ми підкажемо, що вчити далі.', 'А потім можна грати: острів Murly, ігри зі словами й уроки за іграми.'], 'Пройти тест', link, 'Ігри: ' + `${SITE}/games`) };
}

export async function welcomeEmails() {
  if (!mailReady()) return { skipped: 'no_mail_key' };
  const c = await clerkClient();
  const list = await c.users.getUserList({ orderBy: '-created_at', limit: 100 });
  const now = Date.now(); let sent = 0;
  for (const u of list.data) {
    const age = now - u.createdAt;
    if (age < 20 * 3600e3) continue; // даємо добу спробувати самим
    if (age > 7 * 864e5) break;
    if ((u.privateMetadata as { welcomeMailed?: boolean } | undefined)?.welcomeMailed) continue;
    const mail = (u.primaryEmailAddress?.emailAddress || u.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
    if (!mail || mail.endsWith('@pupil.murly.com.ua')) continue;
    const meta = (u.unsafeMetadata ?? {}) as { role?: string; lang?: string };
    const isPupil = (await db.query(`students?user_id=eq.${enc(u.id)}&select=id&limit=1`).catch(() => [])).length > 0;
    let m: { subject: string; html: string } | null = null;
    const ru = meta.lang === 'ru';
    if (meta.role === 'student' || isPupil) {
      if (isPupil) { await c.users.updateUserMetadata(u.id, { privateMetadata: { welcomeMailed: true } }).catch(() => null); continue; } // учня вже веде вчитель
      m = studentMail(u.firstName || '', ru);
    } else {
      const has = (await db.query(`students?teacher_id=eq.${enc(u.id)}&select=id&limit=1`).catch(() => [])).length > 0;
      if (has) { await c.users.updateUserMetadata(u.id, { privateMetadata: { welcomeMailed: true } }).catch(() => null); continue; }
      m = teacherMail(u.firstName || '', ru);
    }
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.SHOP_FROM || 'Murly <hello@murly.com.ua>', to: [mail], subject: m.subject, html: m.html }),
    }).catch(() => null);
    if (r?.ok) { sent++; await c.users.updateUserMetadata(u.id, { privateMetadata: { welcomeMailed: true } }).catch(() => null); }
  }
  return { sent };
}
