import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SectionTabs from '@/components/SectionTabs';
import BookUnitView from '@/components/book/BookUnitView';
import { BOOK_UNITS, getUnit, type BookId } from '@/lib/grammar-book';
import { getLang, tr } from '@/lib/i18n-server';
import SeoGuide from '@/components/SeoGuide';
import { guideFor } from '@/lib/seo-guides';
import { alt } from '@/lib/seo';

export function generateStaticParams() {
  return (Object.keys(BOOK_UNITS) as BookId[]).flatMap((book) => BOOK_UNITS[book].map((u) => ({ book, unit: u.slug })));
}

export function generateMetadata({ params }: { params: { book: string; unit: string } }): Metadata {
  const u = getUnit(params.book, params.unit); if (!u) return {};
  const t = tr();
  // сторінки з показами в Google: заголовок і опис під реальні запити
  const SEO: Record<string, { title: { uk: string; ru: string; en: string }; desc: { uk: string; ru: string; en: string } }> = {
    'am-is-are': {
      title: { uk: 'Am, is, are: правило, таблиця, 20 прикладів і вправи з відповідями | Murly', ru: 'Am, is, are: правило, таблица, 20 примеров и упражнения с ответами | Murly', en: 'Am, is, are: rule, table, examples and exercises | Murly' },
      desc: { uk: 'Коли вживати am, is, are: просте правило з таблицею, заперечення і питання, 20 речень з перекладом, типові помилки та вправи з відповідями. Безкоштовно.', ru: 'Когда употреблять am, is, are: простое правило с таблицей, отрицание и вопросы, 20 предложений с переводом, типичные ошибки и упражнения с ответами. Бесплатно.', en: 'When to use am, is, are: a simple rule with a table, negatives and questions, 20 examples, common mistakes and exercises with answers.' },
    },
  };
  const o = SEO[u.slug];
  if (o) return { title: t(o.title), description: t(o.desc), alternates: alt(`/grammar-book/${params.book}/${u.slug}`) };
  return {
    title: `${u.title}: ${t(u.topic)} | ${t({ uk: 'Граматика простими словами', ru: 'Грамматика простыми словами', en: 'Grammar made simple' })} | Murly`,
    description: `${t(u.story).slice(0, 150)}…`,
    alternates: alt(`/grammar-book/${params.book}/${u.slug}`),
  };
}

export default function BookUnitPage({ params }: { params: { book: string; unit: string } }) {
  if (params.book === 'red') permanentRedirect(`/grammar-book/beginner/${params.unit}`);
  const units = BOOK_UNITS[params.book as BookId]; const u = getUnit(params.book, params.unit);
  if (!units || !u) notFound();
  const i = units.indexOf(u!);
  const prev = units[i - 1]; const next = units[i + 1];
  return (
    <>
      <SiteNav />
      <div className="no-print"><SectionTabs group="grammar" active="/grammar-book" /></div>
      <section className="mu-section gb-wrap" style={{ paddingTop: 16 }}>
        <div className="mu-container">
          <BookUnitView unit={u!} book={params.book} prev={prev && { slug: prev.slug, n: prev.n }} next={next && { slug: next.slug, n: next.n }} />
          {(() => { const l = getLang(); const g = guideFor(`book:${u!.slug}`, l); return g ? <SeoGuide g={g} lang={l} /> : null; })()}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
