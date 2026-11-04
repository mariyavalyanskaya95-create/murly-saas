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
    title: t({ uk: 'Murly для вчителів англійської: кабінет, уроки, домашка', ru: 'Murly для учителей английского: кабинет, уроки, домашка', en: 'Murly for English teachers: dashboard, lessons, homework' }),
    description: t({
      uk: 'Учні, розклад, 100+ готових уроків по 60 хвилин, домашка з автоперевіркою, словник кожного учня, оплати і монетки для мотивації.',
      ru: 'Ученики, расписание, 100+ готовых уроков по 60 минут, домашка с автопроверкой, словарь каждого ученика, оплаты и монетки для мотивации.',
      en: 'Students, schedule, 100+ ready-made 60-minute lessons, auto-checked homework, a word list for every student, payments and coins for motivation.',
    }),
    alternates: alt('/for-teachers'),
  };
}

// Три групи замість 12 карток: що є в кабінеті вчителя
const GROUPS: { id: string; icon: string; title: T; pts: T[] }[] = [
  { id: 'students', icon: 'd-team', title: { uk: 'Учні й розклад', ru: 'Ученики и расписание', en: 'Students and schedule' }, pts: [
    { uk: 'Картка учня, нотатки, дні народження', ru: 'Карточка ученика, заметки, дни рождения', en: 'Student card, notes, birthdays' },
    { uk: 'Розклад і посилання на Zoom або Meet', ru: 'Расписание и ссылки на Zoom или Meet', en: 'Schedule with Zoom or Meet links' },
    { uk: 'Оплати без таблиць', ru: 'Оплаты без таблиц', en: 'Payments without spreadsheets' },
    { uk: 'Telegram-бот для вас, учнів і батьків', ru: 'Telegram-бот для вас, учеников и родителей', en: 'Telegram bot for you, students and parents' },
  ] },
  { id: 'lessons', icon: 'e-board', title: { uk: 'Уроки', ru: 'Уроки', en: 'Lessons' }, pts: [
    { uk: '100+ готових уроків на 60 хвилин', ru: '100+ готовых уроков на 60 минут', en: '100+ ready 60-minute lessons' },
    { uk: 'Уроки за іграми: Minecraft, Roblox та інші', ru: 'Уроки по играм: Minecraft, Roblox и другие', en: 'Game lessons: Minecraft, Roblox and more' },
    { uk: 'Конструктор своїх уроків', ru: 'Конструктор своих уроков', en: 'Your own lesson builder' },
    { uk: 'Розмовні activities і дошка', ru: 'Разговорные activities и доска', en: 'Speaking activities and a whiteboard' },
  ] },
  { id: 'homework', icon: 'e-pencil', title: { uk: 'Домашка й мотивація', ru: 'Домашка и мотивация', en: 'Homework and motivation' }, pts: [
    { uk: 'Вправи з автоперевіркою', ru: 'Упражнения с автопроверкой', en: 'Auto-checked exercises' },
    { uk: 'Словник учня та ігри з його словами', ru: 'Словарь ученика и игры с его словами', en: 'Student word list and games with it' },
    { uk: 'XP і монетки для дітей', ru: 'XP и монетки для детей', en: 'XP and coins for kids' },
    { uk: 'Сторінка успіхів для батьків', ru: 'Страница успехов для родителей', en: 'A progress page for parents' },
  ] },
];

const STEPS: { n: string; icon: string; title: T; text: T }[] = [
  { n: '01', icon: 'd-team', title: { uk: 'Створи кабінет', ru: 'Создай кабинет', en: 'Create a dashboard' }, text: { uk: 'Реєстрація за хвилину. Додай учнів: ім’я, рівень, ціна.', ru: 'Регистрация за минуту. Добавь учеников: имя, уровень, цена.', en: 'Sign up in a minute. Add students: name, level, price.' } },
  { n: '02', icon: 'd-send', title: { uk: 'Надішли код', ru: 'Отправь код', en: 'Send the code' }, text: { uk: 'У кожного учня свій код або посилання. Він вводить його і бачить свій кабінет.', ru: 'У каждого ученика свой код или ссылка. Он вводит его и видит свой кабинет.', en: 'Each student has their own code or link. They enter it and see their dashboard.' } },
  { n: '03', icon: 'e-board', title: { uk: 'Проведи урок', ru: 'Проведи урок', en: 'Teach the lesson' }, text: { uk: 'Відкрий готовий урок на 60 хвилин або свій. Нові слова одразу в словник учня.', ru: 'Открой готовый урок на 60 минут или свой. Новые слова сразу в словарь ученика.', en: 'Open a ready 60-minute lesson or your own. New words go straight into the student’s word list.' } },
  { n: '04', icon: 'e-pencil', title: { uk: 'Задай домашку', ru: 'Задай домашку', en: 'Set homework' }, text: { uk: 'Учень робить її в кабінеті, вправи перевіряються самі, ти бачиш результат.', ru: 'Ученик делает её в кабинете, упражнения проверяются сами, ты видишь результат.', en: 'The student does it in their dashboard, exercises are checked automatically, you see the results.' } },
];

const FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Чи можна вести дітей і дорослих?', ru: 'Можно ли вести детей и взрослых?', en: 'Can I teach both kids and adults?' }, a: { uk: 'Так. Уроки розбиті за рівнями й віком: діти, підлітки, дорослі, а також підготовка до НМТ.', ru: 'Да. Уроки разбиты по уровням и возрасту: дети, подростки, взрослые, а также подготовка к НМТ.', en: 'Yes. Lessons are sorted by level and age: kids, teens, adults, plus NMT (Ukrainian school exam) prep.' } },
  { q: { uk: 'Чи можна додавати свої уроки й завдання?', ru: 'Можно ли добавлять свои уроки и задания?', en: 'Can I add my own lessons and tasks?' }, a: { uk: 'Так. Є конструктор уроків: тексти, вправи, аудіо, відео. Готовий урок з бібліотеки теж можна змінити під себе.', ru: 'Да. Есть конструктор уроков: тексты, упражнения, аудио, видео. Готовый урок из библиотеки тоже можно изменить под себя.', en: 'Yes. There is a lesson builder: texts, exercises, audio, video. You can also adapt any ready lesson from the library.' } },
  { q: { uk: 'Що бачить учень?', ru: 'Что видит ученик?', en: 'What does the student see?' }, a: { uk: 'Свій розклад, домашку, словник від тебе, ігри зі своїми словами і монетки. Усе просто, щоб розібралася навіть дитина.', ru: 'Своё расписание, домашку, словарь от тебя, игры со своими словами и монетки. Всё просто, чтобы разобрался даже ребёнок.', en: 'Their schedule, homework, the word list from you, games with their words and coins. Simple enough for a child to figure out.' } },
  { q: { uk: 'Скільки коштує?', ru: 'Сколько стоит?', en: 'How much does it cost?' }, a: { uk: 'Почати можна безкоштовно. Ціни на тарифи дивись на сторінці «Тарифи».', ru: 'Начать можно бесплатно. Цены на тарифы смотри на странице «Тарифы».', en: 'You can start for free. See the plan prices on the “Pricing” page.' } },
];

export default function ForTeachersPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id="il-cat-teacher" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="d-team" />{t({ uk: 'Для вчителів', ru: 'Для учителей', en: 'For teachers' })}</span>
          <h1>{t({ uk: 'Усе для уроків англійської', ru: 'Всё для уроков английского', en: 'Everything for English lessons' })} <em>{t({ uk: 'в одному кабінеті.', ru: 'в одном кабинете.', en: 'in one dashboard.' })}</em></h1>
          <div className="mu-hero__cta">
            <Link href="/sign-up?role=teacher" className="mu-btn mu-btn--lime mu-btn--lg">
              {t({ uk: 'Створити кабінет', ru: 'Создать кабинет', en: 'Create a dashboard' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
            <a href="#how" className="mu-textlink">{t({ uk: 'Як це працює', ru: 'Как это работает', en: 'How it works' })}</a>
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-cards">
            {GROUPS.map((g) => (
              <div key={g.id} id={g.id} className="mu-card" style={{ scrollMarginTop: 110 }}>
                <div className="mu-card__icon"><Icon id={g.icon} /></div>
                <h3 className="mu-card__title">{t(g.title)}</h3>
                <ul className="mu-ticks">{g.pts.map((x) => <li key={x.uk}>{t(x)}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="mu-hero__note" style={{ textAlign: 'center', marginTop: 28 }}><Link href="/pricing/pro">{t({ uk: 'Перший місяць Pro безкоштовно. Що входить і скільки коштує', ru: 'Первый месяц Pro бесплатно. Что входит и сколько стоит', en: 'First month of Pro free. What’s included and the price' })}</Link></p>
        </div>
      </section>

      <section className="mu-section" id="how" data-stickers="4" style={{ scrollMarginTop: 90 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-cal" />{t({ uk: 'Як це працює', ru: 'Как это работает', en: 'How it works' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Чотири', ru: 'Четыре', en: 'Four' })} <em>{t({ uk: 'кроки.', ru: 'шага.', en: 'steps.' })}</em></h2>
          </div>
          <div className="mu-steps">
            {STEPS.map((s) => (
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

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />{t({ uk: 'Питання', ru: 'Вопросы', en: 'Questions' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Питання', ru: 'Вопросы', en: 'Teacher' })} <em>{t({ uk: 'вчителів.', ru: 'учителей.', en: 'questions.' })}</em></h2>
          </div>
          <Faq items={FAQ.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/sign-up?role=teacher" className="mu-btn mu-btn--tomato mu-btn--lg">
              {t({ uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' })}<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <RelatedPosts slugs={['igry-dlya-onlajn-uroku-anglijskoyi', 'temy-dlya-rozmovy-anglijskoyu', 'skilky-braty-za-urok-repetytoru-2026']} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
