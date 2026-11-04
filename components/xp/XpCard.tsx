'use client';
// Картка рівня в кабінеті учня: звання, рівень, скільки до наступного.
import { useEffect, useState } from 'react';
import { levelInfo, RANKS } from '@/lib/xp';
import { useT } from '../LangProvider';

export default function XpCard() {
  const t = useT();
  const [xp, setXp] = useState<number | null>(null);
  useEffect(() => {
    fetch('/api/xp').then((r) => r.json()).then((d) => setXp(d.adult ? null : Number(d.xp) || 0)).catch(() => setXp(null));
    const on = (e: Event) => { const d = (e as CustomEvent<{ items: { amount: number }[] }>).detail; setXp((x) => (x ?? 0) + d.items.reduce((a, i) => a + i.amount, 0)); };
    window.addEventListener('murly:xp', on);
    return () => window.removeEventListener('murly:xp', on);
  }, []);
  if (xp === null) return null;
  const L = levelInfo(xp);
  const next = RANKS.find((r) => r.from > L.level);
  return (
    <section className="t-card xp-card">
      <div className="xp-card__badge" style={{ background: L.rank.color }}><small>LV</small><b>{L.level}</b></div>
      <div className="xp-card__body">
        <h2>{t(L.rank.name)} · {xp} XP</h2>
        <div className="xp-card__bar"><i style={{ width: `${L.pct}%` }} /></div>
        <p className="t-muted">{t({ uk: `До рівня ${L.level + 1}: ${L.need - L.into} XP`, ru: `До уровня ${L.level + 1}: ${L.need - L.into} XP`, en: `${L.need - L.into} XP to level ${L.level + 1}` })}{next ? t({ uk: ` · далі звання «${next.name.uk}» з рівня ${next.from}`, ru: ` · дальше звание «${next.name.ru}» с уровня ${next.from}`, en: ` · next rank: ${next.name.en} at level ${next.from}` }) : ''}</p>
        <p className="xp-card__how">{t({ uk: 'XP дають: правильні відповіді, здана домашка, слова на сьогодні, ігри та уроки.', ru: 'XP дают: правильные ответы, сданная домашка, слова на сегодня, игры и уроки.', en: 'Earn XP for correct answers, homework, daily words, games and lessons.' })}</p>
      </div>
    </section>
  );
}
