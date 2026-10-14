'use client';
import { useContext, useEffect, useRef } from 'react';
import Icon from '../Icon';
import { GameFinishContext } from './finish';

export default function GameDone({ score, total, onRestart, label = 'правильних' }: { score: number; total: number; onRestart: () => void; label?: string }) {
  const onFinish = useContext(GameFinishContext);
  const sent = useRef(false);
  useEffect(() => {
    if (onFinish && !sent.current) { sent.current = true; onFinish(score, total); }
  }, [onFinish, score, total]);

  const ratio = total ? score / total : 0;
  const title = ratio === 1 ? 'Ідеально!' : ratio >= 0.7 ? 'Круто!' : ratio >= 0.4 ? 'Непогано!' : 'Ще раз?';
  return (
    <div className="g-done">
      <Icon id={ratio >= 0.7 ? 'e-trophy' : 'c-cat-sit'} className="mu-ic g-done__ic" />
      <div className="g-done__title">{title}</div>
      <div className="g-done__score">{score} / {total} {label}</div>
      <button className="mu-btn mu-btn--lime" onClick={onRestart}>Грати ще</button>
    </div>
  );
}
