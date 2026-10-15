'use client';
import { useMemo, useState } from 'react';
import { useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

export type PickWord = { en: string; uk: string; on: boolean };
const key = (s: string) => s.trim().toLowerCase();

// Вибір слів для словника учня: кожне слово окремо, можна виправити переклад і додати своє
export default function WordPicker({ words, setWords, studentIds }: {
  words: PickWord[]; setWords: (w: PickWord[]) => void; studentIds: string[];
}) {
  const t = useT();
  const { data } = useTeacher();
  const [en, setEn] = useState('');
  const [uk, setUk] = useState('');
  // які слова вже є в словнику в усіх обраних учнів
  const have = useMemo(() => {
    if (!studentIds.length) return new Set<string>();
    const sets = studentIds.map((sid) => new Set(data.words.filter((w) => w.studentId === sid).map((w) => key(w.en))));
    return new Set([...sets[0]].filter((k) => sets.every((s) => s.has(k))));
  }, [data.words, studentIds]);

  const on = words.filter((w) => w.on).length;
  const set = (i: number, patch: Partial<PickWord>) => setWords(words.map((w, k) => (k === i ? { ...w, ...patch } : w)));
  const addCustom = () => {
    if (!en.trim()) return;
    const i = words.findIndex((w) => key(w.en) === key(en));
    if (i >= 0) set(i, { on: true, uk: uk.trim() || words[i].uk });
    else setWords([...words, { en: en.trim(), uk: uk.trim(), on: true }]);
    setEn(''); setUk('');
  };

  return (
    <div className="wp">
      <div className="wp__bar">
        <b>{t({ uk: `Обрано ${on} з ${words.length}`, ru: `Выбрано ${on} из ${words.length}`, en: `${on} of ${words.length} chosen` })}</b>
        <button type="button" className="t-link-btn" onClick={() => setWords(words.map((w) => ({ ...w, on: !have.has(key(w.en)) })))}>{t({ uk: 'Обрати всі', ru: 'Выбрать все', en: 'Select all' })}</button>
        <button type="button" className="t-link-btn" onClick={() => setWords(words.map((w) => ({ ...w, on: false })))}>{t({ uk: 'Зняти всі', ru: 'Снять все', en: 'Clear all' })}</button>
      </div>
      <ul className="wp__list">
        {words.map((w, i) => {
          const exists = have.has(key(w.en));
          return (
            <li key={i} className={`wp__item ${w.on ? 'is-on' : ''} ${exists ? 'is-have' : ''}`}>
              <label className="wp__check">
                <input type="checkbox" checked={w.on} onChange={(e) => set(i, { on: e.target.checked })} aria-label={t({ uk: `Обрати ${w.en}`, ru: `Выбрать ${w.en}`, en: `Choose ${w.en}` })} />
                <b>{w.en}</b>
              </label>
              <input className="wp__uk" autoFocus={!w.uk && w.on} value={w.uk} placeholder={t({ uk: 'переклад', ru: 'перевод', en: 'translation' })} onChange={(e) => set(i, { uk: e.target.value, on: true })} aria-label={t({ uk: `Переклад ${w.en}`, ru: `Перевод ${w.en}`, en: `Translation of ${w.en}` })} />
              {exists && <small className="t-muted">{t({ uk: 'вже в словнику', ru: 'уже в словаре', en: 'already in dictionary' })}</small>}
            </li>
          );
        })}
      </ul>
      <div className="wp__add">
        <input value={en} onChange={(e) => setEn(e.target.value)} placeholder={t({ uk: 'Своє слово англійською', ru: 'Своё слово по-английски', en: 'Your own word in English' })} onKeyDown={(e) => e.key === 'Enter' && addCustom()} />
        <input value={uk} onChange={(e) => setUk(e.target.value)} placeholder={t({ uk: 'переклад', ru: 'перевод', en: 'translation' })} onKeyDown={(e) => e.key === 'Enter' && addCustom()} />
        <button type="button" className="mu-btn t-btn-sm" onClick={addCustom} disabled={!en.trim()}>{t({ uk: 'Додати слово', ru: 'Добавить слово', en: 'Add word' })}</button>
      </div>
    </div>
  );
}
