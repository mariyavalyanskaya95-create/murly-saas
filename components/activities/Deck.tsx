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
  const [pick, setPick] = useState<number | null>(null);
  const [left, setLeft] = useState(0); // таймер, секунди
  const [timerOn, setTimerOn] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const total = a.slides.length;

  const close = useCallback(() => {
    setShow(null);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);
  const go = useCallback((d: number) => { setPick(null); setShow((x) => (x == null ? x : Math.max(0, Math.min(total - 1, x + d)))); }, [total]);
  // скільки елементів на слайді можна «витягнути» навмання
  const count = (() => {
    const s = show == null ? null : a.slides[show];
    if (!s) return 0;
    return s.kind === 'cards' ? s.cards.length : s.kind === 'choose' ? s.options.length : s.kind === 'questions' ? s.questions.length : 0;
  })();
  const spin = () => {
    if (!count) return;
    let k = 0; const steps = 9 + Math.floor(Math.random() * count);
    const tick = () => { setPick(k % count); k++; if (k <= steps) window.setTimeout(tick, 60 + k * 18); };
    tick();
  };
  useEffect(() => {
    if (!timerOn) return;
    if (left <= 0) { setTimerOn(false); return; }
    const t = window.setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => window.clearTimeout(t);
  }, [timerOn, left]);
  const startTimer = () => { setLeft((x) => (timerOn ? Math.min(600, x + 60) : 60)); setTimerOn(true); };

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
        <div className="act-stage" ref={stage} role="dialog" aria-label={a.title}>
          <div className="act-stage__slide" key={show}>
            <SlideView a={a} s={a.slides[show]} n={show + 1} total={total} live pick={pick} />
          </div>
          <div className="act-stage__nav">
            <button type="button" onClick={() => go(-1)} disabled={show === 0} aria-label={t({ uk: 'Назад', ru: 'Назад', en: 'Back' })}>‹</button>
            <span>{show + 1} / {total}</span>
            <button type="button" onClick={() => go(1)} disabled={show === total - 1} aria-label={t({ uk: 'Далі', ru: 'Далее', en: 'Next' })}>›</button>
            {count > 0 && <button type="button" className="act-stage__tool" onClick={spin}>{t({ uk: 'Навмання', ru: 'Случайно', en: 'Random' })}</button>}
            <button type="button" className={`act-stage__tool ${timerOn ? 'is-on' : ''} ${timerOn && left <= 10 ? 'is-end' : ''}`} onClick={startTimer} title={t({ uk: 'Таймер: кожне натискання +1 хв', ru: 'Таймер: каждое нажатие +1 мин', en: 'Timer: each click adds 1 min' })}>
              {timerOn ? `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}` : t({ uk: 'Таймер', ru: 'Таймер', en: 'Timer' })}
            </button>
            {timerOn && <button type="button" className="act-stage__tool" onClick={() => { setTimerOn(false); setLeft(0); }} aria-label="Stop">×</button>}
            <button type="button" className="act-stage__x" onClick={close}>{t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}</button>
          </div>
        </div>
      )}
    </>
  );
}
