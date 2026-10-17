'use client';
// Список пройдених пробних НМТ: у кабінеті учня (свої) і в картці учня у вчителя (?student=id).
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { useT } from '@/components/LangProvider';

type R = { variant: string; score: number; total: number; finished_at: string };

export default function MockResults({ student, all }: { student?: string; all: string[] }) {
  const t = useT();
  const [rows, setRows] = useState<R[] | null>(null);
  useEffect(() => {
    fetch(`/api/mock${student ? `?student=${encodeURIComponent(student)}` : ''}`).then((r) => (r.ok ? r.json() : { results: [] })).then((d) => setRows(d.results ?? [])).catch(() => setRows([]));
  }, [student]);
  if (!rows) return null;
  // найкращий результат по кожному варіанту
  const best = new Map<string, R & { tries: number }>();
  rows.forEach((r) => { const b = best.get(r.variant); if (!b) best.set(r.variant, { ...r, tries: 1 }); else { b.tries++; if (r.score > b.score) Object.assign(b, { score: r.score, total: r.total }); } });
  const next = all.find((id) => !best.has(id));
  const date = (s: string) => new Date(s).toLocaleDateString(t.lang === 'en' ? 'en-GB' : t.lang === 'ru' ? 'ru-UA' : 'uk-UA');
  return (
    <div className="t-card mk-mine">
      <div className="t-card__head"><h3><Icon id="e-trophy" />{student ? t({ uk: 'Пробні НМТ учня', ru: 'Пробные НМТ ученика', en: 'Student’s mock NMT' }) : t({ uk: 'Мої пробні НМТ', ru: 'Мои пробные НМТ', en: 'My mock NMT tests' })}</h3></div>
      {best.size === 0 ? (
        <p className="t-muted">{student ? t({ uk: 'Учень ще не проходив пробних НМТ.', ru: 'Ученик ещё не проходил пробных НМТ.', en: 'No mock tests yet.' }) : t({ uk: 'Ти ще не проходив(ла) пробний НМТ. Почни з безкоштовного варіанта 1.', ru: 'Ты ещё не проходил(а) пробный НМТ. Начни с бесплатного варианта 1.', en: 'No mock tests yet. Start with free test 1.' })}</p>
      ) : (
        <ul className="mk-mine__list">
          {[...best.values()].sort((a, b) => Number(a.variant) - Number(b.variant)).map((r) => (
            <li key={r.variant}>
              <b>{t({ uk: 'Варіант', ru: 'Вариант', en: 'Test' })} {r.variant}</b>
              <span className={`mk-mine__score ${r.score >= 24 ? 'is-top' : r.score >= 5 ? 'is-ok' : 'is-low'}`}>{r.score} / {r.total}</span>
              <small className="t-muted">{date(r.finished_at)}{r.tries > 1 ? ` · ${t({ uk: 'спроб', ru: 'попыток', en: 'tries' })}: ${r.tries}` : ''}</small>
              {!student && <Link href={`/nmt/mock/${r.variant}`} className="t-link-btn">{t({ uk: 'Ще раз', ru: 'Ещё раз', en: 'Again' })}</Link>}
            </li>
          ))}
        </ul>
      )}
      {!student && next && <Link href={`/nmt/mock/${next}`} className="mu-btn mu-btn--lime">{t({ uk: `Наступний: варіант ${next}`, ru: `Следующий: вариант ${next}`, en: `Next: test ${next}` })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>}
    </div>
  );
}
