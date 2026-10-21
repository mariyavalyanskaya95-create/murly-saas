// Список уроків: бібліотеку Murly готуємо на сервері (легкі картки трьома мовами), щоб сторінка вантажилась швидко
import LessonsClient from '@/components/teacher/LessonsClient';
import { toCard, type PlanCardData } from '@/lib/plan-card';
import { LIBRARY } from '@/lib/library';
import { localizeLesson } from '@/lib/content/lessons';
import type { Lang } from '@/lib/i18n';

export default function LessonsPage() {
  const cards = (lang: Lang) => localizeLesson(LIBRARY, lang).map(toCard);
  const libCards: Record<Lang, PlanCardData[]> = { uk: cards('uk'), ru: cards('ru'), en: cards('en') };
  return <LessonsClient libCards={libCards} />;
}
