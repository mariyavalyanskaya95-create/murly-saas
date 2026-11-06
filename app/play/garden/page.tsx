import type { Metadata } from 'next';
import Link from 'next/link';
import Kit from '@/components/Kit';
import { LangSwitch } from '@/components/LangProvider';
import MurlyGarden from '@/components/games/MurlyGarden';
import { tr } from '@/lib/i18n-server';
import { alt } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Murly Garden: гра зі словами англійською для дітей | Murly', ru: 'Murly Garden: игра со словами на английском для детей | Murly', en: 'Murly Garden: an English word game for kids | Murly' }),
    description: t({
      uk: 'Відновлюй садок разом із котиком Murly: заробляй зірочки за англійські слова, слухай, перекладай, складай слова з літер. Тварини, їжа, дім, природа, одяг, школа, почуття.',
      ru: 'Восстанавливай сад вместе с котиком Murly: зарабатывай звёздочки за английские слова, слушай, переводи, составляй слова из букв. Животные, еда, дом, природа, одежда, школа, чувства.',
      en: 'Restore a garden with Murly the cat: earn stars for English words, listen, translate and spell. Animals, food, home, nature, clothes, school and feelings.',
    }),
    alternates: alt('/play/garden'),
  };
}

export default function GardenPage() {
  const t = tr();
  return (
    <div className="sq-page">
      <header className="sq-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <Link href="/games" className="t-back">← {t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link>
        <div style={{ marginLeft: 'auto' }}><LangSwitch /></div>
      </header>
      <main className="sr-page">
        <h1>Murly Garden</h1>
        <MurlyGarden />
      </main>
    </div>
  );
}
