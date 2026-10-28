// Локація «У школі»: дошка, глобус, пенал, рюкзак, стільці
import { Bubbles, Lg, O } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

function Scene({ hit, flags: f }: SceneProps) {
  const chair = (x: number, y: number) => (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-26" y="-60" width="52" height="40" rx="6" fill="url(#cChair)" stroke={O} strokeWidth="2.2" />
      <rect x="-30" y="-20" width="60" height="12" rx="4" fill="url(#cChair)" stroke={O} strokeWidth="2.2" />
      <path d="M-24 -8 V30 M24 -8 V30" stroke="#5A6B7A" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="Classroom">
      <defs>
        <Lg id="cWall" a="#FDF3E1" b="#F3E2C3" />
        <Lg id="cFloor" a="#B9C7D3" b="#93A4B3" />
        <Lg id="cBoard" a="#3E6B57" b="#2D5242" />
        <Lg id="cWood" a="#D7A46C" b="#A8733E" />
        <Lg id="cChair" a="#8FC3EC" b="#4A86C5" />
        <Lg id="cBag" a="#FF9C6B" b="#D2552F" />
        <Lg id="cSky" a="#BFE3F5" b="#E9F6FB" />
        <radialGradient id="cGlobe" cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#9DD3F5" /><stop offset="1" stopColor="#3E86C2" /></radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#cWall)" />
      <rect y="460" width="1000" height="140" fill="url(#cFloor)" stroke={O} strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${i * 100} 460 V600`} stroke="#7F91A1" strokeWidth="1.5" opacity=".5" />)}
      {/* дошка */}
      <g {...hit('board')}>
        <rect x="250" y="50" width="420" height="220" rx="10" fill="url(#cBoard)" stroke="#8E5A2C" strokeWidth="12" />
        <rect x="250" y="50" width="420" height="220" rx="10" fill="none" stroke={O} strokeWidth="2" />
        {f.has('written') && <text x="460" y="175" textAnchor="middle" fontSize="54" fill="#fff" fontFamily="'Comic Sans MS', 'Chalkboard', cursive">Hello!</text>}
        {!f.has('written') && <path d="M290 100 q30 -10 60 0 M290 130 q50 -8 90 0" stroke="#fff" strokeWidth="3" opacity=".25" fill="none" />}
      </g>
      <rect x="260" y="276" width="400" height="10" rx="3" fill="url(#cWood)" stroke={O} strokeWidth="1.5" />
      <g {...hit('chalk')}><rect x="300" y="266" width="34" height="9" rx="3" fill="#fff" stroke={O} strokeWidth="1.5" /></g>
      <g {...hit('sponge')}><rect x="600" y="262" width="40" height="14" rx="3" fill="#FFD866" stroke={O} strokeWidth="1.5" /></g>
      {/* годинник, вікно, карта */}
      <circle cx="140" cy="90" r="34" fill="#fff" stroke={O} strokeWidth="3" /><path d="M140 90 V68 M140 90 L156 98" stroke={O} strokeWidth="3" strokeLinecap="round" />
      <rect x="740" y="60" width="200" height="170" rx="10" fill="url(#cSky)" stroke={O} strokeWidth="3" />
      <path d="M840 60 V230 M740 145 H940" stroke={O} strokeWidth="3" />
      <path d="M760 220 C 790 180, 830 186, 860 220 Z" fill="#9CCB86" /><circle cx="900" cy="100" r="18" fill="#FFD866" />
      {/* вчительський стіл, глобус */}
      <rect x="620" y="330" width="300" height="24" rx="6" fill="url(#cWood)" stroke={O} strokeWidth="3" />
      <rect x="640" y="354" width="260" height="106" rx="6" fill="url(#cWood)" stroke={O} strokeWidth="3" />
      <g {...hit('globe')}>
        <path d="M700 330 V310" stroke={O} strokeWidth="5" /><ellipse cx="700" cy="330" rx="22" ry="6" fill="#8E5A2C" stroke={O} strokeWidth="2" />
        <circle cx="700" cy="270" r="40" fill="url(#cGlobe)" stroke={O} strokeWidth="2.5" />
        <path d="M680 250 C 690 240, 706 244, 708 256 C 700 266, 688 262, 680 250 Z M712 276 C 724 270, 732 282, 726 292 C 716 296, 710 288, 712 276 Z" fill="#7CC27B" stroke={O} strokeWidth="1.5" />
        <path d="M655 270 C 655 230, 745 230, 745 270" fill="none" stroke="#C9A12E" strokeWidth="4" />
      </g>
      <g {...hit('apple')}><circle cx="800" cy="318" r="14" fill="#E2483A" stroke={O} strokeWidth="2" /><path d="M800 304 l4 -8" stroke={O} strokeWidth="2.5" /></g>
      <g {...hit('books')}><rect x="840" y="300" width="60" height="12" rx="2" fill="#4A86C5" stroke={O} strokeWidth="1.8" /><rect x="844" y="312" width="56" height="12" rx="2" fill="#E36F3C" stroke={O} strokeWidth="1.8" /><rect x="838" y="324" width="62" height="8" rx="2" fill="#5FA65A" stroke={O} strokeWidth="1.8" /></g>
      {/* парта учня з пеналом */}
      <rect x="290" y="380" width="250" height="20" rx="6" fill="url(#cWood)" stroke={O} strokeWidth="3" />
      <path d="M310 400 V470 M520 400 V470" stroke="#5A6B7A" strokeWidth="8" strokeLinecap="round" />
      <g {...hit('pencilCase')}>
        <rect x="330" y="352" width="110" height="30" rx="12" fill="#9B86D1" stroke={O} strokeWidth="2.2" />
        {!f.has('case') ? <path d="M336 360 H434" stroke={O} strokeWidth="2" strokeDasharray="4 4" /> : <path d="M330 362 C 360 344, 410 344, 440 362" fill="#7E6BB5" stroke={O} strokeWidth="2" />}
      </g>
      {f.has('case') && <>
        <g {...hit('redPencil')}><path d="M345 356 L395 326 L400 334 L350 364 Z" fill="#E2483A" stroke={O} strokeWidth="1.8" /><path d="M395 326 L408 322 L400 334 Z" fill="#F6D7C3" stroke={O} strokeWidth="1.5" /></g>
        <g {...hit('bluePencil')}><path d="M370 360 L420 330 L425 338 L375 368 Z" fill="#4A86C5" stroke={O} strokeWidth="1.8" /><path d="M420 330 L433 326 L425 338 Z" fill="#F6D7C3" stroke={O} strokeWidth="1.5" /></g>
      </>}
      {/* рюкзак і лінійка */}
      <g {...hit('backpack')}>
        <path d="M120 470 V380 C 120 350, 200 350, 200 380 V470 Z" fill="url(#cBag)" stroke={O} strokeWidth="2.5" />
        <rect x="134" y="410" width="52" height="40" rx="8" fill="#E36F3C" stroke={O} strokeWidth="2" />
        <path d="M140 360 C 140 340, 180 340, 180 360" fill="none" stroke={O} strokeWidth="4" />
        {f.has('bag') && <path d="M126 384 C 140 370, 180 370, 194 384" fill="#8E3A20" stroke={O} strokeWidth="2" />}
      </g>
      {f.has('bag') && !f.has('ruler') && <g {...hit('ruler')}>
        <rect x="150" y="300" width="18" height="90" rx="3" fill="#FFD866" stroke={O} strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <path key={i} d={`M150 ${310 + i * 11} h${i % 2 ? 6 : 10}`} stroke={O} strokeWidth="1.5" />)}
      </g>}
      {/* стільці */}
      <g {...hit('chair1')}>{chair(370, 470)}</g>
      <g {...hit('chair2')}>{chair(470, 470)}</g>
      <g {...hit('chair3')}>{chair(590, 520)}</g>
      <g {...hit('chair4')}>{chair(940, 520)}</g>
      {/* вазон */}
      <g {...hit('plant')}>
        <path d="M30 470 L22 420 H82 L74 470 Z" fill="#D9714A" stroke={O} strokeWidth="2.2" />
        <path d="M52 420 C 30 380, 40 350, 50 340 M52 420 C 70 380, 88 370, 96 360 M52 420 C 52 390, 56 370, 62 350" stroke={f.has('watered') ? '#4FA45A' : '#9DB27C'} strokeWidth="8" fill="none" strokeLinecap="round" />
        {f.has('watered') && <circle cx="62" cy="346" r="9" fill="#F28C9B" stroke={O} strokeWidth="1.5" />}
      </g>
      <Bubbles x={230} y={545} s={.75} />
    </svg>
  );
}

export const CLASSROOM: QuestLocation = {
  id: 'classroom', level: 'A1-A2', Scene,
  title: { uk: 'У школі', ru: 'В школе', en: 'At school' },
  place: { uk: 'Клас', ru: 'Класс', en: 'Classroom' },
  finale: 'Great job! You are the best student in the class!',
  tasks: [
    { en: 'Welcome to school! Find the board.', uk: 'Ласкаво просимо до школи! Знайди дошку.', ru: 'Добро пожаловать в школу! Найди доску.', target: ['board'] },
    { en: 'Let’s write on the board. Take the chalk.', uk: 'Напишімо на дошці. Візьми крейду.', ru: 'Давай напишем на доске. Возьми мел.', target: ['chalk'], set: 'written' },
    { en: 'Find the globe on the teacher’s desk.', uk: 'Знайди глобус на столі вчителя.', ru: 'Найди глобус на столе учителя.', target: ['globe'] },
    { en: 'Open the purple pencil case.', uk: 'Відкрий фіолетовий пенал.', ru: 'Открой фиолетовый пенал.', target: ['pencilCase'], set: 'case' },
    { en: 'Take the red pencil.', uk: 'Візьми червоний олівець.', ru: 'Возьми красный карандаш.', target: ['redPencil'] },
    { en: 'The ruler is in the backpack. Open the backpack.', uk: 'Лінійка в рюкзаку. Відкрий рюкзак.', ru: 'Линейка в рюкзаке. Открой рюкзак.', target: ['backpack'], set: 'bag' },
    { en: 'Now take the ruler.', uk: 'Тепер візьми лінійку.', ru: 'Теперь возьми линейку.', target: ['ruler'], set: 'ruler' },
    { en: 'Count the chairs. Find four chairs.', uk: 'Порахуй стільці. Знайди чотири стільці.', ru: 'Посчитай стулья. Найди четыре стула.', target: ['chair1', 'chair2', 'chair3', 'chair4'], all: true },
    { en: 'The plant is thirsty. Water the plant.', uk: 'Рослина хоче пити. Полий рослину.', ru: 'Растение хочет пить. Полей растение.', target: ['plant'], set: 'watered' },
  ],
};
