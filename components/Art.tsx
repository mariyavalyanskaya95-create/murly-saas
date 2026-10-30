// Ілюстрації Murly зі спрайту public/art.svg
export default function Art({ id, className = '', title }: { id: string; className?: string; title?: string }) {
  return (<svg className={`art ${className}`} viewBox="0 0 200 200" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false"><use href={`/art.svg#${id}`} /></svg>);
}
