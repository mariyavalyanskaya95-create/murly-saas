import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SiteSearch from '@/components/SiteSearch';
import Icon from '@/components/Icon';
import { searchIndex } from '@/lib/search-index';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Пошук матеріалів з англійської | Murly', ru: 'Поиск материалов по английскому | Murly', en: 'Search English materials | Murly' }),
    description: t({ uk: 'Знайди урок, аудіювання, правило чи гру за темою: прийменники, Present Simple, їжа, тварини.', ru: 'Найди урок, аудирование, правило или игру по теме: предлоги, Present Simple, еда, животные.', en: 'Find a lesson, listening, rule or game by topic: prepositions, Present Simple, food, animals.' }),
    alternates: { canonical: '/search' },
  };
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-seo" />{t({ uk: 'Пошук', ru: 'Поиск', en: 'Search' })}</span>
          <h1>{t({ uk: 'Знайди потрібну', ru: 'Найди нужную', en: 'Find the right' })} <em>{t({ uk: 'тему.', ru: 'тему.', en: 'topic.' })}</em></h1>
          <p>{t({ uk: 'Уроки, аудіювання, тексти, правила, тренажери й ігри. Пиши українською, російською чи англійською.', ru: 'Уроки, аудирование, тексты, правила, тренажёры и игры. Пиши на украинском, русском или английском.', en: 'Lessons, listening, texts, rules, trainers and games. Type in Ukrainian, Russian or English.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <SiteSearch items={searchIndex()} initial={searchParams.q ?? ''} />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
