import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;
const UUID = /^[0-9a-f-]{36}$/i;

async function role(userId: string, sid: string) {
  if (!UUID.test(sid)) return null;
  const r = await db.query(`students?id=eq.${enc(sid)}&select=teacher_id,user_id`);
  if (!r[0]) return null;
  return r[0].teacher_id === userId ? 'teacher' : r[0].user_id === userId ? 'student' : null;
}

// Курсор на дошці: де зараз вказівник учителя й учня (оновлюється кілька разів на секунду)
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId || !dbReady()) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json().catch(() => null) as { student?: string; x?: number; y?: number; name?: string; down?: boolean } | null;
  const sid = String(b?.student || '');
  const who = await role(userId, sid);
  if (!who) return NextResponse.json({ ok: false }, { status: 403 });
  await db.upsert('board_presence', [{ student_id: sid, who, x: Number(b?.x) || 0, y: Number(b?.y) || 0, name: String(b?.name || '').slice(0, 40), down: Boolean(b?.down), at: new Date().toISOString() }]).catch(() => null);
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId || !dbReady()) return NextResponse.json({ list: [] }, { status: 401 });
  const sid = new URL(req.url).searchParams.get('student') || '';
  const who = await role(userId, sid);
  if (!who) return NextResponse.json({ list: [] }, { status: 403 });
  const since = new Date(Date.now() - 20000).toISOString();
  const rows = await db.query(`board_presence?student_id=eq.${enc(sid)}&who=neq.${who}&at=gte.${enc(since)}&select=who,x,y,name,down,at`).catch(() => []);
  return NextResponse.json({ list: rows });
}
