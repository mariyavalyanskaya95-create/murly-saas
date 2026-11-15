'use client';
// Плеєр підвантажується тільки після натискання: сторінка швидка, YouTube не стежить завчасно
import { useState } from 'react';
import { useT } from '@/components/LangProvider';

export default function CartoonPlayer({ channel, name }: { channel: string; name: string }) {
  const t = useT();
  const [on, setOn] = useState(false);
  const list = `UU${channel.slice(2)}`;
  if (on) return (
    <div className="ct-player">
      <iframe src={`https://www.youtube-nocookie.com/embed/videoseries?list=${list}&cc_load_policy=1&cc_lang_pref=en&hl=en&rel=0`} title={name} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
    </div>
  );
  return (
    <button type="button" className="ct-player ct-player--off" onClick={() => setOn(true)} aria-label={`${t({ uk: 'Дивитися', ru: 'Смотреть', en: 'Watch' })}: ${name}`}>
      <span className="ct-play" aria-hidden="true">▶</span>
      <span>{t({ uk: 'Дивитися з офіційного каналу', ru: 'Смотреть с официального канала', en: 'Watch from the official channel' })}</span>
    </button>
  );
}
