// «Запам'ятати пристрій»: учень входить один раз, далі сайт впізнає його на цьому пристрої (до року).
// У cookie лише випадковий токен (httpOnly), у базі зберігаємо його хеш. Ім'я для кнопки «Увійти як ...» окремо.
import { createHash, randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { db } from './db';

export const DEV_COOKIE = 'murly_dev';
export const ME_COOKIE = 'murly_me';
const YEAR = 365 * 24 * 3600;
export const hashToken = (t: string) => createHash('sha256').update(t).digest('hex');

export async function rememberDevice(res: NextResponse, userId: string, name: string) {
  const token = randomBytes(32).toString('base64url');
  await db.insert('device_logins', [{ token_hash: hashToken(token), user_id: userId, name: name.slice(0, 40), expires_at: new Date(Date.now() + YEAR * 1000).toISOString() }]);
  const base = { path: '/', maxAge: YEAR, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production' };
  res.cookies.set(DEV_COOKIE, token, { ...base, httpOnly: true });
  res.cookies.set(ME_COOKIE, encodeURIComponent(name.slice(0, 40) || 'me'), { ...base, httpOnly: false });
  return res;
}
export function forgetCookies(res: NextResponse) {
  res.cookies.set(DEV_COOKIE, '', { path: '/', maxAge: 0 });
  res.cookies.set(ME_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
