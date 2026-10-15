'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Гаманець учня: скільки монеток і де їх витратити
export default function CoinsCard() {
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
        <small>Мої монетки</small>
        <b>{bal ?? '…'}</b>
        <p className="t-muted">Заробляй за уроки, домашку і слова. Витрачай у грі Murly Town на нові будинки, меблі й прикраси.</p>
      </div>
      <Link href="/play/town" className="mu-btn mu-btn--lime">Грати в Murly Town</Link>
    </section>
  );
}
