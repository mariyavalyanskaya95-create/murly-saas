'use client';
// Виділив або двічі натиснув англійське слово на будь-якій сторінці: з'являється кнопка «+ У словник».
// Учитель обирає учня, учень додає собі. Переклад підставляється підказкою, його можна виправити.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useT } from './LangProvider';

type Who = { role: 'guest' | 'teacher' | 'student'; students?: { id: string; name: string }[] };
const EN = /^[A-Za-z][A-Za-z'’ -]{0,48}$/;
const SKIP = 'input, textarea, select, [contenteditable="true"], .sq, .hm, .excalidraw, .lr, [data-nopick], button';
let whoP: Promise<Who> | null = null;
const who = () => (whoP ??= fetch('/api/word-pick').then((r) => r.json()).catch(() => ({ role: 'guest' as const })));
const LAST = 'murly-wordpick-student';

// речення навколо виділеного слова: піде як приклад у словник
function sentenceAround(sel: Selection, word: string) {
  const node = sel.anchorNode?.parentElement;
  const text = (node?.textContent ?? '').replace(/\s+/g, ' ');
  const i = text.toLowerCase().indexOf(word.toLowerCase());
  if (i < 0) return '';
  const start = Math.max(text.lastIndexOf('.', i), text.lastIndexOf('!', i), text.lastIndexOf('?', i)) + 1;
  const ends = ['.', '!', '?'].map((c) => text.indexOf(c, i + word.length)).filter((x) => x >= 0);
  const end = ends.length ? Math.min(...ends) + 1 : text.length;
  const s = text.slice(start, end).trim();
  return s.length <= 200 ? s : '';
}

export default function WordPick() {
  const t = useT();
  const [pill, setPill] = useState<{ x: number; y: number; word: string; example: string } | null>(null);
  const [form, setForm] = useState<{ x: number; y: number; word: string; example: string } | null>(null);
  const [me, setMe] = useState<Who | null>(null);
  const [tr, setTr] = useState('');
  const [sid, setSid] = useState('');
  const [state, setState] = useState<'' | 'saving' | 'ok' | 'dup' | 'err'>('');
  const box = useRef<HTMLDivElement>(null);

  const check = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) { setPill(null); return; }
    const word = sel.toString().trim().replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '');
    if (!EN.test(word) || word.split(/\s+/).length > 4) { setPill(null); return; }
    const el = sel.anchorNode?.parentElement;
    if (!el || el.closest(SKIP) || box.current?.contains(el)) { setPill(null); return; }
    const r = sel.getRangeAt(0).getBoundingClientRect();
    who().then((w) => {
      setMe(w);
      if (w.role === 'guest' || !w.students?.length) return;
      setPill({ x: r.left + r.width / 2, y: r.bottom + 8, word, example: sentenceAround(sel, word) });
    });
  }, []);

  useEffect(() => {
    let tm = 0;
    const later = () => { window.clearTimeout(tm); tm = window.setTimeout(check, 250); };
    document.addEventListener('selectionchange', later);
    const hide = () => setPill(null);
    window.addEventListener('scroll', hide, { passive: true });
    return () => { document.removeEventListener('selectionchange', later); window.removeEventListener('scroll', hide); window.clearTimeout(tm); };
  }, [check]);

  // Esc і клік поза вікном закривають
  useEffect(() => {
    if (!form) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setForm(null); };
    const down = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setForm(null); };
    window.addEventListener('keydown', key); window.addEventListener('pointerdown', down);
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('pointerdown', down); };
  }, [form]);

  const open = () => {
    if (!pill || !me?.students?.length) return;
    const saved = (() => { try { return localStorage.getItem(LAST) ?? ''; } catch { return ''; } })();
    setSid(me.students.some((s) => s.id === saved) ? saved : me.students[0].id);
    setTr(''); setState('');
    setForm(pill); setPill(null);
    fetch(`/api/word-pick?tr=${encodeURIComponent(pill.word)}&to=${t.lang === 'ru' ? 'ru' : 'uk'}`).then((r) => r.json()).then((j) => { if (j.text) setTr((cur) => cur || j.text); }).catch(() => {});
  };
  const save = async () => {
    if (!form || !sid) return;
    setState('saving');
    try { localStorage.setItem(LAST, sid); } catch { /* без пам'яті */ }
    const r = await fetch('/api/word-pick', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentId: sid, en: form.word, uk: tr, example: form.example }) }).catch(() => null);
    const j = r && r.ok ? await r.json().catch(() => ({})) : null;
    setState(!j ? 'err' : j.dup ? 'dup' : 'ok');
    if (j) window.setTimeout(() => setForm(null), 1400);
  };

  const pos = (p: { x: number; y: number }, w: number) => ({ left: Math.max(8, Math.min(window.innerWidth - w - 8, p.x - w / 2)), top: Math.min(window.innerHeight - 60, p.y) });

  return (
    <>
      {pill && (
        <button type="button" className="wp-pill" style={pos(pill, 150)} onMouseDown={(e) => e.preventDefault()} onClick={open}>
          + {t({ uk: 'У словник', ru: 'В словарь', en: 'To dictionary' })}
        </button>
      )}
      {form && me?.students && (
        <div ref={box} className="wp-box" role="dialog" aria-label={t({ uk: 'Додати слово', ru: 'Добавить слово', en: 'Add a word' })} style={pos(form, 300)}>
          <b className="wp-word">{form.word}</b>
          <label className="wp-f">{t({ uk: 'Переклад', ru: 'Перевод', en: 'Translation' })}
            <input value={tr} onChange={(e) => setTr(e.target.value)} placeholder={t({ uk: 'наприклад: маяк', ru: 'например: маяк', en: 'e.g. маяк' })} autoFocus />
          </label>
          {me.students.length > 1 && (
            <label className="wp-f">{me.role === 'teacher' ? t({ uk: 'Учню', ru: 'Ученику', en: 'For student' }) : t({ uk: 'Словник', ru: 'Словарь', en: 'Dictionary' })}
              <select value={sid} onChange={(e) => setSid(e.target.value)}>{me.students.map((s) => <option key={s.id} value={s.id}>{s.name || '…'}</option>)}</select>
            </label>
          )}
          {form.example && <small className="wp-ex">{form.example}</small>}
          <div className="wp-btns">
            <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={save} disabled={state === 'saving'}>
              {state === 'ok' ? t({ uk: 'Додано!', ru: 'Добавлено!', en: 'Added!' }) : state === 'dup' ? t({ uk: 'Уже є в словнику', ru: 'Уже есть в словаре', en: 'Already there' }) : state === 'err' ? t({ uk: 'Не вийшло, ще раз', ru: 'Не вышло, ещё раз', en: 'Failed, try again' }) : t({ uk: 'Додати', ru: 'Добавить', en: 'Add' })}
            </button>
            <button type="button" className="t-link-btn" onClick={() => setForm(null)}>{t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}</button>
          </div>
        </div>
      )}
    </>
  );
}
