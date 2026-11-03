'use client';
// Картка уроку в каталозі: фото, рівень, коротко про урок, навички й тема, що всередині, «Відкрити»
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { useT } from '@/components/LangProvider';
import { coverOf } from '@/lib/lesson-covers';
import type { PlanCardData } from '@/lib/plan-card';
import type { T } from '@/lib/i18n';

const AGE_T: Record<string, T> = {
  kids: { uk: 'Діти 6-11', ru: 'Дети 6-11', en: 'Kids 6-11' },
  teens: { uk: 'Підлітки 12-17', ru: 'Подростки 12-17', en: 'Teens 12-17' },
  adults: { uk: 'Дорослі', ru: 'Взрослые', en: 'Adults' },
};
const FAV = 'murly:fav-lessons';
export const readFavs = (): string[] => { try { return JSON.parse(localStorage.getItem(FAV) ?? '[]'); } catch { return []; } };

export default function LessonCard({ p, href, lib, fav = true }: { p: PlanCardData; href: string; lib?: boolean; fav?: boolean }) {
  const t = useT();
  const [on, setOn] = useState(false);
  useEffect(() => { setOn(readFavs().includes(p.id)); }, [p.id]);
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const list = readFavs(); const next = on ? list.filter((x) => x !== p.id) : [...list, p.id];
    try { localStorage.setItem(FAV, JSON.stringify(next)); } catch { /* */ }
    setOn(!on); window.dispatchEvent(new Event('murly:fav'));
  };
  const cover = coverOf(p.id, 520);
  const isDrill = p.id.startsWith('lib-drill-');
  const kind = isDrill ? t({ uk: 'Тренажер', ru: 'Тренажёр', en: 'Practice drill' }) : /^lib-[lr]-/.test(p.id) ? t({ uk: 'Практика', ru: 'Практика', en: 'Practice' }) : t({ uk: 'Урок', ru: 'Урок', en: 'Lesson' });
  return (
    <Link href={href} className="lc">
      <div className="lc__top">
        <span className="lc__levels">{p.level.split('-').map((l) => <span key={l} className="lc__lv">{l}</span>)}</span>
        <span className="lc__age">{AGE_T[p.age] ? t(AGE_T[p.age]) : p.age}</span>
        {fav && <button type="button" className={`lc__fav ${on ? 'is-on' : ''}`} onClick={toggle} aria-pressed={on} aria-label={on ? t({ uk: 'Прибрати з обраного', ru: 'Убрать из избранного', en: 'Remove from favourites' }) : t({ uk: 'В обране', ru: 'В избранное', en: 'Add to favourites' })}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-8.6C1.3 8.5 3 5 6.4 5c2 0 3.3 1.2 4 2.3h3.2C14.3 6.2 15.6 5 17.6 5 21 5 22.7 8.5 21.2 11.4 19 15.6 12 20 12 20z" /></svg>
        </button>}
      </div>
      <div className={`lc__pic gr--${p.color}`}>{cover ? <img src={cover} alt="" loading="lazy" /> : <Icon id="e-book" />}</div>
      <span className="lc__kind">{kind}{p.duration ? ` · ${p.duration} ${t({ uk: 'хв', ru: 'мин', en: 'min' })}` : ''}{lib ? ' · Murly' : ''}</span>
      <h3 className="lc__title">{p.title || t({ uk: 'Без назви', ru: 'Без названия', en: 'Untitled' })}</h3>
      {p.about && <p className="lc__about">{p.about}</p>}
      <div className="lc__tags">
        {(p.focus ?? []).map((f) => <span key={f} className="lc__tag">{f === 'НМТ' && t.lang === 'en' ? 'NMT' : f}</span>)}
        {p.topic && <span className="lc__tag lc__tag--topic">#{p.topic.replace(/^Граматика: |^Грамматика: |^Grammar: /, '')}</span>}
      </div>
      <div className="lc__foot">
        <span className="lc__has">
          {!!p.words && <span title={t({ uk: 'Слова', ru: 'Слова', en: 'Words' })}><Icon id="e-abc" />{p.words}</span>}
          {!!p.tasks && <span title={t({ uk: 'Завдання', ru: 'Задания', en: 'Tasks' })}><Icon id="e-pencil" />{p.tasks}</span>}
          {p.has?.includes('video') && <span title={t({ uk: 'Відео', ru: 'Видео', en: 'Video' })}><Icon id="d-camera" /></span>}
          {p.has?.includes('audio') && <span title={t({ uk: 'Аудіювання', ru: 'Аудирование', en: 'Listening' })}><Icon id="e-head" /></span>}
          {p.has?.includes('game') && <span title={t({ uk: 'Гра', ru: 'Игра', en: 'Game' })}><Icon id="e-trophy" /></span>}
        </span>
        <span className="lc__go">{t({ uk: 'Відкрити', ru: 'Открыть', en: 'Open' })}</span>
      </div>
    </Link>
  );
}
