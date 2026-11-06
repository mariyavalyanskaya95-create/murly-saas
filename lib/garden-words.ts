// Дані гри «Murly Garden»: теми зі словами (A1-A2, переклад uk і ru) і предмети саду, які купуються за зірочки.
import type { T } from './i18n';

export type GardenWord = { en: string; uk: string; ru: string };
export type GardenTopic = { id: string; title: T; older?: boolean; words: GardenWord[] };

const w = (en: string, uk: string, ru: string): GardenWord => ({ en, uk, ru });

export const GARDEN_TOPICS: GardenTopic[] = [
  {
    id: 'animals',
    title: { uk: 'Тварини', ru: 'Животные', en: 'Animals' },
    words: [
      w('cat', 'кіт', 'кот'), w('dog', 'собака', 'собака'), w('bird', 'птах', 'птица'), w('fish', 'риба', 'рыба'),
      w('horse', 'кінь', 'лошадь'), w('cow', 'корова', 'корова'), w('pig', 'свиня', 'свинья'), w('sheep', 'вівця', 'овца'),
      w('duck', 'качка', 'утка'), w('frog', 'жаба', 'лягушка'), w('rabbit', 'кролик', 'кролик'), w('mouse', 'миша', 'мышь'),
      w('bear', 'ведмідь', 'медведь'), w('fox', 'лисиця', 'лиса'), w('lion', 'лев', 'лев'), w('monkey', 'мавпа', 'обезьяна'),
      w('snake', 'змія', 'змея'), w('bee', 'бджола', 'пчела'),
    ],
  },
  {
    id: 'food',
    title: { uk: 'Їжа', ru: 'Еда', en: 'Food' },
    words: [
      w('apple', 'яблуко', 'яблоко'), w('banana', 'банан', 'банан'), w('bread', 'хліб', 'хлеб'), w('milk', 'молоко', 'молоко'),
      w('cheese', 'сир', 'сыр'), w('egg', 'яйце', 'яйцо'), w('water', 'вода', 'вода'), w('juice', 'сік', 'сок'),
      w('soup', 'суп', 'суп'), w('rice', 'рис', 'рис'), w('cake', 'торт', 'торт'), w('carrot', 'морква', 'морковь'),
      w('potato', 'картопля', 'картофель'), w('tomato', 'помідор', 'помидор'), w('orange', 'апельсин', 'апельсин'), w('butter', 'масло', 'масло'),
      w('honey', 'мед', 'мёд'), w('pear', 'груша', 'груша'),
    ],
  },
  {
    id: 'home',
    title: { uk: 'Дім', ru: 'Дом', en: 'Home' },
    words: [
      w('house', 'будинок', 'дом'), w('room', 'кімната', 'комната'), w('kitchen', 'кухня', 'кухня'), w('bed', 'ліжко', 'кровать'),
      w('table', 'стіл', 'стол'), w('chair', 'стілець', 'стул'), w('door', 'двері', 'дверь'), w('window', 'вікно', 'окно'),
      w('sofa', 'диван', 'диван'), w('lamp', 'лампа', 'лампа'), w('clock', 'годинник', 'часы'), w('mirror', 'дзеркало', 'зеркало'),
      w('shelf', 'полиця', 'полка'), w('carpet', 'килим', 'ковёр'), w('bath', 'ванна', 'ванна'), w('cup', 'чашка', 'чашка'),
      w('plate', 'тарілка', 'тарелка'), w('roof', 'дах', 'крыша'),
    ],
  },
  {
    id: 'nature',
    title: { uk: 'Природа', ru: 'Природа', en: 'Nature' },
    words: [
      w('tree', 'дерево', 'дерево'), w('flower', 'квітка', 'цветок'), w('grass', 'трава', 'трава'), w('leaf', 'листок', 'лист'),
      w('sun', 'сонце', 'солнце'), w('moon', 'місяць', 'луна'), w('star', 'зірка', 'звезда'), w('sky', 'небо', 'небо'),
      w('cloud', 'хмара', 'облако'), w('rain', 'дощ', 'дождь'), w('snow', 'сніг', 'снег'), w('wind', 'вітер', 'ветер'),
      w('river', 'річка', 'река'), w('sea', 'море', 'море'), w('lake', 'озеро', 'озеро'), w('forest', 'ліс', 'лес'),
      w('stone', 'камінь', 'камень'), w('mountain', 'гора', 'гора'),
    ],
  },
  {
    id: 'clothes',
    title: { uk: 'Одяг', ru: 'Одежда', en: 'Clothes' },
    words: [
      w('hat', 'капелюх', 'шляпа'), w('cap', 'кепка', 'кепка'), w('coat', 'пальто', 'пальто'), w('jacket', 'куртка', 'куртка'),
      w('dress', 'сукня', 'платье'), w('skirt', 'спідниця', 'юбка'), w('shirt', 'сорочка', 'рубашка'), w('jeans', 'джинси', 'джинсы'),
      w('shoes', 'туфлі', 'туфли'), w('boots', 'чоботи', 'сапоги'), w('socks', 'шкарпетки', 'носки'), w('scarf', 'шарф', 'шарф'),
      w('gloves', 'рукавички', 'перчатки'), w('sweater', 'светр', 'свитер'), w('shorts', 'шорти', 'шорты'), w('trousers', 'штани', 'брюки'),
    ],
  },
  {
    id: 'school',
    title: { uk: 'Школа', ru: 'Школа', en: 'School' },
    words: [
      w('school', 'школа', 'школа'), w('teacher', 'вчитель', 'учитель'), w('pupil', 'учень', 'ученик'), w('book', 'книжка', 'книга'),
      w('pen', 'ручка', 'ручка'), w('pencil', 'олівець', 'карандаш'), w('ruler', 'лінійка', 'линейка'), w('rubber', 'гумка', 'ластик'),
      w('bag', 'рюкзак', 'рюкзак'), w('desk', 'парта', 'парта'), w('board', 'дошка', 'доска'), w('lesson', 'урок', 'урок'),
      w('map', 'мапа', 'карта'), w('paper', 'папір', 'бумага'), w('class', 'клас', 'класс'), w('homework', 'домашнє завдання', 'домашнее задание'),
      w('test', 'тест', 'тест'), w('break', 'перерва', 'перемена'),
    ],
  },
  {
    id: 'feelings',
    older: true,
    title: { uk: 'Почуття', ru: 'Чувства', en: 'Feelings' },
    words: [
      w('happy', 'щасливий', 'счастливый'), w('sad', 'сумний', 'грустный'), w('angry', 'сердитий', 'сердитый'), w('tired', 'втомлений', 'уставший'),
      w('scared', 'наляканий', 'испуганный'), w('bored', 'знуджений', 'скучающий'), w('excited', 'схвильований', 'взволнованный'), w('surprised', 'здивований', 'удивлённый'),
      w('proud', 'гордий', 'гордый'), w('calm', 'спокійний', 'спокойный'), w('worried', 'стурбований', 'обеспокоенный'), w('shy', "сором'язливий", 'застенчивый'),
      w('hungry', 'голодний', 'голодный'), w('thirsty', 'спраглий', 'жаждущий'), w('lonely', 'самотній', 'одинокий'), w('nervous', 'знервований', 'нервный'),
      w('friendly', 'привітний', 'дружелюбный'), w('kind', 'добрий', 'добрый'),
    ],
  },
];

// Предмети саду: що відновлюємо, за скільки зірочок і що каже гра англійською
export type GardenItemId = 'path' | 'flowers' | 'fence' | 'bench' | 'birdhouse' | 'pond' | 'lanterns' | 'tree' | 'veggies' | 'swing';
export type GardenItem = { id: GardenItemId; word: string; cost: number; name: T; line: string };

export const GARDEN_ITEMS: GardenItem[] = [
  { id: 'path', word: 'path', cost: 3, name: { uk: 'Доріжка', ru: 'Дорожка', en: 'Path' }, line: 'You made a path!' },
  { id: 'flowers', word: 'flower bed', cost: 4, name: { uk: 'Клумба', ru: 'Клумба', en: 'Flower bed' }, line: 'You planted a flower bed!' },
  { id: 'fence', word: 'fence', cost: 5, name: { uk: 'Паркан', ru: 'Забор', en: 'Fence' }, line: 'You fixed the fence!' },
  { id: 'bench', word: 'bench', cost: 6, name: { uk: 'Лавка', ru: 'Скамейка', en: 'Bench' }, line: 'You built a bench!' },
  { id: 'birdhouse', word: 'birdhouse', cost: 6, name: { uk: 'Шпаківня', ru: 'Скворечник', en: 'Birdhouse' }, line: 'You made a birdhouse!' },
  { id: 'pond', word: 'pond', cost: 8, name: { uk: 'Ставок', ru: 'Пруд', en: 'Pond' }, line: 'You cleaned the pond!' },
  { id: 'lanterns', word: 'lanterns', cost: 8, name: { uk: 'Ліхтарики', ru: 'Фонарики', en: 'Lanterns' }, line: 'You hung the lanterns!' },
  { id: 'tree', word: 'tree', cost: 10, name: { uk: 'Дерево', ru: 'Дерево', en: 'Tree' }, line: 'You grew a tree!' },
  { id: 'veggies', word: 'vegetable patch', cost: 10, name: { uk: 'Грядка', ru: 'Грядка', en: 'Vegetable patch' }, line: 'You planted a vegetable patch!' },
  { id: 'swing', word: 'swing', cost: 12, name: { uk: 'Гойдалка', ru: 'Качели', en: 'Swing' }, line: 'You built a swing!' },
];

export const ROUND_TASKS = 8;
export const STORE_KEY = 'murly-garden';
