'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Avatar from '@/components/Avatar';
import { StudentForm } from '@/components/teacher/forms';
import { balanceOf, fmtDate, fmtMoney, fmtTime, plural, useTeacher } from '@/lib/teacher-store';
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
          <div><h2>{t({ uk: 'Тут поки порожньо', ru: 'Здесь пока пусто', en: 'Nothing here yet' })}</h2><p className="t-muted">{t({ uk: 'Додай першого учня: ім’я, рівень і ціну заняття. Решту можна заповнити пізніше.', ru: 'Добавь первого ученика: имя, уровень и цену занятия. Остальное можно заполнить позже.', en: 'Add your first student: name, level and lesson price. You can fill in the rest later.' })}</p>
            <button className="mu-btn mu-btn--lime" onClick={() => setOpen(true)}>{t({ uk: '+ Додати учня', ru: '+ Добавить ученика', en: '+ Add student' })}</button></div>
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
                <Avatar avatar={s.avatar} image={s.image} name={s.name} />
                <div><b>{s.name}</b><span>{s.level} · {fmtMoney(s.price, t.lang)} {t({ uk: 'за заняття', ru: 'за занятие', en: 'per lesson' })}</span></div>
              </div>
              <div className="t-student__meta">
                <span><Icon id="e-cal" />{n ? `${fmtDate(n.start, t.lang)}, ${fmtTime(n.start, t.lang)}` : t({ uk: 'Немає занять', ru: 'Нет занятий', en: 'No lessons' })}</span>
                <span><Icon id="e-abc" />{words} {plural(words, t.lang, { uk: ['слово', 'слова', 'слів'], ru: ['слово', 'слова', 'слов'], en: ['word', 'words'] })} {t({ uk: 'у словнику', ru: 'в словаре', en: 'in vocabulary' })}</span>
                <span className={b < 0 ? 't-neg' : b > 0 ? 't-pos' : ''}><Icon id="d-money" />{b < 0 ? `${t({ uk: 'Борг', ru: 'Долг', en: 'Owes' })} ${fmtMoney(-b, t.lang)}` : b > 0 ? `${t({ uk: 'Аванс', ru: 'Аванс', en: 'Prepaid' })} ${fmtMoney(b, t.lang)}` : t({ uk: 'Розраховані', ru: 'Рассчитались', en: 'Settled' })}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
