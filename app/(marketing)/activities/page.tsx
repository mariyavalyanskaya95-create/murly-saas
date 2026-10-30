import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ActivityList from '@/components/activities/ActivityList';
import { ACTIVITIES } from '@/lib/activities';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Activities для уроків англійської: картки, слайди, PDF | Murly', ru: 'Activities для уроков английского: карточки, слайды, PDF | Murly', en: 'ESL speaking activities: cards, slides, PDF | Murly' }),
    description: t({ uk: 'Готові розмовні активності для дітей, підлітків і дорослих A1-B2: картки з ілюстраціями, корисні фрази, питання. Показуй на уроці або друкуй PDF.', ru: 'Готовые разговорные активности для детей, подростков и взрослых A1-B2: карточки с иллюстрациями, полезные фразы, вопросы. Показывай на уроке или печатай PDF.', en: 'Ready-made speaking activities for kids, teens and adults A1-B2: illustrated cards, useful phrases, questions. Present in class or print as PDF.' }),
    alternates: { canonical: '/activities' },
  };
}

export default function ActivitiesHub() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero act-hero">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-speak" />{t({ uk: 'Розмовні активності', ru: 'Разговорные активности', en: 'Speaking activities' })}</span>
          <h1>{t({ uk: 'Activities', ru: 'Activities', en: 'Activities' })} <em>{t({ uk: 'для уроків англійської.', ru: 'для уроков английского.', en: 'for English lessons.' })}</em></h1>
          <p>{t({ uk: 'Готові активності на 20-40 хвилин: картки з малюнками, корисні фрази і питання для обговорення. Показуй слайди на уроці або завантаж PDF для друку.', ru: 'Готовые активности на 20-40 минут: карточки с рисунками, полезные фразы и вопросы для обсуждения. Показывай слайды на уроке или скачай PDF для печати.', en: 'Ready-made 20-40 minute activities: illustrated cards, useful phrases and discussion questions. Present the slides in class or download a PDF to print.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container"><ActivityList items={ACTIVITIES} /></div>
      </section>
      <SiteFooter />
    </>
  );
}
