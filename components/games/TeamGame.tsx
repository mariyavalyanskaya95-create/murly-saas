'use client';
// Командна гра Murly: сітка закритих карток, команди по черзі відкривають і відповідають.
// За карткою бали або сюрприз. Учитель вирішує, чи відповідь правильна.
import { useMemo, useState } from 'react';
import { useT } from '@/components/LangProvider';
import { speakEn } from '@/lib/speak';

export type QA = { q: string; a: string };
type Prize = { kind: 'pts'; n: number } | { kind: 'double' } | { kind: 'steal' } | { kind: 'give' } | { kind: 'bomb' } | { kind: 'swap' } | { kind: 'zero' };
type Card = { qa: QA; prize: Prize; open: boolean };
const TEAM_COLORS = ['#1A1A1A', '#D83A1E', '#2F6FB0', '#3E8E41'];

function shuffle<T>(a: T[]) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

function makePrizes(n: number, surprises: boolean): Prize[] {
  const pts: Prize[] = Array.from({ length: n }, (_, i) => ({ kind: 'pts', n: [5, 10, 10, 15, 20, 25][i % 6] }));
  if (!surprises || n < 8) return shuffle(pts);
  const extra: Prize[] = [{ kind: 'double' }, { kind: 'steal' }, { kind: 'give' }, { kind: 'bomb' }, { kind: 'swap' }, { kind: 'zero' }];
  const k = Math.min(extra.length, Math.round(n / 4));
  return shuffle([...shuffle(extra).slice(0, k), ...pts.slice(k)]);
}

export default function TeamGame({ items, title, onExit }: { items: QA[]; title?: string; onExit?: () => void }) {
  const t = useT();
  const [setup, setSetup] = useState(true);
  const [teams, setTeams] = useState(['Cats', 'Dogs']);
  const [size, setSize] = useState(Math.min(16, Math.max(8, items.length - (items.length % 4))));
  const [surprises, setSurprises] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [score, setScore] = useState<number[]>([]);
  const [turn, setTurn] = useState(0);
  const [cur, setCur] = useState<number | null>(null);
  const [stage, setStage] = useState<'q' | 'a' | 'prize' | 'target'>('q');
  const [msg, setMsg] = useState('');
  const [pendingPrize, setPendingPrize] = useState<Prize | null>(null);

  const sizes = useMemo(() => [8, 12, 16, 20, 24].filter((s) => s <= Math.max(8, items.length)), [items.length]);

  const start = () => {
    const pool = shuffle(items).slice(0, size).map((x) => (reverse ? { q: x.a, a: x.q } : x));
    const prizes = makePrizes(pool.length, surprises);
    setCards(pool.map((qa, i) => ({ qa, prize: prizes[i], open: false })));
    setScore(teams.map(() => 0)); setTurn(0); setCur(null); setStage('q'); setMsg(''); setSetup(false);
  };
  const next = () => { setCur(null); setStage('q'); setPendingPrize(null); setTurn((x) => (x + 1) % teams.length); };
  const add = (i: number, n: number) => setScore((s) => s.map((v, k) => (k === i ? v + n : v)));

  const answer = (ok: boolean) => {
    if (cur == null) return;
    setCards((c) => c.map((x, i) => (i === cur ? { ...x, open: true } : x)));
    if (!ok) { setMsg(t({ uk: 'Не вийшло. Хід переходить далі.', ru: 'Не получилось. Ход переходит дальше.', en: 'Not this time. Next team!' })); setStage('a'); return; }
    const p = cards[cur].prize;
    setPendingPrize(p);
    setStage('prize');
    if (p.kind === 'pts') { add(turn, p.n); setMsg(`+${p.n}`); }
    else if (p.kind === 'double') { setScore((s) => s.map((v, k) => (k === turn ? v * 2 : v))); setMsg(t({ uk: 'Бали подвоюються!', ru: 'Баллы удваиваются!', en: 'Points doubled!' })); }
    else if (p.kind === 'bomb') { add(turn, -5); setMsg(t({ uk: 'Бомба! −5', ru: 'Бомба! −5', en: 'Bomb! −5' })); }
    else if (p.kind === 'zero') { setMsg(t({ uk: 'Порожня картка: 0 балів', ru: 'Пустая карточка: 0 баллов', en: 'Empty card: 0 points' })); }
    else if (teams.length === 2) {
      const other = 1 - turn;
      if (p.kind === 'steal') { const n = Math.min(10, score[other]); add(other, -n); add(turn, n); setMsg(t({ uk: `Крадемо ${n} балів!`, ru: `Крадём ${n} баллов!`, en: `Steal ${n} points!` })); }
      if (p.kind === 'give') { add(turn, -10); add(other, 10); setMsg(t({ uk: 'Віддай 10 балів суперникам', ru: 'Отдай 10 баллов соперникам', en: 'Give 10 points away' })); }
      if (p.kind === 'swap') { setScore((s) => [s[1], s[0]]); setMsg(t({ uk: 'Команди міняються балами!', ru: 'Команды меняются баллами!', en: 'Teams swap points!' })); }
    } else { setStage('target'); }
  };
  const target = (k: number) => {
    const p = pendingPrize;
    if (!p) return;
    if (p.kind === 'steal') { const n = Math.min(10, score[k]); add(k, -n); add(turn, n); setMsg(`${teams[turn]} ← ${n} ← ${teams[k]}`); }
    if (p.kind === 'give') { add(turn, -10); add(k, 10); setMsg(`${teams[turn]} → 10 → ${teams[k]}`); }
    if (p.kind === 'swap') { setScore((s) => s.map((v, i) => (i === turn ? s[k] : i === k ? s[turn] : v))); setMsg(`${teams[turn]} ⇄ ${teams[k]}`); }
    setStage('prize');
  };
  const prizeLabel = (p: Prize) => p.kind === 'pts' ? `+${p.n}` : p.kind === 'double' ? '×2' : p.kind === 'bomb' ? '−5' : p.kind === 'steal' ? t({ uk: 'Вкрасти', ru: 'Украсть', en: 'Steal' }) : p.kind === 'give' ? t({ uk: 'Віддати', ru: 'Отдать', en: 'Give' }) : p.kind === 'swap' ? '⇄' : '0';
  const done = cards.length > 0 && cards.every((c) => c.open);

  if (setup) return (
    <div className="tg tg--setup">
      <h2>{title || t({ uk: 'Командна гра', ru: 'Командная игра', en: 'Team game' })}</h2>
      <p className="t-muted">{t({ uk: `Питань: ${items.length}. Команди по черзі відкривають картки, ти натискаєш «Правильно» або «Ні».`, ru: `Вопросов: ${items.length}. Команды по очереди открывают карточки, ты нажимаешь «Правильно» или «Нет».`, en: `${items.length} questions. Teams take turns opening cards; you mark answers right or wrong.` })}</p>
      <div className="tg-teams">
        {teams.map((n, i) => (
          <label key={i} style={{ borderColor: TEAM_COLORS[i] }}>{t({ uk: 'Команда', ru: 'Команда', en: 'Team' })} {i + 1}
            <input value={n} maxLength={20} onChange={(e) => setTeams(teams.map((x, k) => (k === i ? e.target.value : x)))} />
          </label>
        ))}
        {teams.length < 4 && <button type="button" className="mu-btn t-btn-sm" onClick={() => setTeams([...teams, ['Foxes', 'Owls'][teams.length - 2] ?? `Team ${teams.length + 1}`])}>+ {t({ uk: 'команда', ru: 'команда', en: 'team' })}</button>}
        {teams.length > 2 && <button type="button" className="t-link-btn" onClick={() => setTeams(teams.slice(0, -1))}>− {t({ uk: 'команда', ru: 'команда', en: 'team' })}</button>}
      </div>
      <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
        {sizes.map((s) => <button key={s} type="button" className={`g-chip ${size === s ? 'is-on' : ''}`} onClick={() => setSize(s)}>{s} {t({ uk: 'карток', ru: 'карточек', en: 'cards' })}</button>)}
      </div>
      <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
        <button type="button" className={`g-chip ${surprises ? 'is-on' : ''}`} onClick={() => setSurprises(!surprises)}>{surprises ? '✓ ' : ''}{t({ uk: 'Сюрпризи (вкрасти, бомба, ×2…)', ru: 'Сюрпризы (украсть, бомба, ×2…)', en: 'Surprises (steal, bomb, ×2…)' })}</button>
        <button type="button" className={`g-chip ${reverse ? 'is-on' : ''}`} onClick={() => setReverse(!reverse)}>{reverse ? '✓ ' : ''}{t({ uk: 'Навпаки (переклад → англ)', ru: 'Наоборот (перевод → англ)', en: 'Reverse (translation → English)' })}</button>
      </div>
      <div className="t-head__actions">
        <button type="button" className="mu-btn mu-btn--lime" disabled={items.length < 4} onClick={start}>{t({ uk: 'Почати гру', ru: 'Начать игру', en: 'Start the game' })}</button>
        {onExit && <button type="button" className="mu-btn" onClick={onExit}>{t({ uk: 'Назад', ru: 'Назад', en: 'Back' })}</button>}
      </div>
    </div>
  );

  const best = Math.max(...score);
  return (
    <div className="tg">
      <div className="tg-score">
        {teams.map((n, i) => (
          <div key={i} className={`tg-team ${i === turn && !done ? 'is-turn' : ''}`} style={{ ['--c' as string]: TEAM_COLORS[i] }}>
            <span>{n}</span><b>{score[i]}</b>
          </div>
        ))}
        <button type="button" className="t-link-btn" onClick={() => setSetup(true)}>{t({ uk: 'Нова гра', ru: 'Новая игра', en: 'New game' })}</button>
      </div>
      {done ? (
        <div className="tg-end">
          <h2>{t({ uk: 'Перемогли', ru: 'Победили', en: 'Winner' })}: {teams.filter((_, i) => score[i] === best).join(' & ')}!</h2>
          <button type="button" className="mu-btn mu-btn--lime" onClick={start}>{t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Play again' })}</button>
        </div>
      ) : (
        <div className="tg-grid" style={{ gridTemplateColumns: `repeat(${cards.length > 16 ? 6 : 4}, minmax(0, 1fr))` }}>
          {cards.map((c, i) => (
            <button key={i} type="button" className={`tg-card ${c.open ? 'is-open' : ''}`} disabled={c.open || cur != null} onClick={() => { setCur(i); setStage('q'); setMsg(''); }}>
              {c.open ? <small>{prizeLabel(c.prize)}</small> : i + 1}
            </button>
          ))}
        </div>
      )}
      {cur != null && (
        <div className="tg-modal" role="dialog" aria-modal="true">
          <div className="tg-box">
            <p className="tg-turn" style={{ color: TEAM_COLORS[turn] }}>{teams[turn]}</p>
            <p className="tg-q">{cards[cur].qa.q} <button type="button" className="t-icon-btn" onClick={() => speakEn(cards[cur].qa.q, 0.9)} aria-label={t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}>♪</button></p>
            {stage === 'q' && (
              <div className="t-head__actions">
                <button type="button" className="mu-btn mu-btn--lime" onClick={() => answer(true)}>{t({ uk: 'Правильно', ru: 'Правильно', en: 'Correct' })}</button>
                <button type="button" className="mu-btn" onClick={() => answer(false)}>{t({ uk: 'Ні', ru: 'Нет', en: 'Wrong' })}</button>
                <button type="button" className="t-link-btn" onClick={() => setStage('a')}>{t({ uk: 'Показати відповідь', ru: 'Показать ответ', en: 'Show answer' })}</button>
              </div>
            )}
            {stage !== 'q' && <p className="tg-a">{cards[cur].qa.a}</p>}
            {stage === 'a' && !cards[cur].open && (
              <div className="t-head__actions">
                <button type="button" className="mu-btn mu-btn--lime" onClick={() => answer(true)}>{t({ uk: 'Відповіли правильно', ru: 'Ответили правильно', en: 'They got it' })}</button>
                <button type="button" className="mu-btn" onClick={() => answer(false)}>{t({ uk: 'Ні', ru: 'Нет', en: 'No' })}</button>
              </div>
            )}
            {stage === 'target' && (
              <div><p>{t({ uk: 'Обери команду:', ru: 'Выбери команду:', en: 'Pick a team:' })}</p>
                <div className="t-head__actions">{teams.map((n, k) => k !== turn && <button key={k} type="button" className="mu-btn" onClick={() => target(k)}>{n}</button>)}</div>
              </div>
            )}
            {msg && <p className="tg-msg">{msg}</p>}
            {(stage === 'prize' || (stage === 'a' && cards[cur].open)) && <button type="button" className="mu-btn mu-btn--lime" onClick={next}>{t({ uk: 'Далі', ru: 'Дальше', en: 'Next' })} →</button>}
          </div>
        </div>
      )}
    </div>
  );
}
