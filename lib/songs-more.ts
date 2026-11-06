// Розширені уроки до пісень: тип і об'єднання частин A і B. Тексти пісень не публікуємо.
type L = { uk: string; ru: string; en: string };
export type SongLesson = {
  lyricVideo?: string;
  facts: L[];
  warmup: string[];
  vocab: { group: L; items: { en: string; uk: string; ru: string; ex: string }[] }[];
  grammar: L;
  grammarEx: { q: string; opts: string[]; a: string }[];
  gapfill: { q: string; a: string }[];
  listen: L[];
  speaking: string[];
  roleplay: L;
  writing: L;
};
import { MORE_A } from './songs-more-a';
import { MORE_B } from './songs-more-b';
export const SONG_LESSONS: Record<string, SongLesson> = { ...MORE_A, ...MORE_B };
