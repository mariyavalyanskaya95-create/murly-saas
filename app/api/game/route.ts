import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;
const GAMES = new Set(['town']);

// збереження ігор у хмарі: учень може грати з будь-якого пристрою
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const game = new URL(req.url).searchParams.get('game') ?? '';
  if (!GAMES.has(game)) return NextResponse.json({ error: 'bad_game' }, { status: 400 });
  if (!dbReady()) return NextResponse.json({ data: null });
  try {
    const r = await db.query(`game_saves?user_id=eq.${enc(userId)}&game=eq.${enc(game)}&select=data,updated_at`);
    return NextResponse.json({ data: r[0]?.data ?? null, updatedAt: r[0]?.updated_at ?? null });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db_not_configured' }, { status: 503 });
  const text = await req.text();
  if (text.length > 400_000) return NextResponse.json({ error: 'too_big' }, { status: 413 });
  let b: { game?: string; data?: unknown };
  try { b = JSON.parse(text); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  if (!b.game || !GAMES.has(b.game) || typeof b.data !== 'object') return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  try {
    const now = new Date().toISOString();
    await db.upsert('game_saves', [{ user_id: userId, game: b.game, data: b.data, updated_at: now }]);
    return NextResponse.json({ ok: true, updatedAt: now });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
