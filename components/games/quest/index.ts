// Усі локації квесту «Знайди, Бульбашко!» по порядку
import { SEA } from './scenes/sea';
import { KITCHEN } from './scenes/kitchen';
import { BEDROOM } from './scenes/bedroom';
import { CLASSROOM } from './scenes/classroom';
import type { T } from '@/lib/i18n';

export const QUEST_NAME: T = { uk: 'Знайди, Бульбашко!', ru: 'Найди, Пузырёк!', en: 'Find it, Bubbles!' };
export const QUESTS = [KITCHEN, BEDROOM, CLASSROOM, SEA];
export const getQuest = (id: string) => QUESTS.find((q) => q.id === id);
