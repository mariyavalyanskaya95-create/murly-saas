'use client';
// Ігри для друку: показуємо аркуш, друкуємо тільки обрану гру
import { useEffect, useState } from 'react';
import Art from '../Art';
import Icon from '../Icon';
import { useT } from '../LangProvider';
import type { PrintGame } from '@/lib/baby/types';

// Перемішування з фіксованим зерном, щоб поле бінго не змінювалось між рендерами
function shuffle<X>(arr: X[], seed: number) {
  const a = [...arr]; let s = seed;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function Sheet({ g }: { g: PrintGame }) {
  if (g.kind === 'bingo') {
    return (
      <div className="bb-sheet__bingo">
        {[1, 2].map((seed) => (
          <div key={seed} className="bb-bingo">
            <b className="bb-bingo__title">BINGO</b>
            <div className="bb-bingo__grid">{shuffle(g.cards, seed * 7).slice(0, 9).map((c, k) => <div key={k} className="bb-cell"><Art id={c.art} /></div>)}</div>
          </div>
        ))}
        <div className="bb-cards bb-cards--small">{g.cards.map((c, k) => <div key={k} className="bb-card"><Art id={c.art} /><span lang="en">{c.word}</span></div>)}</div>
      </div>
    );
  }
  return (
    <div className={`bb-cards ${g.kind === 'memory' ? 'bb-cards--memory' : ''}`}>
      {g.cards.map((c, k) => <div key={k} className="bb-card"><Art id={c.art} /><span lang="en">{c.word}</span></div>)}
    </div>
  );
}

export default function PrintGames({ games }: { games: PrintGame[] }) {
  const t = useT();
  const [printing, setPrinting] = useState<string | null>(null);
  useEffect(() => {
    if (!printing) return;
    document.body.classList.add('bb-printing');
    const done = () => { document.body.classList.remove('bb-printing'); setPrinting(null); };
    window.addEventListener('afterprint', done, { once: true });
    const id = window.setTimeout(() => window.print(), 60);
    return () => { window.clearTimeout(id); window.removeEventListener('afterprint', done); document.body.classList.remove('bb-printing'); };
  }, [printing]);
  return (
    <div className="bb-games">
      {games.map((g) => (
        <article key={g.slug} className={`bb-game ${printing === g.slug ? 'is-print' : ''}`}>
          <header className="bb-game__head">
            <div>
              <h3>{t(g.title)}</h3>
              <small className="bb-age">{t({ uk: 'Вік', ru: 'Возраст', en: 'Age' })}: {g.age}</small>
            </div>
            <button type="button" className="mu-btn mu-btn--lime no-print" onClick={() => setPrinting(g.slug)}><Icon id="e-pencil" />{t({ uk: 'Роздрукувати', ru: 'Распечатать', en: 'Print' })}</button>
          </header>
          <p className="bb-game__how">{t(g.how)}</p>
          <div className="bb-sheet">
            <span className="bb-sheet__brand">murly.com.ua</span>
            <Sheet g={g} />
          </div>
        </article>
      ))}
    </div>
  );
}
