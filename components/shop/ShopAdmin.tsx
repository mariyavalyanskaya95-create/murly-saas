'use client';
// Замовлення міні-продуктів (бачить лише власниця): підтвердити оплату й надіслати матеріали
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/shop';
import { DOCS } from '@/lib/printables';

type O = { id: string; product: string; email: string; amount: number; status: string; created_at: string; token: string };
const ST: Record<string, string> = { waitlist: 'чекає оплати (оплата ще не підключена)', pending: 'очікує оплату', paid: 'оплачено', sent: 'надіслано', cancelled: 'скасовано' };

export default function ShopAdmin({ mailOk }: { mailOk: boolean }) {
  const [list, setList] = useState<O[]>([]);
  const [msg, setMsg] = useState('');
  const load = () => fetch('/api/shop', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'list' }) }).then((r) => r.json()).then((j) => setList(j.orders || []));
  useEffect(() => { load(); }, []);
  const act = async (op: string, id: string) => {
    setMsg('...');
    const j = await fetch('/api/shop', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op, id }) }).then((r) => r.json());
    setMsg(j.ok ? 'Готово: лист надіслано' : `Помилка: ${j.error}`);
    load();
  };
  return (
    <div className="shop-admin">
      <h1>Магазин: замовлення</h1>
      {!mailOk && <p className="shop-err">Щоб листи надсилались, додай RESEND_API_KEY у Vercel.</p>}
      {msg && <p>{msg}</p>}
      <table className="pv-table">
        <thead><tr><th>Дата</th><th>Пошта</th><th>Продукт</th><th>Сума</th><th>Статус</th><th /></tr></thead>
        <tbody>{list.map((o) => (
          <tr key={o.id}>
            <td>{new Date(o.created_at).toLocaleString('uk-UA')}</td><td>{o.email}</td>
            <td>{PRODUCTS.find((p) => p.id === o.product)?.name.uk || o.product}</td><td>{o.amount} ₴</td><td>{ST[o.status] || o.status}</td>
            <td>{['waitlist', 'pending'].includes(o.status) ? <button type="button" className="mu-btn t-btn-sm" onClick={() => { if (confirm(`Підтвердити оплату і надіслати матеріали на ${o.email}?`)) act('markPaid', o.id); }}>Оплачено, надіслати</button>
              : <button type="button" className="mu-btn t-btn-sm" onClick={() => act('resend', o.id)}>Надіслати ще раз</button>}</td>
          </tr>
        ))}</tbody>
      </table>
      <h2>Перегляд матеріалів</h2>
      <ul>{Object.values(DOCS).map((d) => <li key={d.id}><Link href={`/print/${d.id}`} target="_blank">{d.title.uk}</Link></li>)}</ul>
    </div>
  );
}
