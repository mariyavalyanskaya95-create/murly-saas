import type { Metadata } from 'next';
import { alt } from '@/lib/seo';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SendToStudent from '@/components/game-lessons/SendToStudent';
import { GAME_LESSONS } from '@/lib/game-lessons';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Уроки англійської за іграми: Minecraft, Roblox та інші | Murly', ru: 'Уроки английского по играм: Minecraft, Roblox и другие | Murly', en: 'English lessons based on games: Minecraft, Roblox and more | Murly' }),
    description: t({ uk: 'Готові інтерактивні уроки англійської для дітей і підлітків за улюбленими іграми: граматика, слова, місії в грі та відео.', ru: 'Готовые интерактивные уроки английского для детей и подростков по любимым играм: грамматика, слова, миссии в игре и видео.', en: 'Ready-made interactive English lessons for kids and teens based on their favourite games: grammar, words, in-game missions and videos.' }),
    alternates: alt('/game-lessons'),
  };
}

export default function GameLessonsPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-trophy" />{t({ uk: 'Для вчителів', ru: 'Для учителей', en: 'For teachers' })}</span>
          <h1>{t({ uk: 'Уроки за іграми', ru: 'Уроки по играм', en: 'Game-based lessons' })}</h1>
          <p>{t({ uk: 'Граматика й слова на матеріалі ігор, у які учні грають самі. Місії в грі, відео й рахунок XP.', ru: 'Грамматика и слова на материале игр, в которые ученики играют сами. Миссии в игре, видео и счёт XP.', en: 'Grammar and vocabulary through the games students already play. In-game missions, videos and an XP score.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container gl-grid">
          {GAME_LESSONS.map((l) => (
            <article key={l.id} className={`gl-card ${l.ready ? '' : 'is-soon'}`}>
              <div className="gl-card__top" style={{ background: l.color }}>
                <span className="gl-card__game">{l.game}</span>
                <span className="gl-card__px" aria-hidden="true" />
              </div>
              <div className="gl-card__body">
                <h2>{l.title}</h2>
                <p className="gl-card__gr">{t(l.grammar)}</p>
                <p className="t-muted">{t(l.topic)}</p>
                <div className="gl-card__meta"><span>{l.level}</span><span>{l.age} {t({ uk: 'років', ru: 'лет', en: 'y.o.' })}</span><span>{l.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span></div>
                {l.ready ? (
                  <div className="gl-card__act">
                    <a className="mu-btn mu-btn--lime" href={`/game-lessons/${l.id}.html`} target="_blank" rel="noreferrer">{t({ uk: 'Відкрити урок', ru: 'Открыть урок', en: 'Open the lesson' })}</a>
                    <SendToStudent url={`/game-lessons/${l.id}.html`} name={`${l.title} (${l.game})`} />
                  </div>
                ) : <span className="gl-card__soon">{t({ uk: 'Скоро', ru: 'Скоро', en: 'Coming soon' })}</span>}
              </div>
            </article>
          ))}
        </div>
        <p className="mu-container t-muted" style={{ marginTop: 24, fontSize: 14 }}>{t({ uk: 'Назви ігор належать їхнім власникам. Murly не пов’язаний з розробниками ігор. Ілюстрації в уроках наші, відео з офіційних каналів.', ru: 'Названия игр принадлежат их владельцам. Murly не связан с разработчиками игр. Иллюстрации в уроках наши, видео с официальных каналов.', en: 'Game names belong to their owners. Murly is not affiliated with the game developers. Lesson illustrations are our own, videos come from official channels.' })}</p>
      </section>
      <SiteFooter />
    </>
  );
}
