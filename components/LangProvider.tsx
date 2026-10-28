'use client';
// Мова в клієнтських компонентах: useLang() і useT()
import { createContext, useContext, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { DEFAULT_LANG, LANG_COOKIE, LANGS, pick, type Lang, type T } from '@/lib/i18n';

const Ctx = createContext<Lang>(DEFAULT_LANG);

export default function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <Ctx.Provider value={lang}><LangSync lang={lang} />{children}</Ctx.Provider>;
}

const setCookie = (l: Lang) => { document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`; document.documentElement.lang = l; };

// Мова акаунта: якщо учень обрав мову на іншому пристрої, тут вона підхоплюється сама
function LangSync({ lang }: { lang: Lang }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const saved = (user?.unsafeMetadata as { lang?: string } | undefined)?.lang;
  useEffect(() => {
    if (!isLoaded || !saved || saved === lang || !LANGS.some((l) => l.id === saved)) return;
    try { if (sessionStorage.getItem('murly:lang-sync') === saved) return; sessionStorage.setItem('murly:lang-sync', saved); } catch { /* */ }
    setCookie(saved as Lang);
    router.refresh();
  }, [isLoaded, saved, lang, router]);
  return null;
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
  const { user } = useUser();
  const set = (l: Lang) => {
    if (l === lang) return;
    setCookie(l);
    try { sessionStorage.setItem('murly:lang-sync', l); } catch { /* */ }
    // запам'ятовуємо в акаунті, щоб на інших пристроях одразу була ця мова
    if (user) user.update({ unsafeMetadata: { ...user.unsafeMetadata, lang: l } }).catch(() => {});
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
