// Блог Murly: статті українською і російською (обидві мови індексуються окремо).
import type { ArtId } from '../activities/types';

export type Block =
  | { t: 'p'; text: string }            // абзац; можна **жирний** і [посилання](/шлях)
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'tip'; title?: string; text: string }   // виділена порада
  | { t: 'example'; en: string; tr: string }      // англійський приклад + переклад
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'cta'; text: string; href: string; label: string }; // заклик перейти на сторінку Murly

export type Lang2 = 'uk' | 'ru';
export type Post = {
  slug: string;
  date: string;          // YYYY-MM-DD
  audience: 'teachers' | 'students' | 'parents' | 'nmt';
  art: ArtId[];          // 1-3 ілюстрації зі спрайту для обкладинки
  minutes: number;       // час читання
  title: Record<Lang2, string>;
  description: Record<Lang2, string>; // meta description, 140-160 символів
  keywords: Record<Lang2, string[]>;  // головні пошукові запити статті
  body: Record<Lang2, Block[]>;
};
