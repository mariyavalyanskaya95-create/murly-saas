'use client';
// «Murly Island»: відкритий острів, котик-герой, роботи англійською (пошта, кафе, ринок)
// і магазин, де учень витрачає свої Murly-монетки на одяг, дім, транспорт і улюбленців.
// Увесь текст у грі англійською.
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { say, sfx } from '@/lib/worlds/sound';
import { CAFE_DRINK, CAFE_FOOD, FRUIT, FUR, SHOP, START, TALKS, cafeOrder, deliveryTask, fruitOrder, single, type Addr, type Cat, type Save, type ShopItem } from '@/lib/worlds/island-data';
import type { IslandScene } from '@/lib/worlds/island-scene';
import type { Spot } from '@/lib/worlds/island-data';

type Panel = null | 'post' | 'cafe' | 'market' | 'store' | 'home' | 'help' | 'npc' | 'jobs';
const LS = 'murly-island-v1';
const GUEST_COINS = 60;

export default function IslandGame() {
  const { isSignedIn, isLoaded } = useAuth();
  const box = useRef<HTMLDivElement>(null);
  const sc = useRef<IslandScene | null>(null);
  const [ready, setReady] = useState(false);
  const [save, setSave] = useState<Save>(START);
  const saveRef = useRef(save); saveRef.current = save;
  const [coins, setCoins] = useState<number | null>(null);
  const [near, setNear] = useState<Spot | null>(null);
  const [panel, setPanel] = useState<Panel>('help');
  const [toast, setToast] = useState<{ text: string; good?: boolean } | null>(null);
  const [delivery, setDelivery] = useState<{ addr: Addr; text: string; at: number; hint: boolean } | null>(null);
  const [cafe, setCafe] = useState<ReturnType<typeof cafeOrder> | null>(null);
  const [plate, setPlate] = useState<string[]>([]);
  const [fruit, setFruit] = useState<ReturnType<typeof fruitOrder> | null>(null);
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [tab, setTab] = useState<Cat>('Clothes');
  const [capped, setCapped] = useState(false);
  const guest = isLoaded && !isSignedIn;
  const [touch, setTouch] = useState(false);
  const [runOn, setRunOn] = useState(false);
  const [talk, setTalk] = useState<{ who: string; q: string; opts: string[]; right: string; picked?: string } | null>(null);
  const [starCount, setStarCount] = useState(0);
  const mini = useRef<HTMLCanvasElement>(null);
  useEffect(() => { setTouch(navigator.maxTouchPoints > 0 || 'ontouchstart' in window); }, []);

  const onStarRef = useRef<(id: string) => void>(() => {});
  const flash = (text: string, good = true) => { setToast({ text, good }); window.setTimeout(() => setToast((t) => (t?.text === text ? null : t)), 3200); };

  // ---- сцена ----
  useEffect(() => {
    let alive = true;
    void import('@/lib/worlds/island-scene').then(({ IslandScene }) => {
      if (!alive || !box.current) return;
      sc.current = new IslandScene(box.current, { onNear: (s) => setNear(s), onStar: (id) => onStarRef.current(id) });
      setReady(true);
    });
    return () => { alive = false; sc.current?.dispose(); sc.current = null; };
  }, []);

  // ---- збереження ----
  useEffect(() => {
    if (!isLoaded) return;
    const local = (() => { try { return JSON.parse(localStorage.getItem(LS) || 'null') as Save | null; } catch { return null; } })();
    if (isSignedIn) {
      fetch('/api/game?game=island').then((r) => r.json()).then((d) => setSave({ ...START, ...(d.data ?? local ?? {}) })).catch(() => local && setSave({ ...START, ...local }));
      fetch('/api/coins').then((r) => r.json()).then((d) => setCoins(Number(d.balance ?? 0))).catch(() => setCoins(0));
    } else {
      const s = { ...START, ...(local ?? {}) }; setSave(s); setCoins(s.localCoins ?? GUEST_COINS);
    }
  }, [isLoaded, isSignedIn]);
  const timer = useRef<number | null>(null);
  const persist = useCallback((s: Save) => {
    setSave(s);
    try { localStorage.setItem(LS, JSON.stringify(s)); } catch { /* */ }
    if (timer.current) window.clearTimeout(timer.current);
    if (isSignedIn) timer.current = window.setTimeout(() => { void fetch('/api/game', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ game: 'island', data: s }) }).catch(() => {}); }, 800);
  }, [isSignedIn]);

  // зовнішній вигляд у сцені
  useEffect(() => {
    const s = sc.current; if (!s || !ready) return;
    s.setOutfit(save.outfit); s.setRide(save.ride); s.setPet(save.pet);
    if (s.houseLevel !== save.house) void s.setHouse(save.house);
    if (s.yardList.join() !== save.yard.join()) void s.setYard(save.yard);
    s.setGot(save.stars ?? []); setStarCount((save.stars ?? []).length);
  }, [save, ready]);

  // ---- монетки ----
  const earn = async (n: number, why: string) => {
    sfx.coin();
    if (guest) { const c = (coins ?? 0) + n; setCoins(c); persist({ ...saveRef.current, localCoins: c }); flash(`+${n} coins! ${why}`); return; }
    const r = await fetch('/api/coins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'earn', amount: n, reason: `Murly Island: ${why}`, source: 'game' }) }).catch(() => null);
    const d = r ? await r.json().catch(() => ({})) : {};
    if (d.capped) { setCapped(true); flash('Great job! You have earned all your coins for today. Come back tomorrow!'); }
    else flash(`+${n} coins! ${why}`);
    if (typeof d.balance === 'number') setCoins(d.balance);
  };
  const buy = async (it: { id: string; price: number; en: string }) => {
    if ((coins ?? 0) < it.price) { sfx.bad(); flash(`You need ${it.price - (coins ?? 0)} more coins. Do a job to earn them!`, false); return false; }
    if (guest) { const c = (coins ?? 0) - it.price; setCoins(c); persist({ ...saveRef.current, localCoins: c, owned: [...saveRef.current.owned, it.id] }); }
    else {
      const r = await fetch('/api/coins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'spend', amount: it.price, reason: `Murly Island: ${it.en}` }) }).catch(() => null);
      const d = r ? await r.json().catch(() => ({})) : {};
      if (!r?.ok) { sfx.bad(); if (typeof d.balance === 'number') setCoins(d.balance); flash('Not enough coins yet!', false); return false; }
      setCoins(d.balance);
      persist({ ...saveRef.current, owned: [...saveRef.current.owned, it.id] });
    }
    sfx.coin(); say(`You bought a ${it.en}!`); flash(`You bought: ${it.en}!`);
    return true;
  };

  onStarRef.current = (id: string) => {
    const s = saveRef.current; if ((s.stars ?? []).includes(id)) return;
    const stars = [...(s.stars ?? []), id]; sfx.coin(); setStarCount(stars.length);
    const all = stars.length >= 10 && !s.starBonus;
    persist({ ...s, stars, starBonus: s.starBonus || all });
    if (all) { say('Amazing! You found all ten stars!'); void earn(10, 'All 10 stars found!'); } else flash(`You found a star! ${stars.length} / 10`);
  };
  // мінікарта
  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(() => {
      const c = mini.current, s = sc.current; if (!c || !s) return;
      const x = c.getContext('2d')!; const W = c.width, k = W / 2 / 80;
      x.clearRect(0, 0, W, W);
      x.fillStyle = '#58B9E8'; x.beginPath(); x.arc(W / 2, W / 2, W / 2, 0, Math.PI * 2); x.fill();
      x.fillStyle = '#F3DFA7'; x.beginPath(); x.arc(W / 2, W / 2, 78 * k, 0, Math.PI * 2); x.fill();
      x.fillStyle = '#8BCB62'; x.beginPath(); x.arc(W / 2, W / 2, 68 * k, 0, Math.PI * 2); x.fill();
      const P = (px: number, pz: number) => [W / 2 + px * k, W / 2 + pz * k] as const;
      const dot = (px: number, pz: number, col: string, r = 3) => { const [a, b] = P(px, pz); x.fillStyle = col; x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill(); };
      const COL: Record<string, string> = { post: '#E5484D', cafe: '#F76AA8', store: '#7C66DC', market: '#F5862D', home: '#FFC53D' };
      s.spots.forEach((sp) => { if (COL[sp.id]) dot(sp.x, sp.z, COL[sp.id], 4); });
      if (s.markerOn) dot(s.marker.position.x, s.marker.position.z, '#FFC53D', 6);
      s.npcs.forEach((n) => dot(n.rig.root.position.x, n.rig.root.position.z, '#FFFFFF', 2));
      const [hx, hz] = P(s.heroPos.x, s.heroPos.z);
      x.save(); x.translate(hx, hz); x.rotate(-s.heroRot); x.fillStyle = '#1A1A1A'; x.beginPath(); x.moveTo(0, 6); x.lineTo(-4, -4); x.lineTo(4, -4); x.closePath(); x.fill(); x.restore();
    }, 250);
    return () => window.clearInterval(id);
  }, [ready]);
  const startTalk = (who: string) => {
    const t = TALKS[Math.floor(Math.random() * TALKS.length)];
    setTalk({ who, q: t.q, right: t.a[0], opts: [...t.a].sort(() => Math.random() - 0.5) }); say(t.q); setPanel('npc');
  };
  const answerTalk = (o: string) => {
    if (!talk || talk.picked) return;
    setTalk({ ...talk, picked: o });
    if (o === talk.right) { say(o); const n = (saveRef.current.talks ?? 0) + 1; persist({ ...saveRef.current, talks: n }); if (n % 3 === 0) void earn(2, 'Great chats!'); else sfx.coin(); }
    else sfx.bad();
  };
  const JOBS = [
    { id: 'post', en: 'Post Office', what: 'Deliver parcels to the right address.' },
    { id: 'cafe', en: 'Cat Cafe', what: 'Make sandwiches and drinks for customers.' },
    { id: 'market', en: 'Fruit Market', what: 'Give customers the right number of fruit.' },
    { id: 'store', en: 'Murly Store', what: 'Buy clothes, a house, rides and pets.' },
    { id: 'home', en: 'My home', what: 'Your house and yard.' },
  ];
  const showWay = (id: string) => { const p = sc.current?.spotPos(id); if (p) { sc.current?.setMarker(p.x, p.z); sc.current?.walkTo(p.x, p.z); } setPanel(null); };

  // ---- взаємодія ----
  const act = useCallback(() => {
    const s = near; if (!s) return;
    if (s.id.startsWith('npc-')) { startTalk(s.label); return; }
    if (s.id.startsWith('door-')) {
      if (!delivery) { flash(`This is number ${s.label}. Get a parcel at the Post Office first!`, false); return; }
      if (`door-${delivery.addr.id}` === s.id) {
        sc.current?.setCarry(false); sc.current?.setMarker(null);
        const fast = Date.now() - delivery.at < 90_000 && !delivery.hint;
        setDelivery(null); say('Thank you very much!');
        void earn(fast ? 6 : 4, fast ? 'Fast delivery!' : 'Parcel delivered.');
        persist({ ...saveRef.current, jobs: { ...saveRef.current.jobs, post: (saveRef.current.jobs.post ?? 0) + 1 } });
      } else { sfx.bad(); flash(`Oops! This is ${s.label}. Read the address again.`, false); }
      return;
    }
    if (['post', 'cafe', 'market', 'store', 'home'].includes(s.id) && sc.current?.markerOn && !delivery) sc.current.setMarker(null);
    if (s.id === 'post') { if (!delivery) { const d = deliveryTask(); setDelivery({ ...d, at: Date.now(), hint: false }); say(d.text); } setPanel('post'); }
    if (s.id === 'cafe') { if (!cafe) { const o = cafeOrder(saveRef.current.jobs.cafe ?? 0); setCafe(o); setPlate([]); say(o.text); } setPanel('cafe'); }
    if (s.id === 'market') { if (!fruit) { const o = fruitOrder(saveRef.current.jobs.market ?? 0); setFruit(o); setBasket({}); say(o.text); } setPanel('market'); }
    if (s.id === 'store') setPanel('store');
    if (s.id === 'home') setPanel('home');
  }, [near, delivery, cafe, fruit]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.code === 'KeyQ' && !panel) sc.current?.dance(); if (e.code === 'KeyM') setPanel((p) => (p === 'jobs' ? null : 'jobs')); if (e.code === 'KeyE' || e.code === 'Enter') { if (!panel) act(); } if (e.code === 'Escape') setPanel(null); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [act, panel]);

  const serveCafe = () => {
    if (!cafe) return;
    const ok = [...plate].sort().join('|') === cafe.items.join('|');
    if (ok) { say('Yummy! Thank you!'); setCafe(null); setPlate([]); setPanel(null); void earn(5, 'Happy customer.'); persist({ ...saveRef.current, jobs: { ...saveRef.current.jobs, cafe: (saveRef.current.jobs.cafe ?? 0) + 1 } }); }
    else { sfx.bad(); say('Hmm, that is not what I ordered.'); flash('That is not the order. Listen again!', false); }
  };
  const giveFruit = () => {
    if (!fruit) return;
    const keys = new Set([...Object.keys(fruit.want), ...Object.keys(basket).filter((k) => basket[k])]);
    const ok = [...keys].every((k) => (fruit.want[k] ?? 0) === (basket[k] ?? 0));
    if (ok) { say('Perfect, thank you!'); setFruit(null); setBasket({}); setPanel(null); void earn(4, 'Correct order.'); persist({ ...saveRef.current, jobs: { ...saveRef.current.jobs, market: (saveRef.current.jobs.market ?? 0) + 1 } }); }
    else { sfx.bad(); flash('Count again! Check the numbers.', false); }
  };
  const startDelivery = () => { sc.current?.setCarry(true); setPanel(null); say('Good luck!'); };
  const hint = () => { if (!delivery) return; const p = sc.current?.spotPos(`door-${delivery.addr.id}`); if (p) sc.current?.setMarker(p.x, p.z); setDelivery({ ...delivery, hint: true }); setPanel(null); };

  // ---- магазин ----
  const owned = (id: string) => save.owned.includes(id);
  const equip = (it: ShopItem) => {
    const s = saveRef.current;
    if (it.sub === 'house') { const lvl = Number(it.id.split('-')[1]); persist({ ...s, house: Math.max(s.house, lvl) }); return; }
    if (it.sub === 'yard') { if (!s.yard.includes(it.id)) persist({ ...s, yard: [...s.yard, it.id] }); return; }
    if (it.sub === 'ride') { persist({ ...s, ride: s.ride === it.id ? null : it.id }); return; }
    if (it.sub === 'pet') { persist({ ...s, pet: s.pet === it.id ? null : it.id }); return; }
    const key = it.sub as 'hat' | 'glasses' | 'scarf' | 'bag';
    persist({ ...s, outfit: { ...s.outfit, [key]: s.outfit[key] === it.id ? undefined : it.id } });
  };
  const worn = (it: ShopItem) => it.sub === 'ride' ? save.ride === it.id : it.sub === 'pet' ? save.pet === it.id : it.sub === 'house' ? save.house >= Number(it.id.split('-')[1]) : it.sub === 'yard' ? save.yard.includes(it.id) : (save.outfit as Record<string, string | undefined>)[it.sub] === it.id;
  const onBuy = async (it: ShopItem) => { if (await buy(it)) equip(it); };

  // ---- джойстик ----
  const joy = useRef<{ id: number; x: number; y: number } | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const jDown = (e: React.PointerEvent) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); joy.current = { id: e.pointerId, x: e.clientX, y: e.clientY }; };
  const jMove = (e: React.PointerEvent) => { const j = joy.current; if (!j || j.id !== e.pointerId) return; let dx = e.clientX - j.x, dy = e.clientY - j.y; const L = Math.hypot(dx, dy), M = 50; if (L > M) { dx *= M / L; dy *= M / L; } setKnob({ x: dx, y: dy }); sc.current?.setJoy(dx / M, -dy / M); if (sc.current) sc.current.run = runOn || L > M * 0.95; };
  const jUp = () => { joy.current = null; setKnob({ x: 0, y: 0 }); sc.current?.setJoy(0, 0); if (sc.current) sc.current.run = runOn; };

  const nearText = near ? (near.id.startsWith('npc-') ? `Talk to ${near.label}` : near.id.startsWith('door-') ? `Deliver to ${near.label}` : near.id === 'home' ? 'My home' : `Enter: ${near.label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}`) : '';
  const furOwned = FUR.filter((f) => save.owned.includes(f.id) || f.price === 0);

  return (
    <div className={`il ${touch ? 'is-touch' : ''}`}>
      <div className="il-canvas" ref={box} />
      {!ready && <div className="il-load">Loading the island…</div>}

      <div className="il-hud">
        <Link href="/games" className="il-chip">← Games</Link>
        <span className="il-coins" title="Murly coins"><i className="il-coin" /> {coins ?? '…'}</span>
        <span className="il-chip il-stars" title="Stars found"><i className="il-star" /> {starCount}/10</span>
        {guest && <Link href="/sign-in?redirect_url=/play/island" className="il-chip il-chip--y">Sign in to use your Murly coins</Link>}
      </div>
      <div className="il-hud il-hud--r">
        <button type="button" className="il-chip" onClick={() => setPanel('jobs')}>Map</button>
        <button type="button" className="il-chip" onClick={() => setPanel('store')}>Shop</button>
        <button type="button" className="il-chip" onClick={() => setPanel('home')}>My stuff</button>
        <button type="button" className="il-chip" onClick={() => { sc.current?.teleportHome(); }}>Go home</button>
        <button type="button" className="il-chip" onClick={() => setPanel('help')}>?</button>
      </div>

      <canvas ref={mini} className="il-mini-map" width={150} height={150} onClick={() => setPanel('jobs')} aria-label="Map" />
      {delivery && !panel && (
        <div className="il-task"><b>Parcel for:</b> {delivery.text} <button type="button" className="il-mini" onClick={() => say(delivery.text)}>Listen</button>{!delivery.hint && <button type="button" className="il-mini" onClick={hint}>Show me (fewer coins)</button>}</div>
      )}
      {near && !panel && <button type="button" className="il-act" onClick={act}>{nearText} <kbd>E</kbd></button>}
      {toast && <div className={`il-toast ${toast.good ? '' : 'is-bad'}`}>{toast.text}</div>}

      {/* керування на планшеті й телефоні */}
      <div className="il-joy" onPointerDown={jDown} onPointerMove={jMove} onPointerUp={jUp} onPointerCancel={jUp}><span style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }} /></div>
      <div className="il-btns">
        <button type="button" onPointerDown={() => sc.current?.jump()}>Jump</button>
        <button type="button" className={runOn ? 'is-on' : ''} onPointerDown={() => { const v = !runOn; setRunOn(v); if (sc.current) sc.current.run = v; }}>Run</button>
        <button type="button" onPointerDown={() => sc.current?.dance()}>Dance</button>
        {near && <button type="button" className="is-y" onClick={act}>Go!</button>}
      </div>

      {panel && (
        <div className="il-modal" role="dialog" onClick={(e) => { if (e.target === e.currentTarget) setPanel(null); }}>
          <div className="il-card">
            <button type="button" className="il-x" onClick={() => setPanel(null)} aria-label="Close">✕</button>

            {panel === 'help' && <>
              <h2>Welcome to Murly Island!</h2>
              <p>Walk around, do jobs in English and earn Murly coins. Spend them in the shop on clothes, a house, cool rides and pets.</p>
              <ul className="il-list">
                <li><b>Computer:</b> W A S D or arrows to walk, Shift to run, Space to jump, Q to dance, M for the map. Or click on the ground to walk there.</li>
                <li><b>Tablet and phone:</b> move with the joystick on the left, or tap on the ground to walk there. Swipe to turn the camera.</li>
                <li><b>Camera:</b> drag the screen. <b>Zoom:</b> mouse wheel.</li>
                <li><b>Explore:</b> find 10 golden stars and chat with the cats who live on the island.</li>
                <li><b>Jobs:</b> Post Office (deliver parcels), Cat Cafe (make sandwiches), Fruit Market (count fruit).</li>
                <li><b>Talk:</b> walk to a coloured mat and press E or tap the yellow button.</li>
              </ul>
              {capped && <p className="il-note">You have earned all your coins for today. You can still play and shop!</p>}
              <button type="button" className="il-go" onClick={() => setPanel(null)}>Let&apos;s play!</button>
            </>}

            {panel === 'npc' && talk && <>
              <h2>{talk.who}</h2>
              <p className="il-say">&ldquo;{talk.q}&rdquo; <button type="button" className="il-mini" onClick={() => say(talk.q)}>Listen</button></p>
              <p className="il-sub">Choose your answer</p>
              <div className="il-grid il-grid--col">{talk.opts.map((o) => <button key={o} type="button" className={`il-pick ${talk.picked ? (o === talk.right ? 'on' : o === talk.picked ? 'bad' : '') : ''}`} onClick={() => answerTalk(o)}>{o}</button>)}</div>
              {talk.picked && <p className="il-note">{talk.picked === talk.right ? 'Nice chat! Every 3 good chats give you 2 coins.' : `A better answer: ${talk.right}`}</p>}
              {talk.picked && <button type="button" className="il-go" onClick={() => setPanel(null)}>Bye!</button>}
            </>}

            {panel === 'jobs' && <>
              <h2>Island map</h2>
              <p className="il-note">Choose a place and your cat will walk there.</p>
              <div className="il-jobs">{JOBS.map((j) => (
                <div key={j.id}><b>{j.en}</b><span>{j.what}</span><button type="button" className="il-mini" onClick={() => showWay(j.id)}>Go there</button></div>))}</div>
              <p className="il-note">Stars found: {starCount} / 10. Find them all for 10 coins!</p>
            </>}

            {panel === 'post' && delivery && <>
              <h2>Post Office</h2>
              <p className="il-who">{delivery ? 'Postmaster Pepper' : ''} says:</p>
              <p className="il-say">&ldquo;{delivery.text}&rdquo; <button type="button" className="il-mini" onClick={() => say(delivery.text)}>Listen</button></p>
              <p className="il-note">Find the house number on the blue mailbox. Street names are on green signs.</p>
              <button type="button" className="il-go" onClick={startDelivery}>Take the parcel</button>
            </>}

            {panel === 'cafe' && cafe && <>
              <h2>Cat Cafe</h2>
              <p className="il-who">{cafe.who} says:</p>
              <p className="il-say">&ldquo;{cafe.text}&rdquo; <button type="button" className="il-mini" onClick={() => say(cafe.text)}>Listen</button></p>
              <p className="il-sub">Sandwich</p>
              <div className="il-grid">{CAFE_FOOD.map((f) => <button key={f} type="button" className={`il-pick ${plate.includes(f) ? 'on' : ''}`} onClick={() => { sfx.pick(); setPlate((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f])); }}>{f}</button>)}</div>
              <p className="il-sub">Drink</p>
              <div className="il-grid">{CAFE_DRINK.map((f) => <button key={f} type="button" className={`il-pick ${plate.includes(f) ? 'on' : ''}`} onClick={() => { sfx.pick(); setPlate((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p.filter((x) => !CAFE_DRINK.includes(x)), f])); }}>{f}</button>)}</div>
              <button type="button" className="il-go" onClick={serveCafe} disabled={!plate.length}>Serve</button>
            </>}

            {panel === 'market' && fruit && <>
              <h2>Fruit Market</h2>
              <p className="il-who">{fruit.who} says:</p>
              <p className="il-say">&ldquo;{fruit.text}&rdquo; <button type="button" className="il-mini" onClick={() => say(fruit.text)}>Listen</button></p>
              <div className="il-fruit">{FRUIT.map((f) => (
                <div key={f}><span>{single(f)}</span>
                  <button type="button" onClick={() => setBasket((b) => ({ ...b, [f]: Math.max(0, (b[f] ?? 0) - 1) }))}>−</button>
                  <b>{basket[f] ?? 0}</b>
                  <button type="button" onClick={() => { sfx.pick(); setBasket((b) => ({ ...b, [f]: Math.min(9, (b[f] ?? 0) + 1) })); }}>+</button>
                </div>))}</div>
              <button type="button" className="il-go" onClick={giveFruit}>Give the bag</button>
            </>}

            {panel === 'store' && <>
              <h2>Murly Store</h2>
              <p className="il-note">You have <b>{coins ?? 0}</b> coins.</p>
              <div className="il-tabs">{(['Clothes', 'Home', 'Transport', 'Pets'] as Cat[]).map((c) => <button key={c} type="button" className={tab === c ? 'on' : ''} onClick={() => setTab(c)}>{c}</button>)}</div>
              {tab === 'Clothes' && <><p className="il-sub">Fur colour</p>
                <div className="il-shop">{FUR.map((f) => (
                  <div key={f.id} className={`il-item ${save.outfit.fur === f.id ? 'on' : ''}`}><i style={{ background: f.color }} /><span>{f.en}</span>
                    {owned(f.id) || !f.price ? <button type="button" onClick={() => persist({ ...save, outfit: { ...save.outfit, fur: f.id } })}>{save.outfit.fur === f.id ? 'Wearing' : 'Wear'}</button>
                      : <button type="button" className="buy" onClick={async () => { if (await buy(f)) persist({ ...saveRef.current, outfit: { ...saveRef.current.outfit, fur: f.id } }); }}><i className="il-coin" /> {f.price}</button>}
                  </div>))}</div></>}
              <div className="il-shop">{SHOP.filter((s) => s.cat === tab).map((it) => (
                <div key={it.id} className={`il-item ${worn(it) ? 'on' : ''}`}><i style={{ background: it.color ?? '#EDE6D6' }}>{ICON[it.sub]}</i><span>{it.en}</span>
                  {owned(it.id) ? <button type="button" onClick={() => equip(it)}>{it.sub === 'house' || it.sub === 'yard' ? (worn(it) ? 'Placed' : 'Place') : worn(it) ? 'Take off' : 'Use'}</button>
                    : <button type="button" className="buy" onClick={() => onBuy(it)}><i className="il-coin" /> {it.price}</button>}
                </div>))}</div>
            </>}

            {panel === 'home' && <>
              <h2>My stuff</h2>
              {!save.owned.some((id) => SHOP.find((s) => s.id === id)) && furOwned.length < 2 && <p className="il-note">Nothing here yet. Do jobs, earn coins and visit the Murly Store!</p>}
              {(['Clothes', 'Home', 'Transport', 'Pets'] as Cat[]).map((c) => {
                const mine = SHOP.filter((s) => s.cat === c && owned(s.id)); if (!mine.length) return null;
                return <div key={c}><p className="il-sub">{c}</p><div className="il-shop">{mine.map((it) => (
                  <div key={it.id} className={`il-item ${worn(it) ? 'on' : ''}`}><i style={{ background: it.color ?? '#EDE6D6' }}>{ICON[it.sub]}</i><span>{it.en}</span>
                    <button type="button" onClick={() => equip(it)}>{it.sub === 'house' || it.sub === 'yard' ? (worn(it) ? 'Placed' : 'Place') : worn(it) ? 'Take off' : 'Use'}</button></div>))}</div></div>;
              })}
              {save.yard.length > 0 && <button type="button" className="il-mini" onClick={() => persist({ ...save, yard: [] })}>Clear my yard</button>}
              <button type="button" className="il-go" onClick={() => { sc.current?.teleportHome(); setPanel(null); }}>Go to my home</button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
const ICON: Record<string, string> = { hat: 'H', glasses: 'G', scarf: 'S', bag: 'B', house: 'H', yard: 'Y', ride: 'R', pet: 'P' };
