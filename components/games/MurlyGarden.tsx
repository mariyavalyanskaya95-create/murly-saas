'use client';
// Гра «Murly Garden»: дитина відновлює садок за зірочки, а зірочки заробляє в коротких раундах зі словами.
// Слова, у яких були помилки, повертаються частіше. Прогрес зберігається в localStorage ('murly-garden').
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useT } from '../LangProvider';
import MurlyCat from '../MurlyCat';
import { say, stopSpeak } from '@/lib/speak';
import { GARDEN_ITEMS, GARDEN_TOPICS, ROUND_TASKS, STORE_KEY, type GardenItemId, type GardenWord } from '@/lib/garden-words';
import s from './MurlyGarden.module.css';

/* ---------- збереження ---------- */
type Stat = { r: number; w: number; t: number };
type Save = { stars: number; owned: GardenItemId[]; stats: Record<string, Stat>; rounds: number };
const EMPTY: Save = { stars: 0, owned: [], stats: {}, rounds: 0 };
function load(): Save {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return EMPTY;
    const ids = new Set(GARDEN_ITEMS.map((i) => i.id));
    return {
      stars: Math.max(0, Number(raw.stars) || 0),
      owned: Array.isArray(raw.owned) ? raw.owned.filter((x: GardenItemId) => ids.has(x)) : [],
      stats: raw.stats && typeof raw.stats === 'object' ? raw.stats : {},
      rounds: Number(raw.rounds) || 0,
    };
  } catch { return EMPTY; }
}
function persist(v: Save) { try { localStorage.setItem(STORE_KEY, JSON.stringify(v)); } catch { /* ignore */ } }

/* ---------- слова й завдання ---------- */
type W = GardenWord & { topic: string };
const keyOf = (x: W) => `${x.topic}:${x.en}`;
const ALL: W[] = GARDEN_TOPICS.flatMap((tp) => tp.words.map((x) => ({ ...x, topic: tp.id })));
const shuffle = <X,>(a: X[]) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const canSpell = (x: W) => /^[a-z]{3,9}$/.test(x.en);

// Вага слова: нові й «помилкові» слова випадають частіше, добре вивчені рідше
function weight(st: Stat | undefined, round: number) {
  if (!st) return 2.2;
  const since = Math.max(0, round - st.t);
  const base = 1 + st.w * 2.2 - Math.min(st.r, 6) * 0.35;
  return Math.max(0.25, base) * (since < 1 ? 0.5 : 1 + Math.min(since, 6) * 0.12);
}
function pickWeighted(pool: W[], n: number, stats: Record<string, Stat>, round: number, filter?: (x: W) => boolean) {
  const out: W[] = [];
  let left = pool.filter((x) => !filter || filter(x));
  while (out.length < n && left.length) {
    const ws = left.map((x) => weight(stats[keyOf(x)], round));
    let r = Math.random() * ws.reduce((a, b) => a + b, 0);
    let i = 0;
    for (; i < ws.length - 1; i++) { r -= ws[i]; if (r <= 0) break; }
    out.push(left[i]);
    left = left.filter((_, k) => k !== i);
  }
  return out;
}

type Kind = 'listen' | 'translate' | 'reverse' | 'spell' | 'match';
type Task =
  | { kind: 'listen' | 'translate' | 'reverse'; word: W; options: W[] }
  | { kind: 'spell'; word: W; letters: { id: number; ch: string }[] }
  | { kind: 'match'; words: W[]; right: W[] };

function optionsFor(word: W, nat: (x: W) => string) {
  const same = ALL.filter((x) => x.topic === word.topic && x.en !== word.en && nat(x) !== nat(word));
  const used = new Set<string>([nat(word)]);
  const picked: W[] = [];
  for (const x of shuffle(same)) { if (picked.length >= 3) break; if (used.has(nat(x))) continue; used.add(nat(x)); picked.push(x); }
  return shuffle([word, ...picked]);
}

const PATTERN: Kind[] = ['listen', 'translate', 'spell', 'reverse', 'match', 'listen', 'spell', 'translate'];

function buildRound(topic: string, stats: Record<string, Stat>, round: number, nat: (x: W) => string): Task[] {
  let pool = topic === 'review' ? ALL.filter((x) => (stats[keyOf(x)]?.w ?? 0) > 0) : ALL.filter((x) => x.topic === topic);
  if (topic === 'review' && pool.length < 8) pool = pool.concat(shuffle(ALL.filter((x) => stats[keyOf(x)] && !pool.includes(x))).slice(0, 8 - pool.length));
  if (pool.length < 6) pool = ALL;
  const kinds = [PATTERN[0], ...shuffle(PATTERN.slice(1, 4)), PATTERN[4], ...shuffle(PATTERN.slice(5))].slice(0, ROUND_TASKS);
  const singles = kinds.filter((k) => k !== 'match').length;
  const spells = kinds.filter((k) => k === 'spell').length;
  const spellWords = pickWeighted(pool, spells, stats, round, canSpell);
  const rest = pickWeighted(pool.filter((x) => !spellWords.includes(x)), singles - spellWords.length, stats, round);
  let si = 0, ri = 0;
  return kinds.map((k): Task => {
    if (k === 'match') {
      // для пар беремо 4 слова з різними перекладами
      const words: W[] = [];
      for (const x of pickWeighted(pool, pool.length, stats, round)) {
        if (words.length >= 4) break;
        if (words.some((y) => nat(y) === nat(x) || y.en === x.en)) continue;
        words.push(x);
      }
      return { kind: 'match', words: shuffle(words), right: shuffle(words) };
    }
    let word: W | undefined;
    if (k === 'spell' && si < spellWords.length) word = spellWords[si++];
    else word = rest[ri++] ?? spellWords[si++] ?? pool[Math.floor(Math.random() * pool.length)];
    if (k === 'spell' && canSpell(word)) return { kind: 'spell', word, letters: shuffle(word.en.split('').map((ch, id) => ({ id, ch }))) };
    return { kind: k === 'spell' ? 'listen' : k, word, options: optionsFor(word, nat) };
  });
}

/* ---------- малюнок саду (наш SVG) ---------- */
const INK = '#1B2140';
const WOOD = '#EBCFA6';
const SOIL = '#D6BC98';
const LEAF = '#7CC788';
const GREEN = '#9ED9A4';
const PINK = '#F4C0D1';
const LAV = '#AFC3F0';
const VIOLET = '#534AB7';
const YELLOW = '#F7D46B';
const STONE = '#D5DAEC';
const ln = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
const ln2 = { ...ln, strokeWidth: 2.2 };

function starPath(cx: number, cy: number, r: number) {
  const p: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.48 : r;
    p.push(`${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M${p.join('L')}Z`;
}
function Weed({ x, y, k = 1 }: { x: number; y: number; k?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d="M0 0c-2-10-8-16-14-18M0 0c0-12 2-20 6-26M0 0c4-8 10-12 16-12M0 0c-6-6-12-6-18-4" fill="none" stroke="#5FA86C" strokeWidth="3.4" strokeLinecap="round" />
    </g>
  );
}
function Rock({ x, y, rx = 12, ry = 8 }: { x: number; y: number; rx?: number; ry?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={STONE} {...ln2} />;
}
function Flower({ x, y, c, k = 1 }: { x: number; y: number; c: string; k?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d="M0 0v-22" stroke="#4E9A5C" strokeWidth="3" strokeLinecap="round" />
      <path d="M0-8c6-6 12-6 14-2-4 4-10 4-14 2z" fill={LEAF} {...ln2} strokeWidth={1.6} />
      {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-31" rx="5.5" ry="7.5" fill={c} {...ln2} strokeWidth={1.8} transform={`rotate(${a} 0 -24)`} />)}
      <circle cx="0" cy="-24" r="4.5" fill={YELLOW} {...ln2} strokeWidth={1.8} />
    </g>
  );
}
function Lantern({ x, y, c }: { x: number; y: number; c: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0v6" stroke={INK} strokeWidth="2" />
      <rect x="-5" y="5" width="10" height="4" rx="1.5" fill={VIOLET} />
      <rect x="-9" y="8" width="18" height="20" rx="8" fill={c} {...ln2} />
      <ellipse cx="-2" cy="15" rx="2.5" ry="4" fill="#FFFFFF" opacity=".7" />
      <rect x="-5" y="27" width="10" height="4" rx="1.5" fill={VIOLET} />
    </g>
  );
}

type Spot = { id: GardenItemId; badge: [number, number]; hit: [number, number, number, number][] };
const SPOTS: Record<GardenItemId, Spot> = {
  fence: { id: 'fence', badge: [585, 204], hit: [[0, 176, 365, 64], [445, 176, 355, 64]] },
  swing: { id: 'swing', badge: [690, 262], hit: [[620, 160, 140, 150]] },
  tree: { id: 'tree', badge: [118, 252], hit: [[30, 80, 180, 235]] },
  birdhouse: { id: 'birdhouse', badge: [250, 264], hit: [[212, 140, 76, 150]] },
  path: { id: 'path', badge: [400, 452], hit: [[335, 236, 130, 264]] },
  pond: { id: 'pond', badge: [615, 342], hit: [[510, 298, 210, 92]] },
  lanterns: { id: 'lanterns', badge: [322, 334], hit: [[296, 280, 54, 150], [452, 280, 54, 150]] },
  bench: { id: 'bench', badge: [232, 345], hit: [[160, 300, 145, 80]] },
  flowers: { id: 'flowers', badge: [138, 440], hit: [[24, 400, 235, 92]] },
  veggies: { id: 'veggies', badge: [690, 452], hit: [[596, 408, 196, 86]] },
};
const ORDER: GardenItemId[] = ['fence', 'swing', 'tree', 'birdhouse', 'path', 'pond', 'lanterns', 'bench', 'flowers', 'veggies'];

function Art({ id }: { id: GardenItemId }) {
  switch (id) {
    case 'fence': {
      const xs: number[] = [];
      for (let x = 8; x < 800; x += 30) if (x < 330 || x > 452) xs.push(x);
      return (
        <g>
          <rect x="-4" y="196" width="356" height="9" rx="4" fill={LAV} {...ln2} />
          <rect x="-4" y="216" width="356" height="9" rx="4" fill={LAV} {...ln2} />
          <rect x="450" y="196" width="356" height="9" rx="4" fill={LAV} {...ln2} />
          <rect x="450" y="216" width="356" height="9" rx="4" fill={LAV} {...ln2} />
          {xs.map((x) => <path key={x} d={`M${x} 244V192q0-12 10-16q10 4 10 16V244z`} fill="#FFFFFF" {...ln2} />)}
        </g>
      );
    }
    case 'swing':
      return (
        <g>
          <path d="M636 306L660 172M744 306L720 172" stroke={INK} strokeWidth="13" strokeLinecap="round" />
          <path d="M636 306L660 172M744 306L720 172" stroke={LAV} strokeWidth="7.5" strokeLinecap="round" />
          <rect x="640" y="164" width="100" height="14" rx="7" fill={VIOLET} {...ln} />
          <path d="M672 178V262M708 178V262" stroke={INK} strokeWidth="2.6" />
          <rect x="660" y="260" width="60" height="12" rx="5" fill={YELLOW} {...ln} />
          <circle cx="690" cy="171" r="3" fill={YELLOW} />
        </g>
      );
    case 'tree': {
      const crown: [number, number, number][] = [[118, 150, 58], [72, 182, 42], [166, 182, 44], [118, 200, 46], [84, 128, 38], [154, 128, 36]];
      return (
        <g>
          <path d="M104 312q6-50 6-104h18q0 54 6 104z" fill={WOOD} {...ln} />
          <path d="M119 236q14-10 22-22" fill="none" {...ln2} />
          {crown.map(([x, y, r], i) => <circle key={`o${i}`} cx={x} cy={y} r={r} fill={INK} stroke={INK} strokeWidth="6" />)}
          {crown.map(([x, y, r], i) => <circle key={`f${i}`} cx={x} cy={y} r={r} fill={LEAF} />)}
          <circle cx="92" cy="126" r="20" fill={GREEN} opacity=".8" />
          <circle cx="146" cy="120" r="14" fill={GREEN} opacity=".8" />
          <circle cx="70" cy="172" r="14" fill={GREEN} opacity=".8" />
          {[[96, 160], [140, 168], [118, 116], [76, 200], [160, 204], [118, 214], [168, 146]].map(([x, y], i) => (
            <g key={i}><circle cx={x} cy={y} r="7.5" fill={PINK} {...ln2} strokeWidth={2} /><circle cx={x - 2} cy={y - 2.5} r="2" fill="#FFFFFF" /></g>
          ))}
        </g>
      );
    }
    case 'birdhouse':
      return (
        <g>
          <rect x="244" y="220" width="12" height="70" rx="4" fill={WOOD} {...ln} />
          <rect x="224" y="176" width="52" height="48" rx="6" fill={PINK} {...ln} />
          <path d="M214 184L250 148L286 184z" fill={VIOLET} {...ln} />
          <circle cx="250" cy="198" r="9" fill={INK} />
          <path d="M250 212v8" {...ln} />
          <g transform="translate(270 146)">
            <path d="M-12 0q0-12 12-12q10 0 10 10q8 2 10-4q0 14-14 14h-8q-10 0-10-8z" fill={YELLOW} {...ln2} />
            <circle cx="0" cy="-5" r="1.8" fill={INK} />
            <path d="M-12-4l-6 2 6 2" fill="#F2A65A" {...ln2} strokeWidth={1.6} />
          </g>
        </g>
      );
    case 'path':
      return (
        <g>
          <path d="M332 500C346 440 300 392 352 336C392 294 388 262 388 236H420C424 266 440 296 418 338C384 394 452 440 468 500Z" fill="#F6E7CC" {...ln} />
          {[[400, 476, 22, 9], [374, 430, 17, 7.5], [404, 390, 16, 7], [376, 350, 14, 6], [404, 312, 12, 5.5], [400, 276, 10, 4.5], [404, 250, 8, 3.5]].map(([x, y, rx, ry], i) => (
            <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#FFFFFF" stroke={INK} strokeWidth="2" opacity=".95" />
          ))}
        </g>
      );
    case 'pond':
      return (
        <g>
          <ellipse cx="615" cy="345" rx="102" ry="40" fill={LAV} {...ln} />
          <ellipse cx="600" cy="338" rx="70" ry="22" fill="#CBD8F7" />
          <path d="M560 336q14-6 28 0M620 352q12-5 24 0" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {[[518, 336, 13, 8], [540, 370, 14, 8], [690, 372, 15, 8], [712, 340, 12, 8], [600, 386, 13, 7], [650, 308, 12, 6]].map(([x, y, rx, ry], i) => <Rock key={i} x={x} y={y} rx={rx} ry={ry} />)}
          <path d="M650 344a16 9 0 1 0 2-4l-12 4z" fill={LEAF} {...ln2} />
          <g transform="translate(662 340)">{[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx="0" cy="-5" rx="3" ry="5" fill={PINK} stroke={INK} strokeWidth="1.4" transform={`rotate(${a})`} />)}<circle r="2.6" fill={YELLOW} /></g>
          <path d="M530 330c-2-18 0-30 4-40M538 332c2-14 6-24 12-30M524 332c-4-12-8-18-14-22" fill="none" stroke="#4E9A5C" strokeWidth="3" strokeLinecap="round" />
          <rect x="530" y="282" width="8" height="18" rx="4" fill="#C79A6E" {...ln2} strokeWidth={1.8} />
        </g>
      );
    case 'lanterns':
      return (
        <g>
          {[318, 482].map((x) => (
            <g key={x}>
              <rect x={x - 5} y="292" width="10" height="132" rx="4" fill={VIOLET} {...ln2} />
              <circle cx={x} cy="290" r="6" fill={YELLOW} {...ln2} />
            </g>
          ))}
          <path d="M318 300Q400 346 482 300" fill="none" stroke={INK} strokeWidth="2.2" />
          <Lantern x={346} y={314} c={YELLOW} />
          <Lantern x={373} y={322} c={PINK} />
          <Lantern x={400} y={324} c={YELLOW} />
          <Lantern x={427} y={322} c={LAV} />
          <Lantern x={454} y={314} c={PINK} />
        </g>
      );
    case 'bench':
      return (
        <g transform="translate(0 10)">
          <path d="M194 304v40M270 304v40" {...ln} strokeWidth={7} />
          <path d="M194 304v40M270 304v40" stroke={VIOLET} strokeWidth="3" strokeLinecap="round" />
          <path d="M178 352v24M286 352v24" {...ln} strokeWidth={7} />
          <path d="M178 352v24M286 352v24" stroke={VIOLET} strokeWidth="3" strokeLinecap="round" />
          <rect x="182" y="306" width="100" height="14" rx="6" fill={YELLOW} {...ln} />
          <rect x="182" y="324" width="100" height="12" rx="6" fill={YELLOW} {...ln} />
          <rect x="170" y="342" width="124" height="14" rx="6" fill={YELLOW} {...ln} />
        </g>
      );
    case 'flowers':
      return (
        <g>
          <ellipse cx="140" cy="452" rx="112" ry="34" fill={SOIL} {...ln} />
          <ellipse cx="140" cy="446" rx="96" ry="22" fill="#C9AC85" />
          {[[44, 444], [236, 444], [140, 486], [76, 474], [204, 474], [72, 424], [208, 424]].map(([x, y], i) => <Rock key={i} x={x} y={y} rx={9} ry={6} />)}
          <Flower x={70} y={456} c={PINK} />
          <Flower x={100} y={444} c={LAV} k={1.1} />
          <Flower x={136} y={460} c={YELLOW} k={1.15} />
          <Flower x={172} y={444} c={PINK} k={1.05} />
          <Flower x={206} y={458} c={LAV} />
          <Flower x={120} y={432} c="#FFFFFF" k={0.9} />
          <Flower x={156} y={430} c={PINK} k={0.85} />
        </g>
      );
    case 'veggies':
      return (
        <g>
          <rect x="600" y="414" width="188" height="76" rx="12" fill={WOOD} {...ln} />
          <rect x="612" y="424" width="164" height="56" rx="8" fill="#C9AC85" {...ln2} />
          {[634, 664, 694].map((x) => (
            <g key={x}>
              <path d={`M${x - 7} 448h14l-7 22z`} fill="#F2A65A" {...ln2} />
              <path d={`M${x} 448c-6-10-10-14-12-20M${x} 448c0-10 0-16 2-22M${x} 448c6-8 10-12 14-14`} fill="none" stroke="#4E9A5C" strokeWidth="3.2" strokeLinecap="round" />
            </g>
          ))}
          {[728, 758].map((x) => (
            <g key={x}>
              <circle cx={x} cy="452" r="15" fill={LEAF} {...ln2} />
              <path d={`M${x - 8} 446q8 10 16 0M${x} 438v18`} fill="none" stroke="#4E9A5C" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          ))}
          <rect x="738" y="388" width="34" height="20" rx="4" fill="#FFFFFF" {...ln2} />
          <path d="M755 408v10" {...ln2} />
          <path d="M746 398h18" stroke={VIOLET} strokeWidth="2.4" strokeLinecap="round" />
        </g>
      );
  }
}

function Mess({ id }: { id: GardenItemId }) {
  switch (id) {
    case 'fence':
      return (
        <g opacity=".95">
          {[[30, -6], [120, 10], [210, -14], [500, 8], [620, -10], [740, 14]].map(([x, r]) => (
            <path key={x} d={`M${x} 244V198q0-10 10-14q10 4 10 14V244z`} fill="#E3E6F3" {...ln2} transform={`rotate(${r} ${x + 10} 244)`} />
          ))}
        </g>
      );
    case 'swing':
      return (
        <g>
          <Weed x={656} y={306} k={1.2} /><Weed x={690} y={300} k={1.5} /><Weed x={726} y={308} k={1.2} />
          <circle cx="702" cy="296" r="11" fill="none" stroke={WOOD} strokeWidth="5" />
          <circle cx="702" cy="296" r="11" fill="none" stroke={INK} strokeWidth="1.6" />
        </g>
      );
    case 'tree':
      return (
        <g>
          <path d="M98 312q4-26 4-34h32q0 8 4 34z" fill={WOOD} {...ln} />
          <ellipse cx="118" cy="278" rx="16" ry="5" fill="#F6E2C0" {...ln2} />
          <path d="M136 290q12-4 16-14" fill="none" {...ln2} />
          <Weed x={84} y={312} k={0.8} /><Weed x={156} y={314} k={0.8} />
        </g>
      );
    case 'birdhouse':
      return (
        <g>
          <rect x="222" y="292" width="58" height="10" rx="4" fill={WOOD} {...ln2} transform="rotate(-8 250 297)" />
          <rect x="232" y="300" width="44" height="9" rx="4" fill={WOOD} {...ln2} transform="rotate(10 254 304)" />
        </g>
      );
    case 'path':
      return (
        <g>
          <Weed x={372} y={470} /><Weed x={420} y={420} k={1.1} /><Weed x={378} y={372} k={0.9} /><Weed x={414} y={318} k={0.8} />
          <Rock x={404} y={482} rx={11} ry={7} /><Rock x={360} y={410} rx={9} ry={6} /><Rock x={402} y={352} rx={8} ry={5} /><Rock x={396} y={270} rx={7} ry={4.5} />
        </g>
      );
    case 'pond':
      return (
        <g>
          <ellipse cx="615" cy="345" rx="96" ry="36" fill="#E2D3BB" {...ln} strokeDasharray="10 8" />
          <path d="M568 340l18 6 8-8 16 10M630 334l12 10 18-4M600 360l14-6" fill="none" stroke="#B89C78" strokeWidth="2.4" strokeLinecap="round" />
          <Rock x={548} y={330} rx={12} ry={7} /><Rock x={680} y={360} rx={13} ry={7} />
          <Weed x={706} y={340} k={0.8} />
        </g>
      );
    case 'lanterns':
      return (
        <g>
          <rect x="300" y="404" width="40" height="26" rx="5" fill={WOOD} {...ln2} />
          <path d="M300 416h40" {...ln2} />
          <path d="M306 404c4-14 14-6 10 0s10-10 14-2c3 6-6 6-2 2" fill="none" stroke={VIOLET} strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case 'bench':
      return (
        <g>
          <rect x="176" y="356" width="104" height="12" rx="5" fill="#EFE4BD" {...ln2} transform="rotate(-5 228 362)" />
          <rect x="196" y="344" width="78" height="11" rx="5" fill="#EFE4BD" {...ln2} transform="rotate(7 235 350)" />
          <Weed x={176} y={378} k={0.8} /><Weed x={290} y={376} k={0.9} />
        </g>
      );
    case 'flowers':
      return (
        <g>
          <ellipse cx="140" cy="452" rx="108" ry="32" fill="#E2D3BB" {...ln} strokeDasharray="10 8" />
          <Weed x={80} y={458} k={1.1} /><Weed x={130} y={446} k={1.3} /><Weed x={186} y={462} /><Weed x={210} y={440} k={0.8} />
          <Rock x={104} y={466} rx={9} ry={6} />
        </g>
      );
    case 'veggies':
      return (
        <g>
          <rect x="604" y="420" width="180" height="66" rx="14" fill="#E2D3BB" {...ln} strokeDasharray="10 8" />
          <Weed x={640} y={462} k={1.2} /><Weed x={700} y={452} /><Weed x={752} y={470} k={1.2} />
          <Rock x={672} y={474} rx={10} ry={6} /><Rock x={730} y={440} rx={8} ry={5} />
        </g>
      );
  }
}

export function GardenScene({ owned, fresh, labels, onSpot, cat }: { owned: GardenItemId[]; fresh?: GardenItemId | null; labels?: Partial<Record<GardenItemId, string>>; onSpot?: (id: GardenItemId) => void; cat?: React.ReactNode }) {
  const has = new Set(owned);
  const cost = Object.fromEntries(GARDEN_ITEMS.map((i) => [i.id, i.cost])) as Record<GardenItemId, number>;
  const all = has.size === GARDEN_ITEMS.length;
  const layers = (ids: GardenItemId[]) => ids.map((id) => {
    const on = has.has(id);
    const sp = SPOTS[id];
    const act = () => onSpot?.(id);
    return (
      <g
        key={id + (on ? '1' : '0')}
        className={`${s.spot} ${on ? s.done : s.todo} ${fresh === id ? s.pop : ''}`}
        role={onSpot ? 'button' : undefined}
        tabIndex={onSpot ? 0 : undefined}
        aria-label={labels?.[id]}
        onClick={onSpot ? act : undefined}
        onKeyDown={onSpot ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } } : undefined}
      >
        {sp.hit.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="14" className={s.hit} />)}
        <g className={s.art}>{on ? <Art id={id} /> : <Mess id={id} />}</g>
        {!on && (
          <g transform={`translate(${sp.badge[0]} ${sp.badge[1]})`}><g className={s.badge}>
            <rect x="-25" y="-14" width="50" height="28" rx="14" fill="#FFFFFF" {...ln2} />
            <path d={starPath(-9, 0, 9)} fill={YELLOW} {...ln2} strokeWidth={1.6} />
            <text x="10" y="6" textAnchor="middle" fontSize="16" fontWeight="800" fill={INK} fontFamily="inherit">{cost[id]}</text>
          </g></g>
        )}
      </g>
    );
  });
  return (
    <div className={s.scene}>
      <svg viewBox="0 0 800 500" className={s.svg} aria-hidden={onSpot ? undefined : true}>
        <defs>
          <linearGradient id="mg-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DCE5FB" /><stop offset="1" stopColor="#EEF0FA" /></linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#mg-sky)" />
        <g className={all ? s.sunOn : ''}>
          <circle cx="712" cy="66" r="44" fill="#FFF8DC" opacity=".9" />
          <circle cx="712" cy="66" r="30" fill={YELLOW} {...ln} />
          <path d="M702 70q10 8 20 0" fill="none" {...ln2} /><circle cx="703" cy="60" r="2.4" fill={INK} /><circle cx="721" cy="60" r="2.4" fill={INK} />
        </g>
        <g className={s.cloud}>
          <path d="M84 84q0-20 22-20q8-16 28-12q20-8 30 10q20 0 20 18q0 14-16 14H98q-14 0-14-10z" fill="#FFFFFF" {...ln2} />
        </g>
        <g className={s.cloud2}>
          <path d="M440 56q0-14 16-14q6-12 20-9q14-6 22 7q14 0 14 13q0 10-12 10H450q-10 0-10-7z" fill="#FFFFFF" {...ln2} />
        </g>
        <path d="M0 206Q90 150 210 196Q330 140 470 190Q600 146 800 192V260H0Z" fill="#C8EACB" stroke={INK} strokeWidth="2.2" strokeOpacity=".35" />
        <g className={s.gate}>
          <rect x="350" y="170" width="12" height="76" rx="5" fill={WOOD} {...ln2} />
          <rect x="440" y="170" width="12" height="76" rx="5" fill={WOOD} {...ln2} />
          <circle cx="356" cy="166" r="7" fill={PINK} {...ln2} /><circle cx="446" cy="166" r="7" fill={PINK} {...ln2} />
        </g>
        {layers(['fence'])}
        <path d="M0 238Q200 224 400 236T800 232V500H0Z" fill={GREEN} />
        <path d="M0 238Q200 224 400 236T800 232" fill="none" stroke={INK} strokeWidth="2.6" />
        <g fill="none" stroke="#7DC489" strokeWidth="2.6" strokeLinecap="round">
          <path d="M40 280l4-8 4 8M300 268l4-8 4 8M520 270l4-8 4 8M770 290l4-8 4 8M560 470l4-8 4 8M280 470l4-8 4 8M30 380l4-8 4 8M790 400l4-8 4 8M500 300l4-8 4 8" />
        </g>
        {layers(['swing', 'tree', 'birdhouse', 'path', 'pond', 'lanterns', 'bench', 'flowers', 'veggies'])}
      </svg>
      {cat && <div className={s.catBox}>{cat}</div>}
    </div>
  );
}

/* ---------- гра ---------- */
type Screen = 'garden' | 'topics' | 'round' | 'result';
type Answer = { ok: boolean; picked?: string };

export default function MurlyGarden() {
  const t = useT();
  const lang = t.lang;
  const nat = useCallback((x: W) => (lang === 'ru' ? x.ru : x.uk), [lang]);
  const [save, setSave] = useState<Save>(EMPTY);
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<Screen>('garden');
  const [topic, setTopic] = useState('animals');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [earned, setEarned] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [missed, setMissed] = useState<W[]>([]);
  const [fresh, setFresh] = useState<GardenItemId | null>(null);
  const [toast, setToast] = useState<{ line: string; word: string } | null>(null);
  const [cheer, setCheer] = useState(0);
  const [note, setNote] = useState('');
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setSave(load()); setReady(true); }, []);
  useEffect(() => { if (ready) persist(save); }, [save, ready]);
  useEffect(() => () => stopSpeak(), []);

  const stars = save.stars;
  const owned = save.owned;
  const nextItem = GARDEN_ITEMS.find((i) => !owned.includes(i.id));
  const reviewCount = useMemo(() => ALL.filter((x) => { const st = save.stats[keyOf(x)]; return st && st.w > 0; }).length, [save.stats]);

  const mark = useCallback((words: W[], ok: boolean) => {
    setSave((v) => {
      const stats = { ...v.stats };
      for (const x of words) {
        const k = keyOf(x);
        const st = stats[k] ?? { r: 0, w: 0, t: 0 };
        // правильна відповідь потроху «гасить» старі помилки
        stats[k] = ok ? { r: st.r + 1, w: Math.max(0, st.w - (st.r >= 1 ? 1 : 0)), t: v.rounds } : { r: st.r, w: st.w + 1, t: v.rounds };
      }
      return { ...v, stats };
    });
    if (!ok) setMissed((m) => m.concat(words.filter((x) => !m.some((y) => y.en === x.en))));
  }, []);

  const start = (tp: string) => {
    setTopic(tp);
    setTasks(buildRound(tp, save.stats, save.rounds, nat));
    setStep(0); setAnswer(null); setEarned(0); setBonus(0); setMissed([]);
    setScreen('round');
  };

  const finishTask = (ok: boolean) => { if (ok) setEarned((e) => e + 1); };
  const next = () => {
    if (step + 1 >= tasks.length) {
      const bonus = earned >= ROUND_TASKS - 1 ? 2 : 0;
      setSave((v) => ({ ...v, stars: v.stars + earned + bonus, rounds: v.rounds + 1 }));
      setBonus(bonus);
      setScreen('result');
      setCheer((c) => c + 1);
      return;
    }
    setStep((x) => x + 1); setAnswer(null);
  };

  const buy = (id: GardenItemId) => {
    const it = GARDEN_ITEMS.find((i) => i.id === id)!;
    if (owned.includes(id)) { say(it.word); return; }
    if (stars < it.cost) {
      setNote(t({ uk: `${t(it.name)}: бракує зірочок: ${it.cost - stars}`, ru: `${t(it.name)}: не хватает звёздочек: ${it.cost - stars}`, en: `${t(it.name)}: stars missing: ${it.cost - stars}` }));
      say(it.word);
      return;
    }
    setNote('');
    setSave((v) => ({ ...v, stars: v.stars - it.cost, owned: v.owned.concat(id) }));
    setFresh(id);
    setToast({ line: it.line, word: it.word });
    setCheer((c) => c + 1);
    say(it.line);
  };
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 5200); return () => clearTimeout(id); }, [toast]);
  useEffect(() => { if (!fresh) return; const id = setTimeout(() => setFresh(null), 1400); return () => clearTimeout(id); }, [fresh]);

  const labels = Object.fromEntries(GARDEN_ITEMS.map((i) => [i.id, `${t(i.name)} (${i.word}): ${owned.includes(i.id) ? t({ uk: 'готово', ru: 'готово', en: 'done' }) : `${t({ uk: 'зірочок', ru: 'звёздочек', en: 'stars' })}: ${i.cost}`}`])) as Record<GardenItemId, string>;
  const catLine = toast ? 'Hooray!' : screen === 'result' ? (earned >= 6 ? 'Super star!' : 'Good try!') : owned.length === GARDEN_ITEMS.length ? 'What a garden!' : 'Let’s fix the garden!';
  const cat = <MurlyCat key={cheer} className={s.cat} greet={cheer ? 250 : 1200} hi={catLine} />;

  const reset = () => {
    if (!window.confirm(t({ uk: 'Почати новий садок? Зірочки й слова залишаться.', ru: 'Начать новый сад? Звёздочки и слова останутся.', en: 'Start a new garden? Your stars and words stay.' }))) return;
    setSave((v) => ({ ...v, owned: [] }));
  };

  /* ----- екран саду ----- */
  if (screen === 'garden') {
    return (
      <div className={s.wrap}>
        <div className={s.bar}>
          <span className={s.stars} aria-label={t({ uk: 'Зірочки', ru: 'Звёздочки', en: 'Stars' })}><StarIcon /> {stars}</span>
          <span className={s.count}>{t({ uk: 'Відновлено', ru: 'Восстановлено', en: 'Restored' })}: {owned.length} / {GARDEN_ITEMS.length}</span>
          <button type="button" className={`${s.btn} ${s.btnMain}`} onClick={() => setScreen('topics')}>{t({ uk: 'Заробити зірочки', ru: 'Заработать звёздочки', en: 'Earn stars' })}</button>
        </div>
        <GardenScene owned={owned} fresh={fresh} labels={labels} onSpot={buy} cat={cat} />
        <div className={s.live} role="status" aria-live="polite">
          {toast ? (
            <div className={s.toast}>
              <strong>{toast.line}</strong>
              <button type="button" className={s.wordChip} onClick={() => say(toast.word)}><SpeakIcon /> {toast.word}</button>
            </div>
          ) : note ? <div className={s.note}>{note}</div> : null}
        </div>
        <p className={s.hint}>
          {owned.length === GARDEN_ITEMS.length
            ? t({ uk: 'Садок готовий! Грай далі, щоб вчити нові слова, або почни новий садок.', ru: 'Сад готов! Играй дальше, чтобы учить новые слова, или начни новый сад.', en: 'Your garden is ready! Keep playing to learn more words, or start a new garden.' })
            : stars === 0 && owned.length === 0
              ? t({ uk: 'Садок закинутий. Заробляй зірочки в словесних раундах і відновлюй його крок за кроком.', ru: 'Сад заброшен. Зарабатывай звёздочки в словесных раундах и восстанавливай его шаг за шагом.', en: 'The garden is a mess. Earn stars in word rounds and fix it step by step.' })
              : t({ uk: 'Натисни на місце в саду або на картку нижче, щоб відновити його.', ru: 'Нажми на место в саду или на карточку ниже, чтобы восстановить его.', en: 'Tap a spot in the garden or a card below to fix it.' })}
        </p>
        <div className={s.shop} ref={shopRef}>
          {GARDEN_ITEMS.map((it) => {
            const on = owned.includes(it.id);
            const can = !on && stars >= it.cost;
            return (
              <button key={it.id} type="button" className={`${s.card} ${on ? s.cardDone : can ? s.cardCan : ''}`} onClick={() => buy(it.id)} aria-label={labels[it.id]}>
                <span className={s.cardName}>{t(it.name)}</span>
                <span className={s.cardEn}>{it.word}</span>
                <span className={s.cardCost}>{on ? t({ uk: 'Готово', ru: 'Готово', en: 'Done' }) : <><StarIcon small /> {it.cost}</>}</span>
              </button>
            );
          })}
        </div>
        {nextItem && stars < nextItem.cost && (
          <p className={s.hint}>{t({ uk: `До наступного предмета (${nextItem.word}): ще ${nextItem.cost - stars}`, ru: `До следующего предмета (${nextItem.word}): ещё ${nextItem.cost - stars}`, en: `Next item (${nextItem.word}): ${nextItem.cost - stars} more` })} <StarIcon small /></p>
        )}
        {owned.length === GARDEN_ITEMS.length && (
          <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={reset}>{t({ uk: 'Новий садок', ru: 'Новый сад', en: 'New garden' })}</button>
        )}
      </div>
    );
  }

  /* ----- вибір теми ----- */
  if (screen === 'topics') {
    return (
      <div className={s.wrap}>
        <div className={s.bar}>
          <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setScreen('garden')}>{t({ uk: 'До саду', ru: 'В сад', en: 'To the garden' })}</button>
          <span className={s.stars}><StarIcon /> {stars}</span>
        </div>
        <h2 className={s.h2}>{t({ uk: 'Обери тему', ru: 'Выбери тему', en: 'Pick a topic' })}</h2>
        <p className={s.hint}>{t({ uk: `${ROUND_TASKS} коротких завдань. Кожна правильна відповідь дає зірочку.`, ru: `${ROUND_TASKS} коротких заданий. Каждый правильный ответ даёт звёздочку.`, en: `${ROUND_TASKS} quick tasks. Every right answer gives you a star.` })}</p>
        <div className={s.topics}>
          {reviewCount > 0 && (
            <button type="button" className={`${s.topic} ${s.topicReview}`} onClick={() => start('review')}>
              <span className={s.topicName}>{t({ uk: 'Повторення', ru: 'Повторение', en: 'Review' })}</span>
              <span className={s.topicSub}>{t({ uk: `Слова з помилками: ${reviewCount}`, ru: `Слова с ошибками: ${reviewCount}`, en: `Tricky words: ${reviewCount}` })}</span>
            </button>
          )}
          {GARDEN_TOPICS.map((tp) => {
            const learned = tp.words.filter((x) => { const st = save.stats[`${tp.id}:${x.en}`]; return st && st.r >= 2 && st.w === 0; }).length;
            return (
              <button key={tp.id} type="button" className={s.topic} onClick={() => start(tp.id)}>
                <span className={s.topicName}>{t(tp.title)}</span>
                <span className={s.topicEn}>{GARDEN_TOPICS.find((x) => x.id === tp.id)!.title.en}</span>
                <span className={s.meter} aria-hidden="true"><i style={{ width: `${(learned / tp.words.length) * 100}%` }} /></span>
                <span className={s.topicSub}>{t({ uk: `Вивчено ${learned} з ${tp.words.length}`, ru: `Выучено ${learned} из ${tp.words.length}`, en: `${learned} of ${tp.words.length} learned` })}{tp.older ? ` · ${t({ uk: 'для старших', ru: 'для старших', en: 'for older kids' })}` : ''}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ----- результат ----- */
  if (screen === 'result') {
    return (
      <div className={s.wrap}>
        <div className={s.result}>
          <div className={s.resultCat}>{cat}</div>
          <div>
            <h2 className={s.h2}>{earned >= ROUND_TASKS ? 'Perfect!' : earned >= 5 ? 'Great job!' : 'Good try!'}</h2>
            <p className={s.big}>+{earned + bonus} <StarIcon /></p>
            {bonus > 0 && <p className={s.hint}>{t({ uk: 'Бонус за майже ідеальний раунд: +2', ru: 'Бонус за почти идеальный раунд: +2', en: 'Bonus for a great round: +2' })}</p>}
            {missed.length > 0 && (
              <>
                <p className={s.hint}>{t({ uk: 'Ці слова повернуться частіше:', ru: 'Эти слова вернутся чаще:', en: 'These words will come back more often:' })}</p>
                <div className={s.missed}>
                  {missed.map((x) => <button key={x.en} type="button" className={s.wordChip} onClick={() => say(x.en)}><SpeakIcon /> {x.en} <span className={s.dim}>{nat(x)}</span></button>)}
                </div>
              </>
            )}
            <div className={s.row}>
              <button type="button" className={`${s.btn} ${s.btnMain}`} onClick={() => setScreen('garden')}>{t({ uk: 'До саду', ru: 'В сад', en: 'To the garden' })}</button>
              <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => start(topic)}>{t({ uk: 'Ще раунд', ru: 'Ещё раунд', en: 'One more round' })}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ----- раунд ----- */
  const task = tasks[step];
  return (
    <div className={s.wrap}>
      <div className={s.bar}>
        <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => { stopSpeak(); setScreen('topics'); }}>{t({ uk: 'Вийти', ru: 'Выйти', en: 'Quit' })}</button>
        <div className={s.dots} aria-label={`${step + 1} / ${tasks.length}`}>
          {tasks.map((_, i) => <i key={i} className={i < step ? s.dotDone : i === step ? s.dotNow : ''} />)}
        </div>
        <span className={s.stars}><StarIcon /> +{earned}</span>
      </div>
      {task && (
        <TaskView
          key={step}
          task={task}
          nat={nat}
          answer={answer}
          onAnswer={(a, words) => { if (answer) return; setAnswer(a); mark(words, a.ok); finishTask(a.ok); }}
          onNext={next}
          last={step + 1 >= tasks.length}
        />
      )}
    </div>
  );
}

/* ---------- одне завдання ---------- */
function TaskView({ task, nat, answer, onAnswer, onNext, last }: { task: Task; nat: (x: W) => string; answer: Answer | null; onAnswer: (a: Answer, words: W[]) => void; onNext: () => void; last: boolean }) {
  const t = useT();
  const nextBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (answer) nextBtn.current?.focus(); }, [answer]);
  // правильна відповідь: коротка пауза і далі; помилка: чекаємо кнопку
  useEffect(() => {
    if (!answer?.ok) return;
    const id = setTimeout(onNext, 1300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  const word = task.kind === 'match' ? null : task.word;
  useEffect(() => {
    if (task.kind === 'listen' || task.kind === 'spell') { const id = setTimeout(() => say(task.word.en), 250); return () => clearTimeout(id); }
    if (task.kind === 'translate') { const id = setTimeout(() => say(task.word.en), 250); return () => clearTimeout(id); }
  }, [task]);

  const title: Record<Kind, string> = {
    listen: t({ uk: 'Послухай і обери слово', ru: 'Послушай и выбери слово', en: 'Listen and choose the word' }),
    translate: t({ uk: 'Обери переклад', ru: 'Выбери перевод', en: 'Choose the translation' }),
    reverse: t({ uk: 'Як це англійською?', ru: 'Как это по-английски?', en: 'How do you say it in English?' }),
    spell: t({ uk: 'Склади слово з літер', ru: 'Составь слово из букв', en: 'Spell the word' }),
    match: t({ uk: 'Знайди пари', ru: 'Найди пары', en: 'Match the pairs' }),
  };

  const feedback = answer && (
    <div className={`${s.feedback} ${answer.ok ? s.fbOk : s.fbNo}`} role="status">
      <span>{answer.ok ? pickPraise() : word ? <>{t({ uk: 'Правильно', ru: 'Правильно', en: 'Correct answer' })}: <b>{word.en}</b> = {nat(word)}</> : t({ uk: 'Майже! Пари запам’ятаємо.', ru: 'Почти! Пары запомним.', en: 'Almost! We will practise these.' })}</span>
      <button ref={nextBtn} type="button" className={`${s.btn} ${s.btnMain}`} onClick={onNext}>{last ? t({ uk: 'Готово', ru: 'Готово', en: 'Finish' }) : t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })}</button>
    </div>
  );

  return (
    <section className={s.task} aria-labelledby="mg-task-title">
      <h2 id="mg-task-title" className={s.taskTitle}>{title[task.kind]}</h2>
      {task.kind === 'match' ? (
        <MatchView task={task} nat={nat} done={!!answer} onDone={(ok, wrong) => onAnswer({ ok }, ok ? task.words : wrong)} />
      ) : task.kind === 'spell' ? (
        <SpellView task={task} nat={nat} done={!!answer} onDone={(ok) => onAnswer({ ok }, [task.word])} />
      ) : (
        <ChoiceView task={task} nat={nat} answer={answer} onPick={(x) => { const ok = x.en === task.word.en; say(task.word.en); onAnswer({ ok, picked: x.en }, [task.word]); }} />
      )}
      {feedback}
    </section>
  );
}

const PRAISE = ['Great!', 'Well done!', 'Yes!', 'Super!', 'You got it!', 'Nice!'];
function pickPraise() { return PRAISE[Math.floor(Math.random() * PRAISE.length)]; }

function ChoiceView({ task, nat, answer, onPick }: { task: Extract<Task, { options: W[] }>; nat: (x: W) => string; answer: Answer | null; onPick: (x: W) => void }) {
  const t = useT();
  const showEn = task.kind !== 'translate';
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (answer) return;
      const n = Number(e.key);
      if (n >= 1 && n <= task.options.length) { e.preventDefault(); onPick(task.options[n - 1]); }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [answer, task, onPick]);
  return (
    <>
      <div className={s.prompt}>
        {task.kind === 'listen' && (
          <button type="button" className={s.speakBig} onClick={() => say(task.word.en)} aria-label={t({ uk: 'Послухати ще раз', ru: 'Послушать ещё раз', en: 'Listen again' })}><SpeakIcon big /></button>
        )}
        {task.kind === 'translate' && (
          <button type="button" className={s.promptWord} onClick={() => say(task.word.en)}><SpeakIcon /> {task.word.en}</button>
        )}
        {task.kind === 'reverse' && <div className={s.promptNative}>{nat(task.word)}</div>}
      </div>
      <div className={s.options}>
        {task.options.map((x, i) => {
          const right = answer && x.en === task.word.en;
          const wrong = answer && answer.picked === x.en && !answer.ok;
          return (
            <button key={x.en} type="button" disabled={!!answer} className={`${s.opt} ${right ? s.optOk : ''} ${wrong ? s.optNo : ''}`} onClick={() => onPick(x)} lang={showEn ? 'en' : undefined}>
              <span className={s.optNum} aria-hidden="true">{i + 1}</span>{showEn ? x.en : nat(x)}
            </button>
          );
        })}
      </div>
    </>
  );
}

function SpellView({ task, nat, done, onDone }: { task: Extract<Task, { kind: 'spell' }>; nat: (x: W) => string; done: boolean; onDone: (ok: boolean) => void }) {
  const t = useT();
  const [used, setUsed] = useState<number[]>([]);
  const [shake, setShake] = useState(false);
  const target = task.word.en;
  const typed = used.map((id) => task.letters.find((l) => l.id === id)!.ch).join('');
  const add = useCallback((id: number) => { if (done) return; setUsed((u) => (u.includes(id) || u.length >= target.length ? u : u.concat(id))); }, [done, target.length]);
  const back = useCallback(() => { if (!done) setUsed((u) => u.slice(0, -1)); }, [done]);
  useEffect(() => {
    if (done || typed.length !== target.length) return;
    const ok = typed === target;
    if (!ok) { setShake(true); setTimeout(() => setShake(false), 500); }
    say(target);
    onDone(ok);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed]);
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (done) return;
      if (e.key === 'Backspace') { e.preventDefault(); back(); return; }
      const ch = e.key.toLowerCase();
      if (!/^[a-z]$/.test(ch)) return;
      const free = task.letters.find((l) => l.ch === ch && !used.includes(l.id));
      if (free) { e.preventDefault(); add(free.id); }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [done, used, task.letters, add, back]);
  return (
    <>
      <div className={s.prompt}>
        <button type="button" className={s.speakSmall} onClick={() => say(target)} aria-label={t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}><SpeakIcon /></button>
        <div className={s.promptNative}>{nat(task.word)}</div>
      </div>
      <div className={`${s.slots} ${shake ? s.shake : ''}`} aria-label={typed || t({ uk: 'Порожньо', ru: 'Пусто', en: 'Empty' })}>
        {target.split('').map((ch, i) => (
          <span key={i} className={`${s.slot} ${done ? (typed === target ? s.slotOk : s.slotNo) : ''}`}>{done && typed !== target ? ch : typed[i] ?? ''}</span>
        ))}
      </div>
      <div className={s.tiles}>
        {task.letters.map((l) => (
          <button key={l.id} type="button" className={s.tile} disabled={done || used.includes(l.id)} onClick={() => add(l.id)} aria-label={l.ch}>{l.ch}</button>
        ))}
        <button type="button" className={`${s.tile} ${s.tileBack}`} disabled={done || !used.length} onClick={back} aria-label={t({ uk: 'Стерти літеру', ru: 'Стереть букву', en: 'Delete a letter' })}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-6-6z M12 10l4 4M16 10l-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </>
  );
}

function MatchView({ task, nat, done, onDone }: { task: Extract<Task, { kind: 'match' }>; nat: (x: W) => string; done: boolean; onDone: (ok: boolean, wrong: W[]) => void }) {
  const [left, setLeft] = useState<string | null>(null);
  const [right, setRight] = useState<string | null>(null);
  const [paired, setPaired] = useState<string[]>([]);
  const [bad, setBad] = useState<string[]>([]);
  const [flash, setFlash] = useState<string | null>(null);
  useEffect(() => {
    if (!left || !right) return;
    if (left === right) {
      const np = paired.concat(left);
      setPaired(np);
      setLeft(null); setRight(null);
      if (np.length === task.words.length && !done) onDone(bad.length === 0, task.words.filter((x) => bad.includes(x.en)));
    } else {
      setBad((b) => (b.includes(left) ? b : b.concat(left)));
      setFlash(`${left}|${right}`);
      const id = setTimeout(() => { setFlash(null); setLeft(null); setRight(null); }, 600);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, right]);
  const fl = flash?.split('|');
  return (
    <div className={s.match}>
      <div className={s.col}>
        {task.words.map((x) => (
          <button key={x.en} type="button" lang="en" disabled={paired.includes(x.en) || !!flash}
            className={`${s.opt} ${paired.includes(x.en) ? s.optOk : ''} ${left === x.en ? s.optSel : ''} ${fl?.[0] === x.en ? s.optNo : ''}`}
            onClick={() => { say(x.en); setLeft(x.en); }}>{x.en}</button>
        ))}
      </div>
      <div className={s.col}>
        {task.right.map((x) => (
          <button key={x.en} type="button" disabled={paired.includes(x.en) || !!flash}
            className={`${s.opt} ${paired.includes(x.en) ? s.optOk : ''} ${right === x.en ? s.optSel : ''} ${fl?.[1] === x.en ? s.optNo : ''}`}
            onClick={() => setRight(x.en)}>{nat(x)}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------- іконки ---------- */
function StarIcon({ small }: { small?: boolean }) {
  const z = small ? 16 : 22;
  return <svg viewBox="0 0 24 24" width={z} height={z} aria-hidden="true" className={s.starIc}><path d={starPath(12, 12.6, 10.5)} fill={YELLOW} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" /></svg>;
}
function SpeakIcon({ big }: { big?: boolean }) {
  const z = big ? 44 : 20;
  return (
    <svg viewBox="0 0 24 24" width={z} height={z} aria-hidden="true">
      <path d="M4 9h3l5-4v14l-5-4H4z" fill={LAV} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
