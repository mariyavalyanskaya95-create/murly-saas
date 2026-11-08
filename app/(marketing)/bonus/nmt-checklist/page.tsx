import Link from 'next/link';
import { alt } from '@/lib/seo';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import GameHub from '@/components/games/GameHub';
import Kit from '@/components/Kit';
import type { GameSet } from '@/components/games/engine';
import { NMT_BATTLE, NMT_COLLOC, COLLOC_VERBS, NMT_FALSE, NMT_WORDS } from '@/lib/content/nmt-bonus';
import { tr } from '@/lib/i18n-server';
import SeoNote from '@/components/SeoNote';

import HeroTip from '@/components/HeroTip';
// Бонус до PDF «Чек-лист підготовки до НМТ»: НМТ-батл, сталі вирази, слова-звʼязки, хибні друзі
export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Вправи до НМТ з англійської онлайн: пропуски, сталі вирази', ru: 'Упражнения к НМТ по английскому онлайн: пропуски, выражения', en: 'NMT English practice online: gap fills and collocations' }),
    description: t({ uk: 'Безкоштовні вправи до НМТ з англійської: граматика у форматі пропусків, сталі вирази make, do, take, слова-звʼязки і хибні друзі перекладача.', ru: 'Бесплатные упражнения к НМТ по английскому: грамматика в формате пропусков, выражения make, do, take, слова-связки и ложные друзья переводчика.', en: 'Free NMT English practice: gap-fill grammar, make/do/take collocations, linking words and false friends.' }),
    alternates: alt('/bonus/nmt-checklist'),
  };
}

export default function NmtChecklistBonusPage() {
  const t = tr();
  const links = NMT_WORDS[NMT_WORDS.length - 1].items;
  const SETS: GameSet[] = [
    { id: 'battle', title: t({ uk: 'НМТ-батл', ru: 'НМТ-батл', en: 'NMT battle' }), prompt: t({ uk: 'Обери слово для пропуску', ru: 'Выбери слово для пропуска', en: 'Choose the word for the gap' }), items: NMT_BATTLE.map((b) => ({ q: b.q, a: b.a, hint: b.why, options: [b.a, ...b.wrong] })) },
    { id: 'colloc', title: 'Make, do, take', prompt: t({ uk: 'Яке дієслово пасує?', ru: 'Какой глагол подходит?', en: 'Which verb fits?' }), items: NMT_COLLOC.map((c) => ({ q: c.q, a: c.a, options: [c.a, ...COLLOC_VERBS.filter((v) => v !== c.a).slice(0, 3)] })) },
    { id: 'links', title: t({ uk: 'Слова-звʼязки', ru: 'Слова-связки', en: 'Linking words' }), prompt: t({ uk: 'Як це англійською?', ru: 'Как это по-английски?', en: 'How do you say it in English?' }), items: links.map((x) => ({ q: x.uk, a: x.w, hint: x.ex })) },
    { id: 'false', title: t({ uk: 'Хибні друзі', ru: 'Ложные друзья', en: 'False friends' }), prompt: t({ uk: 'Що насправді означає слово?', ru: 'Что на самом деле значит слово?', en: 'What does the word really mean?' }), items: NMT_FALSE.map((f) => ({ q: f.w, a: f.m, hint: f.t })) },
  ];
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="6">
        <div className="mu-container">
          <Kit id="il-cat-exam" className="kit-hero" />
          <h1>{t({ uk: 'Тренування', ru: 'Тренировка', en: 'NMT' })} <em>{t({ uk: 'до НМТ.', ru: 'к НМТ.', en: 'practice.' })}</em></h1>
          <HeroTip>{t({ uk: 'НМТ-батл з 24 питань у форматі пропусків, сталі вирази, слова-звʼязки і хибні друзі перекладача.', ru: 'НМТ-батл из 24 вопросов в формате пропусков, устойчивые выражения, слова-связки и ложные друзья переводчика.', en: 'A 24-question NMT battle in the gap format, collocations, linking words and false friends.' })}</HeroTip>
          <SeoNote free={{ uk: 'Безкоштовно, без реєстрації', ru: 'Бесплатно, без регистрации', en: 'Free, no sign-up' }} sell={{ text: { uk: 'Повний план на 8 тижнів:', ru: 'Полный план на 8 недель:', en: 'The full 8-week plan:' }, links: [{ href: '/shop/nmt-checklist', label: { uk: 'Чек-лист підготовки до НМТ', ru: 'Чек-лист подготовки к НМТ', en: 'NMT prep checklist' } }, { href: '/shop/nmt-start', label: { uk: 'Старт до НМТ: 3 в 1', ru: 'Старт к НМТ: 3 в 1', en: 'NMT starter: 3 in 1' } }] }} />
          <Link href="/nmt" className="mu-btn mu-btn--lg">{t({ uk: 'Квізи у форматі НМТ', ru: 'Квизы в формате НМТ', en: 'NMT-style quizzes' })}</Link>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container"><GameHub sets={SETS} /></div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
