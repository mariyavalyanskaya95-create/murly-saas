'use client';
// Нотатки вчителя про учня: день народження, вік, що любить, цілі. Бачить лише вчитель.
import { useState } from 'react';
import Icon from '@/components/Icon';
import { useT } from '@/components/LangProvider';
import { useTeacher, type Student, type StudentProfile } from '@/lib/teacher-store';
import type { T } from '@/lib/i18n';

const FIELDS: { k: keyof StudentProfile; label: T; ph: T }[] = [
  { k: 'job', label: { uk: 'Чим займається', ru: 'Чем занимается', en: 'Occupation / school' }, ph: { uk: 'Школа, клас, робота, університет', ru: 'Школа, класс, работа, университет', en: 'School, grade, job, university' } },
  { k: 'likes', label: { uk: 'Любить', ru: 'Любит', en: 'Likes' }, ph: { uk: 'Хобі, ігри, серіали, спорт, музика', ru: 'Хобби, игры, сериалы, спорт, музыка', en: 'Hobbies, games, shows, sport, music' } },
  { k: 'dislikes', label: { uk: 'Не любить', ru: 'Не любит', en: 'Dislikes' }, ph: { uk: 'Що нудно або неприємно', ru: 'Что скучно или неприятно', en: 'What feels boring or unpleasant' } },
  { k: 'goals', label: { uk: 'Цілі', ru: 'Цели', en: 'Goals' }, ph: { uk: 'НМТ, переїзд, робота, подорожі', ru: 'НМТ, переезд, работа, путешествия', en: 'Exam, moving abroad, work, travel' } },
  { k: 'family', label: { uk: 'Сім’я, тварини', ru: 'Семья, питомцы', en: 'Family, pets' }, ph: { uk: 'Брат Макс, кіт Пиріжок', ru: 'Брат Макс, кот Пирожок', en: 'Brother Max, a cat called Pie' } },
  { k: 'works', label: { uk: 'Що працює на уроці', ru: 'Что работает на уроке', en: 'What works in class' }, ph: { uk: 'Ігри, відео, швидкий темп', ru: 'Игры, видео, быстрый темп', en: 'Games, videos, fast pace' } },
  { k: 'avoid', label: { uk: 'Чого уникати', ru: 'Чего избегать', en: 'Avoid' }, ph: { uk: 'Теми, які краще не чіпати', ru: 'Темы, которые лучше не трогать', en: 'Topics better left alone' } },
  { k: 'extra', label: { uk: 'Інше', ru: 'Другое', en: 'Other' }, ph: { uk: 'Усе, що варто пам’ятати', ru: 'Всё, что стоит помнить', en: 'Anything worth remembering' } },
];

// вік і скільки днів до дня народження
export function birthdayInfo(b?: string) {
  if (!b || !/^\d{4}-\d{2}-\d{2}$/.test(b)) return null;
  const [y, m, d] = b.split('-').map(Number); const now = new Date(); now.setHours(0, 0, 0, 0);
  let next = new Date(now.getFullYear(), m - 1, d); if (next < now) next = new Date(now.getFullYear() + 1, m - 1, d);
  const days = Math.round((+next - +now) / 86400000);
  const age = y > 1900 ? next.getFullYear() - y - (days === 0 ? 0 : 1) : null;
  return { days, age, turns: y > 1900 ? next.getFullYear() - y : null };
}

export default function StudentDossier({ s }: { s: Student }) {
  const t = useT();
  const { updateStudent } = useTeacher();
  const p = s.profile ?? {};
  const [edit, setEdit] = useState(false);
  const [f, setF] = useState<StudentProfile>(p);
  const bi = birthdayInfo(p.birthday);
  const filled = FIELDS.filter((x) => p[x.k]);
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const clean: StudentProfile = {};
    (Object.keys(f) as (keyof StudentProfile)[]).forEach((k) => { const v = String(f[k] ?? '').trim(); if (v) clean[k] = v.slice(0, 400); });
    updateStudent(s.id, { profile: clean }); setEdit(false);
  };
  const dateFmt = (b: string) => new Date(`${b}T12:00:00`).toLocaleDateString(t.lang === 'en' ? 'en-GB' : t.lang === 'ru' ? 'ru-RU' : 'uk-UA', { day: 'numeric', month: 'long' });

  if (edit) return (
    <form className="t-card t-dossier t-private" onSubmit={save}>
      <div className="t-card__head"><h2><Icon id="e-book" />{t({ uk: 'Нотатки про учня', ru: 'Заметки об ученике', en: 'Notes about the student' })}</h2></div>
      <div className="t-dossier__form">
        <label>{t({ uk: 'День народження', ru: 'День рождения', en: 'Birthday' })}<input type="date" value={f.birthday ?? ''} onChange={(e) => setF({ ...f, birthday: e.target.value })} /></label>
        {FIELDS.map((x) => <label key={x.k}>{t(x.label)}<input value={f[x.k] ?? ''} onChange={(e) => setF({ ...f, [x.k]: e.target.value })} placeholder={t(x.ph)} maxLength={400} /></label>)}
      </div>
      <div className="t-head__actions"><button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' })}</button><button className="mu-btn" type="button" onClick={() => { setF(p); setEdit(false); }}>{t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' })}</button></div>
    </form>
  );

  return (
    <div className="t-card t-dossier t-private">
      <div className="t-card__head">
        <h2><Icon id="e-book" />{t({ uk: 'Нотатки про учня', ru: 'Заметки об ученике', en: 'Notes about the student' })}</h2>
        <button type="button" className="mu-btn t-btn-sm" onClick={() => { setF(p); setEdit(true); }}>{filled.length || p.birthday ? t({ uk: 'Змінити', ru: 'Изменить', en: 'Edit' }) : t({ uk: '+ Додати', ru: '+ Добавить', en: '+ Add' })}</button>
      </div>
      {p.birthday && bi && (
        <p className={`t-dossier__bday ${bi.days <= 7 ? 'is-soon' : ''}`}>
          <b>{dateFmt(p.birthday)}</b>
          {bi.age !== null && <span>{bi.age} {t({ uk: 'р.', ru: 'г.', en: 'y.o.' })}</span>}
          <span>{bi.days === 0 ? t({ uk: 'Сьогодні день народження!', ru: 'Сегодня день рождения!', en: 'Birthday today!' }) : t({ uk: `До дня народження ${bi.days} дн.`, ru: `До дня рождения ${bi.days} дн.`, en: `${bi.days} days to the birthday` })}</span>
        </p>
      )}
      {filled.length ? <dl className="t-dossier__list">{filled.map((x) => <div key={x.k}><dt>{t(x.label)}</dt><dd>{p[x.k]}</dd></div>)}</dl>
        : !p.birthday && <p className="t-muted">{t({ uk: 'Учень цього не бачить.', ru: 'Ученик этого не видит.', en: 'The student can’t see this.' })}</p>}
    </div>
  );
}
