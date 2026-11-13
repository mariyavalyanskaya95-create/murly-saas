import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { alt } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import BookReader from '@/components/reading/BookReader';
import { tr } from '@/lib/i18n-server';
import { BOOKS, bookById } from '@/lib/books';

export function generateStaticParams() { return BOOKS.map((b) => ({ id: b.id })); }

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const b = bookById(params.id); const t = tr();
  if (!b) return {};
  return {
    title: t({ uk: `${b.title} (${b.titleT.uk})${b.base ? ' B1-B2' : ''}: казка англійською з перекладом | Murly`, ru: `${b.title} (${b.titleT.ru})${b.base ? ' B1-B2' : ''}: сказка на английском с переводом | Murly`, en: `${b.title}${b.base ? ' (B1-B2)' : ''}: English fairy tale with translation | Murly` }),
    description: `${t(b.about)} ${t({ uk: `Рівень ${b.level}. Натисни на слово, щоб побачити переклад і послухати.`, ru: `Уровень ${b.level}. Нажми на слово, чтобы увидеть перевод и послушать.`, en: `Level ${b.level}. Tap a word for its translation and audio.` })}`,
    alternates: alt(`/books/${b.id}`),
  };
}

export default function BookPage({ params }: { params: { id: string } }) {
  const b = bookById(params.id);
  if (!b) notFound();
  const t = tr();
  const i = BOOKS.indexOf(b); const next = BOOKS[(i + 1) % BOOKS.length];
  const ld = { '@context': 'https://schema.org', '@type': 'LearningResource', name: b.title, inLanguage: 'en', educationalLevel: b.level, learningResourceType: 'Reading', isAccessibleForFree: true, isFamilyFriendly: true, url: `https://murly.com.ua/books/${b.id}`, provider: { '@type': 'Organization', name: 'Murly', url: 'https://murly.com.ua' } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteNav />
      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container bk-wrap">
          <Link href="/books" className="t-back">← {t({ uk: 'Усі казки', ru: 'Все сказки', en: 'All tales' })}</Link>
          <h1 className="bk-title">{b.title} <small>{t(b.titleT)} · {b.level}</small></h1>
          {b.harder && <p className="bk-alt"><Link href={`/books/${b.harder}`}>{t({ uk: 'Є складніша версія цієї казки для B1-B2', ru: 'Есть более сложная версия этой сказки для B1-B2', en: 'There is a harder B1-B2 version of this tale' })} →</Link></p>}
          {b.base && <p className="bk-alt"><Link href={`/books/${b.base}`}>← {t({ uk: 'Простіша версія для A1-A2', ru: 'Более простая версия для A1-A2', en: 'Easier A1-A2 version' })}</Link></p>}
          <BookReader b={b} />
          <p className="bk-next"><Link href={`/books/${next.id}`} className="mu-btn">{t({ uk: 'Наступна казка', ru: 'Следующая сказка', en: 'Next tale' })}: {next.title}</Link></p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
