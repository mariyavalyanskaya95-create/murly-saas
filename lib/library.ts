// Бібліотека готових уроків Murly (за рівнем, віком і темою). Кожен урок розрахований на 60 хвилин.
// Уроки лежать у lib/lessons/batch-*.ts, вправи пишемо тим самим текстовим форматом, що й учитель у конструкторі.
import type { Plan } from './lesson';
import { PRACTICE } from './practice';
import { BATCH_1 } from './lessons/batch-1';
import { BATCH_2 } from './lessons/batch-2';
import { BATCH_3 } from './lessons/batch-3';
import { BATCH_4 } from './lessons/batch-4';
import { BATCH_5 } from './lessons/batch-5';
import { BATCH_6 } from './lessons/batch-6';

export const LIBRARY: Plan[] = [...BATCH_1, ...BATCH_2, ...BATCH_3, ...BATCH_4, ...BATCH_5, ...BATCH_6];

// Listening і Reading з розділу «Практика» теж доступні вчителю в бібліотеці (коротші, 20-30 хв)
LIBRARY.push(...PRACTICE);

export const getLibraryPlan = (planId: string) => LIBRARY.find((p) => p.id === planId);
