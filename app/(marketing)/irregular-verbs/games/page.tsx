import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import GameHub from '@/components/games/GameHub';
import type { GameSet } from '@/components/games/engine';
import { CORE_VERBS as VERBS } from '@/lib/irregular-verbs';

export const metadata: Metadata = {
  title: 'Ігри з неправильними дієсловами англійської: квіз, пари, анаграми',
  description: 'Безкоштовні ігри, щоб вивчити три форми неправильних дієслів: квіз, пари, анаграми і картки.',
  alternates: { canonical: '/irregular-verbs/games' },
};

const SETS: GameSet[] = [
  { id: 'past', title: 'Past Simple', prompt: 'Яка форма Past Simple?', items: VERBS.map((v) => ({ q: v.base, a: v.past, hint: v.uk })) },
  { id: 'pp', title: 'Past Participle', prompt: 'Яка третя форма (Past Participle)?', items: VERBS.map((v) => ({ q: v.base, a: v.pp, hint: v.uk })) },
  { id: 'uk', title: 'Переклад', prompt: 'Як це англійською?', items: VERBS.map((v) => ({ q: v.uk, a: v.base })) },
];

export default function IrregularVerbsGamesPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-trophy" />Ігри</span>
          <h1>Неправильні дієслова <em>в іграх.</em></h1>
          <p>Обери, що тренуєш, і гру. Слова щоразу перемішуються.</p>
          <Link href="/irregular-verbs" className="mu-btn mu-btn--lg">До таблиці</Link>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <GameHub sets={SETS} />
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
