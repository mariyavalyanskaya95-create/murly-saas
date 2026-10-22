// Вхід учня за номером телефону і PIN. Повертає одноразовий квиток Clerk, з яким браузер одразу входить.
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { normPhone, validPhone } from '@/lib/pin-login';

export const dynamic = 'force-dynamic';
const MAX_FAILS = 5;
const LOCK_MIN = 15;

export async function POST(req: Request) {
  if (!dbReady()) return NextResponse.json({ error: 'db_not_configured' }, { status: 503 });
  let body: { phone?: string; pin?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const phone = normPhone(body.phone ?? '');
  const pin = String(body.pin ?? '').trim();
  if (!validPhone(phone) || !pin) return NextResponse.json({ error: 'wrong' }, { status: 400 });

  const rows = await db.query(`students?login_phone=eq.${phone}&select=id,user_id,login_pin,pin_fails,pin_locked_until`);
  if (!rows.length) return NextResponse.json({ error: 'wrong' }, { status: 401 });
  const now = Date.now();
  if (rows.some((r) => r.pin_locked_until && new Date(String(r.pin_locked_until)).getTime() > now)) {
    return NextResponse.json({ error: 'locked', minutes: LOCK_MIN }, { status: 429 });
  }
  const hit = rows.find((r) => String(r.login_pin ?? '').toLowerCase() === pin.toLowerCase() && r.user_id);
  if (!hit) {
    // невдала спроба: рахуємо на весь номер, після 5 помилок блокуємо на 15 хвилин
    const fails = Math.max(...rows.map((r) => Number(r.pin_fails ?? 0))) + 1;
    const patch: Record<string, unknown> = { pin_fails: fails };
    if (fails >= MAX_FAILS) { patch.pin_locked_until = new Date(now + LOCK_MIN * 60000).toISOString(); patch.pin_fails = 0; }
    await db.patchWhere(`students?login_phone=eq.${phone}`, patch).catch(() => null);
    return NextResponse.json({ error: fails >= MAX_FAILS ? 'locked' : 'wrong', left: Math.max(0, MAX_FAILS - fails) }, { status: 401 });
  }
  await db.patchWhere(`students?login_phone=eq.${phone}`, { pin_fails: 0, pin_locked_until: null }).catch(() => null);
  const token = await (await clerkClient()).signInTokens.createSignInToken({ userId: String(hit.user_id), expiresInSeconds: 300 });
  return NextResponse.json({ ok: true, ticket: token.token });
}
