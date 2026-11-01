'use client';
// Поради за віком: вкладки 0-1, 1-2, 2-3, 3-5, 5-7
import { useState } from 'react';
import { useT } from '../LangProvider';
import type { Stage } from '@/lib/baby/types';

export default function Stages({ stages }: { stages: Stage[] }) {
  const t = useT();
  const [i, setI] = useState(0);
  const s = stages[i];
  return (
    <div className="bb-stages">
      <div className="bb-tabs" role="tablist">
        {stages.map((x, k) => (
          <button key={k} type="button" role="tab" aria-selected={k === i} className={`bb-tab ${k === i ? 'is-on' : ''}`} onClick={() => setI(k)}>{t(x.age)}</button>
        ))}
      </div>
      <p className="bb-goal">{t(s.goal)}</p>
      <div className="bb-tips">
        {s.tips.map((tip, k) => (
          <article key={k} className="bb-tip">
            <span className="bb-tip__n">{k + 1}</span>
            <h3>{t(tip.title)}</h3>
            <p>{t(tip.text)}</p>
            {tip.example && <p className="bb-say" lang="en">{tip.example}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
