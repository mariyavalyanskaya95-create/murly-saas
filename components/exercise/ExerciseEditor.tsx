'use client';
import { useMemo, useState } from 'react';
import ExerciseView from './ExerciseView';
import { SECTION_TYPES, Section, SectionType, maxScore, parseSection, sectionToText } from '@/lib/exercise';

type Draft = { type: SectionType; instruction: string; text: string };
const newDraft = (type: SectionType = 'gap'): Draft => ({ type, instruction: SECTION_TYPES.find((t) => t.id === type)!.instruction, text: '' });

// Редактор вправи: кілька блоків, кожен свого типу. Повертає розібрані секції через onChange
export default function ExerciseEditor({ onChange, initial, compact }: { onChange: (sections: Section[]) => void; initial?: Section[]; compact?: boolean }) {
  const [drafts, setDrafts] = useState<Draft[]>(() => (initial?.length ? initial.map((s) => ({ type: s.type, instruction: s.instruction, text: sectionToText(s) })) : [newDraft()]));
  const [preview, setPreview] = useState(false);
  const sections = useMemo(() => drafts.map((d) => parseSection(d.type, d.instruction, d.text)).filter((s) => s.tasks.length), [drafts]);

  const set = (i: number, patch: Partial<Draft>) => {
    const next = drafts.map((d, k) => (k === i ? { ...d, ...patch } : d));
    setDrafts(next);
    onChange(next.map((d) => parseSection(d.type, d.instruction, d.text)).filter((s) => s.tasks.length));
  };
  const setType = (i: number, type: SectionType) => {
    const old = SECTION_TYPES.find((t) => t.id === drafts[i].type)!;
    // інструкцію міняємо, тільки якщо вчитель її не редагував
    set(i, { type, ...(drafts[i].instruction === old.instruction ? { instruction: SECTION_TYPES.find((t) => t.id === type)!.instruction } : {}) });
  };
  const remove = (i: number) => {
    const next = drafts.filter((_, k) => k !== i);
    setDrafts(next.length ? next : [newDraft()]);
    onChange(next.map((d) => parseSection(d.type, d.instruction, d.text)).filter((s) => s.tasks.length));
  };

  const tasks = sections.reduce((n, s) => n + s.tasks.length, 0);

  return (
    <div className="ex-ed">
      {drafts.map((d, i) => {
        const meta = SECTION_TYPES.find((t) => t.id === d.type)!;
        return (
          <div key={i} className="ex-ed__block">
            <div className="ex-ed__head">
              <b>{compact ? `Частина ${i + 1}` : `Блок ${i + 1}`}</b>
              {drafts.length > 1 && <button type="button" className="t-link-btn" onClick={() => remove(i)}>Прибрати</button>}
            </div>
            <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
              {SECTION_TYPES.map((t) => (
                <button key={t.id} type="button" className={`g-chip ${d.type === t.id ? 'is-on' : ''}`} onClick={() => setType(i, t.id)}>{t.label}</button>
              ))}
            </div>
            <div className="t-form">
              <label className="t-form__wide">Інструкція для учня<input value={d.instruction} onChange={(e) => set(i, { instruction: e.target.value })} /></label>
              <label className="t-form__wide">Завдання, кожне з нового рядка
                <textarea rows={5} value={d.text} onChange={(e) => set(i, { text: e.target.value })} placeholder={meta.example} spellCheck={false} />
              </label>
            </div>
            <p className="t-muted ex-ed__hint">{meta.hint}</p>
          </div>
        );
      })}
      <div className="ex-ed__bar">
        <button type="button" className="mu-btn t-btn-sm" onClick={() => setDrafts([...drafts, newDraft(drafts[drafts.length - 1]?.type)])}>{compact ? '+ Ще частина' : '+ Ще блок'}</button>
        <span className="t-muted">{tasks} завдань · {maxScore(sections)} балів з автоперевіркою</span>
        {tasks > 0 && <button type="button" className="t-link-btn" onClick={() => setPreview(!preview)}>{preview ? 'Сховати' : 'Як побачить учень'}</button>}
      </div>
      {preview && tasks > 0 && <div className="ex-ed__preview"><ExerciseView sections={sections} answers={{}} onChange={() => {}} /></div>}
    </div>
  );
}
