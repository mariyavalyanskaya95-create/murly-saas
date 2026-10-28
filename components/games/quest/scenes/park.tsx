// Локація «У парку»: дерево з гніздом, білка за деревом, гойдалки й гірка, ставок з качками, повітряний змій, м’яч у кущах, квіти й метелики, візок з морозивом
import { O, Lg } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

/* eslint-disable react/display-name */
function Scene({ hit, flags: f }: SceneProps) {
  // крона з кількох кіл: спершу товстий контур, потім заливка, щоб не було внутрішніх ліній
  const blob = (cs: number[][], fill: string, sw = 5) => (
    <g>
      {cs.map(([x, y, r], i) => <circle key={`o${i}`} cx={x} cy={y} r={r} fill={O} stroke={O} strokeWidth={sw} />)}
      {cs.map(([x, y, r], i) => <circle key={`f${i}`} cx={x} cy={y} r={r} fill={fill} />)}
    </g>
  );
  const flower = (x: number, y: number, c: string, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 V34" stroke="#4E9A44" strokeWidth="4" strokeLinecap="round" />
      <path d="M0 22 C 8 14, 16 16, 18 20 C 12 26, 6 26, 0 22 Z" fill="#6FB466" stroke={O} strokeWidth="1.5" />
      {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-9" rx="7" ry="9" fill={c} stroke={O} strokeWidth="1.8" transform={`rotate(${a})`} />)}
      <circle cx="0" cy="0" r="5.5" fill="#FFE07A" stroke={O} strokeWidth="1.5" />
    </g>
  );
  const butterfly = (x: number, y: number, c: string, rot = 0) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M0 0 C -10 -26, -34 -26, -30 -6 C -28 4, -12 4, 0 0 Z M0 0 C 10 -26, 34 -26, 30 -6 C 28 4, 12 4, 0 0 Z" fill={c} stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <path d="M0 2 C -8 14, -24 18, -22 8 C -20 2, -8 2, 0 2 Z M0 2 C 8 14, 24 18, 22 8 C 20 2, 8 2, 0 2 Z" fill={c} stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="-17" cy="-10" r="4" fill="#fff" opacity=".6" /><circle cx="17" cy="-10" r="4" fill="#fff" opacity=".6" />
      <ellipse cx="0" cy="2" rx="3.5" ry="11" fill={O} />
      <path d="M-1 -8 C -4 -16, -8 -18, -10 -20 M1 -8 C 4 -16, 8 -18, 10 -20" stroke={O} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  );
  const duck = (x: number, y: number, s = 1, flip = false) => (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="14" rx="40" ry="6" fill="#fff" opacity=".35" />
      <path d="M-34 0 C -36 -20, -10 -22, 8 -14 C 20 -10, 30 -14, 34 -4 C 36 8, 20 14, 0 14 C -20 14, -32 10, -34 0 Z" fill="url(#pk-duck)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M-34 -4 L-44 -12 L-38 2 Z" fill="url(#pk-duck)" stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <path d="M-18 -4 C -8 -10, 6 -8, 10 0 C 2 6, -12 6, -18 -4 Z" fill="#F0C040" stroke={O} strokeWidth="1.8" />
      <circle cx="22" cy="-26" r="16" fill="url(#pk-duck)" stroke={O} strokeWidth="2.5" />
      <path d="M34 -24 C 46 -26, 50 -20, 46 -16 C 42 -14, 36 -16, 34 -18 Z" fill="#F08A3C" stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="26" cy="-30" r="3.5" fill={O} /><circle cx="27" cy="-31.5" r="1.2" fill="#fff" />
      <ellipse cx="22" cy="-20" rx="4" ry="2.5" fill="#F5A0C0" opacity=".7" />
      <ellipse cx="-10" cy="-12" rx="12" ry="4" fill="#fff" opacity=".4" />
    </g>
  );

  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="In the park">
      <defs>
        <Lg id="pk-sky" a="#9FD8F2" b="#E9F7FC" />
        <Lg id="pk-hill1" a="#BFE3A6" b="#9ACB82" />
        <Lg id="pk-hill2" a="#A6D68C" b="#82BC6A" />
        <Lg id="pk-grass" a="#9FD27E" b="#6CAD55" />
        <Lg id="pk-path" a="#F2DDB0" b="#D9BC84" />
        <Lg id="pk-trunk" a="#A7703F" b="#7A4C26" />
        <Lg id="pk-wood" a="#D99A5A" b="#A4652F" />
        <Lg id="pk-red" a="#FF8A6E" b="#D2483A" />
        <Lg id="pk-blue" a="#8EC9F2" b="#3F7FC2" />
        <Lg id="pk-yellow" a="#FFE680" b="#F0B02F" />
        <Lg id="pk-slide" a="#FFB36B" b="#E36F3C" />
        <Lg id="pk-cart" a="#C9F0E2" b="#7FCDB5" />
        <Lg id="pk-duck" a="#FFF3A6" b="#F6CF4A" />
        <Lg id="pk-dog" a="#F0C897" b="#C98F57" />
        <Lg id="pk-squirrel" a="#E89A5A" b="#B4612C" />
        <Lg id="pk-fur" a="#FFFFFF" b="#EDE5D8" />
        <Lg id="pk-cone" a="#F2C27A" b="#C98A3E" />
        <radialGradient id="pk-pond" cx=".45" cy=".35" r=".75"><stop offset="0" stopColor="#A9DDF0" /><stop offset="1" stopColor="#4C9BC0" /></radialGradient>
        <radialGradient id="pk-sunGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#FFF4B0" stopOpacity=".9" /><stop offset="1" stopColor="#FFF4B0" stopOpacity="0" /></radialGradient>
        <radialGradient id="pk-leaf" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#9FDA7E" /><stop offset="1" stopColor="#4E9A44" /></radialGradient>
        <radialGradient id="pk-bush" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#8ACB6A" /><stop offset="1" stopColor="#3F8A3C" /></radialGradient>
        <radialGradient id="pk-ball" cx=".35" cy=".3" r=".75"><stop offset="0" stopColor="#FF9C8A" /><stop offset="1" stopColor="#D2483A" /></radialGradient>
        <radialGradient id="pk-bird" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#9ED3F7" /><stop offset="1" stopColor="#3F7FC2" /></radialGradient>
        <radialGradient id="pk-ybird" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#FFEE9A" /><stop offset="1" stopColor="#F0B02F" /></radialGradient>
        <radialGradient id="pk-scoop" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#FFD3E2" /><stop offset="1" stopColor="#F07FA6" /></radialGradient>
      </defs>

      {/* небо, сонце, хмари */}
      <rect width="1000" height="600" fill="url(#pk-sky)" />
      <circle cx="930" cy="66" r="80" fill="url(#pk-sunGlow)" />
      <circle cx="930" cy="66" r="34" fill="url(#pk-yellow)" stroke={O} strokeWidth="2.5" />
      <ellipse cx="920" cy="54" rx="12" ry="7" fill="#fff" opacity=".4" />
      {[[420, 74, 1], [790, 160, .8], [110, 330, .0]].filter(([, , s]) => s > 0).map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity=".95">
          <path d="M-60 16 C -74 16, -76 -6, -58 -8 C -58 -30, -26 -36, -16 -18 C -8 -40, 30 -40, 34 -14 C 54 -20, 70 0, 58 16 Z" fill="#fff" stroke="#BFDDEB" strokeWidth="2" />
        </g>
      ))}

      {/* далекі пагорби й дерева */}
      <path d="M0 360 C 120 300, 240 310, 340 340 C 440 370, 520 300, 660 310 C 780 318, 880 290, 1000 320 V420 H0 Z" fill="url(#pk-hill1)" />
      {[[560, 318, 22], [590, 312, 26], [860, 302, 20], [890, 296, 24], [40, 342, 22]].map(([x, y, r], i) => <g key={i}><path d={`M${x} ${y} V${y + r + 26}`} stroke="#8E6A48" strokeWidth="5" opacity=".7" /><circle cx={x} cy={y} r={r} fill="#86BF70" /></g>)}
      <path d="M0 400 C 160 360, 300 380, 460 376 C 620 372, 760 360, 1000 372 V440 H0 Z" fill="url(#pk-hill2)" />
      {/* трава */}
      <path d="M0 410 C 200 392, 400 402, 600 396 C 760 392, 880 398, 1000 392 V600 H0 Z" fill="url(#pk-grass)" stroke={O} strokeWidth="2.5" />
      {/* доріжка */}
      <path d="M598 396 L616 396 C 640 450, 700 520, 730 600 L590 600 C 600 520, 600 450, 598 396 Z" fill="url(#pk-path)" stroke={O} strokeWidth="2" strokeLinejoin="round" />
      {[[620, 470], [650, 540], [612, 560], [680, 500]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill="#C9A86A" opacity=".7" />)}
      {[[40, 590], [330, 590], [560, 470], [740, 440], [980, 590], [500, 590], [270, 432]].map(([x, y], i) => <path key={i} d={`M${x - 8} ${y} l4 -12 l4 10 l4 -14 l4 16`} stroke="#4E9A44" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />)}

      {/* повітряний змій */}
      <g {...hit('kite')}>
        <path d="M636 196 C 616 216, 620 240, 646 252 C 666 262, 660 286, 642 300" stroke={O} strokeWidth="2" fill="none" />
        {([[628, 214, '#F2C94C'], [654, 258, '#5FB866'], [642, 296, '#F28C9B']] as [number, number, string][]).map(([x, y, c], i) => <path key={i} d={`M${x} ${y} L${x - 14} ${y - 8} L${x - 14} ${y + 8} Z M${x} ${y} L${x + 14} ${y - 8} L${x + 14} ${y + 8} Z`} fill={c} stroke={O} strokeWidth="1.6" strokeLinejoin="round" />)}
        <path d="M640 40 L694 104 L640 180 Z" fill="url(#pk-red)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M640 40 L586 104 L640 180 Z" fill="url(#pk-yellow)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M586 104 H694 M640 40 V180" stroke={O} strokeWidth="2" />
        <path d="M600 100 L636 56" stroke="#fff" strokeWidth="4" opacity=".45" strokeLinecap="round" />
      </g>

      {/* білка за деревом (малюємо до стовбура) */}
      <g {...hit('squirrel')}>
        <path d="M196 410 C 150 420, 132 380, 146 350 C 158 324, 192 326, 196 352 C 176 346, 166 360, 172 376 C 178 392, 196 392, 200 396 Z" fill="url(#pk-squirrel)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M156 352 C 162 340, 176 336, 186 342" stroke="#FFD9B0" strokeWidth="4" opacity=".6" fill="none" strokeLinecap="round" />
        <path d="M244 360 L250 340 L262 358 Z" fill="url(#pk-squirrel)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <ellipse cx="248" cy="376" rx="26" ry="22" fill="url(#pk-squirrel)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="258" cy="384" rx="12" ry="9" fill="#FCE3C6" />
        <circle cx="254" cy="370" r="4.5" fill={O} /><circle cx="255.5" cy="368.5" r="1.6" fill="#fff" />
        <path d="M266 380 L271 382" stroke={O} strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="258" cy="390" rx="5" ry="3" fill="#F5A0C0" opacity=".7" />
        <ellipse cx="244" cy="404" rx="8" ry="6" fill="url(#pk-squirrel)" stroke={O} strokeWidth="2" />
      </g>
      {/* дерево */}
      <path d="M176 466 C 190 440, 192 360, 194 270 L228 270 C 230 360, 232 440, 248 466 Z" fill="url(#pk-trunk)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M204 300 C 202 340, 204 380, 206 420 M220 330 C 222 360, 220 390, 222 410" stroke={O} strokeWidth="1.5" opacity=".3" fill="none" />
      <path d="M200 300 C 204 340, 202 400, 200 450" stroke="#fff" strokeWidth="4" opacity=".15" fill="none" />
      {blob([[110, 170, 66], [190, 108, 78], [272, 160, 68], [250, 236, 58], [150, 236, 60], [200, 196, 72]], 'url(#pk-leaf)')}
      {[[160, 90, 26], [100, 150, 18], [250, 128, 20]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * .6} fill="#fff" opacity=".22" />)}
      {[[150, 200], [230, 170], [200, 250], [120, 220], [280, 210]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q8 -8 16 0`} stroke="#3F7F38" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".6" />)}
      {/* гілка з гніздом і пташкою */}
      <path d="M222 300 C 248 296, 270 296, 294 288" stroke="url(#pk-trunk)" strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M222 300 C 248 296, 270 296, 294 288" stroke={O} strokeWidth="1.5" fill="none" opacity=".4" />
      <g {...hit('bird')}>
        <rect x="262" y="238" width="68" height="66" fill="transparent" />
        <path d="M282 258 L274 238 L290 252 Z" fill="url(#pk-bird)" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="300" cy="266" rx="22" ry="18" fill="url(#pk-bird)" stroke={O} strokeWidth="2.5" />
        <path d="M318 262 L330 266 L318 270 Z" fill="#F08A3C" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="308" cy="260" r="4" fill={O} /><circle cx="309.5" cy="258.5" r="1.4" fill="#fff" />
        <ellipse cx="308" cy="272" rx="4" ry="2.5" fill="#F5A0C0" opacity=".7" />
        <path d="M284 270 C 290 262, 298 264, 300 272" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="292" cy="256" rx="7" ry="3.5" fill="#fff" opacity=".4" />
        <path d="M266 276 C 268 300, 330 300, 332 276 C 316 284, 282 284, 266 276 Z" fill="url(#pk-wood)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M272 284 L292 280 M300 288 L322 282 M282 292 L310 290" stroke="#6B4423" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* гойдалки */}
      <path d="M342 446 L372 232 L402 446 M472 446 L502 232 L532 446" stroke="#5A6B7A" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M342 446 L372 232 L402 446 M472 446 L502 232 L532 446" stroke={O} strokeWidth="1.2" fill="none" opacity=".35" />
      <rect x="360" y="226" width="156" height="12" rx="6" fill="url(#pk-red)" stroke={O} strokeWidth="2.2" />
      <g {...hit('blueSwing')}>
        <rect x="380" y="238" width="54" height="170" fill="transparent" />
        <path d="M388 238 V392 M426 238 V392" stroke={O} strokeWidth="2.5" />
        <rect x="378" y="390" width="58" height="13" rx="5" fill="url(#pk-blue)" stroke={O} strokeWidth="2.2" />
      </g>
      <g {...hit('redSwing')}>
        <rect x="444" y="238" width="54" height="170" fill="transparent" />
        <path d="M452 238 V392 M490 238 V392" stroke={O} strokeWidth="2.5" />
        <rect x="442" y="390" width="58" height="13" rx="5" fill="url(#pk-red)" stroke={O} strokeWidth="2.2" />
      </g>
      {/* жовта пташка на гойдалці */}
      <g {...hit('yellowBird')}>
        <rect x="400" y="180" width="50" height="50" fill="transparent" />
        <path d="M412 210 L400 204 L404 216 Z" fill="url(#pk-ybird)" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
        <ellipse cx="424" cy="212" rx="15" ry="12" fill="url(#pk-ybird)" stroke={O} strokeWidth="2.2" />
        <circle cx="432" cy="200" r="9" fill="url(#pk-ybird)" stroke={O} strokeWidth="2.2" />
        <path d="M440 198 L447 201 L440 204 Z" fill="#F08A3C" stroke={O} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="434" cy="198" r="2.2" fill={O} />
        <path d="M420 224 V228 M428 224 V228" stroke={O} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* гірка */}
      <g>
        <path d="M552 446 L568 292 M582 446 L598 292" stroke="#5A6B7A" strokeWidth="7" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${555 + k * 3.1} ${416 - k * 30} H${585 + k * 3.1}`} stroke="#5A6B7A" strokeWidth="5" strokeLinecap="round" />)}
        <rect x="560" y="286" width="50" height="10" rx="4" fill="url(#pk-blue)" stroke={O} strokeWidth="2" />
        <path d="M604 290 C 630 296, 640 340, 662 400 C 670 424, 684 436, 704 438 L704 452 C 676 452, 656 436, 646 408 C 628 352, 620 314, 600 306 Z" fill="url(#pk-slide)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M612 300 C 630 312, 640 350, 654 394" stroke="#fff" strokeWidth="4" opacity=".4" fill="none" strokeLinecap="round" />
        <path d="M690 452 V462" stroke="#5A6B7A" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* візок з морозивом */}
      <g {...hit('cart')}>
        <path d="M904 368 V250" stroke="#5A6B7A" strokeWidth="5" />
        <g transform="translate(24 0)"><path d="M790 262 C 800 214, 960 214, 970 262 C 958 272, 944 262, 930 272 C 916 262, 896 262, 880 272 C 866 262, 846 262, 832 272 C 818 262, 804 272, 790 262 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M832 272 C 836 236, 852 222, 880 220 C 862 236, 860 252, 880 272 C 866 262, 846 262, 832 272 Z M930 272 C 926 236, 910 222, 880 220 C 898 236, 900 252, 880 272 C 896 262, 916 262, 930 272 Z" fill="#F28C9B" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="880" cy="218" r="5" fill="url(#pk-red)" stroke={O} strokeWidth="1.5" /></g>
        <path d="M762 386 H740 V376" stroke="#5A6B7A" strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="760" y="364" width="152" height="80" rx="10" fill="url(#pk-cart)" stroke={O} strokeWidth="2.5" />
        <path d="M760 388 H912" stroke="#F28C9B" strokeWidth="7" />
        <path d="M760 384.5 H912 M760 391.5 H912" stroke={O} strokeWidth="1" opacity=".3" />
        <g stroke="#fff" strokeWidth="4" strokeLinecap="round"><path d="M836 400 V432 M822 408 L850 424 M822 424 L850 408" /></g>
        <g stroke={O} strokeWidth="1" opacity=".25" strokeLinecap="round"><path d="M836 400 V432 M822 408 L850 424 M822 424 L850 408" /></g>
        <ellipse cx="780" cy="376" rx="12" ry="4" fill="#fff" opacity=".45" />
        {f.has('cart')
          ? <path d="M770 364 L774 334 C 790 328, 826 328, 846 334 L848 364 Z" fill="url(#pk-cart)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
          : <path d="M770 364 C 776 346, 840 346, 846 364 Z" fill="url(#pk-cart)" stroke={O} strokeWidth="2.2" />}
        <circle cx="788" cy="450" r="16" fill="#5A6B7A" stroke={O} strokeWidth="2.5" /><circle cx="788" cy="450" r="5" fill="#D8DEE4" />
        <circle cx="884" cy="450" r="16" fill="#5A6B7A" stroke={O} strokeWidth="2.5" /><circle cx="884" cy="450" r="5" fill="#D8DEE4" />
      </g>
      {f.has('cart') && <g {...hit('iceCream')}>
        <rect x="840" y="296" width="56" height="70" fill="transparent" />
        <g transform="translate(-14 0)">
        <path d="M870 324 L882 364 L894 324 Z" fill="url(#pk-cone)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M874 334 L890 344 M872 326 L892 338 M890 328 L876 350" stroke="#9A6634" strokeWidth="1.3" opacity=".7" />
        <circle cx="882" cy="316" r="15" fill="url(#pk-scoop)" stroke={O} strokeWidth="2.2" />
        <path d="M868 320 C 874 326, 890 326, 896 320" stroke={O} strokeWidth="1.5" fill="none" opacity=".4" />
        <circle cx="884" cy="300" r="5" fill="url(#pk-red)" stroke={O} strokeWidth="1.5" />
        <ellipse cx="876" cy="310" rx="5" ry="3" fill="#fff" opacity=".5" />
      </g>
      </g>}

      {/* ставок з качками і жабкою */}
      <g>
        {[[968, 462], [984, 470], [996, 458]].map(([x, y], i) => <g key={i}><path d={`M${x} ${y + 40} V${y - 30}`} stroke="#4E9A44" strokeWidth="4" strokeLinecap="round" /><rect x={x - 5} y={y - 44} width="10" height="22" rx="5" fill="#8E5A2C" stroke={O} strokeWidth="1.5" /></g>)}
        <ellipse cx="862" cy="528" rx="140" ry="56" fill="url(#pk-pond)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="862" cy="528" rx="140" ry="56" fill="none" stroke="#8FBF6E" strokeWidth="6" opacity=".6" />
        <path d="M790 506 c 20 -6, 50 -6, 70 0 M880 560 c 18 -4, 40 -4, 56 0 M760 548 c 14 -3, 26 -3, 36 0" stroke="#fff" strokeWidth="3" opacity=".5" fill="none" strokeLinecap="round" />
        {[[730, 560, 12], [992, 540, 10], [800, 584, 11]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * .6} fill="#B4B7B0" stroke={O} strokeWidth="2" />)}
      </g>
      <g {...hit('frog')}>
        <path d="M912 568 C 912 552, 962 548, 972 562 L944 566 L966 574 C 952 584, 914 582, 912 568 Z" fill="#6FB466" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="936" cy="558" rx="16" ry="11" fill="#7CC27B" stroke={O} strokeWidth="2.2" />
        <circle cx="928" cy="546" r="6" fill="#7CC27B" stroke={O} strokeWidth="2" /><circle cx="944" cy="546" r="6" fill="#7CC27B" stroke={O} strokeWidth="2" />
        <circle cx="928" cy="546" r="2.6" fill={O} /><circle cx="944" cy="546" r="2.6" fill={O} />
        <path d="M930 562 q6 4 12 0" stroke={O} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <rect x="908" y="534" width="68" height="50" fill="transparent" />
      </g>
      <g {...hit('duck1')}>{duck(762, 516, 1)}</g>
      <g {...hit('duck2')}>{duck(860, 540, .85)}</g>
      <g {...hit('duck3')}>{duck(948, 504, .75, true)}</g>

      {/* кущі з м’ячем */}
      {blob([[30, 470, 46], [92, 456, 50], [150, 486, 38], [10, 520, 40]], 'url(#pk-bush)')}
      <g {...hit('ball')}>
        <rect x="64" y="440" width="62" height="56" fill="transparent" />
        <circle cx="96" cy="474" r="26" fill="url(#pk-ball)" stroke={O} strokeWidth="2.5" />
        <path d="M72 466 C 86 474, 106 474, 120 466" stroke="#fff" strokeWidth="6" fill="none" />
        <path d="M96 448 C 88 462, 88 486, 96 500" stroke="#FFE07A" strokeWidth="6" fill="none" />
        <circle cx="96" cy="474" r="26" fill="none" stroke={O} strokeWidth="2.5" />
        <ellipse cx="86" cy="458" rx="8" ry="4" fill="#fff" opacity=".5" />
      </g>
      {blob([[20, 552, 44], [80, 540, 34], [136, 548, 40], [60, 582, 30]], 'url(#pk-bush)')}
      {[[40, 530], [130, 524], [96, 556]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q8 -8 16 0`} stroke="#2F6E2E" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".6" />)}

      {/* клумба з квітами */}
      <path d="M168 586 C 168 560, 300 556, 300 586 Z" fill="#8E5A2C" stroke={O} strokeWidth="2.2" />
      <g {...hit('redFlowers')}>
        <rect x="168" y="500" width="44" height="80" fill="transparent" />
        {flower(178, 520, '#E2483A')}{flower(200, 506, '#F06A5A', .9)}{flower(196, 540, '#D2483A', .85)}
      </g>
      <g {...hit('yellowFlowers')}>
        <rect x="214" y="500" width="44" height="80" fill="transparent" />
        {flower(226, 512, '#FFD84D')}{flower(248, 524, '#F6C23A', .9)}{flower(234, 544, '#FFE07A', .85)}
      </g>
      <g {...hit('purpleFlowers')}>
        <rect x="260" y="500" width="44" height="80" fill="transparent" />
        {flower(272, 522, '#A98BE0')}{flower(290, 540, '#8C6CCF', .85)}
      </g>
      {/* метелики над квітами */}
      <g {...hit('blueButterfly')}>
        <rect x="160" y="424" width="54" height="52" fill="transparent" />
        {butterfly(186, 452, 'url(#pk-blue)', -12)}
      </g>
      <g {...hit('orangeButterfly')}>
        <rect x="216" y="420" width="54" height="52" fill="transparent" />
        {butterfly(242, 446, 'url(#pk-slide)', 10)}
      </g>

      {/* лавка, песик під лавкою, котик на лавці */}
      <path d="M326 440 V490 M516 440 V490" stroke="#5A6B7A" strokeWidth="8" strokeLinecap="round" />
      <rect x="306" y="428" width="230" height="16" rx="5" fill="url(#pk-wood)" stroke={O} strokeWidth="2.2" />
      <rect x="306" y="452" width="230" height="16" rx="5" fill="url(#pk-wood)" stroke={O} strokeWidth="2.2" />
      <path d="M320 434 H420 M320 458 H400" stroke="#fff" strokeWidth="3" opacity=".3" strokeLinecap="round" />
      <path d="M346 498 V552 M496 498 V552" stroke="#4A5866" strokeWidth="7" strokeLinecap="round" />
      <g {...hit('dog')}>
        <rect x="358" y="512" width="132" height="58" fill="transparent" />
        <ellipse cx="420" cy="566" rx="64" ry="7" fill={O} opacity=".15" />
        <path d="M372 552 C 360 548, 352 540, 356 532" stroke={O} strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M372 552 C 360 548, 352 540, 356 532" stroke="#C98F57" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="410" cy="548" rx="44" ry="18" fill="url(#pk-dog)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="398" cy="540" rx="12" ry="7" fill="#A86E3C" opacity=".6" />
        <ellipse cx="438" cy="562" rx="14" ry="6" fill="url(#pk-dog)" stroke={O} strokeWidth="2" />
        <ellipse cx="470" cy="562" rx="14" ry="6" fill="url(#pk-dog)" stroke={O} strokeWidth="2" />
        <ellipse cx="458" cy="536" rx="24" ry="20" fill="url(#pk-dog)" stroke={O} strokeWidth="2.5" />
        <path d="M440 524 C 430 528, 428 548, 438 552 C 446 546, 448 532, 446 524 Z" fill="#8E5A2C" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="472" cy="544" rx="10" ry="7" fill="#FCE3C6" />
        <ellipse cx="478" cy="540" rx="4.5" ry="3.5" fill={O} />
        <path d="M454 530 q4 3 8 0 M466 528 q3 3 6 0" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="460" cy="544" rx="4" ry="2.5" fill="#F5A0C0" opacity=".7" />
        <ellipse cx="452" cy="524" rx="7" ry="3.5" fill="#fff" opacity=".35" />
      </g>
      <path d="M310 480 H532 L540 492 H302 Z" fill="url(#pk-wood)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="300" y="492" width="242" height="12" rx="4" fill="#A4652F" stroke={O} strokeWidth="2.2" />
      <path d="M318 498 V560 M524 498 V560" stroke="#5A6B7A" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="318" cy="562" rx="10" ry="3.5" fill={O} opacity=".4" /><ellipse cx="524" cy="562" rx="10" ry="3.5" fill={O} opacity=".4" />

      {/* нитка змія тягнеться до лапки котика */}
      <path d="M640 180 C 590 300, 680 380, 618 532" stroke={O} strokeWidth="1.6" fill="none" opacity=".55" />
      {/* котик Бульбашка з зеленою хусткою тримає змія */}
      <g transform="translate(652 500)">
        <ellipse cx="4" cy="86" rx="50" ry="7" fill={O} opacity=".15" />
        <path d="M28 72 C 66 78, 74 38, 56 24" stroke={O} strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M28 72 C 66 78, 74 38, 56 24" stroke="#FFFDF8" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M-30 28 C -44 88, 44 88, 30 28 Z" fill="url(#pk-fur)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="-14" cy="82" rx="11" ry="6" fill="#FFFDF8" stroke={O} strokeWidth="2" /><ellipse cx="14" cy="82" rx="11" ry="6" fill="#FFFDF8" stroke={O} strokeWidth="2" />
        <path d="M-34 -18 L-28 -50 L-8 -30 Z M34 -18 L28 -50 L8 -30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-28 -44 L-24 -34 M28 -44 L24 -34" stroke="#F5A0C0" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="0" cy="2" rx="40" ry="33" fill="url(#pk-fur)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="-14" cy="-3" rx="5" ry="6" fill={O} /><ellipse cx="14" cy="-3" rx="5" ry="6" fill={O} />
        <circle cx="-12" cy="-5" r="1.8" fill="#fff" /><circle cx="16" cy="-5" r="1.8" fill="#fff" />
        <path d="M-3 8 L3 8 L0 11 Z" fill="#F08AA8" />
        <path d="M0 11 q-6 7 -11 3 M0 11 q6 7 11 3" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="-24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" /><ellipse cx="24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" />
        <path d="M-40 6 L-58 1 M-40 12 L-58 14 M40 6 L58 1 M40 12 L58 14" stroke={O} strokeWidth="1.8" />
        <path d="M-26 32 C -10 40, 10 40, 26 32 L0 60 Z" fill="#5FB866" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <ellipse cx="-34" cy="34" rx="10" ry="8" fill="#FFFDF8" stroke={O} strokeWidth="2.2" />
        <path d="M-38 30 v6 M-33 29 v6" stroke={O} strokeWidth="1.2" opacity=".5" />
        <circle cx="-6" cy="42" r="2.5" fill="#fff" opacity=".8" /><circle cx="8" cy="44" r="2.5" fill="#fff" opacity=".8" /><circle cx="1" cy="52" r="2" fill="#fff" opacity=".8" />
      </g>
    </svg>
  );
}

export const PARK: QuestLocation = {
  id: 'park', level: 'A1-A2', Scene,
  title: { uk: 'У парку', ru: 'В парке', en: 'In the park' },
  place: { uk: 'Парк', ru: 'Парк', en: 'The park' },
  finale: 'What a fun day! Thank you, friend!',
  topics: [
    { uk: 'Прийменники місця: in, under, behind, above, next to', ru: 'Предлоги места: in, under, behind, above, next to', en: 'Prepositions of place: in, under, behind, above, next to' },
    { uk: 'Лексика: природа і тварини (tree, nest, bird, squirrel, duck, pond, butterfly, flowers, dog)', ru: 'Лексика: природа и животные (tree, nest, bird, squirrel, duck, pond, butterfly, flowers, dog)', en: 'Vocabulary: nature and animals (tree, nest, bird, squirrel, duck, pond, butterfly, flowers, dog)' },
    { uk: 'Лексика: парк (bench, swing, slide, kite, ball, ice cream)', ru: 'Лексика: парк (bench, swing, slide, kite, ball, ice cream)', en: 'Vocabulary: the park (bench, swing, slide, kite, ball, ice cream)' },
    { uk: 'Кольори і числа 1–3', ru: 'Цвета и числа 1–3', en: 'Colours and numbers 1–3' },
  ],
  tasks: [
    { en: 'Welcome to the park! Find the bird in the nest.', uk: 'Ласкаво просимо до парку! Знайди пташку в гнізді.', ru: 'Добро пожаловать в парк! Найди птичку в гнезде.', target: ['bird'] },
    { en: 'Who is behind the tree? Touch it.', uk: 'Хто ховається за деревом? Торкнися його.', ru: 'Кто прячется за деревом? Коснись его.', target: ['squirrel'] },
    { en: 'Look up! Find the kite in the sky.', uk: 'Подивись угору! Знайди повітряного змія в небі.', ru: 'Посмотри вверх! Найди воздушного змея в небе.', target: ['kite'] },
    { en: 'Count the ducks in the pond.', uk: 'Порахуй качок у ставку.', ru: 'Посчитай уток в пруду.', target: ['duck1', 'duck2', 'duck3'], all: true },
    { en: 'Find the butterfly above the yellow flowers.', uk: 'Знайди метелика над жовтими квітами.', ru: 'Найди бабочку над жёлтыми цветами.', target: ['orangeButterfly'] },
    { en: 'Find the red swing next to the slide.', uk: 'Знайди червону гойдалку біля гірки.', ru: 'Найди красные качели возле горки.', target: ['redSwing'] },
    { en: 'My ball is in the bushes. Take the ball.', uk: 'Мій м’яч у кущах. Візьми м’яч.', ru: 'Мой мяч в кустах. Возьми мяч.', target: ['ball'], take: 'ball' },
    { en: 'Who is under the bench? Touch it.', uk: 'Хто під лавкою? Торкнися його.', ru: 'Кто под скамейкой? Коснись его.', target: ['dog'] },
    { en: 'I want an ice cream. Open the ice cream cart.', uk: 'Я хочу морозиво. Відкрий візок з морозивом.', ru: 'Я хочу мороженое. Открой тележку с мороженым.', target: ['cart'], set: 'cart' },
    { en: 'Take something cold and sweet.', uk: 'Візьми щось холодне й солодке.', ru: 'Возьми что-нибудь холодное и сладкое.', target: ['iceCream'], take: 'ice cream' },
  ],
};
