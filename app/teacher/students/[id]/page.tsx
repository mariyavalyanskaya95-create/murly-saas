import StudentCard from '@/components/teacher/StudentCard';

export default function StudentPage({ params }: { params: { id: string } }) {
  return <StudentCard id={params.id} />;
}
