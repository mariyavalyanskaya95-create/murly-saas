// Прості картинки для дитячого тесту: малюємо самі, у кольорах Murly
const S = { stroke: '#1B2140', strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

function Ball({ r, cx = 50, cy = 60 }: { r: number; cx?: number; cy?: number }) {
  return <g {...S}><circle cx={cx} cy={cy} r={r} fill="#AFC3F0" /><path d={`M${cx - r} ${cy}q${r} ${-r * 0.6} ${r * 2} 0`} fill="none" /><path d={`M${cx} ${cy - r}q${r * 0.5} ${r} 0 ${r * 2}`} fill="none" /></g>;
}
function Book({ y }: { y: number }) {
  return <g {...S}><rect x="38" y={y} width="24" height="16" rx="2" fill="#F4C0D1" /><path d={`M50 ${y}v16`} /></g>;
}
function Kid({ h, girl }: { h: number; girl?: boolean }) {
  const top = 92 - h;
  return (
    <g {...S}>
      <circle cx="50" cy={top + 9} r="9" fill="#FCE8DA" />
      {girl && <path d={`M41 ${top + 7}q9-12 18 0`} fill="#7B5A3A" />}
      <rect x="40" y={top + 18} width="20" height={h - 34} rx="6" fill={girl ? '#F4C0D1' : '#AFC3F0'} />
      <path d={`M45 ${top + h - 16}V92M55 ${top + h - 16}V92`} />
    </g>
  );
}

const PICS: Record<string, JSX.Element> = {
  cat: <g {...S}><path d="M28 40l4-18 12 10h12l12-10 4 18" fill="#FFF" /><ellipse cx="50" cy="52" rx="24" ry="20" fill="#FFF" /><circle cx="42" cy="50" r="2.5" fill="#1B2140" /><circle cx="58" cy="50" r="2.5" fill="#1B2140" /><path d="M47 58q3 3 6 0" fill="none" /><ellipse cx="50" cy="86" rx="18" ry="8" fill="#FFF" /></g>,
  dog: <g {...S}><ellipse cx="50" cy="52" rx="22" ry="20" fill="#E7B77A" /><path d="M28 40q-8 14 2 22M72 40q8 14-2 22" fill="#A8743F" /><circle cx="42" cy="50" r="2.5" fill="#1B2140" /><circle cx="58" cy="50" r="2.5" fill="#1B2140" /><ellipse cx="50" cy="60" rx="5" ry="4" fill="#1B2140" /><ellipse cx="50" cy="86" rx="18" ry="8" fill="#E7B77A" /></g>,
  fish: <g {...S}><ellipse cx="46" cy="50" rx="26" ry="16" fill="#F7D46B" /><path d="M72 50l16-12v24z" fill="#F7D46B" /><circle cx="34" cy="46" r="3" fill="#1B2140" /></g>,
  bird: <g {...S}><circle cx="48" cy="52" r="20" fill="#AFC3F0" /><path d="M68 50l12 4-12 4z" fill="#F7D46B" /><circle cx="56" cy="46" r="2.5" fill="#1B2140" /><path d="M36 54q8 10 18 2" fill="none" /></g>,
  frog: <g {...S}><ellipse cx="50" cy="58" rx="28" ry="18" fill="#9ED9A4" /><circle cx="38" cy="38" r="9" fill="#9ED9A4" /><circle cx="62" cy="38" r="9" fill="#9ED9A4" /><circle cx="38" cy="38" r="3" fill="#1B2140" /><circle cx="62" cy="38" r="3" fill="#1B2140" /><path d="M38 62q12 8 24 0" fill="none" /></g>,
  apple: <g {...S}><path d="M50 32c-10-8-30-4-28 18 2 22 18 34 28 26 10 8 26-4 28-26 2-22-18-26-28-18z" fill="#F08A8A" /><path d="M50 32q2-12 10-16" fill="none" /><path d="M54 24q10-6 16 2-8 6-16-2z" fill="#9ED9A4" /></g>,
  banana: <g {...S}><path d="M20 40q10 40 60 28q-36-4-46-36z" fill="#F7D46B" /><path d="M20 40l-4-6" /></g>,
  ball: <Ball r={22} />,
  ballsmall: <g><Ball r={11} cy={74} /></g>,
  ballbig: <Ball r={30} cy={58} />,
  star: <path {...S} d="M50 16l10 22 24 2-18 16 6 24-22-13-22 13 6-24-18-16 24-2z" fill="#F7D46B" />,
  sun: <g {...S}><circle cx="50" cy="50" r="18" fill="#F7D46B" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d={`M${50 + 26 * Math.cos((a * Math.PI) / 180)} ${50 + 26 * Math.sin((a * Math.PI) / 180)}L${50 + 36 * Math.cos((a * Math.PI) / 180)} ${50 + 36 * Math.sin((a * Math.PI) / 180)}`} />)}</g>,
  tree: <g {...S}><rect x="44" y="60" width="12" height="28" fill="#A8743F" /><circle cx="50" cy="42" r="26" fill="#9ED9A4" /></g>,
  house: <g {...S}><path d="M20 48L50 20l30 28" fill="#F08A8A" /><rect x="26" y="46" width="48" height="40" fill="#FCE8DA" /><rect x="44" y="62" width="12" height="24" fill="#AFC3F0" /></g>,
  car: <g {...S}><path d="M14 64v-12l10-14h36l12 14h14v12z" fill="#AFC3F0" /><circle cx="30" cy="66" r="8" fill="#1B2140" /><circle cx="72" cy="66" r="8" fill="#1B2140" /></g>,
  red: <rect {...S} x="22" y="22" width="56" height="56" rx="14" fill="#E85A5A" />,
  blue: <rect {...S} x="22" y="22" width="56" height="56" rx="14" fill="#4A7BE0" />,
  green: <rect {...S} x="22" y="22" width="56" height="56" rx="14" fill="#5CB86A" />,
  two: <g {...S}><circle cx="36" cy="50" r="12" fill="#F4C0D1" /><circle cx="64" cy="50" r="12" fill="#F4C0D1" /></g>,
  three: <g {...S}><circle cx="28" cy="50" r="11" fill="#F4C0D1" /><circle cx="50" cy="50" r="11" fill="#F4C0D1" /><circle cx="72" cy="50" r="11" fill="#F4C0D1" /></g>,
  bookon: <g {...S}><rect x="18" y="56" width="64" height="6" fill="#A8743F" /><path d="M24 62v28M76 62v28" /><Book y={40} /></g>,
  bookunder: <g {...S}><rect x="18" y="40" width="64" height="6" fill="#A8743F" /><path d="M24 46v44M76 46v44" /><Book y={74} /></g>,
  tallboy: <g><g transform="translate(-16 0)"><Kid h={80} /></g><g transform="translate(16 0)"><Kid h={52} girl /></g></g>,
  tallgirl: <g><g transform="translate(-16 0)"><Kid h={52} /></g><g transform="translate(16 0)"><Kid h={80} girl /></g></g>,
};

export default function KidPic({ id }: { id: string }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true" className="kp">{PICS[id] ?? null}</svg>;
}
