// Розбір виразів до пісень: власні пояснення, без цитат із текстів пісень.
type L = { uk: string; ru: string; en: string };
export type DeepPhrase = { en: string; m: L; story: L; ex: string[]; similar?: string[]; tip?: L };
export type SongDeep = { intro: L; phrases: DeepPhrase[]; culture: L[] };
import { DEEP_A } from './songs-deep-a';
import { DEEP_B } from './songs-deep-b';
import { DEEP_C } from './songs-extra';
import { DEEP_D } from './songs-extra2';
import { DEEP_E } from './songs-extra3';
import { DEEP_F } from './songs-extra4';
import { DEEP_G } from './songs-extra5';
import { DEEP_H } from './songs-extra6';
export const SONG_DEEP: Record<string, SongDeep> = { ...DEEP_A, ...DEEP_B, ...DEEP_C, ...DEEP_D, ...DEEP_E, ...DEEP_F, ...DEEP_G, ...DEEP_H };
