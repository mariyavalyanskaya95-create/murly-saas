// Теми граматики Murly. Один формат для всіх сторінок /grammar/*
export type GrammarQuiz = { q: string; a: string; options: string[]; why?: string };
export type GrammarTopic = {
  slug: string;
  title: string;
  uk: string; // назва українською
  level: 'A1' | 'A2' | 'B1' | 'B2';
  icon: string;
  color: 'lime' | 'mustard' | 'sky' | 'tomato';
  lead: string;
  formula: { sign: string; text: string; example: string }[];
  uses: { title: string; example: string; uk: string }[];
  markers?: string[];
  mistakes: { wrong: string; right: string; note: string }[];
  tip: string;
  quiz: GrammarQuiz[];
};

export const GRAMMAR: GrammarTopic[] = [
  {
    slug: 'present-simple', title: 'Present Simple', uk: 'Теперішній простий час', level: 'A1', icon: 'd-clock', color: 'lime',
    lead: 'Звички, факти і розклади. Те, що відбувається регулярно або завжди правда.',
    formula: [
      { sign: '+', text: 'I / you / we / they + V; he / she / it + V-s', example: 'She plays tennis.' },
      { sign: '−', text: 'don’t / doesn’t + V', example: 'He doesn’t eat meat.' },
      { sign: '?', text: 'Do / Does + підмет + V?', example: 'Do you like pizza?' },
    ],
    uses: [
      { title: 'Звички і регулярні дії', example: 'I get up at 7 every day.', uk: 'Я встаю о 7 щодня.' },
      { title: 'Факти і загальні істини', example: 'Water boils at 100 °C.', uk: 'Вода кипить при 100 °C.' },
      { title: 'Розклади', example: 'The train leaves at 9:15.', uk: 'Потяг відправляється о 9:15.' },
    ],
    markers: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'on Mondays'],
    mistakes: [
      { wrong: 'He play football.', right: 'He plays football.', note: 'Для he / she / it додаємо -s.' },
      { wrong: 'She doesn’t likes it.', right: 'She doesn’t like it.', note: 'Після doesn’t дієслово без -s: закінчення вже «забрав» does.' },
    ],
    tip: 'He, she, it: в Present Simple «шипить». Запам’ятай: -s з’являється або в дієслові (plays), або в допоміжному (does), але ніколи в обох.',
    quiz: [
      { q: 'My sister ___ in Kyiv.', a: 'lives', options: ['live', 'lives', 'is living', 'living'] },
      { q: '___ your dad work on Saturdays?', a: 'Does', options: ['Do', 'Does', 'Is', 'Are'] },
      { q: 'We ___ watch TV in the morning.', a: 'don’t', options: ['doesn’t', 'don’t', 'aren’t', 'not'] },
      { q: 'The shop ___ at 8 a.m.', a: 'opens', options: ['open', 'opens', 'is open', 'opening'] },
      { q: 'He never ___ coffee.', a: 'drinks', options: ['drink', 'drinks', 'drinking', 'is drink'] },
    ],
  },
  {
    slug: 'present-continuous', title: 'Present Continuous', uk: 'Теперішній тривалий час', level: 'A1', icon: 'd-bolt', color: 'mustard',
    lead: 'Те, що відбувається прямо зараз або в цей період, а також плани на найближче майбутнє.',
    formula: [
      { sign: '+', text: 'am / is / are + V-ing', example: 'I am reading.' },
      { sign: '−', text: 'am not / isn’t / aren’t + V-ing', example: 'They aren’t listening.' },
      { sign: '?', text: 'Am / Is / Are + підмет + V-ing?', example: 'Is she sleeping?' },
    ],
    uses: [
      { title: 'Дія відбувається зараз', example: 'Look! It’s raining.', uk: 'Дивись! Іде дощ.' },
      { title: 'Тимчасова ситуація', example: 'I’m staying with my aunt this week.', uk: 'Цього тижня я живу в тітки.' },
      { title: 'Домовлені плани', example: 'We’re meeting Max tomorrow.', uk: 'Завтра ми зустрічаємося з Максом.' },
    ],
    markers: ['now', 'right now', 'at the moment', 'Look!', 'Listen!', 'this week', 'today'],
    mistakes: [
      { wrong: 'I reading now.', right: 'I am reading now.', note: 'Без am / is / are речення не працює.' },
      { wrong: 'I am knowing the answer.', right: 'I know the answer.', note: 'Дієслова стану (know, like, want, believe) зазвичай не вживаються з -ing.' },
    ],
    tip: 'Бачиш now, look або listen? Майже завжди потрібен Continuous. Але know, want, like і love «не люблять» -ing.',
    quiz: [
      { q: 'Be quiet! The baby ___.', a: 'is sleeping', options: ['sleeps', 'is sleeping', 'sleep', 'are sleeping'] },
      { q: 'They ___ football right now.', a: 'are playing', options: ['play', 'plays', 'are playing', 'is playing'] },
      { q: 'I ___ what you mean.', a: 'understand', options: ['am understanding', 'understand', 'understanding', 'is understand'] },
      { q: '___ you doing your homework?', a: 'Are', options: ['Do', 'Is', 'Are', 'Does'] },
      { q: 'She ___ to London tomorrow. Tickets are booked.', a: 'is flying', options: ['flies', 'is flying', 'fly', 'flying'] },
    ],
  },
  {
    slug: 'past-simple', title: 'Past Simple', uk: 'Минулий простий час', level: 'A2', icon: 'e-cal', color: 'sky',
    lead: 'Завершені дії в минулому, коли відомо, коли саме це було.',
    formula: [
      { sign: '+', text: 'V-ed або друга форма неправильного дієслова', example: 'I watched a film. She went home.' },
      { sign: '−', text: 'didn’t + V', example: 'We didn’t go out.' },
      { sign: '?', text: 'Did + підмет + V?', example: 'Did you see him?' },
    ],
    uses: [
      { title: 'Завершена дія в минулому', example: 'I visited Lviv last summer.', uk: 'Я їздив до Львова минулого літа.' },
      { title: 'Послідовність подій', example: 'He opened the door, looked around and left.', uk: 'Він відчинив двері, озирнувся і пішов.' },
    ],
    markers: ['yesterday', 'last week', 'ago', 'in 2020', 'when I was a child'],
    mistakes: [
      { wrong: 'Did you went there?', right: 'Did you go there?', note: 'Після did завжди перша форма дієслова.' },
      { wrong: 'I didn’t saw it.', right: 'I didn’t see it.', note: 'Минуле вже «сидить» у did. Друга форма не потрібна.' },
    ],
    tip: 'Did, як і does, забирає на себе час. Тому після did дієслово завжди у звичайній формі: Did you go? I didn’t go.',
    quiz: [
      { q: 'I ___ my grandma yesterday.', a: 'visited', options: ['visit', 'visited', 'have visited', 'visiting'] },
      { q: 'We ___ to the sea last year.', a: 'went', options: ['go', 'goed', 'went', 'gone'] },
      { q: 'Did she ___ the message?', a: 'read', options: ['reads', 'read', 'readed', 'reading'] },
      { q: 'They ___ come to the party.', a: 'didn’t', options: ['don’t', 'didn’t', 'weren’t', 'not'] },
      { q: 'He ___ his phone two days ago.', a: 'lost', options: ['lose', 'losed', 'lost', 'has lost'] },
    ],
  },
  {
    slug: 'past-continuous', title: 'Past Continuous', uk: 'Минулий тривалий час', level: 'A2', icon: 'd-camera', color: 'tomato',
    lead: 'Дія, яка тривала в певний момент у минулому. Часто це «фон» для іншої події.',
    formula: [
      { sign: '+', text: 'was / were + V-ing', example: 'I was walking home.' },
      { sign: '−', text: 'wasn’t / weren’t + V-ing', example: 'They weren’t listening.' },
      { sign: '?', text: 'Was / Were + підмет + V-ing?', example: 'Were you sleeping?' },
    ],
    uses: [
      { title: 'Дія в конкретний момент минулого', example: 'At 8 p.m. I was having dinner.', uk: 'О 8 вечора я вечеряв.' },
      { title: 'Тривала дія, яку перервали', example: 'I was taking a shower when the phone rang.', uk: 'Я приймав душ, коли задзвонив телефон.' },
      { title: 'Дві дії паралельно', example: 'She was cooking while he was cleaning.', uk: 'Вона готувала, поки він прибирав.' },
    ],
    markers: ['at 5 o’clock yesterday', 'while', 'when', 'all evening'],
    mistakes: [
      { wrong: 'When he called, I watched TV.', right: 'When he called, I was watching TV.', note: 'Довга дія, що вже тривала, ставиться в Continuous.' },
    ],
    tip: 'Уяви кадр з фільму: фон (was doing) і подія, що його перериває (did). While зазвичай з Continuous, when з Past Simple.',
    quiz: [
      { q: 'At 9 p.m. yesterday we ___ a film.', a: 'were watching', options: ['watched', 'were watching', 'was watching', 'watch'] },
      { q: 'I ___ home when I met Anna.', a: 'was walking', options: ['walked', 'was walking', 'were walking', 'walk'] },
      { q: 'While she was reading, he ___ dinner.', a: 'was cooking', options: ['cooked', 'cooks', 'was cooking', 'were cooking'] },
      { q: 'The lights went out while we ___.', a: 'were eating', options: ['ate', 'were eating', 'was eating', 'eat'] },
    ],
  },
  {
    slug: 'present-perfect', title: 'Present Perfect', uk: 'Теперішній доконаний час', level: 'B1', icon: 'd-spark', color: 'lime',
    lead: 'Минула дія, результат якої важливий зараз. Час не вказаний.',
    formula: [
      { sign: '+', text: 'have / has + V3 (третя форма)', example: 'I have finished.' },
      { sign: '−', text: 'haven’t / hasn’t + V3', example: 'She hasn’t called yet.' },
      { sign: '?', text: 'Have / Has + підмет + V3?', example: 'Have you ever been to Paris?' },
    ],
    uses: [
      { title: 'Досвід у житті', example: 'I have never tried sushi.', uk: 'Я ніколи не пробував суші.' },
      { title: 'Результат зараз', example: 'I’ve lost my keys.', uk: 'Я загубив ключі (і досі не маю їх).' },
      { title: 'Від минулого до тепер', example: 'We have lived here for five years.', uk: 'Ми живемо тут уже п’ять років.' },
    ],
    markers: ['ever', 'never', 'already', 'yet', 'just', 'for', 'since', 'so far'],
    mistakes: [
      { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', note: 'Є конкретний час у минулому, значить Past Simple.' },
      { wrong: 'I live here since 2020.', right: 'I have lived here since 2020.', note: 'Since і for з тривалістю до тепер вимагають Perfect.' },
    ],
    tip: 'Yesterday, last week, ago: це Past Simple. Ever, never, already, yet, just: це Present Perfect.',
    quiz: [
      { q: 'I ___ this film three times.', a: 'have seen', options: ['saw', 'have seen', 'has seen', 'see'] },
      { q: 'She ___ to London last year.', a: 'went', options: ['has gone', 'went', 'has been', 'goes'] },
      { q: 'Have you ___ been abroad?', a: 'ever', options: ['ever', 'yet', 'ago', 'last'] },
      { q: 'We have known each other ___ 2019.', a: 'since', options: ['for', 'since', 'from', 'ago'] },
      { q: 'He hasn’t finished his project ___.', a: 'yet', options: ['already', 'just', 'yet', 'ever'] },
    ],
  },
  {
    slug: 'future-forms', title: 'Will vs Going to', uk: 'Майбутній час', level: 'A2', icon: 'd-rocket', color: 'mustard',
    lead: 'Два головні способи говорити про майбутнє: спонтанне рішення чи план.',
    formula: [
      { sign: 'will', text: 'will + V', example: 'I’ll help you.' },
      { sign: 'going to', text: 'am / is / are going to + V', example: 'I’m going to study medicine.' },
      { sign: '−', text: 'won’t + V; am not / isn’t / aren’t going to + V', example: 'It won’t take long.' },
    ],
    uses: [
      { title: 'Рішення в момент мовлення (will)', example: 'It’s cold. I’ll close the window.', uk: 'Холодно. Я зачиню вікно.' },
      { title: 'Обіцянки і прогнози-думки (will)', example: 'I think you’ll pass the exam.', uk: 'Думаю, ти складеш іспит.' },
      { title: 'Заздалегідь вирішений план (going to)', example: 'We’re going to buy a dog.', uk: 'Ми збираємося купити собаку.' },
      { title: 'Прогноз за ознаками зараз (going to)', example: 'Look at those clouds! It’s going to rain.', uk: 'Глянь на хмари! Зараз піде дощ.' },
    ],
    markers: ['tomorrow', 'next week', 'soon', 'I think', 'probably', 'in 2030'],
    mistakes: [
      { wrong: 'I will to call you.', right: 'I will call you.', note: 'Після will частка to не потрібна.' },
    ],
    tip: 'Вирішив щойно: will. Вирішив раніше: going to. Бачиш доказ просто зараз (хмари, гол майже забитий): going to.',
    quiz: [
      { q: 'The phone is ringing. I ___ answer it.', a: 'will', options: ['will', 'am going to', 'am', 'will to'] },
      { q: 'We ___ visit Grandma this weekend. We bought tickets.', a: 'are going to', options: ['will', 'are going to', 'go', 'shall to'] },
      { q: 'Look out! You ___ fall!', a: 'are going to', options: ['will', 'are going to', 'fall', 'would'] },
      { q: 'I promise I ___ tell anyone.', a: 'won’t', options: ['won’t', 'am not going', 'don’t', 'not will'] },
    ],
  },
  {
    slug: 'articles', title: 'Articles: a, an, the', uk: 'Артиклі', level: 'A1', icon: 'e-abc', color: 'sky',
    lead: 'Маленькі слова, які показують, про що мова: про щось нове чи вже відоме.',
    formula: [
      { sign: 'a', text: 'перед приголосним звуком', example: 'a cat, a university' },
      { sign: 'an', text: 'перед голосним звуком', example: 'an apple, an hour' },
      { sign: 'the', text: 'конкретне, відоме або єдине', example: 'the sun, the book on the table' },
    ],
    uses: [
      { title: 'Згадуємо вперше: a / an', example: 'I saw a dog in the park.', uk: 'Я бачив (якогось) собаку в парку.' },
      { title: 'Вже відоме: the', example: 'The dog was very big.', uk: 'Той собака був дуже великий.' },
      { title: 'Єдине у своєму роді: the', example: 'the moon, the internet', uk: 'місяць, інтернет' },
      { title: 'Без артикля: загальне у множині', example: 'Cats like milk.', uk: 'Коти люблять молоко (усі коти).' },
    ],
    mistakes: [
      { wrong: 'a hour', right: 'an hour', note: 'Важить звук, а не буква: h не читається, слово починається з голосного звуку.' },
      { wrong: 'I am student.', right: 'I am a student.', note: 'Професія чи роль в однині потребує a / an.' },
    ],
    tip: 'Дивись на звук: a university (юніверсіті, приголосний «й»), але an umbrella. І an hour, бо h німа.',
    quiz: [
      { q: 'She is ___ engineer.', a: 'an', options: ['a', 'an', 'the', 'без артикля'] },
      { q: '___ sun rises in the east.', a: 'The', options: ['A', 'An', 'The', 'без артикля'] },
      { q: 'I need ___ new phone.', a: 'a', options: ['a', 'an', 'the', 'без артикля'] },
      { q: 'It took me ___ hour to get there.', a: 'an', options: ['a', 'an', 'the', 'без артикля'] },
      { q: 'He goes to ___ university in Lviv.', a: 'a', options: ['a', 'an', 'the', 'без артикля'] },
    ],
  },
  {
    slug: 'comparatives-superlatives', title: 'Comparatives & Superlatives', uk: 'Ступені порівняння', level: 'A2', icon: 'e-trophy', color: 'tomato',
    lead: 'Як сказати «більший», «найбільший» і порівняти будь-що.',
    formula: [
      { sign: 'коротке', text: 'adj + -er / the + adj + -est', example: 'tall → taller → the tallest' },
      { sign: 'довге', text: 'more + adj / the most + adj', example: 'interesting → more interesting → the most interesting' },
      { sign: 'винятки', text: 'good, bad, far', example: 'better / the best; worse / the worst; further / the furthest' },
    ],
    uses: [
      { title: 'Порівняння двох: than', example: 'My brother is older than me.', uk: 'Мій брат старший за мене.' },
      { title: 'Найкращий з групи: the', example: 'It’s the best day of my life.', uk: 'Це найкращий день мого життя.' },
      { title: 'Однакові: as … as', example: 'She is as tall as her mum.', uk: 'Вона така ж висока, як її мама.' },
    ],
    mistakes: [
      { wrong: 'more bigger', right: 'bigger', note: 'Або -er, або more. Ніколи разом.' },
      { wrong: 'He is taller then me.', right: 'He is taller than me.', note: 'Than (ніж) і then (потім) різні слова.' },
      { wrong: 'the most good', right: 'the best', note: 'good має свої форми: better, the best.' },
    ],
    tip: 'Короткі слова (1 склад) беруть -er / -est, довгі (3+ склади) беруть more / most. Закінчення на -y: happy → happier → the happiest.',
    quiz: [
      { q: 'This test is ___ than the last one.', a: 'easier', options: ['easyer', 'easier', 'more easy', 'easiest'] },
      { q: 'It’s the ___ film I’ve ever seen.', a: 'worst', options: ['baddest', 'worse', 'worst', 'most bad'] },
      { q: 'Maths is ___ than history for me.', a: 'more difficult', options: ['difficulter', 'more difficult', 'most difficult', 'difficultest'] },
      { q: 'Kyiv is ___ city in Ukraine.', a: 'the biggest', options: ['bigger', 'the bigest', 'the biggest', 'more big'] },
      { q: 'My bag is as heavy ___ yours.', a: 'as', options: ['than', 'as', 'like', 'then'] },
    ],
  },
  {
    slug: 'conditionals', title: 'Conditionals', uk: 'Умовні речення', level: 'B1', icon: 'd-bulb', color: 'lime',
    lead: 'Речення з if: від реальних фактів до уявних ситуацій.',
    formula: [
      { sign: '0', text: 'If + Present Simple, Present Simple', example: 'If you heat ice, it melts.' },
      { sign: '1', text: 'If + Present Simple, will + V', example: 'If it rains, we’ll stay home.' },
      { sign: '2', text: 'If + Past Simple, would + V', example: 'If I had money, I would travel.' },
      { sign: '3', text: 'If + Past Perfect, would have + V3', example: 'If I had studied, I would have passed.' },
    ],
    uses: [
      { title: 'Zero: завжди правда', example: 'If you mix red and blue, you get purple.', uk: 'Якщо змішати червоний і синій, вийде фіолетовий.' },
      { title: 'First: реальне майбутнє', example: 'If you hurry, you’ll catch the bus.', uk: 'Якщо поспішиш, встигнеш на автобус.' },
      { title: 'Second: уявне зараз', example: 'If I were you, I’d apologise.', uk: 'На твоєму місці я б вибачився.' },
      { title: 'Third: уявне минуле', example: 'If we had left earlier, we wouldn’t have missed the train.', uk: 'Якби ми вийшли раніше, ми б не запізнилися на потяг.' },
    ],
    mistakes: [
      { wrong: 'If it will rain, we will stay.', right: 'If it rains, we will stay.', note: 'Після if will не ставимо.' },
      { wrong: 'If I would have time, I would go.', right: 'If I had time, I would go.', note: 'Would тільки в головній частині, не після if.' },
    ],
    tip: 'Правило «без will і would після if» рятує половину балів у цій темі. If I were you: так правильно для всіх осіб.',
    quiz: [
      { q: 'If you ___ water to 100 °C, it boils.', a: 'heat', options: ['heat', 'will heat', 'heated', 'would heat'] },
      { q: 'If it ___ tomorrow, we’ll stay at home.', a: 'rains', options: ['will rain', 'rains', 'rained', 'would rain'] },
      { q: 'If I ___ a million dollars, I would buy an island.', a: 'had', options: ['have', 'had', 'will have', 'would have'] },
      { q: 'If I were you, I ___ talk to her.', a: 'would', options: ['will', 'would', 'am', 'did'] },
      { q: 'If he had studied, he ___ the exam.', a: 'would have passed', options: ['would pass', 'will pass', 'would have passed', 'passed'] },
    ],
  },
  {
    slug: 'passive-voice', title: 'Passive Voice', uk: 'Пасивний стан', level: 'B1', icon: 'd-robot', color: 'mustard',
    lead: 'Коли важливо, що сталося, а не хто це зробив.',
    formula: [
      { sign: 'формула', text: 'be (у потрібному часі) + V3', example: 'The cake was eaten.' },
      { sign: 'present', text: 'am / is / are + V3', example: 'English is spoken here.' },
      { sign: 'past', text: 'was / were + V3', example: 'The bridge was built in 1990.' },
      { sign: 'future', text: 'will be + V3', example: 'The results will be announced tomorrow.' },
    ],
    uses: [
      { title: 'Виконавець невідомий', example: 'My bike was stolen.', uk: 'Мій велосипед вкрали.' },
      { title: 'Виконавець неважливий', example: 'This phone is made in Korea.', uk: 'Цей телефон зроблено в Кореї.' },
      { title: 'Хочемо назвати виконавця: by', example: 'Harry Potter was written by J. K. Rowling.', uk: '«Гаррі Поттера» написала Дж. К. Роулінг.' },
    ],
    mistakes: [
      { wrong: 'The house was build in 1950.', right: 'The house was built in 1950.', note: 'Потрібна третя форма: build → built.' },
      { wrong: 'The letter sent yesterday.', right: 'The letter was sent yesterday.', note: 'Без be пасив не утворюється.' },
    ],
    tip: 'Знайди be і подивись на його час: is / are (зараз), was / were (минуле), will be (майбутнє). Друга частина завжди V3.',
    quiz: [
      { q: 'This song ___ by millions of people.', a: 'is loved', options: ['loves', 'is loved', 'is love', 'loved'] },
      { q: 'The Eiffel Tower ___ in 1889.', a: 'was built', options: ['built', 'was built', 'is built', 'was build'] },
      { q: 'The winners ___ next week.', a: 'will be announced', options: ['will announce', 'will be announced', 'are announce', 'announced'] },
      { q: 'These photos were taken ___ my brother.', a: 'by', options: ['from', 'by', 'with', 'of'] },
    ],
  },
];

export const getTopic = (slug: string) => GRAMMAR.find((t) => t.slug === slug);
