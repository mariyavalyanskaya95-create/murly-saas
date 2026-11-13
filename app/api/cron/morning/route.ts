import { NextResponse } from 'next/server';
import { db, dbReady } from '@/lib/db';
import { L, SITE, esc, tgApi, tgReady, tgSend } from '@/lib/telegram';
import { teacherBalances, teacherKeyboard } from '@/lib/tg-menu';
import { uniqLessons } from '@/lib/lesson-dedupe';
import { localParts, tzOr } from '@/lib/tz';

export const dynamic = 'force-dynamic';

// Щогодини (Supabase pg_cron): ранкове повідомлення о 8:00 за місцевим часом кожного учня й учителя.
// Один раз на день (morning_sent_on), тому повторні виклики нічого не дублюють.
const HOUR = 8;
const LOC = (lang: string) => (lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'uk-UA');
const time = (iso: string, lang: string, tz: string) => new Date(iso).toLocaleTimeString(LOC(lang), { hour: '2-digit', minute: '2-digit', timeZone: tz });
const due = (tz: unknown, sentOn: unknown) => { const p = localParts(tzOr(tz)); return p.hour >= HOUR && p.hour < HOUR + 4 && String(sentOn || '') !== p.date ? p.date : null; };

export async function GET() {
  if (!tgReady() || !dbReady()) return NextResponse.json({ skipped: true });
  const tsent = await teacherMorning().catch((e) => { console.error(e); return 0; });
  const all = await db.query('students?tg_chat_id=not.is.null&select=id,name,tg_chat_id,tg_lang,tz,morning_sent_on').catch(() => []);
  const today = new Map<string, string>();
  const students = all.filter((s) => { const d = due(s.tz, s.morning_sent_on); if (d) today.set(String(s.id), d); return Boolean(d); });
  if (!students.length) return NextResponse.json({ sent: 0, teachers: tsent });
  const now = Date.now();
  const in24 = new Date(now + 24 * 3600 * 1000).toISOString();
  const ids = students.map((s) => String(s.id)).join(',');
  const [lessons, hw, dueWords] = await Promise.all([
    db.query(`lessons?student_id=in.(${ids})&status=eq.planned&start=gte.${encodeURIComponent(new Date(now).toISOString())}&start=lt.${encodeURIComponent(in24)}&select=student_id,start,topic&order=start.asc`).catch(() => []),
    db.query(`homework?student_id=in.(${ids})&status=eq.assigned&due=gte.${encodeURIComponent(new Date(now).toISOString())}&due=lt.${encodeURIComponent(in24)}&select=student_id,title,due`).catch(() => []),
    db.query(`words?student_id=in.(${ids})&or=(srs_due.is.null,srs_due.lte.${encodeURIComponent(new Date(now).toISOString())})&select=student_id`).catch(() => []),
  ]);
  const lessonsU = uniqLessons(lessons);
  let sent = 0;
  for (const s of students) {
    const lang = String(s.tg_lang || 'uk'); const tz = tzOr(s.tz);
    await db.patchWhere(`students?id=eq.${encodeURIComponent(String(s.id))}`, { morning_sent_on: today.get(String(s.id)) }).catch(() => null);
    const ls = lessonsU.filter((l) => l.student_id === s.id);
    const hs = hw.filter((h) => h.student_id === s.id);
    const wn = Math.min(15, dueWords.filter((w) => w.student_id === s.id).length);
    if (!ls.length && !hs.length && wn < 4) continue;
    const lines: string[] = [];
    ls.forEach((l) => lines.push(`📅 ${L(lang, { uk: 'Заняття о', ru: 'Занятие в', en: 'Lesson at' })} <b>${time(String(l.start), lang, tz)}</b>${l.topic ? `: ${esc(String(l.topic))}` : ''}`));
    if (wn >= 4) lines.push(`🔁 ${L(lang, { uk: 'Слова на сьогодні', ru: 'Слова на сегодня', en: 'Words for today' })}: <b>${wn}</b> (5 ${L(lang, { uk: 'хв', ru: 'мин', en: 'min' })})`);
    hs.forEach((h) => lines.push(`📝 ${L(lang, { uk: 'Здати до', ru: 'Сдать до', en: 'Due by' })} <b>${time(String(h.due), lang, tz)}</b>: ${esc(String(h.title))}`));
    const ok = await tgSend(String(s.tg_chat_id), `${L(lang, { uk: 'Доброго ранку! Сьогодні:', ru: 'Доброе утро! Сегодня:', en: 'Good morning! Today:' })}\n${lines.join('\n')}`,
      { text: L(lang, { uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' }), url: `${SITE}/student` });
    if (ok) sent++;
  }
  return NextResponse.json({ sent, teachers: tsent });
}

// Учителю зранку: заняття на сьогодні, скільки чекає перевірки, хто чекає оплати
async function teacherMorning() {
  const teachers = (await db.query('teacher_settings?tg_chat_id=not.is.null&select=teacher_id,tg_chat_id,tg_lang,tz,morning_sent_on').catch(() => [])).filter((x) => due(x.tz, x.morning_sent_on));
  const now = new Date(); const in24 = new Date(now.getTime() + 24 * 3600 * 1000);
  let n = 0;
  for (const tr of teachers) {
    const T = encodeURIComponent(String(tr.teacher_id)); const lang = String(tr.tg_lang || 'uk'); const tz = tzOr(tr.tz);
    await db.patchWhere(`teacher_settings?teacher_id=eq.${T}`, { morning_sent_on: localParts(tz).date }).catch(() => null);
    const [ls, st, rev, bal] = await Promise.all([
      db.query(`lessons?teacher_id=eq.${T}&status=eq.planned&start=gte.${encodeURIComponent(now.toISOString())}&start=lt.${encodeURIComponent(in24.toISOString())}&select=student_id,start,topic&order=start.asc`).catch(() => []),
      db.query(`students?teacher_id=eq.${T}&select=id,name`).catch(() => []),
      db.query(`homework?teacher_id=eq.${T}&status=eq.done&select=id`).catch(() => []),
      teacherBalances(String(tr.teacher_id)).catch(() => []),
    ]);
    const lsU = uniqLessons(ls);
    const owe = bal.filter((x) => x.b < 0);
    if (!lsU.length && !rev.length && !owe.length) continue;
    const nm = (id: unknown) => esc(String(st.find((x) => x.id === id)?.name || ''));
    const lines: string[] = [];
    if (lsU.length) {
      lines.push(`<b>${L(lang, { uk: 'Заняття', ru: 'Занятия', en: 'Lessons' })}</b>`);
      lsU.forEach((l) => lines.push(`${time(String(l.start), lang, tz)} ${nm(l.student_id)}${l.topic ? `: ${esc(String(l.topic))}` : ''}`));
    }
    if (rev.length) lines.push('', L(lang, { uk: `На перевірку: <b>${rev.length}</b>`, ru: `На проверку: <b>${rev.length}</b>`, en: `To review: <b>${rev.length}</b>` }));
    if (owe.length) lines.push(L(lang, { uk: `Чекають оплати: <b>${owe.length}</b> (${owe.map((x) => esc(x.name)).join(', ')})`, ru: `Ждут оплаты: <b>${owe.length}</b> (${owe.map((x) => esc(x.name)).join(', ')})`, en: `Awaiting payment: <b>${owe.length}</b> (${owe.map((x) => esc(x.name)).join(', ')})` }));
    const ok = await tgApi('sendMessage', { chat_id: String(tr.tg_chat_id), parse_mode: 'HTML', disable_web_page_preview: true,
      text: `${L(lang, { uk: 'Доброго ранку! Ваш день:', ru: 'Доброе утро! Ваш день:', en: 'Good morning! Your day:' })}\n\n${lines.join('\n').replace(/^\n+/, '')}`,
      reply_markup: teacherKeyboard(lang === 'ru' || lang === 'en' ? lang : 'uk') });
    if (ok) n++;
  }
  return n;
}

