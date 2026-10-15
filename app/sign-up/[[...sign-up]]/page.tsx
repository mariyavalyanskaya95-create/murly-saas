import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import AuthShell, { clerkLook } from '@/components/AuthShell';
import { tr } from '@/lib/i18n-server';

const safe = (u?: string) => (u && u.startsWith('/') && !u.startsWith('//') ? u : undefined);

export function generateMetadata(): Metadata {
  const t = tr();
  return { title: t({ uk: 'Реєстрація | Murly', ru: 'Регистрация | Murly', en: 'Sign up | Murly' }), robots: { index: false } };
}

export default function SignUpPage({ searchParams }: { searchParams: { role?: string; plan?: string; redirect_url?: string } }) {
  const t = tr();
  const back = safe(searchParams.redirect_url);
  const role = searchParams.role === 'student' ? 'student' : searchParams.role === 'teacher' ? 'teacher' : null;
  const keep = (r: string) => `/sign-up?role=${r}${back ? `&redirect_url=${encodeURIComponent(back)}` : ''}${searchParams.plan ? `&plan=${encodeURIComponent(searchParams.plan)}` : ''}`;
  const signIn = back ? `/sign-in?redirect_url=${encodeURIComponent(back)}` : '/sign-in';

  const student = [
    { icon: 'e-pencil', text: t({ uk: 'Домашка, яка перевіряється сама', ru: 'Домашка, которая проверяется сама', en: 'Homework that checks itself' }) },
    { icon: 'e-book', text: t({ uk: 'Твої слова від учителя та ігри з ними', ru: 'Твои слова от учителя и игры с ними', en: 'Your words from the teacher, with games' }) },
    { icon: 'c-fish', text: t({ uk: 'Монетки і своє 3D-містечко Murly Town', ru: 'Монетки и свой 3D-городок Murly Town', en: 'Coins and your own 3D Murly Town' }) },
  ];
  const teacher = [
    { icon: 'd-team', text: t({ uk: 'Учні, розклад і оплати в одному місці', ru: 'Ученики, расписание и оплаты в одном месте', en: 'Students, schedule and payments in one place' }) },
    { icon: 'e-board', text: t({ uk: '24 готові уроки по 60 хвилин', ru: '24 готовых урока по 60 минут', en: '24 ready-made 60-minute lessons' }) },
    { icon: 'e-pencil', text: t({ uk: 'Домашка з автоперевіркою і словник учня', ru: 'Домашка с автопроверкой и словарь ученика', en: 'Auto-checked homework and student word lists' }) },
  ];

  // Спершу питаємо, хто реєструється: від цього залежить кабінет
  if (!role) {
    return (
      <AuthShell
        title={<>{t({ uk: 'Ласкаво просимо в', ru: 'Добро пожаловать в', en: 'Welcome to' })} <em>Murly</em></>}
        lead={t({ uk: 'Англійська, яку хочеться вчити. Обери, хто ти, і ми створимо потрібний кабінет.', ru: 'Английский, который хочется учить. Выбери, кто ты, и мы создадим нужный кабинет.', en: 'English you actually want to learn. Tell us who you are and we will set up the right dashboard.' })}
        points={[student[0], teacher[1], student[2]]}
      >
        <h2 className="auth-split__h">{t({ uk: 'Хто ти?', ru: 'Кто ты?', en: 'Who are you?' })}</h2>
        <div className="auth-roles">
          <Link href={keep('student')} className="mu-role mu-role--lime">
            <span className="mu-role__ic"><Icon id="d-kid" /></span>
            <h3>{t({ uk: 'Я учень', ru: 'Я ученик', en: 'I’m a student' })}</h3>
            <span>{t({ uk: 'Домашка, мої слова, ігри і монетки. Код від учителя можна ввести пізніше.', ru: 'Домашка, мои слова, игры и монетки. Код от учителя можно ввести позже.', en: 'Homework, my words, games and coins. You can enter a teacher code later.' })}</span>
          </Link>
          <Link href={keep('teacher')} className="mu-role mu-role--mustard">
            <span className="mu-role__ic"><Icon id="d-team" /></span>
            <h3>{t({ uk: 'Я вчитель', ru: 'Я учитель', en: 'I’m a teacher' })}</h3>
            <span>{t({ uk: 'Учні, розклад, готові уроки, домашка з автоперевіркою.', ru: 'Ученики, расписание, готовые уроки, домашка с автопроверкой.', en: 'Students, schedule, ready lessons, auto-checked homework.' })}</span>
          </Link>
        </div>
        <p className="auth-alt">{t({ uk: 'Уже є акаунт?', ru: 'Уже есть аккаунт?', en: 'Already have an account?' })} <Link href={signIn}>{t({ uk: 'Увійти', ru: 'Войти', en: 'Log in' })}</Link></p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={role === 'student'
        ? <>{t({ uk: 'Твій кабінет', ru: 'Твой кабинет', en: 'Your space' })} <em>{t({ uk: 'у Murly', ru: 'в Murly', en: 'in Murly' })}</em></>
        : <>{t({ uk: 'Кабінет', ru: 'Кабинет', en: 'Teacher' })} <em>{t({ uk: 'вчителя', ru: 'учителя', en: 'dashboard' })}</em></>}
      lead={role === 'student'
        ? t({ uk: 'Домашка, словник від учителя та ігри з твоїми словами.', ru: 'Домашка, словарь от учителя и игры с твоими словами.', en: 'Homework, words from your teacher and games with them.' })
        : t({ uk: 'Учні, розклад, словники і оплати в одному місці.', ru: 'Ученики, расписание, словари и оплаты в одном месте.', en: 'Students, schedule, word lists and payments in one place.' })}
      points={role === 'student' ? student : teacher}
    >
      <SignUp appearance={clerkLook} signInUrl={signIn} forceRedirectUrl={back} fallbackRedirectUrl="/dashboard"
        unsafeMetadata={{ role, plan: searchParams.plan }} />
      <p className="auth-alt"><Link href={keep(role === 'student' ? 'teacher' : 'student')}>{role === 'student'
        ? t({ uk: 'Я вчитель, а не учень', ru: 'Я учитель, а не ученик', en: 'I’m a teacher, not a student' })
        : t({ uk: 'Я учень, а не вчитель', ru: 'Я ученик, а не учитель', en: 'I’m a student, not a teacher' })}</Link></p>
    </AuthShell>
  );
}
