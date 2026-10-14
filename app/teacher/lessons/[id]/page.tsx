import PlanPage from '@/components/lesson/PlanPage';

export default function LessonPlanPage({ params }: { params: { id: string } }) {
  return <PlanPage id={params.id} />;
}
