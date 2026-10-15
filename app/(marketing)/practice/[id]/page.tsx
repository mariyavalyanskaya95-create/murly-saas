import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import LessonView from '@/components/lesson/LessonView';
import { PRACTICE } from '@/lib/practice';

export const dynamicParams = false;
const find = (slug: string) => PRACTICE.find((p) => p.id === `lib-${slug}`);

export function generateStaticParams() {
  return PRACTICE.map((p) => ({ id: p.id.replace(/^lib-/, '') }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = find(params.id);
  if (!p) return {};
  const kind = (p.focus ?? []).includes('Listening') ? 'Listening' : 'Reading';
  return {
    title: `${p.title}: ${kind} ${p.level} | Murly`,
    description: `${kind} англійською, рівень ${p.level}. ${p.aims?.split('\n')[0] ?? ''}`,
    alternates: { canonical: `/practice/${params.id}` },
  };
}

export default function PracticeItemPage({ params }: { params: { id: string } }) {
  const p = find(params.id);
  if (!p) notFound();
  return (
    <>
      <SiteNav />
      <section className="mu-section" style={{ paddingTop: 40 }}>
        <div className="mu-container">
          <Link href="/practice" className="t-back">← Уся практика</Link>
          <div className="t-card le-view" style={{ marginTop: 14 }}>
            <LessonView plan={p} submitLabel="Перевірити" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
