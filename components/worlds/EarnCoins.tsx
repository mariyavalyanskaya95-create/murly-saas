'use client';
// «Earn coins»: учень обирає тему (свої слова, домашка від учителя або урок бібліотеки) і виконує 5 коротких завдань.
// Усе англійською; слово-підказка може бути рідною мовою учня (це навчальний матеріал).
import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import { say, sfx } from '@/lib/worlds/sound';

type Topic = { id: string; title: string; level?: string; mine?: boolean };
type Q = { kind: 'choice' | 'type'; prompt: string; options?: string[]; say?: string };
const norm = (s: string) => s.toLowerCase().replace(/[’`]/g, "'").replace(/[.!?,]/g, '').replace(/^(a|an|the|to)\s+/, '').replace(/\s+/g, ' ').trim();

export default function EarnCoins({ signedIn, onClose, onCoins }: { signedIn: boolean; onClose: () => void; onCoins: (n: number, balance?: number) => void }) {
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [level, setLevel] = useState('All');
  const [quiz, setQuiz] = useState<{ id: string | null; qs: Q[]; answers?: string[][] } | null>(null);
  const [i, setI] = useState(0);
  const [given, setGiven] = useState<string[]>([]);
  const [typed, setTyped] = useState('');
  const [result, setResult] = useState<{ right: boolean[]; answers: string[]; coins: number; capped?: boolean } | null>(null);
  const [local, setLocal] = useState<boolean | null>(null); // відповідь на поточне питання (для миттєвої реакції)
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { fetch('/api/quiz').then((r) => r.json()).then((d) => setTopics(d.topics ?? [])).catch(() => setTopics([])); }, []);
  useEffect(() => { if (quiz && quiz.qs[i]?.kind === 'type') input.current?.focus(); }, [quiz, i]);

  const start = async (t: Topic) => {
    setBusy(true); setErr('');
    const r = await fetch('/api/quiz', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'new', topic: t.id }) }).catch(() => null);
    const d = r ? await r.json().catch(() => ({})) : {};
    setBusy(false);
    if (!r?.ok) { setErr(d.error === 'too_small' ? 'This topic is too small. Choose another one!' : 'Something went wrong. Try again.'); return; }
    setQuiz({ id: d.quizId, qs: d.questions, answers: d.answers }); setI(0); setGiven([]); setResult(null); setLocal(null); setTyped('');
    say("Let's go!");
  };
  const answer = async (v: string) => {
    if (!quiz || local !== null) return;
    const q = quiz.qs[i];
    const next = [...given, v];
    setGiven(next);
    // для гостей перевіряємо одразу; для учнів сервер перевірить у кінці, але показуємо реакцію за відповіддю гостя, якщо вона є
    const ok = quiz.answers ? quiz.answers[i].some((a) => norm(a) === norm(v)) : null;
    setLocal(ok ?? true);
    if (ok !== null) (ok ? sfx.coin : sfx.bad)();
    else sfx.pop();
    if (q.say) say(q.say);
    window.setTimeout(async () => {
      setLocal(null); setTyped('');
      if (i + 1 < quiz.qs.length) { setI(i + 1); return; }
      // кінець: рахуємо монетки
      if (quiz.id) {
        setBusy(true);
        const r = await fetch('/api/quiz', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'answer', quizId: quiz.id, answers: next }) }).catch(() => null);
        const d = r ? await r.json().catch(() => ({})) : {};
        setBusy(false);
        if (r?.ok) { setResult(d); onCoins(d.coins ?? 0, d.balance); } else setErr('Could not save your coins. Try again later.');
      } else {
        const right = quiz.qs.map((_, k) => quiz.answers![k].some((a) => norm(a) === norm(next[k] ?? '')));
        const n = right.filter(Boolean).length; const coins = n * 2 + (n === quiz.qs.length ? 2 : 0);
        setResult({ right, answers: quiz.answers!.map((a) => a[0]), coins }); onCoins(coins);
      }
    }, quiz.answers ? 900 : 350);
  };

  const levels = ['All', ...Array.from(new Set((topics ?? []).filter((t) => t.level).map((t) => t.level!)))];
  const shown = (topics ?? []).filter((t) => t.mine || level === 'All' || t.level === level);
  const q = quiz?.qs[i];
  const n = result?.right.filter(Boolean).length ?? 0;

  return (
    <div className="hm-earn" role="dialog" aria-label="Earn coins">
      <div className="hm-earn__box">
        <button className="hm-earn__close" onClick={onClose} aria-label="Close">×</button>
        {!quiz && (
          <>
            <h2><span className="rw-coin" />Earn coins</h2>
            <p>Choose a topic and answer 5 questions. Every right answer gives you 2 coins!</p>
            {!signedIn && <p className="hm-earn__note">Sign in to keep your coins in your Murly wallet.</p>}
            {topics === null ? <p>Loading…</p> : (
              <>
                {shown.some((t) => t.mine) && <h3>From your lessons</h3>}
                <div className="hm-earn__topics">{shown.filter((t) => t.mine).map((t) => <button key={t.id} className="hm-earn__topic is-mine" disabled={busy} onClick={() => start(t)}>{t.title}</button>)}</div>
                <h3>Murly topics</h3>
                <div className="g-chips" style={{ justifyContent: 'flex-start' }}>{levels.map((l) => <button key={l} className={`g-chip hm-en ${level === l ? 'is-on' : ''}`} onClick={() => setLevel(l)}>{l}</button>)}</div>
                <div className="hm-earn__topics">{shown.filter((t) => !t.mine).map((t) => <button key={t.id} className="hm-earn__topic" disabled={busy} onClick={() => start(t)}><b>{t.title}</b>{t.level && <small>{t.level}</small>}</button>)}</div>
              </>
            )}
            {err && <p className="t-neg">{err}</p>}
          </>
        )}
        {quiz && !result && q && (
          <div className="hm-earn__q">
            <div className="hm-earn__steps">{quiz.qs.map((_, k) => <span key={k} className={k < i ? 'is-done' : k === i ? 'is-now' : ''} />)}</div>
            <p className="hm-earn__n">Question {i + 1} of {quiz.qs.length}</p>
            <h2>{q.prompt}{q.say && <button className="rw-say" onClick={() => say(q.say!)} aria-label="Listen"><Icon id="e-speak" /></button>}</h2>
            {q.kind === 'choice' ? (
              <div className="hm-earn__opts">{q.options!.map((o) => <button key={o} className={`hm-earn__opt ${given[i] === o ? (local === false ? 'is-bad' : 'is-ok') : ''}`} disabled={local !== null || busy} onClick={() => answer(o)}>{o}</button>)}</div>
            ) : (
              <form className="hm-earn__type" onSubmit={(e) => { e.preventDefault(); if (typed.trim()) answer(typed.trim()); }}>
                <input ref={input} value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="Type your answer" autoCapitalize="off" autoComplete="off" spellCheck={false} className={local === false ? 'is-bad' : local ? 'is-ok' : ''} disabled={local !== null || busy} />
                <button className="mu-btn mu-btn--lime hm-en" disabled={!typed.trim() || local !== null || busy}>Check</button>
              </form>
            )}
            {local === false && quiz.answers && <p className="hm-earn__fix">The answer is <b>{quiz.answers[i][0]}</b></p>}
            {busy && <p>Counting your coins…</p>}
          </div>
        )}
        {result && quiz && (
          <div className="hm-earn__done">
            <h2>{n === quiz.qs.length ? 'Perfect!' : n >= 3 ? 'Well done!' : 'Good try!'} {n} / {quiz.qs.length}</h2>
            <p className="hm-earn__won"><span className="rw-coin" />+{result.coins} coins</p>
            {result.capped && <p className="hm-earn__note">You got lots of coins today! Come back tomorrow for more.</p>}
            <ol className="hm-earn__review">{quiz.qs.map((qq, k) => <li key={k} className={result.right[k] ? 'is-ok' : 'is-bad'}><span>{qq.prompt}</span> <b>{result.answers[k]}</b>{!result.right[k] && given[k] && <s>{given[k]}</s>}</li>)}</ol>
            <div className="t-head__actions">
              <button className="mu-btn mu-btn--lime hm-en" onClick={() => { setQuiz(null); setResult(null); }}>Another topic</button>
              <button className="mu-btn hm-en" onClick={onClose}>Back to the game</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
