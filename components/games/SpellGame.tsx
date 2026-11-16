'use client';
// «Напиши слово»: бачиш переклад, слухаєш вимову і пишеш англійське слово сам.
import { useEffect, useRef, useState } from 'react';
import { GameItem, mainAnswer, pick } from './engine';
import GameDone from './GameDone';
import Icon from '../Icon';
import { useT } from '../LangProvider';
import { speakEn } from '@/lib/speak';
import { isRight } from '@/lib/exercise';

const latin = (w: string) => /^[a-z\s'’\-.,!?]+$/i.test(w) && /[a-z]/i.test(w);

export default function SpellGame({ items, rounds = 8 }: { items: GameItem[]; rounds?: number }) {
  const t = useT();
  const [list, setList] = useState<GameItem[]>([]);
  const [i, setI] = useState(0);
  const [val, setVal] = useState('');
  const [res, setRes] = useState<'right' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const inp = useRef<HTMLInputElement>(null);
  const start = () => { const ok = items.filter((it) => latin(mainAnswer(it.a))); setList(pick(ok, Math.min(rounds, ok.length))); setI(0); setScore(0); setVal(''); setRes(null); };
  useEffect(start, [items]); // eslint-disable-line react-hooks/exhaustive-deps
  const word = list[i] ? mainAnswer(list[i].a) : '';
  useEffect(() => { if (word) { speakEn(word, 0.9); inp.current?.focus(); } }, [word]);

  if (!list.length) return <p className="g-hint">{t({ uk: 'Для цієї гри потрібні англійські слова зі словника.', ru: 'Для этой игры нужны английские слова из словаря.', en: 'This game needs English words.' })}</p>;
  if (i >= list.length) return <GameDone score={score} total={list.length} onRestart={start} />;
  const check = () => { if (res || !val.trim()) return; const ok = isRight(val, list[i].a.split(' / ')); setRes(ok ? 'right' : 'wrong'); if (ok) setScore((s) => s + 1); };
  const next = () => { setI(i + 1); setVal(''); setRes(null); };

  return (
    <div className="g-spell">
      <div className="g-meta"><span>{i + 1} / {list.length}</span><span>{t({ uk: 'Бали', ru: 'Баллы', en: 'Points' })}: {score}</span></div>
      <div className="g-question">{list[i].q}</div>
      <button type="button" className="mu-btn g-listen" onClick={() => speakEn(word, 0.8)}><Icon id="e-speak" />{t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}</button>
      <form onSubmit={(e) => { e.preventDefault(); if (res) next(); else check(); }} className="g-spell__form">
        <input ref={inp} className={`g-spell__in ${res ? `is-${res}` : ''}`} value={val} onChange={(e) => setVal(e.target.value)} readOnly={!!res} autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder={t({ uk: 'Напиши англійською', ru: 'Напиши по-английски', en: 'Type in English' })} aria-label={t({ uk: 'Твоя відповідь', ru: 'Твой ответ', en: 'Your answer' })} />
        {!res ? <button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Перевірити', ru: 'Проверить', en: 'Check' })}</button>
          : <button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })}</button>}
      </form>
      {res === 'wrong' && <div className="g-hint">{t({ uk: 'Правильно', ru: 'Правильно', en: 'Correct answer' })}: <b>{word}</b></div>}
      {res === 'right' && <div className="g-hint">{t({ uk: 'Так і є!', ru: 'Верно!', en: 'Right!' })}</div>}
    </div>
  );
}
