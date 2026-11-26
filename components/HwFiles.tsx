'use client';
// Файли й фото в домашці: показ (картинки одразу, інші файли посиланням) і завантаження
import { useRef, useState } from 'react';
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
export function HwUpload({ onAdd, label, max = 10, count = 0 }: { onAdd: (f: HwFile[]) => void; label?: string; max?: number; count?: number }) {
  const t = useT();
  const inp = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const pick = async (list: FileList | null) => {
    if (!list?.length) return;
    setBusy(true); setErr('');
    const out: HwFile[] = [];
    for (const f of Array.from(list).slice(0, Math.max(0, max - count))) {
      const r = await uploadFile(f);
      if ('error' in r) { setErr(r.error); continue; }
      out.push({ name: f.name.slice(0, 80), url: r.url });
    }
    if (out.length) onAdd(out);
    setBusy(false);
  };
  return (
    <span className="hw-up">
      <button type="button" className="mu-btn t-btn-sm" disabled={busy || count >= max} onClick={() => inp.current?.click()}>
        {busy ? t({ uk: 'Завантажую…', ru: 'Загружаю…', en: 'Uploading…' }) : label ?? t({ uk: '+ Фото або файл', ru: '+ Фото или файл', en: '+ Photo or file' })}
      </button>
      <input ref={inp} type="file" hidden multiple accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,audio/*" onChange={(e) => { void pick(e.target.files); e.target.value = ''; }} />
      {err && <span className="t-neg" style={{ fontSize: 13 }}>{err}</span>}
    </span>
  );
}
