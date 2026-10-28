// Локація «Кухня»: холодильник, чашки, кран, мишка під столом
import { Bubbles, Lg, O } from '../shared';
import type { QuestLocation, SceneProps } from '../types';

function Scene({ hit, flags: f }: SceneProps) {
  const apple = (x: number, y: number, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -14 C -18 -24, -30 -4, -22 12 C -14 26, -4 24, 0 20 C 4 24, 14 26, 22 12 C 30 -4, 18 -24, 0 -14 Z" fill="url(#kApple)" stroke={O} strokeWidth="2.2" />
      <path d="M0 -14 C 0 -22, 2 -26, 6 -30" stroke={O} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M4 -24 C 12 -32, 20 -28, 20 -24 C 14 -20, 8 -20, 4 -24 Z" fill="#6DB35E" stroke={O} strokeWidth="1.8" />
      <ellipse cx="-10" cy="-6" rx="5" ry="3" fill="#fff" opacity=".5" />
    </g>
  );
  const cup = (x: number, y: number, fill: string) => (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-18 -20 H18 L14 14 C 12 20, -12 20, -14 14 Z" fill={fill} stroke={O} strokeWidth="2.2" />
      <path d="M18 -12 C 30 -12, 30 6, 16 6" fill="none" stroke={O} strokeWidth="2.5" />
      <ellipse cx="0" cy="-20" rx="18" ry="4" fill="#fff" opacity=".35" />
    </g>
  );
  return (
    <svg viewBox="0 0 1000 600" className="sq-svg" role="img" aria-label="Kitchen">
      <defs>
        <Lg id="kWall" a="#FFF6E4" b="#F6E5C6" />
        <Lg id="kFloor" a="#D9B98C" b="#BE9665" />
        <Lg id="kFridge" a="#F4F7F8" b="#CFD8DC" />
        <Lg id="kWood" a="#D29A62" b="#A26A38" />
        <Lg id="kApple" a="#FF7A6B" b="#D2382E" />
        <Lg id="kBlue" a="#8FC3EC" b="#4A86C5" />
        <Lg id="kRed" a="#FF8F7A" b="#D24B3A" />
        <Lg id="kBanana" a="#FFE680" b="#F2C230" />
        <Lg id="kSky" a="#BFE3F5" b="#E9F6FB" />
        <Lg id="kSteel" a="#E3E7EA" b="#A9B2B8" />
        <Lg id="kMilk" a="#FFFFFF" b="#DCE6EE" />
      </defs>
      {/* стіна з плиткою, підлога */}
      <rect width="1000" height="600" fill="url(#kWall)" />
      {Array.from({ length: 8 }, (_, r) => Array.from({ length: 20 }, (_, c) => <rect key={`${r}-${c}`} x={c * 50 + (r % 2) * 25 - 25} y={250 + r * 22} width="48" height="20" rx="3" fill="#fff" opacity=".55" />))}
      <rect y="440" width="1000" height="160" fill="url(#kFloor)" stroke={O} strokeWidth="2.5" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => <path key={i} d={`M${i * 110} 440 L${i * 110 - 40} 600`} stroke="#A9814F" strokeWidth="2" opacity=".5" />)}
      {/* вікно */}
      <g>
        <rect x="380" y="50" width="240" height="160" rx="10" fill="url(#kSky)" stroke={O} strokeWidth="3" />
        <circle cx="560" cy="95" r="22" fill="#FFD866" />
        <path d="M400 190 C 430 160, 470 170, 500 190 Z" fill="#9CCB86" />
        <path d="M500 50 V210 M380 130 H620" stroke={O} strokeWidth="3" />
        <path d="M370 40 C 420 70, 420 160, 380 220 L370 220 Z M630 40 C 580 70, 580 160, 620 220 L630 220 Z" fill="#F28C9B" stroke={O} strokeWidth="2" />
      </g>
      {/* полиця з чашками */}
      <rect x="660" y="150" width="220" height="14" rx="4" fill="url(#kWood)" stroke={O} strokeWidth="2" />
      <g {...hit('redCup')}>{cup(700, 130, 'url(#kRed)')}</g>
      <g {...hit('blueCup')}>{cup(770, 130, 'url(#kBlue)')}</g>
      <g {...hit('jar')}><rect x="822" y="102" width="40" height="48" rx="8" fill="#FFF3D1" stroke={O} strokeWidth="2" /><rect x="818" y="96" width="48" height="12" rx="4" fill="#E36F3C" stroke={O} strokeWidth="2" /></g>
      {/* холодильник */}
      <g {...hit('fridge')}>
        <rect x="60" y="120" width="190" height="330" rx="16" fill="url(#kFridge)" stroke={O} strokeWidth="3" />
        <path d="M60 240 H250" stroke={O} strokeWidth="2.5" />
        {!f.has('fridge') && <><rect x="225" y="160" width="10" height="50" rx="5" fill="#9AA6AD" stroke={O} strokeWidth="1.5" /><rect x="225" y="270" width="10" height="70" rx="5" fill="#9AA6AD" stroke={O} strokeWidth="1.5" /></>}
        <rect x="80" y="140" width="40" height="30" rx="4" fill="#FFD866" stroke={O} strokeWidth="1.5" transform="rotate(-6 100 155)" />
      </g>
      {f.has('fridge') && <g>
        <rect x="72" y="252" width="166" height="186" rx="6" fill="#EAF7FB" stroke={O} strokeWidth="2" />
        <path d="M76 330 H234 M76 390 H234" stroke="#BFD3DA" strokeWidth="4" />
        <path d="M250 240 L320 260 L320 470 L250 450 Z" fill="url(#kFridge)" stroke={O} strokeWidth="2.5" />
        <rect x="140" y="345" width="60" height="38" rx="6" fill="#FFD866" stroke={O} strokeWidth="2" />
        {!f.has('milk') && <g {...hit('milk')}>
          <path d="M92 270 H128 V324 H92 Z" fill="url(#kMilk)" stroke={O} strokeWidth="2" /><path d="M92 270 L100 258 H120 L128 270" fill="#4A86C5" stroke={O} strokeWidth="2" />
          <text x="110" y="302" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4A86C5">MILK</text>
        </g>}
        <g {...hit('apple2')}>{apple(200, 312, .9)}</g>
      </g>}
      {/* плита й мийка */}
      <rect x="640" y="300" width="340" height="150" rx="8" fill="url(#kWood)" stroke={O} strokeWidth="3" />
      <rect x="630" y="286" width="360" height="20" rx="6" fill="#F2F2EE" stroke={O} strokeWidth="2.5" />
      {[690, 760, 830, 900].map((x) => <rect key={x} x={x - 26} y="320" width="52" height="110" rx="6" fill="none" stroke={O} strokeWidth="1.5" opacity=".5" />)}
      <rect x="730" y="270" width="120" height="20" rx="8" fill="url(#kSteel)" stroke={O} strokeWidth="2" />
      <g {...hit('tap')}>
        <path d="M790 270 V230 C 790 214, 820 214, 820 230 V240" fill="none" stroke="url(#kSteel)" strokeWidth="9" strokeLinecap="round" />
        <path d="M790 270 V230 C 790 214, 820 214, 820 230 V240" fill="none" stroke={O} strokeWidth="1.5" />
        <rect x="778" y="250" width="24" height="8" rx="3" fill="#E36F3C" stroke={O} strokeWidth="1.5" />
      </g>
      {f.has('water') && <path d="M818 242 C 816 254, 822 262, 818 272" stroke="#7CC4F2" strokeWidth="7" strokeLinecap="round" fill="none" />}
      {/* стіл, тарілка, ложка, яблука, банан */}
      <rect x="330" y="350" width="290" height="22" rx="8" fill="url(#kWood)" stroke={O} strokeWidth="3" />
      <path d="M350 372 L340 470 M600 372 L610 470" stroke="#8E5A2C" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="420" cy="340" rx="48" ry="12" fill="#fff" stroke={O} strokeWidth="2.2" /><ellipse cx="420" cy="338" rx="30" ry="6" fill="#EEF2F5" />
      <g {...hit('spoon')}><ellipse cx="490" cy="340" rx="7" ry="10" fill="url(#kSteel)" stroke={O} strokeWidth="1.8" /><path d="M490 330 L496 300" stroke="#A9B2B8" strokeWidth="5" strokeLinecap="round" /><path d="M490 330 L496 300" stroke={O} strokeWidth="1" /></g>
      <path d="M520 344 C 520 318, 600 318, 600 344 Z" fill="#E9C893" stroke={O} strokeWidth="2.2" />
      <g {...hit('apple1')}>{apple(545, 320, .8)}</g>
      <g {...hit('banana')}><path d="M560 330 C 580 334, 596 322, 600 304 C 604 316, 594 342, 562 340 Z" fill="url(#kBanana)" stroke={O} strokeWidth="2" /></g>
      {/* мишка під столом */}
      <g {...hit('mouse')}>
        <path d="M520 470 C 560 480, 590 470, 600 460" stroke="#8E8E8E" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="490" cy="455" rx="30" ry="18" fill="#B9B9B9" stroke={O} strokeWidth="2" />
        <circle cx="468" cy="440" r="10" fill="#C9C9C9" stroke={O} strokeWidth="2" /><circle cx="468" cy="440" r="5" fill="#F5A0C0" />
        <circle cx="474" cy="455" r="3" fill={O} /><circle cx="460" cy="460" r="3" fill="#F08AA8" />
      </g>
      <Bubbles x={180} y={520} s={.9}>
        <path d="M-30 -36 C -36 -66, 36 -66, 30 -36 Z" fill="#fff" stroke={O} strokeWidth="2.5" />
      </Bubbles>
    </svg>
  );
}

export const KITCHEN: QuestLocation = {
  id: 'kitchen', level: 'A1-A2', Scene,
  title: { uk: 'На кухні', ru: 'На кухне', en: 'In the kitchen' },
  place: { uk: 'Кухня', ru: 'Кухня', en: 'Kitchen' },
  finale: 'Yummy! Thank you for your help in the kitchen!',
  tasks: [
    { en: 'Welcome to my kitchen! Open the fridge.', uk: 'Ласкаво просимо на мою кухню! Відкрий холодильник.', ru: 'Добро пожаловать на мою кухню! Открой холодильник.', target: ['fridge'], set: 'fridge' },
    { en: 'Take the milk, please.', uk: 'Візьми молоко, будь ласка.', ru: 'Возьми молоко, пожалуйста.', target: ['milk'], set: 'milk' },
    { en: 'Find two apples.', uk: 'Знайди два яблука.', ru: 'Найди два яблока.', target: ['apple1', 'apple2'], all: true },
    { en: 'Where is the blue cup? It is on the shelf.', uk: 'Де синя чашка? Вона на полиці.', ru: 'Где синяя чашка? Она на полке.', target: ['blueCup'] },
    { en: 'Find the spoon next to the plate.', uk: 'Знайди ложку біля тарілки.', ru: 'Найди ложку возле тарелки.', target: ['spoon'] },
    { en: 'Turn on the tap.', uk: 'Відкрий кран.', ru: 'Открой кран.', target: ['tap'], set: 'water' },
    { en: 'Bring me something yellow you can eat.', uk: 'Принеси мені щось жовте, що можна їсти.', ru: 'Принеси мне что-то жёлтое, что можно есть.', target: ['banana'] },
    { en: 'Touch the red cup.', uk: 'Торкнися червоної чашки.', ru: 'Коснись красной чашки.', target: ['redCup'] },
    { en: 'Who is under the table? Find it!', uk: 'Хто під столом? Знайди!', ru: 'Кто под столом? Найди!', target: ['mouse'] },
  ],
};
