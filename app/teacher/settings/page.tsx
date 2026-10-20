'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Settings, useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';
import type { T } from '@/lib/i18n';

const KINDS: { id: Settings['linkKind']; label: T; hint: T }[] = [
  { id: 'zoom', label: { uk: 'Zoom' }, hint: { uk: 'https://zoom.us/j/1234567890' } },
  { id: 'meet', label: { uk: 'Google Meet' }, hint: { uk: 'https://meet.google.com/abc-defg-hij' } },
  { id: 'other', label: { uk: 'Інше', ru: 'Другое', en: 'Other' }, hint: { uk: 'Будь-яке посилання на дзвінок', ru: 'Любая ссылка на звонок', en: 'Any call link' } },
];

export default function SettingsPage() {
  const t = useT();
  const { data, ready, saveSettings } = useTeacher();
  const [f, setF] = useState<Settings>(data.settings);
  const [saved, setSaved] = useState(false);
  useEffect(() => { if (ready) setF(data.settings); }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!ready) return null;

  const kind = KINDS.find((k) => k.id === f.linkKind)!;
  const validLink = !f.link || /^https?:\/\//.test(f.link);

  return (
    <div className="t-page">
      <div className="t-head"><div><p className="t-eyebrow">{t({ uk: 'Налаштування', ru: 'Настройки', en: 'Settings' })}</p><h1>{t({ uk: 'Твій кабінет', ru: 'Твой кабинет', en: 'Your dashboard' })}</h1></div></div>
      <div className="t-card t-mobile-only">
        <h2>{t({ uk: 'Матеріали', ru: 'Материалы', en: 'Materials' })}</h2>
        <div className="t-head__actions">
          <Link href="/teacher/games" className="mu-btn mu-btn--lime t-btn-sm">{t({ uk: 'Мої ігри', ru: 'Мои игры', en: 'My games' })}</Link>
          <Link href="/irregular-verbs/games" className="mu-btn t-btn-sm">{t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link>
          <Link href="/irregular-verbs" className="mu-btn t-btn-sm">{t({ uk: 'Дієслова', ru: 'Глаголы', en: 'Verbs' })}</Link>
          <Link href="/grammar" className="mu-btn t-btn-sm">{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</Link>
        </div>
      </div>
      <form className="t-card" onSubmit={(e) => { e.preventDefault(); if (validLink) { saveSettings({ ...f, link: f.link.trim(), name: f.name.trim() }); setSaved(true); } }}>
        <h2>{t({ uk: 'Як до тебе звертатися', ru: 'Как к тебе обращаться', en: 'What should we call you' })}</h2>
        <div className="t-form">
          <label>{t({ uk: 'Ім’я', ru: 'Имя', en: 'Name' })}<input value={f.name} onChange={(e) => { setF({ ...f, name: e.target.value }); setSaved(false); }} placeholder={t({ uk: 'Напр. Марія', ru: 'Напр. Мария', en: 'e.g. Maria' })} /></label>
        </div>

        <h2>{t({ uk: 'Дзвінки', ru: 'Звонки', en: 'Calls' })}</h2>
        <p className="t-muted">{t({ uk: 'Встав своє постійне посилання. Кнопка «Дзвінок» з’явиться біля кожного заняття. Для окремого учня посилання можна змінити в його профілі.', ru: 'Вставь свою постоянную ссылку. Кнопка «Звонок» появится возле каждого занятия. Для отдельного ученика ссылку можно изменить в его профиле.', en: 'Add your permanent link. A “Call” button will appear next to every lesson. You can change the link for a specific student in their profile.' })}</p>
        <div className="g-chips" style={{ justifyContent: 'flex-start', margin: '8px 0 14px' }}>
          {KINDS.map((k) => (
            <button key={k.id} type="button" className={`g-chip ${f.linkKind === k.id ? 'is-on' : ''}`} onClick={() => setF({ ...f, linkKind: k.id })}>{t(k.label)}</button>
          ))}
        </div>
        <div className="t-form">
          <label className="t-form__wide">{t({ uk: 'Посилання', ru: 'Ссылка', en: 'Link' })} {t(kind.label)}
            <input value={f.link} onChange={(e) => { setF({ ...f, link: e.target.value }); setSaved(false); }} placeholder={t(kind.hint)} aria-invalid={!validLink} />
          </label>
          {!validLink && <p className="t-neg t-form__wide">{t({ uk: 'Посилання має починатися з https://', ru: 'Ссылка должна начинаться с https://', en: 'The link must start with https://' })}</p>}
          <div className="t-form__actions">
            {saved && <span className="t-pos">{t({ uk: 'Збережено', ru: 'Сохранено', en: 'Saved' })}</span>}
            {f.link && validLink && <a href={f.link} target="_blank" rel="noopener noreferrer" className="mu-btn t-btn-sm">{t({ uk: 'Перевірити', ru: 'Проверить', en: 'Test' })}</a>}
            <button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' })}</button>
          </div>
        </div>
        <p className="t-muted">{t({ uk: 'Пізніше додамо автоматичне створення зустрічей у Zoom і Google Meet для кожного заняття.', ru: 'Позже добавим автоматическое создание встреч в Zoom и Google Meet для каждого занятия.', en: 'Later we will add automatic Zoom and Google Meet meetings for every lesson.' })}</p>
      </form>
    </div>
  );
}
