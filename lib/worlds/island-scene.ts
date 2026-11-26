// 3D-рушій «Murly Island» на Three.js: острів з містечком, котик-герой, що кумедно хитається,
// транспорт, улюбленці, свій будинок і двір. Будинки й дерева з наборів CC0, усе інше малюється кодом.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ADDRS, CARS, DISHES, FUR, HOME, HOME_SIZE, HOUSES, PLACES, PRODUCTS, SHELVES, SHOP, SPEED, type HomeRooms, type Outfit, type RoomItem, type Spot, ROOM_TYPES } from './island-data';
import { chalkTex, graffitiTex, neonTex, posterTex, wallpaperTex } from './island-art';

const loader = new GLTFLoader();
const packs = new Map<string, Promise<Map<string, THREE.Object3D>>>();
const PACK: Record<string, string> = { city: '/worlds/kaykit-city.glb', sub: '/worlds/kenney-suburban.glb', nature: '/worlds/kenney-nature.glb', furn: '/worlds/kenney-all.glb', food: '/worlds/kaykit-food.glb', holiday: '/worlds/kaykit-holiday.glb' };
function pack(name: string) {
  if (!packs.has(name)) packs.set(name, loader.loadAsync(PACK[name]).then((g) => new Map(g.scenes.map((sc) => [sc.name, sc as THREE.Object3D]))));
  return packs.get(name)!;
}
// модель з набору: центр сліду в (0,0), низ на y=0, найбільший розмір по горизонталі = size
async function model(p: string, name: string, size: number): Promise<THREE.Group> {
  const scenes = await pack(p);
  const src = scenes.get(name);
  const wrap = new THREE.Group();
  if (!src) return wrap;
  const inner = new THREE.Group(); src.children.forEach((c) => inner.add(c.clone(true)));
  wrap.add(inner);
  const box = new THREE.Box3().setFromObject(inner);
  const s = box.getSize(new THREE.Vector3());
  const k = size / Math.max(s.x, s.z, 0.001);
  inner.scale.setScalar(k);
  const b2 = new THREE.Box3().setFromObject(inner); const c = b2.getCenter(new THREE.Vector3());
  inner.position.set(-c.x, -b2.min.y, -c.z);
  wrap.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    m.castShadow = true; m.receiveShadow = true;
    // без карти оточення металеві матеріали виходять чорними: робимо їх матовими
    (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { const st = mt as THREE.MeshStandardMaterial; if (st.metalness !== undefined) { st.metalness = Math.min(st.metalness, 0.15); st.roughness = Math.max(st.roughness ?? 1, 0.45); if (st.map) st.map.anisotropy = 8; } });
  });
  return wrap;
}

// основні кольори моделі будинку: щоб стіни всередині були такі, як ззовні
async function modelColors(p: string, name: string): Promise<string[]> {
  const scenes = await pack(p); const src = scenes.get(name); if (!src) return [];
  const cnt = new Map<string, number>();
  src.traverse((o) => { const m = o as THREE.Mesh; if (!m.isMesh) return; const g = m.geometry as THREE.BufferGeometry; const n = g.index ? g.index.count : g.attributes.position.count; (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { const c = (mt as THREE.MeshStandardMaterial).color; if (!c) return; const hsl = { h: 0, s: 0, l: 0 }; c.getHSL(hsl); if (hsl.l < 0.25 || hsl.l > 0.95) return; const k = '#' + c.clone().lerp(new THREE.Color('#FFFFFF'), 0.35).getHexString(); cnt.set(k, (cnt.get(k) ?? 0) + n); }); });
  return [...cnt.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);
}

// мультяшний матеріал з трьома тонами
let grad: THREE.DataTexture | null = null;
function toon(color: string | number, emissive = 0) {
  if (!grad) {
    grad = new THREE.DataTexture(new Uint8Array([90, 90, 90, 255, 175, 175, 175, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
    grad.minFilter = grad.magFilter = THREE.NearestFilter; grad.needsUpdate = true;
  }
  return new THREE.MeshToonMaterial({ color, gradientMap: grad, emissive: emissive ? new THREE.Color(color) : undefined, emissiveIntensity: emissive });
}
const mesh = (g: THREE.BufferGeometry, m: THREE.Material, shadow = true) => { const x = new THREE.Mesh(g, m); x.castShadow = shadow; x.receiveShadow = true; return x; };
const sph = (r: number, c: string | number, seg = 20) => mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.75)), toon(c));
const box = (w: number, h: number, d: number, c: string | number) => mesh(new THREE.BoxGeometry(w, h, d), toon(c));
const cyl = (rt: number, rb: number, h: number, c: string | number, seg = 16) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg), toon(c));

// табличка-надпис над будівлею
function sign(text: string, bg = '#1A1A1A', fg = '#FFFFFF', w = 4) {
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 128;
  const x = cv.getContext('2d')!;
  x.fillStyle = bg; x.beginPath(); x.roundRect(6, 6, 500, 116, 40); x.fill();
  x.fillStyle = fg; x.font = 'bold 64px system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, 256, 68, 470);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthWrite: false }));
  sp.scale.set(w, w / 4, 1);
  return sp;
}

// ---------- котик-герой ----------
type Rig = { root: THREE.Group; body: THREE.Group; head: THREE.Group; armL: THREE.Group; armR: THREE.Group; legL: THREE.Mesh; legR: THREE.Mesh; tail: THREE.Group; fur: THREE.MeshToonMaterial[]; slots: Record<string, THREE.Group> };
export function makeCat(furColor: string, scale = 1): Rig {
  const fur: THREE.MeshToonMaterial[] = [];
  const furMat = () => { const m = toon(furColor); fur.push(m); return m; };
  const root = new THREE.Group();
  const body = new THREE.Group(); root.add(body);
  const belly = mesh(new THREE.SphereGeometry(0.5, 24, 18), furMat()); belly.scale.set(1, 1.15, 0.92); belly.position.y = 0.62; body.add(belly);
  const tummy = mesh(new THREE.SphereGeometry(0.36, 20, 14), toon('#FFF6E6')); tummy.scale.set(1, 1.15, 0.6); tummy.position.set(0, 0.58, 0.22); body.add(tummy);
  const head = new THREE.Group(); head.position.y = 1.28; body.add(head);
  const skull = mesh(new THREE.SphereGeometry(0.46, 26, 20), furMat()); skull.scale.set(1.1, 0.95, 1); head.add(skull);
  [-1, 1].forEach((s) => {
    const ear = mesh(new THREE.ConeGeometry(0.17, 0.32, 4), furMat()); ear.position.set(0.27 * s, 0.4, 0); ear.rotation.z = -0.35 * s; ear.rotation.y = Math.PI / 4; head.add(ear);
    const inner = mesh(new THREE.ConeGeometry(0.09, 0.18, 4), toon('#F7A1B5')); inner.position.set(0.26 * s, 0.38, 0.05); inner.rotation.z = -0.35 * s; inner.rotation.y = Math.PI / 4; head.add(inner);
    const eye = mesh(new THREE.SphereGeometry(0.085, 16, 12), toon('#1A1A1A'), false); eye.scale.set(0.9, 1.15, 0.6); eye.position.set(0.17 * s, 0.06, 0.4); head.add(eye);
    const hi = mesh(new THREE.SphereGeometry(0.03, 8, 6), new THREE.MeshBasicMaterial({ color: '#FFFFFF' }), false); hi.position.set(0.15 * s + 0.02, 0.1, 0.46); head.add(hi);
    const cheek = mesh(new THREE.SphereGeometry(0.07, 12, 8), toon('#F7A1B5'), false); cheek.scale.set(1, 0.6, 0.4); cheek.position.set(0.3 * s, -0.1, 0.34); head.add(cheek);
    for (let i = 0; i < 2; i++) { const w = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.32, 4), toon('#1A1A1A'), false); w.rotation.z = Math.PI / 2 + (i ? 0.15 : -0.1) * s; w.position.set(0.36 * s, -0.06 - i * 0.05, 0.36); head.add(w); }
  });
  const nose = mesh(new THREE.SphereGeometry(0.045, 10, 8), toon('#E8678A'), false); nose.position.set(0, -0.04, 0.46); head.add(nose);
  const mouth = mesh(new THREE.TorusGeometry(0.05, 0.012, 6, 12, Math.PI), toon('#1A1A1A'), false); mouth.rotation.z = Math.PI; mouth.position.set(0, -0.1, 0.45); head.add(mouth);
  const arm = (s: number) => {
    const g = new THREE.Group(); g.position.set(0.48 * s, 0.85, 0);
    const a = mesh(new THREE.CapsuleGeometry(0.11, 0.32, 6, 12), furMat()); a.position.y = -0.22; g.add(a);
    const paw = mesh(new THREE.SphereGeometry(0.13, 12, 10), toon('#FFF6E6')); paw.position.y = -0.44; g.add(paw);
    g.rotation.z = 0.35 * s; body.add(g); return g;
  };
  const armL = arm(-1), armR = arm(1);
  const leg = (s: number) => { const l = mesh(new THREE.CapsuleGeometry(0.13, 0.12, 6, 12), furMat()); l.position.set(0.2 * s, 0.14, 0.02); root.add(l); return l; };
  const legL = leg(-1), legR = leg(1);
  const tail = new THREE.Group(); tail.position.set(0, 0.45, -0.42); body.add(tail);
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.15, -0.25), new THREE.Vector3(0, 0.5, -0.32), new THREE.Vector3(0.05, 0.75, -0.2)]);
  tail.add(mesh(new THREE.TubeGeometry(curve, 16, 0.07, 8), furMat()));
  const slots: Record<string, THREE.Group> = {};
  (['hat', 'glasses', 'scarf', 'bag', 'hair', 'top'] as const).forEach((k) => { const g = new THREE.Group(); slots[k] = g; (k === 'hat' || k === 'glasses' || k === 'hair' ? head : body).add(g); });
  [['sleeveL', armL], ['sleeveR', armR], ['hand', armR], ['held', armR], ['legL', legL], ['legR', legR]].forEach(([k, par]) => { const g = new THREE.Group(); slots[k as string] = g; (par as THREE.Object3D).add(g); });
  slots.hand.position.set(0, -0.5, 0.08); slots.held.position.set(0, -0.5, 0.08);
  slots.scarf.position.y = 1.0; slots.bag.position.set(0, 0.7, -0.42);
  root.scale.setScalar(scale);
  return { root, body, head, armL, armR, legL, legR, tail, fur, slots };
}

function wear(rig: Rig, o: Outfit) {
  const furC = FUR.find((f) => f.id === o.fur)?.color ?? FUR[0].color;
  rig.fur.forEach((m) => m.color.set(furC));
  Object.values(rig.slots).forEach((g) => g.clear());
  const it = (id?: string) => SHOP.find((s) => s.id === id);
  const h = it(o.hat); const H = rig.slots.hat;
  if (h) {
    const c = h.color ?? '#1A1A1A';
    if (h.id === 'hat-cap') { const d = sph(0.4, c); d.scale.set(1.1, 0.55, 1.1); d.position.y = 0.3; H.add(d); const v = cyl(0.33, 0.33, 0.03, c, 20); v.scale.set(1, 1, 0.8); v.position.set(0, 0.24, 0.32); H.add(v); }
    if (h.id === 'hat-beanie') { const d = sph(0.43, c); d.scale.set(1.08, 0.62, 1.05); d.position.y = 0.28; H.add(d); const p = sph(0.1, '#FFFFFF'); p.position.y = 0.58; H.add(p); }
    if (h.id === 'hat-chef') { const b = cyl(0.3, 0.3, 0.3, '#FFFFFF'); b.position.y = 0.5; H.add(b); [-0.15, 0, 0.15].forEach((x) => { const p = sph(0.2, '#FFFFFF'); p.position.set(x, 0.72, 0); H.add(p); }); }
    if (h.id === 'hat-top') { const b = cyl(0.27, 0.27, 0.5, '#1E1E24'); b.position.y = 0.62; H.add(b); const r = cyl(0.45, 0.45, 0.04, '#1E1E24', 24); r.position.y = 0.38; H.add(r); const band = cyl(0.28, 0.28, 0.08, '#E5484D'); band.position.y = 0.44; H.add(band); }
    if (h.id === 'hat-crown') { const b = cyl(0.3, 0.27, 0.18, '#FFC53D', 10); b.material = toon('#FFC53D', 0.15); b.position.y = 0.46; H.add(b); for (let i = 0; i < 5; i++) { const sp = mesh(new THREE.ConeGeometry(0.07, 0.18, 6), toon('#FFC53D', 0.15)); const a = (i / 5) * Math.PI * 2; sp.position.set(Math.sin(a) * 0.27, 0.62, Math.cos(a) * 0.27); H.add(sp); const gem = sph(0.04, ['#E5484D', '#3E7BFA', '#30A46C'][i % 3], 8); gem.position.set(Math.sin(a) * 0.3, 0.46, Math.cos(a) * 0.3); H.add(gem); } }
    if (h.id === 'hat-helmet') { const g = mesh(new THREE.SphereGeometry(0.64, 24, 18), new THREE.MeshPhysicalMaterial({ color: '#CFE8FF', transparent: true, opacity: 0.35, roughness: 0.05 }), false); g.position.y = 0.05; H.add(g); const ring = mesh(new THREE.TorusGeometry(0.5, 0.06, 8, 24), toon('#E8E8F0')); ring.rotation.x = Math.PI / 2; ring.position.y = -0.38; H.add(ring); }
    if (h.id === 'hat-flower') { for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const f = sph(0.07, ['#F76AA8', '#FFC53D', '#FFFFFF', '#B79CF0'][i % 4], 8); f.position.set(Math.sin(a) * 0.38, 0.32, Math.cos(a) * 0.36); H.add(f); } }
  }
  const g = it(o.glasses); const G = rig.slots.glasses;
  if (g) {
    const frame = g.id === 'glasses-sun' ? '#1A1A1A' : g.id === 'glasses-star' ? '#F76AA8' : '#6B4F2A';
    [-1, 1].forEach((s) => {
      const lens = g.id === 'glasses-star' ? mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03, 5), toon('#FFC53D', 0.2), false) : mesh(new THREE.TorusGeometry(0.1, 0.018, 6, 20), toon(frame), false);
      lens.position.set(0.17 * s, 0.07, 0.47); if (g.id === 'glasses-star') lens.rotation.x = Math.PI / 2; G.add(lens);
      if (g.id === 'glasses-sun') { const d = mesh(new THREE.CircleGeometry(0.1, 20), new THREE.MeshBasicMaterial({ color: '#111', transparent: true, opacity: 0.85 }), false); d.position.set(0.17 * s, 0.07, 0.475); G.add(d); }
    });
    const br = box(0.12, 0.02, 0.02, frame); br.position.set(0, 0.08, 0.48); G.add(br);
  }
  const sc = it(o.scarf); const S = rig.slots.scarf;
  if (sc) {
    if (sc.id === 'bow-pink') { [-1, 1].forEach((s) => { const w = mesh(new THREE.ConeGeometry(0.1, 0.16, 8), toon(sc.color!)); w.rotation.z = (Math.PI / 2) * s; w.position.set(0.08 * s, 0, 0.42); S.add(w); }); const k = sph(0.045, sc.color!); k.position.set(0, 0, 0.44); S.add(k); }
    else { const r = mesh(new THREE.TorusGeometry(0.36, 0.08, 8, 24), toon(sc.color!)); r.rotation.x = Math.PI / 2; S.add(r); const t = box(0.14, 0.34, 0.06, sc.color!); t.position.set(0.16, -0.16, 0.33); t.rotation.z = 0.2; S.add(t); }
  }
  wearStyle(rig, o);
  const b = it(o.bag); const B = rig.slots.bag;
  if (b) {
    if (b.id === 'bag-jetpack') { [-1, 1].forEach((s) => { const t = cyl(0.12, 0.12, 0.5, '#B8C2CC'); t.position.set(0.14 * s, 0, -0.05); B.add(t); const fl = mesh(new THREE.ConeGeometry(0.1, 0.25, 10), new THREE.MeshBasicMaterial({ color: '#FFB224' }), false); fl.rotation.x = Math.PI; fl.position.set(0.14 * s, -0.38, -0.05); fl.name = 'flame'; B.add(fl); }); }
    else if (b.id === 'cape-hero') { const c = mesh(new THREE.PlaneGeometry(0.8, 0.9, 4, 6), new THREE.MeshToonMaterial({ color: b.color, side: THREE.DoubleSide, gradientMap: grad! })); c.position.set(0, -0.15, -0.02); c.rotation.x = 0.15; c.name = 'cape'; B.add(c); }
    else { const p = box(0.5, 0.55, 0.25, b.color!); B.add(p); const f = box(0.36, 0.22, 0.08, '#FFFFFF'); f.position.set(0, -0.08, -0.15); B.add(f); }
  }
}

// зачіски, одяг, взуття і речі в лапках
function wearStyle(rig: Rig, o: Outfit) {
  const S = rig.slots; ['hair', 'top', 'sleeveL', 'sleeveR', 'hand', 'legL', 'legR'].forEach((k) => S[k]?.clear());
  const hc = o.hairC ?? '#6B4F2A', tc = o.topC ?? '#3E7BFA', bc = o.bottomC ?? '#2B4A7A', sc2 = o.shoesC ?? '#E5484D';
  const H = S.hair; const hair = o.hair ?? 'hair-none';
  const cap = () => { const c = sph(0.475, hc, 22); c.scale.set(1.12, 0.55, 1.06); c.position.set(0, 0.17, -0.03); H.add(c); };
  if (hair === 'hair-short') cap();
  if (hair === 'hair-spiky') { cap(); for (let i = 0; i < 7; i++) { const sp = mesh(new THREE.ConeGeometry(0.09, 0.28, 6), toon(hc)); const a = -1.2 + i * 0.4; sp.position.set(Math.sin(a) * 0.3, 0.42, Math.cos(a) * 0.1 - 0.05); sp.rotation.z = -a * 0.4; H.add(sp); } }
  if (hair === 'hair-curly') { cap(); for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; const c = sph(0.13, hc, 10); c.position.set(Math.cos(a) * 0.38, 0.28 + Math.sin(i) * 0.05, Math.sin(a) * 0.34 - 0.05); H.add(c); } }
  if (hair === 'hair-bob') { cap(); [-1, 1].forEach((d) => { const sd = sph(0.2, hc, 12); sd.scale.set(0.7, 1.4, 1.1); sd.position.set(0.44 * d, -0.06, -0.06); H.add(sd); }); const bk = sph(0.42, hc, 16); bk.scale.set(1.1, 0.9, 0.6); bk.position.set(0, 0.02, -0.25); H.add(bk); }
  if (hair === 'hair-pony') { cap(); const t = sph(0.12, hc, 10); t.position.set(0, 0.25, -0.5); H.add(t); const pt = mesh(new THREE.CapsuleGeometry(0.11, 0.35, 6, 10), toon(hc)); pt.position.set(0, -0.05, -0.6); pt.rotation.x = 0.3; H.add(pt); }
  if (hair === 'hair-bun') { cap(); const b = sph(0.19, hc, 12); b.position.set(0, 0.55, -0.12); H.add(b); }
  if (hair === 'hair-pigtails') { cap(); [-1, 1].forEach((d) => { const p = mesh(new THREE.CapsuleGeometry(0.1, 0.25, 6, 10), toon(hc)); p.position.set(0.52 * d, 0.02, -0.12); p.rotation.z = 0.5 * d; H.add(p); const bw = sph(0.06, '#F76AA8', 8); bw.position.set(0.47 * d, 0.16, -0.12); H.add(bw); }); }
  if (hair === 'hair-mohawk') { for (let i = 0; i < 6; i++) { const m = box(0.08, 0.26 - Math.abs(i - 2.5) * 0.03, 0.14, hc); m.position.set(0, 0.5, 0.22 - i * 0.12); H.add(m); } }
  if (hair === 'hair-long') { cap(); const bk = sph(0.45, hc, 16); bk.scale.set(1.05, 1.35, 0.45); bk.position.set(0, -0.15, -0.3); H.add(bk); }
  const T = S.top; const top = o.top ?? 'top-none';
  if (top !== 'top-none') {
    let mat = toon(tc);
    if (top === 'top-stripes') { const cv = document.createElement('canvas'); cv.width = 16; cv.height = 64; const x = cv.getContext('2d')!; for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#FFFFFF' : tc; x.fillRect(0, i * 8, 16, 8); } const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; mat = new THREE.MeshToonMaterial({ map: t, gradientMap: grad! }); }
    const shirt = mesh(new THREE.SphereGeometry(0.515, 24, 18), mat); shirt.scale.set(1, top === 'top-dress' ? 0.8 : 0.85, 0.95); shirt.position.y = 0.74; T.add(shirt);
    const long = top === 'top-jumper' || top === 'top-hoodie' || top === 'top-jacket';
    [S.sleeveL, S.sleeveR].forEach((sl) => { const c = mesh(new THREE.CapsuleGeometry(0.125, long ? 0.3 : 0.06, 6, 10), mat); c.position.y = long ? -0.22 : -0.08; sl.add(c); });
    if (top === 'top-hoodie') { const hd = mesh(new THREE.TorusGeometry(0.25, 0.1, 8, 16), toon(tc)); hd.position.set(0, 1.02, -0.28); hd.rotation.x = 0.6; T.add(hd); }
    if (top === 'top-jacket') { const col = mesh(new THREE.TorusGeometry(0.3, 0.06, 6, 18), toon('#FFFFFF')); col.rotation.x = Math.PI / 2; col.position.y = 1.0; T.add(col); [0.85, 0.7, 0.55].forEach((y) => { const bt = sph(0.035, '#FFC53D', 8); bt.position.set(0, y, 0.48); T.add(bt); }); }
    if (top === 'top-dress') { const sk = mesh(new THREE.CylinderGeometry(0.42, 0.68, 0.55, 20, 1, true), new THREE.MeshToonMaterial({ color: tc, gradientMap: grad!, side: THREE.DoubleSide })); sk.position.y = 0.3; T.add(sk); }
    if (top === 'top-overalls') { const low = sph(0.52, tc, 20); low.scale.set(1.02, 0.55, 0.96); low.position.y = 0.4; T.add(low); const bib = box(0.36, 0.3, 0.06, tc); bib.position.set(0, 0.72, 0.42); T.add(bib); [-0.14, 0.14].forEach((x) => { const st = box(0.06, 0.4, 0.04, tc); st.position.set(x, 0.92, 0.36); st.rotation.x = -0.3; T.add(st); const bt = sph(0.035, '#FFC53D', 8); bt.position.set(x, 0.84, 0.46); T.add(bt); }); shirt.material = toon('#FFFFFF'); }
  }
  const bottom = o.bottom ?? 'bottom-none';
  if (bottom !== 'bottom-none' && top !== 'top-dress' && top !== 'top-overalls') {
    const c = bottom === 'bottom-jeans' ? (o.bottomC ?? '#3D5A99') : bc;
    if (bottom === 'bottom-skirt') { const sk = mesh(new THREE.CylinderGeometry(0.46, 0.64, 0.38, 20, 1, true), new THREE.MeshToonMaterial({ color: c, gradientMap: grad!, side: THREE.DoubleSide })); sk.position.y = 0.32; T.add(sk); }
    else {
      const hip = sph(0.515, c, 20); hip.scale.set(1.01, 0.42, 0.95); hip.position.y = 0.33; T.add(hip);
      if (bottom !== 'bottom-shorts') [S.legL, S.legR].forEach((lg) => { const l = mesh(new THREE.CapsuleGeometry(0.145, 0.12, 6, 10), toon(c)); lg.add(l); });
    }
  }
  const shoes = o.shoes ?? 'shoes-none';
  if (shoes !== 'shoes-none') [S.legL, S.legR].forEach((lg) => {
    if (shoes === 'shoes-boots' || shoes === 'shoes-wellies') { const b = cyl(0.16, 0.17, 0.26, shoes === 'shoes-wellies' ? (o.shoesC ?? '#FFC53D') : (o.shoesC ?? '#6B4F2A'), 12); b.position.y = -0.08; lg.add(b); const toe = box(0.3, 0.12, 0.2, shoes === 'shoes-wellies' ? (o.shoesC ?? '#FFC53D') : (o.shoesC ?? '#6B4F2A')); toe.position.set(0, -0.15, 0.12); lg.add(toe); }
    else if (shoes === 'shoes-sandals') { const s0 = box(0.26, 0.04, 0.36, '#8B5E34'); s0.position.set(0, -0.2, 0.05); lg.add(s0); const st = box(0.27, 0.04, 0.05, sc2); st.position.set(0, -0.15, 0.08); lg.add(st); }
    else { const s0 = box(0.28, 0.13, 0.36, sc2); s0.position.set(0, -0.15, 0.06); lg.add(s0); const sole = box(0.29, 0.04, 0.37, '#FFFFFF'); sole.position.set(0, -0.21, 0.06); lg.add(sole); }
  });
  const Hd = S.hand; const hold = o.hold ?? 'hold-none';
  if (hold === 'hold-balloon') { const st = cyl(0.008, 0.008, 1.3, '#FFFFFF', 4); st.position.y = 0.6; Hd.add(st); const bl = sph(0.32, '#E5484D', 16); bl.scale.y = 1.15; bl.position.y = 1.4; Hd.add(bl); }
  if (hold === 'hold-icecream') { const c = mesh(new THREE.ConeGeometry(0.1, 0.3, 10), toon('#E8B46A')); c.rotation.x = Math.PI; c.position.y = 0.05; Hd.add(c); const sp = sph(0.12, '#F7A1B5', 10); sp.position.y = 0.24; Hd.add(sp); }
  if (hold === 'hold-flower') { const st = cyl(0.015, 0.015, 0.45, '#30A46C', 6); st.position.y = 0.18; Hd.add(st); for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; const pe = sph(0.06, '#F76AA8', 8); pe.position.set(Math.cos(a) * 0.08, 0.42, Math.sin(a) * 0.08); Hd.add(pe); } const ce = sph(0.05, '#FFC53D', 8); ce.position.y = 0.42; Hd.add(ce); }
  if (hold === 'hold-book') { const b = box(0.32, 0.42, 0.08, '#7C66DC'); b.position.set(0, 0.05, 0.08); Hd.add(b); }
  if (hold === 'hold-phone') { const b = box(0.16, 0.28, 0.03, '#2B2B2B'); b.position.set(0, 0.05, 0.08); Hd.add(b); const sc3 = box(0.13, 0.22, 0.01, '#8EC9F5'); sc3.position.set(0, 0.05, 0.1); Hd.add(sc3); }
  if (hold === 'hold-wand') { const w = cyl(0.02, 0.02, 0.55, '#1A1A1A', 6); w.position.y = 0.22; Hd.add(w); const st = mesh(new THREE.OctahedronGeometry(0.09), toon('#FFC53D', 0.5)); st.position.y = 0.52; Hd.add(st); }
  if (hold === 'hold-guitar') { const g = new THREE.Group(); const b1 = sph(0.22, '#C68A4A', 14); b1.scale.z = 0.35; g.add(b1); const b2 = sph(0.16, '#C68A4A', 14); b2.scale.z = 0.35; b2.position.y = 0.25; g.add(b2); const nk = box(0.06, 0.55, 0.04, '#6B4F2A'); nk.position.y = 0.6; g.add(nk); const hole = sph(0.06, '#1A1A1A', 8); hole.scale.z = 0.2; hole.position.set(0, 0.12, 0.08); g.add(hole); g.rotation.z = 0.6; g.position.set(0.1, 0.1, 0.12); Hd.add(g); }
  if (hold === 'hold-umbrella') { const p = cyl(0.015, 0.015, 1.1, '#2B2B2B', 6); p.position.y = 0.5; Hd.add(p); const c = mesh(new THREE.ConeGeometry(0.75, 0.35, 10), toon('#3E7BFA')); c.position.y = 1.1; Hd.add(c); }
  if (hold === 'hold-rod') { const r = cyl(0.02, 0.025, 1.6, '#6B4F2A', 6); r.position.set(0, 0.6, 0.3); r.rotation.x = 0.6; Hd.add(r); const ln = cyl(0.004, 0.004, 1, '#FFFFFF', 4); ln.position.set(0, 0.85, 1.2); Hd.add(ln); }
  if (hold === 'hold-cupcake') { const c = cyl(0.1, 0.07, 0.12, '#F7A1B5', 10); Hd.add(c); const t = sph(0.11, '#FFFFFF', 10); t.position.y = 0.1; Hd.add(t); const ch = sph(0.03, '#E5484D', 6); ch.position.y = 0.2; Hd.add(ch); }
  if (hold === 'hold-teddy') { const b = sph(0.14, '#C68A4A', 10); b.position.y = 0.05; Hd.add(b); const hd = sph(0.1, '#C68A4A', 10); hd.position.y = 0.24; Hd.add(hd); [-1, 1].forEach((d) => { const e = sph(0.04, '#C68A4A', 6); e.position.set(0.08 * d, 0.32, 0); Hd.add(e); }); }
  rig.root.userData.holding = hold !== 'hold-none' || (S.held?.children.length ?? 0) > 0;
}

// ---------- транспорт і улюбленці ----------
function makeRide(id: string): THREE.Group {
  const g = new THREE.Group();
  if (id === 'ride-skate') { const d = box(0.55, 0.06, 1.3, '#F76AA8'); d.position.y = 0.14; g.add(d); [-0.45, 0.45].forEach((z) => [-0.2, 0.2].forEach((x) => { const w = cyl(0.07, 0.07, 0.06, '#FFC53D'); w.rotation.z = Math.PI / 2; w.position.set(x, 0.07, z); g.add(w); })); }
  if (id === 'ride-bike' || id === 'ride-scooter') {
    const col = id === 'ride-bike' ? '#3E7BFA' : '#E5484D';
    [-0.6, 0.6].forEach((z) => { const w = mesh(new THREE.TorusGeometry(0.32, 0.06, 8, 20), toon('#2B2B2B')); w.rotation.y = Math.PI / 2; w.position.set(0, 0.33, z); g.add(w); });
    const fr = box(0.08, 0.08, 1.2, col); fr.position.y = 0.55; g.add(fr);
    const bar = box(0.6, 0.06, 0.06, '#2B2B2B'); bar.position.set(0, 1.05, 0.55); g.add(bar);
    const st = box(0.06, 0.55, 0.06, col); st.position.set(0, 0.8, 0.55); g.add(st);
    if (id === 'ride-scooter') { const bd = box(0.5, 0.4, 0.9, col); bd.position.set(0, 0.55, -0.15); g.add(bd); const l = sph(0.1, '#FFF7C2'); l.position.set(0, 0.9, 0.66); g.add(l); }
  }
  if (id === 'ride-car') {
    const bd = box(1.2, 0.5, 1.9, '#FFC53D'); bd.position.y = 0.5; g.add(bd);
    const top = box(1.0, 0.45, 0.9, '#FFE08A'); top.position.set(0, 0.95, -0.2); g.add(top);
    [[-0.6, 0.6], [0.6, 0.6], [-0.6, -0.6], [0.6, -0.6]].forEach(([x, z]) => { const w = cyl(0.25, 0.25, 0.2, '#2B2B2B'); w.rotation.z = Math.PI / 2; w.position.set(x, 0.25, z); g.add(w); });
    [-0.35, 0.35].forEach((x) => { const l = sph(0.1, '#FFFFFF'); l.position.set(x, 0.55, 0.96); g.add(l); });
  }
  if (id === 'ride-taxi') {
    const bd = box(1.3, 0.55, 2.1, '#FFC53D'); bd.position.y = 0.5; g.add(bd);
    const top = box(1.1, 0.45, 1.0, '#FFE08A'); top.position.set(0, 1.0, -0.2); g.add(top);
    const sg = box(0.6, 0.22, 0.3, '#1A1A1A'); sg.position.set(0, 1.34, -0.2); g.add(sg);
    for (let i = 0; i < 6; i++) { const c = box(0.2, 0.08, 0.02, i % 2 ? '#1A1A1A' : '#FFFFFF'); c.position.set(-0.5 + i * 0.2, 0.5, 1.06); g.add(c); }
    [[-0.65, 0.65], [0.65, 0.65], [-0.65, -0.65], [0.65, -0.65]].forEach(([x, z]) => { const w = cyl(0.26, 0.26, 0.2, '#2B2B2B'); w.rotation.z = Math.PI / 2; w.position.set(x, 0.26, z); g.add(w); });
    const pas = makeCat('#B79CF0', 0.55); pas.root.position.set(0.3, 0.75, -0.5); g.add(pas.root);
  }
  if (id === 'ride-ufo') {
    const d = mesh(new THREE.SphereGeometry(1.1, 28, 12), toon('#B8C2CC')); d.scale.y = 0.25; d.position.y = 0.6; g.add(d);
    const dome = mesh(new THREE.SphereGeometry(0.55, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: '#9FE7F5', transparent: true, opacity: 0.4 }), false); dome.position.y = 0.75; g.add(dome);
    for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const l = sph(0.08, ['#FFC53D', '#F76AA8', '#30A46C'][i % 3], 8); l.material = toon(['#FFC53D', '#F76AA8', '#30A46C'][i % 3], 0.6); l.position.set(Math.sin(a) * 1.0, 0.6, Math.cos(a) * 1.0); g.add(l); }
  }
  return g;
}
function makePet(id: string): THREE.Group {
  const g = new THREE.Group();
  if (id === 'pet-chick') { const b = sph(0.25, '#FFD84D'); b.position.y = 0.28; g.add(b); const h = sph(0.17, '#FFD84D'); h.position.set(0, 0.55, 0.08); g.add(h); const bk = mesh(new THREE.ConeGeometry(0.05, 0.12, 6), toon('#F5862D')); bk.rotation.x = Math.PI / 2; bk.position.set(0, 0.54, 0.26); g.add(bk); [-1, 1].forEach((s) => { const e = sph(0.03, '#1A1A1A', 8); e.position.set(0.07 * s, 0.6, 0.22); g.add(e); }); }
  if (id === 'pet-bunny') { const b = sph(0.27, '#FFFFFF'); b.scale.y = 0.9; b.position.y = 0.27; g.add(b); const h = sph(0.2, '#FFFFFF'); h.position.set(0, 0.56, 0.12); g.add(h); [-1, 1].forEach((s) => { const e = mesh(new THREE.CapsuleGeometry(0.05, 0.25, 4, 8), toon('#FFFFFF')); e.position.set(0.08 * s, 0.85, 0.08); e.rotation.z = -0.15 * s; g.add(e); const ey = sph(0.03, '#1A1A1A', 8); ey.position.set(0.08 * s, 0.6, 0.3); g.add(ey); }); const t = sph(0.08, '#FFFFFF', 8); t.position.set(0, 0.25, -0.27); g.add(t); }
  if (id === 'pet-puppy') { const b = sph(0.3, '#C68A4A'); b.scale.set(0.9, 0.8, 1.2); b.position.y = 0.32; g.add(b); const h = sph(0.22, '#C68A4A'); h.position.set(0, 0.6, 0.3); g.add(h); const sn = sph(0.1, '#F3D9B1'); sn.position.set(0, 0.55, 0.48); g.add(sn); const no = sph(0.04, '#1A1A1A', 8); no.position.set(0, 0.6, 0.57); g.add(no); [-1, 1].forEach((s) => { const e = sph(0.1, '#7A4E25'); e.scale.set(0.5, 1, 0.4); e.position.set(0.2 * s, 0.6, 0.28); g.add(e); const ey = sph(0.03, '#1A1A1A', 8); ey.position.set(0.08 * s, 0.67, 0.48); g.add(ey); }); const t = mesh(new THREE.CapsuleGeometry(0.04, 0.2, 4, 8), toon('#C68A4A')); t.position.set(0, 0.5, -0.35); t.rotation.x = -0.7; t.name = 'wag'; g.add(t); }
  if (id === 'pet-kitten') { const b = sph(0.22, '#9AA3AE'); b.scale.set(0.9, 0.85, 1.2); b.position.y = 0.24; g.add(b); const h = sph(0.17, '#9AA3AE'); h.position.set(0, 0.45, 0.2); g.add(h); [-1, 1].forEach((s) => { const e = mesh(new THREE.ConeGeometry(0.06, 0.12, 4), toon('#9AA3AE')); e.position.set(0.09 * s, 0.6, 0.2); g.add(e); const ey = sph(0.03, '#1A1A1A', 8); ey.position.set(0.06 * s, 0.48, 0.35); g.add(ey); }); const t = mesh(new THREE.CapsuleGeometry(0.03, 0.3, 4, 8), toon('#9AA3AE')); t.position.set(0, 0.4, -0.3); t.rotation.x = -0.6; t.name = 'wag'; g.add(t); }
  if (id === 'pet-parrot') { const b = sph(0.18, '#30A46C'); b.scale.y = 1.3; b.position.y = 1.3; g.add(b); const h = sph(0.13, '#E5484D'); h.position.set(0, 1.62, 0.05); g.add(h); const bk = mesh(new THREE.ConeGeometry(0.04, 0.12, 6), toon('#FFC53D')); bk.rotation.x = Math.PI / 2; bk.position.set(0, 1.6, 0.18); g.add(bk); [-1, 1].forEach((s) => { const w = mesh(new THREE.ConeGeometry(0.1, 0.35, 3), toon('#3E7BFA')); w.rotation.z = (Math.PI / 2.2) * s; w.position.set(0.16 * s, 1.3, 0); w.name = 'wing'; g.add(w); const ey = sph(0.025, '#1A1A1A', 8); ey.position.set(0.06 * s, 1.66, 0.12); g.add(ey); }); }
  if (id === 'pet-turtle') { const sh = sph(0.3, '#30A46C', 14); sh.scale.set(1, 0.55, 1.2); sh.position.y = 0.18; g.add(sh); const hd = sph(0.11, '#9ACD4C'); hd.position.set(0, 0.18, 0.42); g.add(hd); [[-0.2, 0.25], [0.2, 0.25], [-0.2, -0.25], [0.2, -0.25]].forEach(([x, z]) => { const l = sph(0.07, '#9ACD4C', 8); l.position.set(x, 0.06, z); g.add(l); }); [-1, 1].forEach((s) => { const ey = sph(0.02, '#1A1A1A', 6); ey.position.set(0.05 * s, 0.22, 0.51); g.add(ey); }); }
  if (id === 'pet-hamster') { const b = sph(0.2, '#E8B46A'); b.scale.set(1, 0.85, 1.1); b.position.y = 0.18; g.add(b); const bel = sph(0.13, '#FFF1C9'); bel.position.set(0, 0.15, 0.12); g.add(bel); [-1, 1].forEach((s) => { const e = sph(0.05, '#E8B46A', 8); e.position.set(0.1 * s, 0.34, 0.05); g.add(e); const ey = sph(0.025, '#1A1A1A', 6); ey.position.set(0.07 * s, 0.24, 0.19); g.add(ey); }); }
  if (id === 'pet-dragon') { const b = sph(0.3, '#30A46C'); b.position.y = 0.4; g.add(b); const h = sph(0.22, '#30A46C'); h.position.set(0, 0.75, 0.15); g.add(h); [-1, 1].forEach((s) => { const w = mesh(new THREE.ConeGeometry(0.2, 0.45, 3), toon('#8EE0B0')); w.rotation.z = (Math.PI / 2.4) * s; w.position.set(0.32 * s, 0.6, -0.05); w.name = 'wing'; g.add(w); const ey = sph(0.04, '#1A1A1A', 8); ey.position.set(0.09 * s, 0.82, 0.33); g.add(ey); const hr = mesh(new THREE.ConeGeometry(0.04, 0.14, 6), toon('#FFE08A')); hr.position.set(0.1 * s, 0.98, 0.1); g.add(hr); }); }
  return g;
}

// свої речі для дому, намальовані кодом
function codeItem(f: string): THREE.Group {
  const g = new THREE.Group();
  if (f === 'x-piano') { const b = box(2, 1.1, 0.8, '#2B2B2B'); b.position.y = 0.75; g.add(b); const top = box(2, 0.9, 0.25, '#2B2B2B'); top.position.set(0, 1.7, -0.28); g.add(top); const keys = box(1.8, 0.06, 0.3, '#FFFFFF'); keys.position.set(0, 1.33, 0.28); g.add(keys); for (let i = 0; i < 9; i++) { const k = box(0.08, 0.05, 0.17, '#111'); k.position.set(-0.8 + i * 0.2, 1.37, 0.2); g.add(k); } [-0.9, 0.9].forEach((x) => { const l = box(0.12, 0.4, 0.12, '#2B2B2B'); l.position.set(x, 0.2, 0.25); g.add(l); }); const st = box(0.9, 0.5, 0.4, '#6B4F2A'); st.position.set(0, 0.25, 0.9); g.add(st); }
  if (f === 'x-easel') { [-0.35, 0.35].forEach((x) => { const l = cyl(0.04, 0.04, 2, '#8B5E34', 6); l.position.set(x, 1, 0); l.rotation.z = x > 0 ? -0.12 : 0.12; g.add(l); }); const bl = cyl(0.04, 0.04, 1.9, '#8B5E34', 6); bl.position.set(0, 0.95, -0.35); bl.rotation.x = 0.3; g.add(bl); const cv = box(1, 0.8, 0.05, '#FFFFFF'); cv.position.set(0, 1.35, 0.05); cv.rotation.x = -0.12; g.add(cv); ['#E5484D', '#FFC53D', '#3E7BFA', '#30A46C'].forEach((c, i) => { const d = sph(0.08, c, 8); d.scale.z = 0.3; d.position.set(-0.3 + i * 0.2, 1.4 - (i % 2) * 0.15, 0.1); g.add(d); }); }
  if (f === 'x-aquarium') { const st = box(1.6, 0.7, 0.7, '#8B5E34'); st.position.y = 0.35; g.add(st); const gl = mesh(new THREE.BoxGeometry(1.5, 0.9, 0.6), new THREE.MeshPhysicalMaterial({ color: '#8EE0F5', transparent: true, opacity: 0.45, roughness: 0.05 }), false); gl.position.y = 1.15; g.add(gl); const sand = box(1.45, 0.08, 0.55, '#F3DFA7'); sand.position.y = 0.75; g.add(sand); ['#F5862D', '#FFC53D', '#3E7BFA'].forEach((c, i) => { const fi = sph(0.08, c, 8); fi.scale.set(1.5, 1, 0.6); fi.position.set(-0.4 + i * 0.4, 1.0 + (i % 2) * 0.2, 0); fi.name = 'fishy'; g.add(fi); }); const pl = mesh(new THREE.ConeGeometry(0.08, 0.5, 5), toon('#30A46C')); pl.position.set(0.55, 1.0, 0); g.add(pl); }
  if (f === 'x-drums') { const bd = cyl(0.45, 0.45, 0.5, '#E5484D', 18); bd.rotation.x = Math.PI / 2; bd.position.set(0, 0.45, 0); g.add(bd); [[-0.55, 0.75], [0.55, 0.75]].forEach(([x, y]) => { const t = cyl(0.22, 0.22, 0.25, '#E5484D', 14); t.position.set(x, y, 0.2); g.add(t); const sk = cyl(0.21, 0.21, 0.02, '#FFFFFF', 14); sk.position.set(x, y + 0.13, 0.2); g.add(sk); }); const cy = cyl(0.3, 0.3, 0.02, '#FFC53D', 16); cy.position.set(0.8, 1.3, -0.2); g.add(cy); const cp = cyl(0.02, 0.02, 1.3, '#B8C2CC', 6); cp.position.set(0.8, 0.65, -0.2); g.add(cp); const sto = cyl(0.2, 0.2, 0.45, '#2B2B2B', 12); sto.position.set(0, 0.22, 0.8); g.add(sto); }
  if (f === 'x-arcade') { const b = box(0.9, 1.9, 0.8, '#7C66DC'); b.position.y = 0.95; g.add(b); const sc = box(0.7, 0.55, 0.05, '#1E2A4A'); sc.position.set(0, 1.45, 0.41); g.add(sc); const glow = box(0.62, 0.45, 0.02, '#30A46C'); glow.position.set(0, 1.45, 0.44); (glow.material as THREE.MeshToonMaterial).emissive = new THREE.Color('#30A46C'); g.add(glow); const pnl = box(0.9, 0.1, 0.4, '#2B2B2B'); pnl.position.set(0, 1.0, 0.5); g.add(pnl); const st = sph(0.06, '#E5484D', 8); st.position.set(-0.2, 1.1, 0.5); g.add(st); [0.1, 0.25].forEach((x) => { const bt = sph(0.05, '#FFC53D', 8); bt.position.set(x, 1.07, 0.55); g.add(bt); }); }
  if (f === 'x-telescope') { [-1, 0, 1].forEach((k) => { const l = cyl(0.03, 0.03, 1.2, '#55606E', 6); const a = (k / 3) * Math.PI * 2; l.position.set(Math.sin(a) * 0.25, 0.55, Math.cos(a) * 0.25); l.rotation.set(Math.cos(a) * 0.25, 0, -Math.sin(a) * 0.25); g.add(l); }); const tb = cyl(0.12, 0.18, 1.3, '#3E7BFA', 14); tb.position.set(0, 1.35, 0.1); tb.rotation.x = 1.0; g.add(tb); }
  return g;
}

// продукт або страва: справжня модель з набору, а якщо її нема, то намальована кодом
export async function productObj(id: string, size = 0.4): Promise<THREE.Object3D> {
  const dish = id.startsWith('dish:') ? DISHES.find((d) => `dish:${d.id}` === id) : null;
  const p = dish ? null : PRODUCTS.find((x) => x.id === id);
  const m = dish?.m ?? p?.m; const c = dish?.c ?? p?.c ?? '#E5484D';
  if (m) { const [pk, nm] = m.split(':'); return model(pk, nm, size); }
  const g = new THREE.Group(); const k = size / 0.4;
  if (dish) { const pl = cyl(0.22 * k, 0.18 * k, 0.04 * k, '#FFFFFF', 18); pl.position.y = 0.02 * k; g.add(pl); const f = sph(0.14 * k, c, 12); f.scale.y = 0.5; f.position.y = 0.08 * k; g.add(f); return g; }
  const cat = p?.cat;
  if (['apple', 'orange', 'pepper'].includes(id)) { const b = sph(0.12 * k, c, 14); b.position.y = 0.12 * k; g.add(b); const st = cyl(0.01 * k, 0.01 * k, 0.06 * k, '#6B4F2A', 4); st.position.y = 0.25 * k; g.add(st); }
  else if (id === 'banana') { const b = mesh(new THREE.TorusGeometry(0.12 * k, 0.04 * k, 8, 16, Math.PI * 0.9), toon(c)); b.rotation.x = Math.PI / 2; b.position.y = 0.05 * k; g.add(b); }
  else if (id === 'strawberries') { for (let i = 0; i < 4; i++) { const s0 = mesh(new THREE.ConeGeometry(0.06 * k, 0.12 * k, 8), toon(c)); s0.rotation.x = Math.PI; s0.position.set((i % 2 - 0.5) * 0.12 * k, 0.07 * k, (Math.floor(i / 2) - 0.5) * 0.12 * k); g.add(s0); } }
  else if (id === 'cucumber') { const b = mesh(new THREE.CapsuleGeometry(0.05 * k, 0.22 * k, 6, 10), toon(c)); b.rotation.z = Math.PI / 2; b.position.y = 0.05 * k; g.add(b); }
  else if (id === 'eggs') { const bx = box(0.3 * k, 0.08 * k, 0.16 * k, '#C8B89A'); bx.position.y = 0.04 * k; g.add(bx); for (let i = 0; i < 6; i++) { const e = sph(0.04 * k, '#FFF1C9', 8); e.scale.y = 1.3; e.position.set(-0.1 * k + (i % 3) * 0.1 * k, 0.1 * k, (Math.floor(i / 3) - 0.5) * 0.08 * k); g.add(e); } }
  else if (['milk', 'water', 'juice', 'lemonade', 'olive oil'].includes(id)) { const b = cyl(0.06 * k, 0.07 * k, 0.26 * k, c, 12); b.position.y = 0.13 * k; g.add(b); const cap = cyl(0.03 * k, 0.03 * k, 0.04 * k, '#3E7BFA', 8); cap.position.y = 0.28 * k; g.add(cap); const lab = cyl(0.071 * k, 0.071 * k, 0.08 * k, '#FFFFFF', 12); lab.position.y = 0.12 * k; g.add(lab); }
  else if (['bread', 'croissant'].includes(id)) { const b = mesh(new THREE.CapsuleGeometry(0.08 * k, 0.16 * k, 6, 10), toon(c)); b.rotation.z = Math.PI / 2; b.scale.y = 0.8; b.position.y = 0.08 * k; g.add(b); }
  else if (cat === 'pantry' || ['crisps', 'sweets', 'peas', 'frozen pizza'].includes(id)) { const b = box(0.18 * k, 0.24 * k, 0.1 * k, c); b.position.y = 0.12 * k; g.add(b); const lab = box(0.14 * k, 0.1 * k, 0.102 * k, '#FFFFFF'); lab.position.y = 0.13 * k; g.add(lab); const dot = sph(0.025 * k, '#E5484D', 6); dot.position.set(0, 0.13 * k, 0.055 * k); g.add(dot); }
  else if (id === 'icecream') { const cn = mesh(new THREE.ConeGeometry(0.06 * k, 0.18 * k, 10), toon('#E8B46A')); cn.rotation.x = Math.PI; cn.position.y = 0.09 * k; g.add(cn); const sc = sph(0.07 * k, c, 10); sc.position.y = 0.2 * k; g.add(sc); }
  else if (['chicken', 'fish', 'sausages'].includes(id)) { const tr = box(0.26 * k, 0.04 * k, 0.18 * k, '#FFFFFF'); tr.position.y = 0.02 * k; g.add(tr); const f = sph(0.08 * k, c, 10); f.scale.set(1.4, 0.6, 1); f.position.y = 0.07 * k; g.add(f); }
  else { const b = box(0.16 * k, 0.14 * k, 0.16 * k, c); b.position.y = 0.07 * k; g.add(b); }
  return g;
}

async function yardItem(id: string): Promise<THREE.Object3D | null> {
  if (id === 'yard-garden') { const g = new THREE.Group(); [-1.4, 0, 1.4].forEach((x, i) => { const b = box(1.1, 0.3, 2.4, '#8B5E34'); b.position.set(x, 0.15, 0); g.add(b); const soil = box(0.95, 0.05, 2.25, '#5A3E22'); soil.position.set(x, 0.31, 0); soil.name = `bed${i}`; g.add(soil); }); return g; }
  let g: THREE.Object3D | null = null;
      if (id === 'yard-bench') g = await model('city', 'bench', 2);
  if (id === 'yard-lamp') g = await model('city', 'streetlight', 1.2);
  if (id === 'yard-fire') g = await model('nature', 'campfire_stones', 1.4);
  if (id === 'yard-tent') g = await model('nature', 'tent_detailedOpen', 2.6);
  if (id === 'yard-tree') g = await model('nature', 'tree_palm', 3.6);
  if (id === 'yard-flowers') { const f = new THREE.Group(); const bed = box(2.4, 0.3, 1, '#8B5E34'); bed.position.y = 0.15; f.add(bed); for (let k = 0; k < 8; k++) { const fl = sph(0.14, ['#F76AA8', '#FFC53D', '#E5484D', '#B79CF0'][k % 4], 8); fl.position.set(-1 + (k % 4) * 0.66, 0.5, k < 4 ? -0.2 : 0.2); f.add(fl); } g = f; }
  if (id === 'yard-fenceall') { const f = new THREE.Group(); for (let k = 0; k < 2; k++) { const a = await model('sub', 'fence', 2); a.position.set(-1 + k * 2, 0, 0); f.add(a); const b = await model('sub', 'fence', 2); b.rotation.y = Math.PI / 2; b.position.set(-2, 0, 1 + k * 2); f.add(b); } return f; }
  if (id === 'yard-fence') { const f = new THREE.Group(); const n = id === 'yard-fence' ? 6 : 5; for (let side = 0; side < (id === 'yard-fence' ? 1 : 2); side++) { const s = new THREE.Group(); for (let k = 0; k < n; k++) { const p = box(0.18, 1, 0.12, '#FFFFFF'); p.position.set(-1.5 + k * 0.6, 0.5, 0); s.add(p); const tip = box(0.12, 0.12, 0.13, '#FFFFFF'); tip.rotation.z = Math.PI / 4; tip.position.set(-1.5 + k * 0.6, 1.0, 0); s.add(tip); } const r = box(0.6 * n + 0.2, 0.12, 0.08, '#D9CFBF'); r.position.set(-1.5 + 0.3 * (n - 1), 0.7, 0.07); s.add(r); const r2 = r.clone(); r2.position.y = 0.3; s.add(r2); if (side === 1) { s.rotation.y = -Math.PI / 2; s.position.set(-1.6, 0, 1.6); } f.add(s); } g = f; }
  if (id === 'yard-hedge') { const f = new THREE.Group(); for (let k = 0; k < 5; k++) { const h = box(0.8, 0.9, 0.7, k % 2 ? '#3E9B4F' : '#4FB062'); h.position.set(-1.6 + k * 0.8, 0.45, 0); f.add(h); const t = sph(0.3, '#5CC072', 8); t.position.set(-1.6 + k * 0.8, 0.95, 0); f.add(t); } g = f; }
  if (id === 'yard-path') { const f = new THREE.Group(); for (let k = 0; k < 4; k++) { const st = cyl(0.42, 0.45, 0.12, k % 2 ? '#B8B2A7' : '#CEC8BC', 10); st.position.set((k % 2 ? 0.25 : -0.25), 0.06, -1.5 + k * 1); f.add(st); } g = f; }
  if (id === 'yard-planters') { const f = new THREE.Group(); [-0.9, 0.9].forEach((x) => { const pot = box(1.1, 0.6, 0.7, '#C0703E'); pot.position.set(x, 0.3, 0); f.add(pot); for (let k = 0; k < 3; k++) { const fl = sph(0.2, ['#F76AA8', '#FFC53D', '#E5484D'][k], 8); fl.position.set(x - 0.3 + k * 0.3, 0.75, 0); f.add(fl); const lf = sph(0.16, '#4FB062', 6); lf.position.set(x - 0.3 + k * 0.3, 0.6, 0.15); f.add(lf); } }); g = f; }
  if (id === 'yard-tramp') { const f = new THREE.Group(); const mat = cyl(1.4, 1.4, 0.08, '#2B2B2B', 28); mat.position.y = 0.7; f.add(mat); const rim = mesh(new THREE.TorusGeometry(1.45, 0.12, 8, 32), toon('#3E7BFA')); rim.rotation.x = Math.PI / 2; rim.position.y = 0.72; f.add(rim); for (let k = 0; k < 4; k++) { const l = cyl(0.05, 0.05, 0.7, '#55606E'); const a = (k / 4) * Math.PI * 2; l.position.set(Math.sin(a) * 1.3, 0.35, Math.cos(a) * 1.3); f.add(l); } g = f; }
  if (id === 'yard-pool') { const f = new THREE.Group(); const b = box(4, 0.4, 2.6, '#FFFFFF'); b.position.y = 0.2; f.add(b); const w = mesh(new THREE.PlaneGeometry(3.6, 2.2), new THREE.MeshStandardMaterial({ color: '#58B9E8', roughness: 0.1 }), false); w.rotation.x = -Math.PI / 2; w.position.y = 0.41; f.add(w); const duck = sph(0.2, '#FFD84D', 10); duck.position.set(0.8, 0.5, 0.3); f.add(duck); g = f; }
  return g;
}


// ---- кімнати в домі: стіни з проходами, підлога й табличка для кожної кімнати ----
type Rect = { x0: number; x1: number; z0: number; z1: number };
function roomPlan(layout: number, W: number, D: number): { rects: Rect[]; walls: { a: [number, number]; b: [number, number]; gap: number | null }[] } {
  const L = -W / 2, R = W / 2, B = -D / 2, F = D / 2;
  if (layout === 1) return { rects: [{ x0: L, x1: 0, z0: B, z1: F }, { x0: 0, x1: R, z0: B, z1: F }], walls: [{ a: [0, B], b: [0, F], gap: D * 0.15 }] };
  if (layout === 2) return { rects: [{ x0: L, x1: R, z0: B, z1: 0 }, { x0: L, x1: R, z0: 0, z1: F }], walls: [{ a: [L, 0], b: [R, 0], gap: W * 0.22 }] };
  if (layout === 3) return { rects: [{ x0: L, x1: 0, z0: B, z1: 0 }, { x0: 0, x1: R, z0: B, z1: 0 }, { x0: L, x1: R, z0: 0, z1: F }], walls: [{ a: [L, 0], b: [0, 0], gap: -W / 4 }, { a: [0, 0], b: [R, 0], gap: W / 4 }, { a: [0, B], b: [0, 0], gap: null }] };
  if (layout === 4) return { rects: [{ x0: L, x1: 0, z0: B, z1: 0 }, { x0: 0, x1: R, z0: B, z1: 0 }, { x0: L, x1: 0, z0: 0, z1: F }, { x0: 0, x1: R, z0: 0, z1: F }], walls: [{ a: [L, 0], b: [0, 0], gap: -W / 4 }, { a: [0, 0], b: [R, 0], gap: W / 4 }, { a: [0, B], b: [0, 0], gap: -D / 4 }, { a: [0, 0], b: [0, F], gap: D / 4 }] };
  return { rects: [{ x0: L, x1: R, z0: B, z1: F }], walls: [] };
}
function roomFloorTex(type: string): THREE.Texture | null {
  if (type === 'living') return null;
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 256; const x = cv.getContext('2d')!;
  if (type === 'kitchen') { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#F4F1E8' : '#3C4A5C'; x.fillRect(i * 32, j * 32, 32, 32); } }
  else if (type === 'bathroom') { x.fillStyle = '#DDF0FA'; x.fillRect(0, 0, 256, 256); x.strokeStyle = '#A9D3EA'; x.lineWidth = 3; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 32, 0); x.lineTo(i * 32, 256); x.stroke(); x.beginPath(); x.moveTo(0, i * 32); x.lineTo(256, i * 32); x.stroke(); } }
  else if (type === 'bedroom') { x.fillStyle = '#D9CCF2'; x.fillRect(0, 0, 256, 256); x.fillStyle = 'rgba(255,255,255,.35)'; for (let i = 0; i < 60; i++) { x.beginPath(); x.arc((i * 73) % 256, (i * 151) % 256, 3, 0, Math.PI * 2); x.fill(); } }
  else if (type === 'playroom') { const c = ['#FF8FB8', '#FFD36E', '#8EDBA8', '#8EC9F5', '#B79CF0']; for (let i = 0; i < 8; i++) { x.fillStyle = c[i % c.length]; x.fillRect(i * 32, 0, 32, 256); } }
  else if (type === 'study') { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#8B5E34' : '#7A5230'; x.fillRect(0, i * 32, 256, 32); } }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
function buildRoomParts(g: THREE.Group, o: { x: number; z: number }, rooms: HomeRooms | undefined, W: number, D: number, cols: { x: number; z: number; r: number }[]) {
  const layout = rooms?.layout ?? 0; const plan = roomPlan(layout, W, D);
  const wallM = toon('#F4EEE2'); const trim = toon('#C9B79C');
  plan.walls.forEach(({ a, b, gap }) => {
    const horiz = a[1] === b[1]; const lo = horiz ? a[0] : a[1], hi = horiz ? b[0] : b[1];
    const parts: [number, number][] = gap === null ? [[lo, hi]] : [[lo, gap - 1.05], [gap + 1.05, hi]];
    parts.forEach(([p0, p1]) => {
      const len = p1 - p0; if (len < 0.1) return; const mid = (p0 + p1) / 2;
      const w = mesh(new THREE.BoxGeometry(horiz ? len : 0.22, 1.15, horiz ? 0.22 : len), wallM); w.position.set(horiz ? mid : a[0], 0.575, horiz ? a[1] : mid); g.add(w);
      const t = mesh(new THREE.BoxGeometry(horiz ? len + 0.04 : 0.3, 0.08, horiz ? 0.3 : len + 0.04), trim); t.position.set(horiz ? mid : a[0], 1.19, horiz ? a[1] : mid); g.add(t);
      for (let p = p0 + 0.2; p <= p1 - 0.15; p += 0.4) cols.push({ x: o.x + (horiz ? p : a[0]), z: o.z + (horiz ? a[1] : p), r: 0.15 });
    });
  });
  if (layout === 0) return;
  plan.rects.forEach((r, i) => {
    const type = rooms?.types?.[i] ?? 'living'; const rt = ROOM_TYPES.find((x) => x.id === type) ?? ROOM_TYPES[0];
    const tex = roomFloorTex(type);
    if (tex) { const w = r.x1 - r.x0, d = r.z1 - r.z0; tex.repeat.set(w / 3, d / 3); const f = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.1, d - 0.1), new THREE.MeshToonMaterial({ map: tex, gradientMap: toon('#fff').gradientMap })); f.rotation.x = -Math.PI / 2; f.position.set((r.x0 + r.x1) / 2, 0.016, (r.z0 + r.z1) / 2); f.receiveShadow = true; g.add(f); }
    const label = rt.en.charAt(0).toUpperCase() + rt.en.slice(1);
    const sg = sign(label, '#FFFFFF', '#1A1A1A', 2.2); const cx = (r.x0 + r.x1) / 2;
    if (r.z0 <= -D / 2 + 0.01) sg.position.set(cx, 3.05, -D / 2 + 0.3); else sg.position.set(cx, 1.65, r.z0 + 0.1);
    g.add(sg);
  });
}
// ---------- мініатюри речей для магазину: малюємо справжню 3D-модель у маленьку картинку ----------
let tR: THREE.WebGLRenderer | null = null; let tS: THREE.Scene; let tC: THREE.PerspectiveCamera;
const thumbCache = new Map<string, string>(); let tq: Promise<unknown> = Promise.resolve();
export function thumbFor(id: string): Promise<string> {
  const c = thumbCache.get(id); if (c) return Promise.resolve(c);
  const job = tq.then(() => renderThumb(id)).then((u) => { if (u) thumbCache.set(id, u); return u; });
  tq = job.catch(() => ''); return job.catch(() => '');
}
async function thumbObj(id: string): Promise<THREE.Object3D | null> {
  if (id.startsWith('dish:') || PRODUCTS.some((x) => x.id === id)) return productObj(id, 1);
  const furOf = FUR.find((f) => f.id === id);
  if (furOf) return makeCat(furOf.color).root;
  if (id.startsWith('ride-')) { const g = makeRide(id); const glb: Record<string, string> = { 'ride-hatch': 'car_hatchback', 'ride-sedan': 'car_sedan', 'ride-wagon': 'car_stationwagon', 'ride-yellow': 'car_taxi', 'ride-police': 'car_police' }; if (glb[id]) { const m = await model('city', glb[id], 2.6); const b = new THREE.Box3().setFromObject(m).getSize(new THREE.Vector3()); if (b.x > b.z) m.rotation.y = Math.PI / 2; g.add(m); } return g; }
  if (id.startsWith('pet-')) return makePet(id);
  if (id.startsWith('house-')) return model('sub', HOUSES[Number(id.split('-')[1])], 7);
  if (id.startsWith('wall-') || id.startsWith('floor-')) {
    const it = SHOP.find((x) => x.id === id); const c = it?.color ?? '#F3E7D3';
    const kind = id.split('-')[1]; const t = id.startsWith('wall-') ? wallpaperTex((['stripes', 'dots', 'checks', 'waves', 'stars', 'hearts', 'bricks'].includes(kind) ? kind : 'stripes') as 'stripes', '#FFFFFF', c) : wallpaperTex('checks', c, new THREE.Color(c).multiplyScalar(0.9).getStyle());
    t.repeat.set(1.5, 1.5); const pl = new THREE.Mesh(new THREE.BoxGeometry(1.6, id.startsWith('wall-') ? 1.6 : 0.1, id.startsWith('wall-') ? 0.1 : 1.6), new THREE.MeshBasicMaterial({ map: t })); if (!id.startsWith('wall-')) pl.rotation.x = 0.5; return pl;
  }
  if (id.startsWith('yard-')) return yardItem(id);
  if (id.startsWith('x-')) return codeItem(id);
  const it = SHOP.find((x) => x.id === id);
  const part = id.split('-')[0];
  const o: Outfit = { fur: 'fur-ginger' };
  if (it) (o as Record<string, string>)[it.sub] = id;
  else if (['hair', 'top', 'bottom', 'shoes', 'hold'].includes(part)) { (o as Record<string, string>)[part] = id; if (part === 'bottom' || part === 'shoes') o.top = 'top-none'; }
  else return null;
  const rig = makeCat(FUR[0].color); wear(rig, o);
  if (it?.sub === 'bag') rig.root.rotation.y = Math.PI * 0.8;
  if (part === 'hold') { rig.armR.rotation.x = -0.7; rig.armR.rotation.z = 0.25; }
  rig.root.updateMatrixWorld(true);
  return rig.root;
}
async function renderThumb(id: string) {
  if (!tR) {
    tR = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); tR.setSize(160, 160); tR.setPixelRatio(1); tR.outputColorSpace = THREE.SRGBColorSpace;
    tS = new THREE.Scene(); tS.add(new THREE.HemisphereLight('#FFFFFF', '#9BC97A', 1.6)); const d = new THREE.DirectionalLight('#FFF4DD', 2); d.position.set(3, 5, 4); tS.add(d);
    tC = new THREE.PerspectiveCamera(30, 1, 0.05, 200);
  }
  const obj = await thumbObj(id); if (!obj) return '';
  tS.add(obj); obj.updateMatrixWorld(true);
  const b = new THREE.Box3().setFromObject(obj); const c = b.getCenter(new THREE.Vector3()); const sz = b.getSize(new THREE.Vector3());
  const r = Math.max(sz.x, sz.y, sz.z) * 0.62; const dist = r / Math.tan((15 * Math.PI) / 180);
  tC.position.set(c.x + dist * 0.45, c.y + dist * 0.3, c.z + dist * 0.85); tC.lookAt(c); tC.updateProjectionMatrix();
  tR.render(tS, tC); const url = tR.domElement.toDataURL('image/png');
  tS.remove(obj); return url;
}

// ---------- сцена ----------
export type IslandEvents = { onPoseEnd?: () => void; onNear: (spot: Spot | null) => void; onFps?: (low: boolean) => void; onStar?: (id: string) => void; onClock?: (hour: number, rain: boolean) => void; onPlace?: (x: number, z: number) => void; onPick?: (i: number) => void; onPickup?: () => void; onProp?: (i: number) => void; onPut?: (x: number, y: number, z: number) => void };
export const ROOM = { x: 400, z: 0, w: 14, d: 11 };
// що можна робити з предметом
export const USE: Record<string, string> = {
  sit: 'Sit down', sleep: 'Go to sleep', fridge: 'Open the fridge', cook: 'Cook something', tv: 'Watch TV', read: 'Read a book', music: 'Play some music',
  bath: 'Have a bath', shower: 'Have a shower', wash: 'Wash your hands', computer: 'Play a computer game', homework: 'Do your homework', coffee: 'Make hot chocolate',
  toast: 'Make toast', micro: 'Heat up some food', washer: 'Wash your clothes', plant: 'Water the plant', hug: 'Hug the teddy bear', mirror: 'Look in the mirror',
  wardrobe: 'Try on clothes', marsh: 'Roast marshmallows', swing: 'Swing', swim: 'Go for a swim', wish: 'Make a wish', lamp: 'Turn on the lamp',
  piano: 'Play the piano', paint: 'Paint a picture', aquarium: 'Feed the fish', drums: 'Play the drums', arcade: 'Play the arcade game', telescope: 'Look through the telescope',
  hoops: 'Shoot some hoops', sunbathe: 'Lie in the sun', sand: 'Build a sandcastle', picnic: 'Have a picnic', garden: 'Look after the garden', table: 'Sit and have a snack',
};
export function useKind(f: string): string | null {
  const X: Record<string, string> = { 'x-piano': 'piano', 'x-easel': 'paint', 'x-aquarium': 'aquarium', 'x-drums': 'drums', 'x-arcade': 'arcade', 'x-telescope': 'telescope' };
  if (X[f]) return X[f];
  if (/^(chair|stoolBar|loungeSofa|loungeChair|loungeDesign|bench|chairDesk)/.test(f)) return 'sit';
  if (/^bed(Single|Double|Bunk)/.test(f)) return 'sleep';
  if (/^kitchenFridge/.test(f)) return 'fridge';
  if (/^kitchenStove/.test(f)) return 'cook';
  if (/^television/.test(f)) return 'tv';
  if (/^(bookcase|books)/.test(f)) return 'read';
  if (/^(radio|speaker)/.test(f)) return 'music';
  if (f === 'bathtub') return 'bath';
  if (/^shower/.test(f)) return 'shower';
  if (/^(bathroomSink|kitchenSink)/.test(f)) return 'wash';
  if (/^(computerScreen|laptop)/.test(f)) return 'computer';
  if (/^desk/.test(f)) return 'homework';
  if (f === 'kitchenCoffeeMachine') return 'coffee';
  if (f === 'toaster') return 'toast';
  if (f === 'kitchenMicrowave') return 'micro';
  if (/^washer/.test(f)) return 'washer';
  if (f === 'pottedPlant') return 'plant';
  if (f === 'bear') return 'hug';
  if (f === 'bathroomMirror') return 'mirror';
  if (/^coatRack/.test(f)) return 'wardrobe';
  if (/^lamp/.test(f)) return 'lamp';
  return null;
}
export type UseMeta = { kind: string; x: number; z: number; y: number; rot: number; room: string };
export type Pose = { kind: 'sit' | 'sleep' | 'use' | 'swim' | 'swing' | 'ground'; x: number; z: number; y: number; rot: number };
// інтер'єри будівель: [файл меблів, x, z, поворот, на чому стоїть (індекс)]
type IItem = [string, number, number, number, number?];
type IDef = { id: string; job: string; title?: string; floor: [string, string]; wall: string; items: IItem[]; npc?: [string, string, number, number, string?]; spot: [number, number]; w?: number; d?: number; model?: string };
const BAR = (z = -2.6, n = 4): IItem[] => Array.from({ length: n }, (_, i) => ['kitchenBar', (i - (n - 1) / 2) * 1.03, z, 0] as IItem);
export const INTERIORS: IDef[] = [
  { id: 'post', job: 'post', title: 'POST OFFICE', floor: ['#E9DCC3', '#DCCDB0'], wall: '#F7D9D6', npc: ['Postmaster Pepper', '#9AA3AE', 0, -3.7, 'hat-cap'], spot: [0, -1.3],
    items: [...BAR(), ['cardboardBoxClosed', -1.5, -2.6, 0.3, 0], ['cardboardBoxOpen', 1.5, -2.6, 0, 3], ['bookcaseClosedWide', -4.2, -4.95, 0], ['bookcaseClosedWide', 3.6, -4.95, 0], ['cardboardBoxClosed', 5, -2, 0.4], ['cardboardBoxClosed', 5.6, -1.4, 0], ['cardboardBoxClosed', 5, -2, 0.2, 8], ['pottedPlant', 6.2, 4.4, 0], ['rugRound', 0, 1.2, 0], ['chair', -5.6, -1, 1.57]] },
  { id: 'cafe', job: 'cafe', title: 'CAT CAFE', floor: ['#F7E1EA', '#EFD0DD'], wall: '#FFF1F6', npc: ['Chef Mia', '#F7F3EA', 0, -3.7, 'hat-chef'], spot: [0, -1.3],
    items: [...BAR(), ['kitchenCoffeeMachine', -0.5, -2.6, 0, 1], ['toaster', 0.6, -2.6, 0, 2], ['kitchenFridge', -3.4, -4.95, 0], ['kitchenCabinet', -2.3, -4.95, 0],
      ['tableRound', -3.6, 1.6, 0], ['chair', -4.7, 1.6, 1.57], ['chair', -2.5, 1.6, -1.57], ['tableRound', 1.4, 2.2, 0], ['chair', 0.3, 2.2, 1.57], ['chair', 2.5, 2.2, -1.57], ['tableRound', 4.8, 0, 0], ['chair', 4.8, 1.1, 3.14], ['chair', 4.8, -1.1, 0], ['pottedPlant', 6.2, -4.6, 0]] },
  { id: 'store', job: 'store', title: 'MURLY STORE', floor: ['#E7E2F7', '#DAD3F0'], wall: '#F3F0FF', npc: ['Mr Button', '#B79CF0', 0, -3.7, 'glasses-round'], spot: [0, -1.3],
    items: [...BAR(), ['bookcaseOpen', -5.8, -4.95, 0], ['bookcaseOpen', -4.8, -4.95, 0], ['bookcaseOpen', -3.8, -4.95, 0], ['cabinetTelevision', 3.4, -4.95, 0], ['televisionModern', 3.4, -4.95, 0, 7], ['speaker', 5.2, -4.95, 0], ['speaker', 1.8, -4.95, 0],
      ['cardboardBoxClosed', 5.2, 1.2, 0.3], ['cardboardBoxOpen', 5.8, 2, 0], ['rugRound', 0, 1.3, 0], ['lampRoundFloor', 6.2, -2.5, 0], ['loungeChair', -4.8, -1.2, 1.57]] },
  { id: 'bakery', job: 'bakery', title: 'BAKERY', floor: ['#F3E2C8', '#E8D3B2'], wall: '#FFF6E8', npc: ['Baker Bob', '#F4A340', 0, -3.7, 'hat-chef'], spot: [0, -1.3],
    items: [...BAR(), ['toaster', -1.5, -2.6, 0, 0], ['kitchenStove', -4.6, -4.8, 0], ['kitchenStove', -3.5, -4.8, 0], ['kitchenCabinet', -2.4, -4.8, 0], ['kitchenFridgeLarge', 4.6, -4.8, 0], ['kitchenCabinet', 3.4, -4.8, 0], ['kitchenCoffeeMachine', 3.4, -4.8, 0, 9],
      ['tableCloth', 3.2, 2.2, 0], ['chair', 2.1, 2.2, 1.57], ['chair', 4.3, 2.2, -1.57], ['pottedPlant', -5.6, 4.4, 0]] },
  { id: 'boutique', job: 'boutique', title: 'BOUTIQUE', floor: ['#DDF0E4', '#CCE7D6'], wall: '#F2FBF5', npc: ['Miss Silk', '#F7A8C8', 0, -3.7, 'hat-flower'], spot: [0, -1.3],
    items: [...BAR(-2.6, 2), ['coatRackStanding', -4.8, -4.6, 0], ['coatRackStanding', -3.6, -4.6, 0], ['coatRackStanding', -2.4, -4.6, 0], ['coatRackStanding', 3.4, -4.6, 0], ['coatRackStanding', 4.6, -4.6, 0], ['coatRackStanding', 5.4, 0.4, 0],
      ['loungeSofa', -2.4, 3.9, 3.14], ['rugRound', 1.5, 2.0, 0], ['bookcaseClosedWide', 1.8, -4.95, 0], ['pottedPlant', 6.2, -4.6, 0]] },
  { id: 'tent', job: 'campbook', title: 'CAMP MURLY', floor: ['#B7D98A', '#A6CC78'], wall: '#E9E2C3', spot: [3.6, 1.2],
    items: [['bedSingle', -3.4, -3.6, 0], ['bedSingle', -1.2, -3.6, 0], ['lampRoundFloor', 1.6, -4.8, 0], ['cardboardBoxOpen', 4.2, -4.4, 0.3], ['rugRound', -2.2, 0.4, 0], ['radio', 5.2, -2.2, -1.57], ['chair', 3.6, 0, 3.14]] },
  { id: 'school', job: 'school', title: 'MURLY SCHOOL', floor: ['#E7E2F7', '#DAD3F0'], wall: '#FFF8E1', npc: ['Miss Apple', '#F7F3EA', 0, -4.2, 'glasses-round'], spot: [0, -2.8],
    items: [['desk', -3.6, -0.6, 3.14], ['chair', -3.6, 0.3, 3.14], ['desk', -1.2, -0.6, 3.14], ['chair', -1.2, 0.3, 3.14], ['desk', 1.2, -0.6, 3.14], ['chair', 1.2, 0.3, 3.14], ['desk', 3.6, -0.6, 3.14], ['chair', 3.6, 0.3, 3.14],
      ['desk', -2.4, 2.4, 3.14], ['chair', -2.4, 3.3, 3.14], ['desk', 2.4, 2.4, 3.14], ['chair', 2.4, 3.3, 3.14], ['bookcaseOpen', 5.8, -4.95, 0], ['bookcaseOpen', 4.8, -4.95, 0], ['pottedPlant', -6.2, -4.6, 0], ['books', -3.6, -0.6, 0, 0], ['laptop', 3.6, -0.6, 3.14, 6]] },
  { id: 'supermarket', job: 'checkout', title: 'SUPERMARKET', floor: ['#F4F1E8', '#E6E2D6'], wall: '#FFFFFF', w: 20, d: 14, npc: ['Cashier Sam', '#8FE3C4', -3, 6.1, 'hat-cap'], spot: [-3, 3.9],
    items: [['kitchenBar', -3.5, 5.1, Math.PI], ['kitchenBar', -2.5, 5.1, Math.PI], ['cardboardBoxClosed', 8.5, 5.6, 0.3], ['cardboardBoxClosed', 8.9, 5, 0], ['pottedPlant', 9.3, -6.2, 0]] },
  { id: 'lighthouse', job: 'keeper', title: 'LIGHTHOUSE', floor: ['#E1E6EC', '#D3DAE2'], wall: '#FFFFFF', npc: ['Captain Ted', '#3A3A44', 0, -2, 'hat-beanie'], spot: [0, -0.7],
    items: [['desk', 3, -4.85, 0], ['radio', 3, -4.85, 0, 0], ['chair', 3, -3.8, 3.14], ['bedSingle', -4.8, -3.6, 0], ['bookcaseOpen', 5.6, -4.95, 0], ['x-telescope', -1.8, -4.2, 0], ['lampRoundFloor', -2.8, -4.9, 0], ['rugRound', 0, -1, 0], ['pottedPlant', 6.2, 4.4, 0]] },
];
// ---- будинки на вулицях: кожен свого розміру, з господарем і своїми меблями ----
const K = {
  kitchen: (x0: number, b: number): IItem[] => [['kitchenFridge', x0, b, 0], ['kitchenCabinet', x0 + 1.03, b, 0], ['kitchenStove', x0 + 2.06, b, 0], ['kitchenSink', x0 + 3.09, b, 0], ['kitchenCabinet', x0 + 4.12, b, 0]],
  dining: (x: number, z: number, n = 4): IItem[] => [['tableRound', x, z, 0], ['chair', x - 1.15, z, Math.PI / 2], ['chair', x + 1.15, z, -Math.PI / 2], ...(n > 2 ? [['chair', x, z - 1.15, 0], ['chair', x, z + 1.15, Math.PI]] as IItem[] : [])],
  living: (x: number, b: number, z: number): IItem[] => [['cabinetTelevision', x, b, 0], ['televisionModern', x, b, 0, -1], ['rugRounded', x, z - 0.3, 0], ['tableCoffee', x, z - 0.4, 0], ['loungeSofa', x, z + 0.9, Math.PI], ['lampRoundFloor', x + 1.8, z + 1, 0]],
  bed: (x: number, b: number, double = true): IItem[] => [[double ? 'bedDouble' : 'bedSingle', x, b + 1.4, 0], ['cabinetBed', x - (double ? 1.5 : 1.1), b + 0.2, 0], ['cabinetBedDrawer', x + (double ? 1.5 : 1.1), b + 0.2, 0], ['lampRoundTable', x - (double ? 1.5 : 1.1), b + 0.2, 0, -1]],
  study: (x: number, b: number): IItem[] => [['desk', x, b, 0], ['computerScreen', x, b, 0, -1], ['chairDesk', x, b + 0.9, Math.PI], ['bookcaseOpen', x + 1.6, b, 0]],
};
// '-1' у полі «на чому» = на попередньому предметі
function fixOn(list: IItem[]): IItem[] { return list.map((it, i) => (it[4] === -1 ? [it[0], it[1], it[2], it[3], i - 1] as IItem : it)); }
function houseDef(a: { id: string; model: string }, who: [string, string, string?], w: number, d: number, job: string, items: (W: number, D: number, b: number) => IItem[], floor: [string, string]): IDef {
  const b = -d / 2 + 0.55;
  return { id: `house-${a.id}`, job, floor, wall: '#F3E7D3', model: a.model, w, d, npc: [who[0], who[1], 0.6, 0, who[2]], spot: [0.6, 1.3], items: fixOn(items(w, d, b)) };
}
const HOUSE_DEFS: IDef[] = [
  houseDef(ADDRS[0], ['Grandma Rose', '#F7F3EA', 'glasses-round'], 11, 9, 'guest', (W, D, b) => [...K.kitchen(-W / 2 + 0.9, b), ...K.dining(-1.6, 0.6, 2), ...K.living(W / 2 - 2.4, b, 0.4), ['pottedPlant', W / 2 - 0.6, D / 2 - 0.7, 0], ['bear', -0.2, 0.6, 0, -1]], ['#D9B38C', '#CFA67C']),
  houseDef(ADDRS[1], ['Lily', '#F7A8C8', 'bow-pink'], 14, 11, 'visit', (W, D, b) => [...K.kitchen(-W / 2 + 0.9, b), ...K.dining(-3, 0.8), ...K.living(3.2, b, 0.5), ['bedBunk', W / 2 - 1.2, D / 2 - 2, Math.PI / 2], ['pottedPlant', -W / 2 + 0.6, -D / 2 + 3, 0]], ['#F3E2C8', '#E8D3B2']),
  houseDef(ADDRS[2], ['Captain Paws', '#3A3A44', 'hat-beanie'], 15, 11, 'visit', (W, D, b) => [['x-piano', -W / 2 + 2, b + 0.3, 0], ['x-drums', -W / 2 + 4.8, b + 0.7, 0], ['x-aquarium', 0.8, b + 0.2, 0], ['x-telescope', W / 2 - 1.2, b + 0.8, -0.5], ...K.living(3.6, b + 2.2, 2.2).slice(2), ['bookcaseOpen', W / 2 - 2.6, b, 0], ['rugRound', -2, 1.5, 0]], ['#C9D8E8', '#B8CADD']),
  houseDef(ADDRS[3], ['Grandma Whiskers', '#9AA3AE', 'glasses-round'], 12, 9, 'visit', (W, D, b) => [...K.kitchen(-W / 2 + 0.9, b), ...K.bed(W / 2 - 2.2, b), ['loungeChair', -1, 1.4, Math.PI * 0.8], ['pottedPlant', -2.2, 2.6, 0], ['pottedPlant', W / 2 - 0.6, D / 2 - 0.7, 0], ['rugRounded', -1, 0.8, 0]], ['#E9DCC3', '#DCCDB0']),
  houseDef(ADDRS[4], ['Tom', '#F4A340', 'hat-cap'], 14, 10, 'visit', (W, D, b) => [['x-arcade', -W / 2 + 1.2, b + 0.2, 0], ...K.study(-W / 2 + 3.2, b), ...K.living(2.6, b, 0.6), ['bedBunk', W / 2 - 1.1, D / 2 - 1.9, -Math.PI / 2], ['speaker', 0.3, b, 0], ['rugSquare', -2.6, 1.3, 0]], ['#DCE9F7', '#C9DCF0']),
  houseDef(ADDRS[5], ['Daisy', '#F7F3EA', 'hat-flower'], 16, 12, 'visit', (W, D, b) => [...K.kitchen(-W / 2 + 0.9, b), ...K.dining(-3.6, 1), ...K.living(3.4, b, 0.6), ['x-aquarium', W / 2 - 1.3, b + 0.2, 0], ['x-piano', -0.2, b + 0.3, 0], ['pottedPlant', W / 2 - 0.6, D / 2 - 0.7, 0], ['pottedPlant', -W / 2 + 0.6, D / 2 - 3.4, 0]], ['#F7E1EA', '#EFD0DD']),
  houseDef(ADDRS[6], ['Professor Meow', '#B79CF0', 'glasses-round'], 13, 10, 'visit', (W, D, b) => [['bookcaseOpen', -W / 2 + 1, b, 0], ['bookcaseOpen', -W / 2 + 2, b, 0], ['bookcaseClosedWide', -W / 2 + 3.4, b, 0], ...K.study(0.4, b), ['x-telescope', W / 2 - 1.2, b + 0.6, -0.4], ['x-easel', W / 2 - 1.4, 1.8, -Math.PI / 2], ['loungeChair', -2, 1.4, Math.PI * 0.8], ['rugRound', -1.2, 1, 0]], ['#E7E2F7', '#DAD3F0']),
  houseDef(ADDRS[7], ['Ruby', '#E5484D', 'hat-flower'], 12, 9, 'visit', (W, D, b) => [['coatRackStanding', -W / 2 + 1, b + 0.2, 0], ['coatRackStanding', -W / 2 + 2, b + 0.2, 0], ['x-easel', -W / 2 + 3.4, b + 0.5, 0], ...K.bed(W / 2 - 2, b, false), ['loungeSofa', -0.6, 1.6, Math.PI], ['tableCoffee', -0.6, 0.5, 0], ['pottedPlant', W / 2 - 0.6, D / 2 - 0.7, 0], ['rugRounded', -0.6, 0.8, 0]], ['#FFF1CC', '#FFE4A8']),
];

function wearHat(rig: Rig, item: string) {
  const cols = rig.fur.map((m) => m.color.clone());
  const slot = SHOP.find((x) => x.id === item)?.sub ?? 'hat';
  wear(rig, { fur: 'fur-ginger', [slot]: item } as Outfit); rig.fur.forEach((m, i) => m.color.copy(cols[i]));
}
const FK = 2.4;
// зірки, які можна знайти на острові
export const STARS: [number, number][] = [[-60, 20], [55, 30], [10, -55], [-35, -45], [62, -5], [-8, 48], [40, -40], [-58, -22], [25, 55], [-22, 2]];
const NPC_NAMES = ['Mr Fluff', 'Lily', 'Captain Paws', 'Grandma Whiskers', 'Tom', 'Daisy', 'Professor Meow', 'Ruby'];
export class IslandScene {
  renderer: THREE.WebGLRenderer; scene = new THREE.Scene(); cam: THREE.PerspectiveCamera;
  clock = new THREE.Clock(); raf = 0; disposed = false;
  hero: Rig; heroPos = new THREE.Vector3(0, 0, 8); heroRot = Math.PI; vel = new THREE.Vector3(); vy = 0; onGround = true;
  camYaw = Math.PI; camPitch = 0.42; camDist = 9;
  keys = new Set<string>(); joy = { x: 0, y: 0 }; run = false;
  colliders: { x: number; z: number; r: number }[] = [];
  spots: Spot[] = []; near: Spot | null = null;
  ride: THREE.Group | null = null; rideId: string | null = null;
  pet: THREE.Group | null = null; petPos = new THREE.Vector3(); petId: string | null = null;
  homeGroup = new THREE.Group(); yardGroup = new THREE.Group();
  marker: THREE.Group; markerOn = false; carry: THREE.Mesh;
  water: THREE.Mesh; npcs: { rig: Rig; home: THREE.Vector3; t: number; goal: THREE.Vector3 }[] = [];
  clouds: THREE.Group[] = []; tramp: THREE.Vector3 | null = null;
  ev: IslandEvents; el: HTMLElement; wob = { lean: 0, leanV: 0, sq: 1, sqV: 0 };
  ro: ResizeObserver;
  goal: THREE.Vector3 | null = null; goalRing: THREE.Mesh | null = null; danceT = 0;
  hemi!: THREE.HemisphereLight; cloudMat = new THREE.MeshToonMaterial({ color: '#FFFFFF' });
  dayP = 0.1; rain = 0; raining = false; weatherT = 70; rainObj: THREE.LineSegments | null = null;
  glows: THREE.Mesh[] = []; beam: THREE.Mesh | null = null; skyStars: THREE.Points | null = null; moon: THREE.Mesh | null = null;
  flies: { g: THREE.Group; c: THREE.Vector3; ph: number; glow: boolean }[] = []; birds: { g: THREE.Group; r: number; h: number; ph: number; v: number }[] = [];
  boats: { g: THREE.Group; r: number; ph: number; v: number }[] = []; lastHour = -1;
  inside = false; roomId: string | null = null; cur = { x: ROOM.x, z: ROOM.z }; sizes: Record<string, { w: number; d: number }> = {}; roomColsExtra: { room: string; x: number; z: number; r: number }[] = []; shelfPos: Record<string, { x: number; z: number }> = {}; curW = ROOM.w; curD = ROOM.d; origins: Record<string, { x: number; z: number }> = {}; roomCols: Record<string, { x: number; z: number; r: number }[]> = {}; keepers: Rig[] = [];
  outPos = new THREE.Vector3(); roomGroup = new THREE.Group(); roomItems = new THREE.Group(); roomCol: { x: number; z: number; r: number }[] = [];
  portrait = false; portraitShift = 1.2;
  focus: { x: number; y: number; z: number } | null = null;
  propsGroup = new THREE.Group(); propSeq = 0; heldObj: THREE.Object3D | null = null; heldId: string | null = null;
  async setProps(list: { f: string; x: number; y: number; z: number }[]) {
    const seq = ++this.propSeq; const objs = await Promise.all(list.map((p) => productObj(p.f, 0.45).catch(() => new THREE.Group())));
    if (seq !== this.propSeq) return; this.propsGroup.clear();
    objs.forEach((o, i) => { const p = list[i]; o.position.set(p.x, p.y, p.z); o.traverse((q) => { q.userData.prop = i; }); o.userData.prop = i; this.propsGroup.add(o); });
  }
  async setHeld(id: string | null) {
    if (this.heldObj) { this.hero.slots.held.remove(this.heldObj); this.heldObj = null; } this.heldId = id;
    if (!id) { this.hero.root.userData.holding = !!this.hero.slots.hand.children.length; return; }
    const o = await productObj(id, 0.36); if (this.heldId !== id) return; o.position.set(0, -0.05, 0.12); this.hero.slots.held.add(o); this.heldObj = o; this.hero.root.userData.holding = true;
  }
  surfaceAt(ray: THREE.Raycaster): THREE.Vector3 | null {
    const targets: THREE.Object3D[] = []; this.scene.children.forEach((c) => { if (c !== this.hero.root && c !== this.water && c.visible) targets.push(c); });
    const hits = ray.intersectObjects(targets, true);
    for (const h of hits) { if (h.object.userData.prop !== undefined) continue; const n = h.face?.normal.clone().transformDirection(h.object.matrixWorld); if (n && n.y > 0.7 && h.point.distanceTo(this.heroPos) < 7) return h.point.clone(); }
    return null;
  }
  pose: Pose | null = null; useMeta: Record<string, UseMeta> = {}; useN = 0; bubbleObj: THREE.Sprite | null = null; bubbleT = 0; nameTag: THREE.Sprite | null = null;
  followers = new Set<number>(); npcDanceT: number[] = []; npcBubbles: (THREE.Sprite | null)[] = [];
  placing: string | null = null; decorate = false; roomList: RoomItem[] = []; roomSeq = 0;
  stars: { id: string; obj: THREE.Group }[] = []; got = new Set<string>();
  ray = new THREE.Raycaster(); ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  constructor(el: HTMLElement, ev: IslandEvents) {
    this.el = el; this.ev = ev;
    const low = /Android|iPhone|iPad/i.test(navigator.userAgent) && (navigator.hardwareConcurrency ?? 4) <= 4;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, low ? 1.5 : 2));
    this.renderer.shadowMap.enabled = true; this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NeutralToneMapping; this.renderer.toneMappingExposure = 1.05;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(this.renderer.domElement);
    // м'яке світло оточення: моделі виглядають об'ємно й чисто, як у Sims
    { const pm = new THREE.PMREMGenerator(this.renderer); this.scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; pm.dispose(); (this.scene as THREE.Scene & { environmentIntensity?: number }).environmentIntensity = 0.45; }
    this.cam = new THREE.PerspectiveCamera(55, 1, 0.1, 600);
    this.scene.background = new THREE.Color('#9ED8F7');
    this.scene.fog = new THREE.Fog('#BFE6FA', 70, 220);

    const hemi = new THREE.HemisphereLight('#E8F6FF', '#9BC97A', 1.25); this.scene.add(hemi); this.hemi = hemi; this.cloudMat.gradientMap = toon('#fff').gradientMap;
    const sun = new THREE.DirectionalLight('#FFF4DD', 2.3); sun.position.set(40, 60, 25); sun.castShadow = true;
    sun.shadow.mapSize.set(low ? 1024 : 4096, low ? 1024 : 4096); sun.shadow.radius = 3;
    const sc = sun.shadow.camera as THREE.OrthographicCamera; sc.left = -40; sc.right = 40; sc.top = 40; sc.bottom = -40; sc.far = 160; sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.03;
    this.scene.add(sun, sun.target); this.sun = sun;

    this.buildGround();
    this.water = this.buildWater();
    this.hero = makeCat(FUR[0].color);
    this.scene.add(this.hero.root);
    this.carry = box(0.6, 0.45, 0.6, '#C8925A'); this.carry.visible = false; this.hero.body.add(this.carry); this.carry.position.set(0, 1.0, 0.55);
    const tape = box(0.62, 0.08, 0.2, '#F3D9B1'); tape.position.y = 0.2; this.carry.add(tape);
    this.marker = this.buildMarker();
    this.scene.add(this.homeGroup, this.yardGroup);
    void this.buildTown();
    this.buildSky(); this.buildLife(); this.buildRoom();

    const resize = () => { const w = el.clientWidth || 1, h = el.clientHeight || 1; this.renderer.setSize(w, h); this.cam.aspect = w / h; this.cam.updateProjectionMatrix(); };
    this.ro = new ResizeObserver(resize); this.ro.observe(el); resize();
    window.addEventListener('keydown', this.kd); window.addEventListener('keyup', this.ku);
    const cv = this.renderer.domElement;
    cv.addEventListener('pointerdown', this.pd); window.addEventListener('pointermove', this.pm); window.addEventListener('pointerup', this.pu);
    cv.addEventListener('wheel', this.wh, { passive: true });
    this.loop();
  }
  sun: THREE.DirectionalLight;

  // ---- земля, пісок, дороги ----
  buildGround() {
    const R = 78;
    const g = new THREE.CircleGeometry(R, 96, 0, Math.PI * 2); g.rotateX(-Math.PI / 2);
    const sand = mesh(g, toon('#F3DFA7'), false); sand.position.y = -0.05; this.scene.add(sand);
    const gg = new THREE.CircleGeometry(68, 96); gg.rotateX(-Math.PI / 2);
    const pos = gg.attributes.position as THREE.BufferAttribute;
    // трава з легкими пагорбами по краях
    for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), z = pos.getZ(i); const d = Math.hypot(x, z); pos.setY(i, d > 55 ? Math.sin(x * 0.2) * Math.cos(z * 0.17) * 0.6 * ((d - 55) / 13) : 0); }
    gg.computeVertexNormals();
    const grass = mesh(gg, toon('#8BCB62'), false); this.scene.add(grass);
    // дороги: хрест і кільце
    const road = toon('#6E7480'); const line = toon('#FFFFFF');
    const strip = (x: number, z: number, w: number, l: number, rot = 0) => {
      const r = mesh(new THREE.PlaneGeometry(w, l), road, false); r.rotation.x = -Math.PI / 2; r.rotation.z = rot; r.position.set(x, 0.02, z); this.scene.add(r);
      const n = Math.floor(l / 3);
      for (let i = 0; i < n; i++) { const d = mesh(new THREE.PlaneGeometry(0.25, 1.4), line, false); d.rotation.x = -Math.PI / 2; d.rotation.z = rot; const t = -l / 2 + 1.5 + i * 3; d.position.set(x + Math.sin(rot) * -t * 0 + (rot ? t : 0), 0.03, z + (rot ? 0 : t)); this.scene.add(d); }
    };
    strip(0, 0, 6, 110); strip(0, 0, 6, 110, Math.PI / 2);
    const ring = mesh(new THREE.RingGeometry(30, 35, 72), road, false); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.015; this.scene.add(ring);
    // площа з фонтаном
    const plaza = mesh(new THREE.CircleGeometry(9, 40), toon('#E9DCC3'), false); plaza.rotation.x = -Math.PI / 2; plaza.position.y = 0.035; this.scene.add(plaza);
    const basin = cyl(3.2, 3.4, 0.7, '#D8CBB0', 32); basin.position.y = 0.35; this.scene.add(basin);
    const pool = mesh(new THREE.CircleGeometry(2.9, 32), new THREE.MeshStandardMaterial({ color: '#58B9E8', roughness: 0.15, metalness: 0.1 }), false); pool.rotation.x = -Math.PI / 2; pool.position.y = 0.68; this.scene.add(pool);
    const col = cyl(0.35, 0.5, 2, '#D8CBB0'); col.position.y = 1.4; this.scene.add(col);
    const top = cyl(1.1, 0.4, 0.3, '#D8CBB0', 24); top.position.y = 2.4; this.scene.add(top);
    const fishy = makeCat('#F4A340', 0.7); fishy.root.position.y = 2.55; fishy.armL.rotation.z = -2.6; fishy.armR.rotation.z = 2.6; this.scene.add(fishy.root);
    this.colliders.push({ x: 0, z: 0, r: 3.6 });
  }
  buildWater(): THREE.Mesh {
    const g = new THREE.PlaneGeometry(600, 600, 120, 120); g.rotateX(-Math.PI / 2);
    const m = new THREE.MeshStandardMaterial({ color: '#3FB4E6', roughness: 0.2, metalness: 0.05, transparent: true, opacity: 0.92, flatShading: true });
    const w = new THREE.Mesh(g, m); w.position.y = -0.25; w.receiveShadow = true; this.scene.add(w);
    const foam = mesh(new THREE.RingGeometry(77.5, 80, 96), new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.55 }), false); foam.rotation.x = -Math.PI / 2; foam.position.y = -0.12; this.scene.add(foam);
    return w;
  }
  buildMarker() {
    const g = new THREE.Group();
    const ring = mesh(new THREE.TorusGeometry(1.4, 0.12, 8, 36), toon('#FFC53D', 0.6), false); ring.rotation.x = Math.PI / 2; ring.position.y = 0.15; g.add(ring);
    const arr = mesh(new THREE.ConeGeometry(0.45, 0.8, 4), toon('#FFC53D', 0.6), false); arr.rotation.x = Math.PI; arr.position.y = 4.2; arr.name = 'arrow'; g.add(arr);
    g.visible = false; this.scene.add(g); return g;
  }

  async buildTown() {
    const add = async (p: string, name: string, x: number, z: number, size: number, rot = 0, col = 0) => {
      const m = await model(p, name, size); m.position.set(x, 0, z); m.rotation.y = rot; this.scene.add(m);
      if (col) this.colliders.push({ x, z, r: col });
      return m;
    };
    // громадські будівлі
    const pub: [string, number, number, number, string, string, string][] = [
      ['building_A', -18, -16, 0, 'POST OFFICE', '#E5484D', 'post'],
      ['building_C', 18, -16, 0, 'CAT CAFE', '#F76AA8', 'cafe'],
      ['building_B', 18, 16, Math.PI, 'MURLY STORE', '#7C66DC', 'store'],
    ];
    for (const [file, x, z, rot, label, bg, id] of pub) {
      const m = await add('city', file, x, z, 9, rot, 5.2);
      const h = new THREE.Box3().setFromObject(m).max.y;
      const s = sign(label, bg, '#FFFFFF', 6); s.position.set(x, h + 1.4, z); this.scene.add(s);
      const dz = z + (rot ? -5.6 : 5.6);
      this.spots.push({ id: `enter-${id}`, x, z: dz, r: 2.6, label });
      const mat = mesh(new THREE.CircleGeometry(1.3, 24), toon(bg), false); mat.rotation.x = -Math.PI / 2; mat.position.set(x, 0.04, dz); this.scene.add(mat);
    }
    // пекарня і бутик
    for (const [id, file] of [['bakery', 'building_D'], ['boutique', 'building_E'], ['school', 'building_F']] as const) {
      const P = PLACES[id]; const m = await add('city', file, P.x, P.z, 9, 0, 5.2);
      const h = new THREE.Box3().setFromObject(m).max.y;
      const sg = sign(P.label, P.color, '#FFFFFF', 6); sg.position.set(P.x, h + 1.4, P.z); this.scene.add(sg);
      this.spots.push({ id: `enter-${id}`, x: P.x, z: P.z + 5.6, r: 2.6, label: P.label });
      const mat = mesh(new THREE.CircleGeometry(1.3, 24), toon(P.color), false); mat.rotation.x = -Math.PI / 2; mat.position.set(P.x, 0.04, P.z + 5.6); this.scene.add(mat);
    }
    this.buildBakeryDeco(PLACES.bakery.x, PLACES.bakery.z + 4.4);
    { const P = PLACES.supermarket; const m = await add('city', 'building_G', P.x, P.z, 10, Math.PI, 5.6); const h = new THREE.Box3().setFromObject(m).max.y;
      const sg = sign(P.label, P.color, '#FFFFFF', 6.5); sg.position.set(P.x, h + 1.4, P.z); this.scene.add(sg);
      this.spots.push({ id: 'enter-supermarket', x: P.x, z: P.z - 5.9, r: 2.6, label: P.label });
      const mat = mesh(new THREE.CircleGeometry(1.3, 24), toon(P.color), false); mat.rotation.x = -Math.PI / 2; mat.position.set(P.x, 0.04, P.z - 5.9); this.scene.add(mat);
      for (let i = 0; i < 3; i++) { const cart = box(0.8, 0.6, 1.1, '#B8C2CC'); cart.position.set(P.x + 3 + i * 0.3, 0.6, P.z - 6.5 + i * 0.2); this.scene.add(cart); } }

    // стоянка таксі
    { const T = PLACES.taxi; const pole = cyl(0.08, 0.08, 3, '#55606E'); pole.position.set(T.x + 1.6, 1.5, T.z); this.scene.add(pole);
      const sg = sign('TAXI', '#FFC53D', '#1A1A1A', 2.6); sg.position.set(T.x + 1.6, 3.4, T.z); this.scene.add(sg);
      const car = makeRide('ride-taxi'); car.children.slice(-1)[0].visible = false; car.position.set(T.x - 1.2, 0, T.z - 1); car.rotation.y = Math.PI / 2; this.scene.add(car);
      this.colliders.push({ x: T.x - 1.2, z: T.z - 1, r: 1.3 });
      this.spots.push({ id: 'taxi', x: T.x + 0.4, z: T.z + 1.8, r: 2.4, label: 'TAXI' }); }
    this.buildPier();
    this.buildIceCream(); this.buildBoard(); this.buildCampsite(48, 18); this.buildFun();
    this.mural('MURLY ISLAND', ['#F76AA8', '#FFC53D', '#3E7BFA', '#30A46C'], -6, 24); this.mural('BE KIND', ['#7C66DC', '#F5862D', '#E5484D'], 24, -50); this.mural('HELLO!', ['#30A46C', '#3E7BFA', '#FFC53D'], -48, -32);
    // фруктовий ринок: власний ларьок
    this.buildStall(-18, 16); this.spots.push({ id: 'market', x: -18, z: 11.5, r: 2.6, label: 'FRUIT MARKET' });
    // будинки для доставки з номерами
    for (const a of ADDRS) {
      await add('sub', a.model, a.x, a.z, 7.5, a.rot, 4.2);
      const fx = a.x + Math.sin(a.rot) * 5, fz = a.z + Math.cos(a.rot) * 5;
      const post = cyl(0.08, 0.08, 1.2, '#6B4F2A'); post.position.set(fx + 1.4, 0.6, fz); this.scene.add(post);
      const mb = box(0.5, 0.4, 0.7, '#3E7BFA'); mb.position.set(fx + 1.4, 1.35, fz); this.scene.add(mb);
      const s = sign(`No ${a.no}`, '#FFFFFF', '#1A1A1A', 1.8); s.position.set(fx + 1.4, 2.2, fz); this.scene.add(s);
      this.spots.push({ id: `door-${a.id}`, x: fx, z: fz, r: 2.4, label: `${a.no} ${a.street}` });
    }
    // таблички вулиць
    const street = (t: string, x: number, z: number) => { const p = cyl(0.07, 0.07, 2.6, '#55606E'); p.position.set(x, 1.3, z); this.scene.add(p); const s = sign(t, '#30A46C', '#FFFFFF', 3.4); s.position.set(x, 3, z); this.scene.add(s); };
    street('Sunny Street', -34, 4); street('Oak Street', 12, 30); street('Beach Road', 40, -4);
    // дитячий майданчик і великий дуб (орієнтири з адрес)
    const oak = await add('nature', 'tree_oak', -46, -14, 6, 0, 1.2); oak.scale.setScalar(1.3);
    this.buildPlayground(-30, 10);
    this.buildLighthouse(56, -42);
    // дерева, кущі, квіти
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const free = (x: number, z: number) => this.colliders.every((c) => Math.hypot(c.x - x, c.z - z) > c.r + 2.5) && Math.abs(x) > 5 && Math.abs(z) > 5 && Math.abs(Math.hypot(x, z) - 32.5) > 4.5 && Math.hypot(x - HOME.x, z - HOME.z) > 12;
    const trees = ['tree_default', 'tree_fat', 'tree_pineRoundA', 'tree_small', 'tree_oak'];
    let n = 0;
    for (let i = 0; i < 400 && n < 70; i++) {
      const a = Math.random() * Math.PI * 2, d = rnd(12, 62); const x = Math.cos(a) * d, z = Math.sin(a) * d;
      if (!free(x, z)) continue;
      n++;
      void add('nature', trees[n % trees.length], x, z, rnd(2.6, 4.2), rnd(0, 6), 0.7);
    }
    for (let i = 0; i < 26; i++) { const a = (i / 26) * Math.PI * 2 + rnd(-0.05, 0.05); const d = rnd(70, 74); void add('nature', 'tree_palm', Math.cos(a) * d, Math.sin(a) * d, rnd(3, 4.5), rnd(0, 6), 0.5); }
    const flowers = ['flower_redA', 'flower_yellowA', 'flower_purpleA', 'plant_bush', 'mushroom_red', 'rock_largeA'];
    for (let i = 0; i < 90; i++) { const a = Math.random() * Math.PI * 2, d = rnd(10, 64); const x = Math.cos(a) * d, z = Math.sin(a) * d; if (free(x, z)) void add('nature', flowers[i % flowers.length], x, z, rnd(0.6, 1.4), rnd(0, 6)); }
    // машини, лавки, ліхтарі
    for (const [x, z, r] of [[-3, -24, 0], [3, 22, Math.PI], [-26, 2.6, Math.PI / 2]] as const) void add('city', ['car_taxi', 'car_sedan', 'car_hatchback'][Math.abs(x) % 3], x, z, 2.6, r, 1.3);
    for (const [x, z] of [[-6, -9], [6, -9], [-6, 9], [6, 9], [-20, -24], [20, -24], [-22, 22], [24, 22], [-36, 0], [36, 0], [0, -40], [0, 40]]) void add('city', 'streetlight', x, z, 1.2, 0, 0.3).then((m) => { const h = new THREE.Box3().setFromObject(m).max.y; this.glow(x, h - 0.15, z, 0.35); });
    for (const [x, z, r] of [[-9.5, 0, Math.PI / 2], [9.5, 0, -Math.PI / 2]]) { void add('city', 'bench', x, z, 2, r, 0.8); this.addUse('sit', x, z, 0.45, r, 'out', 1.4); }
    this.addUse('wish', 0, 4.4, 0, Math.PI, 'out', 1.4);
    // хмари
    for (let i = 0; i < 14; i++) {
      const c = new THREE.Group();
      for (let k = 0; k < 5; k++) { const s = mesh(new THREE.SphereGeometry(rnd(2.5, 4.5), 14, 10), this.cloudMat, false); s.position.set(k * 3 - 6, rnd(-0.6, 1), rnd(-1.5, 1.5)); c.add(s); }
      c.position.set(rnd(-150, 150), rnd(38, 55), rnd(-150, 150)); c.userData.v = rnd(0.6, 1.4); this.scene.add(c); this.clouds.push(c);
    }
    // жителі-котики
    const cols = ['#9AA3AE', '#F7F3EA', '#3A3A44', '#F4A340', '#B79CF0', '#8FE3C4'];
    for (let i = 0; i < 8; i++) {
      const rig = makeCat(cols[i % cols.length], 0.85);
      const home = new THREE.Vector3(rnd(-25, 25), 0, rnd(-25, 25));
      rig.root.position.copy(home); this.scene.add(rig.root);
      this.npcs.push({ rig, home, t: rnd(0, 4), goal: home.clone() });
    }
    // зірки для збирання
    STARS.forEach(([x, z], i) => {
      const g = new THREE.Group();
      const shape = new THREE.Shape(); for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2 - Math.PI / 2; const r = k % 2 ? 0.22 : 0.5; k ? shape.lineTo(Math.cos(a) * r, Math.sin(a) * r) : shape.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
      const m = mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.15, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2 }), toon('#FFC53D', 0.5)); m.position.z = -0.07; g.add(m);
      g.position.set(x, 1, z); g.visible = !this.got.has(`s${i}`); this.scene.add(g); this.stars.push({ id: `s${i}`, obj: g });
    });
    // твій ділянка
    const plot = mesh(new THREE.PlaneGeometry(18, 16), toon('#A6D97F'), false); plot.rotation.x = -Math.PI / 2; plot.position.set(HOME.x, 0.03, HOME.z); this.scene.add(plot);
    this.spots.push({ id: 'home', x: HOME.x, z: HOME.z - 7, r: 3, label: 'MY HOME' });
    this.setHouse(this.houseLevel); this.setYard(this.yardList);
  }
  buildStall(x: number, z: number) {
    const g = new THREE.Group(); g.position.set(x, 0, z);
    const t = box(5, 1, 2, '#C8925A'); t.position.y = 0.5; g.add(t);
    [[-2.3, -0.9], [2.3, -0.9], [-2.3, 0.9], [2.3, 0.9]].forEach(([a, b]) => { const p = cyl(0.08, 0.08, 3, '#8B5E34'); p.position.set(a, 1.5, b); g.add(p); });
    for (let i = 0; i < 6; i++) { const r = box(0.85, 0.08, 2.4, i % 2 ? '#FFFFFF' : '#E5484D'); r.position.set(-2.1 + i * 0.85, 3.05, 0); r.rotation.x = 0.12; g.add(r); }
    const fruitC = ['#E5484D', '#FFD84D', '#F5862D', '#9ACD4C', '#FFF06B', '#E5484D'];
    fruitC.forEach((c, i) => { for (let k = 0; k < 5; k++) { const f = sph(0.16, c, 10); f.position.set(-2 + i * 0.8 + (k % 2) * 0.2, 1.1 + Math.floor(k / 2) * 0.12, -0.4 + (k % 3) * 0.3); g.add(f); } });
    const s = sign('FRUIT MARKET', '#F5862D', '#FFFFFF', 5); s.position.set(0, 4.2, 0); g.add(s);
    g.rotation.y = Math.PI; this.scene.add(g); this.colliders.push({ x, z, r: 2.8 });
  }
  buildPlayground(x: number, z: number) {
    const sl = box(1, 2, 1, '#3E7BFA'); sl.position.set(x, 1, z); this.scene.add(sl);
    const sld = box(0.9, 0.1, 3, '#FFC53D'); sld.position.set(x, 1, z + 1.8); sld.rotation.x = 0.6; this.scene.add(sld);
    [-1, 1].forEach((s) => { const p = cyl(0.07, 0.07, 2.6, '#E5484D'); p.position.set(x + 3 + s * 1.3, 1.3, z); p.rotation.z = 0.15 * s; this.scene.add(p); });
    const bar = cyl(0.07, 0.07, 2.7, '#E5484D'); bar.rotation.z = Math.PI / 2; bar.position.set(x + 3, 2.55, z); this.scene.add(bar);
    const seat = box(0.6, 0.06, 0.3, '#30A46C'); seat.position.set(x + 3, 0.6, z); this.scene.add(seat);
    this.addUse('swing', x + 3, z, 0.45, 0, 'out', 1.6);
    this.colliders.push({ x, z, r: 1 }, { x: x + 3, z, r: 1.4 });
  }
  buildLighthouse(x: number, z: number) {
    for (let i = 0; i < 5; i++) { const s = cyl(1.6 - i * 0.18, 1.78 - i * 0.18, 2, i % 2 ? '#E5484D' : '#FFFFFF', 24); s.position.set(x, 1 + i * 2, z); this.scene.add(s); }
    const lamp = cyl(0.8, 0.8, 1.2, '#FFF3A6', 16); lamp.material = toon('#FFF3A6', 0.8); lamp.position.set(x, 10.6, z); this.scene.add(lamp);
    const roof = mesh(new THREE.ConeGeometry(1.1, 1.2, 16), toon('#E5484D')); roof.position.set(x, 11.8, z); this.scene.add(roof);
    const bg = new THREE.ConeGeometry(3, 34, 20, 1, true); bg.translate(0, -17, 0); bg.rotateZ(Math.PI / 2);
    const beam = new THREE.Mesh(bg, new THREE.MeshBasicMaterial({ color: '#FFF3A6', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
    beam.position.set(x, 10.6, z); this.scene.add(beam); this.beam = beam; this.glow(x, 10.6, z, 1.1);
    this.colliders.push({ x, z, r: 2 });
    const dr = box(1, 1.8, 0.2, '#8B5E34'); dr.position.set(x, 0.9, z + 1.7); this.scene.add(dr);
    this.spots.push({ id: 'enter-lighthouse', x, z: z + 3.2, r: 2, label: 'LIGHTHOUSE' });
  }

  glow(x: number, y: number, z: number, r: number) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8), new THREE.MeshBasicMaterial({ color: '#FFE9A8', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    m.position.set(x, y, z); this.scene.add(m); this.glows.push(m);
  }
  buildBakeryDeco(x: number, z: number) {
    // вітрина з тортами перед пекарнею
    const t = box(3, 0.9, 1, '#FFFFFF'); t.position.set(x + 3.4, 0.45, z); this.scene.add(t);
    [['#7A4E25', 0], ['#F7A1B5', 1], ['#FFE36B', 2]].forEach(([c, i]) => { const k = cyl(0.32, 0.32, 0.4, c as string, 16); k.position.set(x + 2.4 + (i as number) * 1, 1.1, z); this.scene.add(k); const ch = sph(0.08, '#E5484D', 8); ch.position.set(x + 2.4 + (i as number) * 1, 1.36, z); this.scene.add(ch); });
    this.colliders.push({ x: x + 3.4, z, r: 1.5 });
  }
  buildPier() {
    const wood = toon('#B8865A'); const P = PLACES.pier;
    for (let i = 0; i < 12; i++) { const pl = mesh(new THREE.BoxGeometry(3, 0.18, 1.5), wood); pl.position.set(0, 0.25, -66 - i * 1.6); this.scene.add(pl); }
    for (let i = 0; i < 7; i++) [-1.4, 1.4].forEach((x) => { const po = cyl(0.14, 0.14, 2, '#8B5E34', 8); po.position.set(x, -0.3, -67 - i * 3); this.scene.add(po); });
    const hut = box(1.2, 1.4, 1.2, '#3E7BFA'); hut.position.set(1.0, 1.0, -85); this.scene.add(hut);
    const rod = cyl(0.03, 0.03, 2.6, '#6B4F2A', 6); rod.position.set(-0.9, 1.4, -85.5); rod.rotation.x = -0.6; this.scene.add(rod);
    const sg = sign(P.label, P.color, '#FFFFFF', 5); sg.position.set(0, 3, -66); this.scene.add(sg);
    this.spots.push({ id: 'pier', x: 0, z: -82, r: 2.2, label: P.label });
    this.spots.push({ id: 'boat', x: 0, z: -85.5, r: 1.4, label: 'BOAT' });
    const bt = box(1.4, 0.5, 2.6, '#FFFFFF'); bt.position.set(2.8, -0.1, -85); this.scene.add(bt); const bs = box(1.45, 0.1, 2.65, '#3E7BFA'); bs.position.set(2.8, 0.05, -85); this.scene.add(bs);
    this.spots.push({ id: 'boat-dock', x: 0, z: -92, r: 4, label: 'PIER' });
  }
  buildIceCream() {
    const P = PLACES.icecream; const g = new THREE.Group(); g.position.set(P.x, 0, P.z);
    const cart = box(2.4, 1.2, 1.3, '#F7A8C8'); cart.position.y = 0.9; g.add(cart);
    const top = box(2.5, 0.12, 1.4, '#FFFFFF'); top.position.y = 1.56; g.add(top);
    [-0.8, 0.8].forEach((x) => { const w = cyl(0.3, 0.3, 0.16, '#2B2B2B'); w.rotation.x = Math.PI / 2; w.position.set(x, 0.3, 0.68); g.add(w); });
    ['#7A4E25', '#F7A1B5', '#A8EBCB'].forEach((c, i) => { const sc = sph(0.2, c, 12); sc.position.set(-0.6 + i * 0.6, 1.78, 0); g.add(sc); });
    const pole = cyl(0.05, 0.05, 2.6, '#FFFFFF', 8); pole.position.set(0, 2.2, -0.3); g.add(pole);
    for (let i = 0; i < 8; i++) { const seg = mesh(new THREE.ConeGeometry(1.8, 0.8, 8, 1, true, (i / 8) * Math.PI * 2, Math.PI / 4), new THREE.MeshToonMaterial({ color: i % 2 ? '#FFFFFF' : '#F76AA8', side: THREE.DoubleSide })); seg.position.set(0, 3.7, -0.3); g.add(seg); }
    const cone = mesh(new THREE.ConeGeometry(0.35, 1, 12), toon('#E8B46A')); cone.rotation.x = Math.PI; cone.position.set(1.6, 2.1, 0); g.add(cone);
    const ball = sph(0.4, '#F7A1B5', 14); ball.position.set(1.6, 2.75, 0); g.add(ball);
    const sg = sign(P.label, P.color, '#FFFFFF', 4); sg.position.set(0, 4.6, -0.3); g.add(sg);
    const vendor = makeCat('#FFF1C9', 0.85); vendor.root.position.set(0, 0, -1.1); g.add(vendor.root); wearHat(vendor, 'hat-cap');
    this.scene.add(g); this.colliders.push({ x: P.x, z: P.z, r: 1.6 });
    this.spots.push({ id: 'icecream', x: P.x, z: P.z + 2.6, r: 2.2, label: P.label });
  }
  buildBoard() {
    const P = PLACES.board; const g = new THREE.Group(); g.position.set(P.x, 0, P.z); g.rotation.y = Math.PI / 4;
    [-0.9, 0.9].forEach((x) => { const p = cyl(0.07, 0.07, 2.2, '#6B4F2A', 8); p.position.set(x, 1.1, 0); g.add(p); });
    const b = box(2.2, 1.3, 0.1, '#C8925A'); b.position.y = 1.6; g.add(b);
    [[-0.6, 1.8, '#FFFFFF'], [0.1, 1.5, '#FFF3A6'], [0.65, 1.85, '#DCE9F7'], [-0.3, 1.3, '#FFE0EA']].forEach(([x, y, c]) => { const n = mesh(new THREE.PlaneGeometry(0.5, 0.42), new THREE.MeshBasicMaterial({ color: c as string }), false); n.position.set(x as number, y as number, 0.06); n.rotation.z = (Math.random() - 0.5) * 0.2; g.add(n); });
    const sg = sign('LOST & FOUND', '#8B5E34', '#FFFFFF', 2.8); sg.position.set(0, 2.7, 0); g.add(sg);
    this.scene.add(g); this.colliders.push({ x: P.x, z: P.z, r: 0.7 });
    this.spots.push({ id: 'board', x: P.x + 1.1, z: P.z + 1.1, r: 2, label: P.label });
  }
  // загублена річ на острові: блищить, поки її не знайдуть
  lostObj: THREE.Group | null = null;
  setLost(x: number | null, z = 0, kind = 'ball', color = '#3E7BFA') {
    if (this.lostObj) { this.scene.remove(this.lostObj); this.lostObj = null; }
    if (x === null) return;
    const g = new THREE.Group();
    if (kind === 'umbrella') { const c = mesh(new THREE.ConeGeometry(0.6, 0.35, 10), toon(color)); c.position.y = 0.7; g.add(c); const h = cyl(0.03, 0.03, 0.7, '#2B2B2B', 6); h.position.y = 0.35; g.add(h); }
    else if (kind === 'bear') { const b = sph(0.25, color); b.position.y = 0.25; g.add(b); const hd = sph(0.18, color); hd.position.y = 0.6; g.add(hd); [-1, 1].forEach((sd) => { const e = sph(0.07, color, 8); e.position.set(0.13 * sd, 0.75, 0); g.add(e); }); }
    else if (kind === 'kite') { const k = mesh(new THREE.OctahedronGeometry(0.4, 0), toon(color)); k.scale.set(1, 1.3, 0.15); k.position.y = 0.5; g.add(k); }
    else if (kind === 'hat') { const r = cyl(0.4, 0.4, 0.04, color, 16); r.position.y = 0.05; g.add(r); const t = cyl(0.25, 0.27, 0.3, color, 16); t.position.y = 0.22; g.add(t); }
    else if (kind === 'bag') { const b = box(0.5, 0.4, 0.2, color); b.position.y = 0.2; g.add(b); const h = mesh(new THREE.TorusGeometry(0.15, 0.03, 6, 12, Math.PI), toon(color)); h.position.y = 0.4; g.add(h); }
    else if (kind === 'chest') { const b = box(0.9, 0.5, 0.6, '#8B5E34'); b.position.y = 0.25; g.add(b); const lid = cyl(0.3, 0.3, 0.9, '#8B5E34', 12, ); lid.rotation.z = Math.PI / 2; lid.scale.set(1, 1, 1); lid.position.y = 0.5; g.add(lid); const band = box(0.95, 0.08, 0.65, '#FFC53D'); band.position.y = 0.48; g.add(band); const lock = box(0.15, 0.18, 0.05, '#FFC53D'); lock.position.set(0, 0.4, 0.32); g.add(lock); }
    else { const b = sph(0.3, color, 16); b.position.y = 0.3; g.add(b); }
    const spark = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 8), new THREE.MeshBasicMaterial({ color: '#FFF3A6', transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending }));
    spark.position.y = 0.4; spark.name = 'spark'; g.add(spark);
    g.position.set(x, 0, z); this.scene.add(g); this.lostObj = g;
  }

  // ---- човен ----
  boating = false; boat: THREE.Group | null = null;
  startBoat() {
    if (this.boating) return; this.boating = true; this.setRide(null);
    const b = new THREE.Group(); const hull = box(1.6, 0.6, 3.2, '#FFFFFF'); hull.position.y = 0.05; b.add(hull); const stripe = box(1.65, 0.12, 3.25, '#3E7BFA'); stripe.position.y = 0.2; b.add(stripe);
    const bow = mesh(new THREE.ConeGeometry(0.8, 1.2, 4), toon('#FFFFFF')); bow.rotation.x = Math.PI / 2; bow.rotation.y = Math.PI / 4; bow.scale.set(1, 1, 0.4); bow.position.set(0, 0.05, 2.1); b.add(bow);
    const mast = cyl(0.05, 0.05, 3, '#6B4F2A', 6); mast.position.set(0, 1.8, -0.2); b.add(mast);
    const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(0, 2.6); sh.lineTo(1.6, 0); sh.closePath(); const sail = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshToonMaterial({ color: '#F76AA8', side: THREE.DoubleSide })); sail.rotation.y = -Math.PI / 2; sail.position.set(0, 0.6, 0); b.add(sail);
    this.hero.root.add(b); this.boat = b; this.heroPos.set(0, 0, -92); this.vel.set(0, 0, 0); this.heroRot = Math.PI;
  }
  stopBoat() { if (!this.boating) return; this.boating = false; if (this.boat) this.hero.root.remove(this.boat); this.boat = null; this.heroPos.set(0, 0, -82); this.vel.set(0, 0, 0); this.setRide(this.rideId); }
  // ---- зима: сніг і сніговики ----
  winter = (() => { const d = new Date(); const m = d.getMonth(); return m === 11 || m === 0 || m === 1 || (m === 10 && d.getDate() >= 25); })();
  snowObj: THREE.Points | null = null;
  buildSnowman() {
    const g = new THREE.Group(); const f = new THREE.Vector3(Math.sin(this.heroRot), 0, Math.cos(this.heroRot)).multiplyScalar(1.8); g.position.copy(this.heroPos).add(f); g.position.y = 0;
    [[0.55, 0.5], [0.4, 1.25], [0.28, 1.8]].forEach(([r, y]) => { const b = sph(r, '#FFFFFF', 16); b.position.y = y; g.add(b); });
    const nose = mesh(new THREE.ConeGeometry(0.05, 0.25, 8), toon('#F5862D')); nose.rotation.x = Math.PI / 2; nose.position.set(0, 1.8, 0.3); g.add(nose);
    [-1, 1].forEach((s) => { const e = sph(0.04, '#1A1A1A', 6); e.position.set(0.09 * s, 1.88, 0.24); g.add(e); const arm = cyl(0.02, 0.02, 0.6, '#6B4F2A', 4); arm.rotation.z = (Math.PI / 2.6) * s; arm.position.set(0.55 * s, 1.35, 0); g.add(arm); });
    const hat = cyl(0.2, 0.2, 0.3, '#1A1A1A', 12); hat.position.y = 2.15; g.add(hat); const brim = cyl(0.3, 0.3, 0.03, '#1A1A1A', 12); brim.position.y = 2.01; g.add(brim);
    const sc = mesh(new THREE.TorusGeometry(0.33, 0.07, 6, 16), toon('#E5484D')); sc.rotation.x = Math.PI / 2; sc.position.y = 1.55; g.add(sc);
    g.lookAt(this.heroPos.x, 0, this.heroPos.z); this.scene.add(g); this.snowmen.push(g); if (this.snowmen.length > 4) this.scene.remove(this.snowmen.shift()!);
  }
  snowmen: THREE.Group[] = [];
  // ---- феєрверки ----
  fireworksOn = false; fwT = 0; fws: { p: THREE.Points; v: Float32Array; t: number }[] = [];
  burst() {
    const n = 120; const pos = new Float32Array(n * 3); const v = new Float32Array(n * 3); const a = Math.random() * Math.PI * 2; const d = 95 + Math.random() * 20;
    const cx = Math.cos(a) * d, cy = 30 + Math.random() * 15, cz = Math.sin(a) * d;
    for (let i = 0; i < n; i++) { pos.set([cx, cy, cz], i * 3); const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1); const sp = 9 + Math.random() * 4; v.set([Math.sin(ph) * Math.cos(th) * sp, Math.cos(ph) * sp, Math.sin(ph) * Math.sin(th) * sp], i * 3); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const p = new THREE.Points(g, new THREE.PointsMaterial({ color: ['#FF5C8A', '#FFC53D', '#5CC8FF', '#7CFF9B', '#C79CFF'][Math.floor(Math.random() * 5)], size: 1.4, transparent: true, opacity: 1, fog: false, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.scene.add(p); this.fws.push({ p, v, t: 0 });
  }
  // ---- інші гравці по мережі ----
  others = new Map<string, { rig: Rig; tx: number; tz: number; tr: number; last: number; tag: THREE.Sprite | null; name: string; key: string; bub: THREE.Sprite | null; ride: THREE.Group | null; rideId: string | null; danceT: number }>();
  upsertOther(p: { id: string; n: string; x: number; z: number; r: number; room?: string | null; o?: Record<string, string | undefined>; ride?: string | null }) {
    let o = this.others.get(p.id);
    if (!o) { const rig = makeCat(FUR[0].color); rig.root.position.set(p.x, 0, p.z); this.scene.add(rig.root); o = { rig, tx: p.x, tz: p.z, tr: p.r, last: 0, tag: null, name: '', key: '', bub: null, ride: null, rideId: null, danceT: 0 }; this.others.set(p.id, o); }
    o.tx = p.x; o.tz = p.z; o.tr = p.r; o.last = performance.now();
    const key = JSON.stringify(p.o ?? {});
    if (p.o && key !== o.key) { o.key = key; wear(o.rig, p.o as unknown as Outfit); }
    if ((p.ride ?? null) !== o.rideId) { if (o.ride) o.rig.root.remove(o.ride); o.rideId = p.ride ?? null; o.ride = o.rideId ? makeRide(o.rideId) : null; if (o.ride) o.rig.root.add(o.ride); }
    if (p.n !== o.name) { o.name = p.n; if (o.tag) o.rig.root.remove(o.tag); const t = sign(p.n || 'Cat', '#7C66DC', '#FFFFFF', 1.6); t.position.y = 2.25; (t.material as THREE.SpriteMaterial).depthTest = false; o.rig.root.add(t); o.tag = t; }
  }
  removeOther(id: string) { const o = this.others.get(id); if (!o) return; this.scene.remove(o.rig.root); this.others.delete(id); }
  otherSay(id: string, text: string) {
    const o = this.others.get(id); if (!o) return; if (o.bub) o.rig.root.remove(o.bub);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.speechTex(text.length > 22 ? text.slice(0, 21) + '…' : text, '#E8F6FF'), depthTest: false })); sp.scale.set(2.2, 0.92, 1); sp.position.y = 2.95; o.rig.root.add(sp); o.bub = sp;
    window.setTimeout(() => { if (o.bub === sp) { o.rig.root.remove(sp); o.bub = null; } }, 4000);
  }
  otherDance(id: string) { const o = this.others.get(id); if (o) o.danceT = 2.4; }
  stepOthers(dt: number, t: number) {
    const now = performance.now();
    for (const [id, o] of this.others) {
      if (now - o.last > 12000) { this.removeOther(id); continue; }
      const p = o.rig.root.position; const dx = o.tx - p.x, dz = o.tz - p.z; const d = Math.hypot(dx, dz);
      if (d > 30) p.set(o.tx, 0, o.tz); else { p.x += dx * Math.min(1, dt * 8); p.z += dz * Math.min(1, dt * 8); }
      let dr = o.tr - o.rig.root.rotation.y; dr = Math.atan2(Math.sin(dr), Math.cos(dr)); o.rig.root.rotation.y += dr * Math.min(1, dt * 10);
      const moving = d > 0.05 && !o.rideId; const q = t * 10 + p.x;
      o.rig.body.position.y = (o.rideId ? (CARS.includes(o.rideId) ? 0.55 : 0.25) : 0) + (moving ? Math.abs(Math.sin(q)) * 0.1 : 0);
      o.rig.armL.rotation.x = moving ? Math.sin(q) * 0.8 : 0; o.rig.armR.rotation.x = moving ? -Math.sin(q) * 0.8 : 0;
      o.rig.legL.position.z = moving ? Math.sin(q) * 0.18 : 0; o.rig.legR.position.z = moving ? -Math.sin(q) * 0.18 : 0;
      o.rig.legL.visible = o.rig.legR.visible = !CARS.includes(o.rideId ?? '');
      if (o.danceT > 0) { o.danceT -= dt; o.rig.armL.rotation.z = -2.4 + Math.sin(t * 12) * 0.5; o.rig.armR.rotation.z = 2.4 + Math.sin(t * 12 + 1) * 0.5; o.rig.body.rotation.y = Math.sin(t * 6) * 0.5; } else { o.rig.armL.rotation.z = -0.35; o.rig.armR.rotation.z = 0.35; o.rig.body.rotation.y = 0; }
    }
  }

  // ---- хованки ----
  hideNpc(i: number, x: number, z: number) { const n = this.npcs[i]; if (!n) return; this.followers.delete(i); n.rig.root.position.set(x, 0, z); n.home.set(x, 0, z); n.goal.set(x, 0, z); n.t = 999; }
  npcPos(i: number) { return this.npcs[i]?.rig.root.position; }

  // небо: зорі вночі, місяць, дощ
  buildSky() {
    const n = 500; const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, b = Math.random() * 1.2 + 0.15; pos[i * 3] = Math.cos(a) * Math.cos(b) * 260; pos[i * 3 + 1] = Math.sin(b) * 260; pos[i * 3 + 2] = Math.sin(a) * Math.cos(b) * 260; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.skyStars = new THREE.Points(g, new THREE.PointsMaterial({ color: '#FFFFFF', size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false }));
    this.scene.add(this.skyStars);
    this.moon = new THREE.Mesh(new THREE.SphereGeometry(9, 20, 14), new THREE.MeshBasicMaterial({ color: '#FFF6D8', fog: false, transparent: true, opacity: 0 })); this.scene.add(this.moon);
    const m = 1400; const rp = new Float32Array(m * 6);
    for (let i = 0; i < m; i++) { const x = (Math.random() - 0.5) * 50, y = Math.random() * 26, z = (Math.random() - 0.5) * 50; rp.set([x, y, z, x, y - 0.7, z], i * 6); }
    const rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.BufferAttribute(rp, 3));
    { const k = 1500; const sp = new Float32Array(k * 3); for (let i = 0; i < k; i++) sp.set([(Math.random() - 0.5) * 50, Math.random() * 26, (Math.random() - 0.5) * 50], i * 3); const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3)); this.snowObj = new THREE.Points(sg, new THREE.PointsMaterial({ color: '#FFFFFF', size: 0.18, transparent: true, opacity: 0.9, depthWrite: false })); this.snowObj.visible = false; this.snowObj.frustumCulled = false; this.scene.add(this.snowObj); }
    this.rainObj = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: '#CFE3F5', transparent: true, opacity: 0.55, depthWrite: false })); this.rainObj.visible = false; this.rainObj.frustumCulled = false; this.scene.add(this.rainObj);
  }
  // метелики, світлячки, птахи, човни
  buildLife() {
    const wingC = ['#F76AA8', '#FFC53D', '#8EC9F5', '#B79CF0', '#F5862D'];
    for (let i = 0; i < 26; i++) {
      const glow = i >= 14; const g = new THREE.Group();
      if (glow) { g.add(new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: '#E9FF8A', transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }))); }
      else [-1, 1].forEach((sd) => { const wg = new THREE.PlaneGeometry(0.34, 0.26); wg.translate(0.17 * sd, 0, 0); const w = new THREE.Mesh(wg, new THREE.MeshBasicMaterial({ color: wingC[i % wingC.length], side: THREE.DoubleSide })); w.name = sd < 0 ? 'wl' : 'wr'; g.add(w); });
      const a = Math.random() * Math.PI * 2, d = 10 + Math.random() * 50;
      const c = new THREE.Vector3(Math.cos(a) * d, 0, Math.sin(a) * d); g.position.copy(c); this.scene.add(g);
      this.flies.push({ g, c, ph: Math.random() * 10, glow });
    }
    for (let i = 0; i < 8; i++) {
      const g = new THREE.Group(); const m = toon('#2B2B2B');
      [-1, 1].forEach((sd) => { const w = mesh(new THREE.BoxGeometry(0.9, 0.05, 0.25), m, false); w.position.x = 0.45 * sd; w.name = sd < 0 ? 'wl' : 'wr'; const pv = new THREE.Group(); pv.add(w); pv.name = sd < 0 ? 'pl' : 'pr'; g.add(pv); });
      this.scene.add(g); this.birds.push({ g, r: 25 + Math.random() * 40, h: 24 + Math.random() * 12, ph: Math.random() * 6, v: 0.12 + Math.random() * 0.1 });
    }
    const sails = ['#FFFFFF', '#E5484D', '#FFC53D'];
    for (let i = 0; i < 3; i++) {
      const g = new THREE.Group();
      const hull = box(1.8, 0.8, 5, ['#3E7BFA', '#FFFFFF', '#30A46C'][i]); hull.position.y = 0.2; g.add(hull);
      const bow = mesh(new THREE.ConeGeometry(0.9, 1.6, 4), toon(['#3E7BFA', '#FFFFFF', '#30A46C'][i])); bow.rotation.x = Math.PI / 2; bow.rotation.y = Math.PI / 4; bow.scale.set(1, 1, 0.5); bow.position.set(0, 0.2, 3.2); g.add(bow);
      const mast = cyl(0.08, 0.08, 5, '#6B4F2A', 6); mast.position.y = 2.8; g.add(mast);
      const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(0, 4.2); sh.lineTo(2.6, 0); sh.closePath();
      const sail = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshToonMaterial({ color: sails[i], side: THREE.DoubleSide })); sail.rotation.y = -Math.PI / 2; sail.position.set(0, 0.8, 0.1); g.add(sail);
      this.scene.add(g); this.boats.push({ g, r: 92 + i * 14, ph: (i / 3) * Math.PI * 2, v: 0.012 + i * 0.004 });
    }
  }

  flames: THREE.Mesh[] = [];
  gardenObj: THREE.Group | null = null; gardenPlots: ({ crop: string; p: number } | null)[] = [];
  setGarden(plots: ({ crop: string; p: number } | null)[]) {
    this.gardenPlots = plots; const g = this.gardenObj; if (!g) return;
    g.children.filter((c) => c.name === 'crop').forEach((c) => g.remove(c));
    const col: Record<string, string> = { lettuce: '#7BC86C', carrot: '#F5862D', tomato: '#E5484D', strawberry: '#F7465E', corn: '#FFD84D', pumpkin: '#F5862D' };
    plots.forEach((pl, i) => { if (!pl) return; const x = -1.4 + i * 1.4; for (let k = 0; k < 3; k++) { const z = -0.7 + k * 0.7; const s0 = 0.25 + pl.p * 0.75; const leaf = mesh(new THREE.ConeGeometry(0.18 * s0, 0.5 * s0, 6), toon('#30A46C')); leaf.position.set(x, 0.33 + 0.25 * s0, z); leaf.name = 'crop'; g.add(leaf); if (pl.p >= 1) { const fr = sph(pl.crop === 'pumpkin' ? 0.28 : 0.11, col[pl.crop] ?? '#E5484D', 10); fr.position.set(x + 0.12, 0.45, z); fr.name = 'crop'; g.add(fr); } } });
  }
  buildFun() {
    // баскетбольне кільце біля майданчика
    const hx = -24, hz = 18; const pole = cyl(0.1, 0.1, 3.4, '#55606E', 8); pole.position.set(hx, 1.7, hz - 1); this.scene.add(pole);
    const bb = box(1.6, 1.1, 0.08, '#FFFFFF'); bb.position.set(hx, 3.2, hz - 0.95); this.scene.add(bb); const sq = box(0.6, 0.45, 0.09, '#E5484D'); sq.position.set(hx, 3.1, hz - 0.92); this.scene.add(sq);
    const ring = mesh(new THREE.TorusGeometry(0.3, 0.04, 6, 16), toon('#F5862D')); ring.rotation.x = Math.PI / 2; ring.position.set(hx, 2.85, hz - 0.55); this.scene.add(ring);
    const ball = sph(0.18, '#F5862D', 12); ball.position.set(hx + 0.8, 0.18, hz + 1.2); this.scene.add(ball); this.colliders.push({ x: hx, z: hz - 1, r: 0.4 });
    this.addUse('hoops', hx, hz + 1.6, 0, Math.PI, 'out', 1.6);
    // шезлонги з парасольками на пляжі
    [[10, -68], [14, -66.6], [18, -64.6]].forEach(([x, z], i) => {
      const a = Math.atan2(-x, -z); const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = a;
      const bed = box(0.8, 0.12, 2, ['#F76AA8', '#3E7BFA', '#FFC53D'][i]); bed.position.y = 0.4; g.add(bed); const back = box(0.8, 0.1, 0.8, ['#F76AA8', '#3E7BFA', '#FFC53D'][i]); back.position.set(0, 0.7, -0.9); back.rotation.x = -0.9; g.add(back);
      [[-0.35, -0.8], [0.35, -0.8], [-0.35, 0.8], [0.35, 0.8]].forEach(([lx, lz]) => { const l = box(0.06, 0.4, 0.06, '#FFFFFF'); l.position.set(lx, 0.2, lz); g.add(l); });
      const pp = cyl(0.04, 0.04, 2.6, '#FFFFFF', 6); pp.position.set(0.8, 1.3, 0); g.add(pp);
      for (let k = 0; k < 8; k++) { const seg = mesh(new THREE.ConeGeometry(1.3, 0.5, 8, 1, true, (k / 8) * Math.PI * 2, Math.PI / 4), new THREE.MeshToonMaterial({ color: k % 2 ? '#FFFFFF' : ['#F76AA8', '#3E7BFA', '#FFC53D'][i], side: THREE.DoubleSide })); seg.position.set(0.8, 2.6, 0); g.add(seg); }
      this.scene.add(g); this.addUse('sunbathe', x, z, 0.5, a, 'out', 1.4);
    });
    // місце для піщаного замку
    const sx = 4, sz = -71; const pail = cyl(0.18, 0.13, 0.3, '#3E7BFA', 10); pail.position.set(sx + 0.8, 0.15, sz); this.scene.add(pail); const spade = box(0.1, 0.5, 0.04, '#E5484D'); spade.position.set(sx + 1.1, 0.25, sz); spade.rotation.z = 0.5; this.scene.add(spade);
    this.addUse('sand', sx, sz, 0, 0, 'out', 1.5);
    // пікнік у парку
    const px = -12, pz = 6; const cv = document.createElement('canvas'); cv.width = 64; cv.height = 64; const x2 = cv.getContext('2d')!; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x2.fillStyle = (i + j) % 2 ? '#FFFFFF' : '#E5484D'; x2.fillRect(i * 16, j * 16, 16, 16); } const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace;
    const bl = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshToonMaterial({ map: tx, gradientMap: grad! })); bl.rotation.x = -Math.PI / 2; bl.position.set(px, 0.03, pz); bl.receiveShadow = true; this.scene.add(bl);
    const bk = box(0.6, 0.4, 0.4, '#C8925A'); bk.position.set(px + 0.7, 0.2, pz - 0.6); this.scene.add(bk); const ap = sph(0.1, '#E5484D', 8); ap.position.set(px - 0.5, 0.1, pz + 0.4); this.scene.add(ap);
    this.addUse('picnic', px, pz, 0.12, 0, 'out', 1.6);
  }
  sandcastles: THREE.Group[] = [];
  buildSandcastle() {
    const g = new THREE.Group(); const x = 4 + (Math.random() - 0.5) * 2, z = -72 - Math.random() * 1.5; g.position.set(x, 0, z);
    const base = cyl(0.55, 0.65, 0.4, '#E8CF8F', 12); base.position.y = 0.2; g.add(base); [[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]].forEach(([a, b]) => { const t = cyl(0.16, 0.18, 0.5, '#E8CF8F', 8); t.position.set(a, 0.45, b); g.add(t); const r = mesh(new THREE.ConeGeometry(0.18, 0.25, 8), toon('#E8CF8F')); r.position.set(a, 0.82, b); g.add(r); }); const fl = box(0.2, 0.12, 0.01, '#E5484D'); fl.position.set(0.1, 1.0, 0); g.add(fl); const fp = cyl(0.01, 0.01, 0.4, '#FFFFFF', 4); fp.position.set(0, 0.85, 0); g.add(fp);
    this.scene.add(g); this.sandcastles.push(g); if (this.sandcastles.length > 3) this.scene.remove(this.sandcastles.shift()!);
  }
  petTrick() { this.petTrickT = 2; }
  petTrickT = 0;
  buildCampsite(x: number, z: number) {
    void model('nature', 'tent_detailedOpen', 4).then((m) => { m.position.set(x, 0, z - 3); m.rotation.y = 0; this.scene.add(m); });
    this.colliders.push({ x, z: z - 3, r: 2 });
    void model('nature', 'campfire_stones', 1.6).then((m) => { m.position.set(x, 0, z + 2); this.scene.add(m); });
    for (let i = 0; i < 3; i++) { const f = mesh(new THREE.ConeGeometry(0.28 - i * 0.07, 0.8 - i * 0.15, 8), new THREE.MeshBasicMaterial({ color: ['#FF7A1A', '#FFB224', '#FFE680'][i] }), false); f.position.set(x, 0.45, z + 2); this.scene.add(f); this.flames.push(f); }
    this.glow(x, 0.6, z + 2, 0.9);
    this.colliders.push({ x, z: z + 2, r: 0.8 });
    [[-2, 0.5, Math.PI / 2 + 0.5], [2, 0.5, -Math.PI / 2 - 0.5], [0, 4.2, Math.PI]].forEach(([dx, dz, r]) => { const lg = cyl(0.28, 0.28, 1.6, '#8B5E34', 10); lg.rotation.z = Math.PI / 2; lg.rotation.y = r + Math.PI / 2; lg.position.set(x + dx, 0.28, z + 2 + dz); this.scene.add(lg); this.addUse('sit', x + dx, z + 2 + dz, 0.45, Math.atan2(-dx, -dz), 'out', 1.3); });
    this.addUse('marsh', x + 1.2, z + 3.4, 0, Math.atan2(-1.2, -1.4), 'out', 1.1);
    const sg = sign('CAMPSITE', '#30A46C', '#FFFFFF', 3.4); sg.position.set(x + 3.5, 2.6, z - 1); this.scene.add(sg); const p = cyl(0.07, 0.07, 2.2, '#6B4F2A'); p.position.set(x + 3.5, 1.1, z - 1); this.scene.add(p);
    this.spots.push({ id: 'enter-tent', x, z: z - 0.6, r: 1.6, label: 'CAMP TENT' });
  }

  // ---- кімнати всередині будівель ----
  // оболонка кімнати: підлога, дві стіни з вікнами, двері, вихід
  buildShell(g: THREE.Group, o: { x: number; z: number }, floorA: string, floorB: string, wall: string, title?: string, W = ROOM.w, D = ROOM.d) {
    const yard = mesh(new THREE.CircleGeometry(40, 40), toon('#8BCB62'), false); yard.rotation.x = -Math.PI / 2; yard.position.y = -0.02; g.add(yard);
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 256; const x = cv.getContext('2d')!;
    for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? floorA : floorB; x.fillRect(0, i * 32, 256, 32); x.fillStyle = 'rgba(0,0,0,.18)'; x.fillRect(0, i * 32 + 31, 256, 1); x.fillRect(((i * 97) % 200) + 20, i * 32, 1, 32); }
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(3, 3);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshToonMaterial({ map: tx, gradientMap: toon('#fff').gradientMap })); floor.rotation.x = -Math.PI / 2; floor.position.y = 0.01; floor.receiveShadow = true; floor.name = 'floor'; g.add(floor);
    const wallM = toon(wall); const H = 3.6;
    const back = mesh(new THREE.BoxGeometry(W, H, 0.3), wallM); back.position.set(0, H / 2, -D / 2); g.add(back);
    const left = mesh(new THREE.BoxGeometry(0.3, H, D), wallM); left.position.set(-W / 2, H / 2, 0); g.add(left);
    const low = toon('#E3D2B8');
    const right = mesh(new THREE.BoxGeometry(0.3, 0.4, D), low); right.position.set(W / 2, 0.2, 0); g.add(right);
    const front = mesh(new THREE.BoxGeometry(W, 0.4, 0.3), low); front.position.set(0, 0.2, D / 2); g.add(front);
    [-W * 0.31, W * 0.31].forEach((wx) => { const w = mesh(new THREE.PlaneGeometry(2.2, 1.6), new THREE.MeshBasicMaterial({ color: '#BFE6FA' }), false); w.position.set(wx, 2.1, -D / 2 + 0.16); g.add(w); const fr = box(2.4, 0.12, 0.1, '#FFFFFF'); fr.position.set(wx, 2.1, -D / 2 + 0.18); g.add(fr); const fv = box(0.12, 1.7, 0.1, '#FFFFFF'); fv.position.set(wx, 2.1, -D / 2 + 0.18); g.add(fv); });
    if (title) { const sg = sign(title, '#1A1A1A', '#FFFFFF', 4.4); sg.position.set(0, 3.15, -D / 2 + 1.1); g.add(sg); }
    else { const pic = box(1.4, 1, 0.08, '#FFC53D'); pic.position.set(-W / 2 + 0.2, 2.2, -2); pic.rotation.y = Math.PI / 2; g.add(pic); const pin = box(1.2, 0.8, 0.09, '#8EC9F5'); pin.position.set(-W / 2 + 0.21, 2.2, -2); pin.rotation.y = Math.PI / 2; g.add(pin); }
    const door = box(0.12, 2.4, 1.4, '#8B5E34'); door.position.set(-W / 2 + 0.2, 1.2, 3); g.add(door);
    const knob = sph(0.08, '#FFC53D', 8); knob.position.set(-W / 2 + 0.3, 1.2, 2.5); g.add(knob);
    const mat = mesh(new THREE.CircleGeometry(1, 24), toon('#FFC53D'), false); mat.rotation.x = -Math.PI / 2; mat.position.set(-W / 2 + 1.3, 0.03, 3); g.add(mat);
    this.spots.push({ id: 'room-exit', x: o.x - W / 2 + 1.3, z: o.z + 3, r: 1.6, label: 'EXIT' });
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; const b = sph(1 + Math.random(), '#6FB64C', 12); b.position.set(Math.cos(a) * 16, 0.4, Math.sin(a) * 14); g.add(b); }
  }
  guestGroup = new THREE.Group();
  // дім іншого гравця, до якого прийшли в гості
  async buildGuestHome(d: { room: RoomItem[]; level: number; wall: string; floor: string; rooms?: HomeRooms }) {
    const o = { x: ROOM.x - 160, z: ROOM.z }; this.origins.guesthome = o;
    const g = this.guestGroup; g.clear(); g.position.set(o.x, 0, o.z); if (!g.parent) this.scene.add(g);
    this.spots = this.spots.filter((sp) => !(sp.id === 'room-exit' && Math.abs(sp.x - o.x) < 15 && Math.abs(sp.z - o.z) < 15));
    const [W, D] = HOME_SIZE[Math.max(1, d.level)] ?? [ROOM.w, ROOM.d]; this.sizes.guesthome = { w: W, d: D };
    const FL: Record<string, [string, string]> = { 'floor-light': ['#D9B38C', '#CFA67C'], 'floor-dark': ['#8B5E34', '#7A5230'], 'floor-tiles': ['#F4F1E8', '#E0DCD0'], 'floor-carpet': ['#8EC9F5', '#86BFEA'], 'floor-pink': ['#F7B7C8', '#F0AABD'] };
    const fl = FL[d.floor] ?? FL['floor-light']; const keep = this.homeWall; this.homeWall = d.wall;
    this.buildShell(g, o, fl[0], fl[1], '#F3E7D3', undefined, W, D); this.dressRoom('home', g, W, D); this.homeWall = keep;
    const scenes = await pack('furn'); const cols: { x: number; z: number; r: number }[] = []; this.roomCols.guesthome = cols; buildRoomParts(g, o, d.rooms, W, D, cols);
    (d.room ?? []).slice(0, 80).forEach((it) => {
      const src = it.f.startsWith('x-') ? null : scenes.get(it.f); if (!src && !it.f.startsWith('x-')) return;
      const gg = new THREE.Group(); const inner = new THREE.Group(); if (src) { src.children.forEach((c) => inner.add(c.clone(true))); inner.scale.setScalar(FK); } else inner.add(codeItem(it.f)); gg.add(inner);
      const b = new THREE.Box3().setFromObject(inner); const c = b.getCenter(new THREE.Vector3()); inner.position.set(-c.x, -b.min.y, -c.z);
      gg.position.set(Math.max(-W / 2 + 0.5, Math.min(W / 2 - 0.5, it.x)), 0, Math.max(-D / 2 + 0.5, Math.min(D / 2 - 0.5, it.z))); gg.rotation.y = it.r; g.add(gg);
      const sz = b.getSize(new THREE.Vector3()); if (!/^rug/.test(it.f) && sz.y > 0.4) cols.push({ x: o.x + gg.position.x, z: o.z + gg.position.z, r: Math.max(0.2, Math.min(sz.x, sz.z) / 2 * 0.9) });
    });
  }
  homeKey = ''; homeWall = ''; homeRooms: HomeRooms | undefined; partCol: { x: number; z: number; r: number }[] = [];
  // мій дім усередині: розмір залежить від будинку, шпалери й підлога купуються в магазині
  setHome(level: number, wall: string, floor: string, rooms?: HomeRooms) {
    const key = `${level}|${wall}|${floor}|${JSON.stringify(rooms ?? null)}`; if (key === this.homeKey) return; this.homeKey = key; this.homeWall = wall; this.homeRooms = rooms;
    const g = this.roomGroup; [...g.children].forEach((c) => { if (c !== this.roomItems) g.remove(c); });
    this.spots = this.spots.filter((sp) => !(sp.id === 'room-exit' && Math.abs(sp.x - ROOM.x) < 15 && Math.abs(sp.z - ROOM.z) < 15));
    const [W, D] = HOME_SIZE[Math.max(1, level)] ?? [ROOM.w, ROOM.d]; this.sizes.home = { w: W, d: D };
    if (this.roomId === 'home') { this.curW = W; this.curD = D; }
    const FL: Record<string, [string, string]> = { 'floor-light': ['#D9B38C', '#CFA67C'], 'floor-dark': ['#8B5E34', '#7A5230'], 'floor-tiles': ['#F4F1E8', '#E0DCD0'], 'floor-carpet': ['#8EC9F5', '#86BFEA'], 'floor-pink': ['#F7B7C8', '#F0AABD'] };
    const fl = FL[floor] ?? FL['floor-light'];
    this.buildShell(g, ROOM, fl[0], fl[1], '#F3E7D3', undefined, W, D);
    this.dressRoom('home', g, W, D);
    this.partCol = []; buildRoomParts(g, ROOM, rooms, W, D, this.partCol);
  }
  buildRoom() {
    const g = this.roomGroup; g.position.set(ROOM.x, 0, ROOM.z); this.scene.add(g); g.add(this.roomItems); this.scene.add(this.propsGroup);
    this.setHome(1, '', 'floor-light');
    this.origins.home = { x: ROOM.x, z: ROOM.z };
    [...INTERIORS, ...HOUSE_DEFS].forEach((d, i) => { const o = { x: ROOM.x, z: ROOM.z + 150 * (i + 1) }; this.origins[d.id] = o; void this.buildInterior(d, o); });
  }
  async buildInterior(d: IDef, o: { x: number; z: number }) {
    const g = new THREE.Group(); g.position.set(o.x, 0, o.z); this.scene.add(g);
    const W = d.w ?? ROOM.w, D = d.d ?? ROOM.d; this.sizes[d.id] = { w: W, d: D };
    let wall = d.wall;
    if (d.model) { const c = await modelColors('sub', d.model); if (c[0]) wall = c[0]; }
    this.buildShell(g, o, d.floor[0], d.floor[1], wall, d.title, W, D);
    this.dressRoom(d.id, g, W, D);
    const cols: { x: number; z: number; r: number }[] = []; this.roomCols[d.id] = cols;
    this.spots.push({ id: d.job, x: o.x + d.spot[0], z: o.z + d.spot[1], r: 1.8, label: d.npc ? d.npc[0] : d.title ?? '' });
    const scenes = await pack('furn');
    const tops: number[] = [];
    d.items.forEach(([f, x, z, r, on]) => {
      const src = f.startsWith('x-') ? null : scenes.get(f); if (!src && !f.startsWith('x-')) { tops.push(0); return; }
      const it = new THREE.Group(); const inner = new THREE.Group(); if (src) { src.children.forEach((c) => inner.add(c.clone(true))); inner.scale.setScalar(FK); } else inner.add(codeItem(f)); it.add(inner);
      const b = new THREE.Box3().setFromObject(inner); const c = b.getCenter(new THREE.Vector3()); inner.position.set(-c.x, -b.min.y, -c.z);
      it.traverse((q) => { const m = q as THREE.Mesh; if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { const st = mt as THREE.MeshStandardMaterial; if (st.metalness !== undefined) { st.metalness = Math.min(st.metalness, 0.15); st.roughness = Math.max(st.roughness ?? 1, 0.45); if (st.map) st.map.anisotropy = 8; } }); } });
      const sz = b.getSize(new THREE.Vector3());
      const y = on !== undefined ? tops[on] ?? 0 : 0;
      it.position.set(x, y, z); it.rotation.y = r; g.add(it); tops.push(y + sz.y);
      const kind = useKind(f);
      if (kind && !(d.id !== 'house' && d.id !== 'tent' && d.id !== 'lighthouse' && kind === 'sit' && Math.hypot(x - d.spot[0], z - d.spot[1]) < 1.2)) {
        const seatY = kind === 'sit' ? y + sz.y * (/^(loungeSofa|loungeChair|loungeDesign)/.test(f) ? 0.38 : /^stoolBar/.test(f) ? 0.85 : 0.42) : y + sz.y;
        const front = kind === 'sit' || kind === 'sleep' ? 0 : 0.9;
        this.addUse(kind, o.x + x + Math.sin(r) * front, o.z + z + Math.cos(r) * front, seatY, kind === 'sit' || kind === 'sleep' ? r : r + Math.PI, d.id, kind === 'sit' ? 1.0 : 1.3);
      }
      if (on === undefined && !/^rug/.test(f) && sz.y > 0.4) cols.push({ x: o.x + x, z: o.z + z, r: Math.max(0.3, Math.min(sz.x, sz.z) / 2 * 0.95) });
    });
    // господар за прилавком
    if (d.npc) {
      const rig = makeCat(d.npc[1], 0.9); rig.root.position.set(d.npc[2], 0, d.npc[3]); g.add(rig.root); this.keepers.push(rig);
      if (d.npc[4]) wearHat(rig, d.npc[4]);
    }
  }
  // ---- оформлення кімнат ----
  art(g: THREE.Group, t: THREE.Texture, w: number, h: number, x: number, y: number, z: number, ry = 0, back = false) {
    const m = new THREE.MeshBasicMaterial({ map: t, transparent: true, polygonOffset: back, polygonOffsetFactor: back ? 1 : 0, polygonOffsetUnits: back ? 1 : 0 });
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); p.position.set(x, y, z); p.rotation.y = ry; g.add(p); return p;
  }
  wallpaper(g: THREE.Group, t: THREE.Texture, W = ROOM.w, D = ROOM.d) {
    t.repeat.set(5, 1.3); const b = this.art(g, t, W, 3.6, 0, 1.8, -D / 2 + 0.152, 0, true); b.material.transparent = false;
    const t2 = t.clone(); t2.needsUpdate = true; t2.repeat.set(4, 1.3); const l = this.art(g, t2, D, 3.6, -W / 2 + 0.152, 1.8, 0, Math.PI / 2, true); l.material.transparent = false;
  }
  lamps(g: THREE.Group, xs: number[], z: number, c: string) {
    xs.forEach((x) => { const cord = cyl(0.01, 0.01, 0.8, '#2B2B2B', 4); cord.position.set(x, 3.2, z); g.add(cord); const sh = mesh(new THREE.ConeGeometry(0.32, 0.3, 14, 1, true), new THREE.MeshToonMaterial({ color: c, side: THREE.DoubleSide, gradientMap: grad! }), false); sh.position.set(x, 2.7, z); g.add(sh); const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), new THREE.MeshBasicMaterial({ color: '#FFF3C2' })); bulb.position.set(x, 2.6, z); g.add(bulb); });
  }
  goods(g: THREE.Group, x0: number, x1: number, z: number, ys: number[], colors: string[], kind: 'box' | 'bread' | 'ball' | 'shirt' = 'box') {
    let k = 0;
    ys.forEach((y) => { for (let x = x0; x <= x1; x += 0.28) { const c = colors[k++ % colors.length]; let o: THREE.Mesh;
      if (kind === 'bread') { o = mesh(new THREE.CapsuleGeometry(0.08, 0.14, 4, 8), toon(c)); o.rotation.z = Math.PI / 2; }
      else if (kind === 'ball') o = sph(0.1, c, 10);
      else if (kind === 'shirt') { o = box(0.28, 0.34, 0.06, c); }
      else o = box(0.18, 0.22 + (k % 3) * 0.05, 0.14, c);
      o.position.set(x, y, z); g.add(o); } });
  }
  mural(text: string, colors: string[], x: number, z: number) {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = Math.atan2(-x, -z);
    const w = box(7.4, 2.8, 0.4, '#E9DCC3'); w.position.y = 1.4; g.add(w);
    const t = graffitiTex(text, colors, '#F4EEE2'); this.art(g, t, 7.2, 2.6, 0, 1.4, 0.21); const t2 = graffitiTex(text, [...colors].reverse(), '#F4EEE2'); this.art(g, t2, 7.2, 2.6, 0, 1.4, -0.21, Math.PI);
    this.scene.add(g); this.colliders.push({ x: x + Math.sin(g.rotation.y + Math.PI / 2) * 2.4, z: z + Math.cos(g.rotation.y + Math.PI / 2) * 2.4, r: 1.3 }, { x, z, r: 1.3 }, { x: x - Math.sin(g.rotation.y + Math.PI / 2) * 2.4, z: z - Math.cos(g.rotation.y + Math.PI / 2) * 2.4, r: 1.3 });
  }
  dressRoom(id: string, g: THREE.Group, W = ROOM.w, D = ROOM.d) {
    const BZ = -D / 2 + 0.17, LX = -W / 2 + 0.17, R = Math.PI / 2;
    const flagC = ['#E5484D', '#FFC53D', '#30A46C', '#3E7BFA', '#F76AA8', '#7C66DC'];
    // гірлянда з прапорців через усю кімнату
    [[-W / 2 + 0.2, -D / 2 + 0.3, W / 2 - 0.2, D / 2 - 1], [-W / 2 + 0.2, D / 2 - 1, W / 2 - 0.2, -D / 2 + 0.3]].forEach(([x0, z0, x1, z1], k) => { const n = 18; for (let i = 0; i < n; i++) { const t = (i + 0.5) / n; const x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t; const y = 3.45 - Math.sin(t * Math.PI) * 0.5; const sh = new THREE.Shape(); sh.moveTo(-0.18, 0); sh.lineTo(0.18, 0); sh.lineTo(0, -0.38); sh.closePath(); const f = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshBasicMaterial({ color: flagC[(i + k) % flagC.length], side: THREE.DoubleSide })); f.position.set(x, y, z); f.rotation.y = Math.atan2(x1 - x0, z1 - z0) + Math.PI / 2; g.add(f); } });
    // кульки в кутку
    [[W / 2 - 0.8, D / 2 - 1.2], [-W / 2 + 0.8, -D / 2 + 0.9]].forEach(([bx, bz], k) => { for (let i = 0; i < 3; i++) { const b = sph(0.28, flagC[(i + k * 2) % flagC.length], 14); b.scale.y = 1.15; b.position.set(bx + (i - 1) * 0.35, 2.4 + (i % 2) * 0.35, bz); g.add(b); const st = cyl(0.006, 0.006, 2.2, '#FFFFFF', 4); st.position.set(bx + (i - 1) * 0.2, 1.2, bz); g.add(st); } });
    // великий кольоровий килим
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 256; const x2 = cv.getContext('2d')!; flagC.forEach((c, i) => { x2.fillStyle = c; x2.beginPath(); x2.arc(128, 128, 128 - i * 20, 0, Math.PI * 2); x2.fill(); }); const rt = new THREE.CanvasTexture(cv); rt.colorSpace = THREE.SRGBColorSpace;
    if (id !== 'home') { const rug = new THREE.Mesh(new THREE.CircleGeometry(1.6, 40), new THREE.MeshBasicMaterial({ map: rt })); rug.rotation.x = -Math.PI / 2; rug.position.set(W * 0.18, 0.025, D * 0.2); g.add(rug); }
    if (id === 'post') {
      this.wallpaper(g, wallpaperTex('stripes', '#FFD6D1', '#FFB3AA'), W, D);
      this.art(g, posterTex({ title: 'SEND A SMILE', lines: ['Letters', 'Parcels', 'Postcards'], bg: '#FFF3A6', icons: [['envelope', '#FFFFFF'], ['heart', '#E5484D']] }), 1.5, 2.0, -2.2, 2.0, BZ);
      this.art(g, posterTex({ title: 'ISLAND MAP', lines: ['Sunny Street', 'Oak Street', 'Beach Road'], bg: '#BFE6FA', icons: [['star', '#FFC53D'], ['fish', '#F5862D'], ['sun', '#FFC53D']] }), 1.5, 2.0, 2.2, 2.0, BZ);
      this.art(g, graffitiTex('POST!', ['#E5484D', '#FFC53D', '#3E7BFA']), 5.2, 1.95, LX, 2.3, -1.6, R);
      const mb = box(0.7, 1.1, 0.6, '#E5484D'); mb.position.set(6.2, 0.55, -3.2); g.add(mb); const top = cyl(0.35, 0.35, 0.6, '#E5484D', 14); top.rotation.z = R; top.position.set(6.2, 1.1, -3.2); g.add(top);
      this.lamps(g, [-1.5, 1.5], -2.6, '#E5484D');
    }
    if (id === 'cafe') {
      this.wallpaper(g, wallpaperTex('dots', '#FFE3EE', '#FF8FB8'), W, D);
      this.art(g, chalkTex('MENU', ['Sandwich|3', 'Hot chocolate|2', 'Lemonade|2', 'Tea|1', 'Cookie|1']), 2.2, 1.65, -2.3, 2.05, BZ);
      this.art(g, posterTex({ title: 'CAT CAFE', lines: ['Fresh every day'], bg: '#FFE0EA', icons: [['cup', '#FFFFFF'], ['cat', '#F4A340']] }), 1.5, 2.0, 2.3, 2.0, BZ);
      this.art(g, neonTex('COFFEE', '#FF7EB6'), 1.9, 0.6, LX, 3.05, 3.0, R);
      this.art(g, graffitiTex('YUM!', ['#F76AA8', '#FFC53D', '#30A46C']), 5.2, 1.95, LX, 2.3, -1.4, R);
      [[-3.6, 1.6], [1.4, 2.2], [4.8, 0]].forEach(([x, z]) => { const c = cyl(0.08, 0.06, 0.14, '#FFFFFF', 10); c.position.set(x + 0.15, 0.97, z); g.add(c); const cake = sph(0.1, '#F7A1B5', 8); cake.position.set(x - 0.2, 0.97, z + 0.1); g.add(cake); });
      this.lamps(g, [-1.5, 0, 1.5], -2.6, '#F76AA8');
    }
    if (id === 'store') {
      this.wallpaper(g, wallpaperTex('checks', '#ECE6FF', '#C9B8FF'), W, D);
      this.art(g, posterTex({ title: 'BIG SALE!', lines: ['Bikes', 'Toys', 'Pets'], bg: '#E5484D', fg: '#FFFFFF', icons: [['star', '#FFC53D'], ['star', '#FFFFFF']] }), 1.5, 2.0, -2.2, 2.0, BZ);
      this.art(g, posterTex({ title: 'NEW TOYS', lines: ['Fun for everyone'], bg: '#FFF3A6', icons: [['balloon', '#3E7BFA'], ['balloon', '#F76AA8'], ['star', '#30A46C']] }), 1.5, 2.0, 0.4, 2.0, BZ);
      this.art(g, graffitiTex('MURLY', ['#7C66DC', '#F76AA8', '#FFC53D']), 5.2, 1.95, LX, 2.3, -1.4, R);
      this.goods(g, -6.15, -3.5, -4.85, [0.45, 1.05, 1.65], ['#E5484D', '#FFC53D', '#3E7BFA', '#30A46C', '#F76AA8', '#7C66DC']);
      this.lamps(g, [-1.5, 1.5], -2.6, '#7C66DC');
    }
    if (id === 'bakery') {
      this.wallpaper(g, wallpaperTex('stripes', '#FFF1CC', '#FFD36E'), W, D);
      this.art(g, posterTex({ title: 'FRESH BREAD', lines: ['Every morning'], bg: '#F3D27A', icons: [['bread', '#C68A4A'], ['bread', '#E8B46A']] }), 1.5, 2.0, -1.1, 2.0, BZ);
      this.art(g, chalkTex('TODAY', ['Chocolate cake|5', 'Cupcake|2', 'Bread|1', 'Cookies|1']), 2.0, 1.5, 1.6, 2.05, BZ);
      this.art(g, graffitiTex('YUMMY', ['#F5862D', '#F76AA8', '#7A4E25']), 5.2, 1.95, LX, 2.3, -1.4, R);
      this.goods(g, 2.6, 4.2, -4.85, [1.15], ['#C68A4A', '#E8B46A', '#8B5E34'], 'bread');
      this.goods(g, -1.9, 1.9, -2.6, [1.07], ['#C68A4A', '#E8B46A'], 'bread');
      this.lamps(g, [-1.5, 1.5], -2.6, '#F5862D');
    }
    if (id === 'boutique') {
      this.wallpaper(g, wallpaperTex('hearts', '#E2F7EA', '#FF9CC2'), W, D);
      this.art(g, posterTex({ title: 'NEW STYLE', lines: ['Spring collection'], bg: '#F7B7C8', icons: [['shirt', '#3E7BFA'], ['shirt', '#FFC53D'], ['shirt', '#30A46C']] }), 1.5, 2.0, 0.2, 2.0, BZ);
      this.art(g, graffitiTex('FASHION', ['#F76AA8', '#7C66DC', '#30A46C']), 5.2, 1.95, LX, 2.3, -2.6, R);
      const mir = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.9), new THREE.MeshStandardMaterial({ color: '#DCEFFA', roughness: 0.05, metalness: 0.3 })); mir.position.set(LX + 0.02, 1.2, 0.6); mir.rotation.y = R; g.add(mir);
      const fr = box(0.06, 2.05, 1.15, '#FFC53D'); fr.position.set(LX - 0.01, 1.2, 0.6); g.add(fr);
      [[-4.8, -4.6], [-3.6, -4.6], [-2.4, -4.6], [3.4, -4.6], [4.6, -4.6], [5.4, 0.4]].forEach(([x, z], i) => { const sh = box(0.32, 0.4, 0.06, ['#F76AA8', '#3E7BFA', '#FFC53D', '#30A46C', '#7C66DC', '#E5484D'][i]); sh.position.set(x, 1.25, z + 0.2); g.add(sh); });
      this.lamps(g, [-1, 1], -2.6, '#30A46C');
    }
    if (id.startsWith('house')) {
      this.wallpaper(g, wallpaperTex('waves', '#E3F0FA', '#A9CDEB'), W, D);
      this.art(g, posterTex({ title: 'HOME SWEET HOME', bg: '#FFF8D6', icons: [['heart', '#E5484D'], ['cat', '#F7F3EA'], ['heart', '#F76AA8']], w: 512, h: 256 }), 2, 1, -1, 2.6, BZ);
      [[-5, 1.9, '#F4A340'], [-5, 0.5, '#9AA3AE']].forEach(([z, y, c]) => this.art(g, posterTex({ title: '', bg: '#FFFFFF', icons: [['cat', c as string]], w: 256, h: 256, frame: '#8B5E34' }), 0.7, 0.7, LX, y as number + 0.2, z as number + 3, R));
      const clock = cyl(0.35, 0.35, 0.06, '#FFFFFF', 24); clock.rotation.x = R; clock.position.set(2.8, 2.6, BZ); g.add(clock); const hand1 = box(0.03, 0.22, 0.02, '#1A1A1A'); hand1.position.set(2.8, 2.7, BZ + 0.05); g.add(hand1); const hand2 = box(0.16, 0.03, 0.02, '#1A1A1A'); hand2.position.set(2.87, 2.6, BZ + 0.05); g.add(hand2);
    }
    if (id === 'lighthouse') {
      this.wallpaper(g, wallpaperTex('waves', '#EAF5FF', '#8EC9F5'), W, D);
      this.art(g, posterTex({ title: 'KEEP THE LIGHT ON', lines: ['Ships need us'], bg: '#BFE6FA', icons: [['anchor', '#3E7BFA'], ['fish', '#F5862D']] }), 1.5, 2.0, -1.2, 2.0, BZ);
      this.art(g, graffitiTex('AHOY!', ['#3E7BFA', '#E5484D', '#FFFFFF']), 5.2, 1.95, LX, 2.3, -2.4, R);
      const wheel = new THREE.Group(); wheel.add(mesh(new THREE.TorusGeometry(0.5, 0.06, 8, 24), toon('#8B5E34'))); for (let i = 0; i < 8; i++) { const sp = box(0.05, 1.3, 0.05, '#8B5E34'); sp.rotation.z = (i / 8) * Math.PI; wheel.add(sp); } wheel.position.set(LX + 0.1, 1.6, 1); wheel.rotation.y = R; g.add(wheel);
    }
    if (id === 'supermarket') {
      this.wallpaper(g, wallpaperTex('checks', '#FFFFFF', '#FFE0E3'), W, D);
      this.art(g, posterTex({ title: 'FRESH FOOD', lines: ['Fruit, bread, milk', 'and much more!'], bg: '#BDE5C4', icons: [['star', '#FFC53D'], ['fish', '#3E7BFA'], ['bread', '#C68A4A']] }), 1.5, 2.0, LX, 2.0, 0, R);
      const o = g.position;
      SHELVES.forEach((sh, i) => {
        const row = i < 4 ? 0 : 1; const x = -6.6 + (i % 4) * 4.2 + 0.6, z = row ? 0.2 : -4.4;
        const u = new THREE.Group(); u.position.set(x, 0, z); g.add(u);
        const back = box(3.4, 2.3, 0.1, '#F4F1E8'); back.position.set(0, 1.15, -0.4); u.add(back);
        [-1.7, 1.7].forEach((sx) => { const side = box(0.08, 2.3, 0.85, sh.c); side.position.set(sx, 1.15, 0); u.add(side); });
        [0.15, 0.8, 1.45, 2.1].forEach((y) => { const pl = box(3.4, 0.06, 0.85, '#FFFFFF'); pl.position.set(0, y, 0); u.add(pl); });
        const top = box(3.5, 0.35, 0.15, sh.c); top.position.set(0, 2.45, 0.38); u.add(top);
        const lab = sign(sh.en.toUpperCase(), sh.c, '#FFFFFF', 3.2); lab.position.set(0, 2.85, 0.3); u.add(lab);
        const prods = PRODUCTS.filter((p) => p.cat === sh.id);
        [0.2, 0.85, 1.5].forEach((y, lv) => { for (let k = 0; k < 6; k++) { const pid = prods[(k + lv * 2) % prods.length].id; void productObj(pid, 0.42).then((ob) => { ob.position.set(-1.4 + k * 0.56, y, 0.1); u.add(ob); }); } });
        this.roomColsExtra.push({ room: 'supermarket', x: o.x + x, z: o.z + z, r: 1.0 }, { room: 'supermarket', x: o.x + x - 1.2, z: o.z + z, r: 0.8 }, { room: 'supermarket', x: o.x + x + 1.2, z: o.z + z, r: 0.8 });
        this.spots.push({ id: `shelf:${sh.id}`, x: o.x + x, z: o.z + z + 1.4, r: 1.4, label: sh.en });
        this.shelfPos[sh.id] = { x: o.x + x, z: o.z + z };
      });
    }
    if (id === 'school') {
      this.wallpaper(g, wallpaperTex('stars', '#FFF8E1', '#FFE08A'), W, D);
      this.art(g, chalkTex('TODAY: ENGLISH', ['Hello! = Привіт!', 'I am a cat.', 'She is happy.', 'We like books!']), 4.2, 2.0, -1.2, 2.2, BZ);
      this.art(g, posterTex({ title: 'A B C', lines: ['apple  ball  cat', 'dog  egg  fish'], bg: '#BDE5C4', icons: [['star', '#FFC53D'], ['cat', '#F4A340'], ['fish', '#3E7BFA']] }), 1.5, 2.0, 2.8, 2.0, BZ);
      this.art(g, graffitiTex('LEARN & PLAY', ['#7C66DC', '#30A46C', '#F5862D']), 5.2, 1.9, LX, 2.3, -1.6, R);
    }
    if (id === 'tent') {
      this.wallpaper(g, wallpaperTex('stripes', '#E9E2C3', '#C8DB8F'), W, D);
      this.art(g, graffitiTex('CAMP MURLY', ['#30A46C', '#F5862D', '#FFC53D']), 5.6, 1.9, 0.5, 2.3, BZ);
      this.art(g, posterTex({ title: 'NIGHT SKY', lines: ['Look at the stars!'], bg: '#1E2A4A', fg: '#FFFFFF', icons: [['star', '#FFC53D'], ['star', '#FFFFFF'], ['star', '#FFC53D']] }), 1.5, 2.0, LX, 2.0, -2.2, R);
    }
    if (id === 'home') {
      const WP: Record<string, ['stripes' | 'dots' | 'checks' | 'waves' | 'stars' | 'hearts' | 'bricks', string, string]> = { 'wall-stripes': ['stripes', '#FFD6D1', '#FFB3AA'], 'wall-dots': ['dots', '#E3F0FA', '#8EC9F5'], 'wall-stars': ['stars', '#FFF3DA', '#FFD36E'], 'wall-hearts': ['hearts', '#FFF0F5', '#FF9CC2'], 'wall-checks': ['checks', '#E2F7EA', '#A8EBCB'], 'wall-waves': ['waves', '#E3F0FA', '#8EC9F5'], 'wall-bricks': ['bricks', '#E07A5F', '#F4EEE2'] };
      const wp = WP[this.homeWall]; if (wp) this.wallpaper(g, wallpaperTex(wp[0], wp[1], wp[2]), W, D);
      this.art(g, posterTex({ title: 'MY HOME', bg: '#FFE08A', icons: [['heart', '#E5484D'], ['star', '#FFFFFF']], w: 512, h: 256 }), 2, 1, 0, 3.0, BZ);
    }
  }
  // ---- предмети, якими можна користуватися ----
  addUse(kind: string, x: number, z: number, y: number, rot: number, room: string, r = 1.3) {
    const id = `use:${this.useN++}`; this.useMeta[id] = { kind, x, z, y, rot, room };
    this.spots.push({ id, x, z, r, label: USE[kind] ?? kind }); return id;
  }
  clearUses(room: string) { const ids = Object.keys(this.useMeta).filter((k) => this.useMeta[k].room === room); ids.forEach((k) => delete this.useMeta[k]); this.spots = this.spots.filter((s) => !ids.includes(s.id)); }
  setPose(kind: Pose['kind'] | null, m?: { x: number; z: number; y: number; rot: number }) {
    if (!kind || !m) { this.endPose(); return; }
    this.pose = { kind, ...m }; this.goal = null; if (this.goalRing) this.goalRing.visible = false; this.vel.set(0, 0, 0);
  }
  endPose() {
    if (!this.pose) return; this.pose = null; const h = this.hero;
    h.root.rotation.set(0, this.heroRot, 0); h.legL.rotation.x = h.legR.rotation.x = 0; h.legL.position.y = h.legR.position.y = 0.14; h.body.rotation.set(0, 0, 0);
    this.ev.onPoseEnd?.();
  }
  applyPose(t: number) {
    const p = this.pose!; const h = this.hero;
    if (p.kind === 'sit' || p.kind === 'ground' || p.kind === 'swing') {
      const sw = p.kind === 'swing' ? Math.sin(t * 2.4) * 0.5 : 0;
      h.root.position.set(p.x + Math.sin(p.rot) * sw, p.y + (p.kind === 'swing' ? Math.abs(sw) * 0.3 : 0), p.z + Math.cos(p.rot) * sw);
      h.legL.rotation.x = h.legR.rotation.x = -1.4; h.legL.position.y = h.legR.position.y = 0.3; h.legL.position.z = h.legR.position.z = 0.15;
      h.body.position.y = 0; h.body.rotation.x = p.kind === 'swing' ? -sw * 0.3 : 0; h.body.scale.set(1, 1, 1);
      h.armL.rotation.x = h.armR.rotation.x = p.kind === 'swing' ? -2.4 : -0.3; h.armL.rotation.z = -0.35; h.armR.rotation.z = 0.35;
    }
    if (p.kind === 'sleep') { h.root.position.set(p.x, p.y + 0.45, p.z); h.root.rotation.set(0, p.rot, Math.PI / 2 * 0.92); h.body.rotation.set(0, 0, 0); h.body.position.y = Math.sin(t * 1.5) * 0.02; h.armL.rotation.x = h.armR.rotation.x = 0; }
    if (p.kind === 'use') { h.root.position.set(p.x, 0, p.z); h.armR.rotation.x = -1.1 + Math.sin(t * 7) * 0.35; h.armL.rotation.x = -0.9 + Math.cos(t * 7) * 0.3; h.body.rotation.z = Math.sin(t * 3) * 0.04; }
    if (p.kind === 'swim') { h.root.position.set(p.x + Math.sin(t * 0.8) * 0.6, p.y - 0.35 + Math.sin(t * 3) * 0.05, p.z); h.armL.rotation.x = Math.sin(t * 6) * 1.6; h.armR.rotation.x = -Math.sin(t * 6) * 1.6; h.armL.rotation.z = -1.2; h.armR.rotation.z = 1.2; }
  }
  // хмаринка над головою
  speechTex(text: string, bg = '#FFFFFF') {
    const cv = document.createElement('canvas'); cv.width = 384; cv.height = 160; const x = cv.getContext('2d')!;
    x.fillStyle = bg; x.strokeStyle = '#1A1A1A'; x.lineWidth = 8; x.beginPath(); x.roundRect(8, 8, 368, 110, 40); x.fill(); x.stroke();
    x.beginPath(); x.moveTo(170, 114); x.lineTo(192, 150); x.lineTo(214, 114); x.fill(); x.stroke(); x.fillStyle = bg; x.fillRect(172, 106, 40, 12);
    x.fillStyle = '#1A1A1A'; x.font = '800 56px system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 192, 64, 340);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  bubble(text: string, secs = 2.5, bg = '#FFFFFF') {
    if (this.bubbleObj) { this.hero.root.remove(this.bubbleObj); this.bubbleObj = null; }
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.speechTex(text, bg), depthTest: false })); sp.scale.set(1.9, 0.8, 1); sp.position.y = 2.75; sp.renderOrder = 10;
    this.hero.root.add(sp); this.bubbleObj = sp; this.bubbleT = secs;
  }
  npcBubble(i: number, text: string, bg = '#FFE0EA') {
    const n = this.npcs[i]; if (!n) return; const old = this.npcBubbles[i]; if (old) n.rig.root.remove(old);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.speechTex(text, bg), depthTest: false })); sp.scale.set(1.9, 0.8, 1); sp.position.y = 2.6; n.rig.root.add(sp); this.npcBubbles[i] = sp;
    window.setTimeout(() => { if (this.npcBubbles[i] === sp) { n.rig.root.remove(sp); this.npcBubbles[i] = null; } }, 2600);
  }
  setName(name: string) {
    if (this.nameTag) { this.hero.root.remove(this.nameTag); this.nameTag = null; }
    if (!name) return; const sp = sign(name, '#1A1A1A', '#FFFFFF', 1.6); sp.position.y = 2.25; (sp.material as THREE.SpriteMaterial).depthTest = false; sp.renderOrder = 9; this.hero.root.add(sp); this.nameTag = sp;
  }
  npcDance(i: number) { this.npcDanceT[i] = 3; }
  toggleFollow(i: number) { if (this.followers.has(i)) this.followers.delete(i); else this.followers.add(i); return this.followers.has(i); }
  skipToMorning() { this.dayP = 0.02; }
  enterRoom(id: string) {
    const o = this.origins[id]; if (!o || this.inside) return;
    this.outPos.copy(this.heroPos); this.inside = true; this.roomId = id; this.cur = o; this.curW = this.sizes[id]?.w ?? ROOM.w; this.curD = this.sizes[id]?.d ?? ROOM.d;
    this.heroPos.set(o.x - this.curW / 2 + 2.2, 0, o.z + 3); this.vel.set(0, 0, 0); this.camYaw = 0.3; this.camPitch = 0.62; this.camDist = 8.5; this.cam.position.set(o.x, 8, o.z + 11);
    if (this.pet) this.petPos.copy(this.heroPos); this.goal = null; if (this.goalRing) this.goalRing.visible = false;
  }
  enterHome() { this.enterRoom('home'); }
  exitHome() {
    if (!this.inside) return; this.inside = false; this.roomId = null; this.decorate = false; this.placing = null;
    this.heroPos.copy(this.outPos); this.heroPos.y = 0; this.vel.set(0, 0, 0); this.camYaw = this.heroRot + Math.PI; this.camPitch = 0.42; this.camDist = 9;
    this.cam.position.set(this.heroPos.x + Math.sin(this.camYaw) * 9, 5, this.heroPos.z + Math.cos(this.camYaw) * 9); if (this.pet) this.petPos.copy(this.heroPos); this.goal = null;
  }
  async setRoom(list: RoomItem[]) {
    const seq = ++this.roomSeq; this.roomList = list;
    const scenes = await pack('furn');
    if (seq !== this.roomSeq) return;
    this.roomItems.clear(); this.roomCol = []; this.clearUses('home');
    list.forEach((it, i) => {
      const src = it.f.startsWith('x-') ? null : scenes.get(it.f); if (!src && !it.f.startsWith('x-')) return;
      // справжній масштаб Kenney: 1 одиниця ≈ 1/FK нашого світу
      const g = new THREE.Group(); const inner = new THREE.Group(); if (src) { src.children.forEach((c) => inner.add(c.clone(true))); inner.scale.setScalar(FK); } else inner.add(codeItem(it.f)); g.add(inner);
      const b = new THREE.Box3().setFromObject(inner); const c = b.getCenter(new THREE.Vector3()); inner.position.set(-c.x, -b.min.y, -c.z);
      g.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; m.userData.idx = i; (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { const st = mt as THREE.MeshStandardMaterial; if (st.metalness !== undefined) { st.metalness = Math.min(st.metalness, 0.15); st.roughness = Math.max(st.roughness ?? 1, 0.45); if (st.map) st.map.anisotropy = 8; } }); } });
      g.position.set(it.x, 0, it.z); g.rotation.y = it.r; g.userData.idx = i; this.roomItems.add(g);
      { const kind = useKind(it.f); const hb = new THREE.Box3().setFromObject(inner); const hh = hb.max.y - hb.min.y;
        if (kind) { const front = kind === 'sit' || kind === 'sleep' ? 0 : 0.9; this.addUse(kind, ROOM.x + it.x + Math.sin(it.r) * front, ROOM.z + it.z + Math.cos(it.r) * front, kind === 'sit' ? hh * (/^lounge/.test(it.f) ? 0.38 : 0.42) : hh, kind === 'sit' || kind === 'sleep' ? it.r : it.r + Math.PI, 'home', kind === 'sit' ? 1.0 : 1.3); } }
      const sz = b.getSize(new THREE.Vector3()); const r = Math.min(sz.x, sz.z) / 2;
      if (!/^rug/.test(it.f) && sz.y > 0.4) this.roomCol.push({ x: ROOM.x + it.x, z: ROOM.z + it.z, r: Math.max(0.2, r * 0.9) });
    });
  }

  // ---- мій дім ----
  houseLevel = 0; yardList: string[] = [];
  async setHouse(level: number) {
    this.houseLevel = level;
    this.homeGroup.clear();
    this.colliders = this.colliders.filter((c) => !(c as { home?: boolean }).home);
    if (!level) {
      const s = sign('FOR SALE', '#30A46C', '#FFFFFF', 3.4); s.position.set(HOME.x, 2.4, HOME.z); this.homeGroup.add(s);
      const p = cyl(0.08, 0.08, 1.6, '#6B4F2A'); p.position.set(HOME.x, 0.8, HOME.z); this.homeGroup.add(p);
      return;
    }
    const h = await model('sub', HOUSES[level], [0, 6, 7.5, 9, 10.5][level] ?? 9);
    h.position.set(HOME.x, 0, HOME.z + 1); this.homeGroup.add(h);
    const s = sign('MY HOME', '#FFC53D', '#1A1A1A', 3.4); s.position.set(HOME.x, new THREE.Box3().setFromObject(h).max.y + 1.2, HOME.z + 1); this.homeGroup.add(s);
    this.colliders.push(Object.assign({ x: HOME.x, z: HOME.z + 1, r: 3.8 + level * 0.4 }, { home: true }));
  }
  async setYard(list: string[]) {
    this.yardList = list; this.yardGroup.clear(); this.tramp = null; this.clearUses('yard'); this.spots = this.spots.filter((x) => x.label !== 'MY TENT');
    const slot = (i: number) => { const a = [[-7, -5], [7, -5], [-7, 5], [7, 5], [-4, -6.5], [4, -6.5], [-8, 0], [8, 0], [0, 7]][i % 9]; return { x: HOME.x + a[0], z: HOME.z + a[1] }; };
    const around = ['yard-fenceall', 'yard-hedge', 'yard-path', 'yard-planters'];
    const slotList = list.filter((x) => !around.includes(x));
    if (list.includes('yard-fenceall') || list.includes('yard-hedge')) {
      const hedge = !list.includes('yard-fenceall'); const x0 = HOME.x - 9, x1 = HOME.x + 9, z0 = HOME.z - 8, z1 = HOME.z + 8;
      const seg = async (x: number, z: number, rot: number) => { let g: THREE.Object3D; if (hedge) { const h = new THREE.Group(); const b = box(2, 1.1, 0.7, '#4E9A3E'); b.position.y = 0.55; h.add(b); for (let k = 0; k < 3; k++) { const sp = sph(0.45, '#5DAA48', 10); sp.position.set(-0.65 + k * 0.65, 1.05, 0); h.add(sp); } g = h; } else g = await model('sub', 'fence', 2); g.position.set(x, 0, z); g.rotation.y = rot; this.yardGroup.add(g); };
      for (let x = x0 + 1; x < x1; x += 2) { await seg(x, z1, 0); if (Math.abs(x - HOME.x) > 2.2) await seg(x, z0, 0); }
      for (let z = z0 + 1; z < z1; z += 2) { await seg(x0, z, Math.PI / 2); await seg(x1, z, Math.PI / 2); }
    }
    if (list.includes('yard-path')) for (let k = 0; k < 4; k++) { const st = await model('sub', 'path-stones-short', 1.6); st.position.set(HOME.x, 0.02, HOME.z - 7.6 + k * 1.5); this.yardGroup.add(st); }
    if (list.includes('yard-planters')) for (const dx of [-3.4, 3.4]) { const pl = await model('sub', 'planter', 1.8); pl.position.set(HOME.x + dx, 0, HOME.z - 4.6); this.yardGroup.add(pl); }
    for (let i = 0; i < slotList.length; i++) {
      const id = slotList[i]; const { x, z } = slot(i);
      const g = await yardItem(id); if (id === 'yard-tramp') this.tramp = new THREE.Vector3(x, 0, z);
      if (!g) continue;
      g.position.set(x, 0, z); this.yardGroup.add(g);
      if (id === 'yard-bench') this.addUse('sit', x, z, 0.45, 0, 'yard', 1.3);
      if (id === 'yard-fire') this.addUse('marsh', x, z + 1.2, 0, Math.PI, 'yard', 1.3);
      if (id === 'yard-pool') this.addUse('swim', x, z, 0.4, 0, 'yard', 2.2);
      if (id === 'yard-tent') this.spots.push({ id: 'enter-tent', x, z: z + 1.8, r: 1.6, label: 'MY TENT' });
      if (id === 'yard-garden') { this.addUse('garden', x, z + 1.8, 0, Math.PI, 'yard', 1.8); this.gardenObj = g as THREE.Group; this.setGarden(this.gardenPlots); }
    }
  }

  // ---- персонаж, транспорт, улюбленець ----
  setOutfit(o: Outfit) { wear(this.hero, o); }
  setRide(id: string | null) {
    if (this.ride) { this.hero.root.remove(this.ride); this.ride = null; }
    this.rideId = id;
    if (id) {
      this.ride = makeRide(id); this.hero.root.add(this.ride);
      const glb: Record<string, string> = { 'ride-hatch': 'car_hatchback', 'ride-sedan': 'car_sedan', 'ride-wagon': 'car_stationwagon', 'ride-yellow': 'car_taxi', 'ride-police': 'car_police' };
      if (glb[id]) { const holder = this.ride; void model('city', glb[id], 2.6).then((m) => { const b = new THREE.Box3().setFromObject(m).getSize(new THREE.Vector3()); if (b.x > b.z) m.rotation.y = Math.PI / 2; m.position.y = 0.05; holder.add(m); }); }
    }
  }
  setPet(id: string | null) {
    if (this.pet) { this.scene.remove(this.pet); this.pet = null; }
    this.petId = id;
    if (id) { this.pet = makePet(id); this.petPos.copy(this.heroPos).add(new THREE.Vector3(1.5, 0, -1.5)); this.pet.position.copy(this.petPos); this.scene.add(this.pet); }
  }
  setCarry(on: boolean) { this.carry.visible = on; }
  setGot(ids: string[]) { ids.forEach((id) => this.got.add(id)); this.stars.forEach((s) => { s.obj.visible = !this.got.has(s.id); }); }
  npcName(i: number) { return NPC_NAMES[i % NPC_NAMES.length]; }
  setMarker(x: number | null, z = 0) { this.markerOn = x !== null; this.marker.visible = this.markerOn; if (x !== null) this.marker.position.set(x, 0, z); }
  spotPos(id: string) { return this.spots.find((s) => s.id === id); }
  setHeroPos(x: number, z: number) { this.heroPos.set(x, 0, z); this.vel.set(0, 0, 0); this.cam.position.set(x, 6, z + 9); if (this.pet) this.petPos.set(x + 1, 0, z); }
  teleportHome() { this.heroPos.set(HOME.x, 0, HOME.z - 9); }

  // ---- керування ----
  kd = (e: KeyboardEvent) => { if ((e.target as HTMLElement)?.tagName === 'INPUT') return; this.keys.add(e.code); if (e.code === 'Space') { e.preventDefault(); this.jump(); } };
  ku = (e: KeyboardEvent) => { this.keys.delete(e.code); };
  drag: { id: number; x: number; y: number } | null = null;
  downAt = { x: 0, y: 0, t: 0 };
  pd = (e: PointerEvent) => { this.drag = { id: e.pointerId, x: e.clientX, y: e.clientY }; this.downAt = { x: e.clientX, y: e.clientY, t: performance.now() }; };
  pm = (e: PointerEvent) => { if (!this.drag || e.pointerId !== this.drag.id) return; const dx = e.clientX - this.drag.x, dy = e.clientY - this.drag.y; this.drag.x = e.clientX; this.drag.y = e.clientY; this.camYaw -= dx * 0.006; this.camPitch = THREE.MathUtils.clamp(this.camPitch + dy * 0.004, 0.12, 1.2); };
  pu = (e: PointerEvent) => {
    if (this.drag?.id !== e.pointerId) return;
    this.drag = null;
    // короткий дотик або клік без руху: іти в цю точку
    if (Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) < 8 && performance.now() - this.downAt.t < 400) {
      const r = this.renderer.domElement.getBoundingClientRect();
      const v = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      this.ray.setFromCamera(v, this.cam);
      const hit = new THREE.Vector3();
      if (!this.decorate) {
        const ph = this.ray.intersectObject(this.propsGroup, true).find((h) => h.object.userData.prop !== undefined);
        if (ph && !this.heldId) { this.ev.onProp?.(ph.object.userData.prop as number); return; }
        if (this.heldId) { const pt = this.surfaceAt(this.ray); if (pt) { this.ev.onPut?.(pt.x, pt.y, pt.z); return; } }
      }
      if (this.inside && this.decorate) {
        if (!this.placing) { const hits = this.ray.intersectObject(this.roomItems, true); const h0 = hits.find((h) => h.object.userData.idx !== undefined); if (h0) { this.ev.onPick?.(h0.object.userData.idx as number); return; } }
        if (this.placing && this.ray.ray.intersectPlane(this.ground, hit)) { const lx = THREE.MathUtils.clamp(hit.x - this.cur.x, -this.curW / 2 + 0.8, this.curW / 2 - 0.8), lz = THREE.MathUtils.clamp(hit.z - this.cur.z, -this.curD / 2 + 0.8, this.curD / 2 - 0.8); this.ev.onPlace?.(lx, lz); }
        return;
      }
      if (this.ray.ray.intersectPlane(this.ground, hit) && (this.inside ? Math.abs(hit.x - this.cur.x) < this.curW / 2 && Math.abs(hit.z - this.cur.z) < this.curD / 2 : Math.hypot(hit.x, hit.z) < 73 || (Math.abs(hit.x) < 1.5 && hit.z < -70 && hit.z > -86))) this.walkTo(hit.x, hit.z);
    }
  };
  walkTo(x: number, z: number) {
    this.goal = new THREE.Vector3(x, 0, z);
    if (!this.goalRing) { this.goalRing = mesh(new THREE.RingGeometry(0.35, 0.55, 24), new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.85 }), false); this.goalRing.rotation.x = -Math.PI / 2; this.scene.add(this.goalRing); }
    this.goalRing.position.set(x, 0.06, z); this.goalRing.visible = true;
  }
  dance() { this.danceT = 2.4; }
  wh = (e: WheelEvent) => { this.camDist = THREE.MathUtils.clamp(this.camDist + e.deltaY * 0.01, 4.5, 18); };
  jump() { if (this.pose) { this.endPose(); return; } if (this.onGround) { this.vy = this.rideId === 'ride-ufo' ? 9 : 7.5; this.onGround = false; this.wob.sqV -= 3; } }
  setJoy(x: number, y: number) { this.joy.x = x; this.joy.y = y; }

  // ---- цикл ----
  frames = 0; fpsT = 0;
  loop = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.05); const t = this.clock.elapsedTime;
    this.step(dt, t);
    this.renderer.render(this.scene, this.cam);
    this.frames++; this.fpsT += dt;
    if (this.fpsT > 3) { const fps = this.frames / this.fpsT; this.frames = 0; this.fpsT = 0; if (fps < 28 && this.renderer.shadowMap.enabled && this.renderer.getPixelRatio() > 1) { this.renderer.setPixelRatio(1); this.ev.onFps?.(true); } }
  };
  step(dt: number, t: number) {
    const k = this.keys;
    let ix = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0) + this.joy.x;
    let iz = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0) + this.joy.y;
    if (Math.hypot(ix, iz) > 0.05 && this.goal) { this.goal = null; if (this.goalRing) this.goalRing.visible = false; }
    let goalDir: THREE.Vector3 | null = null;
    if (this.goal) { const d = this.goal.clone().sub(this.heroPos); d.y = 0; if (d.length() < 0.5) { this.goal = null; if (this.goalRing) this.goalRing.visible = false; } else {
      goalDir = d.normalize();
      // обхід перешкод: якщо будинок попереду, ідемо по дотичній
      for (const c of this.boating ? [] : this.inside ? (this.roomId === 'home' ? [...this.roomCol, ...this.partCol] : [...(this.roomCols[this.roomId ?? ''] ?? []), ...this.roomColsExtra.filter((x) => x.room === this.roomId)]) : this.colliders) {
        const tx = c.x - this.heroPos.x, tz = c.z - this.heroPos.z; const dist = Math.hypot(tx, tz);
        const along = tx * goalDir.x + tz * goalDir.z;
        if (along <= 0 || dist > c.r + 2.5 || along > d.length() + 0.5) continue;
        if (Math.abs(tx * goalDir.z - tz * goalDir.x) < c.r + 0.7) {
          const t1 = new THREE.Vector3(tz, 0, -tx).normalize(), t2 = t1.clone().negate();
          goalDir = (t1.dot(goalDir) > t2.dot(goalDir) ? t1 : t2).lerp(goalDir, 0.15).normalize(); break;
        }
      }
    } }
    const len = Math.hypot(ix, iz); if (len > 1) { ix /= len; iz /= len; }
    if (this.pose && (len > 0.1 || this.goal)) this.endPose();
    const running = k.has('ShiftLeft') || k.has('ShiftRight') || this.run;
    const base = 5.2 * (this.boating ? 2.6 : this.rideId ? SPEED[this.rideId] ?? 1 : running ? 1.6 : 1);
    // напрям відносно камери
    const fwd = new THREE.Vector3(-Math.sin(this.camYaw), 0, -Math.cos(this.camYaw));
    const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
    const want = goalDir ? goalDir.multiplyScalar(base) : fwd.multiplyScalar(iz).add(right.multiplyScalar(ix)).multiplyScalar(base);
    const acc = this.onGround ? 10 : 4;
    const prevV = this.vel.clone();
    this.vel.lerp(want, 1 - Math.exp(-acc * dt));
    this.heroPos.addScaledVector(this.vel, dt);
    // стрибки й гравітація (батут підкидає вище)
    const fly = this.rideId === 'ride-ufo';
    this.vy -= (fly ? 9 : 22) * dt; this.heroPos.y += this.vy * dt;
    const onDeck = !this.inside && Math.abs(this.heroPos.x) < 1.6 && this.heroPos.z < -66;
    const groundY = fly && len > 0.1 ? 1.2 : onDeck ? 0.34 : 0;
    if (this.heroPos.y <= groundY) {
      if (!this.onGround && this.vy < -6) this.wob.sqV += this.vy * 0.25;
      this.heroPos.y = groundY; this.vy = 0; this.onGround = true;
      if (this.tramp && Math.hypot(this.heroPos.x - this.tramp.x, this.heroPos.z - this.tramp.z) < 1.4) { this.vy = 13; this.onGround = false; this.wob.sqV -= 4; }
    }
    // зіткнення з будинками й межею острова
    for (const c of this.inside ? (this.roomId === 'home' ? [...this.roomCol, ...this.partCol] : this.roomCols[this.roomId ?? ''] ?? []) : this.colliders) {
      const dx = this.heroPos.x - c.x, dz = this.heroPos.z - c.z; const d = Math.hypot(dx, dz); const r = c.r + 0.45;
      if (d < r && d > 0.0001) { this.heroPos.x = c.x + (dx / d) * r; this.heroPos.z = c.z + (dz / d) * r; }
    }
    if (this.inside) { this.heroPos.x = THREE.MathUtils.clamp(this.heroPos.x, this.cur.x - this.curW / 2 + 0.6, this.cur.x + this.curW / 2 - 0.6); this.heroPos.z = THREE.MathUtils.clamp(this.heroPos.z, this.cur.z - this.curD / 2 + 0.6, this.cur.z + this.curD / 2 - 0.6); }
    else {
      if (this.boating) { const d0 = Math.hypot(this.heroPos.x, this.heroPos.z); const k0 = THREE.MathUtils.clamp(d0, 84, 170) / Math.max(d0, 0.001); this.heroPos.x *= k0; this.heroPos.z *= k0; }
      const onPier = !this.boating && Math.abs(this.heroPos.x) < 1.6 && this.heroPos.z < -69 && this.heroPos.z > -86.5;
      const R = 73; const dc = Math.hypot(this.heroPos.x, this.heroPos.z);
      if (onPier) { if (this.heroPos.z < -71) this.heroPos.x = THREE.MathUtils.clamp(this.heroPos.x, -1.3, 1.3); this.heroPos.z = Math.max(this.heroPos.z, -85.6); }
      else if (dc > R && !this.boating) { this.heroPos.x *= R / dc; this.heroPos.z *= R / dc; }
    }
    if (this.pose) { this.heroPos.set(this.pose.x, 0, this.pose.z); this.heroRot = this.pose.rot; this.vel.set(0, 0, 0); this.vy = 0; }
    const speed = Math.hypot(this.vel.x, this.vel.z);
    if (speed > 0.3) { const tr = Math.atan2(this.vel.x, this.vel.z); let d = tr - this.heroRot; d = Math.atan2(Math.sin(d), Math.cos(d)); this.heroRot += d * (1 - Math.exp(-10 * dt)); }
    // «желейна» хода: нахил від прискорення, пружинне стискання
    const accel = this.vel.clone().sub(prevV).length() / Math.max(dt, 0.001);
    const W = this.wob;
    W.leanV += ((Math.min(speed, 12) * 0.035 + Math.min(accel, 40) * 0.004) - W.lean) * 60 * dt - W.leanV * 8 * dt; W.lean += W.leanV * dt;
    W.sqV += (1 - W.sq) * 140 * dt - W.sqV * 9 * dt; W.sq += W.sqV * dt;
    const h = this.hero; const ride = !!this.rideId;
    h.root.position.copy(this.heroPos); h.root.rotation.y = this.heroRot;
    const walk = !ride && this.onGround && speed > 0.4; const ph = t * (running ? 14 : 10);
    h.body.position.y = (ride ? (CARS.includes(this.rideId!) ? 0.55 : 0.25) : 0) + (walk ? Math.abs(Math.sin(ph)) * 0.12 : Math.sin(t * 2) * 0.02);
    h.body.rotation.x = W.lean + (walk ? 0 : 0); h.body.rotation.z = walk ? Math.sin(ph) * 0.12 : Math.sin(t * 1.3) * 0.03;
    h.body.scale.set(1 / Math.sqrt(W.sq), W.sq, 1 / Math.sqrt(W.sq));
    h.head.rotation.z = Math.sin(t * 1.7) * 0.05 - h.body.rotation.z * 0.6; h.head.rotation.x = -W.lean * 0.5;
    const flail = !this.onGround ? 1 : 0;
    h.armL.rotation.x = walk ? Math.sin(ph) * 0.9 : Math.sin(t * 2) * 0.08; h.armR.rotation.x = walk ? -Math.sin(ph) * 0.9 : -Math.sin(t * 2) * 0.08;
    h.armL.rotation.z = -0.35 - flail * (1.6 + Math.sin(t * 18) * 0.4) - (ride ? 0.6 : 0); h.armR.rotation.z = 0.35 + flail * (1.6 + Math.sin(t * 18 + 1) * 0.4) + (ride ? 0.6 : 0);
    h.legL.position.z = walk ? Math.sin(ph) * 0.18 : 0; h.legR.position.z = walk ? -Math.sin(ph) * 0.18 : 0;
    h.legL.visible = h.legR.visible = !CARS.includes(this.rideId ?? '');
    h.tail.rotation.y = Math.sin(t * 3) * 0.4; h.tail.rotation.x = -W.lean;
    if (h.root.userData.holding && this.danceT <= 0) { h.armR.rotation.x = -0.7; h.armR.rotation.z = 0.25; }
    if (this.danceT > 0) { this.danceT -= dt; h.armL.rotation.z = -2.4 + Math.sin(t * 12) * 0.5; h.armR.rotation.z = 2.4 + Math.sin(t * 12 + 1) * 0.5; h.body.rotation.y = Math.sin(t * 6) * 0.5; h.body.position.y += Math.abs(Math.sin(t * 12)) * 0.15; } else h.body.rotation.y = 0;
    // зірки: обертаються і збираються
    for (const st of this.stars) { if (this.got.has(st.id)) continue; st.obj.rotation.y = t * 2; st.obj.position.y = 1 + Math.sin(t * 3 + st.obj.position.x) * 0.2; if (Math.hypot(st.obj.position.x - this.heroPos.x, st.obj.position.z - this.heroPos.z) < 1.3) { this.got.add(st.id); st.obj.visible = false; this.ev.onStar?.(st.id); } }
    if (this.lostObj && !this.inside) {
      const sp = this.lostObj.getObjectByName('spark'); if (sp) sp.scale.setScalar(1 + Math.sin(t * 5) * 0.25);
      if (Math.hypot(this.lostObj.position.x - this.heroPos.x, this.lostObj.position.z - this.heroPos.z) < 1.4) { this.setLost(null); this.ev.onPickup?.(); }
    }
    if (this.pose) this.applyPose(t);
    if (this.boating) { h.root.position.y = -0.1 + Math.sin(t * 1.6) * 0.12; h.root.rotation.z = Math.sin(t * 1.1) * 0.05; h.body.position.y = 0.45; h.legL.visible = h.legR.visible = false; }
    if (this.bubbleObj) { this.bubbleT -= dt; if (this.bubbleT <= 0) { this.hero.root.remove(this.bubbleObj); this.bubbleObj = null; } }
    const cape = h.slots.bag.getObjectByName('cape'); if (cape) cape.rotation.x = 0.15 + Math.min(speed, 10) * 0.08 + Math.sin(t * 8) * 0.05;
    h.slots.bag.children.forEach((c) => { if (c.name === 'flame') { c.visible = !this.onGround; c.scale.y = 0.8 + Math.random() * 0.5; } });
    if (this.ride) { this.ride.position.y = this.rideId === 'ride-ufo' ? Math.sin(t * 3) * 0.1 : 0; this.ride.rotation.y = this.rideId === 'ride-ufo' ? t * 2 : 0; }
    // улюбленець біжить слідом
    if (this.pet) {
      const behind = new THREE.Vector3(Math.sin(this.heroRot) * -1.6 + 0.8, 0, Math.cos(this.heroRot) * -1.6);
      const goal = this.heroPos.clone().add(behind); goal.y = 0;
      const d = goal.distanceTo(this.petPos);
      if (d > 0.4) this.petPos.lerp(goal, 1 - Math.exp(-(d > 8 ? 6 : 3) * dt));
      const fly = this.petId === 'pet-dragon' || this.petId === 'pet-parrot';
      this.pet.position.set(this.petPos.x, (fly ? 1.2 + Math.sin(t * 4) * 0.2 : Math.abs(Math.sin(t * 9)) * (d > 0.6 ? 0.2 : 0.02)), this.petPos.z);
      this.pet.lookAt(this.heroPos.x, this.pet.position.y, this.heroPos.z);
      if (this.petTrickT > 0) { this.petTrickT -= dt; this.pet.position.y += Math.abs(Math.sin(this.petTrickT * 6)) * 0.8; this.pet.rotation.y += (2 - this.petTrickT) * Math.PI * 2; }
      this.pet.children.forEach((c) => { if (c.name === 'wag') c.rotation.z = Math.sin(t * 14) * 0.6; if (c.name === 'wing') c.rotation.x = Math.sin(t * 12) * 0.5; });
    }
    // жителі гуляють
    for (const [ni, n] of this.npcs.entries()) {
      if (this.followers.has(ni) && !this.inside) {
        const k = [...this.followers].indexOf(ni); const back = new THREE.Vector3(Math.sin(this.heroRot + 2.5 + k * 0.6) * (2 + k * 0.6), 0, Math.cos(this.heroRot + 2.5 + k * 0.6) * (2 + k * 0.6));
        n.goal.copy(this.heroPos).add(back); n.goal.y = 0; n.t = 1; const p = n.rig.root.position; const dv = n.goal.clone().sub(p); const dd = dv.length();
        if (dd > 25) p.copy(n.goal);
        if (dd > 0.4) { dv.normalize(); p.addScaledVector(dv, Math.min(dd, (dd > 4 ? 9 : 5) * dt)); n.rig.root.rotation.y = Math.atan2(dv.x, dv.z); const q = t * 11; n.rig.body.position.y = Math.abs(Math.sin(q)) * 0.1; n.rig.armL.rotation.x = Math.sin(q) * 0.8; n.rig.armR.rotation.x = -Math.sin(q) * 0.8; }
        else { n.rig.body.position.y = 0; n.rig.root.lookAt(this.heroPos.x, 0, this.heroPos.z); }
        continue;
      }
      if ((this.npcDanceT[ni] ?? 0) > 0) { this.npcDanceT[ni] -= dt; n.rig.armL.rotation.z = -2.4 + Math.sin(t * 12) * 0.5; n.rig.armR.rotation.z = 2.4 + Math.sin(t * 12 + 1) * 0.5; n.rig.body.rotation.y = Math.sin(t * 6) * 0.5; n.rig.body.position.y = Math.abs(Math.sin(t * 12)) * 0.15; if (this.npcDanceT[ni] <= 0) { n.rig.armL.rotation.z = -0.35; n.rig.armR.rotation.z = 0.35; n.rig.body.rotation.y = 0; } continue; }
      n.t -= dt;
      if (n.t < 0) { n.t = 3 + Math.random() * 5; n.goal.set(n.home.x + (Math.random() - 0.5) * 14, 0, n.home.z + (Math.random() - 0.5) * 14); }
      const p = n.rig.root.position; const dv = n.goal.clone().sub(p); const dd = dv.length();
      if (dd > 0.3) { dv.normalize(); p.addScaledVector(dv, Math.min(dd, 1.6 * dt)); n.rig.root.rotation.y = Math.atan2(dv.x, dv.z); const q = t * 9 + n.home.x; n.rig.body.position.y = Math.abs(Math.sin(q)) * 0.1; n.rig.armL.rotation.x = Math.sin(q) * 0.8; n.rig.armR.rotation.x = -Math.sin(q) * 0.8; n.rig.body.rotation.z = Math.sin(q) * 0.1; }
      else { n.rig.body.position.y = 0; n.rig.armR.rotation.z = 0.35 + Math.max(0, Math.sin(t * 3 + n.home.z)) * 1.6; }
      for (const c of this.colliders) { const dx = p.x - c.x, dz = p.z - c.z; const d = Math.hypot(dx, dz); if (d < c.r + 0.4 && d > 0.001) { p.x = c.x + (dx / d) * (c.r + 0.4); p.z = c.z + (dz / d) * (c.r + 0.4); n.t = 0; } }
    }
    // вода й хмари
    const wp = this.water.geometry.attributes.position as THREE.BufferAttribute;
    if (this.frames % 2 === 0) { for (let i = 0; i < wp.count; i++) { const x = wp.getX(i), z = wp.getZ(i); wp.setY(i, Math.sin(x * 0.12 + t * 1.2) * 0.18 + Math.cos(z * 0.1 + t) * 0.15); } wp.needsUpdate = true; this.water.geometry.computeVertexNormals(); }
    this.clouds.forEach((c) => { c.position.x += c.userData.v * dt; if (c.position.x > 170) c.position.x = -170; });
    if (this.markerOn) { const a = this.marker.getObjectByName('arrow')!; a.position.y = 4.2 + Math.sin(t * 3) * 0.4; a.rotation.y = t * 2; }
    this.stepWorld(dt, t); if (this.inside) this.stepKeepers(t); this.stepOthers(dt, t);
    // камера позаду героя
    if (this.inside) this.camYaw = THREE.MathUtils.clamp(this.camYaw, -0.25, 1.25);
    else if (speed > 1 && !this.drag && (Math.abs(this.joy.x) + Math.abs(this.joy.y) > 0 || k.size)) { let d = (this.heroRot + Math.PI) - this.camYaw; d = Math.atan2(Math.sin(d), Math.cos(d)); this.camYaw += d * (1 - Math.exp(-1.2 * dt)); }
    if (this.focus) {
      const f0 = this.focus; const cp = new THREE.Vector3(f0.x, f0.y + 0.5, f0.z + 2.6); this.cam.position.lerp(cp, 1 - Math.exp(-6 * dt)); this.cam.lookAt(f0.x, f0.y, f0.z);
    } else if (this.portrait) {
      const f = new THREE.Vector3(Math.sin(this.heroRot), 0, Math.cos(this.heroRot)); const rgt = new THREE.Vector3(Math.cos(this.heroRot), 0, -Math.sin(this.heroRot));
      const tg = this.heroPos.clone().add(new THREE.Vector3(0, 1.0, 0)).addScaledVector(rgt, this.portraitShift);
      const cp = this.heroPos.clone().addScaledVector(f, 4.2).add(new THREE.Vector3(0, 1.6, 0)).addScaledVector(rgt, this.portraitShift);
      this.cam.position.lerp(cp, 1 - Math.exp(-6 * dt)); this.cam.lookAt(tg);
      this.hero.root.rotation.y = this.heroRot + Math.sin(t * 0.8) * 0.5;
    } else {
    const target = this.heroPos.clone().add(new THREE.Vector3(0, 1.4, 0));
    const camPos = target.clone().add(new THREE.Vector3(Math.sin(this.camYaw) * Math.cos(this.camPitch), Math.sin(this.camPitch), Math.cos(this.camYaw) * Math.cos(this.camPitch)).multiplyScalar(this.camDist));
    camPos.y = Math.max(camPos.y, 0.8);
    this.cam.position.lerp(camPos, 1 - Math.exp(-8 * dt)); this.cam.lookAt(target);
    }
    this.sun.position.set(this.heroPos.x + 40, 60, this.heroPos.z + 25); this.sun.target.position.copy(this.heroPos);
    // що поруч
    let near: Spot | null = null;
    for (const s of this.spots) if (Math.hypot(s.x - this.heroPos.x, s.z - this.heroPos.z) < s.r) { near = s; break; }
    if (!near) this.npcs.forEach((n, i) => { const p = n.rig.root.position; if (!near && Math.hypot(p.x - this.heroPos.x, p.z - this.heroPos.z) < 2.2) { near = { id: `npc-${i}`, x: p.x, z: p.z, r: 2.2, label: NPC_NAMES[i % NPC_NAMES.length] }; n.t = 2; n.goal.copy(p); n.rig.root.lookAt(this.heroPos.x, 0, this.heroPos.z); } });
    if (near?.id !== this.near?.id) { this.near = near; this.ev.onNear(near); }
  }

  // день і ніч (8 хвилин на добу), дощ, живність
  stepWorld(dt: number, t: number) {
    this.dayP = (this.dayP + dt / 480) % 1;
    const e = Math.sin(this.dayP * Math.PI * 2);
    const day = THREE.MathUtils.smoothstep(e, -0.18, 0.28);
    // погода: іноді дощ
    this.weatherT -= dt;
    if (this.weatherT < 0) { this.raining = this.raining ? false : Math.random() < 0.3; this.weatherT = this.raining ? 45 + Math.random() * 40 : 80 + Math.random() * 60; }
    this.rain += ((this.raining && !this.inside ? 1 : 0) - this.rain) * Math.min(1, dt * 0.5);
    const sky = new THREE.Color('#141E3C').lerp(new THREE.Color('#9ED8F7'), day);
    const dusk = Math.max(0, 1 - Math.abs(e) / 0.22) * (e > -0.2 ? 1 : 0);
    sky.lerp(new THREE.Color('#F4A27A'), dusk * 0.55).lerp(new THREE.Color(day > 0.5 ? '#8E9BA8' : '#2A3242'), this.rain * 0.65);
    (this.scene.background as THREE.Color).copy(sky);
    (this.scene.fog as THREE.Fog).color.copy(sky).lerp(new THREE.Color('#FFFFFF'), 0.15 * day);
    this.hemi.intensity = (0.32 + 0.95 * day) * (1 - this.rain * 0.25);
    this.sun.intensity = (0.12 + 2.2 * day) * (1 - this.rain * 0.55);
    if (this.inside) { this.hemi.intensity = Math.max(this.hemi.intensity, 1.1); this.sun.intensity = Math.max(this.sun.intensity, 1.4); }
    this.sun.color.set('#FFF4DD').lerp(new THREE.Color('#FFB27A'), dusk * 0.7);
    this.cloudMat.color.set('#FFFFFF').lerp(new THREE.Color('#56617E'), 1 - day).lerp(new THREE.Color('#9AA3AE'), this.rain * 0.6);
    const night = 1 - day;
    this.flames.forEach((f, i) => { f.scale.set(1 + Math.sin(t * 9 + i) * 0.12, 1 + Math.sin(t * 13 + i * 2) * 0.2, 1 + Math.cos(t * 9 + i) * 0.12); });
    this.glows.forEach((g) => { (g.material as THREE.MeshBasicMaterial).opacity = night * 0.85; g.visible = night > 0.05; });
    if (this.beam) { (this.beam.material as THREE.MeshBasicMaterial).opacity = night * 0.22; this.beam.visible = night > 0.05; this.beam.rotation.y = t * 0.8; }
    if (this.skyStars) { (this.skyStars.material as THREE.PointsMaterial).opacity = night * (1 - this.rain); this.skyStars.position.set(this.heroPos.x, 0, this.heroPos.z); }
    if (this.moon) { const a = this.dayP * Math.PI * 2; this.moon.position.set(this.heroPos.x - Math.cos(a) * 200, Math.max(-40, -e * 180 + 10), this.heroPos.z - 120); (this.moon.material as THREE.MeshBasicMaterial).opacity = night * (1 - this.rain * 0.8); }
    if (this.snowObj) { this.snowObj.visible = this.winter && this.rain > 0.03; if (this.snowObj.visible) { this.snowObj.position.set(this.heroPos.x + Math.sin(t * 0.5) * 2, ((-t * 3) % 26 + 26) % 26 - 6, this.heroPos.z); (this.snowObj.material as THREE.PointsMaterial).opacity = 0.9 * this.rain; } }
    // феєрверки вночі
    if (this.fireworksOn && night > 0.6 && !this.inside) { this.fwT -= dt; if (this.fwT < 0) { this.burst(); this.fwT = 0.7 + Math.random() * 1.2; } }
    for (let i = this.fws.length - 1; i >= 0; i--) { const f = this.fws[i]; f.t += dt; const pa = f.p.geometry.attributes.position as THREE.BufferAttribute; for (let k = 0; k < pa.count; k++) { f.v[k * 3 + 1] -= 6 * dt; pa.setXYZ(k, pa.getX(k) + f.v[k * 3] * dt, pa.getY(k) + f.v[k * 3 + 1] * dt, pa.getZ(k) + f.v[k * 3 + 2] * dt); } pa.needsUpdate = true; (f.p.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - f.t / 1.8); if (f.t > 1.8) { this.scene.remove(f.p); f.p.geometry.dispose(); this.fws.splice(i, 1); } }
    if (this.rainObj) { this.rainObj.visible = !this.winter && this.rain > 0.03; if (this.rainObj.visible) { (this.rainObj.material as THREE.LineBasicMaterial).opacity = 0.55 * this.rain; this.rainObj.position.set(this.heroPos.x, ((-t * 24) % 26 + 26) % 26 - 6, this.heroPos.z); } }
    const hour = Math.floor((this.dayP * 24 + 6) % 24 * 2) / 2;
    if (hour !== this.lastHour) { this.lastHour = hour; this.ev.onClock?.(hour, this.raining); }
    // метелики вдень, світлячки вночі
    for (const f of this.flies) {
      const on = f.glow ? night > 0.5 : day > 0.4 && this.rain < 0.3;
      f.g.visible = on; if (!on) continue;
      const k = t * 0.4 + f.ph;
      f.g.position.set(f.c.x + Math.sin(k) * 3 + Math.sin(k * 2.3) * 0.8, (f.glow ? 0.8 : 0.7) + Math.sin(k * 3.1) * 0.4 + 0.4, f.c.z + Math.cos(k * 0.8) * 3);
      if (!f.glow) { const fl = Math.sin(t * 22 + f.ph) * 1.1; f.g.children.forEach((w) => { w.rotation.y = w.name === 'wl' ? fl : -fl; }); f.g.rotation.y = -k; }
      else (f.g.children[0] as THREE.Mesh).scale.setScalar(0.7 + Math.sin(t * 5 + f.ph) * 0.4);
    }
    for (const b of this.birds) {
      b.g.visible = day > 0.3 && this.rain < 0.5; const a = t * b.v + b.ph;
      b.g.position.set(Math.cos(a) * b.r, b.h + Math.sin(t + b.ph) * 1.5, Math.sin(a) * b.r); b.g.rotation.y = -a;
      const fl = Math.sin(t * 9 + b.ph) * 0.5; b.g.children.forEach((p) => { p.rotation.z = p.name === 'pl' ? -fl : fl; });
    }
    for (const b of this.boats) { const a = t * b.v + b.ph; b.g.position.set(Math.cos(a) * b.r, -0.1 + Math.sin(t * 1.4 + b.ph) * 0.15, Math.sin(a) * b.r); b.g.rotation.y = -a; b.g.rotation.z = Math.sin(t * 1.1 + b.ph) * 0.05; }
  }
  // господарі в кімнатах ледь погойдуються
  stepKeepers(t: number) { this.keepers.forEach((k, i) => { k.body.rotation.z = Math.sin(t * 1.5 + i) * 0.05; k.armR.rotation.z = 0.35 + Math.max(0, Math.sin(t * 2 + i)) * 0.8; }); }
  setDecor(on: boolean, placing: string | null) { this.decorate = on; this.placing = placing; }

  dispose() {
    this.disposed = true; cancelAnimationFrame(this.raf); this.ro.disconnect();
    window.removeEventListener('keydown', this.kd); window.removeEventListener('keyup', this.ku);
    window.removeEventListener('pointermove', this.pm); window.removeEventListener('pointerup', this.pu);
    this.renderer.dispose(); this.renderer.domElement.remove();
  }
}
