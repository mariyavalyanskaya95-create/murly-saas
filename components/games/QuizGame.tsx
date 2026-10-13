'use client';
import { useEffect, useState } from 'react';
import { GameItem, distractors, pick, shuffle } from './engine';
import GameDone from './GameDone';

type Round = { item: GameItem; options: string[] };

export default function QuizGame({ items, rounds = 10, ordered = false }: { items: GameItem[]; rounds?: number; ordered?: boolean }) {
  const [list, setList] = useState<Round[]>([]);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const start = () => {
    setList((ordered ? items.slice(0, rounds) : pick(items, Math.min(rounds, items.length))).map((item) => ({ item, options: shuffle(item.options ?? [item.a, ...distractors(items, item)]) })));
    setI(0); setChosen(null); setScore(0); setStreak(0);
  };
  useEffect(start, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!list.length) return null;
  if (i >= list.length) return <GameDone score={score} total={list.length} onRestart={start} />;

  const { item, options } = list[i];
  const answer = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    if (opt === item.a) { setScore((s) => s + 1); setStreak((s) => s + 1); } else setStreak(0);
  };

  return (
    <div className="g-quiz">
      <div className="g-meta">
        <span>{i + 1} / {list.length}</span>
        <span>Бали: {score}{streak > 2 ? ` · серія ${streak}` : ''}</span>
      </div>
      <div className="g-question">{item.q}</div>
      {item.hint && <div className="g-hint">{item.hint}</div>}
      <div className="g-options">
        {options.map((opt) => {
          const state = !chosen ? '' : opt === item.a ? 'is-right' : opt === chosen ? 'is-wrong' : 'is-dim';
          return (
            <button key={opt} className={`g-option ${state}`} onClick={() => answer(opt)}>{opt}</button>
          );
        })}
      </div>
      {chosen && (
        <button className="mu-btn mu-btn--lime g-next" onClick={() => { setI(i + 1); setChosen(null); }}>
          Далі
        </button>
      )}
    </div>
  );
}
