'use client';
// Гра «Murly Town»: будуєш місто, обираєш будинок, заходиш усередину й облаштовуєш кімнату.
// Увесь текст у грі англійською (вимога Марії): гра сама вчить словам.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import Icon from '../Icon';
import { CITY_CATS, CITY_ITEMS, FLOORS, GROUNDS, HEROES, PAINT, ROOM_CATS, ROOM_ITEMS, ROOM_SIZES, ROOM_TYPES, WALLS, YARD_CATS, YARD_ITEMS, actOf, getItem, type WorldItem } from '@/lib/worlds/world-items';
import EarnCoins from './EarnCoins';
import HousePlan from './HousePlan';
import { attach, contact, doorsOf, grow, layout, sharedSides } from '@/lib/worlds/house-plan';
import { art, say, sfx } from '@/lib/worlds/sound';
import type { CamView, HeroAct, HeroStart, Placed, ScenePlan, WorldScene, WorldMode } from '@/lib/worlds/world-scene';
import ATLAS from '@/lib/worlds/kenney-thumbs.json';

const SAVE = 'murly-town-v1';
type Room = { id: string; name: string; placed: Placed[]; wall: number; floor: number; size: number; at?: { x: number; z: number }; level?: number };
type House = { rooms: Room[]; yard: Placed[]; placed?: Placed[]; wall?: number; floor?: number };
type View = { mode: WorldMode; house?: string; room?: string };
const newRoom = (name: string, id = `r${Date.now().toString(36)}`): Room => ({ id, name, placed: [], wall: 0, floor: 0, size: 2.8 });
// старі збереження: одна кімната без списку кімнат
// кімнати без місця на плані ставимо впритул одна до одної
const normHouse = (h?: Partial<House>): House => ({
  rooms: layout(h?.rooms?.length ? h.rooms : [{ id: 'r1', name: 'Living room', placed: h?.placed ?? [], wall: h?.wall ?? 0, floor: h?.floor ?? 0, size: 2.8 }]),
  yard: h?.yard ?? [],
});
// дані для сцени: двері поточної кімнати і сусіди на тому ж поверсі
function planFor(h: House, me: Room): ScenePlan {
  const same = h.rooms.filter((r) => (r.level ?? 0) === (me.level ?? 0));
  const others = same.filter((r) => r.id !== me.id);
  const done: Room[] = [me];
  const rooms = others.map((r) => {
    // стіну, яку повністю вже намалювала інша кімната, не малюємо вдруге
    const skip = [0, 1, 2, 3].filter((side) => done.some((o) => { const c = contact(r, o); return c && c.side === side && c.hi - c.lo >= r.size - 0.02; }));
    done.push(r);
    const f = FLOORS[r.floor] ?? FLOORS[0];
    return { id: r.id, name: r.name, size: r.size, x: +(r.at!.x - me.at!.x).toFixed(2), z: +(r.at!.z - me.at!.z).toFixed(2), wall: (WALLS[r.wall] ?? WALLS[0]).hex, floor: { hex: f.hex, kind: f.kind }, placed: r.placed, doors: doorsOf(r.id, same), shared: sharedSides(r.id, same), skip };
  });
  // нагорі: під ногами видно кімнати нижнього поверху
  const lower = h.rooms.filter((r) => (r.level ?? 0) === (me.level ?? 0) - 1);
  const shown: Room[] = [];
  const below = lower.map((r) => {
    const skip = [0, 1, 2, 3].filter((side) => shown.some((o) => { const c = contact(r, o); return c && c.side === side && c.hi - c.lo >= r.size - 0.02; }));
    shown.push(r);
    const f = FLOORS[r.floor] ?? FLOORS[0];
    return { id: r.id, name: r.name, size: r.size, x: +(r.at!.x - me.at!.x).toFixed(2), z: +(r.at!.z - me.at!.z).toFixed(2), wall: (WALLS[r.wall] ?? WALLS[0]).hex, floor: { hex: f.hex, kind: f.kind }, placed: r.placed, doors: doorsOf(r.id, lower), shared: sharedSides(r.id, lower), skip };
  });
  return { me: me.id, doors: doorsOf(me.id, same), shared: sharedSides(me.id, same), entrance: me.id === h.rooms[0].id, rooms, below };
}
// кімната на іншому поверсі над / під точкою (або перша на тому поверсі)
const roomOnLevel = (h: House, level: number, near?: { x: number; z: number }) => {
  const on = h.rooms.filter((r) => (r.level ?? 0) === level); if (!on.length) return undefined;
  if (!near) return on[0];
  return on.find((r) => Math.abs(r.at!.x - near.x) <= r.size / 2 && Math.abs(r.at!.z - near.z) <= r.size / 2)
    ?? [...on].sort((a, b) => Math.hypot(a.at!.x - near.x, a.at!.z - near.z) - Math.hypot(b.at!.x - near.x, b.at!.z - near.z))[0];
};
type Save = { coins: number; unlocked: string[]; done: number; ground: number; city: Placed[]; houses: Record<string, House>; hero: string | null; started?: boolean; playerName?: string; savedAt?: number; tips?: boolean };
type Task = { kind: 'place' | 'color' | 'on' | 'next' | 'inside'; file: string; target?: string; color?: string; en: string };
const START: Save = { coins: 20, unlocked: [], done: 0, ground: 0, city: [], houses: {}, hero: 'Rogue', started: false, playerName: '' };
const uidOf = () => `u${Date.now().toString(36)}${Math.floor(Math.random() * 99)}`;
const key = (mode: WorldMode, file: string) => `${mode}:${file}`;
const catalog = (m: WorldMode) => (m === 'city' ? CITY_ITEMS : m === 'yard' ? YARD_ITEMS : ROOM_ITEMS);
const catsOf = (m: WorldMode) => (m === 'city' ? CITY_CATS : m === 'yard' ? YARD_CATS : ROOM_CATS);
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

function HeroPic({ file }: { file: string }) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => { let on = true; import('@/lib/worlds/world-scene').then((m) => m.renderHero(file)).then((u) => { if (on) setSrc(u); }).catch(() => {}); return () => { on = false; }; }, [file]);
  return src ? <img src={src} alt="" className="hm-hero-pic" draggable={false} /> : <span className="hm-hero-pic hm-thumb--wait" />;
}

// Екран початку гри: вибір героя та ім'я
function StartScreen({ onStart }: { onStart: (hero: string, name: string) => void }) {
  const [hero, setHero] = useState(HEROES[0].file);
  const [name, setName] = useState('');
  return (
    <div className="hm-start" role="dialog" aria-label="Choose your hero">
      <h2>Welcome to Murly Town!</h2>
      <p>Choose your hero</p>
      <div className="hm-start__heroes" role="radiogroup">
        {HEROES.map((h) => (
          <button key={h.file} role="radio" aria-checked={hero === h.file} className={`hm-start__hero ${hero === h.file ? 'is-on' : ''}`} onClick={() => { setHero(h.file); say(`Hi! I'm ${h.en}!`); }}>
            <HeroPic file={h.file} /><b>{h.en}</b>
          </button>
        ))}
      </div>
      <label className="hm-start__name">What’s your name?
        <input value={name} maxLength={20} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z '-]/g, ''))} placeholder="Type in English" />
      </label>
      <button className="mu-btn mu-btn--lime mu-btn--lg hm-en" onClick={() => onStart(hero, name.trim())}>Let’s play!</button>
    </div>
  );
}

// Короткі підказки на старті: що робити і як рухатися (показуються один раз, потім з меню Help)
const TIPS: Record<WorldMode, { en: string }[]> = {
  city: [
    { en: 'Pick a house in the shop below and drag it onto the green ground.' },
    { en: 'Drag the ground to move around. Buttons ↺ ↻ turn, + − zoom.' },
    { en: 'Tap your house, then press “Go inside” to make rooms.' },
    { en: 'Do the task at the top to get coins. New things cost coins.' },
  ],
  yard: [
    { en: 'This is your garden. Drag trees, flowers and a pool here.' },
    { en: 'Tap the house to go inside.' },
  ],
  room: [
    { en: 'Drag furniture from the shop into the room.' },
    { en: 'Tap a thing to turn it, paint it or remove it.' },
    { en: 'Tap the floor and your hero walks there.' },
  ],
};

const migrate = (sv: Save): Save => ({ ...sv, houses: Object.fromEntries(Object.entries(sv.houses ?? {}).map(([k, h]) => [k, normHouse(h)])) });

export default function TownGame({ full: fullPage = false, guest = false }: { full?: boolean; guest?: boolean }) {
  const auth = useAuth();
  // гостьовий режим (?guest=1): окреме збереження в браузері, без акаунта й гаманця
  const isLoaded = auth.isLoaded, isSignedIn = guest ? false : auth.isSignedIn;
  const SAVE_KEY = guest ? `${SAVE}-guest` : SAVE;
  const [cloud, setCloud] = useState<'off' | 'saving' | 'saved' | 'error'>('off');
  const host = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const scene = useRef<WorldScene | null>(null);
  const [s, setS] = useState<Save>(START);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<View>({ mode: 'city' });
  const [earn, setEarn] = useState(false);
  const [roomMenu, setRoomMenu] = useState(false);
  const [shopOpen, setShopOpen] = useState(true);
  const [ready, setReady] = useState(0); // лічильник: нова сцена готова
  const [sel, setSel] = useState<string | null>(null);
  const [cat, setCat] = useState(CITY_CATS[0]);
  const [task, setTask] = useState<Task | null>(null);
  const [labelsOn, setLabelsOn] = useState(true);
  const [msg, setMsg] = useState('');
  const [party, setParty] = useState(0);
  const [heroes, setHeroes] = useState(false);
  const [heroBar, setHeroBar] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [newFloor, setNewFloor] = useState(0); // на якому поверсі будувати нову кімнату
  const [menu, setMenu] = useState(false); // меню ☰: підписи, герой, екран, нове місто
  const [tip, setTip] = useState(-1); // крок підказки на старті (-1: сховано)
  const [hint, setHint] = useState<string | null>(null); // картка в магазині, яку підсвічуємо для завдання
  const pending = useRef<{ heroAt: HeroStart; view: CamView } | null>(null);
  // висота магазину внизу: панель вибраного предмета і кнопки камери стоять над ним
  const shopEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = shopEl.current; const root = wrap.current; if (!el || !root || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => root.style.setProperty('--shop-h', `${Math.ceil(el.getBoundingClientRect().height)}px`));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  const [ghost, setGhost] = useState<{ def: WorldItem; x: number; y: number } | null>(null);
  const [err, setErr] = useState(false);
  const sRef = useRef(s); sRef.current = s;
  const viewRef = useRef(view); viewRef.current = view;
  const mode = view.mode;

  const flash = (t: string) => { setMsg(t); window.setTimeout(() => setMsg(''), 2400); };

  // ---------- збереження: у браузері завжди, у хмарі для тих, хто увійшов ----------
  useEffect(() => {
    let local: Save = START;
    try { const raw = localStorage.getItem(SAVE_KEY); if (raw) local = { ...START, ...JSON.parse(raw) }; } catch { /* новий гравець */ }
    if (!isLoaded) return;
    if (!isSignedIn) { setS(migrate(local)); setLoaded(true); return; }
    Promise.all([
      fetch('/api/game?game=town').then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch('/api/coins').then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ]).then(([g, c]) => {
      const cloudSave = g?.data as Save | null;
      const pick = cloudSave && (cloudSave.savedAt ?? 0) >= (local.savedAt ?? 0) ? { ...START, ...cloudSave } : local;
      if (c && typeof c.balance === 'number') pick.coins = c.balance; // монетки беремо з гаманця
      setS(migrate(pick)); setLoaded(true); setCloud('saved');
    });
  }, [isLoaded, isSignedIn]);
  const cloudTimer = useRef<number>();
  useEffect(() => {
    if (!loaded) return;
    const data = { ...s, savedAt: Date.now() };
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch { /* немає сховища */ }
    if (!isSignedIn) return;
    window.clearTimeout(cloudTimer.current);
    setCloud('saving');
    cloudTimer.current = window.setTimeout(() => {
      fetch('/api/game', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ game: 'town', data }) })
        .then((r) => setCloud(r.ok ? 'saved' : 'error')).catch(() => setCloud('error'));
    }, 1500);
  }, [s, loaded, isSignedIn]);
  // монетки: якщо учень увійшов, рахуємо в спільному гаманці сайту
  const coinsApi = async (op: 'earn' | 'spend', amount: number, reason: string): Promise<number | null> => {
    if (!isSignedIn) return null;
    const r = await fetch('/api/coins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op, amount, reason, source: 'game' }) }).catch(() => null);
    if (!r) return null;
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return op === 'spend' ? -1 : null;
    return typeof d.balance === 'number' ? d.balance : null;
  };

  // список предметів поточного місця
  const listOf = (c: Save, v: View): Placed[] => {
    if (v.mode === 'city') return c.city;
    const h = c.houses[v.house ?? '']; if (!h) return [];
    if (v.mode === 'yard') return h.yard ?? [];
    return (h.rooms.find((r) => r.id === v.room) ?? h.rooms[0])?.placed ?? [];
  };
  const list = listOf(s, view);
  const setList = useCallback((fn: (l: Placed[]) => Placed[]) => {
    setS((c) => {
      const v = viewRef.current;
      if (v.mode === 'city') return { ...c, city: fn(c.city) };
      const h = normHouse(c.houses[v.house!]);
      if (v.mode === 'yard') return { ...c, houses: { ...c.houses, [v.house!]: { ...h, yard: fn(h.yard) } } };
      const rid = v.room ?? h.rooms[0].id;
      return { ...c, houses: { ...c.houses, [v.house!]: { ...h, rooms: h.rooms.map((r) => (r.id === rid ? { ...r, placed: fn(r.placed) } : r)) } } };
    });
  }, []);

  const house = view.house ? s.houses[view.house] : undefined;
  const room = house && view.mode === 'room' ? house.rooms.find((r) => r.id === view.room) ?? house.rooms[0] : undefined;
  const roomSize = room?.size;
  // сцена перебудовується, коли змінюється план або сусідні кімнати (але не колір поточної)
  const planKey = house && room ? normHouse(house).rooms.map((r) => [r.id, r.size, r.at?.x, r.at?.z, r.level ?? 0, r.id === room.id ? '' : `${r.wall}.${r.floor}.${r.placed.length}.${r.placed.map((q) => q.x + q.z + q.rot).join('.')}`].join(',')).join('|') : '';

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
          onHero: () => { const h = HEROES.find((x) => x.file === sRef.current.hero); say(`Hello! I'm ${sRef.current.playerName || h?.en || 'here'}!`); setSel(null); setHeroBar(true); },
          onHouse: () => enterRoom(),
          onArrive: () => changeFloor(),
          onRoom: (id, heroAt, cam) => { pending.current = { heroAt, view: cam }; const h = normHouse(sRef.current.houses[viewRef.current.house ?? '']); const r = h.rooms.find((q) => q.id === id); setView({ mode: 'room', house: viewRef.current.house, room: id }); if (r) say(`The ${r.name.toLowerCase()}`); },
        }, view.mode, sceneOpts());
        scene.current = sc;
        sc.setHero(sRef.current.hero);
        if (view.mode === 'yard') sc.setHouse(getItem('city', cityFile(view.house) ?? ''));
        setReady((n) => n + 1);
      } catch { setErr(true); }
    });
    setCat(catsOf(view.mode)[0]);
    return () => { alive = false; };
  }, [view.mode, view.house, view.room, roomSize, planKey, loaded]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { scene.current?.dispose(); scene.current = null; }, []);

  const curList = () => listOf(sRef.current, viewRef.current);
  const cityFile = (uid?: string) => sRef.current.city.find((p) => p.uid === uid)?.file;
  const sceneOpts = () => {
    const v = viewRef.current; const d = getItem('city', cityFile(v.house) ?? '');
    const r = curRoom(); const h = sRef.current.houses[v.house ?? ''];
    const p = pending.current; pending.current = null;
    return { roomSize: r?.size, sky: (d?.private ? 'garden' : 'clouds') as 'garden' | 'clouds', plan: v.mode === 'room' && h && r ? planFor(normHouse(h), normHouse(h).rooms.find((q) => q.id === r.id)!) : undefined, heroAt: p?.heroAt, view: p?.view };
  };
  const curRoom = () => { const v = viewRef.current; const h = sRef.current.houses[v.house ?? '']; if (!h) return undefined; const n = normHouse(h); return n.rooms.find((r) => r.id === v.room) ?? n.rooms[0]; };
  const changeFloor = (to?: number) => {
    const v = viewRef.current; if (v.mode !== 'room' || !v.house) return;
    const h = normHouse(sRef.current.houses[v.house]); const me = h.rooms.find((r) => r.id === v.room) ?? h.rooms[0];
    const lv = me.level ?? 0, target = to ?? (lv === 0 || h.rooms.some((r) => (r.level ?? 0) === lv + 1) ? lv + 1 : lv - 1);
    const r = roomOnLevel(h, target, me.at);
    if (!r) { sfx.bad(); flash(target > lv ? 'Build a room upstairs first: + Room, then Upstairs.' : 'There is no floor below.'); return; }
    setView({ mode: 'room', house: v.house, room: r.id });
    say(target > lv ? `Upstairs! The ${r.name.toLowerCase()}.` : `Downstairs! The ${r.name.toLowerCase()}.`);
  };
  const enterRoom = (rid?: string) => { const v = viewRef.current; const h = normHouse(sRef.current.houses[v.house ?? '']); setView({ mode: 'room', house: v.house, room: rid ?? h.rooms[0].id }); say(`Welcome to the ${(h.rooms.find((r) => r.id === rid) ?? h.rooms[0]).name.toLowerCase()}!`); };
  const nameOf = (p: Placed) => { const d = getItem(viewRef.current.mode, p.file); const c = colorName(p.color); return d ? (c ? `${c} ${d.en}` : d.en) : p.file; };

  // кольори і герой
  useEffect(() => {
    const sc = scene.current; if (!sc || !ready) return;
    if (mode !== 'room') sc.setGround(GROUNDS[s.ground]?.hex ?? GROUNDS[0].hex);
    else { sc.setWall(WALLS[room?.wall ?? 0].hex); const f = FLOORS[room?.floor ?? 0]; sc.setFloor(f.hex, f.kind); }
  }, [ready, mode, s.ground, room?.wall, room?.floor]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (scene.current) scene.current.showLabels = labelsOn; scene.current?.wake(); }, [labelsOn, ready]);
  // підказки показуємо один раз (для старих гравців теж), далі з меню Help
  useEffect(() => { if (loaded && s.started && !s.tips && tip < 0) setTip(0); }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps
  const tips = TIPS[mode];
  const closeTips = () => { setTip(-1); setS((c) => ({ ...c, tips: true })); };
  // «Покажи»: відкрити потрібну полицю і підсвітити картку з предметом завдання
  const showTask = () => {
    if (!task) return;
    if (task.kind === 'inside') { const p = list.find((q) => q.file === task.file); if (p) { setSel(p.uid); say('Tap “Go inside”.'); } return; }
    const d = getItem(mode, task.file); if (!d) return;
    setShopOpen(true); setCat(d.cat); setHint(d.file); say(`${art(d.en)} ${d.en}`);
    window.setTimeout(() => document.querySelector(`[data-card="${d.file}"]`)?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }), 80);
    window.setTimeout(() => setHint(null), 6000);
  };
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
  const makeTask = useCallback((st: Save, v: View, prev?: Task): Task => {
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
    const own = (d: WorldItem) => !d.price || st.unlocked.includes(key(v.mode, d.file));
    const l = listOf(st, v);
    const files = l.map((p) => p.file);
    const def = (f: string) => getItem(v.mode, f)!;
    const opts: Task[] = [];
    if (v.mode === 'city') {
      const houses = l.filter((p) => def(p.file)?.building);
      if (!houses.length) return { kind: 'place', file: 'building_A', en: 'Build a house in the town.' };
      if (!files.some((f) => f.startsWith('road'))) return { kind: 'place', file: 'road_straight', en: 'Put a road next to your house.' };
      if (!Object.values(st.houses).some((h) => normHouse(h).rooms.some((r) => r.placed.length) || (h.yard?.length ?? 0) > 0)) return { kind: 'inside', file: houses[0].file, en: `Go inside the ${def(houses[0].file).en}.` };
    }
    const pool = catalog(v.mode).filter((d) => own(d) && !d.wall && !files.includes(d.file));
    if (pool.length) { const d = pick(pool); opts.push({ kind: 'place', file: d.file, en: `Put ${art(d.en)} ${d.en} in the ${v.mode === 'city' ? 'town' : v.mode === 'yard' ? 'garden' : 'room'}.` }); }
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
    if (t.kind === 'inside') return v.mode !== 'city';
    const l = curList();
    const of = (f: string) => l.filter((p) => p.file === f);
    if (t.kind === 'place') return of(t.file).length > 0 && (t.file !== 'road_straight' || true);
    if (t.kind === 'color') return of(t.file).some((p) => p.color === t.color);
    if (t.kind === 'on') return of(t.file).some((p) => sc.supportOf(p.uid) === t.target);
    return of(t.file).some((a) => of(t.target!).some((b) => { const g = sc.gap(a.uid, b.uid); return g >= -0.001 && g <= (v.mode === 'city' ? 0.6 : v.mode === 'yard' ? 0.3 : 0.15); }));
  };
  const reward = () => {
    sfx.coin(); setParty((n) => n + 1); say('Well done!');
    setS((c) => ({ ...c, coins: c.coins + 5, done: c.done + 1 }));
    coinsApi('earn', 5, 'town task').then((b) => { if (typeof b === 'number' && b >= 0) setS((c) => ({ ...c, coins: b })); });
    const prev = task; setTask(null);
    window.setTimeout(() => setTask(makeTask(sRef.current, viewRef.current, prev ?? undefined)), 1500);
  };
  useEffect(() => { if (loaded && ready) { if (task && done(task)) reward(); else if (!task || (task.kind !== 'inside' && !catalog(mode).some((d) => d.file === task.file))) setTask(makeTask(sRef.current, view)); } }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- дії ----------
  const items = useMemo(() => catalog(mode).filter((d) => d.cat === cat), [mode, cat]);
  const cats = catsOf(mode);
  const add = async (d: WorldItem, at?: { clientX: number; clientY: number }) => {
    if (!owned(d)) {
      if (s.coins < (d.price ?? 0)) { sfx.bad(); flash(`You need ${d.price} coins. Do tasks to get more!`); return; }
      const paid = await coinsApi('spend', d.price ?? 0, `Murly Town: ${d.en}`);
      if (paid === -1) { sfx.bad(); flash(`You need ${d.price} coins. Do tasks to get more!`); return; }
      setS((c) => ({ ...c, coins: typeof paid === 'number' ? paid : c.coins - (d.price ?? 0), unlocked: [...c.unlocked, key(mode, d.file)] })); sfx.coin(); flash(`New: ${d.en}!`); say(`${art(d.en)} ${d.en}`); return;
    }
    const sc = scene.current; if (!sc) return;
    const near = at ? sc.pointAt(at.clientX, at.clientY, !!d.wall) : null;
    if (at && !near) return;
    const spot = await sc.findSpot(d.file, near ?? undefined);
    if (!spot) { sfx.bad(); flash(near ? "Oops! You can't put it here." : 'No free space. Move or remove something.'); return; }
    const uid = uidOf();
    setList((l) => [...l, { ...spot, uid }]);
    if (d.building) setS((c) => ({ ...c, houses: { ...c.houses, [uid]: normHouse() } }));
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
  const goInside = () => {
    if (!cur || !curDef?.building) return;
    const h = normHouse(s.houses[cur.uid]);
    setS((c) => ({ ...c, houses: { ...c.houses, [cur.uid]: h } }));
    if (curDef.private) { setView({ mode: 'yard', house: cur.uid }); say(`Welcome to your ${curDef.en}! This is your garden.`); }
    else { setView({ mode: 'room', house: cur.uid, room: h.rooms[0].id }); say(`Welcome to your flat!`); }
  };
  const backToTown = () => { setView({ mode: 'city' }); say('Back to town!'); };
  const isPrivate = !!getItem('city', cityFile(view.house) ?? '')?.private;
  // платимо монетками: з гаманця (якщо увійшов) або з гри
  const pay = async (amount: number, reason: string) => {
    if (!amount) return true;
    if (s.coins < amount) { sfx.bad(); flash(`You need ${amount} coins. Press “Earn coins”!`); return false; }
    const paid = await coinsApi('spend', amount, reason);
    if (paid === -1) { sfx.bad(); flash(`You need ${amount} coins. Press “Earn coins”!`); return false; }
    setS((c) => ({ ...c, coins: typeof paid === 'number' ? paid : c.coins - amount })); sfx.coin(); return true;
  };
  const addRoom = async (name: string) => {
    if (!view.house) return;
    const price = (house?.rooms.length ?? 1) >= 1 ? 15 : 0;
    if (!(await pay(price, `Murly Town: ${name}`))) return;
    const level = newFloor;
    const h0 = normHouse(sRef.current.houses[view.house]);
    const me = h0.rooms.find((q) => q.id === room?.id) ?? h0.rooms[0];
    const onLevel = h0.rooms.filter((q) => (q.level ?? 0) === level);
    // перша кімната нагорі стоїть прямо над поточною; інші поруч із найближчою на тому поверсі
    const r = onLevel.length ? attach({ ...newRoom(name), level }, h0.rooms, roomOnLevel(h0, level, me.at)?.id) : { ...newRoom(name), level, at: { ...me.at! } };
    setS((c) => { const h = normHouse(c.houses[view.house!]); return { ...c, houses: { ...c.houses, [view.house!]: { ...h, rooms: [...h.rooms, r] } } }; });
    setRoomMenu(false); window.setTimeout(() => setView({ mode: 'room', house: view.house, room: r.id }), 0); say(level !== (me.level ?? 0) ? `A new ${name.toLowerCase()} upstairs!` : `A new ${name.toLowerCase()}! It is next to this room.`);
  };
  const growRoom = async () => {
    if (!room || !view.house) return;
    const next = ROOM_SIZES.find((x) => x.size > room.size); if (!next) return;
    if (!(await pay(next.price, `Murly Town: ${next.en} room`))) return;
    setS((c) => { const h = normHouse(c.houses[view.house!]); return { ...c, houses: { ...c.houses, [view.house!]: { ...h, rooms: grow(h.rooms, room.id, next.size) } } }; });
    say(`Now the room is ${next.en}!`);
  };
  const clearHere = () => {
    if (!confirm(mode === 'city' ? 'Start the town again?' : mode === 'yard' ? 'Make the garden empty?' : 'Make this room empty?')) return;
    if (mode === 'city') setS((c) => ({ ...c, city: [], houses: {} })); else setList(() => []);
    setSel(null);
  };
  const setHouse = (patch: Partial<Room>) => view.house && room && setS((c) => { const h = normHouse(c.houses[view.house!]); return { ...c, houses: { ...c.houses, [view.house!]: { ...h, rooms: h.rooms.map((r) => (r.id === room.id ? { ...r, ...patch } : r)) } } }; });
  const doAct = (kind: HeroAct, p?: Placed) => {
    const sc = scene.current; if (!sc || !sc.heroAct(kind, p?.uid)) return;
    const n = p ? `${art(nameOf(p))} ${nameOf(p)}` : '';
    const line: Record<HeroAct, string> = { go: '', sit: `I'm sitting on ${n}.`, sleep: 'Good night! I am going to sleep.', water: `I'm watering ${n}.`, eat: `Yummy! I'm eating ${n}.`, dance: "Let's dance!", wave: 'Hello, friends!', phone: 'Hello? Who is calling?', stand: "I'm standing up." };
    if (line[kind]) say(line[kind]); if (p) setSel(null);
  };
  const ACT_LABEL: Record<string, string> = { sit: 'Sit down', sleep: 'Go to sleep', water: 'Water it', eat: 'Eat it' };
  const pickHero = (file: string | null) => { setS((c) => ({ ...c, hero: file })); scene.current?.setHero(file); setHeroes(false); const h = HEROES.find((x) => x.file === file); if (h) say(`Hi! I'm ${h.en}!`); };
  const start = (hero: string, name: string) => {
    setS((c) => ({ ...c, hero, playerName: name, started: true }));
    setTip(0);
    scene.current?.setHero(hero);
    say(`Hello${name ? `, ${name}` : ''}! Let's build a town!`);
  };
  const full = () => { const el = wrap.current; if (!el) return; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); else el.requestFullscreen?.().catch(() => {}); };

  // клавіатура: стрілки рухають, R повертає, Delete прибирає
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea, select')) return;
      const k = e.key.toLowerCase();
      const pan: Record<string, [number, number]> = { w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
      if (pan[k]) { scene.current?.pan(...pan[k]); return; }
      if (k === 'q') { scene.current?.turn(-1); return; } if (k === 'e') { scene.current?.turn(1); return; }
      if (e.key === '+' || e.key === '=') { scene.current?.zoom(1); return; } if (e.key === '-') { scene.current?.zoom(-1); return; }
      if (!cur) { const m: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }; if (m[e.key]) { e.preventDefault(); scene.current?.pan(...m[e.key]); } return; }
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
    <div className={`hm ${fullPage ? 'hm-full' : ''} ${shopOpen ? '' : 'is-shop-hidden'}`} ref={wrap} lang="en">
      <div className="rw-top">
        {fullPage && <Link href="/games" className="mu-btn t-btn-sm hm-en hm-exit" aria-label="Exit the game">✕ Exit</Link>}
        <button className="rw-coins" onClick={() => setEarn(true)} aria-label={`Coins: ${s.coins}. Earn more`} title="Earn coins"><span className="rw-coin" />{s.coins}<span className="rw-coins__plus" aria-hidden="true">+</span></button>
        <div className="rw-task" aria-live="polite">
          {task ? (
            <>
              <button className="rw-say" onClick={() => say(task.en)} aria-label="Listen"><Icon id="e-speak" /></button>
              {taskDef && <span className="hm-task-thumb"><Thumb def={taskDef} /></span>}
              <div><b>{task.en}</b></div>
              <button className="mu-btn t-btn-sm hm-en hm-showme" onClick={showTask}>Show me</button>
              <button className="hm-iconbtn" onClick={() => setTask(makeTask(s, view, task))} aria-label="Another task" title="Another task">↻</button>
            </>
          ) : <b className="rw-well">{ready ? 'Well done! +5' : 'Loading…'}</b>}
        </div>
        <div className="rw-tools">
          <button className="mu-btn mu-btn--lime t-btn-sm hm-en" onClick={() => setEarn(true)}><span className="rw-coin" />Earn coins</button>
          <button className={`mu-btn t-btn-sm hm-en hm-menu-btn ${menu ? 'is-on' : ''}`} onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Menu">☰ Menu</button>
        </div>
      </div>
      {menu && (
        <div className="hm-menu" role="menu">
          <button role="menuitem" className="hm-menu__it" onClick={() => { setMenu(false); setTip(0); }}>Help: how to play</button>
          <button role="menuitemcheckbox" aria-checked={labelsOn} className="hm-menu__it" onClick={() => setLabelsOn(!labelsOn)}>Labels: {labelsOn ? 'on' : 'off'}</button>
          <button role="menuitem" className="hm-menu__it" onClick={() => { setMenu(false); setHeroes(true); }}>Hero: {s.playerName || heroName || 'none'}</button>
          <button role="menuitem" className="hm-menu__it" onClick={() => { setMenu(false); full(); }}>Full screen</button>
          {mode !== 'room' && (
            <div className="hm-menu__row"><span>{mode === 'yard' ? 'Grass' : 'Ground'}</span><div className="rw-colors">{GROUNDS.map((g, i) => <button key={g.en} title={g.en} aria-label={g.en} className={`rw-sw ${s.ground === i ? 'is-on' : ''}`} style={{ background: g.hex }} onClick={() => { setS((c) => ({ ...c, ground: i })); sfx.paint(); say(g.en); }} />)}</div></div>
          )}
          <button role="menuitem" className="hm-menu__it hm-menu__danger" onClick={() => { setMenu(false); clearHere(); }}>{mode === 'city' ? 'Start a new town' : mode === 'yard' ? 'Empty the garden' : 'Empty this room'}</button>
          <div className="hm-menu__save">
            {isSignedIn
              ? <span className={`hm-save ${cloud}`}>{cloud === 'saving' ? 'Saving…' : cloud === 'error' ? 'Not saved' : 'Saved'}</span>
              : <Link href="/sign-in?redirect_url=/play/town" className="g-chip hm-en">Sign in to save</Link>}
          </div>
        </div>
      )}
      {heroes && (
        <div className="rw-sel hm-heroes">
          <b>Choose your hero</b>
          {HEROES.map((h) => <button key={h.file} className={`g-chip hm-en ${s.hero === h.file ? 'is-on' : ''}`} onClick={() => pickHero(h.file)}>{h.en}</button>)}
          <button className={`g-chip hm-en ${!s.hero ? 'is-on' : ''}`} onClick={() => pickHero(null)}>No hero</button>
          <button className="g-chip hm-en" onClick={() => setHeroes(false)}>Close</button>
        </div>
      )}

      <div className="hm-stage">
        <div ref={host} className="hm-canvas" />
        <div ref={labels} className="hm-labels" aria-hidden="true" />
        <div className="hm-where">
          {mode === 'city' && <span className="hm-chip">My town</span>}
          {mode === 'yard' && <><button className="mu-btn t-btn-sm hm-en" onClick={backToTown}>← Back to town</button><button className="mu-btn mu-btn--lime t-btn-sm hm-en" onClick={() => enterRoom()}>Go inside</button></>}
          {mode === 'room' && (
            <>
              <button className="mu-btn t-btn-sm hm-en" onClick={() => (isPrivate ? setView({ mode: 'yard', house: view.house }) : backToTown())}>{isPrivate ? '← Garden' : '← Back to town'}</button>
              {house && normHouse(house).rooms.some((r) => (r.level ?? 0) > 0) && [0, 1].map((lv) => <button key={`f${lv}`} className={`g-chip hm-en hm-floor ${(room?.level ?? 0) === lv ? 'is-on' : ''}`} onClick={() => (room?.level ?? 0) !== lv && changeFloor(lv)}>{lv ? '↑ Upstairs' : '↓ Ground floor'}</button>)}
              {house && normHouse(house).rooms.filter((r) => (r.level ?? 0) === (room?.level ?? 0)).map((r) => <button key={r.id} className={`g-chip hm-en ${room?.id === r.id ? 'is-on' : ''}`} onClick={() => r.id !== room?.id && enterRoom(r.id)}>{r.name}</button>)}
              <button className="g-chip hm-en" onClick={() => { setNewFloor(room?.level ?? 0); setRoomMenu(!roomMenu); }}>+ Room</button>
              {(house?.rooms.length ?? 0) > 1 && <button className="g-chip hm-en" onClick={() => { setPlanOpen(true); say('House plan'); }}>House plan</button>}
            </>
          )}
        </div>
        {roomMenu && mode === 'room' && (
          <div className="hm-roommenu">
            <b>Add a room <span className="rw-price"><span className="rw-coin" />15</span></b>
            <div className="g-chips hm-floorpick">{[0, 1].map((lv) => <button key={lv} className={`g-chip hm-en ${newFloor === lv ? 'is-on' : ''}`} onClick={() => { setNewFloor(lv); say(lv ? 'Upstairs' : 'Ground floor'); }}>{lv ? 'Upstairs' : 'Ground floor'}</button>)}</div>
            <div className="g-chips">{ROOM_TYPES.map((t) => <button key={t} className="g-chip hm-en" onClick={() => addRoom(t)}>{t}</button>)}</div>
          </div>
        )}
        <div className="hm-cam">
          <button onClick={() => scene.current?.turn(-1)} aria-label="Turn left" title="Turn left">↺</button>
          <button onClick={() => scene.current?.turn(1)} aria-label="Turn right" title="Turn right">↻</button>
          <button onClick={() => scene.current?.zoom(1)} aria-label="Zoom in" title="Zoom in">+</button>
          <button onClick={() => scene.current?.zoom(-1)} aria-label="Zoom out" title="Zoom out">−</button>
          <button onClick={() => scene.current?.findHero()} aria-label="Find my hero" title="Find my hero" className="hm-cam__me">Me</button>
        </div>
        {planOpen && house && view.house && (
          <HousePlan
            rooms={normHouse(house).rooms.map((r) => ({ ...r, wallHex: (WALLS[r.wall] ?? WALLS[0]).hex, floorHex: (FLOORS[r.floor] ?? FLOORS[0]).hex }))}
            current={room?.id}
            onChange={(next) => { sfx.pop(); setS((c) => { const h = normHouse(c.houses[view.house!]); return { ...c, houses: { ...c.houses, [view.house!]: { ...h, rooms: h.rooms.map((r) => { const n = next.find((q) => q.id === r.id); return n ? { ...r, at: n.at } : r; }) } } }; }); }}
            onEnter={(id) => { setPlanOpen(false); if (id !== room?.id) enterRoom(id); }}
            onClose={() => setPlanOpen(false)}
            onBad={(m) => { sfx.bad(); flash(m); }}
          />
        )}
        {!ready && <div className="hm-loading">Loading…</div>}
        {loaded && !s.started && <StartScreen onStart={start} />}
        {tip >= 0 && s.started && tips[tip] && (
          <div className="hm-tip" role="dialog" aria-label="How to play">
            <span className="hm-tip__n">{tip + 1}/{tips.length}</span>
            <p>{tips[tip].en}</p>
            <div className="hm-tip__btns">
              <button className="mu-btn t-btn-sm hm-en" onClick={() => say(tips[tip].en)} aria-label="Listen">Listen</button>
              {tip < tips.length - 1
                ? <button className="mu-btn mu-btn--lime t-btn-sm hm-en" onClick={() => setTip(tip + 1)}>Next</button>
                : <button className="mu-btn mu-btn--lime t-btn-sm hm-en" onClick={closeTips}>Let’s play!</button>}
              {tip < tips.length - 1 && <button className="t-link-btn hm-en" onClick={closeTips}>Skip</button>}
            </div>
          </div>
        )}
        {earn && <EarnCoins signedIn={!!isSignedIn} onClose={() => setEarn(false)} onCoins={(n, bal) => { setS((c) => ({ ...c, coins: typeof bal === 'number' ? bal : c.coins + n })); if (n) { setParty((x) => x + 1); sfx.coin(); } }} />}
        {list.length === 0 && ready > 0 && <div className="hm-empty">{mode === 'city' ? 'Your town is empty. Pick a house below and drag it here!' : mode === 'yard' ? 'This is your garden. Drag trees, flowers and a pool here!' : 'This room is empty. Drag furniture here!'}</div>}
        {party > 0 && <div key={party} className="rw-party" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}</div>}
        {msg && <div className="rw-msg" role="status">{msg}</div>}
      </div>

      {heroBar && !cur && s.hero ? (
        <div className="rw-sel hm-herobar">
          <b>{s.playerName || heroName || 'Hero'}</b>
          <button className="mu-btn t-btn-sm hm-en" onClick={() => doAct('wave')}>Wave</button>
          <button className="mu-btn t-btn-sm hm-en" onClick={() => doAct('dance')}>Dance</button>
          <button className="mu-btn t-btn-sm hm-en" onClick={() => doAct('phone')}>Phone</button>
          <button className="mu-btn t-btn-sm hm-en" onClick={() => doAct('stand')}>Stand up</button>
          <button className="g-chip hm-en" onClick={() => setHeroBar(false)}>Close</button>
        </div>
      ) : cur && curDef ? (
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
          {actOf(curDef) === 'stairs' && <button className="mu-btn mu-btn--lime t-btn-sm hm-en" onClick={() => { setSel(null); if (!(s.hero && scene.current?.heroAct('go', cur.uid))) changeFloor(); }}>{(room?.level ?? 0) > 0 && !normHouse(house).rooms.some((r) => (r.level ?? 0) > (room?.level ?? 0)) ? 'Go downstairs' : 'Go upstairs'}</button>}
          {s.hero && actOf(curDef) && actOf(curDef) !== 'stairs' && <button className="mu-btn mu-btn--lime t-btn-sm hm-en" onClick={() => doAct(actOf(curDef) as HeroAct, cur)}>{ACT_LABEL[actOf(curDef)!]}</button>}
          {!curDef.wall && <button className="mu-btn t-btn-sm hm-en" onClick={rotate}>Turn</button>}
          {!curDef.building && <button className="mu-btn t-btn-sm hm-en" onClick={copy}>Copy</button>}
          <button className="mu-btn t-btn-sm hm-en" onClick={remove}>Remove</button>
        </div>
      ) : mode === 'room' ? (
        <div className="rw-sel hm-room">
          {(
            <>
              <div className="hm-room__g"><b>Walls</b><div className="rw-colors">{WALLS.map((w, i) => <button key={w.en} title={w.en} aria-label={`${w.en} walls`} className={`rw-sw ${(room?.wall ?? 0) === i ? 'is-on' : ''}`} style={{ background: w.hex }} onClick={() => { setHouse({ wall: i }); sfx.paint(); say(`${w.en} walls`); }} />)}</div></div>
              <div className="hm-room__g"><b>Floor</b><div className="rw-colors">{FLOORS.map((f, i) => <button key={f.en} title={f.en} aria-label={`${f.en} floor`} className={`rw-sw ${(room?.floor ?? 0) === i ? 'is-on' : ''}`} style={{ background: f.hex }} onClick={() => { setHouse({ floor: i }); sfx.paint(); say(f.en); }} />)}</div></div>
              {room && ROOM_SIZES.find((x) => x.size > room.size) && (() => { const n = ROOM_SIZES.find((x) => x.size > room.size)!; return <button className="mu-btn t-btn-sm hm-en" onClick={growRoom}>Make it {n.en} <span className="rw-price"><span className="rw-coin" />{n.price}</span></button>; })()}
            </>
          )}
        </div>
      ) : null}

      <div className="rw-shop" ref={shopEl}>
        <div className="g-chips" role="tablist">
          <button className="g-chip hm-en hm-shop-toggle" onClick={() => setShopOpen(!shopOpen)} aria-expanded={shopOpen}>{shopOpen ? 'Hide shop ▾' : 'Shop ▴'}</button>
          {cats.map((c) => <button key={c} role="tab" aria-selected={cat === c} className={`g-chip hm-en ${cat === c ? 'is-on' : ''}`} onClick={() => { setCat(c); say(c); }}>{c}</button>)}
        </div>
        <div className="rw-shelf">
          {items.map((d) => {
            const ok = owned(d);
            return (
              <button key={d.file} data-card={d.file} className={`rw-card hm-card ${ok ? '' : 'is-locked'} ${hint === d.file ? 'is-hint' : ''}`} onPointerDown={(e) => onCardDown(e, d)} onClick={(e) => { if (e.detail === 0) add(d); }} aria-label={ok ? `Add ${d.en}` : `Open ${d.en} for ${d.price} coins`}>
                <Thumb def={d} />
                <b>{d.en}</b>
                {!ok && <small className="rw-price"><span className="rw-coin" />{d.price}</small>}
              </button>
            );
          })}
        </div>
      </div>
      {ghost && <div className="hm-ghost" style={{ left: ghost.x, top: ghost.y }}><Thumb def={ghost.def} /></div>}
    </div>
  );
}
