'use client';
// Живий котик Murly (м'який стиль, як персонажі Rive): без жорстких контурів, з об'ємом і плавними рухами.
// Голова й очі плавно повертаються за мишкою, котик дихає, кліпає, ворушить вухами й хвостом.
// Клік міняє позу: махає лапкою, пише олівцем, стрибає із зірочками, сердечко, спить. Малюнок наш.
import { useEffect, useId, useRef, useState } from 'react';
import { useT } from './LangProvider';

const POSES = ['wave', 'pencil', 'jump', 'love', 'sleep'] as const;
type Pose = (typeof POSES)[number] | 'idle';
const SAY: Record<Pose, string> = { idle: '', wave: 'Hi! I’m Murly!', pencil: 'Let’s learn!', jump: 'Great job!', love: 'I love English!', sleep: 'Zzz… five more minutes' };

// Два котики: білий Мурлі і персикова подружка з бантиком
const SKINS = {
  white: { hi: '#FFFFFF', mid: '#F6F7FD', lo: '#DCE1F5', bodyMid: '#F1F3FC', bodyLo: '#D5DBF2', line: '#AEB8E2', belly: '#E6EAFA', paw: '#FFFFFF', collar: '#AFC3F0' },
  peach: { hi: '#FFF8F2', mid: '#FDEDE2', lo: '#F5D3BE', bodyMid: '#FCE8DA', bodyLo: '#F1CDB6', line: '#E2AE90', belly: '#FFF3EA', paw: '#FFF6EF', collar: '#F4C0D1' },
};
export default function MurlyCat({ className = '', skin = 'white' }: { className?: string; skin?: keyof typeof SKINS }) {
  const t = useT();
  const uid = useId().replace(/:/g, '');
  const k = SKINS[skin];
  const box = useRef<HTMLDivElement>(null);
  const [pose, setPose] = useState<Pose>('idle');
  const [n, setN] = useState(0);
  // плавне стеження: ціль з мишки, поточне значення наближається до неї в кожному кадрі
  useEffect(() => {
    const el = box.current; if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, alive = true;
    const on = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2); const dy = e.clientY - (r.top + r.height * 0.38);
      const d = Math.hypot(dx, dy) || 1; const k = Math.min(1, d / 320);
      tx = (dx / d) * k; ty = (dy / d) * k;
    };
    const loop = () => {
      if (!alive) return;
      x += (tx - x) * 0.08; y += (ty - y) * 0.08;
      el.style.setProperty('--lx', x.toFixed(3)); el.style.setProperty('--ly', y.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', on, { passive: true });
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => { alive = false; window.removeEventListener('mousemove', on); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    if (pose === 'idle') return;
    const id = setTimeout(() => setPose('idle'), pose === 'sleep' ? 4200 : 2800);
    return () => clearTimeout(id);
  }, [pose, n]);
  const next = () => { setPose(POSES[n % POSES.length]); setN(n + 1); };
  const closed = pose === 'love' || pose === 'sleep';
  return (
    <div ref={box} className={`mcat mcat--${pose} ${className}`}>
      {pose !== 'idle' && <span key={n} className="mcat__say" role="status">{SAY[pose]}</span>}
      <button type="button" className="mcat__btn" onClick={next} aria-label={t({ uk: 'Погладити котика Murly', ru: 'Погладить котика Murly', en: 'Pet Murly the cat' })}>
        <svg viewBox="0 0 220 240" aria-hidden="true">
          <defs>
            <radialGradient id={`f${uid}`} cx="40%" cy="30%" r="75%"><stop offset="0" stopColor={k.hi} /><stop offset=".7" stopColor={k.mid} /><stop offset="1" stopColor={k.lo} /></radialGradient>
            <radialGradient id={`b${uid}`} cx="45%" cy="25%" r="80%"><stop offset="0" stopColor={k.hi} /><stop offset=".75" stopColor={k.bodyMid} /><stop offset="1" stopColor={k.bodyLo} /></radialGradient>
            <radialGradient id={`e${uid}`} cx="40%" cy="35%" r="70%"><stop offset="0" stopColor="#3A4378" /><stop offset="1" stopColor="#141935" /></radialGradient>
          </defs>
          <ellipse className="mcat__shadow" cx="110" cy="230" rx="58" ry="8" fill="#1B2140" opacity=".12" />
          <g className="mcat__all">
            <g className="mcat__tail"><path d="M150 200c34 6 52-12 46-38-3-13-14-18-21-12" fill="none" stroke={k.line} strokeWidth="16" strokeLinecap="round" /><path d="M150 200c34 6 52-12 46-38-3-13-14-18-21-12" fill="none" stroke={k.paw} strokeWidth="11" strokeLinecap="round" /><circle cx="175" cy="150" r="7" fill="#C9D3F3" /></g>
            <g className="mcat__body">
              <path d="M62 196c0-34 20-58 48-58s48 24 48 58c0 18-14 28-48 28s-48-10-48-28z" fill={`url(#b${uid})`} stroke={k.line} strokeWidth="2.5" />
              <ellipse cx="110" cy="194" rx="24" ry="22" fill={k.belly} />
              <ellipse cx="88" cy="224" rx="16" ry="9" fill={k.paw} stroke={k.line} strokeWidth="2.5" /><ellipse cx="132" cy="224" rx="16" ry="9" fill={k.paw} stroke={k.line} strokeWidth="2.5" />
              <path d="M82 226h12M126 226h12" stroke="#C9D3F3" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="72" cy="184" rx="11" ry="14" fill={k.paw} stroke={k.line} strokeWidth="2.5" transform="rotate(18 72 184)" />
            </g>
            <g className="mcat__arm">
              <ellipse cx="150" cy="182" rx="11" ry="15" fill={k.paw} stroke={k.line} strokeWidth="2.5" transform="rotate(-20 150 182)" />
              <ellipse cx="153" cy="192" rx="7" ry="4" fill="#F4C0D1" opacity=".7" />
              <g className="mcat__pencil"><rect x="156" y="150" width="9" height="40" rx="3" fill="#F4C0D1" transform="rotate(22 160 170)" /><path d="M160 192l4 10 4-10z" fill="#3A4378" transform="rotate(22 160 170)" /></g>
            </g>
            <path d="M84 146q26 13 52 0" fill="none" stroke={k.collar} strokeWidth="10" strokeLinecap="round" />
            <circle cx="110" cy="154" r="6.5" fill="#F7D46B" />
            <g className="mcat__head">
              <g className="mcat__ear mcat__ear--l"><path d="M52 74c-8-26-6-48 4-56 12 6 30 22 40 38z" fill={`url(#f${uid})`} stroke={k.line} strokeWidth="2.5" /><path d="M60 62c-4-16-3-28 2-34 7 5 17 14 23 24z" fill="#F7C9D8" /></g>
              <g className="mcat__ear mcat__ear--r"><path d="M168 74c8-26 6-48-4-56-12 6-30 22-40 38z" fill={`url(#f${uid})`} stroke={k.line} strokeWidth="2.5" /><path d="M160 62c4-16 3-28-2-34-7 5-17 14-23 24z" fill="#F7C9D8" /></g>
              <ellipse cx="110" cy="94" rx="66" ry="56" fill={`url(#f${uid})`} stroke={k.line} strokeWidth="2.5" />
              {skin === 'peach' && <g className="mcat__bow"><path d="M150 36c-14-14-30-8-26 6 3 10 20 8 26-6zm0 0c14-14 30-8 26 6-3 10-20 8-26-6z" fill="#F4A6C1" stroke="#D97C9E" strokeWidth="2" /><circle cx="150" cy="36" r="6" fill="#E98DAF" /></g>}
              <g className="mcat__face">
                {closed ? (
                  <g fill="none" stroke="#1B2140" strokeWidth="4" strokeLinecap="round">
                    <path d={pose === 'love' ? 'M76 96q10-11 20 0' : 'M76 98q10 7 20 0'} />
                    <path d={pose === 'love' ? 'M124 96q10-11 20 0' : 'M124 98q10 7 20 0'} />
                  </g>
                ) : (
                  <g className="mcat__eyes">
                    <ellipse cx="86" cy="96" rx="11" ry="13.5" fill={`url(#e${uid})`} />
                    <ellipse cx="134" cy="96" rx="11" ry="13.5" fill={`url(#e${uid})`} />
                    <g className="mcat__glint"><circle cx="90" cy="90" r="4.2" fill="#FFFFFF" /><circle cx="138" cy="90" r="4.2" fill="#FFFFFF" /><circle cx="83" cy="102" r="1.8" fill="#FFFFFF" opacity=".8" /><circle cx="131" cy="102" r="1.8" fill="#FFFFFF" opacity=".8" /></g>
                  </g>
                )}
                <ellipse cx="66" cy="114" rx="11" ry="7" fill="#F7B8CE" opacity=".55" />
                <ellipse cx="154" cy="114" rx="11" ry="7" fill="#F7B8CE" opacity=".55" />
                <path d="M105 110q5-3 10 0q-2 5-5 6q-3-1-5-6z" fill="#E98DAF" />
                <path d="M101 120q4.5 4 9 0q4.5 4 9 0" fill="none" stroke="#3A4378" strokeWidth="2.6" strokeLinecap="round" />
                <g stroke="#C3CBEA" strokeWidth="2" strokeLinecap="round"><path d="M44 106l18 3M46 118l17-2" /><path d="M176 106l-18 3M174 118l-17-2" /></g>
              </g>
            </g>
            <g className="mcat__fx mcat__fx--stars" fill="#F7D46B"><path d="M34 44l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" /><path d="M186 32l3 7 7 1-5 4 1 7-6-4-6 4 1-7-5-4 7-1z" /></g>
            <path className="mcat__fx mcat__fx--heart" d="M110 28c-6-12-24-8-22 6 2 10 22 22 22 22s20-12 22-22c2-14-16-18-22-6z" fill="#F4A6C1" />
            <text className="mcat__fx mcat__fx--z" x="160" y="40" fill="#7B73D9" fontSize="22" fontWeight="800">z z</text>
          </g>
        </svg>
      </button>
    </div>
  );
}
