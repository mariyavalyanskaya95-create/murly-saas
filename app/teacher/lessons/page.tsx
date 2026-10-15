'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import { useTeacher } from '@/lib/teacher-store';
import { LIBRARY } from '@/lib/library';
import { AGES, FOCUS, LEVELS, emptyBlock, type Age, type Plan } from '@/lib/lesson';

function PlanCard({ p, lib }: { p: Plan; lib?: boolean }) {
  return (
    <Link href={`/teacher/lessons/${p.id}`} className={`gr-card gr--${p.color} le-card`}>
      <span className="le-card__tags">
        <span className="gr-level">{p.level}</span>
        <span className="le-tag">{AGES.find((a) => a.id === p.age)?.label}</span>
        {lib && <span className="le-tag le-tag--murly">Murly</span>}
        {(p.focus ?? []).slice(0, 2).map((f) => <span key={f} className="le-tag">{f}</span>)}
      </span>
      <span className="gr-card__title">{p.title || 'Без назви'}</span>
      {p.topic && <span className="gr-card__uk">{p.topic}</span>}
      <span className="gr-card__lead">{p.duration ? `${p.duration} хв · ` : ""}{p.blocks.length} блоків</span>
    </Link>
  );
}

export default function LessonsPage() {
  const { data, ready, addPlan } = useTeacher();
  const router = useRouter();
  const [tab, setTab] = useState<'mine' | 'lib'>('mine');
  const [age, setAge] = useState<Age | ''>('');
  const [level, setLevel] = useState('');
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState('');

  const filter = (list: Plan[]) => list.filter((p) => (!age || p.age === age) && (!level || p.level === level) && (!focus || (p.focus ?? []).includes(focus))
    && (!q.trim() || `${p.title} ${p.topic ?? ''}`.toLowerCase().includes(q.trim().toLowerCase())));
  const lib = useMemo(() => filter(LIBRARY), [age, level, q, focus]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!ready) return null;
  const mine = filter(data.plans);

  const create = () => {
    const id = addPlan({ title: 'Новий урок', level: 'A2', age: 'teens', color: 'lime', blocks: [emptyBlock('heading'), emptyBlock('text')] });
    router.push(`/teacher/lessons/${id}`);
  };

  return (
    <div className="t-page">
      <div className="t-head">
        <div><p className="t-eyebrow">Уроки</p><h1>Уроки</h1></div>
        <div className="t-head__actions"><button className="mu-btn mu-btn--lime" onClick={create}>+ Новий урок</button></div>
      </div>

      <div className="t-tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'mine'} className={`t-tab ${tab === 'mine' ? 'is-on' : ''}`} onClick={() => setTab('mine')}><Icon id="e-pencil" />Мої уроки ({data.plans.length})</button>
        <button role="tab" aria-selected={tab === 'lib'} className={`t-tab ${tab === 'lib' ? 'is-on' : ''}`} onClick={() => setTab('lib')}><Icon id="e-book" />Бібліотека Murly ({LIBRARY.length})</button>
      </div>

      <div className="le-filters">
        <label className="v-search"><Icon id="d-seo" /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Пошук за назвою або темою" aria-label="Пошук уроку" /></label>
        <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
          <button className={`g-chip ${!age ? 'is-on' : ''}`} onClick={() => setAge('')}>Будь-який вік</button>
          {AGES.map((a) => <button key={a.id} className={`g-chip ${age === a.id ? 'is-on' : ''}`} onClick={() => setAge(a.id)}>{a.label}</button>)}
        </div>
        <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
          <button className={`g-chip ${!level ? 'is-on' : ''}`} onClick={() => setLevel('')}>Усі рівні</button>
          {LEVELS.map((l) => <button key={l} className={`g-chip ${level === l ? 'is-on' : ''}`} onClick={() => setLevel(l)}>{l}</button>)}
        </div>
        <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
          <button className={`g-chip ${!focus ? 'is-on' : ''}`} onClick={() => setFocus('')}>Будь-який фокус</button>
          {FOCUS.map((f) => <button key={f} className={`g-chip ${focus === f ? 'is-on' : ''}`} onClick={() => setFocus(f)}>{f}</button>)}
        </div>
      </div>

      {tab === 'mine' && (
        mine.length
          ? <div className="gr-grid">{mine.map((p) => <PlanCard key={p.id} p={p} />)}</div>
          : (
            <div className="t-card t-welcome">
              <Icon id="e-board" className="mu-ic t-welcome__ic" />
              <div>
                <h2>{data.plans.length ? 'Нічого не знайдено' : 'Створи перший урок'}</h2>
                <p className="t-muted">Збирай урок з блоків: текст, слова, правило, вправи з автоперевіркою, відео, питання для розмови. Або візьми готовий з бібліотеки і підлаштуй під себе.</p>
                <div className="t-head__actions" style={{ marginTop: 10 }}>
                  <button className="mu-btn mu-btn--lime" onClick={create}>+ Новий урок</button>
                  <button className="mu-btn" onClick={() => setTab('lib')}>Відкрити бібліотеку</button>
                </div>
              </div>
            </div>
          )
      )}
      {tab === 'lib' && (
        lib.length ? <div className="gr-grid">{lib.map((p) => <PlanCard key={p.id} p={p} lib />)}</div> : <p className="t-empty">Під ці фільтри уроків поки немає. Бібліотека поповнюється.</p>
      )}
    </div>
  );
}
