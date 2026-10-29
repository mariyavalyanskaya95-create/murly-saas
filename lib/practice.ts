// Розділ «Практика»: Listening і Reading за рівнями і віком.
// Той самий формат, що й уроки (Plan), тож усе можна показати учню чи відправити як домашку.
import { parseSection } from './exercise';
import type { Block, Plan } from './lesson';
import { makeHelpers } from './lessons/helpers';
const X = makeHelpers('prx');

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
      X.h('More practice'),
      X.vocab(`a pet = домашній улюбленець
a rabbit = кролик
white = білий
brown = коричневий
small = маленький
a carrot = морквина
a shop = магазин
to help = допомагати
a month = місяць`),
      X.ex(
        ['truefalse', 'Прочитай і обери True або False.', `Emma wants a pet. = True
Emma sees two rabbits. = True
One rabbit is black. = False
The brown rabbit is two months old. = True
The rabbit likes apples. = False
Emma says "I love it!" = True
Emma takes the white rabbit. = False`],
        ['gap', 'Встав слово з діалогу.', `Can I [help] you?
I want a [pet].
This rabbit is [white].
Can I see the [rabbits], please?
It is two [months] old.
It likes [carrots].
Here you [are].`],
        ['translate', 'Переклади англійською.', `Я хочу домашнього улюбленця. = I want a pet
Кролик маленький. = The rabbit is small / The rabbit is little
Кролик білий. = The rabbit is white
Я люблю моркву. = I love carrots / I like carrots
У мене є кіт. = I have got a cat / I’ve got a cat / I have a cat
Це коричневий кролик. = This is a brown rabbit / It is a brown rabbit / It’s a brown rabbit`],
      ),
      X.talk(`What is your favourite animal?
Is your pet big or small?
What colour is your pet?
What does your pet like to eat?
Do you want a rabbit?`),
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
      X.h('More practice'),
      X.vocab(`a garden = сад
a superhero film = фільм про супергероїв
the cinema = кінотеатр
to start = починатися
half past three = пів на четверту
next to = поруч з
grandparents = бабуся і дідусь
Sounds great! = Звучить чудово!
Perfect. = Чудово.`),
      X.ex(
        ['choice', 'Обери правильну відповідь за діалогом.', `Max invites Lily to {the cinema|a party|the park}.
Lily is busy on Saturday {morning|afternoon|evening}.
The superhero film is {new|old|boring}.
The café is {next to the cinema|next to the school|in the garden}.
They are meeting {half an hour before the film|after the film|at four o’clock}.
Sam {isn’t coming|is coming|is late}.`],
        ['gap', 'Розкрий дужки: Present Continuous для планів.', `Lily [is helping/’s helping] (help) her mum on Saturday morning.
Max and Lily [are going/’re going] (go) to the cinema.
They [are meeting/’re meeting] (meet) at half past three.
Sam [isn’t coming/is not coming/’s not coming] (not come) with them.
[Is Sam visiting] (Sam / visit) his grandparents? Yes, he is.
I [am playing/’m playing] (play) football on Sunday.
We [aren’t watching/are not watching/’re not watching] (not watch) TV tonight.`],
        ['translate', 'Переклади англійською.', `Що ти робиш у суботу? = What are you doing on Saturday
Я зустрічаюся з друзями завтра. = I am meeting my friends tomorrow / I’m meeting my friends tomorrow / I am meeting friends tomorrow / I’m meeting friends tomorrow
О котрій починається фільм? = What time does the film start / When does the film start
Фільм починається о четвертій. = The film starts at four / The film starts at four o’clock / The film starts at 4
Сем іде з нами? = Is Sam coming with us / Is Sam coming too
Звучить чудово! = Sounds great / That sounds great`],
      ),
      X.talk(`What are you doing after school tomorrow?
Do you prefer the cinema or watching films at home? Why?
What do you usually do with your grandparents?
Where do you usually meet your friends?
Invite your partner to a film. Agree on the time and the place.`),
    ],
  },
  {
    id: 'lib-l-school-trip', title: 'School trip announcement', level: 'B1', age: 'teens', topic: 'Listening', color: 'mustard', source: 'murly', focus: ['Listening'],
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
      X.h('More practice'),
      X.vocab(`an announcement = оголошення
the main gate = головні ворота
to leave = від’їжджати
to cost = коштувати
a packed lunch = обід із собою
expensive = дорогий
snacks = перекуски
an exhibition = виставка
a workshop = майстер-клас
to be back = повернутися`),
      X.ex(
        ['choice', 'Обери правильну відповідь (A, B, C або D).', `The trip is {next Friday|this Friday|next Wednesday|next Monday}.
The students are going to {the science museum|the history museum|the zoo|the art gallery}.
The bus leaves from {the main gate|the museum|the bus station|the school café}.
The time of the bus {has changed|is the same as before|is not known yet|depends on the weather}.
Students should give the money to {their class teacher|the bus driver|the museum staff|the head teacher}.
The teacher says the museum café is {quite expensive|very cheap|closed on Fridays|too small}.`],
        ['gap', 'Встав слово з оголошення.', `The bus will [leave] from the main gate at 8:15.
The trip [costs] two hundred hryvnias.
Bring a [packed] lunch and a bottle of water.
Snacks at the museum café are quite [expensive].
We will visit the space [exhibition] first.
Then we will take part in a robot [workshop].
We will be [back] at school at about four.
Please listen carefully to the [announcement].`],
        ['translate', 'Переклади англійською.', `Автобус від’їжджає о восьмій. = The bus leaves at eight / The bus leaves at 8 / The bus leaves at eight o’clock
Не запізнюйтеся. = Don’t be late / Do not be late
Скільки коштує екскурсія? = How much does the trip cost / How much is the trip
Візьміть із собою пляшку води. = Bring a bottle of water / Take a bottle of water
Ми повернемося близько четвертої. = We will be back at about four / We’ll be back at about four / We will be back around four / We’ll be back around four / We will come back at about four / We’ll come back at about four
Спершу ми відвідаємо виставку. = First we will visit the exhibition / First we’ll visit the exhibition / We will visit the exhibition first / We’ll visit the exhibition first`],
      ),
      X.talk(`Which museum would you like to visit with your class? Why?
Do you prefer school trips to museums or to nature? Why?
What do you usually take with you on a school trip?
You are organising a class trip. What important information must you give to the students?`),
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
      X.h('More practice'),
      X.vocab(`a receptionist = адміністратор на рецепції
How can I help you? = Чим можу допомогти?
Let me check. = Зараз перевірю.
a double room = двомісний номер
a passport = паспорт
Here you are. = Ось, будь ласка.
the third floor = третій поверх
on your left = ліворуч від вас
Breakfast is served. = Сніданок подають.`),
      X.ex(
        ['choice', 'Обери правильну відповідь.', `The hotel is called {the Riverside Hotel|the River Hotel|the Seaside Hotel}.
The guest is staying for {three nights|two nights|a week}.
The receptionist asks to see the guest’s {passport|ticket|bank card}.
Room 312 is on the {third|second|first} floor.
Breakfast is served in {the restaurant|the room|the bar}.
The Wi-Fi password is {river24|riverside24|river42}.`],
        ['match', 'Знайди пару: початок і кінець фрази з діалогу.', `Welcome to = the Riverside Hotel.
I have = a reservation.
Could I see = your passport, please?
The lift is = on your left.
Is breakfast = included?
What’s the Wi-Fi = password?
Check-out = is at eleven.`],
        ['translate', 'Переклади англійською.', `У мене є бронювання. = I have a reservation / I’ve got a reservation / I have a booking
Сніданок включено? = Is breakfast included
Де ліфт? = Where is the lift / Where’s the lift / Where is the elevator
О котрій виселення? = What time is check-out / What time is checkout / When is check-out / When is checkout
Мій номер на третьому поверсі. = My room is on the third floor
Можна мені пароль від Wi-Fi? = Can I have the Wi-Fi password / Could I have the Wi-Fi password`],
      ),
      X.talk(`Have you ever had a problem in a hotel? What happened?
Do you prefer hotels, hostels or renting an apartment? Why?
What questions do you usually ask when you check in?
Is breakfast in a hotel important for you? Why or why not?
Describe the best place you have ever stayed in.`),
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
      X.h('More practice'),
      X.vocab(`a best friend = найкращий друг
short = короткий
black = чорний
brown eyes = карі очі
funny = веселий
kind = добрий
the same school = та сама школа
fast = швидко
to swim = плавати
favourite = улюблений`),
      X.ex(
        ['choice', 'Обери правильне слово.', `Oliver is {nine|ten} years old.
He has got {short|long} black hair.
His eyes are {brown|blue}.
They go to the same {school|park}.
Oliver can run very {fast|slowly}.
His favourite food is {pizza|soup}.
His favourite colour is {green|red}.`],
        ['match', 'Знайди пару: слово і переклад.', `hair = волосся
eyes = очі
kind = добрий
funny = веселий
fast = швидко
to swim = плавати
green = зелений`],
        ['gap', 'Обери слово з дужок і впиши.', `Oliver [is] (is / are) nine.
He [has got] (has got / have got) brown eyes.
They [play] (play / plays) football in the park.
Oliver [can] (can / can’t) run fast.
Oliver [can’t/cannot] (can / can’t) swim.
His favourite food [is] (is / are) pizza.`],
      ),
      X.talk(`How old is your best friend?
What colour is your friend’s hair?
Can your friend swim?
What is your friend’s favourite food?
What games do you play together?`),
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
      X.h('More practice'),
      X.vocab(`bored = знуджений, якому нудно
to stop working = перестати працювати
a board game = настільна гра
under the sofa = під диваном
to win (won) = вигравати (виграв)
a neighbour = сусід, сусідка
to come back = повернутися
bedtime = час спати
strange = дивний
actually = насправді`),
      X.ex(
        ['choice', 'Обери правильну відповідь за текстом.', `The internet stopped at {nine in the morning|nine in the evening|eight in the morning}.
The board game was {under the sofa|on the table|in the garden}.
The writer played the game with {a little brother|Daria|a friend from school}.
They played for {two hours|three hours|one hour}.
The writer and Daria talked about {school and music|films and games|dogs and cats}.
The writer started the book {last summer|last week|yesterday}.`],
        ['gap', 'Past Simple: розкрий дужки.', `The internet [stopped] (stop) at nine.
I [was] (be) really bored at first.
My little brother [found] (find) an old board game.
We [played] (play) it for two hours.
I [won] (win) three times!
I [met] (meet) my neighbour, Daria.
I [didn’t turn/did not turn] (not turn) on my phone until bedtime.`],
        ['translate', 'Переклади англійською.', `Мені було нудно. = I was bored
Інтернет перестав працювати. = The internet stopped working
Ми грали в настільну гру. = We played a board game / We were playing a board game
Я гуляв із собакою. = I walked my dog / I went for a walk with my dog / I walked with my dog
Це був дивний день. = It was a strange day
Інтернет повернувся о восьмій. = The internet came back at eight / The internet came back at 8 / The internet came back at eight o’clock`],
      ),
      X.talk(`How many hours a day do you spend online?
What do you do when the internet stops working?
Do you like board games? Which one is your favourite?
Could you live without your phone for a week? Why or why not?`),
    ],
  },
  {
    id: 'lib-r-volunteering', title: 'Teens who help', level: 'B1', age: 'teens', topic: 'Reading', color: 'mustard', source: 'murly', focus: ['Reading'],
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
      X.h('More practice'),
      X.vocab(`a volunteer = волонтер
to join = приєднатися
to collect = збирати
to sort = сортувати
to deliver = доставляти
heavy = важкий
tired = втомлений
a social worker = соціальний працівник
advice = порада
to make a difference = змінити щось на краще`),
      X.ex(
        ['choice', 'Обери правильну відповідь (A, B, C або D).', `Andrii joined the group when he was {fifteen|fourteen|sixteen|seventeen}.
The group works {every Saturday|every Sunday|every day|once a month}.
Andrii delivers the boxes {by bike|by car|by bus|on foot}.
The work is not easy when {it rains|he is at school|there are no boxes|his friends are busy}.
When people say thank you, Andrii {forgets about being tired|feels more tired|goes home early|wants to stop}.
Before volunteering, Andrii wanted to study {IT|medicine|law|music}.
Now Andrii prefers working with {people|computers|animals|numbers}.`],
        ['gap', 'Встав слово: useful, collects, delivers, heavy, tired, advice, difference.', `Andrii wanted to do something [useful].
Every Saturday the group [collects] food and clothes.
Andrii [delivers] the boxes by bike.
Sometimes the boxes are [heavy].
When people smile, he forgets about being [tired].
His [advice] to other teenagers is simple.
Even one hour a week can make a [difference].`],
        ['translate', 'Переклади англійською.', `Я хочу робити щось корисне. = I want to do something useful
Він приєднався до групи волонтерів. = He joined a volunteer group / He joined a group of volunteers
Ящики важкі. = The boxes are heavy
Почни з малого. = Start small
Він думає стати соціальним працівником. = He is thinking about becoming a social worker / He’s thinking about becoming a social worker / He thinks about becoming a social worker
Одна година на тиждень може змінити щось на краще. = One hour a week can make a difference`],
      ),
      X.talk(`What problems in your town could volunteers help with?
Would you prefer to help people, animals or nature? Why?
How can volunteering help you choose a future job?
Some people say teenagers are too busy to volunteer. Do you agree?`),
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
      X.h('More practice'),
      X.vocab(`an employee = працівник
a salary = зарплата
impressive = вражаючий
to be focused = бути зосередженим
a sick day = лікарняний день
to reduce = зменшувати
to suit = підходити
intense = інтенсивний, напружений
a priority = пріоритет
a schedule = графік, розклад`),
      X.ex(
        ['choice', 'Обери правильну відповідь за статтею.', `In most trials, employees work around {32 hours|40 hours|24 hours} a week.
In many companies, productivity {stays the same or rises|falls a lot|is not measured}.
According to the text, the four-day week can reduce the risk of {burnout|unemployment|mistakes}.
The model is difficult for {hospitals and shops|software companies|design studios}.
Some workers say their working days {become longer and more intense|become shorter|start later}.
Experts recommend {fewer meetings|more meetings|longer working days}.`],
        ['match', 'Знайди пояснення до слова.', `impressive = very good, making you admire it
to suit = to be right for someone or something
intense = needing a lot of effort and energy
a trial = a test for a limited period
workload = the amount of work you have to do
flexible = able to change easily
a priority = something more important than other things`],
        ['translate', 'Переклади англійською.', `Продуктивність залишилася такою ж. = Productivity stayed the same / Productivity has stayed the same / Productivity remained the same
Ця модель підходить не кожному бізнесу. = This model does not suit every business / This model doesn’t suit every business / The model does not suit every business / The model doesn’t suit every business
Працівники отримують ту саму зарплату. = Employees get the same salary / Employees receive the same salary / Employees keep the same salary / The employees get the same salary
Менше зустрічей і чіткіші пріоритети. = Fewer meetings and clearer priorities
Чотириденний тиждень зменшує ризик вигорання. = The four-day week reduces the risk of burnout / A four-day week reduces the risk of burnout
Моє навантаження не зменшилося. = My workload did not get smaller / My workload didn’t get smaller / My workload did not decrease / My workload didn’t decrease / My workload has not decreased / My workload hasn’t decreased`],
      ),
      X.talk(`How many hours a week do you think people should work?
What causes burnout in your job or studies?
Would you accept a lower salary for a four-day week? Why or why not?
Which meetings in your work or studies could be cut?
How would your country’s economy change with a four-day week?`),
    ],
  },
  {
    id: 'lib-r-hedgehog', title: 'Pip the hedgehog', level: 'A1', age: 'kids', topic: 'Тварини', color: 'lime', source: 'murly', focus: ['Reading'],
    aims: 'Прочитаємо короткий текст про їжачка\nПовторимо Present Simple: he lives, he likes\nРозкажемо про свою улюблену тварину',
    blocks: [
      tip('Перед читанням подумай: де живуть їжаки? Що вони їдять?'),
      vocab(`a hedgehog = їжак
a nose = ніс
legs = лапки
a garden = сад
behind = за, позаду
to sleep = спати
at night = вночі
to look for = шукати
a worm = черв’як
a bowl = мисочка`),
      t(`This is Pip. Pip is a hedgehog. He is small and brown. He has got a little black nose and short legs.

Pip lives in a garden behind Sofia’s house. In the day, Pip sleeps under a big tree. At night, he walks in the garden and looks for food. He likes worms and apples. He doesn’t like milk.

Every evening, Sofia puts water in a little bowl for Pip. Pip drinks the water. Sofia smiles. Pip is her favourite animal.`),
      ex(
        ['truefalse', 'True or False?', `Pip is a cat. = False
Pip is small and brown. = True
Pip has got long legs. = False
Pip sleeps in the day. = True
Pip likes milk. = False
Sofia gives Pip water. = True`],
        ['choice', 'Choose the right word.', `Pip lives in {a garden|a school|a shop}.
Pip sleeps under {a big tree|a car|a bed}.
At night Pip looks for {food|toys|friends}.
Pip likes {worms and apples|milk and bread|fish and cheese}.
Sofia puts water in {a bowl|a cup|a box}.`],
        ['match', 'Знайди пару: слово і переклад.', `small = маленький
a nose = ніс
a tree = дерево
at night = вночі
an apple = яблуко
water = вода`],
      ),
      talk(`Do you like hedgehogs?
What animals live near your house?
What is your favourite animal? What does it eat?
Where does your favourite animal sleep?`),
    ],
  },
  {
    id: 'lib-r-class-garden', title: 'Our class garden', level: 'A2', age: 'kids', topic: 'Школа', color: 'sky', source: 'murly', focus: ['Reading', 'Grammar'],
    aims: 'Прочитаємо історію про шкільний город\nЗнайдемо в тексті дієслова в Past Simple\nПоговоримо про рослини і роботу разом',
    blocks: [
      tip('Перед читанням: у тебе є рослини вдома чи біля школи? Хто їх поливає?'),
      vocab(`a seed = насінина
to plant = садити
to water = поливати
the ground = земля
leaves = листя
a stone = камінь
beans = квасоля
a sunflower = соняшник
to pick = збирати (врожай)
the whole class = увесь клас`),
      t(`Last spring our teacher, Ms Hanna, had a great idea. “Let’s make a garden next to our school!” she said.

On Monday we cleaned the ground and took away old leaves and stones. On Tuesday Taras’s dad brought some seeds: tomatoes, carrots, beans and sunflowers. We planted them in long lines. Every child in our class got a job. Marta and I watered the plants every morning before lessons.

At first nothing happened, and Bohdan was sad. “Our garden is just brown!” he said. But after two weeks we saw small green leaves. By June the sunflowers were taller than our teacher!

In September we picked the tomatoes and made a big salad for the whole class. It was the best salad in the world.`),
      ex(
        ['truefalse', 'True or False?', `The garden was Ms Hanna’s idea. = True
Taras’s dad brought the seeds. = True
Bohdan was happy at first. = False
The children saw green leaves after two days. = False
The sunflowers grew very tall. = True`],
        ['choice', 'Choose the correct answer.', `The children cleaned the ground on {Monday|Tuesday|Friday}.
The writer and Marta {watered the plants|brought the seeds|picked the leaves} every morning.
By June the sunflowers were taller than {the teacher|the school|Taras’s dad}.
In September the class picked {the tomatoes|the sunflowers|the beans}.
The class made {a salad|a soup|a cake}.`],
        ['gap', 'Past Simple: розкрий дужки.', `Ms Hanna [had] (have) a great idea.
We [cleaned] (clean) the ground on Monday.
Taras’s dad [brought] (bring) some seeds.
We [planted] (plant) them in long lines.
After two weeks we [saw] (see) small green leaves.
We [made] (make) a big salad.`],
      ),
      talk(`Have you got a garden or plants at home?
Would you like a garden at your school? What would you plant?
Which job in the garden would you choose: planting, watering or picking?
What is your favourite vegetable?`),
    ],
  },
  {
    id: 'lib-r-flat-advert', title: 'A flat to rent', level: 'A2', age: 'adults', topic: 'Житло', color: 'sky', source: 'murly', focus: ['Reading', 'Vocabulary'],
    aims: 'Прочитаємо оголошення про оренду квартири\nЗнайдемо ціну, умови й правила\nПовторимо must, mustn’t і can для правил',
    blocks: [
      tip('Перед читанням: що ти шукаєш в оголошенні про оренду насамперед? Ціну, район, поверх, правила?'),
      vocab(`to rent = винаймати, орендувати
rent = орендна плата
bills = комунальні платежі
included = включено
a deposit = застава
available from = вільна з
a contract = договір
at least = щонайменше
to move in = заселитися
a viewing = перегляд квартири
weekdays = будні`),
      t(`**FLAT TO RENT: 15 Shevchenko Street**

Bright one-bedroom flat on the fourth floor. There is a lift. The flat has a modern kitchen, a small balcony and a new washing machine. It is a ten-minute walk to the metro, and there is a supermarket across the street.

**Rent:** 12,000 hryvnias a month. Bills (electricity, water and gas) are not included.

**Deposit:** one month’s rent.

**Available from:** 1 March.

**Please note:** You must sign a contract for at least six months. Pets are welcome, but you must tell us about them before you move in. You mustn’t smoke inside the flat, but you can smoke on the balcony. Please don’t make noise after 10 pm: our neighbours have small children.

Interested? Call Iryna on weekdays after 6 pm or send her a message at any time. Viewings are on Saturdays only.`),
      ex(
        ['truefalse', 'True or False?', `The flat is on the ground floor. = False
There is a shop near the building. = True
The rent includes electricity and water. = False
You can have a cat in this flat. = True
You can call Iryna on weekday mornings. = False`],
        ['choice', 'Choose the correct answer.', `The deposit is {12,000 hryvnias|6,000 hryvnias|24,000 hryvnias}.
The shortest contract is {six months|one month|one year}.
You can smoke {on the balcony|in the kitchen|in the bedroom}.
You can see the flat {on Saturdays|on any day|after 10 pm}.
You can move in from {1 March|1 May|1 June}.`],
        ['gap', 'Встав must, mustn’t або can.', `You [must] sign a contract for at least six months.
You [mustn’t/must not] smoke inside the flat.
You [can] smoke on the balcony.
You [must] tell the owner about your pets.
You [mustn’t/must not] make noise after 10 pm.
You [can] send Iryna a message at any time.`],
      ),
      talk(`What is important for you when you look for a flat?
Would you prefer a flat near the metro or near a park? Why?
Is it easy to rent a flat with pets in your city?
Which rules for tenants do you think are fair, and which are not?`),
    ],
  },
  {
    id: 'lib-r-school-podcast', title: 'Our school podcast', level: 'B1', age: 'teens', topic: 'Хобі', color: 'mustard', source: 'murly', focus: ['Reading', 'Grammar'],
    aims: 'Прочитаємо статтю про шкільний подкаст\nПотренуємо читання на деталі у форматі НМТ\nРозрізнимо Present Perfect і Past Simple',
    blocks: [
      tip('Перед читанням: ти слухаєш подкасти? Про що був би подкаст, який зробили б учні твоєї школи?'),
      vocab(`to run (a podcast) = вести (подкаст)
an episode = випуск
to record = записувати
an echo = луна
awful = жахливий
to lend (lent) = позичати комусь (позичив)
to interview = брати інтерв’ю
a former student = колишній учень
shy = сором’язливий
to admit = визнавати, зізнаватися
a stranger = незнайома людина
to get someone involved = залучити когось`),
      t(`A year ago, Yana, Dmytro and Kira had never recorded anything except voice messages. Today they run “Corridor Talk”, a podcast made by students for students, and over four hundred people have listened to their latest episode.

The idea started in the school canteen. “We realised that everyone was talking about the same things: exams, friendships, how to find time for everything,” says Yana. “So we thought: why not record these conversations?”

The beginning wasn’t easy. They recorded their first episode in the gym, and the echo was awful. “We listened to it once and decided never to play it again,” laughs Dmytro. Their computer science teacher lent them a microphone, and they moved to a quiet classroom after lessons.

Since then, they have made twenty-two episodes. They have interviewed the school cook, a former student who now designs video games, and even the head teacher. Each episode is about fifteen minutes long because, as Kira explains, “that’s exactly how long the walk home takes.”

The project has taught them more than technical skills. “I used to be really shy,” Kira admits. “Now I can ask a stranger a question without my voice shaking.” Their next goal? To get students from other schools in the city involved.`),
      ex(
        ['choice', 'Choose the correct answer (A, B or C).', `How did the podcast idea start? {The friends noticed that students discussed the same topics|A teacher asked them to start a podcast|They saw a podcast competition}
What was wrong with the first episode? {The sound was bad because of the echo|It was too long|Nobody wanted to speak}
Who helped them with equipment? {their computer science teacher|the head teacher|the school cook}
Why are the episodes about fifteen minutes long? {That is how long the walk home takes|Teachers asked for short episodes|Longer episodes were boring}
How has the project changed Kira? {She feels more confident with new people|She wants to design video games|She talks less than before}`],
        ['truefalse', 'True or False?', `More than 400 people have listened to the latest episode. = True
The friends still play their first episode to new listeners. = False
Now they record in a quiet classroom. = True
Students from other schools already take part in the podcast. = False`],
        ['gap', 'Present Perfect чи Past Simple? Розкрий дужки.', `They [have made/’ve made] (make) twenty-two episodes since then.
They [recorded] (record) their first episode in the gym.
Their teacher [lent] (lend) them a microphone last autumn.
They [have interviewed/’ve interviewed] (interview) the head teacher.
We [listened] (listen) to it once and decided never to play it again.
[Have you ever recorded] (you / ever / record) a podcast?`],
      ),
      tip('**Present Perfect** (have made, have interviewed) говорить про досвід чи результат до сьогодні, без точного часу; часто з since, ever, already. **Past Simple** (recorded, lent) описує завершену подію в минулому, часто з ago, last, yesterday.'),
      talk(`Do you listen to podcasts? What about?
If you made a podcast, what would it be about?
Who would you interview at your school? Why?
Kira says the project helped her stop being shy. What has helped you feel more confident?`),
    ],
  },
  {
    id: 'lib-r-slow-mornings', title: 'How I changed my mornings', level: 'B1', age: 'adults', topic: 'Звички', color: 'tomato', source: 'murly', focus: ['Reading', 'Grammar'],
    aims: 'Прочитаємо блог про зміну ранкових звичок\nЗнайдемо головну думку і деталі\nПотренуємо used to для минулих звичок',
    blocks: [
      tip('Перед читанням: як минає твій звичайний ранок? Що б ти хотів чи хотіла в ньому змінити?'),
      vocab(`an alarm goes off = будильник дзвонить
to press snooze = відкласти будильник
in a panic = у паніці
annoyed = роздратований
to switch off = вимкнути
to stretch = робити розтяжку
a proper breakfast = повноцінний сніданок
to feel rushed = почуватися в поспіху
to come up = виникати (про проблеми)
patient = терплячий
a morning person = жайворонок`),
      t(`For years my mornings looked the same. My alarm went off at 7:15, I pressed “snooze” three times and then jumped out of bed in a panic. I used to check my emails before I even opened my eyes properly. Breakfast was a coffee drunk standing up, and I usually arrived at work already tired and annoyed.

Last January I decided to try something different. I didn’t change everything at once. I simply moved my alarm clock to the other side of the room. Because I had to get up to switch it off, I stopped pressing “snooze”. That small step gave me an extra twenty minutes.

At first I didn’t know what to do with this time. I tried running, but I hated it. Then I tried stretching for ten minutes and making a proper breakfast, and that worked. I also made one strict rule: no phone until I’m on the bus.

The results surprised me. I don’t feel rushed any more, and I’m much calmer when problems come up at work. My colleagues have even noticed that I’m more patient in morning meetings.

I’m not a morning person now, and I probably never will be. But I’ve learnt that a good day often starts with a slow morning, not a perfect one.`),
      ex(
        ['truefalse', 'True or False?', `The writer used to get up as soon as the alarm went off. = False
Moving the alarm clock helped the writer stop pressing “snooze”. = True
The writer enjoyed running in the morning. = False
Now the writer doesn’t use the phone before getting on the bus. = True
The writer has become a real morning person. = False`],
        ['choice', 'Choose the correct answer.', `Before the change, the writer usually arrived at work {tired and annoyed|calm and relaxed|late and hungry}.
The first thing the writer changed was {the place of the alarm clock|the time of breakfast|the way to work}.
The change gave the writer {an extra twenty minutes|an extra hour|ten more minutes of sleep}.
In the mornings the writer now {stretches and makes breakfast|goes running|checks emails in bed}.
Who noticed a difference in the writer? {colleagues|neighbours|family}`],
        ['gap', 'Used to чи Present Simple? Розкрий дужки.', `I [used to check] (check) my emails in bed.
I [used to press] (press) “snooze” three times.
I [didn’t use to have/did not use to have] (not have) a proper breakfast.
[Did you use to get] (you / get) up early as a child?
Now I [stretch] (stretch) for ten minutes every morning.
These days I [don’t feel/do not feel] (not feel) rushed.`],
      ),
      tip('**Used to + дієслово** описує те, що регулярно було в минулому, а тепер ні: I **used to** check my emails in bed. У запереченні та питанні пишемо **use to** без d: I **didn’t use to** have breakfast. **Did** you **use to** get up early?'),
      talk(`What does your typical morning look like?
What did you use to do in the mornings that you don’t do now?
Do you check your phone as soon as you wake up? Why or why not?
Do you agree that a good day starts with a slow morning? Why?
What small change could make your mornings better?`),
    ],
  },
  {
    id: 'lib-r-repair-culture', title: 'Fix it, don’t throw it away', level: 'B2', age: 'adults', topic: 'Екологія', color: 'tomato', source: 'murly', focus: ['Reading', 'Speaking'],
    aims: 'Прочитаємо колонку з думкою автора про ремонт речей\nВідстежимо аргументи «за» і контраргументи\nПотренуємо слова-зв’язки: although, whereas, nevertheless, admittedly',
    blocks: [
      tip('Перед читанням: що ти робиш, коли ламається чайник, телефон чи куртка? Лагодиш чи купуєш нове?'),
      vocab(`a tin = бляшанка, металева коробочка
a kettle = чайник
to crack = тріснути
electronic waste = електронні відходи
a device = пристрій
rare materials = рідкісні матеріали
a spare part = запчастина
admittedly = щоправда, слід визнати
energy-efficient = енергоощадний
a manufacturer = виробник
to value = цінувати
reasonable = помірний (про ціну)
nevertheless = проте, однак`),
      t(`**Why we should learn to repair things again**

My grandmother kept a small tin full of buttons, needles and odd screws. Whenever something broke, she would sit down at the kitchen table and fix it. Today, most of us do the opposite: when a kettle stops working or a phone screen cracks, we simply buy a new one. I believe this habit is costing us far more than we realise.

The most obvious cost is environmental. Electronic waste is one of the fastest-growing types of rubbish in the world, and only a small part of it is properly recycled. Every device we throw away took energy, water and rare materials to produce. Repairing it, by contrast, often requires little more than a spare part and an hour of patience.

Admittedly, repair is not always easy. Many products are designed in a way that makes them difficult to open, and spare parts can be surprisingly expensive. Some people also argue that newer models are more energy-efficient, so replacing an old fridge may actually be the greener choice. That is a fair point, although it applies to far fewer products than manufacturers would like us to think.

There is also a less obvious benefit. When you repair something yourself, you understand how it works, and you start to value it differently. Repair cafés, where volunteers help neighbours fix lamps, bikes and clothes for free, have appeared in many cities, and they are as much about community as about saving money.

Nevertheless, individual effort has its limits. Governments should require companies to make products that last longer and to sell spare parts at reasonable prices. Until that happens, though, the simplest thing we can do is pause before we throw something away and ask: could this be fixed?`),
      ex(
        ['choice', 'Choose the correct answer (A, B or C).', `What is the writer’s main opinion? {People should repair things more often|Old products are always better than new ones|Recycling solves the problem of waste}
Why does the writer mention their grandmother? {To show that repairing things used to be normal|To explain how to sew on a button|To complain about old-fashioned habits}
What makes repair difficult, according to the text? {Products that are hard to open and expensive spare parts|There are not enough repair cafés|Most people have no free time}
How does the writer respond to the argument about energy-efficient models? {It is true, but only for some products|It is completely wrong|Everyone should replace their old fridges}
What does the writer think governments should do? {Make companies produce longer-lasting goods|Open repair cafés in every city|Stop people from throwing devices away}`],
        ['match', 'Match the words from the text with their meanings.', `a spare part = a piece that replaces a broken part of a machine
to crack = to break so that thin lines appear
energy-efficient = using little power to work well
admittedly = used when you accept that something is true
reasonable = fair and not too high
to last = to continue working for a long time`],
        ['gap', 'Встав слово: although, whereas, nevertheless, by contrast, admittedly.', `Buying a new phone takes five minutes, [whereas] repairing it takes patience.
[Although] spare parts can be expensive, repair is often cheaper in the end.
New devices need rare materials. A repair, [by contrast], needs only a spare part.
[Admittedly], some old fridges use too much energy.
Individual effort matters. [Nevertheless], governments must act too.`],
      ),
      tip('Автор визнає аргумент опонентів (**Admittedly**, ... **That is a fair point, although** ...) і одразу відповідає на нього. Це типовий прийом у тексті з думкою: так аргументація звучить чесніше і переконливіше.'),
      talk(`What was the last thing you repaired? What was the last thing you threw away instead?
Would you go to a repair café? What would you bring?
Should companies be forced to sell spare parts? Why or why not?
The writer says repair is “as much about community as about saving money”. Do you agree?
Which is more important: individual habits or laws for companies?`),
    ],
  },
];
