'use client';
import { useState } from 'react';
import { useTeacher } from '@/lib/teacher-store';
import { useT } from '../LangProvider';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'НМТ'];

export function StudentForm({ onDone }: { onDone?: (id: string) => void }) {
  const t = useT();
  const { addStudent } = useTeacher();
  const [f, setF] = useState({ name: '', level: 'A2', price: '400', contact: '', parent: '', link: '', payMode: 'pre' });
  const [adult, setAdult] = useState(false);
  const [nmt, setNmt] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    const id = addStudent({
      name: f.name.trim(), level: f.level, price: Number(f.price) || 0,
      contact: f.contact.trim() || undefined, parent: f.parent.trim() || undefined, link: f.link.trim() || undefined,
      payMode: f.payMode === 'post' ? 'post' : 'pre',
      adult, nmt: nmt || f.level === 'НМТ',
    });
    setF({ name: '', level: 'A2', price: f.price, contact: '', parent: '', link: '', payMode: f.payMode });
    onDone?.(id);
  };

  return (
    <form className="t-form" onSubmit={submit}>
      <label>{t({ uk: 'Ім’я учня', ru: 'Имя ученика', en: 'Student name' })}<input value={f.name} onChange={set('name')} placeholder={t({ uk: 'Напр. Софія', ru: 'Напр. София', en: 'e.g. Sophia' })} required autoFocus /></label>
      <AudienceToggles adult={adult} nmt={nmt} onAdult={setAdult} onNmt={setNmt} />
      <label>{t({ uk: 'Рівень', ru: 'Уровень', en: 'Level' })}<select value={f.level} onChange={set('level')}>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select></label>
      <label>{t({ uk: 'Ціна заняття, ₴', ru: 'Цена занятия, ₴', en: 'Price per lesson, ₴' })}<input type="number" min="0" step="10" value={f.price} onChange={set('price')} /></label>
      <label>{t({ uk: 'Як платить', ru: 'Как платит', en: 'How they pay' })}<select value={f.payMode} onChange={set('payMode')}>
        <option value="pre">{t({ uk: 'Наперед (пакетом)', ru: 'Заранее (пакетом)', en: 'In advance (pack)' })}</option>
        <option value="post">{t({ uk: 'Після занять', ru: 'После занятий', en: 'After lessons' })}</option>
      </select></label>
      <label>{t({ uk: 'Контакт учня', ru: 'Контакт ученика', en: 'Student contact' })}<input value={f.contact} onChange={set('contact')} placeholder={t({ uk: 'Telegram або телефон', ru: 'Telegram или телефон', en: 'Telegram or phone' })} /></label>
      <label>{t({ uk: 'Контакт батьків', ru: 'Контакт родителей', en: 'Parent contact' })}<input value={f.parent} onChange={set('parent')} placeholder={t({ uk: 'Для дітей і підлітків', ru: 'Для детей и подростков', en: 'For kids and teens' })} /></label>
      <label className="t-form__wide">{t({ uk: 'Посилання на дзвінок для цього учня', ru: 'Ссылка на звонок для этого ученика', en: 'Call link for this student' })}<input value={f.link} onChange={set('link')} placeholder={t({ uk: 'Якщо порожньо, візьмемо твоє посилання з налаштувань', ru: 'Если пусто, возьмём твою ссылку из настроек', en: 'If empty, we will use your link from Settings' })} /></label>
      <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Додати учня', ru: 'Добавить ученика', en: 'Add student' })}</button></div>
    </form>
  );
}

function toLocalInput(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function LessonForm({ studentId, onDone }: { studentId?: string; onDone?: () => void }) {
  const t = useT();
  const { data, addLessons } = useTeacher();
  const next = new Date(); next.setHours(next.getHours() + 1, 0, 0, 0);
  const [f, setF] = useState({ studentId: studentId ?? data.students[0]?.id ?? '', start: toLocalInput(next), duration: '60', repeat: '1', topic: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  if (!data.students.length) return <p className="t-empty">{t({ uk: 'Спочатку додай учня, а потім плануй заняття.', ru: 'Сначала добавь ученика, а потом планируй занятия.', en: 'Add a student first, then plan lessons.' })}</p>;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.studentId) return;
    addLessons({ studentId: f.studentId, start: new Date(f.start).toISOString(), duration: Number(f.duration) || 60, topic: f.topic.trim() || undefined }, Number(f.repeat));
    onDone?.();
  };

  return (
    <form className="t-form" onSubmit={submit}>
      {!studentId && (
        <label>{t({ uk: 'Учень', ru: 'Ученик', en: 'Student' })}<select value={f.studentId} onChange={set('studentId')}>
          {data.students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select></label>
      )}
      <label>{t({ uk: 'Дата і час', ru: 'Дата и время', en: 'Date and time' })}<input type="datetime-local" value={f.start} onChange={set('start')} required /></label>
      <label>{t({ uk: 'Тривалість', ru: 'Длительность', en: 'Duration' })}<select value={f.duration} onChange={set('duration')}>
        {['30', '45', '60', '90'].map((m) => <option key={m} value={m}>{m} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</option>)}
      </select></label>
      <label>{t({ uk: 'Повторювати', ru: 'Повторять', en: 'Repeat' })}<select value={f.repeat} onChange={set('repeat')}>
        <option value="1">{t({ uk: 'Один раз', ru: 'Один раз', en: 'Once' })}</option>
        <option value="4">{t({ uk: 'Щотижня, 4 тижні', ru: 'Еженедельно, 4 недели', en: 'Weekly, 4 weeks' })}</option>
        <option value="8">{t({ uk: 'Щотижня, 8 тижнів', ru: 'Еженедельно, 8 недель', en: 'Weekly, 8 weeks' })}</option>
        <option value="12">{t({ uk: 'Щотижня, 12 тижнів', ru: 'Еженедельно, 12 недель', en: 'Weekly, 12 weeks' })}</option>
      </select></label>
      <label className="t-form__wide">{t({ uk: 'Тема (необов’язково)', ru: 'Тема (необязательно)', en: 'Topic (optional)' })}<input value={f.topic} onChange={set('topic')} placeholder={t({ uk: 'Напр. Present Perfect, Unit 5', ru: 'Напр. Present Perfect, Unit 5', en: 'e.g. Present Perfect, Unit 5' })} /></label>
      <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Запланувати', ru: 'Запланировать', en: 'Schedule' })}</button></div>
    </form>
  );
}

// Хто учень: дитина (з монетками) чи дорослий (без них), і чи показувати НМТ
export function AudienceToggles({ adult, nmt, onAdult, onNmt }: { adult: boolean; nmt: boolean; onAdult: (v: boolean) => void; onNmt: (v: boolean) => void }) {
  const t = useT();
  return (
    <div className="t-form__wide t-aud">
      <div className="g-chips" role="group" aria-label={t({ uk: 'Хто учень', ru: 'Кто ученик', en: 'Who is the student' })} style={{ justifyContent: 'flex-start' }}>
        <button type="button" className={`g-chip ${!adult ? 'is-on' : ''}`} aria-pressed={!adult} onClick={() => onAdult(false)}>{t({ uk: 'Дитина / підліток', ru: 'Ребёнок / подросток', en: 'Kid / teen' })}</button>
        <button type="button" className={`g-chip ${adult ? 'is-on' : ''}`} aria-pressed={adult} onClick={() => onAdult(true)}>{t({ uk: 'Дорослий', ru: 'Взрослый', en: 'Adult' })}</button>
        <button type="button" className={`g-chip ${nmt ? 'is-on' : ''}`} aria-pressed={nmt} onClick={() => onNmt(!nmt)}>{nmt ? '✓ ' : ''}{t({ uk: 'Готується до НМТ', ru: 'Готовится к НМТ', en: 'Preparing for NMT' })}</button>
      </div>
      <small className="t-muted">{adult ? t({ uk: 'Дорослим не показуємо монетки й Murly Town.', ru: 'Взрослым не показываем монетки и Murly Town.', en: 'Adults do not see coins or Murly Town.' }) : t({ uk: 'Дітям нараховуються монетки за уроки, домашку й слова.', ru: 'Детям начисляются монетки за уроки, домашку и слова.', en: 'Kids earn coins for lessons, homework and words.' })} {nmt ? '' : t({ uk: 'Пробні НМТ учень не бачить, поки не позначиш «Готується до НМТ».', ru: 'Пробные НМТ ученик не видит, пока не отметишь «Готовится к НМТ».', en: 'Mock NMT tests stay hidden until you tick “Preparing for NMT”.' })}</small>
    </div>
  );
}
