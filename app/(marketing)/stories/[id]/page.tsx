import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import StoryReader from '@/components/reading/StoryReader';
import { ALL_STORIES, GENRES, findStory } from '@/lib/stories';
import { tr } from '@/lib/i18n-server';

export function generateStaticParams() { return ALL_STORIES.map((s) => ({ id: s.id })); }

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = findStory(params.id);
  if (!s) return {};
  const t = tr();
  return { title: `${s.title} · ${s.level} | Murly`, description: t(s.teaser), alternates: { canonical: `/stories/${s.id}` } };
}

export default function StoryPage({ params }: { params: { id: string } }) {
  const s = findStory(params.id);
  if (!s) notFound();
  const t = tr();
  const same = ALL_STORIES.filter((x) => x.genre === s.genre);
  const next = same[(same.indexOf(s) + 1) % same.length];
  const genre = GENRES.find((x) => x.id === s.genre)!;
  return (
    <>
      <SiteNav />
      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container sr-wrap">
          <p className="t-muted"><Link href="/stories">{t({ uk: 'Історії', ru: 'Истории', en: 'Stories' })}</Link> / <Link href={`/stories?g=${s.genre}`}>{t(genre.label)}</Link> / {s.level}</p>
          <div className="sr__head">
            <Kit id={s.kit} className="sr__kit" />
            <div>
              <span className="le-card__tags"><span className="gr-level">{s.level}</span><span className="le-tag">{t(genre.label)}</span><span className="le-tag">{s.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span></span>
              <h1>{s.title}</h1>
              <p className="t-muted">{t(s.teaser)}</p>
            </div>
          </div>
          <StoryReader s={s} />
          {next && next.id !== s.id && <p style={{ marginTop: 24 }}><Link href={`/stories/${next.id}`} className="mu-btn mu-btn--tomato">{t({ uk: 'Наступна історія', ru: 'Следующая история', en: 'Next story' })}: {next.title}</Link></p>}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
