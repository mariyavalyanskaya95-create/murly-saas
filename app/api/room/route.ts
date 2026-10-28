import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;

// Відеокімната уроку (Daily). Ключ DAILY_API_KEY вводить власниця сайту у Vercel.
// Без ключа повертаємо звичайне посилання на Zoom/Meet учителя.
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId || !dbReady()) return NextResponse.json({ error: 'auth' }, { status: 401 });
  const sid = new URL(req.url).searchParams.get('student') || '';
  if (!/^[0-9a-f-]{36}$/i.test(sid)) return NextResponse.json({ error: 'bad' }, { status: 400 });
  const r = await db.query(`students?id=eq.${enc(sid)}&select=id,teacher_id,user_id,link`);
  const s = r[0];
  if (!s || (s.teacher_id !== userId && s.user_id !== userId)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const key = process.env.DAILY_API_KEY;
  if (!key) {
    const t = await db.query(`teacher_settings?teacher_id=eq.${enc(String(s.teacher_id))}&select=link`).catch(() => []);
    return NextResponse.json({ external: String(s.link || t[0]?.link || '') });
  }
  const name = `murly-${sid.replace(/-/g, '').slice(0, 24)}`;
  const H = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  let room = await fetch(`https://api.daily.co/v1/rooms/${name}`, { headers: H, cache: 'no-store' }).then((x) => (x.ok ? x.json() : null)).catch(() => null);
  if (!room) {
    room = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST', headers: H,
      body: JSON.stringify({ name, privacy: 'public', properties: { enable_chat: true, enable_screenshare: true, enable_prejoin_ui: false, enable_knocking: false } }),
    }).then((x) => (x.ok ? x.json() : null)).catch(() => null);
  }
  if (!room?.url) return NextResponse.json({ error: 'video' }, { status: 502 });
  return NextResponse.json({ url: room.url as string });
}
