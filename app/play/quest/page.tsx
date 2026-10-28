import type { Metadata } from 'next';
import Link from 'next/link';
import Kit from '@/components/Kit';
import Icon from '@/components/Icon';
import { LangSwitch } from '@/components/LangProvider';
import { QUEST_LIST } from '@/lib/quest-list';
import { tr } from '@/lib/i18n-server';

export const metadata: Metadata = { title: 'Find it, Bubbles! Квест англійською для дітей | Murly', description: 'Котик Бульбашка просить про допомогу англійською: кухня, кімната, школа, море. Озвучені завдання, підказки, монетки.' };
const ICONS: Record<string, string> = { kitchen: 'e-apple', bedroom: 'c-cat-sleep', classroom: 'e-pencil', sea: 'c-fish' };

export default function QuestHub() {
  const t = tr();
  return (
    <div className="sq-page">
      <header className="sq-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <Link href="/games" className="t-back">← {t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link>
        <div style={{ marginLeft: 'auto' }}><LangSwitch /></div>
      </header>
      <main className="sq qh">
        <h1>{t({ uk: 'Знайди, Бульбашко!', ru: 'Найди, Пузырёк!', en: 'Find it, Bubbles!' })}</h1>
        <p className="t-muted">{t({ uk: 'Котик Бульбашка просить про допомогу англійською. Обери місце: у кожному 9 завдань з озвучкою, підказки й монетки. Рівень A1–A2, для дітей 6–11.', ru: 'Котик Пузырёк просит о помощи по-английски. Выбери место: в каждом 9 заданий с озвучкой, подсказки и монетки. Уровень A1–A2, для детей 6–11.', en: 'Bubbles the cat needs your help in English. Pick a place: 9 voiced tasks each, hints and coins. Level A1–A2, ages 6–11.' })}</p>
        <div className="qh-grid">
          {QUEST_LIST.map((q, i) => (
            <Link key={q.id} href={`/play/quest/${q.id}`} className="qh-card">
              <span className="qh-ic" aria-hidden="true"><Icon id={ICONS[q.id]} /></span>
              <small>{t({ uk: 'Місце', ru: 'Место', en: 'Place' })} {i + 1}</small>
              <b>{t(q.title)}</b>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
