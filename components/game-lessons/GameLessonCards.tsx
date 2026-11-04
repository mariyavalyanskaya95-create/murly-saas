'use client';
// Уроки-ігри в загальних каталогах уроків (бібліотека вчителя, /lessons)
import Icon from '@/components/Icon';
import { GAME_LESSONS, gamePhoto } from '@/lib/game-lessons';
import { useT } from '../LangProvider';

export default function GameLessonCards() {
  const t = useT();
  return (
    <>
      {GAME_LESSONS.filter((l) => l.ready).map((l) => (
        <a key={l.id} href={`/game-lessons/${l.id}.html`} target="_blank" rel="noreferrer" className="lc lc--game">
          <div className="lc__top">
            <span className="lc__levels">{l.level.split('-').map((x) => <span key={x} className="lc__lv">{x}</span>)}</span>
            <span className="lc__age">{l.age} {t({ uk: 'років', ru: 'лет', en: 'y.o.' })}</span>
          </div>
          <div className="lc__pic gl-photocover" style={{ background: l.color }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gamePhoto(l, 480)} alt="" loading="lazy" /><b>{t({ uk: 'ГРА', ru: 'ИГРА', en: 'GAME' })}</b></div>
          <span className="lc__kind">{t({ uk: 'Урок-гра', ru: 'Урок-игра', en: 'Game lesson' })} · {l.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })} · {l.game}</span>
          <h3 className="lc__title">{l.title}</h3>
          <p className="lc__about">{t(l.topic)}. {t({ uk: 'XP за завдання, місії в грі та відео.', ru: 'XP за задания, миссии в игре и видео.', en: 'XP for tasks, in-game missions and videos.' })}</p>
          <div className="lc__tags"><span className="lc__tag">Grammar</span><span className="lc__tag">Speaking</span><span className="lc__tag lc__tag--topic">#{t(l.grammar)}</span></div>
          <div className="lc__foot"><span className="lc__has"><span><Icon id="e-trophy" />XP</span><span><Icon id="d-camera" /></span></span><span className="lc__go">{t({ uk: 'Грати', ru: 'Играть', en: 'Play' })}</span></div>
        </a>
      ))}
    </>
  );
}
