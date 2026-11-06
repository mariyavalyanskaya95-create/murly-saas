// Англійська через пісні: офіційний кліп + наші пояснення виразів. Тексти пісень НЕ публікуємо.
type L = { uk: string; ru: string; en: string };
export type Phrase = { en: string; m: L; ex: string };
export type Song = {
  id: string; artist: string; title: string; yt: string; year: number;
  level: string; age: 'all' | 'teens'; about: L; grammar: L; phrases: Phrase[]; talk: string[];
};

import { SONGS_EXTRA } from './songs-extra';
const BASE: Song[] = [
  {
    id: 'shake-it-off', artist: 'Taylor Swift', title: 'Shake It Off', yt: 'nfWlot6h_JM', year: 2014, level: 'A2', age: 'all',
    about: { uk: 'Весела пісня про те, як не зважати на чужі плітки й критику і просто бути собою. Люди щось говорять, а ти танцюєш далі.', ru: 'Весёлая песня о том, как не обращать внимания на чужие сплетни и критику и просто быть собой. Люди что-то говорят, а ты танцуешь дальше.', en: 'A happy song about ignoring gossip and criticism and simply being yourself. People talk, you keep dancing.' },
    grammar: { uk: 'Фразові дієслова з off: shake off, take off, turn off, show off.', ru: 'Фразовые глаголы с off: shake off, take off, turn off, show off.', en: 'Phrasal verbs with off: shake off, take off, turn off, show off.' },
    phrases: [
      { en: 'shake it off', m: { uk: 'не зважати, струсити з себе погане', ru: 'не обращать внимания, стряхнуть с себя плохое', en: 'forget something bad and move on' }, ex: 'Someone laughed at my drawing, but I just shook it off.' },
      { en: 'a hater', m: { uk: 'людина, яка постійно критикує інших', ru: 'человек, который постоянно критикует других', en: 'a person who always criticises others' }, ex: 'Don’t listen to the haters, your video is great.' },
      { en: 'keep going', m: { uk: 'не зупинятися, продовжувати', ru: 'не останавливаться, продолжать', en: 'continue, don’t stop' }, ex: 'It’s hard, but keep going. You’re almost there!' },
      { en: 'show off', m: { uk: 'хизуватися', ru: 'хвастаться, выпендриваться', en: 'try to impress people' }, ex: 'He always shows off his new sneakers.' },
      { en: 'be yourself', m: { uk: 'бути собою', ru: 'быть собой', en: 'act naturally, don’t pretend' }, ex: 'Just be yourself and people will like you.' },
    ],
    talk: ['What do you do when someone says something unkind about you?', 'Which song helps you feel better on a bad day?', 'Is it easy to be yourself at school or at work? Why?'],
  },
  {
    id: 'roar', artist: 'Katy Perry', title: 'Roar', yt: 'CevxZvSJLk8', year: 2013, level: 'A2', age: 'all',
    about: { uk: 'Пісня про людину, яка довго мовчала й підлаштовувалась, а потім знайшла свою силу й голос. У кліпі героїня опиняється в джунглях і стає сміливою, як тигриця.', ru: 'Песня о человеке, который долго молчал и подстраивался, а потом нашёл свою силу и голос. В клипе героиня оказывается в джунглях и становится смелой, как тигрица.', en: 'A song about someone who stayed quiet for a long time and then found their strength and voice. In the video she ends up in the jungle and becomes as brave as a tiger.' },
    grammar: { uk: 'Used to: як було раніше і як тепер. I used to be shy, now I speak up.', ru: 'Used to: как было раньше и как теперь. I used to be shy, now I speak up.', en: 'Used to: then and now. I used to be shy, now I speak up.' },
    phrases: [
      { en: 'roar', m: { uk: 'ричати (як лев чи тигр)', ru: 'рычать (как лев или тигр)', en: 'make a loud sound like a lion' }, ex: 'The tiger roared and everyone jumped.' },
      { en: 'stand up for yourself', m: { uk: 'захищати себе, відстоювати свою думку', ru: 'защищать себя, отстаивать своё мнение', en: 'defend yourself and your ideas' }, ex: 'It’s important to stand up for yourself.' },
      { en: 'speak up', m: { uk: 'говорити голосніше, не мовчати', ru: 'говорить громче, не молчать', en: 'say what you think' }, ex: 'If you don’t understand, speak up and ask.' },
      { en: 'get back up', m: { uk: 'підвестися після падіння (і в житті теж)', ru: 'подняться после падения (и в жизни тоже)', en: 'stand again after you fall' }, ex: 'I fell off my bike, but I got back up.' },
      { en: 'brave', m: { uk: 'сміливий', ru: 'смелый', en: 'not afraid' }, ex: 'You were so brave at the dentist!' },
    ],
    talk: ['When did you have to be brave?', 'What did you use to be afraid of? Are you afraid of it now?', 'Which animal are you most like? Why?'],
  },
  {
    id: 'firework', artist: 'Katy Perry', title: 'Firework', yt: 'QGJuMBdaqIw', year: 2010, level: 'A2', age: 'all',
    about: { uk: 'Пісня-підтримка: кожна людина особлива, навіть якщо зараз почувається непомітною. Всередині кожного є іскра, яку варто показати світу.', ru: 'Песня-поддержка: каждый человек особенный, даже если сейчас чувствует себя незаметным. Внутри каждого есть искра, которую стоит показать миру.', en: 'A song of support: everyone is special, even if they feel invisible right now. Everyone has a spark inside to show the world.' },
    grammar: { uk: 'Питання з ever: Do you ever feel...? Have you ever...?', ru: 'Вопросы с ever: Do you ever feel...? Have you ever...?', en: 'Questions with ever: Do you ever feel...? Have you ever...?' },
    phrases: [
      { en: 'a firework', m: { uk: 'феєрверк', ru: 'фейерверк', en: 'a colourful explosion in the sky' }, ex: 'We watched the fireworks on New Year’s Eve.' },
      { en: 'a spark', m: { uk: 'іскра; (перен.) талант, енергія', ru: 'искра; (перен.) талант, энергия', en: 'a small light; talent or energy' }, ex: 'She has a spark, everyone loves her ideas.' },
      { en: 'light up', m: { uk: 'засвітитися, освітити', ru: 'засветиться, осветить', en: 'become bright' }, ex: 'His face lit up when he saw the puppy.' },
      { en: 'feel invisible', m: { uk: 'почуватися непомітним', ru: 'чувствовать себя незаметным', en: 'feel that nobody notices you' }, ex: 'At the new school I felt invisible for a week.' },
      { en: 'show the world', m: { uk: 'показати світу', ru: 'показать миру', en: 'let everyone see' }, ex: 'Show the world what you can do!' },
    ],
    talk: ['Do you ever feel invisible? When?', 'What is your spark, your special talent?', 'Have you ever watched fireworks? Where?'],
  },
  {
    id: 'perfect', artist: 'Ed Sheeran', title: 'Perfect', yt: '2Vv-BfVoq4g', year: 2017, level: 'A2-B1', age: 'all',
    about: { uk: 'Ніжна пісня про кохання: людина, з якою все здається ідеальним, навіть звичайний повільний танець. Часто звучить на весіллях.', ru: 'Нежная песня о любви: человек, с которым всё кажется идеальным, даже обычный медленный танец. Часто звучит на свадьбах.', en: 'A gentle love song: being with the one person who makes everything feel perfect, even a simple slow dance. Often played at weddings.' },
    grammar: { uk: 'Ступені порівняння: good, better, the best; perfect не порівнюють.', ru: 'Степени сравнения: good, better, the best; perfect не сравнивают.', en: 'Comparatives: good, better, the best; we don’t compare perfect.' },
    phrases: [
      { en: 'fall in love', m: { uk: 'закохатися', ru: 'влюбиться', en: 'start to love someone' }, ex: 'They fell in love on holiday.' },
      { en: 'the one', m: { uk: 'та сама людина, «половинка»', ru: 'тот самый человек, «половинка»', en: 'the right person for you' }, ex: 'When she met him, she knew he was the one.' },
      { en: 'a slow dance', m: { uk: 'повільний танець', ru: 'медленный танец', en: 'a calm dance for two' }, ex: 'They had a slow dance at the wedding.' },
      { en: 'barefoot', m: { uk: 'босоніж', ru: 'босиком', en: 'without shoes' }, ex: 'I love walking barefoot on the grass.' },
      { en: 'look perfect', m: { uk: 'виглядати ідеально', ru: 'выглядеть идеально', en: 'look great' }, ex: 'Your room looks perfect today!' },
    ],
    talk: ['Describe a perfect day for you.', 'What song would you choose for a wedding or a party?', 'Is anything really perfect? Why or why not?'],
  },
  {
    id: 'levitating', artist: 'Dua Lipa', title: 'Levitating', yt: 'TUVcZfQe-Kw', year: 2020, level: 'A2-B1', age: 'teens',
    about: { uk: 'Танцювальна диско-пісня: коли поруч потрібна людина, здається, що ти ширяєш над землею, серед місяця й зірок.', ru: 'Танцевальная диско-песня: когда рядом нужный человек, кажется, что ты паришь над землёй, среди луны и звёзд.', en: 'A disco dance song: with the right person you feel like you’re floating above the ground, among the moon and stars.' },
    grammar: { uk: 'Have got: I’ve got you, you’ve got me. Розмовна форма have.', ru: 'Have got: I’ve got you, you’ve got me. Разговорная форма have.', en: 'Have got: I’ve got you, you’ve got me. The spoken form of have.' },
    phrases: [
      { en: 'levitate', m: { uk: 'левітувати, ширяти в повітрі', ru: 'левитировать, парить в воздухе', en: 'float in the air' }, ex: 'In the magic show the girl levitated!' },
      { en: 'moonlight / starlight', m: { uk: 'місячне / зоряне світло', ru: 'лунный / звёздный свет', en: 'light from the moon / stars' }, ex: 'We walked home in the moonlight.' },
      { en: 'dance the night away', m: { uk: 'танцювати всю ніч', ru: 'танцевать всю ночь', en: 'dance for many hours' }, ex: 'At the party we danced the night away.' },
      { en: 'out of this world', m: { uk: 'неймовірний, «неземний»', ru: 'невероятный, «неземной»', en: 'amazing' }, ex: 'This pizza is out of this world!' },
      { en: 'I’ve got you', m: { uk: 'я поруч, я тебе підтримаю', ru: 'я рядом, я тебя поддержу', en: 'I will help and support you' }, ex: 'Don’t worry, I’ve got you.' },
    ],
    talk: ['What makes you feel like you’re floating?', 'What is out of this world for you: a food, a place, a game?', 'Do you like dancing? Where do you dance?'],
  },
  {
    id: 'shallow', artist: 'Lady Gaga, Bradley Cooper', title: 'Shallow', yt: 'bo_efYhYU2A', year: 2018, level: 'B1', age: 'teens',
    about: { uk: 'Пісня-діалог із фільму «Народження зірки». Двоє людей питають одне одного, чи щасливі вони, і вирішують покинути «мілину», тобто безпечне й звичне, та пірнути в нове життя.', ru: 'Песня-диалог из фильма «Звезда родилась». Двое спрашивают друг друга, счастливы ли они, и решают покинуть «мелководье», то есть безопасное и привычное, и нырнуть в новую жизнь.', en: 'A duet from the film A Star Is Born. Two people ask each other if they are happy and decide to leave the shallow, safe water and dive into a new life.' },
    grammar: { uk: 'Питання в Present Simple і Continuous: Are you happy? Do you want more? Are you looking for...?', ru: 'Вопросы в Present Simple и Continuous: Are you happy? Do you want more? Are you looking for...?', en: 'Questions in Present Simple and Continuous: Are you happy? Do you want more? Are you looking for...?' },
    phrases: [
      { en: 'shallow', m: { uk: 'мілкий; (перен.) поверхневий', ru: 'мелкий; (перен.) поверхностный', en: 'not deep; not serious' }, ex: 'Little kids swim in the shallow water.' },
      { en: 'dive in', m: { uk: 'пірнути; (перен.) сміливо почати', ru: 'нырнуть; (перен.) смело начать', en: 'jump into water; start something bravely' }, ex: 'The project looked hard, but we dived in.' },
      { en: 'the deep end', m: { uk: 'глибока частина басейну; складна ситуація', ru: 'глубокая часть бассейна; сложная ситуация', en: 'the deep part of a pool; a hard situation' }, ex: 'On my first day at work I was thrown in at the deep end.' },
      { en: 'long for', m: { uk: 'сильно хотіти, тужити за', ru: 'сильно хотеть, тосковать по', en: 'want something very much' }, ex: 'In winter I long for the sea.' },
      { en: 'far from the shore', m: { uk: 'далеко від берега', ru: 'далеко от берега', en: 'a long way from the beach' }, ex: 'Don’t swim too far from the shore.' },
    ],
    talk: ['When did you last try something completely new?', 'Do you prefer safe and familiar or new and exciting? Why?', 'What do you long for right now?'],
  },
  {
    id: 'thank-u-next', artist: 'Ariana Grande', title: 'thank u, next', yt: 'gl1aHhXnN1k', year: 2018, level: 'B1', age: 'teens',
    about: { uk: 'Пісня про вдячність: кожні минулі стосунки чогось навчили, і тепер головне любити себе. Кліп повторює сцени з відомих підліткових фільмів.', ru: 'Песня о благодарности: каждые прошлые отношения чему-то научили, и теперь главное любить себя. Клип повторяет сцены из известных подростковых фильмов.', en: 'A song about gratitude: every past relationship taught something, and now the most important thing is to love yourself. The video recreates scenes from famous teen films.' },
    grammar: { uk: 'Present Perfect для досвіду: I’ve learned, I’ve grown, I’ve never...', ru: 'Present Perfect для опыта: I’ve learned, I’ve grown, I’ve never...', en: 'Present Perfect for experience: I’ve learned, I’ve grown, I’ve never...' },
    phrases: [
      { en: 'next!', m: { uk: 'наступний! (тобто йдемо далі)', ru: 'следующий! (то есть идём дальше)', en: 'let’s move on to the next one' }, ex: 'That idea didn’t work? Fine, next!' },
      { en: 'move on', m: { uk: 'відпустити минуле, рухатися далі', ru: 'отпустить прошлое, двигаться дальше', en: 'stop thinking about the past' }, ex: 'It’s time to move on and start something new.' },
      { en: 'grateful', m: { uk: 'вдячний', ru: 'благодарный', en: 'thankful' }, ex: 'I’m grateful for my friends.' },
      { en: 'an ex', m: { uk: 'колишній / колишня', ru: 'бывший / бывшая', en: 'a former boyfriend or girlfriend' }, ex: 'She is still friends with her ex.' },
      { en: 'learn a lesson', m: { uk: 'засвоїти урок', ru: 'усвоить урок', en: 'understand something from experience' }, ex: 'I forgot my umbrella and got wet. Lesson learned!' },
    ],
    talk: ['What is one lesson you’ve learned this year?', 'Who are you grateful for? Why?', 'Is it easy for you to move on after a mistake?'],
  },
  {
    id: 'blinding-lights', artist: 'The Weeknd', title: 'Blinding Lights', yt: '4NRXx6U8ABQ', year: 2019, level: 'B1', age: 'teens',
    about: { uk: 'Пісня в стилі 80-х: людина їде нічним містом, сумує за кимось і не може заснути. Кліп темний і місцями жорсткий, тому радимо 13+ і спершу переглянути вчителю.', ru: 'Песня в стиле 80-х: человек едет ночным городом, скучает по кому-то и не может уснуть. Клип тёмный и местами жёсткий, поэтому советуем 13+ и сначала посмотреть учителю.', en: 'An 80s style song: someone drives through the city at night, misses a person and can’t sleep. The video is dark and a bit rough in places, so 13+ and teachers should watch it first.' },
    grammar: { uk: 'Can’t + дієслово: I can’t sleep, I can’t see, I can’t wait.', ru: 'Can’t + глагол: I can’t sleep, I can’t see, I can’t wait.', en: 'Can’t + verb: I can’t sleep, I can’t see, I can’t wait.' },
    phrases: [
      { en: 'blinding', m: { uk: 'сліпучий', ru: 'ослепительный', en: 'so bright you can’t see' }, ex: 'The sun was blinding, so I put on sunglasses.' },
      { en: 'miss someone', m: { uk: 'сумувати за кимось', ru: 'скучать по кому-то', en: 'feel sad because someone is not with you' }, ex: 'I miss my grandma, she lives far away.' },
      { en: 'city lights', m: { uk: 'вогні міста', ru: 'огни города', en: 'the lights of a city at night' }, ex: 'From the plane we saw the city lights.' },
      { en: 'can’t sleep', m: { uk: 'не можу заснути', ru: 'не могу уснуть', en: 'be unable to sleep' }, ex: 'I can’t sleep before an exam.' },
      { en: 'reach out', m: { uk: 'зв’язатися, написати першим', ru: 'связаться, написать первым', en: 'contact someone' }, ex: 'If you need help, reach out to me.' },
    ],
    talk: ['What keeps you awake at night?', 'Do you prefer the city at night or in the daytime?', 'Who do you miss? How do you stay in touch?'],
  },
  {
    id: 'save-your-tears', artist: 'The Weeknd', title: 'Save Your Tears', yt: 'XXYlFuWEuKI', year: 2020, level: 'B1-B2', age: 'teens',
    about: { uk: 'Пісня про жаль: людина завдала болю іншій і тепер шкодує. Добра тема, щоб поговорити про вибачення й другі шанси.', ru: 'Песня о сожалении: человек причинил боль другому и теперь жалеет. Хорошая тема, чтобы поговорить об извинениях и вторых шансах.', en: 'A song about regret: someone hurt another person and now feels sorry. A good topic to talk about apologies and second chances.' },
    grammar: { uk: 'Should have + V3: жаль про минуле. I should have called you.', ru: 'Should have + V3: сожаление о прошлом. I should have called you.', en: 'Should have + past participle: regret about the past. I should have called you.' },
    phrases: [
      { en: 'save your tears', m: { uk: 'не плач (через мене), побережи сльози', ru: 'не плачь (из-за меня), побереги слёзы', en: 'don’t cry about this' }, ex: 'Save your tears, it’s only a game.' },
      { en: 'regret', m: { uk: 'шкодувати; жаль', ru: 'сожалеть; сожаление', en: 'feel sorry about something you did' }, ex: 'I regret saying that to my friend.' },
      { en: 'break someone’s heart', m: { uk: 'розбити комусь серце', ru: 'разбить кому-то сердце', en: 'make someone very sad' }, ex: 'The ending of that film broke my heart.' },
      { en: 'a second chance', m: { uk: 'другий шанс', ru: 'второй шанс', en: 'another opportunity' }, ex: 'Everyone deserves a second chance.' },
      { en: 'I should have...', m: { uk: 'мені слід було...', ru: 'мне следовало...', en: 'it was a mistake not to...' }, ex: 'I should have studied more.' },
    ],
    talk: ['What is something you should have done differently?', 'Is it easy for you to say sorry?', 'Do you believe in second chances? Why?'],
  },
  {
    id: 'what-was-i-made-for', artist: 'Billie Eilish', title: 'What Was I Made For?', yt: 'cW8VLC9nnTo', year: 2023, level: 'B1', age: 'teens',
    about: { uk: 'Тиха пісня з фільму «Барбі»: героїня питає себе, хто вона і для чого існує. Про пошук себе, коли почуваєшся розгублено.', ru: 'Тихая песня из фильма «Барби»: героиня спрашивает себя, кто она и для чего существует. О поиске себя, когда чувствуешь растерянность.', en: 'A quiet song from the Barbie film: the character asks herself who she is and what she exists for. About finding yourself when you feel lost.' },
    grammar: { uk: 'Пасив у минулому: was made, was written, was built.', ru: 'Пассив в прошлом: was made, was written, was built.', en: 'Past passive: was made, was written, was built.' },
    phrases: [
      { en: 'be made for', m: { uk: 'бути створеним для', ru: 'быть созданным для', en: 'be perfect for a purpose' }, ex: 'These shoes are made for running.' },
      { en: 'figure out', m: { uk: 'зрозуміти, розібратися', ru: 'понять, разобраться', en: 'understand after thinking' }, ex: 'I can’t figure out this puzzle.' },
      { en: 'feel lost', m: { uk: 'почуватися розгубленим', ru: 'чувствовать себя потерянным', en: 'not know what to do' }, ex: 'I felt lost in my first week at university.' },
      { en: 'a purpose', m: { uk: 'мета, сенс', ru: 'цель, смысл', en: 'a reason to do something' }, ex: 'Helping animals gives her a purpose.' },
      { en: 'wonder', m: { uk: 'цікавитися, замислюватися', ru: 'интересоваться, задумываться', en: 'ask yourself' }, ex: 'I wonder what my life will be like in ten years.' },
    ],
    talk: ['What do you think you are made for?', 'When do you feel lost, and what helps you?', 'What do you wonder about most?'],
  },
];

export const SONGS: Song[] = [...BASE, ...SONGS_EXTRA];
export const songById = (id: string) => SONGS.find((s) => s.id === id);
