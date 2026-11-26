import { HOME_ITEMS } from './home-items';
// «Murly Island»: власна гра Murly у жанрі «живи на острові й працюй». Усе в грі англійською.
// Персонаж, тварини, транспорт і частина речей малюються кодом; будинки й дерева з наборів CC0 (Kenney, KayKit).

export type Cat = 'Clothes' | 'Home' | 'Transport' | 'Pets' | 'Style';
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
  { id: 'yard-garden', en: 'vegetable garden', cat: 'Home', sub: 'yard', price: 30 },
  // транспорт
  { id: 'ride-skate', en: 'skateboard', cat: 'Transport', sub: 'ride', price: 40 },
  { id: 'ride-bike', en: 'bicycle', cat: 'Transport', sub: 'ride', price: 90 },
  { id: 'ride-scooter', en: 'scooter', cat: 'Transport', sub: 'ride', price: 160 },
  { id: 'ride-car', en: 'little car', cat: 'Transport', sub: 'ride', price: 300 },
  { id: 'ride-hatch', en: 'red hatchback', cat: 'Transport', sub: 'ride', price: 220 },
  { id: 'ride-sedan', en: 'family car', cat: 'Transport', sub: 'ride', price: 260 },
  { id: 'ride-wagon', en: 'big estate car', cat: 'Transport', sub: 'ride', price: 320 },
  { id: 'ride-yellow', en: 'yellow taxi', cat: 'Transport', sub: 'ride', price: 350 },
  { id: 'ride-police', en: 'police car', cat: 'Transport', sub: 'ride', price: 450 },
  { id: 'ride-ufo', en: 'flying saucer', cat: 'Transport', sub: 'ride', price: 600 },
  // улюбленці
  { id: 'pet-chick', en: 'chick', cat: 'Pets', sub: 'pet', price: 50 },
  { id: 'pet-bunny', en: 'bunny', cat: 'Pets', sub: 'pet', price: 80 },
  { id: 'pet-puppy', en: 'puppy', cat: 'Pets', sub: 'pet', price: 120 },
  { id: 'pet-hamster', en: 'hamster', cat: 'Pets', sub: 'pet', price: 60 },
  { id: 'pet-turtle', en: 'turtle', cat: 'Pets', sub: 'pet', price: 70 },
  { id: 'pet-kitten', en: 'kitten', cat: 'Pets', sub: 'pet', price: 100 },
  { id: 'pet-parrot', en: 'parrot', cat: 'Pets', sub: 'pet', price: 140 },
  { id: 'pet-dragon', en: 'baby dragon', cat: 'Pets', sub: 'pet', price: 250 },
];
export const SPEED: Record<string, number> = { 'ride-skate': 1.6, 'ride-bike': 2.0, 'ride-scooter': 2.4, 'ride-car': 3.0, 'ride-hatch': 3.0, 'ride-sedan': 3.1, 'ride-wagon': 3.1, 'ride-yellow': 3.2, 'ride-taxi': 3.0, 'ride-police': 3.3, 'ride-ufo': 3.4 };
export const CARS = ['ride-car', 'ride-hatch', 'ride-sedan', 'ride-wagon', 'ride-yellow', 'ride-taxi', 'ride-police', 'ride-ufo'];

export type Outfit = { fur: string; hat?: string; glasses?: string; scarf?: string; bag?: string; hair?: string; hairC?: string; top?: string; topC?: string; bottom?: string; bottomC?: string; shoes?: string; shoesC?: string; hold?: string };
export type RoomItem = { f: string; x: number; z: number; r: number };
export type Daily = { date: string; ids: string[]; prog: Record<string, number>; paid?: boolean };
export type Save = { v: 1; owned: string[]; outfit: Outfit; ride: string | null; pet: string | null; house: number; yard: string[]; jobs: Record<string, number>; name?: string; localCoins?: number; stars?: string[]; starBonus?: boolean; talks?: number;
  furn?: string[]; room?: RoomItem[]; daily?: Daily; fish?: Record<string, number>; badges?: string[];
  prof?: string; friends?: Record<string, number>; needs?: { food: number; energy: number; fun: number }; bag?: Record<string, number>; hero?: string; skills?: Record<string, number>; pantry?: Record<string, number>; props?: { f: string; x: number; y: number; z: number; room: string }[]; garden?: ({ crop: string; at: number; water?: boolean } | null)[]; petName?: string; dialogs?: string[]; pos?: { x: number; z: number; room?: string | null }; tasks?: Record<string, unknown>; last?: { at: string; place: string; doing?: string } };
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

// короткі розмови з жителями: питання і три відповіді, перша правильна (порядок перемішується в грі)
export const TALKS: { q: string; a: string[] }[] = [
  { q: 'Hi! How are you today?', a: ['I’m fine, thanks. And you?', 'I’m twelve years old.', 'Yes, I do.'] },
  { q: 'What a lovely day! Do you like sunny weather?', a: ['Yes, I love it!', 'It’s Monday.', 'No, I haven’t.'] },
  { q: 'Excuse me, where is the Cat Cafe?', a: ['It’s over there, near the fountain.', 'It’s a cat.', 'I’m from London.'] },
  { q: 'Have you ever been to the lighthouse?', a: ['No, I haven’t. Is it far?', 'Yes, I do.', 'I’m going yesterday.'] },
  { q: 'What’s your favourite food?', a: ['Pizza! I love it.', 'Blue.', 'At seven o’clock.'] },
  { q: 'I’ve lost my keys! Can you help me?', a: ['Of course! Where did you see them last?', 'No, thanks, I’m full.', 'They are tall.'] },
  { q: 'What are you doing on the island?', a: ['I’m working at the post office.', 'I work yesterday.', 'It’s eleven o’clock.'] },
  { q: 'Nice hat! Where did you buy it?', a: ['Thanks! At the Murly Store.', 'It’s very hot.', 'Twice a week.'] },
  { q: 'Would you like a cup of tea?', a: ['Yes, please. That’s very kind.', 'Yes, I would like it yesterday.', 'I’m a cat.'] },
  { q: 'What time is it, please?', a: ['It’s half past three.', 'It’s Tuesday.', 'It’s a clock.'] },
  { q: 'Can you swim?', a: ['Yes, I can. I swim every summer.', 'Yes, I am.', 'No, I don’t can.'] },
  { q: 'What did you do yesterday?', a: ['I delivered three parcels.', 'I deliver tomorrow.', 'I am delivering yesterday.'] },
];


// ---------- нові місця на острові ----------
export const PLACES = {
  bakery: { x: -30, z: -30, label: 'BAKERY', color: '#C8925A' },
  boutique: { x: 30, z: -34, label: 'BOUTIQUE', color: '#30A46C' },
  taxi: { x: 13, z: -10, label: 'TAXI', color: '#FFC53D' },
  pier: { x: 0, z: -80, label: 'FISHING PIER', color: '#3E7BFA' },
  icecream: { x: -18, z: -62, label: 'ICE CREAM', color: '#F76AA8' },
  board: { x: -9, z: -6, label: 'NOTICE BOARD', color: '#8B5E34' },
  school: { x: -26, z: -48, label: 'MURLY SCHOOL', color: '#7C66DC' },
  supermarket: { x: 36, z: 46, label: 'SUPERMARKET', color: '#E5484D' },
};

// ---------- пекарня: торт за замовленням ----------
export const FLAVOURS = [
  { id: 'chocolate', color: '#7A4E25' }, { id: 'strawberry', color: '#F7A1B5' }, { id: 'vanilla', color: '#FFF1C9' },
  { id: 'lemon', color: '#FFE36B' }, { id: 'blueberry', color: '#8C8CE8' }, { id: 'mint', color: '#A8EBCB' },
];
export const TOPPINGS = ['cherries', 'candles', 'sprinkles', 'strawberries', 'a star', 'chocolate hearts'];
export type CakeOrder = { who: string; text: string; flavour: string; layers: number; topping: string };
export function cakeOrder(level: number): CakeOrder {
  const flavour = pick(FLAVOURS).id; const layers = 1 + Math.floor(Math.random() * (level < 2 ? 2 : 3)); const topping = pick(TOPPINGS);
  const L = layers === 1 ? 'a one-layer' : `a ${NUM[layers]}-layer`;
  const forms = [
    `Hello! I'd like ${L} ${flavour} cake with ${topping} on top, please.`,
    `It's my sister's birthday! Can you make ${L} ${flavour} cake? Put ${topping} on top, please.`,
    `Hi! Could I have a ${flavour} cake with ${NUM[layers]} ${layers === 1 ? 'layer' : 'layers'} and ${topping}?`,
    `Good afternoon! I need a cake for a party: ${flavour}, ${NUM[layers]} ${layers === 1 ? 'layer' : 'layers'}, with ${topping}.`,
  ];
  return { who: pick(NAMES), text: pick(forms), flavour, layers, topping };
}

// ---------- бутик: одяг за описом ----------
export const CLOTHES = ['T-shirt', 'jumper', 'jacket', 'dress', 'jeans', 'skirt', 'shorts', 'trousers', 'shoes', 'hat'];
export const COLOURS = [
  { id: 'red', c: '#E5484D' }, { id: 'blue', c: '#3E7BFA' }, { id: 'green', c: '#30A46C' }, { id: 'yellow', c: '#FFC53D' },
  { id: 'black', c: '#2B2B2B' }, { id: 'white', c: '#FFFFFF' }, { id: 'pink', c: '#F76AA8' }, { id: 'purple', c: '#7C66DC' },
];
export type DressOrder = { who: string; text: string; items: string[] };
export function dressOrder(level: number): DressOrder {
  const tops = ['T-shirt', 'jumper', 'jacket', 'dress'], bottoms = ['jeans', 'skirt', 'shorts', 'trousers'], extra = ['shoes', 'hat'];
  const top = pick(tops);
  const parts = [top]; if (top !== 'dress') parts.push(pick(bottoms)); if (level >= 2 || top === 'dress') parts.push(pick(extra));
  const cols = shuffle(COLOURS.map((c) => c.id));
  const items = parts.map((p, i) => `${cols[i]} ${p}`);
  const art = (x: string) => (/(jeans|shorts|trousers|shoes)$/.test(x) ? x : `${/^[aeiou]/.test(x) ? 'an' : 'a'} ${x}`);
  const words = items.map(art);
  const list = words.length === 2 ? `${words[0]} and ${words[1]}` : `${words[0]}, ${words[1]} and ${words[2]}`;
  const forms = [`Hi! I'm looking for ${list}.`, `I'm going to a party tonight. Can you find me ${list}, please?`, `Hello! I'd like to try on ${list}.`, `Excuse me, have you got ${list}?`];
  return { who: pick(NAMES), text: pick(forms), items: items.sort() };
}

// ---------- таксі: відвези пасажира ----------
export type Dest = { id: string; x: number; z: number; name: string; desc: string };
export const DESTS: Dest[] = [
  { id: 'lighthouse', x: 56, z: -37, name: 'the lighthouse', desc: 'the tall red and white tower near the sea' },
  { id: 'fountain', x: 0, z: 6, name: 'the fountain', desc: 'the place in the middle of the town with water and a cat statue' },
  { id: 'playground', x: -28, z: 14, name: 'the playground', desc: 'the place where children play on a slide and a swing' },
  { id: 'oak', x: -46, z: -9, name: 'the big oak tree', desc: 'the biggest tree on the island, on Sunny Street' },
  { id: 'cafe', x: 18, z: -10.4, name: 'the Cat Cafe', desc: 'the place where you can eat a sandwich and drink tea' },
  { id: 'market', x: -18, z: 11.5, name: 'the Fruit Market', desc: 'the place where you can buy apples and bananas' },
  { id: 'post', x: -18, z: -10.4, name: 'the Post Office', desc: 'the place where you can send letters and parcels' },
  { id: 'bakery', x: -30, z: -24.4, name: 'the Bakery', desc: 'the place where they make bread and birthday cakes' },
  { id: 'boutique', x: 30, z: -28.4, name: 'the Boutique', desc: 'the shop where you can buy a dress or a jacket' },
  { id: 'store', x: 18, z: 10.4, name: 'the Murly Store', desc: 'the shop where you can buy a bike, a house or a pet' },
  { id: 'pier', x: 0, z: -70, name: 'the fishing pier', desc: 'the place on the beach where cats catch fish' },
  { id: 'supermarket', x: 36, z: 40.4, name: 'the supermarket', desc: 'the big shop where you can buy food for your kitchen' },
  { id: 'school', x: -26, z: -42.4, name: 'Murly School', desc: 'the place where young cats learn English with Miss Apple' },
];
export function taxiTask(level: number): { who: string; text: string; dest: Dest } {
  const d = pick(DESTS);
  const hard = level >= 2 && Math.random() < 0.6;
  const forms = hard
    ? [`Hello! Please take me to ${d.desc}.`, `I don't remember the name, but I need to go to ${d.desc}.`, `Can you drive me to ${d.desc}? Thank you!`]
    : [`Hello! Can you take me to ${d.name}, please?`, `Hi! I need to get to ${d.name}. Quickly, please!`, `${d.name[0].toUpperCase()}${d.name.slice(1)}, please. I'm late!`];
  return { who: pick(NAMES), text: pick(forms), dest: d };
}

// ---------- риболовля: загадки-визначення ----------
export const RIDDLES: { q: string; a: string; wrong: string[] }[] = [
  { q: 'It is a big animal that lives in the sea. It is grey and very clever. It likes to jump.', a: 'dolphin', wrong: ['horse', 'parrot', 'snail'] },
  { q: 'You wear them on your feet when you go to the beach.', a: 'sandals', wrong: ['gloves', 'glasses', 'scarf'] },
  { q: 'It is yellow and hot. You can see it in the sky during the day.', a: 'sun', wrong: ['moon', 'cloud', 'rain'] },
  { q: 'You use it to dry yourself after a swim.', a: 'towel', wrong: ['spoon', 'pillow', 'umbrella'] },
  { q: 'It has eight legs and lives in the sea.', a: 'octopus', wrong: ['spider', 'crab', 'shark'] },
  { q: 'You use it when it rains, so you do not get wet.', a: 'umbrella', wrong: ['fork', 'map', 'kite'] },
  { q: 'It is a boat with a big white sail.', a: 'sailboat', wrong: ['train', 'bus', 'rocket'] },
  { q: 'It is the opposite of "full".', a: 'empty', wrong: ['heavy', 'quiet', 'tall'] },
  { q: 'A person who catches fish.', a: 'fisherman', wrong: ['baker', 'teacher', 'driver'] },
  { q: 'It is small, it has shells and lives on the beach. It walks to the side.', a: 'crab', wrong: ['frog', 'snake', 'mouse'] },
  { q: 'The meal you have in the morning.', a: 'breakfast', wrong: ['dinner', 'lunch', 'dessert'] },
  { q: 'You see it at night. Sometimes it is round, sometimes it is thin.', a: 'moon', wrong: ['sun', 'star', 'lamp'] },
  { q: 'A very big fish with many teeth. Many people are afraid of it.', a: 'shark', wrong: ['goldfish', 'duck', 'whale'] },
  { q: 'It is the opposite of "deep".', a: 'shallow', wrong: ['wide', 'early', 'soft'] },
  { q: 'You put it on your skin so the sun does not burn you.', a: 'sun cream', wrong: ['toothpaste', 'butter', 'soap'] },
  { q: 'Water falls from the sky. What is the weather like?', a: 'rainy', wrong: ['sunny', 'windy', 'snowy'] },
  { q: 'A building with a strong light that helps ships at night.', a: 'lighthouse', wrong: ['library', 'hospital', 'castle'] },
  { q: 'A long piece of sand next to the sea.', a: 'beach', wrong: ['forest', 'mountain', 'desert'] },
];
export const FISH = [
  { id: 'sardine', en: 'sardine', color: '#B8C2CC', rare: 0 }, { id: 'mackerel', en: 'mackerel', color: '#5B8FB9', rare: 0 },
  { id: 'clownfish', en: 'clownfish', color: '#F5862D', rare: 0 }, { id: 'pufferfish', en: 'pufferfish', color: '#E8D27A', rare: 1 },
  { id: 'bluetang', en: 'blue tang', color: '#3E7BFA', rare: 1 }, { id: 'octopus', en: 'octopus', color: '#C9608A', rare: 1 },
  { id: 'swordfish', en: 'swordfish', color: '#55606E', rare: 2 }, { id: 'goldfish', en: 'golden fish', color: '#FFC53D', rare: 3 },
];
export function catchFish() { const r = Math.random(); const tier = r < 0.55 ? 0 : r < 0.87 ? 1 : r < 0.97 ? 2 : 3; return pick(FISH.filter((f) => f.rare === tier)); }

// ---------- меблі для дому всередині (Kenney Furniture Kit, CC0) ----------
export const FURN: { f: string; en: string; price: number }[] = [
  { f: 'rugRound', en: 'round rug', price: 10 }, { f: 'pottedPlant', en: 'plant', price: 10 }, { f: 'lampRoundFloor', en: 'floor lamp', price: 15 },
  { f: 'chair', en: 'chair', price: 10 }, { f: 'tableRound', en: 'round table', price: 20 }, { f: 'loungeSofa', en: 'sofa', price: 35 },
  { f: 'loungeChair', en: 'armchair', price: 25 }, { f: 'tableCoffee', en: 'coffee table', price: 15 }, { f: 'televisionModern', en: 'TV', price: 40 },
  { f: 'cabinetTelevision', en: 'TV stand', price: 20 }, { f: 'bookcaseOpen', en: 'bookcase', price: 25 }, { f: 'bedSingle', en: 'bed', price: 40 },
  { f: 'bedBunk', en: 'bunk bed', price: 60 }, { f: 'cabinetBed', en: 'bedside table', price: 10 }, { f: 'bear', en: 'teddy bear', price: 15 },
  { f: 'desk', en: 'desk', price: 25 }, { f: 'chairDesk', en: 'office chair', price: 20 }, { f: 'computerScreen', en: 'computer', price: 45 },
  { f: 'kitchenFridge', en: 'fridge', price: 40 }, { f: 'kitchenStove', en: 'cooker', price: 35 }, { f: 'kitchenSink', en: 'sink', price: 25 },
  { f: 'kitchenCabinet', en: 'kitchen cabinet', price: 20 }, { f: 'speaker', en: 'speaker', price: 20 }, { f: 'radio', en: 'radio', price: 15 },
  { f: 'bathtub', en: 'bath', price: 50 }, { f: 'toilet', en: 'toilet', price: 20 }, { f: 'washer', en: 'washing machine', price: 35 },
  { f: 'coatRackStanding', en: 'coat stand', price: 10 }, { f: 'rugRectangle', en: 'rug', price: 10 }, { f: 'lampRoundTable', en: 'table lamp', price: 10 },
];

// ---------- щоденні завдання ----------
export const MISSIONS: { id: string; en: string; n: number }[] = [
  { id: 'post', en: 'Deliver {n} parcels', n: 2 }, { id: 'cafe', en: 'Make {n} sandwiches at the Cat Cafe', n: 2 },
  { id: 'market', en: 'Help {n} customers at the Fruit Market', n: 2 }, { id: 'bakery', en: 'Bake {n} cakes', n: 2 },
  { id: 'boutique', en: 'Dress {n} customers at the Boutique', n: 2 }, { id: 'taxi', en: 'Drive {n} passengers in the taxi', n: 2 },
  { id: 'fish', en: 'Catch {n} fish at the pier', n: 3 }, { id: 'chat', en: 'Have {n} good chats with cats', n: 3 },
  { id: 'icecream', en: 'Sell {n} ice creams on the beach', n: 2 }, { id: 'lost', en: 'Find {n} lost things', n: 2 },
  { id: 'errand', en: 'Help Grandma Rose {n} times', n: 2 }, { id: 'keeper', en: 'Answer {n} questions at the lighthouse', n: 3 },
  { id: 'school', en: 'Have {n} lessons at Murly School', n: 1 }, { id: 'treasure', en: 'Find {n} treasure chest', n: 1 },
];
export function todayKey() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
export function dailyFor(date: string): Daily {
  let h = 7; for (const ch of date) h = (Math.imul(h, 31) + ch.charCodeAt(0)) >>> 0;
  const pool = MISSIONS.map((m) => m.id); const ids: string[] = [];
  // детермінований вибір трьох різних завдань без нескінченного циклу
  for (let i = 0; i < 3; i++) { h = (Math.imul(h, 1103515245) + 12345) >>> 0; const rest = pool.filter((x) => !ids.includes(x)); ids.push(rest[(h >>> 8) % rest.length]); }
  return { date, ids, prog: {} };
}

// ---------- нагороди ----------
export type Badge = { id: string; en: string; what: string; need: number; of: (s: Save) => number };
export const BADGES: Badge[] = [
  { id: 'b-post', en: 'Postal hero', what: 'Deliver 10 parcels', need: 10, of: (s) => s.jobs.post ?? 0 },
  { id: 'b-cafe', en: 'Top chef', what: 'Make 10 sandwiches', need: 10, of: (s) => s.jobs.cafe ?? 0 },
  { id: 'b-market', en: 'Fruit expert', what: 'Help 10 market customers', need: 10, of: (s) => s.jobs.market ?? 0 },
  { id: 'b-bakery', en: 'Master baker', what: 'Bake 10 cakes', need: 10, of: (s) => s.jobs.bakery ?? 0 },
  { id: 'b-boutique', en: 'Fashion star', what: 'Dress 10 customers', need: 10, of: (s) => s.jobs.boutique ?? 0 },
  { id: 'b-taxi', en: 'Taxi pro', what: 'Drive 10 passengers', need: 10, of: (s) => s.jobs.taxi ?? 0 },
  { id: 'b-fish', en: 'Fisher cat', what: 'Catch 15 fish', need: 15, of: (s) => Object.values(s.fish ?? {}).reduce((a, b) => a + b, 0) },
  { id: 'b-album', en: 'Collector', what: 'Catch every kind of fish', need: 8, of: (s) => Object.keys(s.fish ?? {}).length },
  { id: 'b-stars', en: 'Star hunter', what: 'Find all 10 stars', need: 10, of: (s) => (s.stars ?? []).length },
  { id: 'b-chat', en: 'Chatterbox', what: 'Have 15 good chats', need: 15, of: (s) => s.talks ?? 0 },
  { id: 'b-ice', en: 'Ice cream king', what: 'Sell 10 ice creams', need: 10, of: (s) => s.jobs.icecream ?? 0 },
  { id: 'b-lost', en: 'Detective', what: 'Find 10 lost things', need: 10, of: (s) => s.jobs.lost ?? 0 },
  { id: 'b-errand', en: 'Good neighbour', what: 'Help Grandma Rose 10 times', need: 10, of: (s) => s.jobs.errand ?? 0 },
  { id: 'b-keeper', en: 'Weather expert', what: 'Answer 15 lighthouse questions', need: 15, of: (s) => s.jobs.keeper ?? 0 },
  { id: 'b-school', en: 'Top student', what: 'Have 10 lessons at school', need: 10, of: (s) => s.jobs.school ?? 0 },
  { id: 'b-treasure', en: 'Treasure hunter', what: 'Find 5 treasure chests', need: 5, of: (s) => s.jobs.treasure ?? 0 },
  { id: 'b-home', en: 'Home designer', what: 'Put 8 things in your room', need: 8, of: (s) => (s.room ?? []).length },
];


// ---------- морозиво ----------
export const ICE = [
  { id: 'chocolate', c: '#7A4E25' }, { id: 'vanilla', c: '#FFF1C9' }, { id: 'strawberry', c: '#F7A1B5' },
  { id: 'mint', c: '#A8EBCB' }, { id: 'lemon', c: '#FFE36B' }, { id: 'banana', c: '#FFF3A6' },
];
export const ICE_TOP = ['sprinkles', 'chocolate sauce', 'a cherry', 'nothing on top'];
export type IceOrder = { who: string; text: string; scoops: string[]; cone: boolean; top: string };
export function iceOrder(level: number): IceOrder {
  const n = 1 + Math.floor(Math.random() * (level < 2 ? 2 : 3));
  const scoops = Array.from({ length: n }, () => pick(ICE).id);
  const cone = Math.random() < 0.5; const top = pick(ICE_TOP);
  const cnt: Record<string, number> = {}; scoops.forEach((x) => { cnt[x] = (cnt[x] ?? 0) + 1; });
  const parts = Object.entries(cnt).map(([k, v]) => `${NUM[v]} ${k}`);
  const fl = parts.length === 1 ? `${parts[0]}` : parts.length === 2 ? `${parts[0]} and ${parts[1]}` : `${parts[0]}, ${parts[1]} and ${parts[2]}`;
  const sc = n === 1 ? 'scoop' : 'scoops';
  const topT = top === 'nothing on top' ? 'with nothing on top' : `with ${top}`;
  const forms = [
    `Hi! Can I have ${fl} ${sc} in a ${cone ? 'cone' : 'cup'} ${topT}, please?`,
    `It's so hot today! I'd like ${fl} ${sc}, in a ${cone ? 'cone' : 'cup'}, ${topT}.`,
    `Hello! ${fl[0].toUpperCase()}${fl.slice(1)} ${sc} please. A ${cone ? 'cone' : 'cup'}, ${topT}.`,
  ];
  return { who: pick(NAMES), text: pick(forms), scoops: [...scoops].sort(), cone, top };
}

// ---------- бюро знахідок: предлоги місця ----------
export const LOST_THINGS = [
  { id: 'umbrella', en: 'red umbrella', c: '#E5484D' }, { id: 'bear', en: 'teddy bear', c: '#C68A4A' }, { id: 'ball', en: 'blue ball', c: '#3E7BFA' },
  { id: 'kite', en: 'yellow kite', c: '#FFC53D' }, { id: 'hat', en: 'green hat', c: '#30A46C' }, { id: 'bag', en: 'pink bag', c: '#F76AA8' },
];
export const LOST_PLACES = [
  { x: -29, z: 13, en: 'under the slide at the playground' }, { x: 4.4, z: 2.4, en: 'next to the fountain' },
  { x: -18, z: 19.8, en: 'behind the Fruit Market' }, { x: 51, z: -38, en: 'near the lighthouse' },
  { x: 3.2, z: -67, en: 'on the beach, next to the pier' }, { x: -44, z: -12, en: 'under the big oak tree' },
  { x: 9.5, z: 1.8, en: 'next to the bench near the fountain' }, { x: -26.5, z: -23, en: 'in front of the Bakery' },
  { x: 18, z: 22.5, en: 'behind the Murly Store' }, { x: 16.5, z: -7, en: 'near the taxi stand' },
  { x: -15, z: -58, en: 'next to the ice cream stand' }, { x: 27, z: -27, en: 'in front of the Boutique' },
];
export type LostTask = { who: string; text: string; thing: (typeof LOST_THINGS)[number]; place: (typeof LOST_PLACES)[number] };
export function lostTask(): LostTask {
  const thing = pick(LOST_THINGS), place = pick(LOST_PLACES); const who = pick(NAMES);
  const forms = [`LOST: my ${thing.en}! I think I left it ${place.en}. Please bring it to this board. ${who}`,
    `Help! I can't find my ${thing.en}. I was ${place.en} this morning. Can you look for it? ${who}`,
    `Has anyone seen my ${thing.en}? Maybe it's ${place.en}. Thank you! ${who}`];
  return { who, text: pick(forms), thing, place };
}

// ---------- доручення бабусі Роуз ----------
export const ERRANDS = [
  { at: 'market', place: 'Fruit Market', item: 'three apples' }, { at: 'market', place: 'Fruit Market', item: 'some bananas' },
  { at: 'bakery', place: 'Bakery', item: 'a loaf of bread' }, { at: 'bakery', place: 'Bakery', item: 'a chocolate cake' },
  { at: 'cafe', place: 'Cat Cafe', item: 'a cup of hot tea' }, { at: 'cafe', place: 'Cat Cafe', item: 'a cheese sandwich' },
  { at: 'post', place: 'Post Office', item: 'my letters' }, { at: 'store', place: 'Murly Store', item: 'new batteries for my radio' },
  { at: 'boutique', place: 'Boutique', item: 'a warm scarf' }, { at: 'icecream', place: 'ice cream stand', item: 'a vanilla ice cream' },
];
export function errandTask() {
  const e = pick(ERRANDS);
  const forms = [`Hello, dear! Could you go to the ${e.place} and get me ${e.item}, please?`, `Oh, I'm so tired today. Can you bring me ${e.item} from the ${e.place}?`, `Would you be a darling and fetch ${e.item} from the ${e.place} for me?`];
  return { ...e, text: pick(forms) };
}

// ---------- питання на маяку: час, погода, що навколо ----------
const W = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
export function timeWords(h: number) { const hh = Math.floor(h) % 12; return h % 1 ? `It's half past ${W[hh]}.` : `It's ${W[hh]} o'clock.`; }
export function keeperQuestion(hour: number, rain: boolean): { q: string; a: string; opts: string[] } {
  const night = hour >= 20 || hour < 6;
  const qs = [
    () => { const a = timeWords(hour); const o = [a, timeWords((hour + 1.5) % 24), timeWords((hour + 3) % 24), timeWords((hour + 22.5) % 24)]; return { q: 'Look at the clock at the top of the screen. What time is it now?', a, opts: o }; },
    () => { const a = rain ? "It's raining." : night ? "It's a clear night." : "It's sunny."; return { q: "What's the weather like now?", a, opts: [a, ...["It's snowing.", "It's very foggy.", rain ? "It's sunny." : "It's raining."]] }; },
    () => { const a = night ? "It's night-time." : hour < 12 ? "It's morning." : hour < 17 ? "It's afternoon." : "It's evening."; return { q: 'Is it morning, afternoon, evening or night now?', a, opts: [...new Set([a, "It's morning.", "It's afternoon.", "It's evening.", "It's night-time."])].slice(0, 4) }; },
    () => ({ q: 'How many sailboats can you see on the sea around the island?', a: 'Three.', opts: ['Three.', 'One.', 'Five.', 'Ten.'] }),
    () => ({ q: 'What colour is my lighthouse?', a: 'Red and white.', opts: ['Red and white.', 'Blue and green.', 'Black.', 'Yellow and pink.'] }),
    () => ({ q: 'Ships need my light at night. When do I turn it on?', a: 'When it gets dark.', opts: ['When it gets dark.', 'At breakfast.', 'When it is sunny.', 'Never.'] }),
    () => ({ q: night ? 'What can you see in the sky now?' : 'What can you see in the sky during the day?', a: night ? 'The moon and the stars.' : 'The sun and clouds.', opts: ['The moon and the stars.', 'The sun and clouds.', 'A rainbow and snow.', 'Fish and boats.'] }),
    () => ({ q: 'What do you need when it rains?', a: 'An umbrella.', opts: ['An umbrella.', 'Sunglasses.', 'A swimsuit.', 'Sun cream.'] }),
  ];
  const r = pick(qs)(); r.opts = [...new Set(r.opts)].sort(() => Math.random() - 0.5); return r;
}


// ---------- зовнішність: зачіски, одяг, взуття, речі в лапках ----------
export type StylePart = 'hair' | 'top' | 'bottom' | 'shoes' | 'hold';
export const STYLE: { id: string; part: StylePart; en: string; price: number }[] = [
  { id: 'hair-none', part: 'hair', en: 'no hair', price: 0 }, { id: 'hair-short', part: 'hair', en: 'short hair', price: 0 }, { id: 'hair-spiky', part: 'hair', en: 'spiky hair', price: 0 },
  { id: 'hair-curly', part: 'hair', en: 'curly hair', price: 10 }, { id: 'hair-bob', part: 'hair', en: 'bob', price: 10 }, { id: 'hair-pony', part: 'hair', en: 'ponytail', price: 10 },
  { id: 'hair-bun', part: 'hair', en: 'bun', price: 10 }, { id: 'hair-pigtails', part: 'hair', en: 'pigtails', price: 15 }, { id: 'hair-mohawk', part: 'hair', en: 'mohawk', price: 20 }, { id: 'hair-long', part: 'hair', en: 'long hair', price: 15 },
  { id: 'top-none', part: 'top', en: 'no top', price: 0 }, { id: 'top-tshirt', part: 'top', en: 'T-shirt', price: 0 }, { id: 'top-jumper', part: 'top', en: 'jumper', price: 15 },
  { id: 'top-hoodie', part: 'top', en: 'hoodie', price: 20 }, { id: 'top-jacket', part: 'top', en: 'jacket', price: 25 }, { id: 'top-dress', part: 'top', en: 'dress', price: 25 },
  { id: 'top-stripes', part: 'top', en: 'striped T-shirt', price: 15 }, { id: 'top-overalls', part: 'top', en: 'overalls', price: 20 },
  { id: 'bottom-none', part: 'bottom', en: 'no trousers', price: 0 }, { id: 'bottom-shorts', part: 'bottom', en: 'shorts', price: 0 }, { id: 'bottom-jeans', part: 'bottom', en: 'jeans', price: 15 },
  { id: 'bottom-trousers', part: 'bottom', en: 'trousers', price: 15 }, { id: 'bottom-skirt', part: 'bottom', en: 'skirt', price: 15 },
  { id: 'shoes-none', part: 'shoes', en: 'bare paws', price: 0 }, { id: 'shoes-trainers', part: 'shoes', en: 'trainers', price: 0 }, { id: 'shoes-boots', part: 'shoes', en: 'boots', price: 15 },
  { id: 'shoes-sandals', part: 'shoes', en: 'sandals', price: 10 }, { id: 'shoes-wellies', part: 'shoes', en: 'wellies', price: 15 },
  { id: 'hold-none', part: 'hold', en: 'empty paws', price: 0 }, { id: 'hold-balloon', part: 'hold', en: 'balloon', price: 10 }, { id: 'hold-icecream', part: 'hold', en: 'ice cream', price: 8 },
  { id: 'hold-flower', part: 'hold', en: 'flower', price: 8 }, { id: 'hold-book', part: 'hold', en: 'book', price: 10 }, { id: 'hold-phone', part: 'hold', en: 'phone', price: 20 },
  { id: 'hold-wand', part: 'hold', en: 'magic wand', price: 30 }, { id: 'hold-guitar', part: 'hold', en: 'guitar', price: 40 }, { id: 'hold-umbrella', part: 'hold', en: 'umbrella', price: 15 },
  { id: 'hold-rod', part: 'hold', en: 'fishing rod', price: 20 }, { id: 'hold-cupcake', part: 'hold', en: 'cupcake', price: 8 }, { id: 'hold-teddy', part: 'hold', en: 'teddy bear', price: 15 },
];
export const STYLE_COLOURS = ['#E5484D', '#F5862D', '#FFC53D', '#30A46C', '#3E7BFA', '#7C66DC', '#F76AA8', '#FFFFFF', '#2B2B2B', '#8B5E34', '#55606E', '#8EC9F5'];
export const HAIR_COLOURS = ['#2B2B2B', '#6B4F2A', '#C68A4A', '#F3D27A', '#E5484D', '#F7A8C8', '#8EC9F5', '#B79CF0', '#FFFFFF', '#30A46C'];
export const STARTER = ['hair-none', 'hair-short', 'hair-spiky', 'top-none', 'top-tshirt', 'bottom-none', 'bottom-shorts', 'shoes-none', 'shoes-trainers', 'hold-none'];

// ---------- професії ----------
export type Prof = { id: string; en: string; job: string; uniform: Partial<Outfit>; what: string };
export const PROFS: Prof[] = [
  { id: 'postman', en: 'Postman', job: 'post', uniform: { hat: 'hat-cap', top: 'top-jacket', topC: '#3E7BFA' }, what: 'Deliver parcels and letters.' },
  { id: 'chef', en: 'Chef', job: 'cafe', uniform: { hat: 'hat-chef', top: 'top-jacket', topC: '#FFFFFF' }, what: 'Make sandwiches at the Cat Cafe.' },
  { id: 'baker', en: 'Baker', job: 'bakery', uniform: { hat: 'hat-chef', top: 'top-tshirt', topC: '#F3D27A' }, what: 'Bake cakes at the Bakery.' },
  { id: 'designer', en: 'Fashion designer', job: 'boutique', uniform: { glasses: 'glasses-star', top: 'top-dress', topC: '#F76AA8' }, what: 'Dress customers at the Boutique.' },
  { id: 'driver', en: 'Taxi driver', job: 'taxi', uniform: { hat: 'hat-cap', top: 'top-tshirt', topC: '#FFC53D' }, what: 'Drive passengers around the island.' },
  { id: 'fisher', en: 'Fisher', job: 'fish', uniform: { hat: 'hat-beanie', top: 'top-overalls', topC: '#30A46C', hold: 'hold-rod' }, what: 'Catch fish at the pier.' },
  { id: 'seller', en: 'Ice cream seller', job: 'icecream', uniform: { hat: 'hat-cap', top: 'top-stripes', topC: '#F76AA8' }, what: 'Sell ice cream on the beach.' },
  { id: 'detective', en: 'Detective', job: 'lost', uniform: { hat: 'hat-top', top: 'top-jacket', topC: '#8B5E34', glasses: 'glasses-round' }, what: 'Find lost things.' },
  { id: 'farmer', en: 'Market seller', job: 'market', uniform: { hat: 'hat-flower', top: 'top-overalls', topC: '#F5862D' }, what: 'Sell fruit at the market.' },
];
export const PROF_LEVELS = [{ n: 0, en: 'Trainee' }, { n: 5, en: 'Junior' }, { n: 15, en: 'Senior' }, { n: 30, en: 'Master' }, { n: 60, en: 'Legend' }];
export function profLevel(count: number) { let l = PROF_LEVELS[0], i = 0; PROF_LEVELS.forEach((x, k) => { if (count >= x.n) { l = x; i = k; } }); return { ...l, i, next: PROF_LEVELS[i + 1] }; }


// ---------- як у Sims: потреби, їжа, рецепти, дружба ----------
export const FOODS: { id: string; en: string; a: string; food: number; c: string }[] = [
  { id: 'apple', en: 'apple', a: 'an', food: 12, c: '#E5484D' }, { id: 'banana', en: 'banana', a: 'a', food: 12, c: '#FFD84D' },
  { id: 'yogurt', en: 'yogurt', a: 'a', food: 15, c: '#FFFFFF' }, { id: 'cheese', en: 'piece of cheese', a: 'a', food: 15, c: '#FFC53D' },
  { id: 'milk', en: 'glass of milk', a: 'a', food: 10, c: '#F4F1E8' }, { id: 'juice', en: 'glass of orange juice', a: 'a', food: 10, c: '#F5862D' },
  { id: 'carrot', en: 'carrot', a: 'a', food: 10, c: '#F5862D' }, { id: 'cake', en: 'slice of cake', a: 'a', food: 20, c: '#F7A1B5' },
  { id: 'sandwich', en: 'sandwich', a: 'a', food: 30, c: '#E8B46A' }, { id: 'cookie', en: 'cookie', a: 'a', food: 8, c: '#C68A4A' },
];
export const FRIDGE = ['apple', 'banana', 'yogurt', 'cheese', 'milk', 'juice', 'carrot', 'cake'];
export const INGREDIENTS = ['flour', 'eggs', 'milk', 'sugar', 'cheese', 'tomato', 'salt', 'water', 'carrots', 'potatoes', 'onion', 'dough', 'tomato sauce', 'ham', 'lettuce', 'cucumber', 'olive oil', 'apple', 'banana', 'strawberries', 'bread', 'butter', 'chocolate', 'rice', 'chicken', 'pepper'];
export const RECIPES: { id: string; en: string; need: string[]; food: number; fun: number; c: string; how: string }[] = [
  { id: 'pancakes', en: 'pancakes', need: ['flour', 'eggs', 'milk', 'sugar'], food: 45, fun: 10, c: '#E8B46A', how: 'Mix the flour, eggs, milk and sugar. Fry them in a pan.' },
  { id: 'omelette', en: 'an omelette', need: ['eggs', 'cheese', 'tomato', 'salt'], food: 40, fun: 5, c: '#FFE36B', how: 'Break the eggs, add cheese, tomato and a little salt.' },
  { id: 'soup', en: 'vegetable soup', need: ['water', 'carrots', 'potatoes', 'onion'], food: 45, fun: 5, c: '#F5862D', how: 'Boil the water, then add carrots, potatoes and an onion.' },
  { id: 'pizza', en: 'a pizza', need: ['dough', 'tomato sauce', 'cheese', 'ham'], food: 55, fun: 15, c: '#E5484D', how: 'Put tomato sauce on the dough, then cheese and ham. Bake it.' },
  { id: 'salad', en: 'a green salad', need: ['lettuce', 'tomato', 'cucumber', 'olive oil'], food: 30, fun: 5, c: '#30A46C', how: 'Cut the lettuce, tomato and cucumber. Add some olive oil.' },
  { id: 'fruitsalad', en: 'a fruit salad', need: ['apple', 'banana', 'strawberries', 'sugar'], food: 30, fun: 10, c: '#F76AA8', how: 'Cut the apple, banana and strawberries. Add a little sugar.' },
  { id: 'toastie', en: 'a cheese toastie', need: ['bread', 'butter', 'cheese', 'ham'], food: 40, fun: 5, c: '#C68A4A', how: 'Butter the bread, add cheese and ham, and toast it.' },
  { id: 'chickenrice', en: 'chicken and rice', need: ['chicken', 'rice', 'onion', 'pepper'], food: 55, fun: 5, c: '#FFF1C9', how: 'Cook the rice. Fry the chicken with an onion and a pepper.' },
  { id: 'cocoa', en: 'hot chocolate', need: ['milk', 'chocolate', 'sugar'], food: 15, fun: 15, c: '#7A4E25', how: 'Warm the milk and add chocolate and sugar.' },
];
export const FRIEND_LEVELS = [{ n: 0, en: 'Stranger' }, { n: 3, en: 'Neighbour' }, { n: 6, en: 'Friend' }, { n: 10, en: 'Good friend' }, { n: 15, en: 'Best friend' }];
export function friendLevel(p: number) { let i = 0; FRIEND_LEVELS.forEach((x, k) => { if (p >= x.n) i = k; }); return { ...FRIEND_LEVELS[i], i, next: FRIEND_LEVELS[i + 1] }; }
// що відбувається під час дії: англійське речення, зміна потреб
export const ACT: Record<string, { say: string; pose: 'sit' | 'sleep' | 'use' | 'swim' | 'swing'; secs: number; food?: number; energy?: number; fun?: number; bubble: string }> = {
  sit: { say: "I'm sitting down and having a rest.", pose: 'sit', secs: 0, energy: 0, bubble: 'Ahh!' },
  sleep: { say: "I'm sleeping. Good night!", pose: 'sleep', secs: 6, energy: 100, bubble: 'Zzz...' },
  tv: { say: "I'm watching my favourite cartoon on TV.", pose: 'use', secs: 5, fun: 30, energy: -3, bubble: 'Ha ha!' },
  read: { say: "I'm reading a book about pirates.", pose: 'use', secs: 5, fun: 20, bubble: 'Hmm...' },
  music: { say: "I'm listening to music and dancing!", pose: 'use', secs: 5, fun: 25, energy: -3, bubble: 'La la la!' },
  bath: { say: "I'm having a bubble bath.", pose: 'use', secs: 5, fun: 15, energy: 5, bubble: 'Splash!' },
  shower: { say: "I'm having a quick shower.", pose: 'use', secs: 4, fun: 10, energy: 5, bubble: 'So fresh!' },
  wash: { say: "I'm washing my hands with soap.", pose: 'use', secs: 3, fun: 3, bubble: 'Clean!' },
  homework: { say: "I'm doing my English homework.", pose: 'use', secs: 5, fun: 5, energy: -3, bubble: 'Done!' },
  coffee: { say: "I'm making a cup of hot chocolate.", pose: 'use', secs: 4, food: 10, fun: 8, bubble: 'Yum!' },
  toast: { say: "I'm making toast for breakfast.", pose: 'use', secs: 4, food: 18, bubble: 'Crunchy!' },
  micro: { say: "I'm heating up some soup.", pose: 'use', secs: 4, food: 25, bubble: 'Yum!' },
  washer: { say: "I'm washing my clothes.", pose: 'use', secs: 4, fun: 3, bubble: 'Whirr!' },
  plant: { say: "I'm watering the plant. It's growing!", pose: 'use', secs: 3, fun: 8, bubble: 'Grow!' },
  hug: { say: "I'm hugging my teddy bear.", pose: 'use', secs: 3, fun: 15, bubble: 'Aww!' },
  marsh: { say: "I'm roasting marshmallows on the campfire.", pose: 'use', secs: 5, food: 15, fun: 20, bubble: 'Yummy!' },
  swing: { say: "I'm swinging high!", pose: 'swing', secs: 0, fun: 0, bubble: 'Wheee!' },
  swim: { say: "I'm swimming in the pool.", pose: 'swim', secs: 6, fun: 30, energy: -6, bubble: 'Splash!' },
  wish: { say: "I'm throwing a coin into the fountain and making a wish.", pose: 'use', secs: 3, fun: 10, bubble: 'Wish!' },
  lamp: { say: "I'm turning on the lamp.", pose: 'use', secs: 1, bubble: 'Click!' },
  piano: { say: "I'm playing the piano.", pose: 'use', secs: 6, fun: 25, bubble: 'Do re mi!' },
  drums: { say: "I'm playing the drums. Boom, boom, crash!", pose: 'use', secs: 5, fun: 25, energy: -4, bubble: 'Boom!' },
  aquarium: { say: "I'm feeding the fish. They swim to the top to eat.", pose: 'use', secs: 3, fun: 10, bubble: 'Hello, fish!' },
  arcade: { say: "I'm playing an arcade game.", pose: 'use', secs: 4, fun: 30, bubble: 'High score!' },
  telescope: { say: "I'm looking through the telescope.", pose: 'use', secs: 4, fun: 15, bubble: 'Wow!' },
  hoops: { say: "I'm playing basketball. I scored three baskets!", pose: 'use', secs: 5, fun: 25, energy: -8, bubble: 'Score!' },
  sunbathe: { say: "I'm lying in the sun on the beach. It's so warm!", pose: 'sleep', secs: 6, energy: 25, fun: 10, bubble: 'Ahh, sunny!' },
  sand: { say: "I'm building a sandcastle with four towers.", pose: 'use', secs: 5, fun: 25, bubble: 'My castle!' },
  picnic: { say: "I'm having a picnic: sandwiches, apples and juice.", pose: 'sit', secs: 5, food: 30, fun: 10, bubble: 'Yummy!' },
  paint: { say: "I'm painting a picture.", pose: 'use', secs: 6, fun: 25, bubble: 'Art!' },
  guitar: { say: "I'm playing the guitar.", pose: 'use', secs: 5, fun: 20, bubble: 'Strum!' },
  computer: { say: "I'm playing a word game on the computer.", pose: 'use', secs: 0, fun: 0, bubble: 'Click!' },
};
export const EMOTES: { id: string; en: string; bubble: string; say: string }[] = [
  { id: 'wave', en: 'Wave', bubble: 'Hi!', say: "I'm waving hello." }, { id: 'dance', en: 'Dance', bubble: 'Yeah!', say: "I'm dancing." },
  { id: 'laugh', en: 'Laugh', bubble: 'Ha ha ha!', say: "I'm laughing." }, { id: 'think', en: 'Think', bubble: 'Hmm...', say: "I'm thinking." },
  { id: 'love', en: 'Love', bubble: 'I love it!', say: 'I love this island!' }, { id: 'sad', en: 'Sad', bubble: 'Oh no...', say: "I'm a bit sad." },
  { id: 'sit', en: 'Sit down', bubble: 'Phew!', say: "I'm sitting on the ground." }, { id: 'sleepy', en: 'Yawn', bubble: 'Yaaawn!', say: "I'm sleepy." },
];


// ---------- каталог меблів: усе з набору + свої речі ----------
export const CODE_FURN = [
  { f: 'x-piano', en: 'piano', price: 60, cat: 'special' }, { f: 'x-easel', en: 'easel for painting', price: 30, cat: 'special' },
  { f: 'x-aquarium', en: 'aquarium', price: 45, cat: 'special' }, { f: 'x-drums', en: 'drum kit', price: 55, cat: 'special' },
  { f: 'x-arcade', en: 'arcade game', price: 70, cat: 'special' }, { f: 'x-telescope', en: 'telescope', price: 50, cat: 'special' },
];
const FCAT: Record<string, string> = Object.fromEntries(HOME_ITEMS.map((h) => [h.file, h.cat]));
export const FURN_ALL: { f: string; en: string; price: number; cat: string }[] = [
  ...FURN.map((x) => ({ ...x, cat: FCAT[x.f] ?? 'decor' })),
  ...HOME_ITEMS.filter((h) => !h.wall && !h.pack && !FURN.some((x) => x.f === h.file)).map((h) => ({ f: h.file, en: h.en, price: h.price || (h.small ? 6 : h.rug ? 8 : 15), cat: h.cat })),
  ...CODE_FURN,
];
export const FURN_CATS = [['living', 'Living room'], ['bedroom', 'Bedroom'], ['kitchen', 'Kitchen'], ['bathroom', 'Bathroom'], ['study', 'Study'], ['decor', 'Decor'], ['special', 'Special']];

// ---------- навички ----------
export const SKILLS = [
  { id: 'cooking', en: 'Cooking' }, { id: 'music', en: 'Music' }, { id: 'reading', en: 'Reading' }, { id: 'art', en: 'Art' },
  { id: 'fitness', en: 'Fitness' }, { id: 'gardening', en: 'Gardening' }, { id: 'social', en: 'Friendship' }, { id: 'games', en: 'Games' },
];
const SK_N = [0, 10, 25, 45, 70, 100, 140, 190, 250, 320];
export function skillLevel(xp: number) { let l = 1; SK_N.forEach((n, i) => { if (xp >= n) l = i + 1; }); return { l, from: SK_N[l - 1], to: SK_N[l] ?? SK_N[SK_N.length - 1] + 100 }; }
export const SKILL_OF: Record<string, [string, number]> = {
  cook: ['cooking', 6], toast: ['cooking', 2], micro: ['cooking', 1], coffee: ['cooking', 2], marsh: ['cooking', 2], picnic: ['cooking', 2],
  music: ['music', 3], piano: ['music', 6], drums: ['music', 5], guitar: ['music', 5],
  read: ['reading', 5], homework: ['reading', 4], telescope: ['reading', 3],
  paint: ['art', 6], sand: ['art', 4],
  hoops: ['fitness', 5], swim: ['fitness', 5], swing: ['fitness', 1], sunbathe: ['fitness', 1],
  garden: ['gardening', 5], plant: ['gardening', 2], aquarium: ['gardening', 2],
  friend: ['social', 3], dialog: ['social', 6],
  computer: ['games', 4], arcade: ['games', 5], tv: ['games', 1],
};

// ---------- вибір усередині дій ----------
export const CHOICES: Record<string, { t: string; say: string; text?: string }[]> = {
  tv: [
    { t: 'Cartoons', say: "I'm watching a funny cartoon about a clumsy dog." },
    { t: 'Nature', say: "I'm watching a nature programme about whales. They are the biggest animals in the world!" },
    { t: 'News', say: "I'm watching the news. The weather will be sunny tomorrow." },
    { t: 'Cooking show', say: "I'm watching a cooking show. They are making a chocolate cake." },
    { t: 'Sport', say: "I'm watching a football match. What a goal!" },
    { t: 'Quiz show', say: "I'm watching a quiz show. I know all the answers!" },
  ],
  read: [
    { t: 'The Lost Treasure', say: "I'm reading an adventure story.", text: 'Captain Paws opened the old map. "Look! The treasure is under the big oak tree," he said. The friends ran to the tree with a spade. They dug and dug, and they found a box full of golden coins!' },
    { t: 'Space Cats', say: "I'm reading a story about cats in space.", text: 'Luna the cat looked out of the rocket window. She could see the Earth. It was blue and green and very small. "Next stop: the Moon!" said the captain. Luna was excited.' },
    { t: 'The Big Book of Animals', say: "I'm reading about animals.", text: 'Elephants are the biggest land animals. They can live for seventy years. They eat leaves, grass and fruit, and they drink a lot of water every day. Baby elephants stay with their mothers for many years.' },
    { t: 'The Funny Joke Book', say: "I'm reading a joke book.", text: 'Why did the cat sit on the computer? Because it wanted to keep an eye on the mouse! What do cats eat for breakfast? Mice Krispies!' },
    { t: 'The Mystery of the Missing Cake', say: "I'm reading a mystery story.", text: 'The chocolate cake was on the table at six o\'clock. At seven o\'clock, it was gone! There were crumbs on the floor and on the sofa. And who had chocolate on his whiskers? Tom!' },
  ],
  music: [
    { t: 'Pop', say: "I'm listening to pop music and singing along." }, { t: 'Rock', say: "I'm listening to loud rock music!" },
    { t: 'Classical', say: "I'm listening to calm classical music." }, { t: 'Jazz', say: "I'm listening to jazz. It's so relaxing." },
    { t: 'Dance', say: "I'm listening to dance music and dancing!" },
  ],
  paint: [
    { t: 'a sunset', say: "I'm painting a beautiful orange sunset over the sea." }, { t: 'my cat', say: "I'm painting a picture of my cat." },
    { t: 'flowers', say: "I'm painting a vase of red and yellow flowers." }, { t: 'the lighthouse', say: "I'm painting the red and white lighthouse." },
    { t: 'a rainbow', say: "I'm painting a rainbow with seven colours." }, { t: 'my friends', say: "I'm painting a picture of my friends." },
  ],
  piano: [
    { t: 'Twinkle, Twinkle, Little Star', say: "I'm playing Twinkle, Twinkle, Little Star on the piano." },
    { t: 'Ode to Joy', say: "I'm playing Ode to Joy on the piano." },
    { t: 'Mary Had a Little Lamb', say: "I'm playing Mary Had a Little Lamb on the piano." },
  ],
  telescope: [
    { t: 'The sky', say: '' }, { t: 'The sea', say: '' },
  ],
};
export const MELODIES: Record<string, number[]> = {
  'Twinkle, Twinkle, Little Star': [60, 60, 67, 67, 69, 69, 67, 0, 65, 65, 64, 64, 62, 62, 60],
  'Ode to Joy': [64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 64, 62, 62],
  'Mary Had a Little Lamb': [64, 62, 60, 62, 64, 64, 64, 0, 62, 62, 62, 0, 64, 67, 67],
};

// ---------- город ----------
export const CROPS = [
  { id: 'lettuce', en: 'lettuce', mins: 2, c: '#7BC86C' }, { id: 'carrot', en: 'carrots', mins: 3, c: '#F5862D' },
  { id: 'tomato', en: 'tomatoes', mins: 4, c: '#E5484D' }, { id: 'strawberry', en: 'strawberries', mins: 5, c: '#F7465E' },
  { id: 'corn', en: 'corn', mins: 6, c: '#FFD84D' }, { id: 'pumpkin', en: 'a pumpkin', mins: 8, c: '#F5862D' },
];
FOODS.push({ id: 'lettuce', en: 'lettuce leaf', a: 'a', food: 6, c: '#7BC86C' }, { id: 'tomato', en: 'tomato', a: 'a', food: 8, c: '#E5484D' }, { id: 'strawberry', en: 'bowl of strawberries', a: 'a', food: 12, c: '#F7465E' }, { id: 'corn', en: 'corn on the cob', a: 'a', food: 15, c: '#FFD84D' }, { id: 'pumpkin', en: 'bowl of pumpkin soup', a: 'a', food: 30, c: '#F5862D' }, { id: 'pizza', en: 'slice of pizza', a: 'a', food: 25, c: '#E5484D' }, { id: 'icecream', en: 'ice cream', a: 'an', food: 12, c: '#F7A1B5' });
export function cropProgress(p: { crop: string; at: number; water?: boolean }, now = Date.now()) { const c = CROPS.find((x) => x.id === p.crop); if (!c) return 1; const need = c.mins * 60000 * (p.water ? 0.6 : 1); return Math.min(1, (now - p.at) / need); }

// ---------- спілкування ----------
export const JOKES = [
  { q: 'What do you call a cat that likes to bowl?', a: 'An alley cat!' },
  { q: 'Why was the cat so good at video games?', a: 'Because it had nine lives!' },
  { q: 'What do you call a fish without an eye?', a: 'A fsh!' },
  { q: 'Why did the teddy bear say no to dessert?', a: 'Because it was already stuffed!' },
  { q: 'What do you call a sleeping dinosaur?', a: 'A dino-snore!' },
  { q: 'Why did the student eat his homework?', a: 'Because the teacher said it was a piece of cake!' },
  { q: 'What has hands but cannot clap?', a: 'A clock!' },
  { q: 'Why are fish so smart?', a: 'Because they live in schools!' },
];
export const COMPLIMENTS = ['I like your hat!', 'You are really funny!', 'You are a great friend.', 'Your fur is so soft and shiny!', 'You are very kind.', 'You have a lovely smile!', 'You are so clever!', 'You are a brilliant dancer!'];
export const RPS = ['rock', 'paper', 'scissors'];


// ---------- школа: граматика й аудіювання ----------
export const GRAMMAR: { right: string; wrong: string[] }[] = [
  { right: 'She goes to school every day.', wrong: ['She go to school every day.', 'She going to school every day.'] },
  { right: 'I am eating an apple now.', wrong: ['I eating an apple now.', 'I am eat an apple now.'] },
  { right: 'We went to the beach yesterday.', wrong: ['We go to the beach yesterday.', 'We goed to the beach yesterday.'] },
  { right: 'There are three cats in the garden.', wrong: ['There is three cats in the garden.', 'There be three cats in the garden.'] },
  { right: 'He has got a red bike.', wrong: ['He have got a red bike.', 'He has get a red bike.'] },
  { right: 'Can you swim?', wrong: ['Do you can swim?', 'Can you to swim?'] },
  { right: 'I have never been to London.', wrong: ['I have never went to London.', 'I never have been to London.'] },
  { right: 'My sister is taller than me.', wrong: ['My sister is more tall than me.', 'My sister is taller that me.'] },
  { right: 'Where do you live?', wrong: ['Where you live?', 'Where does you live?'] },
  { right: "They didn't watch TV last night.", wrong: ["They didn't watched TV last night.", "They don't watched TV last night."] },
  { right: 'This is the best cake in the world!', wrong: ['This is the goodest cake in the world!', 'This is the most good cake in the world!'] },
  { right: 'I will help you tomorrow.', wrong: ['I will helping you tomorrow.', 'I helps you tomorrow.'] },
  { right: 'How much water do you drink?', wrong: ['How many water do you drink?', 'How much waters do you drink?'] },
  { right: 'The children are playing football.', wrong: ['The childrens are playing football.', 'The children is playing football.'] },
  { right: 'Look! It is raining.', wrong: ['Look! It rains now.', 'Look! It raining.'] },
  { right: 'Was she at home on Monday?', wrong: ['Were she at home on Monday?', 'Did she at home on Monday?'] },
];
export const LISTEN_WORDS = ['lighthouse', 'bakery', 'umbrella', 'strawberry', 'butterfly', 'kitchen', 'grandmother', 'sandwich', 'beautiful', 'island', 'pocket', 'rainbow', 'dolphin', 'sunglasses', 'library', 'pumpkin', 'weather', 'breakfast', 'scissors', 'telescope'];

// ---------- полювання за скарбами ----------
export function treasureHunt() {
  const pool = [...LOST_PLACES].sort(() => Math.random() - 0.5).slice(0, 3);
  const lines = ['The first clue is', 'The next clue is', 'The treasure is'];
  return pool.map((p, i) => ({ x: p.x, z: p.z, text: `${lines[i]} ${p.en}.` }));
}


// ---------- супермаркет і продукти ----------
// m: модель з наборів (pack:name) або намальована кодом; c: колір; cat: полиця
export type Product = { id: string; en: string; a: string; price: number; cat: string; c: string; m?: string; food: number };
export const SHELVES: { id: string; en: string; c: string }[] = [
  { id: 'veg', en: 'Fruit and vegetables', c: '#30A46C' }, { id: 'bakery', en: 'Bread and cakes', c: '#C68A4A' },
  { id: 'dairy', en: 'Milk, cheese and eggs', c: '#3E7BFA' }, { id: 'meat', en: 'Meat and fish', c: '#E5484D' },
  { id: 'pantry', en: 'Flour, rice and pasta', c: '#F5862D' }, { id: 'drinks', en: 'Drinks', c: '#8EC9F5' },
  { id: 'snacks', en: 'Snacks and sweets', c: '#F76AA8' }, { id: 'frozen', en: 'Frozen food', c: '#B8E3F5' },
];
export const PRODUCTS: Product[] = [
  { id: 'apple', en: 'apple', a: 'an', price: 1, cat: 'veg', c: '#E5484D', food: 12 }, { id: 'banana', en: 'banana', a: 'a', price: 1, cat: 'veg', c: '#FFD84D', food: 12 },
  { id: 'orange', en: 'orange', a: 'an', price: 1, cat: 'veg', c: '#F5862D', food: 12 }, { id: 'strawberries', en: 'strawberries', a: '', price: 2, cat: 'veg', c: '#F7465E', food: 12 },
  { id: 'tomato', en: 'tomato', a: 'a', price: 1, cat: 'veg', c: '#E5484D', m: 'food:food_ingredient_tomato', food: 8 }, { id: 'cucumber', en: 'cucumber', a: 'a', price: 1, cat: 'veg', c: '#30A46C', food: 6 },
  { id: 'lettuce', en: 'lettuce', a: 'a', price: 1, cat: 'veg', c: '#7BC86C', m: 'food:food_ingredient_lettuce', food: 5 }, { id: 'carrots', en: 'carrot', a: 'a', price: 1, cat: 'veg', c: '#F5862D', m: 'food:food_ingredient_carrot', food: 8 },
  { id: 'potatoes', en: 'potato', a: 'a', price: 1, cat: 'veg', c: '#C8925A', m: 'food:food_ingredient_potato', food: 0 }, { id: 'onion', en: 'onion', a: 'an', price: 1, cat: 'veg', c: '#E8C4A0', m: 'food:food_ingredient_onion', food: 0 },
  { id: 'pepper', en: 'pepper', a: 'a', price: 1, cat: 'veg', c: '#E5484D', food: 5 },
  { id: 'bread', en: 'loaf of bread', a: 'a', price: 1, cat: 'bakery', c: '#C68A4A', food: 15 }, { id: 'bun', en: 'bun', a: 'a', price: 1, cat: 'bakery', c: '#E8B46A', m: 'food:food_ingredient_bun', food: 12 },
  { id: 'croissant', en: 'croissant', a: 'a', price: 2, cat: 'bakery', c: '#E8B46A', food: 15 }, { id: 'cake', en: 'slice of cake', a: 'a', price: 2, cat: 'bakery', c: '#F7A1B5', food: 20 },
  { id: 'cookie', en: 'cookie', a: 'a', price: 1, cat: 'bakery', c: '#C68A4A', m: 'holiday:cookie', food: 8 }, { id: 'dough', en: 'pizza dough', a: '', price: 1, cat: 'bakery', c: '#F3E2C8', food: 0 },
  { id: 'milk', en: 'bottle of milk', a: 'a', price: 1, cat: 'dairy', c: '#FFFFFF', m: 'holiday:milk', food: 10 }, { id: 'cheese', en: 'piece of cheese', a: 'a', price: 1, cat: 'dairy', c: '#FFC53D', m: 'food:food_ingredient_cheese', food: 15 },
  { id: 'butter', en: 'butter', a: '', price: 1, cat: 'dairy', c: '#FFE36B', food: 0 }, { id: 'eggs', en: 'box of eggs', a: 'a', price: 1, cat: 'dairy', c: '#FFF1C9', food: 0 },
  { id: 'yogurt', en: 'yogurt', a: 'a', price: 1, cat: 'dairy', c: '#F7A1B5', food: 15 },
  { id: 'chicken', en: 'chicken', a: '', price: 2, cat: 'meat', c: '#F3D9B1', food: 0 }, { id: 'ham', en: 'ham', a: '', price: 2, cat: 'meat', c: '#F7A1B5', m: 'food:food_ingredient_ham', food: 15 },
  { id: 'steak', en: 'steak', a: 'a', price: 3, cat: 'meat', c: '#B5453A', m: 'food:food_ingredient_steak', food: 0 }, { id: 'fish', en: 'fish', a: 'a', price: 2, cat: 'meat', c: '#8EC9F5', food: 0 },
  { id: 'sausages', en: 'sausages', a: '', price: 2, cat: 'meat', c: '#C8603A', food: 0 },
  { id: 'flour', en: 'bag of flour', a: 'a', price: 1, cat: 'pantry', c: '#FFFFFF', food: 0 }, { id: 'sugar', en: 'bag of sugar', a: 'a', price: 1, cat: 'pantry', c: '#F4F1E8', food: 0 },
  { id: 'salt', en: 'salt', a: '', price: 1, cat: 'pantry', c: '#DCE9F7', food: 0 }, { id: 'rice', en: 'bag of rice', a: 'a', price: 1, cat: 'pantry', c: '#F4F1E8', food: 0 },
  { id: 'pasta', en: 'pasta', a: '', price: 1, cat: 'pantry', c: '#FFD84D', food: 0 }, { id: 'olive oil', en: 'bottle of olive oil', a: 'a', price: 1, cat: 'pantry', c: '#9ACD4C', food: 0 },
  { id: 'chocolate', en: 'bar of chocolate', a: 'a', price: 1, cat: 'pantry', c: '#7A4E25', food: 10 }, { id: 'tomato sauce', en: 'tomato sauce', a: '', price: 1, cat: 'pantry', c: '#E5484D', m: 'food:ketchup', food: 0 },
  { id: 'water', en: 'bottle of water', a: 'a', price: 1, cat: 'drinks', c: '#8EC9F5', food: 3 }, { id: 'juice', en: 'orange juice', a: '', price: 1, cat: 'drinks', c: '#F5862D', food: 10 },
  { id: 'lemonade', en: 'lemonade', a: '', price: 1, cat: 'drinks', c: '#FFF3A6', food: 8 }, { id: 'cocoa', en: 'hot chocolate', a: '', price: 2, cat: 'drinks', c: '#7A4E25', m: 'holiday:hot_chocolate_decorated', food: 15 },
  { id: 'crisps', en: 'bag of crisps', a: 'a', price: 1, cat: 'snacks', c: '#FFC53D', food: 10 }, { id: 'sweets', en: 'bag of sweets', a: 'a', price: 1, cat: 'snacks', c: '#F76AA8', food: 8 },
  { id: 'gingerbread', en: 'gingerbread man', a: 'a', price: 2, cat: 'snacks', c: '#C68A4A', m: 'holiday:gingerbread_man', food: 12 }, { id: 'candy cane', en: 'candy cane', a: 'a', price: 1, cat: 'snacks', c: '#E5484D', m: 'holiday:candycane_small', food: 5 },
  { id: 'icecream', en: 'ice cream', a: 'an', price: 2, cat: 'frozen', c: '#F7A1B5', food: 12 }, { id: 'frozen pizza', en: 'frozen pizza', a: 'a', price: 3, cat: 'frozen', c: '#E5484D', food: 0 },
  { id: 'peas', en: 'frozen peas', a: '', price: 1, cat: 'frozen', c: '#30A46C', food: 0 },
];
export const productOf = (id: string) => PRODUCTS.find((p) => p.id === id);
// стартові продукти в холодильнику, щоб одразу можна було готувати
export const STARTER_PANTRY: Record<string, number> = { eggs: 2, milk: 2, flour: 2, cheese: 2, tomato: 2, bread: 2, butter: 1, apple: 2, sugar: 1, potatoes: 2, carrots: 2, onion: 1 };

// ---------- страви, які виходять на сковорідці (як у Toca Boca) ----------
export const DISHES: { id: string; en: string; need: string[]; food: number; fun: number; m?: string; c: string }[] = [
  { id: 'burger', en: 'a burger', need: ['bun', 'steak', 'cheese', 'lettuce', 'tomato'], food: 60, fun: 15, m: 'food:food_burger', c: '#C68A4A' },
  { id: 'vegburger', en: 'a veggie burger', need: ['bun', 'lettuce', 'tomato', 'cheese'], food: 45, fun: 10, m: 'food:food_vegetableburger', c: '#7BC86C' },
  { id: 'steakdinner', en: 'steak with potatoes', need: ['steak', 'potatoes'], food: 60, fun: 10, m: 'food:food_dinner', c: '#B5453A' },
  { id: 'stew', en: 'a vegetable stew', need: ['potatoes', 'carrots', 'onion'], food: 50, fun: 5, m: 'food:food_stew', c: '#F5862D' },
  { id: 'pancakes', en: 'pancakes', need: ['flour', 'eggs', 'milk'], food: 45, fun: 10, c: '#E8B46A' },
  { id: 'omelette', en: 'an omelette', need: ['eggs', 'cheese'], food: 35, fun: 5, c: '#FFE36B' },
  { id: 'friedegg', en: 'a fried egg', need: ['eggs'], food: 20, fun: 3, c: '#FFF1C9' },
  { id: 'pizza', en: 'a pizza', need: ['dough', 'tomato sauce', 'cheese'], food: 55, fun: 15, c: '#E5484D' },
  { id: 'pasta', en: 'pasta with tomato sauce', need: ['pasta', 'tomato sauce'], food: 50, fun: 5, c: '#FFD84D' },
  { id: 'chips', en: 'chips', need: ['potatoes', 'olive oil'], food: 35, fun: 10, c: '#FFD84D' },
  { id: 'toastie', en: 'a cheese toastie', need: ['bread', 'cheese'], food: 35, fun: 5, c: '#C68A4A' },
  { id: 'grilledfish', en: 'grilled fish', need: ['fish'], food: 40, fun: 5, c: '#8EC9F5' },
  { id: 'chickenrice', en: 'chicken and rice', need: ['chicken', 'rice'], food: 55, fun: 5, c: '#F3D9B1' },
  { id: 'sausagemash', en: 'sausages and mash', need: ['sausages', 'potatoes'], food: 55, fun: 5, c: '#C8603A' },
  { id: 'fruitsalad', en: 'a fruit salad', need: ['apple', 'banana'], food: 30, fun: 10, c: '#F76AA8' },
  { id: 'hotpizza', en: 'a hot pizza', need: ['frozen pizza'], food: 50, fun: 10, c: '#E5484D' },
];
export function cookResult(pan: string[]) {
  const set = new Set(pan);
  const ok = DISHES.filter((d) => d.need.every((n) => set.has(n))).sort((a, b) => b.need.length - a.need.length);
  return ok[0] ?? { id: 'mystery', en: 'a mystery soup', need: [], food: 25, fun: 15, c: '#9ACD4C' };
}
