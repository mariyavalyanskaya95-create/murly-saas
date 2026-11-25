// «Murly Island»: власна гра Murly у жанрі «живи на острові й працюй». Усе в грі англійською.
// Персонаж, тварини, транспорт і частина речей малюються кодом; будинки й дерева з наборів CC0 (Kenney, KayKit).

export type Cat = 'Clothes' | 'Home' | 'Transport' | 'Pets';
export type ShopItem = { id: string; en: string; cat: Cat; sub: string; price: number; color?: string };

// кольори шерсті котика (безкоштовний перший, решта за монетки)
export const FUR = [
  { id: 'fur-ginger', en: 'ginger', color: '#F4A340', price: 0 },
  { id: 'fur-white', en: 'white', color: '#F7F3EA', price: 15 },
  { id: 'fur-grey', en: 'grey', color: '#9AA3AE', price: 15 },
  { id: 'fur-black', en: 'black', color: '#3A3A44', price: 20 },
  { id: 'fur-mint', en: 'mint', color: '#8FE3C4', price: 30 },
  { id: 'fur-pink', en: 'pink', color: '#F7A8C8', price: 30 },
  { id: 'fur-blue', en: 'sky blue', color: '#8EC9F5', price: 30 },
  { id: 'fur-purple', en: 'purple', color: '#B79CF0', price: 35 },
];

export const SHOP: ShopItem[] = [
  // одяг
  { id: 'hat-cap', en: 'red cap', cat: 'Clothes', sub: 'hat', price: 20, color: '#E5484D' },
  { id: 'hat-beanie', en: 'blue beanie', cat: 'Clothes', sub: 'hat', price: 20, color: '#3E7BFA' },
  { id: 'hat-chef', en: 'chef hat', cat: 'Clothes', sub: 'hat', price: 30 },
  { id: 'hat-top', en: 'top hat', cat: 'Clothes', sub: 'hat', price: 45 },
  { id: 'hat-crown', en: 'golden crown', cat: 'Clothes', sub: 'hat', price: 120 },
  { id: 'hat-helmet', en: 'space helmet', cat: 'Clothes', sub: 'hat', price: 90 },
  { id: 'hat-flower', en: 'flower crown', cat: 'Clothes', sub: 'hat', price: 35 },
  { id: 'glasses-round', en: 'round glasses', cat: 'Clothes', sub: 'glasses', price: 20 },
  { id: 'glasses-sun', en: 'sunglasses', cat: 'Clothes', sub: 'glasses', price: 30 },
  { id: 'glasses-star', en: 'star glasses', cat: 'Clothes', sub: 'glasses', price: 50 },
  { id: 'scarf-red', en: 'red scarf', cat: 'Clothes', sub: 'scarf', price: 20, color: '#E5484D' },
  { id: 'scarf-green', en: 'green scarf', cat: 'Clothes', sub: 'scarf', price: 20, color: '#30A46C' },
  { id: 'bow-pink', en: 'pink bow tie', cat: 'Clothes', sub: 'scarf', price: 25, color: '#F76AA8' },
  { id: 'bag-school', en: 'yellow backpack', cat: 'Clothes', sub: 'bag', price: 35, color: '#FFC53D' },
  { id: 'bag-jetpack', en: 'jetpack', cat: 'Clothes', sub: 'bag', price: 150 },
  { id: 'cape-hero', en: 'superhero cape', cat: 'Clothes', sub: 'bag', price: 80, color: '#7C66DC' },
  // дім
  { id: 'house-1', en: 'cottage', cat: 'Home', sub: 'house', price: 120 },
  { id: 'house-2', en: 'family house', cat: 'Home', sub: 'house', price: 250 },
  { id: 'house-3', en: 'modern villa', cat: 'Home', sub: 'house', price: 450 },
  { id: 'yard-bench', en: 'bench', cat: 'Home', sub: 'yard', price: 15 },
  { id: 'yard-flowers', en: 'flower bed', cat: 'Home', sub: 'yard', price: 15 },
  { id: 'yard-lamp', en: 'street lamp', cat: 'Home', sub: 'yard', price: 20 },
  { id: 'yard-fire', en: 'campfire', cat: 'Home', sub: 'yard', price: 25 },
  { id: 'yard-tent', en: 'tent', cat: 'Home', sub: 'yard', price: 40 },
  { id: 'yard-tramp', en: 'trampoline', cat: 'Home', sub: 'yard', price: 60 },
  { id: 'yard-pool', en: 'swimming pool', cat: 'Home', sub: 'yard', price: 120 },
  { id: 'yard-tree', en: 'palm tree', cat: 'Home', sub: 'yard', price: 20 },
  { id: 'yard-fence', en: 'fence', cat: 'Home', sub: 'yard', price: 25 },
  // транспорт
  { id: 'ride-skate', en: 'skateboard', cat: 'Transport', sub: 'ride', price: 40 },
  { id: 'ride-bike', en: 'bicycle', cat: 'Transport', sub: 'ride', price: 90 },
  { id: 'ride-scooter', en: 'scooter', cat: 'Transport', sub: 'ride', price: 160 },
  { id: 'ride-car', en: 'little car', cat: 'Transport', sub: 'ride', price: 300 },
  { id: 'ride-ufo', en: 'flying saucer', cat: 'Transport', sub: 'ride', price: 600 },
  // улюбленці
  { id: 'pet-chick', en: 'chick', cat: 'Pets', sub: 'pet', price: 50 },
  { id: 'pet-bunny', en: 'bunny', cat: 'Pets', sub: 'pet', price: 80 },
  { id: 'pet-puppy', en: 'puppy', cat: 'Pets', sub: 'pet', price: 120 },
  { id: 'pet-dragon', en: 'baby dragon', cat: 'Pets', sub: 'pet', price: 250 },
];
export const SPEED: Record<string, number> = { 'ride-skate': 1.6, 'ride-bike': 2.0, 'ride-scooter': 2.4, 'ride-car': 3.0, 'ride-ufo': 3.4 };

export type Outfit = { fur: string; hat?: string; glasses?: string; scarf?: string; bag?: string };
export type Save = { v: 1; owned: string[]; outfit: Outfit; ride: string | null; pet: string | null; house: number; yard: string[]; jobs: Record<string, number>; name?: string; localCoins?: number };
export const START: Save = { v: 1, owned: ['fur-ginger'], outfit: { fur: 'fur-ginger' }, ride: null, pet: null, house: 0, yard: [], jobs: {} };

// ---------- карта ----------
export type Spot = { id: string; x: number; z: number; r: number; label: string };
// будинки для доставки: номер, вулиця, орієнтир
export type Addr = { id: string; no: number; street: string; x: number; z: number; rot: number; model: string; near: string };
export const STREETS = ['Sunny Street', 'Oak Street', 'Beach Road'];
export const ADDRS: Addr[] = [
  { id: 'a1', no: 1, street: 'Sunny Street', x: -40, z: -6, rot: Math.PI / 2, model: 'building-type-c', near: 'next to the big oak tree' },
  { id: 'a2', no: 2, street: 'Sunny Street', x: -40, z: 8, rot: Math.PI / 2, model: 'building-type-i', near: 'opposite the playground' },
  { id: 'a3', no: 3, street: 'Sunny Street', x: -52, z: 1, rot: Math.PI / 2, model: 'building-type-k', near: 'at the end of the street' },
  { id: 'a4', no: 4, street: 'Oak Street', x: 6, z: 36, rot: Math.PI, model: 'building-type-e', near: 'next to the fountain path' },
  { id: 'a5', no: 5, street: 'Oak Street', x: 20, z: 38, rot: Math.PI, model: 'building-type-h', near: 'the house with solar panels' },
  { id: 'a6', no: 6, street: 'Oak Street', x: 34, z: 34, rot: Math.PI, model: 'building-type-t', near: 'behind the Murly Store' },
  { id: 'a7', no: 7, street: 'Beach Road', x: 46, z: -10, rot: -Math.PI / 2, model: 'building-type-m', near: 'the house with a garage' },
  { id: 'a8', no: 8, street: 'Beach Road', x: 48, z: -26, rot: -Math.PI / 2, model: 'building-type-p', near: 'near the lighthouse' },
];
export const HOUSES = ['', 'building-type-a', 'building-type-c', 'building-type-q'];
export const HOME = { x: -26, z: 30 };

// ---------- роботи ----------
export const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
export type CafeOrder = { text: string; items: string[] };
export const CAFE_FOOD = ['bread', 'cheese', 'ham', 'tomato', 'lettuce', 'egg', 'fish', 'pickles'];
export const CAFE_DRINK = ['tea', 'coffee', 'orange juice', 'milk', 'hot chocolate', 'lemonade'];
export const FRUIT = ['apples', 'bananas', 'oranges', 'pears', 'lemons', 'strawberries'];
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
const NAMES = ['Mr Fluff', 'Lily', 'Captain Paws', 'Grandma Whiskers', 'Tom', 'Daisy', 'Professor Meow', 'Ruby'];

export function cafeOrder(level: number): CafeOrder & { who: string } {
  const n = level < 2 ? 2 : 3;
  const food = shuffle(CAFE_FOOD).slice(0, n);
  const drink = pick(CAFE_DRINK);
  const list = food.length === 2 ? `${food[0]} and ${food[1]}` : `${food[0]}, ${food[1]} and ${food[2]}`;
  const starts = ['Hi! Can I have a sandwich with', 'Hello! I would like a sandwich with', 'Good morning! A sandwich with', 'Hi there! Could you make me a sandwich with'];
  const ends = [`, and a ${drink}, please.`, `. And a ${drink}, please!`, `, please. Oh, and a ${drink}.`];
  return { who: pick(NAMES), text: `${pick(starts)} ${list}${pick(ends)}`, items: [...food, drink].sort() };
}
export function fruitOrder(level: number) {
  const kinds = shuffle(FRUIT).slice(0, level < 2 ? 2 : 3);
  const want: Record<string, number> = {};
  kinds.forEach((k) => { want[k] = 1 + Math.floor(Math.random() * 5); });
  const parts = kinds.map((k) => (want[k] === 1 ? `one ${single(k)}` : `${NUM[want[k]]} ${k}`));
  const list = parts.length === 2 ? `${parts[0]} and ${parts[1]}` : `${parts[0]}, ${parts[1]} and ${parts[2]}`;
  const starts = ["I'd like", 'Can I have', 'Could I get', 'Please give me'];
  return { who: pick(NAMES), text: `${pick(starts)} ${list}, please.`, want };
}
export function single(k: string) {
  const m: Record<string, string> = { apples: 'apple', bananas: 'banana', oranges: 'orange', pears: 'pear', lemons: 'lemon', strawberries: 'strawberry' };
  return m[k] ?? k;
}
export function deliveryTask(): { addr: Addr; text: string; who: string } {
  const a = pick(ADDRS);
  const forms = [
    `Please take this parcel to number ${a.no}, ${a.street}. It's ${a.near}.`,
    `This box is for number ${a.no}, ${a.street}. You can find it ${a.near.replace(/^the house /, 'easily: it is the house ')}.`,
    `Can you deliver this letter? The address is ${a.no} ${a.street}. It's ${a.near}.`,
  ];
  return { addr: a, text: pick(forms), who: 'Postmaster Pepper' };
}
