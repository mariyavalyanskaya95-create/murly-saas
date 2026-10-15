import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

const safe = (u?: string) => (u && u.startsWith('/') && !u.startsWith('//') ? u : undefined);

export default function SignInPage({ searchParams }: { searchParams: { redirect_url?: string } }) {
  const back = safe(searchParams.redirect_url);
  return (
    <div className="auth-page">
      <Link href="/" className="mu-logo">MUR<span className="mu-logo__dot" />LY</Link>
      <h1>З поверненням<em>!</em></h1>
      <p>Увійди, щоб відкрити свій кабінет.</p>
      <SignIn signUpUrl={back ? `/sign-up?redirect_url=${encodeURIComponent(back)}` : '/sign-up'}
        forceRedirectUrl={back} fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
