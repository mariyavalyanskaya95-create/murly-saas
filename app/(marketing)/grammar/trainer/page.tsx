import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { DRILLS } from '@/lib/drills';
import { tr } from '@/lib/i18n-server';
import { localizeDrill } from '@/lib/content/drills';

export function generateMetadata(): Metadata {
  const L = tr();
  return {
    title: L({ uk: 'Тренажери граматики англійської: по 100 завдань на тему | Murly', ru: 'Тренажёры грамматики английского: по 100 заданий на тему | Murly', en: 'English grammar trainers: 100 tasks per topic | Murly' }),
    description: L({ uk: 'Коротка теорія, головні пастки і 100 завдань з поясненням кожної відповіді: часи, артиклі, модальні, умовні речення, пасив.', ru: 'Короткая теория, главные ловушки и 100 заданий с объяснением каждого ответа: времена, артикли, модальные, условные, пассив.', en: 'Short theory, the main traps and 100 tasks with explanations: tenses, articles, modals, conditionals, the passive.' }),
    alternates: { canonical: '/grammar/trainer' },
  };
}

export default function TrainerIndex() {
  const L = tr();
  const levels = ['A1', 'A2', 'B1'] as const;
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-trophy" />{L({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</span>
          <h1>{L({ uk: 'Тренажери', ru: 'Тренажёры', en: 'Trainers' })} <em>{L({ uk: 'на 100 завдань.', ru: 'на 100 заданий.', en: 'with 100 tasks.' })}</em></h1>
          <p>{L({ uk: 'У кожному: коли вживаємо, форми + / − / ?, головна пастка, маркери і 5 раундів по 20 завдань. Після кожної відповіді пояснення «Чому так?».', ru: 'В каждом: когда употребляем, формы + / − / ?, главная ловушка, маркеры и 5 раундов по 20 заданий. После каждого ответа объяснение «Почему так?».', en: 'Each one has: when to use it, + / − / ? forms, the main trap, signal words and 5 rounds of 20 tasks, with a “Why?” after every answer.' })}</p>
          <Link href="/grammar" className="mu-btn mu-btn--lg">{L({ uk: 'Правила граматики', ru: 'Правила грамматики', en: 'Grammar rules' })}</Link>
        </div>
      </section>
      {levels.map((lv) => (
        <section key={lv} className="mu-section" style={{ paddingTop: 0 }}>
          <div className="mu-container">
            <h2 className="gr-h"><span className="gr-level">{lv}</span></h2>
            <div className="gr-grid">
              {localizeDrill(DRILLS, L.lang).filter((d) => d.level === lv).map((d) => (
                <Link key={d.slug} href={`/grammar/trainer/${d.slug}`} className={`gr-card gr--${d.color === 'pink' ? 'tomato' : d.color}`}>
                  <span className="gr-card__ic"><Icon id={d.icon} /></span>
                  <span className="gr-card__title">{d.title}</span>
                  <span className="gr-card__uk">{d.uk}</span>
                  <span className="gr-card__lead">{d.lead}</span>
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
