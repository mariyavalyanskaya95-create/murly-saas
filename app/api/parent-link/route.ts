import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { parentToken } from '@/lib/parent-link';

// Вчитель отримує посилання для батьків свого учня
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId || !dbReady()) return NextResponse.json({ error: 'auth' }, { status: 401 });
  const sid = new URL(req.url).searchParams.get('student') || '';
  if (!/^[0-9a-f-]{36}$/i.test(sid)) return NextResponse.json({ error: 'bad' }, { status: 400 });
  const r = await db.query(`students?id=eq.${encodeURIComponent(sid)}&teacher_id=eq.${encodeURIComponent(userId)}&select=id`);
  if (!r[0]) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  return NextResponse.json({ url: `${new URL(req.url).origin}/p/${parentToken(sid)}` });
}
