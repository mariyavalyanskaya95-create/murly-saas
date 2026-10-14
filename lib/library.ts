// Бібліотека готових уроків Murly (за рівнем, віком і темою).
// Вправи пишемо тим самим текстовим форматом, що й учитель у конструкторі.
import { parseSection } from './exercise';
import type { Block, Plan } from './lesson';

let n = 0;
const id = () => `lib-${++n}`;
const h = (text: string): Block => ({ id: id(), type: 'heading', text });
const t = (text: string): Block => ({ id: id(), type: 'text', text });
const tip = (text: string): Block => ({ id: id(), type: 'tip', text });
const vocab = (pairs: string): Block => ({
  id: id(), type: 'vocab',
  words: pairs.trim().split('\n').map((l) => { const [en, uk] = l.split('=').map((x) => x.trim()); return { en, uk }; }),
});
const ex = (...parts: [Parameters<typeof parseSection>[0], string, string][]): Block => ({
  id: id(), type: 'exercise', sections: parts.map(([type, instr, text]) => parseSection(type, instr, text.trim())),
});
const talk = (q: string): Block => ({ id: id(), type: 'speaking', questions: q.trim().split('\n').map((x) => x.trim()) });

export const LIBRARY: Plan[] = [
  {
    id: 'lib-zoo-animals', title: 'Animals at the zoo', level: 'A1', age: 'kids', topic: 'Тварини', color: 'lime', source: 'murly',
    blocks: [
      h('Let’s go to the zoo!'),
      vocab(`lion = лев
elephant = слон
monkey = мавпа
giraffe = жирафа
zebra = зебра
penguin = пінгвін
big = великий
small = маленький`),
      tip('Щоб сказати, що тварина вміє робити, використовуй can: A monkey can climb. A penguin can swim. А якщо не вміє, то can’t: A penguin can’t fly.'),
      t('This is a zoo. There is a big elephant. It is grey. There are three monkeys. They are funny. A giraffe has a long neck. A penguin can swim, but it can’t fly.'),
      ex(
        ['choice', 'Обери правильне слово.', `The elephant is {big|small}.
A giraffe has a {long|short} neck.
A penguin {can|can’t} swim.
A penguin {can’t|can} fly.`],
        ['gap', 'Напиши тварину англійською.', `лев: a [lion]
мавпа: a [monkey]
зебра: a [zebra]`],
      ),
      talk(`What is your favourite animal?
Can a lion swim?
What animals can you see in your city?`),
    ],
  },
  {
    id: 'lib-my-day', title: 'My day', level: 'A1', age: 'kids', topic: 'Розпорядок дня', color: 'sky', source: 'murly',
    blocks: [
      h('What do you do every day?'),
      vocab(`get up = вставати
have breakfast = снідати
go to school = йти до школи
do homework = робити домашнє завдання
play = гратися
go to bed = лягати спати`),
      tip('Present Simple: I get up, you get up, але he / she gets up. Для he, she, it додаємо -s.'),
      t('My name is Tom. I get up at 7 o’clock. I have breakfast with my mum. I go to school at 8. After school I do my homework and play with my dog. I go to bed at 9.'),
      ex(
        ['gap', 'Розкрий дужки.', `I [get] (get) up at 7.
Tom [has] (have) breakfast with his mum.
She [goes] (go) to school at 8.
We [play] (play) football after school.`],
        ['choice', 'Обери правильний варіант.', `He {goes|go} to bed at 9.
They {do|does} homework every day.`],
      ),
      talk(`When do you get up?
What do you have for breakfast?
What do you do after school?`),
    ],
  },
  {
    id: 'lib-social-media', title: 'Social media and me', level: 'A2', age: 'teens', topic: 'Соцмережі', color: 'mustard', source: 'murly',
    blocks: [
      h('How much time do you spend online?'),
      vocab(`to post = публікувати
to follow = підписуватися
a follower = підписник
to scroll = гортати стрічку
screen time = час перед екраном
to share = ділитися
a notification = сповіщення`),
      t('Mia is fifteen. She uses TikTok and Instagram every day. She usually posts photos at the weekend, but she never shares her address online. Her screen time is about three hours a day. She wants to spend less time scrolling.'),
      tip('Прислівники частоти (always, usually, often, sometimes, never) ставимо перед основним дієсловом: She usually posts. Але після be: She is always online.'),
      ex(
        ['choice', 'Обери правильний варіант.', `She {usually posts|posts usually} photos at the weekend.
Mia {never shares|shares never} her address.
I {am always|always am} online in the evening.`],
        ['gap', 'Встав слово з рамки: follow, scroll, notification.', `I got a [notification] from my friend.
Do you [follow] any musicians?
I [scroll] TikTok before bed.`],
        ['translate', 'Переклади англійською.', `Я ніколи не публікую фото = I never post photos / I never post pictures
Вона часто ділиться відео = She often shares videos`],
      ),
      talk(`Which apps do you use every day?
Is three hours of screen time a lot? Why?
What should you never share online?`),
    ],
  },
  {
    id: 'lib-travel-stories', title: 'Travel stories', level: 'B1', age: 'teens', topic: 'Подорожі', color: 'tomato', source: 'murly',
    blocks: [
      h('A trip I will never forget'),
      tip('Past Continuous описує фон (що тривало), Past Simple описує подію, яка його перервала: We were walking to the hotel when it started to rain.'),
      t('Last summer my family went to the mountains. On the second day we were walking near a lake when we saw a bear. It was drinking water and didn’t notice us. We stood very still, then we quietly walked back. My dad took a photo, but it was blurry!'),
      vocab(`to notice = помітити
still = нерухомо
quietly = тихо
blurry = розмитий
a trip = поїздка
to get lost = заблукати`),
      ex(
        ['gap', 'Розкрий дужки: Past Simple або Past Continuous.', `We [were walking] (walk) near a lake when we [saw] (see) a bear.
The bear [was drinking] (drink) water.
It [didn't notice/did not notice] (not notice) us.
While I [was taking] (take) a photo, my sister [shouted] (shout).`],
        ['choice', 'Обери правильний варіант.', `When the phone rang, I {was having|had} a shower.
We {got|were getting} lost on the first day.`],
      ),
      talk(`Tell about a trip you remember. Where were you? What happened?
Have you ever got lost? What did you do?`),
    ],
  },
  {
    id: 'lib-present-perfect-life', title: 'Have you ever…?', level: 'B1', age: 'teens', topic: 'Present Perfect · НМТ', color: 'lime', source: 'murly',
    blocks: [
      h('Life experience with Present Perfect'),
      tip('Present Perfect (have / has + V3) говорить про досвід без точного часу: I have been to Lviv. Якщо є точний час (yesterday, in 2022), потрібен Past Simple: I went to Lviv in 2022.'),
      vocab(`ever = коли-небудь
never = ніколи
already = вже
yet = ще (в запитаннях і запереченнях)
just = щойно
since = з (якогось моменту)
for = протягом`),
      ex(
        ['gap', 'Розкрий дужки.', `I [have never tried] (never / try) sushi.
She [has already finished] (already / finish) her project.
[Have] you ever [been] (be) abroad?
We [have known] (know) each other since 2019.`],
        ['choice', 'Present Perfect чи Past Simple?', `I {saw|have seen} him yesterday.
They {have lived|lived} here for five years and still live here.
She {has lost|lost} her keys, so she can’t open the door now.`],
        ['translate', 'Переклади англійською.', `Я ще не зробив домашнє завдання = I haven't done my homework yet / I have not done my homework yet
Ти коли-небудь бачив сніг? = Have you ever seen snow?`],
      ),
      talk(`Have you ever met a famous person?
What is the most interesting place you have been to?
What have you done this week that you are proud of?`),
    ],
  },
  {
    id: 'lib-small-talk-work', title: 'Small talk at work', level: 'B1', age: 'adults', topic: 'Робота', color: 'sky', source: 'murly',
    blocks: [
      h('How to start a conversation'),
      t('Small talk is a short, friendly conversation about safe topics: the weather, the weekend, travel or plans. It helps people feel relaxed before a meeting.'),
      vocab(`How’s it going? = Як справи?
Did you have a good weekend? = Як минули вихідні?
Any plans for the holidays? = Є плани на свята?
It was nice talking to you. = Приємно було поговорити.
to catch up = поспілкуватися, наздогнати новини`),
      tip('Відповідай не одним словом, а коротким реченням і поверни питання: Not bad, thanks. I went hiking. How about you?'),
      ex(
        ['choice', 'Обери найбільш природну відповідь.', `How’s it going? {Pretty good, thanks. And you?|Yes.|I am going.}
Did you have a good weekend? {Yes, I visited my parents. How was yours?|Weekend is good.|I have.}`],
        ['gap', 'Встав пропущене слово.', `It was nice [talking] to you.
Let’s [catch] up after the meeting.`],
        ['open', 'Відповідай повним реченням.', `Did you have a good weekend? Answer and ask a question back.
What do you usually talk about with colleagues?`],
      ),
      talk(`Role play: you meet a new colleague in the kitchen. Start a conversation.
Which topics are not good for small talk? Why?`),
    ],
  },
];

export const getLibraryPlan = (planId: string) => LIBRARY.find((p) => p.id === planId);
