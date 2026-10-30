// Бібліотека, пакет 6: граматика для підлітків (A1-A2), 60-хвилинні уроки.
// Порядок тем як у Murphy «Essential Grammar in Use», але всі тексти, приклади і вправи власні.
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, video, vocab, ex, talk, meme, game } = makeHelpers('b6');

export const BATCH_6: Plan[] = [
  // ---------- PRESENT SIMPLE NEGATIVE ----------
  {
    id: 'lib-gr-present-simple-negative', title: 'I don’t, she doesn’t: the art of saying no', level: 'A1', age: 'teens', topic: 'Граматика: Present Simple (заперечення)', color: 'lime', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking'],
    aims: 'Будуємо заперечення в Present Simple: I don’t play, she doesn’t play\nРозрізняємо don’t і doesn’t і не додаємо -s після doesn’t\nРозповідаємо, що ми і наші друзі не робимо\nПишемо короткий текст «Things I never do»',
    duration: 60,
    blocks: [
      h('Warm-up · 4 хв'),
      talk(`What do you do every morning before school?
Do you like Mondays? Why?
Name one thing you never eat.
Name one app you never use.
What do you never do on Sunday?
Which sport do you never watch on TV?
What does your cat or dog never do? (Or a pet you know.)
What do you never say to your teacher?`),
      note('Розговори учня 3-4 хв, обери 4-5 питань. Не виправляй граматику, просто послухай, чи вживає він уже don’t / doesn’t. Якщо учень каже «I not like», запам’ятай і повернись до цього на етапі «Розбір помилок». Наприкінці запитай: «Як сказати англійською “я не люблю понеділки”?»'),

      h('Lead-in · 7 хв'),
      t(`**Meet Biscuit, the laziest cat in Kyiv**

Biscuit is the cat of my friend Dana. He is orange, fat and very proud.

Biscuit doesn’t get up early. He sleeps until twelve. He doesn’t play with toys, because toys are “for kittens”. He doesn’t like the vacuum cleaner and he doesn’t drink water from a bowl. He only drinks from the kitchen tap!

Dana and her brother Max don’t understand Biscuit. “We don’t have a lazy day at all,” says Max. “We go to school, we do homework, we go to football. And Biscuit? He doesn’t do anything!”

But Biscuit doesn’t care. He has a very important job: he sits on Dana’s laptop when she does her homework.`),
      vocab(`lazy = ледачий
proud = гордий
get up = вставати
toy = іграшка
kitten = кошеня
vacuum cleaner = пилосос
bowl = миска
tap = кран
understand = розуміти
care = перейматися, зважати
laptop = ноутбук
homework = домашнє завдання
spinach = шпинат
allow = дозволяти`),
      ex(['truefalse', 'Прочитай текст і обери True або False.', `Biscuit gets up early. = False
Biscuit plays with toys every day. = False
Biscuit doesn’t like the vacuum cleaner. = True
Biscuit drinks water from a bowl. = False
Dana and Max don’t have a lazy day. = True
Biscuit sits on Dana’s laptop. = True`]),
      note('Учень читає текст вголос (або ти читаєш, а він слідкує). Слова зі списку пройди швидко: учень знаходить їх у тексті. Після True / False попроси знайти всі заперечення і підкреслити їх. Запитай: чому про Biscuit «doesn’t», а про Dana and Max «don’t»? Нехай учень сам спробує сформулювати правило.'),

      h('Rule · 5 хв'),
      tip(`**Заперечення в Present Simple = don’t / doesn’t + дієслово без змін.**

**I / you / we / they** + **don’t** (= do not) + дієслово
**he / she / it** + **doesn’t** (= does not) + дієслово

I **don’t** like spinach. = Я не люблю шпинат.
We **don’t** have lessons on Sunday. = У нас немає уроків у неділю.
She **doesn’t** play chess. = Вона не грає в шахи.
My cat **doesn’t** eat vegetables. = Мій кіт не їсть овочі.

**Лайфхак «Злодій -s».** She play**s**, але в запереченні **doesn’t** «краде» цю -s собі: She doe**s**n’t play. Тому після doesn’t дієслово завжди голе.`),
      note('Намалюй дві колонки: don’t (I, you, we, they) і doesn’t (he, she, it). Покажи «злодія -s»: напиши She plays, потім доклей doesn’t і перенеси -s стрілкою. На все правило 5 хв, далі одразу гра.'),
      meme('st-cat-coffee', 'Me on Monday: I don’t talk before coffee.', 'My cat: I don’t talk at all. I just judge.', 'Я в понеділок: я не розмовляю до кави. Мій кіт: я взагалі не розмовляю. Я просто осуджую.'),

      h('Game: Don’t or doesn’t? · 4 хв'),
      game('Don’t or doesn’t?', 'Choose don’t or doesn’t', `My brother ___ like peas. = doesn’t
I ___ eat fish. = don’t
Our teacher ___ give tests on Friday. = doesn’t
We ___ have PE today. = don’t
The cat ___ drink milk. = doesn’t
They ___ live in Lviv. = don’t
My phone ___ work. = doesn’t
You ___ need a pen. = don’t
Sofia ___ play the piano. = doesn’t
My parents ___ watch TikTok. = don’t`),
      note('Учень сам обирає формат гри (квіз, пари, картки). Хай пояснює кожну відповідь одним словом: «brother = he, тому doesn’t».'),

      h('Practice · 12 хв'),
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
      meme('st-cat-loaf', 'He doesn’t run. He doesn’t jump.', 'He doesn’t need to. He is a loaf.', 'Він не бігає. Він не стрибає. Йому не треба. Він батон.'),
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
      note('Gap і choice учень робить сам (5-6 хв), потім перевірка разом: проси пояснити кожну відповідь словами «бо she, тому doesn’t». Sort робимо усно і швидко. У перекладі звертай увагу, щоб після doesn’t не було -s. Повна форма do not теж правильна.'),

      h('Video: Mr Bean’s morning · 8 хв'),
      video('https://www.youtube.com/watch?v=QQZjYb5d4NM', 'Watch Mr Bean’s morning routine. Then write 5 sentences: what doesn’t Mr Bean do like a normal person? Example: He doesn’t ... like us.', 'Mr Bean (офіційний канал): ранкова рутина, уривок з фільму'),
      note('Перед переглядом спитай: What do you do every morning? (wake up, wash, brush teeth, have breakfast, get dressed). Дивіться шматками: зупиняй після кожної ранкової дії (орієнтовно кожні 30-40 секунд, точні моменти зупинок переглянь перед уроком) і питай: Does a normal person do it like this? What doesn’t Mr Bean do? Учень відповідає He doesn’t ... за тим, що бачить. Після перегляду учень читає свої 5 речень, ти додаєш одне своє, і порівнюєте: «I don’t do it like Mr Bean, I ...».'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «I not like pizza.» (неправильно) → **I don’t like pizza.** Просто not перед дієсловом не працює, потрібен помічник don’t.
2. «She don’t like pizza.» (неправильно) → **She doesn’t like pizza.** Для he / she / it тільки doesn’t.
3. «He doesn’t likes pizza.» (неправильно) → **He doesn’t like pizza.** Doesn’t уже «вкрав» -s.
4. «My friends doesn’t play chess.» (неправильно) → **My friends don’t play chess.** Friends = they, отже don’t.
5. «I am not like pizza.» (неправильно) → **I don’t like pizza.** Am not тільки з прикметниками і -ing (I am not hungry), а не зі звичайними дієсловами.`),
      ex(['choice', 'Знайди правильне речення.', `{My dog doesn’t like cats.|My dog don’t like cats.|My dog doesn’t likes cats.}
{We don’t go to school in July.|We doesn’t go to school in July.|We not go to school in July.}
{Lily doesn’t speak French.|Lily doesn’t speaks French.|Lily not speak French.}
{I don’t understand this joke.|I am not understand this joke.|I not understand this joke.}
{The bus doesn’t stop here.|The bus don’t stop here.|The bus doesn’t stops here.}
{My parents don’t watch cartoons.|My parents doesn’t watch cartoons.|My parents don’t watches cartoons.}`]),
      note('Розбери помилки з tip, потім учень робить вправу на час (60 секунд). За кожну правильну відповідь бал, за пояснення помилки ще бал. Поверни помилки, які ти записав на розминці, і попроси учня виправити їх.'),

      h('Speaking · 8 хв'),
      talk(`Tell me three things you don’t do at the weekend.
What food doesn’t your best friend like?
What doesn’t your teacher allow in class?
Which apps don’t you use? Why?
What doesn’t your pet (or a pet you know) like?
What don’t your parents understand about teenagers?
What doesn’t your cat know about you? (Be honest!)
Which chores don’t you do at home, even when your mum asks?
What doesn’t your phone do, but you want it to do?
What don’t you want for your birthday?`),
      note('Учень відповідає повними реченнями з don’t / doesn’t, обери 6-7 питань. Після кожної відповіді постав уточнювальне питання (Why not?). Друге коло: «Two truths and a lie» у запереченнях: учень каже 3 речення про себе з don’t, ти вгадуєш, яке неправда. Потім міняєтеся. Записуй помилки і розбери 2-3 наприкінці.'),

      h('Speed round · 3 хв'),
      game('Speed round: make it negative', 'Make the sentence negative. Write only the verb part', `She plays tennis. = doesn’t play
I like rap. = don’t like
He watches anime. = doesn’t watch
We have maths today. = don’t have
The cat sleeps on my bed. = doesn’t sleep
They live here. = don’t live
My mum drinks coffee. = doesn’t drink
You know the answer. = don’t know
It rains a lot. = doesn’t rain
Dan goes to the gym. = doesn’t go`),
      note('Гра на швидкість: учень відповідає без пауз. Якщо помиляється в -s після doesn’t, нагадай про «злодія -s».'),
      meme('st-boy-backpack', 'Teacher: Why don’t you have your homework?', 'Me: My cat doesn’t like my handwriting.', 'Вчитель: Чому в тебе немає домашки? Я: Моєму котові не подобається мій почерк.'),

      h('Homework · 3 хв'),
      ex(
        ['gap', 'Зроби речення запереченнями.', `Lily plays tennis. → Lily [doesn’t play/does not play] tennis.
I like pizza with pineapple. → I [don’t like/do not like] pizza with pineapple.
Our teacher gives a lot of homework. → Our teacher [doesn’t give/does not give] a lot of homework.
My cousins live in Lviv. → My cousins [don’t live/do not live] in Lviv.
The cat sleeps on my bed. → The cat [doesn’t sleep/does not sleep] on my bed.`],
        ['open', 'Напиши 6 речень «Things I never do» (3 про себе, 3 про когось із родини або друзів).', 'Things I don’t do... Things my friend or my mum doesn’t do...'],
      ),
      video('https://www.youtube.com/watch?v=_palZkuM1BQ', 'Watch Mr Bean at the swimming pool. Write 4 sentences: what doesn’t Mr Bean do like the other people at the pool?', 'Classic Mr Bean (офіційний канал): Swim School'),
      note('Домашнє завдання: вправа на перетворення, 6 речень про себе й інших і 4 речення про Mr Bean у басейні. Перевір, щоб хоча б у трьох реченнях було doesn’t. На наступному уроці почни з того, що учень читає 2 найсмішніші речення.'),
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
      video('https://www.youtube.com/watch?v=frN3nvhIHUk', 'Watch the first minute. Count the questions with “Do you like...?”. Then answer: Do you like broccoli ice cream?', 'Super Simple Songs (офіційний канал): Do You Like Broccoli Ice Cream?'),
      note('Подай це іронічно: «Це пісня для малюків, але вона ідеально пояснює сьогоднішню тему. Витримаєш хвилину?» Учень рахує питання Do you like...? і відповідає Yes, I do / No, I don’t. Потім переходь до розмови нижче. Підлітки зазвичай сміються, і це чудово знімає напругу.'),
      talk(`What questions do new people usually ask you?
What is a good first question for a new classmate?
Do you like answering questions? Why or why not?
Do you like broccoli? And broccoli ice cream?
What is the strangest food you like?
What question do you hate at family dinners?
Do you ask a lot of questions in class?
What question do you want to ask your cat?`),
      note('Обери 4-5 питань. Попроси учня поставити тобі 3 будь-які питання англійською. Не виправляй, просто запиши їх. Найчастіше учні роблять «You like music?» без do. На етапі «Розбір помилок» повернись до цих питань.'),

      h('Lead-in · 7 хв'),
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
      vocab(`new = новий, нова
canteen = їдальня
volleyball = волейбол
near = біля, поруч
building = будівля
first floor = перший поверх
visit = відвідувати
feed = годувати
start = починатися
half past eight = пів на дев’яту
late = запізнілий
question = питання
answer = відповідь, відповідати
how often = як часто`),
      ex(['truefalse', 'Послухай діалог і обери True або False.', `Sofia is from Odesa. = True
Sofia doesn’t like the school. = False
Sofia plays basketball. = False
Sofia’s brother goes to the same school. = False
Mark’s cat visits a lady every day. = True
The first lesson starts at half past eight. = True`]),
      note('Перше слухання: хто ці люди і де вони? Друге слухання: True / False. Потім попроси учня записати всі питання з do / does, які він чує (Do you like...? Do you play...? Does your brother...? Where do you live? Does she feed him? What time does...?). Звідси переходимо до правила.'),

      h('Rule · 5 хв'),
      tip(`**Питання в Present Simple: (QW) + Do / Does + хто + дієслово?**

**Do** + I / you / we / they + дієслово?
**Does** + he / she / it + дієслово?

**Do** you **like** pizza? = Ти любиш піцу?
**Does** your cat **sleep** a lot? = Твій кіт багато спить?
**Where** do you live? = Де ти живеш?
**How often** does she go to the gym? = Як часто вона ходить у спортзал?

**Короткі відповіді:** Yes, I **do**. / No, I **don’t**. Yes, she **does**. / No, she **doesn’t**.

**Формула-потяг:** QW (where, what...) → do / does → хто → дієслово → решта. Does знову «краде» -s: не «Does she plays?», а **Does she play?**`),
      note('Покажи формулу-потяг на папері: вагончики QW / do-does / subject / verb. Учень складає 2-3 питання усно, ставлячи слова по порядку. На правило 5 хв, далі гра.'),
      meme('st-cat-shock', 'Teacher: Do you have any questions?', 'Me, with 47 questions: No.', 'Вчитель: У вас є питання? Я, з 47 питаннями: Ні.'),

      h('Game: Do or does? · 4 хв'),
      game('Do or does?', 'Choose Do or Does to start the question', `___ you speak English? = Do
___ your dad cook dinner? = Does
___ they go to the same school? = Do
___ the cat like milk? = Does
___ we have homework today? = Do
___ Olya play the drums? = Does
___ your friends play Minecraft? = Do
___ it rain a lot in London? = Does
___ your teacher give tests? = Does
___ I look tired? = Do`),
      note('Учень сам обирає формат гри. Після гри попроси його поставити тобі 2 питання з Does про когось із його родини.'),

      h('Practice · 11 хв'),
      ex(
        ['gap', 'Допиши питання.', `[Do] you like hip-hop? Yes, I do.
[Does] your sister wear glasses? No, she doesn’t.
Where [do] you buy your sneakers?
What time [does] the film start?
[Does] your cat [catch] (catch) mice? Yes, he does.
How often [do] they [play] (play) computer games?
What [does] Ivan [want] (want) for his birthday?`],
        ['match', 'Знайди відповідь на питання.', `Do you like cats? = Yes, I do. I have two.
Does your brother play football? = No, he doesn’t. He plays tennis.
Where do you live? = In a flat near the river.
What time does school start? = At eight thirty.
How often do you go swimming? = Twice a week.
Does Anna have a phone? = Yes, she does. It’s new.`],
      ),
      meme('st-cat-please', 'Does he want food?', 'Yes, he does. He always does.', 'Він хоче їсти? Так. Він завжди хоче.'),
      ex(['translate', 'Переклади англійською.', `Ти граєш у шахи? = Do you play chess?
Твоя мама працює в лікарні? = Does your mum work in a hospital? / Does your mom work in a hospital? / Does your mother work in a hospital?
Де живе твій друг? = Where does your friend live?
Що ти їси на сніданок? = What do you eat for breakfast? / What do you have for breakfast?
Твій кіт любить рибу? = Does your cat like fish?
Коли вони роблять домашнє завдання? = When do they do their homework? / When do they do homework?`]),
      note('Gap і match учень робить сам, потім перевірка. У match звертай увагу, як відповідь «відзеркалює» питання: Do you...? Yes, I do. У перекладі нагадай: українською питання можна зробити лише інтонацією, англійською обов’язково потрібно do / does.'),

      h('Video: BBC asking questions · 7 хв'),
      video('https://www.youtube.com/watch?v=j9b1CNN_rFU', 'Watch and write down 3 questions from the video. Which ones start with Do or Does? Then ask me one of them.', 'BBC Learning English (офіційний канал): Asking Questions'),
      note('Дивіться без субтитрів, на другому перегляді з англійськими субтитрами. Зупиняй після кожного прикладу питання (орієнтовно кожні 30-40 секунд, моменти переглянь перед уроком) і проси учня повторити питання вголос з правильною інтонацією. Питання до учня: What is the question word here? Is it do or does? Why? Наприкінці учень ставить тобі одне питання з відео, а ти відповідаєш коротко: Yes, I do / No, I don’t.'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «You like music?» (неправильно) → **Do you like music?** В українській питання робимо інтонацією, в англійській потрібен do / does.
2. «Does he likes music?» (неправильно) → **Does he like music?** Does уже забрав -s.
3. «Where you live?» (неправильно) → **Where do you live?** Після слова-питання теж потрібен do / does.
4. «Do she play tennis?» (неправильно) → **Does she play tennis?** Для he / she / it тільки does.
5. Do you like cats? «Yes, I like.» (неправильно) → **Yes, I do.** Коротка відповідь повторює помічника.`),
      ex(['choice', 'Знайди правильне речення.', `{Do you like pizza?|You like pizza?|Does you like pizza?}
{Does she play tennis?|Does she plays tennis?|Do she play tennis?}
{Where do you live?|Where you live?|Where does you live?}
{What time does the lesson start?|What time the lesson starts?|What time does the lesson starts?}
Do you like cats? {Yes, I do.|Yes, I like.|Yes, I am.}
{Does your cat sleep a lot?|Is your cat sleep a lot?|Do your cat sleeps a lot?}`]),
      note('Розберіть tip, потім вправа на час. Поверни 3 питання учня з розминки і попроси виправити їх самостійно.'),

      h('Speaking · 8 хв'),
      talk(`Ask me 5 questions about my day. Start with: Do you...? / What time do you...?
Do you have a favourite YouTuber? What does he or she do?
How often do you play video games?
Does your best friend like the same music as you?
What do your parents do at the weekend?
Where do you usually spend your summer?
Does anyone in your family have a pet? What does it eat?
Does your cat (or any cat you know) think it is the boss?
What do you do when your phone dies?
Does your mum know all your passwords?`),
      note('Обери 6-7 питань. Спершу учень ставить тобі 5 питань (перше завдання), ти відповідаєш коротко і ставиш зустрічне. Вимагай короткі відповіді (Yes, I do / No, she doesn’t) + одне речення деталі. Рольова гра наприкінці: учень журналіст шкільної газети, бере інтерв’ю у «зірки» (тебе).'),

      h('Speed round · 3 хв'),
      game('Speed round: animal quiz', 'Answer the question with a short answer', `Does a penguin fly? = No, it doesn’t
Do cats sleep a lot? = Yes, they do
Does a giraffe have a long neck? = Yes, it does
Do fish drink milk? = No, they don’t
Does a snake have legs? = No, it doesn’t
Do dogs like walks? = Yes, they do
Does a cow give milk? = Yes, it does
Do elephants fly? = No, they don’t
Where do pandas live? = In China
What does a koala eat? = Leaves`),
      note('Грайте як телешоу: ти ведучий, учень гравець, 5 секунд на відповідь. Після гри учень складає 2 свої питання-загадки про тварин з Does a... ? і ставить тобі.'),
      meme('st-girl-bow', 'Mum: Do you know where my charger is?', 'Me, with her charger in my room: Does it look like I know?', 'Мама: Ти знаєш, де моя зарядка? Я, з її зарядкою в кімнаті: Хіба схоже, що я знаю?'),

      h('Homework · 4 хв'),
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
      h('Warm-up · 4 хв'),
      talk(`What are you doing right now?
What do you usually do at this time on Saturday?
What is your best friend doing now, do you think?
What does your cat or dog usually do in the afternoon?
What is your family doing at the moment?
What do you usually eat for breakfast?
What song are you listening to a lot this week?
What is your phone doing right now? Is it charging?`),
      note('Обери 4-5 питань. Можеш показати фото з телефону (людина в кафе, кіт на дивані) і запитати What is he doing? What does he usually do? Слухай, чи змішує учень часи. Не пояснюй правило, лише створи потребу: «Цікаво, чому одне речення з -ing, а інше ні?»'),

      h('Lead-in · 7 хв'),
      t(`**Stories from a cat’s phone**

Hi, I’m Pixel, a grey cat. Every morning I wake up at six. I usually sit on my owner’s face until she gets up. She feeds me, and then she goes to school. In the afternoon I sleep on the windowsill. I don’t go outside, because I’m an indoor cat.

But today is different. Today is Saturday! At the moment my owner, Kira, isn’t sleeping. She is sitting at her desk and she is drawing a comic about me. Her little brother is playing a video game and he is shouting at the screen. And me? I’m lying on Kira’s drawing. She isn’t smiling. I think she wants a new model.`),
      vocab(`wake up = прокидатися
usually = зазвичай
owner = власник, власниця
feed = годувати
windowsill = підвіконня
indoor cat = домашній кіт (не виходить надвір)
different = інший, не такий
at the moment = зараз, у цей момент
desk = письмовий стіл
draw = малювати
comic = комікс
shout = кричати
screen = екран
lie = лежати`),
      ex(['truefalse', 'Прочитай і обери True або False.', `Pixel usually wakes up at six. = True
Pixel goes outside every afternoon. = False
Kira is sleeping at the moment. = False
Kira is drawing a comic about Pixel. = True
Kira’s brother is doing his homework now. = False
Pixel is lying on Kira’s drawing. = True`]),
      note('Після True / False дай учневі два кольори: одним підкреслити дії «щодня, зазвичай» (wakes up, sit, feeds, goes, sleep), іншим дії «зараз» (is sitting, is drawing, is playing, am lying). Запитай, які слова допомогли розрізнити (every morning, usually, today, at the moment).'),

      h('Rule · 5 хв'),
      tip(`**Present Simple = фото профілю.** Звичка, розклад, факт: так буває завжди або регулярно.
She **watches** anime every evening. = Вона дивиться аніме щовечора.
Слова-підказки: **every day, usually, often, sometimes, never, always, on Mondays**.

**Present Continuous = сторіз у прямому ефірі.** Am / is / are + дієслово-ing: відбувається просто зараз.
She **is watching** anime now. = Вона дивиться аніме зараз.
Слова-підказки: **now, right now, at the moment, today, Look!, Listen!**

**Дієслова-«ліниві»:** like, love, hate, want, need, know, understand майже ніколи не беруть -ing.
I **want** a pizza now. I **know** the answer.

**Питання:** Do you **play**...? (Simple) / **Are** you **playing**...? (Continuous)`),
      note('Намалюй дві колонки «Фото профілю» і «Прямий ефір» і розклади в них слова-підказки. Попроси учня придумати по реченню про себе в кожну колонку. На правило 5 хв.'),
      meme('st-cat-nightcap', 'I usually go to bed at 10 pm.', 'Right now I am watching one more episode.', 'Зазвичай я лягаю спати о 22:00. Просто зараз я дивлюся ще одну серію.'),

      h('Game: Photo or live? · 4 хв'),
      game('Photo or live?', 'Is it Present Simple or Present Continuous? Write Simple or Continuous', `I play tennis every Tuesday. = Simple
Look! The cat is eating my toast! = Continuous
She usually walks to school. = Simple
We are having lunch now. = Continuous
My dad never cooks. = Simple
Listen! Someone is singing. = Continuous
Water boils at 100 degrees. = Simple
I am texting Oleh at the moment. = Continuous
They often go to the cinema. = Simple
It is raining today. = Continuous`),
      note('Учень сам обирає формат гри. Після кожної відповіді хай назве слово-підказку в реченні (every, Look!, usually...).'),

      h('Practice · 12 хв'),
      ex(
        ['choice', 'Обери правильний варіант.', `Look! The cat {is climbing|climbs} the curtains.
I {go|am going} to the gym three times a week.
Shh! My dad {is talking|talks} on the phone.
My sister usually {wears|is wearing} black clothes.
We {are having|have} lunch at the moment. Can I call you later?
Water {boils|is boiling} at 100 degrees.
I {want|am wanting} a new phone.
Lily {doesn’t eat|isn’t eating} meat. She is a vegetarian.`],
        ['gap', 'Розкрий дужки: Present Simple чи Present Continuous?', `Every day Nazar [walks] (walk) his dog after school.
Right now Nazar [is walking/’s walking] (walk) his dog in the park.
My mum [works] (work) in a bank.
Listen! Someone [is playing/’s playing] (play) the piano.
I [don’t understand/do not understand] (not understand) this question.
What [are you doing] (you / do) now? I’m texting Oleh.
How often [do you go] (you / go) to the cinema?
Today it [is raining/’s raining] (rain), so we [are staying/’re staying] (stay) at home.`],
      ),
      meme('st-cat-box', 'He usually sleeps in a very expensive cat bed.', 'Right now he is sleeping in the box from it.', 'Зазвичай він спить у дуже дорогому котячому ліжку. Просто зараз він спить у коробці з-під нього.'),
      ex(['translate', 'Переклади англійською.', `Я зазвичай слухаю музику в автобусі = I usually listen to music on the bus / I usually listen to music in the bus
Зараз я слухаю подкаст = I am listening to a podcast now / I’m listening to a podcast now / Now I am listening to a podcast / Now I’m listening to a podcast
Мій брат щодня грає в ігри = My brother plays games every day / My brother plays video games every day
Подивись! Кіт їсть мій бутерброд! = Look! The cat is eating my sandwich! / Look! The cat’s eating my sandwich!
Вона не дивиться телевізор зараз = She isn’t watching TV now / She is not watching TV now / She’s not watching TV now
Я знаю цю пісню = I know this song`]),
      note('Choice і gap учень робить сам (6-7 хв). На перевірці щоразу питай: «Фото чи прямий ефір?» Звертай увагу на речення з want і understand: тут без -ing. У перекладі прийми скорочені і повні форми.'),

      h('Video: BBC present tenses · 8 хв'),
      video('https://www.youtube.com/watch?v=xFsYrTIndhI', 'Watch and write down 2 examples of Present Simple and 2 examples of Present Continuous from the video. Why do they use each tense?', 'BBC Learning English (офіційний канал): Present Simple and Present Continuous'),
      note('Перший перегляд без зупинок: учень лише слухає, чи збігається пояснення з нашими «фото» і «прямим ефіром». Другий перегляд: зупиняй після кожного прикладу (орієнтовно кожні 30-40 секунд, моменти переглянь перед уроком) і питай: Photo or live? What word helps you? Учень записує 2 + 2 приклади і пояснює вибір часу українською або англійською.'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «I am go to school every day.» (неправильно) → **I go to school every day.** Звичка, тому без am і без -ing.
2. «She is play now.» (неправильно) → **She is playing now.** Continuous завжди з -ing.
3. «I playing now.» (неправильно) → **I am playing now.** Без am / is / are прямий ефір не працює.
4. «I am knowing the answer.» (неправильно) → **I know the answer.** Know, like, want, need «ліниві», без -ing.
5. «She watch TV every evening.» (неправильно) → **She watches TV every evening.** He / she / it у Simple отримує -s.`),
      ex(['choice', 'Знайди правильне речення.', `{I know the answer!|I am knowing the answer!|I knowing the answer!}
{She is doing her homework now.|She does her homework now.|She doing her homework now.}
{We often go to the river in summer.|We are often going to the river in summer.|We often going to the river in summer.}
{Look! It is snowing!|Look! It snows!|Look! It snowing!}
{He doesn’t like sushi.|He isn’t liking sushi.|He not like sushi.}
{My cat sleeps sixteen hours a day.|My cat is sleeping sixteen hours a day.|My cat sleep sixteen hours a day.}`]),
      note('Розберіть tip, потім вправа на бали: 1 бал за правильне речення, 1 бал за пояснення «чому інші неправильні». Наприкінці попроси учня придумати власне речення з помилкою для тебе.'),

      h('Speaking · 8 хв'),
      talk(`What do you usually do after school? What are you doing this week that is different?
What does your family usually do on Sunday?
Look out of the window. What are people doing?
What is your favourite series? What is happening in it now?
What do you usually wear to school? What are you wearing today?
Do you read books? Are you reading anything at the moment?
What does your cat usually do at night? What is it doing now, do you think?
What do you usually say when your mum calls you? What are you saying when she calls the third time?
What is your teacher probably doing right now?`),
      note('Обери 6-7 питань. Учень відповідає двома реченнями: одне в Simple, одне в Continuous. Гра «Шпигун»: учень дивиться у вікно або на фото вулиці і коментує як спортивний коментатор: A man is crossing the street. He usually... Помилки записуй і розбери після етапу.'),

      h('Speed round · 3 хв'),
      game('Speed round: which form?', 'Write the correct form of the verb', `Look! The baby ___ (smile). = is smiling
My dad ___ (work) in a bank. = works
I ___ (want) a cookie. = want
Listen! The dog ___ (bark). = is barking
We usually ___ (have) pizza on Friday. = have
She ___ (not like) rain. = doesn’t like
Right now I ___ (read) a comic. = am reading
Cats ___ (love) boxes. = love
Shh! Mum ___ (sleep). = is sleeping
He never ___ (drink) cola. = drinks`),
      note('На швидкість: 5 секунд на відповідь. Скорочені форми (’s, ’m) теж приймай.'),
      meme('st-boy-cap', 'Mum: What are you doing?', 'Me, playing games: I am studying. I always study.', 'Мама: Що ти робиш? Я, граючи в ігри: Я вчуся. Я завжди вчуся.'),

      h('Homework · 3 хв'),
      ex(
        ['gap', 'Розкрий дужки.', `My grandma [makes] (make) pancakes every Sunday.
Be quiet! The baby [is sleeping/’s sleeping] (sleep).
I [need] (need) help with this task.
They [are playing/’re playing] (play) basketball at the moment.
Ostap never [drinks] (drink) coffee.`],
        ['open', 'Напиши два міні-тексти по 4-5 речень.', `My usual Saturday (що ти зазвичай робиш у суботу)
Right now at my home (що відбувається вдома просто зараз, як у прямому ефірі)`],
      ),
      video('https://www.youtube.com/watch?v=X6LuWwb9whM', 'Watch at home and write 3 new things you learned about present tenses. Bring one question for the next lesson.', 'BBC Learning English (офіційний канал): How to use present tenses'),
      note('Домашнє: вправа, два міні-тексти і відео з 3 нотатками. Перевір, щоб у першому тексті були слова usually / often / every, а в другому now / at the moment. На наступному уроці учень читає «прямий ефір», а ти вгадуєш, о котрій годині він його писав.'),
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
      video('https://www.youtube.com/watch?v=WwKJI5cuIug', 'Watch the first minute. Who is in Peppa’s family? Say: Peppa has got a brother. His name is...', 'Peppa Pig (офіційний канал): Muddy Puddles'),
      note('Подай з гумором: «Перевіримо, чи ти розумієш серіал для дітей англійською без субтитрів». Після першої хвилини учень називає членів родини Пеппи: She has got a brother, George. She has got a mum and a dad. Далі переходь до розмови.'),
      talk(`What is in your school bag today?
Have you got a pet? What is its name?
What three things do you always have with you?
Have you got any brothers or sisters?
What has your room got: a desk, a TV, a cat?
Have you got a favourite mug or cup?
What have you got on your phone screen?
Has your cat or dog got a funny habit?`),
      note('Обери 4-5 питань. Гра «Що в рюкзаку?»: учень за 30 секунд називає речі зі свого рюкзака чи кімнати англійською. Не виправляй, лише зверни увагу, чи учень каже «I have got» чи «I have».'),

      h('Lead-in · 7 хв'),
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
      vocab(`vet = ветеринар
huge = величезний
a cold = застуда
poor thing = бідолаха
teeth = зуби
hamster = хом’ячок
toy = іграшка
favourite = улюблений
plastic = пластиковий
interest = інтерес
expensive = дорогий
typical = типовий
free time = вільний час
tail = хвіст`),
      ex(['truefalse', 'Послухай і обери True або False.', `Pumpkin has got a cold. = True
Lena has got one cat. = False
Lena has got a hamster. = True
Pumpkin’s favourite toy is a plastic fish. = True
Artem hasn’t got a sister. = False
Lena has got a brother. = True`]),
      note('Перше слухання: хто ці люди і де вони? Друге: True / False. Потім попроси учня записати з діалогу всі форми have / has got і does have. Зверни увагу на скорочення: He’s got = He has got (а не He is got!).'),

      h('Rule · 5 хв'),
      tip(`**Have got і have означають одне: «у мене є».**

**I / you / we / they** + **have got** (’ve got) = **have**
**he / she / it** + **has got** (’s got) = **has**

I**’ve got** a bike. = I **have** a bike. = У мене є велосипед.
She**’s got** blue eyes. = She **has** blue eyes. = У неї блакитні очі.

**Дві команди, не змішуй!**
**Команда «got»:** I **haven’t got** a phone. **Have** you **got** a phone? Yes, I **have**. / No, I **haven’t**.
**Команда «do»:** I **don’t have** a phone. **Does** she **have** a phone? Yes, she **does**. / No, she **doesn’t**.

**Пастка:** He**’s** got = He **has** got, а не He is got.`),
      note('Покажи дві «команди» у вигляді двох колонок. Попроси учня сказати одне й те саме речення двома способами (I’ve got a cat = I have a cat). Have got частіше в британській англійській, have всюди, обидва правильні.'),
      meme('st-cat-heart', 'I haven’t got time for homework.', 'But I have got time for 300 photos of my cat.', 'У мене немає часу на домашку. Але є час на 300 фото мого кота.'),

      h('Game: Has got or have got? · 4 хв'),
      game('Has got or have got?', 'Choose has got or have got', `My brother ___ a new laptop. = has got
I ___ two cousins. = have got
Our cat ___ green eyes. = has got
We ___ a big garden. = have got
Mia ___ long hair. = has got
They ___ a dog. = have got
The school ___ a pool. = has got
You ___ a nice smile. = have got
My hamster ___ small ears. = has got
My parents ___ a car. = have got`),
      note('Учень сам обирає формат гри. Після гри попроси перетворити 3 речення на «команду do»: My brother has a new laptop.'),

      h('Practice · 11 хв'),
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
      meme('st-cat-blep', 'Have you got a tongue?', 'Yes, I have. And it hasn’t got a home.', 'У тебе є язик? Так. І в нього немає дому.'),
      t(`**Meet Zog, the school monster**

Zog has got three eyes and two big noses. He hasn’t got any hair, but he has got a long green tail. He has got six legs, so he is very fast in PE. Zog doesn’t have a phone, but he has a pet: a small blue cat with wings. They have got the same favourite food: socks!`),
      ex(['choice', 'Прочитай про монстра Зога і обери правильну відповідь.', `Has Zog got hair? {No, he hasn’t.|Yes, he has.|No, he doesn’t.}
How many eyes has Zog got? {Three.|Two.|Six.}
Does Zog have a phone? {No, he doesn’t.|Yes, he does.|No, he hasn’t got.}
What has Zog’s pet got? {Wings.|Six legs.|Three noses.}
What food have Zog and his cat got in common? {Socks.|Fish.|Pizza.}`]),
      note('Choice і gap учень робить сам. На перевірці питай: «Яка це команда, got чи do?» Після тексту про Зога учень малює власного монстра (1 хв) і описує його 4-5 реченнями з has got / hasn’t got / doesn’t have, а ти малюєш за описом і порівнюєте.'),

      h('Video: What has Mr Bean got? · 7 хв'),
      video('https://www.youtube.com/watch?v=9LhLjpsstPY', 'Watch Mr Bean at the exam. What has he got on his desk? What hasn’t he got? Write 5 sentences with has got / hasn’t got.', 'Mr Bean (офіційний канал): The Exam'),
      note('Зупини відео, коли Mr Bean розкладає свої речі на парті (момент переглянь перед уроком), і попроси учня назвати все, що бачить: He has got a pen, he has got... Потім дивіться далі й зупиняйте орієнтовно кожні 40-60 секунд з питаннями: Has he got the answers? Has his neighbour got the answers? Is he happy? Відповіді учень дає за побаченим, головне, щоб формою has got / hasn’t got. Наприкінці: What have you got on your desk now?'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «Do you have got a pen?» (неправильно) → **Have you got a pen?** або **Do you have a pen?** Got і do не дружать.
2. «She have got a cat.» (неправильно) → **She has got a cat.** He / she / it тільки has.
3. «She doesn’t has a cat.» (неправильно) → **She doesn’t have a cat.** Після doesn’t тільки have.
4. «He is got a cat.» (неправильно) → **He has got a cat.** ’s у He’s got означає has.
5. Have you got a pet? «Yes, I have got.» (неправильно) → **Yes, I have.** У короткій відповіді got не потрібен.`),
      ex(['choice', 'Знайди правильне речення.', `{Have you got a ruler?|Do you have got a ruler?|Have you a got ruler?}
{My sister has got a cat.|My sister have got a cat.|My sister is got a cat.}
{Tom doesn’t have a bike.|Tom doesn’t has a bike.|Tom don’t have a bike.}
{We haven’t got a TV.|We don’t got a TV.|We not have a TV.}
Have you got a dog? {Yes, I have.|Yes, I have got.|Yes, I do.}
{Does your cat have toys?|Does your cat has toys?|Has your cat have toys?}`]),
      note('Розберіть tip, потім вправа на час. Попроси учня пояснити кожну помилку словами «це команда got / команда do».'),

      h('Speaking · 8 хв'),
      talk(`Have you got any brothers or sisters? What have they got that you haven’t got?
Describe your pet or your dream pet. What has it got?
Do you have a favourite thing in your room? What is it?
What has your best friend got that you would like to have?
Have you got any hobbies that need special things?
What apps have you got on your phone?
Has your cat got more toys than you?
What has your fridge got right now?
Have you got a secret talent?
What hasn’t your school got, but really needs?`),
      note('Обери 6-7 питань. Гра «Знайди відмінності»: ти описуєш свою уявну кімнату (I’ve got a red sofa, I haven’t got a TV), учень описує свою, знаходите 3 спільні речі і 3 відмінності. Потім «20 питань» про таємного кота: Has it got long hair? Does it have green eyes? Записуй помилки, розбери наприкінці.'),

      h('Speed round · 3 хв'),
      game('Speed round: short answers', 'Give a short answer', `Have you got a pet? (yes) = Yes, I have
Has she got a phone? (no) = No, she hasn’t
Do you have a brother? (yes) = Yes, I do
Does he have a bike? (no) = No, he doesn’t
Have they got a car? (yes) = Yes, they have
Do we have a test today? (no) = No, we don’t
Has your cat got toys? (yes) = Yes, it has
Does your school have a gym? (yes) = Yes, it does
Have you got a sister? (no) = No, I haven’t
Do they have a garden? (no) = No, they don’t`),
      note('Швидкий темп: 5 секунд на відповідь. Головне правило: відповідь з тієї ж «команди», що й питання.'),
      meme('st-boy-backpack', 'Teacher: Have you got a pen?', 'Me: I’ve got a pen, a pencil and no idea.', 'Вчитель: У тебе є ручка? Я: У мене є ручка, олівець і жодного уявлення.'),

      h('Homework · 4 хв'),
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
      h('Warm-up · 4 хв'),
      talk(`How are you today? And how were you yesterday?
Where are you now? Where were you at 8 o’clock this morning?
What is your favourite day of the week? Why?
What was the weather like yesterday?
Who was your first teacher?
What was your favourite cartoon when you were six?
Where were you last Sunday?
Was your cat (or any pet you know) naughty yesterday?`),
      note('Обери 4-5 питань. Почни з теперішнього: Where are you now? Потім одразу питай про вчора: Where were you yesterday at 5? Зверни увагу, чи учень сам переходить на was / were, чи каже «I am in school yesterday». Не виправляй, лише «збери» помилки для етапу «Розбір помилок».'),

      h('Lead-in · 7 хв'),
      t(`**Where was the cat?**

Yesterday was a strange day in our flat. My cat Tofu wasn’t in his bed in the morning. He wasn’t in the kitchen and he wasn’t under the sofa. My parents were at work, and my little sister and I were very worried.

“Was he on the balcony?” asked my sister. No, he wasn’t. “Were the windows open?” No, they weren’t.

Then, at seven o’clock, my mum was home from work. She was very surprised. “Why are you so sad?” she asked. “Tofu isn’t here!” we said. Mum laughed. “He was in my shopping bag! He was with me in the supermarket all day!”

Tofu was very happy. We were not.`),
      vocab(`yesterday = вчора
strange = дивний
flat = квартира
kitchen = кухня
under = під
worried = стурбований
balcony = балкон
open = відчинений
surprised = здивований
sad = сумний
laugh = сміятися
shopping bag = сумка для покупок
all day = цілий день
last week = минулого тижня`),
      ex(['truefalse', 'Прочитай і обери True або False.', `Tofu was in his bed in the morning. = False
The parents were at work. = True
The children were worried. = True
The windows were open. = False
Tofu was in the mum’s shopping bag. = True
The children were happy at the end. = False`]),
      note('Учень читає текст. Після True / False попроси знайти і підкреслити всі was і were (і wasn’t / weren’t). Запитай: коли тут was, а коли were? Хай учень спробує сам вивести, що was для однини, were для множини і для you.'),

      h('Rule · 5 хв'),
      tip(`**Was / were = минулий час від am / is / are (to be).**

am, is → **was** / are → **were**
**I / he / she / it** + **was**
**you / we / they** + **were**

I **was** at school yesterday. = Я був у школі вчора.
You **were** late! = Ти запізнився!
The tests **were** easy. = Тести були легкі.

**Заперечення:** **wasn’t**, **weren’t**. They **weren’t** at home.
**Питання:** was / were на перше місце, без did! **Were** you at the party? Yes, I **was**. / No, I **wasn’t**.

**Слова-підказки:** yesterday, last week, two days ago, in 2019, when I was five.
**Лайфхак:** «**you** завжди **were**», навіть якщо ти одна людина.`),
      note('Таблиця «am, is → was / are → were» на папері. Попроси учня перетворити 3 речення про сьогодні на речення про вчора. Поясни: was / were тільки минуле від to be, для інших дієслів буде Past Simple.'),
      meme('st-cat-shock', 'Mum: Where were you all day?', 'Cat: I was here. You weren’t looking.', 'Мама: Де ти був цілий день? Кіт: Я був тут. Ти просто не дивилася.'),

      h('Game: Was or were? · 4 хв'),
      game('Was or were?', 'Choose was or were', `I ___ at home yesterday. = was
You ___ late! = were
The pizza ___ cold. = was
My parents ___ in Lviv. = were
It ___ sunny on Monday. = was
We ___ tired after PE. = were
The cats ___ on the roof. = were
My first phone ___ pink. = was
___ you at the party? = Were
___ the film good? = Was`),
      note('Учень сам обирає формат гри. Після кожної відповіді: «одна людина чи багато? А якщо you?»'),

      h('Practice · 12 хв'),
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
      meme('st-cat-cool', 'Me at five: I was a dinosaur expert.', 'Me now: I was in bed until twelve.', 'Я в п’ять років: я був експертом з динозаврів. Я зараз: я був у ліжку до дванадцятої.'),
      ex(['translate', 'Переклади англійською.', `Я був удома вчора = I was at home yesterday / Yesterday I was at home
Мої друзі були в парку = My friends were in the park / My friends were at the park
Фільм був нудний = The film was boring / The movie was boring
Ти був у школі в понеділок? = Were you at school on Monday? / Were you in school on Monday?
Ми не були втомлені = We weren’t tired / We were not tired
Де був твій кіт? = Where was your cat?`]),
      ex(['gap', 'Міні-історія: допиши словами was, were, wasn’t, weren’t.', `Last Friday [was] the day of our school disco.
My friends and I [were] very excited.
The music [was] great, but the room [was] very hot.
My best friend Oksana [wasn’t/was not] there, because she [was] ill.
The teachers [were] near the door, and they [weren’t/were not] happy with the loud music.
But the best moment [was] at the end: the school cat [was] on the stage, and everybody [was] dancing with him!`]),
      note('Gap і choice учень робить сам (5-6 хв). На перевірці питай: «одна людина чи багато? А якщо you?» У choice звертай увагу на did: з was / were did не потрібен. Міні-історію учень заповнює на час (2 хв) і читає вголос з виразом.'),

      h('Video: Mr Bean at the fete · 8 хв'),
      video('https://www.youtube.com/watch?v=PX1d-R59PaA', 'Watch for 2-3 minutes. Then close the video and answer from memory: Where was Mr Bean? What was the weather like? Were there many people? What was funny?', 'Mr Bean (офіційний канал): Village Fete'),
      note('Гра «Свідок»: учень дивиться 2-3 хвилини уважно, потім ти зупиняєш відео і закриваєш екран. Питання з пам’яті: Where was Mr Bean? Was it sunny or rainy? Were there many people? Was he happy? What was on the tables? Учень відповідає повними реченнями з was / were (відповіді за побаченим, головне форма). Потім перевіряєте, переглянувши той самий шматок ще раз. Момент зупинки обери заздалегідь.'),

      h('Розбір помилок · 6 хв'),
      tip(`**Топ-5 помилок українськомовних учнів**

1. «I were at home.» (неправильно) → **I was at home.** I завжди з was.
2. «You was late.» (неправильно) → **You were late.** You завжди з were, навіть якщо це одна людина.
3. «Did you were at school?» (неправильно) → **Were you at school?** З was / were did не потрібен.
4. «I was go to the park.» (неправильно) → **I was in the park.** Was не додаємо до звичайних дієслів.
5. «I am at school yesterday.» (неправильно) → **I was at school yesterday.** Yesterday = минуле, отже was.`),
      ex(['choice', 'Знайди правильне речення.', `{I was tired yesterday.|I were tired yesterday.|I am tired yesterday.}
{You were in my dream!|You was in my dream!|You did in my dream!}
{Were you at the party?|Did you were at the party?|Was you at the party?}
{The tests weren’t easy.|The tests wasn’t easy.|The tests didn’t easy.}
{My cat was on the roof.|My cat were on the roof.|My cat was be on the roof.}
{Where were you at six?|Where was you at six?|Where did you were at six?}`]),
      note('Розберіть tip, потім вправа на час. Поверни помилки, які ти зібрав на розминці, і попроси учня виправити їх.'),

      h('Speaking · 8 хв'),
      talk(`Where were you last Saturday at 3 o’clock?
What was your favourite toy when you were five?
Who was your first best friend?
Was your last holiday fun? Where were you?
Were your parents strict when you were little?
What was the best day of last month? Why?
Were you ever on TV or in a school show?
What was the worst haircut you had as a kid?
Where was your phone when you woke up today?
Was your cat ever stuck somewhere funny?`),
      note('Обери 6-7 питань. Учень відповідає повними реченнями з was / were, а ти ставиш уточнювальні питання: Was it fun? Who were you with? Гра «Алібі»: «Вчора о 18:00 з холодильника зник торт». Учень детектив і питає тебе Where were you at six? Were you alone? Was the kitchen door open? Потім міняєтеся.'),

      h('Speed round · 3 хв'),
      game('Speed round: yesterday', 'Change to the past. Write was, were, wasn’t or weren’t', `I am happy. → Yesterday I ___ happy. = was
They are at school. → Yesterday they ___ at school. = were
She isn’t hungry. → Yesterday she ___ hungry. = wasn’t
We aren’t late. → Yesterday we ___ late. = weren’t
It is hot. → Yesterday it ___ hot. = was
You are tired. → Yesterday you ___ tired. = were
The cat isn’t at home. → Yesterday the cat ___ at home. = wasn’t
My friends are here. → Yesterday my friends ___ here. = were
Are you OK? → ___ you OK yesterday? = Were
Is it fun? → ___ it fun yesterday? = Was`),
      note('На швидкість: 5 секунд на відповідь. Хто швидше: учень відповідає, ти засікаєш час.'),
      meme('st-cat-nightcap', 'Yesterday I was very productive.', 'I was in bed all day. It was a very productive bed.', 'Вчора я був дуже продуктивним. Я був у ліжку цілий день. Це було дуже продуктивне ліжко.'),

      h('Homework · 3 хв'),
      ex(
        ['gap', 'Зроби речення про минуле.', `I am at home today. → I [was] at home yesterday.
The shop is closed now. → The shop [was] closed yesterday.
They are in the park today. → They [were] in the park last Sunday.
Are you happy? → [Were] you happy yesterday?
We aren’t late today. → We [weren’t/were not] late yesterday.`],
        ['open', 'Напиши 6-8 речень на тему «When I was little».', 'When I was six, I was... My favourite... was... My parents were... I wasn’t...'],
      ),
      video('https://www.youtube.com/watch?v=HiRSdr88OUs', 'Watch only the first 2 minutes. Write 4 sentences: Where was Mr Bean? Who was with him? Was he scared? Were the other people happy?', 'Mr Bean (офіційний канал): Mr Bean Rides the Big One (лише уривок)'),
      note('Домашнє: вправа, текст «When I was little» з was, were, wasn’t, weren’t і 4 речення про уривок з Mr Bean (тільки перші 2 хвилини). Можна додати старе фото з дитинства і підписати його. На наступному уроці учень коротко розповідає свій текст, а ти ставиш 2 питання з Was / Were...?'),
    ],
  },
];
