'use client';
import { useMemo, useState } from 'react';
import Icon from './Icon';
import { VERBS } from '@/lib/irregular-verbs';

export default function VerbsTable() {
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
            placeholder="Пошук: go, went, бачити…" aria-label="Пошук дієслова" />
        </label>
        <button className={`g-chip ${topOnly ? 'is-on' : ''}`} onClick={() => setTopOnly(!topOnly)} aria-pressed={topOnly}>
          Найчастіші
        </button>
        <span className="v-count">{rows.length} дієслів</span>
      </div>
      <div className="v-table__wrap">
        <table>
          <thead>
            <tr><th>Infinitive</th><th>Past Simple</th><th>Past Participle</th><th>Переклад</th></tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.base}>
                <td><b>{v.base}</b>{v.top && <span className="v-top" title="Одне з найчастіших">★</span>}</td>
                <td>{v.past}</td>
                <td>{v.pp}</td>
                <td className="v-uk">{v.uk}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="v-empty">Нічого не знайшли. Спробуй іншу форму слова.</p>}
      </div>
    </div>
  );
}
