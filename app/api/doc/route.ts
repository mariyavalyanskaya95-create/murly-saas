import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';
const URL_ = process.env.SUPABASE_URL || '';
const BASE = () => `${URL_}/storage/v1/object/public/lesson-files/`;

// Показати завантажений HTML-документ (квіз, тест) на дошці.
// Віддаємо в «пісочниці» (sandbox без allow-same-origin): скрипти квізу працюють,
// але до кукі й акаунта на murly.com.ua доступу не мають.
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response('Увійди в кабінет, щоб відкрити документ.', { status: 401, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  const f = new URL(req.url).searchParams.get('f') || '';
  if (!URL_ || !f.startsWith(BASE()) || !/\.html?$/i.test(f) || f.includes('..')) return new Response('Not found', { status: 404 });
  const r = await fetch(f, { cache: 'no-store' }).catch(() => null);
  if (!r || !r.ok) return new Response('Not found', { status: 404 });
  const html = await r.text();
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "sandbox allow-scripts allow-forms allow-modals allow-popups",
      'Cache-Control': 'private, max-age=300',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
