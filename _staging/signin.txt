import { SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';
import AuthShell, { clerkLook } from '@/components/AuthShell';
import { tr } from '@/lib/i18n-server';

const safe = (u?: string) => (u && u.startsWith('/') && !u.startsWith('//') ? u : undefined);

export function generateMetadata(): Metadata {
  const t = tr();
  return { title: t({ uk: 'Вхід | Murly', ru: 'Вход | Murly', en: 'Log in | Murly' }), robots: { index: false } };
}

export default function SignInPage({ searchParams }: { searchParams: { redirect_url?: string } }) {
  const t = tr();
  const back = safe(searchParams.redirect_url);
  return (
    <AuthShell
      title={<>{t({ uk: 'З поверненням', ru: 'С возвращением', en: 'Welcome back' })}<em>!</em></>}
      lead={t({ uk: 'Увійди, щоб відкрити свій кабінет.', ru: 'Войди, чтобы открыть свой кабинет.', en: 'Log in to open your dashboard.' })}
      points={[
        { icon: 'e-pencil', text: t({ uk: 'Домашка і нові слова чекають', ru: 'Домашка и новые слова ждут', en: 'Homework and new words are waiting' }) },
        { icon: 'e-cal', text: t({ uk: 'Розклад занять завжди під рукою', ru: 'Расписание занятий всегда под рукой', en: 'Your lesson schedule, always at hand' }) },
        { icon: 'c-fish', text: t({ uk: 'Монетки для Murly Town', ru: 'Монетки для Murly Town', en: 'Coins for Murly Town' }) },
      ]}
    >
      <SignIn appearance={clerkLook} signUpUrl={back ? `/sign-up?redirect_url=${encodeURIComponent(back)}` : '/sign-up'}
        forceRedirectUrl={back} fallbackRedirectUrl="/dashboard" />
    </AuthShell>
  );
}
