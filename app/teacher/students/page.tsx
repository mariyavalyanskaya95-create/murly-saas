'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/Icon';
import { StudentForm } from '@/components/teacher/forms';
import { balanceOf, fmtDate, fmtMoney, fmtTime, useTeacher } from '@/lib/teacher-store';

export default function StudentsPage() {
  const { data, ready } = useTeacher();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  if (!ready) return null;

  const list = data.students.filter((s) => s.name.toLowerCase().includes(q.trim().toLowerCase()));
  const nextLesson = (id: string) => data.lessons
    .filter((l) => l.studentId === id && l.status === 'planned' && new Date(l.start) > new Date())
    .sort((a, b) => a.start.localeCompare(b.start))[0];

  return (
    <div className="t-page">
      <div className="t-head">
        <div><p className="t-eyebrow">Учні</p><h1>Мої учні</h1></div>
        <div className="t-head__actions">
          <button className="mu-btn mu-btn--lime" onClick={() => setOpen(!open)}>{open ? 'Закрити' : '+ Додати учня'}</button>
        </div>
      </div>

      {open && <div className="t-card"><h2>Новий учень</h2><StudentForm onDone={() => setOpen(false)} /></div>}

      {data.students.length > 3 && (
        <label className="v-search" style={{ marginBottom: 16 }}>
          <Icon id="d-seo" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Пошук учня" aria-label="Пошук учня" />
        </label>
      )}

      {!data.students.length && !open && (
        <div className="t-card t-welcome">
          <Icon id="d-team" className="mu-ic t-welcome__ic" />
          <div><h2>Тут поки порожньо</h2><p className="t-muted">Додай першого учня: ім’я, рівень і ціну заняття. Решту можна заповнити пізніше.</p>
            <button className="mu-btn mu-btn--lime" onClick={() => setOpen(true)}>+ Додати учня</button></div>
        </div>
      )}

      <div className="t-students">
        {list.map((s) => {
          const b = balanceOf(data, s.id);
          const n = nextLesson(s.id);
          const words = data.words.filter((w) => w.studentId === s.id).length;
          return (
            <Link key={s.id} href={`/teacher/students/${s.id}`} className={`t-student t-student--${s.color}`}>
              <div className="t-student__top">
                <span className="t-avatar">{s.name.slice(0, 1).toUpperCase()}</span>
                <div><b>{s.name}</b><span>{s.level} · {fmtMoney(s.price)} за заняття</span></div>
              </div>
              <div className="t-student__meta">
                <span><Icon id="e-cal" />{n ? `${fmtDate(n.start)}, ${fmtTime(n.start)}` : 'Немає занять'}</span>
                <span><Icon id="e-abc" />{words} слів у словнику</span>
                <span className={b < 0 ? 't-neg' : b > 0 ? 't-pos' : ''}><Icon id="d-money" />{b < 0 ? `Борг ${fmtMoney(-b)}` : b > 0 ? `Аванс ${fmtMoney(b)}` : 'Розраховані'}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
