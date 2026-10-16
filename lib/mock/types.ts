// Пробний НМТ з англійської: структура як у НМТ-2026 (32 завдання, 6 Task-ів).
// Тексти й оголошення власні (Murly), не з офіційних тестів.

export type PosterTheme = 'warm' | 'block' | 'event' | 'notice' | 'fun';
export type PosterSpec = {
  theme: PosterTheme;
  brand: string; // вигадана назва організації
  title: string;
  body: string;
  footer?: string;
  icons: string[]; // id з public/ikonky.svg або котики il-/st- з public/kotyky.svg
  bg: string;
  accent: string;
};

// Task 1: оголошення + спільні варіанти A-H
export type AdsTask = {
  kind: 'ads';
  stem: string; // «This advertisement is for people who want to ___»
  options: string[]; // 8 варіантів
  items: { poster: PosterSpec; answer: number; why: string }[];
};
// Task 2: текст + питання A-D
export type ReadingTask = {
  kind: 'reading';
  title: string;
  paragraphs: string[];
  items: { q: string; options: string[]; answer: number; why: string }[];
};
// Task 3: короткі тексти про людей + спільні варіанти A-H
export type PeopleTask = {
  kind: 'people';
  title: string;
  stem: string; // «This person ___»
  options: string[];
  items: { name: string; text: string; answer: number; why: string }[];
};
// Task 4: текст з пропусками, варіанти-фрази A-H
export type GappedTask = {
  kind: 'gapped';
  title: string;
  text: string; // пропуски позначені {0}, {1} ...
  options: string[];
  items: { answer: number; why: string }[];
};
// Task 5-6: текст з пропусками, у кожного свої 4 варіанти
export type ClozeTask = {
  kind: 'cloze';
  focus: 'lexis' | 'grammar';
  title: string;
  text: string; // {0}, {1} ...
  items: { options: string[]; answer: number; why: string }[];
};

export type MockTask = AdsTask | ReadingTask | PeopleTask | GappedTask | ClozeTask;
export type MockVariant = { id: string; title: string; level: string; tasks: MockTask[] };

export const LETTERS = 'ABCDEFGH';
// Скільки питань у Task-і
export const taskSize = (t: MockTask) => t.items.length;
