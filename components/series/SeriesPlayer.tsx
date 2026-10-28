'use client';
// Плеєр серії: кожен персонаж своїм голосом, текст можна сховати, слова й питання після прослуховування
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { useT } from '@/components/LangProvider';
import { liveVoices, say, stopSpeak, ttsUrl } from '@/lib/speak';
import TrackPlayer, { type TrackLine } from '@/components/audio/TrackPlayer';
import { useMemo } from 'react';
import type { VoicePreset } from '@/lib/voices';
import type { Episode } from '@/lib/series/types';

export default function SeriesPlayer({ slug, ep, voices, total }: { slug: string; ep: Episode; voices: Record<string, VoicePreset>; total: number }) {
  const t = useT();
  const [cur, setCur] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(false);
  const [text, setText] = useState(false);
  const [ans, setAns] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const stopRef = useRef(false);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  useEffect(() => () => stopSpeak(), []);
  const [live, setLive] = useState<boolean | null>(null);
  const [trackFail, setTrackFail] = useState(false);
  useEffect(() => { liveVoices().then(setLive); }, []);
  const track: TrackLine[] = useMemo(() => ep.lines.map((l) => ({ who: l.who, text: l.text, voice: l.who ? voices[l.who] ?? 'woman' : 'narrator' })), [ep, voices]);
  useEffect(() => { if (text && cur >= 0) lineRefs.current[cur]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [cur, text]);

  const play = (from = 0) => {
    stopSpeak(); stopRef.current = false; setPlaying(true);
    const go = (i: number) => {
      if (stopRef.current) return;
      if (i >= ep.lines.length) { setPlaying(false); setCur(-1); return; }
      setCur(i);
      const l = ep.lines[i];
      say(l.text, { voice: l.who ? voices[l.who] ?? 'woman' : 'narrator', slow, onEnd: () => setTimeout(() => go(i + 1), l.who ? 250 : 400) });
    };
    go(from);
  };
  const stop = () => { stopRef.current = true; stopSpeak(); setPlaying(false); };
  const score = ep.questions.filter((q, i) => ans[i] === q.a).length;
  const finish = () => {
    setChecked(true);
    try { const k = `murly:series:${slug}`; const d = JSON.parse(localStorage.getItem(k) || '{}'); d[ep.n] = Math.max(d[ep.n] ?? 0, score); localStorage.setItem(k, JSON.stringify(d)); } catch { /* */ }
  };

  return (
    <div className="sp">
      {live && !trackFail ? (
        <>
          <div className="sp-bar sp-bar--live">
            <button type="button" className={`g-chip ${text ? 'is-on' : ''}`} onClick={() => setText(!text)} aria-pressed={text}>{text ? t({ uk: 'Сховати текст', ru: 'Скрыть текст', en: 'Hide text' }) : t({ uk: 'Показати текст', ru: 'Показать текст', en: 'Show text' })}</button>
            <span className="t-muted" style={{ fontSize: 13 }}>{t({ uk: 'Стрілки ← → на клавіатурі: 5 секунд назад і вперед', ru: 'Стрелки ← → на клавиатуре: 5 секунд назад и вперёд', en: 'Arrow keys ← →: 5 seconds back and forward' })}</span>
          </div>
          <TrackPlayerGuard lines={track} showText={text} onFail={() => setTrackFail(true)} />
        </>
      ) : (<>
      <div className="sp-bar">
        {!playing
          ? <button type="button" className="mu-btn mu-btn--lime mu-btn--lg" onClick={() => play(cur >= 0 ? cur : 0)}><Icon id="e-head" />{cur > 0 ? t({ uk: 'Продовжити', ru: 'Продолжить', en: 'Continue' }) : t({ uk: 'Слухати серію', ru: 'Слушать серию', en: 'Play episode' })}</button>
          : <button type="button" className="mu-btn mu-btn--lg" onClick={stop}>{t({ uk: 'Пауза', ru: 'Пауза', en: 'Pause' })}</button>}
        <button type="button" className={`g-chip ${slow ? 'is-on' : ''}`} onClick={() => setSlow(!slow)} aria-pressed={slow}>{t({ uk: 'Повільніше', ru: 'Медленнее', en: 'Slower' })}</button>
        <button type="button" className={`g-chip ${text ? 'is-on' : ''}`} onClick={() => setText(!text)} aria-pressed={text}>{text ? t({ uk: 'Сховати текст', ru: 'Скрыть текст', en: 'Hide text' }) : t({ uk: 'Показати текст', ru: 'Показать текст', en: 'Show text' })}</button>
        <span className="sp-prog"><i style={{ width: `${cur < 0 ? 0 : ((cur + 1) / ep.lines.length) * 100}%` }} /></span>
      </div>
      {!text && <p className="t-muted sp-tip">{playing && cur >= 0 ? <>{t({ uk: 'Говорить', ru: 'Говорит', en: 'Speaking' })}: <b>{ep.lines[cur].who || t({ uk: 'Оповідач', ru: 'Рассказчик', en: 'Narrator' })}</b></> : t({ uk: 'Порада: спершу послухай без тексту, потім перевір себе з текстом.', ru: 'Совет: сначала послушай без текста, потом проверь себя с текстом.', en: 'Tip: listen without the text first, then check yourself with it.' })}</p>}
      {text && (
        <div className="sp-text">
          {ep.lines.map((l, i) => (
            <p key={i} ref={(el) => { lineRefs.current[i] = el; }} className={`${i === cur ? 'is-now' : ''} ${l.who ? '' : 'is-narr'}`} onClick={() => play(i)} title={t({ uk: 'Слухати звідси', ru: 'Слушать отсюда', en: 'Listen from here' })}>
              {l.who && <b>{l.who}: </b>}{l.text}
            </p>
          ))}
        </div>
      )}
      </>)}

      <section className="t-card sp-words">
        <h2><Icon id="e-abc" />{t({ uk: 'Слова серії', ru: 'Слова серии', en: 'Episode words' })}</h2>
        <div className="sp-wlist">
          {ep.words.map((w) => (
            <button key={w.en} type="button" className="sp-w" onClick={() => say(w.en, { voice: 'narrator' })}>
              <b>{w.en}</b><span>{t.lang === 'ru' ? w.ru : t.lang === 'en' ? '' : w.uk}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="t-card sp-q">
        <h2><Icon id="e-pencil" />{t({ uk: 'Чи все зрозумів?', ru: 'Всё ли понял?', en: 'Did you understand?' })}</h2>
        {ep.questions.map((q, i) => (
          <div key={i} className="sp-qi">
            <p><b>{i + 1}. {q.q}</b></p>
            <div className="sp-opts">
              {q.options.map((o, k) => {
                const st = checked ? (k === q.a ? 'is-right' : ans[i] === k ? 'is-wrong' : '') : ans[i] === k ? 'is-on' : '';
                return <button key={k} type="button" className={`sp-opt ${st}`} disabled={checked} onClick={() => setAns({ ...ans, [i]: k })}>{o}</button>;
              })}
            </div>
            {checked && q.why && <p className="t-muted sp-why">{t(q.why)}</p>}
          </div>
        ))}
        {!checked
          ? <button type="button" className="mu-btn mu-btn--lime" disabled={Object.keys(ans).length < ep.questions.length} onClick={finish}>{t({ uk: 'Перевірити', ru: 'Проверить', en: 'Check' })}</button>
          : <div className="sp-res"><b>{score} / {ep.questions.length}</b>
              {ep.n < total
                ? <a className="mu-btn mu-btn--lime" href={`/series/${slug}/${ep.n + 1}`}>{t({ uk: 'Наступна серія', ru: 'Следующая серия', en: 'Next episode' })} →</a>
                : <a className="mu-btn mu-btn--lime" href={`/series/${slug}`}>{t({ uk: 'Усі серії', ru: 'Все серии', en: 'All episodes' })}</a>}
              <button type="button" className="t-link-btn" onClick={() => { setChecked(false); setAns({}); }}>{t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Try again' })}</button>
            </div>}
      </section>
    </div>
  );
}

// Якщо живі файли не завантажились (наприклад, гість і фрази ще не озвучені), повертаємось до звичайного плеєра
function TrackPlayerGuard({ lines, showText, onFail }: { lines: TrackLine[]; showText: boolean; onFail: () => void }) {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    let alive = true;
    Promise.all(lines.slice(0, 3).map((l) => fetch(ttsUrl(l.text, l.voice), { method: 'HEAD' }).then((r) => r.ok).catch(() => false)))
      .then((r) => { if (alive && r.some((x) => !x)) { setOk(false); onFail(); } });
    return () => { alive = false; };
  }, [lines]); // eslint-disable-line react-hooks/exhaustive-deps
  return ok ? <TrackPlayer lines={lines} showText={showText} onFail={onFail} /> : null;
}
