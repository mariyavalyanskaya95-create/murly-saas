// 3D-рушій «Murly Island» на Three.js: острів з містечком, котик-герой, що кумедно хитається,
// транспорт, улюбленці, свій будинок і двір. Будинки й дерева з наборів CC0, усе інше малюється кодом.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ADDRS, FUR, HOME, HOUSES, SHOP, SPEED, type Outfit, type Spot } from './island-data';

const loader = new GLTFLoader();
const packs = new Map<string, Promise<Map<string, THREE.Object3D>>>();
const PACK: Record<string, string> = { city: '/worlds/kaykit-city.glb', sub: '/worlds/kenney-suburban.glb', nature: '/worlds/kenney-nature.glb' };
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
    (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { const st = mt as THREE.MeshStandardMaterial; if (st.metalness !== undefined) { st.metalness = Math.min(st.metalness, 0.2); st.roughness = Math.max(st.roughness ?? 1, 0.6); } });
  });
  return wrap;
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
  (['hat', 'glasses', 'scarf', 'bag'] as const).forEach((k) => { const g = new THREE.Group(); slots[k] = g; (k === 'hat' || k === 'glasses' ? head : body).add(g); });
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
  const b = it(o.bag); const B = rig.slots.bag;
  if (b) {
    if (b.id === 'bag-jetpack') { [-1, 1].forEach((s) => { const t = cyl(0.12, 0.12, 0.5, '#B8C2CC'); t.position.set(0.14 * s, 0, -0.05); B.add(t); const fl = mesh(new THREE.ConeGeometry(0.1, 0.25, 10), new THREE.MeshBasicMaterial({ color: '#FFB224' }), false); fl.rotation.x = Math.PI; fl.position.set(0.14 * s, -0.38, -0.05); fl.name = 'flame'; B.add(fl); }); }
    else if (b.id === 'cape-hero') { const c = mesh(new THREE.PlaneGeometry(0.8, 0.9, 4, 6), new THREE.MeshToonMaterial({ color: b.color, side: THREE.DoubleSide, gradientMap: grad! })); c.position.set(0, -0.15, -0.02); c.rotation.x = 0.15; c.name = 'cape'; B.add(c); }
    else { const p = box(0.5, 0.55, 0.25, b.color!); B.add(p); const f = box(0.36, 0.22, 0.08, '#FFFFFF'); f.position.set(0, -0.08, -0.15); B.add(f); }
  }
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
  if (id === 'pet-dragon') { const b = sph(0.3, '#30A46C'); b.position.y = 0.4; g.add(b); const h = sph(0.22, '#30A46C'); h.position.set(0, 0.75, 0.15); g.add(h); [-1, 1].forEach((s) => { const w = mesh(new THREE.ConeGeometry(0.2, 0.45, 3), toon('#8EE0B0')); w.rotation.z = (Math.PI / 2.4) * s; w.position.set(0.32 * s, 0.6, -0.05); w.name = 'wing'; g.add(w); const ey = sph(0.04, '#1A1A1A', 8); ey.position.set(0.09 * s, 0.82, 0.33); g.add(ey); const hr = mesh(new THREE.ConeGeometry(0.04, 0.14, 6), toon('#FFE08A')); hr.position.set(0.1 * s, 0.98, 0.1); g.add(hr); }); }
  return g;
}

// ---------- сцена ----------
export type IslandEvents = { onNear: (spot: Spot | null) => void; onFps?: (low: boolean) => void; onStar?: (id: string) => void };
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
  stars: { id: string; obj: THREE.Group }[] = []; got = new Set<string>();
  ray = new THREE.Raycaster(); ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  constructor(el: HTMLElement, ev: IslandEvents) {
    this.el = el; this.ev = ev;
    const low = /Android|iPhone|iPad/i.test(navigator.userAgent) && (navigator.hardwareConcurrency ?? 4) <= 4;
    this.renderer = new THREE.WebGLRenderer({ antialias: !low, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, low ? 1.25 : 1.75));
    this.renderer.shadowMap.enabled = true; this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NeutralToneMapping; this.renderer.toneMappingExposure = 1.05;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(this.renderer.domElement);
    this.cam = new THREE.PerspectiveCamera(55, 1, 0.1, 600);
    this.scene.background = new THREE.Color('#9ED8F7');
    this.scene.fog = new THREE.Fog('#BFE6FA', 70, 220);

    const hemi = new THREE.HemisphereLight('#E8F6FF', '#9BC97A', 1.25); this.scene.add(hemi);
    const sun = new THREE.DirectionalLight('#FFF4DD', 2.3); sun.position.set(40, 60, 25); sun.castShadow = true;
    sun.shadow.mapSize.set(low ? 1024 : 2048, low ? 1024 : 2048);
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
      this.spots.push({ id, x, z: dz, r: 2.6, label });
      const mat = mesh(new THREE.CircleGeometry(1.3, 24), toon(bg), false); mat.rotation.x = -Math.PI / 2; mat.position.set(x, 0.04, dz); this.scene.add(mat);
    }
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
    for (const [x, z] of [[-6, -9], [6, -9], [-6, 9], [6, 9]]) void add('city', 'streetlight', x, z, 1.2, 0, 0.3);
    for (const [x, z, r] of [[-9.5, 0, Math.PI / 2], [9.5, 0, -Math.PI / 2]]) void add('city', 'bench', x, z, 2, r, 0.8);
    // хмари
    for (let i = 0; i < 14; i++) {
      const c = new THREE.Group();
      for (let k = 0; k < 5; k++) { const s = mesh(new THREE.SphereGeometry(rnd(2.5, 4.5), 14, 10), new THREE.MeshToonMaterial({ color: '#FFFFFF', gradientMap: grad! }), false); s.position.set(k * 3 - 6, rnd(-0.6, 1), rnd(-1.5, 1.5)); c.add(s); }
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
    this.colliders.push({ x, z, r: 1 }, { x: x + 3, z, r: 1.4 });
  }
  buildLighthouse(x: number, z: number) {
    for (let i = 0; i < 5; i++) { const s = cyl(1.6 - i * 0.18, 1.78 - i * 0.18, 2, i % 2 ? '#E5484D' : '#FFFFFF', 24); s.position.set(x, 1 + i * 2, z); this.scene.add(s); }
    const lamp = cyl(0.8, 0.8, 1.2, '#FFF3A6', 16); lamp.material = toon('#FFF3A6', 0.8); lamp.position.set(x, 10.6, z); this.scene.add(lamp);
    const roof = mesh(new THREE.ConeGeometry(1.1, 1.2, 16), toon('#E5484D')); roof.position.set(x, 11.8, z); this.scene.add(roof);
    this.colliders.push({ x, z, r: 2 });
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
    const h = await model('sub', HOUSES[level], 7 + level * 1.2);
    h.position.set(HOME.x, 0, HOME.z + 1); this.homeGroup.add(h);
    const s = sign('MY HOME', '#FFC53D', '#1A1A1A', 3.4); s.position.set(HOME.x, new THREE.Box3().setFromObject(h).max.y + 1.2, HOME.z + 1); this.homeGroup.add(s);
    this.colliders.push(Object.assign({ x: HOME.x, z: HOME.z + 1, r: 3.8 + level * 0.4 }, { home: true }));
  }
  async setYard(list: string[]) {
    this.yardList = list; this.yardGroup.clear(); this.tramp = null;
    const slot = (i: number) => { const a = [[-7, -5], [7, -5], [-7, 5], [7, 5], [-4, -6.5], [4, -6.5], [-8, 0], [8, 0], [0, 7]][i % 9]; return { x: HOME.x + a[0], z: HOME.z + a[1] }; };
    for (let i = 0; i < list.length; i++) {
      const id = list[i]; const { x, z } = slot(i);
      let g: THREE.Object3D | null = null;
      if (id === 'yard-bench') g = await model('city', 'bench', 2);
      if (id === 'yard-lamp') g = await model('city', 'streetlight', 1.2);
      if (id === 'yard-fire') g = await model('nature', 'campfire_stones', 1.4);
      if (id === 'yard-tent') g = await model('nature', 'tent_detailedOpen', 2.6);
      if (id === 'yard-tree') g = await model('nature', 'tree_palm', 3.6);
      if (id === 'yard-flowers') { const f = new THREE.Group(); const bed = box(2.4, 0.3, 1, '#8B5E34'); bed.position.y = 0.15; f.add(bed); for (let k = 0; k < 8; k++) { const fl = sph(0.14, ['#F76AA8', '#FFC53D', '#E5484D', '#B79CF0'][k % 4], 8); fl.position.set(-1 + (k % 4) * 0.66, 0.5, k < 4 ? -0.2 : 0.2); f.add(fl); } g = f; }
      if (id === 'yard-fence') { const f = new THREE.Group(); for (let k = 0; k < 6; k++) { const p = box(0.18, 1, 0.12, '#FFFFFF'); p.position.set(-1.5 + k * 0.6, 0.5, 0); f.add(p); } const r = box(3.4, 0.12, 0.08, '#FFFFFF'); r.position.y = 0.7; f.add(r); g = f; }
      if (id === 'yard-tramp') { const f = new THREE.Group(); const mat = cyl(1.4, 1.4, 0.08, '#2B2B2B', 28); mat.position.y = 0.7; f.add(mat); const rim = mesh(new THREE.TorusGeometry(1.45, 0.12, 8, 32), toon('#3E7BFA')); rim.rotation.x = Math.PI / 2; rim.position.y = 0.72; f.add(rim); for (let k = 0; k < 4; k++) { const l = cyl(0.05, 0.05, 0.7, '#55606E'); const a = (k / 4) * Math.PI * 2; l.position.set(Math.sin(a) * 1.3, 0.35, Math.cos(a) * 1.3); f.add(l); } g = f; this.tramp = new THREE.Vector3(x, 0, z); }
      if (id === 'yard-pool') { const f = new THREE.Group(); const b = box(4, 0.4, 2.6, '#FFFFFF'); b.position.y = 0.2; f.add(b); const w = mesh(new THREE.PlaneGeometry(3.6, 2.2), new THREE.MeshStandardMaterial({ color: '#58B9E8', roughness: 0.1 }), false); w.rotation.x = -Math.PI / 2; w.position.y = 0.41; f.add(w); const duck = sph(0.2, '#FFD84D', 10); duck.position.set(0.8, 0.5, 0.3); f.add(duck); g = f; }
      if (!g) continue;
      g.position.set(x, 0, z); this.yardGroup.add(g);
    }
  }

  // ---- персонаж, транспорт, улюбленець ----
  setOutfit(o: Outfit) { wear(this.hero, o); }
  setRide(id: string | null) {
    if (this.ride) { this.hero.root.remove(this.ride); this.ride = null; }
    this.rideId = id;
    if (id) { this.ride = makeRide(id); this.hero.root.add(this.ride); }
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
      if (this.ray.ray.intersectPlane(this.ground, hit) && Math.hypot(hit.x, hit.z) < 73) this.walkTo(hit.x, hit.z);
    }
  };
  walkTo(x: number, z: number) {
    this.goal = new THREE.Vector3(x, 0, z);
    if (!this.goalRing) { this.goalRing = mesh(new THREE.RingGeometry(0.35, 0.55, 24), new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.85 }), false); this.goalRing.rotation.x = -Math.PI / 2; this.scene.add(this.goalRing); }
    this.goalRing.position.set(x, 0.06, z); this.goalRing.visible = true;
  }
  dance() { this.danceT = 2.4; }
  wh = (e: WheelEvent) => { this.camDist = THREE.MathUtils.clamp(this.camDist + e.deltaY * 0.01, 4.5, 18); };
  jump() { if (this.onGround) { this.vy = this.rideId === 'ride-ufo' ? 9 : 7.5; this.onGround = false; this.wob.sqV -= 3; } }
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
    if (this.goal) { const d = this.goal.clone().sub(this.heroPos); d.y = 0; if (d.length() < 0.5) { this.goal = null; if (this.goalRing) this.goalRing.visible = false; } else goalDir = d.normalize(); }
    const len = Math.hypot(ix, iz); if (len > 1) { ix /= len; iz /= len; }
    const running = k.has('ShiftLeft') || k.has('ShiftRight') || this.run;
    const base = 5.2 * (this.rideId ? SPEED[this.rideId] ?? 1 : running ? 1.6 : 1);
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
    const groundY = fly && len > 0.1 ? 1.2 : 0;
    if (this.heroPos.y <= groundY) {
      if (!this.onGround && this.vy < -6) this.wob.sqV += this.vy * 0.25;
      this.heroPos.y = groundY; this.vy = 0; this.onGround = true;
      if (this.tramp && Math.hypot(this.heroPos.x - this.tramp.x, this.heroPos.z - this.tramp.z) < 1.4) { this.vy = 13; this.onGround = false; this.wob.sqV -= 4; }
    }
    // зіткнення з будинками й межею острова
    for (const c of this.colliders) {
      const dx = this.heroPos.x - c.x, dz = this.heroPos.z - c.z; const d = Math.hypot(dx, dz); const r = c.r + 0.45;
      if (d < r && d > 0.0001) { this.heroPos.x = c.x + (dx / d) * r; this.heroPos.z = c.z + (dz / d) * r; }
    }
    const R = 73; const dc = Math.hypot(this.heroPos.x, this.heroPos.z); if (dc > R) { this.heroPos.x *= R / dc; this.heroPos.z *= R / dc; }
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
    h.body.position.y = (ride ? (this.rideId === 'ride-car' || this.rideId === 'ride-ufo' ? 0.55 : 0.25) : 0) + (walk ? Math.abs(Math.sin(ph)) * 0.12 : Math.sin(t * 2) * 0.02);
    h.body.rotation.x = W.lean + (walk ? 0 : 0); h.body.rotation.z = walk ? Math.sin(ph) * 0.12 : Math.sin(t * 1.3) * 0.03;
    h.body.scale.set(1 / Math.sqrt(W.sq), W.sq, 1 / Math.sqrt(W.sq));
    h.head.rotation.z = Math.sin(t * 1.7) * 0.05 - h.body.rotation.z * 0.6; h.head.rotation.x = -W.lean * 0.5;
    const flail = !this.onGround ? 1 : 0;
    h.armL.rotation.x = walk ? Math.sin(ph) * 0.9 : Math.sin(t * 2) * 0.08; h.armR.rotation.x = walk ? -Math.sin(ph) * 0.9 : -Math.sin(t * 2) * 0.08;
    h.armL.rotation.z = -0.35 - flail * (1.6 + Math.sin(t * 18) * 0.4) - (ride ? 0.6 : 0); h.armR.rotation.z = 0.35 + flail * (1.6 + Math.sin(t * 18 + 1) * 0.4) + (ride ? 0.6 : 0);
    h.legL.position.z = walk ? Math.sin(ph) * 0.18 : 0; h.legR.position.z = walk ? -Math.sin(ph) * 0.18 : 0;
    h.legL.visible = h.legR.visible = this.rideId !== 'ride-car' && this.rideId !== 'ride-ufo';
    h.tail.rotation.y = Math.sin(t * 3) * 0.4; h.tail.rotation.x = -W.lean;
    if (this.danceT > 0) { this.danceT -= dt; h.armL.rotation.z = -2.4 + Math.sin(t * 12) * 0.5; h.armR.rotation.z = 2.4 + Math.sin(t * 12 + 1) * 0.5; h.body.rotation.y = Math.sin(t * 6) * 0.5; h.body.position.y += Math.abs(Math.sin(t * 12)) * 0.15; } else h.body.rotation.y = 0;
    // зірки: обертаються і збираються
    for (const st of this.stars) { if (this.got.has(st.id)) continue; st.obj.rotation.y = t * 2; st.obj.position.y = 1 + Math.sin(t * 3 + st.obj.position.x) * 0.2; if (Math.hypot(st.obj.position.x - this.heroPos.x, st.obj.position.z - this.heroPos.z) < 1.3) { this.got.add(st.id); st.obj.visible = false; this.ev.onStar?.(st.id); } }
    const cape = h.slots.bag.getObjectByName('cape'); if (cape) cape.rotation.x = 0.15 + Math.min(speed, 10) * 0.08 + Math.sin(t * 8) * 0.05;
    h.slots.bag.children.forEach((c) => { if (c.name === 'flame') { c.visible = !this.onGround; c.scale.y = 0.8 + Math.random() * 0.5; } });
    if (this.ride) { this.ride.position.y = this.rideId === 'ride-ufo' ? Math.sin(t * 3) * 0.1 : 0; this.ride.rotation.y = this.rideId === 'ride-ufo' ? t * 2 : 0; }
    // улюбленець біжить слідом
    if (this.pet) {
      const behind = new THREE.Vector3(Math.sin(this.heroRot) * -1.6 + 0.8, 0, Math.cos(this.heroRot) * -1.6);
      const goal = this.heroPos.clone().add(behind); goal.y = 0;
      const d = goal.distanceTo(this.petPos);
      if (d > 0.4) this.petPos.lerp(goal, 1 - Math.exp(-(d > 8 ? 6 : 3) * dt));
      const fly = this.petId === 'pet-dragon';
      this.pet.position.set(this.petPos.x, (fly ? 1.2 + Math.sin(t * 4) * 0.2 : Math.abs(Math.sin(t * 9)) * (d > 0.6 ? 0.2 : 0.02)), this.petPos.z);
      this.pet.lookAt(this.heroPos.x, this.pet.position.y, this.heroPos.z);
      this.pet.children.forEach((c) => { if (c.name === 'wag') c.rotation.z = Math.sin(t * 14) * 0.6; if (c.name === 'wing') c.rotation.x = Math.sin(t * 12) * 0.5; });
    }
    // жителі гуляють
    for (const n of this.npcs) {
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
    // камера позаду героя
    if (speed > 1 && !this.drag && (Math.abs(this.joy.x) + Math.abs(this.joy.y) > 0 || k.size)) { let d = (this.heroRot + Math.PI) - this.camYaw; d = Math.atan2(Math.sin(d), Math.cos(d)); this.camYaw += d * (1 - Math.exp(-1.2 * dt)); }
    const target = this.heroPos.clone().add(new THREE.Vector3(0, 1.4, 0));
    const camPos = target.clone().add(new THREE.Vector3(Math.sin(this.camYaw) * Math.cos(this.camPitch), Math.sin(this.camPitch), Math.cos(this.camYaw) * Math.cos(this.camPitch)).multiplyScalar(this.camDist));
    camPos.y = Math.max(camPos.y, 0.8);
    this.cam.position.lerp(camPos, 1 - Math.exp(-8 * dt)); this.cam.lookAt(target);
    this.sun.position.set(this.heroPos.x + 40, 60, this.heroPos.z + 25); this.sun.target.position.copy(this.heroPos);
    // що поруч
    let near: Spot | null = null;
    for (const s of this.spots) if (Math.hypot(s.x - this.heroPos.x, s.z - this.heroPos.z) < s.r) { near = s; break; }
    if (!near) this.npcs.forEach((n, i) => { const p = n.rig.root.position; if (!near && Math.hypot(p.x - this.heroPos.x, p.z - this.heroPos.z) < 2.2) { near = { id: `npc-${i}`, x: p.x, z: p.z, r: 2.2, label: NPC_NAMES[i % NPC_NAMES.length] }; n.t = 2; n.goal.copy(p); n.rig.root.lookAt(this.heroPos.x, 0, this.heroPos.z); } });
    if (near?.id !== this.near?.id) { this.near = near; this.ev.onNear(near); }
  }

  dispose() {
    this.disposed = true; cancelAnimationFrame(this.raf); this.ro.disconnect();
    window.removeEventListener('keydown', this.kd); window.removeEventListener('keyup', this.ku);
    window.removeEventListener('pointermove', this.pm); window.removeEventListener('pointerup', this.pu);
    this.renderer.dispose(); this.renderer.domElement.remove();
  }
}
