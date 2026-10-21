// Усі тренажери граматики (по 100 завдань) + перетворення тренажера на урок бібліотеки (щоб задати як домашку).
import type { Drill, DrillQ } from './types';
import type { Plan } from '../lesson';
import { makeHelpers } from '../lessons/helpers';
import { DRILL as toBe } from './to-be';
import { DRILL as thereIs } from './there-is-are';
import { DRILL as presentSimple } from './present-simple';
import { DRILL as presentContinuous } from './present-continuous';
import { DRILL as simpleVsCont } from './simple-vs-continuous';
import { DRILL as pastSimple } from './past-simple';
import { DRILL as pastContinuous } from './past-continuous';
import { DRILL as presentPerfect } from './present-perfect';
import { DRILL as perfectVsPast } from './perfect-vs-past';
import { DRILL as future } from './future-forms';
import { DRILL as articles } from './articles';
import { DRILL as quantifiers } from './quantifiers';
import { DRILL as comparatives } from './comparatives';
import { DRILL as modals } from './modals';
import { DRILL as conditionals } from './conditionals';
import { DRILL as passive } from './passive';

export type { Drill, DrillQ } from './types';

export const DRILLS: Drill[] = [
  toBe, thereIs, presentSimple, presentContinuous, simpleVsCont, articles,
  pastSimple, pastContinuous, presentPerfect, perfectVsPast, future, quantifiers, comparatives, modals,
  conditionals, passive,
];

export const getDrill = (slug: string) => DRILLS.find((d) => d.slug === slug);

// тема граматики (/grammar/<slug>) → тренажер
const BY_GRAMMAR: Record<string, string> = { 'comparatives-superlatives': 'comparatives', 'passive-voice': 'passive' };
export const drillForGrammar = (grammarSlug: string) => getDrill(BY_GRAMMAR[grammarSlug] ?? grammarSlug);

// ---------- тренажер як урок бібліотеки ----------
const esc = (s: string) => s.replace(/[{}[\]|]/g, '');
function toLine(q: DrillQ): { type: 'choice' | 'gap'; line: string } {
  if (q.k === 'type') return { type: 'gap', line: q.q.replace('___', `[${q.answers.map(esc).join('/')}]`) };
  const opts = [q.options[q.a], ...q.options.filter((_, i) => i !== q.a)].map(esc).join('|');
  return { type: 'choice', line: q.q.includes('___') ? q.q.replace('___', `{${opts}}`) : `${q.q.replace(/[.:]\s*$/, '')}: {${opts}}` };
}

export function drillToPlan(d: Drill): Plan {
  const H = makeHelpers(`dr-${d.slug}`);
  const th = d.theory;
  const blocks = [
    H.h('Теорія · 10 хв'),
    H.tip(`**Коли вживаємо**\n\n${th.when.map((w) => `${w.title}: ${w.example} (${w.uk})`).join('\n\n')}`),
    H.tip(`**Форми**\n\n${th.forms.map((f) => `${f.sign}  ${f.text}. Приклад: ${f.example}`).join('\n\n')}`),
    H.tip(`**Головна пастка**\n\n${th.trap.map((t) => `${t.title}. ${t.text}\n\n✗ ${t.wrong}\n\n✓ ${t.right}`).join('\n\n')}`),
    ...(th.markers.length ? [H.tip(`**Маркери:** ${th.markers.join(', ')}`)] : []),
    ...(th.extra ? [H.tip(`**${th.extra.title}**\n\n${th.extra.text}${th.extra.rows ? `\n\n${th.extra.rows.map((r) => r.join(' · ')).join('\n\n')}` : ''}`)] : []),
    H.note('Тренажер на 100 завдань: 5 раундів по 20. На уроці можна пройти 1-2 раунди, решту задати додому. Пояснення до кожної відповіді учень бачить у тренажері на сайті (розділ «Граматика»).'),
  ];
  d.rounds.forEach((r) => {
    const lines = r.questions.map(toLine);
    const ch = lines.filter((l) => l.type === 'choice').map((l) => l.line).join('\n');
    const gp = lines.filter((l) => l.type === 'gap').map((l) => l.line).join('\n');
    const parts: ['choice' | 'gap', string, string][] = [];
    if (ch) parts.push(['choice', 'Обери правильний варіант.', ch]);
    if (gp) parts.push(['gap', 'Впиши правильну форму.', gp]);
    blocks.push(H.h(r.title), H.ex(...parts));
  });
  return {
    id: `lib-drill-${d.slug}`, title: `${d.title}: 100 tasks`, level: d.level, age: 'teens',
    topic: `Граматика: тренажер ${d.uk}`, color: d.color, source: 'murly', focus: ['Grammar'],
    aims: `Повторимо правило: ${d.uk}\n100 завдань від простого до складного\nРозберемо головні пастки`,
    duration: 60, blocks,
  };
}

export const DRILL_PLANS: Plan[] = DRILLS.map(drillToPlan);
