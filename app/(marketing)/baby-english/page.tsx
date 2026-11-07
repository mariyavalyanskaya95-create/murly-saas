// «Англійська з малюком»: для батьків, які ростять білінгва або знайомлять малюка з англійською з перших років
import RelatedPosts from '@/components/blog/RelatedPosts';
import Link from 'next/link';
import { alt } from '@/lib/seo';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import Stages from '@/components/baby/Stages';
import StoryReader from '@/components/baby/StoryReader';
import PrintGames from '@/components/baby/PrintGames';
import { tr } from '@/lib/i18n-server';
import { BOOKS, GAMES, PHRASES, RHYMES, STAGES, STORIES } from '@/lib/baby/content';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Англійська з малюком: поради, книжки, казки та ігри для друку | Murly', ru: 'Английский с малышом: советы, книжки, сказки и игры для печати | Murly', en: 'English with your little one: tips, books, stories and printable games | Murly' }),
    description: t({
      uk: 'Англійська для малюків 0-7 років: поради за віком, фрази на щодень, казки, віршики, книжки і безкоштовні ігри для друку.',
      ru: 'Английский для малышей 0-7 лет: советы по возрасту, фразы на каждый день, сказки, стишки, книжки и бесплатные игры для печати.',
      en: 'English for little ones aged 0-7: tips by age, everyday phrases, stories, rhymes, books and free printable games.',
    }),
    alternates: alt('/baby-english'),
  };
}

const NAV = [
  { id: 'tips', uk: 'Поради за віком', ru: 'Советы по возрасту', en: 'Tips by age' },
  { id: 'phrases', uk: 'Фрази на щодень', ru: 'Фразы на каждый день', en: 'Everyday phrases' },
  { id: 'stories', uk: 'Казки', ru: 'Сказки', en: 'Stories' },
  { id: 'rhymes', uk: 'Віршики', ru: 'Стишки', en: 'Rhymes' },
  { id: 'books', uk: 'Книжки', ru: 'Книжки', en: 'Books' },
  { id: 'games', uk: 'Ігри для друку', ru: 'Игры для печати', en: 'Printable games' },
];

export default function BabyEnglishPage() {
  const t = tr();
  const native = (p: { uk: string; ru: string }) => (t.lang === 'ru' ? p.ru : p.uk);
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero no-print" data-stickers="6">
        <div className="mu-container">
          <Kit id="st-cat-blep" className="kit-hero" />
          <h1>{t({ uk: 'Англійська', ru: 'Английский', en: 'English' })} <em>{t({ uk: 'з малюком.', ru: 'с малышом.', en: 'with your little one.' })}</em></h1>
          <nav className="bb-jump" aria-label={t({ uk: 'Розділи', ru: 'Разделы', en: 'Sections' })}>
            {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{t(n)}</a>)}
          </nav>
        </div>
      </section>

      <section className="mu-section no-print" id="tips">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Що робити', ru: 'Что делать', en: 'What to do' })} <em>{t({ uk: 'в кожному віці.', ru: 'в каждом возрасте.', en: 'at each age.' })}</em></h2>
          </div>
          <Stages stages={STAGES} />
        </div>
      </section>

      <section className="mu-section no-print" id="phrases">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-speak" />{t({ uk: 'Фрази', ru: 'Фразы', en: 'Phrases' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Говоріть англійською', ru: 'Говорите по-английски', en: 'Speak English' })} <em>{t({ uk: 'в звичайний день.', ru: 'в обычный день.', en: 'on an ordinary day.' })}</em></h2>
          </div>
          <div className="bb-phrases">
            {PHRASES.map((p, k) => (
              <div key={k} className="bb-phrase">
                <b lang="en">{p.en}</b>
                {t.lang !== 'en' && <span>{native(p)}</span>}
                <small>{t(p.when)}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section no-print" id="stories">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-book" />{t({ uk: 'Казки Murly', ru: 'Сказки Murly', en: 'Murly stories' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Коротко, просто,', ru: 'Коротко, просто,', en: 'Short, simple,' })} <em>{t({ uk: 'на ніч.', ru: 'на ночь.', en: 'for bedtime.' })}</em></h2>
          </div>
          <StoryReader stories={STORIES} />
        </div>
      </section>

      <section className="mu-section no-print" id="rhymes">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-mic" />{t({ uk: 'Віршики з рухами', ru: 'Стишки с движениями', en: 'Action rhymes' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Кажемо і', ru: 'Говорим и', en: 'Say it and' })} <em>{t({ uk: 'рухаємось.', ru: 'двигаемся.', en: 'move.' })}</em></h2>
          </div>
          <div className="bb-rhymes">
            {RHYMES.map((r) => (
              <article key={r.title} className="bb-rhyme">
                <h3 lang="en">{r.title}</h3>
                <p lang="en">{r.lines.map((l, k) => <span key={k}>{l}</span>)}</p>
                <small>{t(r.moves)}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section no-print" id="books">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Що почитати', ru: 'Что почитать', en: 'What to read' })} <em>{t({ uk: 'англійською.', ru: 'по-английски.', en: 'in English.' })}</em></h2>
            <p className="t-muted">{t({ uk: 'Шукайте в книгарнях і бібліотеках.', ru: 'Ищите в книжных и библиотеках.', en: 'Look for them in bookshops and libraries.' })}</p>
          </div>
          <div className="bb-books">
            {BOOKS.map((b) => (
              <article key={b.title} className="bb-book">
                <span className="bb-age">{b.age}</span>
                <h3 lang="en">{b.title}</h3>
                <small>{b.author}</small>
                <p>{t(b.why)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section" id="games">
        <div className="mu-container">
          <div className="mu-section__head no-print">
            <span className="mu-section__eyebrow"><Icon id="e-trophy" />{t({ uk: 'Безкоштовно', ru: 'Бесплатно', en: 'Free' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Ігри,', ru: 'Игры,', en: 'Games' })} <em>{t({ uk: 'які можна роздрукувати.', ru: 'которые можно распечатать.', en: 'you can print.' })}</em></h2>
          </div>
          <PrintGames games={GAMES} />
        </div>
      </section>

      <section className="mu-section no-print">
        <div className="mu-container bb-cta">
          <h2 className="mu-section__title">{t({ uk: 'З 6 років:', ru: 'С 6 лет:', en: 'From age 6:' })} <em>{t({ uk: 'кабінет учня.', ru: 'кабинет ученика.', en: 'a student account.' })}</em></h2>
          <p>{t({ uk: 'Домашка-гра, слова, граматика і 3D-містечко англійською.', ru: 'Домашка-игра, слова, грамматика и 3D-городок на английском.', en: 'Homework as a game, words, grammar and a 3D town in English.' })}</p>
          <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
            <Link href="/for-parents" className="mu-btn mu-btn--ink mu-btn--lg">{t({ uk: 'Для батьків школярів', ru: 'Для родителей школьников', en: 'For parents of school kids' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
          </div>
        </div>
      </section>

      <RelatedPosts slugs={['anglijska-dlya-ditej-vdoma']} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
