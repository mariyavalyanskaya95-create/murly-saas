'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useT } from '@/components/LangProvider';
import { BADGES, PROFS, profLevel, type Save } from '@/lib/worlds/island-data';
import { DIALOGS } from '@/lib/worlds/island-dialogs';

// Острів Murly в кабінеті учня: професія, де зупинився, друзі й нагороди
export default function IslandCard() {
  const t = useT();
  const [s, setS] = useState<Save | null>(null);
  useEffect(() => { fetch('/api/game?game=island').then((r) => r.json()).then((d) => setS(d.data ?? null)).catch(() => {}); }, []);
  if (!s) return null;
  const prof = PROFS.find((p) => p.id === s.prof);
  const lv = prof ? profLevel(s.jobs?.[prof.job] ?? 0) : null;
  const jobs = Object.values(s.jobs ?? {}).reduce((a, b) => a + b, 0);
  const when = s.last?.at ? new Date(s.last.at) : null;
  return (
    <section className="t-card s-island">
      <div className="s-island__head">
        <small>{t({ uk: 'Острів Murly', ru: 'Остров Murly', en: 'Murly Island' })}</small>
        <b>{prof ? `${lv?.en} ${prof.en}` : t({ uk: 'Професію ще не обрано', ru: 'Профессия ещё не выбрана', en: 'No job chosen yet' })}</b>
      </div>
      {s.last?.place && <p>{t({ uk: 'Зупинився:', ru: 'Остановился:', en: 'Stopped:' })} <b>{s.last.place}</b>{s.last.doing ? <> · {s.last.doing}</> : null}{when ? <span className="t-muted"> ({when.toLocaleDateString()})</span> : null}</p>}
      <ul className="s-island__stats">
        <li><b>{jobs}</b> {t({ uk: 'робіт виконано', ru: 'работ выполнено', en: 'jobs done' })}</li>
        <li><b>{Object.keys(s.friends ?? {}).length}</b> {t({ uk: 'друзів', ru: 'друзей', en: 'friends' })}</li>
        <li><b>{(s.dialogs ?? []).length}/{DIALOGS.length}</b> {t({ uk: 'розмов', ru: 'разговоров', en: 'talks' })}</li>
        <li><b>{(s.badges ?? []).length}/{BADGES.length}</b> {t({ uk: 'нагород', ru: 'наград', en: 'badges' })}</li>
      </ul>
      <Link href="/play/island" className="mu-btn mu-btn--lime">{t({ uk: 'Продовжити гру', ru: 'Продолжить игру', en: 'Continue playing' })}</Link>
    </section>
  );
}
