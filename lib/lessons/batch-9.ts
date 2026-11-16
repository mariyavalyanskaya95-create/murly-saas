// Бібліотека, пакет 9: розмовні уроки (власні тексти, ідеї структури з планів Марії).
// 1) Small favours, big difference: доброта + Past Perfect, B1, для пари учнів.
// 2) My style, my friends: пробний урок A1 для дівчинки 12 років, перевірка to be.
import type { Block, Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t, tip, note, video, vocab, ex, talk, meme, game } = makeHelpers('b9');
const img = (n: number, url: string, caption: string): Block => ({ id: `b9-img-${n}`, type: 'image', url, caption });

export const BATCH_9: Plan[] = [
  // ---------- SMALL FAVOURS + PAST PERFECT ----------
  {
    id: 'lib-small-favours', title: 'Small favours, big difference', level: 'B1', age: 'adults', topic: 'Доброта й маленькі послуги + Past Perfect', color: 'pink', source: 'murly',
    focus: ['Speaking', 'Vocabulary', 'Grammar', 'Reading', 'Listening'],
    aims: 'Говоримо про маленькі послуги й доброту в повсякденному житті\nВивчаємо вирази: do someone a favour, help out, give someone a hand, pay it forward\nВживаємо Past Perfect, щоб розповісти, що сталося раніше\nПропонуємо допомогу і ввічливо відповідаємо на пропозиції',
    duration: 75,
    blocks: [
      t('**Інтерактивний урок на одній сторінці з пультом учителя:** https://murly.com.ua/game-lessons/small-favours.html'),
      h('Warm-up: ten minutes, two favours · 7 хв'),
      t(`You have only **ten free minutes**. Six people need help. Choose **two** people you would help and explain why.

1. Your elderly neighbour is carrying four heavy shopping bags up the stairs.
2. A classmate missed yesterday’s lesson and doesn’t understand the homework.
3. A tourist at the station can’t read the timetable and looks lost.
4. Your friend has a job interview tomorrow and is very nervous.
5. Your little cousin can’t find their favourite toy and is crying.
6. A colleague’s laptop has just died ten minutes before a presentation.`),
      talk(`Who did you choose? Why?
Who would be the easiest to help? Who would be the hardest?
Which person would you probably ignore in real life? Be honest!`),
      note('Учні обговорюють у парі (Аня + Міша), потім кожен коротко пояснює свій вибір. Слухай, чи кажуть «I would help… because…». Не виправляй, лише записуй помилки на потім.'),

      h('Quote and discussion · 6 хв'),
      t('> “No act of kindness, no matter how small, is ever wasted.”  \n> Aesop'),
      talk(`What does the quote mean in your own words?
What small favours do you often do for other people?
When was the last time somebody did you a favour?
Should you expect something back when you help someone?
Is it easier to help a stranger or a friend? Why?`),

      h('Vocabulary: small actions, big results · 10 хв'),
      vocab(`do someone a favour = зробити комусь послугу
help (someone) out = допомогти, виручити
give someone a hand = допомогти (руками, з чимось)
make someone’s day = дуже потішити когось
cheer someone up = підбадьорити
look after = доглядати, наглядати
keep an eye on = приглянути за
lend someone something = позичити комусь
return the favour = віддячити тим самим
pay it forward = зробити добро іншому у відповідь на добро
give advice = дати пораду
give feedback = дати відгук`),
      ex(
        ['match', 'Match the phrases with the meanings.', `make someone’s day = make someone very happy
cheer someone up = help a sad person feel better
keep an eye on = watch something so it is safe
return the favour = help someone who helped you before
pay it forward = help a new person after someone helped you
give someone a hand = help someone with a physical job`],
        ['choice', 'Choose the correct word.', `Could you {do|make} me a favour?
Your message really {made|did} my day!
Can you {give|lend} me a hand with these boxes?
Thanks for helping me. I’ll {return|turn} the favour.
She always {gives|says} good advice.
Could you keep an {eye|ear} on my bag for a minute?`],
      ),
      game('Phrase quiz', 'Choose the right phrase.', `help a sad person feel better = cheer someone up
watch something so it stays safe = keep an eye on
help someone with a heavy job = give someone a hand
make someone very happy = make someone’s day
help someone who helped you = return the favour
do something good for a new person = pay it forward`),

      h('Video: the kindness chain · 8 хв'),
      video('https://www.youtube.com/watch?v=nwAYpLVyeFU', 'Watch the video. There are no words, only music. Write down the chain: who helped whom? How many favours can you count?', 'Life Vest Inside: Kindness Boomerang'),
      talk(`How many acts of kindness did you count?
Which one was your favourite? Why?
How did the story end? Why is it called a “boomerang”?
Could this chain happen in your town? Why / why not?`),
      note('Відео без слів, тому воно ідеальне для переказу. Після перегляду попроси переказати ланцюжок, і саме тут природно з’являється Past Perfect: «The woman was happy because the man had helped her.»'),

      h('Grammar: Past Perfect · 12 хв'),
      tip(`**Past Perfect = had + V3 (done, helped, gone)**

Ми розповідаємо історію в минулому (Past Simple), але хочемо сказати, що **щось сталося ще раніше**.

**When I got to the station, the train had already left.** Спочатку поїхав потяг, потім прийшов я.

+ I had (I’d) helped. − I hadn’t helped. ? Had you helped?
Слова-підказки: already, just, before, after, by the time, never… before.

Асоціація: Past Perfect це **кнопка «перемотати назад»** в історії. Поки всі в минулому, had + V3 перемотує ще на крок назад.`),
      ex(
        ['choice', 'Choose the correct form.', `When we arrived, the film {had started|started} already.
She was tired because she {had worked|has worked} all day.
I {had never seen|never see} such a kind person before.
By the time the doctor came, the man {had felt|feels} better.
He thanked the boy who {had helped|has helped} him.`],
        ['gap', 'Put the verbs into the Past Perfect.', `The old man smiled. Somebody [had carried] (carry) his bags.
I couldn’t pay because I [had lost] (lose) my wallet.
When I got home, my sister [had cooked] (cook) dinner for everyone.
She felt better after her friend [had cheered] (cheer) her up.
We didn’t need help because we [had finished/’d finished] (finish) the job.`],
        ['gap', 'Join the sentences with because. Use the Past Perfect.', `I was happy. My friend helped me. → [I was happy because my friend had helped me.]
She was hungry. She didn’t eat breakfast. → [She was hungry because she hadn’t eaten breakfast./She was hungry because she had not eaten breakfast.]
He was late. He missed the bus. → [He was late because he had missed the bus.]`],
      ),
      meme('st-cat-shock', 'When the bus had left', 'just before I got there', 'Коли автобус уже поїхав (Past Perfect), а я прийшов (Past Simple)'),

      h('Reading: The coffee that came back · 10 хв'),
      t(`**The coffee that came back**

Last winter Mia was having a terrible morning. She had overslept, she had spilt tea on her favourite jumper, and when she got to the café near her office, she realised she had left her wallet at home.

“It’s OK,” said the man behind her in the queue. “I’ll get this one.” Before Mia could say anything, he had already paid for her coffee and walked out.

Mia felt embarrassed, but also warm inside. Nobody had done anything like that for her before. So the next Friday she paid for the coffee of a student who was counting coins at the till. The student told the barista, and the barista started a “coffee wall”: people could pay for an extra coffee and leave a note for someone who needed it.

A month later Mia came back to the café. The wall was full of notes. One of them said: *“A stranger had paid for my coffee on the worst day of my year. Today I’m paying for yours.”* Mia smiled. She recognised the handwriting. It was from the man who had started it all.`),
      ex(
        ['truefalse', 'True or False?', `Mia’s morning started well. = False
Mia had forgotten her wallet. = True
The man asked Mia to pay him back. = False
Mia paid for a student’s coffee the next Friday. = True
The barista started the coffee wall. = True
The last note was from Mia’s friend. = False`],
      ),
      talk(`What had happened to Mia before she got to the café?
Why did Mia feel “warm inside”?
Would you like a coffee wall in your town? What would you write on your note?
Have you ever paid it forward? What happened?`),

      h('Let me help: offering and answering · 8 хв'),
      tip(`**Offer help:** Would you like me to…? · Shall I…? · Let me… · I can… if you like. · Do you need a hand?
**Say yes:** That’s really kind of you. · That would be great, thanks! · You’re a star!
**Say no politely:** Thanks, but I’m fine. · That’s kind, but I can manage. · Don’t worry, it’s OK.`),
      ex(
        ['match', 'Match the offers with the answers.', `Shall I open the window? = Yes, please. It’s so hot in here!
Would you like me to check your essay? = That would be great, thanks!
Let me carry that for you. = That’s kind, but I can manage.
Do you need a hand with the boxes? = Yes, please! They’re really heavy.`],
        ['gap', 'Complete the dialogue.', `A: You look stressed. What’s wrong?
B: My laptop has frozen and I’ve got ten emails to answer.
A: [Would you like me to/Shall I] help you with the emails?
B: That [would be great/’d be great], thanks!
A: And [let me/I can] make you a coffee.
B: You’re a star. I’ll [return] the favour!`],
      ),

      h('Role-play · 8 хв'),
      t(`Work in pairs. Student A has a problem, Student B offers help. Then swap.

1. **A:** You have to move house on Saturday and nobody can help. **B:** You are free on Saturday.
2. **A:** You have a speaking exam tomorrow and you are very nervous. **B:** You passed the same exam last year.
3. **A:** You are going on holiday and you have a cat. **B:** You live next door.
4. **A:** Your phone is dead and you are lost in a new city. **B:** You know the city well.`),
      note('Аня і Міша в парі: кожен по 2 ситуації в ролі A і B. Вимагай мінімум 2 фрази з блоку «Let me help». Після кожної сценки одне питання в Past Perfect: «What had happened before you asked for help?»'),

      h('Speaking: your kindness story · 5 хв'),
      talk(`Tell a story about a time somebody helped you. What had happened before? How did you feel?
Tell a story about a time you helped someone. Had you planned it, or was it a surprise?
What is the kindest thing a stranger has ever done for you?`),

      h('Homework: the 7-day favour challenge'),
      t(`1. Do **one small favour every day** for 7 days. Keep a short diary.
2. At the end, write **80-100 words**: What did you do? How did people react? Use at least **three Past Perfect** sentences (e.g. *She was surprised because nobody had helped her before.*).
3. Learn the 12 phrases from the vocabulary list.`),
      note('Домашку можна задати кнопкою «Задати учню». Наступного уроку почни з того, хто що встиг зробити за тиждень.'),
    ],
  },

  // ---------- TRIAL A1: MY STYLE, MY FRIENDS (TO BE CHECK) ----------
  {
    id: 'lib-trial-my-style', title: 'My style, my friends: a first lesson', level: 'A1', age: 'teens', topic: 'Пробний урок: стиль, косметика, друзі + to be', color: 'pink', source: 'murly',
    focus: ['Vocabulary', 'Grammar', 'Reading', 'Speaking'],
    aims: 'Знайомимося й говоримо про улюблені речі: одяг, косметику, друзів\nВчимо 14 слів про стиль і соцмережі\nПеревіряємо, як учениця знає to be (am, is, are)\nЧитаємо короткий профіль і пишемо свій',
    duration: 45,
    blocks: [
      t('**Інтерактивний урок на одній сторінці з пультом учителя:** https://murly.com.ua/game-lessons/trial-my-style.html'),
      h('Hello! This or that? · 5 хв'),
      t('Choose **one**. Say: *I like… because it’s…*'),
      t(`pink **or** black?
hoodie **or** dress?
sneakers **or** boots?
lip gloss **or** lipstick?
TikTok **or** YouTube?
cats **or** dogs?
pizza **or** sushi?`),
      note('Пробний урок, 12 років, рівень приблизно A1. Перші 5 хвилин просто знайомство й гра «This or that». Хвали за будь-яку відповідь. Слухай: чи будує речення сама, чи відповідає одним словом.'),

      h('Words: my style · 8 хв'),
      img(1, 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=900&q=70&auto=format&fit=crop', 'lip gloss · blush · brush (Photo: Unsplash)'),
      img(2, 'https://images.unsplash.com/photo-1603217040208-56131869e0e9?w=900&q=70&auto=format&fit=crop', 'crop top · jeans · sunglasses (Photo: Unsplash)'),
      vocab(`lip gloss = блиск для губ
mascara = туш для вій
nail polish = лак для нігтів
blush = рум’яна
mirror = дзеркало
hair clip = заколка
headband = обідок
earrings = сережки
hoodie = худі
flared jeans = джинси кльош
sneakers = кросівки
selfie = селфі
post = допис, пост
best friend = найкраща подруга`),
      game('Style words', 'Match the word and the translation.', `lip gloss = блиск для губ
mascara = туш для вій
nail polish = лак для нігтів
headband = обідок
earrings = сережки
hoodie = худі
sneakers = кросівки
best friend = найкраща подруга`),

      h('Grammar check: am, is, are · 10 хв'),
      tip(`**I am** (I’m) · **he / she / it is** (she’s) · **you / we / they are** (they’re)
Ні: I’m not · she isn’t · they aren’t
Питання: Are you…? · Is she…? · Are they…?

Асоціація: родина кульок BE. **Am** дружить тільки з **I**, **is** з **he, she, it**, а **are** з усіма іншими.`),
      ex(
        ['choice', 'Choose am, is or are.', `I {am|is|are} twelve.
My best friend {is|am|are} funny.
My sneakers {are|is|am} white.
We {are|is|am} in the same class.
This lip gloss {is|are|am} pink.
You {are|is|am} really cool!`],
        ['gap', 'Make it negative.', `I’m tired. → [I’m not tired/I am not tired].
She’s at home. → [She isn’t at home/She is not at home/She’s not at home].
They’re expensive. → [They aren’t expensive/They are not expensive/They’re not expensive].`],
        ['choice', 'Choose the correct question.', `{Are you twelve?|You are twelve?|Is you twelve?}
{Is your hoodie new?|Your hoodie is new?|Are your hoodie new?}
{Where is your phone?|Where your phone is?|Where are your phone?}`],
      ),
      note('Це діагностика. Порахуй помилки: 0-2 це to be вже знає, далі можна брати Present Simple; 3-5 повторити юніти 1-2 книги граматики (/grammar-book/beginner/am-is-are); більше 5 почати з to be й особових займенників.'),

      h('Reading: Lily’s profile · 8 хв'),
      img(3, 'https://images.unsplash.com/photo-1695753640148-0c7b3bcd3b2b?w=900&q=70&auto=format&fit=crop', 'selfie · post (Photo: Unsplash)'),
      t(`**Hi! I’m Lily!**

I’m twelve and I’m from London. My favourite colour is pink. My room is pink too!

This is my best friend Emma. She is thirteen. She is funny and kind. We are in the same class.

My favourite things are lip gloss, my white sneakers and my cat Muffin. Muffin is grey and very lazy.

I’m not good at maths, but I’m good at art. My posts are about art, cats and outfits.`),
      ex(
        ['truefalse', 'True or False?', `Lily is twelve. = True
Lily is from Manchester. = False
Emma is Lily’s sister. = False
Emma and Lily are in the same class. = True
Muffin is a grey cat. = True
Lily is good at maths. = False`],
      ),

      h('Speaking: about you · 8 хв'),
      talk(`What’s your name? How old are you?
Where are you from?
What’s your favourite colour?
Who is your best friend? What is she like?
What are your favourite things?
What is your style: sporty, cute, cool or classic?
What are your posts about? (or: What would your posts be about?)`),
      note('Підкажи рамку на дошці: I’m… / My favourite… is… / My best friend is… / She is… Записуй слова, яких не вистачає, у словник учениці після уроку.'),

      h('Mini-project: my profile · 5 хв'),
      t(`Write your own profile like Lily’s. 4-5 sentences.

*Hi! I’m … I’m … years old. My favourite colour is … My best friend is … She is … My favourite things are …*`),
      note('Наприкінці запитай, що сподобалось найбільше: слова, гра чи профіль. Це допоможе спланувати наступні уроки. Розкажи батькам, що на уроках будуть ігри, словник і бот з нагадуваннями.'),
    ],
  },
];
