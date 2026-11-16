import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SectionTabs from '@/components/SectionTabs';
import HeroTip from '@/components/HeroTip';
import BookScene from '@/components/book/BookScene';
import { BOOKS, BOOK_UNITS, RED_NEXT } from '@/lib/grammar-book';
import { tr } from '@/lib/i18n-server';
import { alt } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Граматика англійської з картинками: книга для початківців A1-A2 | Murly', ru: 'Грамматика английского с картинками: книга для начинающих A1-A2 | Murly', en: 'English grammar with pictures: a beginner book A1-A2 | Murly' }),
    description: t({ uk: 'Граматика простими словами і смішними асоціаціями: сторінка правила і сторінка вправ з автоперевіркою. am/is/are, Present Continuous, Present Simple. Перші юніти безкоштовно, можна роздрукувати.', ru: 'Грамматика простыми словами и смешными ассоциациями: страница правила и страница упражнений с автопроверкой. am/is/are, Present Continuous, Present Simple. Первые юниты бесплатно, можно распечатать.', en: 'Grammar in simple words with funny pictures: a rule page and a practice page with auto-check. First units free, printable.' }),
    alternates: alt('/grammar-book'),
  };
}

export default function GrammarBookPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <SectionTabs group="grammar" active="/grammar-book" />
      <section className="mu-page-hero">
        <div className="mu-container">
          <h1>{t({ uk: 'Книга граматики', ru: 'Книга грамматики', en: 'The grammar book' })} <em>{t({ uk: 'з кульками.', ru: 'с шариками.', en: 'with funny balls.' })}</em></h1>
          <HeroTip>{t({ uk: 'Кожен юніт це розворот: ліворуч правило простими словами і смішна картинка-асоціація, праворуч вправи з автоперевіркою. Можна роздрукувати в PDF. Перші 5 юнітів безкоштовно.', ru: 'Каждый юнит это разворот: слева правило простыми словами и смешная картинка-ассоциация, справа упражнения с автопроверкой. Можно распечатать в PDF. Первые 5 юнитов бесплатно.', en: 'Each unit is a spread: the rule with a funny picture on the left, practice with auto-check on the right. Printable. The first 5 units are free.' })}</HeroTip>
        </div>
      </section>
      {(['beginner', 'intermediate'] as const).map((id) => {
        const b = BOOKS[id]; const units = BOOK_UNITS[id];
        return (
          <section key={id} className="mu-section" style={{ paddingTop: 12 }}>
            <div className="mu-container">
              <div className={`gb-cover gb-cover--${id}`}>
                <div><span className="gr-level">{b.level}</span><h2>{t(b.title)}</h2><p>{t(b.lead)}</p></div>
              </div>
              {b.ready ? (
                <div className="gb-units">
                  {units.map((u) => (
                    <Link key={u.slug} href={`/grammar-book/${id}/${u.slug}`} className="gb-unit">
                      <BookScene scene={u.scene} />
                      <span className="gb-unit__n">Unit {u.n}{u.free && <em>{t({ uk: 'безкоштовно', ru: 'бесплатно', en: 'free' })}</em>}</span>
                      <b>{u.title}</b>
                      <small>{t(u.topic)}</small>
                    </Link>
                  ))}
                  {RED_NEXT.map((u) => (
                    <div key={u.n} className="gb-unit is-soon" aria-disabled="true">
                      <span className="gb-unit__n">Unit {u.n}<em>{t({ uk: 'скоро', ru: 'скоро', en: 'soon' })}</em></span>
                      <b>{u.title}</b>
                    </div>
                  ))}
                </div>
              ) : <p className="t-muted">{t({ uk: 'Скоро. Спершу доробляємо червону книгу.', ru: 'Скоро. Сначала доделываем красную книгу.', en: 'Coming soon, after the red book.' })}</p>}
            </div>
          </section>
        );
      })}
      <SiteFooter />
    </>
  );
}
