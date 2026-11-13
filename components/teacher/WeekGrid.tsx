'use client';
// Розклад тижня сіткою: дні в стовпчиках, години в рядках, заняття кольором учня.
// Клік по заняттю: статус (був / не прийшов / скасовано), картка учня, видалити.
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { type Lesson, type LessonStatus, fmtTime, localeOf, sameDay, useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';
import SeriesTools from './SeriesTools';
import StudentColor from './StudentColor';

const ROW = 52; // висота години в пікселях

export default function WeekGrid({ days, theme = 'lavender' }: { days: Date[]; theme?: string }) {
  const t = useT();
  const loc = localeOf(t.lang);
  const { data, setLessonStatus, addLessons, updateLesson } = useTeacher();
  const grab = useRef(0); // де саме вчитель схопив блок (px від верху), щоб час не стрибав
  const [sel, setSel] = useState<string | null>(null);
  const [cp, setCp] = useState({ date: '', time: '', dur: 60 }); // копія з будь-якою датою, часом і тривалістю
  const [msg, setMsg] = useState('');
  const [note, setNote] = useState('');
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
    charged: t({ uk: 'Не прийшов, оплата списана', ru: 'Не пришёл, оплата списана', en: 'No-show, charged' }),
    cancelled: t({ uk: 'Скасовано', ru: 'Отменён', en: 'Cancelled' }),
  };

  // копія або перенесення заняття на інший день / час
  const copyTo = (l: Lesson, day: Date, h?: number, m?: number, dur?: number) => {
    const s0 = new Date(l.start);
    const n = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h ?? s0.getHours(), m ?? s0.getMinutes());
    return addLessons({ studentId: l.studentId, start: n.toISOString(), duration: dur ?? l.duration, topic: l.topic, link: l.link, groupId: l.groupId }) ?? 0;
  };
  const copyAll = (ls: Lesson[], day: Date, h?: number, m?: number, dur?: number) => {
    const n = ls.reduce((a, x) => a + copyTo(x, day, h, m, dur), 0);
    const when = `${day.toLocaleDateString(loc, { weekday: 'short', day: 'numeric', month: 'short' })}${h !== undefined ? `, ${String(h).padStart(2, '0')}:${String(m ?? 0).padStart(2, '0')}` : ''}`;
    setMsg(n ? t({ uk: `Готово: копія на ${when}.`, ru: `Готово: копия на ${when}.`, en: `Done: copy on ${when}.` }) : t({ uk: `На ${when} у учня вже є заняття, копію не створено.`, ru: `На ${when} у ученика уже есть занятие, копия не создана.`, en: `There is already a lesson on ${when}, no copy made.` }));
  };
  const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const hm = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  // коли вибираємо заняття: готуємо форму копії (через тиждень, той самий час) і примітку
  const pickKey = sel;
  useEffect(() => {
    const it = items.find((x) => x.key === pickKey); if (!it) return;
    const d = new Date(it.l.start); const nx = new Date(d); nx.setDate(nx.getDate() + 7);
    setCp({ date: iso(nx), time: hm(d), dur: it.l.duration }); setNote(it.l.topic ?? ''); setMsg('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickKey]);
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
    if (e.altKey || e.ctrlKey || e.metaKey) { copyAll(it.ls, day, h, m); setSel(it.key); return; }
    it.ls.forEach((x) => updateLesson(x.id, { start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m).toISOString() }));
    if (it.key.startsWith('g:')) setSel(null);
  };

  const block = ({ key, ls, l: l0 }: { key: string; ls: Lesson[]; l: Lesson }, i: number, arr: { l: Lesson }[]) => {
    // кілька занять на один час: ставимо поруч, а не одне на одне
    const same = arr.filter((x) => new Date(x.l.start).getTime() === new Date(l0.start).getTime());
    const pos = same.findIndex((x) => x.l === l0);
    const side = same.length > 1 ? { left: `calc(${(100 / same.length) * pos}% + 2px)`, right: 'auto', width: `calc(${100 / same.length}% - 4px)` } : {};
    const grp = l0.groupId ? (data.groups ?? []).find((g) => g.id === l0.groupId) : undefined;
    const l = { ...l0, status: groupStatus(ls) };
    const st = grp ? { name: `${grp.name} (${ls.length})`, color: grp.color } : data.students.find((s) => s.id === l.studentId);
    const d = new Date(l.start);
    const top = (d.getHours() - from + d.getMinutes() / 60) * ROW;
    const h = Math.max(26, (l.duration / 60) * ROW - 3);
    const past = d.getTime() + l.duration * 60000 < Date.now();
    return (
      <button key={key} type="button" onClick={() => setSel(sel === key ? null : key)}
        draggable onDragStart={(e) => { e.dataTransfer.setData('text/plain', key); e.dataTransfer.effectAllowed = 'copyMove'; grab.current = e.clientY - (e.currentTarget as HTMLElement).getBoundingClientRect().top; }}
        className={`wg-l t-student--${st?.color ?? 'lime'} is-${l.status} ${l.status === 'planned' && past ? 'is-unmarked' : ''} ${sel === key ? 'is-sel' : ''} ${grp ? 'is-group' : ''}`}
        style={{ top, height: h, ...side }} title={`${fmtTime(l.start, t.lang)} ${st?.name ?? ''}${l.topic ? ` · ${l.topic}` : ''}${!grp && (st as { tz?: string })?.tz ? ` · ${new Date(l.start).toLocaleTimeString(t.lang === 'en' ? 'en-GB' : t.lang === 'ru' ? 'ru-RU' : 'uk-UA', { hour: '2-digit', minute: '2-digit', timeZone: (st as { tz?: string }).tz })} (${(st as { tz?: string }).tz})` : ''}`}>
        <b>{st?.name ?? '?'}</b>
        <span>{fmtTime(l.start, t.lang)}{l.duration !== 60 ? ` · ${l.duration}′` : ''}</span>
        {l.topic && h >= 48 && <em className="wg-note">{l.topic}</em>}
        {l.topic && h < 48 && <i className="wg-note-dot" aria-hidden="true" />}
        {l.status === 'done' && <i className="wg-mark">✓</i>}
        {l.status === 'missed' && <i className="wg-mark">✕</i>}
        {l.status === 'charged' && <i className="wg-mark">₴</i>}
      </button>
    );
  };

  return (
    <div className={`wg wg--${theme}`}>
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
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = e.altKey || e.ctrlKey || e.metaKey ? 'copy' : 'move'; }} onDrop={(e) => onDrop(e, d)}>
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
                    <button type="button" className={`g-chip ${l.status === 'charged' ? 'is-on' : ''}`} onClick={() => setLessonStatus(l.id, 'charged')}>{t({ uk: 'Пропуск з оплатою', ru: 'Пропуск с оплатой', en: 'Charged no-show' })}</button>
                  </div>
                ); })}
              </div>
            </>
          ) : (
            <>
              <p className="t-muted">{t({ uk: 'Статус', ru: 'Статус', en: 'Status' })}: <b>{label[picked.status]}</b></p>
              <div className="t-head__actions" style={{ flexWrap: 'wrap' }}>
                {(['done', 'missed', 'charged', 'cancelled', 'planned'] as LessonStatus[]).filter((x) => x !== picked.status).map((x) => (
                  <button key={x} type="button" className={`mu-btn t-btn-sm ${x === 'done' ? 'mu-btn--lime' : ''}`} onClick={() => setLessonStatus(picked.id, x)}>{label[x]}</button>
                ))}
                {pickedSt && <Link href={`/teacher/students/${pickedSt.id}`} className="mu-btn t-btn-sm">{t({ uk: 'Картка учня', ru: 'Карточка ученика', en: 'Student card' })}</Link>}
              </div>
            </>
          )}
          {!pickedGroup && pickedSt && <div className="wg-edit"><label>{t({ uk: 'Колір учня', ru: 'Цвет ученика', en: 'Student colour' })}<StudentColor id={pickedSt.id} compact /></label></div>}
          <div className="wg-edit">
            <label>{t({ uk: 'Тривалість', ru: 'Длительность', en: 'Length' })}
              <span className="wg-durs">
                {[30, 45, 60, 90].map((m) => <button key={m} type="button" className={`g-chip ${picked.duration === m ? 'is-on' : ''}`} onClick={() => pickedItem?.ls.forEach((x) => updateLesson(x.id, { duration: m }))}>{m} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</button>)}
                <input type="number" min={10} max={240} step={5} value={picked.duration} onChange={(e) => { const v = Math.max(10, Math.min(240, Number(e.target.value) || 0)); pickedItem?.ls.forEach((x) => updateLesson(x.id, { duration: v })); }} aria-label={t({ uk: 'Своя тривалість, хв', ru: 'Своя длительность, мин', en: 'Custom length, min' })} />
              </span>
            </label>
            <label>{t({ uk: 'Примітка', ru: 'Примечание', en: 'Note' })}
              <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} onBlur={() => { if ((picked.topic ?? '') !== note.trim()) pickedItem?.ls.forEach((x) => updateLesson(x.id, { topic: note.trim() || undefined })); }}
                placeholder={t({ uk: 'Напр.: сьогодні 30 хв, ще 30 хв переносимо на наступний тиждень', ru: 'Напр.: сегодня 30 мин, ещё 30 мин переносим на следующую неделю', en: 'E.g. 30 min today, 30 more min moved to next week' })} />
            </label>
          </div>
          <div className="wg-copy">
            <small>{t({ uk: 'Копія на той самий час:', ru: 'Копия на то же время:', en: 'Copy at the same time:' })}</small>
            {days.filter((d) => !sameDay(d, new Date(picked.start))).map((d) => (
              <button key={d.toISOString()} type="button" className="g-chip" onClick={() => pickedItem && copyAll(pickedItem.ls, d, new Date(picked.start).getHours(), new Date(picked.start).getMinutes())}>{d.toLocaleDateString(loc, { weekday: 'short', day: 'numeric' })}</button>
            ))}
          </div>
          <div className="wg-copy">
            <small>{t({ uk: 'Або копія на будь-яку дату:', ru: 'Или копия на любую дату:', en: 'Or copy to any date:' })}</small>
            <input type="date" value={cp.date} onChange={(e) => setCp({ ...cp, date: e.target.value })} aria-label={t({ uk: 'Дата', ru: 'Дата', en: 'Date' })} />
            <input type="time" value={cp.time} step={300} onChange={(e) => setCp({ ...cp, time: e.target.value })} aria-label={t({ uk: 'Час', ru: 'Время', en: 'Time' })} />
            <input type="number" min={10} max={240} step={5} value={cp.dur} onChange={(e) => setCp({ ...cp, dur: Number(e.target.value) || 60 })} aria-label={t({ uk: 'Хвилин', ru: 'Минут', en: 'Minutes' })} style={{ width: 70 }} />
            <span className="t-muted">{t({ uk: 'хв', ru: 'мин', en: 'min' })}</span>
            <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={() => { if (!pickedItem || !cp.date || !cp.time) return; const [y, mo, dd] = cp.date.split('-').map(Number); const [hh, mm] = cp.time.split(':').map(Number); copyAll(pickedItem.ls, new Date(y, mo - 1, dd), hh, mm, cp.dur); }}>{t({ uk: 'Створити копію', ru: 'Создать копию', en: 'Make a copy' })}</button>
          </div>
          {msg && <p className="wg-msg" role="status">{msg}</p>}
          {pickedItem && <SeriesTools key={pickedItem.key} ls={pickedItem.ls} onDone={() => setSel(null)} />}
        </div>
      )}

      <div className="wg-legend">
        <span><i className="wg-sw" /> {label.planned}</span>
        <span><i className="wg-sw is-done" /> {label.done}</span>
        <span><i className="wg-sw is-missed" /> {label.missed}</span>
        <span><i className="wg-sw is-cancelled" /> {label.cancelled}</span>
        <span><i className="wg-sw is-unmarked" /> {t({ uk: 'Минув, не позначено', ru: 'Прошёл, не отмечен', en: 'Past, not marked' })}</span>
        <span className="wg-tip">{t({ uk: 'Перетягни заняття, щоб перенести. З затиснутим Alt або Ctrl буде копія.', ru: 'Перетащи занятие, чтобы перенести. С зажатым Alt или Ctrl получится копия.', en: 'Drag a lesson to move it. Hold Alt or Ctrl to copy.' })}</span>
      </div>
    </div>
  );
}
