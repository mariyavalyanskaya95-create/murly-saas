// Каталог гри «Murly Town»: місто (будинки, дороги, машини) і кімнати всередині будинків.
// У грі всі назви тільки англійською. Моделі CC0: Kenney Furniture Kit, KayKit (Furniture, Restaurant, Holiday, City Builder).
import { HOME_ITEMS } from './home-items';

export type Pack = 'kenney' | 'kaykit' | 'food' | 'holiday' | 'city';
export type WorldItem = {
  file: string; en: string; cat: string; pack: Pack;
  scale?: number;       // множник масштабу моделі
  small?: boolean;      // ставиться на поверхні
  surface?: boolean;    // на нього ставлять дрібні речі
  rug?: boolean;        // плоский шар підлоги (килими, дороги)
  wall?: boolean;       // на стіну
  paint?: 'fabric' | 'wood' | 'none';
  building?: boolean;   // будинок, у який можна зайти
  grid?: number;        // крок сітки для цього предмета
  price?: number;
};

export const PACK_URL: Record<Pack, string> = {
  kenney: '/worlds/kenney-all.glb', kaykit: '/worlds/kaykit-all.glb',
  food: '/worlds/kaykit-food.glb', holiday: '/worlds/kaykit-holiday.glb', city: '/worlds/kaykit-city.glb',
};
export const PACK_SCALE: Record<Pack, number> = { kenney: 1, kaykit: 0.38, food: 0.13, holiday: 0.26, city: 1 };

// ---------- кімната ----------
const ROOM_CAT: Record<string, string> = { living: 'Living room', bedroom: 'Bedroom', kitchen: 'Kitchen', bathroom: 'Bathroom', study: 'Study', decor: 'Decor' };
const fromHome: WorldItem[] = HOME_ITEMS.map((h) => ({
  file: h.file, en: h.en, cat: ROOM_CAT[h.cat], pack: (h.pack ?? 'kenney') as Pack,
  small: h.small, surface: h.surface, rug: h.rug, wall: h.wall, paint: h.paint ?? (h.pack ? 'none' : undefined), price: h.price,
}));

const F = (file: string, en: string, o: Partial<WorldItem> = {}): WorldItem => ({ file, en, cat: 'Food', pack: 'food', small: true, paint: 'none', ...o });
const FOOD: WorldItem[] = [
  F('food_ingredient_tomato', 'tomato'), F('food_ingredient_carrot', 'carrot'), F('food_ingredient_potato', 'potato'),
  F('food_ingredient_onion', 'onion'), F('food_ingredient_lettuce', 'lettuce'), F('food_ingredient_cheese', 'cheese'),
  F('food_ingredient_ham', 'ham'), F('food_ingredient_steak', 'steak'), F('food_ingredient_bun', 'bun'),
  F('food_burger', 'burger'), F('food_vegetableburger', 'veggie burger'), F('food_dinner', 'dinner'), F('food_stew', 'stew'),
  F('bowl', 'bowl'), F('plate', 'plate'), F('plate_small', 'small plate'), F('cuttingboard', 'chopping board'), F('knife', 'knife'),
  F('pan_A', 'frying pan'), F('pot_A', 'pot'), F('ketchup', 'ketchup'), F('mustard', 'mustard'),
  F('jar_A_medium', 'jar'), F('jar_B_medium', 'jam jar'), F('menu', 'menu'), F('papertowel', 'paper towel'),
  F('crate_tomatoes', 'box of tomatoes', { small: false, price: 5 }), F('crate_carrots', 'box of carrots', { small: false, price: 5 }), F('crate_potatoes', 'box of potatoes', { small: false, price: 5 }),
];

const X = (file: string, en: string, o: Partial<WorldItem> = {}): WorldItem => ({ file, en, cat: 'Holiday', pack: 'holiday', paint: 'none', ...o });
const HOLIDAY: WorldItem[] = [
  X('christmas_tree_decorated', 'Christmas tree with lights', { price: 10 }), X('christmas_tree', 'Christmas tree'),
  X('present_A_red', 'red present', { small: true }), X('present_B_blue', 'blue present', { small: true }), X('present_C_green', 'green present', { small: true }),
  X('present_D_yellow', 'yellow present', { small: true }), X('present_sphere_A_white', 'round present', { small: true }),
  X('snowman_A', 'snowman', { price: 5 }), X('snowman_B', 'little snowman'), X('snowball_pile', 'snowballs'),
  X('gingerbread_house_decorated', 'gingerbread house', { small: true, price: 5 }), X('gingerbread_man', 'gingerbread man', { small: true }),
  X('cookie', 'cookie', { small: true }), X('hot_chocolate_decorated', 'hot chocolate', { small: true }), X('milk', 'milk', { small: true }),
  X('candycane_small', 'candy cane', { small: true }), X('bell_decorated', 'bell', { small: true }), X('lantern_decorated', 'lantern', { small: true }),
  X('wreath', 'wreath', { wall: true }), X('basketball', 'basketball', { small: true }), X('football', 'football', { small: true }),
  X('train_locomotive', 'toy train', { price: 10 }), X('chair_large_red', 'red armchair'), X('chair_large_green', 'green armchair'),
  X('footstool_blue', 'footstool'), X('stool', 'stool'), X('carpet_round_large', 'round carpet', { rug: true }),
];

export const ROOM_ITEMS: WorldItem[] = [...fromHome, ...FOOD, ...HOLIDAY];
export const ROOM_CATS = ['Living room', 'Bedroom', 'Kitchen', 'Food', 'Bathroom', 'Study', 'Decor', 'Holiday'];

// ---------- місто ----------
const C = (file: string, en: string, cat: string, o: Partial<WorldItem> = {}): WorldItem => ({ file, en, cat, pack: 'city', paint: 'none', ...o });
export const CITY_ITEMS: WorldItem[] = [
  C('building_A', 'house', 'Houses', { building: true, grid: 2 }),
  C('building_B', 'small house', 'Houses', { building: true, grid: 2 }),
  C('building_E', 'three-storey house', 'Houses', { building: true, grid: 2, price: 10 }),
  C('building_F', 'apartment house', 'Houses', { building: true, grid: 2, price: 10 }),
  C('building_C', 'tall building', 'Houses', { building: true, grid: 2, price: 15 }),
  C('building_D', 'block of flats', 'Houses', { building: true, grid: 2, price: 15 }),
  C('building_G', 'tower block', 'Houses', { building: true, grid: 2, price: 20 }),
  C('building_H', 'skyscraper', 'Houses', { building: true, grid: 2, price: 20 }),
  C('road_straight', 'road', 'Roads', { rug: true, grid: 2 }),
  C('road_straight_crossing', 'zebra crossing', 'Roads', { rug: true, grid: 2 }),
  C('road_corner', 'corner', 'Roads', { rug: true, grid: 2 }),
  C('road_corner_curved', 'bend', 'Roads', { rug: true, grid: 2 }),
  C('road_junction', 'crossroads', 'Roads', { rug: true, grid: 2 }),
  C('road_tsplit', 'T-junction', 'Roads', { rug: true, grid: 2 }),
  C('base', 'pavement', 'Roads', { rug: true, grid: 2 }),
  C('car_sedan', 'car', 'Cars', { grid: 0.25 }),
  C('car_hatchback', 'small car', 'Cars', { grid: 0.25 }),
  C('car_stationwagon', 'family car', 'Cars', { grid: 0.25 }),
  C('car_taxi', 'taxi', 'Cars', { grid: 0.25, price: 5 }),
  C('car_police', 'police car', 'Cars', { grid: 0.25, price: 10 }),
  C('streetlight', 'street light', 'Street', { grid: 0.25 }),
  C('trafficlight_A', 'traffic lights', 'Street', { grid: 0.25 }),
  C('bench', 'bench', 'Street', { grid: 0.25 }),
  C('firehydrant', 'fire hydrant', 'Street', { grid: 0.25 }),
  C('trash_A', 'bin', 'Street', { grid: 0.25 }),
  C('dumpster', 'skip', 'Street', { grid: 0.25 }),
  C('box_A', 'box', 'Street', { grid: 0.25 }),
  C('watertower', 'water tower', 'Street', { grid: 0.25, price: 10 }),
  C('bush', 'bush', 'Nature', { grid: 0.25 }),
  { file: 'christmas_tree', en: 'Christmas tree', cat: 'Nature', pack: 'holiday', scale: 2.4, grid: 0.25, paint: 'none' },
  { file: 'christmas_tree_decorated', en: 'tree with lights', cat: 'Nature', pack: 'holiday', scale: 2.4, grid: 0.25, paint: 'none', price: 10 },
  { file: 'snowman_A', en: 'snowman', cat: 'Nature', pack: 'holiday', scale: 1.4, grid: 0.25, paint: 'none' },
  { file: 'pottedPlant', en: 'plant pot', cat: 'Nature', pack: 'kenney', scale: 1.4, grid: 0.25, paint: 'none' },
];
export const CITY_CATS = ['Houses', 'Roads', 'Cars', 'Street', 'Nature'];

// ключ предмета з урахуванням режиму (одна модель може бути в обох каталогах з різним масштабом)
export const itemKey = (mode: 'room' | 'city', file: string) => `${mode}:${file}`;
const ALL = new Map<string, WorldItem>();
ROOM_ITEMS.forEach((i) => ALL.set(itemKey('room', i.file), i));
CITY_ITEMS.forEach((i) => ALL.set(itemKey('city', i.file), i));
export const getItem = (mode: 'room' | 'city', file: string) => ALL.get(itemKey(mode, file));

export const PAINT: { en: string; hex: string }[] = [
  { en: 'red', hex: '#D9534A' }, { en: 'orange', hex: '#EE8E3C' }, { en: 'yellow', hex: '#F2C744' }, { en: 'green', hex: '#5DAA5A' },
  { en: 'blue', hex: '#4A86D0' }, { en: 'purple', hex: '#8A6CCB' }, { en: 'pink', hex: '#EE8FB4' }, { en: 'white', hex: '#F2EEE6' },
  { en: 'grey', hex: '#9EA3A8' }, { en: 'black', hex: '#3B3B3E' }, { en: 'brown', hex: '#9B6A44' },
];
export const WALLS = [
  { en: 'cream', hex: '#F1E6CF' }, { en: 'mint', hex: '#CBE8D8' }, { en: 'lavender', hex: '#E0D7F2' }, { en: 'sky blue', hex: '#CFE3F5' },
  { en: 'peach', hex: '#F8D6C4' }, { en: 'white', hex: '#F7F5F0' }, { en: 'yellow', hex: '#F6E7A8' }, { en: 'pink', hex: '#F6CFDC' },
];
export const FLOORS = [
  { en: 'light wood', hex: '#D7A774', kind: 'wood' }, { en: 'dark wood', hex: '#8C5E3C', kind: 'wood' }, { en: 'grey tiles', hex: '#B9BEC3', kind: 'tiles' },
  { en: 'white tiles', hex: '#E9E6DF', kind: 'tiles' }, { en: 'blue carpet', hex: '#7FA6CF', kind: 'carpet' }, { en: 'green carpet', hex: '#86B67A', kind: 'carpet' },
] as const;
export const GROUNDS = [
  { en: 'grass', hex: '#8FC46A' }, { en: 'spring grass', hex: '#A9D477' }, { en: 'snow', hex: '#F3F6FA' }, { en: 'sand', hex: '#E6CF98' },
];

// Герої (KayKit Adventurers, CC0), анімації Rig_Medium
export const HEROES = [
  { file: 'Rogue', en: 'Robin' }, { file: 'Ranger', en: 'Leo' }, { file: 'Mage', en: 'Max' }, { file: 'Knight', en: 'Alex' }, { file: 'Barbarian', en: 'Ben' },
];
