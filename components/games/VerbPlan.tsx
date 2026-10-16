'use client';
// Бонус до PDF «Неправильні дієслова за 30 днів»: обираєш день плану і граєш саме з його дієсловами.
import { useEffect, useState } from 'react';
import GameHub from './GameHub';
import type { GameSet } from './engine';
import { useT } from '@/components/LangProvider';
import type { PlanDay } from '@/lib/verb-plan';

const KEY = 'murly-verbs30-done';

export default function VerbPlan({ days }: { days: PlanDay[] }) {
  const t = useT();
  const [day, setDay] = useState(1);
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { /* немає сховища */ }
    const m = location.hash.match(/day-(\d+)/);
    if (m) setDay(Math.min(30, Math.max(1, Number(m[1]))));
  }, []);
  const pick = (d: number) => { setDay(d); history.replaceState(null, '', `#day-${d}`); };
  const toggle = () => {
    const next = done.includes(day) ? done.filter((x) => x !== day) : [...done, day];
    setDone(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* немає сховища */ }
  };
  const cur = days[day - 1];
  const sets: GameSet[] = [
    { id: 'past', title: 'Past Simple', prompt: t({ uk: 'Яка форма Past Simple?', ru: 'Какая форма Past Simple?', en: 'What is the Past Simple form?' }), items: cur.verbs.map((v) => ({ q: v.base, a: v.past, hint: v.uk })) },
    { id: 'pp', title: 'Past Participle', prompt: t({ uk: 'Яка третя форма?', ru: 'Какая третья форма?', en: 'What is the third form?' }), items: cur.verbs.map((v) => ({ q: v.base, a: v.pp, hint: v.uk })) },
    { id: 'uk', title: t({ uk: 'Переклад', ru: 'Перевод', en: 'Translation' }), prompt: t({ uk: 'Як це англійською?', ru: 'Как это по-английски?', en: 'How do you say it in English?' }), items: cur.verbs.map((v) => ({ q: v.uk, a: v.base })) },
  ];
  return (
    <div className="vp">
      <p className="vp__progress">{t({ uk: 'Пройдено днів', ru: 'Пройдено дней', en: 'Days done' })}: <b>{done.length} / 30</b></p>
      <div className="vp__days" role="tablist" aria-label={t({ uk: 'День плану', ru: 'День плана', en: 'Plan day' })}>
        {days.map((d) => (
          <button key={d.day} role="tab" aria-selected={d.day === day} onClick={() => pick(d.day)}
            className={`vp__day ${d.review ? 'is-review' : ''} ${d.day === day ? 'is-on' : ''} ${done.includes(d.day) ? 'is-done' : ''}`}>
            {d.day}
          </button>
        ))}
      </div>
      <div className="vp__head">
        <div>
          <h2>{t({ uk: 'День', ru: 'День', en: 'Day' })} {day}{cur.review ? t({ uk: ': повторення', ru: ': повторение', en: ': review' }) : ''}</h2>
          <p>{cur.verbs.map((v) => `${v.base} (${v.past}, ${v.pp})`).join(' · ')}</p>
        </div>
        <button className={`mu-btn ${done.includes(day) ? 'mu-btn--lime' : ''}`} onClick={toggle}>
          {done.includes(day) ? t({ uk: 'Готово!', ru: 'Готово!', en: 'Done!' }) : t({ uk: 'Позначити день', ru: 'Отметить день', en: 'Mark as done' })}
        </button>
      </div>
      <GameHub key={day} sets={sets} />
    </div>
  );
}
