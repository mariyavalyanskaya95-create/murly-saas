'use client';
// Друга частина тренажера, як у квізі Марії: таблиця дієслів, історії з дужками, читання з перекладом по кліку,
// порядок подій, переклад і розмова. Кожна частина перевіряється окремо, зверху загальний рахунок.
import { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from './Icon';
import type { DrillPlus as Plus } from '@/lib/drills/types';
import { useT } from './LangProvider';

const norm = (s: string) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/\s+/g, ' ').replace(/[.!?,]+$/g, '').trim();
const ok = (given: string, answers: string[]) => answers.some((a) => norm(a) === norm(given));
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
type Score = { right: number; total: number };
type Report = (key: string, s: Score) => void;

function CheckBar({ score, onCheck, onReset, checked }: { score?: Score; onCheck: () => void; onReset: () => void; checked: boolean }) {
  const t = useT();
  return (
    <div className="dp-check">
      {!checked
        ? <button type="button" className="mu-btn mu-btn--lime" onClick={onCheck}>{t({ uk: 'Перевірити', ru: 'Проверить', en: 'Check' })}</button>
        : <button type="button" className="mu-btn" onClick={onReset}>{t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Try again' })}</button>}
      {checked && score && <b className="dp-score">{score.right} / {score.total}</b>}
    </div>
  );
}

// ---------- таблиця дієслів ----------
function Verbs({ data, report }: { data: NonNullable<Plus['verbs']>; report: Report }) {
  const t = useT();
  const [val, setVal] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const alts = (s: string) => s.split('/').map((x) => x.trim());
  const score = useMemo(() => {
    let right = 0;
    data.rows.forEach((r, i) => { if (ok(val[`${i}.2`] ?? '', alts(r.v2))) right++; if (ok(val[`${i}.3`] ?? '', alts(r.v3))) right++; });
    return { right, total: data.rows.length * 2 };
  }, [val, data]);
  const check = () => { setChecked(true); report('verbs', score); };
  const cell = (i: number, k: 2 | 3, answer: string) => {
    const v = val[`${i}.${k}`] ?? '';
    const good = ok(v, alts(answer));
    return (
      <td>
        <input value={v} disabled={checked} onChange={(e) => setVal((x) => ({ ...x, [`${i}.${k}`]: e.target.value }))} className={checked ? (good ? 'is-right' : 'is-wrong') : ''}
          autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label={`${data.rows[i].v1} V${k}`} />
        {checked && !good && <small className="dp-fix">{answer.replace('/', ' / ')}</small>}
      </td>
    );
  };
  return (
    <section className="dp-part">
      <h3><Icon id="e-abc" />{data.title}</h3>
      <p className="t-muted">{data.text}</p>
      <div className="dr-table-wrap">
        <table className="dp-verbs">
          <thead><tr><th>V1</th><th>V2 {t({ uk: '(минуле)', ru: '(прошлое)', en: '(past)' })}</th><th>V3</th><th>{t({ uk: 'переклад', ru: 'перевод', en: 'meaning' })}</th></tr></thead>
          <tbody>{data.rows.map((r, i) => <tr key={r.v1}><td><b>{r.v1}</b></td>{cell(i, 2, r.v2)}{cell(i, 3, r.v3)}<td className="t-muted">{r.uk}</td></tr>)}</tbody>
        </table>
      </div>
      <CheckBar score={score} checked={checked} onCheck={check} onReset={() => { setChecked(false); setVal({}); report('verbs', { right: 0, total: data.rows.length * 2 }); }} />
    </section>
  );
}

// ---------- історія з дужками ----------
type Seg = { t: 'text'; v: string } | { t: 'gap'; answers: string[]; hint: string };
const parseStory = (s: string): Seg[] => {
  const out: Seg[] = []; const re = /\[([^\]]+)\]\(([^)]*)\)/g; let last = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(s))) { if (m.index > last) out.push({ t: 'text', v: s.slice(last, m.index) }); out.push({ t: 'gap', answers: m[1].split('/').map((x) => x.trim()), hint: m[2] }); last = m.index + m[0].length; }
  if (last < s.length) out.push({ t: 'text', v: s.slice(last) });
  return out;
};
function Story({ data, id, report }: { data: NonNullable<Plus['stories']>[number]; id: string; report: Report }) {
  const segs = useMemo(() => parseStory(data.story), [data.story]);
  const gaps = segs.filter((s) => s.t === 'gap') as Extract<Seg, { t: 'gap' }>[];
  const [val, setVal] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const score = { right: gaps.filter((g, i) => ok(val[i] ?? '', g.answers)).length, total: gaps.length };
  let gi = -1;
  return (
    <section className="dp-part">
      <h3><Icon id="e-pencil" />{data.title}</h3>
      <p className="t-muted">{data.text}</p>
      <p className="dp-story">
        {segs.map((s, k) => {
          if (s.t === 'text') return <span key={k}>{s.v}</span>;
          gi++; const i = gi; const v = val[i] ?? ''; const good = ok(v, s.answers);
          return (
            <span key={k} className="dp-gap">
              <input value={v} disabled={checked} size={Math.max(5, s.answers[0].length + 1)} onChange={(e) => setVal((x) => { const n = [...x]; n[i] = e.target.value; return n; })}
                className={checked ? (good ? 'is-right' : 'is-wrong') : ''} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label={s.hint} />
              <small className="dp-hint">({s.hint})</small>
              {checked && !good && <small className="dp-fix">{s.answers[0]}</small>}
            </span>
          );
        })}
      </p>
      <CheckBar score={score} checked={checked} onCheck={() => { setChecked(true); report(id, score); }} onReset={() => { setChecked(false); setVal([]); report(id, { right: 0, total: gaps.length }); }} />
    </section>
  );
}

// ---------- питання з вибором (читання, переклад) ----------
function Mcq({ items, id, report }: { items: { q: string; options: string[]; a: number; why: string }[]; id: string; report: Report }) {
  const t = useT();
  const [pick, setPick] = useState<Record<number, number>>({});
  // перемішуємо після завантаження сторінки, щоб сервер і браузер показали однаковий HTML
  const [order, setOrder] = useState<number[][]>(() => items.map((q) => q.options.map((_, i) => i)));
  useEffect(() => { setOrder(items.map((q) => shuffle(q.options.map((_, i) => i)))); }, [items]);
  const choose = (qi: number, oi: number) => {
    if (pick[qi] !== undefined) return;
    const next = { ...pick, [qi]: oi };
    setPick(next);
    report(id, { right: Object.entries(next).filter(([k, v]) => items[Number(k)].a === v).length, total: items.length });
  };
  return (
    <ol className="dp-mcq">
      {items.map((q, qi) => {
        const chosen = pick[qi];
        return (
          <li key={qi}>
            <div className="dp-mcq__q">{q.q}</div>
            <div className="dp-mcq__opts">
              {order[qi].map((oi) => {
                const st = chosen === undefined ? '' : oi === q.a ? 'is-right' : oi === chosen ? 'is-wrong' : 'is-dim';
                return <button key={oi} type="button" className={`dp-opt ${st}`} onClick={() => choose(qi, oi)}>{q.options[oi]}</button>;
              })}
            </div>
            {chosen !== undefined && <p className="dp-why"><Icon id="d-bulb" /><span><b>{t({ uk: 'Чому так?', ru: 'Почему так?', en: 'Why?' })}</b> {q.why}</span></p>}
          </li>
        );
      })}
    </ol>
  );
}

// ---------- читання з перекладом по кліку ----------
function Reading({ data, report }: { data: NonNullable<Plus['reading']>; report: Report }) {
  const [open, setOpen] = useState<string | null>(null);
  const paras = data.story.split(/\n+/);
  return (
    <section className="dp-part">
      <h3><Icon id="e-book" />{data.title}</h3>
      <p className="t-muted">{data.text}</p>
      <div className="dp-read">
        {paras.map((p, pi) => (
          <p key={pi}>
            {p.split(/(\{[^}]+\})/g).map((chunk, k) => {
              const m = chunk.match(/^\{([^|]+)\|([^}]+)\}$/);
              if (!m) return <span key={k}>{chunk}</span>;
              const key = `${pi}.${k}`;
              return (
                <button key={k} type="button" className={`dp-word ${open === key ? 'is-open' : ''}`} onClick={() => setOpen(open === key ? null : key)} aria-expanded={open === key}>
                  {m[1]}{open === key && <span className="dp-word__tip" role="tooltip">{m[2]}</span>}
                </button>
              );
            })}
          </p>
        ))}
      </div>
      <Mcq items={data.questions} id="reading" report={report} />
    </section>
  );
}

// ---------- порядок подій ----------
function Order({ data, report }: { data: NonNullable<Plus['order']>; report: Report }) {
  const t = useT();
  const start = () => { let s = shuffle(data.items); while (data.items.length > 1 && s.every((x, i) => x === data.items[i])) s = shuffle(data.items); return s; };
  const [list, setList] = useState<string[]>(data.items);
  useEffect(() => { setList(start()); }, [data.items]); // eslint-disable-line react-hooks/exhaustive-deps
  const [sel, setSel] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const click = (i: number) => {
    if (checked) return;
    if (sel === null) { setSel(i); return; }
    if (sel !== i) setList((l) => { const n = [...l]; [n[sel], n[i]] = [n[i], n[sel]]; return n; });
    setSel(null);
  };
  const score = { right: list.filter((x, i) => x === data.items[i]).length, total: data.items.length };
  return (
    <section className="dp-part">
      <h3><Icon id="e-board" />{data.title}</h3>
      <p className="t-muted">{data.text}</p>
      <ol className="dp-order">
        {list.map((x, i) => (
          <li key={x}>
            <button type="button" onClick={() => click(i)} className={`dp-card ${sel === i ? 'is-sel' : ''} ${checked ? (x === data.items[i] ? 'is-right' : 'is-wrong') : ''}`} aria-pressed={sel === i}>
              <span className="dp-card__n">{i + 1}</span>{x}
            </button>
          </li>
        ))}
      </ol>
      {checked && score.right < score.total && <p className="t-muted">{t({ uk: 'Правильний порядок', ru: 'Правильный порядок', en: 'Correct order' })}: {data.items.map((x, i) => `${i + 1}. ${x}`).join(' ')}</p>}
      <CheckBar score={score} checked={checked} onCheck={() => { setChecked(true); report('order', score); }} onReset={() => { setChecked(false); setList(start()); report('order', { right: 0, total: data.items.length }); }} />
    </section>
  );
}

export default function DrillPlus({ plus }: { plus: Plus }) {
  const t = useT();
  const [scores, setScores] = useState<Record<string, Score>>({});
  const report = useCallback<Report>((key, s) => setScores((x) => ({ ...x, [key]: s })), []);
  const total = (plus.verbs ? plus.verbs.rows.length * 2 : 0)
    + (plus.stories ?? []).reduce((n, s) => n + parseStory(s.story).filter((x) => x.t === 'gap').length, 0)
    + (plus.reading?.questions.length ?? 0) + (plus.order?.items.length ?? 0) + (plus.translate?.items.length ?? 0);
  const right = Object.values(scores).reduce((n, s) => n + s.right, 0);
  const done = Object.values(scores).reduce((n, s) => n + s.total, 0);
  return (
    <div className="dp">
      <div className="dp-top">
        <span>{t({ uk: 'Правильно', ru: 'Правильно', en: 'Correct' })}: <b>{right}</b> / {total}</span>
        <div className="dr-bar"><span style={{ width: `${total ? Math.min(100, (done / total) * 100) : 0}%` }} /></div>
      </div>
      {plus.verbs && <Verbs data={plus.verbs} report={report} />}
      {(plus.stories ?? []).map((s, i) => <Story key={i} data={s} id={`story${i}`} report={report} />)}
      {plus.reading && <Reading data={plus.reading} report={report} />}
      {plus.order && <Order data={plus.order} report={report} />}
      {plus.translate && (
        <section className="dp-part">
          <h3><Icon id="e-speak" />{plus.translate.title}</h3>
          <p className="t-muted">{plus.translate.text}</p>
          <Mcq items={plus.translate.items} id="translate" report={report} />
        </section>
      )}
      {plus.speaking && (
        <section className="dp-part">
          <h3><Icon id="e-mic" />{plus.speaking.title}</h3>
          <p className="t-muted">{plus.speaking.text}</p>
          <ul className="dp-talk">{plus.speaking.questions.map((q) => <li key={q}>{q}</li>)}</ul>
        </section>
      )}
    </div>
  );
}
