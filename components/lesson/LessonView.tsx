'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import ExerciseView from '../exercise/ExerciseView';
import GameHub from '../games/GameHub';
import AudioPlayer from './AudioPlayer';
import { grade, type Answers } from '@/lib/exercise';
import { lessonSections, toSlides, youtubeEmbed, type Block, type Plan } from '@/lib/lesson';

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

export default function LessonView({ plan, interactive = true, initialAnswers, onSubmit, submitLabel = 'Перевірити відповіді', overrides, teacher = false, slides = false, onExit }: {
  plan: Pick<Plan, 'title' | 'blocks'> & Partial<Plan>;
  interactive?: boolean;
  initialAnswers?: Answers;
  onSubmit?: (answers: Answers) => Promise<boolean> | boolean | void;
  submitLabel?: string;
  overrides?: Record<string, boolean>;
  teacher?: boolean; // показувати нотатки для вчителя
  slides?: boolean; // режим показу на уроці: по одному слайду
  onExit?: () => void;
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

  // номер кожної вправи в уроці
  const exNos = useMemo(() => {
    const o: Record<string, number> = {}; let n = 0;
    plan.blocks.forEach((b) => { if (b.type === 'exercise' && b.sections.length) o[b.id] = ++n; });
    return o;
  }, [plan.blocks]);

  const renderBlock = (b: Block) => {
        switch (b.type) {
          case 'heading': return <h2 key={b.id} className="ls-h">{b.text}</h2>;
          case 'note': return teacher && b.text ? <div key={b.id} className="ls-note"><Icon id="d-lock" /><div><small>Тільки для вчителя</small><Rich text={b.text} /></div></div> : null;
          case 'text': return <div key={b.id} className="ls-text"><Rich text={b.text} /></div>;
          case 'tip': return <div key={b.id} className="ls-tip"><Icon id="d-bulb" className="mu-ic ls-tip__ic" /><div><Rich text={b.text} /></div></div>;
          case 'image': return b.url ? <figure key={b.id} className="ls-fig"><img src={b.url} alt={b.caption || ''} loading="lazy" />{b.caption && <figcaption>{b.caption}</figcaption>}</figure> : null;
          case 'video': {
            const src = youtubeEmbed(b.url);
            return src ? (
              <figure key={b.id} className="ls-fig">
                {b.task && <div className="ls-watch"><Icon id="e-mic" />{b.task}</div>}
                <div className="ls-video"><iframe src={src} title={b.caption || 'Відео'} allow="encrypted-media; picture-in-picture" allowFullScreen loading="lazy" /></div>
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            ) : null;
          }
          case 'audio': return b.script.trim() || b.audioUrl ? <AudioPlayer key={b.id} script={b.script} title={b.title} audioUrl={b.audioUrl} /> : null;
          case 'pdf': return b.url ? (
            <div key={b.id} className="ls-pdf">
              <div className="ls-pdf__bar"><span><Icon id="e-book" />{b.name || 'PDF'}</span><a href={b.url} target="_blank" rel="noopener noreferrer" className="mu-btn t-btn-sm">Відкрити</a></div>
              <iframe src={`${b.url}#view=FitH`} title={b.name || 'PDF'} className="ls-pdf__frame" loading="lazy" />
            </div>
          ) : null;
          case 'vocab': return b.words.length ? <VocabBlock key={b.id} b={b} /> : null;
          case 'speaking': return b.questions.length ? (
            <div key={b.id} className="ls-speak"><div className="ls-speak__t"><Icon id="e-speak" />Поговоримо</div><ul>{b.questions.map((q, i) => <li key={i}>{q}</li>)}</ul></div>
          ) : null;
          case 'exercise': {
            if (!b.sections.length) return null;
            return (
              <div key={b.id} className="ls-ex">
                <div className="ls-ex__label"><Icon id="e-pencil" />Вправа {exNos[b.id]}</div>
                <ExerciseView sections={b.sections} offset={offsets[b.id]} numbered={b.sections.length > 1} answers={answers}
                  onChange={interactive && !checked ? (k, v) => setAnswers((a) => ({ ...a, [k]: v })) : undefined}
                  marks={result?.marks} showCorrect={checked} overrides={overrides} />
              </div>
            );
          }
        }
  };

  const footer = interactive && sections.length > 0 ? (
    <div className="ls-foot">
      {result && <div className="ex-result"><b>{result.score} / {result.total}</b><span>{result.total && result.score === result.total ? 'Ідеально!' : 'Правильні відповіді показані під помилками.'}</span></div>}
      {!checked
        ? <button className="mu-btn mu-btn--lime mu-btn--lg" onClick={check} disabled={saving}>{saving ? 'Зберігаю…' : submitLabel}</button>
        : <button className="mu-btn" onClick={() => setChecked(false)}>Виправити помилки</button>}
      {err && <p className="t-neg">Не вдалося зберегти. Спробуй ще раз.</p>}
    </div>
  ) : null;

  if (slides) return <SlideShow plan={plan} renderBlock={renderBlock} footer={footer} teacher={teacher} onExit={onExit} />;

  return (
    <article className="ls">
      {plan.title && <h1 className="ls-title">{plan.title}</h1>}
      {(plan.level || plan.topic) && <div className="ls-meta">{[plan.level, plan.topic, ...(plan.focus ?? [])].filter(Boolean).join(' · ')}</div>}
      {plan.aims && (
        <div className="ls-aims"><b>На цьому уроці</b><ul>{plan.aims.split('\n').filter((x) => x.trim()).map((a, i) => <li key={i}>{a}</li>)}</ul></div>
      )}
      {plan.blocks.map((b) => renderBlock(b))}
      {footer}
    </article>
  );
}

// Показ уроку слайдами: стрілки, пробіл, повний екран, нотатки вчителя збоку
function SlideShow({ plan, renderBlock, footer, teacher, onExit }: {
  plan: Pick<Plan, 'title' | 'blocks'> & Partial<Plan>;
  renderBlock: (b: Block) => React.ReactNode;
  footer: React.ReactNode;
  teacher: boolean;
  onExit?: () => void;
}) {
  const slides = useMemo(() => toSlides(plan.blocks), [plan.blocks]);
  const total = slides.length + 1; // + титульний
  const [i, setI] = useState(0);
  const [notes, setNotes] = useState(false);
  const [full, setFull] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const go = useCallback((d: number) => setI((x) => Math.min(total - 1, Math.max(0, x + d))), [total]);
  useEffect(() => { stage.current?.scrollTo({ top: 0 }); }, [i]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !t.closest('button'))) { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
      if (e.key === 'Home') setI(0);
      if (e.key === 'End') setI(total - 1);
    };
    const onFs = () => setFull(document.fullscreenElement === root.current);
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('fullscreenchange', onFs); };
  }, [go, total]);

  // якщо браузер не дає повний екран (iPhone, вбудовані вікна), розтягуємо слайди на все вікно
  const [fake, setFake] = useState(false);
  const toggleFull = () => {
    if (fake) { setFake(false); return; }
    if (document.fullscreenElement) { document.exitFullscreen().catch(() => {}); return; }
    const el = root.current;
    if (el?.requestFullscreen) el.requestFullscreen().catch(() => setFake(true)); else setFake(true);
  };
  useEffect(() => { root.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }); }, []);
  useEffect(() => {
    if (!fake) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setFake(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [fake]);
  const exit = () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); setFake(false); onExit?.(); };

  const s = i > 0 ? slides[i - 1] : null;
  const isLast = i === total - 1;
  const hasEx = s?.blocks.some((b) => b.type === 'exercise');
  const cur = s?.notes ?? [];

  return (
    <div ref={root} className={`sl ${full || fake ? 'is-full' : ''}`}>
      <div className="sl__bar">
        <span className="sl__count">{i + 1} / {total}</span>
        <div className="sl__progress"><span style={{ width: `${((i + 1) / total) * 100}%` }} /></div>
        {teacher && <button className={`g-chip ${notes ? 'is-on' : ''}`} onClick={() => setNotes(!notes)} aria-pressed={notes}>Нотатки{cur.length ? ` (${cur.length})` : ''}</button>}
        <button className="g-chip" data-full onClick={toggleFull}>{full || fake ? 'Вийти з повного екрана' : 'На весь екран'}</button>
        {onExit && <button className="g-chip" onClick={exit}>Закрити</button>}
      </div>
      <div className={`sl__body ${notes ? 'has-notes' : ''}`}>
        <div ref={stage} className="sl__stage">
          {!s ? (
            <div className="sl__cover">
              {(plan.level || plan.topic) && <div className="ls-meta">{[plan.level, plan.topic].filter(Boolean).join(' · ')}</div>}
              <h1 className="ls-title">{plan.title || 'Урок'}</h1>
              {plan.aims && <div className="ls-aims"><b>На цьому уроці</b><ul>{plan.aims.split('\n').filter((x) => x.trim()).map((a, k) => <li key={k}>{a}</li>)}</ul></div>}
            </div>
          ) : (
            <article className="ls sl__slide" key={i}>
              {s.title && <h2 className="ls-h sl__title">{s.title}</h2>}
              {s.blocks.map((b) => renderBlock(b))}
              {(hasEx || isLast) && footer}
            </article>
          )}
        </div>
        {notes && (
          <aside className="sl__notes">
            <small>Тільки для вчителя</small>
            {cur.length ? cur.map((n, k) => <p key={k}>{n}</p>) : <p className="t-muted">На цьому слайді нотаток немає.</p>}
          </aside>
        )}
      </div>
      <div className="sl__nav">
        <button className="mu-btn" onClick={() => go(-1)} disabled={i === 0} aria-label="Попередній слайд"><Icon id="e-arrow" className="mu-ic sl__back" />Назад</button>
        <div className="sl__dots">
          {Array.from({ length: total }, (_, k) => <button key={k} className={k === i ? 'is-on' : ''} onClick={() => setI(k)} aria-label={`Слайд ${k + 1}`} />)}
        </div>
        <button className="mu-btn mu-btn--lime" onClick={() => go(1)} disabled={isLast} aria-label="Наступний слайд">Далі<Icon id="e-arrow" /></button>
      </div>
    </div>
  );
}
