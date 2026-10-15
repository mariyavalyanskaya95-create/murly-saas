import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { isStudent, isTeacher } from '@/lib/student-data';

export const dynamic = 'force-dynamic';

// Розводимо по кабінетах: учень (за базою або за роллю при реєстрації) іде в /student, вчитель у /teacher
export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const [student, teacher, user] = await Promise.all([isStudent(userId).catch(() => false), isTeacher(userId).catch(() => false), currentUser().catch(() => null)]);
  const role = (user?.unsafeMetadata as { role?: string } | undefined)?.role;
  redirect(!teacher && (student || role === 'student') ? '/student' : '/teacher');
}
