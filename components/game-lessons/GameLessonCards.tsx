'use client';
// Картки уроків за іграми в загальних списках уроків (бібліотека вчителя, /lessons)
import { GAME_LESSONS } from '@/lib/game-lessons';
import { useT } from '../LangProvider';

export default function GameLessonCards() {
  const t = useT();
  return (
    <>
      {GAME_LESSONS.filter((l) => l.ready).map((l) => (
        <a key={l.id} href={`/game-lessons/${l.id}.html`} target="_blank" rel="noreferrer" className="gr-card le-card has-cover gl-in-lib" style={{ background: '#fffdf6' }}>
          <span className="le-card__cover gl-pixcover" aria-hidden="true"><i /><i /><i /><i /><b>{t({ uk: 'ГРА', ru: 'ИГРА', en: 'GAME' })}</b></span>
          <span className="le-card__tags">
            <span className="gr-level">{l.level}</span>
            <span className="le-tag le-tag--game">{t({ uk: 'Урок-гра', ru: 'Урок-игра', en: 'Game lesson' })}</span>
            <span className="le-tag">{l.game}</span>
          </span>
          <span className="gr-card__title">{l.title}</span>
          <span className="gr-card__uk">{t(l.grammar)}</span>
          <span className="gr-card__lead">{l.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })} · XP, {t({ uk: 'місії, відео', ru: 'миссии, видео', en: 'missions, videos' })}</span>
        </a>
      ))}
    </>
  );
}
