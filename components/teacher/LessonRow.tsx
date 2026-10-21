'use client';
import Link from 'next/link';
import Icon from '../Icon';
import { Lesson, fmtDate, fmtTime, lessonLink, useTeacher } from '@/lib/teacher-store';
import { useT } from '../LangProvider';

export default function LessonRow({ l, showStudent = true, showDate = true }: { l: Lesson; showStudent?: boolean; showDate?: boolean }) {
  const t = useT();
  const { data, setLessonStatus, removeLesson } = useTeacher();
  const st = data.students.find((s) => s.id === l.studentId);
  const link = lessonLink(data, l);
  const past = new Date(l.start).getTime() + l.duration * 60000 < Date.now();

  return (
    <div className={`t-lesson is-${l.status}`}>
      <div className="t-lesson__time">
        <b>{fmtTime(l.start, t.lang)}</b>
        {showDate && <span>{fmtDate(l.start, t.lang)}</span>}
        <span>{l.duration} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span>
      </div>
      <div className="t-lesson__info">
        {showStudent && st && <Link href={`/teacher/students/${st.id}`} className="t-lesson__name"><span className={`t-dot t-dot--${st.color}`} />{st.name}</Link>}
        {l.topic && <span className="t-lesson__topic">{l.topic}</span>}
        {l.status === 'done' && <span className="t-tag t-tag--done">{t({ uk: 'Відбувся', ru: 'Состоялся', en: 'Took place' })}</span>}
        {l.status === 'missed' && <span className="t-tag t-tag--late">{t({ uk: 'Не прийшов', ru: 'Не пришёл', en: 'No-show' })}</span>}
        {l.status === 'cancelled' && <span className="t-tag">{t({ uk: 'Скасовано', ru: 'Отменён', en: 'Cancelled' })}</span>}
        {l.status === 'planned' && past && <span className="t-tag t-tag--warn">{t({ uk: 'Познач, чи був урок', ru: 'Отметь, был ли урок', en: 'Mark what happened' })}</span>}
      </div>
      <div className="t-lesson__actions">
        {l.status === 'planned' && link && !past && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="mu-btn mu-btn--lime t-btn-sm"><Icon id="d-phone" />{t({ uk: 'Дзвінок', ru: 'Звонок', en: 'Call' })}</a>
        )}
        {l.status === 'planned' && (
          <span className="t-lesson__st">
            <button className="mu-btn t-btn-sm t-st--done" onClick={() => setLessonStatus(l.id, 'done')} title={t({ uk: 'Урок відбувся', ru: 'Урок состоялся', en: 'The lesson took place' })}>{t({ uk: 'Був', ru: 'Был', en: 'Done' })}</button>
            <button className="mu-btn t-btn-sm t-st--missed" onClick={() => setLessonStatus(l.id, 'missed')} title={t({ uk: 'Учень не прийшов', ru: 'Ученик не пришёл', en: 'The student did not come' })}>{t({ uk: 'Не прийшов', ru: 'Не пришёл', en: 'No-show' })}</button>
            <button className="mu-btn t-btn-sm" onClick={() => setLessonStatus(l.id, 'cancelled')} title={t({ uk: 'Урок скасовано', ru: 'Урок отменён', en: 'The lesson was cancelled' })}>{t({ uk: 'Скасовано', ru: 'Отменён', en: 'Cancelled' })}</button>
          </span>
        )}
        {l.status !== 'planned' && (
          <button className="t-icon-btn" onClick={() => setLessonStatus(l.id, 'planned')} aria-label={t({ uk: 'Змінити статус', ru: 'Изменить статус', en: 'Change status' })} title={t({ uk: 'Змінити статус', ru: 'Изменить статус', en: 'Change status' })}>↺</button>
        )}
        {(l.status === 'cancelled' || l.status === 'missed') && (
          <button className="t-link-btn" onClick={() => removeLesson(l.id)}>{t({ uk: 'Видалити', ru: 'Удалить', en: 'Delete' })}</button>
        )}
      </div>
    </div>
  );
}
