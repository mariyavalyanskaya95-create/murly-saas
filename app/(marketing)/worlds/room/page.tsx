import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import RoomGame from '@/components/worlds/RoomGame';
import { tr } from '@/lib/i18n-server';

export const metadata: Metadata = {
  title: 'Моя кімната: гра англійською для дітей | Murly',
  description: 'Облаштуй свою кімнату англійською: меблі, кольори, тварини, завдання з прийменниками. Гра для дітей 6-11 років, озвучка кожного слова.',
  alternates: { canonical: '/worlds/room' },
};

export default function RoomPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-section rw-page">
        <div className="mu-container">
          <Link href="/games" className="t-back">← {tr()({ uk: 'Усі ігри', ru: 'Все игры', en: 'All games' })}</Link>
          <h1 className="rw-title"><Icon id="d-kid" />My room</h1>
          <RoomGame />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
