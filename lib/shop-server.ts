// Магазин міні-продуктів: замовлення, видача доступу і лист покупцю (Resend).
// Оплату підключимо, коли буде ФОП: тоді провайдер викличе markPaid, а поки власниця позначає оплату вручну.
import { db, dbReady } from './db';
import { getProduct } from './shop';
import { getDoc } from './printables';

const enc = encodeURIComponent;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://murly.com.ua';
export const payReady = () => Boolean(process.env.SHOP_PAY_PROVIDER);
export const mailReady = () => Boolean(process.env.RESEND_API_KEY);

export type Order = { id: string; product: string; email: string; name?: string; lang: string; amount: number; status: string; token: string; created_at: string; paid_at?: string; sent_at?: string };

export async function createOrder(product: string, email: string, name: string, lang: string) {
  const p = getProduct(product);
  if (!p || !dbReady()) return null;
  const rows = await db.insertReturning('shop_orders', [{ product, email: email.trim().toLowerCase().slice(0, 200), name: name.slice(0, 80) || null, lang, amount: p.price, status: payReady() ? 'pending' : 'waitlist' }]);
  return (rows?.[0] as Order) ?? null;
}

export async function orderByToken(token: string) {
  if (!dbReady() || !/^[0-9a-f]{20,64}$/.test(token)) return null;
  const r = await db.query(`shop_orders?token=eq.${enc(token)}&select=*&limit=1`);
  return (r[0] as Order) ?? null;
}

export async function listOrders() {
  return (await db.query('shop_orders?select=*&order=created_at.desc&limit=200')) as Order[];
}

const L = (lang: string, t: { uk: string; ru: string; en: string }) => (lang === 'ru' ? t.ru : lang === 'en' ? t.en : t.uk);

function mailHtml(o: Order) {
  const p = getProduct(o.product)!;
  const link = `${SITE}/get/${o.token}`;
  const docs = p.docs.map((d) => getDoc(d)).filter(Boolean).map((d) => `<li>${o.lang === 'ru' ? d!.title.ru : d!.title.uk}</li>`).join('');
  const hi = L(o.lang, { uk: 'Дякуємо за покупку!', ru: 'Спасибо за покупку!', en: 'Thank you for your purchase!' });
  const intro = L(o.lang, { uk: 'Ось твої матеріали. Відкрий посилання, обери файл і натисни «Друк або PDF».', ru: 'Вот твои материалы. Открой ссылку, выбери файл и нажми «Печать или PDF».', en: 'Here are your materials. Open the link, choose a file and press “Print or PDF”.' });
  const btn = L(o.lang, { uk: 'Відкрити матеріали', ru: 'Открыть материалы', en: 'Open the materials' });
  const keep = L(o.lang, { uk: 'Посилання діє завжди, збережи цей лист.', ru: 'Ссылка действует всегда, сохрани это письмо.', en: 'The link never expires, keep this email.' });
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1B2140">
<h2 style="color:#534AB7">Murly</h2><p><b>${hi}</b></p><p>${L(o.lang, p.name)}</p><ul>${docs}</ul><p>${intro}</p>
<p><a href="${link}" style="display:inline-block;background:#534AB7;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:bold">${btn}</a></p>
<p style="font-size:13px;color:#5a607a">${keep}<br>${link}</p></div>`;
}

export async function sendOrderMail(o: Order) {
  if (!mailReady()) return { error: 'no_mail_key' } as const;
  const p = getProduct(o.product);
  if (!p) return { error: 'no_product' } as const;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.SHOP_FROM || 'Murly <hello@murly.com.ua>', to: [o.email], subject: `Murly: ${L(o.lang, p.name)}`, html: mailHtml(o) }),
  });
  if (!r.ok) return { error: `resend_${r.status}` } as const;
  await db.patchWhere(`shop_orders?id=eq.${enc(o.id)}`, { status: 'sent', sent_at: new Date().toISOString() });
  return { ok: true } as const;
}

// Оплата підтверджена (вручну власницею або провайдером): позначаємо й одразу надсилаємо лист
export async function markPaid(id: string, provider = 'manual', ref = '') {
  const r = await db.query(`shop_orders?id=eq.${enc(id)}&select=*&limit=1`);
  const o = r[0] as Order | undefined;
  if (!o) return { error: 'not_found' } as const;
  await db.patchWhere(`shop_orders?id=eq.${enc(id)}`, { status: 'paid', paid_at: o.paid_at || new Date().toISOString(), provider, provider_ref: ref || null });
  return sendOrderMail({ ...o, status: 'paid' });
}
