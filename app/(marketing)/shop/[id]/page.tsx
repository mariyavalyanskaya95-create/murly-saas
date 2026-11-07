import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { alt } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Icon from '@/components/Icon';
import BuyForm from '@/components/shop/BuyForm';
import { tr } from '@/lib/i18n-server';
import { PRODUCTS, getProduct } from '@/lib/shop';
import { getDoc } from '@/lib/printables';

export function generateStaticParams() { return PRODUCTS.map((p) => ({ id: p.id })); }

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = getProduct(params.id); const t = tr();
  if (!p) return {};
  return { title: `${t(p.name)}: ${t({ uk: 'матеріал для друку', ru: 'материал для печати', en: 'printable' })} | Murly`, description: t(p.text), alternates: alt(`/shop/${p.id}`) };
}

export default function ShopProductPage({ params }: { params: { id: string } }) {
  const p = getProduct(params.id);
  if (!p) notFound();
  const t = tr();
  const lang = t.lang === 'ru' ? 'ru' : 'uk';
  const docs = p.docs.map((id) => getDoc(id)).filter(Boolean);
  const others = PRODUCTS.filter((x) => x.id !== p.id && x.who === p.who).slice(0, 3);
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 8 }}>
        <div className="mu-container shop-head">
          <Link href="/pricing#mini" className="t-back">← {t({ uk: 'Усі матеріали', ru: 'Все материалы', en: 'All materials' })}</Link>
          <span className="shop-ic"><Icon id={p.icon} /></span>
          <h1>{t(p.name)}</h1>
          <p className="shop-lead">{t(p.text)}</p>
          <p className="shop-price">{p.old && <s>{p.old} ₴</s>} {p.price} ₴ <small>{t({ uk: 'один раз, без підписки', ru: 'один раз, без подписки', en: 'one-time, no subscription' })}</small></p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container shop-body">
          <h2>{t({ uk: 'Що всередині', ru: 'Что внутри', en: 'What’s inside' })}</h2>
          <ul className="shop-docs">
            {docs.map((d) => (
              <li key={d!.id}><div><b>{d!.title[lang]}</b>{d!.subtitle && <small>{d!.subtitle[lang]}</small>}</div>{d!.level && <span className="gr-level">{d!.level}</span>}</li>
            ))}
          </ul>
          <BuyForm product={p.id} price={p.price} />
          {others.length > 0 && (
            <>
              <h2>{t({ uk: 'Ще матеріали', ru: 'Ещё материалы', en: 'More materials' })}</h2>
              <div className="shop-more">{others.map((x) => <Link key={x.id} href={`/shop/${x.id}`} className="shop-more__card"><b>{t(x.name)}</b><span>{x.price} ₴</span></Link>)}</div>
            </>
          )}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
