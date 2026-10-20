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
    title: t({ uk: 'Світи Murly: ігри англійською для дітей і підлітків', ru: 'Миры Murly: игры на английском для детей и подростков', en: 'Murly worlds: English games for kids and teens' }),
    description: t({
      uk: 'Ігрові світи, де англійська вчиться сама: облаштуй кімнату, будуй з блоків, виконуй квести в місті.',
      ru: 'Игровые миры, где английский учится сам: обустрой комнату, строй из блоков, выполняй квесты в городе.',
      en: 'Game worlds where English sticks by itself: decorate a room, build with blocks, complete quests in the city.',
    }),
    alternates: { canonical: '/worlds' },
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

export default function WorldsPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="4">
        <div className="mu-container">
          <Kit id="st-boy-cap" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="d-kid" />{t({ uk: 'Світи', ru: 'Миры', en: 'Worlds' })}</span>
          <h1>{t({ uk: 'Грай і', ru: 'Играй и', en: 'Play and' })} <em>{t({ uk: 'говори.', ru: 'говори.', en: 'speak.' })}</em></h1>
          <p>{t({ uk: 'Ігрові світи, де англійська звучить на кожному кроці. Натискай, будуй, виконуй завдання, і слова запам’ятовуються самі.', ru: 'Игровые миры, где английский звучит на каждом шагу. Нажимай, строй, выполняй задания, и слова запоминаются сами.', en: 'Game worlds where English is everywhere. Tap, build, complete tasks, and the words stick by themselves.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
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
      <SiteFooter />
      <Stickers />
    </>
  );
}
