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
import SeoNote from '@/components/SeoNote';
import Faq from '@/components/Faq';
import { FREE } from '@/lib/mock';

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

const NMT_FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Чи можна підготуватися до НМТ з англійської безкоштовно?', ru: 'Можно ли подготовиться к НМТ по английскому бесплатно?', en: 'Can I prepare for the NMT in English for free?' }, a: { uk: 'Так. На Murly безкоштовно і без реєстрації є пробні НМТ з поясненнями, квізи у форматі іспиту, граматика з тренажерами по 100 завдань, таблиця неправильних дієслів і ігри зі словами.', ru: 'Да. На Murly бесплатно и без регистрации есть пробные НМТ с объяснениями, квизы в формате экзамена, грамматика с тренажёрами по 100 заданий, таблица неправильных глаголов и игры со словами.', en: 'Yes. Murly has free mock NMT tests with explanations, exam-style quizzes, grammar trainers with 100 tasks each, an irregular verbs table and word games, no sign-up needed.' } },
  { q: { uk: 'Які пробні НМТ безкоштовні?', ru: 'Какие пробные НМТ бесплатные?', en: 'Which mock tests are free?' }, a: { uk: `Варіанти ${FREE.join(' і ')} безкоштовні завжди. Поки ми не підключили оплату, решта варіантів теж відкриті безкоштовно.`, ru: `Варианты ${FREE.join(' и ')} бесплатны всегда. Пока мы не подключили оплату, остальные варианты тоже открыты бесплатно.`, en: `Tests ${FREE.join(' and ')} are always free. Until payments are connected, the other tests are open for free too.` } },
  { q: { uk: 'Скільки завдань у пробному НМТ на Murly?', ru: 'Сколько заданий в пробном НМТ на Murly?', en: 'How many questions are in a Murly mock test?' }, a: { uk: '32 завдання в 6 частинах, близько 60 хвилин: оголошення, читання, пропуски. Є таймер, а після тесту бал і пояснення «Чому так?» до кожної відповіді.', ru: '32 задания в 6 частях, около 60 минут: объявления, чтение, пропуски. Есть таймер, а после теста балл и объяснение «Почему так?» к каждому ответу.', en: '32 questions in 6 parts, about 60 minutes: notices, reading, gap fills. There is a timer, and after the test you get a score and a «Why?» explanation for every answer.' } },
  { q: { uk: 'Чи потрібна реєстрація?', ru: 'Нужна ли регистрация?', en: 'Do I need to sign up?' }, a: { uk: 'Ні. Тести, квізи і граматика відкриваються одразу. Акаунт знадобиться, лише якщо хочеш бачити свій прогрес від тесту до тесту.', ru: 'Нет. Тесты, квизы и грамматика открываются сразу. Аккаунт понадобится, только если хочешь видеть свой прогресс от теста к тесту.', en: 'No. Tests, quizzes and grammar open right away. You only need an account to track your progress from test to test.' } },
  { q: { uk: 'Що повторити перед НМТ з англійської?', ru: 'Что повторить перед НМТ по английскому?', en: 'What should I review before the NMT in English?' }, a: { uk: 'Часи, умовні речення, пасив, артиклі, неправильні дієслова і сталі вирази. Для кожної теми на Murly є безкоштовний тренажер, а план на 8 тижнів є в чек-листі підготовки для друку.', ru: 'Времена, условные предложения, пассив, артикли, неправильные глаголы и устойчивые выражения. Для каждой темы на Murly есть бесплатный тренажёр, а план на 8 недель есть в чек-листе подготовки для печати.', en: 'Tenses, conditionals, the passive, articles, irregular verbs and collocations. Murly has a free trainer for each topic, and the 8-week plan is in the printable prep checklist.' } },
];

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'НМТ з англійської 2026: підготовка онлайн безкоштовно', ru: 'НМТ по английскому 2026: подготовка онлайн бесплатно', en: 'NMT 2026 English: free online exam prep | Murly' }),
    description: t({
      uk: 'Безкоштовна підготовка до НМТ з англійської: пробні тести з поясненнями, квізи у форматі іспиту, граматика і неправильні дієслова. Без реєстрації.',
      ru: 'Бесплатная подготовка к НМТ по английскому: пробные тесты с объяснениями, квизы в формате экзамена, грамматика и неправильные глаголы. Без регистрации.',
      en: 'Free prep for the NMT (Ukrainian school exam) in English: mock tests with explanations, exam-style quizzes, grammar and irregular verbs. No sign-up.',
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
          <SeoNote free={{ uk: 'Пробні НМТ, квізи і граматика безкоштовно, без реєстрації', ru: 'Пробные НМТ, квизы и грамматика бесплатно, без регистрации', en: 'Mock tests, quizzes and grammar for free, no sign-up' }} sell={{ text: { uk: 'План підготовки на папері:', ru: 'План подготовки на бумаге:', en: 'A prep plan on paper:' }, links: [{ href: '/nmt/calculator', label: { uk: 'Калькулятор балів НМТ', ru: 'Калькулятор баллов НМТ', en: 'NMT score calculator' } }, { href: '/shop/nmt-start', label: { uk: 'Старт до НМТ: 3 в 1', ru: 'Старт к НМТ: 3 в 1', en: 'NMT starter: 3 in 1' } }, { href: '/shop/nmt-checklist', label: { uk: 'Чек-лист підготовки до НМТ', ru: 'Чек-лист подготовки к НМТ', en: 'NMT prep checklist' } }] }} />
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

      {/* FAQ */}
      <section className="mu-section" id="faq" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Питання про', ru: 'Вопросы о', en: 'Questions about the' })} <em>{t({ uk: 'НМТ.', ru: 'НМТ.', en: 'NMT.' })}</em></h2>
          </div>
          <Faq items={NMT_FAQ.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
        </div>
      </section>

      <RelatedPosts slugs={['nmt-anglijska-za-3-misyatsi', 'yak-vyvchyty-nepravylni-diyeslova']} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
