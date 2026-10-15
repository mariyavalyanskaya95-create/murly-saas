import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import Icon from '@/components/Icon';

const safe = (u?: string) => (u && u.startsWith('/') && !u.startsWith('//') ? u : undefined);

export default function SignUpPage({ searchParams }: { searchParams: { role?: string; plan?: string; redirect_url?: string } }) {
  const back = safe(searchParams.redirect_url);
  const role = searchParams.role === 'student' ? 'student' : searchParams.role === 'teacher' ? 'teacher' : null;
  const keep = (r: string) => `/sign-up?role=${r}${back ? `&redirect_url=${encodeURIComponent(back)}` : ''}${searchParams.plan ? `&plan=${encodeURIComponent(searchParams.plan)}` : ''}`;

  // Спершу питаємо, хто реєструється: від цього залежить кабінет
  if (!role) {
    return (
      <div className="auth-page">
        <Link href="/" className="mu-logo">MUR<span className="mu-logo__dot" />LY</Link>
        <h1>Хто <em>ти?</em></h1>
        <p>Обери, і ми створимо потрібний кабінет.</p>
        <div className="auth-roles">
          <Link href={keep('student')} className="mu-role mu-role--lime">
            <span className="mu-role__ic"><Icon id="d-kid" /></span>
            <h3>Я учень</h3>
            <span>Домашка, мої слова, ігри і монетки. Код від учителя можна ввести пізніше.</span>
          </Link>
          <Link href={keep('teacher')} className="mu-role mu-role--mustard">
            <span className="mu-role__ic"><Icon id="d-team" /></span>
            <h3>Я вчитель</h3>
            <span>Учні, розклад, готові уроки, домашка з автоперевіркою.</span>
          </Link>
        </div>
        <p className="auth-alt">Уже є акаунт? <Link href={back ? `/sign-in?redirect_url=${encodeURIComponent(back)}` : '/sign-in'}>Увійти</Link></p>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <Link href="/" className="mu-logo">MUR<span className="mu-logo__dot" />LY</Link>
      <h1>{role === 'student' ? <>Твій кабінет <em>у Murly</em></> : <>Кабінет <em>вчителя</em></>}</h1>
      <p>{role === 'student' ? 'Домашка, словник від учителя та ігри з твоїми словами.' : 'Учні, розклад, словники і оплати в одному місці.'}</p>
      <SignUp signInUrl={back ? `/sign-in?redirect_url=${encodeURIComponent(back)}` : '/sign-in'}
        forceRedirectUrl={back} fallbackRedirectUrl="/dashboard"
        unsafeMetadata={{ role, plan: searchParams.plan }} />
      <p className="auth-alt"><Link href={keep(role === 'student' ? 'teacher' : 'student')}>{role === 'student' ? 'Я вчитель, а не учень' : 'Я учень, а не вчитель'}</Link></p>
    </div>
  );
}
