import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { L, parsePayload, setupWebhook, teacherLink, tgReady, tgSend, webhookSecret } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

// Вебхук бота: /start <код> прив’язує Telegram до учня або вчителя
export async function POST(req: Request) {
  if (!tgReady() || req.headers.get('x-telegram-bot-api-secret-token') !== webhookSecret()) return NextResponse.json({ ok: false }, { status: 401 });
  const u = await req.json().catch(() => null) as { message?: { chat?: { id?: number }; text?: string } } | null;
  const chat = u?.message?.chat?.id; const text = u?.message?.text || '';
  if (!chat) return NextResponse.json({ ok: true });
  const m = /^\/start(?:\s+(\S+))?/.exec(text);
  const p = m?.[1] ? parsePayload(m[1]) : null;
  if (!p || !dbReady()) {
    await tgSend(chat, 'Привіт! Це бот Murly. Щоб отримувати сповіщення, натисни «Підключити Telegram» у своєму кабінеті на murly.com.ua.');
    return NextResponse.json({ ok: true });
  }
  try {
    if (p.kind === 'student') {
      await db.patchWhere(`students?id=eq.${encodeURIComponent(p.id)}`, { tg_chat_id: String(chat), tg_lang: p.lang });
      await tgSend(chat, L(p.lang, {
        uk: 'Готово! Тепер сюди приходитимуть нові домашки, нагадування про заняття і коментарі вчителя.',
        ru: 'Готово! Теперь сюда будут приходить новые домашки, напоминания о занятиях и комментарии учителя.',
        en: 'Done! New homework, lesson reminders and teacher comments will come here.',
      }));
    } else if (p.kind === 'parent') {
      await db.patchWhere(`students?id=eq.${encodeURIComponent(p.id)}`, { parent_tg_chat_id: String(chat), parent_tg_lang: p.lang });
      await tgSend(chat, L(p.lang, {
        uk: 'Готово! Сюди приходитимуть нові домашки дитини від учителя.',
        ru: 'Готово! Сюда будут приходить новые домашки ребёнка от учителя.',
        en: 'Done! Your child’s new homework from the teacher will come here.',
      }));
    } else {
      await db.upsert('teacher_settings', [{ teacher_id: p.id, tg_chat_id: String(chat), tg_lang: p.lang }]);
      await tgSend(chat, L(p.lang, {
        uk: 'Готово! Сюди приходитимуть здані домашки ваших учнів.',
        ru: 'Готово! Сюда будут приходить сданные домашки ваших учеников.',
        en: 'Done! Homework your students hand in will come here.',
      }));
    }
  } catch {
    await tgSend(chat, 'Не вдалося підключити. Спробуй ще раз пізніше.');
  }
  return NextResponse.json({ ok: true });
}

// Для вчителя: стан бота, посилання для підключення, налаштування вебхука
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (!tgReady()) return NextResponse.json({ ready: false });
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'uk';
  let linked = false;
  try { const r = await db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(userId)}&select=tg_chat_id`); linked = Boolean(r[0]?.tg_chat_id); } catch { /* */ }
  const hook = url.searchParams.get('setup') ? await setupWebhook(url.origin) : undefined;
  // діагностика вебхука (без токена)
  let diag: Record<string, unknown> | undefined;
  if (url.searchParams.get('diag')) {
    const w = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getWebhookInfo`).then((r) => r.json()).catch(() => null);
    diag = w?.result ? { url: w.result.url, pending: w.result.pending_update_count, lastError: w.result.last_error_message, lastErrorAt: w.result.last_error_date } : { error: 'no_info' };
  }
  return NextResponse.json({ ready: true, linked, link: teacherLink(userId, lang), hook, diag });
}

// Тестове повідомлення вчителю: PUT /api/telegram
export async function PUT() {
  const { userId } = await auth();
  if (!userId || !tgReady() || !dbReady()) return NextResponse.json({ ok: false }, { status: 400 });
  const r = await db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(userId)}&select=tg_chat_id,tg_lang`).catch(() => []);
  const chat = r[0]?.tg_chat_id;
  if (!chat) return NextResponse.json({ ok: false, error: 'not_linked' });
  const ok = await tgSend(String(chat), L(String(r[0]?.tg_lang || 'uk'), { uk: 'Тест від Murly: сповіщення працюють ✓', ru: 'Тест от Murly: уведомления работают ✓', en: 'Murly test: notifications work ✓' }));
  return NextResponse.json({ ok });
}
