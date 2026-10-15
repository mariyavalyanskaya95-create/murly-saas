'use client';
import { useState } from 'react';
import Icon from '../Icon';
import ExerciseEditor from '../exercise/ExerciseEditor';
import { uploadFile } from '@/lib/upload';
import AudioPlayer from './AudioPlayer';
import { useT } from '@/components/LangProvider';
import { AGES_T, BLOCK_TYPES, FOCUS, LEVELS, emptyBlock, youtubeEmbed, type Block, type BlockType, type Plan } from '@/lib/lesson';

const COLORS = ['lime', 'mustard', 'sky', 'tomato'];

function VocabEditor({ b, onChange }: { b: Extract<Block, { type: 'vocab' }>; onChange: (b: Block) => void }) {
  const t = useT();
  const [text, setText] = useState(b.words.map((w) => `${w.en} = ${w.uk}`).join('\n'));
  return (
    <label className="t-form__wide le-label">{t({ uk: 'Слова, кожне з нового рядка: англійською = переклад', ru: 'Слова, каждое с новой строки: по-английски = перевод', en: 'Words, one per line: English = translation' })}
      <textarea rows={5} value={text} spellCheck={false} placeholder={t({ uk: 'to give up = здаватися\nreliable = надійний', ru: 'to give up = сдаваться\nreliable = надёжный' })}
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
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  return (
    <span className="le-upload">
      <label className={`mu-btn t-btn-sm ${busy ? 'is-busy' : ''}`}>
        <Icon id="d-send" />{busy ? t({ uk: 'Завантажую…', ru: 'Загружаю…', en: 'Uploading…' }) : label}
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
  const t = useT();
  switch (b.type) {
    case 'heading':
      return <input className="le-input le-input--h" value={b.text} onChange={(e) => onChange({ ...b, text: e.target.value })} placeholder={t({ uk: 'Заголовок розділу', ru: 'Заголовок раздела', en: 'Section heading' })} />;
    case 'text': case 'tip': case 'note':
      return <textarea className="le-input" rows={b.type === 'text' ? 5 : 3} value={b.text} onChange={(e) => onChange({ ...b, text: e.target.value })}
        placeholder={b.type === 'text' ? t({ uk: 'Текст для читання. Новий абзац через порожній рядок. **Жирний** у двох зірочках.', ru: 'Текст для чтения. Новый абзац через пустую строку. **Жирный** в двух звёздочках.', en: 'Text for reading. Start a new paragraph after an empty line. **Bold** goes in two asterisks.' }) : b.type === 'note' ? t({ uk: 'Підказка для себе: відповіді, як провести вправу, скільки часу. Учень цього не бачить.', ru: 'Подсказка для себя: ответы, как провести упражнение, сколько времени. Ученик этого не видит.', en: 'A note for yourself: answers, how to run the activity, how long it takes. The student does not see it.' }) : t({ uk: 'Правило або лайфхак, який варто запам’ятати', ru: 'Правило или лайфхак, который стоит запомнить', en: 'A rule or tip worth remembering' })} />;
    case 'image':
      return (
        <div className="t-form">
          <div className="t-form__wide le-row"><UploadButton accept="image/png,image/jpeg,image/webp,image/gif" label={t({ uk: 'Завантажити картинку', ru: 'Загрузить картинку', en: 'Upload a picture' })} onDone={(url) => onChange({ ...b, url })} /><span className="t-muted">{t({ uk: 'або встав посилання нижче', ru: 'или вставь ссылку ниже', en: 'or paste a link below' })}</span></div>
          <label className="t-form__wide le-label">{t({ uk: 'Посилання на картинку', ru: 'Ссылка на картинку', en: 'Picture link' })}<input value={b.url} onChange={(e) => onChange({ ...b, url: e.target.value })} placeholder="https://…" /></label>
          <label className="t-form__wide le-label">{t({ uk: 'Підпис', ru: 'Подпись', en: 'Caption' })}<input value={b.caption ?? ''} onChange={(e) => onChange({ ...b, caption: e.target.value })} /></label>
          {b.url && /^https?:\/\//.test(b.url) && <img src={b.url} alt="" className="le-img" />}
        </div>
      );
    case 'video':
      return (
        <div className="t-form">
          <label className="t-form__wide le-label">{t({ uk: 'Посилання на YouTube', ru: 'Ссылка на YouTube', en: 'YouTube link' })}<input value={b.url} onChange={(e) => onChange({ ...b, url: e.target.value })} placeholder="https://www.youtube.com/watch?v=…" /></label>
          <label className="t-form__wide le-label">{t({ uk: 'Підпис', ru: 'Подпись', en: 'Caption' })}<input value={b.caption ?? ''} onChange={(e) => onChange({ ...b, caption: e.target.value })} /></label>
          <label className="t-form__wide le-label">{t({ uk: 'Завдання до відео (необов’язково)', ru: 'Задание к видео (необязательно)', en: 'Task for the video (optional)' })}<input value={b.task ?? ''} onChange={(e) => onChange({ ...b, task: e.target.value })} placeholder={t({ uk: 'Напр. Подивись і запиши 3 слова про їжу', ru: 'Напр. Посмотри и запиши 3 слова о еде', en: 'E.g. Watch and write down 3 words about food' })} /></label>
          {b.url && (youtubeEmbed(b.url) ? <p className="t-pos">{t({ uk: 'Відео знайдено', ru: 'Видео найдено', en: 'Video found' })}</p> : <p className="t-neg">{t({ uk: 'Не схоже на посилання YouTube', ru: 'Не похоже на ссылку YouTube', en: 'This does not look like a YouTube link' })}</p>)}
        </div>
      );
    case 'audio':
      return (
        <div className="t-form">
          <label className="t-form__wide le-label">{t({ uk: 'Назва', ru: 'Название', en: 'Title' })}<input value={b.title ?? ''} onChange={(e) => onChange({ ...b, title: e.target.value })} placeholder={t({ uk: 'Напр. At the café', ru: 'Напр. At the café', en: 'E.g. At the café' })} /></label>
          <label className="t-form__wide le-label">{t({ uk: 'Текст аудіо: кожна репліка з нового рядка у форматі «Ім’я: текст»', ru: 'Текст аудио: каждая реплика с новой строки в формате «Имя: текст»', en: 'Audio script: each line on a new line as "Name: text"' })}
            <textarea rows={6} value={b.script} spellCheck={false} onChange={(e) => onChange({ ...b, script: e.target.value })} placeholder={'Anna: Hi! Are you free on Saturday?\nTom: I think so. Why?'} />
          </label>
          <div className="t-form__wide le-row">
            <UploadButton accept="audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,audio/ogg" label={b.audioUrl ? t({ uk: 'Замінити аудіофайл', ru: 'Заменить аудиофайл', en: 'Replace audio file' }) : t({ uk: 'Або завантажити свій аудіофайл', ru: 'Или загрузить свой аудиофайл', en: 'Or upload your own audio file' })} onDone={(url) => onChange({ ...b, audioUrl: url })} />
            {b.audioUrl && <button type="button" className="t-link-btn" onClick={() => onChange({ ...b, audioUrl: undefined })}>{t({ uk: 'Прибрати файл (озвучка голосом)', ru: 'Убрать файл (озвучка голосом)', en: 'Remove file (use voice reading)' })}</button>}
          </div>
          <p className="t-muted t-form__wide">{t({ uk: 'Без файлу текст озвучується автоматично: кожен персонаж своїм голосом, можна сповільнити. Учень спершу слухає, текст відкривається кнопкою.', ru: 'Без файла текст озвучивается автоматически: каждый персонаж своим голосом, можно замедлить. Ученик сначала слушает, текст открывается кнопкой.', en: 'Without a file, the text is read aloud automatically: each character has its own voice, and you can slow it down. The student listens first, the text opens with a button.' })}</p>
          {b.script.trim() && <div className="t-form__wide"><AudioPlayer script={b.script} title={b.title} audioUrl={b.audioUrl} /></div>}
        </div>
      );
    case 'pdf':
      return (
        <div className="t-form">
          <div className="t-form__wide le-row"><UploadButton accept="application/pdf" label={b.url ? t({ uk: 'Замінити PDF', ru: 'Заменить PDF', en: 'Replace PDF' }) : t({ uk: 'Завантажити PDF', ru: 'Загрузить PDF', en: 'Upload PDF' })} onDone={(url, name) => onChange({ ...b, url, name: b.name || name.replace(/\.pdf$/i, '') })} />
            {b.url && <a href={b.url} target="_blank" rel="noopener noreferrer" className="t-link-btn">{t({ uk: 'Відкрити файл', ru: 'Открыть файл', en: 'Open file' })}</a>}</div>
          <label className="t-form__wide le-label">{t({ uk: 'Назва', ru: 'Название', en: 'Title' })}<input value={b.name ?? ''} onChange={(e) => onChange({ ...b, name: e.target.value })} placeholder={t({ uk: 'Напр. Workbook, Unit 5', ru: 'Напр. Workbook, Unit 5', en: 'E.g. Workbook, Unit 5' })} /></label>
          <p className="t-muted t-form__wide">{t({ uk: 'Завантажуй лише власні матеріали або ті, що маєш право показувати учням.', ru: 'Загружай только свои материалы или те, которые имеешь право показывать ученикам.', en: 'Only upload your own materials or ones you have the right to show to students.' })}</p>
        </div>
      );
    case 'vocab':
      return <VocabEditor b={b} onChange={onChange} />;
    case 'speaking':
      return <textarea className="le-input" rows={3} value={b.questions.join('\n')} onChange={(e) => onChange({ ...b, questions: e.target.value.split('\n') })} placeholder={t({ uk: 'Питання для розмови, кожне з нового рядка', ru: 'Вопросы для разговора, каждый с новой строки', en: 'Questions for discussion, one per line' })} />;
    case 'exercise':
      return <ExerciseEditor compact initial={b.sections} onChange={(sections) => onChange({ ...b, sections })} />;
  }
}

export default function LessonEditor({ plan, onChange }: { plan: Plan; onChange: (patch: Partial<Plan>) => void }) {
  const t = useT();
  const [adding, setAdding] = useState(false);
  const blocks = plan.blocks;
  const setBlocks = (next: Block[]) => onChange({ blocks: next });
  const move = (i: number, d: -1 | 1) => { const n = [...blocks]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; setBlocks(n); };
  const add = (type: BlockType) => { setBlocks([...blocks, emptyBlock(type)]); setAdding(false); };

  return (
    <div className="le">
      <div className="t-card">
        <div className="t-form">
          <label className="t-form__wide le-label">{t({ uk: 'Назва уроку', ru: 'Название урока', en: 'Lesson title' })}<input className="le-title" value={plan.title} onChange={(e) => onChange({ title: e.target.value })} placeholder={t({ uk: 'Напр. Travel stories', ru: 'Напр. Travel stories', en: 'E.g. Travel stories' })} /></label>
          <label className="le-label">{t({ uk: 'Рівень', ru: 'Уровень', en: 'Level' })}<select value={plan.level} onChange={(e) => onChange({ level: e.target.value })}>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select></label>
          <label className="le-label">{t({ uk: 'Вік', ru: 'Возраст', en: 'Age' })}<select value={plan.age} onChange={(e) => onChange({ age: e.target.value as Plan['age'] })}>{AGES_T.map((a) => <option key={a.id} value={a.id}>{t(a.label)}</option>)}</select></label>
          <label className="le-label">{t({ uk: 'Тема', ru: 'Тема', en: 'Topic' })}<input value={plan.topic ?? ''} onChange={(e) => onChange({ topic: e.target.value })} placeholder={t({ uk: 'Напр. Подорожі', ru: 'Напр. Путешествия', en: 'E.g. Travel' })} /></label>
          <div className="t-form__wide le-label">{t({ uk: 'Фокус уроку', ru: 'Фокус урока', en: 'Lesson focus' })}
            <div className="g-chips" style={{ justifyContent: 'flex-start' }}>{FOCUS.map((f) => {
              const on = (plan.focus ?? []).includes(f);
              return <button key={f} type="button" className={`g-chip ${on ? 'is-on' : ''}`} onClick={() => onChange({ focus: on ? (plan.focus ?? []).filter((x) => x !== f) : [...(plan.focus ?? []), f] })}>{f}</button>;
            })}</div>
          </div>
          <label className="t-form__wide le-label">{t({ uk: 'Що буде на уроці (кожен пункт з нового рядка)', ru: 'Что будет на уроке (каждый пункт с новой строки)', en: 'What happens in the lesson (one point per line)' })}
            <textarea rows={3} value={plan.aims ?? ''} onChange={(e) => onChange({ aims: e.target.value })} placeholder={t({ uk: 'Обговоримо…\nВивчимо слова про…\nПрочитаємо текст і…', ru: 'Обсудим…\nВыучим слова о…\nПрочитаем текст и…', en: 'We will talk about…\nWe will learn words about…\nWe will read a text and…' })} />
          </label>
          <div className="le-label">{t({ uk: 'Колір', ru: 'Цвет', en: 'Colour' })}
            <div className="le-colors">{COLORS.map((c) => (
              <button key={c} type="button" className={`le-color gr--${c} ${plan.color === c ? 'is-on' : ''}`} onClick={() => onChange({ color: c })} aria-label={c} />
            ))}</div>
          </div>
        </div>
      </div>

      {blocks.map((b, i) => {
        const meta = BLOCK_TYPES.find((x) => x.id === b.type)!;
        return (
          <div key={b.id} className="t-card le-block">
            <div className="le-block__bar">
              <span className="le-block__type"><Icon id={meta.icon} />{t(meta.label)}</span>
              <span className="le-block__tools">
                <button className="t-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label={t({ uk: 'Вище', ru: 'Выше', en: 'Move up' })}>↑</button>
                <button className="t-icon-btn" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} aria-label={t({ uk: 'Нижче', ru: 'Ниже', en: 'Move down' })}>↓</button>
                <button className="t-icon-btn" onClick={() => setBlocks(blocks.filter((x) => x.id !== b.id))} aria-label={t({ uk: 'Видалити блок', ru: 'Удалить блок', en: 'Delete block' })}>✕</button>
              </span>
            </div>
            <BlockEditor b={b} onChange={(nb) => setBlocks(blocks.map((x) => (x.id === b.id ? nb : x)))} />
          </div>
        );
      })}

      <div className="t-card le-add">
        {!adding
          ? <button className="mu-btn mu-btn--lime" onClick={() => setAdding(true)}>+ {t({ uk: 'Додати блок', ru: 'Добавить блок', en: 'Add block' })}</button>
          : (
            <div className="le-add__grid">
              {BLOCK_TYPES.map((bt) => (
                <button key={bt.id} className="le-add__item" onClick={() => add(bt.id)}><Icon id={bt.icon} />{t(bt.label)}</button>
              ))}
              <button className="t-link-btn" onClick={() => setAdding(false)}>{t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' })}</button>
            </div>
          )}
      </div>
    </div>
  );
}
