'use client';
// Підказка під заголовком сторінки: замість довгого підзаголовка маленька кнопка, яку можна відкрити й прочитати.
import type { ReactNode } from 'react';
import { useT } from './LangProvider';

export default function HeroTip({ children }: { children: ReactNode }) {
  const t = useT();
  return (
    <details className="mu-herotip">
      <summary>{t({ uk: 'Як це працює', ru: 'Как это работает', en: 'How it works' })}</summary>
      <p>{children}</p>
    </details>
  );
}
