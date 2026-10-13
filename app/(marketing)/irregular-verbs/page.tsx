import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import VerbsAlphabet from '@/components/VerbsAlphabet';

export const metadata: Metadata = {
  title: 'Таблиця неправильних дієслів англійської з вимовою та перекладом',
  description: 'Повна таблиця неправильних дієслів англійської мови за алфавітом: три форми, переклад українською, пошук і озвучка кожного слова. Плюс безкоштовні ігри.',
  alternates: { canonical: '/irregular-verbs' },
};

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
      <section className="mu-page-hero" style={{ paddingBottom: 24 }} data-stickers="4">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-book" />Таблиця</span>
          <h1>Неправильні дієслова <em>за алфавітом.</em></h1>
          <p>Натисни на будь-яку форму, щоб послухати вимову. Навушники праворуч озвучать усі три форми підряд.</p>
          <Link href="/irregular-verbs/games" className="mu-btn mu-btn--lime mu-btn--lg">
            Тренуватися в іграх<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
          </Link>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <VerbsAlphabet />
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

      <section className="mu-section">
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="e-trophy" className="mu-ic mu-ic--cta" />
            <h2>Перевір себе <em>в іграх.</em></h2>
            <p>Квіз, пари, анаграми і картки на всі три форми.</p>
            <Link href="/irregular-verbs/games" className="mu-btn mu-btn--tomato mu-btn--lg">
              Грати<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
