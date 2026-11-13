import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Marquee from '@/components/Marquee';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import { alt } from '@/lib/seo';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Про Murly: безкоштовна платформа для вивчення й викладання англійської', ru: 'О Murly: бесплатная платформа для изучения и преподавания английского', en: 'About Murly: a free platform to learn and teach English' }),
    description: t({
      uk: 'Усе для англійської в одному місці: розклад, кабінети учнів, домашка, онлайн-дошка, Telegram-бот з нагадуваннями, оплати, готові уроки, пісні, ігри й підготовка до НМТ з пробними тестами. Безкоштовно для нових користувачів.',
      ru: 'Всё для английского в одном месте: расписание, кабинеты учеников, домашка, онлайн-доска, Telegram-бот с напоминаниями, оплаты, готовые уроки, песни, игры и подготовка к НМТ с пробными тестами. Бесплатно для новых пользователей.',
      en: 'Everything for English in one place: schedule, student dashboards, homework, online whiteboard, Telegram bot reminders, payments, ready lessons, songs, games and NMT prep with mock tests. Free for new users.',
    }),
    alternates: alt('/about'),
  };
}

type Item = { icon: string; title: T; text: T; href?: string };

// Для вчителя: усе, що зазвичай розкидано по різних сервісах
const TEACHER: Item[] = [
  { icon: 'e-cal', title: { uk: 'Розклад', ru: 'Расписание', en: 'Schedule' }, text: { uk: 'Тиждень сіткою, перенесення перетягуванням, копії уроків, примітки й тривалість. Учні з інших країн бачать свій час.', ru: 'Неделя сеткой, перенос перетаскиванием, копии уроков, примечания и длительность. Ученики из других стран видят своё время.', en: 'A weekly grid, drag to reschedule, copy lessons, notes and length. Students abroad see their own time.' } },
  { icon: 'd-team', title: { uk: 'Кабінети учнів', ru: 'Кабинеты учеников', en: 'Student dashboards' }, text: { uk: 'У кожного учня свій кабінет: уроки, домашка, словник, прогрес. Вхід за номером телефону і PIN, без пошти.', ru: 'У каждого ученика свой кабинет: уроки, домашка, словарь, прогресс. Вход по номеру телефона и PIN, без почты.', en: 'Each student gets a dashboard: lessons, homework, vocabulary, progress. Log in with a phone number and PIN.' } },
  { icon: 'e-pencil', title: { uk: 'Домашні завдання', ru: 'Домашние задания', en: 'Homework' }, text: { uk: 'Ігри зі словника учня, письмові завдання, вправи з автоперевіркою. Ти бачиш, хто що здав, і перевіряєш в один клік.', ru: 'Игры из словаря ученика, письменные задания, упражнения с автопроверкой. Ты видишь, кто что сдал, и проверяешь в один клик.', en: 'Games from the student’s vocabulary, writing tasks, self-checking exercises. See who handed in what and check in one click.' } },
  { icon: 'e-board', title: { uk: 'Онлайн-дошка', ru: 'Онлайн-доска', en: 'Online whiteboard' }, text: { uk: 'Окрема дошка для кожного учня: пиши, малюй, вставляй картинки й створюй уроки. Усе зберігається.', ru: 'Отдельная доска для каждого ученика: пиши, рисуй, вставляй картинки и создавай уроки. Всё сохраняется.', en: 'A board for every student: write, draw, add pictures and build lessons. Everything is saved.' } },
  { icon: 'e-book', title: { uk: 'Готові уроки й конструктор', ru: 'Готовые уроки и конструктор', en: 'Ready lessons and a builder' }, text: { uk: 'Бібліотека уроків за рівнем і віком, уроки за іграми й піснями, конструктор власних уроків та ігор.', ru: 'Библиотека уроков по уровню и возрасту, уроки по играм и песням, конструктор своих уроков и игр.', en: 'A lesson library by level and age, game and song lessons, and a builder for your own lessons and games.' }, href: '/lessons' },
  { icon: 'd-send', title: { uk: 'Telegram-бот', ru: 'Telegram-бот', en: 'Telegram bot' }, text: { uk: 'Нагадує учням про урок і домашку в їхньому часовому поясі, тобі присилає здані домашки, розклад і оплати. Батькам теж.', ru: 'Напоминает ученикам об уроке и домашке в их часовом поясе, тебе присылает сданные домашки, расписание и оплаты. Родителям тоже.', en: 'Reminds students of lessons and homework in their time zone, sends you handed-in homework, the schedule and payments. Parents too.' } },
  { icon: 'd-money', title: { uk: 'Оплати й нагадування', ru: 'Оплаты и напоминания', en: 'Payments and reminders' }, text: { uk: 'Облік оплат і боргів за кожним учнем, пропуски з оплатою, автоматичні нагадування про оплату занять.', ru: 'Учёт оплат и долгов по каждому ученику, пропуски с оплатой, автоматические напоминания об оплате занятий.', en: 'Track payments and balances per student, charged no-shows, automatic payment reminders.' } },
  { icon: 'e-head', title: { uk: 'Режим уроку', ru: 'Режим урока', en: 'Lesson mode' }, text: { uk: 'Показуєш екран, а учень не бачить твоїх цін, розкладу й відповідей. Відповіді, нотатки й перекладач лише в пульті вчителя.', ru: 'Показываешь экран, а ученик не видит твоих цен, расписания и ответов. Ответы, заметки и переводчик только в пульте учителя.', en: 'Share your screen while prices, schedule and answers stay hidden. Answers, notes and a translator live in the teacher remote.' } },
];

// Самостійно: що можна робити без учителя
const SELF: Item[] = [
  { icon: 'e-abc', title: { uk: 'Граматика простими словами', ru: 'Грамматика простыми словами', en: 'Grammar made simple' }, text: { uk: 'Короткі пояснення, приклади й вправи, які пояснюють кожну помилку.', ru: 'Короткие объяснения, примеры и упражнения, которые объясняют каждую ошибку.', en: 'Short explanations, examples and exercises that explain every mistake.' }, href: '/grammar' },
  { icon: 'e-speak', title: { uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' }, text: { uk: 'Таблиця з перекладом і озвучкою, ігри й постер для друку.', ru: 'Таблица с переводом и озвучкой, игры и постер для печати.', en: 'A table with translation and audio, games and a printable poster.' }, href: '/irregular-verbs' },
  { icon: 'e-mic', title: { uk: '60 розборів пісень', ru: '60 разборов песен', en: '60 song lessons' }, text: { uk: 'Офіційний кліп, фрази з перекладом, квіз і питання для розмови.', ru: 'Официальный клип, фразы с переводом, квиз и вопросы для разговора.', en: 'The official video, phrases explained, a quiz and speaking questions.' }, href: '/songs' },
  { icon: 'e-trophy', title: { uk: 'Ігри', ru: 'Игры', en: 'Games' }, text: { uk: 'Боулінг, командна вікторина, квести з котиком і словникові ігри. XP, рівні й монетки.', ru: 'Боулинг, командная викторина, квесты с котиком и словарные игры. XP, уровни и монетки.', en: 'Bowling, a team quiz, cat quests and word games. XP, levels and coins.' }, href: '/games' },
  { icon: 'd-growth', title: { uk: 'Тест на рівень', ru: 'Тест на уровень', en: 'Level test' }, text: { uk: 'Дізнайся свій рівень від A1 до C1 і отримай план, з чого почати.', ru: 'Узнай свой уровень от A1 до C1 и получи план, с чего начать.', en: 'Find your level from A1 to C1 and get a plan to start.' }, href: '/level-test' },
  { icon: 'd-bulb', title: { uk: 'Словник з повторенням', ru: 'Словарь с повторением', en: 'Vocabulary with review' }, text: { uk: 'Додавай слова з уроків і пісень, система нагадає повторити їх вчасно.', ru: 'Добавляй слова из уроков и песен, система напомнит повторить их вовремя.', en: 'Save words from lessons and songs and review them at the right time.' } },
];

// НМТ
const NMT: Item[] = [
  { icon: 'e-cap', title: { uk: 'Самостійна підготовка', ru: 'Самостоятельная подготовка', en: 'Prepare on your own' }, text: { uk: 'Теми, граматика й лексика, які найчастіше трапляються на НМТ з англійської.', ru: 'Темы, грамматика и лексика, которые чаще всего встречаются на НМТ по английскому.', en: 'Topics, grammar and vocabulary that appear most often on the NMT.' }, href: '/nmt' },
  { icon: 'd-team', title: { uk: 'Підготовка з учителем', ru: 'Подготовка с учителем', en: 'Prepare with a teacher' }, text: { uk: 'Учитель задає варіанти й бачить результати кожного учня в кабінеті.', ru: 'Учитель задаёт варианты и видит результаты каждого ученика в кабинете.', en: 'The teacher assigns tests and sees each student’s results.' } },
  { icon: 'e-pencil', title: { uk: '20 пробних варіантів', ru: '20 пробных вариантов', en: '20 mock tests' }, text: { uk: 'Тести у форматі НМТ з підказками й поясненням кожної відповіді.', ru: 'Тесты в формате НМТ с подсказками и объяснением каждого ответа.', en: 'NMT-format tests with hints and an explanation for every answer.' }, href: '/nmt/mock' },
  { icon: 'd-growth', title: { uk: 'Калькулятор балів', ru: 'Калькулятор баллов', en: 'Score calculator' }, text: { uk: 'Переводить тестові бали у шкалу 100–200.', ru: 'Переводит тестовые баллы в шкалу 100–200.', en: 'Converts test points to the 100–200 scale.' }, href: '/nmt/calculator' },
];

const FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Murly справді безкоштовний?', ru: 'Murly правда бесплатный?', en: 'Is Murly really free?' }, a: { uk: 'Так, для нових користувачів Murly безкоштовний. Більшість матеріалів відкрита навіть без реєстрації: граматика, пісні, ігри, неправильні дієслова, тест на рівень.', ru: 'Да, для новых пользователей Murly бесплатный. Большинство материалов открыто даже без регистрации: грамматика, песни, игры, неправильные глаголы, тест на уровень.', en: 'Yes, Murly is free for new users. Most materials are open even without signing up: grammar, songs, games, irregular verbs and the level test.' } },
  { q: { uk: 'Я вчитель. Чим Murly заміняє інші сервіси?', ru: 'Я учитель. Чем Murly заменяет другие сервисы?', en: 'I teach. Which tools does Murly replace?' }, a: { uk: 'Розклад, кабінети учнів, домашку, онлайн-дошку, нагадування в Telegram, облік оплат і готові уроки. Усе в одному кабінеті, без десятка вкладок.', ru: 'Расписание, кабинеты учеников, домашку, онлайн-доску, напоминания в Telegram, учёт оплат и готовые уроки. Всё в одном кабинете, без десятка вкладок.', en: 'Scheduling, student dashboards, homework, a whiteboard, Telegram reminders, payment tracking and ready lessons. All in one dashboard.' } },
  { q: { uk: 'Як підключити своїх учнів?', ru: 'Как подключить своих учеников?', en: 'How do I add my students?' }, a: { uk: 'Додай учня в кабінеті вчителя і надішли йому запрошення. Учень входить за номером телефону і PIN-кодом.', ru: 'Добавь ученика в кабинете учителя и отправь ему приглашение. Ученик входит по номеру телефона и PIN-коду.', en: 'Add a student in your dashboard and send an invite. Students log in with a phone number and PIN.' } },
  { q: { uk: 'Чи можна вчитися самому, без учителя?', ru: 'Можно ли учиться самому, без учителя?', en: 'Can I learn on my own?' }, a: { uk: 'Так. Проходь тест на рівень, граматику, розбори пісень, ігри й пробні НМТ. Слова зберігаються у твій словник для повторення.', ru: 'Да. Проходи тест на уровень, грамматику, разборы песен, игры и пробные НМТ. Слова сохраняются в твой словарь для повторения.', en: 'Yes. Take the level test, grammar, song lessons, games and NMT mocks. Words go to your vocabulary for review.' } },
  { q: { uk: 'Якими мовами працює сайт?', ru: 'На каких языках работает сайт?', en: 'Which languages does the site support?' }, a: { uk: 'Українською, російською та англійською. Мову можна змінити вгорі сторінки.', ru: 'На украинском, русском и английском. Язык можно сменить вверху страницы.', en: 'Ukrainian, Russian and English. Switch the language at the top of the page.' } },
];

function Cards({ items }: { items: Item[] }) {
  const t = tr();
  return (
    <div className="mu-cards ab-cards">
      {items.map((x) => {
        const body = (<>
          <div className="mu-card__icon"><Icon id={x.icon} /></div>
          <h3 className="mu-card__title">{t(x.title)}</h3>
          <p className="ab-text">{t(x.text)}</p>
        </>);
        return x.href ? <Link key={x.title.en} href={x.href} className="mu-card ab-card">{body}</Link> : <div key={x.title.en} className="mu-card ab-card">{body}</div>;
      })}
    </div>
  );
}

export default function AboutPage() {
  const t = tr();
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'AboutPage', name: t({ uk: 'Про Murly', ru: 'О Murly', en: 'About Murly' }), url: 'https://murly.com.ua/about', inLanguage: t.lang },
      { '@type': 'Organization', name: 'Murly', url: 'https://murly.com.ua', logo: 'https://murly.com.ua/favicon.svg', description: t({ uk: 'Безкоштовна платформа для вивчення й викладання англійської', ru: 'Бесплатная платформа для изучения и преподавания английского', en: 'A free platform to learn and teach English' }) },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: t(f.q), acceptedAnswer: { '@type': 'Answer', text: t(f.a) } })) },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id="st-cat-box" className="kit-hero" />
          <h1>{t({ uk: 'Уся англійська', ru: 'Весь английский', en: 'All your English' })} <em>{t({ uk: 'в одному місці.', ru: 'в одном месте.', en: 'in one place.' })}</em></h1>
          <p className="ab-lead">{t({
            uk: 'Murly це безкоштовна платформа з величезною кількістю матеріалів для вивчення й викладання англійської. Не потрібен мільйон різних сервісів: розклад, кабінети учнів, домашка, дошка, Telegram-бот, оплати й підготовка до НМТ зібрані разом.',
            ru: 'Murly это бесплатная платформа с огромным количеством материалов для изучения и преподавания английского. Не нужен миллион разных сервисов: расписание, кабинеты учеников, домашка, доска, Telegram-бот, оплаты и подготовка к НМТ собраны вместе.',
            en: 'Murly is a free platform with a huge library of materials to learn and teach English. No need for a dozen tools: schedule, student dashboards, homework, a whiteboard, a Telegram bot, payments and NMT prep all live together.',
          })}</p>
          <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
            <Link href="/sign-up?role=teacher" className="mu-btn mu-btn--lime mu-btn--lg">{t({ uk: 'Я вчитель', ru: 'Я учитель', en: 'I teach' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
            <Link href="/sign-up" className="mu-btn mu-btn--lg">{t({ uk: 'Я вчуся', ru: 'Я учусь', en: 'I learn' })}</Link>
          </div>
        </div>
      </section>

      <Marquee items={[t({ uk: 'Розклад', ru: 'Расписание', en: 'Schedule' }), t({ uk: 'Домашка', ru: 'Домашка', en: 'Homework' }), t({ uk: 'Дошка', ru: 'Доска', en: 'Whiteboard' }), 'Telegram', 'НМТ', t({ uk: 'Пісні', ru: 'Песни', en: 'Songs' }), 'Murly']} />

      <section className="mu-section" data-stickers="3">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Для', ru: 'Для', en: 'For' })} <em>{t({ uk: 'вчителів.', ru: 'учителей.', en: 'teachers.' })}</em></h2>
            <p className="ab-sub">{t({ uk: 'Усе для роботи з учнями в одному кабінеті.', ru: 'Всё для работы с учениками в одном кабинете.', en: 'Everything for working with students in one dashboard.' })}</p>
          </div>
          <Cards items={TEACHER} />
        </div>
      </section>

      <section className="mu-section">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Для тих, хто', ru: 'Для тех, кто', en: 'For those who' })} <em>{t({ uk: 'вчиться сам.', ru: 'учится сам.', en: 'learn alone.' })}</em></h2>
            <p className="ab-sub">{t({ uk: 'Багато відкрито навіть без реєстрації.', ru: 'Многое открыто даже без регистрации.', en: 'Lots is open even without signing up.' })}</p>
          </div>
          <Cards items={SELF} />
        </div>
      </section>

      <section className="mu-section">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Підготовка', ru: 'Подготовка', en: 'NMT' })} <em>{t({ uk: 'до НМТ.', ru: 'к НМТ.', en: 'preparation.' })}</em></h2>
            <p className="ab-sub">{t({ uk: 'Самостійно або з учителем.', ru: 'Самостоятельно или с учителем.', en: 'On your own or with a teacher.' })}</p>
          </div>
          <Cards items={NMT} />
        </div>
      </section>

      <section className="mu-section">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Для', ru: 'Для', en: 'For' })} <em>{t({ uk: 'батьків.', ru: 'родителей.', en: 'parents.' })}</em></h2>
          </div>
          <Cards items={[
            { icon: 'd-heart', title: { uk: 'Посилання з прогресом', ru: 'Ссылка с прогрессом', en: 'A progress link' }, text: { uk: 'Учитель надсилає батькам посилання: видно уроки, домашку й успіхи дитини.', ru: 'Учитель отправляет родителям ссылку: видно уроки, домашку и успехи ребёнка.', en: 'The teacher shares a link with lessons, homework and progress.' }, href: '/for-parents' },
            { icon: 'd-send', title: { uk: 'Нагадування в Telegram', ru: 'Напоминания в Telegram', en: 'Telegram reminders' }, text: { uk: 'Бот нагадує про уроки, нову домашку й оплату.', ru: 'Бот напоминает об уроках, новой домашке и оплате.', en: 'The bot reminds you of lessons, new homework and payments.' } },
            { icon: 'd-kid', title: { uk: 'Англійська з малюком', ru: 'Английский с малышом', en: 'English with little ones' }, text: { uk: 'Поради, казки, ігри й матеріали для друку для білінгвів.', ru: 'Советы, сказки, игры и материалы для печати для билингвов.', en: 'Tips, stories, games and printables for bilingual kids.' }, href: '/baby-english' },
          ]} />
        </div>
      </section>

      <section className="mu-section">
        <div className="mu-container ab-faq">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Часті', ru: 'Частые', en: 'Frequent' })} <em>{t({ uk: 'питання.', ru: 'вопросы.', en: 'questions.' })}</em></h2>
          </div>
          {FAQ.map((f) => (
            <details key={f.q.en} className="ab-q">
              <summary>{t(f.q)}</summary>
              <p>{t(f.a)}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-glass" className="mu-ic mu-ic--cta" />
            <h2>{t({ uk: 'Почни', ru: 'Начни', en: 'Start' })} <em>{t({ uk: 'безкоштовно.', ru: 'бесплатно.', en: 'for free.' })}</em></h2>
            <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
              <Link href="/sign-up" className="mu-btn mu-btn--lime mu-btn--lg">{t({ uk: 'Створити акаунт', ru: 'Создать аккаунт', en: 'Create an account' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
              <Link href="/contact" className="mu-textlink">{t({ uk: 'Написати нам', ru: 'Написать нам', en: 'Contact us' })}</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
