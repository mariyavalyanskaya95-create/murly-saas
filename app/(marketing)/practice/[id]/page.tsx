import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import LessonView from '@/components/lesson/LessonView';
import { PRACTICE } from '@/lib/practice';
import { localizeLesson } from '@/lib/content/lessons';
import { getLang } from '@/lib/i18n-server';
import { tr } from '@/lib/i18n-server';

export const dynamicParams = false;
const find = (slug: string) => { const p = PRACTICE.find((x) => x.id === `lib-${slug}`); return p ? localizeLesson(p, getLang()) : p; };

export function generateStaticParams() {
  return PRACTICE.map((p) => ({ id: p.id.replace(/^lib-/, '') }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = find(params.id);
  if (!p) return {};
  const kind = (p.focus ?? []).includes('Listening') ? 'Listening' : 'Reading';
  const t = tr();
  const aim = p.aims?.split('\n')[0] ?? '';
  return {
    title: `${p.title}: ${kind} ${p.level} | Murly`,
    description: t({ uk: `${kind} англійською, рівень ${p.level}. ${aim}`, ru: `${kind} на английском, уровень ${p.level}. ${aim}`, en: `English ${kind}, level ${p.level}. ${aim}` }),
    alternates: { canonical: `/practice/${params.id}` },
  };
}

export default function PracticeItemPage({ params }: { params: { id: string } }) {
  const p = find(params.id);
  if (!p) notFound();
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-section" style={{ paddingTop: 40 }}>
        <div className="mu-container">
          <Link href="/practice" className="t-back">← {t({ uk: 'Уся практика', ru: 'Вся практика', en: 'All practice' })}</Link>
          <div className="t-card le-view" style={{ marginTop: 14 }}>
            <LessonView plan={p} submitLabel={t({ uk: 'Перевірити', ru: 'Проверить', en: 'Check' })} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
