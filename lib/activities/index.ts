import { KIDS } from './kids';
import { TEENS } from './teens';
import { ADULTS } from './adults';
import type { Activity } from './types';
export type { Activity, Slide, Card, ArtId } from './types';

const LV = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4 } as const;
export const ACTIVITIES: Activity[] = [...KIDS, ...TEENS, ...ADULTS].sort((a, b) => LV[a.levels[0]] - LV[b.levels[0]]);
export const getActivity = (slug: string) => ACTIVITIES.find((a) => a.slug === slug);
