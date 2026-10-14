'use client';
import { useMemo, useState } from 'react';
import Icon from '../Icon';
import QuizGame from '../games/QuizGame';
import MatchGame from '../games/MatchGame';
import AnagramGame from '../games/AnagramGame';
import CardsGame from '../games/CardsGame';
import { GameFinishContext } from '../games/finish';
import ExerciseView from '../exercise/ExerciseView';
import { grade, type Answers } from '@/lib/exercise';
import type { StudentHomework, StudentWord } from '@/lib/student-data';

const fmtDue = (iso: string) => new Date(iso).toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'long' });

async function send(id: string, p: { score?: number; total?: number; answer?: string; answers?: Answers }) {
  const r = await fetch('/api/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'submitHomework', id, ...p }) });
  return r.ok;
}

export default function HomeworkList({ homework, words }: { homework: StudentHomework[]; words: StudentWord[] }) {
  const [list, setList] = useState(homework);
  const [openId, setOpenId] = useState<string | null>(null);
  const todo = list.filter((h) => h.status === 'assigned');
  const done = list.filter((h) => h.status !== 'assigned');
  const patch = (id: string, p: Partial<StudentHomework>) => setList((l) => l.map((h) => (h.id === id ? { ...h, ...p } : h)));

  if (!list.length) return null;

  return (
    <section className="t-card s-hw">
      <h2><Icon id="e-board" />Домашка{todo.length ? ` (${todo.length})` : ''}</h2>
      {!todo.length && <p className="t-muted">Усе здано. Молодець!</p>}
      {[...todo, ...done].map((h) => (
        <HomeworkRow key={h.id} h={h} words={words} open={openId === h.id}
          onToggle={() => setOpenId(openId === h.id ? null : h.id)} onPatch={(p) => patch(h.id, p)} />
      ))}
    </section>
  );
}

function HomeworkRow({ h, words, open, onToggle, onPatch }: {
  h: StudentHomework; words: StudentWord[]; open: boolean; onToggle: () => void; onPatch: (p: Partial<StudentHomework>) => void;
}) {
  const [answer, setAnswer] = useState(h.answer ?? '');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(false);
  const overdue = h.status === 'assigned' && h.due && new Date(h.due) < new Date();

  const items = useMemo(() => words.map((w) => (h.direction === 'uk' ? { q: w.uk, a: w.en } : { q: w.en, a: w.uk })), [words, h.direction]);
  const onFinish = async (score: number, total: number) => {
    onPatch({ score, total, status: h.status === 'checked' ? 'checked' : 'done' });
    if (!(await send(h.id, { score, total }))) setErr(true);
  };
  const submitText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setSaving(true); setErr(false);
    const ok = await send(h.id, { answer: answer.trim() });
    setSaving(false);
    if (ok) onPatch({ answer: answer.trim(), status: h.status === 'checked' ? 'checked' : 'done' }); else setErr(true);
  };

  const tag = h.status === 'checked' ? <span className="t-tag t-tag--done">Перевірено</span>
    : h.status === 'done' ? <span className="t-tag t-tag--warn">Здано</span>
    : overdue ? <span className="t-tag t-tag--late">Прострочено</span>
    : h.due ? <span className="t-tag">до {fmtDue(h.due)}</span> : null;

  return (
    <div className={`s-hw__item is-${h.status} ${open ? 'is-open' : ''}`}>
      <button className="s-hw__head" onClick={onToggle} aria-expanded={open}>
        <span className="s-hw__title"><Icon id={h.kind === 'game' ? 'e-trophy' : h.kind === 'exercise' ? 'e-abc' : 'e-pencil'} />{h.title}</span>
        <span className="s-hw__right">{h.score != null && <b>{h.score}/{h.total}</b>}{tag}</span>
      </button>
      {open && (
        <div className="s-hw__body">
          {h.instructions && <p className="t-hw__text">{h.instructions}</p>}
          {h.feedback && <div className="s-hw__fb"><small>Коментар учителя</small><p>{h.feedback}</p></div>}
          {h.kind === 'game' && (
            items.length >= 4
              ? <GameFinishContext.Provider value={onFinish}>
                  <div className="g-stage">
                    {h.game === 'match' ? <MatchGame items={items} /> : h.game === 'anagram' ? <AnagramGame items={items} /> : h.game === 'cards' ? <CardsGame items={items} /> : <QuizGame items={items} />}
                  </div>
                </GameFinishContext.Provider>
              : <p className="t-muted">У словнику поки замало слів для гри.</p>
          )}
          {h.kind === 'exercise' && h.items && <ExercisePlayer h={h} onPatch={onPatch} />}
          {h.kind === 'text' && (
            <form className="t-note-form" onSubmit={submitText}>
              <textarea rows={5} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Пиши відповідь тут" />
              <button className="mu-btn mu-btn--lime" type="submit" disabled={saving}>{saving ? 'Надсилаю…' : h.answer ? 'Оновити відповідь' : 'Здати'}</button>
            </form>
          )}
          {err && <p className="t-neg">Не вдалося зберегти. Перевір інтернет і спробуй ще раз.</p>}
        </div>
      )}
    </div>
  );
}

function ExercisePlayer({ h, onPatch }: { h: StudentHomework; onPatch: (p: Partial<StudentHomework>) => void }) {
  const sections = h.items ?? [];
  const [answers, setAnswers] = useState<Answers>(h.answers ?? {});
  const [checked, setChecked] = useState(!!h.answers);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(false);
  const result = useMemo(() => (checked ? grade(sections, answers) : null), [checked, sections, answers]);

  const submit = async () => {
    setSaving(true); setErr(false);
    const ok = await send(h.id, { answers });
    setSaving(false);
    if (!ok) { setErr(true); return; }
    const g = grade(sections, answers);
    setChecked(true);
    onPatch({ answers, score: g.score, total: g.total, status: h.status === 'checked' ? 'checked' : 'done' });
  };

  return (
    <div className="ex-play">
      <ExerciseView sections={sections} answers={answers}
        onChange={checked ? undefined : (k, v) => setAnswers((a) => ({ ...a, [k]: v }))}
        marks={result?.marks} showCorrect={checked} />
      {result && (
        <div className="ex-result">
          <b>{result.score} / {result.total}</b>
          <span>{result.total && result.score === result.total ? 'Ідеально, усе правильно!' : 'Правильні відповіді підсвічені під помилками.'}</span>
        </div>
      )}
      <div className="ex-play__bar">
        {!checked
          ? <button className="mu-btn mu-btn--lime" onClick={submit} disabled={saving}>{saving ? 'Перевіряю…' : 'Перевірити і здати'}</button>
          : <button className="mu-btn" onClick={() => setChecked(false)}>Виправити і здати ще раз</button>}
      </div>
      {err && <p className="t-neg">Не вдалося зберегти. Перевір інтернет і спробуй ще раз.</p>}
    </div>
  );
}
