import type { DrillFun } from './types';

export const FUN_A: Record<string, DrillFun> = {
  'adjectives-adverbs': {
    title: 'Тихий пес, гучний гавкіт',
    lines: [
      { who: 'Mia', text: 'Biscuit is a very quiet dog.' },
      { who: 'Tom', text: 'He’s barking loudly right now.' },
      { who: 'Mia', text: 'He always barks loudly at the postman. He never barks at the fridge.' },
      { who: 'Tom', text: 'Of course. The fridge is his best friend.' },
    ],
    point: 'Quiet описує самого пса (який?), а loudly описує, як він гавкає (як?). Always і never стоять перед дієсловом.',
  },
  'articles': {
    title: 'Хом’як, коробка і мій черевик',
    lines: [
      { who: 'Lily', text: 'I’ve got a new pet. It’s a hamster!' },
      { who: 'Harry', text: 'Where is the hamster now?' },
      { who: 'Lily', text: 'In the box. Oh no, the box is open.' },
      { who: 'Harry', text: 'Er, Lily? There’s a hamster in my shoe.' },
    ],
    point: 'A hamster, коли згадуємо вперше. The hamster, the box, коли обоє вже знаємо, про кого мова.',
  },
  'causative-have': {
    title: 'Стрижка від професіонала (нібито)',
    lines: [
      { who: 'Grace', text: 'Did you cut your hair yourself?' },
      { who: 'Ben', text: 'No, I had it cut at the new salon.' },
      { who: 'Grace', text: 'Really? It looks like Biscuit did it.' },
      { who: 'Ben', text: 'I know. Next week I’m having it fixed at the old one.' },
    ],
    point: 'Had it cut, having it fixed: роботу робить хтось інший, не Бен. Схема have + предмет + V3.',
  },
  'comparatives': {
    title: 'Найрозумніший телефон у домі',
    lines: [
      { who: 'Oliver', text: 'My phone is faster than yours.' },
      { who: 'Chloe', text: 'My phone is older than yours, but it’s the smartest phone in the house.' },
      { who: 'Oliver', text: 'Why?' },
      { who: 'Chloe', text: 'It’s the only one Dad can’t use.' },
    ],
    point: 'Faster than, older than: порівнюємо двох. The smartest: найкращий з усієї групи, завжди з the.',
  },
  'conditionals': {
    title: 'План Лео: грати за будь-яких умов',
    lines: [
      { who: 'Leo', text: 'If I finish my homework, I’ll play games.' },
      { who: 'Ruby', text: 'And if you don’t finish it?' },
      { who: 'Leo', text: 'If I don’t finish it, I’ll play games sadly.' },
      { who: 'Ruby', text: 'If I were Mum, I’d hide the console.' },
    ],
    point: 'If + Present, will: реальний план (перший тип). If I were ..., I’d: уявна ситуація (другий тип).',
  },
  'dependent-prepositions': {
    title: 'Пожежна сигналізація теж фанатка',
    lines: [
      { who: 'Sophie', text: 'I’m crazy about cooking now!' },
      { who: 'Sam', text: 'I know. The smoke alarm is crazy about it too.' },
      { who: 'Sophie', text: 'Don’t worry about dinner. It depends on the oven.' },
      { who: 'Sam', text: 'So it depends on luck.' },
    ],
    point: 'Crazy about, worry about, depend on: прийменник іде в парі зі словом, і цю пару треба просто запам’ятати.',
  },
  'future-forms': {
    title: 'Біг з понеділка, як завжди',
    lines: [
      { who: 'Max', text: 'I’m going to start running every morning. I’ve bought new trainers.' },
      { who: 'Daisy', text: 'Great! Max, it’s seven o’clock and it’s raining.' },
      { who: 'Max', text: 'Oh. Then I’ll start on Monday.' },
      { who: 'Daisy', text: 'You said that last Monday.' },
    ],
    point: 'Going to: план, вирішений заздалегідь. I’ll start: рішення прямо зараз, коли побачив дощ.',
  },
  'future-time-clauses': {
    title: 'Домашка після останнього рівня',
    lines: [
      { who: 'Harry', text: 'I’ll do my homework as soon as this game ends.' },
      { who: 'Mia', text: 'And what will you do when it ends?' },
      { who: 'Harry', text: 'When it ends, I’ll start the next level.' },
      { who: 'Mia', text: 'So you’ll do your homework when you’re forty.' },
    ],
    point: 'Після when і as soon as про майбутнє ставимо Present (ends, you’re), а will тільки в головній частині.',
  },
  'gerund-infinitive': {
    title: 'Дві години без солодкого',
    lines: [
      { who: 'Emma', text: 'I’ve decided to stop eating sweets.' },
      { who: 'Jack', text: 'Since when?' },
      { who: 'Emma', text: 'Since breakfast. I managed to avoid eating chocolate for two hours!' },
      { who: 'Jack', text: 'Then why do you keep looking at my cookie?' },
    ],
    point: 'Decide і manage тягнуть за собою to + V. Stop, avoid і keep хочуть -ing.',
  },
  'have-got': {
    title: 'Десять іграшок і одна коробка',
    lines: [
      { who: 'Tom', text: 'Have you got a pet?' },
      { who: 'Lily', text: 'Yes, I’ve got a cat. Her name is Murly.' },
      { who: 'Tom', text: 'Has she got toys?' },
      { who: 'Lily', text: 'She’s got ten toys. But she only plays with the box.' },
    ],
    point: 'I’ve got означає «у мене є». Для she/he/it має бути has got, а в питанні Have you got? / Has she got?',
  },
  'imperatives-lets': {
    title: 'Пес, який знає одне слово',
    lines: [
      { who: 'Mia', text: 'Biscuit, sit! Don’t eat my sock!' },
      { who: 'Ben', text: 'He doesn’t understand English.' },
      { who: 'Mia', text: 'OK. Biscuit, let’s go for a walk!' },
      { who: 'Ben', text: 'Look, he’s at the door with his lead.' },
    ],
    point: 'Sit! і Don’t eat!: наказ без підмета. Let’s go: пропонуємо зробити щось разом.',
  },
  'like-doing-want-to': {
    title: 'Хобі Олівера: сон',
    lines: [
      { who: 'Ruby', text: 'What do you want to do on Saturday?' },
      { who: 'Oliver', text: 'I want to sleep. I love sleeping.' },
      { who: 'Ruby', text: 'Do you like doing anything else?' },
      { who: 'Oliver', text: 'Yes. I enjoy thinking about sleeping.' },
    ],
    point: 'Want + to + V (хочу щось зробити). Like, love, enjoy + -ing (що мені подобається робити).',
  },
  'linking-words': {
    title: 'Ванна ні, калюжа так',
    lines: [
      { who: 'Leo', text: 'Despite the rain, Biscuit wants a walk.' },
      { who: 'Grace', text: 'Although he hates water?' },
      { who: 'Leo', text: 'He hates baths. However, he loves puddles.' },
      { who: 'Grace', text: 'Then take a towel in case he finds the big one.' },
    ],
    point: 'Despite + іменник, although + ціле речення, however починає нове речення. In case: про всяк випадок.',
  },
  'may-might-possibility': {
    title: 'Хто дзвонить у двері',
    lines: [
      { who: 'Chloe', text: 'Someone’s at the door. Is it the pizza?' },
      { who: 'Sam', text: 'It might be. Or it could be Grandma.' },
      { who: 'Chloe', text: 'Grandma may have cookies.' },
      { who: 'Sam', text: 'Then open it fast. Both are good news!' },
    ],
    point: 'Might, could, may + V: ми не впевнені, це тільки можливість.',
  },
  'modals': {
    title: 'Світ почекає, математика ні',
    lines: [
      { who: 'Daisy', text: 'Can I play games now?' },
      { who: 'Mrs Green', text: 'No. You have to finish your homework first.' },
      { who: 'Daisy', text: 'But I must save the world!' },
      { who: 'Mrs Green', text: 'The world should wait. Maths can’t.' },
    ],
    point: 'Can I ...? просить дозволу, have to і must про обов’язок, should дає пораду.',
  },
  'modals-deduction': {
    title: 'Детектив і шоколадний ніс',
    lines: [
      { who: 'Jack', text: 'The cookies are gone. It must be Biscuit.' },
      { who: 'Chloe', text: 'It can’t be Biscuit. He’s at Grandma’s today.' },
      { who: 'Jack', text: 'Then it might be Murly.' },
      { who: 'Chloe', text: 'Murly can’t open the jar. And you’ve got chocolate on your nose.' },
    ],
    point: 'Must be: впевнені, що так. Can’t be: впевнені, що ні. Might be: можливо, але не точно.',
  },
  'passive': {
    title: 'Домашку знову щось забрало',
    lines: [
      { who: 'Mr Brown', text: 'Where is your homework, Lily?' },
      { who: 'Lily', text: 'It was eaten by the printer.' },
      { who: 'Mr Brown', text: 'And last week?' },
      { who: 'Lily', text: 'It was taken by the wind. The window was left open.' },
    ],
    point: 'Was eaten, was taken, was left: пасив. Важливо, що сталося з домашкою, а не хто винен.',
  },
  'passive-more': {
    title: 'Розслідування повільного Wi-Fi',
    lines: [
      { who: 'Sophie', text: 'Why is the Wi-Fi so slow?' },
      { who: 'Harry', text: 'The router is being fixed. It has been unplugged twice today.' },
      { who: 'Sophie', text: 'By whom?' },
      { who: 'Harry', text: 'It is said that a cat was seen near the cable.' },
      { who: 'Murly', text: 'Meow.' },
    ],
    point: 'Is being fixed: процес саме зараз, has been unplugged: результат до тепер. It is said that: «кажуть, що».',
  },
  'past-continuous': {
    title: 'Персонаж теж робив домашку',
    lines: [
      { who: 'Jack', text: 'What were you doing at nine last night?' },
      { who: 'Emma', text: 'I was doing my homework.' },
      { who: 'Jack', text: 'Then why was your game character dancing online at nine?' },
      { who: 'Emma', text: 'He was doing his homework too.' },
    ],
    point: 'Was/were + -ing: дія в процесі в конкретний момент у минулому (о дев’ятій учора).',
  },
  'past-perfect': {
    title: 'Піца зникла, свідок спить',
    lines: [
      { who: 'Oliver', text: 'When I got to the kitchen, the pizza had already disappeared.' },
      { who: 'Ruby', text: 'Who had eaten it?' },
      { who: 'Oliver', text: 'No idea. By the time I asked, Biscuit had fallen asleep with a very happy face.' },
    ],
    point: 'Had disappeared, had fallen asleep: це сталося ще раніше за інший момент у минулому (got, asked).',
  },
  'past-simple': {
    title: 'Прибирання за дві хвилини',
    lines: [
      { who: 'Max', text: 'I cleaned my room yesterday.' },
      { who: 'Daisy', text: 'Really? What did you do with all the mess?' },
      { who: 'Max', text: 'I put it under the bed.' },
      { who: 'Daisy', text: 'So that’s where Murly went last night!' },
    ],
    point: 'Cleaned з -ed, а put і went неправильні дієслова. Питання будуємо з did: What did you do?',
  },
  'perfect-vs-past': {
    title: 'Італія крізь вікно піцерії',
    lines: [
      { who: 'Sam', text: 'Have you ever been to Italy?' },
      { who: 'Grace', text: 'Yes, I have. I went there last summer.' },
      { who: 'Sam', text: 'Did you see the Colosseum?' },
      { who: 'Grace', text: 'No. I saw a pizza restaurant. Every day.' },
    ],
    point: 'Have you ever been: досвід без точного часу. Last summer називає конкретний час, тому went і saw.',
  },
  'phrasal-verbs': {
    title: 'Я не їм, я доглядаю',
    lines: [
      { who: 'Tom', text: 'I’ve given up sugar.' },
      { who: 'Chloe', text: 'Since when?' },
      { who: 'Tom', text: 'Since I woke up this morning.' },
      { who: 'Chloe', text: 'Then why did you just pick up my doughnut?' },
      { who: 'Tom', text: 'I’m looking after it for you.' },
    ],
    point: 'Give up (кинути), wake up (прокинутися), pick up (підняти), look after (доглядати): частка повністю міняє значення дієслова.',
  },
  'plurals-countable': {
    title: 'Скільки сиру? Багато, Біскіт допомагає',
    lines: [
      { who: 'Mrs Green', text: 'How many potatoes do we need?' },
      { who: 'Leo', text: 'Three potatoes, two tomatoes and some cheese.' },
      { who: 'Mrs Green', text: 'How much cheese?' },
      { who: 'Leo', text: 'A lot. Biscuit is helping.' },
    ],
    point: 'Potatoes і tomatoes: після -o додаємо -es. Cheese незлічуваний, тому how much і some, без -s.',
  },
  'possessive-s': {
    title: 'Чия це шкарпетка',
    lines: [
      { who: 'Sophie', text: 'Whose sock is this?' },
      { who: 'Ben', text: 'It’s Dad’s sock.' },
      { who: 'Sophie', text: 'And why is it in the garden?' },
      { who: 'Ben', text: 'It’s Biscuit’s sock now. He took it from my parents’ room.' },
    ],
    point: 'Dad’s, Biscuit’s: один власник, додаємо ’s. Parents’: власників кілька і слово вже на -s, тому тільки апостроф.',
  },
  'prepositions-place': {
    title: 'Де ховається Мурлі',
    lines: [
      { who: 'Oliver', text: 'Where is Murly?' },
      { who: 'Lily', text: 'She isn’t on the sofa. She isn’t under the bed.' },
      { who: 'Oliver', text: 'Is she in the kitchen?' },
      { who: 'Lily', text: 'No. She’s in your school bag, on your homework.' },
    ],
    point: 'On: на поверхні, under: під, in: всередині. Кіт обирає найважливіше місце.',
  },
};
