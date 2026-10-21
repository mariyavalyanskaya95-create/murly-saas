'use client';
// Обкладинка профілю: фон і стікери (котики Murly, іконки, емодзі), які учень сам розставляє мишкою або пальцем.
import { useRef } from 'react';
import Kit from './Kit';
import Icon from './Icon';

export type PageItem = { k: string; x: number; y: number; s: number };
export type PageDeco = { bg?: string; items?: PageItem[] };

export const PAGE_BGS = ['lime', 'sky', 'mustard', 'pink', 'lavender', 'mint', 'dots', 'stripes', 'checks', 'sunset', 'ocean', 'night'];
export const PAGE_KITS = ['st-cat-cool', 'st-cat-blep', 'st-cat-heart', 'st-cat-coffee', 'st-cat-box', 'st-cat-loaf', 'st-cat-please', 'st-cat-shock', 'st-cat-nightcap', 'st-girl-bow', 'st-boy-cap', 'st-boy-backpack'];
export const PAGE_ICONS = ['d-heart', 'd-spark', 'd-rocket', 'd-bolt', 'd-cup', 'd-camera', 'e-trophy', 'e-globe', 'e-book', 'c-paw', 'c-fish', 'c-yarn'];
export const PAGE_EMOJI = ['🔥', '⭐', '💖', '🎧', '🎮', '🌈', '🍕', '🎨', '📚', '⚽', '🎸', '🌙', '✨', '😎', '🦄', '🍀'];
export const MAX_ITEMS = 15;

export function Sticker({ k }: { k: string }) {
  if (k.startsWith('emoji:')) return <span className="u-st__emoji">{k.slice(6)}</span>;
  if (k.startsWith('icon:')) return <Icon id={k.slice(5)} className="u-st__icon" />;
  return <Kit id={k} className="u-st__kit" />;
}

export default function ProfileBanner({ deco, edit, onChange, children }: { deco: PageDeco; edit?: boolean; onChange?: (d: PageDeco) => void; children?: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const items = deco.items ?? [];
  const drag = (i: number) => (e: React.PointerEvent) => {
    if (!edit || !onChange || !box.current) return;
    e.preventDefault();
    const r = box.current.getBoundingClientRect();
    const move = (ev: PointerEvent) => {
      const x = Math.min(96, Math.max(2, ((ev.clientX - r.left) / r.width) * 100));
      const y = Math.min(92, Math.max(4, ((ev.clientY - r.top) / r.height) * 100));
      onChange({ ...deco, items: items.map((it, j) => (j === i ? { ...it, x: Math.round(x), y: Math.round(y) } : it)) });
    };
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };
  const size = (i: number, d: number) => onChange?.({ ...deco, items: items.map((it, j) => (j === i ? { ...it, s: Math.min(2.5, Math.max(0.6, +(it.s + d).toFixed(1))) } : it)) });
  const remove = (i: number) => onChange?.({ ...deco, items: items.filter((_, j) => j !== i) });
  return (
    <div ref={box} className={`u-banner u-bg--${deco.bg || 'lime'} ${edit ? 'is-edit' : ''}`}>
      {items.map((it, i) => (
        <div key={i} className="u-st" style={{ left: `${it.x}%`, top: `${it.y}%`, transform: `translate(-50%, -50%) scale(${it.s})` }} onPointerDown={drag(i)}>
          <Sticker k={it.k} />
          {edit && (
            <span className="u-st__tools" onPointerDown={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => size(i, -0.2)} aria-label="smaller">-</button>
              <button type="button" onClick={() => size(i, 0.2)} aria-label="bigger">+</button>
              <button type="button" onClick={() => remove(i)} aria-label="remove">✕</button>
            </span>
          )}
        </div>
      ))}
      <div className="u-banner__me">{children}</div>
    </div>
  );
}
