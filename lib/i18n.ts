// Мови сайту: українська (за замовчуванням), російська, англійська.
// Мова зберігається в cookie, тож адреси сторінок однакові для всіх мов.
export type Lang = 'uk' | 'ru' | 'en';
export const LANGS: { id: Lang; short: string; name: string }[] = [
  { id: 'uk', short: 'УКР', name: 'Українська' },
  { id: 'ru', short: 'РУС', name: 'Русский' },
  { id: 'en', short: 'ENG', name: 'English' },
];
export const LANG_COOKIE = 'murly_lang';
export const DEFAULT_LANG: Lang = 'uk';
export const isLang = (v: unknown): v is Lang => v === 'uk' || v === 'ru' || v === 'en';

// Текст трьома мовами. Якщо перекладу немає, показуємо українську.
export type T = { uk: string; ru?: string; en?: string };
export const pick = (t: T, lang: Lang) => t[lang] ?? t.uk;
// Те саме для довільних значень (масиви, обʼєкти, JSX)
export const pickAny = <V,>(t: { uk: V; ru?: V; en?: V }, lang: Lang): V => t[lang] ?? t.uk;
