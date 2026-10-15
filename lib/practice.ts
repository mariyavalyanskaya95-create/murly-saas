// Розділ «Практика»: Listening і Reading за рівнями і віком.
// Той самий формат, що й уроки (Plan), тож усе можна показати учню чи відправити як домашку.
import { parseSection } from './exercise';
import type { Block, Plan } from './lesson';

let n = 0;
const id = () => `pr-${++n}`;
const h = (text: string): Block => ({ id: id(), type: 'heading', text });
const t = (text: string): Block => ({ id: id(), type: 'text', text });
const tip = (text: string): Block => ({ id: id(), type: 'tip', text });
const audio = (title: string, script: string): Block => ({ id: id(), type: 'audio', title, script: script.trim() });
const vocab = (pairs: string): Block => ({
  id: id(), type: 'vocab',
  words: pairs.trim().split('\n').map((l) => { const [en, uk] = l.split('=').map((x) => x.trim()); return { en, uk }; }),
});
const ex = (...parts: [Parameters<typeof parseSection>[0], string, string][]): Block => ({
  id: id(), type: 'exercise', sections: parts.map(([type, instr, text]) => parseSection(type, instr, text.trim())),
});
const talk = (q: string): Block => ({ id: id(), type: 'speaking', questions: q.trim().split('\n').map((x) => x.trim()) });

export const PRACTICE: Plan[] = [
  // ---------- LISTENING ----------
  {
    id: 'lib-l-pet-shop', title: 'At the pet shop', level: 'A1', age: 'kids', topic: 'Тварини', color: 'lime', source: 'murly', focus: ['Listening'],
    aims: 'Послухаємо діалог у зоомагазині\nЗрозуміємо, яку тварину обрала дівчинка',
    blocks: [
      tip('Спершу просто послухай. Потім прочитай питання і послухай ще раз.'),
      audio('At the pet shop', `
Shop assistant: Hello! Can I help you?
Emma: Hi! I want a pet. Can I see the rabbits, please?
Shop assistant: Of course. This rabbit is white, and this one is brown.
Emma: The brown rabbit is so small! How old is it?
Shop assistant: It is two months old. It likes carrots.
Emma: I love it! Can I have the brown rabbit, please?
Shop assistant: Yes, you can. Here you are.`),
      ex(
        ['truefalse', 'True or False?', `Emma wants a cat. = False
The brown rabbit is small. = True
The rabbit is two years old. = False
The rabbit likes carrots. = True`],
        ['choice', 'Choose the answer.', `Emma takes the {brown|white} rabbit.
The shop has {rabbits|dogs}.`],
      ),
      talk(`Have you got a pet?
What pet do you want?`),
    ],
  },
  {
    id: 'lib-l-weekend-plans', title: 'Plans for Saturday', level: 'A2', age: 'teens', topic: 'Вихідні', color: 'sky', source: 'murly', focus: ['Listening', 'Grammar'],
    aims: 'Послухаємо, як друзі домовляються про вихідні\nЗапам’ятаємо: Present Continuous для планів',
    blocks: [
      audio('Plans for Saturday', `
Max: Hey Lily, what are you doing on Saturday?
Lily: In the morning I'm helping my mum in the garden. Why?
Max: There's a new superhero film at the cinema. Do you want to come?
Lily: Sounds great! What time does it start?
Max: At four o'clock. We're meeting at the café next to the cinema at half past three.
Lily: Perfect. Is Sam coming too?
Max: No, he's visiting his grandparents this weekend.
Lily: OK, see you on Saturday!`),
      ex(
        ['choice', 'Choose the correct answer.', `On Saturday morning Lily is {helping her mum|watching a film|meeting Sam}.
The film starts at {four o'clock|half past three|five o'clock}.
They are meeting {at the café|at Max's house|at school}.
Sam is {visiting his grandparents|going to the cinema|working in the garden}.`],
        ['truefalse', 'True or False?', `The film is about superheroes. = True
Sam is coming to the cinema. = False`],
      ),
      tip('Про домовлені плани говоримо Present Continuous: **I’m meeting** friends on Saturday. **We’re going** to the cinema at four.'),
      ex(['gap', 'Розкрий дужки.', `What [are you doing] (you / do) on Saturday?
I [am visiting/'m visiting] (visit) my grandma tomorrow.`]),
      talk(`What are you doing this weekend?
Invite a friend to a place you like. Say the time and the meeting place.`),
    ],
  },
  {
    id: 'lib-l-school-trip', title: 'School trip announcement', level: 'B1', age: 'teens', topic: 'НМТ Listening', color: 'mustard', source: 'murly', focus: ['Listening', 'НМТ'],
    aims: 'Потренуємо аудіювання у форматі НМТ\nНавчимося виловлювати цифри, час і деталі',
    blocks: [
      tip('Лайфхак НМТ: перед прослуховуванням прочитай питання і підкресли, що саме треба почути (час, місце, число). Варіанти часто звучать усі, а правильний той, що залишився після уточнення.'),
      audio('Announcement', `
Teacher: Good morning, everyone. This is an important message about next Friday's trip to the science museum.
Teacher: The bus will leave from the main gate at eight fifteen, not at eight thirty as we said before, so please don't be late.
Teacher: The trip costs two hundred hryvnias. Please give the money to your class teacher by Wednesday.
Teacher: Bring a packed lunch and a bottle of water. You can buy snacks at the museum café, but it is quite expensive.
Teacher: We will visit the space exhibition first and then take part in a robot workshop.
Teacher: We will be back at school at about four o'clock. Thank you!`),
      ex(
        ['choice', 'Choose the correct answer (A, B or C).', `The bus leaves at {8:15|8:30|8:00}.
Students must pay {by Wednesday|on Friday|at the museum}.
The trip costs {200 hryvnias|250 hryvnias|120 hryvnias}.
First, students will visit {the space exhibition|the robot workshop|the museum café}.
They will come back at about {4 pm|3 pm|5 pm}.`],
        ['truefalse', 'True or False?', `Snacks at the museum café are cheap. = False
Students should take water. = True`],
      ),
    ],
  },
  {
    id: 'lib-l-hotel', title: 'Checking in at a hotel', level: 'B1', age: 'adults', topic: 'Подорожі', color: 'tomato', source: 'murly', focus: ['Listening', 'Speaking'],
    aims: 'Послухаємо діалог на рецепції\nЗапишемо деталі бронювання\nРозіграємо схожий діалог',
    blocks: [
      vocab(`a reservation = бронювання
to check in = заселитися
a lift = ліфт
included = включено
the Wi-Fi password = пароль від Wi-Fi
to check out = виселитися`),
      audio('At the reception', `
Receptionist: Good evening, welcome to the Riverside Hotel. How can I help you?
Guest: Hi, I have a reservation. My name is Olena Koval.
Receptionist: Let me check. Yes, a double room for three nights. Could I see your passport, please?
Guest: Here you are.
Receptionist: Thank you. You're in room three hundred and twelve, on the third floor. The lift is on your left.
Guest: Is breakfast included?
Receptionist: Yes, it is. Breakfast is served from seven to ten in the restaurant.
Guest: Great. And what's the Wi-Fi password?
Receptionist: It's "river" plus the number twenty-four. Check-out is at eleven.
Guest: Thank you very much.`),
      ex(
        ['gap', 'Listen and complete the details.', `Room number: [312/three hundred and twelve]
Number of nights: [3/three]
Breakfast ends at: [10/ten]
Check-out time: [11/eleven]`],
        ['truefalse', 'True or False?', `The guest booked a single room. = False
The lift is on the right. = False
Breakfast is included. = True`],
      ),
      ex(['voice', 'Speaking: record your answers.', `You are at a hotel reception. Say who you are and that you have a reservation.
Ask two questions about breakfast or Wi-Fi.`]),
      talk(`Role play: you arrive at a hotel. Ask about breakfast, Wi-Fi and check-out.
What is important for you when you choose a hotel?`),
    ],
  },

  // ---------- READING ----------
  {
    id: 'lib-r-best-friend', title: 'My best friend', level: 'A1', age: 'kids', topic: 'Друзі', color: 'lime', source: 'murly', focus: ['Reading'],
    aims: 'Прочитаємо короткий текст про друга\nВідповімо на питання\nРозкажемо про свого друга',
    blocks: [
      t(`My best friend is Oliver. He is nine years old. He has got short black hair and big brown eyes. Oliver is very funny and kind.

We go to the same school. After school we play football in the park. Oliver can run very fast, but he can't swim. His favourite food is pizza and his favourite colour is green.`),
      ex(
        ['truefalse', 'True or False?', `Oliver is nine. = True
He has got long hair. = False
Oliver can swim. = False
His favourite colour is green. = True`],
        ['choice', 'Choose the right word.', `Oliver is {funny|sad}.
They play {football|tennis} after school.`],
      ),
      talk(`Who is your best friend?
What do you do together?`),
    ],
  },
  {
    id: 'lib-r-no-internet', title: 'A day without the internet', level: 'A2', age: 'teens', topic: 'Технології', color: 'sky', source: 'murly', focus: ['Reading', 'Writing'],
    aims: 'Прочитаємо щоденник підлітка\nЗнайдемо деталі в тексті\nНапишемо свій короткий запис',
    blocks: [
      t(`**Saturday, 14 October**

Today our internet stopped working at nine in the morning. At first I was really bored. I couldn't watch videos or chat with my friends.

Then my little brother found an old board game under the sofa. We played it for two hours, and I won three times! After lunch I went for a walk with my dog and met my neighbour, Daria. We talked about school and music.

In the evening I read a book that I started last summer. The internet came back at eight, but I didn't turn on my phone until bedtime. It was a strange day, but actually a good one.`),
      ex(
        ['truefalse', 'True or False?', `The internet stopped in the evening. = False
The writer won the board game three times. = True
The writer met Daria at school. = False
The internet came back at eight. = True`],
        ['choice', 'Choose the best answer.', `How did the writer feel at first? {bored|happy|angry}
What did the writer do in the evening? {read a book|watched a film|played football}`],
        ['match', 'Match the words with their meanings.', `bored = not interested, with nothing to do
a neighbour = a person who lives near you
strange = unusual`],
      ),
      ex(['open', 'Writing: 40-60 words.', 'Imagine a day without your phone. What would you do? Write a short diary entry.']),
    ],
  },
  {
    id: 'lib-r-volunteering', title: 'Teens who help', level: 'B1', age: 'teens', topic: 'НМТ Reading', color: 'mustard', source: 'murly', focus: ['Reading', 'НМТ'],
    aims: 'Читання у форматі НМТ: деталі, вибір відповіді, слова з контексту\nОбговоримо волонтерство',
    blocks: [
      tip('Лайфхак НМТ: відповіді в тексті йдуть по порядку питань. Якщо знайшла відповідь на питання 2, відповідь на 3 шукай нижче.'),
      t(`When Andrii was fifteen, he joined a volunteer group in his town. "I wanted to do something useful instead of just sitting at home," he says.

Every Saturday the group collects food and clothes for families who have lost their homes. Andrii sorts the boxes and delivers them by bike. "It's not always easy. Sometimes it rains, and the boxes are heavy. But when people smile and say thank you, I forget about being tired."

Volunteering has also changed his plans for the future. Before, Andrii wanted to study IT. Now he is thinking about becoming a social worker. "I've learned that I like working with people more than with computers," he explains.

His advice to other teenagers is simple: "Start small. Even one hour a week can make a difference."`),
      ex(
        ['choice', 'Choose the correct answer (A, B or C).', `Why did Andrii start volunteering? {He wanted to be useful|His school made him|His friends asked him}
What does Andrii do on Saturdays? {sorts and delivers boxes|cooks food|teaches children}
How has volunteering changed Andrii? {He wants a different job|He stopped using computers|He moved to another town}
What is Andrii's advice? {Start with a little time|Volunteer every day|Only help your family}`],
        ['match', 'Match the words from the text with their meanings.', `useful = helpful, doing something good
to deliver = to take things to people
heavy = difficult to carry
to make a difference = to change something for the better`],
      ),
      talk(`Have you ever helped people as a volunteer?
Andrii says "Start small". What small thing could you do this month?`),
    ],
  },
  {
    id: 'lib-r-four-day-week', title: 'The four-day work week', level: 'B2', age: 'adults', topic: 'Робота', color: 'tomato', source: 'murly', focus: ['Reading', 'Speaking'],
    aims: 'Прочитаємо статтю про чотириденний робочий тиждень\nРозкладемо аргументи «за» і «проти»\nВисловимо свою думку',
    blocks: [
      vocab(`productivity = продуктивність
burnout = вигорання
a trial = випробування, пілотний період
to cut hours = скоротити години
workload = робоче навантаження
flexible = гнучкий`),
      t(`More and more companies are experimenting with a four-day work week. In most trials, employees keep the same salary but work around 32 hours instead of 40.

Supporters say the results are impressive. Many companies report that productivity stays the same or even rises, because people are more focused and take fewer sick days. Employees often say they feel less stressed and have more time for family, hobbies and rest, which reduces the risk of burnout.

However, the model does not suit every business. Hospitals, shops and customer support teams need staff every day, so they cannot simply close on Fridays. Some workers also say that their workload does not get smaller, so four days become longer and more intense.

Experts suggest that the real lesson is not about the number of days. It is about working smarter: fewer meetings, clearer priorities and more flexible schedules.`),
      ex(
        ['truefalse', 'True or False?', `In most trials, people earn less money. = False
Some companies say productivity increases. = True
The four-day week works well for every type of business. = False
According to experts, the key idea is working smarter. = True`],
        ['sort', 'Arguments for or against the four-day week?', `For: people take fewer sick days; less stress; more time for family
Against: hospitals need staff every day; the workload stays the same; working days become more intense`],
      ),
      ex(['scale', 'How much do you agree?', `A four-day week would make people happier.
My job (or my future job) could work in four days.
Companies should decide this, not the government.`]),
      talk(`Would you like to work four days a week? What would you do with the extra day?
Which jobs could easily move to a four-day week, and which could not?`),
      ex(['open', 'Writing: 100-120 words.', 'Write a short opinion: Should your country introduce a four-day work week? Give two arguments and an example.']),
    ],
  },
];
