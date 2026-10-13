'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import Icon from '../Icon';
import { TeacherProvider } from '@/lib/teacher-store';

const NAV = [
  { href: '/teacher', icon: 'e-cal', label: 'Сьогодні' },
  { href: '/teacher/students', icon: 'd-team', label: 'Учні' },
  { href: '/teacher/schedule', icon: 'd-clock', label: 'Розклад' },
  { href: '/teacher/payments', icon: 'd-money', label: 'Оплати' },
  { href: '/teacher/settings', icon: 'd-log', label: 'Налаштування' },
];

export default function TeacherShell({ userId, name, children }: { userId: string; name: string; children: React.ReactNode }) {
  const path = usePathname();
  const active = (href: string) => (href === '/teacher' ? path === href : path.startsWith(href));

  return (
    <TeacherProvider userId={userId}>
      <div className="t-app">
        <header className="t-top">
          <Link href="/" className="mu-logo">MUR<span className="mu-logo__dot" />LY</Link>
          <span className="t-top__badge">Кабінет вчителя</span>
          <div className="t-top__user">
            <span>{name}</span>
            <UserButton />
          </div>
        </header>
        <div className="t-body">
          <nav className="t-side" aria-label="Меню кабінету">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`t-side__link ${active(n.href) ? 'is-on' : ''}`}
                aria-current={active(n.href) ? 'page' : undefined}>
                <Icon id={n.icon} />{n.label}
              </Link>
            ))}
            <div className="t-side__sep" />
            <Link href="/irregular-verbs/games" className="t-side__link"><Icon id="e-trophy" />Ігри</Link>
            <Link href="/grammar" className="t-side__link"><Icon id="e-book" />Граматика</Link>
          </nav>
          <main className="t-main">
            <div className="t-demo">
              <Icon id="d-lock" />
              <span>Поки що дані зберігаються тільки в цьому браузері. Синхронізацію між пристроями і доступ для учнів підключимо найближчим часом.</span>
            </div>
            {children}
          </main>
        </div>
      </div>
    </TeacherProvider>
  );
}
