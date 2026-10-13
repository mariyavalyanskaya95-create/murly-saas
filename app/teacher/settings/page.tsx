'use client';
import { useEffect, useState } from 'react';
import { Settings, useTeacher } from '@/lib/teacher-store';

const KINDS: { id: Settings['linkKind']; label: string; hint: string }[] = [
  { id: 'zoom', label: 'Zoom', hint: 'https://zoom.us/j/1234567890' },
  { id: 'meet', label: 'Google Meet', hint: 'https://meet.google.com/abc-defg-hij' },
  { id: 'other', label: 'Інше', hint: 'Будь-яке посилання на дзвінок' },
];

export default function SettingsPage() {
  const { data, ready, saveSettings } = useTeacher();
  const [f, setF] = useState<Settings>(data.settings);
  const [saved, setSaved] = useState(false);
  useEffect(() => { if (ready) setF(data.settings); }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!ready) return null;

  const kind = KINDS.find((k) => k.id === f.linkKind)!;
  const validLink = !f.link || /^https?:\/\//.test(f.link);

  return (
    <div className="t-page">
      <div className="t-head"><div><p className="t-eyebrow">Налаштування</p><h1>Твій кабінет</h1></div></div>
      <form className="t-card" onSubmit={(e) => { e.preventDefault(); if (validLink) { saveSettings({ ...f, link: f.link.trim(), name: f.name.trim() }); setSaved(true); } }}>
        <h2>Як до тебе звертатися</h2>
        <div className="t-form">
          <label>Ім’я<input value={f.name} onChange={(e) => { setF({ ...f, name: e.target.value }); setSaved(false); }} placeholder="Напр. Марія" /></label>
        </div>

        <h2>Дзвінки</h2>
        <p className="t-muted">Встав своє постійне посилання. Кнопка «Дзвінок» з’явиться біля кожного заняття. Для окремого учня посилання можна змінити в його профілі.</p>
        <div className="g-chips" style={{ justifyContent: 'flex-start', margin: '8px 0 14px' }}>
          {KINDS.map((k) => (
            <button key={k.id} type="button" className={`g-chip ${f.linkKind === k.id ? 'is-on' : ''}`} onClick={() => setF({ ...f, linkKind: k.id })}>{k.label}</button>
          ))}
        </div>
        <div className="t-form">
          <label className="t-form__wide">Посилання {kind.label}
            <input value={f.link} onChange={(e) => { setF({ ...f, link: e.target.value }); setSaved(false); }} placeholder={kind.hint} aria-invalid={!validLink} />
          </label>
          {!validLink && <p className="t-neg t-form__wide">Посилання має починатися з https://</p>}
          <div className="t-form__actions">
            {saved && <span className="t-pos">Збережено</span>}
            {f.link && validLink && <a href={f.link} target="_blank" rel="noopener noreferrer" className="mu-btn t-btn-sm">Перевірити</a>}
            <button className="mu-btn mu-btn--lime" type="submit">Зберегти</button>
          </div>
        </div>
        <p className="t-muted">Пізніше додамо автоматичне створення зустрічей у Zoom і Google Meet для кожного заняття.</p>
      </form>
    </div>
  );
}
