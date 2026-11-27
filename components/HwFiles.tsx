'use client';
// Файли й фото в домашці: показ (картинки одразу, інші файли посиланням) і завантаження
import { useEffect, useRef, useState } from 'react';
import { uploadFile } from '@/lib/upload';
import { useT } from './LangProvider';

export type HwFile = { name: string; url: string };
const isImg = (f: HwFile) => /\.(png|jpe?g|webp|gif)(\?|$)/i.test(f.url) || /\.(png|jpe?g|webp|gif)$/i.test(f.name);

export function HwFileList({ files, onRemove }: { files?: HwFile[]; onRemove?: (i: number) => void }) {
  if (!files?.length) return null;
  return (
    <div className="hw-files">
      {files.map((f, i) => (
        <div key={f.url + i} className={`hw-file ${isImg(f) ? 'is-img' : ''}`}>
          {isImg(f) ? <a href={f.url} target="_blank" rel="noopener"><img src={f.url} alt={f.name} loading="lazy" /></a>
            : <a href={f.url} target="_blank" rel="noopener" className="hw-file__doc">{f.name}</a>}
          {onRemove && <button type="button" className="hw-file__x" onClick={() => onRemove(i)} aria-label="Remove">✕</button>}
        </div>
      ))}
    </div>
  );
}

// Кнопка «+ Фото або файл»: на телефоні одразу пропонує камеру
export function HwUpload({ onAdd, label, max = 10, count = 0, paste = false }: { onAdd: (f: HwFile[]) => void; label?: string; max?: number; count?: number; paste?: boolean }) {
  const t = useT();
  const inp = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [over, setOver] = useState(false);
  const countRef = useRef(count); countRef.current = count;
  const pick = async (list: FileList | File[] | null) => {
    const arr = list ? Array.from(list) : [];
    if (!arr.length) return;
    setBusy(true); setErr('');
    const out: HwFile[] = [];
    for (const f0 of arr.slice(0, Math.max(0, max - countRef.current))) {
      // скрін із буфера приходить як image.png без імені: даємо зрозуміле ім'я
      const f = !f0.name || f0.name === 'image.png' ? new File([f0], `screenshot-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')}.png`, { type: f0.type || 'image/png' }) : f0;
      if (/heic|heif/i.test(f.type) || /\.hei[cf]$/i.test(f.name)) { setErr(t({ uk: 'Фото у форматі HEIC не відкривається в браузері. Зроби скрін або збережи фото як JPG.', ru: 'Фото в формате HEIC не открывается в браузере. Сделай скрин или сохрани фото как JPG.', en: 'HEIC photos do not open in browsers. Take a screenshot or save the photo as JPG.' })); continue; }
      const r = await uploadFile(f);
      if ('error' in r) { setErr(r.error); continue; }
      out.push({ name: f.name.slice(0, 80), url: r.url });
    }
    if (out.length) onAdd(out);
    setBusy(false);
  };
  // вставка скріна з буфера (Ctrl+V / Cmd+V) будь-де на сторінці
  useEffect(() => {
    if (!paste) return;
    const on = (e: ClipboardEvent) => {
      if (e.defaultPrevented) return;
      const fl = Array.from(e.clipboardData?.files ?? []);
      if (!fl.length) return;
      e.preventDefault(); void pick(fl);
    };
    document.addEventListener('paste', on);
    return () => document.removeEventListener('paste', on);
  }, [paste]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <span className={`hw-up ${over ? 'is-over' : ''}`}
      onDragOver={(e) => { if (e.dataTransfer.types.includes('Files')) { e.preventDefault(); setOver(true); } }}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOver(false); }}
      onDrop={(e) => { if (e.dataTransfer.files.length) { e.preventDefault(); setOver(false); void pick(e.dataTransfer.files); } }}>
      <button type="button" className="mu-btn t-btn-sm" disabled={busy || count >= max} onClick={() => inp.current?.click()}>
        {busy ? t({ uk: 'Завантажую…', ru: 'Загружаю…', en: 'Uploading…' }) : label ?? t({ uk: '+ Фото або файл', ru: '+ Фото или файл', en: '+ Photo or file' })}
      </button>
      <span className="hw-up__hint">{t({ uk: 'або перетягни сюди', ru: 'или перетащи сюда', en: 'or drop it here' })}{paste ? t({ uk: ', або встав скрін: Ctrl+V', ru: ', или вставь скрин: Ctrl+V', en: ', or paste a screenshot: Ctrl+V' }) : ''}</span>
      <input ref={inp} type="file" hidden multiple accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,audio/*" onChange={(e) => { void pick(e.target.files); e.target.value = ''; }} />
      {err && <span className="t-neg" style={{ fontSize: 13 }}>{err}</span>}
    </span>
  );
}
