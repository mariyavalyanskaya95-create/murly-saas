'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import { FLOORS, HOME_CATS, HOME_ITEM, HOME_ITEMS, PAINT, WALLS, type HomeCat, type HomeItem } from '@/lib/worlds/home-items';
import { art, say, sfx } from '@/lib/worlds/sound';
import type { HomePlaced, HomeScene } from '@/lib/worlds/home-scene';
import ATLAS from '@/lib/worlds/kenney-thumbs.json';

const SAVE = 'murly-home-v2';
type Save = { placed: HomePlaced[]; coins: number; unlocked: string[]; wall: number; floor: number; done: number };
type Task =
  | { kind: 'place'; file: string; en: string; uk: string }
  | { kind: 'color'; file: string; color: string; en: string; uk: string }
  | { kind: 'on'; file: string; target: string; en: string; uk: string }
  | { kind: 'next'; file: string; target: string; en: string; uk: string };

const START: Save = {
  placed: [
    { uid: 's1', file: 'rugRectangle', x: 0, z: -0.5, rot: 0, color: '#4A86D0' },
    { uid: 's2', file: 'loungeSofa', x: 0, z: -1.15, rot: 0 },
    { uid: 's3', file: 'tableCoffee', x: 0, z: -0.5, rot: 0 },
    { uid: 's4', file: 'pottedPlant', x: -1.2, z: -1.2, rot: 0 },
    { uid: 's5', file: 'lampRoundFloor', x: 0.75, z: -1.25, rot: 0 },
    { uid: 's6', file: 'cabinetTelevision', x: 0, z: 0.45, rot: 2 },
    { uid: 's7', file: 'televisionModern', x: 0, z: 0.45, rot: 2 },
    { uid: 's8', file: 'pictureframe_large_A', x: -0.75, z: 0, rot: 0, wall: 0, y: 0.82 },
  ],
  coins: 15, unlocked: [], wall: 0, floor: 0, done: 0,
};
const colorName = (hex?: string) => PAINT.find((p) => p.hex === hex);
const nameOf = (p: HomePlaced) => { const d = HOME_ITEM[p.file]; const c = colorName(p.color); return c ? `${c.en} ${d.en}` : d.en; };
const owned = (d: HomeItem, s: Save) => !d.price || s.unlocked.includes(d.file);
const floorKind = (i: number) => (i < 2 ? 'wood' : i < 4 ? 'tiles' : 'carpet') as 'wood' | 'tiles' | 'carpet';

// мініатюри Kenney: один атлас-картинка (lib/worlds/kenney-thumbs.json), KayKit рендеримо в браузері
function Thumb({ def }: { def: HomeItem }) {
  const [src, setSrc] = useState<string | null>(null);
  const i = ATLAS.idx[def.file as keyof typeof ATLAS.idx] as number | undefined;
  useEffect(() => {
    if (!def.pack) return;
    let on = true;
    import('@/lib/worlds/home-scene').then((m) => m.renderThumb(def)).then((u) => { if (on) setSrc(u); }).catch(() => {});
    return () => { on = false; };
  }, [def]);
  if (!def.pack && i !== undefined) {
    const x = i % ATLAS.cols, y = Math.floor(i / ATLAS.cols);
    return <span className="hm-thumb hm-atlas" style={{ backgroundPosition: `${(x / (ATLAS.cols - 1)) * 100}% ${(y / (ATLAS.rows - 1)) * 100}%`, backgroundSize: `${ATLAS.cols * 100}% ${ATLAS.rows * 100}%` }} />;
  }
  return src ? <img src={src} alt="" className="hm-thumb" loading="lazy" draggable={false} /> : <span className="hm-thumb hm-thumb--wait" />;
}

export default function HomeGame() {
  const host = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const scene = useRef<HomeScene | null>(null);
  const [ready, setReady] = useState(false);
  const [s, setS] = useState<Save>(START);
  const [loaded, setLoaded] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [cat, setCat] = useState<HomeCat>('living');
  const [task, setTask] = useState<Task | null>(null);
  const [hint, setHint] = useState(false);
  const [labelsOn, setLabelsOn] = useState(true);
  const [msg, setMsg] = useState('');
  const [party, setParty] = useState(0);
  const [err, setErr] = useState(false);
  const sRef = useRef(s); sRef.current = s;

  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 2400); };

  // збереження
  useEffect(() => {
    try { const raw = localStorage.getItem(SAVE); if (raw) setS({ ...START, ...JSON.parse(raw) }); } catch { /* новий гравець */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) try { localStorage.setItem(SAVE, JSON.stringify(s)); } catch { /* немає сховища */ } }, [s, loaded]);

  // сцена
  useEffect(() => {
    let alive = true;
    import('@/lib/worlds/home-scene').then(({ HomeScene }) => {
      if (!alive || !host.current || !labels.current) return;
      try {
        scene.current = new HomeScene(host.current, labels.current, {
          onSelect: (uid) => { setSel(uid); if (uid) sfx.pick(); },
          onTap: (uid) => { const p = sRef.current.placed.find((q) => q.uid === uid); if (p) say(`${art(nameOf(p))} ${nameOf(p)}`); },
          onMove: (uid, patch, kids) => {
            sfx.pop();
            setS((cur) => {
              const me = cur.placed.find((q) => q.uid === uid); if (!me) return cur;
              const dx = (patch.x ?? me.x) - me.x, dz = (patch.z ?? me.z) - me.z;
              return { ...cur, placed: cur.placed.map((q) => {
                if (q.uid === uid) return { ...q, ...patch, y: HOME_ITEM[q.file].wall ? patch.y ?? q.y : undefined };
                if (kids.includes(q.uid) && !HOME_ITEM[me.file].wall) return { ...q, x: +(q.x + dx).toFixed(2), z: +(q.z + dz).toFixed(2) };
                return q;
              }) };
            });
          },
          onBad: () => { sfx.bad(); flash('Сюди не можна: заважає інша річ або стіна.'); },
        });
        setReady(true);
      } catch { setErr(true); }
    });
    return () => { alive = false; scene.current?.dispose(); scene.current = null; };
  }, []);

  // синхронізація сцени зі станом
  useEffect(() => {
    const sc = scene.current; if (!sc || !ready || !loaded) return;
    sc.setWall(WALLS[s.wall]?.hex ?? WALLS[0].hex);
    sc.setFloor(FLOORS[s.floor]?.hex ?? FLOORS[0].hex, floorKind(s.floor));
  }, [s.wall, s.floor, ready, loaded]);
  useEffect(() => {
    const sc = scene.current; if (!sc || !ready || !loaded) return;
    sc.sync(s.placed).then(() => {
      s.placed.forEach((p) => sc.setLabel(p.uid, nameOf(p)));
      if (task && done(task)) {
        sfx.coin(); setParty((n) => n + 1); say('Well done!');
        const next = { ...sRef.current, coins: sRef.current.coins + 5, done: sRef.current.done + 1 };
        setS(next); setTask(null); setHint(false);
        setTimeout(() => setTask(makeTask(next, task)), 1500);
      }
    });
  }, [s.placed, ready, loaded]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { scene.current?.select(sel); }, [sel]);
  useEffect(() => { if (scene.current) scene.current.showLabels = labelsOn; }, [labelsOn, ready]);
  useEffect(() => { if (loaded && ready && !task) setTask(makeTask(s)); }, [loaded, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- завдання ----------
  const makeTask = useCallback((st: Save, prev?: Task): Task => {
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
    const files = st.placed.map((p) => p.file);
    const opts: Task[] = [];
    const notIn = HOME_ITEMS.filter((d) => owned(d, st) && !files.includes(d.file) && !d.wall);
    if (notIn.length) { const d = pick(notIn); opts.push({ kind: 'place', file: d.file, en: `Put ${art(d.en)} ${d.en} in the room.`, uk: `Постав у кімнату: ${d.uk}.` }); }
    const paintable = st.placed.filter((p) => { const d = HOME_ITEM[p.file]; return d.paint !== 'none' && !d.pack; });
    if (paintable.length) {
      const p = pick(paintable); const d = HOME_ITEM[p.file];
      const c = pick(PAINT.filter((x) => x.hex !== p.color));
      opts.push({ kind: 'color', file: p.file, color: c.hex, en: `Make the ${d.en} ${c.en}.`, uk: `Зроби ${d.uk}: ${c.uk}.` });
    }
    const smalls = [...new Set(st.placed.filter((p) => HOME_ITEM[p.file].small).map((p) => p.file))];
    const surf = [...new Set(st.placed.filter((p) => HOME_ITEM[p.file].surface).map((p) => p.file))];
    if (smalls.length && surf.length) { const a = pick(smalls), b = pick(surf); opts.push({ kind: 'on', file: a, target: b, en: `Put the ${HOME_ITEM[a].en} on the ${HOME_ITEM[b].en}.`, uk: `Постав «${HOME_ITEM[a].uk}» на «${HOME_ITEM[b].uk}».` }); }
    const solid = [...new Set(st.placed.filter((p) => { const d = HOME_ITEM[p.file]; return !d.rug && !d.wall && !d.small; }).map((p) => p.file))];
    if (solid.length >= 2) { const a = pick(solid), b = pick(solid.filter((x) => x !== a)); opts.push({ kind: 'next', file: a, target: b, en: `Put the ${HOME_ITEM[a].en} next to the ${HOME_ITEM[b].en}.`, uk: `Постав «${HOME_ITEM[a].uk}» поруч із «${HOME_ITEM[b].uk}».` }); }
    const fresh = opts.filter((o) => !prev || o.en !== prev.en);
    return pick(fresh.length ? fresh : opts);
  }, []);
  const done = (t: Task) => {
    const sc = scene.current; if (!sc) return false;
    const of = (f: string) => sRef.current.placed.filter((p) => p.file === f);
    switch (t.kind) {
      case 'place': return of(t.file).length > 0;
      case 'color': return of(t.file).some((p) => p.color === t.color);
      case 'on': return of(t.file).some((p) => sc.supportOf(p.uid) === t.target);
      case 'next': return of(t.file).some((a) => of(t.target).some((b) => { const g = sc.gap(a.uid, b.uid); return g >= -0.001 && g <= 0.15; }));
    }
  };

  // ---------- дії ----------
  const add = async (d: HomeItem) => {
    if (!owned(d, s)) {
      if (s.coins < (d.price ?? 0)) { sfx.bad(); flash(`Потрібно ${d.price} монет. Виконуй завдання, щоб заробити!`); return; }
      setS((c) => ({ ...c, coins: c.coins - (d.price ?? 0), unlocked: [...c.unlocked, d.file] })); sfx.coin(); flash(`Відкрито: ${d.en}!`); say(`${art(d.en)} ${d.en}`); return;
    }
    const sc = scene.current; if (!sc) return;
    const spot = await sc.findSpot(d.file, s.placed);
    if (!spot) { sfx.bad(); flash('Немає вільного місця. Прибери щось або перестав меблі.'); return; }
    const uid = `h${Date.now().toString(36)}`;
    setS((c) => ({ ...c, placed: [...c.placed, { ...spot, uid }] })); setSel(uid);
    sfx.pop(); say(`${art(d.en)} ${d.en}`);
  };
  const cur = s.placed.find((p) => p.uid === sel) ?? null;
  const curDef = cur ? HOME_ITEM[cur.file] : null;
  const update = (patch: Partial<HomePlaced>) => { if (!cur) return; setS((c) => ({ ...c, placed: c.placed.map((q) => (q.uid === cur.uid ? { ...q, ...patch } : q)) })); };
  const rotate = () => {
    if (!cur || !scene.current) return;
    const p = { ...cur, rot: (cur.rot + 1) % 4 };
    if (scene.current.canPlace(cur.uid, p)) {
      const kids = scene.current.carried(cur.uid);
      // речі на столі повертаються разом зі столом
      setS((c) => ({ ...c, placed: c.placed.map((q) => {
        if (q.uid === cur.uid) return { ...q, rot: p.rot };
        if (!kids.includes(q.uid)) return q;
        const ox = q.x - cur.x, oz = q.z - cur.z;
        return { ...q, x: +(cur.x + oz).toFixed(2), z: +(cur.z - ox).toFixed(2), rot: (q.rot + 1) % 4 };
      }) }));
      sfx.pop(); scene.current.bounce(cur.uid);
    } else { sfx.bad(); flash('Тут не повернеться, бракує місця.'); }
  };
  const paint = (hex: string, en: string) => { update({ color: hex }); sfx.paint(); say(`${en}`); scene.current?.bounce(cur!.uid); };
  const copy = async () => {
    if (!cur || !scene.current) return;
    const spot = await scene.current.findSpot(cur.file, s.placed);
    if (!spot) { sfx.bad(); flash('Немає місця для копії.'); return; }
    const uid = `h${Date.now().toString(36)}`;
    setS((c) => ({ ...c, placed: [...c.placed, { ...spot, uid, color: cur.color, rot: cur.rot }] })); setSel(uid); sfx.pop();
  };
  const remove = () => { if (!cur) return; setS((c) => ({ ...c, placed: c.placed.filter((q) => q.uid !== cur.uid) })); setSel(null); sfx.pick(); };
  const full = () => { const el = wrap.current; if (!el) return; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); else el.requestFullscreen?.().catch(() => {}); };
  const reset = () => { if (!confirm('Почати кімнату заново? Монети залишаться.')) return; setS((c) => ({ ...START, coins: c.coins, unlocked: c.unlocked, done: c.done })); setSel(null); };

  const items = useMemo(() => HOME_ITEMS.filter((d) => d.cat === cat), [cat]);

  if (err) return <div className="t-card"><p>Цей браузер не показує 3D-графіку. Спробуй Chrome, Safari або Edge на новішому пристрої.</p></div>;

  return (
    <div className="hm" ref={wrap}>
      <div className="rw-top">
        <div className="rw-coins" aria-label={`Монети: ${s.coins}`}><span className="rw-coin" />{s.coins}</div>
        <div className="rw-task" aria-live="polite">
          {task ? (
            <>
              <button className="rw-say" onClick={() => say(task.en)} aria-label="Послухати завдання"><Icon id="e-speak" /></button>
              <div><b>{task.en}</b>{hint ? <small>{task.uk}</small> : <button className="t-link-btn" onClick={() => setHint(true)}>Підказка</button>}</div>
              <button className="t-link-btn" onClick={() => { setTask(makeTask(s, task)); setHint(false); }}>Інше</button>
            </>
          ) : <b className="rw-well">{ready ? 'Well done! +5' : 'Завантажуємо дім…'}</b>}
        </div>
        <div className="rw-tools">
          <button className={`g-chip ${labelsOn ? 'is-on' : ''}`} onClick={() => setLabelsOn(!labelsOn)} aria-pressed={labelsOn}>Підписи</button>
          <button className="g-chip" onClick={full}>На весь екран</button>
        </div>
      </div>

      <div className="hm-stage">
        <div ref={host} className="hm-canvas" />
        <div ref={labels} className="hm-labels" aria-hidden="true" />
        <div className="hm-cam">
          <button onClick={() => scene.current?.turn(-1)} aria-label="Повернути камеру ліворуч" title="Повернути камеру">↺</button>
          <button onClick={() => scene.current?.turn(1)} aria-label="Повернути камеру праворуч" title="Повернути камеру">↻</button>
        </div>
        {!ready && <div className="hm-loading">Завантажуємо 3D…</div>}
        {party > 0 && <div key={party} className="rw-party" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}</div>}
        {msg && <div className="rw-msg" role="status">{msg}</div>}
      </div>

      {cur && curDef ? (
        <div className="rw-sel">
          <button className="rw-say" onClick={() => say(`${art(nameOf(cur))} ${nameOf(cur)}`)} aria-label="Послухати"><Icon id="e-speak" /></button>
          <div className="rw-sel__name"><b>{art(nameOf(cur))} {nameOf(cur)}</b><small>{curDef.uk}</small></div>
          {curDef.paint !== 'none' && !curDef.pack && (
            <div className="rw-colors" role="radiogroup" aria-label="Колір">
              {PAINT.map((c) => <button key={c.en} role="radio" aria-checked={cur.color === c.hex} title={c.en} aria-label={c.en} className={`rw-sw ${cur.color === c.hex ? 'is-on' : ''}`} style={{ background: c.hex }} onClick={() => paint(c.hex, c.en)} />)}
            </div>
          )}
          {!curDef.wall && <button className="mu-btn t-btn-sm" onClick={rotate}>Повернути</button>}
          <button className="mu-btn t-btn-sm" onClick={copy}>Копія</button>
          <button className="mu-btn t-btn-sm" onClick={remove}>Прибрати</button>
        </div>
      ) : (
        <div className="rw-sel hm-room">
          <div className="hm-room__g"><b>Walls</b><div className="rw-colors">{WALLS.map((w, i) => <button key={w.en} title={w.en} aria-label={`Стіни: ${w.en}`} className={`rw-sw ${s.wall === i ? 'is-on' : ''}`} style={{ background: w.hex }} onClick={() => { setS((c) => ({ ...c, wall: i })); sfx.paint(); say(`${w.en} walls`); }} />)}</div></div>
          <div className="hm-room__g"><b>Floor</b><div className="rw-colors">{FLOORS.map((f, i) => <button key={f.en} title={f.en} aria-label={`Підлога: ${f.en}`} className={`rw-sw ${s.floor === i ? 'is-on' : ''}`} style={{ background: f.hex }} onClick={() => { setS((c) => ({ ...c, floor: i })); sfx.paint(); say(f.en); }} />)}</div></div>
          <button className="t-link-btn" onClick={reset}>Почати заново</button>
        </div>
      )}

      <div className="rw-shop">
        <div className="g-chips" role="tablist">
          {HOME_CATS.map((c) => <button key={c.id} role="tab" aria-selected={cat === c.id} className={`g-chip ${cat === c.id ? 'is-on' : ''}`} onClick={() => { setCat(c.id); say(c.en); }}>{c.label}</button>)}
        </div>
        <div className="rw-shelf">
          {items.map((d) => {
            const ok = owned(d, s);
            return (
              <button key={d.file} className={`rw-card hm-card ${ok ? '' : 'is-locked'}`} onClick={() => add(d)} aria-label={ok ? `Додати: ${d.en}` : `Відкрити за ${d.price} монет: ${d.en}`}>
                <Thumb def={d} />
                <b>{d.en}</b>
                {ok ? <small>{d.uk}</small> : <small className="rw-price"><span className="rw-coin" />{d.price}</small>}
              </button>
            );
          })}
        </div>
      </div>
      <p className="rw-help t-muted">Обертай кімнату пальцем або мишкою, наближай колесиком чи двома пальцями. Натисни на предмет у каталозі, щоб поставити його, і перетягуй по кімнаті. Дрібні речі можна ставити на столи й тумби, картини вішати на стіни. Натисни на предмет, щоб почути слово, змінити колір, повернути чи скопіювати.</p>
    </div>
  );
}
