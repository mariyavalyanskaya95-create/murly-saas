import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import HomeGame from '@/components/worlds/HomeGame';

export const metadata: Metadata = {
  title: 'My home: 3D-гра англійською | Murly',
  description: 'Облаштуй 3D-кімнату англійською: понад 120 предметів, кольори, картини на стінах, завдання з прийменниками, озвучка кожного слова.',
  alternates: { canonical: '/worlds/home' },
};

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <section className="mu-section rw-page">
        <div className="mu-container">
          <Link href="/worlds" className="t-back">← Усі світи</Link>
          <h1 className="rw-title"><Icon id="d-kid" />My home <small className="hm-badge">3D</small></h1>
          <HomeGame />
          <p className="hm-credits t-muted">3D-моделі: Kenney Furniture Kit і KayKit Furniture Bits (ліцензія CC0).</p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
