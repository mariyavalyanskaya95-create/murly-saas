import type { Metadata } from 'next';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import TeacherShell from '@/components/teacher/TeacherShell';
import { tr } from '@/lib/i18n-server';
import { isTeacher } from '@/lib/student-data';

export async function generateMetadata(): Promise<Metadata> {
  const t = tr();
  return {
    title: t({ uk: 'Кабінет вчителя | Murly', ru: 'Кабинет учителя | Murly', en: 'Teacher dashboard | Murly' }),
    robots: { index: false, follow: false },
  };
}

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const t = tr();
  const user = await currentUser();
  // учень, який випадково відкрив кабінет вчителя, іде у свій кабінет; без ролі питаємо, хто ти
  const role = (user?.unsafeMetadata as { role?: string } | undefined)?.role;
  if (role !== 'teacher') {
    const t0 = await isTeacher(userId).catch(() => true);
    if (!t0) redirect(role === 'student' ? '/student' : '/welcome');
  }
  const name = user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || t({ uk: 'Вчитель', ru: 'Учитель', en: 'Teacher' });
  return <TeacherShell userId={userId} name={name}>{children}</TeacherShell>;
}
