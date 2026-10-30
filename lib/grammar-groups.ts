// Блоки граматики на сторінці /grammar: кожна тема (тренажер) в одному блоці
import type { T } from './i18n';
export const GRAMMAR_GROUPS: { id: string; icon: string; title: T; slugs: string[] }[] = [
  { id: 'tenses', icon: 'd-clock', title: { uk: 'Часи', ru: 'Времена', en: 'Tenses' }, slugs: ['to-be', 'was-were', 'present-simple', 'present-continuous', 'simple-vs-continuous', 'past-simple', 'past-continuous', 'present-perfect', 'present-perfect-continuous', 'perfect-vs-past', 'past-perfect', 'used-to', 'future-forms', 'present-for-future', 'future-time-clauses'] },
  { id: 'modals', icon: 'd-bulb', title: { uk: 'Модальні дієслова', ru: 'Модальные глаголы', en: 'Modal verbs' }, slugs: ['modals', 'may-might-possibility', 'modals-deduction', 'should-had-better'] },
  { id: 'nouns', icon: 'e-abc', title: { uk: 'Займенники, артиклі, іменники', ru: 'Местоимения, артикли, существительные', en: 'Pronouns, articles, nouns' }, slugs: ['pronouns-possessives', 'this-that-these-those', 'reflexive-pronouns', 'possessive-s', 'articles', 'plurals-countable', 'quantifiers', 'there-is-are', 'have-got'] },
  { id: 'adj', icon: 'd-spark', title: { uk: 'Прикметники і прислівники', ru: 'Прилагательные и наречия', en: 'Adjectives and adverbs' }, slugs: ['adjectives-adverbs', 'comparatives', 'too-enough', 'word-order'] },
  { id: 'prep', icon: 'd-rocket', title: { uk: 'Прийменники і фразові дієслова', ru: 'Предлоги и фразовые глаголы', en: 'Prepositions and phrasal verbs' }, slugs: ['prepositions-place', 'prepositions-time', 'dependent-prepositions', 'phrasal-verbs'] },
  { id: 'questions', icon: 'd-chat', title: { uk: 'Питання, відповіді, прохання', ru: 'Вопросы, ответы, просьбы', en: 'Questions, answers, requests' }, slugs: ['question-words', 'so-neither-short-answers', 'question-tags', 'imperatives-lets'] },
  { id: 'verbs', icon: 'e-pencil', title: { uk: 'Форми дієслова і пасив', ru: 'Формы глагола и пассив', en: 'Verb patterns and passive' }, slugs: ['like-doing-want-to', 'gerund-infinitive', 'causative-have', 'passive', 'passive-more'] },
  { id: 'clauses', icon: 'e-book', title: { uk: 'Складні речення', ru: 'Сложные предложения', en: 'Complex sentences' }, slugs: ['conditionals', 'third-conditional', 'wish-if-only', 'relative-clauses', 'linking-words', 'reported-speech', 'reported-questions'] },
];
