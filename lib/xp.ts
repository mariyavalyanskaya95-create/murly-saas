// Досвід (XP) і рівні учня. Кожен наступний рівень трохи довший за попередній.
import type { T } from './i18n';

export const need = (level: number) => 100 + 50 * (level - 1);

export function levelInfo(xp: number) {
  let level = 1, left = Math.max(0, Math.floor(xp));
  while (left >= need(level)) { left -= need(level); level++; }
  return { level, into: left, need: need(level), pct: Math.round((left / need(level)) * 100), rank: rankOf(level) };
}

// Звання за рівнем: від дерев'яного до легенди
export const RANKS: { from: number; name: T; color: string }[] = [
  { from: 1, name: { uk: 'Дерево', ru: 'Дерево', en: 'Wood' }, color: '#b5884f' },
  { from: 3, name: { uk: 'Камінь', ru: 'Камень', en: 'Stone' }, color: '#9a9a9a' },
  { from: 5, name: { uk: 'Залізо', ru: 'Железо', en: 'Iron' }, color: '#d8d8d8' },
  { from: 8, name: { uk: 'Золото', ru: 'Золото', en: 'Gold' }, color: '#ffd23f' },
  { from: 11, name: { uk: 'Діамант', ru: 'Алмаз', en: 'Diamond' }, color: '#33e0d6' },
  { from: 15, name: { uk: 'Легенда', ru: 'Легенда', en: 'Legend' }, color: '#c084fc' },
];
export const rankOf = (level: number) => [...RANKS].reverse().find((r) => level >= r.from) ?? RANKS[0];

export const XP_DAILY_CAP = 800;
export type XpSource = 'exercise' | 'homework' | 'lesson' | 'words' | 'game';
