// Бібліотека, пакет 5: граматика для підлітків A1-A2, порядок тем як у червоній книзі Murphy.
// Усі тексти, приклади і вправи власні (з книги беремо лише назви тем).
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, video, vocab, ex, talk, meme, game } = makeHelpers('b5');

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
Who is your best friend?
What is your favourite colour?
Are you a morning person or a sleepy zombie in the morning?
If you are an animal, what animal are you?`),
      note('Почни з себе: «I’m Anna. I’m a teacher. I’m not a cat, but my cat is very important.» Учень відповідає на питання повними реченнями, якщо може, але не виправляй на цьому етапі. Мета: почути, чи учень уже плутає am / is / are, і відзначити собі типові помилки для «Розбору помилок».'),

      h('Lead-in · 6 хв'),
      t(`**Meet my squad!** (a post by Sofia, 13)

Hi, I’m Sofia and I’m from Lviv. I’m in Year 8. This is my squad!

**Dan** is my best friend. He’s funny and he’s really good at football. He isn’t good at maths, but that’s OK, I am!

**Mia and Kira** are twins. They’re 14. They aren’t in my class, but we’re in the same dance club.

And this is **Biscuit**. Biscuit is our cat. She’s orange and she’s very lazy. She isn’t a fan of dogs. She’s a fan of the sofa.

We aren’t perfect, but we’re a great team!`),
      vocab(`squad = компанія друзів
best friend = найкращий друг
funny = смішний
be good at = добре вміти щось
twins = близнюки
the same = той самий, однаковий
club = гурток, клуб
lazy = лінивий
be a fan of = бути фанатом чогось
perfect = ідеальний
tired = втомлений
hungry = голодний
late = який запізнюється
bored = якому нудно`),
      ex(['truefalse', 'Прочитай пост і обери True або False.', `Sofia is from Kyiv. = False
Dan is good at football. = True
Dan is good at maths. = False
Mia and Kira are in Sofia’s class. = False
Biscuit is orange. = True
Biscuit is a fan of dogs. = False`]),
      note('Учень читає вголос по абзацу, слова зі словничка пояснюй по ходу. Після True / False попроси знайти в тексті всі am, is, are і ’m, ’s, ’re. Запитай: «Чому про Dan is, а про Mia and Kira are?» Нехай учень сам спробує сформулювати правило.'),

      h('Rule · 5 хв'),
      tip(`**To be** це дієслово «бути». Українською ми його часто пропускаємо («Я голодний»), а англійською БЕЗ нього речення не працює: **I am hungry.**

I → **am** (I’m) · I **am** tired. = Я втомлений.
he / she / it → **is** (he’s, she’s, it’s) · My cat **is** lazy. = Мій кіт лінивий.
you / we / they → **are** (you’re, we’re, they’re) · We **are** friends. = Ми друзі.

**Заперечення:** + **not**: I**’m not** late. · She **isn’t** at home. · They **aren’t** bored.
Увага: **amn’t** не буває! Тільки **I’m not**.

Лайфхак: **am** тільки з **I**, як кіт, що любить тільки одного господаря. **Is** для одного, **are** для багатьох і для **you**.`),
      note('Поясни на прикладі учня і його друзів: «You are a student. I am a teacher. Your friend is…». Не затримуйся: правило коротке, решту часу віддай практиці. Попроси учня скласти по одному реченню для am, is, are.'),
      meme('st-cat-please', 'My cat: I am not hungry.', 'Also my cat at 5 am:', 'Мій кіт: я не голодний. Також мій кіт о 5 ранку:'),

      h('Practice · 13 хв'),
      game('Am, is or are?', 'Choose am, is or are', `I ___ a gamer. = am
My cat ___ hungry. = is
My friends ___ at the park. = are
You ___ my favourite teacher. = are
It ___ cold today. = is
We ___ in Year 8. = are
Biscuit ___ orange. = is
Mia and Kira ___ twins. = are
I ___ not late! = am
The pizza ___ hot. = is`),
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
      meme('st-cat-cool', 'We aren’t late.', 'Everyone else is early.', 'Ми не запізнюємось. Це всі інші прийшли зарано.'),
      note('Гра: учень обирає режим (квіз, пари чи картки) і проходить її на швидкість. Далі вправи на форму і заперечення. У Sort звернути увагу: my cat, Dan, the school це «він / вона / воно», тому is. У перекладі прийми будь-яку правильну коротку чи повну форму.'),

      h('Video: Watch and describe · 7 хв'),
      video('https://www.youtube.com/watch?v=WwKJI5cuIug', 'Watch and describe the characters: Who is Peppa? Who is George? Are they happy? Is it sunny or rainy?', 'Peppa Pig - Official Channel: «Muddy Puddles»'),
      video('https://www.youtube.com/watch?v=PX1d-R59PaA', 'Watch and say 3 sentences about Mr Bean with is / isn’t. (He is… He isn’t…)', 'Mr Bean Official: Village Fete'),
      note('Перед уроком переглянь відео і познач 3-4 моменти для паузи (орієнтовно кожні 40-60 секунд, коли з’являється новий персонаж або змінюється погода). Peppa: на першій паузі питай «Who is she?» (She’s Peppa. She is a pig.), далі «Who is he?» (He’s George. He is her brother.), «Is it rainy?» (It is rainy / It isn’t sunny.), у кінці «Are they happy?» (They are happy. They are muddy!). Mr Bean: дивіться без звуку 1-2 хвилини, учень описує: He is funny. He isn’t happy. The people are surprised. Достатньо одного відео, якщо мало часу.'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

She happy. → She **is** happy. (українською «є» пропускаємо, англійською ні)
I is a student. → I **am** a student. (am тільки з I)
They is my friends. → They **are** my friends. (they завжди з are)
I amn’t tired. → I**’m not** tired. (amn’t не існує)
He is 13 years. → He is 13. / He is 13 **years old**. (або просто число, або years old)`),
      ex(['choice', 'Biscuit the cat wrote her own post, but her grammar is terrible. Знайди правильне речення.', `{I am a cat.|I is a cat.|I are a cat.}
{My humans are nice.|My humans is nice.|My humans am nice.}
{The sofa is my best friend.|The sofa are my best friend.|The sofa my best friend.}
{I’m not a fan of baths.|I amn’t a fan of baths.|I isn’t a fan of baths.}
{The dog next door isn’t cool.|The dog next door aren’t cool.|The dog next door not cool.}
{We are a happy family.|We is a happy family.|We am a happy family.}`]),
      note('Читай речення «котячим» голосом, буде веселіше. Після вправи попроси пояснити, що не так у неправильних варіантах. Якщо на розминці учень робив інші помилки, додай їх сюди.'),

      h('Speaking · 8 хв'),
      talk(`Tell me about you: name, age, city. (I’m…)
Describe your best friend in 3 sentences. (He’s… / She’s…)
What are you NOT? Say 3 things. (I’m not a morning person…)
Describe your pet or a pet you want.
Is your school big or small? Is it far from your home?
Who is your favourite singer or YouTuber? Where is he or she from?
What is your favourite day of the week? Why?
Imagine you are a pizza. What kind of pizza are you? (I’m a cheese pizza because I’m simple!)
Your cat is the boss of your home. Is it true? Why?
Who is the funniest person in your family?`),
      note('Гра «Two truths and a lie»: учень каже 3 речення про себе з to be (I’m 13. My cat is black. My brother is a pilot.), ти вгадуєш, що неправда, і відповідаєш запереченням: «Your brother isn’t a pilot!» Потім міняєтеся. Виправляй тільки помилки з am / is / are, повтори правильно після відповіді.'),

      h('Speed round · 6 хв'),
      game('Speed round: make it negative', 'Write the short negative form', `I am = I’m not
she is = she isn’t
he is = he isn’t
it is = it isn’t
we are = we aren’t
they are = they aren’t
you are = you aren’t
my cat is = my cat isn’t
my friends are = my friends aren’t
Dan is = Dan isn’t`),
      note('Засікай 60 секунд. Учень проходить гру двічі: другий раз має бути швидше. Якщо пише «I amn’t», зупинись і повтори правило з розбору помилок.'),

      h('Homework · 5 хв'),
      meme('st-cat-box', 'I am in a box.', 'The box is my home now.', 'Я в коробці. Коробка тепер мій дім.'),
      ex(['open', 'Напиши 6 речень: 3 позитивні і 3 заперечні.', `Write about you: 3 true sentences with am / is / are.
Write about your friend or pet: 3 sentences with isn’t / aren’t / ’m not.`]),
      note('Домашка: міні-пост «Meet my squad» про себе і 2-3 друзів або тварин (6-8 речень), як у тексті Sofia. Обов’язково 2 заперечення. Бонус: придумати свій мем з котиком з am / is / are. На наступному уроці учень прочитає свій пост, а ти поставиш до нього питання (наступна тема: питання з am / is / are).'),
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
Is your best friend in your class?
Is your phone new or old?
Are you hungry right now?
Is your cat (or dog) the boss of your home?
Are you a pizza person or a sushi person?`),
      note('Учень, найімовірніше, відповідатиме «Yes» або «No». Це нормально: на цьому уроці ми навчимося відповідати коротко і правильно (Yes, I am). Перевір домашній пост з минулого уроку: попроси прочитати і постав 2-3 питання до нього.'),

      h('Lead-in · 6 хв'),
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
      vocab(`new = новий
Nice to meet you! = Приємно познайомитись!
little sister = молодша сестра
annoying = набридливий
be into = захоплюватися
gamer = геймер
drawing = малювання
backpack = рюкзак
keychain = брелок
favourite = улюблений
ready = готовий
strict = суворий
canteen = їдальня
tidy = охайний, прибраний`),
      ex(['choice', 'Послухай (або прочитай) і обери правильну відповідь.', `Is Max new at school? {Yes, he is.|No, he isn’t.}
Where is Max from? {Dnipro|Lviv|Kharkiv}
How old is Max’s sister? {eight|ten|six}
Is Max into sports? {No, he isn’t.|Yes, he is.}
Is Lena a gamer? {No, she isn’t.|Yes, she is.}
What is Pixel? {a cat|a dog|a game}`]),
      note('Якщо немає озвучки, прочитай діалог за ролями з учнем. Після вправи попроси знайти всі питання в діалозі і подивитися, що стоїть на першому місці. Підведи до висновку: у питанні am / is / are міняється місцями з підметом.'),

      h('Rule · 5 хв'),
      tip(`**Питання:** am / is / are стрибає НА ПОЧАТОК, перед підметом. Як кіт, який стрибає на стіл першим.

You **are** hungry. → **Are** you hungry? = Ти голодний?
She **is** at home. → **Is** she at home? = Вона вдома?

**Короткі відповіді** (у «так» без скорочень):
Are you OK? → Yes, I **am**. / No, I**’m not**.
Is he 14? → Yes, he **is**. / No, he **isn’t**.
Are they friends? → Yes, they **are**. / No, they **aren’t**.

**Питальне слово + am / is / are + хто? + решта**
**Where** are you from? · **How old** is your sister? · **What** is your favourite game? · **Who** is that boy? · **Why** are you sad?`),
      note('Відпрацюй інтонацію: у Yes / No питаннях голос іде вгору, у питаннях з where / what вниз. Поясни, що в коротких відповідях «так» не скорочуємо, бо наголос падає на дієслово.'),
      meme('st-girl-bow', 'Teacher: Are you ready for the test?', 'Me: Yes, I am. My brain: No, it isn’t.', 'Вчитель: ти готовий до тесту? Я: так. Мій мозок: ні.'),

      h('Practice · 13 хв'),
      game('Question starter', 'Choose the first word: Am, Is or Are', `___ you hungry? = Are
___ your cat black? = Is
___ I late? = Am
___ your parents at work? = Are
___ it your birthday? = Is
___ we in the same team? = Are
___ Dan your best friend? = Is
___ the twins 14? = Are
___ I in your team? = Am
___ the canteen open? = Is`),
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
      meme('st-cat-shock', 'Mum: Is your room tidy?', 'Me: Define tidy.', 'Мама: у тебе в кімнаті прибрано? Я: а що значить «прибрано»?'),
      note('Гра на розгін, потім вправи. Перед перекладом нагадай: «Скільки тобі років?» англійською це «Скільки старий ти?» = How old are you? Якщо учень плутає is / are у питаннях з where, нехай спочатку знайде підмет (the canteen = it, your cousins = they).'),

      h('Video: Watch and ask · 7 хв'),
      video('https://www.youtube.com/watch?v=_Ot_vJLJ86M', 'Watch and answer with short answers: Is Mr Bean ready for the exam? Is he nervous? Is the student next to him clever? Then ask me 3 questions with is / are.', 'Mr Bean Official: The Exam Cheat'),
      note('Перед уроком переглянь відео і обери 3 паузи. Пауза 1 (на початку, коли Mr Bean сідає за парту): «Is he at school? Is he happy?» (Yes, he is. / No, he isn’t. He is nervous.) Пауза 2 (коли він заглядає в роботу сусіда): «Is he a good student? Is the other student clever?» (No, he isn’t. / Yes, he is.) Пауза 3 (у кінці): учень сам ставить тобі 3 питання з Is he / Are they. Хвалімо за правильний порядок слів, а не за довгі відповіді.'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

Where you are from? → Where **are you** from? (am / is / are перед підметом)
You are from where? → **Where are** you from? (питальне слово на початок)
Is you ready? → **Are** you ready? (you завжди з are)
How old are your sister? → How old **is** your sister? (sister = she, тому is)
Yes, I’m. → Yes, I **am**. (у короткій відповіді «так» не скорочуємо)
How many years you have? → **How old are you?** (вік через to be, не have)`),
      ex(['choice', 'Знайди правильне речення.', `{Is it an animal?|It is an animal?|Are it an animal?}
{Is it big?|Big is it?|Are it big?}
{Is it in your house?|Is in your house it?|It in your house?}
{Are you a famous person?|You are a famous person?|Is you a famous person?}
{Where is it from?|Where it is from?|Where are it from?}
{What colour is it?|What colour it is?|What colour are it?}`]),
      note('Ці питання знадобляться для гри «20 questions»: якщо лишається час, загадай тварину або предмет, учень ставить тільки Yes / No питання з is / are, ти відповідаєш коротко.'),

      h('Speaking · 8 хв'),
      talk(`Are you a morning person or a night person?
Is your bedroom tidy? Be honest!
Are your friends into the same music as you?
Where is your favourite place in your town?
Who is your favourite person in your family? Why?
Is English easy or difficult for you?
Are you good at cooking?
Is your phone your best friend?
Are you scared of spiders?
Is your cat smarter than you? Be honest!`),
      note('Учень відповідає короткою відповіддю + одним реченням (Yes, I am. I get up at 6!). Потім поміняйтеся: учень ставить ці ж питання тобі. Стеж, щоб він ставив am / is / are на початок. Відповідай чесно і весело, щоб учень почув природні відповіді.'),

      h('Speed round · 6 хв'),
      game('Speed round: short answers', 'Give the short answer', `Are you 13? (yes) = Yes, I am
Is she at home? (no) = No, she isn’t
Are they friends? (yes) = Yes, they are
Is it cold? (no) = No, it isn’t
Am I late? (no) = No, you aren’t
Is the canteen open? (yes) = Yes, it is
Are we ready? (yes) = Yes, we are
Is Dan your brother? (no) = No, he isn’t
Are you hungry? (no) = No, I’m not
Is Mia a gamer? (yes) = Yes, she is`),
      note('Засікай 60 секунд, потім друга спроба. Зверни увагу на «Yes, I’m»: це помилка, тільки «Yes, I am».'),

      h('Homework · 5 хв'),
      meme('st-cat-box', 'Human: Where is the cat?', 'The box: The cat isn’t here.', 'Людина: де кіт? Коробка: кота тут немає.'),
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
Is anyone at home with you now?
What is on your desk right now?
What can you hear right now?
Where is your phone right now? In your hand?
Is your cat (or a pet you know) awake or asleep now?`),
      note('Почни з себе: «Right now I’m sitting at my desk. I’m drinking tea. My cat is sleeping on my notes.» Не пояснюй форму, просто вживай її природно. Учень відповідає як може. Запитай, чи помітив він слова з -ing.'),

      h('Lead-in · 6 хв'),
      t(`**Live from my room!** (Max’s stream, 7 pm)

Hi, chat! It’s Max, and I’m streaming live from my room. So, what’s happening right now?

I’m sitting on my bed and I’m eating pizza. My little sister is doing her homework next to me. Well, she isn’t doing her homework, she’s watching my stream on her phone!

My parents are cooking dinner in the kitchen. I can hear them. Dad is singing. Badly.

And Pixel? Pixel is lying on my keyboard. He isn’t sleeping, he’s looking at the pizza. Pixel, no! Chat, he’s stealing my pizza!

OK, guys, I’m going now. Bye!`),
      vocab(`stream = стрімити, вести трансляцію
live = наживо
right now = прямо зараз
at the moment = в цей момент
next to = поруч з
do homework = робити домашнє завдання
cook dinner = готувати вечерю
kitchen = кухня
sing = співати
badly = погано
lie (lying) = лежати
keyboard = клавіатура
look at = дивитися на
steal = красти`),
      ex(['truefalse', 'Прочитай і обери True або False.', `Max is sitting on the sofa. = False
Max is eating pizza. = True
His sister is doing her homework. = False
His parents are cooking dinner. = True
Pixel is sleeping. = False
Pixel is stealing the pizza. = True`]),
      note('Після читання запитай: «Це відбувається зазвичай чи прямо зараз?» Учень знаходить у тексті сигнальні слова right now, now, live. Попроси виписати 4-5 форм з -ing разом з am / is / are перед ними. Підсвіти, що дієслово складається з двох частин.'),

      h('Rule · 5 хв'),
      tip(`**Present Continuous** це «прямо зараз, у процесі». Уяви, що ставиш відео на паузу: що люди роблять у цей момент?

**Формула: am / is / are + дієслово-ing**
I**’m reading**. = Я читаю (зараз). · She**’s dancing**. · They**’re playing**.
**Заперечення:** I**’m not** sleeping. · He **isn’t** listening. · We **aren’t** watching TV.
Сигнальні слова: **now, right now, at the moment, Look!, Listen!**

**Як додавати -ing:**
Більшість слів: **+ing** · play → playing, read → reading
Німа **-e** зникає: make → **making**, write → **writing**
Коротке слово «приголосна + голосна + приголосна»: подвоюємо · sit → **sitting**, swim → **swimming**
**-ie** стає **-y**: lie → **lying**

Лайфхак: кіт, що sitting на клавіатурі, натискає букву двічі: **sitting** з двома t.`),
      note('Поясни, що -ing без am / is / are «не працює», як телефон без батарейки. Дай 4-5 дієслів усно (write, swim, cook, lie, run), учень називає -ing форму по буквах.'),
      meme('st-cat-coffee', 'Me: I’m studying.', 'My screen: You’re watching cat videos.', 'Я: я вчуся. Мій екран: ти дивишся відео з котиками.'),

      h('Practice · 13 хв'),
      game('-ing spelling challenge', 'Write the -ing form', `swim = swimming
make = making
play = playing
sit = sitting
lie = lying
write = writing
run = running
dance = dancing
read = reading
stop = stopping
smile = smiling
get = getting`),
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
      meme('st-cat-loaf', 'I’m not sleeping.', 'I’m resting my eyes. For three hours.', 'Я не сплю. Я даю очам відпочити. Три години.'),
      note('Гра на правопис -ing, потім вправи. У gap прийми і повну, і коротку форму. У Sort study це просто +ing (studying), бо -y не змінюється. Якщо учень пише «I am do my homework», поверни до формули.'),

      h('Video: Watch and say what’s happening · 7 хв'),
      video('https://www.youtube.com/watch?v=gZujYUcY5xc', 'Watch and pause. Say what Mr Bean is doing: 5 sentences with is + -ing. (He is standing… He isn’t swimming…)', 'Mr Bean Official: At the Swimming Pool'),
      video('https://www.youtube.com/watch?v=aFgLrWiNHFc', 'Watch and say: What is Mr Bean doing with the turkey? What is happening to his head?', 'Mr Bean Official: Christmas Turkey'),
      note('Перед уроком переглянь і обери 4 паузи (орієнтовно кожні 40-60 секунд, щоразу коли Mr Bean починає нову дію). Swimming Pool: на паузах питай «What is he doing?», очікувані відповіді: He is walking to the pool. He is climbing. He is standing on the diving board. He isn’t jumping, he is scared. Christmas Turkey: He is cooking. He is putting food into the turkey. His head is stuck! Якщо часу мало, візьми одне відео.'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

He playing football. → He **is** playing football. (без am / is / are не можна)
I am play. → I am play**ing**. (потрібне -ing)
I am to reading. → I am reading. (to тут зайве)
She is swiming. → She is swi**mm**ing. (коротке слово: подвоюємо букву)
The cat is lieing. → The cat is **lying**. (ie стає y)`),
      ex(['choice', 'Знайди правильне речення.', `{She’s dancing in her room.|She dancing in her room.|She’s danceing in her room.}
{They’re swimming in the lake.|They’re swiming in the lake.|They swimming in the lake.}
{I’m not listening to you!|I not listening to you!|I’m not listen to you!}
{The cat is lying on my homework.|The cat is lieing on my homework.|The cat lying on my homework.}
{We’re sitting in the park.|We’re siting in the park.|We are sit in the park.}
{He isn’t sleeping, he’s playing.|He not sleeping, he’s playing.|He isn’t sleep, he’s playing.}`]),
      note('Дай 2 хвилини. Потім попроси учня пояснити, що не так у кожному неправильному варіанті (немає is, помилка в правописі, немає -ing).'),

      h('Speaking · 8 хв'),
      talk(`What are you doing right now? Say 3 things.
What is your family doing at the moment? Guess!
What are your friends doing now, do you think?
What is your pet (or a neighbour’s pet) doing right now?
Look out of the window. What’s happening outside?
What are you NOT doing right now? (I’m not sleeping…)
What is your teacher doing right now? Describe me!
Imagine your cat is home alone. What is it doing now?
What is your favourite YouTuber doing right now, do you think?
Imagine you are on holiday. Where are you? What are you doing?`),
      note('Гра «Mime it»: ти показуєш дію (swimming, cooking, texting), учень каже «You’re swimming!». Потім учень показує, ти вгадуєш. Додатково: опишіть будь-яке фото з телефона учня (5-6 речень).'),

      h('Speed round · 6 хв'),
      game('Speed round: what’s happening?', 'Complete with am, is or are + -ing', `Look! The dog ___ (run). = is running
I ___ (eat) pizza. = am eating
They ___ (play) games. = are playing
Mum ___ (cook) dinner. = is cooking
We ___ (watch) a film. = are watching
The cat ___ (sit) on my bag. = is sitting
Dad ___ (sing) badly. = is singing
You ___ (write) a message. = are writing
I ___ (lie) on the sofa. = am lying
My friends ___ (swim). = are swimming`),
      note('Засікай час, дві спроби. Прийми і короткі форми в усній відповіді (The dog’s running).'),

      h('Homework · 5 хв'),
      meme('st-boy-cap', 'Mum is cooking. Dad is singing.', 'And the cat is leaving the house.', 'Мама готує. Тато співає. А кіт іде з дому.'),
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
What song are you listening to a lot this week?
What series are you watching these days?
Are you eating anything right now?
Is anyone in your home making noise now?
What is your cat (or your neighbour’s cat) planning right now?`),
      note('Перевір домашній «стрім»: учень читає 3-4 речення. Постав до них питання (Are you sitting on your bed? What is your cat doing?), але поки не пояснюй форму. Подивись, чи учень відповідає короткими відповідями з теми to be, вони тут працюють так само.'),

      h('Lead-in · 6 хв'),
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
      vocab(`come (coming) = іти (сюди), приходити
take the bus = їхати автобусом
near = біля, недалеко
at my grandma’s = у бабусі
wait for = чекати на
joke = жартувати
laugh = сміятися
travel = подорожувати, їхати
meow = нявкати
Hurry up! = Поспішай!
cry = плакати
wear = бути вдягненим у
hoodie = худі
text = писати повідомлення`),
      ex(['choice', 'Послухай (або прочитай) і обери правильну відповідь.', `Where is Kira? {on the bus|at home|in the park}
Why is Kira taking the bus? {She’s at her grandma’s.|She’s late.|She is tired.}
What is Dan doing? {He’s waiting for Kira.|He’s eating ice cream.|He’s on the bus.}
What is Mia doing? {She’s eating ice cream.|She’s sleeping.|She’s singing.}
Is Mia joking? {No, she isn’t.|Yes, she is.}
Is the cat travelling with Kira? {Yes, he is.|No, he isn’t.}`]),
      note('Прочитай діалог за ролями, потім поміняйтеся ролями. Після вправи попроси учня знайти всі питання і розділити їх на 2 групи: Yes / No питання і ті, що починаються з what, where, why. Запитай: «Що стоїть на першому місці в Yes / No питанні?»'),

      h('Rule · 5 хв'),
      tip(`**Питання в Present Continuous** будуємо так само, як питання з to be: **am / is / are** стрибає на початок, а -ing залишається на місці.

You **are** reading. → **Are** you reading? = Ти читаєш?
He **is** sleeping. → **Is** he sleeping? = Він спить?

**Короткі відповіді** (без -ing!):
Are you working? → Yes, I **am**. / No, I**’m not**.
Is she crying? → Yes, she **is**. / No, she **isn’t**.

**Питальне слово + am / is / are + хто? + -ing?**
**What** are you doing? · **Where** is she going? · **Why** are you laughing? · **Who** are you talking to?

Лайфхак: **What are you doing?** це «чарівна фраза». Запам’ятай її цілком, як пароль від Wi-Fi.`),
      note('Порівняй з питаннями to be: схема та сама, тільки додається -ing. Окремо покажи «Who are you talking to?»: прийменник у кінці.'),
      meme('st-cat-shock', 'Mum: What are you doing?', 'Me, closing 15 tabs: Homework!', 'Мама: що ти робиш? Я, закриваючи 15 вкладок: домашку!'),

      h('Practice · 13 хв'),
      game('What, where, why or who?', 'Choose the question word: What, Where, Why or Who', `Ice cream. ___ is she eating? = What
To the park. ___ are you going? = Where
Because it’s funny. ___ are you laughing? = Why
My cousin. ___ are you talking to? = Who
A video. ___ are you making? = What
At the bus stop. ___ is Dan waiting? = Where
Because she’s sad. ___ is Mia crying? = Why
Kira. ___ are you texting? = Who
Pizza. ___ is the cat stealing? = What
Home. ___ are we going? = Where`),
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
      meme('st-cat-please', 'Friend: Are you coming?', 'Me, still in bed: Yes, I’m on the bus!', 'Друг: ти йдеш? Я, ще в ліжку: так, я вже в автобусі!'),
      note('У gap учень має сам поставити дієслово на початок. Якщо він пише «You are listening», нагадай про кота, що стрибає першим. У Match можна попросити учня придумати свою відповідь на кожне питання усно.'),

      h('Video: Pause and ask · 7 хв'),
      video('https://www.youtube.com/watch?v=6aK2CKrdjbE', 'Watch and pause. Ask 3 questions about the scene: What is he doing? Is he…? Why is he…?', 'Mr Bean Official: Chemistry Experiment'),
      video('https://www.youtube.com/watch?v=jG902yH_POY', 'Watch and answer with short answers: Is Mr Bean swimming? Is he jumping? Are the people watching him?', 'Mr Bean Official: Just Dive Bean'),
      note('Перед уроком переглянь відео і обери 3-4 паузи (щоразу, коли Mr Bean починає щось нове, орієнтовно кожні 40-60 секунд). На паузах ролі міняються: спочатку питаєш ти (What is he doing? Is he smiling?), учень відповідає коротко (Yes, he is. / No, he isn’t. He’s…). Потім учень ставить питання тобі. Очікувані питання: What is he holding? Why is he laughing? Is the teacher looking at him? Are the people watching? Для Just Dive Bean: Is he standing on the diving board? Is he scared? Is he jumping? Якщо часу мало, візьми одне відео.'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

What you are doing? → What **are you** doing? (am / is / are перед підметом)
You are doing what? → **What are** you doing? (питальне слово на початок)
Do you reading? → **Are** you reading? (do тут не потрібне, тільки am / is / are)
Yes, I’m. → Yes, I **am**. (у короткій відповіді «так» не скорочуємо)
To who are you talking? → **Who** are you talking **to**? (прийменник у кінці)`),
      ex(['choice', 'Знайди правильне речення.', `{Is she sitting?|Does she sitting?|Is she sit?}
{Are they eating?|Are they eat?|Do they eating?}
{What is he holding?|What he is holding?|What is he hold?}
{Where are they going?|Where they are going?|Where do they going?}
{Is it raining?|Is it rain?|Does it raining?}
{Why is he smiling?|Why he smiling?|Why is he smileing?}`]),
      note('Після вправи учень пояснює, що не так у неправильних варіантах. Ці ж питання знадобляться для гри «Guess the scene»: загадай сцену (a cat is sitting on a pizza; a boy is dancing in the rain), учень вгадує за 10 Yes / No питань.'),

      h('Speaking · 8 хв'),
      talk(`Role play: call a friend. Ask: Where are you? What are you doing? Who are you with?
Guess: What is your mum or dad doing right now?
Look at a photo on your phone. Ask me 3 questions about it, I’ll answer.
Are you learning anything new these days? What?
Are you reading or watching anything interesting this week?
What game or series are your friends talking about these days?
Is your cat planning something evil right now? What is it doing?
Imagine I’m calling you from the moon. Ask me 3 questions.
What is your favourite singer doing right now, do you think?
Why are you smiling? (Answer with a funny reason!)`),
      note('Головне тут рольова гра «Phone call». Учень «дзвонить» тобі, ти в смішній ситуації (ти в зоопарку, і мавпа краде твій бутерброд). Учень мусить з’ясувати питаннями, де ти, що робиш і чому смієшся. Потім міняєтеся. Нагадай, що Present Continuous також для дій «у ці дні» (I’m reading a great book this week).'),

      h('Speed round · 6 хв'),
      game('Speed round: short answers', 'Give the short answer', `Are you sleeping? (no) = No, I’m not
Is she dancing? (yes) = Yes, she is
Are they coming? (yes) = Yes, they are
Is it raining? (no) = No, it isn’t
Is Dan waiting? (yes) = Yes, he is
Are we going home? (yes) = Yes, we are
Is the TV working? (no) = No, it isn’t
Are you listening? (yes) = Yes, I am
Are your friends playing? (no) = No, they aren’t
Is Mia joking? (no) = No, she isn’t`),
      note('Дві спроби на час. Головне: без -ing у короткій відповіді і без «Yes, I’m».'),

      h('Homework · 5 хв'),
      meme('st-cat-blep', 'Who are you talking to?', 'The cat. He’s a good listener.', 'З ким ти говориш? З котом. Він уміє слухати.'),
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
What do you do after school?
What time do you go to bed?
What do you do on Sunday mornings?
How many times a day do you check your phone? Be honest!
What does your cat (or dog) do all day?`),
      note('Учень відповідає як може, навіть з помилками. Задай контраст з минулими уроками: «Right now you’re talking to me. But every day you…» Мета: показати різницю між «зараз» і «зазвичай». Запиши 2-3 фрази учня, повернешся до них після правила.'),

      h('Lead-in · 6 хв'),
      t(`**A day in the life of… a cat and a teen**

**Me (Taras, 14):** I get up at 7. I have breakfast and I go to school by bus. School finishes at 2. After school I play basketball or I do my homework. I usually go to bed at 11. I never get enough sleep!

**My cat (Pixel, 3):** Pixel wakes up at 5. He sits on my face and he meows. Then he eats his breakfast. He sleeps from 6 to 12. In the afternoon he watches birds from the window. He never does homework. He always catches my socks. He goes to bed when he wants. Life is good for Pixel!`),
      vocab(`get up = вставати
have breakfast = снідати
by bus = автобусом
finish = закінчуватися
go to bed = лягати спати
enough sleep = достатньо сну
wake up = прокидатися
afternoon = після обіду, день
catch = ловити
sock = шкарпетка
always = завжди
usually = зазвичай
sometimes = іноді
never = ніколи`),
      ex(['truefalse', 'Прочитай і обери True або False.', `Taras gets up at 7. = True
Taras goes to school on foot. = False
Taras usually goes to bed at 11. = True
Pixel wakes up at 6. = False
Pixel watches birds in the afternoon. = True
Pixel does homework. = False`]),
      note('Після читання порівняй дієслова: I get up / he wakes up, I go / he goes. Попроси учня підкреслити всі дієслова про Pixel. Що в них спільного? Нехай учень сам помітить закінчення -s / -es. Також запитай: «Це відбувається зараз чи щодня?»'),

      h('Rule · 5 хв'),
      tip(`**Present Simple** це про звички, розклад і факти: те, що відбувається **регулярно** або **завжди**.

I / you / we / they → дієслово як у словнику · I **live** in Kyiv.
he / she / it → дієслово **+ s** · She **lives** in Kyiv. · My cat **loves** pizza.
Лайфхак: **he, she, it, буква S тут сидить!** Третя особа однини завжди «хвостата», як кіт.

**Як додавати -s:**
Більшість: **+s** · play → plays, sleep → sleeps
Після **-s, -sh, -ch, -x, -o**: **+es** · watch → watch**es**, go → go**es**, do → do**es**
Приголосна + **-y**: **ies** · study → stud**ies**, fly → fl**ies** (але play → plays)
Особливе: **have → has**

**Слова частоти** ПЕРЕД дієсловом: I **always** have breakfast. Але після am / is / are: I **am always** late.
always (завжди) · usually (зазвичай) · often (часто) · sometimes (іноді) · never (ніколи)`),
      note('Покажи контраст: «Right now Pixel is sleeping. He sleeps 16 hours a day.» Відпрацюй вимову закінчення: /s/ в works, /z/ в plays, /ɪz/ в watches.'),
      meme('st-cat-nightcap', 'Me: I never go to bed late.', 'Also me at 2 am: one more video.', 'Я: я ніколи не лягаю пізно. Також я о 2 ночі: ще одне відео.'),

      h('Practice · 13 хв'),
      game('He, she, it: add the tail', 'Write the he / she / it form', `go = goes
play = plays
watch = watches
study = studies
have = has
do = does
fly = flies
fix = fixes
sleep = sleeps
buy = buys
wash = washes
cry = cries`),
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
      meme('st-cat-coffee', 'My alarm rings at 7.', 'I get up at 7:45.', 'Мій будильник дзвонить о 7. Я встаю о 7:45.'),
      note('Гра на «хвостик» -s, потім вправи. Останнє речення gap з частотою на to be: «is always», бо після am / is / are слово частоти стоїть після. У перекладі «ніколи не робить» це never does, без not: в англійській одне заперечення.'),

      h('Video: Mr Bean’s morning · 7 хв'),
      video('https://www.youtube.com/watch?v=dXPLhE_z57M', 'Watch and write 5 sentences: What does Mr Bean do in the morning? (He wakes up… He gets dressed…)', 'Mr Bean Official: Alarm clock and getting up'),
      video('https://www.youtube.com/watch?v=Cl2udPfNReg', 'Watch and compare: What does Mr Bean do every morning? What do YOU do every morning?', 'Classic Mr Bean: Morning Routine'),
      note('Перед уроком переглянь і обери 3-4 паузи (після кожної нової дії, орієнтовно кожні 40-60 секунд). Під час перегляду учень може казати «He is getting up» (Present Continuous, бо зараз на екрані). Після перегляду переходимо до звички: «Every morning Mr Bean wakes up, gets up, brushes his teeth, gets dressed…» Стеж за -s і -es (brushes, washes). Останнє питання: «And you? Every morning I…» Якщо часу мало, візьми одне відео.'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

She play the guitar. → She play**s** the guitar. (he / she / it + s)
I plays football. → I **play** football. (з I без -s)
I am play basketball every day. → I **play** basketball every day. (звичка: без am)
He never doesn’t do homework. → He **never does** homework. (never вже заперечення)
She haves a cat. → She **has** a cat. (have → has)
Always I get up at 7. → I **always** get up at 7. (слово частоти перед дієсловом)`),
      ex(['choice', 'Знайди правильне речення.', `{My mum works in a hospital.|My mum work in a hospital.|My mum is work in a hospital.}
{I play basketball on Fridays.|I plays basketball on Fridays.|I am play basketball on Fridays.}
{Pixel never does homework.|Pixel never doesn’t homework.|Pixel never do homework.}
{My brother has a new phone.|My brother haves a new phone.|My brother have a new phone.}
{We usually go to school by bus.|We go usually to school by bus.|Usually we goes to school by bus.}
{She studies English every day.|She studys English every day.|She study English every day.}`]),
      note('Учень пояснює, що не так у неправильних варіантах. Коли учень забуває -s, просто покажи «котячий хвіст» рукою, щоб він сам виправився.'),

      h('Speaking · 8 хв'),
      talk(`Tell me about your typical school day. (I get up at…)
Tell me about a family member’s day. (My mum gets up at…)
What do you always do on Saturdays?
What do you never do? (I never eat…)
What does your pet (or a friend) do every day?
What does your best friend like? What does he or she do after school?
Compare: What are you doing now? What do you usually do at this time?
What does your cat do when you’re at school? Guess!
What does your teacher do after the lesson, do you think?
What do you sometimes do when you are bored in class?`),
      note('Спочатку учень розповідає про себе (без -s), потім про когось іншого (з -s). Гра «Who is it?»: учень описує людину чи тварину 3-4 реченнями (She works in a school. She checks homework.), ти вгадуєш. Потім навпаки.'),

      h('Speed round · 6 хв'),
      game('Speed round: everyday life', 'Complete with the right form of the verb', `My cat ___ (sleep) all day. = sleeps
I ___ (get) up at 7. = get
Dad ___ (watch) football. = watches
We ___ (have) maths on Monday. = have
Mia ___ (study) Spanish. = studies
The bus ___ (leave) at 8. = leaves
My friends ___ (play) games. = play
She ___ (go) to bed at 10. = goes
He ___ (have) two cats. = has
The bird ___ (fly) south in winter. = flies`),
      note('Дві спроби на час. Звертай увагу на речення з I / we / my friends: тут -s не потрібне.'),

      h('Homework · 5 хв'),
      meme('st-cat-heart', 'He never does homework.', 'He always gets snacks. Be a cat.', 'Він ніколи не робить домашку. Він завжди отримує смаколики. Будь котом.'),
      ex(['open', 'Напиши про свій день і день когось із родини або улюбленця (8-10 речень).', `Write 4-5 sentences about your typical day (I…).
Write 4-5 sentences about the day of a family member or pet (He / She / It…).
Use at least 3 words: always, usually, often, sometimes, never.`]),
      note('Домашка: «A day in the life of…» як у тексті Taras і Pixel. Мінімум 3 слова частоти. Бонус: загадка «Who is it?» з 3-4 речень. На наступному уроці перевір -s у третій особі і правопис (goes, watches, studies). Далі за програмою: заперечення в Present Simple (don’t / doesn’t).'),
    ],
  },
];
