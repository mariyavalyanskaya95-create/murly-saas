'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/Icon';
import LessonRow from '@/components/teacher/LessonRow';
import { LessonForm, StudentForm } from '@/components/teacher/forms';
import { balanceOf, fmtMoney, sameDay, useTeacher } from '@/lib/teacher-store';

export default function TeacherToday() {
  const { data, ready } = useTeacher();
  const [open, setOpen] = useState<'student' | 'lesson' | null>(null);
  if (!ready) return null;

  const today = new Date();
  const weekEnd = new Date(); weekEnd.setDate(weekEnd.getDate() + 7);
  const planned = data.lessons.filter((l) => l.status === 'planned').sort((a, b) => a.start.localeCompare(b.start));
  const todays = planned.filter((l) => sameDay(new Date(l.start), today));
  const week = planned.filter((l) => new Date(l.start) <= weekEnd && new Date(l.start) >= today);
  const overdue = planned.filter((l) => new Date(l.start).getTime() + l.duration * 60000 < Date.now());
  const debtors = data.students.map((s) => ({ s, b: balanceOf(data, s.id) })).filter((x) => x.b < 0);
  const hour = today.getHours();
  const hello = hour < 12 ? 'Доброго ранку' : hour < 18 ? 'Добрий день' : 'Добрий вечір';

  return (
    <div className="t-page">
      <div className="t-head">
        <div>
          <p className="t-eyebrow">{today.toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1>{hello}{data.settings.name ? `, ${data.settings.name}` : ''}!</h1>
        </div>
        <div className="t-head__actions">
          <button className="mu-btn" onClick={() => setOpen(open === 'student' ? null : 'student')}>+ Учень</button>
          <button className="mu-btn mu-btn--lime" onClick={() => setOpen(open === 'lesson' ? null : 'lesson')}>+ Заняття</button>
        </div>
      </div>

      {open === 'student' && <div className="t-card"><h2>Новий учень</h2><StudentForm onDone={() => setOpen(null)} /></div>}
      {open === 'lesson' && <div className="t-card"><h2>Нове заняття</h2><LessonForm onDone={() => setOpen(null)} /></div>}

      <div className="t-stats">
        <Link href="/teacher/students" className="t-stat t-stat--lime"><b>{data.students.length}</b><span>учнів</span></Link>
        <Link href="/teacher/schedule" className="t-stat t-stat--sky"><b>{todays.length}</b><span>занять сьогодні</span></Link>
        <Link href="/teacher/schedule" className="t-stat t-stat--mustard"><b>{week.length}</b><span>на 7 днів</span></Link>
        <Link href="/teacher/payments" className="t-stat t-stat--tomato"><b>{debtors.length}</b><span>з боргом</span></Link>
      </div>

      {!data.students.length && (
        <div className="t-card t-welcome">
          <Icon id="c-cat-glass" className="mu-ic t-welcome__ic" />
          <div>
            <h2>Почнімо з трьох кроків</h2>
            <ol>
              <li><Link href="/teacher/settings">Встав своє посилання Zoom або Google Meet</Link></li>
              <li><button className="t-link-btn" onClick={() => setOpen('student')}>Додай першого учня</button></li>
              <li>Заплануй заняття, і воно з’явиться тут з кнопкою дзвінка</li>
            </ol>
          </div>
        </div>
      )}

      <section className="t-card">
        <h2><Icon id="e-cal" />Сьогодні</h2>
        {todays.length ? todays.map((l) => <LessonRow key={l.id} l={l} showDate={false} />) : <p className="t-empty">Сьогодні занять немає.</p>}
      </section>

      {overdue.filter((l) => !sameDay(new Date(l.start), today)).length > 0 && (
        <section className="t-card t-card--warn">
          <h2><Icon id="d-bolt" />Не позначені</h2>
          <p className="t-muted">Ці заняття вже минули. Познач, чи вони відбулися, щоб баланс учнів був точним.</p>
          {overdue.filter((l) => !sameDay(new Date(l.start), today)).map((l) => <LessonRow key={l.id} l={l} />)}
        </section>
      )}

      {data.homework.some((h) => h.status === 'done') && (
        <section className="t-card">
          <h2><Icon id="e-board" />Домашка на перевірку</h2>
          {data.homework.filter((h) => h.status === 'done').map((h) => {
            const st = data.students.find((s) => s.id === h.studentId);
            return (
              <Link key={h.id} href={`/teacher/students/${h.studentId}?tab=hw`} className="t-row-link">
                <span><span className={`t-dot t-dot--${st?.color ?? 'lime'}`} />{st?.name ?? 'Учень'} · {h.title}</span>
                <b>{h.score != null ? `${h.score}/${h.total}` : 'відповідь'}</b>
              </Link>
            );
          })}
        </section>
      )}

      {debtors.length > 0 && (
        <section className="t-card">
          <h2><Icon id="d-money" />Очікують оплату</h2>
          {debtors.map(({ s, b }) => (
            <Link key={s.id} href={`/teacher/students/${s.id}?tab=pay`} className="t-row-link">
              <span><span className={`t-dot t-dot--${s.color}`} />{s.name}</span>
              <b className="t-neg">{fmtMoney(b)}</b>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
