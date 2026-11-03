import type { Metadata } from 'next';
import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { tr } from '@/lib/i18n-server';
import Kit from '@/components/Kit';
import { LangSwitch } from '@/components/LangProvider';
import { studentFlags } from '@/lib/student-data';
import StudentNav from '@/components/student/StudentNav';
import XpHud from '@/components/xp/XpHud';

export function generateMetadata(): Metadata {
  const t = tr();
  return { title: `${t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' })} | Murly`, robots: { index: false, follow: false } };
}

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const t = tr();
  const f = await studentFlags(userId);
  // підліток без учителя теж бачить НМТ, якщо обрав «Готуюся до НМТ»
  const track = ((await currentUser())?.unsafeMetadata as { track?: string } | undefined)?.track;
  const nmt = f.nmt || track === 'nmt';
  return (
    <div className="t-app">
      <header className="t-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <span className="t-top__badge t-top__badge--student">{t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' })}</span>
        <div className="t-top__user"><LangSwitch /><UserButton /></div>
      </header>
      <StudentNav any={f.any} nmt={nmt} games={!f.adult && track !== 'adult'} />
      <main className="s-main">{children}</main>
      <XpHud persist />
    </div>
  );
}
