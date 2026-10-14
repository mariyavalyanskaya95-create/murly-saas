import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { submitHomework } from '@/lib/student-data';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let body: { op?: string; id?: string; score?: number; total?: number; answer?: string; answers?: Record<string, string> };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  if (body.op !== 'submitHomework' || !body.id) return NextResponse.json({ error: 'unknown_op' }, { status: 400 });
  try {
    const res = await submitHomework(userId, body.id, body);
    return res ? NextResponse.json({ ok: true, ...res }) : NextResponse.json({ error: 'not_found' }, { status: 404 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}
