'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import { useT } from '@/components/LangProvider';
import { liveVoices, say, stopSpeak } from '@/lib/speak';
import TrackPlayer from '@/components/audio/TrackPlayer';
import { ROTATION, voicesForSpeakers, type VoicePreset } from '@/lib/voices';

export { parseScript } from '@/lib/script';
import { parseScript } from '@/lib/script';

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

export default function AudioPlayer({ script, title, audioUrl, voiceMap, onDone }: { script: string; title?: string; audioUrl?: string; voiceMap?: Record<string, VoicePreset>; onDone?: () => void }) {
  const t = useT();
  const lines = useMemo(() => parseScript(script), [script]);
  const speakers = useMemo(() => Array.from(new Set(lines.map((l) => l.who))), [lines]);
  const autoVoices = useMemo(() => voicesForSpeakers(speakers), [speakers]);
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
    return () => { window.speechSynthesis.removeEventListener('voiceschanged', load); stopSpeak(); };
  }, [audioUrl]);

  // живі голоси: диктор для рядків без імені, решта персонажів по черзі
  const presetOf = (who: string): VoicePreset => {
    if (!who) return 'narrator';
    const named = voiceMap?.[who] ?? autoVoices[who];
    return named ?? ROTATION[0];
  };
  const [live, setLive] = useState<boolean | null>(null);
  const [trackFail, setTrackFail] = useState(false);
  useEffect(() => { if (!audioUrl) liveVoices().then(setLive); }, [audioUrl]);
  const track = useMemo(() => lines.map((l) => ({ who: l.who, text: l.text, voice: presetOf(l.who) })), [lines]); // eslint-disable-line react-hooks/exhaustive-deps
  const stop = () => { stopRef.current = true; stopSpeak(); setPlaying(false); setCurrent(-1); };

  const play = (from = 0) => {
    if (!ok) return;
    stopSpeak();
    stopRef.current = false;
    setPlaying(true);
    const sayLine = (i: number) => {
      if (stopRef.current) return;
      if (i >= lines.length) { setPlaying(false); setCurrent(-1); onDone?.(); return; }
      setCurrent(i);
      const l = lines[i];
      const idx = Math.max(0, speakers.indexOf(l.who));
      say(l.text, { voice: presetOf(l.who), slow, pitch: voices.length < 2 ? [1, 0.75, 1.3, 0.9][idx % 4] : 1, onEnd: () => setTimeout(() => sayLine(i + 1), 300) });
    };
    sayLine(from);
  };

  if (audioUrl) {
    return (
      <div className="ap">
        <div className="ap__head"><Icon id="e-head" /><b>{title || 'Listening'}</b></div>
        <audio controls preload="none" src={audioUrl} className="ap__audio" />
        {script.trim() && <button className="t-link-btn" onClick={() => setShowText(!showText)}>{showText ? t({ uk: 'Сховати текст', ru: 'Скрыть текст', en: 'Hide text' }) : t({ uk: 'Показати текст', ru: 'Показать текст', en: 'Show text' })}</button>}
        {showText && <div className="ap__text">{lines.map((l, i) => <p key={i}>{l.who && <b>{l.who}: </b>}{l.text}</p>)}</div>}
      </div>
    );
  }

  if (live && !trackFail) return (
    <div className="ap">
      <div className="ap__head"><Icon id="e-head" /><b>{title || 'Listening'}</b>{speakers.filter(Boolean).length > 0 && <span className="t-muted">{speakers.filter(Boolean).join(', ')}</span>}</div>
      <div className="ap__controls"><button className={`g-chip ${showText ? 'is-on' : ''}`} onClick={() => setShowText(!showText)} aria-pressed={showText}>{t({ uk: 'Текст', ru: 'Текст', en: 'Text' })}</button></div>
      <TrackPlayer lines={track} showText={showText} onEnded={onDone} onFail={() => setTrackFail(true)} />
    </div>
  );

  return (
    <div className="ap">
      <div className="ap__head"><Icon id="e-head" /><b>{title || 'Listening'}</b>{speakers.filter(Boolean).length > 0 && <span className="t-muted">{speakers.filter(Boolean).join(', ')}</span>}</div>
      {!ok ? <p className="t-muted">{t({ uk: 'Цей браузер не вміє озвучувати текст. Відкрий у Chrome або Safari.', ru: 'Этот браузер не умеет озвучивать текст. Открой в Chrome или Safari.', en: 'This browser cannot read text aloud. Open it in Chrome or Safari.' })}</p> : (
        <div className="ap__controls">
          {!playing
            ? <button className="mu-btn mu-btn--lime" onClick={() => play(0)}><Icon id="e-head" />{t({ uk: 'Слухати', ru: 'Слушать', en: 'Listen' })}</button>
            : <button className="mu-btn" onClick={stop}>{t({ uk: 'Стоп', ru: 'Стоп', en: 'Stop' })}</button>}
          <button className={`g-chip ${slow ? 'is-on' : ''}`} onClick={() => setSlow(!slow)} aria-pressed={slow}>{t({ uk: 'Повільніше', ru: 'Медленнее', en: 'Slower' })}</button>
          <button className={`g-chip ${showText ? 'is-on' : ''}`} onClick={() => setShowText(!showText)} aria-pressed={showText}>{t({ uk: 'Текст', ru: 'Текст', en: 'Text' })}</button>
        </div>
      )}
      {showText && (
        <div className="ap__text">
          {lines.map((l, i) => (
            <p key={i} className={i === current ? 'is-now' : ''} onClick={() => play(i)} title={t({ uk: 'Слухати з цього місця', ru: 'Слушать с этого места', en: 'Listen from here' })}>
              {l.who && <b>{l.who}: </b>}{l.text}
            </p>
          ))}
        </div>
      )}
      {!showText && playing && current >= 0 && lines[current]?.who && <p className="ap__now">{t({ uk: 'Говорить', ru: 'Говорит', en: 'Speaking' })}: <b>{lines[current].who}</b></p>}
    </div>
  );
}
