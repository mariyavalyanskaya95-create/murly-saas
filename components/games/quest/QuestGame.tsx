'use client';
// «Знайди, Бульбашко!»: квест-пошук англійською. Рушій однаковий для всіх локацій.
// Дитина слухає завдання і натискає на предмет; підказка перекладом; монетки; можна задати як домашку.
import { useEffect, useRef, useState } from 'react';
import { useT } from '@/components/LangProvider';
import { say } from '@/lib/speak';
import type { QuestLocation, HitProps } from './types';

export default function QuestGame({ loc, hw, adult, next }: { loc: QuestLocation; hw?: string; adult?: boolean; next?: { id: string; title: string } }) {
  const t = useT();
  const TASKS = loc.tasks;
  const [step, setStep] = useState(-1);
  const [found, setFound] = useState<string[]>([]);
  const [hint, setHint] = useState(false);
  const [msg, setMsg] = useState('');
  const [miss, setMiss] = useState(0);
  const [clean, setClean] = useState(0);
  const [flags, setFlags] = useState<Set<string>>(new Set());
  const [pop, setPop] = useState<string | null>(null);
  const sent = useRef(false);
  const task = TASKS[step];
  const done = step >= TASKS.length;

  useEffect(() => { if (task) { setHint(false); setMiss(0); setFound([]); say(task.en, { voice: 'girl', slow: true }); } }, [step]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!done || sent.current) return;
    sent.current = true;
    say(loc.finale, { voice: 'girl' });
    if (!adult) fetch('/api/coins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'earn', amount: 10, source: 'game', reason: `quest ${loc.id}` }) }).catch(() => {});
    if (hw) fetch('/api/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'submitHomework', id: hw, score: clean, total: TASKS.length }) }).catch(() => {});
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (id: string) => {
    if (!task) return;
    setPop(id); setTimeout(() => setPop(null), 400);
    if (!task.target.includes(id)) {
      setMiss((m) => m + 1);
      setMsg(t({ uk: 'Спробуй ще раз!', ru: 'Попробуй ещё раз!', en: 'Try again!' }));
      if (miss + 1 >= 2) setHint(true);
      return;
    }
    if (task.all) {
      const f = found.includes(id) ? found : [...found, id];
      setFound(f);
      setMsg(`${f.length} / ${task.target.length}`);
      say(['one', 'two', 'three', 'four', 'five'][f.length - 1] ?? '', { voice: 'girl' });
      if (f.length < task.target.length) return;
    }
    if (task.set) setFlags((s) => new Set(s).add(task.set!));
    if (!miss) setClean((c) => c + 1);
    setMsg(t({ uk: 'Так! Молодець!', ru: 'Да! Молодец!', en: 'Yes! Well done!' }));
    say(['Yes!', 'Great!', 'Well done!', 'Super!'][step % 4], { voice: 'girl' });
    setTimeout(() => { setMsg(''); setStep((s) => s + 1); }, 1000);
  };
  const restart = () => { setFlags(new Set()); setClean(0); sent.current = false; setStep(0); };

  const hit = (id: string): HitProps => ({ onClick: () => tap(id), className: `sq-hit ${pop === id ? 'is-pop' : ''} ${found.includes(id) ? 'is-found' : ''}`, role: 'button', tabIndex: 0, onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') tap(id); } });
  const { Scene } = loc;

  return (
    <div className="sq">
      <div className="sq-bar">
        {task ? <>
          <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={() => say(task.en, { voice: 'girl', slow: true })} aria-label={t({ uk: 'Послухати ще раз', ru: 'Послушать ещё раз', en: 'Listen again' })}>♪ {t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Again' })}</button>
          <p className="sq-say"><b>{task.en}</b>{hint && t.lang !== 'en' && <small>{t.lang === 'ru' ? task.ru : task.uk}</small>}</p>
          {t.lang !== 'en' && !hint && <button type="button" className="t-link-btn" onClick={() => setHint(true)}>{t({ uk: 'Підказка', ru: 'Подсказка', en: 'Hint' })}</button>}
          <span className="sq-step">{step + 1} / {TASKS.length}</span>
        </> : <p className="sq-say"><b>{t(loc.title)}</b><small>{t(loc.place)} · {loc.level}</small></p>}
        {msg && <span className="sq-msg">{msg}</span>}
      </div>
      <div className="sq-stage">
        <Scene hit={hit} flags={flags} />
        {step === -1 && (
          <div className="sq-over">
            <h2>{t(loc.title)}</h2>
            <p>{t({ uk: 'Котик Бульбашка просить про допомогу англійською. Слухай і натискай на потрібне. Увімкни звук!', ru: 'Котик Пузырёк просит о помощи по-английски. Слушай и нажимай на нужное. Включи звук!', en: 'Bubbles the cat needs your help. Listen and tap the right thing. Turn the sound on!' })}</p>
            <button type="button" className="mu-btn mu-btn--lime mu-btn--lg" onClick={() => setStep(0)}>{t({ uk: 'Почати', ru: 'Начать', en: 'Start' })}</button>
          </div>
        )}
        {done && (
          <div className="sq-over">
            <h2>{t({ uk: 'Ти все знайшов!', ru: 'Ты всё нашёл!', en: 'You found everything!' })}</h2>
            <p>{t({ uk: `З першої спроби: ${clean} з ${TASKS.length}.`, ru: `С первой попытки: ${clean} из ${TASKS.length}.`, en: `First try: ${clean} of ${TASKS.length}.` })}{!adult && ` ${t({ uk: '+10 монеток!', ru: '+10 монеток!', en: '+10 coins!' })}`}</p>
            <div className="t-head__actions" style={{ justifyContent: 'center' }}>
              <button type="button" className="mu-btn" onClick={restart}>{t({ uk: 'Зіграти ще', ru: 'Сыграть ещё', en: 'Play again' })}</button>
              {hw ? <a href="/student#homework" className="mu-btn mu-btn--lime">{t({ uk: 'До домашки', ru: 'К домашке', en: 'Back to homework' })}</a>
                : next ? <a href={`/play/quest/${next.id}`} className="mu-btn mu-btn--lime">{t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })}: {next.title} →</a>
                : <a href="/play/quest" className="mu-btn mu-btn--lime">{t({ uk: 'Усі локації', ru: 'Все локации', en: 'All places' })}</a>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
