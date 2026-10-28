import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { tr } from '@/lib/i18n-server';
import { getEnrollments } from '@/lib/student-data';
import BoardLazy from '@/components/board/BoardLazy';
import { boardPages } from '@/lib/board-pages';

export const dynamic = 'force-dynamic';

// Дошка учня: та сама, що бачить учитель
export default async function StudentBoard({ searchParams }: { searchParams: { s?: string } }) {
  const t = tr();
  const { userId } = await auth();
  const en = userId ? await getEnrollments(userId, t.lang).catch(() => []) : [];
  const e = en.find((x) => x.studentId === searchParams.s) ?? en[0];
  if (!e) return <div className="t-page"><p className="t-empty">{t({ uk: 'Дошка з’явиться, коли учитель додасть тебе.', ru: 'Доска появится, когда учитель добавит тебя.', en: 'The board appears once your teacher adds you.' })}</p></div>;
  return (
    <div className="bd-page">
      <Link href="/student" className="t-back">← {t({ uk: 'Мій кабінет', ru: 'Мой кабинет', en: 'My account' })}</Link>
      <BoardLazy studentId={e.studentId} pages={boardPages(t.lang)} files={e.materials.flatMap((m) => m.files)} words={e.words.map((w) => ({ en: w.en, uk: w.uk }))} title={t({ uk: 'Наша дошка', ru: 'Наша доска', en: 'Our board' })} />
    </div>
  );
}
