'use client';
// Калькулятор НМТ: тестовий бал → шкала 100-200, поріг «склав / не склав», скільки правильних треба для цілі
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useT } from '../LangProvider';
import { NMT_TABLES, nmtMax, nmtMin, nmtScore } from '@/lib/nmt-scale';

export default function NmtCalculator() {
  const t = useT();
  const [sid, setSid] = useState('english');
  const s = NMT_TABLES.find((x) => x.id === sid)!;
  const max = nmtMax(s), min = nmtMin(s);
  const [raw, setRaw] = useState(20);
  const r = Math.min(raw, max);
  const score = nmtScore(s, r);
  const name = (x: typeof s) => (t.lang === 'ru' ? x.ru : t.lang === 'en' ? x.en : x.uk);
  const goals = useMemo(() => [140, 150, 160, 170, 180, 190, 200].map((g) => ({ g, need: Number(Object.entries(s.table).find(([, v]) => v >= g)?.[0] ?? max) })), [s, max]);
  return (
    <div className="nc">
      <div className="nc-box">
        <label className="nc-label" htmlFor="nc-subj">{t({ uk: 'Предмет', ru: 'Предмет', en: 'Subject' })}</label>
        <select id="nc-subj" className="nc-select" value={sid} onChange={(e) => { setSid(e.target.value); }}>
          {NMT_TABLES.map((x) => <option key={x.id} value={x.id}>{name(x)}</option>)}
        </select>
        <label className="nc-label" htmlFor="nc-raw">{t({ uk: `Тестовий бал (правильних відповідей): 0-${max}`, ru: `Тестовый балл (правильных ответов): 0-${max}`, en: `Test score (correct answers): 0-${max}` })}</label>
        <div className="nc-row">
          <input id="nc-raw" type="range" min={0} max={max} value={r} onChange={(e) => setRaw(+e.target.value)} />
          <input type="number" min={0} max={max} value={r} onChange={(e) => setRaw(Math.max(0, Math.min(max, +e.target.value || 0)))} className="nc-num" aria-label="score" />
        </div>
        <div className={`nc-res ${score ? '' : 'is-fail'}`} aria-live="polite">
          {score ? (
            <>
              <span className="nc-res__big">{score}</span>
              <span>{t({ uk: 'балів за шкалою 100-200', ru: 'баллов по шкале 100-200', en: 'points on the 100-200 scale' })}</span>
            </>
          ) : (
            <>
              <span className="nc-res__big">{t({ uk: 'Не склав', ru: 'Не сдал', en: 'Not passed' })}</span>
              <span>{t({ uk: `Поріг: ${min} тестових балів`, ru: `Порог: ${min} тестовых баллов`, en: `Pass mark: ${min} test points` })}</span>
            </>
          )}
        </div>
      </div>
      <div className="nc-box">
        <h2>{t({ uk: 'Скільки правильних треба для мети', ru: 'Сколько правильных нужно для цели', en: 'How many correct answers you need' })}</h2>
        <table className="nc-table">
          <thead><tr><th>{t({ uk: 'Мета', ru: 'Цель', en: 'Goal' })}</th><th>{t({ uk: 'Тестовий бал', ru: 'Тестовый балл', en: 'Test score' })}</th></tr></thead>
          <tbody>{goals.map((x) => <tr key={x.g}><td>{x.g}+</td><td>{x.need} / {max}</td></tr>)}</tbody>
        </table>
      </div>
      <details className="nc-box">
        <summary>{t({ uk: `Уся таблиця переведення: ${name(s)}`, ru: `Вся таблица перевода: ${name(s)}`, en: `Full conversion table: ${name(s)}` })}</summary>
        <table className="nc-table nc-table--full">
          <thead><tr><th>{t({ uk: 'Тестовий бал', ru: 'Тестовый балл', en: 'Test score' })}</th><th>100-200</th></tr></thead>
          <tbody>{Object.entries(s.table).map(([k, v]) => <tr key={k} className={+k === r ? 'is-on' : ''}><td>{k}</td><td>{v}</td></tr>)}</tbody>
        </table>
      </details>
      {sid === 'english' && (
        <p className="nc-cta">{t({ uk: 'Дізнайся свій реальний тестовий бал:', ru: 'Узнай свой реальный тестовый балл:', en: 'Find your real test score:' })} <Link href="/nmt/mock/1" className="mu-btn mu-btn--lime t-btn-sm">{t({ uk: 'Пройти пробний НМТ безкоштовно', ru: 'Пройти пробный НМТ бесплатно', en: 'Take a free mock NMT' })}</Link></p>
      )}
    </div>
  );
}
