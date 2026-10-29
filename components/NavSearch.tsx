'use client';
// Пошук у шапці, як на сайтах British Council: натиснув лупу, поле з'явилося в шапці замість пунктів меню,
// під ним коротка підказка з 6 результатів. Enter або «Усі результати» ведуть на сторінку пошуку.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import { useT } from './LangProvider';
import type { SearchItem } from '@/lib/search-index';
import { rankSearch } from '@/lib/search-match';

let cache: Promise<SearchItem[]> | null = null;
const load = () => (cache ??= fetch('/api/search').then((r) => r.json()).catch(() => { cache = null; return []; }));

export default function NavSearch({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
  const t = useT();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);
  const [hi, setHi] = useState(-1);
  const box = useRef<HTMLInputElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => { if (!open) return; load().then(setItems); setTimeout(() => box.current?.focus(), 30); }, [open]);
  // клік поза полем або Esc закривають пошук
  useEffect(() => {
    if (!open) return;
    const down = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) onClose(); };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('pointerdown', down); window.addEventListener('keydown', key);
    return () => { window.removeEventListener('pointerdown', down); window.removeEventListener('keydown', key); };
  }, [open, onClose]);

  const res = useMemo(() => (q.trim().length >= 2 ? rankSearch(items, q).slice(0, 6) : []), [q, items]);
  useEffect(() => setHi(-1), [q]);
  const go = (href: string) => { onClose(); setQ(''); router.push(href); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hi >= 0 && res[hi]) return go(res[hi].href);
    if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  if (!open) {
    return (
      <button type="button" className="mu-nav__search" onClick={onOpen} aria-label={t({ uk: 'Пошук по сайту', ru: 'Поиск по сайту', en: 'Search the site' })} title={t({ uk: 'Пошук', ru: 'Поиск', en: 'Search' })}>
        <Icon id="d-seo" />
      </button>
    );
  }
  return (
    <div className="nsr" ref={wrap}>
      <form className="nsr__form" role="search" onSubmit={submit}>
        <input
          ref={box} type="search" value={q} onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(res.length - 1, h + 1)); } if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(-1, h - 1)); } }}
          placeholder={t({ uk: 'Тема: прийменники, їжа, Past Simple…', ru: 'Тема: предлоги, еда, Past Simple…', en: 'Topic: prepositions, food, Past Simple…' })}
          aria-label={t({ uk: 'Пошук по сайту', ru: 'Поиск по сайту', en: 'Search the site' })}
          aria-autocomplete="list" aria-controls="nsr-list" autoComplete="off"
        />
        <button type="submit" className="nsr__btn"><Icon id="d-seo" /><span>{t({ uk: 'Знайти', ru: 'Найти', en: 'Search' })}</span></button>
        <button type="button" className="nsr__x" onClick={onClose} aria-label={t({ uk: 'Закрити пошук', ru: 'Закрыть поиск', en: 'Close search' })}>×</button>
      </form>
      {q.trim().length >= 2 && (
        <div className="nsr__drop" id="nsr-list" role="listbox">
          {res.length ? res.map((it, i) => (
            <Link key={it.href} href={it.href} role="option" aria-selected={i === hi} className={`nsr__it ${i === hi ? 'is-on' : ''}`} onClick={(e) => { e.preventDefault(); go(it.href); }}>
              <b>{t(it.title)}</b><small>{t(it.kind)}{it.level !== 'all' ? ` · ${it.level}` : ''}</small>
            </Link>
          )) : <p className="nsr__none">{t({ uk: 'Нічого не знайшли. Спробуй інше слово.', ru: 'Ничего не нашли. Попробуй другое слово.', en: 'Nothing found. Try another word.' })}</p>}
          <Link href={`/search?q=${encodeURIComponent(q.trim())}`} className="nsr__all" onClick={(e) => { e.preventDefault(); go(`/search?q=${encodeURIComponent(q.trim())}`); }}>
            {t({ uk: 'Усі результати', ru: 'Все результаты', en: 'All results' })} →
          </Link>
        </div>
      )}
    </div>
  );
}
