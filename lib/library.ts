// Бібліотека готових уроків Murly (за рівнем, віком і темою).
// Вправи пишемо тим самим текстовим форматом, що й учитель у конструкторі.
import { parseSection } from './exercise';
import type { Block, Plan } from './lesson';
import { PRACTICE } from './practice';

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
const video = (url: string, task: string, caption?: string): Block => ({ id: id(), type: 'video', url, task, caption });
const note = (text: string): Block => ({ id: id(), type: 'note', text });

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
  {
    id: 'lib-yummy-yucky', title: 'Yummy or yucky?', level: 'A1', age: 'kids', topic: 'Їжа', color: 'mustard', source: 'murly',
    focus: ['Listening', 'Vocabulary', 'Speaking'],
    aims: 'Вивчимо назви їжі\nПослухаємо веселу пісню про дивні страви\nНавчимося питати Do you like…? і відповідати Yes, I do / No, I don’t',
    blocks: [
      h('Warm-up'),
      talk(`What is your favourite food?
What food don’t you like?`),
      vocab(`broccoli = броколі
ice cream = морозиво
pizza = піца
soup = суп
banana = банан
popcorn = попкорн
juice = сік
yummy = смачно
yucky = фу, несмачно`),
      tip('Питаємо: **Do you like pizza?** Відповідаємо: **Yes, I do!** або **No, I don’t.** Коротка відповідь повторює do, а не like.'),
      video('https://www.youtube.com/watch?v=frN3nvhIHUk', 'Подивись пісню. Які страви тобі здалися найсмішнішими?', 'Super Simple Songs'),
      note('У пісні звичайні страви змішуються в дивні пари (broccoli + ice cream). Нехай дитина після кожної пари показує жестом «yummy» або «yucky», а потім відповідає повним реченням.'),
      ex(
        ['truefalse', 'True or False?', `Broccoli ice cream is yummy in the song. = False
Ice cream is food. = True
Juice is a drink. = True`],
        ['sort', 'Food or drink?', `Food: pizza, soup, banana, popcorn, broccoli
Drink: juice, milk, water, tea`],
        ['choice', 'Обери правильну відповідь.', `Do you like bananas? Yes, I {do|like|am}.
Do you like soup? No, I {don’t|not|doesn’t}.`],
      ),
      talk(`Ask your teacher: Do you like…? (5 foods)
Invent a crazy food, like pizza juice. Is it yummy or yucky?`),
    ],
  },
  {
    id: 'lib-weather-clothes', title: 'What’s the weather like?', level: 'A2', age: 'kids', topic: 'Погода і одяг', color: 'sky', source: 'murly',
    focus: ['Vocabulary', 'Reading', 'Speaking'],
    aims: 'Назвемо погоду і одяг\nПрочитаємо листівку від друга\nВирішимо, що вдягнути в різну погоду',
    blocks: [
      h('Warm-up'),
      talk(`What’s the weather like today?
What are you wearing now?`),
      vocab(`sunny = сонячно
rainy = дощово
windy = вітряно
snowy = сніжно
cold = холодно
hot = спекотно
a jacket = куртка
boots = чоботи
a scarf = шарф
shorts = шорти
an umbrella = парасолька`),
      t(`Hi Sofia!

I’m in the mountains with my family. It’s very cold and snowy here! I’m wearing my big red jacket, warm boots and a scarf. Yesterday it was windy, so we stayed in the hotel and played games. Tomorrow it will be sunny, and we want to go skiing.

What’s the weather like in Kyiv?
Love, Mia`),
      ex(
        ['truefalse', 'Read and answer: True or False?', `Mia is at the sea. = False
It is cold and snowy. = True
Mia is wearing shorts. = False
Tomorrow will be sunny. = True`],
        ['match', 'Match the weather with the clothes.', `rainy = an umbrella
snowy = warm boots
hot and sunny = shorts
windy = a scarf`],
      ),
      tip('**It’s** + погода: It’s sunny. It’s cold. Для того, що на тобі зараз: **I’m wearing** a jacket.'),
      ex(['gap', 'Встав слово.', `It’s [rainy] today. Take an umbrella!
I’m [wearing] a warm jacket.
It’s [hot], let’s go to the beach!`]),
      talk(`Look out of the window. What’s the weather like? What should you wear?
What is your favourite weather? Why?`),
      ex(['open', 'Напиши відповідь Мії (3-4 речення).', 'Hi Mia! What’s the weather like in your city? What are you wearing?']),
    ],
  },
  {
    id: 'lib-my-family', title: 'This is my family', level: 'A1', age: 'kids', topic: 'Сім’я', color: 'tomato', source: 'murly',
    focus: ['Vocabulary', 'Grammar'],
    aims: 'Назвемо членів сім’ї\nНавчимося говорити have got / has got\nРозкажемо про свою сім’ю',
    blocks: [
      vocab(`mum = мама
dad = тато
sister = сестра
brother = брат
grandma = бабуся
grandpa = дідусь
aunt = тітка
uncle = дядько
cousin = двоюрідний брат / сестра`),
      tip('I / you / we / they **have got**, але he / she / it **has got**: I have got a sister. She has got a cat.'),
      t('Hello! I’m Max. I’m eight. I have got a big family. I have got one sister. Her name is Lily. She has got long hair. My grandma and grandpa live with us. My cousin Tom has got a funny dog called Biscuit.'),
      ex(
        ['choice', 'Обери правильне слово.', `Max {has got|have got} one sister.
I {have got|has got} a big family.
Tom {has got|have got} a dog.`],
        ['truefalse', 'True or False?', `Max is ten. = False
Lily is Max’s sister. = True
Biscuit is a cat. = False`],
        ['match', 'Знайди пару.', `mum = мама
grandpa = дідусь
aunt = тітка
brother = брат`],
      ),
      talk(`Who is in your family?
Have you got a brother or a sister?
Have you got a pet?`),
    ],
  },
  {
    id: 'lib-bilingual-brain', title: 'The bilingual brain', level: 'B1', age: 'teens', topic: 'Мови і мозок', color: 'lime', source: 'murly',
    focus: ['Listening', 'Vocabulary', 'Speaking'],
    aims: 'Обговоримо, навіщо вчити кілька мов\nПодивимось коротке відео TED-Ed і перевіримо розуміння\nВивчимо слова про мозок і навчання\nВисловимо свою думку',
    blocks: [
      h('Warm-up'),
      talk(`How many languages do you speak or understand?
Is it easier to learn a language as a child or as an adult? Why?`),
      vocab(`bilingual = двомовний
native language = рідна мова
to acquire = засвоювати, набувати
the brain = мозок
to switch = перемикатися
an advantage = перевага
fluent = вільний (про мову)
to decline = знижуватися`),
      h('Watch'),
      video('https://www.youtube.com/watch?v=MMmOLN5zBLY', 'Подивись відео (5 хв). Спершу просто зрозумій головну ідею, потім виконай вправи.', 'TED-Ed: The benefits of a bilingual brain'),
      note('Відео з англійськими субтитрами на YouTube. На B1 можна дивитися двічі: спочатку для загального розуміння, потім для деталей. Перевір відповіді True/False разом, повертаючись до моментів у відео.'),
      ex(
        ['truefalse', 'True or False?', `The video describes different types of bilingual people. = True
You can only learn a second language as a small child. = False
Using two languages can keep your brain active. = True`],
        ['match', 'Match the words with their meanings.', `fluent = able to speak easily and well
to switch = to change from one thing to another
an advantage = something that helps you
native language = the first language you learn`],
      ),
      tip('Говоримо про переваги: **One advantage of … is that …** / **It helps you to …** / **The best thing about … is …**'),
      ex(['gap', 'Встав слово: switch, fluent, advantage, acquire.', `Children [acquire] languages very quickly.
She is [fluent] in English and Spanish.
Bilingual people can [switch] between languages.
One [advantage] of speaking two languages is better memory.`]),
      talk(`Which language would you like to learn next? Why?
Agree or disagree: "Everyone in Ukraine should speak English." Give two reasons.`),
      ex(['open', 'Writing: 60-80 words.', 'Write a short post: "Why I learn English". Use at least three words from the lesson.']),
    ],
  },
  {
    id: 'lib-phone-free-school', title: 'The phone-free school', level: 'B1', age: 'teens', topic: 'Школа · НМТ Reading', color: 'mustard', source: 'murly',
    focus: ['Reading', 'НМТ'],
    aims: 'Потренуємо читання у форматі НМТ\nНавчимося знаходити ключові слова в тексті\nОбговоримо телефони в школі',
    blocks: [
      tip('Лайфхак для НМТ: спочатку прочитай питання, потім текст. Підкресли ключові слова, а в тексті шукай їхні синоніми, а не ті самі слова.'),
      h('Read the text'),
      t(`Last September, Oakfield Secondary School tried something new: no phones during the school day. Students now leave their phones in a locker when they arrive and collect them at 3 pm.

At first, many students were unhappy. "I felt lost without my phone for the first week," says Daria, 15. "But then I noticed that people started talking at lunch instead of scrolling."

Teachers say lessons have become calmer. "Students are more focused, and fewer of them come to class late," explains Mr Collins, the head teacher. However, some parents are worried that they cannot contact their children during the day. The school now allows parents to call the office in an emergency.

After one year, the school asked students what they thought. Almost two thirds said they would keep the rule, although many wanted to use phones in the library for research.`),
      ex(
        ['truefalse', 'True or False?', `Students keep their phones in their bags during lessons. = False
Daria found the first week difficult. = True
According to Mr Collins, students are less focused now. = False
Parents can call the school office if something serious happens. = True`],
        ['choice', 'Choose the best answer (A, B or C).', `What changed at lunch time? {Students talked more|Students ate faster|Students went home}
Most students wanted to {keep the rule|stop the rule|make the rule stricter}.
Some students asked to use phones {in the library|in lessons|at lunch}.`],
        ['match', 'Match the words from the text with their meanings.', `a locker = a small cupboard to keep your things
calm = quiet and peaceful
an emergency = a sudden dangerous situation
to contact = to call or write to someone`],
      ),
      talk(`Would you like a phone-free school? Why / why not?
What are the good and bad sides of phones at school?`),
      ex(['open', 'НМТ Writing: 50-70 words.', 'Write an email to your head teacher. Say if you support a phone-free day at your school and give two reasons.']),
    ],
  },
  {
    id: 'lib-nmt-use-of-english', title: 'НМТ Use of English: tricky pairs', level: 'B1', age: 'teens', topic: 'НМТ', color: 'tomato', source: 'murly',
    focus: ['Grammar', 'Vocabulary', 'НМТ'],
    aims: 'Розберемо пари слів, на яких часто помиляються в НМТ\nПотренуємо вибір правильного варіанту в тексті',
    blocks: [
      tip('**make** = створювати (make a cake, make a mistake, make friends). **do** = виконувати (do homework, do sport, do your best).\n\n**say** something, але **tell** someone something.\n\n**since** + момент (since Monday), **for** + період (for two weeks).'),
      ex(
        ['choice', 'Make or do?', `I always {make|do} mistakes in spelling.
Have you {done|made} your homework yet?
It’s easy to {make|do} friends at camp.
Just {do|make} your best!`],
        ['choice', 'Say or tell?', `Can you {tell|say} me the time?
She {said|told} that she was tired.
Don’t {tell|say} anyone my secret!`],
        ['choice', 'Since or for?', `I have lived here {since|for} 2018.
We have waited {for|since} an hour.
She has been ill {since|for} Monday.`],
      ),
      h('Text practice'),
      ex(['choice', 'Choose the correct word to complete the text.', `Last summer I {went|have gone|go} to a language camp.
I {made|did} a lot of new friends there.
We {had|have had} lessons every morning.
Our teacher {told|said} us funny stories about London.
I {have studied|study} English since I was seven.`]),
      ex(['translate', 'Переклади англійською.', `Я роблю домашнє завдання щовечора = I do my homework every evening
Вона сказала мені правду = She told me the truth
Ми знаємо одне одного вже три роки = We have known each other for three years`]),
    ],
  },
  {
    id: 'lib-stress-friend', title: 'Stress: friend or enemy?', level: 'B2', age: 'adults', topic: 'Психологія', color: 'sky', source: 'murly',
    focus: ['Listening', 'Speaking', 'Vocabulary'],
    aims: 'Обговоримо, як ми реагуємо на стрес\nПодивимось TED talk і перевіримо розуміння\nВивчимо лексику про емоції і здоров’я\nПосперечаємось і висловимо думку',
    blocks: [
      h('Warm-up'),
      talk(`What makes you stressed?
Is stress always bad? Can it help you sometimes?`),
      vocab(`to cope with = справлятися з
a heart rate = пульс
harmful = шкідливий
to reach out = звертатися по підтримку
resilience = стійкість
to perceive = сприймати
anxious = тривожний`),
      video('https://www.youtube.com/watch?v=RcGyVTAoXEU', 'Подивись talk (14 хв, можна з субтитрами). Яка головна ідея спікерки?', 'TED: Kelly McGonigal, How to make stress your friend'),
      note('Якщо часу мало, подивіться перші 6-7 хвилин: там основне дослідження і ключова ідея. Обговоріть, чи погоджуються учні з нею.'),
      ex(
        ['truefalse', 'True or False?', `The speaker says stress is always bad for your health. = False
The way you think about stress can change how it affects you. = True
The speaker suggests that reaching out to others can help under stress. = True`],
        ['match', 'Match the words with their meanings.', `harmful = causing damage
to cope with = to deal successfully with a problem
anxious = worried and nervous
resilience = the ability to recover from difficulties`],
        ['sort', 'Which phrases are for agreeing and which are for disagreeing?', `Agreeing: That’s exactly what I think.; I couldn’t agree more.; Good point.
Disagreeing: I’m not so sure about that.; I see it differently.; That’s not always true.`],
      ),
      talk(`Do you agree that stress can be "your friend"? Use phrases from the exercise.
What do you usually do to cope with stress at work?
How can companies help their employees feel less anxious?`),
      ex(['open', 'Writing: 100-120 words.', 'Write a short opinion post: "Stress is not the enemy". Agree or disagree and give examples from your life.']),
    ],
  },
  {
    id: 'lib-cafe-order', title: 'At the café', level: 'A2', age: 'adults', topic: 'Кафе і подорожі', color: 'lime', source: 'murly',
    focus: ['Speaking', 'Vocabulary'],
    aims: 'Вивчимо фрази для замовлення в кафе\nРозкладемо фрази: офіціант чи клієнт\nРозіграємо діалог',
    blocks: [
      vocab(`a menu = меню
to order = замовляти
a bill = рахунок
a table for two = столик на двох
still / sparkling water = вода без газу / з газом
to take away = з собою
a tip = чайові`),
      t(`Waiter: Hi! Are you ready to order?
Anna: Yes, can I have a cappuccino and a cheese sandwich, please?
Waiter: Of course. Eat in or take away?
Anna: Eat in, please.
Waiter: Anything else?
Anna: No, thanks. Could I have the bill, please?`),
      ex(
        ['sort', 'Who says it: the waiter or the customer?', `Waiter: Are you ready to order?; Eat in or take away?; Anything else?
Customer: Can I have a cappuccino, please?; Could I have the bill, please?; A table for two, please.`],
        ['choice', 'Choose the polite option.', `{Can I have|I want|Give me} a tea, please?
{Could I have|Bring} the bill, please?`],
        ['translate', 'Переклади англійською.', `Можна мені воду без газу? = Can I have still water? / Could I have still water?
Рахунок, будь ласка = The bill, please / Could I have the bill, please?`],
      ),
      talk(`Role play: you are in a café in London. Order a drink and something to eat, then ask for the bill.
What do you usually order in a café?`),
    ],
  }
];

// Фокус для перших уроків бібліотеки
const FOCUS_MAP: Record<string, string[]> = {
  'lib-zoo-animals': ['Vocabulary', 'Speaking'], 'lib-my-day': ['Grammar', 'Vocabulary'],
  'lib-social-media': ['Vocabulary', 'Reading'], 'lib-travel-stories': ['Grammar', 'Reading'],
  'lib-present-perfect-life': ['Grammar', 'НМТ'], 'lib-small-talk-work': ['Speaking'],
};
LIBRARY.forEach((p) => { if (!p.focus && FOCUS_MAP[p.id]) p.focus = FOCUS_MAP[p.id]; });

// Listening і Reading з розділу «Практика» теж доступні вчителю в бібліотеці
LIBRARY.push(...PRACTICE);

export const getLibraryPlan = (planId: string) => LIBRARY.find((p) => p.id === planId);
