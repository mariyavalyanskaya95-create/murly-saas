'use client';
// Пробний місяць (лічильник), «Запроси колегу» і форма «Чого не вистачає?»
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from '../Icon';
import { useT } from '../LangProvider';

type G = { paid: boolean; daysLeft: number | null; refCode?: string; invited?: number };
let cache: Promise<G> | null = null;
const load = () => (cache ??= fetch('/api/growth').then((r) => r.json()).catch(() => ({ paid: false, daysLeft: null })));

export function useGrowth() {
  const [g, setG] = useState<G | null>(null);
  useEffect(() => { load().then(setG); }, []);
  return g;
}

// Лічильник показуємо тільки коли оплати увімкнено (після ФОП)
export function TrialPill() {
  const t = useT(); const g = useGrowth();
  if (!g?.paid || g.daysLeft == null) return null;
  const n = g.daysLeft;
  return (
    <a href="/pricing" className={`t-trial ${n <= 5 ? 'is-end' : ''}`}>
      {n > 0
        ? t({ uk: `Залишилось ${n} дн. безкоштовного місяця`, ru: `Осталось ${n} дн. бесплатного месяца`, en: `${n} days of your free month left` })
        : t({ uk: 'Безкоштовний місяць завершився', ru: 'Бесплатный месяц закончился', en: 'Your free month has ended' })}
    </a>
  );
}

export function InviteCard() {
  const t = useT(); const g = useGrowth();
  const [copied, setCopied] = useState(false);
  if (!g?.refCode) return null;
  const url = `${typeof window !== 'undefined' ? window.location.origin : 'https://murly.com.ua'}/r/${g.refCode}`;
  const copy = async () => { try { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch { /* */ } };
  return (
    <section className="t-card t-refer">
      <h2><Icon id="d-team" />{t({ uk: 'Запроси колегу', ru: 'Пригласи коллегу', en: 'Invite a colleague' })}</h2>
      <p className="t-muted">{t({ uk: 'Коли вчитель за твоїм посиланням оформить Pro, ви обоє отримаєте ще місяць безкоштовно.', ru: 'Когда учитель по твоей ссылке оформит Pro, вы оба получите ещё месяц бесплатно.', en: 'When a teacher who joins via your link gets Pro, you both get another month free.' })}</p>
      <div className="t-refer__row">
        <input readOnly value={url} onFocus={(e) => e.currentTarget.select()} aria-label={t({ uk: 'Твоє посилання', ru: 'Твоя ссылка', en: 'Your link' })} />
        <button type="button" className="mu-btn mu-btn--lime" onClick={copy}>{copied ? t({ uk: 'Скопійовано', ru: 'Скопировано', en: 'Copied' }) : t({ uk: 'Копіювати', ru: 'Копировать', en: 'Copy' })}</button>
      </div>
      {g.invited ? <small className="t-muted">{t({ uk: `Приєдналися за посиланням: ${g.invited}`, ru: `Присоединились по ссылке: ${g.invited}`, en: `Joined via your link: ${g.invited}` })}</small> : null}
    </section>
  );
}

export function FeedbackButton({ name }: { name: string }) {
  const t = useT(); const path = usePathname();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open]);
  const send = async () => {
    if (text.trim().length < 2) return;
    setState('sending');
    const r = await fetch('/api/growth', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, page: path, name }) }).catch(() => null);
    if (r?.ok) { setState('sent'); setText(''); } else setState('error');
  };
  return (
    <>
      <button type="button" className="t-side__link t-side__extra t-fb-btn" onClick={() => { setOpen(true); setState('idle'); }}>
        <Icon id="d-chat" />{t({ uk: 'Чого не вистачає?', ru: 'Чего не хватает?', en: 'What’s missing?' })}
      </button>
      {open && (
        <div className="t-fb" role="dialog" aria-modal="true" aria-labelledby="t-fb-title" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="t-fb__box">
            <h2 id="t-fb-title">{t({ uk: 'Чого не вистачає?', ru: 'Чего не хватает?', en: 'What’s missing?' })}</h2>
            {state === 'sent' ? (
              <>
                <p>{t({ uk: 'Дякуємо! Ми прочитаємо кожне слово.', ru: 'Спасибо! Мы прочитаем каждое слово.', en: 'Thank you! We read every word.' })}</p>
                <div className="t-fb__actions"><button type="button" className="mu-btn mu-btn--ink" onClick={() => setOpen(false)}>{t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}</button></div>
              </>
            ) : (
              <>
                <p className="t-muted">{t({ uk: 'Що б зробило Murly зручнішим для твоїх уроків? Пиши як є, навіть дрібниці.', ru: 'Что сделало бы Murly удобнее для твоих уроков? Пиши как есть, даже мелочи.', en: 'What would make Murly better for your lessons? Tell us anything, even small things.' })}</p>
                <p className="t-muted" style={{ fontSize: 13 }}>{t({ uk: 'Ми бачимо твоє ім’я і пошту, щоб відповісти.', ru: 'Мы видим твоё имя и почту, чтобы ответить.', en: 'We see your name and email so we can reply.' })}</p>
                <textarea autoFocus rows={5} value={text} onChange={(e) => setText(e.target.value)} maxLength={2000}
                  placeholder={t({ uk: 'Наприклад: хочу вправи на Present Perfect для дорослих', ru: 'Например: хочу упражнения на Present Perfect для взрослых', en: 'For example: I want Present Perfect exercises for adults' })} />
                {state === 'error' && <p className="t-fb__err">{t({ uk: 'Не вдалося надіслати. Спробуй ще раз.', ru: 'Не удалось отправить. Попробуй ещё раз.', en: 'Could not send. Please try again.' })}</p>}
                <div className="t-fb__actions">
                  <button type="button" className="mu-btn" onClick={() => setOpen(false)}>{t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' })}</button>
                  <button type="button" className="mu-btn mu-btn--ink" onClick={send} disabled={state === 'sending' || text.trim().length < 2}>
                    {state === 'sending' ? t({ uk: 'Надсилаю…', ru: 'Отправляю…', en: 'Sending…' }) : t({ uk: 'Надіслати', ru: 'Отправить', en: 'Send' })}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
