import { VARIANT_1 } from './variant-1';
import { VARIANT_2 } from './variant-2';
import { VARIANT_3 } from './variant-3';
import { VARIANT_4 } from './variant-4';
import { VARIANT_5 } from './variant-5';
import type { MockVariant } from './types';

// Усі варіанти пробного НМТ. Нові додаємо сюди. Варіант 1 безкоштовний, 2+ у платному продукті (після підключення оплати).
export const MOCKS: MockVariant[] = [VARIANT_1, VARIANT_2, VARIANT_3, VARIANT_4, VARIANT_5];
export const SOON = 1; // скільки варіантів «скоро» показуємо в списку
export const getMock = (id: string) => MOCKS.find((m) => m.id === id);
