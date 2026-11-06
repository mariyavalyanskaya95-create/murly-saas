// Розбір виразів до пісень: власні пояснення, без цитат із текстів пісень.
type L = { uk: string; ru: string; en: string };
export type DeepPhrase = { en: string; m: L; story: L; ex: string[]; similar?: string[]; tip?: L };
export type SongDeep = { intro: L; phrases: DeepPhrase[]; culture: L[] };
import { DEEP_A } from './songs-deep-a';
import { DEEP_B } from './songs-deep-b';
export const SONG_DEEP: Record<string, SongDeep> = { ...DEEP_A, ...DEEP_B };
