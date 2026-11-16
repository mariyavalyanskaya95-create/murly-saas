'use client';
// «Вгадай слово» (як шибениця, але по-доброму): котик тримає 6 кульок, за кожну неправильну літеру одна кулька лопається.
import { useCallback, useEffect, useState } from 'react';
import { GameItem, mainAnswer, pick } from './engine';
import GameDone from './GameDone';
import { useT } from '../LangProvider';

const ABC = 'abcdefghijklmnopqrstuvwxyz'.split('');
const LIVES = 6;
const BALLOONS = ['#FF8FB8', '#FFD23F', '#7FD3F2', '#B8E986', '#C7A6F5', '#FFB37A'];
const isLetter = (c: string) => /[a-z]/.test(c);

function Balloons({ left }: { left: number }) {
  return (
    <svg className="g-hang__pic" viewBox="0 0 220 200" aria-hidden="true">
      {BALLOONS.map((c, i) => {
        const x = 40 + i * 28, y = 34 + (i % 2) * 18; const alive = i < left;
        return (
          <g key={i} className={alive ? '' : 'is-pop'}>
            <path d={`M${x} ${y + 24} Q${x + (110 - x) * 0.4} ${y + 70} 110 ${150}`} stroke="#1B2140" strokeWidth={1.6} fill="none" opacity={alive ? 1 : 0} />
            {alive
              ? <><ellipse cx={x} cy={y} rx={17} ry={21} fill={c} stroke="#1B2140" strokeWidth={2.4} /><path d={`M${x - 7} ${y - 9} q4 -6 9 -5`} stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" /><path d={`M${x - 3} ${y + 21} l3 5 l3 -5z`} fill={c} stroke="#1B2140" strokeWidth={1.6} /></>
              : <path d={`M${x - 10} ${y} l6 -4 l4 6 l5 -7 l4 6`} stroke={c} strokeWidth={3} fill="none" strokeLinecap="round" />}
          </g>
        );
      })}
      {/* котик */}
      <g stroke="#1B2140" strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round">
        <path d="M86 160 l4 -22 l12 12 h16 l12 -12 l4 22" fill="#fff" />
        <ellipse cx="110" cy="170" rx="30" ry="24" fill="#fff" />
        <circle cx="100" cy="166" r="3" fill="#1B2140" stroke="none" /><circle cx="120" cy="166" r="3" fill="#1B2140" stroke="none" />
        {left > 2 ? <path d="M104 176 q6 6 12 0" fill="none" /> : left > 0 ? <path d="M104 178 h12" fill="none" /> : <path d="M104 180 q6 -6 12 0" fill="none" />}
        <path d="M110 150 v-2" />
      </g>
    </svg>
  );
}

export default function HangmanGame({ items, rounds = 8 }: { items: GameItem[]; rounds?: number }) {
  const t = useT();
  const [list, setList] = useState<GameItem[]>([]);
  const [i, setI] = useState(0);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const start = () => {
    const ok = items.filter((it) => { const w = mainAnswer(it.a).toLowerCase(); return w.replace(/[^a-z]/g, '').length >= 3 && /^[a-z\s'’\-.,!?]+$/.test(w); });
    setList(pick(ok, Math.min(rounds, ok.length))); setI(0); setScore(0); setGuessed([]);
  };
  useEffect(start, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const word = list[i] ? mainAnswer(list[i].a).toLowerCase() : '';
  const misses = guessed.filter((c) => !word.includes(c)).length;
  const won = !!word && word.split('').every((c) => !isLetter(c) || guessed.includes(c));
  const lost = misses >= LIVES;
  const done = won || lost;

  const guess = useCallback((c: string) => {
    if (done || guessed.includes(c)) return;
    const ng = [...guessed, c];
    setGuessed(ng);
    const w = word;
    if (w.split('').every((x) => !isLetter(x) || ng.includes(x))) setScore((s) => s + 1);
  }, [done, guessed, word]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => { const k = e.key.toLowerCase(); if (k.length === 1 && isLetter(k)) guess(k); };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [guess]);

  if (!list.length) return <p className="g-hint">{t({ uk: 'Для цієї гри потрібні англійські слова зі словника.', ru: 'Для этой игры нужны английские слова из словаря.', en: 'This game needs English words from the dictionary.' })}</p>;
  if (i >= list.length) return <GameDone score={score} total={list.length} onRestart={start} />;

  const next = () => { setI(i + 1); setGuessed([]); };

  return (
    <div className="g-hang">
      <div className="g-meta">
        <span>{i + 1} / {list.length}</span>
        <span>{t({ uk: 'Бали', ru: 'Баллы', en: 'Points' })}: {score}</span>
      </div>
      <Balloons left={LIVES - misses} />
      <div className="g-question">{list[i].q}</div>
      <div className={`g-hang__word ${won ? 'is-right' : lost ? 'is-wrong' : ''}`} aria-live="polite">
        {word.split('').map((c, k) => (
          isLetter(c)
            ? <span key={k} className="g-hang__ch">{guessed.includes(c) || lost ? c : ''}</span>
            : <span key={k} className={c === ' ' ? 'g-hang__sp' : 'g-hang__p'}>{c === ' ' ? '' : c}</span>
        ))}
      </div>
      {!done && (
        <div className="g-hang__keys">
          {ABC.map((c) => {
            const used = guessed.includes(c);
            return <button key={c} type="button" disabled={used} className={`g-hang__key ${used ? (word.includes(c) ? 'is-hit' : 'is-miss') : ''}`} onClick={() => guess(c)}>{c}</button>;
          })}
        </div>
      )}
      {won && <div className="g-hint">{t({ uk: 'Вгадав! Усі кульки цілі.', ru: 'Угадал! Шарики целы.', en: 'You got it!' })}</div>}
      {lost && <div className="g-hint">{t({ uk: 'Кульки полетіли. Слово', ru: 'Шарики улетели. Слово', en: 'The balloons are gone. The word is' })}: <b>{word}</b></div>}
      {done && <button className="mu-btn mu-btn--lime g-next" onClick={next}>{t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })}</button>}
    </div>
  );
}
