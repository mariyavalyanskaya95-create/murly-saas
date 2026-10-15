// Бібліотека, частина 2 (16.10): мультики для малюків, B2-C1, НМТ.
// Тексти, діалоги і вправи власні. Відео тільки з офіційних каналів, перевірені через oEmbed.
import { parseSection } from './exercise';
import type { Block, Plan } from './lesson';

let n = 0;
const id = () => `lm-${++n}`;
const h = (text: string): Block => ({ id: id(), type: 'heading', text });
const t = (text: string): Block => ({ id: id(), type: 'text', text });
const tip = (text: string): Block => ({ id: id(), type: 'tip', text });
const note = (text: string): Block => ({ id: id(), type: 'note', text });
const audio = (title: string, script: string): Block => ({ id: id(), type: 'audio', title, script: script.trim() });
const video = (url: string, task: string, caption?: string): Block => ({ id: id(), type: 'video', url, task, caption });
const vocab = (pairs: string): Block => ({
  id: id(), type: 'vocab',
  words: pairs.trim().split('\n').map((l) => { const [en, uk] = l.split('=').map((x) => x.trim()); return { en, uk }; }),
});
const ex = (...parts: [Parameters<typeof parseSection>[0], string, string][]): Block => ({
  id: id(), type: 'exercise', sections: parts.map(([type, instr, text]) => parseSection(type, instr, text.trim())),
});
const talk = (q: string): Block => ({ id: id(), type: 'speaking', questions: q.trim().split('\n').map((x) => x.trim()) });

export const MORE: Plan[] = [
  // ---------- МУЛЬТИКИ ДЛЯ МАЛЮКІВ ----------
  {
    id: 'lib-cartoon-puddles', title: 'Cartoon time: Muddy puddles', level: 'A1', age: 'kids', topic: 'Мультики · Погода', color: 'sky', source: 'murly',
    focus: ['Listening', 'Vocabulary', 'Speaking'],
    aims: 'Подивимось коротку серію мультика англійською\nВивчимо слова про дощ і погоду\nНавчимось казати, що ми любимо робити: I love jumping',
    blocks: [
      h('Warm-up'),
      talk(`Do you like rainy days?
What do you wear when it is raining?`),
      vocab(`rain = дощ
It’s raining. = Іде дощ.
a puddle = калюжа
muddy = брудний, у багнюці
boots = чоботи
a raincoat = дощовик
to jump = стрибати
to laugh = сміятися`),
      h('Watch the cartoon'),
      video('https://www.youtube.com/watch?v=QFdLgfy63cc', 'Подивись серію (5 хв). Порахуй, скільки разів герої стрибають у калюжу!', 'Peppa Pig: Muddy Puddles (офіційний канал)'),
      note('Перед переглядом покажи жестами: rain, jump, boots. Під час перегляду можна ставити на паузу і питати: What is the weather like? What is Peppa doing? Діти відповідають одним словом, це нормально для A1.'),
      ex(
        ['truefalse', 'True or False?', `At the start it is raining. = True
Peppa doesn’t like puddles. = False
You need boots to jump in puddles. = True`],
        ['choice', 'Обери правильне слово.', `Peppa loves jumping in {muddy|dry} puddles.
Put on your {boots|hat} before you jump!
It’s {raining|sunny}, so we can’t go out.`],
      ),
      h('I love jumping!'),
      tip('Щоб сказати, що ти любиш робити, додай -ing: **I love jumping. I love swimming. I love playing.**'),
      ex(['gap', 'Допиши -ing.', `I love [jumping] (jump) in puddles.
I love [playing] (play) with my friends.
I love [reading] (read) books.`]),
      talk(`What do you love doing on a rainy day?
What do you love doing on a sunny day?`),
    ],
  },
  {
    id: 'lib-cartoon-balloon', title: 'Cartoon time: Don’t let it touch the floor!', level: 'A2', age: 'kids', topic: 'Мультики · Ігри', color: 'mustard', source: 'murly',
    focus: ['Listening', 'Grammar', 'Speaking'],
    aims: 'Подивимось серію мультика про гру з повітряною кулькою\nВивчимо наказовий спосіб: Catch it! Don’t drop it!\nПридумаємо правила своєї гри',
    blocks: [
      h('Warm-up'),
      talk(`What games do you play at home?
Have you ever played with a balloon?`),
      vocab(`a balloon = повітряна кулька
to hit = вдарити
to catch = зловити
to drop = упустити
the floor = підлога
careful = обережний
to win = перемогти
the last one = останній`),
      h('Watch the cartoon'),
      video('https://www.youtube.com/watch?v=xWyjy7SyirA', 'Подивись серію (7 хв). Яке головне правило гри? Що не можна робити з кулькою?', 'Bluey: Keepy Uppy (офіційний канал Disney Jr.)'),
      note('Головне правило гри: кулька не повинна торкнутися підлоги. Попроси дітей повторювати фрази з мультика разом з героями. Можна пограти в keepy uppy справжньою кулькою на уроці або в Zoom «уявною» кулькою.'),
      ex(['truefalse', 'True or False?', `In the game the balloon must not touch the floor. = True
The children play the game with a ball. = False
The family plays the game together. = True`]),
      h('Catch it! Don’t drop it!'),
      tip('Коли кажемо комусь, що робити, починаємо з дієслова: **Catch it! Hit it!** А коли не робити, то **Don’t**: **Don’t drop it! Don’t run!**'),
      ex(
        ['choice', 'Обери правильний варіант.', `{Catch|Catches} the balloon!
{Don’t|Not} drop it!
Be {careful|carefully}!`],
        ['gap', 'Встав слово: catch, hit, don’t.', `[Don’t] let the balloon touch the floor.
[Hit] the balloon up high!
[Catch] it before it falls!`],
      ),
      talk(`Invent a game! Tell your teacher three rules: Do… / Don’t…
Who usually wins games in your family?`),
    ],
  },
  {
    id: 'lib-cartoon-farm', title: 'Cartoon time: What are the sheep doing?', level: 'A2', age: 'kids', topic: 'Мультики · Ферма', color: 'lime', source: 'murly',
    focus: ['Grammar', 'Speaking'],
    aims: 'Подивимось мультик без слів і самі розкажемо, що відбувається\nПотренуємо Present Continuous: The sheep are running\nВивчимо слова про ферму',
    blocks: [
      h('On the farm'),
      vocab(`a sheep (two sheep) = вівця (дві вівці)
a farmer = фермер
a dog = собака
a pig = свиня
a field = поле
to run = бігти
to hide = ховатися
to climb = лізти`),
      tip('У множині sheep не змінюється: one sheep, ten sheep. Без -s!'),
      h('Watch and describe'),
      video('https://www.youtube.com/watch?v=KtIa3HsLxng', 'У цьому мультику ніхто не говорить, тож говорити будеш ти! Дивимось першу серію (близько 7 хв).', 'Shaun the Sheep (офіційний канал)'),
      note('У відео підбірка з 10 серій, на урок досить першої. Став на паузу кожні 30-60 секунд і питай: What is the farmer doing? What are the sheep doing? Where is the dog? Учень відповідає реченням у Present Continuous. Слова, яких бракує, записуй у словник учня.'),
      tip('Що відбувається зараз: **am / is / are + дієслово з -ing**. The dog **is running**. The sheep **are hiding**.'),
      ex(
        ['gap', 'Розкрий дужки (Present Continuous).', `The farmer [is sleeping] (sleep).
The sheep [are playing] (play) in the field.
The dog [is running] (run) after the sheep.
I [am watching] (watch) a cartoon.`],
        ['choice', 'Обери правильний варіант.', `Look! The pig {is eating|eat|eats} an apple.
The sheep {are|is} hiding behind the tree.`],
      ),
      ex(['voice', 'Speaking: постав відео на паузу і запиши, що відбувається.', `Describe one moment from the cartoon. Say three sentences: The farmer is… The sheep are… The dog is…`]),
      talk(`What is your favourite animal from the cartoon? Why?
What are you doing right now?`),
    ],
  },

  // ---------- B2-C1 ----------
  {
    id: 'lib-fast-fashion', title: 'The true cost of fast fashion', level: 'B2', age: 'teens', topic: 'Екологія · Мода', color: 'tomato', source: 'murly',
    focus: ['Reading', 'Vocabulary', 'Speaking'],
    aims: 'Прочитаємо статтю про швидку моду і зробимо висновки\nВивчимо лексику про споживання і екологію\nНавчимось аргументувати свою позицію',
    blocks: [
      h('Lead-in'),
      talk(`How many clothes did you buy last month? How many of them do you actually wear?
Where do your old clothes go?`),
      vocab(`fast fashion = швидка мода
a garment = предмет одягу
disposable = одноразовий
landfill = звалище
to be worn = бути вдягненим
second-hand = вживаний, секонд-хенд
a trend = тренд
to make do with = обходитися (тим, що є)
an impulse buy = імпульсивна покупка
sustainable = сталий, екологічний`),
      h('Read'),
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
        ['choice', 'Choose the best answer.', `The main idea of the text is that {cheap clothes have hidden costs|fashion is too expensive|cotton is better than synthetic fabrics}.
According to the text, the most effective step is {buying less|recycling more|choosing synthetic fabrics}.`],
      ),
      h('Vocabulary'),
      ex(['match', 'Match the words with their meanings.', `disposable = made to be used for a short time and then thrown away
landfill = a place where rubbish is buried
an impulse buy = something you buy without planning
sustainable = not harmful to the environment in the long term`]),
      ex(['gap', 'Complete with the words from the lesson.', `I try to buy [second-hand] clothes, they are cheaper and better for the planet.
That jacket was an [impulse buy/impulse purchase]. I never wear it.
We can [make do with] what we have instead of buying more.`]),
      h('Your opinion'),
      tip('Як аргументувати: **I’d argue that… / The main reason is… / On the other hand… / That’s why I believe…**'),
      ex(['scale', 'How much do you agree?', `Cheap clothes are a problem for the planet.
I could stop buying new clothes for a year.
Schools should teach students how to repair clothes.`]),
      ex(['open', 'Writing: 100-120 words.', 'Write an opinion paragraph: "Should fast fashion brands pay a special tax?" Give two arguments and a conclusion.']),
    ],
  },
  {
    id: 'lib-remote-work', title: 'Working from home: freedom or trap?', level: 'B2', age: 'adults', topic: 'Робота', color: 'sky', source: 'murly',
    focus: ['Listening', 'Speaking', 'Vocabulary'],
    aims: 'Послухаємо дискусію двох колег про віддалену роботу\nВивчимо фрази для обговорення переваг і недоліків\nПотренуємо висловлювання з аргументами',
    blocks: [
      h('Lead-in'),
      talk(`Do you work (or study) from home? How often?
What is the hardest thing about working from home?`),
      vocab(`to commute = їздити на роботу
a commute = дорога на роботу
flexible hours = гнучкий графік
to be distracted = відволікатися
isolated = ізольований, самотній
to switch off = відключитися (від роботи)
a work-life balance = баланс роботи й життя
productivity = продуктивність
face-to-face = наживо, особисто`),
      h('Listen'),
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
Daniel: That sounds like the best of both worlds.`),
      ex(
        ['truefalse', 'True or False?', `Daniel saves about two hours a day by working from home. = True
Kate felt lonely when she worked from home. = True
Daniel works until ten at night. = False
Both of them think a mix of office and home could work. = True`],
        ['sort', 'Advantages or disadvantages of working from home?', `Advantages: no commute; flexible hours; fewer interruptions
Disadvantages: feeling isolated; difficulty switching off; getting distracted`],
      ),
      h('Useful language'),
      tip('Обговорюємо плюси й мінуси: **The main benefit is… / The downside is… / It depends on… / The best of both worlds.** Перевага: **I’d rather + дієслово** (I’d rather stay at home).'),
      ex(['gap', 'Complete the sentences.', `I’d [rather] work from home than spend two hours on the train.
The main [downside/disadvantage] is that I feel isolated.
A mix of office and home is the best of both [worlds].`]),
      ex(['voice', 'Speaking: record a 1-minute answer.', `Would you rather work from home or in an office? Give at least two reasons and mention one downside.`]),
      talk(`Which jobs can never be done from home?
Will offices still exist in twenty years? Why or why not?`),
    ],
  },
  {
    id: 'lib-ai-creativity', title: 'Can a machine be creative?', level: 'C1', age: 'adults', topic: 'Технології · Мистецтво', color: 'lime', source: 'murly',
    focus: ['Reading', 'Vocabulary', 'Speaking'],
    aims: 'Прочитаємо есе про штучний інтелект і творчість\nВивчимо лексику рівня C1 для дискусій\nПотренуємо обережні формулювання (hedging) і контраргументи',
    blocks: [
      h('Lead-in'),
      talk(`What does it mean to be creative?
Have you ever used AI to write, draw or make music? How did you feel about the result?`),
      vocab(`to generate = створювати, генерувати
original = оригінальний
to imitate = наслідувати
intent = намір
to blur the line = розмивати межу
to dismiss = відкидати, не сприймати всерйоз
a breakthrough = прорив
arguably = мабуть, можна стверджувати
to raise concerns = викликати занепокоєння
authorship = авторство`),
      h('Read'),
      t(`When a computer program produces a poem that moves its readers or a painting that wins a competition, it is tempting to call it creative. Yet many artists dismiss such work as clever imitation: the machine has simply learned patterns from millions of human examples and recombined them.

Supporters of AI art point out that human creativity also builds on what came before. No painter works in a vacuum; every writer has read other writers. If creativity means combining existing ideas in surprising ways, then, arguably, machines are already creative.

Critics, however, focus on intent. A human artist chooses to express something: grief, joy, anger, a memory. A program has no experiences to express and no reason to create other than the instruction it was given. From this perspective, the creativity belongs to the person who wrote the prompt, selected the best result and decided what it meant.

The debate also raises practical concerns. Who owns a picture generated by AI? Should illustrators be paid when their work is used to train a model? And if anyone can produce a professional-looking image in seconds, what happens to the value of human skill?

Perhaps the most honest answer is that AI is blurring the line between tool and creator. A camera did not end painting; it changed it. Whether AI turns out to be a breakthrough for artists or a threat to them may depend less on the technology itself than on the rules we choose to build around it.`),
      ex(
        ['choice', 'Choose the best answer.', `Critics say AI art is mainly {imitation|original thinking|a new kind of painting}.
For critics, the key difference between humans and machines is {intent|speed|skill}.
The comparison with the camera suggests that new technology {changes art rather than ending it|always destroys old art forms|is not important for artists}.`],
        ['truefalse', 'True or False?', `The writer says that human artists never copy anyone. = False
Supporters think creativity can mean combining existing ideas in new ways. = True
The text raises the question of who owns AI-generated images. = True`],
      ),
      h('Vocabulary in context'),
      ex(['match', 'Match the phrases with their meanings.', `to blur the line between = to make the difference between two things less clear
to dismiss something = to decide it is not worth considering
arguably = it can be said, though not everyone agrees
to raise concerns = to make people worried about something`]),
      tip('Hedging, тобто обережні формулювання, звучать переконливіше в дискусії: **It could be argued that… / To some extent… / This may suggest that… / I’m not entirely convinced that…**'),
      ex(['gap', 'Rewrite more cautiously. Complete the gaps.', `AI is creative. → It could be [argued] that AI is creative.
This is true. → To some [extent], this is true.
I don’t believe it. → I’m not entirely [convinced].`]),
      h('Debate'),
      ex(['scale', 'Where do you stand?', `AI-generated art should be allowed in art competitions.
Artists should be paid if their work is used to train AI.
In ten years, most illustrations will be made by AI.`]),
      talk(`Is the person who writes the prompt an artist? Defend your view.
Which creative jobs are most at risk, and which are safe? Why?
Would you read a novel if you knew it was written by AI?`),
      ex(['open', 'Writing: 150-180 words.', 'Write an essay paragraph: "Creativity is a uniquely human ability." Present one argument for, one against, and your conclusion. Use at least two hedging phrases.']),
    ],
  },
  {
    id: 'lib-idioms-c1', title: 'Speak like a native: work idioms', level: 'C1', age: 'adults', topic: 'Ідіоми · Робота', color: 'mustard', source: 'murly',
    focus: ['Vocabulary', 'Speaking'],
    aims: 'Вивчимо 10 поширених ідіом про роботу\nНавчимось вживати їх у природному контексті\nПотренуємо їх у розмові',
    blocks: [
      h('Warm-up'),
      talk(`Do you use idioms in your own language? Give an example.
Why do you think idioms are hard to learn?`),
      vocab(`to cut corners = халтурити, економити на якості
to call it a day = закінчити на сьогодні
to be on the same page = однаково розуміти ситуацію
to think outside the box = мислити нестандартно
the ball is in your court = тепер твій хід
to get the ball rolling = почати, запустити процес
to pull your weight = робити свою частину роботи
back to the drawing board = почати все спочатку
a steep learning curve = швидке і складне навчання
to go the extra mile = зробити більше, ніж треба`),
      h('Idioms in context'),
      audio('A team meeting', `
Manager: Right, let’s get the ball rolling. The client didn’t like our first design.
Olena: So it’s back to the drawing board?
Manager: I’m afraid so. And this time we can’t cut corners. They noticed the small mistakes.
Mark: To be fair, the deadline was crazy. Some of us really went the extra mile.
Manager: I know, and I appreciate it. But we need everyone to pull their weight this time.
Olena: Can we try something completely different? Let’s think outside the box.
Manager: Great. Send me your ideas by Friday, then the ball is in their court.
Mark: Sounds good. Are we all on the same page?
Manager: I think so. It’s six o’clock, let’s call it a day.`),
      ex(['match', 'Match the idioms with their meanings.', `to cut corners = to do something badly to save time or money
to pull your weight = to do your fair share of work
back to the drawing board = to start again after a failure
to go the extra mile = to do more than is expected`]),
      ex(['choice', 'Choose the right idiom.', `I’m exhausted. Let’s {call it a day|get the ball rolling}.
We sent our offer. Now the ball is in {their court|their box}.
My first month in the new job was a steep learning {curve|line}.
Before we start, let’s make sure we’re all on the same {page|book}.`]),
      tip('Не перевантажуй мову ідіомами: одна-дві за розмову звучать природно, п’ять поспіль звучать як підручник.'),
      ex(['voice', 'Speaking: record a short story (1 minute).', `Tell a story about a project at work or school that went wrong. Use at least three idioms from the lesson.`]),
      talk(`Have you ever had to go back to the drawing board? What happened?
Is it ever OK to cut corners?
Who in your life always goes the extra mile?`),
    ],
  },

  // ---------- НМТ ----------
  {
    id: 'lib-nmt-cloze', title: 'НМТ: Use of English (тест-формат)', level: 'B1', age: 'teens', topic: 'НМТ', color: 'tomato', source: 'murly',
    focus: ['НМТ', 'Grammar', 'Vocabulary'],
    aims: 'Потренуємо завдання як на НМТ: текст з пропусками і варіантами A-D\nПовторимо часи, прийменники і словосполучення\nРозберемо типові пастки',
    blocks: [
      h('Як виконувати'),
      tip('Спершу прочитай увесь текст, не дивлячись на варіанти. Потім для кожного пропуску подумай: потрібне слово за значенням, граматикою чи це стійке словосполучення? Перевір, чи слово підходить і до того, що до пропуску, і до того, що після.'),
      note('Формат схожий на завдання НМТ, але текст наш власний. Після виконання розберіть кожну помилку: чому інші варіанти не підходять. Типові пастки тут: make/do, for/since, say/tell, interested in.'),
      h('Text 1: A new hobby'),
      ex(['choice', 'Choose the correct option for each gap.', `Last year my friend Max decided to {take up|take off|take after|take over} photography.
He had always been interested {in|on|at|about} taking pictures, but he never had a good camera.
His parents gave him one {for|since|during|while} his birthday.
At first he {made|did|got|had} a lot of mistakes.
But he practised every day, and soon his photos {became|become|have become|becoming} really good.
Now he has been taking photos {for|since|from|during} more than a year.
Last month he {won|wins|has won|was winning} a local competition.
He {told|said|spoke|talked} me that he wants to study photography at university.`]),
      h('Text 2: Volunteering'),
      ex(['choice', 'Choose the correct option for each gap.', `More and more teenagers {spend|pass|waste|take} their free time volunteering.
They help in animal shelters, clean parks or {look|watch|see|care} after elderly people.
Volunteering is a great way to {make|do|have|get} new friends.
It also helps you {develop|grow|rise|raise} useful skills.
Many universities pay attention {to|for|on|at} volunteering experience.
If you {want|will want|wanted|would want} to try, start with a small local project.`]),
      h('Перевір себе'),
      ex(['gap', 'Встав одне слово.', `I have known her [since] 2020.
Can you [tell] me the way to the station?
She is very good [at] maths.
Don’t forget to [do] your homework!`]),
    ],
  },
  {
    id: 'lib-nmt-headings', title: 'НМТ Reading: заголовки до абзаців', level: 'B1', age: 'teens', topic: 'НМТ · Reading', color: 'sky', source: 'murly',
    focus: ['НМТ', 'Reading'],
    aims: 'Потренуємо завдання НМТ «підбери заголовок до абзацу»\nНавчимось шукати головну думку, а не окремі слова\nРозберемо, чому зайві заголовки не підходять',
    blocks: [
      h('Стратегія'),
      tip('Прочитай абзац і сформулюй його головну думку своїми словами. Лише потім шукай заголовок. Пастка: заголовок з тим самим словом, що й у тексті, часто неправильний. Головне не слова, а зміст.'),
      h('Read: Sleep and teenagers'),
      t(`**A.** Many parents complain that their teenage children stay up late and cannot get out of bed in the morning. Scientists say this is not just laziness. During adolescence, the body starts producing the sleep hormone later in the evening, so teenagers naturally feel sleepy later.

**B.** Unfortunately, school still starts early. As a result, many students sleep only six or seven hours, while experts recommend eight to ten. Tired students find it harder to concentrate, remember new information and control their emotions.

**C.** Some schools have tried a later start. In several studies, when lessons began an hour later, students slept longer, were late less often and even got better grades.

**D.** Phones make the problem worse. The bright screen tells the brain that it is still daytime, and endless videos and messages keep us awake. Doctors advise putting the phone away at least an hour before going to bed.`),
      ex(['match', 'Match the paragraphs (A-D) with the headings.', `Paragraph A = It’s biology, not laziness
Paragraph B = Not enough rest for learning
Paragraph C = An experiment that worked
Paragraph D = A screen that steals your sleep`]),
      note('У справжньому НМТ є зайві заголовки. Тут на дошці можна дописати два зайві варіанти, наприклад «Teenagers who sleep too much» і «Why adults need less sleep», і обговорити, чому вони не підходять.'),
      ex(['truefalse', 'True or False?', `Teenagers feel sleepy later because of a hormone. = True
Experts recommend six hours of sleep for teenagers. = False
A later school start helped students in some studies. = True`]),
      ex(['gap', 'Find the words in the text.', `the period when a child becomes an adult (paragraph A): [adolescence]
to give all your attention to something (paragraph B): [concentrate]
suggest what someone should do (paragraph D): [advise]`]),
      talk(`What time do you go to bed on school days?
Should schools start later? Why or why not?`),
    ],
  },
  {
    id: 'lib-nmt-letter', title: 'НМТ Writing: лист другові', level: 'B1', age: 'teens', topic: 'НМТ · Writing', color: 'mustard', source: 'murly',
    focus: ['НМТ', 'Writing'],
    aims: 'Розберемо структуру неформального листа\nВивчимо фрази для початку і кінця листа\nНапишемо лист 50+ слів за трьома пунктами завдання',
    blocks: [
      h('Структура листа'),
      tip('Неформальний лист: **Dear / Hi + ім’я,** → вступ (подякуй або спитай, як справи) → три пункти завдання, кожен окремим абзацом → завершення → **Best wishes / Love / Take care,** + твоє ім’я. Обов’язково розкрий усі пункти завдання, за кожен пропущений знімають бали.'),
      note('На НМТ лист оцінюють за змістом (усі пункти), структурою, лексикою і граматикою. Перевірте кількість слів: треба не менше 50. Звертання і підпис теж рахуються.'),
      h('Model letter'),
      t(`**Task:** Your English friend Sam is coming to Ukraine for a week in summer. Write him a letter. Tell him: what the weather is like in summer; what places you can visit together; what he should bring.

Hi Sam,

Thanks for your letter! I’m so happy you are coming to visit me in July.

The weather in summer is usually hot and sunny, about 28 degrees, but sometimes it rains in the evening.

We can visit the old town, go to the river and try real Ukrainian borshch in my favourite café. I’m sure you’ll love it!

Don’t forget to bring sunglasses, a hat and comfortable shoes, because we will walk a lot.

Can’t wait to see you!
Best wishes,
Ira`),
      ex(['sort', 'Which phrases open a letter and which close it?', `Opening: Thanks for your letter!; It was great to hear from you.; How are you doing?
Closing: Can’t wait to see you!; Write back soon.; Say hello to your family.`]),
      ex(['choice', 'Choose the best phrase.', `{Dear|Hello dear|To} Sam,
You {should|must to|should to} bring a warm jacket.
{Best wishes|Best wish|With wishes},`]),
      ex(['open', 'Your turn: 50-70 words.', `Your friend Alex wants to learn Ukrainian cooking. Write him a letter. Tell him: what your favourite Ukrainian dish is; how to cook it (2-3 steps); when he can come and cook it with you.`]),
    ],
  },
];
