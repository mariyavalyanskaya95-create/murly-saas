import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import MockTest from '@/components/mock/MockTest';
import { getMock } from '@/lib/mock';
import { tr } from '@/lib/i18n-server';

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const t = tr();
  return {
    title: t({ uk: `Пробний НМТ з англійської, варіант ${params.id}`, ru: `Пробный НМТ по английскому, вариант ${params.id}`, en: `NMT English mock test ${params.id}` }),
    alternates: { canonical: `/nmt/mock/${params.id}` },
  };
}

export default function MockPage({ params }: { params: { id: string } }) {
  const t = tr();
  const v = getMock(params.id);
  if (!v) notFound();
  return (
    <>
      <SiteNav />
      <main className="mu-container" style={{ padding: '28px 0 60px' }}>
        <p className="muted" style={{ margin: '0 0 6px' }}><Link href="/nmt/mock">{t({ uk: 'Пробний НМТ', ru: 'Пробный НМТ', en: 'Mock NMT' })}</Link> / {t({ uk: `Варіант ${v.id}`, ru: `Вариант ${v.id}`, en: `Test ${v.id}` })}</p>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(28px, 4vw, 44px)' }}>{t({ uk: `Пробний НМТ з англійської, варіант ${v.id}`, ru: `Пробный НМТ по английскому, вариант ${v.id}`, en: `NMT English mock test ${v.id}` })}</h1>
        <MockTest v={v} />
      </main>
      <SiteFooter />
    </>
  );
}
