import { KIDS } from './kids';
import { TEENS } from './teens';
import { ADULTS } from './adults';
import { ADULTS2 } from './adults2';
import { ADULTS3 } from './adults3';
import { TEENS2 } from './teens2';
import { TEENS3 } from './teens3';
import type { Activity } from './types';
export type { Activity, Slide, Card, ArtId } from './types';

const LV = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4 } as const;
export const ACTIVITIES: Activity[] = [...KIDS, ...TEENS, ...TEENS2, ...TEENS3, ...ADULTS, ...ADULTS2, ...ADULTS3].sort((a, b) => LV[a.levels[0]] - LV[b.levels[0]]);
export const getActivity = (slug: string) => ACTIVITIES.find((a) => a.slug === slug);
