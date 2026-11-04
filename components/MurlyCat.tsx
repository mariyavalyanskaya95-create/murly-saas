'use client';
// Живий котик Murly: очі стежать за мишкою, кліпає, махає хвостом.
// Клік по котику міняє позу: махає лапкою, пише олівцем, стрибає із зірочками, сердечко, спить.
// Малюнок наш, без сторонніх персонажів. Ідея інтерактивного персонажа з Rive, зроблено на SVG + CSS.
import { useEffect, useRef, useState } from 'react';
import { useT } from './LangProvider';

const POSES = ['wave', 'pencil', 'jump', 'love', 'sleep'] as const;
type Pose = (typeof POSES)[number] | 'idle';
const SAY: Record<Pose, string> = { idle: '', wave: 'Hi! I’m Murly!', pencil: 'Let’s learn!', jump: 'Great job!', love: 'I love English!', sleep: 'Zzz… five more minutes' };

export default function MurlyCat({ className = '' }: { className?: string }) {
  const t = useT();
  const ref = useRef<SVGSVGElement>(null);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [pose, setPose] = useState<Pose>('idle');
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0; let last: MouseEvent | null = null;
    const upd = () => {
      raf = 0; const el = ref.current; if (!el || !last) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2; const cy = r.top + r.height * 0.42;
      const dx = last.clientX - cx; const dy = last.clientY - cy; const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260) * 4.5;
      setEye({ x: (dx / d) * k, y: (dy / d) * k });
    };
    const on = (e: MouseEvent) => { last = e; if (!raf) raf = requestAnimationFrame(upd); };
    window.addEventListener('mousemove', on, { passive: true });
    return () => { window.removeEventListener('mousemove', on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    if (pose === 'idle') return;
    const id = setTimeout(() => setPose('idle'), pose === 'sleep' ? 4200 : 2600);
    return () => clearTimeout(id);
  }, [pose, n]);
  const next = () => { const p = POSES[n % POSES.length]; setPose(p); setN(n + 1); };
  const closed = pose === 'love' || pose === 'sleep';
  return (
    <div className={`mcat mcat--${pose} ${className}`}>
      {pose !== 'idle' && <span className="mcat__say" role="status">{SAY[pose]}</span>}
      <button type="button" className="mcat__btn" onClick={next} aria-label={t({ uk: 'Погладити котика Murly', ru: 'Погладить котика Murly', en: 'Pet Murly the cat' })}>
        <svg ref={ref} viewBox="0 0 200 230" aria-hidden="true">
          <g className="mcat__all">
            <path className="mcat__tail" d="M140 196c26 4 44-10 42-34-1-12-10-20-18-16" fill="none" stroke="#1B2140" strokeWidth="12" strokeLinecap="round" />
            <path className="mcat__tail" d="M140 196c26 4 44-10 42-34-1-12-10-20-18-16" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="100" cy="176" rx="50" ry="42" fill="#FFFFFF" stroke="#1B2140" strokeWidth="4" />
            <ellipse cx="100" cy="186" rx="26" ry="22" fill="#E2E8FA" />
            <ellipse cx="78" cy="216" rx="15" ry="9" fill="#FFFFFF" stroke="#1B2140" strokeWidth="4" />
            <ellipse cx="122" cy="216" rx="15" ry="9" fill="#FFFFFF" stroke="#1B2140" strokeWidth="4" />
            <path d="M60 160c-14-4-22 4-20 14 2 9 12 12 20 8" fill="#FFFFFF" stroke="#1B2140" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <g className="mcat__arm">
              <path d="M140 160c14-4 22 4 20 14-2 9-12 12-20 8" fill="#FFFFFF" stroke="#1B2140" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <g className="mcat__pencil">
                <rect x="150" y="128" width="9" height="40" rx="2" transform="rotate(20 154 148)" fill="#F4C0D1" stroke="#1B2140" strokeWidth="3" />
                <path d="M161 170l-3 10-5-8z" transform="rotate(20 154 148)" fill="#1B2140" />
              </g>
            </g>
            <path d="M78 138q22 12 44 0" fill="none" stroke="#AFC3F0" strokeWidth="9" strokeLinecap="round" />
            <circle cx="100" cy="146" r="6" fill="#F2C94C" stroke="#1B2140" strokeWidth="2.5" />
            <g className="mcat__head">
              <path d="M52 64L46 18l38 24z" fill="#FFFFFF" stroke="#1B2140" strokeWidth="4" strokeLinejoin="round" className="mcat__ear mcat__ear--l" />
              <path d="M56 54l-2-24 20 14z" fill="#F4C0D1" />
              <path d="M148 64l6-46-38 24z" fill="#FFFFFF" stroke="#1B2140" strokeWidth="4" strokeLinejoin="round" className="mcat__ear mcat__ear--r" />
              <path d="M144 54l2-24-20 14z" fill="#F4C0D1" />
              <ellipse cx="100" cy="88" rx="60" ry="50" fill="#FFFFFF" stroke="#1B2140" strokeWidth="4" />
              {closed ? (
                <g fill="none" stroke="#1B2140" strokeWidth="4" strokeLinecap="round">
                  <path d={pose === 'love' ? 'M70 90q8-10 16 0' : 'M70 92q8 6 16 0'} />
                  <path d={pose === 'love' ? 'M114 90q8-10 16 0' : 'M114 92q8 6 16 0'} />
                </g>
              ) : (
                <g className="mcat__eyes">
                  <g transform={`translate(${eye.x} ${eye.y})`}>
                    <ellipse cx="78" cy="88" rx="8" ry="10" fill="#1B2140" />
                    <ellipse cx="122" cy="88" rx="8" ry="10" fill="#1B2140" />
                    <circle cx="80.5" cy="84" r="3" fill="#FFFFFF" />
                    <circle cx="124.5" cy="84" r="3" fill="#FFFFFF" />
                  </g>
                </g>
              )}
              <ellipse cx="62" cy="106" rx="9" ry="6" fill="#F4C0D1" opacity=".8" />
              <ellipse cx="138" cy="106" rx="9" ry="6" fill="#F4C0D1" opacity=".8" />
              <path d="M95 102h10l-5 6z" fill="#E58FB0" stroke="#1B2140" strokeWidth="2" strokeLinejoin="round" />
              <path d="M90 112q5 6 10 0q5 6 10 0" fill="none" stroke="#1B2140" strokeWidth="3" strokeLinecap="round" />
              <g stroke="#1B2140" strokeWidth="2.5" strokeLinecap="round">
                <path d="M40 100l18 2M42 112l17-3" /><path d="M160 100l-18 2M158 112l-17-3" />
              </g>
            </g>
            <g className="mcat__fx mcat__fx--stars" fill="#F2C94C" stroke="#1B2140" strokeWidth="2">
              <path d="M30 40l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" />
              <path d="M170 30l3 7 7 1-5 4 1 7-6-4-6 4 1-7-5-4 7-1z" />
            </g>
            <path className="mcat__fx mcat__fx--heart" d="M100 30c-6-12-24-8-22 6 2 10 22 22 22 22s20-12 22-22c2-14-16-18-22-6z" fill="#F4C0D1" stroke="#1B2140" strokeWidth="3" />
            <text className="mcat__fx mcat__fx--z" x="150" y="40" fill="#534AB7" fontSize="22" fontWeight="800">z z</text>
          </g>
        </svg>
      </button>
    </div>
  );
}
