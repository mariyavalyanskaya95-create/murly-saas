'use client';

import { useEffect } from 'react';

// Наліпки: наші іконки на кольорових плямах, розкидані по краях секцій з data-stickers="N".
const ICONS = ['c-cat', 'c-cat-glass', 'c-cat-speak', 'c-cat-sit', 'c-cat-sleep', 'c-paw', 'c-fish', 'c-yarn',
  'd-heart', 'd-smile', 'd-spark', 'd-bolt', 'd-rocket', 'd-cup', 'd-bulb', 'd-camera',
  'e-apple', 'e-abc', 'e-book', 'e-pencil', 'e-globe', 'e-mic', 'e-cap', 'e-trophy', 'e-flame', 'e-speak'];
// спокійна палітра: кремові наліпки з чорною іконкою, зрідка чорна з лаймом
const COLORS: [string, string][] = [
  ['#FFFDF8', '#1A1A1A'], ['#EDE6D6', '#1A1A1A'], ['#FFFDF8', '#1A1A1A'], ['#1A1A1A', '#DCE9B5'],
];
const BLOBS = ['b1', 'b2', 'b3'];
const NS = 'http://www.w3.org/2000/svg';

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
function shuffle<T>(a: T[]) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function svgUse(id: string, cls: string) {
  const s = document.createElementNS(NS, 'svg');
  s.setAttribute('class', cls); s.setAttribute('aria-hidden', 'true');
  const u = document.createElementNS(NS, 'use');
  u.setAttribute('href', `/ikonky.svg#${id}`); s.appendChild(u); return s;
}

function place() {
  document.body.style.overflowX = 'clip';
  const mobile = window.matchMedia('(max-width: 820px)').matches;
  const pool = shuffle(ICONS.slice()); let k = 0;
  document.querySelectorAll('.mu-stk').forEach((n) => n.remove());
  document.querySelectorAll<HTMLElement>('[data-stickers]').forEach((box) => {
    let n = parseInt(box.dataset.stickers || '4', 10);
    if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
    box.style.overflowX = 'clip';
    if (mobile) n = Math.min(n, 2);
    let last: [string, string] | null = null;
    for (let i = 0; i < n; i++) {
      let col: [string, string]; do { col = pick(COLORS); } while (col === last); last = col;
      const size = mobile ? rnd(40, 50) : rnd(58, 92);
      const left = i % 2 === 0;
      const el = document.createElement('span');
      el.className = 'mu-stk';
      el.style.width = el.style.height = `${size}px`;
      el.style.color = col[1];
      el.style.setProperty('--r', `${rnd(-18, 18).toFixed(1)}deg`);
      el.style.setProperty('--d', `${rnd(-4, 0).toFixed(2)}s`);
      const H = box.offsetHeight || 600;
      const perSide = Math.ceil(n / 2), slot = H / perSide, j = Math.floor(i / 2);
      const top = mobile ? (i === 0 ? -size * 0.35 : H - size * 0.65) : j * slot + rnd(0.1, 0.9) * Math.max(0, slot - size);
      el.style.top = `${Math.round(top)}px`;
      el.style[left ? 'left' : 'right'] = `${mobile ? rnd(1, 4) : rnd(1.5, 8)}%`;
      const blob = svgUse(pick(BLOBS), 'mu-stk__blob'); blob.style.color = col[0];
      el.appendChild(blob);
      el.appendChild(svgUse(pool[k++ % pool.length], 'mu-stk__ic'));
      box.appendChild(el);
    }
  });
}

export default function Stickers() {
  useEffect(() => {
    place();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(place, 250); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); document.querySelectorAll('.mu-stk').forEach((n) => n.remove()); };
  }, []);
  return null;
}
