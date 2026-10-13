// Наші рисовані іконки зі спрайту public/ikonky.svg
export default function Icon({ id, className = 'mu-ic' }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/ikonky.svg#${id}`} />
    </svg>
  );
}
