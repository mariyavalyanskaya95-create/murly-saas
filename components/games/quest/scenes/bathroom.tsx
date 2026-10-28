// Локація «Ванна кімната»: ванна з качечкою, умивальник із дзеркалом, шафка, рушники, капці під табуреткою, мильні бульбашки
import { O, Lg } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

/* eslint-disable react/display-name */
function Scene({ hit, flags: f }: SceneProps) {
  const water = f.has('water');
  const open = f.has('cabinet');

  // мильна бульбашка: прозора, з райдужним краєм і блиском
  const bubble = (x: number, y: number, r: number) => (
    <g>
      <circle cx={x} cy={y} r={r} fill="url(#bt-bubble)" stroke="#7FB8D8" strokeWidth="2.5" />
      <path d={`M${x - r * .7} ${y + r * .1} A ${r * .72} ${r * .72} 0 0 1 ${x - r * .05} ${y - r * .7}`} stroke="#fff" strokeWidth={Math.max(2, r * .12)} fill="none" strokeLinecap="round" opacity=".9" />
      <path d={`M${x + r * .55} ${y + r * .35} A ${r * .65} ${r * .65} 0 0 1 ${x + r * .2} ${y + r * .62}`} stroke="#F5A0C0" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".7" />
      <circle cx={x - r * .35} cy={y - r * .38} r={Math.max(1.5, r * .1)} fill="#fff" />
    </g>
  );
  // піна у ванні: ряд пухких кружечків
  const foam = (xs: number[], y: number, r: number) => xs.map((x, i) => <circle key={i} cx={x} cy={y + (i % 2) * 4} r={r + (i % 3) * 3} fill="url(#bt-foam)" stroke={O} strokeWidth="2" />);

  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="The bathroom">
      <defs>
        <Lg id="bt-wall" a="#FFF8EC" b="#FBEBD3" />
        <Lg id="bt-tile" a="#D5EEF2" b="#AFD9E2" />
        <Lg id="bt-floor" a="#E9EEF2" b="#C3CFD8" />
        <Lg id="bt-tub" a="#FFFFFF" b="#C9DAE5" />
        <Lg id="bt-rim" a="#FFFFFF" b="#E4EDF2" />
        <Lg id="bt-foam" a="#FFFFFF" b="#E3F1F8" />
        <Lg id="bt-duck" a="#FFE680" b="#F0B02F" />
        <Lg id="bt-frog" a="#9EDB7E" b="#4E9F45" />
        <Lg id="bt-curtain" a="#C8B6EC" b="#9C86D4" />
        <Lg id="bt-gold" a="#FFE58A" b="#D9A321" />
        <Lg id="bt-steel" a="#F1F4F6" b="#9EAAB2" />
        <Lg id="bt-cab" a="#FFFDF8" b="#E2D6C2" />
        <Lg id="bt-wood" a="#DCA36A" b="#A8703C" />
        <Lg id="bt-pink" a="#FFC2CF" b="#F07F9C" />
        <Lg id="bt-blue" a="#8EC9F2" b="#3F7FC2" />
        <Lg id="bt-green" a="#9EDB7E" b="#4E9F45" />
        <Lg id="bt-red" a="#FF8A78" b="#D2483A" />
        <Lg id="bt-cup" a="#E9DDF8" b="#B9A2DF" />
        <Lg id="bt-soap" a="#FFD0DC" b="#EE8FA8" />
        <Lg id="bt-mat" a="#B9E3C6" b="#83C29A" />
        <Lg id="bt-water" a="#CFEFFF" b="#7CC4F2" />
        <Lg id="bt-yellow" a="#FFF0A6" b="#F2C94A" />
        <Lg id="bt-shampoo" a="#C6A6F0" b="#8C63CF" />
        <radialGradient id="bt-bubble" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".7" stopColor="#D8F0FA" stopOpacity=".2" /><stop offset="1" stopColor="#B9E2F5" stopOpacity=".45" /></radialGradient>
        <radialGradient id="bt-mirror" cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#F4FCFF" /><stop offset="1" stopColor="#A9D6EA" /></radialGradient>
        <radialGradient id="bt-sun" cx=".5" cy="0" r=".9"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>

      {/* стіна: світла зверху, плитка знизу */}
      <rect width="1000" height="600" fill="url(#bt-wall)" />
      <rect y="250" width="1000" height="206" fill="url(#bt-tile)" />
      {Array.from({ length: 5 }, (_, r) => Array.from({ length: 25 }, (_, c) => <rect key={`${r}-${c}`} x={c * 40 + 3} y={256 + r * 40} width="34" height="34" rx="5" fill="#fff" opacity=".35" />))}
      <rect x="0" y="244" width="1000" height="12" fill="#8CC6D4" stroke={O} strokeWidth="2" />
      <rect width="1000" height="456" fill="url(#bt-sun)" />

      {/* підлога: плитка в перспективі, плінтус, килимок */}
      <path d="M0 456 H1000 V600 H0 Z" fill="url(#bt-floor)" />
      {[-450, -300, -150, 0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500].map((x0, i) => <path key={i} d={`M${x0 * .6 + 200} 456 L${x0} 600`} stroke="#9FB1BE" strokeWidth="2" opacity=".55" />)}
      {[478, 506, 540, 580].map((y) => <path key={y} d={`M0 ${y} H1000`} stroke="#9FB1BE" strokeWidth="2" opacity=".55" />)}
      <rect x="0" y="450" width="1000" height="8" fill="#8CC6D4" stroke={O} strokeWidth="2" />
      <path d="M118 476 H338 C 346 476, 350 480, 352 486 L364 522 C 366 528, 362 532, 354 532 H100 C 92 532, 88 528, 90 522 L102 486 C 104 480, 110 476, 118 476 Z" fill="url(#bt-mat)" stroke={O} strokeWidth="2.5" />
      {[130, 170, 210, 250, 290, 330].map((x, i) => <path key={i} d={`M${x} 482 L${x - 16 + i * 6} 526`} stroke="#fff" strokeWidth="3" opacity=".45" strokeLinecap="round" />)}

      {/* маленьке віконце */}
      <rect x="436" y="40" width="80" height="80" rx="40" fill="#CFEFFF" stroke={O} strokeWidth="3" />
      <path d="M476 40 V120 M436 80 H516" stroke="#FFFDF8" strokeWidth="6" /><path d="M476 40 V120 M436 80 H516" stroke={O} strokeWidth="1.5" opacity=".35" />
      <circle cx="476" cy="80" r="40" fill="none" stroke={O} strokeWidth="3" />
      <path d="M448 62 c 6 -10, 14 -14, 22 -14" stroke="#fff" strokeWidth="4" opacity=".7" fill="none" strokeLinecap="round" />

      {/* кран ванни на стіні */}
      <g>
        <rect x="372" y="262" width="40" height="12" rx="5" fill="url(#bt-steel)" stroke={O} strokeWidth="2" />
        <path d="M380 270 V286 C 380 296, 362 296, 362 304" stroke={O} strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M380 270 V286 C 380 296, 362 296, 362 304" stroke="url(#bt-steel)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="404" cy="268" r="7" fill="#6FA8DC" stroke={O} strokeWidth="2" />
      </g>

      {/* жабка за шторкою */}
      <g {...hit('frog')}><g transform="translate(18 0)">
        <rect x="140" y="250" width="66" height="66" fill="transparent" />
        <ellipse cx="172" cy="300" rx="30" ry="22" fill="url(#bt-frog)" stroke={O} strokeWidth="2.5" />
        <circle cx="160" cy="276" r="12" fill="url(#bt-frog)" stroke={O} strokeWidth="2.5" /><circle cx="186" cy="276" r="12" fill="url(#bt-frog)" stroke={O} strokeWidth="2.5" />
        <circle cx="160" cy="276" r="7" fill="#fff" stroke={O} strokeWidth="1.5" /><circle cx="186" cy="276" r="7" fill="#fff" stroke={O} strokeWidth="1.5" />
        <circle cx="161" cy="277" r="3.5" fill={O} /><circle cx="187" cy="277" r="3.5" fill={O} /><circle cx="185.5" cy="275.5" r="1.3" fill="#fff" />
        <path d="M168 300 q10 8 22 0" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="194" cy="296" rx="5" ry="3" fill="#F5A0C0" opacity=".8" />
        <ellipse cx="180" cy="290" rx="9" ry="4" fill="#fff" opacity=".3" />
      </g></g>

      {/* шторка, зібрана ліворуч */}
      <path d="M18 58 H434" stroke={O} strokeWidth="5" strokeLinecap="round" />
      <path d="M18 58 H434" stroke="#D5DDE2" strokeWidth="2.5" strokeLinecap="round" />
      {[34, 64, 94, 124, 150].map((x) => <circle key={x} cx={x} cy="62" r="6" fill="none" stroke={O} strokeWidth="2" />)}
      <path d="M24 64 H156 C 150 110, 168 150, 160 200 C 154 240, 172 280, 166 318 H24 Z" fill="url(#bt-curtain)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M58 70 C 54 150, 62 240, 56 314 M94 70 C 90 150, 100 240, 94 314 M128 70 C 124 150, 134 240, 128 314" stroke={O} strokeWidth="2" opacity=".2" fill="none" />
      {[[42, 100], [76, 140], [112, 104], [142, 150], [42, 190], [78, 236], [112, 200], [146, 250], [44, 280], [110, 290]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#fff" opacity=".55" />)}
      <path d="M40 80 C 36 160, 42 240, 38 300" stroke="#fff" strokeWidth="4" opacity=".3" fill="none" strokeLinecap="round" />

      {/* піна, качечка, ванна */}
      {foam([190, 226, 300, 340, 376, 404], 300, 16)}
      <g {...hit('duck')}><g transform="translate(16 0)">
        <rect x="218" y="230" width="94" height="80" fill="transparent" />
        <path d="M296 286 C 312 278, 318 262, 312 254 C 306 266, 298 272, 290 274 Z" fill="url(#bt-duck)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <ellipse cx="270" cy="292" rx="40" ry="24" fill="url(#bt-duck)" stroke={O} strokeWidth="2.5" />
        <path d="M262 286 C 272 276, 290 278, 294 290 C 284 296, 270 296, 262 286 Z" fill="#F0B02F" stroke={O} strokeWidth="2" strokeLinejoin="round" opacity=".9" />
        <circle cx="244" cy="258" r="21" fill="url(#bt-duck)" stroke={O} strokeWidth="2.5" />
        <path d="M226 262 C 214 258, 206 264, 208 270 C 214 274, 222 272, 228 268 Z" fill="#F6913A" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="238" cy="252" rx="4" ry="5" fill={O} /><circle cx="236.5" cy="250" r="1.6" fill="#fff" />
        <ellipse cx="250" cy="266" rx="6" ry="3.5" fill="#F5A0C0" opacity=".75" />
        <ellipse cx="252" cy="244" rx="8" ry="4" fill="#fff" opacity=".4" transform="rotate(-20 252 244)" />
        <ellipse cx="262" cy="280" rx="14" ry="5" fill="#fff" opacity=".3" />
      </g></g>
      {foam([60, 96, 132, 172, 214, 252, 292, 330, 366, 400], 316, 13)}
      <rect x="24" y="312" width="404" height="22" rx="11" fill="url(#bt-rim)" stroke={O} strokeWidth="2.5" />
      <path d="M36 334 H416 C 414 400, 392 440, 344 446 H108 C 60 440, 38 400, 36 334 Z" fill="url(#bt-tub)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M62 352 C 66 390, 80 416, 108 428" stroke="#fff" strokeWidth="6" opacity=".7" fill="none" strokeLinecap="round" />
      <path d="M380 352 C 378 388, 368 410, 350 424" stroke={O} strokeWidth="2" opacity=".15" fill="none" strokeLinecap="round" />
      {[96, 356].map((x) => <path key={x} d={`M${x - 16} 440 C ${x - 18} 456, ${x - 10} 466, ${x - 2} 466 H${x + 6} C ${x + 14} 466, ${x + 18} 456, ${x + 16} 440 Z`} fill="url(#bt-gold)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />)}
      <g>
        <rect x="386" y="296" width="34" height="18" rx="7" fill="url(#bt-yellow)" stroke={O} strokeWidth="2" />
        {[392, 400, 408, 414].map((x, i) => <circle key={x} cx={x} cy={302 + (i % 2) * 6} r="1.6" fill="#D9A321" />)}
      </g>

      {/* мильні бульбашки над ванною */}
      {bubble(268, 214, 7)}{bubble(206, 128, 9)}{bubble(412, 170, 6)}{bubble(150, 228, 6)}{bubble(352, 92, 8)}
      <g {...hit('bubble1')}>{bubble(214, 186, 28)}</g>
      <g {...hit('bubble2')}>{bubble(306, 136, 32)}</g>
      <g {...hit('bubble3')}>{bubble(386, 220, 26)}</g>

      {/* дзеркало */}
      <g>
        <ellipse cx="600" cy="140" rx="74" ry="84" fill="url(#bt-wood)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="600" cy="140" rx="62" ry="72" fill="url(#bt-mirror)" stroke={O} strokeWidth="2" />
        <path d="M562 120 L600 82 M568 150 L622 96 M590 176 L634 132" stroke="#fff" strokeWidth="7" opacity=".55" strokeLinecap="round" />
      </g>

      {/* умивальник на ніжці */}
      <path d="M560 452 C 580 456, 620 456, 640 452" stroke={O} strokeWidth="6" opacity=".12" strokeLinecap="round" />
      <path d="M586 358 C 584 400, 574 438, 566 452 H634 C 626 438, 616 400, 614 358 Z" fill="url(#bt-tub)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M594 372 C 592 404, 586 430, 580 446" stroke="#fff" strokeWidth="4" opacity=".7" fill="none" strokeLinecap="round" />
      <path d="M516 312 H684 C 680 346, 644 364, 600 364 C 556 364, 520 346, 516 312 Z" fill="url(#bt-tub)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M536 326 C 546 342, 566 352, 592 354" stroke="#fff" strokeWidth="5" opacity=".7" fill="none" strokeLinecap="round" />
      {water && <path d="M624 284 C 622 294, 628 302, 624 312 L632 312 C 634 302, 630 294, 632 284 Z" fill="url(#bt-water)" stroke="#5AA9DC" strokeWidth="1.5" />}
      <rect x="508" y="300" width="184" height="16" rx="8" fill="url(#bt-rim)" stroke={O} strokeWidth="2.5" />
      {water && <g>{[[612, 296], [642, 294], [606, 286], [648, 284]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#9FDBFA" stroke="#5AA9DC" strokeWidth="1" />)}</g>}
      <g {...hit('tap')}>
        <rect x="574" y="246" width="66" height="56" fill="transparent" />
        <path d="M600 300 V272 C 600 262, 628 260, 628 274 V282" fill="none" stroke={O} strokeWidth="12" strokeLinecap="round" />
        <path d="M600 300 V272 C 600 262, 628 260, 628 274 V282" fill="none" stroke="url(#bt-steel)" strokeWidth="7" strokeLinecap="round" />
        <rect x="588" y="292" width="24" height="10" rx="3" fill="url(#bt-steel)" stroke={O} strokeWidth="2" />
        <path d="M600 262 L584 252" stroke={O} strokeWidth="8" strokeLinecap="round" /><path d="M600 262 L584 252" stroke="url(#bt-steel)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="583" cy="251" r="5" fill="#F27A6B" stroke={O} strokeWidth="1.8" />
      </g>
      {/* склянка із зубними щітками */}
      <g {...hit('redBrush')}>
        <rect x="506" y="208" width="42" height="64" fill="transparent" />
        <path d="M542 290 L522 230" stroke={O} strokeWidth="9" strokeLinecap="round" /><path d="M542 290 L522 230" stroke="url(#bt-red)" strokeWidth="5" strokeLinecap="round" />
        <rect x="512" y="214" width="12" height="20" rx="3" fill="#fff" stroke={O} strokeWidth="1.8" transform="rotate(-18 518 224)" />
      </g>
      <g {...hit('greenBrush')}>
        <rect x="550" y="208" width="42" height="64" fill="transparent" />
        <path d="M552 290 L574 230" stroke={O} strokeWidth="9" strokeLinecap="round" /><path d="M552 290 L574 230" stroke="url(#bt-green)" strokeWidth="5" strokeLinecap="round" />
        <rect x="570" y="214" width="12" height="20" rx="3" fill="#fff" stroke={O} strokeWidth="1.8" transform="rotate(20 576 224)" />
      </g>
      <g>
        <path d="M528 264 H568 L564 300 H532 Z" fill="url(#bt-cup)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <ellipse cx="548" cy="264" rx="20" ry="4" fill="#F4EEFB" stroke={O} strokeWidth="2" />
        <path d="M536 272 V294" stroke="#fff" strokeWidth="3.5" opacity=".5" strokeLinecap="round" />
      </g>
      {/* мило в мильниці */}
      <g {...hit('soap')}>
        <rect x="640" y="250" width="54" height="52" fill="transparent" />
        <path d="M644 296 C 648 304, 684 304, 688 296 Z" fill="#9EC5F0" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <rect x="650" y="276" width="32" height="20" rx="9" fill="url(#bt-soap)" stroke={O} strokeWidth="2.2" />
        <ellipse cx="660" cy="282" rx="6" ry="2.5" fill="#fff" opacity=".6" />
        <circle cx="664" cy="268" r="5" fill="url(#bt-bubble)" stroke="#7FB8D8" strokeWidth="1.5" /><circle cx="674" cy="262" r="3.5" fill="url(#bt-bubble)" stroke="#7FB8D8" strokeWidth="1.5" />
      </g>

      {/* шафка на стіні */}
      <g>
        <path d="M790 40 C 784 24, 790 14, 796 26 M800 40 C 802 20, 812 16, 810 34" stroke="#4F9A5B" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M784 40 H818 L814 64 H788 Z" fill="#F28C9B" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
      </g>
      <g {...hit('cabinet')}>
        <rect x="726" y="64" width="158" height="146" rx="8" fill="url(#bt-cab)" stroke={O} strokeWidth="2.5" />
        {!open && <>
          <rect x="734" y="74" width="68" height="128" rx="5" fill="url(#bt-cab)" stroke={O} strokeWidth="2" />
          <rect x="808" y="74" width="68" height="128" rx="5" fill="url(#bt-cab)" stroke={O} strokeWidth="2" />
          <rect x="744" y="86" width="48" height="104" rx="4" fill="none" stroke={O} strokeWidth="1.5" opacity=".3" />
          <rect x="818" y="86" width="48" height="104" rx="4" fill="none" stroke={O} strokeWidth="1.5" opacity=".3" />
          <circle cx="794" cy="138" r="5" fill="url(#bt-gold)" stroke={O} strokeWidth="1.8" /><circle cx="816" cy="138" r="5" fill="url(#bt-gold)" stroke={O} strokeWidth="1.8" />
          <path d="M748 92 V180" stroke="#fff" strokeWidth="4" opacity=".6" strokeLinecap="round" />
        </>}
      </g>
      {open && <g>
        <rect x="734" y="72" width="142" height="130" rx="4" fill="#EADFCB" stroke={O} strokeWidth="2" />
        <path d="M736 140 H874" stroke={O} strokeWidth="4" />
        <path d="M726 66 L696 54 V220 L726 208 Z" fill="url(#bt-cab)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M884 66 L914 54 V220 L884 208 Z" fill="url(#bt-cab)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="702" cy="138" r="4" fill="url(#bt-gold)" stroke={O} strokeWidth="1.5" /><circle cx="908" cy="138" r="4" fill="url(#bt-gold)" stroke={O} strokeWidth="1.5" />
        <g>
          <rect x="802" y="118" width="22" height="20" rx="4" fill="#FFFDF8" stroke={O} strokeWidth="2" /><rect x="800" y="112" width="26" height="8" rx="3" fill="#6FA8DC" stroke={O} strokeWidth="1.8" />
          <rect x="752" y="186" width="58" height="12" rx="3" fill="#F2B53A" stroke={O} strokeWidth="2" />
          {[760, 768, 776, 784, 792, 800].map((x) => <path key={x} d={`M${x} 186 V178`} stroke={O} strokeWidth="2" strokeLinecap="round" />)}
          <path d="M832 196 V164 C 832 158, 852 158, 852 164 V196 Z" fill="#B9E3C6" stroke={O} strokeWidth="2" strokeLinejoin="round" /><rect x="836" y="152" width="12" height="8" rx="2" fill="#4F9A5B" stroke={O} strokeWidth="1.5" />
        </g>
      </g>}
      {open && <g {...hit('toothpaste')}>
        <rect x="738" y="88" width="60" height="52" fill="transparent" />
        <path d="M746 118 L778 120 C 784 120, 786 124, 786 127 C 786 130, 784 134, 778 134 L746 137 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M746 116 V139" stroke={O} strokeWidth="4" strokeLinecap="round" />
        <rect x="786" y="121" width="9" height="12" rx="2" fill="#3F7FC2" stroke={O} strokeWidth="1.8" />
        <path d="M754 125 C 762 121, 770 131, 780 125" stroke="#6FA8DC" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>}
      {open && <g {...hit('shampoo')}>
        <rect x="826" y="78" width="46" height="62" fill="transparent" />
        <path d="M836 98 H862 C 866 98, 868 102, 868 106 V134 C 868 137, 866 138, 862 138 H836 C 832 138, 830 137, 830 134 V106 C 830 102, 832 98, 836 98 Z" fill="url(#bt-shampoo)" stroke={O} strokeWidth="2.2" />
        <rect x="842" y="86" width="14" height="12" rx="2" fill="#F2B53A" stroke={O} strokeWidth="1.8" />
        <rect x="836" y="112" width="26" height="14" rx="3" fill="#fff" opacity=".85" />
        <path d="M835 104 V132" stroke="#fff" strokeWidth="3" opacity=".45" strokeLinecap="round" />
      </g>}

      {/* рушники на гачках */}
      <rect x="730" y="240" width="150" height="10" rx="4" fill="url(#bt-wood)" stroke={O} strokeWidth="2" />
      {[768, 846].map((x) => <circle key={x} cx={x} cy="254" r="6" fill="url(#bt-gold)" stroke={O} strokeWidth="1.8" />)}
      <g {...hit('pinkTowel')}>
        <path d="M740 258 C 750 250, 786 250, 796 258 L800 368 C 784 374, 752 374, 736 368 Z" fill="url(#bt-pink)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M738 340 C 754 346, 782 346, 799 340 M738 352 C 754 358, 782 358, 799 352" stroke="#fff" strokeWidth="3.5" opacity=".75" fill="none" />
        <path d="M750 266 C 748 296, 748 320, 750 334" stroke="#fff" strokeWidth="4" opacity=".35" fill="none" strokeLinecap="round" />
      </g>
      <g {...hit('blueTowel')}>
        <path d="M818 258 C 828 250, 864 250, 874 258 L880 380 C 862 386, 830 386, 812 380 Z" fill="url(#bt-blue)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M814 352 C 832 358, 860 358, 879 352 M814 364 C 832 370, 860 370, 879 364" stroke="#fff" strokeWidth="3.5" opacity=".75" fill="none" />
        <path d="M828 266 C 826 296, 826 320, 828 340" stroke="#fff" strokeWidth="4" opacity=".35" fill="none" strokeLinecap="round" />
      </g>

      {/* табуретка зі стосом рушників, капці під нею */}
      <ellipse cx="914" cy="548" rx="76" ry="10" fill={O} opacity=".12" />
      <path d="M876 442 L870 544 M952 442 L958 544" stroke={O} strokeWidth="15" strokeLinecap="round" />
      <path d="M876 442 L870 544 M952 442 L958 544" stroke="url(#bt-wood)" strokeWidth="10" strokeLinecap="round" />
      <path d="M874 500 H954" stroke={O} strokeWidth="11" strokeLinecap="round" /><path d="M874 500 H954" stroke="#C48A52" strokeWidth="6" strokeLinecap="round" />
      <rect x="852" y="424" width="124" height="20" rx="8" fill="url(#bt-wood)" stroke={O} strokeWidth="2.5" />
      <path d="M866 430 H930" stroke="#fff" strokeWidth="3" opacity=".3" strokeLinecap="round" />
      <rect x="872" y="402" width="84" height="22" rx="8" fill="url(#bt-yellow)" stroke={O} strokeWidth="2.2" />
      <rect x="878" y="382" width="74" height="20" rx="8" fill="url(#bt-mat)" stroke={O} strokeWidth="2.2" />
      <path d="M884 392 H944 M880 413 H948" stroke="#fff" strokeWidth="2.5" opacity=".5" />
      <g {...hit('slippers')}>
        <rect x="874" y="500" width="84" height="54" fill="transparent" />
        {[894, 934].map((x, i) => <g key={x} transform={`rotate(${i ? 8 : -8} ${x} 530)`}>
          <ellipse cx={x} cy="528" rx="14" ry="22" fill="#FFE3EA" stroke={O} strokeWidth="2.2" />
          <path d={`M${x - 14} 532 C ${x - 14} 556, ${x + 14} 556, ${x + 14} 532 C ${x + 8} 524, ${x - 8} 524, ${x - 14} 532 Z`} fill="url(#bt-pink)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx={x} cy="534" r="5" fill="#fff" stroke={O} strokeWidth="1.5" />
          <ellipse cx={x - 4} cy="516" rx="4" ry="7" fill="#fff" opacity=".6" />
        </g>)}
      </g>

      {/* котик після ванни: рушник-тюрбан на голові */}
      <ellipse cx="470" cy="578" rx="56" ry="9" fill={O} opacity=".14" />
      <g transform="translate(470 502) scale(1.1)">
        <path d="M-30 30 C -40 80, 40 80, 30 30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        <path d="M28 60 C 60 64, 66 30, 52 20" stroke={O} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="-13" cy="68" rx="9" ry="6" fill="#FFFDF8" stroke={O} strokeWidth="2" /><ellipse cx="13" cy="68" rx="9" ry="6" fill="#FFFDF8" stroke={O} strokeWidth="2" />
        <ellipse cx="0" cy="2" rx="40" ry="33" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        {/* рушник щільно обгортає маківку */}
        <path d="M-40 -2 C -44 -30, -22 -46, 0 -46 C 22 -46, 44 -30, 40 -2 C 30 -14, 16 -18, 0 -18 C -16 -18, -30 -14, -40 -2 Z" fill="url(#bt-pink)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-6 -44 C 4 -64, 26 -62, 24 -46 C 22 -38, 10 -38, 4 -44 Z" fill="url(#bt-pink)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-30 -18 C -20 -30, -4 -34, 12 -32 M-20 -36 C -8 -42, 8 -42, 22 -36" stroke="#fff" strokeWidth="3" opacity=".6" fill="none" strokeLinecap="round" />
        <ellipse cx="-14" cy="-1" rx="5" ry="6" fill={O} /><ellipse cx="14" cy="-1" rx="5" ry="6" fill={O} />
        <circle cx="-12" cy="-3" r="1.8" fill="#fff" /><circle cx="16" cy="-3" r="1.8" fill="#fff" />
        <path d="M-3 9 L3 9 L0 12 Z" fill="#F08AA8" />
        <path d="M0 12 q-6 7 -11 3 M0 12 q6 7 11 3" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="-24" cy="11" rx="7" ry="4" fill="#F5A0C0" opacity=".6" /><ellipse cx="24" cy="11" rx="7" ry="4" fill="#F5A0C0" opacity=".6" />
        <path d="M-40 7 L-58 2 M-40 13 L-58 15 M40 7 L58 2 M40 13 L58 15" stroke={O} strokeWidth="1.8" />
      </g>
    </svg>
  );
}

export const BATHROOM: QuestLocation = {
  id: 'bathroom', level: 'A1-A2', Scene,
  title: { uk: 'Ванна кімната', ru: 'Ванная', en: 'The bathroom' },
  place: { uk: 'Ванна кімната', ru: 'Ванная', en: 'The bathroom' },
  finale: 'Clean and happy! Thank you, friend!',
  topics: [
    { uk: 'Прийменники місця: in, on, under, next to, above, behind', ru: 'Предлоги места: in, on, under, next to, above, behind', en: 'Prepositions of place: in, on, under, next to, above, behind' },
    { uk: 'Лексика: ванна кімната, гігієна: soap, toothbrush, toothpaste, towel', ru: 'Лексика: ванная, гигиена: soap, toothbrush, toothpaste, towel', en: 'Vocabulary: bathroom, hygiene: soap, toothbrush, toothpaste, towel' },
    { uk: 'Дієслова-команди: turn on, wash, open, take, pop', ru: 'Глаголы-команды: turn on, wash, open, take, pop', en: 'Command verbs: turn on, wash, open, take, pop' },
    { uk: 'Кольори і числа: green, blue, three', ru: 'Цвета и числа: green, blue, three', en: 'Colours and numbers: green, blue, three' },
  ],
  tasks: [
    { en: 'Welcome to my bathroom! The duck is in the bath. Take the duck.', uk: 'Ласкаво просимо до моєї ванної кімнати! Качечка у ванні. Візьми качечку.', ru: 'Добро пожаловать в мою ванную! Уточка в ванне. Возьми уточку.', target: ['duck'], take: 'duck' },
    { en: 'Turn on the tap, please.', uk: 'Відкрий кран, будь ласка.', ru: 'Открой кран, пожалуйста.', target: ['tap'], set: 'water' },
    { en: 'Let’s wash our hands. Take the soap next to the tap.', uk: 'Помиймо руки. Візьми мило біля крана.', ru: 'Давай помоем руки. Возьми мыло рядом с краном.', target: ['soap'], take: 'soap' },
    { en: 'Open the cabinet next to the mirror.', uk: 'Відчини шафку біля дзеркала.', ru: 'Открой шкафчик рядом с зеркалом.', target: ['cabinet'], set: 'cabinet' },
    { en: 'The toothpaste is in the cabinet. Take it.', uk: 'Зубна паста в шафці. Візьми її.', ru: 'Зубная паста в шкафчике. Возьми её.', target: ['toothpaste'], take: 'toothpaste' },
    { en: 'Take the green toothbrush from the cup.', uk: 'Візьми зелену зубну щітку зі склянки.', ru: 'Возьми зелёную зубную щётку из стаканчика.', target: ['greenBrush'], take: 'toothbrush' },
    { en: 'My slippers are under the stool. Take them, please.', uk: 'Мої капці під табуреткою. Візьми їх, будь ласка.', ru: 'Мои тапочки под табуреткой. Возьми их, пожалуйста.', target: ['slippers'], take: 'slippers' },
    { en: 'Take the blue towel. It is on the hook.', uk: 'Візьми синій рушник. Він на гачку.', ru: 'Возьми синее полотенце. Оно на крючке.', target: ['blueTowel'], take: 'towel' },
    { en: 'Pop three soap bubbles above the bath.', uk: 'Лусни три мильні бульбашки над ванною.', ru: 'Лопни три мыльных пузыря над ванной.', target: ['bubble1', 'bubble2', 'bubble3'], all: true },
    { en: 'Who is behind the shower curtain? Find it!', uk: 'Хто сховався за шторкою? Знайди!', ru: 'Кто спрятался за шторкой? Найди!', target: ['frog'] },
  ],
};
