'use client';
// Словник списком: англійське | переклад | приклад. Групи за датою уроку, пошук, старі дати згорнуті.
// Учитель може виправити запис прямо в рядку, учень може послухати.
import { useMemo, useState } from 'react';
import Icon from './Icon';
import { useT } from './LangProvider';

export type VocabItem = { id: string; en: string; uk: string; example?: string; at?: string; box?: number; wrong?: number };

const fmtDay = (d: string, lang: string) => new Date(`${d}T12:00:00`).toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });

export default function VocabList({ words, onEdit, onRemove, onSpeak, showTags }: {
  words: VocabItem[];
  onEdit?: (id: string, patch: { en: string; uk: string; example?: string }) => void;
  onRemove?: (id: string) => void;
  onSpeak?: (en: string) => void;
  showTags?: boolean;
}) {
  const t = useT();
  const [q, setQ] = useState('');
  const [edit, setEdit] = useState<{ id: string; en: string; uk: string; example: string } | null>(null);

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = s ? words.filter((w) => `${w.en} ${w.uk} ${w.example ?? ''}`.toLowerCase().includes(s)) : words;
    const m = new Map<string, VocabItem[]>();
    list.forEach((w) => { const k = (w.at || '').slice(0, 10); m.set(k, [...(m.get(k) ?? []), w]); });
    return Array.from(m).sort((a, b) => b[0].localeCompare(a[0]));
  }, [words, q]);

  const save = () => {
    if (!edit || !onEdit) return;
    if (edit.en.trim() && edit.uk.trim()) onEdit(edit.id, { en: edit.en.trim(), uk: edit.uk.trim(), example: edit.example.trim() || undefined });
    setEdit(null);
  };

  const row = (w: VocabItem) => {
    if (edit?.id === w.id) return (
      <li key={w.id} className="vl-row is-edit">
        <input value={edit.en} onChange={(e) => setEdit({ ...edit, en: e.target.value })} aria-label="English" autoFocus
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEdit(null); }} />
        <input value={edit.uk} onChange={(e) => setEdit({ ...edit, uk: e.target.value })} aria-label={t({ uk: 'Переклад', ru: 'Перевод', en: 'Translation' })}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEdit(null); }} />
        <input value={edit.example} onChange={(e) => setEdit({ ...edit, example: e.target.value })} placeholder={t({ uk: 'Приклад (необов’язково)', ru: 'Пример (необязательно)', en: 'Example (optional)' })}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEdit(null); }} />
        <span className="vl-act">
          <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={save}>{t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' })}</button>
          <button type="button" className="t-icon-btn" onClick={() => setEdit(null)} aria-label={t({ uk: 'Скасувати', ru: 'Отменить', en: 'Cancel' })}>✕</button>
        </span>
      </li>
    );
    const hard = (w.wrong ?? 0) >= 2 && (w.box ?? 0) < 3;
    const learned = (w.box ?? 0) >= 4;
    return (
      <li key={w.id} className="vl-row">
        <b className="vl-en">{w.en}</b>
        <span className="vl-uk">{w.uk}</span>
        <i className="vl-ex">{w.example ?? ''}</i>
        <span className="vl-act">
          {showTags && (hard ? <small className="t-word__tag is-hard">{t({ uk: 'важке', ru: 'трудное', en: 'hard' })}</small> : learned ? <small className="t-word__tag">{t({ uk: 'вивчене', ru: 'выучено', en: 'learned' })}</small> : null)}
          {onSpeak && <button type="button" className="t-icon-btn" onClick={() => onSpeak(w.en)} aria-label={`${t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}: ${w.en}`}><Icon id="e-head" /></button>}
          {onEdit && <button type="button" className="t-icon-btn" onClick={() => setEdit({ id: w.id, en: w.en, uk: w.uk, example: w.example ?? '' })} aria-label={`${t({ uk: 'Виправити', ru: 'Исправить', en: 'Edit' })}: ${w.en}`}><Icon id="e-pencil" /></button>}
          {onRemove && <button type="button" className="t-icon-btn" onClick={() => onRemove(w.id)} aria-label={`${t({ uk: 'Видалити', ru: 'Удалить', en: 'Delete' })}: ${w.en}`}>✕</button>}
        </span>
      </li>
    );
  };

  return (
    <div className="vl">
      {words.length > 12 && (
        <input className="vl-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ uk: 'Пошук у словнику', ru: 'Поиск в словаре', en: 'Search the dictionary' })} />
      )}
      {groups.length === 0 && <p className="t-muted">{t({ uk: 'Нічого не знайшлося.', ru: 'Ничего не нашлось.', en: 'Nothing found.' })}</p>}
      {groups.map(([day, ws], gi) => (
        <details key={day} className="vl-day" open={gi < 2 || !!q.trim()}>
          <summary>{day ? fmtDay(day, t.lang) : t({ uk: 'Без дати', ru: 'Без даты', en: 'No date' })} <span className="t-muted">· {ws.length}</span></summary>
          <ul className="vl-list">{ws.map(row)}</ul>
        </details>
      ))}
    </div>
  );
}
