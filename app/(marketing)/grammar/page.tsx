import Link from 'next/link';
import SectionTabs from '@/components/SectionTabs';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { DRILLS } from '@/lib/drills';
import { localizeDrill } from '@/lib/content/drills';
import { GRAMMAR_GROUPS } from '@/lib/grammar-groups';
import { tr } from '@/lib/i18n-server';
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


export default function GrammarIndexPage() {
  const t = tr();
  const DR = localizeDrill(DRILLS, t.lang);
  return (
    <>
      <SiteNav />
      <SectionTabs group="grammar" active="/grammar" />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id="il-cat-read" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="e-book" />{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</span>
          <h1>{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })} <em>{t({ uk: 'без нудьги.', ru: 'без скуки.', en: 'without the boredom.' })}</em></h1>
          <p>{t({ uk: '52 теми простими словами: коли вживати, формула, головні пастки, смішна сценка і 100 завдань з поясненнями.', ru: '52 темы простыми словами: когда использовать, формула, главные ловушки, смешная сценка и 100 заданий с объяснениями.', en: '52 topics in plain words: when to use them, the formula, the main traps, a funny scene and 100 tasks with explanations.' })}</p>
          <Link href="/grammar/trainer" className="mu-btn mu-btn--lime mu-btn--lg">{t({ uk: 'Тренажери на 100 завдань', ru: 'Тренажёры на 100 заданий', en: '100-task trainers' })}</Link>{' '}
          <Link href="/irregular-verbs" className="mu-btn mu-btn--lg">{t({ uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' })}</Link>
        </div>
      </section>

      {/* усі теми блоками: часи, модальні, займенники, прийменники... */}
      <section className="mu-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="mu-container gr-jump">
          {GRAMMAR_GROUPS.map((g) => <a key={g.id} href={`#${g.id}`} className="g-chip"><Icon id={g.icon} />{t(g.title)} <small>{g.slugs.length}</small></a>)}
        </div>
      </section>
      {GRAMMAR_GROUPS.map((g) => (
        <section key={g.id} id={g.id} className="mu-section gr-block" style={{ paddingTop: 24 }}>
          <div className="mu-container">
            <h2 className="gr-h"><Icon id={g.icon} />{t(g.title)}</h2>
            <div className="gr-grid">
              {g.slugs.map((slug) => DR.find((d) => d.slug === slug)).filter(Boolean).map((d) => (
                <Link key={d!.slug} href={`/grammar/trainer/${d!.slug}`} className={`gr-card gr--${d!.color === 'pink' ? 'tomato' : d!.color}`}>
                  <span className="gr-card__ic"><Icon id={d!.icon} /></span>
                  <span className="gr-level gr-card__lv">{d!.level}</span>
                  <span className="gr-card__title">{d!.title}</span>
                  <span className="gr-card__uk">{d!.uk}</span>
                  <span className="gr-card__lead">{d!.lead}</span>
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
