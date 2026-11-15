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
  const now = Date.now(); const from = new Date(now - 7 * 864e5); const iso = enc(from.toISOString()); const since = from.getTime();
  const day = (d: Date) => d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', timeZone: 'Europe/Kyiv' });
  const owner = OWNER_TEACHER_ID || String((await db.query('teacher_settings?is_owner=is.true&select=teacher_id').catch(() => []))[0]?.teacher_id || '');

  // усі дані одним махом
  const [students, lessonsAll, hwWeek, xp, fb] = await Promise.all([
    db.query('students?select=id,teacher_id,user_id,created_at&limit=10000').catch(() => []),
    db.query('lessons?status=in.(done,charged)&select=teacher_id,student_id,start,status&limit=20000').then(uniqLessons).catch(() => []),
    db.query(`homework?created_at=gte.${iso}&select=teacher_id,done_at`).catch(() => []),
    db.query(`xp_log?created_at=gte.${iso}&select=user_id&limit=5000`).catch(() => []),
    db.query(`feedback?created_at=gte.${iso}&select=id`).catch(() => []),
  ]);
  const pupilIds = new Set(students.filter((x) => x.user_id).map((x) => String(x.user_id)));
  const xpUsers = new Set(xp.map((x) => String(x.user_id)));
  const hwDone = (await db.query(`homework?done_at=gte.${iso}&select=id`).catch(() => [])).length;

  // по кожному вчителю
  type TS = { st: number; stNew: number; acc: number; ls: number; lsWeek: number; hw: number };
  const per = new Map<string, TS>();
  const get = (t: string) => { let v = per.get(t); if (!v) { v = { st: 0, stNew: 0, acc: 0, ls: 0, lsWeek: 0, hw: 0 }; per.set(t, v); } return v; };
  for (const x of students) { const v = get(String(x.teacher_id)); v.st++; if (x.user_id) v.acc++; if (Date.parse(String(x.created_at)) >= since) v.stNew++; }
  for (const l of lessonsAll) { const v = get(String(l.teacher_id)); v.ls++; if (Date.parse(String(l.start)) >= since && Date.parse(String(l.start)) <= now) v.lsWeek++; }
  for (const h of hwWeek) get(String(h.teacher_id)).hw++;
  const lessonsWeek = lessonsAll.filter((l) => { const t = Date.parse(String(l.start)); return t >= since && t <= now; }).length;

  // нові акаунти з Clerk + імена активних учителів
  const names = new Map<string, string>();
  const fresh: { id: string; name: string; mail: string; at: number }[] = [];
  let pupilsNew = 0; let total = 0; let clerkOk = true;
  try {
    const c = await clerkClient();
    const list = await c.users.getUserList({ orderBy: '-created_at', limit: 100 });
    total = list.totalCount;
    for (const u of list.data) {
      const mail = (u.primaryEmailAddress?.emailAddress || u.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
      const name = [u.firstName, u.lastName].filter(Boolean).join(' ') || mail.split('@')[0];
      names.set(u.id, name);
      if (u.createdAt < since) continue;
      if (mail.endsWith('@pupil.murly.com.ua')) { pupilsNew++; continue; }
      if (OWN.includes(mail)) continue;
      fresh.push({ id: u.id, name, mail, at: u.createdAt });
    }
    const missing = [...per.keys()].filter((id) => !names.has(id) && id !== owner).slice(0, 100);
    if (missing.length) { const more = await c.users.getUserList({ userId: missing, limit: 100 }); more.data.forEach((u) => names.set(u.id, [u.firstName, u.lastName].filter(Boolean).join(' ') || (u.primaryEmailAddress?.emailAddress || '').split('@')[0])); }
  } catch (e) { console.error(e); clerkOk = false; }

  const whatDid = (id: string) => {
    const v = per.get(id);
    if (v && v.st) return `учитель: учеников ${v.st}${v.acc ? ` (с аккаунтом ${v.acc})` : ''}, уроков проведено ${v.ls}${v.hw ? `, домашек задал(а) ${v.hw}` : ''}`;
    if (pupilIds.has(id)) return 'ученик учителя';
    if (xpUsers.has(id)) return 'учится сам(а), занимался(ась) на сайте';
    return 'пока ничего не создал(а)';
  };
  const freshLines = fresh.map((f) => `• <b>${esc(f.name)}</b>${f.mail ? ` (${esc(f.mail)})` : ''}, ${day(new Date(f.at))}\n   ${whatDid(f.id)}`);

  // активні вчителі тижня, крім вас
  const active = [...per.entries()]
    .filter(([id, v]) => id !== owner && (v.lsWeek || v.stNew || v.hw))
    .sort((a, b) => b[1].lsWeek - a[1].lsWeek)
    .map(([id, v]) => `• ${esc(names.get(id) || 'Учитель')}: уроков ${v.lsWeek}, новых учеников ${v.stNew}, домашек ${v.hw}`);
  const mine = owner ? per.get(owner) : undefined;

  return [
    `📊 <b>Murly за неделю</b> (${day(from)} – ${day(new Date(now))})`,
    '',
    `<b>Новые регистрации сами: ${clerkOk ? fresh.length : '?'}</b>`,
    ...(clerkOk ? (freshLines.length ? freshLines : ['• никого']) : ['• не удалось получить список из Clerk']),
    '',
    `<b>Ученических аккаунтов создали учителя:</b> ${pupilsNew}`,
    '',
    '<b>Другие учителя, активные за неделю</b>',
    ...(active.length ? active : ['• пока никто, кроме вас']),
    '',
    '<b>Всего за неделю</b>',
    `• уроков проведено: ${lessonsWeek}${mine ? ` (ваших ${mine.lsWeek})` : ''}`,
    `• домашек сдано: ${hwDone}`,
    `• учились на сайте (получали XP): ${xpUsers.size}`,
    fb.length ? `• идей от учителей: ${fb.length}` : '',
    `• аккаунтов всего: ${total}, учеников в кабинетах: ${students.length}`,
  ].filter((x) => x !== '').join('\n');
}

export async function sendWeekly(): Promise<boolean> {
  const chat = await ownerChat();
  if (!chat) return false;
  return tgSend(chat, await weeklyText());
}
