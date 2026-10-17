// Уроки Murly: урок складається з блоків. Один формат для конструктора, бібліотеки і показу учню.
import type { Section } from './exercise';
import { pick, type Lang, type T } from './i18n';

export type Block =
  | { id: string; type: 'heading'; text: string }
  | { id: string; type: 'text'; text: string }
  | { id: string; type: 'tip'; text: string }
  | { id: string; type: 'image'; url: string; caption?: string }
  | { id: string; type: 'video'; url: string; caption?: string; task?: string }
  | { id: string; type: 'pdf'; url: string; name?: string }
  | { id: string; type: 'vocab'; words: { en: string; uk: string }[] }
  | { id: string; type: 'exercise'; sections: Section[]; source?: string }
  | { id: string; type: 'speaking'; questions: string[] }
  | { id: string; type: 'audio'; title?: string; script: string; audioUrl?: string } // аудіювання: репліки «A: текст»
  | { id: string; type: 'note'; text: string } // нотатка лише для вчителя
  | { id: string; type: 'meme'; kit: string; top: string; bottom?: string; uk?: string } // мем-стікер з котиком
  | { id: string; type: 'game'; title: string; prompt: string; items: { q: string; a: string }[] }; // гра всередині уроку (квіз, пари, анаграми, картки)

export type BlockType = Block['type'];
export type Age = 'kids' | 'teens' | 'adults';
export type Plan = {
  id: string; title: string; level: string; age: Age; topic?: string; color: string;
  blocks: Block[]; source?: string; createdAt?: string; updatedAt?: string;
  focus?: string[]; aims?: string;
  duration?: number; // тривалість уроку в хвилинах
};

export const FOCUS = ['Vocabulary', 'Grammar', 'Reading', 'Listening', 'Speaking', 'Writing', 'НМТ'];

export const AGES: { id: Age; label: string }[] = [
  { id: 'kids', label: 'Діти 6-11' },
  { id: 'teens', label: 'Підлітки 12-17' },
  { id: 'adults', label: 'Дорослі' },
];
// Те саме трьома мовами (AGES лишаємо для старого коду)
export const AGES_T: { id: Age; label: T }[] = [
  { id: 'kids', label: { uk: 'Діти 6-11', ru: 'Дети 6-11', en: 'Kids 6-11' } },
  { id: 'teens', label: { uk: 'Підлітки 12-17', ru: 'Подростки 12-17', en: 'Teens 12-17' } },
  { id: 'adults', label: { uk: 'Дорослі', ru: 'Взрослые', en: 'Adults' } },
];
export const ageLabel = (age: Age | undefined, lang: Lang) => {
  const a = AGES_T.find((x) => x.id === age);
  return a ? pick(a.label, lang) : undefined;
};
export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const BLOCK_TYPES: { id: BlockType; label: T; icon: string }[] = [
  { id: 'heading', label: { uk: 'Заголовок', ru: 'Заголовок', en: 'Heading' }, icon: 'e-board' },
  { id: 'text', label: { uk: 'Текст', ru: 'Текст', en: 'Text' }, icon: 'e-book' },
  { id: 'tip', label: { uk: 'Правило / лайфхак', ru: 'Правило / лайфхак', en: 'Rule / tip' }, icon: 'd-bulb' },
  { id: 'vocab', label: { uk: 'Слова', ru: 'Слова', en: 'Words' }, icon: 'e-abc' },
  { id: 'exercise', label: { uk: 'Вправа', ru: 'Упражнение', en: 'Exercise' }, icon: 'e-pencil' },
  { id: 'speaking', label: { uk: 'Говоріння', ru: 'Говорение', en: 'Speaking' }, icon: 'e-speak' },
  { id: 'image', label: { uk: 'Картинка', ru: 'Картинка', en: 'Picture' }, icon: 'd-camera' },
  { id: 'audio', label: { uk: 'Аудіювання', ru: 'Аудирование', en: 'Listening' }, icon: 'e-head' },
  { id: 'video', label: { uk: 'Відео YouTube', ru: 'Видео YouTube', en: 'YouTube video' }, icon: 'e-mic' },
  { id: 'pdf', label: { uk: 'PDF-файл', ru: 'PDF-файл', en: 'PDF file' }, icon: 'e-book' },
  { id: 'game', label: { uk: 'Гра', ru: 'Игра', en: 'Game' }, icon: 'e-trophy' },
  { id: 'meme', label: { uk: 'Мем з котиком', ru: 'Мем с котиком', en: 'Cat meme' }, icon: 'c-cat' },
  { id: 'note', label: { uk: 'Нотатка для вчителя', ru: 'Заметка для учителя', en: 'Teacher note' }, icon: 'd-lock' },
];

export const uid = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));

export function emptyBlock(type: BlockType): Block {
  const id = uid();
  switch (type) {
    case 'heading': case 'text': case 'tip': case 'note': return { id, type, text: '' };
    case 'image': case 'video': case 'pdf': return { id, type, url: '' };
    case 'vocab': return { id, type, words: [] };
    case 'exercise': return { id, type, sections: [] };
    case 'speaking': return { id, type, questions: [] };
    case 'audio': return { id, type, script: '' };
    case 'meme': return { id, type, kit: 'st-cat-shock', top: '', bottom: '' };
    case 'game': return { id, type, title: 'Quick game', prompt: '', items: [] };
  }
}

// YouTube посилання → адреса для вбудовування
export function youtubeEmbed(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null;
}

// Усі вправи уроку як одна послідовність секцій (для перевірки і балів)
export function lessonSections(blocks: Block[]): Section[] {
  return blocks.flatMap((b) => (b.type === 'exercise' ? b.sections : []));
}

// Режим «слайди»: заголовок починає новий слайд; на слайді максимум один «великий» блок
// (відео, аудіо, вправа, слова, PDF, картинка, говоріння); текст після нього йде на новий слайд.
// Нотатки вчителя прикріплюються до слайда, де вони стоять.
export type Slide = { title?: string; blocks: Block[]; notes: string[] };
const BIG: BlockType[] = ['video', 'audio', 'exercise', 'vocab', 'pdf', 'image', 'speaking', 'game'];
export function toSlides(blocks: Block[]): Slide[] {
  const out: Slide[] = [];
  let cur: Slide | null = null;
  let title: string | undefined;
  const hasBig = (s: Slide) => s.blocks.some((b) => BIG.includes(b.type));
  const fresh = () => { cur = { title, blocks: [], notes: [] }; out.push(cur); return cur; };
  for (const b of blocks) {
    if (b.type === 'note') { if (b.text.trim()) (cur ?? fresh()).notes.push(b.text); continue; }
    if (b.type === 'heading') { title = b.text; fresh(); continue; }
    let s: Slide = cur ?? fresh();
    if (hasBig(s)) s = fresh();
    s.blocks.push(b);
  }
  return out.filter((s) => s.blocks.length || s.notes.length || s.title);
}
