'use client';
import { useState } from 'react';
import { useTeacher } from '@/lib/teacher-store';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'НМТ'];

export function StudentForm({ onDone }: { onDone?: (id: string) => void }) {
  const { addStudent } = useTeacher();
  const [f, setF] = useState({ name: '', level: 'A2', price: '400', contact: '', parent: '', link: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    const id = addStudent({
      name: f.name.trim(), level: f.level, price: Number(f.price) || 0,
      contact: f.contact.trim() || undefined, parent: f.parent.trim() || undefined, link: f.link.trim() || undefined,
    });
    setF({ name: '', level: 'A2', price: f.price, contact: '', parent: '', link: '' });
    onDone?.(id);
  };

  return (
    <form className="t-form" onSubmit={submit}>
      <label>Ім’я учня<input value={f.name} onChange={set('name')} placeholder="Напр. Софія" required autoFocus /></label>
      <label>Рівень<select value={f.level} onChange={set('level')}>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select></label>
      <label>Ціна заняття, ₴<input type="number" min="0" step="10" value={f.price} onChange={set('price')} /></label>
      <label>Контакт учня<input value={f.contact} onChange={set('contact')} placeholder="Telegram або телефон" /></label>
      <label>Контакт батьків<input value={f.parent} onChange={set('parent')} placeholder="Для дітей і підлітків" /></label>
      <label className="t-form__wide">Посилання на дзвінок для цього учня<input value={f.link} onChange={set('link')} placeholder="Якщо порожньо, візьмемо твоє посилання з налаштувань" /></label>
      <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit">Додати учня</button></div>
    </form>
  );
}

function toLocalInput(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function LessonForm({ studentId, onDone }: { studentId?: string; onDone?: () => void }) {
  const { data, addLessons } = useTeacher();
  const next = new Date(); next.setHours(next.getHours() + 1, 0, 0, 0);
  const [f, setF] = useState({ studentId: studentId ?? data.students[0]?.id ?? '', start: toLocalInput(next), duration: '60', repeat: '1', topic: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  if (!data.students.length) return <p className="t-empty">Спочатку додай учня, а потім плануй заняття.</p>;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.studentId) return;
    addLessons({ studentId: f.studentId, start: new Date(f.start).toISOString(), duration: Number(f.duration) || 60, topic: f.topic.trim() || undefined }, Number(f.repeat));
    onDone?.();
  };

  return (
    <form className="t-form" onSubmit={submit}>
      {!studentId && (
        <label>Учень<select value={f.studentId} onChange={set('studentId')}>
          {data.students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select></label>
      )}
      <label>Дата і час<input type="datetime-local" value={f.start} onChange={set('start')} required /></label>
      <label>Тривалість<select value={f.duration} onChange={set('duration')}>
        {['30', '45', '60', '90'].map((m) => <option key={m} value={m}>{m} хв</option>)}
      </select></label>
      <label>Повторювати<select value={f.repeat} onChange={set('repeat')}>
        <option value="1">Один раз</option>
        <option value="4">Щотижня, 4 тижні</option>
        <option value="8">Щотижня, 8 тижнів</option>
        <option value="12">Щотижня, 12 тижнів</option>
      </select></label>
      <label className="t-form__wide">Тема (необов’язково)<input value={f.topic} onChange={set('topic')} placeholder="Напр. Present Perfect, Unit 5" /></label>
      <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit">Запланувати</button></div>
    </form>
  );
}
