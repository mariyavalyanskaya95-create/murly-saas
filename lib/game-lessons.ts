// Уроки за іграми, у які грають діти й підлітки. Уроки — окремі інтерактивні сторінки в public/game-lessons.
// Картинки тільки наші (піксельні й векторні), без логотипів і графіки з ігор. Відео тільки з офіційних каналів.
import type { T } from './i18n';

export type GameLesson = {
  id: string;
  game: string;
  title: string;
  grammar: T;
  topic: T;
  level: string;
  age: string;
  minutes: number;
  color: string; // фон картки
  ready: boolean;
};

export const GAME_LESSONS: GameLesson[] = [
  { id: 'survival', game: 'Minecraft', title: 'Survival Mission', level: 'A2-B1', age: '9-14', minutes: 60, color: '#7ec8ff', ready: true,
    grammar: { uk: 'Present Simple vs Present Continuous', ru: 'Present Simple vs Present Continuous', en: 'Present Simple vs Present Continuous' },
    topic: { uk: 'Блоки, їжа, інструменти, будуємо дім і виживаємо першу ніч', ru: 'Блоки, еда, инструменты, строим дом и выживаем первую ночь', en: 'Blocks, food, tools, building a house and surviving the first night' } },
  { id: 'obby', game: 'Roblox', title: 'Obby Champions', level: 'A2-B1', age: '8-13', minutes: 60, color: '#ff8f8f', ready: true,
    grammar: { uk: 'Past Simple: що сталося в грі', ru: 'Past Simple: что случилось в игре', en: 'Past Simple: what happened in the game' },
    topic: { uk: 'Перешкоди, рухи, правила, розповідь про проходження', ru: 'Препятствия, движения, правила, рассказ о прохождении', en: 'Obstacles, moves, rules, retelling a run' } },
  { id: 'runway', game: 'Dress to Impress', title: 'Runway Star', level: 'A2-B1', age: '9-14', minutes: 60, color: '#ff9fe0', ready: true,
    grammar: { uk: 'Прикметники, порядок прикметників, порівняння', ru: 'Прилагательные, порядок прилагательных, сравнение', en: 'Adjectives, adjective order, comparatives' },
    topic: { uk: 'Одяг, кольори, стилі, оцінюємо образи', ru: 'Одежда, цвета, стили, оцениваем образы', en: 'Clothes, colours, styles, judging outfits' } },
  { id: 'builder', game: 'Fortnite', title: 'Creative Builder', level: 'B1', age: '11-15', minutes: 60, color: '#a98bff', ready: true,
    grammar: { uk: 'Going to і will: плани та рішення', ru: 'Going to и will: планы и решения', en: 'Going to and will: plans and decisions' },
    topic: { uk: 'Режим будівництва: стіни, рампи, острів своєї мрії', ru: 'Режим стройки: стены, рампы, остров мечты', en: 'Build mode: walls, ramps, your dream island' } },
  { id: 'brawl', game: 'Brawl Stars', title: 'Team Up', level: 'A2-B1', age: '9-14', minutes: 60, color: '#ffd23f', ready: false,
    grammar: { uk: 'Модальні: can, must, should', ru: 'Модальные: can, must, should', en: 'Modals: can, must, should' },
    topic: { uk: 'Командна гра, ролі, поради новачкам', ru: 'Командная игра, роли, советы новичкам', en: 'Teamwork, roles, tips for beginners' } },
  { id: 'impostor', game: 'Among Us', title: 'Spaceship Mystery', level: 'B1', age: '10-15', minutes: 60, color: '#7be0c3', ready: true,
    grammar: { uk: 'Past Continuous: що ти робив, коли...', ru: 'Past Continuous: что ты делал, когда...', en: 'Past Continuous: what were you doing when...' },
    topic: { uk: 'Кімнати корабля, завдання, алібі, дебати', ru: 'Комнаты корабля, задания, алиби, дебаты', en: 'Ship rooms, tasks, alibis, debates' } },
  { id: 'farm', game: 'Stardew Valley', title: 'Farm Life', level: 'A2-B1', age: '10-16', minutes: 60, color: '#9be07b', ready: false,
    grammar: { uk: 'Countable / uncountable, some / any, how much / many', ru: 'Countable / uncountable, some / any, how much / many', en: 'Countable / uncountable, some / any, how much / many' },
    topic: { uk: 'Ферма, сезони, рецепти, магазин', ru: 'Ферма, сезоны, рецепты, магазин', en: 'Farm, seasons, recipes, the shop' } },
];
