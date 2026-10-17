// Бібліотека, пакет 8: граматика для підлітків (A2), 60-хвилинні уроки.
// Порядок тем як у Murphy «Essential Grammar in Use», але всі тексти, приклади і вправи власні.
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, video, vocab, ex, talk, meme, game } = makeHelpers('b8');

export const BATCH_8: Plan[] = [
  // ---------- JUST / ALREADY / YET ----------
  {
    id: 'lib-gr-just-already-yet', title: 'Just, already, yet: is it done?', level: 'A2', age: 'teens', topic: 'Граматика: Present Perfect (just, already, yet)', color: 'lime', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking'],
    aims: 'Будуємо Present Perfect: I have done, she has done\nВживаємо just (щойно), already (вже) і yet (ще не / вже в питаннях)\nСтавимо слова just, already, yet на правильне місце в реченні\nРозповідаємо, що ми вже зробили, а що ще ні',
    duration: 60,
    blocks: [
      h('Warm-up · 4 хв'),
      talk(`What have you done today? Tell me three things.
Have you had breakfast today?
What is the last thing you ate?
Is your homework for tomorrow ready?
Is your room tidy right now?
What do you always do at the last minute?
Have you checked your phone in the last ten minutes? Be honest!
Has your cat (or a pet you know) done anything funny this week?`),
      note('Обери 4-5 питань, 3-4 хв. Не виправляй, просто слухай, чи вживає учень have / has + третю форму. Найчастіше учні кажуть «I already did it» або «I have do». Запиши 2-3 помилки для етапу «Розбір помилок». Наприкінці запитай: «Як сказати англійською “я вже зробив домашку”?»'),

      h('Lead-in · 7 хв'),
      t(`**Group chat: Liza’s surprise party (Saturday, 6 pm)**

**Mark:** Guys, the party is in two hours! What have you done? What haven’t you done yet?
**Olya:** I’ve already bought the balloons. Twenty pink balloons!
**Dan:** I’ve just picked up the cake. It’s in my bag. Don’t ask.
**Mark:** In your BAG?! Has it survived?
**Dan:** Not yet. I mean, yes. Mostly.
**Olya:** Has anyone invited Liza’s cousin yet?
**Mark:** Yes, I’ve already sent her a message. She hasn’t answered yet.
**Sofia:** Hi! Sorry, I’ve just woken up. Have I missed anything?
**Mark:** Sofia, have you made the playlist yet?
**Sofia:** Ummm... not yet. But I’ve already chosen the first song!
**Dan:** Breaking news: my cat has just sat on the cake.
**Olya:** NOOOO.`),
      vocab(`surprise party = вечірка-сюрприз
balloon = повітряна кулька
pick up = забрати
survive = вижити, вціліти
invite = запрошувати
cousin = двоюрідний брат, двоюрідна сестра
send a message = надіслати повідомлення
wake up = прокидатися
miss = пропустити
playlist = плейлист, добірка пісень
choose = обирати
breaking news = термінова новина
tidy = охайний, прибирати
last minute = останній момент`),
      ex(['truefalse', 'Прочитай чат і обери True або False.', `Olya has already bought the balloons. = True
Dan has just bought a new bag. = False
Liza’s cousin has already answered. = False
Sofia has just woken up. = True
Sofia has made the playlist. = False
Dan’s cat has just sat on the cake. = True`]),
      note('Розподіліть ролі і прочитайте чат «за персонажів». Слова пройди швидко: учень знаходить їх у тексті. Після True / False попроси підкреслити всі have / has + третю форму і обвести just, already, yet. Запитай: де стоїть yet у реченні? А already? Хай учень сам помітить, що yet в кінці, а just і already посередині.'),

      h('Rule · 5 хв'),
      tip(`**Present Perfect = have / has + третя форма дієслова (V3).**
Результат важливий ЗАРАЗ, а коли саме це сталося, не важливо.

I / you / we / they **have** (’ve) done | he / she / it **has** (’s) done
Правильні дієслова: + -ed (finish → finished). Неправильні: третя колонка (eat → eaten, do → done, buy → bought).

**just** = щойно (між have і V3): I’ve **just** finished. = Я щойно закінчив.
**already** = вже, раніше, ніж чекали (між have і V3): She’s **already** left. = Вона вже пішла.
**yet** = в питаннях «вже?», в запереченнях «ще не» (В КІНЦІ речення):
Have you eaten **yet**? = Ти вже поїв? | I haven’t eaten **yet**. = Я ще не їв.

**Лайфхак «Бутерброд».** Just і already лежать усередині бутерброда між have і V3. Yet як вишенька: завжди зверху, в самому кінці.`),
      note('Намалюй «бутерброд»: нижня булка have / has, начинка just / already, верхня булка V3. Yet малюй окремо на кінці речення. Поясни, що «вже» українською має два переклади: already у ствердженні, yet у питанні. На все 5 хв.'),
      meme('st-cat-shock', 'Mum: Have you done your homework yet?', 'Me, who has just opened the book: Almost.', 'Мама: Ти вже зробив домашку? Я, який щойно відкрив підручник: Майже.'),

      h('Game: just, already or yet? · 4 хв'),
      game('Just, already or yet?', 'Choose just, already or yet', `Have you finished ___? = yet
I’ve ___ eaten. I’m not hungry. = already
The bus has ___ left. Run! = just
She hasn’t called me ___. = yet
Wow, you’ve ___ finished? That was fast! = already
Has the film started ___? = yet
I’ve ___ woken up. I’m still sleepy. = just
We haven’t decided ___. = yet
Breaking news: the cat has ___ jumped on the cake! = just
I don’t need help. I’ve ___ done it. = already`),
      note('Учень сам обирає формат гри (квіз, пари, картки). Після кожної відповіді хай пояснить коротко: «питання, тому yet» або «одну секунду тому, тому just».'),

      h('Practice · 12 хв'),
      ex(
        ['gap', 'Розкрий дужки. Вжий Present Perfect і слово в дужках.', `I [have just finished/’ve just finished] (just / finish) my project.
Tom [has already eaten/’s already eaten] (already / eat) all the cookies.
We [haven’t started/have not started] (not start) the test yet.
[Has] Anna [called] (call) you yet?
My parents [have just arrived/’ve just arrived] (just / arrive) home.
The cat [has already broken/’s already broken] (already / break) two cups today.
I [haven’t seen/have not seen] (not see) the new episode yet.
[Have] you [done] (do) your homework yet?`],
        ['choice', 'Обери правильний варіант.', `I have {just|yet|ever} sent you the photo. Check your phone!
Have you bought the tickets {yet|already|just}?
She has {already|yet|still} read this book twice.
We haven’t had lunch {yet|already|just}.
Dan has {already left|left already yet|yet left}. You’re too late.
Have you {finished|finish|finishing} your essay yet?`],
      ),
      meme('st-cat-loaf', 'Me: I haven’t started my project yet.', 'Also me: I’ve already planned my evening nap.', 'Я: Я ще не почав проєкт. Теж я: Я вже запланував вечірній сон.'),
      ex(
        ['sort', 'Де стоїть слово в реченні?', `between have and V3: just, already
at the end: yet`],
        ['translate', 'Переклади англійською.', `Я щойно поїв = I have just eaten / I’ve just eaten / I have just had lunch / I’ve just had lunch
Ти вже зробив домашнє завдання? = Have you done your homework yet? / Have you done the homework yet?
Вона ще не прийшла = She hasn’t come yet / She has not come yet / She hasn’t arrived yet / She has not arrived yet
Ми вже бачили цей фільм = We have already seen this film / We’ve already seen this film / We have already seen this movie / We’ve already seen this movie
Мій кіт щойно розбив чашку = My cat has just broken a cup / My cat’s just broken a cup / My cat has just broken the cup
Вони ще не відповіли = They haven’t answered yet / They have not answered yet / They haven’t replied yet / They have not replied yet`],
      ),
      note('Gap і choice учень робить сам (5-6 хв), потім перевірка разом. Sort усно, за 30 секунд. У перекладі звертай увагу, що «вже» в питанні перекладається yet, а не already. Скорочені форми ’ve / ’s теж правильні.'),

      h('Video: Mr Bean’s busy morning · 8 хв'),
      video('https://www.youtube.com/watch?v=568a0HDEn7w', 'Watch the clip. Pause after each action and say what Mr Bean has just done. Then say 2 things he hasn’t done yet.', 'Classic Mr Bean (офіційний канал): Morning Bean, уривок'),
      video('https://www.youtube.com/watch?v=aFgLrWiNHFc', 'Watch the turkey scene. Answer: Has Mr Bean cooked the turkey yet? What has he just put on his head?', 'Mr Bean (офіційний канал): Christmas Turkey'),
      note('Перегляньте 2-3 хвилини першого кліпу. Зупиняй після кожної дії (орієнтовно кожні 20-30 секунд, точні моменти переглянь перед уроком) і питай: What has he just done? Учень відповідає He has just ... (woken up, brushed his teeth, put on his shirt). Потім: What hasn’t he done yet? (He hasn’t had breakfast yet.) Другий кліп опційно, якщо лишився час: Has he cooked the turkey yet? No, he hasn’t. He has just put it on his head.'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «I already did it.» (у британській англійській на уроці неправильно) → **I have already done it.** З already, just, yet вживаємо Present Perfect.
2. «Have you done it already?» замість звичного питання → **Have you done it yet?** У питаннях «вже» = yet.
3. «I have yet finished.» (неправильно) → **I haven’t finished yet.** Yet в кінці і з запереченням.
4. «She have just left.» (неправильно) → **She has just left.** Для he / she / it тільки has.
5. «I have just eat.» (неправильно) → **I have just eaten.** Після have / has третя форма, а не перша.`),
      ex(['choice', 'Знайди правильне речення.', `{I have just finished my test.|I have finished just my test.|I just have finish my test.}
{Have you seen the new video yet?|Have you seen yet the new video?|Did you seen the new video yet?}
{She hasn’t replied yet.|She hasn’t yet replied yet.|She has replied not yet.}
{My brother has already left.|My brother have already left.|My brother has already leave.}
{We have already bought the tickets.|We have bought already yet the tickets.|We already have buy the tickets.}
{The cat has just eaten my sandwich.|The cat have just eaten my sandwich.|The cat has just eat my sandwich.}`]),
      note('Розберіть tip, потім вправа на час (60 секунд). Про помилку 1: в американській англійській «I already did it» звучить нормально, але на уроці тренуємо Present Perfect. Поверни помилки з розминки і попроси учня виправити їх.'),

      h('Speaking · 8 хв'),
      talk(`What have you already done today?
What haven’t you done yet today?
Have you finished your homework for tomorrow yet?
What have you just learned in this lesson?
Have you seen any good films or series this month? Which ones?
What has your best friend just posted online?
Have you already planned your summer? What are your plans?
What have you wanted to do for a long time, but haven’t done yet?
Has your cat (or any cat you know) already destroyed something today?
What has your phone just told you? (Look at your last notification!)`),
      note('Обери 6-7 питань. Вимагай повні речення з have / has + V3 і правильним місцем just, already, yet. Друге коло, «To-do list»: учень пише список із 5 справ на тиждень, ти питаєш Have you ... yet?, він відповідає Yes, I’ve already ... / No, not yet. Записуй помилки і розбери 2-3 наприкінці.'),

      h('Speed round · 3 хв'),
      game('Speed round: V3 sprint', 'Write the third form (V3) of the verb', `eat = eaten
do = done
see = seen
buy = bought
go = gone
write = written
break = broken
send = sent
make = made
finish = finished
wake up = woken up
take = taken`),
      note('Гра на швидкість: 5 секунд на слово. Якщо учень плутає другу і третю форму (ate замість eaten), попроси назвати всі три: eat, ate, eaten.'),
      meme('st-boy-backpack', 'Teacher: Has everyone finished the test?', 'Me, still on question 1: I’ve just started believing in myself.', 'Вчитель: Усі вже закінчили тест? Я, досі на першому питанні: Я щойно почав вірити в себе.'),

      h('Homework · 3 хв'),
      ex(
        ['gap', 'Розкрий дужки. Вжий just, already або yet.', `I [have already read/’ve already read] (already / read) this book.
[Has] your dad [fixed] (fix) the bike yet?
They [haven’t arrived/have not arrived] (not arrive) yet.
She [has just sent/’s just sent] (just / send) me a funny meme.
We [have already watched/’ve already watched] (already / watch) all the episodes.`],
        ['open', 'Напиши свій список справ на тиждень (6 пунктів) і 6 речень: що ти вже зробив, що щойно, а що ще ні.', 'I have already... I have just... I haven’t ... yet.'],
      ),
      note('Домашнє: вправа + «To-do list» з 6 реченнями. Перевір, щоб у кожному реченні було have / has + V3 і just, already або yet на правильному місці. На наступному уроці учень читає свій список, а ти ставиш питання Have you ... yet?'),
    ],
  },

  // ---------- HAVE YOU EVER...? ----------
  {
    id: 'lib-gr-have-you-ever', title: 'Have you ever...? Life experiences', level: 'A2', age: 'teens', topic: 'Граматика: Present Perfect (досвід, ever / never)', color: 'sky', source: 'murly',
    focus: ['Grammar', 'Listening', 'Speaking'],
    aims: 'Питаємо про досвід: Have you ever tried sushi?\nВідповідаємо коротко: Yes, I have. / No, I haven’t. / I’ve never...\nВживаємо ever, never, once, twice, many times\nРозрізняємо been і gone',
    duration: 60,
    blocks: [
      h('Warm-up · 4 хв'),
      talk(`What is the most interesting place you know?
What is the strangest food you know?
Can you swim? Can you ride a horse?
What is the scariest thing for you: spiders, heights or the dark?
Which famous person do you want to meet?
What is the best concert or show you know?
Do you like rollercoasters?
What is the craziest thing a cat can do?`),
      note('Обери 4-5 питань, 3-4 хв. Тут свідомо немає Present Perfect: учень говорить вільно. Наприкінці запитай: «Як англійською запитати “ти коли-небудь їв суші?”» Найчастіше учні кажуть «Did you ever eat sushi?» або «You ate sushi?». Запиши варіант учня.'),

      h('Lead-in · 7 хв'),
      audio('School podcast: Never Have I Ever', `
Host (Mia): Welcome to our school podcast! Today my guest is Tim from 8-B. Tim, have you ever been on TV?
Tim: Yes, I have! Once. I was in the background of a news report about our school fair.
Mia: Cool! Have you ever eaten something really strange?
Tim: Yes. I’ve tried snails in France. It was... interesting.
Mia: Have you ever met a famous person?
Tim: No, I haven’t. But I’ve seen a famous footballer at the airport. He didn’t see me.
Mia: Have you ever broken a bone?
Tim: Yes, twice! My arm and my finger. Both times on a skateboard.
Mia: Ouch! Have you ever lost your phone?
Tim: Many times. My mum says I’ve lost more phones than she has bought socks.
Mia: Last question. Has your cat ever done something crazy?
Tim: Oh yes. My cat has never caught a mouse, but she has caught my grandma’s wig.
Mia: Thank you, Tim! That’s all for today!`),
      vocab(`ever = коли-небудь
never = ніколи
once = один раз
twice = двічі
many times = багато разів
guest = гість
background = задній план, фон
try = куштувати, пробувати
snail = равлик
famous = відомий
break a bone = зламати кістку
lose = губити
catch = ловити
wig = перука`),
      ex(['truefalse', 'Послухай подкаст і обери True або False.', `Tim has been on TV once. = True
Tim has never tried snails. = False
Tim has met a famous footballer. = False
Tim has broken a bone twice. = True
Tim has never lost his phone. = False
Tim’s cat has caught a mouse. = False`]),
      note('Перше слухання: хто говорить і про що подкаст? Друге: True / False. Потім попроси учня записати всі питання, що починаються з Have you ever... і Has your cat ever... . Звідси переходимо до правила. Слова пройди після першого слухання.'),

      h('Rule · 5 хв'),
      tip(`**Досвід «за все життя» = Present Perfect. Коли саме, не важливо.**

Питання: **Have** you **ever** + V3? / **Has** she **ever** + V3?
**Have** you **ever** **tried** sushi? = Ти коли-небудь куштував суші?
Відповідь: Yes, I **have**. / No, I **haven’t**. / No, I’ve **never** tried it.

**never** = ніколи, стоїть між have і V3, без not: I’ve **never** been to London.
Скільки разів: **once** (1), **twice** (2), **three times**, **many times**: I’ve seen this film **three times**.

**been чи gone?**
She has **been** to Paris. = Вона була в Парижі (і вже повернулась).
She has **gone** to Paris. = Вона поїхала в Париж (і зараз там).

**Лайфхак.** Never вже є запереченням. «I haven’t never» = подвійне «ні», англійці так не кажуть.`),
      note('Намалюй лінію життя від народження до «зараз». Досвід можна поставити будь-де на лінії, дата не важлива. Поясни been / gone на прикладі: мама has gone to the shop (її немає вдома), мама has been to the shop (вона вже вдома з пакетами). На все 5 хв.'),
      meme('st-cat-cool', 'Have you ever seen a cat on a skateboard?', 'Me: No. Cat: You have now.', 'Ти коли-небудь бачив кота на скейті? Я: Ні. Кіт: Тепер бачив.'),

      h('Game: V3 of experiences · 4 хв'),
      game('V3 of experiences', 'Write the third form (V3). Have you ever ___?', `be (to Paris) = been
eat (sushi) = eaten
see (a ghost) = seen
meet (a famous person) = met
ride (a horse) = ridden
fly (in a plane) = flown
win (a prize) = won
lose (your keys) = lost
swim (in the sea) = swum
sing (karaoke) = sung
drive (a car) = driven
try (bubble tea) = tried`),
      note('Учень сам обирає формат гри. Після кожної пари хай ставить тобі повне питання: Have you ever ridden a horse? Ти відповідаєш чесно.'),

      h('Practice · 12 хв'),
      ex(
        ['gap', 'Допиши питання або відповідь у Present Perfect.', `[Have] you ever [eaten] (eat) Japanese food?
I [have never been/’ve never been] (never / be) to the mountains.
[Has] your sister ever [won] (win) a competition?
My dad [has never ridden/’s never ridden] (never / ride) a motorbike.
Have you ever played chess? Yes, I [have].
Has your dog ever bitten anyone? No, it [hasn’t/has not].
We [have seen/’ve seen] (see) this film three times!
My grandma [has never used/’s never used] (never / use) TikTok.`],
        ['choice', 'Обери правильний варіант.', `Have you ever {seen|saw|see} a dolphin?
I have {never|ever|not} tried bubble tea.
Has he ever {been|gone|went} to Italy? Yes, he went there last year.
My parents aren’t at home. They have {gone|been|went} to the cinema.
Have you ever won a prize? Yes, {I have|I won|I did have}.
I’ve read this book {twice|two|second}.`],
      ),
      meme('st-cat-please', 'Have you ever eaten cat food?', 'No? Then stop eating MY food.', 'Ти коли-небудь їв котячий корм? Ні? Тоді перестань їсти МОЮ їжу.'),
      ex(
        ['match', 'Знайди відповідь на питання.', `Have you ever been to London? = No, I haven’t. But I want to go!
Has your brother ever broken his arm? = Yes, he has. Twice!
Have your parents ever been on TV? = No, they haven’t.
How many times have you seen Shrek? = Many times. I know all the jokes.
Has your cat ever caught a bird? = No, she hasn’t. She’s too lazy.
Have you ever tried snails? = Yes, once. Never again!`],
        ['translate', 'Переклади англійською.', `Ти коли-небудь бачив привида? = Have you ever seen a ghost?
Я ніколи не їв суші = I have never eaten sushi / I’ve never eaten sushi / I have never tried sushi / I’ve never tried sushi
Вона була в Лондоні двічі = She has been to London twice / She’s been to London twice
Твій тато коли-небудь катався на конях? = Has your dad ever ridden a horse? / Has your father ever ridden a horse?
Ми ніколи не вигравали приз = We have never won a prize / We’ve never won a prize
Вони пішли в кіно = They have gone to the cinema / They’ve gone to the cinema / They have gone to the movies / They’ve gone to the movies`],
      ),
      note('Gap і choice учень робить сам, потім перевірка разом. У match звертай увагу, як коротка відповідь повторює помічника: Has he...? Yes, he has. У choice є речення з been / gone: перепитай учня, де зараз батьки. У перекладі стеж, щоб з never не було not.'),

      h('Video: Mr Bean’s adventures · 8 хв'),
      video('https://www.youtube.com/watch?v=HiRSdr88OUs', 'Watch only the first 2 minutes. Has Mr Bean ever been on a ride like this? Then answer: Have YOU ever been on a rollercoaster? Was it scary?', 'Mr Bean (офіційний канал): Mr Bean Rides the Big One (лише уривок)'),
      video('https://www.youtube.com/watch?v=gZujYUcY5xc', 'Watch and answer: Has Mr Bean ever jumped from a high diving board, do you think? Have you ever done it?', 'Mr Bean (офіційний канал): At the Swimming Pool'),
      note('Перший кліп: зупини, коли Mr Bean стоїть у черзі (приблизно на 30-40 секунді, точний момент переглянь перед уроком), і запитай: Do you think he has ever been on a rollercoaster? Потім дивіться далі і перевірте здогадку з обличчя героя. Другий кліп, якщо лишився час: зупини, коли він на вишці, і запитай: Has he ever jumped from so high? Have you ever jumped from a diving board? Наприкінці учень ставить тобі 3 питання Have you ever...? про атракціони чи спорт.'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «Did you ever eat sushi?» (на уроці неправильно) → **Have you ever eaten sushi?** Досвід за все життя = Present Perfect.
2. «I haven’t never been there.» (неправильно) → **I’ve never been there.** або **I haven’t ever been there.** Never уже заперечення.
3. «Have you ever saw a ghost?» (неправильно) → **Have you ever seen a ghost?** Після have потрібна третя форма, а не друга.
4. «I have been in London.» (не так природно) → **I have been to London.** Про поїздки кажемо been to.
5. Have you ever ridden a horse? «Yes, I rode.» (неправильно) → **Yes, I have.** Коротка відповідь повторює have.`),
      ex(['choice', 'Знайди правильне речення.', `{Have you ever seen a shark?|Did you ever seen a shark?|Have you ever saw a shark?}
{I’ve never tried snowboarding.|I haven’t never tried snowboarding.|I have never try snowboarding.}
{She has been to Spain twice.|She has been in Spain two times ago.|She have been to Spain twice.}
{Has your cat ever caught a mouse?|Did your cat ever caught a mouse?|Has your cat ever catch a mouse?}
Have you ever met a famous person? {No, I haven’t.|No, I didn’t meet.|No, I haven’t met never.}
{My friends have never been to a concert.|My friends has never been to a concert.|My friends have never went to a concert.}`]),
      note('Розберіть tip, потім вправа на час. Поверни варіант учня з розминки («ти коли-небудь їв суші?») і попроси виправити.'),

      h('Speaking · 8 хв'),
      talk(`Have you ever been to another country? Where?
Have you ever eaten something really strange? What was it?
Have you ever met a famous person or a blogger?
Have you ever broken a bone or had stitches?
Have you ever lost something important? What happened?
Have you ever stayed up all night? Why?
Have you ever won a prize or a competition?
Have you ever laughed in a very quiet place, like a library or an exam?
Has your cat (or a pet you know) ever stolen your food?
Have you ever sent a message to the wrong person? What did it say?`),
      note('Обери 6-7 питань. Важливо: перше питання в Present Perfect (Have you ever...?), а деталі вже в Past Simple (When was it? What did you eat?). Не пояснюй це зараз, просто моделюй своїми уточнювальними питаннями, це місток до уроку Perfect vs Past. Друге коло: гра «Never have I ever»: учень каже I have never..., ти теж, хто першим не знайде нового речення, програв.'),

      h('Speed round · 3 хв'),
      game('Speed round: have or has, ever or never?', 'Choose have, has, ever or never', `___ you ever been to Odesa? = Have
I have ___ seen snow in July. = never
___ your mum ever played Minecraft? = Has
Have you ___ tried pineapple pizza? = ever
My cat ___ never been outside. = has
We ___ never won a football match. = have
She has ___ flown in a plane. She is scared. = never
___ your friends ever visited you? = Have
Has he ___ met your parents? = ever
They ___ been to this café twice. = have`),
      note('Швидкий темп: 5 секунд на відповідь. Після гри учень придумує одне смішне питання Have you ever...? для тебе.'),
      meme('st-girl-bow', 'Friend: Have you ever been on time for school?', 'Me: Once. In 2nd grade. By mistake.', 'Друг: Ти коли-небудь приходив до школи вчасно? Я: Один раз. У другому класі. Випадково.'),

      h('Homework · 3 хв'),
      ex(
        ['gap', 'Допиши питання і відповіді.', `[Have] you ever [tried] (try) surfing?
I [have never seen/’ve never seen] (never / see) the sea.
[Has] Tom ever [lost] (lose) his keys? Yes, he [has].
My cousins [have been/’ve been] (be) to Poland three times.
Mum isn’t here. She [has gone/’s gone] (go) to the market.`],
        ['open', 'Візьми інтерв’ю в когось із родини або друзів: 6 питань Have you ever...? Запиши відповіді.', 'Have you ever...? Yes, I have. / No, I haven’t. / I’ve never...'],
      ),
      note('Домашнє: вправа + міні-інтерв’ю. На наступному уроці учень розповідає про людину в третій особі: My dad has never... He has been to... Звертай увагу на has замість have.'),
    ],
  },

  // ---------- HOW LONG HAVE YOU...? FOR / SINCE ----------
  {
    id: 'lib-gr-for-since', title: 'How long have you...? For and since', level: 'A2', age: 'teens', topic: 'Граматика: Present Perfect (how long, for, since)', color: 'mustard', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking'],
    aims: 'Питаємо How long have you...? про те, що почалось у минулому і триває досі\nРозрізняємо for (протягом якогось часу) і since (з певного моменту)\nНе кажемо «I live here for two years», а кажемо I have lived here for two years\nРозповідаємо про свої хобі, друзів і улюблені речі: як давно',
    duration: 60,
    blocks: [
      h('Warm-up · 4 хв'),
      talk(`Where do you live? Do you like it there?
Who is your best friend? When did you meet?
Have you got a pet? How old is it?
What is your favourite hobby? When did you start?
How old is your phone?
What is your favourite band or singer right now?
Which school subject do you like the most?
How many hours can you sleep without waking up? Be honest.`),
      note('Обери 4-5 питань. Наприкінці запитай: «Як сказати англійською “я живу тут уже п’ять років”?» Майже всі учні скажуть «I live here five years» або «I am living here for five years». Запиши варіант учня, це головна помилка, яку будемо виправляти.'),

      h('Lead-in · 7 хв'),
      t(`**My profile for the school website**

Hi! My name is Taras and I’m 14. I have lived in Lviv since 2020. Before that, my family lived in a small town near Poltava.

I have been at this school for three years. I have known my best friend Ihor since our first day here. He sat on my bag and we started laughing. We have been best friends since that day!

I have played the drums for two years. My neighbours have hated me for two years too.

I have had my cat Pixel since he was a tiny kitten. Now he is huge. He has slept on my homework every evening for a month. My teacher doesn’t believe me.

I have wanted a dog for a long time, but Pixel says no.`),
      vocab(`profile = профіль, анкета
since = з (якогось моменту)
for = протягом
how long = як довго, скільки часу
know = знати, бути знайомим
neighbour = сусід
drums = барабани
hate = ненавидіти
tiny = крихітний
huge = величезний
believe = вірити
a long time = довгий час
a month = місяць
a while = якийсь час`),
      ex(['truefalse', 'Прочитай профіль і обери True або False.', `Taras has lived in Lviv for his whole life. = False
Taras has been at this school for three years. = True
Taras and Ihor have been friends since their first day at school. = True
Taras has played the drums for five years. = False
Taras has had Pixel since he was a kitten. = True
Taras has had a dog for a long time. = False`]),
      note('Учень читає текст вголос. Після True / False попроси знайти всі for і since і записати, що стоїть після них: for + three years, two years, a month, a long time; since + 2020, our first day, that day, he was a kitten. Запитай: яка різниця між цими групами? Хай учень сам здогадається: for = скільки часу, since = з якого моменту.'),

      h('Rule · 5 хв'),
      tip(`**Почалося в минулому і триває ДОСІ = Present Perfect.**
Українською ми кажемо теперішній час («я живу тут два роки»), англійською потрібен Present Perfect.

I **have lived** here **for** two years. = Я живу тут (вже) два роки.
She **has known** him **since** 2022. = Вона знає його з 2022 року.
**How long have** you **had** your cat? = Скільки часу в тебе твій кіт?

**for** + скільки часу: for ten minutes, for two days, for a week, for three years, for a long time
**since** + момент початку: since Monday, since 8 o’clock, since 2019, since May, since I was six

**Лайфхак «Таймер і календар».** For = таймер (рахує хвилини, дні, роки). Since = сторінка календаря (точка, з якої все почалося).`),
      note('Намалюй лінію часу: точка в минулому (since 2020) і стрілка до «зараз» (for 6 years). Поясни, що «I live here for two years» українці кажуть дуже часто, бо копіюють рідну мову. Для be: I have been a fan since... (а не «I am a fan since»). На все 5 хв.'),
      meme('st-cat-nightcap', 'How long have you slept?', 'Cat: Since yesterday. For about 20 hours. I’m tired.', 'Скільки ти спав? Кіт: З учора. Десь годин 20. Я втомився.'),

      h('Game: For or since? · 4 хв'),
      game('For or since?', 'Choose for or since', `___ two weeks = for
___ Monday = since
___ 2018 = since
___ ten minutes = for
___ my birthday = since
___ a long time = for
___ last summer = since
___ three days = for
___ 7 o’clock = since
___ ages = for
___ I was five = since
___ half an hour = for`),
      note('Учень сам обирає формат гри. Після кожної відповіді питай: «таймер чи календар?»'),

      h('Practice · 12 хв'),
      ex(
        ['gap', 'Розкрий дужки (Present Perfect) і допиши for або since.', `I [have known/’ve known] (know) Sasha [since] we were in kindergarten.
My mum [has worked/’s worked] (work) in this hospital [for] ten years.
We [have had/’ve had] (have) this car [since] 2021.
Oleh [has played/’s played] (play) basketball [for] four years.
They [have lived/’ve lived] (live) in this flat [since] last spring.
I [have been/’ve been] (be) a fan of this band [for] two years.
How long [have] you [had] (have) your phone?
My cat [has been/’s been] (be) under the bed [since] breakfast.`],
        ['choice', 'Обери правильний варіант.', `I have studied English {for|since|from} five years.
She has had a dog {since|for|from} last year.
How long {have you known|do you know|are you knowing} your best friend?
We {have lived|live|are living} here since 2019.
He has been sick {since|for|ago} Tuesday.
I {have had|have|had} this hoodie for ages. I love it!`],
      ),
      meme('st-cat-box', 'Me: I have had this box for one day.', 'My cat: I have lived in it since yesterday. It’s mine.', 'Я: Ця коробка в мене один день. Мій кіт: Я живу в ній з учора. Вона моя.'),
      ex(
        ['sort', 'Розклади вирази по групах.', `for: three hours; two weeks; a month; a long time; ten minutes; ages
since: 2015; Friday; my birthday; last summer; 9 o’clock; I was a kid`],
        ['translate', 'Переклади англійською.', `Я живу в Києві з 2018 року = I have lived in Kyiv since 2018 / I’ve lived in Kyiv since 2018
Ми знаємо одне одного три роки = We have known each other for three years / We’ve known each other for three years
Скільки часу в тебе цей телефон? = How long have you had this phone?
Вона грає на гітарі з дитинства = She has played the guitar since she was a child / She’s played the guitar since she was a child / She has played the guitar since childhood
Мій кіт спить уже дві години = My cat has slept for two hours / My cat has been asleep for two hours / My cat has slept for two hours already
Я фанат цієї команди з минулого року = I have been a fan of this team since last year / I’ve been a fan of this team since last year`],
      ),
      note('Gap і choice учень робить сам, потім перевірка. Sort робимо усно на швидкість. У перекладі головна пастка: український теперішній час «живу», «знаємо». Нагадай про лінію часу. Якщо учень знає Present Perfect Continuous (has been sleeping), прийми як правильне усно, але на цьому уроці тренуємо have + V3.'),

      h('Video: Mr Bean back to school · 8 хв'),
      video('https://www.youtube.com/watch?v=RVonJchNPEA', 'Watch the clip. Pause and answer: How long has Mr Bean been at the school? Since when has he had his car? How long have you been at your school?', 'Mr Bean (офіційний канал): Back to School Mr. Bean, уривок'),
      note('Перегляньте 3-4 хвилини. Зупиняй кожні 40-60 секунд (точні моменти переглянь перед уроком) і питай: How long has he been in this room? (for a minute, for two minutes...) Since when has he been here? (since he arrived). Це трохи жартівлива вправа, бо події короткі, і учням подобається рахувати хвилини. Наприкінці перейди на учня: How long have you been at your school? Since when have you known your best friend?'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «I live here for two years.» (неправильно) → **I have lived here for two years.** Триває досі = Present Perfect.
2. «I know him since 2020.» (неправильно) → **I have known him since 2020.**
3. «She has had a cat since three years.» (неправильно) → **She has had a cat for three years.** Скільки часу = for.
4. «How long do you have your phone?» (неправильно) → **How long have you had your phone?**
5. «I am a fan since 2022.» (неправильно) → **I have been a fan since 2022.** Be теж іде в Present Perfect: have been.`),
      ex(['choice', 'Знайди правильне речення.', `{I have known Anna for five years.|I know Anna for five years.|I have known Anna since five years.}
{We have lived here since 2020.|We live here since 2020.|We have lived here for 2020.}
{How long have you had your bike?|How long do you have your bike?|How long you have had your bike?}
{She has been in the band since May.|She is in the band since May.|She has been in the band for May.}
{My dad has worked there for a long time.|My dad works there since a long time.|My dad has worked there since a long time.}
{The cat has been on the sofa since lunch.|The cat is on the sofa since lunch.|The cat has been on the sofa for lunch.}`]),
      note('Розберіть tip, потім вправа на час. Поверни речення учня з розминки («я живу тут уже п’ять років») і попроси виправити.'),

      h('Speaking · 8 хв'),
      talk(`How long have you lived in your town or city?
How long have you known your best friend? How did you meet?
How long have you studied English?
How long have you had your phone? Do you want a new one?
Have you got a pet? How long have you had it?
What hobby have you had for the longest time?
Which singer or band have you liked since you were a kid?
How long have you been awake today?
What is the oldest thing in your room? How long have you had it?
How long has your cat (or a cat you know) been the boss of the house?`),
      note('Обери 6-7 питань. Вимагай повні відповіді: I have... for / since... і одне речення деталі. Друге коло, «Детектив»: учень каже одну правду і одну вигадку про себе з for / since (I have played tennis for six years), ти ставиш уточнювальні питання і вгадуєш, де вигадка. Потім міняєтеся.'),

      h('Speed round · 3 хв'),
      game('Speed round: How long?', 'Answer with for or since + the time', `It started at 9. Now it’s 11. How many hours? = for two hours
I met Ann in 2020. Since when? = since 2020
He started yesterday. Since when? = since yesterday
Monday, Tuesday, Wednesday, Thursday. How many days? = for four days
She got her cat at Christmas. Since when? = since Christmas
It started 30 minutes ago. How long? = for half an hour
I started school at age six. Since when? = since age six
Seven days. How long? = for a week
The film started at 8 pm. Since when? = since 8 pm
Twelve months. How long? = for a year`),
      note('Учень відповідає швидко, 5 секунд на картку. Прийми усно також «for 30 minutes» замість «for half an hour». Після гри учень придумує свою картку для тебе.'),
      meme('st-boy-cap', 'Me: I have waited for my pizza for 40 minutes.', 'The pizza: I have been in the oven since 2 minutes ago.', 'Я: Я чекаю на піцу вже 40 хвилин. Піца: А я в духовці аж 2 хвилини.'),

      h('Homework · 3 хв'),
      ex(
        ['gap', 'Розкрий дужки і допиши for або since.', `My brother [has had/’s had] (have) his skateboard [since] his birthday.
I [have studied/’ve studied] (study) Spanish [for] six months.
We [have known/’ve known] (know) our teacher [since] September.
Lena [has been/’s been] (be) in the school choir [for] two years.`],
        ['open', 'Напиши свій профіль для шкільного сайту (як у Тараса): 6-8 речень з for і since.', 'I have lived in... since... I have known... for... I have had... since...'],
      ),
      video('https://www.youtube.com/watch?v=9LhLjpsstPY', 'Watch Mr Bean at the exam. Write 3 sentences: How long has he been in the exam room? How long has he looked at the paper? Since when has he been nervous?', 'Mr Bean (офіційний канал): The Exam'),
      note('Домашнє: вправа + профіль про себе + 3 речення за кліпом The Exam. Перевір, щоб у профілі не було «I live here for...». На наступному уроці учень читає профіль, а ти ставиш питання How long...?'),
    ],
  },

  // ---------- PRESENT PERFECT VS PAST SIMPLE ----------
  {
    id: 'lib-gr-perfect-vs-past', title: 'I have done or I did? Perfect vs Past', level: 'A2', age: 'teens', topic: 'Граматика: Present Perfect і Past Simple', color: 'tomato', source: 'murly',
    focus: ['Grammar', 'Listening', 'Speaking'],
    aims: 'Розрізняємо Present Perfect (результат зараз, досвід, без часу) і Past Simple (закінчений час у минулому)\nПомічаємо слова-маркери: yesterday, last week, ago, in 2020 і ever, never, just, yet\nПочинаємо розмову з Have you ever...?, а деталі розповідаємо в Past Simple\nНе вживаємо Present Perfect з yesterday і ago',
    duration: 60,
    blocks: [
      h('Warm-up · 4 хв'),
      talk(`What did you do last weekend?
What have you done today?
Have you ever been to a big concert?
When was the last time you laughed really hard?
What is the best present you have ever got?
Where did you go last summer?
Have you ever forgotten your homework at home?
What did your cat (or a pet you know) do yesterday?`),
      note('Обери 4-5 питань. Це повторення двох часів, тож просто слухай, чи плутає учень. Найчастіша помилка: «I have been there last year». Запиши її для етапу «Розбір помилок». Наприкінці запитай: «У чому різниця між “I have lost my phone” і “I lost my phone yesterday”?»'),

      h('Lead-in · 7 хв'),
      audio('The lost phone', `
Nastia: Oh no, oh no, oh no! I’ve lost my phone!
Bohdan: Again? When did you last see it?
Nastia: I had it at lunch. I took a photo of my pasta.
Bohdan: Have you checked your bag?
Nastia: Yes, I have. Twice.
Bohdan: Have you looked in the canteen?
Nastia: Yes. I went there ten minutes ago. It wasn’t there.
Bohdan: Have you ever lost it before?
Nastia: Yes, many times. Last month I left it on the bus. In May I dropped it in a cake.
Bohdan: In a cake?!
Nastia: It was a birthday cake. A long story.
Bohdan: Okay, I’ve just called your number. Listen...
Nastia: I can hear it! It’s... in my hood.
Bohdan: Classic. Have you finished panicking now?
Nastia: Yes. I’ve found my phone and my dignity.`),
      vocab(`lose = губити
check = перевіряти
canteen = їдальня
ago = тому
before = раніше
last month = минулого місяця
drop = упустити
a long story = довга історія
hood = капюшон
panic = панікувати
find = знаходити
dignity = гідність
result = результат
experience = досвід`),
      ex(['truefalse', 'Послухай діалог і обери True або False.', `Nastia has lost her phone. = True
She took a photo of her pasta at lunch. = True
She went to the canteen an hour ago. = False
She has never lost her phone before. = False
Last month she left her phone on the bus. = True
The phone was in her bag. = False`]),
      note('Перше слухання: що сталося і де телефон? Друге: True / False. Потім попроси учня виписати речення в дві колонки: з have / has (I’ve lost, Have you checked, Have you ever lost, I’ve just called, I’ve found) і з минулим часом (I had, I took, I went ten minutes ago, Last month I left, In May I dropped). Запитай: чому в другій колонці Past Simple? Підказка: подивись, що стоїть поруч (ago, last month, in May).'),

      h('Rule · 5 хв'),
      tip(`**Головне питання: чи сказано, КОЛИ саме?**

**Past Simple** (did, went, saw): час закінчився і він названий або зрозумілий.
yesterday, last week, last year, two days ago, in 2020, when I was five, What time...? When...?
I **lost** my phone **yesterday**. = Я загубив телефон учора.

**Present Perfect** (have done): час не названий, важливий результат зараз або досвід.
ever, never, just, already, yet, for, since, today, this week
I**’ve lost** my phone! = Я загубив телефон! (і зараз його немає)

**Як говорять у житті:** питання про досвід у Present Perfect, деталі в Past Simple.
Have you ever **been** to Lviv? Yes, I have. I **went** there last summer. It **was** great!

**Лайфхак «Стоп-слова».** Yesterday, ago, last і When? це червоне світло для have. Побачив їх, вмикай Past Simple.`),
      note('Намалюй дві шкали: одна закінчується в минулому (Past Simple, конкретна точка), друга тягнеться до «зараз» (Present Perfect). Склади з учнем пару: I have been to Lviv. / I went to Lviv last summer. На все 5 хв.'),
      meme('st-cat-coffee', 'Me: I have finished my homework!', 'Teacher: When? Me: ...Define “finished”.', 'Я: Я закінчив домашку! Вчитель: Коли? Я: ...Що ти маєш на увазі під «закінчив»?'),

      h('Game: Past or Perfect? · 4 хв'),
      game('Past or Perfect?', 'Which tense goes with this word: Past Simple or Present Perfect?', `yesterday = Past Simple
ever = Present Perfect
two days ago = Past Simple
just = Present Perfect
last summer = Past Simple
yet = Present Perfect
in 2019 = Past Simple
never = Present Perfect
When...? = Past Simple
since Monday = Present Perfect
already = Present Perfect
when I was six = Past Simple`),
      note('Учень сам обирає формат гри. Після кожної пари хай складе коротке речення з цим словом.'),

      h('Practice · 12 хв'),
      ex(
        ['gap', 'Розкрий дужки. Past Simple чи Present Perfect?', `I [saw] (see) this film last week.
I [have seen/’ve seen] (see) this film three times.
She [has just left/’s just left] (just / leave). You can still catch her!
We [went] (go) to the sea two years ago.
[Have] you ever [been] (be) to Kharkiv?
When [did] you [buy] (buy) these sneakers?
My cat [has broken/’s broken] (break) my headphones. Now I can’t listen to music!
Taras [won] (win) the chess competition in 2024.`],
        ['choice', 'Обери правильний варіант.', `I {lost|have lost} my keys yesterday.
Look! I {have cut|cut} my hair. Do you like it?
{Have you ever eaten|Have you ever ate|Did you ever ate} frogs’ legs?
She {has never been|has never went|never has be} to a football match.
When {did you start|have you started} learning English?
We {have already watched|have already watch|already have watching} this episode, so let’s watch a new one.`],
      ),
      meme('st-cat-shock', 'Owner: Who has broken my favourite cup?', 'Cat: I did it two minutes ago. But I haven’t done anything today.', 'Власник: Хто розбив мою улюблену чашку? Кіт: Я це зробив дві хвилини тому. Але сьогодні я нічого не робив.'),
      ex(
        ['match', 'Склади діалог: питання і відповідь.', `Have you ever been to Italy? = Yes, I have. I went there in 2023.
When did you go there? = Two years ago, in summer.
Have you finished the book yet? = Yes, I finished it last night.
Have you ever tried karaoke? = Yes, once. I sang terribly.
What did you eat for breakfast? = Pancakes with honey.
Has your sister passed her test? = Yes, she has. She’s so happy.`],
        ['translate', 'Переклади англійською.', `Я загубив ключі! (і зараз їх немає) = I have lost my keys! / I’ve lost my keys!
Я загубив ключі вчора = I lost my keys yesterday
Ти коли-небудь був у Франції? = Have you ever been to France?
Коли ти туди їздив? = When did you go there?
Вона щойно прийшла = She has just come / She’s just come / She has just arrived / She’s just arrived
Ми бачили цей фільм минулого тижня = We saw this film last week / We saw this movie last week`],
      ),
      note('Gap і choice учень робить сам, потім перевірка. Для кожної відповіді питай: «Сказано, коли? Яке слово-маркер?» У match зверни увагу на модель «Have you ever...? Yes, I have. I went...». У перекладі перші два речення навмисно схожі: поясни різницю.'),

      h('Video: BBC and Mr Bean · 8 хв'),
      video('https://www.youtube.com/watch?v=PgsG98vByiw', 'Watch and write down 3 time words that go with the past simple (for example: yesterday). Are there any with Present Perfect? Why not?', 'BBC Learning English (офіційний канал): The past simple tense, 6 Minute Grammar'),
      video('https://www.youtube.com/watch?v=6aK2CKrdjbE', 'Watch the chemistry lesson. Pause and say: What has Mr Bean just done? Then retell: What did he do first, second and third?', 'Mr Bean (офіційний канал): Chemistry Experiment'),
      note('Перше відео: перегляньте 2-3 хвилини (уривок обери перед уроком), учень виписує слова-маркери Past Simple. Друге відео головне: зупиняй після кожної дії (орієнтовно кожні 30-40 секунд, моменти переглянь заздалегідь) і питай What has he just done? (He has just put... He has just dropped...). Після перегляду учень переказує сцену в Past Simple: First he sat down. Then he... Так учень бачить обидва часи на одній історії.'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «I have been to Lviv last year.» (неправильно) → **I went to Lviv last year.** Last year = Past Simple.
2. «I have seen him two days ago.» (неправильно) → **I saw him two days ago.** Ago тільки з Past Simple.
3. «When have you started?» (неправильно) → **When did you start?** Питання When...? = Past Simple.
4. «Did you ever try sushi?» (на уроці неправильно) → **Have you ever tried sushi?** Досвід за життя = Present Perfect.
5. «Yesterday I have played football.» (неправильно) → **Yesterday I played football.**`),
      ex(['choice', 'Знайди правильне речення.', `{I saw this film yesterday.|I have seen this film yesterday.|I have saw this film yesterday.}
{When did you get your phone?|When have you got your phone?|When you got your phone?}
{She has never flown in a plane.|She never has flew in a plane.|She has never flew in a plane.}
{We moved here three years ago.|We have moved here three years ago.|We have moved here since three years.}
{Have you ever met a famous person?|Did you ever met a famous person?|Have you ever meet a famous person?}
{I have lost my pen. Can I borrow yours?|I have lost my pen yesterday. Can I borrow yours?|I have lose my pen. Can I borrow yours?}`]),
      note('Розберіть tip, потім вправа на час. В останньому реченні другий варіант неправильний через yesterday, третій через форму lose. Поверни помилку з розминки і попроси виправити.'),

      h('Speaking · 8 хв'),
      talk(`Have you ever been to a big city? When did you go there? What did you do?
Have you ever cooked a meal for your family? What did you cook?
What have you done this week that you are proud of?
Have you ever met someone famous? Where did you meet them?
What did you do last weekend? Have you done anything fun today?
Have you ever lost something important? When did it happen?
Have you seen any good films recently? When did you see the last one?
Have you ever fallen asleep in a really strange place? Where?
Has your cat (or a pet you know) ever done something embarrassing? What did it do?
Have you ever said “I’ve done my homework” when you haven’t? What happened?`),
      note('Обери 6-7 питань. Модель для кожної відповіді: коротка відповідь у Present Perfect + 2 речення деталей у Past Simple. Друге коло, «Інтерв’ю зірки»: учень бере в тебе інтерв’ю (Have you ever...? When did you...? What did you...?), потім міняєтеся. Записуй помилки на змішування часів і розбери 2-3 наприкінці.'),

      h('Speed round · 3 хв'),
      game('Speed round: choose the form', 'Write the right form of the verb in brackets', `I ___ (see) her yesterday. = saw
I have never ___ (see) snow. = seen
We ___ (go) to the zoo last Sunday. = went
She has ___ (go) home. She isn’t here. = gone
Have you ___ (eat) yet? = eaten
I ___ (eat) pizza two hours ago. = ate
He ___ (buy) a bike in May. = bought
They have just ___ (buy) tickets. = bought
I have ___ (lose) my phone! = lost
When ___ (do) you arrive? = did`),
      note('Швидкий темп. Звертай увагу на пари saw / seen, went / gone, ate / eaten: учень має пояснити, чому тут друга форма, а тут третя.'),
      meme('st-cat-blep', 'Have you ever seen a cat this cute?', 'Yes. I saw one in the mirror this morning.', 'Ти коли-небудь бачив такого милого кота? Так. Я бачив одного в дзеркалі сьогодні вранці.'),

      h('Homework · 3 хв'),
      ex(
        ['gap', 'Past Simple чи Present Perfect?', `[Have] you ever [tried] (try) Georgian food?
Yes, I [have]. I [tried] (try) khachapuri last summer.
My parents [have just bought/’ve just bought] (just / buy) a new TV.
I [met] (meet) my best friend in 2021.
Oh no! I [have forgotten/’ve forgotten] (forget) my lunch at home.`],
        ['open', 'Напиши 3 міні-історії за моделлю: Have you ever...? Yes, I have. + 2-3 речення в Past Simple (коли, де, що сталося).', 'I have been to... I went there... It was... / I have tried... I tried it...'],
      ),
      note('Домашнє: вправа + 3 міні-історії. Перевір, щоб в історіях не було Present Perfect поряд з last, ago, in 2020. На наступному уроці учень розповідає одну історію усно.'),
    ],
  },

  // ---------- PASSIVE: IS DONE / WAS DONE ----------
  {
    id: 'lib-gr-passive', title: 'It is made, it was built: the passive', level: 'A2', age: 'teens', topic: 'Граматика: пасивний стан (is done / was done)', color: 'pink', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking'],
    aims: 'Будуємо пасив: am / is / are + V3 і was / were + V3\nРозуміємо, коли важливо не хто зробив, а що сталося з предметом\nВживаємо by, щоб сказати, хто зробив: painted by Leonardo\nРозповідаємо, де і з чого зроблені речі навколо нас',
    duration: 60,
    blocks: [
      h('Warm-up · 4 хв'),
      talk(`What is your favourite snack? Do you know where it comes from?
Look at your clothes. Where do you think they come from?
What is your favourite book or film? Who wrote or made it?
Which famous building do you want to see?
What is your favourite app? Who created it?
What do you think: who invented pizza?
How old is your school building?
Who cleans your room: you, your parents or nobody?`),
      note('Обери 4-5 питань. Наприкінці покажи будь-яку річ (ручку, телефон) і запитай: «Як сказати англійською “це зроблено в Китаї”?» Учні часто кажуть «It made in China» або «It is make in China». Запиши варіант учня.'),

      h('Lead-in · 7 хв'),
      t(`**Fun facts quiz from our school blog**

1. The Harry Potter books were written by J. K. Rowling. The first book was published in 1997.
2. The Eiffel Tower was built for a big exhibition in Paris in 1889. Many people hated it at first!
3. The Mona Lisa was painted by Leonardo da Vinci. Today it is visited by millions of people every year.
4. The first video on YouTube was uploaded in 2005. It is only 19 seconds long and it is about elephants at a zoo.
5. Tea is grown in China, India and many other countries. In Britain, about 100 million cups of tea are drunk every day.
6. Bubble tea was invented in Taiwan in the 1980s.

And one fact about our school: the windows in our classroom are cleaned once a year. You can see it.`),
      vocab(`fun fact = цікавий факт
write = писати
publish = видавати, публікувати
build = будувати
exhibition = виставка
paint = малювати фарбами
visit = відвідувати
upload = завантажувати (в мережу)
grow = вирощувати
invent = винаходити
clean = прибирати, чистити
made in = виготовлено в
by = (ким) кимось
million = мільйон`),
      ex(['truefalse', 'Прочитай факти і обери True або False.', `The Harry Potter books were written by J. K. Rowling. = True
The Eiffel Tower was built in 1999. = False
The Mona Lisa was painted by Leonardo da Vinci. = True
The first YouTube video was uploaded in 2005. = True
Tea is grown only in Britain. = False
Bubble tea was invented in Japan. = False`]),
      note('Перед читанням учень вгадує відповіді на питання (Who wrote Harry Potter? When was the Eiffel Tower built?), потім читає і перевіряє. Після True / False попроси підкреслити всі is / are / was / were + V3. Запитай: хто будував Ейфелеву вежу? Хто вирощує чай? Чи важливо це в тексті? Учень сам помітить: важлива річ, а не людина.'),

      h('Rule · 5 хв'),
      tip(`**Пасив = be + третя форма дієслова (V3).**
Важливо не ХТО зробив, а ЩО сталося з предметом.

**Present:** am / is / are + V3
Pizza **is made** with cheese. = Піцу роблять (готують) з сиром.
These phones **are made** in Korea. = Ці телефони виготовляють у Кореї.

**Past:** was / were + V3
This house **was built** in 1950. = Цей будинок побудували в 1950 році.
The cakes **were eaten** in five minutes. = Торти з’їли за п’ять хвилин.

**Хто зробив?** Додаємо **by**: The Mona Lisa was painted **by** Leonardo.
**Заперечення і питання:** It **isn’t** made in China. | **Was** it **built** in 2000?

**Лайфхак «Головний герой».** В активному реченні герой той, хто робить (Leonardo painted it). У пасиві героєм стає предмет (It was painted). Українською часто кажемо «його побудували», «тут продають», а англійською це пасив.`),
      note('Напиши активне речення Leonardo painted the Mona Lisa і стрілкою переверни: The Mona Lisa was painted by Leonardo. Покажи, що be бере на себе час (is / was), а дієслово завжди V3. На все 5 хв.'),
      meme('st-cat-cool', 'This sofa was bought for the family.', 'But it is used only by me.', 'Цей диван купили для сім’ї. Але користуюсь ним тільки я.'),

      h('Game: is, are, was or were? · 4 хв'),
      game('Is, are, was or were?', 'Choose is, are, was or were', `English ___ spoken in many countries. = is
These sneakers ___ made in Vietnam. = are
This castle ___ built 500 years ago. = was
The cookies ___ eaten last night. = were
Our homework ___ checked every Monday. = is
The first iPhone ___ sold in 2007. = was
Bananas ___ grown in hot countries. = are
The windows ___ broken yesterday. = were
Breakfast ___ served at 8 every day. = is
The Harry Potter films ___ made in Britain. = were`),
      note('Учень сам обирає формат гри. Для кожної відповіді питай дві речі: однина чи множина? теперішнє чи минуле?'),

      h('Practice · 12 хв'),
      ex(
        ['gap', 'Розкрий дужки. Вжий пасив (is / are / was / were + V3).', `Coffee [is grown] (grow) in Brazil.
This song [was written] (write) in 2015.
The school canteen [is cleaned] (clean) every evening.
These photos [were taken] (take) on my phone.
Paper [is made] (make) from wood.
The match [was played] (play) in the rain.
Our classroom [was painted] (paint) last summer.
Thousands of selfies [are posted] (post) every minute.`],
        ['choice', 'Обери правильний варіант.', `My bike {was stolen|stole|was steal} last week.
These shoes {are made|made|are make} in Italy.
The lesson {was cancelled|cancelled|is cancel} yesterday.
Pizza {is eaten|eats|is eat} all over the world.
The windows {were cleaned|was cleaned|cleaned} last Friday.
This book {was written by|was written from|wrote by} a 15-year-old girl.`],
      ),
      meme('st-cat-box', 'The box was bought for the new TV.', 'The TV was thrown away. The box was kept.', 'Коробку купили для нового телевізора. Телевізор викинули. Коробку залишили.'),
      ex(
        ['sort', 'Теперішній чи минулий пасив?', `present: is made; are grown; is spoken; are sold; is cleaned
past: was built; were eaten; was painted; were taken; was invented`],
        ['translate', 'Переклади англійською.', `Цей телефон зроблено в Китаї = This phone is made in China / This phone was made in China
Англійською мовою розмовляють у багатьох країнах = English is spoken in many countries
Цей будинок побудували в 1990 році = This house was built in 1990
Моє печиво з’їли = My cookies were eaten / My biscuits were eaten
Ці фото зробили в Карпатах = These photos were taken in the Carpathians / These photos were taken in the Carpathian Mountains
Картину намалювала моя сестра = The picture was painted by my sister / The painting was painted by my sister / The picture was drawn by my sister`],
      ),
      note('Gap і choice учень робить сам, потім перевірка. Головна пастка: «It made in China» без be. Друга: was / were (The windows were). У перекладі допомагай знайти, що українською пасив звучить як «побудували», «з’їли», «розмовляють».'),

      h('Video: Mr Bean at the fete · 8 хв'),
      video('https://www.youtube.com/watch?v=PX1d-R59PaA', 'Watch for 2-3 minutes. Then answer: What was sold at the fete? What prizes were given? What was eaten? Use was / were + V3.', 'Mr Bean (офіційний канал): Village Fete'),
      video('https://www.youtube.com/watch?v=_Ot_vJLJ86M', 'Watch and answer: When were the exam papers given out? Was Mr Bean helped by anyone? Was the exam finished on time?', 'Mr Bean (офіційний канал): The Exam Cheat'),
      note('Перший кліп: зупиняй кожні 40-60 секунд (точні моменти переглянь перед уроком) і питай: What is sold here? Is it made at home? Was anything broken? Учень відповідає пасивом (Cakes are sold. The ... was broken). Підкажи V3, якщо треба: sold, given, won, broken. Другий кліп опційно, якщо є час: зупини, коли роздають екзаменаційні листи (The papers are given out).'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «It made in China.» (неправильно) → **It is made in China.** Без be пасиву немає.
2. «The house was build in 1990.» (неправильно) → **The house was built in 1990.** Потрібна третя форма.
3. «The windows was cleaned.» (неправильно) → **The windows were cleaned.** Множина = were.
4. «This book was written from J. K. Rowling.» (неправильно) → **This book was written by J. K. Rowling.** Хто зробив = by.
5. «In this shop sell phones.» (неправильно) → **Phones are sold in this shop.** Українське «продають» без «хто» = пасив.`),
      ex(['choice', 'Знайди правильне речення.', `{Tea is grown in India.|Tea grown in India.|Tea is grow in India.}
{The bridge was built in 1960.|The bridge built in 1960.|The bridge was build in 1960.}
{The cakes were eaten by the kids.|The cakes was eaten by the kids.|The cakes were eat by the kids.}
{This photo was taken by my dad.|This photo was taken from my dad.|This photo took by my dad.}
{Phones are sold in this shop.|In this shop sell phones.|Phones sold in this shop.}
{Was the window broken by the cat?|Did the window broken by the cat?|Was the window break by the cat?}`]),
      note('Розберіть tip, потім вправа на час. Поверни речення учня з розминки («це зроблено в Китаї») і попроси виправити.'),

      h('Speaking · 8 хв'),
      talk(`Look at three things on your desk. Where are they made?
What is your phone made of? Where was it made?
When was your school built? Do you know?
Which languages are spoken in your family?
Which famous book was written by your favourite writer?
What food is eaten in your family on holidays?
Which famous building was built a very long time ago? Have you seen it?
What was invented by a teenager, do you think?
Which of your things was broken by a pet or a little brother or sister?
Imagine your room is a museum. Which objects are shown there and why?`),
      note('Обери 6-7 питань. Підказуй V3 потрібних дієслів (made, built, spoken, written, eaten, invented, broken). Друге коло, «Музей»: учень обирає 3 речі в кімнаті і проводить «екскурсію»: This chair was bought in 2020. It is used by my cat. Ти ставиш питання Was it...? Where was it made?'),

      h('Speed round · 3 хв'),
      game('Speed round: Who made it?', 'Answer the quiz question', `The Mona Lisa was painted by ___. = Leonardo da Vinci
The Harry Potter books were written by ___. = J. K. Rowling
The Eiffel Tower is in ___. = Paris
Bubble tea was invented in ___. = Taiwan
The first YouTube video was about ___. = elephants
Pizza Margherita was first made in ___. = Italy
Coffee is made from ___. = beans
Paper is made from ___. = wood
Cheese is made from ___. = milk
Chips are made from ___. = potatoes`),
      note('Грайте як телевікторину. Учень відповідає не лише словом, а й повним реченням: The Mona Lisa was painted by Leonardo da Vinci. Після гри учень придумує 2 свої питання для тебе з was ... by?'),
      meme('st-boy-cap', 'Teacher: Who ate the cookies from the staff room?', 'Me: The cookies were eaten. That’s all I know.', 'Вчитель: Хто з’їв печиво з учительської? Я: Печиво було з’їдене. Це все, що я знаю.'),

      h('Homework · 3 хв'),
      ex(
        ['gap', 'Вжий пасив.', `Chocolate [is made] (make) from cocoa beans.
The first Harry Potter book [was published] (publish) in 1997.
These sweaters [were knitted] (knit) by my grandma.
Football [is played] (play) all over the world.
My phone [was found] (find) under the sofa.`],
        ['open', 'Напиши «Fun facts quiz» з 6 фактів у пасиві про речі, які ти любиш (їжа, ігри, фільми, місця). Перевір факти в інтернеті.', 'Minecraft was created by... ... is made in... ... was built in...'],
      ),
      note('Домашнє: вправа + свій квіз з 6 фактів. На наступному уроці учень ставить тобі питання зі свого квізу, а ти відповідаєш пасивом. Перевір, щоб не було «It made...» без be.'),
    ],
  },
];
