// Тест на рівень англійської. Питання наші. Дорослі й підлітки: адаптивний тест A1–C1.
// Діти: гра з картинками й озвучкою, результат Starter / A1 / A2.

export type Lvl = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export const LEVELS: Lvl[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
export type Q = { l: Lvl; q: string; o: string[]; a: number };

// Перший варіант у o НЕ обов'язково правильний: правильний індекс у a
export const ADULT: Q[] = [
  // A1
  { l: 'A1', q: 'My sister ___ a teacher.', o: ['is', 'are', 'am', 'be'], a: 0 },
  { l: 'A1', q: 'I ___ coffee every morning.', o: ['drinks', 'drink', 'drinking', 'am drink'], a: 1 },
  { l: 'A1', q: '___ you like pizza?', o: ['Are', 'Is', 'Do', 'Does'], a: 2 },
  { l: 'A1', q: 'There ___ two cats in the garden.', o: ['is', 'are', 'be', 'has'], a: 1 },
  { l: 'A1', q: 'He ___ to work by bus.', o: ['go', 'going', 'goes', 'gos'], a: 2 },
  { l: 'A1', q: 'This is ___ umbrella.', o: ['a', 'an', 'the a', 'any'], a: 1 },
  { l: 'A1', q: 'We have English ___ Monday.', o: ['in', 'at', 'on', 'to'], a: 2 },
  { l: 'A1', q: 'Where ___ your parents live?', o: ['does', 'do', 'are', 'is'], a: 1 },
  // A2
  { l: 'A2', q: 'Yesterday we ___ a great film.', o: ['see', 'saw', 'seen', 'have seen'], a: 1 },
  { l: 'A2', q: 'She is ___ than her brother.', o: ['tall', 'taller', 'more tall', 'the tallest'], a: 1 },
  { l: 'A2', q: 'Look! It ___.', o: ['rains', 'is raining', 'rain', 'rained'], a: 1 },
  { l: 'A2', q: 'I ___ to the cinema tonight. I’ve got the tickets.', o: ['go', 'am going', 'went', 'goes'], a: 1 },
  { l: 'A2', q: 'How ___ sugar do you need?', o: ['many', 'much', 'lot', 'few'], a: 1 },
  { l: 'A2', q: 'You ___ wear a helmet. It’s the rule.', o: ['must', 'can', 'may', 'would'], a: 0 },
  { l: 'A2', q: 'Did you ___ my message?', o: ['got', 'get', 'getting', 'gets'], a: 1 },
  { l: 'A2', q: 'I’m interested ___ photography.', o: ['on', 'at', 'in', 'for'], a: 2 },
  // B1
  { l: 'B1', q: 'I ___ in Kyiv since 2019.', o: ['live', 'lived', 'have lived', 'am living'], a: 2 },
  { l: 'B1', q: 'If it rains tomorrow, we ___ at home.', o: ['stay', 'will stay', 'would stay', 'stayed'], a: 1 },
  { l: 'B1', q: 'The museum ___ in 1890.', o: ['built', 'was built', 'has built', 'is building'], a: 1 },
  { l: 'B1', q: 'I was cooking when the phone ___.', o: ['rang', 'was ringing', 'rings', 'has rung'], a: 0 },
  { l: 'B1', q: 'She asked me where I ___.', o: ['live', 'lived', 'do live', 'am living'], a: 1 },
  { l: 'B1', q: 'I’m not used to ___ up so early.', o: ['get', 'getting', 'got', 'have got'], a: 1 },
  { l: 'B1', q: 'This is the woman ___ son plays in my team.', o: ['who', 'which', 'whose', 'whom'], a: 2 },
  { l: 'B1', q: 'Can you ___ the music down, please?', o: ['turn', 'take', 'put', 'make'], a: 0 },
  // B2
  { l: 'B2', q: 'If I ___ about the traffic, I would have left earlier.', o: ['knew', 'had known', 'have known', 'would know'], a: 1 },
  { l: 'B2', q: 'By the time we arrived, the concert ___.', o: ['already started', 'has already started', 'had already started', 'was already starting'], a: 2 },
  { l: 'B2', q: 'She denied ___ the email.', o: ['to send', 'sending', 'send', 'to have send'], a: 1 },
  { l: 'B2', q: 'Hardly ___ the house when it started to pour.', o: ['I had left', 'had I left', 'I left', 'did I leave'], a: 1 },
  { l: 'B2', q: 'I wish I ___ so much yesterday.', o: ['didn’t eat', 'hadn’t eaten', 'wouldn’t eat', 'don’t eat'], a: 1 },
  { l: 'B2', q: 'The report needs ___ before Friday.', o: ['to finish', 'finishing', 'finish', 'finished'], a: 1 },
  { l: 'B2', q: 'He’s very good at coming ___ with new ideas.', o: ['out', 'up', 'over', 'across'], a: 1 },
  { l: 'B2', q: 'It’s high time we ___ a decision.', o: ['make', 'made', 'will make', 'have made'], a: 1 },
  // C1
  { l: 'C1', q: 'Not until the results came in ___ how close the vote had been.', o: ['we realised', 'did we realise', 'we did realise', 'had realised we'], a: 1 },
  { l: 'C1', q: 'The new policy has been met with ___ criticism.', o: ['widespread', 'widely', 'wide-ranged', 'spreading'], a: 0 },
  { l: 'C1', q: 'Had she taken the job, she ___ in Lisbon now.', o: ['would live', 'would be living', 'will be living', 'had lived'], a: 1 },
  { l: 'C1', q: 'His explanation didn’t quite ___ water.', o: ['hold', 'keep', 'carry', 'stand'], a: 0 },
  { l: 'C1', q: 'She is said ___ the company a fortune.', o: ['to save', 'to have saved', 'saving', 'having saved'], a: 1 },
  { l: 'C1', q: 'The project was ___ by a lack of funding.', o: ['hampered', 'hammered', 'hampered off', 'hampering'], a: 0 },
  { l: 'C1', q: 'Little ___ that the decision would change everything.', o: ['they knew', 'did they know', 'knew they', 'they did know'], a: 1 },
  { l: 'C1', q: 'We need to ___ the pros and cons before we commit.', o: ['weigh up', 'weigh in', 'weight up', 'way up'], a: 0 },
];

export const LEVEL_INFO: Record<Lvl, { uk: string; ru: string; en: string; next: { href: string; uk: string; ru: string; en: string } }> = {
  A1: { uk: 'Початковий. Ти знаєш базові слова й прості фрази. Почни з Present Simple, to be і щоденної лексики.', ru: 'Начальный. Ты знаешь базовые слова и простые фразы. Начни с Present Simple, to be и повседневной лексики.', en: 'Beginner. You know basic words and simple phrases. Start with Present Simple, to be and everyday vocabulary.', next: { href: '/grammar', uk: 'Граматика простими словами', ru: 'Грамматика простыми словами', en: 'Grammar made simple' } },
  A2: { uk: 'Базовий. Ти говориш про себе, минуле й плани. Далі: Present Perfect, порівняння, модальні дієслова.', ru: 'Базовый. Ты говоришь о себе, прошлом и планах. Дальше: Present Perfect, сравнения, модальные глаголы.', en: 'Elementary. You can talk about yourself, the past and plans. Next: Present Perfect, comparisons, modal verbs.', next: { href: '/grammar', uk: 'Граматика для A2', ru: 'Грамматика для A2', en: 'Grammar for A2' } },
  B1: { uk: 'Середній. Ти впевнено спілкуєшся на щоденні теми. Далі: умовні речення, пасив, фразові дієслова.', ru: 'Средний. Ты уверенно общаешься на повседневные темы. Дальше: условные предложения, пассив, фразовые глаголы.', en: 'Intermediate. You communicate confidently on everyday topics. Next: conditionals, passive, phrasal verbs.', next: { href: '/practice', uk: 'Діалоги й тексти B1', ru: 'Диалоги и тексты B1', en: 'B1 dialogues and texts' } },
  B2: { uk: 'Вище середнього. Ти розумієш складні тексти й дискутуєш. Далі: інверсія, складні часи, стиль і ідіоми.', ru: 'Выше среднего. Ты понимаешь сложные тексты и дискутируешь. Дальше: инверсия, сложные времена, стиль и идиомы.', en: 'Upper-intermediate. You understand complex texts and can discuss ideas. Next: inversion, advanced tenses, style and idioms.', next: { href: '/practice', uk: 'Тексти B2', ru: 'Тексты B2', en: 'B2 texts' } },
  C1: { uk: 'Просунутий. Ти вільно користуєшся мовою. Далі: тонкі відтінки значень, ідіоми, академічне письмо.', ru: 'Продвинутый. Ты свободно пользуешься языком. Дальше: тонкие оттенки значений, идиомы, академическое письмо.', en: 'Advanced. You use English fluently. Next: nuances of meaning, idioms, academic writing.', next: { href: '/practice', uk: 'Тексти C1', ru: 'Тексты C1', en: 'C1 texts' } },
};

// Діти: картинки малюємо самі (KidPic), слова озвучуємо
export type KidQ =
  | { k: 'hear'; word: string; pics: string[]; a: number; lvl: 0 | 1 | 2 } // послухай і обери картинку
  | { k: 'name'; pic: string; o: string[]; a: number; lvl: 0 | 1 | 2 } // що на картинці?
  | { k: 'say'; q: string; o: string[]; a: number; lvl: 0 | 1 | 2 }; // просте речення
export const KIDS: KidQ[] = [
  { k: 'hear', word: 'cat', pics: ['dog', 'cat', 'fish'], a: 1, lvl: 0 },
  { k: 'hear', word: 'apple', pics: ['apple', 'banana', 'ball'], a: 0, lvl: 0 },
  { k: 'hear', word: 'sun', pics: ['star', 'tree', 'sun'], a: 2, lvl: 0 },
  { k: 'name', pic: 'house', o: ['car', 'house', 'tree'], a: 1, lvl: 0 },
  { k: 'hear', word: 'red', pics: ['red', 'blue', 'green'], a: 0, lvl: 0 },
  { k: 'name', pic: 'three', o: ['two', 'five', 'three'], a: 2, lvl: 0 },
  { k: 'hear', word: 'a big ball', pics: ['ballsmall', 'ballbig', 'apple'], a: 1, lvl: 1 },
  { k: 'name', pic: 'fish', o: ['fish', 'bird', 'frog'], a: 0, lvl: 1 },
  { k: 'say', q: 'I ___ a cat.', o: ['have got', 'has got', 'am'], a: 0, lvl: 1 },
  { k: 'hear', word: 'The book is under the table', pics: ['bookon', 'bookunder', 'tree'], a: 1, lvl: 1 },
  { k: 'say', q: 'She ___ ten years old.', o: ['are', 'is', 'am'], a: 1, lvl: 1 },
  { k: 'say', q: 'Look! The dog ___.', o: ['is running', 'run', 'runs'], a: 0, lvl: 2 },
  { k: 'say', q: 'Yesterday I ___ to the park.', o: ['go', 'went', 'going'], a: 1, lvl: 2 },
  { k: 'hear', word: 'He is taller than his sister', pics: ['tallboy', 'tallgirl', 'house'], a: 0, lvl: 2 },
  { k: 'say', q: 'There ___ some milk in the fridge.', o: ['are', 'is', 'be'], a: 1, lvl: 2 },
];
