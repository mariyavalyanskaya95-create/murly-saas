'use client';
import { useMemo, useState } from 'react';
import ExerciseView from './ExerciseView';
import { SECTION_TYPES, Section, SectionType, maxScore, parseSection, sectionToText } from '@/lib/exercise';
import { useT } from '@/components/LangProvider';
import { pick, type Lang, type T } from '@/lib/i18n';

type Draft = { type: SectionType; instruction: string; text: string };
const meta = (type: SectionType) => SECTION_TYPES.find((x) => x.id === type)!;
const newDraft = (lang: Lang, type: SectionType = 'gap'): Draft => ({ type, instruction: pick(meta(type).instruction, lang), text: '' });
// стандартна інструкція будь-якою мовою (щоб не затерти те, що вчитель написав сам)
const isDefault = (s: string, x: T) => s === x.uk || s === x.ru || s === x.en;

// Множина: укр і рос мають 3 форми (1, 2-4, 5+), англ 2
type Forms = { uk: [string, string, string]; ru: [string, string, string]; en: [string, string] };
const plural = (n: number, lang: Lang, f: Forms) => {
  if (lang === 'en') return `${n} ${n === 1 ? f.en[0] : f.en[1]}`;
  const w = f[lang];
  return `${n} ${n % 10 === 1 && n % 100 !== 11 ? w[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? w[1] : w[2]}`;
};
const TASKS: Forms = { uk: ['завдання', 'завдання', 'завдань'], ru: ['задание', 'задания', 'заданий'], en: ['task', 'tasks'] };
const POINTS: Forms = { uk: ['бал', 'бали', 'балів'], ru: ['балл', 'балла', 'баллов'], en: ['point', 'points'] };

// Редактор вправи: кілька блоків, кожен свого типу. Повертає розібрані секції через onChange
export default function ExerciseEditor({ onChange, initial, compact }: { onChange: (sections: Section[]) => void; initial?: Section[]; compact?: boolean }) {
  const t = useT();
  const [drafts, setDrafts] = useState<Draft[]>(() => (initial?.length ? initial.map((s) => ({ type: s.type, instruction: s.instruction, text: sectionToText(s) })) : [newDraft(t.lang)]));
  const [preview, setPreview] = useState(false);
  const sections = useMemo(() => drafts.map((d) => parseSection(d.type, d.instruction, d.text)).filter((s) => s.tasks.length), [drafts]);

  const set = (i: number, patch: Partial<Draft>) => {
    const next = drafts.map((d, k) => (k === i ? { ...d, ...patch } : d));
    setDrafts(next);
    onChange(next.map((d) => parseSection(d.type, d.instruction, d.text)).filter((s) => s.tasks.length));
  };
  const setType = (i: number, type: SectionType) => {
    const old = meta(drafts[i].type);
    // інструкцію міняємо, тільки якщо вчитель її не редагував
    set(i, { type, ...(isDefault(drafts[i].instruction, old.instruction) ? { instruction: t(meta(type).instruction) } : {}) });
  };
  const remove = (i: number) => {
    const next = drafts.filter((_, k) => k !== i);
    setDrafts(next.length ? next : [newDraft(t.lang)]);
    onChange(next.map((d) => parseSection(d.type, d.instruction, d.text)).filter((s) => s.tasks.length));
  };

  const tasks = sections.reduce((n, s) => n + s.tasks.length, 0);

  return (
    <div className="ex-ed">
      {drafts.map((d, i) => {
        const m = meta(d.type);
        return (
          <div key={i} className="ex-ed__block">
            <div className="ex-ed__head">
              <b>{compact ? `${t({ uk: 'Частина', ru: 'Часть', en: 'Part' })} ${i + 1}` : `${t({ uk: 'Блок', ru: 'Блок', en: 'Block' })} ${i + 1}`}</b>
              {drafts.length > 1 && <button type="button" className="t-link-btn" onClick={() => remove(i)}>{t({ uk: 'Прибрати', ru: 'Убрать', en: 'Remove' })}</button>}
            </div>
            <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
              {SECTION_TYPES.map((st) => (
                <button key={st.id} type="button" className={`g-chip ${d.type === st.id ? 'is-on' : ''}`} onClick={() => setType(i, st.id)}>{t(st.label)}</button>
              ))}
            </div>
            <div className="t-form">
              <label className="t-form__wide">{t({ uk: 'Інструкція для учня', ru: 'Инструкция для ученика', en: 'Instructions for the student' })}<input value={d.instruction} onChange={(e) => set(i, { instruction: e.target.value })} /></label>
              <label className="t-form__wide">{t({ uk: 'Завдання, кожне з нового рядка', ru: 'Задания, каждое с новой строки', en: 'Tasks, one per line' })}
                <textarea rows={5} value={d.text} onChange={(e) => set(i, { text: e.target.value })} placeholder={t(m.example)} spellCheck={false} />
              </label>
            </div>
            <p className="t-muted ex-ed__hint">{t(m.hint)}</p>
          </div>
        );
      })}
      <div className="ex-ed__bar">
        <button type="button" className="mu-btn t-btn-sm" onClick={() => setDrafts([...drafts, newDraft(t.lang, drafts[drafts.length - 1]?.type)])}>{compact ? `+ ${t({ uk: 'Ще частина', ru: 'Ещё часть', en: 'Another part' })}` : `+ ${t({ uk: 'Ще блок', ru: 'Ещё блок', en: 'Another block' })}`}</button>
        <span className="t-muted">{plural(tasks, t.lang, TASKS)} · {plural(maxScore(sections), t.lang, POINTS)} {t({ uk: 'з автоперевіркою', ru: 'с автопроверкой', en: 'auto-checked' })}</span>
        {tasks > 0 && <button type="button" className="t-link-btn" onClick={() => setPreview(!preview)}>{preview ? t({ uk: 'Сховати', ru: 'Скрыть', en: 'Hide' }) : t({ uk: 'Як побачить учень', ru: 'Как увидит ученик', en: 'Student view' })}</button>}
      </div>
      {preview && tasks > 0 && <div className="ex-ed__preview"><ExerciseView sections={sections} answers={{}} onChange={() => {}} /></div>}
    </div>
  );
}
