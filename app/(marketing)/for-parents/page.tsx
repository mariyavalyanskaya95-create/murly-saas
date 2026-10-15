import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Murly для батьків: англійська, яку дитина хоче вчити', ru: 'Murly для родителей: английский, который ребёнок хочет учить', en: 'Murly for parents: English your child wants to learn' }),
    description: t({
      uk: 'Домашка-гра, слова від учителя, граматика простими словами і 3D-містечко за монетки. Регулярне навчання без сварок.',
      ru: 'Домашка-игра, слова от учителя, грамматика простыми словами и 3D-городок за монетки. Регулярная учёба без ссор.',
      en: 'Homework as a game, words from the teacher, simple grammar and a 3D town for coins. Regular learning without fights.',
    }),
    alternates: { canonical: '/for-parents' },
  };
}

const POINTS: { icon: string; mod: string; title: T; text: T }[] = [
  { icon: 'd-clock', mod: 'mu-card--lime', title: { uk: 'Трохи щодня', ru: 'Понемногу каждый день', en: 'A little every day' }, text: { uk: 'Короткі вправи й ігри, які легко вписати в день. Регулярність дає більше, ніж марафон перед контрольною.', ru: 'Короткие упражнения и игры, которые легко вписать в день. Регулярность даёт больше, чем марафон перед контрольной.', en: 'Short exercises and games that fit easily into the day. Regular practice beats a marathon before a test.' } },
  { icon: 'c-fish', mod: 'mu-card--mustard', title: { uk: 'Хочеться самому', ru: 'Хочется самому', en: 'They want to do it' }, text: { uk: 'За домашку і слова дитина отримує монетки і будує своє 3D-містечко. Мотивація без нагадувань.', ru: 'За домашку и слова ребёнок получает монетки и строит свой 3D-городок. Мотивация без напоминаний.', en: 'Homework and words earn your child coins to build their own 3D town. Motivation without reminders.' } },
  { icon: 'd-lock', mod: 'mu-card--sky', title: { uk: 'Безпечно', ru: 'Безопасно', en: 'Safe' }, text: { uk: 'Без реклами. У грі все англійською, а кабінет учня бачить тільки його вчитель.', ru: 'Без рекламы. В игре всё на английском, а кабинет ученика видит только его учитель.', en: 'No ads. Everything in the game is in English, and only the teacher can see the student’s dashboard.' } },
];

const FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Чи потрібен учитель?', ru: 'Нужен ли учитель?', en: 'Do we need a teacher?' }, a: { uk: 'Найкраще працює разом з учителем: він дає код, задає домашку і бачить прогрес. Але граматику, дієслова, слухання й читання можна проходити і самостійно.', ru: 'Лучше всего работает вместе с учителем: он даёт код, задаёт домашку и видит прогресс. Но грамматику, глаголы, аудирование и чтение можно проходить и самостоятельно.', en: 'It works best with a teacher: they give the code, set homework and see progress. But grammar, verbs, listening and reading can also be done on your own.' } },
  { q: { uk: 'Для якого віку?', ru: 'Для какого возраста?', en: 'What ages is it for?' }, a: { uk: 'Для дітей від 6 років, підлітків і дорослих. Є окремий розділ підготовки до НМТ.', ru: 'Для детей от 6 лет, подростков и взрослых. Есть отдельный раздел подготовки к НМТ.', en: 'For kids from 6, teens and adults. There is a separate section for NMT (Ukrainian school exam) prep.' } },
  { q: { uk: 'Скільки коштує?', ru: 'Сколько стоит?', en: 'How much does it cost?' }, a: { uk: 'Почати можна безкоштовно. Актуальні ціни на сторінці «Тарифи».', ru: 'Начать можно бесплатно. Актуальные цены на странице «Тарифы».', en: 'You can start for free. Current prices are on the “Pricing” page.' } },
  { q: { uk: 'Як зареєструвати дитину?', ru: 'Как зарегистрировать ребёнка?', en: 'How do I sign up my child?' }, a: { uk: 'Натисніть «Почати», оберіть «Я учень». Якщо вчитель дав код, введіть його на головній сторінці або в кабінеті учня.', ru: 'Нажмите «Начать», выберите «Я ученик». Если учитель дал код, введите его на главной странице или в кабинете ученика.', en: 'Click “Start” and choose “I’m a student”. If the teacher gave you a code, enter it on the home page or in the student dashboard.' } },
];

export default function ForParentsPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-heart" />{t({ uk: 'Для батьків', ru: 'Для родителей', en: 'For parents' })}</span>
          <h1>
            {t.lang === 'en' ? (
              <>English without <em>fights</em> over homework.</>
            ) : t.lang === 'ru' ? (
              <>Английский без <em>ссор</em> из-за уроков.</>
            ) : (
              <>Англійська без <em>сварок</em> через уроки.</>
            )}
          </h1>
          <p>{t({ uk: 'Домашка-гра, слова від учителя і своє 3D-містечко за монетки. Дитина вчиться сама, бо їй цікаво.', ru: 'Домашка-игра, слова от учителя и свой 3D-городок за монетки. Ребёнок учится сам, потому что ему интересно.', en: 'Homework as a game, words from the teacher and their own 3D town for coins. Your child learns on their own because it’s fun.' })}</p>
          <div className="mu-hero__cta">
            <Link href="/sign-up?role=student" className="mu-btn mu-btn--lime mu-btn--lg">
              {t({ uk: 'Зареєструвати дитину', ru: 'Зарегистрировать ребёнка', en: 'Sign up your child' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
            <Link href="/pricing" className="mu-btn mu-btn--lg">{t({ uk: 'Тарифи', ru: 'Тарифы', en: 'Pricing' })}</Link>
          </div>
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
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />FAQ</span>
            <h2 className="mu-section__title">{t({ uk: 'Питання', ru: 'Вопросы', en: 'Parent' })} <em>{t({ uk: 'батьків.', ru: 'родителей.', en: 'questions.' })}</em></h2>
          </div>
          <Faq items={FAQ.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
