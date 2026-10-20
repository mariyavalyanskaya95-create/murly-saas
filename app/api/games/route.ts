import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { parseWords } from '@/lib/teacher-games';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;

// Свої ігри вчителя: набір слів, який учні відкривають за посиланням /play/g/<id>.
// GET ?id=<id>: публічно (для гри). GET без параметрів: мої ігри. POST: створити. DELETE ?id: видалити.
export async function GET(req: Request) {
  if (!dbReady()) return NextResponse.json({ games: [] });
  const id = new URL(req.url).searchParams.get('id');
  try {
    if (id) {
      const r = await db.query(`teacher_games?id=eq.${enc(id)}&select=id,title,prompt,items`);
      return r[0] ? NextResponse.json({ game: r[0] }) : NextResponse.json({ error: 'not_found' }, { status: 404 });
    }
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    const r = await db.query(`teacher_games?teacher_id=eq.${enc(userId)}&order=created_at.desc&select=id,title,prompt,items,created_at`);
    return NextResponse.json({ games: r });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db_not_configured' }, { status: 503 });
  let b: { title?: string; prompt?: string; words?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const items = parseWords(String(b.words ?? ''));
  const title = String(b.title ?? '').trim().slice(0, 80);
  if (!title || items.length < 4) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 10);
  try {
    await db.insert('teacher_games', [{ id, teacher_id: userId, title, prompt: String(b.prompt ?? '').trim().slice(0, 120), items }]);
    return NextResponse.json({ id });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const id = new URL(req.url).searchParams.get('id');
  if (!id || !dbReady()) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  try { await db.remove('teacher_games', userId, id); return NextResponse.json({ ok: true }); }
  catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
