'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useT } from '@/components/LangProvider';

// Гаманець учня: скільки монеток і де їх витратити
export default function CoinsCard() {
  const t = useT();
  const [bal, setBal] = useState<number | null>(null);
  useEffect(() => {
    const load = () => fetch('/api/coins').then((r) => r.json()).then((d) => setBal(d.balance ?? 0)).catch(() => {});
    load();
    window.addEventListener('murly:coins', load);
    return () => window.removeEventListener('murly:coins', load);
  }, []);
  return (
    <section className="t-card s-coins">
      <span className="rw-coin s-coins__big" />
      <div>
        <small>{t({ uk: 'Мої монетки', ru: 'Мои монетки', en: 'My coins' })}</small>
        <b>{bal ?? '…'}</b>
        <p className="t-muted">{t({ uk: 'Заробляй за уроки, домашку і слова. Витрачай у грі Murly Town на нові будинки, меблі й прикраси.', ru: 'Зарабатывай за уроки, домашку и слова. Трать в игре Murly Town на новые дома, мебель и украшения.', en: 'Earn coins for lessons, homework and words. Spend them in Murly Town on new houses, furniture and decorations.' })}</p>
      </div>
      <Link href="/play/town" className="mu-btn mu-btn--lime">{t({ uk: 'Грати в Murly Town', ru: 'Играть в Murly Town', en: 'Play Murly Town' })}</Link>
    </section>
  );
}
