// Каталог усіх матеріалів сайту за навичками й рівнями (тільки сервер: тягне всі уроки й тексти).
import type { Lang, T } from './i18n';
import type { Level, SkillId } from './skills';
import type { Plan } from './lesson';
import { BATCH_1 } from './lessons/batch-1';
import { BATCH_2 } from './lessons/batch-2';
import { BATCH_3 } from './lessons/batch-3';
import { BATCH_4 } from './lessons/batch-4';
import { BATCH_5 } from './lessons/batch-5';
import { BATCH_6 } from './lessons/batch-6';
import { BATCH_7 } from './lessons/batch-7';
import { BATCH_8 } from './lessons/batch-8';
import { BATCH_9 } from './lessons/batch-9';
import { PRACTICE } from './practice';
import { ALL_STORIES, GENRES } from './stories';
import { GRAMMAR } from './grammar';
import { DRILLS } from './drills';
import { MOCKS } from './mock';
import { QUIZZES } from './quizzes';
import { SERIES } from './series';
import { localizeLesson } from './content/lessons';
import { localizeGrammar } from './content/grammar';
import { localizeDrill } from './content/drills';

export type CatalogItem = { skill: SkillId; level: Level | 'all'; kind: T; title: string; text: string; href: string; icon: string; color: string; minutes?: number };

const KIND = {
  lesson: { uk: 'Урок', ru: 'Урок', en: 'Lesson' },
  listen: { uk: 'Аудіювання', ru: 'Аудирование', en: 'Listening' },
  read: { uk: 'Текст', ru: 'Текст', en: 'Text' },
  rule: { uk: 'Правило', ru: 'Правило', en: 'Rule' },
  trainer: { uk: 'Тренажер, 100 завдань', ru: 'Тренажёр, 100 заданий', en: 'Trainer, 100 tasks' },
  game: { uk: 'Гра', ru: 'Игра', en: 'Game' },
  mock: { uk: 'Пробний НМТ', ru: 'Пробный НМТ', en: 'Mock NMT' },
  quiz: { uk: 'Квіз', ru: 'Квиз', en: 'Quiz' },
  practice: { uk: 'Практика', ru: 'Практика', en: 'Practice' },
} satisfies Record<string, T>;

const FOCUS_SKILL: Record<string, SkillId> = { Listening: 'listening', Reading: 'reading', Writing: 'writing', Speaking: 'speaking', Grammar: 'grammar', Vocabulary: 'vocabulary', 'НМТ': 'nmt' };
export const LESSONS: Plan[] = [...BATCH_1, ...BATCH_2, ...BATCH_3, ...BATCH_4, ...BATCH_5, ...BATCH_6, ...BATCH_7, ...BATCH_8, ...BATCH_9];
const lvl = (l: string): Level => (['A1', 'A2', 'B1', 'B2', 'C1'].includes(l) ? l : 'B1') as Level;

export function catalog(lang: Lang): CatalogItem[] {
  const t = (x: T) => x[lang] ?? x.uk;
  const out: CatalogItem[] = [];
  // готові уроки: у кожну навичку з їхнього фокусу
  for (const p0 of LESSONS) {
    const p = localizeLesson(p0, lang);
    const skills = new Set((p.focus ?? []).map((f) => FOCUS_SKILL[f]).filter(Boolean));
    for (const skill of Array.from(skills)) out.push({ skill, level: lvl(p.level), kind: KIND.lesson, title: p.title, text: p.topic ?? '', href: `/lessons/${p.id.replace(/^lib-/, '')}`, icon: 'e-board', color: p.color, minutes: p.duration });
  }
  // аудіювання і читання з розділу «Практика»
  for (const p0 of PRACTICE) {
    const p = localizeLesson(p0, lang);
    const listen = (p.focus ?? []).includes('Listening');
    out.push({ skill: listen ? 'listening' : 'reading', level: lvl(p.level), kind: listen ? KIND.listen : KIND.read, title: p.title, text: p.topic ?? '', href: `/practice/${p.id.replace(/^lib-/, '')}`, icon: listen ? 'e-head' : 'e-book', color: p.color });
  }
  // аудіосеріали: кожна серія в «Слухати»
  for (const s of SERIES) for (const e of s.episodes) out.push({ skill: 'listening', level: lvl(s.level.slice(0, 2)), kind: { uk: 'Аудіосеріал', ru: 'Аудиосериал', en: 'Audio series' }, title: `${s.title}, ${e.n}: ${e.title}`, text: t(e.teaser), href: `/series/${s.slug}/${e.n}`, icon: 'e-head', color: s.color });
  // історії й тексти для обговорення
  for (const s of ALL_STORIES) {
    const g = GENRES.find((x) => x.id === s.genre);
    const item = { level: lvl(s.level), kind: g ? g.label : KIND.read, title: s.title, text: t(s.teaser), href: `/stories/${s.id}`, icon: 'e-book', color: s.color, minutes: s.minutes };
    out.push({ skill: 'reading', ...item });
    if (s.genre === 'think') out.push({ skill: 'speaking', ...item });
  }
  // граматика: правила і тренажери
  for (const g0 of GRAMMAR) {
    const g = localizeGrammar(g0, lang);
    out.push({ skill: 'grammar', level: lvl(g.level), kind: KIND.rule, title: g.title, text: g.uk, href: `/grammar/${g.slug}`, icon: g.icon, color: g.color });
  }
  for (const d0 of DRILLS) {
    const d = localizeDrill(d0, lang);
    out.push({ skill: 'grammar', level: lvl(d.level), kind: KIND.trainer, title: d.title, text: d.uk, href: `/grammar/trainer/${d.slug}`, icon: d.icon, color: d.color === 'pink' ? 'tomato' : d.color });
  }
  out.push({ skill: 'grammar', level: 'A2', kind: KIND.rule, title: t({ uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' }), text: t({ uk: 'Таблиця з озвучкою і перекладом', ru: 'Таблица с озвучкой и переводом', en: 'Table with audio and translations' }), href: '/irregular-verbs', icon: 'e-book', color: 'sky' });
  out.push({ skill: 'vocabulary', level: 'A2', kind: KIND.game, title: t({ uk: 'Ігри з неправильними дієсловами', ru: 'Игры с неправильными глаголами', en: 'Irregular verb games' }), text: t({ uk: 'Картки, пари, вікторина', ru: 'Карточки, пары, викторина', en: 'Cards, pairs, quiz' }), href: '/irregular-verbs/games', icon: 'd-cup', color: 'mustard' });
  // говоріння: скоромовки для всіх рівнів
  out.push({ skill: 'speaking', level: 'all', kind: KIND.practice, title: t({ uk: 'Скоромовки', ru: 'Скороговорки', en: 'Tongue twisters' }), text: t({ uk: 'Вимова на час, з озвучкою', ru: 'Произношение на время, с озвучкой', en: 'Pronunciation against the clock, with audio' }), href: '/tongue-twisters', icon: 'e-speak', color: 'lime' });
  // НМТ
  for (const m of MOCKS) out.push({ skill: 'nmt', level: Number(m.id) <= 4 ? 'A2' : 'B1', kind: KIND.mock, title: m.title, text: t({ uk: 'Повний тест з поясненнями «Чому так?»', ru: 'Полный тест с объяснениями «Почему так?»', en: 'Full test with “Why?” explanations' }), href: `/nmt/mock/${m.id}`, icon: 'e-trophy', color: 'mustard' });
  for (const q of QUIZZES) out.push({ skill: 'nmt', level: 'B1', kind: KIND.quiz, title: q.title, text: q.description, href: `/quiz/${q.slug}`, icon: q.icon, color: 'sky' });
  return out;
}
