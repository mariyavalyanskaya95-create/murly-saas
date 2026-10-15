// Каталог гри «Murly Town»: місто (будинки, дороги, машини) і кімнати всередині будинків.
// У грі всі назви тільки англійською. Моделі CC0: Kenney Furniture Kit, KayKit (Furniture, Restaurant, Holiday, City Builder).
import { HOME_ITEMS } from './home-items';

export type Pack = 'kenney' | 'kaykit' | 'food' | 'holiday' | 'city' | 'suburban' | 'nature' | 'forest' | 'spooky' | 'proc';
export type Mode = 'room' | 'city' | 'yard';
export type WorldItem = {
  file: string; en: string; cat: string; pack: Pack;
  scale?: number;       // множник масштабу моделі
  small?: boolean;      // ставиться на поверхні
  surface?: boolean;    // на нього ставлять дрібні речі
  rug?: boolean;        // плоский шар підлоги (килими, дороги)
  wall?: boolean;       // на стіну
  paint?: 'fabric' | 'wood' | 'none';
  building?: boolean;   // будинок, у який можна зайти
  private?: boolean;    // приватний будинок з подвір'ям (спершу двір, потім кімнати)
  tall?: boolean;       // висотка: з вікон видно небо
  grid?: number;        // крок сітки для цього предмета
  price?: number;
};

export const PACK_URL: Record<Pack, string> = {
  kenney: '/worlds/kenney-all.glb', kaykit: '/worlds/kaykit-all.glb',
  food: '/worlds/kaykit-food.glb', holiday: '/worlds/kaykit-holiday.glb', city: '/worlds/kaykit-city.glb',
  suburban: '/worlds/kenney-suburban.glb', nature: '/worlds/kenney-nature.glb', spooky: '/worlds/spooky.glb', forest: '/worlds/forest.glb', proc: '',
};
export const PACK_SCALE: Record<Pack, number> = { kenney: 1, kaykit: 0.38, food: 0.13, holiday: 0.26, city: 1, suburban: 1, nature: 1, forest: 1, spooky: 1, proc: 1 };

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

export const ROOM_ITEMS: WorldItem[] = [...fromHome, ...FOOD, ...HOLIDAY,
  { file: 'stairs', en: 'staircase', cat: 'Living room', pack: 'proc', paint: 'none' }, // сходи на другий поверх
];
export const ROOM_CATS = ['Living room', 'Bedroom', 'Kitchen', 'Food', 'Bathroom', 'Study', 'Decor', 'Holiday', 'Halloween'];

// ---------- місто ----------
const C = (file: string, en: string, cat: string, o: Partial<WorldItem> = {}): WorldItem => ({ file, en, cat, pack: 'city', paint: 'none', ...o });
export const CITY_ITEMS: WorldItem[] = [
  C('building_A', 'house', 'Houses', { building: true, grid: 2 }),
  C('building_B', 'small house', 'Houses', { building: true, grid: 2 }),
  C('building_E', 'three-storey house', 'Houses', { building: true, grid: 2, price: 10 }),
  C('building_F', 'apartment house', 'Houses', { building: true, grid: 2, price: 10 }),
  C('building_C', 'tall building', 'Houses', { building: true, tall: true, grid: 2, price: 15 }),
  C('building_D', 'block of flats', 'Houses', { building: true, tall: true, grid: 2, price: 15 }),
  C('building_G', 'tower block', 'Houses', { building: true, tall: true, grid: 2, price: 20 }),
  C('building_H', 'skyscraper', 'Houses', { building: true, tall: true, grid: 2, price: 20 }),
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
export const CITY_CATS = ['Houses', 'Roads', 'Cars', 'Street', 'Nature', 'Halloween'];

// ---------- приватні будинки (Kenney City Kit Suburban) ----------
const SUB_HOUSES: [string, string, number?][] = [
  ['building-type-a', 'cottage'], ['building-type-c', 'family house'], ['building-type-i', 'bungalow'], ['building-type-k', 'narrow house'],
  ['building-type-e', 'tall house', 10], ['building-type-t', 'two-storey house', 10], ['building-type-h', 'house with solar panels', 15],
  ['building-type-m', 'house with a garage', 15], ['building-type-p', 'modern house', 20], ['building-type-q', 'modern villa', 25],
];
CITY_ITEMS.unshift(...SUB_HOUSES.map(([file, en, price]) => ({ file, en, cat: 'Houses', pack: 'suburban' as Pack, scale: 1.5, building: true, private: true, grid: 2, paint: 'none' as const, price })));
CITY_ITEMS.push(
  ...['tree_default', 'tree_oak', 'tree_pineRoundA', 'tree_cone', 'tree_palm', 'tree_default_fall'].map((file, i) => ({ file, en: ['tree', 'oak tree', 'pine tree', 'fir', 'palm tree', 'autumn tree'][i], cat: 'Nature', pack: 'nature' as Pack, scale: 0.6, grid: 0.25, paint: 'none' as const })),
  { file: 'plant_bushLarge', en: 'big bush', cat: 'Nature', pack: 'nature', scale: 0.7, grid: 0.25, paint: 'none' },
  { file: 'flower_redA', en: 'flowers', cat: 'Nature', pack: 'nature', scale: 0.8, grid: 0.25, paint: 'none' },
  { file: 'fence', en: 'fence', cat: 'Street', pack: 'suburban', scale: 1.5, grid: 0.25, paint: 'none' },
  { file: 'path-long', en: 'path', cat: 'Roads', pack: 'suburban', scale: 1.5, rug: true, grid: 0.5, paint: 'none' },
  { file: 'driveway-short', en: 'driveway', cat: 'Roads', pack: 'suburban', scale: 1.5, rug: true, grid: 0.5, paint: 'none' },
);

// ---------- ліс (KayKit Forest Nature Pack, CC0) ----------
const FOREST: [string, string, number][] = [
  ['f_tree_1_a', 'leafy tree', 0.55], ['f_tree_1_b', 'big leafy tree', 0.5], ['f_tree_1_c', 'huge tree', 0.38],
  ['f_tree_2_a', 'slim tree', 0.55], ['f_tree_2_c', 'tall tree', 0.42], ['f_tree_2_e', 'giant tree', 0.34],
  ['f_tree_3_a', 'round bush tree', 0.6], ['f_tree_3_b', 'big round tree', 0.5], ['f_tree_3_c', 'wide tree', 0.42],
  ['f_tree_4_a', 'spruce', 0.5], ['f_tree_4_b', 'tall spruce', 0.42], ['f_tree_4_c', 'giant spruce', 0.3],
  ['f_tree_bare_1_a', 'bare tree', 0.7], ['f_tree_bare_2_a', 'dry tree', 0.6],
  ['f_bush_1_c', 'green bush', 0.7], ['f_bush_1_e', 'long bush', 0.7], ['f_bush_2_a', 'small round bush', 0.9], ['f_bush_2_c', 'round bush', 0.6],
  ['f_bush_3_a', 'low bush', 0.8], ['f_bush_3_b', 'wide bush', 0.6], ['f_bush_4_a', 'little bush', 0.9], ['f_bush_4_c', 'fluffy bush', 0.6],
  ['f_rock_1_a', 'pebble', 0.9], ['f_rock_1_e', 'grey rock', 0.7], ['f_rock_1_j', 'boulder', 0.35], ['f_rock_2_d', 'mossy rock', 0.5],
  ['f_rock_3_a', 'flat rock', 0.8], ['f_rock_3_e', 'stone pile', 0.7], ['f_rock_3_k', 'cliff rock', 0.4],
  ['f_grass_1_c', 'grass tuft', 1], ['f_grass_2_c', 'tall grass tuft', 0.9],
];
const forest = (k: number, cat: string, grid?: number): WorldItem[] => FOREST.map(([file, en, sc]) => ({ file, en, cat, pack: 'forest' as Pack, scale: sc * k, paint: 'none' as const, ...(grid ? { grid } : {}) }));
CITY_ITEMS.push(...forest(0.5, 'Nature', 0.25));

// ---------- Halloween (Kenney Graveyard Kit + KayKit Halloween Bits) ----------
const S = (file: string, en: string, scale: number, o: Partial<WorldItem> = {}): WorldItem => ({ file, en, cat: 'Halloween', pack: 'spooky', scale, paint: 'none', ...o });
const spooky = (k: number, kk: number): WorldItem[] => [
  S('pumpkin', 'pumpkin', k, { small: true }), S('pumpkin-carved', 'jack-o’-lantern', k, { small: true }), S('pumpkin-tall-carved', 'tall jack-o’-lantern', k, { small: true }),
  S('k_pumpkin_orange_jackolantern', 'big jack-o’-lantern', kk), S('k_pumpkin_yellow_jackolantern', 'yellow jack-o’-lantern', kk),
  S('character-ghost', 'ghost', k, { price: 5 }), S('character-skeleton', 'skeleton', k, { price: 5 }), S('character-zombie', 'zombie', k, { price: 10 }), S('character-vampire', 'vampire', k, { price: 10 }),
  S('gravestone-round', 'gravestone', k), S('gravestone-cross', 'cross gravestone', k), S('k_skull', 'skull', kk, { small: true }), S('k_skull_candle', 'skull candle', kk, { small: true }),
  S('candle-multiple', 'candles', k, { small: true }), S('k_candle_triple', 'three candles', kk, { small: true }), S('lantern-candle', 'lantern', k, { small: true }),
  S('k_lantern_standing', 'standing lantern', kk), S('k_coffin_decorated', 'coffin', kk, { price: 5 }), S('hay-bale', 'hay bale', k),
  S('k_tree_dead_medium', 'spooky tree', kk), S('k_tree_pine_orange_medium', 'orange tree', kk), S('crypt-small', 'crypt', k, { price: 15 }),
];
ROOM_ITEMS.push(...spooky(0.9, 0.3).filter((i) => !['crypt-small', 'k_tree_dead_medium', 'k_tree_pine_orange_medium', 'hay-bale'].includes(i.file)));
CITY_ITEMS.push(...spooky(0.9, 0.3).filter((i) => !i.small).map((i) => ({ ...i, grid: 0.25 })));

// ---------- подвір'я приватного будинку ----------
const N = (file: string, en: string, scale: number, cat: string, o: Partial<WorldItem> = {}): WorldItem => ({ file, en, cat, pack: 'nature', scale, paint: 'none', ...o });
export const YARD_ITEMS: WorldItem[] = [
  N('tree_default', 'tree', 1.4, 'Garden'), N('tree_oak', 'oak tree', 1.4, 'Garden'), N('tree_fat', 'round tree', 1.4, 'Garden'), N('tree_small', 'small tree', 1.4, 'Garden'),
  N('tree_pineRoundA', 'pine tree', 1.4, 'Garden'), N('tree_palm', 'palm tree', 1.4, 'Garden', { price: 10 }), N('tree_default_fall', 'autumn tree', 1.4, 'Garden'),
  N('plant_bush', 'bush', 1.4, 'Garden'), N('plant_bushLarge', 'big bush', 1.4, 'Garden'), N('plant_bushDetailed', 'leafy bush', 1.4, 'Garden'),
  N('flower_redA', 'red flowers', 1.6, 'Garden'), N('flower_yellowA', 'yellow flowers', 1.6, 'Garden'), N('flower_purpleA', 'purple flowers', 1.6, 'Garden'),
  N('flower_redB', 'roses', 1.6, 'Garden'), N('flower_yellowB', 'sunflowers', 1.6, 'Garden'), N('grass_large', 'tall grass', 1.6, 'Garden'), N('grass_leafs', 'leaves', 1.6, 'Garden'),
  N('mushroom_red', 'mushroom', 1.6, 'Garden'), N('mushroom_redGroup', 'mushrooms', 1.6, 'Garden'), N('rock_largeA', 'big rock', 1.4, 'Garden'), N('stone_smallA', 'stone', 1.6, 'Garden'),
  N('stump_round', 'tree stump', 1.4, 'Garden'), N('log', 'log', 1.4, 'Garden'), N('pot_small', 'flower pot', 1.6, 'Garden'), N('pot_large', 'big flower pot', 1.6, 'Garden'),
  N('cactus_tall', 'cactus', 1.4, 'Garden'), N('lily_large', 'water lily', 1.6, 'Garden'),
  N('crop_pumpkin', 'pumpkin plant', 1.6, 'Vegetables'), N('crop_carrot', 'carrots', 1.6, 'Vegetables'), N('crop_melon', 'melon', 1.6, 'Vegetables'), N('crops_dirtRow', 'vegetable bed', 1.4, 'Vegetables', { rug: true }),
  { file: 'fence', en: 'fence', cat: 'Fences & paths', pack: 'suburban', scale: 2.2, paint: 'none' },
  { file: 'fence-low', en: 'low fence', cat: 'Fences & paths', pack: 'suburban', scale: 2.2, paint: 'none' },
  N('fence_simple', 'wooden fence', 1.4, 'Fences & paths'), N('fence_planks', 'plank fence', 1.4, 'Fences & paths'), N('fence_gate', 'gate', 1.4, 'Fences & paths'),
  { file: 'planter', en: 'planter', cat: 'Fences & paths', pack: 'suburban', scale: 2.2, paint: 'none' },
  { file: 'path-long', en: 'path', cat: 'Fences & paths', pack: 'suburban', scale: 2.2, rug: true, paint: 'none' },
  { file: 'path-stones-long', en: 'stepping stones', cat: 'Fences & paths', pack: 'suburban', scale: 2.2, rug: true, paint: 'none' },
  { file: 'path-stones-messy', en: 'stone path', cat: 'Fences & paths', pack: 'suburban', scale: 2.2, rug: true, paint: 'none' },
  { file: 'pool', en: 'swimming pool', cat: 'Fun', pack: 'proc', price: 20, paint: 'none' },
  { file: 'pool_small', en: 'paddling pool', cat: 'Fun', pack: 'proc', price: 5, paint: 'none' },
  { file: 'sandpit', en: 'sandpit', cat: 'Fun', pack: 'proc', paint: 'none' },
  { file: 'trampoline', en: 'trampoline', cat: 'Fun', pack: 'proc', price: 10, paint: 'none' },
  N('campfire_stones', 'campfire', 1.4, 'Fun'), N('tent_detailedOpen', 'tent', 1.4, 'Fun', { price: 10 }), N('tent_smallOpen', 'small tent', 1.4, 'Fun'),
  N('sign', 'sign', 1.4, 'Fun'), N('statue_obelisk', 'statue', 1.4, 'Fun'),
  ...['bench', 'tableRound', 'chair', 'loungeChair', 'loungeSofa', 'lampRoundFloor', 'pottedPlant', 'bear'].map((file) => {
    const h = HOME_ITEMS.find((x) => x.file === file)!;
    return { file, en: file === 'tableRound' ? 'garden table' : file === 'chair' ? 'garden chair' : h.en, cat: 'Outdoor', pack: 'kenney' as Pack, surface: h.surface, small: h.small, paint: h.paint };
  }),
  ...forest(1, 'Forest'),
  ...spooky(1.1, 0.35).filter((i) => i.file !== 'crypt-small' || true),
  ...HOLIDAY.filter((h) => !h.wall && !h.rug).map((h) => ({ ...h, scale: h.small ? 1 : 1.2 })),
];
export const YARD_CATS = ['Garden', 'Forest', 'Vegetables', 'Fences & paths', 'Fun', 'Outdoor', 'Halloween', 'Holiday'];

// кімнати, які можна додати в будинок за монетки
export const ROOM_TYPES = ['Living room', 'Bedroom', 'Kitchen', 'Bathroom', 'Toilet', 'Kids room', 'Study', 'Upstairs bedroom', 'Attic', 'Playroom'];
export const ROOM_SIZES = [{ size: 2.8, en: 'small', price: 0 }, { size: 3.6, en: 'medium', price: 20 }, { size: 4.4, en: 'big', price: 40 }];

// ключ предмета з урахуванням режиму (одна модель може бути в кількох каталогах з різним масштабом)
export const itemKey = (mode: Mode, file: string) => `${mode}:${file}`;
const ALL = new Map<string, WorldItem>();
ROOM_ITEMS.forEach((i) => ALL.set(itemKey('room', i.file), i));
CITY_ITEMS.forEach((i) => ALL.set(itemKey('city', i.file), i));
YARD_ITEMS.forEach((i) => ALL.set(itemKey('yard', i.file), i));
export const getItem = (mode: Mode, file: string) => ALL.get(itemKey(mode, file));

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

// що герой може зробити з предметом
export function actOf(def: WorldItem | undefined): 'sit' | 'sleep' | 'water' | 'eat' | 'stairs' | null {
  if (!def) return null;
  const f = def.file;
  if (f === 'stairs') return 'stairs';
  if (/^bed/i.test(f)) return 'sleep';
  if (/sofa|couch|chair|bench|stool|ottoman/i.test(f) && !/table|cabinet/i.test(f)) return 'sit';
  if (def.pack === 'food') return 'eat';
  if ((def.pack === 'nature' || def.pack === 'forest') && /tree|bush|flower|crop|plant|grass|lily|cactus|pot/i.test(f)) return 'water';
  return null;
}
