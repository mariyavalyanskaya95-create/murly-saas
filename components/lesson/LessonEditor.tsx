'use client';
import { useState } from 'react';
import Icon from '../Icon';
import ExerciseEditor from '../exercise/ExerciseEditor';
import { uploadFile } from '@/lib/upload';
import { AGES, BLOCK_TYPES, LEVELS, emptyBlock, youtubeEmbed, type Block, type BlockType, type Plan } from '@/lib/lesson';

const COLORS = ['lime', 'mustard', 'sky', 'tomato'];

function VocabEditor({ b, onChange }: { b: Extract<Block, { type: 'vocab' }>; onChange: (b: Block) => void }) {
  const [text, setText] = useState(b.words.map((w) => `${w.en} = ${w.uk}`).join('\n'));
  return (
    <label className="t-form__wide le-label">Слова, кожне з нового рядка: англійською = переклад
      <textarea rows={5} value={text} spellCheck={false} placeholder={'to give up = здаватися\nreliable = надійний'}
        onChange={(e) => {
          setText(e.target.value);
          const words = e.target.value.split('\n').map((l) => { const i = l.indexOf('='); return i < 0 ? null : { en: l.slice(0, i).trim(), uk: l.slice(i + 1).trim() }; })
            .filter((w): w is { en: string; uk: string } => !!w && !!w.en && !!w.uk);
          onChange({ ...b, words });
        }} />
    </label>
  );
}

function UploadButton({ accept, label, onDone }: { accept: string; label: string; onDone: (url: string, name: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  return (
    <span className="le-upload">
      <label className={`mu-btn t-btn-sm ${busy ? 'is-busy' : ''}`}>
        <Icon id="d-send" />{busy ? 'Завантажую…' : label}
        <input type="file" accept={accept} hidden disabled={busy} onChange={async (e) => {
          const f = e.target.files?.[0]; e.target.value = '';
          if (!f) return;
          setBusy(true); setErr('');
          const r = await uploadFile(f);
          setBusy(false);
          if ('url' in r) onDone(r.url, f.name); else setErr(r.error);
        }} />
      </label>
      {err && <span className="t-neg">{err}</span>}
    </span>
  );
}

function BlockEditor({ b, onChange }: { b: Block; onChange: (b: Block) => void }) {
  switch (b.type) {
    case 'heading':
      return <input className="le-input le-input--h" value={b.text} onChange={(e) => onChange({ ...b, text: e.target.value })} placeholder="Заголовок розділу" />;
    case 'text': case 'tip':
      return <textarea className="le-input" rows={b.type === 'text' ? 5 : 3} value={b.text} onChange={(e) => onChange({ ...b, text: e.target.value })}
        placeholder={b.type === 'text' ? 'Текст для читання. Новий абзац через порожній рядок. **Жирний** у двох зірочках.' : 'Правило або лайфхак, який варто запам’ятати'} />;
    case 'image':
      return (
        <div className="t-form">
          <div className="t-form__wide le-row"><UploadButton accept="image/png,image/jpeg,image/webp,image/gif" label="Завантажити картинку" onDone={(url) => onChange({ ...b, url })} /><span className="t-muted">або встав посилання нижче</span></div>
          <label className="t-form__wide le-label">Посилання на картинку<input value={b.url} onChange={(e) => onChange({ ...b, url: e.target.value })} placeholder="https://…" /></label>
          <label className="t-form__wide le-label">Підпис<input value={b.caption ?? ''} onChange={(e) => onChange({ ...b, caption: e.target.value })} /></label>
          {b.url && /^https?:\/\//.test(b.url) && <img src={b.url} alt="" className="le-img" />}
        </div>
      );
    case 'video':
      return (
        <div className="t-form">
          <label className="t-form__wide le-label">Посилання на YouTube<input value={b.url} onChange={(e) => onChange({ ...b, url: e.target.value })} placeholder="https://www.youtube.com/watch?v=…" /></label>
          <label className="t-form__wide le-label">Підпис<input value={b.caption ?? ''} onChange={(e) => onChange({ ...b, caption: e.target.value })} /></label>
          <label className="t-form__wide le-label">Завдання до відео (необов’язково)<input value={b.task ?? ''} onChange={(e) => onChange({ ...b, task: e.target.value })} placeholder="Напр. Подивись і запиши 3 слова про їжу" /></label>
          {b.url && (youtubeEmbed(b.url) ? <p className="t-pos">Відео знайдено</p> : <p className="t-neg">Не схоже на посилання YouTube</p>)}
        </div>
      );
    case 'pdf':
      return (
        <div className="t-form">
          <div className="t-form__wide le-row"><UploadButton accept="application/pdf" label={b.url ? 'Замінити PDF' : 'Завантажити PDF'} onDone={(url, name) => onChange({ ...b, url, name: b.name || name.replace(/\.pdf$/i, '') })} />
            {b.url && <a href={b.url} target="_blank" rel="noopener noreferrer" className="t-link-btn">Відкрити файл</a>}</div>
          <label className="t-form__wide le-label">Назва<input value={b.name ?? ''} onChange={(e) => onChange({ ...b, name: e.target.value })} placeholder="Напр. Workbook, Unit 5" /></label>
          <p className="t-muted t-form__wide">Завантажуй лише власні матеріали або ті, що маєш право показувати учням.</p>
        </div>
      );
    case 'vocab':
      return <VocabEditor b={b} onChange={onChange} />;
    case 'speaking':
      return <textarea className="le-input" rows={3} value={b.questions.join('\n')} onChange={(e) => onChange({ ...b, questions: e.target.value.split('\n') })} placeholder="Питання для розмови, кожне з нового рядка" />;
    case 'exercise':
      return <ExerciseEditor compact initial={b.sections} onChange={(sections) => onChange({ ...b, sections })} />;
  }
}

export default function LessonEditor({ plan, onChange }: { plan: Plan; onChange: (patch: Partial<Plan>) => void }) {
  const [adding, setAdding] = useState(false);
  const blocks = plan.blocks;
  const setBlocks = (next: Block[]) => onChange({ blocks: next });
  const move = (i: number, d: -1 | 1) => { const n = [...blocks]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; setBlocks(n); };
  const add = (type: BlockType) => { setBlocks([...blocks, emptyBlock(type)]); setAdding(false); };

  return (
    <div className="le">
      <div className="t-card">
        <div className="t-form">
          <label className="t-form__wide le-label">Назва уроку<input className="le-title" value={plan.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="Напр. Travel stories" /></label>
          <label className="le-label">Рівень<select value={plan.level} onChange={(e) => onChange({ level: e.target.value })}>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select></label>
          <label className="le-label">Вік<select value={plan.age} onChange={(e) => onChange({ age: e.target.value as Plan['age'] })}>{AGES.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}</select></label>
          <label className="le-label">Тема<input value={plan.topic ?? ''} onChange={(e) => onChange({ topic: e.target.value })} placeholder="Напр. Подорожі" /></label>
          <div className="le-label">Колір
            <div className="le-colors">{COLORS.map((c) => (
              <button key={c} type="button" className={`le-color gr--${c} ${plan.color === c ? 'is-on' : ''}`} onClick={() => onChange({ color: c })} aria-label={c} />
            ))}</div>
          </div>
        </div>
      </div>

      {blocks.map((b, i) => {
        const meta = BLOCK_TYPES.find((t) => t.id === b.type)!;
        return (
          <div key={b.id} className="t-card le-block">
            <div className="le-block__bar">
              <span className="le-block__type"><Icon id={meta.icon} />{meta.label}</span>
              <span className="le-block__tools">
                <button className="t-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Вище">↑</button>
                <button className="t-icon-btn" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} aria-label="Нижче">↓</button>
                <button className="t-icon-btn" onClick={() => setBlocks(blocks.filter((x) => x.id !== b.id))} aria-label="Видалити блок">✕</button>
              </span>
            </div>
            <BlockEditor b={b} onChange={(nb) => setBlocks(blocks.map((x) => (x.id === b.id ? nb : x)))} />
          </div>
        );
      })}

      <div className="t-card le-add">
        {!adding
          ? <button className="mu-btn mu-btn--lime" onClick={() => setAdding(true)}>+ Додати блок</button>
          : (
            <div className="le-add__grid">
              {BLOCK_TYPES.map((t) => (
                <button key={t.id} className="le-add__item" onClick={() => add(t.id)}><Icon id={t.icon} />{t.label}</button>
              ))}
              <button className="t-link-btn" onClick={() => setAdding(false)}>Скасувати</button>
            </div>
          )}
      </div>
    </div>
  );
}
