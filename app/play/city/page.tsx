import type { Metadata } from 'next';
import Link from 'next/link';
import Kit from '@/components/Kit';
import { LangSwitch } from '@/components/LangProvider';
import MurlyCity from '@/components/games/MurlyCity';
import { tr } from '@/lib/i18n-server';
import { alt } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Murly City: розмовна настільна гра англійською | Murly', ru: 'Murly City: разговорная настольная игра на английском | Murly', en: 'Murly City: a speaking board game in English | Murly' }),
    description: t({
      uk: 'Настільна гра для уроків англійської: кидай кубик, ходи містом, виконуй усні завдання й купуй місця. Теми: оренда житла, моє місто, їжа й кафе, подорожі. Від A1 до B2.',
      ru: 'Настольная игра для уроков английского: бросай кубик, ходи по городу, выполняй устные задания и покупай места. Темы: аренда жилья, мой город, еда и кафе, путешествия. От A1 до B2.',
      en: 'A board game for English lessons: roll the dice, walk around the city, do speaking tasks and buy places. Topics: renting a flat, my city, food and cafes, travel. A1 to B2.',
    }),
    alternates: alt('/play/city'),
  };
}

export default function CityPage() {
  const t = tr();
  return (
    <div className="sq-page">
      <header className="sq-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <Link href="/games" className="t-back">← {t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link>
        <div style={{ marginLeft: 'auto' }}><LangSwitch /></div>
      </header>
      <main className="sr-page">
        <h1>Murly City</h1>
        <MurlyCity />
      </main>
    </div>
  );
}
