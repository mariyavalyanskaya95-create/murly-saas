'use client';
// Підводний квест котика (локація 1). Своя рисована сцена, озвучені завдання англійською (A1–A2).
// Дитина натискає на предмети; підказка перекладом; монетки за проходження; можна задати як домашку.
import { useEffect, useRef, useState } from 'react';
import { useT } from '@/components/LangProvider';
import { speakEn } from '@/lib/speak';

type Id = 'redFish' | 'blueFish' | 'yellowFish' | 'crab' | 'star1' | 'star2' | 'star3' | 'bigRock' | 'key' | 'yellowChest' | 'redChest' | 'pearl' | 'octopus' | 'smallRock' | 'plant' | 'shell';
type Task = { en: string; uk: string; ru: string; target: Id[]; all?: boolean };

const TASKS: Task[] = [
  { en: 'Hi! I am Bubbles. Find the red fish.', uk: 'Привіт! Я Бульбашка. Знайди червону рибку.', ru: 'Привет! Я Пузырёк. Найди красную рыбку.', target: ['redFish'] },
  { en: 'Where is the crab? Touch the crab.', uk: 'Де краб? Торкнися краба.', ru: 'Где краб? Коснись краба.', target: ['crab'] },
  { en: 'Find three starfish.', uk: 'Знайди три морські зірки.', ru: 'Найди три морские звезды.', target: ['star1', 'star2', 'star3'], all: true },
  { en: 'The key is under the big rock. Move the big rock.', uk: 'Ключ під великим каменем. Посунь великий камінь.', ru: 'Ключ под большим камнем. Сдвинь большой камень.', target: ['bigRock'] },
  { en: 'Great! Now take the key.', uk: 'Чудово! Тепер візьми ключ.', ru: 'Отлично! Теперь возьми ключ.', target: ['key'] },
  { en: 'Open the yellow chest.', uk: 'Відкрий жовту скриню.', ru: 'Открой жёлтый сундук.', target: ['yellowChest'] },
  { en: 'Bring me something round and white.', uk: 'Принеси мені щось кругле й біле.', ru: 'Принеси мне что-то круглое и белое.', target: ['pearl'] },
  { en: 'Find the blue fish next to the green plant.', uk: 'Знайди синю рибку біля зеленої рослини.', ru: 'Найди синюю рыбку возле зелёного растения.', target: ['blueFish'] },
  { en: 'Who is behind the small rock? Touch it.', uk: 'Хто ховається за маленьким каменем? Торкнися його.', ru: 'Кто прячется за маленьким камнем? Коснись его.', target: ['octopus'] },
];

export default function SeaQuest({ hw, adult }: { hw?: string; adult?: boolean }) {
  const t = useT();
  const [step, setStep] = useState(-1); // -1 старт
  const [found, setFound] = useState<Id[]>([]);
  const [hint, setHint] = useState(false);
  const [msg, setMsg] = useState('');
  const [miss, setMiss] = useState(0); // помилки на поточному кроці
  const [clean, setClean] = useState(0); // кроки без помилок
  const [rockMoved, setRockMoved] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [pearlTaken, setPearlTaken] = useState(false);
  const [pop, setPop] = useState<Id | null>(null);
  const sent = useRef(false);
  const task = TASKS[step];
  const done = step >= TASKS.length;

  useEffect(() => { if (task) { setHint(false); setMiss(0); setFound([]); speakEn(task.en, 0.85); } }, [step]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!done || sent.current) return;
    sent.current = true;
    speakEn('You found everything! Thank you, friend!', 0.9);
    if (!adult) fetch('/api/coins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'earn', amount: 10, source: 'game', reason: 'sea quest' }) }).catch(() => {});
    if (hw) fetch('/api/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'submitHomework', id: hw, score: clean, total: TASKS.length }) }).catch(() => {});
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (id: Id) => {
    if (!task) return;
    setPop(id); setTimeout(() => setPop(null), 400);
    if (!task.target.includes(id)) {
      setMiss((m) => m + 1);
      setMsg(t({ uk: 'Спробуй ще раз!', ru: 'Попробуй ещё раз!', en: 'Try again!' }));
      if (miss + 1 >= 2) setHint(true); // після двох помилок показуємо підказку
      return;
    }
    if (task.all) {
      const f = found.includes(id) ? found : [...found, id];
      setFound(f);
      setMsg(`${f.length} / ${task.target.length}`);
      speakEn(['one', 'two', 'three'][f.length - 1] ?? '', 1);
      if (f.length < task.target.length) return;
    }
    if (id === 'bigRock') setRockMoved(true);
    if (id === 'key') setHasKey(true);
    if (id === 'yellowChest') setChestOpen(true);
    if (id === 'pearl') setPearlTaken(true);
    if (!miss) setClean((c) => c + 1);
    setMsg(t({ uk: 'Так! Молодець!', ru: 'Да! Молодец!', en: 'Yes! Well done!' }));
    speakEn(['Yes!', 'Great!', 'Well done!', 'Super!'][step % 4], 1);
    setTimeout(() => { setMsg(''); setStep((s) => s + 1); }, 900);
  };

  const hit = (id: Id) => ({ onClick: () => tap(id), className: `sq-hit ${pop === id ? 'is-pop' : ''} ${found.includes(id) ? 'is-found' : ''}`, role: 'button' as const, tabIndex: 0, onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') tap(id); } });
  const fish = (x: number, y: number, c: string, flip = false) => (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx="0" cy="0" rx="44" ry="26" fill={c} stroke="#1A1A1A" strokeWidth="3" />
      <path d="M38 0 L70 -22 L66 0 L70 22 Z" fill={c} stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="-22" cy="-6" r="6" fill="#fff" stroke="#1A1A1A" strokeWidth="2" /><circle cx="-23" cy="-6" r="2.5" fill="#1A1A1A" />
      <path d="M-6 -18 q10 18 0 36" fill="none" stroke="#1A1A1A" strokeWidth="2" opacity=".5" />
    </g>
  );
  const star = (x: number, y: number, r = 1) => (
    <path transform={`translate(${x} ${y}) scale(${r}) rotate(12)`} d="M0 -26 L7 -8 L26 -8 L11 4 L17 23 L0 12 L-17 23 L-11 4 L-26 -8 L-7 -8 Z" fill="#F2A65A" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
  );

  return (
    <div className="sq">
      <div className="sq-bar">
        {task && <>
          <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={() => speakEn(task.en, 0.85)} aria-label={t({ uk: 'Послухати ще раз', ru: 'Послушать ещё раз', en: 'Listen again' })}>♪ {t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Again' })}</button>
          <p className="sq-say"><b>{task.en}</b>{hint && t.lang !== 'en' && <small>{t.lang === 'ru' ? task.ru : task.uk}</small>}</p>
          {t.lang !== 'en' && !hint && <button type="button" className="t-link-btn" onClick={() => setHint(true)}>{t({ uk: 'Підказка', ru: 'Подсказка', en: 'Hint' })}</button>}
          <span className="sq-step">{step + 1} / {TASKS.length}</span>
        </>}
        {msg && <span className="sq-msg">{msg}</span>}
      </div>
      <div className="sq-stage">
        <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="Under the sea">
          <defs>
            <linearGradient id="sqw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CFEAF0" /><stop offset="1" stopColor="#86C3D3" /></linearGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#sqw)" />
          {[120, 330, 560, 800].map((x, i) => <path key={i} d={`M${x} 0 L${x + 60} 0 L${x + 160} 420 L${x + 90} 420 Z`} fill="#fff" opacity=".12" />)}
          {[[80, 120], [160, 60], [620, 90], [900, 200], [520, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={6 + (i % 3) * 3} fill="none" stroke="#fff" strokeWidth="2" opacity=".7" />)}
          <path d="M0 470 Q150 430 300 470 T600 465 T1000 470 L1000 600 L0 600 Z" fill="#EAD9AE" stroke="#1A1A1A" strokeWidth="3" />
          {/* рослини */}
          <g {...hit('plant')}>{[0, 18, 36].map((d) => <path key={d} d={`M${470 + d} 470 q-22 -50 0 -100 q22 -50 0 -110`} fill="none" stroke="#5E9E57" strokeWidth="12" strokeLinecap="round" />)}</g>
          {[0, 16].map((d) => <path key={d} d={`M${880 + d} 470 q18 -40 0 -80 q-18 -40 0 -80`} fill="none" stroke="#5E9E57" strokeWidth="10" strokeLinecap="round" />)}
          {/* восьминіг за маленьким каменем */}
          <g {...hit('octopus')}>
            <ellipse cx="225" cy="440" rx="42" ry="38" fill="#B48EC8" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="210" cy="432" r="6" fill="#fff" stroke="#1A1A1A" strokeWidth="2" /><circle cx="240" cy="432" r="6" fill="#fff" stroke="#1A1A1A" strokeWidth="2" />
            <circle cx="210" cy="433" r="2.5" fill="#1A1A1A" /><circle cx="240" cy="433" r="2.5" fill="#1A1A1A" />
          </g>
          <g {...hit('smallRock')}><path d="M160 500 Q170 445 230 448 Q300 450 300 500 Z" fill="#A9A79A" stroke="#1A1A1A" strokeWidth="3" /></g>
          {/* ключ і великий камінь */}
          {!hasKey && <g {...hit('key')} opacity={rockMoved ? 1 : 0} pointerEvents={rockMoved ? 'auto' : 'none'}>
            <circle cx="735" cy="490" r="14" fill="none" stroke="#C99A2E" strokeWidth="7" />
            <path d="M749 490 L800 490 M785 490 L785 505 M796 490 L796 502" stroke="#C99A2E" strokeWidth="7" strokeLinecap="round" />
          </g>}
          <g {...hit('bigRock')} style={{ transform: rockMoved ? 'translateX(140px)' : 'none', transition: 'transform .6s' }}>
            <path d="M650 505 Q660 400 760 405 Q860 410 850 505 Z" fill="#8F8D80" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M700 440 q20 -12 45 -6" stroke="#1A1A1A" strokeWidth="2" fill="none" opacity=".4" />
          </g>
          {/* скрині */}
          <g {...hit('yellowChest')}>
            <rect x="370" y="470" width="120" height="70" rx="8" fill="#F2C94C" stroke="#1A1A1A" strokeWidth="3" />
            <path d={chestOpen ? 'M370 470 L380 420 L500 420 L490 470' : 'M370 470 Q430 430 490 470'} fill="#E5B53B" stroke="#1A1A1A" strokeWidth="3" />
            <rect x="420" y="490" width="20" height="18" rx="3" fill="#1A1A1A" />
          </g>
          {chestOpen && !pearlTaken && <g {...hit('pearl')}><circle cx="430" cy="458" r="15" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" /><circle cx="425" cy="453" r="4" fill="#EDEDED" /></g>}
          <g {...hit('redChest')}>
            <rect x="900" y="485" width="80" height="55" rx="7" fill="#D9604A" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M900 485 Q940 455 980 485" fill="#C24E3A" stroke="#1A1A1A" strokeWidth="3" />
          </g>
          {/* зірки, черепашка, краб */}
          <g {...hit('star1')}>{star(110, 545)}</g>
          <g {...hit('star2')}>{star(610, 555, .9)}</g>
          <g {...hit('star3')}>{star(320, 560, .8)}</g>
          <g {...hit('shell')}><path d="M540 560 q20 -40 40 0 z" fill="#F6D7C3" stroke="#1A1A1A" strokeWidth="3" /></g>
          <g {...hit('crab')}>
            <ellipse cx="560" cy="505" rx="40" ry="24" fill="#E07A4F" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M525 495 q-25 -20 -10 -38 M595 495 q25 -20 10 -38" stroke="#1A1A1A" strokeWidth="3" fill="none" />
            <circle cx="513" cy="455" r="10" fill="#E07A4F" stroke="#1A1A1A" strokeWidth="3" /><circle cx="607" cy="455" r="10" fill="#E07A4F" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="548" cy="492" r="4" fill="#1A1A1A" /><circle cx="572" cy="492" r="4" fill="#1A1A1A" />
          </g>
          {/* рибки */}
          <g {...hit('redFish')}>{fish(300, 200, '#E2705A')}</g>
          <g {...hit('yellowFish')}>{fish(740, 160, '#F2C94C', true)}</g>
          <g {...hit('blueFish')}>{fish(560, 330, '#6FA8DC', true)}</g>
          {/* котик-нирець */}
          <g transform="translate(110 250)">
            <circle cx="0" cy="0" r="62" fill="#fff" fillOpacity=".35" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M-34 -18 L-26 -48 L-8 -28 M34 -18 L26 -48 L8 -28" fill="#FFFDF8" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
            <ellipse cx="0" cy="0" rx="38" ry="32" fill="#FFFDF8" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="-13" cy="-4" r="4" fill="#1A1A1A" /><circle cx="13" cy="-4" r="4" fill="#1A1A1A" />
            <path d="M-6 8 q6 6 12 0" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M-38 6 L-56 2 M-38 12 L-56 14 M38 6 L56 2 M38 12 L56 14" stroke="#1A1A1A" strokeWidth="2" />
            {hasKey && <g transform="translate(40 40) scale(.6)"><circle cx="0" cy="0" r="14" fill="none" stroke="#C99A2E" strokeWidth="7" /><path d="M14 0 L50 0" stroke="#C99A2E" strokeWidth="7" /></g>}
            {pearlTaken && <circle cx="-44" cy="44" r="10" fill="#fff" stroke="#1A1A1A" strokeWidth="2" />}
          </g>
        </svg>
        {step === -1 && (
          <div className="sq-over">
            <h2>{t({ uk: 'Підводний квест', ru: 'Подводный квест', en: 'Under the sea' })}</h2>
            <p>{t({ uk: 'Котик Бульбашка загубив речі на дні моря. Слухай, що він просить англійською, і натискай на потрібне. Увімкни звук!', ru: 'Котик Пузырёк потерял вещи на дне моря. Слушай, что он просит по-английски, и нажимай на нужное. Включи звук!', en: 'Bubbles the cat lost his things at the bottom of the sea. Listen and tap the right thing. Turn the sound on!' })}</p>
            <button type="button" className="mu-btn mu-btn--lime mu-btn--lg" onClick={() => setStep(0)}>{t({ uk: 'Почати', ru: 'Начать', en: 'Start' })}</button>
          </div>
        )}
        {done && (
          <div className="sq-over">
            <h2>{t({ uk: 'Ти все знайшов!', ru: 'Ты всё нашёл!', en: 'You found everything!' })}</h2>
            <p>{t({ uk: `З першої спроби: ${clean} з ${TASKS.length}.`, ru: `С первой попытки: ${clean} из ${TASKS.length}.`, en: `First try: ${clean} of ${TASKS.length}.` })}{!adult && ` ${t({ uk: '+10 монеток!', ru: '+10 монеток!', en: '+10 coins!' })}`}</p>
            <div className="t-head__actions" style={{ justifyContent: 'center' }}>
              <button type="button" className="mu-btn" onClick={() => { setStep(0); setClean(0); setRockMoved(false); setHasKey(false); setChestOpen(false); setPearlTaken(false); sent.current = false; }}>{t({ uk: 'Зіграти ще', ru: 'Сыграть ещё', en: 'Play again' })}</button>
              <a href={hw ? '/student#homework' : '/games'} className="mu-btn mu-btn--lime">{hw ? t({ uk: 'До домашки', ru: 'К домашке', en: 'Back to homework' }) : t({ uk: 'Інші ігри', ru: 'Другие игры', en: 'More games' })}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
