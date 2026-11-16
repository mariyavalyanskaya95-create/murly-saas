import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SectionTabs from '@/components/SectionTabs';
import BookUnitView from '@/components/book/BookUnitView';
import { BOOK_UNITS, getUnit, type BookId } from '@/lib/grammar-book';
import { tr } from '@/lib/i18n-server';
import { alt } from '@/lib/seo';

export function generateStaticParams() {
  return (Object.keys(BOOK_UNITS) as BookId[]).flatMap((book) => BOOK_UNITS[book].map((u) => ({ book, unit: u.slug })));
}

export function generateMetadata({ params }: { params: { book: string; unit: string } }): Metadata {
  const u = getUnit(params.book, params.unit); if (!u) return {};
  const t = tr();
  return {
    title: `${u.title}: ${t(u.topic)} | ${t({ uk: 'Граматика простими словами', ru: 'Грамматика простыми словами', en: 'Grammar made simple' })} | Murly`,
    description: `${t(u.story).slice(0, 150)}…`,
    alternates: alt(`/grammar-book/${params.book}/${u.slug}`),
  };
}

export default function BookUnitPage({ params }: { params: { book: string; unit: string } }) {
  const units = BOOK_UNITS[params.book as BookId]; const u = getUnit(params.book, params.unit);
  if (!units || !u) notFound();
  const i = units.indexOf(u!);
  const prev = units[i - 1]; const next = units[i + 1];
  return (
    <>
      <SiteNav />
      <div className="no-print"><SectionTabs group="grammar" active="/grammar-book" /></div>
      <section className="mu-section bk-wrap" style={{ paddingTop: 16 }}>
        <div className="mu-container">
          <BookUnitView unit={u!} book={params.book} prev={prev && { slug: prev.slug, n: prev.n }} next={next && { slug: next.slug, n: next.n }} />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
