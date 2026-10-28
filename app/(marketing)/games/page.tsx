import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Stickers from '@/components/Stickers';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Ігри англійською для дітей, підлітків і дорослих | Murly', ru: 'Игры на английском для детей, подростков и взрослых | Murly', en: 'English games for kids, teens and adults | Murly' }),
    description: t({
      uk: '3D-містечко, книжка-історія, ігри з неправильними дієсловами, квізи і скоромовки. Англійська, яка запам’ятовується сама.',
      ru: '3D-городок, книжка-история, игры с неправильными глаголами, квизы и скороговорки. Английский, который запоминается сам.',
      en: 'A 3D town, a story book, irregular verb games, quizzes and tongue twisters. English that sticks by itself.',
    }),
    alternates: { canonical: '/games' },
  };
}

const SOON: T = { uk: 'Скоро', ru: 'Скоро', en: 'Coming soon' };
const WORLDS: { href: string; title: string; uk: T; text: T; tag: T; color: string; ready: boolean }[] = [
  { href: '/play/town', title: 'Murly Town 3D', uk: { uk: 'Місто в 3D', ru: 'Город в 3D', en: 'A town in 3D' }, text: { uk: 'Будуй місто: будинки, дороги, машини. Заходь у будинок і облаштовуй кімнати: понад 200 предметів, герой і завдання. Усе англійською.', ru: 'Строй город: дома, дороги, машины. Заходи в дом и обустраивай комнаты: больше 200 предметов, герой и задания. Всё на английском.', en: 'Build a town: houses, roads, cars. Go inside and decorate the rooms: over 200 items, a hero and tasks. All in English.' }, tag: { uk: 'Нове · 3D · A1-B1', ru: 'Новое · 3D · A1-B1', en: 'New · 3D · A1-B1' }, color: 'tomato', ready: true },
  { href: '/play/story', title: 'Funny Life Story', uk: { uk: 'Книжка-історія', ru: 'Книжка-история', en: 'A story book' }, text: { uk: 'Читай смішну книжку англійською, малюй героїв і завантажуй їхні фото: вони з’являться на сторінках. А потім придумай своїх персонажів і напиши власну історію.', ru: 'Читай смешную книжку на английском, рисуй героев и загружай их фото: они появятся на страницах. А потом придумай своих персонажей и напиши свою историю.', en: 'Read a funny book in English, draw the heroes and upload their pictures: they appear on the pages. Then invent your own characters and write your own story.' }, tag: { uk: 'Нове · Діти 10-13 · A2-B1', ru: 'Новое · Дети 10-13 · A2-B1', en: 'New · Kids 10-13 · A2-B1' }, color: 'mustard', ready: true },
  { href: '/worlds/room', title: 'My room', uk: { uk: 'Моя кімната (легка версія)', ru: 'Моя комната (лёгкая версия)', en: 'My room (light version)' }, text: { uk: 'Проста кімната для найменших і слабких пристроїв: меблі, кольори, тварини і завдання англійською.', ru: 'Простая комната для самых маленьких и слабых устройств: мебель, цвета, животные и задания на английском.', en: 'A simple room for the youngest kids and older devices: furniture, colours, animals and tasks in English.' }, tag: { uk: 'Діти 6-11 · A1-A2', ru: 'Дети 6-11 · A1-A2', en: 'Kids 6-11 · A1-A2' }, color: 'lime', ready: true },
  { href: '', title: 'Block world', uk: { uk: 'Світ з блоків', ru: 'Мир из блоков', en: 'A world of blocks' }, text: { uk: 'Будуй будинки і ферми з блоків, а кожен блок має англійську назву.', ru: 'Строй дома и фермы из блоков, а у каждого блока есть английское название.', en: 'Build houses and farms from blocks, and every block has an English name.' }, tag: SOON, color: 'sky', ready: false },
  { href: '', title: 'City quest', uk: { uk: 'Місто-квест', ru: 'Город-квест', en: 'A city quest' }, text: { uk: 'Гуляй своїм містом, питай дорогу, купуй, замовляй їжу і виконуй місії англійською.', ru: 'Гуляй по своему городу, спрашивай дорогу, покупай, заказывай еду и выполняй миссии на английском.', en: 'Walk around your city, ask for directions, go shopping, order food and complete missions in English.' }, tag: SOON, color: 'mustard', ready: false },
];

// Короткі ігри: слова, граматика, вимова (підходять і дорослим)
const QUICK: { href: string; title: T; text: T; tag: T; icon: string }[] = [
  { href: '/irregular-verbs/games', icon: 'd-cup', title: { uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' }, text: { uk: 'Картки, пари, вікторина, анаграми. Три форми запам’ятовуються граючи.', ru: 'Карточки, пары, викторина, анаграммы. Три формы запоминаются играя.', en: 'Cards, pairs, quiz, anagrams. Learn the three forms by playing.' }, tag: { uk: 'A2-B1 · 5 хв', ru: 'A2-B1 · 5 мин', en: 'A2-B1 · 5 min' } },
  { href: '/tongue-twisters', icon: 'e-speak', title: { uk: 'Скоромовки', ru: 'Скороговорки', en: 'Tongue twisters' }, text: { uk: 'Вимова на час, з озвучкою. Хто швидше без помилок?', ru: 'Произношение на время, с озвучкой. Кто быстрее без ошибок?', en: 'Pronunciation against the clock, with audio. Who is fastest?' }, tag: { uk: 'Усі рівні', ru: 'Все уровни', en: 'All levels' } },
  { href: '/quiz/teen-life', icon: 'e-trophy', title: { uk: 'Квіз Teen Life', ru: 'Квиз Teen Life', en: 'Teen Life quiz' }, text: { uk: 'Читання й лексика у форматі НМТ, з поясненнями.', ru: 'Чтение и лексика в формате НМТ, с объяснениями.', en: 'NMT-style reading and vocabulary, with explanations.' }, tag: { uk: 'B1 · Підлітки', ru: 'B1 · Подростки', en: 'B1 · Teens' } },
  { href: '/quiz/films-netflix', icon: 'e-trophy', title: { uk: 'Квіз Films & Netflix', ru: 'Квиз Films & Netflix', en: 'Films & Netflix quiz' }, text: { uk: 'Про кіно і серіали: текст, пропуски, питання.', ru: 'О кино и сериалах: текст, пропуски, вопросы.', en: 'About films and series: a text, gaps and questions.' }, tag: { uk: 'B1 · Підлітки і дорослі', ru: 'B1 · Подростки и взрослые', en: 'B1 · Teens and adults' } },
];

export default function GamesPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="4">
        <div className="mu-container">
          <Kit id="st-boy-cap" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="d-kid" />{t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</span>
          <h1>{t({ uk: 'Грай і', ru: 'Играй и', en: 'Play and' })} <em>{t({ uk: 'говори.', ru: 'говори.', en: 'speak.' })}</em></h1>
          <p>{t({ uk: 'Ігри, де англійська звучить на кожному кроці. Будуй, читай, змагайся, і слова запам’ятовуються самі. Свої слова від учителя можна грати в кабінеті.', ru: 'Игры, где английский звучит на каждом шагу. Строй, читай, соревнуйся, и слова запоминаются сами. Свои слова от учителя можно играть в кабинете.', en: 'Games where English is everywhere. Build, read, compete, and the words stick by themselves. Play with your teacher’s words in your account.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8, paddingBottom: 48 }}>
        <h2 className="mu-container gm-h">{t({ uk: 'Світи та історії', ru: 'Миры и истории', en: 'Worlds and stories' })}</h2>
        <div className="mu-container gr-grid">
          {WORLDS.map((w) => w.ready ? (
            <Link key={w.title} href={w.href} className={`gr-card gr--${w.color}`}>
              <span className="gr-level">{t(w.tag)}</span>
              <span className="gr-card__title">{w.title}</span>
              <span className="gr-card__uk">{t(w.uk)}</span>
              <span className="gr-card__lead">{t(w.text)}</span>
            </Link>
          ) : (
            <div key={w.title} className={`gr-card gr--${w.color} rw-soon`} aria-disabled="true">
              <span className="gr-level">{t(w.tag)}</span>
              <span className="gr-card__title">{w.title}</span>
              <span className="gr-card__uk">{t(w.uk)}</span>
              <span className="gr-card__lead">{t(w.text)}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <h2 className="gm-h">{t({ uk: 'Швидкі ігри: слова, граматика, вимова', ru: 'Быстрые игры: слова, грамматика, произношение', en: 'Quick games: words, grammar, pronunciation' })}</h2>
          <div className="gr-grid">
            {QUICK.map((g) => (
              <Link key={g.href} href={g.href} className="gr-card gr--sky">
                <span className="gr-card__ic"><Icon id={g.icon} /></span>
                <span className="gr-level">{t(g.tag)}</span>
                <span className="gr-card__title">{t(g.title)}</span>
                <span className="gr-card__lead">{t(g.text)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
