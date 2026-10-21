import PlanPage from '@/components/lesson/PlanPage';
import { getLibraryPlan } from '@/lib/library';
import { localizeLesson } from '@/lib/content/lessons';

// Урок бібліотеки віддаємо з сервера (лише цей один урок трьома мовами), свої уроки вчителя PlanPage бере зі сховища
export default function LessonPlanPage({ params }: { params: { id: string } }) {
  const p = params.id.startsWith('lib-') ? getLibraryPlan(params.id) : undefined;
  const libPlans = p ? { uk: p, ru: localizeLesson(p, 'ru'), en: localizeLesson(p, 'en') } : undefined;
  return <PlanPage id={params.id} libPlans={libPlans} />;
}
