// Спільні шматки сцен: контур, котик Бульбашка
export const O = '#2B2622';

export function Bubbles({ x, y, s = 1, helmet = false, children }: { x: number; y: number; s?: number; helmet?: boolean; children?: React.ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {helmet && <circle cx="0" cy="0" r="64" fill="#E6F6FA" fillOpacity=".35" stroke={O} strokeWidth="3" />}
      {!helmet && <path d="M-30 30 C -40 80, 40 80, 30 30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />}
      {!helmet && <path d="M28 60 C 60 64, 66 30, 52 20" stroke={O} strokeWidth="2.5" fill="none" strokeLinecap="round" />}
      <path d="M-34 -18 L-28 -50 L-8 -30 Z M34 -18 L28 -50 L8 -30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M-28 -44 L-24 -34 M28 -44 L24 -34" stroke="#F5A0C0" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="0" cy="2" rx="40" ry="33" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
      <ellipse cx="-14" cy="-3" rx="5" ry="6" fill={O} /><ellipse cx="14" cy="-3" rx="5" ry="6" fill={O} />
      <circle cx="-12" cy="-5" r="1.8" fill="#fff" /><circle cx="16" cy="-5" r="1.8" fill="#fff" />
      <path d="M-3 8 L3 8 L0 11 Z" fill="#F08AA8" />
      <path d="M0 11 q-6 7 -11 3 M0 11 q6 7 11 3" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="-24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" /><ellipse cx="24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" />
      <path d="M-40 6 L-58 1 M-40 12 L-58 14 M40 6 L58 1 M40 12 L58 14" stroke={O} strokeWidth="1.8" />
      {helmet && <path d="M-40 -40 C -20 -60, 20 -62, 42 -44" stroke="#fff" strokeWidth="6" opacity=".55" fill="none" strokeLinecap="round" />}
      {children}
    </g>
  );
}

// Градієнт зверху вниз одним рядком
export const Lg = ({ id, a, b }: { id: string; a: string; b: string }) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
);
