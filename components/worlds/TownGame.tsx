'use client';
// Гра «Murly Town»: будуєш місто, обираєш будинок, заходиш усередину й облаштовуєш кімнату.
// Увесь текст у грі англійською (вимога Марії): гра сама вчить словам.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import { CITY_CATS, CITY_ITEMS, FLOORS, GROUNDS, HEROES, PAINT, ROOM_CATS, ROOM_ITEMS, WALLS, getItem, type WorldItem } from '@/lib/worlds/world-items';
import { art, say, sfx } from '@/lib/worlds/sound';
import type { Placed, WorldScene, WorldMode } from '@/lib/worlds/world-scene';
import ATLAS from '@/lib/worlds/kenney-thumbs.json';

const SAVE = 'murly-town-v1';
type House = { placed: Placed[]; wall: number; floor: number };
type Save = { coins: number; unlocked: string[]; done: number; ground: number; city: Placed[]; houses: Record<string, House>; hero: string | null };
type Task = { kind: 'place' | 'color' | 'on' | 'next' | 'inside'; file: string; target?: string; color?: string; en: string };
const START: Save = { coins: 20, unlocked: [], done: 0, ground: 0, city: [], houses: {}, hero: 'Rogue' };
const uidOf = () => `u${Date.now().toString(36)}${Math.floor(Math.random() * 99)}`;
const key = (mode: WorldMode, file: string) => `${mode}:${file}`;
const colorName = (hex?: string) => PAINT.find((p) => p.hex === hex)?.en;

function Thumb({ def }: { def: WorldItem }) {
  const idx = (ATLAS.idx as Record<string, number>)[def.file];
  const [src, setSrc] = useState<string | null>(null);
  const atlas = def.pack === 'kenney' && idx !== undefined;
  useEffect(() => {
    if (atlas) return;
    let on = true;
    import('@/lib/worlds/world-scene').then((m) => m.renderThumb(def)).then((u) => { if (on) setSrc(u); }).catch(() => {});
    return () => { on = false; };
  }, [def, atlas]);
  if (atlas) {
    const x = idx % ATLAS.cols, y = Math.floor(idx / ATLAS.cols);
    return <span className="hm-thumb hm-atlas" style={{ backgroundPosition: `${(x / (ATLAS.cols - 1)) * 100}% ${(y / (ATLAS.rows - 1)) * 100}%`, backgroundSize: `${ATLAS.cols * 100}% ${ATLAS.rows * 100}%` }} />;
  }
  return src ? <img src={src} alt="" className="hm-thumb" draggable={false} /> : <span className="hm-thumb hm-thumb--wait" />;
}

export default function TownGame() {
  const host = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const scene = useRef<WorldScene | null>(null);
  const [s, setS] = useState<Save>(START);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<{ mode: WorldMode; house?: string }>({ mode: 'city' });
  const [ready, setReady] = useState(0); // лічильник: нова сцена готова
  const [sel, setSel] = useState<string | null>(null);
  const [cat, setCat] = useState(CITY_CATS[0]);
  const [task, setTask] = useState<Task | null>(null);
  const [labelsOn, setLabelsOn] = useState(true);
  const [msg, setMsg] = useState('');
  const [party, setParty] = useState(0);
  const [heroes, setHeroes] = useState(false);
  const [ghost, setGhost] = useState<{ def: WorldItem; x: number; y: number } | null>(null);
  const [err, setErr] = useState(false);
  const sRef = useRef(s); sRef.current = s;
  const viewRef = useRef(view); viewRef.current = view;
  const mode = view.mode;

  const flash = (t: string) => { setMsg(t); window.setTimeout(() => setMsg(''), 2400); };

  // ---------- збереження ----------
  useEffect(() => {
    try { const raw = localStorage.getItem(SAVE); if (raw) setS({ ...START, ...JSON.parse(raw) }); } catch { /* новий гравець */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) try { localStorage.setItem(SAVE, JSON.stringify(s)); } catch { /* немає сховища */ } }, [s, loaded]);

  // список предметів поточного місця
  const list = mode === 'city' ? s.city : s.houses[view.house ?? '']?.placed ?? [];
  const setList = useCallback((fn: (l: Placed[]) => Placed[]) => {
    setS((c) => {
      const v = viewRef.current;
      if (v.mode === 'city') return { ...c, city: fn(c.city) };
      const h = c.houses[v.house!] ?? { placed: [], wall: 0, floor: 0 };
      return { ...c, houses: { ...c.houses, [v.house!]: { ...h, placed: fn(h.placed) } } };
    });
  }, []);

  // ---------- сцена: нова при зміні місця ----------
  useEffect(() => {
    if (!loaded) return;
    let alive = true;
    setSel(null);
    import('@/lib/worlds/world-scene').then(({ WorldScene }) => {
      if (!alive || !host.current || !labels.current) return;
      try {
        scene.current?.dispose();
        const sc = new WorldScene(host.current, labels.current, {
          onSelect: (uid) => { setSel(uid); if (uid) sfx.pick(); },
          onTap: (uid) => { const p = curList().find((q) => q.uid === uid); if (p) say(`${art(nameOf(p))} ${nameOf(p)}`); },
          onMove: (uid, patch, kids) => {
            sfx.pop();
            setList((l) => {
              const me = l.find((q) => q.uid === uid); if (!me) return l;
              const dx = (patch.x ?? me.x) - me.x, dz = (patch.z ?? me.z) - me.z;
              const wall = getItem(viewRef.current.mode, me.file)?.wall;
              return l.map((q) => q.uid === uid ? { ...q, ...patch, y: wall ? patch.y ?? q.y : undefined } : kids.includes(q.uid) && !wall ? { ...q, x: +(q.x + dx).toFixed(2), z: +(q.z + dz).toFixed(2) } : q);
            });
          },
          onBad: () => { sfx.bad(); flash("Oops! You can't put it here."); },
          onHero: () => { const h = HEROES.find((x) => x.file === sRef.current.hero); say(`Hello! I'm ${h?.en ?? 'here'}!`); },
        }, view.mode);
        scene.current = sc;
        sc.setHero(sRef.current.hero);
        setReady((n) => n + 1);
      } catch { setErr(true); }
    });
    setCat(view.mode === 'city' ? CITY_CATS[0] : ROOM_CATS[0]);
    return () => { alive = false; };
  }, [view.mode, view.house, loaded]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { scene.current?.dispose(); scene.current = null; }, []);

  const curList = () => { const v = viewRef.current, c = sRef.current; return v.mode === 'city' ? c.city : c.houses[v.house ?? '']?.placed ?? []; };
  const nameOf = (p: Placed) => { const d = getItem(viewRef.current.mode, p.file); const c = colorName(p.color); return d ? (c ? `${c} ${d.en}` : d.en) : p.file; };

  // кольори і герой
  const house = view.house ? s.houses[view.house] : undefined;
  useEffect(() => {
    const sc = scene.current; if (!sc || !ready) return;
    if (mode === 'city') sc.setGround(GROUNDS[s.ground]?.hex ?? GROUNDS[0].hex);
    else { sc.setWall(WALLS[house?.wall ?? 0].hex); const f = FLOORS[house?.floor ?? 0]; sc.setFloor(f.hex, f.kind); }
  }, [ready, mode, s.ground, house?.wall, house?.floor]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (scene.current) scene.current.showLabels = labelsOn; }, [labelsOn, ready]);
  useEffect(() => { scene.current?.select(sel); }, [sel]);

  // синхронізація предметів і перевірка завдання
  useEffect(() => {
    const sc = scene.current; if (!sc || !ready) return;
    sc.sync(list).then(() => {
      list.forEach((p) => sc.setLabel(p.uid, nameOf(p)));
      if (task && done(task)) reward();
    });
  }, [list, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- завдання ----------
  const owned = (d: WorldItem) => !d.price || s.unlocked.includes(key(mode, d.file));
  const makeTask = useCallback((st: Save, v: { mode: WorldMode; house?: string }, prev?: Task): Task => {
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
    const own = (d: WorldItem) => !d.price || st.unlocked.includes(key(v.mode, d.file));
    const l = v.mode === 'city' ? st.city : st.houses[v.house ?? '']?.placed ?? [];
    const files = l.map((p) => p.file);
    const def = (f: string) => getItem(v.mode, f)!;
    const opts: Task[] = [];
    if (v.mode === 'city') {
      const houses = l.filter((p) => def(p.file)?.building);
      if (!houses.length) return { kind: 'place', file: 'building_A', en: 'Build a house in the town.' };
      if (!files.some((f) => f.startsWith('road'))) return { kind: 'place', file: 'road_straight', en: 'Put a road next to your house.' };
      if (!Object.values(st.houses).some((h) => h.placed.length)) return { kind: 'inside', file: houses[0].file, en: `Go inside the ${def(houses[0].file).en}.` };
    }
    const pool = (v.mode === 'city' ? CITY_ITEMS : ROOM_ITEMS).filter((d) => own(d) && !d.wall && !files.includes(d.file));
    if (pool.length) { const d = pick(pool); opts.push({ kind: 'place', file: d.file, en: `Put ${art(d.en)} ${d.en} in the ${v.mode === 'city' ? 'town' : 'room'}.` }); }
    const paintable = l.filter((p) => { const d = def(p.file); return d?.pack === 'kenney' && d.paint !== 'none' && v.mode === 'room'; });
    if (paintable.length) { const p = pick(paintable); const c = pick(PAINT.filter((x) => x.hex !== p.color)); opts.push({ kind: 'color', file: p.file, color: c.hex, en: `Make the ${def(p.file).en} ${c.en}.` }); }
    const smalls = [...new Set(l.filter((p) => def(p.file)?.small).map((p) => p.file))];
    const surf = [...new Set(l.filter((p) => def(p.file)?.surface).map((p) => p.file))];
    if (smalls.length && surf.length) { const a = pick(smalls), b = pick(surf); opts.push({ kind: 'on', file: a, target: b, en: `Put the ${def(a).en} on the ${def(b).en}.` }); }
    const solid = [...new Set(l.filter((p) => { const d = def(p.file); return d && !d.rug && !d.wall && !d.small; }).map((p) => p.file))];
    if (solid.length >= 2) { const a = pick(solid), b = pick(solid.filter((x) => x !== a)); opts.push({ kind: 'next', file: a, target: b, en: `Put the ${def(a).en} next to the ${def(b).en}.` }); }
    const fresh = opts.filter((o) => !prev || o.en !== prev.en);
    return pick(fresh.length ? fresh : opts.length ? opts : [{ kind: 'place', file: 'bush', en: 'Put a bush in the town.' } as Task]);
  }, []);
  const done = (t: Task) => {
    const sc = scene.current; if (!sc) return false;
    const v = viewRef.current;
    if (t.kind === 'inside') return v.mode === 'room';
    const l = curList();
    const of = (f: string) => l.filter((p) => p.file === f);
    if (t.kind === 'place') return of(t.file).length > 0 && (t.file !== 'road_straight' || true);
    if (t.kind === 'color') return of(t.file).some((p) => p.color === t.color);
    if (t.kind === 'on') return of(t.file).some((p) => sc.supportOf(p.uid) === t.target);
    return of(t.file).some((a) => of(t.target!).some((b) => { const g = sc.gap(a.uid, b.uid); return g >= -0.001 && g <= (v.mode === 'city' ? 0.6 : 0.15); }));
  };
  const reward = () => {
    sfx.coin(); setParty((n) => n + 1); say('Well done!');
    setS((c) => ({ ...c, coins: c.coins + 5, done: c.done + 1 }));
    const prev = task; setTask(null);
    window.setTimeout(() => setTask(makeTask(sRef.current, viewRef.current, prev ?? undefined)), 1500);
  };
  useEffect(() => { if (loaded && ready) { if (task && done(task)) reward(); else if (!task || (task.kind !== 'inside' && !(mode === 'city' ? CITY_ITEMS : ROOM_ITEMS).some((d) => d.file === task.file))) setTask(makeTask(sRef.current, view)); } }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- дії ----------
  const items = useMemo(() => (mode === 'city' ? CITY_ITEMS : ROOM_ITEMS).filter((d) => d.cat === cat), [mode, cat]);
  const cats = mode === 'city' ? CITY_CATS : ROOM_CATS;
  const add = async (d: WorldItem, at?: { clientX: number; clientY: number }) => {
    if (!owned(d)) {
      if (s.coins < (d.price ?? 0)) { sfx.bad(); flash(`You need ${d.price} coins. Do tasks to get more!`); return; }
      setS((c) => ({ ...c, coins: c.coins - (d.price ?? 0), unlocked: [...c.unlocked, key(mode, d.file)] })); sfx.coin(); flash(`New: ${d.en}!`); say(`${art(d.en)} ${d.en}`); return;
    }
    const sc = scene.current; if (!sc) return;
    const near = at ? sc.pointAt(at.clientX, at.clientY, !!d.wall) : null;
    if (at && !near) return;
    const spot = await sc.findSpot(d.file, near ?? undefined);
    if (!spot) { sfx.bad(); flash(near ? "Oops! You can't put it here." : 'No free space. Move or remove something.'); return; }
    const uid = uidOf();
    setList((l) => [...l, { ...spot, uid }]);
    if (d.building) setS((c) => ({ ...c, houses: { ...c.houses, [uid]: { placed: [], wall: 0, floor: 0 } } }));
    setSel(uid); sfx.pop(); say(`${art(d.en)} ${d.en}`);
  };
  const cur = list.find((p) => p.uid === sel) ?? null;
  const curDef = cur ? getItem(mode, cur.file) : undefined;
  const update = (patch: Partial<Placed>) => cur && setList((l) => l.map((q) => (q.uid === cur.uid ? { ...q, ...patch } : q)));
  const rotate = () => {
    const sc = scene.current; if (!cur || !sc) return;
    const p = { ...cur, rot: (cur.rot + 1) % 4 };
    if (!sc.canPlace(cur.uid, p)) { sfx.bad(); flash('No space to turn it here.'); return; }
    const kids = sc.carried(cur.uid);
    setList((l) => l.map((q) => {
      if (q.uid === cur.uid) return { ...q, rot: p.rot };
      if (!kids.includes(q.uid)) return q;
      const ox = q.x - cur.x, oz = q.z - cur.z;
      return { ...q, x: +(cur.x + oz).toFixed(2), z: +(cur.z - ox).toFixed(2), rot: (q.rot + 1) % 4 };
    }));
    sfx.pop(); sc.bounce(cur.uid);
  };
  const nudge = (k: 'up' | 'down' | 'left' | 'right') => {
    const sc = scene.current; if (!cur || !sc) return;
    const { dx, dz } = sc.screenDir(k);
    const patch = sc.nudge(cur.uid, dx, dz);
    if (!patch) { sfx.bad(); return; }
    const kids = sc.carried(cur.uid);
    const ddx = patch.x! - cur.x, ddz = patch.z! - cur.z;
    setList((l) => l.map((q) => q.uid === cur.uid ? { ...q, ...patch } : kids.includes(q.uid) ? { ...q, x: +(q.x + ddx).toFixed(2), z: +(q.z + ddz).toFixed(2) } : q));
    sfx.pick();
  };
  const copy = async () => {
    const sc = scene.current; if (!cur || !sc || curDef?.building) return;
    const spot = await sc.findSpot(cur.file); if (!spot) { sfx.bad(); flash('No free space for a copy.'); return; }
    const uid = uidOf(); setList((l) => [...l, { ...spot, uid, color: cur.color, rot: cur.rot }]); setSel(uid); sfx.pop();
  };
  const remove = () => {
    if (!cur) return;
    setList((l) => l.filter((q) => q.uid !== cur.uid));
    if (curDef?.building) setS((c) => { const h = { ...c.houses }; delete h[cur.uid]; return { ...c, houses: h }; });
    setSel(null); sfx.pick();
  };
  const goInside = () => { if (!cur || !curDef?.building) return; setS((c) => (c.houses[cur.uid] ? c : { ...c, houses: { ...c.houses, [cur.uid]: { placed: [], wall: 0, floor: 0 } } })); setView({ mode: 'room', house: cur.uid }); say(`Welcome to your ${curDef.en}!`); };
  const backToTown = () => { setView({ mode: 'city' }); say('Back to town!'); };
  const clearHere = () => {
    if (!confirm(mode === 'city' ? 'Start the town again?' : 'Make this room empty?')) return;
    if (mode === 'city') setS((c) => ({ ...c, city: [], houses: {} })); else setList(() => []);
    setSel(null);
  };
  const setHouse = (patch: Partial<House>) => view.house && setS((c) => ({ ...c, houses: { ...c.houses, [view.house!]: { ...(c.houses[view.house!] ?? { placed: [], wall: 0, floor: 0 }), ...patch } } }));
  const pickHero = (file: string | null) => { setS((c) => ({ ...c, hero: file })); scene.current?.setHero(file); setHeroes(false); const h = HEROES.find((x) => x.file === file); if (h) say(`Hi! I'm ${h.en}!`); };
  const full = () => { const el = wrap.current; if (!el) return; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); else el.requestFullscreen?.().catch(() => {}); };

  // клавіатура: стрілки рухають, R повертає, Delete прибирає
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea, select')) return;
      if (!cur) return;
      const map: Record<string, 'up' | 'down' | 'left' | 'right'> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
      if (map[e.key]) { e.preventDefault(); nudge(map[e.key]); }
      if (e.key === 'r' || e.key === 'R') rotate();
      if (e.key === 'Delete' || e.key === 'Backspace') remove();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // ---------- перетягування з каталогу ----------
  const press = useRef<{ def: WorldItem; x: number; y: number; dragging: boolean } | null>(null);
  const onCardDown = (e: React.PointerEvent, d: WorldItem) => {
    if (e.button > 0) return;
    press.current = { def: d, x: e.clientX, y: e.clientY, dragging: false };
    const move = (ev: PointerEvent) => {
      const p = press.current; if (!p) return;
      if (!p.dragging && Math.hypot(ev.clientX - p.x, ev.clientY - p.y) > 8 && owned(p.def)) p.dragging = true;
      if (p.dragging) setGhost({ def: p.def, x: ev.clientX, y: ev.clientY });
    };
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
      const p = press.current; press.current = null; setGhost(null);
      if (!p) return;
      if (p.dragging) add(p.def, { clientX: ev.clientX, clientY: ev.clientY });
      else add(p.def);
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };

  if (err) return <div className="t-card"><p>Your browser can’t show 3D. Try Chrome, Safari or Edge.</p></div>;
  const taskDef = task ? getItem(task.kind === 'inside' ? 'city' : mode, task.file) : undefined;
  const heroName = HEROES.find((h) => h.file === s.hero)?.en;

  return (
    <div className="hm" ref={wrap} lang="en">
      <div className="rw-top">
        <div className="rw-coins" aria-label={`Coins: ${s.coins}`}><span className="rw-coin" />{s.coins}</div>
        <div className="rw-task" aria-live="polite">
          {task ? (
            <>
              <button className="rw-say" onClick={() => say(task.en)} aria-label="Listen"><Icon id="e-speak" /></button>
              {taskDef && <span className="hm-task-thumb"><Thumb def={taskDef} /></span>}
              <div><b>{task.en}</b></div>
              <button className="t-link-btn" onClick={() => setTask(makeTask(s, view, task))}>Another task</button>
            </>
          ) : <b className="rw-well">{ready ? 'Well done! +5' : 'Loading…'}</b>}
        </div>
        <div className="rw-tools">
          <button className={`g-chip hm-en ${labelsOn ? 'is-on' : ''}`} onClick={() => setLabelsOn(!labelsOn)} aria-pressed={labelsOn}>Labels</button>
          <button className="g-chip hm-en" onClick={() => setHeroes(!heroes)}>{heroName ? `Hero: ${heroName}` : 'Hero'}</button>
          <button className="g-chip hm-en" onClick={full}>Full screen</button>
        </div>
      </div>
      {heroes && (
        <div className="rw-sel hm-heroes">
          <b>Choose your hero</b>
          {HEROES.map((h) => <button key={h.file} className={`g-chip hm-en ${s.hero === h.file ? 'is-on' : ''}`} onClick={() => pickHero(h.file)}>{h.en}</button>)}
          <button className={`g-chip hm-en ${!s.hero ? 'is-on' : ''}`} onClick={() => pickHero(null)}>No hero</button>
        </div>
      )}

      <div className="hm-stage">
        <div ref={host} className="hm-canvas" />
        <div ref={labels} className="hm-labels" aria-hidden="true" />
        <div className="hm-where">
          {mode === 'room'
            ? <button className="mu-btn t-btn-sm hm-en" onClick={backToTown}>← Back to town</button>
            : <span className="hm-chip">My town</span>}
          {mode === 'room' && <span className="hm-chip">Inside: {getItem('city', s.city.find((p) => p.uid === view.house)?.file ?? '')?.en ?? 'house'}</span>}
        </div>
        <div className="hm-cam">
          <button onClick={() => scene.current?.turn(-1)} aria-label="Turn left" title="Turn left">↺</button>
          <button onClick={() => scene.current?.turn(1)} aria-label="Turn right" title="Turn right">↻</button>
        </div>
        {!ready && <div className="hm-loading">Loading…</div>}
        {list.length === 0 && ready > 0 && <div className="hm-empty">{mode === 'city' ? 'Your town is empty. Pick a house below and drag it here!' : 'This room is empty. Drag furniture here!'}</div>}
        {party > 0 && <div key={party} className="rw-party" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}</div>}
        {msg && <div className="rw-msg" role="status">{msg}</div>}
      </div>

      {cur && curDef ? (
        <div className="rw-sel">
          <button className="rw-say" onClick={() => say(`${art(nameOf(cur))} ${nameOf(cur)}`)} aria-label="Listen"><Icon id="e-speak" /></button>
          <div className="rw-sel__name"><b>{art(nameOf(cur))} {nameOf(cur)}</b></div>
          {curDef.pack === 'kenney' && curDef.paint !== 'none' && mode === 'room' && (
            <div className="rw-colors" role="radiogroup" aria-label="Colour">
              {PAINT.map((c) => <button key={c.en} role="radio" aria-checked={cur.color === c.hex} title={c.en} aria-label={c.en} className={`rw-sw ${cur.color === c.hex ? 'is-on' : ''}`} style={{ background: c.hex }} onClick={() => { update({ color: c.hex }); sfx.paint(); say(c.en); scene.current?.bounce(cur.uid); }} />)}
            </div>
          )}
          {!curDef.wall && (
            <div className="hm-arrows" aria-label="Move">
              <button onClick={() => nudge('left')} aria-label="Move left">←</button>
              <button onClick={() => nudge('up')} aria-label="Move up">↑</button>
              <button onClick={() => nudge('down')} aria-label="Move down">↓</button>
              <button onClick={() => nudge('right')} aria-label="Move right">→</button>
            </div>
          )}
          {curDef.building && <button className="mu-btn mu-btn--lime t-btn-sm hm-en" onClick={goInside}>Go inside</button>}
          {!curDef.wall && <button className="mu-btn t-btn-sm hm-en" onClick={rotate}>Turn</button>}
          {!curDef.building && <button className="mu-btn t-btn-sm hm-en" onClick={copy}>Copy</button>}
          <button className="mu-btn t-btn-sm hm-en" onClick={remove}>Remove</button>
        </div>
      ) : (
        <div className="rw-sel hm-room">
          {mode === 'room' ? (
            <>
              <div className="hm-room__g"><b>Walls</b><div className="rw-colors">{WALLS.map((w, i) => <button key={w.en} title={w.en} aria-label={`${w.en} walls`} className={`rw-sw ${(house?.wall ?? 0) === i ? 'is-on' : ''}`} style={{ background: w.hex }} onClick={() => { setHouse({ wall: i }); sfx.paint(); say(`${w.en} walls`); }} />)}</div></div>
              <div className="hm-room__g"><b>Floor</b><div className="rw-colors">{FLOORS.map((f, i) => <button key={f.en} title={f.en} aria-label={`${f.en} floor`} className={`rw-sw ${(house?.floor ?? 0) === i ? 'is-on' : ''}`} style={{ background: f.hex }} onClick={() => { setHouse({ floor: i }); sfx.paint(); say(f.en); }} />)}</div></div>
            </>
          ) : (
            <div className="hm-room__g"><b>Ground</b><div className="rw-colors">{GROUNDS.map((g, i) => <button key={g.en} title={g.en} aria-label={g.en} className={`rw-sw ${s.ground === i ? 'is-on' : ''}`} style={{ background: g.hex }} onClick={() => { setS((c) => ({ ...c, ground: i })); sfx.paint(); say(g.en); }} />)}</div></div>
          )}
          <button className="t-link-btn hm-en" onClick={clearHere}>{mode === 'city' ? 'New town' : 'Empty room'}</button>
        </div>
      )}

      <div className="rw-shop">
        <div className="g-chips" role="tablist">
          {cats.map((c) => <button key={c} role="tab" aria-selected={cat === c} className={`g-chip hm-en ${cat === c ? 'is-on' : ''}`} onClick={() => { setCat(c); say(c); }}>{c}</button>)}
        </div>
        <div className="rw-shelf">
          {items.map((d) => {
            const ok = owned(d);
            return (
              <button key={d.file} className={`rw-card hm-card ${ok ? '' : 'is-locked'}`} onPointerDown={(e) => onCardDown(e, d)} onClick={(e) => { if (e.detail === 0) add(d); }} aria-label={ok ? `Add ${d.en}` : `Open ${d.en} for ${d.price} coins`}>
                <Thumb def={d} />
                <b>{d.en}</b>
                {!ok && <small className="rw-price"><span className="rw-coin" />{d.price}</small>}
              </button>
            );
          })}
        </div>
      </div>
      {ghost && <div className="hm-ghost" style={{ left: ghost.x, top: ghost.y }}><Thumb def={ghost.def} /></div>}
      <p className="rw-help t-muted">Drag things from the shelf into the {mode === 'city' ? 'town' : 'room'}. Drag them to move. Tap the floor and your hero walks there. Choose a house and press “Go inside”.</p>
    </div>
  );
}
