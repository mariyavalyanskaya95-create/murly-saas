// Пакет 3: розширені 60-хвилинні уроки для підлітків (НМТ, Reading, Use of English, Writing, B2 discussion).
// Тексти, діалоги і вправи власні.
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, vocab, ex, talk } = makeHelpers('b3');
// Додаткова практика і Homework plus: окремий префікс, щоб не зсувати id старих блоків
const X = makeHelpers('b3x');

export const BATCH_3: Plan[] = [
  // ---------- 1. The phone-free school ----------
  {
    id: 'lib-phone-free-school', title: 'The phone-free school', level: 'B1', age: 'teens', topic: 'Школа · Reading', color: 'mustard', source: 'murly',
    focus: ['Reading', 'Listening', 'Grammar', 'Speaking', 'Writing'],
    aims: 'Потренуємо читання у форматі НМТ з вибором відповіді A-D\nВивчимо лексику про шкільні правила і телефони\nПовторимо модальні дієслова для правил: have to, mustn’t, be allowed to\nНапишемо лист директору на 50+ слів',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      note('Швидке обговорення в парах або з учнем 1:1. Не виправляйте помилки на цьому етапі, лише запишіть 2-3 типові на дошку, щоб повернутися до них у мовному блоці. Шкалу думок збережіть: наприкінці уроку спитайте, чи змінилася думка.'),
      talk(`How many hours a day do you use your phone?
What do you use your phone for at school?
Could you live without your phone for one school day?`),
      ex(['scale', 'How much do you agree?', `Phones help students learn.
Phones distract students in lessons.
Schools, not students, should decide when phones can be used.`]),

      h('Vocabulary · 10 хв'),
      note('Спершу прочитайте слова вголос, учень повторює. Потім вправи: match виконується самостійно (3 хв), gap перевіряємо разом. Якщо учень помиляється, просіть пояснити значення слова своїми словами англійською, а не перекладати.'),
      vocab(`a locker = шафка
to collect = забирати
calm = спокійний
focused = зосереджений
an emergency = надзвичайна ситуація
to contact = зв’язатися
a rule = правило
to scroll = гортати (стрічку)
to be allowed to = мати дозвіл
to ban = забороняти
a distraction = те, що відволікає
research = пошук інформації, дослідження`),
      ex(
        ['match', 'Match the words with their meanings.', `a locker = a small cupboard to keep your things
calm = quiet and peaceful
an emergency = a sudden dangerous situation
to contact = to call or write to someone
a distraction = something that takes your attention away`],
        ['gap', 'Complete with: ban, scroll, focused, allowed, research.', `Many schools want to [ban] phones during lessons.
I can’t stop once I start to [scroll] through videos.
It’s easier to stay [focused] in a quiet room.
Are we [allowed] to use dictionaries in the test?
We used the library computers for our history [research].`],
      ),

      h('Reading: НМТ multiple choice · 15 хв'),
      tip('Лайфхак для НМТ: спочатку прочитай питання, потім текст. Підкресли ключові слова в питанні, а в тексті шукай їхні **синоніми**, а не ті самі слова. Варіант, який повторює слово з тексту дослівно, часто є пасткою.'),
      note('Дайте 6-7 хвилин на текст і питання без словника, як на іспиті. Під час перевірки просіть учня показати рядок у тексті, який доводить відповідь. Для кожного неправильного варіанту A-D коротко поясніть, чому він не підходить.'),
      t(`Last September, Oakfield Secondary School tried something new: no phones during the school day. Students now leave their phones in a locker when they arrive and collect them at 3 pm.

At first, many students were unhappy. “I felt lost without my phone for the first week,” says Daria, 15. “But then I noticed that people started talking at lunch instead of scrolling.”

Teachers say lessons have become calmer. “Students are more focused, and fewer of them come to class late,” explains Mr Collins, the head teacher. However, some parents are worried that they cannot contact their children during the day. The school now allows parents to call the office in an emergency.

There were other changes too. Fewer arguments started on social media during the school day, and the library became much busier during breaks. “I’ve read four books this term,” says Max, 14. “Before, I spent every break on my phone.”

After one year, the school asked students what they thought. Almost two thirds said they would keep the rule, although many wanted to use phones in the library for research.`),
      ex(
        ['truefalse', 'True or False?', `Students keep their phones in their bags during lessons. = False
Daria found the first week difficult. = True
According to Mr Collins, students are less focused now. = False
Parents can call the school office if something serious happens. = True`],
        ['choice', 'Choose the best answer (A-D).', `What did Daria notice after the first week? {People talked to each other at lunch|She did not miss her phone at all|Her friends lost their phones|Lunch breaks became shorter}
According to Mr Collins, the rule has helped students to {concentrate better in class|get higher marks in every subject|make more friends online|finish school earlier}
How did the school respond to parents’ worries? {It let parents call the office in an emergency|It gave every student a school phone|It cancelled the rule for younger students|It asked parents to visit the school}
Why does Max mention books? {He used his breaks differently after the ban|He needed books for his research|The library sold books cheaply|He had to read them for homework}
Most students wanted to {keep the rule but use phones in the library|stop the rule completely|make the rule stricter|use phones only at lunch}`],
      ),

      h('Listening · 10 хв'),
      note('Перше прослуховування: учень лише відповідає, хто за правило, а хто проти. Друге: виконує вправу. Після перевірки попросіть знайти в діалозі фрази для згоди і незгоди (I see your point, That’s fair) і запишіть їх для етапу говоріння.'),
      audio('Student council meeting', `
Anna: OK, everyone, today we need to decide what we think about the phone-free rule.
Mark: I’ll be honest, I don’t like it. My bus is often late, and I can’t tell my mum.
Anna: But you can use the phone in the office, right?
Mark: Yes, but there’s always a queue at the end of the day.
Sofia: I see your point, Mark, but I think the rule works. Lessons are much quieter now.
Mark: Quieter, maybe. But we live in a digital world. We should learn to use phones wisely, not just hide them.
Sofia: That’s fair. What if we had phone time in the library for research?
Anna: I like that idea. Twenty minutes a day, only for schoolwork.
Mark: And maybe a phone zone near the bus stop after lessons?
Anna: Great. So we keep the rule, add a library session and ask about a phone zone. Let’s vote on Friday.`),
      ex(
        ['truefalse', 'True or False?', `Mark is happy with the phone-free rule. = False
Mark’s problem is connected with his bus. = True
Sofia thinks lessons have become quieter. = True
The students decide to cancel the rule. = False`],
        ['choice', 'Choose the correct answer.', `Mark believes students should {learn to use phones wisely|never use phones at school|buy cheaper phones|use phones only at home}.
Sofia suggests phone time {in the library|in every lesson|at lunch|on the bus}.
The vote will take place {on Friday|today|next month|after the holidays}.`],
      ),

      h('Language focus: rules · 8 хв'),
      tip('Як говорити про правила:\n\n**must / have to** = обов’язок (треба)\n**mustn’t / be not allowed to** = заборона (не можна)\n**don’t have to** = немає потреби (не обов’язково)\n**can / be allowed to** = дозвіл (можна)\n\nПастка НМТ: **don’t have to** НЕ означає заборону. You don’t have to come = можеш не приходити.'),
      note('Почніть з прикладів зі шкільних правил учня. Типова помилка: mustn’t замість don’t have to. Якщо учень плутає, намалюйте шкалу «заборона → вибір → обов’язок». Переклад перевіряйте гнучко: зараховуйте синонімічні варіанти вручну.'),
      ex(
        ['choice', 'Choose the correct option.', `Students {have to|don’t have to|can} leave their phones in a locker when they arrive.
You {mustn’t|don’t have to|can} use your phone during a test.
On Saturdays we {don’t have to|mustn’t|have to} wear a school uniform.
Parents {are allowed to|aren’t allowed to|mustn’t} call the office in an emergency.
During breaks, students are allowed {to play|play|playing} board games in the library.`],
        ['translate', 'Переклади англійською.', `Нам не можна користуватися телефонами на уроках = We are not allowed to use phones in lessons / We aren’t allowed to use phones in lessons / We mustn’t use phones in lessons / We must not use phones in lessons / We can’t use phones in lessons / We cannot use phones in lessons
Тобі не обов’язково приходити завтра = You don’t have to come tomorrow / You do not have to come tomorrow
Учні мають залишати телефони в шафках = Students have to leave their phones in lockers / Students must leave their phones in lockers / Students have to leave their phones in the lockers / Students must leave their phones in the lockers`],
      ),

      h('Speaking · 7 хв'),
      note('Попросіть учня в кожній відповіді вжити хоча б одну конструкцію з мовного блоку і одну фразу з діалогу (I see your point, That’s fair). Виправляйте делікатно: повторіть речення правильно і попросіть учня повторити.'),
      talk(`Would you like a phone-free school? Why or why not?
What are the good and bad sides of phones at school?
Mark wants a phone zone near the bus stop. Is it a good compromise?
Which rule would you change at your school? Use have to, mustn’t or be allowed to.
Imagine you are the head teacher. What three phone rules would you make?`),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['gap', 'Встав слово: locker, collect, calm, emergency, contact, distraction.', `Please put your bag in your [locker] before the lesson.
You can [collect] your phone from the office at 3 pm.
The library is a [calm] place to study.
Call this number only in an [emergency].
How can parents [contact] the school during the day?
Loud music is a big [distraction] when I do my homework.`],
        ['choice', 'Обери правильний варіант: обов’язок, заборона чи вибір.', `It’s Saturday, so we {don’t have to|mustn’t|have to} get up early.
You {mustn’t|don’t have to|can} run in the corridor. It’s dangerous.
Everybody wears a blue jacket because we {have to|don’t have to|aren’t allowed to} wear a uniform.
Are we {allowed to|allow to|allowed} use calculators in the maths test?
You {don’t have to|mustn’t|have to} bring lunch, but you can if you want.
Phones are a distraction, so students {aren’t allowed to|don’t have to|are allowed to} use them during tests.`],
        ['translate', 'Переклади англійською.', `Ми маємо залишати сумки в шафках = We have to leave our bags in lockers / We have to leave our bags in the lockers / We must leave our bags in lockers / We must leave our bags in the lockers
Тобі не обов’язково телефонувати мамі = You don’t have to call your mum / You do not have to call your mum / You don’t have to call your mom / You do not have to call your mom / You don’t have to phone your mum / You do not have to phone your mum
Можна мені зателефонувати додому? = Can I call home? / May I call home? / Can I phone home? / May I phone home? / Am I allowed to call home?
Не гортай стрічку на уроці = Don’t scroll in the lesson / Do not scroll in the lesson / Don’t scroll during the lesson / Do not scroll during the lesson / Don’t scroll in class / Do not scroll in class
Учні стали більш зосередженими = Students have become more focused / Students became more focused / The students have become more focused / The students became more focused
Школа заборонила телефони = The school has banned phones / The school banned phones / The school has banned mobile phones / The school banned mobile phones`],
      ),
      X.game('Phone rules: quick match', 'З’єднай слово з перекладом.', `a locker = шафка
to collect = забирати
calm = спокійний
focused = зосереджений
an emergency = надзвичайна ситуація
to scroll = гортати стрічку
a distraction = те, що відволікає
to be allowed to = мати дозвіл
to ban = забороняти
research = дослідження`),
      X.note('Extra practice можна виконати, якщо лишився час, або дати як розминку на початку наступного уроку. У секції з модальними нагадайте шкалу: mustn’t = заборона, don’t have to = не обов’язково. У реченні про обід правильна відповідь don’t have to, бо далі сказано «but you can if you want». У перекладі зараховуйте вручну синонімічні варіанти (must / have to, phone / call), яких немає в ключі. Гру можна пройти на швидкість двічі: спершу з англійської, потім з української.'),

      h('НМТ Writing and wrap-up · 5 хв'),
      tip('Лист на НМТ: звертання (**Dear Mr Collins,**) → одне речення, навіщо пишеш → кожен пункт завдання окремим абзацом → завершення (**I hope you will consider my ideas.**) → підпис. Мінімум 50 слів, усі пункти обов’язкові.'),
      note('На уроці учень складає план листа (2 хв), а сам лист пише вдома. Домашнє завдання: написати лист 50-70 слів і вивчити слова уроку в грі. Наостанок поверніться до шкали думок з Warm-up: чи змінилася думка учня?'),
      ex(['open', 'НМТ Writing: 50-70 words.', 'Write an email to your head teacher. Say if you support a phone-free day at your school, give two reasons and suggest one rule that would make it fair for everyone.']),

      X.h('Homework plus'),
      X.ex(
        ['gap', 'Встав have to, don’t have to, mustn’t або can.', `It’s a test, so you [mustn’t/must not/can’t/cannot] talk to your friends.
Tomorrow is a holiday, so we [don’t have to/do not have to] go to school.
In the library you [can] read any book you like, it’s free.
If you are late, you [have to/must] go to the office first.
We [don’t have to/do not have to] buy books, the school gives them to us.
The concert has started, so you [mustn’t/must not/can’t/cannot] talk now.`],
        ['choice', 'Обери правильну відповідь за текстом уроку.', `At Oakfield, students collect their phones {at 3 pm|at lunch|in the morning}.
In the first week, Daria felt {lost|happy|calm} without her phone.
Mr Collins says that fewer students {come to class late|forget their homework|get bad marks}.
During breaks, the library became {much busier|closed|quieter}.
Max has read {four books|two books|ten books} this term.
Almost two thirds of the students would {keep the rule|cancel the rule|make the rule stricter}.`],
        ['open', 'Письмо: 2-3 речення на кожне питання.', `What are three rules at your school? Use have to, mustn’t or be allowed to.
Imagine one school day without your phone. What would you do instead?
Should parents be able to contact their children at school at any time? Why or why not?`],
      ),
    ],
  },

  // ---------- 2. НМТ Use of English: tricky pairs ----------
  {
    id: 'lib-nmt-use-of-english', title: 'Use of English: tricky pairs', level: 'B1', age: 'teens', topic: 'Use of English', color: 'tomato', source: 'murly',
    focus: ['Grammar', 'Vocabulary', 'Speaking'],
    aims: 'Розберемо пари слів, на яких часто помиляються в НМТ: make/do, say/tell, since/for\nДодамо пари borrow/lend, remember/remind, lose/miss\nПотренуємо Use of English з чотирма варіантами в зв’язному тексті\nЗакріпимо пари в усному мовленні та перекладі',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      note('Короткий квіз «на швидкість»: учень відповідає без підказок, а ви фіксуєте, які пари він уже плутає. Пояснення залиште на наступні етапи.'),
      talk(`Which English words do you often mix up?
Is it easier for you to learn grammar or vocabulary? Why?`),
      ex(['choice', 'Quick quiz: choose the correct word.', `I {borrowed|lent} a pen from my friend.
Could you {lend|borrow} me your charger?
Please {remind|remember} me to buy milk.`]),

      h('Vocabulary: make, do, say, tell · 12 хв'),
      tip('**make** = створювати щось нове (make a cake, make a mistake, make friends, make a decision).\n**do** = виконувати дію, роботу (do homework, do sport, do your best, do the shopping).\n\n**say** something (say hello, say yes), але **tell** someone something (tell me, tell the truth, tell a story).'),
      note('Пройдіться по списку слів і попросіть учня скласти по одному реченню з 3-4 виразами. У сортуванні пастка: make a noise, make a phone call, do a favour. Обговоріть, що ці вирази треба просто запам’ятати.'),
      vocab(`make a mistake = зробити помилку
make friends = подружитися
make a decision = ухвалити рішення
do homework = робити домашнє завдання
do your best = зробити все можливе
do the shopping = робити покупки
say something = сказати щось
tell someone = сказати комусь
tell the truth = казати правду
borrow from = позичати (у когось)
lend to = позичати (комусь)
remind = нагадувати`),
      ex(
        ['sort', 'Make or do?', `Make: a mistake; a decision; a noise; friends; a phone call
Do: homework; the shopping; sport; a favour; your best`],
        ['choice', 'Say or tell?', `Can you {tell|say} me the time?
She {said|told} that she was tired.
Don’t {tell|say} anyone my secret!
He {said|told} goodbye and left.`],
      ),

      h('More tricky pairs · 10 хв'),
      tip('**since** + момент (since Monday, since 2018), **for** + період (for two weeks, for an hour).\n\n**borrow** = взяти на час (borrow FROM someone), **lend** = дати на час (lend TO someone).\n\n**remember** = пам’ятати самому, **remind** = нагадати комусь.\n\n**lose** = загубити, програти; **miss** = пропустити, спізнитися на, сумувати за.'),
      note('Попросіть учня до кожної пари придумати власний приклад з життя. Помилки виправляйте через питання: «Хто кому дає річ?» для borrow/lend, «Момент чи період?» для since/for.'),
      ex(['choice', 'Choose the correct word.', `I have lived here {since|for} 2018.
We have waited {for|since} an hour.
She has been ill {since|for} Monday.
Hurry up or we’ll {miss|lose} the bus!
I always {lose|miss} my keys.
Can you {remind|remember} me about the test tomorrow?
My brother never {lends|borrows} me his bike.`]),

      h('НМТ Use of English · 15 хв'),
      tip('Стратегія для тексту з пропусками: 1) прочитай увесь текст, щоб зрозуміти зміст; 2) для кожного пропуску визнач, що перевіряють: граматику (час, форма) чи лексику (значення, сталий вираз); 3) підстав відповідь і перевір слова **до і після** пропуску; 4) не залишай пропусків без відповіді.'),
      note('Текст A учень виконує самостійно за 5 хвилин, текст B за 5 хвилин, далі 5 хвилин на розбір. Розбираючи помилку, просіть назвати тип пропуску (час, прийменник, пара слів). Зверніть увагу на часові маркери: last summer, since then, for two months.'),
      ex(['choice', 'Text A: My summer camp. Choose the correct option (A-D).', `Last summer I {went|have gone|go|was going} to a language camp in the Carpathians.
On the first day I {made|did|took|got} friends with a boy from Lviv.
We {had|have had|were having|has} lessons every morning and went hiking in the afternoon.
One evening our teacher {told|said|spoke|talked} us funny stories about his life in London.
I {have studied|study|studied|am studying} English since I was seven, but that summer I finally started to speak it.
Since then I {have kept|keep|kept|am keeping} in touch with everyone from the camp.`]),
      ex(['choice', 'Text B: The camera. Choose the correct option (A-D).', `Last week my sister asked if she could {borrow|lend|take|give} my camera for a school project.
I said yes, but I {reminded|remembered|remarked|recalled} her to charge the battery.
She {did|made|took|had} her project in the park with three classmates.
Unfortunately, she nearly {lost|missed|left|forgot} the lens cap in the grass.
“I’ll be more careful next time,” she {said|told|spoke|talked}.
Now she has been saving money {for|since|during|from} two months to buy her own camera.`]),

      h('Speaking · 8 хв'),
      note('Учень відповідає розгорнуто, 3-4 речення на питання. Ваше завдання: слухати лише пари з уроку. Записуйте помилки і в кінці етапу дайте 1-2 хвилини на виправлення разом.'),
      talk(`Tell me about a mistake you made and what you learnt from it.
When did you last lend something to a friend? Did you get it back?
What do you often forget? Who reminds you?
Have you ever missed a bus, a train or an important event? What happened?
How long have you known your best friend?`),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['choice', 'НМТ: обери правильний варіант (A-D).', `I’m sorry, I {made|did|took|had} a mistake in your name.
Can you {do|make|take|give} me a favour and close the window?
My teacher {told|said|spoke|talked} us to start the test.
She {said|told|spoke|talked} that the shop was closed.
Tom has played the guitar {since|for|from|during} he was nine.
I need to {borrow|lend|owe|pay} some money from my brother.
Oh no! We’ve {missed|lost|left|passed} the last train.`],
        ['gap', 'Встав правильне слово з пари в дужках.', `Please [remind] (remember / remind) me to call Grandma.
I can’t [remember] (remember / remind) his phone number.
Our team [lost] (lost / missed) the match yesterday.
I really [miss] (lose / miss) my friends from the summer camp.
Could you [lend] (borrow / lend) me your umbrella?
We’ve lived in this flat [for] (since / for) ten years.`],
        ['match', 'З’єднай вираз з перекладом.', `make a noise = шуміти
do a favour = зробити послугу
tell a lie = збрехати
say sorry = вибачитися
miss the bus = спізнитися на автобус
lose a game = програти гру`],
      ),
      X.game('Tricky pairs: meanings', 'Знайди значення кожного слова з пари.', `borrow = take something for a short time
lend = give something for a short time
remember = keep something in your mind
remind = help someone not to forget
lose = not be able to find something
miss = be too late for a bus or a train
since = from a point in time until now
for = during a period of time
say = speak words
tell = give information to someone`),
      X.note('Extra practice можна виконати, якщо лишився час, або на початку наступного уроку як повторення. У тесті A-D пастки: do me a favour (не make), told us (після tell потрібен об’єкт), said that (без об’єкта). У перекладі виразів зверніть увагу: say sorry, але tell a lie. Гра на значення: попросіть учня після кожної пари скласти власне речення.'),

      h('Mini test and wrap-up · 10 хв'),
      note('Міні-тест учень виконує без підказок. Переклад перевіряйте гнучко: зараховуйте вручну правильні варіанти, яких немає в ключі. Домашнє завдання: скласти 10 власних речень, по два на кожну пару, і пройти гру зі словами уроку.'),
      ex(['gap', 'Встав правильне слово з пари в дужках.', `Could you [tell] (say / tell) me your address?
I’ve had this phone [for] (since / for) three years.
We [did] (made / did) the shopping on Saturday morning.
Did you [remind] (remind / remember) Tom about the party?`]),
      ex(['translate', 'Переклади англійською.', `Я роблю домашнє завдання щовечора = I do my homework every evening / I do homework every evening
Вона сказала мені правду = She told me the truth
Ми знаємо одне одного вже три роки = We have known each other for three years / We’ve known each other for three years
Можеш позичити мені свій зошит? = Can you lend me your notebook? / Could you lend me your notebook? / Can you lend me your exercise book? / Could you lend me your exercise book?
Я не хочу пропустити початок фільму = I don’t want to miss the beginning of the film / I do not want to miss the beginning of the film / I don’t want to miss the start of the film / I do not want to miss the start of the film / I don’t want to miss the beginning of the movie / I don’t want to miss the start of the movie`]),

      X.h('Homework plus'),
      X.ex(
        ['choice', 'НМТ Text C: My first job. Обери правильний варіант (A-D).', `Last summer I {got|made|did|won} a part-time job in a café.
On my first day the manager {told|said|spoke|explained} me the rules.
I {made|did|had|got} a lot of mistakes with the coffee machine.
I had to {borrow|lend|rent|owe} a black shirt from my cousin.
One morning I {missed|lost|left|passed} the bus and arrived late.
I have saved a lot of money {since|for|from|during} June.`],
        ['translate', 'Переклади англійською.', `Нагадай мені про тест = Remind me about the test / Please remind me about the test / Remind me about the test, please
Я загубив ключі = I lost my keys / I’ve lost my keys / I have lost my keys
Він завжди каже правду = He always tells the truth
Ми ухвалили рішення = We made a decision / We have made a decision / We’ve made a decision
Я сумую за бабусею = I miss my grandma / I miss my granny / I miss my grandmother
Я позичив книжку в Ані = I borrowed a book from Anya / I borrowed a book from Ania / I borrowed the book from Anya / I borrowed the book from Ania / I borrowed a book from Anna / I borrowed the book from Anna`],
        ['open', 'Письмо: дай розгорнуту відповідь.', `Write three sentences about things you have done since September. Use since and for.
Tell a short story (4-5 sentences) about a day when you missed or lost something. Use at least three words from today’s pairs.`],
      ),
    ],
  },

  // ---------- 3. НМТ: Use of English (тест-формат) ----------
  {
    id: 'lib-nmt-cloze', title: 'Use of English: пропуски в тексті', level: 'B1', age: 'teens', topic: 'Use of English', color: 'tomato', source: 'murly',
    focus: ['Grammar', 'Vocabulary', 'Listening'],
    aims: 'Потренуємо завдання як на НМТ: текст з пропусками і варіантами A-D\nПовторимо часи, прийменники і сталі словосполучення\nРозберемо типові пастки і навчимося визначати тип пропуску\nЗакріпимо лексику про хобі та волонтерство',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      note('Коротко поговоріть про хобі і волонтерство: це теми обох текстів уроку. Твердження про формат завдання обговоріть, а не просто перевірте: учень має пояснити, чому так.'),
      talk(`What hobbies are popular among your friends?
Have you ever volunteered? What did you do?`),
      ex(['truefalse', 'True or False? The НМТ Use of English task.', `Each gap has four options, and only one is correct. = True
It is best to choose answers before reading the whole text. = False
Sometimes the right answer depends on the words after the gap. = True`]),

      h('Strategy and vocabulary · 10 хв'),
      tip('Спершу прочитай увесь текст, не дивлячись на варіанти. Потім для кожного пропуску подумай: потрібне слово за значенням, граматикою чи це стійке словосполучення? Перевір, чи слово підходить і до того, що до пропуску, і до того, що після.'),
      note('Формат схожий на завдання НМТ, але тексти наші власні. Слова уроку зустрінуться в обох текстах. Типові пастки тут: make/do, for/since, say/tell, interested in. Попросіть учня скласти речення з 3 виразами про себе.'),
      vocab(`to take up = почати займатися (хобі)
to be interested in = цікавитися
to be good at = бути вправним у
to look after = доглядати
to pay attention to = звертати увагу на
to make friends = заводити друзів
to develop skills = розвивати навички
to spend time = проводити час
to take part in = брати участь у
an animal shelter = притулок для тварин
elderly people = літні люди
a local competition = місцевий конкурс`),
      ex(['match', 'Match the beginnings with the endings.', `be interested = in photography
be good = at maths
look = after a younger brother
pay attention = to the details
take part = in a competition`]),

      h('НМТ Task 1: A new hobby · 15 хв'),
      tip('Три типи пропусків:\n\n**Граматика:** час або форма дієслова (became / has become). Шукай маркери часу: last month, for more than a year.\n**Лексика:** значення слова (take up / take after).\n**Колокації і прийменники:** слова, що «ходять парою» (interested in, make mistakes).'),
      note('Дайте 6 хвилин на текст, як на іспиті. Під час перевірки учень називає тип кожного пропуску. Сортування for/since виконується після тексту як закріплення пастки з пропуску 6.'),
      ex(['choice', 'Choose the correct option for each gap (A-D).', `Last year my friend Max decided to {take up|take off|take after|take over} photography.
He had always been interested {in|on|at|about} taking pictures, but he never had a good camera.
His parents gave him one {for|since|during|while} his birthday.
At first he {made|did|got|had} a lot of mistakes.
But he practised every day, and soon his photos {became|become|have become|becoming} really good.
Now he has been taking photos {for|since|from|during} more than a year.
Last month he {won|wins|has won|was winning} a local competition.
He {told|said|spoke|talked} me that he wants to study photography at university.`]),
      ex(['sort', 'For or since?', `For: two weeks; ages; more than a year
Since: 2020; Monday; I was ten`]),

      h('НМТ Task 2: Volunteering · 10 хв'),
      note('Цей текст учень виконує на час: 4 хвилини. Потім перевірка і розбір пасток: spend/pass time, look after, pay attention to. Нагадайте: якщо не знаєш відповіді, відкинь явно неправильні варіанти і обери з тих, що залишилися.'),
      ex(['choice', 'Choose the correct option for each gap (A-D).', `More and more teenagers {spend|pass|waste|take} their free time volunteering.
They help in animal shelters, clean parks or {look|watch|see|care} after elderly people.
Volunteering is a great way to {make|do|have|get} new friends.
It also helps you {develop|grow|rise|raise} useful skills.
Many universities pay attention {to|for|on|at} volunteering experience.
If you {want|will want|wanted|would want} to try, start with a small local project.`]),

      h('Listening and speaking · 10 хв'),
      note('Інтерв’ю продовжує історію Макса з тексту 1. Слухаємо двічі. Після вправи учень відповідає на питання, використовуючи щонайменше три вирази зі списку слів. Виправляйте помилки в прийменниках одразу, але коротко.'),
      audio('School radio: an interview with Max', `
Host: Today on our school radio we have Max, who won the local photo competition last month. Congratulations, Max!
Max: Thank you! I still can’t believe it.
Host: When did you take up photography?
Max: About a year and a half ago. My parents gave me a camera for my birthday.
Host: Was it easy at first?
Max: Not at all. I made lots of mistakes. Half of my photos were too dark.
Host: What helped you most?
Max: Practice, really. I took photos every day, even on my way to school. And I watched online lessons.
Host: What was your winning photo?
Max: An old man feeding pigeons in the park next to the animal shelter where I volunteer.
Host: And what are your plans?
Max: I want to study photography at university, so I’m saving money for a better lens.`),
      ex(['truefalse', 'True or False?', `Max took up photography about a year and a half ago. = True
Many of his first photos were too bright. = False
Max volunteers at an animal shelter. = True
Max is saving money for a new camera. = False`]),
      talk(`Would you like to take up photography? Why or why not?
What skills can you develop by volunteering?
Tell me about a competition you took part in.`),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['choice', 'НМТ Text C: A school garden. Обери правильний варіант (A-D).', `Two years ago our class decided to {take|make|do|get} part in a school garden project.
At first, nobody was really interested {in|on|at|for} plants.
But our biology teacher was very good {at|in|on|with} explaining things.
Every week we {spent|passed|took|lost} two hours in the garden after lessons.
We learnt to pay attention {to|on|at|for} the weather and the soil.
Since then we {have grown|grew|grow|are growing} tomatoes, beans and pumpkins.
Last autumn we {gave|have given|give|were giving} our vegetables to elderly people in our town.`],
        ['gap', 'Встав одне слово: up, in, at, after, to, for.', `My little brother wants to take [up] chess.
Are you interested [in] science?
She is very good [at] drawing.
Who looks [after] your dog when you are away?
Please pay attention [to] the instructions.
I have volunteered at the shelter [for] two years.`],
        ['match', 'З’єднай частини речення.', `Volunteering helps you = develop useful skills.
At the animal shelter, we look = after cats and dogs.
She took part = in a local competition.
I spend most of my free time = reading books.
Many teenagers make = new friends at summer camps.
He has been interested in robots = since he was twelve.`],
      ),
      X.game('Collocations race', 'Склади сталий вираз: початок = кінець.', `take part = in a project
be interested = in photography
be good = at sport
look = after elderly people
pay attention = to details
make = new friends
develop = useful skills
spend = time with friends`),
      X.note('Extra practice можна виконати, якщо лишився час, або як розминку на наступному уроці. Text C учень виконує на час: 4 хвилини, як на НМТ, і називає тип кожного пропуску (граматика, лексика, прийменник). Пастки: spend, а не pass time; have grown через since then; gave через last autumn. У грі учень бачить початок виразу і має швидко знайти кінець.'),

      h('Mini test and wrap-up · 10 хв'),
      note('Міні-тест без підказок, 5 хвилин. Потім підсумок: учень називає три пастки, які запам’ятав. Домашнє завдання: скласти власний текст на 6 речень з пропусками і варіантами A-D на тему хобі та обмінятися ним на наступному уроці.'),
      ex(['gap', 'Встав одне слово.', `I have known her [since] 2020.
Can you [tell] me the way to the station?
She is very good [at] maths.
Don’t forget to [do] your homework!
My grandma looks [after] my little sister on weekdays.
I’d like to take [part] in the school marathon.`]),
      ex(['translate', 'Переклади англійською.', `Я цікавлюся фотографією = I am interested in photography / I’m interested in photography
Вона почала займатися йогою минулого року = She took up yoga last year
Ми проводимо вихідні в притулку для тварин = We spend our weekends at an animal shelter / We spend our weekends in an animal shelter / We spend weekends at an animal shelter / We spend weekends in an animal shelter`]),

      X.h('Homework plus'),
      X.ex(
        ['choice', 'НМТ Text D: A charity run. Обери правильний варіант (A-D).', `Last month our school {organised|has organised|organises|was organising} a charity run.
More than two hundred students took {part|place|care|time} in it.
Before the race I {had trained|have trained|train|am training} for three months.
My best friend is not good {at|in|on|with} running, so she helped at the finish line.
We collected money to help an animal {shelter|shell|shield|shade} in our town.
Next year I hope {to run|running|run|ran} again with my brother.`],
        ['translate', 'Переклади англійською.', `Мій брат доглядає за нашим собакою = My brother looks after our dog / My brother takes care of our dog
Вона добре вміє малювати = She is good at drawing / She’s good at drawing / She is good at painting / She’s good at painting
Я хочу взяти участь у конкурсі = I want to take part in the competition / I want to take part in a competition / I’d like to take part in the competition / I would like to take part in the competition / I’d like to take part in a competition / I would like to take part in a competition
Він волонтер з 2022 року = He has been a volunteer since 2022 / He’s been a volunteer since 2022 / He has volunteered since 2022 / He has been volunteering since 2022 / He’s been volunteering since 2022
Ми проводимо багато часу разом = We spend a lot of time together / We spend lots of time together
Вона завжди звертає увагу на деталі = She always pays attention to details / She always pays attention to the details`],
        ['open', 'Письмо: дай розгорнуту відповідь.', `Write a short text (5-6 sentences) about your hobby. Use take up, be interested in and be good at.
Would you like to volunteer? Where and why? Write 3-4 sentences.`],
      ),
    ],
  },

  // ---------- 4. НМТ Reading: заголовки до абзаців ----------
  {
    id: 'lib-nmt-headings', title: 'Reading: заголовки до абзаців', level: 'B1', age: 'teens', topic: 'Reading', color: 'sky', source: 'murly',
    focus: ['Reading', 'Vocabulary', 'Speaking'],
    aims: 'Потренуємо завдання НМТ «підбери заголовок до абзацу» із зайвими варіантами\nНавчимось шукати головну думку і перефразування, а не окремі слова\nВивчимо лексику про сон, звички і дозвілля\nОбговоримо режим дня підлітків',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      note('Перші питання про сон готують до тексту 1. Не виправляйте помилки, лише слухайте. Шкала думок без правильних відповідей, до неї можна повернутися на етапі Speaking.'),
      talk(`What time do you go to bed on school days?
How do you feel in the first lesson in the morning?`),
      ex(['scale', 'How much do you agree?', `Teenagers need more sleep than adults.
Using a phone in bed is a bad idea.
School should start later.`]),

      h('Vocabulary · 10 хв'),
      note('Прочитайте слова, звертаючи увагу на вимову adolescence, hormone, exhausted. Match учень робить сам, gap перевіряємо разом. Попросіть учня розповісти про свій вечірній розпорядок, використовуючи 3 нові слова.'),
      vocab(`adolescence = підлітковий вік
a hormone = гормон
laziness = лінощі
to stay up late = довго не лягати спати
to concentrate = зосереджуватися
to recommend = рекомендувати
to advise = радити
a grade = оцінка
to keep someone awake = не давати комусь заснути
a routine = розпорядок
exhausted = виснажений
a habit = звичка`),
      ex(
        ['match', 'Match the words with their meanings.', `laziness = not wanting to work or make an effort
exhausted = extremely tired
a routine = the things you usually do in the same order
to stay up late = to go to bed later than usual
a habit = something you do often, almost without thinking`],
        ['gap', 'Complete with: routine, habit, stay up, grade.', `My morning [routine] starts with a glass of water.
Checking my phone in bed is a bad [habit].
On Fridays I usually [stay up] late and watch films.
She got the top [grade] in the physics test.`],
      ),

      h('НМТ Reading 1: Sleep and teenagers · 15 хв'),
      tip('Прочитай абзац і сформулюй його головну думку своїми словами. Лише потім шукай заголовок. Пастка: заголовок з тим самим словом, що й у тексті, часто неправильний. Головне не слова, а зміст. На НМТ заголовків більше, ніж абзаців, тож деякі залишаться зайвими.'),
      note('Дайте 7 хвилин на текст і заголовки. Тут уже є два зайві заголовки: «Teenagers who sleep too much» і «Why adults need less sleep». Після перевірки обговоріть, чому вони не підходять жодному абзацу: перший суперечить тексту, другого в тексті немає взагалі.'),
      t(`**A.** Many parents complain that their teenage children stay up late and cannot get out of bed in the morning. Scientists say this is not just laziness. During adolescence, the body starts producing the sleep hormone later in the evening, so teenagers naturally feel sleepy later.

**B.** Unfortunately, school still starts early. As a result, many students sleep only six or seven hours, while experts recommend eight to ten. Tired students find it harder to concentrate, remember new information and control their emotions.

**C.** Some schools have tried a later start. In several studies, when lessons began an hour later, students slept longer, were late less often and even got better grades.

**D.** Phones make the problem worse. The bright screen tells the brain that it is still daytime, and endless videos and messages keep us awake. Doctors advise putting the phone away at least an hour before going to bed.`),
      ex(
        ['choice', 'Choose the best heading for each paragraph. Two headings are extra.', `Paragraph A: {It’s biology, not laziness|Not enough rest for learning|An experiment that worked|A screen that steals your sleep|Teenagers who sleep too much|Why adults need less sleep}
Paragraph B: {Not enough rest for learning|It’s biology, not laziness|An experiment that worked|A screen that steals your sleep|Teenagers who sleep too much|Why adults need less sleep}
Paragraph C: {An experiment that worked|It’s biology, not laziness|Not enough rest for learning|A screen that steals your sleep|Teenagers who sleep too much|Why adults need less sleep}
Paragraph D: {A screen that steals your sleep|It’s biology, not laziness|Not enough rest for learning|An experiment that worked|Teenagers who sleep too much|Why adults need less sleep}`],
        ['truefalse', 'True or False?', `Teenagers feel sleepy later because of a hormone. = True
Experts recommend six hours of sleep for teenagers. = False
A later school start helped students in some studies. = True
Doctors say you can use your phone until you fall asleep. = False`],
        ['gap', 'Find the words in the text.', `the period when a child becomes an adult (paragraph A): [adolescence]
to give all your attention to something (paragraph B): [concentrate]
suggest what someone should do (paragraph D): [advise]`],
      ),

      h('НМТ Reading 2: Board games are back · 12 хв'),
      tip('Заголовки НМТ майже завжди **перефразовують** текст. «Advice for beginners» у тексті може звучати як «If you want to start…». Підкресли в абзаці фразу, яка доводить твій вибір.'),
      note('Цей текст учень виконує на час: 6 хвилин. Зайві заголовки тут: «Games that only adults can play» і «How to win every time». Другий навмисно схожий на абзац E: в абзаці сказано якраз протилежне (don’t worry about winning). Друга вправа тренує пошук перефразувань.'),
      t(`**A.** Ten years ago, many people thought board games would soon disappear. Today, cafés where you can play board games are opening in cities all over the world, and sales of games have grown every year.

**B.** Why? Many young people say they are tired of screens. After a day of online lessons and messages, sitting around a table with real cards and dice feels refreshing. “It’s the only time my friends and I put our phones away,” says Oleh, 16.

**C.** Board games are not only fun. Strategy games teach you to plan ahead, and cooperative games, where all the players work together against the game, build teamwork. Some teachers now use them in maths and language lessons.

**D.** Not everyone is a fan, though. Some games take hours to learn, and the rule books can be thicker than a school textbook. Good games can also be expensive, which is why many players borrow them from libraries or game clubs.

**E.** If you want to start, choose a short, simple game for three or four players. Invite friends who don’t usually play, and don’t worry about winning. The best part is the conversation, not the score.`),
      ex(
        ['choice', 'Choose the best heading for each paragraph. Two headings are extra.', `Paragraph A: {An old hobby makes a comeback|A break from the digital world|More than just entertainment|A few disadvantages|Advice for beginners|Games that only adults can play|How to win every time}
Paragraph B: {A break from the digital world|An old hobby makes a comeback|More than just entertainment|A few disadvantages|Advice for beginners|Games that only adults can play|How to win every time}
Paragraph C: {More than just entertainment|An old hobby makes a comeback|A break from the digital world|A few disadvantages|Advice for beginners|Games that only adults can play|How to win every time}
Paragraph D: {A few disadvantages|An old hobby makes a comeback|A break from the digital world|More than just entertainment|Advice for beginners|Games that only adults can play|How to win every time}
Paragraph E: {Advice for beginners|An old hobby makes a comeback|A break from the digital world|More than just entertainment|A few disadvantages|Games that only adults can play|How to win every time}`],
        ['match', 'Match the words in the headings with the phrases in the text that prove them.', `makes a comeback = sales of games have grown every year
a break from the digital world = put our phones away
more than entertainment = teach you to plan ahead
disadvantages = can also be expensive
beginners = if you want to start`],
      ),

      h('Speaking · 8 хв'),
      note('Попросіть учня давати розгорнуті відповіді з аргументами (because, for example). Наприкінці поверніться до шкали з Warm-up: чи змінилася думка про пізній початок уроків після тексту?'),
      talk(`Should schools start later? Why or why not?
What is your evening routine before you go to sleep?
What helps you concentrate when you are tired?
Do you prefer board games or video games? Why?
What advice would you give a friend who can’t fall asleep?`),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['choice', 'НМТ: обери найкращий заголовок до кожного міні-абзацу (A-D).', `“I used to drink cola in the evening and then stay awake until 2 am. Now I drink only water after 6 pm.” {Changing one habit|Cola is good for you|Staying up all night|A new evening job}
“Our school starts at 9:30 now. Students say they feel less tired in the first lesson.” {A later start helps|Lessons get longer|Teachers come late|No first lesson any more}
“After three nights of little sleep, Ira couldn’t concentrate in the test and got a low grade.” {When tiredness costs you marks|How to pass every test|A night at the library|Ira’s favourite subject}
“Doctors recommend going to bed and getting up at the same time every day, even at weekends.” {Keep a regular routine|Sleep longer at weekends|Doctors who never sleep|Weekend plans}
“Board game cafés are full every Friday. Young people come to play, talk and forget about their phones.” {Offline fun is popular again|Cafés sell new phones|A Friday homework club|Why games are expensive}
“Some games take hours to learn, and the boxes can cost as much as a new pair of trainers.” {The downside of a hobby|Cheap fun for everyone|How to buy trainers|Games for small children}`],
        ['gap', 'Встав слово: exhausted, concentrate, recommend, habit, routine, laziness.', `After the long hike we were completely [exhausted].
I can’t [concentrate] when my brother plays loud music.
Doctors [recommend] eight to ten hours of sleep for teenagers.
Reading a paper book before bed is a good [habit].
My evening [routine] is simple: shower, book, sleep.
Not doing your homework just because you don’t want to is [laziness].`],
        ['match', 'З’єднай фразу з її перефразуванням, як у заголовках НМТ.', `go to bed late = stay up late
extremely tired = exhausted
can’t focus = find it hard to concentrate
a doctor’s suggestion = medical advice
make a comeback = become popular again
put your phone away = take a break from screens`],
      ),
      X.game('Synonym hunt', 'Знайди синонім або перефразування.', `exhausted = very tired
to advise = to suggest
a habit = something you do often
to concentrate = to focus
a grade = a mark
laziness = not wanting to work
a routine = the usual order of your day
adolescence = the teenage years
to recommend = to say something is a good idea`),
      X.note('Extra practice можна виконати, якщо лишився час, або на початку наступного уроку. У заголовках учень спершу формулює головну думку міні-абзацу своїми словами, потім обирає варіант. Пастки: «Staying up all night» і «Sleep longer at weekends» повторюють слова з тексту, але не передають головну думку. Вправа на перефразування і гра тренують головну навичку завдання НМТ: бачити той самий зміст у різних словах.'),

      h('Mini test and wrap-up · 10 хв'),
      note('Міні-тест: три короткі абзаци, 4 хвилини. Потім учень сам пише заголовок до абзацу 1 і пояснює вибір. Домашнє завдання: знайти коротку статтю англійською (3-4 абзаци), написати заголовок до кожного абзацу і один зайвий заголовок-пастку.'),
      t(`**1.** Mia used to sleep with her phone next to her pillow. Now she charges it in the kitchen and reads a paper book before bed. She says she falls asleep twenty minutes faster.

**2.** At Greenfield School, students spend five minutes outside between lessons, even in winter. Teachers believe that fresh air helps students to stay alert in class.

**3.** Energy drinks may seem like a quick solution for tired students, but they often contain huge amounts of sugar and caffeine. Doctors warn that they can cause headaches and make it even harder to sleep.`),
      ex(
        ['choice', 'Choose the best heading.', `Paragraph 1: {A new bedtime habit|Why paper books are expensive|Charging phones faster|Sleeping in the kitchen}
Paragraph 2: {Fresh air for a fresh mind|Winter sports at school|Longer lessons, better results|Teachers who love the cold}
Paragraph 3: {A dangerous shortcut|The best drinks for students|How to make energy drinks|Sugar-free and safe}`],
        ['open', 'Write your own heading.', 'Write a different heading for paragraph 1 (3-6 words). Explain in one sentence why it fits.'],
      ),

      X.h('Homework plus'),
      X.ex(
        ['choice', 'НМТ: обери найкращу відповідь за текстом «Sleep and teenagers» (A-D).', `According to paragraph A, teenagers feel sleepy later because {their body produces a hormone later|they are lazy|they use phones in bed|school starts early}.
Experts recommend that teenagers sleep {eight to ten hours|six or seven hours|five hours|twelve hours}.
Tired students find it harder to {remember new information|get up late|play board games|use their phones}.
In the studies, a later start helped students to {get better grades|finish school earlier|use phones less|have longer breaks}.
The bright screen of a phone {tells the brain it is still daytime|helps you fall asleep|makes you hungry|keeps the room warm}.
Doctors advise putting the phone away {at least an hour before bed|just before you close your eyes|in the morning|during lessons}.`],
        ['translate', 'Переклади англійською.', `Я часто довго не лягаю спати = I often stay up late
Лікарі радять менше користуватися телефоном = Doctors advise using the phone less / Doctors advise using your phone less / Doctors advise using phones less / Doctors advise people to use their phones less
Я не можу зосередитися = I can’t concentrate / I cannot concentrate / I can’t focus / I cannot focus
У мене погана звичка = I have a bad habit / I’ve got a bad habit / I have got a bad habit
Після тренування я виснажений = I am exhausted after training / I’m exhausted after training / I am exhausted after the training / I’m exhausted after the training / After training I am exhausted / After training I’m exhausted
Вона отримала гарну оцінку = She got a good grade / She got a good mark / She has got a good grade / She has got a good mark`],
        ['open', 'Письмо: дай розгорнуту відповідь.', `Write a paragraph (4-5 sentences) about your sleep habits. Then write a heading for it.
Write one extra trap heading for your paragraph and explain in one sentence why it does not fit.`],
      ),
    ],
  },

  // ---------- 5. НМТ Writing: лист другові ----------
  {
    id: 'lib-nmt-letter', title: 'Writing: лист другові', level: 'B1', age: 'teens', topic: 'Writing', color: 'mustard', source: 'murly',
    focus: ['Writing', 'Vocabulary', 'Listening'],
    aims: 'Розберемо структуру неформального листа на НМТ\nВивчимо фрази для початку, кінця листа і для порад\nПотренуємо зв’язки because, so, but, also\nНапишемо лист 50+ слів, що розкриває три пункти завдання',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      note('Почніть з розмови про листування в житті учня. Твердження про формат завдання обговоріть: учень має пояснити кожну відповідь. Головне повідомлення етапу: усі три пункти обов’язкові.'),
      talk(`Who do you write messages or emails to in English or Ukrainian?
What was the last long message you wrote? Who was it for?`),
      ex(['truefalse', 'True or False? The НМТ letter.', `Your letter must have at least 50 words. = True
You can skip one content point if the other two are very good. = False
An informal letter to a friend can end with “Best wishes”. = True`]),

      h('Useful phrases · 10 хв'),
      tip('Неформальний лист: **Dear / Hi + ім’я,** → вступ (подякуй або спитай, як справи) → три пункти завдання, кожен окремим абзацом → завершення → **Best wishes / Love / Take care,** + твоє ім’я. Обов’язково розкрий усі пункти завдання, за кожен пропущений знімають бали.'),
      note('На НМТ лист оцінюють за змістом (усі пункти), структурою, лексикою і граматикою. Пройдіться по фразах і попросіть учня обрати 4 улюблені, які він використає у власному листі. Сортування виконується самостійно.'),
      vocab(`Thanks for your letter = Дякую за листа
It was great to hear from you = Було чудово отримати від тебе звістку
How are you doing? = Як у тебе справи?
I’m writing to tell you about = Пишу, щоб розповісти про
By the way = До речі
You should bring = Тобі варто взяти
Why don’t we…? = Чому б нам не…?
How about…? = Як щодо…?
I can’t wait to see you = Не можу дочекатися зустрічі
Write back soon = Напиши швидше відповідь
Say hello to your family = Передавай привіт родині
Take care = Бережи себе`),
      ex(['sort', 'Which phrases open a letter, which make a suggestion and which close it?', `Opening: Thanks for your letter!; It was great to hear from you.; How are you doing?
Suggesting: Why don’t we go to the river?; You should bring a hat.; How about trying borshch?
Closing: Can’t wait to see you!; Write back soon.; Say hello to your family.`]),

      h('Model letter · 12 хв'),
      note('Учень читає завдання і лист, потім знаходить, де саме розкрито кожен пункт (можна підкреслити кольорами). Порахуйте слова разом: у листі близько 90 слів. Обговоріть, що можна прибрати, щоб лист став коротшим, але не втратив жодного пункту.'),
      t(`**Task:** Your English friend Sam is coming to Ukraine for a week in summer. Write him a letter. Tell him: what the weather is like in summer; what places you can visit together; what he should bring.

Hi Sam,

Thanks for your letter! I’m so happy you are coming to visit me in July.

The weather in summer is usually hot and sunny, about 28 degrees, but sometimes it rains in the evening.

We can visit the old town, go to the river and try real Ukrainian borshch in my favourite café. I’m sure you’ll love it!

Don’t forget to bring sunglasses, a hat and comfortable shoes, because we will walk a lot.

Can’t wait to see you!
Best wishes,
Ira`),
      ex(
        ['match', 'Match each part of the letter with its purpose.', `Hi Sam, = greeting
Thanks for your letter! I’m so happy you are coming = opening
The weather in summer is usually hot and sunny = content point 1
We can visit the old town = content point 2
Don’t forget to bring sunglasses = content point 3
Can’t wait to see you! Best wishes, Ira = closing and signature`],
        ['truefalse', 'True or False?', `Ira answers all three points of the task. = True
Each content point is in a separate paragraph. = True
Ira uses formal phrases such as “Yours faithfully”. = False`],
      ),

      h('Language focus: advice and linking words · 10 хв'),
      tip('Порада і пропозиція: **You should + V** (без to), **Why don’t we + V?**, **How about + V-ing?**, **Let’s + V**.\n\nЗв’язки роблять лист цілісним: **because** (причина), **so** (наслідок), **but** (протиставлення), **also** (додавання).'),
      note('Типові помилки: should to, how about to visit, why we don’t. Записуйте помилки учня на дошці і просіть виправити самостійно. Після вправ учень складає 2 власні поради для друга-іноземця.'),
      ex(
        ['choice', 'Choose the best option.', `{Dear|Hello dear|To} Sam,
You {should|must to|should to} bring a warm jacket.
{Best wishes|Best wish|With wishes},
{Why don’t we|Why we don’t|Why not we} go to the cinema on Saturday?
{How about|What about to|How about to} visiting the museum?
I’m sure you {will love|love will|will to love} it!`],
        ['gap', 'Complete with: because, so, but, also.', `Bring an umbrella, [because] it often rains in spring.
The museum is closed on Mondays, [so] let’s go on Tuesday.
The café is small, [but] the food is amazing.
We can [also] go cycling in the park.`],
      ),

      h('Listening and planning · 8 хв'),
      note('Діалог задає ситуацію для фінального листа. Після вправи учень усно планує лист за питаннями: по одному-два реченню на пункт. Не пишемо, лише говоримо, щоб на письмо залишився час.'),
      audio('A phone call from Alex', `
Alex: Hi Marta! Have you got a minute?
Marta: Sure, Alex. What’s up?
Alex: You know my mum’s birthday is next month. I want to cook a Ukrainian dish for her.
Marta: That’s so sweet! What kind of dish?
Alex: Something not too difficult. To be honest, I’m not a great cook.
Marta: Don’t worry. I’ll write you a proper letter with my favourite recipe.
Alex: Perfect. And tell me when I can come and cook it with you. I’m free in the first week of August.
Marta: Great, I’ll check with my parents and let you know.`),
      ex(['truefalse', 'True or False?', `Alex wants to cook a dish for his mum’s birthday. = True
Alex says he is an excellent cook. = False
Alex is free in the first week of August. = True`]),
      talk(`What is your favourite Ukrainian dish? Why would Alex like it?
What are the 2-3 main steps to cook it?
When can Alex come to cook with you?
Which phrases from today will you use in your letter?`),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['choice', 'НМТ: обери правильний варіант (A-D).', `{Thanks for|Thanks to|Thank for|Thanks of} your letter!
It was great to {hear from|hear to|listen from|hearing from} you.
You should {bring|to bring|bringing|brought} a raincoat.
How about {going|go|to go|went} to the lake on Sunday?
Why don’t we {meet|to meet|meeting|met} at the station?
I can’t wait {to see|seeing|see|for see} you!
{Say hello|Tell hello|Speak hello|Talk hello} to your parents!`],
        ['gap', 'Встав: because, so, but, also, By the way, Take care.', `I can’t come on Friday [because] I have a piano lesson.
It will be cold, [so] bring a warm sweater.
The hotel is small, [but] it is very cosy.
We can [also] visit the zoo if you want.
[By the way], my sister says hi!
See you soon! [Take care], Olya`],
        ['translate', 'Переклади англійською.', `Дякую за твого листа = Thanks for your letter / Thank you for your letter
Як у тебе справи? = How are you doing? / How are you? / How are things?
Тобі варто взяти зручне взуття = You should bring comfortable shoes / You should take comfortable shoes
Чому б нам не піти в кіно? = Why don’t we go to the cinema? / Why don’t we go to the movies? / Why not go to the cinema?
Як щодо того, щоб покататися на велосипедах? = How about riding bikes? / How about cycling? / How about going cycling? / How about riding our bikes? / How about going for a bike ride?
Не можу дочекатися зустрічі = I can’t wait to see you / Can’t wait to see you / I cannot wait to see you / I can’t wait to meet you / I cannot wait to meet you`],
      ),
      X.game('Letter builder', 'Склади фразу для листа: початок = кінець.', `Thanks for = your letter
It was great to hear = from you
I’m writing to tell you = about my trip
You should = bring a hat
Why don’t we = go to the river?
How about = trying varenyky?
I can’t wait = to see you
Say hello = to your family
Write back = soon`),
      X.note('Extra practice можна виконати, якщо лишився час, або як розминку перед написанням листа на наступному уроці. Головні пастки тесту: should + V без to, How about + V-ing, Why don’t we + V, can’t wait to + V. У gap вираз By the way стоїть на початку речення, Take care перед підписом. Після гри попросіть учня усно скласти короткий лист з 5-6 фраз гри.'),

      h('НМТ Writing and wrap-up · 15 хв'),
      tip('Чекліст перед здачею: 1) усі три пункти розкриті; 2) є звертання, вступ, завершення і підпис; 3) не менше 50 слів; 4) кожен пункт окремим абзацом; 5) перевір should + V, часи і артиклі.'),
      note('Спершу 3 хвилини на вправу з помилками, потім 10 хвилин на лист. Перевіряйте за критеріями НМТ: зміст, структура, лексика, граматика. Домашнє завдання: переписати лист з урахуванням виправлень і написати ще один лист на тему «Запроси друга на свій день народження» (50-70 слів).'),
      ex(
        ['choice', 'Choose the correct sentence.', `{I’m looking forward to seeing you.|I’m looking forward to see you.|I look forward see you.|I’m looking forward for seeing you.}
{It was great to hear from you.|It was great hear from you.|It were great to hear from you.|It was great to hear you from.}
{You should try varenyky.|You should to try varenyky.|You should trying varenyky.|You must to try varenyky.}
{First, you boil the potatoes.|First, you are boil the potatoes.|First, you boiling the potatoes.|First, boil you the potatoes.}
{Say hello to your family!|Say hello for your family!|Tell hello to your family!|Say hello your family!}`],
        ['open', 'Your turn: 50-70 words.', 'Your friend Alex wants to learn Ukrainian cooking. Write him a letter. Tell him: what your favourite Ukrainian dish is; how to cook it (2-3 steps); when he can come and cook it with you.'],
      ),

      X.h('Homework plus'),
      X.ex(
        ['choice', 'НМТ: обери правильне речення (A-D).', `{You should visit the old town.|You should to visit the old town.|You should visiting the old town.|You must to visit the old town.}
{Why don’t we go swimming?|Why we don’t go swimming?|Why don’t we to go swimming?|Why not we go swimming?}
{How about visiting my grandparents?|How about visit my grandparents?|How about to visit my grandparents?|What about to visit my grandparents?}
{I’m writing to tell you about my holiday.|I write for tell you about my holiday.|I’m writing for telling you about my holiday.|I’m write to tell you about my holiday.}
{Let’s meet at the café.|Let’s to meet at the café.|Let’s meeting at the café.|Let us meets at the café.}
{I’m looking forward to your visit.|I’m looking forward your visit.|I look forward for your visit.|I’m looking forward to visit.}`],
        ['gap', 'Встав слово: should, about, don’t, because, so, forward.', `You [should] try my mum’s cheesecake.
How [about] going to the park?
Why [don’t] we play tennis on Saturday?
Bring a swimsuit [because] there is a pool.
It’s far, [so] we’ll take a bus.
I’m looking [forward] to seeing you.`],
        ['open', 'НМТ Writing: 50-70 слів у першому завданні.', `Your friend Emma wants to visit your town in winter. Write her a letter (50-70 words). Tell her: what the weather is like; what you can do together; what she should bring.
Write three suggestions for a weekend with a friend. Use should, Why don’t we…? and How about…?`],
      ),
    ],
  },

  // ---------- 6. The true cost of fast fashion ----------
  {
    id: 'lib-fast-fashion', title: 'The true cost of fast fashion', level: 'B2', age: 'teens', topic: 'Екологія · Мода', color: 'tomato', source: 'murly',
    focus: ['Reading', 'Listening', 'Vocabulary', 'Speaking', 'Writing'],
    aims: 'Прочитаємо статтю про швидку моду і виконаємо завдання у форматі НМТ A-D\nВивчимо лексику про споживання і екологію\nПослухаємо діалог про обмін одягом\nНавчимось аргументувати позицію усно і письмово',
    duration: 60,
    blocks: [
      h('Lead-in · 5 хв'),
      note('Поставте питання і дайте учню говорити вільно, без виправлень. Попросіть оцінити, скільки речей у його шафі він не вдягав понад рік: ця цифра знадобиться в дебатах.'),
      talk(`How many clothes did you buy last month? How many of them do you actually wear?
Where do your old clothes go?
Who or what influences what you buy: friends, bloggers or adverts?`),

      h('Vocabulary · 10 хв'),
      note('Прочитайте слова, звертаючи увагу на вимову garment, sustainable, landfill. Match учень робить самостійно, gap перевіряємо разом. Додатково спитайте: «What was your last impulse buy?»'),
      vocab(`fast fashion = швидка мода
a garment = предмет одягу
disposable = одноразовий
landfill = звалище
to be worn = бути вдягненим
second-hand = вживаний, секонд-хенд
a trend = тренд
to make do with = обходитися (тим, що є)
an impulse buy = імпульсивна покупка
sustainable = сталий, екологічний
a wardrobe = гардероб, шафа для одягу
to swap = обмінюватися`),
      ex(
        ['match', 'Match the words with their meanings.', `disposable = made to be used for a short time and then thrown away
landfill = a place where rubbish is buried
an impulse buy = something you buy without planning
sustainable = not harmful to the environment in the long term
a garment = a piece of clothing`],
        ['gap', 'Complete with the words from the lesson.', `I try to buy [second-hand] clothes, they are cheaper and better for the planet.
That jacket was an [impulse buy/impulse purchase]. I never wear it.
We can [make do with] what we have instead of buying more.
Let’s organise a clothes [swap] at school, so everyone can bring two things.
My [wardrobe] is full, but I still feel I have nothing to wear.`],
      ),

      h('Reading: НМТ multiple choice · 15 хв'),
      tip('Стратегія для A-D: спочатку прочитай питання без варіантів і знайди потрібне місце в тексті. Дай відповідь своїми словами, а вже потім обери варіант, найближчий до неї. Варіанти з «never», «always», «all» часто занадто категоричні.'),
      note('Дайте 8 хвилин на текст і питання без словника. На перевірці учень цитує рядок, що доводить відповідь. Обговоріть питання про цитату дизайнера: це питання на розуміння прихованого змісту, яке часто трапляється на НМТ.'),
      t(`A T-shirt that costs less than a sandwich sounds like a great deal. But the low price on the label hides a much higher cost that someone else pays.

Fast fashion brands release new collections every few weeks. Clothes are designed to follow trends, not to last, and many garments are worn only a handful of times before being thrown away. In many countries, the average person now buys far more clothing than twenty years ago, yet keeps each item for a much shorter time.

The environmental impact is huge. Growing cotton needs enormous amounts of water, and cheap synthetic fabrics are made from oil. When we wash them, tiny plastic fibres end up in rivers and oceans. Most unwanted clothes are not recycled at all: they go to landfill or are burned.

There is also a human cost. To keep prices low, factories are under pressure to produce quickly and cheaply, and workers are often paid very little.

So what can we do? Buying less is the most effective step. Second-hand shopping, swapping clothes with friends and repairing what we already own are becoming popular, especially among young people. As one designer put it, **the most sustainable garment is the one already in your wardrobe.**`),
      ex(
        ['truefalse', 'True or False?', `Fast fashion collections change only once a year. = False
People today keep their clothes for less time than before. = True
Most unwanted clothes are recycled. = False
Synthetic fabrics can pollute the ocean. = True`],
        ['choice', 'Choose the best answer (A-D).', `The main idea of the text is that {cheap clothes have hidden costs|fashion is too expensive for teenagers|cotton is better than synthetic fabrics|people should never buy new clothes}.
According to the text, the most effective step is {buying less|recycling more|choosing synthetic fabrics|washing clothes less often}.
Why does the writer compare a T-shirt to a sandwich? {To show how cheap fast fashion is|To explain where clothes are made|To suggest that food is too expensive|To describe a new trend}
What happens when we wash synthetic clothes? {Tiny plastic fibres reach the water|The fabric becomes stronger|The clothes lose their colour|More water is needed to grow cotton}
What does the designer mean? {The greenest choice is to wear what you already have|You should buy a bigger wardrobe|Designers make the best clothes|Old clothes should be recycled at once}`],
      ),

      h('Listening · 10 хв'),
      note('Перше прослуховування: учень відповідає, чи погодився Том прийти. Друге: вправа. Після перевірки обговоріть: чи бувають у вашому місті обміни одягом або благодійні магазини?'),
      audio('Lily invites Tom to a clothes swap', `
Lily: Hey, Tom! Are you coming to the clothes swap on Saturday?
Tom: The what? I’ve never heard of it.
Lily: Everyone brings clothes they don’t wear any more, and you can take something “new” for free.
Tom: For free? What’s the catch?
Lily: There isn’t one. The only rule is that everything has to be clean and in good condition.
Tom: I’ve got a hoodie I bought on impulse last winter. I’ve worn it twice.
Lily: Perfect, bring it! Last time I found a denim jacket that fits me perfectly.
Tom: Honestly, I thought second-hand clothes were a bit old-fashioned.
Lily: Not at all. Half my class shops second-hand now. It’s cheaper, and it’s better for the planet.
Tom: OK, you’ve convinced me. What happens to the clothes nobody takes?
Lily: We give them to a charity shop, and anything too damaged goes to a textile recycling point.
Tom: Sounds well organised. See you on Saturday!`),
      ex(
        ['truefalse', 'True or False?', `Tom already knew about clothes swaps. = False
All clothes must be clean and in good condition. = True
Tom has worn his hoodie many times. = False
Clothes that nobody takes go to landfill. = False`],
        ['choice', 'Choose the correct answer.', `At the last swap, Lily found {a denim jacket|a hoodie|a pair of jeans|a winter coat}.
Tom used to think second-hand clothes were {old-fashioned|too expensive|dirty|hard to find}.
At the end, Tom {agrees to come|decides to stay at home|offers to organise the swap|wants to sell his hoodie}.`],
      ),

      h('Speaking: debate · 10 хв'),
      tip('Як аргументувати: **I’d argue that… / The main reason is… / On the other hand… / That’s why I believe…**\n\nЩоб не погодитися ввічливо: **I see your point, but… / That’s true, however…**'),
      note('Спершу учень відмічає шкалу, потім дебати: учень захищає одну позицію, вчитель іншу, далі міняєтеся ролями. Вимога: використати щонайменше 3 фрази з підказки. Помилки записуйте і розберіть в останні 2 хвилини етапу.'),
      ex(['scale', 'How much do you agree?', `Cheap clothes are a problem for the planet.
I could stop buying new clothes for a year.
Schools should teach students how to repair clothes.`]),
      talk(`Debate: “Fast fashion brands should pay a special tax.” Argue for, then against.
Would you organise a clothes swap at your school? How would it work?
Is it fair to blame buyers, or are the brands responsible?
What is one realistic change you could make to your shopping habits?`),

      X.h('Extra practice · якщо лишився час або на наступний урок'),
      X.ex(
        ['gap', 'Встав слово: garment, landfill, trend, disposable, sustainable, swap.', `Every [garment] in this shop is made from recycled cotton.
Millions of old clothes end up in [landfill] every year.
Neon colours were a huge [trend] last summer.
Cheap clothes have become almost [disposable]: people wear them once or twice and throw them away.
Shopping second-hand is a more [sustainable] choice.
Why don’t we [swap] jackets for the weekend?`],
        ['choice', 'Обери правильний варіант.', `{Although|Despite|However|Because of} the T-shirt was cheap, it fell apart after two washes.
{Despite|Although|Even|However} the low price, the jacket was badly made.
Fast fashion harms the planet. {What is more|On the other hand|To sum up|Despite this}, workers are often paid very little.
I can’t afford new trainers, so I’ll make {do|did|done|doing} with my old ones.
These jeans have only been {worn|wore|wear|wearing} twice.
Many people buy clothes they don’t need {on impulse|in impulse|by impulse|at impulse}.`],
        ['translate', 'Переклади англійською.', `Я купую вживаний одяг = I buy second-hand clothes / I buy secondhand clothes
Ця сукня була імпульсивною покупкою = This dress was an impulse buy / This dress was an impulse purchase
Більшість старого одягу потрапляє на звалище = Most old clothes end up in landfill / Most old clothes go to landfill / Most old clothes end up in a landfill / Most old clothes go to a landfill / Most old clothes end up in landfills
Ми можемо обійтися тим, що маємо = We can make do with what we have / We can make do with what we’ve got / We can make do with what we have got
Давай обміняємося куртками = Let’s swap jackets / Let us swap jackets / Let’s swap our jackets
Мій гардероб повний = My wardrobe is full`],
      ),
      X.game('Fashion vocab', 'З’єднай слово з перекладом.', `fast fashion = швидка мода
a garment = предмет одягу
disposable = одноразовий
landfill = звалище
second-hand = вживаний
a trend = тренд
an impulse buy = імпульсивна покупка
sustainable = сталий, екологічний
a wardrobe = гардероб
to swap = обмінюватися`),
      X.note('Extra practice можна виконати, якщо лишився час, або на початку наступного уроку перед перевіркою opinion paragraph. У вправі на вибір головна пастка: although + речення, despite + іменник. What is more додає аргумент у тому ж напрямку, тому On the other hand тут не підходить. Make do with: після make дієслово без змін. Переклади з кількома правильними формами зараховуйте вручну, якщо їх немає в ключі.'),

      h('Writing and wrap-up · 10 хв'),
      tip('Структура opinion paragraph: 1) твоя думка (**In my opinion…**); 2) перший аргумент з прикладом; 3) другий аргумент (**What is more…**); 4) можлива протилежна думка (**On the other hand…**); 5) висновок (**To sum up…**).'),
      note('На уроці учень виконує сортування і складає план абзацу (5 хв). Домашнє завдання: написати opinion paragraph 100-120 слів, використавши щонайменше 4 слова з уроку і 3 зв’язки з сортування. Додатково: порахувати речі в шафі, які не вдягалися понад рік.'),
      ex(
        ['sort', 'Put the linking phrases into the right group.', `Giving an opinion: In my opinion; I strongly believe that
Adding a point: What is more; In addition
Contrasting: On the other hand; However
Concluding: To sum up; All in all`],
        ['open', 'Writing: 100-120 words.', 'Write an opinion paragraph: “Should fast fashion brands pay a special tax?” Give two arguments, mention the opposite view and write a conclusion.'],
      ),

      X.h('Homework plus'),
      X.ex(
        ['choice', 'НМТ: обери найкращу відповідь за текстом і діалогом уроку (A-D).', `Fast fashion brands release new collections {every few weeks|once a year|every winter|every five years}.
Cheap synthetic fabrics are made from {oil|cotton|wood|recycled paper}.
To keep prices low, factories {are under pressure to produce quickly|use expensive materials|pay their workers more|close at weekends}.
At the clothes swap, everything must be {clean and in good condition|brand new|bought last year|made of cotton}.
Tom bought his hoodie {on impulse last winter|at a clothes swap|in a second-hand shop|as a present for Lily}.
Clothes that are too damaged go to {a textile recycling point|a charity shop|landfill|Lily’s wardrobe}.`],
        ['gap', 'Встав фразу-зв’язку з уроку (можливі кілька варіантів).', `[In my opinion/In my view], fast fashion brands should pay a special tax.
They produce a lot of waste. [What is more/In addition], their workers earn very little.
[On the other hand/However], some families can’t afford expensive clothes.
[To sum up/All in all], we should all buy less and choose better.
I buy second-hand clothes [because] they are cheaper and greener.
Swaps are fun. [In addition/What is more], they help you meet new people.`],
        ['open', 'Письмо: дай розгорнуту відповідь.', `Write an opinion paragraph (100-120 words): “Teenagers should buy only second-hand clothes.” Use at least three linking phrases.
Describe a garment you own and really love. Why do you keep it?
Plan a clothes swap at your school: when, where and what are the rules? Write 3-4 sentences.`],
      ),
    ],
  },
];
