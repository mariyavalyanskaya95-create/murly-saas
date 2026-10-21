'use client';
// Каталог історій з вкладками за жанром і фільтром рівня.
import Link from 'next/link';
import { useState } from 'react';
import type { Genre } from '@/lib/stories';

export type StoryCard = { id: string; title: string; level: string; minutes: number; color: string; genre: Genre; teaser: { uk: string; ru: string; en: string } };
const GENRES: { id: Genre; label: { uk: string; ru: string; en: string } }[] = [
  { id: 'scary', label: { uk: 'Страшні', ru: 'Страшные', en: 'Scary' } },
  { id: 'romance', label: { uk: 'Романтичні', ru: 'Романтические', en: 'Romantic' } },
  { id: 'comedy', label: { uk: 'Комедії', ru: 'Комедии', en: 'Comedy' } },
];
import { useT } from '@/components/LangProvider';

export default function StoriesList({ items: ALL_STORIES, initial }: { items: StoryCard[]; initial?: Genre | '' }) {
  const t = useT();
  const [g, setG] = useState<Genre | ''>(initial ?? '');
  const [lv, setLv] = useState('');
  const list = ALL_STORIES.filter((s) => (!g || s.genre === g) && (!lv || s.level === lv));
  const pick = (x: Genre | '') => {
    setG(x);
    try { const u = new URL(window.location.href); if (x) u.searchParams.set('g', x); else u.searchParams.delete('g'); window.history.replaceState(null, '', u.toString()); } catch { /* */ }
  };
  return (
    <>
      <div className="t-tabs" role="tablist" style={{ marginBottom: 12 }}>
        <button role="tab" aria-selected={!g} className={`t-tab ${!g ? 'is-on' : ''}`} onClick={() => pick('')}>{t({ uk: 'Усі', ru: 'Все', en: 'All' })} ({ALL_STORIES.length})</button>
        {GENRES.map((x) => <button key={x.id} role="tab" aria-selected={g === x.id} className={`t-tab ${g === x.id ? 'is-on' : ''}`} onClick={() => pick(x.id)}>{t(x.label)} ({ALL_STORIES.filter((s) => s.genre === x.id).length})</button>)}
      </div>
      <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
        <button className={`g-chip ${!lv ? 'is-on' : ''}`} onClick={() => setLv('')}>{t({ uk: 'Усі рівні', ru: 'Все уровни', en: 'All levels' })}</button>
        {['A2', 'B1', 'B2'].map((l) => <button key={l} className={`g-chip ${lv === l ? 'is-on' : ''}`} onClick={() => setLv(l)}>{l}</button>)}
      </div>
      <div className="gr-grid" style={{ marginTop: 20 }}>
        {list.map((s) => (
          <Link key={s.id} href={`/stories/${s.id}`} className={`gr-card gr--${s.color} le-card`}>
            <span className="le-card__tags"><span className="gr-level">{s.level}</span><span className="le-tag">{t(GENRES.find((x) => x.id === s.genre)!.label)}</span><span className="le-tag">{s.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span></span>
            <span className="gr-card__title">{s.title}</span>
            <span className="gr-card__lead">{t(s.teaser)}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
