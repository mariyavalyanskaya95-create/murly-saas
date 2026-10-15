// Предмети для 3D-гри «My home». Моделі: Kenney Furniture Kit (CC0), файли в public/worlds/kenney/m/<file>.glb,
// мініатюри в public/worlds/kenney/t/<file>.png.
export type HomeCat = 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'study' | 'decor';
export type HomeItem = {
  file: string; en: string; uk: string; cat: HomeCat;
  small?: boolean;      // можна ставити на стіл, тумбу, полицю
  surface?: boolean;    // на нього можна ставити дрібні речі
  rug?: boolean;        // лежить на підлозі під іншими речами
  wall?: boolean;       // вішається на стіну
  pack?: 'kaykit';      // модель з KayKit Furniture Bits (CC0), public/worlds/kaykit/<file>.gltf
  paint?: 'fabric' | 'wood' | 'none'; // що фарбується (за замовчуванням тканина, якщо є, інакше дерево)
  price?: number;       // 0 або нема = доступно одразу
};

export const HOME_CATS: { id: HomeCat; label: string; en: string }[] = [
  { id: 'living', label: 'Вітальня', en: 'living room' },
  { id: 'bedroom', label: 'Спальня', en: 'bedroom' },
  { id: 'kitchen', label: 'Кухня', en: 'kitchen' },
  { id: 'bathroom', label: 'Ванна', en: 'bathroom' },
  { id: 'study', label: 'Кабінет', en: 'study' },
  { id: 'decor', label: 'Декор', en: 'decor' },
];

const I = (file: string, en: string, uk: string, cat: HomeCat, o: Partial<HomeItem> = {}): HomeItem => ({ file, en, uk, cat, ...o });

export const HOME_ITEMS: HomeItem[] = [
  // ---------- Вітальня ----------
  I('loungeSofa', 'sofa', 'диван', 'living'),
  I('loungeSofaLong', 'long sofa', 'довгий диван', 'living'),
  I('loungeSofaCorner', 'corner sofa', 'кутовий диван', 'living', { price: 10 }),
  I('loungeDesignSofa', 'modern sofa', 'сучасний диван', 'living', { price: 10 }),
  I('loungeDesignSofaCorner', 'modern corner sofa', 'сучасний кутовий диван', 'living', { price: 15 }),
  I('loungeSofaOttoman', 'footstool', 'пуф', 'living'),
  I('loungeChair', 'armchair', 'крісло', 'living'),
  I('loungeChairRelax', 'relaxing chair', 'крісло для відпочинку', 'living', { price: 10 }),
  I('loungeDesignChair', 'designer chair', 'дизайнерське крісло', 'living', { price: 10 }),
  I('tableCoffee', 'coffee table', 'журнальний столик', 'living', { surface: true }),
  I('tableCoffeeSquare', 'square coffee table', 'квадратний столик', 'living', { surface: true }),
  I('tableCoffeeGlass', 'glass coffee table', 'скляний столик', 'living', { surface: true, price: 5 }),
  I('tableCoffeeGlassSquare', 'square glass table', 'квадратний скляний столик', 'living', { surface: true, price: 5 }),
  I('cabinetTelevision', 'TV stand', 'тумба під телевізор', 'living', { surface: true }),
  I('cabinetTelevisionDoors', 'TV cabinet', 'шафка під телевізор', 'living', { surface: true }),
  I('televisionModern', 'TV', 'телевізор', 'living', { small: true, paint: 'none' }),
  I('televisionVintage', 'old TV', 'старий телевізор', 'living', { small: true, paint: 'none', price: 5 }),
  I('televisionAntenna', 'TV antenna', 'антена', 'living', { small: true, paint: 'none' }),
  I('speaker', 'speaker', 'колонка', 'living', { paint: 'none' }),
  I('speakerSmall', 'small speaker', 'маленька колонка', 'living', { small: true, paint: 'none' }),
  I('bench', 'bench', 'лавка', 'living'),
  I('benchCushion', 'bench with a cushion', "лавка з подушкою", 'living'),
  I('benchCushionLow', 'low bench', 'низька лавка', 'living'),
  I('bookcaseOpen', 'bookcase', 'книжкова шафа', 'living', { surface: true }),
  I('bookcaseOpenLow', 'low bookcase', 'низька книжкова шафа', 'living', { surface: true }),
  I('bookcaseClosed', 'closed bookcase', 'закрита шафа', 'living', { surface: true }),
  I('bookcaseClosedDoors', 'cupboard', 'шафа з дверцятами', 'living', { surface: true }),
  I('bookcaseClosedWide', 'wide cupboard', 'широка шафа', 'living', { surface: true }),

  // ---------- Спальня ----------
  I('bedSingle', 'single bed', 'односпальне ліжко', 'bedroom'),
  I('bedDouble', 'double bed', 'двоспальне ліжко', 'bedroom'),
  I('bedBunk', 'bunk bed', 'двоярусне ліжко', 'bedroom', { price: 15 }),
  I('cabinetBed', 'bedside table', 'приліжкова тумбочка', 'bedroom', { surface: true }),
  I('cabinetBedDrawer', 'bedside cabinet', 'тумбочка з шухлядою', 'bedroom', { surface: true }),
  I('cabinetBedDrawerTable', 'chest of drawers', 'комод', 'bedroom', { surface: true }),
  I('sideTable', 'side table', 'приставний столик', 'bedroom', { surface: true }),
  I('sideTableDrawers', 'side table with drawers', 'столик із шухлядами', 'bedroom', { surface: true }),
  I('pillow', 'pillow', 'подушка', 'bedroom', { small: true }),
  I('pillowLong', 'long pillow', 'довга подушка', 'bedroom', { small: true }),
  I('pillowBlue', 'blue pillow', 'синя подушка', 'bedroom', { small: true, paint: 'none' }),
  I('coatRackStanding', 'coat stand', 'вішак', 'bedroom'),
  I('coatRack', 'coat rack', 'вішалка', 'bedroom'),
  I('bear', 'teddy bear', 'плюшевий ведмедик', 'bedroom', { small: true, paint: 'none', price: 5 }),

  // ---------- Кухня ----------
  I('kitchenCabinet', 'kitchen cabinet', 'кухонна шафка', 'kitchen', { surface: true }),
  I('kitchenCabinetDrawer', 'kitchen drawers', 'кухонні шухляди', 'kitchen', { surface: true }),
  I('kitchenCabinetCornerRound', 'corner cabinet', 'кутова шафка', 'kitchen', { surface: true }),
  I('kitchenCabinetCornerInner', 'inner corner cabinet', 'внутрішня кутова шафка', 'kitchen', { surface: true }),
  I('kitchenSink', 'sink', 'мийка', 'kitchen', { paint: 'wood' }),
  I('kitchenStove', 'cooker', 'плита', 'kitchen', { paint: 'none' }),
  I('kitchenStoveElectric', 'electric cooker', 'електроплита', 'kitchen', { paint: 'none' }),
  I('kitchenFridge', 'fridge', 'холодильник', 'kitchen', { paint: 'none' }),
  I('kitchenFridgeLarge', 'big fridge', 'великий холодильник', 'kitchen', { paint: 'none', price: 10 }),
  I('kitchenFridgeSmall', 'small fridge', 'маленький холодильник', 'kitchen', { paint: 'none' }),
  I('kitchenBar', 'kitchen counter', 'барна стійка', 'kitchen', { surface: true }),
  I('kitchenBarEnd', 'counter end', 'край стійки', 'kitchen', { surface: true }),
  I('stoolBar', 'bar stool', 'барний стілець', 'kitchen'),
  I('stoolBarSquare', 'square bar stool', 'квадратний барний стілець', 'kitchen'),
  I('table', 'table', 'стіл', 'kitchen', { surface: true }),
  I('tableCloth', 'table with a tablecloth', 'стіл зі скатертиною', 'kitchen', { surface: true }),
  I('tableRound', 'round table', 'круглий стіл', 'kitchen', { surface: true }),
  I('tableGlass', 'glass table', 'скляний стіл', 'kitchen', { surface: true, price: 5 }),
  I('tableCross', 'wooden table', "дерев'яний стіл", 'kitchen', { surface: true }),
  I('tableCrossCloth', 'table with a cloth', 'стіл із серветкою', 'kitchen', { surface: true }),
  I('chair', 'chair', 'стілець', 'kitchen'),
  I('chairCushion', 'chair with a cushion', 'стілець з подушкою', 'kitchen'),
  I('chairRounded', 'round chair', 'круглий стілець', 'kitchen'),
  I('chairModernCushion', 'modern chair', 'сучасний стілець', 'kitchen'),
  I('chairModernFrameCushion', 'metal chair', 'металевий стілець', 'kitchen'),
  I('kitchenMicrowave', 'microwave', 'мікрохвильовка', 'kitchen', { small: true, paint: 'none' }),
  I('kitchenCoffeeMachine', 'coffee machine', 'кавоварка', 'kitchen', { small: true, paint: 'none' }),
  I('kitchenBlender', 'blender', 'блендер', 'kitchen', { small: true, paint: 'none' }),
  I('toaster', 'toaster', 'тостер', 'kitchen', { small: true, paint: 'none' }),
  I('washer', 'washing machine', 'пральна машина', 'kitchen', { paint: 'none' }),
  I('dryer', 'dryer', 'сушильна машина', 'kitchen', { paint: 'none' }),
  I('washerDryerStacked', 'washer and dryer', 'пральна і сушильна машини', 'kitchen', { paint: 'none', price: 10 }),
  I('trashcan', 'bin', 'смітник', 'kitchen', { paint: 'none' }),

  // ---------- Ванна ----------
  I('bathtub', 'bath', 'ванна', 'bathroom', { paint: 'none' }),
  I('shower', 'shower', 'душ', 'bathroom', { paint: 'none' }),
  I('showerRound', 'round shower', 'круглий душ', 'bathroom', { paint: 'none', price: 10 }),
  I('toilet', 'toilet', 'унітаз', 'bathroom', { paint: 'none' }),
  I('toiletSquare', 'square toilet', 'квадратний унітаз', 'bathroom', { paint: 'none' }),
  I('bathroomSink', 'washbasin', 'умивальник', 'bathroom', { paint: 'none' }),
  I('bathroomSinkSquare', 'square washbasin', 'квадратний умивальник', 'bathroom', { paint: 'none' }),
  I('bathroomCabinet', 'bathroom cabinet', 'шафка для ванної', 'bathroom', { surface: true }),
  I('bathroomCabinetDrawer', 'bathroom drawers', 'шухляди для ванної', 'bathroom', { surface: true }),
  I('bathroomMirror', 'mirror', 'дзеркало', 'bathroom', { small: true, paint: 'none' }),
  I('rugDoormat', 'bath mat', 'килимок', 'bathroom', { rug: true }),

  // ---------- Кабінет ----------
  I('desk', 'desk', 'письмовий стіл', 'study', { surface: true }),
  I('deskCorner', 'corner desk', 'кутовий стіл', 'study', { surface: true, price: 10 }),
  I('chairDesk', 'office chair', 'офісне крісло', 'study'),
  I('computerScreen', 'computer', "комп'ютер", 'study', { small: true, paint: 'none' }),
  I('computerKeyboard', 'keyboard', 'клавіатура', 'study', { small: true, paint: 'none' }),
  I('computerMouse', 'mouse', 'мишка', 'study', { small: true, paint: 'none' }),
  I('laptop', 'laptop', 'ноутбук', 'study', { small: true, paint: 'none', price: 5 }),
  I('radio', 'radio', 'радіо', 'study', { small: true, paint: 'none' }),
  I('books', 'books', 'книжки', 'study', { small: true }),
  I('cardboardBoxClosed', 'box', 'коробка', 'study', { paint: 'none' }),
  I('cardboardBoxOpen', 'open box', 'відкрита коробка', 'study', { paint: 'none' }),

  // ---------- Декор ----------
  I('rugRectangle', 'rug', 'килим', 'decor', { rug: true }),
  I('rugRound', 'round rug', 'круглий килим', 'decor', { rug: true }),
  I('rugRounded', 'oval rug', 'овальний килим', 'decor', { rug: true }),
  I('rugSquare', 'square rug', 'квадратний килим', 'decor', { rug: true }),
  I('pottedPlant', 'plant', 'рослина', 'decor', { paint: 'none' }),
  I('plantSmall1', 'small plant', 'маленька рослина', 'decor', { small: true, paint: 'none' }),
  I('plantSmall2', 'cactus', 'кактус', 'decor', { small: true, paint: 'none' }),
  I('plantSmall3', 'flower', 'квітка', 'decor', { small: true, paint: 'none' }),
  I('lampRoundFloor', 'floor lamp', 'торшер', 'decor', { paint: 'none' }),
  I('lampSquareFloor', 'tall lamp', 'висока лампа', 'decor', { paint: 'none' }),
  I('lampRoundTable', 'table lamp', 'настільна лампа', 'decor', { small: true, paint: 'none' }),
  I('lampSquareTable', 'square lamp', 'квадратна лампа', 'decor', { small: true, paint: 'none' }),
];

// KayKit Furniture Bits (CC0): затишні предмети з текстурою, не перефарбовуються
const K = (file: string, en: string, uk: string, cat: HomeCat, o: Partial<HomeItem> = {}): HomeItem => ({ file, en, uk, cat, pack: 'kaykit', paint: 'none', ...o });
HOME_ITEMS.push(
  K('couch_pillows', 'sofa with cushions', 'диван з подушками', 'living', { price: 10 }),
  K('armchair_pillows', 'soft armchair', "м'яке крісло", 'living', { price: 5 }),
  K('table_low', 'low table', 'низький столик', 'living', { surface: true }),
  K('cabinet_medium_decorated', 'dresser', 'комод з декором', 'living', { surface: true, price: 10 }),
  K('cabinet_small_decorated', 'small dresser', 'маленький комод', 'living', { surface: true, price: 5 }),
  K('bed_double_B', 'cosy double bed', 'затишне двоспальне ліжко', 'bedroom', { price: 15 }),
  K('bed_single_B', 'cosy bed', 'затишне ліжко', 'bedroom', { price: 10 }),
  K('pillow_A', 'cushion', 'подушечка', 'bedroom', { small: true }),
  K('pillow_B', 'striped cushion', 'смугаста подушечка', 'bedroom', { small: true }),
  K('table_medium', 'square table', 'квадратний стіл', 'kitchen', { surface: true }),
  K('table_medium_long', 'long table', 'довгий стіл', 'kitchen', { surface: true, price: 5 }),
  K('chair_A_wood', 'wooden chair', "дерев'яний стілець", 'kitchen'),
  K('chair_B', 'blue chair', 'синій стілець', 'kitchen'),
  K('chair_stool_wood', 'stool', 'табурет', 'kitchen'),
  K('book_set', 'set of books', 'набір книжок', 'study', { small: true }),
  K('book_single', 'book', 'книжка', 'study', { small: true }),
  K('cactus_medium_A', 'big cactus', 'великий кактус', 'decor'),
  K('cactus_small_A', 'little cactus', 'маленький кактус', 'decor', { small: true }),
  K('lamp_standing', 'standing lamp', 'стоячий світильник', 'decor', { price: 5 }),
  K('lamp_table', 'bedside lamp', 'нічник', 'decor', { small: true }),
  K('pictureframe_standing_A', 'photo frame', 'фоторамка', 'decor', { small: true }),
  K('pictureframe_large_A', 'picture', 'картина', 'decor', { wall: true }),
  K('pictureframe_large_B', 'big picture', 'велика картина', 'decor', { wall: true, price: 5 }),
  K('pictureframe_medium', 'painting', 'малюнок у рамці', 'decor', { wall: true }),
  K('pictureframe_small_A', 'small picture', 'маленька картина', 'decor', { wall: true }),
  K('pictureframe_small_C', 'square picture', 'квадратна картина', 'decor', { wall: true }),
  K('shelf_B_large_decorated', 'shelf with things', 'полиця з речами', 'decor', { wall: true, price: 5 }),
  K('shelf_B_small_decorated', 'small shelf', 'маленька полиця', 'decor', { wall: true }),
  K('rug_rectangle_stripes_A', 'striped rug', 'смугастий килим', 'decor', { rug: true }),
  K('rug_oval_A', 'cosy rug', 'затишний килим', 'decor', { rug: true }),
);
// дзеркало і настінна лампа Kenney теж на стіну
['bathroomMirror'].forEach((f) => { const it = HOME_ITEMS.find((x) => x.file === f); if (it) { it.small = false; it.wall = true; } });
HOME_ITEMS.push({ file: 'lampWall', en: 'wall lamp', uk: 'бра', cat: 'decor', wall: true, paint: 'none' });

export const HOME_ITEM = Object.fromEntries(HOME_ITEMS.map((i) => [i.file, i])) as Record<string, HomeItem>;

// Кольори для фарбування (назви англійською для навчання)
export const PAINT: { en: string; uk: string; hex: string }[] = [
  { en: 'red', uk: 'червоний', hex: '#D9534A' },
  { en: 'orange', uk: 'помаранчевий', hex: '#EE8E3C' },
  { en: 'yellow', uk: 'жовтий', hex: '#F2C744' },
  { en: 'green', uk: 'зелений', hex: '#5DAA5A' },
  { en: 'blue', uk: 'синій', hex: '#4A86D0' },
  { en: 'purple', uk: 'фіолетовий', hex: '#8A6CCB' },
  { en: 'pink', uk: 'рожевий', hex: '#EE8FB4' },
  { en: 'white', uk: 'білий', hex: '#F2EEE6' },
  { en: 'grey', uk: 'сірий', hex: '#9EA3A8' },
  { en: 'black', uk: 'чорний', hex: '#3B3B3E' },
  { en: 'brown', uk: 'коричневий', hex: '#9B6A44' },
];

// Стіни і підлога
export const WALLS = [
  { en: 'cream', hex: '#F1E6CF' }, { en: 'mint', hex: '#CBE8D8' }, { en: 'lavender', hex: '#E0D7F2' },
  { en: 'sky blue', hex: '#CFE3F5' }, { en: 'peach', hex: '#F8D6C4' }, { en: 'white', hex: '#F7F5F0' },
];
export const FLOORS = [
  { en: 'light wood', hex: '#D7A774' }, { en: 'dark wood', hex: '#8C5E3C' }, { en: 'grey tiles', hex: '#B9BEC3' },
  { en: 'white tiles', hex: '#E9E6DF' }, { en: 'blue carpet', hex: '#7FA6CF' },
];
