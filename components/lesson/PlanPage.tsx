'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import LessonView from './LessonView';
import LessonEditor from './LessonEditor';
import { useTeacher } from '@/lib/teacher-store';
import { getLibraryPlan } from '@/lib/library';
import { AGES, lessonSections, type Plan } from '@/lib/lesson';
import { maxScore } from '@/lib/exercise';

function defaultDue() {
  const d = new Date(); d.setDate(d.getDate() + 3); d.setHours(20, 0, 0, 0);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

function SendBox({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const { data, addHomework } = useTeacher();
  const [ids, setIds] = useState<string[]>([]);
  const [due, setDue] = useState(defaultDue());
  const [done, setDone] = useState(false);
  if (!data.students.length) return <div className="t-card"><p className="t-muted">Спочатку додай учнів.</p></div>;
  const send = () => {
    ids.forEach((studentId) => addHomework({
      studentId, kind: 'lesson', title: plan.title || 'Урок',
      items: plan.blocks, due: due ? new Date(due).toISOString() : undefined,
    }));
    setDone(true);
  };
  return (
    <div className="t-card le-send">
      <h2><Icon id="d-send" />Відправити урок учням</h2>
      {done ? (
        <><p className="t-pos">Готово! Урок з’явився в кабінеті учнів як домашка.</p><button className="mu-btn t-btn-sm" onClick={onClose}>Закрити</button></>
      ) : (
        <>
          <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
            {data.students.map((s) => (
              <button key={s.id} className={`g-chip ${ids.includes(s.id) ? 'is-on' : ''}`}
                onClick={() => setIds(ids.includes(s.id) ? ids.filter((x) => x !== s.id) : [...ids, s.id])}>{s.name}</button>
            ))}
          </div>
          <div className="t-form">
            <label>Здати до<input type="datetime-local" value={due} onChange={(e) => setDue(e.target.value)} /></label>
            <div className="t-form__actions">
              <button className="mu-btn t-btn-sm" onClick={onClose}>Скасувати</button>
              <button className="mu-btn mu-btn--lime" disabled={!ids.length} onClick={send}>Відправити{ids.length > 1 ? ` (${ids.length})` : ''}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function PlanPage({ id }: { id: string }) {
  const { data, ready, addPlan, updatePlan, removePlan } = useTeacher();
  const router = useRouter();
  const lib = id.startsWith('lib-') ? getLibraryPlan(id) : undefined;
  const own = data.plans.find((p) => p.id === id);
  const [draft, setDraft] = useState<Plan | null>(null);
  const [mode, setMode] = useState<'edit' | 'view'>('view');
  const [sending, setSending] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const viewRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { if (own && !draft) { setDraft(own); if (!own.blocks.length) setMode('edit'); } }, [own, draft]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  if (!ready) return null;
  const plan = lib ?? draft;
  if (!plan) return <div className="t-page"><div className="t-card"><h2>Урок не знайдено</h2><Link href="/teacher/lessons" className="mu-btn">До уроків</Link></div></div>;

  // автозбереження з паузою, щоб не смикати базу на кожну літеру
  const change = (patch: Partial<Plan>) => {
    const next = { ...(draft as Plan), ...patch };
    setDraft(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => updatePlan(next.id, patch.blocks ? { ...patch, blocks: next.blocks } : patch), 700);
  };
  const copy = () => {
    const nid = addPlan({ title: plan.title, level: plan.level, age: plan.age, topic: plan.topic, color: plan.color, blocks: plan.blocks, source: lib ? lib.id : undefined });
    router.push(`/teacher/lessons/${nid}`);
  };
  const present = () => { viewRef.current?.requestFullscreen?.().catch(() => {}); };
  const points = maxScore(lessonSections(plan.blocks));

  return (
    <div className="t-page">
      <Link href="/teacher/lessons" className="t-back">← Усі уроки</Link>
      <div className={`le-head gr--${plan.color}`}>
        <div>
          <span className="le-head__meta">{plan.level} · {AGES.find((a) => a.id === plan.age)?.label}{plan.topic ? ` · ${plan.topic}` : ''}{lib ? ' · Бібліотека Murly' : ''}</span>
          <h1>{plan.title || 'Без назви'}</h1>
          <span className="le-head__meta">{plan.blocks.length} блоків · {points} балів у вправах</span>
        </div>
        <div className="t-head__actions">
          {!lib && (
            <div className="g-chips">
              <button className={`g-chip ${mode === 'edit' ? 'is-on' : ''}`} onClick={() => setMode('edit')}>Редагувати</button>
              <button className={`g-chip ${mode === 'view' ? 'is-on' : ''}`} onClick={() => setMode('view')}>Перегляд</button>
            </div>
          )}
        </div>
      </div>

      <div className="t-head__actions">
        <button className="mu-btn mu-btn--lime" onClick={() => { setMode('view'); setTimeout(present, 50); }}><Icon id="e-board" />Показати на уроці</button>
        <button className="mu-btn" onClick={() => setSending(!sending)}><Icon id="d-send" />Відправити учню</button>
        {lib && <button className="mu-btn" onClick={copy}><Icon id="e-pencil" />Скопіювати і редагувати</button>}
        {!lib && (!confirmDel
          ? <button className="t-link-btn" onClick={() => setConfirmDel(true)}>Видалити урок</button>
          : <><span>Видалити урок?</span><button className="mu-btn t-btn-sm" onClick={() => setConfirmDel(false)}>Ні</button>
              <button className="mu-btn mu-btn--tomato t-btn-sm" onClick={() => { removePlan(plan.id); router.push('/teacher/lessons'); }}>Так</button></>)}
      </div>

      {sending && <SendBox plan={plan} onClose={() => setSending(false)} />}

      {mode === 'edit' && !lib && draft
        ? <LessonEditor plan={draft} onChange={change} />
        : <div ref={viewRef} className="t-card le-view"><LessonView key={plan.id + plan.blocks.length} plan={plan} /></div>}
    </div>
  );
}
