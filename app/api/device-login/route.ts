// Вхід з запам'ятованого пристрою. op: remember (після входу), login (кнопка «Увійти як ...»), forget (інший акаунт)
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { DEV_COOKIE, forgetCookies, hashToken, rememberDevice } from '@/lib/device-login';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;

export async function POST(req: Request) {
  if (!dbReady()) return NextResponse.json({ error: 'db' }, { status: 503 });
  const b = await req.json().catch(() => ({})) as { op?: string };
  const tok = cookies().get(DEV_COOKIE)?.value ?? '';

  if (b.op === 'remember') {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'auth' }, { status: 401 });
    // лише для учнів (вчитель заходить як завжди)
    const st = await db.query(`students?user_id=eq.${enc(userId)}&select=name&limit=1`).catch(() => []);
    if (!st[0]) return NextResponse.json({ ok: false, reason: 'not_student' });
    if (tok) {
      const r = await db.query(`device_logins?token_hash=eq.${hashToken(tok)}&select=user_id`).catch(() => []);
      if (r[0]?.user_id === userId) return NextResponse.json({ ok: true, already: true });
    }
    const name = String(st[0].name ?? '').split(' ')[0];
    return rememberDevice(NextResponse.json({ ok: true }), userId, name);
  }

  if (b.op === 'login') {
    if (!tok) return NextResponse.json({ error: 'none' }, { status: 401 });
    const h = hashToken(tok);
    const r = await db.query(`device_logins?token_hash=eq.${h}&select=user_id,name,expires_at`).catch(() => []);
    const row = r[0];
    if (!row || new Date(String(row.expires_at)).getTime() < Date.now()) return forgetCookies(NextResponse.json({ error: 'expired' }, { status: 401 }));
    // учня могли видалити з кабінету: тоді не пускаємо
    const st = await db.query(`students?user_id=eq.${enc(String(row.user_id))}&select=id&limit=1`).catch(() => []);
    if (!st[0]) return forgetCookies(NextResponse.json({ error: 'gone' }, { status: 401 }));
    await db.patchWhere(`device_logins?token_hash=eq.${h}`, { last_used: new Date().toISOString() }).catch(() => null);
    const t = await (await clerkClient()).signInTokens.createSignInToken({ userId: String(row.user_id), expiresInSeconds: 120 });
    return NextResponse.json({ ok: true, ticket: t.token, name: row.name });
  }

  if (b.op === 'forget') {
    if (tok) await db.patchWhere(`device_logins?token_hash=eq.${hashToken(tok)}`, { expires_at: new Date().toISOString() }).catch(() => null);
    return forgetCookies(NextResponse.json({ ok: true }));
  }
  return NextResponse.json({ error: 'bad_op' }, { status: 400 });
}
