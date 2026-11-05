import type { Metadata } from 'next';
import { alt } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import LevelTest from '@/components/level/LevelTest';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Тест на рівень англійської онлайн безкоштовно: A1–C1 і для дітей', ru: 'Тест на уровень английского онлайн бесплатно: A1–C1 и для детей', en: 'Free online English level test: A1 to C1 and for kids' }),
    description: t({
      uk: 'Дізнайся свій рівень англійської за 10 хвилин. Адаптивний тест для підлітків і дорослих і гра з картинками й голосом для дітей.',
      ru: 'Узнай свой уровень английского за 10 минут. Адаптивный тест для подростков и взрослых и игра с картинками и голосом для детей.',
      en: 'Find your English level in 10 minutes. An adaptive test for teens and adults and a picture-and-voice game for kids.',
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
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container"><LevelTest /></div>
      </section>
      <SiteFooter />
    </>
  );
}
