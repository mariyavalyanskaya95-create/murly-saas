'use client';
import { useEffect, useState } from 'react';
import Icon from '../Icon';
import { useT } from '../LangProvider';
import type { T } from '@/lib/i18n';
import { localeOf } from '@/lib/teacher-store';

// Причини зберігаються в базі українською; перекладаємо тільки для показу
const REASONS = ['Урок', 'Домашка', 'Поведінка', 'Тест слів', 'Активність'];
const REASON_T: Record<string, T> = {
  'Урок': { uk: 'Урок', ru: 'Урок', en: 'Lesson' },
  'Домашка': { uk: 'Домашка', ru: 'Домашка', en: 'Homework' },
  'Поведінка': { uk: 'Поведінка', ru: 'Поведение', en: 'Behaviour' },
  'Тест слів': { uk: 'Тест слів', ru: 'Тест слов', en: 'Word test' },
  'Активність': { uk: 'Активність', ru: 'Активность', en: 'Activity' },
};
const fmt = (iso: string, lang: Parameters<typeof localeOf>[0]) => new Date(iso).toLocaleDateString(localeOf(lang), { day: 'numeric', month: 'short' });
const SRC: Record<string, T> = {
  teacher: { uk: 'від учителя', ru: 'от учителя', en: 'from teacher' },
  homework: { uk: 'домашка', ru: 'домашка', en: 'homework' },
  words: { uk: 'слова', ru: 'слова', en: 'words' },
  game: { uk: 'гра', ru: 'игра', en: 'game' },
  shop: { uk: 'покупка в грі', ru: 'покупка в игре', en: 'in-game purchase' },
};

// Монетки учня: учитель нараховує після уроку, учень витрачає в іграх (Murly Town)
export default function CoinsBox({ studentId, joined }: { studentId: string; joined?: boolean }) {
  const t = useT();
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
    if (r.ok) { setBal(d.balance); setMsg(`+${n} ${t({ uk: 'нараховано', ru: 'начислено', en: 'awarded' })}`); load(); } else setMsg(d.error === 'not_joined' ? t({ uk: 'Учень ще не приєднався за запрошенням', ru: 'Ученик ещё не присоединился по приглашению', en: 'The student has not joined via the invite yet' }) : t({ uk: 'Не вдалося нарахувати', ru: 'Не удалось начислить', en: 'Could not award coins' }));
  };

  return (
    <div className="t-card t-coins">
      <div className="t-coins__head">
        <span className="rw-coin" />
        <div><small>{t({ uk: 'Монетки', ru: 'Монетки', en: 'Coins' })}</small><b>{joined ? (bal ?? '…') : '-'}</b></div>
        <p className="t-muted">{t({ uk: 'Учень витрачає їх в іграх на сайті. Нараховуй після уроку за роботу, домашку, поведінку.', ru: 'Ученик тратит их в играх на сайте. Начисляй после урока за работу, домашку, поведение.', en: 'Students spend them in games on the site. Award them after a lesson for work, homework, behaviour.' })}</p>
      </div>
      {joined ? (
        <>
          <div className="t-coins__give">
            <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
              {REASONS.map((r) => <button key={r} className={`g-chip ${reason === r ? 'is-on' : ''}`} onClick={() => setReason(r)}>{t(REASON_T[r])}</button>)}
            </div>
            <div className="t-coins__btns">
              {[5, 10, 20, 50].map((n) => <button key={n} className="mu-btn t-btn-sm" disabled={busy} onClick={() => give(n)}><Icon id="e-trophy" />+{n}</button>)}
            </div>
            {msg && <span className="t-pos">{msg}</span>}
          </div>
          {log.length > 0 && (
            <ul className="t-coins__log">
              {log.slice(0, 6).map((l, i) => <li key={i}><b className={l.amount < 0 ? 't-neg' : 't-pos'}>{l.amount > 0 ? '+' : ''}{l.amount}</b> {SRC[l.source] ? t(SRC[l.source]) : l.source}{l.reason && l.source === 'teacher' ? `: ${REASON_T[l.reason] ? t(REASON_T[l.reason]) : l.reason}` : ''} <span className="t-muted">{fmt(l.created_at, t.lang)}</span></li>)}
            </ul>
          )}
        </>
      ) : <p className="t-muted">{t({ uk: 'Монетки з’являться, коли учень приєднається за запрошенням.', ru: 'Монетки появятся, когда ученик присоединится по приглашению.', en: 'Coins will appear once the student joins via the invite.' })}</p>}
    </div>
  );
}
