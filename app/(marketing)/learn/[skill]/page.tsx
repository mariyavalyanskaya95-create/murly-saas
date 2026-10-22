import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { SKILLS, getSkill, LEVELS_ALL, type Level } from '@/lib/skills';
import { catalog } from '@/lib/catalog';
import { tr } from '@/lib/i18n-server';

export function generateMetadata({ params, searchParams }: { params: { skill: string }; searchParams: { level?: string } }): Metadata {
  const s = getSkill(params.skill);
  if (!s) return {};
  const t = tr();
  const lv = LEVELS_ALL.includes(searchParams.level as Level) ? ` ${searchParams.level}` : '';
  return {
    title: `${t(s.label)}${lv}: ${t({ uk: 'англійська онлайн', ru: 'английский онлайн', en: 'English online' })} | Murly`,
    description: t(s.text),
    alternates: { canonical: `/learn/${s.id}` },
  };
}

// Сторінка навички: фільтр рівня A1-C1 і всі матеріали сайту для цієї навички
export default function SkillPage({ params, searchParams }: { params: { skill: string }; searchParams: { level?: string } }) {
  const s = getSkill(params.skill);
  if (!s) notFound();
  const t = tr();
  const level = LEVELS_ALL.includes(searchParams.level as Level) ? (searchParams.level as Level) : null;
  const all = catalog(t.lang).filter((x) => x.skill === s.id);
  const shown = level ? all.filter((x) => x.level === level || x.level === 'all') : all;
  const groups = (level ? [level] : LEVELS_ALL).map((l) => ({ l, items: shown.filter((x) => x.level === l || (x.level === 'all' && l === (level ?? 'A1'))) })).filter((g) => g.items.length);

  return (
    <>
      <SiteNav />
      <nav className="sec-tabs" aria-label={t({ uk: 'Навички', ru: 'Навыки', en: 'Skills' })}>
        <div className="mu-container sec-tabs__in">
          {SKILLS.map((x) => (
            <Link key={x.id} href={`/learn/${x.id}${level && x.levels.includes(level) ? `?level=${level}` : ''}`} className={`sec-tab ${x.id === s.id ? 'is-on' : ''}`} aria-current={x.id === s.id ? 'page' : undefined}>
              <Icon id={x.icon} />{t(x.label)}
            </Link>
          ))}
        </div>
      </nav>
      <section className="mu-page-hero" style={{ paddingBottom: 12 }} data-stickers="4">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id={s.icon} />{t({ uk: 'Вчитися самому', ru: 'Учиться самому', en: 'Learn on your own' })}</span>
          <h1>{t(s.label)}{level && <em> {level}.</em>}</h1>
          <p>{t(s.text)}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="lv-chips" role="group" aria-label={t({ uk: 'Рівень', ru: 'Уровень', en: 'Level' })}>
            <Link href={`/learn/${s.id}`} className={`g-chip ${!level ? 'is-on' : ''}`}>{t({ uk: 'Усі рівні', ru: 'Все уровни', en: 'All levels' })} ({all.length})</Link>
            {s.levels.map((l) => {
              const n = all.filter((x) => x.level === l).length;
              return <Link key={l} href={`/learn/${s.id}?level=${l}`} className={`g-chip ${level === l ? 'is-on' : ''}`}>{l} ({n})</Link>;
            })}
          </div>
          {groups.length ? groups.map((g) => (
            <div key={g.l} className="lv-group">
              {!level && <h2 className="gr-h"><span className="gr-level">{g.l}</span></h2>}
              <div className="gr-grid">
                {g.items.map((x) => (
                  <Link key={`${x.href}-${x.skill}`} href={x.href} className={`gr-card gr--${x.color} le-card`}>
                    <span className="le-card__tags">
                      {x.level !== 'all' && <span className="gr-level">{x.level}</span>}
                      <span className="le-tag">{t(x.kind)}</span>
                      {x.minutes ? <span className="le-tag">{x.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span> : null}
                    </span>
                    <span className="gr-card__title">{x.title}</span>
                    {x.text && <span className="gr-card__lead">{x.text}</span>}
                  </Link>
                ))}
              </div>
            </div>
          )) : <p className="t-empty">{t({ uk: 'Для цього рівня матеріали ще готуються.', ru: 'Для этого уровня материалы ещё готовятся.', en: 'Materials for this level are coming soon.' })}</p>}
        </div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
