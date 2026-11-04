'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Avatar from '@/components/Avatar';
import { StudentForm } from '@/components/teacher/forms';
import { balanceOf, balanceText, fmtDate, fmtMoney, fmtTime, plural, useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

export default function StudentsPage() {
  const t = useT();
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
        <div><p className="t-eyebrow">{t({ uk: 'Учні', ru: 'Ученики', en: 'Students' })}</p><h1>{t({ uk: 'Мої учні', ru: 'Мои ученики', en: 'My students' })}</h1></div>
        <div className="t-head__actions">
          <button className="mu-btn mu-btn--lime" onClick={() => setOpen(!open)}>{open ? t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' }) : t({ uk: '+ Додати учня', ru: '+ Добавить ученика', en: '+ Add student' })}</button>
        </div>
      </div>

      {open && <div className="t-card"><h2>{t({ uk: 'Новий учень', ru: 'Новый ученик', en: 'New student' })}</h2><StudentForm onDone={() => setOpen(false)} /></div>}

      {data.students.length > 3 && (
        <label className="v-search" style={{ marginBottom: 16 }}>
          <Icon id="d-seo" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ uk: 'Пошук учня', ru: 'Поиск ученика', en: 'Search students' })} aria-label={t({ uk: 'Пошук учня', ru: 'Поиск ученика', en: 'Search students' })} />
        </label>
      )}

      {!data.students.length && !open && (
        <div className="t-card t-welcome">
          <Icon id="d-team" className="mu-ic t-welcome__ic" />
          <div><h2>{t({ uk: 'Тут поки порожньо', ru: 'Здесь пока пусто', en: 'Nothing here yet' })}</h2><p className="t-muted">{t({ uk: 'Додай першого учня.', ru: 'Добавь первого ученика.', en: 'Add your first student.' })}</p>
            <button className="mu-btn mu-btn--lime" onClick={() => setOpen(true)}>{t({ uk: '+ Додати учня', ru: '+ Добавить ученика', en: '+ Add student' })}</button></div>
        </div>
      )}

      <div className="t-students">
        {list.map((s) => {
          const b = balanceOf(data, s.id);
          const n = nextLesson(s.id);
          const words = data.words.filter((w) => w.studentId === s.id).length;
          return (
            <div key={s.id} className="t-student-wrap">
            <Link href={`/teacher/students/${s.id}`} className={`t-student t-student--${s.color}`}>
              <div className="t-student__top">
                <Avatar avatar={s.avatar} image={s.image} name={s.name} />
                <div><b>{s.name}</b><span>{s.level}<span className="t-private"> · {fmtMoney(s.price, t.lang)} {t({ uk: 'за заняття', ru: 'за занятие', en: 'per lesson' })}</span></span></div>
              </div>
              <div className="t-student__meta">
                <span className="t-private"><Icon id="e-cal" />{n ? `${fmtDate(n.start, t.lang)}, ${fmtTime(n.start, t.lang)}` : t({ uk: 'Немає занять', ru: 'Нет занятий', en: 'No lessons' })}</span>
                <span><Icon id="e-abc" />{words} {plural(words, t.lang, { uk: ['слово', 'слова', 'слів'], ru: ['слово', 'слова', 'слов'], en: ['word', 'words'] })} {t({ uk: 'у словнику', ru: 'в словаре', en: 'in vocabulary' })}</span>
                {(() => { const bt = balanceText(s, b, t.lang); return <span className={`${bt.cls} t-private`}><Icon id="d-money" />{bt.text.charAt(0).toUpperCase() + bt.text.slice(1)}</span>; })()}
              </div>
            </Link>
            <div className="t-student__acts">
              <Link href={`/teacher/students/${s.id}?tab=hw`} className="mu-btn t-btn-sm"><Icon id="e-board" />{t({ uk: 'Домашка', ru: 'Домашка', en: 'Homework' })}</Link>
              <Link href={`/teacher/students/${s.id}?tab=pay`} className="mu-btn t-btn-sm t-private"><Icon id="d-money" />{t({ uk: 'Оплата', ru: 'Оплата', en: 'Payment' })}</Link>
              <Link href={`/teacher/students/${s.id}/lesson`} className="mu-btn mu-btn--lime t-btn-sm"><Icon id="d-phone" />{t({ uk: 'Урок', ru: 'Урок', en: 'Lesson' })}</Link>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
