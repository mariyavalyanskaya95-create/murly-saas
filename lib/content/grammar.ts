import ru from './ru/grammar.json';
import en from './en/grammar.json';
import { localizeWith } from './localize';
export const localizeGrammar = localizeWith({ ru, en });
