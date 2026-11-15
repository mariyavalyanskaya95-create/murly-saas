// Google Search Console для тижневого зведення: службовий акаунт (ключ JSON у змінній GSC_SA_JSON на Vercel).
import { createSign } from 'crypto';

const SITE = process.env.GSC_SITE || 'https://murly.com.ua/';
type SA = { client_email: string; private_key: string };

function sa(): SA | null {
  try { const j = JSON.parse(process.env.GSC_SA_JSON || ''); return j.client_email && j.private_key ? j : null; } catch { return null; }
}
export const gscReady = () => Boolean(sa());

const b64 = (x: string | Buffer) => Buffer.from(x).toString('base64url');
async function token(k: SA): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const body = b64(JSON.stringify({ iss: k.client_email, scope: 'https://www.googleapis.com/auth/webmasters.readonly', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const sig = createSign('RSA-SHA256').update(`${head}.${body}`).sign(k.private_key).toString('base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${head}.${body}.${sig}` }) }).catch(() => null);
  const j = r && r.ok ? await r.json().catch(() => null) : null;
  return j?.access_token ?? null;
}

type Row = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };
async function query(tk: string, start: string, end: string, dims: string[] = [], limit = 25): Promise<Row[]> {
  const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
    method: 'POST', headers: { authorization: `Bearer ${tk}`, 'content-type': 'application/json' },
    body: JSON.stringify({ startDate: start, endDate: end, dimensions: dims, rowLimit: limit }),
  }).catch(() => null);
  const j = r && r.ok ? await r.json().catch(() => null) : null;
  return j?.rows ?? [];
}

const ymd = (d: Date) => d.toISOString().slice(0, 10);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Рядки для зведення: тиждень з урахуванням затримки даних Google (2 дні)
export async function gscLines(): Promise<string[]> {
  const k = sa(); if (!k) return [];
  const tk = await token(k);
  if (!tk) return ['<b>Google</b>', '• не удалось подключиться к Search Console (проверьте доступ сервисного аккаунта)'];
  const end = new Date(Date.now() - 2 * 864e5); const start = new Date(end.getTime() - 6 * 864e5);
  const pEnd = new Date(start.getTime() - 864e5); const pStart = new Date(pEnd.getTime() - 6 * 864e5);
  const [cur, prev, qs, pages] = await Promise.all([
    query(tk, ymd(start), ymd(end)), query(tk, ymd(pStart), ymd(pEnd)),
    query(tk, ymd(start), ymd(end), ['query'], 200), query(tk, ymd(start), ymd(end), ['page'], 200),
  ]);
  const c = cur[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const p = prev[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const diff = (a: number, b: number) => (b ? `${a >= b ? '+' : ''}${Math.round(((a - b) / b) * 100)}%` : a ? 'новое' : '0');
  const top = qs.filter((x) => x.clicks > 0).sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  const noClick = qs.filter((x) => x.clicks === 0).sort((a, b) => b.impressions - a.impressions).slice(0, 5);
  const topPages = pages.filter((x) => x.clicks > 0).sort((a, b) => b.clicks - a.clicks).slice(0, 3);
  const short = (u: string) => u.replace(/^https?:\/\/murly\.com\.ua/, '') || '/';
  return [
    `<b>Google</b> (${start.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })})`,
    `• клики: <b>${c.clicks}</b> (${diff(c.clicks, p.clicks)} к прошлой неделе)`,
    `• показы: <b>${c.impressions}</b> (${diff(c.impressions, p.impressions)}), средняя позиция ${c.position ? c.position.toFixed(1) : '–'}`,
    top.length ? `• приводят людей: ${top.map((x) => `«${esc(x.keys?.[0] || '')}» ${x.clicks}`).join(', ')}` : '• кликов по запросам пока нет',
    noClick.length ? `• показы без кликов (доработать): ${noClick.map((x) => `«${esc(x.keys?.[0] || '')}» ${x.impressions}`).join(', ')}` : '',
    topPages.length ? `• лучшие страницы: ${topPages.map((x) => `${esc(short(x.keys?.[0] || ''))} (${x.clicks})`).join(', ')}` : '',
  ].filter(Boolean);
}
