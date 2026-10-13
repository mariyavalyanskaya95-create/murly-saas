import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import GameHub from '@/components/games/GameHub';
import VerbsTable from '@/components/VerbsTable';
import type { GameSet } from '@/components/games/engine';
import { VERBS } from '@/lib/irregular-verbs';

export const metadata: Metadata = {
  title: 'Неправильні дієслова англійської: таблиця з перекладом та ігри',
  description: 'Таблиця неправильних дієслів англійської мови з перекладом українською, три форми, пошук і безкоштовні ігри: квіз, пари, анаграми, картки.',
  alternates: { canonical: '/irregular-verbs' },
};

const SETS: GameSet[] = [
  { id: 'past', title: 'Past Simple', prompt: 'Яка форма Past Simple?', items: VERBS.map((v) => ({ q: v.base, a: v.past, hint: v.uk })) },
  { id: 'pp', title: 'Past Participle', prompt: 'Яка третя форма (Past Participle)?', items: VERBS.map((v) => ({ q: v.base, a: v.pp, hint: v.uk })) },
  { id: 'uk', title: 'Переклад', prompt: 'Як це англійською?', items: VERBS.map((v) => ({ q: v.uk, a: v.base })) },
];

const GROUPS = [
  { icon: 'd-bolt', mod: 'mu-card--lime', title: 'Усі три однакові', text: 'cut, put, let, hit, hurt, cost, set, shut. Нічого не змінюється. Підступний лише read: пишеться так само, але в минулому читається як «ред».' },
  { icon: 'd-spark', mod: 'mu-card--mustard', title: 'Закінчення -ought / -aught', text: 'buy, bring, think, fight → bought, brought, thought, fought. teach, catch → taught, caught. Друга і третя форми однакові.' },
  { icon: 'e-speak', mod: 'mu-card--sky', title: 'i → a → u', text: 'begin, drink, sing, ring, swim, sink. Як пісенька: sing, sang, sung. Одна голосна змінюється по черзі.' },
  { icon: 'e-globe', mod: 'mu-card--ink', title: '-ew → -own', text: 'blow, grow, know, throw, fly → blew, grew, knew, threw, flew → blown, grown, known, thrown, flown.' },
];

export default function IrregularVerbsPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-abc" />Граматика</span>
          <h1>Неправильні <em>дієслова.</em></h1>
          <p>Таблиця з перекладом, групи, які легко запам’ятати, і ігри, щоб нарешті вивчити всі три форми.</p>
          <a href="#play" className="mu-btn mu-btn--lime mu-btn--lg">
            Грати<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
          </a>
        </div>
      </section>

      <section className="mu-section" id="play" style={{ paddingTop: 16 }}>
        <div className="mu-container">
          <GameHub sets={SETS} />
        </div>
      </section>

      <div className="mu-scallop" style={{ backgroundColor: 'var(--mu-tomato)' }} />
      <section className="mu-section mu-section--tomato" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow mu-section__eyebrow--lime"><Icon id="d-bulb" />Лайфхак</span>
            <h2 className="mu-section__title">Вчи <em>групами,</em> а не списком.</h2>
            <p className="mu-section__lead">Багато дієслів змінюються за однаковим шаблоном. Запам’ятав шаблон, і пів таблиці вже в голові.</p>
          </div>
          <div className="mu-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {GROUPS.map((g) => (
              <div key={g.title} className={`mu-card ${g.mod}`}>
                <div className="mu-card__icon"><Icon id={g.icon} /></div>
                <h3 className="mu-card__title">{g.title}</h3>
                <p className="mu-card__text">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mu-scallop mu-scallop--up" style={{ backgroundColor: 'var(--mu-tomato)' }} />

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-book" />Таблиця</span>
            <h2 className="mu-section__title">Усі форми <em>з перекладом.</em></h2>
            <p className="mu-section__lead">Зірочкою позначені дієслова, які трапляються найчастіше. З них і почни.</p>
          </div>
          <VerbsTable />
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-glass" className="mu-ic mu-ic--cta" />
            <h2>Учителю: <em>свої ігри</em> скоро.</h2>
            <p>Вводиш слова один раз, обираєш гру і відправляєш учням. Кабінет учителя вже в роботі.</p>
            <Link href="/for-teachers" className="mu-btn mu-btn--tomato mu-btn--lg">
              Для вчителів<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
