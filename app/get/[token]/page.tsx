import type { Metadata } from 'next';
import Link from 'next/link';
import { getDoc } from '@/lib/printables';
import { getProduct } from '@/lib/shop';
import { orderByToken } from '@/lib/shop-server';
import { tr } from '@/lib/i18n-server';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Murly', robots: { index: false, follow: false } };

export default async function GetPage({ params }: { params: { token: string } }) {
  const t = tr();
  const o = await orderByToken(params.token).catch(() => null);
  const p = o && getProduct(o.product);
  const paid = Boolean(o && ['paid', 'sent'].includes(o.status));
  const lang = t.lang === 'ru' ? 'ru' : 'uk';
  return (
    <>
      <SiteNav />
      <section className="mu-section">
        <div className="mu-container shop-get">
          {!o || !p ? (
            <h1>{t({ uk: 'Посилання не знайдено', ru: 'Ссылка не найдена', en: 'Link not found' })}</h1>
          ) : !paid ? (
            <>
              <h1>{t(p.name)}</h1>
              <p>{t({ uk: 'Оплату ще не підтверджено. Щойно вона пройде, матеріали з’являться тут і прийдуть на пошту.', ru: 'Оплата ещё не подтверждена. Как только она пройдёт, материалы появятся здесь и придут на почту.', en: 'Payment is not confirmed yet. As soon as it is, the materials will appear here and in your inbox.' })}</p>
            </>
          ) : (
            <>
              <h1>{t(p.name)}</h1>
              <p className="t-muted">{t({ uk: 'Відкрий файл і натисни «Друк або PDF». Посилання діє завжди.', ru: 'Открой файл и нажми «Печать или PDF». Ссылка действует всегда.', en: 'Open a file and press “Print or PDF”. The link never expires.' })}</p>
              <ul className="shop-docs">
                {p.docs.map((id) => getDoc(id)).filter(Boolean).map((d) => (
                  <li key={d!.id}>
                    <div><b>{d!.title[lang]}</b>{d!.subtitle && <small>{d!.subtitle[lang]}</small>}</div>
                    <Link href={`/print/${d!.id}?t=${o.token}`} className="mu-btn mu-btn--lime t-btn-sm" target="_blank">{t({ uk: 'Відкрити', ru: 'Открыть', en: 'Open' })}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
