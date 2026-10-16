// Котики Murly зі спрайту public/kotyky.svg (il-* сцени, st-* стікери).
// Кольори: --cat-fur, --cat-accent, --cat-accent-2, --cat-blob, --cat-box, --sticker.
export default function Kit({ id, className = '', style }: { id: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={`kit ${className}`} viewBox="0 0 200 200" aria-hidden="true" focusable="false" style={style}>
      <use href={`/kotyky.svg#${id}`} />
    </svg>
  );
}
