// SEO: адреси мовних версій. Українська без параметра, російська й англійська з ?lang=ru / ?lang=en.
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { getLang } from './i18n-server';

export const SITE_URL = 'https://murly.com.ua';
const withLang = (path: string, lang: string) => (lang === 'uk' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`);

// canonical для поточної мови + hreflang для всіх трьох
export function alt(path?: string): Metadata['alternates'] {
  const p = path ?? (headers().get('x-path') || '/');
  const lang = getLang();
  return {
    canonical: withLang(p, lang),
    languages: { 'uk-UA': withLang(p, 'uk'), 'ru-UA': withLang(p, 'ru'), en: withLang(p, 'en'), 'x-default': p },
  };
}

// Сторінки кабінетів і службові: не індексуємо
export const PRIVATE_PREFIXES = ['/teacher', '/student', '/dashboard', '/api', '/p/', '/join', '/sign-in', '/sign-up', '/login', '/r/', '/play/g/', '/welcome'];
