import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { QUIZZES } from '@/lib/quizzes';
import PricingSection from '@/components/PricingSection';

const POLAROIDS = [
  { label: 'Teen Life', icon: 'e-speak', bg: 'var(--mu-mustard)', ink: 'var(--mu-ink)', href: '/quiz/teen-life' },
  { label: 'Films & Netflix', icon: 'd-camera', bg: 'var(--mu-tomato)', ink: 'var(--mu-lime)', href: '/quiz/films-netflix' },
  { label: 'Grammar Boss', icon: 'e-abc', bg: 'var(--mu-sky)', ink: 'var(--mu-ink)' },
  { label: 'Mock Test', icon: 'd-kid', bg: 'var(--mu-lime)', ink: 'var(--mu-ink)' },
  { label: 'Reading', icon: 'e-book', bg: 'var(--mu-ink)', ink: 'var(--mu-lime)' },
  { label: 'Writing', icon: 'e-pencil', bg: 'var(--mu-mustard)', ink: 'var(--mu-ink)' },
];

const FEATURES = [
  { icon: 'd-spark', mod: 'mu-card--lime', title: 'AI розбирає помилки', text: 'Не просто показує правильну відповідь, а пояснює ЧОМУ ти помилився і що повторити.' },
  { icon: 'd-clock', mod: 'mu-card--mustard', title: '5 хв на день', text: "Коротка сесія з ранку. Застосунок пам'ятає, де ти зупинився, і пропонує наступний крок." },
  { icon: 'e-trophy', mod: 'mu-card--sky', title: 'Mock-test як на НМТ', text: 'Повний пробник із таймером і офіційним форматом. Побачиш свій бал ще до іспиту.' },
  { icon: 'e-board', mod: '', title: 'Банк завдань', text: 'Усі формати НМТ: reading, use of English, writing. Тренуй саме слабке місце.' },
  { icon: 'e-flame', mod: 'mu-card--ink', title: 'Streak і челенджі', text: 'Щодня нові завдання. Streak мотивує, челенджі з друзями додають азарту.' },
  { icon: 'd-team', mod: 'mu-card--lime', title: 'Для репетиторів', text: 'Веди учнів, бачи прогрес кожного, одним кліком задавай домашку. Батькам автозвіт раз на тиждень.' },
];

const STEPS = [
  { n: '01', icon: 'e-speak', title: 'Teen Life', text: 'Розмовна тема № 1. Друзі, школа, соцмережі. Часи та базові конструкції.', href: '/quiz/teen-life' },
  { n: '02', icon: 'd-camera', title: 'Films & Netflix', text: 'Reading-блок на знайомих темах. Вчишся розуміти контекст, а не зубрити.', href: '/quiz/films-netflix' },
  { n: '03', icon: 'e-abc', title: 'Grammar Boss', text: 'Усі 12 часів + умовні, пасив, reported speech. Коротко, з прикладами.' },
  { n: '04', icon: 'e-trophy', title: 'Mock-test #1', text: 'Повний пробник НМТ на 90 хв. Таймер, бали, детальний аналіз помилок.' },
];

export const metadata: Metadata = {
  title: 'НМТ з англійської: квізи і пробні тести | Murly',
  description: 'Підготовка до НМТ з англійської: короткі квізи у форматі іспиту, граматика, читання і пробні тести.',
  alternates: { canonical: '/nmt' },
};

export default function NmtPage() {
  const firstQuiz = `/quiz/${QUIZZES[0].slug}`;
  return (
    <>
      <SiteNav />

      {/* HERO */}
      <section className="mu-hero" data-stickers="8">
        <div className="mu-container mu-hero__inner">
          <div className="mu-hero__badge">
            <Icon id="c-paw" className="mu-ic mu-ic--badge" />
            Перша платформа НМТ на вайбі
          </div>
          <h1 className="mu-hero__title">
            Про англійську,
            <br />
            яку <em>не вчать</em>
            <br />у школі.
          </h1>
          <div className="mu-hero__cta">
            <Link href={firstQuiz} className="mu-btn mu-btn--lime mu-btn--lg">
              Почати квіз
              <span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
            <a href="#how" className="mu-btn mu-btn--lg">Як це працює</a>
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
                <div key={p.label} className="mu-polaroid mu-polaroid--soon" title="Скоро">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SHOUT */}
      <section className="mu-shout" data-stickers="2">
        <div className="mu-container">
          <div className="mu-shout__text">
            Школа вчить граматику.
            <br />
            Ми вчимо <em>здавати</em> НМТ.
            <span className="mu-shout__stamp"><Icon id="e-trophy" />НА 200</span>
          </div>
        </div>
      </section>

      <div className="mu-scallop" style={{ backgroundColor: 'var(--mu-tomato)' }} />

      {/* FEATURES */}
      <section className="mu-section mu-section--tomato" id="how" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow mu-section__eyebrow--lime"><Icon id="d-spark" />Core features</span>
            <h2 className="mu-section__title">Все для 200+ в&nbsp;одному <em>місці.</em></h2>
            <p className="mu-section__lead">Не ще один підручник. Жива платформа, що підлаштовується під тебе.</p>
          </div>
          <div className="mu-cards">
            {FEATURES.map((f) => (
              <div key={f.title} className={`mu-card ${f.mod}`}>
                <div className="mu-card__icon"><Icon id={f.icon} /></div>
                <h3 className="mu-card__title">{f.title}</h3>
                <p className="mu-card__text">{f.text}</p>
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
            <span className="mu-section__eyebrow"><Icon id="e-cap" />Your road to 200</span>
            <h2 className="mu-section__title">Твій шлях до <em>НМТ.</em></h2>
            <p className="mu-section__lead">Чотири етапи. Проходь у своєму темпі. Відкривай нові рівні, як у грі.</p>
          </div>
          <div className="mu-steps">
            {STEPS.map((s) => {
              const body = (
                <>
                  <span className="mu-step__ic"><Icon id={s.icon} /></span>
                  <div className="mu-step__num">{s.n}</div>
                  <h3 className="mu-step__title">{s.title}</h3>
                  <p className="mu-step__text">{s.text}</p>
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
            <span className="mu-section__eyebrow"><Icon id="d-money" />Pricing</span>
            <h2 className="mu-section__title">Чесні <em>тарифи.</em></h2>
            <p className="mu-section__lead">Почни безкоштовно. Якщо зайде, підписка дешевша за один урок із репетитором.</p>
          </div>
          <PricingSection firstQuiz={firstQuiz} />
        </div>
      </section>

      {/* CTA */}
      <section className="mu-section" data-stickers="3" style={{ paddingTop: 40 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-speak" className="mu-ic mu-ic--cta" />
            <h2>Готовий <em>крекнути</em> НМТ?</h2>
            <p>Пройди перший квіз за 5 хв і побачиш, як це круто. Жодної кредитки.</p>
            <Link href={firstQuiz} className="mu-btn mu-btn--tomato mu-btn--lg">
              Почати перший квіз
              <span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
