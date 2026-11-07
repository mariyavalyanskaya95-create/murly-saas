// Рендер документа для друку (A4). Кнопка друку збереже його як PDF у будь-якому браузері.
import type { Block, L2, PrintDoc } from '@/lib/printables/types';
import PrintButton from './PrintButton';

export default function PrintView({ doc, lang }: { doc: PrintDoc; lang: 'uk' | 'ru' }) {
  const s = (x: L2 | string) => (typeof x === 'string' ? x : x[lang] || x.uk);
  const answers = doc.blocks.filter((b): b is Extract<Block, { answers: unknown }> => 'answers' in b);
  const body = doc.blocks.filter((b) => !('answers' in b));
  const render = (b: Block, i: number) => {
    if ('pagebreak' in b) return <div key={i} className="pv-break" />;
    if ('h' in b) return <h2 key={i}>{s(b.h)}</h2>;
    if ('p' in b) return <p key={i}>{s(b.p)}</p>;
    if ('tip' in b) return <div key={i} className="pv-tip">{s(b.tip)}</div>;
    if ('list' in b) return <ul key={i}>{b.list.map((x, k) => <li key={k}>{s(x)}</li>)}</ul>;
    if ('check' in b) return <ul key={i} className="pv-check">{b.check.map((x, k) => <li key={k}><span className="pv-box" />{s(x)}</li>)}</ul>;
    if ('lines' in b) return <div key={i} className="pv-lines">{Array.from({ length: b.lines }, (_, k) => <div key={k} />)}</div>;
    if ('table' in b) return (
      <table key={i} className="pv-table"><thead><tr>{b.table.head.map((h, k) => <th key={k}>{s(h)}</th>)}</tr></thead>
        <tbody>{b.table.rows.map((r, k) => <tr key={k}>{r.map((c, j) => <td key={j}>{s(c)}</td>)}</tr>)}</tbody></table>
    );
    if ('cards' in b) return (
      <div key={i} className="pv-cards">{b.cards.map((c, k) => <div key={k} className="pv-card"><b>{c.front}</b><span>{s(c.back)}</span></div>)}</div>
    );
    if ('tasks' in b) return (
      <div key={i} className="pv-tasks"><h3>{s(b.tasks.title)}</h3><ol>{b.tasks.items.map((x, k) => <li key={k}>{x}</li>)}</ol></div>
    );
    return null;
  };
  return (
    <div className="pv">
      <div className="pv-bar no-print">
        <span>{lang === 'ru' ? 'Нажми «Печать», в окне печати можно выбрать «Сохранить как PDF».' : 'Натисни «Друк», у вікні друку можна обрати «Зберегти як PDF».'}</span>
        <PrintButton label={lang === 'ru' ? 'Печать или PDF' : 'Друк або PDF'} />
      </div>
      <article className="pv-page">
        <header className="pv-head"><span className="pv-logo">Murly</span>{doc.level && <span className="pv-level">{doc.level}</span>}</header>
        <h1>{doc.title[lang]}</h1>
        {doc.subtitle && <p className="pv-sub">{doc.subtitle[lang]}</p>}
        {body.map(render)}
        {answers.length > 0 && <div className="pv-break" />}
        {answers.map((a, i) => (
          <div key={`a${i}`} className="pv-answers"><h3>{s(a.answers.title)}</h3><ol>{a.answers.items.map((x, k) => <li key={k}>{x}</li>)}</ol></div>
        ))}
        <footer className="pv-foot">murly.com.ua</footer>
      </article>
    </div>
  );
}
