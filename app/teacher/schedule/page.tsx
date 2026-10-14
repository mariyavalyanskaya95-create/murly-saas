'use client';
import { useState } from 'react';
import LessonRow from '@/components/teacher/LessonRow';
import { LessonForm } from '@/components/teacher/forms';
import { sameDay, useTeacher } from '@/lib/teacher-store';

function startOfWeek(d: Date) {
  const x = new Date(d); x.setHours(0, 0, 0, 0);
  const day = (x.getDay() + 6) % 7; // понеділок = 0
  x.setDate(x.getDate() - day);
  return x;
}

export default function SchedulePage() {
  const { data, ready } = useTeacher();
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState(false);
  if (!ready) return null;

  const monday = startOfWeek(new Date()); monday.setDate(monday.getDate() + offset * 7);
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(monday); d.setDate(d.getDate() + i); return d; });
  const sunday = days[6];
  const range = `${monday.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })} · ${sunday.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })}`;
  const today = new Date();
  const weekLessons = data.lessons.filter((l) => { const d = new Date(l.start); return d >= monday && d < new Date(sunday.getTime() + 86400000); });

  return (
    <div className="t-page">
      <div className="t-head">
        <div><p className="t-eyebrow">Розклад</p><h1>{range}</h1></div>
        <div className="t-head__actions">
          <button className="mu-btn t-btn-sm" onClick={() => setOffset(offset - 1)} aria-label="Попередній тиждень">←</button>
          {offset !== 0 && <button className="mu-btn t-btn-sm" onClick={() => setOffset(0)}>Цей тиждень</button>}
          <button className="mu-btn t-btn-sm" onClick={() => setOffset(offset + 1)} aria-label="Наступний тиждень">→</button>
          <button className="mu-btn mu-btn--lime" onClick={() => setOpen(!open)}>{open ? 'Закрити' : '+ Заняття'}</button>
        </div>
      </div>

      {open && <div className="t-card"><h2>Нове заняття</h2><LessonForm onDone={() => setOpen(false)} /></div>}

      <p className="t-muted">{weekLessons.filter((l) => l.status !== 'cancelled').length} занять цього тижня</p>

      <div className="t-week">
        {days.map((d) => {
          const ls = data.lessons.filter((l) => sameDay(new Date(l.start), d)).sort((a, b) => a.start.localeCompare(b.start));
          return (
            <section key={d.toISOString()} className={`t-day ${sameDay(d, today) ? 'is-today' : ''}`}>
              <h3>{((w) => w.charAt(0).toUpperCase() + w.slice(1))(d.toLocaleDateString('uk-UA', { weekday: 'long' }))}<span>{d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })}</span></h3>
              {ls.length ? ls.map((l) => <LessonRow key={l.id} l={l} showDate={false} />) : <p className="t-empty">Вільно</p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}
