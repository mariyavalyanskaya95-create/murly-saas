// Ізометрична «воксельна» графіка для ігор-світів Murly: усе малюємо з коробочок і кульок у SVG.
// Координати в клітинках: x вправо-вниз, y вліво-вниз, z угору.

export const TW = 32; // половина ширини клітинки в пікселях
export const TH = 16; // половина висоти клітинки
export const ZH = 36; // висота одиниці z

export type Box = { k?: 'box'; x: number; y: number; z: number; w: number; d: number; h: number; c: string; flat?: boolean };
export type Ball = { k: 'ball'; x: number; y: number; z: number; r: number; c: string };
export type Part = Box | Ball;

export const proj = (x: number, y: number, z = 0) => [(x - y) * TW, (x + y) * TH - z * ZH] as const;

// зворотна проєкція точки екрана на підлогу (z = 0)
export const unproj = (sx: number, sy: number) => {
  const a = sx / TW, b = sy / TH;
  return { x: (a + b) / 2, y: (b - a) / 2 };
};

// освітлення: зверху світліше, праворуч темніше
export function shade(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (k > 0) { r += (255 - r) * k; g += (255 - g) * k; b += (255 - b) * k; } else { r *= 1 + k; g *= 1 + k; b *= 1 + k; }
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}

const pts = (p: (readonly [number, number])[]) => p.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');

export type Poly = { points: string; fill: string } | { cx: number; cy: number; r: number; fill: string; ball: true };

// поворот на 90°: дзеркалимо по діагоналі (x ↔ y)
export function rotate(parts: Part[], rot: number): Part[] {
  if (!rot) return parts;
  return parts.map((p) => (p.k === 'ball' ? { ...p, x: p.y, y: p.x } : { ...p, x: p.y, y: p.x, w: p.d, d: p.w }));
}

// Коробочка → три видимі грані. Порядок малювання всередині предмета: спершу нижчі, потім дальші.
export function toPolys(parts: Part[], ox = 0, oy = 0, oz = 0): Poly[] {
  const sorted = [...parts].sort((a, b) => key(a) - key(b));
  const out: Poly[] = [];
  for (const p of sorted) {
    if (p.k === 'ball') {
      const [cx, cy] = proj(ox + p.x, oy + p.y, oz + p.z + p.r * 0.9);
      out.push({ cx, cy, r: p.r * TW * 1.15, fill: p.c, ball: true });
      continue;
    }
    const x = ox + p.x, y = oy + p.y, z = oz + p.z, { w, d, h } = p;
    const P = (a: number, b: number, c: number) => proj(a, b, c);
    out.push({ points: pts([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]), fill: shade(p.c, 0.18) });
    if (p.flat) continue;
    out.push({ points: pts([P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)]), fill: p.c });
    out.push({ points: pts([P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)]), fill: shade(p.c, -0.22) });
  }
  return out;
}
const key = (p: Part) => (p.k === 'ball' ? p.z * 100 + p.x + p.y : p.z * 100 + p.x + p.w / 2 + p.y + p.d / 2);

// межі набору полігонів (для мініатюр у каталозі)
export function bounds(polys: Poly[]) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const p of polys) {
    if ('ball' in p) { x0 = Math.min(x0, p.cx - p.r); x1 = Math.max(x1, p.cx + p.r); y0 = Math.min(y0, p.cy - p.r); y1 = Math.max(y1, p.cy + p.r); continue; }
    for (const pair of p.points.split(' ')) { const [a, b] = pair.split(',').map(Number); x0 = Math.min(x0, a); x1 = Math.max(x1, a); y0 = Math.min(y0, b); y1 = Math.max(y1, b); }
  }
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

export const diamond = (x: number, y: number, w: number, d: number, z = 0) =>
  pts([proj(x, y, z), proj(x + w, y, z), proj(x + w, y + d, z), proj(x, y + d, z)]);
