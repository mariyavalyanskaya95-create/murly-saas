import { NextResponse } from 'next/server';
import { db, dbReady } from '@/lib/db';
import { L, SITE, esc, tgReady, tgSend } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

const TZ = 'Europe/Kyiv';
const time = (iso: string, lang: string) => new Date(iso).toLocaleTimeString(lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'uk-UA', { hour: '2-digit', minute: '2-digit', timeZone: TZ });

// Щоранку: нагадування про сьогоднішні заняття і домашку, яку треба здати до завтра
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const okAuth = secret ? req.headers.get('authorization') === `Bearer ${secret}` : (req.headers.get('user-agent') || '').includes('vercel-cron');
  if (!okAuth) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (!tgReady() || !dbReady()) return NextResponse.json({ skipped: true });

  const students = await db.query('students?tg_chat_id=not.is.null&select=id,name,tg_chat_id,tg_lang').catch(() => []);
  if (!students.length) return NextResponse.json({ sent: 0 });
  const now = Date.now();
  const in24 = new Date(now + 24 * 3600 * 1000).toISOString();
  const ids = students.map((s) => String(s.id)).join(',');
  const [lessons, hw] = await Promise.all([
    db.query(`lessons?student_id=in.(${ids})&status=eq.planned&start=gte.${encodeURIComponent(new Date(now).toISOString())}&start=lt.${encodeURIComponent(in24)}&select=student_id,start,topic&order=start.asc`).catch(() => []),
    db.query(`homework?student_id=in.(${ids})&status=eq.assigned&due=gte.${encodeURIComponent(new Date(now).toISOString())}&due=lt.${encodeURIComponent(in24)}&select=student_id,title,due`).catch(() => []),
  ]);
  let sent = 0;
  for (const s of students) {
    const lang = String(s.tg_lang || 'uk');
    const ls = lessons.filter((l) => l.student_id === s.id);
    const hs = hw.filter((h) => h.student_id === s.id);
    if (!ls.length && !hs.length) continue;
    const lines: string[] = [];
    ls.forEach((l) => lines.push(`📅 ${L(lang, { uk: 'Заняття о', ru: 'Занятие в', en: 'Lesson at' })} <b>${time(String(l.start), lang)}</b>${l.topic ? `: ${esc(String(l.topic))}` : ''}`));
    hs.forEach((h) => lines.push(`📝 ${L(lang, { uk: 'Здати до', ru: 'Сдать до', en: 'Due by' })} <b>${time(String(h.due), lang)}</b>: ${esc(String(h.title))}`));
    const ok = await tgSend(String(s.tg_chat_id), `${L(lang, { uk: 'Доброго ранку! Сьогодні:', ru: 'Доброе утро! Сегодня:', en: 'Good morning! Today:' })}\n${lines.join('\n')}`,
      { text: L(lang, { uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' }), url: `${SITE}/student` });
    if (ok) sent++;
  }
  return NextResponse.json({ sent });
}
