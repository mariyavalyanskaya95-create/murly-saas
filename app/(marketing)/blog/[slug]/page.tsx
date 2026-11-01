// Стаття блогу з розміткою Article і хлібними крихтами
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Art from '@/components/Art';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Md from '@/components/blog/Md';
import { tr } from '@/lib/i18n-server';
import { SITE_URL } from '@/lib/seo';
import { BLOG, getPost, type Block, type Lang2 } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  const l: Lang2 = tr().lang === 'ru' ? 'ru' : 'uk';
  const path = `/blog/${p.slug}`;
  return {
    title: `${p.title[l]} | Murly`,
    description: p.description[l],
    keywords: p.keywords[l],
    alternates: { canonical: l === 'ru' ? `${path}?lang=ru` : path, languages: { 'uk-UA': path, 'ru-UA': `${path}?lang=ru`, 'x-default': path } },
    openGraph: { type: 'article', title: p.title[l], description: p.description[l], publishedTime: p.date },
  };
}

function B({ b }: { b: Block }) {
  switch (b.t) {
    case 'p': return <p><Md text={b.text} /></p>;
    case 'h2': return <h2>{b.text}</h2>;
    case 'h3': return <h3>{b.text}</h3>;
    case 'ul': return <ul>{b.items.map((x, i) => <li key={i}><Md text={x} /></li>)}</ul>;
    case 'ol': return <ol>{b.items.map((x, i) => <li key={i}><Md text={x} /></li>)}</ol>;
    case 'tip': return <aside className="bl-tip">{b.title && <b>{b.title}</b>}<p><Md text={b.text} /></p></aside>;
    case 'example': return <p className="bl-ex"><span lang="en">{b.en}</span><small>{b.tr}</small></p>;
    case 'table': return (
      <div className="bl-table"><table><thead><tr>{b.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><Md text={c} /></td>)}</tr>)}</tbody></table></div>
    );
    case 'cta': return <div className="bl-cta"><p>{b.text}</p><Link href={b.href} className="mu-btn mu-btn--ink">{b.label}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link></div>;
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();
  const l: Lang2 = tr().lang === 'ru' ? 'ru' : 'uk';
  const url = `${SITE_URL}/blog/${p.slug}${l === 'ru' ? '?lang=ru' : ''}`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: p.title[l], description: p.description[l], datePublished: p.date, dateModified: p.date, inLanguage: l, mainEntityOfPage: url,
        author: { '@type': 'Organization', name: 'Murly', url: SITE_URL }, publisher: { '@type': 'Organization', name: 'Murly', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` } } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Murly', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: l === 'ru' ? 'Блог' : 'Блог', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: p.title[l], item: url },
      ] },
    ],
  };
  const more = BLOG.filter((x) => x.slug !== p.slug).slice(0, 3);
  const date = new Date(p.date).toLocaleDateString(l === 'ru' ? 'ru-RU' : 'uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <>
      <SiteNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article className="mu-container bl-post">
        <nav className="bl-crumbs" aria-label="breadcrumbs"><Link href="/">Murly</Link><span>/</span><Link href="/blog">{l === 'ru' ? 'Блог' : 'Блог'}</Link></nav>
        <header className="bl-post__head">
          <div className="bl-post__art">{p.art.slice(0, 3).map((a) => <Art key={a} id={a} />)}</div>
          <h1>{p.title[l]}</h1>
          <p className="bl-post__meta">{date} · {p.minutes} {l === 'ru' ? 'мин чтения' : 'хв читання'}</p>
        </header>
        <div className="bl-body">{p.body[l].map((b, i) => <B key={i} b={b} />)}</div>
      </article>
      {more.length > 0 && (
        <section className="mu-section">
          <div className="mu-container">
            <h2 className="mu-section__title">{l === 'ru' ? 'Читайте также' : 'Читайте також'}</h2>
            <div className="bl-list bl-list--small">
              {more.map((x) => (
                <Link key={x.slug} href={`/blog/${x.slug}`} className="bl-card">
                  <div className="bl-card__art">{x.art.slice(0, 2).map((a) => <Art key={a} id={a} />)}</div>
                  <div className="bl-card__body"><h3>{x.title[l]}</h3></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <SiteFooter />
    </>
  );
}
