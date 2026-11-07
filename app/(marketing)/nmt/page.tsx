import RelatedPosts from '@/components/blog/RelatedPosts';
import Link from 'next/link';
import { alt } from '@/lib/seo';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { QUIZZES } from '@/lib/quizzes';
import PricingSection from '@/components/PricingSection';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

const POLAROIDS = [
  { label: 'Teen Life', icon: 'e-speak', bg: 'var(--mu-mustard)', ink: 'var(--mu-ink)', href: '/quiz/teen-life' },
  { label: 'Films & Netflix', icon: 'd-camera', bg: 'var(--mu-tomato)', ink: 'var(--mu-lime)', href: '/quiz/films-netflix' },
  { label: 'Grammar Boss', icon: 'e-abc', bg: 'var(--mu-sky)', ink: 'var(--mu-ink)', href: '/grammar/trainer' },
  { label: 'Mock Test', icon: 'd-kid', bg: 'var(--mu-lime)', ink: 'var(--mu-ink)', href: '/nmt/mock' },
  { label: 'Reading', icon: 'e-book', bg: 'var(--mu-ink)', ink: 'var(--mu-lime)', href: '/learn/reading' },
  { label: 'Writing', icon: 'e-pencil', bg: 'var(--mu-mustard)', ink: 'var(--mu-ink)', href: '/learn/writing' },
];

const FEATURES: { icon: string; mod: string; title: T; chips: T[] }[] = [
  { icon: 'd-spark', mod: '', title: { uk: 'Розбір кожної помилки', ru: 'Разбор каждой ошибки', en: 'Every mistake explained' }, chips: [{ uk: '«Чому так?»', ru: '«Почему так?»', en: '“Why?”' }, { uk: 'що повторити', ru: 'что повторить', en: 'what to review' }] },
  { icon: 'e-trophy', mod: '', title: { uk: 'Пробні НМТ', ru: 'Пробные НМТ', en: 'NMT mock tests' }, chips: [{ uk: '20 варіантів', ru: '20 вариантов', en: '20 tests' }, { uk: 'таймер і бал', ru: 'таймер и балл', en: 'timer and score' }] },
  { icon: 'e-board', mod: '', title: { uk: 'Завдання як на іспиті', ru: 'Задания как на экзамене', en: 'Exam-style tasks' }, chips: [{ uk: 'reading' }, { uk: 'use of English' }] },
  { icon: 'd-team', mod: 'mu-card--ink', title: { uk: 'Для репетиторів', ru: 'Для репетиторов', en: 'For tutors' }, chips: [{ uk: 'домашка в один клік', ru: 'домашка в один клик', en: 'one-click homework' }, { uk: 'прогрес учнів', ru: 'прогресс учеников', en: 'student progress' }] },
];
const STEPS: { n: string; icon: string; title: string; text: T; href?: string }[] = [
  { n: '01', icon: 'e-speak', title: 'Teen Life', text: { uk: 'Друзі, школа, соцмережі. Часи й базові конструкції.', ru: 'Друзья, школа, соцсети. Времена и базовые конструкции.', en: 'Friends, school, social media. Tenses and basic structures.' }, href: '/quiz/teen-life' },
  { n: '02', icon: 'd-camera', title: 'Films & Netflix', text: { uk: 'Reading на знайомі теми: кіно й серіали.', ru: 'Reading на знакомые темы: кино и сериалы.', en: 'Reading on familiar topics: films and series.' }, href: '/quiz/films-netflix' },
  { n: '03', icon: 'e-abc', title: 'Grammar Boss', text: { uk: 'Усі 12 часів, умовні, пасив, reported speech.', ru: 'Все 12 времён, условные, пассив, reported speech.', en: 'All 12 tenses, conditionals, passive, reported speech.' }, href: '/grammar/trainer' },
  { n: '04', icon: 'e-trophy', title: '20 mock tests', text: { uk: '32 завдання, близько 60 хвилин, таймер і розбір помилок.', ru: '32 задания, около 60 минут, таймер и разбор ошибок.', en: '32 questions, about 60 minutes, a timer and a review of mistakes.' }, href: '/nmt/mock' },
];

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'НМТ з англійської: квізи і пробні тести | Murly', ru: 'НМТ по английскому: квизы и пробные тесты | Murly', en: 'NMT English prep: quizzes and practice tests | Murly' }),
    description: t({
      uk: 'Підготовка до НМТ з англійської: короткі квізи у форматі іспиту, граматика, читання і пробні тести.',
      ru: 'Подготовка к НМТ по английскому: короткие квизы в формате экзамена, грамматика, чтение и пробные тесты.',
      en: 'Prepare for the NMT (Ukrainian school exam) in English: short exam-style quizzes, grammar, reading and practice tests.',
    }),
    alternates: alt('/nmt'),
  };
}

export default function NmtPage() {
  const t = tr();
  const firstQuiz = `/quiz/${QUIZZES[0].slug}`;
  return (
    <>
      <SiteNav />

      {/* HERO */}
      <section className="mu-hero" data-stickers="8">
        <div className="mu-container mu-hero__inner">
          <Kit id="il-cat-exam" className="kit-home kit-home--r" />
          <h1 className="mu-hero__title">
            {t.lang === 'en' ? (
              <>
                The English
                <br />
                they <em>don’t teach</em>
                <br />at school.
              </>
            ) : t.lang === 'ru' ? (
              <>
                Про английский,
                <br />
                которому <em>не учат</em>
                <br />в школе.
              </>
            ) : (
              <>
                Про англійську,
                <br />
                яку <em>не вчать</em>
                <br />у школі.
              </>
            )}
          </h1>
          <div className="mu-hero__cta">
            <Link href={firstQuiz} className="mu-btn mu-btn--lime mu-btn--lg">
              {t({ uk: 'Почати квіз', ru: 'Начать квиз', en: 'Start a quiz' })}
              <span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>

        <div className="mu-container">
          <div className="mu-polaroids">
            {POLAROIDS.map((p) => {
              const inner = (
                <>
                  <div className="mu-polaroid__visual" style={{ background: p.bg, color: p.ink }}>
                    <Icon id={p.icon} />
                  </div>
                  <div className="mu-polaroid__label">{p.label}</div>
                </>
              );
              return p.href ? (
                <Link key={p.label} href={p.href} className="mu-polaroid">{inner}</Link>
              ) : (
                <div key={p.label} className="mu-polaroid mu-polaroid--soon" title={t({ uk: 'Скоро', ru: 'Скоро', en: 'Coming soon' })}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mu-scallop" style={{ backgroundColor: 'var(--mu-tomato)' }} />

      {/* FEATURES */}
      <section className="mu-section mu-section--tomato" id="how" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Що є для', ru: 'Что есть для', en: 'What you get for the' })} <em>{t({ uk: 'НМТ.', ru: 'НМТ.', en: 'NMT.' })}</em></h2>
          </div>
          <div className="mu-cards">
            {FEATURES.map((f) => (
              <div key={f.title.uk} className={`mu-card ${f.mod}`}>
                <div className="mu-card__icon"><Icon id={f.icon} /></div>
                <h3 className="mu-card__title">{t(f.title)}</h3>
                <div className="mu-chips">{f.chips.map((c) => <span key={c.uk}>{t(c)}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mu-scallop mu-scallop--up" style={{ backgroundColor: 'var(--mu-tomato)' }} />

      {/* PATH */}
      <section className="mu-section" id="path" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Твій шлях до', ru: 'Твой путь к', en: 'Your road to the' })} <em>{t({ uk: 'НМТ.', ru: 'НМТ.', en: 'NMT.' })}</em></h2>
          </div>
          <div className="mu-steps">
            {STEPS.map((s) => {
              const body = (
                <>
                  <span className="mu-step__ic"><Icon id={s.icon} /></span>
                  <div className="mu-step__num">{s.n}</div>
                  <h3 className="mu-step__title">{s.title}</h3>
                  <p className="mu-step__text">{t(s.text)}</p>
                </>
              );
              return s.href ? (
                <Link key={s.n} href={s.href} className="mu-step">{body}</Link>
              ) : (
                <div key={s.n} className="mu-step">{body}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="mu-section" id="pricing" data-stickers="4" style={{ paddingTop: 40 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title"><em>{t({ uk: 'Тарифи.', ru: 'Тарифы.', en: 'Pricing.' })}</em></h2>
          </div>
          <PricingSection firstQuiz={firstQuiz} start="student" />
        </div>
      </section>

      {/* CTA */}
      <section className="mu-section" data-stickers="3" style={{ paddingTop: 40 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-speak" className="mu-ic mu-ic--cta" />
            <h2>{t({ uk: 'Готовий', ru: 'Готов', en: 'Ready to' })} <em>{t({ uk: 'крекнути', ru: 'взломать', en: 'crack' })}</em> {t({ uk: 'НМТ?', ru: 'НМТ?', en: 'the NMT?' })}</h2>
            <Link href={firstQuiz} className="mu-btn mu-btn--tomato mu-btn--lg">
              {t({ uk: 'Почати перший квіз', ru: 'Начать первый квиз', en: 'Start your first quiz' })}
              <span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <RelatedPosts slugs={['nmt-anglijska-za-3-misyatsi', 'yak-vyvchyty-nepravylni-diyeslova']} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
