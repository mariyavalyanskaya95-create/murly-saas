import type { Metadata } from 'next';
import Link from 'next/link';
import { alt, absUrl } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import HeroTip from '@/components/HeroTip';
import SeoNote from '@/components/SeoNote';
import CartoonPlayer from '@/components/CartoonPlayer';
import { CARTOONS } from '@/lib/cartoons';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Мультики англійською для дітей: з субтитрами, слова й поради | Murly', ru: 'Мультики на английском для детей: с субтитрами, слова и советы | Murly', en: 'Cartoons in English for kids: subtitles, words and tips | Murly' }),
    description: t({ uk: 'Мультики англійською з офіційних каналів: Peppa Pig, Bluey, Hey Duggee, Numberblocks, Super Simple Songs, Simon’s Cat. Вік, рівень, корисні фрази з перекладом і як дивитися з користю.', ru: 'Мультики на английском с официальных каналов: Peppa Pig, Bluey, Hey Duggee, Numberblocks, Super Simple Songs, Simon’s Cat. Возраст, уровень, полезные фразы с переводом и как смотреть с пользой.', en: 'Cartoons in English from official channels: Peppa Pig, Bluey, Hey Duggee, Numberblocks, Super Simple Songs, Simon’s Cat. Age, level, useful phrases and viewing tips.' }),
    alternates: alt('/cartoons'),
  };
}

const HOW = [
  { uk: 'Одна серія 2-3 рази краще, ніж три різні. Повтор дає слова.', ru: 'Одна серия 2-3 раза лучше, чем три разные. Повтор даёт слова.', en: 'One episode 2-3 times beats three different ones.' },
  { uk: 'Субтитри тільки англійською: увімкніть CC у плеєрі.', ru: 'Субтитры только на английском: включите CC в плеере.', en: 'English subtitles only: turn on CC in the player.' },
  { uk: 'Пауза й питання: What is he doing? What colour is it? How many?', ru: 'Пауза и вопрос: What is he doing? What colour is it? How many?', en: 'Pause and ask: What is he doing? What colour is it? How many?' },
  { uk: '10-20 хвилин на день цілком достатньо, головне регулярно.', ru: '10-20 минут в день вполне достаточно, главное регулярно.', en: '10-20 minutes a day is enough. Keep it regular.' },
];

export default function CartoonsPage() {
  const t = tr();
  const tw = (w: [string, string, string]) => t({ uk: w[1], ru: w[2], en: w[1] });
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: t({ uk: 'Мультики англійською для дітей', ru: 'Мультики на английском для детей', en: 'Cartoons in English for kids' }), url: absUrl('/cartoons'), itemListElement: CARTOONS.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `https://www.youtube.com/@${c.handle}` })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }}>
        <div className="mu-container">
          <h1>{t({ uk: 'Мультики', ru: 'Мультики', en: 'Cartoons' })} <em>{t({ uk: 'англійською.', ru: 'на английском.', en: 'in English.' })}</em></h1>
          <HeroTip>{t({ uk: 'Тільки офіційні канали. До кожного мультика вік, рівень і фрази з перекладом.', ru: 'Только официальные каналы. К каждому мультику возраст, уровень и фразы с переводом.', en: 'Official channels only. Age, level and phrases for each show.' })}</HeroTip>
          <SeoNote free={{ uk: 'Безкоштовно, без реєстрації', ru: 'Бесплатно, без регистрации', en: 'Free, no sign-up' }} />
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container ct-wrap">
          <div className="ct-how">
            <h2>{t({ uk: 'Як дивитися з користю', ru: 'Как смотреть с пользой', en: 'How to watch' })}</h2>
            <ol>{HOW.map((h) => <li key={h.uk}>{t(h)}</li>)}</ol>
          </div>
          {CARTOONS.map((c) => (
            <article key={c.id} id={c.id} className="ct-card">
              <header className="ct-card__head">
                <h2>{c.name}</h2>
                <span className="gr-level">{c.level}</span>
                <span className="le-tag">{t({ uk: `${c.age} років`, ru: `${c.age} лет`, en: `ages ${c.age}` })}</span>
              </header>
              <p>{t(c.about)}</p>
              <p><b>{t({ uk: 'Чим корисно:', ru: 'Чем полезно:', en: 'Why it helps:' })}</b> {t(c.why)}</p>
              <CartoonPlayer channel={c.channel} name={c.name} />
              <div className="ct-words">
                <h3>{t({ uk: 'Фрази, які почуєте', ru: 'Фразы, которые услышите', en: 'Phrases you will hear' })}</h3>
                <ul>{c.words.map((w) => <li key={w[0]}><b lang="en">{w[0]}</b> {tw(w)}</li>)}</ul>
              </div>
              <p className="ct-tip"><b>{t({ uk: 'Порада:', ru: 'Совет:', en: 'Tip:' })}</b> {t(c.tip)}</p>
              <a className="ct-src" href={`https://www.youtube.com/@${c.handle}`} target="_blank" rel="noopener noreferrer">{t({ uk: 'Офіційний канал на YouTube', ru: 'Официальный канал на YouTube', en: 'Official YouTube channel' })} ↗</a>
            </article>
          ))}
          <p className="t-muted">{t({ uk: 'Відео показуються з офіційних каналів правовласників через YouTube. Murly не зберігає і не завантажує мультики.', ru: 'Видео показываются с официальных каналов правообладателей через YouTube. Murly не хранит и не загружает мультики.', en: 'Videos play from the rights holders’ official YouTube channels. Murly does not host any cartoons.' })}</p>
          <p><Link href="/songs">{t({ uk: 'Англійська через пісні', ru: 'Английский по песням', en: 'English through songs' })}</Link> · <Link href="/books">{t({ uk: 'Казки англійською', ru: 'Сказки на английском', en: 'Fairy tales in English' })}</Link> · <Link href="/baby-english">{t({ uk: 'Англійська для малюків', ru: 'Английский для малышей', en: 'English for little ones' })}</Link></p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
