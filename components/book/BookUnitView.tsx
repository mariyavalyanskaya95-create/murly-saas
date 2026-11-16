'use client';
// Розворот книги: ліва сторінка правило, права вправи з автоперевіркою. На телефоні сторінки йдуть одна за одною.
import { useMemo, useState } from 'react';
import Link from 'next/link';
import ExerciseView from '@/components/exercise/ExerciseView';
import { useT } from '@/components/LangProvider';
import { parseSection, grade, answerKey, type Answers } from '@/lib/exercise';
import type { BookUnit } from '@/lib/grammar-book';
import BookScene from './BookScene';

export default function BookUnitView({ unit, book, prev, next }: { unit: BookUnit; book: string; prev?: { slug: string; n: number }; next?: { slug: string; n: number } }) {
  const t = useT();
  const sections = useMemo(() => unit.exercises.map((e) => parseSection(e.type, e.instruction, e.text)), [unit]);
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const result = useMemo(() => (checked ? grade(sections, answers) : null), [checked, sections, answers]);
  const key = useMemo(() => answerKey(sections), [sections]);

  return (
    <div className="gb-spread">
      <article className="gb-page gb-page--rule">
        <header className="gb-head">
          <span className="gb-num">Unit {unit.n}</span>
          <h1>{unit.title}</h1>
          <p className="gb-topic">{t(unit.topic)}</p>
        </header>
        <figure className="gb-fig">
          <BookScene scene={unit.scene} />
          <figcaption>{t(unit.story)}</figcaption>
        </figure>
        <div className="gb-formulas">
          {unit.formula.map((f, i) => (
            <table key={i} className="gb-table">
              <caption>{t(f.label)}</caption>
              <tbody>{f.rows.map(([a, b], j) => <tr key={j}><td>{a}</td><td>{b}</td></tr>)}</tbody>
            </table>
          ))}
        </div>
        <div className="gb-rules">
          {unit.rules.map((r, i) => <div key={i} className="gb-rule"><b>{t(r.h)}</b><p>{t(r.p)}</p></div>)}
        </div>
        <ul className="gb-ex">
          {unit.examples.map(([en, tr], i) => <li key={i}><span lang="en">{en}</span><small>{t(tr)}</small></li>)}
        </ul>
        <div className="gb-traps">
          <b>{t({ uk: 'Пастки', ru: 'Ловушки', en: 'Traps' })}</b>
          {unit.traps.map(([w, r], i) => <p key={i}><s>{w}</s> <span aria-hidden="true">→</span> <strong>{r}</strong></p>)}
        </div>
      </article>

      <article className="gb-page gb-page--practice">
        <header className="gb-head">
          <span className="gb-num">Unit {unit.n}</span>
          <h2>{t({ uk: 'Вправи', ru: 'Упражнения', en: 'Practice' })}</h2>
        </header>
        {sections.map((s, i) => (
          <section key={i} className="gb-task">
            <h3><span>{String.fromCharCode(65 + i)}</span>{t(unit.exercises[i].title)}</h3>
            {showKey
              ? <ExerciseView sections={[s]} offset={i} numbered={false} answers={key} marks={Object.fromEntries(Object.keys(key).map((k) => [k, true]))} />
              : <ExerciseView sections={[s]} offset={i} numbered={false} answers={answers}
                  onChange={(k, v) => { setChecked(false); setAnswers((a) => ({ ...a, [k]: v })); }}
                  marks={result?.marks} showCorrect={checked} />}
          </section>
        ))}
        <div className="gb-actions no-print">
          <button type="button" className="mu-btn mu-btn--lime" onClick={() => { setShowKey(false); setChecked(true); }}>{t({ uk: 'Перевірити', ru: 'Проверить', en: 'Check' })}</button>
          <button type="button" className="mu-btn" onClick={() => setShowKey((v) => !v)}>{showKey ? t({ uk: 'Сховати відповіді', ru: 'Скрыть ответы', en: 'Hide answers' }) : t({ uk: 'Показати відповіді', ru: 'Показать ответы', en: 'Show answers' })}</button>
          <button type="button" className="mu-btn" onClick={() => window.print()}>{t({ uk: 'Друк / PDF', ru: 'Печать / PDF', en: 'Print / PDF' })}</button>
          {result && <span className="gb-score">{result.score} / {result.total}</span>}
        </div>
        <nav className="gb-pager no-print">
          {prev ? <Link href={`/grammar-book/${book}/${prev.slug}`} className="g-chip">← Unit {prev.n}</Link> : <span />}
          <Link href="/grammar-book" className="g-chip">{t({ uk: 'Зміст', ru: 'Содержание', en: 'Contents' })}</Link>
          {next ? <Link href={`/grammar-book/${book}/${next.slug}`} className="g-chip">Unit {next.n} →</Link> : <span />}
        </nav>
      </article>
    </div>
  );
}
