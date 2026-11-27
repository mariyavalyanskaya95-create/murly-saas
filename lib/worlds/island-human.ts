// Людинка для Murly Island: велика голова, великі очі, одяг шарами. Своя модель, нічого чужого.
// Має ту саму «будову», що й котик (root, body, head, руки, ноги, слоти), тож ходить і танцює тим самим кодом.
import * as THREE from 'three';
import type { HumanLook } from './island-data';

let grad: THREE.DataTexture | null = null;
function toon(c: string) {
  if (!grad) { grad = new THREE.DataTexture(new Uint8Array([90, 90, 90, 255, 175, 175, 175, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat); grad.minFilter = grad.magFilter = THREE.NearestFilter; grad.needsUpdate = true; }
  return new THREE.MeshToonMaterial({ color: c, gradientMap: grad });
}
const mesh = (g: THREE.BufferGeometry, m: THREE.Material, shadow = true) => { const x = new THREE.Mesh(g, m); x.castShadow = shadow; x.receiveShadow = true; return x; };
const sph = (r: number, c: string, seg = 18) => mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.75)), toon(c));
const cap = (r: number, l: number, c: string) => mesh(new THREE.CapsuleGeometry(r, l, 6, 14), toon(c));
const box = (w: number, h: number, d: number, c: string) => mesh(new THREE.BoxGeometry(w, h, d), toon(c));
const shade = (c: string, k: number) => '#' + new THREE.Color(c).multiplyScalar(k).getHexString();

export const LEG_Y = 0.62;

export function makeHuman(look: HumanLook, scale = 1) {
  const root = new THREE.Group(); root.userData.rig = true; root.userData.human = true; root.userData.legY = LEG_Y; root.userData.look = look;
  const body = new THREE.Group(); root.add(body);
  const skinM = toon(look.skin);
  const skin: THREE.MeshToonMaterial[] = [skinM];
  const pelvis = mesh(new THREE.SphereGeometry(0.17, 18, 12), skinM); pelvis.scale.set(1.1, 0.7, 0.8); pelvis.position.y = 0.66; body.add(pelvis);
  const torso = mesh(new THREE.CapsuleGeometry(0.16, 0.28, 6, 14), skinM); torso.scale.set(1, 1, 0.78); torso.position.y = 0.93; body.add(torso);
  const neck = mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.12, 10), skinM); neck.position.y = 1.2; body.add(neck);
  const head = new THREE.Group(); head.position.y = 1.52; body.add(head);
  const skull = mesh(new THREE.SphereGeometry(0.4, 28, 22), skinM); skull.scale.set(1.04, 1, 0.95); head.add(skull);
  [-1, 1].forEach((s) => { const e = mesh(new THREE.SphereGeometry(0.07, 10, 8), skinM); e.scale.set(0.6, 1, 0.8); e.position.set(0.4 * s, -0.02, 0); head.add(e); });
  const face = new THREE.Group(); face.name = 'face'; head.add(face);
  const arm = (s: number) => {
    const g = new THREE.Group(); g.position.set(0.22 * s, 1.12, 0);
    const a = mesh(new THREE.CapsuleGeometry(0.052, 0.34, 6, 10), skinM); a.position.y = -0.22; g.add(a);
    const hand = mesh(new THREE.SphereGeometry(0.066, 12, 10), skinM); hand.position.y = -0.45; g.add(hand);
    g.rotation.z = 0.18 * s; body.add(g); return g;
  };
  const armL = arm(-1), armR = arm(1);
  // нога: «шарнір» у стегні, сама нога звисає вниз
  const leg = (s: number) => {
    const p = new THREE.Mesh(); p.position.set(0.09 * s, LEG_Y, 0.01); root.add(p);
    const l = mesh(new THREE.CapsuleGeometry(0.075, 0.44, 6, 12), skinM); l.position.y = -0.3; p.add(l);
    return p;
  };
  const legL = leg(-1), legR = leg(1);
  const tail = new THREE.Group(); body.add(tail);
  const slots: Record<string, THREE.Group> = {};
  (['hat', 'glasses', 'scarf', 'bag', 'hair', 'top'] as const).forEach((k) => { const g = new THREE.Group(); slots[k] = g; (k === 'hat' || k === 'glasses' || k === 'hair' ? head : body).add(g); });
  [['sleeveL', armL], ['sleeveR', armR], ['hand', armR], ['held', armR], ['legL', legL], ['legR', legR]].forEach(([k, par]) => { const g = new THREE.Group(); slots[k as string] = g; (par as THREE.Object3D).add(g); });
  slots.hand.position.set(0, -0.5, 0.06); slots.held.position.set(0, -0.5, 0.06);
  slots.hat.scale.setScalar(0.88); slots.hat.position.y = 0.02; slots.glasses.scale.setScalar(0.85); slots.glasses.position.z = 0.02;
  slots.scarf.position.y = 1.12; slots.scarf.scale.setScalar(0.62); slots.bag.position.set(0, 0.95, -0.2); slots.bag.scale.setScalar(0.75);
  root.scale.setScalar(scale);
  const rig = { root, body, head, armL, armR, legL, legR, tail, fur: [] as THREE.MeshToonMaterial[], skin, slots };
  drawFace(rig, look);
  return rig;
}

type HRig = ReturnType<typeof makeHuman>;

function drawFace(rig: { head: THREE.Group; skin: THREE.MeshToonMaterial[] }, look: HumanLook) {
  const face = rig.head.getObjectByName('face') as THREE.Group; face.clear();
  rig.skin.forEach((m) => m.color.set(look.skin));
  const girl = look.body === 'girl';
  [-1, 1].forEach((s) => {
    const white = mesh(new THREE.SphereGeometry(0.1, 16, 12), toon('#FFFFFF'), false); white.scale.set(0.95, 1.15, 0.45); white.position.set(0.15 * s, -0.03, 0.335); face.add(white);
    const iris = mesh(new THREE.SphereGeometry(0.072, 14, 10), toon(look.eyes), false); iris.scale.set(1, 1.15, 0.45); iris.position.set(0.15 * s, -0.04, 0.365); face.add(iris);
    const pupil = mesh(new THREE.SphereGeometry(0.04, 10, 8), toon('#1A1A1A'), false); pupil.scale.set(1, 1.2, 0.4); pupil.position.set(0.15 * s, -0.04, 0.385); face.add(pupil);
    const hi = mesh(new THREE.SphereGeometry(0.02, 8, 6), new THREE.MeshBasicMaterial({ color: '#FFFFFF' }), false); hi.position.set(0.15 * s + 0.025, 0.0, 0.4); face.add(hi);
    const brow = box(girl ? 0.1 : 0.12, girl ? 0.014 : 0.024, 0.02, shade(look.hairC, 0.8)); brow.position.set(0.15 * s, 0.13, 0.35); brow.rotation.z = -0.12 * s; face.add(brow);
    if (girl) for (let i = 0; i < 3; i++) { const l = box(0.012, 0.045, 0.01, '#1A1A1A'); l.position.set(0.15 * s + (0.045 + i * 0.022) * s, 0.06 - i * 0.012, 0.37); l.rotation.z = -(0.5 + i * 0.3) * s; face.add(l); }
    const blush = mesh(new THREE.SphereGeometry(0.06, 12, 8), toon(girl ? '#F59AB0' : '#F2AE9B'), false); blush.scale.set(1.2, 0.6, 0.3); blush.position.set(0.25 * s, -0.15, 0.3); face.add(blush);
  });
  const nose = mesh(new THREE.SphereGeometry(0.025, 8, 6), toon(shade(look.skin, 0.9)), false); nose.position.set(0, -0.11, 0.39); face.add(nose);
  const mouth = mesh(new THREE.TorusGeometry(0.045, 0.012, 6, 14, Math.PI), toon(girl ? '#D9536F' : '#A8574A'), false); mouth.rotation.z = Math.PI; mouth.position.set(0, -0.19, 0.37); face.add(mouth);
}

export function dressHuman(rig: HRig | { root: THREE.Group; head: THREE.Group; skin?: THREE.MeshToonMaterial[]; slots: Record<string, THREE.Group> }, look: HumanLook) {
  const r = rig as HRig; r.root.userData.look = look;
  if (r.skin) drawFace(r, look);
  const S = r.slots; ['hair', 'top', 'sleeveL', 'sleeveR', 'legL', 'legR'].forEach((k) => S[k].clear());
  const tc = look.topC, bc = look.bottomC, sc = look.shoesC, hc = look.hairC;
  const T = S.top;
  const dressy = look.top === 'dress' || look.top === 'puff';
  // ---- верх ----
  const torso = (len = 0.28, y = 0.93) => { const t = cap(0.175, len, tc); t.scale.set(1, 1, 0.8); t.position.y = y; T.add(t); return t; };
  const sleeve = (long: boolean, puff = false) => (['sleeveL', 'sleeveR'] as const).forEach((k) => {
    if (puff) { const p = sph(0.085, tc, 12); p.position.y = -0.04; S[k].add(p); return; }
    const sl = cap(0.064, long ? 0.3 : 0.08, tc); sl.position.y = long ? -0.2 : -0.07; S[k].add(sl);
    if (long) { const cuff = mesh(new THREE.TorusGeometry(0.062, 0.018, 6, 14), toon(shade(tc, 0.85))); cuff.rotation.x = Math.PI / 2; cuff.position.y = -0.38; S[k].add(cuff); }
  });
  if (look.top === 'tee') { torso(); sleeve(false); }
  if (look.top === 'shirt') { torso(); sleeve(false); [-1, 1].forEach((s) => { const c = box(0.09, 0.05, 0.03, '#FFFFFF'); c.position.set(0.05 * s, 1.15, 0.12); c.rotation.z = 0.4 * s; T.add(c); }); for (let i = 0; i < 3; i++) { const b = sph(0.014, '#FFFFFF', 6); b.position.set(0, 1.06 - i * 0.09, 0.145); T.add(b); } }
  if (look.top === 'hoodie' || look.top === 'sweater') {
    const t = cap(0.19, 0.3, tc); t.scale.set(1.02, 1, 0.84); t.position.y = 0.92; T.add(t); sleeve(true);
    const hem = mesh(new THREE.TorusGeometry(0.175, 0.025, 6, 20), toon(shade(tc, 0.85))); hem.rotation.x = Math.PI / 2; hem.scale.y = 0.8; hem.position.y = 0.73; T.add(hem);
    if (look.top === 'hoodie') { const hood = mesh(new THREE.TorusGeometry(0.15, 0.06, 8, 18), toon(tc)); hood.position.set(0, 1.17, -0.08); hood.rotation.x = 1.2; T.add(hood); const pocket = box(0.2, 0.08, 0.03, shade(tc, 0.9)); pocket.position.set(0, 0.82, 0.15); T.add(pocket); [-1, 1].forEach((s) => { const st = mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.14, 4), toon('#FFFFFF')); st.position.set(0.04 * s, 1.08, 0.15); T.add(st); }); }
  }
  if (look.top === 'crop') { torso(0.1, 1.0); sleeve(false, true); }
  if (dressy) {
    torso(0.18, 0.98); sleeve(false, true);
    const skirt = mesh(new THREE.CylinderGeometry(0.17, look.top === 'puff' ? 0.42 : 0.34, look.top === 'puff' ? 0.3 : 0.36, 22, 1, true), toon(tc)); skirt.material.side = THREE.DoubleSide; skirt.position.y = look.top === 'puff' ? 0.62 : 0.6; T.add(skirt);
    if (look.top === 'puff') { const frill = mesh(new THREE.CylinderGeometry(0.42, 0.47, 0.08, 22, 1, true), toon('#FFFFFF')); frill.material.side = THREE.DoubleSide; frill.position.y = 0.45; T.add(frill); const bow = new THREE.Group(); [-1, 1].forEach((s) => { const w = sph(0.07, shade(tc, 0.85), 10); w.scale.set(1.3, 0.8, 0.5); w.position.x = 0.07 * s; bow.add(w); }); bow.position.set(0, 0.82, -0.17); T.add(bow); }
    const belt = mesh(new THREE.TorusGeometry(0.168, 0.02, 6, 20), toon(shade(tc, 0.8))); belt.rotation.x = Math.PI / 2; belt.scale.y = 0.8; belt.position.y = 0.79; T.add(belt);
  }
  // ---- низ ----
  const bottom = look.bottom === 'none' && !dressy ? 'shorts' : look.bottom;
  const hip = (h: number) => { const p = mesh(new THREE.CylinderGeometry(0.17, 0.19, h, 18), toon(bc)); p.scale.z = 0.82; p.position.y = 0.72 - h / 2 + 0.05; T.add(p); };
  if (bottom === 'jeans' || bottom === 'leggings') { hip(0.16); (['legL', 'legR'] as const).forEach((k) => { const l = cap(bottom === 'jeans' ? 0.088 : 0.08, 0.42, bc); l.position.y = -0.3; S[k].add(l); if (bottom === 'jeans') { const seam = box(0.006, 0.4, 0.006, shade(bc, 1.3)); seam.position.set(0.08, -0.3, 0); S[k].add(seam); } }); }
  if (bottom === 'shorts') { hip(0.14); (['legL', 'legR'] as const).forEach((k) => { const l = cap(0.092, 0.06, bc); l.position.y = -0.08; S[k].add(l); }); }
  if (bottom === 'skirt' && !dressy) { const sk = mesh(new THREE.CylinderGeometry(0.17, 0.32, 0.26, 22, 1, true), toon(bc)); sk.material.side = THREE.DoubleSide; sk.position.y = 0.62; T.add(sk); }
  // ---- взуття ----
  (['legL', 'legR'] as const).forEach((k) => {
    const L = S[k];
    if (look.shoes === 'sneakers') { const sh = box(0.15, 0.09, 0.25, sc); sh.position.set(0, -0.58, 0.035); L.add(sh); const sole = box(0.16, 0.035, 0.26, '#FFFFFF'); sole.position.set(0, -0.63, 0.035); L.add(sole); }
    if (look.shoes === 'boots') { const b = mesh(new THREE.CylinderGeometry(0.095, 0.1, 0.26, 14), toon(sc)); b.position.y = -0.47; L.add(b); const f = box(0.15, 0.08, 0.24, sc); f.position.set(0, -0.6, 0.035); L.add(f); }
    if (look.shoes === 'platforms') { const up = box(0.14, 0.09, 0.22, sc); up.position.set(0, -0.55, 0.03); L.add(up); const sole = box(0.16, 0.12, 0.25, shade(sc, 0.75)); sole.position.set(0, -0.64, 0.03); L.add(sole); }
    if (look.shoes === 'fluffy') { const w = mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.32, 16), toon(sc)); w.position.y = -0.42; L.add(w); for (let i = 0; i < 3; i++) { const ring = mesh(new THREE.TorusGeometry(0.125 + i * 0.006, 0.025, 6, 16), toon(shade(sc, 1.08))); ring.rotation.x = Math.PI / 2; ring.position.y = -0.3 - i * 0.11; L.add(ring); } const f = box(0.15, 0.08, 0.24, shade(sc, 0.7)); f.position.set(0, -0.61, 0.035); L.add(f); }
  });
  // ---- волосся ----
  const H = S.hair; const hm = () => toon(hc);
  const crown = (back = 0.55) => { const c = mesh(new THREE.SphereGeometry(0.43, 26, 18, 0, Math.PI * 2, 0, Math.PI * back), hm()); c.rotation.x = -0.38; c.scale.set(1.05, 1, 1.02); c.position.set(0, 0.03, -0.02); H.add(c); };
  const bangs = (n = 5, low = 0.22) => { for (let i = 0; i < n; i++) { const t = (i / (n - 1)) * 2 - 1; const b = mesh(new THREE.SphereGeometry(0.12, 12, 8), hm()); b.scale.set(1, 0.65, 0.5); b.position.set(t * 0.26, low + (1 - Math.abs(t)) * 0.05, 0.31 - Math.abs(t) * 0.06); b.rotation.z = -t * 0.3; H.add(b); } };
  const mass = (len: number, w = 0.3) => { const m = mesh(new THREE.CapsuleGeometry(w, len, 8, 16), hm()); m.scale.set(1.15, 1, 0.55); m.position.set(0, -0.12 - len / 2, -0.2); H.add(m); };
  const side = (len: number) => [-1, 1].forEach((s) => { const l = cap(0.085, len, hc); l.position.set(0.32 * s, -0.12 - len / 2, 0.06); l.rotation.z = 0.08 * s; H.add(l); });
  const hair = look.hair;
  if (hair === 'long') { crown(); bangs(); mass(0.55); side(0.45); }
  if (hair === 'waves') { crown(); bangs(); mass(0.6); [-1, 1].forEach((s) => { for (let i = 0; i < 5; i++) { const w = sph(0.1, hc, 10); w.position.set((0.32 + (i % 2) * 0.04) * s, -0.15 - i * 0.12, 0.02); H.add(w); } }); }
  if (hair === 'bob') { crown(0.62); bangs(6, 0.2); [-1, 1].forEach((s) => { const b = sph(0.17, hc, 14); b.scale.set(0.8, 1.2, 1); b.position.set(0.33 * s, -0.12, -0.02); H.add(b); }); const back = sph(0.38, hc, 18); back.scale.set(1.1, 0.8, 0.8); back.position.set(0, -0.1, -0.15); H.add(back); }
  if (hair === 'buns') { crown(); bangs(); mass(0.3); [-1, 1].forEach((s) => { const b = sph(0.15, hc, 14); b.position.set(0.25 * s, 0.38, -0.05); H.add(b); }); }
  if (hair === 'ponytail') { crown(); bangs(4); const tie = mesh(new THREE.TorusGeometry(0.07, 0.025, 6, 12), toon('#F76AA8')); tie.position.set(0, 0.14, -0.42); H.add(tie); const tl = cap(0.11, 0.45, hc); tl.position.set(0, -0.15, -0.5); tl.rotation.x = 0.25; H.add(tl); }
  if (hair === 'pigtails') { crown(); bangs(); [-1, 1].forEach((s) => { const tie = sph(0.05, '#F76AA8', 8); tie.position.set(0.38 * s, 0.0, -0.05); H.add(tie); const tl = cap(0.1, 0.42, hc); tl.position.set(0.44 * s, -0.27, -0.05); tl.rotation.z = 0.25 * s; H.add(tl); }); }
  if (hair === 'curly') { crown(0.6); for (let i = 0; i < 26; i++) { const a = (i / 26) * Math.PI * 2; const y = 0.2 - (i % 3) * 0.17; const c = sph(0.11, hc, 10); c.position.set(Math.sin(a) * 0.4, y, Math.cos(a) * 0.4 - 0.04); if (Math.cos(a) > 0.55 && y < 0.15) continue; H.add(c); } }
  if (hair === 'short') { crown(0.5); bangs(4, 0.26); }
  if (hair === 'spiky') { crown(0.5); for (let i = 0; i < 8; i++) { const sp = mesh(new THREE.ConeGeometry(0.08, 0.22, 6), hm()); const a = -1.3 + i * 0.37; sp.position.set(Math.sin(a) * 0.3, 0.38, Math.cos(a) * 0.15 - 0.05); sp.rotation.z = -Math.sin(a) * 0.5; H.add(sp); } }
  if (look.ears) [-1, 1].forEach((s) => { const e = sph(0.11, hc, 12); e.scale.z = 0.6; e.position.set(0.27 * s, 0.4, -0.02); H.add(e); const i2 = sph(0.06, '#F7B7C8', 8); i2.scale.z = 0.4; i2.position.set(0.27 * s, 0.4, 0.04); H.add(i2); });
}
