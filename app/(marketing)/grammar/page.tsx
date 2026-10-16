import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { GRAMMAR as GRAMMAR_UK } from '@/lib/grammar';
import { localizeGrammar } from '@/lib/content/grammar';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Граматика англійської простими словами: правила, приклади, вправи', ru: 'Грамматика английского простыми словами: правила, примеры, упражнения', en: 'English grammar made simple: rules, examples, exercises' }),
    description: t({
      uk: 'Часи, артиклі, ступені порівняння, умовні речення і пасив. Коротко, з прикладами і перекладом, а після кожної теми квіз.',
      ru: 'Времена, артикли, степени сравнения, условные предложения и пассив. Коротко, с примерами и переводом, а после каждой темы квиз.',
      en: 'Tenses, articles, comparatives, conditionals and the passive. Short, with examples and translations, and a quiz after every topic.',
    }),
    alternates: { canonical: '/grammar' },
  };
}

const LEVELS = ['A1', 'A2', 'B1', 'B2'] as const;
const LEVEL_NAMES: Record<(typeof LEVELS)[number], T> = {
  A1: { uk: 'Старт', ru: 'Старт', en: 'Starter' },
  A2: { uk: 'Базовий', ru: 'Базовый', en: 'Elementary' },
  B1: { uk: 'Середній', ru: 'Средний', en: 'Intermediate' },
  B2: { uk: 'Вище середнього', ru: 'Выше среднего', en: 'Upper-intermediate' },
};

export default function GrammarIndexPage() {
  const t = tr();
  const GRAMMAR = localizeGrammar(GRAMMAR_UK, t.lang);
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id="il-cat-read" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="e-book" />{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</span>
          <h1>{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })} <em>{t({ uk: 'без нудьги.', ru: 'без скуки.', en: 'without the boredom.' })}</em></h1>
          <p>{t({ uk: 'Кожна тема на одній сторінці: формула, коли вживати, приклади з перекладом, типові помилки і квіз наприкінці.', ru: 'Каждая тема на одной странице: формула, когда употреблять, примеры с переводом, типичные ошибки и квиз в конце.', en: 'Each topic on one page: the formula, when to use it, examples with translations, common mistakes and a quiz at the end.' })}</p>
          <Link href="/irregular-verbs" className="mu-btn mu-btn--lg">{t({ uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' })}</Link>
        </div>
      </section>

      {LEVELS.filter((l) => GRAMMAR.some((g) => g.level === l)).map((level) => (
        <section key={level} className="mu-section" style={{ paddingTop: 0 }}>
          <div className="mu-container">
            <h2 className="gr-h"><span className="gr-level">{level}</span>{t(LEVEL_NAMES[level])}</h2>
            <div className="gr-grid">
              {GRAMMAR.filter((g) => g.level === level).map((g) => (
                <Link key={g.slug} href={`/grammar/${g.slug}`} className={`gr-card gr--${g.color}`}>
                  <span className="gr-card__ic"><Icon id={g.icon} /></span>
                  <span className="gr-card__title">{g.title}</span>
                  <span className="gr-card__uk">{g.uk}</span>
                  <span className="gr-card__lead">{g.lead}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <SiteFooter />
      <Stickers />
    </>
  );
}
