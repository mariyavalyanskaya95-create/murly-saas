'use client';
// Пошук по сайту: уроки, аудіювання, тексти, граматика, ігри, квест. Шукає трьома мовами одразу.
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import { useT } from './LangProvider';
import { SKILLS } from '@/lib/skills';
import type { SearchItem } from '@/lib/search-index';
import { rankSearch } from '@/lib/search-match';

export default function SiteSearch({ items, initial }: { items: SearchItem[]; initial: string }) {
  const t = useT();
  const [q, setQ] = useState(initial);
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState('');
  const box = useRef<HTMLInputElement>(null);
  useEffect(() => { box.current?.focus(); }, []);
  useEffect(() => { const u = new URL(window.location.href); if (q) u.searchParams.set('q', q); else u.searchParams.delete('q'); window.history.replaceState(null, '', u.toString()); }, [q]);

  const res = useMemo(() => rankSearch(items, q, { skill, level }), [q, skill, level, items]);

  const tips = [
    t({ uk: 'прийменники', ru: 'предлоги', en: 'prepositions' }),
    'Present Simple',
    t({ uk: 'їжа', ru: 'еда', en: 'food' }),
    t({ uk: 'аудіювання A2', ru: 'аудирование A2', en: 'listening A2' }),
    t({ uk: 'гра для дітей', ru: 'игра для детей', en: 'game for kids' }),
    t({ uk: 'неправильні дієслова', ru: 'неправильные глаголы', en: 'irregular verbs' }),
  ];

  return (
    <div className="ss">
      <label className="ss-box">
        <Icon id="d-seo" />
        <input ref={box} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ uk: 'Тема, правило, гра: «прийменники», «Past Simple», «магазин»…', ru: 'Тема, правило, игра: «предлоги», «Past Simple», «магазин»…', en: 'Topic, rule, game: “prepositions”, “Past Simple”, “shop”…' })} aria-label={t({ uk: 'Пошук по сайту', ru: 'Поиск по сайту', en: 'Search the site' })} />
      </label>
      <div className="ss-filters">
        <select value={skill} onChange={(e) => setSkill(e.target.value)} aria-label={t({ uk: 'Навичка', ru: 'Навык', en: 'Skill' })}>
          <option value="">{t({ uk: 'Усі навички', ru: 'Все навыки', en: 'All skills' })}</option>
          {SKILLS.map((s) => <option key={s.id} value={s.id}>{t(s.label)}</option>)}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)} aria-label={t({ uk: 'Рівень', ru: 'Уровень', en: 'Level' })}>
          <option value="">{t({ uk: 'Усі рівні', ru: 'Все уровни', en: 'All levels' })}</option>
          {['A1', 'A2', 'B1', 'B2', 'C1'].map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        {q && <span className="t-muted ss-count">{t({ uk: 'Знайдено', ru: 'Найдено', en: 'Found' })}: {res.length}</span>}
      </div>
      {!q && (
        <div className="ss-tips">
          <span className="t-muted">{t({ uk: 'Наприклад:', ru: 'Например:', en: 'For example:' })}</span>
          {tips.map((x) => <button key={x} type="button" className="g-chip" onClick={() => setQ(x)}>{x}</button>)}
        </div>
      )}
      {q && !res.length && <p className="ss-empty">{t({ uk: 'Нічого не знайшли. Спробуй інше слово або іншою мовою.', ru: 'Ничего не нашли. Попробуй другое слово или на другом языке.', en: 'Nothing found. Try another word or another language.' })}</p>}
      <ul className="ss-list">
        {res.slice(0, 60).map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="ss-it">
              <span className={`ss-ic gr--${it.color}`} aria-hidden="true"><Icon id={it.icon} /></span>
              <span className="ss-txt"><b>{t(it.title)}</b><small>{t(it.kind)}{it.level !== 'all' ? ` · ${it.level}` : ''}</small></span>
              <span className="ss-go" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
