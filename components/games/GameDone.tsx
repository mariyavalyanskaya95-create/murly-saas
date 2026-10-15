'use client';
import { useContext, useEffect, useRef } from 'react';
import Icon from '../Icon';
import { GameFinishContext } from './finish';
import { useT } from '../LangProvider';
import type { T } from '@/lib/i18n';

export default function GameDone({ score, total, onRestart, label = { uk: 'правильних', ru: 'правильных', en: 'correct' } }: { score: number; total: number; onRestart: () => void; label?: T }) {
  const t = useT();
  const onFinish = useContext(GameFinishContext);
  const sent = useRef(false);
  useEffect(() => {
    if (onFinish && !sent.current) { sent.current = true; onFinish(score, total); }
  }, [onFinish, score, total]);

  const ratio = total ? score / total : 0;
  const title = t(ratio === 1 ? { uk: 'Ідеально!', ru: 'Идеально!', en: 'Perfect!' }
    : ratio >= 0.7 ? { uk: 'Круто!', ru: 'Круто!', en: 'Awesome!' }
    : ratio >= 0.4 ? { uk: 'Непогано!', ru: 'Неплохо!', en: 'Not bad!' }
    : { uk: 'Ще раз?', ru: 'Ещё раз?', en: 'One more time?' });
  return (
    <div className="g-done">
      <Icon id={ratio >= 0.7 ? 'e-trophy' : 'c-cat-sit'} className="mu-ic g-done__ic" />
      <div className="g-done__title">{title}</div>
      <div className="g-done__score">{score} / {total} {t(label)}</div>
      <button className="mu-btn mu-btn--lime" onClick={onRestart}>{t({ uk: 'Грати ще', ru: 'Играть ещё', en: 'Play again' })}</button>
    </div>
  );
}
