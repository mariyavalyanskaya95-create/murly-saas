'use client';
// «З поверненням, Міша!»: на запам'ятованому пристрої учень входить однією кнопкою, без номера і PIN
import { useEffect, useState } from 'react';
import { useClerk, useSignIn } from '@clerk/nextjs';
import { useT } from './LangProvider';

const readMe = () => { const m = document.cookie.match(/(?:^|; )murly_me=([^;]+)/); try { return m ? decodeURIComponent(decodeURIComponent(m[1])) : ''; } catch { return ''; } };

export default function RememberedLogin() {
  const t = useT();
  const { signIn, setActive, isLoaded } = useSignIn();
  const clerk = useClerk();
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  useEffect(() => { setName(readMe()); }, []);
  if (!name) return null;

  const go = async () => {
    if (!isLoaded || busy) return;
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/device-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'login' }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ticket) { setName(''); setBusy(false); return; }
      const once = async () => { const res = await signIn.create({ strategy: 'ticket', ticket: d.ticket }); if (res.status === 'complete' && res.createdSessionId) { await setActive({ session: res.createdSessionId }); window.location.href = '/student'; return true; } return false; };
      try { if (await once()) return; } catch (e1) {
        const code = (e1 as { errors?: { code?: string }[] })?.errors?.[0]?.code || '';
        if (code === 'session_exists' || code === 'identifier_already_signed_in') { window.location.href = '/student'; return; }
        throw e1;
      }
    } catch { setErr(t({ uk: 'Не вдалося увійти. Введи номер і PIN нижче.', ru: 'Не удалось войти. Введи номер и PIN ниже.', en: 'Could not log in. Use your phone and PIN below.' })); }
    setBusy(false);
  };
  const forget = async () => { await fetch('/api/device-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'forget' }) }).catch(() => null); setName(''); void clerk; };

  return (
    <div className="remember-card">
      <p className="remember-card__hi">{t({ uk: `З поверненням, ${name}!`, ru: `С возвращением, ${name}!`, en: `Welcome back, ${name}!` })}</p>
      <button type="button" className="mu-btn mu-btn--lime remember-card__go" onClick={go} disabled={busy}>{busy ? '…' : t({ uk: `Увійти як ${name}`, ru: `Войти как ${name}`, en: `Log in as ${name}` })}</button>
      <button type="button" className="remember-card__not" onClick={forget}>{t({ uk: 'Це не я, увійти інакше', ru: 'Это не я, войти иначе', en: 'Not me, log in another way' })}</button>
      {err && <p className="t-neg" style={{ fontSize: 13 }}>{err}</p>}
    </div>
  );
}
