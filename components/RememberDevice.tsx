'use client';
// Учень увійшов будь-яким способом: запам'ятовуємо пристрій, щоб наступного разу входити однією кнопкою
import { useEffect } from 'react';

export default function RememberDevice() {
  useEffect(() => {
    if (/(?:^|; )murly_me=/.test(document.cookie)) return;
    fetch('/api/device-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'remember' }) }).catch(() => {});
  }, []);
  return null;
}
