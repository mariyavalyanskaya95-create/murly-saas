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

// нові теми (теми за юнітами Murphy, тексти й завдання власні Murly)
import { DRILL as dAdjectivesAdverbs } from './adjectives-adverbs';
import { DRILL as dCausativeHave } from './causative-have';
import { DRILL as dDependentPrepositions } from './dependent-prepositions';
import { DRILL as dFutureTimeClauses } from './future-time-clauses';
import { DRILL as dGerundInfinitive } from './gerund-infinitive';
import { DRILL as dHaveGot } from './have-got';
import { DRILL as dImperativesLets } from './imperatives-lets';
import { DRILL as dLikeDoingWantTo } from './like-doing-want-to';
import { DRILL as dLinkingWords } from './linking-words';
import { DRILL as dMayMightPossibility } from './may-might-possibility';
import { DRILL as dModalsDeduction } from './modals-deduction';
import { DRILL as dPassiveMore } from './passive-more';
import { DRILL as dPastPerfect } from './past-perfect';
import { DRILL as dPhrasalVerbs } from './phrasal-verbs';
import { DRILL as dPluralsCountable } from './plurals-countable';
import { DRILL as dPossessiveS } from './possessive-s';
import { DRILL as dPrepositionsPlace } from './prepositions-place';
import { DRILL as dPrepositionsTime } from './prepositions-time';
import { DRILL as dPresentForFuture } from './present-for-future';
import { DRILL as dPresentPerfectContinuous } from './present-perfect-continuous';
import { DRILL as dPronounsPossessives } from './pronouns-possessives';
import { DRILL as dQuestionTags } from './question-tags';
import { DRILL as dQuestionWords } from './question-words';
import { DRILL as dReflexivePronouns } from './reflexive-pronouns';
import { DRILL as dRelativeClauses } from './relative-clauses';
import { DRILL as dReportedQuestions } from './reported-questions';
import { DRILL as dReportedSpeech } from './reported-speech';
import { DRILL as dShouldHadBetter } from './should-had-better';
import { DRILL as dSoNeitherShortAnswers } from './so-neither-short-answers';
import { DRILL as dThirdConditional } from './third-conditional';
import { DRILL as dThisThatTheseThose } from './this-that-these-those';
import { DRILL as dTooEnough } from './too-enough';
import { DRILL as dUsedTo } from './used-to';
import { DRILL as dWasWere } from './was-were';
import { DRILL as dWishIfOnly } from './wish-if-only';
import { DRILL as dWordOrder } from './word-order';

import { FUN_A } from './fun-a';
import { FUN_B } from './fun-b';
export type { Drill, DrillQ, DrillFun } from './types';
// смішна сценка до кожної теми
export const DRILL_FUN = { ...FUN_A, ...FUN_B };

const LV: Record<string, number> = { A1: 0, A2: 1, B1: 2, B2: 3 };
export const DRILLS: Drill[] = [
  toBe, thereIs, presentSimple, presentContinuous, simpleVsCont, articles,
  pastSimple, pastContinuous, presentPerfect, perfectVsPast, future, quantifiers, comparatives, modals,
  conditionals, passive,
].concat([
  dHaveGot, dImperativesLets, dPrepositionsPlace, dPronounsPossessives, dThisThatTheseThose, dWasWere, dAdjectivesAdverbs, dLikeDoingWantTo, dPluralsCountable, dPossessiveS, dPrepositionsTime, dQuestionWords, dReflexivePronouns, dSoNeitherShortAnswers, dTooEnough, dCausativeHave, dDependentPrepositions, dFutureTimeClauses, dGerundInfinitive, dLinkingWords, dMayMightPossibility, dModalsDeduction, dPastPerfect, dPhrasalVerbs, dPresentForFuture, dPresentPerfectContinuous, dQuestionTags, dRelativeClauses, dReportedQuestions, dReportedSpeech, dShouldHadBetter, dUsedTo, dWishIfOnly, dWordOrder, dPassiveMore, dThirdConditional,
]).sort((x, y) => LV[x.level] - LV[y.level]);

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

// підписи уроку-тренажера трьома мовами (переклад тексту теорії береться зі словника тренажерів)
export const DRILL_LABELS = {
  uk: { theory: 'Теорія · 10 хв', when: 'Коли вживаємо', forms: 'Форми', ex: 'Приклад', trap: 'Головна пастка', markers: 'Маркери', choice: 'Обери правильний варіант.', gap: 'Впиши правильну форму.', topic: 'Граматика: тренажер', aims: (u: string) => `Повторимо правило: ${u}\n100 завдань від простого до складного\nРозберемо головні пастки`,
    note: 'Тренажер на 100 завдань: 5 раундів по 20. На уроці можна пройти 1-2 раунди, решту задати додому. Пояснення до кожної відповіді учень бачить у тренажері на сайті (розділ «Граматика»).' },
  ru: { theory: 'Теория · 10 мин', when: 'Когда употребляем', forms: 'Формы', ex: 'Пример', trap: 'Главная ловушка', markers: 'Маркеры', choice: 'Выбери правильный вариант.', gap: 'Впиши правильную форму.', topic: 'Грамматика: тренажёр', aims: (u: string) => `Повторим правило: ${u}\n100 заданий от простого к сложному\nРазберём главные ловушки`,
    note: 'Тренажёр на 100 заданий: 5 раундов по 20. На уроке можно пройти 1-2 раунда, остальное задать домой. Объяснение к каждому ответу ученик видит в тренажёре на сайте (раздел «Грамматика»).' },
  en: { theory: 'Theory · 10 min', when: 'When we use it', forms: 'Forms', ex: 'Example', trap: 'The main trap', markers: 'Signal words', choice: 'Choose the correct option.', gap: 'Write the correct form.', topic: 'Grammar: trainer', aims: (u: string) => `Review the rule: ${u}\n100 tasks from easy to hard\nGo through the main traps`,
    note: 'A 100-task trainer: 5 rounds of 20. Do 1-2 rounds in class and set the rest as homework. The student sees an explanation for every answer in the trainer on the website (Grammar section).' },
};

export function drillToPlan(d: Drill, L = DRILL_LABELS.uk): Plan {
  const H = makeHelpers(`dr-${d.slug}`);
  const th = d.theory;
  const blocks = [
    H.h(L.theory),
    H.tip(`**${L.when}**\n\n${th.when.map((w) => `${w.title}: ${w.example} (${w.uk})`).join('\n\n')}`),
    H.tip(`**${L.forms}**\n\n${th.forms.map((f) => `${f.sign}  ${f.text}. ${L.ex}: ${f.example}`).join('\n\n')}`),
    H.tip(`**${L.trap}**\n\n${th.trap.map((t) => `${t.title}. ${t.text}\n\n✗ ${t.wrong}\n\n✓ ${t.right}`).join('\n\n')}`),
    ...(th.markers.length ? [H.tip(`**${L.markers}:** ${th.markers.join(', ')}`)] : []),
    ...(th.extra ? [H.tip(`**${th.extra.title}**\n\n${th.extra.text}${th.extra.rows ? `\n\n${th.extra.rows.map((r) => r.join(' · ')).join('\n\n')}` : ''}`)] : []),
    H.note(L.note),
  ];
  d.rounds.forEach((r) => {
    const lines = r.questions.map(toLine);
    const ch = lines.filter((l) => l.type === 'choice').map((l) => l.line).join('\n');
    const gp = lines.filter((l) => l.type === 'gap').map((l) => l.line).join('\n');
    const parts: ['choice' | 'gap', string, string][] = [];
    if (ch) parts.push(['choice', L.choice, ch]);
    if (gp) parts.push(['gap', L.gap, gp]);
    blocks.push(H.h(r.title), H.ex(...parts));
  });
  return {
    id: `lib-drill-${d.slug}`, title: `${d.title}: 100 tasks`, level: d.level, age: 'teens',
    topic: `${L.topic} ${d.uk}`, color: d.color, source: 'murly', focus: ['Grammar'],
    aims: L.aims(d.uk),
    duration: 60, blocks,
  };
}

export const DRILL_PLANS: Plan[] = DRILLS.map((d) => drillToPlan(d));
