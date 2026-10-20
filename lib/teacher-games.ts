// Свої ігри вчителя: розбір списку слів «word = переклад» (по одній парі в рядку).
import type { GameItem } from '@/components/games/engine';

export function parseWords(text: string): GameItem[] {
  return text.split('\n').map((line) => {
    const m = line.split(/\s*(?:=|\t|\s[-–—]\s|:)\s*/);
    if (m.length < 2) return null;
    const q = m[0].trim().slice(0, 80), a = m.slice(1).join(' ').trim().slice(0, 80);
    return q && a ? { q, a } : null;
  }).filter((x): x is GameItem => Boolean(x)).slice(0, 60);
}

export type TeacherGame = { id: string; title: string; prompt?: string; items: GameItem[]; created_at?: string };
