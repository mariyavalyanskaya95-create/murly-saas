import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Stickers from '@/components/Stickers';
import VerbsAlphabet from '@/components/VerbsAlphabet';

export const metadata: Metadata = {
  title: 'Таблиця неправильних дієслів англійської з вимовою та перекладом',
  description: 'Повна таблиця неправильних дієслів англійської мови за алфавітом: три форми, переклад українською, пошук і озвучка кожного слова.',
  alternates: { canonical: '/irregular-verbs/table' },
};

export default function IrregularVerbsTablePage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 24 }} data-stickers="4">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-book" />Таблиця</span>
          <h1>Неправильні дієслова <em>за алфавітом.</em></h1>
          <p>Натисни на будь-яку форму, щоб послухати вимову. Навушники праворуч озвучать усі три форми підряд.</p>
          <Link href="/irregular-verbs#play" className="mu-btn mu-btn--lime mu-btn--lg">
            Тренуватися в іграх<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
          </Link>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <VerbsAlphabet />
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
