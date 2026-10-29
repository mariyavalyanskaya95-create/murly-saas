import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import JoinCode from '@/components/JoinCode';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Murly: англійська, яку хочеться вчити', ru: 'Murly: английский, который хочется учить', en: 'Murly: English you actually want to learn' }),
    description: t({
      uk: 'Уроки з учителем, домашка-гра, граматика простими словами, неправильні дієслова і 3D-містечко, де все англійською. Кабінети для вчителя й учня.',
      ru: 'Уроки с учителем, домашка-игра, грамматика простыми словами, неправильные глаголы и 3D-городок, где всё на английском. Кабинеты для учителя и ученика.',
      en: 'Lessons with a teacher, homework as a game, simple grammar, irregular verbs and a 3D town where everything is in English. Dashboards for teachers and students.',
    }),
    alternates: { canonical: '/' },
  };
}

// Хто ти: три дороги з головної
const ROLES: { id: string; kit: string; icon: string; mod: string; who: T; text: T; main: { href: string; label: T }; alt: { href: string; label: T } }[] = [
  {
    id: 'students', kit: 'st-boy-backpack', icon: 'd-kid', mod: 'mu-role--lime',
    who: { uk: 'Я учень', ru: 'Я ученик', en: 'I’m a student' },
    text: { uk: 'Граматика, ігри зі словами і своє 3D-містечко. Учитель дав код? Введи його нижче.', ru: 'Грамматика, игры со словами и свой 3D-городок. Учитель дал код? Введи его ниже.', en: 'Grammar, word games and your own 3D town. Got a code from your teacher? Enter it below.' },
    main: { href: '/sign-up?role=student', label: { uk: 'Почати вчитися', ru: 'Начать учиться', en: 'Start learning' } },
    alt: { href: '/grammar', label: { uk: 'Спробувати без реєстрації', ru: 'Попробовать без регистрации', en: 'Try without signing up' } },
  },
  {
    id: 'teachers', kit: 'st-cat-coffee', icon: 'd-team', mod: 'mu-role--mustard',
    who: { uk: 'Я вчитель', ru: 'Я учитель', en: 'I’m a teacher' },
    text: { uk: 'Учні, розклад, 24 готові уроки по 60 хвилин, домашка з автоперевіркою і словник кожного учня.', ru: 'Ученики, расписание, 24 готовых урока по 60 минут, домашка с автопроверкой и словарь каждого ученика.', en: 'Students, schedule, 24 ready-made 60-minute lessons, auto-checked homework and a word list for every student.' },
    main: { href: '/sign-up?role=teacher', label: { uk: 'Створити кабінет', ru: 'Создать кабинет', en: 'Create a dashboard' } },
    alt: { href: '/for-teachers', label: { uk: 'Що вміє кабінет', ru: 'Что умеет кабинет', en: 'What it can do' } },
  },
  {
    id: 'parents', kit: 'st-cat-heart', icon: 'd-heart', mod: 'mu-role--sky',
    who: { uk: 'Я з батьків', ru: 'Я родитель', en: 'I’m a parent' },
    text: { uk: 'Як Murly допомагає дитині вчитися регулярно і з задоволенням, без сварок через уроки.', ru: 'Как Murly помогает ребёнку учиться регулярно и с удовольствием, без ссор из-за уроков.', en: 'How Murly helps your child learn regularly and happily, without fights over homework.' },
    main: { href: '/for-parents', label: { uk: 'Для батьків', ru: 'Для родителей', en: 'For parents' } },
    alt: { href: '/pricing', label: { uk: 'Тарифи', ru: 'Тарифы', en: 'Pricing' } },
  },
];

const FEATURES: { icon: string; mod: string; title: T; text: T; href: string }[] = [
  { icon: 'e-board', mod: 'mu-card--lime', href: '/lessons', title: { uk: 'Уроки на 60 хвилин', ru: 'Уроки на 60 минут', en: '60-minute lessons' }, text: { uk: 'Готові уроки за рівнями й темами: розминка, нові слова, вправи, домашка.', ru: 'Готовые уроки по уровням и темам: разминка, новые слова, упражнения, домашка.', en: 'Ready lessons by level and topic: warm-up, new words, exercises, homework.' } },
  { icon: 'e-pencil', mod: 'mu-card--mustard', href: '/for-teachers#homework', title: { uk: 'Домашка-гра', ru: 'Домашка-игра', en: 'Homework as a game' }, text: { uk: 'Вправи з автоперевіркою та ігри з учнівськими словами. Учитель бачить результат.', ru: 'Упражнения с автопроверкой и игры со словами ученика. Учитель видит результат.', en: 'Auto-checked exercises and games with the student’s own words. The teacher sees the results.' } },
  { icon: 'e-abc', mod: 'mu-card--sky', href: '/grammar', title: { uk: 'Граматика простими словами', ru: 'Грамматика простыми словами', en: 'Grammar made simple' }, text: { uk: 'Коротко, з прикладами і вправами. Можна без реєстрації.', ru: 'Коротко, с примерами и упражнениями. Можно без регистрации.', en: 'Short, with examples and exercises. No sign-up needed.' } },
  { icon: 'e-book', mod: '', href: '/irregular-verbs', title: { uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' }, text: { uk: 'Таблиця з озвучкою та ігри, щоб запам’ятати їх раз і назавжди.', ru: 'Таблица с озвучкой и игры, чтобы запомнить их раз и навсегда.', en: 'A table with audio and games to remember them once and for all.' } },
  { icon: 'e-head', mod: 'mu-card--lime', href: '/practice', title: { uk: 'Слухати і читати', ru: 'Слушать и читать', en: 'Listening and reading' }, text: { uk: 'Аудіо й тексти з питаннями. Тренує розуміння, а не зубріння.', ru: 'Аудио и тексты с вопросами. Тренирует понимание, а не зубрёжку.', en: 'Audio and texts with questions. Builds understanding, not cramming.' } },
  { icon: 'd-rocket', mod: 'mu-card--ink', href: '/games', title: { uk: 'Ігри', ru: 'Игры', en: 'Games' }, text: { uk: '3D-містечко Murly Town, ігри з дієсловами, квізи і скоромовки.', ru: '3D-городок Murly Town, игры с глаголами, квизы и скороговорки.', en: 'Murly Town in 3D, verb games, quizzes and tongue twisters.' } },
  { icon: 'c-fish', mod: 'mu-card--mustard', href: '/play/town', title: { uk: 'Монетки за навчання', ru: 'Монетки за учёбу', en: 'Coins for learning' }, text: { uk: 'За домашку, слова і тести учень отримує монетки для своєї гри.', ru: 'За домашку, слова и тесты ученик получает монетки для своей игры.', en: 'Homework, words and tests earn coins to spend in the game.' } },
  { icon: 'e-trophy', mod: 'mu-card--sky', href: '/nmt', title: { uk: 'Підготовка до НМТ', ru: 'Подготовка к НМТ', en: 'NMT exam prep' }, text: { uk: 'Квізи у форматі іспиту для старшокласників.', ru: 'Квизы в формате экзамена для старшеклассников.', en: 'Quizzes in the format of the Ukrainian school exam.' } },
];

const HOW: { n: string; icon: string; title: T; text: T }[] = [
  { n: '01', icon: 'd-team', title: { uk: 'Учитель створює кабінет', ru: 'Учитель создаёт кабинет', en: 'The teacher creates a dashboard' }, text: { uk: 'Додає учнів і надсилає кожному код або посилання.', ru: 'Добавляет учеников и отправляет каждому код или ссылку.', en: 'Adds students and sends each one a code or a link.' } },
  { n: '02', icon: 'd-kid', title: { uk: 'Учень приєднується', ru: 'Ученик присоединяется', en: 'The student joins' }, text: { uk: 'Вводить код, і в нього з’являються розклад, слова та домашка.', ru: 'Вводит код, и у него появляются расписание, слова и домашка.', en: 'Enters the code and gets a schedule, words and homework.' } },
  { n: '03', icon: 'e-pencil', title: { uk: 'Вчиться і грає', ru: 'Учится и играет', en: 'Learns and plays' }, text: { uk: 'Уроки, вправи, ігри зі своїми словами. Усе перевіряється одразу.', ru: 'Уроки, упражнения, игры со своими словами. Всё проверяется сразу.', en: 'Lessons, exercises, games with their own words. Everything is checked instantly.' } },
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
          <Kit id="st-girl-bow" className="kit-home kit-home--l" />
          <Kit id="st-boy-cap" className="kit-home kit-home--r" />
          <div className="mu-hero__badge">
            <Icon id="c-paw" className="mu-ic mu-ic--badge" />
            {t({ uk: 'Для дітей, підлітків і дорослих', ru: 'Для детей, подростков и взрослых', en: 'For kids, teens and adults' })}
          </div>
          {t.lang === 'ru' ? (
            <h1 className="mu-hero__title">Английский,<br />который <em>хочется</em><br />учить.</h1>
          ) : t.lang === 'en' ? (
            <h1 className="mu-hero__title">English<br />you actually<br /><em>want</em> to learn.</h1>
          ) : (
            <h1 className="mu-hero__title">Англійська,<br />яку <em>хочеться</em><br />вчити.</h1>
          )}
          <p className="mu-hero__lead">{t({
            uk: 'Уроки з учителем, домашка-гра, граматика простими словами і своє 3D-містечко, де все англійською.',
            ru: 'Уроки с учителем, домашка-игра, грамматика простыми словами и свой 3D-городок, где всё на английском.',
            en: 'Lessons with a teacher, homework as a game, simple grammar and your own 3D town where everything is in English.',
          })}</p>
          <div className="mu-hero__cta">
            <Link href="/#who" className="mu-btn mu-btn--ink mu-btn--lg">{t({ uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
            <Link href="/#code" className="mu-btn mu-btn--lg">{t({ uk: 'У мене є код від учителя', ru: 'У меня есть код от учителя', en: 'I have a teacher code' })}</Link>
          </div>
        </div>
      </section>

      {/* ХТО ТИ */}
      <section className="mu-section" id="who" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-arrow" />{t({ uk: 'Почни тут', ru: 'Начни здесь', en: 'Start here' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Хто', ru: 'Кто', en: 'Who are' })} <em>{t({ uk: 'ти?', ru: 'ты?', en: 'you?' })}</em></h2>
            <p className="mu-section__lead">{t({ uk: 'Обери свою дорогу. Усе інше Murly покаже сам.', ru: 'Выбери свою дорогу. Всё остальное Murly покажет сам.', en: 'Pick your path. Murly will show you the rest.' })}</p>
          </div>
          <div className="mu-roles">
            {ROLES.map((r) => (
              <div key={r.id} id={r.id} className={`mu-role ${r.mod}`}>
                <span className="mu-role__ic"><Icon id={r.icon} /></span>
                <Kit id={r.kit} className="mu-role__kit" />
                <h3>{t(r.who)}</h3>
                <p>{t(r.text)}</p>
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
            <span className="mu-section__eyebrow mu-section__eyebrow--lime"><Icon id="d-spark" />{t({ uk: 'Що є в Murly', ru: 'Что есть в Murly', en: 'What’s inside Murly' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Усе для англійської в одному', ru: 'Всё для английского в одном', en: 'Everything for English in one' })} <em>{t({ uk: 'місці.', ru: 'месте.', en: 'place.' })}</em></h2>
            <p className="mu-section__lead">{t({ uk: 'Для уроків з учителем і для того, щоб вчитися самому.', ru: 'Для уроков с учителем и для того, чтобы учиться самому.', en: 'For lessons with a teacher and for learning on your own.' })}</p>
          </div>
          <div className="mu-cards mu-cards--4">
            {FEATURES.map((f) => (
              <Link key={f.title.uk} href={f.href} className={`mu-card mu-card--link ${f.mod}`}>
                <div className="mu-card__icon"><Icon id={f.icon} /></div>
                <h3 className="mu-card__title">{t(f.title)}</h3>
                <p className="mu-card__text">{t(f.text)}</p>
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
            <span className="mu-section__eyebrow"><Icon id="e-cap" />{t({ uk: 'Як це працює', ru: 'Как это работает', en: 'How it works' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Чотири кроки, і', ru: 'Четыре шага, и', en: 'Four steps and' })} <em>{t({ uk: 'поїхали.', ru: 'поехали.', en: 'off you go.' })}</em></h2>
            <p className="mu-section__lead">{t({ uk: 'Учитель веде, учень вчиться і грає, батьки спокійні.', ru: 'Учитель ведёт, ученик учится и играет, родители спокойны.', en: 'The teacher leads, the student learns and plays, parents relax.' })}</p>
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

      {/* НМТ */}
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <Link href="/nmt" className="mu-band">
            <span className="mu-band__ic"><Icon id="e-trophy" /></span>
            <span className="mu-band__txt">
              <b>{t({ uk: 'Готуєшся до НМТ?', ru: 'Готовишься к НМТ?', en: 'Preparing for the NMT?' })}</b>
              <small>{t({ uk: 'Квізи у форматі іспиту, граматика і читання для старшокласників.', ru: 'Квизы в формате экзамена, грамматика и чтение для старшеклассников.', en: 'Exam-style quizzes, grammar and reading for high-school students.' })}</small>
            </span>
            <span className="mu-btn mu-btn--lime">{t({ uk: 'До НМТ', ru: 'К НМТ', en: 'NMT prep' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mu-section" data-stickers="3" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-speak" className="mu-ic mu-ic--cta" />
            <h2>{t({ uk: 'Почни', ru: 'Начни', en: 'Start' })} <em>{t({ uk: 'безкоштовно', ru: 'бесплатно', en: 'for free' })}</em></h2>
            <p>{t({ uk: 'Граматика, дієслова і ігри відкриті без реєстрації. Кабінет створюється за хвилину.', ru: 'Грамматика, глаголы и игры открыты без регистрации. Кабинет создаётся за минуту.', en: 'Grammar, verbs and games are open without signing up. A dashboard takes a minute to create.' })}</p>
            <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
              <Link href="/sign-up" className="mu-btn mu-btn--tomato mu-btn--lg">
                {t({ uk: 'Створити акаунт', ru: 'Создать аккаунт', en: 'Create an account' })}
                <span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
              </Link>
              <Link href="/grammar" className="mu-btn mu-btn--lg">{t({ uk: 'Спробувати без реєстрації', ru: 'Попробовать без регистрации', en: 'Try without signing up' })}</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
