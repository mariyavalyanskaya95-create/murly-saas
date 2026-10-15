// Пакет 3: розширені 60-хвилинні уроки для підлітків (НМТ, Reading, Use of English, Writing, B2 discussion).
// Тексти, діалоги і вправи власні.
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, audio, vocab, ex, talk } = makeHelpers('b3');

export const BATCH_3: Plan[] = [
  // ---------- 1. The phone-free school ----------
  {
    id: 'lib-phone-free-school', title: 'The phone-free school', level: 'B1', age: 'teens', topic: 'Школа · НМТ Reading', color: 'mustard', source: 'murly',
    focus: ['Reading', 'Listening', 'Grammar', 'Speaking', 'Writing', 'НМТ'],
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

      h('НМТ Writing and wrap-up · 5 хв'),
      tip('Лист на НМТ: звертання (**Dear Mr Collins,**) → одне речення, навіщо пишеш → кожен пункт завдання окремим абзацом → завершення (**I hope you will consider my ideas.**) → підпис. Мінімум 50 слів, усі пункти обов’язкові.'),
      note('На уроці учень складає план листа (2 хв), а сам лист пише вдома. Домашнє завдання: написати лист 50-70 слів і вивчити слова уроку в грі. Наостанок поверніться до шкали думок з Warm-up: чи змінилася думка учня?'),
      ex(['open', 'НМТ Writing: 50-70 words.', 'Write an email to your head teacher. Say if you support a phone-free day at your school, give two reasons and suggest one rule that would make it fair for everyone.']),
    ],
  },

  // ---------- 2. НМТ Use of English: tricky pairs ----------
  {
    id: 'lib-nmt-use-of-english', title: 'НМТ Use of English: tricky pairs', level: 'B1', age: 'teens', topic: 'НМТ', color: 'tomato', source: 'murly',
    focus: ['Grammar', 'Vocabulary', 'Speaking', 'НМТ'],
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
    ],
  },

  // ---------- 3. НМТ: Use of English (тест-формат) ----------
  {
    id: 'lib-nmt-cloze', title: 'НМТ: Use of English (тест-формат)', level: 'B1', age: 'teens', topic: 'НМТ', color: 'tomato', source: 'murly',
    focus: ['НМТ', 'Grammar', 'Vocabulary', 'Listening'],
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
    ],
  },

  // ---------- 4. НМТ Reading: заголовки до абзаців ----------
  {
    id: 'lib-nmt-headings', title: 'НМТ Reading: заголовки до абзаців', level: 'B1', age: 'teens', topic: 'НМТ · Reading', color: 'sky', source: 'murly',
    focus: ['НМТ', 'Reading', 'Vocabulary', 'Speaking'],
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
    ],
  },

  // ---------- 5. НМТ Writing: лист другові ----------
  {
    id: 'lib-nmt-letter', title: 'НМТ Writing: лист другові', level: 'B1', age: 'teens', topic: 'НМТ · Writing', color: 'mustard', source: 'murly',
    focus: ['НМТ', 'Writing', 'Vocabulary', 'Listening'],
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
    ],
  },

  // ---------- 6. The true cost of fast fashion ----------
  {
    id: 'lib-fast-fashion', title: 'The true cost of fast fashion', level: 'B2', age: 'teens', topic: 'Екологія · Мода', color: 'tomato', source: 'murly',
    focus: ['Reading', 'Listening', 'Vocabulary', 'Speaking', 'Writing', 'НМТ'],
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
    ],
  },
];
