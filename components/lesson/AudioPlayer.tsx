'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';

type Line = { who: string; text: string };

// «Anna: Hi!» → репліка зі спікером; рядок без двокрапки читає диктор
export function parseScript(script: string): Line[] {
  return script.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const m = l.match(/^([A-Z][\w .'-]{0,20}):\s*(.+)$/);
    return m ? { who: m[1].trim(), text: m[2].trim() } : { who: '', text: l };
  });
}

// Підбираємо різні англійські голоси для різних персонажів
function pickVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const all = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en'));
  const gb = all.filter((v) => v.lang === 'en-GB');
  const us = all.filter((v) => v.lang === 'en-US');
  const rest = all.filter((v) => v.lang !== 'en-GB' && v.lang !== 'en-US');
  const out: SpeechSynthesisVoice[] = [];
  // чергуємо акценти, щоб голоси звучали по-різному
  for (let i = 0; out.length < all.length && i < 20; i++) {
    [gb[i], us[i], rest[i]].forEach((v) => { if (v && !out.includes(v)) out.push(v); });
  }
  return out;
}

export default function AudioPlayer({ script, title, audioUrl }: { script: string; title?: string; audioUrl?: string }) {
  const lines = useMemo(() => parseScript(script), [script]);
  const speakers = useMemo(() => Array.from(new Set(lines.map((l) => l.who))), [lines]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [ok, setOk] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [slow, setSlow] = useState(false);
  const [showText, setShowText] = useState(false);
  const stopRef = useRef(false);

  useEffect(() => {
    if (audioUrl) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) { setOk(false); return; }
    const load = () => setVoices(pickVoices());
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => { window.speechSynthesis.removeEventListener('voiceschanged', load); window.speechSynthesis.cancel(); };
  }, [audioUrl]);

  const stop = () => { stopRef.current = true; window.speechSynthesis.cancel(); setPlaying(false); setCurrent(-1); };

  const play = (from = 0) => {
    if (!ok) return;
    window.speechSynthesis.cancel();
    stopRef.current = false;
    setPlaying(true);
    const sayLine = (i: number) => {
      if (stopRef.current) return;
      if (i >= lines.length) { setPlaying(false); setCurrent(-1); return; }
      setCurrent(i);
      const l = lines[i];
      const u = new SpeechSynthesisUtterance(l.text);
      const idx = Math.max(0, speakers.indexOf(l.who));
      const v = voices.length ? voices[idx % voices.length] : null;
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-GB';
      // якщо голос один, розрізняємо персонажів висотою
      if (voices.length < 2) u.pitch = [1, 0.75, 1.3, 0.9][idx % 4];
      u.rate = slow ? 0.75 : 0.95;
      u.onend = () => setTimeout(() => sayLine(i + 1), 350);
      u.onerror = () => { setPlaying(false); setCurrent(-1); };
      window.speechSynthesis.speak(u);
    };
    sayLine(from);
  };

  if (audioUrl) {
    return (
      <div className="ap">
        <div className="ap__head"><Icon id="e-head" /><b>{title || 'Listening'}</b></div>
        <audio controls preload="none" src={audioUrl} className="ap__audio" />
        {script.trim() && <button className="t-link-btn" onClick={() => setShowText(!showText)}>{showText ? 'Сховати текст' : 'Показати текст'}</button>}
        {showText && <div className="ap__text">{lines.map((l, i) => <p key={i}>{l.who && <b>{l.who}: </b>}{l.text}</p>)}</div>}
      </div>
    );
  }

  return (
    <div className="ap">
      <div className="ap__head"><Icon id="e-head" /><b>{title || 'Listening'}</b>{speakers.filter(Boolean).length > 0 && <span className="t-muted">{speakers.filter(Boolean).join(', ')}</span>}</div>
      {!ok ? <p className="t-muted">Цей браузер не вміє озвучувати текст. Відкрий у Chrome або Safari.</p> : (
        <div className="ap__controls">
          {!playing
            ? <button className="mu-btn mu-btn--lime" onClick={() => play(0)}><Icon id="e-head" />Слухати</button>
            : <button className="mu-btn" onClick={stop}>Стоп</button>}
          <button className={`g-chip ${slow ? 'is-on' : ''}`} onClick={() => setSlow(!slow)} aria-pressed={slow}>Повільніше</button>
          <button className={`g-chip ${showText ? 'is-on' : ''}`} onClick={() => setShowText(!showText)} aria-pressed={showText}>Текст</button>
        </div>
      )}
      {showText && (
        <div className="ap__text">
          {lines.map((l, i) => (
            <p key={i} className={i === current ? 'is-now' : ''} onClick={() => play(i)} title="Слухати з цього місця">
              {l.who && <b>{l.who}: </b>}{l.text}
            </p>
          ))}
        </div>
      )}
      {!showText && playing && current >= 0 && lines[current]?.who && <p className="ap__now">Говорить: <b>{lines[current].who}</b></p>}
    </div>
  );
}
