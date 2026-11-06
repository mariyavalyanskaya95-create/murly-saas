'use client';
// Гра «Stop & Go with Murly»: дитяча версія «зелене світло / червоне світло» з нашим котиком.
// Зелене світло: Murly стоїть спиною, дитина слухає слово чи команду, тисне картку й іде доріжкою.
// Червоне світло: Murly обертається, треба завмерти; будь-яке натискання = «Oops, you moved!» і два кроки назад.
// Без вибування й страшилок: лише лагідні підказки, зірочки і святковий фінал. Малюнки наші (SVG).
import { useCallback, useEffect, useRef, useState } from 'react';
import { useT } from '@/components/LangProvider';
import KidPic from '@/components/level/KidPic';
import { say, stopSpeak } from '@/lib/speak';
import s from './StopGo.module.css';

const INK = '#1B2140';
const LAV = '#AFC3F0';
const PINK = '#F4C0D1';
const VIOLET = '#534AB7';
const OK = '#CDEBC0';

type Tr = { uk: string; ru: string; en: string };
type Act = 'walk' | 'run' | 'hop' | 'jump' | 'tiptoe' | 'slow' | 'crawl' | 'spin';
type Pic = { k: 'kid'; id: string } | { k: 'balloon'; c: string } | { k: 'stars'; n: number } | { k: 'act'; a: Act };
type Item = { key: string; en: string; voice: string; tr: Tr; pic: Pic; group: 'animal' | 'colour' | 'number' | 'action'; act?: Act };

// ---------- слова ----------
const animal = (id: string, uk: string, ru: string): Item => ({ key: id, en: id, voice: id, tr: { uk, ru, en: id }, pic: { k: 'kid', id }, group: 'animal' });
const colour = (en: string, c: string, uk: string, ru: string): Item => ({ key: en, en, voice: en, tr: { uk, ru, en }, pic: { k: 'balloon', c }, group: 'colour' });
const num = (n: number, en: string, uk: string, ru: string): Item => ({ key: en, en, voice: en, tr: { uk, ru, en }, pic: { k: 'stars', n }, group: 'number' });
const action = (a: Act, en: string, uk: string, ru: string): Item => ({ key: a, en, voice: `${en}!`, tr: { uk, ru, en }, pic: { k: 'act', a }, group: 'action', act: a });

const ANIMALS = [animal('cat', 'кіт', 'кот'), animal('dog', 'пес', 'собака'), animal('fish', 'рибка', 'рыбка'), animal('bird', 'пташка', 'птичка'), animal('frog', 'жабка', 'лягушка')];
const COLOURS = [
  colour('red', '#E8606A', 'червоний', 'красный'), colour('blue', '#5F86E3', 'синій', 'синий'), colour('green', '#62B872', 'зелений', 'зелёный'),
  colour('yellow', '#F7D46B', 'жовтий', 'жёлтый'), colour('pink', '#F4A6C1', 'рожевий', 'розовый'), colour('purple', '#8E7CD9', 'фіолетовий', 'фиолетовый'),
];
const NUMBERS = [num(1, 'one', 'один', 'один'), num(2, 'two', 'два', 'два'), num(3, 'three', 'три', 'три'), num(4, 'four', 'чотири', 'четыре'), num(5, 'five', "п'ять", 'пять'), num(6, 'six', 'шість', 'шесть')];
const ACTIONS: Record<Act, Item> = {
  walk: action('walk', 'Walk', 'іди', 'иди'),
  run: action('run', 'Run', 'біжи', 'беги'),
  hop: action('hop', 'Hop', 'скачи на одній нозі', 'прыгай на одной ноге'),
  jump: action('jump', 'Jump', 'стрибай', 'прыгай'),
  tiptoe: action('tiptoe', 'Tiptoe', 'йди навшпиньки', 'иди на цыпочках'),
  slow: action('slow', 'Walk slowly', 'іди повільно', 'иди медленно'),
  crawl: action('crawl', 'Crawl', 'повзи', 'ползи'),
  spin: action('spin', 'Spin', 'покрутись', 'покрутись'),
};

type Level = { title: string; name: Tr; steps: number; opts: number; green: [number, number]; red: [number, number]; turn: number; pool: Item[]; acts: number };
const LEVELS: Level[] = [
  { title: 'Animals', name: { uk: 'Тварини', ru: 'Животные', en: 'Animals' }, steps: 8, opts: 3, green: [5200, 8000], red: [2700, 3600], turn: 1000, pool: [...ANIMALS, ACTIONS.walk, ACTIONS.jump], acts: 0.25 },
  { title: 'Colours and numbers', name: { uk: 'Кольори й числа', ru: 'Цвета и числа', en: 'Colours and numbers' }, steps: 9, opts: 3, green: [4500, 7000], red: [2400, 3300], turn: 900, pool: [...COLOURS, ...NUMBERS, ACTIONS.hop, ACTIONS.run, ACTIONS.tiptoe], acts: 0.25 },
  { title: 'Actions', name: { uk: 'Дії', ru: 'Действия', en: 'Actions' }, steps: 10, opts: 4, green: [3900, 6000], red: [2200, 3100], turn: 800, pool: Object.values(ACTIONS), acts: 1 },
];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const shuffle = <T,>(a: T[]) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

type Task = { target: Item; options: Item[] };
function makeTask(lv: Level, prev?: Item): Task {
  const acts = lv.pool.filter((i) => i.group === 'action');
  const words = lv.pool.filter((i) => i.group !== 'action');
  const src = words.length && Math.random() >= lv.acts ? words : acts;
  const target = pick(src.filter((i) => i.key !== prev?.key));
  // картки-відволікачі з тієї ж групи (тварина з тваринами, колір з кольорами)
  const same = lv.pool.filter((i) => i.group === target.group && i.key !== target.key);
  const others = lv.pool.filter((i) => i.group !== target.group);
  const fill = shuffle(same).concat(shuffle(others)).slice(0, lv.opts - 1);
  return { target, options: shuffle([target, ...fill]) };
}

const PRAISE = ['Great!', 'Yes!', 'Super!', 'Well done!', 'Good job!', 'Purr-fect!'];

// ---------- малюнки ----------
const starD = (cx: number, cy: number, R: number) => {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const a = ((-90 + 36 * i) * Math.PI) / 180; const r = i % 2 ? R * 0.48 : R;
    d += `${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  }
  return `${d}Z`;
};

function Paw({ x, y, sc = 1, r = 0, fill = LAV }: { x: number; y: number; sc?: number; r?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${sc})`} fill={fill} stroke={INK} strokeWidth={2.4 / sc}>
      <ellipse cx="0" cy="4" rx="8.5" ry="7.5" />
      <circle cx="-9" cy="-6" r="3.6" /><circle cx="-3.4" cy="-11.5" r="3.6" /><circle cx="3.4" cy="-11.5" r="3.6" /><circle cx="9" cy="-6" r="3.6" />
    </g>
  );
}

function ActPic({ a }: { a: Act }) {
  const line = { fill: 'none', stroke: INK, strokeWidth: 2.6, strokeLinecap: 'round' as const };
  switch (a) {
    case 'walk':
      return <g><Paw x={38} y={78} r={-14} /><Paw x={62} y={54} r={10} /><Paw x={40} y={30} r={-14} /></g>;
    case 'run':
      return <g><path d="M8 44h20M4 58h26M10 72h18" {...line} stroke={LAV} strokeWidth={5} /><Paw x={52} y={72} r={28} fill={PINK} /><Paw x={82} y={36} r={28} fill={PINK} /></g>;
    case 'hop':
      return <g><path d="M26 66Q36 36 48 52M60 44Q70 14 82 28" {...line} strokeDasharray="4 6" /><Paw x={22} y={80} sc={0.78} /><Paw x={54} y={62} sc={0.78} /><Paw x={84} y={44} sc={0.78} /></g>;
    case 'jump':
      return <g><path d="M50 62V20M36 34l14-15 14 15" {...line} stroke={VIOLET} strokeWidth={5} strokeLinejoin="round" /><path d="M24 54q-7-12 0-24M76 54q7-12 0-24" {...line} /><Paw x={36} y={82} sc={0.78} /><Paw x={64} y={82} sc={0.78} /></g>;
    case 'tiptoe':
      return <g><Paw x={22} y={82} sc={0.42} /><Paw x={38} y={68} sc={0.42} /><Paw x={54} y={56} sc={0.42} /><Paw x={70} y={44} sc={0.42} /><Paw x={84} y={30} sc={0.42} /><path d="M24 30l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1z" fill="#F7D46B" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" /></g>;
    case 'slow':
      return (
        <g stroke={INK} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M12 80q0-7 9-7h48q8 0 11-10l2-6q2-6 8-6t7 7q0 17-12 24-7 4-16 4H18q-6 0-6-6z" fill="#FDEDE2" />
          <path d="M84 52l-4-16M92 53l4-15" fill="none" /><circle cx="80" cy="34" r="3.4" fill={INK} /><circle cx="96" cy="36" r="3.4" fill={INK} />
          <circle cx="89" cy="62" r="1.8" fill={INK} stroke="none" /><path d="M86 68q3 2 6 0" fill="none" />
          <circle cx="46" cy="50" r="24" fill={LAV} />
          <path d="M46 50m-3 0a3 3 0 1 1 6 0a8 8 0 1 1-15 0a13 13 0 1 1 25 0a17 17 0 0 1-2 8" fill="none" stroke={VIOLET} strokeWidth="3" />
        </g>
      );
    case 'crawl':
      return (
        <g stroke={INK} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M14 84v6M28 80v8M42 82v8M56 80v8" fill="none" />
          <circle cx="16" cy="74" r="10" fill="#9ED9A4" /><circle cx="30" cy="68" r="11" fill="#B6E4B0" /><circle cx="45" cy="72" r="11" fill="#9ED9A4" /><circle cx="59" cy="66" r="11" fill="#B6E4B0" />
          <path d="M70 42l-4-12M82 41l4-12" fill="none" /><circle cx="66" cy="29" r="3" fill={PINK} /><circle cx="86" cy="28" r="3" fill={PINK} />
          <circle cx="76" cy="56" r="15" fill="#B6E4B0" />
          <circle cx="71" cy="54" r="2.4" fill={INK} stroke="none" /><circle cx="81" cy="54" r="2.4" fill={INK} stroke="none" />
          <path d="M72 61q4 3 8 0" fill="none" /><ellipse cx="66" cy="60" rx="3" ry="2" fill={PINK} stroke="none" /><ellipse cx="86" cy="60" rx="3" ry="2" fill={PINK} stroke="none" />
        </g>
      );
    case 'spin':
      return <g><path d="M74 26A32 32 0 1 1 24 34" {...line} stroke={VIOLET} strokeWidth={5} /><path d="M13 35.5L26 30l2.7 14" {...line} stroke={VIOLET} strokeWidth={5} strokeLinejoin="round" /><Paw x={50} y={56} sc={0.95} fill={PINK} /></g>;
  }
}

function Balloon({ c }: { c: string }) {
  return (
    <g stroke={INK} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M50 72q-6 7 1 13t-2 12" fill="none" strokeWidth="2" />
      <path d="M45 74l5-6 5 6z" fill={c} />
      <ellipse cx="50" cy="40" rx="25" ry="29" fill={c} />
      <ellipse cx="40" cy="29" rx="5.5" ry="9" fill="#FFFFFF" opacity=".55" stroke="none" transform="rotate(-24 40 29)" />
    </g>
  );
}

const DICE: Record<number, [number, number][]> = {
  1: [[50, 50]], 2: [[30, 30], [70, 70]], 3: [[26, 26], [50, 50], [74, 74]], 4: [[30, 30], [70, 30], [30, 70], [70, 70]],
  5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]], 6: [[30, 22], [70, 22], [30, 50], [70, 50], [30, 78], [70, 78]],
};
function Stars({ n }: { n: number }) {
  return <g>{DICE[n].map(([x, y], i) => <path key={i} d={starD(x, y, n > 4 ? 12 : 14)} fill="#F7D46B" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />)}</g>;
}

export function CardPic({ pic }: { pic: Pic }) {
  if (pic.k === 'kid') return <KidPic id={pic.id} />;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {pic.k === 'balloon' && <Balloon c={pic.c} />}
      {pic.k === 'stars' && <Stars n={pic.n} />}
      {pic.k === 'act' && <ActPic a={pic.a} />}
    </svg>
  );
}

// Murly: спиною (зелене світло), обличчям (червоне світло) і радісний (фініш). viewBox 0 0 160 180
export type MurlyView = 'back' | 'front' | 'happy';
export function MurlyArt({ view }: { view: MurlyView }) {
  const st = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
  const body = 'M38 150c0-30 19-52 42-52s42 22 42 52c0 16-13 22-42 22s-42-6-42-22z';
  const earL = 'M38 54c-7-22-5-40 4-47 11 5 25 17 33 31z';
  const earR = 'M122 54c7-22 5-40-4-47-11 5-25 17-33 31z';
  const tube = (d: string, w = 14) => (<><path d={d} fill="none" stroke={INK} strokeWidth={w} strokeLinecap="round" /><path d={d} fill="none" stroke="#FFFFFF" strokeWidth={w - 6} strokeLinecap="round" /></>);
  if (view === 'back') {
    return (
      <g>
        <ellipse cx="80" cy="173" rx="50" ry="6" fill={INK} opacity=".12" />
        <ellipse cx="58" cy="169" rx="13" ry="6" fill="#FFFFFF" {...st} /><ellipse cx="102" cy="169" rx="13" ry="6" fill="#FFFFFF" {...st} />
        <path d={body} fill="#FFFFFF" {...st} />
        <path d="M52 156q28 12 56 0" fill="none" stroke="#E3E8F8" strokeWidth="8" strokeLinecap="round" />
        <g className={s.tail}>{tube('M86 168c26 2 46-12 42-34-2-10-10-13-15-8')}<circle cx="113" cy="126" r="4" fill={LAV} /></g>
        <path d={earL} fill="#FFFFFF" {...st} /><path d={earR} fill="#FFFFFF" {...st} />
        <path d="M44 44c-3-12-2-22 2-28 6 4 13 11 18 19z" fill="#E6EBFA" /><path d="M116 44c3-12 2-22-2-28-6 4-13 11-18 19z" fill="#E6EBFA" />
        <ellipse cx="80" cy="66" rx="52" ry="44" fill="#FFFFFF" {...st} />
        <path d="M44 92q36 22 72 0" fill="none" stroke="#EEF1FB" strokeWidth="10" strokeLinecap="round" />
        <path d="M72 24q4-8 8-2 4-7 9 1" fill="none" {...st} strokeWidth="2.6" />
        <path d="M56 106q24 9 48 0" fill="none" stroke={LAV} strokeWidth="9" strokeLinecap="round" />
        <path d="M80 108c-10-10-22-7-20 1 2 7 14 6 20-1zm0 0c10-10 22-7 20 1-2 7-14 6-20-1z" fill={PINK} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <circle cx="80" cy="108" r="4.5" fill="#E98DAF" stroke={INK} strokeWidth="2.2" />
      </g>
    );
  }
  const happy = view === 'happy';
  return (
    <g>
      <ellipse cx="80" cy="173" rx="50" ry="6" fill={INK} opacity=".12" />
      <g className={s.tail}>{tube('M112 160c30 2 42-16 34-36-4-9-12-10-16-4')}</g>
      <path d={body} fill="#FFFFFF" {...st} />
      <ellipse cx="80" cy="146" rx="21" ry="19" fill="#EEF1FB" />
      <ellipse cx="60" cy="168" rx="14" ry="7" fill="#FFFFFF" {...st} /><ellipse cx="100" cy="168" rx="14" ry="7" fill="#FFFFFF" {...st} />
      <path d="M55 170h9M96 170h9" stroke={LAV} strokeWidth="2.4" strokeLinecap="round" />
      {happy ? (
        <g className={s.arms}>{tube('M46 124L22 92', 16)}{tube('M114 124L138 92', 16)}</g>
      ) : (
        <g>
          {tube('M50 122L60 150', 16)}
          {tube('M112 126L130 96', 16)}
          <g transform="rotate(14 131 92)"><ellipse cx="131" cy="92" rx="13" ry="14" fill="#FFFFFF" {...st} /><ellipse cx="131" cy="96" rx="6" ry="4.6" fill={PINK} /><circle cx="124.5" cy="87" r="2.3" fill={PINK} /><circle cx="131" cy="84.5" r="2.3" fill={PINK} /><circle cx="137.5" cy="87" r="2.3" fill={PINK} /></g>
        </g>
      )}
      <path d={earL} fill="#FFFFFF" {...st} /><path d={earR} fill="#FFFFFF" {...st} />
      <path d="M44 44c-3-12-2-22 2-28 6 4 13 11 18 19z" fill={PINK} /><path d="M116 44c3-12 2-22-2-28-6 4-13 11-18 19z" fill={PINK} />
      <ellipse cx="80" cy="66" rx="52" ry="44" fill="#FFFFFF" {...st} />
      {happy ? (
        <g fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round"><path d="M52 72q10-12 20 0" /><path d="M88 72q10-12 20 0" /></g>
      ) : (
        <g>
          <ellipse cx="62" cy="70" rx="9" ry="11" fill={INK} /><ellipse cx="98" cy="70" rx="9" ry="11" fill={INK} />
          <circle cx="65" cy="65" r="3.6" fill="#FFFFFF" /><circle cx="101" cy="65" r="3.6" fill="#FFFFFF" />
          <circle cx="59" cy="75" r="1.6" fill="#FFFFFF" opacity=".85" /><circle cx="95" cy="75" r="1.6" fill="#FFFFFF" opacity=".85" />
        </g>
      )}
      <ellipse cx="44" cy="86" rx="10" ry="6" fill={PINK} opacity={happy ? 1 : 0.85} /><ellipse cx="116" cy="86" rx="10" ry="6" fill={PINK} opacity={happy ? 1 : 0.85} />
      <path d="M76 80q4-3 8 0q-1.5 4-4 5q-2.5-1-4-5z" fill="#E98DAF" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      {happy
        ? <path d="M71 88q9 12 18 0z" fill="#E98DAF" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        : <path d="M72 89q4 4 8 0q4 4 8 0" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />}
      <g stroke={LAV} strokeWidth="2.2" strokeLinecap="round"><path d="M18 76l16 3M20 88l15-2M142 76l-16 3M140 88l-15-2" /></g>
      <path d="M56 106q24 9 48 0" fill="none" stroke={LAV} strokeWidth="9" strokeLinecap="round" />
      <circle cx="80" cy="113" r="5.5" fill="#F7D46B" stroke={INK} strokeWidth="2.2" />
      {happy && (
        <g className={s.sparkle} stroke={INK} strokeWidth="2" strokeLinejoin="round">
          <path d={starD(16, 40, 11)} fill="#F7D46B" /><path d={starD(146, 34, 9)} fill="#F7D46B" /><path d={starD(150, 132, 7)} fill={PINK} /><path d={starD(10, 128, 7)} fill={LAV} />
        </g>
      )}
    </g>
  );
}

// Гравець: маленька персикова кицька з бантиком. viewBox 0 0 60 64
export function Kitten() {
  const st = { stroke: INK, strokeWidth: 2.4, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
  return (
    <g>
      <ellipse cx="30" cy="61" rx="17" ry="3.4" fill={INK} opacity=".14" />
      <path d="M40 52c10 1 15-6 11-14" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" /><path d="M40 52c10 1 15-6 11-14" fill="none" stroke="#FDEDE2" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="30" cy="47" rx="13" ry="12" fill="#FDEDE2" {...st} />
      <ellipse cx="24" cy="58" rx="5.5" ry="3.4" fill="#FFF8F2" {...st} /><ellipse cx="36" cy="58" rx="5.5" ry="3.4" fill="#FFF8F2" {...st} />
      <path d="M13 22l1-16 12 9z" fill="#FDEDE2" {...st} /><path d="M47 22l-1-16-12 9z" fill="#FDEDE2" {...st} />
      <path d="M16 17l.5-7 5.5 4z" fill={PINK} /><path d="M44 17l-.5-7-5.5 4z" fill={PINK} />
      <ellipse cx="30" cy="26" rx="19" ry="15.5" fill="#FDEDE2" {...st} />
      <ellipse cx="23" cy="26" rx="2.8" ry="3.4" fill={INK} /><ellipse cx="37" cy="26" rx="2.8" ry="3.4" fill={INK} />
      <circle cx="24" cy="24.6" r="1.1" fill="#FFFFFF" /><circle cx="38" cy="24.6" r="1.1" fill="#FFFFFF" />
      <ellipse cx="18" cy="32" rx="3.6" ry="2.2" fill={PINK} /><ellipse cx="42" cy="32" rx="3.6" ry="2.2" fill={PINK} />
      <path d="M27 32q1.5 2 3 0q1.5 2 3 0" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M44 12c-6-6-13-3-11 2 1 4 8 3 11-2zm0 0c6-6 13-3 11 2-1 4-8 3-11-2z" fill="#F4A6C1" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="44" cy="12" r="2.6" fill="#E98DAF" stroke={INK} strokeWidth="1.6" />
    </g>
  );
}

function Flower({ x, y, c, sc = 1 }: { x: number; y: number; c: string; sc?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${sc})`} stroke={INK} strokeWidth={1.6 / sc}>
      <path d="M0 4v10" fill="none" stroke="#62B872" strokeWidth={2.4 / sc} strokeLinecap="round" />
      {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={4.6 * Math.cos((a * Math.PI) / 180)} cy={4.6 * Math.sin((a * Math.PI) / 180) - 2} r="3.6" fill={c} />)}
      <circle cx="0" cy="-2" r="2.6" fill="#F7D46B" />
    </g>
  );
}

const X0 = 34, X1 = 268;
const stepXY = (i: number, n: number) => ({ x: X0 + ((X1 - X0) * i) / n, y: 178 - 10 * Math.sin((Math.PI * i) / n) });

export function Scene({ steps, pos, view, turning, anim, animKey }: { steps: number; pos: number; view: MurlyView; turning: boolean; anim: string; animKey: number }) {
  const me = stepXY(pos, steps);
  return (
    <svg className={s.scene} viewBox="0 0 420 212" role="img" aria-label={`${pos} / ${steps}`}>
      <g fill="#FFFFFF" opacity=".9"><ellipse cx="70" cy="34" rx="26" ry="10" /><ellipse cx="86" cy="26" rx="16" ry="11" /><ellipse cx="226" cy="24" rx="22" ry="8" /><ellipse cx="240" cy="18" rx="13" ry="9" /></g>
      <path d="M0 150Q120 128 230 140T420 142V212H0z" fill={OK} />
      <path d="M0 176Q210 160 420 178V212H0z" fill="#BFE3B0" />
      <Flower x={110} y={140} c={PINK} sc={0.9} /><Flower x={178} y={136} c={LAV} sc={0.9} /><Flower x={250} y={142} c={PINK} sc={0.9} />
      {/* старт */}
      <g stroke={INK} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M14 182V122" fill="none" /><path d="M14 124l26 8-26 9z" fill={LAV} />
      </g>
      {/* камінці доріжки */}
      {Array.from({ length: steps + 1 }, (_, i) => {
        const p = stepXY(i, steps);
        const done = i <= pos;
        return <ellipse key={i} cx={p.x} cy={p.y} rx={i === steps ? 15 : 11} ry={i === steps ? 7 : 5.5} fill={i === steps ? '#F7D46B' : done ? LAV : '#FFFFFF'} stroke={INK} strokeWidth="2" />;
      })}
      {/* фініш: прапорець у клітинку */}
      <g stroke={INK} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M290 184V120" fill="none" strokeLinecap="round" />
        <rect x="290" y="120" width="30" height="20" fill="#FFFFFF" />
        <path d="M290 120h7.5v5h-7.5zM305 120h7.5v5h-7.5zM297.5 125h7.5v5h-7.5zM312.5 125h7.5v5h-7.5zM290 130h7.5v5h-7.5zM305 130h7.5v5h-7.5zM297.5 135h7.5v5h-7.5zM312.5 135h7.5v5h-7.5z" fill={VIOLET} strokeWidth="0" />
        <rect x="290" y="120" width="30" height="20" fill="none" />
      </g>
      <Flower x={40} y={200} c={PINK} /><Flower x={150} y={204} c={VIOLET} sc={0.9} /><Flower x={262} y={202} c={LAV} /><Flower x={404} y={198} c={PINK} sc={0.9} />
      {/* Murly на фініші */}
      <g transform="translate(318 70) scale(0.62)">
        <g key={view} className={`${s.murly} ${turning ? s.twitch : ''}`}>
          <MurlyArt view={view} />
          {view === 'back' && !turning && (
            <g className={s.notes} fill={VIOLET}>
              <g transform="translate(140 24)"><ellipse cx="0" cy="12" rx="6" ry="4.5" transform="rotate(-20 0 12)" /><path d="M5 11V-6" stroke={VIOLET} strokeWidth="2.6" /></g>
              <g transform="translate(8 40)"><ellipse cx="0" cy="12" rx="5" ry="3.8" transform="rotate(-20 0 12)" /><path d="M4 11V-4" stroke={VIOLET} strokeWidth="2.4" /></g>
            </g>
          )}
        </g>
      </g>
      {/* гравець */}
      <g className={s.me} style={{ transform: `translate(${me.x - 24}px, ${me.y - 50}px)` }}>
        <g key={animKey} className={`${s.meIn} ${s[`a_${anim}`] ?? ''}`}>
          <g transform="scale(0.8)"><Kitten /></g>
        </g>
      </g>
    </svg>
  );
}

// ---------- гра ----------
type Phase = 'ready' | 'green' | 'turning' | 'red' | 'done';
type Screen = 'intro' | 'play' | 'level' | 'win';
type Fb = { kind: 'good' | 'oops' | 'try'; en: string; n: number } | null;

export default function StopGo() {
  const t = useT();
  const [screen, setScreen] = useState<Screen>('intro');
  const [lvl, setLvl] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');
  const [pos, setPos] = useState(0);
  const [task, setTask] = useState<Task>(() => makeTask(LEVELS[0]));
  const [wrong, setWrong] = useState<string[]>([]);
  const [fb, setFb] = useState<Fb>(null);
  const [anim, setAnim] = useState('idle');
  const [animKey, setAnimKey] = useState(0);
  const [stars, setStars] = useState<number[]>([0, 0, 0]);
  const [paused, setPaused] = useState(false);
  const [oopsN, setOopsN] = useState(0);

  const phaseRef = useRef<Phase>('ready');
  const lvlRef = useRef(0);
  const posRef = useRef(0);
  const taskRef = useRef(task);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const later = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lock = useRef(false);
  const oops = useRef(0);
  const misses = useRef(0);
  const slowNext = useRef(false);
  const screenRef = useRef<Screen>('intro');

  const after = (ms: number, f: () => void) => { later.current.push(setTimeout(f, ms)); };
  const clearAll = () => { clearTimeout(timer.current); later.current.forEach(clearTimeout); later.current = []; };
  const go = (p: Phase) => { phaseRef.current = p; setPhase(p); };
  const canHear = () => phaseRef.current === 'green' || phaseRef.current === 'turning';

  const speakTask = useCallback((slow = false) => { say(taskRef.current.target.voice, { slow }); }, []);

  // цикл світла: зелене → Murly обертається → червоне → знову зелене
  const startGreen = () => {
    go('green');
    say('Green light! Walk!', { onEnd: () => { if (canHear()) speakTask(); } });
    const lv = LEVELS[lvlRef.current];
    timer.current = setTimeout(startTurning, rand(lv.green[0], lv.green[1]) + 1400);
  };
  const startTurning = () => {
    go('turning');
    timer.current = setTimeout(startRed, LEVELS[lvlRef.current].turn);
  };
  const startRed = () => {
    go('red');
    say('Red light! Freeze!');
    const lv = LEVELS[lvlRef.current];
    timer.current = setTimeout(startGreen, rand(lv.red[0], lv.red[1]));
  };

  const newTask = (lv: Level) => { const nt = makeTask(lv, taskRef.current?.target); taskRef.current = nt; setTask(nt); setWrong([]); slowNext.current = false; };

  const startLevel = (i: number) => {
    clearAll(); stopSpeak();
    lvlRef.current = i; setLvl(i);
    posRef.current = 0; setPos(0);
    oops.current = 0; misses.current = 0; setOopsN(0);
    lock.current = false;
    newTask(LEVELS[i]);
    setFb(null); setAnim('idle'); setPaused(false);
    screenRef.current = 'play'; setScreen('play');
    go('ready');
    timer.current = setTimeout(startGreen, 1500);
  };

  const finishLevel = () => {
    clearAll(); go('done');
    const pen = oops.current + Math.floor(misses.current / 3);
    const got = pen === 0 ? 3 : pen <= 2 ? 2 : 1;
    setStars((a) => a.map((v, i) => (i === lvlRef.current ? Math.max(v, got) : v)));
    after(900, () => say('Hooray! You reached Murly!'));
    after(2200, () => { const last = lvlRef.current === LEVELS.length - 1; screenRef.current = last ? 'win' : 'level'; setScreen(last ? 'win' : 'level'); });
  };

  const choose = (i: number) => {
    if (screenRef.current !== 'play' || lock.current) return;
    const ph = phaseRef.current;
    if (ph === 'ready' || ph === 'done') return;
    const cur = taskRef.current;
    if (ph === 'red') {
      // лагідно: кілька кроків назад, але не на самий старт
      lock.current = true;
      oops.current += 1; setOopsN(oops.current);
      const np = Math.max(Math.min(posRef.current, 1), posRef.current - 2);
      posRef.current = np; setPos(np);
      setAnim('oops'); setAnimKey((k) => k + 1);
      setFb({ kind: 'oops', en: 'Oops, you moved!', n: Date.now() });
      say('Oops! You moved!');
      after(900, () => { lock.current = false; });
      return;
    }
    const item = cur.options[i];
    if (!item || wrong.includes(item.key)) return;
    if (item.key === cur.target.key) {
      lock.current = true;
      const np = posRef.current + 1; posRef.current = np; setPos(np);
      setAnim(cur.target.act ?? 'walk'); setAnimKey((k) => k + 1);
      setFb({ kind: 'good', en: pick(PRAISE), n: Date.now() });
      if (np >= LEVELS[lvlRef.current].steps) { finishLevel(); return; }
      newTask(LEVELS[lvlRef.current]);
      after(550, () => { lock.current = false; if (canHear()) speakTask(); });
    } else {
      misses.current += 1;
      setWrong((w) => [...w, item.key]);
      setFb({ kind: 'try', en: 'Try again!', n: Date.now() });
      say(cur.target.voice, { slow: true });
    }
  };

  const replay = () => {
    if (screenRef.current !== 'play' || !canHear()) return;
    speakTask(slowNext.current); slowNext.current = !slowNext.current;
  };

  // клавіатура: 1-4 обирають картку, пробіл чи Enter поза кнопками повторюють слово
  const keyRef = useRef<(e: KeyboardEvent) => void>(() => {});
  keyRef.current = (e: KeyboardEvent) => {
    if (screenRef.current !== 'play' || e.altKey || e.ctrlKey || e.metaKey) return;
    const el = e.target as HTMLElement | null;
    if (el?.closest('input, textarea, select, [contenteditable="true"]')) return;
    const d = Number(e.key);
    if (d >= 1 && d <= 4) { e.preventDefault(); choose(d - 1); return; }
    if ((e.key === ' ' || e.key === 'Enter') && !el?.closest('button, a')) { e.preventDefault(); replay(); }
  };
  useEffect(() => {
    const on = (e: KeyboardEvent) => keyRef.current(e);
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, []);

  // вкладка схована: ставимо на паузу, щоб світло не мінялося без дитини
  useEffect(() => {
    const on = () => {
      if (document.visibilityState === 'hidden' && screenRef.current === 'play' && phaseRef.current !== 'done') {
        clearAll(); stopSpeak(); lock.current = false; go('ready'); setPaused(true);
      }
    };
    document.addEventListener('visibilitychange', on);
    return () => { document.removeEventListener('visibilitychange', on); clearAll(); stopSpeak(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resume = () => { setPaused(false); go('ready'); timer.current = setTimeout(startGreen, 900); };

  const lv = LEVELS[lvl];
  const view: MurlyView = phase === 'done' ? 'happy' : phase === 'red' ? 'front' : 'back';
  const sub = (x: Tr) => (t.lang === 'en' ? null : <span className={s.sub}>{t(x)}</span>);
  const total = stars.reduce((a, b) => a + b, 0);

  const LIGHT: Record<Phase, { en: string; tr: Tr; cls: string }> = {
    ready: { en: paused ? 'Pause' : 'Get ready...', tr: paused ? { uk: 'Пауза', ru: 'Пауза', en: '' } : { uk: 'Приготуйся', ru: 'Приготовься', en: '' }, cls: s.lReady },
    green: { en: 'Green light! Walk!', tr: { uk: 'Зелене світло: іди!', ru: 'Зелёный свет: иди!', en: '' }, cls: s.lGreen },
    turning: { en: 'Murly is turning...', tr: { uk: 'Murly обертається', ru: 'Murly поворачивается', en: '' }, cls: s.lTurn },
    red: { en: 'Red light! Freeze!', tr: { uk: 'Червоне світло: завмри!', ru: 'Красный свет: замри!', en: '' }, cls: s.lRed },
    done: { en: 'You did it!', tr: { uk: 'Ура, ти біля Murly!', ru: 'Ура, ты у Murly!', en: '' }, cls: s.lGreen },
  };

  if (screen === 'intro') {
    return (
      <div className={s.root}>
        <div className={s.intro}>
          <svg className={s.introCat} viewBox="0 0 160 180" aria-hidden="true"><MurlyArt view="front" /></svg>
          <div className={s.introText}>
            <p className={s.lead}>{t({ uk: 'Дійди доріжкою до котика Murly!', ru: 'Дойди по дорожке до котика Murly!', en: 'Walk along the path to Murly the cat!' })}</p>
            <ul className={s.rules}>
              <li><span className={`${s.dot} ${s.dotGreen}`} aria-hidden="true" />{t({ uk: 'Зелене світло: Murly стоїть спиною. Слухай слово й торкнись правильної картки, щоб зробити крок.', ru: 'Зелёный свет: Murly стоит спиной. Слушай слово и нажми правильную карточку, чтобы сделать шаг.', en: 'Green light: Murly looks away. Listen to the word and tap the right card to take a step.' })}</li>
              <li><span className={`${s.dot} ${s.dotRed}`} aria-hidden="true" />{t({ uk: 'Червоне світло: Murly обертається. Завмри й нічого не натискай!', ru: 'Красный свет: Murly поворачивается. Замри и ничего не нажимай!', en: 'Red light: Murly turns around. Freeze and do not tap anything!' })}</li>
            </ul>
            <p className={s.pickTitle}>{t({ uk: 'Обери рівень', ru: 'Выбери уровень', en: 'Choose a level' })}</p>
            <div className={s.levels}>
              {LEVELS.map((L, i) => (
                <button key={i} type="button" className={s.levelBtn} onClick={() => startLevel(i)}>
                  <span className={s.levelNum}>{i + 1}</span>
                  <span className={s.levelName}>{L.title}{sub(L.name)}</span>
                  {stars[i] > 0 && <StarRow n={stars[i]} small />}
                </button>
              ))}
            </div>
            <p className={s.hint}>{t({ uk: 'Клавіші: 1-4 обирають картку, пробіл повторює слово.', ru: 'Клавиши: 1-4 выбирают карточку, пробел повторяет слово.', en: 'Keys: 1-4 pick a card, space repeats the word.' })}</p>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'win') {
    return (
      <div className={s.root}>
        <div className={s.win}>
          <svg className={s.winCat} viewBox="0 0 160 180" aria-hidden="true"><MurlyArt view="happy" /></svg>
          <h2 className={s.winTitle}>Hooray! You reached Murly!</h2>
          {sub({ uk: 'Ура! Усі три рівні пройдено.', ru: 'Ура! Все три уровня пройдены.', en: '' })}
          <StarRow n={total} of={9} />
          <p className={s.winCount}>{t({ uk: `Зірочок: ${total} з 9`, ru: `Звёздочек: ${total} из 9`, en: `Stars: ${total} of 9` })}</p>
          <div className={s.row}>
            <button type="button" className={s.btn} onClick={() => { setStars([0, 0, 0]); startLevel(0); }}>{t({ uk: 'Грати знову', ru: 'Играть снова', en: 'Play again' })}</button>
            <button type="button" className={`${s.btn} ${s.btnSoft}`} onClick={() => { screenRef.current = 'intro'; setScreen('intro'); }}>{t({ uk: 'Обрати рівень', ru: 'Выбрать уровень', en: 'Choose a level' })}</button>
          </div>
        </div>
      </div>
    );
  }

  const L = LIGHT[phase];
  const frozen = phase === 'red';
  return (
    <div className={`${s.root} ${frozen ? s.isRed : ''}`}>
      <div className={s.hud}>
        <span className={s.badge}>{t({ uk: 'Рівень', ru: 'Уровень', en: 'Level' })} {lvl + 1}: {lv.title}</span>
        <span className={s.badge}>{t({ uk: 'Кроки', ru: 'Шаги', en: 'Steps' })} {pos}/{lv.steps}</span>
        <button type="button" className={s.linkBtn} onClick={() => { clearAll(); stopSpeak(); screenRef.current = 'intro'; setScreen('intro'); }}>{t({ uk: 'Рівні', ru: 'Уровни', en: 'Levels' })}</button>
      </div>

      <div className={`${s.light} ${L.cls}`} role="status" aria-live="assertive">
        <span className={s.lamp} aria-hidden="true"><i /><i /></span>
        <span className={s.lightText}><b>{L.en}</b>{sub(L.tr)}</span>
      </div>

      <div className={s.stage}>
        <Scene steps={lv.steps} pos={pos} view={view} turning={phase === 'turning'} anim={anim} animKey={animKey} />
        {paused && (
          <div className={s.over}>
            <p>{t({ uk: 'Гра на паузі', ru: 'Игра на паузе', en: 'The game is paused' })}</p>
            <button type="button" className={s.btn} onClick={resume}>{t({ uk: 'Грати далі', ru: 'Играть дальше', en: 'Play on' })}</button>
          </div>
        )}
        {screen === 'level' && (
          <div className={s.over}>
            <p className={s.overTitle}>Level {lvl + 1}: well done!</p>
            <StarRow n={stars[lvl]} />
            {oopsN === 0 && <p className={s.overNote}>{t({ uk: 'Жодного руху на червоне світло!', ru: 'Ни одного движения на красный свет!', en: 'You never moved on red!' })}</p>}
            <button type="button" className={s.btn} onClick={() => startLevel(lvl + 1)}>{t({ uk: 'Наступний рівень', ru: 'Следующий уровень', en: 'Next level' })}: {LEVELS[lvl + 1]?.title}</button>
          </div>
        )}
      </div>

      <div className={s.askRow}>
        <button type="button" className={s.hear} onClick={replay} disabled={!canHear() || screen !== 'play'}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" /><path d="M16 9q2 3 0 6M18.5 6.5q4.5 5.5 0 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          {t({ uk: 'Послухати ще', ru: 'Послушать ещё', en: 'Listen again' })}
        </button>
        <div className={s.fbBox} aria-live="polite">
          {fb && (
            <span key={fb.n} className={`${s.fb} ${fb.kind === 'good' ? s.fbGood : fb.kind === 'oops' ? s.fbOops : s.fbTry}`}>
              {fb.en}
              {fb.kind === 'oops' && sub({ uk: 'Ой, був рух! На червоне світло стій.', ru: 'Ой, было движение! На красный свет стой.', en: '' })}
              {fb.kind === 'try' && sub({ uk: 'Спробуй ще', ru: 'Попробуй ещё', en: '' })}
            </span>
          )}
        </div>
      </div>

      <div className={`${s.cards} ${task.options.length === 4 ? s.cards4 : ''}`}>
        {task.options.map((o, i) => {
          const no = wrong.includes(o.key);
          return (
            <button
              key={`${task.target.key}-${o.key}-${i}`}
              type="button"
              className={`${s.card} ${no ? s.cardNo : ''}`}
              onClick={() => choose(i)}
              aria-label={o.en}
              aria-disabled={no || undefined}
              disabled={screen !== 'play' || phase === 'done'}
            >
              <span className={s.key} aria-hidden="true">{i + 1}</span>
              <span className={s.pic}><CardPic pic={o.pic} /></span>
              {o.group === 'action' && <span className={s.word}>{o.en}{t.lang !== 'en' && <small>{t(o.tr)}</small>}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StarRow({ n, of = 3, small = false }: { n: number; of?: number; small?: boolean }) {
  return (
    <span className={`${s.stars} ${small ? s.starsSm : ''}`} role="img" aria-label={`${n} / ${of}`}>
      {Array.from({ length: of }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true"><path d={starD(12, 12.6, 11)} fill={i < n ? '#F7D46B' : '#FFFFFF'} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" /></svg>
      ))}
    </span>
  );
}
