'use client';
// Скоромовки: фільтр за рівнем і звуком, озвучка (звичайно і повільно), виклик «3 рази швидко» з секундоміром.
import { useEffect, useMemo, useRef, useState } from 'react';
import { TWISTERS, type Twister } from '@/lib/tongue-twisters';
import { speakEn, stopSpeak } from '@/lib/speak';
import { useT } from '@/components/LangProvider';

const LV = { 1: { uk: 'Легкі', ru: 'Лёгкие', en: 'Easy' }, 2: { uk: 'Середні', ru: 'Средние', en: 'Medium' }, 3: { uk: 'Складні', ru: 'Сложные', en: 'Hard' } } as const;

function Card({ w }: { w: Twister }) {
  const t = useT();
  const [run, setRun] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);
  const start = () => { setRun(Date.now()); setTime(0); timer.current = setInterval(() => setTime((x) => x + 0.1), 100); };
  const finish = () => { if (timer.current) clearInterval(timer.current); const s = run ? (Date.now() - run) / 1000 : 0; setRun(null); setTime(s); setBest((b) => (b === null || s < b ? s : b)); };
  return (
    <div className={`tw-card tw--${w.level}`}>
      <div className="tw-card__top"><span className="gr-level">{w.sound}</span><span className="le-tag">{t(LV[w.level])}</span></div>
      <p className="tw-card__text">{w.text}</p>
      <p className="t-muted">{t.lang === 'ru' ? w.ru : w.uk}</p>
      <div className="t-head__actions" style={{ flexWrap: 'wrap' }}>
        <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={() => speakEn(w.text, 1)}>{t({ uk: 'Слухати', ru: 'Слушать', en: 'Listen' })}</button>
        <button type="button" className="mu-btn t-btn-sm" onClick={() => speakEn(w.text, 0.6)}>{t({ uk: 'Повільно', ru: 'Медленно', en: 'Slowly' })}</button>
        {run === null
          ? <button type="button" className="mu-btn t-btn-sm" onClick={start}>{t({ uk: '3 рази швидко', ru: '3 раза быстро', en: '3 times fast' })}</button>
          : <button type="button" className="mu-btn mu-btn--tomato t-btn-sm" onClick={finish}>{t({ uk: 'Готово', ru: 'Готово', en: 'Done' })} {time.toFixed(1)} s</button>}
      </div>
      {run === null && time > 0 && <p className="tw-card__res">{t({ uk: 'Твій час', ru: 'Твоё время', en: 'Your time' })}: <b>{time.toFixed(1)} s</b>{best !== null && <> · {t({ uk: 'рекорд', ru: 'рекорд', en: 'best' })}: <b>{best.toFixed(1)} s</b></>}</p>}
      <details className="tw-card__tip"><summary>{t({ uk: 'Як вимовляти', ru: 'Как произносить', en: 'How to say it' })}</summary><p>{t(w.tip)}</p></details>
    </div>
  );
}

export default function TwisterBoard() {
  const t = useT();
  const [lv, setLv] = useState<0 | 1 | 2 | 3>(0);
  const [snd, setSnd] = useState('');
  useEffect(() => () => stopSpeak(), []);
  const sounds = useMemo(() => [...new Set(TWISTERS.map((w) => w.sound))], []);
  const list = TWISTERS.filter((w) => (!lv || w.level === lv) && (!snd || w.sound === snd));
  return (
    <>
      <div className="le-filters">
        <div className="g-chips">
          <button className={`g-chip ${!lv ? 'is-on' : ''}`} onClick={() => setLv(0)}>{t({ uk: 'Усі', ru: 'Все', en: 'All' })}</button>
          {([1, 2, 3] as const).map((l) => <button key={l} className={`g-chip ${lv === l ? 'is-on' : ''}`} onClick={() => setLv(l)}>{t(LV[l])}</button>)}
        </div>
        <div className="g-chips">
          <button className={`g-chip ${!snd ? 'is-on' : ''}`} onClick={() => setSnd('')}>{t({ uk: 'Будь-який звук', ru: 'Любой звук', en: 'Any sound' })}</button>
          {sounds.map((s) => <button key={s} className={`g-chip ${snd === s ? 'is-on' : ''}`} onClick={() => setSnd(s)}>{s}</button>)}
        </div>
      </div>
      <div className="tw-grid">{list.map((w) => <Card key={w.id} w={w} />)}</div>
    </>
  );
}
