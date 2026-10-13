'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Icon from './Icon';

export default function SiteNav() {
  return (
    <nav className="mu-nav">
      <div className="mu-nav__inner">
        <Link href="/" className="mu-logo">
          MUR<span className="mu-logo__dot" />LY
        </Link>
        <div className="mu-nav__links">
          <Link href="/#how">Як це працює</Link>
          <Link href="/for-teachers">Репетиторам</Link>
          <Link href="/pricing">Тарифи</Link>
          <Link href="/quiz/teen-life">Квізи</Link>
          <Link href="/irregular-verbs">Дієслова</Link>
        </div>
        <div className="mu-nav__cta">
          <SignedOut>
            <Link href="/sign-in" className="mu-nav__login">Увійти</Link>
            <Link href="/sign-up" className="mu-btn mu-btn--lime">
              Почати
              <span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="mu-nav__login">Кабінет</Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
