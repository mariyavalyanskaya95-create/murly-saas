import { LIGHTHOUSE } from './lighthouse';
export const SERIES = [LIGHTHOUSE];
export const getSeries = (slug: string) => SERIES.find((s) => s.slug === slug);
