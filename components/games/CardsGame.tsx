'use client';
import { useEffect, useState } from 'react';
import { GameItem, shuffle } from './engine';
import GameDone from './GameDone';

// Картки: "Знаю" прибирає картку, "Ще ні" повертає її в кінець колоди
export default function CardsGame({ items, size = 15 }: { items: GameItem[]; size?: number }) {
  const [deck, setDeck] = useState<GameItem[]>([]);
  const [total, setTotal] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [firstTry, setFirstTry] = useState(0);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  const start = () => {
    const d = shuffle(items).slice(0, Math.min(size, items.length));
    setDeck(d); setTotal(d.length); setFlipped(false); setFirstTry(0); setSeen(new Set());
  };
  useEffect(start, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!total) return null;
  if (!deck.length) return <GameDone score={firstTry} total={total} onRestart={start} label="з першого разу" />;

  const card = deck[0];
  const know = () => {
    if (!seen.has(card.q)) setFirstTry((n) => n + 1);
    setDeck(deck.slice(1)); setFlipped(false);
  };
  const again = () => {
    setSeen(new Set(seen).add(card.q));
    setDeck([...deck.slice(1), card]); setFlipped(false);
  };

  return (
    <div className="g-cards">
      <div className="g-meta">
        <span>Залишилось: {deck.length}</span>
        <span>Вивчено: {total - deck.length} / {total}</span>
      </div>
      <button className={`g-card ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
        <span className="g-card__face g-card__front">{card.q}<small>натисни, щоб перевернути</small></span>
        <span className="g-card__face g-card__back">{card.a}{card.hint && <small>{card.hint}</small>}</span>
      </button>
      <div className="g-cards__btns">
        <button className="mu-btn" onClick={again}>Ще ні</button>
        <button className="mu-btn mu-btn--lime" onClick={know}>Знаю</button>
      </div>
    </div>
  );
}
