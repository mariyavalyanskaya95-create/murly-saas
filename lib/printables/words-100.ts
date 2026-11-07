// Друковані матеріали: 100 ключових слів і фраз B1-B2 для НМТ за 10 темами + тест на 40 завдань.
import type { PrintDoc, L2, Block } from './types';

const L = (uk: string, ru: string): L2 => ({ uk, ru });

type W = [en: string, uk: string, ru: string, example: string];
type Topic = { title: string; uk: string; ru: string; words: W[] };

const TOPICS: Topic[] = [
  {
    title: 'Education and school',
    uk: 'Освіта і школа',
    ru: 'Образование и школа',
    words: [
      ['to revise for', 'повторювати (до іспиту)', 'повторять (к экзамену)', 'I usually revise for tests with a friend on video call.'],
      ['to pass an exam', 'скласти іспит', 'сдать экзамен', 'She passed the exam with the highest score in her class.'],
      ['to fail', 'не скласти, провалити', 'не сдать, провалить', 'He failed the first test but did much better the second time.'],
      ['to make progress', 'робити успіхи', 'делать успехи', 'You will make progress faster if you practise every day.'],
      ['to pay attention to', 'звертати увагу на', 'обращать внимание на', 'Pay attention to the time markers in each sentence.'],
      ['knowledge', 'знання', 'знания', 'Good knowledge of grammar helps in every part of the test.'],
      ['subject', 'предмет (шкільний)', 'предмет (школьный)', 'Biology is my favourite subject because the teacher is great.'],
      ['deadline', 'кінцевий термін', 'крайний срок', 'The deadline for the project is next Friday.'],
      ['to improve', 'покращувати', 'улучшать', 'Reading short stories helped me improve my vocabulary.'],
      ['to graduate from', 'закінчити (навчальний заклад)', 'окончить (учебное заведение)', 'My brother graduated from university last summer.'],
    ],
  },
  {
    title: 'Technology and media',
    uk: 'Технології та медіа',
    ru: 'Технологии и медиа',
    words: [
      ['device', 'пристрій', 'устройство', 'Please switch off all devices before the lesson starts.'],
      ['to download', 'завантажувати', 'скачивать', 'You can download the app for free.'],
      ['to share', 'ділитися', 'делиться', 'She shared the photos with her classmates in a group chat.'],
      ['reliable', 'надійний', 'надежный', 'Not every website is a reliable source of information.'],
      ['to rely on', 'покладатися на', 'полагаться на', 'Many students rely on their phones to check spelling.'],
      ['screen time', 'час біля екрана', 'время у экрана', 'My parents asked me to cut down my screen time at night.'],
      ['to keep up with', 'встигати за, бути в курсі', 'успевать за, быть в курсе', 'It is hard to keep up with all the new apps.'],
      ['advertisement', 'реклама, оголошення', 'реклама, объявление', 'The advertisement promised a free month of music.'],
      ['to update', 'оновлювати', 'обновлять', 'Remember to update your apps to stay safe online.'],
      ['to go viral', 'стати вірусним (поширитися)', 'стать вирусным (распространиться)', 'His short video about his cat went viral in two days.'],
    ],
  },
  {
    title: 'Environment and nature',
    uk: 'Довкілля і природа',
    ru: 'Окружающая среда и природа',
    words: [
      ['environment', 'довкілля, навколишнє середовище', 'окружающая среда', 'Plastic bags are bad for the environment.'],
      ['to recycle', 'переробляти (відходи)', 'перерабатывать (отходы)', 'Our school recycles paper and bottles.'],
      ['to reduce', 'зменшувати', 'уменьшать', 'We can reduce waste by using our own cups.'],
      ['pollution', 'забруднення', 'загрязнение', 'Air pollution is a serious problem in big cities.'],
      ['to protect', 'захищати', 'защищать', 'This park was created to protect rare birds.'],
      ['endangered species', 'види під загрозою зникнення', 'исчезающие виды', 'The snow leopard is an endangered species.'],
      ['to throw away', 'викидати', 'выбрасывать', 'Do not throw away old clothes, give them to someone.'],
      ['renewable energy', 'відновлювана енергія', 'возобновляемая энергия', 'Wind and sun are sources of renewable energy.'],
      ['climate change', 'зміна клімату', 'изменение климата', 'Climate change makes summers hotter in many countries.'],
      ['to save', 'заощаджувати, рятувати', 'экономить, спасать', 'Turning off the lights helps to save energy.'],
    ],
  },
  {
    title: 'Health and lifestyle',
    uk: 'Здоров’я і спосіб життя',
    ru: 'Здоровье и образ жизни',
    words: [
      ['healthy', 'здоровий, корисний', 'здоровый, полезный', 'A healthy breakfast gives you energy for the whole morning.'],
      ['to get enough sleep', 'висипатися', 'высыпаться', 'Teenagers need to get enough sleep to concentrate.'],
      ['to keep fit', 'підтримувати форму', 'поддерживать форму', 'I keep fit by cycling to school.'],
      ['to avoid', 'уникати', 'избегать', 'Try to avoid sweet drinks before bed.'],
      ['stress', 'стрес', 'стресс', 'A short walk can reduce stress before an exam.'],
      ['to recover', 'одужувати, відновлюватися', 'выздоравливать, восстанавливаться', 'It took him a week to recover from the flu.'],
      ['habit', 'звичка', 'привычка', 'Drinking water every morning is a good habit.'],
      ['balanced diet', 'збалансоване харчування', 'сбалансированное питание', 'A balanced diet includes fruit, vegetables and protein.'],
      ['to give up', 'кидати (звичку), здаватися', 'бросать (привычку), сдаваться', 'My uncle gave up sugar in his coffee.'],
      ['to look after', 'піклуватися про', 'заботиться о', 'You should look after yourself during exam season.'],
    ],
  },
  {
    title: 'Travel and transport',
    uk: 'Подорожі та транспорт',
    ru: 'Путешествия и транспорт',
    words: [
      ['journey', 'поїздка, подорож', 'поездка, путешествие', 'The journey from Lviv to Odesa takes about twelve hours by train.'],
      ['to book', 'бронювати', 'бронировать', 'We booked our tickets two months in advance.'],
      ['destination', 'пункт призначення', 'пункт назначения', 'Paris is a popular destination for school trips.'],
      ['to set off', 'вирушати', 'отправляться', 'We set off early to avoid traffic.'],
      ['luggage', 'багаж', 'багаж', 'You can take only one piece of luggage on this flight.'],
      ['to miss', 'запізнитися на, пропустити', 'опоздать на, пропустить', 'Hurry up or we will miss the bus.'],
      ['delay', 'затримка', 'задержка', 'There was a two-hour delay because of the snow.'],
      ['sightseeing', 'огляд визначних місць', 'осмотр достопримечательностей', 'We spent the whole day sightseeing in the old town.'],
      ['to get lost', 'загубитися', 'заблудиться', 'We got lost because the map on my phone stopped working.'],
      ['accommodation', 'житло (у подорожі)', 'жилье (в поездке)', 'The price includes accommodation and breakfast.'],
    ],
  },
  {
    title: 'Work and careers',
    uk: 'Робота і кар’єра',
    ru: 'Работа и карьера',
    words: [
      ['to apply for', 'подавати заявку на', 'подавать заявку на', 'She applied for a summer job at a bookshop.'],
      ['experience', 'досвід', 'опыт', 'You do not need any experience for this volunteer role.'],
      ['skill', 'навичка', 'навык', 'Communication is an important skill in any job.'],
      ['salary', 'зарплата', 'зарплата', 'The salary is good, but the hours are long.'],
      ['to earn', 'заробляти', 'зарабатывать', 'He earns some pocket money by walking dogs.'],
      ['to be responsible for', 'відповідати за', 'отвечать за', 'In our project I am responsible for the design.'],
      ['interview', 'співбесіда', 'собеседование', 'I was nervous before my first job interview.'],
      ['colleague', 'колега', 'коллега', 'My mum has lunch with her colleagues every Friday.'],
      ['to take part in', 'брати участь у', 'принимать участие в', 'Over forty students took part in the competition.'],
      ['ambitious', 'амбітний, цілеспрямований', 'амбициозный, целеустремленный', 'She is ambitious and wants to start her own company.'],
    ],
  },
  {
    title: 'Relationships and personality',
    uk: 'Стосунки та характер',
    ru: 'Отношения и характер',
    words: [
      ['to get on with', 'ладнати з', 'ладить с', 'I get on well with my younger sister.'],
      ['to let someone down', 'підводити когось', 'подводить кого-то', 'Max never lets his friends down, he always keeps his promises.'],
      ['patient', 'терплячий', 'терпеливый', 'Our coach is patient and explains everything twice.'],
      ['to argue', 'сперечатися, сваритися', 'спорить, ссориться', 'My brother and I argue about the TV remote.'],
      ['to apologise', 'вибачатися', 'извиняться', 'He apologised for being late.'],
      ['shy', 'сором’язливий', 'застенчивый', 'She was shy at first but now she talks to everyone.'],
      ['generous', 'щедрий', 'щедрый', 'It was generous of you to share your notes.'],
      ['to make friends', 'заводити друзів', 'заводить друзей', 'It is easy to make friends at a summer camp.'],
      ['to trust', 'довіряти', 'доверять', 'I trust her because she always tells the truth.'],
      ['to look up to', 'захоплюватися, брати приклад з', 'восхищаться, брать пример с', 'I look up to my grandfather, he is so wise and kind.'],
    ],
  },
  {
    title: 'Money and shopping',
    uk: 'Гроші та покупки',
    ru: 'Деньги и покупки',
    words: [
      ['to afford', 'дозволити собі (за грошима)', 'позволить себе (по деньгам)', 'I cannot afford new headphones right now.'],
      ['to save up for', 'збирати гроші на', 'копить деньги на', 'He is saving up for a new bike.'],
      ['discount', 'знижка', 'скидка', 'Students get a ten percent discount at this café.'],
      ['to spend money on', 'витрачати гроші на', 'тратить деньги на', 'She spends most of her money on books.'],
      ['receipt', 'чек', 'чек', 'Keep the receipt in case you want to return the shoes.'],
      ['to return', 'повертати', 'возвращать', 'I returned the jacket because it was too small.'],
      ['to borrow', 'позичати (у когось)', 'одалживать (у кого-то)', 'Can I borrow your calculator for a minute?'],
      ['to lend', 'позичати (комусь)', 'одалживать (кому-то)', 'My friend lent me fifty hryvnias for the ticket.'],
      ['bargain', 'вигідна покупка', 'выгодная покупка', 'This coat was a real bargain at half price.'],
      ['to be worth', 'бути вартим', 'стоить того', 'The museum is worth visiting, the guide is great.'],
    ],
  },
  {
    title: 'Culture and free time',
    uk: 'Культура і дозвілля',
    ru: 'Культура и досуг',
    words: [
      ['to take up', 'почати займатися (хобі)', 'начать заниматься (хобби)', 'Last year I took up photography.'],
      ['exhibition', 'виставка', 'выставка', 'There is a new exhibition of student art at the city gallery.'],
      ['performance', 'виступ, вистава', 'выступление, спектакль', 'The performance lasted two hours without a break.'],
      ['audience', 'глядачі, аудиторія', 'зрители, аудитория', 'The audience clapped for five minutes.'],
      ['to be keen on', 'захоплюватися', 'увлекаться', 'My cousin is keen on board games.'],
      ['to look forward to', 'з нетерпінням чекати', 'с нетерпением ждать', 'I am looking forward to the summer holidays.'],
      ['to join', 'приєднуватися, вступати', 'присоединяться, вступать', 'Why not join the school drama club?'],
      ['entertaining', 'розважальний, цікавий', 'развлекательный, интересный', 'The film was long but very entertaining.'],
      ['to hang out', 'проводити час (з друзями)', 'проводить время (с друзьями)', 'On Saturdays we hang out in the park.'],
      ['to recommend', 'радити, рекомендувати', 'советовать, рекомендовать', 'Can you recommend a good podcast for learning English?'],
    ],
  },
  {
    title: 'Society and city life',
    uk: 'Суспільство і життя в місті',
    ru: 'Общество и жизнь в городе',
    words: [
      ['community', 'громада, спільнота', 'сообщество', 'Our community organised a clean-up day in the park.'],
      ['to volunteer', 'волонтерити', 'волонтерить', 'She volunteers at an animal shelter every weekend.'],
      ['neighbourhood', 'район, околиця', 'район, окрестности', 'There are lots of cafés in my neighbourhood.'],
      ['crowded', 'переповнений, людний', 'переполненный, людный', 'The metro is very crowded in the morning.'],
      ['to support', 'підтримувати', 'поддерживать', 'Local people support small family shops.'],
      ['to solve a problem', 'розв’язати проблему', 'решить проблему', 'The new bike lanes helped to solve the traffic problem.'],
      ['to raise money', 'збирати кошти', 'собирать средства', 'We raised money for the school library with a book fair.'],
      ['public transport', 'громадський транспорт', 'общественный транспорт', 'Public transport here is cheap and fast.'],
      ['to deal with', 'мати справу з, впоратися з', 'иметь дело с, справиться с', 'The city must deal with the noise from the new road.'],
      ['opportunity', 'можливість', 'возможность', 'Big cities offer more opportunities for young people.'],
    ],
  },
];

const topicBlocks: Block[] = [];
TOPICS.forEach((t, i) => {
  topicBlocks.push({ h: `${i + 1}. ${t.title} (${t.uk} / ${t.ru})` });
  topicBlocks.push({
    table: {
      head: ['English', L('Українською', 'По-украински'), L('По-російськи', 'По-русски'), 'Example'],
      rows: t.words.map(([en, uk, ru, ex]) => [en, uk, ru, ex]),
    },
  });
  if (i % 2 === 1 && i < TOPICS.length - 1) topicBlocks.push({ pagebreak: true });
});

const WORDS: PrintDoc = {
  id: 'words-100',
  title: L('100 ключових слів і фраз для НМТ', '100 ключевых слов и фраз для НМТ'),
  subtitle: L('Рівень B1-B2, 10 тем по 10 слів, з перекладом і прикладами', 'Уровень B1-B2, 10 тем по 10 слов, с переводом и примерами'),
  level: 'B1-B2',
  blocks: [
    {
      p: L(
        'Ці слова й фрази часто трапляються в текстах і завданнях на лексику. Дієслова записані з «to», щоб одразу було видно частину мови. Фразові дієслова й сталі вирази вчи цілком, разом із прийменником.',
        'Эти слова и фразы часто встречаются в текстах и заданиях на лексику. Глаголы записаны с «to», чтобы сразу была видна часть речи. Фразовые глаголы и устойчивые выражения учи целиком, вместе с предлогом.',
      ),
    },
    {
      tip: L(
        'Як учити: закрий колонку з перекладом і перевір себе. Потім закрий англійську колонку. Слова, які не згадав, познач олівцем і повтори через 2 дні.',
        'Как учить: закрой колонку с переводом и проверь себя. Потом закрой английскую колонку. Слова, которые не вспомнил, отметь карандашом и повтори через 2 дня.',
      ),
    },
    ...topicBlocks,
    {
      tip: L(
        'Зверни увагу на пари, які легко сплутати: to borrow (взяти в когось) і to lend (дати комусь); to rely on і reliable.',
        'Обрати внимание на пары, которые легко спутать: to borrow (взять у кого-то) и to lend (дать кому-то); to rely on и reliable.',
      ),
    },
  ],
};

const TEST: PrintDoc = {
  id: 'words-100-test',
  title: L('Тест: 100 ключових слів для НМТ', 'Тест: 100 ключевых слов для НМТ'),
  subtitle: L('40 завдань, ключі в кінці', '40 заданий, ключи в конце'),
  level: 'B1-B2',
  blocks: [
    {
      p: L(
        'Виконуй тест без словника. За кожну правильну відповідь 1 бал. 35-40 балів: чудово; 25-34: добре, повтори позначені слова; менше 25: повтори всі теми ще раз.',
        'Выполняй тест без словаря. За каждый правильный ответ 1 балл. 35-40 баллов: отлично; 25-34: хорошо, повтори отмеченные слова; меньше 25: повтори все темы еще раз.',
      ),
    },
    {
      tasks: {
        title: L('Частина 1. Напиши англійське слово або фразу (перша літера підказана)', 'Часть 1. Напиши английское слово или фразу (первая буква подсказана)'),
        items: [
          '1. забруднення / загрязнение: p___',
          '2. знижка / скидка: d___',
          '3. співбесіда / собеседование: i___',
          '4. багаж / багаж: l___',
          '5. звичка / привычка: h___',
          '6. пристрій / устройство: d___',
          '7. виставка / выставка: e___',
          '8. можливість / возможность: o___',
          '9. кінцевий термін / крайний срок: d___',
          '10. сором’язливий / застенчивый: s___',
        ],
      },
    },
    {
      tasks: {
        title: L('Частина 2. Встав слово з рамки: afford, recover, booked, share, recycle, apologised, volunteers, improve, avoid, earns', 'Часть 2. Вставь слово из рамки: afford, recover, booked, share, recycle, apologised, volunteers, improve, avoid, earns'),
        items: [
          '11. We ___ a table for six at the pizza place.',
          '12. I want to ___ my speaking, so I joined a club.',
          '13. Most families in our street ___ glass and paper.',
          '14. My sister ___ at the local library on Sundays.',
          '15. Doctors say you should ___ eating late at night.',
          '16. He ___ to his friend for breaking the phone screen.',
          '17. We cannot ___ a holiday abroad this year.',
          '18. Could you ___ the link to the video with me?',
          '19. My cousin ___ money by teaching guitar.',
          '20. It usually takes a few days to ___ from a cold.',
        ],
      },
    },
    { pagebreak: true },
    {
      tasks: {
        title: L('Частина 3. Обери правильний варіант (a, b або c)', 'Часть 3. Выбери правильный вариант (a, b или c)'),
        items: [
          '21. Can I ___ your pen? I left mine at home. (a) lend (b) borrow (c) give',
          '22. She is very ___: she always gives presents to everyone. (a) generous (b) shy (c) crowded',
          '23. We had to wait because of a long ___ at the airport. (a) journey (b) delay (c) destination',
          '24. I ___ well with all my classmates. (a) get on (b) get up (c) get lost',
          '25. This website is not ___, the facts are often wrong. (a) ambitious (b) entertaining (c) reliable',
          '26. Hurry, or we will ___ the beginning of the film! (a) miss (b) lose (c) fail',
          '27. My grandparents ___ me when my parents are at work. (a) look after (b) look up to (c) look forward to',
          '28. The ___ loved the concert and asked for one more song. (a) audience (b) community (c) colleague',
          '29. Wind power is a type of ___ energy. (a) endangered (b) renewable (c) balanced',
          '30. This old phone is not ___ repairing, buy a new one. (a) worth (b) keen (c) responsible',
        ],
      },
    },
    {
      tasks: {
        title: L('Частина 4. Допиши прийменник або частку', 'Часть 4. Допиши предлог или частицу'),
        items: [
          '31. Who is responsible ___ cleaning the classroom today?',
          '32. I am really looking forward ___ meeting you.',
          '33. She wants to apply ___ a place at a summer school.',
          '34. Please pay attention ___ the instructions.',
          '35. My dad gave ___ coffee two years ago.',
          '36. More than a hundred runners took part ___ the race.',
          '37. My brother is keen ___ basketball.',
          '38. We set ___ at six in the morning.',
          '39. He is saving up ___ a new laptop.',
          '40. It is not easy to keep up ___ the news every day.',
        ],
      },
    },
    { h: L('Мій результат', 'Мой результат') },
    { p: L('Бали: ___ / 40. Слова, які треба повторити:', 'Баллы: ___ / 40. Слова, которые нужно повторить:') },
    { lines: 4 },
    { pagebreak: true },
    {
      answers: {
        title: L('Ключі до тесту', 'Ключи к тесту'),
        items: [
          '1 pollution', '2 discount', '3 interview', '4 luggage', '5 habit',
          '6 device', '7 exhibition', '8 opportunity', '9 deadline', '10 shy',
          '11 booked', '12 improve', '13 recycle', '14 volunteers', '15 avoid',
          '16 apologised', '17 afford', '18 share', '19 earns', '20 recover',
          '21 b (borrow)', '22 a (generous)', '23 b (delay)', '24 a (get on)', '25 c (reliable)',
          '26 a (miss)', '27 a (look after)', '28 a (audience)', '29 b (renewable)', '30 a (worth)',
          '31 for', '32 to', '33 for', '34 to', '35 up',
          '36 in', '37 on', '38 off', '39 for', '40 with',
        ],
      },
    },
  ],
};

export const WORDS_100: PrintDoc[] = [WORDS, TEST];
