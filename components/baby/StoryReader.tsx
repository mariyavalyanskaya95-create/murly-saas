'use client';
// Наша коротка історія: англійською, переклад можна показати під кожним рядком
import { useState } from 'react';
import Art from '../Art';
import { useT } from '../LangProvider';
import type { Story } from '@/lib/baby/types';

export default function StoryReader({ stories }: { stories: Story[] }) {
  const t = useT();
  const [i, setI] = useState(0);
  const [tr, setTr] = useState(false);
  const s = stories[i];
  const native = t.lang === 'ru' ? s.ru : s.uk;
  return (
    <div className="bb-story">
      <div className="bb-story__list">
        {stories.map((x, k) => (
          <button key={x.slug} type="button" className={`bb-story__pick ${k === i ? 'is-on' : ''}`} onClick={() => setI(k)}>
            <Art id={x.art[0]} className="bb-story__pick-art" /><span>{x.title}<small>{x.age}</small></span>
          </button>
        ))}
      </div>
      <article className="bb-story__page">
        <div className="bb-story__art">{s.art.slice(0, 3).map((a) => <Art key={a} id={a} />)}</div>
        <h3 lang="en">{s.title}</h3>
        <ol className="bb-story__lines">
          {s.lines.map((l, k) => (
            <li key={k}><span lang="en">{l}</span>{tr && t.lang !== 'en' && native[k] && <small>{native[k]}</small>}</li>
          ))}
        </ol>
        <div className="bb-words" lang="en">{s.words.map((w) => <span key={w}>{w}</span>)}</div>
        {t.lang !== 'en' && (
          <button type="button" className="mu-btn" onClick={() => setTr(!tr)} aria-pressed={tr}>
            {tr ? t({ uk: 'Сховати переклад', ru: 'Скрыть перевод', en: 'Hide translation' }) : t({ uk: 'Показати переклад', ru: 'Показать перевод', en: 'Show translation' })}
          </button>
        )}
      </article>
    </div>
  );
}
