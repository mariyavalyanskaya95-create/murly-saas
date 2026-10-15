import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getStripe, PRICE_IDS, PLAN_META, PlanKey } from '@/lib/stripe';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'no user' }, { status: 401 });

  const { plan } = (await req.json()) as { plan: PlanKey };
  if (!plan || !(plan in PRICE_IDS)) {
    return NextResponse.json({ error: 'invalid plan' }, { status: 400 });
  }
  const priceId = PRICE_IDS[plan];
  if (!priceId) {
    return NextResponse.json({ error: 'plan not configured' }, { status: 400 });
  }

  const meta = PLAN_META[plan];
  const email = user.emailAddresses[0]?.emailAddress;
  const origin =
    req.headers.get('origin') ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://murly.com.ua';

  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    client_reference_id: userId,
    metadata: { clerk_user_id: userId, plan },
    subscription_data: {
      metadata: { clerk_user_id: userId, plan },
      trial_period_days: meta.trialDays,
    },
    allow_promotion_codes: true,
    success_url: `${origin}/dashboard?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=cancel`,
  });

  return NextResponse.json({ url: session.url });
}
