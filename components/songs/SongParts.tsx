'use client';
// Пісні: відео за кліком, картки виразів з озвучкою, міні-квіз «що означає вираз»
import { useMemo, useState } from 'react';
import { useT } from '../LangProvider';
import { say } from '@/lib/speak';
import type { Song } from '@/lib/songs';

export function SongVideo({ yt, title }: { yt: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="sg-video">
      {on
        ? <iframe src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        : <button type="button" className="sg-video__cover" onClick={() => setOn(true)} aria-label={`Play: ${title}`} style={{ backgroundImage: `url(https://i.ytimg.com/vi/${yt}/hqdefault.jpg)` }}><span className="sg-video__play" aria-hidden="true" /></button>}
    </div>
  );
}

export function SongPhrases({ song }: { song: Song }) {
  const t = useT();
  return (
    <div className="sg-phrases">
      {song.phrases.map((p) => (
        <div key={p.en} className="sg-phrase">
          <button type="button" className="sg-phrase__en" onClick={() => say(p.en)}>{p.en}</button>
          <p className="sg-phrase__m">{t(p.m)}</p>
          <p className="sg-phrase__ex"><button type="button" className="mu-textlink" onClick={() => say(p.ex, { slow: true })}>{t({ uk: 'Слухати', ru: 'Слушать', en: 'Listen' })}</button> {p.ex}</p>
        </div>
      ))}
    </div>
  );
}

export function SongQuiz({ song }: { song: Song }) {
  const t = useT();
  const qs = useMemo(() => song.phrases.map((p, i) => {
    const others = song.phrases.filter((_, k) => k !== i).sort(() => Math.random() - 0.5).slice(0, 2);
    const opts = [p, ...others].sort(() => Math.random() - 0.5);
    return { p, opts };
  }), [song]);
  const [ans, setAns] = useState<Record<number, string>>({});
  const right = qs.filter((q, i) => ans[i] === q.p.en).length;
  const done = Object.keys(ans).length === qs.length;
  return (
    <div className="sg-quiz">
      {qs.map((q, i) => (
        <div key={q.p.en} className="sg-q">
          <p><b>{t(q.p.m)}</b></p>
          <div className="sg-q__opts">
            {q.opts.map((o) => {
              const picked = ans[i] === o.en; const ok = o.en === q.p.en;
              return <button key={o.en} type="button" disabled={i in ans} className={`sr-chip ${i in ans && ok ? 'is-ok' : ''} ${picked && !ok ? 'is-bad' : ''}`} onClick={() => { setAns((a) => ({ ...a, [i]: o.en })); if (ok) say(o.en); }}>{o.en}</button>;
            })}
          </div>
        </div>
      ))}
      {done && <p className="sg-quiz__res">{t({ uk: `Правильно ${right} з ${qs.length}.`, ru: `Правильно ${right} из ${qs.length}.`, en: `${right} of ${qs.length} correct.` })} <button type="button" className="mu-textlink" onClick={() => setAns({})}>{t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Again' })}</button></p>}
    </div>
  );
}

type VocabGroup = { group: { uk: string; ru: string; en: string }; items: { en: string; uk: string; ru: string; ex: string }[] };
export function SongVocab({ groups }: { groups: VocabGroup[] }) {
  const t = useT();
  return (
    <div className="sg-vocab">
      {groups.map((g) => (
        <div key={g.group.en} className="sg-vgroup">
          <h3>{t(g.group)}</h3>
          <div className="sg-vgrid">
            {g.items.map((w) => (
              <div key={w.en} className="sg-word">
                <button type="button" className="sg-word__en" onClick={() => say(w.en)}>{w.en}</button>
                <span className="sg-word__tr">{t.lang === 'ru' ? w.ru : t.lang === 'en' ? '' : w.uk}</span>
                <button type="button" className="sg-word__ex" onClick={() => say(w.ex, { slow: true })}>{w.ex}</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SongChoice({ items }: { items: { q: string; opts: string[]; a: string }[] }) {
  const t = useT();
  const [ans, setAns] = useState<Record<number, string>>({});
  const right = items.filter((x, i) => ans[i] === x.a).length;
  return (
    <div className="sg-quiz">
      {items.map((x, i) => (
        <div key={i} className="sg-q">
          <p>{i + 1}. {x.q.split('___').map((p, k, a) => <span key={k}>{p}{k < a.length - 1 && <span className="lt-gap">{i in ans ? x.a : '___'}</span>}</span>)}</p>
          <div className="sg-q__opts">
            {x.opts.map((o) => <button key={o} type="button" disabled={i in ans} className={`sr-chip ${i in ans && o === x.a ? 'is-ok' : ''} ${ans[i] === o && o !== x.a ? 'is-bad' : ''}`} onClick={() => setAns((s) => ({ ...s, [i]: o }))}>{o}</button>)}
          </div>
        </div>
      ))}
      {Object.keys(ans).length === items.length && <p className="sg-quiz__res">{t({ uk: `Правильно ${right} з ${items.length}.`, ru: `Правильно ${right} из ${items.length}.`, en: `${right} of ${items.length} correct.` })} <button type="button" className="mu-textlink" onClick={() => setAns({})}>{t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Again' })}</button></p>}
    </div>
  );
}

const norm = (s: string) => s.toLowerCase().replace(/[’']/g, "'").replace(/[.!?,]/g, '').replace(/\s+/g, ' ').trim();
export function SongGap({ items, words }: { items: { q: string; a: string }[]; words: string[] }) {
  const t = useT();
  const [val, setVal] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const right = items.filter((x, i) => norm(val[i] || '') === norm(x.a)).length;
  return (
    <div className="sg-gap">
      <p className="sg-gap__bank">{words.map((w) => <span key={w}>{w}</span>)}</p>
      {items.map((x, i) => {
        const ok = norm(val[i] || '') === norm(x.a);
        return (
          <p key={i} className="sg-gap__row">{i + 1}. {x.q.split('___').map((p, k, a) => <span key={k}>{p}{k < a.length - 1 && (
            <input className={`sg-gap__in ${checked ? (ok ? 'is-ok' : 'is-bad') : ''}`} value={val[i] || ''} onChange={(e) => { setVal((s) => ({ ...s, [i]: e.target.value })); setChecked(false); }} aria-label={`gap ${i + 1}`} />
          )}</span>)}{checked && !ok && <small className="sg-gap__a"> {x.a}</small>}</p>
        );
      })}
      <p><button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={() => setChecked(true)}>{t({ uk: 'Перевірити', ru: 'Проверить', en: 'Check' })}</button>{checked && <b style={{ marginLeft: 12 }}>{right} / {items.length}</b>}</p>
    </div>
  );
}
