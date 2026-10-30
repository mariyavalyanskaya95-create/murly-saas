'use client';
// Каталог активностей з фільтрами: для кого, рівень, тип
import Link from 'next/link';
import { useMemo, useState } from 'react';
import Art from '../Art';
import { PHOTOS, photoUrl } from '@/lib/activities/photos';
import { useT } from '../LangProvider';
import type { Activity } from '@/lib/activities';

const WHO = [
  { id: 'all', label: { uk: 'Усі', ru: 'Все', en: 'All' } },
  { id: 'kids', label: { uk: 'Діти', ru: 'Дети', en: 'Kids' } },
  { id: 'teens', label: { uk: 'Підлітки', ru: 'Подростки', en: 'Teens' } },
  { id: 'adults', label: { uk: 'Дорослі', ru: 'Взрослые', en: 'Adults' } },
] as const;
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'] as const;

export default function ActivityList({ items }: { items: Activity[] }) {
  const t = useT();
  const [who, setWho] = useState<string>('all');
  const [lv, setLv] = useState<string>('');
  const [type, setType] = useState<string>('');
  const list = useMemo(() => items.filter((a) => (who === 'all' || a.audience === who) && (!lv || (a.levels as string[]).includes(lv)) && (!type || a.type === type)), [items, who, lv, type]);
  const levels = LEVELS.filter((l) => items.some((a) => (a.levels as string[]).includes(l)));

  return (
    <>
      <div className="act-filters">
        <div className="g-chips">{WHO.map((w) => <button key={w.id} type="button" className={`g-chip ${who === w.id ? 'is-on' : ''}`} aria-pressed={who === w.id} onClick={() => setWho(w.id)}>{t(w.label)}</button>)}</div>
        <div className="g-chips">
          {levels.map((l) => <button key={l} type="button" className={`g-chip ${lv === l ? 'is-on' : ''}`} aria-pressed={lv === l} onClick={() => setLv(lv === l ? '' : l)}>{l}</button>)}
          <button type="button" className={`g-chip ${type === 'speaking' ? 'is-on' : ''}`} aria-pressed={type === 'speaking'} onClick={() => setType(type === 'speaking' ? '' : 'speaking')}>Speaking</button>
          <button type="button" className={`g-chip ${type === 'grammar' ? 'is-on' : ''}`} aria-pressed={type === 'grammar'} onClick={() => setType(type === 'grammar' ? '' : 'grammar')}>Grammar</button>
        </div>
      </div>
      <div className="act-grid">
        {list.map((a) => {
          const cover = a.slides.find((s) => s.kind === 'cover');
          const art = cover && cover.kind === 'cover' ? cover.art.slice(0, 2) : [];
          return (
            <Link key={a.slug} href={`/activities/${a.slug}`} className={`act-card act--${a.color}`}>
              <span className={`act-card__art ${PHOTOS[a.slug] ? 'has-photo' : ''}`} style={PHOTOS[a.slug] ? { backgroundImage: `url(${photoUrl(PHOTOS[a.slug][0].id, 640)})` } : undefined}>{PHOTOS[a.slug] ? null : art.map((id) => <Art key={id} id={id} />)}</span>
              <span className="act-card__meta">
                {a.levels.map((l) => <span key={l} className="act-lv">{l}</span>)}
                <span className="act-type">{a.type === 'grammar' ? 'Grammar' : 'Speaking'}</span>
              </span>
              <b className="act-card__title">{a.title}</b>
              <span className="act-card__about">{t(a.about)}</span>
              <span className="act-card__foot">{t(a.focus)} · {a.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span>
            </Link>
          );
        })}
        {!list.length && <p className="t-muted">{t({ uk: 'Під ці фільтри поки нічого немає.', ru: 'Под эти фильтры пока ничего нет.', en: 'Nothing for these filters yet.' })}</p>}
      </div>
    </>
  );
}
