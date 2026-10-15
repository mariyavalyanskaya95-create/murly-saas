import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

const URL_ = process.env.SUPABASE_URL || '';
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const BUCKET = 'lesson-files';
const MAX = 20 * 1024 * 1024;
const TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf', 'audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'audio/wav', 'audio/ogg', 'audio/webm'];

// Видаємо одноразове посилання для завантаження прямо в Supabase Storage
// (файл не йде через наш сервер, тож великі PDF теж проходять)
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!URL_ || !KEY) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  let body: { name?: string; type?: string; size?: number };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const type = String(body.type || '');
  const size = Number(body.size || 0);
  if (!TYPES.includes(type)) return NextResponse.json({ error: 'type', message: 'Можна завантажувати картинки (PNG, JPG, WEBP, GIF), PDF і аудіо (MP3, M4A, WAV, OGG).' }, { status: 400 });
  if (!size || size > MAX) return NextResponse.json({ error: 'size', message: 'Файл завеликий. Максимум 20 МБ.' }, { status: 400 });

  const ext = type === 'application/pdf' ? 'pdf' : type === 'audio/mpeg' ? 'mp3' : type === 'audio/mp4' || type === 'audio/x-m4a' ? 'm4a' : type === 'audio/webm' ? 'webm' : type.split('/')[1].replace('jpeg', 'jpg');
  const base = String(body.name || 'file').replace(/\.[^.]+$/, '').normalize('NFKD').replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'file';
  const path = `${userId}/${crypto.randomUUID().slice(0, 8)}-${base}.${ext}`;

  const res = await fetch(`${URL_}/storage/v1/object/upload/sign/${BUCKET}/${path}`, {
    method: 'POST',
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: '{}',
    cache: 'no-store',
  });
  if (!res.ok) {
    console.error('sign upload', res.status, await res.text().catch(() => ''));
    return NextResponse.json({ error: 'storage_error' }, { status: 500 });
  }
  const j = (await res.json()) as { url?: string };
  if (!j.url) return NextResponse.json({ error: 'storage_error' }, { status: 500 });
  return NextResponse.json({
    uploadUrl: `${URL_}/storage/v1${j.url}`,
    publicUrl: `${URL_}/storage/v1/object/public/${BUCKET}/${path}`,
  });
}
