'use client';
// Форма входу учня: номер телефону + PIN від учителя
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { useT } from './LangProvider';

export default function PinLogin() {
  const t = useT();
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || busy) return;
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/pin-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, pin }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ticket) {
        setErr(d.error === 'locked'
          ? t({ uk: 'Забагато спроб. Спробуй знову за 15 хвилин або спитай PIN у вчителя.', ru: 'Слишком много попыток. Попробуй снова через 15 минут или спроси PIN у учителя.', en: 'Too many tries. Try again in 15 minutes or ask your teacher for the PIN.' })
          : t({ uk: 'Номер або PIN не підходять. Перевір і спробуй ще раз.', ru: 'Номер или PIN не подходят. Проверь и попробуй ещё раз.', en: 'The number or PIN is wrong. Check and try again.' }));
        setBusy(false); return;
      }
      const res = await signIn.create({ strategy: 'ticket', ticket: d.ticket });
      if (res.status === 'complete' && res.createdSessionId) { await setActive({ session: res.createdSessionId }); router.push('/student'); return; }
      setErr(t({ uk: 'Не вдалося увійти. Спробуй ще раз.', ru: 'Не удалось войти. Попробуй ещё раз.', en: 'Could not log in. Please try again.' }));
    } catch {
      setErr(t({ uk: 'Не вдалося увійти. Спробуй ще раз.', ru: 'Не удалось войти. Попробуй ещё раз.', en: 'Could not log in. Please try again.' }));
    }
    setBusy(false);
  };

  return (
    <form className="pin-login" onSubmit={submit}>
      <h2>{t({ uk: 'Вхід для учня', ru: 'Вход для ученика', en: 'Student login' })}</h2>
      <p className="t-muted">{t({ uk: 'Введи свій номер телефону і PIN, який дав учитель.', ru: 'Введи свой номер телефона и PIN, который дал учитель.', en: 'Enter your phone number and the PIN from your teacher.' })}</p>
      <label>{t({ uk: 'Номер телефону', ru: 'Номер телефона', en: 'Phone number' })}
        <input type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+380 67 123 45 67" />
      </label>
      <label>PIN
        <input inputMode="numeric" autoComplete="one-time-code" required maxLength={8} value={pin} onChange={(e) => setPin(e.target.value.trim())} placeholder="1234" className="pin-login__pin" />
      </label>
      {err && <p className="t-neg" role="alert">{err}</p>}
      <button type="submit" className="mu-btn mu-btn--lime mu-btn--lg" disabled={busy || !isLoaded}>{busy ? '…' : t({ uk: 'Увійти', ru: 'Войти', en: 'Log in' })}</button>
      <p className="t-muted pin-login__help">{t({ uk: 'Забув PIN? Спитай у свого вчителя, він бачить його у твоїй картці.', ru: 'Забыл PIN? Спроси у своего учителя, он видит его в твоей карточке.', en: 'Forgot your PIN? Ask your teacher, they can see it on your card.' })}</p>
    </form>
  );
}
