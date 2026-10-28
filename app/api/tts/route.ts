import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createHash } from 'crypto';
import { VOICES, isPreset } from '@/lib/voices';

export const dynamic = 'force-dynamic';
const URL_ = process.env.SUPABASE_URL || '';
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const TTS = () => process.env.GOOGLE_TTS_API_KEY || '';
const BUCKET = 'lesson-files';

// Живий голос: синтезуємо MP3 один раз і зберігаємо, далі віддаємо з кешу.
// GET /api/tts?t=текст&v=голос&s=1(повільно)  → 302 на MP3 або 404 (тоді браузер читає сам)
// GET /api/tts?check=1 → чи підключено живі голоси
export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get('check')) return NextResponse.json({ ok: Boolean(TTS() && URL_ && KEY) }, { headers: { 'Cache-Control': 'public, max-age=300' } });
  const text = (url.searchParams.get('t') || '').trim().slice(0, 1500);
  const v = url.searchParams.get('v') || 'narrator';
  const slow = url.searchParams.get('s') === '1';
  if (!text || !isPreset(v) || !TTS() || !URL_) return new NextResponse(null, { status: 404 });
  const voice = VOICES[v];
  const rate = +(voice.rate * (slow ? 0.78 : 1)).toFixed(2);
  const hash = createHash('sha1').update(`${voice.name}|${voice.pitch}|${rate}|${text}`).digest('hex');
  const path = `tts/${hash.slice(0, 2)}/${hash}.mp3`;
  const pub = `${URL_}/storage/v1/object/public/${BUCKET}/${path}`;
  const head = await fetch(pub, { method: 'HEAD', cache: 'no-store' }).catch(() => null);
  if (head && head.ok) return NextResponse.redirect(pub, { status: 302, headers: { 'Cache-Control': 'public, max-age=86400' } });
  // нові фрази синтезуємо лише для тих, хто увійшов (щоб ніхто не витрачав ліміт)
  const { userId } = await auth();
  if (!userId) return new NextResponse(null, { status: 404 });
  const r = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${TTS()}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: { text }, voice: { languageCode: voice.lang, name: voice.name }, audioConfig: { audioEncoding: 'MP3', speakingRate: rate, pitch: voice.pitch } }),
  }).catch(() => null);
  if (!r || !r.ok) { console.error('tts', r?.status, await r?.text().catch(() => '')); return new NextResponse(null, { status: 404 }); }
  const j = await r.json() as { audioContent?: string };
  if (!j.audioContent) return new NextResponse(null, { status: 404 });
  const buf = Buffer.from(j.audioContent, 'base64');
  const up = await fetch(`${URL_}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST', headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'audio/mpeg', 'x-upsert': 'true' }, body: buf,
  }).catch(() => null);
  if (up && up.ok) return NextResponse.redirect(pub, { status: 302 });
  return new NextResponse(buf, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'private, max-age=3600' } });
}
