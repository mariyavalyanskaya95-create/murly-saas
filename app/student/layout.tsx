import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { tr } from '@/lib/i18n-server';

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
        <Link href="/" className="mu-logo">MUR<span className="mu-logo__dot" />LY</Link>
        <span className="t-top__badge t-top__badge--student">{t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' })}</span>
        <div className="t-top__user"><UserButton /></div>
      </header>
      <main className="s-main">{children}</main>
    </div>
  );
}
