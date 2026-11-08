import RelatedPosts from '@/components/blog/RelatedPosts';
import Link from 'next/link';
import { alt } from '@/lib/seo';
import SectionTabs from '@/components/SectionTabs';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import VerbsAlphabet from '@/components/VerbsAlphabet';
import { tr } from '@/lib/i18n-server';
import SeoNote from '@/components/SeoNote';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

import HeroTip from '@/components/HeroTip';
export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Неправильні дієслова англійської: таблиця з перекладом', ru: 'Неправильные глаголы английского: таблица с переводом', en: 'English irregular verbs table with translation and audio' }),
    description: t({
      uk: 'Таблиця неправильних дієслів англійської мови за алфавітом: три форми, переклад, озвучка кожної форми та ігри. Безкоштовно і без реєстрації.',
      ru: 'Таблица неправильных глаголов английского языка по алфавиту: три формы, перевод, озвучка каждой формы и игры. Бесплатно и без регистрации.',
      en: 'English irregular verbs from A to Z: all three forms, translation, audio for every form and games. Free, no sign-up.',
    }),
    alternates: alt('/irregular-verbs'),
  };
}

const GROUPS: { icon: string; mod: string; title: T; text: T }[] = [
  { icon: 'd-bolt', mod: 'mu-card--lime', title: { uk: 'Усі три однакові', ru: 'Все три одинаковые', en: 'All three the same' }, text: { uk: 'cut, put, let, hit, hurt, cost, set, shut. Виняток read: пишеться так само, а в минулому звучить як «ред».', ru: 'cut, put, let, hit, hurt, cost, set, shut. Исключение read: пишется так же, а в прошедшем звучит как «ред».', en: 'cut, put, let, hit, hurt, cost, set, shut. Except read: same spelling, but in the past it sounds like “red”.' } },
  { icon: 'd-spark', mod: 'mu-card--mustard', title: { uk: 'Закінчення -ought / -aught', ru: 'Окончание -ought / -aught', en: 'Ending in -ought / -aught' }, text: { uk: 'buy, bring, think, fight → bought, brought, thought, fought. teach, catch → taught, caught. Друга і третя форми однакові.', ru: 'buy, bring, think, fight → bought, brought, thought, fought. teach, catch → taught, caught. Вторая и третья формы одинаковые.', en: 'buy, bring, think, fight → bought, brought, thought, fought. teach, catch → taught, caught. The second and third forms are the same.' } },
  { icon: 'e-speak', mod: 'mu-card--sky', title: { uk: 'i → a → u' }, text: { uk: 'begin, drink, sing, ring, swim, sink: sing, sang, sung.', ru: 'begin, drink, sing, ring, swim, sink: sing, sang, sung.', en: 'begin, drink, sing, ring, swim, sink: sing, sang, sung.' } },
  { icon: 'e-globe', mod: 'mu-card--ink', title: { uk: '-ew → -own' }, text: { uk: 'blow, grow, know, throw, fly → blew, grew, knew, threw, flew → blown, grown, known, thrown, flown.' } },
];

export default function IrregularVerbsPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <SectionTabs group="grammar" active="/irregular-verbs" />
      <section className="mu-page-hero" style={{ paddingBottom: 24 }} data-stickers="4">
        <div className="mu-container">
          <Kit id="st-cat-cool" className="kit-hero" />
          <h1>{t({ uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' })} <em>{t({ uk: 'за алфавітом.', ru: 'по алфавиту.', en: 'from A to Z.' })}</em></h1>
          <HeroTip>{t({ uk: 'Натисни на будь-яку форму, щоб послухати вимову. Навушники праворуч озвучать усі три форми підряд.', ru: 'Нажми на любую форму, чтобы послушать произношение. Наушники справа озвучат все три формы подряд.', en: 'Tap any form to hear how it sounds. The headphones on the right play all three forms in a row.' })}</HeroTip>
          <SeoNote free={{ uk: 'Безкоштовно, без реєстрації', ru: 'Бесплатно, без регистрации', en: 'Free, no sign-up' }} sell={{ text: { uk: 'Хочеш вчити офлайн?', ru: 'Хочешь учить офлайн?', en: 'Want to learn offline?' }, links: [{ href: '/irregular-verbs/poster', label: { uk: 'Безкоштовний плакат PDF', ru: 'Бесплатный плакат PDF', en: 'Free PDF poster' } }, { href: '/shop/verbs-30', label: { uk: 'Картки для друку і план на 30 днів', ru: 'Карточки для печати и план на 30 дней', en: 'Printable cards and a 30-day plan' } }] }} />
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
            {t.lang === 'ru' ? (
              <h2 className="mu-section__title">Учи <em>группами,</em> а не списком.</h2>
            ) : t.lang === 'en' ? (
              <h2 className="mu-section__title">Learn <em>in groups,</em> not as a list.</h2>
            ) : (
              <h2 className="mu-section__title">Вчи <em>групами,</em> а не списком.</h2>
            )}
            <p className="mu-section__lead">{t({ uk: 'Багато дієслів змінюються за одним шаблоном.', ru: 'Многие глаголы меняются по одному шаблону.', en: 'Many verbs follow the same pattern.' })}</p>
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

      <RelatedPosts slugs={['yak-vyvchyty-nepravylni-diyeslova', 'nmt-anglijska-za-3-misyatsi']} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
