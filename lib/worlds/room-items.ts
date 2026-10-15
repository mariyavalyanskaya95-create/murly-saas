// Предмети для гри «Моя кімната». Усе намальовано коробочками (воксельний стиль), фарбується в різні кольори.
import type { Part } from './iso';

export type Cat = 'furniture' | 'decor' | 'toys' | 'pets';
export type ItemDef = {
  id: string; en: string; uk: string; cat: Cat;
  w: number; d: number;          // розмір у клітинках
  small?: boolean;               // можна ставити на меблі
  surface?: number;              // висота поверхні, на яку можна ставити дрібні речі
  floor?: boolean;               // килим: лежить під іншими речами
  price: number;                 // 0 = доступно одразу
  colors?: string[];             // назви кольорів, які можна вибрати (перший за замовчуванням)
  pet?: boolean;
  parts: (c: string) => Part[];
};

export const COLORS: Record<string, string> = {
  red: '#E5533D', orange: '#F29A38', yellow: '#F5C842', green: '#6FBF5A', blue: '#4A90D9',
  purple: '#8C6BD1', pink: '#F28DB2', white: '#F4F1EA', brown: '#9B6B43', black: '#3A3A3A', grey: '#9AA0A6',
};
export const COLOR_UK: Record<string, string> = {
  red: 'червоний', orange: 'помаранчевий', yellow: 'жовтий', green: 'зелений', blue: 'синій',
  purple: 'фіолетовий', pink: 'рожевий', white: 'білий', brown: 'коричневий', black: 'чорний', grey: 'сірий',
};
const ALL = ['blue', 'red', 'green', 'yellow', 'pink', 'purple', 'orange', 'white', 'black'];
const WOOD = '#C68E5A', DARK = '#7A5232', INK = '#2B2B2B', WHITE = '#FBF8F1';
const legs = (x0: number, y0: number, x1: number, y1: number, h: number, s = 0.08, c = DARK): Part[] =>
  [[x0, y0], [x1 - s, y0], [x0, y1 - s], [x1 - s, y1 - s]].map(([x, y]) => ({ x, y, z: 0, w: s, d: s, h, c }));

export const ITEMS: ItemDef[] = [
  // ---------- МЕБЛІ ----------
  {
    id: 'bed', en: 'bed', uk: 'ліжко', cat: 'furniture', w: 1, d: 2, surface: 0.55, price: 0, colors: ALL,
    parts: (c) => [
      { x: 0, y: 0, z: 0, w: 1, d: 0.14, h: 0.95, c: WOOD },
      { x: 0, y: 0.14, z: 0, w: 1, d: 1.86, h: 0.32, c: WOOD },
      { x: 0.05, y: 0.16, z: 0.32, w: 0.9, d: 1.8, h: 0.14, c: WHITE },
      { x: 0.05, y: 0.7, z: 0.46, w: 0.9, d: 1.26, h: 0.1, c },
      { x: 0.16, y: 0.2, z: 0.46, w: 0.68, d: 0.4, h: 0.12, c: WHITE },
    ],
  },
  {
    id: 'table', en: 'table', uk: 'стіл', cat: 'furniture', w: 1, d: 1, surface: 0.68, price: 0, colors: ['brown', 'white', 'black', 'green', 'blue'],
    parts: (c) => [...legs(0.08, 0.08, 0.92, 0.92, 0.6, 0.09, c === '#9B6B43' ? DARK : c), { x: 0, y: 0, z: 0.6, w: 1, d: 1, h: 0.08, c: c === '#9B6B43' ? WOOD : c }],
  },
  {
    id: 'chair', en: 'chair', uk: 'стілець', cat: 'furniture', w: 1, d: 1, price: 0, colors: ALL,
    parts: (c) => [
      ...legs(0.22, 0.22, 0.78, 0.78, 0.4, 0.07),
      { x: 0.22, y: 0.22, z: 0.4, w: 0.56, d: 0.08, h: 0.55, c: WOOD },
      { x: 0.2, y: 0.3, z: 0.4, w: 0.6, d: 0.5, h: 0.08, c },
    ],
  },
  {
    id: 'sofa', en: 'sofa', uk: 'диван', cat: 'furniture', w: 2, d: 1, surface: 0.42, price: 10, colors: ALL,
    parts: (c) => [
      { x: 0, y: 0, z: 0, w: 0.22, d: 1, h: 0.55, c },
      { x: 0.22, y: 0, z: 0, w: 1.56, d: 0.28, h: 0.8, c },
      { x: 0.22, y: 0.28, z: 0, w: 1.56, d: 0.72, h: 0.3, c },
      { x: 1.78, y: 0, z: 0, w: 0.22, d: 1, h: 0.55, c },
      { x: 0.26, y: 0.3, z: 0.3, w: 0.74, d: 0.66, h: 0.12, c: WHITE },
      { x: 1.02, y: 0.3, z: 0.3, w: 0.74, d: 0.66, h: 0.12, c: WHITE },
    ],
  },
  {
    id: 'wardrobe', en: 'wardrobe', uk: 'шафа', cat: 'furniture', w: 1, d: 1, price: 10, colors: ['brown', 'white', 'blue', 'pink', 'green'],
    parts: (c) => {
      const body = c === '#9B6B43' ? WOOD : c;
      return [
        { x: 0.05, y: 0.12, z: 0, w: 0.9, d: 0.8, h: 1.7, c: body },
        { x: 0.48, y: 0.92, z: 0.15, w: 0.04, d: 0.01, h: 1.4, c: DARK },
        { x: 0.36, y: 0.92, z: 0.8, w: 0.06, d: 0.03, h: 0.2, c: INK },
        { x: 0.58, y: 0.92, z: 0.8, w: 0.06, d: 0.03, h: 0.2, c: INK },
      ];
    },
  },
  {
    id: 'bookshelf', en: 'bookshelf', uk: 'книжкова полиця', cat: 'furniture', w: 1, d: 1, price: 10, colors: ['brown', 'white', 'black'],
    parts: (c) => {
      const body = c === '#9B6B43' ? WOOD : c;
      const books: Part[] = [];
      const bc = ['#E5533D', '#4A90D9', '#F5C842', '#6FBF5A', '#8C6BD1'];
      [0.12, 0.6, 1.08].forEach((z, r) => [0, 1, 2, 3].forEach((i) => books.push({ x: 0.1 + i * 0.2, y: 0.5, z, w: 0.15, d: 0.08, h: 0.32 - ((i + r) % 2) * 0.06, c: bc[(i + r * 2) % 5] })));
      return [{ x: 0.05, y: 0.1, z: 0, w: 0.9, d: 0.4, h: 1.5, c: body }, ...books];
    },
  },
  {
    id: 'desk', en: 'desk', uk: 'письмовий стіл', cat: 'furniture', w: 2, d: 1, surface: 0.72, price: 10, colors: ['brown', 'white', 'black', 'blue'],
    parts: (c) => {
      const top = c === '#9B6B43' ? WOOD : c;
      return [
        ...legs(0.06, 0.08, 0.5, 0.92, 0.64, 0.08),
        { x: 1.3, y: 0.08, z: 0, w: 0.64, d: 0.84, h: 0.64, c: top },
        { x: 1.5, y: 0.92, z: 0.42, w: 0.24, d: 0.02, h: 0.06, c: INK },
        { x: 1.5, y: 0.92, z: 0.18, w: 0.24, d: 0.02, h: 0.06, c: INK },
        { x: 0, y: 0, z: 0.64, w: 2, d: 1, h: 0.08, c: top },
      ];
    },
  },
  {
    id: 'rug', en: 'rug', uk: 'килим', cat: 'decor', w: 2, d: 2, floor: true, price: 0, colors: ['red', 'blue', 'green', 'yellow', 'pink', 'purple'],
    parts: (c) => [
      { x: 0, y: 0, z: 0, w: 2, d: 2, h: 0.03, c, flat: true },
      { x: 0.25, y: 0.25, z: 0.03, w: 1.5, d: 1.5, h: 0.005, c: WHITE, flat: true },
      { x: 0.4, y: 0.4, z: 0.035, w: 1.2, d: 1.2, h: 0.005, c, flat: true },
    ],
  },
  // ---------- ДЕКОР ----------
  {
    id: 'lamp', en: 'lamp', uk: 'лампа', cat: 'decor', w: 1, d: 1, small: true, price: 0, colors: ['yellow', 'white', 'pink', 'blue', 'green'],
    parts: (c) => [
      { x: 0.36, y: 0.36, z: 0, w: 0.28, d: 0.28, h: 0.05, c: INK },
      { x: 0.47, y: 0.47, z: 0.05, w: 0.06, d: 0.06, h: 0.4, c: INK },
      { x: 0.3, y: 0.3, z: 0.42, w: 0.4, d: 0.4, h: 0.26, c },
    ],
  },
  {
    id: 'plant', en: 'plant', uk: 'рослина', cat: 'decor', w: 1, d: 1, small: true, price: 0, colors: ['orange', 'white', 'blue', 'pink'],
    parts: (c) => [
      { x: 0.32, y: 0.32, z: 0, w: 0.36, d: 0.36, h: 0.3, c: c === '#F29A38' ? '#C96A3B' : c },
      { x: 0.36, y: 0.36, z: 0.3, w: 0.28, d: 0.28, h: 0.22, c: '#4E9F43' },
      { x: 0.26, y: 0.42, z: 0.42, w: 0.2, d: 0.16, h: 0.16, c: '#6FBF5A' },
      { x: 0.54, y: 0.3, z: 0.46, w: 0.18, d: 0.18, h: 0.18, c: '#6FBF5A' },
      { x: 0.42, y: 0.42, z: 0.52, w: 0.16, d: 0.16, h: 0.22, c: '#86D06E' },
    ],
  },
  {
    id: 'tv', en: 'TV', uk: 'телевізор', cat: 'decor', w: 1, d: 1, price: 15, colors: ['black', 'white', 'red'],
    parts: (c) => [
      { x: 0.1, y: 0.2, z: 0, w: 0.8, d: 0.6, h: 0.42, c: WOOD },
      { x: 0.44, y: 0.42, z: 0.42, w: 0.12, d: 0.08, h: 0.1, c: INK },
      { x: 0.05, y: 0.4, z: 0.52, w: 0.9, d: 0.1, h: 0.6, c },
      { x: 0.1, y: 0.5, z: 0.57, w: 0.8, d: 0.01, h: 0.5, c: '#5BB7E5' },
    ],
  },
  {
    id: 'computer', en: 'computer', uk: "комп'ютер", cat: 'decor', w: 1, d: 1, small: true, price: 15, colors: ['grey', 'black', 'white', 'pink'],
    parts: (c) => [
      { x: 0.42, y: 0.3, z: 0, w: 0.16, d: 0.16, h: 0.12, c: INK },
      { x: 0.15, y: 0.3, z: 0.12, w: 0.7, d: 0.08, h: 0.45, c },
      { x: 0.2, y: 0.38, z: 0.17, w: 0.6, d: 0.01, h: 0.35, c: '#8FD3F4' },
      { x: 0.2, y: 0.6, z: 0, w: 0.6, d: 0.2, h: 0.04, c },
    ],
  },
  {
    id: 'books', en: 'books', uk: 'книжки', cat: 'decor', w: 1, d: 1, small: true, price: 0,
    parts: () => [
      { x: 0.25, y: 0.3, z: 0, w: 0.5, d: 0.38, h: 0.1, c: '#E5533D' },
      { x: 0.28, y: 0.32, z: 0.1, w: 0.46, d: 0.34, h: 0.09, c: '#4A90D9' },
      { x: 0.24, y: 0.3, z: 0.19, w: 0.5, d: 0.36, h: 0.1, c: '#F5C842' },
    ],
  },
  // ---------- ІГРАШКИ ----------
  {
    id: 'ball', en: 'ball', uk: "м'яч", cat: 'toys', w: 1, d: 1, small: true, price: 0, colors: ['red', 'blue', 'yellow', 'green', 'pink'],
    parts: (c) => [{ k: 'ball', x: 0.5, y: 0.5, z: 0, r: 0.22, c }],
  },
  {
    id: 'teddy', en: 'teddy bear', uk: 'плюшевий ведмедик', cat: 'toys', w: 1, d: 1, small: true, price: 10, colors: ['brown', 'pink', 'white', 'yellow'],
    parts: (c) => [
      { x: 0.3, y: 0.32, z: 0, w: 0.4, d: 0.36, h: 0.36, c },
      { x: 0.7, y: 0.36, z: 0.04, w: 0.14, d: 0.12, h: 0.1, c },
      { x: 0.7, y: 0.54, z: 0.04, w: 0.14, d: 0.12, h: 0.1, c },
      { x: 0.42, y: 0.68, z: 0.14, w: 0.14, d: 0.1, h: 0.16, c },
      { x: 0.32, y: 0.34, z: 0.36, w: 0.36, d: 0.32, h: 0.3, c },
      { x: 0.34, y: 0.34, z: 0.66, w: 0.1, d: 0.1, h: 0.09, c },
      { x: 0.34, y: 0.58, z: 0.66, w: 0.1, d: 0.1, h: 0.09, c },
      { x: 0.68, y: 0.44, z: 0.42, w: 0.06, d: 0.12, h: 0.1, c: WHITE },
      { x: 0.68, y: 0.38, z: 0.54, w: 0.01, d: 0.05, h: 0.05, c: INK },
      { x: 0.68, y: 0.57, z: 0.54, w: 0.01, d: 0.05, h: 0.05, c: INK },
    ],
  },
  {
    id: 'blocks', en: 'blocks', uk: 'кубики', cat: 'toys', w: 1, d: 1, small: true, price: 5,
    parts: () => [
      { x: 0.2, y: 0.3, z: 0, w: 0.25, d: 0.25, h: 0.25, c: '#E5533D' },
      { x: 0.5, y: 0.3, z: 0, w: 0.25, d: 0.25, h: 0.25, c: '#4A90D9' },
      { x: 0.35, y: 0.55, z: 0, w: 0.25, d: 0.25, h: 0.25, c: '#6FBF5A' },
      { x: 0.36, y: 0.36, z: 0.25, w: 0.25, d: 0.25, h: 0.25, c: '#F5C842' },
    ],
  },
  // ---------- ТВАРИНИ ----------
  {
    id: 'cat', en: 'cat', uk: 'кіт', cat: 'pets', w: 1, d: 1, small: true, pet: true, price: 20, colors: ['orange', 'grey', 'black', 'white'],
    parts: (c) => [
      ...legs(0.24, 0.38, 0.7, 0.62, 0.12, 0.07, c),
      { x: 0.1, y: 0.46, z: 0.26, w: 0.12, d: 0.08, h: 0.26, c },
      { x: 0.2, y: 0.36, z: 0.12, w: 0.52, d: 0.28, h: 0.22, c },
      { x: 0.64, y: 0.34, z: 0.26, w: 0.3, d: 0.32, h: 0.26, c },
      { x: 0.68, y: 0.35, z: 0.52, w: 0.08, d: 0.08, h: 0.09, c },
      { x: 0.68, y: 0.57, z: 0.52, w: 0.08, d: 0.08, h: 0.09, c },
      { x: 0.94, y: 0.39, z: 0.4, w: 0.01, d: 0.06, h: 0.06, c: INK },
      { x: 0.94, y: 0.55, z: 0.4, w: 0.01, d: 0.06, h: 0.06, c: INK },
      { x: 0.94, y: 0.47, z: 0.33, w: 0.01, d: 0.06, h: 0.04, c: '#F28DB2' },
    ],
  },
  {
    id: 'dog', en: 'dog', uk: 'собака', cat: 'pets', w: 1, d: 1, small: true, pet: true, price: 20, colors: ['brown', 'white', 'black', 'yellow'],
    parts: (c) => [
      ...legs(0.18, 0.34, 0.72, 0.66, 0.16, 0.09, c),
      { x: 0.06, y: 0.46, z: 0.36, w: 0.14, d: 0.08, h: 0.08, c },
      { x: 0.16, y: 0.32, z: 0.16, w: 0.58, d: 0.36, h: 0.26, c },
      { x: 0.6, y: 0.3, z: 0.34, w: 0.34, d: 0.4, h: 0.3, c },
      { x: 0.86, y: 0.4, z: 0.36, w: 0.12, d: 0.2, h: 0.12, c: shadeHex(c) },
      { x: 0.62, y: 0.26, z: 0.42, w: 0.12, d: 0.06, h: 0.22, c: shadeHex(c) },
      { x: 0.62, y: 0.7, z: 0.42, w: 0.12, d: 0.06, h: 0.22, c: shadeHex(c) },
      { x: 0.98, y: 0.46, z: 0.44, w: 0.01, d: 0.08, h: 0.05, c: INK },
      { x: 0.94, y: 0.36, z: 0.54, w: 0.01, d: 0.06, h: 0.06, c: INK },
      { x: 0.94, y: 0.58, z: 0.54, w: 0.01, d: 0.06, h: 0.06, c: INK },
    ],
  },
];

function shadeHex(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.round(v * 0.72)).toString(16).padStart(2, '0');
  return `#${f((n >> 16) & 255)}${f((n >> 8) & 255)}${f(n & 255)}`;
}

export const ITEM = Object.fromEntries(ITEMS.map((i) => [i.id, i])) as Record<string, ItemDef>;
export const CATS: { id: Cat; label: string }[] = [
  { id: 'furniture', label: 'Меблі' }, { id: 'decor', label: 'Декор' }, { id: 'toys', label: 'Іграшки' }, { id: 'pets', label: 'Тварини' },
];

// Теми кімнати: шпалери і підлога
export const THEMES = [
  { id: 'cream', wall: '#F3E9D2', wall2: '#E9DCBE', floor: '#D9A66B' },
  { id: 'mint', wall: '#CDEBDC', wall2: '#B9DFCB', floor: '#E2C49B' },
  { id: 'lavender', wall: '#E3DAF4', wall2: '#D3C6EE', floor: '#C79E74' },
  { id: 'sky', wall: '#D4E7F7', wall2: '#BFD9F0', floor: '#D8B48A' },
  { id: 'peach', wall: '#FBDCCB', wall2: '#F5C8B1', floor: '#B98A5E' },
];
