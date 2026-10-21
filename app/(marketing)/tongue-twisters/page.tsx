import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import TwisterBoard from '@/components/reading/TwisterBoard';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Скоромовки англійською з озвучкою | Murly', ru: 'Скороговорки на английском с озвучкой | Murly', en: 'English tongue twisters with audio | Murly' }),
    description: t({ uk: 'Англійські скоромовки для вимови: th, w і v, ship і sheep, r і l. Озвучка, повільний режим, переклад і поради.', ru: 'Английские скороговорки для произношения: th, w и v, ship и sheep, r и l. Озвучка, медленный режим, перевод и советы.', en: 'English tongue twisters for pronunciation: th, w and v, ship and sheep, r and l. Audio, slow mode, meanings and tips.' }),
    alternates: { canonical: '/tongue-twisters' },
  };
}

export default function TongueTwistersPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="4">
        <div className="mu-container">
          <Kit id="st-cat-blep" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="e-speak" />{t({ uk: 'Вимова', ru: 'Произношение', en: 'Pronunciation' })}</span>
          <h1>{t({ uk: 'Скоромовки', ru: 'Скороговорки', en: 'Tongue twisters' })} <em>{t({ uk: 'для язика.', ru: 'для языка.', en: 'for your tongue.' })}</em></h1>
          <p>{t({ uk: 'Послухай, повтори повільно, а потім скажи три рази швидко на час. Кожна скоромовка тренує звук, який українцям дається найважче.', ru: 'Послушай, повтори медленно, а потом скажи три раза быстро на время. Каждая скороговорка тренирует звук, который сложнее всего даётся.', en: 'Listen, repeat slowly, then say it three times fast against the clock. Each twister trains a sound that is hard for Ukrainian speakers.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container"><TwisterBoard /></div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
