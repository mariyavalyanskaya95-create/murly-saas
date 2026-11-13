import type { Metadata } from 'next';
import Link from 'next/link';
import { alt } from '@/lib/seo';
import SectionTabs from '@/components/SectionTabs';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import { tr } from '@/lib/i18n-server';
import { BOOKS } from '@/lib/books';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Казки англійською для дітей: читати з перекладом і озвучкою | Murly', ru: 'Сказки на английском для детей: читать с переводом и озвучкой | Murly', en: 'Fairy tales in English for kids: read with translation and audio | Murly' }),
    description: t({ uk: 'Прості казки англійською для дітей A1-A2: Три поросятка, Червона Шапочка, Попелюшка. Натисни на слово, щоб побачити переклад і послухати. Питання після казки. Безкоштовно.', ru: 'Простые сказки на английском для детей A1-A2: Три поросёнка, Красная Шапочка, Золушка. Нажми на слово, чтобы увидеть перевод и послушать. Вопросы после сказки. Бесплатно.', en: 'Simple English fairy tales for kids (A1-A2): The Three Little Pigs, Little Red Riding Hood, Cinderella. Tap any word for a translation and audio. Free.' }),
    alternates: alt('/books'),
  };
}

export default function BooksPage() {
  const t = tr();
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: t({ uk: 'Казки англійською', ru: 'Сказки на английском', en: 'Fairy tales in English' }), itemListElement: BOOKS.map((b, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://murly.com.ua/books/${b.id}`, name: b.title })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteNav />
      <SectionTabs group="read" active="/books" />
      <section className="mu-page-hero" style={{ paddingBottom: 12 }}>
        <div className="mu-container">
          <Kit id="il-cat-read" className="kit-hero" />
          <h1>{t({ uk: 'Казки', ru: 'Сказки', en: 'Fairy tales' })} <em>{t({ uk: 'англійською.', ru: 'на английском.', en: 'in English.' })}</em></h1>
          <p className="bk-lead">{t({ uk: 'Натисни на будь-яке слово: побачиш переклад і почуєш вимову.', ru: 'Нажми на любое слово: увидишь перевод и услышишь произношение.', en: 'Tap any word to see the translation and hear it.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container bk-grid">
          {BOOKS.map((b) => (
            <Link key={b.id} href={`/books/${b.id}`} className="bk-card" style={{ ['--bk' as string]: b.color }}>
              <span className="bk-card__cover"><Kit id={b.kit} className="bk-card__kit" /></span>
              <span className="bk-card__body">
                <b>{b.title}</b>
                <small>{t(b.titleT)}</small>
                <span className="bk-card__tags"><span className="gr-level">{b.level}</span><span className="le-tag">{b.age} {t({ uk: 'років', ru: 'лет', en: 'years' })}</span></span>
                <span className="bk-card__about">{t(b.about)}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
