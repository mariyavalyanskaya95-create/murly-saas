import { VARIANT_1 } from './variant-1';
import type { MockVariant } from './types';

// Усі варіанти пробного НМТ. Нові додаємо сюди.
export const MOCKS: MockVariant[] = [VARIANT_1];
export const SOON = 2; // скільки варіантів «скоро» показуємо в списку
export const getMock = (id: string) => MOCKS.find((m) => m.id === id);
