import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SectionTabs from '@/components/SectionTabs';
import SiteFooter from '@/components/SiteFooter';
import { SERIES } from '@/lib/series';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return { title: t({ uk: 'Аудіосеріали англійською з озвучкою | Murly', ru: 'Аудиосериалы на английском с озвучкой | Murly', en: 'English audio series | Murly' }), description: t({ uk: 'Історії англійською з продовженням: серії по 4–5 хвилин, голоси персонажів, слова й питання до кожної серії.', ru: 'Истории на английском с продолжением: серии по 4–5 минут, голоса персонажей, слова и вопросы к каждой серии.', en: 'English stories in episodes with character voices, words and questions.' }), alternates: { canonical: '/series' } };
}

export default function SeriesHub() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <SectionTabs group="read" active="/series" />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }}>
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-head" />{t({ uk: 'Аудіосеріали', ru: 'Аудиосериалы', en: 'Audio series' })}</span>
          <h1>{t({ uk: 'Слухай історію', ru: 'Слушай историю', en: 'Listen to the story' })} <em>{t({ uk: 'серія за серією.', ru: 'серия за серией.', en: 'episode by episode.' })}</em></h1>
          <p>{t({ uk: 'Кожна серія 4–5 хвилин, у кожного персонажа свій голос. Після серії слова й питання. Кінцівка, після якої хочеться слухати далі.', ru: 'Каждая серия 4–5 минут, у каждого персонажа свой голос. После серии слова и вопросы. Концовка, после которой хочется слушать дальше.', en: 'Each episode is 4–5 minutes, every character has a voice. Words and questions after each one, and a cliffhanger ending.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container gr-grid">
          {SERIES.map((s) => (
            <Link key={s.slug} href={`/series/${s.slug}`} className={`gr-card gr--${s.color}`}>
              <span className="gr-card__ic"><Icon id="e-head" /></span>
              <span className="gr-level">{s.level} · {t(s.age)} · {s.episodes.length} {t({ uk: 'серій', ru: 'серий', en: 'episodes' })}</span>
              <span className="gr-card__title">{s.title}</span>
              <span className="gr-card__lead">{t(s.about)}</span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
