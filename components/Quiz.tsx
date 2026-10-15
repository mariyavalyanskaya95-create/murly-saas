'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { useT } from './LangProvider';
import type { Quiz as QuizT } from '@/lib/quizzes';

type Props = { quiz: QuizT; next?: { slug: string; title: string; number: string } };

const LIVES = 3;

export default function Quiz({ quiz, next }: Props) {
  const t = useT();
  const total = quiz.questions.length;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [hearts, setHearts] = useState(LIVES);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const done = current >= total || hearts <= 0;
  const q = done ? null : quiz.questions[current];
  const locked = selected !== null;

  const choose = useCallback(
    (i: number) => {
      if (!q || locked) return;
      setSelected(i);
      if (i === q.answer) setCorrect((c) => c + 1);
      else setHearts((h) => h - 1);
    },
    [q, locked]
  );

  const goNext = useCallback(() => {
    setSelected(null);
    setCurrent((c) => c + 1);
  }, []);

  useEffect(() => { if (locked) nextRef.current?.focus(); }, [locked]);
  useEffect(() => { if (done && finishedAt === null) setFinishedAt(Date.now()); }, [done, finishedAt]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done) return;
      if (e.key === 'Enter' && locked) { goNext(); return; }
      if (locked) return;
      const letter = ['a', 'b', 'c', 'd'].indexOf(e.key.toLowerCase());
      const num = parseInt(e.key, 10) - 1;
      const i = letter >= 0 ? letter : num >= 0 && num < 4 ? num : -1;
      if (i >= 0 && q && i < q.options.length) choose(i);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [done, locked, goNext, choose, q]);

  function restart() {
    setCurrent(0); setSelected(null); setCorrect(0); setHearts(LIVES);
    setStartedAt(Date.now()); setFinishedAt(null);
  }

  const progress = done ? 100 : (current / total) * 100;

  return (
    <div className="q-wrap">
      <div className="q-top">
        <Link href="/" className="q-close" title={t({ uk: 'Вийти', ru: 'Выйти', en: 'Exit' })}>✕</Link>
        <div className="q-progress"><div className="q-progress__bar" style={{ width: `${progress}%` }} /></div>
        <div className="q-hearts"><Icon id="d-heart" /><span>{hearts}</span></div>
      </div>

      <div className="q-card">
        {q ? (
          <>
            {q.passage && quiz.passage && (
              <details className="q-passage" open={current === 0}>
                <summary><Icon id="e-book" />{t({ uk: 'Текст для читання', ru: 'Текст для чтения', en: 'Reading text' })}</summary>
                <div className="q-passage__body" dangerouslySetInnerHTML={{ __html: quiz.passage }} />
              </details>
            )}
            <span className="q-hint"><Icon id="d-bulb" />{q.hint}</span>
            <div className={`q-stem${q.passage ? ' q-stem--read' : ''}`}>
              {q.stem.split('___').map((part, i, arr) => (
                <span key={i}>{part}{i < arr.length - 1 && <span className="q-stem__blank">___</span>}</span>
              ))}
            </div>
            <div className="q-options">
              {q.options.map((opt, i) => {
                let cls = 'q-option';
                if (locked && i === q.answer) cls += ' right';
                else if (locked && i === selected) cls += ' wrong';
                return (
                  <button key={i} className={cls} disabled={locked} onClick={() => choose(i)}>
                    <span>{opt}</span>
                    <span className="q-option__key">{String.fromCharCode(65 + i)}</span>
                  </button>
                );
              })}
            </div>
            {locked && (
              <div className="q-ai on">
                <b><Icon id="d-spark" />{t({ uk: 'Чому так?', ru: 'Почему так?', en: 'Why?' })}</b>
                {q.ai}
              </div>
            )}
          </>
        ) : (
          <Done
            correct={correct} total={total} hearts={hearts}
            seconds={Math.round(((finishedAt ?? Date.now()) - startedAt) / 1000)}
            next={next} onRestart={restart}
          />
        )}
      </div>

      {q && (
        <div className="q-footer">
          <div className={`q-feedback${locked ? (selected === q.answer ? ' right' : ' wrong') : ''}`}>
            {locked && (selected === q.answer ? `✓ ${t({ uk: 'Чудово!', ru: 'Отлично!', en: 'Great!' })}` : `✗ ${t({ uk: 'Не той варіант. Правильно', ru: 'Не тот вариант. Правильно', en: 'Not quite. The right answer is' })}: ${q.options[q.answer]}`)}
          </div>
          {locked && (
            <button ref={nextRef} className="mu-btn mu-btn--lime" onClick={goNext}>
              {t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Done({ correct, total, hearts, seconds, next, onRestart }: {
  correct: number; total: number; hearts: number; seconds: number;
  next?: Props['next']; onRestart: () => void;
}) {
  const t = useT();
  const pct = Math.round((correct / total) * 100);
  const title = t(pct >= 90 ? { uk: 'Крекнув!', ru: 'Взломал!', en: 'You cracked it!' }
    : pct >= 70 ? { uk: 'Непогано!', ru: 'Неплохо!', en: 'Not bad!' }
    : pct >= 40 ? { uk: 'Є над чим попрацювати', ru: 'Есть над чем поработать', en: 'Room to improve' }
    : { uk: 'Нічого страшного, спробуй ще раз', ru: 'Ничего страшного, попробуй ещё раз', en: 'No worries, try again' });
  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  return (
    <div className="q-done">
      <span className="q-done__stk">
        <svg className="mu-stk__blob" aria-hidden="true"><use href="/ikonky.svg#b2" /></svg>
        <svg className="mu-stk__ic" aria-hidden="true"><use href="/ikonky.svg#c-cat-speak" /></svg>
      </span>
      <h2>{title}</h2>
      <p style={{ color: 'var(--mu-ink-soft)' }}>{t({ uk: 'Квіз завершено. Ось твій результат:', ru: 'Квиз завершён. Вот твой результат:', en: 'Quiz complete. Here is your result:' })}</p>
      <div className="q-done__score">{correct}/{total}</div>
      <div className="q-done__meta">
        <span className="q-done__chip"><Icon id="d-clock" />{time}</span>
        <span className="q-done__chip"><Icon id="e-trophy" />{pct}%</span>
        <span className="q-done__chip"><Icon id="d-heart" />{hearts}</span>
      </div>
      <div className="q-done__actions">
        <Link href="/" className="mu-btn mu-btn--lg"><Icon id="e-arrow" className="mu-ic mu-ic--back" />{t({ uk: 'На головну', ru: 'На главную', en: 'Home' })}</Link>
        {next && (
          <Link href={`/quiz/${next.slug}`} className="mu-btn mu-btn--tomato mu-btn--lg">
            {t({ uk: 'Квіз', ru: 'Квиз', en: 'Quiz' })} {next.number}: {next.title}
            <span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
          </Link>
        )}
        <button className="mu-btn mu-btn--lime mu-btn--lg" onClick={onRestart}>
          <Icon id="d-auto" />{t({ uk: 'Пройти знову', ru: 'Пройти снова', en: 'Try again' })}
        </button>
      </div>
    </div>
  );
}
