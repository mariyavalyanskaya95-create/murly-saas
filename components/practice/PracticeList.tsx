'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AGES, LEVELS, ageLabel, type Age, type Plan } from '@/lib/lesson';
import { useT } from '@/components/LangProvider';
import MockCards, { mockFits } from '@/components/mock/MockCards';
import LessonCard from '@/components/lesson/LessonCard';
import { toCard } from '@/lib/plan-card';
import GameLessonCards from '@/components/game-lessons/GameLessonCards';


// Каталог уроків або практики з фільтрами (base: куди веде картка, skills: фільтр навичок)
export default function PracticeList({ items, base = '/practice', skills = ['Listening', 'Reading'], mocks = false }: { items: Plan[]; base?: string; skills?: string[]; mocks?: boolean }) {
  const t = useT();
  const [skill, setSkill] = useState('');
  const [age, setAge] = useState<Age | ''>('');
  const [level, setLevel] = useState('');
  const showMocks = mocks && mockFits({ focus: skill, age, level });
  const list = items.filter((p) => (!skill || (p.focus ?? []).includes(skill)) && (!age || p.age === age) && (!level || p.level === level));
  return (
    <>
      <div className="le-filters">
        <div className="g-chips">
          <button className={`g-chip ${!skill ? 'is-on' : ''}`} onClick={() => setSkill('')}>{t({ uk: 'Усе', ru: 'Всё', en: 'All' })}</button>
          {skills.map((sk) => <button key={sk} className={`g-chip ${skill === sk ? 'is-on' : ''}`} onClick={() => setSkill(sk)}>{sk === 'НМТ' && t.lang === 'en' ? 'NMT' : sk}</button>)}
        </div>
        <div className="g-chips">
          <button className={`g-chip ${!age ? 'is-on' : ''}`} onClick={() => setAge('')}>{t({ uk: 'Будь-який вік', ru: 'Любой возраст', en: 'Any age' })}</button>
          {AGES.map((a) => <button key={a.id} className={`g-chip ${age === a.id ? 'is-on' : ''}`} onClick={() => setAge(a.id)}>{ageLabel(a.id, t.lang)}</button>)}
        </div>
        <div className="g-chips">
          <button className={`g-chip ${!level ? 'is-on' : ''}`} onClick={() => setLevel('')}>{t({ uk: 'Усі рівні', ru: 'Все уровни', en: 'All levels' })}</button>
          {LEVELS.map((l) => <button key={l} className={`g-chip ${level === l ? 'is-on' : ''}`} onClick={() => setLevel(l)}>{l}</button>)}
        </div>
      </div>
      <div className="lc-grid" style={{ marginTop: 20 }}>
        {mocks && <GameLessonCards />}
        {list.map((p) => <LessonCard key={p.id} p={toCard(p)} href={`${base}/${p.id.replace(/^lib-/, '')}`} />)}
        {showMocks && <MockCards />}
      </div>
      {!list.length && !showMocks && <p className="t-empty" style={{ textAlign: 'center' }}>{t({ uk: 'Під ці фільтри поки нічого немає. Розділ поповнюється.', ru: 'Под эти фильтры пока ничего нет. Раздел пополняется.', en: 'Nothing matches these filters yet. New items are added regularly.' })}</p>}
    </>
  );
}
