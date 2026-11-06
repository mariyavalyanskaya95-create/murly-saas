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
