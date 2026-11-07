import type { Metadata } from 'next';
import { alt } from '@/lib/seo';
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
      uk: 'Квест, 3D-містечко, гра з наліпками, настільна гра для уроку, ігри з неправильними дієсловами, квізи і скоромовки.',
      ru: 'Квест, 3D-городок, игра с наклейками, настольная игра для урока, игры с неправильными глаголами, квизы и скороговорки.',
      en: 'A quest, a 3D town, a sticker game, a board game for lessons, irregular verb games, quizzes and tongue twisters.',
    }),
    alternates: alt('/games'),
  };
}

const WORLDS: { href: string; title: string; uk: T; text: T; tag: T; color: string; ready: boolean }[] = [
  { href: '/play/quest', title: 'Find it, Bubbles!', uk: { uk: 'Знайди, Бульбашко!', ru: 'Найди, Пузырёк!', en: 'A seek-and-find quest' }, text: { uk: 'Слухай прохання котика і знаходь речі: 8 місць, від кухні до моря.', ru: 'Слушай просьбы котика и находи вещи: 8 мест, от кухни до моря.', en: 'Listen to the cat and find things: 8 places, from the kitchen to the sea.' }, tag: { uk: 'Діти 6-11 · A1-A2', ru: 'Дети 6-11 · A1-A2', en: 'Kids 6-11 · A1-A2' }, color: 'sky', ready: true },
  { href: '/play/stop-go', title: 'Stop & Go', uk: { uk: 'Зелене світло, червоне світло', ru: 'Зелёный свет, красный свет', en: 'Green light, red light' }, text: { uk: 'Слухай слово, обирай картинку і завмирай, коли котик обертається.', ru: 'Слушай слово, выбирай картинку и замирай, когда котик оборачивается.', en: 'Listen, pick the picture and freeze when the cat turns around.' }, tag: { uk: 'Діти 6-11 · A1', ru: 'Дети 6-11 · A1', en: 'Kids 6-11 · A1' }, color: 'sky', ready: true },
  { href: '/play/garden', title: 'Murly Garden', uk: { uk: 'Сад Murly', ru: 'Сад Murly', en: 'A word garden' }, text: { uk: 'Короткі раунди слів, зірочки за відповіді і сад, який відновлюється.', ru: 'Короткие раунды слов, звёздочки за ответы и сад, который восстанавливается.', en: 'Short word rounds, stars for answers and a garden that grows back.' }, tag: { uk: 'A1-A2' }, color: 'lime', ready: true },
  { href: '/play/city', title: 'Murly City', uk: { uk: 'Настільна гра для уроку', ru: 'Настольная игра для урока', en: 'A board game for lessons' }, text: { uk: 'Кубик і розмовні завдання на 2-4 гравців через демонстрацію екрана.', ru: 'Кубик и разговорные задания на 2-4 игроков через демонстрацию экрана.', en: 'Dice and speaking tasks for 2-4 players via screen share.' }, tag: { uk: 'A1-B2 · урок', ru: 'A1-B2 · урок', en: 'A1-B2 · lesson' }, color: 'mustard', ready: true },
  { href: '/play/stickers', title: 'Make a room', uk: { uk: 'Гра з наліпками', ru: 'Игра с наклейками', en: 'A sticker game' }, text: { uk: 'Облаштуй кімнату наліпками й опиши її: there is, there are, on, next to.', ru: 'Обставь комнату наклейками и опиши её: there is, there are, on, next to.', en: 'Decorate a room with stickers and describe it: there is, there are, on, next to.' }, tag: { uk: 'Діти 6-12 · A1-A2', ru: 'Дети 6-12 · A1-A2', en: 'Kids 6-12 · A1-A2' }, color: 'lime', ready: true },
  { href: '/play/town', title: 'Murly Town 3D', uk: { uk: 'Місто в 3D', ru: 'Город в 3D', en: 'A town in 3D' }, text: { uk: 'Будуй місто й облаштовуй будинок: понад 200 предметів, усе англійською.', ru: 'Строй город и обустраивай дом: больше 200 предметов, всё на английском.', en: 'Build a town and furnish a house: over 200 items, all in English.' }, tag: { uk: '3D · A1-B1' }, color: 'tomato', ready: true },
  { href: '/play/story', title: 'Funny Life Story', uk: { uk: 'Книжка-історія', ru: 'Книжка-история', en: 'A story book' }, text: { uk: 'Читай смішну книжку, малюй героїв і пиши власну історію.', ru: 'Читай смешную книжку, рисуй героев и пиши свою историю.', en: 'Read a funny book, draw the heroes and write your own story.' }, tag: { uk: 'Діти 10-13 · A2-B1', ru: 'Дети 10-13 · A2-B1', en: 'Kids 10-13 · A2-B1' }, color: 'mustard', ready: true },
  { href: '/worlds/room', title: 'My room', uk: { uk: 'Моя кімната (легка версія)', ru: 'Моя комната (лёгкая версия)', en: 'My room (light version)' }, text: { uk: 'Проста кімната для слабких пристроїв: меблі, кольори, тварини.', ru: 'Простая комната для слабых устройств: мебель, цвета, животные.', en: 'A simple room for older devices: furniture, colours, animals.' }, tag: { uk: 'Діти 6-11 · A1-A2', ru: 'Дети 6-11 · A1-A2', en: 'Kids 6-11 · A1-A2' }, color: 'lime', ready: true },
];

// Короткі ігри: слова, граматика, вимова (підходять і дорослим)
const QUICK: { href: string; title: T; text: T; tag: T; icon: string }[] = [
  { href: '/irregular-verbs/games', icon: 'd-cup', title: { uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' }, text: { uk: 'Картки, пари, вікторина, анаграми на три форми.', ru: 'Карточки, пары, викторина, анаграммы на три формы.', en: 'Cards, pairs, quiz and anagrams for all three forms.' }, tag: { uk: 'A2-B1 · 5 хв', ru: 'A2-B1 · 5 мин', en: 'A2-B1 · 5 min' } },
  { href: '/tongue-twisters', icon: 'e-speak', title: { uk: 'Скоромовки', ru: 'Скороговорки', en: 'Tongue twisters' }, text: { uk: 'Вимова на час, з озвучкою.', ru: 'Произношение на время, с озвучкой.', en: 'Pronunciation against the clock, with audio.' }, tag: { uk: 'Усі рівні', ru: 'Все уровни', en: 'All levels' } },
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
          <h1>{t({ uk: 'Грай і', ru: 'Играй и', en: 'Play and' })} <em>{t({ uk: 'говори.', ru: 'говори.', en: 'speak.' })}</em></h1>
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
