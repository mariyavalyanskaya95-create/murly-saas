// 3D-рушій «Murly Town» на Three.js. Два режими: місто (будинки, дороги, машини) і кімната всередині будинку.
// Світло з м'якими тінями, камера як у режимі будівництва, перетягування з сіткою, речі на столах і стінах,
// фарбування, герой з анімаціями, який ходить туди, куди натиснеш.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getItem, PACK_SCALE, PACK_URL, type Pack, type WorldItem } from './world-items';
import { retargetClips } from './retarget';
import { DOOR_W, GAP, doorsOf, roomPath, type Door, type PlanRoom } from './house-plan';

// сусідні кімнати на плані будинку (координати центру відносно поточної кімнати)
export type PlanNeighbor = { id: string; name: string; size: number; x: number; z: number; wall: string; floor: { hex: string; kind: 'wood' | 'tiles' | 'carpet' }; placed: Placed[]; doors: Door[]; shared: number[]; skip: number[] };
export type ScenePlan = { me: string; doors: Door[]; shared: number[]; entrance: boolean; rooms: PlanNeighbor[]; below?: PlanNeighbor[] };
export type HeroStart = { x: number; z: number; rot: number; goal?: { x: number; z: number } };
export type CamView = { cam: [number, number, number]; target: [number, number, number] };

// рідні анімації KayKit (CC0) для сидіння і лежання
const POSE = { sit: 'Sit_Chair_Idle', lie: 'Lie_Idle' };
export type HeroAct = 'sit' | 'sleep' | 'water' | 'eat' | 'dance' | 'wave' | 'phone' | 'stand' | 'go';
// додаткові рухи (Universal Animation Library, Quaternius, CC0), переносимо на скелет героя
let extraAnims: Promise<{ scene: THREE.Object3D; clips: THREE.AnimationClip[] }[]> | null = null;
const heroClips = new Map<string, THREE.AnimationClip[]>();

export type WorldMode = 'room' | 'city' | 'yard';
export type Placed = { uid: string; file: string; x: number; z: number; rot: number; color?: string; wall?: number; y?: number };
type Template = { obj: THREE.Object3D; size: THREE.Vector3 };
type Inst = { root: THREE.Group; model: THREE.Object3D; p: Placed; def: WorldItem; size: THREE.Vector3; label: HTMLDivElement; born: number };

export type SceneEvents = {
  onSelect: (uid: string | null) => void;
  onMove: (uid: string, patch: Partial<Placed>, kids: string[]) => void;
  onTap: (uid: string) => void;
  onBad: () => void;
  onHero?: () => void;
  onHouse?: () => void; // натиснули на будинок у дворі
  onRoom?: (id: string, hero: HeroStart, view: CamView) => void; // герой зайшов у сусідню кімнату
  onArrive?: (uid: string) => void; // герой дійшов до предмета (сходи)
};

const CFG = {
  room: { size: 2.8, wallH: 1.3, cam: [3.7, 3.4, 3.7], target: 0.3, dist: [1.8, 8], shadow: 2.6, snap: 0.05, hero: 0.34, speed: 0.55 },
  city: { size: 20, wallH: 0, cam: [12, 12, 12], target: 0, dist: [7, 42], shadow: 12, snap: 0.25, hero: 0.24, speed: 1.6 },
  yard: { size: 10, wallH: 0, cam: [8, 7.5, 8], target: 0.3, dist: [3, 22], shadow: 7, snap: 0.1, hero: 0.34, speed: 0.9 },
} as const;

const loader = new GLTFLoader();
const packs = new Map<Pack, Promise<Map<string, THREE.Object3D>>>();
function pack(name: Pack) {
  if (!packs.has(name)) packs.set(name, loader.loadAsync(PACK_URL[name]).then((g) => new Map(g.scenes.map((sc) => [sc.name, sc as THREE.Object3D]))));
  return packs.get(name)!;
}
const cache = new Map<string, Promise<Template>>();
// Модель нормалізуємо: центр сліду в (0,0), низ на y=0; для настінних задня грань на z=0
function template(def: WorldItem): Promise<Template> {
  const key = `${def.pack}:${def.file}:${def.scale ?? 1}`;
  if (!cache.has(key)) {
    cache.set(key, (def.pack === 'proc' ? Promise.resolve(new Map([[def.file, procModel(def.file)]])) : pack(def.pack)).then((scenes) => {
      const src = scenes.get(def.file);
      if (!src) throw new Error(`model ${def.file} not found`);
      const inner = new THREE.Group(); src.children.forEach((c) => inner.add(c.clone(true)));
      inner.scale.setScalar(PACK_SCALE[def.pack] * (def.scale ?? 1));
      const wrap = new THREE.Group(); wrap.add(inner);
      const box = new THREE.Box3().setFromObject(wrap);
      const c = box.getCenter(new THREE.Vector3());
      if (def.wall) inner.position.set(-c.x, -c.y, -box.min.z);
      else inner.position.set(-c.x, -box.min.y, -c.z);
      wrap.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.castShadow = !def.rug; m.receiveShadow = true;
          (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { const s = mt as THREE.MeshStandardMaterial; if (s.roughness !== undefined) { s.roughness = Math.max(s.roughness, 0.55); s.metalness = Math.min(s.metalness ?? 0, 0.3); } });
        }
      });
      return { obj: wrap, size: box.getSize(new THREE.Vector3()) };
    }));
  }
  return cache.get(key)!;
}
export const canPaint = (def?: WorldItem) => !!def && def.pack === 'kenney' && def.paint !== 'none';
function paintTarget(def: WorldItem, obj: THREE.Object3D): RegExp | null {
  if (!canPaint(def)) return null;
  let fabric = false;
  obj.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => { if (/^carpet/i.test(x.name)) fabric = true; }); });
  if (def.paint === 'wood') return /^wood$/i;
  return fabric ? /^carpet(?!White)/i : /^wood$/i;
}

function groundTexture(hex: string, kind: 'wood' | 'tiles' | 'carpet' | 'grass', repeat: number) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 512;
  const g = cv.getContext('2d')!;
  const base = new THREE.Color(hex);
  const tone = (k: number) => { const c = base.clone(); c.offsetHSL(0, 0, k); return `#${c.getHexString()}`; };
  g.fillStyle = tone(0); g.fillRect(0, 0, 512, 512);
  if (kind === 'wood') {
    for (let r = 0; r < 8; r++) {
      const off = (r * 157) % 512;
      for (let i = -1; i < 3; i++) { g.fillStyle = tone(((r * 7 + i * 3) % 5 - 2) * 0.018); g.fillRect(off + i * 256, r * 64, 256, 64); g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(off + i * 256, r * 64, 2, 64); }
      g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(0, r * 64, 512, 2);
    }
  } else if (kind === 'tiles') {
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { g.fillStyle = tone(((r + c) % 2) * 0.03); g.fillRect(c * 128 + 2, r * 128 + 2, 124, 124); }
  } else if (kind === 'grass') {
    for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(${Math.random() < 0.5 ? '255,255,255' : '0,60,0'},${Math.random() * 0.07})`; g.fillRect(Math.random() * 512, Math.random() * 512, 3, 3); }
    g.strokeStyle = 'rgba(0,0,0,.07)'; g.lineWidth = 2; g.strokeRect(1, 1, 510, 510);
  } else {
    for (let i = 0; i < 3000; i++) { g.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`; g.fillRect(Math.random() * 512, Math.random() * 512, 2, 2); }
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); t.anisotropy = 8;
  return t;
}

export class WorldScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private ray = new THREE.Raycaster();
  private items = new Map<string, Inst>();
  private walls: { mesh: THREE.Group; side: number }[] = [];
  private wallMat = new THREE.MeshStandardMaterial({ color: '#F1E6CF', roughness: 0.95 });
  private floorMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 });
  private marker: THREE.Mesh;
  private markerMat = new THREE.MeshBasicMaterial({ color: '#D0F834', transparent: true, opacity: 0.5, depthWrite: false });
  private drag: { uid: string; off: THREE.Vector3; start: { x: number; y: number }; moved: boolean; ok: boolean; patch: Partial<Placed>; kids?: string[] } | null = null;
  private downAt: { x: number; y: number } | null = null;
  private sel: string | null = null;
  private raf = 0;
  private ro: ResizeObserver;
  private hop: { uid: string; t0: number } | null = null;
  private clock = new THREE.Clock();
  private hero: { obj: THREE.Object3D; mixer: THREE.AnimationMixer; acts: Record<string, THREE.AnimationAction>; cur: string; target: THREE.Vector3 | null; pose: 'stand' | 'sit' | 'lie'; then: (() => void) | null; seat: string | null; hipsAt: Record<string, THREE.Vector3> } | null = null;
  private heroToken = 0;
  private c: { size: number; wallH: number; cam: readonly number[]; target: number; dist: readonly number[]; shadow: number; snap: number; hero: number; speed: number };
  readonly half: number;
  private bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  private nWalls: { mesh: THREE.Group; side: number; cx: number; cz: number; h: number }[] = [];
  private nav: PlanRoom[] = [];
  private switched = false;
  private disposed = false;
  private path: THREE.Vector3[] = [];
  showLabels = true;

  constructor(private host: HTMLDivElement, private labels: HTMLDivElement, private ev: SceneEvents, readonly mode: WorldMode, private opts: { roomSize?: number; sky?: 'clouds' | 'garden'; plan?: ScenePlan; heroAt?: HeroStart; view?: CamView } = {}) {
    const base = CFG[mode];
    const k = mode === 'room' && opts.roomSize ? opts.roomSize / base.size : 1;
    this.c = { ...base, size: mode === 'room' ? opts.roomSize ?? base.size : base.size, cam: base.cam.map((v) => v * k), dist: [base.dist[0], base.dist[1] * k], shadow: base.shadow * k };
    this.half = this.c.size / 2;
    // план будинку: камера й тіні охоплюють усі кімнати поверху
    this.bounds = { minX: -this.half, maxX: this.half, minZ: -this.half, maxZ: this.half };
    for (const n of opts.plan?.rooms ?? []) { const h = n.size / 2; this.bounds = { minX: Math.min(this.bounds.minX, n.x - h), maxX: Math.max(this.bounds.maxX, n.x + h), minZ: Math.min(this.bounds.minZ, n.z - h), maxZ: Math.max(this.bounds.maxZ, n.z + h) }; }
    if (opts.plan?.rooms.length) {
      const span = Math.max(this.bounds.maxX - this.bounds.minX, this.bounds.maxZ - this.bounds.minZ);
      this.c = { ...this.c, dist: [this.c.dist[0], Math.max(this.c.dist[1], span * 1.7)], shadow: Math.max(this.c.shadow, span * 0.75) };
    }
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NeutralToneMapping; // яскравіші кольори, ніж ACES
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(this.renderer.domElement);
    const el = this.renderer.domElement;
    el.style.touchAction = 'none';
    // наш обробник ставимо ПЕРШИМ, щоб натискання на предмет не крутило камеру
    el.addEventListener('pointerdown', this.down);
    el.addEventListener('dblclick', this.dbl);
    el.addEventListener('contextmenu', (e) => e.preventDefault());

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
    this.camera.position.set(...(this.c.cam as unknown as [number, number, number]));
    this.controls = new OrbitControls(this.camera, el);
    this.controls.target.set(0, this.c.target, 0);
    this.controls.enableDamping = true; this.controls.dampingFactor = 0.08;
    this.controls.enablePan = true; this.controls.screenSpacePanning = false; this.controls.panSpeed = 0.8;
    this.controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    this.controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    this.controls.zoomSpeed = 1.2;
    this.controls.minPolarAngle = 0.4; this.controls.maxPolarAngle = 1.2;
    this.controls.minDistance = this.c.dist[0]; this.controls.maxDistance = this.c.dist[1];
    if (opts.view) { this.camera.position.set(...opts.view.cam); this.controls.target.set(...opts.view.target); }

    this.scene.background = skyBackground();
    this.addClouds();
    this.scene.add(new THREE.HemisphereLight('#eaf6ff', '#a8c48a', mode === 'room' ? 1.35 : 1.55));
    const sun = new THREE.DirectionalLight('#fff1dc', 2.1);
    const bc = { x: (this.bounds.minX + this.bounds.maxX) / 2, z: (this.bounds.minZ + this.bounds.maxZ) / 2 };
    sun.position.set(bc.x + this.c.shadow, this.c.shadow * 2, bc.z + this.c.shadow * 0.7);
    sun.target.position.set(bc.x, 0, bc.z); this.scene.add(sun.target);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sb = this.c.shadow;
    Object.assign(sun.shadow.camera, { left: -sb, right: sb, top: sb, bottom: -sb, near: 0.5, far: sb * 8 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02; sun.shadow.radius = 4;
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight('#dbe8ff', 0.45); fill.position.set(-4, 3, -2); this.scene.add(fill);

    if (mode === 'room') this.buildRoom(); else this.buildCity();
    this.marker = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.markerMat);
    this.marker.rotation.x = -Math.PI / 2; this.marker.visible = false; this.marker.renderOrder = 2;
    this.scene.add(this.marker);

    window.addEventListener('pointermove', this.move);
    window.addEventListener('pointerup', this.up);
    this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(host);
    this.resize();
    this.loop();
  }

  // ---------- оточення ----------
  private buildRoom() {
    const plan = this.opts.plan;
    this.shell(this.scene, this.c.size, 0, 0, this.wallMat, this.floorMat, plan?.doors ?? [], plan?.shared ?? [], [], plan ? plan.entrance : true, this.walls, 0.1);
    // сусідні кімнати поверху: їх видно крізь двері, герой може туди зайти
    if (plan) {
      this.nav = [{ id: plan.me, size: this.c.size, at: { x: 0, z: 0 } }, ...plan.rooms.map((n) => ({ id: n.id, size: n.size, at: { x: n.x, z: n.z } }))];
      plan.rooms.forEach((n, i) => {
        const wm = new THREE.MeshStandardMaterial({ color: n.wall, roughness: 0.95 });
        const fm = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85, map: groundTexture(n.floor.hex, n.floor.kind, n.size / 2) });
        const list: { mesh: THREE.Group; side: number }[] = [];
        this.shell(this.scene, n.size, n.x, n.z, wm, fm, n.doors, n.shared, n.skip, false, list, Math.max(0.06, 0.092 - i * 0.004));
        list.forEach((w) => this.nWalls.push({ ...w, cx: n.x, cz: n.z, h: n.size / 2 }));
        this.neighborItems(n);
      });
      // нижній поверх під ногами, коли ми нагорі
      const down = new THREE.Group(); down.position.y = -(this.c.wallH + 0.16); this.scene.add(down);
      (plan.below ?? []).forEach((n, i) => {
        const wm = new THREE.MeshStandardMaterial({ color: n.wall, roughness: 0.95 });
        const fm = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85, map: groundTexture(n.floor.hex, n.floor.kind, n.size / 2) });
        this.shell(down, n.size, n.x, n.z, wm, fm, n.doors, n.shared, n.skip, i === 0, [], Math.max(0.06, 0.092 - i * 0.004));
        this.neighborItems(n, down);
      });
    }
  }
  // підлога, плінтус і стіни кімнати з дверними прорізами
  private shell(parent: THREE.Object3D, S: number, cx: number, cz: number, wallMat: THREE.Material, floorMat: THREE.Material, doors: Door[], shared: number[], skip: number[], entrance: boolean, store: { mesh: THREE.Group; side: number }[], T: number) {
    const H = this.c.wallH, half = S / 2;
    const floor = new THREE.Mesh(new THREE.BoxGeometry(S, 0.08, S), floorMat);
    floor.position.set(cx, -0.04, cz); floor.receiveShadow = true; parent.add(floor);
    const base = new THREE.Mesh(new THREE.BoxGeometry(S + 0.3, 0.2, S + 0.3), new THREE.MeshStandardMaterial({ color: '#E9DCC1', roughness: 1 }));
    base.position.set(cx, -0.181, cz); base.receiveShadow = true; parent.add(base);
    const trim = new THREE.MeshStandardMaterial({ color: '#FBF8F1', roughness: 0.8 });
    const wood = new THREE.MeshStandardMaterial({ color: '#C99A6B', roughness: 0.7 });
    const DH = 1.05; // висота прорізу
    for (let side = 0; side < 4; side++) {
      if (skip.includes(side)) continue;
      const g = new THREE.Group();
      const L = S + 0.1;
      // прорізи в локальних координатах стіни
      const holes = doors.filter((d) => d.side === side).map((d) => (side === 0 || side === 3 ? d.at : -d.at)).sort((p, q) => p - q);
      let from = -L / 2;
      const seg = (x0: number, x1: number) => {
        if (x1 - x0 < 0.01) return;
        const w = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, H, T), wallMat);
        w.position.set((x0 + x1) / 2, H / 2, 0); w.castShadow = true; w.receiveShadow = true; w.userData.base = true; g.add(w);
        const sk = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.01, x1 - x0 - 0.02), 0.07, 0.03), trim); sk.position.set((x0 + x1) / 2, 0.035, 0.065); sk.userData.base = true; g.add(sk);
      };
      for (const u of holes) {
        seg(from, u - DOOR_W / 2);
        const top = new THREE.Mesh(new THREE.BoxGeometry(DOOR_W, H - DH, T), wallMat);
        top.position.set(u, DH + (H - DH) / 2, 0); top.castShadow = true; g.add(top);
        // наличник і поріг
        ([[u, DH + 0.025, DOOR_W + 0.1, 0.05], [u - DOOR_W / 2 - 0.025, DH / 2, 0.05, DH], [u + DOOR_W / 2 + 0.025, DH / 2, 0.05, DH]] as [number, number, number, number][])
          .forEach(([fx, fy, w, h]) => { for (const zz of [0.065, -0.065]) { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.03), trim); b.position.set(fx, fy, zz); g.add(b); } });
        const sill = new THREE.Mesh(new THREE.BoxGeometry(DOOR_W, 0.02, 0.2 + GAP), wood); sill.position.set(u, 0.0, 0); sill.receiveShadow = true; sill.userData.base = true; sill.userData.keep = true; g.add(sill);
        from = u + DOOR_W / 2;
      }
      seg(from, L / 2);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(S + 0.12 - (0.1 - T), 0.03, T + 0.04), trim); cap.position.y = H + 0.015 - (0.1 - T) * 0.2; g.add(cap);
      const clear = (x: number) => holes.every((u) => Math.abs(u - x) > DOOR_W / 2 + 0.6);
      if (!shared.includes(side)) {
        if (side === 0 && clear(0.55 * S / 2.8)) this.addWindow(g, 0.55 * S / 2.8, trim);
        if (side === 1 && clear(-0.45 * S / 2.8)) this.addWindow(g, -0.45 * S / 2.8, trim);
        if (side === 3 && entrance && clear(0.7)) this.addDoor(g, trim);
      }
      g.rotation.y = [0, Math.PI / 2, Math.PI, -Math.PI / 2][side];
      const d = half + 0.05;
      g.position.set(cx + [0, -d, 0, d][side], 0, cz + [-d, 0, d, 0][side]);
      parent.add(g); store.push({ mesh: g, side });
    }
  }
  // речі в сусідніх кімнатах: лише показуємо (змінювати можна, коли зайдеш у ту кімнату)
  private async neighborItems(n: PlanNeighbor, parent: THREE.Object3D = this.scene) {
    const tpls = new Map<string, Template>();
    for (const p of n.placed) { const def = getItem('room', p.file); if (!def || tpls.has(p.file)) continue; try { tpls.set(p.file, await template(def)); } catch { /* немає моделі */ } }
    if (this.disposed) return;
    const h = n.size / 2;
    for (const p of n.placed) {
      const def = getItem('room', p.file); const tpl = tpls.get(p.file); if (!def || !tpl) continue;
      const model = tpl.obj.clone(true);
      if (p.color && paintTarget(def, model)) { const re = paintTarget(def, model)!; model.traverse((o) => { const m = o as THREE.Mesh; if (!m.isMesh) return; m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone(); (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { if (re.test(mt.name)) (mt as THREE.MeshStandardMaterial).color.set(p.color!); }); }); }
      const root = new THREE.Group(); root.add(model);
      if (def.wall) {
        const side = p.wall ?? 0;
        root.rotation.y = [0, Math.PI / 2, Math.PI, -Math.PI / 2][side];
        root.position.set(n.x + [p.x, -h, -p.x, h][side], p.y ?? 0.8, n.z + [-h, p.x, h, -p.x][side]);
        const wl = parent === this.scene ? this.nWalls.find((w) => w.cx === n.x && w.cz === n.z && w.side === side) : undefined; if (wl) wl.mesh.userData.items = [...(wl.mesh.userData.items ?? []), root];
      } else {
        let y = 0;
        if (def.small) for (const q of n.placed) { const qd = getItem('room', q.file); const qt = tpls.get(q.file); if (!qd?.surface || !qt || q.uid === p.uid) continue; const odd = q.rot % 2 === 1; const w = odd ? qt.size.z : qt.size.x, dd = odd ? qt.size.x : qt.size.z; if (Math.abs(p.x - q.x) <= w / 2 && Math.abs(p.z - q.z) <= dd / 2) y = Math.max(y, qt.size.y); }
        root.rotation.y = (p.rot % 4) * Math.PI / 2;
        root.position.set(n.x + p.x, y, n.z + p.z);
      }
      parent.add(root);
    }
  }
  private addWindow(g: THREE.Group, x: number, trim: THREE.Material) {
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.62), new THREE.MeshBasicMaterial({ map: skyTexture(this.opts.sky ?? 'clouds') }));
    glass.position.set(x, 0.72, 0.056); g.add(glass);
    const bars: [number, number, number, number][] = [[0, 0.405, 1.0, 0.05], [0, -0.335, 1.0, 0.07], [-0.475, 0.035, 0.05, 0.74], [0.475, 0.035, 0.05, 0.74], [0, 0.035, 0.035, 0.66], [0, 0.035, 0.9, 0.03]];
    bars.forEach(([bx, by, w, h]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.05), trim); b.position.set(x + bx, 0.72 + by, 0.07); b.castShadow = true; g.add(b); });
  }
  private addDoor(g: THREE.Group, trim: THREE.Material) {
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.0, 0.03), new THREE.MeshStandardMaterial({ color: '#B98457', roughness: 0.7 }));
    door.position.set(0.7, 0.5, 0.065); g.add(door);
    ([[0.7, 1.03, 0.65, 0.06], [0.4, 0.5, 0.05, 1.06], [1.0, 0.5, 0.05, 1.06]] as [number, number, number, number][]).forEach(([fx, fy, w, h]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.06), trim); b.position.set(fx, fy, 0.07); g.add(b); });
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 12), new THREE.MeshStandardMaterial({ color: '#E8C35A', metalness: 0.6, roughness: 0.3 }));
    knob.position.set(0.5, 0.5, 0.09); g.add(knob);
  }
  private buildCity() {
    const S = this.c.size;
    const ground = new THREE.Mesh(new THREE.BoxGeometry(S, 0.1, S), this.floorMat);
    ground.position.y = -0.05; ground.receiveShadow = true; this.scene.add(ground);
    // зелена земля довкола, щоб ділянка не «висіла» в повітрі
    const around = new THREE.Mesh(new THREE.CircleGeometry(S * 3.2, 48), new THREE.MeshStandardMaterial({ color: '#7DBB5A', roughness: 1 }));
    around.rotation.x = -Math.PI / 2; around.position.y = -0.62; around.receiveShadow = true; this.scene.add(around);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(S + 0.8, 0.6, S + 0.8), new THREE.MeshStandardMaterial({ color: '#B98A5E', roughness: 1 }));
    edge.position.y = -0.4; edge.receiveShadow = true; this.scene.add(edge);
    this.setGround('#8FC46A');
  }
  // будинок посеред двору: стоїть на місці, натискання веде всередину
  async setHouse(def: WorldItem | undefined) {
    const old = this.items.get('__house'); if (old) { this.scene.remove(old.root); old.label.remove(); this.items.delete('__house'); }
    if (!def) return;
    let tpl: Template; try { tpl = await template({ ...def, scale: (def.scale ?? 1) * 2.1 }); } catch { return; }
    const model = tpl.obj.clone(true);
    const root = new THREE.Group(); root.add(model); root.userData.uid = '__house'; this.scene.add(root);
    const label = document.createElement('div'); label.className = 'hm-label hm-label--door'; label.textContent = 'Go inside'; this.labels.appendChild(label);
    const z = -this.half + tpl.size.z / 2 + 0.3;
    const it: Inst = { root, model, p: { uid: '__house', file: def.file, x: 0, z: +z.toFixed(2), rot: 0 }, def: { ...def, building: true }, size: tpl.size, label, born: performance.now() };
    this.items.set('__house', it); this.place(it);
  }
  setWall(hex: string) { this.wallMat.color.set(hex); }
  setFloor(hex: string, kind: 'wood' | 'tiles' | 'carpet') { this.floorMat.map?.dispose(); this.floorMat.map = groundTexture(hex, kind, this.c.size / 2); this.floorMat.color.set('#ffffff'); this.floorMat.needsUpdate = true; }
  setGround(hex: string) { this.floorMat.map?.dispose(); this.floorMat.map = groundTexture(hex, 'grass', this.c.size / 2); this.floorMat.color.set('#ffffff'); this.floorMat.needsUpdate = true; }

  // ---------- предмети ----------
  private def(file: string) { return getItem(this.mode, file); }
  async sync(list: Placed[]) {
    const keep = new Set(list.map((p) => p.uid));
    for (const [uid, it] of this.items) if (!keep.has(uid) && !uid.startsWith('__')) { this.scene.remove(it.root); it.label.remove(); this.items.delete(uid); }
    for (const p of list) {
      const def = this.def(p.file); if (!def) continue;
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
  private footprint(it: { size: THREE.Vector3; p: Placed }) {
    const odd = it.p.rot % 2 === 1;
    return { w: odd ? it.size.z : it.size.x, d: odd ? it.size.x : it.size.z };
  }
  private place(it: Inst) {
    const { p, def, root } = it;
    if (def.wall) {
      const side = p.wall ?? 0, d = this.half;
      root.rotation.y = [0, Math.PI / 2, Math.PI, -Math.PI / 2][side];
      root.position.set([p.x, -d, -p.x, d][side], p.y ?? 0.8, [-d, p.x, d, -p.x][side]);
    } else {
      root.rotation.y = (p.rot % 4) * Math.PI / 2;
      root.position.set(p.x, p.y ?? this.supportY(p.uid, p.x, p.z, def), p.z);
    }
  }
  private paint(it: Inst, color?: string) {
    const re = paintTarget(it.def, it.model); if (!re) return;
    it.model.traverse((o) => {
      const m = o as THREE.Mesh; if (!m.isMesh) return;
      (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => {
        const s = mt as THREE.MeshStandardMaterial;
        if (s.userData.orig === undefined) s.userData.orig = s.color.getHex();
        if (re.test(s.name)) s.color.set(color ?? s.userData.orig);
      });
    });
  }
  private supportY(uid: string, x: number, z: number, def: WorldItem) {
    if (!def.small) return 0;
    let y = 0;
    for (const [id, o] of this.items) {
      if (id === uid || !o.def.surface) continue;
      const f = this.footprint(o);
      if (Math.abs(x - o.p.x) <= f.w / 2 && Math.abs(z - o.p.z) <= f.d / 2) y = Math.max(y, o.size.y);
    }
    return y;
  }
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
  gap(a: string, b: string) {
    const A = this.items.get(a), B = this.items.get(b); if (!A || !B) return Infinity;
    const fa = this.footprint(A), fb = this.footprint(B);
    return Math.max(Math.abs(A.p.x - B.p.x) - (fa.w + fb.w) / 2, Math.abs(A.p.z - B.p.z) - (fa.d + fb.d) / 2);
  }
  canPlace(uid: string, p: Placed, sizeOverride?: THREE.Vector3) {
    const def = this.def(p.file); const it = this.items.get(uid);
    const size = sizeOverride ?? it?.size; if (!def || !size) return false;
    const half = this.half;
    if (def.wall) return Math.abs(p.x) <= half - 0.2 && (p.y ?? 0.8) >= 0.25 && (p.y ?? 0.8) <= this.c.wallH - 0.2;
    const f = this.footprint({ size, p });
    if (p.x - f.w / 2 < -half - 0.001 || p.x + f.w / 2 > half + 0.001 || p.z - f.d / 2 < -half - 0.001 || p.z + f.d / 2 > half + 0.001) return false;
    for (const [id, o] of this.items) {
      if (id === uid || o.def.wall) continue;
      const g = this.footprint(o);
      const hit = Math.abs(p.x - o.p.x) < (f.w + g.w) / 2 - 0.01 && Math.abs(p.z - o.p.z) < (f.d + g.d) / 2 - 0.01;
      if (!hit) continue;
      if (def.rug || o.def.rug) {
        if (def.rug && o.def.rug) return false;
        if ((def.building && o.def.rug) || (o.def.building && def.rug)) return false; // будинок не ставимо на дорогу
        continue;
      }
      if (def.small && o.def.surface && Math.abs(p.x - o.p.x) <= g.w / 2 && Math.abs(p.z - o.p.z) <= g.d / 2) continue;
      if (o.def.small && def.surface) continue;
      return false;
    }
    return true;
  }
  private snap(def: WorldItem, v: number, len: number) {
    const g = def.grid ?? this.c.snap;
    if (g >= 1) return Math.round((v - len / 2) / g) * g + len / 2; // плитки міста: край по сітці
    return +(Math.round(v / g) * g).toFixed(2);
  }
  // місце для нового предмета: біля точки (x, z) або найближче до центру
  async findSpot(file: string, near?: { x: number; z: number; wall?: number; y?: number }): Promise<Placed | null> {
    const def = this.def(file); if (!def) return null;
    let tpl: Template; try { tpl = await template(def); } catch { return null; }
    const uid = '__probe';
    if (def.wall) {
      if (near?.wall !== undefined) { const p = { uid, file, x: +near.x.toFixed(2), z: 0, rot: 0, wall: near.wall, y: +(near.y ?? 0.85).toFixed(2) }; return this.canPlace(uid, p, tpl.size) ? p : null; }
      const used = [...this.items.values()].filter((o) => o.def.wall);
      for (const side of [0, 1]) for (let a = 0; a <= this.half - 0.3; a += 0.25) for (const s of [1, -1]) {
        const p = { uid, file, x: a * s, z: 0, rot: 0, wall: side, y: 0.85 };
        if (!used.some((q) => q.p.wall === side && Math.abs(q.p.x - p.x) < 0.45 && Math.abs((q.p.y ?? 0.85) - 0.85) < 0.4)) return p;
      }
      return null;
    }
    const tryAt = (x: number, z: number, rot: number) => {
      const f = rot % 2 ? { w: tpl.size.z, d: tpl.size.x } : { w: tpl.size.x, d: tpl.size.z };
      const p = { uid, file, x: this.snap(def, x, f.w), z: this.snap(def, z, f.d), rot };
      return this.canPlace(uid, p, tpl.size) ? p : null;
    };
    if (near) return tryAt(near.x, near.z, 0) ?? tryAt(near.x, near.z, 1);
    if (def.small) {
      for (const o of this.items.values()) {
        if (!o.def.surface) continue;
        const busy = [...this.items.values()].some((q) => q.def.small && Math.abs(q.p.x - o.p.x) < 0.2 && Math.abs(q.p.z - o.p.z) < 0.2);
        const p = { uid, file, x: o.p.x, z: o.p.z, rot: o.p.rot };
        if (!busy && this.canPlace(uid, p, tpl.size)) return p;
      }
    }
    const step = Math.max(def.grid ?? this.c.snap, this.mode === 'city' ? 0.5 : 0.1);
    const spots: [number, number][] = [];
    for (let x = -this.half; x <= this.half; x += step) for (let z = -this.half; z <= this.half; z += step) spots.push([x, z]);
    spots.sort((a, b) => Math.hypot(a[0], a[1]) - Math.hypot(b[0], b[1]));
    for (const rot of [0, 1]) for (const [x, z] of spots) { const p = tryAt(x, z, rot); if (p) return p; }
    return null;
  }
  // точка на підлозі (або стіні) під пальцем: для перетягування з каталогу
  pointAt(clientX: number, clientY: number, wall = false): { x: number; z: number; wall?: number; y?: number } | null {
    const r = this.renderer.domElement.getBoundingClientRect();
    if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom) return null;
    const e = { clientX, clientY } as PointerEvent;
    if (wall) { const w = this.wallPoint(e); return w ? { x: w.along, z: 0, wall: w.side, y: w.y } : null; }
    const p = this.floorPoint(e); if (!p || Math.abs(p.x) > this.half || Math.abs(p.z) > this.half) return null;
    return { x: p.x, z: p.z };
  }

  select(uid: string | null) { this.sel = uid; this.updateMarker(); }
  bounce(uid: string) { this.hop = { uid, t0: performance.now() }; }
  private updateMarker() {
    const it = this.sel ? this.items.get(this.sel) : null;
    if (!it || it.def.wall) { this.marker.visible = false; return; }
    const f = this.footprint(it);
    this.marker.visible = true;
    this.marker.scale.set(f.w + 0.06, f.d + 0.06, 1);
    this.marker.position.set(it.root.position.x, it.root.position.y + (it.def.rug ? 0.12 : 0.012), it.root.position.z);
    this.markerMat.color.set(this.drag && !this.drag.ok ? '#E5533D' : '#D0F834');
  }

  // ---------- герой ----------
  async setHero(file: string | null) {
    const token = ++this.heroToken;
    if (this.hero) { this.scene.remove(this.hero.obj); this.hero = null; }
    if (!file) return;
    try {
      extraAnims = extraAnims ?? Promise.all(['/worlds/heroes/anim-ual1.glb', '/worlds/heroes/anim-ual2.glb'].map((u) => loader.loadAsync(u).then((g) => ({ scene: g.scene, clips: g.animations })))).catch(() => []);
      const [char, a1, a2, extra, sim] = await Promise.all([
        loader.loadAsync(`/worlds/heroes/${file}.glb`), loader.loadAsync('/worlds/heroes/anim-move.glb'), loader.loadAsync('/worlds/heroes/anim-general.glb'), extraAnims,
        Promise.all(['/worlds/heroes/anim-sim.glb', '/worlds/heroes/anim-tools.glb'].map((u) => loader.loadAsync(u).then((g) => g.animations).catch(() => [] as THREE.AnimationClip[]))),
      ]);
      if (token !== this.heroToken) return;
      const obj = char.scene;
      if (!heroClips.has(file)) { try { heroClips.set(file, extra.flatMap((x) => retargetClips(x.scene, x.clips, obj))); } catch { heroClips.set(file, []); } }
      obj.scale.setScalar(this.c.hero);
      obj.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) { m.castShadow = true; m.frustumCulled = false; } });
      const mixer = new THREE.AnimationMixer(obj);
      const acts: Record<string, THREE.AnimationAction> = {};
      [...a1.animations, ...a2.animations, ...(heroClips.get(file) ?? []), ...sim.flat()].forEach((clip) => { acts[clip.name] = mixer.clipAction(clip); });
      // де стегна героя в кожній позі (у координатах героя без масштабу): так точно садимо на диван і кладемо на ліжко
      const hipsAt: Record<string, THREE.Vector3> = {};
      const hips = obj.getObjectByName('hips');
      if (hips) {
        for (const n of [POSE.sit, POSE.lie, 'Sitting_Idle_Loop', 'LayToIdle']) {
          const a = acts[n]; if (!a) continue;
          const m2 = new THREE.AnimationMixer(obj); const t = m2.clipAction(a.getClip()); t.play(); m2.setTime(n === 'LayToIdle' ? 0 : 0.3);
          obj.updateMatrixWorld(true); hipsAt[n] = obj.worldToLocal(hips.getWorldPosition(new THREE.Vector3()));
          m2.stopAllAction(); m2.uncacheRoot(obj);
        }
      }
      ['Interact', 'Yes', 'Waving', 'Consume', 'Farm_Watering', 'Sitting_Enter', 'Sitting_Exit', 'PickUp_Table'].forEach((n) => { if (acts[n]) { acts[n].setLoop(THREE.LoopOnce, 1); acts[n].clampWhenFinished = true; } });
      if (acts.LayToIdle) { acts.LayToIdle.setLoop(THREE.LoopOnce, 1); acts.LayToIdle.clampWhenFinished = true; }
      obj.position.set(this.mode === 'room' ? 0.6 : 1, 0, this.mode === 'room' ? 0.6 : 1);
      obj.rotation.y = Math.PI / 4;
      const st = this.opts.heroAt;
      if (st) { obj.position.set(st.x, 0, st.z); obj.rotation.y = st.rot; }
      obj.userData.hero = true;
      this.scene.add(obj);
      this.hero = { obj, mixer, acts, cur: '', target: null, pose: 'stand', then: null, seat: null, hipsAt };
      this.play('Idle_A');
      if (st?.goal) { this.walkTo(st.goal.x, st.goal.z); }
      this.opts.heroAt = undefined;
      mixer.addEventListener('finished', (e) => {
        const h = this.hero; if (!h) return;
        const name = (e.action as THREE.AnimationAction).getClip().name;
                if (h.pose === 'sit' || h.pose === 'lie') return;
        this.play('Idle_A');
      });
    } catch { /* без героя */ }
  }
  private play(name: string, fade = 0.2) {
    const h = this.hero; if (!h || h.cur === name || !h.acts[name]) return;
    const next = h.acts[name]; next.reset().fadeIn(fade).play();
    if (h.cur && h.acts[h.cur]) h.acts[h.cur].fadeOut(fade);
    h.cur = name;
  }
  /** чи вміє герой робити додаткові рухи (сісти, лягти, танцювати) */
  get heroCan() { return !!(this.hero?.acts[POSE.sit] || this.hero?.acts.Sitting_Idle_Loop); }
  /** дія героя: сісти чи лягти на предмет, полити рослину, з'їсти, потанцювати */
  heroAct(kind: HeroAct, uid?: string) {
    const h = this.hero; if (!h) return false;
    if (kind === 'stand') { this.standUp(); return true; }
    if (kind === 'dance' || kind === 'wave' || kind === 'phone') {
      this.standUp(true);
      h.target = null;
      this.play(kind === 'dance' ? 'Dance_Loop' : kind === 'wave' ? (h.acts.Waving ? 'Waving' : 'Yes') : 'Idle_TalkingPhone_Loop');
      return true;
    }
    const it = uid ? this.items.get(uid) : null; if (!it) return false;
    const front = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), it.root.rotation.y);
    const f = this.footprint(it);
    const reach = (Math.max(f.w, f.d) / 2) + 0.12;
    this.standUp(true);
    if (kind === 'sit' || kind === 'sleep') {
      const stand = it.root.position.clone().addScaledVector(front, (kind === 'sit' ? it.size.z / 2 : it.size.x / 2) + 0.12);
      if (kind === 'sleep') stand.copy(it.root.position).add(new THREE.Vector3(-front.z, 0, front.x).multiplyScalar(it.size.x / 2 + 0.12));
      h.then = () => this.settle(kind, it, front);
      this.walkTo(stand.x, stand.z);
      return true;
    }
    if (kind === 'go') {
      const at = it.root.position.clone().addScaledVector(front, it.size.z / 2 + 0.15);
      h.then = () => { h.obj.rotation.y = Math.atan2(-front.x, -front.z); this.ev.onArrive?.(it.p.uid); };
      this.walkTo(at.x, at.z);
      return true;
    }
    // полити чи з'їсти: підійти ближче і зробити рух
    const dir = h.obj.position.clone().sub(it.root.position); dir.y = 0; if (dir.lengthSq() < 1e-4) dir.set(1, 0, 0);
    const at = it.root.position.clone().addScaledVector(dir.normalize(), reach);
    h.then = () => { const d = it.root.position.clone().sub(h.obj.position); h.obj.rotation.y = Math.atan2(d.x, d.z); this.play(kind === 'water' ? 'Farm_Watering' : 'Consume'); };
    this.walkTo(at.x, at.z);
    return true;
  }
  // висота верхньої поверхні предмета в точці (x, z): промінь згори вниз
  private surfaceAt(it: Inst, x: number, z: number) {
    const r = new THREE.Raycaster(new THREE.Vector3(x, it.root.position.y + it.size.y + 1, z), new THREE.Vector3(0, -1, 0));
    const hit = r.intersectObject(it.model, true)[0];
    return hit ? hit.point.y : it.root.position.y + it.size.y * 0.5;
  }
  private settle(kind: 'sit' | 'sleep', it: Inst, front: THREE.Vector3) {
    const h = this.hero; if (!h) return;
    const k = this.c.hero;
    const name = kind === 'sit' ? (h.acts[POSE.sit] ? POSE.sit : 'Sitting_Idle_Loop') : (h.acts[POSE.lie] ? POSE.lie : 'LayToIdle');
    const at = h.hipsAt[name]; if (!at) return;
    const depth = Math.abs(front.x) > 0.5 ? it.size.x : it.size.z; // глибина вздовж «вперед» предмета
    // сидимо ближче до переду (не на спинці), лежимо посередині матраца
    const spot = it.root.position.clone().addScaledVector(front, kind === 'sit' ? depth * 0.08 : depth * 0.05);
    const top = this.surfaceAt(it, spot.x, spot.z);
    const yaw = Math.atan2(front.x, front.z);
    h.obj.rotation.y = yaw;
    const off = at.clone().multiplyScalar(k).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const lift = (kind === 'sit' ? 0.1 : 0.2) * k; // від стегон до поверхні
    h.obj.position.set(spot.x - off.x, top + lift - off.y, spot.z - off.z);
    h.pose = kind === 'sit' ? 'sit' : 'lie'; h.seat = it.p.uid;
    if (name === 'LayToIdle') {
      const a = h.acts.LayToIdle;
      if (h.cur && h.acts[h.cur]) h.acts[h.cur].fadeOut(0.25);
      a.reset(); a.paused = true; a.time = 0; a.fadeIn(0.25).play(); h.cur = 'LayToIdle';
    } else this.play(name, 0.3);
  }
  private standUp(quick = false) {
    const h = this.hero; if (!h || h.pose === 'stand') return;
    const was = h.pose; h.pose = 'stand'; h.seat = null;
    const it = [...this.items.values()].find((x) => x.root.position.distanceTo(h.obj.position) < 2 && x.p.uid);
    const front = new THREE.Vector3(Math.sin(h.obj.rotation.y), 0, Math.cos(h.obj.rotation.y));
    h.obj.position.y = 0;
    h.obj.position.addScaledVector(front, (it ? 0.2 : 0.1) * (this.mode === 'room' ? 1 : 1.5));
    if (!quick && was === 'lie' && h.cur === 'LayToIdle') { h.acts.LayToIdle.paused = false; return; }
    this.play('Idle_A');
  }
  private walkTo(x: number, z: number) {
    if (!this.hero) return;
    if (this.hero.pose !== 'stand') this.standUp(true);
    const m = 0.15;
    this.path = [];
    // точка в сусідній кімнаті: іти через двері
    const goal = this.nav.slice(1).find((r) => Math.abs(x - r.at!.x) < r.size / 2 - 0.05 && Math.abs(z - r.at!.z) < r.size / 2 - 0.05);
    const ids = goal ? roomPath(this.nav, this.nav[0].id, goal.id) : null;
    if (goal && ids && ids.length > 1) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < ids.length - 1; i++) {
        const A = this.nav.find((r) => r.id === ids[i])!, d = doorsOf(A.id, this.nav).find((q) => q.to === ids[i + 1]); if (!d) break;
        const ha = A.size / 2 + GAP / 2, ax = A.at!.x, az = A.at!.z;
        const door = d.side === 0 ? [ax + d.at, az - ha] : d.side === 1 ? [ax - ha, az + d.at] : d.side === 2 ? [ax + d.at, az + ha] : [ax + ha, az + d.at];
        const nrm = [[0, -1], [-1, 0], [0, 1], [1, 0]][d.side];
        pts.push(new THREE.Vector3(door[0] - nrm[0] * 0.25, 0, door[1] - nrm[1] * 0.25), new THREE.Vector3(door[0] + nrm[0] * 0.3, 0, door[1] + nrm[1] * 0.3));
      }
      const gh = goal.size / 2 - m;
      pts.push(new THREE.Vector3(Math.max(goal.at!.x - gh, Math.min(goal.at!.x + gh, x)), 0, Math.max(goal.at!.z - gh, Math.min(goal.at!.z + gh, z))));
      this.hero.target = pts.shift()!; this.path = pts;
      return;
    }
    this.hero.target = new THREE.Vector3(Math.max(-this.half + m, Math.min(this.half - m, x)), 0, Math.max(-this.half + m, Math.min(this.half - m, z)));
  }
  // герой перейшов у сусідню кімнату: гра відкриває ту кімнату, герой і камера на тих самих місцях
  private checkRoom() {
    const h = this.hero; if (!h || this.switched || this.nav.length < 2) return;
    const p = h.obj.position;
    const r = this.nav.slice(1).find((q) => Math.abs(p.x - q.at!.x) < q.size / 2 - 0.08 && Math.abs(p.z - q.at!.z) < q.size / 2 - 0.08);
    if (!r) return;
    this.switched = true;
    const ox = r.at!.x, oz = r.at!.z;
    const last = this.path[this.path.length - 1] ?? h.target;
    const t = this.controls.target, c = this.camera.position;
    this.ev.onRoom?.(r.id, { x: +(p.x - ox).toFixed(2), z: +(p.z - oz).toFixed(2), rot: h.obj.rotation.y, goal: last ? { x: last.x - ox, z: last.z - oz } : undefined },
      { cam: [c.x - ox, c.y, c.z - oz], target: [t.x - ox, t.y, t.z - oz] });
  }
  private hitHero(e: PointerEvent) {
    if (!this.hero) return false;
    this.ray.setFromCamera(this.ndc(e), this.camera);
    return this.ray.intersectObject(this.hero.obj, true).length > 0;
  }

  // ---------- миша і пальці ----------
  private ndc(e: { clientX: number; clientY: number }) {
    const r = this.renderer.domElement.getBoundingClientRect();
    return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }
  private pick(e: PointerEvent) {
    this.ray.setFromCamera(this.ndc(e), this.camera);
    const roots = [...this.items.values()].filter((i) => i.root.visible).map((i) => i.root);
    const hits = this.ray.intersectObjects(roots, true);
    // спершу не килими й не дороги: їх легко зачепити випадково
    const sorted = [...hits].sort((a, b) => Number(this.isFlat(a.object)) - Number(this.isFlat(b.object)));
    for (const h of sorted) { let o: THREE.Object3D | null = h.object; while (o && !o.userData.uid) o = o.parent; if (o) return { uid: o.userData.uid as string, point: h.point }; }
    return null;
  }
  private isFlat(o: THREE.Object3D) { let x: THREE.Object3D | null = o; while (x && !x.userData.uid) x = x.parent; return !!(x && this.items.get(x.userData.uid)?.def.rug); }
  private floorPoint(e: { clientX: number; clientY: number }, y = 0) {
    this.ray.setFromCamera(this.ndc(e), this.camera);
    const p = new THREE.Vector3();
    return this.ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -y), p) ? p : null;
  }
  private wallPoint(e: { clientX: number; clientY: number }) {
    this.ray.setFromCamera(this.ndc(e), this.camera);
    let best: { side: number; along: number; y: number; d: number } | null = null;
    for (const w of this.walls.filter((x) => x.mesh.scale.y > 0.5)) {
      const n = [new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, -1), new THREE.Vector3(-1, 0, 0)][w.side];
      const p = new THREE.Vector3();
      if (!this.ray.ray.intersectPlane(new THREE.Plane(n, this.half), p)) continue;
      const along = [p.x, p.z, -p.x, -p.z][w.side];
      const d = this.ray.ray.origin.distanceTo(p);
      if (Math.abs(along) <= this.half && p.y >= 0 && p.y <= this.c.wallH && (!best || d < best.d)) best = { side: w.side, along, y: p.y, d };
    }
    return best;
  }
  private down = (e: PointerEvent) => {
    if (e.button !== undefined && e.button > 0) return;
    if (this.hitHero(e)) { e.stopImmediatePropagation(); this.play('Interact'); this.ev.onHero?.(); return; }
    const hit = this.pick(e);
    if (hit && this.hero && hit.uid === this.hero.seat) this.standUp(true);
    if (hit?.uid === '__house') { e.stopImmediatePropagation(); this.ev.onHouse?.(); return; }
    if (!hit) { this.drag = null; this.downAt = { x: e.clientX, y: e.clientY }; return; }
    // натиснули на предмет: камера не крутиться, тягнемо предмет
    e.stopImmediatePropagation(); e.preventDefault();
    const it = this.items.get(hit.uid)!;
    const fp = it.def.wall ? new THREE.Vector3() : this.floorPoint(e, 0) ?? new THREE.Vector3();
    this.drag = { uid: hit.uid, off: new THREE.Vector3(fp.x - it.p.x, 0, fp.z - it.p.z), start: { x: e.clientX, y: e.clientY }, moved: false, ok: true, patch: {} };
    this.sel = hit.uid; this.ev.onSelect(hit.uid); this.updateMarker();
  };
  private move = (e: PointerEvent) => {
    if (!this.drag) { this.hover(e); return; }
    const d = this.drag; const it = this.items.get(d.uid); if (!it) return;
    if (!d.moved && Math.hypot(e.clientX - d.start.x, e.clientY - d.start.y) < 4) return;
    d.moved = true;
    if (it.def.wall) {
      const w = this.wallPoint(e); if (!w) return;
      const patch = { wall: w.side, x: +(Math.round(w.along / 0.05) * 0.05).toFixed(2), y: +(Math.round(w.y / 0.05) * 0.05).toFixed(2) };
      const p = { ...it.p, ...patch };
      d.ok = this.canPlace(d.uid, p); d.patch = patch;
      this.place({ ...it, p } as Inst);
    } else {
      const fp = this.floorPoint(e, 0); if (!fp) return;
      const f = this.footprint(it);
      const p = { ...it.p, x: this.snap(it.def, fp.x - d.off.x, f.w), z: this.snap(it.def, fp.z - d.off.z, f.d), y: undefined };
      d.ok = this.canPlace(d.uid, p); d.patch = { x: p.x, z: p.z };
      const dx = p.x - it.p.x, dz = p.z - it.p.z;
      it.root.position.set(p.x, this.supportY(d.uid, p.x, p.z, it.def) + (it.def.rug ? 0.02 : 0.04), p.z);
      if (!d.kids) d.kids = this.carried(d.uid);
      d.kids.forEach((k) => { const o = this.items.get(k); if (o) o.root.position.set(o.p.x + dx, it.size.y + 0.04, o.p.z + dz); });
    }
    this.updateMarker();
  };
  private up = (e: PointerEvent) => {
    const d = this.drag;
    if (!d) {
      if (this.downAt && Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) < 5 && e.target === this.renderer.domElement) {
        this.sel = null; this.ev.onSelect(null); this.updateMarker();
        const p = this.floorPoint(e); if (p && this.hero) { this.hero.then = null; this.walkTo(p.x, p.z); } // герой іде туди, куди натиснули
      }
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
    this.renderer.domElement.style.cursor = this.pick(e) || this.hitHero(e) ? 'grab' : 'default';
  }
  // зсув вибраного предмета стрілками (для клавіатури і кнопок)
  nudge(uid: string, dx: number, dz: number): Partial<Placed> | null {
    const it = this.items.get(uid); if (!it || it.def.wall) return null;
    const step = it.def.grid ?? (this.mode === 'city' ? 0.25 : 0.1);
    const p = { ...it.p, x: +(it.p.x + dx * step).toFixed(2), z: +(it.p.z + dz * step).toFixed(2) };
    return this.canPlace(uid, p) ? { x: p.x, z: p.z } : null;
  }
  // напрямок «вперед/вправо» відносно камери, щоб стрілки рухали предмет так, як бачить дитина
  screenDir(key: 'up' | 'down' | 'left' | 'right') {
    const f = new THREE.Vector3(); this.camera.getWorldDirection(f); f.y = 0; f.normalize();
    const r = new THREE.Vector3(-f.z, 0, f.x);
    const v = key === 'up' ? f : key === 'down' ? f.clone().negate() : key === 'right' ? r : r.clone().negate();
    return Math.abs(v.x) > Math.abs(v.z) ? { dx: Math.sign(v.x), dz: 0 } : { dx: 0, dz: Math.sign(v.z) };
  }

  // плавно перелетіти камерою до точки (подвійне натискання, «Find me»)
  private flyTo(x: number, z: number, dist?: number) {
    const off = this.camera.position.clone().sub(this.controls.target);
    const d = Math.max(this.c.dist[0], Math.min(this.c.dist[1], dist ?? off.length() * 0.6));
    off.setLength(d);
    const t0 = performance.now(), fromT = this.controls.target.clone(), fromC = this.camera.position.clone();
    const toT = new THREE.Vector3(x, this.controls.target.y, z), toC = toT.clone().add(off);
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / 550), e = 1 - Math.pow(1 - k, 3);
      this.controls.target.lerpVectors(fromT, toT, e); this.camera.position.lerpVectors(fromC, toC, e);
      if (k < 1) requestAnimationFrame(step);
    };
    step();
  }
  private dbl = (e: MouseEvent) => {
    const hit = this.pick(e as PointerEvent);
    if (hit) { const it = this.items.get(hit.uid); if (it) this.flyTo(it.root.position.x, it.root.position.z); return; }
    const p = this.floorPoint(e); if (p) this.flyTo(p.x, p.z);
  };
  findHero() { if (this.hero) this.flyTo(this.hero.obj.position.x, this.hero.obj.position.z, this.c.dist[0] * 1.6); }
  zoom(dir: 1 | -1) {
    const off = this.camera.position.clone().sub(this.controls.target);
    const d = Math.max(this.c.dist[0], Math.min(this.c.dist[1], off.length() * (dir > 0 ? 0.75 : 1.33)));
    off.setLength(d); this.camera.position.copy(this.controls.target).add(off);
  }
  // рух камери клавішами WASD
  pan(dx: number, dz: number) {
    const f = new THREE.Vector3(); this.camera.getWorldDirection(f); f.y = 0; f.normalize();
    const r = new THREE.Vector3(-f.z, 0, f.x);
    const step = Math.max(0.3, this.camera.position.distanceTo(this.controls.target) * 0.08);
    const mv = f.multiplyScalar(-dz * step).add(r.multiplyScalar(dx * step));
    this.controls.target.add(mv); this.camera.position.add(mv);
  }
  private clouds: THREE.Group[] = [];
  private addClouds() {
    const mat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1, flatShading: true });
    // хмари ходять по колу далеко за камерою: ніколи не пролітають крізь неї
    const R = this.c.dist[1] * 1.5 + this.c.size + 6;
    const grow = R / (this.c.size * 1.6 + 6); // далі = більші, щоб виглядали так само
    for (let i = 0; i < 9; i++) {
      const g = new THREE.Group();
      const n = 3 + (i % 3);
      for (let k = 0; k < n; k++) {
        const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6 + Math.random() * 0.6, 1), mat);
        b.position.set(k * 0.9 - n * 0.45, Math.random() * 0.3, Math.random() * 0.5); b.scale.y = 0.7; g.add(b);
      }
      const a = (i / 9) * Math.PI * 2;
      const k = this.c.size / 8 + 0.6;
      g.scale.setScalar(k * Math.min(1.8, grow));
      g.position.set(Math.cos(a) * R, 3 + (i % 4) * 1.2 + this.c.size * 0.35, Math.sin(a) * R);
      g.userData.speed = 0.012 + (i % 3) * 0.006; g.userData.a = a; g.userData.r = R;
      this.scene.add(g); this.clouds.push(g);
    }
  }
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
    const dt = Math.min(0.05, this.clock.getDelta());
    this.controls.update();
    // камера не відлітає далеко від ділянки
    const B = this.bounds, pad = this.half * 0.1;
    const t = this.controls.target;
    const cx = Math.max(B.minX - pad, Math.min(B.maxX + pad, t.x)), cz = Math.max(B.minZ - pad, Math.min(B.maxZ + pad, t.z));
    if (cx !== t.x || cz !== t.z) { this.camera.position.x += cx - t.x; this.camera.position.z += cz - t.z; t.x = cx; t.z = cz; }
    for (const c of this.clouds) { c.userData.a += c.userData.speed * dt; c.position.x = Math.cos(c.userData.a) * c.userData.r; c.position.z = Math.sin(c.userData.a) * c.userData.r; c.rotation.y = -c.userData.a; }
    const cam = this.camera.position, half = this.half;
    for (const w of this.walls) {
      const hide = [cam.z < -half, cam.x < -half, cam.z > half, cam.x > half][w.side];
      w.mesh.scale.y += ((hide ? 0.06 : 1) - w.mesh.scale.y) * 0.18;
      w.mesh.children.forEach((c) => { if (!c.userData.base) c.visible = !hide; });
    }
    const tg = this.controls.target, toCam = new THREE.Vector2(cam.x - tg.x, cam.z - tg.z).normalize();
    for (const w of this.nWalls) {
      // кімната між камерою і поточною кімнатою: стіни опущені, як у Sims
      const front = (w.cx - tg.x) * toCam.x + (w.cz - tg.z) * toCam.y > w.h * 0.5;
      const hide = front || [cam.z < w.cz - w.h, cam.x < w.cx - w.h, cam.z > w.cz + w.h, cam.x > w.cx + w.h][w.side];
      w.mesh.scale.y += ((hide ? 0.06 : 1) - w.mesh.scale.y) * 0.18;
      w.mesh.children.forEach((c) => { if (!c.userData.base) c.visible = !hide; });
      ((w.mesh.userData.items ?? []) as THREE.Object3D[]).forEach((o) => { o.visible = w.mesh.scale.y > 0.5; });
    }
    // герой
    if (this.hero) {
      const h = this.hero;
      h.mixer.update(dt);
      if (h.target) {
        const dir = h.target.clone().sub(h.obj.position); dir.y = 0;
        const dist = dir.length();
        if (dist < 0.03) { if (this.path.length) h.target = this.path.shift()!; else { h.target = null; const then = h.then; h.then = null; if (then) then(); else this.play('Idle_A'); } }
        else {
          const sp = Math.min(dist, this.c.speed * dt);
          h.obj.position.addScaledVector(dir.normalize(), sp);
          const want = Math.atan2(dir.x, dir.z);
          let diff = want - h.obj.rotation.y; diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          h.obj.rotation.y += diff * Math.min(1, dt * 10);
          this.play(dist > half * 0.6 || this.path.length ? 'Running_A' : 'Walking_A');
        }
      }
      this.checkRoom();
    }
    const now = performance.now();
    const r = this.renderer.domElement.getBoundingClientRect();
    for (const it of this.items.values()) {
      if (it.def.wall && this.walls.length) { const wl = this.walls[it.p.wall ?? 0]; it.root.visible = wl.mesh.scale.y > 0.5; }
      const age = (now - it.born) / 380;
      const s = age >= 1 ? 1 : 1 + Math.sin(age * Math.PI) * 0.12 * (1 - age) - (1 - age) * 0.25;
      it.model.scale.setScalar(Math.max(0.6, s));
      let lift = 0;
      if (this.hop?.uid === it.p.uid) { const k = (now - this.hop.t0) / 360; if (k < 1) lift = Math.sin(k * Math.PI) * (this.mode === 'city' ? 0.4 : 0.12); else this.hop = null; }
      it.model.position.y = lift;
      const show = it.root.visible && (this.showLabels || this.sel === it.p.uid) && (!it.def.rug || this.sel === it.p.uid);
      it.label.style.display = show ? 'block' : 'none';
      if (show) {
        const top = it.def.wall ? it.size.y / 2 + 0.05 : it.size.y + (this.mode === 'city' ? 0.25 : 0.08);
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
    this.disposed = true;
    cancelAnimationFrame(this.raf); this.ro.disconnect();
    this.renderer.domElement.removeEventListener('pointerdown', this.down);
    this.renderer.domElement.removeEventListener('dblclick', this.dbl);
    window.removeEventListener('pointermove', this.move); window.removeEventListener('pointerup', this.up);
    this.controls.dispose(); this.renderer.dispose(); this.renderer.domElement.remove();
    this.items.forEach((it) => it.label.remove());
  }
}

// Мініатюри: рендеримо модель один раз у прихованому полотні
let thumbR: THREE.WebGLRenderer | null = null;
const thumbCache = new Map<string, Promise<string>>();
let queue: Promise<unknown> = Promise.resolve();
export function renderThumb(def: WorldItem): Promise<string> {
  const key = `${def.pack}:${def.file}`;
  if (!thumbCache.has(key)) {
    const job = queue.then(() => template({ ...def, scale: 1 }).then((tpl) => {
      thumbR = thumbR ?? new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      thumbR.setSize(180, 160); thumbR.outputColorSpace = THREE.SRGBColorSpace; thumbR.toneMapping = THREE.ACESFilmicToneMapping;
      const sc = new THREE.Scene();
      sc.add(new THREE.HemisphereLight('#ffffff', '#b9a58c', 1.6));
      const l = new THREE.DirectionalLight('#ffffff', 1.6); l.position.set(3, 5, 4); sc.add(l);
      const o = tpl.obj.clone(true); sc.add(o);
      const box = new THREE.Box3().setFromObject(o); const c = box.getCenter(new THREE.Vector3()); const s = box.getSize(new THREE.Vector3()).length();
      const cam = new THREE.PerspectiveCamera(30, 180 / 160, 0.001, 100);
      const dir = def.wall ? new THREE.Vector3(0.5, 0.3, 1) : new THREE.Vector3(1, 0.85, 1);
      cam.position.copy(c).add(dir.normalize().multiplyScalar(s * 1.9)); cam.lookAt(c);
      thumbR.render(sc, cam);
      return thumbR.domElement.toDataURL('image/png');
    }));
    queue = job.catch(() => {});
    thumbCache.set(key, job);
  }
  return thumbCache.get(key)!;
}

// Портрет героя для екрана вибору: модель у позі Idle, рендер один раз
const heroThumbs = new Map<string, Promise<string>>();
export function renderHero(file: string): Promise<string> {
  if (!heroThumbs.has(file)) {
    const job = queue.then(async () => {
      const [char, anim] = await Promise.all([loader.loadAsync(`/worlds/heroes/${file}.glb`), loader.loadAsync('/worlds/heroes/anim-general.glb')]);
      thumbR = thumbR ?? new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      thumbR.setSize(180, 160); thumbR.outputColorSpace = THREE.SRGBColorSpace; thumbR.toneMapping = THREE.ACESFilmicToneMapping;
      const sc = new THREE.Scene();
      sc.add(new THREE.HemisphereLight('#ffffff', '#b9a58c', 1.7));
      const l = new THREE.DirectionalLight('#ffffff', 1.5); l.position.set(2, 4, 5); sc.add(l);
      const obj = char.scene; sc.add(obj);
      const mixer = new THREE.AnimationMixer(obj);
      const idle = anim.animations.find((a) => a.name === 'Idle_A');
      if (idle) { mixer.clipAction(idle).play(); mixer.update(0.6); }
      obj.updateMatrixWorld(true);
      const cam = new THREE.PerspectiveCamera(28, 180 / 160, 0.01, 50);
      cam.position.set(0.9, 1.7, 4.2); cam.lookAt(0, 1.05, 0);
      thumbR.render(sc, cam);
      return thumbR.domElement.toDataURL('image/png');
    });
    queue = job.catch(() => {});
    heroThumbs.set(file, job);
  }
  return heroThumbs.get(file)!;
}

// Небо за вікном: блакитний градієнт і хмаринки (у висотках) або дерева (у приватному будинку)
const skyCache = new Map<string, THREE.Texture>();
function skyTexture(kind: 'clouds' | 'garden') {
  if (skyCache.has(kind)) return skyCache.get(kind)!;
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 180;
  const g = cv.getContext('2d')!;
  const grd = g.createLinearGradient(0, 0, 0, 180); grd.addColorStop(0, '#6EC1F2'); grd.addColorStop(1, '#D8F0FF');
  g.fillStyle = grd; g.fillRect(0, 0, 256, 180);
  const cloud = (x: number, y: number, r: number) => { g.fillStyle = 'rgba(255,255,255,.95)'; [[0, 0, 1], [0.9, -0.3, 0.8], [1.7, 0, 0.9], [0.8, 0.3, 0.9]].forEach(([dx, dy, k]) => { g.beginPath(); g.arc(x + dx * r, y + dy * r, r * k, 0, Math.PI * 2); g.fill(); }); };
  if (kind === 'clouds') { cloud(40, 50, 16); cloud(150, 35, 12); cloud(200, 90, 14); cloud(90, 120, 10); }
  else {
    cloud(60, 35, 12); cloud(190, 45, 10);
    g.fillStyle = '#7CC36A'; g.fillRect(0, 140, 256, 40);
    [[30, 120, 26], [95, 128, 20], [170, 118, 30], [230, 130, 18]].forEach(([x, y, r]) => { g.fillStyle = '#4E9F43'; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); });
  }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; skyCache.set(kind, t); return t;
}

// Предмети, намальовані кодом: басейни, пісочниця, батут
function procModel(file: string): THREE.Object3D {
  const g = new THREE.Group();
  const mat = (c: string, o: Partial<THREE.MeshStandardMaterialParameters> = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, ...o });
  const box = (w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y + h / 2, z); g.add(b); return b; };
  if (file === 'pool' || file === 'pool_small') {
    const [W, D, H] = file === 'pool' ? [2.4, 1.5, 0.22] : [1.1, 1.1, 0.18];
    const rim = mat(file === 'pool' ? '#F4F1EA' : '#5DA9E9'), water = mat('#3FB4E6', { transparent: true, opacity: 0.85, roughness: 0.1, metalness: 0.1, emissive: '#1E8FC9', emissiveIntensity: 0.25 });
    const t = 0.1;
    box(W, H, t, rim, 0, 0, -D / 2 + t / 2); box(W, H, t, rim, 0, 0, D / 2 - t / 2); box(t, H, D, rim, -W / 2 + t / 2); box(t, H, D, rim, W / 2 - t / 2);
    box(W - 2 * t, 0.02, D - 2 * t, mat('#2D8FC2'), 0, 0.01, 0);
    box(W - 2 * t, 0.02, D - 2 * t, water, 0, H - 0.05, 0);
    if (file === 'pool') { const ladder = mat('#C9CED3', { metalness: 0.6, roughness: 0.3 }); box(0.03, 0.4, 0.03, ladder, W / 2 - 0.25, 0, -D / 2 + 0.05); box(0.03, 0.4, 0.03, ladder, W / 2 - 0.45, 0, -D / 2 + 0.05); }
  } else if (file === 'sandpit') {
    const wood = mat('#B98457');
    box(1.2, 0.12, 0.08, wood, 0, 0, -0.56); box(1.2, 0.12, 0.08, wood, 0, 0, 0.56); box(0.08, 0.12, 1.2, wood, -0.56); box(0.08, 0.12, 1.2, wood, 0.56);
    box(1.06, 0.07, 1.06, mat('#F1D48B', { roughness: 1 }));
    const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.1, 12), mat('#E5533D')); bucket.position.set(0.25, 0.12, 0.2); g.add(bucket);
  } else if (file === 'stairs') {
    // сходи на другий поверх: низ спереду (+z), верх ззаду
    const wood = mat('#C99A6B'), dark = mat('#8E623E'), rail = mat('#F4F1EA');
    const N = 7, W = 0.55, D = 1.0, H = 1.2, sd = D / N, sh = H / N;
    for (let i = 0; i < N; i++) { box(W, sh * (i + 1), sd, i % 2 ? wood : mat('#D4A877'), 0, 0, D / 2 - sd * (i + 0.5)); }
    box(0.04, H + 0.05, D, dark, -W / 2 - 0.02, 0, 0);
    for (let i = 0; i < N; i += 2) box(0.025, 0.32, 0.025, rail, W / 2 + 0.015, sh * (i + 1), D / 2 - sd * (i + 0.5));
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, Math.hypot(D, H)), rail);
    hand.position.set(W / 2 + 0.015, H / 2 + 0.36, 0); hand.rotation.x = Math.atan2(H, D); g.add(hand);
  } else if (file === 'trampoline') {
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.06, 32), mat('#4A86D0')); ring.position.y = 0.35; g.add(ring);
    const mat2 = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.065, 32), mat('#2B2B2B')); mat2.position.y = 0.355; g.add(mat2);
    for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI * 2 + 0.4; const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8), mat('#9EA3A8')); leg.position.set(Math.cos(a) * 0.58, 0.175, Math.sin(a) * 0.58); g.add(leg); }
  }
  const wrap = new THREE.Group(); wrap.add(g); return wrap;
}

// Небо гри: блакитний градієнт
function skyBackground() {
  const cv = document.createElement('canvas'); cv.width = 4; cv.height = 256;
  const g = cv.getContext('2d')!;
  const grd = g.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0, '#5BB8F0'); grd.addColorStop(0.55, '#A8DCF8'); grd.addColorStop(1, '#F4F9E8');
  g.fillStyle = grd; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}
