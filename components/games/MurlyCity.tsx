'use client';
// Гра «Murly City»: настільна гра для розмовних уроків. Гравці кидають кубик, ходять містом,
// виконують усні завдання й купують місця. Один екран: урок через демонстрацію екрана або 2-4 гравці по черзі.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useT } from '../LangProvider';
import MurlyCat from '../MurlyCat';
import { say, stopSpeak } from '@/lib/speak';
import { CELLS, DECKS, SIDE_COLOR, deckById, priceOf, type CityTask, type DeckId, type PlaceId } from '@/lib/city-decks';
import s from './MurlyCity.module.css';

const INK = '#1B2140';
const PAPER = '#EEF0FA';
const VIOLET = '#534AB7';
const N = CELLS.length;
const PASS_BONUS = 40;
const START_COINS = 200;
const MURLY_REWARD = 20;
const OWN_REWARD = 10;
const SAVE_KEY = 'murly-city-game';
const SETUP_KEY = 'murly-city-setup';

export const TOKEN_COLORS = [
  { id: 'violet', hex: '#534AB7', dark: true, name: { uk: 'фіолетовий', ru: 'фиолетовый', en: 'violet' } },
  { id: 'pink', hex: '#F4C0D1', dark: false, name: { uk: 'рожевий', ru: 'розовый', en: 'pink' } },
  { id: 'green', hex: '#9ED9A4', dark: false, name: { uk: 'зелений', ru: 'зелёный', en: 'green' } },
  { id: 'yellow', hex: '#F7D46B', dark: false, name: { uk: 'жовтий', ru: 'жёлтый', en: 'yellow' } },
  { id: 'lavender', hex: '#AFC3F0', dark: false, name: { uk: 'блакитний', ru: 'голубой', en: 'lavender' } },
  { id: 'ink', hex: '#1B2140', dark: true, name: { uk: 'темно-синій', ru: 'тёмно-синий', en: 'navy' } },
];
const colorOf = (id: string) => TOKEN_COLORS.find((c) => c.id === id) ?? TOKEN_COLORS[0];

type Player = { name: string; color: string; pos: number; coins: number; skip: boolean };
type Card =
  | { kind: 'buy'; cell: number }
  | { kind: 'own'; cell: number }
  | { kind: 'rent'; cell: number; owner: number; rent: number }
  | { kind: 'murly'; idx: number }
  | { kind: 'lucky'; amount: number }
  | { kind: 'coffee' }
  | { kind: 'bike' }
  | { kind: 'start' };
type L3 = { uk: string; ru: string; en: string };
type Game = {
  deck: DeckId;
  players: Player[];
  owners: (number | null)[];
  turn: number;
  round: number;
  rounds: number; // 0 = без обмеження
  endAt: number | null; // кінець за часом (мс)
  murly: number[];
  murlyAt: number;
  card: Card | null;
  log: L3[];
  over: boolean;
};
type Setup = { players: { name: string; color: string }[]; deck: DeckId; rounds: number; minutes: number; autoRead: boolean };

const DEFAULT_SETUP: Setup = {
  players: [{ name: 'Player 1', color: 'violet' }, { name: 'Player 2', color: 'pink' }],
  deck: 'renting', rounds: 6, minutes: 0, autoRead: false,
};

const shuffle = <V,>(a: V[]) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const initial = (name: string) => (name.trim()[0] || '?').toUpperCase();

// Хто володіє всією стороною: тоді оренда подвійна
function rentFor(g: Game, cell: number) {
  const side = CELLS[cell].side;
  const owner = g.owners[cell];
  const all = CELLS.every((c, i) => c.kind !== 'place' || c.side !== side || g.owners[i] === owner);
  return (priceOf(cell) / 2) * (all ? 2 : 1);
}
const propertyValue = (g: Game, p: number) => g.owners.reduce<number>((sum, o, i) => sum + (o === p ? priceOf(i) : 0), 0);

/* ---------------- Поле (SVG) ---------------- */

const CS = 100; // розмір клітинки у viewBox
export function cellXY(i: number): [number, number] {
  if (i <= 6) return [i, 0];
  if (i <= 11) return [6, i - 6];
  if (i <= 18) return [18 - i, 6];
  return [0, 24 - i];
}

const st = { stroke: INK, strokeWidth: 2.4, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

// Іконки місць: прості малюнки в нашому стилі, у квадраті 48 x 48 з центром у (0, 0)
function PlaceIcon({ id }: { id: PlaceId }) {
  switch (id) {
    case 'cafe': return (<g {...st}>
      <path d="M-15 -4h24v8a11 11 0 0 1-11 11h-2a11 11 0 0 1-11-11z" fill="#F4C0D1" />
      <path d="M9 -1h3a5 5 0 0 1 0 10h-4" fill="none" />
      <path d="M-18 18h30" fill="none" />
      <path d="M-8 -10q-3-4 0-8M-1 -10q-3-4 0-8" fill="none" />
    </g>);
    case 'bakery': return (<g {...st}>
      <path d="M-19 12q-3-22 19-24q22 2 19 24z" fill="#F7D46B" />
      <path d="M-9 -4l4 9M0 -7l4 10M9 -4l3 8" fill="none" />
    </g>);
    case 'park': return (<g {...st}>
      <path d="M-2 4h4v15h-4z" fill={INK} />
      <path d="M0 -18a10 10 0 0 1 10 8a9 9 0 0 1 1 16h-22a9 9 0 0 1 1-16a10 10 0 0 1 10-8z" fill="#9ED9A4" />
      <path d="M-16 19h32" fill="none" />
    </g>);
    case 'library': return (<g {...st}>
      <rect x="-17" y="-14" width="9" height="31" rx="1.5" fill="#AFC3F0" />
      <rect x="-8" y="-9" width="9" height="26" rx="1.5" fill="#F4C0D1" />
      <rect x="4" y="-12" width="9" height="29" rx="1.5" fill="#F7D46B" transform="rotate(14 8 17)" />
      <path d="M-15 -8h5M-6 -3h5" fill="none" />
      <path d="M-20 17h40" fill="none" />
    </g>);
    case 'cinema': return (<g {...st}>
      <rect x="-17" y="-4" width="34" height="21" rx="2" fill="#AFC3F0" />
      <path d="M-17 -4l-2-9l33-6l2 9z" fill="#fff" />
      <path d="M-12 -12l5 6M-3 -14l5 7M6 -15l5 7" fill="none" />
      <path d="M-10 5h20M-10 11h12" fill="none" />
    </g>);
    case 'museum': return (<g {...st}>
      <path d="M-20 -6l20-13l20 13z" fill="#F4C0D1" />
      <path d="M-14 -3v15M-5 -3v15M5 -3v15M14 -3v15" fill="none" />
      <path d="M-20 -6h40M-21 13h42v5h-42z" fill="#fff" />
    </g>);
    case 'station': return (<g {...st}>
      <rect x="-14" y="-18" width="28" height="31" rx="7" fill="#AFC3F0" />
      <rect x="-9" y="-13" width="18" height="10" rx="2" fill="#fff" />
      <circle cx="-7" cy="5" r="2.5" fill="#F7D46B" />
      <circle cx="7" cy="5" r="2.5" fill="#F7D46B" />
      <path d="M-9 13l-6 7M9 13l6 7M-12 20h24" fill="none" />
    </g>);
    case 'market': return (<g {...st}>
      <path d="M-18 -4v20h36v-20" fill="#fff" />
      <path d="M-20 -14h40l-2 10h-36z" fill="#F4C0D1" />
      <path d="M-11 -14l-1 10M0 -14v10M11 -14l1 10" fill="none" />
      <circle cx="-8" cy="9" r="4" fill="#9ED9A4" />
      <circle cx="1" cy="9" r="4" fill="#F7D46B" />
      <circle cx="10" cy="9" r="4" fill="#F4C0D1" />
    </g>);
    case 'flat': return (<g {...st}>
      <rect x="-13" y="-20" width="26" height="39" rx="2" fill="#9ED9A4" />
      {[-14, -5, 4].map((y) => [-8, 3].map((x) => <rect key={`${x}${y}`} x={x} y={y} width="5" height="5" fill="#fff" strokeWidth="1.8" />))}
      <path d="M-3 19v-6h6v6" fill="#fff" />
    </g>);
    case 'supermarket': return (<g {...st}>
      <path d="M-20 -14h6l5 22h21l4-15h-28" fill="none" />
      <path d="M-11 -7h25l-3 12h-19z" fill="#9ED9A4" />
      <circle cx="-6" cy="15" r="3" fill="#fff" />
      <circle cx="9" cy="15" r="3" fill="#fff" />
    </g>);
    case 'pool': return (<g {...st}>
      <path d="M4 -19v26M14 -19v26M4 -11h10M4 -3h10" fill="none" />
      <path d="M-20 9q5-4 10 0t10 0t10 0t10 0v10h-40z" fill="#AFC3F0" />
      <path d="M-18 17q4-3 8 0t8 0" fill="none" strokeWidth="1.8" />
    </g>);
    case 'school': return (<g {...st}>
      <path d="M-19 -2l19-14l19 14v20h-38z" fill="#F7D46B" />
      <circle cx="0" cy="-3" r="5" fill="#fff" />
      <path d="M0 -6v3l2 1" fill="none" strokeWidth="1.6" />
      <path d="M-5 18v-9h10v9" fill="#fff" />
      <rect x="-15" y="4" width="6" height="6" fill="#fff" strokeWidth="1.8" />
      <rect x="9" y="4" width="6" height="6" fill="#fff" strokeWidth="1.8" />
    </g>);
    case 'hotel': return (<g {...st}>
      <path d="M-20 -14v32M20 4v14" fill="none" />
      <path d="M-20 4h40v8h-40z" fill="#AFC3F0" />
      <rect x="-17" y="-5" width="12" height="9" rx="3.5" fill="#fff" />
      <path d="M-4 4v-7a3 3 0 0 1 3-3h17a4 4 0 0 1 4 4v6" fill="#F4C0D1" />
    </g>);
    case 'post': return (<g {...st}>
      <rect x="-19" y="-12" width="38" height="27" rx="3" fill="#fff" />
      <path d="M-19 -10l19 13l19-13" fill="none" />
      <rect x="8" y="-9" width="7" height="7" fill="#F4C0D1" strokeWidth="1.6" />
    </g>);
    case 'flowers': return (<g {...st}>
      <path d="M-11 6h22l-3 13h-16z" fill="#F7D46B" />
      <path d="M0 6v-10M-8 6l-2-8M8 6l2-8" fill="none" />
      <circle cx="0" cy="-10" r="6" fill="#F4C0D1" />
      <circle cx="-11" cy="-5" r="5" fill="#AFC3F0" />
      <circle cx="11" cy="-5" r="5" fill="#9ED9A4" />
      <circle cx="0" cy="-10" r="1.8" fill={INK} stroke="none" />
    </g>);
    case 'airport': return (<g {...st}>
      <path d="M-2 -20q2-3 4 0l1 13l17 9v5l-17-4l-1 10l5 4v3l-7-2l-7 2v-3l5-4l-1-10l-17 4v-5l17-9z" fill="#fff" />
      <path d="M-1 -12h2" fill="none" />
    </g>);
  }
}

// Знак картки Murly: картка з котячими вушками
function MurlyMark({ big = false }: { big?: boolean }) {
  const k = big ? 1.25 : 1;
  return (<g transform={`scale(${k})`} {...st}>
    <path d="M-14 -12l3-9l6 6h10l6-6l3 9" fill={VIOLET} />
    <rect x="-16" y="-14" width="32" height="32" rx="6" fill={VIOLET} />
    <circle cx="-6" cy="0" r="2.6" fill="#fff" stroke="none" />
    <circle cx="6" cy="0" r="2.6" fill="#fff" stroke="none" />
    <path d="M-3 6q3 3 6 0" stroke="#fff" fill="none" strokeWidth="2" />
    <path d="M-9 12h18" stroke="#F4C0D1" fill="none" strokeWidth="2.4" />
  </g>);
}

function CornerArt({ kind }: { kind: string }) {
  switch (kind) {
    case 'start': return (<g {...st}>
      <path d="M-26 -6h30v-10l22 18l-22 18v-10h-30z" fill={VIOLET} />
    </g>);
    case 'coffee': return (<g {...st}>
      <path d="M-18 -8h30v12a14 14 0 0 1-14 14h-2a14 14 0 0 1-14-14z" fill="#fff" />
      <path d="M12 -4h4a6 6 0 0 1 0 12h-5" fill="none" />
      <path d="M-22 22h38" fill="none" />
      <path d="M-3 -14c-4-4-10 0-6 5l6 5l6-5c4-5-2-9-6-5z" fill="#F4C0D1" transform="translate(0 -6)" />
    </g>);
    case 'lucky': return (<g {...st}>
      {[12, 4, -4].map((y) => <ellipse key={y} cx="-6" cy={y} rx="14" ry="5" fill="#F7D46B" />)}
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="#F7D46B" />
      <path d="M14 -18v10M9 -13h10M24 -6v6M21 -3h6" fill="none" />
    </g>);
    case 'bike': return (<g {...st}>
      <circle cx="-15" cy="8" r="11" fill="#fff" />
      <circle cx="15" cy="8" r="11" fill="#fff" />
      <path d="M-15 8l9-16h17l4 16M-6 -8l9 16l8-16M-9 -13h7M11 -8l-2-6h6" fill="none" />
    </g>);
  }
  return null;
}

const CORNER_FILL: Record<string, string> = { start: '#F7D46B', coffee: '#F4C0D1', lucky: '#9ED9A4', bike: '#AFC3F0' };

type BoardProps = { owners: (number | null)[]; players: Player[]; turn: number; focus: number | null };

export function CityBoard({ owners, players, turn, focus }: BoardProps) {
  const label = 'Murly City board';
  return (
    <svg className={s.svg} viewBox="-6 -6 712 712" role="img" aria-label={label}>
      <defs>
        <pattern id="mc-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.6" fill="#AFC3F0" />
        </pattern>
      </defs>
      <rect x="-4" y="-4" width="708" height="708" rx="26" fill={PAPER} stroke={INK} strokeWidth="4" />
      <rect x="100" y="100" width="500" height="500" fill="url(#mc-dots)" />
      {/* дорога всередині кола */}
      <rect x="112" y="112" width="476" height="476" rx="20" fill="none" stroke="#AFC3F0" strokeWidth="6" strokeDasharray="14 12" />
      {/* дерева й будиночки в кутах центру */}
      <Deco x={150} y={150} kind="tree" />
      <Deco x={550} y={150} kind="house" />
      <Deco x={150} y={550} kind="house" />
      <Deco x={550} y={550} kind="tree" />

      {CELLS.map((c, i) => {
        const [cx, cy] = cellXY(i);
        const x = cx * CS, y = cy * CS;
        const corner = c.kind !== 'place' && c.kind !== 'murly';
        const owner = owners[i];
        const oc = owner != null && players[owner] ? colorOf(players[owner].color) : null;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <title>{c.kind === 'place' ? `${c.name}, ${priceOf(i)} coins${oc ? `, owned by ${players[owner!].name}` : ''}` : c.name}</title>
            <rect x="4" y="4" width={CS - 8} height={CS - 8} rx="12" fill={corner ? CORNER_FILL[c.kind] : '#fff'} stroke={focus === i ? VIOLET : INK} strokeWidth={focus === i ? 5 : 2.4} />
            {c.kind === 'place' && <path d={`M4 30v-14a12 12 0 0 1 12-12h${CS - 32}a12 12 0 0 1 12 12v14z`} fill={SIDE_COLOR[c.side]} stroke={INK} strokeWidth="2.4" />}
            {c.kind === 'murly' && <path d={`M4 30v-14a12 12 0 0 1 12-12h${CS - 32}a12 12 0 0 1 12 12v14z`} fill={VIOLET} stroke={INK} strokeWidth="2.4" />}
            {oc && <path d="M4 70h92v14a12 12 0 0 1-12 12h-68a12 12 0 0 1-12-12z" fill={oc.hex} stroke={INK} strokeWidth="2.4" />}
            {c.kind === 'place' && <>
              <g transform="translate(50 50) scale(.76)"><PlaceIcon id={c.place!} /></g>
              <text x="50" y="22" textAnchor="middle" className={s.cellName} fill={INK} fontSize={c.name.length > 9 ? 12 : 14}>{c.name}</text>
              <g transform="translate(50 88)">
                <circle cx="-14" cy="-4.5" r="6" fill="#F7D46B" stroke={INK} strokeWidth="1.8" />
                <text x="-5" y="0" className={s.cellPrice} fontSize="13" fill={oc?.dark ? '#fff' : INK}>{priceOf(i)}</text>
              </g>
            </>}
            {c.kind === 'murly' && <>
              <text x="50" y="22" textAnchor="middle" className={s.cellName} fontSize="13" fill="#fff">Murly card</text>
              <g transform="translate(50 64)"><MurlyMark /></g>
            </>}
            {corner && <>
              <g transform="translate(50 46)"><CornerArt kind={c.kind} /></g>
              <text x="50" y="86" textAnchor="middle" className={s.cellName} fill={INK} fontSize={c.name.length > 7 ? 13 : 16}>{c.name}</text>
            </>}
            {oc && <g transform="translate(78 36)">
              <path d="M0 30V0" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
              <path d="M0 0h16l-5 6l5 6h-16z" fill={oc.hex} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
            </g>}
          </g>
        );
      })}

      {/* фішки гравців: плавно переходять з клітинки на клітинку */}
      {players.map((p, pi) => {
        const [cx, cy] = cellXY(p.pos);
        const here = players.map((q, qi) => ({ q, qi })).filter((o) => o.q.pos === p.pos);
        const k = here.findIndex((o) => o.qi === pi);
        const off = here.length === 1 ? [[0, 0]] : [[-16, -12], [16, -12], [-16, 14], [16, 14]];
        const [ox, oy] = off[k] ?? [0, 0];
        const c = colorOf(p.color);
        const tx = cx * CS + 50 + ox, ty = cy * CS + 56 + oy;
        return (
          <g key={pi} className={s.token} style={{ transform: `translate(${tx}px, ${ty}px)` }}>
            <g className={pi === turn ? s.tokenNow : undefined}>
              <ellipse cx="0" cy="13" rx="12" ry="4" fill={INK} opacity=".18" />
              <circle r="14" fill={c.hex} stroke={INK} strokeWidth="3" />
              <circle cx="-4" cy="-5" r="4" fill="#fff" opacity=".55" />
              <text y="5" textAnchor="middle" className={s.tokenText} fill={c.dark ? '#fff' : INK}>{initial(p.name)}</text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function Deco({ x, y, kind }: { x: number; y: number; kind: 'tree' | 'house' }) {
  return (
    <g transform={`translate(${x} ${y})`} {...st} opacity=".9">
      {kind === 'tree' ? (<>
        <path d="M-2 4h4v12h-4z" fill={INK} />
        <circle cy="-6" r="13" fill="#9ED9A4" />
        <circle cx="16" cy="6" r="8" fill="#9ED9A4" />
      </>) : (<>
        <path d="M-16 -2l16-14l16 14v18h-32z" fill="#F4C0D1" />
        <rect x="-5" y="5" width="10" height="11" fill="#fff" />
      </>)}
    </g>
  );
}

/* ---------------- Кубик ---------------- */

const PIPS: Record<number, number[]> = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
function Die({ face, rolling }: { face: number; rolling: boolean }) {
  return (
    <div className={`${s.die} ${rolling ? s.dieRoll : ''}`} aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => <span key={i} className={PIPS[face].includes(i) ? s.pip : undefined} />)}
    </div>
  );
}

function Coin() {
  return <svg className={s.coin} viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#F7D46B" stroke={INK} strokeWidth="2" /><path d="M12.5 7.2a3.6 3.6 0 1 0 0 5.6" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" /></svg>;
}
function Token({ color, name, size = 26 }: { color: string; name: string; size?: number }) {
  const c = colorOf(color);
  return <span className={s.tokenChip} style={{ width: size, height: size, background: c.hex, color: c.dark ? '#fff' : INK, fontSize: size * 0.46 }} aria-hidden="true">{initial(name)}</span>;
}

/* ---------------- Гра ---------------- */

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function MurlyCity() {
  const t = useT();
  const [setup, setSetup] = useState<Setup>(DEFAULT_SETUP);
  const [g, setG] = useState<Game | null>(null);
  const [saved, setSaved] = useState<Game | null>(null);
  const [face, setFace] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [moving, setMoving] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [askEnd, setAskEnd] = useState(false);
  const [live, setLive] = useState('');
  const timers = useRef<number[]>([]);
  const gRef = useRef<Game | null>(null);
  gRef.current = g;
  const dialogRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLButtonElement>(null);

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  useEffect(() => () => { timers.current.forEach(clearTimeout); stopSpeak(); }, []);

  // збережене налаштування й незавершена гра
  useEffect(() => {
    try {
      const su = JSON.parse(localStorage.getItem(SETUP_KEY) || 'null');
      if (su && Array.isArray(su.players)) setSetup({ ...DEFAULT_SETUP, ...su });
      const sg = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
      if (sg && Array.isArray(sg.players) && !sg.over) setSaved(sg);
    } catch { /* */ }
  }, []);
  useEffect(() => {
    if (!g || moving || rolling) return;
    try { if (g.over) localStorage.removeItem(SAVE_KEY); else localStorage.setItem(SAVE_KEY, JSON.stringify(g)); } catch { /* */ }
  }, [g, moving, rolling]);

  // таймер гри
  useEffect(() => {
    if (!g?.endAt || g.over) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [g?.endAt, g?.over]);
  const timeUp = !!g?.endAt && now >= g.endAt;

  const deck = deckById(g?.deck ?? setup.deck);
  const taskOf = (card: Card | null): CityTask | null => {
    if (!card) return null;
    if (card.kind === 'buy' || card.kind === 'own' || card.kind === 'rent') return deck.tasks[CELLS[card.cell].place!];
    if (card.kind === 'murly') return deck.cards[card.idx];
    return null;
  };

  // фокус у вікні картки
  useEffect(() => {
    if (!g?.card) return;
    setShowHint(false);
    const id = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('[data-first]')?.focus(), 30);
    const task = taskOf(g.card);
    if (task && setup.autoRead) say(task.en);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [g?.card]);

  const log = (game: Game, e: L3): Game => ({ ...game, log: [e, ...game.log].slice(0, 30) });

  /* ----- старт ----- */
  const start = (from?: Setup) => {
    const su = from ?? setup;
    const players = su.players.map((p, i) => ({ name: p.name.trim() || `Player ${i + 1}`, color: p.color, pos: 0, coins: START_COINS, skip: false }));
    try { localStorage.setItem(SETUP_KEY, JSON.stringify(su)); } catch { /* */ }
    const d = deckById(su.deck);
    setG({
      deck: su.deck, players, owners: CELLS.map(() => null), turn: 0, round: 1, rounds: su.rounds,
      endAt: su.minutes ? Date.now() + su.minutes * 60000 : null,
      murly: shuffle(d.cards.map((_, i) => i)), murlyAt: 0, card: null,
      log: [{ uk: `Гра почалася: ${d.title}`, ru: `Игра началась: ${d.title}`, en: `Game started: ${d.title}` }], over: false,
    });
    setNow(Date.now());
    setFace(1);
    setSaved(null);
    later(() => rollRef.current?.focus(), 60);
  };

  /* ----- приземлення на клітинку ----- */
  const land = useCallback((pi: number, cell: number) => {
    setG((game) => {
      if (!game) return game;
      const c = CELLS[cell];
      const p = game.players[pi];
      let card: Card;
      let next = game;
      if (c.kind === 'place') {
        const o = game.owners[cell];
        card = o == null ? { kind: 'buy', cell } : o === pi ? { kind: 'own', cell } : { kind: 'rent', cell, owner: o, rent: rentFor(game, cell) };
      } else if (c.kind === 'murly') {
        let order = game.murly, at = game.murlyAt;
        if (at >= order.length) { order = shuffle(order); at = 0; }
        card = { kind: 'murly', idx: order[at] };
        next = { ...game, murly: order, murlyAt: at + 1 };
      } else if (c.kind === 'lucky') {
        const amount = 20 + 10 * Math.floor(Math.random() * 4);
        card = { kind: 'lucky', amount };
        next = log({ ...game, players: game.players.map((q, i) => (i === pi ? { ...q, coins: q.coins + amount } : q)) },
          { uk: `${p.name}: Lucky street, +${amount}`, ru: `${p.name}: Lucky street, +${amount}`, en: `${p.name}: Lucky street, +${amount}` });
      } else if (c.kind === 'coffee') {
        card = { kind: 'coffee' };
        next = { ...game, players: game.players.map((q, i) => (i === pi ? { ...q, skip: true } : q)) };
      } else if (c.kind === 'bike') {
        card = { kind: 'bike' };
      } else {
        card = { kind: 'start' };
      }
      return { ...next, card };
    });
    setMoving(false);
  }, []);

  /* ----- рух фішки ----- */
  const walk = useCallback((pi: number, steps: number) => {
    const game = gRef.current;
    if (!game) return;
    setMoving(true);
    const from = game.players[pi].pos;
    const fast = reduceMotion();
    const delay = fast ? 70 : 260;
    for (let k = 1; k <= steps; k++) {
      later(() => {
        const pos = (from + k) % N;
        setG((cur) => {
          if (!cur) return cur;
          const passed = pos === 0;
          let next: Game = { ...cur, players: cur.players.map((q, i) => (i === pi ? { ...q, pos, coins: q.coins + (passed ? PASS_BONUS : 0) } : q)) };
          if (passed) next = log(next, { uk: `${q0(cur, pi)}: START, +${PASS_BONUS}`, ru: `${q0(cur, pi)}: START, +${PASS_BONUS}`, en: `${q0(cur, pi)}: START, +${PASS_BONUS}` });
          return next;
        });
        if (k === steps) later(() => land(pi, pos), fast ? 60 : 280);
      }, delay * k);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [land]);

  const busy = rolling || moving || !!g?.card || !!g?.over;

  const roll = () => {
    if (!g || busy) return;
    stopSpeak();
    setRolling(true);
    const n = 1 + Math.floor(Math.random() * 6);
    const fast = reduceMotion();
    const spins = fast ? 0 : 9;
    for (let k = 0; k < spins; k++) later(() => setFace(1 + Math.floor(Math.random() * 6)), 70 * k);
    later(() => {
      setFace(n);
      setRolling(false);
      const p = g.players[g.turn];
      setLive(t({ uk: `${p.name} викидає ${n}`, ru: `${p.name} выбрасывает ${n}`, en: `${p.name} rolls ${n}` }));
      setG((cur) => cur && log(cur, { uk: `${p.name} викидає ${n}`, ru: `${p.name} выбрасывает ${n}`, en: `${p.name} rolls ${n}` }));
      later(() => walk(g.turn, n), 250);
    }, 70 * spins + 80);
  };

  // клавіша R або пробіл поза кнопками: кинути кубик
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON') return;
      if (e.key === 'r' || e.key === 'R') { e.preventDefault(); rollRef.current?.click(); }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, []);

  /* ----- кінець ходу ----- */
  const endTurn = (mut?: (game: Game) => Game) => {
    stopSpeak();
    setG((cur) => {
      if (!cur) return cur;
      let game = mut ? mut(cur) : cur;
      game = { ...game, card: null };
      const n = game.players.length;
      let turn = game.turn, round = game.round;
      let players = game.players;
      for (let k = 0; k < n; k++) {
        turn = (turn + 1) % n;
        if (turn === 0) round += 1;
        if (players[turn].skip) {
          const name = players[turn].name;
          players = players.map((q, i) => (i === turn ? { ...q, skip: false } : q));
          game = log({ ...game, players }, { uk: `${name} пропускає хід (Coffee break)`, ru: `${name} пропускает ход (Coffee break)`, en: `${name} skips a turn (Coffee break)` });
          continue;
        }
        break;
      }
      const over = (game.rounds > 0 && round > game.rounds) || (!!game.endAt && Date.now() >= game.endAt);
      return { ...game, players, turn, round: over ? game.round : round, over };
    });
    later(() => rollRef.current?.focus(), 40);
  };

  const finishNow = () => { stopSpeak(); setAskEnd(false); setG((cur) => cur && { ...cur, card: null, over: true }); };

  /* ----- дії на картці ----- */
  const act = (kind: 'done' | 'skip' | 'pay' | 'ok') => {
    const game = g;
    if (!game?.card) return;
    const card = game.card;
    const pi = game.turn;
    const p = game.players[pi];
    const add = (gm: Game, who: number, d: number) => ({ ...gm, players: gm.players.map((q, i) => (i === who ? { ...q, coins: Math.max(0, q.coins + d) } : q)) });
    if (card.kind === 'bike') {
      setG({ ...game, card: null });
      later(() => walk(pi, 3), 120);
      return;
    }
    if (card.kind === 'buy') {
      const price = priceOf(card.cell);
      if (kind === 'done') {
        if (p.coins >= price) {
          return endTurn((gm) => log({ ...add(gm, pi, -price), owners: gm.owners.map((o, i) => (i === card.cell ? pi : o)) },
            { uk: `${p.name} купує ${CELLS[card.cell].name}`, ru: `${p.name} покупает ${CELLS[card.cell].name}`, en: `${p.name} buys the ${CELLS[card.cell].name}` }));
        }
        return endTurn((gm) => log(add(gm, pi, OWN_REWARD), { uk: `${p.name}: +${OWN_REWARD}`, ru: `${p.name}: +${OWN_REWARD}`, en: `${p.name}: +${OWN_REWARD}` }));
      }
      return endTurn();
    }
    if (card.kind === 'own') {
      if (kind === 'done') return endTurn((gm) => log(add(gm, pi, OWN_REWARD), { uk: `${p.name}: +${OWN_REWARD}`, ru: `${p.name}: +${OWN_REWARD}`, en: `${p.name}: +${OWN_REWARD}` }));
      return endTurn();
    }
    if (card.kind === 'rent') {
      const owner = game.players[card.owner];
      if (kind === 'pay') {
        const paid = Math.min(p.coins, card.rent);
        return endTurn((gm) => log(add(add(gm, pi, -paid), card.owner, paid), { uk: `${p.name} платить ${paid} гравцю ${owner.name}`, ru: `${p.name} платит ${paid} игроку ${owner.name}`, en: `${p.name} pays ${paid} to ${owner.name}` }));
      }
      return endTurn((gm) => log(gm, { uk: `${p.name} виконує завдання ${owner.name}`, ru: `${p.name} выполняет задание ${owner.name}`, en: `${p.name} does ${owner.name}'s task` }));
    }
    if (card.kind === 'murly') {
      if (kind === 'done') return endTurn((gm) => log(add(gm, pi, MURLY_REWARD), { uk: `${p.name}: Murly card, +${MURLY_REWARD}`, ru: `${p.name}: Murly card, +${MURLY_REWARD}`, en: `${p.name}: Murly card, +${MURLY_REWARD}` }));
      return endTurn();
    }
    endTurn();
  };

  // утримуємо Tab усередині вікна картки
  const trap = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled])'));
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  /* ================= Екрани ================= */

  if (!g) return <SetupScreen setup={setup} setSetup={setSetup} onStart={() => start()} saved={saved} onContinue={() => { if (saved) { setG(saved); setSaved(null); } }} />;

  if (g.over) return <FinalScreen g={g} onAgain={() => start({ ...setup, players: g.players.map((p) => ({ name: p.name, color: p.color })), deck: g.deck })} onNew={() => setG(null)} />;

  const cur = g.players[g.turn];
  const card = g.card;
  const task = taskOf(card);
  const left = g.endAt ? Math.max(0, g.endAt - now) : 0;
  const mm = Math.floor(left / 60000), ss = Math.floor((left % 60000) / 1000);
  const hintText = task ? (t.lang === 'ru' ? task.hint.ru : task.hint.uk) : '';
  const focusCell = card && 'cell' in card ? card.cell : rolling || moving ? null : cur.pos;

  return (
    <div className={s.game}>
      <div className={s.boardWrap}>
        <CityBoard owners={g.owners} players={g.players} turn={g.turn} focus={focusCell} />
        <div className={s.center}>
          <p className={s.title}>Murly City</p>
          <p className={s.deckName}>{deck.title} <span>{deck.level}</span></p>
          <div className={s.centerRow}>
            <Die face={face} rolling={rolling} />
            <MurlyCat className={s.cat} skin={g.turn % 2 ? 'peach' : 'white'} />
          </div>
          <p className={s.turnLine}><Token color={cur.color} name={cur.name} size={22} /> <b>{cur.name}</b></p>
          <button ref={rollRef} type="button" className={s.roll} onClick={roll} disabled={busy} aria-keyshortcuts="R">
            {rolling ? t({ uk: 'Кидаємо...', ru: 'Бросаем...', en: 'Rolling...' }) : moving ? t({ uk: 'Ходимо...', ru: 'Ходим...', en: 'Moving...' }) : t({ uk: 'Кинути кубик', ru: 'Бросить кубик', en: 'Roll the dice' })}
          </button>
        </div>
      </div>

      <aside className={s.panel} aria-label={t({ uk: 'Гравці', ru: 'Игроки', en: 'Players' })}>
        <div className={s.meta}>
          <span>{t({ uk: 'Раунд', ru: 'Раунд', en: 'Round' })} <b>{g.round}{g.rounds ? ` / ${g.rounds}` : ''}</b></span>
          {g.endAt && <span className={timeUp ? s.late : undefined}>{timeUp ? t({ uk: 'Час вийшов: це останній хід', ru: 'Время вышло: это последний ход', en: 'Time is up: last turn' }) : <>{t({ uk: 'Час', ru: 'Время', en: 'Time' })} <b>{mm}:{String(ss).padStart(2, '0')}</b></>}</span>}
        </div>
        <ol className={s.players}>
          {g.players.map((p, i) => {
            const props = g.owners.filter((o) => o === i).length;
            return (
              <li key={i} className={i === g.turn ? s.playerNow : undefined} aria-current={i === g.turn ? 'true' : undefined}>
                <Token color={p.color} name={p.name} />
                <span className={s.pName}>{p.name}{p.skip && <em className={s.badge}>Coffee break</em>}</span>
                <span className={s.pStat}><Coin />{p.coins}</span>
                <span className={s.pStat} title={t({ uk: 'Місця', ru: 'Места', en: 'Places' })}>
                  <svg className={s.coin} viewBox="0 0 20 20" aria-hidden="true"><path d="M5 18V3h10l-3 4l3 4H5" fill={colorOf(p.color).hex} stroke={INK} strokeWidth="2" strokeLinejoin="round" /></svg>{props}
                  <span className={s.srOnly}>{t({ uk: 'місць', ru: 'мест', en: 'places' })}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <div className={s.rules}>
          <p>{t({ uk: `Пройшов START: +${PASS_BONUS}. Картка Murly: +${MURLY_REWARD}. Уся сторона одного кольору: подвійна оренда.`, ru: `Прошёл START: +${PASS_BONUS}. Карточка Murly: +${MURLY_REWARD}. Вся сторона одного цвета: двойная аренда.`, en: `Pass START: +${PASS_BONUS}. Murly card: +${MURLY_REWARD}. A whole side in one colour: double rent.` })}</p>
          <p className={s.keys}>{t({ uk: 'Клавіша R: кинути кубик', ru: 'Клавиша R: бросить кубик', en: 'Press R to roll' })}</p>
        </div>
        <h2 className={s.logTitle}>{t({ uk: 'Хід гри', ru: 'Ход игры', en: 'Game log' })}</h2>
        <ul className={s.log}>
          {g.log.slice(0, 7).map((e, i) => <li key={g.log.length - i}>{t(e)}</li>)}
        </ul>
        <div className={s.endBox}>
          {askEnd ? (<>
            <span>{t({ uk: 'Завершити гру зараз?', ru: 'Завершить игру сейчас?', en: 'Finish the game now?' })}</span>
            <button type="button" className={s.btnSmall} onClick={finishNow}>{t({ uk: 'Так', ru: 'Да', en: 'Yes' })}</button>
            <button type="button" className={s.btnGhost} onClick={() => setAskEnd(false)}>{t({ uk: 'Ні', ru: 'Нет', en: 'No' })}</button>
          </>) : (
            <button type="button" className={s.btnGhost} onClick={() => setAskEnd(true)} disabled={rolling || moving}>{t({ uk: 'Завершити гру', ru: 'Завершить игру', en: 'Finish game' })}</button>
          )}
        </div>
      </aside>

      <p className={s.srOnly} aria-live="polite">{live}</p>

      {card && (
        <div className={s.overlay}>
          <div ref={dialogRef} className={s.card} role="dialog" aria-modal="true" aria-labelledby="mc-card-title" onKeyDown={trap}>
            <CardHead card={card} g={g} />
            {task && (<>
              <p className={s.task} lang="en">{task.en}</p>
              <div className={s.cardTools}>
                <button type="button" className={s.btnGhost} onClick={() => say(task.en)}>
                  <svg viewBox="0 0 20 20" className={s.coin} aria-hidden="true"><path d="M3 8h3l4-4v12l-4-4H3z" fill="#AFC3F0" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" /><path d="M13 7q2 3 0 6M15.5 5q4 5 0 10" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" /></svg>
                  {t({ uk: 'Прочитати вголос', ru: 'Прочитать вслух', en: 'Read aloud' })}
                </button>
                <button type="button" className={s.btnGhost} aria-expanded={showHint} aria-controls="mc-hint" onClick={() => setShowHint((v) => !v)}>
                  {showHint ? t({ uk: 'Сховати підказку', ru: 'Скрыть подсказку', en: 'Hide hint' }) : t({ uk: 'Підказка для вчителя', ru: 'Подсказка для учителя', en: 'Teacher hint' })}
                </button>
              </div>
              {showHint && <p id="mc-hint" className={s.hint}>{t.lang === 'en' ? <>{task.hint.uk}{task.hint.ru !== task.hint.uk && <><br />{task.hint.ru}</>}</> : hintText}</p>}
            </>)}
            <CardActions card={card} g={g} act={act} />
          </div>
        </div>
      )}
    </div>
  );
}

const q0 = (g: Game, pi: number) => g.players[pi].name;

function CardHead({ card, g }: { card: Card; g: Game }) {
  const t = useT();
  const p = g.players[g.turn];
  const box = (bg: string, art: React.ReactNode, title: string, sub: React.ReactNode) => (
    <div className={s.cardHead}>
      <svg viewBox="-34 -34 68 68" className={s.cardArt} aria-hidden="true"><rect x="-32" y="-32" width="64" height="64" rx="14" fill={bg} stroke={INK} strokeWidth="2.4" />{art}</svg>
      <div>
        <h2 id="mc-card-title" className={s.cardTitle}>{title}</h2>
        <p className={s.cardSub}><Token color={p.color} name={p.name} size={20} /> {sub}</p>
      </div>
    </div>
  );
  if (card.kind === 'buy' || card.kind === 'own' || card.kind === 'rent') {
    const c = CELLS[card.cell];
    const art = <g transform="scale(1.05)"><PlaceIcon id={c.place!} /></g>;
    const sub = card.kind === 'buy'
      ? t({ uk: `${p.name}: виконай завдання й купи місце за ${priceOf(card.cell)}`, ru: `${p.name}: выполни задание и купи место за ${priceOf(card.cell)}`, en: `${p.name}: do the task and buy this place for ${priceOf(card.cell)}` })
      : card.kind === 'own'
        ? t({ uk: `${p.name}, це твоє місце. Бонусне завдання: +${OWN_REWARD}`, ru: `${p.name}, это твоё место. Бонусное задание: +${OWN_REWARD}`, en: `${p.name}, this is your place. Bonus task: +${OWN_REWARD}` })
        : t({ uk: `Місце гравця ${g.players[card.owner].name}. Виконай завдання або заплати ${card.rent}`, ru: `Место игрока ${g.players[card.owner].name}. Выполни задание или заплати ${card.rent}`, en: `${g.players[card.owner].name}'s place. Do the task or pay ${card.rent} rent` });
    return box(SIDE_COLOR[c.side], art, c.name, sub);
  }
  if (card.kind === 'murly') return box('#EEF0FA', <MurlyMark big />, 'Murly card', t({ uk: `${p.name}: міні-челендж, +${MURLY_REWARD}`, ru: `${p.name}: мини-челлендж, +${MURLY_REWARD}`, en: `${p.name}: mini challenge, +${MURLY_REWARD}` }));
  if (card.kind === 'lucky') return box(CORNER_FILL.lucky, <g transform="scale(.9)"><CornerArt kind="lucky" /></g>, 'Lucky street', t({ uk: `${p.name} знаходить ${card.amount} монет!`, ru: `${p.name} находит ${card.amount} монет!`, en: `${p.name} finds ${card.amount} coins!` }));
  if (card.kind === 'coffee') return box(CORNER_FILL.coffee, <g transform="scale(.9)"><CornerArt kind="coffee" /></g>, 'Coffee break', t({ uk: `${p.name} відпочиває й пропускає наступний хід.`, ru: `${p.name} отдыхает и пропускает следующий ход.`, en: `${p.name} has a rest and skips the next turn.` }));
  if (card.kind === 'bike') return box(CORNER_FILL.bike, <g transform="scale(.9)"><CornerArt kind="bike" /></g>, 'Bike ride', t({ uk: `${p.name} їде велосипедом на 3 клітинки вперед.`, ru: `${p.name} едет на велосипеде на 3 клетки вперёд.`, en: `${p.name} rides 3 cells forward.` }));
  return box(CORNER_FILL.start, <g transform="scale(.8)"><CornerArt kind="start" /></g>, 'START', t({ uk: `${p.name} на старті. Бонус ${PASS_BONUS} уже нараховано.`, ru: `${p.name} на старте. Бонус ${PASS_BONUS} уже начислен.`, en: `${p.name} is on START. The ${PASS_BONUS} bonus is already paid.` }));
}

function CardActions({ card, g, act }: { card: Card; g: Game; act: (k: 'done' | 'skip' | 'pay' | 'ok') => void }) {
  const t = useT();
  const p = g.players[g.turn];
  const done = t({ uk: 'Виконано', ru: 'Выполнено', en: 'Done' });
  if (card.kind === 'buy') {
    const price = priceOf(card.cell);
    const can = p.coins >= price;
    return (<div className={s.actions}>
      <button type="button" data-first className={s.btnMain} onClick={() => act('done')}>
        {can ? t({ uk: `${done}: купити за ${price}`, ru: `${done}: купить за ${price}`, en: `${done}: buy for ${price}` }) : t({ uk: `${done}: +${OWN_REWARD} (не вистачає на покупку)`, ru: `${done}: +${OWN_REWARD} (не хватает на покупку)`, en: `${done}: +${OWN_REWARD} (not enough to buy)` })}
      </button>
      <button type="button" className={s.btnGhost} onClick={() => act('skip')}>{t({ uk: 'Не цього разу', ru: 'Не в этот раз', en: 'Not this time' })}</button>
    </div>);
  }
  if (card.kind === 'own' || card.kind === 'murly') {
    return (<div className={s.actions}>
      <button type="button" data-first className={s.btnMain} onClick={() => act('done')}>{done}: +{card.kind === 'own' ? OWN_REWARD : MURLY_REWARD}</button>
      <button type="button" className={s.btnGhost} onClick={() => act('skip')}>{t({ uk: 'Пропустити', ru: 'Пропустить', en: 'Skip' })}</button>
    </div>);
  }
  if (card.kind === 'rent') {
    return (<div className={s.actions}>
      <button type="button" data-first className={s.btnMain} onClick={() => act('done')}>{t({ uk: `${done}: без оренди`, ru: `${done}: без аренды`, en: `${done}: no rent` })}</button>
      <button type="button" className={s.btnGhost} onClick={() => act('pay')}>{t({ uk: `Заплатити ${Math.min(p.coins, card.rent)}`, ru: `Заплатить ${Math.min(p.coins, card.rent)}`, en: `Pay ${Math.min(p.coins, card.rent)}` })}</button>
    </div>);
  }
  return (<div className={s.actions}>
    <button type="button" data-first className={s.btnMain} onClick={() => act('ok')}>{card.kind === 'bike' ? t({ uk: 'Поїхали!', ru: 'Поехали!', en: "Let's go!" }) : 'OK'}</button>
  </div>);
}

/* ---------------- Налаштування ---------------- */

function SetupScreen({ setup, setSetup, onStart, saved, onContinue }: { setup: Setup; setSetup: (f: Setup) => void; onStart: () => void; saved: Game | null; onContinue: () => void }) {
  const t = useT();
  const set = (patch: Partial<Setup>) => setSetup({ ...setup, ...patch });
  const setPlayer = (i: number, patch: Partial<{ name: string; color: string }>) => set({ players: setup.players.map((p, j) => (j === i ? { ...p, ...patch } : p)) });
  const addPlayer = () => {
    if (setup.players.length >= 4) return;
    const used = new Set(setup.players.map((p) => p.color));
    const color = TOKEN_COLORS.find((c) => !used.has(c.id))?.id ?? 'violet';
    set({ players: [...setup.players, { name: `Player ${setup.players.length + 1}`, color }] });
  };
  const removePlayer = (i: number) => setup.players.length > 2 && set({ players: setup.players.filter((_, j) => j !== i) });
  const pickColor = (i: number, color: string) => {
    // якщо колір уже в когось, міняємося кольорами
    const other = setup.players.findIndex((p, j) => j !== i && p.color === color);
    set({ players: setup.players.map((p, j) => (j === i ? { ...p, color } : j === other ? { ...p, color: setup.players[i].color } : p)) });
  };

  return (
    <div className={s.setup}>
      <div className={s.setupIntro}>
        <MurlyCat className={s.catSetup} />
        <div>
          <p className={s.lead}>{t({
            uk: 'Розмовна настільна гра: кидай кубик, ходи містом, виконуй усні завдання й купуй місця. Вчитель натискає «Виконано», коли відповідь зарахована.',
            ru: 'Разговорная настольная игра: бросай кубик, ходи по городу, выполняй устные задания и покупай места. Учитель нажимает «Выполнено», когда ответ засчитан.',
            en: 'A speaking board game: roll the dice, walk around the city, do speaking tasks and buy places. The teacher presses "Done" when an answer counts.',
          })}</p>
          {saved && <button type="button" className={s.btnMain} onClick={onContinue}>{t({ uk: 'Продовжити збережену гру', ru: 'Продолжить сохранённую игру', en: 'Continue saved game' })}</button>}
        </div>
      </div>

      <section className={s.block} aria-labelledby="mc-deck">
        <h2 id="mc-deck">{t({ uk: 'Тема', ru: 'Тема', en: 'Topic' })}</h2>
        <div className={s.decks} role="radiogroup" aria-labelledby="mc-deck">
          {DECKS.map((d) => (
            <button key={d.id} type="button" role="radio" aria-checked={setup.deck === d.id} className={`${s.deck} ${setup.deck === d.id ? s.deckOn : ''}`} onClick={() => set({ deck: d.id })}>
              <span className={s.deckLevel}>{d.level}</span>
              <b>{d.title}</b>
              <span>{t(d.about)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={s.block} aria-labelledby="mc-players">
        <h2 id="mc-players">{t({ uk: 'Гравці', ru: 'Игроки', en: 'Players' })} <span className={s.muted}>2-4</span></h2>
        <ul className={s.setupPlayers}>
          {setup.players.map((p, i) => (
            <li key={i}>
              <Token color={p.color} name={p.name} size={34} />
              <label className={s.srOnly} htmlFor={`mc-name-${i}`}>{t({ uk: `Ім'я гравця ${i + 1}`, ru: `Имя игрока ${i + 1}`, en: `Player ${i + 1} name` })}</label>
              <input id={`mc-name-${i}`} className={s.input} value={p.name} maxLength={16} onChange={(e) => setPlayer(i, { name: e.target.value })} />
              <div className={s.swatches} role="radiogroup" aria-label={t({ uk: `Колір гравця ${i + 1}`, ru: `Цвет игрока ${i + 1}`, en: `Player ${i + 1} colour` })}>
                {TOKEN_COLORS.map((c) => (
                  <button key={c.id} type="button" role="radio" aria-checked={p.color === c.id} aria-label={t(c.name)} className={`${s.swatch} ${p.color === c.id ? s.swatchOn : ''}`} style={{ background: c.hex }} onClick={() => pickColor(i, c.id)} />
                ))}
              </div>
              {setup.players.length > 2 && <button type="button" className={s.btnGhost} onClick={() => removePlayer(i)} aria-label={t({ uk: `Прибрати гравця ${p.name}`, ru: `Убрать игрока ${p.name}`, en: `Remove ${p.name}` })}>{t({ uk: 'Прибрати', ru: 'Убрать', en: 'Remove' })}</button>}
            </li>
          ))}
        </ul>
        {setup.players.length < 4 && <button type="button" className={s.btnGhost} onClick={addPlayer}>+ {t({ uk: 'Додати гравця', ru: 'Добавить игрока', en: 'Add a player' })}</button>}
      </section>

      <section className={s.block} aria-labelledby="mc-set">
        <h2 id="mc-set">{t({ uk: 'Налаштування', ru: 'Настройки', en: 'Settings' })}</h2>
        <div className={s.settings}>
          <label>{t({ uk: 'Раундів', ru: 'Раундов', en: 'Rounds' })}
            <select className={s.input} value={setup.rounds} onChange={(e) => set({ rounds: Number(e.target.value) })}>
              {[4, 6, 8, 10, 12].map((n) => <option key={n} value={n}>{n}</option>)}
              <option value={0}>{t({ uk: 'Без обмеження', ru: 'Без ограничения', en: 'No limit' })}</option>
            </select>
          </label>
          <label>{t({ uk: 'Час гри', ru: 'Время игры', en: 'Time limit' })}
            <select className={s.input} value={setup.minutes} onChange={(e) => set({ minutes: Number(e.target.value) })}>
              <option value={0}>{t({ uk: 'Без таймера', ru: 'Без таймера', en: 'No timer' })}</option>
              {[10, 15, 20, 30, 45].map((n) => <option key={n} value={n}>{n} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</option>)}
            </select>
          </label>
          <label className={s.check}>
            <input type="checkbox" checked={setup.autoRead} onChange={(e) => set({ autoRead: e.target.checked })} />
            {t({ uk: 'Читати картки вголос автоматично', ru: 'Читать карточки вслух автоматически', en: 'Read cards aloud automatically' })}
          </label>
        </div>
      </section>

      <details className={s.how}>
        <summary>{t({ uk: 'Як грати', ru: 'Как играть', en: 'How to play' })}</summary>
        <ul>
          <li>{t({ uk: `У кожного ${START_COINS} монет. Кидай кубик і йди за годинниковою стрілкою. Пройшов START: +${PASS_BONUS}.`, ru: `У каждого ${START_COINS} монет. Бросай кубик и иди по часовой стрелке. Прошёл START: +${PASS_BONUS}.`, en: `Everyone starts with ${START_COINS} coins. Roll and move clockwise. Pass START: +${PASS_BONUS}.` })}</li>
          <li>{t({ uk: 'Вільне місце: виконай завдання, і вчитель натискає «Виконано»: ти купуєш місце й ставиш свій прапорець.', ru: 'Свободное место: выполни задание, и учитель нажимает «Выполнено»: ты покупаешь место и ставишь свой флажок.', en: 'A free place: do the task, the teacher presses "Done" and you buy it with your flag.' })}</li>
          <li>{t({ uk: 'Чуже місце: виконай завдання власника або заплати оренду. Уся сторона одного власника: оренда подвійна.', ru: 'Чужое место: выполни задание владельца или заплати аренду. Вся сторона у одного владельца: аренда двойная.', en: "Someone else's place: do the owner's task or pay rent. One owner for a whole side: double rent." })}</li>
          <li>{t({ uk: `Murly card: міні-челендж, +${MURLY_REWARD}. Coffee break: пропускаєш хід. Lucky street: бонусні монети. Bike ride: 3 клітинки вперед.`, ru: `Murly card: мини-челлендж, +${MURLY_REWARD}. Coffee break: пропускаешь ход. Lucky street: бонусные монеты. Bike ride: 3 клетки вперёд.`, en: `Murly card: a mini challenge, +${MURLY_REWARD}. Coffee break: skip a turn. Lucky street: bonus coins. Bike ride: 3 cells forward.` })}</li>
          <li>{t({ uk: 'Перемагає той, у кого найбільше монет разом із вартістю місць.', ru: 'Побеждает тот, у кого больше всего монет вместе со стоимостью мест.', en: 'The winner has the most coins plus the value of their places.' })}</li>
        </ul>
      </details>

      <button type="button" className={`${s.btnMain} ${s.startBtn}`} onClick={onStart}>{t({ uk: 'Почати гру', ru: 'Начать игру', en: 'Start the game' })}</button>
    </div>
  );
}

/* ---------------- Фінал ---------------- */

function FinalScreen({ g, onAgain, onNew }: { g: Game; onAgain: () => void; onNew: () => void }) {
  const t = useT();
  const rows = g.players.map((p, i) => ({ p, i, value: propertyValue(g, i), places: g.owners.filter((o) => o === i).length }))
    .map((r) => ({ ...r, total: r.p.coins + r.value }))
    .sort((a, b) => b.total - a.total);
  const placeOf = (k: number) => 1 + rows.findIndex((r) => r.total === rows[k].total);
  const firstRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { firstRef.current?.focus(); }, []);
  return (
    <div className={s.final}>
      <MurlyCat className={s.catSetup} skin="peach" />
      <h2 ref={firstRef} tabIndex={-1} className={s.finalTitle}>{t({ uk: `Перемагає ${rows[0].p.name}!`, ru: `Побеждает ${rows[0].p.name}!`, en: `${rows[0].p.name} wins!` })}</h2>
      <p className={s.muted}>{t({ uk: 'Рахунок: монети плюс вартість місць', ru: 'Счёт: монеты плюс стоимость мест', en: 'Score: coins plus the value of places' })}</p>
      <ol className={s.rank}>
        {rows.map((r, k) => (
          <li key={r.i} className={placeOf(k) === 1 ? s.rankTop : undefined}>
            <span className={s.rankN}>{placeOf(k)}</span>
            <Token color={r.p.color} name={r.p.name} size={34} />
            <span className={s.pName}>{r.p.name}</span>
            <span className={s.rankStats}>
              <span><Coin />{r.p.coins}</span>
              <span>{t({ uk: `місць: ${r.places} (${r.value})`, ru: `мест: ${r.places} (${r.value})`, en: `places: ${r.places} (${r.value})` })}</span>
            </span>
            <b className={s.rankTotal}>{r.total}</b>
          </li>
        ))}
      </ol>
      <div className={s.actions}>
        <button type="button" className={s.btnMain} onClick={onAgain}>{t({ uk: 'Зіграти ще раз', ru: 'Сыграть ещё раз', en: 'Play again' })}</button>
        <button type="button" className={s.btnGhost} onClick={onNew}>{t({ uk: 'Нові налаштування', ru: 'Новые настройки', en: 'New setup' })}</button>
      </div>
    </div>
  );
}
