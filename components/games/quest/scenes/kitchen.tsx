// Локація «Кухня»: холодильник з молоком і яблуком, чашки на полиці, кран, стіл з фруктами, мишка під столом
import { O, Lg } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

/* eslint-disable react/display-name */
function Scene({ hit, flags: f }: SceneProps) {
  const open = f.has('fridge');
  const water = f.has('water');

  // яблуко: сердечко з градієнтом, хвостик, листочок, блиск
  const apple = (x: number, y: number, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -14 C -18 -26, -32 -6, -24 12 C -16 28, -5 26, 0 22 C 5 26, 16 28, 24 12 C 32 -6, 18 -26, 0 -14 Z" fill="url(#kt-apple)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M0 -14 C 0 -22, 2 -27, 6 -31" stroke={O} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M5 -25 C 12 -34, 22 -31, 23 -26 C 16 -21, 10 -21, 5 -25 Z" fill="#7CC36A" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
      <ellipse cx="-11" cy="-5" rx="6" ry="4" fill="#fff" opacity=".35" transform="rotate(-25 -11 -5)" />
    </g>
  );
  // чашка: тіло з градієнтом, вушко, темний край, блиск
  const cup = (x: number, y: number, g: string) => (
    <g transform={`translate(${x} ${y})`}>
      <path d="M20 -34 C 36 -36, 38 -12, 18 -12" fill="none" stroke={O} strokeWidth="7" strokeLinecap="round" />
      <path d="M20 -34 C 36 -36, 38 -12, 18 -12" fill="none" stroke={`url(#${g})`} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M-24 -42 H24 L20 -6 C 18 0, -18 0, -20 -6 Z" fill={`url(#${g})`} stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="0" cy="-42" rx="24" ry="5" fill="#fff" stroke={O} strokeWidth="2" />
      <ellipse cx="0" cy="-41" rx="18" ry="2.6" fill={O} opacity=".18" />
      <path d="M-14 -34 C -15 -24, -13 -14, -10 -8" stroke="#fff" strokeWidth="4" opacity=".35" fill="none" strokeLinecap="round" />
    </g>
  );

  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="In the kitchen">
      <defs>
        <Lg id="kt-wall" a="#FFF6E6" b="#F8E2C0" />
        <Lg id="kt-tile" a="#E6F4F1" b="#C9E3DE" />
        <Lg id="kt-floor" a="#E4C08E" b="#B98957" />
        <Lg id="kt-fridge" a="#D9F1EC" b="#9FCBC4" />
        <Lg id="kt-fridgeIn" a="#F7FCFF" b="#D3EAF3" />
        <Lg id="kt-wood" a="#DCA36A" b="#A8703C" />
        <Lg id="kt-woodD" a="#B07A45" b="#7A4E28" />
        <Lg id="kt-cab" a="#A9D0EA" b="#6E9FC9" />
        <Lg id="kt-top" a="#FFFDF8" b="#E6DFD1" />
        <Lg id="kt-steel" a="#F1F4F6" b="#9EAAB2" />
        <Lg id="kt-red" a="#FF8A78" b="#D2483A" />
        <Lg id="kt-blue" a="#8EC9F2" b="#3F7FC2" />
        <Lg id="kt-yellow" a="#FFE680" b="#F0B02F" />
        <Lg id="kt-apple" a="#FF6F61" b="#C9302C" />
        <Lg id="kt-banana" a="#FFEE94" b="#F2C230" />
        <Lg id="kt-milk" a="#FFFFFF" b="#DCE6EE" />
        <Lg id="kt-juice" a="#FFC46B" b="#EE8A1E" />
        <Lg id="kt-sky" a="#BEE6FA" b="#EEF9FF" />
        <Lg id="kt-pot" a="#E99A6B" b="#B9603A" />
        <Lg id="kt-rug" a="#F6B7A6" b="#E48E7C" />
        <Lg id="kt-curtain" a="#FFB3B8" b="#EE8790" />
        <Lg id="kt-water" a="#CFEFFF" b="#7CC4F2" />
        <radialGradient id="kt-orange" cx=".38" cy=".32" r=".75"><stop offset="0" stopColor="#FFC56E" /><stop offset="1" stopColor="#EE7F1C" /></radialGradient>
        <radialGradient id="kt-mouse" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#E2DEDA" /><stop offset="1" stopColor="#9C958F" /></radialGradient>
        <radialGradient id="kt-light" cx=".5" cy="0" r=".9"><stop offset="0" stopColor="#FFFBD9" stopOpacity=".95" /><stop offset="1" stopColor="#FFFBD9" stopOpacity="0" /></radialGradient>
        <radialGradient id="kt-sun" cx=".7" cy=".2" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".5" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>

      {/* стіна, сонячне світло, плитка над стільницею */}
      <rect width="1000" height="600" fill="url(#kt-wall)" />
      <rect width="1000" height="460" fill="url(#kt-sun)" />
      <rect x="660" y="214" width="340" height="110" fill="url(#kt-tile)" />
      {[0, 1, 2, 3].map((r) => Array.from({ length: 8 }, (_, c) => <rect key={`${r}-${c}`} x={662 + c * 44 + (r % 2) * 22 - 22} y={216 + r * 27} width="40" height="23" rx="4" fill="#fff" opacity=".45" />))}
      <path d="M660 324 V214 H1000" stroke={O} strokeWidth="2" opacity=".35" fill="none" />

      {/* підлога: дошки в перспективі, плінтус, килимок */}
      <path d="M0 456 H1000 V600 H0 Z" fill="url(#kt-floor)" />
      {[-300, -150, 0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350].map((x0, i) => <path key={i} d={`M${x0 * .66 + 170} 456 L${x0} 600`} stroke="#9C7040" strokeWidth="2" opacity=".35" />)}
      {[[60, 500, 140], [330, 540, 110], [700, 520, 120], [860, 575, 100], [150, 585, 90]].map(([x, y, w], i) => <path key={i} d={`M${x} ${y} h${w}`} stroke="#9C7040" strokeWidth="2" opacity=".25" />)}
      <rect x="0" y="448" width="1000" height="10" fill="#FFFDF8" stroke={O} strokeWidth="2" />
      <ellipse cx="500" cy="512" rx="255" ry="50" fill="url(#kt-rug)" stroke={O} strokeWidth="2.5" />
      <ellipse cx="500" cy="512" rx="225" ry="38" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 9" opacity=".7" />

      {/* вікно з фіранками і вазоном */}
      <rect x="395" y="42" width="210" height="170" rx="10" fill="url(#kt-sky)" stroke={O} strokeWidth="3" />
      <path d="M398 175 C 440 140, 480 150, 520 172 C 550 156, 580 150, 602 162 V209 H398 Z" fill="#9FD18A" />
      <path d="M398 190 C 450 170, 520 176, 602 186 V209 H398 Z" fill="#7DBE6C" />
      <circle cx="555" cy="88" r="20" fill="#FFD866" stroke="#F2B53A" strokeWidth="2" />
      <path d="M430 90 c 0 -14, 22 -16, 26 -6 c 10 -6, 24 2, 18 12 H430 Z" fill="#fff" opacity=".9" />
      <path d="M500 42 V212 M395 128 H605" stroke="#FFFDF8" strokeWidth="9" /><path d="M500 42 V212 M395 128 H605" stroke={O} strokeWidth="2" opacity=".35" />
      <rect x="395" y="42" width="210" height="170" rx="10" fill="none" stroke={O} strokeWidth="3" />
      <rect x="378" y="210" width="244" height="16" rx="5" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
      <path d="M370 28 H630" stroke={O} strokeWidth="4" strokeLinecap="round" />
      <path d="M372 30 C 400 70, 410 120, 386 170 C 380 186, 376 200, 372 212 L360 212 L360 30 Z" fill="url(#kt-curtain)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M628 30 C 600 70, 590 120, 614 170 C 620 186, 624 200, 628 212 L640 212 L640 30 Z" fill="url(#kt-curtain)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M368 60 C 372 100, 372 140, 366 190 M632 60 C 628 100, 628 140, 634 190" stroke="#fff" strokeWidth="3" opacity=".35" fill="none" strokeLinecap="round" />
      <g>
        <path d="M562 168 C 548 140, 552 128, 566 140 M572 166 C 572 130, 584 124, 584 150 M580 168 C 594 146, 606 146, 596 168" stroke="#4F9A5B" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M552 176 H602 L596 210 H558 Z" fill="url(#kt-pot)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="548" y="168" width="58" height="12" rx="4" fill="url(#kt-pot)" stroke={O} strokeWidth="2.5" />
      </g>

      {/* годинник над холодильником */}
      <g {...hit('clock')}>
        <circle cx="140" cy="62" r="38" fill="#F28C9B" stroke={O} strokeWidth="2.5" />
        <circle cx="140" cy="62" r="30" fill="#FFFDF8" stroke={O} strokeWidth="2" />
        {[0, 90, 180, 270].map((a) => <path key={a} d="M140 36 V42" stroke={O} strokeWidth="3" strokeLinecap="round" transform={`rotate(${a} 140 62)`} />)}
        <path d="M140 62 V44 M140 62 L154 70" stroke={O} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="140" cy="62" r="3.5" fill={O} />
        <ellipse cx="124" cy="40" rx="12" ry="5" fill="#fff" opacity=".35" transform="rotate(-30 124 40)" />
      </g>

      {/* полиця з чашками */}
      <path d="M712 182 v18 l14 -18 M932 182 v18 l-14 -18" stroke={O} strokeWidth="2.5" fill="#B07A45" strokeLinejoin="round" />
      <g {...hit('redCup')}><rect x="702" y="124" width="56" height="58" fill="transparent" />{cup(728, 174, 'kt-red')}</g>
      <g {...hit('blueCup')}><rect x="772" y="124" width="56" height="58" fill="transparent" />{cup(798, 174, 'kt-blue')}</g>
      <g {...hit('yellowCup')}><rect x="842" y="124" width="56" height="58" fill="transparent" />{cup(868, 174, 'kt-yellow')}</g>
      <g>
        <rect x="910" y="122" width="40" height="52" rx="10" fill="#F7E6EC" stroke={O} strokeWidth="2.5" />
        <rect x="912" y="140" width="36" height="30" rx="6" fill="#C9406A" opacity=".75" />
        <rect x="906" y="114" width="48" height="12" rx="4" fill="#F2B53A" stroke={O} strokeWidth="2" />
        <path d="M918 132 v26" stroke="#fff" strokeWidth="4" opacity=".4" strokeLinecap="round" />
      </g>
      <rect x="690" y="174" width="270" height="12" rx="4" fill="url(#kt-wood)" stroke={O} strokeWidth="2.5" />
      {/* картинка на стіні */}
      <g>
        <rect x="770" y="40" width="96" height="66" rx="6" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        <rect x="778" y="48" width="80" height="50" rx="3" fill="#DDF0FA" />
        <path d="M800 98 C 800 80, 806 72, 816 66 M826 98 C 826 84, 834 76, 842 74" stroke="#4F9A5B" strokeWidth="3" fill="none" />
        <circle cx="816" cy="64" r="8" fill="#F28C9B" stroke={O} strokeWidth="1.5" /><circle cx="843" cy="72" r="7" fill="#9EC5F0" stroke={O} strokeWidth="1.5" />
      </g>

      {/* стільниця, шафки, мийка, чайник */}
      <rect x="670" y="334" width="326" height="118" rx="6" fill="url(#kt-cab)" stroke={O} strokeWidth="2.5" />
      {[[680, 380], [762, 380], [844, 380], [926, 380]].map(([x, y], i) => <g key={i}>
        <rect x={x} y="346" width="62" height="94" rx="6" fill="#fff" fillOpacity=".18" stroke={O} strokeWidth="1.8" opacity=".9" />
        <rect x={x + (i % 2 ? 8 : 46)} y={y} width="8" height="22" rx="4" fill="url(#kt-steel)" stroke={O} strokeWidth="1.5" />
      </g>)}
      <rect x="660" y="316" width="340" height="22" rx="6" fill="url(#kt-top)" stroke={O} strokeWidth="2.5" />
      <path d="M778 318 H882 L876 326 H784 Z" fill="#8FA0AA" stroke={O} strokeWidth="2" strokeLinejoin="round" />
      {water && <ellipse cx="830" cy="322" rx="40" ry="3" fill="#9FDBFA" />}
      <g>
        <g transform="translate(-10 0)"><path d="M684 316 C 680 284, 694 264, 720 264 C 746 264, 760 284, 756 316 Z" fill="url(#kt-red)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M752 294 C 766 290, 772 280, 780 272" stroke={O} strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M752 294 C 766 290, 772 280, 780 272" stroke="#E2584A" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M698 266 C 700 246, 740 246, 742 266" stroke={O} strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="720" cy="264" rx="16" ry="4" fill="#fff" stroke={O} strokeWidth="2" />
        <ellipse cx="704" cy="284" rx="6" ry="12" fill="#fff" opacity=".3" />
      </g></g>
      <g {...hit('tap')}>
        <rect x="796" y="236" width="76" height="84" fill="transparent" />
        <path d="M830 318 V262 C 830 240, 860 238, 862 260 V268" fill="none" stroke={O} strokeWidth="12" strokeLinecap="round" />
        <path d="M830 318 V262 C 830 240, 860 238, 862 260 V268" fill="none" stroke="url(#kt-steel)" strokeWidth="7" strokeLinecap="round" />
        <rect x="818" y="306" width="24" height="12" rx="3" fill="url(#kt-steel)" stroke={O} strokeWidth="2" />
        <circle cx="808" cy="306" r="8" fill="#F27A6B" stroke={O} strokeWidth="2" /><circle cx="852" cy="306" r="8" fill="#6FA8DC" stroke={O} strokeWidth="2" />
        <path d="M826 254 c 2 -6, 6 -10, 12 -12" stroke="#fff" strokeWidth="2.5" opacity=".7" fill="none" strokeLinecap="round" />
      </g>
      {water && <g>
        <path d="M858 270 C 856 286, 864 300, 858 318 L866 318 C 870 300, 864 286, 866 270 Z" fill="url(#kt-water)" stroke="#5AA9DC" strokeWidth="1.5" />
        {[[846, 312], [876, 310], [840, 300], [882, 300]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#9FDBFA" stroke="#5AA9DC" strokeWidth="1" />)}
      </g>}
      {/* поручень з кухарським приладдям */}
      <path d="M906 232 H990" stroke={O} strokeWidth="4" strokeLinecap="round" />
      <g stroke={O} strokeWidth="2" strokeLinejoin="round">
        <path d="M922 232 V280" strokeWidth="5" /><ellipse cx="922" cy="290" rx="12" ry="10" fill="url(#kt-steel)" />
        <path d="M952 232 V270" strokeWidth="5" /><rect x="942" y="268" width="20" height="28" rx="4" fill="#F2B53A" />
        <path d="M978 232 V262" strokeWidth="4" /><path d="M978 262 C 966 276, 968 296, 978 300 C 988 296, 990 276, 978 262 Z" fill="none" />
      </g>

      {/* холодильник: корпус, дверцята, морозилка */}
      <ellipse cx="140" cy="460" rx="112" ry="10" fill={O} opacity=".12" />
      <g {...hit('fridge')}>
        <rect x="40" y="108" width="200" height="348" rx="22" fill="url(#kt-fridge)" stroke={O} strokeWidth="2.5" />
        <path d="M40 206 H240" stroke={O} strokeWidth="2.5" />
        <rect x="58" y="140" width="9" height="44" rx="4.5" fill="url(#kt-steel)" stroke={O} strokeWidth="1.8" />
        <path d="M58 120 C 90 114, 140 114, 200 118" stroke="#fff" strokeWidth="5" opacity=".35" fill="none" strokeLinecap="round" />
        {!open && <>
          <rect x="58" y="226" width="9" height="76" rx="4.5" fill="url(#kt-steel)" stroke={O} strokeWidth="1.8" />
          <path d="M210 226 V430" stroke="#fff" strokeWidth="6" opacity=".3" strokeLinecap="round" />
          <circle cx="150" cy="260" r="12" fill="#F28C9B" stroke={O} strokeWidth="2" />
          <rect x="174" y="282" width="34" height="26" rx="4" fill="#FFF3B0" stroke={O} strokeWidth="2" transform="rotate(8 191 295)" />
          <path d="M180 292 h20 M180 299 h14" stroke={O} strokeWidth="1.5" opacity=".4" transform="rotate(8 191 295)" />
        </>}
        <rect x="58" y="450" width="20" height="10" rx="3" fill="#7FA9A3" stroke={O} strokeWidth="2" />
        <rect x="202" y="450" width="20" height="10" rx="3" fill="#7FA9A3" stroke={O} strokeWidth="2" />
      </g>
      {open && <g>
        <rect x="54" y="216" width="172" height="228" rx="10" fill="url(#kt-fridgeIn)" stroke={O} strokeWidth="2.5" />
        <rect x="56" y="218" width="168" height="90" rx="10" fill="url(#kt-light)" />
        <path d="M58 300 H222 M58 372 H222" stroke="#A9CFDF" strokeWidth="5" strokeLinecap="round" />
        <path d="M58 300 H222 M58 372 H222" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        {/* дверцята, відчинені вправо */}
        <path d="M240 210 L316 192 L316 472 L240 452 Z" fill="url(#kt-fridge)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M250 224 L306 212 L306 452 L250 438 Z" fill="#EAF6F4" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M250 300 L306 292 M250 372 L306 370" stroke={O} strokeWidth="2.5" />
        <rect x="262" y="262" width="12" height="32" rx="3" fill="#9FD18A" stroke={O} strokeWidth="1.5" /><rect x="282" y="268" width="12" height="26" rx="3" fill="#F28C9B" stroke={O} strokeWidth="1.5" />
        {/* яйця й морква (не цілі) */}
        <path d="M154 370 H214 L210 358 H158 Z" fill="#C8B8A6" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        {[166, 184, 202].map((x) => <ellipse key={x} cx={x} cy="350" rx="9" ry="11" fill="#FFF8EE" stroke={O} strokeWidth="2" />)}
        <rect x="64" y="396" width="152" height="44" rx="8" fill="#DFF2F7" fillOpacity=".8" stroke={O} strokeWidth="2" />
        {[90, 120].map((x, i) => <g key={x} transform={`rotate(${i ? 20 : -15} ${x} 404)`}><path d={`M${x - 7} 404 L${x} 432 L${x + 7} 404 Z`} fill="#F49A3C" stroke={O} strokeWidth="1.8" strokeLinejoin="round" /><path d={`M${x} 404 l-5 -10 M${x} 404 l5 -10`} stroke="#5FAE68" strokeWidth="3" strokeLinecap="round" /></g>)}
        <circle cx="170" cy="418" r="15" fill="#7CC36A" stroke={O} strokeWidth="2" /><circle cx="196" cy="420" r="13" fill="#E2584A" stroke={O} strokeWidth="2" />
        <path d="M66 408 H214" stroke="#fff" strokeWidth="3" opacity=".6" />
      </g>}
      {open && <g {...hit('milk')}>
        <rect x="62" y="226" width="56" height="72" fill="transparent" />
        <path d="M68 248 H112 V296 H68 Z" fill="url(#kt-milk)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M68 248 L76 232 H104 L112 248 Z" fill="#4A86C5" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="96" y="226" width="9" height="7" rx="2" fill="#F2B53A" stroke={O} strokeWidth="1.5" />
        <text x="90" y="276" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="Arial, sans-serif" fill="#3F7FC2">MILK</text>
        <path d="M73 254 V290" stroke="#fff" strokeWidth="3" opacity=".7" strokeLinecap="round" />
      </g>}
      {open && <g {...hit('juice')}>
        <rect x="160" y="226" width="50" height="72" fill="transparent" />
        <path d="M178 230 H192 V244 C 204 250, 206 258, 206 268 V292 C 206 296, 204 298, 200 298 H170 C 166 298, 164 296, 164 292 V268 C 164 258, 166 250, 178 244 Z" fill="url(#kt-juice)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="176" y="226" width="18" height="8" rx="2" fill="#4F9A5B" stroke={O} strokeWidth="1.8" />
        <rect x="168" y="268" width="34" height="16" rx="3" fill="#FFFDF8" stroke={O} strokeWidth="1.5" />
        <circle cx="185" cy="276" r="5" fill="#F49A3C" />
        <path d="M171 256 V290" stroke="#fff" strokeWidth="3" opacity=".45" strokeLinecap="round" />
      </g>}
      {open && <g {...hit('apple1')}><rect x="72" y="314" width="56" height="56" fill="transparent" />{apple(100, 346)}</g>}

      {/* стіл: задні ніжки, стільниця, тарілка, виделка, ложка, ваза з фруктами */}
      <path d="M386 384 V476 M614 384 V476" stroke="#94643A" strokeWidth="12" strokeLinecap="round" />
      <path d="M386 384 V476 M614 384 V476" stroke={O} strokeWidth="1" opacity=".4" />
      <path d="M352 332 H648 L664 366 H336 Z" fill="url(#kt-wood)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="336" y="366" width="328" height="18" rx="4" fill="url(#kt-woodD)" stroke={O} strokeWidth="2.5" />
      <path d="M370 340 H520" stroke="#fff" strokeWidth="3" opacity=".25" strokeLinecap="round" />
      <path d="M352 384 L348 500 M648 384 L652 500" stroke={O} strokeWidth="17" strokeLinecap="round" />
      <path d="M352 384 L348 500 M648 384 L652 500" stroke="url(#kt-wood)" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="430" cy="352" rx="54" ry="13" fill="#fff" stroke={O} strokeWidth="2.2" />
      <ellipse cx="430" cy="351" rx="34" ry="7" fill="#EEF2F5" stroke={O} strokeWidth="1.2" opacity=".8" />
      <path d="M362 358 L374 340 M374 340 l-4 -8 M374 340 l2 -9 M374 340 l7 -6" stroke="#A6B1B8" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M362 358 L374 340 M374 340 l-4 -8 M374 340 l2 -9 M374 340 l7 -6" stroke={O} strokeWidth="1" strokeLinecap="round" fill="none" />
      <g {...hit('spoon')}>
        <rect x="478" y="318" width="50" height="50" fill="transparent" />
        <path d="M494 362 L508 338" stroke={O} strokeWidth="7" strokeLinecap="round" /><path d="M494 362 L508 338" stroke="url(#kt-steel)" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="512" cy="331" rx="8" ry="11" fill="url(#kt-steel)" stroke={O} strokeWidth="2" transform="rotate(30 512 331)" />
        <ellipse cx="510" cy="328" rx="2.5" ry="4" fill="#fff" opacity=".8" transform="rotate(30 510 328)" />
      </g>
      <path d="M540 338 C 544 366, 628 366, 632 338 Z" fill="#9EC5F0" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <g {...hit('apple2')}><rect x="536" y="290" width="44" height="50" fill="transparent" />{apple(558, 318, .95)}</g>
      <g {...hit('orange')}>
        <rect x="574" y="282" width="40" height="56" fill="transparent" />
        <circle cx="594" cy="314" r="21" fill="url(#kt-orange)" stroke={O} strokeWidth="2.2" />
        <path d="M594 293 l4 -6" stroke={O} strokeWidth="2.5" strokeLinecap="round" /><path d="M597 290 c 6 -6, 12 -4, 13 0 c -5 3, -9 3, -13 0 Z" fill="#7CC36A" stroke={O} strokeWidth="1.5" />
        {[[586, 316], [600, 322], [596, 306], [584, 326]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" fill="#C9671A" />)}
        <ellipse cx="585" cy="303" rx="6" ry="3.5" fill="#fff" opacity=".35" transform="rotate(-30 585 303)" />
      </g>
      <g {...hit('banana')}>
        <rect x="610" y="276" width="50" height="62" fill="transparent" />
        <path d="M614 336 C 640 338, 656 314, 652 284 C 648 280, 646 280, 644 284 C 644 306, 632 322, 614 326 C 608 328, 608 334, 614 336 Z" fill="url(#kt-banana)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M644 284 L648 274 L654 278 L652 284" fill="#8E5A2C" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M620 330 C 636 328, 648 314, 650 296" stroke="#D9A321" strokeWidth="2" fill="none" opacity=".6" />
        <path d="M630 318 C 638 312, 642 304, 644 296" stroke="#fff" strokeWidth="3" fill="none" opacity=".5" strokeLinecap="round" />
      </g>
      <path d="M540 338 C 560 344, 612 344, 632 338" stroke={O} strokeWidth="2.5" fill="none" />
      <path d="M556 348 C 570 354, 590 354, 604 350" stroke="#fff" strokeWidth="3" opacity=".4" fill="none" strokeLinecap="round" />

      {/* мишка під столом */}
      <g {...hit('mouse')}>
        <rect x="414" y="430" width="132" height="76" fill="transparent" />
        <path d="M512 492 C 540 500, 548 470, 534 462 C 524 456, 518 470, 530 474" stroke="#9C958F" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <ellipse cx="486" cy="478" rx="34" ry="24" fill="url(#kt-mouse)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="478" cy="466" rx="14" ry="6" fill="#fff" opacity=".3" />
        <circle cx="450" cy="448" r="13" fill="url(#kt-mouse)" stroke={O} strokeWidth="2.2" /><circle cx="450" cy="448" r="7" fill="#F5A0C0" />
        <circle cx="474" cy="446" r="13" fill="url(#kt-mouse)" stroke={O} strokeWidth="2.2" /><circle cx="474" cy="446" r="7" fill="#F5A0C0" />
        <path d="M478 470 C 474 456, 460 452, 446 456 C 432 460, 424 470, 420 478 C 430 486, 446 490, 462 488 C 474 486, 480 480, 478 470 Z" fill="url(#kt-mouse)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="420" cy="478" r="4.5" fill="#F08AA8" stroke={O} strokeWidth="1.5" />
        <ellipse cx="446" cy="468" rx="4" ry="5" fill={O} /><circle cx="444.5" cy="466" r="1.6" fill="#fff" />
        <ellipse cx="452" cy="480" rx="6" ry="3.5" fill="#F5A0C0" opacity=".7" />
        <path d="M424 476 L408 470 M424 481 L408 484" stroke={O} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M434 484 q4 4 8 1" stroke={O} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <ellipse cx="472" cy="501" rx="9" ry="4.5" fill="#F5C2CF" stroke={O} strokeWidth="1.8" /><ellipse cx="500" cy="501" rx="9" ry="4.5" fill="#F5C2CF" stroke={O} strokeWidth="1.8" />
      </g>

      {/* котик-кухар у фартуху й ковпаку */}
      <ellipse cx="905" cy="574" rx="58" ry="9" fill={O} opacity=".14" />
      <g transform="translate(905 498) scale(1.1)">
        <path d="M-30 30 C -40 80, 40 80, 30 30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        <path d="M28 60 C 60 64, 66 30, 52 20" stroke={O} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M-22 40 H22 L26 60 C 12 72, -12 72, -26 60 Z" fill="url(#kt-red)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        {[[-12, 50], [0, 58], [12, 50], [-6, 64], [8, 64]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r="2.2" fill="#fff" opacity=".85" />)}
        <path d="M-22 40 C -10 36, 10 36, 22 40" stroke={O} strokeWidth="2" fill="none" />
        <ellipse cx="-13" cy="68" rx="9" ry="6" fill="#FFFDF8" stroke={O} strokeWidth="2" /><ellipse cx="13" cy="68" rx="9" ry="6" fill="#FFFDF8" stroke={O} strokeWidth="2" />
        <path d="M-34 -18 L-28 -50 L-8 -30 Z M34 -18 L28 -50 L8 -30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-28 -44 L-24 -34 M28 -44 L24 -34" stroke="#F5A0C0" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="0" cy="2" rx="40" ry="33" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        {/* ковпак сидить між вушками */}
        <path d="M-14 -27 C -25 -31, -26 -48, -14 -52 C -14 -68, 6 -72, 10 -60 C 20 -66, 30 -54, 21 -44 C 26 -36, 22 -27, 14 -27 Z" fill="#fff" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-16 -33 C -6 -28, 6 -28, 16 -33 L16 -23 C 6 -19, -6 -19, -16 -23 Z" fill="#F2F0EA" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M-10 -56 C -6 -62, 0 -64, 4 -62" stroke="#D8D4CC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="-14" cy="-3" rx="5" ry="6" fill={O} /><ellipse cx="14" cy="-3" rx="5" ry="6" fill={O} />
        <circle cx="-12" cy="-5" r="1.8" fill="#fff" /><circle cx="16" cy="-5" r="1.8" fill="#fff" />
        <path d="M-3 8 L3 8 L0 11 Z" fill="#F08AA8" />
        <path d="M0 11 q-6 7 -11 3 M0 11 q6 7 11 3" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="-24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" /><ellipse cx="24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" />
        <path d="M-40 6 L-58 1 M-40 12 L-58 14 M40 6 L58 1 M40 12 L58 14" stroke={O} strokeWidth="1.8" />
      </g>
    </svg>
  );
}

export const KITCHEN: QuestLocation = {
  id: 'kitchen', level: 'A1-A2', Scene,
  title: { uk: 'На кухні', ru: 'На кухне', en: 'In the kitchen' },
  place: { uk: 'Кухня', ru: 'Кухня', en: 'The kitchen' },
  finale: 'Yummy! Thank you for helping me in the kitchen!',
  topics: [
    { uk: 'Прийменники місця: in, on, under, next to, between, above', ru: 'Предлоги места: in, on, under, next to, between, above', en: 'Prepositions of place: in, on, under, next to, between, above' },
    { uk: 'Лексика: кухня, їжа, фрукти, посуд', ru: 'Лексика: кухня, еда, фрукты, посуда', en: 'Vocabulary: kitchen, food, fruit, dishes' },
    { uk: 'Кольори і числа: blue, yellow, two', ru: 'Цвета и числа: blue, yellow, two', en: 'Colours and numbers: blue, yellow, two' },
    { uk: 'Дієслова-команди: open, take, turn on, find, bring', ru: 'Глаголы-команды: open, take, turn on, find, bring', en: 'Command verbs: open, take, turn on, find, bring' },
  ],
  tasks: [
    { en: 'Welcome to my kitchen! Please open the fridge.', uk: 'Ласкаво просимо на мою кухню! Відчини, будь ласка, холодильник.', ru: 'Добро пожаловать на мою кухню! Открой, пожалуйста, холодильник.', target: ['fridge'], set: 'fridge' },
    { en: 'The milk is in the fridge. Take the milk.', uk: 'Молоко в холодильнику. Візьми молоко.', ru: 'Молоко в холодильнике. Возьми молоко.', target: ['milk'], take: 'milk' },
    { en: 'Look at the clock above the fridge. Touch it.', uk: 'Подивися на годинник над холодильником. Торкнися його.', ru: 'Посмотри на часы над холодильником. Коснись их.', target: ['clock'] },
    { en: 'Take the blue cup. It is on the shelf.', uk: 'Візьми синю чашку. Вона на полиці.', ru: 'Возьми синюю чашку. Она на полке.', target: ['blueCup'], take: 'cup' },
    { en: 'Turn on the tap, please.', uk: 'Відкрий кран, будь ласка.', ru: 'Открой кран, пожалуйста.', target: ['tap'], set: 'water' },
    { en: 'Take the spoon next to the plate.', uk: 'Візьми ложку біля тарілки.', ru: 'Возьми ложку рядом с тарелкой.', target: ['spoon'], take: 'spoon' },
    { en: 'Take the orange. It is between the apple and the banana.', uk: 'Візьми апельсин. Він між яблуком і бананом.', ru: 'Возьми апельсин. Он между яблоком и бананом.', target: ['orange'], take: 'orange' },
    { en: 'Find two apples and take them.', uk: 'Знайди два яблука й візьми їх.', ru: 'Найди два яблока и возьми их.', target: ['apple1', 'apple2'], all: true, take: 'apples' },
    { en: 'Bring me something yellow you can eat.', uk: 'Принеси мені щось жовте, що можна з’їсти.', ru: 'Принеси мне что-нибудь жёлтое, что можно съесть.', target: ['banana'], take: 'banana' },
    { en: 'Who is hiding under the table? Find it!', uk: 'Хто сховався під столом? Знайди!', ru: 'Кто спрятался под столом? Найди!', target: ['mouse'] },
  ],
};
