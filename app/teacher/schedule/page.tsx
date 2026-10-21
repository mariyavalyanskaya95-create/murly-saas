'use client';
import { useState } from 'react';
import LessonRow from '@/components/teacher/LessonRow';
import { LessonForm } from '@/components/teacher/forms';
import ScheduleImport from '@/components/teacher/ScheduleImport';
import { localeOf, plural, sameDay, useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

function startOfWeek(d: Date) {
  const x = new Date(d); x.setHours(0, 0, 0, 0);
  const day = (x.getDay() + 6) % 7; // понеділок = 0
  x.setDate(x.getDate() - day);
  return x;
}

export default function SchedulePage() {
  const t = useT();
  const loc = localeOf(t.lang);
  const { data, ready } = useTeacher();
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState(false);
  const [imp, setImp] = useState(false);
  if (!ready) return null;

  const monday = startOfWeek(new Date()); monday.setDate(monday.getDate() + offset * 7);
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(monday); d.setDate(d.getDate() + i); return d; });
  const sunday = days[6];
  const range = `${monday.toLocaleDateString(loc, { day: 'numeric', month: 'short' })} · ${sunday.toLocaleDateString(loc, { day: 'numeric', month: 'short' })}`;
  const today = new Date();
  const weekLessons = data.lessons.filter((l) => { const d = new Date(l.start); return d >= monday && d < new Date(sunday.getTime() + 86400000); });

  return (
    <div className="t-page">
      <div className="t-head">
        <div><p className="t-eyebrow">{t({ uk: 'Розклад', ru: 'Расписание', en: 'Schedule' })}</p><h1>{range}</h1></div>
        <div className="t-head__actions">
          <button className="mu-btn t-btn-sm" onClick={() => setOffset(offset - 1)} aria-label={t({ uk: 'Попередній тиждень', ru: 'Предыдущая неделя', en: 'Previous week' })}>←</button>
          {offset !== 0 && <button className="mu-btn t-btn-sm" onClick={() => setOffset(0)}>{t({ uk: 'Цей тиждень', ru: 'Эта неделя', en: 'This week' })}</button>}
          <button className="mu-btn t-btn-sm" onClick={() => setOffset(offset + 1)} aria-label={t({ uk: 'Наступний тиждень', ru: 'Следующая неделя', en: 'Next week' })}>→</button>
          <button className="mu-btn" onClick={() => { setImp(!imp); setOpen(false); }}>{imp ? t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' }) : t({ uk: 'Списком або зі скріну', ru: 'Списком или со скрина', en: 'From a list or screenshot' })}</button>
          <button className="mu-btn mu-btn--lime" onClick={() => { setOpen(!open); setImp(false); }}>{open ? t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' }) : t({ uk: '+ Заняття', ru: '+ Занятие', en: '+ Lesson' })}</button>
        </div>
      </div>

      {imp && <div className="t-card"><h2>{t({ uk: 'Розклад списком або зі скріну', ru: 'Расписание списком или со скрина', en: 'Schedule from a list or screenshot' })}</h2><ScheduleImport onDone={() => setImp(false)} /></div>}
      {open && <div className="t-card"><h2>{t({ uk: 'Нове заняття', ru: 'Новое занятие', en: 'New lesson' })}</h2><LessonForm onDone={() => setOpen(false)} /></div>}

      <p className="t-muted">{((n) => `${n} ${plural(n, t.lang, { uk: ['заняття', 'заняття', 'занять'], ru: ['занятие', 'занятия', 'занятий'], en: ['lesson', 'lessons'] })} ${t({ uk: 'цього тижня', ru: 'на этой неделе', en: 'this week' })}`)(weekLessons.filter((l) => l.status !== 'cancelled').length)}</p>

      <div className="t-week">
        {days.map((d) => {
          const ls = data.lessons.filter((l) => sameDay(new Date(l.start), d)).sort((a, b) => a.start.localeCompare(b.start));
          return (
            <section key={d.toISOString()} className={`t-day ${sameDay(d, today) ? 'is-today' : ''}`}>
              <h3>{((w) => w.charAt(0).toUpperCase() + w.slice(1))(d.toLocaleDateString(loc, { weekday: 'long' }))}<span>{d.toLocaleDateString(loc, { day: 'numeric', month: 'short' })}</span></h3>
              {ls.length ? ls.map((l) => <LessonRow key={l.id} l={l} showDate={false} />) : <p className="t-empty">{t({ uk: 'Вільно', ru: 'Свободно', en: 'Free' })}</p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}
