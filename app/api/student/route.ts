import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { reviewWord, setOwnPin, submitHomework } from '@/lib/student-data';
import { normPhone, validPhone, validPin } from '@/lib/pin-login';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let body: { op?: string; id?: string; ok?: boolean; phone?: string; pin?: string; score?: number; total?: number; answer?: string; answers?: Record<string, string> };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  if (body.op === 'setPin') {
    const phone = normPhone(body.phone ?? ''); const pin = String(body.pin ?? '').trim();
    if (!validPhone(phone)) return NextResponse.json({ error: 'bad_phone' }, { status: 400 });
    if (!validPin(pin)) return NextResponse.json({ error: 'bad_pin' }, { status: 400 });
    try {
      const r = await setOwnPin(userId, phone, pin);
      return r === 'ok' ? NextResponse.json({ ok: true, phone, pin }) : NextResponse.json({ error: r }, { status: r === 'pin_taken' ? 409 : 404 });
    } catch (e) { console.error(e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
  }
  if (body.op === 'review' && body.id) {
    const r = await reviewWord(userId, body.id, Boolean(body.ok)).catch(() => false);
    return r ? NextResponse.json({ ok: true, ...(r as { box: number; days: number }) }) : NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  if (body.op !== 'submitHomework' || !body.id) return NextResponse.json({ error: 'unknown_op' }, { status: 400 });
  try {
    const res = await submitHomework(userId, body.id, body);
    return res ? NextResponse.json({ ok: true, ...res }) : NextResponse.json({ error: 'not_found' }, { status: 404 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}
