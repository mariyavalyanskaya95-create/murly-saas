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
];
