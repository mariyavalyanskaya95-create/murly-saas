'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Icon from './Icon';
import NavSearch from './NavSearch';
import { LangSwitch, useT } from './LangProvider';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

// Головні розділи: видно завжди
const TOP: { href: string; label: T }[] = [
  { href: '/#students', label: { uk: 'Учням', ru: 'Ученикам', en: 'Students' } },
  { href: '/for-teachers', label: { uk: 'Вчителям', ru: 'Учителям', en: 'Teachers' } },
  { href: '/for-parents', label: { uk: 'Батькам', ru: 'Родителям', en: 'Parents' } },
  { href: '/nmt', label: { uk: 'НМТ', ru: 'НМТ', en: 'NMT exam' } },
  { href: '/games', label: { uk: 'Ігри', ru: 'Игры', en: 'Games' } },
];

// Усе, що є на сайті: відкривається кнопкою «Меню»
const MENU: { title: T; items: { href: string; icon: string; label: T; text: T; soon?: boolean }[] }[] = [
  {
    title: { uk: 'Вчитися самому', ru: 'Учиться самому', en: 'Learn on your own' },
    items: [
      { href: '/learn', icon: 'd-spark', label: { uk: 'Усі матеріали', ru: 'Все материалы', en: 'All materials' }, text: { uk: 'За навичками й рівнем A1-C1', ru: 'По навыкам и уровню A1-C1', en: 'By skill and level A1-C1' } },
      { href: '/stories', icon: 'e-head', label: { uk: 'Читати і слухати', ru: 'Читать и слушать', en: 'Read and listen' }, text: { uk: 'Історії, аудіо, аудіосеріали', ru: 'Истории, аудио, аудиосериалы', en: 'Stories, audio, audio series' } },
      { href: '/grammar', icon: 'e-abc', label: { uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' }, text: { uk: '52 теми і тренажери на 100 завдань', ru: '52 темы и тренажёры на 100 заданий', en: '52 topics and 100-task trainers' } },
      { href: '/irregular-verbs', icon: 'e-book', label: { uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' }, text: { uk: 'Таблиця з озвучкою, картки й ігри', ru: 'Таблица с озвучкой, карточки и игры', en: 'Voiced table, cards and games' } },
      { href: '/games', icon: 'd-rocket', label: { uk: 'Ігри', ru: 'Игры', en: 'Games' }, text: { uk: 'Квест, 3D-містечко, дієслова', ru: 'Квест, 3D-городок, глаголы', en: 'Quest, 3D town, verbs' } },
    ],
  },
  {
    title: { uk: 'НМТ', ru: 'НМТ', en: 'NMT exam' },
    items: [
      { href: '/nmt', icon: 'e-trophy', label: { uk: 'НМТ з англійської', ru: 'НМТ по английскому', en: 'NMT English exam' }, text: { uk: 'Квізи у форматі іспиту', ru: 'Квизы в формате экзамена', en: 'Quizzes in the exam format' } },
      { href: '/nmt/mock', icon: 'e-board', label: { uk: 'Пробний НМТ', ru: 'Пробный НМТ', en: 'Mock NMT test' }, text: { uk: 'З поясненнями «Чому так?»', ru: 'С объяснениями «Почему так?»', en: 'With «Why?» explanations' } },
      { href: '/bonus/nmt-checklist', icon: 'e-pencil', label: { uk: 'НМТ-батл і вправи', ru: 'НМТ-батл и упражнения', en: 'NMT battle and drills' }, text: { uk: 'Безкоштовно: сталі вирази, хибні друзі', ru: 'Бесплатно: устойчивые выражения, ложные друзья', en: 'Free: collocations, false friends' } },
    ],
  },
  {
    title: { uk: 'З учителем', ru: 'С учителем', en: 'With a teacher' },
    items: [
      { href: '/#code', icon: 'd-lock', label: { uk: 'Є код від учителя?', ru: 'Есть код от учителя?', en: 'Have a teacher code?' }, text: { uk: 'Приєднатися і бачити домашку', ru: 'Присоединиться и видеть домашку', en: 'Join and see your homework' } },
      { href: '/for-teachers', icon: 'd-team', label: { uk: 'Для вчителів', ru: 'Для учителей', en: 'For teachers' }, text: { uk: 'Учні, розклад, домашка, дошка', ru: 'Ученики, расписание, домашка, доска', en: 'Students, schedule, homework, board' } },
      { href: '/lessons', icon: 'e-board', label: { uk: 'Готові уроки', ru: 'Готовые уроки', en: 'Ready-made lessons' }, text: { uk: 'Версія учня і версія вчителя', ru: 'Версия ученика и версия учителя', en: 'Student’s and teacher’s versions' } },
    ],
  },
  {
    title: { uk: 'Murly', ru: 'Murly', en: 'Murly' },
    items: [
      { href: '/for-parents', icon: 'd-heart', label: { uk: 'Для батьків', ru: 'Для родителей', en: 'For parents' }, text: { uk: 'Як записати дитину і бачити прогрес', ru: 'Как записать ребёнка и видеть прогресс', en: 'Sign your child up, see progress' } },
      { href: '/pricing', icon: 'd-money', label: { uk: 'Тарифи', ru: 'Тарифы', en: 'Pricing' }, text: { uk: 'Почни безкоштовно', ru: 'Начни бесплатно', en: 'Start for free' } },
      { href: '/about', icon: 'c-cat', label: { uk: 'Про нас', ru: 'О нас', en: 'About us' }, text: { uk: 'Хто ми і навіщо Murly', ru: 'Кто мы и зачем Murly', en: 'Who we are and why Murly' } },
      { href: '/contact', icon: 'd-phone', label: { uk: 'Контакти', ru: 'Контакты', en: 'Contact' }, text: { uk: 'Напиши нам', ru: 'Напиши нам', en: 'Write to us' } },
    ],
  },
];

export default function SiteNav() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const closeSearch = useCallback(() => setSearch(false), []);
  const path = usePathname();
  useEffect(() => { setOpen(false); setSearch(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('mu-noscroll');
    return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('mu-noscroll'); };
  }, [open]);

  return (
    <nav className={`mu-nav ${open ? 'is-open' : ''} ${search ? 'is-search' : ''}`} aria-label={t({ uk: 'Головне меню', ru: 'Главное меню', en: 'Main menu' })}>
      <div className="mu-nav__inner">
        <Link href="/" className="mu-logo" aria-label={t({ uk: 'Murly, на головну', ru: 'Murly, на главную', en: 'Murly, home' })}>
          MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY
        </Link>
        <div className="mu-nav__links">
          {TOP.map((l) => <Link key={l.href} href={l.href} className={path === l.href ? 'is-on' : ''}>{t(l.label)}</Link>)}
        </div>
        <div className="mu-nav__cta">
          <NavSearch open={search} onOpen={() => { setSearch(true); setOpen(false); }} onClose={closeSearch} />
          <LangSwitch className="mu-nav__desk" />
          <SignedOut>
            <Link href="/sign-in" className="mu-nav__login mu-nav__desk">{t({ uk: 'Увійти', ru: 'Войти', en: 'Log in' })}</Link>
            <Link href="/sign-up" className="mu-btn mu-btn--lime mu-nav__desk">
              {t({ uk: 'Почати', ru: 'Начать', en: 'Start' })}
              <span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="mu-btn mu-btn--lime mu-nav__cab"><span className="mu-nav__cab-l">{t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My dashboard' })}</span><span className="mu-nav__cab-s">{t({ uk: 'Кабінет', ru: 'Кабинет', en: 'Account' })}</span></Link>
            <UserButton />
          </SignedIn>
          <button className="mu-menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mu-mega">
            <span className="mu-burger" aria-hidden="true"><span /><span /><span /></span>
            <span className="mu-menu-btn__txt">{open ? t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' }) : t({ uk: 'Меню', ru: 'Меню', en: 'Menu' })}</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="mu-mega" id="mu-mega">
          <div className="mu-mega__top">
            <LangSwitch />
            {TOP.map((l) => <Link key={l.href} href={l.href} className="g-chip" onClick={() => setOpen(false)}>{t(l.label)}</Link>)}
          </div>
          <div className="mu-mega__grid">
            {MENU.map((g) => (
              <div key={g.title.uk} className="mu-mega__col">
                <h3>{t(g.title)}</h3>
                {g.items.map((it) => (
                  <Link key={it.label.uk} href={it.href} className={`mu-mega__item ${it.soon ? 'is-soon' : ''}`} onClick={() => setOpen(false)}>
                    <span className="mu-mega__ic"><Icon id={it.icon} /></span>
                    <span><b>{t(it.label)}</b><small>{t(it.text)}</small></span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <SignedOut>
            <div className="mu-mega__auth">
              <Link href="/sign-in" className="mu-btn" onClick={() => setOpen(false)}>{t({ uk: 'Увійти', ru: 'Войти', en: 'Log in' })}</Link>
              <Link href="/sign-up" className="mu-btn mu-btn--lime" onClick={() => setOpen(false)}>{t({ uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
            </div>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
