// Карта сайту: усі публічні сторінки трьома мовами (uk без параметра, ru/en з ?lang=)
import type { MetadataRoute } from 'next';
import { ACTIVITIES } from '@/lib/activities';
import { PRACTICE } from '@/lib/practice';
import { DRILLS } from '@/lib/drills';
import { GRAMMAR } from '@/lib/grammar';
import { PLAN_PAGES } from '@/lib/plan-pages';
import { ALL_STORIES } from '@/lib/stories';
import { MOCKS } from '@/lib/mock';
import { SERIES } from '@/lib/series';
import { SKILLS } from '@/lib/skills';
import { BATCH_1 } from '@/lib/lessons/batch-1';
import { BATCH_2 } from '@/lib/lessons/batch-2';
import { BATCH_3 } from '@/lib/lessons/batch-3';
import { BATCH_4 } from '@/lib/lessons/batch-4';
import { BATCH_5 } from '@/lib/lessons/batch-5';
import { BATCH_6 } from '@/lib/lessons/batch-6';
import { BATCH_7 } from '@/lib/lessons/batch-7';
import { BATCH_8 } from '@/lib/lessons/batch-8';
import { BATCH_9 } from '@/lib/lessons/batch-9';
import { SITE_URL } from '@/lib/seo';

const STATIC: [string, number][] = [
  ['/', 1], ['/nmt', 0.9], ['/nmt/mock', 0.9], ['/irregular-verbs', 0.9], ['/irregular-verbs/games', 0.7],
  ['/grammar', 0.9], ['/grammar/trainer', 0.8], ['/activities', 0.9], ['/for-teachers', 0.9], ['/for-parents', 0.8], ['/baby-english', 0.8],
  ['/pricing', 0.8], ['/lessons', 0.8], ['/learn', 0.7], ['/practice', 0.7], ['/stories', 0.7], ['/series', 0.7], ['/games', 0.7],
  ['/tongue-twisters', 0.6], ['/worlds', 0.5], ['/about', 0.5], ['/contact', 0.4],
  ['/bonus/nmt-checklist', 0.6], ['/bonus/100-words', 0.6], ['/bonus/verbs-30', 0.6],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lessons = [...BATCH_1, ...BATCH_2, ...BATCH_3, ...BATCH_4, ...BATCH_5, ...BATCH_6, ...BATCH_7, ...BATCH_8, ...BATCH_9];
  const dyn: [string, number][] = [
    ...ACTIVITIES.map((a) => [`/activities/${a.slug}`, 0.7] as [string, number]),
    ...GRAMMAR.map((g) => [`/grammar/${g.slug}`, 0.7] as [string, number]),
    ...DRILLS.map((d) => [`/grammar/trainer/${d.slug}`, 0.7] as [string, number]),
    ...PRACTICE.map((p) => [`/practice/${p.id.replace(/^lib-/, '')}`, 0.5] as [string, number]),
    ...PLAN_PAGES.map((p) => [`/pricing/${p.slug}`, 0.6] as [string, number]),
    ...ALL_STORIES.map((s) => [`/stories/${s.id}`, 0.5] as [string, number]),
    ...MOCKS.map((m) => [`/nmt/mock/${m.id}`, 0.8] as [string, number]),
    ...SERIES.flatMap((s) => [[`/series/${s.slug}`, 0.6] as [string, number], ...s.episodes.map((e) => [`/series/${s.slug}/${e.n}`, 0.5] as [string, number])]),
    ...SKILLS.map((s) => [`/learn/${s.id}`, 0.6] as [string, number]),
    ...lessons.map((l) => [`/lessons/${l.id.replace(/^lib-/, '')}`, 0.6] as [string, number]),
  ];
  const now = new Date();
  const u = (p: string, l?: string) => `${SITE_URL}${p}${l ? `?lang=${l}` : ''}`;
  return [...STATIC, ...dyn].map(([path, priority]) => ({
    url: u(path),
    lastModified: now,
    changeFrequency: 'weekly',
    priority,
    alternates: { languages: { 'uk-UA': u(path), 'ru-UA': u(path, 'ru'), en: u(path, 'en') } },
  }));
}
