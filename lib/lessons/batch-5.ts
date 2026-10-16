// Бібліотека, пакет 5: граматика для підлітків A1-A2, порядок тем як у червоній книзі Murphy.
// Усі тексти, приклади і вправи власні (з книги беремо лише назви тем).
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, ex, talk } = makeHelpers('b5');

export const BATCH_5: Plan[] = [
  // ---------- AM / IS / ARE ----------
  {
    id: 'lib-gr-to-be', title: 'Am, is, are: meet my squad', level: 'A1', age: 'teens', topic: 'Граматика: to be', color: 'lime', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking'],
    aims: 'Знаю, коли казати am, is, are\nВмію утворювати заперечення: I’m not, he isn’t, they aren’t\nВикористовую короткі форми I’m, she’s, we’re\nМожу розповісти про себе і друзів 5-6 реченнями',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What’s your name?
How old are you?
Where are you from?
What’s your favourite food?
Who is your best friend?`),
      note('Почни з себе: «I’m Anna. I’m a teacher. I’m not a cat, but my cat is very important.» Учень відповідає на питання повними реченнями, якщо може, але не виправляй на цьому етапі. Мета: почути, чи учень уже плутає am / is / are, і відзначити собі типові помилки на потім.'),

      h('Lead-in · 8 хв'),
      t(`**Meet my squad!** (a post by Sofia, 13)

Hi, I’m Sofia and I’m from Lviv. I’m in Year 8. This is my squad!

**Dan** is my best friend. He’s funny and he’s really good at football. He isn’t good at maths, but that’s OK, I am!

**Mia and Kira** are twins. They’re 14. They aren’t in my class, but we’re in the same dance club.

And this is **Biscuit**. Biscuit is our cat. She’s orange and she’s very lazy. She isn’t a fan of dogs. She’s a fan of the sofa.

We aren’t perfect, but we’re a great team!`),
      ex(['truefalse', 'Прочитай пост і обери True або False.', `Sofia is from Kyiv. = False
Dan is good at football. = True
Dan is good at maths. = False
Mia and Kira are in Sofia’s class. = False
Biscuit is orange. = True
Biscuit is a fan of dogs. = False`]),
      note('Учень читає вголос по абзацу. Після True / False попроси знайти в тексті всі am, is, are і ’m, ’s, ’re та підкреслити (або назвати). Запитай: «Чому про Dan is, а про Mia and Kira are?» Нехай учень сам спробує сформулювати правило, а потім переходь до таблиці.'),

      h('Rule · 10 хв'),
      tip(`**To be** це дієслово «бути». Українською ми його часто пропускаємо («Я голодний»), а англійською БЕЗ нього речення не працює: **I am hungry.**

**Хто + яка форма:**
I → **am** (I’m) · I **am** tired. = Я втомлений.
he / she / it → **is** (he’s, she’s, it’s) · My cat **is** lazy. = Мій кіт лінивий.
you / we / they → **are** (you’re, we’re, they’re) · We **are** friends. = Ми друзі.

Лайфхак: **am** тільки з **I**, як кіт, що любить тільки одного господаря. **Is** для одного (він, вона, воно), **are** для багатьох і для **you**.`),
      tip(`**Заперечення:** додаємо **not** після am / is / are.

I **am not** (I’m not) late. = Я не запізнююсь.
She **is not** (she isn’t / she’s not) at home. = Її немає вдома.
They **are not** (they aren’t / they’re not) bored. = Їм не нудно.

Увага: **amn’t** не буває! Тільки **I’m not**.`),
      note('Поясни на прикладі учня і його друзів: «You are a student. I am a teacher. Your friend is…». Типові помилки українськомовних учнів: пропуск дієслова (She happy), «I is», «They is», «I amn’t». Також «He is 13 years» без old: можна просто He’s 13. Попроси учня скласти по одному реченню для кожної форми, перш ніж іти далі.'),

      h('Practice · 15 хв'),
      ex(
        ['gap', 'Встав am, is або are.', `I [am] in Year 7.
My brother [is] 16.
My friends [are] at the skate park.
The cat [is] under the bed.
You [are] my favourite teacher!
We [are] in the same class.
Maths [is] my favourite subject.
Lucas and I [are] gamers.`],
        ['choice', 'Обери правильний варіант.', `My phone {isn’t|aren’t|am not} new.
I {’m not|isn’t|aren’t} hungry, thanks.
My parents {aren’t|isn’t|am not} at home today.
It {isn’t|aren’t|amn’t} cold today.
We {aren’t|isn’t|am not} late!
Biscuit {isn’t|aren’t|am not} a dog.`],
      ),
      ex(
        ['sort', 'Розклади слова за формою to be.', `am: I
is: he; she; it; my cat; Dan; the school
are: you; we; they; my friends; Mia and Kira`],
        ['translate', 'Переклади англійською.', `Я не втомлений. = I’m not tired / I am not tired
Мій кіт дуже смішний. = My cat is very funny / My cat’s very funny
Ми не в школі. = We aren’t at school / We are not at school / We’re not at school
Вона моя найкраща подруга. = She’s my best friend / She is my best friend
Вони з Одеси. = They’re from Odesa / They are from Odesa
Він не голодний. = He isn’t hungry / He is not hungry / He’s not hungry`],
      ),
      note('Перша вправа на форму, друга на заперечення. У Sort звернути увагу: my cat, Dan, the school це все «він / вона / воно», тому is. У перекладі прийми будь-яку правильну коротку чи повну форму. Якщо учень пише «I amn’t», поверни до таблиці.'),

      h('Speaking · 10 хв'),
      talk(`Tell me about you: name, age, city. (I’m…)
Describe your best friend in 3 sentences. (He’s… / She’s…)
What are you NOT? Say 3 things. (I’m not a morning person…)
Describe your pet or a pet you want.
Is your school big or small? Is it far from your home?
Who is your favourite singer or YouTuber? Where is he or she from?`),
      note('Гра «Two truths and a lie»: учень каже 3 речення про себе з to be (I’m 13. My cat is black. My brother is a pilot.), ти вгадуєш, що неправда, і відповідаєш запереченням: «Your brother isn’t a pilot!» Потім міняєтеся. Виправляй тільки помилки з am / is / are, не перебивай, а повтори правильно після відповіді.'),

      h('Game: Fix the cat’s post · 7 хв'),
      t(`Biscuit the cat wrote her own post, but her grammar is terrible. Help her!`),
      ex(['choice', 'Обери правильне речення.', `{I am a cat.|I is a cat.|I are a cat.}
{My humans are nice.|My humans is nice.|My humans am nice.}
{The sofa is my best friend.|The sofa are my best friend.|The sofa my best friend.}
{I’m not a fan of baths.|I amn’t a fan of baths.|I isn’t a fan of baths.}
{The dog next door isn’t cool.|The dog next door aren’t cool.|The dog next door not cool.}
{We are a happy family.|We is a happy family.|We am a happy family.}`]),
      note('Читай речення «котячим» голосом, буде веселіше. Після вправи учень може дописати ще 2 речення від імені Biscuit. Відповіді: правильний варіант завжди з потрібною формою to be; звертай увагу на пропуск дієслова (The sofa my best friend).'),

      h('Homework · 5 хв'),
      ex(['open', 'Напиши 6 речень: 3 позитивні і 3 заперечні.', `Write about you: 3 true sentences with am / is / are.
Write about your friend or pet: 3 sentences with isn’t / aren’t / ’m not.`]),
      note('Домашка: міні-пост «Meet my squad» про себе і 2-3 друзів або тварин (6-8 речень), як у тексті Sofia. Обов’язково 2 заперечення. На наступному уроці учень прочитає свій пост, а ти поставиш до нього питання (наступна тема: питання з am / is / are).'),
    ],
  },

  // ---------- AM / IS / ARE QUESTIONS ----------
  {
    id: 'lib-gr-to-be-questions', title: 'Are you a cat person?', level: 'A1', age: 'teens', topic: 'Граматика: to be (питання)', color: 'sky', source: 'murly',
    focus: ['Grammar', 'Listening', 'Speaking'],
    aims: 'Вмію ставити питання з am, is, are\nВідповідаю коротко: Yes, I am. / No, she isn’t.\nСтавлю питання з where, how old, what, who\nМожу взяти «інтерв’ю» в нового друга',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`Are you tired today?
Is your school far from your home?
Are you a cat person or a dog person?
Is your best friend in your class?`),
      note('Учень, найімовірніше, відповідатиме «Yes» або «No». Це нормально: на цьому уроці ми навчимося відповідати коротко і правильно (Yes, I am). Перевір домашній пост з минулого уроку: попроси прочитати і постав 2-3 питання до нього.'),

      h('Lead-in · 8 хв'),
      audio('New in class', `A: Hi! Are you new here?
B: Yes, I am. I’m Max.
A: I’m Lena. Nice to meet you! Where are you from, Max?
B: I’m from Dnipro.
A: Cool. Is your family here too?
B: Yes, it is. My mum, my dad and my little sister.
A: How old is she?
B: She’s eight. She’s a bit annoying, but she’s OK.
A: Ha! Are you into sports?
B: Not really. I’m into games and drawing. Are you a gamer?
A: No, I’m not. But my brother is. Hey, is that a cat on your backpack?
B: Yes, it is! That’s Pixel. He’s my cat. Well, a keychain of my cat.
A: Are cats your favourite animals?
B: Yes, they are!`),
      ex(['choice', 'Послухай (або прочитай) і обери правильну відповідь.', `Is Max new at school? {Yes, he is.|No, he isn’t.}
Where is Max from? {Dnipro|Lviv|Kharkiv}
How old is Max’s sister? {eight|ten|six}
Is Max into sports? {No, he isn’t.|Yes, he is.}
Is Lena a gamer? {No, she isn’t.|Yes, she is.}
What is Pixel? {a cat|a dog|a game}`]),
      note('Якщо немає озвучки, прочитай діалог за ролями з учнем. Після вправи попроси знайти всі питання в діалозі і подивитися, що стоїть на першому місці. Підведи до висновку: у питанні am / is / are міняється місцями з підметом.'),

      h('Rule · 10 хв'),
      tip(`**Питання:** am / is / are стрибає НА ПОЧАТОК, перед підметом. Як кіт, який стрибає на стіл першим.

You **are** hungry. → **Are** you hungry? = Ти голодний?
She **is** at home. → **Is** she at home? = Вона вдома?
I **am** late. → **Am** I late? = Я запізнююсь?

**Короткі відповіді** (у них немає скорочень у «так»):
Are you OK? → Yes, I **am**. / No, I**’m not**.
Is he 14? → Yes, he **is**. / No, he **isn’t**.
Are they friends? → Yes, they **are**. / No, they **aren’t**.

Неправильно: Yes, I’m. Yes, he’s. (так не кажуть)`),
      tip(`**Питальні слова** ставимо ще раніше, на самий початок:

**Where** are you from? = Звідки ти?
**How old** is your sister? = Скільки років твоїй сестрі?
**What** is your favourite game? = Яка твоя улюблена гра?
**Who** is that boy? = Хто той хлопець?
**Why** are you sad? = Чому ти сумний?

Формула: **Питальне слово + am / is / are + хто? + решта**`),
      note('Типові помилки: «You are from where?», «Where you are from?», «How old are your sister?», «Yes, I’m». Поясни, що в коротких відповідях «так» не скорочуємо, бо наголос падає на дієслово. Відпрацюй інтонацію: у Yes / No питаннях голос іде вгору, у питаннях з where / what вниз.'),

      h('Practice · 15 хв'),
      ex(
        ['gap', 'Постав am, is або are, щоб вийшло питання.', `[Are] you ready for the test?
[Is] your cat black?
[Am] I in your team?
[Are] your parents at work?
[Is] it your birthday today?
Where [is] the canteen?
How old [are] your cousins?
Why [are] you late?`],
        ['choice', 'Обери правильну коротку відповідь.', `Are you 13? Yes, {I am|I’m|I is}.
Is your brother at home? No, {he isn’t|he aren’t|he not}.
Are your friends gamers? Yes, {they are|they’re|they is}.
Is it cold outside? No, {it isn’t|it aren’t|it not is}.
Am I late? No, {you aren’t|you isn’t|I’m not}.
Is Biscuit hungry? Yes, {she is|she’s|she are}.`],
      ),
      ex(
        ['match', 'Знайди відповідь на питання.', `Where are you from? = I’m from Poltava.
How old is your sister? = She’s eleven.
Who is your best friend? = It’s Taras.
What is your favourite subject? = It’s art.
Are you into music? = Yes, I am.
Is your teacher strict? = No, she isn’t.`],
        ['translate', 'Переклади англійською.', `Ти голодний? = Are you hungry?
Твоя мама вдома? = Is your mum at home? / Is your mom at home?
Де мій телефон? = Where is my phone? / Where’s my phone?
Скільки тобі років? = How old are you?
Вони в парку? = Are they in the park?
Хто це? = Who is it? / Who’s that? / Who is that? / Who’s it?`],
      ),
      note('Перед перекладом нагадай: «Скільки тобі років?» англійською це «Скільки старий ти?» = How old are you? Учні часто пишуть How many years you have. Якщо учень плутає is / are у питаннях з where, нехай спочатку знайде підмет (the canteen = it, your cousins = they).'),

      h('Speaking · 10 хв'),
      talk(`Are you a morning person or a night person?
Is your bedroom tidy? Be honest!
Are your friends into the same music as you?
Where is your favourite place in your town?
Who is your favourite person in your family? Why?
Is English easy or difficult for you?
Are you good at cooking?`),
      note('Учень відповідає короткою відповіддю + одним реченням (Yes, I am. I get up at 6!). Потім поміняйтеся: учень ставить ці ж питання тобі. Стеж, щоб він ставив am / is / are на початок. Відповідай чесно і весело, щоб учень почув природні відповіді.'),

      h('Game: 20 questions · 7 хв'),
      ex(['choice', 'Розминка: обери правильне питання.', `{Is it an animal?|It is an animal?|Are it an animal?}
{Is it big?|Big is it?|Are it big?}
{Is it in your house?|Is in your house it?|It in your house?}
{Are you a famous person?|You are a famous person?|Is you a famous person?}
{Where is it from?|Where it is from?|Where are it from?}
{What colour is it?|What colour it is?|What colour are it?}`]),
      note('Після вправи гра «20 questions»: ти загадуєш тварину, предмет або відому людину, учень ставить тільки Yes / No питання з is / are (Is it an animal? Is it big? Is it orange?). Ти відповідаєш короткими відповідями. Потім загадує учень. Перемагає той, хто вгадає за меншу кількість питань.'),

      h('Homework · 5 хв'),
      ex(['open', 'Напиши 6 питань для інтерв’ю з новим однокласником і відповідай на них про себе.', `Write 3 Yes / No questions with am / is / are.
Write 3 questions with where / how old / who / what.
Answer all 6 questions about you.`]),
      note('Домашка: «Interview card». Учень пише 6 питань і свої відповіді. Якщо є можливість, нехай поставить ці питання другу або комусь із родини і запише його відповіді (short answers). На наступному уроці перевір 2-3 питання усно.'),
    ],
  },

  // ---------- PRESENT CONTINUOUS ----------
  {
    id: 'lib-gr-present-continuous', title: 'What’s happening right now?', level: 'A1', age: 'teens', topic: 'Граматика: Present Continuous', color: 'mustard', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking', 'Writing'],
    aims: 'Розумію, коли дія відбувається прямо зараз\nВмію будувати Present Continuous: I’m reading, she isn’t sleeping\nПравильно пишу -ing форми: making, swimming, lying\nМожу описати, що відбувається на картинці чи навколо мене',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`Where are you now?
What’s the weather like now?
Look around. What can you see?
Is anyone at home with you now?`),
      note('Почни з себе: «Right now I’m sitting at my desk. I’m drinking tea. My cat is sleeping on my notes.» Не пояснюй форму, просто вживай її природно. Учень відповідає як може. Запитай, чи помітив він слова з -ing.'),

      h('Lead-in · 8 хв'),
      t(`**Live from my room!** (Max’s stream, 7 pm)

Hi, chat! It’s Max, and I’m streaming live from my room. So, what’s happening right now?

I’m sitting on my bed and I’m eating pizza. My little sister is doing her homework next to me. Well, she isn’t doing her homework, she’s watching my stream on her phone!

My parents are cooking dinner in the kitchen. I can hear them. Dad is singing. Badly.

And Pixel? Pixel is lying on my keyboard. He isn’t sleeping, he’s looking at the pizza. Pixel, no! Chat, he’s stealing my pizza!

OK, guys, I’m going now. Bye!`),
      ex(['truefalse', 'Прочитай і обери True або False.', `Max is sitting on the sofa. = False
Max is eating pizza. = True
His sister is doing her homework. = False
His parents are cooking dinner. = True
Pixel is sleeping. = False
Pixel is stealing the pizza. = True`]),
      note('Після читання запитай: «Це відбувається зазвичай чи прямо зараз?» Учень знаходить у тексті сигнальні слова right now, now, live. Попроси виписати 4-5 форм з -ing разом з am / is / are перед ними. Підсвіти, що дієслово складається з двох частин.'),

      h('Rule · 10 хв'),
      tip(`**Present Continuous** це «прямо зараз, у процесі». Уяви, що ти ставиш відео на паузу: що люди роблять у цей момент?

**Формула: am / is / are + дієслово-ing**

I **am** (I’m) **reading**. = Я читаю (зараз).
She **is** (she’s) **dancing**. = Вона танцює.
They **are** (they’re) **playing**. = Вони грають.

**Заперечення:** am / is / are + **not** + -ing
I**’m not** sleeping. · He **isn’t** listening. · We **aren’t** watching TV.

Сигнальні слова: **now, right now, at the moment, Look!, Listen!**`),
      tip(`**Як додавати -ing:**

Більшість слів: просто **+ing** · play → playing, read → reading, eat → eating
Німа **-e** в кінці зникає: make → **making**, dance → **dancing**, write → **writing**
Коротке слово «приголосна + голосна + приголосна»: подвоюємо останню · sit → **sitting**, run → **running**, swim → **swimming**, stop → **stopping**
**-ie** стає **-y**: lie → **lying**, die → **dying**

Лайфхак: кіт, що sitting на клавіатурі, натискає букву двічі: **sitting** з двома t.`),
      note('Найчастіша помилка: забути am / is / are (He playing football) або поставити to (I am to reading). Друга: «I am play». Поясни, що -ing без am / is / are «не працює», як телефон без батарейки. Відпрацюй правопис: дай 6-8 дієслів усно (write, swim, cook, lie, run, smile) і нехай учень називає -ing форму по буквах.'),

      h('Practice · 15 хв'),
      ex(
        ['gap', 'Розкрий дужки. Використай Present Continuous.', `Look! The cat [is sleeping/’s sleeping] (sleep) in my backpack.
I [am listening/’m listening] (listen) to music right now.
My friends [are playing/’re playing] (play) football in the yard.
Shh! Mum [is talking/’s talking] (talk) on the phone.
We [are making/’re making] (make) a video for our class.
Tom [is running/’s running] (run) to the bus stop.
My sister [is lying/’s lying] (lie) on the sofa.
I [am writing/’m writing] (write) a message to Kira.`],
        ['gap', 'Напиши заперечення.', `I [am not watching/’m not watching] (not watch) TV. I’m reading.
Dad [isn’t working/is not working/’s not working] (not work) today.
The kids [aren’t sleeping/are not sleeping/’re not sleeping] (not sleep). They’re playing games!
It [isn’t raining/is not raining/’s not raining] (not rain) now.
We [aren’t having/are not having/’re not having] (not have) lunch at the moment.
Pixel [isn’t eating/is not eating/’s not eating] (not eat) his food. He wants pizza.`],
      ),
      ex(
        ['sort', 'Як утворюється -ing? Розклади дієслова.', `just + ing: play; read; watch; cook; study
-e disappears: make; dance; write; smile; ride
double letter: sit; run; swim; stop; get
ie → y: lie; die; tie`],
        ['translate', 'Переклади англійською.', `Я зараз роблю домашку. = I’m doing my homework now / I am doing my homework now / I’m doing homework now / I am doing homework now
Вона не спить. = She isn’t sleeping / She is not sleeping / She’s not sleeping
Подивись! Кіт біжить. = Look! The cat is running / Look! The cat’s running
Мої друзі грають у футбол. = My friends are playing football
Ми не дивимося фільм. = We aren’t watching a film / We are not watching a film / We’re not watching a film / We aren’t watching a movie / We are not watching a movie / We’re not watching a movie`],
      ),
      note('У gap прийми і повну, і коротку форму. У Sort study це просто +ing (studying), бо -y не змінюється. Якщо учень пише «I am do my homework», поверни до формули.'),

      h('Speaking · 10 хв'),
      talk(`What are you doing right now? Say 3 things.
What is your family doing at the moment? Guess!
What are your friends doing now, do you think?
What is your pet (or a neighbour’s pet) doing right now?
Look out of the window. What’s happening outside?
What are you NOT doing right now? (I’m not sleeping…)`),
      note('Гра «Mime it»: ти показуєш дію (swimming, cooking, texting), учень питає себе вголос і каже «You’re swimming!». Потім учень показує, ти вгадуєш. Додатково: знайдіть будь-яке фото з вулиці або з телефона учня і опишіть, що відбувається (5-6 речень).'),

      h('Game: Spot the mistake · 7 хв'),
      ex(['choice', 'Знайди правильне речення.', `{She’s dancing in her room.|She dancing in her room.|She’s danceing in her room.}
{They’re swimming in the lake.|They’re swiming in the lake.|They swimming in the lake.}
{I’m not listening to you!|I not listening to you!|I’m not listen to you!}
{The cat is lying on my homework.|The cat is lieing on my homework.|The cat lying on my homework.}
{We’re sitting in the park.|We’re siting in the park.|We are sit in the park.}
{He isn’t sleeping, he’s playing.|He not sleeping, he’s playing.|He isn’t sleep, he’s playing.}`]),
      note('Вправа на швидкість: дай 2 хвилини. Потім попроси учня пояснити, що не так у кожному неправильному варіанті (немає is, помилка в правописі, немає -ing). Це закріплює і форму, і правопис.'),

      h('Homework · 5 хв'),
      ex(['open', 'Напиши «стрім» зі своєї кімнати або з вулиці (6-8 речень).', `Where are you? What are you doing?
What are the people around you doing?
Write 2 sentences with isn’t / aren’t / ’m not.`]),
      note('Домашка: «Live from…» як стрім Max. Учень пише 6-8 речень у Present Continuous, з двома запереченнями. Можна записати голосове або відео, як справжній стрім. На наступному уроці будемо ставити питання до цих дій.'),
    ],
  },

  // ---------- PRESENT CONTINUOUS QUESTIONS ----------
  {
    id: 'lib-gr-present-continuous-questions', title: 'What are you doing? Spill the tea!', level: 'A1', age: 'teens', topic: 'Граматика: Present Continuous (питання)', color: 'tomato', source: 'murly',
    focus: ['Grammar', 'Listening', 'Speaking'],
    aims: 'Ставлю Yes / No питання в Present Continuous: Are you working?\nВідповідаю коротко: Yes, I am. / No, he isn’t.\nСтавлю питання з what, where, why, who\nМожу розпитати друга по телефону, що він зараз робить',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What are you doing right now?
What is your best friend doing now, do you think?
Who are you texting a lot these days?
What song are you listening to a lot this week?`),
      note('Перевір домашній «стрім»: учень читає 3-4 речення. Постав до них питання (Are you sitting on your bed? What is your cat doing?), але поки не пояснюй форму. Подивись, чи учень відповідає короткими відповідями з минулої теми to be, вони тут працюють так само.'),

      h('Lead-in · 8 хв'),
      audio('Where are you?!', `A: Hey, Kira! Where are you? Are you coming?
B: Hi, Dan! Yes, I’m coming. I’m on the bus.
A: The bus? Why are you taking the bus? The park is near your house!
B: I’m not at home. I’m at my grandma’s. Wait, what are you doing?
A: I’m waiting for you! And Mia is here too.
B: What is she doing?
A: She’s eating ice cream. Your ice cream, I think.
B: What?! Is she joking?
A: No, she isn’t. She’s laughing. Hey, is your cat travelling with you? I can hear a cat.
B: Yes, he is. Grandma is giving him back to me. He’s meowing in his bag.
A: Ha! OK, hurry up!`),
      ex(['choice', 'Послухай (або прочитай) і обери правильну відповідь.', `Where is Kira? {on the bus|at home|in the park}
Why is Kira taking the bus? {She’s at her grandma’s.|She’s late.|She is tired.}
What is Dan doing? {He’s waiting for Kira.|He’s eating ice cream.|He’s on the bus.}
What is Mia doing? {She’s eating ice cream.|She’s sleeping.|She’s singing.}
Is Mia joking? {No, she isn’t.|Yes, she is.}
Is the cat travelling with Kira? {Yes, he is.|No, he isn’t.}`]),
      note('Прочитай діалог за ролями, потім помінятися ролями. Після вправи попроси учня знайти всі питання і розділити їх на 2 групи: ті, на які відповідаємо Yes / No, і ті, що починаються з what, where, why. Запитай: «Що стоїть на першому місці в Yes / No питанні?»'),

      h('Rule · 10 хв'),
      tip(`**Питання в Present Continuous** будуємо так само, як питання з to be: **am / is / are** стрибає на початок, а -ing залишається на місці.

You **are** reading. → **Are** you reading? = Ти читаєш?
He **is** sleeping. → **Is** he sleeping? = Він спить?
They **are** coming. → **Are** they coming? = Вони йдуть?

**Короткі відповіді** (без -ing!):
Are you working? → Yes, I **am**. / No, I**’m not**.
Is she crying? → Yes, she **is**. / No, she **isn’t**.
Are they playing? → Yes, they **are**. / No, they **aren’t**.`),
      tip(`**Питальне слово + am / is / are + хто? + -ing?**

**What** are you doing? = Що ти робиш?
**Where** is she going? = Куди вона йде?
**Why** are you laughing? = Чому ти смієшся?
**Who** are you talking to? = З ким ти говориш?
**What** is your cat eating? = Що їсть твій кіт?

Лайфхак: питання **What are you doing?** це «чарівна фраза». Запам’ятай її цілком, як пароль від Wi-Fi.`),
      note('Типові помилки: «You are doing what?», «What you are doing?», «Do you reading?», «Yes, I am reading» замість короткої відповіді (не помилка, але неприродно). Окремо: «Who are you talking to?» прийменник у кінці, учні хочуть «To who…». Порівняй з питаннями to be з минулого уроку: схема та сама, тільки додається -ing.'),

      h('Practice · 15 хв'),
      ex(
        ['gap', 'Розкрий дужки і склади питання.', `[Are you listening] (you / listen) to me?
[Is it raining] (it / rain) outside?
[Are they playing] (they / play) Minecraft again?
[Is your brother sleeping] (your brother / sleep)?
What [are you doing] (you / do)?
Where [is she going] (she / go)?
Why [are you laughing] (you / laugh)?
What [is the cat eating] (the cat / eat)?`],
        ['choice', 'Обери правильну коротку відповідь.', `Are you doing your homework? No, {I’m not|I don’t|I amn’t}.
Is Mia dancing? Yes, {she is|she’s|she does}.
Are your parents working today? Yes, {they are|they’re|they do}.
Is the dog barking? No, {it isn’t|it doesn’t|it not}.
Are we going home? Yes, {we are|we’re|we going}.
Is Dan wearing his new hoodie? No, {he isn’t|he doesn’t|he not is}.`],
      ),
      ex(
        ['match', 'Знайди відповідь на питання.', `What are you doing? = I’m making a sandwich.
Where are you going? = To the skate park.
Why is Mia crying? = She’s watching a sad film.
Who are you talking to? = My cousin from Kharkiv.
Is it snowing? = Yes, it is. Look!
Are you coming to the party? = No, I’m not. I’m ill.`],
        ['translate', 'Переклади англійською.', `Що ти робиш? = What are you doing?
Ти слухаєш? = Are you listening?
Куди ви йдете? = Where are you going?
Чому кіт біжить? = Why is the cat running?
Твоя сестра спить? = Is your sister sleeping?
З ким він говорить? = Who is he talking to? / Who’s he talking to?`],
      ),
      note('У gap учень має сам поставити дієслово на початок. Якщо він пише «You are listening», нагадай про кота, що стрибає першим. У Match можна попросити учня придумати свою відповідь на кожне питання усно.'),

      h('Speaking · 10 хв'),
      talk(`Role play: call a friend. Ask: Where are you? What are you doing? Who are you with?
Guess: What is your mum or dad doing right now?
Look at a photo on your phone. Ask me 3 questions about it, I’ll answer.
Are you learning anything new these days? What?
Are you reading or watching anything interesting this week?
What game or series are your friends talking about these days?`),
      note('Головне тут рольова гра «Phone call». Учень «дзвонить» тобі, ти в смішній ситуації (ти в зоопарку, і мавпа краде твій бутерброд). Учень мусить з’ясувати питаннями, де ти, що робиш і чому смієшся. Потім міняєтеся. Нагадай, що Present Continuous також для дій «у ці дні» (I’m reading a great book this week).'),

      h('Game: Guess the scene · 7 хв'),
      t(`Your teacher is thinking about a scene: a person somewhere, doing something. Ask Yes / No questions to guess it!

Ideas for questions: Is he/she sitting? Is he/she eating? Are they at school? Is it raining? Is someone singing?`),
      ex(['choice', 'Розминка: обери правильне питання.', `{Is she sitting?|Does she sitting?|Is she sit?}
{Are they eating?|Are they eat?|Do they eating?}
{What is he holding?|What he is holding?|What is he hold?}
{Where are they going?|Where they are going?|Where do they going?}
{Is it raining?|Is it rain?|Does it raining?}
{Why is he smiling?|Why he smiling?|Why is he smileing?}`]),
      note('Загадай сцену (наприклад: a cat is sitting on a pizza in a kitchen; a boy is dancing in the rain), учень має вгадати її за 10 Yes / No питань. Відповідай тільки короткими відповідями. Потім учень загадує свою сцену. Можна малювати сцену по мірі вгадування.'),

      h('Homework · 5 хв'),
      ex(['open', 'Напиши діалог «телефонна розмова» (8-10 реплік).', `Write a phone call between you and a friend.
Use at least 4 questions in Present Continuous (What are you doing? Where are you going?...).
Use at least 3 short answers (Yes, I am. / No, she isn’t.).`]),
      note('Домашка: діалог на 8-10 реплік. Можна записати голосове повідомлення, де учень читає діалог «за двох», змінюючи голос. На наступному уроці перейдемо до Present Simple, тож попроси учня також подумати, що він робить щодня (не зараз).'),
    ],
  },

  // ---------- PRESENT SIMPLE ----------
  {
    id: 'lib-gr-present-simple', title: 'I work, she works: everyday life', level: 'A1', age: 'teens', topic: 'Граматика: Present Simple', color: 'pink', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking', 'Writing'],
    aims: 'Розумію, коли вживати Present Simple: звички, факти, розклад\nДодаю -s / -es для he, she, it: she plays, he watches, it flies\nВживаю слова частоти: always, usually, sometimes, never\nМожу розповісти про свій день і день друга',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What time do you get up on school days?
What do you have for breakfast?
How do you get to school?
What do you do after school?`),
      note('Учень відповідає як може, навіть з помилками. Задай контраст з минулими уроками: «Right now you’re talking to me. But every day you…» Мета: показати різницю між «зараз» і «зазвичай». Запиши на дошці 2-3 фрази учня, повернешся до них після правила.'),

      h('Lead-in · 8 хв'),
      t(`**A day in the life of… a cat and a teen**

**Me (Taras, 14):** I get up at 7. I have breakfast and I go to school by bus. School finishes at 2. After school I play basketball or I do my homework. I usually go to bed at 11. I never get enough sleep!

**My cat (Pixel, 3):** Pixel wakes up at 5. He sits on my face and he meows. Then he eats his breakfast. He sleeps from 6 to 12. In the afternoon he watches birds from the window. He never does homework. He always catches my socks. He goes to bed when he wants. Life is good for Pixel!`),
      ex(['truefalse', 'Прочитай і обери True або False.', `Taras gets up at 7. = True
Taras goes to school on foot. = False
Taras usually goes to bed at 11. = True
Pixel wakes up at 6. = False
Pixel watches birds in the afternoon. = True
Pixel does homework. = False`]),
      note('Після читання порівняй дієслова: I get up / he wakes up, I go / he goes. Попроси учня підкреслити всі дієслова про Pixel. Що в них спільного? Нехай учень сам помітить закінчення -s / -es. Також запитай: «Це відбувається зараз чи щодня?»'),

      h('Rule · 10 хв'),
      tip(`**Present Simple** це про звички, розклад і факти: те, що відбувається **регулярно** або **завжди**.

I **play** basketball on Fridays. = Я граю в баскетбол по п’ятницях.
Water **boils** at 100°C. = Вода кипить при 100°C.

**Формула:**
I / you / we / they → дієслово як у словнику · I **live** in Kyiv. · They **love** pizza.
he / she / it → дієслово **+ s** · She **lives** in Kyiv. · My cat **loves** pizza.

Лайфхак: **he, she, it, буква S тут сидить!** Третя особа однини завжди «хвостата», як кіт.`),
      tip(`**Як додавати -s:**

Більшість дієслів: **+s** · play → plays, read → reads, sleep → sleeps
Після **-s, -sh, -ch, -x, -o**: **+es** · watch → watch**es**, wash → wash**es**, go → go**es**, do → do**es**, fix → fix**es**
Приголосна + **-y**: y → **ies** · fly → fl**ies**, study → stud**ies**, cry → cr**ies**
Але голосна + y: просто +s · play → plays, buy → buys
Особливе: **have → has**

**Слова частоти** стоять ПЕРЕД дієсловом: I **always** have breakfast. She **never** walks the dog.
always (завжди) · usually (зазвичай) · often (часто) · sometimes (іноді) · never (ніколи)
Але після am / is / are: I **am always** late.`),
      note('Найчастіша помилка: забути -s (She play, My mum work). Друга: додати -s не туди (I plays, They goes). Третя: плутати з Present Continuous (I am play basketball every day). Покажи контраст: «Right now Pixel is sleeping. He sleeps 16 hours a day.» Відпрацюй вимову закінчення: /s/ в works, /z/ в plays, /ɪz/ в watches.'),

      h('Practice · 15 хв'),
      ex(
        ['gap', 'Розкрий дужки. Використай Present Simple.', `My sister [plays] (play) the guitar.
I [walk] (walk) to school every day.
Pixel [sleeps] (sleep) on my bed.
My dad [watches] (watch) football on Sundays.
We [have] (have) maths on Mondays.
Our teacher [goes] (go) to work by bike.
Mia [studies] (study) Spanish online.
My best friend [has] (have) two cats.`],
        ['choice', 'Обери правильний варіант.', `They {live|lives} near the school.
My brother {fixes|fixs|fix} bikes in his free time.
Kira {does|dos|do} yoga every morning.
I {get|gets} up at 7.
The bus {leaves|leave} at 8:15.
Our cat {catches|catchs|catch} flies.`],
      ),
      ex(
        ['sort', 'Яке закінчення для he / she / it?', `+s: play; read; buy; sleep; work
+es: watch; wash; go; do; fix
y → ies: fly; study; cry; try`],
        ['gap', 'Постав слово частоти в правильне місце. Напиши слово і дієслово разом.', `I (always) [always have] (have) breakfast at home.
My cat (never) [never drinks] (drink) milk.
We (sometimes) [sometimes play] (play) games after school.
Dan (usually) [usually takes] (take) the bus.
My mum (often) [often cooks] (cook) pasta.
She (always) [is always] (be) late for school!`],
        ['translate', 'Переклади англійською.', `Я живу у Львові. = I live in Lviv
Вона любить котів. = She loves cats / She likes cats
Мій брат грає у футбол. = My brother plays football
Наш кіт завжди спить на дивані. = Our cat always sleeps on the sofa / Our cat always sleeps on the couch
Він ніколи не робить домашку. = He never does his homework / He never does homework`],
      ),
      note('Останнє речення gap з частотою на to be: «is always», адже після am / is / are слово частоти стоїть після. У перекладі «ніколи не робить» це never does, без not: в англійській одне заперечення. Учні часто пишуть «He never doesn’t».'),

      h('Speaking · 10 хв'),
      talk(`Tell me about your typical school day. (I get up at…)
Tell me about a family member’s day. (My mum gets up at…)
What do you always do on Saturdays?
What do you never do? (I never eat…)
What does your pet (or a friend) do every day?
What does your best friend like? What does he or she do after school?
Compare: What are you doing now? What do you usually do at this time?`),
      note('Спочатку учень розповідає про себе (без -s), потім про когось іншого (з -s). Це найкращий спосіб відпрацювати різницю. Коли учень забуває -s, просто підніми палець вгору або покажи «котячий хвіст» рукою, щоб він сам виправився. Останнє питання на контраст двох часів.'),

      h('Game: Who is it? · 7 хв'),
      t(`Read the clues and guess who it is. Then write your own riddle about a person or animal for your teacher.`),
      ex(['choice', 'Хто це? Обери правильну відповідь.', `She works in a school. She teaches children. She checks homework. Who is she? {a teacher|a doctor|a chef}
He works in a kitchen. He cooks food all day. Who is he? {a chef|a pilot|a vet}
It sleeps 16 hours a day. It catches mice. It says meow. What is it? {a cat|a dog|a fish}
He flies planes. He travels a lot. Who is he? {a pilot|a driver|a farmer}
She helps animals. She works in an animal clinic. Who is she? {a vet|a teacher|a singer}
It lives in water. It doesn’t speak. It swims all day. What is it? {a fish|a cat|a parrot}`]),
      note('Після вправи учень пише свою загадку з 3-4 речень у Present Simple про людину, тварину або відомого персонажа (наприклад, футболіста чи героя мультфільму), ти вгадуєш. Стеж за -s у кожному реченні. Можна зробити 2-3 раунди.'),

      h('Homework · 5 хв'),
      ex(['open', 'Напиши про свій день і день когось із родини або улюбленця (8-10 речень).', `Write 4-5 sentences about your typical day (I…).
Write 4-5 sentences about the day of a family member or pet (He / She / It…).
Use at least 3 words: always, usually, often, sometimes, never.`]),
      note('Домашка: «A day in the life of…» як у тексті Taras і Pixel. Мінімум 3 слова частоти. На наступному уроці перевір -s у третій особі і правопис (goes, watches, studies). Далі за програмою: заперечення в Present Simple (don’t / doesn’t).'),
    ],
  },
];
