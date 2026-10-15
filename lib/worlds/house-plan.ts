// План будинку: кімнати стоять поруч (як у Sims), де дві кімнати торкаються, там двері.
// Координати в метрах, центр кімнати (x, z). Між кімнатами стіна товщиною GAP.

export const GAP = 0.1;
const EPS = 0.03;
export const DOOR_W = 0.7;   // ширина дверного прорізу
const MIN_OVERLAP = DOOR_W + 0.2; // скільки стіни мають збігатися, щоб були двері

export type PlanRoom = { id: string; size: number; at?: { x: number; z: number }; level?: number };
// side: 0 = стіна з боку -z, 1 = -x, 2 = +z, 3 = +x (як у сцені). at: зсув уздовж стіни від центру кімнати (x для 0/2, z для 1/3)
export type Door = { side: number; at: number; to: string };

const half = (r: PlanRoom) => r.size / 2;
const lvl = (r: PlanRoom) => r.level ?? 0;
const P = (r: PlanRoom) => r.at ?? { x: 0, z: 0 };
const r2 = (v: number) => Math.round(v * 100) / 100;

/** кімнати перекриваються (з урахуванням стіни між ними) */
export function overlaps(a: PlanRoom, b: PlanRoom) {
  if (lvl(a) !== lvl(b)) return false;
  const pa = P(a), pb = P(b), d = half(a) + half(b) + GAP - EPS;
  return Math.abs(pa.x - pb.x) < d && Math.abs(pa.z - pb.z) < d;
}

/** спільна стіна двох кімнат: з якого боку a, і відрізок уздовж стіни (у світових координатах) */
export function contact(a: PlanRoom, b: PlanRoom): { side: number; lo: number; hi: number } | null {
  if (lvl(a) !== lvl(b)) return null;
  const pa = P(a), pb = P(b), d = half(a) + half(b) + GAP;
  if (Math.abs(Math.abs(pb.x - pa.x) - d) < EPS) {
    const lo = Math.max(pa.z - half(a), pb.z - half(b)), hi = Math.min(pa.z + half(a), pb.z + half(b));
    if (hi - lo > EPS) return { side: pb.x > pa.x ? 3 : 1, lo, hi };
  }
  if (Math.abs(Math.abs(pb.z - pa.z) - d) < EPS) {
    const lo = Math.max(pa.x - half(a), pb.x - half(b)), hi = Math.min(pa.x + half(a), pb.x + half(b));
    if (hi - lo > EPS) return { side: pb.z > pa.z ? 2 : 0, lo, hi };
  }
  return null;
}

/** двері кімнати: де вона торкається інших кімнат на тому ж поверсі */
export function doorsOf(id: string, rooms: PlanRoom[]): Door[] {
  const a = rooms.find((r) => r.id === id); if (!a) return [];
  const out: Door[] = [];
  for (const b of rooms) {
    if (b.id === id) continue;
    const c = contact(a, b); if (!c || c.hi - c.lo < MIN_OVERLAP) continue;
    const mid = (c.lo + c.hi) / 2, pa = P(a);
    out.push({ side: c.side, at: r2(c.side === 0 || c.side === 2 ? mid - pa.x : mid - pa.z), to: b.id });
  }
  return out;
}

/** сторони кімнати, які торкаються будь-якої іншої кімнати (там не малюємо вікна) */
export function sharedSides(id: string, rooms: PlanRoom[]) {
  const a = rooms.find((r) => r.id === id); if (!a) return [];
  return [...new Set(rooms.filter((b) => b.id !== id).map((b) => contact(a, b)?.side).filter((s): s is number => s !== undefined))];
}

/** усі кімнати поверху пов'язані дверима між собою */
export function connected(rooms: PlanRoom[], level = 0) {
  const on = rooms.filter((r) => lvl(r) === level); if (on.length <= 1) return true;
  const seen = new Set([on[0].id]); const q = [on[0].id];
  while (q.length) { const id = q.shift()!; for (const d of doorsOf(id, on)) if (!seen.has(d.to)) { seen.add(d.to); q.push(d.to); } }
  return seen.size === on.length;
}

/** найближче до точки (x, z) місце, де кімната room стає впритул до однієї з інших і має з нею двері */
export function snapNear(room: PlanRoom, others: PlanRoom[], x: number, z: number, step = 0.2): { x: number; z: number } | null {
  let best: { x: number; z: number; d: number } | null = null;
  const h = half(room);
  for (const o of others) {
    if (o.id === room.id || lvl(o) !== lvl(room)) continue;
    const po = P(o), ho = half(o), d = h + ho + GAP;
    const range = ho + h - MIN_OVERLAP; // наскільки можна зсунути вздовж стіни
    for (const side of [0, 1, 2, 3]) {
      const n = Math.floor(range / step + 1e-6);
      for (let k = -n; k <= n; k++) {
        const s = k * step;
        const c = side === 0 ? { x: po.x + s, z: po.z - d } : side === 2 ? { x: po.x + s, z: po.z + d } : side === 1 ? { x: po.x - d, z: po.z + s } : { x: po.x + d, z: po.z + s };
        const cand = { ...room, at: { x: r2(c.x), z: r2(c.z) } };
        if (others.some((q) => q.id !== room.id && overlaps(cand, q))) continue;
        const dist = Math.hypot(c.x - x, c.z - z);
        if (!best || dist < best.d) best = { ...cand.at, d: dist };
      }
    }
  }
  return best ? { x: best.x, z: best.z } : null;
}

/** розставити кімнати без місця: кожну впритул до вже розставлених (переважно праворуч від попередньої) */
export function layout<T extends PlanRoom>(rooms: T[]): T[] {
  const out: T[] = [];
  for (const r of rooms) {
    const same = out.filter((o) => lvl(o) === lvl(r));
    if (r.at && !same.some((o) => overlaps(r, o))) { out.push(r); continue; }
    if (!same.length) { out.push({ ...r, at: { x: 0, z: 0 } }); continue; }
    const prev = same[same.length - 1], pp = P(prev);
    const at = snapNear(r, same, pp.x + half(prev) + half(r) + GAP, pp.z) ?? { x: pp.x + 10, z: pp.z };
    out.push({ ...r, at });
  }
  return out;
}

/** нова кімната поруч із кімнатою near */
export function attach<T extends PlanRoom>(room: T, rooms: T[], nearId?: string): T {
  const same = rooms.filter((o) => lvl(o) === lvl(room));
  if (!same.length) return { ...room, at: { x: 0, z: 0 } };
  const near = same.find((r) => r.id === nearId) ?? same[same.length - 1], pn = P(near);
  for (const [dx, dz] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
    const d = half(near) + half(room) + GAP;
    const at = { x: r2(pn.x + dx * d), z: r2(pn.z + dz * d) };
    const cand = { ...room, at };
    if (!same.some((o) => overlaps(cand, o))) return cand;
  }
  return { ...room, at: snapNear(room, same, pn.x, pn.z) ?? { x: pn.x + 20, z: pn.z } };
}

/** кімната id стала розміру size: сусідів за її старими краями відсуваємо назовні, щоб двері лишилися */
export function grow<T extends PlanRoom>(rooms: T[], id: string, size: number): T[] {
  const a = rooms.find((r) => r.id === id); if (!a) return rooms;
  const pa = P(a), oh = half(a), dh = size / 2 - oh;
  return rooms.map((r) => {
    if (r.id === id) return { ...r, size };
    if (lvl(r) !== lvl(a)) return r;
    const p = P(r);
    const dx = p.x > pa.x + oh ? dh : p.x < pa.x - oh ? -dh : 0;
    const dz = p.z > pa.z + oh ? dh : p.z < pa.z - oh ? -dh : 0;
    return dx || dz ? { ...r, at: { x: r2(p.x + dx), z: r2(p.z + dz) } } : r;
  });
}

/** межі поверху (для камери і плану) */
export function bounds(rooms: PlanRoom[], level = 0) {
  const on = rooms.filter((r) => lvl(r) === level);
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const r of on) { const p = P(r), h = half(r); minX = Math.min(minX, p.x - h); maxX = Math.max(maxX, p.x + h); minZ = Math.min(minZ, p.z - h); maxZ = Math.max(maxZ, p.z + h); }
  return on.length ? { minX, maxX, minZ, maxZ } : { minX: -1, maxX: 1, minZ: -1, maxZ: 1 };
}

/** шлях між кімнатами через двері (BFS): список id кімнат від from до to */
export function roomPath(rooms: PlanRoom[], from: string, to: string): string[] | null {
  const prev = new Map<string, string>([[from, '']]); const q = [from];
  while (q.length) {
    const id = q.shift()!; if (id === to) break;
    for (const d of doorsOf(id, rooms)) if (!prev.has(d.to)) { prev.set(d.to, id); q.push(d.to); }
  }
  if (!prev.has(to)) return null;
  const path: string[] = []; let c = to; while (c) { path.unshift(c); c = prev.get(c)!; }
  return path;
}
