import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getSeries } from '@/lib/series';
import { tr } from '@/lib/i18n-server';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getSeries(params.slug);
  return s ? { title: `${s.title}: аудіосеріал англійською ${s.level} | Murly`, alternates: { canonical: `/series/${s.slug}` } } : {};
}

export default function SeriesPage({ params }: { params: { slug: string } }) {
  const s = getSeries(params.slug);
  if (!s) notFound();
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }}>
        <div className="mu-container">
          <Link href="/series" className="t-back">← {t({ uk: 'Аудіосеріали', ru: 'Аудиосериалы', en: 'Audio series' })}</Link>
          <h1>{s.title}</h1>
          <p>{t(s.about)}</p>
          <p className="t-muted">{s.level} · {t(s.age)}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <h2 className="gm-h">{t({ uk: 'Персонажі', ru: 'Персонажи', en: 'Characters' })}</h2>
          <div className="se-cast">{s.cast.map((c) => <div key={c.who} className="se-c"><b>{c.who}</b><span>{t(c.about)}</span></div>)}</div>
          <h2 className="gm-h" style={{ marginTop: 28 }}>{t({ uk: 'Серії', ru: 'Серии', en: 'Episodes' })}</h2>
          <ol className="se-eps">
            {s.episodes.map((e) => (
              <li key={e.n}><Link href={`/series/${s.slug}/${e.n}`} className="se-ep">
                <span className="se-n">{e.n}</span>
                <span><b>{e.title}</b><small>{t(e.teaser)}</small></span>
                <Icon id="e-head" />
              </Link></li>
            ))}
          </ol>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
