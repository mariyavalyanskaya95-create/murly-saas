import type { MockVariant } from './types';

// Пробний НМТ №1 (Murly). Усі тексти й оголошення написані для Murly.
export const VARIANT_1: MockVariant = {
  id: '1',
  title: 'Пробний НМТ №1',
  level: 'B1-B2',
  tasks: [
    {
      kind: 'ads',
      stem: 'This advertisement is for people who want to ______.',
      options: ['learn to dance', 'adopt a pet', 'improve their photos', 'find a summer job', 'buy second-hand books', 'get fit outdoors', 'learn to code', 'volunteer at a festival'],
      items: [
        {
          poster: { theme: 'block', brand: 'SNAP SMARTER', title: 'Your phone. Your art.', body: 'Turn everyday phone pictures into something special. A two-hour workshop on light, angles and simple editing. Bring your phone, we bring the tricks.', footer: 'Saturday, 11:00 · Creative Hub, 2nd floor', icons: ['d-camera', 'd-spark', 'd-phone', 'd-bulb'], bg: '#B9DBE9', accent: '#1A1A1A' },
          answer: 2,
          why: 'Ключові слова: phone pictures (фото на телефон), light, angles (світло, ракурси), editing (обробка). Тобто воркшоп для тих, хто хоче фотографувати краще: improve their photos. Варіант G (learn to code) не підходить: editing тут про фото, а не про програмування.',
        },
        {
          poster: { theme: 'warm', brand: 'PAWS & CLAWS SHELTER', title: 'Open Day', body: 'Meet Biscuit, Luna and twenty other friends who are waiting for a home. Our team will help you choose the right companion and fill in all the papers.', footer: 'Sunday 10:00-16:00 · 14 Green Lane', icons: ['st-cat-please', 'c-paw', 'd-heart', 'c-fish'], bg: '#FFF4E3', accent: '#D83A1E' },
          answer: 1,
          why: 'Ключові слова: waiting for a home (чекають на дім), choose the right companion (обрати компаньйона), fill in the papers (оформити документи). Притулок пропонує забрати тварину додому: adopt a pet.',
        },
        {
          poster: { theme: 'notice', brand: 'SCHOOL LIBRARY', title: 'Book Swap & Sale', body: 'Pre-loved novels, comics and textbooks from 20 UAH. Every book has already made someone happy once. All money goes to new books for our library.', footer: 'Hall B · Thursday after lessons', icons: ['e-book', 'e-pencil', 'd-cup', 'd-money'], bg: '#F4EFE3', accent: '#D83A1E' },
          answer: 4,
          why: 'Pre-loved (буквально «вже кимось улюблені») означає вживані, б/в. Книжки продають від 20 гривень: buy second-hand books. Пастка: «all money goes to the library» не означає, що треба волонтерити.',
        },
        {
          poster: { theme: 'event', brand: 'CENTRAL PARK', title: 'Park Bootcamp', body: 'Running, stretching and team games with a real coach. No gym membership needed. Just trainers, a water bottle and a good mood.', footer: 'Every Saturday · 8:00 · Main gate', icons: ['d-bolt', 'e-trophy', 'd-clock', 'd-heart'], bg: '#D0F834', accent: '#1A1A1A' },
          answer: 5,
          why: 'Тренування в парку (Park, running, stretching) без спортзалу (no gym membership): get fit outdoors, тобто тренуватися на свіжому повітрі. Танців (A) тут немає.',
        },
        {
          poster: { theme: 'fun', brand: 'RIVERSIDE MUSIC FEST', title: 'We need YOU!', body: 'Help us set up the stage, welcome guests and keep the area clean. Free entry and a festival T-shirt for every helper. No pay, just good vibes.', footer: 'Sign up at the info tent by 1 July', icons: ['e-mic', 'd-team', 'd-spark', 'd-smile'], bg: '#FFD3E0', accent: '#1A1A1A' },
          answer: 7,
          why: 'Помічники (helpers) ставлять сцену і зустрічають гостей, а зарплати немає: No pay, just good vibes. Отже це волонтерство на фестивалі: volunteer at a festival. Пастка: варіант D (summer job), але job передбачає оплату, а тут її немає.',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'The Library That Stays Up Late',
      paragraphs: [
        'Every Friday at 9 pm, when most shops in the small town of Millbrook have already closed, the lights in the public library suddenly come on again. Within minutes, the reading room is full of teenagers carrying blankets, snacks and board games. Welcome to Late Night Library, an experiment that started two years ago and has since been copied by more than forty libraries across the country.',
        'The idea came from Ruth Kemp, a librarian who had noticed something worrying. “Teenagers simply stopped coming,” she says. “Children visited with their parents, and adults came for newspapers, but people aged thirteen to eighteen had disappeared. When I asked my own nephew why, he said the library felt like a place where you were not allowed to breathe.”',
        'Ruth decided to change the rules for one evening a week. During Late Night Library, talking is allowed, food is welcome as long as it is not sticky, and nobody has to whisper. Volunteers run a poetry corner, a quiet room for those who really want to read, and a table where older visitors help younger ones with homework. The only strict rule is that phones must stay in a basket by the door until midnight.',
        'At first, local residents were not sure. Some complained that a library should be a calm place and that noisy teenagers would damage the books. “One man wrote to the local newspaper saying we were turning culture into a party,” Ruth remembers with a smile. “Then he came to see for himself, and now he runs our chess club.”',
        'The numbers speak for themselves. In the first year, the number of library cards held by teenagers grew from 60 to almost 400. Book loans among young people tripled, and the most popular titles were not, as many expected, comics, but science fiction novels and biographies of sportspeople.',
        'Researchers who studied the project say its success is not really about books. “Young people need a third place,” explains sociologist Dr Amir Patel, “somewhere that is neither home nor school, where they can be themselves without spending money. Libraries are perfect for that, but only if they let teenagers in on their own terms.”',
      ],
      items: [
        {
          q: 'Which statement is TRUE, according to PARAGRAPH 1?',
          options: ['The library is open every night.', 'The idea has spread to other libraries.', 'Teenagers must bring their own books.', 'The library closes at 9 pm on Fridays.'],
          answer: 1,
          why: 'У першому абзаці сказано: has since been copied by more than forty libraries across the country (відтоді ідею скопіювали понад сорок бібліотек). Це і є B. Варіант D навпаки: о 21:00 бібліотека знову відкривається. A неправильний, бо мова тільки про п’ятниці.',
        },
        {
          q: 'According to Ruth’s nephew, teenagers stopped visiting the library because it ______.',
          options: ['was too far from school', 'had no modern books', 'felt too strict and silent', 'was only for small children'],
          answer: 2,
          why: 'Племінник сказав: a place where you were not allowed to breathe (місце, де не можна навіть дихати). Це образний вислів про надто суворі правила й тишу, тобто C. Про відстань і нові книжки в тексті нічого немає.',
        },
        {
          q: 'What is NOT allowed during Late Night Library?',
          options: ['Eating snacks', 'Talking to friends', 'Using phones', 'Doing homework'],
          answer: 2,
          why: 'Єдине суворе правило в абзаці 3: phones must stay in a basket by the door until midnight (телефони лишаються в кошику біля дверей до опівночі). Їжа дозволена (food is welcome), говорити можна (talking is allowed), а з домашкою навіть допомагають.',
        },
        {
          q: 'The man who wrote to the local newspaper ______.',
          options: ['still thinks the project is a mistake', 'became part of the project', 'used to work in the library', 'asked the library to close at night'],
          answer: 1,
          why: 'Чоловік спершу критикував ідею, але потім now he runs our chess club (тепер він веде шаховий клуб). Отже він став частиною проєкту: B. Варіант A протилежний за змістом.',
        },
        {
          q: 'What does Dr Amir Patel believe?',
          options: ['Teenagers prefer reading at home.', 'Libraries should charge teenagers for events.', 'Young people need a free place outside home and school.', 'Books are the main reason for the project’s success.'],
          answer: 2,
          why: 'Доктор Патель каже, що молоді потрібне third place, neither home nor school (ні дім, ні школа), де можна бути собою without spending money (не витрачаючи грошей). Це C. Варіант D заперечений прямо: success is not really about books.',
        },
      ],
    },
    {
      kind: 'people',
      title: 'Young Changemakers',
      stem: 'This person ______.',
      options: ['turned a hobby into a small business', 'helps older people with technology', 'was inspired by a family member', 'cleaned up a natural area', 'built something from recycled materials', 'won an international prize', 'changed their plans because of an injury', 'teaches others for free online'],
      items: [
        {
          name: 'Mia, 16',
          text: 'Mia spent last summer collecting plastic bottles from her neighbours and the school canteen. Instead of throwing them away, she and two friends melted them down and turned them into a bench for the bus stop. “It took us forty days and smelled terrible,” she laughs. The bench is still there, and the village council has already asked for two more.',
          answer: 4,
          why: 'Мія зібрала пластикові пляшки, переплавила їх і зробила лавку: built something from recycled materials. Пастка D (cleaned up a natural area): пляшки вона збирала в сусідів і в їдальні, а не на природі.',
        },
        {
          name: 'Taras, 17',
          text: 'Taras was sure he would become a professional footballer until he broke his leg badly at fifteen. Stuck at home for months, he started editing videos of his old team’s matches. Today he films and edits match highlights for three local clubs and is planning to study cinema at university.',
          answer: 6,
          why: 'Тарас мріяв про футбол, але broke his leg (зламав ногу) і тепер планує вивчати кіно. Травма змінила його плани: changed their plans because of an injury.',
        },
        {
          name: 'Sofia, 15',
          text: 'Every Sunday Sofia goes to a care home near her school. She shows the residents how to make video calls, send photos and spot fake messages. “Mrs Halyna now sends me better memes than my friends do,” she jokes. Sofia has also written a simple guide with big letters, which the care home now gives to every new resident.',
          answer: 1,
          why: 'Care home (будинок для літніх людей), residents (мешканці), video calls, fake messages: Софія вчить літніх людей користуватися телефоном. Це B: helps older people with technology.',
        },
        {
          name: 'Daniel, 18',
          text: 'Daniel started baking during a long winter holiday simply because he was bored. His cinnamon cookies quickly became famous among his classmates, who began placing orders. Now he bakes three times a week, sells his cookies at a local café and keeps a notebook with every expense and every hryvnia he earns.',
          answer: 0,
          why: 'Даніель почав пекти від нудьги (хобі), а тепер sells his cookies (продає печиво) і рахує витрати та заробіток. Хобі стало маленьким бізнесом: A.',
        },
        {
          name: 'Olena, 16',
          text: 'Olena’s older sister is a doctor who worked in a hospital near the front line. Listening to her sister’s stories, Olena decided she wanted to help too. She learned first aid, and now she runs short courses for her classmates every month, using a training doll that her school bought after her request.',
          answer: 2,
          why: 'Олена вирішила допомагати, listening to her sister’s stories (слухаючи історії сестри-лікарки). Її надихнула рідна людина: was inspired by a family member. Пастка H: вона навчає однокласників, але наживо, а не онлайн.',
        },
        {
          name: 'Max, 14',
          text: 'Max loves maths but hated how boring his textbook looked. So he started recording five-minute videos explaining one problem at a time, with drawings and silly voices. His channel now has 12,000 subscribers, and he has never asked anyone for money. “Comments like ‘I finally understood fractions’ are my payment,” he says.',
          answer: 7,
          why: 'Макс записує відео з поясненнями (channel, subscribers) і never asked anyone for money (ніколи не просив грошей). Це H: teaches others for free online. Пастка A: канал не є бізнесом, бо він нічого не заробляє.',
        },
      ],
    },
    {
      kind: 'gapped',
      title: 'Why Do Cats Purr?',
      text: 'For centuries, people have believed that a purring cat is simply a happy cat. Scientists, however, say the story is more complicated, {0}. Cats purr when they are relaxed, but they also purr when they are hungry, frightened or even injured.\n\nThe sound itself is produced by the muscles of the voice box, {1} about 25 times per second. Unlike a meow, a purr continues both when the cat breathes in and when it breathes out, which is why it sounds so smooth.\n\nOne of the most surprising ideas is that purring may help cats heal. Vibrations at such low frequencies are believed to support the growth of bones, {2}. This might explain an old saying among vets that cats recover from broken bones faster than dogs.\n\nKittens start purring when they are only a few days old. Since they are born blind and deaf, they cannot see their mother, {3}. The mother cat purrs back, and the sound works like a quiet message: “Everything is fine, I am here.”\n\nSome cats have even learned to use purring to their advantage. Researchers in the UK described a special “soliciting purr” {4}. To human ears it sounds a little like the cry of a baby, which may be why owners find it so hard to ignore.\n\nSo next time your cat sits on your lap and starts its gentle engine, remember that it may be saying more than “I am happy”. It could be asking for breakfast, calming itself down, or simply {5}.',
      options: ['which open and close very quickly', 'so they purr to show where they are', 'and it is not only about pleasure', 'which cats use when they want food', 'telling you that it trusts you', 'because dogs cannot purr at all', 'which is why some doctors are interested in the sound', 'although most cats prefer sleeping'],
      items: [
        { answer: 2, why: 'Перед пропуском: the story is more complicated (усе складніше). Далі приклади: кішки муркочуть і від голоду, і від страху. Логічне продовження: and it is not only about pleasure (і справа не лише в задоволенні).' },
        { answer: 0, why: 'Мова про muscles of the voice box (м’язи гортані). Підрядне речення which open and close very quickly пояснює, що роблять ці м’язи, і пасує до about 25 times per second.' },
        { answer: 6, why: 'Вібрації, що допомагають росту кісток, природно цікаві лікарям: which is why some doctors are interested in the sound. Пастка F про собак: собак згадано лише в наступному реченні, і там про інше.' },
        { answer: 1, why: 'Кошенята сліпі й глухі, they cannot see their mother, тому муркочуть, щоб мама знала, де вони: so they purr to show where they are. Далі кішка «відповідає» муркотінням, це підтверджує зміст.' },
        { answer: 3, why: 'Soliciting purr означає «прохальне муркотіння». Пропуск пояснює, навіщо воно: which cats use when they want food. Наступне речення про плач дитини, який власник не може ігнорувати, логічно продовжує тему прохання.' },
        { answer: 4, why: 'Останнє речення перелічує, що може «казати» муркотіння: asking for breakfast, calming itself down, or simply telling you that it trusts you. Форма на -ing стоїть паралельно з asking і calming.' },
      ],
    },
    {
      kind: 'cloze',
      focus: 'lexis',
      title: 'The Rise of Repair Cafés',
      text: 'The first Repair Café {0} its doors in Amsterdam in 2009. The idea was simple: instead of throwing away a broken toaster or a torn jacket, people could bring it to a free meeting where volunteers would try to {1} it. Today there are thousands of repair cafés around the world, and many of them are {2} by retired engineers, tailors and electricians who enjoy sharing their skills. Visitors do not just watch; they are encouraged to {3} part in the repair, so they can do it themselves next time. Supporters say these events help to {4} waste and build a stronger sense of community.',
      items: [
        { options: ['opened', 'started', 'set', 'made'], answer: 0, why: 'Сталий вираз open its doors (відчинити двері, тобто почати працювати). Start, set і make з doors у цьому значенні не вживаються.' },
        { options: ['fix', 'solve', 'correct', 'cure'], answer: 0, why: 'Fix означає полагодити річ. Solve вживаємо з проблемою чи задачею, correct з помилкою, cure з хворобою. Для тостера і куртки лише fix.' },
        { options: ['run', 'held', 'kept', 'made'], answer: 0, why: 'Run a café / an event означає керувати, організовувати. Are run by retired engineers: їх ведуть інженери на пенсії. Held вживаємо з подією (the meeting was held), а не з кафе.' },
        { options: ['take', 'make', 'have', 'do'], answer: 0, why: 'Сталий вираз take part in (брати участь). З part інші дієслова не поєднуються.' },
        { options: ['reduce', 'shorten', 'narrow', 'drop'], answer: 0, why: 'Reduce waste означає зменшувати кількість відходів. Shorten (вкорочувати) про довжину, narrow (звужувати) про ширину, а drop waste звучало б як «упустити відходи».' },
      ],
    },
    {
      kind: 'cloze',
      focus: 'grammar',
      title: 'Mary Anning',
      text: 'Mary Anning was born in 1799 in Lyme Regis, a small town on the south coast of England. Her family was poor, and as a child she {0} fossils on the beach to sell to tourists. When she was about twelve, she and her brother discovered the skeleton of a sea creature that {1} in the rocks for millions of years. Although her discoveries were {2} important, scientists of that time rarely gave her credit, because she was a woman and had little formal education. Today, Anning {3} as one of the most important fossil hunters in history. {4} her life was difficult, she never stopped learning and reading about science.',
      items: [
        { options: ['collected', 'has collected', 'collects', 'had been collected'], answer: 0, why: 'Подія в минулому (as a child, коли вона була дитиною), звичайна повторювана дія: Past Simple collected. Has collected не вживаємо з завершеним минулим періодом, а had been collected це пасив, а Мері сама збирала.' },
        { options: ['had lain', 'has lain', 'lies', 'was lying'], answer: 0, why: 'Скелет лежав у скелях мільйони років ДО того, як його знайшли (discovered). Дія, що тривала до іншої минулої події: Past Perfect had lain. Lie, lay, lain: неправильне дієслово «лежати».' },
        { options: ['extremely', 'extreme', 'extremity', 'extremes'], answer: 0, why: 'Перед прикметником important потрібен прислівник: extremely important (надзвичайно важливі). Extreme це прикметник, extremity і extremes іменники.' },
        { options: ['is remembered', 'remembers', 'remembered', 'is remembering'], answer: 0, why: 'Сьогодні (Today) люди пам’ятають Аннінг, вона сама не «пам’ятає». Потрібен пасив у теперішньому часі: is remembered.' },
        { options: ['Although', 'Despite', 'However', 'Because'], answer: 0, why: 'Два протилежні факти: життя було важким, але вона не припиняла вчитися. Після пропуску ціле речення з дієсловом (her life was difficult), тому Although. Despite вимагає іменника (Despite the difficulties), However ставимо на початку окремого речення з комою, Because не передає протиставлення.' },
      ],
    },
  ],
};
