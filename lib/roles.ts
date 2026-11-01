// Картки «Хто ти?»: однакові на реєстрації і на першому вході
import type { T } from './i18n';

export type RoleCard = { id: string; role: 'teacher' | 'student'; track?: string; icon: string; color: string; title: T; text: T };

export const ROLE_CARDS: RoleCard[] = [
  { id: 'teacher', role: 'teacher', icon: 'd-team', color: 'mustard', title: { uk: 'Я вчитель', ru: 'Я учитель', en: 'I’m a teacher' }, text: { uk: 'Учні, розклад, оплати, готові уроки й Telegram-бот.', ru: 'Ученики, расписание, оплаты, готовые уроки и Telegram-бот.', en: 'Students, schedule, payments, ready lessons and a Telegram bot.' } },
  { id: 'kid', role: 'student', track: 'kids', icon: 'd-kid', color: 'lime', title: { uk: 'Я учень', ru: 'Я ученик', en: 'I’m a student' }, text: { uk: 'Дитина або підліток: домашка-гра, монетки, квести. Батьки реєструють дитину тут.', ru: 'Ребёнок или подросток: домашка-игра, монетки, квесты. Родители регистрируют ребёнка здесь.', en: 'Kid or teen: game-like homework, coins, quests. Parents sign their child up here.' } },
  { id: 'adult', role: 'student', track: 'adult', icon: 'e-book', color: 'sky', title: { uk: 'Я дорослий', ru: 'Я взрослый', en: 'I’m an adult' }, text: { uk: 'Вчуся сам: тексти, аудіо, граматика простими словами, без монеток.', ru: 'Учусь сам: тексты, аудио, грамматика простыми словами, без монеток.', en: 'Learning on my own: texts, audio, simple grammar, no coins.' } },
  { id: 'nmt', role: 'student', track: 'nmt', icon: 'e-cap', color: 'lilac', title: { uk: 'Готуюся до НМТ', ru: 'Готовлюсь к НМТ', en: 'Preparing for the NMT' }, text: { uk: '20 пробних тестів з поясненнями і план підготовки.', ru: '20 пробных тестов с объяснениями и план подготовки.', en: '20 mock tests with explanations and a study plan.' } },
];
