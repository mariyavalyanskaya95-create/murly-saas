// Локація «Вітальня»: диван з подушками, пульт під подушкою, телевізор, собака за кріслом, акваріум, ваза на столику, фото на стіні, кошик з іграшками
import { O, Lg } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

/* eslint-disable react/display-name */
function Scene({ hit, flags: f }: SceneProps) {
  const tv = f.has('tv');
  const moved = f.has('cushion');

  // подушка, що стоїть на дивані
  const cushion = (cx: number, cy: number, g: string, line: string, rot = 0) => (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      <path d="M-40 -34 C -20 -28, 20 -28, 40 -34 C 34 -12, 34 12, 40 34 C 20 28, -20 28, -40 34 C -34 12, -34 -12, -40 -34 Z" fill={`url(#${g})`} stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M-26 -18 C -10 -14, 10 -14, 26 -18 M-26 18 C -10 14, 10 14, 26 18" stroke={line} strokeWidth="3" fill="none" opacity=".6" strokeLinecap="round" />
      <circle cx="0" cy="0" r="4" fill={line} stroke={O} strokeWidth="1.5" />
      <ellipse cx="-16" cy="-14" rx="12" ry="6" fill="#fff" opacity=".3" />
    </g>
  );
  // рибка в акваріумі
  const fish = (x: number, y: number, g: string, fin: string, flip = false) => (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M14 0 C 20 -4, 26 -10, 30 -12 C 28 -4, 28 4, 30 12 C 26 10, 20 4, 14 0 Z" fill={fin} stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="0" cy="0" rx="18" ry="12" fill={`url(#${g})`} stroke={O} strokeWidth="2" />
      <path d="M-2 -11 C 2 -18, 8 -16, 10 -10" fill={fin} stroke={O} strokeWidth="1.8" />
      <ellipse cx="-4" cy="-5" rx="8" ry="3" fill="#fff" opacity=".35" />
      <circle cx="-9" cy="-2" r="3.6" fill="#fff" stroke={O} strokeWidth="1.2" /><circle cx="-9.5" cy="-2" r="1.8" fill={O} />
    </g>
  );

  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="The living room">
      <defs>
        <Lg id="lv-wall" a="#FBEFD6" b="#F1DDB6" />
        <Lg id="lv-floor" a="#C99A68" b="#9E6E40" />
        <Lg id="lv-wood" a="#C98A4B" b="#8E5A2C" />
        <Lg id="lv-woodL" a="#E3B783" b="#B98550" />
        <Lg id="lv-sofa" a="#F0957A" b="#C65A40" />
        <Lg id="lv-sofaD" a="#D97559" b="#A9452E" />
        <Lg id="lv-blue" a="#8EC9F2" b="#3F7FC2" />
        <Lg id="lv-green" a="#A6DE8F" b="#4F9A4A" />
        <Lg id="lv-yellow" a="#FFE680" b="#F0B02F" />
        <Lg id="lv-red" a="#FF8A6E" b="#D2483A" />
        <Lg id="lv-orange" a="#FFC27A" b="#EA7A2E" />
        <Lg id="lv-water" a="#BFE9F2" b="#5FB0C9" />
        <Lg id="lv-sky" a="#9FD6F2" b="#E3F4FB" />
        <Lg id="lv-screen" a={tv ? '#9FD6F2' : '#3A4150'} b={tv ? '#E3F4FB' : '#1E232C'} />
        <Lg id="lv-rug" a="#9FCFC0" b="#6EA997" />
        <Lg id="lv-curtain" a="#9FD3A8" b="#5E9F6B" />
        <Lg id="lv-dog" a="#F2D3A6" b="#D9A86A" />
        <Lg id="lv-basket" a="#E9C27F" b="#B98A44" />
        <Lg id="lv-vase" a="#8FD0E6" b="#3E8FB0" />
        <Lg id="lv-scarf" a="#FF8A8A" b="#D9434F" />
        <radialGradient id="lv-ball" cx=".38" cy=".32" r=".75"><stop offset="0" stopColor="#FFB0C8" /><stop offset=".6" stopColor="#F26C95" /><stop offset="1" stopColor="#C8406A" /></radialGradient>
        <radialGradient id="lv-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#E3F4FB" stopOpacity=".8" /><stop offset="1" stopColor="#E3F4FB" stopOpacity="0" /></radialGradient>
      </defs>

      {/* стіна, плінтус, підлога */}
      <rect width="1000" height="430" fill="url(#lv-wall)" />
      {Array.from({ length: 11 }, (_, i) => <g key={i} transform={`translate(${i * 96 + 30} 0)`}>{[60, 160, 260, 360].map((y, k) => <circle key={k} cx={k % 2 ? 48 : 0} cy={y} r="5" fill="#E9C98F" opacity=".55" />)}</g>)}
      <rect x="-5" y="412" width="1010" height="18" fill="#FFFBF2" stroke={O} strokeWidth="2.5" />
      <path d="M0 430 H1000 V600 H0 Z" fill="url(#lv-floor)" stroke={O} strokeWidth="2.5" />
      {Array.from({ length: 13 }, (_, i) => { const x = -100 + i * 100; return <path key={i} d={`M${500 + (x - 500) * .62} 430 L${x} 600`} stroke="#7E5530" strokeWidth="2" opacity=".4" />; })}
      {[[150, 470], [420, 585], [700, 470], [880, 580], [260, 540]].map(([x, y], i) => <path key={i} d={`M${x} ${y} h34`} stroke="#7E5530" strokeWidth="2" opacity=".35" />)}

      {/* вікно над акваріумом */}
      <rect x="44" y="40" width="140" height="128" rx="8" fill="url(#lv-sky)" stroke={O} strokeWidth="3" />
      <circle cx="150" cy="78" r="16" fill="#FFD866" stroke={O} strokeWidth="2" />
      <path d="M44 140 C 70 120, 100 126, 120 140 C 140 128, 170 126, 184 136 V168 H44 Z" fill="#8CCB7E" stroke={O} strokeWidth="2" />
      <path d="M114 40 V168 M44 104 H184" stroke={O} strokeWidth="3" />
      <path d="M56 52 L84 52 L56 84 Z" fill="#fff" opacity=".35" />
      <rect x="34" y="166" width="160" height="12" rx="5" fill="#FFFBF2" stroke={O} strokeWidth="2.5" />
      <path d="M30 30 H70 C 64 80, 66 130, 74 178 H30 Z" fill="url(#lv-curtain)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M198 30 H158 C 164 80, 162 130, 154 178 H198 Z" fill="url(#lv-curtain)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M44 36 V172 M184 36 V172" stroke="#fff" strokeWidth="4" opacity=".3" strokeLinecap="round" />
      <rect x="22" y="24" width="184" height="9" rx="4" fill="url(#lv-wood)" stroke={O} strokeWidth="2" />

      {/* акваріум на тумбі */}
      <rect x="28" y="338" width="166" height="124" rx="8" fill="url(#lv-woodL)" stroke={O} strokeWidth="2.5" />
      <rect x="22" y="330" width="178" height="14" rx="5" fill="url(#lv-wood)" stroke={O} strokeWidth="2.5" />
      <path d="M111 344 V462" stroke={O} strokeWidth="2" />
      <circle cx="100" cy="402" r="5" fill="url(#lv-yellow)" stroke={O} strokeWidth="1.5" /><circle cx="122" cy="402" r="5" fill="url(#lv-yellow)" stroke={O} strokeWidth="1.5" />
      <path d="M34 462 v8 M188 462 v8" stroke={O} strokeWidth="5" strokeLinecap="round" />
      <rect x="32" y="200" width="158" height="130" rx="6" fill="url(#lv-water)" stroke={O} strokeWidth="2.5" />
      <path d="M34 214 H188" stroke="#fff" strokeWidth="2" opacity=".7" />
      <path d="M34 316 C 60 306, 90 312, 120 306 C 150 300, 170 310, 188 304 V328 H34 Z" fill="#E7C98F" stroke={O} strokeWidth="2" />
      {[[50, 320], [72, 314], [140, 312], [168, 318], [100, 320]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill={['#F28C9B', '#8EC9F2', '#FFD866', '#A6DE8F', '#fff'][i]} stroke={O} strokeWidth="1" />)}
      <path d="M58 312 C 50 290, 64 270, 54 244 M66 310 C 72 290, 62 276, 70 256 M160 306 C 168 284, 156 268, 166 240" stroke="#4F9A5B" strokeWidth="7" fill="none" strokeLinecap="round" />
      {[[120, 236, 4], [126, 222, 3], [118, 252, 5]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#fff" fillOpacity=".3" stroke="#fff" strokeWidth="1.2" />)}
      <g transform="translate(184 296)"><path d="M0 0 C -14 -2, -18 -18, -6 -22 C 4 -24, 8 -12, 0 -10" fill="#F6C26B" stroke={O} strokeWidth="1.8" /><path d="M-2 -2 C -10 2, -20 4, -26 0" stroke={O} strokeWidth="1.8" fill="#D9C9A8" /></g>
      <g {...hit('fish1')}><rect x="62" y="226" width="54" height="40" fill="transparent" />{fish(88, 246, 'lv-orange', '#E36F3C')}</g>
      <g {...hit('fish2')}><rect x="118" y="260" width="54" height="40" fill="transparent" />{fish(144, 280, 'lv-blue', '#3C76B8', true)}</g>
      <g {...hit('fish3')}><rect x="70" y="274" width="50" height="36" fill="transparent" />{fish(94, 290, 'lv-yellow', '#E9A41F', true)}</g>
      <rect x="40" y="206" width="10" height="114" rx="5" fill="#fff" opacity=".35" />
      <rect x="26" y="194" width="170" height="10" rx="4" fill="#4E6B78" stroke={O} strokeWidth="2" />

      {/* фото родини і картина */}
      <g {...hit('photo')}>
        <rect x="474" y="78" width="148" height="122" rx="6" fill="url(#lv-wood)" stroke={O} strokeWidth="2.5" />
        <rect x="488" y="92" width="120" height="94" rx="3" fill="#CFEAF6" stroke={O} strokeWidth="2" />
        <path d="M488 160 C 520 150, 570 150, 608 160 V186 H488 Z" fill="#9BD08A" />
        {[[518, 150, 20, '#FFFDF8'], [578, 148, 22, '#F6C26B'], [548, 164, 14, '#FFFDF8']].map(([x, y, r, c], i) => <g key={i}>
          <path d={`M${+x - +r * .8} ${+y - +r * .5} L${+x - +r * .6} ${+y - +r * 1.25} L${+x - +r * .15} ${+y - +r * .85} Z M${+x + +r * .8} ${+y - +r * .5} L${+x + +r * .6} ${+y - +r * 1.25} L${+x + +r * .15} ${+y - +r * .85} Z`} fill={c as string} stroke={O} strokeWidth="1.5" strokeLinejoin="round" />
          <ellipse cx={x} cy={y} rx={r} ry={+r * .82} fill={c as string} stroke={O} strokeWidth="1.5" />
          <circle cx={+x - +r * .35} cy={+y - 2} r="2" fill={O} /><circle cx={+x + +r * .35} cy={+y - 2} r="2" fill={O} />
          <path d={`M${+x - 3} ${+y + 4} q3 3 6 0`} stroke={O} strokeWidth="1.3" fill="none" />
        </g>)}
        <path d="M496 100 L520 100 L496 124 Z" fill="#fff" opacity=".35" />
      </g>
      <g {...hit('picture')}>
        <rect x="652" y="98" width="92" height="76" rx="5" fill="url(#lv-yellow)" stroke={O} strokeWidth="2.5" />
        <rect x="662" y="108" width="72" height="56" rx="2" fill="#E3F4FB" stroke={O} strokeWidth="1.8" />
        <path d="M662 164 L686 126 L702 146 L714 132 L734 164 Z" fill="#8A9BB0" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M680 136 L686 126 L692 136 Z" fill="#fff" />
        <circle cx="718" cy="120" r="6" fill="#FFD866" />
      </g>

      {/* собака за кріслом */}
      <g {...hit('dog')}>
        <path d="M222 300 C 214 288, 214 276, 222 268" stroke="#C48B4A" strokeWidth="10" fill="none" strokeLinecap="round" />
        <ellipse cx="292" cy="254" rx="40" ry="34" fill="url(#lv-dog)" stroke={O} strokeWidth="2.5" />
        <path d="M256 232 C 236 238, 236 276, 250 284 C 260 280, 262 256, 262 240 Z M328 232 C 348 238, 348 276, 334 284 C 324 280, 322 256, 322 240 Z" fill="#B57B43" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <ellipse cx="306" cy="242" rx="12" ry="10" fill="#C48B4A" opacity=".55" />
        <ellipse cx="292" cy="268" rx="18" ry="13" fill="#FFF5E6" stroke={O} strokeWidth="1.8" />
        <ellipse cx="292" cy="261" rx="7" ry="5" fill={O} />
        <path d="M292 266 V272 M284 274 q8 6 16 0" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="278" cy="246" r="5" fill={O} /><circle cx="306" cy="246" r="5" fill={O} />
        <circle cx="276.5" cy="244" r="1.8" fill="#fff" /><circle cx="304.5" cy="244" r="1.8" fill="#fff" />
        <ellipse cx="270" cy="262" rx="6" ry="3.5" fill="#F5A0C0" opacity=".7" /><ellipse cx="314" cy="262" rx="6" ry="3.5" fill="#F5A0C0" opacity=".7" />
        <ellipse cx="282" cy="230" rx="12" ry="5" fill="#fff" opacity=".35" />
      </g>

      {/* крісло */}
      <ellipse cx="276" cy="472" rx="92" ry="10" fill="#5E3E24" opacity=".3" />
      <path d="M214 280 C 214 270, 222 266, 236 266 H316 C 330 266, 338 270, 338 280 V380 H214 Z" fill="url(#lv-sofa)" stroke={O} strokeWidth="2.5" />
      <path d="M232 286 C 232 278, 240 276, 248 276 M226 292 V368" stroke="#fff" strokeWidth="5" opacity=".3" fill="none" strokeLinecap="round" />
      {/* лапки собаки на спинці крісла */}
      <g>
        <ellipse cx="270" cy="270" rx="12" ry="8" fill="url(#lv-dog)" stroke={O} strokeWidth="2" /><ellipse cx="314" cy="270" rx="12" ry="8" fill="url(#lv-dog)" stroke={O} strokeWidth="2" />
        <path d="M266 274 v-4 M272 274 v-4 M310 274 v-4 M316 274 v-4" stroke={O} strokeWidth="1.4" />
      </g>
      <rect x="208" y="366" width="136" height="52" rx="14" fill="url(#lv-sofaD)" stroke={O} strokeWidth="2.5" />
      <rect x="196" y="334" width="36" height="116" rx="16" fill="url(#lv-sofa)" stroke={O} strokeWidth="2.5" />
      <rect x="320" y="334" width="36" height="116" rx="16" fill="url(#lv-sofa)" stroke={O} strokeWidth="2.5" />
      <path d="M204 344 V440 M328 344 V440" stroke="#fff" strokeWidth="5" opacity=".3" strokeLinecap="round" />
      <rect x="226" y="414" width="100" height="36" rx="6" fill="url(#lv-sofa)" stroke={O} strokeWidth="2.5" />
      <path d="M206 450 l-4 18 M346 450 l4 18" stroke={O} strokeWidth="6" strokeLinecap="round" />

      {/* диван */}
      <ellipse cx="566" cy="452" rx="210" ry="12" fill="#5E3E24" opacity=".3" />
      <rect x="384" y="244" width="364" height="110" rx="30" fill="url(#lv-sofa)" stroke={O} strokeWidth="2.5" />
      <path d="M406 262 C 500 252, 640 252, 726 262" stroke="#fff" strokeWidth="6" opacity=".3" fill="none" strokeLinecap="round" />
      <path d="M566 252 V340" stroke={O} strokeWidth="2" opacity=".35" />
      {/* червоний м’ячик між синьою і зеленою подушками */}
      <g {...hit('ball')}>
        <rect x="474" y="292" width="54" height="54" fill="transparent" />
        <circle cx="501" cy="322" r="19" fill="url(#lv-ball)" stroke={O} strokeWidth="2.2" />
        <path d="M484 316 C 494 326, 510 326, 518 314" stroke="#fff" strokeWidth="3" fill="none" opacity=".8" />
        <ellipse cx="494" cy="312" rx="6" ry="4" fill="#fff" opacity=".5" />
      </g>
      <g>{cushion(438, 300, 'lv-blue', '#E3F4FB', -6)}</g>
      <g>{cushion(564, 300, 'lv-green', '#E8F7DD', 5)}</g>
      <rect x="384" y="330" width="364" height="56" rx="16" fill="url(#lv-sofaD)" stroke={O} strokeWidth="2.5" />
      <path d="M566 332 V384" stroke={O} strokeWidth="2" opacity=".45" />
      <path d="M400 338 C 460 334, 520 334, 556 338" stroke="#fff" strokeWidth="4" opacity=".25" fill="none" strokeLinecap="round" />
      {/* пульт під жовтою подушкою */}
      {moved
        ? <g {...hit('remote')}>
          <rect x="632" y="300" width="80" height="54" fill="transparent" />
          <rect x="640" y="324" width="66" height="18" rx="7" fill="#3A4150" stroke={O} strokeWidth="2.2" />
          <circle cx="652" cy="333" r="4" fill="#F26C6C" /><circle cx="666" cy="333" r="2.6" fill="#ccc" /><circle cx="676" cy="333" r="2.6" fill="#ccc" /><circle cx="686" cy="333" r="2.6" fill="#ccc" /><circle cx="696" cy="333" r="2.6" fill="#ccc" />
          <path d="M646 328 H700" stroke="#fff" strokeWidth="1.5" opacity=".3" />
        </g>
        : <path d="M620 328 h-6 a6 6 0 0 0 0 12 h6 Z" fill="#3A4150" stroke={O} strokeWidth="2" />}
      <g {...hit('yellowCushion')} style={{ transform: moved ? 'translate(0px, -50px) rotate(-5deg)' : 'none', transformOrigin: '672px 330px', transition: 'transform .7s cubic-bezier(.3,1.4,.5,1)' }}>
        <path d="M624 316 C 650 306, 694 306, 718 316 C 726 324, 726 340, 718 348 C 694 356, 650 356, 624 348 C 616 340, 616 324, 624 316 Z" fill="url(#lv-yellow)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M640 322 C 660 316, 684 316, 702 322" stroke="#fff" strokeWidth="4" opacity=".45" fill="none" strokeLinecap="round" />
        <path d="M624 316 l-8 -6 M718 316 l8 -6 M624 348 l-8 6 M718 348 l8 6" stroke={O} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="671" cy="332" r="4" fill="#F0B02F" stroke={O} strokeWidth="1.5" />
      </g>
      <rect x="366" y="292" width="46" height="126" rx="20" fill="url(#lv-sofa)" stroke={O} strokeWidth="2.5" />
      <rect x="720" y="292" width="46" height="126" rx="20" fill="url(#lv-sofa)" stroke={O} strokeWidth="2.5" />
      <path d="M376 306 V406 M730 306 V406" stroke="#fff" strokeWidth="5" opacity=".3" strokeLinecap="round" />
      <rect x="400" y="384" width="332" height="34" rx="8" fill="url(#lv-sofa)" stroke={O} strokeWidth="2.5" />
      <path d="M392 418 l-4 22 M740 418 l4 22" stroke={O} strokeWidth="7" strokeLinecap="round" />

      {/* телевізор на тумбі, картина над ним вже є */}
      {tv && <ellipse cx="872" cy="282" rx="130" ry="100" fill="url(#lv-glow)" pointerEvents="none" />}
      <ellipse cx="872" cy="468" rx="118" ry="10" fill="#5E3E24" opacity=".3" />
      <rect x="770" y="372" width="206" height="90" rx="8" fill="url(#lv-woodL)" stroke={O} strokeWidth="2.5" />
      <rect x="762" y="362" width="222" height="14" rx="5" fill="url(#lv-wood)" stroke={O} strokeWidth="2.5" />
      <rect x="784" y="390" width="84" height="58" rx="5" fill="none" stroke="#8E5A2C" strokeWidth="2" /><rect x="878" y="390" width="84" height="58" rx="5" fill="none" stroke="#8E5A2C" strokeWidth="2" />
      <circle cx="858" cy="419" r="4.5" fill="url(#lv-yellow)" stroke={O} strokeWidth="1.5" /><circle cx="888" cy="419" r="4.5" fill="url(#lv-yellow)" stroke={O} strokeWidth="1.5" />
      <path d="M778 462 v8 M968 462 v8" stroke={O} strokeWidth="5" strokeLinecap="round" />
      <g {...hit('tv')}>
        <path d="M850 362 L858 344 H888 L896 362 Z" fill="#4A4F5C" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="772" y="214" width="202" height="134" rx="10" fill="#3A4150" stroke={O} strokeWidth="2.5" />
        <rect x="784" y="226" width="178" height="110" rx="4" fill="url(#lv-screen)" stroke={O} strokeWidth="1.8" />
        {tv
          ? <>
            <circle cx="928" cy="252" r="12" fill="#FFD866" stroke={O} strokeWidth="1.5" />
            <path d="M784 304 C 820 284, 860 290, 890 302 C 920 290, 946 288, 962 296 V336 H784 Z" fill="#8CCB7E" stroke={O} strokeWidth="1.5" />
            <g transform="translate(846 286)">
              <ellipse cx="0" cy="0" rx="20" ry="16" fill="#FFFDF8" stroke={O} strokeWidth="1.5" />
              <path d="M-15 -8 L-12 -22 L-4 -14 Z M15 -8 L12 -22 L4 -14 Z" fill="#FFFDF8" stroke={O} strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="-6" cy="-2" r="2.2" fill={O} /><circle cx="6" cy="-2" r="2.2" fill={O} />
              <path d="M-4 5 q4 4 8 0" stroke={O} strokeWidth="1.3" fill="none" />
            </g>
            <path d="M890 262 q8 -8 16 0 q8 -8 16 0" stroke={O} strokeWidth="1.8" fill="none" />
          </>
          : <path d="M796 236 L840 236 L796 290 Z" fill="#fff" opacity=".12" />}
        <circle cx="956" cy="342" r="2.5" fill={tv ? '#7CE07C' : '#E36F3C'} />
      </g>

      {/* килим, журнальний столик перед диваном */}
      <ellipse cx="560" cy="528" rx="270" ry="50" fill="url(#lv-rug)" stroke={O} strokeWidth="2.5" />
      <ellipse cx="560" cy="528" rx="236" ry="38" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="12 9" opacity=".6" />
      <ellipse cx="560" cy="520" rx="140" ry="9" fill="#3E5E54" opacity=".3" />
      <path d="M440 448 L452 516 M680 448 L668 516 M470 452 L476 504 M650 452 L644 504" stroke={O} strokeWidth="13" strokeLinecap="round" />
      <path d="M440 448 L452 516 M680 448 L668 516 M470 452 L476 504 M650 452 L644 504" stroke="#A5703B" strokeWidth="8" strokeLinecap="round" />
      <path d="M446 430 H674 L694 444 H426 Z" fill="url(#lv-woodL)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="424" y="443" width="272" height="16" rx="5" fill="url(#lv-wood)" stroke={O} strokeWidth="2.5" />
      <path d="M470 434 H620" stroke="#fff" strokeWidth="3" opacity=".35" strokeLinecap="round" />
      {/* ваза з квітами на столику */}
      <g {...hit('vase')}>
        <g transform="translate(0 18)">
        <path d="M484 352 C 486 374, 496 392, 504 404 M512 340 V404 M540 350 C 536 372, 526 392, 518 404" stroke="#4F9A4A" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M498 380 C 486 374, 480 378, 476 384 C 486 390, 494 388, 498 380 Z M526 376 C 538 368, 546 372, 550 378 C 540 386, 530 384, 526 376 Z" fill="url(#lv-green)" stroke={O} strokeWidth="1.5" />
        {[[484, 350, '#F26C6C'], [512, 336, '#FFD866'], [540, 348, '#F26C95']].map(([x, y, c], i) => <g key={i}>
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={x} cy={+y - 9} rx="6" ry="9" fill={c as string} stroke={O} strokeWidth="1.5" transform={`rotate(${a} ${x} ${y})`} />)}
          <circle cx={x} cy={y} r="5" fill="#FFF3B0" stroke={O} strokeWidth="1.5" />
        </g>)}
        </g>
        <path d="M500 402 C 490 410, 488 424, 494 436 H530 C 536 424, 534 410, 524 402 Z" fill="url(#lv-vase)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="498" y="398" width="28" height="7" rx="3" fill="url(#lv-vase)" stroke={O} strokeWidth="2" />
        <path d="M498 414 C 496 420, 496 426, 498 430" stroke="#fff" strokeWidth="3" opacity=".45" fill="none" strokeLinecap="round" />
      </g>
      <g {...hit('cup')}>
        <rect x="574" y="396" width="56" height="48" fill="transparent" />
        <path d="M612 412 c 12 0, 12 16, 0 16" stroke={O} strokeWidth="5" fill="none" />
        <path d="M612 412 c 12 0, 12 16, 0 16" stroke="url(#lv-red)" strokeWidth="2" fill="none" />
        <path d="M584 406 H614 L610 434 C 608 438, 590 438, 588 434 Z" fill="url(#lv-red)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <ellipse cx="599" cy="406" rx="15" ry="4" fill="#8E5A2C" stroke={O} strokeWidth="1.8" />
        <path d="M590 414 V428" stroke="#fff" strokeWidth="3" opacity=".45" strokeLinecap="round" />
        <path d="M594 396 q-4 -6 0 -12 M604 396 q-4 -6 0 -12" stroke="#fff" strokeWidth="2.5" fill="none" opacity=".8" strokeLinecap="round" />
      </g>
      <path d="M636 438 L640 426 H676 L680 438 Z" fill="url(#lv-blue)" stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <path d="M642 431 H674" stroke="#fff" strokeWidth="2" />

      {/* кошик з іграшками перед тумбою */}
      <g {...hit('basket')}>
        <rect x="884" y="452" width="34" height="34" rx="4" transform="rotate(10 901 469)" fill="url(#lv-red)" stroke={O} strokeWidth="2.2" />
        <text x="901" y="476" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" transform="rotate(10 901 469)" fontFamily="sans-serif">A</text>
        <path d="M934 488 V448" stroke="#8E5A2C" strokeWidth="5" strokeLinecap="round" />
        {[[934, 478, 14, '#F26C6C'], [934, 466, 11, '#FFD866'], [934, 456, 8, '#8EC9F2']].map(([x, y, rx, c], i) => <ellipse key={i} cx={x} cy={y} rx={rx} ry="6" fill={c as string} stroke={O} strokeWidth="1.8" />)}
        <path d="M818 486 C 818 506, 828 556, 840 562 H936 C 948 556, 958 506, 958 486 Z" fill="url(#lv-basket)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        {[500, 516, 532, 548].map((y) => <path key={y} d={`M${822 + (y - 486) * .2} ${y} H${954 - (y - 486) * .2}`} stroke="#8E6330" strokeWidth="2" opacity=".55" />)}
        {[846, 870, 894, 918].map((x) => <path key={x} d={`M${x} 488 V560`} stroke="#8E6330" strokeWidth="2" opacity=".35" />)}
        <rect x="812" y="480" width="152" height="12" rx="6" fill="url(#lv-basket)" stroke={O} strokeWidth="2.5" />
        <path d="M828 484 C 828 444, 948 444, 948 484" stroke="#B98A44" strokeWidth="6" fill="none" />
        <path d="M828 484 C 828 444, 948 444, 948 484" stroke={O} strokeWidth="1.5" fill="none" opacity=".5" />
      </g>
      <g {...hit('duck')}>
        <rect x="830" y="430" width="56" height="54" fill="transparent" />
        <path d="M836 482 C 832 464, 846 456, 862 460 C 872 462, 880 470, 882 482 Z" fill="url(#lv-yellow)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="850" cy="450" r="14" fill="url(#lv-yellow)" stroke={O} strokeWidth="2.2" />
        <path d="M836 450 L826 454 L836 458 Z" fill="#F08A3C" stroke={O} strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="845" cy="446" r="2.6" fill={O} /><circle cx="844.2" cy="445" r="1" fill="#fff" />
        <path d="M856 470 C 864 466, 872 470, 874 476" stroke="#E9A41F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="854" cy="442" rx="5" ry="3" fill="#fff" opacity=".45" />
      </g>

      {/* котик Бульбашка в шарфику */}
      <g transform="translate(108 512) scale(.95)">
        <ellipse cx="0" cy="80" rx="46" ry="8" fill="#5E3E24" opacity=".25" />
        <path d="M28 64 C 62 70, 70 34, 54 22" stroke={O} strokeWidth="11" fill="none" strokeLinecap="round" />
        <path d="M28 64 C 62 70, 70 34, 54 22" stroke="#FFFDF8" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M-32 28 C -44 84, 44 84, 32 28 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        <ellipse cx="-14" cy="78" rx="12" ry="7" fill="#FFFDF8" stroke={O} strokeWidth="2" /><ellipse cx="14" cy="78" rx="12" ry="7" fill="#FFFDF8" stroke={O} strokeWidth="2" />
        <path d="M-34 -18 L-28 -50 L-8 -30 Z M34 -18 L28 -50 L8 -30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-28 -44 L-24 -34 M28 -44 L24 -34" stroke="#F5A0C0" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="0" cy="2" rx="40" ry="33" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
        <ellipse cx="-14" cy="-3" rx="5" ry="6" fill={O} /><ellipse cx="14" cy="-3" rx="5" ry="6" fill={O} />
        <circle cx="-12" cy="-5" r="1.8" fill="#fff" /><circle cx="16" cy="-5" r="1.8" fill="#fff" />
        <path d="M-3 8 L3 8 L0 11 Z" fill="#F08AA8" />
        <path d="M0 11 q-6 7 -11 3 M0 11 q6 7 11 3" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="-24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" /><ellipse cx="24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" />
        <path d="M-40 6 L-58 1 M-40 12 L-58 14 M40 6 L58 1 M40 12 L58 14" stroke={O} strokeWidth="1.8" />
        {/* шарфик */}
        <path d="M-30 28 C -10 40, 10 40, 30 28 L32 40 C 10 52, -10 52, -32 40 Z" fill="url(#lv-scarf)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M12 42 L18 74 L32 70 L24 40 Z" fill="url(#lv-scarf)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M-14 38 V48 M0 40 V50 M14 38 V48 M20 56 L28 54" stroke="#fff" strokeWidth="3" opacity=".7" strokeLinecap="round" />
        <path d="M18 74 l-1 6 M24 72 l0 6 M30 70 l2 6" stroke={O} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export const LIVINGROOM: QuestLocation = {
  id: 'livingroom', level: 'A1-A2', Scene,
  title: { uk: 'Вітальня', ru: 'Гостиная', en: 'The living room' },
  place: { uk: 'Вітальня', ru: 'Гостиная', en: 'Living room' },
  finale: 'What a cosy room! Thank you, friend!',
  topics: [
    { uk: 'Прийменники місця: behind, between, in front of, next to, under, above', ru: 'Предлоги места: behind, between, in front of, next to, under, above', en: 'Prepositions of place: behind, between, in front of, next to, under, above' },
    { uk: 'Лексика: вітальня, меблі (sofa, armchair, table, TV)', ru: 'Лексика: гостиная, мебель (sofa, armchair, table, TV)', en: 'Vocabulary: living room, furniture (sofa, armchair, table, TV)' },
    { uk: 'Граматика: there is / there are', ru: 'Грамматика: there is / there are', en: 'Grammar: there is / there are' },
    { uk: 'Кольори, числа 1–3, команди: take, move, turn on', ru: 'Цвета, числа 1–3, команды: take, move, turn on', en: 'Colours, numbers 1–3, commands: take, move, turn on' },
  ],
  tasks: [
    { en: 'Welcome to my living room! Who is behind the armchair? Find him.', uk: 'Ласкаво просимо до моєї вітальні! Хто сховався за кріслом? Знайди його.', ru: 'Добро пожаловать в мою гостиную! Кто спрятался за креслом? Найди его.', target: ['dog'] },
    { en: 'There is a pink ball between the blue cushion and the green cushion. Take the ball.', uk: 'Між синьою і зеленою подушками лежить рожевий м’ячик. Візьми м’ячик.', ru: 'Между синей и зелёной подушками лежит розовый мячик. Возьми мячик.', target: ['ball'], take: 'ball' },
    { en: 'My remote is under the yellow cushion. Move the yellow cushion.', uk: 'Мій пульт під жовтою подушкою. Посунь жовту подушку.', ru: 'Мой пульт под жёлтой подушкой. Сдвинь жёлтую подушку.', target: ['yellowCushion'], set: 'cushion' },
    { en: 'Great! Now take the remote.', uk: 'Чудово! Тепер візьми пульт.', ru: 'Отлично! Теперь возьми пульт.', target: ['remote'], take: 'remote' },
    { en: "Let's watch cartoons. Turn on the TV.", uk: 'Подивимося мультики. Увімкни телевізор.', ru: 'Давай посмотрим мультики. Включи телевизор.', target: ['tv'], set: 'tv' },
    { en: 'There are three fish in the fish tank. Touch all the fish.', uk: 'В акваріумі три рибки. Торкнися всіх рибок.', ru: 'В аквариуме три рыбки. Коснись всех рыбок.', target: ['fish1', 'fish2', 'fish3'], all: true },
    { en: 'The table is in front of the sofa. Touch the vase of flowers on the table.', uk: 'Столик стоїть перед диваном. Торкнися вази з квітами на столику.', ru: 'Столик стоит перед диваном. Коснись вазы с цветами на столике.', target: ['vase'] },
    { en: 'I am thirsty. Take the red cup next to the vase.', uk: 'Я хочу пити. Візьми червону чашку біля вази.', ru: 'Я хочу пить. Возьми красную чашку рядом с вазой.', target: ['cup'], take: 'cup' },
    { en: 'Look at the wall above the sofa. Find the photo of my family.', uk: 'Подивись на стіну над диваном. Знайди фото моєї родини.', ru: 'Посмотри на стену над диваном. Найди фото моей семьи.', target: ['photo'] },
    { en: 'Something small and yellow is in the toy basket. Take it.', uk: 'У кошику з іграшками є щось маленьке й жовте. Візьми це.', ru: 'В корзине с игрушками есть что-то маленькое и жёлтое. Возьми это.', target: ['duck'], take: 'duck' },
  ],
};
