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
import { localizeWith } from './localize';
export const localizeLesson = localizeWith({ ru: { ...ruP, ...ru1, ...ru2, ...ru3, ...ru4, ...ru5, ...ru6, ...ru7 }, en: { ...enP, ...en1, ...en2, ...en3, ...en4, ...en5, ...en6, ...en7 } });
