// Бібліотека, пакет 4: розширені 60-хвилинні уроки для дорослих (A2-C1).
// Тексти, діалоги і вправи власні. Відео тільки ті, що вже були в уроках.
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, video, vocab, ex, talk } = makeHelpers('b4');

export const BATCH_4: Plan[] = [
  // ---------- Small talk at work (B1) ----------
  {
    id: 'lib-small-talk-work', title: 'Small talk at work', level: 'B1', age: 'adults', topic: 'Робота', color: 'sky', source: 'murly',
    focus: ['Speaking', 'Listening', 'Vocabulary', 'Grammar'],
    aims: 'Вивчимо фрази, щоб почати, підтримати й завершити розмову з колегою\nПослухаємо розмову двох колег на офісній кухні\nПотренуємо питання в Past Simple і Present Perfect для small talk\nРозіграємо розмову з новим колегою',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      t('Small talk is a short, friendly conversation about safe topics: the weather, the weekend, travel or plans. It helps people feel relaxed before a meeting and makes a new team feel less like strangers.'),
      talk(`Who do you usually talk to at work or at your place of study before the day starts?
Do you enjoy small talk, or do you find it awkward? Why?`),
      ex(['sort', 'Safe or risky? Put the topics into the right group.', `Safe topics: the weather; weekend plans; travel; food and cafés; sport
Risky topics: salary; politics; religion; someone’s weight; personal problems`]),
      note('Почніть з 2 питань у парах (2 хв), потім швидко сортування (2-3 хв). Не виправляйте помилки під час розмови, лише запишіть 2-3 типові і поверніться до них на етапі Language focus. Запитайте, чи «ризиковані» теми однакові в Україні і в інших країнах.'),

      h('Vocabulary · 10 хв'),
      vocab(`How’s it going? = Як справи?
Did you have a good weekend? = Як минули вихідні?
Any plans for the holidays? = Є плани на свята?
It was nice talking to you. = Приємно було поговорити.
to catch up = поспілкуватися, наздогнати новини
to break the ice = розрядити атмосферу, почати розмову
a colleague = колега
a safe topic = безпечна тема
to keep the conversation going = підтримувати розмову
Sounds great! = Звучить чудово!
I’d better get going. = Мені вже час іти.
by the way = до речі`),
      ex(
        ['match', 'Match the phrases with their meanings.', `to break the ice = to start a conversation in a relaxed way
to catch up = to talk about what has happened since you last met
a safe topic = something everyone can talk about without problems
I’d better get going. = a polite way to end a conversation
by the way = a phrase to introduce a new topic`],
        ['choice', 'Обери найбільш природну відповідь.', `How’s it going? {Pretty good, thanks. And you?|Yes.|I am going.}
Did you have a good weekend? {Yes, I visited my parents. How was yours?|Weekend is good.|I have.}
Any plans for the holidays? {We’re going to the mountains. What about you?|Yes, I plan.|Holidays are plans.}
Sorry, I’d better get going. {Sure, see you later!|No, you don’t.|Going where?}`],
      ),
      note('Прочитайте фрази вголос з природною інтонацією (How’s it GOing?). Учні повторюють хором або по черзі. Вправи 5-6 хв, перевірка разом. Якщо учень відповідає одним словом, попросіть «додати деталь і повернути питання».'),

      h('Listening · 15 хв'),
      t('**Before you listen:** Olha has just started a new job. On Monday morning she meets a colleague in the office kitchen. What do you think they will talk about?'),
      audio('Monday morning in the office kitchen', `
Mark: Morning! I don’t think we’ve met. I’m Mark, from the sales team.
Olha: Hi Mark, nice to meet you. I’m Olha. I started in marketing last week.
Mark: Oh, welcome! How’s it going so far?
Olha: Pretty well, thanks. Everyone is very friendly. It’s a bit busy, though.
Mark: Yes, Mondays are always crazy here. Did you have a good weekend?
Olha: Yes, lovely, thanks. I went cycling by the river with my sister. How about you?
Mark: Nothing special. I watched football and cooked a big dinner for some friends.
Olha: Sounds nice. What did you cook?
Mark: A Thai curry. It was a bit too spicy, but everyone ate it!
Olha: Ha, that’s the main thing. By the way, is the coffee machine always this slow?
Mark: Always. That’s why we have the best conversations here.
Olha: Good to know. Any plans for the summer holidays?
Mark: We’re thinking about Portugal. Have you ever been there?
Olha: No, never, but I’d love to go. Oh, my meeting starts in two minutes. I’d better get going.
Mark: Sure. It was nice talking to you. Let’s catch up at lunch sometime.
Olha: Great idea. See you later!`),
      ex(['choice', 'Gist: listen once and choose the answer.', `Where are Olha and Mark? {In the office kitchen|In a restaurant|In a meeting room}
Why does the conversation end? {Olha has a meeting|Mark is angry|The coffee machine breaks}`]),
      ex(['truefalse', 'Detail: listen again. True or False?', `Olha started working in marketing last week. = True
Mark works in the marketing team. = False
Olha went cycling with her sister at the weekend. = True
Mark cooked a Thai curry for his family. = False
Mark is thinking about a holiday in Portugal. = True`]),
      note('Перше прослуховування на загальне розуміння (gist), друге на деталі. Після перевірки попросіть знайти в діалозі 3 способи повернути питання (How about you? / Have you ever…? / What did you cook?) і 1 спосіб завершити розмову. Загалом 12-15 хв.'),

      h('Language focus · 10 хв'),
      tip('Відповідай не одним словом, а коротким реченням і поверни питання: **Not bad, thanks. I went hiking. How about you?** Про минулі вихідні питаємо в Past Simple: **Did you have…? / What did you do? / How was…?** Про досвід взагалі в Present Perfect: **Have you ever been to…?**'),
      ex(['gap', 'Complete the questions and phrases.', `[Did] you have a good weekend?
How [was] your holiday?
What [did] you do on Saturday?
[Have] you ever been to Portugal?
It was nice [talking] to you.
Let’s [catch] up after the meeting.`]),
      ex(['translate', 'Переклади англійською.', `Як минули вихідні? = Did you have a good weekend? / How was your weekend?
Приємно було поговорити = It was nice talking to you / It was nice to talk to you / Nice talking to you
Мені вже час іти = I’d better get going / I’d better go / I have to go
Є плани на свята? = Any plans for the holidays? / Do you have any plans for the holidays?`]),
      note('Нагадайте різницю: конкретний час у минулому (weekend, Saturday) = Past Simple; досвід без часу = Present Perfect. Типова помилка українців: «How was your weekend? - Was good.» Виправляйте одразу: It was good. Вправи 6-7 хв, перевірка вголос.'),

      h('Speaking · 12 хв'),
      t(`**Card A: the new colleague.** You started at the company two weeks ago. You meet a colleague by the coffee machine. Introduce yourself, ask about their weekend and one more safe topic. Then end the conversation politely.

**Card B: the experienced colleague.** You have worked here for three years. Welcome the new colleague, answer with full sentences and ask questions back. Recommend a good place for lunch near the office.`),
      talk(`Role play: use your cards. Speak for 2-3 minutes, then swap roles.
Which topics are not good for small talk? Are they the same in Ukraine and in the UK or the USA?
Is small talk a waste of time or an important work skill? Why?`),
      ex(['voice', 'Record a 1-minute answer.', 'A colleague asks you: "Did you have a good weekend?" Answer with two or three details and ask two questions back.']),
      note('Рольова гра в парах 2-3 хв на роль, потім обмін. В індивідуальному уроці вчитель грає роль B. Слухайте, чи учень повертає питання і чи завершує розмову ввічливо. Після гри дайте 2 сильні фрази і 2 виправлення. Voice можна дати вдома, якщо бракує часу.'),

      h('Wrap-up · 8 хв'),
      ex(['open', 'Writing: 40-60 words.', `Write a short chat message to a colleague you met today. Say it was nice talking, mention one thing you talked about and suggest catching up at lunch.
What three questions will you use next time you meet someone new at work?`]),
      note('Учні пишуть 5 хв, 1-2 читають уголос. Домашнє завдання: записати voice-відповідь (якщо не встигли), а наступного робочого дня спробувати small talk з колегою англійською або українською і принести 1 фразу, яка спрацювала.'),
    ],
  },

  // ---------- Stress: friend or enemy? (B2) ----------
  {
    id: 'lib-stress-friend', title: 'Stress: friend or enemy?', level: 'B2', age: 'adults', topic: 'Психологія', color: 'sky', source: 'murly',
    focus: ['Listening', 'Vocabulary', 'Speaking', 'Writing'],
    aims: 'Обговоримо, як ми реагуємо на стрес\nПодивимось TED talk і перевіримо розуміння\nВивчимо лексику про емоції і здоров’я, дієслова з прийменниками\nПосперечаємось і висловимо думку, погоджуючись і не погоджуючись',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What makes you stressed?
Is stress always bad? Can it help you sometimes?`),
      ex(['scale', 'How much do you agree?', `Stress at work is unavoidable.
A little stress helps me do my best work.
I know how to switch off after a stressful day.`]),
      note('Короткий старт: 2 питання усно, потім шкала думки (не оцінюється). Попросіть пояснити одну відповідь зі шкали. Не заглиблюйтеся в особисті історії, якщо учень не хоче: тема чутлива, давайте право відповідати загально.'),

      h('Vocabulary · 10 хв'),
      vocab(`to cope with = справлятися з
a heart rate = пульс
harmful = шкідливий
to reach out = звертатися по підтримку
resilience = стійкість
to perceive = сприймати
anxious = тривожний
to be under pressure = бути під тиском
to burn out = вигоріти
a coping strategy = спосіб упоратися (зі стресом)
to take a toll on = негативно позначатися на
overwhelmed = перевантажений, пригнічений`),
      ex(
        ['match', 'Match the words with their meanings.', `harmful = causing damage
to cope with = to deal successfully with a problem
anxious = worried and nervous
resilience = the ability to recover from difficulties
overwhelmed = feeling there is too much to deal with
to take a toll on = to have a bad effect on something over time`],
        ['gap', 'Complete the sentences with words from the list.', `After three weeks of overtime, I felt completely [overwhelmed].
Long hours without breaks can take a [toll] on your health.
If you feel lonely, don’t be afraid to reach [out] to friends.
Going for a run is my favourite coping [strategy].`],
      ),
      note('Пройдіться по словах, звертаючи увагу на вимову resilience /rɪˈzɪliəns/ і perceive. Вправи 5-6 хв. Попросіть учня скласти одне власне речення з to take a toll on і to burn out.'),

      h('Video · 15 хв'),
      t('**Before you watch:** the speaker is a health psychologist. She once told people that stress makes them sick. Then she changed her mind. Why do you think that happened?'),
      video('https://www.youtube.com/watch?v=RcGyVTAoXEU', 'Подивись talk (14 хв, можна з субтитрами). Яка головна ідея спікерки?', 'TED: Kelly McGonigal, How to make stress your friend'),
      ex(['choice', 'Gist: choose the main idea.', 'The main message of the talk is that {the way we think about stress changes its effect on us|we should avoid stress at all costs|stress is only a problem for older people}.']),
      ex(['truefalse', 'Detail: True or False?', `The speaker says stress is always bad for your health. = False
The way you think about stress can change how it affects you. = True
In the study she describes, believing that stress is harmful was linked to a higher risk of dying. = True
The speaker describes a pounding heart as a sign that your body is getting ready for a challenge. = True
The speaker suggests that reaching out to others can help under stress. = True`]),
      note('Якщо часу мало, подивіться перші 6-7 хвилин: там основне дослідження і ключова ідея. Решту можна дати додому. Спершу gist-питання, потім деталі. Обговоріть, чи погоджуються учні з ідеєю, але коротко: дискусія буде на етапі Speaking.'),

      h('Language focus · 10 хв'),
      audio('Two colleagues discuss the talk', `
Ira: Did you watch that TED talk about stress? I couldn’t stop thinking about it.
Tom: I did. To be honest, I’m not so sure about it. Stress nearly made me burn out two years ago.
Ira: I see what you mean, but she doesn’t say stress is harmless. She says the way we perceive it matters.
Tom: That’s a fair point. When I thought my racing heart was a disaster, I panicked even more.
Ira: Exactly. And the part about reaching out to people? I couldn’t agree more.
Tom: True. Although I’d say companies also need to reduce the pressure, not just change how we think.
Ira: Good point. Nobody can cope with everything on their own.`),
      tip('Погоджуємося: **I couldn’t agree more. / That’s exactly what I think. / Good point.** Не погоджуємося м’яко: **I’m not so sure about that. / I see what you mean, but… / That’s not always true.** Дієслова з прийменниками: **cope with, reach out to, suffer from, worry about, take a toll on**.'),
      ex(
        ['sort', 'Which phrases are for agreeing and which are for disagreeing?', `Agreeing: That’s exactly what I think.; I couldn’t agree more.; Good point.
Disagreeing: I’m not so sure about that.; I see it differently.; That’s not always true.`],
        ['gap', 'Complete with the right preposition.', `How do you cope [with] pressure at work?
Too much overtime can take a toll [on] your sleep.
Don’t be afraid to reach [out] to a friend when you feel anxious.
She has been suffering [from] headaches since the new project started.
I try not to worry [about] things I can’t control.`],
        ['translate', 'Переклади англійською.', `Я не впевнений щодо цього = I’m not so sure about that / I’m not sure about that
Повністю з тобою згоден = I couldn’t agree more / I could not agree more / I completely agree
Як ти справляєшся зі стресом? = How do you cope with stress? / How do you deal with stress?`],
      ),
      note('Прослухайте короткий діалог і попросіть знайти фрази згоди й незгоди. Потім вправи 6-7 хв. Типова помилка: «cope the stress» без with і «worry for». Виправляйте одразу і просіть повторити речення повністю.'),

      h('Speaking · 12 хв'),
      t(`**Card A: the team member.** For the last month you have worked more than 50 hours a week and you feel overwhelmed. Explain the problem to your manager calmly and suggest two changes that would help.

**Card B: the manager.** The deadline is important, but you don’t want to lose a good employee. Listen, show that you understand, offer one solution and negotiate.`),
      talk(`Role play: use your cards (3 minutes), then swap roles.
Do you agree that stress can be "your friend"? Use phrases from the lesson.
What do you usually do to cope with stress at work?
How can companies help their employees feel less anxious?`),
      note('Рольова гра 6 хв (обидві ролі), дискусія 5-6 хв. Вимагайте хоча б 2 фрази згоди/незгоди. Записуйте помилки з прийменниками і розберіть їх наприкінці етапу (1 хв).'),

      h('Writing · 8 хв'),
      ex(['open', 'Writing: 100-120 words.', 'Write a short opinion post: "Stress is not the enemy". Agree or disagree and give examples from your life.']),
      note('На уроці учень складає план (теза, 2 аргументи, висновок) і пише вступ, решту дописує вдома. Домашнє завдання: дописати пост і додивитися talk до кінця, виписавши 3 нові вирази.'),
    ],
  },

  // ---------- At the café (A2) ----------
  {
    id: 'lib-cafe-order', title: 'At the café', level: 'A2', age: 'adults', topic: 'Кафе і подорожі', color: 'lime', source: 'murly',
    focus: ['Speaking', 'Vocabulary', 'Listening', 'Grammar'],
    aims: 'Вивчимо фрази для замовлення в кафе\nПослухаємо діалог в кафе і розберемо, що каже офіціант, а що клієнт\nПотренуємо Can I have / Could I have / I’d like і some / any\nРозіграємо діалог',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`Do you often go to cafés? What do you usually order?
What is your favourite café in your town? Why do you like it?
Have you ever ordered food in English? How did it go?`),
      note('Легкий старт, 3-4 хв. Якщо учень відповідає українською назвою страви, допоможіть з англійською і запишіть слово на дошці. Не виправляйте граматику на цьому етапі.'),

      h('Vocabulary · 10 хв'),
      vocab(`a menu = меню
to order = замовляти
a bill = рахунок
a table for two = столик на двох
still / sparkling water = вода без газу / з газом
to eat in = їсти на місці
to take away = з собою
a tip = чайові
a waiter / a waitress = офіціант / офіціантка
a slice of cake = шматок торта
to pay by card = платити карткою
a receipt = чек`),
      ex(
        ['match', 'Match the words with their meanings.', `a bill = the paper that shows how much you must pay
a tip = extra money for the waiter
take away = you eat or drink it outside the café
sparkling water = water with bubbles
a receipt = a paper you get after you pay`],
        ['gap', 'Complete the phrases.', `Can I pay by [card]?
A table for [two], please.
Is that eat in or take [away]?`],
      ),
      note('Покажіть слова, вимовте bill, receipt /rɪˈsiːt/ (p не читається). Вправи 5 хв. Попросіть учня назвати, що він замовив би зараз, використовуючи 2-3 нові слова.'),

      h('Listening · 15 хв'),
      t('**Before you listen:** Anna and Ben are in a café in London. What do you think they will order?'),
      audio('Lunch in a London café', `
Waiter: Good afternoon! A table for two?
Anna: Yes, please. Can we sit by the window?
Waiter: Of course. Here are your menus. Can I get you anything to drink?
Ben: Could I have a sparkling water, please?
Anna: And a cappuccino for me, please.
Waiter: Small or large?
Anna: Large, please.
Waiter: Are you ready to order some food?
Anna: Yes, can I have a cheese sandwich, please?
Ben: I’d like the tomato soup. Does it come with bread?
Waiter: Yes, it does. Anything else?
Ben: Do you have any chocolate cake?
Waiter: Sorry, we don’t have any chocolate cake today. We have some apple pie.
Ben: OK, a slice of apple pie, then.
Waiter: Great. Is that eat in or take away?
Anna: Eat in, please.
Anna: Excuse me, could we have the bill, please?
Waiter: Sure. That’s twenty-one pounds fifty.
Ben: Can I pay by card?
Waiter: Yes, of course. Would you like a receipt?
Ben: Yes, please. Thank you, everything was delicious.`),
      ex(['choice', 'Gist: listen once and choose.', `Anna and Ben are {in a café|at home|in a supermarket}.
At the end, they {pay and leave|order more food|book a table for tomorrow}.`]),
      ex(
        ['truefalse', 'Detail: listen again. True or False?', `Anna and Ben sit by the window. = True
Ben orders still water. = False
Anna has a large cappuccino. = True
The café has chocolate cake today. = False
Ben pays by card. = True`],
        ['sort', 'Who says it: the waiter or the customer?', `Waiter: Are you ready to order?; Eat in or take away?; Anything else?
Customer: Can I have a cappuccino, please?; Could I have the bill, please?; A table for two, please.`],
      ),
      note('Перше прослуховування: лише gist. Друге: True/False. Потім сортування фраз. Можна попросити учня прочитати діалог за ролями з вчителем, щоб відпрацювати інтонацію ввічливих прохань. Загалом 13-15 хв.'),

      h('Language focus · 10 хв'),
      tip('Ввічливо замовляємо: **Can I have…? / Could I have…? / I’d like…** (Could звучить найввічливіше). Не кажи «I want» чи «Give me»: це звучить грубо. **some** у ствердженнях і проханнях (Can I have some water?), **any** у запереченнях і питаннях (We don’t have any cake. Do you have any tea?).'),
      ex(
        ['choice', 'Choose the polite or correct option.', `{Can I have|I want|Give me} a tea, please?
{Could I have|Bring} the bill, please?
I’d {like|liking|likes} a glass of orange juice, please.
Do you have {any|some|a} vegetarian dishes?
We’d like {some|any|a} water, please.`],
        ['gap', 'Complete with some or any.', `Is there [any] milk in this coffee?
Can I have [some] sugar, please?
Sorry, we don’t have [any] soup today.
Would you like [some] bread with your soup?`],
      ),
      ex(['translate', 'Переклади англійською.', `Можна мені воду без газу? = Can I have still water? / Could I have still water? / Can I have some still water? / Could I have some still water?
Рахунок, будь ласка = The bill, please / Could I have the bill, please? / Can I have the bill, please?
Столик на двох, будь ласка = A table for two, please
Можна заплатити карткою? = Can I pay by card? / Could I pay by card?`]),
      note('Поясніть правило на прикладах з діалогу. Зверніть увагу: в проханнях і пропозиціях (Would you like some…?) ставимо some, хоча це питання. Вправи 6-7 хв. Помилку «I want» виправляйте м’яко: «Звучить різко, спробуй Could I have…».'),

      h('Speaking · 12 хв'),
      t(`**Murly Café menu**

Drinks: espresso £2.20, cappuccino £3.10, tea £2.50, orange juice £3.00, still or sparkling water £1.80

Food: cheese sandwich £5.50, tomato soup with bread £6.00, chicken salad £7.40, apple pie £3.90, chocolate muffin £2.80

**Card A: the customer.** You are hungry but you don’t eat meat. Ask for a table, order a drink and something to eat, ask one question about the menu, then ask for the bill and pay by card.

**Card B: the waiter.** Greet the customer, take the order and ask "Eat in or take away?". The orange juice is finished today, so offer something else.`),
      talk(`Role play: use the menu and your cards. Then swap roles.
What do you usually order in a café?
Do people leave a tip in cafés in Ukraine? How much?`),
      ex(['voice', 'Record your answer.', 'You are in a café. Order a drink and something to eat for you and a friend, and ask how much it is.']),
      note('Рольова гра 2 рази по 3 хв. Учень-клієнт має отримати «проблему» (немає апельсинового соку) і відреагувати. Відзначте 2 вдалі фрази і 2 виправлення. Voice можна перенести в домашнє завдання.'),

      h('Wrap-up · 8 хв'),
      ex(['open', 'Writing: 6-8 lines.', `Write a short dialogue between a waiter and a customer in your favourite café. Use Could I have…?, some/any and ask for the bill.`]),
      note('Учні пишуть 5 хв, потім читають з учителем за ролями. Домашнє завдання: дописати діалог, записати voice-відповідь і знайти меню будь-якого англомовного кафе онлайн, виписати 5 нових слів.'),
    ],
  },

  // ---------- Working from home: freedom or trap? (B2) ----------
  {
    id: 'lib-remote-work', title: 'Working from home: freedom or trap?', level: 'B2', age: 'adults', topic: 'Робота', color: 'sky', source: 'murly',
    focus: ['Listening', 'Vocabulary', 'Speaking', 'Writing'],
    aims: 'Послухаємо дискусію двох колег про віддалену роботу\nВивчимо фрази для обговорення переваг і недоліків\nПотренуємо I’d rather, I’d prefer і prefer… to…\nДомовимося з керівником про гібридний графік і напишемо лист',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`Do you work (or study) from home? How often?
What is the hardest thing about working from home?`),
      ex(['scale', 'How much do you agree?', `I am more productive at home than in the office.
Working from home makes people lonely.
Companies should let employees choose where they work.`]),
      note('2 питання усно і шкала (не оцінюється). Попросіть учня пояснити одну крайню відповідь. Час 4-5 хв. Помилки записуйте, але не виправляйте.'),

      h('Vocabulary · 10 хв'),
      vocab(`to commute = їздити на роботу
a commute = дорога на роботу
flexible hours = гнучкий графік
to be distracted = відволікатися
isolated = ізольований, самотній
to switch off = відключитися (від роботи)
a work-life balance = баланс роботи й життя
productivity = продуктивність
face-to-face = наживо, особисто
a hybrid schedule = гібридний графік
a downside = недолік
to set boundaries = встановлювати межі`),
      ex(
        ['match', 'Match the words with their meanings.', `flexible hours = you can choose when you start and finish
isolated = feeling alone and cut off from other people
to switch off = to stop thinking about work
productivity = how much work you get done
face-to-face = in person, not online`],
        ['choice', 'Choose the right word.', `I’m easily {distracted|isolated|flexible} at home because my kids are always around.
My {commute|commuting|commuter} takes an hour each way.
After work I need to {switch off|switch on|turn up} completely.
Our company has a {hybrid|mixed-up|half} schedule: two days in the office, three at home.`],
      ),
      note('Розберіть різницю to commute (дієслово) і a commute (іменник). Вправи 5-6 хв. Попросіть учня розповісти про свій commute і work-life balance 2-3 реченнями.'),

      h('Listening · 15 хв'),
      t('**Before you listen:** Kate and Daniel work for the same company. One of them loves working from home, the other is not so sure. Who do you think is who?'),
      audio('Two colleagues talk about remote work', `
Kate: So, are you coming back to the office next week, or are you staying at home?
Daniel: Honestly, I’d rather stay at home. I save almost two hours a day on my commute.
Kate: That’s a lot. But don’t you feel isolated? I missed people so much last year.
Daniel: Sometimes, yes. But I have flexible hours, so I can go to the gym at lunchtime and see friends in the evening.
Kate: For me the problem is switching off. When my laptop is on the kitchen table, I keep checking emails until ten at night.
Daniel: That’s fair. I set a strict rule: at six o’clock the laptop goes into a drawer.
Kate: And what about productivity? I’m easily distracted at home.
Daniel: I’m actually more productive. Fewer meetings, fewer interruptions. But I agree that brainstorming works better face-to-face.
Kate: So maybe the answer is a mix. Two days in the office, three at home?
Daniel: That sounds like the best of both worlds.
Kate: I’ll suggest it to our manager. She keeps saying she wants to see us more often.
Daniel: Then let’s give her facts, not feelings. If our results are good, she can’t really complain.
Kate: Good idea. I’ll make a short list of pros and cons before Friday’s meeting.`),
      ex(['choice', 'Gist: listen once and choose.', 'The conversation is mainly about {the pros and cons of working from home|how to find a new job|problems with public transport}.']),
      ex(
        ['truefalse', 'Detail: listen again. True or False?', `Daniel saves about two hours a day by working from home. = True
Kate felt lonely when she worked from home. = True
Daniel works until ten at night. = False
Both of them think a mix of office and home could work. = True
Kate is going to talk to their manager about a mixed schedule. = True
Daniel thinks they should focus on how they feel. = False`],
        ['sort', 'Advantages or disadvantages of working from home?', `Advantages: no commute; flexible hours; fewer interruptions
Disadvantages: feeling isolated; difficulty switching off; getting distracted`],
      ),
      note('Перше прослуховування на gist, друге на деталі. Зверніть увагу: до десятої вечора працює Kate, а не Daniel, це типова пастка. Після перевірки запитайте: «Чия позиція вам ближча?» (1-2 хв).'),

      h('Language focus · 10 хв'),
      tip('Обговорюємо плюси й мінуси: **The main benefit is… / The downside is… / It depends on… / The best of both worlds.** Перевага: **I’d rather + дієслово без to** (I’d rather stay at home), **I’d rather not…**, **I’d rather A than B**. Також **I’d prefer + to + дієслово** і **I prefer + -ing + to + -ing** (I prefer working at home to commuting).'),
      ex(
        ['gap', 'Complete the sentences.', `I’d [rather] work from home than spend two hours on the train.
The main [downside/disadvantage] is that I feel isolated.
A mix of office and home is the best of both [worlds].
I prefer working at home [to] working in the office.
I’d [prefer] to have a quiet place to work.
I’d rather [not] go back to the office full time.`],
        ['choice', 'Choose the correct form.', `I’d rather {stay|to stay|staying} at home today.
She prefers {working|work|to working} early in the morning.
We’d rather work in the office {than|to|that} at home.`],
      ),
      ex(['translate', 'Переклади англійською.', `Я б краще працював з дому = I’d rather work from home / I would rather work from home / I’d prefer to work from home
Головний недолік у тому, що я почуваюся ізольованим = The main downside is that I feel isolated / The main disadvantage is that I feel isolated
Це найкраще з двох світів = It’s the best of both worlds / It is the best of both worlds`]),
      note('Типові помилки: «I’d rather to stay» і «I prefer work at home than…». Виправляйте одразу і просіть повторити. Вправи 6-7 хв, перевірка вголос з поясненням.'),

      h('Speaking · 12 хв'),
      t(`**Card A: the employee.** You want to work from home three days a week. Explain the benefits for you and for the company, mention one possible downside and how you will solve it.

**Card B: the manager.** You are worried about team spirit and communication. Ask difficult questions, but be open to a compromise. Agree only if the employee offers a clear plan.`),
      talk(`Role play: use your cards (3-4 minutes), then swap roles.
Which jobs can never be done from home?
Will offices still exist in twenty years? Why or why not?`),
      ex(['voice', 'Speaking: record a 1-minute answer.', `Would you rather work from home or in an office? Give at least two reasons and mention one downside.`]),
      note('Рольова гра з переговорами: керівник має не погодитися одразу. Вимагайте фрази з Language focus. 7-8 хв на гру, 3-4 хв на питання. Voice можна перенести в домашнє завдання.'),

      h('Writing · 8 хв'),
      ex(['open', 'Writing: 120-150 words.', 'Write an email to your manager asking for a hybrid schedule. Explain why, suggest which days you will be in the office and how you will stay in touch with the team.']),
      note('На уроці учень пише план і перший абзац листа (5-6 хв), решту вдома. Нагадайте структуру: мета, аргументи, пропозиція, ввічливе завершення. Домашнє завдання: дописати лист і записати voice-відповідь, якщо не встигли.'),
    ],
  },

  // ---------- Can a machine be creative? (C1) ----------
  {
    id: 'lib-ai-creativity', title: 'Can a machine be creative?', level: 'C1', age: 'adults', topic: 'Технології · Мистецтво', color: 'lime', source: 'murly',
    focus: ['Reading', 'Vocabulary', 'Speaking', 'Writing'],
    aims: 'Прочитаємо есе про штучний інтелект і творчість\nВивчимо лексику рівня C1 для дискусій\nПотренуємо обережні формулювання (hedging) і контраргументи\nПроведемо дебати і напишемо аргументований абзац',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What does it mean to be creative?
Have you ever used AI to write, draw or make music? How did you feel about the result?`),
      note('Дайте учням 30 секунд подумати перед відповіддю. На C1 очікуйте розгорнуті відповіді з прикладами. Запишіть 1-2 вдалі вирази і 1-2 неточності для зворотного зв’язку пізніше.'),

      h('Vocabulary · 10 хв'),
      vocab(`to generate = створювати, генерувати
original = оригінальний
to imitate = наслідувати
intent = намір
to blur the line = розмивати межу
to dismiss = відкидати, не сприймати всерйоз
a breakthrough = прорив
arguably = мабуть, можна стверджувати
to raise concerns = викликати занепокоєння
authorship = авторство
derivative = вторинний, неоригінальний
to play it safe = не ризикувати`),
      ex(
        ['match', 'Match the phrases with their meanings.', `to blur the line between = to make the difference between two things less clear
to dismiss something = to decide it is not worth considering
arguably = it can be said, though not everyone agrees
to raise concerns = to make people worried about something
derivative = lacking originality, copied from other work`],
        ['gap', 'Complete the sentences with words from the list.', `Many critics found the film [derivative]: it simply recycled older classics.
The new model is a genuine [breakthrough] in image recognition.
Questions of [authorship] become complicated when software produces the text.
The museum’s decision to show AI paintings has [raised] concerns among local artists.`],
      ),
      note('Зверніть увагу на колокації: raise concerns, blur the line between X and Y, a genuine breakthrough. Вправи 5-6 хв. Попросіть учня використати arguably і derivative у реченні про сучасне кіно чи музику.'),

      h('Reading · 15 хв'),
      t(`When a computer program produces a poem that moves its readers or a painting that wins a competition, it is tempting to call it creative. Yet many artists dismiss such work as clever imitation: the machine has simply learned patterns from millions of human examples and recombined them.

Supporters of AI art point out that human creativity also builds on what came before. No painter works in a vacuum; every writer has read other writers. If creativity means combining existing ideas in surprising ways, then, arguably, machines are already creative.

Critics, however, focus on intent. A human artist chooses to express something: grief, joy, anger, a memory. A program has no experiences to express and no reason to create other than the instruction it was given. From this perspective, the creativity belongs to the person who wrote the prompt, selected the best result and decided what it meant.

There is also the question of risk. Human artists often produce work that fails, offends or confuses, and that willingness to take risks is arguably part of what makes art meaningful. A model designed to give users what they are most likely to approve of may, almost by definition, play it safe.

The debate also raises practical concerns. Who owns a picture generated by AI? Should illustrators be paid when their work is used to train a model? And if anyone can produce a professional-looking image in seconds, what happens to the value of human skill?

Perhaps the most honest answer is that AI is blurring the line between tool and creator. A camera did not end painting; it changed it. Whether AI turns out to be a breakthrough for artists or a threat to them may depend less on the technology itself than on the rules we choose to build around it.`),
      ex(['choice', 'Gist: choose the best title for the essay.', 'The best title is {Tool or creator?|Why AI will replace all artists|How to write better prompts}.']),
      ex(
        ['choice', 'Detail: choose the best answer.', `Critics say AI art is mainly {imitation|original thinking|a new kind of painting}.
For critics, the key difference between humans and machines is {intent|speed|skill}.
The comparison with the camera suggests that new technology {changes art rather than ending it|always destroys old art forms|is not important for artists}.`],
        ['truefalse', 'True or False?', `The writer says that human artists never copy anyone. = False
Supporters think creativity can mean combining existing ideas in new ways. = True
The text raises the question of who owns AI-generated images. = True
The writer suggests that AI models may tend to avoid risk. = True
According to the essay, risk-taking has nothing to do with the value of art. = False`],
      ),
      note('Перше читання 4-5 хв на загальну ідею (обрати заголовок). Друге читання на деталі. Попросіть учня знайти в тексті 3 приклади hedging (arguably, perhaps, may) як підготовку до наступного етапу. Загалом 13-15 хв.'),

      h('Language focus · 10 хв'),
      tip('Hedging, тобто обережні формулювання, звучать переконливіше в дискусії: **It could be argued that… / To some extent… / This may suggest that… / There seems to be… / I’m not entirely convinced that…** Модальні **may / might / could** і дієслова **seem / appear / tend to** пом’якшують категоричні твердження.'),
      ex(
        ['gap', 'Rewrite more cautiously. Complete the gaps.', `AI is creative. → It could be [argued] that AI is creative.
This is true. → To some [extent], this is true.
I don’t believe it. → I’m not entirely [convinced].
AI will replace illustrators. → AI [may/might/could] replace some illustrators.
Everyone agrees. → There [seems/appears] to be broad agreement.`],
        ['choice', 'Choose the correct hedging phrase.', `{It could be argued|It is argue|It argued} that prompts are a form of authorship.
The results are, {to some extent|in some extent|at some extent}, impressive.
There {appears|appear|is appearing} to be a growing demand for human-made art.
This {would seem to suggest|would seems suggest|seem suggesting} that the market is changing.`],
      ),
      ex(['translate', 'Переклади англійською, використовуючи hedging.', `Можна стверджувати, що ШІ розмиває межу між інструментом і творцем = It could be argued that AI is blurring the line between tool and creator / It could be argued that AI blurs the line between tool and creator / Arguably, AI is blurring the line between tool and creator
До певної міри я з цим згоден = To some extent, I agree with this / I agree with this to some extent / To some extent I agree`]),
      note('Поясніть, що hedging не означає слабкість позиції, це академічна і ділова норма. Вправи 6-7 хв. Переклад може мати інші коректні варіанти: зараховуйте їх вручну. Типова помилка: «in some extent» замість to some extent.'),

      h('Debate · 12 хв'),
      t(`**Card A: the illustrator.** Your clients now ask for AI images because they are cheaper. You believe artists deserve protection and payment when their work is used to train models.

**Card B: the tech founder.** Your start-up builds AI tools for designers. You believe AI is just a new tool, like the camera, and that it makes creativity available to everyone.

Use at least three hedging phrases and one counter-argument: **That may be true, but… / I take your point; however…**`),
      ex(['scale', 'Where do you stand?', `AI-generated art should be allowed in art competitions.
Artists should be paid if their work is used to train AI.
In ten years, most illustrations will be made by AI.`]),
      talk(`Debate: use your cards (2 minutes each side, then 2 minutes of free discussion).
Is the person who writes the prompt an artist? Defend your view.
Which creative jobs are most at risk, and which are safe? Why?
Would you read a novel if you knew it was written by AI?`),
      note('Спершу шкала (1-2 хв), потім дебати за картками. В індивідуальному уроці вчитель бере протилежну позицію до справжньої думки учня. Відстежуйте hedging і контраргументи, дайте зворотний зв’язок про 2 найсильніші фрази і 2 неточності.'),

      h('Writing · 8 хв'),
      ex(['open', 'Writing: 150-180 words.', 'Write an essay paragraph: "Creativity is a uniquely human ability." Present one argument for, one against, and your conclusion. Use at least two hedging phrases.']),
      note('На уроці учень пише тезу і перший аргумент (5-6 хв), вдома дописує абзац. Домашнє завдання: абзац 150-180 слів і 5 речень з новою лексикою. Перевіряйте не лише граматику, а й логіку аргументації і різноманітність hedging.'),
    ],
  },

  // ---------- Speak like a native: work idioms (C1) ----------
  {
    id: 'lib-idioms-c1', title: 'Speak like a native: work idioms', level: 'C1', age: 'adults', topic: 'Ідіоми · Робота', color: 'mustard', source: 'murly',
    focus: ['Vocabulary', 'Listening', 'Speaking', 'Writing'],
    aims: 'Вивчимо 12 поширених ідіом про роботу\nПослухаємо робочу нараду і знайдемо ідіоми в контексті\nНавчимося змінювати форму ідіом у реченні і доречно їх вживати\nПотренуємо їх у розмові і в робочому повідомленні',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`Do you use idioms in your own language? Give an example.
Why do you think idioms are hard to learn?`),
      ex(['choice', 'Guess the meaning.', `"Let’s call it a day" probably means {let’s stop working for today|let’s name a holiday|let’s phone someone}.
"The ball is in your court" probably means {it’s your turn to act|you are good at sport|you have lost the game}.`]),
      note('Попросіть учня навести українську ідіому про роботу і пояснити її англійською. Потім 2 питання на здогадку. Не давайте правильних відповідей одразу, нехай учень пояснить логіку.'),

      h('Vocabulary · 10 хв'),
      vocab(`to cut corners = халтурити, економити на якості
to call it a day = закінчити на сьогодні
to be on the same page = однаково розуміти ситуацію
to think outside the box = мислити нестандартно
the ball is in your court = тепер твій хід
to get the ball rolling = почати, запустити процес
to pull your weight = робити свою частину роботи
back to the drawing board = почати все спочатку
a steep learning curve = швидке і складне навчання
to go the extra mile = зробити більше, ніж треба
to be snowed under = бути завваленим роботою
to touch base = коротко зв’язатися, звіритися`),
      ex(
        ['match', 'Match the idioms with their meanings.', `to cut corners = to do something badly to save time or money
to pull your weight = to do your fair share of work
back to the drawing board = to start again after a failure
to go the extra mile = to do more than is expected
to be snowed under = to have far too much work
to touch base = to make brief contact to check progress`],
        ['sort', 'Would you use it to praise or to criticise a colleague?', `Praise: goes the extra mile; thinks outside the box; always pulls their weight
Criticise: cuts corners; doesn’t pull their weight; calls it a day at three o’clock`],
      ),
      note('Розберіть ідіоми, звертаючи увагу на образ (drawing board = креслярська дошка, snowed under = засипаний снігом). Вправи 5-6 хв. Попросіть учня описати колегу (без імен), використавши 2 ідіоми.'),

      h('Listening · 15 хв'),
      t('**Before you listen:** a design team has received bad news from a client. What do you think the manager will say?'),
      audio('A team meeting', `
Manager: Right, let’s get the ball rolling. The client didn’t like our first design.
Olena: So it’s back to the drawing board?
Manager: I’m afraid so. And this time we can’t cut corners. They noticed the small mistakes.
Mark: To be fair, the deadline was crazy. Some of us really went the extra mile.
Manager: I know, and I appreciate it. But we need everyone to pull their weight this time.
Olena: Can we try something completely different? Let’s think outside the box.
Manager: Great. What about our new designer, Sam? Is he settling in?
Mark: He’s doing well, but it’s a steep learning curve for him. And he’s snowed under with the other project.
Manager: Then let’s not overload him. Mark, could you touch base with him on Wednesday?
Mark: Sure, no problem.
Manager: Send me your ideas by Friday. Once we send the new version, the ball is in their court.
Olena: Sounds good. Are we all on the same page?
Manager: I think so. It’s six o’clock, let’s call it a day.`),
      ex(['choice', 'Gist: listen once and choose.', `The team has to {redo the design for the client|plan an office party|hire a new manager}.
At the end of the meeting, the team {agrees on the next steps|argues about the deadline|decides to lose the client}.`]),
      ex(['truefalse', 'Detail: listen again. True or False?', `The client noticed small mistakes in the first design. = True
Mark thinks nobody worked hard on the first version. = False
Sam is finding his new job easy. = False
Mark will check in with Sam on Wednesday. = True
The team must send their ideas by Monday. = False`]),
      note('Перше прослуховування: про що нарада. Друге: деталі. Потім попросіть учня виписати всі ідіоми, які він почув (їх 12), і пояснити 3 з них своїми словами. 13-15 хв.'),

      h('Language focus · 10 хв'),
      tip('Ідіоми живуть у реченні: дієслово змінюється за часом і особою (**He never pulls his weight. / We cut corners last time. / I’ve been snowed under.**), а займенник за контекстом (**the ball is in your / their court**). Не перевантажуй мову ідіомами: одна-дві за розмову звучать природно, п’ять поспіль звучать як підручник.'),
      ex(
        ['choice', 'Choose the right idiom.', `I’m exhausted. Let’s {call it a day|get the ball rolling}.
We sent our offer. Now the ball is in {their court|their box}.
My first month in the new job was a steep learning {curve|line}.
Before we start, let’s make sure we’re all on the same {page|book}.`],
        ['gap', 'Complete with the correct form of the verb.', `Sorry I didn’t reply, I’ve been [snowed] under all week.
He never [pulls] his weight, so the rest of us do his work.
We [cut] corners on the last project and the client noticed.
Let’s [touch] base on Thursday to see where we are.
She always [goes] the extra mile for her clients.`],
      ),
      ex(['translate', 'Переклади англійською, використовуючи ідіоми.', `Тепер твій хід = The ball is in your court / Now the ball is in your court
Давайте на сьогодні закінчимо = Let’s call it a day / Let us call it a day
Нам доведеться почати все спочатку = We’ll have to go back to the drawing board / We will have to go back to the drawing board / It’s back to the drawing board`]),
      note('Наголосіть, що ідіоми не можна перекладати дослівно і змінювати в них іменники (не their box, не learning line). Вправи 6-7 хв. Переклад може мати інші коректні варіанти: зараховуйте їх вручну.'),

      h('Speaking · 12 хв'),
      t(`**Card A: the team lead.** A project is behind schedule. Start the meeting, explain the problem, ask who can help and agree on the next steps. Use at least four idioms.

**Card B: the team member.** You are overloaded with another project and a colleague is not doing their part. Explain your situation honestly, suggest a solution and agree on when to check in.`),
      talk(`Role play: run a 3-minute meeting using your cards, then swap roles.
Have you ever had to go back to the drawing board? What happened?
Is it ever OK to cut corners?
Who in your life always goes the extra mile?`),
      ex(['voice', 'Speaking: record a short story (1 minute).', `Tell a story about a project at work or school that went wrong. Use at least three idioms from the lesson.`]),
      note('Рольова гра 6-7 хв, потім питання. Рахуйте, скільки ідіом учень ужив доречно, і відзначте ті, що прозвучали неприродно. Voice-завдання можна перенести в домашнє.'),

      h('Wrap-up · 8 хв'),
      ex(['open', 'Writing: 80-100 words.', 'Write a message to your team in a work chat after a difficult week. Thank them, explain what happens next and use three idioms naturally.']),
      note('Учні пишуть 5-6 хв, потім вчитель коментує доречність ідіом і тон. Домашнє завдання: дописати повідомлення, записати voice-історію і помітити хоча б 2 ідіоми з уроку в серіалі, подкасті чи робочих листах.'),
    ],
  },
];
