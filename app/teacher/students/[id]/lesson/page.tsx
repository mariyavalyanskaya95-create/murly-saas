import { LIBRARY } from '@/lib/library';
import { localizeLesson } from '@/lib/content/lessons';
import { tr } from '@/lib/i18n-server';
import { boardPages } from '@/lib/board-pages';
import TeacherLesson from './TeacherLesson';

export default function Page({ params }: { params: { id: string } }) {
  const t = tr();
  const library = LIBRARY.map((p) => { const l = t.lang === 'uk' ? p : localizeLesson(p, t.lang); return { id: p.id, title: l.title, level: p.level }; });
  return <TeacherLesson id={params.id} library={library} pages={boardPages(t.lang)} />;
}
