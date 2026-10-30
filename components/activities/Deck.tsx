'use client';
// Слайди активності: прев’ю списком, показ на весь екран (стрілки, Esc) і друк у PDF (альбомні сторінки A4)
import { useCallback, useEffect, useRef, useState } from 'react';
import SlideView from './SlideView';
import Icon from '../Icon';
import { useT } from '../LangProvider';
import type { Activity } from '@/lib/activities';

export default function Deck({ a }: { a: Activity }) {
  const t = useT();
  const [show, setShow] = useState<number | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const total = a.slides.length;

  const close = useCallback(() => {
    setShow(null);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);
  const go = useCallback((d: number) => setShow((x) => (x == null ? x : Math.max(0, Math.min(total - 1, x + d)))), [total]);

  useEffect(() => {
    if (show == null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
    };
    const fs = () => { if (!document.fullscreenElement) setShow((x) => x); };
    window.addEventListener('keydown', key); document.addEventListener('fullscreenchange', fs);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.removeEventListener('fullscreenchange', fs); document.body.style.overflow = ''; };
  }, [show, go, close]);

  const open = (i: number) => {
    setShow(i);
    window.setTimeout(() => { stage.current?.requestFullscreen?.().catch(() => {}); }, 30);
  };

  return (
    <>
      <div className="act-bar no-print">
        <button type="button" className="mu-btn mu-btn--lime" onClick={() => open(0)}><Icon id="e-board" />{t({ uk: 'Показати слайди', ru: 'Показать слайды', en: 'Present slides' })}</button>
        <button type="button" className="mu-btn" onClick={() => window.print()}><Icon id="e-pencil" />{t({ uk: 'Завантажити PDF', ru: 'Скачать PDF', en: 'Download PDF' })}</button>
        <small className="t-muted">{t({ uk: 'PDF: у вікні друку обери «Зберегти як PDF».', ru: 'PDF: в окне печати выбери «Сохранить как PDF».', en: 'PDF: choose “Save as PDF” in the print dialog.' })}</small>
      </div>

      <div className="act-slides act-print">
        {a.slides.map((s, i) => (
          <button key={i} type="button" className="act-thumb" onClick={() => open(i)} aria-label={`${t({ uk: 'Слайд', ru: 'Слайд', en: 'Slide' })} ${i + 1}`}>
            <SlideView a={a} s={s} n={i + 1} total={total} />
          </button>
        ))}
      </div>

      {show != null && (
        <div className="act-stage" ref={stage} role="dialog" aria-label={a.title} onClick={(e) => { if (e.target === e.currentTarget) go(1); }}>
          <div className="act-stage__slide" key={show}>
            <SlideView a={a} s={a.slides[show]} n={show + 1} total={total} />
          </div>
          <div className="act-stage__nav">
            <button type="button" onClick={() => go(-1)} disabled={show === 0} aria-label={t({ uk: 'Назад', ru: 'Назад', en: 'Back' })}>‹</button>
            <span>{show + 1} / {total}</span>
            <button type="button" onClick={() => go(1)} disabled={show === total - 1} aria-label={t({ uk: 'Далі', ru: 'Далее', en: 'Next' })}>›</button>
            <button type="button" className="act-stage__x" onClick={close}>{t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}</button>
          </div>
        </div>
      )}
    </>
  );
}
