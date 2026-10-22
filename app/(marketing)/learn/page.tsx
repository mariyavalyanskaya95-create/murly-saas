import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { SKILLS } from '@/lib/skills';
import { catalog } from '@/lib/catalog';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Англійська самостійно: слухати, читати, писати, говорити, граматика | Murly', ru: 'Английский самостоятельно: аудирование, чтение, письмо, говорение, грамматика | Murly', en: 'Learn English on your own: listening, reading, writing, speaking, grammar | Murly' }),
    description: t({ uk: 'Усі безкоштовні матеріали Murly за навичками і рівнями A1-C1.', ru: 'Все бесплатные материалы Murly по навыкам и уровням A1-C1.', en: 'All free Murly materials by skill and level, A1 to C1.' }),
    alternates: { canonical: '/learn' },
  };
}

export default function LearnPage() {
  const t = tr();
  const all = catalog(t.lang);
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-book" />{t({ uk: 'Вчитися самому', ru: 'Учиться самому', en: 'Learn on your own' })}</span>
          <h1>{t({ uk: 'Обери навичку', ru: 'Выбери навык', en: 'Pick a skill' })} <em>{t({ uk: 'і свій рівень.', ru: 'и свой уровень.', en: 'and your level.' })}</em></h1>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container skill-grid">
          {SKILLS.map((s) => (
            <div key={s.id} className="skill-card">
              <Link href={`/learn/${s.id}`} className="skill-card__head"><span className="gr-card__ic"><Icon id={s.icon} /></span><b>{t(s.label)}</b></Link>
              <p className="t-muted">{t(s.text)}</p>
              <div className="skill-card__lv">
                {s.levels.map((l) => <Link key={l} href={`/learn/${s.id}?level=${l}`} className="g-chip">{l} <small>{all.filter((x) => x.skill === s.id && x.level === l).length}</small></Link>)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
