import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Stickers from '@/components/Stickers';

export const metadata: Metadata = {
  title: 'Світи Murly: ігри англійською для дітей і підлітків',
  description: 'Ігрові світи, де англійська вчиться сама: облаштуй кімнату, будуй з блоків, виконуй квести в місті.',
  alternates: { canonical: '/worlds' },
};

const WORLDS = [
  { href: '/worlds/town', title: 'Murly Town 3D', uk: 'Місто в 3D', text: 'Будуй місто: будинки, дороги, машини. Заходь у будинок і облаштовуй кімнати: понад 200 предметів, герой і завдання. Усе англійською.', tag: 'Нове · 3D · A1-B1', color: 'tomato', ready: true },
  { href: '/worlds/room', title: 'My room', uk: 'Моя кімната (легка версія)', text: 'Проста кімната для найменших і слабких пристроїв: меблі, кольори, тварини і завдання англійською.', tag: 'Діти 6-11 · A1-A2', color: 'lime', ready: true },
  { href: '', title: 'Block world', uk: 'Світ з блоків', text: 'Будуй будинки і ферми з блоків, а кожен блок має англійську назву.', tag: 'Скоро', color: 'sky', ready: false },
  { href: '', title: 'City quest', uk: 'Місто-квест', text: 'Гуляй своїм містом, питай дорогу, купуй, замовляй їжу і виконуй місії англійською.', tag: 'Скоро', color: 'mustard', ready: false },
];

export default function WorldsPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="4">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-kid" />Світи</span>
          <h1>Грай і <em>говори.</em></h1>
          <p>Ігрові світи, де англійська звучить на кожному кроці. Натискай, будуй, виконуй завдання, і слова запам’ятовуються самі.</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container gr-grid">
          {WORLDS.map((w) => w.ready ? (
            <Link key={w.title} href={w.href} className={`gr-card gr--${w.color}`}>
              <span className="gr-level">{w.tag}</span>
              <span className="gr-card__title">{w.title}</span>
              <span className="gr-card__uk">{w.uk}</span>
              <span className="gr-card__lead">{w.text}</span>
            </Link>
          ) : (
            <div key={w.title} className={`gr-card gr--${w.color} rw-soon`} aria-disabled="true">
              <span className="gr-level">{w.tag}</span>
              <span className="gr-card__title">{w.title}</span>
              <span className="gr-card__uk">{w.uk}</span>
              <span className="gr-card__lead">{w.text}</span>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
