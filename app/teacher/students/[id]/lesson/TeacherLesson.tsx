'use client';
import Link from 'next/link';
import LessonRoom from '@/components/lesson-room/LessonRoom';
import type { LibItem, PageItem } from '@/components/board/Board';
import { useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

export default function TeacherLesson({ id, library, pages }: { id: string; library: LibItem[]; pages: PageItem[] }) {
  const t = useT();
  const { data, ready } = useTeacher();
  if (!ready) return null;
  const s = data.students.find((x) => x.id === id);
  if (!s) return <div className="t-page"><p className="t-empty">{t({ uk: 'Учня не знайдено', ru: 'Ученик не найден', en: 'Student not found' })}</p></div>;
  const files = data.notes.filter((n) => n.studentId === id).flatMap((n) => [...(n.files ?? []), ...(n.images ?? []).map((u, i) => ({ url: u, name: `${n.at.slice(0, 10)} · ${i + 1}.jpg` }))]);
  const words = data.words.filter((w) => w.studentId === id).map((w) => ({ en: w.en, uk: w.uk }));
  return (
    <div className="bd-page">
      <Link href={`/teacher/students/${id}`} className="t-back">← {s.name}</Link>
      <LessonRoom studentId={id} me={data.settings.name || t({ uk: 'Учитель', ru: 'Учитель', en: 'Teacher' })} teacher plans={data.plans} library={library} pages={pages} files={files} words={words}
        title={t({ uk: `Урок: ${s.name}`, ru: `Урок: ${s.name}`, en: `Lesson: ${s.name}` })} />
    </div>
  );
}
