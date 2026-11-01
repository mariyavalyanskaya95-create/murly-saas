// Мінімальний інлайн-маркдаун для статей: **жирний** і [текст](/шлях)
import Link from 'next/link';
import { Fragment } from 'react';

export default function Md({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const b = p.match(/^\*\*([^*]+)\*\*$/);
        if (b) return <strong key={i}>{b[1]}</strong>;
        const l = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (l) return l[2].startsWith('/') ? <Link key={i} href={l[2]}>{l[1]}</Link> : <a key={i} href={l[2]} target="_blank" rel="noreferrer">{l[1]}</a>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
