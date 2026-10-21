import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import LessonPublic from '@/components/lesson/LessonPublic';
import { BATCH_1 } from '@/lib/lessons/batch-1';
import { BATCH_2 } from '@/lib/lessons/batch-2';
import { BATCH_3 } from '@/lib/lessons/batch-3';
import { BATCH_4 } from '@/lib/lessons/batch-4';
import { BATCH_5 } from '@/lib/lessons/batch-5';
import { BATCH_6 } from '@/lib/lessons/batch-6';
import { BATCH_7 } from '@/lib/lessons/batch-7';
import { BATCH_8 } from '@/lib/lessons/batch-8';
import { BATCH_9 } from '@/lib/lessons/batch-9';
import { localizeLesson } from '@/lib/content/lessons';
import { getLang } from '@/lib/i18n-server';
import { isTeacher } from '@/lib/student-data';

export const dynamic = 'force-dynamic';
const LESSONS = [...BATCH_1, ...BATCH_2, ...BATCH_3, ...BATCH_4, ...BATCH_5, ...BATCH_6, ...BATCH_7, ...BATCH_8, ...BATCH_9];
const find = (slug: string) => { const p = LESSONS.find((x) => x.id === `lib-${slug}`); return p ? localizeLesson(p, getLang()) : undefined; };

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = find(params.id);
  if (!p) return {};
  const aims = (p.aims ?? '').split('\n').filter(Boolean).slice(0, 2).join('. ');
  return { title: `${p.title} · ${p.level} | Murly`, description: aims || p.title, alternates: { canonical: `/lessons/${params.id}` } };
}

export default async function LessonPage({ params }: { params: { id: string } }) {
  const plan = find(params.id);
  if (!plan) notFound();
  const { userId } = await auth();
  let teacher = false;
  if (userId) {
    const [t, u] = await Promise.all([isTeacher(userId).catch(() => false), currentUser().catch(() => null)]);
    teacher = t || (u?.unsafeMetadata as { role?: string } | undefined)?.role === 'teacher';
  }
  return (
    <>
      <SiteNav />
      <main className="mu-container lp-wrap"><LessonPublic plan={plan} isTeacher={teacher} signedIn={!!userId} /></main>
      <SiteFooter />
      <Stickers />
    </>
  );
}
