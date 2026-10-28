// Локація «У магазині»: полиці з продуктами, холодильник з морозивом, ящики з овочами, каса і їжачок-продавець
import { O, Lg } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

/* eslint-disable react/display-name */
function Scene({ hit, flags: f }: SceneProps) {
  const open = f.has('fridge');
  const paid = f.has('paid');
  const sw = { stroke: O, strokeWidth: 2.5, strokeLinejoin: 'round' as const };

  // пляшка: cx по центру, by низ (стоїть на полиці)
  const bottle = (cx: number, by: number, g: string, cap: string, label: React.ReactNode) => (
    <g>
      <path d={`M${cx - 21} ${by - 4} L${cx - 21} ${by - 56} C ${cx - 21} ${by - 70}, ${cx - 9} ${by - 72}, ${cx - 8} ${by - 80} L${cx - 8} ${by - 86} L${cx + 8} ${by - 86} L${cx + 8} ${by - 80} C ${cx + 9} ${by - 72}, ${cx + 21} ${by - 70}, ${cx + 21} ${by - 56} L${cx + 21} ${by - 4} Q ${cx + 21} ${by}, ${cx + 17} ${by} L${cx - 17} ${by} Q ${cx - 21} ${by}, ${cx - 21} ${by - 4} Z`} fill={`url(#${g})`} {...sw} />
      <rect x={cx - 10} y={by - 97} width="20" height="13" rx="3" fill={cap} {...sw} strokeWidth="2" />
      <rect x={cx - 21} y={by - 50} width="42" height="26" fill="#FFFDF5" stroke={O} strokeWidth="1.8" />
      {label}
      <path d={`M${cx - 14} ${by - 62} C ${cx - 15} ${by - 40}, ${cx - 15} ${by - 24}, ${cx - 14} ${by - 10}`} stroke="#fff" strokeWidth="5" opacity=".35" fill="none" strokeLinecap="round" />
    </g>
  );
  const orangeLabel = (cx: number, by: number) => (
    <g><circle cx={cx} cy={by - 37} r="8" fill="#FF9F2E" stroke={O} strokeWidth="1.5" /><path d={`M${cx + 2} ${by - 45} q6 -5 10 -1 q-5 4 -10 1 Z`} fill="#5FAE68" stroke={O} strokeWidth="1" /></g>
  );
  // стаканчик морозива
  const tub = (cx: number, by: number, cup: string, scoop: string, cherry: boolean) => (
    <g>
      <path d={`M${cx - 30} ${by - 42} C ${cx - 34} ${by - 84}, ${cx + 34} ${by - 84}, ${cx + 30} ${by - 42} Z`} fill={scoop} {...sw} />
      <path d={`M${cx - 30} ${by - 42} q 8 8 15 0 q 8 8 15 0 q 8 8 15 0 q 8 8 15 0`} fill={scoop} {...sw} strokeWidth="2" />
      <ellipse cx={cx - 10} cy={by - 66} rx="10" ry="5" fill="#fff" opacity=".35" />
      {cherry && <g><path d={`M${cx + 2} ${by - 82} q 4 -12 12 -16`} stroke={O} strokeWidth="2" fill="none" /><circle cx={cx} cy={by - 80} r="8" fill="#E2394A" stroke={O} strokeWidth="2" /><circle cx={cx - 3} cy={by - 83} r="2" fill="#fff" /></g>}
      <path d={`M${cx - 28} ${by - 38} L${cx - 22} ${by} L${cx + 22} ${by} L${cx + 28} ${by - 38} Z`} fill={cup} {...sw} />
      <path d={`M${cx - 26} ${by - 24} L${cx + 26} ${by - 24}`} stroke="#fff" strokeWidth="5" opacity=".6" />
    </g>
  );
  // ящик з овочами: задня стінка, вміст, передня дошка
  const crateBack = (x: number) => <path d={`M${x + 6} 520 L${x + 14} 494 L${x + 126} 494 L${x + 134} 520 Z`} fill="#8E5A2C" {...sw} />;
  const crateFront = (x: number) => (
    <g>
      <rect x={x} y="516" width="140" height="64" rx="5" fill="url(#sh-crate)" {...sw} />
      <path d={`M${x} 537 H${x + 140} M${x} 558 H${x + 140}`} stroke={O} strokeWidth="1.5" opacity=".35" />
      <path d={`M${x + 12} 524 c 30 -4, 70 -4, 110 0`} stroke="#fff" strokeWidth="3" opacity=".3" fill="none" strokeLinecap="round" />
      <rect x={x + 50} y="542" width="40" height="22" rx="3" fill="#FFFDF5" stroke={O} strokeWidth="1.5" />
      <path d={`M${x + 57} 550 h18 M${x + 57} 556 h26`} stroke={O} strokeWidth="1.5" opacity=".5" />
    </g>
  );
  const tomato = (cx: number, cy: number) => (
    <g>
      <circle cx={cx} cy={cy} r="23" fill="url(#sh-tomato)" {...sw} />
      <ellipse cx={cx - 8} cy={cy - 9} rx="8" ry="5" fill="#fff" opacity=".35" />
      <path d={`M${cx} ${cy - 22} l-10 -3 l6 6 l-8 4 l10 -2 l2 8 l2 -8 l10 2 l-8 -4 l6 -6 Z`} fill="#4F9A5B" stroke={O} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x={cx - 28} y={cy - 28} width="56" height="54" fill="transparent" />
    </g>
  );
  const apple = (cx: number, cy: number) => (
    <g>
      <path d={`M${cx} ${cy - 16} C ${cx - 10} ${cy - 24}, ${cx - 26} ${cy - 18}, ${cx - 24} ${cy} C ${cx - 22} ${cy + 16}, ${cx - 8} ${cy + 22}, ${cx} ${cy + 18} C ${cx + 8} ${cy + 22}, ${cx + 22} ${cy + 16}, ${cx + 24} ${cy} C ${cx + 26} ${cy - 18}, ${cx + 10} ${cy - 24}, ${cx} ${cy - 16} Z`} fill="url(#sh-apple)" {...sw} />
      <path d={`M${cx} ${cy - 16} l2 -10`} stroke="#6B4423" strokeWidth="3" strokeLinecap="round" />
      <path d={`M${cx + 2} ${cy - 22} q 10 -8 16 -2 q -8 6 -16 2 Z`} fill="#6BB55F" stroke={O} strokeWidth="1.5" />
      <ellipse cx={cx - 10} cy={cy - 6} rx="5" ry="7" fill="#fff" opacity=".3" />
    </g>
  );
  const banana = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M0 0 C 18 26, 62 30, 92 6 C 96 2, 98 -2, 96 -4 C 66 14, 26 10, 6 -10 Z" fill="url(#sh-banana)" {...sw} />
      <path d="M18 8 C 40 20, 64 18, 84 6" stroke="#fff" strokeWidth="3" opacity=".35" fill="none" strokeLinecap="round" />
      <path d="M92 6 L100 -2" stroke="#6B4423" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
  const carrot = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M-2 -4 C -14 -18, -22 -14, -30 -22 M-2 0 C -16 -6, -26 2, -34 -2 M-2 4 C -12 10, -20 18, -30 16" stroke="#4F9A5B" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M0 -10 C 34 -10, 66 -4, 86 0 C 66 4, 34 10, 0 10 C -4 6, -4 -6, 0 -10 Z" fill="url(#sh-carrot)" {...sw} />
      <path d="M24 -6 l0 5 M44 -5 l0 4 M60 2 l0 4" stroke={O} strokeWidth="1.5" opacity=".4" />
      <path d="M8 -5 C 30 -6, 50 -4, 66 -2" stroke="#fff" strokeWidth="2.5" opacity=".35" fill="none" strokeLinecap="round" />
    </g>
  );
  const tag = (x: number, y: number, c = '#FFE27A') => <g><rect x={x} y={y} width="26" height="12" rx="2" fill={c} stroke={O} strokeWidth="1.2" /><path d={`M${x + 5} ${y + 6} h14`} stroke={O} strokeWidth="1.5" opacity=".5" /></g>;
  // голочки їжачка
  const spikes = (() => {
    const cx = 838, cy = 286, pts: string[] = [];
    for (let i = 0; i <= 24; i++) {
      const a = Math.PI * (1.02 + i * 0.96 / 24);
      const r = i % 2 ? 1 : .8;
      pts.push(`${(cx + Math.cos(a) * 92 * r).toFixed(1)} ${(cy + Math.sin(a) * 104 * r).toFixed(1)}`);
    }
    return `M${cx - 86} 345 L${pts.join(' L')} L${cx + 86} 345 Z`;
  })();

  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="At the shop">
      <defs>
        <Lg id="sh-wall" a="#FFF6E6" b="#F5DFC2" />
        <Lg id="sh-floor" a="#E7D6BF" b="#C9B193" />
        <Lg id="sh-wood" a="#D9A86F" b="#A8733E" />
        <Lg id="sh-back" a="#F6E2C4" b="#E8CBA2" />
        <Lg id="sh-crate" a="#D7A46C" b="#A06A36" />
        <Lg id="sh-fridge" a="#FDFEFF" b="#C9DCE8" />
        <Lg id="sh-glass" a="#DDF2FB" b="#9FCBE2" />
        <Lg id="sh-cold" a="#F1FAFE" b="#BFE1F0" />
        <Lg id="sh-juice" a="#FFC46B" b="#F08A1E" />
        <Lg id="sh-water" a="#DDF3FF" b="#8CC6EA" />
        <Lg id="sh-cheese" a="#FFE58A" b="#F2B82F" />
        <Lg id="sh-bread" a="#E9B26A" b="#B97434" />
        <Lg id="sh-banana" a="#FFEB7A" b="#F2C12E" />
        <Lg id="sh-carrot" a="#FFA54F" b="#E86A1C" />
        <Lg id="sh-counter" a="#7CC3A6" b="#4E987C" />
        <Lg id="sh-till" a="#B9C6E6" b="#7C8DBF" />
        <Lg id="sh-hog" a="#A07450" b="#6E4A2E" />
        <Lg id="sh-red" a="#F7787A" b="#C9363F" />
        <Lg id="sh-green" a="#9AD48B" b="#5FA65A" />
        <Lg id="sh-board" a="#4E6B5C" b="#3B5547" />
        <radialGradient id="sh-tomato" cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#FF7A5C" /><stop offset="1" stopColor="#E0321F" /></radialGradient>
        <radialGradient id="sh-apple" cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#E8546A" /><stop offset="1" stopColor="#A61E34" /></radialGradient>
        <radialGradient id="sh-egg" cx=".4" cy=".3" r=".7"><stop offset="0" stopColor="#FFFDF8" /><stop offset="1" stopColor="#EED9BE" /></radialGradient>
        <radialGradient id="sh-lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#FFF4B0" stopOpacity=".8" /><stop offset="1" stopColor="#FFF4B0" stopOpacity="0" /></radialGradient>
        <radialGradient id="sh-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#E6FBFF" stopOpacity=".95" /><stop offset="1" stopColor="#E6FBFF" stopOpacity="0" /></radialGradient>
      </defs>

      {/* стіна, підлога */}
      <rect width="1000" height="600" fill="url(#sh-wall)" />
      {[60, 180, 300, 420, 540, 660, 780, 900].map((x) => <rect key={x} x={x} y="40" width="60" height="430" fill="#E9C9A0" opacity=".16" />)}
      <path d="M0 470 L1000 470 L1000 600 L0 600 Z" fill="url(#sh-floor)" stroke={O} strokeWidth="2.5" />
      {[-500, -250, 0, 250, 500, 750, 1000, 1250, 1500].map((x, i) => <path key={i} d={`M${500 + (x - 500) * .55} 470 L${x} 600`} stroke="#B89C7A" strokeWidth="1.5" opacity=".6" />)}
      {[496, 532, 578].map((y) => <path key={y} d={`M0 ${y} H1000`} stroke="#B89C7A" strokeWidth="1.5" opacity=".6" />)}
      <rect x="0" y="458" width="1000" height="12" fill="#D9B98E" stroke={O} strokeWidth="2" />

      {/* смугастий навіс */}
      {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M${i * 50} 0 H${i * 50 + 50} V34 Q ${i * 50 + 25} 62, ${i * 50} 34 Z`} fill={i % 2 ? '#FFFDF5' : '#E9555A'} stroke={O} strokeWidth="2" strokeLinejoin="round" />)}
      <path d="M0 34 H1000" stroke={O} strokeWidth="2" opacity=".25" />

      {/* лампа над холодильником */}
      <path d="M545 50 V78" stroke={O} strokeWidth="2.5" />
      <ellipse cx="545" cy="120" rx="80" ry="34" fill="url(#sh-lamp)" />
      <path d="M515 100 C 515 80, 575 80, 575 100 Z" fill="#F2B82F" {...sw} />
      <ellipse cx="545" cy="101" rx="9" ry="5" fill="#FFF4B0" stroke={O} strokeWidth="1.5" />

      {/* дошка з цінами над касою */}
      <path d="M760 50 L775 74 M930 50 L915 74" stroke={O} strokeWidth="2" />
      <rect x="740" y="72" width="210" height="104" rx="8" fill="#B97A43" {...sw} />
      <rect x="752" y="84" width="186" height="80" rx="4" fill="url(#sh-board)" stroke={O} strokeWidth="1.5" />
      <g stroke="#F4F1E6" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".85">
        <circle cx="778" cy="106" r="9" /><path d="M778 97 q2 -6 6 -7" />
        <path d="M800 106 h34 M800 140 h40 M870 106 h44 M870 140 h40" />
        <path d="M770 140 q8 -14 18 0 q-8 6 -18 0 Z" />
        <path d="M852 96 v56" opacity=".4" />
      </g>

      {/* стелаж */}
      <rect x="30" y="70" width="400" height="400" fill="url(#sh-back)" {...sw} />
      {[204, 324].map((y) => <rect key={y} x="46" y={y} width="368" height="10" fill="#D9B98E" opacity=".5" />)}
      <rect x="22" y="58" width="416" height="18" rx="4" fill="url(#sh-wood)" {...sw} />
      <rect x="30" y="70" width="16" height="400" fill="url(#sh-wood)" {...sw} />
      <rect x="414" y="70" width="16" height="400" fill="url(#sh-wood)" {...sw} />
      {/* верхня полиця */}
      <g {...hit('tea')}>
        <rect x="58" y="124" width="72" height="66" rx="4" fill="url(#sh-green)" {...sw} />
        <path d="M58 140 H130" stroke={O} strokeWidth="1.5" opacity=".3" />
        <path d="M94 150 C 78 158, 80 176, 94 180 C 108 176, 110 158, 94 150 Z M94 152 V178" fill="#E8F5D8" stroke={O} strokeWidth="1.8" />
        <ellipse cx="74" cy="132" rx="9" ry="3.5" fill="#fff" opacity=".35" />
      </g>
      <g {...hit('topJuice')}>{bottle(172, 190, 'sh-juice', '#5FAE68', orangeLabel(172, 190))}</g>
      {[[230, '#D9465A'], [278, '#8A5AB0']].map(([x, c]) => <g key={x as number}>
        <rect x={x as number} y="146" width="38" height="44" rx="7" fill={c as string} {...sw} />
        <rect x={(x as number) - 2} y="138" width="42" height="12" rx="3" fill="#F2F2F2" {...sw} strokeWidth="2" />
        <rect x={(x as number) + 6} y="160" width="26" height="16" rx="2" fill="#FFFDF5" stroke={O} strokeWidth="1.2" />
        <ellipse cx={(x as number) + 10} cy="158" rx="3" ry="8" fill="#fff" opacity=".3" />
      </g>)}
      <g {...hit('water')}>{bottle(368, 190, 'sh-water', '#3F7FC2', <path d="M352 -10 q 8 -6 16 0 t 16 0" transform="translate(0 163)" stroke="#3F7FC2" strokeWidth="2.5" fill="none" />)}</g>
      <rect x="30" y="190" width="400" height="14" fill="url(#sh-wood)" {...sw} />
      {tag(60, 194)}{tag(160, 194)}{tag(240, 194, '#BFE3F5')}{tag(356, 194)}
      {/* середня полиця */}
      <g {...hit('cheese')}>
        <path d="M60 310 L60 262 L168 286 L168 310 Z" fill="url(#sh-cheese)" {...sw} />
        <path d="M60 262 L112 244 L190 274 L168 286 Z" fill="#FFF0A8" {...sw} />
        <path d="M168 286 L190 274 L190 298 L168 310 Z" fill="#E9A92A" {...sw} />
        {[[84, 290, 7], [120, 298, 5], [140, 292, 4], [76, 274, 4]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#E9A92A" stroke={O} strokeWidth="1.2" />)}
        <ellipse cx="116" cy="262" rx="12" ry="4" fill="#fff" opacity=".35" />
      </g>
      <g {...hit('bread')}>
        <path d="M200 310 L198 282 C 196 250, 302 250, 302 282 L300 310 Z" fill="url(#sh-bread)" {...sw} />
        <path d="M222 270 q 8 -12 18 -8 M248 266 q 8 -12 18 -8 M274 268 q 8 -10 16 -4" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" opacity=".55" />
        <path d="M212 266 C 222 254, 250 250, 270 252" stroke="#fff" strokeWidth="4" opacity=".3" fill="none" strokeLinecap="round" />
      </g>
      <g {...hit('milk')}>
        <path d="M322 236 L346 214 L370 236 Z" fill="#E7F1F8" {...sw} />
        <rect x="340" y="206" width="12" height="10" fill="#3F7FC2" {...sw} strokeWidth="1.8" />
        <rect x="322" y="236" width="48" height="74" rx="2" fill="#FDFEFF" {...sw} />
        <rect x="322" y="252" width="48" height="22" fill="#5B9BD5" stroke={O} strokeWidth="1.5" />
        <text x="346" y="268" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="sans-serif">MILK</text>
        <path d="M330 284 q 8 -8 16 0 t 16 0" stroke="#5B9BD5" strokeWidth="2" fill="none" />
        <rect x="327" y="240" width="5" height="64" fill="#fff" opacity=".5" />
      </g>
      {[384].map((x) => <g key={x}><path d={`M${x} 310 L${x - 2} 284 L${x + 26} 284 L${x + 24} 310 Z`} fill="#F7B6C8" {...sw} /><rect x={x - 4} y="278" width="34" height="8" rx="2" fill="#fff" {...sw} strokeWidth="1.8" /></g>)}
      <rect x="30" y="310" width="400" height="14" fill="url(#sh-wood)" {...sw} />
      {tag(98, 314)}{tag(238, 314)}{tag(334, 314, '#BFE3F5')}
      {/* нижня полиця */}
      <g {...hit('eggs')}>
        <path d="M58 404 L66 370 L180 370 L188 404 Z" fill="#D9C4A4" {...sw} />
        {[78, 106, 134, 162].map((x) => <ellipse key={x} cx={x} cy="398" rx="13" ry="16" fill="url(#sh-egg)" {...sw} strokeWidth="2" />)}
        {[78, 106, 134, 162].map((x) => <ellipse key={`h${x}`} cx={x - 4} cy="391" rx="3" ry="5" fill="#fff" opacity=".7" />)}
        <path d="M54 404 H192 L186 430 H60 Z" fill="#C9B08A" {...sw} />
        <path d="M74 412 q 10 8 20 0 M102 412 q 10 8 20 0 M130 412 q 10 8 20 0 M158 412 q 10 8 20 0" stroke={O} strokeWidth="1.5" fill="none" opacity=".4" />
      </g>
      <g {...hit('bottomJuice')}>{bottle(234, 430, 'sh-juice', '#5FAE68', orangeLabel(234, 430))}</g>
      <g {...hit('cereal')}>
        <rect x="282" y="340" width="64" height="90" rx="3" fill="url(#sh-red)" {...sw} />
        <path d="M296 392 C 296 412, 332 412, 332 392 Z" fill="#FFFDF5" stroke={O} strokeWidth="1.8" />
        {[[302, 388], [312, 384], [322, 388], [316, 391]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#F2B82F" stroke={O} strokeWidth="1" />)}
        <rect x="290" y="352" width="48" height="14" rx="3" fill="#FFE27A" stroke={O} strokeWidth="1.2" />
        <rect x="288" y="346" width="6" height="78" fill="#fff" opacity=".25" />
      </g>
      <path d="M364 430 L360 384 C 358 368, 404 368, 402 384 L398 430 Z" fill="#F4ECDD" {...sw} />
      <path d="M362 382 q 20 -14 38 0" stroke={O} strokeWidth="2" fill="none" />
      <rect x="370" y="398" width="22" height="16" rx="2" fill="#E9C9A0" stroke={O} strokeWidth="1.2" />
      <rect x="30" y="430" width="400" height="14" fill="url(#sh-wood)" {...sw} />
      {tag(106, 434)}{tag(220, 434)}{tag(302, 434, '#BFE3F5')}

      {/* холодильник з морозивом */}
      <g {...hit('fridge')}>
        <rect x="458" y="118" width="176" height="352" rx="14" fill="url(#sh-fridge)" {...sw} />
        <rect x="458" y="118" width="176" height="42" rx="14" fill="#5B9BD5" {...sw} />
        <rect x="458" y="146" width="176" height="14" fill="#5B9BD5" />
        <g stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M546 128 V152 M535 134 L557 146 M535 146 L557 134" /></g>
        <path d="M458 160 H634" stroke={O} strokeWidth="2.5" />
        <rect x="470" y="444" width="152" height="18" rx="4" fill="#8A97A8" stroke={O} strokeWidth="2" />
        <path d="M486 449 v8 M502 449 v8 M518 449 v8 M534 449 v8 M550 449 v8 M566 449 v8 M582 449 v8 M598 449 v8" stroke={O} strokeWidth="2" opacity=".5" />
        {!open && <g>
          <rect x="472" y="170" width="148" height="266" rx="8" fill="url(#sh-glass)" {...sw} />
          <g opacity=".35">
            <rect x="482" y="250" width="40" height="40" rx="6" fill="#F28AB0" /><rect x="548" y="250" width="40" height="40" rx="6" fill="#8B5A3C" />
            <path d="M478 296 H614 M478 396 H614" stroke="#7FA9C2" strokeWidth="4" />
            <rect x="490" y="360" width="22" height="36" rx="8" fill="#5B9BD5" /><rect x="530" y="360" width="22" height="36" rx="8" fill="#F2B82F" /><rect x="570" y="360" width="22" height="36" rx="8" fill="#5FAE68" />
          </g>
          <path d="M486 196 L520 180 M486 226 L560 186 M560 420 L606 394" stroke="#fff" strokeWidth="6" opacity=".5" strokeLinecap="round" />
          <rect x="602" y="256" width="9" height="90" rx="4" fill="#E9EEF2" stroke={O} strokeWidth="2" />
        </g>}
        {open && <g>
          <rect x="472" y="170" width="148" height="266" rx="8" fill="url(#sh-cold)" {...sw} />
          <ellipse cx="546" cy="230" rx="70" ry="50" fill="url(#sh-glow)" />
          <path d="M478 300 H614 M478 398 H614" stroke="#7FA9C2" strokeWidth="5" strokeLinecap="round" />
          <path d="M478 300 H614 M478 398 H614" stroke={O} strokeWidth="1" opacity=".3" />
          {[[500, '#5B9BD5'], [540, '#F2B82F'], [580, '#5FAE68']].map(([x, c]) => <g key={x as number}>
            <rect x={(x as number) - 11} y="350" width="22" height="38" rx="9" fill={c as string} {...sw} strokeWidth="2" />
            <path d={`M${x} 388 V398`} stroke="#D9B98E" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx={(x as number) - 4} cy="362" rx="3" ry="7" fill="#fff" opacity=".4" />
          </g>)}
          <path d="M620 172 L680 150 L680 462 L620 436 Z" fill="url(#sh-glass)" {...sw} />
          <path d="M634 180 L670 166 M634 220 L668 206" stroke="#fff" strokeWidth="5" opacity=".5" strokeLinecap="round" />
          <rect x="666" y="270" width="8" height="84" rx="4" fill="#E9EEF2" stroke={O} strokeWidth="2" />
          {[[488, 186], [604, 196], [494, 420]].map(([x, y], i) => <path key={i} d={`M${x - 6} ${y} h12 M${x} ${y - 6} v12`} stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />)}
        </g>}
      </g>
      {open && <g {...hit('pinkIceCream')}>{tub(510, 298, '#FFFDF5', '#F7A1C4', true)}<rect x="474" y="200" width="72" height="100" fill="transparent" /></g>}
      {open && <g {...hit('chocIceCream')}>{tub(582, 298, '#FFFDF5', '#9A6440', false)}<rect x="546" y="200" width="72" height="100" fill="transparent" /></g>}

      {/* їжачок-продавець за прилавком */}
      <g {...hit('hedgehog')}>
        <path d={spikes} fill="url(#sh-hog)" {...sw} />
        <path d="M782 345 C 782 300, 894 300, 894 345 Z" fill="#F3DDBF" {...sw} />
        <path d="M806 345 L810 312 L866 312 L870 345 Z" fill="#5B9BD5" {...sw} />
        <path d="M812 312 C 816 296, 826 292, 830 292 M864 312 C 860 296, 850 292, 846 292" stroke="#5B9BD5" strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="826" y="322" width="24" height="16" rx="3" fill="#4A84C0" stroke={O} strokeWidth="1.8" />
        <circle cx="808" cy="232" r="11" fill="#F3DDBF" {...sw} /><circle cx="868" cy="232" r="11" fill="#F3DDBF" {...sw} />
        <circle cx="808" cy="233" r="5" fill="#F5A0C0" /><circle cx="868" cy="233" r="5" fill="#F5A0C0" />
        <ellipse cx="838" cy="266" rx="44" ry="40" fill="#F3DDBF" {...sw} />
        <ellipse cx="822" cy="258" rx="6" ry="7" fill={O} /><ellipse cx="854" cy="258" rx="6" ry="7" fill={O} />
        <circle cx="824" cy="255" r="2.2" fill="#fff" /><circle cx="856" cy="255" r="2.2" fill="#fff" />
        <ellipse cx="838" cy="276" rx="8" ry="6" fill={O} /><ellipse cx="835" cy="274" rx="2.5" ry="1.6" fill="#fff" opacity=".7" />
        <path d="M826 288 q 12 10 24 0" stroke={O} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <ellipse cx="808" cy="278" rx="8" ry="4.5" fill="#F5A0C0" opacity=".65" /><ellipse cx="868" cy="278" rx="8" ry="4.5" fill="#F5A0C0" opacity=".65" />
        <ellipse cx="826" cy="244" rx="10" ry="4" fill="#fff" opacity=".3" />
        <ellipse cx="796" cy="340" rx="12" ry="8" fill="#F3DDBF" {...sw} strokeWidth="2" />
      </g>

      {/* прилавок */}
      <rect x="690" y="352" width="320" height="118" fill="url(#sh-counter)" {...sw} />
      {[740, 800, 860, 920, 980].map((x) => <path key={x} d={`M${x} 366 V458`} stroke={O} strokeWidth="1.5" opacity=".2" />)}
      <rect x="680" y="338" width="330" height="18" rx="4" fill="url(#sh-wood)" {...sw} />
      <path d="M690 343 H990" stroke="#fff" strokeWidth="3" opacity=".3" strokeLinecap="round" />

      {/* ваги */}
      <g {...hit('scales')}>
        <path d="M700 340 L708 300 L782 300 L790 340 Z" fill="#F4F6F8" {...sw} />
        <circle cx="745" cy="320" r="14" fill="#FFFDF5" stroke={O} strokeWidth="2" />
        <path d="M745 320 L752 311" stroke="#E2394A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M735 312 l2 2 M745 308 v3 M755 312 l-2 2" stroke={O} strokeWidth="1.5" />
        <path d="M738 300 V290 H752 V300" fill="#C9CED6" stroke={O} strokeWidth="2" />
        <path d="M698 290 C 704 274, 786 274, 792 290 Z" fill="#DCE3EA" {...sw} />
        <path d="M712 284 c 20 -6, 44 -6, 60 -2" stroke="#fff" strokeWidth="3" opacity=".6" fill="none" strokeLinecap="round" />
      </g>

      {/* каса */}
      <g {...hit('till')}>
        {paid && <g>
          <path d="M922 222 C 918 196, 940 188, 936 164 L956 164 C 960 188, 938 196, 942 222 Z" fill="#FFFDF5" stroke={O} strokeWidth="1.8" />
          <path d="M932 176 h16 M930 190 h18 M928 204 h16" stroke={O} strokeWidth="1.5" opacity=".4" />
        </g>}
        <rect x="904" y="250" width="12" height="26" fill="#7C8DBF" stroke={O} strokeWidth="2" />
        <rect x="882" y="214" width="76" height="40" rx="6" fill="#4A5578" {...sw} />
        <rect x="890" y="221" width="60" height="25" rx="3" fill={paid ? '#9BE38C' : '#BFE8D2'} stroke={O} strokeWidth="1.5" />
        {paid && <path d="M906 234 l8 7 l14 -14" stroke="#2E7D3A" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        {!paid && <path d="M898 228 h20 M898 238 h36" stroke="#5E9C7E" strokeWidth="3" strokeLinecap="round" />}
        <path d="M876 324 L892 268 L986 268 L996 324 Z" fill="url(#sh-till)" {...sw} />
        {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={904 + c * 19 - r * 4} y={276 + r * 15} width="14" height="10" rx="2.5" fill={r === 2 && c === 3 ? '#E9555A' : '#F4F6F8'} stroke={O} strokeWidth="1.3" />))}
        <rect x="870" y="322" width="132" height="18" rx="3" fill="#6B7BAA" {...sw} />
        <circle cx="936" cy="331" r="3.5" fill={O} />
        {paid && <g>
          <rect x="862" y="340" width="148" height="30" rx="3" fill="#6B7BAA" {...sw} />
          <rect x="870" y="344" width="132" height="14" fill="#3E4766" />
          {[884, 906, 928].map((x) => <ellipse key={x} cx={x} cy="350" rx="8" ry="4" fill="#F2C94C" stroke={O} strokeWidth="1.3" />)}
          <rect x="948" y="345" width="40" height="10" rx="2" fill="#8FD18B" stroke={O} strokeWidth="1.3" />
        </g>}
      </g>

      {/* рослина в горщику */}
      <g>
        <path d="M944 540 C 900 500, 888 452, 900 420 C 924 452, 944 494, 950 540 Z" fill="url(#sh-green)" {...sw} />
        <path d="M952 540 C 960 486, 984 452, 1000 444 L1000 500 C 986 512, 966 526, 960 540 Z" fill="#5FA65A" {...sw} />
        <path d="M946 540 C 932 500, 940 466, 952 446 C 966 474, 964 508, 954 540 Z" fill="#7FC070" {...sw} />
        <path d="M908 534 L992 534 L982 592 L918 592 Z" fill="#D9774B" {...sw} />
        <rect x="902" y="526" width="96" height="16" rx="4" fill="#E68A5C" {...sw} />
        <path d="M916 548 c 4 14, 6 26, 8 38" stroke="#fff" strokeWidth="4" opacity=".3" fill="none" strokeLinecap="round" />
      </g>
      {/* ящики: банани, морква, помідори, яблука */}
      {crateBack(290)}{crateBack(444)}{crateBack(598)}{crateBack(752)}
      <g {...hit('bananas')}>
        {banana(310, 488, -8)}{banana(314, 500, 0)}{banana(318, 512, 6)}
        <rect x="304" y="468" width="112" height="56" fill="transparent" />
      </g>
      <g {...hit('carrots')}>
        {carrot(484, 492, -10)}{carrot(478, 506, 2)}{carrot(490, 516, 10)}
        <rect x="444" y="466" width="140" height="58" fill="transparent" />
      </g>
      {[[790, 500], [834, 506], [876, 500], [812, 476], [856, 478]].map(([x, y], i) => <g key={i}>{apple(x, y)}</g>)}
      <rect x="752" y="458" width="140" height="62" fill="transparent" {...hit('apples')} />
      <g {...hit('tomato1')}>{tomato(636, 504)}</g>
      <g {...hit('tomato2')}>{tomato(702, 504)}</g>
      <g {...hit('tomato3')}>{tomato(669, 466)}</g>
      {crateFront(290)}{crateFront(444)}{crateFront(598)}{crateFront(752)}

      {/* кошик */}
      <g {...hit('basket')}>
        <path d="M212 520 C 212 474, 282 474, 282 520" stroke="#C9363F" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M212 520 C 212 474, 282 474, 282 520" stroke={O} strokeWidth="1.5" fill="none" opacity=".5" />
        <path d="M200 516 L294 516 L284 584 L210 584 Z" fill="url(#sh-red)" {...sw} />
        {[0, 1, 2].map((r) => [0, 1, 2, 3, 4].map((c) => <rect key={`${r}${c}`} x={212 + c * 15 + r * .8} y={528 + r * 17} width="10" height="10" rx="2" fill="#8E2A31" opacity=".55" />))}
        <path d="M206 524 H288" stroke="#fff" strokeWidth="3" opacity=".35" strokeLinecap="round" />
      </g>

      {/* Бульбашка у фартушку зі списком покупок */}
      <g transform="translate(120 496) scale(1.25)">
        <path d="M30 60 C 62 66, 70 32, 56 20" stroke={O} strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M30 60 C 62 66, 70 32, 56 20" stroke="#FFFDF8" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M-30 30 C -42 82, 42 82, 30 30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        <path d="M-20 38 L20 38 L26 66 C 12 76, -12 76, -26 66 Z" fill="#7CC3A6" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <path d="M-20 38 C -18 30, -12 28, -8 30 M20 38 C 18 30, 12 28, 8 30" stroke="#4E987C" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="-9" y="50" width="18" height="12" rx="3" fill="#5FAE8C" stroke={O} strokeWidth="1.5" />
        <path d="M-34 -18 L-28 -50 L-8 -30 Z M34 -18 L28 -50 L8 -30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-28 -44 L-24 -34 M28 -44 L24 -34" stroke="#F5A0C0" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="0" cy="2" rx="40" ry="33" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        <ellipse cx="-14" cy="-3" rx="5" ry="6" fill={O} /><ellipse cx="14" cy="-3" rx="5" ry="6" fill={O} />
        <circle cx="-12" cy="-5" r="1.8" fill="#fff" /><circle cx="16" cy="-5" r="1.8" fill="#fff" />
        <path d="M-3 8 L3 8 L0 11 Z" fill="#F08AA8" />
        <path d="M0 11 q-6 7 -11 3 M0 11 q6 7 11 3" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="-24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" /><ellipse cx="24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" />
        <path d="M-40 6 L-58 1 M-40 12 L-58 14 M40 6 L58 1" stroke={O} strokeWidth="1.8" />
        {/* список покупок у лапці */}
        <g transform="translate(-50 34) rotate(-10)">
          <rect x="-16" y="-24" width="34" height="44" rx="3" fill="#FFFDF5" stroke={O} strokeWidth="2" />
          <circle cx="-9" cy="-14" r="3" fill="#F08A1E" /><circle cx="-9" cy="-4" r="3" fill="#E9B26A" /><circle cx="-9" cy="6" r="3" fill="#E0321F" />
          <path d="M-3 -14 h14 M-3 -4 h16 M-3 6 h12" stroke={O} strokeWidth="1.6" strokeLinecap="round" opacity=".6" />
          <ellipse cx="4" cy="20" rx="9" ry="7" fill="#FFFDF8" stroke={O} strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}

export const SHOP: QuestLocation = {
  id: 'shop', level: 'A1-A2', Scene,
  title: { uk: 'У магазині', ru: 'В магазине', en: 'At the shop' },
  place: { uk: 'Продуктовий магазин', ru: 'Продуктовый магазин', en: 'The food shop' },
  finale: 'We have everything! Thank you for shopping with me!',
  topics: [
    { uk: 'Лексика: продукти, овочі, фрукти, магазин', ru: 'Лексика: продукты, овощи, фрукты, магазин', en: 'Vocabulary: food, vegetables, fruit, shop' },
    { uk: 'Прийменники місця: on the top shelf, on the bottom shelf, between, next to, in, behind', ru: 'Предлоги места: on the top shelf, on the bottom shelf, between, next to, in, behind', en: 'Prepositions of place: on the top shelf, on the bottom shelf, between, next to, in, behind' },
    { uk: 'Кількість: a bottle of, a box of, a loaf of, a bunch of', ru: 'Количество: a bottle of, a box of, a loaf of, a bunch of', en: 'Quantities: a bottle of, a box of, a loaf of, a bunch of' },
    { uk: 'Числа і кольори, дієслова-команди: take, open, pay', ru: 'Числа и цвета, глаголы-команды: take, open, pay', en: 'Numbers and colours, action verbs: take, open, pay' },
  ],
  tasks: [
    { en: 'Welcome to the shop! Who is behind the counter? Say hello.', uk: 'Ласкаво просимо до магазину! Хто стоїть за прилавком? Привітайся.', ru: 'Добро пожаловать в магазин! Кто стоит за прилавком? Поздоровайся.', target: ['hedgehog'] },
    { en: 'Take a bottle of juice. It is on the top shelf.', uk: 'Візьми пляшку соку. Вона на верхній полиці.', ru: 'Возьми бутылку сока. Она на верхней полке.', target: ['topJuice'], take: 'juice' },
    { en: 'Take a box of eggs from the bottom shelf.', uk: 'Візьми коробку яєць з нижньої полиці.', ru: 'Возьми коробку яиц с нижней полки.', target: ['eggs'], take: 'eggs' },
    { en: 'Take a loaf of bread. It is between the cheese and the milk.', uk: 'Візьми буханець хліба. Він між сиром і молоком.', ru: 'Возьми буханку хлеба. Она между сыром и молоком.', target: ['bread'], take: 'bread' },
    { en: 'The carrots are next to the bananas. Take the carrots.', uk: 'Морква поруч із бананами. Візьми моркву.', ru: 'Морковь рядом с бананами. Возьми морковь.', target: ['carrots'], take: 'carrots' },
    { en: 'We need three tomatoes. Take them all.', uk: 'Нам потрібні три помідори. Візьми їх усі.', ru: 'Нам нужны три помидора. Возьми их все.', target: ['tomato1', 'tomato2', 'tomato3'], all: true, take: 'tomatoes' },
    { en: 'It is hot today! Open the fridge.', uk: 'Сьогодні спекотно! Відчини холодильник.', ru: 'Сегодня жарко! Открой холодильник.', target: ['fridge'], set: 'fridge' },
    { en: 'The ice cream is in the fridge. Take the pink one.', uk: 'Морозиво в холодильнику. Візьми рожеве.', ru: 'Мороженое в холодильнике. Возьми розовое.', target: ['pinkIceCream'], take: 'ice cream' },
    { en: 'Find something long and yellow. Take a bunch of it.', uk: 'Знайди щось довге й жовте. Візьми ціле гроно.', ru: 'Найди что-то длинное и жёлтое. Возьми целую гроздь.', target: ['bananas'], take: 'bananas' },
    { en: 'Our basket is full. Pay at the till, please.', uk: 'Наш кошик повний. Заплати на касі, будь ласка.', ru: 'Наша корзина полная. Заплати на кассе, пожалуйста.', target: ['till'], set: 'paid' },
  ],
};
