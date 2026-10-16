'use client';
// Пробний НМТ: 6 Task-ів, 32 завдання, режим тренування (одразу видно правильну відповідь і «Чому так?»)
// або режим іспиту (усе видно після «Завершити тест»).
import { Fragment, useEffect, useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import Kit from '@/components/Kit';
import Poster from './Poster';
import { useT } from '@/components/LangProvider';
import { LETTERS, type MockTask, type MockVariant } from '@/lib/mock/types';

type Answers = Record<string, number>;
const key = (ti: number, qi: number) => `${ti}.${qi}`;

// Стабільне перемішування варіантів у Task 5-6, щоб правильна відповідь не стояла завжди першою
function order(seed: string, n: number) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507); const j = Math.abs(h) % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx;
}

const INSTR: Record<MockTask['kind'], string> = {
  ads: 'Read the texts below. Match choices (A-H) to (1-5). There are three choices you do not need to use.',
  reading: 'Read the text below. For questions choose the correct answer (A, B, C or D).',
  people: 'Read the texts below. Match choices (A-H) to the people. There are two choices you do not need to use.',
  gapped: 'Read the text below. Match choices (A-H) to the gaps. There are two choices you do not need to use.',
  cloze: 'Read the text below. For each gap choose the correct answer (A, B, C or D).',
};

export default function MockTest({ v }: { v: MockVariant }) {
  const t = useT();
  const store = `murly-mock-${v.id}`;
  const [ans, setAns] = useState<Answers>({});
  const [exam, setExam] = useState(false);
  const [done, setDone] = useState(false);
  const [why, setWhy] = useState<Record<string, boolean>>({});
  const [sec, setSec] = useState(0);

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(store) || '{}'); if (s.ans) setAns(s.ans); if (s.exam) setExam(true); } catch { /* немає сховища */ }
  }, [store]);
  useEffect(() => {
    try { localStorage.setItem(store, JSON.stringify({ ans, exam })); } catch { /* немає сховища */ }
  }, [ans, exam, store]);
  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [done]);

  const starts = useMemo(() => { let n = 1; return v.tasks.map((tk) => { const s = n; n += tk.items.length; return s; }); }, [v]);
  const total = v.tasks.reduce((s, tk) => s + tk.items.length, 0);
  const answered = Object.keys(ans).length;
  const correct = (ti: number, qi: number) => ans[key(ti, qi)] === v.tasks[ti].items[qi].answer;
  const score = v.tasks.reduce((s, tk, ti) => s + tk.items.filter((_, qi) => correct(ti, qi)).length, 0);
  const reveal = (ti: number, qi: number) => done || (!exam && ans[key(ti, qi)] !== undefined);

  const choose = (ti: number, qi: number, opt: number) => {
    if (done) return;
    if (!exam && ans[key(ti, qi)] !== undefined) return; // у тренуванні відповідь фіксується, далі «Чому так?»
    setAns((a) => ({ ...a, [key(ti, qi)]: opt }));
  };
  const reset = () => { setAns({}); setDone(false); setWhy({}); setSec(0); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // Рядок відповідей: кнопки-літери (A-H) або слова (Task 5-6)
  const row = (ti: number, qi: number, labels: string[], ord?: number[]) => {
    const k = key(ti, qi);
    const item = v.tasks[ti].items[qi];
    const show = reveal(ti, qi);
    const idx = ord ?? labels.map((_, i) => i);
    const num = starts[ti] + qi;
    return (
      <div className="mk-q" key={`q${ti}.${qi}`}>
        <div className="mk-row" role="group" aria-label={`${t({ uk: 'Завдання', ru: 'Задание', en: 'Question' })} ${num}`}>
          <span className="mk-num">{num}</span>
          {idx.map((oi, pos) => {
            const chosen = ans[k] === oi;
            const cls = show ? (oi === item.answer ? 'is-right' : chosen ? 'is-wrong' : '') : chosen ? 'is-on' : '';
            return (
              <button key={oi} type="button" className={`mk-opt ${cls}`} aria-pressed={chosen} onClick={() => choose(ti, qi, oi)}>
                <b>{LETTERS[pos]}</b>{labels[oi] !== LETTERS[oi] && <span>{labels[oi]}</span>}
              </button>
            );
          })}
          {show && (
            <button type="button" className="mk-why-btn" aria-expanded={!!why[k]} onClick={() => setWhy((w) => ({ ...w, [k]: !w[k] }))}>
              <Icon id="d-bulb" />{t({ uk: 'Чому так?', ru: 'Почему так?', en: 'Why?' })}
            </button>
          )}
        </div>
        {show && why[k] && (
          <div className="mk-why">
            <b>{t({ uk: 'Правильна відповідь', ru: 'Правильный ответ', en: 'Correct answer' })}: {LETTERS[idx.indexOf(item.answer)]}.</b> {item.why}
          </div>
        )}
      </div>
    );
  };

  const gaps = (text: string, ti: number, label: (qi: number, a: number) => string = (_q, a) => LETTERS[a]) =>
    text.split('\n\n').map((para, pi) => (
      <p key={pi}>
        {para.split(/\{(\d+)\}/).map((part, i) => {
          if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
          const qi = Number(part);
          const a = ans[key(ti, qi)];
          const fill = a === undefined ? '' : label(qi, a);
          const show = reveal(ti, qi);
          return <span key={i} className={`mk-gap ${show ? (correct(ti, qi) ? 'is-right' : 'is-wrong') : a !== undefined ? 'is-on' : ''}`}>({starts[ti] + qi}) {fill || '______'}</span>;
        })}
      </p>
    ));

  return (
    <div className="mk">
      <div className="mk-bar">
        <span><b>{answered}</b> / {total}</span>
        <span className="mk-bar__time"><Icon id="d-clock" />{String(Math.floor(sec / 60)).padStart(2, '0')}:{String(sec % 60).padStart(2, '0')}</span>
        <div className="lp-switch mk-mode" role="tablist" aria-label={t({ uk: 'Режим', ru: 'Режим', en: 'Mode' })}>
          <button role="tab" aria-selected={!exam} className={!exam ? 'is-on' : ''} onClick={() => setExam(false)}>{t({ uk: 'Тренування', ru: 'Тренировка', en: 'Practice' })}</button>
          <button role="tab" aria-selected={exam} className={exam ? 'is-on' : ''} onClick={() => setExam(true)}>{t({ uk: 'Як на іспиті', ru: 'Как на экзамене', en: 'Exam mode' })}</button>
        </div>
        <button className="mu-btn mu-btn--lime" onClick={() => { setDone(true); document.getElementById('mk-result')?.scrollIntoView({ behavior: 'smooth' }); }}>{t({ uk: 'Завершити тест', ru: 'Завершить тест', en: 'Finish test' })}</button>
      </div>
      <p className="mk-mode-note">{exam
        ? t({ uk: 'Як на іспиті: відповіді й пояснення побачиш після кнопки «Завершити тест».', ru: 'Как на экзамене: ответы и объяснения увидишь после кнопки «Завершить тест».', en: 'Exam mode: answers and explanations appear after you finish the test.' })
        : t({ uk: 'Тренування: після кожної відповіді одразу видно, чи правильно, і є кнопка «Чому так?».', ru: 'Тренировка: после каждого ответа сразу видно, правильно ли, и есть кнопка «Почему так?».', en: 'Practice: you see the result right after each answer, plus a «Why?» button.' })}</p>

      {v.tasks.map((tk, ti) => (
        <section key={ti} className="mk-task" id={`task-${ti + 1}`}>
          <header className="mk-task__head">
            <span className="mk-task__tag">Task {ti + 1}</span>
            <span className="muted">{t({ uk: 'Завдання', ru: 'Задания', en: 'Questions' })} {starts[ti]}-{starts[ti] + tk.items.length - 1}</span>
          </header>
          <p className="mk-instr">{INSTR[tk.kind]}</p>

          {tk.kind === 'ads' && (
            <>
              <ol className="mk-opts">{tk.options.map((o, i) => <li key={i}><b>{LETTERS[i]}</b> {o}</li>)}</ol>
              <p className="mk-stem">{tk.stem}</p>
              <div className="mk-posters">
                {tk.items.map((it, qi) => (
                  <div key={qi} className="mk-poster">
                    <span className="mk-poster__n">{starts[ti] + qi}</span>
                    <Poster p={it.poster} />
                    {row(ti, qi, tk.options.map((_, i) => LETTERS[i]))}
                  </div>
                ))}
              </div>
            </>
          )}

          {tk.kind === 'reading' && (
            <div className="mk-read">
              <article className="mk-text"><h3>{tk.title}</h3>{tk.paragraphs.map((p, i) => <p key={i}><span className="mk-par">{i + 1}</span>{p}</p>)}</article>
              <div className="mk-qs">
                {tk.items.map((it, qi) => (
                  <div key={qi} className="mk-card">
                    <p className="mk-stem">{it.q}</p>
                    <ol className="mk-opts mk-opts--inline">{it.options.map((o, i) => <li key={i}><b>{LETTERS[i]}</b> {o}</li>)}</ol>
                    {row(ti, qi, it.options.map((_, i) => LETTERS[i]))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tk.kind === 'people' && (
            <>
              <h3 className="mk-title">{tk.title}</h3>
              <ol className="mk-opts">{tk.options.map((o, i) => <li key={i}><b>{LETTERS[i]}</b> {o}</li>)}</ol>
              <p className="mk-stem">{tk.stem}</p>
              <div className="mk-people">
                {tk.items.map((it, qi) => (
                  <div key={qi} className="mk-card">
                    <h4>{it.name}</h4>
                    <p>{it.text}</p>
                    {row(ti, qi, tk.options.map((_, i) => LETTERS[i]))}
                  </div>
                ))}
              </div>
            </>
          )}

          {tk.kind === 'gapped' && (
            <div className="mk-read">
              <article className="mk-text"><h3>{tk.title}</h3>{gaps(tk.text, ti)}</article>
              <div className="mk-qs">
                <ol className="mk-opts">{tk.options.map((o, i) => <li key={i}><b>{LETTERS[i]}</b> {o}</li>)}</ol>
                {tk.items.map((_, qi) => row(ti, qi, tk.options.map((_, i) => LETTERS[i])))}
              </div>
            </div>
          )}

          {tk.kind === 'cloze' && (() => {
            const ords = tk.items.map((it, qi) => order(`${v.id}.${ti}.${qi}`, it.options.length));
            return (
              <div className="mk-read">
                <article className="mk-text"><h3>{tk.title}</h3>{gaps(tk.text, ti, (qi, a) => `${LETTERS[ords[qi].indexOf(a)]} ${tk.items[qi].options[a]}`)}</article>
                <div className="mk-qs">
                  {tk.items.map((it, qi) => row(ti, qi, it.options, ords[qi]))}
                </div>
              </div>
            );
          })()}
        </section>
      ))}

      <section id="mk-result" className="mk-result">
        {done ? (
          <>
            <Kit id={score >= 24 ? 'st-cat-cool' : score >= 12 ? 'st-cat-heart' : 'st-cat-please'} className="mk-result__kit" />
            <div>
              <h2>{t({ uk: 'Твій результат', ru: 'Твой результат', en: 'Your score' })}: <em>{score} / {total}</em></h2>
              <p>{score >= 5
                ? t({ uk: 'Поріг НМТ (5 балів) пройдено. Тепер натискай «Чому так?» біля помилок і розбирай кожну.', ru: 'Порог НМТ (5 баллов) пройден. Теперь нажимай «Почему так?» возле ошибок и разбирай каждую.', en: 'You passed the NMT threshold (5 points). Now open «Why?» next to your mistakes.' })
                : t({ uk: 'Поки нижче порогу в 5 балів. Не страшно: розбери кожну помилку через «Чому так?» і спробуй ще раз.', ru: 'Пока ниже порога в 5 баллов. Не страшно: разбери каждую ошибку через «Почему так?» и попробуй ещё раз.', en: 'Below the 5-point threshold for now. Open «Why?» for each mistake and try again.' })}</p>
              <ul className="mk-by">{v.tasks.map((tk, ti) => <li key={ti}><a href={`#task-${ti + 1}`}>Task {ti + 1}</a>: {tk.items.filter((_, qi) => correct(ti, qi)).length} / {tk.items.length}</li>)}</ul>
              <button className="mu-btn" onClick={reset}>{t({ uk: 'Пройти ще раз', ru: 'Пройти ещё раз', en: 'Try again' })}</button>
            </div>
          </>
        ) : (
          <p className="muted">{t({ uk: 'Коли відповіси на все, натисни «Завершити тест» угорі, і тут з’явиться результат.', ru: 'Когда ответишь на всё, нажми «Завершить тест» вверху, и здесь появится результат.', en: 'When you are done, press «Finish test» at the top and your score will appear here.' })}</p>
        )}
      </section>
    </div>
  );
}
