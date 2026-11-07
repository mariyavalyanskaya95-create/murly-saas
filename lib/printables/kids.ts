// Матеріали для дітей A1-A2: картки для говоріння і 6 ігор для друку.
// Інструкції для дорослого: uk/ru (L2). Навчальний контент: англійська.
import type { PrintDoc, Block, L2 } from './types';

// ---------- 60 карток для говоріння ----------

type KidCard = { q: string; uk: string; ru: string; say: string };
type Theme = { en: string; uk: string; ru: string; cards: KidCard[] };

const THEMES: Theme[] = [
  {
    en: "Me and my family", uk: "Я і моя родина", ru: "Я и моя семья",
    cards: [
      { q: "What's your name?", uk: "Як тебе звати?", ru: "Как тебя зовут?", say: "My name is..." },
      { q: "How old are you?", uk: "Скільки тобі років?", ru: "Сколько тебе лет?", say: "I am... years old." },
      { q: "Who is in your family?", uk: "Хто є у твоїй родині?", ru: "Кто есть в твоей семье?", say: "My mum, my dad and..." },
      { q: "Have you got a brother or a sister?", uk: "У тебе є брат або сестра?", ru: "У тебя есть брат или сестра?", say: "I have got a... / I haven't got..." },
      { q: "What is your mum's name?", uk: "Як звати твою маму?", ru: "Как зовут твою маму?", say: "Her name is..." },
      { q: "Is your dad tall or short?", uk: "Твій тато високий чи невисокий?", ru: "Твой папа высокий или невысокий?", say: "My dad is..." },
      { q: "What colour are your eyes?", uk: "Якого кольору твої очі?", ru: "Какого цвета твои глаза?", say: "My eyes are..." },
      { q: "Say three things you can do.", uk: "Назви три речі, які ти вмієш робити.", ru: "Назови три вещи, которые ты умеешь делать.", say: "I can..., ... and..." },
      { q: "Who do you play with at home?", uk: "З ким ти граєшся вдома?", ru: "С кем ты играешь дома?", say: "I play with..." },
      { q: "What do you like doing with your family?", uk: "Що ти любиш робити разом з родиною?", ru: "Что ты любишь делать вместе с семьёй?", say: "We like..." },
    ],
  },
  {
    en: "Animals", uk: "Тварини", ru: "Животные",
    cards: [
      { q: "What is your favourite animal?", uk: "Яка твоя улюблена тварина?", ru: "Какое твоё любимое животное?", say: "My favourite animal is a..." },
      { q: "What does a cow say?", uk: "Що каже корова?", ru: "Что говорит корова?", say: "A cow says 'moo'." },
      { q: "Can a fish swim? Can a fish fly?", uk: "Риба вміє плавати? А літати?", ru: "Рыба умеет плавать? А летать?", say: "Yes, it can. / No, it can't." },
      { q: "Name three farm animals.", uk: "Назви трьох свійських тварин з ферми.", ru: "Назови трёх домашних животных с фермы.", say: "A cow, a... and a..." },
      { q: "What animal is big and grey?", uk: "Яка тварина велика й сіра?", ru: "Какое животное большое и серое?", say: "It's an elephant." },
      { q: "Have you got a pet?", uk: "У тебе є домашній улюбленець?", ru: "У тебя есть домашний питомец?", say: "I have got a... / I haven't got a pet." },
      { q: "What colour is a frog?", uk: "Якого кольору жабка?", ru: "Какого цвета лягушка?", say: "A frog is..." },
      { q: "Jump like a rabbit! What are you doing?", uk: "Пострибай, як кролик! Що ти робиш?", ru: "Попрыгай, как кролик! Что ты делаешь?", say: "I am jumping." },
      { q: "Do you like cats or dogs more?", uk: "Тобі більше подобаються коти чи собаки?", ru: "Тебе больше нравятся кошки или собаки?", say: "I like... more." },
      { q: "What does a monkey like to eat?", uk: "Що любить їсти мавпа?", ru: "Что любит есть обезьяна?", say: "A monkey likes..." },
    ],
  },
  {
    en: "Food", uk: "Їжа", ru: "Еда",
    cards: [
      { q: "What do you eat for breakfast?", uk: "Що ти їси на сніданок?", ru: "Что ты ешь на завтрак?", say: "I eat... for breakfast." },
      { q: "Do you like apples?", uk: "Ти любиш яблука?", ru: "Ты любишь яблоки?", say: "Yes, I do. / No, I don't." },
      { q: "What is your favourite fruit?", uk: "Який твій улюблений фрукт?", ru: "Какой твой любимый фрукт?", say: "My favourite fruit is..." },
      { q: "Name three yellow things you can eat.", uk: "Назви три жовті речі, які можна їсти.", ru: "Назови три жёлтые вещи, которые можно есть.", say: "A banana, a... and..." },
      { q: "What do you drink in the morning?", uk: "Що ти п'єш уранці?", ru: "Что ты пьёшь утром?", say: "I drink..." },
      { q: "Is ice cream hot or cold?", uk: "Морозиво гаряче чи холодне?", ru: "Мороженое горячее или холодное?", say: "It is..." },
      { q: "What vegetables do you like?", uk: "Які овочі ти любиш?", ru: "Какие овощи ты любишь?", say: "I like... and..." },
      { q: "Pizza or pasta? Which do you like more?", uk: "Піца чи макарони? Що тобі більше подобається?", ru: "Пицца или макароны? Что тебе больше нравится?", say: "I like... more." },
      { q: "What do you need to make a sandwich?", uk: "Що потрібно, щоб зробити бутерброд?", ru: "Что нужно, чтобы сделать бутерброд?", say: "I need bread, ... and..." },
      { q: "You are hungry. What would you like?", uk: "Ти голодний. Що ти хочеш з'їсти?", ru: "Ты голоден. Что ты хочешь съесть?", say: "I would like..., please." },
    ],
  },
  {
    en: "School", uk: "Школа", ru: "Школа",
    cards: [
      { q: "What is in your school bag?", uk: "Що у твоєму шкільному рюкзаку?", ru: "Что в твоём школьном рюкзаке?", say: "There is a... and a..." },
      { q: "What colour is your pencil case?", uk: "Якого кольору твій пенал?", ru: "Какого цвета твой пенал?", say: "It is..." },
      { q: "What is your favourite subject?", uk: "Який твій улюблений предмет?", ru: "Какой твой любимый предмет?", say: "My favourite subject is..." },
      { q: "Who is your best friend at school?", uk: "Хто твій найкращий друг у школі?", ru: "Кто твой лучший друг в школе?", say: "My best friend is..." },
      { q: "How many pupils are in your class?", uk: "Скільки учнів у твоєму класі?", ru: "Сколько учеников в твоём классе?", say: "There are... pupils." },
      { q: "What do you do at break time?", uk: "Що ти робиш на перерві?", ru: "Что ты делаешь на перемене?", say: "At break time I..." },
      { q: "Count your pencils. How many have you got?", uk: "Порахуй свої олівці. Скільки їх у тебе?", ru: "Посчитай свои карандаши. Сколько их у тебя?", say: "I have got... pencils." },
      { q: "What can you see in your classroom?", uk: "Що ти бачиш у своєму класі?", ru: "Что ты видишь в своём классе?", say: "I can see a..." },
      { q: "Do you like drawing or reading more?", uk: "Тобі більше подобається малювати чи читати?", ru: "Тебе больше нравится рисовать или читать?", say: "I like... more." },
      { q: "What time do you go to school?", uk: "О котрій ти йдеш до школи?", ru: "Во сколько ты идёшь в школу?", say: "I go to school at..." },
    ],
  },
  {
    en: "Toys and games", uk: "Іграшки та ігри", ru: "Игрушки и игры",
    cards: [
      { q: "What is your favourite toy?", uk: "Яка твоя улюблена іграшка?", ru: "Какая твоя любимая игрушка?", say: "My favourite toy is a..." },
      { q: "Have you got a ball? What colour is it?", uk: "У тебе є м'яч? Якого він кольору?", ru: "У тебя есть мяч? Какого он цвета?", say: "Yes, I have. It is..." },
      { q: "Do you like playing outside or at home?", uk: "Ти любиш гратися надворі чи вдома?", ru: "Ты любишь играть на улице или дома?", say: "I like playing..." },
      { q: "Can you ride a bike?", uk: "Ти вмієш їздити на велосипеді?", ru: "Ты умеешь кататься на велосипеде?", say: "Yes, I can. / No, I can't." },
      { q: "Is your favourite toy big or small?", uk: "Твоя улюблена іграшка велика чи маленька?", ru: "Твоя любимая игрушка большая или маленькая?", say: "It is... and..." },
      { q: "What games do you play with your friends?", uk: "У які ігри ти граєш з друзями?", ru: "В какие игры ты играешь с друзьями?", say: "We play..." },
      { q: "Do you like puzzles?", uk: "Ти любиш пазли?", ru: "Ты любишь пазлы?", say: "Yes, I do. / No, I don't." },
      { q: "Where do you keep your toys?", uk: "Де ти тримаєш свої іграшки?", ru: "Где ты хранишь свои игрушки?", say: "I keep them in / under / on..." },
      { q: "What toy would you like for your birthday?", uk: "Яку іграшку ти хочеш на день народження?", ru: "Какую игрушку ты хочешь на день рождения?", say: "I would like a..." },
      { q: "Think of a toy. Your friend asks: 'Is it a...?'", uk: "Задумай іграшку. Друг питає: «Is it a...?»", ru: "Загадай игрушку. Друг спрашивает: «Is it a...?»", say: "Yes, it is. / No, it isn't." },
    ],
  },
  {
    en: "Weather and seasons", uk: "Погода і пори року", ru: "Погода и времена года",
    cards: [
      { q: "What's the weather like today?", uk: "Яка сьогодні погода?", ru: "Какая сегодня погода?", say: "It's sunny / rainy / cloudy / snowy." },
      { q: "What is your favourite season?", uk: "Яка твоя улюблена пора року?", ru: "Какое твоё любимое время года?", say: "My favourite season is..." },
      { q: "What do you wear when it is cold?", uk: "Що ти вдягаєш, коли холодно?", ru: "Что ты надеваешь, когда холодно?", say: "I wear a hat, a... and..." },
      { q: "What can you do in winter?", uk: "Що можна робити взимку?", ru: "Что можно делать зимой?", say: "In winter I can..." },
      { q: "Is it hot or cold in summer?", uk: "Улітку жарко чи холодно?", ru: "Летом жарко или холодно?", say: "It is... in summer." },
      { q: "What colour are the leaves in autumn?", uk: "Якого кольору листя восени?", ru: "Какого цвета листья осенью?", say: "They are... and..." },
      { q: "Do you like rain?", uk: "Ти любиш дощ?", ru: "Ты любишь дождь?", say: "Yes, I do. / No, I don't, because..." },
      { q: "Name the four seasons.", uk: "Назви чотири пори року.", ru: "Назови четыре времени года.", say: "Winter, spring, ... and..." },
      { q: "What do you take when it is raining?", uk: "Що ти береш із собою, коли йде дощ?", ru: "Что ты берёшь с собой, когда идёт дождь?", say: "I take an umbrella." },
      { q: "What month is your birthday in?", uk: "У якому місяці твій день народження?", ru: "В каком месяце твой день рождения?", say: "My birthday is in..." },
    ],
  },
];

const kidsCards: PrintDoc = {
  id: "kids-speaking-cards",
  title: { uk: "60 карток для говоріння для дітей", ru: "60 карточек для говорения для детей" },
  subtitle: {
    uk: "6 тем по 10 карток, рівні A1-A2. Лицьовий бік англійською, на звороті переклад і зразок відповіді для дорослого.",
    ru: "6 тем по 10 карточек, уровни A1-A2. Лицевая сторона на английском, на обороте перевод и образец ответа для взрослого.",
  },
  level: "A1-A2",
  blocks: [
    { h: { uk: "Як користуватися", ru: "Как пользоваться" } },
    {
      list: [
        { uk: "Друкуйте двосторонньо (переворот по короткому краю) на щільному папері й розріжте по лініях.", ru: "Печатайте двусторонне (переворот по короткому краю) на плотной бумаге и разрежьте по линиям." },
        { uk: "Зворот для вчителя або батьків: там переклад питання й початок відповіді. Дитина відповідає з лицьового боку.", ru: "Оборот для учителя или родителей: там перевод вопроса и начало ответа. Ребёнок отвечает с лицевой стороны." },
        { uk: "Для A1 достатньо відповіді одним словом або фразою зі звороту. Для A2 просіть 2-3 речення й одне питання у відповідь: «And you?».", ru: "Для A1 достаточно ответа одним словом или фразой с оборота. Для A2 просите 2-3 предложения и один вопрос в ответ: «And you?»." },
      ],
    },
    { h: { uk: "Ігри з картками", ru: "Игры с карточками" } },
    {
      list: [
        { uk: "«Lucky dip»: картки в мішечку, дитина витягує одну й відповідає. Правильна відповідь приносить картку в «скарбничку».", ru: "«Lucky dip»: карточки в мешочке, ребёнок вытягивает одну и отвечает. Правильный ответ приносит карточку в «копилку»." },
        { uk: "«Dice talk»: кидаєте кубик, число на кубику означає, скільки слів має бути у відповіді.", ru: "«Dice talk»: бросаете кубик, число на кубике означает, сколько слов должно быть в ответе." },
        { uk: "«Teacher for a minute»: дитина ставить питання з картки дорослому й перевіряє його відповідь.", ru: "«Teacher for a minute»: ребёнок задаёт вопрос с карточки взрослому и проверяет его ответ." },
        { uk: "«Snap the theme»: розкладіть картки різних тем; хто першим назве тему картки англійською, той її забирає.", ru: "«Snap the theme»: разложите карточки разных тем; кто первым назовёт тему карточки по-английски, тот её забирает." },
      ],
    },
    { tip: { uk: "5-10 хвилин на день із картками дають більше, ніж година раз на тиждень. Хваліть за спробу, навіть якщо відповідь неідеальна.", ru: "5-10 минут в день с карточками дают больше, чем час раз в неделю. Хвалите за попытку, даже если ответ неидеальный." } },
    { pagebreak: true },
    ...THEMES.flatMap((t, i): Block[] => {
      const b: Block[] = [
        { h: `${i + 1}. ${t.en}` },
        {
          cards: t.cards.map((c) => ({
            front: c.q,
            back: { uk: `${t.uk}. ${c.uk} Відповідь: ${c.say}`, ru: `${t.ru}. ${c.ru} Ответ: ${c.say}` },
          })),
        },
      ];
      if (i < THEMES.length - 1) b.push({ pagebreak: true });
      return b;
    }),
  ],
};

// ---------- 6 ігор для друку ----------

// Bingo: 30 слів, 4 різні картки 5x5 з FREE у центрі (детермінований порядок)
const BINGO_WORDS: [string, string][] = [
  ["cat", "It says 'meow'. It likes milk."],
  ["dog", "It says 'woof'. It is a good friend."],
  ["cow", "It is big. It gives us milk."],
  ["horse", "It is big and fast. You can ride it."],
  ["frog", "It is green. It can jump and swim."],
  ["duck", "It says 'quack'. It can swim."],
  ["lion", "It is big and yellow. It is the king of animals."],
  ["monkey", "It likes bananas. It can climb trees."],
  ["rabbit", "It has got long ears. It likes carrots."],
  ["bird", "It has got wings. It can fly and sing."],
  ["fish", "It lives in water. It can't walk."],
  ["bear", "It is big and brown. It likes honey."],
  ["snake", "It is long. It hasn't got legs."],
  ["elephant", "It is very big and grey. It has got a long nose."],
  ["mouse", "It is small and grey. It likes cheese."],
  ["apple", "It is red or green. It is a fruit."],
  ["banana", "It is long and yellow. Monkeys like it."],
  ["bread", "We make sandwiches with it."],
  ["cheese", "It is yellow. Mice like it."],
  ["milk", "It is white. We drink it."],
  ["egg", "A hen gives it to us. It is white or brown."],
  ["carrot", "It is orange. Rabbits like it."],
  ["tomato", "It is red and round. We put it in a salad."],
  ["soup", "It is hot. We eat it with a spoon."],
  ["ice cream", "It is cold and sweet."],
  ["juice", "We drink it. It is made from fruit."],
  ["cake", "We eat it on a birthday."],
  ["rice", "It is small and white. People in China eat a lot of it."],
  ["orange", "It is a fruit. It is also a colour."],
  ["sandwich", "Bread with cheese or ham inside."],
];

const shuffled = (seed: number): string[] => {
  const arr = BINGO_WORDS.map(([w]) => w);
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const bingoCard = (seed: number): { head: string[]; rows: string[][] } => {
  const w = shuffled(seed).slice(0, 24);
  const cells = [...w.slice(0, 12), "FREE", ...w.slice(12)];
  const rows: string[][] = [];
  for (let r = 0; r < 5; r++) rows.push(cells.slice(r * 5, r * 5 + 5));
  return { head: ["B", "I", "N", "G", "O"], rows };
};

const L = (uk: string, ru: string): L2 => ({ uk, ru });

const BOARD: string[] = [
  "START",
  "Say your name and age.",
  "Name 3 colours.",
  "Count from 1 to 10.",
  "Go forward 2!",
  "Say 3 animals.",
  "What's the weather like today?",
  "Spell your name.",
  "Name 3 things in your bag.",
  "Miss a turn.",
  "Say 2 things you can do.",
  "What is your favourite food?",
  "Count from 10 to 1.",
  "Name 4 parts of the body.",
  "Go back 3.",
  "Say 3 fruits.",
  "What colour is your T-shirt?",
  "Name 4 family members.",
  "Say 3 toys.",
  "Jump to square 22!",
  "Name the days of the week.",
  "What do you wear in winter?",
  "Say a sentence with 'I like'.",
  "Name 3 things in the kitchen.",
  "Go back 4.",
  "Ask your friend a question.",
  "Name the four seasons.",
  "Say 3 sentences about you.",
  "Name 5 numbers bigger than 20.",
  "FINISH",
];

const boardRows = (): string[][] => {
  const rows: string[][] = [];
  for (let i = 0; i < 15; i++) rows.push([String(i + 1), BOARD[i], String(i + 16), BOARD[i + 15]]);
  return rows;
};

const MEMORY: [string, string, string, string][] = [
  ["a cow", "It gives us milk.", "корова / Вона дає нам молоко.", "корова / Она даёт нам молоко."],
  ["a bird", "It can fly.", "пташка / Вона вміє літати.", "птица / Она умеет летать."],
  ["a fish", "It lives in water.", "риба / Вона живе у воді.", "рыба / Она живёт в воде."],
  ["a rabbit", "It has got long ears.", "кролик / У нього довгі вуха.", "кролик / У него длинные уши."],
  ["an umbrella", "We need it when it rains.", "парасолька / Вона потрібна, коли йде дощ.", "зонт / Он нужен, когда идёт дождь."],
  ["a bed", "We sleep in it.", "ліжко / Ми спимо в ньому.", "кровать / Мы спим в ней."],
  ["a pencil", "We draw with it.", "олівець / Ми ним малюємо.", "карандаш / Мы им рисуем."],
  ["a ball", "It is round. We play football with it.", "м'яч / Він круглий, ним грають у футбол.", "мяч / Он круглый, им играют в футбол."],
  ["snow", "It is white and cold.", "сніг / Він білий і холодний.", "снег / Он белый и холодный."],
  ["the sun", "It is hot and yellow.", "сонце / Воно гаряче й жовте.", "солнце / Оно горячее и жёлтое."],
  ["a cake", "We eat it on a birthday.", "торт / Його їдять на день народження.", "торт / Его едят на день рождения."],
  ["a book", "We read it.", "книжка / Ми її читаємо.", "книга / Мы её читаем."],
];

const gamesDoc: PrintDoc = {
  id: "kids-games-print",
  title: { uk: "6 ігор англійською для класу й дому", ru: "6 игр на английском для класса и дома" },
  subtitle: {
    uk: "Бінго, «Find someone who», гра-ходилка, пам'ять, хрестики-нулики, «Stop!». Рівні A1-A2, від 2 гравців.",
    ru: "Бинго, «Find someone who», игра-ходилка, память, крестики-нолики, «Stop!». Уровни A1-A2, от 2 игроков.",
  },
  level: "A1-A2",
  blocks: [
    { h: { uk: "Зміст", ru: "Содержание" } },
    {
      table: {
        head: [{ uk: "Гра", ru: "Игра" }, { uk: "Що тренує", ru: "Что тренирует" }, { uk: "Гравці", ru: "Игроки" }, { uk: "Час", ru: "Время" }],
        rows: [
          ["1. Animal and Food Bingo", L("слова: тварини, їжа; слухання", "слова: животные, еда; аудирование"), "2-30", "10-15"],
          ["2. Find someone who...", L("питання Have you got...? Can you...? Do you like...?", "вопросы Have you got...? Can you...? Do you like...?"), "6-30", "10-15"],
          ["3. The English Path", L("усі теми A1, швидке говоріння", "все темы A1, быстрое говорение"), "2-5", "15-20"],
          ["4. Memory pairs", L("слова й прості описи, читання", "слова и простые описания, чтение"), "2-4", "10"],
          ["5. Tic-tac-toe", L("is / are, can, короткі відповіді", "is / are, can, краткие ответы"), "2", "5-10"],
          ["6. Stop!", L("правопис, слова за категоріями", "правописание, слова по категориям"), "2-30", "10"],
        ],
      },
    },
    { tip: { uk: "Правило всіх ігор: під час гри говоримо англійською. Дозволені «рятівні» фрази: «Can you help me?», «How do you say... in English?», «It's my turn!», «Your turn!», «I've finished!».", ru: "Правило всех игр: во время игры говорим по-английски. Разрешённые «спасательные» фразы: «Can you help me?», «How do you say... in English?», «It's my turn!», «Your turn!», «I've finished!»." } },
    { pagebreak: true },

    // 1. Bingo
    { h: "1. Animal and Food Bingo" },
    {
      list: [
        { uk: "Роздайте кожному гравцеві картку (4 різні картки на наступних сторінках; для великої групи роздрукуйте кілька комплектів).", ru: "Раздайте каждому игроку карточку (4 разные карточки на следующих страницах; для большой группы распечатайте несколько комплектов)." },
        { uk: "Ведучий у випадковому порядку називає слова зі списку нижче. Гравці закреслюють слово, якщо воно є на картці. FREE закреслене одразу.", ru: "Ведущий в случайном порядке называет слова из списка ниже. Игроки зачёркивают слово, если оно есть на карточке. FREE зачёркнуто сразу." },
        { uk: "Хто першим закреслив повний рядок, стовпчик або діагональ, кричить «Bingo!» і читає свої слова вголос.", ru: "Кто первым зачеркнул полный ряд, столбец или диагональ, кричит «Bingo!» и читает свои слова вслух." },
        { uk: "Складніша версія (A2): ведучий не називає слово, а читає підказку з правої колонки. Гравці мають самі здогадатися, про що йдеться.", ru: "Более сложная версия (A2): ведущий не называет слово, а читает подсказку из правой колонки. Игроки должны сами догадаться, о чём речь." },
      ],
    },
    { table: { head: ["Word", "Clue (A2)"], rows: BINGO_WORDS.map(([w, c]) => [w, c]) } },
    { pagebreak: true },
    { h: "Bingo card 1" },
    { table: bingoCard(7) },
    { lines: 1 },
    { h: "Bingo card 2" },
    { table: bingoCard(19) },
    { pagebreak: true },
    { h: "Bingo card 3" },
    { table: bingoCard(42) },
    { lines: 1 },
    { h: "Bingo card 4" },
    { table: bingoCard(77) },
    { pagebreak: true },

    // 2. Find someone who
    { h: "2. Find someone who..." },
    {
      list: [
        { uk: "Кожен отримує аркуш. Діти ходять класом і ставлять питання з середньої колонки різним однокласникам.", ru: "Каждый получает лист. Дети ходят по классу и задают вопросы из средней колонки разным одноклассникам." },
        { uk: "Якщо відповідь «Yes», записують ім'я в останню колонку. Одне ім'я можна записати лише двічі.", ru: "Если ответ «Yes», записывают имя в последнюю колонку. Одно имя можно записать только дважды." },
        { uk: "Перемагає той, хто першим заповнить 10 рядків. Наприкінці кожен розповідає 2 факти: «Anna has got a cat.»", ru: "Побеждает тот, кто первым заполнит 10 строк. В конце каждый рассказывает 2 факта: «Anna has got a cat.»" },
        { uk: "Удома: дитина ставить питання членам родини, бабусі по телефону або іграшкам, які «відповідають» голосом дорослого.", ru: "Дома: ребёнок задаёт вопросы членам семьи, бабушке по телефону или игрушкам, которые «отвечают» голосом взрослого." },
      ],
    },
    {
      table: {
        head: ["Find someone who...", "Ask", "Name"],
        rows: [
          ["...has got a pet.", "Have you got a pet?", ""],
          ["...can swim.", "Can you swim?", ""],
          ["...likes ice cream.", "Do you like ice cream?", ""],
          ["...has got a sister.", "Have you got a sister?", ""],
          ["...can ride a bike.", "Can you ride a bike?", ""],
          ["...likes winter.", "Do you like winter?", ""],
          ["...has got a blue pencil case.", "Have you got a blue pencil case?", ""],
          ["...can count to twenty in English.", "Can you count to twenty?", ""],
          ["...likes carrots.", "Do you like carrots?", ""],
          ["...plays football.", "Do you play football?", ""],
          ["...can draw a cat.", "Can you draw a cat?", ""],
          ["...has got a birthday in summer.", "Is your birthday in summer?", ""],
        ],
      },
    },
    { tip: { uk: "Нагадайте короткі відповіді: «Yes, I have. / No, I haven't.», «Yes, I can. / No, I can't.», «Yes, I do. / No, I don't.». Без них гра не рахується.", ru: "Напомните краткие ответы: «Yes, I have. / No, I haven't.», «Yes, I can. / No, I can't.», «Yes, I do. / No, I don't.». Без них игра не засчитывается." } },
    { pagebreak: true },

    // 3. Board game
    { h: "3. The English Path" },
    {
      list: [
        { uk: "Потрібні: кубик, фішки (ґудзики, монетки), ця таблиця. Можна намалювати доріжку з 30 клітинок на великому аркуші й вписати номери.", ru: "Нужны: кубик, фишки (пуговицы, монетки), эта таблица. Можно нарисовать дорожку из 30 клеток на большом листе и вписать номера." },
        { uk: "Гравець кидає кубик, рухається вперед і виконує завдання клітинки англійською. Якщо не впорався, повертається туди, де стояв.", ru: "Игрок бросает кубик, двигается вперёд и выполняет задание клетки по-английски. Если не справился, возвращается туда, где стоял." },
        { uk: "Клітинки «Go forward», «Go back», «Jump to», «Miss a turn» виконуються без завдання. Перемагає той, хто першим дійде до FINISH.", ru: "Клетки «Go forward», «Go back», «Jump to», «Miss a turn» выполняются без задания. Побеждает тот, кто первым дойдёт до FINISH." },
        { uk: "Перед кидком гравець каже «It's my turn!», після ходу «Your turn!».", ru: "Перед броском игрок говорит «It's my turn!», после хода «Your turn!»." },
      ],
    },
    { table: { head: ["#", "Task", "#", "Task"], rows: boardRows() } },
    { pagebreak: true },

    // 4. Memory
    { h: "4. Memory pairs" },
    {
      list: [
        { uk: "Друкуйте ЛИШЕ лицьовий бік (односторонній друк), щоб картки не просвічувалися. Наклейте на картон і розріжте.", ru: "Печатайте ТОЛЬКО лицевую сторону (односторонняя печать), чтобы карточки не просвечивали. Наклейте на картон и разрежьте." },
        { uk: "Перемішайте 24 картки й покладіть написом донизу. Гравець відкриває дві картки й читає їх уголос.", ru: "Перемешайте 24 карточки и положите надписью вниз. Игрок открывает две карточки и читает их вслух." },
        { uk: "Пара: слово й опис, що йому відповідає («a cow» і «It gives us milk.»). Хто знайшов пару, забирає її й ходить ще раз.", ru: "Пара: слово и описание, которое ему соответствует («a cow» и «It gives us milk.»). Кто нашёл пару, забирает её и ходит ещё раз." },
        { uk: "Для A1 почніть з 6 пар. Переклад для дорослого надрукований у ключах наприкінці гри.", ru: "Для A1 начните с 6 пар. Перевод для взрослого напечатан в ключах в конце игры." },
      ],
    },
    {
      cards: MEMORY.flatMap(([word, clue, uk, ru]) => [
        { front: word, back: { uk, ru } },
        { front: clue, back: { uk, ru } },
      ]),
    },
    { answers: { title: L("Ключ: пари для гри «Memory»", "Ключ: пары для игры «Memory»"), items: MEMORY.map(([w, c]) => `${w} = ${c}`) } },
    { pagebreak: true },

    // 5. Tic-tac-toe
    { h: "5. Tic-tac-toe" },
    {
      list: [
        { uk: "Двоє гравців: X і O. Щоб поставити свій знак у клітинку, треба правильно виконати завдання в ній.", ru: "Двое игроков: X и O. Чтобы поставить свой знак в клетку, нужно правильно выполнить задание в ней." },
        { uk: "Перемагає той, хто першим займе 3 клітинки в ряд. Якщо помилився, хід переходить до суперника, а клітинка лишається вільною.", ru: "Побеждает тот, кто первым займёт 3 клетки в ряд. Если ошибся, ход переходит к сопернику, а клетка остаётся свободной." },
        { uk: "Поле 1: кажемо англійською. Поле 2: is чи are. Поле 3: відповідаємо коротко (Yes, I can / No, I can't).", ru: "Поле 1: говорим по-английски. Поле 2: is или are. Поле 3: отвечаем коротко (Yes, I can / No, I can't)." },
      ],
    },
    { h: "Board 1: Say it!" },
    {
      table: {
        head: ["A", "B", "C"],
        rows: [
          ["Say 3 colours.", "Say 3 animals.", "Say 3 fruits."],
          ["Count to 12.", "Say 3 toys.", "Say 3 school things."],
          ["Say 3 clothes.", "Say 3 drinks.", "Say 3 family words."],
        ],
      },
    },
    { h: "Board 2: is or are?" },
    {
      table: {
        head: ["A", "B", "C"],
        rows: [
          ["The cat ___ black.", "The apples ___ red.", "My mum ___ kind."],
          ["The books ___ big.", "It ___ sunny today.", "We ___ friends."],
          ["The dog ___ happy.", "My shoes ___ new.", "The sky ___ blue."],
        ],
      },
    },
    { h: "Board 3: Can you...?" },
    {
      table: {
        head: ["A", "B", "C"],
        rows: [
          ["Can you swim?", "Can you jump on one leg?", "Can you sing a song?"],
          ["Can you draw a fish?", "Can you spell 'dog'?", "Can you clap 5 times?"],
          ["Can you say the alphabet?", "Can you touch your nose?", "Can you count to 20?"],
        ],
      },
    },
    { answers: { title: L("Ключ: поле 2 (is / are)", "Ключ: поле 2 (is / are)"), items: ["The cat is black.", "The apples are red.", "My mum is kind.", "The books are big.", "It is sunny today.", "We are friends.", "The dog is happy.", "My shoes are new.", "The sky is blue."] } },
    { pagebreak: true },

    // 6. Stop!
    { h: "6. Stop!" },
    {
      list: [
        { uk: "Ведучий називає літеру. Гравці якнайшвидше вписують у рядок слово на цю літеру для кожної категорії.", ru: "Ведущий называет букву. Игроки как можно быстрее вписывают в строку слово на эту букву для каждой категории." },
        { uk: "Хто заповнив увесь рядок, кричить «Stop!», і всі кладуть ручки.", ru: "Кто заполнил всю строку, кричит «Stop!», и все кладут ручки." },
        { uk: "Бали: 10 за слово, якого немає ні в кого, 5 за слово, яке є в інших, 0 за порожню клітинку або помилку в написанні.", ru: "Баллы: 10 за слово, которого нет ни у кого, 5 за слово, которое есть у других, 0 за пустую клетку или ошибку в написании." },
        { uk: "Для A1 дозволено підглядати в словничок або картки; для A2 грайте на час (1 хвилина на рядок).", ru: "Для A1 разрешено подсматривать в словарик или карточки; для A2 играйте на время (1 минута на строку)." },
      ],
    },
    {
      table: {
        head: ["Letter", "Animal", "Food", "Colour", "Thing at school", "Points"],
        rows: [
          ["B", "", "", "", "", ""],
          ["C", "", "", "", "", ""],
          ["P", "", "", "", "", ""],
          ["G", "", "", "", "", ""],
          ["R", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
        ],
      },
    },
    { p: { uk: "Загальний рахунок: ______", ru: "Общий счёт: ______" } },
    {
      answers: {
        title: L("Можливі відповіді для гри «Stop!»", "Возможные ответы для игры «Stop!»"),
        items: [
          "B: bear, bird / bread, banana / blue, black / book, bag",
          "C: cat, cow / cake, cheese / cream / chair, crayon",
          "P: pig, parrot / pizza, pear / pink, purple / pen, pencil",
          "G: giraffe, goat / grapes / green, grey / glue",
          "R: rabbit / rice / red / ruler, rubber",
        ],
      },
    },
  ],
};

export const KIDS: PrintDoc[] = [kidsCards, gamesDoc];
