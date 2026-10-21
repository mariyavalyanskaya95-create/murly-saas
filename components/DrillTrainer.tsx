'use client';
// Тренажер граматики: 5 раундів по 20 завдань (або всі 100 підряд), вибір і «впиши сам», після кожної відповіді «Чому так?».
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import type { Drill, DrillQ } from '@/lib/drills/types';
import { useT } from './LangProvider';

const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const norm = (s: string) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.!?,]+$/g, '').replace(/\s+/g, ' ').trim();
const rightText = (q: DrillQ) => (q.k === 'choice' ? q.options[q.a] : q.answers[0]);

type Item = { q: DrillQ; options?: string[] };
type Res = { q: DrillQ; ok: boolean; given: string };

export default function DrillTrainer({ drill }: { drill: Drill }) {
  const t = useT();
  const [round, setRound] = useState(0); // 0..4, 5 = усі 100
  const [list, setList] = useState<Item[]>([]);
  const [i, setI] = useState(0);
  const [given, setGiven] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [res, setRes] = useState<Res[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);

  const qs = useMemo(() => (round === 5 ? drill.rounds.flatMap((r) => r.questions) : drill.rounds[round].questions), [drill, round]);
  const start = () => {
    setList(qs.map((q) => ({ q, options: q.k === 'choice' ? shuffle(q.options) : undefined })));
    setI(0); setGiven(null); setTyped(''); setRes([]);
  };
  useEffect(start, [qs]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (!given) input.current?.focus(); }, [i, given]);

  const pickRound = (r: number) => { setRound(r); top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const score = res.filter((r) => r.ok).length;
  const done = list.length > 0 && i >= list.length;
  const item = list[i];

  const answer = (val: string) => {
    if (given !== null || !item) return;
    const q = item.q;
    const ok = q.k === 'choice' ? val === q.options[q.a] : q.answers.some((a) => norm(a) === norm(val));
    setGiven(val);
    setRes((r) => [...r, { q, ok, given: val }]);
  };
  const next = () => { setI((x) => x + 1); setGiven(null); setTyped(''); };

  const tabs = [...drill.rounds.map((r, k) => ({ k, label: `${k + 1}` , title: r.title })), { k: 5, label: '100', title: t({ uk: 'Усі 100 підряд', ru: 'Все 100 подряд', en: 'All 100 in a row' }) }];

  return (
    <div className="dr" ref={top}>
      <div className="dr-tabs" role="tablist">
        {tabs.map((x) => (
          <button key={x.k} type="button" role="tab" aria-selected={round === x.k} className={`dr-tab ${round === x.k ? 'is-on' : ''}`} onClick={() => pickRound(x.k)} title={x.title}>
            <b>{x.k === 5 ? x.label : t({ uk: `Раунд ${x.label}`, ru: `Раунд ${x.label}`, en: `Round ${x.label}` })}</b>
            <small>{x.k === 5 ? x.title : x.title.replace(/^Раунд\s*\d+\.?\s*/i, '')}</small>
          </button>
        ))}
      </div>

      <div className="g-stage dr-stage">
        {!done && item && (
          <>
            <div className="dr-bar"><span style={{ width: `${(i / list.length) * 100}%` }} /></div>
            <div className="g-meta">
              <span>{i + 1} / {list.length}</span>
              <span>{t({ uk: 'Правильно', ru: 'Правильно', en: 'Correct' })}: {score}</span>
            </div>
            <div className="g-question dr-q">{item.q.q}</div>
            {item.q.k === 'choice' ? (
              <div className={`g-options ${item.options!.some((o) => o.length > 28) ? 'dr-options--long' : ''}`}>
                {item.options!.map((opt) => {
                  const q = item.q as Extract<DrillQ, { k: 'choice' }>;
                  const state = given === null ? '' : opt === q.options[q.a] ? 'is-right' : opt === given ? 'is-wrong' : 'is-dim';
                  return <button key={opt} type="button" className={`g-option ${state}`} onClick={() => answer(opt)}>{opt}</button>;
                })}
              </div>
            ) : (
              <form className="dr-type" onSubmit={(e) => { e.preventDefault(); if (given === null) { if (typed.trim()) answer(typed); } else next(); }}>
                <input ref={input} value={typed} onChange={(e) => setTyped(e.target.value)} disabled={given !== null} autoComplete="off" autoCapitalize="off" spellCheck={false}
                  className={given === null ? '' : res[res.length - 1]?.ok ? 'is-right' : 'is-wrong'} placeholder={t({ uk: 'Впиши відповідь', ru: 'Впиши ответ', en: 'Type your answer' })} aria-label={t({ uk: 'Відповідь', ru: 'Ответ', en: 'Answer' })} />
                {given === null && <button type="submit" className="mu-btn mu-btn--lime" disabled={!typed.trim()}>{t({ uk: 'Перевірити', ru: 'Проверить', en: 'Check' })}</button>}
              </form>
            )}
            {given !== null && (
              <div className={`dr-why ${res[res.length - 1]?.ok ? 'is-ok' : 'is-bad'}`} aria-live="polite">
                <b>{res[res.length - 1]?.ok ? t({ uk: 'Правильно!', ru: 'Правильно!', en: 'Correct!' }) : `${t({ uk: 'Правильна відповідь', ru: 'Правильный ответ', en: 'Correct answer' })}: ${rightText(item.q)}`}</b>
                <p><Icon id="d-bulb" /> <span><b>{t({ uk: 'Чому так?', ru: 'Почему так?', en: 'Why?' })}</b> {item.q.why}</span></p>
                <button type="button" className="mu-btn mu-btn--lime g-next" onClick={next} autoFocus>{i + 1 < list.length ? t({ uk: 'Далі', ru: 'Дальше', en: 'Next' }) : t({ uk: 'Результат', ru: 'Результат', en: 'Result' })}</button>
              </div>
            )}
          </>
        )}

        {done && (
          <div className="dr-done">
            <Icon id={score / list.length >= 0.7 ? 'e-trophy' : 'c-cat-sit'} className="mu-ic g-done__ic" />
            <div className="g-done__title">{score === list.length ? t({ uk: 'Ідеально!', ru: 'Идеально!', en: 'Perfect!' }) : score / list.length >= 0.7 ? t({ uk: 'Круто!', ru: 'Круто!', en: 'Awesome!' }) : t({ uk: 'Є над чим попрацювати', ru: 'Есть над чем поработать', en: 'Room to improve' })}</div>
            <div className="g-done__score">{score} / {list.length}</div>
            <div className="dr-done__btns">
              <button type="button" className="mu-btn" onClick={start}>{t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Try again' })}</button>
              {round < 4 && <button type="button" className="mu-btn mu-btn--lime" onClick={() => pickRound(round + 1)}>{t({ uk: 'Наступний раунд', ru: 'Следующий раунд', en: 'Next round' })} →</button>}
            </div>
            {res.some((r) => !r.ok) && (
              <div className="dr-mist">
                <h3>{t({ uk: 'Помилки, які варто розібрати', ru: 'Ошибки, которые стоит разобрать', en: 'Mistakes worth reviewing' })}</h3>
                {res.filter((r) => !r.ok).map((r, k) => (
                  <div key={k} className="dr-mist__row">
                    <div className="dr-mist__q">{r.q.q}</div>
                    <div><span className="gr-wrong">{r.given}</span> <span className="gr-right">{rightText(r.q)}</span></div>
                    <div className="dr-mist__why">{r.q.why}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
