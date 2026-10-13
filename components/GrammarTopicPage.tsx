import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from './Icon';
import Stickers from './Stickers';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import QuizGame from './games/QuizGame';
import { GRAMMAR, getTopic } from '@/lib/grammar';

export function topicMetadata(slug: string): Metadata {
  const t = getTopic(slug)!;
  return {
    title: `${t.title}: правила, приклади і вправи | Murly`,
    description: `${t.uk} в англійській простими словами: формула, коли вживати, приклади з перекладом, типові помилки і квіз.`,
    alternates: { canonical: `/grammar/${t.slug}` },
  };
}

export default function GrammarTopicPage({ slug }: { slug: string }) {
  const t = getTopic(slug)!;
  const idx = GRAMMAR.findIndex((g) => g.slug === slug);
  const prev = GRAMMAR[idx - 1];
  const next = GRAMMAR[idx + 1];

  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 24 }} data-stickers="4">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id={t.icon} />{t.uk} · {t.level}</span>
          <h1>{t.title}<em>.</em></h1>
          <p>{t.lead}</p>
          <a href="#quiz" className="mu-btn mu-btn--lime mu-btn--lg">
            Одразу до квізу<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
          </a>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container gr">
          <h2 className="gr-h"><Icon id="e-pencil" />Формула</h2>
          <div className="gr-formula">
            {t.formula.map((f) => (
              <div key={f.sign} className={`gr-formula__row gr--${t.color}`}>
                <span className="gr-sign">{f.sign}</span>
                <span className="gr-formula__text">{f.text}</span>
                <span className="gr-formula__ex">{f.example}</span>
              </div>
            ))}
          </div>

          <h2 className="gr-h"><Icon id="d-bulb" />Коли вживаємо</h2>
          <div className="gr-uses">
            {t.uses.map((u) => (
              <div key={u.title} className="gr-use">
                <div className="gr-use__title">{u.title}</div>
                <div className="gr-use__ex">{u.example}</div>
                <div className="gr-use__uk">{u.uk}</div>
              </div>
            ))}
          </div>

          {t.markers && (
            <>
              <h2 className="gr-h"><Icon id="d-seo" />Слова-маркери</h2>
              <div className="gr-markers">{t.markers.map((m) => <span key={m} className="g-chip">{m}</span>)}</div>
            </>
          )}

          <h2 className="gr-h"><Icon id="d-lock" />Типові помилки</h2>
          <div className="gr-mistakes">
            {t.mistakes.map((m) => (
              <div key={m.wrong} className="gr-mistake">
                <span className="gr-wrong">{m.wrong}</span>
                <span className="gr-right">{m.right}</span>
                <span className="gr-note">{m.note}</span>
              </div>
            ))}
          </div>

          <div className="gr-tip">
            <Icon id="c-cat-glass" className="mu-ic gr-tip__ic" />
            <div><b>Лайфхак</b><p>{t.tip}</p></div>
          </div>
        </div>
      </section>

      <section className="mu-section" id="quiz" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <h2 className="gr-h gr-h--center"><Icon id="e-trophy" />Перевір себе</h2>
          <div className="g-stage gr-quiz">
            <div className="g-stage__prompt">Обери правильний варіант</div>
            <QuizGame items={t.quiz} ordered />
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container gr-pager">
          {prev ? <Link href={`/grammar/${prev.slug}`} className="mu-btn">← {prev.title}</Link> : <span />}
          <Link href="/grammar" className="mu-btn">Усі теми</Link>
          {next ? <Link href={`/grammar/${next.slug}`} className="mu-btn mu-btn--lime">{next.title} →</Link> : <span />}
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
