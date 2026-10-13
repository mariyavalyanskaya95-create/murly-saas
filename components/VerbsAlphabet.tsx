'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import { VERBS_AZ, Verb } from '@/lib/irregular-verbs';

const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Озвучка через вбудований синтез мови браузера (британська вимова, якщо є)
function useSpeech() {
  const [ok, setOk] = useState(false);
  const voice = useRef<SpeechSynthesisVoice | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const pickVoice = () => {
      const vs = window.speechSynthesis.getVoices();
      voice.current = vs.find((v) => v.lang === 'en-GB') ?? vs.find((v) => v.lang.startsWith('en')) ?? null;
    };
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
    setOk(true);
  }, []);
  const say = (text: string) => {
    if (!ok) return;
    const u = new SpeechSynthesisUtterance(text.replace(/ \/ /g, ', '));
    u.lang = voice.current?.lang ?? 'en-GB';
    if (voice.current) u.voice = voice.current;
    u.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };
  return { ok, say };
}

function Word({ text, say, ok, strong }: { text: string; say: (t: string) => void; ok: boolean; strong?: boolean }) {
  if (!ok) return strong ? <b>{text}</b> : <span>{text}</span>;
  return (
    <button className={`va-word ${strong ? 'is-strong' : ''}`} onClick={() => say(text)} aria-label={`Послухати: ${text}`}>
      {text}<Icon id="e-speak" className="mu-ic va-word__ic" />
    </button>
  );
}

export default function VerbsAlphabet() {
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
        <nav className="va-abc" aria-label="Алфавіт">
          {ABC.map((L) => groups.has(L)
            ? <a key={L} href={`#letter-${L}`}>{L}</a>
            : <span key={L} aria-hidden="true">{L}</span>)}
        </nav>
        <div className="v-table__bar" style={{ marginBottom: 0 }}>
          <label className="v-search">
            <Icon id="d-seo" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Пошук: go, went, бачити…" aria-label="Пошук дієслова" />
          </label>
          <button className={`g-chip ${topOnly ? 'is-on' : ''}`} onClick={() => setTopOnly(!topOnly)} aria-pressed={topOnly}>
            Найчастіші
          </button>
          <span className="v-count">{count} дієслів</span>
        </div>
      </div>

      {!ok && <p className="va-note">Твій браузер не підтримує озвучку, але таблиця працює.</p>}

      <div className="va-list">
        <div className="va-row va-row--head" aria-hidden="true">
          <span>Infinitive</span><span>Past Simple</span><span>Past Participle</span><span>Переклад</span><span />
        </div>
        {Array.from(groups.entries()).map(([L, verbs]) => (
          <section key={L} id={`letter-${L}`} className="va-group">
            <h2 className="va-letter">{L}</h2>
            {verbs.map((v) => (
              <div key={v.base} className="va-row">
                <span data-label="Infinitive"><Word text={v.base} say={say} ok={ok} strong />{v.top && <span className="v-top" title="Одне з найчастіших">★</span>}</span>
                <span data-label="Past Simple"><Word text={v.past} say={say} ok={ok} /></span>
                <span data-label="Past Participle"><Word text={v.pp} say={say} ok={ok} /></span>
                <span className="v-uk">{v.uk}</span>
                <span>{ok && <button className="va-all" onClick={() => sayAll(v)} aria-label={`Послухати всі три форми ${v.base}`}><Icon id="e-mic" /></button>}</span>
              </div>
            ))}
          </section>
        ))}
        {!count && <p className="v-empty">Нічого не знайшли. Спробуй іншу форму слова.</p>}
      </div>
    </div>
  );
}
