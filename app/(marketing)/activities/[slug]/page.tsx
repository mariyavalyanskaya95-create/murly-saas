import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Deck from '@/components/activities/Deck';
import { ACTIVITIES, getActivity } from '@/lib/activities';
import { tr } from '@/lib/i18n-server';

export function generateStaticParams() { return ACTIVITIES.map((a) => ({ slug: a.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getActivity(params.slug);
  if (!a) return {};
  const t = tr();
  return { title: `${a.title} (${a.levels.join('-')}) | Murly`, description: t(a.about), alternates: { canonical: `/activities/${a.slug}` } };
}

const WHO = { kids: { uk: 'Діти', ru: 'Дети', en: 'Kids' }, teens: { uk: 'Підлітки', ru: 'Подростки', en: 'Teens' }, adults: { uk: 'Дорослі', ru: 'Взрослые', en: 'Adults' } };

export default function ActivityPage({ params }: { params: { slug: string } }) {
  const a = getActivity(params.slug);
  if (!a) notFound();
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero act-hero act-hero--one no-print">
        <div className="mu-container">
          <Link href="/activities" className="t-back">← {t({ uk: 'Усі активності', ru: 'Все активности', en: 'All activities' })}</Link>
          <span className="mu-section__eyebrow"><Icon id="e-speak" />{t(WHO[a.audience])} · {a.levels.join(' · ')} · {a.type === 'grammar' ? 'Grammar' : 'Speaking'} · {a.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span>
          <h1>{a.title}</h1>
          <p>{t(a.about)}</p>
          <p className="act-focus"><b>{t({ uk: 'Що тренуємо', ru: 'Что тренируем', en: 'Focus' })}:</b> {t(a.focus)}</p>
        </div>
      </section>
      <section className="mu-section act-body" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <Deck a={a} />
          <div className="t-card act-tips no-print">
            <h2>{t({ uk: 'Як провести', ru: 'Как провести', en: 'How to run it' })}</h2>
            <ul>{a.tips.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
