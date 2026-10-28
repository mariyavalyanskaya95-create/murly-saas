// Аудіосеріали: багато серій однієї історії з голосами персонажів
import type { T } from '../i18n';
import type { VoicePreset } from '../voices';

export type SeriesLine = { who: string; text: string }; // who '' = диктор
export type SeriesWord = { en: string; uk: string; ru: string };
export type SeriesQuestion = { q: string; options: string[]; a: number; why?: T };
export type Episode = { n: number; title: string; teaser: T; lines: SeriesLine[]; words: SeriesWord[]; questions: SeriesQuestion[] };
export type Series = {
  slug: string; title: string; level: string; age: T; about: T; color: string;
  cast: { who: string; voice: VoicePreset; about: T }[];
  episodes: Episode[];
};
