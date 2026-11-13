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
import Faq from '@/components/Faq';

import HeroTip from '@/components/HeroTip';
export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Таблиця неправильних дієслів англійської мови з перекладом і вимовою (PDF)', ru: 'Таблица неправильных глаголов английского языка с переводом и произношением (PDF)', en: 'English irregular verbs table: 3 forms, translation and audio' }),
    description: t({
      uk: 'Таблиця неправильних дієслів англійської мови: 137 дієслів за алфавітом, три форми, переклад українською, вимова кожної форми, ігри та версія для друку в PDF. Безкоштовно.',
      ru: 'Таблица неправильных глаголов английского языка: 137 глаголов по алфавиту, три формы, перевод, произношение каждой формы, игры и версия для печати в PDF. Бесплатно.',
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
          <h1>{t({ uk: 'Таблиця неправильних дієслів', ru: 'Таблица неправильных глаголов', en: 'Irregular verbs table' })} <em>{t({ uk: 'з перекладом.', ru: 'с переводом.', en: 'with translation.' })}</em></h1>
          <p className="va-intro">{t({ uk: 'Усі 137 неправильних дієслів англійської мови за алфавітом: три форми (V1, V2, V3), переклад українською і вимова кожної форми. Таблицю можна роздрукувати або зберегти в PDF.', ru: 'Все 137 неправильных глаголов английского языка по алфавиту: три формы (V1, V2, V3), перевод и произношение каждой формы. Таблицу можно распечатать или сохранить в PDF.', en: 'All 137 English irregular verbs from A to Z: three forms (V1, V2, V3), translation and audio for every form. Print the table or save it as a PDF.' })}</p>
          <div className="va-print">
            <Link href="/irregular-verbs/print" className="mu-btn mu-btn--lime">{t({ uk: 'Роздрукувати таблицю / PDF', ru: 'Распечатать таблицу / PDF', en: 'Print the table / PDF' })}</Link>
            <Link href="/irregular-verbs/games" className="mu-btn">{t({ uk: 'Ігри з дієсловами', ru: 'Игры с глаголами', en: 'Verb games' })}</Link>
          </div>
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


      <section className="mu-section">
        <div className="mu-container" style={{ maxWidth: 820 }}>
          <h2 className="mu-section__title">{t({ uk: 'Часті питання про', ru: 'Частые вопросы о', en: 'FAQ about' })} <em>{t({ uk: 'неправильні дієслова.', ru: 'неправильных глаголах.', en: 'irregular verbs.' })}</em></h2>
          <Faq items={[
            { q: t({ uk: 'Що таке неправильні дієслова в англійській мові?', ru: 'Что такое неправильные глаголы в английском языке?', en: 'What are irregular verbs in English?' }), a: t({ uk: 'Це дієслова, які в минулому часі й третій формі не отримують закінчення -ed. Наприклад, go, went, gone або buy, bought, bought. Їх треба запам’ятати, бо правила тут немає.', ru: 'Это глаголы, которые в прошедшем времени и третьей форме не получают окончание -ed. Например, go, went, gone или buy, bought, bought. Их нужно запомнить, потому что правила здесь нет.', en: 'They are verbs that do not add -ed in the past and the third form, for example go, went, gone or buy, bought, bought. You have to learn them, as there is no rule.' }) },
            { q: t({ uk: 'Що означають три форми дієслова?', ru: 'Что означают три формы глагола?', en: 'What are the three verb forms?' }), a: t({ uk: 'Перша форма (Infinitive) для теперішнього й майбутнього: I go. Друга (Past Simple) для минулого: I went. Третя (Past Participle) для Present Perfect і пасиву: I have gone, it was written.', ru: 'Первая форма (Infinitive) для настоящего и будущего: I go. Вторая (Past Simple) для прошедшего: I went. Третья (Past Participle) для Present Perfect и пассива: I have gone, it was written.', en: 'The first form (infinitive) is for the present and future: I go. The second (past simple) is for the past: I went. The third (past participle) is for the present perfect and the passive: I have gone, it was written.' }) },
            { q: t({ uk: 'Скільки неправильних дієслів треба знати?', ru: 'Сколько неправильных глаголов нужно знать?', en: 'How many irregular verbs do I need to know?' }), a: t({ uk: 'У таблиці 137 найуживаніших дієслів. Для повсякденної мови вистачає 60–80, для НМТ варто знати всю таблицю.', ru: 'В таблице 137 самых употребительных глаголов. Для повседневной речи хватает 60–80, для НМТ стоит знать всю таблицу.', en: 'The table has the 137 most common verbs. About 60 to 80 cover everyday English; for the NMT, learn the whole table.' }) },
            { q: t({ uk: 'Як швидко вивчити неправильні дієслова?', ru: 'Как быстро выучить неправильные глаголы?', en: 'How can I learn irregular verbs fast?' }), a: t({ uk: 'Вчіть групами за схожістю (sing, sang, sung; buy, bought, bought), по 5–7 дієслів на день, вголос і з прикладами. Закріплюйте в іграх: квіз, пари й анаграми на сторінці «Ігри з дієсловами».', ru: 'Учите группами по сходству (sing, sang, sung; buy, bought, bought), по 5–7 глаголов в день, вслух и с примерами. Закрепляйте в играх: квиз, пары и анаграммы на странице «Игры с глаголами».', en: 'Learn them in groups that look alike (sing, sang, sung; buy, bought, bought), 5 to 7 a day, out loud and with examples. Practise with the quiz, pairs and anagrams on the verb games page.' }) },
            { q: t({ uk: 'Чи можна роздрукувати таблицю?', ru: 'Можно ли распечатать таблицу?', en: 'Can I print the table?' }), a: t({ uk: 'Так. Натисни «Роздрукувати таблицю / PDF»: відкриється версія для друку на А4 з усіма 137 дієсловами або лише з найважливішими. У вікні друку можна обрати «Зберегти як PDF». Є ще безкоштовний плакат PDF.', ru: 'Да. Нажми «Распечатать таблицу / PDF»: откроется версия для печати на А4 со всеми 137 глаголами или только с самыми важными. В окне печати можно выбрать «Сохранить как PDF». Есть ещё бесплатный плакат PDF.', en: 'Yes. Tap “Print the table / PDF” to open an A4 print version with all 137 verbs or only the most common ones. Choose “Save as PDF” in the print dialog. There is also a free PDF poster.' }) },
          ]} />
        </div>
      </section>

      <RelatedPosts slugs={['yak-vyvchyty-nepravylni-diyeslova', 'nmt-anglijska-za-3-misyatsi']} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
