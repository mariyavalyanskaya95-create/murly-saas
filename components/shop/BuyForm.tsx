'use client';
// Купівля міні-продукту: пошта покупця. Поки оплата не підключена, записуємо в список очікування.
import { useState } from 'react';
import { useT } from '../LangProvider';

export default function BuyForm({ product, price }: { product: string; price: number }) {
  const t = useT();
  const [email, setEmail] = useState('');
  const [st, setSt] = useState<'idle' | 'busy' | 'soon' | 'pay' | 'err' | 'bad'>('idle');
  const go = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setSt('bad');
    setSt('busy');
    try {
      const r = await fetch('/api/shop', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'order', product, email, lang: t.lang }) });
      const j = await r.json();
      if (j.payUrl) { window.location.href = j.payUrl; return setSt('pay'); }
      setSt(j.ok ? 'soon' : 'err');
    } catch { setSt('err'); }
  };
  if (st === 'soon') return <p className="shop-ok">{t({ uk: 'Готово! Онлайн-оплату ми саме підключаємо. Щойно вона запрацює, надішлемо на твою пошту посилання на оплату, а після неї одразу всі матеріали.', ru: 'Готово! Онлайн-оплату мы как раз подключаем. Как только она заработает, пришлём на твою почту ссылку на оплату, а после неё сразу все материалы.', en: 'Done! We are connecting online payments right now. As soon as they work, we will email you a payment link, and right after it all the materials.' })}</p>;
  return (
    <form className="shop-buy" onSubmit={go}>
      <label htmlFor="shop-email">{t({ uk: 'Пошта, куди надіслати матеріали', ru: 'Почта, куда прислать материалы', en: 'Email to send the materials to' })}</label>
      <div className="shop-buy__row">
        <input id="shop-email" type="email" required autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setSt('idle'); }} placeholder="name@gmail.com" />
        <button type="submit" className="mu-btn mu-btn--lime" disabled={st === 'busy'}>{t({ uk: `Купити за ${price} ₴`, ru: `Купить за ${price} ₴`, en: `Buy for ${price} ₴` })}</button>
      </div>
      {st === 'bad' && <small className="shop-err">{t({ uk: 'Перевір пошту', ru: 'Проверь почту', en: 'Check your email' })}</small>}
      {st === 'err' && <small className="shop-err">{t({ uk: 'Не вийшло, спробуй ще раз', ru: 'Не получилось, попробуй ещё раз', en: 'Something went wrong, try again' })}</small>}
      <small className="t-muted">{t({ uk: 'Після оплати файли для друку одразу прийдуть на пошту. Купуєш один раз, доступ назавжди.', ru: 'После оплаты файлы для печати сразу придут на почту. Покупаешь один раз, доступ навсегда.', en: 'After payment, the printable files arrive in your inbox right away. Buy once, keep forever.' })}</small>
    </form>
  );
}
