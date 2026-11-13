'use client';
// Читалка книжки: сторінка за сторінкою, кожне слово можна натиснути.
// Натиснув: переклад (укр або рос), озвучка слова і «+ у словник» (учитель обирає учня, учень додає собі).
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Book } from '@/lib/books';
import { BOOK_DICT } from '@/lib/books-dict';
import { say, stopSpeak } from '@/lib/speak';
import { useT } from '@/components/LangProvider';
import Kit from '@/components/Kit';

type Who = { role: 'guest' | 'teacher' | 'student'; students?: { id: string; name: string }[] };
let whoP: Promise<Who> | null = null;
const who = () => (whoP ??= fetch('/api/word-pick').then((r) => r.json()).catch(() => ({ role: 'guest' as const })));
const LAST = 'murly-wordpick-student';
const key = (w: string) => w.toLowerCase().replace(/[’]/g, "'");

// речення, в якому стоїть слово: піде прикладом у словник
const sentenceOf = (text: string, at: number) => {
  const a = Math.max(text.lastIndexOf('.', at), text.lastIndexOf('!', at), text.lastIndexOf('?', at)) + 1;
  const ends = ['.', '!', '?'].map((c) => text.indexOf(c, at)).filter((x) => x >= 0);
  return text.slice(a, ends.length ? Math.min(...ends) + 1 : text.length).replace(/["“”]/g, '').trim();
};

export default function BookReader({ b }: { b: Book }) {
  const t = useT();
  const ru = t.lang === 'ru';
  const [page, setPage] = useState(0);
  const [pop, setPop] = useState<{ w: string; ex: string; x: number; y: number } | null>(null);
  const [me, setMe] = useState<Who | null>(null);
  const [sid, setSid] = useState('');
  const [state, setState] = useState<'' | 'saving' | 'ok' | 'dup' | 'err'>('');
  const [saved, setSaved] = useState<string[]>([]);
  const [ans, setAns] = useState<Record<number, number>>({});
  const box = useRef<HTMLDivElement>(null);
  const total = b.pages.length;
  const end = page >= total;
  useEffect(() => () => stopSpeak(), []);
  useEffect(() => { who().then((w) => { setMe(w); const last = (() => { try { return localStorage.getItem(LAST) ?? ''; } catch { return ''; } })(); if (w.students?.length) setSid(w.students.some((s: { id: string }) => s.id === last) ? last : w.students[0].id); }); }, []);
  useEffect(() => {
    if (!pop) return;
    const down = (e: PointerEvent) => { const el = e.target as HTMLElement; if (!box.current?.contains(el) && !el.closest('.bk-w')) setPop(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setPop(null); };
    window.addEventListener('pointerdown', down); window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('pointerdown', down); window.removeEventListener('keydown', esc); };
  }, [pop]);

  // текст сторінки: слова стають кнопками, решта (пробіли, розділові знаки) лишається текстом
  const tokens = useMemo(() => {
    if (end) return [];
    const text = b.pages[page];
    const out: { s: string; w?: boolean; at: number; tail?: string }[] = [];
    const re = /[A-Za-z]+(?:['’][a-z]+)?/g; let m: RegExpExecArray | null; let last = 0;
    while ((m = re.exec(text))) {
      if (m.index > last) out.push({ s: text.slice(last, m.index), at: last });
      // розділовий знак одразу після слова тримаємо разом зі словом, щоб він не переносився на новий рядок
      const tail = (/^[^\sA-Za-z]+/.exec(text.slice(m.index + m[0].length)) || [''])[0];
      out.push({ s: m[0], w: true, at: m.index, tail }); last = m.index + m[0].length + tail.length; re.lastIndex = last;
    }
    if (last < text.length) out.push({ s: text.slice(last), at: last });
    return out;
  }, [b, page, end]);

  const open = (w: string, at: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect(); const host = el.closest('.bk-page')!.getBoundingClientRect();
    setState(''); setPop({ w, ex: sentenceOf(b.pages[page], at), x: r.left - host.left + r.width / 2, y: r.bottom - host.top + 8 });
    say(w);
  };
  const tr = (w: string) => { const d = BOOK_DICT[key(w)]; return d ? (ru ? d[1] : d[0]) : ''; };
  const save = async () => {
    if (!pop || !sid) return;
    setState('saving');
    try { localStorage.setItem(LAST, sid); } catch { /* */ }
    const r = await fetch('/api/word-pick', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ studentId: sid, en: pop.w.toLowerCase(), uk: tr(pop.w), example: pop.ex }) }).catch(() => null);
    const j = r && r.ok ? await r.json().catch(() => ({})) : null;
    setState(!j ? 'err' : j.dup ? 'dup' : 'ok');
    if (j) setSaved((s) => [...s, key(pop.w)]);
  };
  const go = (p: number) => { stopSpeak(); setPop(null); setPage(Math.max(0, Math.min(total, p))); };
  const score = b.questions.reduce((n, q, i) => n + (ans[i] === q.answer ? 1 : 0), 0);

  return (
    <div className="bk">
      <div className="bk-bar">
        <span className="bk-prog" aria-label={t({ uk: 'Сторінка', ru: 'Страница', en: 'Page' })}>
          {Array.from({ length: total + 1 }, (_, i) => <button key={i} type="button" className={`bk-dot ${i === page ? 'is-on' : ''} ${i < page ? 'is-done' : ''}`} onClick={() => go(i)} aria-label={i < total ? `${i + 1}` : t({ uk: 'Питання', ru: 'Вопросы', en: 'Questions' })} />)}
        </span>
        {!end && <button type="button" className="mu-btn t-btn-sm" onClick={() => say(b.pages[page].replace(/["“”]/g, ''))}>{t({ uk: 'Слухати сторінку', ru: 'Слушать страницу', en: 'Listen to the page' })}</button>}
      </div>

      {!end ? (
        <div className="bk-page" style={{ ['--bk' as string]: b.color }}>
          <div className="bk-pic" aria-hidden="true"><Kit id={b.kit} className="bk-kit" /><span>{page + 1} / {total}</span></div>
          <p className="bk-text">
            {tokens.map((x, i) => x.w
              ? <span key={i} className="bk-nw"><button type="button" className={`bk-w ${b.words.includes(key(x.s)) ? 'is-key' : ''} ${saved.includes(key(x.s)) ? 'is-saved' : ''}`} onClick={(e) => open(x.s, x.at, e.currentTarget)}>{x.s}</button>{x.tail}</span>
              : <span key={i}>{x.s}</span>)}
          </p>
          {pop && (
            <div ref={box} className="bk-pop" role="dialog" style={{ left: `clamp(8px, ${pop.x - 130}px, calc(100% - 268px))`, top: pop.y }}>
              <div className="bk-pop__head"><b>{pop.w}</b><button type="button" className="bk-pop__say" onClick={() => say(pop.w)} aria-label={t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}>&#9835;</button></div>
              <p className="bk-pop__tr">{tr(pop.w) || '…'}</p>
              {me?.role === 'guest' || !me ? (
                <p className="bk-pop__hint"><Link href="/sign-up">{t({ uk: 'Увійди', ru: 'Войди', en: 'Sign in' })}</Link>, {t({ uk: 'щоб зберігати слова у свій словник.', ru: 'чтобы сохранять слова в свой словарь.', en: 'to save words to your dictionary.' })}</p>
              ) : me.students?.length ? (
                <div className="bk-pop__save">
                  {me.students.length > 1 && <select value={sid} onChange={(e) => setSid(e.target.value)} aria-label={me.role === 'teacher' ? t({ uk: 'Учень', ru: 'Ученик', en: 'Student' }) : t({ uk: 'Словник', ru: 'Словарь', en: 'Dictionary' })}>{me.students.map((s) => <option key={s.id} value={s.id}>{s.name || '…'}</option>)}</select>}
                  <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={save} disabled={state === 'saving' || state === 'ok'}>
                    {state === 'ok' ? t({ uk: 'Додано!', ru: 'Добавлено!', en: 'Added!' }) : state === 'dup' ? t({ uk: 'Уже в словнику', ru: 'Уже в словаре', en: 'Already saved' }) : state === 'err' ? t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Try again' }) : t({ uk: '+ У словник', ru: '+ В словарь', en: '+ To dictionary' })}
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <div className="bk-page bk-end" style={{ ['--bk' as string]: b.color }}>
          <h2>{t({ uk: 'Питання до казки', ru: 'Вопросы к сказке', en: 'Story questions' })}</h2>
          {b.questions.map((q, i) => (
            <div key={i} className="bk-q">
              <p>{i + 1}. {q.q}</p>
              <div className="bk-q__opts">{q.options.map((o, k) => <button key={k} type="button" className={`g-chip ${ans[i] === k ? (k === q.answer ? 'is-ok' : 'is-bad') : ''}`} onClick={() => setAns({ ...ans, [i]: k })}>{o}</button>)}</div>
            </div>
          ))}
          {Object.keys(ans).length === b.questions.length && <p className="bk-score">{score} / {b.questions.length} {score === b.questions.length ? t({ uk: 'Чудово!', ru: 'Отлично!', en: 'Great!' }) : ''}</p>}
          <h3>{t({ uk: 'Поговоримо', ru: 'Поговорим', en: 'Let’s talk' })}</h3>
          <ol className="bk-talk">{b.talk.map((x) => <li key={x}>{x}</li>)}</ol>
        </div>
      )}

      <div className="bk-nav">
        <button type="button" className="mu-btn" onClick={() => go(page - 1)} disabled={page === 0}>← {t({ uk: 'Назад', ru: 'Назад', en: 'Back' })}</button>
        {!end && <button type="button" className="mu-btn mu-btn--lime" onClick={() => go(page + 1)}>{page === total - 1 ? t({ uk: 'До питань', ru: 'К вопросам', en: 'To questions' }) : t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })} →</button>}
      </div>

      <details className="bk-gloss">
        <summary>{t({ uk: 'Головні слова казки', ru: 'Главные слова сказки', en: 'Key words' })}</summary>
        <ul>{b.words.map((w) => <li key={w}><button type="button" className="bk-w is-key" onClick={() => say(w)}>{w}</button> {tr(w)}</li>)}</ul>
      </details>
    </div>
  );
}
