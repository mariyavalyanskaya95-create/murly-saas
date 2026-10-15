'use client';
// «Є код від учителя?» — учень вводить код або вставляє посилання і переходить до запрошення
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';

export default function JoinCode() {
  const [v, setV] = useState('');
  const [bad, setBad] = useState(false);
  const router = useRouter();
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = v.trim();
    const code = (raw.match(/join\/([a-z0-9-]+)/i)?.[1] ?? raw).toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (code.length < 4) { setBad(true); return; }
    router.push(`/join/${code}`);
  };
  return (
    <form className="mu-join" onSubmit={go}>
      <label htmlFor="mu-join-code">Є код або посилання від учителя?</label>
      <div className="mu-join__row">
        <input id="mu-join-code" value={v} onChange={(e) => { setV(e.target.value); setBad(false); }} placeholder="Наприклад: k7m2qpx4" autoComplete="off" spellCheck={false} aria-invalid={bad} aria-describedby={bad ? 'mu-join-err' : undefined} />
        <button className="mu-btn mu-btn--lime" type="submit">Приєднатися<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></button>
      </div>
      {bad && <p id="mu-join-err" className="mu-join__err" role="alert">Перевір код: його дає вчитель, у ньому 8 літер і цифр.</p>}
    </form>
  );
}
