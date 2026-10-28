import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SeriesPlayer from '@/components/series/SeriesPlayer';
import { getSeries } from '@/lib/series';
import { tr } from '@/lib/i18n-server';
import type { VoicePreset } from '@/lib/voices';

export function generateMetadata({ params }: { params: { slug: string; ep: string } }): Metadata {
  const s = getSeries(params.slug);
  const e = s?.episodes.find((x) => String(x.n) === params.ep);
  return s && e ? { title: `${s.title}, ${e.n}: ${e.title} | Murly` } : {};
}

export default function EpisodePage({ params }: { params: { slug: string; ep: string } }) {
  const s = getSeries(params.slug);
  const e = s?.episodes.find((x) => String(x.n) === params.ep);
  if (!s || !e) notFound();
  const t = tr();
  const voices = Object.fromEntries(s.cast.map((c) => [c.who, c.voice])) as Record<string, VoicePreset>;
  return (
    <>
      <SiteNav />
      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container sp-wrap">
          <Link href={`/series/${s.slug}`} className="t-back">← {s.title}</Link>
          <p className="t-eyebrow">{t({ uk: 'Серія', ru: 'Серия', en: 'Episode' })} {e.n} / {s.episodes.length}</p>
          <h1 className="sp-title">{e.title}</h1>
          <p className="t-muted">{t(e.teaser)}</p>
          <SeriesPlayer slug={s.slug} ep={e} voices={voices} total={s.episodes.length} />
          <div className="t-head__actions" style={{ marginTop: 18 }}>
            {e.n > 1 && <Link className="mu-btn" href={`/series/${s.slug}/${e.n - 1}`}>← {t({ uk: 'Попередня', ru: 'Предыдущая', en: 'Previous' })}</Link>}
            {e.n < s.episodes.length && <Link className="mu-btn" href={`/series/${s.slug}/${e.n + 1}`}>{t({ uk: 'Наступна', ru: 'Следующая', en: 'Next' })} →</Link>}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
