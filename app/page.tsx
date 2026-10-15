import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import JoinCode from '@/components/JoinCode';

export const metadata: Metadata = {
  title: 'Murly: англійська для дітей, підлітків і дорослих',
  description: 'Уроки з учителем, домашка-гра, граматика простими словами, неправильні дієслова і 3D-містечко, де все англійською. Кабінети для вчителя й учня.',
  alternates: { canonical: '/' },
};

// Хто ти: три дороги з головної
const ROLES = [
  {
    id: 'students', icon: 'd-kid', mod: 'mu-role--lime', who: 'Я учень',
    text: 'Граматика, ігри зі словами і своє 3D-містечко. Учитель дав код? Введи його нижче.',
    main: { href: '/sign-up?role=student', label: 'Почати вчитися' },
    alt: { href: '/grammar', label: 'Спробувати без реєстрації' },
  },
  {
    id: 'teachers', icon: 'd-team', mod: 'mu-role--mustard', who: 'Я вчитель',
    text: 'Учні, розклад, 24 готові уроки по 60 хвилин, домашка з автоперевіркою і словник кожного учня.',
    main: { href: '/sign-up?role=teacher', label: 'Створити кабінет' },
    alt: { href: '/for-teachers', label: 'Що вміє кабінет' },
  },
  {
    id: 'parents', icon: 'd-heart', mod: 'mu-role--sky', who: 'Я з батьків',
    text: 'Як Murly допомагає дитині вчитися регулярно і з задоволенням, без сварок через уроки.',
    main: { href: '/for-parents', label: 'Для батьків' },
    alt: { href: '/pricing', label: 'Тарифи' },
  },
];

const FEATURES = [
  { icon: 'e-board', mod: 'mu-card--lime', title: 'Уроки на 60 хвилин', text: 'Готові уроки за рівнями й темами: розминка, нові слова, вправи, домашка.', href: '/for-teachers#lessons' },
  { icon: 'e-pencil', mod: 'mu-card--mustard', title: 'Домашка-гра', text: 'Вправи з автоперевіркою та ігри з учнівськими словами. Учитель бачить результат.', href: '/for-teachers#homework' },
  { icon: 'e-abc', mod: 'mu-card--sky', title: 'Граматика простими словами', text: 'Коротко, з прикладами і вправами. Можна без реєстрації.', href: '/grammar' },
  { icon: 'e-book', mod: '', title: 'Неправильні дієслова', text: 'Таблиця з озвучкою та ігри, щоб запам’ятати їх раз і назавжди.', href: '/irregular-verbs' },
  { icon: 'e-head', mod: 'mu-card--lime', title: 'Слухати і читати', text: 'Аудіо й тексти з питаннями. Тренує розуміння, а не зубріння.', href: '/practice' },
  { icon: 'd-rocket', mod: 'mu-card--ink', title: 'Murly Town', text: '3D-містечко: будуй дім, обирай героя і вчи англійську граючи.', href: '/worlds' },
  { icon: 'c-fish', mod: 'mu-card--mustard', title: 'Монетки за навчання', text: 'За домашку, слова і тести учень отримує монетки для своєї гри.', href: '/worlds' },
  { icon: 'e-trophy', mod: 'mu-card--sky', title: 'Підготовка до НМТ', text: 'Квізи у форматі іспиту для старшокласників.', href: '/nmt' },
];

const HOW = [
  { n: '01', icon: 'd-team', title: 'Учитель створює кабінет', text: 'Додає учнів і надсилає кожному код або посилання.' },
  { n: '02', icon: 'd-kid', title: 'Учень приєднується', text: 'Вводить код, і в нього з’являються розклад, слова та домашка.' },
  { n: '03', icon: 'e-pencil', title: 'Вчиться і грає', text: 'Уроки, вправи, ігри зі своїми словами. Усе перевіряється одразу.' },
  { n: '04', icon: 'c-fish', title: 'Заробляє монетки', text: 'І витрачає їх у своєму містечку: нові кімнати, меблі, сад.' },
];

export default function HomePage() {
  return (
    <>
      <SiteNav />

      {/* HERO */}
      <section className="mu-hero mu-hero--home" data-stickers="8">
        <div className="mu-container mu-hero__inner">
          <div className="mu-hero__badge">
            <Icon id="c-paw" className="mu-ic mu-ic--badge" />
            Для дітей, підлітків і дорослих
          </div>
          <h1 className="mu-hero__title">
            Англійська,
            <br />
            яку <em>хочеться</em>
            <br />вчити.
          </h1>
          <p className="mu-hero__lead">Уроки з учителем, домашка-гра, граматика простими словами і своє 3D-містечко, де все англійською.</p>
        </div>
      </section>

      {/* ХТО ТИ */}
      <section className="mu-section" id="who" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-arrow" />Почни тут</span>
            <h2 className="mu-section__title">Хто <em>ти?</em></h2>
            <p className="mu-section__lead">Обери свою дорогу. Усе інше Murly покаже сам.</p>
          </div>
          <div className="mu-roles">
            {ROLES.map((r) => (
              <div key={r.id} id={r.id} className={`mu-role ${r.mod}`}>
                <span className="mu-role__ic"><Icon id={r.icon} /></span>
                <h3>{r.who}</h3>
                <p>{r.text}</p>
                <div className="mu-role__cta">
                  <Link href={r.main.href} className="mu-btn mu-btn--ink">{r.main.label}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
                  <Link href={r.alt.href} className="mu-role__alt">{r.alt.label}</Link>
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
            <span className="mu-section__eyebrow mu-section__eyebrow--lime"><Icon id="d-spark" />Що є в Murly</span>
            <h2 className="mu-section__title">Усе для англійської в&nbsp;одному <em>місці.</em></h2>
            <p className="mu-section__lead">Для уроків з учителем і для того, щоб вчитися самому.</p>
          </div>
          <div className="mu-cards mu-cards--4">
            {FEATURES.map((f) => (
              <Link key={f.title} href={f.href} className={`mu-card mu-card--link ${f.mod}`}>
                <div className="mu-card__icon"><Icon id={f.icon} /></div>
                <h3 className="mu-card__title">{f.title}</h3>
                <p className="mu-card__text">{f.text}</p>
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
            <span className="mu-section__eyebrow"><Icon id="e-cap" />Як це працює</span>
            <h2 className="mu-section__title">Чотири кроки, і <em>поїхали.</em></h2>
            <p className="mu-section__lead">Учитель веде, учень вчиться і грає, батьки спокійні.</p>
          </div>
          <div className="mu-steps">
            {HOW.map((s) => (
              <div key={s.n} className="mu-step">
                <span className="mu-step__ic"><Icon id={s.icon} /></span>
                <div className="mu-step__num">{s.n}</div>
                <h3 className="mu-step__title">{s.title}</h3>
                <p className="mu-step__text">{s.text}</p>
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
            <span className="mu-band__txt"><b>Готуєшся до НМТ?</b><small>Квізи у форматі іспиту, граматика і читання для старшокласників.</small></span>
            <span className="mu-btn mu-btn--lime">До НМТ<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mu-section" data-stickers="3" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-speak" className="mu-ic mu-ic--cta" />
            <h2>Почни <em>безкоштовно</em></h2>
            <p>Граматика, дієслова і ігри відкриті без реєстрації. Кабінет створюється за хвилину.</p>
            <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
              <Link href="/sign-up" className="mu-btn mu-btn--tomato mu-btn--lg">
                Створити акаунт
                <span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
              </Link>
              <Link href="/grammar" className="mu-btn mu-btn--lg">Спробувати без реєстрації</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
