'use client';
// «Слово на слух»: слухаєш англійське слово й обираєш правильний переклад.
import { useEffect, useState } from 'react';
import { GameItem, mainAnswer, pick, shuffle } from './engine';
import GameDone from './GameDone';
import Icon from '../Icon';
import { useT } from '../LangProvider';
import { speakEn } from '@/lib/speak';

type Round = { item: GameItem; options: string[] };
const latin = (w: string) => /^[a-z\s'’\-.,!?]+$/i.test(w) && /[a-z]/i.test(w);

export default function ListenGame({ items, rounds = 8 }: { items: GameItem[]; rounds?: number }) {
  const t = useT();
  const [list, setList] = useState<Round[]>([]);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const start = () => {
    const ok = items.filter((it) => latin(mainAnswer(it.a)));
    setList(pick(ok, Math.min(rounds, ok.length)).map((item) => ({ item, options: shuffle([item.q, ...pick(Array.from(new Set(ok.map((x) => x.q))).filter((q) => q !== item.q), 3)]) })));
    setI(0); setChosen(null); setScore(0);
  };
  useEffect(start, [items]); // eslint-disable-line react-hooks/exhaustive-deps
  const word = list[i] ? mainAnswer(list[i].item.a) : '';
  useEffect(() => { if (word) speakEn(word, 0.9); }, [word]);

  if (!list.length) return <p className="g-hint">{t({ uk: 'Для цієї гри потрібні англійські слова зі словника.', ru: 'Для этой игры нужны английские слова из словаря.', en: 'This game needs English words.' })}</p>;
  if (i >= list.length) return <GameDone score={score} total={list.length} onRestart={start} />;
  const { item, options } = list[i];
  const answer = (o: string) => { if (chosen) return; setChosen(o); if (o === item.q) setScore((s) => s + 1); };

  return (
    <div className="g-quiz">
      <div className="g-meta"><span>{i + 1} / {list.length}</span><span>{t({ uk: 'Бали', ru: 'Баллы', en: 'Points' })}: {score}</span></div>
      <button type="button" className="g-listen-big" onClick={() => speakEn(word, 0.8)} aria-label={t({ uk: 'Послухати ще раз', ru: 'Послушать ещё раз', en: 'Listen again' })}><Icon id="e-speak" /></button>
      {chosen && <div className="g-question">{word}</div>}
      <div className="g-options">
        {options.map((o) => (
          <button key={o} type="button" className={`g-option ${chosen ? (o === item.q ? 'is-right' : o === chosen ? 'is-wrong' : 'is-dim') : ''}`} onClick={() => answer(o)}>{o}</button>
        ))}
      </div>
      {chosen && <button className="mu-btn mu-btn--lime g-next" onClick={() => { setI(i + 1); setChosen(null); }}>{t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })}</button>}
    </div>
  );
}
