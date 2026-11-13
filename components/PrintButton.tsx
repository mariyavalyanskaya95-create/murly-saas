'use client';
// Кнопка «Роздрукувати / Зберегти PDF»: відкриває системне вікно друку, де можна обрати «Зберегти як PDF»
export default function PrintButton({ label }: { label: string }) {
  return <button type="button" className="mu-btn mu-btn--lime" onClick={() => window.print()}>{label}</button>;
}
