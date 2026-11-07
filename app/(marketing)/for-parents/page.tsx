import RelatedPosts from '@/components/blog/RelatedPosts';
import Link from 'next/link';
import { alt } from '@/lib/seo';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Murly для батьків: англійська, яку дитина хоче вчити', ru: 'Murly для родителей: английский, который ребёнок хочет учить', en: 'Murly for parents: English your child wants to learn' }),
    description: t({
      uk: 'Домашка-гра, слова від учителя, граматика простими словами і 3D-містечко за монетки. Регулярне навчання без сварок.',
      ru: 'Домашка-игра, слова от учителя, грамматика простыми словами и 3D-городок за монетки. Регулярная учёба без ссор.',
      en: 'Homework as a game, words from the teacher, simple grammar and a 3D town for coins. Regular learning without fights.',
    }),
    alternates: alt('/for-parents'),
  };
}

const POINTS: { icon: string; mod: string; title: T; text: T }[] = [
  { icon: 'd-clock', mod: 'mu-card--lime', title: { uk: '15-20 хвилин на день', ru: '15-20 минут в день', en: '15-20 minutes a day' }, text: { uk: 'Короткі вправи й ігри щодня замість марафону перед контрольною.', ru: 'Короткие упражнения и игры каждый день вместо марафона перед контрольной.', en: 'Short exercises and games every day instead of a marathon before a test.' } },
  { icon: 'c-fish', mod: 'mu-card--mustard', title: { uk: 'Монетки за навчання', ru: 'Монетки за учёбу', en: 'Coins for learning' }, text: { uk: 'За домашку і слова дитина отримує монетки і будує своє 3D-містечко.', ru: 'За домашку и слова ребёнок получает монетки и строит свой 3D-городок.', en: 'Homework and words earn coins to build their own 3D town.' } },
  { icon: 'd-lock', mod: 'mu-card--sky', title: { uk: 'Безпечно', ru: 'Безопасно', en: 'Safe' }, text: { uk: 'Без реклами. Кабінет учня бачить тільки його вчитель.', ru: 'Без рекламы. Кабинет ученика видит только его учитель.', en: 'No ads. Only the teacher can see the student’s dashboard.' } },
];

const STEPS: { title: T; text: T }[] = [
  { title: { uk: 'Створіть кабінет для дитини', ru: 'Создайте кабинет для ребёнка', en: 'Create an account for your child' }, text: { uk: 'Реєструєтеся ви, кабінет належить дитині. Малюкам учитель може дати вхід за телефоном і PIN.', ru: 'Регистрируетесь вы, кабинет принадлежит ребёнку. Малышам учитель может дать вход по телефону и PIN.', en: 'You sign up, the account belongs to your child. For little ones a teacher can set up a phone and PIN login.' } },
  { title: { uk: 'Оберіть «Я дитина 6–11» або введіть код учителя', ru: 'Выберите «Я ребёнок 6–11» или введите код учителя', en: 'Pick “I am a kid, 6–11” or enter a teacher code' }, text: { uk: 'Без учителя Murly дає план на 15–20 хвилин щодня. З кодом учителя з’являться розклад і домашка.', ru: 'Без учителя Murly даёт план на 15–20 минут в день. С кодом учителя появятся расписание и домашка.', en: 'Without a teacher, Murly gives a 15–20 minute daily plan. With a teacher code, the schedule and homework appear.' } },
  { title: { uk: 'Дивіться прогрес', ru: 'Смотрите прогресс', en: 'Watch the progress' }, text: { uk: 'У кабінеті дитини видно домашку, слова і монетки. Учитель може дати посилання для батьків: оцінки, відвідування і слова без входу.', ru: 'В кабинете ребёнка видно домашку, слова и монетки. Учитель может дать ссылку для родителей: оценки, посещения и слова без входа.', en: 'The account shows homework, words and coins. A teacher can give you a parent link: scores, attendance and words, no login.' } },
];

const FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Чи потрібен учитель?', ru: 'Нужен ли учитель?', en: 'Do we need a teacher?' }, a: { uk: 'З учителем найкраще: він задає домашку і бачить прогрес. Граматику, дієслова, слухання й читання можна проходити і самостійно.', ru: 'С учителем лучше всего: он задаёт домашку и видит прогресс. Грамматику, глаголы, аудирование и чтение можно проходить и самостоятельно.', en: 'A teacher works best: they set homework and see progress. Grammar, verbs, listening and reading also work on your own.' } },
  { q: { uk: 'Для якого віку?', ru: 'Для какого возраста?', en: 'What ages is it for?' }, a: { uk: 'Кабінет учня з 6 років. Для молодших є сторінка «Англійська з малюком».', ru: 'Кабинет ученика с 6 лет. Для младших есть страница «Английский с малышом».', en: 'The student account is for ages 6+. For younger kids there is the “English with little ones” page.' } },
  { q: { uk: 'Скільки коштує?', ru: 'Сколько стоит?', en: 'How much does it cost?' }, a: { uk: 'Почати можна безкоштовно. Ціни на сторінці «Тарифи».', ru: 'Начать можно бесплатно. Цены на странице «Тарифы».', en: 'You can start for free. Prices are on the “Pricing” page.' } },
];

export default function ForParentsPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id="st-cat-heart" className="kit-hero" />
          <h1>
            {t.lang === 'en' ? (
              <>English without <em>fights</em> over homework.</>
            ) : t.lang === 'ru' ? (
              <>Английский без <em>ссор</em> из-за уроков.</>
            ) : (
              <>Англійська без <em>сварок</em> через уроки.</>
            )}
          </h1>
          <div className="mu-hero__cta">
            <Link href="/sign-up?role=student" className="mu-btn mu-btn--lime mu-btn--lg">
              {t({ uk: 'Створити кабінет для дитини', ru: 'Создать кабинет для ребёнка', en: 'Create your child’s account' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* три кроки: що робить батько, щоб дитина почала і щоб бачити прогрес */}
      <section className="mu-section" style={{ paddingTop: 24, paddingBottom: 0 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Як почати', ru: 'Как начать', en: 'How to' })} <em>{t({ uk: 'за 2 хвилини.', ru: 'за 2 минуты.', en: 'start in 2 minutes.' })}</em></h2>
          </div>
          <ol className="pr-steps">
            {STEPS.map((x, i) => (
              <li key={i} className="pr-step">
                <span className="pr-step__n">{i + 1}</span>
                <div><b>{t(x.title)}</b><p>{t(x.text)}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-cards">
            {POINTS.map((p) => (
              <div key={p.title.uk} className={`mu-card ${p.mod}`}>
                <div className="mu-card__icon"><Icon id={p.icon} /></div>
                <h3 className="mu-card__title">{t(p.title)}</h3>
                <p className="mu-card__text">{t(p.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Питання', ru: 'Вопросы', en: 'Parent' })} <em>{t({ uk: 'батьків.', ru: 'родителей.', en: 'questions.' })}</em></h2>
          </div>
          <Faq items={FAQ.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
        </div>
      </section>

      <RelatedPosts slugs={['anglijska-dlya-ditej-vdoma']} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
