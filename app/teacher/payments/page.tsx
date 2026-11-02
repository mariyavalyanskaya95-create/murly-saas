'use client';
import Link from 'next/link';
import { useState } from 'react';
import { balanceOf, balanceText, fmtDate, fmtMoney, localeOf, plural, useTeacher , isBilled } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

export default function PaymentsPage() {
  const t = useT();
  const { data, ready, addPayment } = useTeacher();
  const [open, setOpen] = useState(false);
  const [sid, setSid] = useState('');
  const [amount, setAmount] = useState('');
  const [saved, setSaved] = useState('');
  if (!ready) return null;
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const st = data.students.find((x) => x.id === (sid || data.students[0]?.id));
    const n = Number(amount);
    if (!st || !(n > 0)) return;
    addPayment(st.id, n);
    setSaved(`${st.name}: ${fmtMoney(n, t.lang)}`); setAmount('');
  };

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthPaid = data.payments.filter((p) => new Date(p.at) >= monthStart).reduce((n, p) => n + p.amount, 0);
  const monthDone = data.lessons.filter((l) => isBilled(l.status) && new Date(l.start) >= monthStart);
  const monthEarned = monthDone.reduce((n, l) => n + (data.students.find((s) => s.id === l.studentId)?.price ?? 0), 0);
  const rows = data.students.map((s) => ({ s, b: balanceOf(data, s.id) })).sort((a, b) => a.b - b.b);
  const debt = rows.filter((r) => r.b < 0).reduce((n, r) => n - r.b, 0);

  return (
    <div className="t-page">
      <div className="t-head"><div><p className="t-eyebrow">{t({ uk: 'Оплати', ru: 'Оплаты', en: 'Payments' })}</p><h1>{t.lang === 'en' ? `Money for ${now.toLocaleDateString(localeOf('en'), { month: 'long' })}` : t.lang === 'ru' ? `Деньги за ${now.toLocaleDateString(localeOf('ru'), { month: 'long' })}` : `Гроші за ${now.toLocaleDateString('uk-UA', { month: 'long' })}`}</h1></div>
        {data.students.length > 0 && <div className="t-head__actions"><button type="button" className="mu-btn mu-btn--lime" onClick={() => { setOpen(!open); setSaved(''); }}>{t({ uk: '+ Оплата', ru: '+ Оплата', en: '+ Payment' })}</button></div>}
      </div>

      {open && (
        <form className="t-card t-form t-paynew" onSubmit={save}>
          <h2>{t({ uk: 'Записати оплату', ru: 'Записать оплату', en: 'Record a payment' })}</h2>
          <div className="t-paynew__row">
            <label>{t({ uk: 'Учень', ru: 'Ученик', en: 'Student' })}
              <select value={sid || data.students[0]?.id} onChange={(e) => setSid(e.target.value)}>
                {data.students.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
              </select>
            </label>
            <label>{t({ uk: 'Сума, ₴', ru: 'Сумма, ₴', en: 'Amount, ₴' })}
              <input type="number" min="1" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </label>
            <button type="submit" className="mu-btn mu-btn--ink">{t({ uk: 'Записати', ru: 'Записать', en: 'Save' })}</button>
          </div>
          {saved && <p className="t-muted">{t({ uk: 'Записано', ru: 'Записано', en: 'Saved' })}: {saved}</p>}
          <p className="t-muted">{t({ uk: 'Порада: оплату можна записати і з телефона в Telegram-боті, кнопкою «Оплата».', ru: 'Совет: оплату можно записать и с телефона в Telegram-боте, кнопкой «Оплата».', en: 'Tip: you can also record payments from your phone with the Payment button in the Telegram bot.' })}</p>
        </form>
      )}

      <div className="t-stats">
        <div className="t-stat t-stat--lime"><b>{fmtMoney(monthPaid, t.lang)}</b><span>{t({ uk: 'отримано цього місяця', ru: 'получено в этом месяце', en: 'received this month' })}</span></div>
        <div className="t-stat t-stat--sky"><b>{fmtMoney(monthEarned, t.lang)}</b><span>{t({ uk: 'за', ru: 'за', en: 'for' })} {monthDone.length} {plural(monthDone.length, t.lang, { uk: ['проведене заняття', 'проведені заняття', 'проведених занять'], ru: ['проведённое занятие', 'проведённых занятия', 'проведённых занятий'], en: ['lesson taught', 'lessons taught'] })}</span></div>
        <div className="t-stat t-stat--tomato"><b>{fmtMoney(debt, t.lang)}</b><span>{t({ uk: 'учні мають доплатити', ru: 'ученики должны доплатить', en: 'still to be paid' })}</span></div>
      </div>

      <div className="t-card">
        <h2>{t({ uk: 'Баланс учнів', ru: 'Баланс учеников', en: 'Student balances' })}</h2>
        {rows.length ? rows.map(({ s, b }) => (
          <Link key={s.id} href={`/teacher/students/${s.id}?tab=pay`} className="t-row-link">
            <span><span className={`t-dot t-dot--${s.color}`} />{s.name}</span>
            {(() => { const bt = balanceText(s, b, t.lang); return <b className={bt.cls}>{b === 0 ? '0 ₴' : bt.text}</b>; })()}
          </Link>
        )) : <p className="t-empty">{t({ uk: 'Додай учнів, і тут з’явиться їхній баланс.', ru: 'Добавь учеников, и здесь появится их баланс.', en: 'Add students and their balances will show up here.' })} <Link href="/teacher/students">{t({ uk: 'До учнів', ru: 'К ученикам', en: 'Go to students' })}</Link></p>}
      </div>

      {data.payments.length > 0 && (
        <div className="t-card">
          <h2>{t({ uk: 'Останні оплати', ru: 'Последние оплаты', en: 'Recent payments' })}</h2>
          {data.payments.slice(0, 15).map((p) => (
            <div key={p.id} className="t-row">
              <span>{fmtDate(p.at, t.lang)} · {data.students.find((s) => s.id === p.studentId)?.name ?? t({ uk: 'учень', ru: 'ученик', en: 'student' })}{p.note ? ` · ${p.note}` : ''}</span>
              <b className="t-pos">+{fmtMoney(p.amount, t.lang)}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
