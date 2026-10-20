import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { MOCKS } from '@/lib/mock';
import { submitHomework } from '@/lib/student-data';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;
const IDS = new Set(MOCKS.map((m) => m.id));

// Результати пробних НМТ.
// GET без параметрів: мої результати. GET ?student=<id>: результати учня для його вчителя.
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ results: [] });
  try {
    const student = new URL(req.url).searchParams.get('student');
    let uid = userId;
    if (student) {
      const s = await db.query(`students?id=eq.${enc(student)}&teacher_id=eq.${enc(userId)}&select=user_id`);
      if (!s.length) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
      if (!s[0].user_id) return NextResponse.json({ results: [] });
      uid = String(s[0].user_id);
    }
    const r = await db.query(`mock_results?user_id=eq.${enc(uid)}&order=finished_at.desc&limit=100&select=variant,score,total,finished_at`);
    return NextResponse.json({ results: r });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db_not_configured' }, { status: 503 });
  let b: { variant?: string; score?: number; total?: number; hw?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const score = Number(b.score), total = Number(b.total);
  if (!b.variant || !IDS.has(b.variant) || !Number.isInteger(score) || !Number.isInteger(total) || total <= 0 || total > 100 || score < 0 || score > total)
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  try {
    await db.insert('mock_results', [{ user_id: userId, variant: b.variant, score, total }]);
    // Якщо тест задали як домашку: записуємо бал у домашку (submitHomework перевіряє, що вона цього учня)
    let coins = 0;
    if (typeof b.hw === 'string' && b.hw) {
      const hw = await db.query(`homework?id=eq.${enc(b.hw)}&kind=eq.mock&game=eq.${enc(b.variant)}&select=id`).catch(() => []);
      if (hw.length) { const r = await submitHomework(userId, b.hw, { score, total }); if (r && typeof r === 'object' && 'coins' in r) coins = Number(r.coins) || 0; }
    }
    return NextResponse.json({ ok: true, coins });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
