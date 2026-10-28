'use client';
import Link from 'next/link';
import BoardLazy from '@/components/board/BoardLazy';
import type { LibItem, PageItem } from '@/components/board/Board';
import { useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

export default function TeacherBoard({ id, library, pages }: { id: string; library: LibItem[]; pages: PageItem[] }) {
  const t = useT();
  const { data, ready } = useTeacher();
  if (!ready) return null;
  const s = data.students.find((x) => x.id === id);
  if (!s) return <div className="t-page"><p className="t-empty">{t({ uk: 'Учня не знайдено', ru: 'Ученик не найден', en: 'Student not found' })}</p></div>;
  // файли, які вчитель додавав у «Що було на уроці»
  const files = data.notes.filter((n) => n.studentId === id).flatMap((n) => [...(n.files ?? []), ...(n.images ?? []).map((u, i) => ({ url: u, name: `${n.at.slice(0, 10)} · ${i + 1}.jpg` }))]);
  const words = data.words.filter((w) => w.studentId === id).map((w) => ({ en: w.en, uk: w.uk }));
  return (
    <div className="bd-page">
      <Link href={`/teacher/students/${id}`} className="t-back">← {s.name}</Link>
      {!s.joined && <p className="t-muted bd-note">{t({ uk: 'Учень ще не має кабінету. Дошка збережеться, і він побачить її, щойно увійде.', ru: 'У ученика ещё нет кабинета. Доска сохранится, и он увидит её, как только войдёт.', en: 'The student has no account yet. The board is saved and they will see it once they log in.' })}</p>}
      <BoardLazy studentId={id} teacher plans={data.plans} library={library} words={words} pages={pages} files={files} title={t({ uk: `Дошка: ${s.name}`, ru: `Доска: ${s.name}`, en: `Board: ${s.name}` })} />
    </div>
  );
}
