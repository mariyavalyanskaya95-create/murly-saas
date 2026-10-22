'use client';
// Кнопка «+ Лексика» внизу екрана картки учня: вікно, куди вставляєш слова прямо під час уроку, без переходу на вкладку.
// Рядки з готовим перекладом додаються одразу; для слів без перекладу беремо перший варіант зі словника.
import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import { useTeacher } from '@/lib/teacher-store';
import { useT } from '../LangProvider';

export const splitWordLine = (l: string): { en: string; uk: string } => {
  const m = l.split(/\t+|\s*=\s*|\s+[-–—]\s+|\s*\|\s*/).map((x) => x.trim()).filter(Boolean);
  if (m.length >= 2 && /[а-яіїєґё]/i.test(m.slice(1).join(' '))) return { en: m[0], uk: m.slice(1).join(', ') };
  return { en: l.trim(), uk: '' };
};

export default function QuickWords({ studentId, name }: { studentId: string; name: string }) {
  const t = useT();
  const { addWord } = useTeacher();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const area = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { if (open) setTimeout(() => area.current?.focus(), 30); }, [open]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  const add = async () => {
    const at = new Date().toISOString();
    const lines = text.split('\n').map((l) => l.trim().replace(/^\d+[.)]\s*/, '')).filter(Boolean)
      .filter((l) => !/^(english|англ\S*)\s*([\t|=-]|$)/i.test(l)).slice(0, 120);
    const parsed = lines.map(splitWordLine);
    setBusy(true); setMsg('');
    let n = 0; const missed: string[] = [];
    for (const r of parsed) {
      if (r.uk) { addWord(studentId, { en: r.en, uk: r.uk, at }); n++; continue; }
      try {
        const to = t.lang === 'ru' ? 'ru' : 'uk';
        const d = await fetch(`/api/dict?w=${encodeURIComponent(r.en)}&to=${to}`).then((x) => x.json());
        const tr = (d.translations ?? [])[0];
        if (tr) { addWord(studentId, { en: r.en, uk: tr, example: d.examples?.[0]?.en || undefined, at }); n++; } else missed.push(r.en);
      } catch { missed.push(r.en); }
    }
    setBusy(false);
    setText(missed.join('\n'));
    setMsg(t({ uk: `Додано ${n} сл.`, ru: `Добавлено ${n} сл.`, en: `Added ${n} words` }) + (missed.length ? t({ uk: '. Без перекладу лишилися в полі: допиши «= переклад».', ru: '. Без перевода остались в поле: допиши «= перевод».', en: '. Words without a translation stay in the box: add “= translation”.' }) : ''));
  };

  return (
    <>
      <button type="button" className="qw-fab" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <Icon id="e-abc" />{t({ uk: '+ Лексика', ru: '+ Лексика', en: '+ Words' })}
      </button>
      {open && (
        <div className="qw-back" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="qw" role="dialog" aria-modal="true" aria-labelledby="qw-title">
            <div className="t-card__head">
              <h2 id="qw-title">{t({ uk: `Додати лексику: ${name}`, ru: `Добавить лексику: ${name}`, en: `Add words: ${name}` })}</h2>
              <button type="button" className="t-icon-btn" onClick={() => setOpen(false)} aria-label={t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}>✕</button>
            </div>
            <p className="t-muted">{t({ uk: 'По слову в рядку: «word = переклад», «word - переклад» або рядки таблиці з Word. Слова без перекладу Murly перекладе сам.', ru: 'По слову в строке: «word = перевод», «word - перевод» или строки таблицы из Word. Слова без перевода Murly переведёт сам.', en: 'One word per line: “word = translation”, “word - translation” or Word table rows. Murly translates words without one.' })}</p>
            <textarea ref={area} rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder={'boredom = нудьга\npatience - терпіння\nto thrive'}
              onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && text.trim()) add(); }} />
            <div className="t-head__actions">
              <button type="button" className="mu-btn mu-btn--lime" disabled={busy || !text.trim()} onClick={add}>{busy ? '…' : t({ uk: 'Додати', ru: 'Добавить', en: 'Add' })}</button>
              <small className="t-muted">Ctrl + Enter</small>
              {msg && <span className="t-pos" role="status">{msg}</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
