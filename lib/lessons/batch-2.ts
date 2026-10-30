import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';
const { h, t, tip, note, audio, video, vocab, ex, talk } = makeHelpers('b2');
const X = makeHelpers('b2x');

export const BATCH_2: Plan[] = [
  // ───────────────────────── 1. Cartoon: balloon (kids) ─────────────────────────
  {
    id: 'lib-cartoon-balloon', title: 'Cartoon time: Don’t let it touch the floor!', level: 'A2', age: 'kids', topic: 'Мультики · Ігри', color: 'mustard', source: 'murly',
    focus: ['Vocabulary', 'Listening', 'Grammar', 'Speaking', 'Writing'],
    aims: 'Подивимось серію мультика про гру з повітряною кулькою і зрозуміємо її правила\nВивчимо слова про гру: catch, hit, drop, the floor\nПотренуємо наказовий спосіб: Catch it! Don’t drop it!\nПридумаємо і розкажемо правила своєї гри',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      t('Today we are going to watch a cartoon about a very simple game. You only need one thing to play it. Can you guess what it is?'),
      talk(`What games do you play at home?
Have you ever played with a balloon?
Do you like games with rules? Why?`),
      note('Покажи справжню або намальовану повітряну кульку і запитай: What is it? What colour is it? Діти можуть відповідати коротко. Якщо є кулька, передавайте її по колу: хто тримає кульку, той відповідає на питання. Не виправляй помилки на цьому етапі, головне розговорити дітей. 5 хвилин.'),

      h('Vocabulary · 12 хв'),
      vocab(`a balloon = повітряна кулька
to hit = вдарити
to catch = зловити
to drop = упустити
to fall = падати
to touch = торкатися
the floor = підлога
up high = високо вгору
careful = обережний
a rule = правило
to win = перемогти
the last one = останній`),
      ex(['match', 'З’єднай англійське слово з перекладом.', `to catch = зловити
to drop = упустити
the floor = підлога
a rule = правило
to win = перемогти`]),
      ex(['gap', 'Встав слово: balloon, floor, high, careful.', `I have got a red [balloon].
Hit the balloon up [high]!
The balloon is on the [floor].
Be [careful]! Don’t fall!`]),
      note('Покажи кожне слово рухом (TPR): to hit - легенько б’ємо долонею вгору, to catch - ловимо, to drop - «упускаємо» з рук, to fall - повільно присідаємо, the floor - торкаємось підлоги. Потім гра «Simon says»: Simon says catch! Simon says touch the floor! Хто виконав команду без «Simon says», вибуває на один раунд. 12 хвилин разом із вправами.'),

      h('Watch the cartoon · 15 хв'),
      video('https://www.youtube.com/watch?v=xWyjy7SyirA', 'Подивись серію (7 хв). Яке головне правило гри? Що не можна робити з кулькою?', 'Bluey: Keepy Uppy (офіційний канал Disney Jr.)'),
      note('Перед переглядом дай одне завдання: знайти головне правило гри. Під час перегляду попроси дітей повторювати фрази з мультика разом з героями і показувати руками, коли кулька летить вгору або падає. Питання після відео лише загальні: правило гри, хто грає, що роблять з кулькою. Можна пограти в keepy uppy справжньою кулькою на уроці або в Zoom «уявною» кулькою.'),
      ex(['choice', 'Яке головне правило гри? Обери відповідь.', `The main rule is: {the balloon must not touch the floor|throw the balloon into a box|hide the balloon from Dad}.`]),
      ex(
        ['truefalse', 'True or False? Правда чи ні?', `In the game the balloon must not touch the floor. = True
The children play the game with a ball. = False
The family plays the game together. = True
Everybody wants the balloon to fall down. = False`],
        ['choice', 'Обери правильне слово.', `They play with a {balloon|kite|ball}.
They hit the balloon {up|down}.`],
      ),

      h('Catch it! Don’t drop it! · 10 хв'),
      tip('Коли кажемо комусь, що робити, починаємо з дієслова: **Catch it! Hit it! Run!** А коли не робити, то ставимо **Don’t** на початок: **Don’t drop it! Don’t run!** Слово **please** робить прохання ввічливим: **Please be careful!**'),
      ex(
        ['choice', 'Обери правильний варіант.', `{Catch|Catches|Catching} the balloon!
{Don’t|Not|No} drop it!
Be {careful|carefully}!
Please {don’t touch|not touch|touch not} the floor!`],
        ['gap', 'Встав слово: catch, hit, don’t, be.', `[Don’t/Do not] let the balloon touch the floor.
[Hit] the balloon up high!
[Catch] it before it falls!
[Be] quick!`],
      ),
      ex(['translate', 'Переклади англійською.', `Зловіть кульку! = Catch the balloon!
Не впусти її! = Don’t drop it! / Do not drop it!
Будь обережним! = Be careful!`]),
      note('Після правила зіграй у «Вчитель-робот»: учень дає тобі команди англійською (Hit it! Don’t run! Touch the floor!), а ти виконуєш. Якщо учень каже «No drop it», виконай команду «неправильно» і смішно перепитай: Don’t drop it? Так дитина сама виправляє помилку. 10 хвилин.'),

      h('Speaking · 12 хв'),
      t('Now it is your turn to be a game inventor! Think of a game you can play at home with a balloon, a ball or a pillow. Give your game a funny name.'),
      talk(`What is the name of your game?
What do you need for your game?
Tell your teacher three rules: Do… / Don’t…
Who usually wins games in your family?`),
      ex(['voice', 'Запиши своє аудіо.', `Tell us about your game. Say its name and three rules. For example: Hit the balloon. Don’t let it touch the floor. Don’t run in the kitchen!`]),
      note('Дай дитині 2 хвилини подумати і, якщо треба, намалювати свою гру. Потім учень пояснює правила, а ви разом пробуєте зіграти 1-2 хвилини (у Zoom можна з подушкою або м’якою іграшкою). Ти теж придумай одне «дивне» правило (Don’t laugh!), щоб було весело. Помилки в наказовому способі виправляй через перепитування.'),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['gap', 'Встав слово: catch, drop, touch, hit, careful, rule, win.', `Don’t [drop] the egg! It can break.
[Catch] the ball! It is flying to you!
Don’t [touch] the floor! The floor is lava!
[Hit] the balloon up high!
Be [careful]! The floor is wet.
Our new [rule] is: don’t run!
I want to [win] the game!`],
        ['choice', 'Обери правильний варіант.', `{Don’t|Not|No} run in the kitchen!
{Catch|Catches|Catching} the ball, Mum!
Please {be|is|are} quiet!
{Don’t|Doesn’t|Isn’t} touch the cake!
The balloon is on the {floor|sky}.
{Hit|Hits|Hitting} it up high!`],
        ['translate', 'Переклади англійською.', `Вдар кульку! = Hit the balloon!
Не біжи! = Don’t run! / Do not run!
Торкнись підлоги! = Touch the floor!
Будь обережна! = Be careful!
Не падай! = Don’t fall! / Do not fall!
Злови м’яч! = Catch the ball!`],
      ),
      X.game('Команди для гри', 'Знайди переклад команди.', `Catch it! = Злови!
Hit it! = Вдар!
Don’t drop it! = Не впусти!
Don’t run! = Не біжи!
Be careful! = Будь обережним!
Touch the floor! = Торкнись підлоги!
Hit it up high! = Вдар високо вгору!
Don’t fall! = Не падай!
Please be quiet! = Будь ласка, тихо!`),
      X.note('Ці вправи можна дати наприкінці уроку, якщо лишився час, або як розминку на наступному. Спершу виконуйте усно: дитина читає команду і показує її рухом. Підказки до першої секції: drop - яйце розіб’ється, якщо його впустити; touch the floor - як у грі «Підлога - це лава». У перекладі зараховуються обидві форми: Don’t і Do not. Після гри попроси дитину дати тобі 3 команди з картки, а ти виконуй.'),

      h('Wrap-up · 6 хв'),
      ex(['open', 'Напиши 3 правила своєї гри англійською.', `My game is called… Rule 1: … Rule 2: Don’t… Rule 3: …`]),
      talk(`Which new word do you remember best?
Say one Do and one Don’t for our English lesson.`),
      note('Наприкінці повтори 3-4 слова через жести: ти показуєш рух, учень називає дієслово. Домашнє завдання: зіграти в keepy uppy з родиною і записати голосове повідомлення з трьома правилами (Do… / Don’t…), або намалювати постер «Rules of our game» з підписами англійською.'),
      X.ex(
        ['gap', 'Homework plus. Встав слово: Be, Catch, Don’t, Touch, win, Hit.', `[Be] quick!
[Catch] the balloon before it falls!
[Don’t/Do not] drop your ice cream!
[Touch] your nose!
I always [win] this game!
[Hit] the ball with the racket!`],
        ['choice', 'Обери правильний варіант.', `Please {don’t shout|not shout|no shout}!
{Be|Is|Are} kind to your sister!
The balloon {is|are} blue.
{Don’t|No|Not} eat in the bedroom!
We {play|plays} with a balloon.
{Wash|Washes|Washing} your hands, please!`],
        ['open', 'Напиши відповіді англійською.', `Write three rules for your bedroom: Do… / Don’t…
What game do you play with your family? Write two sentences.
Write two rules for a balloon game.`],
      ),
    ],
  },

  // ───────────────────────── 2. Cartoon: farm (kids) ─────────────────────────
  {
    id: 'lib-cartoon-farm', title: 'Cartoon time: What are the sheep doing?', level: 'A2', age: 'kids', topic: 'Мультики · Ферма', color: 'lime', source: 'murly',
    focus: ['Vocabulary', 'Grammar', 'Speaking', 'Writing'],
    aims: 'Вивчимо слова про ферму і тварин\nПодивимось мультик без слів і самі розкажемо, що відбувається\nПотренуємо Present Continuous: The sheep are running\nОпишемо картинку і зіграємо в гру «Що я роблю?»',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      t('Close your eyes. Imagine a farm. What can you see? What can you hear? Moo! Baa! Oink! Woof!'),
      talk(`Have you ever been to a farm?
What animals live on a farm?
Which farm animal do you like best?`),
      note('Зіграй «Animal sounds»: ти видаєш звук тварини, учень називає її англійською (Baa - a sheep, Oink - a pig, Woof - a dog, Moo - a cow). Потім міняєтесь ролями. Не вимагай повних речень, 5 хвилин на розминку.'),

      h('On the farm · 12 хв'),
      vocab(`a sheep (two sheep) = вівця (дві вівці)
a farmer = фермер
a dog = собака
a pig = свиня
a field = поле
a fence = паркан
a barn = хлів, сарай
to run = бігти
to hide = ховатися
to climb = лізти
to jump = стрибати
to sleep = спати`),
      tip('У множині sheep не змінюється: one sheep, ten sheep. Без -s!'),
      ex(['match', 'З’єднай слово з перекладом.', `a fence = паркан
a field = поле
to hide = ховатися
to climb = лізти
a barn = хлів
to jump = стрибати`]),
      ex(['choice', 'Обери правильний варіант.', `I can see five {sheep|sheeps}.
The farmer has got two {dogs|dog}.
The pig is in the {barn|sky}.`]),
      note('Покажи дієслова рухами (TPR): run - біг на місці, hide - закриваємо обличчя руками, climb - «лізем» руками вгору, jump - стрибок, sleep - долоні під щокою. Ти називаєш дієслово, дитина показує, потім навпаки. Окремо зверни увагу на sheep без -s. 12 хвилин разом із вправами.'),

      h('Watch and describe · 15 хв'),
      video('https://www.youtube.com/watch?v=KtIa3HsLxng', 'У цьому мультику ніхто не говорить, тож говорити будеш ти! Дивимось першу серію (близько 7 хв).', 'Shaun the Sheep (офіційний канал)'),
      note('У відео підбірка з 10 серій, на урок досить першої. Перший раз дивіться 2-3 хвилини без пауз, потім виконайте вправу на загальне розуміння. Далі став на паузу кожні 30-60 секунд і питай: What is the farmer doing? What are the sheep doing? Where is the dog? Учень відповідає реченням у Present Continuous. Питай тільки про те, що видно на екрані. Слова, яких бракує, записуй у словник учня.'),
      ex(['choice', 'Що особливого в цьому мультику? Обери відповідь.', `In this cartoon the characters {don’t speak words|sing all the time|speak Ukrainian}.`]),
      ex(
        ['truefalse', 'True or False? Правда чи ні?', `The main character is a sheep. = True
The cartoon is about life on a farm. = True
The farmer is a little boy. = False
The sheep live in a big city. = False`],
        ['choice', 'Обери правильне слово.', `The farmer’s helper is a {dog|cat|horse}.
The sheep live {on a farm|in a school|at the zoo}.`],
      ),

      h('Present Continuous · 10 хв'),
      tip('Що відбувається зараз: **am / is / are + дієслово з -ing**. The dog **is running**. The sheep **are hiding**. Питання: **Is** the dog **running**? Yes, it is. / No, it isn’t.'),
      ex(
        ['gap', 'Розкрий дужки (Present Continuous).', `The farmer [is sleeping] (sleep).
The sheep [are playing] (play) in the field.
The dog [is running] (run) after the sheep.
I [am watching/’m watching] (watch) a cartoon.
We [are jumping/’re jumping] (jump) over the fence.
The pigs [are sleeping/’re sleeping] (sleep) in the barn.`],
        ['choice', 'Обери правильний варіант.', `Look! The pig {is eating|eat|eats} an apple.
The sheep {are|is} hiding behind the tree.
{Is|Are} the dog sleeping? Yes, it is.
The farmer {isn’t|aren’t} running.`],
      ),
      note('Перед вправою покажи 3-4 стоп-кадри з мультика і разом складіть речення за схемою «хто + is/are + дія-ing». Типова помилка: The dog running (без is). Виправляй жестом: покажи пальцями «пропущене слово» і дай дитині самій додати is. 10 хвилин.'),

      h('Speaking · 12 хв'),
      t('Game time! Your teacher shows an action without words, like in the cartoon. Guess: **What am I doing?** Then it is your turn to act.'),
      talk(`What am I doing? (Guess the action.)
What is your favourite animal from the cartoon? Why?
What are you doing right now?
What is your family doing at home now?`),
      ex(['voice', 'Speaking: постав відео на паузу і запиши, що відбувається.', `Describe one moment from the cartoon. Say three sentences: The farmer is… The sheep are… The dog is…`]),
      note('Гра «Charades»: ти без слів показуєш дію (You are a sheep and you are hiding), дитина вгадує: You are hiding! Потім міняєтесь ролями, і вже ти вгадуєш. Це той самий принцип, що й у мультику без слів. Далі - запис голосом про стоп-кадр. 12 хвилин.'),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['gap', 'Розкрий дужки (Present Continuous).', `The dog [is jumping/’s jumping] (jump) over the fence.
The sheep [are hiding/’re hiding] (hide) behind the barn.
The farmer [is climbing/’s climbing] (climb) a tree.
I [am running/’m running] (run) in the field.
The pig [is sleeping/’s sleeping] (sleep) in the barn.
We [are watching/’re watching] (watch) the sheep.`],
        ['choice', 'Обери правильний варіант.', `Ten {sheep|sheeps} are in the field.
Look! The dog {is running|running|run} to the farmer.
Three sheep {are|is} eating grass.
{Are|Is} the pigs sleeping? Yes, they are.
The cat {isn’t|aren’t} hiding. It is sleeping.
The farmer {is|are} sitting on the fence.`],
        ['match', 'З’єднай дію з перекладом.', `is running = біжить
are hiding = ховаються
is climbing = лізе
are jumping = стрибають
is sleeping = спить
are eating = їдять`],
      ),
      X.game('Тварини на фермі', 'Знайди переклад слова.', `a cow = корова
a horse = кінь
a hen = курка
a duck = качка
a goat = коза
a pig = свиня
a sheep = вівця
a farmer = фермер
a fence = паркан`),
      X.note('Секції можна робити на наступному уроці як розминку. Перед першою секцією нагадай схему: хто + is/are + дія-ing. У match підказка: is - одна тварина або людина, are - кілька (біжить / біжать). У грі є нові слова cow, horse, hen, duck, goat: покажи картинки і зіграй «Animal sounds» (Moo, Neigh, Cluck, Quack, Maa). Після гри дитина складає речення: The cow is sleeping. The ducks are swimming.'),

      h('Wrap-up · 6 хв'),
      ex(['open', 'Напиши 3 речення: що зараз роблять люди або тварини у тебе вдома?', `My mum is… My cat is… I am…`]),
      note('Підсумок: дитина називає 3 нові слова і одне речення у Present Continuous. Домашнє завдання: подивитися ще одну серію Shaun the Sheep, зупинити в будь-якому місці, намалювати цей момент і підписати 3 речення (The sheep are…, The dog is…).'),
      X.ex(
        ['gap', 'Homework plus. Розкрий дужки (Present Continuous).', `My mum [is cooking/’s cooking] (cook) dinner.
My cat [is sleeping/’s sleeping] (sleep) on the sofa.
I [am doing/’m doing] (do) my homework.
My brother [is playing/’s playing] (play) a game.
The birds [are singing/’re singing] (sing).
We [are drawing/’re drawing] (draw) a farm.`],
        ['choice', 'Обери правильний варіант.', `The dog {is|are} playing with a ball.
Two sheep {are|is} running.
{Is|Are} the farmer sleeping? No, he isn’t.
I {am|is|are} jumping.
The pigs {are eating|is eating|eating} apples.
Look! The sheep {are climbing|climbs|climbing} on the barn.`],
        ['open', 'Напиши відповіді англійською.', `Draw a farm. Write three sentences: what are the animals doing?
What is your favourite farm animal? What is it doing in your picture?`],
      ),
    ],
  },

  // ───────────────────────── 3. Social media (teens) ─────────────────────────
  {
    id: 'lib-social-media', title: 'Social media and me', level: 'A2', age: 'teens', topic: 'Соцмережі', color: 'mustard', source: 'murly',
    focus: ['Vocabulary', 'Reading', 'Listening', 'Grammar', 'Speaking', 'Writing'],
    aims: 'Вивчимо слова про соцмережі: post, follow, scroll, screen time\nПрочитаємо і послухаємо історії підлітків про життя онлайн\nПотренуємо прислівники частоти: always, usually, never\nОбговоримо, як безпечно і з користю проводити час у мережі',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`Which apps do you use every day?
What is the first thing you do with your phone in the morning?
Do you think you spend too much time online?`),
      ex(['scale', 'How much do you agree?', `I check my phone more than 20 times a day.
Social media makes me happy.
I can easily live one day without my phone.`]),
      note('Спершу коротке обговорення, потім учень заповнює шкалу. Попроси пояснити одну відповідь: Why do you agree? Не виправляй помилки, просто запиши 2-3 типові для етапу Language focus. 5 хвилин.'),

      h('Vocabulary · 10 хв'),
      vocab(`to post = публікувати
to follow = підписуватися
a follower = підписник
to scroll = гортати стрічку
screen time = час перед екраном
to share = ділитися
a notification = сповіщення
a comment = коментар
to like = вподобати, лайкнути
private = приватний
a profile = профіль
to block = заблокувати`),
      ex(['match', 'Match the words with their meanings.', `a follower = a person who sees your posts every day
to scroll = to move down a page on your screen
a notification = a message from an app about something new
private = only for you or your friends
to block = to stop a person from contacting you`]),
      ex(['gap', 'Complete the sentences: comment, profile, share, like.', `Please [like] my new photo!
She wrote a funny [comment] under my video.
My [profile] is private, so only friends can see it.
Don’t [share] your password with anyone.`]),
      note('Покажи свій (або вигаданий) профіль у соцмережі і назви елементи: profile, post, comment, like, followers. Учень повторює і показує на екрані. Для швидкого повторення: ти кажеш українське слово, учень англійське, на швидкість. 10 хвилин.'),

      h('Reading · 15 хв'),
      t(`**Mia’s screen time challenge**

Mia is fifteen and she lives in Kyiv. She uses TikTok and Instagram every day. She usually posts photos at the weekend, but she never shares her address or her school online. Her profile is private, and she only accepts people she knows.

Last month Mia looked at her screen time and got a shock: it was about three hours a day! She often scrolled TikTok before bed and then couldn’t sleep. She also got more than a hundred notifications every day.

So Mia started a challenge. Now she turns off notifications after 9 p.m. and she always leaves her phone in the kitchen at night. She sometimes still watches videos, but only for 30 minutes after homework. Her screen time is now one and a half hours a day. "I have more time for drawing and for my friends," Mia says. "And I sleep much better!"`),
      ex(['choice', 'What is the text mainly about?', `The text is about {how Mia spends less time on her phone|how to become famous on TikTok|why Mia doesn’t like Instagram}.`]),
      ex(
        ['truefalse', 'True or False?', `Mia’s profile is open to everyone. = False
Mia had about three hours of screen time a day. = True
She often scrolled TikTok before bed. = True
Now Mia sleeps with her phone next to her bed. = False`],
        ['choice', 'Choose the correct answer.', `Mia turns off notifications {after 9 p.m.|in the morning|at school}.
Now her screen time is {one and a half hours|three hours|thirty minutes} a day.`],
      ),
      note('Перший раз учень читає швидко (2 хвилини) і відповідає на питання про головну ідею. Потім читає ще раз для деталей. Після перевірки попроси знайти в тексті всі прислівники частоти (usually, never, often, always, sometimes) і підкреслити їх: це місток до граматики. 15 хвилин.'),

      h('Language focus · 10 хв'),
      tip('Прислівники частоти (always, usually, often, sometimes, never) ставимо **перед основним дієсловом**: She usually posts. Але **після to be**: She is always online. Питання: **How often** do you post?'),
      ex(
        ['choice', 'Choose the correct option.', `She {usually posts|posts usually} photos at the weekend.
Mia {never shares|shares never} her address.
I {am always|always am} online in the evening.
{How often|How much} do you check your phone?`],
        ['gap', 'Complete the sentences: follow, scroll, notification.', `I got a [notification] from my friend.
Do you [follow] any musicians?
I [scroll] TikTok before bed.`],
      ),
      ex(['translate', 'Translate into English.', `Я ніколи не публікую фото = I never post photos / I never post pictures
Вона часто ділиться відео = She often shares videos
Він завжди онлайн увечері = He is always online in the evening / He’s always online in the evening`]),
      note('Поверни помилки з розминки і виправте їх разом. Типова помилка: I post usually. Покажи порядок слів на «лінійці»: хто + прислівник + дієслово. Можна дати учню картки зі словами речення, щоб він склав їх у правильному порядку. 10 хвилин.'),

      h('Listening and speaking · 14 хв'),
      audio('Do you want to try the challenge?', `Max: Hey Sofia, why didn’t you answer my message yesterday?
Sofia: Sorry! I’m trying a new challenge. I never use my phone after nine.
Max: Seriously? I always scroll before bed. It helps me relax.
Sofia: I usually did that too, but then I couldn’t sleep. Now I read a book instead.
Max: And what about your followers? Don’t they miss your posts?
Sofia: I still post, but only at the weekend. My real friends can call me.
Max: Hmm, maybe I can try it. But only for one week!
Sofia: Deal! Let’s compare our screen time next Friday.`),
      ex(['truefalse', 'Listen. True or False?', `Sofia doesn’t use her phone after nine. = True
Max never scrolls before bed. = False
Sofia stopped posting completely. = False
Max agrees to try the challenge for a week. = True`]),
      talk(`Is three hours of screen time a lot? Why?
What should you never share online?
Role-play: you are Max and Sofia one week later. Did the challenge work?
What is one good thing and one bad thing about social media?`),
      note('Аудіо прослухати двічі: спершу без завдання (хто про що говорить), потім із True/False. Далі рольова гра: учень і вчитель - Max і Sofia через тиждень. Учень має вжити мінімум 2 прислівники частоти і 2 нові слова. Виправляй м’яко, повторюючи фразу правильно. 14 хвилин.'),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['gap', 'Встав слово: post, follow, notifications, blocked, profile, share, scroll.', `I usually [post] photos of my cat at the weekend.
Do you [follow] any football players?
Turn off [notifications] at night and sleep better.
Ann [blocked] a stranger who sent her strange messages.
My [profile] is private, so strangers can’t see my photos.
Never [share] your password with anyone.
I sometimes [scroll] TikTok for an hour and forget about my homework.`],
        ['choice', 'Обери правильний варіант.', `I {never post|post never} my phone number online.
She {is usually|usually is} online after school.
They {often share|share often} funny videos.
{How often|How many} do you post photos?
He {always checks|checks always} his notifications in the morning.
We {are never|never are} online during lessons.
Max {hardly ever uses|uses hardly ever} Facebook.`],
        ['translate', 'Переклади англійською.', `Я зазвичай гортаю стрічку ввечері = I usually scroll my feed in the evening / I usually scroll through my feed in the evening / I usually scroll in the evening
Вона ніколи не ділиться своєю адресою = She never shares her address
Мій профіль приватний = My profile is private
Він часто лайкає мої фото = He often likes my photos / He often likes my pictures
Ми завжди вимикаємо сповіщення вночі = We always turn off notifications at night / We always turn notifications off at night / We always switch off notifications at night
Як часто ти публікуєш відео? = How often do you post videos?`],
      ),
      X.game('Як часто?', 'Знайди переклад.', `always = завжди
usually = зазвичай
often = часто
sometimes = іноді
hardly ever = майже ніколи
never = ніколи
How often…? = Як часто…?
screen time = час перед екраном
a follower = підписник`),
      X.note('Секції можна дати наприкінці уроку або як розминку на наступному. Нове тут hardly ever (майже ніколи): воно стоїть там само, де never. Нагадай про to be: She is usually online. У першій секції blocked у минулому часі, бо в реченні є sent. У перекладі «гортаю стрічку» зараховуються scroll, scroll my feed і scroll through my feed. Після гри попроси учня сказати про себе по одному реченню з кожним прислівником.'),

      h('Writing · 6 хв'),
      ex(['open', 'Write a short post (40-50 words) for a school blog.', `My social media rules: How often do you use social media? What do you always or never do online? Use at least three adverbs of frequency.`]),
      note('Якщо часу мало, учень пише лише 3 речення-правила. Домашнє завдання: подивитися свою статистику screen time за тиждень і записати голосове на 1 хвилину: How much time do I spend online? What can I change? Можна запропонувати власний challenge на тиждень, як у Mia.'),
      X.ex(
        ['gap', 'Homework plus. Встав прислівник частоти: always, usually, often, sometimes, never. Подивись на відсотки.', `I [always] (100%) do my homework before I go online.
She [usually] (80%) posts on Saturday.
They [often] (60%) watch videos together.
We [sometimes] (30%) play games online.
He [never] (0%) shares his password.
I am [never] (0%) online after 10 p.m.`],
        ['choice', 'Обери правильний варіант.', `Mia {usually posts|posts usually} at the weekend.
Mia’s profile {is|are} private.
Sofia {never uses|uses never} her phone after nine.
Max {is always|always is} tired in the morning because he scrolls at night.
I got fifty {notifications|profiles} in one hour, so I turned off the sound.
Don’t {share|follow} your home address online.`],
        ['open', 'Напиши відповіді англійською.', `How often do you use social media? Write three sentences with always, usually or never.
What are your three rules for a safe life online?
Do you want to try Mia’s challenge? Why or why not?`],
      ),
    ],
  },

  // ───────────────────────── 4. Travel stories (teens) ─────────────────────────
  {
    id: 'lib-travel-stories', title: 'Travel stories', level: 'B1', age: 'teens', topic: 'Подорожі', color: 'tomato', source: 'murly',
    focus: ['Vocabulary', 'Reading', 'Listening', 'Grammar', 'Speaking', 'Writing'],
    aims: 'Прочитаємо і послухаємо історії про незвичайні пригоди в подорожах\nВивчимо слова для розповіді про поїздку\nПотренуємо Past Simple і Past Continuous: We were walking when we saw a bear\nРозкажемо власну історію з подорожі',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What was the best trip of your life?
Do you prefer the mountains or the sea? Why?
Has anything funny or scary ever happened to you on a trip?`),
      note('Покажи 2-3 фото зі своєї поїздки (або картинки з інтернету) і запропонуй учню вгадати, що сталося. Це налаштовує на тему «історії». Не виправляй граматику на розминці, лише запиши помилки з минулими часами. 5 хвилин.'),

      h('Vocabulary · 10 хв'),
      vocab(`a trip = поїздка
to set off = вирушати
to get lost = заблукати
to notice = помітити
still = нерухомо
quietly = тихо
blurry = розмитий
a view = краєвид
to miss (a train) = спізнитися (на потяг)
luckily = на щастя
suddenly = раптом
a souvenir = сувенір`),
      ex(['match', 'Match the words with their definitions.', `to set off = to start a journey
to get lost = to not know where you are
a view = what you can see from a high place
blurry = not clear, difficult to see
luckily = it was good that this happened`]),
      ex(['choice', 'Choose the correct word.', `We {set off|got lost} at six in the morning to avoid traffic.
The {view|souvenir} from the top of the mountain was amazing.
We were late, so we {missed|noticed} the train.
{Suddenly|Quietly}, the lights went out.`]),
      note('Попроси учня розповісти міні-історію з 3 речень, використовуючи suddenly, luckily і одне інше нове слово. Звертай увагу на вимову: quietly (не плутати з quite), souvenir з наголосом на останньому складі. 10 хвилин.'),

      h('Reading · 15 хв'),
      t(`**A trip I will never forget**

Last summer my family went to the Carpathian mountains. We stayed in a small wooden house near a forest. On the first day it was raining all the time, so we played board games and drank hot tea.

On the second day the sun was shining, and we set off early. We were walking near a lake when we saw a bear. It was drinking water and didn’t notice us. Nobody said a word. We stood very still, then we quietly walked back to the path.

My dad was so excited that he took a photo, but his hands were shaking, so it was blurry! Later, while we were having dinner, we told the owner of the house about the bear. He laughed and said, "Luckily, bears are usually more afraid of people than people are of bears."

Now, every time I see that blurry photo, I remember the most exciting day of my summer.`),
      ex(['choice', 'Choose the best title for the story.', `The best title is {A surprise near the lake|How to take good photos|A boring rainy holiday}.`]),
      ex(
        ['truefalse', 'True or False?', `On the first day the weather was bad. = True
The bear was eating fish when they saw it. = False
The family ran away very fast. = False
The owner of the house thought the story was funny. = True`],
        ['choice', 'Choose the correct answer.', `The photo was blurry because {Dad’s hands were shaking|it was dark|the bear was running}.
They told the owner about the bear {during dinner|in the morning|on the way home}.`],
      ),
      note('Перед читанням питання: What do you think happened near the lake? Перше читання на загальне розуміння (вибір назви), друге на деталі. Після вправ попроси учня знайти в тексті 3 приклади Past Continuous і 3 Past Simple. 15 хвилин.'),

      h('Grammar · 10 хв'),
      tip('**Past Continuous** (was/were + V-ing) описує фон, тобто що тривало: The sun was shining. **Past Simple** описує подію, яка цей фон перервала: We were walking to the hotel **when** it started to rain. Після **while** зазвичай іде Past Continuous: **While** we were having dinner, the phone rang.'),
      ex(
        ['gap', 'Put the verbs in Past Simple or Past Continuous.', `We [were walking] (walk) near a lake when we [saw] (see) a bear.
The bear [was drinking] (drink) water.
It [didn’t notice/did not notice] (not notice) us.
While I [was taking] (take) a photo, my sister [shouted] (shout).`],
        ['choice', 'Choose the correct option.', `When the phone rang, I {was having|had} a shower.
We {got|were getting} lost on the first day.
While we {were waiting|waited} for the bus, it started to snow.`],
      ),
      ex(['translate', 'Translate into English.', `Ми їхали в потязі, коли я побачив свого вчителя = We were travelling by train when I saw my teacher / We were traveling by train when I saw my teacher / We were going by train when I saw my teacher
Поки мама купувала квитки, ми чекали в кафе = While Mum was buying tickets, we were waiting in a cafe / While mum was buying tickets, we were waiting in a café / While my mum was buying tickets, we were waiting in a cafe`]),
      note('Намалюй часову лінію: довга хвиляста лінія (Past Continuous) і коротка «блискавка» (Past Simple), що її перериває. Попроси учня придумати власне речення за цією схемою. Переклад може мати кілька правильних варіантів: якщо відповідь логічна, зарахуй її вручну. 10 хвилин.'),

      h('Listening and speaking · 14 хв'),
      audio('A trip that went wrong', `Anna: How was your trip to Lviv, Den?
Den: Well, it started badly. We missed our train!
Anna: Oh no! What happened?
Den: We were sitting in a cafe at the station and we were talking so much that we didn’t hear the announcement.
Anna: So what did you do?
Den: Luckily, there was another train two hours later. While we were waiting, we walked around and found a great bookshop.
Anna: And how was Lviv?
Den: Amazing! But on the second day it was raining when we set off, and I forgot my umbrella at the hotel.
Anna: Typical you! Did you buy any souvenirs?
Den: Yes, I bought some chocolate for you. But I ate half of it on the train back. Sorry!`),
      ex(['truefalse', 'Listen. True or False?', `Den missed his train because he was late in the morning. = False
They took another train two hours later. = True
Den found a bookshop while he was waiting. = True
Den brought all the chocolate back for Anna. = False`]),
      talk(`Tell about a trip you remember. Where were you? What were you doing when something happened?
Have you ever got lost? What did you do?
Have you ever missed a train, a bus or a plane?
Story chain: start with "It was a dark and rainy night. We were driving through the forest when…" and continue together.`),
      note('Аудіо прослухати двічі. Потім гра «Story chain»: вчитель і учень по черзі додають по одному реченню до історії, використовуючи when / while / suddenly / luckily. Далі учень розповідає власну історію 1-2 хвилини. Виправляй тільки помилки з минулими часами, повторюючи фразу правильно. 14 хвилин.'),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['gap', 'Розкрий дужки: Past Simple або Past Continuous.', `I [was reading] (read) a book when the train [stopped] (stop).
While we [were walking] (walk) in the park, it [started] (start) to rain.
She [was sleeping] (sleep) when her phone [rang] (ring).
We [got] (get) lost because we [didn’t have/did not have] (not have) a map.
They [were having] (have) lunch when a bird [took] (take) their sandwich.
What [were] you [doing] (do) at 8 p.m. yesterday? I was watching a film.
Suddenly the lights [went] (go) out.`],
        ['choice', 'Обери правильне слово.', `We {got lost|set off} in the old town because we didn’t have a map.
The bus left at seven, so we {set off|got lost} at half past six.
I {missed|noticed} the bus, so I walked to school.
The photo was {blurry|still} because I moved my hands.
We missed the train, but {luckily|quietly} there was another one an hour later.
I bought a small {souvenir|view} for my grandma.
We didn’t move. We stood very {still|blurry}.`],
        ['translate', 'Переклади англійською.', `Ми заблукали в лісі = We got lost in the forest / We got lost in the woods
Раптом я помітив ведмедя = Suddenly I noticed a bear / Suddenly, I noticed a bear / Suddenly I saw a bear / Suddenly, I saw a bear
Поки ми чекали на автобус, почався дощ = While we were waiting for the bus, it started to rain / While we were waiting for the bus, it started raining / While we were waiting for the bus, it began to rain
Ми вирушили о шостій ранку = We set off at six in the morning / We set off at 6 a.m. / We set off at six a.m.
На щастя, ми не спізнилися на потяг = Luckily, we didn’t miss the train / Luckily we didn’t miss the train / Luckily, we did not miss the train
Краєвид був чудовий = The view was amazing / The view was wonderful / The view was beautiful / The view was great`],
      ),
      X.game('Story halves', 'З’єднай початок речення з кінцем.', `We were walking near a lake = when we saw a bear.
While Mum was buying tickets, = we were waiting in a cafe.
I missed the bus = because I got up late.
The photo was blurry = because his hands were shaking.
We got lost = because we didn’t have a map.
Luckily, there was = another train two hours later.
The sun was shining = when we set off.
I bought a souvenir = for my little sister.
It was raining all day, = so we played board games.`),
      X.note('Можна використати як розминку на наступному уроці. Перед першою секцією намалюй ще раз часову лінію: довга дія (was/were + -ing) і коротка подія (Past Simple). Неочевидні місця: got lost у Past Simple, бо це одна подія; stood very still - стояли нерухомо. У перекладі зараховуються різні правильні варіанти (saw / noticed, amazing / beautiful), інші логічні відповіді можна зарахувати вручну. Після гри попроси учня продовжити 2-3 речення власними кінцівками.'),

      h('Writing · 6 хв'),
      ex(['open', 'Write the beginning of a travel story (50-70 words).', `Start with: "It was the first day of our holiday. The sun was shining and we were…" Use at least two Past Continuous and two Past Simple verbs, and the words suddenly or luckily.`]),
      note('Якщо часу мало, учень пише лише перші 3-4 речення, а закінчує вдома. Домашнє завдання: дописати історію до 120-150 слів і додати фото або малюнок; або записати голосову розповідь на 1-2 хвилини про реальну поїздку.'),
      X.ex(
        ['choice', 'Homework plus. Обери правильний варіант.', `I {was having|had|have} a shower when the doorbell rang.
We {were swimming|swam} in the sea when it started to rain.
{Were|Was} you sleeping when I called?
She {didn’t notice|wasn’t noticing} the bear.
What {did you buy|were you buying} in Lviv? I bought chocolate.
Last summer we {went|were going} to the sea for two weeks.`],
        ['gap', 'Встав слово: trip, view, souvenir, missed, quietly, Suddenly, luckily.', `Our school [trip] to Lviv was great.
The [view] from the tower was beautiful.
I bought a fridge magnet as a [souvenir].
We [missed] the bus, so we took a taxi.
The baby was sleeping, so we talked [quietly].
[Suddenly] the dog started to bark.
I forgot my umbrella, but [luckily] it didn’t rain.`],
        ['open', 'Напиши відповіді англійською.', `Write 5-6 sentences about a trip you remember. Use when and while.
What happened on the most interesting day of your last holiday?
Imagine you got lost in a new city. What did you do?`],
      ),
    ],
  },

  // ───────────────────────── 5. Present Perfect (teens, НМТ) ─────────────────────────
  {
    id: 'lib-present-perfect-life', title: 'Have you ever…?', level: 'B1', age: 'teens', topic: 'Present Perfect', color: 'lime', source: 'murly',
    focus: ['Grammar', 'Vocabulary', 'Reading', 'Listening', 'Speaking'],
    aims: 'Навчимося говорити про життєвий досвід з Present Perfect\nРозрізнятимемо Present Perfect і Past Simple\nВиконаємо завдання у форматі НМТ: читання і граматичний тест\nПоставимо одне одному питання Have you ever…?',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      t('**Two truths and a lie.** Your teacher says three sentences about their life. Two are true, one is false. Can you guess the lie?'),
      talk(`Guess the lie: which sentence is not true?
Now say three sentences about your life: two true, one false.`),
      note('Дай свої три речення з Present Perfect: I have been to Poland. I have never eaten sushi. I have met a famous singer. Учень вгадує брехню і ставить питання. Потім учень робить свої три речення. Не пояснюй граматику, просто познач, що всі речення про досвід «колись у житті». 5 хвилин.'),

      h('Vocabulary · 10 хв'),
      vocab(`ever = коли-небудь
never = ніколи
already = вже
yet = ще (в запитаннях і запереченнях)
just = щойно
since = з (якогось моменту)
for = протягом
so far = досі, на цей момент
abroad = за кордоном
an experience = досвід, враження
to try = спробувати
recently = нещодавно`),
      ex(['choice', 'Choose the correct word.', `I have {just|yet} finished my homework, so I can go out now.
Have you finished your project {yet|already}?
We have lived here {since|for} 2019.
She has studied English {for|since} six years.
I have {never|ever} been to Japan, but I want to go.`]),
      note('Нарисуй часову лінію від минулого до «now» і розстав на ній just (щойно), already, since 2019, for 6 years. Учень пояснює своїми словами, у чому різниця між since і for. Швидка гра: ти кажеш «2020», учень «since 2020»; ти кажеш «three days», учень «for three days». 10 хвилин.'),

      h('Reading · НМТ · 15 хв'),
      t(`**"I have never said no to a new experience"**

**A** Seventeen-year-old Emma from Poltava has a simple rule: if something new scares her a little, she tries it. "I have climbed a mountain, I have performed on stage and I have even tried snails in France," she laughs.

**B** Her biggest adventure so far happened two years ago. She went to a summer camp abroad and didn’t know anyone there. "On the first day I was terrified. But by the end of the camp I had friends from six countries. We still chat every week."

**C** Not everything has been easy. Emma has failed a few times. "I tried skateboarding last spring and broke my arm. I haven’t got on a skateboard since then!" But she says mistakes are part of the fun.

**D** Recently Emma has started a blog about her experiences. She has already written twenty posts, and more than a thousand people have read them. She hasn’t decided what to study at university yet, but she knows one thing: "I want a life full of stories."`),
      ex(['match', 'НМТ-формат: match the paragraphs (A-D) with the headings.', `Paragraph A = A personal rule
Paragraph B = Making friends far from home
Paragraph C = When things go wrong
Paragraph D = Sharing stories online`]),
      ex(
        ['truefalse', 'True or False?', `Emma has tried food in France. = True
She knew many people at the summer camp before it started. = False
She has skateboarded a lot since she broke her arm. = False
Emma has already decided what to study at university. = False`],
        ['choice', 'НМТ-формат: choose the correct answer.', `Emma went to the summer camp {two years ago|last spring|recently}.
How many people have read her blog? {more than a thousand|twenty|six}
Emma thinks that mistakes are {part of the fun|a reason to stop|very dangerous}.`],
      ),
      note('Формат як у НМТ: спершу заголовки до абзаців (на кожен абзац 30-40 секунд, шукати ключові слова), потім завдання на деталі. Навчи стратегію: підкреслювати в питанні ключове слово і шукати синонім у тексті. Після перевірки знайдіть у тексті приклади Present Perfect і Past Simple та поясніть, чому вжито саме цей час (two years ago, last spring - точний час). 15 хвилин.'),

      h('Grammar · 12 хв'),
      tip('Present Perfect (have / has + V3) говорить про досвід без точного часу: I have been to Lviv. Якщо є точний час (yesterday, in 2022, two years ago), потрібен Past Simple: I went to Lviv in 2022. Типовий діалог: **Have you ever been** to Lviv? Yes, I have. **When did you go** there? I **went** last summer.'),
      ex(
        ['gap', 'Open the brackets.', `I [have never tried/’ve never tried] (never / try) sushi.
She [has already finished/’s already finished] (already / finish) her project.
[Have] you ever [been] (be) abroad?
We [have known/’ve known] (know) each other since 2019.`],
        ['choice', 'Present Perfect or Past Simple?', `I {saw|have seen} him yesterday.
They {have lived|lived} here for five years and still live here.
She {has lost|lost} her keys, so she can’t open the door now.`],
        ['translate', 'Translate into English.', `Я ще не зробив домашнє завдання = I haven’t done my homework yet / I have not done my homework yet
Ти коли-небудь бачив сніг? = Have you ever seen snow?`],
      ),
      ex(['choice', 'НМТ-формат: read the text and choose the correct option for each gap.', `My cousin Tom {has visited|visited|visits|is visiting} twelve countries so far.
Last year he {went|has gone|goes|has been going} to Portugal with his friends.
He {has never been|never was|is never|was never being} to Asia, but he dreams about Japan.
He {has just bought|just buys|is just buying|just has bought} a new guidebook, and he is reading it now.`]),
      note('Останнє завдання - у форматі граматичного тесту НМТ (вибір з чотирьох варіантів у зв’язному тексті). Попроси учня спершу знайти в кожному реченні «маркер часу» (so far, last year, never, just) і лише потім обирати. Помилки розбирай через питання: Is there a finished time? 12 хвилин.'),

      h('Listening and speaking · 12 хв'),
      audio('Interview: the experience game', `Kate: OK, my first question. Have you ever been on TV?
Oleh: Yes, I have, actually!
Kate: Really? When was that?
Oleh: Two years ago. A journalist interviewed me at a football match. I was so nervous!
Kate: Cool! Have you ever cooked a meal for your whole family?
Oleh: No, I haven’t. I’ve only made sandwiches. What about you? Have you ever broken a bone?
Kate: Yes, I’ve broken my leg. I fell off a horse when I was ten.
Oleh: Ouch! Have you been on a horse since then?
Kate: No, never. I’ve been too scared!`),
      ex(['truefalse', 'Listen. True or False?', `Oleh has been on TV. = True
Oleh has cooked dinner for his family many times. = False
Kate broke her leg when she was ten. = True`]),
      talk(`Have you ever met a famous person?
What is the most interesting place you have been to? When did you go there?
What have you done this week that you are proud of?
Find someone who…: ask your teacher five Have you ever…? questions and one follow-up question in Past Simple for each Yes.`),
      ex(['voice', 'НМТ-style speaking practice: record a 1-minute answer.', `Talk about an experience that changed you. What have you done? When did it happen? How did you feel?`]),
      note('Після аудіо зверни увагу на модель: питання в Present Perfect, а уточнення (When? How?) уже в Past Simple. Гра «Find someone who…»: учень ставить питання з картки (…has eaten something strange, …has been abroad, …has met a famous person), на кожне Yes - уточнення в Past Simple. Потім запис голосом. 12 хвилин.'),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['choice', 'НМТ-формат: прочитай текст і обери правильний варіант для кожного пропуску.', `My grandma Nina {has lived|lives|is living|lived} in Odesa since 1975.
She {has worked|works|is working|was work} as a teacher for forty years and she still loves her job.
In 2015 she {visited|has visited|visits|is visiting} Paris for the first time.
Since then she {has been|was|is|had being} abroad five times.
Last month she {bought|has bought|buys|is buying} a new camera.
She {has already taken|already takes|is already taking|has already take} more than five hundred photos with it.
My friends often ask me: "Has she ever {been|went|go|was} on TV?"`],
        ['gap', 'Розкрий дужки: Present Perfect або Past Simple.', `I [have been/’ve been] (be) to Kraków three times.
We [went] (go) there last winter.
She [has never eaten/’s never eaten] (never / eat) pizza with pineapple.
My brother [broke] (break) his phone yesterday.
[Have] you [finished] (finish) your project yet?
They [have known/’ve known] (know) each other for ten years.
He [has just come/’s just come] (just / come) home, so he is tired.`],
        ['choice', 'НМТ-формат: обери правильне слово.', `I have lived in this town {since|for|ago|yet} 2020.
We have been friends {for|since|ago|already} five years.
I haven’t done my homework {yet|already|just|ever}.
She has {just|yet|ever|since} left, so you can still catch her at the bus stop.
Have you {ever|yet|since|ago} been to the sea?
I {have never|never have|haven’t never|has never} seen a real tiger.
I visited Lviv two years {ago|since|for|yet}.`],
      ),
      X.game('Third forms', 'Назви третю форму дієслова (V3).', `go = gone
be = been
see = seen
eat = eaten
write = written
break = broken
buy = bought
meet = met
try = tried
know = known`),
      X.note('Формат як у НМТ: перша і третя секції - вибір з чотирьох варіантів. Навчи стратегію: спершу знайти маркер часу (since, for, last month, in 2015, so far, yet), потім обирати. Неочевидні місця: «She has worked… and she still loves» - дія триває досі, тому Present Perfect; «Since then she has been abroad» - since then вимагає Present Perfect; «Has she ever been» - після has потрібна V3. У грі з V3 учень спершу відповідає усно, потім складає 2-3 речення з I have… Можна використати як розминку на наступному уроці.'),

      h('Wrap-up · 6 хв'),
      ex(['open', 'Write 4-5 sentences: My bucket list.', `Write about two things you have already done and two things you have never done but want to do. Use already, never, and one sentence in Past Simple with a time expression.`]),
      note('Наприкінці учень називає одну різницю між Present Perfect і Past Simple своїми словами. Домашнє завдання: скласти bucket list з 10 пунктів і позначити, що вже зроблено (I have already…) та що ще ні (I haven’t… yet); додатково - одна граматична вправа у форматі НМТ на платформі.'),
      X.ex(
        ['choice', 'Homework plus. НМТ-формат: прочитай лист і обери правильний варіант для кожного пропуску.', `Hi Dan! Guess what? I {have just got|just get|am just getting|have just get} a letter from the summer camp.
I {have never been|never was|was never|am never} to a camp abroad before, so I am a bit nervous.
Last year my sister {went|has gone|goes|has been going} there.
She {has kept|kept|keeps|is keeping} in touch with her camp friends since then.
{Have|Did|Has|Do} you ever been to a camp?
Write soon! I {haven’t heard|didn’t hear|don’t hear|am not hearing} from you for a month.`],
        ['translate', 'Переклади англійською.', `Я ніколи не був за кордоном = I have never been abroad / I’ve never been abroad
Вона щойно повернулася додому = She has just come home / She’s just come home / She has just returned home / She has just got home / She’s just got home / She has just come back home
Ми знаємо одне одного з 2018 року = We have known each other since 2018 / We’ve known each other since 2018
Ти вже бачив цей фільм? = Have you seen this film yet? / Have you already seen this film? / Have you seen this movie yet? / Have you already seen this movie?
Я відвідав Львів минулого літа = I visited Lviv last summer / I went to Lviv last summer
Він ще не відповів на моє повідомлення = He hasn’t answered my message yet / He has not answered my message yet / He hasn’t replied to my message yet / He has not replied to my message yet`],
        ['open', 'Напиши відповіді англійською.', `Write 5 sentences about things you have done this year. Add one sentence in Past Simple with a time expression.
Write an email to a friend (60-80 words) about a new experience you have had recently.`],
      ),
    ],
  },

  // ───────────────────────── 6. Bilingual brain (teens) ─────────────────────────
  {
    id: 'lib-bilingual-brain', title: 'The bilingual brain', level: 'B1', age: 'teens', topic: 'Мови і мозок', color: 'lime', source: 'murly',
    focus: ['Listening', 'Vocabulary', 'Speaking', 'Writing'],
    aims: 'Обговоримо, навіщо вчити кілька мов\nПодивимось коротке відео TED-Ed і перевіримо розуміння\nВивчимо слова про мозок і навчання та фрази для аргументації\nВисловимо і захистимо свою думку',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`How many languages do you speak or understand?
Is it easier to learn a language as a child or as an adult? Why?
Do you ever mix Ukrainian and English words when you speak?`),
      ex(['scale', 'How much do you agree?', `Learning languages is easy for me.
People who speak two languages are smarter.
It is too late to start a new language after 30.`]),
      note('Почни з короткого обговорення, потім шкала. Попроси учня пояснити одну свою відповідь і пообіцяй повернутися до неї після відео: чи зміниться думка? Не виправляй помилки на цьому етапі. 5 хвилин.'),

      h('Vocabulary · 10 хв'),
      vocab(`bilingual = двомовний
native language = рідна мова
to acquire = засвоювати, набувати
the brain = мозок
to switch = перемикатися
an advantage = перевага
fluent = вільний (про мову)
to decline = знижуватися
memory = пам’ять
to improve = покращувати
a skill = навичка
to focus = зосереджуватися`),
      ex(['match', 'Match the words with their meanings.', `fluent = able to speak easily and well
to switch = to change from one thing to another
an advantage = something that helps you
native language = the first language you learn
to decline = to become smaller or weaker
memory = the ability to remember things`]),
      ex(['gap', 'Complete the sentences: switch, fluent, advantage, acquire, improve.', `Children [acquire] languages very quickly.
She is [fluent] in English and Spanish.
Bilingual people can [switch] between languages.
One [advantage] of speaking two languages is better memory.
Reading every day helps you [improve] your English.`]),
      note('Перед вправами попроси учня розділити слова на дві групи: «мозок» (brain, memory, focus) і «мови» (fluent, native language, bilingual). Перевір вимову: acquire, advantage, fluent. 10 хвилин.'),

      h('Watch · 15 хв'),
      video('https://www.youtube.com/watch?v=MMmOLN5zBLY', 'Подивись відео (5 хв). Спершу просто зрозумій головну ідею, потім виконай вправи.', 'TED-Ed: The benefits of a bilingual brain'),
      note('Відео з англійськими субтитрами на YouTube. На B1 дивіться двічі: спочатку для загального розуміння (вправа на головну ідею), потім для деталей. Перевір відповіді True/False разом, повертаючись до моментів у відео. Якщо учню важко, увімкни субтитри і швидкість 0.75. 15 хвилин.'),
      ex(['choice', 'What is the video mainly about?', `The video is mainly about {how knowing two languages affects the brain|how to pass a language exam|the history of the English language}.`]),
      ex(
        ['truefalse', 'True or False?', `The video describes different types of bilingual people. = True
You can only learn a second language as a small child. = False
Using two languages can keep your brain active. = True
According to the video, being bilingual can help to delay diseases like dementia. = True`],
        ['choice', 'Choose the correct answer.', `The video describes {three|two|five} types of bilingual people.
The video says that the benefits of learning a language are {for adults too|only for children|only for teachers}.`],
      ),

      h('Language focus · 10 хв'),
      tip('Говоримо про переваги і недоліки: **One advantage of … is that …** / **It helps you to …** / **The best thing about … is …** / **One disadvantage is that …** / **On the other hand, …** Після **It helps you** можна вживати дієслово з **to** або без: It helps you (to) remember words.'),
      ex(['choice', 'Choose the correct option.', `One advantage of learning languages {is that|it is} you can travel easily.
It helps you {to focus|focusing} better.
The best thing about English {is|are} that you can watch films in the original.
{On the other hand|On other hand}, learning a language takes a lot of time.
One {disadvantage|disadvantages} is that you need to practise every day.`]),
      ex(['translate', 'Translate into English.', `Одна з переваг двомовності в тому, що мозок залишається активним = One advantage of being bilingual is that the brain stays active / One advantage of bilingualism is that the brain stays active / One advantage of being bilingual is that your brain stays active
Це допомагає тобі краще запам’ятовувати слова = It helps you to remember words better / It helps you remember words better`]),
      note('Попроси учня усно зробити 3 речення про переваги англійської з різними фразами з підказки. Переклад може мати кілька варіантів: якщо відповідь правильна за змістом, зарахуй вручну. Типова помилка: One advantage is learning languages is... - покажи структуру One advantage of + -ing + is that. 10 хвилин.'),

      h('Speaking · 14 хв'),
      t('**Mini-debate.** Read the statement. Choose a side, prepare two arguments and one example in 2 minutes, then present your opinion. Use the phrases from the tip.'),
      talk(`Which language would you like to learn next? Why?
Agree or disagree: "Everyone in Ukraine should speak English." Give two reasons.
Do you think online translators will make learning languages unnecessary?
Look at your answers on the scale from the warm-up. Has your opinion changed after the video?`),
      ex(['voice', 'Record a 1-minute opinion.', `"Every child should learn two foreign languages at school." Do you agree? Give two arguments and one example from the video or your life.`]),
      note('Міні-дебати: вчитель бере протилежну позицію, учень захищає свою. Кожна сторона говорить 1 хвилину, потім 1 хвилина на відповідь. Слідкуй за використанням фраз One advantage of…, On the other hand… Помилки записуй і розбирай після дебатів, а не під час. 14 хвилин.'),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['gap', 'Встав слово: native, skill, decline, bilingual, brain, focus, memory.', `My [native] language is Ukrainian.
Learning a language is a [skill], like swimming or cooking.
Some abilities [decline] when people get older.
A person who speaks two languages is [bilingual].
Our [brain] controls everything we do.
I can’t [focus] when my phone is ringing.
Learning new words is good for your [memory].`],
        ['choice', 'Обери правильний варіант.', `One advantage of {speaking|speak|to speak} two languages is better memory.
It helps you {remember|remembering|remembers} new words.
The best thing about travelling {is that|it is that|are that} you meet new people.
One {disadvantage|disadvantages} is that it takes a lot of time.
{On the other hand|In other hand|On other hand}, it is a lot of fun.
She is fluent {in|on|at} three languages.`],
        ['translate', 'Переклади англійською.', `Він вільно говорить англійською = He is fluent in English / He speaks English fluently / He speaks fluent English
Діти швидко засвоюють мови = Children acquire languages quickly / Children acquire languages fast / Kids acquire languages quickly
Моя рідна мова українська = My native language is Ukrainian / Ukrainian is my native language
Читання покращує пам’ять = Reading improves memory / Reading improves your memory / Reading improves our memory
Мені важко зосередитися = It is hard for me to focus / It’s hard for me to focus / I find it hard to focus
З іншого боку, це займає багато часу = On the other hand, it takes a lot of time / On the other hand it takes a lot of time / On the other hand, it takes much time`],
      ),
      X.game('Brain words', 'Знайди переклад слова.', `bilingual = двомовний
the brain = мозок
memory = пам’ять
fluent = вільний (про мову)
to switch = перемикатися
an advantage = перевага
a skill = навичка
to focus = зосереджуватися
to improve = покращувати`),
      X.note('Можна дати наприкінці уроку або як розминку на наступному. Неочевидні місця: після One advantage of потрібне дієслово з -ing (speaking); у фразі On the other hand обов’язкові the і on; fluent in English, а не on. У перекладі зараховуються різні правильні варіанти (He is fluent in English / He speaks English fluently); інші логічні відповіді зарахуй вручну. Після гри попроси учня скласти 2 речення з новими словами про себе: I want to improve my… / I can’t focus when…'),

      h('Writing · 6 хв'),
      ex(['open', 'Writing: 60-80 words.', 'Write a short post: "Why I learn English". Use at least three words from the lesson and one phrase for advantages.']),
      note('Якщо учень не встигає, нехай напише план і перше речення, а пост доробить удома. Домашнє завдання: дописати пост до 100-120 слів; або знайти людину, яка знає 2+ мови, взяти коротке інтерв’ю (3 питання) і розповісти про це на наступному уроці.'),
      X.ex(
        ['choice', 'Homework plus. Обери правильний варіант.', `Bilingual people can {switch|decline} between languages easily.
Some skills {decline|improve} when we stop using them.
English helps you to travel. That is a big {advantage|disadvantage}.
I want to become {fluent|native} in Spanish.
Learning a language helps you {to understand|understanding} other cultures.
Reading every day {improves|declines} your vocabulary.`],
        ['gap', 'Встав фразу: One advantage, It helps you, The best thing, Another advantage, One disadvantage, On the other hand.', `[One advantage] of online lessons is that you can study at home.
[It helps you] to save time on the road.
[The best thing] about my English class is the games.
[Another advantage] is that you can watch the recording later.
[One disadvantage] is that you sit at the computer all day.
[On the other hand], you can’t meet your classmates in person.`],
        ['open', 'Напиши відповіді англійською.', `Write 5-6 sentences: What are the advantages and disadvantages of learning English online?
Ask a family member: What languages do you speak? When did you learn them? Write their answers in English.`],
      ),
    ],
  },
];
