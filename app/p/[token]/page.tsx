import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Kit from '@/components/Kit';
import { LangSwitch } from '@/components/LangProvider';
import { db, dbReady } from '@/lib/db';
import { parseParentToken } from '@/lib/parent-link';
import { tr } from '@/lib/i18n-server';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Murly', robots: { index: false, follow: false } };
const enc = encodeURIComponent;
const LOC = { uk: 'uk-UA', ru: 'ru-RU', en: 'en-GB' } as const;

// Сторінка для батьків: як навчається дитина. Без цін і без входу.
export default async function ParentPage({ params }: { params: { token: string } }) {
  const sid = parseParentToken(params.token);
  if (!sid || !dbReady()) notFound();
  const t = tr();
  const st = await db.query(`students?id=eq.${enc(sid)}&select=id,name,level,teacher_id`).catch(() => []);
  const s = st[0];
  if (!s) notFound();
  const [lessons, hw, words, teacher] = await Promise.all([
    db.query(`lessons?student_id=eq.${enc(sid)}&select=start,status,topic&order=start.desc&limit=200`).catch(() => []),
    db.query(`homework?student_id=eq.${enc(sid)}&select=title,status,score,total,feedback,due,done_at,created_at&order=created_at.desc&limit=30`).catch(() => []),
    db.query(`words?student_id=eq.${enc(sid)}&select=id`).catch(() => []),
    db.query(`teacher_settings?teacher_id=eq.${enc(String(s.teacher_id))}&select=name`).catch(() => []),
  ]);
  const now = Date.now();
  const held = lessons.filter((l) => l.status === 'done').length;
  const missed = lessons.filter((l) => l.status === 'missed').length;
  const att = held + missed ? Math.round((held / (held + missed)) * 100) : null;
  const upcoming = lessons.filter((l) => l.status === 'planned' && +new Date(String(l.start)) > now).sort((a, b) => String(a.start).localeCompare(String(b.start))).slice(0, 4);
  const done = hw.filter((h) => h.status !== 'assigned');
  const scored = done.filter((h) => Number(h.total) > 0);
  const avg = scored.length ? Math.round((scored.reduce((n, h) => n + Number(h.score) / Number(h.total), 0) / scored.length) * 100) : null;
  const late = hw.filter((h) => h.status === 'assigned' && h.due && +new Date(String(h.due)) < now).length;
  const fmt = (iso: unknown) => new Date(String(iso)).toLocaleString(LOC[t.lang], { weekday: 'short', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Kyiv' });
  const fmtD = (iso: unknown) => new Date(String(iso)).toLocaleDateString(LOC[t.lang], { day: 'numeric', month: 'short' });

  return (
    <div className="t-app">
      <header className="t-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <div className="t-top__user"><LangSwitch /></div>
      </header>
      <main className="t-page pr-page">
        <p className="t-eyebrow">{t({ uk: 'Для батьків', ru: 'Для родителей', en: 'For parents' })}{teacher[0]?.name ? ` · ${t({ uk: 'Учитель', ru: 'Учитель', en: 'Teacher' })}: ${teacher[0].name}` : ''}</p>
        <h1>{String(s.name)} <small className="t-muted">· {String(s.level)}</small></h1>
        <div className="t-stats">
          <div className="t-stats__item"><b>{held}</b><span>{t({ uk: 'занять проведено', ru: 'занятий проведено', en: 'lessons held' })}</span></div>
          <div className={`t-stats__item ${att != null && att < 80 ? 'is-warn' : ''}`}><b>{att != null ? `${att}%` : '–'}</b><span>{t({ uk: 'відвідуваність', ru: 'посещаемость', en: 'attendance' })}{missed ? `, ${t({ uk: 'пропусків', ru: 'пропусков', en: 'missed' })} ${missed}` : ''}</span></div>
          <div className={`t-stats__item ${late ? 'is-warn' : ''}`}><b>{done.length}/{hw.length}</b><span>{t({ uk: 'домашок здано', ru: 'домашек сдано', en: 'homework done' })}{late ? `, ${t({ uk: 'прострочено', ru: 'просрочено', en: 'overdue' })} ${late}` : ''}</span></div>
          <div className="t-stats__item"><b>{avg != null ? `${avg}%` : '–'}</b><span>{t({ uk: 'середній бал', ru: 'средний балл', en: 'average score' })}</span></div>
          <div className="t-stats__item"><b>{words.length}</b><span>{t({ uk: 'слів вивчено', ru: 'слов изучено', en: 'words learned' })}</span></div>
        </div>
        <section className="t-card">
          <h2>{t({ uk: 'Найближчі заняття', ru: 'Ближайшие занятия', en: 'Upcoming lessons' })}</h2>
          {upcoming.length ? upcoming.map((l, i) => <div key={i} className="t-row"><span>{fmt(l.start)}</span><b>{l.topic ? String(l.topic) : ''}</b></div>)
            : <p className="t-muted">{t({ uk: 'Поки не заплановано.', ru: 'Пока не запланировано.', en: 'Nothing planned yet.' })}</p>}
        </section>
        <section className="t-card">
          <h2>{t({ uk: 'Останні домашки', ru: 'Последние домашки', en: 'Recent homework' })}</h2>
          {hw.length ? hw.slice(0, 10).map((h, i) => (
            <div key={i} className="pr-hw">
              <div className="t-row"><span>{String(h.title)} <small className="t-muted">· {fmtD(h.created_at)}</small></span>
                <b>{h.status === 'assigned' ? (h.due && +new Date(String(h.due)) < now ? t({ uk: 'прострочено', ru: 'просрочено', en: 'overdue' }) : t({ uk: 'задано', ru: 'задано', en: 'assigned' })) : Number(h.total) > 0 ? `${h.score}/${h.total}` : t({ uk: 'здано', ru: 'сдано', en: 'handed in' })}</b></div>
              {h.feedback ? <p className="pr-fb">{String(h.feedback)}</p> : null}
            </div>
          )) : <p className="t-muted">{t({ uk: 'Домашок ще не було.', ru: 'Домашек ещё не было.', en: 'No homework yet.' })}</p>}
        </section>
        <p className="t-muted" style={{ fontSize: 13 }}>{t({ uk: 'Сторінка оновлюється сама. Посилання бачать лише ті, кому його надіслав учитель.', ru: 'Страница обновляется сама. Ссылку видят только те, кому её отправил учитель.', en: 'This page updates itself. Only people the teacher sent the link to can see it.' })}</p>
      </main>
    </div>
  );
}
