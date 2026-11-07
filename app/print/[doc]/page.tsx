import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { getDoc } from '@/lib/printables';
import { PRODUCTS } from '@/lib/shop';
import { orderByToken } from '@/lib/shop-server';
import { isOwnerTeacher } from '@/lib/ai-check';
import { tr } from '@/lib/i18n-server';
import PrintView from '@/components/shop/PrintView';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Murly', robots: { index: false, follow: false } };

export default async function PrintPage({ params, searchParams }: { params: { doc: string }; searchParams: { t?: string } }) {
  const t = tr();
  const lang = t.lang === 'ru' ? 'ru' : 'uk';
  const doc = getDoc(params.doc);
  let ok = false;
  if (doc && searchParams.t) {
    const o = await orderByToken(searchParams.t).catch(() => null);
    const p = o && PRODUCTS.find((x) => x.id === o.product);
    ok = Boolean(o && p && ['paid', 'sent'].includes(o.status) && p.docs.includes(doc.id));
  }
  if (doc && !ok) {
    const { userId } = await auth();
    ok = Boolean(userId && (await isOwnerTeacher(userId)));
  }
  if (!doc || !ok) {
    return (
      <main className="pv-denied">
        <h1>{t({ uk: 'Немає доступу', ru: 'Нет доступа', en: 'No access' })}</h1>
        <p>{t({ uk: 'Відкрий матеріал за посиланням з листа після покупки.', ru: 'Открой материал по ссылке из письма после покупки.', en: 'Open the material using the link from your purchase email.' })}</p>
        <Link href="/pricing#mini" className="mu-btn mu-btn--lime">{t({ uk: 'Матеріали Murly', ru: 'Материалы Murly', en: 'Murly materials' })}</Link>
      </main>
    );
  }
  return <PrintView doc={doc} lang={lang} />;
}
