import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Murly для вчителів англійської: кабінет, уроки, домашка',
  description: 'Учні, розклад, 24 готові уроки по 60 хвилин, домашка з автоперевіркою, словник кожного учня, оплати і монетки для мотивації.',
  alternates: { canonical: '/for-teachers' },
};

const TOOLS = [
  { id: 'students', icon: 'd-team', mod: 'mu-card--lime', title: 'Учні', text: 'Рівень, ціна заняття, контакти учня й батьків. Кожному свій код-запрошення.' },
  { id: 'schedule', icon: 'e-cal', mod: 'mu-card--mustard', title: 'Розклад', text: 'Заняття на тиждень, посилання на Zoom чи Meet, нотатки до уроку.' },
  { id: 'lessons', icon: 'e-board', mod: 'mu-card--sky', title: 'Готові уроки', text: '24 уроки по 60 хвилин за рівнями й віком. Можна змінити під себе або зібрати свій.' },
  { id: 'homework', icon: 'e-pencil', mod: '', title: 'Домашка', text: 'Вправи з автоперевіркою, ігри зі словами учня і письмові завдання, які ти перевіряєш сам.' },
  { id: 'words', icon: 'e-book', mod: 'mu-card--lime', title: 'Словник учня', text: 'Слова з уроку одним кліком потрапляють у словник учня. Він повторює їх в іграх.' },
  { id: 'coins', icon: 'c-fish', mod: 'mu-card--ink', title: 'Монетки', text: 'Нараховуй монетки за урок, домашку, поведінку. Учень витрачає їх у Murly Town.' },
  { id: 'payments', icon: 'd-money', mod: 'mu-card--mustard', title: 'Оплати', text: 'Хто заплатив і за скільки уроків. Без таблиць і нотаток у телефоні.' },
  { id: 'practice', icon: 'e-head', mod: 'mu-card--sky', title: 'Граматика і практика', text: 'Правила, неправильні дієслова, listening і reading, щоб давати учням між уроками.' },
];

const STEPS = [
  { n: '01', icon: 'd-team', title: 'Створи кабінет', text: 'Реєстрація за хвилину. Додай учнів: ім’я, рівень, ціна.' },
  { n: '02', icon: 'd-send', title: 'Надішли код', text: 'У кожного учня свій код або посилання. Він вводить його і бачить свій кабінет.' },
  { n: '03', icon: 'e-board', title: 'Проведи урок', text: 'Відкрий готовий урок на 60 хвилин або свій. Нові слова одразу в словник учня.' },
  { n: '04', icon: 'e-pencil', title: 'Задай домашку', text: 'Учень робить її в кабінеті, вправи перевіряються самі, ти бачиш результат.' },
];

const FAQ = [
  { q: 'Чи можна вести дітей і дорослих?', a: 'Так. Уроки розбиті за рівнями й віком: діти, підлітки, дорослі, а також підготовка до НМТ.' },
  { q: 'Чи можна додавати свої уроки й завдання?', a: 'Так. Є конструктор уроків: тексти, вправи, аудіо, відео. Готовий урок з бібліотеки теж можна змінити під себе.' },
  { q: 'Що бачить учень?', a: 'Свій розклад, домашку, словник від тебе, ігри зі своїми словами і монетки. Усе просто, щоб розібралася навіть дитина.' },
  { q: 'Скільки коштує?', a: 'Почати можна безкоштовно. Ціни на тарифи дивись на сторінці «Тарифи».' },
];

export default function ForTeachersPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-team" />Для вчителів</span>
          <h1>Усе для уроків англійської <em>в одному кабінеті.</em></h1>
          <p>Учні, розклад, готові уроки, домашка з автоперевіркою і словник кожного учня. Менше рутини, більше часу на саме навчання.</p>
          <div className="mu-hero__cta">
            <Link href="/sign-up?role=teacher" className="mu-btn mu-btn--lime mu-btn--lg">
              Створити кабінет<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
            <a href="#how" className="mu-btn mu-btn--lg">Як це працює</a>
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-cards mu-cards--4">
            {TOOLS.map((t) => (
              <div key={t.id} id={t.id} className={`mu-card ${t.mod}`} style={{ scrollMarginTop: 110 }}>
                <div className="mu-card__icon"><Icon id={t.icon} /></div>
                <h3 className="mu-card__title">{t.title}</h3>
                <p className="mu-card__text">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section" id="how" data-stickers="4" style={{ scrollMarginTop: 90 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-cal" />Як це працює</span>
            <h2 className="mu-section__title">Чотири <em>кроки.</em></h2>
          </div>
          <div className="mu-steps">
            {STEPS.map((s) => (
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

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />Питання</span>
            <h2 className="mu-section__title">Питання <em>вчителів.</em></h2>
          </div>
          <Faq items={FAQ} />
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/sign-up?role=teacher" className="mu-btn mu-btn--tomato mu-btn--lg">
              Почати безкоштовно<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
