// Навички й рівні для меню «Вчитися самому» (як у British Council: навичка → рівень).
// Легкий файл без контенту, його можна імпортувати і в меню (клієнт).
import type { T } from './i18n';

export type SkillId = 'listening' | 'reading' | 'writing' | 'speaking' | 'grammar' | 'vocabulary' | 'nmt';
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export const LEVELS_ALL: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const SKILLS: { id: SkillId; icon: string; label: T; text: T; levels: Level[] }[] = [
  { id: 'listening', icon: 'e-head', label: { uk: 'Слухати', ru: 'Аудирование', en: 'Listening' }, text: { uk: 'Діалоги й оголошення з питаннями', ru: 'Диалоги и объявления с вопросами', en: 'Dialogues and announcements with questions' }, levels: ['A1', 'A2', 'B1', 'B2', 'C1'] },
  { id: 'reading', icon: 'e-book', label: { uk: 'Читати', ru: 'Чтение', en: 'Reading' }, text: { uk: 'Історії, статті, тексти для обговорення', ru: 'Истории, статьи, тексты для обсуждения', en: 'Stories, articles, texts to discuss' }, levels: ['A1', 'A2', 'B1', 'B2', 'C1'] },
  { id: 'writing', icon: 'e-pencil', label: { uk: 'Писати', ru: 'Письмо', en: 'Writing' }, text: { uk: 'Листи, есе, короткі тексти', ru: 'Письма, эссе, короткие тексты', en: 'Letters, essays, short texts' }, levels: ['A1', 'A2', 'B1', 'B2', 'C1'] },
  { id: 'speaking', icon: 'e-speak', label: { uk: 'Говорити', ru: 'Говорение', en: 'Speaking' }, text: { uk: 'Питання для розмови, скоромовки', ru: 'Вопросы для разговора, скороговорки', en: 'Questions to talk about, tongue twisters' }, levels: ['A1', 'A2', 'B1', 'B2', 'C1'] },
  { id: 'grammar', icon: 'e-abc', label: { uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' }, text: { uk: 'Правила, тренажери, неправильні дієслова', ru: 'Правила, тренажёры, неправильные глаголы', en: 'Rules, trainers, irregular verbs' }, levels: ['A1', 'A2', 'B1'] },
  { id: 'vocabulary', icon: 'd-cup', label: { uk: 'Слова', ru: 'Лексика', en: 'Vocabulary' }, text: { uk: 'Слова за темами, ігри', ru: 'Слова по темам, игры', en: 'Words by topic, games' }, levels: ['A1', 'A2', 'B1', 'B2', 'C1'] },
  { id: 'nmt', icon: 'e-trophy', label: { uk: 'НМТ', ru: 'НМТ', en: 'NMT exam' }, text: { uk: 'Пробні тести, квізи у форматі іспиту', ru: 'Пробные тесты, квизы в формате экзамена', en: 'Mock tests and exam-style quizzes' }, levels: ['A2', 'B1'] },
];
export const getSkill = (id: string) => SKILLS.find((s) => s.id === id);
