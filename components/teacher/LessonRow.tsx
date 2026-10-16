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
        {l.status === 'done' && <span className="t-tag t-tag--done">{t({ uk: 'Проведено', ru: 'Проведено', en: 'Done' })}</span>}
        {l.status === 'cancelled' && <span className="t-tag">{t({ uk: 'Скасовано', ru: 'Отменено', en: 'Cancelled' })}</span>}
      </div>
      <div className="t-lesson__actions">
        {l.status === 'planned' && link && !past && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="mu-btn mu-btn--lime t-btn-sm"><Icon id="d-phone" />{t({ uk: 'Дзвінок', ru: 'Звонок', en: 'Call' })}</a>
        )}
        {l.status === 'planned' && (
          <button className="mu-btn t-btn-sm" onClick={() => setLessonStatus(l.id, 'done')} title={t({ uk: 'Позначити проведеним', ru: 'Отметить проведённым', en: 'Mark as done' })}>{t({ uk: 'Проведено', ru: 'Проведено', en: 'Done' })}</button>
        )}
        {l.status === 'planned' && (
          <button className="t-icon-btn" onClick={() => setLessonStatus(l.id, 'cancelled')} aria-label={t({ uk: 'Скасувати заняття', ru: 'Отменить занятие', en: 'Cancel lesson' })} title={t({ uk: 'Скасувати', ru: 'Отменить', en: 'Cancel' })}>✕</button>
        )}
        {l.status !== 'planned' && (
          <button className="t-icon-btn" onClick={() => setLessonStatus(l.id, 'planned')} aria-label={t({ uk: 'Повернути в заплановані', ru: 'Вернуть в запланированные', en: 'Move back to planned' })} title={t({ uk: 'Повернути', ru: 'Вернуть', en: 'Restore' })}>↺</button>
        )}
        {l.status === 'cancelled' && (
          <button className="t-link-btn" onClick={() => removeLesson(l.id)}>{t({ uk: 'Видалити', ru: 'Удалить', en: 'Delete' })}</button>
        )}
      </div>
    </div>
  );
}
