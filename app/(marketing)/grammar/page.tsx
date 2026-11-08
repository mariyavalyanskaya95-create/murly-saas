import RelatedPosts from '@/components/blog/RelatedPosts';
import Link from 'next/link';
import { alt } from '@/lib/seo';
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
import SeoNote from '@/components/SeoNote';
import Kit from '@/components/Kit';

import HeroTip from '@/components/HeroTip';
export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Граматика англійської для початківців і до НМТ | Murly', ru: 'Грамматика английского для начинающих и к НМТ | Murly', en: 'English grammar for beginners and NMT prep | Murly' }),
    description: t({
      uk: 'Граматика англійської простими словами: часи, артиклі, модальні, умовні речення, пасив. Правила, приклади і по 100 завдань на тему. Безкоштовно.',
      ru: 'Грамматика английского простыми словами: времена, артикли, модальные, условные, пассив. Правила, примеры и по 100 заданий на тему. Бесплатно.',
      en: 'English grammar made simple: tenses, articles, modals, conditionals, the passive. Rules, examples and 100 tasks per topic. Free.',
    }),
    alternates: alt('/grammar'),
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
          <h1>{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })} <em>{t({ uk: 'без нудьги.', ru: 'без скуки.', en: 'without the boredom.' })}</em></h1>
          <HeroTip>{t({ uk: '52 теми: коли вживати, формула, пастки, сценка і 100 завдань з поясненнями.', ru: '52 темы: когда использовать, формула, ловушки, сценка и 100 заданий с объяснениями.', en: '52 topics: when to use it, the formula, traps, a scene and 100 tasks with explanations.' })}</HeroTip>
          <SeoNote free={{ uk: 'Безкоштовно, без реєстрації', ru: 'Бесплатно, без регистрации', en: 'Free, no sign-up' }} sell={{ text: { uk: 'Потрібно все на папері?', ru: 'Нужно всё на бумаге?', en: 'Want it all on paper?' }, links: [{ href: '/shop/grammar-a1b1', label: { uk: 'Уся базова граматика A1-B1', ru: 'Вся базовая грамматика A1-B1', en: 'All basic grammar A1-B1' } }, { href: '/shop/tenses', label: { uk: 'Усі 12 часів на 2 сторінках', ru: 'Все 12 времён на 2 страницах', en: 'All 12 tenses on 2 pages' } }] }} />
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

      <RelatedPosts slugs={['present-perfect-prostymy-slovamy', 'artykli-a-an-the']} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
