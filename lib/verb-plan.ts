// План «Неправильні дієслова за 30 днів»: той самий розклад, що в PDF (Murly/mini-produkty/src/verbs.py).
// Кожен 5-й день повторення, решта 24 дні ділять 90 базових дієслів по групах AAA, ABB, ABA, ABC.
import type { Verb } from './irregular-verbs';

const ORDER = ['AAA', 'ABB', 'ABA', 'ABC'] as const;
export function pattern(v: Verb) {
  if (v.base === v.past && v.past === v.pp) return 'AAA';
  if (v.past === v.pp) return 'ABB';
  if (v.base === v.pp) return 'ABA';
  return 'ABC';
}
export type PlanDay = { day: number; review: boolean; verbs: Verb[] };

export function verbPlan(core: Verb[]): PlanDay[] {
  const w = [...core].sort((a, b) => {
    const pa = ORDER.indexOf(pattern(a)), pb = ORDER.indexOf(pattern(b));
    if (pa !== pb) return pa - pb;
    if (!!a.top !== !!b.top) return a.top ? -1 : 1;
    return a.base < b.base ? -1 : a.base > b.base ? 1 : 0;
  });
  const n = w.length;
  const learn = Array.from({ length: 30 }, (_, i) => i + 1).filter((d) => d % 5);
  const days: PlanDay[] = [];
  let i = 0;
  learn.forEach((d, k) => {
    const size = Math.floor(n / 24) + (k < n % 24 ? 1 : 0);
    days[d - 1] = { day: d, review: false, verbs: w.slice(i, i + size) };
    i += size;
  });
  for (let d = 5; d <= 30; d += 5) days[d - 1] = { day: d, review: true, verbs: days.slice(d - 5, d - 1).flatMap((x) => x.verbs) };
  return days;
}
