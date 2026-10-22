'use client';
// «Режим уроку»: коли вчитель показує екран учню, ховаємо ціни, оплати, розклад і нотатки.
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const KEY = 'murly:lesson-mode';
const Ctx = createContext<{ on: boolean; toggle: () => void }>({ on: false, toggle: () => {} });

export function LessonModeProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  useEffect(() => { try { setOn(localStorage.getItem(KEY) === '1'); } catch { /* */ } }, []);
  const toggle = useCallback(() => setOn((v) => { const n = !v; try { localStorage.setItem(KEY, n ? '1' : '0'); } catch { /* */ } return n; }), []);
  return <Ctx.Provider value={{ on, toggle }}>{children}</Ctx.Provider>;
}
export const useLessonMode = () => useContext(Ctx);
