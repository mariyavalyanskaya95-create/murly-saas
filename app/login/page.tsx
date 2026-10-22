import Link from 'next/link';
import type { Metadata } from 'next';
import AuthShell from '@/components/AuthShell';
import PinLogin from '@/components/PinLogin';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return { title: t({ uk: 'Вхід для учня за номером | Murly', ru: 'Вход ученика по номеру | Murly', en: 'Student login by phone | Murly' }), robots: { index: false } };
}

export default function LoginPage() {
  const t = tr();
  return (
    <AuthShell
      pinLink={false}
      title={<>{t({ uk: 'Привіт', ru: 'Привет', en: 'Hi there' })}<em>!</em></>}
      lead={t({ uk: 'Без пошти і складних паролів: номер телефону і PIN.', ru: 'Без почты и сложных паролей: номер телефона и PIN.', en: 'No email, no hard passwords: just a phone number and a PIN.' })}
      points={[
        { icon: 'e-pencil', text: t({ uk: 'Домашка і нові слова чекають', ru: 'Домашка и новые слова ждут', en: 'Homework and new words are waiting' }) },
        { icon: 'c-fish', text: t({ uk: 'Монетки для Murly Town', ru: 'Монетки для Murly Town', en: 'Coins for Murly Town' }) },
      ]}
    >
      <PinLogin />
      <p className="pin-login__alt"><Link href="/sign-in">{t({ uk: 'Увійти через пошту або Google', ru: 'Войти через почту или Google', en: 'Log in with email or Google' })}</Link></p>
    </AuthShell>
  );
}
