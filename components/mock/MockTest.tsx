'use client';
// Пробний НМТ у форматі офіційного тесту: по одному завданню, навігація 1-32 угорі.
// Тренування: після відповіді одразу видно результат і кнопку «Чому так?».
// Як на іспиті: результат і пояснення після «Завершити тест».
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
  reading: 'Read the text below. For each question choose the correct answer (A, B, C or D).',
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
  const [why, setWhy] = useState(false);
  const [cur, setCur] = useState(0);
  const [sec, setSec] = useState(0);

  // Плаский список усіх 32 завдань
  const flat = useMemo(() => v.tasks.flatMap((tk, ti) => tk.items.map((_, qi) => ({ ti, qi }))), [v]);
  const total = flat.length;
  const ords = useMemo(() => v.tasks.map((tk, ti) => tk.items.map((it, qi) => tk.kind === 'cloze' ? order(`${v.id}.${ti}.${qi}`, (it as { options: string[] }).options.length) : null)), [v]);

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(store) || '{}'); if (s.ans) setAns(s.ans); if (s.exam) setExam(true); if (typeof s.cur === 'number') setCur(s.cur); } catch { /* немає сховища */ }
  }, [store]);
  useEffect(() => {
    try { localStorage.setItem(store, JSON.stringify({ ans, exam, cur })); } catch { /* немає сховища */ }
  }, [ans, exam, cur, store]);
  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [done]);

  const isRight = (ti: number, qi: number) => ans[key(ti, qi)] === v.tasks[ti].items[qi].answer;
  const shown = (ti: number, qi: number) => done || (!exam && ans[key(ti, qi)] !== undefined);
  const score = flat.filter(({ ti, qi }) => isRight(ti, qi)).length;
  const answered = Object.keys(ans).length;

  const go = (n: number) => { setCur(Math.max(0, Math.min(total - 1, n))); setWhy(false); };
  const { ti, qi } = flat[cur];
  const tk = v.tasks[ti];
  const k = key(ti, qi);
  const item = tk.items[qi];
  const ord = ords[ti][qi];

  const choose = (opt: number) => {
    if (done || (!exam && ans[k] !== undefined)) return;
    setAns((a) => ({ ...a, [k]: opt }));
  };
  const finish = () => { setDone(true); setWhy(false); };
  const reset = () => { setAns({}); setDone(false); setWhy(false); setSec(0); setCur(0); };

  // Варіанти відповіді списком, як в офіційному тесті
  const labels: string[] = tk.kind === 'ads' || tk.kind === 'people' || tk.kind === 'gapped' ? tk.options : (item as { options: string[] }).options;
  const idx = ord ?? labels.map((_, i) => i);
  const show = shown(ti, qi);

  const textWithGaps = (text: string) => text.split('\n\n').map((para, pi) => (
    <p key={pi}>
      {para.split(/\{(\d+)\}/).map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        const g = Number(part);
        const a = ans[key(ti, g)];
        const o = ords[ti][g];
        const fill = a === undefined ? '' : tk.kind === 'cloze' ? `${LETTERS[(o ?? []).indexOf(a)]} ${tk.items[g].options[a]}` : LETTERS[a];
        const st = shown(ti, g) ? (isRight(ti, g) ? 'is-right' : 'is-wrong') : a !== undefined ? 'is-on' : '';
        const num = flat.findIndex((f) => f.ti === ti && f.qi === g) + 1;
        return <button key={i} type="button" onClick={() => go(num - 1)} className={`mk-gap ${st} ${g === qi ? 'is-cur' : ''}`}>({num}) {fill || '______'}</button>;
      })}
    </p>
  ));

  return (
    <div className="mk">
      <div className="mk-top">
        <div className="lp-switch mk-mode" role="tablist" aria-label={t({ uk: 'Режим', ru: 'Режим', en: 'Mode' })}>
          <button role="tab" aria-selected={!exam} className={!exam ? 'is-on' : ''} onClick={() => setExam(false)}>{t({ uk: 'Тренування', ru: 'Тренировка', en: 'Practice' })}</button>
          <button role="tab" aria-selected={exam} className={exam ? 'is-on' : ''} onClick={() => setExam(true)}>{t({ uk: 'Як на іспиті', ru: 'Как на экзамене', en: 'Exam mode' })}</button>
        </div>
        <span className="mk-top__time"><Icon id="d-clock" />{String(Math.floor(sec / 60)).padStart(2, '0')}:{String(sec % 60).padStart(2, '0')}</span>
        <span>{t({ uk: 'Відповіді', ru: 'Ответы', en: 'Answered' })}: <b>{answered} / {total}</b></span>
      </div>

      <nav className="mk-nav" aria-label={t({ uk: 'Завдання', ru: 'Задания', en: 'Questions' })}>
        {flat.map((f, n) => {
          const a = ans[key(f.ti, f.qi)];
          const st = shown(f.ti, f.qi) ? (isRight(f.ti, f.qi) ? 'is-right' : 'is-wrong') : a !== undefined ? 'is-on' : '';
          return <button key={n} type="button" aria-current={n === cur} className={`mk-nav__n ${st} ${n === cur ? 'is-cur' : ''}`} onClick={() => go(n)}>{n + 1}</button>;
        })}
      </nav>

      <section className="mk-page">
        <div className="mk-page__head">
          <span className="mk-task__tag">Task {ti + 1}</span>
          <span className="mk-count">{t({ uk: 'Завдання', ru: 'Задание', en: 'Question' })} {cur + 1} {t({ uk: 'з', ru: 'из', en: 'of' })} {total}</span>
        </div>
        <p className="mk-instr">{INSTR[tk.kind]}</p>

        <div className={`mk-body ${tk.kind === 'ads' || tk.kind === 'people' ? '' : 'mk-body--two'}`}>
          {tk.kind === 'ads' && <div className="mk-poster-one"><Poster p={tk.items[qi].poster} /></div>}
          {tk.kind === 'reading' && <article className="mk-text"><h3>{tk.title}</h3>{tk.paragraphs.map((p, i) => <p key={i}><span className="mk-par">{i + 1}</span>{p}</p>)}</article>}
          {tk.kind === 'people' && <article className="mk-card mk-person"><h3>{tk.title}</h3><h4>{tk.items[qi].name}</h4><p>{tk.items[qi].text}</p></article>}
          {(tk.kind === 'gapped' || tk.kind === 'cloze') && <article className="mk-text"><h3>{tk.title}</h3>{textWithGaps(tk.text)}</article>}

          <div className="mk-answer">
            {(tk.kind === 'ads' || tk.kind === 'people') && <p className="mk-stem">{tk.stem}</p>}
            {tk.kind === 'reading' && <p className="mk-stem">{tk.items[qi].q}</p>}
            {(tk.kind === 'gapped' || tk.kind === 'cloze') && <p className="mk-stem">{t({ uk: 'Пропуск', ru: 'Пропуск', en: 'Gap' })} ({cur + 1})</p>}
            <ul className="mk-list" role="radiogroup">
              {idx.map((oi, pos) => {
                const chosen = ans[k] === oi;
                const st = show ? (oi === item.answer ? 'is-right' : chosen ? 'is-wrong' : '') : chosen ? 'is-on' : '';
                return (
                  <li key={oi}>
                    <button type="button" role="radio" aria-checked={chosen} className={`mk-li ${st}`} onClick={() => choose(oi)}>
                      <b>{LETTERS[pos]}</b><span>{labels[oi]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {show && (
              <button type="button" className="mk-why-btn" aria-expanded={why} onClick={() => setWhy(!why)}>
                <Icon id="d-bulb" />{t({ uk: 'Чому так?', ru: 'Почему так?', en: 'Why?' })}
              </button>
            )}
            {show && why && (
              <div className="mk-why">
                <b>{t({ uk: 'Правильна відповідь', ru: 'Правильный ответ', en: 'Correct answer' })}: {LETTERS[idx.indexOf(item.answer)]}.</b> {item.why}
              </div>
            )}
            <div className="mk-steps">
              <button type="button" className="mu-btn" disabled={cur === 0} onClick={() => go(cur - 1)}>← {t({ uk: 'Назад', ru: 'Назад', en: 'Back' })}</button>
              {cur < total - 1
                ? <button type="button" className="mu-btn mu-btn--lime" onClick={() => go(cur + 1)}>{t({ uk: 'Наступне', ru: 'Следующее', en: 'Next' })} →</button>
                : !done && <button type="button" className="mu-btn mu-btn--lime" onClick={finish}>{t({ uk: 'Завершити тест', ru: 'Завершить тест', en: 'Finish test' })}</button>}
            </div>
          </div>
        </div>
      </section>

      {!done && (
        <p className="mk-finish">
          <button type="button" className="mk-why-btn" onClick={finish}>{t({ uk: 'Завершити тест зараз', ru: 'Завершить тест сейчас', en: 'Finish the test now' })}</button>
        </p>
      )}

      {done && (
        <section className="mk-result">
          <Kit id={score >= 24 ? 'st-cat-cool' : score >= 12 ? 'st-cat-heart' : 'st-cat-please'} className="mk-result__kit" />
          <div>
            <h2>{t({ uk: 'Твій результат', ru: 'Твой результат', en: 'Your score' })}: <em>{score} / {total}</em></h2>
            <p>{score >= 5
              ? t({ uk: 'Поріг НМТ (5 балів) пройдено. Тепер натискай на червоні номери вгорі й розбирай кожну помилку через «Чому так?».', ru: 'Порог НМТ (5 баллов) пройден. Теперь нажимай на красные номера вверху и разбирай каждую ошибку через «Почему так?».', en: 'You passed the NMT threshold (5 points). Click the red numbers above and open «Why?» for each mistake.' })
              : t({ uk: 'Поки нижче порогу в 5 балів. Не страшно: натисни на червоні номери вгорі, розбери кожну помилку і спробуй ще раз.', ru: 'Пока ниже порога в 5 баллов. Не страшно: нажми на красные номера вверху, разбери каждую ошибку и попробуй ещё раз.', en: 'Below the 5-point threshold for now. Click the red numbers above, review each mistake and try again.' })}</p>
            <ul className="mk-by">{v.tasks.map((x, n) => <li key={n}>Task {n + 1}: {x.items.filter((_, q) => isRight(n, q)).length} / {x.items.length}</li>)}</ul>
            <button className="mu-btn" onClick={reset}>{t({ uk: 'Пройти ще раз', ru: 'Пройти ещё раз', en: 'Try again' })}</button>
          </div>
        </section>
      )}
    </div>
  );
}
