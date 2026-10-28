// Усі локації квесту «Знайди, Бульбашко!» по порядку
import { KITCHEN } from './scenes/kitchen';
import { BATHROOM } from './scenes/bathroom';
import { BEDROOM } from './scenes/bedroom';
import { LIVINGROOM } from './scenes/livingroom';
import { CLASSROOM } from './scenes/classroom';
import { PARK } from './scenes/park';
import { SHOP } from './scenes/shop';
import { SEA } from './scenes/sea';
import type { T } from '@/lib/i18n';

export const QUEST_NAME: T = { uk: 'Знайди, Бульбашко!', ru: 'Найди, Пузырёк!', en: 'Find it, Bubbles!' };
export const QUESTS = [KITCHEN, BATHROOM, BEDROOM, LIVINGROOM, CLASSROOM, PARK, SHOP, SEA];
export const getQuest = (id: string) => QUESTS.find((q) => q.id === id);
