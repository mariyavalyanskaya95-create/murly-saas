'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import LessonView from './LessonView';
import LessonEditor from './LessonEditor';
import WordPicker, { type PickWord } from './WordPicker';
import { useTeacher } from '@/lib/teacher-store';
import { getLibraryPlan } from '@/lib/library';
import { AGES, lessonSections, type Plan } from '@/lib/lesson';
import { maxScore } from '@/lib/exercise';

function defaultDue() {
  const d = new Date(); d.setDate(d.getDate() + 3); d.setHours(20, 0, 0, 0);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

// Слова з усіх блоків «Слова» уроку (без повторів)
const lessonWords = (plan: Plan) => {
  const seen = new Set<string>();
  return plan.blocks.flatMap((b) => (b.type === 'vocab' ? b.words : [])).filter((w) => { const k = w.en.trim().toLowerCase(); if (!k || seen.has(k)) return false; seen.add(k); return true; });
};
// 1 слово, 2 слова, 5 слів
const wordsN = (n: number) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'слово' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'слова' : 'слів'}`;
const toPick = (plan: Plan, on: boolean): PickWord[] => lessonWords(plan).map((w) => ({ ...w, on }));

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

function WordsBox({ words, setWords, onClose }: { words: PickWord[]; setWords: (w: PickWord[]) => void; onClose: () => void }) {
  const { data } = useTeacher();
  const addWords = useAddWords();
  const [ids, setIds] = useState<string[]>(data.students.length === 1 ? [data.students[0].id] : []);
  const [msg, setMsg] = useState('');
  if (!data.students.length) return <div className="t-card"><p className="t-muted">Спочатку додай учнів.</p></div>;
  const chosen = words.filter((w) => w.on && w.en.trim());
  const noUk = chosen.filter((w) => !w.uk.trim()).length;
  const add = () => {
    const n = addWords(ids, chosen);
    setMsg(n ? `Додано ${wordsN(n)}. Учні вже можуть грати ними у своєму кабінеті.` : 'Усі обрані слова вже є в словниках.');
  };
  return (
    <div className="t-card le-send" id="words-box">
      <h2><Icon id="e-abc" />Слова в словник учня</h2>
      {msg ? <div className="t-head__actions"><p className="t-pos">{msg}</p><button className="mu-btn t-btn-sm" onClick={() => { setMsg(''); setWords(words.map((w) => ({ ...w, on: false }))); }}>Додати ще</button><button className="mu-btn t-btn-sm" onClick={onClose}>Закрити</button></div> : (
        <>
          <p className="t-muted">Обери учня і слова. Кожне слово можна обрати окремо, виправити переклад або додати своє. Щоб додати слово з тексту уроку, просто виділи його мишкою.</p>
          <StudentPicker ids={ids} setIds={setIds} />
          <WordPicker words={words} setWords={setWords} studentIds={ids} />
          {noUk > 0 && <p className="t-neg">Допиши переклад ({wordsN(noUk)} без перекладу).</p>}
          <div className="t-form__actions">
            <button className="mu-btn t-btn-sm" onClick={onClose}>Скасувати</button>
            <button className="mu-btn mu-btn--lime" disabled={!ids.length || !chosen.length || noUk > 0} onClick={add}>Додати {wordsN(chosen.length)}</button>
          </div>
        </>
      )}
    </div>
  );
}

function SendBox({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const { data, addHomework } = useTeacher();
  const addWords = useAddWords();
  const [words, setWords] = useState<PickWord[]>(() => toPick(plan, true));
  const [ids, setIds] = useState<string[]>([]);
  const [due, setDue] = useState(defaultDue());
  const [withWords, setWithWords] = useState(true);
  const chosen = words.filter((w) => w.on && w.en.trim() && w.uk.trim());
  const [done, setDone] = useState(false);
  if (!data.students.length) return <div className="t-card"><p className="t-muted">Спочатку додай учнів.</p></div>;
  const send = () => {
    ids.forEach((studentId) => addHomework({
      studentId, kind: 'lesson', title: plan.title || 'Урок',
      items: plan.blocks.filter((b) => b.type !== 'note'), due: due ? new Date(due).toISOString() : undefined,
    }));
    if (withWords && chosen.length) addWords(ids, chosen);
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
            <label className="le-check"><input type="checkbox" checked={withWords} onChange={(e) => setWithWords(e.target.checked)} />Додати слова уроку в словник учня ({chosen.length})</label>
          )}
          {withWords && words.length > 0 && <WordPicker words={words} setWords={setWords} studentIds={ids} />}
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
  const [mode, setMode] = useState<'edit' | 'view' | 'slides'>('view');
  const [sending, setSending] = useState(false);
  const [pick, setPick] = useState<PickWord[] | null>(null); // відкрита панель «Слова в словник»
  const [sel, setSel] = useState<{ text: string; x: number; y: number } | null>(null);
  const [confirmDel, setConfirmDel] = useState(false);
  const viewRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { if (own && !draft) { setDraft(own); if (!own.blocks.length) setMode('edit'); } }, [own, draft]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (!sel) return;
    const off = () => setSel(null);
    window.addEventListener('scroll', off, true);
    return () => window.removeEventListener('scroll', off, true);
  }, [sel]);

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
    const nid = addPlan({ title: plan.title, level: plan.level, age: plan.age, topic: plan.topic, color: plan.color, blocks: plan.blocks, focus: plan.focus, aims: plan.aims, source: lib ? lib.id : undefined });
    router.push(`/teacher/lessons/${nid}`);
  };
  const present = () => { (document.querySelector('.sl [data-full]') as HTMLButtonElement | null)?.click(); };
  const points = maxScore(lessonSections(plan.blocks));

  // Одне слово (з картки або виділене в тексті) → у панель «Слова в словник»
  const pickWord = (w: { en: string; uk: string }) => {
    const k = w.en.trim().toLowerCase();
    const known = lessonWords(plan).find((x) => x.en.trim().toLowerCase() === k);
    const base = pick ?? toPick(plan, false);
    const i = base.findIndex((x) => x.en.trim().toLowerCase() === k);
    setPick(i >= 0 ? base.map((x, j) => (j === i ? { ...x, on: true } : x)) : [...base, { en: w.en.trim(), uk: w.uk || known?.uk || '', on: true }]);
    setSending(false); setSel(null);
    setTimeout(() => document.getElementById('words-box')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };
  // виділення тексту в уроці: показуємо кнопку «У словник»
  const onSelect = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('input, textarea, select, button')) return;
    const s = window.getSelection();
    const text = s?.toString().replace(/\s+/g, ' ').trim() ?? '';
    if (!s || !text || text.length > 40 || text.split(' ').length > 4 || /[а-яіїєґ]/i.test(text)) { setSel(null); return; }
    const r = s.getRangeAt(0).getBoundingClientRect();
    setSel({ text: text.replace(/^[^\w’']+|[^\w’']+$/g, ''), x: r.left + r.width / 2, y: r.top });
  };

  return (
    <div className="t-page">
      <Link href="/teacher/lessons" className="t-back">← Усі уроки</Link>
      <div className={`le-head gr--${plan.color}`}>
        <div>
          <span className="le-head__meta">{plan.level} · {AGES.find((a) => a.id === plan.age)?.label}{plan.topic ? ` · ${plan.topic}` : ''}{lib ? ' · Бібліотека Murly' : ''}</span>
          <h1>{plan.title || 'Без назви'}</h1>
          <span className="le-head__meta">{plan.duration ? `${plan.duration} хв · ` : ''}{plan.blocks.length} блоків · {points} балів у вправах</span>
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
        <button className="mu-btn mu-btn--lime" onClick={() => { setMode('slides'); setTimeout(present, 60); }}><Icon id="e-board" />Показати на уроці</button>
        <button className="mu-btn" onClick={() => { setSending(!sending); setPick(null); }}><Icon id="d-send" />Відправити учню</button>
        <button className="mu-btn" onClick={() => { setPick(pick ? null : toPick(plan, true)); setSending(false); }}><Icon id="e-abc" />Слова в словник</button>
        {lib && <button className="mu-btn" onClick={copy}><Icon id="e-pencil" />Скопіювати і редагувати</button>}
        {!lib && (!confirmDel
          ? <button className="t-link-btn" onClick={() => setConfirmDel(true)}>Видалити урок</button>
          : <><span>Видалити урок?</span><button className="mu-btn t-btn-sm" onClick={() => setConfirmDel(false)}>Ні</button>
              <button className="mu-btn mu-btn--tomato t-btn-sm" onClick={() => { removePlan(plan.id); router.push('/teacher/lessons'); }}>Так</button></>)}
      </div>

      {sending && <SendBox plan={plan} onClose={() => setSending(false)} />}
      {pick && <WordsBox words={pick} setWords={setPick} onClose={() => setPick(null)} />}

      {mode === 'slides'
        ? <LessonView key={'s' + plan.id} plan={plan} teacher slides onExit={() => setMode('view')} />
        : mode === 'edit' && !lib && draft
        ? <LessonEditor plan={draft} onChange={change} />
        : <div ref={viewRef} className="t-card le-view" onMouseUp={onSelect}><LessonView key={plan.id + plan.blocks.length} plan={plan} teacher onWord={pickWord} /></div>}
      {sel && sel.text && (
        <button className="mu-btn mu-btn--lime t-btn-sm le-selbtn" style={{ left: sel.x, top: sel.y }}
          onMouseDown={(e) => e.preventDefault()} onClick={() => pickWord({ en: sel.text, uk: '' })}><Icon id="e-abc" />«{sel.text}» у словник</button>
      )}
    </div>
  );
}
