'use client';
// Міні-гра для сторінки 404: котик біжить і перестрибує огірки, книжки й калюжі.
// Керування: пробіл / стрілка вгору / тап. Тексти гри англійською (правило ігор Murly).
import { useEffect, useRef, useState } from 'react';

const HEAD = new Path2D('M5.9 9.3c-.4-1.9-.6-3.6-.5-5 1.6.8 3.1 1.7 4.5 2.7 1.4-.3 2.8-.3 4.2 0 1.4-1 2.9-1.9 4.5-2.7.1 1.4-.1 3.1-.5 5 1.2 1.4 1.9 3.1 1.8 4.9-.2 3.4-3.4 5.9-7.9 5.9-4.5 0-7.7-2.5-7.9-5.9-.1-1.8.6-3.5 1.8-4.9z');
const W = 720, H = 220, GROUND = 182;
const INK = '#1A1A1A', LIME = '#D0F834', TOMATO = '#D83A1E', SKY = '#B9DBE9', PAPER = '#F4EFE3';
type Ob = { x: number; kind: 'cucumber' | 'books' | 'puddle' | 'bird'; w: number; h: number; y: number };
const WORDS = ['Oops!', 'Meow!', 'Try again!', 'So close!', 'Purr-fect try!', 'Not today, cucumber!'];

export default function CatRunner() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<'idle' | 'run' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const g = useRef({ y: 0, vy: 0, obs: [] as Ob[], speed: 5, t: 0, next: 60, score: 0, word: WORDS[0] });

  useEffect(() => {
    try { setBest(Number(localStorage.getItem('murly-runner-best') || 0)); } catch { /* немає сховища */ }
  }, []);

  const jump = () => {
    if (state !== 'run') {
      g.current = { y: 0, vy: 0, obs: [], speed: 5, t: 0, next: 60, score: 0, word: WORDS[0] };
      setScore(0);
      setState('run');
      return;
    }
    if (g.current.y === 0) g.current.vy = 11.5;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    let raf = 0;

    const cat = (x: number, y: number, t: number, dead: boolean) => {
      ctx.save(); ctx.translate(x, GROUND - y); ctx.scale(1.3, 1.3);
      ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = INK;
      // хвіст
      ctx.beginPath(); ctx.moveTo(-22, -22); ctx.quadraticCurveTo(-40, -30 + Math.sin(t / 4) * 6, -36, -48); ctx.stroke();
      // лапки
      const k = y > 0 ? 0 : Math.sin(t / 2.5) * 6;
      ctx.fillStyle = '#fff';
      for (const [lx, ph] of [[-14, k], [12, -k]] as const) { ctx.beginPath(); ctx.ellipse(lx + ph, -4, 6, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
      // тіло
      ctx.beginPath(); ctx.ellipse(0, -20, 26, 16, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // голова з контуру іконки c-cat
      ctx.save(); ctx.translate(8, -62); ctx.scale(2.1, 2.1); ctx.lineWidth = 3 / 2.1;
      ctx.fillStyle = '#fff'; ctx.fill(HEAD); ctx.stroke(HEAD);
      ctx.fillStyle = INK;
      if (dead) {
        ctx.lineWidth = 1.2 / 2.1 * 2;
        for (const ex of [9.3, 14.7]) { ctx.beginPath(); ctx.moveTo(ex - 1, 12.2); ctx.lineTo(ex + 1, 14.2); ctx.moveTo(ex + 1, 12.2); ctx.lineTo(ex - 1, 14.2); ctx.stroke(); }
      } else {
        for (const ex of [9.3, 14.7]) { ctx.beginPath(); ctx.arc(ex + 0.4, 13.2, 1.05, 0, Math.PI * 2); ctx.fill(); }
      }
      ctx.fillStyle = TOMATO; ctx.globalAlpha = 0.3;
      for (const cx of [7.4, 16.6]) { ctx.beginPath(); ctx.arc(cx, 15.4, 0.95, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1; ctx.fillStyle = INK;
      ctx.beginPath(); ctx.arc(12, 15.1, 0.8, 0, Math.PI * 2); ctx.fill();
      ctx.restore(); ctx.restore();
    };

    const drawOb = (o: Ob) => {
      ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      if (o.kind === 'cucumber') {
        ctx.fillStyle = '#7BC96F'; ctx.beginPath(); ctx.roundRect(o.x, GROUND - o.h, o.w, o.h, 9); ctx.fill(); ctx.stroke();
        ctx.fillStyle = INK; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(o.x + 6 + (i % 2) * 6, GROUND - o.h + 10 + i * 10, 1.4, 0, Math.PI * 2); ctx.fill(); }
      } else if (o.kind === 'books') {
        const cols = [TOMATO, LIME, SKY]; const bh = o.h / 3;
        cols.forEach((col, i) => { ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(o.x + (i % 2) * 4, GROUND - bh * (i + 1), o.w - 4, bh, 3); ctx.fill(); ctx.stroke(); });
      } else if (o.kind === 'puddle') {
        ctx.fillStyle = SKY; ctx.beginPath(); ctx.ellipse(o.x + o.w / 2, GROUND - 3, o.w / 2, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      } else {
        // голуб: летить на висоті, під ним можна пробігти, якщо не стрибати
        const y = GROUND - o.y; ctx.fillStyle = '#CFCFD6';
        ctx.beginPath(); ctx.ellipse(o.x + 16, y, 16, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        const f = Math.sin(g.current.t / 3) * 10;
        ctx.beginPath(); ctx.moveTo(o.x + 10, y - 4); ctx.quadraticCurveTo(o.x + 18, y - 18 - f, o.x + 26, y - 4); ctx.stroke();
        ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(o.x + 4, y - 3, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    };

    const scene = (dead: boolean) => {
      const s = g.current;
      ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = INK; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, GROUND + 1); ctx.lineTo(W, GROUND + 1); ctx.stroke();
      ctx.fillStyle = '#C9C2B2';
      for (let i = 0; i < 14; i++) { const x = ((i * 67 - s.t * s.speed * 0.9) % W + W) % W; ctx.fillRect(x, GROUND + 10 + (i % 3) * 7, 10 + (i % 4) * 4, 2); }
      s.obs.forEach(drawOb);
      cat(110, s.y, s.t, dead);
      ctx.fillStyle = INK; ctx.font = '700 16px "General Sans", system-ui, sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(`Score ${String(Math.floor(s.score)).padStart(5, '0')}`, W - 16, 28);
    };

    const loop = () => {
      const s = g.current;
      s.t++; s.score += s.speed / 6; s.speed = Math.min(13, 5 + s.score / 260);
      s.vy -= 0.62; s.y = Math.max(0, s.y + s.vy); if (s.y === 0) s.vy = 0;
      s.obs.forEach((o) => { o.x -= s.speed; }); s.obs = s.obs.filter((o) => o.x > -60);
      if (--s.next <= 0) {
        const r = Math.random();
        const o: Ob = s.score > 300 && r < 0.18 ? { x: W + 10, kind: 'bird', w: 32, h: 20, y: 86 }
          : r < 0.5 ? { x: W + 10, kind: 'cucumber', w: 20, h: 34 + Math.random() * 16, y: 0 }
          : r < 0.8 ? { x: W + 10, kind: 'books', w: 34, h: 30 + Math.random() * 12, y: 0 }
          : { x: W + 10, kind: 'puddle', w: 46, h: 8, y: 0 };
        s.obs.push(o);
        s.next = 48 + Math.random() * 60 - s.speed * 2;
      }
      // зіткнення: прямокутник кота проти перешкоди
      const cx1 = 80, cx2 = 140, cy1 = GROUND - s.y - 52, cy2 = GROUND - s.y;
      const hit = s.obs.some((o) => {
        const top = o.kind === 'bird' ? GROUND - o.y - 10 : GROUND - o.h;
        const bot = o.kind === 'bird' ? GROUND - o.y + 10 : GROUND;
        return cx2 > o.x + 4 && cx1 < o.x + o.w - 4 && cy2 > top + 3 && cy1 < bot;
      });
      if (hit) {
        s.word = WORDS[Math.floor(Math.random() * WORDS.length)];
        scene(true); setScore(Math.floor(s.score));
        setBest((b) => { const nb = Math.max(b, Math.floor(s.score)); try { localStorage.setItem('murly-runner-best', String(nb)); } catch { /* немає сховища */ } return nb; });
        setState('over'); return;
      }
      scene(false); raf = requestAnimationFrame(loop);
    };

    if (state === 'run') raf = requestAnimationFrame(loop);
    else scene(state === 'over');
    return () => cancelAnimationFrame(raf);
  }, [state]);

  return (
    <div className="runner">
      <canvas ref={ref} onPointerDown={jump} aria-label="Cat runner game: press space or tap to jump" role="img" />
      {state !== 'run' && (
        <button className="runner__msg" onClick={jump}>
          {state === 'over' ? <><b>{g.current.word}</b><span>Score {score} · Best {best}</span><span className="runner__go">Tap or press Space to play again</span></>
            : <><b>Help the cat run!</b><span>Jump over cucumbers, books and puddles. Watch out for pigeons.</span><span className="runner__go">Tap or press Space to start</span></>}
        </button>
      )}
    </div>
  );
}
