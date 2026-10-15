// Бібліотека, пакет 1: повні 60-хвилинні уроки для дітей 6-11 (A1-A2).
// Тексти, діалоги і вправи власні. Відео тільки ті, що вже були в уроках.
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, video, vocab, ex, talk } = makeHelpers('b1');

export const BATCH_1: Plan[] = [
  // ---------- ANIMALS AT THE ZOO ----------
  {
    id: 'lib-zoo-animals', title: 'Animals at the zoo', level: 'A1', age: 'kids', topic: 'Тварини', color: 'lime', source: 'murly',
    focus: ['Vocabulary', 'Reading', 'Grammar', 'Speaking'],
    aims: 'Вивчимо назви тварин у зоопарку\nПрочитаємо коротку історію про день у зоопарку\nНавчимося казати, що тварина вміє і не вміє робити: can / can’t\nОпишемо свою улюблену тварину',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`Do you like animals?
Have you got a pet?
Have you ever been to a zoo?`),
      note('Почни з гри «Guess the animal»: покажи тварину рухами і звуками (слон махає хоботом, мавпа чухає голову), дитина вгадує українською або англійською. Потім 2-3 питання з блоку. Не виправляй помилки на цьому етапі, головне розговорити дитину.'),

      h('Vocabulary · 12 хв'),
      vocab(`lion = лев
elephant = слон
monkey = мавпа
giraffe = жирафа
zebra = зебра
penguin = пінгвін
crocodile = крокодил
bear = ведмідь
parrot = папуга
big = великий
small = маленький
funny = смішний`),
      note('Промов кожне слово 2-3 рази, дитина повторює і показує тварину рухом (TPR). Гра «What’s missing?»: назви 5 тварин, «сховай» одну, дитина каже, якої немає. Потім вправи. Після вправ додай слова в словник учня.'),
      ex(
        ['match', 'Знайди пару.', `lion = лев
giraffe = жирафа
bear = ведмідь
parrot = папуга
crocodile = крокодил
zebra = зебра`],
        ['gap', 'Напиши тварину англійською.', `слон: an [elephant]
мавпа: a [monkey]
пінгвін: a [penguin]
лев: a [lion]`],
      ),

      h('Reading · 15 хв'),
      t(`**A day at the zoo**

Hi! My name is Olya. Today I am at the zoo with my dad.

This is a big elephant. It is grey. It can swim, but it can’t jump.

There are three monkeys. They are funny. They can climb trees.

A giraffe has a long neck. It can eat leaves from tall trees.

Look at the penguins! A penguin can swim, but it can’t fly. A parrot can fly and it can talk!

My favourite animal is the lion. It is big and yellow. It can run very fast.`),
      note('Спочатку прочитай текст сам, дитина слухає і показує пальцем тварин на картинках (можна намалювати разом). Потім дитина читає по одному реченню. Gist: одне питання про тему тексту. Detail: True / False і вибір. Помилки у вимові виправляй м’яко, просто повтори слово правильно.'),
      ex(['choice', 'Про що текст?', 'The text is about {a day at the zoo|a day at school|a trip to the sea}.']),
      ex(
        ['truefalse', 'Прочитай і обери True або False.', `Olya is at the zoo with her mum. = False
The elephant is grey. = True
There are three monkeys. = True
A penguin can fly. = False
Olya’s favourite animal is the lion. = True`],
        ['choice', 'Обери правильне слово.', `The elephant is {big|small}.
A giraffe has a {long|short} neck.
The monkeys are {funny|sad}.
A parrot can {talk|swim}.`],
      ),

      h('Grammar: can / can’t · 10 хв'),
      tip('Щоб сказати, що тварина **вміє** робити, використовуй **can**: A monkey **can** climb. A penguin **can** swim.\n\nЯкщо **не вміє**, то **can’t**: A penguin **can’t** fly.\n\nПитання: **Can** a lion swim? Yes, it **can**. / No, it **can’t**.'),
      note('Покажи правило на тілі: «I can jump» (стрибни), «I can’t fly» (помахай руками і похитай головою). Дитина повторює. Гра «Yes or no?»: ти кажеш речення (A fish can run), дитина піднімає руки, якщо правда, і сідає, якщо ні. Потім письмові вправи.'),
      ex(
        ['gap', 'Напиши can або can’t.', `A monkey [can] climb trees.
A penguin [can’t/cannot] fly.
A parrot [can] fly.
An elephant [can’t/cannot] jump.
A fish [can] swim.`],
        ['choice', 'Обери правильний варіант.', `{Can|Does|Is} a lion run fast? Yes, it {can|does|is}.
Can a giraffe fly? No, it {can’t|isn’t|doesn’t}.`],
      ),
      ex(['translate', 'Переклади англійською.', `Мавпа вміє лазити = A monkey can climb / The monkey can climb
Пінгвін не вміє літати = A penguin can’t fly / A penguin cannot fly / The penguin can’t fly
Слон великий = An elephant is big / The elephant is big`]),

      h('Speaking · 12 хв'),
      talk(`What is your favourite animal?
What colour is it?
What can it do? What can’t it do?
Can a lion swim? Can a crocodile climb?
What animals can you see in your city?`),
      note('Гра «Who am I?»: дитина загадує тварину, ти питаєш Can you fly? Can you swim? Are you big? Вона відповідає Yes, I can / No, I can’t. Потім міняєтеся ролями. Наприкінці дитина записує голосову відповідь. Виправляй помилки в can + дієслово (не can to swim).'),
      ex(['voice', 'Запиши голосом 3-4 речення.', 'Describe your favourite animal. What is it? What colour is it? What can it do?']),

      h('Wrap-up · 6 хв'),
      ex(['open', 'Напиши про свою улюблену тварину (3 речення).', 'My favourite animal is... It is... It can... It can’t...']),
      note('Exit task: дитина називає 5 тварин за 30 секунд. Домашнє завдання: намалювати «свій зоопарк» з 4 тваринами і підписати по реченню з can / can’t до кожної. Можна повторити слова в іграх Murly.'),
    ],
  },

  // ---------- MY DAY ----------
  {
    id: 'lib-my-day', title: 'My day', level: 'A1', age: 'kids', topic: 'Розпорядок дня', color: 'sky', source: 'murly',
    focus: ['Vocabulary', 'Listening', 'Grammar', 'Speaking'],
    aims: 'Вивчимо слова про розпорядок дня\nПослухаємо діалог двох дітей про їхній день\nНавчимося використовувати Present Simple: I get up, he gets up\nРозкажемо про свій день',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What time is it now?
Are you a morning person or an evening person?
What do you do in the morning?`),
      note('Гра «Mime my morning»: ти мовчки показуєш дії (прокидаєшся, чистиш зуби, снідаєш), дитина вгадує. Можна українською, слова вона вивчить на наступному етапі. Повтори з дитиною час: seven o’clock, eight o’clock.'),

      h('Vocabulary · 12 хв'),
      vocab(`get up = вставати
wash my face = вмиватися
brush my teeth = чистити зуби
get dressed = одягатися
have breakfast = снідати
go to school = йти до школи
have lunch = обідати
come home = приходити додому
do homework = робити домашнє завдання
play = гратися
have dinner = вечеряти
go to bed = лягати спати
o’clock = година (рівно)`),
      note('Кожну фразу показуй рухом, дитина повторює слово і рух (TPR). Потім «Simon says»: Simon says brush your teeth! Якщо команда без Simon says, рухатися не можна. Після гри вправи.'),
      ex(
        ['match', 'Знайди пару.', `get up = вставати
have breakfast = снідати
get dressed = одягатися
do homework = робити домашнє завдання
go to bed = лягати спати
have dinner = вечеряти`],
        ['choice', 'Обери правильне слово.', `In the morning I {get up|go to bed}.
I {brush|play} my teeth.
At 8 o’clock I go to {school|bed}.`],
      ),

      h('Listening · 15 хв'),
      audio('Anna and Tom: our days', `Anna: Hi, Tom! What time do you get up?
Tom: I get up at seven o’clock. And you?
Anna: I get up at half past six. I wash my face and get dressed.
Tom: Do you have breakfast?
Anna: Yes, I do. I have porridge with my mum. What about you?
Tom: I have eggs and juice. Then I go to school at eight.
Anna: Me too! What do you do after school?
Tom: I do my homework and play with my dog, Rex.
Anna: I play the piano. What time do you go to bed?
Tom: At nine o’clock. My sister goes to bed at ten.
Anna: Wow, that is late!`),
      note('Перше слухання: дитина відповідає на загальне питання (gist). Друге слухання: True / False. Можна ставити на паузу після кожної репліки. Для руху: коли дитина чує дію (get up, play), вона її показує.'),
      ex(['choice', 'Послухай. Про що говорять діти?', 'Anna and Tom talk about {their days|their pets|their holidays}.']),
      ex(
        ['truefalse', 'Послухай ще раз. True or False?', `Tom gets up at seven o’clock. = True
Anna has breakfast with her dad. = False
Tom has eggs and juice for breakfast. = True
Tom plays with his cat after school. = False
Tom’s sister goes to bed at ten. = True`],
        ['choice', 'Обери правильну відповідь.', `Anna gets up at {half past six|seven o’clock|eight o’clock}.
After school Anna {plays the piano|plays football|watches TV}.
Tom goes to bed at {nine|ten|eight} o’clock.`],
      ),

      h('Grammar: Present Simple · 10 хв'),
      tip('**Present Simple** говорить про те, що ми робимо щодня.\n\nI get up, you get up, we get up, they get up.\n\nАле **he / she / it** + **-s**: he **gets** up, she **plays**.\n\nЗапам’ятай: go = he **goes**, do = she **does**, have = he **has**.'),
      note('Дай дитині дві картки: «I» і «Tom». Ти кажеш дієслово (play), дитина обирає картку і каже речення: I play. Tom plays. Особливу увагу на goes, does, has. Найчастіша помилка: She go. Виправляй одразу, але весело: «Ой, Tom загубив свою -s!»'),
      ex(
        ['gap', 'Розкрий дужки.', `I [get] (get) up at 7.
Tom [has] (have) breakfast with his mum.
She [goes] (go) to school at 8.
We [play] (play) football after school.
My sister [does] (do) her homework in the evening.
Anna [gets] (get) dressed after breakfast.`],
        ['choice', 'Обери правильний варіант.', `He {goes|go} to bed at 9.
They {do|does} homework every day.
My dad {has|have} coffee in the morning.
I {brush|brushes} my teeth.`],
      ),
      ex(['translate', 'Переклади англійською.', `Я встаю о сьомій = I get up at seven / I get up at 7 / I get up at seven o’clock
Вона йде до школи = She goes to school
Він лягає спати о дев’ятій = He goes to bed at nine / He goes to bed at 9 / He goes to bed at nine o’clock`]),

      h('Speaking · 12 хв'),
      talk(`When do you get up?
What do you have for breakfast?
When do you go to school?
What do you do after school?
When do you go to bed?`),
      note('Інтерв’ю: дитина питає тебе ті самі питання, а потім розповідає про тебе в третій особі: My teacher gets up at 6. Це тренує -s. Можна намалювати годинники на папері і показувати час. Потім голосова відповідь.'),
      ex(['voice', 'Запиши голосом розповідь про свій ранок.', 'Tell about your morning. What time do you get up? What do you do then?']),

      h('Wrap-up · 6 хв'),
      t('Read Tom’s day: My name is Tom. I get up at 7 o’clock. I have breakfast with my mum. I go to school at 8. After school I do my homework and play with my dog. I go to bed at 9.'),
      ex(['open', 'Напиши про свій день (4-5 речень), як Том.', 'I get up at... I have breakfast... I go to school at... After school I... I go to bed at...']),
      note('Exit task: дитина називає 3 речі, які вона робить щодня, і одну річ, яку робить мама або тато (з -s). Домашнє завдання: зробити комікс «My day» з 4-6 картинок і підписати кожну реченням у Present Simple.'),
    ],
  },

  // ---------- YUMMY OR YUCKY ----------
  {
    id: 'lib-yummy-yucky', title: 'Yummy or yucky?', level: 'A1', age: 'kids', topic: 'Їжа', color: 'mustard', source: 'murly',
    focus: ['Listening', 'Vocabulary', 'Grammar', 'Speaking'],
    aims: 'Вивчимо назви їжі і напоїв\nПодивимось веселу пісню про дивні страви\nНавчимося питати Do you like…? і відповідати Yes, I do / No, I don’t\nПридумаємо своє чудернацьке меню',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What is your favourite food?
What food don’t you like?
Are you hungry now?`),
      note('Покажи два жести: «yummy» (гладимо живіт і усміхаємося) і «yucky» (кривимося і махаємо рукою). Називай страви українською, дитина показує жест. Потім 2-3 питання з блоку.'),

      h('Vocabulary · 12 хв'),
      vocab(`broccoli = броколі
ice cream = морозиво
pizza = піца
soup = суп
banana = банан
popcorn = попкорн
cheese = сир
chocolate = шоколад
carrot = морква
juice = сік
milk = молоко
yummy = смачно
yucky = фу, несмачно`),
      note('Гра «Yummy or yucky?»: називай слово англійською, дитина повторює і показує жест, як їй ця їжа. Потім гра «Magic bag»: «дістаєш» уявну їжу з торби, дитина вгадує за рухами (чистиш банан, їси суп ложкою).'),
      ex(
        ['match', 'Знайди пару.', `cheese = сир
carrot = морква
soup = суп
chocolate = шоколад
milk = молоко
broccoli = броколі`],
        ['sort', 'Food or drink? Розклади по групах.', `Food: pizza; soup; banana; popcorn; broccoli
Drink: juice; milk; water; tea`],
      ),

      h('Watch the song · 13 хв'),
      video('https://www.youtube.com/watch?v=frN3nvhIHUk', 'Подивись пісню. Які страви тобі здалися найсмішнішими?', 'Super Simple Songs'),
      note('У пісні звичайні страви змішуються в дивні пари (broccoli + ice cream). Перший перегляд: дитина просто дивиться і показує жест «yummy» або «yucky» після кожної пари. Другий перегляд: співайте разом відповіді Yes, I do / No, I don’t, потім вправи.'),
      ex(['choice', 'Про що пісня?', 'The song is about {strange food|animals|the weather}.']),
      ex(
        ['truefalse', 'True or False?', `Broccoli ice cream is yummy in the song. = False
Ice cream is food. = True
Juice is a drink. = True
Popcorn is a drink. = False`],
        ['choice', 'Обери правильне слово.', `Broccoli ice cream is {yucky|yummy}.
In the song, the answer is often {No, I don’t|Yes, I am|No, I am not}.
Ice cream is {cold|hot}.`],
      ),

      h('Grammar: Do you like…? · 10 хв'),
      tip('Питаємо: **Do you like pizza?**\n\nВідповідаємо: **Yes, I do!** або **No, I don’t.**\n\nКоротка відповідь повторює **do**, а не like.\n\nПро себе: **I like** bananas. **I don’t like** soup.'),
      note('Пограйте в «пінг-понг питаннями»: ти питаєш Do you like…?, дитина відповідає і одразу питає тебе. Стеж, щоб дитина не казала Yes, I like або No, I not. Якщо помилка, повтори правильну відповідь з ритмом, як у пісні.'),
      ex(
        ['gap', 'Встав do або don’t.', `Do you like pizza? Yes, I [do].
Do you like broccoli? No, I [don’t/do not].
[Do] you like ice cream? Yes, I do!
I [don’t/do not] like soup. It’s yucky!
I like bananas. They are yummy!`],
        ['choice', 'Обери правильну відповідь.', `Do you like bananas? Yes, I {do|like|am}.
Do you like soup? No, I {don’t|not|doesn’t}.
{Do|Are|Is} you like chocolate?`],
      ),
      ex(['translate', 'Переклади англійською.', `Я люблю піцу = I like pizza / I love pizza
Я не люблю моркву = I don’t like carrots / I do not like carrots / I don’t like carrot
Ти любиш сир? = Do you like cheese?`]),

      h('Speaking · 13 хв'),
      talk(`Ask your teacher: Do you like…? (5 foods)
What do you have for breakfast?
Invent a crazy food, like pizza juice. Is it yummy or yucky?`),
      note('Гра «Food survey»: дитина питає тебе (і, якщо можна, когось удома) про 5 страв і ставить у таблиці плюсик або мінус. Потім розповідає: My teacher likes cheese. Потім шкала думок і голосова відповідь. Для руху: «yummy» стрибок угору, «yucky» присідання.'),
      ex(['scale', 'Як ти думаєш?', `Pizza is yummy.
Broccoli is yummy.
Ice cream is the best food.`]),
      ex(['voice', 'Запиши голосом.', 'Tell about your crazy food. What is it? Do you like it? Is it yummy or yucky?']),

      h('Wrap-up · 7 хв'),
      ex(['open', 'Придумай чудернацьке меню з 3 страв і напиши, чи тобі подобається.', 'My crazy menu: ... I like... I don’t like...']),
      note('Exit task: назви 3 речі, які ти любиш, і 2, які не любиш. Домашнє завдання: намалювати «crazy menu» кафе з 4 дивними стравами (наприклад, banana soup) і підписати yummy або yucky. Можна ще раз проспівати пісню з батьками.'),
    ],
  },

  // ---------- WHAT'S THE WEATHER LIKE ----------
  {
    id: 'lib-weather-clothes', title: 'What’s the weather like?', level: 'A2', age: 'kids', topic: 'Погода і одяг', color: 'sky', source: 'murly',
    focus: ['Vocabulary', 'Reading', 'Grammar', 'Speaking', 'Writing'],
    aims: 'Назвемо погоду і одяг\nПрочитаємо листівку від друга\nНавчимося казати It’s sunny і I’m wearing a jacket\nВирішимо, що вдягнути в різну погоду, і напишемо відповідь',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What’s the weather like today?
What are you wearing now?
What is your favourite season?`),
      note('Попроси дитину подивитися у вікно і описати погоду одним словом. Гра «Weather moves»: sunny (руки вгору, як сонце), rainy (пальці «капають»), windy (хитаємося), snowy (тремтимо від холоду). Ти називаєш, дитина показує.'),

      h('Vocabulary · 12 хв'),
      vocab(`sunny = сонячно
rainy = дощово
windy = вітряно
snowy = сніжно
cloudy = хмарно
cold = холодно
hot = спекотно
a jacket = куртка
boots = чоботи
a scarf = шарф
a hat = шапка, капелюх
shorts = шорти
an umbrella = парасолька`),
      note('Гра «Dress the teacher»: дитина каже, що тобі вдягнути (Put on a scarf!), і ти «вдягаєш» уявний одяг. Потім навпаки. Після гри вправи. Зверни увагу на an umbrella (an перед голосним звуком).'),
      ex(
        ['sort', 'Weather or clothes? Розклади по групах.', `Weather: sunny; windy; cloudy; snowy
Clothes: a jacket; boots; a scarf; shorts`],
        ['match', 'Match the weather with the clothes.', `rainy = an umbrella
snowy = warm boots
hot and sunny = shorts
windy = a scarf`],
      ),

      h('Reading · 15 хв'),
      t(`Hi Sofia!

I’m in the mountains with my family. It’s very cold and snowy here! I’m wearing my big red jacket, warm boots and a scarf. My little brother is wearing a funny hat with a bobble.

Yesterday it was windy, so we stayed in the hotel and played games. Tomorrow it will be sunny, and we want to go skiing.

What’s the weather like in Kyiv?
Love, Mia`),
      note('Перед читанням спитай: Where is Mia? What do you think? Дитина читає листівку сама, потім gist-питання. Друге читання з олівцем: підкреслити всі слова про погоду і одяг. Далі detail-вправи. Невідомі слова (bobble, skiing) поясни жестом.'),
      ex(['choice', 'What is the postcard about?', 'Mia writes about {her holiday in the mountains|her new school|her birthday party}.']),
      ex(
        ['truefalse', 'Read and answer: True or False?', `Mia is at the sea. = False
It is cold and snowy. = True
Mia is wearing shorts. = False
Yesterday it was windy. = True
Tomorrow will be rainy. = False`],
        ['choice', 'Choose the right answer.', `Mia’s jacket is {red|blue|green}.
Yesterday they {stayed in the hotel|went skiing|went to the beach}.
Mia’s brother is wearing a funny {hat|scarf|jacket}.`],
      ),

      h('Grammar: It’s… / I’m wearing… · 10 хв'),
      tip('Погода: **It’s** + слово: It’s sunny. It’s cold. Питаємо: **What’s the weather like?**\n\nОдяг, який на тобі **зараз**: **I’m wearing** a jacket. **She’s wearing** boots. **They’re wearing** hats.\n\nЦе Present Continuous: am / is / are + дієслово з **-ing**.'),
      note('Гра «Fashion show»: дитина «виходить на подіум» і описує свій одяг: I’m wearing a T-shirt and jeans. Потім описує тебе: You’re wearing… Часта помилка: I wearing (без am). Виправляй, показуючи на себе: I AM wearing.'),
      ex(
        ['gap', 'Встав слово.', `It’s [rainy] today. Take an umbrella!
I’m [wearing] a warm jacket.
It’s [hot], let’s go to the beach!
She [is/’s] wearing a scarf.
They [are/’re] wearing boots.`],
        ['choice', 'Choose the right word.', `It’s {snowy|snow} today.
I {am wearing|wearing|am wear} shorts.
He {is wearing|are wearing|wear} a hat.
What’s the weather {like|is|it}?`],
      ),
      ex(['translate', 'Переклади англійською.', `Сьогодні вітряно = It’s windy today / It is windy today / Today it’s windy
Я вдягнений у куртку = I’m wearing a jacket / I am wearing a jacket`]),

      h('Speaking · 12 хв'),
      talk(`Look out of the window. What’s the weather like? What should you wear?
What is your favourite weather? Why?
What do you wear on a snowy day?
What do you like doing on a sunny day?`),
      note('Рольова гра «Weather reporter»: дитина веде прогноз погоди для різних міст (Lviv: It’s rainy. Wear boots and take an umbrella!), ти глядач, що питає What should I wear? Можна тримати «мікрофон» (ручку). Потім голосовий запис.'),
      ex(['voice', 'Запиши прогноз погоди.', 'You are a weather reporter. Tell us the weather today and what we should wear.']),

      h('Writing · 6 хв'),
      ex(['open', 'Напиши відповідь Мії (3-4 речення).', 'Hi Mia! What’s the weather like in your city? What are you wearing?']),
      note('Нагадай структуру листа: привітання, 2-3 речення, підпис (Love, …). Домашнє завдання: тиждень вести «weather diary» з малюнком і реченням щодня: Monday: It’s cloudy. I’m wearing a jacket.'),
    ],
  },

  // ---------- THIS IS MY FAMILY ----------
  {
    id: 'lib-my-family', title: 'This is my family', level: 'A1', age: 'kids', topic: 'Сім’я', color: 'tomato', source: 'murly',
    focus: ['Vocabulary', 'Listening', 'Grammar', 'Speaking', 'Writing'],
    aims: 'Назвемо членів сім’ї\nПослухаємо, як Макс показує другові фото своєї сім’ї\nНавчимося говорити have got / has got\nРозкажемо і напишемо про свою сім’ю',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`How are you today?
Is your family big or small?
Who do you live with?`),
      note('Попроси дитину заздалегідь підготувати фото сім’ї або намалювати сім’ю. Якщо фото немає, намалюйте разом прості фігурки. На цьому етапі дитина може називати людей українською.'),

      h('Vocabulary · 12 хв'),
      vocab(`mum = мама
dad = тато
sister = сестра
brother = брат
grandma = бабуся
grandpa = дідусь
aunt = тітка
uncle = дядько
cousin = двоюрідний брат / сестра
baby = немовля
family = сім’я
pet = домашній улюбленець`),
      note('Пісенька на пальцях «Finger family»: великий палець dad, вказівний mum, середній brother, безіменний sister, мізинець baby. Дитина показує пальці і називає. Потім вправи. Пояснити, що cousin і для хлопчика, і для дівчинки.'),
      ex(
        ['match', 'Знайди пару.', `mum = мама
grandpa = дідусь
aunt = тітка
brother = брат
uncle = дядько
cousin = двоюрідний брат / сестра`],
        ['gap', 'Хто це? Напиши слово.', `My mum’s mum is my [grandma].
My dad’s dad is my [grandpa].
My mum’s sister is my [aunt].
My aunt’s son is my [cousin].`],
      ),

      h('Listening · 15 хв'),
      audio('Max shows a photo', `Anna: Max, is this your family?
Max: Yes, it is! This is my mum and this is my dad.
Anna: Who is this girl?
Max: This is my sister. Her name is Lily. She is ten.
Anna: She has got long hair.
Max: Yes, she has. And this is my grandma and grandpa. They live with us.
Anna: Have you got a brother?
Max: No, I haven’t. But I have got a cousin. His name is Tom.
Anna: Has Tom got a pet?
Max: Yes, he has. He has got a funny dog called Biscuit.
Anna: I love dogs! Have you got a pet, Max?
Max: No, I haven’t. But I want a cat!`),
      note('Перед слуханням: Max shows his family photo. Who can you see? Перше слухання для загального розуміння, друге для деталей. Під час слухання дитина піднімає руку, коли чує слово про сім’ю. Можна читати діалог по ролях після вправ.'),
      ex(['choice', 'Послухай. Про що говорять діти?', 'Max talks about {his family|his school|his toys}.']),
      ex(
        ['truefalse', 'Послухай ще раз. True or False?', `Lily is Max’s sister. = True
Lily is eight. = False
Max’s grandma and grandpa live with him. = True
Max has got a brother. = False
Biscuit is a cat. = False`],
        ['choice', 'Обери правильну відповідь.', `Lily has got {long|short} hair.
Max’s cousin is called {Tom|Ben|Sam}.
Max wants a {cat|dog|parrot}.`],
      ),

      h('Grammar: have got / has got · 10 хв'),
      tip('I / you / we / they **have got**, але he / she / it **has got**.\n\nI **have got** a sister. She **has got** a cat.\n\nПитання: **Have** you **got** a brother? Yes, I **have**. / No, I **haven’t**.\n\n**Has** she **got** a pet? Yes, she **has**. / No, she **hasn’t**.'),
      note('Гра «Family cards»: на картках різні члени сім’ї і тварини. Дитина тягне картку і каже: I have got a… Потім про тебе: You have got… І про ляльку чи іграшку: She has got… Часта помилка: She have got. Виправляй, показуючи жестом «s» у повітрі.'),
      ex(
        ['gap', 'Встав have got або has got.', `I [have got] a big family.
Lily [has got] long hair.
We [have got] a cat.
My grandpa [has got] a red car.
[Have] you got a sister? Yes, I have.`],
        ['choice', 'Обери правильне слово.', `Max {has got|have got} one sister.
I {have got|has got} a big family.
Tom {has got|have got} a dog.`],
      ),
      ex(['translate', 'Переклади англійською.', `У мене є брат = I have got a brother / I’ve got a brother
У неї є кіт = She has got a cat / She’s got a cat`]),

      h('Speaking · 12 хв'),
      talk(`Who is in your family?
Have you got a brother or a sister?
Have you got a grandma? Where does she live?
Have you got a pet? What is its name?`),
      note('Дитина показує фото чи малюнок і презентує сім’ю: This is my… She has got… Ти ставиш уточнювальні питання. Потім міняєтеся: ти описуєш вигадану сім’ю, дитина малює те, що чує. Наприкінці голосовий запис.'),
      ex(['voice', 'Запиши голосом.', 'Show your family photo or picture and tell about your family. Who is this? What has he or she got?']),

      h('Writing · 6 хв'),
      t('Read Max’s text: Hello! I’m Max. I’m eight. I have got a big family. I have got one sister. Her name is Lily. She has got long hair. My grandma and grandpa live with us. My cousin Tom has got a funny dog called Biscuit.'),
      ex(['open', 'Напиши про свою сім’ю (4-5 речень), як Макс.', 'Hello! I’m... I have got... My mum... My dad... I have got / I haven’t got a pet.']),
      note('Exit task: назви 5 членів сім’ї за 20 секунд. Домашнє завдання: намалювати сімейне дерево (family tree) і підписати кожного: This is my grandma. She has got a garden.'),
    ],
  },

  // ---------- CARTOON TIME: MUDDY PUDDLES ----------
  {
    id: 'lib-cartoon-puddles', title: 'Cartoon time: Muddy puddles', level: 'A1', age: 'kids', topic: 'Мультики · Погода', color: 'sky', source: 'murly',
    focus: ['Listening', 'Vocabulary', 'Grammar', 'Speaking'],
    aims: 'Подивимось коротку серію мультика англійською\nВивчимо слова про дощ і погоду\nНавчимось казати, що ми любимо робити: I love jumping\nРозкажемо, що ми робимо в дощовий і сонячний день',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`Do you like rainy days?
What do you wear when it is raining?
Do you like jumping?`),
      note('Почни з руху: «It’s raining!» (пальці «капають» згори вниз), «Jump!» (стрибок), «Splash!» (тупнути ногою). Дитина повторює. Потім питання з блоку, відповіді одним словом нормальні для A1.'),

      h('Vocabulary · 12 хв'),
      vocab(`rain = дощ
It’s raining. = Іде дощ.
a puddle = калюжа
muddy = брудний, у багнюці
wet = мокрий
boots = чоботи
a raincoat = дощовик
an umbrella = парасолька
to jump = стрибати
to laugh = сміятися
to splash = хлюпати, бризкати`),
      note('Розклади на підлозі «калюжі» з паперу. Ти кажеш слово, дитина стрибає в калюжу і повторює його. Покажи жести для boots, raincoat, umbrella. Потім вправи.'),
      ex(
        ['match', 'Знайди пару.', `a puddle = калюжа
boots = чоботи
a raincoat = дощовик
wet = мокрий
to jump = стрибати
to laugh = сміятися`],
        ['choice', 'Обери правильне слово.', `It’s raining. Take an {umbrella|ice cream}!
I am wet. I need a {raincoat|pizza}.
The puddle is {muddy|happy}.`],
      ),

      h('Watch the cartoon · 15 хв'),
      video('https://www.youtube.com/watch?v=QFdLgfy63cc', 'Подивись серію (5 хв). Порахуй, скільки разів герої стрибають у калюжу!', 'Peppa Pig: Muddy Puddles (офіційний канал)'),
      note('Перед переглядом покажи жестами: rain, jump, boots. Перший перегляд: дитина рахує стрибки і стрибає разом з героями. Другий перегляд з паузами: What is the weather like? What is Peppa doing? Діти відповідають одним словом, це нормально для A1.'),
      ex(['choice', 'Про що мультик?', 'The cartoon is about {jumping in puddles|going to school|a birthday party}.']),
      ex(
        ['truefalse', 'True or False?', `At the start it is raining. = True
Peppa doesn’t like puddles. = False
You need boots to jump in puddles. = True
Peppa’s little brother is called George. = True
Nobody laughs in the cartoon. = False`],
        ['choice', 'Обери правильне слово.', `Peppa loves jumping in {muddy|dry} puddles.
Put on your {boots|hat} before you jump!
It’s {raining|sunny}, so we can’t go out.`],
      ),

      h('Grammar: I love jumping! · 10 хв'),
      tip('Щоб сказати, що ти любиш робити, додай **-ing** до дієслова: **I love jumping. I love swimming. I love playing.**\n\nЗапам’ятай: swim = swi**mm**ing, run = ru**nn**ing, dance = danc**ing** (без e).'),
      note('Гра «I love…»: дитина показує дію, ти вгадуєш: You love dancing! Потім навпаки. Якщо дитина каже I love jump, повтори з наголосом на кінчик: jump-ING! Можна плескати в долоні на -ing.'),
      ex(
        ['gap', 'Допиши -ing.', `I love [jumping] (jump) in puddles.
I love [playing] (play) with my friends.
I love [reading] (read) books.
I love [swimming] (swim) in the sea.
I love [dancing] (dance) to music.`],
        ['choice', 'Обери правильний варіант.', `I love {jumping|jump|jumps} in puddles.
George loves {laughing|laugh|laughs}.
We love {running|runing|run} in the park.`],
      ),
      ex(['translate', 'Переклади англійською.', `Я люблю стрибати = I love jumping / I like jumping
Іде дощ = It’s raining / It is raining`]),

      h('Speaking · 12 хв'),
      ex(['sort', 'Rainy day or sunny day? Що ти робиш? Розклади.', `Rainy day: jumping in puddles; wearing boots; taking an umbrella
Sunny day: swimming in the sea; eating ice cream; wearing shorts`]),
      talk(`What do you love doing on a rainy day?
What do you love doing on a sunny day?
Do you love jumping in puddles? Why?`),
      note('Рольова гра «Peppa and Mummy Pig»: дитина Peppa, ти мама. Peppa: Can I jump in puddles? Mummy: Yes, but put on your boots! Потім міняєтеся. Якщо є сили, стрибайте в паперові калюжі на кожне I love jumping! Наприкінці голосовий запис.'),
      ex(['voice', 'Запиши голосом.', 'Tell what you love doing on a rainy day. Say 3 sentences with I love...']),

      h('Wrap-up · 6 хв'),
      ex(['open', 'Напиши 3 речення: що ти любиш робити.', 'I love... I love... I love...']),
      note('Exit task: дитина називає 3 слова про дощ і одне речення з I love…ing. Домашнє завдання: намалювати себе в дощовий день (boots, raincoat, umbrella) і підписати: It’s raining. I love jumping in puddles! Можна ще раз подивитися серію з батьками.'),
    ],
  },
];
