// 3D-сцена гри «My home» на Three.js: кімната, світло, тіні, камера як у режимі будівництва,
// перетягування предметів з прилипанням до сітки, предмети на столах, речі на стінах, фарбування.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HOME_ITEM, type HomeItem } from './home-items';

export const ROOM = 2.8;        // кімната ROOM × ROOM (у масштабі моделей Kenney)
export const HALF = ROOM / 2;
const WALL_H = 1.3;
const SNAP = 0.05;
const KAYKIT_SCALE = 0.38;      // KayKit намальований у більшому масштабі, ніж Kenney

export type HomePlaced = { uid: string; file: string; x: number; z: number; rot: number; color?: string; wall?: number; y?: number };
type Template = { obj: THREE.Object3D; size: THREE.Vector3 };
type Inst = { root: THREE.Group; model: THREE.Object3D; p: HomePlaced; def: HomeItem; size: THREE.Vector3; label: HTMLDivElement; born: number };

export type SceneEvents = {
  onSelect: (uid: string | null) => void;
  onMove: (uid: string, patch: Partial<HomePlaced>, kids: string[]) => void;
  onTap: (uid: string) => void;
  onBad: () => void;
};

const loader = new GLTFLoader();
const cache = new Map<string, Promise<Template>>();
// Усі моделі зібрані в два файли (glTF-Transform merge): одна сцена = один предмет, назва сцени = file
const PACK_URL = { kenney: '/worlds/kenney-all.glb', kaykit: '/worlds/kaykit-all.glb' } as const;
const packs = new Map<string, Promise<Map<string, THREE.Object3D>>>();
function pack(name: 'kenney' | 'kaykit') {
  if (!packs.has(name)) packs.set(name, loader.loadAsync(PACK_URL[name]).then((g) => new Map(g.scenes.map((sc) => [sc.name, sc as THREE.Object3D]))));
  return packs.get(name)!;
}

// Завантажуємо модель один раз і нормалізуємо: центр сліду в (0,0), низ на y=0; для настінних задня грань на z=0
function template(def: HomeItem): Promise<Template> {
  const key = def.file;
  if (!cache.has(key)) {
    cache.set(key, pack(def.pack ?? 'kenney').then((scenes) => {
      const src = scenes.get(def.file);
      if (!src) throw new Error(`model ${def.file} not found`);
      const inner = new THREE.Group(); src.children.forEach((c) => inner.add(c.clone(true)));
      if (def.pack === 'kaykit') inner.scale.setScalar(KAYKIT_SCALE);
      const wrap = new THREE.Group(); wrap.add(inner);
      const box = new THREE.Box3().setFromObject(wrap);
      const c = box.getCenter(new THREE.Vector3());
      if (def.wall) inner.position.set(-c.x, -c.y, -box.min.z);
      else inner.position.set(-c.x, -box.min.y, -c.z);
      wrap.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.castShadow = !def.rug; m.receiveShadow = true;
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((mt) => { const s = mt as THREE.MeshStandardMaterial; if (s.roughness !== undefined) { s.roughness = Math.max(s.roughness, 0.55); s.metalness = Math.min(s.metalness ?? 0, 0.3); } });
        }
      });
      return { obj: wrap, size: box.getSize(new THREE.Vector3()) };
    }));
  }
  return cache.get(key)!;
}

// що фарбуємо: тканину (carpet*) або дерево
function paintTarget(def: HomeItem, obj: THREE.Object3D): RegExp | null {
  if (def.paint === 'none' || def.pack === 'kaykit') return null;
  let hasFabric = false;
  obj.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => { if (/^carpet/i.test(x.name)) hasFabric = true; }); });
  if (def.paint === 'wood') return /^wood$/i;
  return hasFabric ? /^carpet(?!White)/i : /^wood$/i;
}
export function canPaint(def: HomeItem) { return def.paint !== 'none' && def.pack !== 'kaykit'; }

// процедурна текстура підлоги: дошки або плитка
function floorTexture(hex: string, kind: 'wood' | 'tiles' | 'carpet') {
  const cv = document.createElement('canvas'); cv.width = cv.height = 512;
  const g = cv.getContext('2d')!;
  const base = new THREE.Color(hex);
  const tone = (k: number) => { const c = base.clone(); c.offsetHSL(0, 0, k); return `#${c.getHexString()}`; };
  g.fillStyle = tone(0); g.fillRect(0, 0, 512, 512);
  if (kind === 'wood') {
    const rows = 8;
    for (let r = 0; r < rows; r++) {
      const off = (r * 157) % 512;
      for (let i = -1; i < 3; i++) {
        g.fillStyle = tone(((r * 7 + i * 3) % 5 - 2) * 0.018);
        g.fillRect(off + i * 256, r * 64, 256, 64);
        g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(off + i * 256, r * 64, 2, 64);
      }
      g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(0, r * 64, 512, 2);
    }
  } else if (kind === 'tiles') {
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { g.fillStyle = tone(((r + c) % 2) * 0.03); g.fillRect(c * 128 + 2, r * 128 + 2, 124, 124); }
  } else {
    for (let i = 0; i < 3000; i++) { g.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`; g.fillRect(Math.random() * 512, Math.random() * 512, 2, 2); }
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(ROOM / 2, ROOM / 2); t.anisotropy = 8;
  return t;
}

export class HomeScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private ray = new THREE.Raycaster();
  private items = new Map<string, Inst>();
  private walls: { mesh: THREE.Group; side: number }[] = [];
  private wallMat = new THREE.MeshStandardMaterial({ color: '#F1E6CF', roughness: 0.95 });
  private floorMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 });
  private marker: THREE.Mesh;
  private markerMat = new THREE.MeshBasicMaterial({ color: '#D0F834', transparent: true, opacity: 0.5, depthWrite: false });
  private drag: { uid: string; off: THREE.Vector3; start: { x: number; y: number }; moved: boolean; ok: boolean; patch: Partial<HomePlaced>; kids?: string[] } | null = null;
  private sel: string | null = null;
  private raf = 0;
  private ro: ResizeObserver;
  private hop: { uid: string; t0: number } | null = null;
  showLabels = true;

  constructor(private host: HTMLDivElement, private labels: HTMLDivElement, private ev: SceneEvents) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    this.camera.position.set(3.7, 3.4, 3.7);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.3, 0);
    this.controls.enableDamping = true; this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.minPolarAngle = 0.45; this.controls.maxPolarAngle = 1.2;
    this.controls.minDistance = 1.8; this.controls.maxDistance = 8;

    // світло: м'яке небо + тепле «сонце» з тінями
    this.scene.add(new THREE.HemisphereLight('#fff6e8', '#b9a58c', 1.35));
    const sun = new THREE.DirectionalLight('#fff1dc', 2.1);
    sun.position.set(2.5, 5, 1.8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 20 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02; sun.shadow.radius = 4;
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight('#dbe8ff', 0.45); fill.position.set(-4, 3, -2); this.scene.add(fill);

    this.buildRoom();
    this.marker = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.markerMat);
    this.marker.rotation.x = -Math.PI / 2; this.marker.visible = false; this.marker.renderOrder = 2;
    this.scene.add(this.marker);

    const el = this.renderer.domElement;
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', this.down);
    window.addEventListener('pointermove', this.move);
    window.addEventListener('pointerup', this.up);
    this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(host);
    this.resize();
    this.loop();
  }

  // ---------- кімната ----------
  private buildRoom() {
    const floor = new THREE.Mesh(new THREE.BoxGeometry(ROOM, 0.08, ROOM), this.floorMat);
    floor.position.y = -0.04; floor.receiveShadow = true; this.scene.add(floor);
    const base = new THREE.Mesh(new THREE.BoxGeometry(ROOM + 0.3, 0.2, ROOM + 0.3), new THREE.MeshStandardMaterial({ color: '#E9DCC1', roughness: 1 }));
    base.position.y = -0.18; base.receiveShadow = true; this.scene.add(base);
    const trim = new THREE.MeshStandardMaterial({ color: '#FBF8F1', roughness: 0.8 });
    // 4 стіни: 0 північ (z−), 1 захід (x−), 2 південь (z+), 3 схід (x+)
    for (let side = 0; side < 4; side++) {
      const g = new THREE.Group();
      const w = new THREE.Mesh(new THREE.BoxGeometry(ROOM + 0.1, WALL_H, 0.1), this.wallMat);
      w.position.y = WALL_H / 2; w.castShadow = true; w.receiveShadow = true; g.add(w);
      const sk = new THREE.Mesh(new THREE.BoxGeometry(ROOM, 0.07, 0.03), trim); sk.position.set(0, 0.035, 0.065); g.add(sk);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(ROOM + 0.12, 0.03, 0.14), trim); cap.position.y = WALL_H + 0.015; g.add(cap);
      if (side === 0) this.addWindow(g, 0.55, trim);
      if (side === 1) this.addWindow(g, -0.45, trim);
      if (side === 3) this.addDoor(g, trim);
      g.rotation.y = [0, Math.PI / 2, Math.PI, -Math.PI / 2][side];
      const d = HALF + 0.05;
      g.position.set([0, -d, 0, d][side], 0, [-d, 0, d, 0][side]);
      this.scene.add(g);
      this.walls.push({ mesh: g, side });
    }
  }
  private addWindow(g: THREE.Group, x: number, trim: THREE.Material) {
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.62), new THREE.MeshStandardMaterial({ color: '#BFE4FA', emissive: '#9fd4f5', emissiveIntensity: 0.45, roughness: 0.2 }));
    glass.position.set(x, 0.72, 0.056); g.add(glass);
    const bars: [number, number, number, number][] = [[0, 0.405, 1.0, 0.05], [0, -0.335, 1.0, 0.07], [-0.475, 0.035, 0.05, 0.74], [0.475, 0.035, 0.05, 0.74], [0, 0.035, 0.035, 0.66], [0, 0.035, 0.9, 0.03]];
    bars.forEach(([bx, by, w, h]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.05), trim); b.position.set(x + bx, 0.72 + by - 0.035 + 0.035, 0.07); b.castShadow = true; g.add(b); });
  }
  private addDoor(g: THREE.Group, trim: THREE.Material) {
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.0, 0.03), new THREE.MeshStandardMaterial({ color: '#B98457', roughness: 0.7 }));
    door.position.set(0.7, 0.5, 0.065); g.add(door);
    const frame: [number, number, number, number][] = [[0.7, 1.03, 0.65, 0.06], [0.4, 0.5, 0.05, 1.06], [1.0, 0.5, 0.05, 1.06]];
    frame.forEach(([fx, fy, w, h]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.06), trim); b.position.set(fx, fy, 0.07); g.add(b); });
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 12), new THREE.MeshStandardMaterial({ color: '#E8C35A', metalness: 0.6, roughness: 0.3 }));
    knob.position.set(0.5, 0.5, 0.09); g.add(knob);
  }
  setWall(hex: string) { this.wallMat.color.set(hex); }
  setFloor(hex: string, kind: 'wood' | 'tiles' | 'carpet') {
    this.floorMat.map?.dispose(); this.floorMat.map = floorTexture(hex, kind); this.floorMat.color.set('#ffffff'); this.floorMat.needsUpdate = true;
  }

  // ---------- предмети ----------
  async sync(list: HomePlaced[]) {
    const keep = new Set(list.map((p) => p.uid));
    for (const [uid, it] of this.items) if (!keep.has(uid)) { this.scene.remove(it.root); it.label.remove(); this.items.delete(uid); }
    for (const p of list) {
      const def = HOME_ITEM[p.file]; if (!def) continue;
      let it = this.items.get(p.uid);
      if (!it) {
        let tpl: Template;
        try { tpl = await template(def); } catch { continue; }
        if (!keep.has(p.uid) || this.items.has(p.uid)) continue;
        const model = tpl.obj.clone(true);
        model.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone(); });
        const root = new THREE.Group(); root.add(model); root.userData.uid = p.uid;
        this.scene.add(root);
        const label = document.createElement('div'); label.className = 'hm-label'; this.labels.appendChild(label);
        it = { root, model, p, def, size: tpl.size, label, born: performance.now() };
        this.items.set(p.uid, it);
      }
      it.p = p;
      this.place(it);
      this.paint(it, p.color);
    }
    this.updateMarker();
  }
  private footprint(it: { size: THREE.Vector3; p: HomePlaced }) {
    const odd = it.p.rot % 2 === 1;
    return { w: odd ? it.size.z : it.size.x, d: odd ? it.size.x : it.size.z };
  }
  private place(it: Inst) {
    const { p, def, root } = it;
    if (def.wall) {
      const side = p.wall ?? 0, d = HALF;
      root.rotation.y = [0, Math.PI / 2, Math.PI, -Math.PI / 2][side];
      const along = p.x;
      root.position.set([along, -d, -along, d][side], p.y ?? 0.8, [-d, along, d, -along][side]);
    } else {
      root.rotation.y = (p.rot % 4) * Math.PI / 2;
      root.position.set(p.x, p.y ?? this.supportY(p.uid, p.x, p.z, def), p.z);
    }
  }
  private paint(it: Inst, color?: string) {
    const re = paintTarget(it.def, it.model);
    if (!re) return;
    it.model.traverse((o) => {
      const m = o as THREE.Mesh; if (!m.isMesh) return;
      (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => {
        const s = mt as THREE.MeshStandardMaterial;
        if (!s.userData.orig) s.userData.orig = s.color.getHex();
        if (re.test(s.name)) s.color.set(color ?? s.userData.orig);
      });
    });
  }
  // висота поверхні під дрібною річчю
  private supportY(uid: string, x: number, z: number, def: HomeItem) {
    if (!def.small) return 0;
    let y = 0;
    for (const [id, o] of this.items) {
      if (id === uid || !o.def.surface) continue;
      const f = this.footprint(o);
      if (Math.abs(x - o.p.x) <= f.w / 2 && Math.abs(z - o.p.z) <= f.d / 2) y = Math.max(y, o.size.y);
    }
    return y;
  }
  // дрібні речі, що стоять на цьому предметі (щоб переносити їх разом із ним)
  carried(uid: string): string[] {
    const base = this.items.get(uid); if (!base || !base.def.surface) return [];
    const f = this.footprint(base);
    return [...this.items.values()].filter((o) => o.p.uid !== uid && o.def.small && Math.abs(o.p.x - base.p.x) <= f.w / 2 && Math.abs(o.p.z - base.p.z) <= f.d / 2).map((o) => o.p.uid);
  }
  supportOf(uid: string): string | null {
    const it = this.items.get(uid); if (!it || !it.def.small) return null;
    for (const [id, o] of this.items) {
      if (id === uid || !o.def.surface) continue;
      const f = this.footprint(o);
      if (Math.abs(it.p.x - o.p.x) <= f.w / 2 && Math.abs(it.p.z - o.p.z) <= f.d / 2) return o.p.file;
    }
    return null;
  }
  // відстань між предметами (для «next to»)
  gap(a: string, b: string) {
    const A = this.items.get(a), B = this.items.get(b); if (!A || !B) return Infinity;
    const fa = this.footprint(A), fb = this.footprint(B);
    const dx = Math.abs(A.p.x - B.p.x) - (fa.w + fb.w) / 2, dz = Math.abs(A.p.z - B.p.z) - (fa.d + fb.d) / 2;
    return Math.max(dx, dz); // < 0 означає, що предмети накладаються
  }
  canPlace(uid: string, p: HomePlaced) {
    const def = HOME_ITEM[p.file]; const it = this.items.get(uid);
    if (!def || !it) return false;
    if (def.wall) return Math.abs(p.x) <= HALF - 0.2 && (p.y ?? 0.8) >= 0.25 && (p.y ?? 0.8) <= WALL_H - 0.2;
    const f = this.footprint({ size: it.size, p });
    if (p.x - f.w / 2 < -HALF - 0.001 || p.x + f.w / 2 > HALF + 0.001 || p.z - f.d / 2 < -HALF - 0.001 || p.z + f.d / 2 > HALF + 0.001) return false;
    for (const [id, o] of this.items) {
      if (id === uid || o.def.wall) continue;
      const g = this.footprint(o);
      const hit = Math.abs(p.x - o.p.x) < (f.w + g.w) / 2 - 0.01 && Math.abs(p.z - o.p.z) < (f.d + g.d) / 2 - 0.01;
      if (!hit) continue;
      if (def.rug || o.def.rug) { if (def.rug && o.def.rug) return false; continue; }
      if (def.small && o.def.surface && Math.abs(p.x - o.p.x) <= g.w / 2 && Math.abs(p.z - o.p.z) <= g.d / 2) continue;
      if (o.def.small && def.surface) continue; // річ на столі поїде разом зі столом? ні: просто дозволяємо, вона лишиться на місці
      return false;
    }
    return true;
  }
  // знайти вільне місце для нового предмета
  async findSpot(file: string, list: HomePlaced[]): Promise<HomePlaced | null> {
    const def = HOME_ITEM[file]; const tpl = await template(def);
    const uid = '__probe';
    const fake: Inst = { root: new THREE.Group(), model: new THREE.Group(), p: { uid, file, x: 0, z: 0, rot: 0 }, def, size: tpl.size, label: document.createElement('div'), born: 0 };
    this.items.set(uid, fake);
    try {
      if (def.wall) {
        for (const side of [0, 1]) for (let a = 0; a <= HALF - 0.3; a += 0.25) for (const s of [1, -1]) {
          const p = { uid, file, x: a * s, z: 0, rot: 0, wall: side, y: 0.85 };
          const busy = list.some((q) => HOME_ITEM[q.file]?.wall && q.wall === side && Math.abs(q.x - p.x) < 0.45 && Math.abs((q.y ?? 0.85) - 0.85) < 0.4);
          if (!busy) return { ...p };
        }
        return null;
      }
      const spots: [number, number][] = [];
      for (let x = -HALF + 0.2; x <= HALF - 0.2; x += 0.1) for (let z = -HALF + 0.2; z <= HALF - 0.2; z += 0.1) spots.push([+x.toFixed(2), +z.toFixed(2)]);
      // дрібні речі спершу пробуємо поставити на меблі
      if (def.small) {
        for (const o of this.items.values()) {
          if (!o.def.surface || o.p.uid === uid) continue;
          const p = { uid, file, x: o.p.x, z: o.p.z, rot: o.p.rot };
          fake.p = p;
          const busy = [...this.items.values()].some((q) => q.p.uid !== uid && q.def.small && Math.abs(q.p.x - p.x) < 0.2 && Math.abs(q.p.z - p.z) < 0.2);
          if (!busy && this.canPlace(uid, p)) return { ...p };
        }
      }
      spots.sort((a, b) => Math.hypot(a[0], a[1]) - Math.hypot(b[0], b[1]));
      for (const rot of [0, 1]) for (const [x, z] of spots) {
        const p = { uid, file, x, z, rot }; fake.p = p;
        if (this.canPlace(uid, p) && (!def.small || this.supportY(uid, x, z, def) === 0)) return { ...p };
      }
      return null;
    } finally { this.items.delete(uid); }
  }

  select(uid: string | null) { this.sel = uid; this.updateMarker(); }
  bounce(uid: string) { this.hop = { uid, t0: performance.now() }; }
  private updateMarker() {
    const it = this.sel ? this.items.get(this.sel) : null;
    if (!it || it.def.wall) { this.marker.visible = false; return; }
    const f = this.footprint(it);
    this.marker.visible = true;
    this.marker.scale.set(f.w + 0.06, f.d + 0.06, 1);
    this.marker.position.set(it.root.position.x, it.root.position.y + 0.012, it.root.position.z);
    this.markerMat.color.set(this.drag && !this.drag.ok ? '#E5533D' : '#D0F834');
  }

  // ---------- миша і пальці ----------
  private ndc(e: PointerEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }
  private pick(e: PointerEvent) {
    this.ray.setFromCamera(this.ndc(e), this.camera);
    const roots = [...this.items.values()].filter((i) => i.root.visible).map((i) => i.root);
    const hits = this.ray.intersectObjects(roots, true);
    for (const h of hits) { let o: THREE.Object3D | null = h.object; while (o && !o.userData.uid) o = o.parent; if (o) return { uid: o.userData.uid as string, point: h.point }; }
    return null;
  }
  private floorPoint(e: PointerEvent, y = 0) {
    this.ray.setFromCamera(this.ndc(e), this.camera);
    const p = new THREE.Vector3();
    return this.ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -y), p) ? p : null;
  }
  private wallPoint(e: PointerEvent) {
    this.ray.setFromCamera(this.ndc(e), this.camera);
    const vis = this.walls.filter((w) => w.mesh.scale.y > 0.5);
    let best: { side: number; along: number; y: number; d: number } | null = null;
    for (const w of vis) {
      const n = [new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, -1), new THREE.Vector3(-1, 0, 0)][w.side];
      const plane = new THREE.Plane(n, HALF);
      const p = new THREE.Vector3();
      if (!this.ray.ray.intersectPlane(plane, p)) continue;
      const along = [p.x, p.z, -p.x, -p.z][w.side];
      const d = this.ray.ray.origin.distanceTo(p);
      if (Math.abs(along) <= HALF && p.y >= 0 && p.y <= WALL_H && (!best || d < best.d)) best = { side: w.side, along, y: p.y, d };
    }
    return best;
  }
  private down = (e: PointerEvent) => {
    const hit = this.pick(e);
    if (!hit) { this.drag = null; this.downAt = { x: e.clientX, y: e.clientY }; return; }
    const it = this.items.get(hit.uid)!;
    this.controls.enabled = false;
    const fp = it.def.wall ? new THREE.Vector3() : this.floorPoint(e, it.root.position.y) ?? new THREE.Vector3();
    this.drag = { uid: hit.uid, off: new THREE.Vector3(fp.x - it.p.x, 0, fp.z - it.p.z), start: { x: e.clientX, y: e.clientY }, moved: false, ok: true, patch: {} };
    this.sel = hit.uid; this.ev.onSelect(hit.uid); this.updateMarker();
  };
  private downAt: { x: number; y: number } | null = null;
  private move = (e: PointerEvent) => {
    if (!this.drag) { this.hover(e); return; }
    const d = this.drag; const it = this.items.get(d.uid); if (!it) return;
    if (!d.moved && Math.hypot(e.clientX - d.start.x, e.clientY - d.start.y) < 5) return;
    d.moved = true;
    if (it.def.wall) {
      const w = this.wallPoint(e); if (!w) return;
      const snap = (v: number) => Math.round(v / SNAP) * SNAP;
      const patch = { wall: w.side, x: snap(w.along), y: snap(w.y) };
      const p = { ...it.p, ...patch };
      d.ok = this.canPlace(d.uid, p); d.patch = patch;
      const tmp = { ...it, p }; this.place(tmp as Inst);
    } else {
      const fp = this.floorPoint(e, 0); if (!fp) return;
      const x = Math.round((fp.x - d.off.x) / SNAP) * SNAP, z = Math.round((fp.z - d.off.z) / SNAP) * SNAP;
      const p = { ...it.p, x: +x.toFixed(2), z: +z.toFixed(2), y: undefined };
      d.ok = this.canPlace(d.uid, p); d.patch = { x: p.x, z: p.z };
      const dx = p.x - it.p.x, dz = p.z - it.p.z;
      it.root.position.set(p.x, this.supportY(d.uid, p.x, p.z, it.def) + 0.04, p.z);
      if (!d.kids) d.kids = this.carried(d.uid);
      d.kids.forEach((k) => { const o = this.items.get(k); if (o) o.root.position.set(o.p.x + dx, it.size.y + 0.04, o.p.z + dz); });
    }
    this.updateMarker();
  };
  private up = (e: PointerEvent) => {
    const d = this.drag; this.controls.enabled = true;
    if (!d) {
      if (this.downAt && Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) < 5 && e.target === this.renderer.domElement) { this.sel = null; this.ev.onSelect(null); this.updateMarker(); }
      this.downAt = null; return;
    }
    this.drag = null;
    const it = this.items.get(d.uid); if (!it) return;
    if (!d.moved) { this.ev.onTap(d.uid); this.bounce(d.uid); return; }
    if (d.ok) { this.ev.onMove(d.uid, d.patch, d.kids ?? this.carried(d.uid)); this.bounce(d.uid); }
    else { this.ev.onBad(); this.place(it); (d.kids ?? []).forEach((k) => { const o = this.items.get(k); if (o) this.place(o); }); this.updateMarker(); }
  };
  private hover(e: PointerEvent) {
    if (e.target !== this.renderer.domElement) return;
    const hit = this.pick(e);
    this.renderer.domElement.style.cursor = hit ? 'grab' : 'default';
  }

  // повертаємо камеру на 90° (кнопки для дітей)
  turn(dir: 1 | -1) {
    const off = this.camera.position.clone().sub(this.controls.target);
    const start = Math.atan2(off.x, off.z), end = start + dir * Math.PI / 2, r = Math.hypot(off.x, off.z), t0 = performance.now();
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / 450), e = 1 - Math.pow(1 - k, 3);
      const a = start + (end - start) * e;
      this.camera.position.set(this.controls.target.x + Math.sin(a) * r, this.camera.position.y, this.controls.target.z + Math.cos(a) * r);
      if (k < 1) requestAnimationFrame(step);
    };
    step();
  }

  // ---------- кадр ----------
  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    this.controls.update();
    const cam = this.camera.position;
    // стіни між камерою і кімнатою опускаємо, як у Sims
    for (const w of this.walls) {
      const hide = [cam.z < -HALF, cam.x < -HALF, cam.z > HALF, cam.x > HALF][w.side];
      const target = hide ? 0.06 : 1;
      w.mesh.scale.y += (target - w.mesh.scale.y) * 0.18;
      w.mesh.children.forEach((c, i) => { if (i > 1) c.visible = !hide; });
    }
    const now = performance.now();
    const r = this.renderer.domElement.getBoundingClientRect();
    for (const it of this.items.values()) {
      if (it.def.wall) { const wl = this.walls[it.p.wall ?? 0]; it.root.visible = wl.mesh.scale.y > 0.5; }
      // поява: пружинка
      const age = (now - it.born) / 380;
      const s = age >= 1 ? 1 : 1 + Math.sin(age * Math.PI) * 0.12 * (1 - age) - (1 - age) * 0.25;
      it.model.scale.setScalar(Math.max(0.6, s));
      let lift = 0;
      if (this.hop?.uid === it.p.uid) { const k = (now - this.hop.t0) / 360; if (k < 1) lift = Math.sin(k * Math.PI) * 0.12; else this.hop = null; }
      it.model.position.y = lift;
      // підпис
      const show = it.root.visible && (this.showLabels || this.sel === it.p.uid) && !it.def.rug;
      it.label.style.display = show ? 'block' : 'none';
      if (show) {
        const top = it.def.wall ? it.size.y / 2 + 0.05 : it.size.y + 0.08;
        const v = new THREE.Vector3(0, top, 0).applyMatrix4(it.root.matrixWorld).project(this.camera);
        it.label.style.transform = `translate(-50%, -100%) translate(${((v.x + 1) / 2) * r.width}px, ${((1 - v.y) / 2) * r.height}px)`;
        it.label.classList.toggle('is-sel', this.sel === it.p.uid);
      }
    }
    if (this.sel) this.updateMarker();
    this.renderer.render(this.scene, this.camera);
  };
  setLabel(uid: string, text: string) { const it = this.items.get(uid); if (it) it.label.textContent = text; }
  private resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = '100%'; this.renderer.domElement.style.height = '100%';
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  }
  dispose() {
    cancelAnimationFrame(this.raf); this.ro.disconnect();
    this.renderer.domElement.removeEventListener('pointerdown', this.down);
    window.removeEventListener('pointermove', this.move); window.removeEventListener('pointerup', this.up);
    this.controls.dispose(); this.renderer.dispose(); this.renderer.domElement.remove();
    this.items.forEach((it) => it.label.remove());
  }
}

// Мініатюра для предметів без готової картинки (KayKit): рендеримо один раз у прихованому полотні
let thumbR: THREE.WebGLRenderer | null = null;
const thumbCache = new Map<string, Promise<string>>();
export function renderThumb(def: HomeItem): Promise<string> {
  if (!thumbCache.has(def.file)) thumbCache.set(def.file, template(def).then((tpl) => {
    thumbR = thumbR ?? new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    thumbR.setSize(180, 160); thumbR.outputColorSpace = THREE.SRGBColorSpace; thumbR.toneMapping = THREE.ACESFilmicToneMapping;
    const sc = new THREE.Scene();
    sc.add(new THREE.HemisphereLight('#ffffff', '#b9a58c', 1.6));
    const l = new THREE.DirectionalLight('#ffffff', 1.6); l.position.set(3, 5, 4); sc.add(l);
    const o = tpl.obj.clone(true); sc.add(o);
    if (def.wall) o.rotation.y = 0;
    const box = new THREE.Box3().setFromObject(o); const c = box.getCenter(new THREE.Vector3()); const s = box.getSize(new THREE.Vector3()).length();
    const cam = new THREE.PerspectiveCamera(30, 180 / 160, 0.01, 50);
    const dir = def.wall ? new THREE.Vector3(0.5, 0.3, 1) : new THREE.Vector3(1, 0.85, 1);
    cam.position.copy(c).add(dir.normalize().multiplyScalar(s * 1.9)); cam.lookAt(c);
    thumbR.render(sc, cam);
    return thumbR.domElement.toDataURL('image/png');
  }));
  return thumbCache.get(def.file)!;
}
