'use client';
import { useEffect, useState } from 'react';
import { GameItem, mainAnswer, pick, shuffle } from './engine';
import GameDone from './GameDone';
import { useT } from '../LangProvider';

type Letter = { id: number; ch: string };

export default function AnagramGame({ items, rounds = 8 }: { items: GameItem[]; rounds?: number }) {
  const t = useT();
  const [list, setList] = useState<GameItem[]>([]);
  const [i, setI] = useState(0);
  const [pool, setPool] = useState<Letter[]>([]);
  const [built, setBuilt] = useState<Letter[]>([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<'right' | 'wrong' | null>(null);

  const word = list[i] ? mainAnswer(list[i].a).toLowerCase() : '';

  const load = (item: GameItem) => {
    const w = mainAnswer(item.a).toLowerCase();
    let letters = shuffle(w.split('').map((ch, id) => ({ id, ch })));
    if (w.length > 1 && letters.map((l) => l.ch).join('') === w) letters = [...letters.slice(1), letters[0]];
    setPool(letters); setBuilt([]); setResult(null);
  };
  const start = () => {
    const l = pick(items.filter((it) => mainAnswer(it.a).length > 2), Math.min(rounds, items.length));
    setList(l); setI(0); setScore(0);
    if (l[0]) load(l[0]);
  };
  useEffect(start, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!list.length) return null;
  if (i >= list.length) return <GameDone score={score} total={list.length} onRestart={start} />;

  const add = (l: Letter) => {
    if (result) return;
    const nb = [...built, l];
    setBuilt(nb); setPool(pool.filter((p) => p.id !== l.id));
    if (nb.length === word.length) {
      const ok = nb.map((x) => x.ch).join('') === word;
      setResult(ok ? 'right' : 'wrong');
      if (ok) setScore((s) => s + 1);
    }
  };
  const remove = (l: Letter) => {
    if (result) return;
    setBuilt(built.filter((b) => b.id !== l.id)); setPool([...pool, l]);
  };
  const next = () => { const n = i + 1; setI(n); if (list[n]) load(list[n]); };

  return (
    <div className="g-anagram">
      <div className="g-meta">
        <span>{i + 1} / {list.length}</span>
        <span>{t({ uk: 'Бали', ru: 'Баллы', en: 'Points' })}: {score}</span>
      </div>
      <div className="g-question">{list[i].q}</div>
      <div className={`g-slots ${result ? `is-${result}` : ''}`}>
        {word.split('').map((_, k) => (
          <button key={k} className="g-slot" onClick={() => built[k] && remove(built[k])}>{built[k]?.ch ?? ''}</button>
        ))}
      </div>
      <div className="g-letters">
        {pool.map((l) => <button key={l.id} className="g-letter" onClick={() => add(l)}>{l.ch}</button>)}
      </div>
      {result === 'wrong' && <div className="g-hint">{t({ uk: 'Правильно', ru: 'Правильно', en: 'Correct answer' })}: <b>{word}</b></div>}
      {result && <button className="mu-btn mu-btn--lime g-next" onClick={next}>{t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })}</button>}
      {!result && built.length > 0 && (
        <button className="mu-btn g-next" onClick={() => { setPool(shuffle([...pool, ...built])); setBuilt([]); }}>{t({ uk: 'Скинути', ru: 'Сбросить', en: 'Reset' })}</button>
      )}
    </div>
  );
}
