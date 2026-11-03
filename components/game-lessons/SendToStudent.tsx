'use client';
// Учитель надсилає урок учню: урок з'являється в кабінеті учня в «Матеріалах з уроків».
import { useEffect, useState } from 'react';
import { useT } from '../LangProvider';

type St = { id: string; name: string; archived?: boolean };

export default function SendToStudent({ url, name }: { url: string; name: string }) {
  const t = useT();
  const [students, setStudents] = useState<St[] | null>(null);
  const [open, setOpen] = useState(false);
  const [sid, setSid] = useState('');
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (!open || students) return;
    fetch('/api/teacher').then((r) => (r.ok ? r.json() : null)).then((d) => {
      const list: St[] = (d?.students ?? []).filter((s: St) => !s.archived);
      setStudents(list); if (list[0]) setSid(list[0].id);
    }).catch(() => setStudents([]));
  }, [open, students]);

  const send = async () => {
    if (!sid) return;
    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now());
    const r = await fetch('/api/teacher', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ op: 'addNote', p: { id, studentId: sid, text: name, at: new Date().toISOString(), files: [{ url, name }] } }) });
    setMsg(r.ok ? t({ uk: 'Надіслано! Урок у кабінеті учня.', ru: 'Отправлено! Урок в кабинете ученика.', en: 'Sent! The lesson is in the student’s account.' }) : t({ uk: 'Не вийшло, спробуй ще раз.', ru: 'Не получилось, попробуй ещё раз.', en: 'Something went wrong, try again.' }));
  };

  if (!open) return <button type="button" className="mu-btn" onClick={() => setOpen(true)}>{t({ uk: 'Надіслати учню', ru: 'Отправить ученику', en: 'Send to a student' })}</button>;
  if (!students) return <span className="t-muted">…</span>;
  if (!students.length) return <a className="mu-btn" href="/sign-in">{t({ uk: 'Увійди як учитель', ru: 'Войди как учитель', en: 'Sign in as a teacher' })}</a>;
  return (
    <span className="gl-send">
      <select value={sid} onChange={(e) => { setSid(e.target.value); setMsg(''); }} aria-label={t({ uk: 'Учень', ru: 'Ученик', en: 'Student' })}>
        {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <button type="button" className="mu-btn mu-btn--lime" onClick={send}>{t({ uk: 'Надіслати', ru: 'Отправить', en: 'Send' })}</button>
      {msg && <span className="t-pos" role="status">{msg}</span>}
    </span>
  );
}
