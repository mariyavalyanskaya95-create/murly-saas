import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db, dbReady } from '@/lib/db';
import GameHub from '@/components/games/GameHub';
import Kit from '@/components/Kit';
import { tr } from '@/lib/i18n-server';
import type { GameItem } from '@/components/games/engine';

export const dynamic = 'force-dynamic';

async function getGame(id: string) {
  if (!dbReady() || !/^[a-z0-9]{6,20}$/.test(id)) return null;
  const r = await db.query(`teacher_games?id=eq.${encodeURIComponent(id)}&select=id,title,prompt,items`).catch(() => []);
  return r[0] as { id: string; title: string; prompt?: string; items: GameItem[] } | undefined;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const g = await getGame(params.id);
  return { title: g ? `${g.title} | Murly` : 'Murly', robots: { index: false, follow: false } };
}

// Гра, яку створив учитель. Відкривається за посиланням без входу.
export default async function TeacherGamePage({ params }: { params: { id: string } }) {
  const g = await getGame(params.id);
  if (!g) notFound();
  const t = tr();
  return (
    <div className="pg-wrap">
      <header className="pg-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
      </header>
      <main className="mu-container" style={{ paddingTop: 24, paddingBottom: 60 }}>
        <span className="mu-section__eyebrow">{t({ uk: 'Гра від учителя', ru: 'Игра от учителя', en: 'A game from your teacher' })}</span>
        <h1 className="pg-title">{g.title}</h1>
        <GameHub sets={[{ id: g.id, title: g.title, prompt: g.prompt || t({ uk: 'Обери гру і грай', ru: 'Выбери игру и играй', en: 'Pick a game and play' }), items: g.items }]} />
      </main>
    </div>
  );
}
