// Щотижнева зведення власниці Murly в Telegram: нові реєстрації й активність за 7 днів.
import { clerkClient } from '@clerk/nextjs/server';
import { db } from './db';
import { esc, tgSend } from './telegram';
import { OWNER_TEACHER_ID } from './plans';
import { uniqLessons } from './lesson-dedupe';

const enc = encodeURIComponent;
// свої люди, не нові клієнти (Марія попросила не рахувати)
const OWN = ['annakosinskaa96@gmail.com', 'xanax76829@gmail.com'];

export async function ownerChat(): Promise<string | null> {
  const r = OWNER_TEACHER_ID
    ? await db.query(`teacher_settings?teacher_id=eq.${enc(OWNER_TEACHER_ID)}&select=tg_chat_id`).catch(() => [])
    : await db.query('teacher_settings?is_owner=is.true&select=tg_chat_id').catch(() => []);
  return r[0]?.tg_chat_id ? String(r[0].tg_chat_id) : null;
}

export async function weeklyText(): Promise<string> {
  const now = Date.now(); const from = new Date(now - 7 * 864e5); const iso = enc(from.toISOString());
  const day = (d: Date) => d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', timeZone: 'Europe/Kyiv' });

  // реєстрації з Clerk
  let selfNew: string[] = []; let pupils = 0; let total = 0;
  try {
    const c = await clerkClient();
    const list = await c.users.getUserList({ orderBy: '-created_at', limit: 100 });
    total = list.totalCount;
    for (const u of list.data) {
      if (u.createdAt < from.getTime()) continue;
      const mail = (u.primaryEmailAddress?.emailAddress || u.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
      if (mail.endsWith('@pupil.murly.com.ua')) { pupils++; continue; }
      if (OWN.includes(mail)) continue;
      const name = [u.firstName, u.lastName].filter(Boolean).join(' ') || mail.split('@')[0];
      selfNew.push(`• ${esc(name)}${mail ? ` (${esc(mail)})` : ''}, ${day(new Date(u.createdAt))}`);
    }
  } catch (e) { console.error(e); selfNew = ['не удалось получить список из Clerk']; }

  // активність на сайті
  const [ls, hw, xp, fb, st] = await Promise.all([
    db.query(`lessons?status=in.(done,charged)&start=gte.${iso}&select=student_id,start,status`).then(uniqLessons).catch(() => []),
    db.query(`homework?done_at=gte.${iso}&select=id`).catch(() => []),
    db.query(`xp_log?created_at=gte.${iso}&select=user_id&limit=5000`).catch(() => []),
    db.query(`feedback?created_at=gte.${iso}&select=id`).catch(() => []),
    db.query(`students?select=id&limit=5000`).catch(() => []),
  ]);
  const active = new Set(xp.map((x) => String(x.user_id))).size;

  return [
    `📊 <b>Murly за неделю</b> (${day(from)} – ${day(new Date(now))})`,
    '',
    `<b>Новые регистрации сами:</b> ${selfNew.length && !selfNew[0].startsWith('не удалось') ? selfNew.length : 0}`,
    ...(selfNew.length ? selfNew : ['• никого']),
    `<b>Учеников создано учителями:</b> ${pupils}`,
    `Всего аккаунтов: ${total}`,
    '',
    '<b>Активность</b>',
    `• уроков проведено: ${ls.length}`,
    `• домашек сдано: ${hw.length}`,
    `• учились на сайте (получали XP): ${active}`,
    `• учеников в кабинетах всего: ${st.length}`,
    fb.length ? `• идей от учителей: ${fb.length}` : '',
  ].filter((x) => x !== '').join('\n');
}

export async function sendWeekly(): Promise<boolean> {
  const chat = await ownerChat();
  if (!chat) return false;
  return tgSend(chat, await weeklyText());
}
