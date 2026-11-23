import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { OWNER_TEACHER_ID } from '@/lib/plans';
import { gscReport } from '@/lib/gsc';

export const dynamic = 'force-dynamic';

// Статистика Google Search Console для власниці (тільки читання)
export async function GET() {
  const { userId } = await auth();
  if (!userId || !dbReady()) return NextResponse.json({ error: 'auth' }, { status: 401 });
  let owner = OWNER_TEACHER_ID === userId;
  if (!owner) { const r = await db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(userId)}&select=is_owner`).catch(() => []); owner = Boolean(r[0]?.is_owner); }
  if (!owner) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  return NextResponse.json(await gscReport());
}
