// Мова на сервері: з cookie
import { cookies } from 'next/headers';
import { DEFAULT_LANG, LANG_COOKIE, isLang, pick, type Lang, type T } from './i18n';

export function getLang(): Lang {
  const v = cookies().get(LANG_COOKIE)?.value;
  return isLang(v) ? v : DEFAULT_LANG;
}
// Зручно в серверних компонентах: const t = tr(); t({ uk, ru, en })
export function tr() {
  const lang = getLang();
  return Object.assign((x: T) => pick(x, lang), { lang });
}
