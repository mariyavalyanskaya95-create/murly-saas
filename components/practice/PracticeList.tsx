'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AGES, LEVELS, type Age, type Plan } from '@/lib/lesson';
import { useT } from '@/components/LangProvider';

export default function PracticeList({ items }: { items: Plan[] }) {
  const t = useT();
  const [skill, setSkill] = useState<'' | 'Listening' | 'Reading'>('');
  const [age, setAge] = useState<Age | ''>('');
  const [level, setLevel] = useState('');
  const list = items.filter((p) => (!skill || (p.focus ?? []).includes(skill)) && (!age || p.age === age) && (!level || p.level === level));
  return (
    <>
      <div className="le-filters">
        <div className="g-chips">
          <button className={`g-chip ${!skill ? 'is-on' : ''}`} onClick={() => setSkill('')}>{t({ uk: 'Усе', ru: 'Всё', en: 'All' })}</button>
          <button className={`g-chip ${skill === 'Listening' ? 'is-on' : ''}`} onClick={() => setSkill('Listening')}>Listening</button>
          <button className={`g-chip ${skill === 'Reading' ? 'is-on' : ''}`} onClick={() => setSkill('Reading')}>Reading</button>
        </div>
        <div className="g-chips">
          <button className={`g-chip ${!age ? 'is-on' : ''}`} onClick={() => setAge('')}>{t({ uk: 'Будь-який вік', ru: 'Любой возраст', en: 'Any age' })}</button>
          {AGES.map((a) => <button key={a.id} className={`g-chip ${age === a.id ? 'is-on' : ''}`} onClick={() => setAge(a.id)}>{a.label}</button>)}
        </div>
        <div className="g-chips">
          <button className={`g-chip ${!level ? 'is-on' : ''}`} onClick={() => setLevel('')}>{t({ uk: 'Усі рівні', ru: 'Все уровни', en: 'All levels' })}</button>
          {LEVELS.map((l) => <button key={l} className={`g-chip ${level === l ? 'is-on' : ''}`} onClick={() => setLevel(l)}>{l}</button>)}
        </div>
      </div>
      <div className="gr-grid" style={{ marginTop: 20 }}>
        {list.map((p) => (
          <Link key={p.id} href={`/practice/${p.id.replace(/^lib-/, '')}`} className={`gr-card gr--${p.color} le-card`}>
            <span className="le-card__tags">
              <span className="gr-level">{p.level}</span>
              <span className="le-tag">{AGES.find((a) => a.id === p.age)?.label}</span>
              {(p.focus ?? []).map((f) => <span key={f} className="le-tag">{f}</span>)}
            </span>
            <span className="gr-card__title">{p.title}</span>
            {p.topic && <span className="gr-card__uk">{p.topic}</span>}
          </Link>
        ))}
      </div>
      {!list.length && <p className="t-empty" style={{ textAlign: 'center' }}>{t({ uk: 'Під ці фільтри поки нічого немає. Розділ поповнюється.', ru: 'Под эти фильтры пока ничего нет. Раздел пополняется.', en: 'Nothing matches these filters yet. New items are added regularly.' })}</p>}
    </>
  );
}
