'use client';
// «Murly Island»: відкритий острів, котик-герой, роботи англійською (пошта, кафе, ринок)
// і магазин, де учень витрачає свої Murly-монетки на одяг, дім, транспорт і улюбленців.
// Увесь текст у грі англійською.
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { say, sfx } from '@/lib/worlds/sound';
import { ICE, ICE_TOP, errandTask, iceOrder, keeperQuestion, lostTask, timeWords, type LostTask } from '@/lib/worlds/island-data';
import { BADGES, CAFE_DRINK, CAFE_FOOD, CLOTHES, COLOURS, FISH, FLAVOURS, FRUIT, FUR, FURN, MISSIONS, RIDDLES, SHOP, START, TALKS, TOPPINGS, cafeOrder, cakeOrder, catchFish, dailyFor, deliveryTask, dressOrder, fruitOrder, single, taxiTask, todayKey, type Addr, type Cat, type Save, type ShopItem } from '@/lib/worlds/island-data';
import type { IslandScene } from '@/lib/worlds/island-scene';
import type { Spot } from '@/lib/worlds/island-data';

type Panel = null | 'post' | 'cafe' | 'market' | 'store' | 'home' | 'help' | 'npc' | 'jobs' | 'bakery' | 'boutique' | 'taxi' | 'pier' | 'today' | 'icecream' | 'board' | 'errand' | 'keeper';
type Tab = Cat | 'Furniture';
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
  const [tab, setTab] = useState<Tab>('Clothes');
  const [cake, setCake] = useState<ReturnType<typeof cakeOrder> | null>(null);
  const [cakeSel, setCakeSel] = useState<{ flavour?: string; layers?: number; topping?: string }>({});
  const [dress, setDress] = useState<ReturnType<typeof dressOrder> | null>(null);
  const [rack, setRack] = useState<string[]>([]);
  const [colour, setColour] = useState('red');
  const [taxi, setTaxi] = useState<(ReturnType<typeof taxiTask> & { at: number; hint: boolean; driving: boolean }) | null>(null);
  const [fishQ, setFishQ] = useState<{ q: string; a: string; opts: string[]; picked?: string; got?: (typeof FISH)[number] } | null>(null);
  const [clock, setClock] = useState<{ hour: number; rain: boolean }>({ hour: 8.5, rain: false });
  const [inside, setInside] = useState<string | null>(null);
  const [decor, setDecor] = useState<{ on: boolean; placing: string | null; picked: number | null }>({ on: false, placing: null, picked: null });
  const [words, setWords] = useState<{ en: string; uk: string }[]>([]);
  const [ice, setIce] = useState<ReturnType<typeof iceOrder> | null>(null);
  const [cup, setCup] = useState<{ scoops: string[]; cone?: boolean; top?: string }>({ scoops: [] });
  const [lost, setLost] = useState<(LostTask & { found: boolean }) | null>(null);
  const [errand, setErrand] = useState<(ReturnType<typeof errandTask> & { stage: 'get' | 'bring' }) | null>(null);
  const [kq, setKq] = useState<(ReturnType<typeof keeperQuestion> & { picked?: string }) | null>(null);
  const onPickupRef = useRef<() => void>(() => {});
  const coinsRef = useRef(coins); coinsRef.current = coins;
  const onPlaceRef = useRef<(x: number, z: number) => void>(() => {});
  const onPickRef = useRef<(i: number) => void>(() => {});
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
      sc.current = new IslandScene(box.current, { onNear: (s) => setNear(s), onStar: (id) => onStarRef.current(id), onClock: (hour, rain) => setClock({ hour, rain }), onPlace: (x, z) => onPlaceRef.current(x, z), onPick: (i) => onPickRef.current(i), onPickup: () => onPickupRef.current() });
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
      fetch('/api/student').then((r) => r.json()).then((d) => setWords(Array.isArray(d.words) ? d.words : [])).catch(() => {});
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
    s.setOutfit(save.outfit); s.setRide(taxi?.driving ? 'ride-taxi' : save.ride); s.setPet(save.pet);
    if (JSON.stringify(s.roomList) !== JSON.stringify(save.room ?? [])) void s.setRoom(save.room ?? []);
    if (s.houseLevel !== save.house) void s.setHouse(save.house);
    if (s.yardList.join() !== save.yard.join()) void s.setYard(save.yard);
    s.setGot(save.stars ?? []); setStarCount((save.stars ?? []).length);
  }, [save, ready, taxi?.driving]);

  // ---- монетки ----
  const earn = async (n: number, why: string) => {
    sfx.coin();
    if (guest) { const c = (coinsRef.current ?? 0) + n; coinsRef.current = c; setCoins(c); persist({ ...saveRef.current, localCoins: c }); flash(`+${n} coins! ${why}`); return; }
    const r = await fetch('/api/coins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'earn', amount: n, reason: `Murly Island: ${why}`, source: 'game' }) }).catch(() => null);
    const d = r ? await r.json().catch(() => ({})) : {};
    if (d.capped) { setCapped(true); flash('Great job! You have earned all your coins for today. Come back tomorrow!'); }
    else flash(`+${n} coins! ${why}`);
    if (typeof d.balance === 'number') setCoins(d.balance);
  };
  const buy = async (it: { id: string; price: number; en: string }) => {
    if ((coins ?? 0) < it.price) { sfx.bad(); flash(`You need ${it.price - (coins ?? 0)} more coins. Do a job to earn them!`, false); return false; }
    if (guest) { const c = (coinsRef.current ?? 0) - it.price; coinsRef.current = c; setCoins(c); persist({ ...saveRef.current, localCoins: c, owned: [...saveRef.current.owned, it.id] }); }
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

  // робота виконана: лічильник, щоденне завдання, монетки
  const done = (job: string, n: number, why: string, extra: Partial<Save> = {}) => {
    const s = saveRef.current; const jobs = { ...s.jobs, [job]: (s.jobs[job] ?? 0) + 1 };
    let d = s.daily?.date === todayKey() ? { ...s.daily } : dailyFor(todayKey());
    let bonus = false;
    if (d.ids.includes(job)) {
      d = { ...d, prog: { ...d.prog, [job]: (d.prog[job] ?? 0) + 1 } };
      if (!d.paid && d.ids.every((id) => (d.prog[id] ?? 0) >= (MISSIONS.find((m) => m.id === id)?.n ?? 2))) { d.paid = true; bonus = true; }
    }
    persist({ ...s, ...extra, jobs, daily: d });
    void (n > 0 ? earn(n, why) : Promise.resolve()).then(() => { if (bonus) { say('Well done! You finished all your missions for today!'); void earn(10, 'All daily missions done!'); } });
  };
  const daily = save.daily?.date === todayKey() ? save.daily : dailyFor(todayKey());
  const dailyDone = daily.ids.filter((id) => (daily.prog[id] ?? 0) >= (MISSIONS.find((m) => m.id === id)?.n ?? 2)).length;
  // нові нагороди
  useEffect(() => {
    if (!isLoaded) return;
    const have = save.badges ?? []; const fresh = BADGES.filter((b) => !have.includes(b.id) && b.of(save) >= b.need);
    if (!fresh.length) return;
    persist({ ...save, badges: [...have, ...fresh.map((b) => b.id)] });
    say(`New badge: ${fresh[0].en}!`); void earn(5 * fresh.length, `New badge: ${fresh.map((b) => b.en).join(', ')}`);
  }, [save]); // eslint-disable-line react-hooks/exhaustive-deps

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
      const COL: Record<string, string> = { post: '#E5484D', cafe: '#F76AA8', store: '#7C66DC', market: '#F5862D', home: '#FFC53D', bakery: '#C8925A', boutique: '#30A46C', taxi: '#FFE08A', pier: '#3E7BFA', icecream: '#F76AA8', board: '#8B5E34' };
      x.fillStyle = '#B8865A'; const [p1, p2] = P(-1.5, -66); x.fillRect(p1, p2, 3 * k, 20 * k);
      s.spots.forEach((sp) => { const k2 = sp.id.replace('enter-', ''); if (COL[k2] && Math.hypot(sp.x, sp.z) < 90) dot(sp.x, sp.z, COL[k2], 4); });
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
    if (o === talk.right) { say(o); const n = (saveRef.current.talks ?? 0) + 1; if (n % 3 !== 0) sfx.coin(); done('chat', n % 3 === 0 ? 2 : 0, 'Great chats!', { talks: n }); }
    else sfx.bad();
  };
  const JOBS = [
    { id: 'post', en: 'Post Office', what: 'Deliver parcels to the right address.' },
    { id: 'cafe', en: 'Cat Cafe', what: 'Make sandwiches and drinks for customers.' },
    { id: 'market', en: 'Fruit Market', what: 'Give customers the right number of fruit.' },
    { id: 'bakery', en: 'Bakery', what: 'Bake the cake the customer wants.' },
    { id: 'boutique', en: 'Boutique', what: 'Find the clothes and colours people ask for.' },
    { id: 'taxi', en: 'Taxi', what: 'Drive passengers to the right place.' },
    { id: 'pier', en: 'Fishing pier', what: 'Solve word riddles and catch fish.' },
    { id: 'icecream', en: 'Ice cream stand', what: 'Make ice creams on the beach.' },
    { id: 'board', en: 'Lost & Found board', what: 'Find lost things around the island.' },
    { id: 'grandma', en: 'Grandma Rose', what: 'Visit any house and help Grandma Rose.' },
    { id: 'lighthouse', en: 'Lighthouse', what: 'Answer Captain Ted’s questions about time and weather.' },
    { id: 'store', en: 'Murly Store', what: 'Buy clothes, furniture, a house, rides and pets.' },
    { id: 'home', en: 'My home', what: 'Your house and yard.' },
  ];
  const showWay = (id: string) => { if (sc.current?.inside) { sc.current.exitHome(); setInside(null); } const p = id === 'grandma' ? sc.current?.spotPos('door-a2') : sc.current?.spotPos(`enter-${id}`) ?? sc.current?.spotPos(id); if (p) { sc.current?.setMarker(p.x, p.z); sc.current?.walkTo(p.x, p.z); } setPanel(null); };

  // ---- взаємодія ----
  const act = useCallback(() => {
    const s = near; if (!s) return;
    if (s.id.startsWith('npc-')) { startTalk(s.label); return; }
    if (s.id.startsWith('enter-')) { const id = s.id.slice(6); if (sc.current?.markerOn && !delivery && !taxi?.hint) sc.current.setMarker(null); sc.current?.enterRoom(id); setInside(id); return; }
    if (errand?.stage === 'get' && s.id === errand.at) { setErrand({ ...errand, stage: 'bring' }); say(`Here you are! ${errand.item}.`); flash(`You got ${errand.item}. Take it to Grandma Rose!`); return; }
    if (s.id === 'guest') {
      if (errand?.stage === 'bring') { say('Oh, thank you, dear! You are so kind!'); setErrand(null); done('errand', 5, 'Grandma Rose is happy.'); return; }
      if (!errand) { const e = errandTask(); setErrand({ ...e, stage: 'get' }); say(e.text); }
      setPanel('errand'); return;
    }
    if (s.id === 'keeper') { setKq(keeperQuestion(clock.hour, clock.rain)); setPanel('keeper'); return; }
    if (s.id === 'icecream') { if (!ice) { const o = iceOrder(saveRef.current.jobs.icecream ?? 0); setIce(o); setCup({ scoops: [] }); say(o.text); } setPanel('icecream'); return; }
    if (s.id === 'board') {
      if (lost?.found) { say('You found it! Thank you so much!'); setLost(null); done('lost', 5, `You returned the ${lost.thing.en}.`); return; }
      if (!lost) { const l = lostTask(); setLost({ ...l, found: false }); sc.current?.setLost(l.place.x, l.place.z, l.thing.id, l.thing.c); say(l.text); }
      setPanel('board'); return;
    }
    if (s.id === 'room-exit') { sc.current?.exitHome(); setInside(null); setDecor({ on: false, placing: null, picked: null }); return; }
    if (s.id === 'taxi-drop' && taxi) {
      const fast = Date.now() - taxi.at < 90_000 && !taxi.hint;
      if (sc.current) sc.current.spots = sc.current.spots.filter((x) => x.id !== 'taxi-drop');
      sc.current?.setMarker(null); setTaxi(null); say('Here we are! Thank you, driver!');
      done('taxi', fast ? 6 : 4, fast ? 'Fast ride!' : 'Passenger delivered.'); return;
    }
    if (s.id === 'home' && saveRef.current.house > 0) { sc.current?.enterHome(); setInside('home'); say('Welcome home!'); return; }
    if (s.id === 'bakery') { if (!cake) { const o = cakeOrder(saveRef.current.jobs.bakery ?? 0); setCake(o); setCakeSel({}); say(o.text); } setPanel('bakery'); return; }
    if (s.id === 'boutique') { if (!dress) { const o = dressOrder(saveRef.current.jobs.boutique ?? 0); setDress(o); setRack([]); say(o.text); } setPanel('boutique'); return; }
    if (s.id === 'taxi') { if (taxi?.driving) { flash(`Your passenger wants to go to ${taxi.dest.name}.`, false); return; } if (!taxi) { const o = taxiTask(saveRef.current.jobs.taxi ?? 0); setTaxi({ ...o, at: 0, hint: false, driving: false }); say(o.text); } setPanel('taxi'); return; }
    if (s.id === 'pier') { newRiddle(); setPanel('pier'); return; }
    if (s.id.startsWith('door-')) {
      if (!delivery) { sc.current?.enterRoom('house'); setInside('house'); say('Come in! Nice to see you!'); return; }
      if (`door-${delivery.addr.id}` === s.id) {
        sc.current?.setCarry(false); sc.current?.setMarker(null);
        const fast = Date.now() - delivery.at < 90_000 && !delivery.hint;
        setDelivery(null); say('Thank you very much!');
        done('post', fast ? 6 : 4, fast ? 'Fast delivery!' : 'Parcel delivered.');
      } else { sfx.bad(); flash(`Oops! This is ${s.label}. Read the address again.`, false); }
      return;
    }
    if (['post', 'cafe', 'market', 'store', 'home'].includes(s.id) && sc.current?.markerOn && !delivery) sc.current.setMarker(null);
    if (s.id === 'post') { if (!delivery) { const d = deliveryTask(); setDelivery({ ...d, at: Date.now(), hint: false }); say(d.text); } setPanel('post'); }
    if (s.id === 'cafe') { if (!cafe) { const o = cafeOrder(saveRef.current.jobs.cafe ?? 0); setCafe(o); setPlate([]); say(o.text); } setPanel('cafe'); }
    if (s.id === 'market') { if (!fruit) { const o = fruitOrder(saveRef.current.jobs.market ?? 0); setFruit(o); setBasket({}); say(o.text); } setPanel('market'); }
    if (s.id === 'store') setPanel('store');
    if (s.id === 'home') setPanel('home');
  }, [near, delivery, cafe, fruit, cake, dress, taxi, words, errand, lost, ice, clock]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.code === 'KeyQ' && !panel) sc.current?.dance(); if (e.code === 'KeyM') setPanel((p) => (p === 'jobs' ? null : 'jobs')); if (e.code === 'KeyE' || e.code === 'Enter') { if (!panel) act(); } if (e.code === 'Escape') setPanel(null); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [act, panel]);

  const serveCafe = () => {
    if (!cafe) return;
    const ok = [...plate].sort().join('|') === cafe.items.join('|');
    if (ok) { say('Yummy! Thank you!'); setCafe(null); setPlate([]); setPanel(null); done('cafe', 5, 'Happy customer.'); }
    else { sfx.bad(); say('Hmm, that is not what I ordered.'); flash('That is not the order. Listen again!', false); }
  };
  const giveFruit = () => {
    if (!fruit) return;
    const keys = new Set([...Object.keys(fruit.want), ...Object.keys(basket).filter((k) => basket[k])]);
    const ok = [...keys].every((k) => (fruit.want[k] ?? 0) === (basket[k] ?? 0));
    if (ok) { say('Perfect, thank you!'); setFruit(null); setBasket({}); setPanel(null); done('market', 4, 'Correct order.'); }
    else { sfx.bad(); flash('Count again! Check the numbers.', false); }
  };
  const startDelivery = () => { sc.current?.setCarry(true); setPanel(null); say('Good luck!'); };
  const hint = () => { if (!delivery) return; const p = sc.current?.spotPos(`door-${delivery.addr.id}`); if (p) sc.current?.setMarker(p.x, p.z); setDelivery({ ...delivery, hint: true }); setPanel(null); };

  const bakeCake = () => {
    if (!cake) return;
    const ok = cakeSel.flavour === cake.flavour && cakeSel.layers === cake.layers && cakeSel.topping === cake.topping;
    if (ok) { say('Wow, it looks delicious! Thank you!'); setCake(null); setCakeSel({}); setPanel(null); done('bakery', 5, 'Perfect cake!'); }
    else { sfx.bad(); const miss = cakeSel.flavour !== cake.flavour ? 'the flavour' : cakeSel.layers !== cake.layers ? 'the number of layers' : 'the topping'; flash(`Check ${miss}. Listen again!`, false); }
  };
  const checkDress = () => {
    if (!dress) return;
    if ([...rack].sort().join('|') === dress.items.join('|')) { say('I love it! Thank you so much!'); setDress(null); setRack([]); setPanel(null); done('boutique', 5, 'Happy shopper.'); }
    else { sfx.bad(); flash('Not quite. Check the colours and the clothes.', false); }
  };
  const startTaxi = () => {
    if (!taxi || !sc.current) return;
    const d = taxi.dest; sc.current.spots = [{ id: 'taxi-drop', x: d.x, z: d.z, r: 4, label: d.name }, ...sc.current.spots.filter((x) => x.id !== 'taxi-drop')];
    setTaxi({ ...taxi, at: Date.now(), driving: true }); setPanel(null); say('Let’s go!');
  };
  const taxiHint = () => { if (!taxi) return; sc.current?.setMarker(taxi.dest.x, taxi.dest.z); setTaxi({ ...taxi, hint: true }); };
  const newRiddle = () => {
    const mine = words.filter((w) => w.en.split(' ').length <= 3);
    if (mine.length >= 4 && Math.random() < 0.45) {
      const w = mine[Math.floor(Math.random() * mine.length)];
      const wrong = mine.filter((x) => x.en.toLowerCase() !== w.en.toLowerCase()).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.en);
      setFishQ({ q: `A word from your dictionary: how do you say “${w.uk}” in English?`, a: w.en, opts: [w.en, ...wrong].sort(() => Math.random() - 0.5) }); return;
    }
    const r = RIDDLES[Math.floor(Math.random() * RIDDLES.length)];
    setFishQ({ q: r.q, a: r.a, opts: [r.a, ...r.wrong].sort(() => Math.random() - 0.5) }); say(r.q);
  };
  const answerFish = (o: string) => {
    if (!fishQ || fishQ.picked) return;
    if (o === fishQ.a) {
      const f = catchFish(); setFishQ({ ...fishQ, picked: o, got: f }); say(`You caught a ${f.en}!`);
      const fish = { ...(saveRef.current.fish ?? {}) }; fish[f.id] = (fish[f.id] ?? 0) + 1;
      done('fish', f.rare >= 2 ? 4 : 2, f.rare >= 2 ? `A rare ${f.en}!` : `You caught a ${f.en}.`, { fish });
    } else { sfx.bad(); setFishQ({ ...fishQ, picked: o }); }
  };
  onPickupRef.current = () => { if (!lost) return; sfx.coin(); setLost({ ...lost, found: true }); say(`You found the ${lost.thing.en}!`); flash(`You found the ${lost.thing.en}! Take it back to the notice board.`); };
  const sellIce = () => {
    if (!ice) return;
    const ok = [...cup.scoops].sort().join('|') === ice.scoops.join('|') && cup.cone === ice.cone && cup.top === ice.top;
    if (ok) { say('Mmm, delicious! Thank you!'); setIce(null); setCup({ scoops: [] }); setPanel(null); done('icecream', 4, 'Happy customer.'); }
    else { sfx.bad(); const miss = [...cup.scoops].sort().join('|') !== ice.scoops.join('|') ? 'the scoops' : cup.cone !== ice.cone ? 'cone or cup' : 'the topping'; flash(`Check ${miss}. Listen again!`, false); }
  };
  const answerKeeper = (o: string) => {
    if (!kq || kq.picked) return; setKq({ ...kq, picked: o });
    if (o === kq.a) { say(o); done('keeper', 2, 'Good answer, sailor!'); } else sfx.bad();
  };
  // ---- дім всередині ----
  const furnOwned = FURN.filter((f) => save.owned.includes(`furn-${f.f}`));
  const room = save.room ?? [];
  const unplaced = furnOwned.filter((f) => !room.some((r) => r.f === f.f));
  onPlaceRef.current = (x, z) => {
    const f = decor.placing; if (!f) return;
    sfx.pick(); persist({ ...saveRef.current, room: [...(saveRef.current.room ?? []), { f, x: Math.round(x * 4) / 4, z: Math.round(z * 4) / 4, r: 0 }] });
    setDecor({ on: true, placing: null, picked: null });
  };
  onPickRef.current = (i) => { sfx.pick(); setDecor({ on: true, placing: null, picked: i }); };
  useEffect(() => { sc.current?.setDecor(decor.on, decor.placing); }, [decor]);
  const roomEdit = (op: 'turn' | 'move' | 'away') => {
    const i = decor.picked; if (i === null) return; const list = [...room]; const it = list[i]; if (!it) return;
    if (op === 'turn') { list[i] = { ...it, r: (it.r + Math.PI / 2) % (Math.PI * 2) }; persist({ ...saveRef.current, room: list }); return; }
    list.splice(i, 1); persist({ ...saveRef.current, room: list });
    setDecor({ on: true, placing: op === 'move' ? it.f : null, picked: null });
  };
  const furnName = (f: string) => FURN.find((x) => x.f === f)?.en ?? f;

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

  const nearText = near ? (near.id === 'taxi-drop' ? `Drop off at ${near.label}` : near.id === 'room-exit' ? 'Go outside' : near.id === 'pier' ? 'Go fishing' : near.id === 'icecream' ? 'Sell ice cream' : near.id === 'board' ? (lost?.found ? 'Give back the lost thing' : 'Read the notice board') : errand?.stage === 'get' && near.id === errand.at ? `Get ${errand.item}` : near.id.startsWith('enter-') ? `Go into the ${near.label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}` : inside && !near.id.startsWith('npc-') ? `Talk to ${near.label}` : near.id.startsWith('door-') && !delivery ? `Visit number ${near.label}` : near.id === 'home' && save.house > 0 ? 'Go inside my home' : near.id.startsWith('npc-') ? `Talk to ${near.label}` : near.id.startsWith('door-') ? `Deliver to ${near.label}` : near.id === 'home' ? 'My home' : `Enter: ${near.label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}`) : '';
  const furOwned = FUR.filter((f) => save.owned.includes(f.id) || f.price === 0);

  return (
    <div className={`il ${touch ? 'is-touch' : ''}`}>
      <div className="il-canvas" ref={box} />
      {!ready && <div className="il-load">Loading the island…</div>}

      <div className="il-hud">
        <Link href="/games" className="il-chip">← Games</Link>
        <span className="il-coins" title="Murly coins"><i className="il-coin" /> {coins ?? '…'}</span>
        <span className="il-chip il-stars" title="Stars found"><i className="il-star" /> {starCount}/10</span>
        <span className="il-chip" title="Time and weather">{fmtHour(clock.hour)} · {clock.rain ? 'rainy' : clock.hour >= 20 || clock.hour < 6 ? 'clear night' : 'sunny'}</span>
        <button type="button" className={`il-chip ${dailyDone === 3 ? 'il-chip--y' : ''}`} onClick={() => setPanel('today')}>Today {dailyDone}/3</button>
        {guest && <Link href="/sign-in?redirect_url=/play/island" className="il-chip il-chip--y">Sign in to use your Murly coins</Link>}
      </div>
      <div className="il-hud il-hud--r">
        <button type="button" className="il-chip" onClick={() => setPanel('jobs')}>Map</button>
        <button type="button" className="il-chip" onClick={() => setPanel('store')}>Shop</button>
        <button type="button" className="il-chip" onClick={() => setPanel('home')}>My stuff</button>
        {inside ? <>
          {inside === 'home' && <button type="button" className={`il-chip ${decor.on ? 'il-chip--y' : ''}`} onClick={() => setDecor(decor.on ? { on: false, placing: null, picked: null } : { on: true, placing: null, picked: null })}>{decor.on ? 'Done' : 'Decorate'}</button>}
          <button type="button" className="il-chip" onClick={() => { sc.current?.exitHome(); setInside(null); setDecor({ on: false, placing: null, picked: null }); }}>Go outside</button>
        </> : <button type="button" className="il-chip" onClick={() => { sc.current?.teleportHome(); }}>Go home</button>}
        <button type="button" className="il-chip" onClick={() => setPanel('help')}>?</button>
      </div>

      {!inside && <canvas ref={mini} className="il-mini-map" width={150} height={150} onClick={() => setPanel('jobs')} aria-label="Map" />}
      {!panel && !inside && !delivery && !taxi?.driving && <div className="il-today" onClick={() => setPanel('today')}>{daily.ids.map((id) => { const m = MISSIONS.find((x) => x.id === id)!; const n = Math.min(daily.prog[id] ?? 0, m.n); return <div key={id} className={n >= m.n ? 'on' : ''}>{m.en.replace('{n}', String(m.n))} <b>{n}/{m.n}</b></div>; })}</div>}
      {inside === 'home' && decor.on && !panel && (
        <div className="il-tray">
          {decor.picked !== null && room[decor.picked] ? <>
            <b>{furnName(room[decor.picked].f)}</b>
            <button type="button" className="il-mini" onClick={() => roomEdit('turn')}>Turn</button>
            <button type="button" className="il-mini" onClick={() => roomEdit('move')}>Move</button>
            <button type="button" className="il-mini" onClick={() => roomEdit('away')}>Put away</button>
            <button type="button" className="il-mini" onClick={() => setDecor({ on: true, placing: null, picked: null })}>OK</button>
          </> : decor.placing ? <><b>Tap the floor to put the {furnName(decor.placing)} there.</b><button type="button" className="il-mini" onClick={() => setDecor({ on: true, placing: null, picked: null })}>Cancel</button></>
            : <>
              <span className="il-tray-t">{unplaced.length ? 'Choose a thing, then tap the floor. Tap a thing in the room to turn or move it.' : furnOwned.length ? 'Everything is in the room. Tap a thing to turn or move it.' : 'You have no furniture yet. Buy some in the Murly Store!'}</span>
              <div className="il-tray-row">{unplaced.map((f) => <button key={f.f} type="button" className="il-tray-it" onClick={() => setDecor({ on: true, placing: f.f, picked: null })}><img src={`/worlds/kenney/t/${f.f}.png`} alt="" />{f.en}</button>)}</div>
              {!furnOwned.length && <button type="button" className="il-mini" onClick={() => { setTab('Furniture'); setPanel('store'); }}>Open the shop</button>}
            </>}
        </div>
      )}
      {!panel && (delivery || taxi?.driving || lost || errand) && <div className="il-tasks">
      {lost && <div className="il-task"><b>{lost.found ? 'Take it back:' : 'Lost:'}</b> {lost.found ? `Bring the ${lost.thing.en} to the notice board near the fountain.` : `${lost.thing.en}, ${lost.place.en}.`} <button type="button" className="il-mini" onClick={() => say(lost.found ? `Bring the ${lost.thing.en} to the notice board.` : `${lost.thing.en}, ${lost.place.en}.`)}>Listen</button></div>}
      {errand && <div className="il-task"><b>Grandma Rose:</b> {errand.stage === 'get' ? `Get ${errand.item} at the ${errand.place}.` : `Take ${errand.item} to Grandma Rose (any house).`}</div>}
      {delivery && (
        <div className="il-task"><b>Parcel for:</b> {delivery.text} <button type="button" className="il-mini" onClick={() => say(delivery.text)}>Listen</button>{!delivery.hint && <button type="button" className="il-mini" onClick={hint}>Show me (fewer coins)</button>}</div>
      )}
      {taxi?.driving && (
        <div className="il-task"><b>Passenger:</b> {taxi.text} <button type="button" className="il-mini" onClick={() => say(taxi.text)}>Listen</button>{!taxi.hint && <button type="button" className="il-mini" onClick={taxiHint}>Show me (fewer coins)</button>}</div>
      )}
      </div>}
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
                <li><b>Jobs:</b> Post Office (deliver parcels), Cat Cafe (make sandwiches), Fruit Market (count fruit), Bakery (bake cakes), Boutique (find clothes), Taxi (drive passengers), Fishing pier (word riddles).</li>
                <li><b>More jobs:</b> sell ice cream on the beach, find lost things from the notice board near the fountain, help Grandma Rose in any house, and answer Captain Ted’s questions in the lighthouse.</li>
                <li><b>Every day:</b> three new missions. Finish all three for 10 bonus coins. Win badges for your jobs.</li>
                <li><b>Buildings:</b> you can go into every building: the shops, the cafe, the post office, the lighthouse and the houses. The jobs are at the counters inside.</li>
                <li><b>Your home:</b> buy a house, go inside and decorate it with furniture from the shop.</li>
                <li><b>Day and night:</b> one day on the island is 8 minutes. Look for fireflies at night and boats on the sea!</li>
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

            {panel === 'today' && <>
              <h2>Today&apos;s missions</h2>
              <div className="il-jobs">{daily.ids.map((id) => { const m = MISSIONS.find((x) => x.id === id)!; const n = Math.min(daily.prog[id] ?? 0, m.n); return (
                <div key={id}><b>{m.en.replace('{n}', String(m.n))}</b><span className="il-bar"><i style={{ width: `${(n / m.n) * 100}%` }} /></span><span>{n} / {m.n}</span></div>); })}</div>
              <p className="il-note">{daily.paid ? 'All done for today! Come back tomorrow for new missions.' : 'Finish all three missions to get 10 bonus coins.'}</p>
              <p className="il-sub">Badges</p>
              <div className="il-badges">{BADGES.map((b) => { const v = Math.min(b.of(save), b.need); const on = (save.badges ?? []).includes(b.id); return <div key={b.id} className={on ? 'on' : ''}>{on ? <i className="il-star" /> : <i />}<b>{b.en}</b><span>{b.what}</span><span className="il-bar"><i style={{ width: `${(v / b.need) * 100}%` }} /></span></div>; })}</div>
            </>}

            {panel === 'bakery' && cake && <>
              <h2>Bakery</h2>
              <p className="il-who">{cake.who} says:</p>
              <p className="il-say">&ldquo;{cake.text}&rdquo; <button type="button" className="il-mini" onClick={() => say(cake.text)}>Listen</button></p>
              <div className="il-cake">{Array.from({ length: cakeSel.layers ?? 1 }).map((_, i) => <span key={i} style={{ background: FLAVOURS.find((f) => f.id === cakeSel.flavour)?.color ?? '#EDE6D6', width: `${120 - i * 22}px` }} />)}<em>{cakeSel.topping ?? ''}</em></div>
              <p className="il-sub">Flavour</p>
              <div className="il-grid">{FLAVOURS.map((f) => <button key={f.id} type="button" className={`il-pick ${cakeSel.flavour === f.id ? 'on' : ''}`} onClick={() => { sfx.pick(); setCakeSel({ ...cakeSel, flavour: f.id }); }}><i className="il-dot" style={{ background: f.color }} />{f.id}</button>)}</div>
              <p className="il-sub">Layers</p>
              <div className="il-grid">{[1, 2, 3].map((n) => <button key={n} type="button" className={`il-pick ${cakeSel.layers === n ? 'on' : ''}`} onClick={() => { sfx.pick(); setCakeSel({ ...cakeSel, layers: n }); }}>{['one', 'two', 'three'][n - 1]}</button>)}</div>
              <p className="il-sub">On top</p>
              <div className="il-grid">{TOPPINGS.map((t) => <button key={t} type="button" className={`il-pick ${cakeSel.topping === t ? 'on' : ''}`} onClick={() => { sfx.pick(); setCakeSel({ ...cakeSel, topping: t }); }}>{t}</button>)}</div>
              <button type="button" className="il-go" onClick={bakeCake} disabled={!cakeSel.flavour || !cakeSel.layers || !cakeSel.topping}>Bake it!</button>
            </>}

            {panel === 'boutique' && dress && <>
              <h2>Boutique</h2>
              <p className="il-who">{dress.who} says:</p>
              <p className="il-say">&ldquo;{dress.text}&rdquo; <button type="button" className="il-mini" onClick={() => say(dress.text)}>Listen</button></p>
              <p className="il-sub">1. Choose a colour</p>
              <div className="il-grid">{COLOURS.map((c) => <button key={c.id} type="button" className={`il-pick ${colour === c.id ? 'on' : ''}`} onClick={() => setColour(c.id)}><i className="il-dot" style={{ background: c.c }} />{c.id}</button>)}</div>
              <p className="il-sub">2. Add clothes in this colour</p>
              <div className="il-grid">{CLOTHES.map((c) => <button key={c} type="button" className="il-pick" onClick={() => { sfx.pick(); const it = `${colour} ${c}`; setRack((r) => (r.includes(it) ? r : [...r.filter((x) => !x.endsWith(` ${c}`)), it])); }}>{c}</button>)}</div>
              <p className="il-sub">On the counter</p>
              <div className="il-grid">{rack.length ? rack.map((r) => <button key={r} type="button" className="il-pick on" onClick={() => setRack(rack.filter((x) => x !== r))}><i className="il-dot" style={{ background: COLOURS.find((c) => r.startsWith(c.id + ' '))?.c }} />{r} ✕</button>) : <span className="il-note">Nothing yet</span>}</div>
              <button type="button" className="il-go" onClick={checkDress} disabled={!rack.length}>Give the clothes</button>
            </>}

            {panel === 'taxi' && taxi && <>
              <h2>Taxi</h2>
              <p className="il-who">{taxi.who} says:</p>
              <p className="il-say">&ldquo;{taxi.text}&rdquo; <button type="button" className="il-mini" onClick={() => say(taxi.text)}>Listen</button></p>
              <p className="il-note">Drive to the right place and press the yellow button when you are there. Use the map if you get lost.</p>
              <button type="button" className="il-go" onClick={startTaxi}>Get in and drive</button>
            </>}

            {panel === 'pier' && fishQ && <>
              <h2>Fishing pier</h2>
              <p className="il-note">Answer the riddle to catch a fish.</p>
              <p className="il-say">{fishQ.q} {!fishQ.q.startsWith('A word') && <button type="button" className="il-mini" onClick={() => say(fishQ.q)}>Listen</button>}</p>
              <div className="il-grid il-grid--col">{fishQ.opts.map((o) => <button key={o} type="button" className={`il-pick ${fishQ.picked ? (o === fishQ.a ? 'on' : o === fishQ.picked ? 'bad' : '') : ''}`} onClick={() => answerFish(o)}>{o}</button>)}</div>
              {fishQ.got && <div className="il-catch"><span className="il-fish" style={{ background: fishQ.got.color }} /><b>You caught a {fishQ.got.en}!</b>{fishQ.got.rare >= 2 && <em> Rare!</em>}</div>}
              {fishQ.picked && !fishQ.got && <p className="il-note">Splash! The fish swam away. The answer is: <b>{fishQ.a}</b></p>}
              {fishQ.picked && <button type="button" className="il-go" onClick={newRiddle}>Fish again</button>}
              <p className="il-sub">My fish album</p>
              <div className="il-album">{FISH.map((f) => { const n = save.fish?.[f.id] ?? 0; return <div key={f.id} className={n ? 'on' : ''}><span className="il-fish" style={{ background: n ? f.color : '#D5D9DE' }} /><span>{n ? f.en : '?'}</span>{n > 0 && <b>{n}</b>}</div>; })}</div>
            </>}

            {panel === 'icecream' && ice && <>
              <h2>Ice cream stand</h2>
              <p className="il-who">{ice.who} says:</p>
              <p className="il-say">&ldquo;{ice.text}&rdquo; <button type="button" className="il-mini" onClick={() => say(ice.text)}>Listen</button></p>
              <div className="il-ice">{[...cup.scoops].reverse().map((f, i) => <span key={i} style={{ background: ICE.find((x) => x.id === f)?.c }} />)}{cup.cone !== undefined && <i className={cup.cone ? 'cone' : 'cup'} />}<em>{cup.top && cup.top !== 'nothing on top' ? cup.top : ''}</em></div>
              <p className="il-sub">Scoops ({cup.scoops.length} / 3)</p>
              <div className="il-grid">{ICE.map((f) => <button key={f.id} type="button" className="il-pick" disabled={cup.scoops.length >= 3} onClick={() => { sfx.pick(); setCup({ ...cup, scoops: [...cup.scoops, f.id] }); }}><i className="il-dot" style={{ background: f.c }} />{f.id}</button>)}
                {cup.scoops.length > 0 && <button type="button" className="il-pick" onClick={() => setCup({ ...cup, scoops: cup.scoops.slice(0, -1) })}>take one off</button>}</div>
              <p className="il-sub">Cone or cup</p>
              <div className="il-grid">{[true, false].map((c) => <button key={String(c)} type="button" className={`il-pick ${cup.cone === c ? 'on' : ''}`} onClick={() => setCup({ ...cup, cone: c })}>{c ? 'cone' : 'cup'}</button>)}</div>
              <p className="il-sub">On top</p>
              <div className="il-grid">{ICE_TOP.map((t) => <button key={t} type="button" className={`il-pick ${cup.top === t ? 'on' : ''}`} onClick={() => setCup({ ...cup, top: t })}>{t}</button>)}</div>
              <button type="button" className="il-go" onClick={sellIce} disabled={!cup.scoops.length || cup.cone === undefined || !cup.top}>Give the ice cream</button>
            </>}

            {panel === 'board' && lost && <>
              <h2>Lost &amp; Found</h2>
              <div className="il-note-paper">{lost.text} <button type="button" className="il-mini" onClick={() => say(lost.text)}>Listen</button></div>
              <p className="il-note">Read where it is. <b>under</b> = below, <b>behind</b> = at the back, <b>next to</b> = very near, <b>in front of</b> = before the door. Go there and walk to the shiny thing.</p>
              <button type="button" className="il-go" onClick={() => setPanel(null)}>I&apos;ll find it!</button>
            </>}

            {panel === 'errand' && errand && <>
              <h2>Grandma Rose</h2>
              <p className="il-say">&ldquo;{errand.text}&rdquo; <button type="button" className="il-mini" onClick={() => say(errand.text)}>Listen</button></p>
              <p className="il-note">{errand.stage === 'get' ? `Go to the ${errand.place}, get it at the counter and come back to any house.` : 'You have it! Give it to Grandma Rose.'}</p>
              <button type="button" className="il-go" onClick={() => setPanel(null)}>OK, I&apos;ll go!</button>
              <button type="button" className="il-mini" onClick={() => startTalk('Grandma Rose')}>Just chat</button>
            </>}

            {panel === 'keeper' && kq && <>
              <h2>Captain Ted</h2>
              <p className="il-say">&ldquo;{kq.q}&rdquo; <button type="button" className="il-mini" onClick={() => say(kq.q)}>Listen</button></p>
              <div className="il-grid il-grid--col">{kq.opts.map((o) => <button key={o} type="button" className={`il-pick ${kq.picked ? (o === kq.a ? 'on' : o === kq.picked ? 'bad' : '') : ''}`} onClick={() => answerKeeper(o)}>{o}</button>)}</div>
              {kq.picked && <p className="il-note">{kq.picked === kq.a ? 'Well done, sailor!' : `The answer is: ${kq.a}`}</p>}
              {kq.picked && <button type="button" className="il-go" onClick={() => setKq(keeperQuestion(clock.hour, clock.rain))}>Next question</button>}
              <p className="il-note">Now: {timeWords(clock.hour)}</p>
            </>}

            {panel === 'store' && <>
              <h2>Murly Store</h2>
              <p className="il-note">You have <b>{coins ?? 0}</b> coins.</p>
              <div className="il-tabs">{(['Clothes', 'Home', 'Furniture', 'Transport', 'Pets'] as Tab[]).map((c) => <button key={c} type="button" className={tab === c ? 'on' : ''} onClick={() => setTab(c)}>{c}</button>)}</div>
              {tab === 'Furniture' && <><p className="il-note">{save.house ? 'Things for inside your home. Go inside and press Decorate to place them.' : 'Buy a house first (the Home tab), then you can put furniture inside.'}</p>
                <div className="il-shop">{FURN.map((f) => { const id = `furn-${f.f}`; return (
                  <div key={id} className="il-item"><img className="il-thumb" src={`/worlds/kenney/t/${f.f}.png`} alt="" /><span>{f.en}</span>
                    {owned(id) ? <button type="button" disabled>Bought</button> : <button type="button" className="buy" onClick={() => buy({ id, price: f.price, en: f.en })}><i className="il-coin" /> {f.price}</button>}
                  </div>); })}</div></>}
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
              {furnOwned.length > 0 && <p className="il-note">Furniture: {furnOwned.map((f) => f.en).join(', ')}. Go inside your home and press Decorate.</p>}
              <button type="button" className="il-mini" onClick={() => setPanel('today')}>Missions and badges</button>
              <button type="button" className="il-go" onClick={() => { if (inside) { setPanel(null); return; } sc.current?.teleportHome(); setPanel(null); }}>Go to my home</button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
function fmtHour(h: number) { const hh = Math.floor(h); const m = h % 1 ? '30' : '00'; return `${((hh + 11) % 12) + 1}:${m} ${hh < 12 ? 'am' : 'pm'}`; }
const ICON: Record<string, string> = { hat: 'H', glasses: 'G', scarf: 'S', bag: 'B', house: 'H', yard: 'Y', ride: 'R', pet: 'P' };
