import ru from './ru/quizzes.json';
import en from './en/quizzes.json';
import { localizeWith } from './localize';
export const localizeQuiz = localizeWith({ ru, en });
