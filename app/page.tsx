import Link from 'next/link';
import { alt } from '@/lib/seo';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import JoinCode from '@/components/JoinCode';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';
import Marquee from '@/components/Marquee';
import MurlyCat from '@/components/MurlyCat';
import Tour from '@/components/Tour';
import { SITE_TOUR } from '@/lib/tours';

export function generateMetadata(): Metadata {
  const t = tr();
  const title = t({ uk: 'Murly: англійська для дітей, підлітків і дорослих онлайн', ru: 'Murly: английский для детей, подростков и взрослых онлайн', en: 'Murly: online English for kids, teens and adults' });
  const description = t({
    uk: 'Платформа англійської: граматика, неправильні дієслова, пробні НМТ, ігри і кабінет вчителя з розкладом і домашкою. Багато чого безкоштовно.',
    ru: 'Платформа английского: грамматика, неправильные глаголы, пробные НМТ, игры и кабинет учителя с расписанием и домашкой. Многое бесплатно.',
    en: 'An English platform: grammar, irregular verbs, NMT mock tests, games and a teacher dashboard with schedule and homework. Lots of it is free.',
  });
  return {
    title, description,
    alternates: alt('/'),
    openGraph: { title, description, type: 'website', siteName: 'Murly', url: '/' },
  };
}

// Хто ти: три дороги з головної
const ROLES: { id: string; kit: string; icon: string; mod: string; who: T; pts: T[]; main: { href: string; label: T }; alt: { href: string; label: T } }[] = [
  {
    id: 'students', kit: 'st-boy-backpack', icon: 'd-kid', mod: 'mu-role--lime',
    who: { uk: 'Я учень', ru: 'Я ученик', en: 'I’m a student' },
    pts: [{ uk: 'Граматика й ігри зі словами', ru: 'Грамматика и игры со словами', en: 'Grammar and word games' }, { uk: 'Домашка з автоперевіркою', ru: 'Домашка с автопроверкой', en: 'Auto-checked homework' }, { uk: 'Своє 3D-містечко за монетки', ru: 'Свой 3D-городок за монетки', en: 'Your own 3D town for coins' }],
    main: { href: '/sign-up?role=student', label: { uk: 'Почати вчитися', ru: 'Начать учиться', en: 'Start learning' } },
    alt: { href: '/grammar', label: { uk: 'Спробувати без реєстрації', ru: 'Попробовать без регистрации', en: 'Try without signing up' } },
  },
  {
    id: 'teachers', kit: 'st-cat-coffee', icon: 'd-team', mod: 'mu-role--mustard',
    who: { uk: 'Я вчитель', ru: 'Я учитель', en: 'I’m a teacher' },
    pts: [{ uk: 'Учні, розклад, оплати', ru: 'Ученики, расписание, оплаты', en: 'Students, schedule, payments' }, { uk: 'Готові уроки на 60 хвилин', ru: 'Готовые уроки на 60 минут', en: 'Ready 60-minute lessons' }, { uk: 'Домашка з автоперевіркою', ru: 'Домашка с автопроверкой', en: 'Auto-checked homework' }, { uk: 'Словник кожного учня', ru: 'Словарь каждого ученика', en: 'A word list for every student' }],
    main: { href: '/sign-up?role=teacher', label: { uk: 'Створити кабінет', ru: 'Создать кабинет', en: 'Create a dashboard' } },
    alt: { href: '/for-teachers', label: { uk: 'Що вміє кабінет', ru: 'Что умеет кабинет', en: 'What it can do' } },
  },
  {
    id: 'parents', kit: 'st-cat-heart', icon: 'd-heart', mod: 'mu-role--sky',
    who: { uk: 'Я з батьків', ru: 'Я родитель', en: 'I’m a parent' },
    pts: [{ uk: 'Кабінет для дитини з 6 років', ru: 'Кабинет для ребёнка с 6 лет', en: 'A child account from age 6' }, { uk: 'Домашка й успіхи в Telegram', ru: 'Домашка и успехи в Telegram', en: 'Homework and progress in Telegram' }, { uk: 'Монетки за навчання', ru: 'Монетки за учёбу', en: 'Coins for learning' }],
    main: { href: '/for-parents', label: { uk: 'Для батьків', ru: 'Для родителей', en: 'For parents' } },
    alt: { href: '/baby-english', label: { uk: 'Малюкам до 7 років', ru: 'Малышам до 7 лет', en: 'Kids under 7' } },
  },
  {
    id: 'adults', kit: 'st-cat-coffee', icon: 'e-book', mod: 'mu-role--lilac',
    who: { uk: 'Я дорослий або до НМТ', ru: 'Я взрослый или к НМТ', en: 'Adult or NMT prep' },
    pts: [{ uk: 'Тексти й аудіо', ru: 'Тексты и аудио', en: 'Texts and audio' }, { uk: 'Граматика простими словами', ru: 'Грамматика простыми словами', en: 'Grammar made simple' }, { uk: '20 пробних НМТ з поясненнями', ru: '20 пробных НМТ с объяснениями', en: '20 NMT mock tests with explanations' }],
    main: { href: '/sign-up?role=student&track=adult', label: { uk: 'Почати', ru: 'Начать', en: 'Start' } },
    alt: { href: '/nmt/mock', label: { uk: 'Пробні НМТ', ru: 'Пробные НМТ', en: 'NMT mock tests' } },
  },
];

const FEATURES: { icon: string; mod: string; title: T; chips: T[]; href: string }[] = [
  { icon: 'e-board', mod: 'mu-card--lime', href: '/lessons', title: { uk: 'Уроки на 60 хвилин', ru: 'Уроки на 60 минут', en: '60-minute lessons' }, chips: [{ uk: 'A1–C1' }, { uk: 'за темами', ru: 'по темам', en: 'by topic' }] },
  { icon: 'e-pencil', mod: 'mu-card--mustard', href: '/for-teachers#homework', title: { uk: 'Домашка-гра', ru: 'Домашка-игра', en: 'Homework as a game' }, chips: [{ uk: 'автоперевірка', ru: 'автопроверка', en: 'auto-check' }, { uk: 'ігри зі словами', ru: 'игры со словами', en: 'word games' }] },
  { icon: 'e-trophy', mod: '', href: '/level-test', title: { uk: 'Тест на рівень', ru: 'Тест на уровень', en: 'Level test' }, chips: [{ uk: 'A1–C1' }, { uk: 'для дітей гра', ru: 'для детей игра', en: 'a game for kids' }] },
  { icon: 'e-abc', mod: 'mu-card--sky', href: '/grammar', title: { uk: 'Граматика простими словами', ru: 'Грамматика простыми словами', en: 'Grammar made simple' }, chips: [{ uk: '52 теми', ru: '52 темы', en: '52 topics' }, { uk: 'без реєстрації', ru: 'без регистрации', en: 'no sign-up' }] },
  { icon: 'e-book', mod: '', href: '/irregular-verbs', title: { uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' }, chips: [{ uk: 'з озвучкою', ru: 'с озвучкой', en: 'with audio' }, { uk: 'ігри', ru: 'игры', en: 'games' }] },
  { icon: 'e-head', mod: 'mu-card--lime', href: '/practice', title: { uk: 'Діалоги й тексти з вправами', ru: 'Диалоги и тексты с упражнениями', en: 'Dialogues and texts with tasks' }, chips: [{ uk: 'аудіо', ru: 'аудио', en: 'audio' }, { uk: 'питання', ru: 'вопросы', en: 'questions' }] },
  { icon: 'd-rocket', mod: 'mu-card--ink', href: '/games', title: { uk: 'Ігри', ru: 'Игры', en: 'Games' }, chips: [{ uk: '3D-містечко', ru: '3D-городок', en: '3D town' }, { uk: 'квізи', ru: 'квизы', en: 'quizzes' }] },
  { icon: 'e-trophy', mod: 'mu-card--mustard', href: '/game-lessons', title: { uk: 'Уроки за іграми', ru: 'Уроки по играм', en: 'Game-based lessons' }, chips: [{ uk: 'Minecraft' }, { uk: 'Roblox' }, { uk: 'Among Us' }] },
  { icon: 'e-trophy', mod: 'mu-card--sky', href: '/nmt', title: { uk: 'Підготовка до НМТ', ru: 'Подготовка к НМТ', en: 'NMT exam prep' }, chips: [{ uk: '20 пробних', ru: '20 пробных', en: '20 mocks' }, { uk: 'з розбором', ru: 'с разбором', en: 'with explanations' }] },
];

// Що таке Murly: 4 короткі картки одразу після героя
const WHAT: { icon: string; mod: string; title: T; chips: T[]; href: string; more: T }[] = [
  { icon: 'd-kid', mod: 'mu-card--lime', href: '/grammar', title: { uk: 'Учням', ru: 'Ученикам', en: 'Students' }, more: { uk: 'Спробувати', ru: 'Попробовать', en: 'Try it' },
    chips: [{ uk: 'граматика', ru: 'грамматика', en: 'grammar' }, { uk: 'неправильні дієслова', ru: 'неправильные глаголы', en: 'irregular verbs' }, { uk: 'пробні НМТ', ru: 'пробные НМТ', en: 'NMT mocks' }, { uk: 'ігри', ru: 'игры', en: 'games' }, { uk: 'безкоштовно', ru: 'бесплатно', en: 'free' }] },
  { icon: 'd-team', mod: 'mu-card--mustard', href: '/for-teachers', title: { uk: 'Вчителям', ru: 'Учителям', en: 'Teachers' }, more: { uk: 'Що вміє кабінет', ru: 'Что умеет кабинет', en: 'See the dashboard' },
    chips: [{ uk: 'учні', ru: 'ученики', en: 'students' }, { uk: 'розклад', ru: 'расписание', en: 'schedule' }, { uk: 'домашка', ru: 'домашка', en: 'homework' }, { uk: 'оплати', ru: 'оплаты', en: 'payments' }, { uk: 'Telegram-бот', ru: 'Telegram-бот', en: 'Telegram bot' }] },
  { icon: 'd-heart', mod: 'mu-card--sky', href: '/for-parents', title: { uk: 'Батькам', ru: 'Родителям', en: 'Parents' }, more: { uk: 'Для батьків', ru: 'Для родителей', en: 'For parents' },
    chips: [{ uk: 'кабінет дитини з 6 років', ru: 'кабинет ребёнка с 6 лет', en: 'child account from 6' }, { uk: 'успіхи в Telegram', ru: 'успехи в Telegram', en: 'progress in Telegram' }, { uk: 'монетки за навчання', ru: 'монетки за учёбу', en: 'coins for learning' }] },
  { icon: 'e-pencil', mod: 'mu-card--ink', href: '/pricing#mini', title: { uk: 'Матеріали для друку', ru: 'Материалы для печати', en: 'Printables' }, more: { uk: 'Усі матеріали', ru: 'Все материалы', en: 'All materials' },
    chips: [{ uk: 'НМТ', ru: 'НМТ', en: 'NMT' }, { uk: 'граматика', ru: 'грамматика', en: 'grammar' }, { uk: 'дієслова', ru: 'глаголы', en: 'verbs' }, { uk: 'PDF з ключами', ru: 'PDF с ключами', en: 'PDF with answers' }, { uk: 'від 85 ₴', ru: 'от 85 ₴', en: 'from 85 ₴' }] },
];

const MQ: T[] = [
  { uk: 'Murly' }, { uk: 'Уроки', ru: 'Уроки', en: 'Lessons' }, { uk: 'Домашка-гра', ru: 'Домашка-игра', en: 'Homework game' }, { uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' },
  { uk: 'Ігри', ru: 'Игры', en: 'Games' }, { uk: 'Слова', ru: 'Слова', en: 'Words' }, { uk: 'НМТ', ru: 'НМТ', en: 'NMT' },
];

const HOW: { n: string; icon: string; title: T; text: T }[] = [
  { n: '01', icon: 'd-team', title: { uk: 'Учитель створює кабінет', ru: 'Учитель создаёт кабинет', en: 'The teacher creates a dashboard' }, text: { uk: 'Додає учнів і надсилає кожному код або посилання.', ru: 'Добавляет учеников и отправляет каждому код или ссылку.', en: 'Adds students and sends each one a code or a link.' } },
  { n: '02', icon: 'd-kid', title: { uk: 'Учень приєднується', ru: 'Ученик присоединяется', en: 'The student joins' }, text: { uk: 'Вводить код, і в нього з’являються розклад, слова та домашка.', ru: 'Вводит код, и у него появляются расписание, слова и домашка.', en: 'Enters the code and gets a schedule, words and homework.' } },
  { n: '03', icon: 'e-pencil', title: { uk: 'Вчиться і грає', ru: 'Учится и играет', en: 'Learns and plays' }, text: { uk: 'Уроки, вправи й ігри з його словами. Перевірка одразу.', ru: 'Уроки, упражнения и игры с его словами. Проверка сразу.', en: 'Lessons, exercises and games with their words. Checked instantly.' } },
  { n: '04', icon: 'c-fish', title: { uk: 'Заробляє монетки', ru: 'Зарабатывает монетки', en: 'Earns coins' }, text: { uk: 'І витрачає їх у своєму містечку: нові кімнати, меблі, сад.', ru: 'И тратит их в своём городке: новые комнаты, мебель, сад.', en: 'And spends them in their town: new rooms, furniture, a garden.' } },
];

export default function HomePage() {
  const t = tr();
  return (
    <>
      <SiteNav />

      {/* HERO */}
      <section className="mu-hero mu-hero--home" data-stickers="8">
        <div className="mu-container mu-hero__inner">
          <MurlyCat className="kit-home mcat--left" skin="peach" greet={2600} hi="Let’s play!" />
          <MurlyCat className="kit-home" greet={1100} />
          {t.lang === 'ru' ? (
            <h1 className="mu-hero__title">Английский,<br />который <em>хочется</em><br />учить.</h1>
          ) : t.lang === 'en' ? (
            <h1 className="mu-hero__title">English<br />you actually<br /><em>want</em> to learn.</h1>
          ) : (
            <h1 className="mu-hero__title">Англійська,<br />яку <em>хочеться</em><br />вчити.</h1>
          )}
          <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
            <Link href="/#who" className="mu-btn mu-btn--lime mu-btn--lg">{t({ uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
          </div>
        </div>
      </section>
      <Marquee items={MQ.map((x) => t(x))} />

      {/* ЩО ТАКЕ MURLY */}
      <section className="mu-section mu-what" id="what" style={{ paddingTop: 32, paddingBottom: 16 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Що таке', ru: 'Что такое', en: 'What is' })} <em>Murly?</em></h2>
            <p className="mu-section__lead">{t({ uk: 'Платформа англійської для дітей, підлітків і дорослих.', ru: 'Платформа английского для детей, подростков и взрослых.', en: 'An English platform for kids, teens and adults.' })}</p>
          </div>
          <div className="mu-cards mu-cards--4">
            {WHAT.map((w) => (
              <Link key={w.href} href={w.href} className={`mu-card mu-card--link ${w.mod}`}>
                <div className="mu-card__icon"><Icon id={w.icon} /></div>
                <h3 className="mu-card__title">{t(w.title)}</h3>
                <div className="mu-chips">{w.chips.map((c) => <span key={c.uk}>{t(c)}</span>)}</div>
                <span className="mu-card__more">{t(w.more)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ХТО ТИ */}
      <section className="mu-section" id="who" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Хто', ru: 'Кто', en: 'Who are' })} <em>{t({ uk: 'ти?', ru: 'ты?', en: 'you?' })}</em></h2>
          </div>
          <div className="mu-roles">
            {ROLES.map((r) => (
              <div key={r.id} id={r.id} className={`mu-role ${r.mod}`}>
                <span className="mu-role__ic"><Icon id={r.icon} /></span>
                <Kit id={r.kit} className="mu-role__kit" />
                <h3>{t(r.who)}</h3>
                <ul className="mu-ticks">{r.pts.map((x) => <li key={x.uk}>{t(x)}</li>)}</ul>
                <div className="mu-role__cta">
                  <Link href={r.main.href} className="mu-btn mu-btn--ink">{t(r.main.label)}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
                  <Link href={r.alt.href} className="mu-role__alt">{t(r.alt.label)}</Link>
                </div>
              </div>
            ))}
          </div>
          <div id="code" className="mu-join-wrap">
            <JoinCode />
          </div>
        </div>
      </section>

      <div className="mu-scallop" style={{ backgroundColor: 'var(--mu-tomato)' }} />

      {/* ЩО Є */}
      <section className="mu-section mu-section--tomato" id="features" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Що є в', ru: 'Что есть в', en: 'What’s in' })} <em>Murly.</em></h2>
          </div>
          <div className="mu-cards mu-cards--4">
            {FEATURES.map((f) => (
              <Link key={f.title.uk} href={f.href} className={`mu-card mu-card--link ${f.mod}`}>
                <div className="mu-card__icon"><Icon id={f.icon} /></div>
                <h3 className="mu-card__title">{t(f.title)}</h3>
                <div className="mu-chips">{f.chips.map((c) => <span key={c.uk}>{t(c)}</span>)}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mu-scallop mu-scallop--up" style={{ backgroundColor: 'var(--mu-tomato)' }} />

      {/* ЯК ЦЕ ПРАЦЮЄ */}
      <section className="mu-section" id="how" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Як це', ru: 'Как это', en: 'How it' })} <em>{t({ uk: 'працює.', ru: 'работает.', en: 'works.' })}</em></h2>
          </div>
          <div className="mu-steps">
            {HOW.map((s) => (
              <div key={s.n} className="mu-step">
                <span className="mu-step__ic"><Icon id={s.icon} /></span>
                <div className="mu-step__num">{s.n}</div>
                <h3 className="mu-step__title">{t(s.title)}</h3>
                <p className="mu-step__text">{t(s.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="mu-section" data-stickers="3" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <MurlyCat className="mu-cta-cat" skin="peach" />
            <h2>{t({ uk: 'Почни', ru: 'Начни', en: 'Start' })} <em>{t({ uk: 'безкоштовно', ru: 'бесплатно', en: 'for free' })}</em></h2>
            <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
              <Link href="/sign-up" className="mu-btn mu-btn--tomato mu-btn--lg">
                {t({ uk: 'Створити акаунт', ru: 'Создать аккаунт', en: 'Create an account' })}
                <span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
              </Link>
              <Link href="/grammar" className="mu-textlink">{t({ uk: 'Спробувати без реєстрації', ru: 'Попробовать без регистрации', en: 'Try without signing up' })}</Link>
            </div>
          </div>
        </div>
      </section>

      <Tour id="site" steps={SITE_TOUR} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
