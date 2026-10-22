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
  // заробіток: проведені уроки × ціна учня, по тижнях (з понеділка) і за місяць
  const price = (sid: string) => data.students.find((x) => x.id === sid)?.price ?? 0;
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - ((today.getDay() + 6) % 7));
  const nextMon = new Date(monday); nextMon.setDate(monday.getDate() + 7);
  const prevMon = new Date(monday); prevMon.setDate(monday.getDate() - 7);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const inRange = (iso: string, a: Date, b: Date) => { const d = new Date(iso); return d >= a && d < b; };
  const earned = (a: Date, b: Date) => data.lessons.filter((l) => l.status === 'done' && inRange(l.start, a, b));
  const sum = (ls: typeof data.lessons) => ls.reduce((n, l) => n + price(l.studentId), 0);
  const thisWeek = earned(monday, nextMon);
  const lastWeek = earned(prevMon, monday);
  const thisMonth = earned(monthStart, new Date(today.getFullYear(), today.getMonth() + 1, 1));
  const ahead = data.lessons.filter((l) => l.status === 'planned' && inRange(l.start, today, nextMon));
  const paidWeek = data.payments.filter((x) => inRange(x.at, monday, nextMon)).reduce((n, x) => n + x.amount, 0);
  const lessonsWord = (n: number) => plural(n, t.lang, { uk: ['урок', 'уроки', 'уроків'], ru: ['урок', 'урока', 'уроков'], en: ['lesson', 'lessons'] });
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

      <div className="t-card t-earn">
        <h2><Icon id="d-money" />{t({ uk: 'Заробіток', ru: 'Заработок', en: 'Earnings' })}</h2>
        <div className="t-earn__grid">
          <div className="t-earn__main">
            <small>{t({ uk: 'Цей тиждень', ru: 'Эта неделя', en: 'This week' })}</small>
            <b>{fmtMoney(sum(thisWeek), t.lang)}</b>
            <span>{thisWeek.length} {lessonsWord(thisWeek.length)} {t({ uk: 'проведено', ru: 'проведено', en: 'done' })}{ahead.length ? ` · ${t({ uk: 'ще', ru: 'ещё', en: 'plus' })} ${fmtMoney(sum(ahead), t.lang)} ${t({ uk: 'до неділі', ru: 'до воскресенья', en: 'by Sunday' })}` : ''}</span>
          </div>
          <div><small>{t({ uk: 'Минулий тиждень', ru: 'Прошлая неделя', en: 'Last week' })}</small><b>{fmtMoney(sum(lastWeek), t.lang)}</b><span>{lastWeek.length} {lessonsWord(lastWeek.length)}</span></div>
          <div><small>{t({ uk: 'Цей місяць', ru: 'Этот месяц', en: 'This month' })}</small><b>{fmtMoney(sum(thisMonth), t.lang)}</b><span>{thisMonth.length} {lessonsWord(thisMonth.length)}</span></div>
          <div><small>{t({ uk: 'Отримано оплат за тиждень', ru: 'Получено оплат за неделю', en: 'Payments received this week' })}</small><b>{fmtMoney(paidWeek, t.lang)}</b></div>
        </div>
        <p className="t-muted">{t({ uk: 'Рахуємо уроки зі статусом «Був» за ціною учня. «Не прийшов» і «Скасовано» не враховуються.', ru: 'Считаем уроки со статусом «Был» по цене ученика. «Не пришёл» и «Отменён» не учитываются.', en: 'We count lessons marked “Done” at each student’s price. No-shows and cancellations are not counted.' })}</p>
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
