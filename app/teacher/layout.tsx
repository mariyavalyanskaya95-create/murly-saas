import type { Metadata } from 'next';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import TeacherShell from '@/components/teacher/TeacherShell';

export const metadata: Metadata = {
  title: 'Кабінет вчителя | Murly',
  robots: { index: false, follow: false },
};

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const user = await currentUser();
  const name = user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'Вчитель';
  return <TeacherShell userId={userId} name={name}>{children}</TeacherShell>;
}
