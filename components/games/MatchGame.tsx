'use client';
import { useEffect, useState } from 'react';
import { GameItem, pick, shuffle } from './engine';
import GameDone from './GameDone';

type Card = { id: number; text: string };

export default function MatchGame({ items, pairs = 6 }: { items: GameItem[]; pairs?: number }) {
  const [set, setSet] = useState<GameItem[]>([]);
  const [left, setLeft] = useState<Card[]>([]);
  const [right, setRight] = useState<Card[]>([]);
  const [selL, setSelL] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const start = () => {
    // однакові відповіді в одній грі заплутують, тож беремо унікальні
    const unique = Array.from(new Map(shuffle(items).map((it) => [it.a, it])).values());
    const s = pick(unique, Math.min(pairs, unique.length));
    setSet(s);
    setLeft(s.map((it, id) => ({ id, text: it.q })));
    setRight(shuffle(s.map((it, id) => ({ id, text: it.a }))));
    setSelL(null); setDone([]); setWrong(null); setMistakes(0);
  };
  useEffect(start, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!set.length) return null;
  if (done.length === set.length) {
    return <GameDone score={Math.max(set.length - mistakes, 0)} total={set.length} onRestart={start} label="без помилок" />;
  }

  const clickRight = (id: number) => {
    if (selL === null || done.includes(id)) return;
    if (id === selL) { setDone([...done, id]); setSelL(null); }
    else { setWrong(id); setMistakes((m) => m + 1); setTimeout(() => setWrong(null), 450); }
  };

  return (
    <div className="g-match">
      <div className="g-meta">
        <span>Пар: {done.length} / {set.length}</span>
        <span>Помилок: {mistakes}</span>
      </div>
      <div className="g-match__cols">
        <div className="g-match__col">
          {left.map((c) => (
            <button key={c.id} disabled={done.includes(c.id)}
              className={`g-tile ${selL === c.id ? 'is-sel' : ''} ${done.includes(c.id) ? 'is-done' : ''}`}
              onClick={() => setSelL(c.id)}>{c.text}</button>
          ))}
        </div>
        <div className="g-match__col">
          {right.map((c) => (
            <button key={c.id} disabled={done.includes(c.id)}
              className={`g-tile g-tile--b ${done.includes(c.id) ? 'is-done' : ''} ${wrong === c.id ? 'is-wrong' : ''}`}
              onClick={() => clickRight(c.id)}>{c.text}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
