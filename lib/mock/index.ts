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
import { VARIANT_11 } from './variant-11';
import { VARIANT_12 } from './variant-12';
import { VARIANT_13 } from './variant-13';
import { VARIANT_14 } from './variant-14';
import { VARIANT_15 } from './variant-15';
import { VARIANT_16 } from './variant-16';
import { VARIANT_17 } from './variant-17';
import { VARIANT_18 } from './variant-18';
import { VARIANT_19 } from './variant-19';
import { VARIANT_20 } from './variant-20';
import type { MockVariant } from './types';

// Усі варіанти пробного НМТ. Нові додаємо сюди. Варіант 1 безкоштовний, 2+ у платному продукті (після підключення оплати).
// 1-4: розминка (трохи легші). 5+: рівень реального НМТ.
export const MOCKS: MockVariant[] = [VARIANT_1, VARIANT_2, VARIANT_3, VARIANT_4, VARIANT_5, VARIANT_6, VARIANT_7, VARIANT_8, VARIANT_9, VARIANT_10, VARIANT_11, VARIANT_12, VARIANT_13, VARIANT_14, VARIANT_15, VARIANT_16, VARIANT_17, VARIANT_18, VARIANT_19, VARIANT_20];
// Безкоштовні для всіх учнів (спробувати формат). Решта: платний продукт «Пробний НМТ з розбором».
// Вчителям на платному тарифі відкриті всі варіанти.
export const FREE = ['1', '2'];
export const SOON = 1; // скільки варіантів «скоро» показуємо в списку
export const getMock = (id: string) => MOCKS.find((m) => m.id === id);
