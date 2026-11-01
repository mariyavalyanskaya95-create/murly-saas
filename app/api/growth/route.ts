// Пробний місяць, «Запроси колегу» і відгуки вчителя
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { esc, tgSend, tgReady } from '@/lib/telegram';
import { OWNER_TEACHER_ID, PAID_ENABLED, trialLeft } from '@/lib/plans';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;
const newCode = () => Math.random().toString(36).slice(2, 8);

// Рядок налаштувань учителя: створюємо, якщо його ще нема, і видаємо реферальний код
async function ensure(userId: string) {
  const r = await db.query(`teacher_settings?teacher_id=eq.${enc(userId)}&select=teacher_id,trial_started_at,ref_code,referred_by`).catch(() => []);
  let row = r[0];
  if (!row) {
    const ref = cookies().get('murly_ref')?.value || '';
    let referredBy: string | null = null;
    if (/^[a-z0-9]{4,12}$/.test(ref)) {
      const o = await db.query(`teacher_settings?ref_code=eq.${enc(ref)}&select=teacher_id`).catch(() => []);
      if (o[0] && o[0].teacher_id !== userId) referredBy = String(o[0].teacher_id);
    }
    row = { teacher_id: userId, trial_started_at: new Date().toISOString(), ref_code: newCode(), referred_by: referredBy };
    await db.upsert('teacher_settings', [row]);
  } else if (!row.ref_code) {
    row.ref_code = newCode();
    await db.patchWhere(`teacher_settings?teacher_id=eq.${enc(userId)}`, { ref_code: row.ref_code });
  }
  return row;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ paid: false });
  try {
    const row = await ensure(userId);
    const invited = await db.query(`teacher_settings?referred_by=eq.${enc(userId)}&select=teacher_id`).catch(() => []);
    return NextResponse.json({
      paid: PAID_ENABLED,
      daysLeft: PAID_ENABLED ? trialLeft(row.trial_started_at ? String(row.trial_started_at) : null) : null,
      refCode: row.ref_code,
      invited: invited.length,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ paid: false });
  }
}

// Відгук «Чого не вистачає?»: зберігаємо і пересилаємо власниці в Telegram
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let b: { text?: string; page?: string; name?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const text = String(b.text || '').trim().slice(0, 2000);
  if (text.length < 2) return NextResponse.json({ error: 'empty' }, { status: 400 });
  const page = String(b.page || '').slice(0, 200);
  const name = String(b.name || '').slice(0, 80);
  if (dbReady()) await db.insert('feedback', [{ teacher_id: userId, name, page, text }]).catch((e) => console.error(e));
  if (tgReady() && dbReady()) {
    const owner = OWNER_TEACHER_ID
      ? await db.query(`teacher_settings?teacher_id=eq.${enc(OWNER_TEACHER_ID)}&select=tg_chat_id`).catch(() => [])
      : await db.query('teacher_settings?is_owner=is.true&select=tg_chat_id').catch(() => []);
    const chat = owner[0]?.tg_chat_id;
    if (chat) await tgSend(String(chat), `🐾 <b>Мур! Учитель поделился идеей</b>\n\n💬 «${esc(text)}»\n\n👩‍🏫 ${esc(name || 'Учитель')}${page ? `\n📍 страница ${esc(page)}` : ''}\n\nСпасибо, что слушаешь своих учителей 💛`);
  }
  return NextResponse.json({ ok: true });
}
