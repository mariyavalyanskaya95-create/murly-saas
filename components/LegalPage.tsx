import Link from 'next/link';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { tr } from '@/lib/i18n-server';
import { LEGAL } from '@/lib/legal-config';
import { DRAFT_NOTE, LEGAL_DOCS, UK_PREVAILS, fill, type LegalDocId } from '@/lib/legal';

// 2026-10-17 -> 17.10.2026
const fmtDate = (iso: string) => iso.split('-').reverse().join('.');

export default function LegalPage({ id }: { id: LegalDocId }) {
  const t = tr();
  const doc = LEGAL_DOCS[id];
  const others = Object.values(LEGAL_DOCS).filter((d) => d.id !== id);
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero mu-page-hero--legal">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="c-paw" />{t({ uk: 'Документи', ru: 'Документы', en: 'Legal' })}</span>
          <h1>{t(doc.title)}</h1>
          <p className="legal__updated">
            {t({ uk: 'Оновлено', ru: 'Обновлено', en: 'Updated' })}: {fmtDate(LEGAL.updated)}
          </p>
        </div>
      </section>

      <section className="mu-section legal">
        <div className="mu-container">
          <div className="legal__wrap">
            {!LEGAL.ready && (
              <div className="legal__note" role="note">{t(DRAFT_NOTE)}</div>
            )}

            <nav className="legal__toc" aria-label={t({ uk: 'Зміст', ru: 'Содержание', en: 'Contents' })}>
              <h2>{t({ uk: 'Зміст', ru: 'Содержание', en: 'Contents' })}</h2>
              <ol>
                {doc.sections.map((s, i) => (
                  <li key={s.title.uk}><a href={`#s${i + 1}`}>{t(s.title)}</a></li>
                ))}
              </ol>
            </nav>

            <ol className="legal__sections">
              {doc.sections.map((s, i) => (
                <li key={s.title.uk} id={`s${i + 1}`} className="legal__section">
                  <h2>{t(s.title)}</h2>
                  {s.paras.map((p, j) => (
                    <p key={j}>{fill(t(p))}</p>
                  ))}
                </li>
              ))}
            </ol>

            <p className="legal__lang">{t(UK_PREVAILS)}</p>

            <div className="legal__more">
              {others.map((d) => (
                <Link key={d.id} href={d.href}>{t(d.title)}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
