'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import LessonView from './LessonView';
import LessonEditor from './LessonEditor';
import WordPicker, { type PickWord } from './WordPicker';
import { useTeacher } from '@/lib/teacher-store';
import { ageLabel, lessonSections, type Plan } from '@/lib/lesson';
import { useT } from '@/components/LangProvider';
import type { Lang } from '@/lib/i18n';
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
// Множина: укр і рос мають 3 форми (1, 2-4, 5+), англ 2 (1, інше)
type Forms = { uk: [string, string, string]; ru: [string, string, string]; en: [string, string] };
const plural = (n: number, lang: Lang, f: Forms) => {
  if (lang === 'en') return `${n} ${n === 1 ? f.en[0] : f.en[1]}`;
  const w = f[lang];
  return `${n} ${n % 10 === 1 && n % 100 !== 11 ? w[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? w[1] : w[2]}`;
};
// 1 слово, 2 слова, 5 слів
const WORDS: Forms = { uk: ['слово', 'слова', 'слів'], ru: ['слово', 'слова', 'слов'], en: ['word', 'words'] };
const BLOCKS: Forms = { uk: ['блок', 'блоки', 'блоків'], ru: ['блок', 'блока', 'блоков'], en: ['block', 'blocks'] };
const POINTS: Forms = { uk: ['бал', 'бали', 'балів'], ru: ['балл', 'балла', 'баллов'], en: ['point', 'points'] };
const wordsN = (n: number, lang: Lang) => plural(n, lang, WORDS);
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
  const t = useT();
  const { data } = useTeacher();
  const addWords = useAddWords();
  const [ids, setIds] = useState<string[]>(data.students.length === 1 ? [data.students[0].id] : []);
  const [msg, setMsg] = useState('');
  if (!data.students.length) return <div className="t-card"><p className="t-muted">{t({ uk: 'Спочатку додай учнів.', ru: 'Сначала добавь учеников.', en: 'Add students first.' })}</p></div>;
  const chosen = words.filter((w) => w.on && w.en.trim());
  const noUk = chosen.filter((w) => !w.uk.trim()).length;
  const add = () => {
    const n = addWords(ids, chosen);
    setMsg(n ? t({ uk: `Додано ${wordsN(n, 'uk')}. Учні вже можуть грати ними у своєму кабінеті.`, ru: `Добавлено ${wordsN(n, 'ru')}. Ученики уже могут играть ими в своём кабинете.`, en: `Added ${wordsN(n, 'en')}. Students can already play with them in their account.` }) : t({ uk: 'Усі обрані слова вже є в словниках.', ru: 'Все выбранные слова уже есть в словарях.', en: 'All chosen words are already in the dictionaries.' }));
  };
  return (
    <div className="t-card le-send" id="words-box">
      <h2><Icon id="e-abc" />{t({ uk: 'Слова в словник учня', ru: 'Слова в словарь ученика', en: 'Words for the student’s dictionary' })}</h2>
      {msg ? <div className="t-head__actions"><p className="t-pos">{msg}</p><button className="mu-btn t-btn-sm" onClick={() => { setMsg(''); setWords(words.map((w) => ({ ...w, on: false }))); }}>{t({ uk: 'Додати ще', ru: 'Добавить ещё', en: 'Add more' })}</button><button className="mu-btn t-btn-sm" onClick={onClose}>{t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}</button></div> : (
        <>
          <p className="t-muted">{t({ uk: 'Обери учня і слова. Кожне слово можна обрати окремо, виправити переклад або додати своє. Щоб додати слово з тексту уроку, просто виділи його мишкою.', ru: 'Выбери ученика и слова. Каждое слово можно выбрать отдельно, исправить перевод или добавить своё. Чтобы добавить слово из текста урока, просто выдели его мышкой.', en: 'Choose a student and words. You can pick each word, fix the translation or add your own. To add a word from the lesson text, just select it with the mouse.' })}</p>
          <StudentPicker ids={ids} setIds={setIds} />
          <WordPicker words={words} setWords={setWords} studentIds={ids} />
          {noUk > 0 && <p className="t-neg">{t({ uk: `Допиши переклад (${wordsN(noUk, 'uk')} без перекладу).`, ru: `Допиши перевод (${wordsN(noUk, 'ru')} без перевода).`, en: `Add the translation (${wordsN(noUk, 'en')} without translation).` })}</p>}
          <div className="t-form__actions">
            <button className="mu-btn t-btn-sm" onClick={onClose}>{t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' })}</button>
            <button className="mu-btn mu-btn--lime" disabled={!ids.length || !chosen.length || noUk > 0} onClick={add}>{t({ uk: 'Додати', ru: 'Добавить', en: 'Add' })} {wordsN(chosen.length, t.lang)}</button>
          </div>
        </>
      )}
    </div>
  );
}

function SendBox({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const t = useT();
  const { data, addHomework } = useTeacher();
  const addWords = useAddWords();
  const [words, setWords] = useState<PickWord[]>(() => toPick(plan, true));
  const [ids, setIds] = useState<string[]>([]);
  const [due, setDue] = useState(defaultDue());
  const [withWords, setWithWords] = useState(true);
  const chosen = words.filter((w) => w.on && w.en.trim() && w.uk.trim());
  const [done, setDone] = useState(false);
  if (!data.students.length) return <div className="t-card"><p className="t-muted">{t({ uk: 'Спочатку додай учнів.', ru: 'Сначала добавь учеников.', en: 'Add students first.' })}</p></div>;
  const send = () => {
    ids.forEach((studentId) => addHomework({
      studentId, kind: 'lesson', title: plan.title || t({ uk: 'Урок', ru: 'Урок', en: 'Lesson' }),
      items: plan.blocks.filter((b) => b.type !== 'note'), due: due ? new Date(due).toISOString() : undefined,
    }));
    if (withWords && chosen.length) addWords(ids, chosen);
    setDone(true);
  };
  return (
    <div className="t-card le-send">
      <h2><Icon id="d-send" />{t({ uk: 'Відправити урок учням', ru: 'Отправить урок ученикам', en: 'Send the lesson to students' })}</h2>
      {done ? (
        <><p className="t-pos">{t({ uk: 'Готово! Урок з’явився в кабінеті учнів як домашка.', ru: 'Готово! Урок появился в кабинете учеников как домашка.', en: 'Done! The lesson is now in the students’ accounts as homework.' })}</p><button className="mu-btn t-btn-sm" onClick={onClose}>{t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}</button></>
      ) : (
        <>
          <StudentPicker ids={ids} setIds={setIds} />
          {words.length > 0 && (
            <label className="le-check"><input type="checkbox" checked={withWords} onChange={(e) => setWithWords(e.target.checked)} />{t({ uk: 'Додати слова уроку в словник учня', ru: 'Добавить слова урока в словарь ученика', en: 'Add the lesson words to the student’s dictionary' })} ({chosen.length})</label>
          )}
          {withWords && words.length > 0 && <WordPicker words={words} setWords={setWords} studentIds={ids} />}
          <div className="t-form">
            <label>{t({ uk: 'Здати до', ru: 'Сдать до', en: 'Due' })}<input type="datetime-local" value={due} onChange={(e) => setDue(e.target.value)} /></label>
            <div className="t-form__actions">
              <button className="mu-btn t-btn-sm" onClick={onClose}>{t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' })}</button>
              <button className="mu-btn mu-btn--lime" disabled={!ids.length} onClick={send}>{t({ uk: 'Відправити', ru: 'Отправить', en: 'Send' })}{ids.length > 1 ? ` (${ids.length})` : ''}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function PlanPage({ id, libPlans }: { id: string; libPlans?: Record<Lang, Plan> }) {
  const t = useT();
  const { data, ready, addPlan, updatePlan, removePlan } = useTeacher();
  const router = useRouter();
  const lib = libPlans ? libPlans[t.lang] ?? libPlans.uk : undefined;
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
  if (!plan) return <div className="t-page"><div className="t-card"><h2>{t({ uk: 'Урок не знайдено', ru: 'Урок не найден', en: 'Lesson not found' })}</h2><Link href="/teacher/lessons" className="mu-btn">{t({ uk: 'До уроків', ru: 'К урокам', en: 'To lessons' })}</Link></div></div>;

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
      <Link href="/teacher/lessons" className="t-back">← {t({ uk: 'Усі уроки', ru: 'Все уроки', en: 'All lessons' })}</Link>
      <div className={`le-head gr--${plan.color}`}>
        <div>
          <span className="le-head__meta">{plan.level} · {ageLabel(plan.age, t.lang)}{plan.topic ? ` · ${plan.topic}` : ''}{lib ? ` · ${t({ uk: 'Бібліотека Murly', ru: 'Библиотека Murly', en: 'Murly library' })}` : ''}</span>
          <h1>{plan.title || t({ uk: 'Без назви', ru: 'Без названия', en: 'Untitled' })}</h1>
          <span className="le-head__meta">{plan.duration ? `${plan.duration} ${t({ uk: 'хв', ru: 'мин', en: 'min' })} · ` : ''}{plural(plan.blocks.length, t.lang, BLOCKS)} · {plural(points, t.lang, POINTS)} {t({ uk: 'у вправах', ru: 'в упражнениях', en: 'in exercises' })}</span>
        </div>
        <div className="t-head__actions">
          {!lib && (
            <div className="g-chips">
              <button className={`g-chip ${mode === 'edit' ? 'is-on' : ''}`} onClick={() => setMode('edit')}>{t({ uk: 'Редагувати', ru: 'Редактировать', en: 'Edit' })}</button>
              <button className={`g-chip ${mode === 'view' ? 'is-on' : ''}`} onClick={() => setMode('view')}>{t({ uk: 'Перегляд', ru: 'Просмотр', en: 'Preview' })}</button>
            </div>
          )}
        </div>
      </div>

      <div className="t-head__actions">
        <button className="mu-btn mu-btn--lime" onClick={() => { setMode('slides'); setTimeout(present, 60); }}><Icon id="e-board" />{t({ uk: 'Показати на уроці', ru: 'Показать на уроке', en: 'Show in class' })}</button>
        <button className="mu-btn" onClick={() => { setSending(!sending); setPick(null); }}><Icon id="d-send" />{t({ uk: 'Відправити учню', ru: 'Отправить ученику', en: 'Send to student' })}</button>
        <button className="mu-btn" onClick={() => { setPick(pick ? null : toPick(plan, true)); setSending(false); }}><Icon id="e-abc" />{t({ uk: 'Слова в словник', ru: 'Слова в словарь', en: 'Words to dictionary' })}</button>
        {lib && <button className="mu-btn" onClick={copy}><Icon id="e-pencil" />{t({ uk: 'Скопіювати і редагувати', ru: 'Скопировать и редактировать', en: 'Copy and edit' })}</button>}
        {!lib && (!confirmDel
          ? <button className="t-link-btn" onClick={() => setConfirmDel(true)}>{t({ uk: 'Видалити урок', ru: 'Удалить урок', en: 'Delete lesson' })}</button>
          : <><span>{t({ uk: 'Видалити урок?', ru: 'Удалить урок?', en: 'Delete this lesson?' })}</span><button className="mu-btn t-btn-sm" onClick={() => setConfirmDel(false)}>{t({ uk: 'Ні', ru: 'Нет', en: 'No' })}</button>
              <button className="mu-btn mu-btn--tomato t-btn-sm" onClick={() => { removePlan(plan.id); router.push('/teacher/lessons'); }}>{t({ uk: 'Так', ru: 'Да', en: 'Yes' })}</button></>)}
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
          onMouseDown={(e) => e.preventDefault()} onClick={() => pickWord({ en: sel.text, uk: '' })}><Icon id="e-abc" />{t({ uk: `«${sel.text}» у словник`, ru: `«${sel.text}» в словарь`, en: `Add “${sel.text}” to dictionary` })}</button>
      )}
    </div>
  );
}
