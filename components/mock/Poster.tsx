// Оголошення для Task 1 пробного НМТ. Малюються кодом (HTML + наші іконки й котики), без фото і чужих брендів.
import Icon from '@/components/Icon';
import Kit from '@/components/Kit';
import type { PosterSpec } from '@/lib/mock/types';

function Pic({ id, className }: { id: string; className: string }) {
  return /^(il|st)-/.test(id) ? <Kit id={id} className={className} /> : <Icon id={id} className={className} />;
}

export default function Poster({ p, label }: { p: PosterSpec; label?: string }) {
  const style = { '--pb': p.bg, '--pa': p.accent } as React.CSSProperties;
  const [i0, i1, i2, i3] = p.icons;
  return (
    <figure className={`pst pst--${p.theme} ${p.body.length + p.title.length * 2 + (p.theme === 'fun' ? 40 : 0) > 190 ? 'pst--long' : ''}`} style={style} aria-label={label ?? `${p.brand}: ${p.title}`}>
      {p.theme === 'block' && (
        <>
          <div className="pst__band"><span className="pst__logo"><Pic id={i0} className="pst__ic" /></span><b>{p.brand}</b></div>
          <div className="pst__photo"><Pic id={i0} className="pst__hero" /><Pic id={i1} className="pst__ic pst__ic--a" /><Pic id={i2} className="pst__ic pst__ic--b" /></div>
          <div className="pst__split">
            <p>{p.body}</p>
            <div><h3>{p.title}</h3>{p.footer && <small>{p.footer}</small>}</div>
          </div>
        </>
      )}
      {p.theme === 'warm' && (
        <>
          {[i0, i1, i2, i3].map((id, n) => id && <Pic key={n} id={id} className={`pst__deco pst__deco--${n}`} />)}
          <div className="pst__mid">
            <span className="pst__brand">{p.brand}</span>
            <h3>{p.title}</h3>
            <p className="pst__box">{p.body}</p>
            {p.footer && <small>{p.footer}</small>}
          </div>
        </>
      )}
      {p.theme === 'event' && (
        <>
          <span className="pst__brand">{p.brand}</span>
          <h3>{p.title.split(' ').map((w, n) => <span key={n}>{w}</span>)}</h3>
          <div className="pst__icons">{[i0, i1, i2, i3].map((id, n) => id && <Pic key={n} id={id} className="pst__ic" />)}</div>
          <p>{p.body}</p>
          {p.footer && <small className="pst__chip">{p.footer}</small>}
        </>
      )}
      {p.theme === 'notice' && (
        <div className="pst__paper">
          <span className="pst__tape" />
          <span className="pst__brand">{p.brand}</span>
          <h3>{p.title}</h3>
          <div className="pst__row"><Pic id={i0} className="pst__ic" /><p>{p.body}</p></div>
          {p.footer && <small>{p.footer}</small>}
          <div className="pst__tabs">{Array.from({ length: 6 }, (_, n) => <span key={n}>{p.brand.split(' ')[0]}</span>)}</div>
        </div>
      )}
      {p.theme === 'fun' && (
        <>
          <span className="pst__brand">{p.brand}</span>
          <h3>{p.title}</h3>
          <div className="pst__burst"><Pic id={i0} className="pst__hero" /></div>
          <p>{p.body}</p>
          <div className="pst__icons">{[i1, i2, i3].map((id, n) => id && <Pic key={n} id={id} className="pst__ic" />)}</div>
          {p.footer && <small className="pst__chip">{p.footer}</small>}
        </>
      )}
    </figure>
  );
}
