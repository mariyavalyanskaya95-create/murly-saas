import { VARIANT_1 } from './variant-1';
import { VARIANT_2 } from './variant-2';
import { VARIANT_3 } from './variant-3';
import { VARIANT_4 } from './variant-4';
import { VARIANT_5 } from './variant-5';
import { VARIANT_6 } from './variant-6';
import { VARIANT_7 } from './variant-7';
import { VARIANT_8 } from './variant-8';
import { VARIANT_9 } from './variant-9';
import { VARIANT_10 } from './variant-10';
import type { MockVariant } from './types';

// Усі варіанти пробного НМТ. Нові додаємо сюди. Варіант 1 безкоштовний, 2+ у платному продукті (після підключення оплати).
// 1-4: розминка (трохи легші). 5+: рівень реального НМТ.
export const MOCKS: MockVariant[] = [VARIANT_1, VARIANT_2, VARIANT_3, VARIANT_4, VARIANT_5, VARIANT_6, VARIANT_7, VARIANT_8, VARIANT_9, VARIANT_10];
export const SOON = 1; // скільки варіантів «скоро» показуємо в списку
export const getMock = (id: string) => MOCKS.find((m) => m.id === id);
