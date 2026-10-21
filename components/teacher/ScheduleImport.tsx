'use client';
// Розклад списком або зі скріну/фото: текст розбираємо самі, фото спершу розпізнаємо (Tesseract.js у браузері).
import { useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { useTeacher } from '@/lib/teacher-store';
import { parseSchedule, type ParsedRow } from '@/lib/schedule-parse';
import { useT } from '@/components/LangProvider';

type Tess = { recognize: (img: File, langs: string, opts?: { logger?: (m: { status: string; progress: number }) => void }) => Promise<{ data: { text: string } }> };
declare global { interface Window { Tesseract?: Tess } }

function loadTesseract(): Promise<Tess> {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  return new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    s.onload = () => (window.Tesseract ? ok(window.Tesseract) : fail(new Error('no tesseract')));
    s.onerror = () => fail(new Error('load'));
    document.head.appendChild(s);
  });
}

export default function ScheduleImport({ onDone }: { onDone?: () => void }) {
  const t = useT();
  const { data, addLessons } = useTeacher();
  const [text, setText] = useState('');
  const [rows, setRows] = useState<ParsedRow[] | null>(null);
  const [weeks, setWeeks] = useState(4);
  const [ocr, setOcr] = useState('');
  const [err, setErr] = useState('');
  const file = useRef<HTMLInputElement>(null);
  const students = data.students.map((s) => ({ id: s.id, name: s.name }));

  const readImage = async (f: File) => {
    setErr(''); setOcr(t({ uk: 'Розпізнаю скрін…', ru: 'Распознаю скрин…', en: 'Reading the image…' }));
    try {
      const T = await loadTesseract();
      const r = await T.recognize(f, 'ukr+rus+eng', { logger: (m) => { if (m.status === 'recognizing text') setOcr(`${t({ uk: 'Розпізнаю', ru: 'Распознаю', en: 'Reading' })} ${Math.round(m.progress * 100)}%`); } });
      const txt = r.data.text.split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
      setText((x) => (x ? `${x}\n${txt}` : txt));
      setOcr('');
      setRows(parseSchedule(txt, students));
    } catch {
      setOcr(''); setErr(t({ uk: 'Не вдалося розпізнати скрін. Спробуй чіткіше фото або впиши списком.', ru: 'Не удалось распознать скрин. Попробуй более чёткое фото или впиши списком.', en: 'Could not read the image. Try a clearer photo or type the list.' }));
    }
  };
  const set = (i: number, p: Partial<ParsedRow>) => setRows((rs) => rs && rs.map((r, j) => { if (j !== i) return r; const n = { ...r, ...p }; return { ...n, ok: Boolean(n.studentId && n.date && n.time) }; }));
  const ready = (rows ?? []).filter((r) => r.ok);
  const add = () => {
    for (const r of ready) addLessons({ studentId: r.studentId, start: new Date(`${r.date}T${r.time}:00`).toISOString(), duration: r.duration }, r.weekly ? weeks : 1);
    setRows(null); setText(''); onDone?.();
  };

  return (
    <div className="t-imp">
      <p className="t-muted">{t({ uk: 'Напиши розклад списком, по одному заняттю в рядку, або завантаж скрін чи фото розкладу. Приклади: «Пн 16:00 Аня», «вт 18:30-19:30 Поліна», «24.10 17:00 Віка 45 хв», «щосереди 15:00 Yeva», «вт, пт 15:00 Олег» (кілька днів одразу).', ru: 'Напиши расписание списком, по одному занятию в строке, или загрузи скрин или фото расписания. Примеры: «Пн 16:00 Аня», «вт 18:30-19:30 Полина», «24.10 17:00 Вика 45 мин», «каждую среду 15:00 Yeva», «вторник пятница 15:00 Олег» (несколько дней сразу).', en: 'Type the schedule as a list, one lesson per line, or upload a screenshot or photo. Examples: “Mon 16:00 Anna”, “Tue 18:30-19:30 Polina”, “24.10 17:00 Vika 45 min”, “every Wed 15:00 Yeva”, “Tue, Fri 15:00 Oleg” (several days at once).' })}</p>
      <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)}
        onPaste={(e) => { const img = Array.from(e.clipboardData.files || []).find((f) => f.type.startsWith('image/')); if (img) { e.preventDefault(); readImage(img); } }}
        placeholder={'Пн 16:00 Аня\nвт 18:30 Полина\nщосереди 15:00 Yeva'} />
      <div className="t-head__actions" style={{ flexWrap: 'wrap' }}>
        <button type="button" className="mu-btn mu-btn--lime t-btn-sm" disabled={!text.trim()} onClick={() => setRows(parseSchedule(text, students))}>{t({ uk: 'Розібрати', ru: 'Разобрать', en: 'Parse' })}</button>
        <input ref={file} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) readImage(f); e.target.value = ''; }} />
        <button type="button" className="mu-btn t-btn-sm" onClick={() => file.current?.click()} disabled={Boolean(ocr)}><Icon id="d-camera" />{t({ uk: 'Скрін або фото', ru: 'Скрин или фото', en: 'Screenshot or photo' })}</button>
        {ocr && <span className="t-muted">{ocr}</span>}
        {err && <span className="t-neg">{err}</span>}
      </div>

      {rows && (
        <div className="t-imp__rows">
          {rows.length === 0 && <p className="t-muted">{t({ uk: 'Не знайшла жодного заняття.', ru: 'Не нашла ни одного занятия.', en: 'No lessons found.' })}</p>}
          {rows.map((r, i) => (
            <div key={i} className={`t-imp__row ${r.ok ? '' : 'is-bad'}`}>
              <small className="t-muted">{r.line}</small>
              <div className="t-imp__fields">
                <select value={r.studentId} onChange={(e) => set(i, { studentId: e.target.value })}>
                  <option value="">{t({ uk: 'Обери учня', ru: 'Выбери ученика', en: 'Pick a student' })}</option>
                  {data.students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <input type="date" value={r.date} onChange={(e) => set(i, { date: e.target.value })} />
                <input type="time" value={r.time} onChange={(e) => set(i, { time: e.target.value })} />
                <select value={r.duration} onChange={(e) => set(i, { duration: Number(e.target.value) })}>
                  {[30, 45, 50, 60, 75, 90, 120].map((d) => <option key={d} value={d}>{d} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</option>)}
                </select>
                <label className="t-imp__weekly"><input type="checkbox" checked={r.weekly} onChange={(e) => set(i, { weekly: e.target.checked })} />{t({ uk: 'щотижня', ru: 'еженедельно', en: 'weekly' })}</label>
                <button type="button" className="t-icon-btn" onClick={() => setRows((rs) => rs && rs.filter((_, j) => j !== i))} aria-label={t({ uk: 'Прибрати', ru: 'Убрать', en: 'Remove' })}>✕</button>
              </div>
            </div>
          ))}
          {rows.some((r) => r.weekly) && (
            <label className="t-imp__weeks">{t({ uk: 'Щотижневі повторювати', ru: 'Еженедельные повторять', en: 'Repeat weekly ones for' })}
              <select value={weeks} onChange={(e) => setWeeks(Number(e.target.value))}>{[2, 4, 8, 12, 16].map((w) => <option key={w} value={w}>{w} {t({ uk: 'тиж.', ru: 'нед.', en: 'weeks' })}</option>)}</select>
            </label>
          )}
          <div className="t-head__actions">
            <button type="button" className="mu-btn mu-btn--lime" disabled={!ready.length} onClick={add}>{t({ uk: `Додати в розклад (${ready.length})`, ru: `Добавить в расписание (${ready.length})`, en: `Add to schedule (${ready.length})` })}</button>
            {rows.length > ready.length && <span className="t-muted">{t({ uk: 'Рядки з червоною рамкою: обери учня, дату або час.', ru: 'Строки с красной рамкой: выбери ученика, дату или время.', en: 'Rows with a red border need a student, date or time.' })}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
