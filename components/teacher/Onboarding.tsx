'use client';
// Чек-лист першого тижня: 6 кроків з прогресом. Зникає, коли все зроблено (або вчитель його сховав).
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from '../Icon';
import { useT } from '../LangProvider';
import { useTeacher } from '@/lib/teacher-store';

const HIDE = 'murly:onboard-hidden';

export default function Onboarding({ onAddStudent, onAddLesson }: { onAddStudent: () => void; onAddLesson: () => void }) {
  const t = useT();
  const { data } = useTeacher();
  const [tg, setTg] = useState<{ linked: boolean; link?: string } | null>(null);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    try { setHidden(localStorage.getItem(HIDE) === '1'); } catch { setHidden(false); }
    fetch(`/api/telegram?lang=${t.lang}`).then((r) => r.json()).then((j) => setTg({ linked: !!j.linked, link: j.link })).catch(() => setTg({ linked: false }));
  }, [t.lang]);

  const steps = [
    { done: !!data.settings.link, title: t({ uk: 'Встав посилання Zoom або Google Meet', ru: 'Вставь ссылку Zoom или Google Meet', en: 'Add your Zoom or Google Meet link' }), act: <Link href="/teacher/settings">{t({ uk: 'Налаштування', ru: 'Настройки', en: 'Settings' })}</Link> },
    { done: data.students.length > 0, title: t({ uk: 'Додай першого учня', ru: 'Добавь первого ученика', en: 'Add your first student' }), act: <button type="button" className="t-link-btn" onClick={onAddStudent}>{t({ uk: 'Додати', ru: 'Добавить', en: 'Add' })}</button> },
    { done: data.students.some((s) => s.joined || s.loginPin), title: t({ uk: 'Дай учню код або PIN для входу', ru: 'Дай ученику код или PIN для входа', en: 'Give a student their code or PIN' }), act: <Link href="/teacher/students">{t({ uk: 'Учні', ru: 'Ученики', en: 'Students' })}</Link> },
    { done: data.lessons.length > 0, title: t({ uk: 'Заплануй перше заняття', ru: 'Запланируй первое занятие', en: 'Schedule your first lesson' }), act: <button type="button" className="t-link-btn" onClick={onAddLesson}>{t({ uk: 'Запланувати', ru: 'Запланировать', en: 'Schedule' })}</button> },
    { done: data.homework.length > 0, title: t({ uk: 'Задай першу домашку', ru: 'Задай первую домашку', en: 'Set your first homework' }), act: <Link href="/teacher/students">{t({ uk: 'Обрати учня', ru: 'Выбрать ученика', en: 'Pick a student' })}</Link> },
    { done: !!tg?.linked, title: t({ uk: 'Підключи Telegram-бот: оплати й уроки з телефона', ru: 'Подключи Telegram-бот: оплаты и уроки с телефона', en: 'Connect the Telegram bot: payments and lessons from your phone' }), act: tg?.link ? <a href={tg.link} target="_blank" rel="noreferrer">{t({ uk: 'Підключити', ru: 'Подключить', en: 'Connect' })}</a> : <Link href="/teacher/settings">{t({ uk: 'Налаштування', ru: 'Настройки', en: 'Settings' })}</Link> },
  ];
  const n = steps.filter((s) => s.done).length;
  if (hidden || n === steps.length || tg === null) return null;
  return (
    <section className="t-card t-onb">
      <div className="t-onb__head">
        <h2><Icon id="c-cat-glass" />{t({ uk: 'Перший тиждень у Murly', ru: 'Первая неделя в Murly', en: 'Your first week in Murly' })}</h2>
        <span className="t-onb__count">{n} / {steps.length}</span>
      </div>
      <div className="t-onb__bar"><i style={{ width: `${(n / steps.length) * 100}%` }} /></div>
      <ol className="t-onb__list">
        {steps.map((s, i) => (
          <li key={i} className={s.done ? 'is-done' : ''}>
            <span className="t-onb__dot">{s.done ? '✓' : i + 1}</span>
            <span className="t-onb__title">{s.title}</span>
            {!s.done && <span className="t-onb__act">{s.act}</span>}
          </li>
        ))}
      </ol>
      <button type="button" className="t-onb__hide" onClick={() => { try { localStorage.setItem(HIDE, '1'); } catch { /* */ } setHidden(true); }}>{t({ uk: 'Сховати', ru: 'Скрыть', en: 'Hide' })}</button>
    </section>
  );
}
