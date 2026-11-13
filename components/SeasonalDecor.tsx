'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useT } from '@/components/LangProvider';

// Сезонна прикраса сайту: восени падає листя, взимку сніг, на День святого Валентина сердечка, навесні пелюстки.
// Легка анімація на canvas, не заважає клікам, вимикається кнопкою (запам'ятовуємо), поважає «менше руху».
type Kind = 'snow' | 'leaves' | 'hearts' | 'petals';
const KEY = 'murly:decor-off';

export function seasonNow(d = new Date()): Kind | null {
  const m = d.getMonth() + 1, day = d.getDate();
  if (m === 12 || (m === 1) || (m === 2 && day <= 1)) return 'snow';
  if (m === 2 && day <= 15) return 'hearts';
  if (m === 2) return 'snow';
  if ((m === 4) || (m === 5 && day <= 20)) return 'petals';
  if ((m === 9 && day >= 15) || m === 10 || m === 11) return 'leaves';
  return null;
}

// Котик Murly іноді визирає з кутка й каже щось миле й підбадьорливе
type L3 = { uk: string; ru: string; en: string };
const PHRASES: L3[] = [
  { uk: 'Ти сьогодні молодець!', ru: 'Ты сегодня молодец!', en: 'You are doing great today!' },
  { uk: 'Маленький крок щодня, і англійська твоя.', ru: 'Маленький шаг каждый день, и английский твой.', en: 'A small step every day, and English is yours.' },
  { uk: 'Помилки теж навчають. Мур!', ru: 'Ошибки тоже учат. Мур!', en: 'Mistakes teach us too. Purr!' },
  { uk: 'Я в тебе вірю!', ru: 'Я в тебя верю!', en: 'I believe in you!' },
  { uk: 'Ще 5 хвилин англійської? Мяу!', ru: 'Ещё 5 минут английского? Мяу!', en: 'Five more minutes of English? Meow!' },
  { uk: 'Кожне нове слово робить тебе сильнішим.', ru: 'Каждое новое слово делает тебя сильнее.', en: 'Every new word makes you stronger.' },
  { uk: 'Пишаюся тобою!', ru: 'Горжусь тобой!', en: 'So proud of you!' },
  { uk: 'Зроби паузу, випий чаю і вперед!', ru: 'Сделай паузу, выпей чаю и вперёд!', en: 'Take a tea break, then let us go on!' },
  { uk: 'У тебе вже виходить краще, ніж учора.', ru: 'У тебя уже получается лучше, чем вчера.', en: 'You are already better than yesterday.' },
  { uk: 'Мур-мур, ти справжня зірка!', ru: 'Мур-мур, ты настоящая звезда!', en: 'Purr, you are a real star!' },
];
const SEASON_PHRASE: Record<Kind, L3> = {
  snow: { uk: 'Тепла тобі і нових слів!', ru: 'Тепла тебе и новых слов!', en: 'Stay cosy and learn new words!' },
  leaves: { uk: 'Затишної осені й легких уроків!', ru: 'Уютной осени и лёгких уроков!', en: 'Cosy autumn and easy lessons!' },
  hearts: { uk: 'Обіймаю лапками! Ти чудовий.', ru: 'Обнимаю лапками! Ты чудесный.', en: 'Paw hugs! You are wonderful.' },
  petals: { uk: 'Весна, сонечко і нові слова!', ru: 'Весна, солнышко и новые слова!', en: 'Spring, sunshine and new words!' },
};
const CAT_ART: Record<Kind, string> = { snow: 'sledding', leaves: 'autumn', hearts: 'waving', petals: 'spring' };
const BUDDY_KEY = 'murly:buddy-at';

function Buddy({ kind, t }: { kind: Kind | null; t: (x: L3) => string }) {
  const [say, setSay] = useState<L3 | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let last = 0; try { last = Number(localStorage.getItem(BUDDY_KEY) || 0); } catch { /* */ }
    // не частіше ніж раз на 4 хвилини, перший раз через 6 секунд на сторінці
    const wait = Math.max(6000, last + 4 * 60000 - Date.now());
    const pick = () => (kind && Math.random() < 0.3 ? SEASON_PHRASE[kind] : PHRASES[Math.floor(Math.random() * PHRASES.length)]);
    let hide = 0;
    const pop = () => { setSay(pick()); setShow(true); try { localStorage.setItem(BUDDY_KEY, String(Date.now())); } catch { /* */ } hide = window.setTimeout(() => setShow(false), 7000); };
    const first = window.setTimeout(pop, wait);
    const every = window.setInterval(() => { if (!document.hidden) pop(); }, 4 * 60000 + 1000);
    return () => { clearTimeout(first); clearTimeout(hide); clearInterval(every); };
  }, [kind]);
  if (!say) return null;
  return (
    <div className={`mu-buddy${show ? ' is-on' : ''}`} aria-live="polite" onClick={() => setShow(false)}>
      <div className="mu-buddy__say">{t(say)}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/game-lessons/art/cats/${kind ? CAT_ART[kind] : 'waving'}.svg`} alt="" width={96} height={96} />
    </div>
  );
}

const SKIP = /^\/(room|board|play|worlds|games\/|lesson-room|teacher\/board)/;
const PAL: Record<Kind, string[]> = {
  snow: ['#FFFFFF', '#DCE5FB', '#C5D3F6'],
  leaves: ['#E8A04A', '#D9773B', '#C9572F', '#E7C25A', '#B9763E'],
  hearts: ['#F4C0D1', '#EE9DB8', '#E7799E', '#F8D6E2'],
  petals: ['#F8D6E2', '#F4C0D1', '#FFFFFF', '#F1E2F7'],
};

type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; va: number; ph: number; c: string };

function draw(ctx: CanvasRenderingContext2D, k: Kind, p: P) {
  ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.strokeStyle = p.c;
  const r = p.r;
  if (k === 'snow') {
    ctx.globalAlpha = 0.95; ctx.lineWidth = Math.max(1, r / 5); ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(80,100,170,.35)'; ctx.shadowBlur = 2;
    for (let i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, r);
      ctx.moveTo(0, r * 0.55); ctx.lineTo(r * 0.25, r * 0.75); ctx.moveTo(0, r * 0.55); ctx.lineTo(-r * 0.25, r * 0.75); ctx.stroke();
    }
  } else if (k === 'leaves') {
    ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(r * 0.9, -r * 0.2, 0, r); ctx.quadraticCurveTo(-r * 0.9, -r * 0.2, 0, -r); ctx.fill();
    ctx.strokeStyle = 'rgba(90,50,20,.45)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -r * 0.8); ctx.lineTo(0, r * 1.25); ctx.stroke();
  } else if (k === 'hearts') {
    ctx.globalAlpha = 0.9; const s = r / 10; ctx.scale(s, s); ctx.beginPath();
    ctx.moveTo(0, 4); ctx.bezierCurveTo(-10, -4, -6, -12, 0, -6); ctx.bezierCurveTo(6, -12, 10, -4, 0, 4); ctx.fill();
  } else {
    ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.ellipse(0, 0, r * 0.55, r, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

export default function SeasonalDecor() {
  const t = useT();
  const path = usePathname() || '/';
  const ref = useRef<HTMLCanvasElement>(null);
  const [kind, setKind] = useState<Kind | null>(null);
  const [off, setOff] = useState(true);

  useEffect(() => {
    let k = seasonNow();
    try {
      const q = new URLSearchParams(location.search).get('decor');
      if (q === 'snow' || q === 'leaves' || q === 'hearts' || q === 'petals') k = q;
      setOff(localStorage.getItem(KEY) === '1' && !q);
    } catch { setOff(false); }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) k = null;
    if (document.documentElement.classList.contains('is-embed')) k = null;
    setKind(k);
  }, []);

  const active = kind && !off && !SKIP.test(path);

  useEffect(() => {
    if (!active || !kind) return;
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    let w = 0, h = 0, raf = 0, last = performance.now();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = () => { w = window.innerWidth; h = window.innerHeight; cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    const n = Math.round(Math.min(34, Math.max(14, w / 45)));
    const pal = PAL[kind];
    const make = (top: boolean): P => {
      const r = kind === 'snow' ? 4 + Math.random() * 6 : kind === 'hearts' ? 7 + Math.random() * 7 : 7 + Math.random() * 8;
      return { x: Math.random() * w, y: top ? -20 - Math.random() * h * 0.3 : Math.random() * h, r, vy: (kind === 'snow' ? 18 : 22) + Math.random() * 26, vx: (Math.random() - 0.5) * 10, a: Math.random() * 6.28, va: (Math.random() - 0.5) * (kind === 'snow' ? 0.6 : 1.6), ph: Math.random() * 6.28, c: pal[Math.floor(Math.random() * pal.length)] };
    };
    const ps: P[] = Array.from({ length: n }, () => make(false));
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.ph += dt * 1.3; p.y += p.vy * dt; p.x += (p.vx + Math.sin(p.ph) * (kind === 'leaves' ? 26 : 14)) * dt; p.a += p.va * dt;
        if (p.y > h + 24 || p.x < -40 || p.x > w + 40) ps[i] = make(true);
        draw(ctx, kind, ps[i]);
      }
      raf = requestAnimationFrame(step);
    };
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(step); } };
    raf = requestAnimationFrame(step);
    window.addEventListener('resize', size); document.addEventListener('visibilitychange', vis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); document.removeEventListener('visibilitychange', vis); };
  }, [active, kind]);

  if (SKIP.test(path)) return null;
  if (!kind) return off ? null : <Buddy kind={null} t={t} />;
  const name = kind === 'snow' ? t({ uk: 'сніг', ru: 'снег', en: 'snow' }) : kind === 'leaves' ? t({ uk: 'листопад', ru: 'листопад', en: 'falling leaves' }) : kind === 'hearts' ? t({ uk: 'сердечка', ru: 'сердечки', en: 'hearts' }) : t({ uk: 'пелюстки', ru: 'лепестки', en: 'petals' });
  const toggle = () => { const v = !off; setOff(v); try { localStorage.setItem(KEY, v ? '1' : '0'); } catch { /* */ } };
  return (
    <>
      {active && <canvas ref={ref} aria-hidden="true" className="mu-decor" />}
      {!off && <Buddy kind={kind} t={t} />}
      <button type="button" className="mu-decor-btn" onClick={toggle} aria-pressed={!off}
        title={off ? t({ uk: `Увімкнути ${name}`, ru: `Включить ${name}`, en: `Turn on ${name}` }) : t({ uk: `Вимкнути ${name}`, ru: `Выключить ${name}`, en: `Turn off ${name}` })}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {kind === 'snow' && <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M12 6l-2-2M12 6l2-2M12 18l-2 2M12 18l2 2" />}
          {kind === 'leaves' && <><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" /><path d="M5 19L14 10" /></>}
          {kind === 'hearts' && <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />}
          {kind === 'petals' && <><circle cx="12" cy="12" r="2.2" /><path d="M12 9.8c-1.6-3.5 1.6-5.3 0-6.8-1.6 1.5 1.6 3.3 0 6.8zM12 14.2c1.6 3.5-1.6 5.3 0 6.8 1.6-1.5-1.6-3.3 0-6.8z" /></>}
          {off && <path d="M4 4l16 16" />}
        </svg>
      </button>
    </>
  );
}
