import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { XP_DAILY_CAP } from '@/lib/xp';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;
const SOURCES = ['exercise', 'homework', 'lesson', 'words', 'game'];

async function total(userId: string) {
  const r = await db.query(`xp_totals?user_id=eq.${enc(userId)}&select=xp`).catch(() => []);
  return Number(r[0]?.xp ?? 0);
}

// учень бачить свій досвід; учитель може подивитися досвід свого учня (?student=<id>)
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ xp: 0 });
  const studentId = new URL(req.url).searchParams.get('student');
  let who = userId;
  if (studentId) {
    const st = await db.query(`students?id=eq.${enc(studentId)}&teacher_id=eq.${enc(userId)}&select=user_id`).catch(() => []);
    if (!st[0]?.user_id) return NextResponse.json({ xp: 0, joined: false });
    who = String(st[0].user_id);
  }
  return NextResponse.json({ xp: await total(who) });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db_not_configured' }, { status: 503 });
  let b: { items?: { key?: string; amount?: number }[]; source?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const source = SOURCES.includes(String(b.source)) ? String(b.source) : 'exercise';
  const items = (Array.isArray(b.items) ? b.items : []).slice(0, 80)
    .map((x) => ({ key: String(x.key ?? '').slice(0, 160), amount: Math.round(Number(x.amount ?? 0)) }))
    .filter((x) => x.key && x.amount >= 1 && x.amount <= 60);
  if (!items.length) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  try {
    const since = new Date(); since.setHours(0, 0, 0, 0);
    const today = await db.query(`xp_log?user_id=eq.${enc(userId)}&created_at=gte.${enc(since.toISOString())}&select=amount`).catch(() => []);
    let left = XP_DAILY_CAP - today.reduce((a, x) => a + Number(x.amount ?? 0), 0);
    let xp = await total(userId);
    for (const it of items) {
      if (left <= 0) return NextResponse.json({ xp, capped: true });
      const n = Math.min(it.amount, left);
      const r = Number(await db.rpc('add_xp', { p_user: userId, p_key: it.key, p_amount: n, p_source: source }));
      if (r > xp) left -= r - xp;
      xp = r;
    }
    return NextResponse.json({ xp });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
