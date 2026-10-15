import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PracticeList from '@/components/practice/PracticeList';
import { PRACTICE } from '@/lib/practice';

export const metadata: Metadata = {
  title: 'Listening і Reading англійською онлайн: вправи з озвучкою | Murly',
  description: 'Аудіювання і читання англійською для дітей, підлітків і дорослих: діалоги з озвучкою, тексти, вправи з автоперевіркою, формат НМТ.',
  alternates: { canonical: '/practice' },
};

export default function PracticePage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="4">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-head" />Практика</span>
          <h1>Listening і <em>Reading.</em></h1>
          <p>Діалоги з озвучкою і тексти за рівнями. Слухай, читай, відповідай, і Murly одразу перевірить.</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container"><PracticeList items={PRACTICE} /></div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
