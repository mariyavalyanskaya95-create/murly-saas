'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import { uploadFile } from '@/lib/upload';
import { useT } from '@/components/LangProvider';

// Запис голосової відповіді: записуємо в браузері, завантажуємо в сховище, віддаємо посилання
export default function VoiceRecorder({ value, onChange, readOnly }: { value?: string; onChange?: (url: string) => void; readOnly?: boolean }) {
  const t = useT();
  const [state, setState] = useState<'idle' | 'rec' | 'saving'>('idle');
  const [secs, setSecs] = useState(0);
  const [err, setErr] = useState('');
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); rec.current?.stream.getTracks().forEach((t) => t.stop()); }, []);

  if (readOnly) return value ? <audio controls src={value} className="vr__audio" /> : <span className="t-muted">{t({ uk: 'Немає запису', ru: 'Нет записи', en: 'No recording' })}</span>;

  const start = async () => {
    setErr('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const type = ['audio/webm', 'audio/mp4', 'audio/ogg'].find((t) => MediaRecorder.isTypeSupported(t)) || '';
      const r = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
      chunks.current = [];
      r.ondataavailable = (e) => { if (e.data.size) chunks.current.push(e.data); };
      r.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (timer.current) clearInterval(timer.current);
        const mime = (r.mimeType || 'audio/webm').split(';')[0];
        const blob = new Blob(chunks.current, { type: mime });
        setState('saving');
        const res = await uploadFile(new File([blob], `voice.${mime.split('/')[1]}`, { type: mime }));
        setState('idle');
        if ('url' in res) onChange?.(res.url); else setErr(res.error.includes('Увійди') ? res.error : t({ uk: 'Не вдалося зберегти запис. Увійди в акаунт і спробуй ще раз.', ru: 'Не удалось сохранить запись. Войди в аккаунт и попробуй ещё раз.', en: 'Could not save the recording. Sign in and try again.' }));
      };
      rec.current = r;
      r.start();
      setSecs(0); setState('rec');
      timer.current = setInterval(() => setSecs((s) => { if (s >= 179) { r.stop(); } return s + 1; }), 1000);
    } catch {
      setErr(t({ uk: 'Немає доступу до мікрофона. Дозволь його в браузері.', ru: 'Нет доступа к микрофону. Разреши его в браузере.', en: 'No access to the microphone. Allow it in your browser.' }));
    }
  };

  return (
    <div className="vr">
      {state === 'rec'
        ? <button type="button" className="mu-btn mu-btn--tomato t-btn-sm vr__btn is-rec" onClick={() => rec.current?.stop()}><span className="vr__dot" />{t({ uk: 'Стоп', ru: 'Стоп', en: 'Stop' })} · {Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')}</button>
        : <button type="button" className="mu-btn mu-btn--lime t-btn-sm vr__btn" onClick={start} disabled={state === 'saving'}><Icon id="e-mic" />{state === 'saving' ? t({ uk: 'Зберігаю…', ru: 'Сохраняю…', en: 'Saving…' }) : value ? t({ uk: 'Перезаписати', ru: 'Перезаписать', en: 'Record again' }) : t({ uk: 'Записати відповідь', ru: 'Записать ответ', en: 'Record answer' })}</button>}
      {value && state === 'idle' && <audio controls src={value} className="vr__audio" />}
      {err && <span className="t-neg">{err}</span>}
    </div>
  );
}
