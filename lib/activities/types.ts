// Speaking-активності Murly: слайди для уроку + PDF для друку.
// Усе, що бачить учень на слайдах, англійською. Пояснення для вчителя трьома мовами.
import type { T } from '../i18n';

// Ілюстрації зі спрайту public/art.svg (стікери в стилі Murly), viewBox 0 0 200 200
export const ART_IDS = [
  // їжа
  'a-pizza', 'a-burger', 'a-apple', 'a-cake', 'a-coffee', 'a-ice-cream', 'a-sandwich', 'a-soup', 'a-popcorn', 'a-donut',
  // дім
  'a-house', 'a-sofa', 'a-bed', 'a-lamp', 'a-plant', 'a-tv', 'a-fridge', 'a-key', 'a-bath', 'a-window',
  // техніка
  'a-phone', 'a-laptop', 'a-headphones', 'a-camera', 'a-robot', 'a-gamepad', 'a-smartwatch', 'a-wifi',
  // подорожі й транспорт
  'a-suitcase', 'a-plane', 'a-train', 'a-bike', 'a-car', 'a-bus', 'a-map', 'a-ticket', 'a-tent', 'a-mountain', 'a-beach', 'a-compass',
  // гроші й покупки
  'a-wallet', 'a-coins', 'a-shopping-bag', 'a-gift', 'a-price-tag', 'a-cart',
  // школа й робота
  'a-book', 'a-backpack', 'a-pencil', 'a-notebook', 'a-clock', 'a-calendar', 'a-briefcase', 'a-trophy', 'a-medal', 'a-glasses',
  // природа й погода
  'a-sun', 'a-rain', 'a-snow', 'a-tree', 'a-flower', 'a-moon', 'a-rainbow', 'a-leaf',
  // тварини
  'a-dog', 'a-rabbit', 'a-fish', 'a-bird', 'a-turtle', 'a-hamster',
  // емоції (кругле обличчя)
  'a-face-happy', 'a-face-sad', 'a-face-surprised', 'a-face-angry', 'a-face-thinking', 'a-face-sleepy', 'a-face-love', 'a-face-nervous',
  // різне
  'a-bulb', 'a-speech', 'a-question', 'a-heart', 'a-star', 'a-rocket', 'a-crown', 'a-wand', 'a-umbrella', 'a-guitar', 'a-ball', 'a-palette', 'a-hourglass', 'a-dice', 'a-puzzle', 'a-balloon', 'a-microphone', 'a-film', 'a-chef-hat', 'a-dumbbell',
] as const;
export type ArtId = (typeof ART_IDS)[number];

export type Card = { title: string; text?: string; art?: ArtId; tag?: string };

export type Slide =
  // обкладинка
  | { kind: 'cover'; title: string; subtitle?: string; art: ArtId[] }
  // завдання з картками (основний тип)
  | { kind: 'cards'; title: string; instruction: string; cards: Card[]; phrases?: string[]; cols?: 2 | 3 | 4 }
  // запитання для обговорення
  | { kind: 'questions'; title: string; instruction?: string; questions: string[]; art?: ArtId }
  // банк фраз (useful language), групами
  | { kind: 'phrases'; title: string; instruction?: string; groups: { title: string; items: string[] }[]; art?: ArtId }
  // два-три варіанти: обери й захисти вибір
  | { kind: 'choose'; title: string; instruction: string; options: Card[]; phrases?: string[] };

export type Activity = {
  slug: string;
  title: string; // англійською, як на обкладинці
  audience: 'kids' | 'teens' | 'adults';
  levels: ('A1' | 'A2' | 'B1' | 'B2' | 'C1')[];
  type: 'speaking' | 'grammar';
  focus: T; // що тренуємо: «порівняння, аргументація»
  about: T; // 1-2 речення: суть активності
  minutes: number; // скільки займає на уроці
  color: 'lime' | 'sky' | 'mustard' | 'tomato' | 'lilac';
  tips: T[]; // як провести (для вчителя), 2-4 пункти
  slides: Slide[];
};
