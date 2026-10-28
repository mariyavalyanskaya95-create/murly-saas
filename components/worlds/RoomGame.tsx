'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { say as speak } from '@/lib/speak';
import Icon from '../Icon';
import { bounds, diamond, proj, rotate, toPolys, unproj, ZH, type Poly } from '@/lib/worlds/iso';
import { CATS, COLORS, COLOR_UK, ITEM, ITEMS, THEMES, type Cat, type ItemDef } from '@/lib/worlds/room-items';

const N = 7;          // кімната N × N клітинок
const WALL = 2.6;     // висота стін
const SAVE = 'murly-room-v1';

type Placed = { uid: string; id: string; x: number; y: number; rot: number; color: string };
type Task =
  | { kind: 'place'; item: string; en: string; uk: string }
  | { kind: 'color'; item: string; color: string; en: string; uk: string }
  | { kind: 'on'; item: string; target: string; en: string; uk: string }
  | { kind: 'next'; item: string; target: string; en: string; uk: string };
type Save = { placed: Placed[]; coins: number; unlocked: string[]; theme: string; done: number };

const START: Save = {
  placed: [
    { uid: 'p1', id: 'rug', x: 2, y: 3, rot: 0, color: 'blue' },
    { uid: 'p2', id: 'bed', x: 0, y: 1, rot: 0, color: 'blue' },
    { uid: 'p3', id: 'lamp', x: 1, y: 0, rot: 0, color: 'yellow' },
  ],
  coins: 15, unlocked: [], theme: 'cream', done: 0,
};

// ---------- звуки (WebAudio, без файлів) ----------
let ctx: AudioContext | null = null;
function beep(freqs: number[], dur = 0.09, type: OscillatorType = 'triangle', vol = 0.12) {
  try {
    ctx = ctx ?? new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = ctx!.createOscillator(), g = ctx!.createGain();
      const t = ctx!.currentTime + i * dur;
      o.type = type; o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur * 1.6);
      o.connect(g).connect(ctx!.destination); o.start(t); o.stop(t + dur * 1.7);
    });
  } catch { /* без звуку */ }
}
const sfx = {
  pop: () => beep([520, 780], 0.06),
  pick: () => beep([660], 0.05, 'sine', 0.08),
  bad: () => beep([220, 180], 0.08, 'square', 0.05),
  coin: () => beep([880, 1320, 1760], 0.07, 'sine', 0.1),
  paint: () => beep([440, 550, 660], 0.05, 'sine', 0.08),
};
function say(text: string) { void speak(text, { voice: 'narrator' }).catch(() => {}); }
const art = (en: string) => (/^[aeiou]/i.test(en) ? 'an' : 'a');

// ---------- геометрія кімнати ----------
const size = (p: Placed) => { const d = ITEM[p.id]; return p.rot ? { w: d.d, d: d.w } : { w: d.w, d: d.d }; };
const overlap = (a: Placed, b: Placed) => {
  const A = size(a), B = size(b);
  return a.x < b.x + B.w && b.x < a.x + A.w && a.y < b.y + B.d && b.y < a.y + A.d;
};
// на чому стоїть дрібна річ (меблі з поверхнею під нею)
const supportOf = (p: Placed, all: Placed[]) => {
  if (!ITEM[p.id].small) return null;
  return all.find((q) => q.uid !== p.uid && ITEM[q.id].surface && p.x >= q.x && p.x < q.x + size(q).w && p.y >= q.y && p.y < q.y + size(q).d) ?? null;
};
const zOf = (p: Placed, all: Placed[]) => { const s = supportOf(p, all); return s ? ITEM[s.id].surface! : 0; };
function canPlace(p: Placed, all: Placed[]) {
  const s = size(p);
  if (p.x < 0 || p.y < 0 || p.x + s.w > N || p.y + s.d > N) return false;
  const def = ITEM[p.id];
  for (const q of all) {
    if (q.uid === p.uid) continue;
    const qd = ITEM[q.id];
    if (!overlap(p, q)) continue;
    if (def.floor || qd.floor) { if (def.floor && qd.floor) return false; continue; }
    if (def.small && qd.surface) continue;          // ставимо на меблі
    if (qd.small && def.surface) return false;       // меблі не можна ставити на речі
    return false;
  }
  return true;
}
const touching = (a: Placed, b: Placed) => {
  const A = size(a), B = size(b);
  const dx = Math.max(b.x - (a.x + A.w), a.x - (b.x + B.w));
  const dy = Math.max(b.y - (a.y + A.d), a.y - (b.y + B.d));
  return Math.max(dx, dy) === 0 && !(dx === 0 && dy === 0);
};

// ---------- завдання ----------
function makeTask(s: Save, prev?: Task): Task {
  const owned = (id: string) => ITEM[id].price === 0 || s.unlocked.includes(id);
  const inRoom = s.placed.map((p) => p.id);
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
  const opts: Task[] = [];
  const notIn = ITEMS.filter((i) => owned(i.id) && !inRoom.includes(i.id));
  if (notIn.length) { const i = pick(notIn); opts.push({ kind: 'place', item: i.id, en: `Put ${art(i.en)} ${i.en} in the room.`, uk: `Постав у кімнату: ${i.uk}.` }); }
  const paintable = s.placed.filter((p) => ITEM[p.id].colors && ITEM[p.id].colors!.length > 1);
  if (paintable.length) {
    const p = pick(paintable); const d = ITEM[p.id];
    const col = pick(d.colors!.filter((c) => c !== p.color));
    opts.push({ kind: 'color', item: p.id, color: col, en: `Make the ${d.en} ${col}.`, uk: `Зроби ${d.uk}: ${COLOR_UK[col]}.` });
  }
  const smalls = [...new Set(s.placed.filter((p) => ITEM[p.id].small).map((p) => p.id))];
  const surfaces = [...new Set(s.placed.filter((p) => ITEM[p.id].surface).map((p) => p.id))];
  if (smalls.length && surfaces.length) {
    const a = pick(smalls), b = pick(surfaces);
    if (!s.placed.some((p) => p.id === a && supportOf(p, s.placed)?.id === b))
      opts.push({ kind: 'on', item: a, target: b, en: `Put the ${ITEM[a].en} on the ${ITEM[b].en}.`, uk: `Постав ${ITEM[a].uk} на ${ITEM[b].uk}.` });
  }
  const solid = [...new Set(s.placed.filter((p) => !ITEM[p.id].floor).map((p) => p.id))];
  if (solid.length >= 2) {
    const a = pick(solid), b = pick(solid.filter((x) => x !== a));
    opts.push({ kind: 'next', item: a, target: b, en: `Put the ${ITEM[a].en} next to the ${ITEM[b].en}.`, uk: `Постав ${ITEM[a].uk} поруч із: ${ITEM[b].uk}.` });
  }
  const fresh = opts.filter((o) => !prev || o.en !== prev.en);
  return pick(fresh.length ? fresh : opts.length ? opts : [{ kind: 'place', item: 'ball', en: 'Put a ball in the room.', uk: "Постав у кімнату м'яч." }]);
}
function taskDone(t: Task, placed: Placed[]) {
  const of = (id: string) => placed.filter((p) => p.id === id);
  switch (t.kind) {
    case 'place': return of(t.item).length > 0;
    case 'color': return of(t.item).some((p) => p.color === t.color);
    case 'on': return of(t.item).some((p) => supportOf(p, placed)?.id === t.target);
    case 'next': return of(t.item).some((a) => of(t.target).some((b) => touching(a, b)));
  }
}

// ---------- малювання ----------
function Shape({ polys }: { polys: Poly[] }) {
  return (
    <>
      {polys.map((p, i) => ('ball' in p
        ? <g key={i}><circle cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} stroke="#1A1A1A" strokeWidth={1.4} /><circle cx={p.cx - p.r * 0.35} cy={p.cy - p.r * 0.35} r={p.r * 0.28} fill="#fff" opacity={0.55} /></g>
        : <polygon key={i} points={p.points} fill={p.fill} stroke="#1A1A1A" strokeWidth={1.2} strokeLinejoin="round" />))}
    </>
  );
}
const polysOf = (def: ItemDef, color: string, rot: number, x = 0, y = 0, z = 0) => toPolys(rotate(def.parts(COLORS[color] ?? '#999'), rot), x, y, z);

function Thumb({ def, color }: { def: ItemDef; color: string }) {
  const polys = useMemo(() => polysOf(def, color, 0), [def, color]);
  const b = bounds(polys);
  const pad = 4;
  return <svg viewBox={`${b.x - pad} ${b.y - pad} ${b.w + pad * 2} ${b.h + pad * 2}`} className="rw-thumb" aria-hidden="true"><Shape polys={polys} /></svg>;
}

export default function RoomGame() {
  const [s, setS] = useState<Save>(START);
  const [loaded, setLoaded] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [cat, setCat] = useState<Cat>('furniture');
  const [drag, setDrag] = useState<{ uid: string; x: number; y: number; ok: boolean; ox: number; oy: number; orig: Placed; isNew?: boolean } | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [hint, setHint] = useState(false);
  const [labels, setLabels] = useState(true);
  const [party, setParty] = useState(0);
  const [hop, setHop] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const svg = useRef<SVGSVGElement>(null);
  const theme = THEMES.find((t) => t.id === s.theme) ?? THEMES[0];

  // завантаження і збереження прогресу в браузері
  useEffect(() => {
    try { const raw = localStorage.getItem(SAVE); if (raw) setS({ ...START, ...JSON.parse(raw) }); } catch { /* новий гравець */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) try { localStorage.setItem(SAVE, JSON.stringify(s)); } catch { /* немає сховища */ } }, [s, loaded]);
  useEffect(() => { if (loaded && !task) setTask(makeTask(s)); }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 2200); };

  // перевірка завдання після кожної зміни
  const commit = useCallback((placed: Placed[]) => {
    const next = { ...s, placed };
    if (task && taskDone(task, placed)) {
      sfx.coin(); setParty((n) => n + 1); say('Well done!');
      const done = { ...next, coins: s.coins + 5, done: s.done + 1 };
      setS(done); setTask(null); setHint(false);
      setTimeout(() => setTask(makeTask(done, task)), 1400);
      return;
    }
    setS(next);
  }, [s, task]);

  const toPoint = (e: { clientX: number; clientY: number }) => {
    const el = svg.current!; const pt = el.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(el.getScreenCTM()!.inverse());
    return unproj(p.x, p.y);
  };

  // ---------- додати предмет з каталогу ----------
  const owned = (d: ItemDef) => d.price === 0 || s.unlocked.includes(d.id);
  const addItem = (d: ItemDef) => {
    if (!owned(d)) {
      if (s.coins < d.price) { sfx.bad(); flash(`Потрібно ${d.price} монет. Виконуй завдання, щоб заробити!`); return; }
      setS((p) => ({ ...p, coins: p.coins - d.price, unlocked: [...p.unlocked, d.id] })); sfx.coin(); flash(`Відкрито: ${d.en}!`); say(`${art(d.en)} ${d.en}`); return;
    }
    // шукаємо вільне місце ближче до центру
    const color = d.colors?.[0] ?? 'blue';
    const spots: [number, number][] = [];
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) spots.push([x, y]);
    spots.sort((a, b) => Math.hypot(a[0] - 3, a[1] - 3) - Math.hypot(b[0] - 3, b[1] - 3));
    for (const rot of [0, 1]) for (const [x, y] of spots) {
      const p: Placed = { uid: `u${Date.now()}`, id: d.id, x, y, rot, color };
      if (canPlace(p, s.placed) && (!d.small || !supportOf(p, s.placed))) {
        commit([...s.placed, p]); setSel(p.uid); sfx.pop(); say(`${art(d.en)} ${d.en}`); setHop(p.uid); return;
      }
    }
    sfx.bad(); flash('Немає місця. Прибери щось або перестав меблі.');
  };

  // ---------- перетягування ----------
  const onDown = (e: React.PointerEvent, p: Placed) => {
    e.stopPropagation(); (e.target as Element).setPointerCapture?.(e.pointerId);
    const pt = toPoint(e);
    setSel(p.uid); sfx.pick();
    setDrag({ uid: p.uid, x: p.x, y: p.y, ok: true, ox: pt.x - p.x, oy: pt.y - p.y, orig: p });
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const pt = toPoint(e);
    const x = Math.round(pt.x - drag.ox), y = Math.round(pt.y - drag.oy);
    if (x === drag.x && y === drag.y) return;
    const moved = { ...drag.orig, x, y };
    setDrag({ ...drag, x, y, ok: canPlace(moved, s.placed) });
  };
  const onUp = () => {
    if (!drag) return;
    const moved = { ...drag.orig, x: drag.x, y: drag.y };
    if (drag.x === drag.orig.x && drag.y === drag.orig.y) { const d = ITEM[drag.orig.id]; say(`${art(d.en)} ${drag.orig.color && d.colors ? drag.orig.color + ' ' : ''}${d.en}`); setHop(drag.uid); }
    else if (drag.ok) { commit(s.placed.map((q) => (q.uid === drag.uid ? moved : q))); sfx.pop(); setHop(drag.uid); }
    else sfx.bad();
    setDrag(null);
  };
  useEffect(() => { if (hop) { const t = setTimeout(() => setHop(null), 450); return () => clearTimeout(t); } }, [hop]);

  // ---------- дії з вибраним ----------
  const cur = s.placed.find((p) => p.uid === sel) ?? null;
  const curDef = cur ? ITEM[cur.id] : null;
  const rotateSel = () => {
    if (!cur) return;
    const r = { ...cur, rot: cur.rot ? 0 : 1 };
    if (canPlace(r, s.placed)) { commit(s.placed.map((q) => (q.uid === cur.uid ? r : q))); sfx.pop(); setHop(cur.uid); } else { sfx.bad(); flash('Тут не повернеться, бракує місця.'); }
  };
  const paint = (c: string) => {
    if (!cur) return;
    commit(s.placed.map((q) => (q.uid === cur.uid ? { ...q, color: c } : q))); sfx.paint(); say(`${c}`); setHop(cur.uid);
  };
  const remove = () => { if (!cur) return; commit(s.placed.filter((q) => q.uid !== cur.uid)); setSel(null); sfx.pick(); };

  // ---------- порядок малювання ----------
  const view = useMemo(() => {
    const placed = s.placed.map((p) => (drag && p.uid === drag.uid ? { ...p, x: drag.x, y: drag.y } : p));
    const depth = (p: Placed) => { const z = size(p); return p.x + z.w / 2 + p.y + z.d / 2; };
    const rugs = placed.filter((p) => ITEM[p.id].floor).sort((a, b) => depth(a) - depth(b));
    const base = placed.filter((p) => !ITEM[p.id].floor && !supportOf(p, placed)).sort((a, b) => depth(a) - depth(b));
    const out: { p: Placed; z: number }[] = rugs.map((p) => ({ p, z: 0 }));
    for (const b of base) {
      out.push({ p: b, z: 0 });
      placed.filter((q) => supportOf(q, placed)?.uid === b.uid).sort((a, c) => depth(a) - depth(c)).forEach((q) => out.push({ p: q, z: ITEM[b.id].surface! }));
    }
    return out;
  }, [s.placed, drag]);

  const W = (x: number, y: number, z: number) => proj(x, y, z).join(',');
  const curTask = task;

  return (
    <div className="rw">
      <div className="rw-top">
        <div className="rw-coins" aria-label={`Монети: ${s.coins}`}><span className="rw-coin" />{s.coins}</div>
        <div className="rw-task" aria-live="polite">
          {curTask ? (
            <>
              <button className="rw-say" onClick={() => say(curTask.en)} aria-label="Послухати завдання"><Icon id="e-speak" /></button>
              <div><b>{curTask.en}</b>{hint ? <small>{curTask.uk}</small> : <button className="t-link-btn" onClick={() => setHint(true)}>Підказка</button>}</div>
              <button className="t-link-btn" onClick={() => { setTask(makeTask(s, curTask)); setHint(false); }}>Інше</button>
            </>
          ) : loaded ? <b className="rw-well">Well done! +5</b> : <b>…</b>}
        </div>
        <div className="rw-tools">
          <button className={`g-chip ${labels ? 'is-on' : ''}`} onClick={() => setLabels(!labels)} aria-pressed={labels}>Підписи</button>
          <div className="rw-themes" role="radiogroup" aria-label="Колір стін">
            {THEMES.map((t) => <button key={t.id} role="radio" aria-checked={s.theme === t.id} aria-label={t.id} className={`rw-sw ${s.theme === t.id ? 'is-on' : ''}`} style={{ background: t.wall }} onClick={() => { setS((p) => ({ ...p, theme: t.id })); sfx.paint(); }} />)}
          </div>
        </div>
      </div>

      <div className="rw-stage">
        <svg ref={svg} viewBox="-262 -128 524 372" className="rw-svg" onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onPointerDown={() => setSel(null)} role="img" aria-label="Кімната">
          <defs>
            <linearGradient id="rw-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8FD3F4" /><stop offset="1" stopColor="#DFF3FF" /></linearGradient>
          </defs>
          {/* стіни */}
          <polygon points={`${W(0, 0, 0)} ${W(0, N, 0)} ${W(0, N, WALL)} ${W(0, 0, WALL)}`} fill={theme.wall2} stroke="#1A1A1A" strokeWidth={1.5} />
          <polygon points={`${W(0, 0, 0)} ${W(N, 0, 0)} ${W(N, 0, WALL)} ${W(0, 0, WALL)}`} fill={theme.wall} stroke="#1A1A1A" strokeWidth={1.5} />
          {/* смужки шпалер */}
          {Array.from({ length: N * 2 - 1 }, (_, i) => <line key={i} x1={proj((i + 1) / 2, 0, 0.05)[0]} y1={proj((i + 1) / 2, 0, 0.05)[1]} x2={proj((i + 1) / 2, 0, WALL - 0.05)[0]} y2={proj((i + 1) / 2, 0, WALL - 0.05)[1]} stroke="#fff" strokeOpacity={0.35} strokeWidth={3} />)}
          {/* вікно */}
          <polygon points={`${W(3.4, 0, 0.95)} ${W(5.4, 0, 0.95)} ${W(5.4, 0, 2.15)} ${W(3.4, 0, 2.15)}`} fill="url(#rw-sky)" stroke="#1A1A1A" strokeWidth={2} />
          <line x1={proj(4.4, 0, 0.95)[0]} y1={proj(4.4, 0, 0.95)[1]} x2={proj(4.4, 0, 2.15)[0]} y2={proj(4.4, 0, 2.15)[1]} stroke="#1A1A1A" strokeWidth={2} />
          <line x1={proj(3.4, 0, 1.55)[0]} y1={proj(3.4, 0, 1.55)[1]} x2={proj(5.4, 0, 1.55)[0]} y2={proj(5.4, 0, 1.55)[1]} stroke="#1A1A1A" strokeWidth={2} />
          <circle cx={proj(4.9, 0, 1.9)[0]} cy={proj(4.9, 0, 1.9)[1]} r={7} fill="#FFE27A" />
          {/* картина на лівій стіні */}
          <polygon points={`${W(0, 2.2, 1.2)} ${W(0, 3.6, 1.2)} ${W(0, 3.6, 2)} ${W(0, 2.2, 2)}`} fill="#fff" stroke="#1A1A1A" strokeWidth={2} />
          <polygon points={`${W(0, 2.4, 1.3)} ${W(0, 2.9, 1.75)} ${W(0, 3.2, 1.5)} ${W(0, 3.45, 1.3)}`} fill="#6FBF5A" stroke="#1A1A1A" strokeWidth={1} />
          {/* плінтуси */}
          <polygon points={`${W(0, 0, 0)} ${W(0, N, 0)} ${W(0, N, 0.12)} ${W(0, 0, 0.12)}`} fill="#FBF8F1" stroke="#1A1A1A" strokeWidth={1} />
          <polygon points={`${W(0, 0, 0)} ${W(N, 0, 0)} ${W(N, 0, 0.12)} ${W(0, 0, 0.12)}`} fill="#FBF8F1" stroke="#1A1A1A" strokeWidth={1} />
          {/* підлога */}
          <polygon points={diamond(0, 0, N, N)} fill={theme.floor} stroke="#1A1A1A" strokeWidth={1.5} />
          {Array.from({ length: N - 1 }, (_, i) => <line key={'f' + i} x1={proj(i + 1, 0)[0]} y1={proj(i + 1, 0)[1]} x2={proj(i + 1, N)[0]} y2={proj(i + 1, N)[1]} stroke="#000" strokeOpacity={0.12} />)}
          {Array.from({ length: N - 1 }, (_, i) => <line key={'g' + i} x1={proj(0, i + 1)[0]} y1={proj(0, i + 1)[1]} x2={proj(N, i + 1)[0]} y2={proj(N, i + 1)[1]} stroke="#000" strokeOpacity={0.06} />)}

          {/* слід під предметом, який тягнемо */}
          {drag && (() => { const p = { ...drag.orig, x: drag.x, y: drag.y }; const z = size(p); return <polygon points={diamond(p.x, p.y, z.w, z.d, ITEM[p.id].small ? zOf(p, s.placed) : 0)} className={drag.ok ? 'rw-foot ok' : 'rw-foot bad'} />; })()}

          {view.map(({ p, z }) => {
            const d = ITEM[p.id]; const sz = size(p);
            const isSel = sel === p.uid;
            return (
              <g key={p.uid} className={`rw-item ${hop === p.uid ? 'is-hop' : ''} ${d.pet ? 'is-pet' : ''} ${drag?.uid === p.uid ? 'is-drag' : ''}`} onPointerDown={(e) => onDown(e, p)}>
                {!d.floor && <polygon points={diamond(p.x + 0.06, p.y + 0.06, sz.w - 0.12, sz.d - 0.12, z)} fill="#000" opacity={0.12} />}
                {isSel && <polygon points={diamond(p.x, p.y, sz.w, sz.d, z)} className="rw-foot sel" />}
                <Shape polys={polysOf(d, p.color, p.rot, p.x, p.y, z)} />
              </g>
            );
          })}
          {labels && view.filter(({ p }) => !ITEM[p.id].floor || sel === p.uid).map(({ p, z }) => {
            const d = ITEM[p.id]; const sz = size(p);
            const [x, y] = proj(p.x + sz.w / 2, p.y + sz.d / 2, z);
            const top = y - (d.small ? 0.85 : d.id === 'wardrobe' ? 1.9 : d.id === 'bookshelf' ? 1.7 : 1.15) * ZH;
            return <g key={'l' + p.uid} className="rw-label" pointerEvents="none"><text x={x} y={top} textAnchor="middle">{d.en}</text></g>;
          })}
        </svg>
        {party > 0 && <div key={party} className="rw-party" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}</div>}
        {msg && <div className="rw-msg" role="status">{msg}</div>}
      </div>

      {cur && curDef && (
        <div className="rw-sel">
          <button className="rw-say" onClick={() => say(`${art(curDef.en)} ${curDef.colors ? cur.color + ' ' : ''}${curDef.en}`)} aria-label="Послухати"><Icon id="e-speak" /></button>
          <div className="rw-sel__name"><b>{curDef.colors ? `${art(cur.color)} ${cur.color} ${curDef.en}` : `${art(curDef.en)} ${curDef.en}`}</b><small>{curDef.uk}</small></div>
          {curDef.colors && curDef.colors.length > 1 && (
            <div className="rw-colors" role="radiogroup" aria-label="Колір">
              {curDef.colors.map((c) => <button key={c} role="radio" aria-checked={cur.color === c} title={c} aria-label={c} className={`rw-sw ${cur.color === c ? 'is-on' : ''}`} style={{ background: COLORS[c] }} onClick={() => paint(c)} />)}
            </div>
          )}
          {curDef.w !== curDef.d && <button className="mu-btn t-btn-sm" onClick={rotateSel}>Повернути</button>}
          <button className="mu-btn t-btn-sm" onClick={remove}>Прибрати</button>
        </div>
      )}

      <div className="rw-shop">
        <div className="g-chips" role="tablist">
          {CATS.map((c) => <button key={c.id} role="tab" aria-selected={cat === c.id} className={`g-chip ${cat === c.id ? 'is-on' : ''}`} onClick={() => setCat(c.id)}>{c.label}</button>)}
        </div>
        <div className="rw-shelf">
          {ITEMS.filter((i) => i.cat === cat).map((d) => {
            const ok = owned(d);
            return (
              <button key={d.id} className={`rw-card ${ok ? '' : 'is-locked'}`} onClick={() => addItem(d)} aria-label={ok ? `Додати: ${d.en}` : `Відкрити за ${d.price} монет: ${d.en}`}>
                <Thumb def={d} color={d.colors?.[0] ?? 'blue'} />
                <b>{d.en}</b>
                {ok ? <small>{d.uk}</small> : <small className="rw-price"><span className="rw-coin" />{d.price}</small>}
              </button>
            );
          })}
        </div>
      </div>
      <p className="rw-help t-muted">Натисни на предмет у каталозі, щоб поставити його. Перетягуй предмети по кімнаті. Натисни на предмет, щоб почути слово і змінити колір. Виконуй завдання англійською, заробляй монети і відкривай нові речі.</p>
    </div>
  );
}
