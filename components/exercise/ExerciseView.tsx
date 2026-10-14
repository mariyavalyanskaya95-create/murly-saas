'use client';
import { useMemo } from 'react';
import type { Answers, Section } from '@/lib/exercise';

// Показ вправи: учень заповнює (onChange), або вчитель/учень бачать перевірку (marks)
export default function ExerciseView({ sections, answers, onChange, marks, showCorrect }: {
  sections: Section[]; answers: Answers; onChange?: (key: string, v: string) => void;
  marks?: Record<string, boolean>; showCorrect?: boolean;
}) {
  // Варіанти для вибору перемішуємо один раз, щоб правильний не був завжди першим
  const order = useMemo(() => {
    const o: Record<string, string[]> = {};
    sections.forEach((s, si) => s.tasks.forEach((t, ti) => t.parts?.forEach((p, pi) => {
      if (p.t === 'choice') {
        const a = [...p.options];
        for (let i = a.length - 1; i > 0; i--) { const j = (si * 7 + ti * 3 + pi + i * 5) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
        o[`${si}.${ti}.${pi}`] = a;
      }
    })));
    return o;
  }, [sections]);
  const ro = !onChange;
  const cls = (k: string) => (marks && k in marks ? (marks[k] ? 'is-right' : 'is-wrong') : '');

  return (
    <div className="ex">
      {sections.map((s, si) => (
        <div key={si} className="ex-sec">
          {s.instruction && <div className="ex-sec__title">{si + 1}. {s.instruction}</div>}
          <ol className="ex-list">
            {s.tasks.map((t, ti) => (
              <li key={ti} className="ex-task">
                {s.type === 'translate' || s.type === 'open' ? (
                  <div className="ex-qa">
                    <div className="ex-prompt">{t.prompt}</div>
                    {s.type === 'open'
                      ? <textarea className="ex-input ex-input--wide" rows={2} readOnly={ro} value={answers[`${si}.${ti}.0`] ?? ''}
                          onChange={(e) => onChange?.(`${si}.${ti}.0`, e.target.value)} placeholder={ro ? '' : 'Твоя відповідь'} />
                      : <input className={`ex-input ex-input--wide ${cls(`${si}.${ti}.0`)}`} readOnly={ro} value={answers[`${si}.${ti}.0`] ?? ''}
                          onChange={(e) => onChange?.(`${si}.${ti}.0`, e.target.value)} placeholder={ro ? '' : 'Переклад англійською'} />}
                    {showCorrect && marks && marks[`${si}.${ti}.0`] === false && t.answers?.length ? <span className="ex-correct">{t.answers[0]}</span> : null}
                  </div>
                ) : (
                  <span className="ex-line">
                    {t.parts?.map((p, pi) => {
                      const k = `${si}.${ti}.${pi}`;
                      if (p.t === 'text') return <span key={pi}>{p.v}</span>;
                      if (p.t === 'gap') return (
                        <span key={pi} className="ex-slot">
                          <input className={`ex-input ${cls(k)}`} readOnly={ro} value={answers[k] ?? ''} size={Math.max(6, (p.answers[0] ?? '').length + 2)}
                            onChange={(e) => onChange?.(k, e.target.value)} aria-label="Відповідь" autoCapitalize="off" autoComplete="off" spellCheck={false} />
                          {showCorrect && marks?.[k] === false && <span className="ex-correct">{p.answers[0]}</span>}
                        </span>
                      );
                      return (
                        <span key={pi} className="ex-slot">
                          <span className="ex-choices" role="radiogroup">
                            {(order[k] ?? p.options).map((opt) => (
                              <button type="button" key={opt} disabled={ro} role="radio" aria-checked={answers[k] === opt}
                                className={`ex-choice ${answers[k] === opt ? 'is-on' : ''} ${answers[k] === opt ? cls(k) : ''} ${showCorrect && marks?.[k] === false && opt === p.options[0] ? 'is-correct' : ''}`}
                                onClick={() => onChange?.(k, opt)}>{opt}</button>
                            ))}
                          </span>
                        </span>
                      );
                    })}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
