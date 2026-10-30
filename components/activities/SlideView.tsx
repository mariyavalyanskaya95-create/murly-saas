// Один слайд активності. Розмір тексту залежить від ширини слайда (container query), тож однаково виглядає
// у прев’ю, на весь екран і в PDF.
import Art from '../Art';
import Kit from '../Kit';
import { PHOTOS, photoUrl } from '@/lib/activities/photos';
import type { Activity, Card, Slide } from '@/lib/activities';

function CardBox({ c, i }: { c: Card; i: number }) {
  return (
    <div className="sl-card" style={{ ['--i' as string]: i }}>
      {c.art && <Art id={c.art} className="sl-card__art" />}
      <div className="sl-card__txt">
        {c.tag && <span className="sl-card__tag">{c.tag}</span>}
        <b>{c.title}</b>
        {c.text && <span>{c.text}</span>}
      </div>
    </div>
  );
}

function Phrases({ items }: { items: string[] }) {
  return (
    <div className="sl-phrases">
      {items.map((p, i) => <span key={i} className="sl-phrase" style={{ ['--i' as string]: i + 6 }}>{p}</span>)}
    </div>
  );
}

// Рамка слайда: фото-фон, фірмова плашка Murly, нижній рядок
function Frame({ a, s, cover, children }: { a: Activity; s: Slide; cover?: boolean; children: React.ReactNode }) {
  const set = PHOTOS[a.slug];
  const ph = set ? set[s.kind === 'cover' ? 0 : s.kind === 'questions' || s.kind === 'phrases' ? 1 : 2] : null;
  return (
    <section className={`asl sl--${a.color} ${cover ? 'sl--cover' : ''} ${ph ? 'has-photo' : ''}`}>
      {ph && <div className="asl-bg" style={{ backgroundImage: `url(${photoUrl(ph.id)})` }} aria-hidden="true" />}
      <span className="asl-brand" aria-label="Murly">MUR<Kit id="st-cat-blep" className="asl-brand__cat" />LY</span>
      {children}
    </section>
  );
}

export default function SlideView({ a, s, n, total }: { a: Activity; s: Slide; n: number; total: number }) {
  const foot = (
    <div className="sl-foot">
      <span className="sl-brand">murly.com.ua</span>
      <span>{a.title}</span>
      <span>{n} / {total}</span>
    </div>
  );

  if (s.kind === 'cover') {
    return (
      <Frame a={a} s={s} cover>
        <div className="sl-in">
          <div className="sl-cover__text">
            <span className="sl-levels">{a.levels.join(' · ')}</span>
            <h2 className="sl-cover__title">{s.title}</h2>
            {s.subtitle && <p className="sl-cover__sub">{s.subtitle}</p>}
          </div>
          <div className={`sl-cover__art sl-cover__art--${Math.min(3, s.art.length)}`}>
            {s.art.slice(0, 3).map((id, i) => <Art key={id} id={id} className={`sl-float sl-float--${i}`} />)}
          </div>
        </div>
        {foot}
      </Frame>
    );
  }

  if (s.kind === 'questions') {
    return (
      <Frame a={a} s={s}>
        <div className="sl-in">
          <header className="sl-head">
            <h2 className="sl-title">{s.title}</h2>
            {s.instruction && <p className="sl-instr">{s.instruction}</p>}
          </header>
          <div className="sl-qwrap">
            <ol className="sl-qs">{s.questions.map((q, i) => <li key={i} style={{ ['--i' as string]: i }}>{q}</li>)}</ol>
            {s.art && <Art id={s.art} className="sl-qart sl-float sl-float--1" />}
          </div>
        </div>
        {foot}
      </Frame>
    );
  }

  if (s.kind === 'phrases') {
    return (
      <Frame a={a} s={s}>
        <div className="sl-in">
          <header className="sl-head">
            <h2 className="sl-title">{s.title}</h2>
            {s.instruction && <p className="sl-instr">{s.instruction}</p>}
          </header>
          <div className={`sl-groups sl-groups--${Math.min(3, s.groups.length)}`}>
            {s.groups.map((g, i) => (
              <div key={i} className="sl-group" style={{ ['--i' as string]: i }}>
                <b>{g.title}</b>
                <ul>{g.items.map((x, j) => <li key={j}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          {s.art && <Art id={s.art} className="sl-corner sl-float sl-float--2" />}
        </div>
        {foot}
      </Frame>
    );
  }

  if (s.kind === 'choose') {
    return (
      <Frame a={a} s={s}>
        <div className="sl-in">
          <header className="sl-head">
            <h2 className="sl-title">{s.title}</h2>
            <p className="sl-instr">{s.instruction}</p>
          </header>
          <div className={`sl-options sl-options--${s.options.length}`}>
            {s.options.map((c, i) => (
              <div key={i} className="sl-option" style={{ ['--i' as string]: i }}>
                <span className="sl-option__n">{String.fromCharCode(65 + i)}</span>
                {c.art && <Art id={c.art} className="sl-option__art" />}
                <b>{c.title}</b>
                {c.text && <span>{c.text}</span>}
              </div>
            ))}
          </div>
          {s.phrases?.length ? <Phrases items={s.phrases} /> : null}
        </div>
        {foot}
      </Frame>
    );
  }

  // cards
  const cols = s.cols ?? (s.cards.length <= 4 ? 2 : s.cards.length <= 6 ? 3 : 4);
  return (
    <Frame a={a} s={s}>
      <div className="sl-in">
        <header className="sl-head">
          <h2 className="sl-title">{s.title}</h2>
          <p className="sl-instr">{s.instruction}</p>
        </header>
        <div className={`sl-cards sl-cards--${cols}`}>
          {s.cards.map((c, i) => <CardBox key={i} c={c} i={i} />)}
        </div>
        {s.phrases?.length ? <Phrases items={s.phrases} /> : null}
      </div>
      {foot}
    </Frame>
  );
}
