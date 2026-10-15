import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TownGame from '@/components/worlds/TownGame';

export const metadata: Metadata = {
  title: 'Murly Town: 3D-гра англійською | Murly',
  description: 'Будуй місто, заходь у будинки й облаштовуй кімнати. Понад 200 предметів, герой, завдання, і все англійською.',
  alternates: { canonical: '/worlds/town' },
};

export default function TownPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-section rw-page">
        <div className="mu-container">
          <Link href="/worlds" className="t-back">← Усі світи</Link>
          <h1 className="rw-title" lang="en">Murly Town <small className="hm-badge">3D</small></h1>
          <TownGame />
          <p className="hm-credits t-muted">3D-моделі: Kenney Furniture Kit, KayKit (Furniture, Restaurant, Holiday, City Builder, Adventurers), ліцензія CC0.</p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
