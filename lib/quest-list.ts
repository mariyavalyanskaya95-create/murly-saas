// Легкий список локацій (без малюнків) для форм і сторінок на сервері
import type { T } from './i18n';
export const QUEST_LIST: { id: string; title: T }[] = [
  { id: 'kitchen', title: { uk: 'На кухні', ru: 'На кухне', en: 'In the kitchen' } },
  { id: 'bedroom', title: { uk: 'Моя кімната', ru: 'Моя комната', en: 'My bedroom' } },
  { id: 'classroom', title: { uk: 'У школі', ru: 'В школе', en: 'At school' } },
  { id: 'sea', title: { uk: 'Під водою', ru: 'Под водой', en: 'Under the sea' } },
];
export const isQuest = (id?: string) => Boolean(id && QUEST_LIST.some((q) => q.id === id));
