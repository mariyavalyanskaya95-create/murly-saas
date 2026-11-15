import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { tgReady } from '@/lib/telegram';
import { OWNER_TEACHER_ID } from '@/lib/plans';
import { sendWeekly } from '@/lib/weekly';

export const dynamic = 'force-dynamic';

// Власниця може надіслати собі зведення зараз (перевірка)
export async function GET() {
  const { userId } = await auth();
  if (!userId || !dbReady() || !tgReady()) return NextResponse.json({ error: 'auth' }, { status: 401 });
  let owner = OWNER_TEACHER_ID === userId;
  if (!owner) { const r = await db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(userId)}&select=is_owner`).catch(() => []); owner = Boolean(r[0]?.is_owner); }
  if (!owner) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  return NextResponse.json({ sent: await sendWeekly() });
}
