'use client';
// Продовжити розклад: повторити останній тиждень занять учня (або всіх) ще на 4, 8 чи 12 тижнів
import { useMemo, useState } from 'react';
import { type Lesson, fmtTime, localeOf, useTeacher } from '@/lib/teacher-store';
import { useT } from '../LangProvider';

const WEEK = 7 * 864e5;

// Шаблон учня: заняття за останні 7 днів до його найпізнішого заняття (скасовані не беремо)
function pattern(lessons: Lesson[], studentId: string) {
  const mine = lessons.filter((l) => l.studentId === studentId && l.status !== 'cancelled');
  if (!mine.length) return { rows: [] as Lesson[], last: 0 };
  const last = Math.max(...mine.map((l) => new Date(l.start).getTime()));
  return { rows: mine.filter((l) => new Date(l.start).getTime() > last - WEEK), last };
}

export default function ExtendSchedule({ onDone }: { onDone?: () => void }) {
  const t = useT();
  const loc = localeOf(t.lang);
  const { data, addLessons } = useTeacher();
  const [who, setWho] = useState('all');
  const [weeks, setWeeks] = useState(4);
  const [done, setDone] = useState('');
  const ids = who === 'all' ? data.students.map((s) => s.id) : [who];
  const plan = useMemo(() => ids.map((id) => ({ id, ...pattern(data.lessons, id) })).filter((p) => p.rows.length), [ids.join(','), data.lessons]); // eslint-disable-line react-hooks/exhaustive-deps
  const total = plan.reduce((n, p) => n + p.rows.length, 0) * weeks;

  const run = () => {
    plan.forEach((p) => p.rows.forEach((l) => {
      const from = new Date(new Date(l.start).getTime() + WEEK); // наступний тиждень після шаблону
      addLessons({ studentId: l.studentId, start: from.toISOString(), duration: l.duration, topic: undefined, link: l.link, groupId: l.groupId }, weeks);
    }));
    setDone(t({ uk: `Додано ${total} занять.`, ru: `Добавлено ${total} занятий.`, en: `${total} lessons added.` }));
    onDone?.();
  };

  return (
    <div className="ex-sched">
      <div className="st-fields">
        <label>{t({ uk: 'Учень', ru: 'Ученик', en: 'Student' })}
          <select value={who} onChange={(e) => { setWho(e.target.value); setDone(''); }}>
            <option value="all">{t({ uk: 'Усі учні', ru: 'Все ученики', en: 'All students' })}</option>
            {data.students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </label>
      </div>
      <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
        {[4, 8, 12, 16].map((w) => <button key={w} type="button" className={`g-chip ${weeks === w ? 'is-on' : ''}`} onClick={() => { setWeeks(w); setDone(''); }}>{w} {t({ uk: 'тижнів', ru: 'недель', en: 'weeks' })}</button>)}
      </div>
      {plan.length ? (
        <ul className="ex-sched__list">
          {plan.map((p) => {
            const st = data.students.find((s) => s.id === p.id);
            const slots = p.rows.slice().sort((a, b) => a.start.localeCompare(b.start)).map((l) => `${new Date(l.start).toLocaleDateString(loc, { weekday: 'short' })} ${fmtTime(l.start, t.lang)}`).join(', ');
            return <li key={p.id}><b>{st?.name}</b>: {slots} <small>{t({ uk: 'після', ru: 'после', en: 'after' })} {new Date(p.last).toLocaleDateString(loc, { day: 'numeric', month: 'short' })}</small></li>;
          })}
        </ul>
      ) : <p className="t-muted">{t({ uk: 'Немає занять, які можна повторити.', ru: 'Нет занятий, которые можно повторить.', en: 'No lessons to repeat.' })}</p>}
      <div className="st-row">
        <button type="button" className="mu-btn mu-btn--lime" disabled={!total} onClick={run}>{t({ uk: `Додати ${total} занять`, ru: `Добавить ${total} занятий`, en: `Add ${total} lessons` })}</button>
        {done && <span className="t-muted">{done}</span>}
      </div>
      <p className="t-muted">{t({ uk: 'Беремо останній тиждень занять кожного учня і повторюємо його далі в ті самі дні й години.', ru: 'Берём последнюю неделю занятий каждого ученика и повторяем её дальше в те же дни и часы.', en: 'We take each student’s last week of lessons and repeat it on the same days and times.' })}</p>
    </div>
  );
}
