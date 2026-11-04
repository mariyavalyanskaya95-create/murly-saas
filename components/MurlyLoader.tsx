// Завантаження: олівець малює коло навколо лапки Murly (ідея з uiverse, малюнок наш).
import Icon from './Icon';

export default function MurlyLoader({ label = 'Murly' }: { label?: string }) {
  return (
    <div className="mu-loader" role="status" aria-live="polite">
      <svg viewBox="0 0 100 100" className="mu-loader__ring" aria-hidden="true">
        <circle cx="50" cy="50" r="38" pathLength="100" />
      </svg>
      <Icon id="c-paw" className="mu-loader__paw" />
      <span className="mu-loader__txt">{label}</span>
    </div>
  );
}
