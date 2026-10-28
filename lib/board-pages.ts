// Сторінки Murly, які можна відкрити вікном на дошці (без готових уроків: вони вставляються текстом)
import { catalog } from './catalog';
import { SKILLS } from './skills';
import type { Lang } from './i18n';

export function boardPages(lang: Lang) {
  const seen = new Set<string>();
  const label = (id: string) => { const s = SKILLS.find((x) => x.id === id); return s ? (s.label[lang] ?? s.label.uk) : id; };
  const out: { title: string; href: string; group: string }[] = [
    { title: lang === 'en' ? 'Irregular verbs: table' : lang === 'ru' ? 'Неправильные глаголы: таблица' : 'Неправильні дієслова: таблиця', href: '/irregular-verbs/table', group: label('grammar') },
  ];
  for (const it of catalog(lang)) {
    if (it.href.startsWith('/lessons/') || seen.has(it.href)) continue;
    seen.add(it.href);
    out.push({ title: `${it.title}${it.level !== 'all' ? ` · ${it.level}` : ''}`, href: it.href, group: label(it.skill) });
  }
  return out;
}
