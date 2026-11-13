import type { Metadata } from 'next';
import Link from 'next/link';
import { tr } from '@/lib/i18n-server';
import { VERBS_AZ } from '@/lib/irregular-verbs';
import { localizeVerbs } from '@/lib/content/verbs';
import PrintButton from '@/components/PrintButton';

// Версія таблиці для друку і PDF: А4, дві колонки, без меню
export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Таблиця неправильних дієслів для друку (PDF) | Murly', ru: 'Таблица неправильных глаголов для печати (PDF) | Murly', en: 'Printable irregular verbs table (PDF) | Murly' }),
    description: t({ uk: 'Таблиця неправильних дієслів англійської мови для друку: 136 дієслів, три форми і переклад. Роздрукуй або збережи у PDF безкоштовно.', ru: 'Таблица неправильных глаголов английского языка для печати: 136 глаголов, три формы и перевод. Распечатай или сохрани в PDF бесплатно.', en: 'Printable English irregular verbs table: 136 verbs, three forms and translation. Print or save as PDF for free.' }),
    alternates: { canonical: '/irregular-verbs/print' },
  };
}

export default function PrintVerbs({ searchParams }: { searchParams: { top?: string } }) {
  const t = tr();
  const top = searchParams.top === '1';
  const all = localizeVerbs(VERBS_AZ, t.lang);
  const list = top ? all.filter((v) => v.top) : all;
  return (
    <main className="pv-page vp-page">
      <div className="vp-bar no-print">
        <Link href="/irregular-verbs" className="mu-textlink">← {t({ uk: 'До таблиці з озвучкою', ru: 'К таблице с озвучкой', en: 'Back to the table with audio' })}</Link>
        <span className="vp-bar__opts">
          <Link href="/irregular-verbs/print" className={`g-chip ${top ? '' : 'is-on'}`}>{t({ uk: `Усі ${all.length}`, ru: `Все ${all.length}`, en: `All ${all.length}` })}</Link>
          <Link href="/irregular-verbs/print?top=1" className={`g-chip ${top ? 'is-on' : ''}`}>{t({ uk: 'Тільки найважливіші', ru: 'Только самые важные', en: 'Most common only' })}</Link>
        </span>
        <PrintButton label={t({ uk: 'Роздрукувати або зберегти PDF', ru: 'Распечатать или сохранить PDF', en: 'Print or save as PDF' })} />
        <p className="vp-hint">{t({ uk: 'У вікні друку обери «Зберегти як PDF», щоб отримати файл.', ru: 'В окне печати выбери «Сохранить как PDF», чтобы получить файл.', en: 'In the print dialog choose “Save as PDF” to get a file.' })}</p>
      </div>
      <header className="vp-head">
        <h1>{t({ uk: 'Таблиця неправильних дієслів англійської мови', ru: 'Таблица неправильных глаголов английского языка', en: 'English irregular verbs table' })}</h1>
        <p>{t({ uk: 'V1 інфінітив · V2 Past Simple · V3 Past Participle · переклад', ru: 'V1 инфинитив · V2 Past Simple · V3 Past Participle · перевод', en: 'V1 infinitive · V2 past simple · V3 past participle · translation' })} · <b>murly.com.ua</b></p>
      </header>
      <table className="vp-table">
        <thead><tr><th>V1</th><th>V2</th><th>V3</th><th>{t({ uk: 'Переклад', ru: 'Перевод', en: 'Meaning' })}</th></tr></thead>
        <tbody>
          {list.map((v) => (
            <tr key={v.base} className={v.top ? 'is-top' : ''}><td><b>{v.base}</b></td><td>{v.past}</td><td>{v.pp}</td><td>{v.uk}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="vp-foot">{t({ uk: 'Жирним виділено найуживаніші дієслова. Озвучка, ігри й групи для запам’ятовування: murly.com.ua/irregular-verbs', ru: 'Жирным выделены самые употребительные глаголы. Озвучка, игры и группы для запоминания: murly.com.ua/irregular-verbs', en: 'Bold rows are the most common verbs. Audio, games and memory groups: murly.com.ua/irregular-verbs' })}</p>
    </main>
  );
}
