import type { Metadata } from 'next';
import { alt } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import LevelTest from '@/components/level/LevelTest';
import { tr } from '@/lib/i18n-server';
import SeoNote from '@/components/SeoNote';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Тест на рівень англійської онлайн безкоштовно | Murly', ru: 'Тест на уровень английского онлайн бесплатно | Murly', en: 'Free online English level test, A1 to C1 | Murly' }),
    description: t({
      uk: 'Безкоштовний тест на рівень англійської онлайн, A1-C1, за 10 хвилин. Адаптивний тест для підлітків і дорослих і гра з картинками для дітей. Без реєстрації.',
      ru: 'Бесплатный тест на уровень английского онлайн, A1-C1, за 10 минут. Адаптивный тест для подростков и взрослых и игра с картинками для детей. Без регистрации.',
      en: 'A free online English level test, A1-C1, in 10 minutes. An adaptive test for teens and adults and a picture game for kids. No sign-up.',
    }),
    alternates: alt('/level-test'),
  };
}

export default function LevelTestPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero">
        <div className="mu-container">
          <h1>{t({ uk: 'Тест на рівень', ru: 'Тест на уровень', en: 'Level test' })} <em>{t({ uk: 'англійської.', ru: 'английского.', en: 'in English.' })}</em></h1>
          <SeoNote free={{ uk: 'Безкоштовно, без реєстрації', ru: 'Бесплатно, без регистрации', en: 'Free, no sign-up' }} sell={{ text: { uk: 'Після тесту:', ru: 'После теста:', en: 'After the test:' }, links: [{ href: '/grammar', label: { uk: 'граматика за рівнями', ru: 'грамматика по уровням', en: 'grammar by level' } }, { href: '/shop/grammar-a1b1', label: { uk: 'граматика A1-B1 для друку', ru: 'грамматика A1-B1 для печати', en: 'printable A1-B1 grammar' } }] }} />
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container"><LevelTest /></div>
      </section>
      <SiteFooter />
    </>
  );
}
