import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import GameHub from '@/components/games/GameHub';
import Kit from '@/components/Kit';
import type { GameSet } from '@/components/games/engine';
import { NMT_WORDS, NMT_TOPICS_T, NMT_WORDS_RU } from '@/lib/content/nmt-bonus';
import { tr } from '@/lib/i18n-server';

// Бонус до PDF «100 важливих слів для НМТ»: ігри по темах (сюди веде QR-код)
export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: '100 важливих слів для НМТ: ігри та картки', ru: '100 важных слов для НМТ: игры и карточки', en: '100 key words for the NMT: games and flashcards' }),
    description: t({ uk: 'Тренуй 100 слів для НМТ з англійської по 10 темах: квіз, пари, анаграми і картки.', ru: 'Тренируй 100 слов для НМТ по английскому по 10 темам: квиз, пары, анаграммы и карточки.', en: 'Practise 100 key words for the NMT English exam in 10 topics: quiz, pairs, anagrams and flashcards.' }),
    alternates: { canonical: '/bonus/100-words' },
  };
}

export default function Words100Page() {
  const t = tr();
  // для RU показуємо російський переклад, для UK і EN український (продукт українською)
  const tr2 = (x: { w: string; uk: string }) => (t.lang === 'ru' ? NMT_WORDS_RU[x.w] ?? x.uk : x.uk);
  const topic = (n: string) => (t.lang === 'uk' ? n : NMT_TOPICS_T[n]?.[t.lang] ?? n);
  const all = NMT_WORDS.flatMap((g) => g.items);
  const SETS: GameSet[] = [
    { id: 'all', title: t({ uk: 'Усі 100 слів', ru: 'Все 100 слов', en: 'All 100 words' }), prompt: t({ uk: 'Що означає це слово?', ru: 'Что значит это слово?', en: 'What does this word mean?' }), items: all.map((x) => ({ q: x.w, a: tr2(x), hint: x.ex })) },
    { id: 'back', title: t({ uk: 'Навпаки', ru: 'Наоборот', en: 'Reverse' }), prompt: t({ uk: 'Як це англійською?', ru: 'Как это по-английски?', en: 'How do you say it in English?' }), items: all.map((x) => ({ q: tr2(x), a: x.w })) },
    ...NMT_WORDS.map((g, i) => ({ id: `t${i + 1}`, title: topic(g.topic), prompt: t({ uk: 'Що означає це слово?', ru: 'Что значит это слово?', en: 'What does this word mean?' }), items: g.items.map((x) => ({ q: x.w, a: tr2(x), hint: x.ex })) })),
  ];
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="6">
        <div className="mu-container">
          <Kit id="il-cat-read" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="e-book" />{t({ uk: 'Бонус до PDF', ru: 'Бонус к PDF', en: 'PDF bonus' })}</span>
          <h1>{t({ uk: '100 слів для НМТ', ru: '100 слов для НМТ', en: '100 words for the NMT' })} <em>{t({ uk: 'в іграх.', ru: 'в играх.', en: 'in games.' })}</em></h1>
          <p>{t({ uk: 'Обери тему і гру. Слова щоразу перемішуються, а підказка показує приклад з файлу.', ru: 'Выбери тему и игру. Слова каждый раз перемешиваются, а подсказка показывает пример из файла.', en: 'Pick a topic and a game. Words are shuffled every time, and the hint shows the example from the PDF.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container"><GameHub sets={SETS} /></div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container" style={{ textAlign: 'center' }}>
          <Link href="/pricing#mini" className="mu-btn mu-btn--lime">{t({ uk: 'Усі міні-продукти', ru: 'Все мини-продукты', en: 'All mini products' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
        </div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
