'use client';
// Читання страшної історії: текст з озвучкою, словничок, питання з перевіркою і питання для обговорення.
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Story } from '@/lib/scary-stories';
import { liveVoices, speakEn, stopSpeak } from '@/lib/speak';
import TrackPlayer, { type TrackControl, type TrackLine } from '@/components/audio/TrackPlayer';
import { useT } from '@/components/LangProvider';

export default function StoryReader({ s }: { s: Story }) {
  const t = useT();
  const [reading, setReading] = useState(-1);
  const [ans, setAns] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [gloss, setGloss] = useState(true);
  useEffect(() => () => stopSpeak(), []);
  // Живий голос: плеєр з перемоткою і швидкістю; інакше старе читання голосом браузера
  const [live, setLive] = useState<boolean | null>(null);
  useEffect(() => { liveVoices().then(setLive); }, []);
  const track = useMemo<TrackLine[]>(() => s.paragraphs.map((p) => ({ who: '', text: p.replace(/^## /, ''), voice: 'narrator' })), [s]);
  const ctl = useRef<TrackControl | null>(null);

  const run = useRef(0); // номер поточного прослуховування, щоб «Стоп» перервав ланцюжок
  const readFrom = (i: number, id = ++run.current) => {
    if (live && ctl.current) { ctl.current.playLine(i); return; }
    if (id !== run.current) return;
    if (i >= s.paragraphs.length) { setReading(-1); return; }
    setReading(i);
    if (!speakEn(s.paragraphs[i].replace(/^## /, ''), 0.95, () => { if (id === run.current) setTimeout(() => readFrom(i + 1, id), 250); })) setReading(-1);
  };
  const stop = () => { run.current++; stopSpeak(); setReading(-1); };
  const score = s.questions.reduce((n, q, i) => n + (ans[i] === q.answer ? 1 : 0), 0);

  return (
    <div className="sr">
      {live && <TrackPlayer lines={track} showText={false} control={ctl} onFail={() => setLive(false)} onLine={(i, playing) => setReading(playing ? i : -1)} />}
      <div className="sr__bar">
        {live ? null : reading < 0
          ? <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={() => readFrom(0)}>{t({ uk: 'Слухати текст', ru: 'Слушать текст', en: 'Listen to the text' })}</button>
          : <button type="button" className="mu-btn t-btn-sm" onClick={stop}>{t({ uk: 'Стоп', ru: 'Стоп', en: 'Stop' })}</button>}
        <button type="button" className="mu-btn t-btn-sm" onClick={() => setGloss(!gloss)}>{gloss ? t({ uk: 'Сховати словничок', ru: 'Скрыть словарик', en: 'Hide glossary' }) : t({ uk: 'Показати словничок', ru: 'Показать словарик', en: 'Show glossary' })}</button>
      </div>

      <div className={`sr__layout ${gloss ? 'has-gloss' : ''}`}>
        <article className="sr__text">
          {s.paragraphs.map((p, i) => (p.startsWith('## ')
            ? <h3 key={i} className={`sr__sub ${reading === i ? 'is-reading' : ''}`}>{p.slice(3)}</h3>
            : <p key={i} className={reading === i ? 'is-reading' : ''} onDoubleClick={() => readFrom(i)}>{p}</p>))}
          <p className="t-muted sr__hint">{t({ uk: 'Подвійний клік по абзацу: озвучити з цього місця.', ru: 'Двойной клик по абзацу: озвучить с этого места.', en: 'Double-click a paragraph to listen from there.' })}</p>
        </article>
        {gloss && (
          <aside className="sr__gloss">
            <b>{t({ uk: 'Словничок', ru: 'Словарик', en: 'Glossary' })}</b>
            <dl>{s.glossary.map((g) => <div key={g.en}><dt>{g.en}</dt><dd>{t.lang === 'ru' ? g.ru : g.uk}</dd></div>)}</dl>
          </aside>
        )}
      </div>

      <section className="t-card sr__quiz">
        <h2>{t({ uk: 'Перевір себе', ru: 'Проверь себя', en: 'Check yourself' })}</h2>
        {s.questions.map((q, i) => (
          <div key={i} className="sr__q">
            <p><b>{i + 1}.</b> {q.q}</p>
            <div className="sr__opts">
              {q.options.map((o, j) => {
                const cls = checked ? (j === q.answer ? 'is-right' : ans[i] === j ? 'is-wrong' : '') : ans[i] === j ? 'is-on' : '';
                return <button key={j} type="button" className={`sr__opt ${cls}`} disabled={checked} onClick={() => setAns({ ...ans, [i]: j })}>{String.fromCharCode(65 + j)}. {o}</button>;
              })}
            </div>
          </div>
        ))}
        <div className="t-head__actions">
          {!checked
            ? <button type="button" className="mu-btn mu-btn--lime" disabled={Object.keys(ans).length < s.questions.length} onClick={() => setChecked(true)}>{t({ uk: 'Перевірити', ru: 'Проверить', en: 'Check' })}</button>
            : <><b className="sr__score">{score} / {s.questions.length}</b><button type="button" className="mu-btn" onClick={() => { setAns({}); setChecked(false); }}>{t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Try again' })}</button></>}
        </div>
      </section>

      <section className="t-card">
        <h2>{t({ uk: 'Поговоримо', ru: 'Поговорим', en: 'Let’s talk' })}</h2>
        <ul className="sr__discuss">{s.discuss.map((d) => <li key={d}>{d}</li>)}</ul>
      </section>
    </div>
  );
}
