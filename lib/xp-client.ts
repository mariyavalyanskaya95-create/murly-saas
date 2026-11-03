'use client';
// Нарахувати досвід: подія підхоплюється XpHud (анімація, звук, збереження).
// key робить нарахування одноразовим: та сама відповідь двічі XP не дає.
import type { XpSource } from './xp';

export type XpEvent = { items: { key: string; amount: number }[]; source: XpSource; label?: string };
export function gainXp(key: string, amount: number, source: XpSource, label?: string) {
  if (typeof window === 'undefined' || amount <= 0) return;
  window.dispatchEvent(new CustomEvent<XpEvent>('murly:xp', { detail: { items: [{ key, amount }], source, label } }));
}
// кілька нарахувань одним ефектом (наприклад, усі правильні відповіді вправи)
export function gainXpMany(items: { key: string; amount: number }[], source: XpSource, label?: string) {
  if (typeof window === 'undefined' || !items.length) return;
  window.dispatchEvent(new CustomEvent<XpEvent>('murly:xp', { detail: { items, source, label } }));
}
