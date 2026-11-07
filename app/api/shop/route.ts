import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { isOwnerTeacher } from '@/lib/ai-check';
import { createOrder, listOrders, markPaid, payReady, sendOrderMail, type Order } from '@/lib/shop-server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let b: { op?: string; product?: string; email?: string; name?: string; lang?: string; id?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }

  // покупець: створює замовлення (або запис у лист очікування, поки оплата не підключена)
  if (b.op === 'order') {
    const email = String(b.email || '').trim();
    if (!EMAIL.test(email)) return NextResponse.json({ error: 'bad_email' }, { status: 400 });
    const o = await createOrder(String(b.product || ''), email, String(b.name || ''), ['uk', 'ru', 'en'].includes(String(b.lang)) ? String(b.lang) : 'uk').catch(() => null);
    if (!o) return NextResponse.json({ error: 'not_created' }, { status: 400 });
    // TODO: коли буде ФОП і провайдер (WayForPay / monobank) — тут повертаємо посилання на оплату
    return NextResponse.json({ ok: true, soon: !payReady() });
  }

  // власниця: список замовлень, ручне підтвердження оплати, повторна відправка листа
  const { userId } = await auth();
  if (!userId || !(await isOwnerTeacher(userId))) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if (b.op === 'list') return NextResponse.json({ orders: await listOrders() });
  if (b.op === 'markPaid' && b.id) return NextResponse.json(await markPaid(b.id));
  if (b.op === 'resend' && b.id) {
    const r = await db.query(`shop_orders?id=eq.${encodeURIComponent(b.id)}&select=*&limit=1`);
    return r[0] ? NextResponse.json(await sendOrderMail(r[0] as Order)) : NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  return NextResponse.json({ error: 'unknown_op' }, { status: 400 });
}
