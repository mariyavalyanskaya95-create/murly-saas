import { LIGHTHOUSE } from './lighthouse';
import { WRONG_SUITCASE } from './wrong-suitcase';
export const SERIES = [LIGHTHOUSE, WRONG_SUITCASE];
export const getSeries = (slug: string) => SERIES.find((s) => s.slug === slug);
