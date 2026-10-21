import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import StoryReader from '@/components/reading/StoryReader';
import { STORIES } from '@/lib/scary-stories';
import { tr } from '@/lib/i18n-server';

const find = (id: string) => STORIES.find((s) => s.id === id);

export function generateStaticParams() { return STORIES.map((s) => ({ id: s.id })); }

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = find(params.id);
  if (!s) return {};
  const t = tr();
  return { title: `${s.title} · ${s.level} | Murly`, description: t(s.teaser), alternates: { canonical: `/scary-stories/${s.id}` } };
}

export default function StoryPage({ params }: { params: { id: string } }) {
  const s = find(params.id);
  if (!s) notFound();
  const t = tr();
  const i = STORIES.indexOf(s);
  const next = STORIES[(i + 1) % STORIES.length];
  return (
    <>
      <SiteNav />
      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container sr-wrap">
          <p className="t-muted"><Link href="/scary-stories">{t({ uk: 'Страшні історії', ru: 'Страшные истории', en: 'Scary stories' })}</Link> / {s.level}</p>
          <div className="sr__head">
            <Kit id={s.kit} className="sr__kit" />
            <div>
              <span className="le-card__tags"><span className="gr-level">{s.level}</span><span className="le-tag">{s.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span></span>
              <h1>{s.title}</h1>
              <p className="t-muted">{t(s.teaser)}</p>
            </div>
          </div>
          <StoryReader s={s} />
          <p style={{ marginTop: 24 }}><Link href={`/scary-stories/${next.id}`} className="mu-btn mu-btn--tomato">{t({ uk: 'Наступна історія', ru: 'Следующая история', en: 'Next story' })}: {next.title}</Link></p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
