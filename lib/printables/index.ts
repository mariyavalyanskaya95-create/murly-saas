// Усі документи для друку за id
import type { Block, PrintDoc } from './types';
import { NMT_CHECKLIST } from './nmt-checklist';
import { WORDS_100 } from './words-100';
import { VERBS_30 } from './verbs-30';
import { EXTRAS } from './extras';
import { TEACHERS } from './teachers';
import { KIDS } from './kids';
import { GRAMMAR } from '../grammar';

// Граматика A1-B1 з наших тем: правило, приклади, помилки, вправи; ключі в кінці
function grammarDoc(): PrintDoc {
  const topics = GRAMMAR.filter((g) => g.level !== 'B2');
  const blocks: Block[] = [];
  const keys: string[] = [];
  topics.forEach((g, i) => {
    if (i) blocks.push({ pagebreak: true });
    blocks.push({ h: `${i + 1}. ${g.title} (${g.level}) · ${g.uk}` }, { p: g.lead });
    blocks.push({ table: { head: ['', 'Formula', 'Example'], rows: g.formula.map((f) => [f.sign, f.text, f.example]) } });
    blocks.push({ table: { head: ['Use', 'Example', 'Переклад'], rows: g.uses.map((u) => [u.title, u.example, u.uk]) } });
    if (g.markers?.length) blocks.push({ p: `Markers: ${g.markers.join(', ')}` });
    blocks.push({ table: { head: ['Wrong', 'Right', ''], rows: g.mistakes.map((m) => [m.wrong, m.right, m.note]) } });
    blocks.push({ tip: g.tip });
    const qs = g.quiz.slice(0, 8);
    blocks.push({ tasks: { title: `${g.title}: exercise`, items: qs.map((q) => `${q.q}  (${q.options.join(' / ')})`) } });
    keys.push(`${i + 1}. ${g.title}: ${qs.map((q, k) => `${k + 1}) ${q.a}`).join('; ')}`);
  });
  blocks.push({ pagebreak: true }, { answers: { title: { uk: 'Ключі до вправ', ru: 'Ключи к упражнениям' }, items: keys } });
  return { id: 'grammar-a1b1', title: { uk: 'Уся базова граматика A1-B1', ru: 'Вся базовая грамматика A1-B1' }, subtitle: { uk: `${topics.length} тем: правила, приклади, типові помилки і вправи з ключами`, ru: `${topics.length} тем: правила, примеры, типичные ошибки и упражнения с ключами` }, level: 'A1-B1', blocks };
}

export const DOCS: Record<string, PrintDoc> = Object.fromEntries(
  [...NMT_CHECKLIST, ...WORDS_100, ...VERBS_30, ...EXTRAS, ...TEACHERS, ...KIDS, grammarDoc()].map((d) => [d.id, d]),
);
export const getDoc = (id: string) => DOCS[id];
