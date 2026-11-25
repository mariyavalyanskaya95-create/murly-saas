// Розширене пояснення під пошукові запити: правило, таблиці, приклади, вправи з відповідями, FAQ і посилання.
import Link from 'next/link';
import Md from '@/components/blog/Md';
import Faq from '@/components/Faq';
import type { GBlock, Guide } from '@/lib/seo-guides';

function B({ b }: { b: GBlock }) {
  switch (b.t) {
    case 'h2': return <h2>{b.text}</h2>;
    case 'h3': return <h3>{b.text}</h3>;
    case 'p': return <p><Md text={b.text} /></p>;
    case 'ul': return <ul>{b.items.map((x, i) => <li key={i} lang="en"><Md text={x} /></li>)}</ul>;
    case 'table': return <div className="bl-table"><table><thead><tr>{b.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead><tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>;
    case 'ex': return <>{b.items.map(([en, tr], i) => <p key={i} className="bl-ex"><span lang="en">{en}</span><small>{tr}</small></p>)}</>;
    case 'quiz': return (
      <div className="sg-quiz"><h3>{b.title}</h3>
        <ol>{b.items.map(([q, a], i) => <li key={i}><span lang="en">{q}</span> <details><summary>✓</summary><b lang="en">{a}</b></details></li>)}</ol>
      </div>
    );
  }
}

export default function SeoGuide({ g, lang }: { g: Guide; lang: string }) {
  return (
    <article className="sg bl-body" aria-label={g.title}>
      <h2 className="sg-title">{g.title}</h2>
      {g.blocks.map((b, i) => <B key={i} b={b} />)}
      <h2>{lang === 'ru' ? 'Частые вопросы' : 'Часті питання'}</h2>
      <Faq items={g.faq} />
      <nav className="sg-links" aria-label={lang === 'ru' ? 'Читайте также' : 'Читайте також'}>
        <b>{lang === 'ru' ? 'Читайте также:' : 'Читайте також:'}</b>
        {g.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </nav>
    </article>
  );
}
