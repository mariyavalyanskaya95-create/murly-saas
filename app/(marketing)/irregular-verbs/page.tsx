import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import VerbsAlphabet from '@/components/VerbsAlphabet';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Таблиця неправильних дієслів англійської з вимовою та перекладом', ru: 'Таблица неправильных глаголов английского с произношением и переводом', en: 'English irregular verbs table with pronunciation and translation' }),
    description: t({
      uk: 'Повна таблиця неправильних дієслів англійської мови за алфавітом: три форми, переклад українською, пошук і озвучка кожного слова. Плюс безкоштовні ігри.',
      ru: 'Полная таблица неправильных глаголов английского языка по алфавиту: три формы, перевод, поиск и озвучка каждого слова. Плюс бесплатные игры.',
      en: 'A full A-Z table of English irregular verbs: all three forms, translation, search and audio for every word. Plus free games.',
    }),
    alternates: { canonical: '/irregular-verbs' },
  };
}

const GROUPS: { icon: string; mod: string; title: T; text: T }[] = [
  { icon: 'd-bolt', mod: 'mu-card--lime', title: { uk: 'Усі три однакові', ru: 'Все три одинаковые', en: 'All three the same' }, text: { uk: 'cut, put, let, hit, hurt, cost, set, shut. Нічого не змінюється. Підступний лише read: пишеться так само, але в минулому читається як «ред».', ru: 'cut, put, let, hit, hurt, cost, set, shut. Ничего не меняется. Коварный только read: пишется так же, но в прошедшем читается как «ред».', en: 'cut, put, let, hit, hurt, cost, set, shut. Nothing changes. The only tricky one is read: same spelling, but in the past it sounds like “red”.' } },
  { icon: 'd-spark', mod: 'mu-card--mustard', title: { uk: 'Закінчення -ought / -aught', ru: 'Окончание -ought / -aught', en: 'Ending in -ought / -aught' }, text: { uk: 'buy, bring, think, fight → bought, brought, thought, fought. teach, catch → taught, caught. Друга і третя форми однакові.', ru: 'buy, bring, think, fight → bought, brought, thought, fought. teach, catch → taught, caught. Вторая и третья формы одинаковые.', en: 'buy, bring, think, fight → bought, brought, thought, fought. teach, catch → taught, caught. The second and third forms are the same.' } },
  { icon: 'e-speak', mod: 'mu-card--sky', title: { uk: 'i → a → u' }, text: { uk: 'begin, drink, sing, ring, swim, sink. Як пісенька: sing, sang, sung. Одна голосна змінюється по черзі.', ru: 'begin, drink, sing, ring, swim, sink. Как песенка: sing, sang, sung. Одна гласная меняется по очереди.', en: 'begin, drink, sing, ring, swim, sink. Like a little song: sing, sang, sung. One vowel changes each time.' } },
  { icon: 'e-globe', mod: 'mu-card--ink', title: { uk: '-ew → -own' }, text: { uk: 'blow, grow, know, throw, fly → blew, grew, knew, threw, flew → blown, grown, known, thrown, flown.' } },
];

export default function IrregularVerbsPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 24 }} data-stickers="4">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-book" />{t({ uk: 'Таблиця', ru: 'Таблица', en: 'Table' })}</span>
          <h1>{t({ uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' })} <em>{t({ uk: 'за алфавітом.', ru: 'по алфавиту.', en: 'from A to Z.' })}</em></h1>
          <p>{t({ uk: 'Натисни на будь-яку форму, щоб послухати вимову. Навушники праворуч озвучать усі три форми підряд.', ru: 'Нажми на любую форму, чтобы послушать произношение. Наушники справа озвучат все три формы подряд.', en: 'Tap any form to hear how it sounds. The headphones on the right play all three forms in a row.' })}</p>
          <Link href="/irregular-verbs/games" className="mu-btn mu-btn--lime mu-btn--lg">
            {t({ uk: 'Тренуватися в іграх', ru: 'Тренироваться в играх', en: 'Practise with games' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
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
            <span className="mu-section__eyebrow mu-section__eyebrow--lime"><Icon id="d-bulb" />{t({ uk: 'Лайфхак', ru: 'Лайфхак', en: 'Pro tip' })}</span>
            {t.lang === 'ru' ? (
              <h2 className="mu-section__title">Учи <em>группами,</em> а не списком.</h2>
            ) : t.lang === 'en' ? (
              <h2 className="mu-section__title">Learn <em>in groups,</em> not as a list.</h2>
            ) : (
              <h2 className="mu-section__title">Вчи <em>групами,</em> а не списком.</h2>
            )}
            <p className="mu-section__lead">{t({ uk: 'Багато дієслів змінюються за однаковим шаблоном. Запам’ятав шаблон, і пів таблиці вже в голові.', ru: 'Многие глаголы меняются по одному шаблону. Запомнил шаблон, и полтаблицы уже в голове.', en: 'Many verbs change by the same pattern. Learn the pattern and half the table is already in your head.' })}</p>
          </div>
          <div className="mu-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {GROUPS.map((g) => (
              <div key={g.title.uk} className={`mu-card ${g.mod}`}>
                <div className="mu-card__icon"><Icon id={g.icon} /></div>
                <h3 className="mu-card__title">{t(g.title)}</h3>
                <p className="mu-card__text">{t(g.text)}</p>
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
            <h2>{t({ uk: 'Перевір себе', ru: 'Проверь себя', en: 'Test yourself' })} <em>{t({ uk: 'в іграх.', ru: 'в играх.', en: 'with games.' })}</em></h2>
            <p>{t({ uk: 'Квіз, пари, анаграми і картки на всі три форми.', ru: 'Квиз, пары, анаграммы и карточки на все три формы.', en: 'Quiz, pairs, anagrams and flashcards for all three forms.' })}</p>
            <Link href="/irregular-verbs/games" className="mu-btn mu-btn--tomato mu-btn--lg">
              {t({ uk: 'Грати', ru: 'Играть', en: 'Play' })}<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
