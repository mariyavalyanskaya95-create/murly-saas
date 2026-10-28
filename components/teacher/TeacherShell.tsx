'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LessonModeProvider, useLessonMode } from '@/lib/lesson-mode';
import { UserButton } from '@clerk/nextjs';
import Icon from '../Icon';
import { TeacherProvider, useTeacher } from '@/lib/teacher-store';
import { LangSwitch, useT } from '../LangProvider';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

const NAV: { href: string; icon: string; label: T; short?: T; priv?: boolean }[] = [
  { href: '/teacher', icon: 'e-cal', label: { uk: 'Сьогодні', ru: 'Сегодня', en: 'Today' }, priv: true },
  { href: '/teacher/students', icon: 'd-team', label: { uk: 'Учні', ru: 'Ученики', en: 'Students' } },
  { href: '/teacher/review', icon: 'e-pencil', label: { uk: 'Перевірка', ru: 'Проверка', en: 'Review' } },
  { href: '/teacher/lessons', icon: 'e-book', label: { uk: 'Уроки', ru: 'Уроки', en: 'Lessons' } },
  { href: '/teacher/schedule', icon: 'd-clock', label: { uk: 'Розклад', ru: 'Расписание', en: 'Schedule' }, priv: true },
  { href: '/teacher/payments', icon: 'd-money', label: { uk: 'Оплати', ru: 'Оплаты', en: 'Payments' }, priv: true },
  { href: '/teacher/settings', icon: 'd-log', label: { uk: 'Налаштування', ru: 'Настройки', en: 'Settings' }, short: { uk: 'Ще', ru: 'Ещё', en: 'More' }, priv: true },
];

export default function TeacherShell(props: { userId: string; name: string; children: React.ReactNode }) {
  return <LessonModeProvider><Shell {...props} /></LessonModeProvider>;
}

function Shell({ userId, name, children }: { userId: string; name: string; children: React.ReactNode }) {
  const t = useT();
  const path = usePathname();
  const router = useRouter();
  const lesson = useLessonMode();
  const active = (href: string) => (href === '/teacher' ? path === href : path.startsWith(href));
  const privPage = NAV.some((n) => n.priv && (n.href === '/teacher' ? path === '/teacher' : path.startsWith(n.href)));
  // у режимі уроку зі сторінок з розкладом і грошима переходимо до учнів
  useEffect(() => { if (lesson.on && privPage) router.replace('/teacher/students'); }, [lesson.on, privPage, router]);

  return (
    <TeacherProvider userId={userId}>
      <div className={`t-app ${lesson.on ? 'is-lesson' : ''}`}>
        <header className="t-top">
          <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
          <span className="t-top__badge">{t({ uk: 'Кабінет вчителя', ru: 'Кабинет учителя', en: 'Teacher dashboard' })}</span>
          <button type="button" className={`t-lesson-btn ${lesson.on ? 'is-on' : ''}`} onClick={lesson.toggle} aria-pressed={lesson.on}
            title={t({ uk: 'Ховає ціни, оплати, розклад і нотатки, поки ти показуєш екран учню', ru: 'Скрывает цены, оплаты, расписание и заметки, пока ты показываешь экран ученику', en: 'Hides prices, payments, schedule and notes while you share your screen' })}>
            <EyeIcon off={lesson.on} />{lesson.on ? t({ uk: 'Режим уроку: увімкнено', ru: 'Режим урока: включён', en: 'Lesson mode: on' }) : t({ uk: 'Режим уроку', ru: 'Режим урока', en: 'Lesson mode' })}
          </button>
          <div className="t-top__user">
            <LangSwitch />
            <span>{name}</span>
            <UserButton />
          </div>
        </header>
        <div className="t-body">
          <nav className="t-side" aria-label={t({ uk: 'Меню кабінету', ru: 'Меню кабинета', en: 'Dashboard menu' })}>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`t-side__link ${active(n.href) ? 'is-on' : ''} ${n.priv ? 't-private' : ''}`}
                aria-current={active(n.href) ? 'page' : undefined}>
                <Icon id={n.icon} /><span className="t-side__full">{t(n.label)}</span><span className="t-side__short">{t(n.short ?? n.label)}</span>{n.href === '/teacher/review' && <ReviewBadge />}
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

// око: відкрите або перекреслене (свій простий SVG)
function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  );
}

// Скільки зданих домашок чекає перевірки
function ReviewBadge() {
  const { data, ready } = useTeacher();
  const n = ready ? data.homework.filter((h) => h.status === 'done').length : 0;
  return n ? <span className="t-side__badge" aria-label={String(n)}>{n}</span> : null;
}
