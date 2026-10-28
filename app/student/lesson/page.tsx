import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { tr } from '@/lib/i18n-server';
import { getEnrollments } from '@/lib/student-data';
import { boardPages } from '@/lib/board-pages';
import LessonRoom from '@/components/lesson-room/LessonRoom';

export const dynamic = 'force-dynamic';

// Урок для учня: відео й дошка на одній сторінці
export default async function StudentLesson({ searchParams }: { searchParams: { s?: string } }) {
  const t = tr();
  const { userId } = await auth();
  const en = userId ? await getEnrollments(userId, t.lang).catch(() => []) : [];
  const e = en.find((x) => x.studentId === searchParams.s) ?? en[0];
  if (!e) return <div className="t-page"><p className="t-empty">{t({ uk: 'Урок з’явиться, коли учитель додасть тебе.', ru: 'Урок появится, когда учитель добавит тебя.', en: 'The lesson appears once your teacher adds you.' })}</p></div>;
  return (
    <div className="bd-page">
      <Link href="/student" className="t-back">← {t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' })}</Link>
      <LessonRoom studentId={e.studentId} me={e.name} pages={boardPages(t.lang)} files={e.materials.flatMap((m) => m.files)} words={e.words.map((w) => ({ en: w.en, uk: w.uk }))} title={t({ uk: 'Урок', ru: 'Урок', en: 'Lesson' })} />
    </div>
  );
}
