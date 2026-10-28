'use client';
// «Слова на сьогодні»: інтервальне повторення. Показуємо слово, учень обирає переклад з 4 варіантів.
import { useMemo, useState } from 'react';
import Icon from '../Icon';
import { useT } from '@/components/LangProvider';
import { speakEn } from '@/lib/speak';
import type { StudentWord } from '@/lib/student-data';

const shuffle = <T,>(a: T[]) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export default function WordReview({ words, adult }: { words: StudentWord[]; adult?: boolean }) {
  const t = useT();
  const now = Date.now();
  // спершу ті, що «прострочені», потім нові; не більше 15 за раз
  const due = useMemo(() => words.filter((w) => !w.due || +new Date(w.due) <= now)
    .sort((a, b) => (a.due ? +new Date(a.due) : now + 1) - (b.due ? +new Date(b.due) : now + 1)).slice(0, 15), [words]); // eslint-disable-line react-hooks/exhaustive-deps
  const [run, setRun] = useState<StudentWord[] | null>(null);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [right, setRight] = useState(0);
  const [left, setLeft] = useState(due.length);

  const w = run?.[i];
  const options = useMemo(() => (w ? shuffle([w.uk, ...shuffle(words.filter((x) => x.id !== w.id && x.uk !== w.uk)).slice(0, 3).map((x) => x.uk)]) : []), [w?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (words.length < 4) return null;

  const choose = (o: string) => {
    if (!w || pick) return;
    setPick(o);
    const ok = o === w.uk;
    if (ok) setRight((r) => r + 1);
    fetch('/api/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'review', id: w.id, ok }) }).catch(() => {});
    if (ok && !adult) fetch('/api/coins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'earn', amount: 1, source: 'words', reason: 'review' }) }).then(() => window.dispatchEvent(new Event('murly:coins'))).catch(() => {});
  };
  const next = () => { setPick(null); setI((x) => x + 1); };

  if (!run) return (
    <section className="t-card s-rev">
      <div className="t-card__head">
        <h2><Icon id="e-abc" />{t({ uk: 'Слова на сьогодні', ru: 'Слова на сегодня', en: 'Words for today' })}: {left}</h2>
        {left > 0 && <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={() => { setRun(due); setI(0); setRight(0); }}>{t({ uk: 'Повторити (5 хв)', ru: 'Повторить (5 мин)', en: 'Review (5 min)' })}</button>}
      </div>
      <p className="t-muted">{left > 0
        ? t({ uk: 'Слова, які час повторити. Правильно: слово повернеться через кілька днів. Помилка: завтра ще раз.', ru: 'Слова, которые пора повторить. Правильно: слово вернётся через несколько дней. Ошибка: завтра ещё раз.', en: 'Words due for review. Get it right and it comes back in a few days; miss it and you will see it tomorrow.' })
        : t({ uk: 'На сьогодні все повторено. Молодець! Завтра будуть нові.', ru: 'На сегодня всё повторено. Молодец! Завтра будут новые.', en: 'All done for today. Well done! More tomorrow.' })}</p>
    </section>
  );

  if (!w) return (
    <section className="t-card s-rev">
      <h2><Icon id="e-trophy" />{t({ uk: 'Готово!', ru: 'Готово!', en: 'Done!' })} {right}/{run.length}</h2>
      <p className="t-muted">{t({ uk: 'Наступне повторення завтра.', ru: 'Следующее повторение завтра.', en: 'Next review tomorrow.' })}</p>
      <button type="button" className="mu-btn t-btn-sm" onClick={() => { setRun(null); setLeft(0); }}>{t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}</button>
    </section>
  );

  return (
    <section className="t-card s-rev">
      <div className="s-rev__top"><small className="t-muted">{i + 1} / {run.length}</small><i className="s-prog__bar"><i style={{ width: `${(i / run.length) * 100}%` }} /></i></div>
      <p className="s-rev__word">{w.en} <button type="button" className="t-icon-btn" onClick={() => speakEn(w.en, 0.9)} aria-label={t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}><Icon id="e-head" /></button></p>
      <div className="s-rev__opts">
        {options.map((o) => (
          <button key={o} type="button" className={`s-rev__opt ${pick ? (o === w.uk ? 'is-right' : o === pick ? 'is-wrong' : '') : ''}`} onClick={() => choose(o)} disabled={Boolean(pick)}>{o}</button>
        ))}
      </div>
      {pick && <button type="button" className="mu-btn mu-btn--lime" onClick={next}>{t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })} →</button>}
    </section>
  );
}
