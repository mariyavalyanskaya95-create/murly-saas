'use client';
import Link from 'next/link';
import Icon from '../Icon';
import { Lesson, fmtDate, fmtTime, lessonLink, useTeacher } from '@/lib/teacher-store';

export default function LessonRow({ l, showStudent = true, showDate = true }: { l: Lesson; showStudent?: boolean; showDate?: boolean }) {
  const { data, setLessonStatus, removeLesson } = useTeacher();
  const st = data.students.find((s) => s.id === l.studentId);
  const link = lessonLink(data, l);
  const past = new Date(l.start).getTime() + l.duration * 60000 < Date.now();

  return (
    <div className={`t-lesson is-${l.status}`}>
      <div className="t-lesson__time">
        <b>{fmtTime(l.start)}</b>
        {showDate && <span>{fmtDate(l.start)}</span>}
        <span>{l.duration} хв</span>
      </div>
      <div className="t-lesson__info">
        {showStudent && st && <Link href={`/teacher/students/${st.id}`} className="t-lesson__name"><span className={`t-dot t-dot--${st.color}`} />{st.name}</Link>}
        {l.topic && <span className="t-lesson__topic">{l.topic}</span>}
        {l.status === 'done' && <span className="t-tag t-tag--done">Проведено</span>}
        {l.status === 'cancelled' && <span className="t-tag">Скасовано</span>}
      </div>
      <div className="t-lesson__actions">
        {l.status === 'planned' && link && !past && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="mu-btn mu-btn--lime t-btn-sm"><Icon id="d-phone" />Дзвінок</a>
        )}
        {l.status === 'planned' && (
          <button className="mu-btn t-btn-sm" onClick={() => setLessonStatus(l.id, 'done')} title="Позначити проведеним">Проведено</button>
        )}
        {l.status === 'planned' && (
          <button className="t-icon-btn" onClick={() => setLessonStatus(l.id, 'cancelled')} aria-label="Скасувати заняття" title="Скасувати">✕</button>
        )}
        {l.status !== 'planned' && (
          <button className="t-icon-btn" onClick={() => setLessonStatus(l.id, 'planned')} aria-label="Повернути в заплановані" title="Повернути">↺</button>
        )}
        {l.status === 'cancelled' && (
          <button className="t-link-btn" onClick={() => removeLesson(l.id)}>Видалити</button>
        )}
      </div>
    </div>
  );
}
