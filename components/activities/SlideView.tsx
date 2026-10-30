'use client';
// Один слайд активності. Розмір тексту залежить від ширини слайда (container query), тож однаково виглядає
// у прев’ю, на весь екран і в PDF. live = показ на уроці: картки відкриваються, шкали клікаються, фото збільшується.
import { useState } from 'react';
import Art from '../Art';
import Kit from '../Kit';
import { PHOTOS, isPhotoId, photoUrl } from '@/lib/activities/photos';
import type { Activity, Card, Slide } from '@/lib/activities';

type Live = { live?: boolean; pick?: number | null };

function CardBox({ c, i, live, picked }: { c: Card; i: number; live?: boolean; picked?: boolean }) {
  const [open, setOpen] = useState(false);
  const cls = `sl-card ${c.secret ? 'has-secret' : ''} ${open ? 'is-open' : ''} ${picked ? 'is-picked' : ''}`;
  const body = (
    <>
      {c.art && <Art id={c.art} className="sl-card__art" />}
      <div className="sl-card__txt">
        {c.tag && <span className="sl-card__tag">{c.tag}</span>}
        <b>{c.title}</b>
        {c.text && <span>{c.text}</span>}
        {c.secret && <span className="sl-secret">{live && !open ? '?' : c.secret}</span>}
      </div>
    </>
  );
  if (!live) return <div className={cls} style={{ ['--i' as string]: i }}>{body}</div>;
  return <button type="button" className={cls} style={{ ['--i' as string]: i }} onClick={() => setOpen(!open)} aria-pressed={open}>{body}</button>;
}

function Phrases({ items }: { items: string[] }) {
  return (
    <div className="sl-phrases">
      {items.map((p, i) => <span key={i} className="sl-phrase" style={{ ['--i' as string]: i + 6 }}>{p}</span>)}
    </div>
  );
}

// Рядок шкали: 5 точок, учень ставить котика
function ScaleRow({ text, i, live }: { text: string; i: number; live?: boolean }) {
  const [v, setV] = useState<number | null>(null);
  return (
    <div className="sl-scale__row" style={{ ['--i' as string]: i }}>
      <span className="sl-scale__txt">{text}</span>
      <span className="sl-scale__line">
        {[0, 1, 2, 3, 4].map((k) => live
          ? <button key={k} type="button" className={`sl-scale__dot ${v === k ? 'is-on' : ''}`} onClick={() => setV(v === k ? null : k)} aria-label={`${k + 1} / 5`}>{v === k && <Kit id="st-cat-blep" className="sl-scale__cat" />}</button>
          : <span key={k} className="sl-scale__dot" />)}
      </span>
    </div>
  );
}

// Рамка слайда: фото-фон, фірмова плашка Murly
function Frame({ a, s, cover, children }: { a: Activity; s: Slide; cover?: boolean; children: React.ReactNode }) {
  const set = PHOTOS[a.slug];
  const ph = set ? set[s.kind === 'cover' ? 0 : s.kind === 'questions' || s.kind === 'phrases' || s.kind === 'scale' ? 1 : 2] : null;
  return (
    <section className={`asl sl--${a.color} sl-k--${s.kind} ${cover ? 'sl--cover' : ''} ${ph ? 'has-photo' : ''}`}>
      {ph && <div className="asl-bg" style={{ backgroundImage: `url(${photoUrl(ph.id)})` }} aria-hidden="true" />}
      <span className="asl-brand" aria-label="Murly">MUR<Kit id="st-cat-blep" className="asl-brand__cat" />LY</span>
      {children}
    </section>
  );
}

function Head({ title, instruction }: { title: string; instruction?: string }) {
  return (
    <header className="sl-head">
      <h2 className="sl-title">{title}</h2>
      {instruction && <p className="sl-instr">{instruction}</p>}
    </header>
  );
}

export default function SlideView({ a, s, n, total, live, pick }: { a: Activity; s: Slide; n: number; total: number } & Live) {
  const [zoom, setZoom] = useState(false);
  const [shown, setShown] = useState<Record<number, boolean>>({});
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

  if (s.kind === 'picture') {
    const ok = isPhotoId(s.photo);
    const img = ok ? <img src={photoUrl(s.photo, 1600)} alt="" loading="lazy" /> : <Art id="a-camera" className="sl-pic__ph" />;
    return (
      <Frame a={a} s={s}>
        <div className={`sl-in ${zoom ? 'is-zoom' : ''}`}>
          <Head title={s.title} instruction={s.instruction} />
          <div className="sl-pic">
            {live ? <button type="button" className="sl-pic__img" onClick={() => setZoom(!zoom)} aria-label="Zoom">{img}</button> : <div className="sl-pic__img">{img}</div>}
            <div className="sl-pic__side">
              <ol className="sl-qs sl-qs--sm">{s.questions.map((q, i) => <li key={i} style={{ ['--i' as string]: i }}>{q}</li>)}</ol>
              {s.words?.length ? <div className="sl-words"><b>Useful words</b>{s.words.map((w, i) => <span key={i}>{w}</span>)}</div> : null}
            </div>
          </div>
        </div>
        {foot}
      </Frame>
    );
  }

  if (s.kind === 'scale') {
    return (
      <Frame a={a} s={s}>
        <div className="sl-in">
          <Head title={s.title} instruction={s.instruction} />
          <div className="sl-scale">
            <div className="sl-scale__ends"><span /><span className="sl-scale__line sl-scale__labels"><i>{s.left}</i><i>{s.right}</i></span></div>
            {s.statements.map((x, i) => <ScaleRow key={i} text={x} i={i} live={live} />)}
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
          <Head title={s.title} instruction={s.instruction} />
          <div className="sl-qwrap">
            <ol className="sl-qs">{s.questions.map((q, i) => <li key={i} className={pick === i ? 'is-picked' : ''} style={{ ['--i' as string]: i }}>{q}</li>)}</ol>
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
          <Head title={s.title} instruction={s.instruction} />
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
          <Head title={s.title} instruction={s.instruction} />
          <div className={`sl-options sl-options--${s.options.length}`}>
            {s.options.map((c, i) => {
              const inner = (
                <>
                  <span className="sl-option__n">{String.fromCharCode(65 + i)}</span>
                  {c.art && <Art id={c.art} className="sl-option__art" />}
                  <b>{c.title}</b>
                  {c.text && <span>{c.text}</span>}
                  {c.secret && <span className="sl-secret">{live && !shown[i] ? 'Twist? Click!' : c.secret}</span>}
                </>
              );
              const cls = `sl-option ${c.secret ? 'has-secret' : ''} ${shown[i] ? 'is-open' : ''} ${pick === i ? 'is-picked' : ''}`;
              return live
                ? <button key={i} type="button" className={cls} style={{ ['--i' as string]: i }} onClick={() => setShown({ ...shown, [i]: !shown[i] })}>{inner}</button>
                : <div key={i} className={cls} style={{ ['--i' as string]: i }}>{inner}</div>;
            })}
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
        <Head title={s.title} instruction={s.instruction} />
        <div className={`sl-cards sl-cards--${cols}`}>
          {s.cards.map((c, i) => <CardBox key={i} c={c} i={i} live={live} picked={pick === i} />)}
        </div>
        {s.phrases?.length ? <Phrases items={s.phrases} /> : null}
      </div>
      {foot}
    </Frame>
  );
}
