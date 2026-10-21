// Бібліотека, пакет 9: розмовні уроки для дорослих і старших підлітків (B1+).
// План уроку Марії «Modern Monsters», доповнений блоком про FOMO з відео LearnFree.
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, video, vocab, ex, talk, meme, game } = makeHelpers('b9');

export const BATCH_9: Plan[] = [
  {
    id: 'lib-modern-monsters', title: 'Modern Monsters: 21st-century fears', level: 'B1', age: 'adults', topic: 'Розмова: страхи сучасності, FOMO, антиутопії', color: 'tomato', source: 'murly',
    focus: ['Speaking', 'Vocabulary', 'Listening'],
    aims: 'Говоримо про страхи нашого часу: FOMO, doomscrolling, AI, інформаційне перевантаження\nВживаємо 30+ слів B1+ про тривогу, технології й антиутопії\nОбговорюємо книжки, які «передбачили» наше життя\nСкладаємо особистий рейтинг страхів і лист собі в майбутнє',
    duration: 60,
    blocks: [
      h('Warm-up · 5 хв'),
      talk(`When you hear the word “monster”, what comes to mind first: a creature from a horror film, or something more abstract?
What is the scariest thing in a teenager’s life today? Not creatures under the bed, real fears.
What was the scariest thing in your life when you were 10? And what has replaced it now?
Is there anything modern that your grandparents would find terrifying?`),
      note('Мета: розговорити учня і вийти на тему. Якщо мовчить, розкажи про себе першою, напр. «For me, the scariest thing today is losing my phone with all my photos.» Потім запитай: «Does that resonate with you?» Підведи до думки: у кожного покоління свої монстри. Це місток до наступних етапів.'),
      meme('st-cat-shock', 'Monsters in 1995: under the bed', 'Monsters in 2026: “Seen 2 hours ago”, no reply', 'Монстри у 1995: під ліжком. Монстри у 2026: «Переглянуто 2 години тому», без відповіді'),

      h('Vocabulary · 8 хв'),
      tip(`**Слова уроку.** Не читай список підряд. Називай слово, проси учня пояснити його англійською або дати свій приклад. Якщо не знає, поясни простими англійськими словами, а не перекладом одразу.

**Must-know до обговорення:** anxiety, FOMO, doomscrolling, burnout, overwhelmed, dystopia, to predict, surveillance, cautionary tale, thought-provoking.`),
      vocab(`fear = страх
anxiety = тривога
to be anxious about = переживати через
FOMO (fear of missing out) = страх щось пропустити
to miss out on = пропустити, упустити
doomscrolling = безкінечно гортати погані новини
burnout = вигорання
to feel overwhelmed = почуватися перевантаженим
the loneliness paradox = парадокс самотності (на зв’язку з усіма, але самотній)
to feel isolated = почуватися ізольованим
information overload = інформаційне перевантаження
a deepfake = діпфейк
fake news = фейкові новини
surveillance = стеження
to erode privacy = руйнувати приватність
to replace humans = замінити людей
climate anxiety = тривога через клімат`),
      vocab(`a dystopia = антиутопія
dystopian = антиутопічний
to predict = передбачати
to come true = збутися
eerily accurate = моторошно точний
a cautionary tale = повчальна історія, застереження
thought-provoking = такий, що змушує замислитися
timeless = поза часом
to resonate with = знаходити відгук у
a plot twist = несподіваний поворот сюжету
coping strategies = способи впоратися
digital detox = цифровий детокс
to disconnect = відключитися
to set boundaries = встановлювати межі
mental health = ментальне здоров’я`),
      ex(['match', 'Match the words with their meanings.', `doomscrolling = reading bad news online for too long
burnout = being exhausted because of too much work or stress
FOMO = the fear that others are having fun without you
surveillance = watching people closely, often secretly
a cautionary tale = a story that warns you about a danger
eerily accurate = so correct that it feels strange
to disconnect = to stop using your phone and the internet for a while
information overload = too much information to deal with`]),
      game('Word race: modern fears', 'Choose a game and match each word with its meaning', `doomscrolling = reading bad news for hours
burnout = total exhaustion from stress
FOMO = fear of missing out
overwhelmed = having too much to deal with
deepfake = a fake video made by AI
digital detox = a break from screens
dystopia = a frightening imagined future
plot twist = a sudden change in a story
to resonate = to feel true or important to you
timeless = never out of date`),
      note('Якщо учень дає власний переклад або приклад, обов’язково похвали: це закріплює слово краще за десять вправ. Попроси вжити 2-3 слова в реченнях про себе: «Can you use “burnout” in a sentence about yourself?»'),

      h('FOMO: watch and discuss · 10 хв'),
      t(`**FOMO: Our relationship with social media**

You scroll through photos of friends at a concert, a new café, a beach. Suddenly your own evening feels boring. That small, sharp feeling has a name: FOMO, the fear of missing out. Watch a short video and think about how often you feel it.`),
      video('https://www.youtube.com/watch?v=q5zv9_ZgYoQ', 'Watch the video. Then answer: What is FOMO? Why does social media make it stronger? What is one thing you can do to feel it less?', 'Відео з офіційного каналу LearnFree (GCFGlobal), «FOMO: Our Relationship with Social Media».'),
      ex(['truefalse', 'True or False? Answer after watching.', `FOMO means the fear of missing out. = True
FOMO only happens to teenagers. = False
Social media shows us mostly the best moments of other people’s lives. = True
The only way to stop FOMO is to delete all your accounts. = False`]),
      note('Перший перегляд без зупинок. Потім спитай: «In your own words, what is FOMO?» Звернися до деталі: у соцмережах ми бачимо лише найкращі моменти чужого життя (highlights), а порівнюємо їх зі своїм звичайним днем. Якщо учень каже, що FOMO буває тільки в підлітків, попроси навести приклад дорослого FOMO (робота, подорожі, весілля друзів). Відповіді True/False перевіряй разом, не поспішай.'),
      talk(`Have you ever felt FOMO? What exactly were you afraid of missing?
What’s worse: missing a party, or missing a trending online conversation?
Do you check your phone right after you wake up? Why do you think so many people do?
Do people post their real life online, or only the highlights?
Have you ever turned down a plan because you were afraid of missing something better? (Some people call this FOBO, the fear of better options.)
What’s the opposite of FOMO? Some people call it JOMO, the joy of missing out. When did you last feel it?
If you could turn off one notification forever, which one would it be?
Would you survive a 48-hour digital detox? What would be the hardest part?`),
      meme('st-cat-loaf', 'Me: I’ll stay home tonight and relax', 'Also me at 11 pm, watching everyone’s stories:', 'Я: сьогодні залишуся вдома і відпочину. Теж я о 23:00, переглядаючи сторіз усіх:'),

      h('Modern fears discussion · 8 хв'),
      talk(`On a scale of 1 to 10, how worried are you about AI replacing people’s jobs? Why?
Do you ever doomscroll? What makes you stop?
Do you feel more informed, or more anxious, because of the news?
What’s a modern fear you have that your parents didn’t have at your age?
Have you ever believed a fake news story or a deepfake? How did you find out?
“Social media is destroying our generation.” Agree or disagree?
If you could delete only one app forever, which one would it be, and why?`),
      note('Прийоми, щоб розговорити: контраст («My parents didn’t have phones at your age. Do you think they were happier or less informed?»), гіпотеза (If you could...), провокація agree/disagree, де учень захищає позицію. Не виправляй дрібні помилки на льоту: веди список 3-5 типових помилок і розбери їх наприкінці.'),

      h('Fiction that predicted reality · 12 хв'),
      t(`**Writers often see the future more clearly than anyone else.** Many fears we have today appeared in novels decades before they became real.

- **George Orwell, 1984:** a government that watches everyone all the time. Today we talk about surveillance and privacy.
- **Aldous Huxley, Brave New World:** people kept happy and busy, so they stop asking questions. Today we talk about endless entertainment and algorithms.
- **Ray Bradbury, Fahrenheit 451:** people glued to screens, books forgotten. Today we talk about attention spans and doomscrolling.
- **Mary Shelley, Frankenstein:** a scientist creates something he cannot control. Today we talk about AI.
- **Black Mirror (TV series):** every episode takes one modern fear and pushes it to the extreme.`),
      talk(`Can you think of a book or film that predicted something that is now real?
Which story, in your opinion, was the most eerily accurate about the world we live in?
Would you rather live in Orwell’s 1984 or Huxley’s Brave New World? Why?
Why do you think dystopian novels have become so popular again?
Which is scarier for you: a dystopian novel or today’s news?
If you were writing a dystopian novel about 2026, what would the main “monster” be?
Can fiction change the future, or does it only predict it?`),
      note('Це ключовий блок для учнів, які люблять читати: якщо розмова йде, дай йому розтягнутися до 15-20 хв і скороти наступний етап. Книжки не треба читати на уроці, обговорюємо ідеї. Поглиблювальні питання: «Which book has stayed with you the longest? What was its message?», «Do writers have a responsibility to warn us about the future?»'),
      ex(['choice', 'Choose the correct word.', `The ending was a total {plot twist|plot turn|plot change}: nobody expected it.
The book was written in 1949, but some parts are {eerily accurate|eerily correct|scary right} today.
It’s a {cautionary tale|careful tale|warning story} about what happens when we stop thinking.
Her novels are {timeless|timeful|out of time}: they still feel modern.
The film was really {thought-provoking|thinking-provoking|thought-provoked}: we talked about it for hours.
Some of Bradbury’s ideas have {come true|become true|come real}.`]),

      h('Classic characters in 2026 · 7 хв'),
      t('Imagine famous literary characters time-travel to 2026. Would they survive? Would they love our world, or hate it?'),
      talk(`If Elizabeth Bennet (Pride and Prejudice) had Instagram, what would she post?
How would Holden Caulfield (The Catcher in the Rye) react to TikTok?
Imagine Romeo and Juliet had WhatsApp. Would their story end differently?
What would Sherlock Holmes think of deepfakes and online scams?
Which classic character would totally love our century? Which one would be absolutely miserable?
If you could add one classic character to a group chat with you and two friends, who would it be?`),
      note('Легкий ігровий блок: обери 3-4 питання. Якщо часу мало, цей етап можна прибрати і дати як warm-up наступного уроку. Попроси конкретику: «What would their first post or message be?»'),
      meme('st-cat-cool', 'Sherlock Holmes in 2026:', 'You’ve been doomscrolling since 2 am. Elementary.', 'Шерлок Голмс у 2026: Ви гортаєте погані новини з другої ночі. Елементарно.'),

      h('Fear ladder · 6 хв'),
      t(`**Make your personal top-5 of modern fears, from biggest to smallest.**

1. ______________ (my biggest fear)
2. ______________
3. ______________
4. ______________
5. ______________ (small but still real)`),
      talk(`Why is number 1 at the top? What makes it the biggest?
Would your 15-year-old self be surprised by this list?
What’s a fear everyone talks about, but you don’t really share?
How do you cope with your number 1 fear? Which coping strategies work for you?`),
      note('Цей блок часто дає дуже чесні відповіді. Не перебивай і не виправляй граматику: тут потік важливіший. Учень має право не ділитися чимось особистим, тоді хай назве «a fear many people have».'),

      h('Wrap-up: a letter to future you · 4 хв'),
      t(`**Imagine you are writing a short letter to yourself 25 years from now.** Say it out loud in 2-3 minutes:

Dear me in 2051,
Today, in 2026, people are scared of ...
I personally am most afraid of ...
I hope that by your time, ...
Remember that ...
Love, me in 2026.`),
      talk('If you had to pick the one biggest monster of the 21st century, what would it be, and how do we fight it?'),
      tip(`**Розбір помилок наприкінці (2 хв).** Типові для цієї теми:
- I’m afraid **from** spiders → I’m afraid **of** spiders
- I miss out **the** party → I miss out **on** the party
- It makes me **to feel** anxious → It makes me **feel** anxious
- I’m **boring** when I doomscroll → I’m **bored** when I doomscroll
- The news are scary → The news **is** scary (news = однина)`),
      game('Speed round: say it better', 'Choose the right word', `I’m afraid ___ AI taking my job. = of
Don’t miss out ___ this offer! = on
It makes me ___ nervous. = feel
The news ___ really depressing today. = is
I need a ___ detox. = digital
She felt ___ by all the messages. = overwhelmed
This book is a ___ tale. = cautionary
Her prediction ___ true. = came`),

      h('Homework (за бажанням)'),
      ex(['open', 'Choose one task.', `1. Write a mini essay (10-12 sentences): “The scariest book or film I’ve ever seen, and why it still matters today”.
2. Invent a short dystopian story set in 2026. Describe it in 3-5 sentences.
3. Find a news article this week that reads like fiction. Be ready to tell about it next lesson.`]),
      note('Домашка необов’язкова. Ідеї для наступних уроків цієї серії: одна антиутопія детально; клімат і майбутнє; «AI: friend or threat?» з коротким відео; ментальне здоров’я і способи впоратися зі стресом.'),
    ],
  },
];
