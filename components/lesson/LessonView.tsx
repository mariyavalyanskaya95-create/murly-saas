'use client';
import { useMemo, useState } from 'react';
import Icon from '../Icon';
import ExerciseView from '../exercise/ExerciseView';
import GameHub from '../games/GameHub';
import { grade, type Answers } from '@/lib/exercise';
import { lessonSections, youtubeEmbed, type Block, type Plan } from '@/lib/lesson';

// Текст: абзаци через порожній рядок, **жирний**
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i}>{para.split(/(\*\*[^*]+\*\*)/g).map((chunk, k) => (chunk.startsWith('**') && chunk.endsWith('**') ? <b key={k}>{chunk.slice(2, -2)}</b> : <span key={k}>{chunk}</span>))}</p>
      ))}
    </>
  );
}

function VocabBlock({ b }: { b: Extract<Block, { type: 'vocab' }> }) {
  const [play, setPlay] = useState(false);
  const sets = useMemo(() => [
    { id: 'en', title: 'Англ → Укр', prompt: 'Як це перекладається?', items: b.words.map((w) => ({ q: w.en, a: w.uk })) },
    { id: 'uk', title: 'Укр → Англ', prompt: 'Як це англійською?', items: b.words.map((w) => ({ q: w.uk, a: w.en })) },
  ], [b.words]);
  return (
    <div className="ls-vocab">
      <div className="ls-vocab__grid">
        {b.words.map((w, i) => <div key={i} className="ls-word"><b>{w.en}</b><span>{w.uk}</span></div>)}
      </div>
      {b.words.length >= 4 && (
        <button className="mu-btn t-btn-sm" onClick={() => setPlay(!play)}><Icon id="e-trophy" />{play ? 'Сховати гру' : 'Пограти цими словами'}</button>
      )}
      {play && <GameHub sets={sets} />}
    </div>
  );
}

export default function LessonView({ plan, interactive = true, initialAnswers, onSubmit, submitLabel = 'Перевірити відповіді', overrides }: {
  plan: Pick<Plan, 'title' | 'blocks'> & Partial<Plan>;
  interactive?: boolean;
  initialAnswers?: Answers;
  onSubmit?: (answers: Answers) => Promise<boolean> | boolean | void;
  submitLabel?: string;
  overrides?: Record<string, boolean>;
}) {
  const sections = useMemo(() => lessonSections(plan.blocks), [plan.blocks]);
  const [answers, setAnswers] = useState<Answers>(initialAnswers ?? {});
  const [checked, setChecked] = useState(!!initialAnswers && Object.keys(initialAnswers).length > 0);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(false);
  const result = useMemo(() => (checked ? grade(sections, answers, overrides) : null), [checked, sections, answers, overrides]);

  // зсув секцій для кожного блоку вправи
  const offsets = useMemo(() => {
    const o: Record<string, number> = {}; let n = 0;
    plan.blocks.forEach((b) => { if (b.type === 'exercise') { o[b.id] = n; n += b.sections.length; } });
    return o;
  }, [plan.blocks]);

  const check = async () => {
    setErr(false);
    if (onSubmit) { setSaving(true); const ok = await onSubmit(answers); setSaving(false); if (ok === false) { setErr(true); return; } }
    setChecked(true);
  };

  let exNo = 0;
  return (
    <article className="ls">
      {plan.title && <h1 className="ls-title">{plan.title}</h1>}
      {(plan.level || plan.topic) && <div className="ls-meta">{[plan.level, plan.topic].filter(Boolean).join(' · ')}</div>}
      {plan.blocks.map((b) => {
        switch (b.type) {
          case 'heading': return <h2 key={b.id} className="ls-h">{b.text}</h2>;
          case 'text': return <div key={b.id} className="ls-text"><Rich text={b.text} /></div>;
          case 'tip': return <div key={b.id} className="ls-tip"><Icon id="d-bulb" className="mu-ic ls-tip__ic" /><div><Rich text={b.text} /></div></div>;
          case 'image': return b.url ? <figure key={b.id} className="ls-fig"><img src={b.url} alt={b.caption || ''} loading="lazy" />{b.caption && <figcaption>{b.caption}</figcaption>}</figure> : null;
          case 'video': {
            const src = youtubeEmbed(b.url);
            return src ? <figure key={b.id} className="ls-fig"><div className="ls-video"><iframe src={src} title={b.caption || 'Відео'} allow="encrypted-media; picture-in-picture" allowFullScreen loading="lazy" /></div>{b.caption && <figcaption>{b.caption}</figcaption>}</figure> : null;
          }
          case 'vocab': return b.words.length ? <VocabBlock key={b.id} b={b} /> : null;
          case 'speaking': return b.questions.length ? (
            <div key={b.id} className="ls-speak"><div className="ls-speak__t"><Icon id="e-speak" />Поговоримо</div><ul>{b.questions.map((q, i) => <li key={i}>{q}</li>)}</ul></div>
          ) : null;
          case 'exercise': {
            if (!b.sections.length) return null;
            exNo++;
            return (
              <div key={b.id} className="ls-ex">
                <div className="ls-ex__label"><Icon id="e-pencil" />Вправа {exNo}</div>
                <ExerciseView sections={b.sections} offset={offsets[b.id]} numbered={b.sections.length > 1} answers={answers}
                  onChange={interactive && !checked ? (k, v) => setAnswers((a) => ({ ...a, [k]: v })) : undefined}
                  marks={result?.marks} showCorrect={checked} overrides={overrides} />
              </div>
            );
          }
        }
      })}
      {interactive && sections.length > 0 && (
        <div className="ls-foot">
          {result && <div className="ex-result"><b>{result.score} / {result.total}</b><span>{result.total && result.score === result.total ? 'Ідеально!' : 'Правильні відповіді показані під помилками.'}</span></div>}
          {!checked
            ? <button className="mu-btn mu-btn--lime mu-btn--lg" onClick={check} disabled={saving}>{saving ? 'Зберігаю…' : submitLabel}</button>
            : <button className="mu-btn" onClick={() => setChecked(false)}>Виправити помилки</button>}
          {err && <p className="t-neg">Не вдалося зберегти. Спробуй ще раз.</p>}
        </div>
      )}
    </article>
  );
}
