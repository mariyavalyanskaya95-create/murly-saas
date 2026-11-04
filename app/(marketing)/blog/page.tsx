// Блог: статті для вчителів, учнів і батьків (українською та російською)
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Art from '@/components/Art';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { tr } from '@/lib/i18n-server';
import { BLOG, type Lang2 } from '@/lib/blog';

export function generateMetadata(): Metadata {
  const t = tr();
  const ru = t.lang === 'ru';
  return {
    title: ru ? 'Блог Murly: английский для учителей, учеников и родителей' : 'Блог Murly: англійська для вчителів, учнів і батьків',
    description: ru ? 'Практичные статьи: подготовка к НМТ, игры для уроков, неправильные глаголы, цены на уроки и советы репетиторам.' : 'Практичні статті: підготовка до НМТ, ігри для уроків, неправильні дієслова, ціни на уроки й поради репетиторам.',
    alternates: { canonical: ru ? '/blog?lang=ru' : '/blog', languages: { 'uk-UA': '/blog', 'ru-UA': '/blog?lang=ru', 'x-default': '/blog' } },
  };
}

const AUD: Record<string, { uk: string; ru: string }> = {
  teachers: { uk: 'Вчителям', ru: 'Учителям' }, students: { uk: 'Учням', ru: 'Ученикам' }, parents: { uk: 'Батькам', ru: 'Родителям' }, nmt: { uk: 'НМТ', ru: 'НМТ' },
};

export default function BlogPage() {
  const t = tr();
  const l: Lang2 = t.lang === 'ru' ? 'ru' : 'uk';
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <h1>{l === 'ru' ? 'Статьи' : 'Статті'} <em>{l === 'ru' ? 'без воды.' : 'без води.'}</em></h1>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="bl-list">
            {BLOG.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="bl-card">
                <div className="bl-card__art">{p.art.slice(0, 3).map((a) => <Art key={a} id={a} />)}</div>
                <div className="bl-card__body">
                  <span className="bl-tag">{AUD[p.audience][l]} · {p.minutes} {l === 'ru' ? 'мин' : 'хв'}</span>
                  <h2>{p.title[l]}</h2>
                  <p>{p.description[l]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
