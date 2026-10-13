import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { GRAMMAR } from '@/lib/grammar';

export const metadata: Metadata = {
  title: 'Граматика англійської простими словами: правила, приклади, вправи',
  description: 'Часи, артиклі, ступені порівняння, умовні речення і пасив. Коротко, з прикладами і перекладом, а після кожної теми квіз.',
  alternates: { canonical: '/grammar' },
};

const LEVELS = ['A1', 'A2', 'B1', 'B2'] as const;

export default function GrammarIndexPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-book" />Граматика</span>
          <h1>Граматика <em>без нудьги.</em></h1>
          <p>Кожна тема на одній сторінці: формула, коли вживати, приклади з перекладом, типові помилки і квіз наприкінці.</p>
          <Link href="/irregular-verbs" className="mu-btn mu-btn--lg">Неправильні дієслова</Link>
        </div>
      </section>

      {LEVELS.filter((l) => GRAMMAR.some((g) => g.level === l)).map((level) => (
        <section key={level} className="mu-section" style={{ paddingTop: 0 }}>
          <div className="mu-container">
            <h2 className="gr-h"><span className="gr-level">{level}</span>{level === 'A1' ? 'Старт' : level === 'A2' ? 'Базовий' : level === 'B1' ? 'Середній' : 'Вище середнього'}</h2>
            <div className="gr-grid">
              {GRAMMAR.filter((g) => g.level === level).map((g) => (
                <Link key={g.slug} href={`/grammar/${g.slug}`} className={`gr-card gr--${g.color}`}>
                  <span className="gr-card__ic"><Icon id={g.icon} /></span>
                  <span className="gr-card__title">{g.title}</span>
                  <span className="gr-card__uk">{g.uk}</span>
                  <span className="gr-card__lead">{g.lead}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <SiteFooter />
      <Stickers />
    </>
  );
}
