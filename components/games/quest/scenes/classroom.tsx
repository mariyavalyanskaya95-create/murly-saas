// Локація «У школі»: дошка з крейдою, глобус на столі вчителя, пенал з олівцями, рюкзак з лінійкою, стільці, вазон, годинник
import { O, Lg } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

/* eslint-disable react/display-name */
function Scene({ hit, flags: f }: SceneProps) {
  // стілець за партою: видно спинку над стільницею, сидіння і ніжки під нею
  const chair = (cx: number, g: string) => (
    <g>
      <path d={`M${cx - 22} 376 V430 M${cx + 22} 376 V430`} stroke="#6B7A88" strokeWidth="6" strokeLinecap="round" />
      <rect x={cx - 32} y="334" width="64" height="44" rx="12" fill={`url(#${g})`} stroke={O} strokeWidth="2.5" />
      <ellipse cx={cx - 10} cy="344" rx="16" ry="4" fill="#fff" opacity=".35" />
      <rect x={cx - 34} y="424" width="68" height="11" rx="5" fill={`url(#${g})`} stroke={O} strokeWidth="2.2" />
      <path d={`M${cx - 26} 435 V478 M${cx + 26} 435 V478`} stroke="#6B7A88" strokeWidth="6" strokeLinecap="round" />
      <path d={`M${cx - 26} 435 V478 M${cx + 26} 435 V478`} stroke={O} strokeWidth="1" opacity=".4" />
    </g>
  );
  // парта: верхня площина, торець, металеві ніжки
  const desk = (x1: number, x2: number) => (
    <g>
      <path d={`M${x1 + 12} 410 V506 M${x2 - 12} 410 V506`} stroke="#6B7A88" strokeWidth="9" strokeLinecap="round" />
      <path d={`M${x1 + 12} 410 V506 M${x2 - 12} 410 V506`} stroke={O} strokeWidth="1.2" opacity=".35" />
      <ellipse cx={x1 + 12} cy="507" rx="9" ry="3.5" fill={O} opacity=".5" /><ellipse cx={x2 - 12} cy="507" rx="9" ry="3.5" fill={O} opacity=".5" />
      <path d={`M${x1 + 10} 386 H${x2 - 10} L${x2} 398 H${x1} Z`} fill="url(#cl-deskTop)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x={x1} y="398" width={x2 - x1} height="14" rx="4" fill="url(#cl-wood)" stroke={O} strokeWidth="2.5" />
      <path d={`M${x1 + 20} 391 H${x1 + 90}`} stroke="#fff" strokeWidth="3" opacity=".35" strokeLinecap="round" />
    </g>
  );
  const pencil = (len: number, c: string, dark: string) => (
    <g>
      <rect x="0" y="-6" width={len} height="12" rx="2" fill={c} stroke={O} strokeWidth="2" />
      <path d={`M0 -2 H${len}`} stroke={dark} strokeWidth="2" opacity=".6" />
      <path d={`M${len} -6 L${len + 18} 0 L${len} 6 Z`} fill="#F6D7B0" stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <path d={`M${len + 12} -2 L${len + 18} 0 L${len + 12} 2 Z`} fill={O} />
      <rect x="-10" y="-6" width="10" height="12" rx="3" fill="#F5A0C0" stroke={O} strokeWidth="2" />
    </g>
  );

  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="Classroom">
      <defs>
        <Lg id="cl-wall" a="#FDF5E4" b="#F4E2C2" />
        <Lg id="cl-panel" a="#C6DDEB" b="#9DBFD5" />
        <Lg id="cl-floor" a="#E3B57E" b="#BF8550" />
        <Lg id="cl-rug" a="#9BCB8F" b="#6FA866" />
        <Lg id="cl-board" a="#4F8C6E" b="#2E5C47" />
        <Lg id="cl-wood" a="#C98A4B" b="#8E5A2C" />
        <Lg id="cl-deskTop" a="#F0C995" b="#D9A066" />
        <Lg id="cl-sky" a="#A9DAF2" b="#E6F5FB" />
        <Lg id="cl-curtain" a="#FFC7A1" b="#F09C6E" />
        <Lg id="cl-blue" a="#8EC9F2" b="#3F7FC2" />
        <Lg id="cl-red" a="#FF8A6E" b="#D2483A" />
        <Lg id="cl-yellow" a="#FFE680" b="#F0B02F" />
        <Lg id="cl-green" a="#A6DA8C" b="#5BA552" />
        <Lg id="cl-purple" a="#C3AEEB" b="#8566C2" />
        <Lg id="cl-bag" a="#FFA26B" b="#DA5B33" />
        <Lg id="cl-pot" a="#F0956A" b="#C25A36" />
        <Lg id="cl-fur" a="#FFFFFF" b="#EDE5D8" />
        <radialGradient id="cl-globe" cx=".38" cy=".32" r=".75"><stop offset="0" stopColor="#B4E1F8" /><stop offset="1" stopColor="#3C82C0" /></radialGradient>
        <radialGradient id="cl-apple" cx=".35" cy=".3" r=".75"><stop offset="0" stopColor="#FF8A78" /><stop offset="1" stopColor="#C8302A" /></radialGradient>
        <radialGradient id="cl-ball" cx=".35" cy=".3" r=".75"><stop offset="0" stopColor="#FFB0C8" /><stop offset="1" stopColor="#E0507E" /></radialGradient>
        <radialGradient id="cl-sun" cx=".15" cy=".2" r=".9"><stop offset="0" stopColor="#FFF8E0" stopOpacity=".9" /><stop offset="1" stopColor="#FFF8E0" stopOpacity="0" /></radialGradient>
      </defs>

      {/* стіна, панель, підлога, килим */}
      <rect width="1000" height="600" fill="url(#cl-wall)" />
      <rect width="1000" height="430" fill="url(#cl-sun)" />
      <rect y="326" width="1000" height="104" fill="url(#cl-panel)" />
      <rect y="318" width="1000" height="12" rx="3" fill="#EAF3F8" stroke={O} strokeWidth="2" />
      <path d="M0 430 H1000 V600 H0 Z" fill="url(#cl-floor)" stroke={O} strokeWidth="2.5" />
      {[-700, -480, -260, -40, 180, 400, 620, 840, 1060, 1280, 1500].map((x, i) => <path key={i} d={`M${500 + (x - 500) * .55} 432 L${x} 600`} stroke="#9A6634" strokeWidth="1.6" opacity=".45" />)}
      <path d="M0 490 H1000 M0 560 H1000" stroke="#9A6634" strokeWidth="1.2" opacity=".25" />
      <rect y="424" width="1000" height="10" fill="#F7F1E6" stroke={O} strokeWidth="2" />
      <ellipse cx="500" cy="510" rx="300" ry="52" fill="url(#cl-rug)" stroke={O} strokeWidth="2.5" />
      <ellipse cx="500" cy="510" rx="270" ry="40" fill="none" stroke="#F4F0D8" strokeWidth="3" strokeDasharray="10 8" opacity=".8" />

      {/* вікно з фіранками */}
      <g>
        <rect x="34" y="76" width="152" height="210" rx="8" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        <rect x="46" y="88" width="128" height="186" rx="4" fill="url(#cl-sky)" stroke={O} strokeWidth="2" />
        <circle cx="146" cy="116" r="15" fill="#FFE07A" />
        <path d="M60 150 c 4 -12, 20 -14, 26 -6 c 6 -8, 20 -4, 18 6 c 8 2, 6 12, -2 12 h-36 c -8 0, -10 -10, -6 -12 Z" fill="#fff" opacity=".9" />
        <path d="M46 274 C 70 236, 110 232, 174 248 V274 Z" fill="#9CCB86" />
        <path d="M128 274 V226" stroke="#8E5A2C" strokeWidth="6" />
        <circle cx="128" cy="214" r="22" fill="#6FB466" stroke={O} strokeWidth="1.5" opacity=".95" />
        <path d="M110 88 V274 M46 180 H174" stroke="#FFFDF8" strokeWidth="7" />
        <path d="M110 88 V274 M46 180 H174" stroke={O} strokeWidth="1.2" opacity=".35" />
        <path d="M54 100 L84 96 M54 112 L72 110" stroke="#fff" strokeWidth="4" opacity=".6" strokeLinecap="round" />
        <rect x="24" y="284" width="172" height="14" rx="4" fill="#FFFDF8" stroke={O} strokeWidth="2.2" />
        <rect x="20" y="62" width="180" height="10" rx="5" fill="url(#cl-wood)" stroke={O} strokeWidth="2" />
        <path d="M24 70 C 30 140, 22 210, 40 262 C 52 248, 58 250, 66 260 C 56 200, 64 130, 60 70 Z" fill="url(#cl-curtain)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M196 70 C 190 140, 198 210, 180 262 C 168 248, 162 250, 154 260 C 164 200, 156 130, 160 70 Z" fill="url(#cl-curtain)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M38 90 C 40 150, 38 200, 44 240 M182 90 C 180 150, 182 200, 176 240" stroke="#fff" strokeWidth="3" opacity=".4" fill="none" strokeLinecap="round" />
      </g>

      {/* годинник над дошкою */}
      <g {...hit('clock')}>
        <rect x="446" y="4" width="68" height="68" fill="transparent" />
        <circle cx="480" cy="38" r="31" fill="url(#cl-red)" stroke={O} strokeWidth="2.5" />
        <circle cx="480" cy="38" r="23" fill="#FFFDF8" stroke={O} strokeWidth="2" />
        {[0, 1, 2, 3].map((k) => <circle key={k} cx={480 + 17 * Math.cos(k * Math.PI / 2)} cy={38 + 17 * Math.sin(k * Math.PI / 2)} r="2.2" fill={O} />)}
        <path d="M480 38 V24 M480 38 L491 44" stroke={O} strokeWidth="3" strokeLinecap="round" />
        <circle cx="480" cy="38" r="2.5" fill={O} />
        <ellipse cx="468" cy="22" rx="9" ry="4" fill="#fff" opacity=".45" transform="rotate(-25 468 22)" />
      </g>

      {/* дошка */}
      <g {...hit('board')}>
        <rect x="256" y="80" width="448" height="206" rx="12" fill="url(#cl-wood)" stroke={O} strokeWidth="2.5" />
        <rect x="270" y="94" width="420" height="178" rx="6" fill="url(#cl-board)" stroke={O} strokeWidth="2" />
        <path d="M300 250 L420 104 M330 260 L470 100" stroke="#fff" strokeWidth="18" opacity=".05" />
        <path d="M560 240 c 30 -6, 60 -4, 100 2 M300 238 c 20 -4, 40 -2, 60 2" stroke="#fff" strokeWidth="5" opacity=".1" fill="none" strokeLinecap="round" />
        <text x="300" y="136" fontSize="30" fill="#F4F4EC" opacity=".85" fontFamily="'Comic Sans MS', 'Chalkboard SE', cursive">A b c</text>
        <text x="604" y="136" fontSize="30" fill="#FFE680" opacity=".85" fontFamily="'Comic Sans MS', 'Chalkboard SE', cursive">1 2 3</text>
        <g stroke="#FFE680" strokeWidth="3" fill="none" opacity=".75" strokeLinecap="round">
          <circle cx="644" cy="220" r="14" />
          <path d="M644 194 V198 M644 242 V246 M618 220 H622 M666 220 H670 M626 202 l3 3 M659 235 l3 3 M662 202 l-3 3 M629 235 l-3 3" />
        </g>
        {f.has('hello') && <text x="470" y="210" textAnchor="middle" fontSize="64" fill="#FFFFFF" fontFamily="'Comic Sans MS', 'Chalkboard SE', cursive">Hello!</text>}
      </g>
      <rect x="252" y="284" width="456" height="14" rx="5" fill="url(#cl-wood)" stroke={O} strokeWidth="2.2" />
      {/* крейда і губка на поличці */}
      <g {...hit('whiteChalk')}>
        <rect x="290" y="236" width="58" height="64" fill="transparent" />
        <rect x="296" y="272" width="44" height="13" rx="6" fill="#FFFFFF" stroke={O} strokeWidth="2" />
        <path d="M302 276 H322" stroke="#D8D4CC" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g {...hit('yellowChalk')}>
        <rect x="356" y="236" width="58" height="64" fill="transparent" />
        <rect x="362" y="272" width="44" height="13" rx="6" fill="url(#cl-yellow)" stroke={O} strokeWidth="2" />
        <path d="M368 276 H388" stroke="#fff" strokeWidth="2.5" opacity=".5" strokeLinecap="round" />
      </g>
      <g {...hit('sponge')}>
        <rect x="600" y="236" width="76" height="64" fill="transparent" />
        <rect x="608" y="258" width="60" height="18" rx="5" fill="url(#cl-blue)" stroke={O} strokeWidth="2" />
        <rect x="608" y="272" width="60" height="12" rx="4" fill="#5A4A3E" stroke={O} strokeWidth="2" />
        <ellipse cx="626" cy="263" rx="12" ry="3" fill="#fff" opacity=".35" />
      </g>

      {/* плакат з фігурами */}
      <g>
        <path d="M790 62 H962 L960 206 C 900 212, 850 210, 792 206 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="830" cy="104" r="20" fill="url(#cl-red)" stroke={O} strokeWidth="2" />
        <rect x="880" y="84" width="40" height="40" rx="4" fill="url(#cl-blue)" stroke={O} strokeWidth="2" />
        <path d="M830 144 L852 184 H808 Z" fill="url(#cl-yellow)" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <path d="M900 142 L906 158 L922 158 L909 168 L914 184 L900 174 L886 184 L891 168 L878 158 L894 158 Z" fill="url(#cl-green)" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="796" cy="68" r="5" fill="url(#cl-red)" stroke={O} strokeWidth="1.5" /><circle cx="956" cy="68" r="5" fill="url(#cl-blue)" stroke={O} strokeWidth="1.5" />
      </g>

      {/* вазон біля вікна */}
      <g {...hit('plant')}>
        {(f.has('watered')
          ? [['M222 392 C 196 360, 186 320, 200 286', '#4FA45A'], ['M226 392 C 232 350, 250 320, 262 300', '#5FB866'], ['M224 392 C 214 350, 220 312, 228 270', '#3F9150']]
          : [['M222 392 C 200 370, 188 350, 186 326', '#93AE6E'], ['M226 392 C 240 370, 256 362, 266 352', '#A3B97A'], ['M224 392 C 218 362, 220 340, 226 316', '#86A462']]
        ).map(([d, c], i) => <path key={i} d={d} stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" />)}
        {(f.has('watered')
          ? [[196, 318, -30], [254, 318, 35], [226, 296, 0], [208, 352, -50], [246, 352, 50]]
          : [[190, 346, -70], [258, 360, 80], [222, 334, -10]]
        ).map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx="16" ry="8" fill={f.has('watered') ? 'url(#cl-green)' : '#B7C58F'} stroke={O} strokeWidth="2" transform={`rotate(${r} ${x} ${y})`} />)}
        {f.has('watered') && <g><circle cx="228" cy="266" r="12" fill="#F28C9B" stroke={O} strokeWidth="2" /><circle cx="228" cy="266" r="5" fill="#FFE07A" /><circle cx="198" cy="284" r="9" fill="#F28C9B" stroke={O} strokeWidth="2" /><circle cx="198" cy="284" r="3.5" fill="#FFE07A" /></g>}
        <path d="M194 390 H256 L248 448 C 240 454, 210 454, 202 448 Z" fill="url(#cl-pot)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="188" y="384" width="74" height="14" rx="5" fill="url(#cl-pot)" stroke={O} strokeWidth="2.2" />
        <path d="M206 404 C 208 420, 210 432, 214 442" stroke="#fff" strokeWidth="4" opacity=".3" fill="none" strokeLinecap="round" />
      </g>

      {/* стільці за партами */}
      <g {...hit('chair1')}>{chair(330, 'cl-blue')}</g>
      <g {...hit('chair2')}>{chair(450, 'cl-red')}</g>
      <g {...hit('chair3')}>{chair(570, 'cl-yellow')}</g>
      <g {...hit('chair4')}>{chair(670, 'cl-green')}</g>

      {/* м’ячик під партою */}
      <g {...hit('ball')}>
        <rect x="594" y="448" width="52" height="56" fill="transparent" />
        <ellipse cx="620" cy="500" rx="20" ry="4" fill={O} opacity=".18" />
        <circle cx="620" cy="478" r="21" fill="url(#cl-ball)" stroke={O} strokeWidth="2.5" />
        <path d="M600 474 C 612 482, 628 482, 640 474 M620 457 C 612 470, 612 486, 620 499" stroke="#fff" strokeWidth="3" fill="none" opacity=".8" />
        <ellipse cx="611" cy="466" rx="6" ry="3.5" fill="#fff" opacity=".45" />
      </g>

      {/* парти */}
      {desk(280, 500)}
      {desk(520, 720)}
      {/* зошит і гумка на другій парті */}
      <path d="M548 394 L556 382 H604 L600 394 Z" fill="#FFFDF8" stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <path d="M600 394 L604 382 H650 L648 394 Z" fill="#F2F7FB" stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <path d="M562 388 H596 M608 388 H642" stroke="#8EC9F2" strokeWidth="1.5" />
      <rect x="672" y="382" width="22" height="12" rx="3" fill="#F5A0C0" stroke={O} strokeWidth="1.8" />

      {/* фіолетовий пенал: олівці виглядають з відкритої блискавки */}
      {f.has('case') && <g {...hit('redPencil')}>
        <rect x="330" y="300" width="56" height="62" fill="transparent" />
        <g transform="translate(378 380) rotate(-112)">{pencil(56, '#E2483A', '#A82A20')}</g>
      </g>}
      {f.has('case') && <g {...hit('bluePencil')}>
        <rect x="396" y="300" width="56" height="62" fill="transparent" />
        <g transform="translate(408 380) rotate(-68)">{pencil(56, '#3F7FC2', '#2A5C94')}</g>
      </g>}
      <g {...hit('pencilCase')}>
        <rect x="344" y="362" width="96" height="32" rx="14" fill="url(#cl-purple)" stroke={O} strokeWidth="2.5" />
        {f.has('case')
          ? <path d="M352 368 C 370 378, 414 378, 432 368" stroke={O} strokeWidth="2" strokeDasharray="3 3" fill="none" />
          : <g><path d="M352 368 H432" stroke={O} strokeWidth="2" strokeDasharray="3 3" /><path d="M428 368 l6 12" stroke="#C9A12E" strokeWidth="4" strokeLinecap="round" /></g>}
        <ellipse cx="370" cy="384" rx="14" ry="3.5" fill="#fff" opacity=".35" />
      </g>

      {/* вчительський стіл */}
      <g>
        <rect x="770" y="358" width="94" height="66" fill="#7A4C26" stroke={O} strokeWidth="2" />
        <rect x="760" y="356" width="18" height="100" rx="3" fill="url(#cl-wood)" stroke={O} strokeWidth="2.5" />
        <rect x="860" y="356" width="104" height="100" rx="4" fill="url(#cl-wood)" stroke={O} strokeWidth="2.5" />
        <rect x="870" y="368" width="84" height="34" rx="4" fill="#B97A3F" stroke={O} strokeWidth="2" />
        <rect x="870" y="410" width="84" height="38" rx="4" fill="#B97A3F" stroke={O} strokeWidth="2" />
        <rect x="900" y="381" width="24" height="7" rx="3.5" fill="url(#cl-yellow)" stroke={O} strokeWidth="1.5" />
        <rect x="900" y="425" width="24" height="7" rx="3.5" fill="url(#cl-yellow)" stroke={O} strokeWidth="1.5" />
        <path d="M758 334 H966 L976 346 H748 Z" fill="url(#cl-deskTop)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="746" y="346" width="232" height="14" rx="4" fill="url(#cl-wood)" stroke={O} strokeWidth="2.5" />
        <path d="M770 340 H850" stroke="#fff" strokeWidth="3" opacity=".35" strokeLinecap="round" />
      </g>
      {/* глобус на столі */}
      <g {...hit('globe')}>
        <path d="M776 338 C 778 326, 822 326, 824 338 Z" fill="url(#cl-wood)" stroke={O} strokeWidth="2" />
        <path d="M800 328 V312" stroke={O} strokeWidth="6" strokeLinecap="round" />
        <circle cx="800" cy="270" r="40" fill="url(#cl-globe)" stroke={O} strokeWidth="2.5" />
        <path d="M776 252 C 784 240, 802 242, 806 254 C 802 264, 794 262, 790 270 C 784 272, 776 264, 776 252 Z M808 276 C 818 268, 830 276, 826 290 C 820 300, 808 296, 806 288 Z M782 290 c 6 -2, 10 2, 8 8 c -6 2, -9 -2, -8 -8 Z" fill="#7CC27B" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M762 278 C 766 316, 830 324, 842 290" fill="none" stroke="#C9A12E" strokeWidth="5" strokeLinecap="round" />
        <path d="M800 230 V226" stroke="#C9A12E" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="786" cy="250" rx="12" ry="7" fill="#fff" opacity=".35" transform="rotate(-30 786 250)" />
      </g>
      {/* яблуко і книжки */}
      <g {...hit('apple')}>
        <rect x="846" y="290" width="56" height="50" fill="transparent" />
        <path d="M874 300 C 862 292, 850 300, 852 316 C 854 332, 866 338, 874 334 C 882 338, 894 332, 896 316 C 898 300, 886 292, 874 300 Z" fill="url(#cl-apple)" stroke={O} strokeWidth="2.5" />
        <path d="M874 300 C 874 294, 876 290, 879 287" stroke="#6B4423" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M878 294 C 886 286, 894 288, 896 292 C 890 298, 882 298, 878 294 Z" fill="#6FB466" stroke={O} strokeWidth="1.5" />
        <ellipse cx="862" cy="308" rx="4" ry="7" fill="#fff" opacity=".4" />
      </g>
      <g {...hit('books')}>
        <rect x="910" y="318" width="58" height="16" rx="3" fill="url(#cl-green)" stroke={O} strokeWidth="2" />
        <rect x="914" y="302" width="52" height="16" rx="3" fill="url(#cl-blue)" stroke={O} strokeWidth="2" />
        <rect x="908" y="286" width="56" height="16" rx="3" fill="url(#cl-yellow)" stroke={O} strokeWidth="2" />
        <path d="M954 286 V302 M956 302 V318 M958 318 V334" stroke="#fff" strokeWidth="3" opacity=".5" />
      </g>

      {/* рюкзак з лінійкою */}
      <g {...hit('ruler')}>
        <rect x="100" y="368" width="64" height="88" fill="transparent" />
        <g transform="rotate(12 132 490)">
          <rect x="120" y="374" width="26" height="120" rx="3" fill="url(#cl-yellow)" stroke={O} strokeWidth="2.2" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <path key={i} d={`M120 ${384 + i * 10} h${i % 2 ? 7 : 12}`} stroke={O} strokeWidth="1.6" />)}
          <path d="M140 380 V440" stroke="#fff" strokeWidth="3" opacity=".45" strokeLinecap="round" />
        </g>
      </g>
      <g {...hit('backpack')}>
        <path d="M46 560 C 30 540, 30 500, 44 486" stroke={O} strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M46 560 C 30 540, 30 500, 44 486" stroke="#B9472A" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M86 462 C 86 440, 140 440, 140 462" stroke={O} strokeWidth="7" fill="none" />
        <path d="M86 462 C 86 440, 140 440, 140 462" stroke="#B9472A" strokeWidth="3.5" fill="none" />
        <path d="M50 570 V500 C 50 466, 76 456, 112 456 C 148 456, 174 466, 174 500 V570 C 174 580, 50 580, 50 570 Z" fill="url(#cl-bag)" stroke={O} strokeWidth="2.5" />
        <path d="M54 494 C 70 474, 154 474, 170 494" stroke={O} strokeWidth="2" fill="none" strokeDasharray="4 4" />
        <rect x="72" y="512" width="80" height="50" rx="12" fill="#E8693C" stroke={O} strokeWidth="2.2" />
        <path d="M72 528 H152" stroke={O} strokeWidth="2" />
        <rect x="104" y="522" width="16" height="12" rx="3" fill="url(#cl-yellow)" stroke={O} strokeWidth="1.6" />
        <ellipse cx="80" cy="480" rx="16" ry="6" fill="#fff" opacity=".3" transform="rotate(-20 80 480)" />
      </g>

      {/* котик-учень в окулярах і з метеликом */}
      <g transform="translate(870 492)">
        <ellipse cx="4" cy="86" rx="52" ry="8" fill={O} opacity=".15" />
        <path d="M28 70 C 66 76, 74 36, 56 22" stroke={O} strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M28 70 C 66 76, 74 36, 56 22" stroke="#FFFDF8" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M-30 28 C -46 88, 46 88, 30 28 Z" fill="url(#cl-fur)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="-14" cy="82" rx="11" ry="6" fill="#FFFDF8" stroke={O} strokeWidth="2" /><ellipse cx="14" cy="82" rx="11" ry="6" fill="#FFFDF8" stroke={O} strokeWidth="2" />
        <path d="M-34 -18 L-28 -50 L-8 -30 Z M34 -18 L28 -50 L8 -30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-28 -44 L-24 -34 M28 -44 L24 -34" stroke="#F5A0C0" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="0" cy="2" rx="40" ry="33" fill="url(#cl-fur)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="-14" cy="-3" rx="5" ry="6" fill={O} /><ellipse cx="14" cy="-3" rx="5" ry="6" fill={O} />
        <circle cx="-12" cy="-5" r="1.8" fill="#fff" /><circle cx="16" cy="-5" r="1.8" fill="#fff" />
        <circle cx="-14" cy="-3" r="12" fill="#CFE8F7" fillOpacity=".25" stroke={O} strokeWidth="2.2" />
        <circle cx="14" cy="-3" r="12" fill="#CFE8F7" fillOpacity=".25" stroke={O} strokeWidth="2.2" />
        <path d="M-2 -5 Q0 -8 2 -5 M-26 -5 L-38 -9 M26 -5 L38 -9" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M-3 9 L3 9 L0 12 Z" fill="#F08AA8" />
        <path d="M0 12 q-6 7 -11 3 M0 12 q6 7 11 3" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="-27" cy="13" rx="6" ry="3.5" fill="#F5A0C0" opacity=".6" /><ellipse cx="27" cy="13" rx="6" ry="3.5" fill="#F5A0C0" opacity=".6" />
        <path d="M-40 10 L-58 6 M-40 15 L-58 18 M40 10 L58 6 M40 15 L58 18" stroke={O} strokeWidth="1.8" />
        <path d="M0 38 L-16 30 L-16 46 Z M0 38 L16 30 L16 46 Z" fill="url(#cl-red)" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="0" cy="38" r="4.5" fill="#C8302A" stroke={O} strokeWidth="1.8" />
      </g>
    </svg>
  );
}

export const CLASSROOM: QuestLocation = {
  id: 'classroom', level: 'A1-A2', Scene,
  title: { uk: 'У школі', ru: 'В школе', en: 'At school' },
  place: { uk: 'Клас', ru: 'Класс', en: 'Classroom' },
  finale: 'Thank you! You are a super student!',
  topics: [
    { uk: 'Прийменники місця: in, on, under, above, next to', ru: 'Предлоги места: in, on, under, above, next to', en: 'Prepositions of place: in, on, under, above, next to' },
    { uk: 'Лексика: школа, шкільне приладдя (board, chalk, globe, pencil case, pencil, ruler, backpack, chair, clock)', ru: 'Лексика: школа, школьные принадлежности (board, chalk, globe, pencil case, pencil, ruler, backpack, chair, clock)', en: 'Vocabulary: school and school things (board, chalk, globe, pencil case, pencil, ruler, backpack, chair, clock)' },
    { uk: 'Кольори і числа 1–4', ru: 'Цвета и числа 1–4', en: 'Colours and numbers 1–4' },
    { uk: 'Дієслова-команди: find, take, open, count, water', ru: 'Глаголы-команды: find, take, open, count, water', en: 'Command verbs: find, take, open, count, water' },
  ],
  tasks: [
    { en: 'Welcome to school! Take the white chalk.', uk: 'Ласкаво просимо до школи! Візьми білу крейду.', ru: 'Добро пожаловать в школу! Возьми белый мел.', target: ['whiteChalk'], take: 'chalk', set: 'hello' },
    { en: 'What time is it? Find the clock above the board.', uk: 'Котра година? Знайди годинник над дошкою.', ru: 'Который час? Найди часы над доской.', target: ['clock'] },
    { en: 'Find the globe on the teacher’s desk.', uk: 'Знайди глобус на столі вчителя.', ru: 'Найди глобус на столе учителя.', target: ['globe'] },
    { en: 'It is red and round. You can eat it. Take it!', uk: 'Воно червоне й кругле. Його можна з’їсти. Візьми його!', ru: 'Оно красное и круглое. Его можно съесть. Возьми его!', target: ['apple'], take: 'apple' },
    { en: 'Open the purple pencil case.', uk: 'Відкрий фіолетовий пенал.', ru: 'Открой фиолетовый пенал.', target: ['pencilCase'], set: 'case' },
    { en: 'Take the blue pencil.', uk: 'Візьми синій олівець.', ru: 'Возьми синий карандаш.', target: ['bluePencil'], take: 'pencil' },
    { en: 'The ruler is in the backpack. Take the ruler.', uk: 'Лінійка в рюкзаку. Візьми лінійку.', ru: 'Линейка в рюкзаке. Возьми линейку.', target: ['ruler'], take: 'ruler' },
    { en: 'The ball is under the desk. Take the ball.', uk: 'М’ячик під партою. Візьми м’ячик.', ru: 'Мячик под партой. Возьми мячик.', target: ['ball'], take: 'ball' },
    { en: 'Count the chairs. Find four chairs.', uk: 'Порахуй стільці. Знайди чотири стільці.', ru: 'Посчитай стулья. Найди четыре стула.', target: ['chair1', 'chair2', 'chair3', 'chair4'], all: true },
    { en: 'The plant next to the window is thirsty. Water it.', uk: 'Рослина біля вікна хоче пити. Полий її.', ru: 'Растение у окна хочет пить. Полей его.', target: ['plant'], set: 'watered' },
  ],
};
