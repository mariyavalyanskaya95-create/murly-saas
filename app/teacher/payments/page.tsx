'use client';
import Link from 'next/link';
import { balanceOf, fmtDate, fmtMoney, useTeacher } from '@/lib/teacher-store';

export default function PaymentsPage() {
  const { data, ready } = useTeacher();
  if (!ready) return null;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthPaid = data.payments.filter((p) => new Date(p.at) >= monthStart).reduce((n, p) => n + p.amount, 0);
  const monthDone = data.lessons.filter((l) => l.status === 'done' && new Date(l.start) >= monthStart);
  const monthEarned = monthDone.reduce((n, l) => n + (data.students.find((s) => s.id === l.studentId)?.price ?? 0), 0);
  const rows = data.students.map((s) => ({ s, b: balanceOf(data, s.id) })).sort((a, b) => a.b - b.b);
  const debt = rows.filter((r) => r.b < 0).reduce((n, r) => n - r.b, 0);

  return (
    <div className="t-page">
      <div className="t-head"><div><p className="t-eyebrow">Оплати</p><h1>Гроші за {now.toLocaleDateString('uk-UA', { month: 'long' })}</h1></div></div>

      <div className="t-stats">
        <div className="t-stat t-stat--lime"><b>{fmtMoney(monthPaid)}</b><span>отримано цього місяця</span></div>
        <div className="t-stat t-stat--sky"><b>{fmtMoney(monthEarned)}</b><span>за {monthDone.length} проведених занять</span></div>
        <div className="t-stat t-stat--tomato"><b>{fmtMoney(debt)}</b><span>загальний борг учнів</span></div>
      </div>

      <div className="t-card">
        <h2>Баланс учнів</h2>
        {rows.length ? rows.map(({ s, b }) => (
          <Link key={s.id} href={`/teacher/students/${s.id}?tab=pay`} className="t-row-link">
            <span><span className={`t-dot t-dot--${s.color}`} />{s.name}</span>
            <b className={b < 0 ? 't-neg' : b > 0 ? 't-pos' : ''}>{b < 0 ? `борг ${fmtMoney(-b)}` : b > 0 ? `аванс ${fmtMoney(b)}` : '0 ₴'}</b>
          </Link>
        )) : <p className="t-empty">Додай учнів, і тут з’явиться їхній баланс.</p>}
      </div>

      {data.payments.length > 0 && (
        <div className="t-card">
          <h2>Останні оплати</h2>
          {data.payments.slice(0, 15).map((p) => (
            <div key={p.id} className="t-row">
              <span>{fmtDate(p.at)} · {data.students.find((s) => s.id === p.studentId)?.name ?? 'учень'}{p.note ? ` · ${p.note}` : ''}</span>
              <b className="t-pos">+{fmtMoney(p.amount)}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
