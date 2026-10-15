'use client';
import { useEffect, useState } from 'react';
import Icon from '../Icon';

const REASONS = ['Урок', 'Домашка', 'Поведінка', 'Тест слів', 'Активність'];
const fmt = (iso: string) => new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
const SRC: Record<string, string> = { teacher: 'від учителя', homework: 'домашка', words: 'слова', game: 'гра', shop: 'покупка в грі' };

// Монетки учня: учитель нараховує після уроку, учень витрачає в іграх (Murly Town)
export default function CoinsBox({ studentId, joined }: { studentId: string; joined?: boolean }) {
  const [bal, setBal] = useState<number | null>(null);
  const [log, setLog] = useState<{ amount: number; reason: string; source: string; created_at: string }[]>([]);
  const [reason, setReason] = useState(REASONS[0]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const load = () => fetch(`/api/coins?student=${studentId}`).then((r) => r.json()).then((d) => { setBal(d.balance ?? 0); setLog(d.log ?? []); }).catch(() => {});
  useEffect(() => { if (joined) load(); }, [studentId, joined]); // eslint-disable-line react-hooks/exhaustive-deps

  const give = async (n: number) => {
    setBusy(true); setMsg('');
    const r = await fetch('/api/coins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'award', studentId, amount: n, reason }) });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok) { setBal(d.balance); setMsg(`+${n} нараховано`); load(); } else setMsg(d.error === 'not_joined' ? 'Учень ще не приєднався за запрошенням' : 'Не вдалося нарахувати');
  };

  return (
    <div className="t-card t-coins">
      <div className="t-coins__head">
        <span className="rw-coin" />
        <div><small>Монетки</small><b>{joined ? (bal ?? '…') : '—'}</b></div>
        <p className="t-muted">Учень витрачає їх в іграх на сайті. Нараховуй після уроку за роботу, домашку, поведінку.</p>
      </div>
      {joined ? (
        <>
          <div className="t-coins__give">
            <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
              {REASONS.map((r) => <button key={r} className={`g-chip ${reason === r ? 'is-on' : ''}`} onClick={() => setReason(r)}>{r}</button>)}
            </div>
            <div className="t-coins__btns">
              {[5, 10, 20, 50].map((n) => <button key={n} className="mu-btn t-btn-sm" disabled={busy} onClick={() => give(n)}><Icon id="e-trophy" />+{n}</button>)}
            </div>
            {msg && <span className="t-pos">{msg}</span>}
          </div>
          {log.length > 0 && (
            <ul className="t-coins__log">
              {log.slice(0, 6).map((l, i) => <li key={i}><b className={l.amount < 0 ? 't-neg' : 't-pos'}>{l.amount > 0 ? '+' : ''}{l.amount}</b> {SRC[l.source] ?? l.source}{l.reason && l.source === 'teacher' ? `: ${l.reason}` : ''} <span className="t-muted">{fmt(l.created_at)}</span></li>)}
            </ul>
          )}
        </>
      ) : <p className="t-muted">Монетки з’являться, коли учень приєднається за запрошенням.</p>}
    </div>
  );
}
