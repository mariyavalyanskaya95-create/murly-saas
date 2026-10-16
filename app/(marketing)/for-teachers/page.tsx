import Link from 'next/link';
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
      uk: 'Учні, розклад, 24 готові уроки по 60 хвилин, домашка з автоперевіркою, словник кожного учня, оплати і монетки для мотивації.',
      ru: 'Ученики, расписание, 24 готовых урока по 60 минут, домашка с автопроверкой, словарь каждого ученика, оплаты и монетки для мотивации.',
      en: 'Students, schedule, 24 ready-made 60-minute lessons, auto-checked homework, a word list for every student, payments and coins for motivation.',
    }),
    alternates: { canonical: '/for-teachers' },
  };
}

const TOOLS: { id: string; icon: string; mod: string; title: T; text: T }[] = [
  { id: 'students', icon: 'd-team', mod: 'mu-card--lime', title: { uk: 'Учні', ru: 'Ученики', en: 'Students' }, text: { uk: 'Рівень, ціна заняття, контакти учня й батьків. Кожному свій код-запрошення.', ru: 'Уровень, цена занятия, контакты ученика и родителей. У каждого свой код-приглашение.', en: 'Level, lesson price, student and parent contacts. Each student gets their own invite code.' } },
  { id: 'schedule', icon: 'e-cal', mod: 'mu-card--mustard', title: { uk: 'Розклад', ru: 'Расписание', en: 'Schedule' }, text: { uk: 'Заняття на тиждень, посилання на Zoom чи Meet, нотатки до уроку.', ru: 'Занятия на неделю, ссылки на Zoom или Meet, заметки к уроку.', en: 'Lessons for the week, Zoom or Meet links, lesson notes.' } },
  { id: 'lessons', icon: 'e-board', mod: 'mu-card--sky', title: { uk: 'Готові уроки', ru: 'Готовые уроки', en: 'Ready-made lessons' }, text: { uk: '24 уроки по 60 хвилин за рівнями й віком. Можна змінити під себе або зібрати свій.', ru: '24 урока по 60 минут по уровням и возрасту. Можно изменить под себя или собрать свой.', en: '24 lessons of 60 minutes by level and age. Adapt them or build your own.' } },
  { id: 'homework', icon: 'e-pencil', mod: '', title: { uk: 'Домашка', ru: 'Домашка', en: 'Homework' }, text: { uk: 'Вправи з автоперевіркою, ігри зі словами учня і письмові завдання, які ти перевіряєш сам.', ru: 'Упражнения с автопроверкой, игры со словами ученика и письменные задания, которые ты проверяешь сам.', en: 'Auto-checked exercises, games with the student’s words and writing tasks you check yourself.' } },
  { id: 'words', icon: 'e-book', mod: 'mu-card--lime', title: { uk: 'Словник учня', ru: 'Словарь ученика', en: 'Student word list' }, text: { uk: 'Слова з уроку одним кліком потрапляють у словник учня. Він повторює їх в іграх.', ru: 'Слова с урока одним кликом попадают в словарь ученика. Он повторяет их в играх.', en: 'Words from the lesson go into the student’s word list in one click. They practise them in games.' } },
  { id: 'coins', icon: 'c-fish', mod: 'mu-card--ink', title: { uk: 'Монетки', ru: 'Монетки', en: 'Coins' }, text: { uk: 'Нараховуй монетки за урок, домашку, поведінку. Учень витрачає їх у Murly Town.', ru: 'Начисляй монетки за урок, домашку, поведение. Ученик тратит их в Murly Town.', en: 'Give coins for lessons, homework, behaviour. Students spend them in Murly Town.' } },
  { id: 'payments', icon: 'd-money', mod: 'mu-card--mustard', title: { uk: 'Оплати', ru: 'Оплаты', en: 'Payments' }, text: { uk: 'Хто заплатив і за скільки уроків. Без таблиць і нотаток у телефоні.', ru: 'Кто заплатил и за сколько уроков. Без таблиц и заметок в телефоне.', en: 'Who paid and for how many lessons. No spreadsheets or notes on your phone.' } },
  { id: 'practice', icon: 'e-head', mod: 'mu-card--sky', title: { uk: 'Граматика і практика', ru: 'Грамматика и практика', en: 'Grammar and practice' }, text: { uk: 'Правила, неправильні дієслова, listening і reading, щоб давати учням між уроками.', ru: 'Правила, неправильные глаголы, listening и reading, чтобы давать ученикам между уроками.', en: 'Rules, irregular verbs, listening and reading to give students between lessons.' } },
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
          <p>{t({ uk: 'Учні, розклад, готові уроки, домашка з автоперевіркою і словник кожного учня. Менше рутини, більше часу на саме навчання.', ru: 'Ученики, расписание, готовые уроки, домашка с автопроверкой и словарь каждого ученика. Меньше рутины, больше времени на само обучение.', en: 'Students, schedule, ready-made lessons, auto-checked homework and a word list for every student. Less routine, more time for actual teaching.' })}</p>
          <div className="mu-hero__cta">
            <Link href="/sign-up?role=teacher" className="mu-btn mu-btn--lime mu-btn--lg">
              {t({ uk: 'Створити кабінет', ru: 'Создать кабинет', en: 'Create a dashboard' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
            <a href="#how" className="mu-btn mu-btn--lg">{t({ uk: 'Як це працює', ru: 'Как это работает', en: 'How it works' })}</a>
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-cards mu-cards--4">
            {TOOLS.map((tool) => (
              <div key={tool.id} id={tool.id} className={`mu-card ${tool.mod}`} style={{ scrollMarginTop: 110 }}>
                <div className="mu-card__icon"><Icon id={tool.icon} /></div>
                <h3 className="mu-card__title">{t(tool.title)}</h3>
                <p className="mu-card__text">{t(tool.text)}</p>
              </div>
            ))}
          </div>
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

      <SiteFooter />
      <Stickers />
    </>
  );
}
