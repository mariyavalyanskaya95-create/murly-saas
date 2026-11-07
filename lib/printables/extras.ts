// Друковані матеріали: шпаргалка з 12 часів, 60 фразових дієслів з вправою, шаблони для письма.
import type { PrintDoc, L2 } from './types';

const L = (uk: string, ru: string): L2 => ({ uk, ru });

// ---------- 1. Шпаргалка: 12 часів ----------

type Tense = { name: string; pos: string; neg: string; q: string; when: L2; markers: string; ex: string };

const T: Tense[] = [
  {
    name: 'Present Simple', pos: 'I work / she works', neg: 'I don’t work / she doesn’t work', q: 'Do you work? / Does she work?',
    when: L('Факти, звички, розклад', 'Факты, привычки, расписание'),
    markers: 'always, usually, often, every day, on Mondays', ex: 'She usually walks to school.',
  },
  {
    name: 'Present Continuous', pos: 'I am / he is / they are working', neg: 'I am not / he isn’t working', q: 'Are you working?',
    when: L('Дія зараз; тимчасова ситуація; домовлені плани', 'Действие сейчас; временная ситуация; договоренные планы'),
    markers: 'now, at the moment, today, this week, Look!', ex: 'I am reading a great book this week.',
  },
  {
    name: 'Present Perfect', pos: 'I have / she has worked', neg: 'I haven’t / she hasn’t worked', q: 'Have you worked?',
    when: L('Результат важливий зараз; досвід; час не названо', 'Результат важен сейчас; опыт; время не названо'),
    markers: 'already, yet, just, ever, never, since, for', ex: 'I have already done my homework.',
  },
  {
    name: 'Present Perfect Continuous', pos: 'I have been working', neg: 'I haven’t been working', q: 'Have you been working?',
    when: L('Дія почалась у минулому і триває досі (наголос на тривалості)', 'Действие началось в прошлом и продолжается (акцент на длительности)'),
    markers: 'for two hours, since morning, How long...?', ex: 'We have been waiting for 20 minutes.',
  },
  {
    name: 'Past Simple', pos: 'I worked / I went', neg: 'I didn’t work / go', q: 'Did you work / go?',
    when: L('Завершена дія в минулому, час відомий', 'Завершенное действие в прошлом, время известно'),
    markers: 'yesterday, last week, ago, in 2020, when', ex: 'We visited Kyiv two years ago.',
  },
  {
    name: 'Past Continuous', pos: 'I was / they were working', neg: 'I wasn’t / they weren’t working', q: 'Were you working?',
    when: L('Дія тривала в певний момент минулого; фон для іншої дії', 'Действие длилось в определенный момент прошлого; фон для другого действия'),
    markers: 'at 5 pm yesterday, while, when', ex: 'I was cooking when you called.',
  },
  {
    name: 'Past Perfect', pos: 'I had worked', neg: 'I hadn’t worked', q: 'Had you worked?',
    when: L('Дія сталася раніше за іншу дію в минулому', 'Действие произошло раньше другого действия в прошлом'),
    markers: 'before, after, by the time, already', ex: 'The film had started before we arrived.',
  },
  {
    name: 'Past Perfect Continuous', pos: 'I had been working', neg: 'I hadn’t been working', q: 'Had you been working?',
    when: L('Дія тривала до певного моменту в минулому', 'Действие длилось до определенного момента в прошлом'),
    markers: 'for, since, before, by the time', ex: 'She was tired because she had been running.',
  },
  {
    name: 'Future Simple', pos: 'I will work', neg: 'I won’t work', q: 'Will you work?',
    when: L('Рішення в момент мовлення; прогноз; обіцянка', 'Решение в момент речи; прогноз; обещание'),
    markers: 'tomorrow, next year, I think, probably', ex: 'I think it will rain tomorrow.',
  },
  {
    name: 'Future Continuous', pos: 'I will be working', neg: 'I won’t be working', q: 'Will you be working?',
    when: L('Дія триватиме в певний момент у майбутньому', 'Действие будет длиться в определенный момент в будущем'),
    markers: 'at this time tomorrow, at 8 pm on Friday', ex: 'At 10 am tomorrow I will be writing a test.',
  },
  {
    name: 'Future Perfect', pos: 'I will have worked', neg: 'I won’t have worked', q: 'Will you have worked?',
    when: L('Дія завершиться до певного моменту в майбутньому', 'Действие завершится к определенному моменту в будущем'),
    markers: 'by Friday, by the end of, by then', ex: 'I will have finished the book by Sunday.',
  },
  {
    name: 'Future Perfect Continuous', pos: 'I will have been working', neg: 'I won’t have been working', q: 'Will you have been working?',
    when: L('Скільки часу дія триватиме до моменту в майбутньому', 'Сколько времени действие будет длиться к моменту в будущем'),
    markers: 'for ... by, by then', ex: 'By June, I will have been learning English for five years.',
  },
];

const formHead: (L2 | string)[] = [L('Час', 'Время'), '(+)', '(-)', '(?)'];
const useHead: (L2 | string)[] = [L('Час', 'Время'), L('Коли вживати', 'Когда употреблять'), L('Маркери', 'Маркеры'), L('Приклад', 'Пример')];
const formRows = (ts: Tense[]) => ts.map((t) => [t.name, t.pos, t.neg, t.q]);
const useRows = (ts: Tense[]) => ts.map((t) => [t.name, t.when, t.markers, t.ex]);

const TENSES: PrintDoc = {
  id: 'tenses-cheatsheet',
  title: L('Шпаргалка: 12 часів англійської', 'Шпаргалка: 12 времен английского'),
  subtitle: L('Формули, коли вживати, маркери, приклади і типові помилки', 'Формулы, когда употреблять, маркеры, примеры и типичные ошибки'),
  level: 'A2-B2',
  blocks: [
    { h: L('Теперішні та минулі часи: формули', 'Настоящие и прошедшие времена: формулы') },
    { table: { head: formHead, rows: formRows(T.slice(0, 8)) } },
    { h: L('Теперішні та минулі часи: коли вживати', 'Настоящие и прошедшие времена: когда употреблять') },
    { table: { head: useHead, rows: useRows(T.slice(0, 8)) } },
    {
      tip: L(
        'Simple: факт або завершена дія. Continuous (be + -ing): процес. Perfect (have + V3): результат до певного моменту. Perfect Continuous (have been + -ing): процес до певного моменту.',
        'Simple: факт или завершенное действие. Continuous (be + -ing): процесс. Perfect (have + V3): результат к определенному моменту. Perfect Continuous (have been + -ing): процесс до определенного момента.',
      ),
    },
    { pagebreak: true },
    { h: L('Майбутні часи: формули', 'Будущие времена: формулы') },
    { table: { head: formHead, rows: formRows(T.slice(8)) } },
    { h: L('Майбутні часи: коли вживати', 'Будущие времена: когда употреблять') },
    { table: { head: useHead, rows: useRows(T.slice(8)) } },
    {
      p: L(
        'Ще два способи говорити про майбутнє: be going to (план або очевидний прогноз: Look at the clouds, it is going to rain) і Present Continuous (домовленість: I am meeting Anna at six).',
        'Еще два способа говорить о будущем: be going to (план или очевидный прогноз: Look at the clouds, it is going to rain) и Present Continuous (договоренность: I am meeting Anna at six).',
      ),
    },
    { h: L('Типові помилки україномовних і російськомовних учнів', 'Типичные ошибки украино- и русскоязычных учеников') },
    {
      table: {
        head: [L('Неправильно', 'Неправильно'), L('Правильно', 'Правильно'), L('Чому', 'Почему')],
        rows: [
          ['I am agree.', 'I agree.', L('Agree це дієслово, am не потрібне', 'Agree это глагол, am не нужен')],
          ['She don’t like tea.', 'She doesn’t like tea.', L('He / she / it: doesn’t', 'He / she / it: doesn’t')],
          ['I live here since 2020.', 'I have lived here since 2020.', L('Since: дія триває досі, потрібен Perfect', 'Since: действие продолжается, нужен Perfect')],
          ['I have seen him yesterday.', 'I saw him yesterday.', L('Yesterday: час відомий, потрібен Past Simple', 'Yesterday: время известно, нужен Past Simple')],
          ['When I will finish, I will call.', 'When I finish, I will call.', L('Після when, if, after, as soon as про майбутнє: Present Simple', 'После when, if, after, as soon as о будущем: Present Simple')],
          ['Did you went there?', 'Did you go there?', L('Після did дієслово в першій формі', 'После did глагол в первой форме')],
          ['I am understanding you.', 'I understand you.', L('Understand, know, want, like зазвичай не мають Continuous', 'Understand, know, want, like обычно не бывают в Continuous')],
          ['How long do you learn English?', 'How long have you been learning English?', L('How long про дію, що триває: Present Perfect Continuous', 'How long о длящемся действии: Present Perfect Continuous')],
          ['If I would have time, I would help.', 'If I had time, I would help.', L('У частині з if немає would', 'В части с if нет would')],
          ['Yesterday I was go to the cinema.', 'Yesterday I went to the cinema.', L('Past Simple без was: went', 'Past Simple без was: went')],
        ],
      },
    },
  ],
};

// ---------- 2. 60 фразових дієслів ----------

type PV = [en: string, uk: string, ru: string, ex: string];
const PV60: PV[] = [
  ['to break down', 'зламатися (про техніку)', 'сломаться (о технике)', 'Our car broke down on the way to the lake.'],
  ['to break up', 'розійтися (про пару); закінчитися (про навчання)', 'расстаться (о паре); закончиться (об учебе)', 'School breaks up for the summer in June.'],
  ['to bring up', 'виховувати; піднімати тему', 'воспитывать; поднимать тему', 'She brought up an interesting idea at the meeting.'],
  ['to call back', 'передзвонити', 'перезвонить', 'I am busy now, can I call you back later?'],
  ['to calm down', 'заспокоїтися', 'успокоиться', 'Calm down, we still have plenty of time.'],
  ['to carry on', 'продовжувати', 'продолжать', 'Carry on reading, I will be back in a minute.'],
  ['to catch up with', 'наздогнати', 'догнать', 'Go ahead, I will catch up with you.'],
  ['to check in', 'зареєструватися (в готелі, аеропорту)', 'зарегистрироваться (в отеле, аэропорту)', 'We checked in at the hotel at three.'],
  ['to cheer up', 'підбадьорити, повеселішати', 'подбодрить, повеселеть', 'A funny video always cheers me up.'],
  ['to come across', 'випадково натрапити', 'случайно наткнуться', 'I came across an old photo of my mum.'],
  ['to come up with', 'придумати', 'придумать', 'Ira came up with a great name for our band.'],
  ['to count on', 'розраховувати на', 'рассчитывать на', 'You can count on me, I will be there.'],
  ['to cut down on', 'скоротити (споживання)', 'сократить (потребление)', 'I am trying to cut down on sugar.'],
  ['to drop out of', 'кинути (навчання, курс)', 'бросить (учебу, курс)', 'He dropped out of the course after a month.'],
  ['to eat out', 'їсти не вдома (у кафе)', 'есть не дома (в кафе)', 'We eat out once a month as a family treat.'],
  ['to end up', 'зрештою опинитися', 'в итоге оказаться', 'We got lost and ended up in a small village.'],
  ['to fall out with', 'посваритися з', 'поссориться с', 'She fell out with her best friend over a silly joke.'],
  ['to figure out', 'розібратися, зрозуміти', 'разобраться, понять', 'I cannot figure out how this game works.'],
  ['to fill in', 'заповнити (форму)', 'заполнить (форму)', 'Please fill in this form with your name and email.'],
  ['to find out', 'дізнатися', 'узнать', 'I found out that the concert was cancelled.'],
  ['to fit in', 'вписатися (в колектив)', 'вписаться (в коллектив)', 'It took me a month to fit in at my new school.'],
  ['to get back', 'повернутися', 'вернуться', 'What time did you get back home?'],
  ['to get over', 'оговтатися, пережити', 'оправиться, пережить', 'It took her a long time to get over the flu.'],
  ['to get rid of', 'позбутися', 'избавиться', 'I need to get rid of my old toys.'],
  ['to get through', 'пройти, витримати (важкий період)', 'пройти, выдержать (трудный период)', 'We got through the exam week together.'],
  ['to give back', 'повернути (річ)', 'вернуть (вещь)', 'Please give back my charger when you finish.'],
  ['to go on', 'продовжуватися; відбуватися', 'продолжаться; происходить', 'What is going on here?'],
  ['to go out', 'виходити (розважитися)', 'выходить (развлечься)', 'We usually go out on Friday evenings.'],
  ['to grow up', 'дорослішати', 'взрослеть', 'I grew up in a small town near the sea.'],
  ['to hand in', 'здавати (роботу)', 'сдавать (работу)', 'Hand in your essays by Monday, please.'],
  ['to hold on', 'зачекати (хвилинку)', 'подождать (минутку)', 'Hold on, I am looking for my keys.'],
  ['to join in', 'долучитися', 'присоединиться', 'Everyone joined in when the music started.'],
  ['to leave out', 'пропустити, не включити', 'пропустить, не включить', 'Do not leave out any details in your answer.'],
  ['to look for', 'шукати', 'искать', 'I am looking for a book about space.'],
  ['to look into', 'розглянути, вивчити (питання)', 'рассмотреть, изучить (вопрос)', 'The school will look into the problem with the Wi-Fi.'],
  ['to look out', 'бути обережним', 'быть осторожным', 'Look out! The floor is wet.'],
  ['to look up', 'шукати (у словнику, інтернеті)', 'искать (в словаре, интернете)', 'Look up the new words before the lesson.'],
  ['to make up', 'вигадати; помиритися', 'выдумать; помириться', 'They argued, but made up the next day.'],
  ['to move in', 'в’їхати (в нове житло)', 'въехать (в новое жилье)', 'New neighbours moved in last week.'],
  ['to pick up', 'підняти; забрати (когось)', 'поднять; забрать (кого-то)', 'Dad will pick us up after training.'],
  ['to point out', 'вказати, звернути увагу', 'указать, обратить внимание', 'The teacher pointed out a mistake in my essay.'],
  ['to put off', 'відкладати', 'откладывать', 'Stop putting off your homework.'],
  ['to put on', 'одягати', 'надевать', 'Put on your coat, it is cold outside.'],
  ['to run into', 'випадково зустріти', 'случайно встретить', 'I ran into my old teacher at the market.'],
  ['to run out of', 'вичерпати (запас)', 'исчерпать (запас)', 'We have run out of milk.'],
  ['to set up', 'заснувати; налаштувати', 'основать; настроить', 'They set up a small online shop.'],
  ['to show off', 'хизуватися', 'хвастаться', 'He likes to show off his new sneakers.'],
  ['to show up', 'з’явитися, прийти', 'появиться, прийти', 'Only five people showed up for the meeting.'],
  ['to sign up for', 'записатися на', 'записаться на', 'I signed up for a free coding course.'],
  ['to sort out', 'владнати, розібратися', 'уладить, разобраться', 'Do not worry, we will sort it out.'],
  ['to stand out', 'вирізнятися', 'выделяться', 'Her bright yellow bag really stands out.'],
  ['to switch off', 'вимкнути', 'выключить', 'Switch off the light when you leave.'],
  ['to take after', 'бути схожим на (родича)', 'быть похожим на (родственника)', 'I take after my dad, we both love music.'],
  ['to take off', 'злітати; знімати (одяг)', 'взлетать; снимать (одежду)', 'The plane took off on time.'],
  ['to take over', 'перейняти, взяти на себе', 'перенять, взять на себя', 'My sister took over the cooking when Mum was busy.'],
  ['to tidy up', 'прибирати', 'убирать', 'Tidy up your room before your friends come.'],
  ['to try on', 'приміряти', 'примерять', 'Can I try on these jeans?'],
  ['to turn down', 'відхилити; зробити тихіше', 'отклонить; сделать тише', 'Please turn down the music, I am studying.'],
  ['to turn up', 'зробити гучніше; з’явитися', 'сделать громче; появиться', 'Turn up the volume, I love this song!'],
  ['to work out', 'тренуватися; знайти рішення', 'тренироваться; найти решение', 'I work out three times a week.'],
];

const pvHead: (L2 | string)[] = ['Phrasal verb', L('Українською', 'По-украински'), L('По-російськи', 'По-русски'), 'Example'];
const pvRows = (a: number, b: number) => PV60.slice(a, b).map(([en, uk, ru, ex], i) => [`${a + i + 1}. ${en}`, uk, ru, ex]);

const PHRASAL: PrintDoc = {
  id: 'phrasal-verbs-60',
  title: L('60 фразових дієслів, які треба знати', '60 фразовых глаголов, которые нужно знать'),
  subtitle: L('Значення, приклади, вправа на 20 завдань і ключі', 'Значения, примеры, упражнение на 20 заданий и ключи'),
  level: 'B1-B2',
  blocks: [
    {
      p: L(
        'Фразове дієслово складається з дієслова і частки (up, out, off, on...). Частка часто повністю змінює значення: to look for (шукати) і to look after (піклуватися). Тому вчи їх як окремі слова, з прикладом.',
        'Фразовый глагол состоит из глагола и частицы (up, out, off, on...). Частица часто полностью меняет значение: to look for (искать) и to look after (заботиться). Поэтому учи их как отдельные слова, с примером.',
      ),
    },
    { table: { head: pvHead, rows: pvRows(0, 20) } },
    { pagebreak: true },
    { table: { head: pvHead, rows: pvRows(20, 40) } },
    { pagebreak: true },
    { table: { head: pvHead, rows: pvRows(40, 60) } },
    {
      tip: L(
        'Якщо в дієслова є додаток-займенник, він стоїть між дієсловом і часткою: pick me up, turn it down (не turn down it).',
        'Если у глагола есть дополнение-местоимение, оно стоит между глаголом и частицей: pick me up, turn it down (не turn down it).',
      ),
    },
    { pagebreak: true },
    {
      tasks: {
        title: L('Вправа 1. Допиши частку (up, out, off, on, in, down, over, back, after)', 'Упражнение 1. Допиши частицу (up, out, off, on, in, down, over, back, after)'),
        items: [
          '1. I need to look ___ this word in the dictionary.',
          '2. Please switch ___ your phones during the test.',
          '3. Can I try ___ this jacket in a bigger size?',
          '4. Our old fridge broke ___ last night.',
          '5. Don’t worry, she will get ___ it soon.',
          '6. Please fill ___ the form and give it to the teacher.',
          '7. Everyone says I take ___ my grandmother.',
          '8. Please give ___ the book when you finish it.',
          '9. Can you turn ___ the TV? It is too loud.',
          '10. We need to find ___ when the bus leaves.',
        ],
      },
    },
    {
      tasks: {
        title: L(
          'Вправа 2. Встав фразове дієслово в правильній формі: come up with, run out of, put off, show up, set up, grow up, fall out with, sign up for, get rid of, run into',
          'Упражнение 2. Вставь фразовый глагол в правильной форме: come up with, run out of, put off, show up, set up, grow up, fall out with, sign up for, get rid of, run into',
        ),
        items: [
          '11. Yesterday I ___ an old friend at the bus stop.',
          '12. We have ___ bread, can you buy some?',
          '13. They ___ their own YouTube channel last year.',
          '14. I want to ___ the swimming club this autumn.',
          '15. Max ___ late again, the lesson had already started.',
          '16. Stop ___ your project, the deadline is tomorrow!',
          '17. My parents ___ in a village, but now they live in Kyiv.',
          '18. Who ___ this crazy idea?',
          '19. We need to ___ all these old boxes in the garage.',
          '20. She ___ her sister and they didn’t talk for a week.',
        ],
      },
    },
    { p: L('Мій результат: ___ / 20', 'Мой результат: ___ / 20') },
    {
      answers: {
        title: L('Ключі', 'Ключи'),
        items: [
          '1 up', '2 off', '3 on', '4 down', '5 over', '6 in', '7 after', '8 back', '9 down', '10 out',
          '11 ran into', '12 run out of', '13 set up', '14 sign up for', '15 showed up',
          '16 putting off', '17 grew up', '18 came up with', '19 get rid of', '20 fell out with',
        ],
      },
    },
  ],
};

// ---------- 3. Шаблони для письма ----------

const WRITING: PrintDoc = {
  id: 'writing-templates',
  title: L('Шаблони для письма: лист другу і абзац-думка', 'Шаблоны для письма: письмо другу и абзац-мнение'),
  subtitle: L('Структура, слова-зв’язки, корисні фрази, зразки і чек-лист самоперевірки', 'Структура, слова-связки, полезные фразы, образцы и чек-лист самопроверки'),
  level: 'B1-B2',
  blocks: [
    {
      tip: L(
        'У тесті НМТ зараз немає окремого завдання на письмо, але ці шаблони потрібні для шкільних контрольних, ДПА та міжнародних іспитів. А ще письмо добре тренує граматику і лексику, які перевіряє use of English.',
        'В тесте НМТ сейчас нет отдельного задания на письмо, но эти шаблоны нужны для школьных контрольных, ГИА и международных экзаменов. А еще письмо хорошо тренирует грамматику и лексику, которые проверяет use of English.',
      ),
    },
    { h: L('1. Лист (email) другу: структура', '1. Письмо (email) другу: структура') },
    {
      table: {
        head: [L('Частина', 'Часть'), L('Що писати', 'Что писать'), L('Фрази', 'Фразы')],
        rows: [
          [L('Привітання', 'Приветствие'), L('Звернення на ім’я', 'Обращение по имени'), 'Hi Sam, / Dear Sam,'],
          [L('Вступ', 'Вступление'), L('Подякуй за лист, відреагуй на його новини', 'Поблагодари за письмо, отреагируй на его новости'), 'Thanks for your email. It was great to hear from you! / Sorry I haven’t written for so long.'],
          [L('Основна частина', 'Основная часть'), L('Дай відповідь на кожне питання з завдання, окремий абзац на кожну тему', 'Ответь на каждый вопрос из задания, отдельный абзац на каждую тему'), 'You asked me about... / Anyway, the big news is that... / By the way,...'],
          [L('Завершення', 'Завершение'), L('Постав питання другові, попрощайся', 'Задай вопрос другу, попрощайся'), 'Write back soon! / Can’t wait to hear from you. / Say hi to your family.'],
          [L('Підпис', 'Подпись'), L('Неформальне прощання та ім’я', 'Неформальное прощание и имя'), 'Best wishes, / Take care, / Love,'],
        ],
      },
    },
    { h: L('Корисні фрази для листа', 'Полезные фразы для письма') },
    {
      list: [
        L('Порада: If I were you, I would... / Why don’t you...? / You should definitely...', 'Совет: If I were you, I would... / Why don’t you...? / You should definitely...'),
        L('Запрошення: Would you like to...? / How about coming to...?', 'Приглашение: Would you like to...? / How about coming to...?'),
        L('Реакція на новини: That’s great news! / I’m so sorry to hear that. / Good luck with...!', 'Реакция на новости: That’s great news! / I’m so sorry to hear that. / Good luck with...!'),
        L('Розповідь про себе: Guess what! / I’ve just... / Last weekend I...', 'Рассказ о себе: Guess what! / I’ve just... / Last weekend I...'),
        L('Подяка: Thanks a lot for... / It was really kind of you to...', 'Благодарность: Thanks a lot for... / It was really kind of you to...'),
      ],
    },
    { h: L('Зразок листа', 'Образец письма') },
    {
      p: L(
        'Завдання: твій друг Sam з Канади запитує, як ти проводиш вихідні, і просить порадити, що подивитися в Україні влітку. Напиши відповідь (100-150 слів).',
        'Задание: твой друг Sam из Канады спрашивает, как ты проводишь выходные, и просит посоветовать, что посмотреть в Украине летом. Напиши ответ (100-150 слов).',
      ),
    },
    {
      p: 'Hi Sam, Thanks for your email! It was great to hear that you are coming to Ukraine in July. You asked me about my weekends. On Saturdays I usually have a long breakfast with my family and then meet my friends in the park. We play volleyball or just hang out and chat. On Sundays I try to read something in English and get ready for the new week. As for your trip, I would definitely recommend Lviv. The old town is beautiful, and there are lots of cosy cafés. If you like nature, why don’t you visit the Carpathians? The mountain views are amazing and the air is so fresh. By the way, would you like to go hiking together? Write back soon and tell me your plans! Best wishes, Olena',
    },
    { pagebreak: true },
    { h: L('2. Абзац-думка (opinion paragraph): структура', '2. Абзац-мнение (opinion paragraph): структура') },
    {
      list: [
        L('Тема і твоя думка (1 речення): In my opinion, ... / I strongly believe that ...', 'Тема и твое мнение (1 предложение): In my opinion, ... / I strongly believe that ...'),
        L('Аргумент 1 з прикладом: Firstly, ... For example, ...', 'Аргумент 1 с примером: Firstly, ... For example, ...'),
        L('Аргумент 2 з прикладом: Secondly, ... For instance, ...', 'Аргумент 2 с примером: Secondly, ... For instance, ...'),
        L('Інша думка (за бажанням): Some people think that ... However, ...', 'Другое мнение (по желанию): Some people think that ... However, ...'),
        L('Висновок, повтор думки іншими словами: To sum up, ... / That is why I think ...', 'Вывод, повтор мнения другими словами: To sum up, ... / That is why I think ...'),
      ],
    },
    { h: L('Слова-зв’язки', 'Слова-связки') },
    {
      table: {
        head: [L('Навіщо', 'Зачем'), L('Слова', 'Слова')],
        rows: [
          [L('Почати думку', 'Начать мнение'), 'In my opinion, / I think that / Personally, / As far as I am concerned,'],
          [L('Перелічити', 'Перечислить'), 'Firstly, / Secondly, / Finally, / What is more, / Also,'],
          [L('Протиставити', 'Противопоставить'), 'However, / On the other hand, / Although / but'],
          [L('Навести приклад', 'Привести пример'), 'For example, / For instance, / such as'],
          [L('Пояснити причину', 'Объяснить причину'), 'because / as / because of / that is why'],
          [L('Показати наслідок', 'Показать следствие'), 'so / as a result, / therefore,'],
          [L('Підсумувати', 'Подвести итог'), 'To sum up, / In conclusion, / All in all,'],
        ],
      },
    },
    { h: L('Зразок абзацу-думки', 'Образец абзаца-мнения') },
    { p: L('Тема: Should students have less homework?', 'Тема: Should students have less homework?') },
    {
      p: 'In my opinion, students should have less homework, but it should not disappear completely. Firstly, many teenagers spend six or seven hours at school, and after that they also need time for sport, hobbies and rest. For example, my friend often finishes her homework after eleven at night, so she feels tired the next day. Secondly, when there is less homework, students can choose tasks that really help them, such as reading or practising a skill they find difficult. Some people think that more homework means better results. However, I believe that short, regular practice is more useful than long tasks that nobody enjoys. To sum up, a small amount of useful homework is better than a lot of homework that makes students stressed.',
    },
    { pagebreak: true },
    { h: L('Чек-лист самоперевірки', 'Чек-лист самопроверки') },
    {
      check: [
        L('Я відповів(ла) на всі пункти завдання', 'Я ответил(а) на все пункты задания'),
        L('Кількість слів відповідає вимогам', 'Количество слов соответствует требованиям'),
        L('Є привітання, вступ, основна частина, завершення і підпис (для листа)', 'Есть приветствие, вступление, основная часть, завершение и подпись (для письма)'),
        L('Моя думка чітко сказана на початку і в кінці (для абзацу-думки)', 'Мое мнение четко сказано в начале и в конце (для абзаца-мнения)'),
        L('Кожен аргумент має приклад', 'У каждого аргумента есть пример'),
        L('Я використав(ла) щонайменше 4 різні слова-зв’язки', 'Я использовал(а) минимум 4 разных слова-связки'),
        L('Стиль відповідає адресату: розмовний для друга, нейтральний для думки', 'Стиль соответствует адресату: разговорный для друга, нейтральный для мнения'),
        L('Перевірив(ла) часи дієслів і закінчення -s у he / she / it', 'Проверил(а) времена глаголов и окончание -s в he / she / it'),
        L('Перевірив(ла) артиклі, прийменники та великі літери (I, назви, дні тижня)', 'Проверил(а) артикли, предлоги и заглавные буквы (I, названия, дни недели)'),
        L('Немає повторів одного й того самого слова в сусідніх реченнях', 'Нет повторов одного и того же слова в соседних предложениях'),
      ],
    },
    { h: L('Спробуй сам(а)', 'Попробуй сам(а)') },
    {
      p: L(
        'Обери одну тему: 1) Лист другові про новий гурток або хобі, яке ти почав(ла). 2) Абзац-думка: Is it better to study alone or with friends?',
        'Выбери одну тему: 1) Письмо другу о новом кружке или хобби, которое ты начал(а). 2) Абзац-мнение: Is it better to study alone or with friends?',
      ),
    },
    { lines: 16 },
  ],
};

export const EXTRAS: PrintDoc[] = [TENSES, PHRASAL, WRITING];

