// Бібліотека, пакет 7: граматика для підлітків A1-A2, порядок тем як у червоній книзі Murphy.
// Минулі часи і Present Perfect. Усі тексти, приклади і вправи власні (з книги беремо лише назви тем).
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, video, vocab, ex, talk, meme, game } = makeHelpers('b7');

export const BATCH_7: Plan[] = [
  // ---------- PAST SIMPLE ----------
  {
    id: 'lib-gr-past-simple', title: 'I worked, I went: my weekend story', level: 'A1', age: 'teens', topic: 'Граматика: Past Simple', color: 'lime', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking', 'Writing'],
    aims: 'Знаю, як утворити Past Simple правильних дієслів (-ed)\nПам’ятаю 15-20 неправильних дієслів (go, went; eat, ate)\nВикористовую слова yesterday, last week, ago\nМожу розповісти, як минули мої вихідні',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`How was your weekend?
Was it fun or boring?
Where were you on Saturday?
What is your favourite day of the week? Why?
What do you usually do on Sunday?
Who do you usually meet at the weekend?
Do you sleep a lot at the weekend?
Is your cat busy at the weekend? What does it do all day?`),
      note('Учень, найімовірніше, відповідатиме в теперішньому часі або змішує часи. Не виправляй, просто запиши 2-3 речення учня: наприкінці уроку він скаже їх правильно в Past Simple. Перші два питання повторюють was / were з минулого уроку.'),

      h('Lead-in · 6 хв'),
      t(`**My crazy Saturday** (a post by Oleh, 14)

On Saturday I **woke up** at 11. My cat Muffin **jumped** on my face, so I **got up**. I **had** pancakes for breakfast and **watched** a funny video about a dancing parrot.

At 1 pm I **went** to the park with my friend Ira. We **played** basketball and **ate** ice cream. Then it **started** to rain! We **ran** to Ira’s house and **stayed** there. Her mum **made** hot chocolate for us.

In the evening I **cleaned** my room (my mum **asked** me three times). Then I **called** my grandma and **told** her about my day. I **went** to bed at 10. Muffin **slept** on my homework. Again.`),
      vocab(`wake up (woke up) = прокидатися
get up (got up) = вставати
jump = стрибати
pancakes = млинці
parrot = папуга
start = починати
stay = залишатися
hot chocolate = гарячий шоколад
clean = прибирати
ask = просити, питати
call = дзвонити
tell (told) = розповідати
yesterday = вчора
ago = тому (про час)`),
      ex(['truefalse', 'Прочитай пост і обери True або False.', `Oleh woke up at 9. = False
Muffin jumped on Oleh’s face. = True
Oleh and Ira played football. = False
It started to rain. = True
Ira’s mum made pizza. = False
Muffin slept on Oleh’s homework. = True`]),
      note('Учень читає вголос. Після True / False попроси знайти всі дієслова в минулому часі і розділити на дві купки: ті, що закінчуються на -ed (jumped, watched), і ті, що змінились повністю (went, ate, ran). Так учень сам відкриє правильні і неправильні дієслова.'),

      h('Rule · 5 хв'),
      tip(`**Past Simple** це дія, яка сталася і закінчилась у минулому: вчора, минулого тижня, 2 роки тому.

**Правильні дієслова: + -ed** (однаково для всіх осіб!)
play → play**ed** · watch → watch**ed** · like → like**d** · study → stud**ied** · stop → sto**pped**

**Неправильні дієслова:** їх треба просто вивчити, як імена нових друзів.
go → **went** · eat → **ate** · have → **had** · see → **saw** · make → **made** · get → **got** · run → **ran** · sleep → **slept** · buy → **bought** · come → **came**

I **went** to the park yesterday. = Я ходив у парк вчора.
She **watched** a film last night. = Вона дивилась фільм учора ввечері.

**Слова-маркери:** yesterday, last week / month / year, two days **ago**, in 2020, on Saturday.

Лайфхак: у Past Simple немає -s для he / she / it. He **went**, she **played**. Нарешті щось простіше!`),
      note('Покажи вимову -ed: /t/ після глухих (watched, jumped), /d/ після дзвінких (played, cleaned), /ɪd/ після t і d (started, wanted). Не перевантажуй: 10 неправильних дієслів на уроці достатньо, решту дай як домашку-картки.'),
      meme('st-cat-loaf', 'Me on Saturday: I did nothing.', 'Me on Sunday: I continued.', 'Я в суботу: я нічого не робив. Я в неділю: я продовжив.'),

      h('Practice · 13 хв'),
      game('Irregular verbs: find the pair', 'Write the Past Simple form', `go = went
eat = ate
see = saw
have = had
make = made
get = got
run = ran
buy = bought
sleep = slept
come = came
tell = told
wake up = woke up`),
      ex(
        ['gap', 'Розкрий дужки: постав дієслово в Past Simple.', `Yesterday I [played] (play) games for three hours.
My sister [watched] (watch) a horror film and [screamed] (scream).
We [went] (go) to the cinema last Friday.
Muffin [ate] (eat) my sandwich!
I [studied] (study) for the test last night.
Dad [bought] (buy) a new phone two days ago.
The bus [stopped] (stop) and we [got] (get) off.
I [saw] (see) a very funny meme this morning.`],
        ['choice', 'Обери правильний варіант.', `Last summer we {went|go|goed} to the sea.
I {had|haved|have} pizza for dinner yesterday.
She {liked|likeed|likes} the concert last night.
They {came|comed|come} home late on Sunday.
My cat {slept|sleeped|sleeps} all day yesterday.
We {made|maked|make} a cake for Mum’s birthday last week.`],
      ),
      ex(
        ['sort', 'Розклади дієслова: правильні (-ed) чи неправильні.', `regular: played; watched; cleaned; jumped; studied; called
irregular: went; ate; saw; bought; ran; made`],
        ['translate', 'Переклади англійською.', `Я ходив у школу вчора. = I went to school yesterday / Yesterday I went to school
Ми грали у футбол у суботу. = We played football on Saturday / On Saturday we played football
Мій кіт з’їв мою піцу. = My cat ate my pizza
Вона купила нові кросівки. = She bought new trainers / She bought new sneakers
Я бачив його тиждень тому. = I saw him a week ago
Вони дивились фільм учора ввечері. = They watched a film last night / They watched a movie last night`],
      ),
      meme('st-cat-coffee', 'I woke up at 7.', 'I got up at 11.', 'Я прокинувся о 7. Встав об 11.'),
      note('Гра на розгін з неправильними дієсловами, учень обирає режим. У вправі gap звернути увагу на правопис: study → studied (y → i), stop → stopped (подвоєння). У Sort запитай, як учень відрізнив групи. У перекладі прийми різний порядок слів.'),

      h('Video: Watch and retell · 7 хв'),
      video('https://www.youtube.com/watch?v=568a0HDEn7w', 'Watch Mr Bean’s morning and retell it in the past: What did he do first? Then what did he do? Say 5 sentences. (He woke up… He got up… He brushed…)', 'Classic Mr Bean: Morning Bean (уривок)'),
      video('https://www.youtube.com/watch?v=PgsG98vByiw', 'Watch and write down 3 verbs in the past from the video. Are they regular or irregular?', 'BBC Learning English: The past simple tense (6 Minute Grammar)'),
      note('Перед уроком переглянь відео і обери 2-3 хвилини ранку Mr Bean. Дивіться без зупинок, потім учень переказує: He woke up. He got up. He went to the bathroom. He brushed his teeth. Допомагай дієсловами, якщо треба, але не підказуй форму: нехай згадає сам. Друге відео BBC можна дати як домашку, якщо мало часу: учень виписує 3 дієслова і визначає, правильні чи ні.'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

Yesterday I go to the park. → Yesterday I **went** to the park. (є yesterday, отже минулий час)
I goed to school. → I **went** to school. (go неправильне дієслово)
I was went home. → I **went** home. (was тут зайве, Past Simple це одне слово)
She studyed a lot. → She **studied** a lot. (y після приголосної → ied)
I went to home. → I went **home**. (home без to)`),
      ex(['choice', 'Muffin the cat wrote about his day, but his grammar is a mess. Знайди правильне речення.', `{I woke up at 5 am.|I wake up yesterday at 5 am.|I waked up at 5 am.}
{I ran to the kitchen.|I runned to the kitchen.|I was ran to the kitchen.}
{I ate my breakfast in one minute.|I eated my breakfast in one minute.|I eat my breakfast yesterday.}
{Then I slept for six hours.|Then I sleeped for six hours.|Then I was slept for six hours.}
{My human came home at 6.|My human comed home at 6.|My human come home at 6 yesterday.}
{We went to bed together.|We goed to bed together.|We went to the bed together.}`]),
      note('Читай речення від імені кота, буде веселіше. Після вправи попроси учня пояснити, що не так у неправильних варіантах. Додай сюди помилки, які учень зробив на розминці, і попроси виправити.'),

      h('Speaking · 8 хв'),
      talk(`What did you do last weekend? Say 3 things.
What did you eat for breakfast this morning?
Where did you go last summer?
What time did you go to bed yesterday?
What film or series did you watch last week?
Who did you see yesterday?
What did you buy last time you went shopping?
What was the funniest thing that happened to you last month?
What did your pet (or your dream pet) do yesterday? Be creative!
Tell me about a very bad day. What happened?`),
      note('Учень відповідає повним реченням з дієсловом у минулому часі. Гра «Two truths and a lie»: учень каже 3 речення про минулі вихідні, ти вгадуєш неправду. Потім ти. Виправляй тільки форми дієслів, повторюючи правильно: «Ah, you went to the park!»'),

      h('Speed round · 6 хв'),
      game('Speed round: add -ed', 'Write the Past Simple form (be careful with spelling!)', `play = played
study = studied
stop = stopped
like = liked
watch = watched
cry = cried
plan = planned
dance = danced
chat = chatted
try = tried`),
      note('Засікай 60 секунд, потім друга спроба. Звертай увагу на правопис: cry → cried, chat → chatted, dance → danced (тільки -d).'),

      h('Homework · 5 хв'),
      meme('st-cat-shock', 'Teacher: What did you do at the weekend?', 'Me: I studied. My cat: He slept.', 'Вчитель: що ти робив на вихідних? Я: вчився. Мій кіт: він спав.'),
      ex(['open', 'Напиши пост «My crazy Saturday» про свої вихідні (8 речень).', `Use at least 4 regular verbs (-ed).
Use at least 4 irregular verbs (went, ate, saw…).
Use 2 time words: yesterday, last…, …ago, in the morning, then.`]),
      note('Домашка: пост як у тексті Oleh. Бонус: зробити 10 карток з неправильними дієсловами (go / went) і вивчити. На наступному уроці учень читає пост, а ти ставиш до нього питання: це наступна тема (didn’t і Did you...?).'),
    ],
  },

  // ---------- PAST SIMPLE NEGATIVE AND QUESTIONS ----------
  {
    id: 'lib-gr-past-simple-questions', title: 'Did you really do your homework?', level: 'A1', age: 'teens', topic: 'Граматика: Past Simple (заперечення і питання)', color: 'sky', source: 'murly',
    focus: ['Grammar', 'Listening', 'Speaking'],
    aims: 'Вмію будувати заперечення: I didn’t go, she didn’t eat\nСтавлю питання Did you...? і відповідаю Yes, I did. / No, I didn’t.\nСтавлю питання What / Where / When did you...?\nМожу розпитати друга про його вихідні',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What did you do yesterday evening?
What did you have for dinner?
Did you watch anything good last night?
Did you sleep well?
What time did you get up today?
Did you walk or take the bus to school today?
Did you do anything funny this week?
Did your cat (or dog) do anything crazy this week?`),
      note('Почни з перевірки домашки: учень читає свій пост, ти ставиш до нього 2-3 питання з Did you...? Учень, можливо, ще не вміє відповідати коротко, це нормально. Зверни увагу, чи учень пише didn’t + went: ця помилка буде в розборі.'),

      h('Lead-in · 6 хв'),
      audio('Mum asks questions', `Mum: Hi, Nazar! How was school?
Nazar: Fine.
Mum: Did you have the maths test today?
Nazar: Yes, I did.
Mum: And? Did you get a good mark?
Nazar: I don’t know yet. The teacher didn’t check the tests.
Mum: OK. Did you eat your lunch?
Nazar: Er... No, I didn’t. I gave my sandwich to Dima. He forgot his lunch.
Mum: That’s nice. What did you eat then?
Nazar: Dima bought me a pizza after school!
Mum: Ha! And did you do your homework?
Nazar: Not yet. But I didn’t play games! Well... not a lot.
Mum: Nazar!
Nazar: Joking! I only played for ten minutes.`),
      vocab(`test = контрольна
mark = оцінка
check = перевіряти
lunch = обід
give (gave) = давати
forget (forgot) = забувати
buy (bought) = купувати
not yet = ще ні
joking = жартую
homework = домашнє завдання
break = перерва
lose (lost) = губити
find (found) = знаходити
late = пізно, із запізненням`),
      ex(['choice', 'Послухай (або прочитай) і обери правильну відповідь.', `Did Nazar have a maths test today? {Yes, he did.|No, he didn’t.}
Did the teacher check the tests? {No, she didn’t.|Yes, she did.}
Did Nazar eat his sandwich? {No, he didn’t.|Yes, he did.}
Who forgot his lunch? {Dima|Nazar|Mum}
What did Dima buy? {a pizza|a sandwich|a cake}
How long did Nazar play games? {ten minutes|two hours|one hour}`]),
      note('Якщо немає озвучки, прочитайте діалог за ролями. Після вправи попроси знайти всі питання з did і всі didn’t. Запитай: яка форма дієслова після did і didn’t? (базова: have, get, eat, play). Підведи до висновку: минулий час «сидить» у did, тому дієслово відпочиває.'),

      h('Rule · 5 хв'),
      tip(`У запереченнях і питаннях Past Simple головний працівник **did**. Він забирає собі весь минулий час, тож дієслово повертається в **базову форму**.

**Заперечення:** didn’t (did not) + дієслово
I **didn’t go** to school. (НЕ didn’t went) · She **didn’t eat** her lunch.

**Питання:** Did + хто? + дієслово?
**Did** you **see** the new episode? = Ти бачив нову серію?
**Did** your cat **eat** my sandwich?

**Короткі відповіді:** Yes, I **did**. / No, I **didn’t**. (Yes, she did. / No, they didn’t.)

**Питальне слово + did + хто? + дієслово**
**What did** you **do**? · **Where did** you **go**? · **When did** she **come**? · **Why did** you **laugh**?

Лайфхак: did як рюкзак. Він несе минулий час, тож дієслово йде налегке.`),
      note('Порівняй з do / does з Present Simple: та сама схема, тільки did для всіх осіб. Окремо наголоси: з was / were did не потрібен (Were you tired? НЕ Did you were tired?).'),
      meme('st-girl-bow', 'Teacher: Did you do your homework?', 'Me: Define “do”.', 'Вчитель: ти зробив домашку? Я: а що значить «зробити»?'),

      h('Practice · 13 хв'),
      game('Make it negative', 'Write the negative form with didn’t', `I went home. = didn’t go
She ate pizza. = didn’t eat
We saw a film. = didn’t see
He played football. = didn’t play
They came late. = didn’t come
I bought a phone. = didn’t buy
The cat slept. = didn’t sleep
We had lunch. = didn’t have
She watched TV. = didn’t watch
I got up early. = didn’t get up`),
      ex(
        ['gap', 'Розкрий дужки: заперечення або питання в Past Simple.', `I [didn’t go/did not go] (not go) to the party on Friday.
[Did] you [see] (see) the new episode?
My brother [didn’t do/did not do] (not do) his homework.
Where [did] you [go] (go) last summer?
We [didn’t have/did not have] (not have) time for breakfast.
What [did] your cat [eat] (eat) yesterday?
She [didn’t like/did not like] (not like) the film.
When [did] they [come] (come) home?`],
        ['choice', 'Обери правильну коротку відповідь.', `Did you sleep well? Yes, {I did|I slept|I do}.
Did she call you? No, {she didn’t|she not|she doesn’t}.
Did they win the match? Yes, {they did|they won|they do}.
Did your dad cook dinner? No, {he didn’t|he don’t|he wasn’t}.
Did we have homework? Yes, {we did|we had|we do}.
Did the cat break the cup? No, {it didn’t|it doesn’t|it wasn’t}.`],
      ),
      ex(
        ['match', 'Знайди відповідь на питання.', `Where did you go on Saturday? = To the skate park.
What did you eat for lunch? = A cheese sandwich.
When did you get home? = At 5 o’clock.
Who did you meet? = My friend Taras.
Why did you laugh? = Because the video was so funny.
Did you buy anything? = No, I didn’t.`],
        ['translate', 'Переклади англійською.', `Я не бачив тебе вчора. = I didn’t see you yesterday / I did not see you yesterday
Ти зробив домашку? = Did you do your homework? / Did you do the homework?
Куди ви ходили в неділю? = Where did you go on Sunday?
Вона не їла сніданок. = She didn’t eat breakfast / She didn’t have breakfast / She did not eat breakfast
Що ти купив? = What did you buy?
Вони виграли? = Did they win?`],
      ),
      meme('st-cat-blep', 'Mum: Did you eat my cake?', 'Me: No, I didn’t. (cream on my face)', 'Мама: ти з’їв мій торт? Я: ні. (крем на обличчі)'),
      note('Гра на розгін, потім вправи. Якщо учень пише didn’t went, зупинись і покажи «рюкзак did». У match звертай увагу на питальне слово: where = місце, when = час, who = людина, why = причина.'),

      h('Video: Watch and ask · 7 хв'),
      video('https://www.youtube.com/watch?v=RVonJchNPEA', 'Watch and answer with short answers: Did Mr Bean go to school? Did he sit quietly? Did he follow the rules? Then ask me 3 questions with Did he...?', 'Mr Bean Official: Back to School Mr. Bean (уривок)'),
      video('https://www.youtube.com/watch?v=_Ot_vJLJ86M', 'Watch and say 3 things Mr Bean didn’t do in the exam. (He didn’t write… He didn’t study…)', 'Mr Bean Official: The Exam Cheat'),
      note('Перед уроком переглянь відео і вибери 2-3 хвилини. Дивіться без пауз, потім учень відповідає коротко: Yes, he did. / No, he didn’t. Далі ролі міняються: учень ставить тобі 3 питання Did he...? про те, що бачив. Друге відео як запасне: учень каже 3 заперечення з didn’t. Хвали за правильний порядок слів і базову форму дієслова.'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

I didn’t went to school. → I didn’t **go** to school. (після didn’t базова форма)
Did you saw the film? → Did you **see** the film? (після did базова форма)
Where you went? → Where **did you go**? (у питанні потрібен did)
You did your homework? → **Did you do** your homework? (did на початок)
Did you were tired? → **Were you** tired? (з was / were did не потрібен)`),
      ex(['gap', 'Виправ помилку: напиши правильну форму дієслова.', `I didn’t [eat] (ate) my lunch.
Did you [find] (found) your keys?
She didn’t [come] (came) to the party.
Did your dad [buy] (bought) the tickets?
We didn’t [see] (saw) the end of the film.
What did you [do] (did) yesterday?`]),
      note('Учень пише правильну форму замість тієї, що в дужках. Попроси пояснити кожне виправлення словами «після did / didn’t базова форма». Якщо на розминці були інші помилки, додай їх.'),

      h('Speaking · 8 хв'),
      talk(`Did you watch any good videos yesterday? What were they about?
What did you do last Sunday?
Did you go anywhere interesting last summer?
What did you have for breakfast today? Did you like it?
When did you last go to the cinema? What did you see?
Did you forget anything this week?
What did you do in your last English lesson?
Did you ever lose something important? What did you lose?
Did your cat ever steal your food?
What did you NOT do yesterday? Say 3 things.`),
      note('Гра «Detective»: учень загадує, що робив учора ввечері, ти ставиш 10 питань Did you...? і вгадуєш. Потім міняйтеся: учень ставить питання тобі. Стеж за did на початку і базовою формою дієслова.'),

      h('Speed round · 6 хв'),
      game('Speed round: short answers', 'Give the short answer', `Did you sleep well? (yes) = Yes, I did
Did she call you? (no) = No, she didn’t
Did they win? (yes) = Yes, they did
Did he come? (no) = No, he didn’t
Did we have homework? (yes) = Yes, we did
Did the cat eat? (yes) = Yes, it did
Did you lose your phone? (no) = No, I didn’t
Did your mum cook? (yes) = Yes, she did
Did they see us? (no) = No, they didn’t
Did you like it? (yes) = Yes, I did`),
      note('Засікай 60 секунд, потім друга спроба. Зверни увагу: Yes, I did, а не Yes, I slept.'),

      h('Homework · 5 хв'),
      meme('st-cat-please', 'Me: I didn’t eat the cookies.', 'Also me: (has 5 cookies in my pocket)', 'Я: я не їв печиво. Також я: (5 печивок у кишені)'),
      ex(['open', 'Візьми інтерв’ю в когось із родини або друзів про їхні вихідні.', `Write 6 questions: 3 Did you...? questions and 3 questions with What / Where / When.
Write their answers.
Write 3 things they didn’t do.`]),
      note('Домашка: «Weekend interview». Учень пише 6 питань і відповіді, плюс 3 заперечення з didn’t. На наступному уроці перевір 2-3 питання усно. Далі за програмою: Past Continuous (I was doing).'),
    ],
  },

  // ---------- PAST CONTINUOUS ----------
  {
    id: 'lib-gr-past-continuous', title: 'What were you doing at 8 pm?', level: 'A2', age: 'teens', topic: 'Граматика: Past Continuous', color: 'mustard', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking'],
    aims: 'Знаю, як утворити Past Continuous: was / were + -ing\nРозумію, що він описує дію в процесі в певний момент у минулому\nВмію будувати заперечення і питання: Were you sleeping?\nМожу розповісти, що я робив учора о певній годині',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What are you doing right now?
What is your family doing right now, do you think?
What did you do yesterday evening?
What time did you have dinner yesterday?
Where were you at 7 am today?
Were you asleep or awake at midnight?
Are you a good detective?
What is your cat doing right now? Guess!`),
      note('Перші два питання повторюють Present Continuous (am / is / are + -ing). Нагадай: «Це те, що відбувається зараз. Сьогодні ми переносимо цей процес у минуле». Перевір домашку: учень читає 2-3 питання зі свого інтерв’ю.'),

      h('Lead-in · 6 хв'),
      t(`**The great cookie mystery**

Yesterday Mum baked 12 chocolate cookies. At 8 pm she looked at the plate. It was empty!

“OK, everyone. What **were** you **doing** at 8 pm?” she asked.

**Dad:** “I **was washing** the car. Look, my hands are wet!”

**Sasha (15):** “I **was doing** my homework. I **wasn’t eating** anything, I promise!”

**Grandma:** “I **was talking** to my friend on the phone. We **were laughing** a lot.”

**Little Bohdan (6):** “I **was sleeping**!” (But his mouth was full of chocolate.)

And Pixel the cat? Pixel **was sitting** on the sofa. He **was looking** very happy.

So who ate the cookies? Bohdan **wasn’t sleeping**, that’s for sure!`),
      vocab(`bake = пекти
cookie = печиво
plate = тарілка
empty = порожній
wash = мити
wet = мокрий
promise = обіцяти
laugh = сміятися
full of = повний чогось
mystery = таємниця
detective = детектив
at that moment = в той момент
asleep = сплячий
awake = який не спить`),
      ex(['truefalse', 'Прочитай історію і обери True або False.', `Mum baked 12 cookies. = True
At 8 pm Dad was washing the car. = True
Sasha was eating cookies. = False
Grandma was talking on the phone. = True
Pixel was sleeping in the kitchen. = False
Bohdan was really sleeping. = False`]),
      note('Розіграйте історію: учень читає репліки членів родини «акторськими» голосами. Потім питання: «Who ate the cookies? How do you know?» Попроси знайти всі was / were + -ing і запитай, чому про Grandma and her friend сказано were laughing.'),

      h('Rule · 5 хв'),
      tip(`**Past Continuous** це дія **в процесі** в певний момент у минулому. Уяви, що ти поставив фільм на паузу: «О 8 вечора я **саме робив** домашку».

**Форма:** was / were + дієслово**-ing**
I / he / she / it → **was** · I **was watching** TV at 9 pm. = О 9 вечора я дивився телевізор.
you / we / they → **were** · They **were playing** football. = Вони грали у футбол (у той момент).

**Заперечення:** I **wasn’t** sleeping. · We **weren’t** listening.
**Питання:** **Was** she **sleeping**? Yes, she **was**. / No, she **wasn’t**.
**What were** you **doing** at 10 pm? = Що ти робив о 10 вечора?

**Маркери:** at 8 pm yesterday, at this time yesterday, all evening, at that moment.

Лайфхак: Past Simple це фото (сталося і все), Past Continuous це відео на паузі (дія тривала).`),
      note('Порівняй з Present Continuous: am / is / are + -ing → was / were + -ing. Покажи на прикладі учня: «Yesterday at 9 pm you were… what?» Нагадай правопис -ing: make → making, swim → swimming.'),
      meme('st-cat-nightcap', 'Mum: What were you doing at 2 am?', 'Me: I was sleeping. My phone: No, you weren’t.', 'Мама: що ти робив о 2 ночі? Я: спав. Мій телефон: ні, не спав.'),

      h('Practice · 13 хв'),
      game('Was or were?', 'Choose was or were', `I ___ sleeping. = was
They ___ dancing. = were
My cat ___ hiding. = was
You ___ laughing. = were
We ___ waiting for the bus. = were
Mum ___ cooking. = was
The kids ___ shouting. = were
It ___ raining. = was
My friends ___ playing games. = were
He ___ singing in the shower. = was`),
      ex(
        ['gap', 'Розкрий дужки: постав дієслово в Past Continuous.', `At 9 pm yesterday I [was watching] (watch) a series.
My parents [were cooking] (cook) dinner at 7.
It [was raining] (rain) all morning.
We [were waiting] (wait) for the bus at 8:15.
My cat [was sleeping] (sleep) on my homework again.
Ira and Tanya [were chatting] (chat) in the corridor.
I [wasn’t listening/was not listening] (not listen) to the teacher, sorry!
The kids [weren’t doing/were not doing] (not do) their homework.`],
        ['choice', 'Обери правильний варіант.', `At midnight I {was sleeping|were sleeping|was sleep}.
What {were you doing|was you doing|did you doing} at 6 pm?
They {weren’t playing|wasn’t playing|didn’t playing} football at 5.
{Was|Were|Did} she studying when you called?
We {were swimming|was swimming|were swim} in the lake at this time yesterday.
My brother {was making|was maked|were making} a video all evening.`],
      ),
      ex(
        ['match', 'Що робили ці люди вчора о 8 вечора? З’єднай.', `The chef = was cooking pasta.
The DJ = was playing music.
The goalkeeper = was catching the ball.
The students = were writing a test.
The cat = was sleeping in a box.
The fans = were singing at the concert.`],
        ['translate', 'Переклади англійською.', `Я спав о 10 вечора. = I was sleeping at 10 pm / At 10 pm I was sleeping
Що ти робив учора о 5? = What were you doing at 5 yesterday? / What were you doing yesterday at 5?
Ми не дивились телевізор. = We weren’t watching TV / We were not watching TV
Вона читала книжку. = She was reading a book
Ішов дощ. = It was raining
Вони грали в ігри весь вечір. = They were playing games all evening`],
      ),
      meme('st-cat-cool', 'Teacher: Were you listening?', 'Me: Yes. My brain: I was dancing in a field.', 'Вчитель: ти слухав? Я: так. Мій мозок: я танцював у полі.'),
      note('Гра на розгін, потім вправи. Якщо учень пише was sleep, нагадай формулу: was / were + -ing. У match пояснюй нові слова за потреби (chef, goalkeeper). У перекладі «я спав» може бути і Past Simple, але тут ідеться про момент «о 10 вечора», тому Past Continuous.'),

      h('Video: Watch and describe · 7 хв'),
      video('https://www.youtube.com/watch?v=gZujYUcY5xc', 'Watch, then I pause. Say what Mr Bean and the other people were doing at that moment. (He was standing… The kids were swimming…)', 'Mr Bean Official: At the Swimming Pool'),
      note('Перед уроком переглянь відео і познач 4 моменти для паузи (орієнтовно кожні 40-60 секунд). Дивіться відрізок, ставиш на паузу, вимикаєш екран і питаєш: «What was Mr Bean doing? What were the other people doing?» Учень відповідає з пам’яті: He was walking. He was standing on the board. The kids were swimming / playing. Гра на пам’ять: хто більше дій згадав у Past Continuous.'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

I was sleep at 10. → I was **sleeping** at 10. (після was потрібне -ing)
They was playing. → They **were** playing. (they завжди з were)
What you were doing? → What **were you** doing? (were перед підметом)
Did you sleeping? → **Were** you sleeping? (у Past Continuous питання з was / were)
I was knowing the answer. → I **knew** the answer. (know, like, want не ставимо в -ing)`),
      ex(['choice', 'Detective time! Знайди правильне речення.', `{I was walking my dog.|I was walk my dog.|I were walking my dog.}
{We were having dinner.|We was having dinner.|We were have dinner.}
{Was Bohdan sleeping?|Did Bohdan sleeping?|Bohdan was sleeping?}
{What were you doing?|What you were doing?|What did you doing?}
{She wasn’t eating cookies.|She didn’t eating cookies.|She weren’t eating cookies.}
{I wanted a cookie.|I was wanting a cookie.|I were wanting a cookie.}`]),
      note('Ці речення можна використати для гри «Alibi»: учень детектив, ти підозрюваний. Він ставить питання Were you...? What were you doing at...?, ти відповідаєш. Останнє речення про want: поясни коротко, що дієслова почуттів і знань зазвичай не мають -ing.'),

      h('Speaking · 8 хв'),
      talk(`What were you doing at 7 am today?
What were you doing at 9 pm yesterday?
What was your family doing at dinner time yesterday?
What were you doing at this time last Sunday?
Were you sleeping at midnight on New Year’s Eve?
What was the weather like this morning? Was it raining?
What were you doing when your teacher came into the classroom today?
Imagine: what was your cat doing while you were at school?
What was your best friend doing yesterday evening? Guess!
Were you listening to music at any time yesterday? What were you listening to?`),
      note('Гра «Alibi»: «Yesterday someone ate all the cookies at 8 pm. What were you doing?» Учень вигадує алібі (3-4 речення), ти ставиш уточнювальні питання: Were you alone? What was your brother doing? Потім міняйтесь. Виправляй тільки was / were і -ing.'),

      h('Speed round · 6 хв'),
      game('Speed round: was doing', 'Write the Past Continuous form', `I / sleep = I was sleeping
they / dance = they were dancing
she / cook = she was cooking
we / swim = we were swimming
he / run = he was running
you / laugh = you were laughing
it / rain = it was raining
the cat / hide = the cat was hiding
my friends / chat = my friends were chatting
I / not listen = I wasn’t listening`),
      note('Засікай 60 секунд, потім друга спроба. Стеж за правописом: swim → swimming, run → running, hide → hiding.'),

      h('Homework · 5 хв'),
      meme('st-cat-box', 'Human: What were you doing all day?', 'Cat: I was being a box.', 'Людина: що ти робив цілий день? Кіт: я був коробкою.'),
      ex(['open', 'Напиши «A day in pictures»: що ти робив учора в цей час (6 речень).', `At 7 am I was...
At 10 am I was...
At 1 pm ...
At 4 pm ...
At 7 pm ...
At 10 pm ...`]),
      note('Домашка: 6 речень у Past Continuous про вчорашній день, бонус: що в ці моменти робив хтось із родини або улюбленець. На наступному уроці вчимося поєднувати Past Continuous і Past Simple через when і while.'),
    ],
  },

  // ---------- PAST CONTINUOUS VS PAST SIMPLE ----------
  {
    id: 'lib-gr-past-continuous-vs-simple', title: 'While I was sleeping, my cat...', level: 'A2', age: 'teens', topic: 'Граматика: Past Continuous і Past Simple (when / while)', color: 'tomato', source: 'murly',
    focus: ['Grammar', 'Reading', 'Speaking', 'Writing'],
    aims: 'Розрізняю довгу дію (was doing) і коротку дію (did)\nВмію поєднати їх через when і while\nРозумію, коли обидві дії в Past Simple (одна після одної)\nМожу розповісти коротку історію з несподіваним поворотом',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`What were you doing at 9 pm yesterday?
What did you do after school yesterday?
Did anything surprising happen to you this week?
Did your phone ever fall somewhere funny?
Did you ever laugh at the wrong moment?
Did you ever fall asleep in a strange place?
What is the funniest story about your pet or a friend’s pet?
Do you like stories with a surprise ending?`),
      note('Повторюємо Past Simple і Past Continuous окремо. Перевір домашку: учень читає 2-3 речення «At 7 am I was...». Запитай: «And what happened at 7:05?» Так ти підводиш до теми уроку.'),

      h('Lead-in · 6 хв'),
      t(`**The worst video call ever** (a story by Kira, 13)

Last Tuesday I **was having** an online English lesson. My teacher **was explaining** something important, and I **was listening** very carefully. (Really!)

**While** I **was writing** in my notebook, my cat Mango **jumped** on the table. She **walked** across my keyboard and my camera **turned off**.

**When** I **turned** it on again, my teacher **was laughing**. Why? Mango **was sitting** in front of the camera. All my classmates **were saying** “Hi, Mango!”

Then my little brother **ran** into the room. He **was wearing** a dinosaur costume! **When** my teacher **saw** him, she **said**: “OK, everyone, five minutes break!”

That was the best English lesson ever.`),
      vocab(`video call = відеодзвінок
explain = пояснювати
carefully = уважно
notebook = зошит
keyboard = клавіатура
turn off = вимикати
turn on = вмикати
classmate = однокласник
costume = костюм
dinosaur = динозавр
break = перерва
suddenly = раптом
while = поки, в той час як
when = коли`),
      ex(['truefalse', 'Прочитай історію і обери True або False.', `Kira was having a maths lesson. = False
Mango jumped on the table while Kira was writing. = True
Kira turned off the camera. = False
When Kira turned on the camera, the teacher was laughing. = True
Kira’s brother was wearing a cat costume. = False
The teacher gave a break. = True`]),
      note('Після True / False намалюй на дошці лінію часу: довга хвиля (was writing) і коротка блискавка (jumped). Попроси учня знайти в тексті 3 пари «хвиля + блискавка».'),

      h('Rule · 5 хв'),
      tip(`Дві дії в минулому. Одна **довга** (вже тривала), друга **коротка** (раптом сталася і перервала її).

**Довга дія → Past Continuous** (was / were + -ing)
**Коротка дія → Past Simple**

I **was sleeping** when my phone **rang**. = Я спав, коли задзвонив телефон.
**While** we **were playing** football, it **started** to rain. = Поки ми грали у футбол, почався дощ.

**when** + коротка дія (Past Simple): when the teacher **came** in
**while** + довга дія (Past Continuous): while I **was eating**

**Увага!** Якщо дії йдуть одна за одною, обидві в Past Simple:
**When** Mum **came** home, we **had** dinner. (спочатку прийшла, потім повечеряли)

Кома потрібна, якщо when / while стоїть на початку: **When** I came in, my cat was eating my pizza.

Лайфхак: довга дія це серіал, коротка дія це реклама, яка його раптом перервала.`),
      note('Малюй лінію часу для кожного прикладу: хвиля і блискавка. Порівняй два речення: «When I came home, my mum was cooking» (вона вже готувала) і «When I came home, my mum cooked dinner» (почала готувати після того, як я прийшов).'),
      meme('st-cat-shock', 'While I was doing my homework...', '...my cat was planning a crime.', 'Поки я робив домашку... мій кіт планував злочин.'),

      h('Practice · 13 хв'),
      game('When or while?', 'Choose when or while', `___ I was sleeping, the phone rang. = While
I was cooking ___ the cat jumped on the table. = when
___ we were walking home, it started to rain. = While
She was singing ___ the lights went off. = when
___ my mum came in, I was playing games. = When
I saw a dog ___ I was running in the park. = while
___ the teacher was talking, Max fell asleep. = While
We were having lunch ___ my friend called. = when
___ I opened the door, my cat ran out. = When
I lost my keys ___ I was shopping. = while`),
      ex(
        ['gap', 'Розкрий дужки: Past Continuous чи Past Simple?', `I [was watching] (watch) TV when the lights [went] (go) off.
While we [were walking] (walk) home, we [saw] (see) a fox.
My phone [rang] (ring) while I [was taking] (take) a shower.
When Mum [came] (come) in, I [was dancing] (dance) in my room.
Max [fell] (fall) asleep while the teacher [was explaining] (explain) the rule.
It [was snowing] (snow) when we [got] (get) up.`],
        ['choice', 'Обери правильний варіант.', `I {was reading|read|were reading} when my friend called.
While I was cooking, I {cut|was cutting|cutting} my finger.
When the bell rang, the students {were writing|wrote|was writing} a test.
She {was running|ran|runs} in the park when she lost her earphones.
When I got home, I {had|was having|have} a shower and went to bed.
What {were you doing|did you do|was you doing} when I called you?`],
      ),
      ex(
        ['sort', 'Розклади: довга дія (Past Continuous) чи коротка дія (Past Simple)?', `long action: was sleeping; were walking; was raining; were playing; was cooking; was reading
short action: rang; fell; broke; opened; called; saw`],
        ['translate', 'Переклади англійською.', `Я спав, коли ти подзвонив. = I was sleeping when you called / When you called, I was sleeping
Поки ми грали, почався дощ. = While we were playing, it started to rain / While we were playing, it began to rain
Вона впала, коли бігла. = She fell while she was running / She fell when she was running
Коли я прийшов додому, мій кіт спав. = When I came home, my cat was sleeping / When I got home, my cat was sleeping
Що ви робили, коли зникло світло? = What were you doing when the lights went off? / What were you doing when the lights went out?
Я побачив друга, коли йшов до школи. = I saw my friend when I was going to school / I saw my friend while I was walking to school / I saw my friend while I was going to school`],
      ),
      meme('st-boy-cap', 'I was having a great dream...', '...when my alarm ruined everything.', 'Мені снився чудовий сон... коли будильник усе зіпсував.'),
      note('Гра на розгін, потім вправи. У грі тренуємо схему while + was doing, when + did (when з довгою дією теж можливе, але сьогодні тримаємось схеми). Підказка для учня: спитай себе «що тривало?» (Past Continuous) і «що раптом сталося?» (Past Simple). У choice з had a shower: дії одна за одною, тому Past Simple. Переклад приймай з різним порядком частин речення.'),

      h('Video: Watch and tell the story · 7 хв'),
      video('https://www.youtube.com/watch?v=aFgLrWiNHFc', 'Watch and make 4 sentences with when or while. (While Mr Bean was cooking the turkey, he… When his friend came, Mr Bean was…)', 'Mr Bean Official: Christmas Turkey'),
      video('https://www.youtube.com/watch?v=6aK2CKrdjbE', 'Watch and say: What was Mr Bean doing when something went wrong?', 'Mr Bean Official: Chemistry Experiment'),
      note('Перед уроком переглянь відео і обери 3 моменти, де щось несподівано стається. Ставиш на паузу одразу після «несподіванки» і питаєш: «What was he doing? What happened?» Учень відповідає одним реченням: While he was…, he… / He was… when… Друге відео запасне, якщо лишається час або для домашки.'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

When I was sleeping, the phone was ringing. → While I **was sleeping**, the phone **rang**. (коротка дія в Past Simple)
I watched TV when the lights went off. → I **was watching** TV when the lights went off. (дивився вже деякий час: довга дія)
While I came home, ... → **When** I came home, ... (while з довгою дією, when з короткою)
When I was falling, I broke my arm. → When I **fell**, I broke my arm. (падіння це коротка дія)
When she came, we were having dinner and then we were going out. → ...and then we **went** out. (дії одна за одною в Past Simple)`),
      ex(['choice', 'Kira’s brother tells the story. Знайди правильне речення.', `{I was playing when Mango ran in.|I played when Mango was running in.|I was play when Mango ran in.}
{While Kira was studying, I put on my costume.|While Kira studied, I was put on my costume.|When Kira was studying, I was putting on my costume suddenly.}
{When I opened the door, everyone was looking at the camera.|When I was opening the door, everyone looked at the camera suddenly.|While I opened the door, everyone was looking.}
{The teacher was smiling when she saw me.|The teacher smiled when she was seeing me.|The teacher was smile when she saw me.}
{While we were laughing, Mango fell off the table.|While we laughed, Mango was falling off the table.|When we were laughing, Mango was fall off the table.}
{When the lesson finished, I went to eat a snack.|When the lesson was finishing, I was going to eat a snack.|While the lesson finished, I went to eat a snack.}`]),
      note('Для кожного речення попроси учня показати руками: довга дія (широко розвести руки), коротка (плеснути). Це допомагає «відчути» різницю.'),

      h('Speaking · 8 хв'),
      talk(`What were you doing when your alarm rang this morning?
What were you doing when your mum or dad came home yesterday?
Did anything funny happen while you were having lunch this week?
Did you ever see something strange while you were walking down the street?
What were you doing when you first heard your favourite song?
Did you ever fall asleep while you were watching a film?
Did your phone ever ring while you were in class? What happened?
What was your pet doing when you came home yesterday?
Did you ever laugh while your teacher was talking? Why?
Tell me about a time when something went wrong. What were you doing?`),
      note('Гра «Story chain»: ти починаєш історію реченням з while (While I was walking in the park, I saw a giant cat.), учень продовжує реченням з when, потім знову ти. 6-8 речень, чим смішніше, тим краще. Наприкінці учень переказує всю історію.'),

      h('Speed round · 6 хв'),
      game('Speed round: was doing or did?', 'Write the correct form of the verb in brackets', `I ___ (sleep) when you called. = was sleeping
When the bell ___ (ring), we ran out. = rang
While she ___ (cook), the cat stole the fish. = was cooking
He ___ (fall) while he was skating. = fell
They ___ (play) games when Mum came. = were playing
When I ___ (open) the box, I screamed. = opened
We ___ (walk) home when it started to snow. = were walking
My phone ___ (die) while I was chatting. = died
It ___ (rain) when we left school. = was raining
I ___ (see) a fox while I was cycling. = saw`),
      note('Засікай 90 секунд: тут речення довші. Якщо учень сумнівається, підказуй питанням: «Довга дія чи коротка?»'),

      h('Homework · 5 хв'),
      meme('st-cat-heart', 'While I was writing this story...', '...my cat sat on my keyboard. Twice.', 'Поки я писав цю історію... мій кіт сів на клавіатуру. Двічі.'),
      ex(['open', 'Напиши історію «The worst / best day ever» (8-10 речень).', `Use while + Past Continuous at least 2 times.
Use when + Past Simple at least 2 times.
Add a surprise ending!`]),
      note('Домашка: історія як у Kira. Можна вигадану. Бонус: намалювати комікс з 3-4 кадрів з підписами. На наступному уроці учень розповідає історію усно. Далі за програмою: Present Perfect (I have done).'),
    ],
  },

  // ---------- PRESENT PERFECT ----------
  {
    id: 'lib-gr-present-perfect', title: 'I’ve lost my phone! I have done', level: 'A2', age: 'teens', topic: 'Граматика: Present Perfect', color: 'pink', source: 'murly',
    focus: ['Grammar', 'Listening', 'Speaking'],
    aims: 'Знаю, як утворити Present Perfect: have / has + третя форма дієслова\nРозумію, що він показує результат зараз (I’ve lost my phone = зараз у мене його немає)\nВмію будувати заперечення і питання: I haven’t finished. Have you seen...?\nЗнаю 15 третіх форм неправильних дієслів',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`Look around your room. Is it tidy or messy?
What is in your bag right now?
Is your phone charged right now?
Did you lose anything last week?
What did you do this morning before the lesson?
Are you hungry? When did you last eat?
How do you feel right now: tired, happy, sleepy?
What is your cat doing now? Is it happy or angry?`),
      note('Перевір домашку: учень розповідає свою історію з when / while. Питання розминки готують тему «результат зараз»: кімната брудна, бо…, телефон розряджений, бо… Запиши 1-2 відповіді: після правила учень скаже їх у Present Perfect.'),

      h('Lead-in · 6 хв'),
      audio('Morning panic', `Lisa: Mum! I can’t find my phone! I’ve lost it!
Mum: Have you looked in your bag?
Lisa: Yes, I have. It isn’t there.
Mum: Have you checked under the bed?
Lisa: Yes! And I’ve looked in the kitchen too.
Mum: Hmm. Has Leo taken it again?
Leo: No, I haven’t! I’ve been in my room all morning. I’ve finished my homework, look!
Mum: Wow. OK. And has anyone seen the cat?
Lisa: Why the cat?
Mum: Because your phone is ringing... in the cat’s bed!
Lisa: Biscuit! She’s stolen my phone!
Leo: Ha! She’s taken it because it’s warm.
Lisa: OK, I’ve found it. But now I’m late!`),
      vocab(`lose (lost) = губити
find (found) = знаходити
look for = шукати
check = перевіряти
take (taken) = брати
steal (stolen) = красти
finish = закінчувати
ring = дзвонити (про телефон)
warm = теплий
already = вже
just = щойно
break (broken) = ламати
charge = заряджати
messy = безладний`),
      ex(['choice', 'Послухай (або прочитай) і обери правильну відповідь.', `What has Lisa lost? {her phone|her bag|her homework}
Has Lisa looked in her bag? {Yes, she has.|No, she hasn’t.}
Has Leo taken the phone? {No, he hasn’t.|Yes, he has.}
What has Leo finished? {his homework|his breakfast|his game}
Where is the phone? {in the cat’s bed|under the bed|in the kitchen}
Who has stolen the phone? {Biscuit the cat|Leo|Mum}`]),
      note('Якщо немає озвучки, прочитайте за ролями (учень Lisa, ти Mum і Leo). Після вправи запитай: «Lisa lost the phone. Does she have it NOW?» (No.) «I’ve lost my phone» = загубила, і зараз телефону немає. Попроси знайти в діалозі всі have / has + дієслово.'),

      h('Rule · 5 хв'),
      tip(`**Present Perfect** це дія в минулому, але **важливий результат зараз**. Нас не цікавить, коли саме це сталося.

**I’ve lost** my phone. = Я загубив телефон (і зараз його в мене немає).
**She’s finished** her homework. = Вона закінчила домашку (і тепер вільна).

**Форма:** have / has + **третя форма** дієслова (V3)
I / you / we / they → **have** (I’ve, we’ve) · he / she / it → **has** (he’s, she’s)

Правильні дієслова: V3 = -ed: finish → finish**ed**, clean → clean**ed**
Неправильні треба вивчити: go → **gone** · eat → **eaten** · see → **seen** · do → **done** · take → **taken** · break → **broken** · lose → **lost** · find → **found** · make → **made** · write → **written**

**Заперечення:** I **haven’t** finished. · He **hasn’t** eaten.
**Питання:** **Have** you **seen** my keys? Yes, I **have**. / No, I **haven’t**.

Лайфхак: Present Perfect це фото «до і після»: дія в минулому, а дивимось на результат зараз.`),
      note('Поясни різницю між he’s = he is і he’s = he has (He’s tired / He’s lost his key). Не заглиблюйся в порівняння з Past Simple: на цьому уроці головне форма і значення «результат зараз». Слова ever, never, already, yet буде окремо.'),
      meme('st-cat-blep', 'Human: Who has eaten my sandwich?', 'Me: I have not. (I have.)', 'Людина: хто з’їв мій бутерброд? Я: не я. (Я.)'),

      h('Practice · 13 хв'),
      game('Third form memory', 'Write the third form (V3)', `go = gone
eat = eaten
see = seen
do = done
take = taken
break = broken
lose = lost
find = found
write = written
make = made
buy = bought
forget = forgotten`),
      ex(
        ['gap', 'Розкрий дужки: постав дієслово в Present Perfect.', `Oh no! I [have lost/’ve lost] (lose) my keys.
My brother [has broken/’s broken] (break) my headphones.
We [have finished/’ve finished] (finish) the project. Let’s celebrate!
Mum [has made/’s made] (make) pancakes. Come to the kitchen!
The cat [has eaten/’s eaten] (eat) my breakfast.
I [haven’t done/have not done] (not do) my homework. Can I do it tomorrow?
[Have] you [seen] (see) my phone?
She [hasn’t found/has not found] (not find) her charger.`],
        ['choice', 'Обери правильний варіант.', `My friend {has bought|have bought|has buy} a new bike.
I {have forgotten|has forgotten|have forget} my password!
{Has|Have|Is} the teacher checked our tests?
They {haven’t cleaned|hasn’t cleaned|haven’t clean} their room.
Look! It {has started|have started|has start} to snow.
We {have written|have wrote|has written} a song for Mum.`],
      ),
      ex(
        ['match', 'Що сталося? З’єднай результат зараз і причину.', `My room is so clean! = I’ve cleaned it.
I can’t open the door. = I’ve lost my keys.
My phone doesn’t work. = My brother has broken it.
I’m not hungry. = I’ve just eaten.
The cat looks very happy. = It has found the fish.
Max is free now. = He has finished his homework.`],
        ['translate', 'Переклади англійською.', `Я загубив свій телефон. = I’ve lost my phone / I have lost my phone
Вона зробила домашку. = She’s done her homework / She has done her homework
Ти бачив мого кота? = Have you seen my cat?
Ми не закінчили. = We haven’t finished / We have not finished
Мій брат зламав мій ноутбук. = My brother has broken my laptop / My brother’s broken my laptop
Він знайшов ключі. = He has found his keys / He’s found his keys / He has found the keys`],
      ),
      meme('st-boy-backpack', 'Mum: Have you packed your bag?', 'Me: I have packed snacks. Does it count?', 'Мама: ти зібрав рюкзак? Я: я зібрав снеки. Це рахується?'),
      note('Гра на розгін з третіми формами. У gap прийми і повну, і коротку форму. У match обговори з учнем: ліва частина це результат зараз, права пояснює, що сталося. Якщо учень плутає have / has, нехай спочатку знайде підмет.'),

      h('Video: What has he done? · 7 хв'),
      video('https://www.youtube.com/watch?v=Cl2udPfNReg', 'Watch Mr Bean get ready in the morning. I pause. Say what he has done and what he hasn’t done yet. (He has brushed his teeth. He hasn’t put on his shoes.)', 'Classic Mr Bean: Morning Routine'),
      note('Перед уроком переглянь відео і обери 3-4 паузи. На кожній паузі питай: «What has he done? What hasn’t he done?» Учень дивиться на результат (одягнений чи ні, почистив зуби чи ні) і каже 2 речення з has / hasn’t. Головне: результат, який ми бачимо зараз на екрані. Допомагай з третіми формами (put → put, brush → brushed, wash → washed).'),

      h('Розбір помилок · 5 хв'),
      tip(`**Типові помилки:**

I have lose my keys. → I have **lost** my keys. (після have / has третя форма)
She have finished. → She **has** finished. (she, he, it з has)
I have saw this film. → I have **seen** this film. (saw це Past Simple, потрібна V3)
You have seen my cat? → **Have you** seen my cat? (have перед підметом)
I haven’t did it. → I haven’t **done** it. (did це Past Simple, V3 = done)`),
      ex(['gap', 'Виправ помилку: напиши правильну форму.', `I have [lost] (lose) my homework.
My friend [has] (have) found a kitten.
We have [eaten] (ate) all the cookies.
He hasn’t [done] (did) the washing up.
They have [gone] (went) to the cinema.
Have you [written] (wrote) the essay?`]),
      note('Учень пише правильну форму замість тієї, що в дужках. Поясни, що в дужках або базова форма, або Past Simple (друга форма), а потрібна третя. Добре повторити таблицю: go, went, gone; eat, ate, eaten; do, did, done.'),

      h('Speaking · 8 хв'),
      talk(`What have you done today? Say 3 things.
Have you finished your homework for tomorrow?
Have you lost anything important this month?
What have you eaten today?
Has your best friend changed his or her hair recently?
Have you bought anything new this week? What?
Has your cat or dog broken anything recently?
What new things have you learned in English this month?
Look around: what has changed in your room since last year?
Your teacher has lost the class tests! Who has taken them? Make a story!`),
      note('Гра «What has changed?»: учень дивиться на тебе або на твій стіл 20 секунд і закриває очі. Ти щось змінюєш (зняв окуляри, переставив чашку). Учень каже: «You have taken off your glasses. You have moved the cup.» Потім міняйтесь. Відповіді на питання 1-8: повне речення з have / has.'),

      h('Speed round · 6 хв'),
      game('Speed round: have or has + V3', 'Make a Present Perfect sentence with the short form', `I / finish = I’ve finished
she / lose = she’s lost
we / eat = we’ve eaten
he / break = he’s broken
they / go = they’ve gone
you / see = you’ve seen
the cat / steal = the cat has stolen
I / not do = I haven’t done
she / not find = she hasn’t found
we / make = we’ve made`),
      note('Засікай 60 секунд, потім друга спроба. Прийми і повні форми (I have finished). Зверни увагу на the cat has stolen: зі складним підметом коротку форму не обов’язково вживати.'),

      h('Homework · 5 хв'),
      meme('st-cat-coffee', 'I have finished my homework.', 'My homework: No, you haven’t.', 'Я закінчив домашку. Моя домашка: ні, не закінчив.'),
      ex(['open', 'Напиши 8 речень у Present Perfect.', `Write 4 things you have done this week.
Write 2 things you haven’t done yet.
Write 2 questions for a friend with Have you...?`]),
      note('Домашка: «My week» у Present Perfect. Бонус: картки з неправильними дієсловами у 3 формах (go, went, gone), 15 штук. На наступному уроці перевір третю форму і have / has. Далі за програмою: just, already, yet і Have you ever...?'),
    ],
  },
];
