'use client';
// Розклад тижня сіткою: дні в стовпчиках, години в рядках, заняття кольором учня.
// Клік по заняттю: статус (був / не прийшов / скасовано), картка учня, видалити.
import Link from 'next/link';
import { useRef, useState } from 'react';
import { type Lesson, type LessonStatus, fmtTime, localeOf, sameDay, useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

const ROW = 52; // висота години в пікселях

export default function WeekGrid({ days }: { days: Date[] }) {
  const t = useT();
  const loc = localeOf(t.lang);
  const { data, setLessonStatus, removeLesson, addLessons, updateLesson } = useTeacher();
  const grab = useRef(0); // де саме вчитель схопив блок (px від верху), щоб час не стрибав
  const [sel, setSel] = useState<string | null>(null);
  const end = new Date(days[6]); end.setDate(end.getDate() + 1);
  const lessons = data.lessons.filter((l) => { const d = new Date(l.start); return d >= days[0] && d < end; });
  const hours = lessons.map((l) => new Date(l.start).getHours());
  const ends = lessons.map((l) => { const d = new Date(l.start); return d.getHours() + Math.ceil((d.getMinutes() + l.duration) / 60); });
  const from = Math.min(9, ...hours);
  const to = Math.max(20, ...ends);
  const H = Array.from({ length: to - from }, (_, i) => from + i);
  const today = new Date();
  // групові заняття показуємо одним блоком: той самий groupId і час
  const clusters = new Map<string, Lesson[]>();
  lessons.forEach((l) => { const k = l.groupId ? `g:${l.groupId}:${l.start}` : l.id; clusters.set(k, [...(clusters.get(k) ?? []), l]); });
  const items = Array.from(clusters.entries()).map(([key, ls]) => ({ key, ls, l: ls[0] }));
  const pickedItem = items.find((x) => x.key === sel);
  const picked = pickedItem?.l;
  const pickedGroup = picked?.groupId ? (data.groups ?? []).find((g) => g.id === picked.groupId) : undefined;
  const pickedSt = picked && data.students.find((s) => s.id === picked.studentId);
  const groupStatus = (ls: Lesson[]): LessonStatus => (ls.every((x) => x.status === ls[0].status) ? ls[0].status : ls.some((x) => x.status === 'done') ? 'done' : ls[0].status);

  const label: Record<LessonStatus, string> = {
    planned: t({ uk: 'Заплановано', ru: 'Запланирован', en: 'Planned' }),
    done: t({ uk: 'Був', ru: 'Был', en: 'Done' }),
    missed: t({ uk: 'Не прийшов', ru: 'Не пришёл', en: 'No-show' }),
    cancelled: t({ uk: 'Скасовано', ru: 'Отменён', en: 'Cancelled' }),
  };

  // копія або перенесення заняття на інший день / час
  const copyTo = (l: Lesson, day: Date, h?: number, m?: number) => {
    const s0 = new Date(l.start);
    const n = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h ?? s0.getHours(), m ?? s0.getMinutes());
    addLessons({ studentId: l.studentId, start: n.toISOString(), duration: l.duration, topic: l.topic, link: l.link, groupId: l.groupId });
  };
  const onDrop = (e: React.DragEvent, day: Date) => {
    e.preventDefault();
    const key = e.dataTransfer.getData('text/plain');
    const it = items.find((x) => x.key === key);
    if (!it) return;
    const l = it.l;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const mins = Math.max(0, Math.round((((e.clientY - rect.top - grab.current) / ROW) * 60) / 15) * 15) + from * 60;
    const h = Math.min(23, Math.floor(mins / 60)); const m = mins % 60;
    // Alt (або Ctrl) під час перетягування: копія, інакше перенесення
    if (e.altKey || e.ctrlKey) it.ls.forEach((x) => copyTo(x, day, h, m));
    else it.ls.forEach((x) => updateLesson(x.id, { start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m).toISOString() }));
    if (it.key.startsWith('g:')) setSel(null);
  };

  const block = ({ key, ls, l: l0 }: { key: string; ls: Lesson[]; l: Lesson }) => {
    const grp = l0.groupId ? (data.groups ?? []).find((g) => g.id === l0.groupId) : undefined;
    const l = { ...l0, status: groupStatus(ls) };
    const st = grp ? { name: `${grp.name} (${ls.length})`, color: grp.color } : data.students.find((s) => s.id === l.studentId);
    const d = new Date(l.start);
    const top = (d.getHours() - from + d.getMinutes() / 60) * ROW;
    const h = Math.max(26, (l.duration / 60) * ROW - 3);
    const past = d.getTime() + l.duration * 60000 < Date.now();
    return (
      <button key={key} type="button" onClick={(e) => { if (e.altKey) { const d = new Date(l.start); d.setDate(d.getDate() + 7); ls.forEach((x) => copyTo(x, d)); return; } setSel(sel === key ? null : key); }}
        draggable onDragStart={(e) => { e.dataTransfer.setData('text/plain', key); e.dataTransfer.effectAllowed = 'copyMove'; grab.current = e.clientY - (e.currentTarget as HTMLElement).getBoundingClientRect().top; }}
        className={`wg-l t-student--${st?.color ?? 'lime'} is-${l.status} ${l.status === 'planned' && past ? 'is-unmarked' : ''} ${sel === key ? 'is-sel' : ''} ${grp ? 'is-group' : ''}`}
        style={{ top, height: h }} title={`${fmtTime(l.start, t.lang)} ${st?.name ?? ''}`}>
        <b>{st?.name ?? '?'}</b>
        <span>{fmtTime(l.start, t.lang)}{l.duration !== 60 ? ` · ${l.duration}′` : ''}</span>
        {l.status === 'done' && <i className="wg-mark">✓</i>}
        {l.status === 'missed' && <i className="wg-mark">✕</i>}
      </button>
    );
  };

  return (
    <div className="wg">
      <div className="wg-scroll">
        <div className="wg-grid" style={{ gridTemplateColumns: `52px repeat(7, minmax(92px, 1fr))` }}>
          <div className="wg-corner" />
          {days.map((d) => (
            <div key={d.toISOString()} className={`wg-head ${sameDay(d, today) ? 'is-today' : ''}`}>
              <small>{d.toLocaleDateString(loc, { weekday: 'short' })}</small><b>{d.getDate()}</b>
            </div>
          ))}
          <div className="wg-times" style={{ height: H.length * ROW }}>
            {H.map((h) => <span key={h} style={{ top: (h - from) * ROW }}>{`${String(h).padStart(2, '0')}:00`}</span>)}
          </div>
          {days.map((d) => (
            <div key={d.toISOString()} className={`wg-col ${sameDay(d, today) ? 'is-today' : ''}`} style={{ height: H.length * ROW, backgroundSize: `100% ${ROW}px` }}
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = e.altKey || e.ctrlKey ? 'copy' : 'move'; }} onDrop={(e) => onDrop(e, d)}>
              {items.filter((x) => sameDay(new Date(x.l.start), d)).map(block)}
            </div>
          ))}
        </div>
      </div>

      {picked && (
        <div className="t-card wg-pop">
          <div className="t-card__head">
            <h2><span className={`t-dot t-dot--${pickedGroup?.color ?? pickedSt?.color ?? 'lime'}`} />{pickedGroup ? pickedGroup.name : pickedSt?.name ?? '?'} · {new Date(picked.start).toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' })}, {fmtTime(picked.start, t.lang)}</h2>
            <button type="button" className="t-icon-btn" onClick={() => setSel(null)} aria-label={t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}>✕</button>
          </div>
          {pickedItem && pickedGroup ? (
            <>
              <div className="t-head__actions" style={{ flexWrap: 'wrap' }}>
                {(['done', 'cancelled', 'planned'] as LessonStatus[]).map((x) => (
                  <button key={x} type="button" className={`mu-btn t-btn-sm ${x === 'done' ? 'mu-btn--lime' : ''}`} onClick={() => pickedItem.ls.forEach((l) => setLessonStatus(l.id, x))}>{t({ uk: 'Усім', ru: 'Всем', en: 'All' })}: {label[x]}</button>
                ))}
                <Link href="/teacher/groups" className="mu-btn t-btn-sm">{t({ uk: 'Група', ru: 'Группа', en: 'Group' })}</Link>
              </div>
              <div className="wg-members">
                {pickedItem.ls.map((l) => { const s = data.students.find((x) => x.id === l.studentId); return (
                  <div key={l.id} className="wg-member">
                    <Link href={`/teacher/students/${l.studentId}`}>{s?.name ?? '?'}</Link>
                    <button type="button" className={`g-chip ${l.status === 'done' ? 'is-on' : ''}`} onClick={() => setLessonStatus(l.id, 'done')}>{label.done}</button>
                    <button type="button" className={`g-chip ${l.status === 'missed' ? 'is-on' : ''}`} onClick={() => setLessonStatus(l.id, 'missed')}>{label.missed}</button>
                  </div>
                ); })}
              </div>
            </>
          ) : (
            <>
              <p className="t-muted">{t({ uk: 'Статус', ru: 'Статус', en: 'Status' })}: <b>{label[picked.status]}</b></p>
              <div className="t-head__actions" style={{ flexWrap: 'wrap' }}>
                {(['done', 'missed', 'cancelled', 'planned'] as LessonStatus[]).filter((x) => x !== picked.status).map((x) => (
                  <button key={x} type="button" className={`mu-btn t-btn-sm ${x === 'done' ? 'mu-btn--lime' : ''}`} onClick={() => setLessonStatus(picked.id, x)}>{label[x]}</button>
                ))}
                {pickedSt && <Link href={`/teacher/students/${pickedSt.id}`} className="mu-btn t-btn-sm">{t({ uk: 'Картка учня', ru: 'Карточка ученика', en: 'Student card' })}</Link>}
              </div>
            </>
          )}
          <div className="wg-copy">
            <small>{t({ uk: 'Копія на той самий час:', ru: 'Копия на то же время:', en: 'Copy at the same time:' })}</small>
            {days.filter((d) => !sameDay(d, new Date(picked.start))).map((d) => (
              <button key={d.toISOString()} type="button" className="g-chip" onClick={() => pickedItem?.ls.forEach((x) => copyTo(x, d))}>{d.toLocaleDateString(loc, { weekday: 'short', day: 'numeric' })}</button>
            ))}
            <button type="button" className="g-chip" onClick={() => { const d = new Date(picked.start); d.setDate(d.getDate() + 7); pickedItem?.ls.forEach((x) => copyTo(x, d)); }}>{t({ uk: '+ тиждень', ru: '+ неделя', en: '+ week' })}</button>
          </div>
          <div className="t-head__actions">
            <button type="button" className="t-link-btn" onClick={() => { pickedItem?.ls.forEach((x) => removeLesson(x.id)); setSel(null); }}>{t({ uk: 'Видалити заняття', ru: 'Удалить занятие', en: 'Delete lesson' })}</button>
          </div>
        </div>
      )}

      <div className="wg-legend">
        <span><i className="wg-sw" /> {label.planned}</span>
        <span><i className="wg-sw is-done" /> {label.done}</span>
        <span><i className="wg-sw is-missed" /> {label.missed}</span>
        <span><i className="wg-sw is-cancelled" /> {label.cancelled}</span>
        <span><i className="wg-sw is-unmarked" /> {t({ uk: 'Минув, не позначено', ru: 'Прошёл, не отмечен', en: 'Past, not marked' })}</span>
        <span className="wg-tip">{t({ uk: 'Перетягни заняття, щоб перенести. З Alt: копія. Alt + клік: копія на наступний тиждень.', ru: 'Перетащи занятие, чтобы перенести. С Alt: копия. Alt + клик: копия на следующую неделю.', en: 'Drag a lesson to move it. Hold Alt to copy. Alt + click copies it to next week.' })}</span>
      </div>
    </div>
  );
}
