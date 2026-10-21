import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import DrillTrainer from '@/components/DrillTrainer';
import DrillPlus from '@/components/DrillPlus';
import { DRILL_PLUS } from '@/lib/drills/plus';
import { DRILLS, getDrill } from '@/lib/drills';
import { tr } from '@/lib/i18n-server';
import { localizeDrill } from '@/lib/content/drills';

export const dynamicParams = false;

// таблиці, де перший рядок: заголовки колонок
const HEAD_FIRST = new Set(['articles', 'future-forms', 'past-continuous', 'quantifiers', 'simple-vs-continuous', 'there-is-are']);
// довгий текст блоку «extra» ділимо на речення, а переліки через «;» на пункти списку
function extraParts(text: string): (string | string[])[] {
  const out: (string | string[])[] = [];
  for (const para of text.split(/\n+/)) {
    let cur = '';
    for (const sent of para.split(/(?<=[.!?])\s+(?=[A-ZА-ЯІЇЄҐ])/)) {
      const list = sent.match(/^([^:;]{1,40}:)\s*(.+;.+)$/);
      if (list) { if (cur) out.push(cur); out.push(list[1], list[2].split(/;\s*/)); cur = ''; continue; }
      // нове «гасло» на кшталт «V2: ...» або «Правильні дієслова: ...» починає новий абзац
      if (cur && /^[^.,]{1,30}:/.test(sent)) { out.push(cur); cur = sent; } else cur = cur ? `${cur} ${sent}` : sent;
    }
    if (cur) out.push(cur);
  }
  return out;
}

export function generateStaticParams() { return DRILLS.map((d) => ({ slug: d.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const L = tr();
  const d = localizeDrill(getDrill(params.slug)!, L.lang);
  return {
    title: L({ uk: `${d.title}: тренажер на 100 завдань | Murly`, ru: `${d.title}: тренажёр на 100 заданий | Murly`, en: `${d.title}: 100-task grammar trainer | Murly` }),
    description: L({ uk: `${d.uk}: коротка теорія, головні пастки і 100 завдань з поясненням кожної відповіді.`, ru: `${d.title}: короткая теория, главные ловушки и 100 заданий с объяснением каждого ответа.`, en: `${d.title}: short theory, the main traps and 100 tasks with an explanation for every answer.` }),
    alternates: { canonical: `/grammar/trainer/${d.slug}` },
  };
}

export default function DrillPage({ params }: { params: { slug: string } }) {
  const L = tr();
  const d0 = getDrill(params.slug)!;
  const d = localizeDrill(d0, L.lang);
  const idx = DRILLS.indexOf(d0);
  const prev = DRILLS[idx - 1];
  const next = DRILLS[idx + 1];
  const th = d.theory;
  const plus = DRILL_PLUS[d0.slug] ? localizeDrill(DRILL_PLUS[d0.slug], L.lang) : null;
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 24 }} data-stickers="4">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id={d.icon} />{L({ uk: 'Тренажер', ru: 'Тренажёр', en: 'Trainer' })} · {d.level} · 100 {L({ uk: 'завдань', ru: 'заданий', en: 'tasks' })}</span>
          <h1>{d.title}<em>.</em></h1>
          <p>{d.uk}. {d.lead}</p>
          <a href="#practice" className="mu-btn mu-btn--lime mu-btn--lg">{L({ uk: 'Одразу до завдань', ru: 'Сразу к заданиям', en: 'Skip to the tasks' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></a>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container gr">
          <h2 className="gr-h"><Icon id="d-bulb" />{L({ uk: 'Коли використовуємо', ru: 'Когда используем', en: 'When we use it' })}</h2>
          <div className="gr-uses">
            {th.when.map((u) => (
              <div key={u.title} className="gr-use"><div className="gr-use__title">{u.title}</div><div className="gr-use__ex">{u.example}</div><div className="gr-use__uk">{u.uk}</div></div>
            ))}
          </div>

          <h2 className="gr-h"><Icon id="e-pencil" />{L({ uk: 'Форми', ru: 'Формы', en: 'Forms' })}</h2>
          <div className="gr-formula">
            {th.forms.map((f, k) => (
              <div key={k} className={`gr-formula__row gr--${d.color === 'pink' ? 'tomato' : d.color}`}>
                <span className="gr-sign">{f.sign}</span><span className="gr-formula__text">{f.text}</span><span className="gr-formula__ex">{f.example}</span>
              </div>
            ))}
          </div>

          <h2 className="gr-h"><Icon id="d-lock" />{L({ uk: 'Головна пастка', ru: 'Главная ловушка', en: 'The main trap' })}</h2>
          <div className="gr-mistakes">
            {th.trap.map((m) => (
              <div key={m.title} className="gr-mistake">
                <b className="dr-trap__title">{m.title}</b>
                <span className="gr-wrong">{m.wrong}</span>
                <span className="gr-right">{m.right}</span>
                <span className="gr-note">{m.text}</span>
              </div>
            ))}
          </div>

          {th.markers.length > 0 && (
            <>
              <h2 className="gr-h"><Icon id="d-seo" />{L({ uk: 'Маркери', ru: 'Маркеры', en: 'Signal words' })}</h2>
              <div className="gr-markers">{th.markers.map((m) => <span key={m} className="g-chip">{m}</span>)}</div>
            </>
          )}

          {th.extra && (
            <>
              <h2 className="gr-h"><Icon id="e-book" />{th.extra.title}</h2>
              <div className="dr-extra">
                {extraParts(th.extra.text).map((p, k) => (Array.isArray(p)
                  ? <ul key={k}>{p.map((li) => <li key={li}>{li}</li>)}</ul>
                  : <p key={k}>{(() => { const m = p.match(/^([^.,]{1,30}:)(.*)$/); return m ? <><b>{m[1]}</b>{m[2]}</> : p; })()}</p>))}
                {th.extra.rows && (
                  <div className="dr-table-wrap">
                    <table className="dr-table">
                      {HEAD_FIRST.has(d0.slug) && <thead><tr>{th.extra.rows[0].map((c, j) => <th key={j}>{c}</th>)}</tr></thead>}
                      <tbody>{th.extra.rows.slice(HEAD_FIRST.has(d0.slug) ? 1 : 0).map((r, k) => <tr key={k}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mu-section" id="practice" style={{ paddingTop: 0 }}>
        <div className="mu-container gr-quiz">
          <h2 className="gr-h gr-h--center"><Icon id="e-trophy" />{L({ uk: '100 завдань: 5 раундів по 20', ru: '100 заданий: 5 раундов по 20', en: '100 tasks: 5 rounds of 20' })}</h2>
          <DrillTrainer drill={d} />
        </div>
      </section>

      {plus && (
        <section className="mu-section" id="practice-2" style={{ paddingTop: 0 }}>
          <div className="mu-container gr-quiz">
            <h2 className="gr-h gr-h--center"><Icon id="e-book" />{L({ uk: 'Частина 2: таблиця, історії, читання', ru: 'Часть 2: таблица, истории, чтение', en: 'Part 2: table, stories, reading' })}</h2>
            <DrillPlus plus={plus} />
          </div>
        </section>
      )}

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container gr-pager">
          {prev ? <Link href={`/grammar/trainer/${prev.slug}`} className="mu-btn">← {prev.title}</Link> : <span />}
          <Link href="/grammar/trainer" className="mu-btn">{L({ uk: 'Усі тренажери', ru: 'Все тренажёры', en: 'All trainers' })}</Link>
          {next ? <Link href={`/grammar/trainer/${next.slug}`} className="mu-btn mu-btn--lime">{next.title} →</Link> : <span />}
        </div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
