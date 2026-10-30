import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Art from '@/components/Art';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ActivityList from '@/components/activities/ActivityList';
import { ACTIVITIES } from '@/lib/activities';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Speaking-активності англійською: картки, слайди, PDF | Murly', ru: 'Speaking-активности на английском: карточки, слайды, PDF | Murly', en: 'ESL speaking activities: cards, slides, PDF | Murly' }),
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
          <span className="mu-section__eyebrow"><Icon id="e-speak" />{t({ uk: 'Speaking-активності', ru: 'Speaking-активности', en: 'Speaking activities' })}</span>
          <h1>{t({ uk: 'Говоримо англійською', ru: 'Говорим по-английски', en: 'Get everyone' })} <em>{t({ uk: 'з картками.', ru: 'с карточками.', en: 'talking.' })}</em></h1>
          <p>{t({ uk: 'Готові активності на 20-40 хвилин: картки з малюнками, корисні фрази і питання для обговорення. Показуй слайди на уроці або завантаж PDF для друку.', ru: 'Готовые активности на 20-40 минут: карточки с рисунками, полезные фразы и вопросы для обсуждения. Показывай слайды на уроке или скачай PDF для печати.', en: 'Ready-made 20-40 minute activities: illustrated cards, useful phrases and discussion questions. Present the slides in class or download a PDF to print.' })}</p>
          <div className="act-hero__art" aria-hidden="true"><Art id="a-speech" className="sl-float sl-float--0" /><Art id="a-dice" className="sl-float sl-float--1" /><Art id="a-bulb" className="sl-float sl-float--2" /></div>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container"><ActivityList items={ACTIVITIES} /></div>
      </section>
      <SiteFooter />
    </>
  );
}
