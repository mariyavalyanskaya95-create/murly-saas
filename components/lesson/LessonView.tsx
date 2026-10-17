'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import ExerciseView from '../exercise/ExerciseView';
import GameHub from '../games/GameHub';
import AudioPlayer from './AudioPlayer';
import Kit from '../Kit';
import { answerKey, grade, type Answers } from '@/lib/exercise';
import { useT } from '@/components/LangProvider';
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

function VocabBlock({ b, onWord }: { b: Extract<Block, { type: 'vocab' }>; onWord?: (w: { en: string; uk: string }) => void }) {
  const t = useT();
  const [play, setPlay] = useState(false);
  const sets = useMemo(() => [
    { id: 'en', title: t({ uk: 'Англ → Укр', ru: 'Англ → Перевод', en: 'English → Translation' }), prompt: t({ uk: 'Як це перекладається?', ru: 'Как это переводится?', en: 'What does it mean?' }), items: b.words.map((w) => ({ q: w.en, a: w.uk })) },
    { id: 'uk', title: t({ uk: 'Укр → Англ', ru: 'Перевод → Англ', en: 'Translation → English' }), prompt: t({ uk: 'Як це англійською?', ru: 'Как это по-английски?', en: 'How do you say it in English?' }), items: b.words.map((w) => ({ q: w.uk, a: w.en })) },
  ], [b.words, t.lang]);
  return (
    <div className="ls-vocab">
      <div className="ls-vocab__grid">
        {b.words.map((w, i) => (
          <div key={i} className="ls-word">
            <b>{w.en}</b><span>{w.uk}</span>
            {onWord && <button type="button" className="ls-word__add" onClick={() => onWord(w)} title={t({ uk: 'У словник учня', ru: 'В словарь ученика', en: 'To the student’s dictionary' })} aria-label={t({ uk: `Додати «${w.en}» у словник учня`, ru: `Добавить «${w.en}» в словарь ученика`, en: `Add “${w.en}” to the student’s dictionary` })}>+</button>}
          </div>
        ))}
      </div>
      {b.words.length >= 4 && (
        <button className="mu-btn t-btn-sm" onClick={() => setPlay(!play)}><Icon id="e-trophy" />{play ? t({ uk: 'Сховати гру', ru: 'Скрыть игру', en: 'Hide game' }) : t({ uk: 'Пограти цими словами', ru: 'Поиграть этими словами', en: 'Play with these words' })}</button>
      )}
      {play && <GameHub sets={sets} />}
    </div>
  );
}

export default function LessonView({ plan, interactive = true, initialAnswers, onSubmit, submitLabel, overrides, teacher = false, slides = false, onExit, onWord, answerKey: showKey = false }: {
  plan: Pick<Plan, 'title' | 'blocks'> & Partial<Plan>;
  interactive?: boolean;
  initialAnswers?: Answers;
  onSubmit?: (answers: Answers) => Promise<boolean> | boolean | void;
  submitLabel?: string;
  overrides?: Record<string, boolean>;
  teacher?: boolean; // показувати нотатки для вчителя
  slides?: boolean; // режим показу на уроці: по одному слайду
  onExit?: () => void;
  onWord?: (w: { en: string; uk: string }) => void; // вчитель: додати слово в словник учня
  answerKey?: boolean; // версія вчителя: усі правильні відповіді вже вписані
}) {
  const t = useT();
  const sections = useMemo(() => lessonSections(plan.blocks), [plan.blocks]);
  const [answers, setAnswers] = useState<Answers>(initialAnswers ?? {});
  const [checked, setChecked] = useState(!!initialAnswers && Object.keys(initialAnswers).length > 0);
  const key = useMemo(() => (showKey ? answerKey(sections) : null), [showKey, sections]);
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
          case 'note': return teacher && b.text ? <div key={b.id} className="ls-note"><Icon id="d-lock" /><div><small>{t({ uk: 'Тільки для вчителя', ru: 'Только для учителя', en: 'Teacher only' })}</small><Rich text={b.text} /></div></div> : null;
          case 'text': return <div key={b.id} className="ls-text"><Rich text={b.text} /></div>;
          case 'tip': return <div key={b.id} className="ls-tip"><Icon id="d-bulb" className="mu-ic ls-tip__ic" /><div><Rich text={b.text} /></div></div>;
          case 'image': return b.url ? <figure key={b.id} className="ls-fig"><img src={b.url} alt={b.caption || ''} loading="lazy" />{b.caption && <figcaption>{b.caption}</figcaption>}</figure> : null;
          case 'video': {
            const src = youtubeEmbed(b.url);
            return src ? (
              <figure key={b.id} className="ls-fig">
                {b.task && <div className="ls-watch"><Icon id="e-mic" />{b.task}</div>}
                <div className="ls-video"><iframe src={src} title={b.caption || t({ uk: 'Відео', ru: 'Видео', en: 'Video' })} allow="encrypted-media; picture-in-picture" allowFullScreen loading="lazy" /></div>
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            ) : null;
          }
          case 'meme': return (
            <figure key={b.id} className="ls-meme">
              <Kit id={b.kit} className="ls-meme__kit" />
              <figcaption><b>{b.top}</b>{b.bottom && <b>{b.bottom}</b>}{b.uk && <small>{b.uk}</small>}</figcaption>
            </figure>
          );
          case 'game': return b.items.length ? (
            <section key={b.id} className="ls-game">
              <h3 className="ls-game__t"><Icon id="e-trophy" />{b.title}</h3>
              <div className="ls-game__live"><GameHub sets={[{ id: b.id, title: b.title, prompt: b.prompt, items: b.items }]} /></div>
              <ol className="ls-game__print">{b.items.map((x, i) => <li key={i}>{x.q} <span>→ {teacher ? x.a : '__________'}</span></li>)}</ol>
            </section>
          ) : null;
          case 'audio': return b.script.trim() || b.audioUrl ? <AudioPlayer key={b.id} script={b.script} title={b.title} audioUrl={b.audioUrl} /> : null;
          case 'pdf': return b.url ? (
            <div key={b.id} className="ls-pdf">
              <div className="ls-pdf__bar"><span><Icon id="e-book" />{b.name || 'PDF'}</span><a href={b.url} target="_blank" rel="noopener noreferrer" className="mu-btn t-btn-sm">{t({ uk: 'Відкрити', ru: 'Открыть', en: 'Open' })}</a></div>
              <iframe src={`${b.url}#view=FitH`} title={b.name || 'PDF'} className="ls-pdf__frame" loading="lazy" />
            </div>
          ) : null;
          case 'vocab': return b.words.length ? <VocabBlock key={b.id} b={b} onWord={onWord} /> : null;
          case 'speaking': return b.questions.length ? (
            <div key={b.id} className="ls-speak"><div className="ls-speak__t"><Icon id="e-speak" />{t({ uk: 'Поговоримо', ru: 'Поговорим', en: 'Let’s talk' })}</div><ul>{b.questions.map((q, i) => <li key={i}>{q}</li>)}</ul></div>
          ) : null;
          case 'exercise': {
            if (!b.sections.length) return null;
            return (
              <div key={b.id} className="ls-ex">
                <div className="ls-ex__label"><Icon id="e-pencil" />{t({ uk: 'Вправа', ru: 'Упражнение', en: 'Exercise' })} {exNos[b.id]}</div>
                {key
                  ? <ExerciseView sections={b.sections} offset={offsets[b.id]} numbered={b.sections.length > 1} answers={key} marks={Object.fromEntries(Object.keys(key).map((k) => [k, true]))} />
                  : <ExerciseView sections={b.sections} offset={offsets[b.id]} numbered={b.sections.length > 1} answers={answers}
                  onChange={interactive && !checked ? (k, v) => setAnswers((a) => ({ ...a, [k]: v })) : undefined}
                  marks={result?.marks} showCorrect={checked} overrides={overrides} />}
              </div>
            );
          }
        }
  };

  const footer = interactive && !showKey && sections.length > 0 ? (
    <div className="ls-foot">
      {result && <div className="ex-result"><b>{result.score} / {result.total}</b><span>{result.total && result.score === result.total ? t({ uk: 'Ідеально!', ru: 'Идеально!', en: 'Perfect!' }) : t({ uk: 'Правильні відповіді показані під помилками.', ru: 'Правильные ответы показаны под ошибками.', en: 'The correct answers are shown under your mistakes.' })}</span></div>}
      {!checked
        ? <button className="mu-btn mu-btn--lime mu-btn--lg" onClick={check} disabled={saving}>{saving ? t({ uk: 'Зберігаю…', ru: 'Сохраняю…', en: 'Saving…' }) : submitLabel ?? t({ uk: 'Перевірити відповіді', ru: 'Проверить ответы', en: 'Check answers' })}</button>
        : <button className="mu-btn" onClick={() => setChecked(false)}>{t({ uk: 'Виправити помилки', ru: 'Исправить ошибки', en: 'Fix mistakes' })}</button>}
      {err && <p className="t-neg">{t({ uk: 'Не вдалося зберегти. Спробуй ще раз.', ru: 'Не удалось сохранить. Попробуй ещё раз.', en: 'Could not save. Please try again.' })}</p>}
    </div>
  ) : null;

  if (slides) return <SlideShow plan={plan} renderBlock={renderBlock} footer={footer} teacher={teacher} onExit={onExit} />;

  return (
    <article className="ls">
      {plan.title && <h1 className="ls-title">{plan.title}</h1>}
      {(plan.level || plan.topic) && <div className="ls-meta">{[plan.level, plan.topic, ...(plan.focus ?? [])].filter(Boolean).join(' · ')}</div>}
      {plan.aims && (
        <div className="ls-aims"><b>{t({ uk: 'На цьому уроці', ru: 'На этом уроке', en: 'In this lesson' })}</b><ul>{plan.aims.split('\n').filter((x) => x.trim()).map((a, i) => <li key={i}>{a}</li>)}</ul></div>
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
  const t = useT();
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
        {teacher && <button className={`g-chip ${notes ? 'is-on' : ''}`} onClick={() => setNotes(!notes)} aria-pressed={notes}>{t({ uk: 'Нотатки', ru: 'Заметки', en: 'Notes' })}{cur.length ? ` (${cur.length})` : ''}</button>}
        <button className="g-chip" data-full onClick={toggleFull}>{full || fake ? t({ uk: 'Вийти з повного екрана', ru: 'Выйти из полноэкранного режима', en: 'Exit full screen' }) : t({ uk: 'На весь екран', ru: 'На весь экран', en: 'Full screen' })}</button>
        {onExit && <button className="g-chip" onClick={exit}>{t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}</button>}
      </div>
      <div className={`sl__body ${notes ? 'has-notes' : ''}`}>
        <div ref={stage} className="sl__stage">
          {!s ? (
            <div className="sl__cover">
              {(plan.level || plan.topic) && <div className="ls-meta">{[plan.level, plan.topic].filter(Boolean).join(' · ')}</div>}
              <h1 className="ls-title">{plan.title || t({ uk: 'Урок', ru: 'Урок', en: 'Lesson' })}</h1>
              {plan.aims && <div className="ls-aims"><b>{t({ uk: 'На цьому уроці', ru: 'На этом уроке', en: 'In this lesson' })}</b><ul>{plan.aims.split('\n').filter((x) => x.trim()).map((a, k) => <li key={k}>{a}</li>)}</ul></div>}
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
            <small>{t({ uk: 'Тільки для вчителя', ru: 'Только для учителя', en: 'Teacher only' })}</small>
            {cur.length ? cur.map((n, k) => <p key={k}>{n}</p>) : <p className="t-muted">{t({ uk: 'На цьому слайді нотаток немає.', ru: 'На этом слайде заметок нет.', en: 'No notes on this slide.' })}</p>}
          </aside>
        )}
      </div>
      <div className="sl__nav">
        <button className="mu-btn" onClick={() => go(-1)} disabled={i === 0} aria-label={t({ uk: 'Попередній слайд', ru: 'Предыдущий слайд', en: 'Previous slide' })}><Icon id="e-arrow" className="mu-ic sl__back" />{t({ uk: 'Назад', ru: 'Назад', en: 'Back' })}</button>
        <div className="sl__dots">
          {Array.from({ length: total }, (_, k) => <button key={k} className={k === i ? 'is-on' : ''} onClick={() => setI(k)} aria-label={`${t({ uk: 'Слайд', ru: 'Слайд', en: 'Slide' })} ${k + 1}`} />)}
        </div>
        <button className="mu-btn mu-btn--lime" onClick={() => go(1)} disabled={isLast} aria-label={t({ uk: 'Наступний слайд', ru: 'Следующий слайд', en: 'Next slide' })}>{t({ uk: 'Далі', ru: 'Далее', en: 'Next' })}<Icon id="e-arrow" /></button>
      </div>
    </div>
  );
}
