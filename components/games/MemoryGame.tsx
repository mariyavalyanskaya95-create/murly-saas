'use client';
// «Знайди пару на час»: картки-мемори, слово й переклад. Перевертай по дві, шукай пари якнайшвидше.
import { useEffect, useRef, useState } from 'react';
import { GameItem, mainAnswer, pick, shuffle } from './engine';
import GameDone from './GameDone';
import { useT } from '../LangProvider';

type Card = { id: number; pair: number; text: string; side: 'en' | 'tr' };

export default function MemoryGame({ items, pairs = 6 }: { items: GameItem[]; pairs?: number }) {
  const t = useT();
  const [cards, setCards] = useState<Card[]>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [found, setFound] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [sec, setSec] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = Math.min(pairs, items.length);

  const start = () => {
    const l = pick(items, n);
    setCards(shuffle(l.flatMap((it, k) => [{ id: k * 2, pair: k, text: mainAnswer(it.a), side: 'en' as const }, { id: k * 2 + 1, pair: k, text: it.q, side: 'tr' as const }])));
    setOpen([]); setFound([]); setMoves(0); setSec(0); setDone(false);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setSec((s) => s + 1), 1000);
  };
  useEffect(() => { start(); return () => { if (timer.current) clearInterval(timer.current); }; }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const flip = (c: Card) => {
    if (done || open.includes(c.id) || found.includes(c.pair) || open.length === 2) return;
    const o = [...open, c.id]; setOpen(o);
    if (o.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = o.map((id) => cards.find((x) => x.id === id)!);
      setTimeout(() => {
        if (a.pair === b.pair) { const f = [...found, a.pair]; setFound(f); if (f.length === n) { setDone(true); if (timer.current) clearInterval(timer.current); } }
        setOpen([]);
      }, a.pair === b.pair ? 350 : 900);
    }
  };

  if (!cards.length) return null;
  if (done) {
    // бали: усі пари, мінус зайві спроби (не менше половини)
    const score = Math.max(Math.ceil(n / 2), n - Math.max(0, moves - n - 2));
    return <div><p className="g-hint">{t({ uk: `Час: ${sec} с, спроб: ${moves}`, ru: `Время: ${sec} с, попыток: ${moves}`, en: `Time: ${sec} s, moves: ${moves}` })}</p><GameDone score={score} total={n} onRestart={start} /></div>;
  }
  return (
    <div className="g-memo">
      <div className="g-meta"><span>{t({ uk: 'Пари', ru: 'Пары', en: 'Pairs' })}: {found.length} / {n}</span><span>{t({ uk: 'Час', ru: 'Время', en: 'Time' })}: {sec} {t({ uk: 'с', ru: 'с', en: 's' })}</span></div>
      <div className="g-memo__grid">
        {cards.map((c) => {
          const up = open.includes(c.id) || found.includes(c.pair);
          return (
            <button key={c.id} type="button" className={`g-memo__card ${up ? 'is-up' : ''} ${found.includes(c.pair) ? 'is-done' : ''} ${c.side === 'en' ? 'is-en' : ''}`} onClick={() => flip(c)} aria-label={up ? c.text : t({ uk: 'Закрита картка', ru: 'Закрытая карточка', en: 'Hidden card' })}>
              <span>{up ? c.text : '?'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
