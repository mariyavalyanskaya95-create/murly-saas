import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { ACTIVITIES } from '@/lib/activities';
import { PHOTOS, isPhotoId, unsplashUrl } from '@/lib/activities/photos';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const URL_ = process.env.SUPABASE_URL || '';
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const BUCKET = 'activity-photos';

// Усі фото активностей (лише з нашого списку, довільні адреси не приймаємо)
function allIds() {
  const s = new Set<string>();
  Object.values(PHOTOS).forEach((set) => set.forEach((p) => s.add(p.id)));
  ACTIVITIES.forEach((a) => a.slides.forEach((x) => { if (x.kind === 'picture' && isPhotoId(x.photo)) s.add(x.photo); }));
  return [...s];
}

// Переносимо фото з Unsplash у наше сховище Supabase: GET ?from=0&n=8 (лише вчитель)
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'auth' }, { status: 401 });
  const t = await db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(userId)}&select=teacher_id`).catch(() => []);
  if (!t[0]) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const url = new URL(req.url);
  const ids = allIds();
  const from = Math.max(0, Number(url.searchParams.get('from') || 0));
  const n = Math.min(12, Math.max(1, Number(url.searchParams.get('n') || 8)));
  const done: string[] = []; const failed: string[] = [];
  for (const id of ids.slice(from, from + n)) {
    for (const w of [1600, 640]) {
      try {
        const img = await fetch(unsplashUrl(id, w), { cache: 'no-store' });
        if (!img.ok) throw new Error(`src ${img.status}`);
        const buf = await img.arrayBuffer();
        const up = await fetch(`${URL_}/storage/v1/object/${BUCKET}/${id}-${w}.jpg`, {
          method: 'POST',
          headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'image/jpeg', 'x-upsert': 'true', 'cache-control': 'max-age=31536000' },
          body: buf,
        });
        if (!up.ok) throw new Error(`up ${up.status} ${await up.text().catch(() => '')}`.slice(0, 120));
        done.push(`${id}-${w}`);
      } catch (e) { failed.push(`${id}-${w}: ${(e as Error).message}`); }
    }
  }
  return NextResponse.json({ total: ids.length, from, next: from + n < ids.length ? from + n : null, done: done.length, failed });
}
