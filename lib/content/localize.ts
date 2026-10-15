// Навчальний контент трьома мовами: оригінальні дані українською лишаються як є,
// а при показі кожен український рядок замінюється перекладом зі словника (ru / en).
import type { Lang } from '../i18n';

export type Dict = Record<string, string>;
const cache = new WeakMap<object, Map<Lang, unknown>>();

function walk(v: unknown, d: Dict): unknown {
  if (typeof v === 'string') return d[v] ?? v;
  if (Array.isArray(v)) return v.map((x) => walk(x, d));
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) out[k] = walk(x, d);
    return out;
  }
  return v;
}

// Повертає копію даних мовою lang (для 'uk' або без словника: ті самі дані)
export function localizeWith(dicts: { ru: Dict; en: Dict }) {
  return <T,>(data: T, lang: Lang): T => {
    if (lang === 'uk' || data === null || typeof data !== 'object') return data;
    const obj = data as unknown as object;
    let m = cache.get(obj);
    if (!m) { m = new Map(); cache.set(obj, m); }
    if (!m.has(lang)) m.set(lang, walk(data, dicts[lang]));
    return m.get(lang) as T;
  };
}
