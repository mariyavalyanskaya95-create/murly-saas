import Link from 'next/link';
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
  { label: 'Grammar Boss', icon: 'e-abc', bg: 'var(--mu-sky)', ink: 'var(--mu-ink)' },
  { label: 'Mock Test', icon: 'd-kid', bg: 'var(--mu-lime)', ink: 'var(--mu-ink)' },
  { label: 'Reading', icon: 'e-book', bg: 'var(--mu-ink)', ink: 'var(--mu-lime)' },
  { label: 'Writing', icon: 'e-pencil', bg: 'var(--mu-mustard)', ink: 'var(--mu-ink)' },
];

const FEATURES: { icon: string; mod: string; title: T; text: T }[] = [
  { icon: 'd-spark', mod: 'mu-card--lime', title: { uk: 'AI розбирає помилки', ru: 'AI разбирает ошибки', en: 'AI explains mistakes' }, text: { uk: 'Не просто показує правильну відповідь, а пояснює ЧОМУ ти помилився і що повторити.', ru: 'Не просто показывает правильный ответ, а объясняет, ПОЧЕМУ ты ошибся и что повторить.', en: 'It doesn’t just show the right answer. It explains WHY you got it wrong and what to review.' } },
  { icon: 'd-clock', mod: 'mu-card--mustard', title: { uk: '5 хв на день', ru: '5 минут в день', en: '5 minutes a day' }, text: { uk: "Коротка сесія з ранку. Застосунок пам'ятає, де ти зупинився, і пропонує наступний крок.", ru: 'Короткая сессия с утра. Приложение помнит, где ты остановился, и предлагает следующий шаг.', en: 'A short session in the morning. The app remembers where you stopped and suggests the next step.' } },
  { icon: 'e-trophy', mod: 'mu-card--sky', title: { uk: 'Mock-test як на НМТ', ru: 'Mock-test как на НМТ', en: 'Mock test just like the NMT' }, text: { uk: 'Повний пробник із таймером і офіційним форматом. Побачиш свій бал ще до іспиту.', ru: 'Полный пробный тест с таймером в официальном формате. Увидишь свой балл ещё до экзамена.', en: 'A full practice test with a timer in the official format. See your score before the real exam.' } },
  { icon: 'e-board', mod: '', title: { uk: 'Банк завдань', ru: 'Банк заданий', en: 'Task bank' }, text: { uk: 'Усі формати НМТ: reading, use of English, writing. Тренуй саме слабке місце.', ru: 'Все форматы НМТ: reading, use of English, writing. Тренируй именно слабое место.', en: 'Every NMT format: reading, use of English, writing. Train exactly where you are weak.' } },
  { icon: 'e-flame', mod: 'mu-card--ink', title: { uk: 'Streak і челенджі', ru: 'Streak и челленджи', en: 'Streaks and challenges' }, text: { uk: 'Щодня нові завдання. Streak мотивує, челенджі з друзями додають азарту.', ru: 'Каждый день новые задания. Streak мотивирует, челленджи с друзьями добавляют азарта.', en: 'New tasks every day. Streaks keep you going, challenges with friends add some fun competition.' } },
  { icon: 'd-team', mod: 'mu-card--lime', title: { uk: 'Для репетиторів', ru: 'Для репетиторов', en: 'For tutors' }, text: { uk: 'Веди учнів, бачи прогрес кожного, одним кліком задавай домашку. Батькам автозвіт раз на тиждень.', ru: 'Веди учеников, смотри прогресс каждого, задавай домашку в один клик. Родителям автоотчёт раз в неделю.', en: 'Manage students, see everyone’s progress, set homework in one click. Parents get an automatic weekly report.' } },
];

const STEPS: { n: string; icon: string; title: string; text: T; href?: string }[] = [
  { n: '01', icon: 'e-speak', title: 'Teen Life', text: { uk: 'Розмовна тема № 1. Друзі, школа, соцмережі. Часи та базові конструкції.', ru: 'Разговорная тема № 1. Друзья, школа, соцсети. Времена и базовые конструкции.', en: 'Speaking topic no. 1. Friends, school, social media. Tenses and basic structures.' }, href: '/quiz/teen-life' },
  { n: '02', icon: 'd-camera', title: 'Films & Netflix', text: { uk: 'Reading-блок на знайомих темах. Вчишся розуміти контекст, а не зубрити.', ru: 'Reading-блок на знакомых темах. Учишься понимать контекст, а не зубрить.', en: 'A reading block on familiar topics. You learn to understand context instead of cramming.' }, href: '/quiz/films-netflix' },
  { n: '03', icon: 'e-abc', title: 'Grammar Boss', text: { uk: 'Усі 12 часів + умовні, пасив, reported speech. Коротко, з прикладами.', ru: 'Все 12 времён + условные, пассив, reported speech. Коротко, с примерами.', en: 'All 12 tenses + conditionals, passive, reported speech. Short, with examples.' } },
  { n: '04', icon: 'e-trophy', title: 'Mock-test #1', text: { uk: 'Повний пробник НМТ на 90 хв. Таймер, бали, детальний аналіз помилок.', ru: 'Полный пробный тест НМТ на 90 минут. Таймер, баллы, подробный разбор ошибок.', en: 'A full 90-minute NMT practice test. Timer, score, detailed review of mistakes.' } },
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
    alternates: { canonical: '/nmt' },
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
          <div className="mu-hero__badge">
            <Icon id="c-paw" className="mu-ic mu-ic--badge" />
            {t({ uk: 'Перша платформа НМТ на вайбі', ru: 'Первая платформа НМТ на вайбе', en: 'The first NMT platform with a vibe' })}
          </div>
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
            <a href="#how" className="mu-btn mu-btn--lg">{t({ uk: 'Як це працює', ru: 'Как это работает', en: 'How it works' })}</a>
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

      {/* SHOUT */}
      <section className="mu-shout" data-stickers="2">
        <div className="mu-container">
          <div className="mu-shout__text">
            {t({ uk: 'Школа вчить граматику.', ru: 'Школа учит грамматику.', en: 'School teaches grammar.' })}
            <br />
            {t({ uk: 'Ми вчимо', ru: 'Мы учим', en: 'We teach you to' })} <em>{t({ uk: 'здавати', ru: 'сдавать', en: 'pass' })}</em> {t({ uk: 'НМТ.', ru: 'НМТ.', en: 'the NMT.' })}
            <span className="mu-shout__stamp"><Icon id="e-trophy" />{t({ uk: 'НА 200', ru: 'НА 200', en: 'FOR 200' })}</span>
          </div>
        </div>
      </section>

      <div className="mu-scallop" style={{ backgroundColor: 'var(--mu-tomato)' }} />

      {/* FEATURES */}
      <section className="mu-section mu-section--tomato" id="how" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow mu-section__eyebrow--lime"><Icon id="d-spark" />Core features</span>
            <h2 className="mu-section__title">{t({ uk: 'Все для 200+ в\u00a0одному', ru: 'Всё для 200+ в\u00a0одном', en: 'Everything for 200+ in\u00a0one' })} <em>{t({ uk: 'місці.', ru: 'месте.', en: 'place.' })}</em></h2>
            <p className="mu-section__lead">{t({ uk: 'Не ще один підручник. Жива платформа, що підлаштовується під тебе.', ru: 'Не очередной учебник. Живая платформа, которая подстраивается под тебя.', en: 'Not just another textbook. A living platform that adapts to you.' })}</p>
          </div>
          <div className="mu-cards">
            {FEATURES.map((f) => (
              <div key={f.title.uk} className={`mu-card ${f.mod}`}>
                <div className="mu-card__icon"><Icon id={f.icon} /></div>
                <h3 className="mu-card__title">{t(f.title)}</h3>
                <p className="mu-card__text">{t(f.text)}</p>
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
            <h2 className="mu-section__title">{t({ uk: 'Твій шлях до', ru: 'Твой путь к', en: 'Your road to the' })} <em>{t({ uk: 'НМТ.', ru: 'НМТ.', en: 'NMT.' })}</em></h2>
            <p className="mu-section__lead">{t({ uk: 'Чотири етапи. Проходь у своєму темпі. Відкривай нові рівні, як у грі.', ru: 'Четыре этапа. Проходи в своём темпе. Открывай новые уровни, как в игре.', en: 'Four stages. Go at your own pace. Unlock new levels, like in a game.' })}</p>
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
            <span className="mu-section__eyebrow"><Icon id="d-money" />Pricing</span>
            <h2 className="mu-section__title">{t({ uk: 'Чесні', ru: 'Честные', en: 'Honest' })} <em>{t({ uk: 'тарифи.', ru: 'тарифы.', en: 'pricing.' })}</em></h2>
            <p className="mu-section__lead">{t({ uk: 'Почни безкоштовно. Якщо зайде, підписка дешевша за один урок із репетитором.', ru: 'Начни бесплатно. Если понравится, подписка дешевле одного урока с репетитором.', en: 'Start for free. If you like it, the subscription costs less than one lesson with a tutor.' })}</p>
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
            <p>{t({ uk: 'Пройди перший квіз за 5 хв і побачиш, як це круто. Жодної кредитки.', ru: 'Пройди первый квиз за 5 минут и увидишь, как это круто. Никакой кредитки.', en: 'Take your first quiz in 5 minutes and see how cool it is. No credit card.' })}</p>
            <Link href={firstQuiz} className="mu-btn mu-btn--tomato mu-btn--lg">
              {t({ uk: 'Почати перший квіз', ru: 'Начать первый квиз', en: 'Start your first quiz' })}
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
