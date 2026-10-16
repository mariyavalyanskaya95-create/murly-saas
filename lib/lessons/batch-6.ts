// Бібліотека, пакет 6: граматика для підлітків (A1-A2), 60-хвилинні уроки.
// Порядок тем як у Murphy «Essential Grammar in Use», але всі тексти, приклади і вправи власні.
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, ex, talk } = makeHelpers('b6');

export const BATCH_6: Plan[] = [
  // ---------- PRESENT SIMPLE NEGATIVE ----------
  {
    id: 'lib-gr-present-simple-negative', title: 'I don’t, she doesn’t: the art of saying no', level: 'A1', age: 'teens', topic: 'Граматика: Present Simple (заперечення)', color: 'lime', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking'],
    aims: 'Будуємо заперечення в Present Simple: I don’t play, she doesn’t play\nРозрізняємо don’t і doesn’t і не додаємо -s після doesn’t\nРозповідаємо, що ми і наші друзі не робимо\nПишемо короткий текст «Things I never do»',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What do you do every morning before school?
Do you like Mondays? Why?
Name one thing you never eat.
Name one app you never use.`),
      note('Розговори учня 3-4 хв. Не виправляй граматику, просто послухай, чи вживає він уже don’t / doesn’t. Якщо учень каже «I not like», запам’ятай і повернись до цього на етапі Rule. Наприкінці запитай: «Як сказати англійською “я не люблю понеділки”?»'),

      h('Lead-in · 8 хв'),
      t(`**Meet Biscuit, the laziest cat in Kyiv**

Biscuit is the cat of my friend Dana. He is orange, fat and very proud.

Biscuit doesn’t get up early. He sleeps until twelve. He doesn’t play with toys, because toys are “for kittens”. He doesn’t like the vacuum cleaner and he doesn’t drink water from a bowl. He only drinks from the kitchen tap!

Dana and her brother Max don’t understand Biscuit. “We don’t have a lazy day at all,” says Max. “We go to school, we do homework, we go to football. And Biscuit? He doesn’t do anything!”

But Biscuit doesn’t care. He has a very important job: he sits on Dana’s laptop when she does her homework.`),
      ex(['truefalse', 'Прочитай текст і обери True або False.', `Biscuit gets up early. = False
Biscuit plays with toys every day. = False
Biscuit doesn’t like the vacuum cleaner. = True
Biscuit drinks water from a bowl. = False
Dana and Max don’t have a lazy day. = True
Biscuit sits on Dana’s laptop. = True`]),
      note('Учень читає текст вголос (або ти читаєш, а він слідкує). Після True / False попроси знайти в тексті всі заперечення і підкреслити їх. Запитай: чому про Biscuit «doesn’t», а про Dana and Max «don’t»? Нехай учень сам спробує сформулювати правило.'),

      h('Rule · 10 хв'),
      tip(`**Заперечення в Present Simple = don’t / doesn’t + дієслово без змін.**

**I / you / we / they** + **don’t** (= do not) + дієслово
**he / she / it** + **doesn’t** (= does not) + дієслово

I **don’t** like spinach. = Я не люблю шпинат.
You **don’t** know my password. = Ти не знаєш мій пароль.
We **don’t** have lessons on Sunday. = У нас немає уроків у неділю.
They **don’t** live here. = Вони тут не живуть.
She **doesn’t** like spinach. = Вона не любить шпинат.
He **doesn’t** play chess. = Він не грає в шахи.
My cat **doesn’t** eat vegetables. = Мій кіт не їсть овочі.`),
      tip(`**Лайфхак «Злодій -s».** У he / she / it дієслово отримує -s: She play**s**. Але в запереченні **doesn’t** «краде» цю -s собі: She doe**s**n’t play. Тому після doesn’t дієслово завжди голе, без -s.

Правильно: He doesn’t **play**. He doesn’t **watch**. She doesn’t **go**.
Неправильно: He doesn’t plays. She doesn’t goes.

І ще: просто **not** перед дієсловом не працює. Не «I not like», а **I don’t like**.`),
      note('Типові помилки українськомовних учнів: «I not like» (бо в українській просто «не»), «She don’t like», «He doesn’t likes». Намалюй дві колонки: don’t (I, you, we, they) і doesn’t (he, she, it). Покажи «злодія -s»: напиши She plays, потім доклей doesn’t і перенеси -s стрілкою. Попроси учня перетворити 3 речення з тексту про Biscuit на ствердження і назад.'),

      h('Practice · 15 хв'),
      ex(
        ['gap', 'Розкрий дужки. Напиши don’t або doesn’t + дієслово.', `I [don’t like/do not like] (not like) horror films.
My sister [doesn’t eat/does not eat] (not eat) meat.
We [don’t have/do not have] (not have) PE on Fridays.
Our cat [doesn’t go/does not go] (not go) outside.
Tom [doesn’t watch/does not watch] (not watch) TV in the morning.
They [don’t live/do not live] (not live) near the school.
My phone [doesn’t work/does not work] (not work) without Wi-Fi.
You [don’t need/do not need] (not need) a pen for this test.`],
        ['choice', 'Обери правильний варіант.', `She {doesn’t|don’t|not} like rap music.
I {don’t|doesn’t|not} play the guitar.
My friends {don’t|doesn’t|aren’t} use Facebook.
Max doesn’t {wear|wears|wearing} a school uniform.
It {doesn’t|don’t|isn’t} rain much in summer here.
We {don’t|doesn’t|not} get up early on Saturday.`],
      ),
      ex(
        ['sort', 'Розклади займенники та іменники по групах.', `don’t: I, you, we, they, my parents, Ann and Kate
doesn’t: he, she, it, my brother, the cat, our teacher`],
        ['translate', 'Переклади англійською.', `Я не п’ю каву = I don’t drink coffee / I do not drink coffee
Мій брат не любить математику = My brother doesn’t like maths / My brother does not like maths / My brother doesn’t like math / My brother does not like math
Ми не граємо у футбол = We don’t play football / We do not play football
Кіт не їсть рибу = The cat doesn’t eat fish / The cat does not eat fish / A cat doesn’t eat fish
Вони не знають відповідь = They don’t know the answer / They do not know the answer
Вона не ходить до школи в суботу = She doesn’t go to school on Saturday / She does not go to school on Saturday / She doesn’t go to school on Saturdays / She does not go to school on Saturdays`],
      ),
      note('Gap і choice учень робить сам (6-7 хв), потім перевірка разом: проси пояснити кожну відповідь словами «бо she, тому doesn’t». Sort робимо усно і швидко. У перекладі звертай увагу, щоб після doesn’t не було -s. Якщо учень пише повну форму do not, це теж правильно.'),

      h('Speaking · 10 хв'),
      talk(`Tell me three things you don’t do at the weekend.
What food doesn’t your best friend like?
What doesn’t your teacher allow in class?
Which apps don’t you use? Why?
What doesn’t your pet (or a pet you know) like?
What don’t your parents understand about teenagers?`),
      note('Учень відповідає повними реченнями з don’t / doesn’t. Після кожної відповіді постав уточнювальне питання (Why not?). Друге коло: гра «Two truths and a lie» у запереченнях: учень каже 3 речення про себе з don’t, ти вгадуєш, яке неправда. Потім міняєтеся. Записуй помилки і розбери 2-3 наприкінці етапу.'),

      h('Game: Find the mistake · 7 хв'),
      ex(['choice', 'Детектив помилок: обери правильне речення.', `{My dog doesn’t like cats.|My dog don’t like cats.|My dog doesn’t likes cats.}
{We don’t go to school in July.|We doesn’t go to school in July.|We not go to school in July.}
{Ira doesn’t speak French.|Ira doesn’t speaks French.|Ira not speak French.}
{I don’t understand this joke.|I doesn’t understand this joke.|I not understand this joke.}
{The bus doesn’t stop here.|The bus don’t stop here.|The bus doesn’t stops here.}
{They don’t watch cartoons now.|They doesn’t watch cartoons now.|They don’t watches cartoons now.}`]),
      note('Перетвори вправу на гру на час: 60 секунд на всі речення. За кожну правильну відповідь бал, за пояснення помилки ще бал. Якщо урок у групі, грайте командами.'),

      h('Homework · 5 хв'),
      ex(
        ['gap', 'Зроби речення запереченнями.', `Lily plays tennis. → Lily [doesn’t play/does not play] tennis.
I like pizza with pineapple. → I [don’t like/do not like] pizza with pineapple.
Our teacher gives a lot of homework. → Our teacher [doesn’t give/does not give] a lot of homework.
My cousins live in Lviv. → My cousins [don’t live/do not live] in Lviv.
The cat sleeps on my bed. → The cat [doesn’t sleep/does not sleep] on my bed.`],
        ['open', 'Напиши 6 речень «Things I never do» (3 про себе, 3 про когось із родини або друзів).', 'Things I don’t do... Things my friend or my mum doesn’t do...'],
      ),
      note('Домашнє завдання: вправа на перетворення + 6 речень про себе й інших. Перевір, щоб у трьох реченнях було doesn’t. На наступному уроці почни з того, що учень читає 2 найсмішніші речення.'),
    ],
  },

  // ---------- PRESENT SIMPLE QUESTIONS ----------
  {
    id: 'lib-gr-present-simple-questions', title: 'Do you...? Does she...? The question game', level: 'A1', age: 'teens', topic: 'Граматика: Present Simple (питання)', color: 'sky', source: 'murly',
    focus: ['Grammar', 'Listening', 'Speaking'],
    aims: 'Ставимо загальні питання в Present Simple: Do you like...? Does she play...?\nКоротко відповідаємо: Yes, I do. / No, she doesn’t.\nСтавимо спеціальні питання з where, what, when, how often\nБеремо інтерв’ю в однокласника чи вчителя',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What questions do new people usually ask you?
What is a good first question for a new classmate?
Do you like answering questions? Why or why not?`),
      note('Попроси учня поставити тобі 3 будь-які питання англійською. Не виправляй, просто запиши їх. Найчастіше учні роблять «You like music?» без do. Наприкінці уроку повернись до цих питань і виправте їх разом.'),

      h('Lead-in · 8 хв'),
      audio('A new girl in class', `
Mark: Hi! Are you new here?
Sofia: Yes, I’m Sofia. I’m from Odesa.
Mark: Cool. I’m Mark. Do you like our school?
Sofia: Yes, I do. It’s big and the canteen is good.
Mark: Do you play any sports?
Sofia: Yes, I do. I play volleyball.
Mark: Nice! Does your brother go to this school too?
Sofia: No, he doesn’t. He’s only five.
Mark: Where do you live?
Sofia: Near the park. Do you know the yellow building?
Mark: Yes! My cat lives there. Well, he thinks he lives there. He visits a lady on the first floor every day.
Sofia: Ha! Does she feed him?
Mark: Yes, she does. That’s why he loves her more than me.
Sofia: What time does the first lesson start?
Mark: At half past eight. Come on, we’re late!`),
      ex(['truefalse', 'Послухай діалог і обери True або False.', `Sofia is from Odesa. = True
Sofia doesn’t like the school. = False
Sofia plays basketball. = False
Sofia’s brother goes to the same school. = False
Mark’s cat visits a lady every day. = True
The first lesson starts at half past eight. = True`]),
      note('Перше слухання: хто ці люди і де вони? Друге слухання: True / False. Потім попроси учня записати всі питання з do / does, які він чує (Do you like...? Do you play...? Does your brother...? Where do you live? Does she feed him? What time does...?). Звідси переходимо до правила.'),

      h('Rule · 10 хв'),
      tip(`**Питання в Present Simple: Do / Does + хто + дієслово?**

**Do** + I / you / we / they + дієслово?
**Does** + he / she / it + дієслово?

**Do** you **like** pizza? = Ти любиш піцу?
**Do** they **live** in Kharkiv? = Вони живуть у Харкові?
**Does** she **play** the piano? = Вона грає на піаніно?
**Does** your cat **sleep** a lot? = Твій кіт багато спить?

**Короткі відповіді:**
Yes, I **do**. / No, I **don’t**.
Yes, she **does**. / No, she **doesn’t**.`),
      tip(`**Спеціальні питання: слово-питання + do / does + хто + дієслово?**

**Where** do you live? = Де ти живеш?
**What** does he want? = Що він хоче?
**When** do they have lunch? = Коли вони обідають?
**How often** does she go to the gym? = Як часто вона ходить у спортзал?

**Лайфхак.** Does знову «краде» -s, як у запереченнях: She play**s**. → **Does** she play? Не «Does she plays?».
Формула-потяг: **QW** (where, what...) → **do / does** → **хто** → **дієслово** → решта.`),
      note('Типові помилки: «You like music?» (без do, бо в українській питання робимо інтонацією), «Does he likes...?», «Where you live?», відповідь «Yes, I like» замість «Yes, I do». Покажи формулу-потяг на папері: вагончики QW / do-does / subject / verb. Учень складає питання з розрізаних карток або усно ставить слова по порядку.'),

      h('Practice · 15 хв'),
      ex(
        ['choice', 'Do чи Does?', `{Do|Does} you speak English?
{Does|Do} your dad cook dinner?
{Do|Does} they go to the same school?
{Does|Do} the cat like milk?
{Do|Does} we have homework today?
{Does|Do} Olya play the drums?`],
        ['gap', 'Допиши питання.', `[Do] you like hip-hop? Yes, I do.
[Does] your sister wear glasses? No, she doesn’t.
Where [do] you buy your sneakers?
What time [does] the film start?
[Does] your cat [catch] (catch) mice? Yes, he does.
How often [do] they [play] (play) computer games?
What [does] Ivan [want] (want) for his birthday?`],
      ),
      ex(
        ['match', 'Знайди відповідь на питання.', `Do you like cats? = Yes, I do. I have two.
Does your brother play football? = No, he doesn’t. He plays tennis.
Where do you live? = In a flat near the river.
What time does school start? = At eight thirty.
How often do you go swimming? = Twice a week.
Does Anna have a phone? = Yes, she does. It’s new.`],
        ['translate', 'Переклади англійською.', `Ти граєш у шахи? = Do you play chess?
Твоя мама працює в лікарні? = Does your mum work in a hospital? / Does your mom work in a hospital? / Does your mother work in a hospital?
Де живе твій друг? = Where does your friend live?
Що ти їси на сніданок? = What do you eat for breakfast? / What do you have for breakfast?
Твій кіт любить рибу? = Does your cat like fish?
Коли вони роблять домашнє завдання? = When do they do their homework? / When do they do homework?`],
      ),
      note('Перші дві секції учень робить сам, потім перевірка. У match звертай увагу, як відповідь «відзеркалює» питання: Do you...? Yes, I do. У перекладі нагадай: українською питання можна зробити лише інтонацією, англійською обов’язково потрібно do / does.'),

      h('Speaking · 10 хв'),
      talk(`Ask me 5 questions about my day. Start with: Do you...? / What time do you...?
Do you have a favourite YouTuber? What does he or she do?
How often do you play video games?
Does your best friend like the same music as you?
What do your parents do at the weekend?
Where do you usually spend your summer?
Does anyone in your family have a pet? What does it eat?`),
      note('Спершу учень ставить тобі 5 питань (перше завдання), ти відповідаєш коротко і ставиш зустрічне. Потім ти питаєш решту. Вимагай короткі відповіді (Yes, I do / No, she doesn’t) + одне речення деталі. Рольова гра наприкінці: учень журналіст шкільної газети, бере інтерв’ю у «зірки» (тебе).'),

      h('Game: Quiz show · 7 хв'),
      ex(['choice', 'Вікторина «Чи знаєш ти тварин?» Обери правильну відповідь.', `Does a penguin fly? {No, it doesn’t.|Yes, it does.|No, it isn’t.}
Do cats sleep a lot? {Yes, they do.|Yes, they does.|Yes, they are.}
Does a giraffe have a long neck? {Yes, it does.|Yes, it do.|Yes, it has.}
Do fish drink milk? {No, they don’t.|No, they doesn’t.|No, they aren’t.}
Where do pandas live? {In China.|In Brazil.|In Canada.}
What does a koala eat? {Leaves.|Fish.|Pizza.}`]),
      note('Грайте як телешоу: ти ведучий, учень гравець. 10 секунд на відповідь. Після вікторини учень складає 3 свої питання-загадки про тварин з Does a... ? і ставить тобі.'),

      h('Homework · 5 хв'),
      ex(
        ['gap', 'Зроби питання з речень.', `She likes K-pop. → [Does she like] K-pop?
They live in Dnipro. → [Do they live] in Dnipro?
Your dog sleeps on the sofa. → [Does your dog sleep] on the sofa?
You play the guitar. → [Do you play] the guitar?
Max gets up at seven. → What time [does Max get up]?`],
        ['open', 'Напиши 6 питань для інтерв’ю з другом або подругою і запиши їхні відповіді.', 'Do you...? Does your...? Where do you...? What time do you...? How often do you...?'],
      ),
      note('Домашнє: перетворення речень на питання + міні-інтерв’ю (6 питань і відповіді друга). На початку наступного уроку учень коротко розповідає про друга в третій особі: He likes... He doesn’t...'),
    ],
  },

  // ---------- PRESENT CONTINUOUS VS PRESENT SIMPLE ----------
  {
    id: 'lib-gr-continuous-vs-simple', title: 'Right now or every day? Continuous vs Simple', level: 'A2', age: 'teens', topic: 'Граматика: Present Continuous і Present Simple', color: 'mustard', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking', 'Writing'],
    aims: 'Розрізняємо, що відбувається зараз (I am reading) і що буває завжди чи регулярно (I read)\nВпізнаємо слова-підказки: now, at the moment, every day, usually, often\nЗнаємо дієслова, які не люблять -ing: like, want, know, need\nОписуємо свій звичайний день і «прямий ефір» прямо зараз',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What are you doing right now?
What do you usually do at this time on Saturday?
What is your best friend doing now, do you think?`),
      note('Можеш показати фото з телефону (людина в кафе, кіт на дивані) і запитати What is he doing? What does he usually do? Слухай, чи змішує учень часи. Не пояснюй правило, лише створи потребу: «Цікаво, чому одне речення з -ing, а інше ні?»'),

      h('Lead-in · 8 хв'),
      t(`**Stories from a cat’s phone**

Hi, I’m Pixel, a grey cat. Every morning I wake up at six. I usually sit on my owner’s face until she gets up. She feeds me, and then she goes to school. In the afternoon I sleep on the windowsill. I don’t go outside, because I’m an indoor cat.

But today is different. Today is Saturday! At the moment my owner, Kira, isn’t sleeping. She is sitting at her desk and she is drawing a comic about me. Her little brother is playing a video game and he is shouting at the screen. And me? I’m lying on Kira’s drawing. She isn’t smiling. I think she wants a new model.`),
      ex(['truefalse', 'Прочитай і обери True або False.', `Pixel usually wakes up at six. = True
Pixel goes outside every afternoon. = False
Kira is sleeping at the moment. = False
Kira is drawing a comic about Pixel. = True
Kira’s brother is doing his homework now. = False
Pixel is lying on Kira’s drawing. = True`]),
      note('Після True / False дай учневі два кольори: одним підкреслити дії «щодня, зазвичай» (wakes up, sit, feeds, goes, sleep), іншим дії «зараз» (is sitting, is drawing, is playing, am lying). Запитай, які слова допомогли розрізнити (every morning, usually, today, at the moment).'),

      h('Rule · 10 хв'),
      tip(`**Present Simple = звичка, розклад, факт.** Так буває завжди або регулярно.
I **play** football every Tuesday. = Я граю у футбол щовівторка.
My cat **sleeps** a lot. = Мій кіт багато спить.
Слова-підказки: **every day, usually, often, sometimes, never, always, on Mondays**.

**Present Continuous = прямо зараз або в цей період.** Am / is / are + дієслово-ing.
I **am playing** football now. = Я граю у футбол зараз.
My cat **is sleeping** on my bag at the moment. = Мій кіт зараз спить на моїй сумці.
Слова-підказки: **now, right now, at the moment, today, Look!, Listen!**

Порівняй:
She **watches** anime every evening. (звичка)
She **is watching** anime now. (зараз, у прямому ефірі)`),
      tip(`**Асоціація: фото чи відео?**
Present Simple схожий на **фото профілю**: так людина виглядає завжди. Present Continuous схожий на **сторіз у прямому ефірі**: це відбувається просто зараз.

**Дієслова-«ліниві»:** like, love, hate, want, need, know, understand, believe майже ніколи не беруть -ing.
Правильно: I **want** a pizza now. I **know** the answer.
Неправильно: I am wanting a pizza. I am knowing the answer.

**Питання і заперечення:**
Do you **play**...? / I **don’t play**... (Simple)
**Are** you **playing**...? / I **am not playing**... (Continuous)`),
      note('Типові помилки: «I am go to school every day» (змішування двох часів), «She is play», «I am liking it» (під впливом реклами), пропуск am / is / are: «I playing». Намалюй дві колонки «Фото профілю» і «Прямий ефір» і розклади в них слова-підказки. Попроси учня придумати по реченню про себе в кожну колонку.'),

      h('Practice · 15 хв'),
      ex(
        ['choice', 'Обери правильний варіант.', `Look! The cat {is climbing|climbs} the curtains.
I {go|am going} to the gym three times a week.
Shh! My dad {is talking|talks} on the phone.
My sister usually {wears|is wearing} black clothes.
We {are having|have} lunch at the moment. Can I call you later?
Water {boils|is boiling} at 100 degrees.
I {want|am wanting} a new phone.
Ira {doesn’t eat|isn’t eating} meat. She is a vegetarian.`],
        ['gap', 'Розкрий дужки: Present Simple чи Present Continuous?', `Every day Nazar [walks] (walk) his dog after school.
Right now Nazar [is walking/’s walking] (walk) his dog in the park.
My mum [works] (work) in a bank.
Listen! Someone [is playing/’s playing] (play) the piano.
I [don’t understand/do not understand] (not understand) this question.
What [are you doing] (you / do) now? I’m texting Oleh.
How often [do you go] (you / go) to the cinema?
Today it [is raining/’s raining] (rain), so we [are staying/’re staying] (stay) at home.`],
      ),
      ex(
        ['sort', 'Розклади слова-підказки по групах.', `Present Simple: every day, usually, often, never, on Fridays, always
Present Continuous: now, right now, at the moment, Look!, Listen!, today`],
        ['translate', 'Переклади англійською.', `Я зазвичай слухаю музику в автобусі = I usually listen to music on the bus / I usually listen to music in the bus
Зараз я слухаю подкаст = I am listening to a podcast now / I’m listening to a podcast now / Now I am listening to a podcast / Now I’m listening to a podcast
Мій брат щодня грає в ігри = My brother plays games every day / My brother plays video games every day
Подивись! Кіт їсть мій бутерброд! = Look! The cat is eating my sandwich! / Look! The cat’s eating my sandwich!
Вона не дивиться телевізор зараз = She isn’t watching TV now / She is not watching TV now / She’s not watching TV now
Я знаю цю пісню = I know this song`],
      ),
      note('Choice і gap учень робить сам (8 хв). На перевірці щоразу питай: «Фото чи прямий ефір?» Звертай увагу на речення з want і understand: тут без -ing. Sort можна зробити усно за 1 хв. У перекладі прийми скорочені і повні форми.'),

      h('Speaking · 10 хв'),
      talk(`What do you usually do after school? What are you doing this week that is different?
What does your family usually do on Sunday?
Look out of the window. What are people doing?
What is your favourite series? What is happening in it now?
What do you usually wear to school? What are you wearing today?
Do you read books? Are you reading anything at the moment?`),
      note('Учень відповідає на кожне питання двома реченнями: одне в Simple, одне в Continuous. Гра «Шпигун»: учень дивиться у вікно або на фото (можна знайти фото вулиці) і коментує як спортивний коментатор: A man is crossing the street. He usually... Помилки записуй і розбери після етапу.'),

      h('Game: Find the mistake · 7 хв'),
      ex(['choice', 'Детектив помилок: обери правильне речення.', `{I know the answer!|I am knowing the answer!|I knowing the answer!}
{She is doing her homework now.|She does her homework now.|She doing her homework now.}
{We often go to the river in summer.|We are often going to the river in summer.|We often going to the river in summer.}
{Look! It is snowing!|Look! It snows!|Look! It snowing!}
{He doesn’t like sushi.|He isn’t liking sushi.|He not like sushi.}
{My cat sleeps sixteen hours a day.|My cat is sleeping sixteen hours a day.|My cat sleep sixteen hours a day.}`]),
      note('Можна грати на бали: 1 бал за правильне речення, 1 бал за пояснення «чому інші неправильні». Наприкінці попроси учня придумати власне речення з помилкою для тебе.'),

      h('Homework · 5 хв'),
      ex(
        ['gap', 'Розкрий дужки.', `My grandma [makes] (make) pancakes every Sunday.
Be quiet! The baby [is sleeping/’s sleeping] (sleep).
I [need] (need) help with this task.
They [are playing/’re playing] (play) basketball at the moment.
Ostap never [drinks] (drink) coffee.`],
        ['open', 'Напиши два міні-тексти по 4-5 речень.', `My usual Saturday (що ти зазвичай робиш у суботу)
Right now at my home (що відбувається вдома просто зараз, як у прямому ефірі)`],
      ),
      note('Домашнє: вправа + два міні-тексти. Перевір, щоб у першому тексті були слова usually / often / every, а в другому now / at the moment. На наступному уроці учень читає «прямий ефір», а ти вгадуєш, о котрій годині він його писав.'),
    ],
  },

  // ---------- HAVE / HAVE GOT ----------
  {
    id: 'lib-gr-have-got', title: 'Have you got a cat? Have and have got', level: 'A1', age: 'teens', topic: 'Граматика: have / have got', color: 'tomato', source: 'murly',
    focus: ['Grammar', 'Listening', 'Speaking'],
    aims: 'Кажемо, що в нас є: I have got / I have a cat\nСтавимо питання і заперечення: Have you got...? Do you have...? I haven’t got / I don’t have\nЗнаємо, що he / she / it has got або has\nРозповідаємо про свою родину, речі й улюбленця',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What is in your school bag today?
Have you got a pet? What is its name?
What three things do you always have with you?`),
      note('Гра «Що в рюкзаку?»: учень за 30 секунд називає речі зі свого рюкзака чи кімнати англійською. Потім запитай Have you got a pet? і послухай відповідь. Не виправляй, лише зверни увагу, чи учень каже «I have got» чи «I have».'),

      h('Lead-in · 8 хв'),
      audio('Two cat owners at the vet', `
Lena: Hi! Is that your cat? He’s huge!
Artem: Yes, this is Pumpkin. He’s got a cold, so we’re here to see the vet.
Lena: Oh, poor thing. My cat has got a problem with her teeth.
Artem: Have you got just one cat?
Lena: No, I’ve got two cats and a hamster. What about you?
Artem: Only Pumpkin. But he’s got a lot of toys. He has more toys than me!
Lena: Ha! Does he have a favourite toy?
Artem: Yes, he does. A plastic fish. He hasn’t got any interest in the expensive ones.
Lena: Typical cat. Have you got a photo of him with the fish?
Artem: Yes, I have. Look! My sister has got a hundred photos of him. She’s got a lot of free time.
Lena: I haven’t got a sister, only a brother. And he hasn’t got time for anything, only football.`),
      ex(['truefalse', 'Послухай і обери True або False.', `Pumpkin has got a cold. = True
Lena has got one cat. = False
Lena has got a hamster. = True
Pumpkin’s favourite toy is a plastic fish. = True
Artem hasn’t got a sister. = False
Lena has got a brother. = True`]),
      note('Перше слухання: хто ці люди і де вони? Друге: True / False. Потім попроси учня записати з діалогу всі форми have / has got і don’t / doesn’t have. Зверни увагу на скорочення: He’s got = He has got (а не He is got!).'),

      h('Rule · 10 хв'),
      tip(`**Have got і have означають одне: «у мене є».**

**I / you / we / they** + **have got** (’ve got) = **have**
**he / she / it** + **has got** (’s got) = **has**

I**’ve got** a bike. = I **have** a bike. = У мене є велосипед.
She**’s got** blue eyes. = She **has** blue eyes. = У неї блакитні очі.
My cat **has got** a long tail. = My cat **has** a long tail. = У мого кота довгий хвіст.

Have got частіше кажуть у британській англійській, а have працює всюди. Обидва правильні.`),
      tip(`**Заперечення і питання: дві команди, не змішуй!**

**Команда «got»** (без do / does):
I **haven’t got** a phone. / She **hasn’t got** a phone.
**Have** you **got** a phone? Yes, I **have**. / No, I **haven’t**.
**Has** she **got** a phone? Yes, she **has**. / No, she **hasn’t**.

**Команда «do»** (як звичайне дієслово):
I **don’t have** a phone. / She **doesn’t have** a phone.
**Do** you **have** a phone? Yes, I **do**. / No, I **don’t**.
**Does** she **have** a phone? Yes, she **does**. / No, she **doesn’t**.

**Лайфхак:** got і do не дружать. Неправильно: «Do you have got...?», «She doesn’t has».
**Пастка:** He**’s** got = He **has** got, а не He is got.`),
      note('Типові помилки: «I have a cat» на питання «Have you got...?» відповідають «Yes, I have got» (треба просто Yes, I have), «Do you have got», «She have got», «She doesn’t has», «He is got». Покажи дві «команди» у вигляді двох колонок. Попроси учня перекласти одне й те саме речення двома способами.'),

      h('Practice · 15 хв'),
      ex(
        ['choice', 'Обери правильний варіант.', `My brother {has got|have got|is got} a new laptop.
{Have|Has|Do} you got any brothers or sisters?
I {haven’t got|don’t got|not have} a smartwatch.
{Does|Do|Has} your teacher have a car?
Our cat {doesn’t have|doesn’t has|don’t have} a collar.
They {have got|has got|are got} a big garden.
Has your friend got a dog? Yes, he {has|does|is}.
Do you have a TikTok account? No, I {don’t|haven’t|doesn’t}.`],
        ['gap', 'Розкрий дужки. Використай have got / has got або haven’t got / hasn’t got.', `I [have got/’ve got] (have got) two cousins.
Mia [has got/’s got] (have got) long curly hair.
We [haven’t got/have not got] (not have got) a printer at home.
My hamster [has got/’s got] (have got) very small ears.
[Have] you [got] a ruler? Yes, I have.
Dan [hasn’t got/has not got] (not have got) a bike, he walks to school.
[Has] your sister [got] a boyfriend? No, she hasn’t.`],
      ),
      ex(
        ['match', 'Знайди коротку відповідь.', `Have you got a pet? = Yes, I have.
Has she got a phone? = No, she hasn’t.
Do you have a brother? = Yes, I do.
Does he have a bike? = No, he doesn’t.
Have they got a car? = Yes, they have.
Do we have a test today? = No, we don’t.`],
        ['translate', 'Переклади англійською (можна have або have got).', `У мене є кіт = I have a cat / I have got a cat / I’ve got a cat
У неї немає телефона = She doesn’t have a phone / She does not have a phone / She hasn’t got a phone / She has not got a phone
У тебе є олівець? = Do you have a pencil? / Have you got a pencil?
У мого друга є старший брат = My friend has an older brother / My friend has got an older brother / My friend’s got an older brother
У нас немає уроків сьогодні = We don’t have lessons today / We do not have lessons today / We haven’t got lessons today / We have not got lessons today / We don’t have any lessons today / We haven’t got any lessons today
У твого кота є іграшки? = Does your cat have toys? / Has your cat got toys? / Does your cat have any toys? / Has your cat got any toys?`],
      ),
      note('Choice і gap учень робить сам. На перевірці питай: «Яка це команда, got чи do?» У match важливо, щоб коротка відповідь була з тієї ж «команди», що й питання. У перекладі прийми обидва варіанти, але попроси учня назвати другий варіант усно.'),

      h('Speaking · 10 хв'),
      talk(`Have you got any brothers or sisters? What have they got that you haven’t got?
Describe your pet or your dream pet. What has it got?
Do you have a favourite thing in your room? What is it?
What has your best friend got that you would like to have?
Have you got any hobbies that need special things?
What things do you have on your phone? What apps have you got?`),
      note('Гра «Знайди відмінності»: ти описуєш свою уявну кімнату (I’ve got a red sofa, I haven’t got a TV), учень описує свою, і ви знаходите 3 спільні речі і 3 відмінності. Потім гра «20 питань» про таємного кота: Has it got long hair? Does it have green eyes? Записуй помилки, розбери наприкінці.'),

      h('Game: Monster maker · 7 хв'),
      t(`**Meet Zog, the school monster**

Zog has got three eyes and two big noses. He hasn’t got any hair, but he has got a long green tail. He has got six legs, so he is very fast in PE. Zog doesn’t have a phone, but he has a pet: a small blue cat with wings. They have got the same favourite food: socks!`),
      ex(['choice', 'Прочитай про монстра Зога і обери правильну відповідь.', `Has Zog got hair? {No, he hasn’t.|Yes, he has.|No, he doesn’t.}
How many eyes has Zog got? {Three.|Two.|Six.}
Does Zog have a phone? {No, he doesn’t.|Yes, he does.|No, he hasn’t got.}
What has Zog’s pet got? {Wings.|Six legs.|Three noses.}
What food have Zog and his cat got in common? {Socks.|Fish.|Pizza.}`]),
      note('Після вправи учень малює власного монстра (1-2 хв) і описує його 5 реченнями з has got / hasn’t got / doesn’t have. Ти малюєш монстра за описом і потім порівнюєте малюнки. Дуже весело і закріплює правило.'),

      h('Homework · 5 хв'),
      ex(
        ['gap', 'Допиши правильну форму.', `My mum [has got/’s got/has] two sisters.
[Have] you got a calculator? Yes, I have.
Ivan [doesn’t have/does not have] a computer. He has a tablet.
[Does] your school have a swimming pool? No, it doesn’t.
We [haven’t got/have not got] a cat, but we have got a parrot.`],
        ['open', 'Напиши 6-8 речень про свою родину і улюбленця (або улюбленця мрії).', 'I’ve got... My brother has got... We don’t have... My cat hasn’t got...'],
      ),
      note('Домашнє: вправа + текст про родину й улюбленця з обома формами (have got і do / does have). Попроси використати хоча б одне заперечення і одне питання в кінці тексту до читача (Have you got a pet?).'),
    ],
  },

  // ---------- WAS / WERE ----------
  {
    id: 'lib-gr-was-were', title: 'Was it fun? Were you there? Was and were', level: 'A1', age: 'teens', topic: 'Граматика: was / were', color: 'pink', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking', 'Writing'],
    aims: 'Розповідаємо про минуле з дієсловом to be: I was, they were\nБудуємо заперечення wasn’t / weren’t і питання Was it...? Were you...?\nВживаємо слова-підказки yesterday, last week, ago, in 2020\nРозповідаємо, де ми були і якими були вчора та в дитинстві',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`How are you today? And how were you yesterday?
Where are you now? Where were you at 8 o’clock this morning?
What is your favourite day of the week? Why?`),
      note('Почни з теперішнього: Where are you now? I am at home. Потім одразу питай про вчора: Where were you yesterday at 5? Зверни увагу, чи учень сам переходить на was / were, чи каже «I am in school yesterday». Не виправляй, лише «збери» помилки.'),

      h('Lead-in · 8 хв'),
      t(`**Where was the cat?**

Yesterday was a strange day in our flat. My cat Tofu wasn’t in his bed in the morning. He wasn’t in the kitchen and he wasn’t under the sofa. My parents were at work, and my little sister and I were very worried.

“Was he on the balcony?” asked my sister. No, he wasn’t. “Were the windows open?” No, they weren’t.

Then, at seven o’clock, my mum was home from work. She was very surprised. “Why are you so sad?” she asked. “Tofu isn’t here!” we said. Mum laughed. “He was in my shopping bag! He was with me in the supermarket all day!”

Tofu was very happy. We were not.`),
      ex(['truefalse', 'Прочитай і обери True або False.', `Tofu was in his bed in the morning. = False
The parents were at work. = True
The children were worried. = True
The windows were open. = False
Tofu was in the mum’s shopping bag. = True
The children were happy at the end. = False`]),
      note('Учень читає текст. Після True / False попроси знайти і підкреслити всі was і were (і wasn’t / weren’t). Запитай: коли тут was, а коли were? Хай учень спробує сам вивести, що was для однини, were для множини і для you.'),

      h('Rule · 10 хв'),
      tip(`**Was / were = минулий час від am / is / are (to be).**

am → **was**
is → **was**
are → **were**

**I / he / she / it** + **was**
**you / we / they** + **were**

I **was** at school yesterday. = Я був у школі вчора.
My cat **was** under the bed. = Мій кіт був під ліжком.
You **were** late! = Ти запізнився!
We **were** at the cinema last night. = Ми були в кіно вчора ввечері.
The tests **were** easy. = Тести були легкі.`),
      tip(`**Заперечення:** was not = **wasn’t**, were not = **weren’t**
I **wasn’t** tired. They **weren’t** at home.

**Питання:** was / were ставимо на перше місце, без did!
**Was** the film good? Yes, it **was**. / No, it **wasn’t**.
**Were** you at the party? Yes, I **was**. / No, I **wasn’t**.
**Where were** you yesterday? I **was** at my grandma’s.

**Слова-підказки:** yesterday, last week, last year, two days ago, in 2019, when I was five.

**Лайфхак:** «**you** завжди **were**», навіть якщо ти одна людина. You were (ти був), you were (ви були).`),
      note('Типові помилки: «I were», «You was», «Did you was...?» (змішують з did), «I was go to the park» (додають was до звичайного дієслова). Поясни: was / were це тільки минуле від to be, для інших дієслів буде інша тема (Past Simple). Таблиця «am, is → was / are → were» на папері. Попроси учня перетворити 3 речення про сьогодні на речення про вчора.'),

      h('Practice · 15 хв'),
      ex(
        ['gap', 'Встав was або were.', `I [was] at my friend’s house yesterday.
The pizza [was] delicious.
My parents [were] in Lviv last weekend.
You [were] very funny in the video!
It [was] cold and rainy on Monday.
We [were] late for the first lesson.
The cats [were] on the roof all night.
My first phone [was] pink.`],
        ['choice', 'Обери правильний варіант.', `They {weren’t|wasn’t|didn’t} at the concert.
{Were|Was|Did} you tired after the match?
The test {wasn’t|weren’t|didn’t} difficult.
{Was|Were|Did} your teacher angry? No, she {wasn’t|weren’t|didn’t}.
Where {were|was|did} you at 9 o’clock?
I {was|were|am} ten years old in 2020.`],
      ),
      ex(
        ['sort', 'Розклади слова по групах: was чи were?', `was: I, he, she, it, my dog, the lesson
were: you, we, they, my friends, the shoes, Tom and Kate`],
        ['translate', 'Переклади англійською.', `Я був удома вчора = I was at home yesterday / Yesterday I was at home
Мої друзі були в парку = My friends were in the park / My friends were at the park
Фільм був нудний = The film was boring / The movie was boring
Ти був у школі в понеділок? = Were you at school on Monday? / Were you in school on Monday?
Ми не були втомлені = We weren’t tired / We were not tired
Де був твій кіт? = Where was your cat?`],
      ),
      note('Gap і choice учень робить сам (7-8 хв). На перевірці питай: «одна людина чи багато? А якщо you?» Зверни увагу на речення з did у choice: учні часто ставлять Did you tired? Поясни, що з was / were did не потрібен. У перекладі прийми різні прийменники at / in, якщо вони природні.'),

      h('Speaking · 10 хв'),
      talk(`Where were you last Saturday at 3 o’clock?
What was your favourite toy when you were five?
Who was your first best friend?
Was your last holiday fun? Where were you?
Were your parents strict when you were little?
What was the best day of last month? Why?
Were you ever on TV or in a school show?`),
      note('Учень відповідає повними реченнями з was / were, а ти ставиш уточнювальні питання: Was it fun? Who were you with? Гра «Алібі»: «Вчора о 18:00 з холодильника зник торт». Учень детектив і питає тебе Where were you at six? Were you alone? Was the kitchen door open? Потім міняєтеся. Записуй помилки, розбери 2-3 наприкінці.'),

      h('Game: Mini-story · 7 хв'),
      ex(['gap', 'Допиши історію словами was, were, wasn’t, weren’t.', `Last Friday [was] the day of our school disco.
My friends and I [were] very excited.
The music [was] great, but the room [was] very hot.
My best friend Oksana [wasn’t/was not] there, because she [was] ill.
The teachers [were] near the door, and they [weren’t/were not] happy with the loud music.
But the best moment [was] at the end: the school cat [was] on the stage, and everybody [was] dancing with him!`]),
      note('Учень заповнює історію сам на час (3 хв), потім читає вголос з виразом. Наприкінці гра «Правда чи вигадка»: учень розповідає 3 речення про свою найкращу вечірку з was / were, ти вгадуєш, що вигадане.'),

      h('Homework · 5 хв'),
      ex(
        ['gap', 'Зроби речення про минуле.', `I am at home today. → I [was] at home yesterday.
The shop is closed now. → The shop [was] closed yesterday.
They are in the park today. → They [were] in the park last Sunday.
Are you happy? → [Were] you happy yesterday?
We aren’t late today. → We [weren’t/were not] late yesterday.`],
        ['open', 'Напиши 6-8 речень на тему «When I was little».', 'When I was six, I was... My favourite... was... My parents were... I wasn’t...'],
      ),
      note('Домашнє: вправа + текст «When I was little» з was, were, wasn’t, weren’t. Можна додати старе фото з дитинства і підписати його. На наступному уроці учень коротко розповідає свій текст, а ти ставиш 2 питання з Was / Were...?'),
    ],
  },
];
