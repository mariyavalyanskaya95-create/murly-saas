// Локація «Моя кімната»: лампа, шафа, книжки, м’яч під ліжком
import { Bubbles, Lg, O } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

function Scene({ hit, flags: f }: SceneProps) {
  const night = f.has('curtains');
  const book = (x: number, h: number, c: string) => <rect x={x} y={250 - h} width="18" height={h} rx="2" fill={c} stroke={O} strokeWidth="2" />;
  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="Bedroom">
      <defs>
        <Lg id="bWall" a="#E8F0FA" b="#D6E3F2" />
        <Lg id="bFloor" a="#C9A67B" b="#A78258" />
        <Lg id="bWood" a="#D7A46C" b="#A8733E" />
        <Lg id="bBed" a="#9FC7E8" b="#6F9FCB" />
        <Lg id="bSky" a={night ? '#1F2D52' : '#BFE3F5'} b={night ? '#3B4F80' : '#E9F6FB'} />
        <Lg id="bGreen" a="#9AD48B" b="#5FA65A" />
        <Lg id="bRug" a="#F6B5C9" b="#E58FAE" />
        <radialGradient id="bLamp" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#FFF4B0" stopOpacity=".95" /><stop offset="1" stopColor="#FFF4B0" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#bWall)" />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={40 + i * 85} cy={i % 2 ? 60 : 110} r="3" fill="#B9CDE6" />)}
      <rect y="460" width="1000" height="140" fill="url(#bFloor)" stroke={O} strokeWidth="2.5" />
      <ellipse cx="520" cy="530" rx="230" ry="44" fill="url(#bRug)" stroke={O} strokeWidth="2" />
      {/* вікно і штори */}
      <rect x="400" y="60" width="200" height="170" rx="10" fill="url(#bSky)" stroke={O} strokeWidth="3" />
      {night ? <><circle cx="545" cy="105" r="20" fill="#FFF3B0" />{[[440, 90], [470, 150], [570, 180], [500, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill="#fff" />)}</> : <circle cx="545" cy="105" r="22" fill="#FFD866" />}
      <path d="M500 60 V230 M400 145 H600" stroke={O} strokeWidth="3" />
      <g {...hit('curtains')}>
        {night
          ? <path d="M390 50 H610 V240 H390 Z" fill="#7E6BB5" stroke={O} strokeWidth="2.5" />
          : <path d="M385 50 C 430 90, 430 190, 395 240 L385 240 Z M615 50 C 570 90, 570 190, 605 240 L615 240 Z" fill="#9B86D1" stroke={O} strokeWidth="2.5" />}
        {night && <path d="M500 50 V240" stroke={O} strokeWidth="2" />}
        <rect x="375" y="42" width="250" height="10" rx="5" fill="#8E5A2C" stroke={O} strokeWidth="2" />
      </g>
      {/* годинник */}
      <g {...hit('clock')}>
        <circle cx="300" cy="110" r="38" fill="#fff" stroke={O} strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M300 ${78 + 0} V86`} transform={`rotate(${i * 90} 300 110)`} stroke={O} strokeWidth="3" />)}
        <path d="M300 110 V86 M300 110 L318 116" stroke={O} strokeWidth="3.5" strokeLinecap="round" />
      </g>
      {/* полиця з книжками */}
      <rect x="680" y="250" width="240" height="14" rx="4" fill="url(#bWood)" stroke={O} strokeWidth="2" />
      <g {...hit('book1')}>{book(700, 60, '#E2705A')}</g>
      <g {...hit('book2')}>{book(722, 72, '#4A86C5')}</g>
      <g {...hit('book3')}>{book(744, 54, '#5FA65A')}</g>
      <g {...hit('plantPot')}><path d="M860 250 L852 214 H894 L886 250 Z" fill="#D9714A" stroke={O} strokeWidth="2" /><path d="M872 214 C 860 190, 866 176, 874 170 M874 214 C 884 188, 896 184, 904 178" stroke="#5FA65A" strokeWidth="6" fill="none" strokeLinecap="round" /></g>
      {/* шафа */}
      <g {...hit('wardrobe')}>
        <rect x="40" y="170" width="210" height="300" rx="10" fill="url(#bWood)" stroke={O} strokeWidth="3" />
        {!f.has('wardrobe') && <><path d="M145 170 V470" stroke={O} strokeWidth="2.5" /><circle cx="132" cy="320" r="6" fill="#FFD866" stroke={O} strokeWidth="1.5" /><circle cx="158" cy="320" r="6" fill="#FFD866" stroke={O} strokeWidth="1.5" /></>}
      </g>
      {f.has('wardrobe') && <g>
        <rect x="52" y="182" width="186" height="276" rx="6" fill="#6B4523" stroke={O} strokeWidth="2" />
        <path d="M60 210 H230" stroke="#B9B9B9" strokeWidth="4" />
        <path d="M40 170 L0 190 L0 470 L40 470 Z M250 170 L290 190 L290 470 L250 470 Z" fill="url(#bWood)" stroke={O} strokeWidth="2.5" />
        <g><path d="M80 212 L70 230 L80 236 V300 H124 V236 L134 230 L124 212 C 116 220, 88 220, 80 212 Z" fill="#E36F3C" stroke={O} strokeWidth="2" /></g>
        {!f.has('shirt') && <g {...hit('shirt')}><path d="M150 212 L138 232 L150 238 V306 H204 V238 L216 232 L204 212 C 194 222, 160 222, 150 212 Z" fill="url(#bGreen)" stroke={O} strokeWidth="2" /></g>}
      </g>}
      {/* ліжко, ведмедик, м’яч під ліжком */}
      <g {...hit('ball')}>
        <circle cx="560" cy="452" r="22" fill="#F2C94C" stroke={O} strokeWidth="2.2" />
        <path d="M538 452 C 550 440, 570 440, 582 452 M560 430 C 552 444, 552 460, 560 474" stroke="#E36F3C" strokeWidth="3" fill="none" />
      </g>
      <rect x="380" y="330" width="420" height="80" rx="14" fill="url(#bBed)" stroke={O} strokeWidth="3" />
      <rect x="370" y="270" width="26" height="200" rx="8" fill="url(#bWood)" stroke={O} strokeWidth="2.5" />
      <rect x="790" y="300" width="22" height="170" rx="8" fill="url(#bWood)" stroke={O} strokeWidth="2.5" />
      <path d="M396 410 V470 M790 410 V470" stroke="#8E5A2C" strokeWidth="10" />
      <rect x="402" y="300" width="110" height="42" rx="18" fill="#fff" stroke={O} strokeWidth="2.5" />
      <path d="M520 330 C 600 300, 700 300, 790 330" fill="#B8D8F0" stroke={O} strokeWidth="2.5" />
      <g {...hit('teddy')}>
        <circle cx="640" cy="282" r="12" fill="#C98A4B" stroke={O} strokeWidth="2" /><circle cx="676" cy="282" r="12" fill="#C98A4B" stroke={O} strokeWidth="2" />
        <circle cx="658" cy="300" r="26" fill="#D9A26A" stroke={O} strokeWidth="2.2" />
        <ellipse cx="658" cy="338" rx="26" ry="22" fill="#D9A26A" stroke={O} strokeWidth="2.2" />
        <ellipse cx="658" cy="308" rx="10" ry="7" fill="#F2D2A8" /><circle cx="648" cy="296" r="3" fill={O} /><circle cx="668" cy="296" r="3" fill={O} /><circle cx="658" cy="306" r="3" fill={O} />
      </g>
      {/* лампа на тумбочці */}
      <rect x="850" y="380" width="110" height="90" rx="8" fill="url(#bWood)" stroke={O} strokeWidth="2.5" />
      {f.has('lamp') && <circle cx="905" cy="320" r="110" fill="url(#bLamp)" />}
      <g {...hit('lamp')}>
        <path d="M905 380 V330" stroke={O} strokeWidth="5" />
        <path d="M870 330 L885 280 H925 L940 330 Z" fill={f.has('lamp') ? '#FFE680' : '#F6D7C3'} stroke={O} strokeWidth="2.5" />
        <ellipse cx="905" cy="382" rx="22" ry="6" fill="#8E5A2C" stroke={O} strokeWidth="2" />
      </g>
      {/* шкарпетки */}
      <g {...hit('socks')}>
        <path d="M300 520 V540 C 300 552, 318 556, 330 552 L334 540 L316 538 V520 Z" fill="#F28C9B" stroke={O} strokeWidth="2" />
        <path d="M330 516 V536 C 330 548, 348 552, 360 548 L364 536 L346 534 V516 Z" fill="#F28C9B" stroke={O} strokeWidth="2" />
        <path d="M300 524 H316 M330 520 H346" stroke="#fff" strokeWidth="3" />
      </g>
      <Bubbles x={180} y={530} s={.8} />
      {night && <rect width="1000" height="600" fill="#1F2D52" opacity=".25" pointerEvents="none" />}
    </svg>
  );
}

export const BEDROOM: QuestLocation = {
  id: 'bedroom', level: 'A1-A2', Scene,
  title: { uk: 'Моя кімната', ru: 'Моя комната', en: 'My bedroom' },
  place: { uk: 'Квартира', ru: 'Квартира', en: 'Flat' },
  finale: 'Good night! Thank you for tidying my room!',
  tasks: [
    { en: 'This is my bedroom. Turn on the lamp.', uk: 'Це моя кімната. Увімкни лампу.', ru: 'Это моя комната. Включи лампу.', target: ['lamp'], set: 'lamp' },
    { en: 'Find the teddy bear on the bed.', uk: 'Знайди плюшевого ведмедика на ліжку.', ru: 'Найди плюшевого мишку на кровати.', target: ['teddy'] },
    { en: 'Open the wardrobe.', uk: 'Відкрий шафу.', ru: 'Открой шкаф.', target: ['wardrobe'], set: 'wardrobe' },
    { en: 'Take the green T-shirt.', uk: 'Візьми зелену футболку.', ru: 'Возьми зелёную футболку.', target: ['shirt'], set: 'shirt' },
    { en: 'Find three books on the shelf.', uk: 'Знайди три книжки на полиці.', ru: 'Найди три книги на полке.', target: ['book1', 'book2', 'book3'], all: true },
    { en: 'Where is the ball? It is under the bed.', uk: 'Де м’яч? Він під ліжком.', ru: 'Где мяч? Он под кроватью.', target: ['ball'] },
    { en: 'What time is it? Touch the clock.', uk: 'Котра година? Торкнися годинника.', ru: 'Который час? Коснись часов.', target: ['clock'] },
    { en: 'Find a pair of pink socks.', uk: 'Знайди пару рожевих шкарпеток.', ru: 'Найди пару розовых носков.', target: ['socks'] },
    { en: 'It is night now. Close the curtains.', uk: 'Вже ніч. Засунь штори.', ru: 'Уже ночь. Задвинь шторы.', target: ['curtains'], set: 'curtains' },
  ],
};
