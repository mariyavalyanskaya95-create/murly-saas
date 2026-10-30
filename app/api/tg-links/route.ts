import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { parentLink, studentLink, tgReady } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

// Учитель бере посилання «Підключити Telegram» для учня і для батьків, щоб переслати їм
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId || !dbReady()) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (!tgReady()) return NextResponse.json({ ready: false });
  const url = new URL(req.url);
  const sid = url.searchParams.get('student') || '';
  const lang = url.searchParams.get('lang') || 'uk';
  if (!/^[0-9a-f-]{36}$/i.test(sid)) return NextResponse.json({ error: 'bad' }, { status: 400 });
  const r = await db.query(`students?id=eq.${encodeURIComponent(sid)}&teacher_id=eq.${encodeURIComponent(userId)}&select=*`).catch(() => []);
  const s = r[0];
  if (!s) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  return NextResponse.json({
    ready: true,
    student: { linked: Boolean(s.tg_chat_id), link: studentLink(sid, lang) },
    parent: { linked: Boolean(s.parent_tg_chat_id), link: parentLink(sid, lang) },
  });
}
