import type { Metadata } from 'next';
import Link from 'next/link';
import Kit from '@/components/Kit';
import { LangSwitch } from '@/components/LangProvider';
import StopGo from '@/components/games/StopGo';
import { tr } from '@/lib/i18n-server';
import { alt } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Stop & Go with Murly: гра «зелене світло, червоне світло» англійською для дітей | Murly', ru: 'Stop & Go with Murly: игра «зелёный свет, красный свет» на английском для детей | Murly', en: 'Stop & Go with Murly: a green light, red light English game for kids | Murly' }),
    description: t({
      uk: 'Весела гра для дітей 6-11 років: на зелене світло слухай англійське слово й іди до котика Murly, на червоне завмри. Тварини, кольори, числа й дії з озвучкою.',
      ru: 'Весёлая игра для детей 6-11 лет: на зелёный свет слушай английское слово и иди к котику Murly, на красный замри. Животные, цвета, числа и действия с озвучкой.',
      en: 'A cheerful game for kids aged 6-11: on green light, listen to an English word and walk to Murly the cat; on red light, freeze. Animals, colours, numbers and actions with voice.',
    }),
    alternates: alt('/play/stop-go'),
  };
}

export default function StopGoPage() {
  const t = tr();
  return (
    <div className="sq-page">
      <header className="sq-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <Link href="/games" className="t-back">← {t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link>
        <div style={{ marginLeft: 'auto' }}><LangSwitch /></div>
      </header>
      <main className="sr-page">
        <h1>Stop &amp; Go with Murly</h1>
        <StopGo />
      </main>
    </div>
  );
}
