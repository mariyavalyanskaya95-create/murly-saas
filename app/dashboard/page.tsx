import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { isStudent, isTeacher } from '@/lib/student-data';

export const dynamic = 'force-dynamic';

// Розводимо по кабінетах: учень без своїх учнів іде в /student, решта в /teacher
export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const [student, teacher] = await Promise.all([isStudent(userId).catch(() => false), isTeacher(userId).catch(() => false)]);
  redirect(student && !teacher ? '/student' : '/teacher');
}
