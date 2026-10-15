'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Icon from './Icon';

const LINKS = [
  { href: '/practice', label: 'Практика' },
  { href: '/for-teachers', label: 'Репетиторам' },
  { href: '/pricing', label: 'Тарифи' },
  { href: '/quiz/teen-life', label: 'Квізи' },
  { href: '/grammar', label: 'Граматика' },
  { href: '/irregular-verbs', label: 'Дієслова' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <nav className={`mu-nav ${open ? 'is-open' : ''}`} aria-label="Головне меню">
      <div className="mu-nav__inner">
        <Link href="/" className="mu-logo">
          MUR<span className="mu-logo__dot" />LY
        </Link>
        <div className="mu-nav__links">
          {LINKS.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>
        <div className="mu-nav__cta">
          <SignedOut>
            <Link href="/sign-in" className="mu-nav__login mu-nav__desk">Увійти</Link>
            <Link href="/sign-up" className="mu-btn mu-btn--lime">
              Почати
              <span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="mu-nav__login">Кабінет</Link>
            <UserButton />
          </SignedIn>
          <button className="mu-burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mu-menu" aria-label={open ? 'Закрити меню' : 'Відкрити меню'}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <div className="mu-menu" id="mu-menu">
          {LINKS.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}
          <SignedOut>
            <Link href="/sign-in" className="mu-menu__login" onClick={() => setOpen(false)}>Увійти</Link>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
