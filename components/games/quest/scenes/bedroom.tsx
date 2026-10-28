// Локація «Моя кімната»: лампа, ведмедик на ліжку, шафа з футболками, книжки на полиці, м’яч під ліжком, годинник, шкарпетки, штори на ніч
import { O, Lg } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

/* eslint-disable react/display-name */
function Scene({ hit, flags: f }: SceneProps) {
  const night = f.has('curtains');
  const lamp = f.has('lamp');
  const open = f.has('wardrobe');

  // книжка, що стоїть на полиці
  const book = (x: number, w: number, h: number, g: string, band: string) => (
    <g>
      <rect x={x} y={208 - h} width={w} height={h} rx="3" fill={`url(#${g})`} stroke={O} strokeWidth="2.2" />
      <path d={`M${x + 3} ${214 - h} H${x + w - 3} M${x + 3} ${202} H${x + w - 3}`} stroke={band} strokeWidth="3" />
      <rect x={x + 4} y={208 - h + 6} width="4" height={h - 16} rx="2" fill="#fff" opacity=".3" />
    </g>
  );
  // футболка на плічках
  const shirt = (x: number, g: string, dark: string) => (
    <g>
      <path d={`M${x} 172 q0 -12 10 -12 M${x - 30} 186 L${x + 30} 186`} stroke="#8A8A8A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d={`M${x - 16} 180 L${x - 40} 194 L${x - 32} 216 L${x - 22} 212 V268 H${x + 22} V212 L${x + 32} 216 L${x + 40} 194 L${x + 16} 180 C ${x + 10} 192, ${x - 10} 192, ${x - 16} 180 Z`} fill={`url(#${g})`} stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
      <path d={`M${x - 22} 212 L${x - 22} 200 M${x + 22} 212 L${x + 22} 200`} stroke={dark} strokeWidth="2" opacity=".5" />
      <ellipse cx={x - 8} cy="214" rx="9" ry="16" fill="#fff" opacity=".28" />
      <circle cx={x + 8} cy="232" r="7" fill="#fff" opacity=".85" stroke={O} strokeWidth="1.5" />
    </g>
  );
  // пара шкарпеток
  const socks = (x: number, y: number, g: string, stripe: string, rot = 0) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M-30 -22 V2 C -30 14, -12 18, 4 14 L6 2 L-12 0 V-22 Z" fill={`url(#${g})`} stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M-2 -26 V-2 C -2 10, 16 14, 32 10 L34 -2 L16 -4 V-26 Z" fill={`url(#${g})`} stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M-30 -14 H-12 M-2 -18 H16" stroke={stripe} strokeWidth="4" />
      <path d="M-30 -22 H-12 M-2 -26 H16" stroke={O} strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );

  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="My bedroom">
      <defs>
        <Lg id="bd-wall" a="#E6F1EC" b="#CFE3DB" />
        <Lg id="bd-floor" a="#D6AE7E" b="#B1834F" />
        <Lg id="bd-wood" a="#DCA66B" b="#A5703B" />
        <Lg id="bd-woodD" a="#B67F47" b="#7F5128" />
        <Lg id="bd-mint" a="#F7E6C8" b="#E2C192" />
        <Lg id="bd-sky" a={night ? '#1B2650' : '#9FD6F2'} b={night ? '#3D4F86' : '#E3F4FB'} />
        <Lg id="bd-curtain" a="#B6A3E4" b="#8069C2" />
        <Lg id="bd-blanket" a="#8EC9F2" b="#4E8CCB" />
        <Lg id="bd-mattress" a="#FFFFFF" b="#E6E0F2" />
        <Lg id="bd-rug" a="#F7BCD0" b="#E58FAE" />
        <Lg id="bd-green" a="#A6DE8F" b="#4F9A4A" />
        <Lg id="bd-orange" a="#FFB678" b="#E36F3C" />
        <Lg id="bd-red" a="#FF8A6E" b="#D2483A" />
        <Lg id="bd-blue" a="#8EC9F2" b="#3F7FC2" />
        <Lg id="bd-yellow" a="#FFE680" b="#F0B02F" />
        <Lg id="bd-pink" a="#FFC2D6" b="#F08AA8" />
        <Lg id="bd-shade" a={lamp ? '#FFF6B8' : '#FBE3D2'} b={lamp ? '#FFD45A' : '#EDB99A'} />
        <Lg id="bd-box" a="#FF9A7E" b="#D45A42" />
        <Lg id="bd-cap" a="#8FB8F2" b="#4F78C6" />
        <Lg id="bd-pot" a="#F09A6E" b="#C6603A" />
        <radialGradient id="bd-ball" cx=".38" cy=".32" r=".75"><stop offset="0" stopColor="#FFF0A0" /><stop offset=".6" stopColor="#F8CC3E" /><stop offset="1" stopColor="#E09A1E" /></radialGradient>
        <radialGradient id="bd-bear" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#E9BC86" /><stop offset="1" stopColor="#B57B43" /></radialGradient>
        <radialGradient id="bd-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#FFF2A8" stopOpacity=".95" /><stop offset=".5" stopColor="#FFE680" stopOpacity=".45" /><stop offset="1" stopColor="#FFE680" stopOpacity="0" /></radialGradient>
      </defs>

      {/* стіна з візерунком, плінтус */}
      <rect width="1000" height="430" fill="url(#bd-wall)" />
      {Array.from({ length: 13 }, (_, i) => <path key={i} d={`M${i * 80 + 20} 0 V418`} stroke="#fff" strokeWidth="14" opacity=".35" />)}
      {Array.from({ length: 24 }, (_, i) => {
        const x = (i % 12) * 84 + (i < 12 ? 50 : 92); const y = i < 12 ? 70 : 300;
        return <path key={i} d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`} fill="#A9CFC0" opacity=".7" />;
      })}
      <rect x="-5" y="412" width="1010" height="18" fill="#FBF7EF" stroke={O} strokeWidth="2.5" />
      {/* підлога в перспективі */}
      <path d="M0 430 H1000 V600 H0 Z" fill="url(#bd-floor)" stroke={O} strokeWidth="2.5" />
      {Array.from({ length: 13 }, (_, i) => { const x = -100 + i * 100; return <path key={i} d={`M${500 + (x - 500) * .62} 430 L${x} 600`} stroke="#94683C" strokeWidth="2" opacity=".45" />; })}
      {[[120, 470], [360, 520], [600, 455], [820, 560], [250, 580], [930, 480]].map(([x, y], i) => <path key={i} d={`M${x} ${y} h34`} stroke="#94683C" strokeWidth="2" opacity=".4" />)}
      {!night && <path d="M300 430 L470 430 L560 600 L330 600 Z" fill="#FFF6D8" opacity=".28" />}

      {/* вікно зі шторами */}
      <rect x="282" y="58" width="176" height="186" rx="8" fill="url(#bd-sky)" stroke={O} strokeWidth="3" />
      {night
        ? <><path d="M420 92 a20 20 0 1 0 14 34 a15 15 0 1 1 -14 -34 Z" fill="#FFF3B0" stroke={O} strokeWidth="2" />{[[310, 90], [345, 140], [400, 200], [330, 210], [380, 100], [430, 170]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="#fff" />)}</>
        : <><circle cx="410" cy="104" r="22" fill="#FFD866" stroke={O} strokeWidth="2" /><path d="M300 190 c 0 -16, 22 -20, 30 -10 c 6 -14, 30 -12, 32 4 c 12 0, 16 14, 6 18 H306 c -10 0, -12 -10, -6 -12 Z" fill="#fff" stroke={O} strokeWidth="2" /></>}
      <path d="M370 58 V244 M282 150 H458" stroke={O} strokeWidth="3" />
      <path d="M370 60 V242 M284 150 H456" stroke="#fff" strokeWidth="1.2" opacity=".6" />
      <path d="M296 72 L330 72 L296 110 Z" fill="#fff" opacity=".3" />
      <rect x="270" y="242" width="200" height="14" rx="5" fill="#FBF7EF" stroke={O} strokeWidth="2.5" />
      <g {...hit('curtains')}>
        <rect x="256" y="36" width="228" height="10" rx="5" fill="url(#bd-woodD)" stroke={O} strokeWidth="2" />
        <circle cx="256" cy="41" r="8" fill="url(#bd-woodD)" stroke={O} strokeWidth="2" /><circle cx="484" cy="41" r="8" fill="url(#bd-woodD)" stroke={O} strokeWidth="2" />
        {night
          ? <>
            <path d="M262 46 H370 V272 C 344 278, 300 278, 262 272 Z" fill="url(#bd-curtain)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M370 46 H478 V272 C 440 278, 396 278, 370 272 Z" fill="url(#bd-curtain)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
            {[290, 318, 346, 396, 424, 452].map((x) => <path key={x} d={`M${x} 50 V268`} stroke="#5E4A9E" strokeWidth="2" opacity=".35" />)}
            <path d="M276 54 V264 M384 54 V264" stroke="#fff" strokeWidth="5" opacity=".25" strokeLinecap="round" />
          </>
          : <>
            <path d="M262 46 H312 C 304 110, 300 150, 316 196 C 324 222, 314 250, 300 272 H262 Z" fill="url(#bd-curtain)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M478 46 H428 C 436 110, 440 150, 424 196 C 416 222, 426 250, 440 272 H478 Z" fill="url(#bd-curtain)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M280 52 C 284 120, 282 200, 280 266 M296 52 C 294 110, 296 160, 304 196 M460 52 C 456 120, 458 200, 460 266 M444 52 C 446 110, 444 160, 436 196" stroke="#5E4A9E" strokeWidth="2" opacity=".35" fill="none" />
            <path d="M270 54 V262 M470 54 V262" stroke="#fff" strokeWidth="5" opacity=".25" strokeLinecap="round" />
            <path d="M262 196 C 290 188, 310 190, 322 198 C 310 208, 290 208, 262 204 Z M478 196 C 450 188, 430 190, 418 198 C 430 208, 450 208, 478 204 Z" fill="#FFD866" stroke={O} strokeWidth="2" />
          </>}
      </g>

      {/* годинник над ліжком */}
      <g {...hit('clock')}>
        <circle cx="655" cy="128" r="46" fill="url(#bd-red)" stroke={O} strokeWidth="2.5" />
        <circle cx="655" cy="128" r="36" fill="#FFFDF6" stroke={O} strokeWidth="2" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M655 ${i % 3 ? 96 : 95} V${i % 3 ? 100 : 104}`} transform={`rotate(${i * 30} 655 128)`} stroke={O} strokeWidth={i % 3 ? 2 : 3} strokeLinecap="round" />)}
        <path d="M655 128 V104 M655 128 L675 136" stroke={O} strokeWidth="4" strokeLinecap="round" />
        <circle cx="655" cy="128" r="4" fill={O} />
        <ellipse cx="636" cy="100" rx="12" ry="6" fill="#fff" opacity=".35" transform="rotate(-30 636 100)" />
      </g>

      {/* полиця: три книжки, синя машинка, вазон */}
      <rect x="758" y="208" width="226" height="14" rx="4" fill="url(#bd-wood)" stroke={O} strokeWidth="2.5" />
      <path d="M786 222 v18 l14 -18 M950 222 v18 l-14 -18" stroke={O} strokeWidth="2.5" fill="url(#bd-woodD)" strokeLinejoin="round" />
      <g {...hit('book1')}>{book(772, 24, 70, 'bd-red', '#FFD866')}</g>
      <g {...hit('book2')}>{book(798, 28, 82, 'bd-blue', '#fff')}</g>
      <g {...hit('book3')}>{book(828, 22, 62, 'bd-green', '#FFD866')}</g>
      <g {...hit('blueCar')}>
        <rect x="856" y="150" width="76" height="60" fill="transparent" />
        <path d="M866 196 V180 C 866 174, 870 172, 876 172 L884 160 H912 L922 172 C 928 172, 932 176, 932 182 V196 Z" fill="url(#bd-blue)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M888 164 H908 L914 172 H884 Z" fill="#E3F4FB" stroke={O} strokeWidth="1.5" />
        <circle cx="880" cy="198" r="8" fill="#4A4A4A" stroke={O} strokeWidth="2" /><circle cx="918" cy="198" r="8" fill="#4A4A4A" stroke={O} strokeWidth="2" />
        <circle cx="880" cy="198" r="3" fill="#ccc" /><circle cx="918" cy="198" r="3" fill="#ccc" />
        <ellipse cx="878" cy="178" rx="8" ry="3" fill="#fff" opacity=".35" />
      </g>
      <path d="M944 208 L940 178 H974 L970 208 Z" fill="url(#bd-pot)" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M957 178 C 948 160, 940 152, 930 150 C 936 160, 946 168, 957 178 Z M957 178 C 960 156, 970 146, 980 142 C 980 156, 970 168, 957 178 Z M957 178 C 956 162, 958 150, 956 136" fill="url(#bd-green)" stroke={O} strokeWidth="2" strokeLinejoin="round" />

      {/* шафа */}
      <ellipse cx="135" cy="462" rx="120" ry="10" fill="#6B4A2B" opacity=".25" />
      <g {...hit('wardrobe')}>
        <rect x="30" y="98" width="210" height="360" rx="10" fill="url(#bd-mint)" stroke={O} strokeWidth="2.5" />
        <rect x="22" y="86" width="226" height="18" rx="6" fill="url(#bd-wood)" stroke={O} strokeWidth="2.5" />
        <path d="M44 458 v10 h20 v-10 M206 458 v10 h20 v-10" fill="url(#bd-woodD)" stroke={O} strokeWidth="2.2" />
        {open
          ? <>
            <rect x="44" y="114" width="182" height="300" rx="6" fill="#7A5232" stroke={O} strokeWidth="2.2" />
            <rect x="44" y="114" width="182" height="30" fill="#5E3E24" opacity=".6" />
            <path d="M50 160 H220" stroke="#C9C9C9" strokeWidth="5" strokeLinecap="round" />
            <path d="M50 158 H220" stroke="#fff" strokeWidth="1.5" opacity=".6" />
            <rect x="44" y="350" width="182" height="10" fill="url(#bd-wood)" stroke={O} strokeWidth="2" />
            <path d="M70 350 C 70 330, 110 330, 112 350 Z M150 350 C 150 330, 190 330, 192 350 Z" fill="#E58FAE" stroke={O} strokeWidth="2" />
            <rect x="60" y="372" width="70" height="36" rx="4" fill="#F3E3B9" stroke={O} strokeWidth="2" />
            <path d="M30 98 L-6 116 V440 L30 458 Z" fill="url(#bd-mint)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M240 98 L276 116 V440 L240 458 Z" fill="url(#bd-mint)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M262 112 V444" stroke="#fff" strokeWidth="5" opacity=".3" strokeLinecap="round" />
            <circle cx="10" cy="280" r="6" fill="url(#bd-yellow)" stroke={O} strokeWidth="1.8" /><circle cx="262" cy="280" r="6" fill="url(#bd-yellow)" stroke={O} strokeWidth="1.8" />
          </>
          : <>
            <path d="M135 104 V458" stroke={O} strokeWidth="2.5" />
            <rect x="46" y="122" width="74" height="150" rx="8" fill="none" stroke="#C99D62" strokeWidth="2.5" />
            <rect x="150" y="122" width="74" height="150" rx="8" fill="none" stroke="#C99D62" strokeWidth="2.5" />
            <rect x="46" y="292" width="74" height="146" rx="8" fill="none" stroke="#C99D62" strokeWidth="2.5" />
            <rect x="150" y="292" width="74" height="146" rx="8" fill="none" stroke="#C99D62" strokeWidth="2.5" />
            <path d="M48 112 V444" stroke="#fff" strokeWidth="6" opacity=".35" strokeLinecap="round" />
            <circle cx="124" cy="282" r="7" fill="url(#bd-yellow)" stroke={O} strokeWidth="2" /><circle cx="146" cy="282" r="7" fill="url(#bd-yellow)" stroke={O} strokeWidth="2" />
          </>}
      </g>
      {open && <g {...hit('orangeShirt')}>{shirt(92, 'bd-orange', '#B4501E')}</g>}
      {open && <g {...hit('shirt')}>{shirt(176, 'bd-green', '#3B7A36')}</g>}

      {/* ліжко: тінь, м’яч під ліжком, каркас, ковдра */}
      <ellipse cx="668" cy="480" rx="200" ry="14" fill="#5E3E24" opacity=".3" />
      <rect x="500" y="408" width="320" height="70" fill="#5E3E24" opacity=".42" />
      <g {...hit('ball')}>
        <circle cx="612" cy="450" r="27" fill="url(#bd-ball)" stroke={O} strokeWidth="2.5" />
        <path d="M586 444 C 600 456, 626 456, 638 444 M606 424 C 596 440, 598 462, 612 477" stroke="#E36F3C" strokeWidth="3" fill="none" />
        <ellipse cx="602" cy="438" rx="9" ry="5" fill="#fff" opacity=".45" transform="rotate(-25 602 438)" />
      </g>
      <rect x="826" y="244" width="40" height="236" rx="12" fill="url(#bd-wood)" stroke={O} strokeWidth="2.5" />
      <path d="M836 260 V470" stroke="#fff" strokeWidth="5" opacity=".3" strokeLinecap="round" />
      <rect x="500" y="404" width="16" height="76" rx="4" fill="url(#bd-woodD)" stroke={O} strokeWidth="2.2" />
      <rect x="806" y="404" width="16" height="76" rx="4" fill="url(#bd-woodD)" stroke={O} strokeWidth="2.2" />
      <rect x="494" y="380" width="336" height="30" rx="8" fill="url(#bd-wood)" stroke={O} strokeWidth="2.5" />
      <rect x="496" y="338" width="332" height="48" rx="14" fill="url(#bd-mattress)" stroke={O} strokeWidth="2.5" />
      <path d="M716 302 C 716 290, 816 286, 822 300 C 828 314, 826 340, 816 344 C 780 352, 730 350, 718 342 C 708 330, 710 312, 716 302 Z" fill="#fff" stroke={O} strokeWidth="2.5" />
      <path d="M730 312 C 760 306, 790 306, 808 312" stroke="#D9D2EA" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M496 330 C 560 320, 650 318, 734 326 C 742 352, 744 380, 740 418 C 720 410, 700 422, 680 414 C 660 422, 640 410, 620 418 C 600 410, 580 422, 560 414 C 540 422, 520 410, 500 418 C 492 390, 490 352, 496 330 Z" fill="url(#bd-blanket)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      {[[530, 352], [590, 372], [650, 348], [700, 384], [560, 398], [620, 396]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`} fill="#fff" opacity=".7" />)}
      <path d="M510 336 C 580 326, 660 326, 720 332" stroke="#fff" strokeWidth="5" opacity=".35" fill="none" strokeLinecap="round" />
      <rect x="474" y="300" width="36" height="180" rx="11" fill="url(#bd-wood)" stroke={O} strokeWidth="2.5" />
      <path d="M484 314 V470" stroke="#fff" strokeWidth="5" opacity=".3" strokeLinecap="round" />

      {/* ведмедик сидить на ліжку */}
      <g {...hit('teddy')}>
        <ellipse cx="626" cy="306" rx="34" ry="30" fill="url(#bd-bear)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="626" cy="312" rx="18" ry="16" fill="#F4D9B4" />
        <ellipse cx="598" cy="320" rx="11" ry="9" fill="url(#bd-bear)" stroke={O} strokeWidth="2.2" />
        <ellipse cx="654" cy="320" rx="11" ry="9" fill="url(#bd-bear)" stroke={O} strokeWidth="2.2" />
        <ellipse cx="606" cy="332" rx="14" ry="10" fill="url(#bd-bear)" stroke={O} strokeWidth="2.2" /><ellipse cx="646" cy="332" rx="14" ry="10" fill="url(#bd-bear)" stroke={O} strokeWidth="2.2" />
        <ellipse cx="606" cy="333" rx="7" ry="5" fill="#F4D9B4" /><ellipse cx="646" cy="333" rx="7" ry="5" fill="#F4D9B4" />
        <circle cx="602" cy="238" r="12" fill="url(#bd-bear)" stroke={O} strokeWidth="2.2" /><circle cx="650" cy="238" r="12" fill="url(#bd-bear)" stroke={O} strokeWidth="2.2" />
        <circle cx="602" cy="238" r="6" fill="#F4D9B4" /><circle cx="650" cy="238" r="6" fill="#F4D9B4" />
        <circle cx="626" cy="260" r="30" fill="url(#bd-bear)" stroke={O} strokeWidth="2.5" />
        <ellipse cx="626" cy="272" rx="13" ry="10" fill="#F4D9B4" />
        <ellipse cx="626" cy="267" rx="5" ry="4" fill={O} />
        <path d="M626 271 V276 M620 278 q6 4 12 0" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="614" cy="254" r="4" fill={O} /><circle cx="638" cy="254" r="4" fill={O} />
        <circle cx="613" cy="252.5" r="1.5" fill="#fff" /><circle cx="637" cy="252.5" r="1.5" fill="#fff" />
        <ellipse cx="606" cy="268" rx="5" ry="3" fill="#F5A0C0" opacity=".7" /><ellipse cx="646" cy="268" rx="5" ry="3" fill="#F5A0C0" opacity=".7" />
        <path d="M612 288 L626 296 L640 288 L640 302 L626 296 L612 302 Z" fill="url(#bd-red)" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
        <ellipse cx="614" cy="244" rx="8" ry="4" fill="#fff" opacity=".3" />
      </g>

      {/* тумбочка, червона книжка, лампа */}
      {lamp && <circle cx="912" cy="300" r="120" fill="url(#bd-glow)" pointerEvents="none" />}
      <rect x="870" y="372" width="118" height="98" rx="8" fill="url(#bd-wood)" stroke={O} strokeWidth="2.5" />
      <rect x="862" y="364" width="134" height="14" rx="5" fill="url(#bd-woodD)" stroke={O} strokeWidth="2.5" />
      <rect x="882" y="392" width="94" height="30" rx="5" fill="none" stroke="#8E5A2C" strokeWidth="2" />
      <rect x="882" y="430" width="94" height="30" rx="5" fill="none" stroke="#8E5A2C" strokeWidth="2" />
      <circle cx="929" cy="407" r="5" fill="url(#bd-yellow)" stroke={O} strokeWidth="1.5" /><circle cx="929" cy="445" r="5" fill="url(#bd-yellow)" stroke={O} strokeWidth="1.5" />
      <path d="M878 470 v8 M980 470 v8" stroke={O} strokeWidth="5" strokeLinecap="round" />
      <g {...hit('redBook')}>
        <rect x="934" y="320" width="56" height="44" fill="transparent" />
        <path d="M936 364 L940 346 H988 L986 364 Z" fill="#FBF7EF" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <path d="M936 346 H990 V352 H936 Z" fill="url(#bd-red)" stroke={O} strokeWidth="2" />
        <path d="M934 358 H988 V364 H934 Z" fill="url(#bd-red)" stroke={O} strokeWidth="2" />
      </g>
      <g {...hit('lamp')}>
        <ellipse cx="902" cy="362" rx="24" ry="7" fill="url(#bd-woodD)" stroke={O} strokeWidth="2.2" />
        <path d="M902 360 V316" stroke={O} strokeWidth="6" strokeLinecap="round" />
        <path d="M902 360 V318" stroke="#C9C9C9" strokeWidth="3" strokeLinecap="round" />
        <path d="M866 322 L880 268 H924 L938 322 Z" fill="url(#bd-shade)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M866 322 H938" stroke={O} strokeWidth="2.5" />
        <path d="M884 276 L874 316" stroke="#fff" strokeWidth="5" opacity=".45" strokeLinecap="round" />
        <path d="M914 336 V346" stroke={O} strokeWidth="2" /><circle cx="914" cy="349" r="3.5" fill="url(#bd-yellow)" stroke={O} strokeWidth="1.5" />
      </g>

      {/* килим, тапочки */}
      <ellipse cx="650" cy="548" rx="230" ry="40" fill="url(#bd-rug)" stroke={O} strokeWidth="2.5" />
      <ellipse cx="650" cy="548" rx="196" ry="30" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 8" opacity=".7" />
      {[[748, 500], [784, 506]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="16" ry="9" fill="url(#bd-blue)" stroke={O} strokeWidth="2" /><path d={`M${x - 14} ${y - 2} C ${x - 10} ${y - 12}, ${x + 6} ${y - 12}, ${x + 4} ${y - 2}`} fill="#fff" stroke={O} strokeWidth="2" /></g>)}

      {/* скринька з іграшками і червона машинка біля неї */}
      <g {...hit('toyBox')}>
<g transform="translate(0 -14)">
        <path d="M296 404 C 286 380, 284 360, 292 352 C 300 356, 306 376, 306 398 Z M318 398 C 320 376, 328 356, 338 354 C 344 362, 338 384, 328 404 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M294 362 C 298 372, 300 384, 300 394 M334 364 C 330 374, 326 386, 324 396" stroke="#F5A0C0" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="312" cy="414" rx="30" ry="22" fill="#FFFDF8" stroke={O} strokeWidth="2.2" />
        <circle cx="302" cy="410" r="3" fill={O} /><circle cx="322" cy="410" r="3" fill={O} /><path d="M309 417 h6 l-3 3 Z" fill="#F08AA8" />
        <ellipse cx="294" cy="419" rx="5" ry="3" fill="#F5A0C0" opacity=".7" /><ellipse cx="330" cy="419" rx="5" ry="3" fill="#F5A0C0" opacity=".7" />
</g>
        <rect x="366" y="392" width="34" height="30" rx="4" transform="rotate(-12 383 407)" fill="url(#bd-blue)" stroke={O} strokeWidth="2.2" />
        <rect x="268" y="420" width="160" height="96" rx="8" fill="url(#bd-box)" stroke={O} strokeWidth="2.5" />
        <rect x="262" y="412" width="172" height="18" rx="6" fill="#FFD866" stroke={O} strokeWidth="2.5" />
        <path d="M280 442 V500" stroke="#fff" strokeWidth="6" opacity=".3" strokeLinecap="round" />
        <path d="M318 452 L322 463 L334 464 L325 471 L328 483 L318 476 L308 483 L311 471 L302 464 L314 463 Z" fill="#FFD866" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <path d="M352 456 h22 l-11 22 Z" fill="#8EC9F2" stroke={O} strokeWidth="2" strokeLinejoin="round" />
        <rect x="384" y="456" width="22" height="22" rx="3" fill="#A6DE8F" stroke={O} strokeWidth="2" />
      </g>
      <g {...hit('redCar')}>
        <rect x="436" y="488" width="96" height="62" fill="transparent" />
        <ellipse cx="484" cy="543" rx="44" ry="6" fill="#5E3E24" opacity=".25" />
        <path d="M444 534 V514 C 444 506, 450 504, 456 504 L468 490 H502 L514 504 C 522 504, 528 508, 528 516 V534 Z" fill="url(#bd-red)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M472 494 H498 L506 504 H466 Z" fill="#E3F4FB" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M486 494 V504" stroke={O} strokeWidth="1.8" />
        <circle cx="462" cy="536" r="10" fill="#4A4A4A" stroke={O} strokeWidth="2" /><circle cx="510" cy="536" r="10" fill="#4A4A4A" stroke={O} strokeWidth="2" />
        <circle cx="462" cy="536" r="4" fill="#ccc" /><circle cx="510" cy="536" r="4" fill="#ccc" />
        <circle cx="524" cy="516" r="3" fill="#FFE680" stroke={O} strokeWidth="1.2" />
        <ellipse cx="458" cy="512" rx="10" ry="3" fill="#fff" opacity=".35" />
      </g>

      {/* шкарпетки на килимі */}
      <g {...hit('socks')}>
        <rect x="560" y="512" width="80" height="58" fill="transparent" />
        {socks(598, 548, 'bd-pink', '#fff', -8)}
      </g>
      <g {...hit('blueSocks')}>
        <rect x="690" y="520" width="80" height="58" fill="transparent" />
        {socks(728, 556, 'bd-blue', '#FFD866', 10)}
      </g>

      {/* котик Бульбашка в нічному ковпаку */}
      <g transform="translate(140 508) scale(.95)">
        <ellipse cx="0" cy="80" rx="46" ry="8" fill="#5E3E24" opacity=".25" />
        <path d="M28 64 C 62 70, 70 34, 54 22" stroke={O} strokeWidth="11" fill="none" strokeLinecap="round" />
        <path d="M28 64 C 62 70, 70 34, 54 22" stroke="#FFFDF8" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M-32 28 C -44 84, 44 84, 32 28 Z" fill="url(#bd-cap)" stroke={O} strokeWidth="2.5" />
        <path d="M-30 46 H30 M-34 62 H34" stroke="#fff" strokeWidth="5" opacity=".6" />
        <circle cx="0" cy="40" r="3" fill="#fff" stroke={O} strokeWidth="1.2" /><circle cx="0" cy="54" r="3" fill="#fff" stroke={O} strokeWidth="1.2" />
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
        {/* нічний ковпак між вушками */}
        <path d="M-16 -26 C -18 -58, 8 -82, 40 -80 C 56 -78, 66 -64, 64 -48 C 52 -62, 36 -58, 18 -26 Z" fill="url(#bd-cap)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-4 -44 C 6 -62, 20 -72, 40 -74" stroke="#fff" strokeWidth="4" opacity=".45" fill="none" strokeLinecap="round" />
        <path d="M-20 -24 C -8 -32, 10 -32, 22 -24 L20 -16 C 8 -22, -8 -22, -18 -16 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="64" cy="-44" r="10" fill="#FFFDF8" stroke={O} strokeWidth="2.2" />
        <path d="M-34 -18 L-28 -50 L-10 -32 M34 -18 L28 -50 L10 -32" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-27 -43 L-24 -35 M27 -43 L24 -35" stroke="#F5A0C0" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* ніч: кімната темнішає, лампа світить */}
      {night && <rect width="1000" height="600" fill="#1B2448" opacity=".38" pointerEvents="none" />}
      {night && lamp && <circle cx="912" cy="300" r="150" fill="url(#bd-glow)" pointerEvents="none" />}
    </svg>
  );
}

export const BEDROOM: QuestLocation = {
  id: 'bedroom', level: 'A1-A2', Scene,
  title: { uk: 'Моя кімната', ru: 'Моя комната', en: 'My bedroom' },
  place: { uk: 'Спальня', ru: 'Спальня', en: 'Bedroom' },
  finale: 'Good night! Thank you for your help!',
  topics: [
    { uk: 'Прийменники місця: in, on, under, above, next to', ru: 'Предлоги места: in, on, under, above, next to', en: 'Prepositions of place: in, on, under, above, next to' },
    { uk: 'Лексика: спальня, меблі, іграшки, одяг', ru: 'Лексика: спальня, мебель, игрушки, одежда', en: 'Vocabulary: bedroom, furniture, toys, clothes' },
    { uk: 'Кольори і числа 1–3', ru: 'Цвета и числа 1–3', en: 'Colours and numbers 1–3' },
    { uk: 'Дієслова-команди: turn on, open, take, close', ru: 'Глаголы-команды: turn on, open, take, close', en: 'Action verbs: turn on, open, take, close' },
  ],
  tasks: [
    { en: 'Welcome to my bedroom! Please turn on the lamp.', uk: 'Ласкаво просимо до моєї кімнати! Увімкни, будь ласка, лампу.', ru: 'Добро пожаловать в мою комнату! Включи, пожалуйста, лампу.', target: ['lamp'], set: 'lamp' },
    { en: 'My teddy bear is on the bed. Take the teddy bear.', uk: 'Мій ведмедик на ліжку. Візьми ведмедика.', ru: 'Мой мишка на кровати. Возьми мишку.', target: ['teddy'], take: 'teddy bear' },
    { en: 'Something round and yellow is under the bed. Take it.', uk: 'Під ліжком є щось кругле й жовте. Візьми це.', ru: 'Под кроватью есть что-то круглое и жёлтое. Возьми это.', target: ['ball'], take: 'ball' },
    { en: 'Open the wardrobe, please.', uk: 'Відчини шафу, будь ласка.', ru: 'Открой шкаф, пожалуйста.', target: ['wardrobe'], set: 'wardrobe' },
    { en: 'There are two T-shirts in the wardrobe. Take the green T-shirt.', uk: 'У шафі дві футболки. Візьми зелену футболку.', ru: 'В шкафу две футболки. Возьми зелёную футболку.', target: ['shirt'], take: 'T-shirt' },
    { en: 'How many books are on the shelf? Touch all the books on the shelf.', uk: 'Скільки книжок на полиці? Торкнися всіх книжок на полиці.', ru: 'Сколько книг на полке? Коснись всех книг на полке.', target: ['book1', 'book2', 'book3'], all: true },
    { en: 'The clock is above the bed. What time is it? Touch the clock.', uk: 'Годинник висить над ліжком. Котра година? Торкнися годинника.', ru: 'Часы висят над кроватью. Который час? Коснись часов.', target: ['clock'] },
    { en: 'Find the pink socks on the rug. Take them.', uk: 'Знайди рожеві шкарпетки на килимі. Візьми їх.', ru: 'Найди розовые носки на ковре. Возьми их.', target: ['socks'], take: 'socks' },
    { en: 'My red car is next to the toy box. Take the red car.', uk: 'Моя червона машинка біля скриньки з іграшками. Візьми червону машинку.', ru: 'Моя красная машинка рядом с ящиком для игрушек. Возьми красную машинку.', target: ['redCar'], take: 'car' },
    { en: 'It is night now. Close the curtains.', uk: 'Уже ніч. Засунь штори.', ru: 'Уже ночь. Задёрни шторы.', target: ['curtains'], set: 'curtains' },
  ],
};
