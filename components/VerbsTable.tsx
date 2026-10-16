'use client';
import { useMemo, useState } from 'react';
import Icon from './Icon';
import { useT } from './LangProvider';
import { CORE_VERBS } from '@/lib/irregular-verbs';
import { localizeVerbs } from '@/lib/content/verbs';

export default function VerbsTable() {
  const t = useT();
  const VERBS = localizeVerbs(CORE_VERBS, t.lang);
  const [q, setQ] = useState('');
  const [topOnly, setTopOnly] = useState(false);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return VERBS.filter((v) => (!topOnly || v.top) &&
      (!s || [v.base, v.past, v.pp, v.uk].some((f) => f.toLowerCase().includes(s))));
  }, [q, topOnly]);

  return (
    <div className="v-table">
      <div className="v-table__bar">
        <label className="v-search">
          <Icon id="d-seo" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder={t({ uk: 'Пошук: go, went, бачити…', ru: 'Поиск: go, went, видеть…', en: 'Search: go, went, see…' })} aria-label={t({ uk: 'Пошук дієслова', ru: 'Поиск глагола', en: 'Search for a verb' })} />
        </label>
        <button className={`g-chip ${topOnly ? 'is-on' : ''}`} onClick={() => setTopOnly(!topOnly)} aria-pressed={topOnly}>
          {t({ uk: 'Найчастіші', ru: 'Самые частые', en: 'Most common' })}
        </button>
        <span className="v-count">{rows.length} {t({ uk: 'дієслів', ru: 'глаголов', en: 'verbs' })}</span>
      </div>
      <div className="v-table__wrap">
        <table>
          <thead>
            <tr><th>Infinitive</th><th>Past Simple</th><th>Past Participle</th><th>{t({ uk: 'Переклад', ru: 'Перевод', en: 'Translation' })}</th></tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.base}>
                <td><b>{v.base}</b>{v.top && <span className="v-top" title={t({ uk: 'Одне з найчастіших', ru: 'Один из самых частых', en: 'One of the most common' })}>★</span>}</td>
                <td>{v.past}</td>
                <td>{v.pp}</td>
                <td className="v-uk">{v.uk}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="v-empty">{t({ uk: 'Нічого не знайшли. Спробуй іншу форму слова.', ru: 'Ничего не нашли. Попробуй другую форму слова.', en: 'Nothing found. Try another form of the word.' })}</p>}
      </div>
    </div>
  );
}
