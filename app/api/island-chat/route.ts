import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { checkChat } from '@/lib/chat-filter';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;

// Island chat: English only, filter, rate limit, every message is stored for review.
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db' }, { status: 503 });
  const b = await req.json().catch(() => ({})) as { op?: string; text?: string; name?: string; id?: string; msg?: number };

  if (b.op === 'report' && b.msg) {
    await db.patchWhere(`island_chat?id=eq.${Number(b.msg)}`, { reported: true }).catch(() => null);
    return NextResponse.json({ ok: true });
  }

  const nameCheck = checkChat(String(b.name ?? '').slice(0, 14));
  const name = nameCheck.ok ? nameCheck.text : 'Cat';
  const raw = String(b.text ?? '').slice(0, 200);
  const res = checkChat(raw);

  const since10 = new Date(Date.now() - 10_000).toISOString(), since60 = new Date(Date.now() - 60_000).toISOString();
  const recent = await db.query(`island_chat?user_id=eq.${enc(userId)}&at=gte.${enc(since60)}&select=at`).catch(() => []);
  if (recent.length >= 20 || recent.filter((r) => String(r.at) >= since10).length >= 3) return NextResponse.json({ ok: false, reason: 'slow' }, { status: 429 });

  const rows = await db.insertReturning('island_chat', [{ user_id: userId, name, text: raw, blocked: !res.ok }]).catch(() => []);
  if (!res.ok) return NextResponse.json({ ok: false, reason: res.reason });

  const msg = { id: String(b.id ?? '').slice(0, 16), n: name, text: res.text, mid: rows[0]?.id ?? 0 };
  const URL_ = process.env.SUPABASE_URL || ''; const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const h: Record<string, string> = { apikey: KEY, 'Content-Type': 'application/json' }; if (KEY.startsWith('eyJ')) h.Authorization = `Bearer ${KEY}`;
  const r = await fetch(`${URL_}/realtime/v1/api/broadcast`, { method: 'POST', headers: h, body: JSON.stringify({ messages: [{ topic: 'murly-island-1', event: 'chat', payload: msg, private: false }] }) }).catch(() => null);
  return NextResponse.json({ ok: true, msg, sent: r?.ok ?? false });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId || !dbReady()) return NextResponse.json({ messages: [] });
  const rows = await db.query(`island_chat?blocked=eq.false&order=at.desc&limit=20&select=id,name,text,at`).catch(() => []);
  return NextResponse.json({ messages: rows.reverse().map((r) => ({ mid: r.id, n: r.name, text: r.text, at: r.at })) });
}
