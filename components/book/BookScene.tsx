// Картинки-асоціації для граматичної книги Murly: кумедні кульки з ручками й ніжками, намальовані нами.
import type { Scene } from '@/lib/grammar-book';
import type React from 'react';

const INK = '#1B2140';
type BallProps = { x: number; y: number; r?: number; fill: string; label?: string; mood?: 'smile' | 'grin' | 'sly' | 'wow'; arms?: 'down' | 'up' | 'side' | 'hold'; legs?: 'stand' | 'run' | 'jump'; fs?: number; tilt?: number };

function Ball({ x, y, r = 46, fill, label, mood = 'smile', arms = 'down', legs = 'stand', fs, tilt = 0 }: BallProps) {
  const ey = y - r * 0.28; const ex = r * 0.3;
  const leg = legs === 'run'
    ? <><path d={`M${x - r * 0.3} ${y + r * 0.9} l-${r * 0.35} ${r * 0.55} l-${r * 0.18} 0`} /><path d={`M${x + r * 0.3} ${y + r * 0.9} l${r * 0.4} ${r * 0.4} l${r * 0.1} ${r * 0.22}`} /></>
    : legs === 'jump'
      ? <><path d={`M${x - r * 0.3} ${y + r * 0.9} q-${r * 0.35} ${r * 0.2} -${r * 0.2} ${r * 0.45}`} /><path d={`M${x + r * 0.3} ${y + r * 0.9} q${r * 0.35} ${r * 0.2} ${r * 0.2} ${r * 0.45}`} /></>
      : <><path d={`M${x - r * 0.3} ${y + r * 0.92} l-${r * 0.06} ${r * 0.62} l-${r * 0.22} 0`} /><path d={`M${x + r * 0.3} ${y + r * 0.92} l${r * 0.06} ${r * 0.62} l${r * 0.22} 0`} /></>;
  const arm = arms === 'up'
    ? <><path d={`M${x - r * 0.95} ${y} q-${r * 0.35} -${r * 0.45} -${r * 0.25} -${r * 0.85}`} /><path d={`M${x + r * 0.95} ${y} q${r * 0.35} -${r * 0.45} ${r * 0.25} -${r * 0.85}`} /></>
    : arms === 'side'
      ? <><path d={`M${x - r * 0.97} ${y + r * 0.1} l-${r * 0.6} -${r * 0.05}`} /><path d={`M${x + r * 0.97} ${y + r * 0.1} l${r * 0.6} -${r * 0.05}`} /></>
      : arms === 'hold'
        ? <><path d={`M${x - r * 0.95} ${y + r * 0.15} q-${r * 0.2} ${r * 0.45} ${r * 0.2} ${r * 0.6}`} /><path d={`M${x + r * 0.95} ${y + r * 0.15} q${r * 0.2} ${r * 0.45} -${r * 0.2} ${r * 0.6}`} /></>
        : <><path d={`M${x - r * 0.95} ${y + r * 0.1} q-${r * 0.3} ${r * 0.35} -${r * 0.2} ${r * 0.7}`} /><path d={`M${x + r * 0.95} ${y + r * 0.1} q${r * 0.3} ${r * 0.35} ${r * 0.2} ${r * 0.7}`} /></>;
  const mouth = mood === 'grin'
    ? <path d={`M${x - r * 0.28} ${y + r * 0.02} q${r * 0.28} ${r * 0.38} ${r * 0.56} 0 z`} fill="#fff" />
    : mood === 'sly'
      ? <path d={`M${x - r * 0.25} ${y + r * 0.08} q${r * 0.3} ${r * 0.18} ${r * 0.5} -${r * 0.08}`} fill="none" />
      : mood === 'wow'
        ? <ellipse cx={x} cy={y + r * 0.0} rx={r * 0.09} ry={r * 0.12} fill={INK} />
        : <path d={`M${x - r * 0.24} ${y + r * 0.02} q${r * 0.24} ${r * 0.26} ${r * 0.48} 0`} fill="none" />;
  return (
    <g transform={tilt ? `rotate(${tilt} ${x} ${y})` : undefined} stroke={INK} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
      <g fill="none">{leg}{arm}</g>
      <circle cx={x} cy={y} r={r} fill={fill} />
      <path d={`M${x - r * 0.62} ${y - r * 0.5} q${r * 0.12} -${r * 0.25} ${r * 0.35} -${r * 0.32}`} stroke="#fff" strokeWidth={4} fill="none" opacity={0.7} />
      {mood === 'sly'
        ? <><path d={`M${x - ex - r * 0.12} ${ey} h${r * 0.24}`} /><path d={`M${x + ex - r * 0.12} ${ey} h${r * 0.24}`} /></>
        : <><circle cx={x - ex} cy={ey} r={r * 0.13} fill="#fff" /><circle cx={x - ex + 1} cy={ey + 1} r={r * 0.06} fill={INK} stroke="none" /><circle cx={x + ex} cy={ey} r={r * 0.13} fill="#fff" /><circle cx={x + ex + 1} cy={ey + 1} r={r * 0.06} fill={INK} stroke="none" /></>}
      <circle cx={x - r * 0.5} cy={y + r * 0.02} r={r * 0.1} fill="#F4B6C8" stroke="none" opacity={0.8} />
      <circle cx={x + r * 0.5} cy={y + r * 0.02} r={r * 0.1} fill="#F4B6C8" stroke="none" opacity={0.8} />
      {mouth}
      {label && <text x={x} y={y + r * 0.62} textAnchor="middle" fontFamily="Unbounded, system-ui, sans-serif" fontWeight={800} fontSize={fs ?? r * 0.36} fill={INK} stroke="none">{label}</text>}
    </g>
  );
}

const Word = ({ x, y, children, size = 22, color = INK, anchor = 'middle' as const }: { x: number; y: number; children: React.ReactNode; size?: number; color?: string; anchor?: 'middle' | 'start' | 'end' }) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily="Unbounded, system-ui, sans-serif" fontWeight={800} fontSize={size} fill={color}>{children}</text>
);
const Pill = ({ x, y, w, text, fill = '#fff' }: { x: number; y: number; w: number; text: string; fill?: string }) => (
  <g><rect x={x - w / 2} y={y - 19} width={w} height={34} rx={17} fill={fill} stroke={INK} strokeWidth={2.6} /><text x={x} y={y + 5} textAnchor="middle" fontFamily="Unbounded, system-ui, sans-serif" fontWeight={700} fontSize={16} fill={INK}>{text}</text></g>
);
const Arrow = ({ d }: { d: string }) => (
  <g fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 8"><path d={d} /></g>
);
const Dollar = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => <text x={x} y={y} fontFamily="Unbounded, system-ui, sans-serif" fontWeight={900} fontSize={30 * s} fill="#E7B64A" stroke={INK} strokeWidth={1.4}>$</text>;

export default function BookScene({ scene, className = '' }: { scene: Scene; className?: string }) {
  return (
    <svg className={`gb-scene ${className}`} viewBox="0 0 600 300" role="img" aria-hidden="true">
      <rect x="0" y="0" width="600" height="300" rx="28" fill="#F6F4FF" />
      {[...Array(14)].map((_, i) => <circle key={i} cx={30 + (i * 83) % 560} cy={22 + (i * 47) % 260} r={3} fill="#DDE2F4" />)}
      {scene === 'be-family' && <>
        <Ball x={95} y={120} r={42} fill="#FFFFFF" label="I" mood="smile" arms="side" />
        <Ball x={175} y={120} r={42} fill="#FFC98B" label="am" mood="grin" arms="side" />
        <Pill x={135} y={250} w={120} text="I am" fill="#FFE7CC" />
        <Ball x={300} y={120} r={42} fill="#B9E6C9" label="is" mood="grin" arms="up" />
        <Word x={300} y={45} size={16}>he · she · it</Word>
        <Pill x={300} y={250} w={130} text="she is" fill="#DDF3E4" />
        <Ball x={455} y={120} r={42} fill="#C7C2F3" label="are" mood="grin" arms="side" />
        <Ball x={530} y={140} r={26} fill="#FFFFFF" label="we" mood="smile" arms="side" fs={12} />
        <Ball x={386} y={140} r={26} fill="#FFFFFF" label="you" mood="smile" arms="side" fs={11} />
        <Ball x={500} y={70} r={22} fill="#FFFFFF" label="they" mood="smile" fs={9} />
        <Pill x={465} y={250} w={150} text="they are" fill="#E6E3FA" />
      </>}
      {scene === 'be-flip' && <>
        <Ball x={130} y={150} r={40} fill="#FFFFFF" label="you" mood="smile" fs={14} />
        <Ball x={235} y={150} r={40} fill="#C7C2F3" label="are" mood="smile" fs={15} />
        <Word x={185} y={262} size={18}>You are ready.</Word>
        <Arrow d="M235 100 C 240 20, 340 10, 360 95" />
        <path d="M352 86 l9 12 l5 -14" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <Ball x={395} y={150} r={40} fill="#C7C2F3" label="Are" mood="wow" arms="up" legs="jump" tilt={-8} fs={15} />
        <Ball x={500} y={150} r={40} fill="#FFFFFF" label="you" mood="smile" fs={14} />
        <Word x={448} y={262} size={18} color="#534AB7">Are you ready?</Word>
      </>}
      {scene === 'ing-motor' && <>
        <Ball x={120} y={140} r={44} fill="#B9E6C9" label="is" mood="grin" arms="side" />
        <Word x={120} y={60} size={14}>водій · driver</Word>
        <rect x={210} y={110} width={170} height={62} rx={20} fill="#fff" stroke={INK} strokeWidth={3} />
        <Word x={295} y={150} size={26}>play</Word>
        <Ball x={440} y={140} r={40} fill="#FFC98B" label="-ing" mood="grin" arms="side" legs="run" fs={16} />
        {[0, 1, 2].map((i) => <path key={i} d={`M${500 + i * 14} ${120 + i * 18} h30`} stroke={INK} strokeWidth={3} strokeLinecap="round" />)}
        <Word x={300} y={262} size={20}>She is playing. <tspan fill="#534AB7">Right now!</tspan></Word>
      </>}
      {scene === 'ing-flip' && <>
        <Ball x={120} y={150} r={40} fill="#B9E6C9" label="Is" mood="wow" arms="up" legs="jump" tilt={-8} fs={15} />
        <Ball x={230} y={150} r={40} fill="#FFFFFF" label="she" mood="smile" fs={14} />
        <rect x={290} y={122} width={130} height={56} rx={18} fill="#fff" stroke={INK} strokeWidth={3} />
        <Word x={355} y={158} size={22}>sleep</Word>
        <Ball x={470} y={150} r={36} fill="#FFC98B" label="-ing" mood="sly" fs={14} />
        <Word x={520} y={90} size={22} color="#534AB7">?</Word>
        <Word x={300} y={262} size={20}>Is she sleeping?</Word>
      </>}
      {scene === 'simple-thieves' && <>
        <rect x={40} y={70} width={210} height={150} rx={30} fill="#FFE1EC" stroke={INK} strokeWidth={3} />
        {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={78 + c * 45} cy={105 + r * 40} r={15} fill={['#FFC98B', '#B9E6C9', '#C7C2F3', '#BFE3F2'][c]} stroke={INK} strokeWidth={2.4} />))}
        <Word x={145} y={50} size={15}>simple dimple</Word>
        <Word x={145} y={262} size={18}>I play. We play.</Word>
        <Ball x={340} y={140} r={34} fill="#BFE3F2" label="he" mood="sly" arms="hold" fs={14} />
        <Ball x={425} y={140} r={34} fill="#F7C3D4" label="she" mood="sly" arms="hold" fs={13} />
        <Ball x={510} y={140} r={34} fill="#D8C9F5" label="it" mood="sly" arms="hold" fs={14} />
        {[0, 1, 2].map((i) => <path key={i} d={`M${312 + i * 85} ${126} h56`} stroke={INK} strokeWidth={9} strokeLinecap="round" opacity={0.9} />)}
        <circle cx={560} cy={215} r={26} fill="#fff" stroke={INK} strokeWidth={3} />
        <Word x={560} y={225} size={28} color="#D83A6E">S</Word>
        <Dollar x={300} y={70} /><Dollar x={470} y={62} s={0.8} /><Dollar x={540} y={92} s={0.7} />
        <Word x={430} y={262} size={18}>He play<tspan fill="#D83A6E">s</tspan>.</Word>
      </>}
    </svg>
  );
}
