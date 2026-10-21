'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/Icon';
import LessonRow from '@/components/teacher/LessonRow';
import { LessonForm, StudentForm } from '@/components/teacher/forms';
import { balanceOf, balanceText, fmtMoney, localeOf, plural, sameDay, useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

export default function TeacherToday() {
  const t = useT();
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
  const hello = hour < 12 ? t({ uk: 'Доброго ранку', ru: 'Доброе утро', en: 'Good morning' }) : hour < 18 ? t({ uk: 'Добрий день', ru: 'Добрый день', en: 'Good afternoon' }) : t({ uk: 'Добрий вечір', ru: 'Добрый вечер', en: 'Good evening' });

  return (
    <div className="t-page">
      <div className="t-head">
        <div>
          <p className="t-eyebrow">{today.toLocaleDateString(localeOf(t.lang), { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1>{hello}{data.settings.name ? `, ${data.settings.name}` : ''}!</h1>
        </div>
        <div className="t-head__actions">
          <button className="mu-btn" onClick={() => setOpen(open === 'student' ? null : 'student')}>{t({ uk: '+ Учень', ru: '+ Ученик', en: '+ Student' })}</button>
          <button className="mu-btn mu-btn--lime" onClick={() => setOpen(open === 'lesson' ? null : 'lesson')}>{t({ uk: '+ Заняття', ru: '+ Занятие', en: '+ Lesson' })}</button>
        </div>
      </div>

      {open === 'student' && <div className="t-card"><h2>{t({ uk: 'Новий учень', ru: 'Новый ученик', en: 'New student' })}</h2><StudentForm onDone={() => setOpen(null)} /></div>}
      {open === 'lesson' && <div className="t-card"><h2>{t({ uk: 'Нове заняття', ru: 'Новое занятие', en: 'New lesson' })}</h2><LessonForm onDone={() => setOpen(null)} /></div>}

      <div className="t-stats">
        <Link href="/teacher/students" className="t-stat t-stat--lime"><b>{data.students.length}</b><span>{plural(data.students.length, t.lang, { uk: ['учень', 'учні', 'учнів'], ru: ['ученик', 'ученика', 'учеников'], en: ['student', 'students'] })}</span></Link>
        <Link href="/teacher/schedule" className="t-stat t-stat--sky"><b>{todays.length}</b><span>{t({ uk: 'занять сьогодні', ru: 'занятий сегодня', en: 'lessons today' })}</span></Link>
        <Link href="/teacher/schedule" className="t-stat t-stat--mustard"><b>{week.length}</b><span>{t({ uk: 'на 7 днів', ru: 'на 7 дней', en: 'next 7 days' })}</span></Link>
        <Link href="/teacher/payments" className="t-stat t-stat--tomato"><b>{debtors.length}</b><span>{t({ uk: 'чекають оплату', ru: 'ждут оплату', en: 'awaiting payment' })}</span></Link>
      </div>

      {!data.students.length && (
        <div className="t-card t-welcome">
          <Icon id="c-cat-glass" className="mu-ic t-welcome__ic" />
          <div>
            <h2>{t({ uk: 'Почнімо з трьох кроків', ru: 'Начнём с трёх шагов', en: 'Let’s start with three steps' })}</h2>
            <ol>
              <li><Link href="/teacher/settings">{t({ uk: 'Встав своє посилання Zoom або Google Meet', ru: 'Вставь свою ссылку Zoom или Google Meet', en: 'Add your Zoom or Google Meet link' })}</Link></li>
              <li><button className="t-link-btn" onClick={() => setOpen('student')}>{t({ uk: 'Додай першого учня', ru: 'Добавь первого ученика', en: 'Add your first student' })}</button></li>
              <li>{t({ uk: 'Заплануй заняття, і воно з’явиться тут з кнопкою дзвінка', ru: 'Запланируй занятие, и оно появится здесь с кнопкой звонка', en: 'Schedule a lesson and it will show up here with a call button' })}</li>
            </ol>
          </div>
        </div>
      )}

      <section className="t-card">
        <h2><Icon id="e-cal" />{t({ uk: 'Сьогодні', ru: 'Сегодня', en: 'Today' })}</h2>
        {todays.length ? todays.map((l) => <LessonRow key={l.id} l={l} showDate={false} />) : <p className="t-empty">{t({ uk: 'Сьогодні занять немає.', ru: 'Сегодня занятий нет.', en: 'No lessons today.' })}</p>}
      </section>

      {overdue.filter((l) => !sameDay(new Date(l.start), today)).length > 0 && (
        <section className="t-card t-card--warn">
          <h2><Icon id="d-bolt" />{t({ uk: 'Не позначені', ru: 'Не отмечены', en: 'Not marked' })}</h2>
          <p className="t-muted">{t({ uk: 'Ці заняття вже минули. Познач, чи вони відбулися, щоб баланс учнів був точним.', ru: 'Эти занятия уже прошли. Отметь, состоялись ли они, чтобы баланс учеников был точным.', en: 'These lessons are in the past. Mark whether they happened so student balances stay accurate.' })}</p>
          {overdue.filter((l) => !sameDay(new Date(l.start), today)).map((l) => <LessonRow key={l.id} l={l} />)}
        </section>
      )}

      {data.homework.some((h) => h.status === 'done') && (
        <section className="t-card">
          <h2><Icon id="e-board" />{t({ uk: 'Домашка на перевірку', ru: 'Домашка на проверку', en: 'Homework to check' })}</h2>
          {data.homework.filter((h) => h.status === 'done').map((h) => {
            const st = data.students.find((s) => s.id === h.studentId);
            return (
              <Link key={h.id} href={`/teacher/students/${h.studentId}?tab=hw`} className="t-row-link">
                <span><span className={`t-dot t-dot--${st?.color ?? 'lime'}`} />{st?.name ?? t({ uk: 'Учень', ru: 'Ученик', en: 'Student' })} · {h.title}</span>
                <b>{h.score != null ? `${h.score}/${h.total}` : t({ uk: 'відповідь', ru: 'ответ', en: 'answer' })}</b>
              </Link>
            );
          })}
        </section>
      )}

      {debtors.length > 0 && (
        <section className="t-card">
          <h2><Icon id="d-money" />{t({ uk: 'Очікують оплату', ru: 'Ожидают оплату', en: 'Awaiting payment' })}</h2>
          {debtors.map(({ s, b }) => (
            <Link key={s.id} href={`/teacher/students/${s.id}?tab=pay`} className="t-row-link">
              <span><span className={`t-dot t-dot--${s.color}`} />{s.name}</span>
              {(() => { const bt = balanceText(s, b, t.lang); return <b className={bt.cls}>{bt.text}</b>; })()}
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
