import { LIBRARY } from '@/lib/library';
import { localizeLesson } from '@/lib/content/lessons';
import { tr } from '@/lib/i18n-server';
import TeacherBoard from './TeacherBoard';

// Дошка учня для вчителя: список готових уроків передаємо коротко (назва й рівень)
export default function Page({ params }: { params: { id: string } }) {
  const t = tr();
  const library = LIBRARY.map((p) => { const l = t.lang === 'uk' ? p : localizeLesson(p, t.lang); return { id: p.id, title: l.title, level: p.level }; });
  return <TeacherBoard id={params.id} library={library} />;
}
