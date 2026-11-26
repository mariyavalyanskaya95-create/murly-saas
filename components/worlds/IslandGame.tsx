'use client';
// «Murly Island»: відкритий острів, котик-герой, роботи англійською (пошта, кафе, ринок)
// і магазин, де учень витрачає свої Murly-монетки на одяг, дім, транспорт і улюбленців.
// Увесь текст у грі англійською.
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { say, sfx } from '@/lib/worlds/sound';
import { DIALOGS, nextDialog, type Dialog } from '@/lib/worlds/island-dialogs';
import { CHAT, IslandNet, type NetPlayer } from '@/lib/worlds/island-net';
import { checkChat, FILTER_MSG } from '@/lib/chat-filter';
import { GRAMMAR, LISTEN_WORDS, LOST_PLACES, treasureHunt } from '@/lib/worlds/island-data';
import { ACT, EMOTES, FOODS, FRIDGE, INGREDIENTS, RECIPES, friendLevel, CHOICES, MELODIES, SKILLS, SKILL_OF, skillLevel, CROPS, cropProgress, JOKES, COMPLIMENTS, RPS, FURN_ALL, FURN_CATS } from '@/lib/worlds/island-data';
import { ADDRS, DESTS, HAIR_COLOURS, PROFS, STARTER, STYLE, STYLE_COLOURS, profLevel, type StylePart } from '@/lib/worlds/island-data';
import { ICE, ICE_TOP, errandTask, iceOrder, keeperQuestion, lostTask, timeWords, type LostTask } from '@/lib/worlds/island-data';
import { BADGES, CAFE_DRINK, CAFE_FOOD, CLOTHES, COLOURS, FISH, FLAVOURS, FRUIT, FUR, FURN, MISSIONS, RIDDLES, SHOP, START, TALKS, TOPPINGS, cafeOrder, cakeOrder, catchFish, dailyFor, deliveryTask, dressOrder, fruitOrder, single, taxiTask, todayKey, type Addr, type Cat, type Save, type ShopItem } from '@/lib/worlds/island-data';
import type { IslandScene } from '@/lib/worlds/island-scene';
import type { Spot } from '@/lib/worlds/island-data';

type Panel = null | 'post' | 'cafe' | 'market' | 'store' | 'home' | 'help' | 'npc' | 'jobs' | 'bakery' | 'boutique' | 'taxi' | 'pier' | 'today' | 'icecream' | 'board' | 'errand' | 'keeper' | 'style' | 'career' | 'dialog' | 'fridge' | 'cook' | 'bag' | 'friend' | 'acts' | 'choose' | 'book' | 'wordgame' | 'garden' | 'skills' | 'joke' | 'nice' | 'rps' | 'school' | 'online' | 'chat';
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
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [stab, setStab] = useState<StylePart | 'acc' | 'fur'>('hair');
  const [dlg, setDlg] = useState<{ d: Dialog; node: string; react?: string; said?: string } | null>(null);
  const restored = useRef(false);
  const [needs, setNeeds] = useState({ food: 80, energy: 80, fun: 80 });
  const needsRef = useRef(needs); needsRef.current = needs;
  const [acting, setActing] = useState<{ kind: string; say: string; until: number } | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [dish, setDish] = useState<string | null>(null);
  const [npcI, setNpcI] = useState<number | null>(null);
  const [giveMode, setGiveMode] = useState(false);
  const cool = useRef<Record<string, number>>({});
  const warned = useRef<Record<string, boolean>>({});
  const [choose, setChoose] = useState<{ kind: string; m?: { x: number; z: number; y: number; rot: number } } | null>(null);
  const [book, setBook] = useState<{ t: string; text: string } | null>(null);
  const [wg, setWg] = useState<{ q: string; a: string; opts: string[]; picked?: string; n: number; right: number } | null>(null);
  const [joke, setJoke] = useState<{ q: string; a: string; shown: boolean } | null>(null);
  const [rps, setRps] = useState<{ me: string; them: string; res: string } | null>(null);
  const [fcat, setFcat] = useState('living');
  const actx = useRef<AudioContext | null>(null);
  // школа, скарби, човен, хованки
  const [lessonQ, setLessonQ] = useState<{ kind: string; q: string; a: string; opts: string[]; picked?: string; n: number; right: number; speak?: string } | null>(null);
  const [treasure, setTreasure] = useState<{ steps: { x: number; z: number; text: string }[]; i: number; chest: boolean } | null>(null);
  const [boating, setBoating] = useState(false);
  const [seek, setSeek] = useState<{ i: number; name: string; text: string } | null>(null);
  // гра по мережі
  const net = useRef<IslandNet | null>(null);
  const [online, setOnline] = useState<Record<string, NetPlayer & { last: number }>>({});
  const [netOk, setNetOk] = useState(false);
  const [chatLog, setChatLog] = useState<{ n: string; t: string; me?: boolean; mid?: number }[]>([]);
  const [chatText, setChatText] = useState('');
  const [chatErr, setChatErr] = useState('');
  const [reqs, setReqs] = useState<{ id: string; n: string }[]>([]);
  const [chatCat, setChatCat] = useState('Hello');
  const muted = useRef<Set<string>>(new Set());
  // 3D-мініатюри речей
  const wantThumbs = useCallback((ids: string[]) => {
    void import('@/lib/worlds/island-scene').then(async ({ thumbFor }) => {
      for (const id of ids) { if (thumbsRef.current[id]) continue; const u = await thumbFor(id); if (u) { thumbsRef.current = { ...thumbsRef.current, [id]: u }; setThumbs(thumbsRef.current); } }
    });
  }, []);
  const thumbsRef = useRef<Record<string, string>>({});
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
    const prof = PROFS.find((p) => p.id === s.prof);
    let lvlUp: string | null = null;
    if (prof && prof.job === job && n > 0) {
      n += 2; why = `${why} (+2 ${prof.en} bonus)`;
      const a = profLevel(s.jobs[job] ?? 0), b = profLevel(jobs[job]);
      if (b.i > a.i) lvlUp = `${b.en} ${prof.en}`;
    }
    void (n > 0 ? earn(n, why) : Promise.resolve()).then(() => {
      if (lvlUp) { say(`Congratulations! You are now a ${lvlUp}!`); flash(`Promotion! You are now a ${lvlUp}!`); void earn(10, 'Promotion!'); } if (bonus) { say('Well done! You finished all your missions for today!'); void earn(10, 'All daily missions done!'); } });
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
    const nd = nextDialog(who, saveRef.current.dialogs ?? []);
    if (nd) { setDlg({ d: nd, node: 'start' }); say(nd.nodes.start.say); setPanel('dialog'); return; }
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
    if (s.id.startsWith('npc-')) { setNpcI(Number(s.id.slice(4))); setGiveMode(false); setPanel('friend'); return; }
    if (s.id.startsWith('use:')) { if (sc.current?.pose) { sc.current.setPose(null); setCaption(null); setActing(null); return; } const m = sc.current?.useMeta[s.id]; if (m) doUse(m.kind, m); return; }
    if (s.id === 'campbook') { doUse('read'); return; }
    if (s.id === 'school') { setLessonQ(null); setPanel('school'); return; }
    if (s.id === 'boat') { sc.current?.startBoat(); setBoating(true); tell("I'm sailing a boat around the island! Steer with the arrows or the joystick."); return; }
    if (s.id === 'boat-dock') { if (sc.current?.boating) { sc.current.stopBoat(); setBoating(false); tell("I'm back on the pier."); } return; }
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
  onPickupRef.current = () => { if (treasure?.chest) { setTreasure(null); sfx.coin(); say('You found the treasure! Golden coins!'); tell('I found the treasure chest! It is full of golden coins!'); done('treasure', 10, 'Treasure found!'); return; } if (!lost) return; sfx.coin(); setLost({ ...lost, found: true }); say(`You found the ${lost.thing.en}!`); flash(`You found the ${lost.thing.en}! Take it back to the notice board.`); };
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
  const pickDialog = (o: { t: string; to?: string; bad?: string }) => {
    if (!dlg) return;
    if (o.bad) { sfx.bad(); setDlg({ ...dlg, react: o.bad, said: o.t }); say(o.bad); return; }
    sfx.pick();
    if (o.to) { const n = dlg.d.nodes[o.to]; setDlg({ d: dlg.d, node: o.to, said: o.t }); say(n.say); return; }
    // кінець розмови: новий друг
    const s = saveRef.current; const who = dlg.d.npc;
    const friends = { ...(s.friends ?? {}), [who]: (s.friends?.[who] ?? 0) + 3 };
    setDlg({ ...dlg, node: '__end', said: o.t });
    window.setTimeout(() => addSkill('dialog'), 100);
    done('chat', 3, `Great talk with ${who}!`, { dialogs: [...(s.dialogs ?? []), dlg.d.id], friends, talks: (s.talks ?? 0) + 1 });
  };
  const chooseProf = (id: string) => {
    const p = PROFS.find((x) => x.id === id); if (!p) return;
    const s = saveRef.current; const uni = Object.values(p.uniform).filter((v) => typeof v === 'string' && /^(hat|glasses|scarf|bag|cape|bow|top|hold)-/.test(v as string)) as string[];
    persist({ ...s, prof: id, owned: [...new Set([...s.owned, ...uni])], outfit: { ...s.outfit, ...p.uniform } });
    say(`You are a ${p.en} now!`); flash(`New job: ${p.en}! You get +2 coins for every ${p.en.toLowerCase()} job.`);
  };
  const styleOwned = (id: string) => STARTER.includes(id) || save.owned.includes(id) || (STYLE.find((x) => x.id === id)?.price ?? 1) === 0;
  const wearStyle = (id: string) => { const part = id.split('-')[0] as StylePart; persist({ ...saveRef.current, outfit: { ...saveRef.current.outfit, [part]: id } }); };
  const colourKey: Record<string, keyof Save['outfit']> = { hair: 'hairC', top: 'topC', bottom: 'bottomC', shoes: 'shoesC' };
  // ---- як у Sims: потреби й дії ----
  const clamp = (v: number) => Math.max(0, Math.min(100, v));
  const addNeeds = (d: { food?: number; energy?: number; fun?: number }) => setNeeds((n) => ({ food: clamp(n.food + (d.food ?? 0)), energy: clamp(n.energy + (d.energy ?? 0)), fun: clamp(n.fun + (d.fun ?? 0)) }));
  const tell = (text: string) => { setCaption(text); say(text); };
  const doUse = (kind: string, m?: { x: number; z: number; y: number; rot: number }) => {
    const a = ACT[kind]; const sx = sc.current;
    if (kind === 'fridge') { setPanel('fridge'); tell("Let's see what's in the fridge."); return; }
    if (kind === 'cook') { setRecipe(null); setPicked([]); setDish(null); setPanel('cook'); return; }
    if (kind === 'mirror' || kind === 'wardrobe') { setPanel('style'); return; }
    if (CHOICES[kind] && !(kind === 'telescope')) { setChoose({ kind, m }); setPanel('choose'); return; }
    if (kind === 'computer' || kind === 'arcade') { if (kind === 'computer') { newWord(0, 0); setPanel('wordgame'); return; } }
    if (kind === 'garden') { setPanel('garden'); return; }
    if (kind === 'telescope') { const night = clock.hour >= 20 || clock.hour < 6; const t = night ? 'I can see the moon and lots of stars. That bright one is a planet!' : 'I can see three sailboats and some seagulls over the sea.'; runAct('telescope', m, t); return; }
    if (kind === 'drums') playDrums();
    if (kind === 'sand') window.setTimeout(() => sc.current?.buildSandcastle(), 4800);
    if (!a || !sx) return;
    const pos = m ?? { x: sx.heroPos.x, z: sx.heroPos.z, y: 0, rot: sx.heroRot };
    sx.setPose(a.pose, pos); sx.bubble(a.bubble); tell(a.say);
    if (a.secs > 0) setActing({ kind, say: a.say, until: Date.now() + a.secs * 1000 });
    else setActing(null);
  };
  const runAct = (kind: string, m: { x: number; z: number; y: number; rot: number } | undefined, text: string) => {
    const a = ACT[kind]; const sx = sc.current; if (!a || !sx) return;
    const pos = m ?? { x: sx.heroPos.x, z: sx.heroPos.z, y: 0, rot: sx.heroRot };
    sx.setPose(a.pose, pos); sx.bubble(a.bubble); tell(text);
    setActing({ kind, say: text, until: Date.now() + Math.max(2, a.secs) * 1000 });
  };
  // навички
  const addSkill = (kind: string) => {
    const sk = SKILL_OF[kind]; if (!sk) return; const [id, xp] = sk; const s0 = saveRef.current; const old = s0.skills?.[id] ?? 0; const nv = old + xp;
    persist({ ...s0, skills: { ...(s0.skills ?? {}), [id]: nv } });
    const a = skillLevel(old).l, b = skillLevel(nv).l;
    if (b > a) { const n = SKILLS.find((x) => x.id === id)?.en ?? id; say(`Your ${n.toLowerCase()} skill is now level ${b}!`); flash(`${n} skill: level ${b}!`); void earn(2, `${n} level ${b}`); }
  };
  // звук: мелодії на піаніно й гітарі, барабани
  const ac = () => { if (!actx.current) actx.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)(); return actx.current; };
  const playNotes = (notes: number[], type: OscillatorType = 'triangle', step = 0.36) => {
    try { const c = ac(); const t0 = c.currentTime + 0.05; notes.forEach((n, i) => { if (!n) return; const o = c.createOscillator(); const g = c.createGain(); o.type = type; o.frequency.value = 440 * Math.pow(2, (n - 69) / 12); g.gain.setValueAtTime(0.0001, t0 + i * step); g.gain.exponentialRampToValueAtTime(0.25, t0 + i * step + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * step + step * 0.95); o.connect(g).connect(c.destination); o.start(t0 + i * step); o.stop(t0 + i * step + step); }); } catch { /* */ }
  };
  const playDrums = () => {
    try { const c = ac(); const t0 = c.currentTime + 0.05; for (let i = 0; i < 16; i++) { const t = t0 + i * 0.25; if (i % 2 === 0) { const o = c.createOscillator(); const g = c.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.15); g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2); o.connect(g).connect(c.destination); o.start(t); o.stop(t + 0.2); } if (i % 4 === 2) { const b = c.createBuffer(1, 4000, c.sampleRate); const d = b.getChannelData(0); for (let k = 0; k < d.length; k++) d[k] = (Math.random() * 2 - 1) * (1 - k / d.length); const sn = c.createBufferSource(); sn.buffer = b; const g = c.createGain(); g.gain.value = 0.3; sn.connect(g).connect(c.destination); sn.start(t); } } } catch { /* */ }
  };
  const pickChoice = (o: { t: string; say: string; text?: string }) => {
    if (!choose) return; const k = choose.kind;
    if (k === 'read' && o.text) { setBook({ t: o.t, text: o.text }); setPanel('book'); return; }
    setPanel(null);
    if (k === 'piano' && MELODIES[o.t]) playNotes(MELODIES[o.t]);
    if (k === 'music') playNotes([60, 64, 67, 72, 67, 64, 60, 0, 62, 65, 69, 74, 69, 65, 62], o.t === 'Rock' ? 'sawtooth' : o.t === 'Classical' ? 'sine' : 'triangle', 0.28);
    runAct(k, choose.m, o.say);
  };
  // словесна гра на комп'ютері
  const newWord = (n: number, right: number) => {
    const mine = words.filter((w) => w.en.split(' ').length <= 3);
    if (mine.length >= 4 && Math.random() < 0.5) { const w = mine[Math.floor(Math.random() * mine.length)]; const wrong = mine.filter((x) => x.en !== w.en).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.en); setWg({ q: `How do you say "${w.uk}" in English?`, a: w.en, opts: [w.en, ...wrong].sort(() => Math.random() - 0.5), n, right }); return; }
    const r = RIDDLES[Math.floor(Math.random() * RIDDLES.length)]; setWg({ q: r.q, a: r.a, opts: [r.a, ...r.wrong].sort(() => Math.random() - 0.5), n, right });
  };
  const answerWord = (o: string) => {
    if (!wg || wg.picked) return; const ok = o === wg.a; setWg({ ...wg, picked: o, right: wg.right + (ok ? 1 : 0) });
    if (ok) { sfx.coin(); addNeeds({ fun: 8 }); } else sfx.bad();
  };
  const endWordGame = () => { if (!wg) return; const r = wg.right; setPanel(null); addSkill('computer'); if (r > 0) void earn(Math.min(3, r), `Word game: ${r} / 5`); tell(`I played a word game and got ${r} out of 5!`); setWg(null); };
  // город
  const plots = (save.garden ?? [null, null, null]).concat([null, null, null]).slice(0, 3);
  useEffect(() => {
    if (!ready) return;
    const upd = () => sc.current?.setGarden((saveRef.current.garden ?? []).map((p) => (p ? { crop: p.crop, p: cropProgress(p) } : null)));
    upd(); const id = window.setInterval(upd, 10000); return () => window.clearInterval(id);
  }, [ready, save.garden, save.yard]);
  const gardenDo = (i: number, op: 'plant' | 'water' | 'harvest', crop?: string) => {
    const g = [...plots]; const p = g[i];
    if (op === 'plant' && crop) { g[i] = { crop, at: Date.now() }; tell(`I'm planting ${CROPS.find((c) => c.id === crop)?.en} seeds.`); sc.current?.bubble('Grow!'); }
    if (op === 'water' && p) { g[i] = { ...p, water: true }; tell("I'm watering the plants. Now they will grow faster!"); sc.current?.bubble('Splash!'); }
    if (op === 'harvest' && p) { g[i] = null; const b = { ...(saveRef.current.bag ?? {}) }; b[p.crop] = (b[p.crop] ?? 0) + 2; persist({ ...saveRef.current, garden: g, bag: b }); addSkill('garden'); sfx.coin(); tell(`I'm picking ${CROPS.find((c) => c.id === p.crop)?.en}. They are in my bag!`); return; }
    persist({ ...saveRef.current, garden: g }); addSkill('plant');
  };
  useEffect(() => {
    if (!acting) return;
    const t = window.setTimeout(() => {
      const a = ACT[acting.kind]; const sx = sc.current; if (!a) return;
      if (acting.kind === 'sleep') { if (clock.hour >= 20 || clock.hour < 6) { sx?.skipToMorning(); tell('Good morning! I slept very well.'); } else tell('That was a nice nap!'); setNeeds((n) => ({ ...n, energy: 100 })); }
      else { addNeeds({ food: a.food, energy: a.energy, fun: a.fun }); if (acting.kind === 'homework') void earn(1, 'Homework done!'); }
      addSkill(acting.kind);
      sx?.setPose(null); sx?.bubble(acting.kind === 'sleep' ? 'Good morning!' : 'Done!'); setActing(null);
    }, Math.max(0, acting.until - Date.now()));
    return () => window.clearTimeout(t);
  }, [acting]); // eslint-disable-line react-hooks/exhaustive-deps
  // потреби поволі зменшуються; сидіти = відпочинок, гойдалка = веселощі
  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(() => {
      const p = sc.current?.pose?.kind;
      setNeeds((n) => ({ food: clamp(n.food - 0.7), energy: clamp(n.energy - (p === 'sleep' ? 0 : 0.45) + (p === 'sit' ? 2.5 : 0)), fun: clamp(n.fun - 0.55 + (p === 'swing' ? 4 : 0)) }));
      const n = needsRef.current;
      const warn = (k: string, low: boolean, msg: string) => { if (low && !warned.current[k]) { warned.current[k] = true; flash(msg, false); sc.current?.bubble(k === 'food' ? 'I’m hungry!' : k === 'energy' ? 'So tired...' : 'I’m bored!'); } if (!low) warned.current[k] = false; };
      warn('food', n.food < 20, "I'm hungry! Open a fridge, cook something or buy food at the cafe.");
      warn('energy', n.energy < 20, "I'm tired! Sit down or sleep in a bed or a tent.");
      warn('fun', n.fun < 20, "I'm bored! Watch TV, play music, swing or swim.");
    }, 5000);
    return () => window.clearInterval(id);
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps
  const mood = (() => { const n = needs; if (n.food < 25) return 'Hungry'; if (n.energy < 25) return 'Tired'; if (n.fun < 25) return 'Bored'; const avg = (n.food + n.energy + n.fun) / 3; return avg > 70 ? 'Happy' : avg > 45 ? 'OK' : 'Grumpy'; })();
  const foodOf = (id: string) => { if (id.startsWith('dish:')) { const r = RECIPES.find((x) => `dish:${x.id}` === id); return r ? { en: r.en, a: '', food: r.food, fun: r.fun, c: r.c } : null; } const f = FOODS.find((x) => x.id === id); return f ? { en: f.en, a: f.a, food: f.food, fun: 0, c: f.c } : null; };
  const eat = (id: string, fromBag = false) => {
    const f = foodOf(id); if (!f) return;
    if (fromBag) { const b = { ...(saveRef.current.bag ?? {}) }; if (!b[id]) return; b[id] -= 1; if (!b[id]) delete b[id]; persist({ ...saveRef.current, bag: b }); }
    addNeeds({ food: f.food, fun: f.fun }); sfx.coin(); sc.current?.bubble('Yum!'); tell(`I'm eating ${f.a ? `${f.a} ${f.en}` : f.en}. Delicious!`);
  };
  const toBag = (id: string) => { const b = { ...(saveRef.current.bag ?? {}) }; b[id] = (b[id] ?? 0) + 1; persist({ ...saveRef.current, bag: b }); sfx.pick(); const f = foodOf(id); flash(`${f?.en ?? id} is in your bag now.`); };
  const buySnack = async (id: string, price: number) => { const f = foodOf(id); if (!f) return; if (await buy({ id: `snack-${id}-${Date.now()}`, price, en: f.en })) { const s0 = saveRef.current; persist({ ...s0, owned: s0.owned.filter((x) => !x.startsWith('snack-')), bag: { ...(s0.bag ?? {}), [id]: (s0.bag?.[id] ?? 0) + 1 } }); } };
  const cookIt = () => {
    const r = RECIPES.find((x) => x.id === recipe); if (!r) return;
    if ([...picked].sort().join('|') !== [...r.need].sort().join('|')) { sfx.bad(); const miss = r.need.filter((x) => !picked.includes(x)); flash(miss.length ? `You need ${miss.join(', ')}. Read the recipe again!` : 'Too many things! Take out what you don’t need.', false); return; }
    const sx = sc.current; if (sx) { sx.setPose('use', { x: sx.heroPos.x, z: sx.heroPos.z, y: 0, rot: sx.heroRot }); sx.bubble('Cooking...'); }
    tell(`I'm cooking ${r.en}. ${r.how}`); setPanel(null);
    window.setTimeout(() => { sc.current?.setPose(null); sc.current?.bubble('Ready!'); setDish(r.id); setPanel('cook'); const n = (saveRef.current.jobs.cook ?? 0) + 1; persist({ ...saveRef.current, jobs: { ...saveRef.current.jobs, cook: n } }); addSkill('cook'); if (n <= 20) void earn(1, `You cooked ${r.en}!`); }, 4000);
  };
  // дружба з котиками
  const npcName = npcI !== null ? sc.current?.npcName(npcI) ?? '' : '';
  const fp = save.friends?.[npcName] ?? 0; const fl = friendLevel(fp);
  const addFriend = (who: string, n: number, why: string) => {
    const s0 = saveRef.current; const before = friendLevel(s0.friends?.[who] ?? 0); const v = (s0.friends?.[who] ?? 0) + n; const after = friendLevel(v);
    persist({ ...s0, friends: { ...(s0.friends ?? {}), [who]: v } }); flash(why);
    if (after.i > before.i) { say(`${who} is your ${after.en.toLowerCase()} now!`); flash(`${who} is now your ${after.en}!`); void earn(3, `New level of friendship with ${who}`); }
  };
  const friendAct = (kind: 'dance' | 'five' | 'follow' | 'hug') => {
    if (npcI === null) return; const sx = sc.current; const who = npcName; const key = `${who}:${kind}`;
    if (kind === 'follow') { const on = sx?.toggleFollow(npcI); sx?.npcBubble(npcI, on ? 'Let’s go!' : 'See you!'); tell(on ? `${who} is walking with me.` : `${who} is going home.`); setPanel(null); return; }
    const wait = (cool.current[key] ?? 0) - Date.now(); if (wait > 0) { flash(`${who} wants to do something else now. Try again in ${Math.ceil(wait / 1000)} seconds.`, false); return; }
    cool.current[key] = Date.now() + 60000;
    if (kind === 'dance') { sx?.npcDance(npcI); sx?.dance(); sx?.npcBubble(npcI, 'Yeah!'); tell(`We're dancing together!`); addNeeds({ fun: 15 }); addFriend(who, 1, `${who} loves dancing with you!`); }
    addSkill('friend');
    if (kind === 'five') { sx?.npcBubble(npcI, 'High five!'); sx?.bubble('High five!'); tell('High five!'); addFriend(who, 1, `${who} gave you a high five!`); }
    if (kind === 'hug') { sx?.npcBubble(npcI, 'Aww!'); sx?.bubble('Hug!'); tell(`I'm giving ${who} a big hug.`); addNeeds({ fun: 10 }); addFriend(who, 1, `${who} is happy!`); }
    setPanel(null);
  };
  const socialOk = (kind: string) => { const key = `${npcName}:${kind}`; const wait = (cool.current[key] ?? 0) - Date.now(); if (wait > 0) { flash(`${npcName} wants to do something else now. Try again in ${Math.ceil(wait / 1000)} seconds.`, false); return false; } cool.current[key] = Date.now() + 60000; return true; };
  const tellJoke = () => { if (!socialOk('joke')) return; const j = JOKES[Math.floor(Math.random() * JOKES.length)]; setJoke({ ...j, shown: false }); say(j.q); setPanel('joke'); };
  const jokeDone = () => { if (!joke || npcI === null) return; setJoke({ ...joke, shown: true }); say(joke.a); sc.current?.npcBubble(npcI, 'Ha ha ha!'); addFriend(npcName, 1, `${npcName} is laughing!`); addSkill('friend'); addNeeds({ fun: 10 }); };
  const saySomethingNice = (c: string) => { if (npcI === null) return; say(c); sc.current?.bubble(c.length > 16 ? 'You are great!' : c); sc.current?.npcBubble(npcI, 'Thank you!'); addFriend(npcName, 1, `${npcName} smiles at you.`); addSkill('friend'); setPanel(null); };
  const playRps = (me: string) => { if (npcI === null) return; const them = RPS[Math.floor(Math.random() * 3)]; const win = (me === 'rock' && them === 'scissors') || (me === 'paper' && them === 'rock') || (me === 'scissors' && them === 'paper'); const res = me === them ? "It's a draw!" : win ? 'You win!' : `${npcName} wins!`; setRps({ me, them, res }); say(`Rock, paper, scissors! ${res}`); sc.current?.npcBubble(npcI, them[0].toUpperCase() + them.slice(1) + '!'); addNeeds({ fun: 8 }); if (!rps) { addFriend(npcName, 1, `You played a game with ${npcName}.`); addSkill('friend'); } };
  const petAct = (kind: 'pet' | 'feed' | 'ball') => { const sx = sc.current; if (!sx || !save.pet) return; const nm = save.petName || 'my pet'; sx.petTrick(); sx.bubble(kind === 'pet' ? 'Good boy!' : kind === 'feed' ? 'Yummy!' : 'Fetch!'); tell(kind === 'pet' ? `I'm stroking ${nm}. ${nm === 'my pet' ? 'It' : nm} looks so happy!` : kind === 'feed' ? `I'm feeding ${nm}.` : `I'm playing ball with ${nm}. Fetch!`); addNeeds({ fun: kind === 'ball' ? 20 : 10 }); setPanel(null); };
  const giveGift = (id: string) => {
    if (npcI === null) return; const f = foodOf(id); const b = { ...(saveRef.current.bag ?? {}) }; if (!b[id] || !f) return; b[id] -= 1; if (!b[id]) delete b[id];
    persist({ ...saveRef.current, bag: b }); sc.current?.npcBubble(npcI, 'Thank you!'); tell(`I'm giving ${npcName} ${f.a ? `${f.a} ${f.en}` : f.en}.`);
    setTimeout(() => addFriend(npcName, 2, `${npcName} loves your present!`), 50); setGiveMode(false); setPanel(null);
  };
  const emote = (id: string) => {
    const e = EMOTES.find((x) => x.id === id); const sx = sc.current; if (!e || !sx) return;
    sx.bubble(e.bubble); tell(e.say); net.current?.send('say', { text: e.bubble });
    if (id === 'dance') { sx.dance(); net.current?.send('dance', {}); }
    if (id === 'sit') sx.setPose('sit', { x: sx.heroPos.x, z: sx.heroPos.z, y: 0.12, rot: sx.heroRot });
    if (id === 'wave' || id === 'love') sx.jump();
    setPanel(null);
  };
  useEffect(() => { if (ready) sc.current?.setName(save.hero ?? ''); }, [ready, save.hero]);
  // ---- школа: урок з 5 питань ----
  const lessonQuestion = (n: number, right: number) => {
    const k = ['words', 'grammar', 'listen', 'grammar', 'words'][n];
    if (k === 'grammar') { const g = GRAMMAR[Math.floor(Math.random() * GRAMMAR.length)]; setLessonQ({ kind: k, q: 'Which sentence is correct?', a: g.right, opts: [g.right, ...g.wrong].sort(() => Math.random() - 0.5), n, right }); return; }
    if (k === 'listen') { const w = LISTEN_WORDS[Math.floor(Math.random() * LISTEN_WORDS.length)]; const o = [w, ...LISTEN_WORDS.filter((x) => x !== w).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5); setLessonQ({ kind: k, q: 'Listen and choose the word you hear.', a: w, opts: o, n, right, speak: w }); window.setTimeout(() => say(w), 300); return; }
    const mine = words.filter((w) => w.en.split(' ').length <= 3);
    if (mine.length >= 4 && Math.random() < 0.6) { const w = mine[Math.floor(Math.random() * mine.length)]; const wrong = mine.filter((x) => x.en !== w.en).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.en); setLessonQ({ kind: k, q: `How do you say "${w.uk}" in English?`, a: w.en, opts: [w.en, ...wrong].sort(() => Math.random() - 0.5), n, right }); return; }
    const r = RIDDLES[Math.floor(Math.random() * RIDDLES.length)]; setLessonQ({ kind: k, q: r.q, a: r.a, opts: [r.a, ...r.wrong].sort(() => Math.random() - 0.5), n, right });
  };
  const answerLesson = (o: string) => { if (!lessonQ || lessonQ.picked) return; const ok = o === lessonQ.a; setLessonQ({ ...lessonQ, picked: o, right: lessonQ.right + (ok ? 1 : 0) }); if (ok) { sfx.coin(); say('Well done!'); } else sfx.bad(); };
  const endLesson = () => { if (!lessonQ) return; const r = lessonQ.right; setPanel(null); setLessonQ(null); addSkill('read'); say(`Miss Apple says: ${r >= 4 ? 'Excellent work!' : r >= 2 ? 'Good job!' : 'Keep practising!'}`); done('school', Math.max(1, r), `School lesson: ${r} / 5`); };
  // ---- скарби й хованки: перевірка, чи котик поруч ----
  useEffect(() => {
    if (!treasure && !seek) return;
    const id = window.setInterval(() => {
      const sx = sc.current; if (!sx || sx.inside) return;
      if (treasure && !treasure.chest) { const st = treasure.steps[treasure.i]; if (Math.hypot(st.x - sx.heroPos.x, st.z - sx.heroPos.z) < 3) {
        if (treasure.i < treasure.steps.length - 1) { sfx.coin(); const nx = treasure.i + 1; setTreasure({ ...treasure, i: nx }); say(`You found clue ${nx}! ${treasure.steps[nx].text}`); flash(`Clue ${nx} found! Read the next clue.`); }
        else { setTreasure({ ...treasure, chest: true }); sx.setLost(st.x + 1.5, st.z, 'chest', '#8B5E34'); say('Look! A treasure chest! Open it!'); } } }
      if (seek) { const p = sx.npcPos(seek.i); if (p && Math.hypot(p.x - sx.heroPos.x, p.z - sx.heroPos.z) < 2.6) { sx.npcBubble(seek.i, 'You found me!'); say('You found me!'); addFriend(seek.name, 2, `You found ${seek.name}!`); addNeeds({ fun: 20 }); addSkill('friend'); setSeek(null); } }
    }, 500);
    return () => window.clearInterval(id);
  }, [treasure, seek]); // eslint-disable-line react-hooks/exhaustive-deps
  const startTreasure = () => { if (lost) { flash('Find the lost thing first!', false); return; } const steps = treasureHunt(); setTreasure({ steps, i: 0, chest: false }); setPanel(null); say(steps[0].text); tell(`Treasure hunt! ${steps[0].text}`); };
  const startSeek = () => { if (npcI === null) return; const pl = LOST_PLACES[Math.floor(Math.random() * LOST_PLACES.length)]; sc.current?.hideNpc(npcI, pl.x, pl.z); const text = `Ready or not! I'm hiding ${pl.en}. Come and find me!`; setSeek({ i: npcI, name: npcName, text }); say(text); setPanel(null); };
  // ---- фейерверки: у п'ятницю й суботу ввечері, іноді й в інші дні ----
  useEffect(() => {
    const sx = sc.current; if (!sx) return; const d = new Date(); const party = d.getDay() === 5 || d.getDay() === 6 || (d.getDate() % 3 === 0);
    const on = party && (clock.hour >= 20.5 || clock.hour < 2); if (on && !sx.fireworksOn) flash('Look up! Fireworks over the sea!'); sx.fireworksOn = on;
  }, [clock.hour]);
  // ---- гра по мережі ----
  const netId = useRef('');
  useEffect(() => {
    if (!ready || !isSignedIn) return;
    if (!netId.current) { try { netId.current = localStorage.getItem('murly-net-id') || ''; if (!netId.current) { netId.current = Math.random().toString(36).slice(2, 10); localStorage.setItem('murly-net-id', netId.current); } } catch { netId.current = Math.random().toString(36).slice(2, 10); } }
    const n = new IslandNet(netId.current, {
      onStatus: setNetOk,
      onPlayer: (p) => { if (muted.current.has(p.id)) return; sc.current?.upsertOther(p); setOnline((o) => ({ ...o, [p.id]: { ...p, last: Date.now() } })); },
      onLeave: (id) => { sc.current?.removeOther(id); setOnline((o) => { const c = { ...o }; delete c[id]; return c; }); },
      onSay: (id, text) => { if (muted.current.has(id)) return; sc.current?.otherSay(id, text); setOnline((o) => { const nm = o[id]?.n ?? 'Cat'; setChatLog((l) => [...l.slice(-19), { n: nm, t: text }]); return o; }); },
      onEvent: (id, ev, data) => {
        if (muted.current.has(id)) return;
        if (ev === 'hello') sendPos(true);
        if (ev === 'dance') sc.current?.otherDance(id);
        if (ev === 'chat') { const t = String(data.text ?? ''); const c = checkChat(t); if (!c.ok) return; sc.current?.otherSay(id, c.text); setChatLog((l) => [...l.slice(-29), { n: String(data.n ?? 'Cat'), t: c.text, mid: Number(data.mid ?? 0) }]); }
        if (ev === 'friendreq' && data.to === netId.current) { const nm = String(data.n ?? 'Cat'); setReqs((r) => (r.some((x) => x.id === id) ? r : [...r, { id, n: nm }])); flash(`${nm} wants to be your friend! Open Online to say yes.`); say(`${nm} wants to be your friend!`); }
        if (ev === 'friendok' && data.to === netId.current) { const nm = String(data.n ?? 'Cat'); addNetFriend(id, nm); flash(`${nm} is your friend now!`); }
      },
    });
    net.current = n;
    const clean = window.setInterval(() => setOnline((o) => { const c: typeof o = {}; Object.entries(o).forEach(([k, v]) => { if (Date.now() - v.last < 12000) c[k] = v; }); return c; }), 5000);
    return () => { n.close(); net.current = null; window.clearInterval(clean); };
  }, [ready, isSignedIn]); // eslint-disable-line react-hooks/exhaustive-deps
  const lastSent = useRef({ x: 0, z: 0, r: 0, t: 0 });
  const myName = () => (saveRef.current.hero || `Cat ${netId.current.slice(0, 3).toUpperCase()}`).slice(0, 14);
  const sendPos = (force = false) => {
    const sx = sc.current; const n = net.current; if (!sx || !n) return;
    const L = lastSent.current; const now = Date.now();
    const pos = { x: Math.round(sx.heroPos.x * 10) / 10, z: Math.round(sx.heroPos.z * 10) / 10, r: Math.round(sx.heroRot * 100) / 100 };
    if (!force && Math.abs(pos.x - L.x) + Math.abs(pos.z - L.z) + Math.abs(pos.r - L.r) < 0.05 && now - L.t < 3000) return;
    lastSent.current = { ...pos, t: now };
    const s0 = saveRef.current; const pr = PROFS.find((p) => p.id === s0.prof);
    n.send('pos', { n: myName(), ...pos, room: sx.inside ? sx.roomId : null, o: s0.outfit as unknown as Record<string, string>, ride: sx.boating ? null : sx.rideId, prof: pr?.en ?? '', lv: pr ? profLevel(s0.jobs[pr.job] ?? 0).en : '' });
  };
  useEffect(() => { if (!netOk) return; const id = window.setInterval(() => sendPos(), 200); return () => window.clearInterval(id); }, [netOk]); // eslint-disable-line react-hooks/exhaustive-deps
  const sayNet = (text: string) => { net.current?.send('say', { text }); sc.current?.bubble(text.length > 18 ? text.slice(0, 17) + '…' : text, 3); setChatLog((l) => [...l.slice(-19), { n: myName(), t: text, me: true }]); say(text); };
  const sendChat = async () => {
    const t = chatText.trim(); if (!t) return;
    const c = checkChat(t); if (!c.ok) { setChatErr(FILTER_MSG[c.reason]); sfx.bad(); return; }
    setChatErr('');
    const r = await fetch('/api/island-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: c.text, name: myName(), id: netId.current }) }).catch(() => null);
    const d = r ? await r.json().catch(() => ({})) : {};
    if (!d.ok) { setChatErr(d.reason === 'slow' ? 'Slow down a little! Wait a few seconds.' : FILTER_MSG[d.reason as keyof typeof FILTER_MSG] ?? 'The message was not sent.'); sfx.bad(); return; }
    setChatText(''); sc.current?.bubble(c.text.length > 18 ? c.text.slice(0, 17) + '…' : c.text, 3); setChatLog((l) => [...l.slice(-29), { n: myName(), t: c.text, me: true, mid: d.msg?.mid }]);
  };
  const reportMsg = (mid?: number) => { if (!mid) return; void fetch('/api/island-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'report', msg: mid }) }); flash('Thank you! A teacher will check this message.'); };
  useEffect(() => { if (panel !== 'chat' || chatLog.length) return; fetch('/api/island-chat').then((r) => r.json()).then((d) => { const m = (d.messages ?? []) as { mid: number; n: string; text: string }[]; if (m.length) setChatLog(m.map((x) => ({ n: x.n, t: x.text, mid: x.mid }))); }).catch(() => {}); }, [panel]); // eslint-disable-line react-hooks/exhaustive-deps
  const addNetFriend = (id: string, n: string) => { const s0 = saveRef.current; const nf = { ...((s0 as unknown as { netFriends?: Record<string, string> }).netFriends ?? {}), [id]: n }; persist({ ...s0, netFriends: nf } as Save); };
  const netFriends = ((save as unknown as { netFriends?: Record<string, string> }).netFriends ?? {});
  const onlineList = Object.values(online).filter((p) => !muted.current.has(p.id));
  // ---- дім всередині ----
  const furnOwned = FURN_ALL.filter((f) => save.owned.includes(`furn-${f.f}`));
  const room = save.room ?? [];
  const unplaced = furnOwned.filter((f) => !room.some((r) => r.f === f.f));
  onPlaceRef.current = (x, z) => {
    const f = decor.placing; if (!f) return;
    sfx.pick(); persist({ ...saveRef.current, room: [...(saveRef.current.room ?? []), { f, x: Math.round(x * 4) / 4, z: Math.round(z * 4) / 4, r: 0 }] });
    setDecor({ on: true, placing: null, picked: null });
  };
  onPickRef.current = (i) => { sfx.pick(); setDecor({ on: true, placing: null, picked: i }); };
  useEffect(() => { sc.current?.setDecor(decor.on, decor.placing); }, [decor]);
  useEffect(() => { if (sc.current) { sc.current.portrait = panel === 'style'; sc.current.portraitShift = window.innerWidth < 640 ? 0 : 1.2; } }, [panel]);
  // мініатюри для відкритої вкладки
  useEffect(() => {
    if (panel === 'store') wantThumbs(tab === 'Clothes' ? [...FUR.map((f) => f.id), ...SHOP.filter((x) => x.cat === 'Clothes').map((x) => x.id)] : SHOP.filter((x) => x.cat === tab).map((x) => x.id));
    if (panel === 'store' && tab === 'Furniture' && fcat === 'special') wantThumbs(FURN_ALL.filter((f) => f.f.startsWith('x-')).map((f) => f.f));
    if (decor.on) wantThumbs(FURN_ALL.filter((f) => f.f.startsWith('x-')).map((f) => f.f));
    if (panel === 'home') wantThumbs(SHOP.filter((x) => save.owned.includes(x.id)).map((x) => x.id));
    if (panel === 'style') wantThumbs(stab === 'acc' ? SHOP.filter((x) => x.cat === 'Clothes').map((x) => x.id) : stab === 'fur' ? FUR.map((f) => f.id) : STYLE.filter((x) => x.part === stab).map((x) => x.id));
  }, [panel, tab, stab, fcat, decor.on]); // eslint-disable-line react-hooks/exhaustive-deps
  // ---- де зупинився: позиція, кімната, завдання ----
  const placeName = () => {
    const sx = sc.current; if (!sx) return '';
    if (sx.inside) return sx.roomId === 'home' ? 'at home' : `in the ${sx.roomId === 'house' ? 'house of Grandma Rose' : sx.roomId}`;
    let best = DESTS[0], bd = 1e9; DESTS.forEach((d) => { const k = Math.hypot(d.x - sx.heroPos.x, d.z - sx.heroPos.z); if (k < bd) { bd = k; best = d; } });
    return `near ${best.name}`;
  };
  const doingText = () => delivery ? `delivering a parcel to ${delivery.addr.no} ${delivery.addr.street}` : taxi?.driving ? `driving a passenger to ${taxi.dest.name}` : lost ? `looking for a ${lost.thing.en}` : errand ? `helping Grandma Rose: ${errand.item}` : '';
  const snapRef = useRef<() => Save>(() => saveRef.current);
  snapRef.current = () => {
    const sx = sc.current; const s = saveRef.current; if (!sx) return s;
    const pos = sx.inside ? { x: sx.outPos.x, z: sx.outPos.z, room: sx.roomId } : { x: sx.heroPos.x, z: sx.heroPos.z, room: null };
    return { ...s, needs: needsRef.current, pos, tasks: { delivery: delivery ? { a: delivery.addr.id, text: delivery.text } : null, lost: lost ? { ...lost } : null, errand: errand ?? null }, last: { at: new Date().toISOString(), place: placeName(), doing: doingText() } };
  };
  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(() => { if (restored.current) persist(snapRef.current()); }, 15000);
    const bye = () => { if (!restored.current) return; const s = snapRef.current(); try { localStorage.setItem(LS, JSON.stringify(s)); } catch { /* */ } if (isSignedIn) navigator.sendBeacon?.('/api/game', new Blob([JSON.stringify({ game: 'island', data: s })], { type: 'application/json' })); };
    window.addEventListener('pagehide', bye); return () => { window.clearInterval(id); window.removeEventListener('pagehide', bye); };
  }, [ready, isSignedIn, persist]);
  // відновити, де учень зупинився
  useEffect(() => {
    if (!ready || restored.current || !isLoaded) return;
    const t = window.setTimeout(() => {
      const s = saveRef.current; const sx = sc.current; restored.current = true; if (!sx) return;
      if (s.pos && Math.hypot(s.pos.x, s.pos.z) < 90) { sx.setHeroPos(s.pos.x, s.pos.z); if (s.pos.room) { sx.enterRoom(s.pos.room); setInside(s.pos.room); } }
      const tk = (s.tasks ?? {}) as { delivery?: { a: string; text: string } | null; lost?: (LostTask & { found: boolean }) | null; errand?: (ReturnType<typeof errandTask> & { stage: 'get' | 'bring' }) | null };
      if (tk.delivery) { const a = ADDRS.find((x) => x.id === tk.delivery!.a); if (a) { setDelivery({ addr: a, text: tk.delivery.text, at: Date.now(), hint: true }); sx.setCarry(true); } }
      if (tk.lost) { setLost(tk.lost); if (!tk.lost.found) sx.setLost(tk.lost.place.x, tk.lost.place.z, tk.lost.thing.id, tk.lost.thing.c); }
      if (tk.errand) setErrand(tk.errand);
      if (s.needs) setNeeds(s.needs);
      if (s.last?.place) flash(`Welcome back! You were ${s.last.place}.`);
    }, 1500);
    return () => window.clearTimeout(t);
  }, [ready, isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps
  const roomEdit = (op: 'turn' | 'move' | 'away') => {
    const i = decor.picked; if (i === null) return; const list = [...room]; const it = list[i]; if (!it) return;
    if (op === 'turn') { list[i] = { ...it, r: (it.r + Math.PI / 2) % (Math.PI * 2) }; persist({ ...saveRef.current, room: list }); return; }
    list.splice(i, 1); persist({ ...saveRef.current, room: list });
    setDecor({ on: true, placing: op === 'move' ? it.f : null, picked: null });
  };
  const furnName = (f: string) => FURN_ALL.find((x) => x.f === f)?.en ?? f;

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

  const nearText = near ? (near.id === 'boat' ? 'Take a boat' : near.id === 'boat-dock' ? 'Back to the pier' : near.id === 'school' ? 'Have a lesson with Miss Apple' : near.id.startsWith('use:') ? (sc.current?.pose ? 'Stand up' : near.label) : near.id === 'enter-tent' ? 'Go into the tent' : near.id === 'campbook' ? 'Read the camp book' : near.id === 'taxi-drop' ? `Drop off at ${near.label}` : near.id === 'room-exit' ? 'Go outside' : near.id === 'pier' ? 'Go fishing' : near.id === 'icecream' ? 'Sell ice cream' : near.id === 'board' ? (lost?.found ? 'Give back the lost thing' : 'Read the notice board') : errand?.stage === 'get' && near.id === errand.at ? `Get ${errand.item}` : near.id.startsWith('enter-') ? `Go into the ${near.label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}` : inside && !near.id.startsWith('npc-') ? `Talk to ${near.label}` : near.id.startsWith('door-') && !delivery ? `Visit number ${near.label}` : near.id === 'home' && save.house > 0 ? 'Go inside my home' : near.id.startsWith('npc-') ? `Talk to ${near.label}` : near.id.startsWith('door-') ? `Deliver to ${near.label}` : near.id === 'home' ? 'My home' : `Enter: ${near.label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}`) : '';
  const furOwned = FUR.filter((f) => save.owned.includes(f.id) || f.price === 0);

  return (
    <div className={`il ${touch ? 'is-touch' : ''}`}>
      <div className="il-canvas" ref={box} />
      {!ready && <div className="il-load">Loading the island…</div>}

      <div className="il-hud">
        <Link href="/games" className="il-chip">← Games</Link>
        <span className="il-coins" title="Murly coins"><i className="il-coin" /> {coins ?? '…'}</span>
        <span className="il-chip il-stars" title="Stars found"><i className="il-star" /> {starCount}/10</span>
        <span className="il-chip" title="Time and weather">{fmtHour(clock.hour)} · {clock.rain ? (sc.current?.winter ? 'snowy' : 'rainy') : clock.hour >= 20 || clock.hour < 6 ? 'clear night' : 'sunny'}</span>
        <button type="button" className={`il-chip ${dailyDone === 3 ? 'il-chip--y' : ''}`} onClick={() => setPanel('today')}>Today {dailyDone}/3</button>
        {guest && <Link href="/sign-in?redirect_url=/play/island" className="il-chip il-chip--y">Sign in to use your Murly coins</Link>}
      </div>
      <div className="il-hud il-hud--r">
        <button type="button" className="il-chip" onClick={() => setPanel('jobs')}>Map</button>
        <button type="button" className="il-chip" onClick={() => setPanel('store')}>Shop</button>
        <button type="button" className="il-chip" onClick={() => setPanel('home')}>My stuff</button>
        <button type="button" className="il-chip il-chip--y" onClick={() => setPanel('style')}>My look</button>
        <button type="button" className="il-chip" onClick={() => { setGiveMode(false); setPanel('bag'); }}>Bag</button>
        <button type="button" className="il-chip" onClick={() => setPanel('acts')}>Actions</button>
        {isSignedIn && <button type="button" className={`il-chip ${reqs.length ? 'il-chip--y' : ''}`} onClick={() => setPanel('online')}><i className={`il-dot-on ${netOk ? 'on' : ''}`} />Online {onlineList.length}</button>}
        {isSignedIn && <button type="button" className="il-chip" onClick={() => setPanel('chat')}>Chat</button>}
        <button type="button" className="il-chip" onClick={() => setPanel('career')}>{PROFS.find((p) => p.id === save.prof)?.en ?? 'Choose a job'}</button>
        {inside ? <>
          {inside === 'home' && <button type="button" className={`il-chip ${decor.on ? 'il-chip--y' : ''}`} onClick={() => setDecor(decor.on ? { on: false, placing: null, picked: null } : { on: true, placing: null, picked: null })}>{decor.on ? 'Done' : 'Decorate'}</button>}
          <button type="button" className="il-chip" onClick={() => { sc.current?.exitHome(); setInside(null); setDecor({ on: false, placing: null, picked: null }); }}>Go outside</button>
        </> : <button type="button" className="il-chip" onClick={() => { sc.current?.teleportHome(); }}>Go home</button>}
        <button type="button" className="il-chip" onClick={() => setPanel('help')}>?</button>
      </div>

      <div className="il-needs" title="How your cat feels">
        <b>{mood}</b>
        {([['food', 'Food', '#F5862D'], ['energy', 'Energy', '#3E7BFA'], ['fun', 'Fun', '#F76AA8']] as const).map(([k, l, c]) => <div key={k}><span>{l}</span><i><em style={{ width: `${needs[k]}%`, background: needs[k] < 25 ? '#E5484D' : c }} /></i></div>)}
      </div>
      {caption && !panel && <div className="il-caption">{caption} <button type="button" className="il-mini" onClick={() => say(caption)}>Listen</button>{acting && <span className="il-acting" />}<button type="button" className="il-mini" onClick={() => { setCaption(null); if (sc.current?.pose) sc.current.setPose(null); setActing(null); }}>OK</button></div>}
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
              <div className="il-tray-row">{unplaced.map((f) => <button key={f.f} type="button" className="il-tray-it" onClick={() => setDecor({ on: true, placing: f.f, picked: null })}><img src={f.f.startsWith('x-') ? thumbs[f.f] ?? '' : `/worlds/kenney/t/${f.f}.png`} alt="" />{f.en}</button>)}</div>
              {!furnOwned.length && <button type="button" className="il-mini" onClick={() => { setTab('Furniture'); setPanel('store'); }}>Open the shop</button>}
            </>}
        </div>
      )}
      {chatLog.length > 0 && !panel && <div className="il-chatlog">{chatLog.slice(-5).map((m, i) => <div key={i} className={m.me ? 'me' : ''}><b>{m.n}:</b> {m.t}</div>)}</div>}
      {!panel && (treasure || seek || boating) && <div className="il-tasks il-tasks--low">
        {treasure && <div className="il-task"><b>Treasure hunt:</b> {treasure.chest ? 'Open the treasure chest!' : `Clue ${treasure.i + 1}/3: ${treasure.steps[treasure.i].text}`} <button type="button" className="il-mini" onClick={() => say(treasure.steps[treasure.i].text)}>Listen</button></div>}
        {seek && <div className="il-task"><b>Hide and seek:</b> {seek.name} says: &ldquo;{seek.text}&rdquo;</div>}
        {boating && <div className="il-task"><b>Boat:</b> sail around the island. Come back to the pier and press the yellow button to get off.</div>}
      </div>}
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

      {panel === 'style' && (
        <div className="il-side">
          <button type="button" className="il-x" onClick={() => setPanel(null)} aria-label="Close">✕</button>
          <h2>My look</h2>
          <p className="il-note">You have <b>{coins ?? 0}</b> coins. Basic things are free.</p>
          <label className="il-name">My cat&apos;s name <input maxLength={14} value={save.hero ?? ''} placeholder="Type a name" onChange={(e) => setSave({ ...save, hero: e.target.value.replace(/[^\p{L}\p{N} '-]/gu, '') })} onBlur={() => persist({ ...saveRef.current })} /></label>
          <div className="il-tabs">{([['hair', 'Hair'], ['top', 'Tops'], ['bottom', 'Trousers'], ['shoes', 'Shoes'], ['hold', 'In my paw'], ['acc', 'Hats & more'], ['fur', 'Fur']] as [typeof stab, string][]).map(([k, l]) => <button key={k} type="button" className={stab === k ? 'on' : ''} onClick={() => setStab(k)}>{l}</button>)}</div>
          {colourKey[stab] && <div className="il-swatches">{(stab === 'hair' ? HAIR_COLOURS : STYLE_COLOURS).map((c) => <button key={c} type="button" aria-label={c} className={save.outfit[colourKey[stab]] === c ? 'on' : ''} style={{ background: c }} onClick={() => persist({ ...saveRef.current, outfit: { ...saveRef.current.outfit, [colourKey[stab]]: c } })} />)}</div>}
          <div className="il-shop il-shop--side">
            {stab !== 'acc' && stab !== 'fur' && STYLE.filter((x) => x.part === stab).map((it) => { const on = (save.outfit as Record<string, string | undefined>)[it.part] === it.id || (!(save.outfit as Record<string, string | undefined>)[it.part] && it.id.endsWith('-none')); return (
              <div key={it.id} className={`il-item ${on ? 'on' : ''}`}>{thumbs[it.id] ? <img className="il-thumb" src={thumbs[it.id]} alt="" /> : <i className="il-thumb-wait" />}<span>{it.en}</span>
                {styleOwned(it.id) ? <button type="button" onClick={() => wearStyle(it.id)}>{on ? 'Wearing' : 'Wear'}</button>
                  : <button type="button" className="buy" onClick={async () => { if (await buy({ id: it.id, price: it.price, en: it.en })) wearStyle(it.id); }}><i className="il-coin" /> {it.price}</button>}
              </div>); })}
            {stab === 'acc' && SHOP.filter((x) => x.cat === 'Clothes').map((it) => (
              <div key={it.id} className={`il-item ${worn(it) ? 'on' : ''}`}>{thumbs[it.id] ? <img className="il-thumb" src={thumbs[it.id]} alt="" /> : <i className="il-thumb-wait" />}<span>{it.en}</span>
                {owned(it.id) ? <button type="button" onClick={() => equip(it)}>{worn(it) ? 'Take off' : 'Wear'}</button> : <button type="button" className="buy" onClick={() => onBuy(it)}><i className="il-coin" /> {it.price}</button>}
              </div>))}
            {stab === 'fur' && FUR.map((f) => (
              <div key={f.id} className={`il-item ${save.outfit.fur === f.id ? 'on' : ''}`}>{thumbs[f.id] ? <img className="il-thumb" src={thumbs[f.id]} alt="" /> : <i style={{ background: f.color }} />}<span>{f.en}</span>
                {owned(f.id) || !f.price ? <button type="button" onClick={() => persist({ ...save, outfit: { ...save.outfit, fur: f.id } })}>{save.outfit.fur === f.id ? 'Wearing' : 'Wear'}</button>
                  : <button type="button" className="buy" onClick={async () => { if (await buy(f)) persist({ ...saveRef.current, outfit: { ...saveRef.current.outfit, fur: f.id } }); }}><i className="il-coin" /> {f.price}</button>}
              </div>))}
          </div>
        </div>
      )}
      {panel && panel !== 'style' && (
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
                <li><b>Play together:</b> press Online to see other Murly students on the island. Say hi, chat with ready English phrases, make friends and play together.</li>
                <li><b>Live like a real cat:</b> watch Food, Energy and Fun. Sit on chairs, sleep in beds and tents, open fridges, cook from recipes, watch TV, read, swim and swing. Make friends with the cats: talk, give presents, dance and walk together.</li>
                <li><b>Your cat:</b> press My look to choose hair, clothes, shoes and something to hold. Press Choose a job to pick your profession.</li>
                <li><b>Talk:</b> every cat on the island has their own stories. Choose your answers and make friends!</li>
                <li><b>Saving:</b> the game remembers where you stopped.</li>
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
              <div className="il-snacks"><span>Buy a snack for your bag:</span><button type="button" onClick={() => buySnack('sandwich', 2)}>sandwich <i className="il-coin" /> 2</button><button type="button" onClick={() => buySnack('cookie', 1)}>cookie <i className="il-coin" /> 1</button><button type="button" onClick={() => buySnack('juice', 1)}>orange juice <i className="il-coin" /> 1</button></div>
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
              <div className="il-snacks"><span>Buy a snack for your bag:</span><button type="button" onClick={() => buySnack('apple', 1)}>apple <i className="il-coin" /> 1</button><button type="button" onClick={() => buySnack('banana', 1)}>banana <i className="il-coin" /> 1</button><button type="button" onClick={() => buySnack('carrot', 1)}>carrot <i className="il-coin" /> 1</button></div>
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
              <div className="il-snacks"><span>Buy a snack for your bag:</span><button type="button" onClick={() => buySnack('cake', 2)}>slice of cake <i className="il-coin" /> 2</button><button type="button" onClick={() => buySnack('cookie', 1)}>cookie <i className="il-coin" /> 1</button></div>
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
              <button type="button" className="il-mini" onClick={() => setPanel('style')}>Shop for my own clothes</button>
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

            {panel === 'board' && !lost && <>
              <h2>Notice board</h2>
              <div className="il-grid il-grid--col">
                <button type="button" className="il-pick" onClick={() => { const l = lostTask(); setLost({ ...l, found: false }); sc.current?.setLost(l.place.x, l.place.z, l.thing.id, l.thing.c); say(l.text); }}>Help someone find a lost thing</button>
                <button type="button" className="il-pick" onClick={startTreasure} disabled={!!treasure}>{treasure ? 'You are on a treasure hunt' : 'Start a treasure hunt'}</button>
              </div>
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

            {panel === 'choose' && choose && <>
              <h2>{choose.kind === 'tv' ? 'What do you want to watch?' : choose.kind === 'read' ? 'Choose a book' : choose.kind === 'music' ? 'What music do you like?' : choose.kind === 'paint' ? 'What do you want to paint?' : 'Choose a song'}</h2>
              <div className="il-grid il-grid--col">{CHOICES[choose.kind].map((o) => <button key={o.t} type="button" className="il-pick" onClick={() => pickChoice(o)}>{o.t}</button>)}</div>
            </>}

            {panel === 'book' && book && <>
              <h2>{book.t}</h2>
              <div className="il-note-paper il-book">{book.text} <button type="button" className="il-mini" onClick={() => say(book.text)}>Listen</button></div>
              <button type="button" className="il-go" onClick={() => { setPanel(null); runAct('read', choose?.m, `I'm reading "${book.t}". It's a great book!`); }}>I finished reading</button>
            </>}

            {panel === 'wordgame' && wg && <>
              <h2>Word game {wg.n + 1} / 5</h2>
              <p className="il-say">{wg.q}</p>
              <div className="il-grid il-grid--col">{wg.opts.map((o) => <button key={o} type="button" className={`il-pick ${wg.picked ? (o === wg.a ? 'on' : o === wg.picked ? 'bad' : '') : ''}`} onClick={() => answerWord(o)}>{o}</button>)}</div>
              {wg.picked && (wg.n < 4 ? <button type="button" className="il-go" onClick={() => newWord(wg.n + 1, wg.right)}>Next</button> : <button type="button" className="il-go" onClick={endWordGame}>Finish: {wg.right} / 5</button>)}
            </>}

            {panel === 'garden' && <>
              <h2>My vegetable garden</h2>
              <p className="il-note">Plant seeds, water them and wait. Watered plants grow faster. Then pick the vegetables and eat them or give them as presents.</p>
              <div className="il-plots">{plots.map((p, i) => { const pr = p ? cropProgress(p) : 0; const c = p ? CROPS.find((x) => x.id === p.crop) : null; return (
                <div key={i}><b>Bed {i + 1}</b>
                  {!p ? <><span>Empty. Plant:</span><div className="il-grid">{CROPS.map((cr) => <button key={cr.id} type="button" className="il-pick" onClick={() => gardenDo(i, 'plant', cr.id)}><i className="il-dot" style={{ background: cr.c }} />{cr.en}</button>)}</div></>
                    : <><span>{c?.en}: {pr >= 1 ? 'ready!' : `${Math.round(pr * 100)}%`}{p.water ? ' (watered)' : ''}</span><span className="il-bar"><i style={{ width: `${pr * 100}%` }} /></span>
                      {pr >= 1 ? <button type="button" className="il-go" onClick={() => gardenDo(i, 'harvest')}>Pick them</button> : !p.water && <button type="button" className="il-mini" onClick={() => gardenDo(i, 'water')}>Water</button>}</>}
                </div>); })}</div>
            </>}

            {panel === 'skills' && <>
              <h2>My skills</h2>
              <p className="il-note">Every activity makes your cat better at something. Each new level gives you 2 coins.</p>
              <div className="il-profs">{SKILLS.map((k) => { const xp = save.skills?.[k.id] ?? 0; const lv = skillLevel(xp); return (
                <div key={k.id}><b>{k.en}</b><span className="il-lv">Level {lv.l}</span><span className="il-bar"><i style={{ width: `${Math.min(100, ((xp - lv.from) / Math.max(1, lv.to - lv.from)) * 100)}%` }} /></span></div>); })}</div>
            </>}

            {panel === 'joke' && joke && <>
              <h2>Tell a joke</h2>
              <p className="il-say">&ldquo;{joke.q}&rdquo; <button type="button" className="il-mini" onClick={() => say(joke.q)}>Listen</button></p>
              {joke.shown ? <><p className="il-me">{joke.a}</p><p className="il-note">{npcName} is laughing! Ha ha ha!</p><button type="button" className="il-go" onClick={() => setPanel(null)}>Bye!</button></>
                : <button type="button" className="il-go" onClick={jokeDone}>Tell the answer</button>}
            </>}

            {panel === 'nice' && <>
              <h2>Say something nice to {npcName}</h2>
              <div className="il-grid il-grid--col">{COMPLIMENTS.map((c) => <button key={c} type="button" className="il-pick" onClick={() => saySomethingNice(c)}>{c}</button>)}</div>
            </>}

            {panel === 'rps' && <>
              <h2>Rock, paper, scissors</h2>
              <p className="il-note">Rock beats scissors. Scissors beat paper. Paper beats rock.</p>
              <div className="il-grid">{RPS.map((r) => <button key={r} type="button" className="il-pick" onClick={() => playRps(r)}>{r}</button>)}</div>
              {rps && <p className="il-say">You: {rps.me}. {npcName}: {rps.them}. <b>{rps.res}</b></p>}
            </>}

            {panel === 'school' && <>
              <h2>Miss Apple&apos;s lesson</h2>
              {!lessonQ ? <>
                <p className="il-say">&ldquo;Hello, class! Today we have five questions: words, grammar and listening. Are you ready?&rdquo;</p>
                <button type="button" className="il-go" onClick={() => lessonQuestion(0, 0)}>Start the lesson</button>
              </> : <>
                <p className="il-note">Question {lessonQ.n + 1} / 5 · {lessonQ.kind === 'grammar' ? 'Grammar' : lessonQ.kind === 'listen' ? 'Listening' : 'Words'}</p>
                <p className="il-say">{lessonQ.q} {lessonQ.speak && <button type="button" className="il-mini" onClick={() => say(lessonQ.speak!)}>Listen again</button>}</p>
                <div className="il-grid il-grid--col">{lessonQ.opts.map((o) => <button key={o} type="button" className={`il-pick ${lessonQ.picked ? (o === lessonQ.a ? 'on' : o === lessonQ.picked ? 'bad' : '') : ''}`} onClick={() => answerLesson(o)}>{o}</button>)}</div>
                {lessonQ.picked && (lessonQ.n < 4 ? <button type="button" className="il-go" onClick={() => lessonQuestion(lessonQ.n + 1, lessonQ.right)}>Next question</button> : <button type="button" className="il-go" onClick={endLesson}>Finish: {lessonQ.right} / 5</button>)}
              </>}
            </>}

            {panel === 'online' && <>
              <h2>Players on the island</h2>
              <p className="il-note">{netOk ? `You are online as ${myName()}. ` : 'Connecting… '}Chat uses ready English phrases. Never tell anyone your real name, school or address.</p>
              {reqs.length > 0 && <><p className="il-sub">Friend requests</p>{reqs.map((r) => <div key={r.id} className="il-player"><b>{r.n}</b> wants to be your friend.
                <button type="button" className="il-mini" onClick={() => { addNetFriend(r.id, r.n); net.current?.send('friendok', { to: r.id, n: myName() }); setReqs((x) => x.filter((y) => y.id !== r.id)); flash(`${r.n} is your friend now!`); }}>Yes!</button>
                <button type="button" className="il-mini" onClick={() => setReqs((x) => x.filter((y) => y.id !== r.id))}>No, thanks</button></div>)}</>}
              {!onlineList.length && <p className="il-note">Nobody else is here right now. Ask your friends from Murly to join you!</p>}
              {onlineList.map((p) => <div key={p.id} className="il-player">
                <b>{p.n}</b>{netFriends[p.id] && <span className="il-badge-f">friend</span>} <span className="t-muted">{p.prof ? `${p.lv} ${p.prof}` : 'Explorer'}{p.room ? ` · in the ${p.room}` : ''}</span>
                <div className="il-grid">
                  <button type="button" className="il-mini" onClick={() => { sayNet(`Hi, ${p.n}!`); }}>Say hi</button>
                  <button type="button" className="il-mini" onClick={() => { if (!p.room && !sc.current?.inside) { sc.current?.walkTo(p.x, p.z); sc.current?.setMarker(p.x, p.z); } else flash(`${p.n} is inside a building. Go there to meet!`, false); setPanel(null); }}>Go to {p.n}</button>
                  {!netFriends[p.id] && <button type="button" className="il-mini" onClick={() => { net.current?.send('friendreq', { to: p.id, n: myName() }); flash(`You asked ${p.n} to be friends.`); }}>Be friends</button>}
                  <button type="button" className="il-mini" onClick={() => { muted.current.add(p.id); sc.current?.removeOther(p.id); setOnline((o) => { const c = { ...o }; delete c[p.id]; return c; }); }}>Hide</button>
                </div></div>)}
              {Object.keys(netFriends).length > 0 && <><p className="il-sub">My island friends</p><p className="il-note">{Object.values(netFriends).join(', ')}</p></>}
            </>}

            {panel === 'chat' && <>
              <h2>Island chat</h2>
              <div className="il-chatbox">{chatLog.slice(-30).map((m, i) => <div key={i} className={m.me ? 'me' : ''}><b>{m.n}:</b> {m.t}{!m.me && m.mid ? <button type="button" className="il-report" title="Report this message" onClick={() => reportMsg(m.mid)}>Report</button> : null}</div>)}{!chatLog.length && <span className="t-muted">No messages yet. Say hello!</span>}</div>
              <form className="il-chatform" onSubmit={(e) => { e.preventDefault(); void sendChat(); }}>
                <input value={chatText} maxLength={120} placeholder="Write in English…" onChange={(e) => { setChatText(e.target.value); setChatErr(''); }} />
                <button type="submit" className="il-go">Send</button>
              </form>
              {chatErr && <p className="il-chaterr">{chatErr}</p>}
              <p className="il-note">Write only in English. Be kind. Never share your real name, phone, address, school or social media. Rude messages are blocked.</p>
              <p className="il-sub">Or choose a ready phrase</p>
              <div className="il-tabs il-tabs--sm">{CHAT.map((c) => <button key={c.cat} type="button" className={chatCat === c.cat ? 'on' : ''} onClick={() => setChatCat(c.cat)}>{c.cat}</button>)}</div>
              <div className="il-grid">{CHAT.find((c) => c.cat === chatCat)!.items.map((t) => <button key={t} type="button" className="il-pick" onClick={() => { sayNet(t); setPanel(null); }}>{t}</button>)}</div>
            </>}

            {panel === 'fridge' && <>
              <h2>The fridge</h2>
              <p className="il-note">Choose something to eat now or take it in your bag.</p>
              <div className="il-shop">{FRIDGE.map((id) => { const f = FOODS.find((x) => x.id === id)!; return (
                <div key={id} className="il-item"><i className="il-food" style={{ background: f.c }} /><span>{f.a} {f.en}</span>
                  <button type="button" onClick={() => { eat(id); setPanel(null); }}>Eat</button><button type="button" onClick={() => toBag(id)}>Take</button></div>); })}</div>
            </>}

            {panel === 'cook' && <>
              <h2>Let&apos;s cook!</h2>
              {dish ? (() => { const r = RECIPES.find((x) => x.id === dish)!; return <>
                <div className="il-catch"><span className="il-dish" style={{ background: r.c }} /><b>Your {r.en.replace(/^an? /, '')} {r.id === 'pancakes' ? 'are' : 'is'} ready!</b></div>
                <button type="button" className="il-go" onClick={() => { eat(`dish:${r.id}`); setDish(null); setPanel(null); }}>Eat it now</button>
                <button type="button" className="il-mini" onClick={() => { toBag(`dish:${r.id}`); setDish(null); setPanel(null); }}>Put it in my bag (a present for a friend!)</button>
              </>; })() : !recipe ? <>
                <p className="il-note">Choose a recipe.</p>
                <div className="il-grid">{RECIPES.map((r) => <button key={r.id} type="button" className="il-pick" onClick={() => { setRecipe(r.id); setPicked([]); say(`Let's make ${r.en}!`); }}><i className="il-dot" style={{ background: r.c }} />{r.en}</button>)}</div>
              </> : (() => { const r = RECIPES.find((x) => x.id === recipe)!; return <>
                <div className="il-note-paper"><b>Recipe: {r.en}</b><br />You need: {r.need.join(', ')}.<br />{r.how} <button type="button" className="il-mini" onClick={() => say(`You need ${r.need.join(', ')}. ${r.how}`)}>Listen</button></div>
                <p className="il-sub">Take the things you need</p>
                <div className="il-grid">{INGREDIENTS.map((g) => <button key={g} type="button" className={`il-pick ${picked.includes(g) ? 'on' : ''}`} onClick={() => { sfx.pick(); setPicked((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g])); }}>{g}</button>)}</div>
                <button type="button" className="il-go" onClick={cookIt} disabled={!picked.length}>Cook it!</button>
                <button type="button" className="il-mini" onClick={() => setRecipe(null)}>Other recipes</button>
              </>; })()}
            </>}

            {panel === 'bag' && <>
              <h2>{giveMode ? `A present for ${npcName}` : 'My bag'}</h2>
              {!Object.keys(save.bag ?? {}).length && <p className="il-note">Your bag is empty. Take food from a fridge, cook something, or buy snacks at the cafe, bakery and market.</p>}
              <div className="il-shop">{Object.entries(save.bag ?? {}).map(([id, n]) => { const f = foodOf(id); if (!f) return null; return (
                <div key={id} className="il-item"><i className={id.startsWith('dish:') ? 'il-dish' : 'il-food'} style={{ background: f.c }} /><span>{f.en} <b>x{n}</b></span>
                  {giveMode ? <button type="button" onClick={() => giveGift(id)}>Give</button> : <button type="button" onClick={() => { eat(id, true); setPanel(null); }}>Eat</button>}</div>); })}</div>
            </>}

            {panel === 'friend' && npcI !== null && <>
              <h2>{npcName}</h2>
              <p className="il-hearts">{[0, 1, 2, 3, 4].map((i) => <i key={i} className={i < fl.i ? 'on' : ''} />)} <b>{fl.en}</b>{fl.next ? <span className="t-muted"> · {fl.next.n - fp} more to {fl.next.en}</span> : null}</p>
              <div className="il-grid il-grid--col">
                <button type="button" className="il-pick" onClick={() => startTalk(npcName)}>Talk</button>
                <button type="button" className="il-pick" onClick={() => { setGiveMode(true); setPanel('bag'); }}>Give a present</button>
                <button type="button" className="il-pick" onClick={() => friendAct('dance')}>Dance together</button>
                <button type="button" className="il-pick" onClick={() => friendAct('five')}>High five</button>
                <button type="button" className="il-pick" onClick={tellJoke}>Tell a joke</button>
                {fl.i >= 1 && <button type="button" className="il-pick" onClick={startSeek} disabled={!!seek}>Play hide and seek</button>}
                <button type="button" className="il-pick" onClick={() => { if (socialOk('nice')) setPanel('nice'); }}>Say something nice</button>
                <button type="button" className="il-pick" onClick={() => { setRps(null); setPanel('rps'); }}>Play rock, paper, scissors</button>
                {fl.i >= 1 && <button type="button" className="il-pick" onClick={() => friendAct('hug')}>Give a hug</button>}
                {fl.i >= 2 ? <button type="button" className="il-pick" onClick={() => friendAct('follow')}>{sc.current?.followers.has(npcI) ? 'Go home now' : 'Walk with me!'}</button> : <p className="il-note">When you are friends, {npcName} can walk with you around the island.</p>}
              </div>
            </>}

            {panel === 'acts' && <>
              <h2>Actions</h2>
              <div className="il-grid">{EMOTES.map((e) => <button key={e.id} type="button" className="il-pick" onClick={() => emote(e.id)}>{e.en}</button>)}
                {save.outfit.hold === 'hold-guitar' && <button type="button" className="il-pick" onClick={() => { setPanel(null); playNotes([67, 67, 64, 65, 67, 0, 72, 71, 69, 67], 'triangle', 0.3); runAct('guitar', undefined, "I'm playing a song on my guitar."); }}>Play the guitar</button>}</div>
              {sc.current?.winter && !inside && <button type="button" className="il-go" onClick={() => { sc.current?.buildSnowman(); setPanel(null); tell("I'm building a snowman with a carrot nose and a red scarf!"); addNeeds({ fun: 20 }); addSkill('sand'); }}>Build a snowman</button>}
              {save.pet && <><p className="il-sub">My pet</p>
                <label className="il-name">Pet&apos;s name <input maxLength={12} value={save.petName ?? ''} placeholder="Type a name" onChange={(e) => setSave({ ...save, petName: e.target.value.replace(/[^\p{L}\p{N} '-]/gu, '') })} onBlur={() => persist({ ...saveRef.current })} /></label>
                <div className="il-grid"><button type="button" className="il-pick" onClick={() => petAct('pet')}>Stroke my pet</button><button type="button" className="il-pick" onClick={() => petAct('feed')}>Feed my pet</button><button type="button" className="il-pick" onClick={() => petAct('ball')}>Play ball</button></div></>}
              <button type="button" className="il-mini" onClick={() => setPanel('skills')}>My skills</button>
              <p className="il-note">Look for things you can use: chairs, beds, the fridge, the cooker, the TV, books, the radio, the bath, the swing, the campfire and more. Walk close and press the yellow button.</p>
            </>}

            {panel === 'dialog' && dlg && <>
              <h2>{dlg.d.npc}</h2>
              <p className="il-note">{dlg.d.title}</p>
              {dlg.said && <p className="il-me">{dlg.said}</p>}
              {dlg.node === '__end' ? <>
                <p className="il-note">You made a friend! {dlg.d.npc} likes you more now. Talk again later for a new story.</p>
                <button type="button" className="il-go" onClick={() => { setDlg(null); setPanel(null); }}>Bye!</button>
              </> : <>
                <p className="il-say">&ldquo;{dlg.react ?? dlg.d.nodes[dlg.node].say}&rdquo; <button type="button" className="il-mini" onClick={() => say(dlg.react ?? dlg.d.nodes[dlg.node].say)}>Listen</button></p>
                {dlg.react && <p className="il-note">Try another answer.</p>}
                <p className="il-sub">Your answer</p>
                <div className="il-grid il-grid--col">{dlg.d.nodes[dlg.node].opts.map((o) => <button key={o.t} type="button" className="il-pick" onClick={() => pickDialog(o)}>{o.t}</button>)}</div>
              </>}
            </>}

            {panel === 'career' && <>
              <h2>Choose your job</h2>
              <p className="il-note">You can do every job, but your own job gives you <b>+2 coins</b> each time, a uniform and promotions: Trainee, Junior, Senior, Master, Legend.</p>
              <div className="il-profs">{PROFS.map((p) => { const n = save.jobs[p.job] ?? 0; const lv = profLevel(n); const mine = save.prof === p.id; return (
                <div key={p.id} className={mine ? 'on' : ''}>
                  <b>{p.en}</b><span>{p.what}</span>
                  <span className="il-lv">{lv.en}{lv.next ? ` · ${n}/${lv.next.n} jobs to ${lv.next.en}` : ''}</span>
                  <span className="il-bar"><i style={{ width: `${lv.next ? Math.min(100, ((n - lv.n) / (lv.next.n - lv.n)) * 100) : 100}%` }} /></span>
                  {mine ? <button type="button" disabled>My job</button> : <button type="button" onClick={() => chooseProf(p.id)}>Choose</button>}
                </div>); })}</div>
            </>}

            {panel === 'store' && <>
              <h2>Murly Store</h2>
              <p className="il-note">You have <b>{coins ?? 0}</b> coins.</p>
              <div className="il-tabs">{(['Clothes', 'Home', 'Furniture', 'Transport', 'Pets'] as Tab[]).map((c) => <button key={c} type="button" className={tab === c ? 'on' : ''} onClick={() => setTab(c)}>{c}</button>)}</div>
              {tab === 'Furniture' && <><p className="il-note">{save.house ? 'Things for inside your home. Go inside and press Decorate to place them.' : 'Buy a house first (the Home tab), then you can put furniture inside.'}</p>
                <div className="il-tabs il-tabs--sm">{FURN_CATS.map(([k, l]) => <button key={k} type="button" className={fcat === k ? 'on' : ''} onClick={() => setFcat(k)}>{l}</button>)}</div>
                <div className="il-shop">{FURN_ALL.filter((f) => f.cat === fcat).map((f) => { const id = `furn-${f.f}`; return (
                  <div key={id} className="il-item">{f.f.startsWith('x-') ? (thumbs[f.f] ? <img className="il-thumb" src={thumbs[f.f]} alt="" /> : <i className="il-thumb-wait" />) : <img className="il-thumb" src={`/worlds/kenney/t/${f.f}.png`} alt="" />}<span>{f.en}</span>
                    {owned(id) ? <button type="button" disabled>Bought</button> : <button type="button" className="buy" onClick={() => buy({ id, price: f.price, en: f.en })}><i className="il-coin" /> {f.price}</button>}
                  </div>); })}</div></>}
              {tab === 'Clothes' && <><p className="il-sub">Fur colour</p>
                <div className="il-shop">{FUR.map((f) => (
                  <div key={f.id} className={`il-item ${save.outfit.fur === f.id ? 'on' : ''}`}>{thumbs[f.id] ? <img className="il-thumb" src={thumbs[f.id]} alt="" /> : <i style={{ background: f.color }} />}<span>{f.en}</span>
                    {owned(f.id) || !f.price ? <button type="button" onClick={() => persist({ ...save, outfit: { ...save.outfit, fur: f.id } })}>{save.outfit.fur === f.id ? 'Wearing' : 'Wear'}</button>
                      : <button type="button" className="buy" onClick={async () => { if (await buy(f)) persist({ ...saveRef.current, outfit: { ...saveRef.current.outfit, fur: f.id } }); }}><i className="il-coin" /> {f.price}</button>}
                  </div>))}</div></>}
              <div className="il-shop">{SHOP.filter((s) => s.cat === tab).map((it) => (
                <div key={it.id} className={`il-item ${worn(it) ? 'on' : ''}`}>{thumbs[it.id] ? <img className="il-thumb" src={thumbs[it.id]} alt="" /> : <i className="il-thumb-wait" />}<span>{it.en}</span>
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
                  <div key={it.id} className={`il-item ${worn(it) ? 'on' : ''}`}>{thumbs[it.id] ? <img className="il-thumb" src={thumbs[it.id]} alt="" /> : <i className="il-thumb-wait" />}<span>{it.en}</span>
                    <button type="button" onClick={() => equip(it)}>{it.sub === 'house' || it.sub === 'yard' ? (worn(it) ? 'Placed' : 'Place') : worn(it) ? 'Take off' : 'Use'}</button></div>))}</div></div>;
              })}
              {save.yard.length > 0 && <button type="button" className="il-mini" onClick={() => persist({ ...save, yard: [] })}>Clear my yard</button>}
              {furnOwned.length > 0 && <p className="il-note">Furniture: {furnOwned.map((f) => f.en).join(', ')}. Go inside your home and press Decorate.</p>}
              {Object.keys(save.friends ?? {}).length > 0 && <><p className="il-sub">My friends</p><p className="il-note">{Object.entries(save.friends ?? {}).map(([n, v]) => `${n} (${v})`).join(', ')}</p></>}
              <p className="il-note">Stories heard: {(save.dialogs ?? []).length} / {DIALOGS.length}</p>
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
