import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { addCoins, balanceOf, coinLog, DAILY_CAP, earnedToday, type CoinSource } from '@/lib/coins';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;

// учень бачить свій гаманець; учитель може подивитися гаманець свого учня (?student=<id>)
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ balance: 0, log: [] });
  const studentId = new URL(req.url).searchParams.get('student');
  try {
    let who = userId;
    if (studentId) {
      const st = await db.query(`students?id=eq.${enc(studentId)}&teacher_id=eq.${enc(userId)}&select=user_id`);
      if (!st[0]) return NextResponse.json({ error: 'not_found' }, { status: 404 });
      if (!st[0].user_id) return NextResponse.json({ balance: 0, log: [], joined: false });
      who = String(st[0].user_id);
    }
    return NextResponse.json({ balance: await balanceOf(who), log: await coinLog(who), joined: true });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db_not_configured' }, { status: 503 });
  let b: { op?: string; amount?: number; reason?: string; source?: string; studentId?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const amount = Math.round(Number(b.amount ?? 0));
  const reason = String(b.reason ?? '').slice(0, 120);
  try {
    if (b.op === 'earn') {
      // ігри: невеликі суми і денний ліміт
      const source = (b.source === 'words' ? 'words' : 'game') as CoinSource;
      if (amount < 1 || amount > 10) return NextResponse.json({ error: 'bad_amount' }, { status: 400 });
      const cap = DAILY_CAP[source] ?? 100;
      const today = await earnedToday(userId, source);
      if (today >= cap) return NextResponse.json({ balance: await balanceOf(userId), capped: true });
      const bal = await addCoins(userId, Math.min(amount, cap - today), reason || source, source);
      return NextResponse.json({ balance: bal });
    }
    if (b.op === 'spend') {
      if (amount < 1 || amount > 5000) return NextResponse.json({ error: 'bad_amount' }, { status: 400 });
      const bal = await addCoins(userId, -amount, reason || 'shop', 'shop');
      if (bal < 0) return NextResponse.json({ error: 'not_enough', balance: await balanceOf(userId) }, { status: 402 });
      return NextResponse.json({ balance: bal });
    }
    if (b.op === 'award') {
      // учитель нараховує монетки своєму учню
      if (!b.studentId || amount < 1 || amount > 200) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
      const st = await db.query(`students?id=eq.${enc(b.studentId)}&teacher_id=eq.${enc(userId)}&select=user_id`);
      if (!st[0]) return NextResponse.json({ error: 'not_found' }, { status: 404 });
      if (!st[0].user_id) return NextResponse.json({ error: 'not_joined' }, { status: 409 });
      const bal = await addCoins(String(st[0].user_id), amount, reason || 'від учителя', 'teacher', userId);
      return NextResponse.json({ balance: bal });
    }
    return NextResponse.json({ error: 'unknown_op' }, { status: 400 });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
