'use client';
// Коротке навчання: підсвічуємо елемент і пояснюємо, що він робить. Можна пропустити й переглянути пізніше.
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useT } from './LangProvider';
import type { T } from '@/lib/i18n';

export type TourStep = { sel?: string; title: T; text: T };
const KEY = (id: string) => `murly:tour:${id}`;

// Запустити навчання з будь-якого місця: window.dispatchEvent(new CustomEvent('murly:tour', { detail: 'teacher' }))
export const startTour = (id: string) => window.dispatchEvent(new CustomEvent('murly:tour', { detail: id }));

export default function Tour({ id, steps, auto = true }: { id: string; steps: TourStep[]; auto?: boolean }) {
  const t = useT();
  const [i, setI] = useState<number | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    let seen = false;
    try { seen = localStorage.getItem(KEY(id)) === 'done'; } catch { /* */ }
    const asked = new URLSearchParams(window.location.search).get('tour') === id; // посилання ?tour=site
    const timer = (auto && !seen) || asked ? window.setTimeout(() => setI(0), 900) : 0;
    const on = (e: Event) => { if ((e as CustomEvent).detail === id) setI(0); };
    window.addEventListener('murly:tour', on);
    return () => { window.clearTimeout(timer); window.removeEventListener('murly:tour', on); };
  }, [id, auto]);

  const finish = useCallback(() => { try { localStorage.setItem(KEY(id), 'done'); } catch { /* */ } setI(null); }, [id]);

  // знаходимо видимий елемент кроку (на телефоні частина меню схована: тоді показуємо крок по центру)
  const step = i == null ? null : steps[i];
  useLayoutEffect(() => {
    if (!step) return;
    const find = () => {
      const el = step.sel ? Array.from(document.querySelectorAll<HTMLElement>(step.sel)).find((x) => x.offsetParent !== null && x.getBoundingClientRect().width > 0) : null;
      if (el) { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); window.setTimeout(() => setRect(el.getBoundingClientRect()), 350); } else setRect(null);
    };
    find();
    const re = () => find();
    window.addEventListener('resize', re);
    return () => window.removeEventListener('resize', re);
  }, [step]);

  useEffect(() => {
    if (i == null) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') finish(); if (e.key === 'ArrowRight') setI((x) => (x == null ? x : Math.min(steps.length - 1, x + 1))); if (e.key === 'ArrowLeft') setI((x) => (x == null ? x : Math.max(0, x - 1))); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [i, steps.length, finish]);

  if (i == null || !step) return null;
  const last = i === steps.length - 1;
  const pad = 8;
  const below = rect ? rect.bottom + 220 < window.innerHeight : true;
  const boxStyle: React.CSSProperties | undefined = rect ? {
    left: Math.max(12, Math.min(window.innerWidth - 352, rect.left)),
    top: below ? rect.bottom + pad + 10 : Math.max(12, rect.top - pad - 10 - 200),
  } : undefined;

  return (
    <div className="tour" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      {rect
        ? <div className="tour__spot" style={{ left: rect.left - pad, top: rect.top - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 }} />
        : <div className="tour__dim" />}
      <div className={`tour__card ${rect ? '' : 'is-center'}`} style={boxStyle}>
        <div className="tour__count">{i + 1} / {steps.length}</div>
        <h3 id="tour-title">{t(step.title)}</h3>
        <p>{t(step.text)}</p>
        <div className="tour__bar">
          <button type="button" className="tour__skip" onClick={finish}>{t({ uk: 'Пропустити', ru: 'Пропустить', en: 'Skip' })}</button>
          <span className="tour__nav">
            {i > 0 && <button type="button" className="mu-btn t-btn-sm" onClick={() => setI(i - 1)}>{t({ uk: 'Назад', ru: 'Назад', en: 'Back' })}</button>}
            <button type="button" className="mu-btn mu-btn--ink t-btn-sm" onClick={() => (last ? finish() : setI(i + 1))} autoFocus>{last ? t({ uk: 'Зрозуміло', ru: 'Понятно', en: 'Got it' }) : t({ uk: 'Далі', ru: 'Далее', en: 'Next' })}</button>
          </span>
        </div>
      </div>
    </div>
  );
}
