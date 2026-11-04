'use client';
// Плашка про cookies: маленька, внизу, з нашим печивом. «Відхилити» вимикає аналітику (GA4 consent mode, Clarity).
import { useEffect, useState } from 'react';
import { useT } from './LangProvider';

const KEY = 'murly:cookies';
type W = Window & { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[]; clarity?: (...a: unknown[]) => void };

function deny() {
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  const gtag = w.gtag || function () { (w.dataLayer as unknown[]).push(arguments); };
  gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  try { w.clarity?.('consent', false); } catch { /* */ }
}

export default function CookieBar() {
  const t = useT();
  const [show, setShow] = useState(false);
  useEffect(() => {
    let v: string | null = null;
    try { v = localStorage.getItem(KEY); } catch { /* */ }
    if (v === 'no') deny();
    if (!v) { const id = setTimeout(() => setShow(true), 1200); return () => clearTimeout(id); }
  }, []);
  if (!show) return null;
  const pick = (v: 'yes' | 'no') => { try { localStorage.setItem(KEY, v); } catch { /* */ } if (v === 'no') deny(); setShow(false); };
  return (
    <div className="mu-cookie" role="dialog" aria-live="polite" aria-label="Cookies">
      <svg className="mu-cookie__ic" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 4a20 20 0 1 0 20 20 6 6 0 0 1-7-6 6 6 0 0 1-6-7 6 6 0 0 1-7-7z" fill="#E7B77A" stroke="#1B2140" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="16" cy="20" r="2.6" fill="#6B4026" /><circle cx="27" cy="31" r="2.6" fill="#6B4026" /><circle cx="15" cy="32" r="2" fill="#6B4026" /><circle cx="33" cy="24" r="1.8" fill="#6B4026" />
        <path d="M21 26c1 1.4 3 1.4 4 0" fill="none" stroke="#1B2140" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>{t({ uk: 'Ми використовуємо cookies. Мур-мур.', ru: 'Мы используем cookies. Мур-мур.', en: 'We use cookies. Purr-purr.' })}</span>
      <button type="button" className="mu-cookie__no" onClick={() => pick('no')}>{t({ uk: 'Відхилити', ru: 'Отклонить', en: 'Reject' })}</button>
      <button type="button" className="mu-cookie__yes" onClick={() => pick('yes')}>{t({ uk: 'Прийняти', ru: 'Принять', en: 'Accept' })}</button>
    </div>
  );
}
