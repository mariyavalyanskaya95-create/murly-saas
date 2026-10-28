// Локація «Під водою»: рибки, краб, скриня з перлиною
import { O } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

/* eslint-disable react/display-name */
function Scene({ hit, flags: f }: SceneProps) {
  // рибка: тіло з градієнтом, плавці зі смужками, блиск на оці
  const fish = (x: number, y: number, g: string, fin: string, flip = false, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * s} ${s})`}>
      <path d="M44 0 C 62 -10, 74 -26, 82 -30 C 78 -12, 78 12, 82 30 C 74 26, 62 10, 44 0 Z" fill={fin} stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M56 -6 L74 -20 M58 0 L78 0 M56 6 L74 20" stroke={O} strokeWidth="1.5" opacity=".35" />
      <path d="M-8 -26 C 4 -44, 22 -40, 26 -22 Z" fill={fin} stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="0" cy="0" rx="48" ry="28" fill={`url(#${g})`} stroke={O} strokeWidth="2.5" />
      <path d="M-14 -24 C -2 -8, -2 8, -14 24" fill="none" stroke={O} strokeWidth="2" opacity=".35" />
      <path d="M4 -26 C 16 -8, 16 8, 4 26" fill="none" stroke={O} strokeWidth="2" opacity=".2" />
      <path d="M2 10 C 10 22, 22 20, 24 12 Z" fill={fin} stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="-12" cy="-12" rx="22" ry="7" fill="#fff" opacity=".28" />
      <circle cx="-28" cy="-6" r="8" fill="#fff" stroke={O} strokeWidth="2" /><circle cx="-29" cy="-6" r="4" fill={O} /><circle cx="-31" cy="-8" r="1.6" fill="#fff" />
      <path d="M-46 6 q5 4 10 1" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
  const star = (x: number, y: number, r = 1, rot = 12) => (
    <g transform={`translate(${x} ${y}) scale(${r}) rotate(${rot})`}>
      <path d="M0 -30 C 4 -18, 6 -12, 9 -9 C 14 -8, 22 -9, 29 -9 C 22 -3, 16 2, 13 5 C 15 12, 18 20, 18 27 C 11 22, 6 17, 0 14 C -6 17, -11 22, -18 27 C -18 20, -15 12, -13 5 C -16 2, -22 -3, -29 -9 C -22 -9, -14 -8, -9 -9 C -6 -12, -4 -18, 0 -30 Z" fill="url(#gStar)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
      {[[0, -16], [8, -4], [-8, -4], [6, 10], [-6, 10], [0, 0]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r="1.8" fill="#FFE2B8" />)}
    </g>
  );
  const coral = (x: number, y: number, c: string, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={c} strokeWidth="11" strokeLinecap="round">
      <path d="M0 0 C 0 -30, -4 -50, -20 -70 M0 -30 C 10 -50, 22 -58, 26 -80 M-8 -46 C -26 -54, -34 -60, -38 -76 M12 -48 C 4 -66, 6 -78, 4 -96" />
    </g>
  );
  const weed = (x: number, h: number, c = '#4F9A5B', w = 10) => (
    <path d={`M${x} 480 C ${x - 22} ${480 - h * .3}, ${x + 24} ${480 - h * .55}, ${x - 4} ${480 - h * .8} S ${x + 14} ${480 - h}, ${x + 6} ${480 - h}`} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" />
  );

  return (
        <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="Under the sea">
          <defs>
            <linearGradient id="sqw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BFE6EE" /><stop offset=".55" stopColor="#6FB5CB" /><stop offset="1" stopColor="#3D8AA8" /></linearGradient>
            <radialGradient id="sqSun" cx=".55" cy="-.1" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
            <linearGradient id="sqSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F3E3B9" /><stop offset="1" stopColor="#D9BF86" /></linearGradient>
            <linearGradient id="gRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF8A6E" /><stop offset="1" stopColor="#D2483A" /></linearGradient>
            <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8EC9F2" /><stop offset="1" stopColor="#3F7FC2" /></linearGradient>
            <linearGradient id="gYellow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE680" /><stop offset="1" stopColor="#F0B02F" /></linearGradient>
            <linearGradient id="gStar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFB36B" /><stop offset="1" stopColor="#E36F3C" /></linearGradient>
            <linearGradient id="gRock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A6A9A2" /><stop offset="1" stopColor="#6D706B" /></linearGradient>
            <linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C98A4B" /><stop offset="1" stopColor="#8E5A2C" /></linearGradient>
            <linearGradient id="gWoodR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D8604E" /><stop offset="1" stopColor="#9C3427" /></linearGradient>
            <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE58A" /><stop offset="1" stopColor="#D9A321" /></linearGradient>
            <radialGradient id="gPearl" cx=".35" cy=".3" r=".7"><stop offset="0" stopColor="#fff" /><stop offset=".7" stopColor="#ECE8F2" /><stop offset="1" stopColor="#C9C2D6" /></radialGradient>
            <radialGradient id="gOcto" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#D5B3E6" /><stop offset="1" stopColor="#9165B0" /></radialGradient>
            <radialGradient id="gCrab" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#FF9C6B" /><stop offset="1" stopColor="#D2552F" /></radialGradient>
            <radialGradient id="gGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#FFF4B0" stopOpacity=".9" /><stop offset="1" stopColor="#FFF4B0" stopOpacity="0" /></radialGradient>
          </defs>
          {/* вода, світло, дальній риф */}
          <rect width="1000" height="600" fill="url(#sqw)" />
          <rect width="1000" height="600" fill="url(#sqSun)" />
          {[100, 300, 520, 740].map((x, i) => <path key={i} d={`M${x} 0 L${x + 70} 0 L${x + 190} 470 L${x + 110} 470 Z`} fill="#fff" opacity={i % 2 ? .07 : .11} />)}
          <path d="M0 430 C 60 380, 110 400, 160 370 C 210 340, 260 380, 320 360 C 400 330, 450 390, 520 370 C 600 345, 660 385, 730 360 C 820 330, 880 380, 1000 350 L1000 480 L0 480 Z" fill="#4E97AF" opacity=".55" />
          {[[70, 140, 7], [150, 70, 5], [610, 100, 9], [905, 210, 6], [520, 50, 4], [850, 90, 8], [380, 120, 5]].map(([x, y, r], i) => <g key={i} opacity=".8"><circle cx={x} cy={y} r={r} fill="#fff" fillOpacity=".15" stroke="#fff" strokeWidth="1.5" /><circle cx={x - r * .35} cy={y - r * .35} r={r * .25} fill="#fff" /></g>)}
          {/* пісок */}
          <path d="M0 470 C 120 440, 220 452, 320 468 C 430 486, 520 456, 640 462 C 760 468, 860 446, 1000 462 L1000 600 L0 600 Z" fill="url(#sqSand)" stroke={O} strokeWidth="2.5" />
          {[[60, 520], [180, 575], [260, 530], [450, 585], [520, 540], [700, 575], [780, 530], [960, 580], [880, 545], [340, 590]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="2" fill="#C9A86A" opacity=".7" />)}
          <path d="M40 500 q30 -8 60 0 M600 520 q30 -8 60 0 M820 505 q30 -8 60 0" stroke="#C9A86A" strokeWidth="2" fill="none" />
          {/* корали і водорості */}
          {coral(40, 476, '#F28C9B', .9)}
          {coral(950, 470, '#F6A75E', .8)}
          <g {...hit('plant')}>{weed(470, 210)}{weed(492, 250, '#5FAE68', 12)}{weed(514, 190, '#46895A', 9)}</g>
          {weed(870, 150, '#5FAE68', 9)}{weed(888, 120)}
          {[[300, 470], [620, 465]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>{[-12, -4, 4, 12].map((d) => <path key={d} d={`M${d} 0 q${d * .6} -18 ${d * .9} -30`} stroke="#E57AA6" strokeWidth="5" fill="none" strokeLinecap="round" />)}<ellipse cx="0" cy="2" rx="16" ry="6" fill="#C9568A" /></g>)}
          {/* восьминіг за маленьким каменем */}
          <g {...hit('octopus')}>
            {[-28, -10, 10, 28].map((d, i) => <path key={i} d={`M${225 + d} 455 c ${d * .4} 14, ${d * .9} 10, ${d * 1.2} 22`} stroke="#9165B0" strokeWidth="10" fill="none" strokeLinecap="round" />)}
            <path d="M183 452 C 178 400, 200 386, 225 386 C 250 386, 272 400, 267 452 Z" fill="url(#gOcto)" stroke={O} strokeWidth="2.5" />
            <ellipse cx="212" cy="400" rx="10" ry="6" fill="#fff" opacity=".35" />
            <circle cx="210" cy="428" r="8" fill="#fff" stroke={O} strokeWidth="2" /><circle cx="240" cy="428" r="8" fill="#fff" stroke={O} strokeWidth="2" />
            <circle cx="211" cy="430" r="4" fill={O} /><circle cx="241" cy="430" r="4" fill={O} /><circle cx="209" cy="428" r="1.5" fill="#fff" /><circle cx="239" cy="428" r="1.5" fill="#fff" />
            <ellipse cx="200" cy="442" rx="6" ry="3" fill="#F5A0C0" opacity=".7" /><ellipse cx="250" cy="442" rx="6" ry="3" fill="#F5A0C0" opacity=".7" />
          </g>
          <g {...hit('smallRock')}>
            <path d="M150 505 C 152 470, 178 448, 222 450 C 270 452, 300 470, 304 505 Z" fill="url(#gRock)" stroke={O} strokeWidth="2.5" />
            <path d="M180 470 c 18 -12, 40 -14, 58 -8" stroke="#fff" strokeWidth="3" opacity=".35" fill="none" strokeLinecap="round" />
            <path d="M160 500 c 20 -6, 40 -4, 56 2" stroke="#5B8F4E" strokeWidth="5" fill="none" opacity=".7" />
          </g>
          {/* ключ і великий камінь */}
          {!f.has('key') && <g {...hit('key')} opacity={f.has('rock') ? 1 : 0} pointerEvents={f.has('rock') ? 'auto' : 'none'}>
            <circle cx="740" cy="488" r="34" fill="url(#gGlow)" />
            <circle cx="728" cy="488" r="15" fill="none" stroke="url(#gGold)" strokeWidth="9" /><circle cx="728" cy="488" r="15" fill="none" stroke={O} strokeWidth="1.5" />
            <path d="M743 488 L800 488 M786 488 L786 504 M797 488 L797 500" stroke="url(#gGold)" strokeWidth="9" strokeLinecap="round" />
          </g>}
          <g {...hit('bigRock')} style={{ transform: f.has('rock') ? 'translateX(150px)' : 'none', transition: 'transform .7s cubic-bezier(.3,1.4,.5,1)' }}>
            <path d="M640 508 C 636 450, 676 402, 752 400 C 830 398, 868 450, 862 508 Z" fill="url(#gRock)" stroke={O} strokeWidth="2.5" />
            <path d="M680 440 c 26 -20, 62 -26, 96 -16" stroke="#fff" strokeWidth="4" opacity=".3" fill="none" strokeLinecap="round" />
            <path d="M770 470 l18 8 l-6 14 M700 480 l-14 10" stroke={O} strokeWidth="2" opacity=".35" fill="none" />
            <path d="M650 500 c 30 -10, 70 -8, 100 0" stroke="#5B8F4E" strokeWidth="6" fill="none" opacity=".7" />
          </g>
          {/* жовта скриня */}
          <g {...hit('yellowChest')}>
            {f.has('chest') && <ellipse cx="430" cy="455" rx="70" ry="40" fill="url(#gGlow)" />}
            <rect x="368" y="470" width="124" height="72" rx="8" fill="url(#gWood)" stroke={O} strokeWidth="2.5" />
            <path d="M368 494 H492 M368 518 H492" stroke={O} strokeWidth="1.5" opacity=".35" />
            <path d={f.has('chest') ? 'M368 470 L360 418 C 400 400, 460 400, 500 418 L492 470 Z' : 'M368 470 C 380 434, 480 434, 492 470 Z'} fill="url(#gWood)" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M380 470 V542 M480 470 V542" stroke="url(#gGold)" strokeWidth="9" /><path d="M380 470 V542 M480 470 V542" stroke={O} strokeWidth="1" opacity=".5" />
            <rect x="418" y="484" width="24" height="26" rx="5" fill="url(#gGold)" stroke={O} strokeWidth="2" /><circle cx="430" cy="495" r="3.5" fill={O} />
          </g>
          {f.has('chest') && !f.has('pearl') && <g {...hit('pearl')}>
            <path d="M404 462 C 410 438, 450 438, 456 462 Z" fill="#B9A6C9" stroke={O} strokeWidth="2" />
            <circle cx="430" cy="448" r="15" fill="url(#gPearl)" stroke={O} strokeWidth="2" /><circle cx="424" cy="442" r="4" fill="#fff" />
          </g>}
          {/* червона скриня */}
          <g {...hit('redChest')}>
            <rect x="896" y="484" width="88" height="58" rx="7" fill="url(#gWoodR)" stroke={O} strokeWidth="2.5" />
            <path d="M896 484 C 906 456, 974 456, 984 484 Z" fill="url(#gWoodR)" stroke={O} strokeWidth="2.5" />
            <path d="M910 484 V542 M970 484 V542" stroke="#8A8A8A" strokeWidth="6" />
            <rect x="932" y="496" width="16" height="18" rx="4" fill="#8A8A8A" stroke={O} strokeWidth="1.5" />
          </g>
          {/* зірки, мушля, краб */}
          <g {...hit('star1')}>{star(105, 548, 1, 12)}</g>
          <g {...hit('star2')}>{star(612, 560, .9, -20)}</g>
          <g {...hit('star3')}>{star(318, 566, .8, 40)}</g>
          <g {...hit('shell')}>
            <path d="M538 572 C 540 540, 584 540, 586 572 Z" fill="#F9DCCB" stroke={O} strokeWidth="2" />
            {[548, 556, 562, 568, 576].map((x, i) => <path key={i} d={`M562 572 L${x} 548`} stroke="#D9A994" strokeWidth="1.5" />)}
          </g>
          <g {...hit('crab')}>
            {[-1, 1].map((sd) => [0, 1, 2].map((k) => <path key={`${sd}${k}`} d={`M${560 + sd * 30} ${510 + k * 6} q${sd * 16} 4 ${sd * 24} ${14 + k * 2}`} stroke="#C7461F" strokeWidth="5" fill="none" strokeLinecap="round" />))}
            <path d="M530 498 C 516 486, 506 476, 510 462 M590 498 C 604 486, 614 476, 610 462" stroke="#C7461F" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M500 468 C 492 452, 506 438, 520 446 L512 458 L524 456 C 526 470, 512 476, 500 468 Z" fill="url(#gCrab)" stroke={O} strokeWidth="2" />
            <path d="M620 468 C 628 452, 614 438, 600 446 L608 458 L596 456 C 594 470, 608 476, 620 468 Z" fill="url(#gCrab)" stroke={O} strokeWidth="2" />
            <ellipse cx="560" cy="506" rx="42" ry="26" fill="url(#gCrab)" stroke={O} strokeWidth="2.5" />
            <ellipse cx="550" cy="496" rx="16" ry="6" fill="#fff" opacity=".3" />
            <path d="M548 486 V472 M572 486 V472" stroke={O} strokeWidth="2.5" />
            <circle cx="548" cy="470" r="7" fill="#fff" stroke={O} strokeWidth="2" /><circle cx="572" cy="470" r="7" fill="#fff" stroke={O} strokeWidth="2" />
            <circle cx="549" cy="471" r="3.5" fill={O} /><circle cx="573" cy="471" r="3.5" fill={O} />
            <path d="M552 514 q8 6 16 0" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
          {/* рибки */}
          <g {...hit('redFish')}>{fish(300, 200, 'gRed', '#E2584A')}</g>
          <g {...hit('yellowFish')}>{fish(745, 160, 'gYellow', '#E9A41F', true, .9)}</g>
          <g {...hit('blueFish')}>{fish(575, 330, 'gBlue', '#3C76B8', true)}</g>
          {/* котик-нирець */}
          <g transform="translate(110 250)">
            <path d="M44 40 C 70 60, 90 40, 96 10" stroke="#8A8A8A" strokeWidth="7" fill="none" strokeLinecap="round" />
            <circle cx="0" cy="0" r="64" fill="#E6F6FA" fillOpacity=".35" stroke={O} strokeWidth="3" />
            <path d="M-34 -18 L-28 -50 L-8 -30 Z M34 -18 L28 -50 L8 -30 Z" fill="#FFFDF8" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M-28 -44 L-24 -34 M28 -44 L24 -34" stroke="#F5A0C0" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="0" cy="2" rx="40" ry="33" fill="#FFFDF8" stroke={O} strokeWidth="2.5" />
            <ellipse cx="-14" cy="-3" rx="5" ry="6" fill={O} /><ellipse cx="14" cy="-3" rx="5" ry="6" fill={O} />
            <circle cx="-12" cy="-5" r="1.8" fill="#fff" /><circle cx="16" cy="-5" r="1.8" fill="#fff" />
            <path d="M-3 8 L3 8 L0 11 Z" fill="#F08AA8" />
            <path d="M0 11 q-6 7 -11 3 M0 11 q6 7 11 3" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="-24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" /><ellipse cx="24" cy="10" rx="7" ry="4" fill="#F5A0C0" opacity=".6" />
            <path d="M-40 6 L-58 1 M-40 12 L-58 14 M40 6 L58 1 M40 12 L58 14" stroke={O} strokeWidth="1.8" />
            <path d="M-40 -40 C -20 -60, 20 -62, 42 -44" stroke="#fff" strokeWidth="6" opacity=".55" fill="none" strokeLinecap="round" />
            <path d="M-30 34 C -10 44, 10 44, 30 34" stroke="#8A8A8A" strokeWidth="8" fill="none" strokeLinecap="round" />
            {f.has('key') && <g transform="translate(36 52) scale(.55)"><circle cx="0" cy="0" r="15" fill="none" stroke="url(#gGold)" strokeWidth="9" /><path d="M15 0 L56 0 M44 0 L44 14" stroke="url(#gGold)" strokeWidth="9" strokeLinecap="round" /></g>}
            {f.has('pearl') && <circle cx="-46" cy="48" r="11" fill="url(#gPearl)" stroke={O} strokeWidth="2" />}
          </g>
        </svg>
  );
}

export const SEA: QuestLocation = {
  id: 'sea', level: 'A1-A2', Scene,
  title: { uk: 'Під водою', ru: 'Под водой', en: 'Under the sea' },
  place: { uk: 'Дно моря', ru: 'Дно моря', en: 'The sea floor' },
  finale: 'You found everything! Thank you, friend!',
  tasks: [
    { en: 'Hi! I am Bubbles. Find the red fish.', uk: 'Привіт! Я Бульбашка. Знайди червону рибку.', ru: 'Привет! Я Пузырёк. Найди красную рыбку.', target: ['redFish'] },
    { en: 'Where is the crab? Touch the crab.', uk: 'Де краб? Торкнися краба.', ru: 'Где краб? Коснись краба.', target: ['crab'] },
    { en: 'Find three starfish.', uk: 'Знайди три морські зірки.', ru: 'Найди три морские звезды.', target: ['star1', 'star2', 'star3'], all: true },
    { en: 'The key is under the big rock. Move the big rock.', uk: 'Ключ під великим каменем. Посунь великий камінь.', ru: 'Ключ под большим камнем. Сдвинь большой камень.', target: ['bigRock'], set: 'rock' },
    { en: 'Great! Now take the key.', uk: 'Чудово! Тепер візьми ключ.', ru: 'Отлично! Теперь возьми ключ.', target: ['key'], set: 'key' },
    { en: 'Open the yellow chest.', uk: 'Відкрий жовту скриню.', ru: 'Открой жёлтый сундук.', target: ['yellowChest'], set: 'chest' },
    { en: 'Bring me something round and white.', uk: 'Принеси мені щось кругле й біле.', ru: 'Принеси мне что-то круглое и белое.', target: ['pearl'], set: 'pearl' },
    { en: 'Find the blue fish next to the green plant.', uk: 'Знайди синю рибку біля зеленої рослини.', ru: 'Найди синюю рыбку возле зелёного растения.', target: ['blueFish'] },
    { en: 'Who is behind the small rock? Touch it.', uk: 'Хто ховається за маленьким каменем? Торкнися його.', ru: 'Кто прячется за маленьким камнем? Коснись его.', target: ['octopus'] },
  ],
};
