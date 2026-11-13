'use client';
import { useEffect, useState } from 'react';
import { DEFAULT_TZ, TZS, tzLabel } from '@/lib/tz';
import { useT } from '@/components/LangProvider';

// Вибір часового поясу: список країн + пояс, який визначив браузер (якщо його немає в списку)
export default function TzSelect({ value, onChange, id }: { value?: string; onChange: (tz: string) => void; id?: string }) {
  const t = useT();
  const lang = t.lang === 'ru' || t.lang === 'en' ? t.lang : 'uk';
  const cur = value || DEFAULT_TZ;
  const [now, setNow] = useState('');
  useEffect(() => {
    const f = () => { try { setNow(new Date().toLocaleTimeString(lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'uk-UA', { hour: '2-digit', minute: '2-digit', timeZone: cur })); } catch { setNow(''); } };
    f(); const i = setInterval(f, 30000); return () => clearInterval(i);
  }, [cur, lang]);
  const list = TZS.some((x) => x.id === cur) ? TZS : [{ id: cur, label: { uk: tzLabel(cur), ru: tzLabel(cur), en: tzLabel(cur) } }, ...TZS];
  return (
    <span className="tz-select">
      <select id={id} value={cur} onChange={(e) => onChange(e.target.value)}>
        {list.map((z) => <option key={z.id} value={z.id}>{z.label[lang]}</option>)}
      </select>
      {now && <small className="t-muted"> {t({ uk: 'зараз там', ru: 'сейчас там', en: 'now there' })} {now}</small>}
    </span>
  );
}

// Пояс браузера (для автозаповнення)
export const browserTz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TZ; } catch { return DEFAULT_TZ; } };
