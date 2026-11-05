'use client';
// Тест на рівень: діти (гра з картинками й голосом) або підлітки й дорослі (адаптивний, A1–C1)
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useT } from '../LangProvider';
import { ADULT, KIDS, LEVELS, LEVEL_INFO, type Lvl, type Q } from '@/lib/level-test';
import { say } from '@/lib/speak';
import KidPic from './KidPic';
import MurlyCat from '../MurlyCat';

const shuffle = <T,>(a: T[]) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const ADULT_N = 20;

export default function LevelTest() {
  const t = useT();
  const [mode, setMode] = useState<'kids' | 'adult' | null>(null);
  if (!mode) return (
    <div className="lt-pick">
      <button type="button" className="lt-pick__card" onClick={() => setMode('kids')}>
        <b>{t({ uk: 'Для дітей', ru: 'Для детей', en: 'For kids' })}</b>
        <span>{t({ uk: '6–11 років · гра з картинками й голосом · 5 хвилин', ru: '6–11 лет · игра с картинками и голосом · 5 минут', en: 'Ages 6–11 · a game with pictures and voice · 5 minutes' })}</span>
      </button>
      <button type="button" className="lt-pick__card" onClick={() => setMode('adult')}>
        <b>{t({ uk: 'Для підлітків і дорослих', ru: 'Для подростков и взрослых', en: 'For teens and adults' })}</b>
        <span>{t({ uk: '20 питань · рівень від A1 до C1 · 10 хвилин', ru: '20 вопросов · уровень от A1 до C1 · 10 минут', en: '20 questions · level A1 to C1 · 10 minutes' })}</span>
      </button>
    </div>
  );
  return mode === 'kids' ? <KidsTest onBack={() => setMode(null)} /> : <AdultTest onBack={() => setMode(null)} />;
}

// Адаптивний тест: правильна відповідь піднімає рівень питання, помилка опускає
function AdultTest({ onBack }: { onBack: () => void }) {
  const t = useT();
  const bank = useMemo(() => Object.fromEntries(LEVELS.map((l) => [l, shuffle(ADULT.filter((q) => q.l === l))])) as Record<Lvl, Q[]>, []);
  const [theta, setTheta] = useState(1.0); // 0 = A1 … 4 = C1, старт A2
  const [n, setN] = useState(0);
  const [used, setUsed] = useState<Record<Lvl, number>>({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 });
  const [log, setLog] = useState<{ l: Lvl; ok: boolean }[]>([]);
  const [pick, setPick] = useState<number | null>(null);
  const lvlIdx = Math.max(0, Math.min(4, Math.round(theta)));
  const lvl = LEVELS[lvlIdx];
  const q = bank[lvl][used[lvl] % bank[lvl].length];
  const opts = useMemo(() => shuffle(q.o.map((o, i) => ({ o, i }))), [q]);
  if (n >= ADULT_N) {
    // результат: найвищий рівень, де відповіли правильно хоча б на 60% (мінімум 2 питання)
    let res: Lvl = 'A1';
    LEVELS.forEach((l) => { const r = log.filter((x) => x.l === l); if (r.length >= 2 && r.filter((x) => x.ok).length / r.length >= 0.6) res = l; });
    const right = log.filter((x) => x.ok).length;
    return <Result lvl={res} right={right} total={ADULT_N} onBack={onBack} />;
  }
  const answer = (i: number) => {
    if (pick !== null) return;
    setPick(i);
    const ok = i === q.a;
    setTimeout(() => {
      setLog((l) => [...l, { l: lvl, ok }]);
      const step = n < 8 ? 0.7 : 0.4;
      setTheta((x) => Math.max(0, Math.min(4, x + (ok ? step : -step))));
      setUsed((u) => ({ ...u, [lvl]: u[lvl] + 1 }));
      setN((x) => x + 1); setPick(null);
    }, 650);
  };
  return (
    <div className="lt-box">
      <div className="lt-bar"><i style={{ width: `${(n / ADULT_N) * 100}%` }} /></div>
      <p className="lt-count">{n + 1} / {ADULT_N}</p>
      <h2 className="lt-q">{q.q.split('___').map((p, i, a) => <span key={i}>{p}{i < a.length - 1 && <span className="lt-gap">{pick !== null ? q.o[q.a] : '___'}</span>}</span>)}</h2>
      <div className="lt-opts">
        {opts.map(({ o, i }) => (
          <button key={o} type="button" className={`lt-opt ${pick !== null && i === q.a ? 'is-ok' : ''} ${pick === i && i !== q.a ? 'is-bad' : ''}`} onClick={() => answer(i)}>{o}</button>
        ))}
      </div>
      <button type="button" className="mu-textlink lt-back" onClick={onBack}>{t({ uk: 'Почати спочатку', ru: 'Начать сначала', en: 'Start over' })}</button>
    </div>
  );
}

function KidsTest({ onBack }: { onBack: () => void }) {
  const t = useT();
  const [n, setN] = useState(0);
  const [ok, setOk] = useState<number[]>([0, 0, 0]);
  const [pick, setPick] = useState<number | null>(null);
  if (n >= KIDS.length) {
    const lv = ok[2] >= 3 ? 'A2' : ok[1] >= 3 ? 'A1' : 'Starter';
    return <KidsResult lvl={lv} right={ok.reduce((a, b) => a + b, 0)} total={KIDS.length} onBack={onBack} />;
  }
  const q = KIDS[n];
  const hear = q.k === 'hear' ? q.word : null;
  const answer = (i: number) => {
    if (pick !== null) return;
    setPick(i);
    const good = i === q.a;
    say(good ? ['Yes!', 'Great!', 'Super!', 'Well done!'][n % 4] : 'Oops!', { voice: 'girl', kid: true });
    setTimeout(() => { if (good) setOk((o) => o.map((x, k) => (k === q.lvl ? x + 1 : x))); setN((x) => x + 1); setPick(null); }, 900);
  };
  return (
    <div className="lt-box lt-box--kids">
      <div className="lt-bar"><i style={{ width: `${(n / KIDS.length) * 100}%` }} /></div>
      <div className="lt-kid-top">
        <MurlyCat className="lt-cat" />
        <div>
          <p className="lt-count">{n + 1} / {KIDS.length}</p>
          <h2 className="lt-q">
            {q.k === 'hear' ? t({ uk: 'Послухай і вибери картинку', ru: 'Послушай и выбери картинку', en: 'Listen and choose the picture' })
              : q.k === 'name' ? t({ uk: 'Що на картинці?', ru: 'Что на картинке?', en: 'What is it?' })
              : q.q}
          </h2>
          {hear && <button type="button" className="mu-btn mu-btn--lime lt-listen" onClick={() => say(hear, { voice: 'girl', kid: true, slow: true })}>{t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}</button>}
        </div>
      </div>
      {q.k === 'hear' && (
        <div className="lt-pics">{q.pics.map((p, i) => <button key={p} type="button" className={`lt-pic ${pick !== null && i === q.a ? 'is-ok' : ''} ${pick === i && i !== q.a ? 'is-bad' : ''}`} onClick={() => answer(i)}><KidPic id={p} /></button>)}</div>
      )}
      {q.k === 'name' && (
        <>
          <div className="lt-pic lt-pic--big"><KidPic id={q.pic} /></div>
          <div className="lt-opts">{q.o.map((o, i) => <button key={o} type="button" className={`lt-opt ${pick !== null && i === q.a ? 'is-ok' : ''} ${pick === i && i !== q.a ? 'is-bad' : ''}`} onClick={() => { say(o, { voice: 'girl', kid: true }); answer(i); }}>{o}</button>)}</div>
        </>
      )}
      {q.k === 'say' && (
        <div className="lt-opts">{q.o.map((o, i) => <button key={o} type="button" className={`lt-opt ${pick !== null && i === q.a ? 'is-ok' : ''} ${pick === i && i !== q.a ? 'is-bad' : ''}`} onClick={() => answer(i)}>{o}</button>)}</div>
      )}
      <button type="button" className="mu-textlink lt-back" onClick={onBack}>{t({ uk: 'Почати спочатку', ru: 'Начать сначала', en: 'Start over' })}</button>
    </div>
  );
}

function Result({ lvl, right, total, onBack }: { lvl: Lvl; right: number; total: number; onBack: () => void }) {
  const t = useT();
  const info = LEVEL_INFO[lvl];
  return (
    <div className="lt-box lt-res">
      <p className="lt-count">{t({ uk: 'Твій рівень', ru: 'Твой уровень', en: 'Your level' })}</p>
      <div className="lt-res__lvl">{lvl}</div>
      <p>{t(info)}</p>
      <p className="t-muted">{t({ uk: `Правильних відповідей: ${right} з ${total}. Це орієнтир, точний рівень покаже вчитель на першому уроці.`, ru: `Правильных ответов: ${right} из ${total}. Это ориентир, точный уровень покажет учитель на первом уроке.`, en: `Correct answers: ${right} of ${total}. This is a guide; a teacher will confirm your exact level in the first lesson.` })}</p>
      <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
        <Link href={info.next.href} className="mu-btn mu-btn--lime">{t(info.next)}</Link>
        <Link href="/sign-up?role=student&track=adult" className="mu-textlink">{t({ uk: 'Створити кабінет', ru: 'Создать кабинет', en: 'Create an account' })}</Link>
      </div>
      <button type="button" className="mu-textlink lt-back" onClick={onBack}>{t({ uk: 'Пройти ще раз', ru: 'Пройти ещё раз', en: 'Try again' })}</button>
    </div>
  );
}

function KidsResult({ lvl, right, total, onBack }: { lvl: string; right: number; total: number; onBack: () => void }) {
  const t = useT();
  const txt: Record<string, { uk: string; ru: string; en: string }> = {
    Starter: { uk: 'Перші кроки! Почнемо зі слів навколо: тварини, кольори, числа. Найкраще через гру.', ru: 'Первые шаги! Начнём со слов вокруг: животные, цвета, числа. Лучше всего через игру.', en: 'First steps! Start with everyday words: animals, colours, numbers. Games work best.' },
    A1: { uk: 'Чудово! Дитина знає базові слова й прості речення. Далі: Present Simple, «I have got», прийменники місця.', ru: 'Отлично! Ребёнок знает базовые слова и простые предложения. Дальше: Present Simple, «I have got», предлоги места.', en: 'Great! Your child knows basic words and simple sentences. Next: Present Simple, “I have got”, prepositions of place.' },
    A2: { uk: 'Супер! Дитина вже говорить про те, що відбувається зараз і що було вчора. Час для історій і ігор посерйозніше.', ru: 'Супер! Ребёнок уже говорит о том, что происходит сейчас и что было вчера. Время для историй и игр посерьёзнее.', en: 'Super! Your child already talks about now and yesterday. Time for stories and bigger games.' },
  };
  return (
    <div className="lt-box lt-res">
      <MurlyCat className="lt-cat" greet={300} hi="You did it!" />
      <div className="lt-res__lvl">{lvl}</div>
      <p>{t(txt[lvl])}</p>
      <p className="t-muted">{t({ uk: `Правильно: ${right} з ${total}.`, ru: `Правильно: ${right} из ${total}.`, en: `Correct: ${right} of ${total}.` })}</p>
      <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
        <Link href="/games" className="mu-btn mu-btn--lime">{t({ uk: 'Грати англійською', ru: 'Играть на английском', en: 'Play in English' })}</Link>
        <Link href="/for-parents" className="mu-textlink">{t({ uk: 'Для батьків', ru: 'Для родителей', en: 'For parents' })}</Link>
      </div>
      <button type="button" className="mu-textlink lt-back" onClick={onBack}>{t({ uk: 'Пройти ще раз', ru: 'Пройти ещё раз', en: 'Try again' })}</button>
    </div>
  );
}
