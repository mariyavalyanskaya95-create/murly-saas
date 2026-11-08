import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { alt, absUrl, SITE_URL } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Icon from '@/components/Icon';
import BuyForm from '@/components/shop/BuyForm';
import Faq from '@/components/Faq';
import { tr } from '@/lib/i18n-server';
import { PRODUCTS, getProduct } from '@/lib/shop';
import { getShopSeo, FREE_LINKS } from '@/lib/shop-seo';
import { getDoc } from '@/lib/printables';

export function generateStaticParams() { return PRODUCTS.map((p) => ({ id: p.id })); }

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = getProduct(params.id); const t = tr();
  if (!p) return {};
  const s = getShopSeo(p.id);
  const base = s ? t(s.title) : '';
  const title = s ? (base.length <= 52 ? `${base} | Murly` : base) : `${t(p.name)}: ${t({ uk: 'матеріал для друку', ru: 'материал для печати', en: 'printable' })} | Murly`;
  const description = s ? t(s.desc) : t(p.text);
  return { title, description, alternates: alt(`/shop/${p.id}`), openGraph: { title, description, type: 'website', siteName: 'Murly', url: `/shop/${p.id}` } };
}

export default function ShopProductPage({ params }: { params: { id: string } }) {
  const p = getProduct(params.id);
  if (!p) notFound();
  const t = tr();
  const lang = t.lang === 'ru' ? 'ru' : 'uk';
  const s = getShopSeo(p.id);
  const docs = p.docs.map((id) => getDoc(id)).filter(Boolean);
  const others = PRODUCTS.filter((x) => x.id !== p.id && x.who === p.who).slice(0, 3);
  const free = (s?.free ?? []).filter((h) => FREE_LINKS[h]);
  const url = absUrl(`/shop/${p.id}`, t.lang);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: t(p.name),
        description: s ? t(s.desc) : t(p.text),
        brand: { '@type': 'Brand', name: 'Murly' },
        url,
        offers: { '@type': 'Offer', price: String(p.price), priceCurrency: 'UAH', availability: 'https://schema.org/PreOrder', url, seller: { '@id': `${SITE_URL}/#org` } },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Murly', item: absUrl('/', t.lang) },
          { '@type': 'ListItem', position: 2, name: t({ uk: 'Матеріали для друку', ru: 'Материалы для печати', en: 'Printables' }), item: absUrl('/pricing', t.lang) },
          { '@type': 'ListItem', position: 3, name: t(p.name), item: url },
        ],
      },
    ],
  };
  return (
    <>
      <SiteNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="mu-page-hero" style={{ paddingBottom: 8 }}>
        <div className="mu-container shop-head">
          <Link href="/pricing#mini" className="t-back">← {t({ uk: 'Усі матеріали', ru: 'Все материалы', en: 'All materials' })}</Link>
          <span className="shop-ic"><Icon id={p.icon} /></span>
          <h1>{t(p.name)}</h1>
          <p className="shop-lead">{t(p.text)}</p>
          <p className="shop-price">{p.old && <s>{p.old} ₴</s>} {p.price} ₴ <small>{t({ uk: 'один раз, без підписки', ru: 'один раз, без подписки', en: 'one-time, no subscription' })}</small></p>
          {s && <p className="shop-intro">{t(s.intro)}</p>}
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container shop-body">
          {free.length > 0 && (
            <div className="shop-free">
              <h2>{t({ uk: 'Почни безкоштовно', ru: 'Начни бесплатно', en: 'Start for free' })}</h2>
              <ul>
                {free.map((h) => (
                  <li key={h}><Link href={h}>{t(FREE_LINKS[h].label)}</Link><small>{t(FREE_LINKS[h].note)}</small></li>
                ))}
              </ul>
            </div>
          )}
          <h2>{t({ uk: 'Що всередині', ru: 'Что внутри', en: 'What’s inside' })}</h2>
          <ul className="shop-docs">
            {docs.map((d) => (
              <li key={d!.id}><div><b>{d!.title[lang]}</b>{d!.subtitle && <small>{d!.subtitle[lang]}</small>}</div>{d!.level && <span className="gr-level">{d!.level}</span>}</li>
            ))}
          </ul>
          <BuyForm product={p.id} price={p.price} />
          {s && (
            <div className="shop-cols">
              <div>
                <h2>{t({ uk: 'Для кого', ru: 'Для кого', en: 'Who it’s for' })}</h2>
                <ul className="mu-ticks">{s.who.map((x) => <li key={x.uk}>{t(x)}</li>)}</ul>
              </div>
              <div>
                <h2>{t({ uk: 'Як користуватися', ru: 'Как пользоваться', en: 'How to use it' })}</h2>
                <ol>{s.how.map((x) => <li key={x.uk}>{t(x)}</li>)}</ol>
              </div>
            </div>
          )}
          {s && s.faq.length > 0 && (
            <>
              <h2>{t({ uk: 'Питання й відповіді', ru: 'Вопросы и ответы', en: 'Questions and answers' })}</h2>
              <Faq items={s.faq.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
            </>
          )}
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
