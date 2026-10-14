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

// Слова з усіх блоків «Слова» уроку
const lessonWords = (plan: Plan) => plan.blocks.flatMap((b) => (b.type === 'vocab' ? b.words : []));

// Додає слова в словники учнів, пропускаючи ті, що там уже є
function useAddWords() {
  const { data, addWord } = useTeacher();
  return (studentIds: string[], words: { en: string; uk: string }[]) => {
    let added = 0;
    studentIds.forEach((sid) => {
      const have = new Set(data.words.filter((w) => w.studentId === sid).map((w) => w.en.trim().toLowerCase()));
      words.forEach((w) => {
        const k = w.en.trim().toLowerCase();
        if (!k || have.has(k)) return;
        have.add(k); addWord(sid, { en: w.en.trim(), uk: w.uk.trim() }); added++;
      });
    });
    return added;
  };
}

function StudentPicker({ ids, setIds }: { ids: string[]; setIds: (v: string[]) => void }) {
  const { data } = useTeacher();
  return (
    <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
      {data.students.map((s) => (
        <button key={s.id} className={`g-chip ${ids.includes(s.id) ? 'is-on' : ''}`}
          onClick={() => setIds(ids.includes(s.id) ? ids.filter((x) => x !== s.id) : [...ids, s.id])}>{s.name}</button>
      ))}
    </div>
  );
}

function WordsBox({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const { data } = useTeacher();
  const addWords = useAddWords();
  const words = lessonWords(plan);
  const [ids, setIds] = useState<string[]>([]);
  const [msg, setMsg] = useState('');
  if (!data.students.length) return <div className="t-card"><p className="t-muted">Спочатку додай учнів.</p></div>;
  return (
    <div className="t-card le-send">
      <h2><Icon id="e-abc" />Слова уроку в словник учня</h2>
      <p className="t-muted">{words.length} слів: {words.slice(0, 6).map((w) => w.en).join(', ')}{words.length > 6 ? '…' : ''}. Слова, які вже є в словнику, не продублюються.</p>
      {msg ? <><p className="t-pos">{msg}</p><button className="mu-btn t-btn-sm" onClick={onClose}>Закрити</button></> : (
        <>
          <StudentPicker ids={ids} setIds={setIds} />
          <div className="t-form__actions">
            <button className="mu-btn t-btn-sm" onClick={onClose}>Скасувати</button>
            <button className="mu-btn mu-btn--lime" disabled={!ids.length} onClick={() => { const n = addWords(ids, words); setMsg(n ? `Додано ${n} слів. Учні вже можуть грати ними у своєму кабінеті.` : 'Усі ці слова вже є в словниках.'); }}>Додати</button>
          </div>
        </>
      )}
    </div>
  );
}

function SendBox({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const { data, addHomework } = useTeacher();
  const addWords = useAddWords();
  const words = lessonWords(plan);
  const [ids, setIds] = useState<string[]>([]);
  const [due, setDue] = useState(defaultDue());
  const [withWords, setWithWords] = useState(true);
  const [done, setDone] = useState(false);
  if (!data.students.length) return <div className="t-card"><p className="t-muted">Спочатку додай учнів.</p></div>;
  const send = () => {
    ids.forEach((studentId) => addHomework({
      studentId, kind: 'lesson', title: plan.title || 'Урок',
      items: plan.blocks, due: due ? new Date(due).toISOString() : undefined,
    }));
    if (withWords && words.length) addWords(ids, words);
    setDone(true);
  };
  return (
    <div className="t-card le-send">
      <h2><Icon id="d-send" />Відправити урок учням</h2>
      {done ? (
        <><p className="t-pos">Готово! Урок з’явився в кабінеті учнів як домашка.</p><button className="mu-btn t-btn-sm" onClick={onClose}>Закрити</button></>
      ) : (
        <>
          <StudentPicker ids={ids} setIds={setIds} />
          {words.length > 0 && (
            <label className="le-check"><input type="checkbox" checked={withWords} onChange={(e) => setWithWords(e.target.checked)} />Додати {words.length} слів уроку в словник учня</label>
          )}
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
  const [wordsBox, setWordsBox] = useState(false);
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
        <button className="mu-btn" onClick={() => { setSending(!sending); setWordsBox(false); }}><Icon id="d-send" />Відправити учню</button>
        {lessonWords(plan).length > 0 && <button className="mu-btn" onClick={() => { setWordsBox(!wordsBox); setSending(false); }}><Icon id="e-abc" />Слова в словник</button>}
        {lib && <button className="mu-btn" onClick={copy}><Icon id="e-pencil" />Скопіювати і редагувати</button>}
        {!lib && (!confirmDel
          ? <button className="t-link-btn" onClick={() => setConfirmDel(true)}>Видалити урок</button>
          : <><span>Видалити урок?</span><button className="mu-btn t-btn-sm" onClick={() => setConfirmDel(false)}>Ні</button>
              <button className="mu-btn mu-btn--tomato t-btn-sm" onClick={() => { removePlan(plan.id); router.push('/teacher/lessons'); }}>Так</button></>)}
      </div>

      {sending && <SendBox plan={plan} onClose={() => setSending(false)} />}
      {wordsBox && <WordsBox plan={plan} onClose={() => setWordsBox(false)} />}

      {mode === 'edit' && !lib && draft
        ? <LessonEditor plan={draft} onChange={change} />
        : <div ref={viewRef} className="t-card le-view"><LessonView key={plan.id + plan.blocks.length} plan={plan} /></div>}
    </div>
  );
}
