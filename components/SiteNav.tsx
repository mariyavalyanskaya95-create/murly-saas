'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Icon from './Icon';

// Головні розділи: видно завжди
const TOP = [
  { href: '/#students', label: 'Учням' },
  { href: '/for-teachers', label: 'Вчителям' },
  { href: '/for-parents', label: 'Батькам' },
  { href: '/nmt', label: 'НМТ' },
];

// Усе, що є на сайті: відкривається кнопкою «Меню»
export const MENU: { title: string; items: { href: string; icon: string; label: string; text: string; soon?: boolean }[] }[] = [
  {
    title: 'Вчитися самому',
    items: [
      { href: '/grammar', icon: 'e-abc', label: 'Граматика', text: 'Правила простими словами і вправи' },
      { href: '/irregular-verbs', icon: 'e-book', label: 'Неправильні дієслова', text: 'Таблиця з озвучкою' },
      { href: '/irregular-verbs/games', icon: 'd-cup', label: 'Ігри з дієсловами', text: 'Картки, пари, вікторина' },
      { href: '/practice', icon: 'e-head', label: 'Слухати і читати', text: 'Listening і Reading з питаннями' },
      { href: '/quiz/teen-life', icon: 'e-speak', label: 'Квізи', text: 'Короткі тести на 5 хвилин' },
      { href: '/worlds', icon: 'd-rocket', label: 'Murly Town', text: '3D-містечко, де все англійською' },
    ],
  },
  {
    title: 'З учителем',
    items: [
      { href: '/for-teachers', icon: 'd-team', label: 'Кабінет вчителя', text: 'Учні, розклад, уроки, домашка' },
      { href: '/for-teachers#lessons', icon: 'e-board', label: 'Готові уроки', text: '24 уроки по 60 хвилин' },
      { href: '/#students', icon: 'd-kid', label: 'Кабінет учня', text: 'Домашка, слова, монетки' },
      { href: '/#code', icon: 'd-lock', label: 'Є код від учителя?', text: 'Приєднатися до свого вчителя' },
    ],
  },
  {
    title: 'Іспити',
    items: [
      { href: '/nmt', icon: 'e-trophy', label: 'НМТ з англійської', text: 'Квізи у форматі іспиту' },
      { href: '/pricing', icon: 'e-pencil', label: 'Чек-листи підготовки', text: 'Скоро', soon: true },
    ],
  },
  {
    title: 'Murly',
    items: [
      { href: '/pricing', icon: 'd-money', label: 'Тарифи', text: 'Почни безкоштовно' },
      { href: '/for-parents', icon: 'd-heart', label: 'Для батьків', text: 'Як Murly допомагає дитині' },
      { href: '/about', icon: 'c-cat', label: 'Про нас', text: 'Хто ми і навіщо Murly' },
      { href: '/contact', icon: 'd-phone', label: 'Контакти', text: 'Напиши нам' },
    ],
  },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('mu-noscroll');
    return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('mu-noscroll'); };
  }, [open]);

  return (
    <nav className={`mu-nav ${open ? 'is-open' : ''}`} aria-label="Головне меню">
      <div className="mu-nav__inner">
        <Link href="/" className="mu-logo" aria-label="Murly, на головну">
          MUR<span className="mu-logo__dot" />LY
        </Link>
        <div className="mu-nav__links">
          {TOP.map((l) => <Link key={l.href} href={l.href} className={path === l.href ? 'is-on' : ''}>{l.label}</Link>)}
        </div>
        <div className="mu-nav__cta">
          <SignedOut>
            <Link href="/sign-in" className="mu-nav__login mu-nav__desk">Увійти</Link>
            <Link href="/sign-up" className="mu-btn mu-btn--lime mu-nav__desk">
              Почати
              <span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="mu-btn mu-btn--lime">Мій кабінет</Link>
            <UserButton />
          </SignedIn>
          <button className="mu-menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mu-mega">
            <span className="mu-burger" aria-hidden="true"><span /><span /><span /></span>
            <span className="mu-menu-btn__txt">{open ? 'Закрити' : 'Меню'}</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="mu-mega" id="mu-mega">
          <div className="mu-mega__top">
            {TOP.map((l) => <Link key={l.href} href={l.href} className="g-chip" onClick={() => setOpen(false)}>{l.label}</Link>)}
          </div>
          <div className="mu-mega__grid">
            {MENU.map((g) => (
              <div key={g.title} className="mu-mega__col">
                <h3>{g.title}</h3>
                {g.items.map((it) => (
                  <Link key={it.label} href={it.href} className={`mu-mega__item ${it.soon ? 'is-soon' : ''}`} onClick={() => setOpen(false)}>
                    <span className="mu-mega__ic"><Icon id={it.icon} /></span>
                    <span><b>{it.label}</b><small>{it.text}</small></span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <SignedOut>
            <div className="mu-mega__auth">
              <Link href="/sign-in" className="mu-btn" onClick={() => setOpen(false)}>Увійти</Link>
              <Link href="/sign-up" className="mu-btn mu-btn--lime" onClick={() => setOpen(false)}>Почати безкоштовно<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
            </div>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
