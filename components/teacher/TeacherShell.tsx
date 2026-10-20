'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import Icon from '../Icon';
import { TeacherProvider, useTeacher } from '@/lib/teacher-store';
import { useT } from '../LangProvider';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

const NAV: { href: string; icon: string; label: T; short?: T }[] = [
  { href: '/teacher', icon: 'e-cal', label: { uk: 'Сьогодні', ru: 'Сегодня', en: 'Today' } },
  { href: '/teacher/students', icon: 'd-team', label: { uk: 'Учні', ru: 'Ученики', en: 'Students' } },
  { href: '/teacher/lessons', icon: 'e-book', label: { uk: 'Уроки', ru: 'Уроки', en: 'Lessons' } },
  { href: '/teacher/schedule', icon: 'd-clock', label: { uk: 'Розклад', ru: 'Расписание', en: 'Schedule' } },
  { href: '/teacher/payments', icon: 'd-money', label: { uk: 'Оплати', ru: 'Оплаты', en: 'Payments' } },
  { href: '/teacher/settings', icon: 'd-log', label: { uk: 'Налаштування', ru: 'Настройки', en: 'Settings' }, short: { uk: 'Ще', ru: 'Ещё', en: 'More' } },
];

export default function TeacherShell({ userId, name, children }: { userId: string; name: string; children: React.ReactNode }) {
  const t = useT();
  const path = usePathname();
  const active = (href: string) => (href === '/teacher' ? path === href : path.startsWith(href));

  return (
    <TeacherProvider userId={userId}>
      <div className="t-app">
        <header className="t-top">
          <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
          <span className="t-top__badge">{t({ uk: 'Кабінет вчителя', ru: 'Кабинет учителя', en: 'Teacher dashboard' })}</span>
          <div className="t-top__user">
            <span>{name}</span>
            <UserButton />
          </div>
        </header>
        <div className="t-body">
          <nav className="t-side" aria-label={t({ uk: 'Меню кабінету', ru: 'Меню кабинета', en: 'Dashboard menu' })}>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`t-side__link ${active(n.href) ? 'is-on' : ''}`}
                aria-current={active(n.href) ? 'page' : undefined}>
                <Icon id={n.icon} /><span className="t-side__full">{t(n.label)}</span><span className="t-side__short">{t(n.short ?? n.label)}</span>
              </Link>
            ))}
            <div className="t-side__sep" />
            <Link href="/teacher/games" className={`t-side__link t-side__extra ${active('/teacher/games') ? 'is-on' : ''}`}><Icon id="d-spark" />{t({ uk: 'Мої ігри', ru: 'Мои игры', en: 'My games' })}</Link>
            <Link href="/irregular-verbs/games" className="t-side__link t-side__extra"><Icon id="e-trophy" />{t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link>
            <Link href="/grammar" className="t-side__link t-side__extra"><Icon id="e-book" />{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</Link>
          </nav>
          <main className="t-main">
            <SyncBanner />
            {children}
          </main>
        </div>
      </div>
    </TeacherProvider>
  );
}

function SyncBanner() {
  const t = useT();
  const { mode, syncError } = useTeacher();
  if (syncError) return (
    <div className="t-demo t-demo--err"><Icon id="d-bolt" /><span>{t({ uk: 'Частину змін не вдалося зберегти. Онови сторінку і перевір останні дії.', ru: 'Часть изменений не удалось сохранить. Обнови страницу и проверь последние действия.', en: 'Some changes could not be saved. Refresh the page and check your latest actions.' })}</span></div>
  );
  if (mode !== 'local') return null;
  return (
    <div className="t-demo"><Icon id="d-lock" /><span>{t({ uk: 'Поки що дані зберігаються тільки в цьому браузері. Синхронізацію між пристроями і доступ для учнів підключимо найближчим часом.', ru: 'Пока данные хранятся только в этом браузере. Синхронизацию между устройствами и доступ для учеников подключим в ближайшее время.', en: 'For now your data is saved only in this browser. Sync across devices and student access are coming soon.' })}</span></div>
  );
}
