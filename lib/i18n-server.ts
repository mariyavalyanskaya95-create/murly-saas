// Мова на сервері: з cookie
import { cookies, headers } from 'next/headers';
import { DEFAULT_LANG, LANG_COOKIE, isLang, pick, type Lang, type T } from './i18n';

export function getLang(): Lang {
  // ?lang=ru в адресі (для пошуковиків) має перевагу над cookie
  const q = headers().get('x-lang');
  if (isLang(q)) return q;
  const v = cookies().get(LANG_COOKIE)?.value;
  return isLang(v) ? v : DEFAULT_LANG;
}
// Зручно в серверних компонентах: const t = tr(); t({ uk, ru, en })
export function tr() {
  const lang = getLang();
  return Object.assign((x: T) => pick(x, lang), { lang });
}
