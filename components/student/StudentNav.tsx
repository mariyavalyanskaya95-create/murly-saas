'use client';
// Меню кабінету учня: іконки, підсвічений поточний розділ і кнопка «Як користуватися»
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from '../Icon';
import Tour, { startTour } from '../Tour';
import { useT } from '../LangProvider';
import { STUDENT_TOUR } from '@/lib/tours';

export default function StudentNav({ any, nmt, games }: { any: boolean; nmt: boolean; games: boolean }) {
  const t = useT();
  const path = usePathname();
  const [hash, setHash] = useState('');
  useEffect(() => { const h = () => setHash(window.location.hash); h(); window.addEventListener('hashchange', h); return () => window.removeEventListener('hashchange', h); }, []);
  const items = [
    { href: '/student', icon: 'd-smile', label: { uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' }, on: path === '/student' && !hash },
    ...(any ? [
      { href: '/student#homework', icon: 'e-pencil', label: { uk: 'Домашка', ru: 'Домашка', en: 'Homework' }, on: path === '/student' && hash === '#homework' },
      { href: '/student#words', icon: 'e-abc', label: { uk: 'Мій словник', ru: 'Мой словарь', en: 'My dictionary' }, on: path === '/student' && hash === '#words' },
    ] : []),
    ...(nmt ? [{ href: '/nmt/mock', icon: 'e-cap', label: { uk: 'Пробні НМТ', ru: 'Пробные НМТ', en: 'Mock NMT' }, on: false }] : []),
    { href: '/grammar', icon: 'e-book', label: { uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' }, on: false },
    { href: '/irregular-verbs', icon: 'd-cup', label: { uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' }, on: false },
    { href: '/learn', icon: 'e-head', label: { uk: 'Усі матеріали', ru: 'Все материалы', en: 'All materials' }, on: false },
    ...(games ? [{ href: '/games', icon: 'e-trophy', label: { uk: 'Ігри', ru: 'Игры', en: 'Games' }, on: false }] : []),
  ];
  return (
    <>
      <nav className="s-nav" aria-label={t({ uk: 'Розділи', ru: 'Разделы', en: 'Sections' })}>
        {items.map((x) => (
          <Link key={x.href} href={x.href} className={x.on ? 'is-on' : ''} aria-current={x.on ? 'page' : undefined}><Icon id={x.icon} />{t(x.label)}</Link>
        ))}
        <button type="button" className="s-nav__help" onClick={() => startTour('student')}><Icon id="d-bulb" />{t({ uk: 'Як користуватися', ru: 'Как пользоваться', en: 'How to use' })}</button>
      </nav>
      <Tour id="student" steps={STUDENT_TOUR} />
    </>
  );
}
