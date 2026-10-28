import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { isPreset } from '@/lib/voices';
import { ttsCached, ttsMake, ttsPath, ttsReady } from '@/lib/tts-server';

export const dynamic = 'force-dynamic';

// Живий голос: синтезуємо MP3 один раз і зберігаємо, далі віддаємо з кешу.
// GET /api/tts?t=текст&v=голос&s=1(повільно)  → 302 на MP3 або 404 (тоді браузер читає сам)
// GET /api/tts?check=1 → чи підключено живі голоси
export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get('check')) return NextResponse.json({ ok: ttsReady() }, { headers: { 'Cache-Control': 'public, max-age=300' } });
  const text = (url.searchParams.get('t') || '').trim().slice(0, 1500);
  const v = url.searchParams.get('v') || 'narrator';
  const slow = url.searchParams.get('s') === '1';
  if (!text || !isPreset(v) || !ttsReady()) return new NextResponse(null, { status: 404 });
  const { pub } = ttsPath(text, v, slow);
  if (await ttsCached(pub)) return NextResponse.redirect(pub, { status: 302, headers: { 'Cache-Control': 'public, max-age=86400' } });
  // нові фрази синтезуємо лише для тих, хто увійшов (щоб ніхто не витрачав ліміт)
  const { userId } = await auth();
  if (!userId) return new NextResponse(null, { status: 404 });
  const made = await ttsMake(text, v, slow);
  if (made?.url) return NextResponse.redirect(made.url, { status: 302 });
  if (made?.buf) return new NextResponse(new Uint8Array(made.buf), { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'private, max-age=3600' } });
  return new NextResponse(null, { status: 404 });
}
