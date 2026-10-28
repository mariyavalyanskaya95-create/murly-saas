'use client';
// Плеєр як у British Council: одна доріжка з репліками різних голосів,
// повзунок, назад/вперед на 5 секунд, швидкість 0.5–1.5, текст підсвічується і клікається.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useT } from '@/components/LangProvider';
import { ttsUrl } from '@/lib/speak';
import type { VoicePreset } from '@/lib/voices';

export type TrackLine = { who: string; text: string; voice: VoicePreset };
const GAP = 0.35; // пауза між репліками, секунд
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function TrackPlayer({ lines, showText, onEnded, narratorLabel, onFail }: { lines: TrackLine[]; showText: boolean; onEnded?: () => void; narratorLabel?: string; onFail?: () => void }) {
  const t = useT();
  const audios = useRef<HTMLAudioElement[]>([]);
  const [durs, setDurs] = useState<number[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(0); // загальна позиція, с
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const playingRef = useRef(false);
  const idxRef = useRef(0);
  const raf = useRef(0);
  const gapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // завантажуємо тривалість кожної репліки
  useEffect(() => {
    let alive = true;
    audios.current.forEach((a) => a.pause());
    const list = lines.map((l) => { const a = new Audio(); a.preload = 'metadata'; a.src = ttsUrl(l.text, l.voice); return a; });
    audios.current = list;
    setDurs(null); setFailed(false); setIdx(0); setPos(0); idxRef.current = 0;
    Promise.all(list.map((a) => new Promise<number>((res, rej) => {
      if (a.readyState >= 1 && isFinite(a.duration)) return res(a.duration);
      a.addEventListener('loadedmetadata', () => res(isFinite(a.duration) ? a.duration : 2), { once: true });
      a.addEventListener('error', () => rej(new Error('audio')), { once: true });
    }))).then((d) => { if (alive) setDurs(d); }).catch(() => { if (alive) { setFailed(true); onFail?.(); } });
    return () => { alive = false; list.forEach((a) => { a.pause(); a.src = ''; }); };
  }, [lines]);

  const starts = useMemo(() => {
    if (!durs) return [];
    let acc = 0;
    return durs.map((d) => { const s = acc; acc += d + GAP; return s; });
  }, [durs]);
  const total = durs ? starts[starts.length - 1] + durs[durs.length - 1] : 0;

  const tick = useCallback(() => {
    const a = audios.current[idxRef.current];
    if (a && starts.length) setPos(starts[idxRef.current] + a.currentTime);
    raf.current = requestAnimationFrame(tick);
  }, [starts]);

  const stopAll = () => { audios.current.forEach((a) => a.pause()); if (gapTimer.current) clearTimeout(gapTimer.current); cancelAnimationFrame(raf.current); };

  const playFrom = useCallback((i: number, offset = 0) => {
    stopAll();
    if (i >= audios.current.length) { playingRef.current = false; setPlaying(false); setPos(total); onEnded?.(); return; }
    idxRef.current = i; setIdx(i);
    const a = audios.current[i];
    a.currentTime = Math.max(0, offset);
    a.playbackRate = rate;
    a.onended = () => {
      if (!playingRef.current) return;
      gapTimer.current = setTimeout(() => { if (playingRef.current) playFrom(i + 1); }, (GAP * 1000) / rate);
    };
    playingRef.current = true; setPlaying(true);
    a.play().catch(() => { playingRef.current = false; setPlaying(false); });
    raf.current = requestAnimationFrame(tick);
  }, [rate, tick, total, onEnded]); // eslint-disable-line react-hooks/exhaustive-deps

  const seek = (sec: number) => {
    if (!durs) return;
    const s = Math.max(0, Math.min(total - 0.05, sec));
    let i = starts.findIndex((st, k) => s >= st && s < st + durs[k] + GAP);
    if (i < 0) i = starts.length - 1;
    const off = Math.min(durs[i], s - starts[i]);
    setPos(s);
    if (playingRef.current) playFrom(i, off); else { idxRef.current = i; setIdx(i); audios.current[i].currentTime = off; }
  };
  const toggle = () => {
    if (playing) { playingRef.current = false; setPlaying(false); stopAll(); return; }
    if (pos >= total - 0.1) { playFrom(0); return; }
    playFrom(idxRef.current, audios.current[idxRef.current]?.currentTime ?? 0);
  };
  useEffect(() => { audios.current.forEach((a) => { a.playbackRate = rate; }); }, [rate]);
  useEffect(() => () => stopAll(), []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (showText && playing) lineRefs.current[idx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [idx, showText, playing]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input, textarea, select')) return;
      if (e.key === 'ArrowLeft') seek(pos - 5); else if (e.key === 'ArrowRight') seek(pos + 5);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (failed) return null; // батьківський компонент покаже запасний плеєр

  return (
    <div className="tp">
      <div className="tp-bar">
        <button type="button" className="tp-btn" onClick={() => seek(pos - 5)} disabled={!durs} aria-label={t({ uk: 'Назад на 5 секунд', ru: 'Назад на 5 секунд', en: 'Back 5 seconds' })}>↺5</button>
        <button type="button" className="tp-play" onClick={toggle} disabled={!durs} aria-label={playing ? t({ uk: 'Пауза', ru: 'Пауза', en: 'Pause' }) : t({ uk: 'Слухати', ru: 'Слушать', en: 'Play' })}>
          {!durs ? '…' : playing ? <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" /></svg>
            : <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5 L19 12 L8 19 Z" fill="currentColor" /></svg>}
        </button>
        <button type="button" className="tp-btn" onClick={() => seek(pos + 5)} disabled={!durs} aria-label={t({ uk: 'Вперед на 5 секунд', ru: 'Вперёд на 5 секунд', en: 'Forward 5 seconds' })}>5↻</button>
        <span className="tp-time">{fmt(pos)} / {durs ? fmt(total) : '…'}</span>
        <input className="tp-seek" type="range" min={0} max={total || 1} step={0.1} value={Math.min(pos, total || 1)} disabled={!durs} onChange={(e) => seek(Number(e.target.value))} aria-label={t({ uk: 'Перемотати', ru: 'Перемотать', en: 'Seek' })} />
        <select className="tp-rate" value={rate} onChange={(e) => setRate(Number(e.target.value))} aria-label={t({ uk: 'Швидкість', ru: 'Скорость', en: 'Speed' })}>
          {SPEEDS.map((s) => <option key={s} value={s}>{s === 1 ? t({ uk: 'Звичайна', ru: 'Обычная', en: 'Normal' }) : `${s}×`}</option>)}
        </select>
      </div>
      {!durs && <p className="t-muted tp-load">{t({ uk: 'Готуємо аудіо…', ru: 'Готовим аудио…', en: 'Preparing audio…' })}</p>}
      {showText && (
        <div className="tp-text">
          {lines.map((l, i) => (
            <p key={i} ref={(el) => { lineRefs.current[i] = el; }} className={`${i === idx && (playing || pos > 0) ? 'is-now' : ''} ${l.who ? '' : 'is-narr'}`} onClick={() => starts.length && seek(starts[i])}>
              {l.who ? <b>{l.who}: </b> : narratorLabel ? null : null}{l.text}
            </p>
          ))}
        </div>
      )}
      {!showText && playing && lines[idx] && <p className="t-muted tp-who">{t({ uk: 'Говорить', ru: 'Говорит', en: 'Speaking' })}: <b>{lines[idx].who || narratorLabel || t({ uk: 'Оповідач', ru: 'Рассказчик', en: 'Narrator' })}</b></p>}
    </div>
  );
}
