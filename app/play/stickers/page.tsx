import type { Metadata } from 'next';
import Link from 'next/link';
import Kit from '@/components/Kit';
import { LangSwitch } from '@/components/LangProvider';
import StickerRoom from '@/components/games/StickerRoom';
import { tr } from '@/lib/i18n-server';
import { alt } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Make a room: гра з наліпками англійською для дітей | Murly', ru: 'Make a room: игра с наклейками на английском для детей | Murly', en: 'Make a room: an English sticker game for kids | Murly' }),
    description: t({
      uk: 'Облаштуй кімнату, кухню чи кафе наліпками й опиши її англійською: there is, there are, прийменники місця. Слова з озвучкою.',
      ru: 'Обставь комнату, кухню или кафе наклейками и опиши её по-английски: there is, there are, предлоги места. Слова с озвучкой.',
      en: 'Decorate a bedroom, kitchen or café with stickers and describe it in English: there is, there are, prepositions of place. Voiced words.',
    }),
    alternates: alt('/play/stickers'),
  };
}

export default function StickersPage() {
  const t = tr();
  return (
    <div className="sq-page">
      <header className="sq-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <Link href="/games" className="t-back">← {t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link>
        <div style={{ marginLeft: 'auto' }}><LangSwitch /></div>
      </header>
      <main className="sr-page">
        <h1>Make a room</h1>
        <StickerRoom />
      </main>
    </div>
  );
}
