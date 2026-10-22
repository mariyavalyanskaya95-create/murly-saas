'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '../Icon';
import { Lesson, fmtDate, fmtTime, lessonLink, useTeacher } from '@/lib/teacher-store';
import { useT } from '../LangProvider';

export default function LessonRow({ l, showStudent = true, showDate = true }: { l: Lesson; showStudent?: boolean; showDate?: boolean }) {
  const t = useT();
  const { data, setLessonStatus, removeLesson, addLessons } = useTeacher();
  const [dup, setDup] = useState<string | null>(null); // дата для копії заняття
  const st = data.students.find((s) => s.id === l.studentId);
  const link = lessonLink(data, l);
  const past = new Date(l.start).getTime() + l.duration * 60000 < Date.now();
  const started = new Date(l.start).getTime() <= Date.now(); // «був / не прийшов» можна відмітити тільки коли урок уже почався

  const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const openDup = () => { const d = new Date(l.start); d.setDate(d.getDate() + 7); setDup(iso(d)); };
  const makeDup = () => {
    if (!dup) return;
    const s0 = new Date(l.start);
    const [y, m, dd] = dup.split('-').map(Number);
    const n = new Date(y, m - 1, dd, s0.getHours(), s0.getMinutes());
    addLessons({ studentId: l.studentId, start: n.toISOString(), duration: l.duration, topic: l.topic, link: l.link });
    setDup(null);
  };

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
            {started && <button className="mu-btn t-btn-sm t-st--done" onClick={() => setLessonStatus(l.id, 'done')} title={t({ uk: 'Урок відбувся', ru: 'Урок состоялся', en: 'The lesson took place' })}>{t({ uk: 'Був', ru: 'Был', en: 'Done' })}</button>}
            {started && <button className="mu-btn t-btn-sm t-st--missed" onClick={() => setLessonStatus(l.id, 'missed')} title={t({ uk: 'Учень не прийшов', ru: 'Ученик не пришёл', en: 'The student did not come' })}>{t({ uk: 'Не прийшов', ru: 'Не пришёл', en: 'No-show' })}</button>}
            <button className="mu-btn t-btn-sm" onClick={() => setLessonStatus(l.id, 'cancelled')} title={t({ uk: 'Урок скасовано', ru: 'Урок отменён', en: 'The lesson was cancelled' })}>{t({ uk: 'Скасовано', ru: 'Отменён', en: 'Cancelled' })}</button>
          </span>
        )}
        {l.status !== 'planned' && (
          <button className="t-icon-btn" onClick={() => setLessonStatus(l.id, 'planned')} aria-label={t({ uk: 'Змінити статус', ru: 'Изменить статус', en: 'Change status' })} title={t({ uk: 'Змінити статус', ru: 'Изменить статус', en: 'Change status' })}>↺</button>
        )}
        {dup === null
          ? <button className="t-icon-btn" onClick={openDup} aria-label={t({ uk: 'Дублювати заняття', ru: 'Дублировать занятие', en: 'Duplicate lesson' })} title={t({ uk: 'Дублювати: той самий час в інший день', ru: 'Дублировать: то же время в другой день', en: 'Duplicate: same time, another day' })}>⧉</button>
          : (
            <span className="t-dup">
              <input type="date" value={dup} onChange={(e) => setDup(e.target.value)} aria-label={t({ uk: 'Дата копії', ru: 'Дата копии', en: 'Copy date' })} />
              <button className="mu-btn mu-btn--lime t-btn-sm" onClick={makeDup}>{t({ uk: 'Додати', ru: 'Добавить', en: 'Add' })} {fmtTime(l.start, t.lang)}</button>
              <button className="t-icon-btn" onClick={() => setDup(null)} aria-label={t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' })}>✕</button>
            </span>
          )}
        {(l.status === 'cancelled' || l.status === 'missed') && (
          <button className="t-link-btn" onClick={() => removeLesson(l.id)}>{t({ uk: 'Видалити', ru: 'Удалить', en: 'Delete' })}</button>
        )}
      </div>
    </div>
  );
}
