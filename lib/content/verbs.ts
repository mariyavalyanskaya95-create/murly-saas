import ru from './ru/verbs.json';
import en from './en/verbs.json';
import { localizeWith } from './localize';
export const localizeVerbs = localizeWith({ ru, en });
