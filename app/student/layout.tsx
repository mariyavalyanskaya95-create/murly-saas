import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { tr } from '@/lib/i18n-server';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return { title: `${t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' })} | Murly`, robots: { index: false, follow: false } };
}

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const t = tr();
  return (
    <div className="t-app">
      <header className="t-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <span className="t-top__badge t-top__badge--student">{t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' })}</span>
        <div className="t-top__user"><UserButton /></div>
      </header>
      <nav className="s-nav" aria-label={t({ uk: 'Розділи', ru: 'Разделы', en: 'Sections' })}>
        <Link href="/student">{t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' })}</Link>
        <Link href="/nmt/mock">{t({ uk: 'Пробні НМТ', ru: 'Пробные НМТ', en: 'Mock NMT' })}</Link>
        <Link href="/grammar">{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</Link>
        <Link href="/irregular-verbs">{t({ uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' })}</Link>
        <Link href="/practice">{t({ uk: 'Слухати і читати', ru: 'Слушать и читать', en: 'Listening and reading' })}</Link>
        <Link href="/worlds">{t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link>
      </nav>
      <main className="s-main">{children}</main>
    </div>
  );
}
