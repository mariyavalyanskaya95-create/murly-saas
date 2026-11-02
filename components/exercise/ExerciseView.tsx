'use client';
import { useMemo } from 'react';
import { SCALE, normalizeSections, type Answers, type Section } from '@/lib/exercise';
import VoiceRecorder from './VoiceRecorder';
import { useT } from '@/components/LangProvider';

// Показ вправи: учень заповнює (onChange), або вчитель/учень бачать перевірку (marks)
export default function ExerciseView({ sections: raw, answers, onChange, marks, showCorrect, overrides, onOverride, aiNotes, offset = 0, numbered = true }: {
  sections: Section[]; answers: Answers; onChange?: (key: string, v: string) => void;
  marks?: Record<string, boolean>; showCorrect?: boolean;
  overrides?: Record<string, boolean>; onOverride?: (key: string, v?: boolean | null) => void; aiNotes?: Record<string, { ok: boolean; fix?: string; why?: string }>; // вчитель: зарахувати / помилка / зняти позначку
  offset?: number; // зсув номера секції (коли вправ кілька в уроці)
  numbered?: boolean;
}) {
  const tx = useT();
  // старі й «криві» секції (переклад без пропусків, пропуски ____ у питаннях) показуємо правильно скрізь, і в уроках теж
  const sections = useMemo(() => normalizeSections(raw) ?? raw, [raw]);
  // Варіанти для вибору перемішуємо один раз, щоб правильний не був завжди першим
  const order = useMemo(() => {
    const o: Record<string, string[]> = {};
    sections.forEach((s, i0) => s.tasks.forEach((t, ti) => t.parts?.forEach((p, pi) => {
      const si = i0 + offset;
      if (p.t === 'choice') {
        const a = [...p.options];
        for (let i = a.length - 1; i > 0; i--) { const j = (si * 7 + ti * 3 + pi + i * 5) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
        o[`${si}.${ti}.${pi}`] = a;
      }
    })));
    return o;
  }, [sections, offset]);
  const ro = !onChange;
  // поле відповіді росте разом з текстом, без величезних порожніх рамок
  const grow = (el: HTMLTextAreaElement | null) => { if (!el) return; el.style.height = 'auto'; el.style.height = `${el.scrollHeight + 2}px`; };
  const ov = (k: string, manual = false) => {
    if (!onOverride || !String(answers[k] ?? '').trim()) return null;
    // відповідь без ключа: вчитель ставить ✓ або ✗ одним натисканням
    if (manual) {
      const v = overrides?.[k];
      const judge = (
        <span className="ex-judge" role="group" aria-label={tx({ uk: 'Оцінити відповідь', ru: 'Оценить ответ', en: 'Mark the answer' })}>
          <button type="button" className={`ex-judge__ok ${v === true ? 'is-on' : ''}`} onClick={() => onOverride(k, v === true ? null : true)} title={tx({ uk: 'Правильно', ru: 'Правильно', en: 'Correct' })}>✓</button>
          <button type="button" className={`ex-judge__no ${v === false ? 'is-on' : ''}`} onClick={() => onOverride(k, v === false ? null : false)} title={tx({ uk: 'Помилка', ru: 'Ошибка', en: 'Wrong' })}>✕</button>
        </span>
      );
      const n = aiNotes?.[k];
      return n && !n.ok && (n.fix || n.why) ? <>{judge}<span className="ex-ai">{n.fix ? <b>{n.fix}</b> : null}{n.fix && n.why ? ' · ' : ''}{n.why}</span></> : judge;
    }
    if (!marks || !(k in marks)) return null;
    if (overrides?.[k]) return <button type="button" className="ex-ov is-on" onClick={() => onOverride(k, null)} title={tx({ uk: 'Скасувати', ru: 'Отменить', en: 'Undo' })}>{tx({ uk: 'зараховано вручну', ru: 'засчитано вручную', en: 'accepted by hand' })} ✕</button>;
    if (marks[k] === false) return <button type="button" className="ex-ov" onClick={() => onOverride(k, true)}>{tx({ uk: 'Зарахувати', ru: 'Засчитать', en: 'Accept' })}</button>;
    return null;
  };
  const showFix = (k: string) => showCorrect && marks?.[k] === false;
  const cls = (k: string) => (marks && k in marks ? (marks[k] ? 'is-right' : 'is-wrong') : '');

  return (
    <div className="ex">
      {sections.map((s, i0) => { const si = i0 + offset; return (
        <div key={i0} className="ex-sec">
          {s.instruction && <div className="ex-sec__title">{numbered ? `${i0 + 1}. ` : ''}{s.instruction}</div>}
          <ol className="ex-list">
            {s.tasks.map((t, ti) => (
              <li key={ti} className="ex-task">
                {s.type === 'scale' ? (
                  <div className="ex-qa">
                    <div className="ex-prompt">{t.prompt}</div>
                    <div className="ex-scale" role="radiogroup" aria-label={t.prompt}>
                      {SCALE.map((opt, oi) => (
                        <button type="button" key={opt} disabled={ro} role="radio" aria-checked={answers[`${si}.${ti}.0`] === opt}
                          className={`ex-scale__opt s${oi} ${answers[`${si}.${ti}.0`] === opt ? 'is-on' : ''}`} onClick={() => onChange?.(`${si}.${ti}.0`, opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>
                ) : s.type === 'voice' ? (
                  <div className="ex-qa">
                    <div className="ex-prompt">{t.prompt}</div>
                    <VoiceRecorder value={answers[`${si}.${ti}.0`]} readOnly={ro} onChange={(url) => onChange?.(`${si}.${ti}.0`, url)} />
                  </div>
                ) : s.type === 'translate' || s.type === 'open' || (t.parts?.length && t.parts.every((p) => p.t === 'text')) ? (
                  <div className="ex-qa">
                    <div className="ex-prompt">{t.prompt ?? (t.parts ?? []).map((p) => (p.t === 'text' ? p.v : '')).join('')}</div>
                    <textarea className={`ex-input ex-input--wide ex-grow ${cls(`${si}.${ti}.0`)}`} rows={1} readOnly={ro} value={answers[`${si}.${ti}.0`] ?? ''}
                      ref={grow} onInput={(e) => grow(e.currentTarget)} onChange={(e) => onChange?.(`${si}.${ti}.0`, e.target.value)}
                      placeholder={ro ? '' : s.type === 'open' && !/[а-яіїєґё]/i.test(t.prompt ?? '') ? tx({ uk: 'Твоя відповідь', ru: 'Твой ответ', en: 'Your answer' }) : tx({ uk: 'Переклад англійською', ru: 'Перевод на английский', en: 'Translation in English' })}
                      autoCapitalize="sentences" spellCheck={false} />
                    {showFix(`${si}.${ti}.0`) && t.answers?.length ? <span className="ex-correct">{t.answers[0]}</span> : null}
                    {ov(`${si}.${ti}.0`, s.type !== 'translate' || !(t.answers ?? []).length)}
                  </div>
                ) : (
                  <span className="ex-line">
                    {t.parts?.map((p, pi) => {
                      const k = `${si}.${ti}.${pi}`;
                      if (p.t === 'text') return <span key={pi}>{p.v}</span>;
                      if (p.t === 'gap') return (
                        <span key={pi} className="ex-slot">
                          <input className={`ex-input ${cls(k)}`} readOnly={ro} value={answers[k] ?? ''} size={12}
                            onChange={(e) => onChange?.(k, e.target.value)} aria-label={tx({ uk: 'Відповідь', ru: 'Ответ', en: 'Answer' })} autoCapitalize="off" autoComplete="off" spellCheck={false} />
                          {showFix(k) && <span className="ex-correct">{p.answers[0]}</span>}
                          {ov(k, !p.answers.length)}
                        </span>
                      );
                      if (p.options.length > 4 || p.options.some((o) => o.length > 18)) return (
                        <span key={pi} className="ex-slot">
                          <select className={`ex-input ex-select ${cls(k)}`} disabled={ro} value={answers[k] ?? ''} onChange={(e) => onChange?.(k, e.target.value)} aria-label={tx({ uk: 'Обери відповідь', ru: 'Выбери ответ', en: 'Choose an answer' })}>
                            <option value="" disabled>{tx({ uk: 'Обери…', ru: 'Выбери…', en: 'Choose…' })}</option>
                            {(order[k] ?? p.options).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                          {showFix(k) && <span className="ex-correct">{p.options[0]}</span>}
                          {ov(k)}
                        </span>
                      );
                      return (
                        <span key={pi} className="ex-slot">
                          <span className="ex-choices" role="radiogroup">
                            {(order[k] ?? p.options).map((opt) => (
                              <button type="button" key={opt} disabled={ro} role="radio" aria-checked={answers[k] === opt}
                                className={`ex-choice ${answers[k] === opt ? 'is-on' : ''} ${answers[k] === opt ? cls(k) : ''} ${showFix(k) && opt === p.options[0] ? 'is-correct' : ''}`}
                                onClick={() => onChange?.(k, opt)}>{opt}</button>
                            ))}
                          </span>
                          {ov(k)}
                        </span>
                      );
                    })}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      ); })}
    </div>
  );
}
