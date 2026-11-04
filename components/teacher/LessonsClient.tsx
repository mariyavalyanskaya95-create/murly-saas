'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import { useTeacher } from '@/lib/teacher-store';
import { AGES, FOCUS, LEVELS, emptyBlock, type Age, type Plan } from '@/lib/lesson';
import { useT } from '@/components/LangProvider';
import type { Lang, T } from '@/lib/i18n';
import { plural } from '@/lib/teacher-store';
import { toCard, type PlanCardData } from '@/lib/plan-card';
import MockCards, { mockFits } from '@/components/mock/MockCards';
import { MOCKS } from '@/lib/mock';
import { coverOf } from '@/lib/lesson-covers';
import GameLessonCards from '@/components/game-lessons/GameLessonCards';
import LessonCard, { readFavs } from '@/components/lesson/LessonCard';

// Підписи віку для показу (значення в AGES лишаються як є)
const AGE_T: Record<string, T> = {
  kids: { uk: 'Діти 6-11', ru: 'Дети 6-11', en: 'Kids 6-11' },
  teens: { uk: 'Підлітки 12-17', ru: 'Подростки 12-17', en: 'Teens 12-17' },
  adults: { uk: 'Дорослі', ru: 'Взрослые', en: 'Adults' },
};

export default function LessonsClient({ libCards }: { libCards: Record<Lang, PlanCardData[]> }) {
  const t = useT();
  const LIBRARY = libCards[t.lang] ?? libCards.uk;
  const { data, ready, addPlan } = useTeacher();
  const router = useRouter();
  const [tab, setTab] = useState<'mine' | 'lib'>('mine');
  const [age, setAge] = useState<Age | ''>('');
  const [level, setLevel] = useState('');
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState('');
  const [onlyFav, setOnlyFav] = useState(false);
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => { const f = () => setFavs(readFavs()); f(); window.addEventListener('murly:fav', f); return () => window.removeEventListener('murly:fav', f); }, []);

  const filter = (list: PlanCardData[]) => list.filter((p) => (!age || p.age === age) && (!level || p.level === level) && (!focus || (p.focus ?? []).includes(focus))
    && (!onlyFav || favs.includes(p.id))
    && (!q.trim() || `${p.title} ${p.topic ?? ''} ${p.about ?? ''}`.toLowerCase().includes(q.trim().toLowerCase())));
  const lib = useMemo(() => filter(LIBRARY), [age, level, q, focus, LIBRARY, onlyFav, favs]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!ready) return null;
  const mine = filter(data.plans.map(toCard));
  const showMocks = mockFits({ focus, age, level, q });

  const create = () => {
    const id = addPlan({ title: t({ uk: 'Новий урок', ru: 'Новый урок', en: 'New lesson' }), level: 'A2', age: 'teens', color: 'lime', blocks: [emptyBlock('heading'), emptyBlock('text')] });
    router.push(`/teacher/lessons/${id}`);
  };

  return (
    <div className="t-page">
      <div className="t-head">
        <div><p className="t-eyebrow">{t({ uk: 'Уроки', ru: 'Уроки', en: 'Lessons' })}</p><h1>{t({ uk: 'Уроки', ru: 'Уроки', en: 'Lessons' })}</h1></div>
        <div className="t-head__actions"><button className="mu-btn mu-btn--lime" onClick={create}>{t({ uk: '+ Новий урок', ru: '+ Новый урок', en: '+ New lesson' })}</button></div>
      </div>

      <div className="t-tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'mine'} className={`t-tab ${tab === 'mine' ? 'is-on' : ''}`} onClick={() => setTab('mine')}><Icon id="e-pencil" />{t({ uk: 'Мої уроки', ru: 'Мои уроки', en: 'My lessons' })} ({data.plans.length})</button>
        <button role="tab" aria-selected={tab === 'lib'} className={`t-tab ${tab === 'lib' ? 'is-on' : ''}`} onClick={() => setTab('lib')}><Icon id="e-book" />{t({ uk: 'Бібліотека Murly', ru: 'Библиотека Murly', en: 'Murly library' })} ({LIBRARY.length + MOCKS.length})</button>
      </div>

      <div className="le-filters">
        <label className="v-search"><Icon id="d-seo" /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ uk: 'Пошук за назвою або темою', ru: 'Поиск по названию или теме', en: 'Search by title or topic' })} aria-label={t({ uk: 'Пошук уроку', ru: 'Поиск урока', en: 'Search lessons' })} /></label>
        <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
          <button className={`g-chip ${!age ? 'is-on' : ''}`} onClick={() => setAge('')}>{t({ uk: 'Будь-який вік', ru: 'Любой возраст', en: 'Any age' })}</button>
          {AGES.map((a) => <button key={a.id} className={`g-chip ${age === a.id ? 'is-on' : ''}`} onClick={() => setAge(a.id)}>{AGE_T[a.id] ? t(AGE_T[a.id]) : a.label}</button>)}
        </div>
        <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
          <button className={`g-chip ${!level ? 'is-on' : ''}`} onClick={() => setLevel('')}>{t({ uk: 'Усі рівні', ru: 'Все уровни', en: 'All levels' })}</button>
          {LEVELS.map((l) => <button key={l} className={`g-chip ${level === l ? 'is-on' : ''}`} onClick={() => setLevel(l)}>{l}</button>)}
        </div>
        <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
          <button className={`g-chip ${!focus ? 'is-on' : ''}`} onClick={() => setFocus('')}>{t({ uk: 'Будь-який фокус', ru: 'Любой фокус', en: 'Any focus' })}</button>
          {FOCUS.map((f) => <button key={f} className={`g-chip ${focus === f ? 'is-on' : ''}`} onClick={() => setFocus(f)}>{f}</button>)}
          <button className={`g-chip ${onlyFav ? 'is-on' : ''}`} onClick={() => setOnlyFav(!onlyFav)}>&#9829; {t({ uk: 'Обране', ru: 'Избранное', en: 'Favourites' })}{favs.length ? ` (${favs.length})` : ''}</button>
        </div>
      </div>

      {tab === 'mine' && (
        mine.length
          ? <div className="lc-grid">{mine.map((p) => <LessonCard key={p.id} p={p} href={`/teacher/lessons/${p.id}`} />)}</div>
          : (
            <div className="t-card t-welcome">
              <Icon id="e-board" className="mu-ic t-welcome__ic" />
              <div>
                <h2>{data.plans.length ? t({ uk: 'Нічого не знайдено', ru: 'Ничего не найдено', en: 'Nothing found' }) : t({ uk: 'Створи перший урок', ru: 'Создай первый урок', en: 'Create your first lesson' })}</h2>
                <div className="t-head__actions" style={{ marginTop: 10 }}>
                  <button className="mu-btn mu-btn--lime" onClick={create}>{t({ uk: '+ Новий урок', ru: '+ Новый урок', en: '+ New lesson' })}</button>
                  <button className="mu-btn" onClick={() => setTab('lib')}>{t({ uk: 'Відкрити бібліотеку', ru: 'Открыть библиотеку', en: 'Open the library' })}</button>
                </div>
              </div>
            </div>
          )
      )}
      {tab === 'lib' && (
        lib.length || showMocks ? <div className="lc-grid">{!onlyFav && <GameLessonCards />}{lib.map((p) => <LessonCard key={p.id} p={p} href={`/teacher/lessons/${p.id}`} lib />)}{showMocks && !onlyFav && <MockCards />}</div> : <p className="t-empty">{t({ uk: 'Під ці фільтри уроків поки немає. Бібліотека поповнюється.', ru: 'Под эти фильтры уроков пока нет. Библиотека пополняется.', en: 'No lessons match these filters yet. The library keeps growing.' })}</p>
      )}
    </div>
  );
}
