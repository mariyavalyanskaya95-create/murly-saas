// Вкладки розділу: схожі сторінки зібрані в одну групу, щоб учень сам обирав підвкладку, а не шукав по меню
import Link from 'next/link';
import Icon from './Icon';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';

type Tab = { href: string; icon: string; label: T };
export const GROUPS: Record<'read' | 'grammar', { title: T; tabs: Tab[] }> = {
  // один вхід «Вчитися самому»: усе для самостійних занять у вкладках
  read: {
    title: { uk: 'Вчитися самому', ru: 'Учиться самому', en: 'Learn on your own' },
    tabs: [
      { href: '/learn', icon: 'd-spark', label: { uk: 'За навичками й рівнем', ru: 'По навыкам и уровню', en: 'By skill and level' } },
      { href: '/stories', icon: 'e-book', label: { uk: 'Історії й тексти', ru: 'Истории и тексты', en: 'Stories and texts' } },
      { href: '/practice', icon: 'e-head', label: { uk: 'Аудіо з питаннями', ru: 'Аудио с вопросами', en: 'Audio with questions' } },
      { href: '/series', icon: 'e-head', label: { uk: 'Аудіосеріали', ru: 'Аудиосериалы', en: 'Audio series' } },
      { href: '/grammar', icon: 'e-abc', label: { uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' } },
      { href: '/tongue-twisters', icon: 'e-speak', label: { uk: 'Скоромовки', ru: 'Скороговорки', en: 'Tongue twisters' } },
    ],
  },
  grammar: {
    title: { uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' },
    tabs: [
      { href: '/grammar', icon: 'e-abc', label: { uk: 'Правила', ru: 'Правила', en: 'Rules' } },
      { href: '/grammar/trainer', icon: 'e-trophy', label: { uk: 'Тренажери на 100 завдань', ru: 'Тренажёры на 100 заданий', en: '100-task trainers' } },
      { href: '/irregular-verbs', icon: 'e-book', label: { uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' } },
      { href: '/irregular-verbs/games', icon: 'd-cup', label: { uk: 'Ігри з дієсловами', ru: 'Игры с глаголами', en: 'Verb games' } },
    ],
  },
};

export default function SectionTabs({ group, active }: { group: keyof typeof GROUPS; active: string }) {
  const t = tr();
  const g = GROUPS[group];
  return (
    <nav className="sec-tabs" aria-label={t(g.title)}>
      <div className="mu-container sec-tabs__in">
        <span className="sec-tabs__title">{t(g.title)}</span>
        {g.tabs.map((x) => (
          <Link key={x.href} href={x.href} className={`sec-tab ${active === x.href ? 'is-on' : ''}`} aria-current={active === x.href ? 'page' : undefined}>
            <Icon id={x.icon} />{t(x.label)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
