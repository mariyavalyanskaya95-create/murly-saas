import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import GameHub from '@/components/games/GameHub';
import type { GameSet } from '@/components/games/engine';
import { CORE_VERBS as VERBS } from '@/lib/irregular-verbs';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Ігри з неправильними дієсловами англійської: квіз, пари, анаграми', ru: 'Игры с неправильными глаголами английского: квиз, пары, анаграммы', en: 'English irregular verb games: quiz, pairs, anagrams' }),
    description: t({
      uk: 'Безкоштовні ігри, щоб вивчити три форми неправильних дієслів: квіз, пари, анаграми і картки.',
      ru: 'Бесплатные игры, чтобы выучить три формы неправильных глаголов: квиз, пары, анаграммы и карточки.',
      en: 'Free games to learn the three forms of irregular verbs: quiz, pairs, anagrams and flashcards.',
    }),
    alternates: { canonical: '/irregular-verbs/games' },
  };
}

export default function IrregularVerbsGamesPage() {
  const t = tr();
  const SETS: GameSet[] = [
    { id: 'past', title: 'Past Simple', prompt: t({ uk: 'Яка форма Past Simple?', ru: 'Какая форма Past Simple?', en: 'What is the Past Simple form?' }), items: VERBS.map((v) => ({ q: v.base, a: v.past, hint: v.uk })) },
    { id: 'pp', title: 'Past Participle', prompt: t({ uk: 'Яка третя форма (Past Participle)?', ru: 'Какая третья форма (Past Participle)?', en: 'What is the third form (Past Participle)?' }), items: VERBS.map((v) => ({ q: v.base, a: v.pp, hint: v.uk })) },
    { id: 'uk', title: t({ uk: 'Переклад', ru: 'Перевод', en: 'Translation' }), prompt: t({ uk: 'Як це англійською?', ru: 'Как это по-английски?', en: 'How do you say it in English?' }), items: VERBS.map((v) => ({ q: v.uk, a: v.base })) },
  ];
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-trophy" />{t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</span>
          <h1>{t({ uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' })} <em>{t({ uk: 'в іграх.', ru: 'в играх.', en: 'in games.' })}</em></h1>
          <p>{t({ uk: 'Обери, що тренуєш, і гру. Слова щоразу перемішуються.', ru: 'Выбери, что тренируешь, и игру. Слова каждый раз перемешиваются.', en: 'Choose what to practise and a game. The words are shuffled every time.' })}</p>
          <Link href="/irregular-verbs" className="mu-btn mu-btn--lg">{t({ uk: 'До таблиці', ru: 'К таблице', en: 'To the table' })}</Link>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <GameHub sets={SETS} />
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-glass" className="mu-ic mu-ic--cta" />
            {t.lang === 'ru' ? (
              <h2>Учителю: <em>свои игры</em> скоро.</h2>
            ) : t.lang === 'en' ? (
              <h2>Teachers: <em>your own games</em> are coming soon.</h2>
            ) : (
              <h2>Учителю: <em>свої ігри</em> скоро.</h2>
            )}
            <p>{t({ uk: 'Вводиш слова один раз, обираєш гру і відправляєш учням. Кабінет учителя вже в роботі.', ru: 'Вводишь слова один раз, выбираешь игру и отправляешь ученикам. Кабинет учителя уже в работе.', en: 'Enter the words once, choose a game and send it to your students. The teacher dashboard is in the works.' })}</p>
            <Link href="/for-teachers" className="mu-btn mu-btn--tomato mu-btn--lg">
              {t({ uk: 'Для вчителів', ru: 'Для учителей', en: 'For teachers' })}<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
