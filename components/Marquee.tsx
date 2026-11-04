// Бігучий рядок Murly: тонка смужка з розрідженими літерами, як розділювач між блоками.
// Анімація чисто CSS, при prefers-reduced-motion стоїть на місці.
import Icon from './Icon';

export default function Marquee({ items, tone = 'ink' }: { items: string[]; tone?: 'ink' | 'blue' }) {
  const row = (k: string) => (
    <div className="mu-mq__row" aria-hidden={k === 'b' ? true : undefined} key={k}>
      {items.map((x, i) => (
        <span key={i} className="mu-mq__it">{x}<Icon id="c-paw" className="mu-mq__ic" /></span>
      ))}
    </div>
  );
  return (
    <div className={`mu-mq mu-mq--${tone}`} role="presentation">
      <div className="mu-mq__track">{row('a')}{row('b')}</div>
    </div>
  );
}
