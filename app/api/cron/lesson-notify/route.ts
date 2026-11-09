import { NextResponse } from 'next/server';
import { db, dbReady } from '@/lib/db';
import { L, SITE, tgReady, tgSend } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

// Кожні 5 хвилин (Supabase pg_cron): заняття, які призначили або перенесли щонайменше 10 хв тому,
// одним повідомленням на учня йдуть у Telegram учню і батькам. Повторний виклик нічого не дублює.
const TZ = 'Europe/Kyiv';
const LOC: Record<string, string> = { uk: 'uk-UA', ru: 'ru-RU', en: 'en-GB' };
const when = (iso: string, lang: string) => new Date(iso).toLocaleString(LOC[lang] || 'uk-UA', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: TZ });
const enc = encodeURIComponent;

export async function GET() {
  if (!tgReady() || !dbReady()) return NextResponse.json({ skipped: true });
  const now = new Date().toISOString();
  const due = await db.query(`lessons?notify_at=lte.${enc(now)}&select=id,student_id,start,status,topic,notified_start,notify_moved&order=start.asc&limit=200`).catch(() => []);
  if (!due.length) return NextResponse.json({ sent: 0 });
  // Спершу знімаємо позначку, щоб паралельний виклик не надіслав те саме вдруге
  await db.patchWhere(`lessons?id=in.(${due.map((l) => enc(String(l.id))).join(',')})&notify_at=lte.${enc(now)}`, { notify_at: null }).catch(() => null);

  const fresh = due.filter((l) => l.status === 'planned' && +new Date(String(l.start)) > Date.now()
    && !(l.notified_start && +new Date(String(l.notified_start)) === +new Date(String(l.start))));
  const byStudent = new Map<string, typeof fresh>();
  for (const l of fresh) { const k = String(l.student_id); byStudent.set(k, [...(byStudent.get(k) ?? []), l]); }
  if (!byStudent.size) return NextResponse.json({ sent: 0 });

  const ids = Array.from(byStudent.keys());
  const students = await db.query(`students?id=in.(${ids.map(enc).join(',')})&select=id,name,tg_chat_id,tg_lang,parent_tg_chat_id,parent_tg_lang`).catch(() => []);
  let sent = 0;
  for (const s of students) {
    const ls = (byStudent.get(String(s.id)) ?? []).slice(0, 6);
    if (!ls.length) continue;
    const moved = ls.some((l) => l.notified_start || l.notify_moved);
    const text = (lang: string, parent: boolean) => {
      const head = parent
        ? L(lang, { uk: `📅 Розклад ${s.name ? `(${s.name}) ` : ''}оновлено:`, ru: `📅 Расписание ${s.name ? `(${s.name}) ` : ''}обновлено:`, en: `📅 Schedule update${s.name ? ` for ${s.name}` : ''}:` })
        : moved
          ? L(lang, { uk: '📅 Час заняття змінено:', ru: '📅 Время занятия изменилось:', en: '📅 Your lesson time has changed:' })
          : L(lang, { uk: '📅 Нове заняття в розкладі:', ru: '📅 Новое занятие в расписании:', en: '📅 New lesson in your schedule:' });
      const lines = ls.map((l) => `<b>${when(String(l.start), lang)}</b>${l.topic ? ` · ${String(l.topic).replace(/[<>&]/g, '')}` : ''}`);
      return `${head}\n${lines.join('\n')}`;
    };
    const btn = (lang: string) => ({ text: L(lang, { uk: 'Мій розклад', ru: 'Моё расписание', en: 'My schedule' }), url: `${SITE}/student` });
    if (s.tg_chat_id) { const lang = String(s.tg_lang || 'uk'); if (await tgSend(String(s.tg_chat_id), text(lang, false), btn(lang))) sent++; }
    if (s.parent_tg_chat_id) { const lang = String(s.parent_tg_lang || 'uk'); await tgSend(String(s.parent_tg_chat_id), text(lang, true)); }
  }
  // Запам'ятовуємо, про який час уже повідомили
  for (const l of fresh) await db.patchWhere(`lessons?id=eq.${enc(String(l.id))}`, { notified_start: l.start, notify_moved: false }).catch(() => null);
  return NextResponse.json({ sent });
}
