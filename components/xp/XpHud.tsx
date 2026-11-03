'use client';
// Плашка досвіду: рівень, звання, шкала XP. Ловить події gainXp: частинки, звук, «LEVEL UP!».
// persist: зберігати на сервері (учень у кабінеті); без входу досвід живе в цьому браузері.
import { useEffect, useRef, useState } from 'react';
import { levelInfo } from '@/lib/xp';
import type { XpEvent } from '@/lib/xp-client';
import { useT } from '../LangProvider';

const LS_XP = 'murly:xp:guest', LS_KEYS = 'murly:xp:keys', LS_MUTE = 'murly:xp:mute';
const read = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* приватний режим */ } };

let AC: AudioContext | null = null;
function tone(f: number, d: number, when = 0, type: OscillatorType = 'square', v = 0.05) {
  try {
    AC = AC || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.value = f; g.gain.value = v;
    o.connect(g); g.connect(AC.destination); const t = AC.currentTime + when; o.start(t); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.stop(t + d);
  } catch { /* без звуку */ }
}

export default function XpHud({ persist = false }: { persist?: boolean }) {
  const t = useT();
  const [xp, setXp] = useState(0);
  const [ready, setReady] = useState(false);
  const [mute, setMute] = useState(false);
  const [float, setFloat] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
  const [lvlUp, setLvlUp] = useState(0);
  const server = useRef(false);
  const seen = useRef<Set<string>>(new Set());
  const pos = useRef({ x: 0, y: 0 });
  const xpRef = useRef(0);

  useEffect(() => {
    setMute(read(LS_MUTE) === '1');
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onDown = (e: PointerEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('pointerdown', onDown, true);
    const local = () => {
      const v = Number(read(LS_XP) ?? 0) || 0; xpRef.current = v; setXp(v);
      try { (JSON.parse(read(LS_KEYS) ?? '[]') as string[]).forEach((k) => seen.current.add(k)); } catch { /* */ }
      setReady(true);
    };
    if (persist) {
      fetch('/api/xp').then((r) => (r.ok ? r.json() : Promise.reject())).then((d) => { server.current = true; xpRef.current = Number(d.xp) || 0; setXp(xpRef.current); setReady(true); }).catch(local);
    } else local();
    return () => window.removeEventListener('pointerdown', onDown, true);
  }, [persist]);

  useEffect(() => {
    const on = (ev: Event) => {
      const { items, source, label } = (ev as CustomEvent<XpEvent>).detail;
      const fresh = items.filter((it) => !seen.current.has(it.key));
      if (!fresh.length) return;
      fresh.forEach((it) => seen.current.add(it.key));
      const sum = fresh.reduce((a, it) => a + it.amount, 0);
      const before = levelInfo(xpRef.current).level;
      xpRef.current += sum; setXp(xpRef.current);
      const after = levelInfo(xpRef.current).level;
      // ефекти
      const id = Date.now() + Math.random();
      setFloat((f) => [...f, { id, x: pos.current.x, y: pos.current.y, text: `+${sum} XP${label ? ` · ${label}` : ''}` }]);
      setTimeout(() => setFloat((f) => f.filter((x) => x.id !== id)), 1300);
      burst(pos.current.x, pos.current.y, Math.min(24, 8 + fresh.length * 2));
      const muted = read(LS_MUTE) === '1';
      if (after > before) { setLvlUp(after); setTimeout(() => setLvlUp(0), 2200); if (!muted) [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.18, i * 0.11)); }
      else if (!muted) { tone(660, 0.08); tone(990, 0.12, 0.07); }
      // збереження
      if (server.current) {
        fetch('/api/xp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: fresh, source }) })
          .then((r) => r.json()).then((d) => { if (typeof d.xp === 'number') { xpRef.current = d.xp; setXp(d.xp); } }).catch(() => {});
      } else {
        write(LS_XP, String(xpRef.current));
        write(LS_KEYS, JSON.stringify([...seen.current].slice(-3000)));
      }
    };
    window.addEventListener('murly:xp', on);
    return () => window.removeEventListener('murly:xp', on);
  }, []);

  const L = levelInfo(xp);
  if (!ready) return null;
  return (
    <>
      <div className="xp-hud" role="status" aria-label={`Level ${L.level}, ${xp} XP`}>
        <span className="xp-hud__lv" style={{ background: L.rank.color }}>LV {L.level}</span>
        <span className="xp-hud__rank">{t(L.rank.name)}</span>
        <span className="xp-hud__bar"><i style={{ width: `${L.pct}%` }} /></span>
        <b className="xp-hud__xp">{xp} XP</b>
        <button type="button" className="xp-hud__mute" onClick={() => { const m = !mute; setMute(m); write(LS_MUTE, m ? '1' : '0'); }}
          aria-label={mute ? t({ uk: 'Увімкнути звук', ru: 'Включить звук', en: 'Sound on' }) : t({ uk: 'Вимкнути звук', ru: 'Выключить звук', en: 'Sound off' })}>{mute ? '×' : '♪'}</button>
      </div>
      {float.map((f) => <span key={f.id} className="xp-float" style={{ left: f.x, top: f.y }}>{f.text}</span>)}
      {lvlUp > 0 && <div className="xp-lvlup"><b>LEVEL UP!</b><span>{t({ uk: 'Рівень', ru: 'Уровень', en: 'Level' })} {lvlUp} · {t(levelInfo(xp).rank.name)}</span></div>}
    </>
  );
}

function burst(x: number, y: number, n: number) {
  const cols = ['#7cff4f', '#ffd23f', '#33e0d6', '#ff5a5f', '#ff8fd8', '#8e6cff'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i'); p.className = 'xp-pxl';
    p.style.left = `${x}px`; p.style.top = `${y}px`; p.style.background = cols[i % cols.length];
    const a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 80;
    p.style.setProperty('--dx', `${Math.cos(a) * r}px`); p.style.setProperty('--dy', `${Math.sin(a) * r - 30}px`);
    document.body.appendChild(p); setTimeout(() => p.remove(), 850);
  }
}
