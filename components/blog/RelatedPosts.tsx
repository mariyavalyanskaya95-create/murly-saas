// Блок «Корисно почитати» на основних сторінках: внутрішні посилання на статті блогу
import Link from 'next/link';
import Art from '../Art';
import Icon from '../Icon';
import { tr } from '@/lib/i18n-server';
import { getPost } from '@/lib/blog';

export default function RelatedPosts({ slugs }: { slugs: string[] }) {
  const t = tr();
  const l = t.lang === 'ru' ? 'ru' : 'uk';
  const posts = slugs.map(getPost).filter((p): p is NonNullable<ReturnType<typeof getPost>> => !!p);
  if (!posts.length) return null;
  return (
    <section className="mu-section">
      <div className="mu-container">
        <div className="mu-section__head">
          <span className="mu-section__eyebrow"><Icon id="e-book" />{t({ uk: 'Блог', ru: 'Блог', en: 'Blog' })}</span>
          <h2 className="mu-section__title">{t({ uk: 'Корисно', ru: 'Полезно', en: 'Worth' })} <em>{t({ uk: 'почитати.', ru: 'почитать.', en: 'reading.' })}</em></h2>
        </div>
        <div className="bl-list bl-list--small">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="bl-card">
              <div className="bl-card__art">{p.art.slice(0, 2).map((a) => <Art key={a} id={a} />)}</div>
              <div className="bl-card__body"><h3>{p.title[l]}</h3></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
