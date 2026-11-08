import type { Metadata } from 'next';
import Link from 'next/link';
import { alt } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PrintButton from '@/components/shop/PrintButton';
import { tr } from '@/lib/i18n-server';
import { VERBS, type Verb } from '@/lib/irregular-verbs';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Плакат неправильних дієслів PDF для друку безкоштовно', ru: 'Плакат неправильных глаголов PDF для печати бесплатно', en: 'Irregular verbs poster: free printable PDF' }),
    description: t({ uk: `Таблиця ${VERBS.length} неправильних дієслів англійської на одному аркуші A4 з перекладом. Кольори за групами форм. Безкоштовно: друкуй або зберігай як PDF.`, ru: `Таблица ${VERBS.length} неправильных глаголов английского на одном листе A4 с переводом. Цвета по группам форм. Бесплатно: печатай или сохраняй как PDF.`, en: `${VERBS.length} English irregular verbs on one A4 sheet with translations, colour-coded by pattern. Free to print or save as PDF.` }),
    alternates: alt('/irregular-verbs/poster'),
  };
}

const kind = (v: Verb) => {
  const p = v.past.split(' / ')[0], pp = v.pp.split(' / ')[0];
  if (v.base === p && p === pp) return 'aaa';
  if (p === pp) return 'abb';
  if (v.base === pp) return 'aba';
  return 'abc';
};

export default function PosterPage() {
  const t = tr();
  const verbs = [...VERBS].sort((a, b) => a.base.localeCompare(b.base));
  const cols = [0, 1, 2].map((i) => verbs.slice(Math.ceil((verbs.length / 3) * i), Math.ceil((verbs.length / 3) * (i + 1))));
  return (
    <>
      <SiteNav />
      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="pv-bar no-print" style={{ maxWidth: 1000 }}>
            <div>
              <h1 style={{ margin: 0 }}>{t({ uk: 'Плакат неправильних дієслів', ru: 'Плакат неправильных глаголов', en: 'Irregular verbs poster' })}</h1>
              <p className="t-muted" style={{ margin: '4px 0 0' }}>{t({ uk: 'Безкоштовно. Натисни «Друк», у вікні друку можна обрати «Зберегти як PDF».', ru: 'Бесплатно. Нажми «Печать», в окне печати можно выбрать «Сохранить как PDF».', en: 'Free. Press Print; in the print dialog you can choose Save as PDF.' })}</p>
            </div>
            <PrintButton label={t({ uk: 'Друк або PDF', ru: 'Печать или PDF', en: 'Print or PDF' })} />
          </div>
          <article className="pv-page ivp">
            <header className="ivp-head">
              <b>Irregular verbs</b>
              <span className="ivp-legend">
                <i className="k-aaa">A-A-A</i><i className="k-aba">A-B-A</i><i className="k-abb">A-B-B</i><i className="k-abc">A-B-C</i>
              </span>
              <span className="pv-logo">murly.com.ua</span>
            </header>
            <div className="ivp-cols">
              {cols.map((c, i) => (
                <table key={i} className="ivp-t">
                  <thead><tr><th>V1</th><th>V2</th><th>V3</th><th>{t({ uk: 'переклад', ru: 'перевод', en: 'meaning' })}</th></tr></thead>
                  <tbody>{c.map((v) => <tr key={v.base} className={`k-${kind(v)}`}><td><b>{v.base}</b></td><td>{v.past}</td><td>{v.pp}</td><td>{v.uk}</td></tr>)}</tbody>
                </table>
              ))}
            </div>
            <footer className="ivp-foot">{t({ uk: 'Озвучка всіх форм і ігри: murly.com.ua/irregular-verbs', ru: 'Озвучка всех форм и игры: murly.com.ua/irregular-verbs', en: 'Audio for every form and games: murly.com.ua/irregular-verbs' })}</footer>
          </article>
          <p className="no-print" style={{ maxWidth: 1000, margin: '20px auto' }}>
            <Link href="/irregular-verbs">{t({ uk: 'Таблиця з озвучкою', ru: 'Таблица с озвучкой', en: 'Table with audio' })}</Link> · <Link href="/irregular-verbs/games">{t({ uk: 'Ігри з дієсловами', ru: 'Игры с глаголами', en: 'Verb games' })}</Link> · <Link href="/shop/verbs-30">{t({ uk: 'Картки й план на 30 днів', ru: 'Карточки и план на 30 дней', en: 'Cards and a 30-day plan' })}</Link>
          </p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
