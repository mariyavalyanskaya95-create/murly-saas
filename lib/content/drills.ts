// Тренажери граматики російською й англійською: той самий словник «український рядок → переклад»
import ru1 from './ru/drills-1.json';
import ru2 from './ru/drills-2.json';
import ru3 from './ru/drills-3.json';
import ru4 from './ru/drills-4.json';
import en1 from './en/drills-1.json';
import en2 from './en/drills-2.json';
import en3 from './en/drills-3.json';
import en4 from './en/drills-4.json';
import ruP from './ru/drills-plus.json';
import enP from './en/drills-plus.json';
import { localizeWith, type Dict } from './localize';

export const DRILL_RU: Dict = { ...ru1, ...ru2, ...ru3, ...ru4, ...ruP };
export const DRILL_EN: Dict = { ...en1, ...en2, ...en3, ...en4, ...enP };
export const localizeDrill = localizeWith({ ru: DRILL_RU, en: DRILL_EN });
