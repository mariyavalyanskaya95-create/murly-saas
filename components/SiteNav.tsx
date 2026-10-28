'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Icon from './Icon';
import { LangSwitch, useT } from './LangProvider';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';
import { SKILLS, type SkillId } from '@/lib/skills';

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
      { href: '/series', icon: 'e-head', label: { uk: 'Аудіосеріали', ru: 'Аудиосериалы', en: 'Audio series' }, text: { uk: 'Історії з продовженням і голосами', ru: 'Истории с продолжением и голосами', en: 'Stories in episodes with voices' } },
      { href: '/games', icon: 'd-rocket', label: { uk: 'Ігри', ru: 'Игры', en: 'Games' }, text: { uk: '3D-містечко, дієслова, квізи, скоромовки', ru: '3D-городок, глаголы, квизы, скороговорки', en: '3D town, verbs, quizzes, tongue twisters' } },
    ],
  },
  {
    title: { uk: 'З учителем', ru: 'С учителем', en: 'With a teacher' },
    items: [
      { href: '/for-teachers', icon: 'd-team', label: { uk: 'Кабінет вчителя', ru: 'Кабинет учителя', en: 'Teacher dashboard' }, text: { uk: 'Учні, розклад, уроки, домашка', ru: 'Ученики, расписание, уроки, домашка', en: 'Students, schedule, lessons, homework' } },
      { href: '/lessons', icon: 'e-board', label: { uk: 'Готові уроки', ru: 'Готовые уроки', en: 'Ready-made lessons' }, text: { uk: 'Версія учня і версія вчителя', ru: 'Версия ученика и версия учителя', en: 'Student’s and teacher’s versions' } },
      { href: '/#students', icon: 'd-kid', label: { uk: 'Кабінет учня', ru: 'Кабинет ученика', en: 'Student dashboard' }, text: { uk: 'Домашка, слова, монетки', ru: 'Домашка, слова, монетки', en: 'Homework, words, coins' } },
      { href: '/#code', icon: 'd-lock', label: { uk: 'Є код від учителя?', ru: 'Есть код от учителя?', en: 'Have a teacher code?' }, text: { uk: 'Приєднатися до свого вчителя', ru: 'Присоединиться к своему учителю', en: 'Join your teacher' } },
    ],
  },
  {
    title: { uk: 'Іспити', ru: 'Экзамены', en: 'Exams' },
    items: [
      { href: '/nmt', icon: 'e-trophy', label: { uk: 'НМТ з англійської', ru: 'НМТ по английскому', en: 'NMT English exam' }, text: { uk: 'Квізи у форматі іспиту', ru: 'Квизы в формате экзамена', en: 'Quizzes in the exam format' } },
      { href: '/nmt/mock', icon: 'e-board', label: { uk: 'Пробний НМТ', ru: 'Пробный НМТ', en: 'Mock NMT test' }, text: { uk: 'З поясненнями «Чому так?»', ru: 'С объяснениями «Почему так?»', en: 'With «Why?» explanations' } },
      { href: '/pricing#mini', icon: 'e-pencil', label: { uk: 'Чек-листи підготовки', ru: 'Чек-листы подготовки', en: 'Exam checklists' }, text: { uk: 'Дешевше, ніж кава', ru: 'Дешевле, чем кофе', en: 'Cheaper than a coffee' } },
    ],
  },
  {
    title: { uk: 'Murly', ru: 'Murly', en: 'Murly' },
    items: [
      { href: '/pricing', icon: 'd-money', label: { uk: 'Тарифи', ru: 'Тарифы', en: 'Pricing' }, text: { uk: 'Почни безкоштовно', ru: 'Начни бесплатно', en: 'Start for free' } },
      { href: '/for-parents', icon: 'd-heart', label: { uk: 'Для батьків', ru: 'Для родителей', en: 'For parents' }, text: { uk: 'Як Murly допомагає дитині', ru: 'Как Murly помогает ребёнку', en: 'How Murly helps your child' } },
      { href: '/about', icon: 'c-cat', label: { uk: 'Про нас', ru: 'О нас', en: 'About us' }, text: { uk: 'Хто ми і навіщо Murly', ru: 'Кто мы и зачем Murly', en: 'Who we are and why Murly' } },
      { href: '/contact', icon: 'd-phone', label: { uk: 'Контакти', ru: 'Контакты', en: 'Contact' }, text: { uk: 'Напиши нам', ru: 'Напиши нам', en: 'Write to us' } },
    ],
  },
];

export default function SiteNav() {
  const t = useT();
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
    <nav className={`mu-nav ${open ? 'is-open' : ''}`} aria-label={t({ uk: 'Головне меню', ru: 'Главное меню', en: 'Main menu' })}>
      <div className="mu-nav__inner">
        <Link href="/" className="mu-logo" aria-label={t({ uk: 'Murly, на головну', ru: 'Murly, на главную', en: 'Murly, home' })}>
          MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY
        </Link>
        <div className="mu-nav__links">
          {TOP.map((l) => <Link key={l.href} href={l.href} className={path === l.href ? 'is-on' : ''}>{t(l.label)}</Link>)}
        </div>
        <div className="mu-nav__cta">
          <LangSwitch className="mu-nav__desk" />
          <SignedOut>
            <Link href="/sign-in" className="mu-nav__login mu-nav__desk">{t({ uk: 'Увійти', ru: 'Войти', en: 'Log in' })}</Link>
            <Link href="/sign-up" className="mu-btn mu-btn--lime mu-nav__desk">
              {t({ uk: 'Почати', ru: 'Начать', en: 'Start' })}
              <span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="mu-btn mu-btn--lime">{t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My dashboard' })}</Link>
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
              <div key={g.title.uk} className={`mu-mega__col ${g.title.uk === 'Вчитися самому' ? 'mu-mega__col--skills' : ''}`}>
                <h3>{t(g.title)}</h3>
                {g.title.uk === 'Вчитися самому' && <SkillMenu onGo={() => setOpen(false)} />}
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

// Як у British Council: ліворуч навичка, праворуч її рівні A1-C1
function SkillMenu({ onGo }: { onGo: () => void }) {
  const t = useT();
  const [cur, setCur] = useState<SkillId>('reading');
  const sk = SKILLS.find((x) => x.id === cur)!;
  return (
    <div className="sk-menu">
      <ul className="sk-menu__list" role="list">
        {SKILLS.map((x) => (
          <li key={x.id}>
            <button type="button" className={`sk-menu__skill ${cur === x.id ? 'is-on' : ''}`} onMouseEnter={() => setCur(x.id)} onFocus={() => setCur(x.id)} onClick={() => setCur(x.id)} aria-expanded={cur === x.id}>
              <Icon id={x.icon} /><span>{t(x.label)}</span><span className="sk-menu__arrow" aria-hidden="true">›</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="sk-menu__levels">
        <Link href={`/learn/${sk.id}`} className="sk-menu__all" onClick={onGo}>{t(sk.label)}: {t({ uk: 'усі рівні', ru: 'все уровни', en: 'all levels' })}</Link>
        {sk.levels.map((l) => <Link key={l} href={`/learn/${sk.id}?level=${l}`} className="sk-menu__lv" onClick={onGo}>{l} {t(sk.label).toLowerCase()}</Link>)}
        <Link href="/learn" className="sk-menu__hub" onClick={onGo}>{t({ uk: 'Усі навички', ru: 'Все навыки', en: 'All skills' })} →</Link>
      </div>
    </div>
  );
}
