'use client';
import { useMemo, useState } from 'react';
import Icon from './Icon';
import { useT } from './LangProvider';
import { VERBS_AZ as VERBS_AZ_UK, Verb } from '@/lib/irregular-verbs';
import { localizeVerbs } from '@/lib/content/verbs';
import { say as speak } from '@/lib/speak';

const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Озвучка живим голосом (Google, з кешу); якщо недоступний, голос браузера
const verbSpeech = (text: string) => text.replace(/ \/ /g, ', ');
function useSpeech() {
  const say = (text: string) => { speak(verbSpeech(text), { voice: 'narrator' }); };
  return { ok: true, say };
}

function Word({ text, say, ok, strong }: { text: string; say: (t: string) => void; ok: boolean; strong?: boolean }) {
  const t = useT();
  if (!ok) return strong ? <b>{text}</b> : <span>{text}</span>;
  return (
    <button className={`va-word ${strong ? 'is-strong' : ''}`} onClick={() => say(text)} aria-label={`${t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}: ${text}`}>
      {text}<Icon id="e-head" className="mu-ic va-word__ic" />
    </button>
  );
}

export default function VerbsAlphabet() {
  const t = useT();
  const VERBS_AZ = localizeVerbs(VERBS_AZ_UK, t.lang);
  const { ok, say } = useSpeech();
  const [q, setQ] = useState('');
  const [topOnly, setTopOnly] = useState(false);

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = VERBS_AZ.filter((v) => (!topOnly || v.top) &&
      (!s || [v.base, v.past, v.pp, v.uk].some((f) => f.toLowerCase().includes(s))));
    const map = new Map<string, Verb[]>();
    list.forEach((v) => {
      const L = v.base[0].toUpperCase();
      map.set(L, [...(map.get(L) ?? []), v]);
    });
    return map;
  }, [q, topOnly]);

  const count = Array.from(groups.values()).reduce((n, g) => n + g.length, 0);
  const sayAll = (v: Verb) => say(`${v.base}. ${v.past}. ${v.pp}`);

  return (
    <div className="va">
      <div className="va-bar">
        <nav className="va-abc" aria-label={t({ uk: 'Алфавіт', ru: 'Алфавит', en: 'Alphabet' })}>
          {ABC.map((L) => groups.has(L)
            ? <a key={L} href={`#letter-${L}`}>{L}</a>
            : <span key={L} aria-hidden="true">{L}</span>)}
        </nav>
        <div className="v-table__bar" style={{ marginBottom: 0 }}>
          <label className="v-search">
            <Icon id="d-seo" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder={t({ uk: 'Пошук: go, went, бачити…', ru: 'Поиск: go, went, видеть…', en: 'Search: go, went, see…' })} aria-label={t({ uk: 'Пошук дієслова', ru: 'Поиск глагола', en: 'Search for a verb' })} />
          </label>
          <button className={`g-chip ${topOnly ? 'is-on' : ''}`} onClick={() => setTopOnly(!topOnly)} aria-pressed={topOnly}>
            {t({ uk: 'Найчастіші', ru: 'Самые частые', en: 'Most common' })}
          </button>
          <span className="v-count">{count} {t({ uk: 'дієслів', ru: 'глаголов', en: 'verbs' })}</span>
        </div>
      </div>

      {!ok && <p className="va-note">{t({ uk: 'Твій браузер не підтримує озвучку, але таблиця працює.', ru: 'Твой браузер не поддерживает озвучку, но таблица работает.', en: 'Your browser doesn’t support audio, but the table still works.' })}</p>}

      <div className="va-list">
        <div className="va-row va-row--head" aria-hidden="true">
          <span>Infinitive</span><span>Past Simple</span><span>Past Participle</span><span>{t({ uk: 'Переклад', ru: 'Перевод', en: 'Translation' })}</span><span />
        </div>
        {Array.from(groups.entries()).map(([L, verbs]) => (
          <section key={L} id={`letter-${L}`} className="va-group">
            <h2 className="va-letter">{L}</h2>
            {verbs.map((v) => (
              <div key={v.base} className="va-row">
                <span data-label="Infinitive"><Word text={v.base} say={say} ok={ok} strong />{v.top && <span className="v-top" title={t({ uk: 'Одне з найчастіших', ru: 'Один из самых частых', en: 'One of the most common' })}>★</span>}</span>
                <span data-label="Past Simple"><Word text={v.past} say={say} ok={ok} /></span>
                <span data-label="Past Participle"><Word text={v.pp} say={say} ok={ok} /></span>
                <span className="v-uk">{v.uk}</span>
                <span>{ok && <button className="va-all" onClick={() => sayAll(v)} aria-label={`${t({ uk: 'Послухати всі три форми', ru: 'Послушать все три формы', en: 'Listen to all three forms of' })} ${v.base}`}><Icon id="e-head" /></button>}</span>
              </div>
            ))}
          </section>
        ))}
        {!count && <p className="v-empty">{t({ uk: 'Нічого не знайшли. Спробуй іншу форму слова.', ru: 'Ничего не нашли. Попробуй другую форму слова.', en: 'Nothing found. Try another form of the word.' })}</p>}
      </div>
    </div>
  );
}
