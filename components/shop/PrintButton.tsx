'use client';
export default function PrintButton({ label }: { label: string }) {
  return <button type="button" className="mu-btn mu-btn--lime" onClick={() => window.print()}>{label}</button>;
}
