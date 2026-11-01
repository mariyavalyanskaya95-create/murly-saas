// Посилання «Запроси колегу»: запам'ятовуємо, хто запросив, і ведемо на реєстрацію вчителя
import { NextResponse } from 'next/server';

export function GET(req: Request, { params }: { params: { code: string } }) {
  const code = String(params.code || '').toLowerCase();
  const res = NextResponse.redirect(new URL('/sign-up?role=teacher', req.url));
  if (/^[a-z0-9]{4,12}$/.test(code)) res.cookies.set('murly_ref', code, { maxAge: 60 * 60 * 24 * 60, path: '/', sameSite: 'lax' });
  return res;
}
