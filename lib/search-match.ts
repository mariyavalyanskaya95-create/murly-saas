// Пошук по сайту: нормалізація, синоніми трьома мовами і ранжування. Спільне для сторінки пошуку і поля в шапці.
import type { SearchItem } from './search-index';

export const norm = (s: string) => s.toLowerCase().replace(/ё/g, 'е').replace(/[’'`]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

// Однакові теми різними мовами: що вчитель може написати
const SYN: string[][] = [
  ['предлог', 'прийменник', 'preposition'],
  ['цвет', 'колір', 'кольор', 'colour', 'color'],
  ['числ', 'цифр', 'number', 'count', 'рахув', 'счет'],
  ['еда', 'еды', 'еду', 'їжа', 'їжі', 'їжу', 'food', 'продукт'],
  ['одежд', 'одяг', 'clothes'],
  ['животн', 'тварин', 'animal'],
  ['мебел', 'меблі', 'furniture'],
  ['кухн', 'kitchen'],
  ['ванн', 'bathroom'],
  ['школ', 'school', 'class'],
  ['магазин', 'shop', 'покуп'],
  ['парк', 'park', 'природ', 'nature'],
  ['аудир', 'аудіюв', 'слуха', 'listen'],
  ['чтени', 'читан', 'read'],
  ['говор', 'speak', 'розмов', 'разговор'],
  ['письм', 'writ'],
  ['грамат', 'граммат', 'grammar'],
  ['лексик', 'слова', 'vocabular', 'word'],
  ['игра', 'игры', 'игру', 'игр', 'гра', 'гру', 'ігри', 'ігор', 'game', 'квест', 'quest'],
  ['дети', 'детей', 'детск', 'діти', 'дітей', 'дитяч', 'kids', 'child', 'малыш', 'малюк'],
  ['подрост', 'підліт', 'teen'],
  ['взросл', 'доросл', 'adult'],
  ['неправильн', 'irregular'],
  ['времена', 'часи', 'tense'],
  ['present simple', 'презент симпл', 'теперішній простий', 'настоящее простое'],
  ['past simple', 'минулий простий', 'прошедшее простое'],
  ['нмт', 'nmt', 'зно', 'экзамен', 'іспит', 'exam'],
];

// службові слова не мають впливати на пошук
const STOP = new Set(['для', 'на', 'в', 'у', 'з', 'с', 'со', 'і', 'и', 'й', 'та', 'про', 'по', 'до', 'від', 'от', 'for', 'the', 'a', 'an', 'and', 'of', 'to', 'урок', 'уроки']);

export function variants(tok: string): string[] {
  const n = norm(tok);
  const out = new Set([n]);
  for (const g of SYN) if (g.some((w) => { const x = norm(w); return x.length >= 4 ? n.startsWith(x) : n === x; })) g.forEach((w) => out.add(norm(w)));
  return Array.from(out).filter(Boolean);
}


export function rankSearch(items: SearchItem[], q: string, f: { skill?: string; level?: string } = {}): SearchItem[] {
  const all = norm(q).split(' ').filter(Boolean);
  const toks = all.filter((x) => !STOP.has(x)).length ? all.filter((x) => !STOP.has(x)) : all;
  const full = norm(q);
  const list = items.filter((it) => (!f.skill || it.skill === f.skill) && (!f.level || it.level === f.level || it.level === 'all'));
  if (!toks.length) return [];
  const scored = list.map((it) => {
    const title = norm(`${it.title.uk} ${it.title.ru ?? ''} ${it.title.en ?? ''}`);
    const hay = ` ${it.hay} `;
    const kind = ` ${norm(`${it.kind.uk} ${it.kind.ru ?? ''} ${it.kind.en ?? ''}`)}`;
    let score = 0;
    if (full.length > 3 && hay.includes(full)) score += 6;
    for (const tok of toks) {
      const vs = variants(tok);
      // збіг з початком слова: «гра» не знаходить «граматику»
      const inTitle = vs.some((v) => ` ${title}`.includes(` ${v}`));
      const inHay = vs.some((v) => hay.includes(v.length <= 2 ? ` ${v} ` : ` ${v}`));
      if (!inHay) return { it, score: -1 };
      score += inTitle ? 4 : vs.some((v) => kind.includes(` ${v}`)) ? 3 : 1;
    }
    return { it, score };
  }).filter((x) => x.score > 0);
  scored.sort((a, b) => b.score - a.score);
  return scored.map((x) => x.it);
}
