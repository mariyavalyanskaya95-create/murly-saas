// Уроки бібліотеки і практика (Listening, Reading)
import ruP from './ru/practice.json';
import enP from './en/practice.json';
import ru1 from './ru/lessons1.json';
import en1 from './en/lessons1.json';
import ru2 from './ru/lessons2.json';
import en2 from './en/lessons2.json';
import ru3 from './ru/lessons3.json';
import en3 from './en/lessons3.json';
import ru4 from './ru/lessons4.json';
import en4 from './en/lessons4.json';
import ru5 from './ru/lessons5.json';
import en5 from './en/lessons5.json';
import ru6 from './ru/lessons6.json';
import en6 from './en/lessons6.json';
import ru7 from './ru/lessons7.json';
import en7 from './en/lessons7.json';
import ruXb1 from './ru/extra-b1.json';
import enXb1 from './en/extra-b1.json';
import ruXb2 from './ru/extra-b2.json';
import enXb2 from './en/extra-b2.json';
import ruXb3 from './ru/extra-b3.json';
import enXb3 from './en/extra-b3.json';
import ruXb4 from './ru/extra-b4.json';
import enXb4 from './en/extra-b4.json';
import ruXpr from './ru/extra-pr.json';
import enXpr from './en/extra-pr.json';
import { localizeWith, type Dict } from './localize';
import { DRILLS, DRILL_LABELS, drillToPlan } from '../drills';
import { localizeDrill } from './drills';
import type { Lang } from '../i18n';

// Уроки-тренажери складені з рядків теорії, тому словник для них будуємо порівнянням української і перекладеної версії
function drillDict(lang: Exclude<Lang, 'uk'>): Dict {
  const d: Dict = {};
  const pair = (a: unknown, b: unknown) => {
    if (typeof a === 'string' && typeof b === 'string') { if (a !== b) d[a] = b; return; }
    if (Array.isArray(a) && Array.isArray(b)) { a.forEach((x, i) => pair(x, b[i])); return; }
    if (a && b && typeof a === 'object' && typeof b === 'object') for (const k of Object.keys(a)) pair((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]);
  };
  for (const dr of DRILLS) pair(drillToPlan(dr), drillToPlan(localizeDrill(dr, lang), DRILL_LABELS[lang]));
  return d;
}
export const localizeLesson = localizeWith({ ru: { ...ruP, ...ru1, ...ru2, ...ru3, ...ru4, ...ru5, ...ru6, ...ru7, ...ruXb1, ...ruXb2, ...ruXb3, ...ruXb4, ...ruXpr, ...drillDict('ru') }, en: { ...enP, ...en1, ...en2, ...en3, ...en4, ...en5, ...en6, ...en7, ...enXb1, ...enXb2, ...enXb3, ...enXb4, ...enXpr, ...drillDict('en') } });
