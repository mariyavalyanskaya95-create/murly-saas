'use client';
// Форма входу учня: номер телефону + PIN від учителя
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClerk, useSignIn } from '@clerk/nextjs';
import { useT } from './LangProvider';

export default function PinLogin() {
  const t = useT();
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const clerk = useClerk();
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
      // у браузері вже може бути інший вхід (вчитель, старий акаунт): виходимо і пробуємо ще раз
      const tryTicket = async (ticket: string) => {
        const res = await signIn.create({ strategy: 'ticket', ticket });
        if (res.status === 'complete' && res.createdSessionId) { await setActive({ session: res.createdSessionId }); window.location.href = '/student'; return true; }
        return false;
      };
      try {
        if (await tryTicket(d.ticket)) return;
      } catch (e1) {
        const code = (e1 as { errors?: { code?: string }[] })?.errors?.[0]?.code || '';
        if (code === 'session_exists' || code === 'identifier_already_signed_in') {
          await clerk.signOut().catch(() => null);
          const r2 = await fetch('/api/pin-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, pin }) });
          const d2 = await r2.json().catch(() => ({}));
          if (d2.ticket && await tryTicket(d2.ticket).catch(() => false)) return;
        }
        throw e1;
      }
      setErr(t({ uk: 'Не вдалося увійти. Спробуй ще раз.', ru: 'Не удалось войти. Попробуй ещё раз.', en: 'Could not log in. Please try again.' }));
    } catch (e) {
      const code = (e as { errors?: { code?: string }[] })?.errors?.[0]?.code || (e instanceof Error ? e.message.slice(0, 60) : '');
      const inApp = /Telegram|Instagram|FBAN|FBAV|Line\//i.test(navigator.userAgent);
      setErr(t({
        uk: `Не вдалося увійти.${inApp ? ' Відкрий сайт у Safari або Chrome (меню «...» → «Відкрити в браузері»).' : ' Спробуй ще раз.'}${code ? ` Код: ${code}` : ''}`,
        ru: `Не удалось войти.${inApp ? ' Открой сайт в Safari или Chrome (меню «...» → «Открыть в браузере»).' : ' Попробуй ещё раз.'}${code ? ` Код: ${code}` : ''}`,
        en: `Could not log in.${inApp ? ' Open the site in Safari or Chrome (menu “...” → “Open in browser”).' : ' Please try again.'}${code ? ` Code: ${code}` : ''}`,
      }));
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
