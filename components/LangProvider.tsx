'use client';
// Мова в клієнтських компонентах: useLang() і useT()
import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { DEFAULT_LANG, LANG_COOKIE, LANGS, pick, type Lang, type T } from '@/lib/i18n';

const Ctx = createContext<Lang>(DEFAULT_LANG);

export default function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <Ctx.Provider value={lang}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
export function useT() {
  const lang = useContext(Ctx);
  return Object.assign((x: T) => pick(x, lang), { lang });
}

// Перемикач мови: УКР / РУС / ENG
export function LangSwitch({ className = '' }: { className?: string }) {
  const lang = useLang();
  const router = useRouter();
  const set = (l: Lang) => {
    if (l === lang) return;
    document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    document.documentElement.lang = l;
    router.refresh();
  };
  return (
    <div className={`mu-lang ${className}`} role="group" aria-label="Мова / Язык / Language">
      {LANGS.map((l) => (
        <button key={l.id} type="button" lang={l.id} aria-pressed={lang === l.id} title={l.name} className={lang === l.id ? 'is-on' : ''} onClick={() => set(l.id)}>{l.short}</button>
      ))}
    </div>
  );
}
