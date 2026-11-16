// Скільки «занять» списати за проведені уроки учня.
// Звичайна тривалість = та, що трапляється найчастіше. Коротший урок рахується частково:
// 30 хв при звичайних 60 = 0,5 заняття. Довший урок рахується як одне заняття.
type BL = { duration?: unknown; trial?: unknown };
// Безкоштовний пробний урок не списуємо; пробні не впливають на «звичайну» тривалість.
export function billedUnits(all: BL[]): number {
  const billed = all.filter((l) => l.trial !== 'free');
  const regular = billed.filter((l) => !l.trial);
  const ds = (regular.length ? regular : billed).map((l) => Number(l.duration) || 0).filter((d) => d > 0);
  if (!ds.length) return billed.length;
  const cnt = new Map<number, number>();
  ds.forEach((d) => cnt.set(d, (cnt.get(d) ?? 0) + 1));
  let typical = ds[0]; let best = 0;
  cnt.forEach((n, d) => { if (n > best || (n === best && d > typical)) { best = n; typical = d; } });
  const units = billed.reduce((n, l) => { const d = Number(l.duration) || 0; return n + (d > 0 && d < typical ? d / typical : 1); }, 0);
  return Math.round(units * 100) / 100;
}
