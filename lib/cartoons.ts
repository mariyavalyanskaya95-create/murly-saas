// Мультики англійською: тільки офіційні канали правовласників на YouTube.
// Вбудовуємо список завантажень каналу (UU + id без «UC»), тому відео завжди свіжі й легальні.
type T = { uk: string; ru: string; en: string };
export type Cartoon = {
  id: string; name: string; channel: string; handle: string; age: string; level: string;
  about: T; why: T; tip: T; words: [string, string, string][]; // en, uk, ru
};

export const CARTOONS: Cartoon[] = [
  {
    id: 'peppa', name: 'Peppa Pig', channel: 'UCAOtE1V7Ots4DjM8JLlrYgg', handle: 'PeppaPigOfficial', age: '2-6', level: 'A0-A1',
    about: { uk: 'Свинка Пеппа, її брат Джордж і батьки: прості історії з дому, садочка й прогулянок.', ru: 'Свинка Пеппа, её брат Джордж и родители: простые истории из дома, садика и прогулок.', en: 'Peppa, her brother George and their parents: simple stories about home, playgroup and outings.' },
    why: { uk: 'Повільна чітка британська вимова, короткі фрази, багато повторів. Ідеально для першого знайомства з англійською.', ru: 'Медленное чёткое британское произношение, короткие фразы, много повторов. Идеально для первого знакомства с английским.', en: 'Slow, clear British English, short phrases and lots of repetition. Perfect for beginners.' },
    tip: { uk: 'Дивіться одну серію 2-3 рази: спершу просто так, потім з англійськими субтитрами, потім повторюйте фрази за героями.', ru: 'Смотрите одну серию 2-3 раза: сначала просто так, потом с английскими субтитрами, потом повторяйте фразы за героями.', en: 'Watch one episode 2-3 times: first just for fun, then with English subtitles, then repeat the lines.' },
    words: [['muddy puddles', 'брудні калюжі', 'грязные лужи'], ['Mummy and Daddy', 'мама і тато', 'мама и папа'], ['Let’s go!', 'Ходімо!', 'Пошли!'], ['What a lovely day!', 'Який чудовий день!', 'Какой чудесный день!'], ['Time for bed', 'Час спати', 'Пора спать'], ['I’m sorry', 'Вибач', 'Извини']],
  },
  {
    id: 'super-simple', name: 'Super Simple Songs', channel: 'UCLsooMJoIpl_7ux2jvdPB-Q', handle: 'SuperSimpleSongs', age: '1-6', level: 'A0',
    about: { uk: 'Пісеньки й мультики для найменших: кольори, тварини, лічба, частини тіла.', ru: 'Песенки и мультики для самых маленьких: цвета, животные, счёт, части тела.', en: 'Songs and cartoons for little ones: colours, animals, counting, body parts.' },
    why: { uk: 'Створено спеціально для дітей, які вчать англійську: дуже прості слова, жести й повтори.', ru: 'Сделано специально для детей, которые учат английский: очень простые слова, жесты и повторы.', en: 'Made for young English learners: very simple words, gestures and repetition.' },
    tip: { uk: 'Співайте й показуйте рухи разом з дитиною. Одну пісню можна слухати цілий тиждень.', ru: 'Пойте и показывайте движения вместе с ребёнком. Одну песню можно слушать целую неделю.', en: 'Sing and do the actions together. One song can last a whole week.' },
    words: [['Hello! How are you?', 'Привіт! Як справи?', 'Привет! Как дела?'], ['head, shoulders, knees and toes', 'голова, плечі, коліна й пальчики', 'голова, плечи, колени и пальчики'], ['red, yellow, green, blue', 'червоний, жовтий, зелений, синій', 'красный, жёлтый, зелёный, синий'], ['one, two, three', 'один, два, три', 'один, два, три'], ['clap your hands', 'поплескай у долоні', 'похлопай в ладоши'], ['Bye-bye!', 'Бувай!', 'Пока!']],
  },
  {
    id: 'hey-duggee', name: 'Hey Duggee', channel: 'UCj_mFUb-47d9QNiJ5556LjQ', handle: 'HeyDuggeeOfficial', age: '3-7', level: 'A0-A1',
    about: { uk: 'Пес Даггі веде клуб для малюків, і за кожну пригоду вони отримують значок.', ru: 'Пёс Дагги ведёт клуб для малышей, и за каждое приключение они получают значок.', en: 'Duggee runs a club for little ones who earn a badge for every adventure.' },
    why: { uk: 'Голос оповідача говорить повільно й чітко, сюжет легко зрозуміти з картинки.', ru: 'Голос рассказчика говорит медленно и чётко, сюжет легко понять по картинке.', en: 'The narrator speaks slowly and clearly, and the pictures tell the story.' },
    tip: { uk: 'Після серії спитайте: What badge did they get? Дитина може відповісти одним словом.', ru: 'После серии спросите: What badge did they get? Ребёнок может ответить одним словом.', en: 'After an episode ask: What badge did they get? A one-word answer is fine.' },
    words: [['badge', 'значок', 'значок'], ['a big hug', 'міцні обійми', 'крепкие объятия'], ['Well done!', 'Молодець!', 'Молодец!'], ['friends', 'друзі', 'друзья'], ['Let’s try!', 'Спробуймо!', 'Давай попробуем!'], ['It’s fun!', 'Це весело!', 'Это весело!']],
  },
  {
    id: 'numberblocks', name: 'Numberblocks', channel: 'UCPlwvN0w4qFSP1FllALB92w', handle: 'Numberblocks', age: '3-7', level: 'A0-A1',
    about: { uk: 'Кубики-числа, які складаються, діляться й рахують. Англійська і математика разом.', ru: 'Кубики-числа, которые складываются, делятся и считают. Английский и математика вместе.', en: 'Number blocks that add, split and count. English and maths together.' },
    why: { uk: 'Числа англійською, слова more, less, plus, equals. Дуже наочно, навіть без перекладу.', ru: 'Числа на английском, слова more, less, plus, equals. Очень наглядно, даже без перевода.', en: 'Numbers in English and words like more, less, plus, equals. Very visual.' },
    tip: { uk: 'Рахуйте вголос англійською разом з героями, а потім рахуйте іграшки чи сходинки вдома.', ru: 'Считайте вслух по-английски вместе с героями, а потом считайте игрушки или ступеньки дома.', en: 'Count out loud with the characters, then count toys or stairs at home.' },
    words: [['one, two, three, four, five', 'один, два, три, чотири, п’ять', 'один, два, три, четыре, пять'], ['more', 'більше', 'больше'], ['less', 'менше', 'меньше'], ['plus', 'плюс', 'плюс'], ['equals', 'дорівнює', 'равно'], ['How many?', 'Скільки?', 'Сколько?']],
  },
  {
    id: 'bluey', name: 'Bluey', channel: 'UCVzLLZkDuFGAE2BGdBuBNBg', handle: 'BlueyOfficialChannel', age: '4-10', level: 'A1-A2',
    about: { uk: 'Цуценя Блуї, її сестричка Бінго і тато, який вигадує найкращі ігри.', ru: 'Щенок Блуи, её сестрёнка Бинго и папа, который придумывает самые лучшие игры.', en: 'Bluey, her sister Bingo and a dad who invents the best games.' },
    why: { uk: 'Живі діалоги про гру, родину й почуття. Австралійська вимова: корисно чути різну англійську.', ru: 'Живые диалоги про игру, семью и чувства. Австралийское произношение: полезно слышать разный английский.', en: 'Natural dialogue about play, family and feelings, with an Australian accent.' },
    tip: { uk: 'Для 7-10 років: після серії переказати одним-двома реченнями, у що грали герої.', ru: 'Для 7-10 лет: после серии пересказать одним-двумя предложениями, во что играли герои.', en: 'For ages 7-10: retell in one or two sentences what game they played.' },
    words: [['Let’s play!', 'Давай грати!', 'Давай играть!'], ['It’s my turn', 'Моя черга', 'Моя очередь'], ['Can we play again?', 'Можна ще раз?', 'Можно ещё раз?'], ['I’m bored', 'Мені нудно', 'Мне скучно'], ['That’s not fair!', 'Це нечесно!', 'Это нечестно!'], ['Good idea!', 'Гарна ідея!', 'Хорошая идея!']],
  },
  {
    id: 'simons-cat', name: 'Simon’s Cat', channel: 'UCH6vXjt-BA7QHl0KnfL-7RQ', handle: 'SimonsCat', age: '5+', level: 'A1-B1',
    about: { uk: 'Короткі смішні мультики про кота, який вічно щось хоче від господаря.', ru: 'Короткие смешные мультики про кота, который вечно чего-то хочет от хозяина.', en: 'Short funny cartoons about a cat who always wants something from his owner.' },
    why: { uk: 'Майже без слів, тому це найкращий формат для говоріння: дитина чи дорослий сам описує, що відбувається.', ru: 'Почти без слов, поэтому это лучший формат для говорения: ребёнок или взрослый сам описывает, что происходит.', en: 'Almost no words, so it is perfect for speaking: describe what happens yourself.' },
    tip: { uk: 'A1: називаємо дії (The cat is jumping). A2-B1: переказуємо в Past Simple (First the cat woke Simon up...).', ru: 'A1: называем действия (The cat is jumping). A2-B1: пересказываем в Past Simple (First the cat woke Simon up...).', en: 'A1: name the actions (The cat is jumping). A2-B1: retell it in the Past Simple.' },
    words: [['hungry', 'голодний', 'голодный'], ['to wake up', 'прокидатися / будити', 'просыпаться / будить'], ['to knock over', 'перекинути', 'опрокинуть'], ['naughty', 'неслухняний', 'непослушный'], ['to chase', 'ганятися', 'гоняться'], ['First... then... finally...', 'Спочатку... потім... нарешті...', 'Сначала... потом... наконец...']],
  },
];
