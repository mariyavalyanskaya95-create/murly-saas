// Додаткові пісні (частина D): популярне зараз у дітей і підлітків. Тексти пісень не публікуємо.
import type { Song } from './songs';
import type { SongLesson } from './songs-more';
import type { SongDeep } from './songs-deep';

export const SONGS_EXTRA2: Song[] = [
  {
    id: 'golden', artist: 'HUNTR/X (EJAE, Audrey Nuna, Rei Ami)', title: 'Golden', yt: 'yebNIHKAC4A', year: 2025, level: 'A2-B1', age: 'all',
    about: { uk: 'Головна пісня анімаційного фільму «KPop-мисливиці на демонів». Три співачки вигаданого гурту HUNTR/X на сцені зірки, а таємно ще й героїні. Пісня про те, як нарешті засяяти, перестати ховати себе справжнього і бути сильними разом. Окремого кліпу немає, тому тут офіційне лірик-відео.', ru: 'Главная песня анимационного фильма «KPop-охотницы на демонов». Три певицы вымышленной группы HUNTR/X на сцене звёзды, а тайно ещё и героини. Песня о том, как наконец засиять, перестать прятать себя настоящего и быть сильными вместе. Отдельного клипа нет, поэтому здесь официальное лирик-видео.', en: 'The main song from the animated film KPop Demon Hunters. The three singers of the fictional group HUNTR/X are stars on stage and secretly heroes too. The song is about finally shining, not hiding the real you and being strong together. There is no separate music video, so this is the official lyric video.' },
    grammar: { uk: 'Ступені порівняння прикметників: bright, brighter, the brightest; good, better, the best. We are stronger together.', ru: 'Степени сравнения прилагательных: bright, brighter, the brightest; good, better, the best. We are stronger together.', en: 'Comparatives and superlatives: bright, brighter, the brightest; good, better, the best. We are stronger together.' },
    phrases: [
      { en: 'to shine bright', m: { uk: 'яскраво сяяти, показати свій талант', ru: 'ярко сиять, показать свой талант', en: 'show your talent and be noticed' }, ex: 'On the day of the concert, the whole choir shone bright.' },
      { en: 'to be yourself', m: { uk: 'бути собою', ru: 'быть собой', en: 'act naturally, don’t pretend' }, ex: 'You don’t need to copy anyone. Just be yourself.' },
      { en: 'to hide', m: { uk: 'ховати(ся)', ru: 'прятать(ся)', en: 'keep something or yourself out of sight' }, ex: 'My little brother hides under the table when he’s shy.' },
      { en: 'stronger together', m: { uk: 'разом ми сильніші', ru: 'вместе мы сильнее', en: 'we are better as a team' }, ex: 'Our team lost alone, but we are stronger together.' },
      { en: 'a dream come true', m: { uk: 'мрія, що здійснилася', ru: 'мечта, которая сбылась', en: 'something you wanted very much that happened' }, ex: 'Singing on a real stage was a dream come true.' },
    ],
    talk: ['When do you feel that you shine?', 'Is it better to work alone or in a team? Why?', 'Who is your favourite character in KPop Demon Hunters?'],
  },
  {
    id: 'soda-pop', artist: 'Saja Boys', title: 'Soda Pop', yt: '983bBbJx0Mk', year: 2025, level: 'A2', age: 'all',
    about: { uk: 'Дуже прилипливий і «солодкий» поп-хіт вигаданого бой-бенду Saja Boys із фільму «KPop-мисливиці на демонів». Пісня про чарівність, фанатів і щось солодке, від чого важко відмовитися. У фільмі хлопці насправді лиходії, тож це гарний привід поговорити, чому не варто довіряти блискучій обгортці. Окремого кліпу немає, тому тут офіційне лірик-відео.', ru: 'Очень прилипчивый и «сладкий» поп-хит вымышленного бойз-бенда Saja Boys из фильма «KPop-охотницы на демонов». Песня об обаянии, фанатах и чём-то сладком, от чего трудно отказаться. В фильме ребята на самом деле злодеи, так что это хороший повод поговорить, почему не стоит доверять блестящей обёртке. Отдельного клипа нет, поэтому здесь официальное лирик-видео.', en: 'A very catchy, sugary pop hit by the fictional boy band Saja Boys from the film KPop Demon Hunters. It is about charm, fans and something sweet that is hard to say no to. In the film the boys are really the villains, so it is a good chance to talk about why we shouldn’t trust a shiny image. There is no separate music video, so this is the official lyric video.' },
    grammar: { uk: 'Злічувані й незлічувані іменники: some/any, much/many, a can of soda, a bottle of water. How much sugar? How many sweets?', ru: 'Исчисляемые и неисчисляемые существительные: some/any, much/many, a can of soda, a bottle of water. How much sugar? How many sweets?', en: 'Countable and uncountable nouns: some/any, much/many, a can of soda, a bottle of water. How much sugar? How many sweets?' },
    phrases: [
      { en: 'catchy', m: { uk: 'прилипливий (про мелодію)', ru: 'прилипчивый (о мелодии)', en: 'easy to remember and hard to forget' }, ex: 'This advert has a really catchy tune.' },
      { en: 'to get stuck in your head', m: { uk: 'застрягти в голові (про пісню)', ru: 'застрять в голове (о песне)', en: 'keep playing in your mind' }, ex: 'That song got stuck in my head all day.' },
      { en: 'a fan', m: { uk: 'фанат, шанувальник', ru: 'фанат, поклонник', en: 'a person who loves a singer, team or show' }, ex: 'My cousin is a huge fan of K-pop.' },
      { en: 'a sweet tooth', m: { uk: 'любов до солодкого, ласун', ru: 'любовь к сладкому, сладкоежка', en: 'a love of sweet food' }, ex: 'Grandpa has a sweet tooth, he always has candy in his pocket.' },
      { en: 'too good to be true', m: { uk: 'занадто добре, щоб бути правдою', ru: 'слишком хорошо, чтобы быть правдой', en: 'so good that it is probably not real' }, ex: 'A free phone for one click? That’s too good to be true.' },
    ],
    talk: ['Which song is stuck in your head this week?', 'Do you have a sweet tooth? What is your favourite sweet drink?', 'Can a person look nice but not be nice? How can you tell?'],
  },
  {
    id: 'ordinary', artist: 'Alex Warren', title: 'Ordinary', yt: 'NaZznqme2hg', year: 2025, level: 'B1', age: 'teens',
    about: { uk: 'Велика емоційна балада про кохання: коли поруч кохана людина, звичайне життя здається незвичайним, майже чарівним. Тут офіційне весільне відео до пісні (Wedding Version), а оригінальний запис є в офіційному лірик-відео нижче.', ru: 'Большая эмоциональная баллада о любви: когда рядом любимый человек, обычная жизнь кажется необычной, почти волшебной. Здесь официальное свадебное видео к песне (Wedding Version), а оригинальная запись есть в официальном лирик-видео ниже.', en: 'A big, emotional love ballad: when the person you love is near, ordinary life feels extraordinary, almost magical. This is the official wedding version music video, and the original recording is in the official lyric video below.' },
    grammar: { uk: 'Префікси, що змінюють значення: ordinary і extraordinary, usual і unusual, possible і impossible. А ще make + об’єкт + прикметник: You make me happy.', ru: 'Префиксы, которые меняют значение: ordinary и extraordinary, usual и unusual, possible и impossible. А ещё make + объект + прилагательное: You make me happy.', en: 'Prefixes that change meaning: ordinary and extraordinary, usual and unusual, possible and impossible. Also make + object + adjective: You make me happy.' },
    phrases: [
      { en: 'out of this world', m: { uk: 'неймовірний, «неземний»', ru: 'невероятный, «неземной»', en: 'amazing, unbelievably good' }, ex: 'Grandma’s cherry pie is out of this world.' },
      { en: 'to mean the world to someone', m: { uk: 'бути дуже важливим для когось', ru: 'быть очень важным для кого-то', en: 'be extremely important to someone' }, ex: 'My little brother means the world to me.' },
      { en: 'to fall for someone', m: { uk: 'закохатися в когось', ru: 'влюбиться в кого-то', en: 'start to love someone' }, ex: 'In the film, the baker falls for a famous singer.' },
      { en: 'larger than life', m: { uk: 'яскравий, помітніший за всіх', ru: 'яркий, заметнее всех', en: 'more exciting and impressive than normal' }, ex: 'Our music teacher is larger than life, everyone remembers her.' },
      { en: 'to sweep someone off their feet', m: { uk: 'зачарувати, підкорити когось', ru: 'очаровать, покорить кого-то', en: 'make someone fall in love quickly' }, ex: 'He swept her off her feet with a song he wrote himself.' },
    ],
    talk: ['What ordinary thing in your day feels special to you?', 'Who means the world to you? Why?', 'Do you prefer big emotional songs or calm songs? Why?'],
  },
  {
    id: 'beautiful-things', artist: 'Benson Boone', title: 'Beautiful Things', yt: 'Oa_RSwwpPaA', year: 2024, level: 'B1', age: 'teens',
    about: { uk: 'Пісня про людину, у якої нарешті все добре: кохання, родина, спокій. І саме тому з’являється страх усе це втратити. Про тривогу і вдячність водночас. Пісня починається тихо, а потім вибухає гучною потужною частиною.', ru: 'Песня о человеке, у которого наконец всё хорошо: любовь, семья, спокойствие. И именно поэтому появляется страх всё это потерять. О тревоге и благодарности одновременно. Песня начинается тихо, а потом взрывается громкой мощной частью.', en: 'A song about someone who finally has good things in life: love, family and calm. And that is exactly why they are afraid of losing it all. It is about worry and gratitude at the same time. It starts quietly and then explodes into a loud, powerful part.' },
    grammar: { uk: 'Be afraid of + -ing і be afraid to + дієслово: I’m afraid of losing my phone. I’m afraid to ask. А також can’t help + -ing: I can’t help smiling.', ru: 'Be afraid of + -ing и be afraid to + глагол: I’m afraid of losing my phone. I’m afraid to ask. А также can’t help + -ing: I can’t help smiling.', en: 'Be afraid of + -ing and be afraid to + verb: I’m afraid of losing my phone. I’m afraid to ask. Also can’t help + -ing: I can’t help smiling.' },
    phrases: [
      { en: 'to count your blessings', m: { uk: 'цінувати те добре, що маєш', ru: 'ценить то хорошее, что имеешь', en: 'be thankful for the good things you have' }, ex: 'When I feel sad, I count my blessings: family, friends and my dog.' },
      { en: 'to take something for granted', m: { uk: 'сприймати як належне', ru: 'воспринимать как должное', en: 'not notice how valuable something is' }, ex: 'Don’t take your health for granted.' },
      { en: 'peace of mind', m: { uk: 'душевний спокій', ru: 'душевное спокойствие', en: 'a calm feeling with no worries' }, ex: 'I back up my photos for peace of mind.' },
      { en: 'to hold on to', m: { uk: 'триматися за щось, берегти', ru: 'держаться за что-то, беречь', en: 'keep something and not lose it' }, ex: 'Hold on to your ticket, we need it at the exit.' },
      { en: 'to be on edge', m: { uk: 'нервувати, бути на взводі', ru: 'нервничать, быть на взводе', en: 'feel nervous and worried' }, ex: 'I was on edge all morning before my results came.' },
    ],
    talk: ['What are three good things in your life you never want to lose?', 'What do people often take for granted?', 'What helps you feel calm when you are on edge?'],
  },
  {
    id: 'drivers-license', artist: 'Olivia Rodrigo', title: 'drivers license', yt: 'ZmDBbnmKpqQ', year: 2021, level: 'B1', age: 'teens',
    about: { uk: 'Сумна, але дуже щира пісня про перше розбите серце. Дівчина нарешті отримала водійські права, про які так мріяла, і хотіла розділити цю мить із близькою людиною, але стосунки вже закінчилися. Тепер вона їздить сама повз знайомі місця і сумує. Пісня про дорослішання і про те, що навіть найважчі почуття з часом минають.', ru: 'Грустная, но очень искренняя песня о первом разбитом сердце. Девушка наконец получила водительские права, о которых так мечтала, и хотела разделить этот момент с близким человеком, но отношения уже закончились. Теперь она ездит одна мимо знакомых мест и грустит. Песня о взрослении и о том, что даже самые тяжёлые чувства со временем проходят.', en: 'A sad but very honest song about a first broken heart. A girl finally gets the driving licence she dreamed of and wanted to share that moment with someone special, but the relationship is over. Now she drives alone past familiar places and feels sad. It is a song about growing up and about how even the hardest feelings pass with time.' },
    grammar: { uk: 'Past Simple і Past Continuous: I was driving home when it started to rain. Довга дія в минулому (was/were + -ing) і коротка подія, яка її перервала (Past Simple).', ru: 'Past Simple и Past Continuous: I was driving home when it started to rain. Длительное действие в прошлом (was/were + -ing) и короткое событие, которое его прервало (Past Simple).', en: 'Past Simple and Past Continuous: I was driving home when it started to rain. A longer action in the past (was/were + -ing) and a short event that interrupted it (Past Simple).' },
    phrases: [
      { en: 'a driving licence', m: { uk: 'водійські права, посвідчення водія', ru: 'водительские права', en: 'an official card that allows you to drive' }, ex: 'My brother got his driving licence last week and now he drives us to school.' },
      { en: 'to pass a driving test', m: { uk: 'скласти іспит з водіння', ru: 'сдать экзамен по вождению', en: 'succeed in the exam for drivers' }, ex: 'She passed her driving test on the second try.' },
      { en: 'to break someone’s heart', m: { uk: 'розбити комусь серце', ru: 'разбить кому-то сердце', en: 'make someone very sad, usually in love' }, ex: 'When my best friend moved away, it broke my heart.' },
      { en: 'to get over someone', m: { uk: 'оговтатися після розставання, забути когось', ru: 'оправиться после расставания, забыть кого-то', en: 'stop feeling sad about someone after a break-up' }, ex: 'It took her a few months to get over him, but now she is happy again.' },
      { en: 'to miss someone', m: { uk: 'сумувати за кимось', ru: 'скучать по кому-то', en: 'feel sad because someone is not with you' }, ex: 'I miss my cousins, they live in another city.' },
    ],
    talk: ['Would you like to learn to drive? Why or why not?', 'What do you do when you feel sad?', 'Which place in your town brings back memories for you?'],
  },
  {
    id: 'as-it-was', artist: 'Harry Styles', title: 'As It Was', yt: 'H5v3kku4y6Q', year: 2022, level: 'B1', age: 'teens',
    about: { uk: 'Пісня про те, як змінюється життя: усе вже не так, як було раніше, і людина почувається трохи самотньою у світі, що змінюється. Цікаво, що музика при цьому світла, швидка і весела, тож під неї хочеться танцювати. У кліпі Гаррі та танцівниця кружляють на великій сцені, що обертається, у червоному і синьому костюмах.', ru: 'Песня о том, как меняется жизнь: всё уже не так, как было раньше, и человек чувствует себя немного одиноким в меняющемся мире. Интересно, что музыка при этом светлая, быстрая и весёлая, так что под неё хочется танцевать. В клипе Гарри и танцовщица кружатся на большой вращающейся сцене, в красном и синем костюмах.', en: 'A song about how life changes: things are not the same as before, and the person feels a little lonely in a changing world. Interestingly, the music is bright, fast and cheerful, so it makes you want to dance. In the video Harry and a dancer spin on a big rotating stage in red and blue costumes.' },
    grammar: { uk: 'Порівняння: the same as, different from, not as ... as. Зміни: used to і not ... anymore. My town is different from how it used to be. We don’t play outside anymore.', ru: 'Сравнение: the same as, different from, not as ... as. Изменения: used to и not ... anymore. My town is different from how it used to be. We don’t play outside anymore.', en: 'Comparing: the same as, different from, not as ... as. Changes: used to and not ... anymore. My town is different from how it used to be. We don’t play outside anymore.' },
    phrases: [
      { en: 'to be the same as before', m: { uk: 'бути таким, як раніше', ru: 'быть таким, как раньше', en: 'not change at all' }, ex: 'After the summer, my best friend wasn’t the same as before, he was taller and quieter.' },
      { en: 'things have changed', m: { uk: 'усе змінилося', ru: 'всё изменилось', en: 'life is different now' }, ex: 'Things have changed since we moved to a new flat.' },
      { en: 'to grow apart', m: { uk: 'віддалитися одне від одного', ru: 'отдалиться друг от друга', en: 'slowly become less close to someone' }, ex: 'We were best friends in primary school, but we grew apart.' },
      { en: 'to feel left out', m: { uk: 'почуватися зайвим, осторонь', ru: 'чувствовать себя лишним, в стороне', en: 'feel that others don’t include you' }, ex: 'I felt left out when everyone talked about a game I didn’t know.' },
      { en: 'to go back to normal', m: { uk: 'повернутися до звичного життя', ru: 'вернуться к обычной жизни', en: 'become usual again after a change' }, ex: 'After the holidays, everything went back to normal.' },
    ],
    talk: ['What has changed in your life in the last two years?', 'Is it easy for you to get used to changes?', 'Can a happy song be about something sad? Give an example.'],
  },
  {
    id: 'flowers', artist: 'Miley Cyrus', title: 'Flowers', yt: 'G7KNmW9a75Y', year: 2023, level: 'A2-B1', age: 'teens',
    about: { uk: 'Спокійна і впевнена пісня про життя після розставання. Героїня розуміє, що може сама подбати про себе, бути щасливою без іншої людини і радіти простим речам. Пісня про любов до себе і незалежність. У кліпі Майлі в золотій сукні гуляє Лос-Анджелесом, плаває й тренується вдома.', ru: 'Спокойная и уверенная песня о жизни после расставания. Героиня понимает, что может сама позаботиться о себе, быть счастливой без другого человека и радоваться простым вещам. Песня о любви к себе и независимости. В клипе Майли в золотом платье гуляет по Лос-Анджелесу, плавает и тренируется дома.', en: 'A calm, confident song about life after a breakup. The woman realises she can take care of herself, be happy without another person and enjoy simple things. It is a song about self-love and independence. In the video Miley walks around Los Angeles in a gold dress, swims and works out at home.' },
    grammar: { uk: 'Зворотні займенники: myself, yourself, herself, ourselves. I made it myself. І вирази by myself та on my own (сам, без допомоги).', ru: 'Возвратные местоимения: myself, yourself, herself, ourselves. I made it myself. И выражения by myself и on my own (сам, без помощи).', en: 'Reflexive pronouns: myself, yourself, herself, ourselves. I made it myself. And the phrases by myself and on my own (alone, without help).' },
    phrases: [
      { en: 'to take care of yourself', m: { uk: 'дбати про себе', ru: 'заботиться о себе', en: 'look after your own needs' }, ex: 'When you are tired, take care of yourself and go to bed early.' },
      { en: 'to treat yourself', m: { uk: 'побалувати себе', ru: 'побаловать себя', en: 'buy or do something nice for yourself' }, ex: 'I got a good mark, so I treated myself to an ice cream.' },
      { en: 'on my own', m: { uk: 'сам(а), самостійно', ru: 'сам(а), самостоятельно', en: 'alone, without help' }, ex: 'I built this model plane on my own.' },
      { en: 'to move on', m: { uk: 'жити далі, відпустити минуле', ru: 'жить дальше, отпустить прошлое', en: 'stop thinking about the past and continue' }, ex: 'We lost the match, but it’s time to move on and train for the next one.' },
      { en: 'self-love', m: { uk: 'любов до себе', ru: 'любовь к себе', en: 'being kind to and caring about yourself' }, ex: 'Self-love means you don’t speak badly about yourself.' },
    ],
    talk: ['How do you treat yourself after a hard week?', 'What can you do on your own that you couldn’t do five years ago?', 'Is it OK to spend a day by yourself? What would you do?'],
  },
  {
    id: 'zoo', artist: 'Shakira', title: 'Zoo', yt: 'Kw3935PH01E', year: 2025, level: 'A2', age: 'all',
    about: { uk: 'Весела танцювальна пісня з мультфільму «Зоотрополіс 2». Вона про велике місто тварин, де всі різні, але кожен тут свій. Час веселитися, забути про турботи й танцювати разом. У кліпі Шакіра в ролі своєї героїні Газелі разом із Джуді Гоппс, Ніком Вайлдом і змієм Гері, а танцпол перетворюється на справжній зоопарк.', ru: 'Весёлая танцевальная песня из мультфильма «Зверополис 2». Она о большом городе животных, где все разные, но каждый здесь свой. Время веселиться, забыть о заботах и танцевать вместе. В клипе Шакира в роли своей героини Газели вместе с Джуди Хоппс, Ником Уайлдом и змеем Гэри, а танцпол превращается в настоящий зоопарк.', en: 'A happy dance song from the animated film Zootopia 2. It is about a big city of animals where everyone is different but everyone belongs. It is time to have fun, forget your worries and dance together. In the video Shakira plays her character Gazelle with Judy Hopps, Nick Wilde and Gary De’Snake, and the dance floor turns into a real zoo.' },
    grammar: { uk: 'Порівняння: fast, faster than, the fastest. As tall as (такий самий високий, як). A cheetah is faster than a rabbit.', ru: 'Сравнение: fast, faster than, the fastest. As tall as (такой же высокий, как). A cheetah is faster than a rabbit.', en: 'Comparisons: fast, faster than, the fastest. As tall as means the same height. A cheetah is faster than a rabbit.' },
    phrases: [
      { en: 'a zoo', m: { uk: 'зоопарк; (розмовне) гамір, безлад', ru: 'зоопарк; (разговорное) шум, бардак', en: 'a place with animals; also a very noisy, crazy place' }, ex: 'Our classroom was a zoo before the teacher came in.' },
      { en: 'to let loose', m: { uk: 'розслабитися, дати собі волю', ru: 'расслабиться, дать себе волю', en: 'relax and have fun without worrying' }, ex: 'After the exams we let loose at the school disco.' },
      { en: 'to hit the dance floor', m: { uk: 'вийти танцювати', ru: 'выйти танцевать', en: 'start dancing at a party' }, ex: 'When my favourite song started, I hit the dance floor.' },
      { en: 'to belong', m: { uk: 'належати, бути своїм', ru: 'принадлежать, быть своим', en: 'feel that a place or group is right for you' }, ex: 'In our drama club everyone feels they belong.' },
      { en: 'to go wild', m: { uk: 'шаленіти від радості', ru: 'сходить с ума от радости', en: 'get very excited and loud' }, ex: 'The fans went wild when the band came on stage.' },
    ],
    talk: ['Which animal would you be in Zootopia? Why?', 'Which animal is the fastest? Which is the biggest?', 'Do you like dancing at parties? What song makes you hit the dance floor?'],
  },
  {
    id: 'azizam', artist: 'Ed Sheeran', title: 'Azizam', yt: 'MI9ZpIKgyf0', year: 2025, level: 'A2-B1', age: 'all',
    about: { uk: 'Радісна танцювальна пісня про любов: коли поруч твоя найдорожча людина, усе навколо стає яскравішим і хочеться танцювати та святкувати. У пісні поп-музика поєднується зі звучанням перської (іранської) музики. Слово azizam перською означає «мій дорогий, моя дорога».', ru: 'Радостная танцевальная песня о любви: когда рядом твой самый дорогой человек, всё вокруг становится ярче и хочется танцевать и праздновать. В песне поп-музыка сочетается со звучанием персидской (иранской) музыки. Слово azizam по-персидски значит «мой дорогой, моя дорогая».', en: 'A joyful dance song about love: when your dearest person is with you, everything looks brighter and you want to dance and celebrate. The song mixes pop with the sound of Persian (Iranian) music. The word azizam means my dear in Persian.' },
    grammar: { uk: 'Make + хтось + дієслово або прикметник: You make me smile. Music makes me happy. Після make дієслово без to.', ru: 'Make + кто-то + глагол или прилагательное: You make me smile. Music makes me happy. После make глагол без to.', en: 'Make + someone + verb or adjective: You make me smile. Music makes me happy. No to after make.' },
    phrases: [
      { en: 'my dear', m: { uk: 'мій дорогий, моя дорога', ru: 'мой дорогой, моя дорогая', en: 'a warm way to talk to someone you love' }, ex: 'Come in, my dear, the tea is ready.' },
      { en: 'to light up', m: { uk: 'засяяти, освітити', ru: 'засиять, осветить', en: 'become bright or make something bright' }, ex: 'Her face lit up when she saw the puppy.' },
      { en: 'to make someone smile', m: { uk: 'викликати в когось усмішку', ru: 'вызвать у кого-то улыбку', en: 'do something that makes a person happy' }, ex: 'My little brother’s jokes always make me smile.' },
      { en: 'to dance the night away', m: { uk: 'танцювати весь вечір', ru: 'танцевать весь вечер', en: 'dance for many hours and have fun' }, ex: 'At my cousin’s birthday we danced the night away.' },
      { en: 'to mean the world to someone', m: { uk: 'бути для когось усім', ru: 'быть для кого-то всем', en: 'be very important to someone' }, ex: 'My grandma means the world to me.' },
    ],
    talk: ['What song always makes you want to dance?', 'Who means the world to you? Why?', 'Do you know any warm words like my dear in other languages?'],
  },
  {
    id: 'opalite', artist: 'Taylor Swift', title: 'Opalite', yt: '1FVF-9KQiPo', year: 2025, level: 'B1', age: 'teens',
    about: { uk: 'Світла пісня про те, як після важкого, похмурого періоду людина вчиться сама створювати своє щастя, а не чекати його. Вона пробачає собі помилки й рухається далі, до чогось яскравого. Опаліт це штучний, зроблений людьми різновид опалу. Кліп це дивакувата комедія з відомими акторами, тому радимо вчителю спершу переглянути його.', ru: 'Светлая песня о том, как после тяжёлого, мрачного периода человек учится сам создавать своё счастье, а не ждать его. Он прощает себе ошибки и движется дальше, к чему-то яркому. Опалит это искусственный, созданный людьми вид опала. Клип это чудаковатая комедия с известными актёрами, поэтому советуем учителю сначала его посмотреть.', en: 'A bright song about how, after a hard and gloomy time, a person learns to create their own happiness instead of waiting for it. They forgive themselves and move on to something bright. Opalite is a man-made version of the opal stone. The video is a quirky comedy with famous actors, so teachers should watch it first.' },
    grammar: { uk: 'Make чи do: make a decision, make a change, make a mistake, make friends; do homework, do your best, do sport. Make ми вживаємо, коли щось створюємо.', ru: 'Make или do: make a decision, make a change, make a mistake, make friends; do homework, do your best, do sport. Make мы используем, когда что-то создаём.', en: 'Make or do: make a decision, make a change, make a mistake, make friends; do homework, do your best, do sport. We use make when we create something.' },
    phrases: [
      { en: 'to look on the bright side', m: { uk: 'бачити хороше в ситуації', ru: 'видеть хорошее в ситуации', en: 'find the good part of a bad situation' }, ex: 'We missed the bus, but look on the bright side, we can walk in the sun.' },
      { en: 'to move on', m: { uk: 'рухатися далі, відпустити минуле', ru: 'двигаться дальше, отпустить прошлое', en: 'stop thinking about the past and continue' }, ex: 'Our team lost, but it’s time to move on and train for the next match.' },
      { en: 'to forgive yourself', m: { uk: 'пробачити собі', ru: 'простить себя', en: 'stop being angry with yourself' }, ex: 'You forgot her birthday once. Say sorry and forgive yourself.' },
      { en: 'a fresh start', m: { uk: 'новий початок', ru: 'новое начало', en: 'a chance to begin again' }, ex: 'Moving to a new class was a fresh start for me.' },
      { en: 'to make your own luck', m: { uk: 'самому творити свою удачу', ru: 'самому создавать свою удачу', en: 'get good results through your own effort' }, ex: 'She practised every day. She made her own luck.' },
    ],
    talk: ['What do you do to cheer yourself up after a bad day?', 'Is it easy for you to forgive yourself for a mistake?', 'Can people make their own happiness? How?'],
  },
];

export const MORE_D: Record<string, SongLesson> = {
  'golden': {
    facts: [
      { uk: 'Пісня з анімаційного фільму «KPop-мисливиці на демонів», який створила студія Sony Pictures Animation. Фільм вийшов на Netflix у червні 2025 року.', ru: 'Песня из анимационного фильма «KPop-охотницы на демонов», который создала студия Sony Pictures Animation. Фильм вышел на Netflix в июне 2025 года.', en: 'The song comes from the animated film KPop Demon Hunters, made by Sony Pictures Animation. The film came out on Netflix in June 2025.' },
      { uk: 'HUNTR/X це вигадане тріо: Румі, Міра і Зої. Співають за них EJAE (Румі), Audrey Nuna (Міра) і Rei Ami (Зої).', ru: 'HUNTR/X это вымышленное трио: Руми, Мира и Зои. Поют за них EJAE (Руми), Audrey Nuna (Мира) и Rei Ami (Зои).', en: 'HUNTR/X is a fictional trio: Rumi, Mira and Zoey. Their singing voices are EJAE (Rumi), Audrey Nuna (Mira) and Rei Ami (Zoey).' },
      { uk: 'EJAE не лише співає партію Румі, а й є однією з авторок пісні.', ru: 'EJAE не только поёт партию Руми, но и является одним из авторов песни.', en: 'EJAE not only sings as Rumi, she is also one of the song’s writers.' },
      { uk: 'У 2025 році пісня провела 8 тижнів на першому місці чарту Billboard Hot 100.', ru: 'В 2025 году песня провела 8 недель на первом месте чарта Billboard Hot 100.', en: 'In 2025 the song spent 8 weeks at number one on the Billboard Hot 100.' },
      { uk: 'Пісня отримала «Золотий глобус», «Греммі» в категорії «Найкраща пісня для візуальних медіа» (перша «Греммі» для K-pop) і «Оскар» за найкращу оригінальну пісню 2026 року.', ru: 'Песня получила «Золотой глобус», «Грэмми» в категории «Лучшая песня для визуальных медиа» (первая «Грэмми» для K-pop) и «Оскар» за лучшую оригинальную песню 2026 года.', en: 'The song won a Golden Globe, the Grammy for Best Song Written for Visual Media (the first Grammy for a K-pop act) and the 2026 Oscar for Best Original Song.' },
    ],
    warmup: [
      'Have you seen KPop Demon Hunters? Did you like it?',
      'What does the word golden make you think of?',
      'Do you like singing? Where do you sing: at home, at school, in the shower?',
    ],
    vocab: [
      {
        group: { uk: 'Сцена і музика', ru: 'Сцена и музыка', en: 'Stage and music' },
        items: [
          { en: 'a girl group', uk: 'дівочий гурт', ru: 'девичья группа', ex: 'My sister and her friends started a girl group.' },
          { en: 'a concert', uk: 'концерт', ru: 'концерт', ex: 'We went to a concert in the park last summer.' },
          { en: 'a fan', uk: 'фанат, шанувальник', ru: 'фанат, поклонник', ex: 'The fans waited for the band for three hours.' },
          { en: 'a high note', uk: 'висока нота', ru: 'высокая нота', ex: 'She can sing a really high note.' },
          { en: 'to perform', uk: 'виступати', ru: 'выступать', ex: 'Our class will perform a song on Friday.' },
        ],
      },
      {
        group: { uk: 'Світло і сяйво', ru: 'Свет и сияние', en: 'Light and shine' },
        items: [
          { en: 'golden', uk: 'золотий, золотистий', ru: 'золотой, золотистый', ex: 'The sky was golden at sunset.' },
          { en: 'bright', uk: 'яскравий', ru: 'яркий', ex: 'Her bright smile made everyone happy.' },
          { en: 'to shine', uk: 'сяяти, світити', ru: 'сиять, светить', ex: 'The sun is shining today.' },
          { en: 'to glow', uk: 'світитися, жевріти', ru: 'светиться, мерцать', ex: 'The stars on my ceiling glow in the dark.' },
          { en: 'a spotlight', uk: 'прожектор; центр уваги', ru: 'прожектор; центр внимания', ex: 'The spotlight followed the singer across the stage.' },
        ],
      },
      {
        group: { uk: 'Сила і дружба', ru: 'Сила и дружба', en: 'Strength and friendship' },
        items: [
          { en: 'brave', uk: 'сміливий', ru: 'смелый', ex: 'It was brave of you to sing alone.' },
          { en: 'a hero', uk: 'герой, героїня', ru: 'герой, героиня', ex: 'In the cartoon, the girls are secret heroes.' },
          { en: 'a secret', uk: 'таємниця, секрет', ru: 'тайна, секрет', ex: 'Can you keep a secret?' },
          { en: 'to believe in', uk: 'вірити в', ru: 'верить в', ex: 'My coach believes in me.' },
          { en: 'a team', uk: 'команда', ru: 'команда', ex: 'We work as a team in science lessons.' },
        ],
      },
    ],
    grammar: {
      uk: 'Ступені порівняння прикметників допомагають сказати, хто чи що яскравіше, сильніше, найкраще. Короткі прикметники: bright, brighter, the brightest; strong, stronger, the strongest. Якщо слово закінчується на -y: happy, happier, the happiest. Довгі прикметники: beautiful, more beautiful, the most beautiful. Неправильні форми треба запам’ятати: good, better, the best; bad, worse, the worst. Порівнюємо зі словом than: Mira is taller than Zoey. Найвищий ступінь вживаємо з the: It’s the best song in the film. Ідея пісні добре звучить так: We are stronger together.',
      ru: 'Степени сравнения прилагательных помогают сказать, кто или что ярче, сильнее, лучше всех. Короткие прилагательные: bright, brighter, the brightest; strong, stronger, the strongest. Если слово заканчивается на -y: happy, happier, the happiest. Длинные прилагательные: beautiful, more beautiful, the most beautiful. Неправильные формы нужно запомнить: good, better, the best; bad, worse, the worst. Сравниваем со словом than: Mira is taller than Zoey. Превосходную степень используем с the: It’s the best song in the film. Идея песни хорошо звучит так: We are stronger together.',
      en: 'Comparatives and superlatives help us say who or what is brighter, stronger or the best. Short adjectives: bright, brighter, the brightest; strong, stronger, the strongest. Words ending in -y: happy, happier, the happiest. Long adjectives: beautiful, more beautiful, the most beautiful. Learn the irregular forms: good, better, the best; bad, worse, the worst. Compare with than: Mira is taller than Zoey. Use the with superlatives: It’s the best song in the film. The idea of the song fits nicely here: We are stronger together.',
    },
    grammarEx: [
      { q: 'The sun is ___ than the moon.', opts: ['brighter', 'brightest', 'more bright'], a: 'brighter' },
      { q: 'This is the ___ song in the film!', opts: ['best', 'better', 'good'], a: 'best' },
      { q: 'We are ___ together than alone.', opts: ['stronger', 'strongest', 'more strong'], a: 'stronger' },
      { q: 'Rumi is the ___ singer in the group.', opts: ['most famous', 'famouser', 'more famous'], a: 'most famous' },
      { q: 'Today I feel ___ than yesterday.', opts: ['happier', 'happyer', 'more happy'], a: 'happier' },
      { q: 'My voice is ___ than my brother’s.', opts: ['higher', 'highest', 'more high'], a: 'higher' },
      { q: 'That was the ___ concert of my life!', opts: ['most exciting', 'excitingest', 'more exciting'], a: 'most exciting' },
      { q: 'The rain was bad, but the wind was ___.', opts: ['worse', 'worst', 'badder'], a: 'worse' },
    ],
    gapfill: [
      { q: 'At sunset the sea looks ___.', a: 'golden' },
      { q: 'Look at the stars. They ___ so brightly tonight.', a: 'shine' },
      { q: 'Thousands of ___ came to see the band.', a: 'fans' },
      { q: 'It was very ___ of you to talk to the new girl.', a: 'brave' },
      { q: 'Don’t tell anyone. It’s a ___.', a: 'secret' },
      { q: 'The singer stood in the ___ in the middle of the stage.', a: 'spotlight' },
      { q: 'We won because we played as a ___.', a: 'team' },
      { q: 'My parents always ___ in me.', a: 'believe' },
    ],
    listen: [
      { uk: 'Послухай початок. Пісня починається тихо чи одразу голосно?', ru: 'Послушай начало. Песня начинается тихо или сразу громко?', en: 'Listen to the beginning. Does the song start quietly or loudly?' },
      { uk: 'Порахуй, скільки разів ти чуєш слово golden.', ru: 'Посчитай, сколько раз ты слышишь слово golden.', en: 'Count how many times you hear the word golden.' },
      { uk: 'Послухай, де співачки беруть дуже високі ноти. Підніми руку, коли почуєш таку ноту.', ru: 'Послушай, где певицы берут очень высокие ноты. Подними руку, когда услышишь такую ноту.', en: 'Listen for the very high notes. Put your hand up when you hear one.' },
      { uk: 'Ти чуєш один голос чи кілька? Коли співають усі разом?', ru: 'Ты слышишь один голос или несколько? Когда поют все вместе?', en: 'Can you hear one voice or several? When do they all sing together?' },
    ],
    speaking: [
      'What makes you feel golden, happy and proud?',
      'Who in your life helps you shine?',
      'Would you like to be in a music group? What would you call it?',
      'Is it hard to show your talent to other people? Why?',
      'Why do you think this song became so popular around the world?',
      'What is the best film you have seen this year?',
    ],
    roleplay: {
      uk: 'A: ти співак(-чка), який(-а) дуже хвилюється перед першим концертом. B: ти друг або подруга з гурту. Підбадьор A, нагадай про його сильні сторони і запропонуй, що зробити разом перед виходом на сцену.',
      ru: 'A: ты певец (певица), который(-ая) очень волнуется перед первым концертом. B: ты друг или подруга из группы. Подбодри A, напомни о его сильных сторонах и предложи, что сделать вместе перед выходом на сцену.',
      en: 'A: you are a singer who is very nervous before your first concert. B: you are a friend from the band. Cheer A up, remind them of their strengths and suggest what you can do together before going on stage.',
    },
    writing: {
      uk: 'Напиши короткий текст (50-80 слів) «Мій золотий момент». Розкажи про день, коли ти почувався(-лася) сильним(-ою) і щасливим(-ою). Використай щонайменше два прикметники у вищому або найвищому ступені.',
      ru: 'Напиши короткий текст (50-80 слов) «Мой золотой момент». Расскажи о дне, когда ты чувствовал(а) себя сильным(-ой) и счастливым(-ой). Используй как минимум два прилагательных в сравнительной или превосходной степени.',
      en: 'Write a short text (50-80 words) called My golden moment. Describe a day when you felt strong and happy. Use at least two comparative or superlative adjectives.',
    },
  },

  'soda-pop': {
    facts: [
      { uk: 'Пісня з анімаційного фільму «KPop-мисливиці на демонів» (2025). Її виконує вигаданий бой-бенд Saja Boys.', ru: 'Песня из анимационного фильма «KPop-охотницы на демонов» (2025). Её исполняет вымышленный бойз-бенд Saja Boys.', en: 'The song comes from the animated film KPop Demon Hunters (2025). It is sung by the fictional boy band Saja Boys.' },
      { uk: 'У фільмі Saja Boys суперники дівочого гурту HUNTR/X і насправді лиходії.', ru: 'В фильме Saja Boys соперники девичьей группы HUNTR/X и на самом деле злодеи.', en: 'In the film the Saja Boys are rivals of the girl group HUNTR/X, and they are really the villains.' },
      { uk: 'Пісня піднялася на третє місце чарту Billboard Hot 100.', ru: 'Песня поднялась на третье место чарта Billboard Hot 100.', en: 'The song reached number three on the Billboard Hot 100.' },
      { uk: 'У світовому чарті Billboard Global 200 пісня теж дійшла до третього місця.', ru: 'В мировом чарте Billboard Global 200 песня тоже дошла до третьего места.', en: 'It also reached number three on the worldwide Billboard Global 200 chart.' },
      { uk: 'Кілька пісень із саундтреку фільму були в першій десятці Billboard Hot 100 одночасно, а це рідкість для саундтреків.', ru: 'Несколько песен из саундтрека фильма были в первой десятке Billboard Hot 100 одновременно, а это редкость для саундтреков.', en: 'Several songs from the film’s soundtrack were in the Billboard Hot 100 top ten at the same time, which is rare for a soundtrack.' },
    ],
    warmup: [
      'What is your favourite drink?',
      'Is there a song you can’t stop singing? Which one?',
      'Do you think boy bands are cool? Why or why not?',
    ],
    vocab: [
      {
        group: { uk: 'Напої і солодощі', ru: 'Напитки и сладости', en: 'Drinks and sweets' },
        items: [
          { en: 'soda', uk: 'газована вода, газування', ru: 'газировка', ex: 'I only drink soda at birthday parties.' },
          { en: 'a can', uk: 'банка (бляшанка)', ru: 'банка (жестяная)', ex: 'Can I have a can of lemonade, please?' },
          { en: 'bubbles', uk: 'бульбашки', ru: 'пузырьки', ex: 'The bubbles in my drink tickle my nose.' },
          { en: 'sugar', uk: 'цукор', ru: 'сахар', ex: 'There is too much sugar in this cake.' },
          { en: 'a sweet', uk: 'цукерка', ru: 'конфета', ex: 'Grandma always gives us a sweet after lunch.' },
        ],
      },
      {
        group: { uk: 'Поп-музика', ru: 'Поп-музыка', en: 'Pop music' },
        items: [
          { en: 'a boy band', uk: 'хлопчачий гурт, бой-бенд', ru: 'бойз-бенд', ex: 'My mum loved a boy band when she was a teenager.' },
          { en: 'catchy', uk: 'прилипливий, що легко запам’ятовується', ru: 'прилипчивый, легко запоминающийся', ex: 'The new advert has a catchy song.' },
          { en: 'a chart', uk: 'хіт-парад, чарт', ru: 'хит-парад, чарт', ex: 'Their song is number one in the chart.' },
          { en: 'a dance move', uk: 'танцювальний рух', ru: 'танцевальное движение', ex: 'Can you teach me that dance move?' },
          { en: 'to sing along', uk: 'підспівувати', ru: 'подпевать', ex: 'Everyone sang along at the concert.' },
        ],
      },
      {
        group: { uk: 'Імідж і характер', ru: 'Имидж и характер', en: 'Image and character' },
        items: [
          { en: 'charming', uk: 'чарівний', ru: 'обаятельный', ex: 'The new teacher is very charming.' },
          { en: 'a villain', uk: 'лиходій', ru: 'злодей', ex: 'The villain in this cartoon is funny, not scary.' },
          { en: 'shiny', uk: 'блискучий', ru: 'блестящий', ex: 'I got shiny new shoes for the party.' },
          { en: 'fake', uk: 'фальшивий, несправжній', ru: 'фальшивый, ненастоящий', ex: 'That smile looks fake.' },
          { en: 'to trust', uk: 'довіряти', ru: 'доверять', ex: 'I trust my best friend with all my secrets.' },
        ],
      },
    ],
    grammar: {
      uk: 'Злічувані іменники можна порахувати: a sweet, two sweets, a can, three cans. Незлічувані не мають множини: sugar, water, juice, music. З ними вживаємо much і a little, а зі злічуваними many і a few: How much sugar? How many cans? Some вживаємо в стверджувальних реченнях, any в питаннях і запереченнях: I have some sweets. Do you have any soda? There isn’t any juice. Щоб порахувати незлічуване, додаємо «упаковку»: a can of soda, a bottle of water, a glass of milk, a piece of cake. Не кажіть two sodas у формальній мові, краще two cans of soda.',
      ru: 'Исчисляемые существительные можно посчитать: a sweet, two sweets, a can, three cans. Неисчисляемые не имеют множественного числа: sugar, water, juice, music. С ними используем much и a little, а с исчисляемыми many и a few: How much sugar? How many cans? Some используем в утвердительных предложениях, any в вопросах и отрицаниях: I have some sweets. Do you have any soda? There isn’t any juice. Чтобы посчитать неисчисляемое, добавляем «упаковку»: a can of soda, a bottle of water, a glass of milk, a piece of cake. Не говорите two sodas в формальной речи, лучше two cans of soda.',
      en: 'Countable nouns can be counted: a sweet, two sweets, a can, three cans. Uncountable nouns have no plural: sugar, water, juice, music. Use much and a little with uncountable nouns, many and a few with countable ones: How much sugar? How many cans? Use some in positive sentences and any in questions and negatives: I have some sweets. Do you have any soda? There isn’t any juice. To count something uncountable, add a container: a can of soda, a bottle of water, a glass of milk, a piece of cake. In careful English say two cans of soda rather than two sodas.',
    },
    grammarEx: [
      { q: 'How ___ sugar do you want in your tea?', opts: ['much', 'many', 'a few'], a: 'much' },
      { q: 'How ___ cans of soda did you buy?', opts: ['many', 'much', 'a little'], a: 'many' },
      { q: 'Do we have ___ juice in the fridge?', opts: ['any', 'some', 'many'], a: 'any' },
      { q: 'I’d like a ___ of water, please.', opts: ['bottle', 'piece', 'slice'], a: 'bottle' },
      { q: 'There are ___ sweets on the table.', opts: ['some', 'any', 'much'], a: 'some' },
      { q: 'Can I have a ___ of cake?', opts: ['piece', 'can', 'bottle'], a: 'piece' },
      { q: 'There isn’t ___ milk left.', opts: ['any', 'some', 'many'], a: 'any' },
      { q: 'I only eat ___ sweets a week.', opts: ['a few', 'a little', 'much'], a: 'a few' },
    ],
    gapfill: [
      { q: 'This song is so ___ that I sing it all day.', a: 'catchy' },
      { q: 'Can I have a ___ of orange soda, please?', a: 'can' },
      { q: 'There is a lot of ___ in fizzy drinks.', a: 'sugar' },
      { q: 'The ___ in the cartoon wants to steal the treasure.', a: 'villain' },
      { q: 'He is friendly and polite, really ___.', a: 'charming' },
      { q: 'Their new song is number two in the ___.', a: 'chart' },
      { q: 'Look at the ___ in my glass, they go up and up!', a: 'bubbles' },
      { q: 'Don’t ___ people only because they look nice.', a: 'trust' },
    ],
    listen: [
      { uk: 'Послухай початок. Яким словом ти описав(-ла) б настрій пісні: веселий, сумний, спокійний?', ru: 'Послушай начало. Каким словом ты описал(а) бы настроение песни: весёлое, грустное, спокойное?', en: 'Listen to the beginning. Which word describes the mood: happy, sad or calm?' },
      { uk: 'Порахуй, скільки різних голосів ти чуєш.', ru: 'Посчитай, сколько разных голосов ты слышишь.', en: 'Count how many different voices you can hear.' },
      { uk: 'Плескай у долоні в ритм пісні. Темп швидкий чи повільний?', ru: 'Хлопай в ладоши в ритм песни. Темп быстрый или медленный?', en: 'Clap along to the beat. Is the tempo fast or slow?' },
      { uk: 'Запиши три англійські слова, які ти почув(-ла) і зрозумів(-ла).', ru: 'Запиши три английских слова, которые ты услышал(а) и понял(а).', en: 'Write down three English words you heard and understood.' },
    ],
    speaking: [
      'Why do some songs get stuck in your head?',
      'What is your favourite sweet? How often do you eat it?',
      'Can a villain be a good singer? Who is your favourite cartoon villain?',
      'Why shouldn’t we trust someone only because they look nice?',
      'Would you prefer to be in a boy band, a girl group or a solo singer? Why?',
      'What do you like more in KPop Demon Hunters: the songs or the story?',
    ],
    roleplay: {
      uk: 'A: ти продавець у кафе біля концертного залу. B: ти фанат(-ка), який(-а) прийшов(-ла) перед концертом і хоче щось купити для себе й друзів. Використайте some, any, how much, how many, a can of, a bottle of.',
      ru: 'A: ты продавец в кафе возле концертного зала. B: ты фанат(ка), который(-ая) пришёл(-ла) перед концертом и хочет что-то купить для себя и друзей. Используйте some, any, how much, how many, a can of, a bottle of.',
      en: 'A: you work in a café near the concert hall. B: you are a fan who comes in before the concert and wants to buy something for yourself and your friends. Use some, any, how much, how many, a can of, a bottle of.',
    },
    writing: {
      uk: 'Придумай власний напій для фанатів улюбленого гурту (50-80 слів). Напиши, як він називається, що в ньому є і чому він подобається фанатам. Використай some, a little, a few і хоча б одну «упаковку»: a can of, a bottle of, a glass of.',
      ru: 'Придумай собственный напиток для фанатов любимой группы (50-80 слов). Напиши, как он называется, что в нём есть и почему он нравится фанатам. Используй some, a little, a few и хотя бы одну «упаковку»: a can of, a bottle of, a glass of.',
      en: 'Invent your own drink for fans of your favourite band (50-80 words). Say what it is called, what is in it and why fans love it. Use some, a little, a few and at least one container: a can of, a bottle of, a glass of.',
    },
  },


  'ordinary': {
    lyricVideo: 'A8dH4cKGa6s',
    facts: [
      { uk: 'Пісня вийшла 7 лютого 2025 року на лейблі Atlantic Records.', ru: 'Песня вышла 7 февраля 2025 года на лейбле Atlantic Records.', en: 'The song came out on 7 February 2025 on Atlantic Records.' },
      { uk: 'Пісня провела 10 тижнів на першому місці чарту Billboard Hot 100. Це найдовше перебування на вершині серед сольних пісень 2025 року.', ru: 'Песня провела 10 недель на первом месте чарта Billboard Hot 100. Это самое долгое пребывание на вершине среди сольных песен 2025 года.', en: 'It spent 10 weeks at No. 1 on the Billboard Hot 100, the longest-running solo No. 1 of 2025.' },
      { uk: 'У Великій Британії пісня трималася на першому місці понад десять тижнів, а в чарті Billboard Pop Airplay встановила рекорд: 16 тижнів на першому місці.', ru: 'В Великобритании песня держалась на первом месте больше десяти недель, а в чарте Billboard Pop Airplay установила рекорд: 16 недель на первом месте.', en: 'In the UK it stayed at No. 1 for more than ten weeks, and on the Billboard Pop Airplay chart it set a record of 16 weeks at No. 1.' },
      { uk: 'Алекс Воррен спершу став відомим як ютубер і автор відео в TikTok, а вже потім як співак.', ru: 'Алекс Уоррен сначала стал известен как ютубер и автор видео в TikTok, а уже потом как певец.', en: 'Alex Warren first became famous as a YouTuber and TikTok creator, and only later as a singer.' },
      { uk: 'У 2026 році Алекса Воррена номінували на «Греммі» як найкращого нового виконавця. В оригінальному кліпі знялася його дружина Коувр Аннон.', ru: 'В 2026 году Алекса Уоррена номинировали на «Грэмми» как лучшего нового исполнителя. В оригинальном клипе снялась его жена Коувр Аннон.', en: 'In 2026 Alex Warren was nominated for Best New Artist at the Grammys. His wife Kouvr Annon appears in the original music video.' },
    ],
    warmup: [
      'What is the most ordinary part of your day? Can it ever feel special?',
      'Do you know any songs that are played at weddings in Ukraine?',
      'Would you like to be famous on YouTube or TikTok? Why or why not?',
    ],
    vocab: [
      {
        group: { uk: 'Звичайне і незвичайне', ru: 'Обычное и необычное', en: 'Ordinary and extraordinary' },
        items: [
          { en: 'ordinary', uk: 'звичайний', ru: 'обычный', ex: 'It was an ordinary Tuesday until the snow started.' },
          { en: 'extraordinary', uk: 'надзвичайний, незвичайний', ru: 'необыкновенный, исключительный', ex: 'She has an extraordinary voice.' },
          { en: 'magical', uk: 'чарівний', ru: 'волшебный', ex: 'The city looks magical with all the lights.' },
          { en: 'everyday', uk: 'повсякденний', ru: 'повседневный', ex: 'Brushing your teeth is an everyday habit.' },
          { en: 'to stand out', uk: 'вирізнятися', ru: 'выделяться', ex: 'His bright jacket stood out in the photo.' },
        ],
      },
      {
        group: { uk: 'Кохання і почуття', ru: 'Любовь и чувства', en: 'Love and feelings' },
        items: [
          { en: 'to adore', uk: 'обожнювати', ru: 'обожать', ex: 'My sister adores her new kitten.' },
          { en: 'devoted', uk: 'відданий', ru: 'преданный', ex: 'He is a devoted fan of this band.' },
          { en: 'a feeling', uk: 'почуття, відчуття', ru: 'чувство, ощущение', ex: 'I have a good feeling about this match.' },
          { en: 'to cherish', uk: 'берегти, дорожити', ru: 'беречь, дорожить', ex: 'I cherish the letters from my grandpa.' },
          { en: 'heartfelt', uk: 'щирий, від усього серця', ru: 'искренний, от всего сердца', ex: 'She wrote a heartfelt thank-you card.' },
        ],
      },
      {
        group: { uk: 'Весілля і свята', ru: 'Свадьба и праздники', en: 'Weddings and celebrations' },
        items: [
          { en: 'a wedding', uk: 'весілля', ru: 'свадьба', ex: 'My cousin’s wedding is in June.' },
          { en: 'a bride', uk: 'наречена', ru: 'невеста', ex: 'The bride wore a long white dress.' },
          { en: 'a groom', uk: 'наречений', ru: 'жених', ex: 'The groom was so nervous he dropped the ring.' },
          { en: 'a guest', uk: 'гість', ru: 'гость', ex: 'There were a hundred guests at the party.' },
          { en: 'to celebrate', uk: 'святкувати', ru: 'праздновать', ex: 'We celebrated my birthday at the park.' },
        ],
      },
    ],
    grammar: {
      uk: 'Префікси змінюють значення слова. Extra- означає «понад, більше ніж»: ordinary (звичайний) і extraordinary (надзвичайний). Un- та im- означають «не»: usual і unusual, happy і unhappy, possible і impossible, patient і impatient. Im- ставимо перед словами на m і p. Друга корисна конструкція: make + об’єкт + прикметник. Вона показує, як щось чи хтось змінює наш стан: Music makes me calm. You make every day special. The news made her sad. Зверніть увагу: після make тут немає to і немає -ly: makes me happy, а не makes me happily.',
      ru: 'Префиксы меняют значение слова. Extra- значит «сверх, больше чем»: ordinary (обычный) и extraordinary (необыкновенный). Un- и im- значат «не»: usual и unusual, happy и unhappy, possible и impossible, patient и impatient. Im- ставим перед словами на m и p. Вторая полезная конструкция: make + объект + прилагательное. Она показывает, как что-то или кто-то меняет наше состояние: Music makes me calm. You make every day special. The news made her sad. Обратите внимание: после make здесь нет to и нет -ly: makes me happy, а не makes me happily.',
      en: 'Prefixes change the meaning of a word. Extra- means more than: ordinary and extraordinary. Un- and im- mean not: usual and unusual, happy and unhappy, possible and impossible, patient and impatient. We use im- before words starting with m and p. The second useful pattern is make + object + adjective. It shows how something or someone changes the way we feel: Music makes me calm. You make every day special. The news made her sad. Note that there is no to and no -ly here: makes me happy, not makes me happily.',
    },
    grammarEx: [
      { q: 'This is not a usual day. It is very ___.', opts: ['unusual', 'imusual', 'disusual'], a: 'unusual' },
      { q: 'Flying without wings is ___.', opts: ['impossible', 'unpossible', 'inpossible'], a: 'impossible' },
      { q: 'Her talent is not ordinary, it is ___.', opts: ['extraordinary', 'unordinary', 'imordinary'], a: 'extraordinary' },
      { q: 'Waiting in long lines makes me ___.', opts: ['impatient', 'unpatient', 'dispatient'], a: 'impatient' },
      { q: 'Good music makes me ___.', opts: ['happy', 'happily', 'to happy'], a: 'happy' },
      { q: 'The rainy weather made us ___.', opts: ['sleepy', 'sleep', 'sleepily'], a: 'sleepy' },
      { q: 'Your smile makes my day ___.', opts: ['better', 'well', 'to better'], a: 'better' },
      { q: 'The sad film made my mum ___.', opts: ['cry', 'to cry', 'crying'], a: 'cry' },
    ],
    gapfill: [
      { q: 'It was an ___ evening, nothing special happened.', a: 'ordinary' },
      { q: 'The fireworks over the river looked ___.', a: 'magical' },
      { q: 'My grandparents ___ their old wedding photos.', a: 'cherish' },
      { q: 'The ___ and the groom danced first.', a: 'bride' },
      { q: 'We invited fifty ___ to the party.', a: 'guests' },
      { q: 'Let’s ___ the end of the school year with a picnic.', a: 'celebrate' },
      { q: 'He wrote a ___ letter to say sorry.', a: 'heartfelt' },
      { q: 'I have a strange ___ that we forgot something.', a: 'feeling' },
    ],
    listen: [
      { uk: 'Послухай початок. Які інструменти ти чуєш? Голос звучить тихо чи одразу на повну силу?', ru: 'Послушай начало. Какие инструменты ты слышишь? Голос звучит тихо или сразу в полную силу?', en: 'Listen to the beginning. Which instruments can you hear? Is the voice quiet or full power from the start?' },
      { uk: 'Знайди момент, де пісня стає найгучнішою. Який настрій вона там передає?', ru: 'Найди момент, где песня становится самой громкой. Какое настроение она там передаёт?', en: 'Find the moment where the song gets loudest. What mood does it give there?' },
      { uk: 'Порахуй, скільки разів ти чуєш назву пісні.', ru: 'Посчитай, сколько раз ты слышишь название песни.', en: 'Count how many times you hear the title of the song.' },
      { uk: 'Подивись весільне відео. Опиши трьома прикметниками людей і місце, які ти бачиш.', ru: 'Посмотри свадебное видео. Опиши тремя прилагательными людей и место, которые ты видишь.', en: 'Watch the wedding video. Describe the people and the place with three adjectives.' },
    ],
    speaking: [
      'What makes an ordinary day feel extraordinary for you?',
      'Why do you think this song became so popular at weddings?',
      'Who makes you happy when you feel down?',
      'Is it easy for a YouTuber to become a real singer? Why or why not?',
      'What is something you cherish and would never sell?',
      'Do you think love songs are too emotional? Why or why not?',
    ],
    roleplay: {
      uk: 'A: ти ведучий(а) на весіллі старшої сестри і хочеш вибрати пісню для першого танцю. B: ти діджей. Обговоріть кілька пісень, поясніть, чому одна з них звучить «незвичайно» і робить момент особливим. Використайте make + об’єкт + прикметник.',
      ru: 'A: ты ведущий(ая) на свадьбе старшей сестры и хочешь выбрать песню для первого танца. B: ты диджей. Обсудите несколько песен, объясните, почему одна из них звучит «необычно» и делает момент особенным. Используйте make + объект + прилагательное.',
      en: 'A: you are the host at your older sister’s wedding and want to choose a song for the first dance. B: you are the DJ. Discuss a few songs and explain why one of them sounds extraordinary and makes the moment special. Use make + object + adjective.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) «Мій незвичайний звичайний день». Опиши звичайний день, який завдяки людям чи дрібницям став особливим. Використай щонайменше два слова з префіксами (un-, im-, extra-) і конструкцію make + об’єкт + прикметник.',
      ru: 'Напиши короткий текст (60-100 слов) «Мой необычный обычный день». Опиши обычный день, который благодаря людям или мелочам стал особенным. Используй как минимум два слова с префиксами (un-, im-, extra-) и конструкцию make + объект + прилагательное.',
      en: 'Write a short text (60-100 words) called My extraordinary ordinary day. Describe a normal day that became special because of people or small things. Use at least two words with prefixes (un-, im-, extra-) and the pattern make + object + adjective.',
    },
  },

  'beautiful-things': {
    lyricVideo: 'HU08BcK5SUY',
    facts: [
      { uk: 'Пісня вийшла в січні 2024 року як окремий сингл.', ru: 'Песня вышла в январе 2024 года как отдельный сингл.', en: 'The song came out in January 2024 as a single.' },
      { uk: 'Пісня посіла перше місце в чарті Billboard Global 200 і увійшла до першої десятки Billboard Hot 100.', ru: 'Песня заняла первое место в чарте Billboard Global 200 и вошла в первую десятку Billboard Hot 100.', en: 'It reached No. 1 on the Billboard Global 200 and the top 10 of the Billboard Hot 100.' },
      { uk: 'Пісня увійшла до дебютного альбому Бенсона Буна «Fireworks & Rollerblades», що вийшов у 2024 році.', ru: 'Песня вошла в дебютный альбом Бенсона Буна «Fireworks & Rollerblades», вышедший в 2024 году.', en: 'It is on Benson Boone’s debut album, Fireworks & Rollerblades, released in 2024.' },
      { uk: 'Кліп зняв режисер Метт Істін.', ru: 'Клип снял режиссёр Мэтт Истин.', en: 'The music video was directed by Matt Eastin.' },
      { uk: 'Бенсон Бун родом зі штату Вашингтон (США). Він відомий тим, що робить сальто назад просто на сцені. У 2025 році його номінували на «Греммі» як найкращого нового виконавця.', ru: 'Бенсон Бун родом из штата Вашингтон (США). Он известен тем, что делает сальто назад прямо на сцене. В 2025 году его номинировали на «Грэмми» как лучшего нового исполнителя.', en: 'Benson Boone is from Washington state, USA, and is famous for doing backflips on stage. He was nominated for Best New Artist at the 2025 Grammys.' },
    ],
    warmup: [
      'What are three beautiful things in your life right now?',
      'What are you sometimes afraid of losing?',
      'Can you do a backflip? Would you like to learn?',
    ],
    vocab: [
      {
        group: { uk: 'Вдячність', ru: 'Благодарность', en: 'Gratitude' },
        items: [
          { en: 'grateful', uk: 'вдячний', ru: 'благодарный', ex: 'I’m grateful for my friends.' },
          { en: 'to appreciate', uk: 'цінувати', ru: 'ценить', ex: 'I really appreciate your help.' },
          { en: 'a blessing', uk: 'благо, щастя, подарунок долі', ru: 'благо, счастье, подарок судьбы', ex: 'A sunny day after a week of rain is a blessing.' },
          { en: 'precious', uk: 'дорогоцінний', ru: 'драгоценный', ex: 'Time with family is precious.' },
          { en: 'to treasure', uk: 'дорожити, берегти', ru: 'дорожить, беречь', ex: 'I treasure the bracelet my best friend made.' },
        ],
      },
      {
        group: { uk: 'Тривога і страх', ru: 'Тревога и страх', en: 'Worry and fear' },
        items: [
          { en: 'to worry', uk: 'хвилюватися', ru: 'волноваться', ex: 'Don’t worry, the bus will come soon.' },
          { en: 'anxious', uk: 'тривожний, стривожений', ru: 'тревожный, встревоженный', ex: 'I feel anxious before big tests.' },
          { en: 'to lose', uk: 'втрачати, губити', ru: 'терять', ex: 'I always lose my gloves in winter.' },
          { en: 'fragile', uk: 'крихкий', ru: 'хрупкий', ex: 'Be careful, the glass is fragile.' },
          { en: 'to calm down', uk: 'заспокоїтися', ru: 'успокоиться', ex: 'Take a deep breath and calm down.' },
        ],
      },
      {
        group: { uk: 'Музика: тихо і гучно', ru: 'Музыка: тихо и громко', en: 'Music: quiet and loud' },
        items: [
          { en: 'a ballad', uk: 'балада, повільна пісня', ru: 'баллада, медленная песня', ex: 'She sang a sad ballad at the concert.' },
          { en: 'to build up', uk: 'наростати', ru: 'нарастать', ex: 'The music builds up slowly and then explodes.' },
          { en: 'powerful', uk: 'потужний', ru: 'мощный', ex: 'He has a powerful voice.' },
          { en: 'gentle', uk: 'ніжний, м’який', ru: 'нежный, мягкий', ex: 'The song starts with a gentle piano.' },
          { en: 'a backflip', uk: 'сальто назад', ru: 'сальто назад', ex: 'The gymnast did a perfect backflip.' },
        ],
      },
    ],
    grammar: {
      uk: 'Be afraid of + -ing означає страх, що щось погане станеться: I’m afraid of losing my keys. She’s afraid of falling. Be afraid to + дієслово означає, що людина боїться щось зробити сама і тому не робить: I’m afraid to ask the teacher. He was afraid to jump. Після of завжди -ing або іменник: afraid of spiders, afraid of losing. Ще одна корисна конструкція: can’t help + -ing, тобто «не можу не...»: I can’t help smiling when I hear this song. She couldn’t help laughing. Для вдячності кажемо be grateful for + іменник: I’m grateful for my family.',
      ru: 'Be afraid of + -ing значит страх, что случится что-то плохое: I’m afraid of losing my keys. She’s afraid of falling. Be afraid to + глагол значит, что человек боится что-то сделать сам и поэтому не делает: I’m afraid to ask the teacher. He was afraid to jump. После of всегда -ing или существительное: afraid of spiders, afraid of losing. Ещё одна полезная конструкция: can’t help + -ing, то есть «не могу не...»: I can’t help smiling when I hear this song. She couldn’t help laughing. Для благодарности говорим be grateful for + существительное: I’m grateful for my family.',
      en: 'Be afraid of + -ing means you fear that something bad will happen: I’m afraid of losing my keys. She’s afraid of falling. Be afraid to + verb means you are scared to do something yourself, so you don’t do it: I’m afraid to ask the teacher. He was afraid to jump. After of we always use -ing or a noun: afraid of spiders, afraid of losing. Another useful pattern is can’t help + -ing, meaning you cannot stop yourself: I can’t help smiling when I hear this song. She couldn’t help laughing. For gratitude we say be grateful for + noun: I’m grateful for my family.',
    },
    grammarEx: [
      { q: 'I’m afraid of ___ my phone on the bus.', opts: ['losing', 'lose', 'to lose'], a: 'losing' },
      { q: 'She was afraid ___ the dark when she was little.', opts: ['of', 'to', 'for'], a: 'of' },
      { q: 'He’s afraid ___ his parents for more money.', opts: ['to ask', 'asking', 'of ask'], a: 'to ask' },
      { q: 'I can’t help ___ when I watch cat videos.', opts: ['laughing', 'laugh', 'to laugh'], a: 'laughing' },
      { q: 'We’re grateful ___ your help.', opts: ['for', 'of', 'to'], a: 'for' },
      { q: 'Are you afraid of ___?', opts: ['flying', 'fly', 'to flying'], a: 'flying' },
      { q: 'She couldn’t help ___ about the test all night.', opts: ['worrying', 'worry', 'to worry'], a: 'worrying' },
      { q: 'Don’t be afraid ___ mistakes when you speak English.', opts: ['of making', 'to making', 'make'], a: 'of making' },
    ],
    gapfill: [
      { q: 'I’m so ___ for everything my grandma does for me.', a: 'grateful' },
      { q: 'Please be careful with the box, it’s ___.', a: 'fragile' },
      { q: 'Don’t ___ about the rain, we have umbrellas.', a: 'worry' },
      { q: 'He felt ___ before his first concert.', a: 'anxious' },
      { q: 'Old family photos are ___ to us.', a: 'precious' },
      { q: 'The song starts quietly and slowly ___ up.', a: 'builds' },
      { q: 'She has a ___ voice that fills the whole hall.', a: 'powerful' },
      { q: 'I really ___ your kind words.', a: 'appreciate' },
    ],
    listen: [
      { uk: 'Послухай початок. Пісня звучить тихо чи гучно? Які інструменти ти чуєш?', ru: 'Послушай начало. Песня звучит тихо или громко? Какие инструменты ты слышишь?', en: 'Listen to the beginning. Is the song quiet or loud? Which instruments can you hear?' },
      { uk: 'Підніми руку в момент, коли пісня раптово стає гучною і потужною.', ru: 'Подними руку в тот момент, когда песня внезапно становится громкой и мощной.', en: 'Raise your hand at the moment when the song suddenly becomes loud and powerful.' },
      { uk: 'Як змінюється голос співака від початку до кінця? Опиши двома прикметниками.', ru: 'Как меняется голос певца от начала до конца? Опиши двумя прилагательными.', en: 'How does the singer’s voice change from the beginning to the end? Use two adjectives.' },
      { uk: 'Подивись кліп. Де відбуваються події? Який настрій створює місце?', ru: 'Посмотри клип. Где происходят события? Какое настроение создаёт место?', en: 'Watch the video. Where does it take place? What mood does the place create?' },
    ],
    speaking: [
      'What are you most grateful for this year?',
      'Why are people sometimes afraid of losing good things?',
      'What do teenagers often take for granted?',
      'What helps you calm down when you are anxious?',
      'Do you like songs that start quietly and get loud? Why?',
      'Would you like to see a singer do backflips on stage? Why or why not?',
    ],
    roleplay: {
      uk: 'A: ти хвилюєшся, що після переїзду друга ви перестанете дружити. B: ти друг або подруга. Заспокой A, нагадай про добрі речі, які у вас є, і запропонуй, як підтримувати зв’язок. Використайте be afraid of + -ing і be grateful for.',
      ru: 'A: ты волнуешься, что после переезда друга вы перестанете дружить. B: ты друг или подруга. Успокой A, напомни о хороших вещах, которые у вас есть, и предложи, как поддерживать связь. Используйте be afraid of + -ing и be grateful for.',
      en: 'A: you are worried that you and your friend will stop being friends after they move away. B: you are the friend. Calm A down, remind them of the good things you share and suggest ways to keep in touch. Use be afraid of + -ing and be grateful for.',
    },
    writing: {
      uk: 'Напиши «лист вдячності» (60-100 слів) людині або речі, яку ти цінуєш. Розкажи, чому вона для тебе важлива і чого ти боїшся втратити. Використай be grateful for, be afraid of + -ing і щонайменше три слова з уроку.',
      ru: 'Напиши «письмо благодарности» (60-100 слов) человеку или вещи, которую ты ценишь. Расскажи, почему она для тебя важна и что ты боишься потерять. Используй be grateful for, be afraid of + -ing и как минимум три слова из урока.',
      en: 'Write a thank-you letter (60-100 words) to a person or thing you treasure. Explain why it matters to you and what you are afraid of losing. Use be grateful for, be afraid of + -ing and at least three words from the lesson.',
    },
  },

  'drivers-license': {
    lyricVideo: '2PRvp-mP_q0',
    facts: [
      { uk: 'Пісня вийшла 8 січня 2021 року. Це був дебютний сингл Олівії Родріго.', ru: 'Песня вышла 8 января 2021 года. Это был дебютный сингл Оливии Родриго.', en: 'The song came out on 8 January 2021. It was Olivia Rodrigo’s debut single.' },
      { uk: 'Пісня одразу дебютувала на першому місці чарту Billboard Hot 100 і трималася там 8 тижнів поспіль.', ru: 'Песня сразу дебютировала на первом месте чарта Billboard Hot 100 и держалась там 8 недель подряд.', en: 'It debuted at number one on the Billboard Hot 100 and stayed there for 8 weeks in a row.' },
      { uk: 'Тоді пісня побила рекорд Spotify за кількістю прослуховувань за один день для пісні, не пов’язаної зі святами.', ru: 'Тогда песня побила рекорд Spotify по количеству прослушиваний за один день для песни, не связанной с праздниками.', en: 'At that time it broke the Spotify record for the most streams in one day for a non-holiday song.' },
      { uk: 'Пісня увійшла до дебютного альбому Олівії «SOUR» (2021).', ru: 'Песня вошла в дебютный альбом Оливии «SOUR» (2021).', en: 'The song is on Olivia’s debut album SOUR (2021).' },
      { uk: 'У 2022 році Олівія отримала «Греммі» як найкраща нова виконавиця, а також за найкраще сольне поп-виконання саме цієї пісні. До музичної слави вона грала у серіалі Disney+ High School Musical: The Musical: The Series.', ru: 'В 2022 году Оливия получила «Грэмми» как лучшая новая исполнительница, а также за лучшее сольное поп-исполнение именно этой песни. До музыкальной славы она снималась в сериале Disney+ High School Musical: The Musical: The Series.', en: 'In 2022 Olivia won the Grammy for Best New Artist and the Grammy for Best Pop Solo Performance for this song. Before her music fame she acted in the Disney+ series High School Musical: The Musical: The Series.' },
    ],
    warmup: [
      'At what age can people get a driving licence in Ukraine? In other countries?',
      'What is the first thing you would do if you could drive?',
      'Which songs do you listen to when you feel sad?',
    ],
    vocab: [
      {
        group: { uk: 'Водіння і дорога', ru: 'Вождение и дорога', en: 'Driving and the road' },
        items: [
          { en: 'a driving licence', uk: 'водійські права', ru: 'водительские права', ex: 'You need a driving licence to rent a car.' },
          { en: 'to drive past', uk: 'проїжджати повз', ru: 'проезжать мимо', ex: 'Every morning we drive past an old castle.' },
          { en: 'a traffic light', uk: 'світлофор', ru: 'светофор', ex: 'Stop! The traffic light is red.' },
          { en: 'a street', uk: 'вулиця', ru: 'улица', ex: 'My grandma lives on a quiet street near the park.' },
          { en: 'a passenger seat', uk: 'пасажирське сидіння', ru: 'пассажирское сиденье', ex: 'My little brother always wants to sit in the passenger seat.' },
        ],
      },
      {
        group: { uk: 'Сум і почуття', ru: 'Грусть и чувства', en: 'Sadness and feelings' },
        items: [
          { en: 'heartbroken', uk: 'з розбитим серцем, дуже засмучений', ru: 'с разбитым сердцем, очень расстроенный', ex: 'She was heartbroken when her team lost the final.' },
          { en: 'lonely', uk: 'самотній', ru: 'одинокий', ex: 'I felt lonely on my first day in the new city.' },
          { en: 'to cry', uk: 'плакати', ru: 'плакать', ex: 'It’s OK to cry when you are sad.' },
          { en: 'to miss', uk: 'сумувати за', ru: 'скучать по', ex: 'I miss my old school friends.' },
          { en: 'a memory', uk: 'спогад', ru: 'воспоминание', ex: 'This photo is my favourite memory of the summer.' },
        ],
      },
      {
        group: { uk: 'Дорослішання', ru: 'Взросление', en: 'Growing up' },
        items: [
          { en: 'to grow up', uk: 'дорослішати', ru: 'взрослеть', ex: 'I grew up in a small town by the river.' },
          { en: 'independent', uk: 'самостійний, незалежний', ru: 'самостоятельный, независимый', ex: 'Having a part-time job makes teens more independent.' },
          { en: 'a milestone', uk: 'важлива подія, віха', ru: 'важное событие, веха', ex: 'Finishing school is a big milestone.' },
          { en: 'to move on', uk: 'рухатися далі, відпустити минуле', ru: 'двигаться дальше, отпустить прошлое', ex: 'It was hard, but she moved on and found new friends.' },
          { en: 'to look forward to', uk: 'з нетерпінням чекати', ru: 'с нетерпением ждать', ex: 'I’m looking forward to my seventeenth birthday.' },
        ],
      },
    ],
    grammar: {
      uk: 'Past Continuous (was/were + дієслово з -ing) описує дію, яка тривала в певний момент минулого: At 8 pm I was doing my homework. Past Simple описує коротку завершену подію: I finished at 9. Разом вони показують, що щось сталося посеред іншої дії: I was driving home when my phone rang. Часто використовуємо when перед Past Simple і while перед Past Continuous: While we were walking, it started to snow. Дієслова почуттів і стану (know, like, love, want) зазвичай не мають форми -ing: I knew him, а не I was knowing him.',
      ru: 'Past Continuous (was/were + глагол с -ing) описывает действие, которое длилось в определённый момент прошлого: At 8 pm I was doing my homework. Past Simple описывает короткое завершённое событие: I finished at 9. Вместе они показывают, что что-то случилось посреди другого действия: I was driving home when my phone rang. Часто используем when перед Past Simple и while перед Past Continuous: While we were walking, it started to snow. Глаголы чувств и состояния (know, like, love, want) обычно не имеют формы -ing: I knew him, а не I was knowing him.',
      en: 'The Past Continuous (was/were + verb + -ing) describes an action in progress at a moment in the past: At 8 pm I was doing my homework. The Past Simple describes a short, finished event: I finished at 9. Together they show that something happened in the middle of another action: I was driving home when my phone rang. We often use when before the Past Simple and while before the Past Continuous: While we were walking, it started to snow. State verbs (know, like, love, want) usually have no -ing form: I knew him, not I was knowing him.',
    },
    grammarEx: [
      { q: 'I ___ home when it started to rain.', opts: ['was driving', 'drove', 'drive'], a: 'was driving' },
      { q: 'While we were watching the film, the lights ___ off.', opts: ['went', 'were going', 'go'], a: 'went' },
      { q: 'What ___ you doing at 7 o’clock yesterday?', opts: ['were', 'was', 'did'], a: 'were' },
      { q: 'She ___ her driving test last Monday.', opts: ['passed', 'was passing', 'passes'], a: 'passed' },
      { q: '___ I was walking to school, I saw an old friend.', opts: ['While', 'When', 'During'], a: 'While' },
      { q: 'My phone rang ___ I was having dinner.', opts: ['while', 'during', 'for'], a: 'while' },
      { q: 'I ___ him for two years before he moved away.', opts: ['knew', 'was knowing', 'know'], a: 'knew' },
      { q: 'They ___ playing football when the coach arrived.', opts: ['were', 'was', 'did'], a: 'were' },
    ],
    gapfill: [
      { q: 'You can’t drive without a driving ___.', a: 'licence' },
      { q: 'Wait, the traffic ___ is still red.', a: 'light' },
      { q: 'She was ___ when her best friend moved to another country.', a: 'heartbroken' },
      { q: 'On my first night at camp I felt ___ and wanted to go home.', a: 'lonely' },
      { q: 'This song brings back a happy ___ of our trip.', a: 'memory' },
      { q: 'Getting your first passport is a real ___.', a: 'milestone' },
      { q: 'It’s time to move ___ and start something new.', a: 'on' },
      { q: 'My parents want me to be more ___ and cook for myself.', a: 'independent' },
    ],
    listen: [
      { uk: 'Послухай початок. Які звуки ти чуєш ще до музики? Як вони пов’язані з назвою?', ru: 'Послушай начало. Какие звуки ты слышишь ещё до музыки? Как они связаны с названием?', en: 'Listen to the beginning. What sounds can you hear before the music starts? How are they connected to the title?' },
      { uk: 'Пісня тиха весь час чи стає голоснішою? Познач момент, коли музика стає сильнішою.', ru: 'Песня тихая всё время или становится громче? Отметь момент, когда музыка становится сильнее.', en: 'Is the song quiet all the time or does it get louder? Note the moment when the music becomes stronger.' },
      { uk: 'Який головний інструмент у пісні: фортепіано, гітара чи барабани?', ru: 'Какой главный инструмент в песне: фортепиано, гитара или барабаны?', en: 'What is the main instrument in the song: piano, guitar or drums?' },
      { uk: 'Подивись кліп. Опиши трьома прикметниками настрій героїні та погоду і світло в кадрі.', ru: 'Посмотри клип. Опиши тремя прилагательными настроение героини, погоду и свет в кадре.', en: 'Watch the video. Describe the girl’s mood, the weather and the light with three adjectives.' },
    ],
    speaking: [
      'Is getting a driving licence an important milestone for teenagers? Why?',
      'What other moments make people feel grown-up?',
      'What helps you feel better after a sad day?',
      'Why do you think so many teenagers connected with this song?',
      'Is it better to talk about sad feelings or to keep them inside? Why?',
      'Tell about a time when you were doing something and a surprise happened. Use Past Continuous.',
    ],
    roleplay: {
      uk: 'A: ти щойно склав(ла) іспит з водіння, але почуваєшся сумно, бо посварився(лася) з другом. B: ти старший брат чи сестра. Привітай A з успіхом, розпитай, що сталося, і дай пораду, як рухатися далі.',
      ru: 'A: ты только что сдал(а) экзамен по вождению, но тебе грустно, потому что ты поссорился(лась) с другом. B: ты старший брат или сестра. Поздравь A с успехом, расспроси, что случилось, и дай совет, как двигаться дальше.',
      en: 'A: you have just passed your driving test, but you feel sad because you fell out with a friend. B: you are an older brother or sister. Congratulate A, ask what happened and give advice on how to move on.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) про важливий день у твоєму житті, коли ти почувався(лася) дорослішим(ою). Що ти робив(ла), коли сталося щось несподіване? Використай Past Simple і Past Continuous та щонайменше три слова з уроку.',
      ru: 'Напиши короткий текст (60-100 слов) о важном дне в твоей жизни, когда ты почувствовал(а) себя взрослее. Что ты делал(а), когда случилось что-то неожиданное? Используй Past Simple и Past Continuous и как минимум три слова из урока.',
      en: 'Write a short text (60-100 words) about an important day when you felt more grown-up. What were you doing when something unexpected happened? Use the Past Simple and the Past Continuous and at least three words from the lesson.',
    },
  },

  'as-it-was': {
    facts: [
      { uk: 'Пісня вийшла у квітні 2022 року як перший сингл з альбому «Harry’s House».', ru: 'Песня вышла в апреле 2022 года как первый сингл с альбома «Harry’s House».', en: 'The song came out in April 2022 as the lead single from the album Harry’s House.' },
      { uk: 'Пісня провела 15 тижнів на першому місці чарту Billboard Hot 100.', ru: 'Песня провела 15 недель на первом месте чарта Billboard Hot 100.', en: 'It spent 15 weeks at number one on the Billboard Hot 100.' },
      { uk: 'Billboard назвав її головною світовою піснею 2022 року.', ru: 'Billboard назвал её главной мировой песней 2022 года.', en: 'Billboard named it the top global song of 2022.' },
      { uk: 'Альбом «Harry’s House» отримав «Греммі» як альбом року у 2023 році.', ru: 'Альбом «Harry’s House» получил «Грэмми» как альбом года в 2023 году.', en: 'Harry’s House won the Grammy for Album of the Year in 2023.' },
      { uk: 'Кліп зняла режисерка Тану Муіно. Гаррі Стайлз почав кар’єру в гурті One Direction, який створили на телешоу The X Factor у 2010 році.', ru: 'Клип сняла режиссёр Тану Муино. Гарри Стайлз начал карьеру в группе One Direction, которую создали на телешоу The X Factor в 2010 году.', en: 'The video was directed by Tanu Muino. Harry Styles started his career in the band One Direction, which was formed on the TV show The X Factor in 2010.' },
    ],
    warmup: [
      'What is different in your life now compared to three years ago?',
      'Do you like changes or do you prefer things to stay the same?',
      'Can you name a happy-sounding song with a sad meaning?',
    ],
    vocab: [
      {
        group: { uk: 'Зміни', ru: 'Изменения', en: 'Change' },
        items: [
          { en: 'to change', uk: 'змінюватися; змінювати', ru: 'меняться; менять', ex: 'My hair colour has changed since I was a baby.' },
          { en: 'different', uk: 'інший, відмінний', ru: 'другой, отличающийся', ex: 'Life in a big city is very different from life in a village.' },
          { en: 'to get used to', uk: 'звикати до', ru: 'привыкать к', ex: 'It took me a month to get used to my new school.' },
          { en: 'a change', uk: 'зміна', ru: 'перемена, изменение', ex: 'Moving house was a big change for our family.' },
          { en: 'to stay the same', uk: 'залишатися незмінним', ru: 'оставаться прежним', ex: 'Some things never stay the same.' },
        ],
      },
      {
        group: { uk: 'Почуття', ru: 'Чувства', en: 'Feelings' },
        items: [
          { en: 'lonely', uk: 'самотній', ru: 'одинокий', ex: 'Even in a crowd you can feel lonely.' },
          { en: 'nostalgic', uk: 'сповнений ностальгії', ru: 'ностальгирующий', ex: 'Old cartoons make my dad feel nostalgic.' },
          { en: 'upbeat', uk: 'бадьорий, життєрадісний', ru: 'бодрый, жизнерадостный', ex: 'I need upbeat music when I clean my room.' },
          { en: 'thoughtful', uk: 'задумливий', ru: 'задумчивый', ex: 'She was quiet and thoughtful after the film.' },
          { en: 'to cheer up', uk: 'підбадьоритися; підбадьорити', ru: 'взбодриться; подбодрить', ex: 'This song always cheers me up.' },
        ],
      },
      {
        group: { uk: 'Сцена і кліп', ru: 'Сцена и клип', en: 'Stage and video' },
        items: [
          { en: 'to spin', uk: 'кружляти, обертатися', ru: 'кружиться, вращаться', ex: 'The dancer spun round and round on one leg.' },
          { en: 'a rotating stage', uk: 'сцена, що обертається', ru: 'вращающаяся сцена', ex: 'The theatre has a rotating stage for quick scene changes.' },
          { en: 'a sequin', uk: 'паєтка', ru: 'пайетка', ex: 'Her dress was covered in silver sequins.' },
          { en: 'a lead single', uk: 'перший (головний) сингл альбому', ru: 'первый (главный) сингл альбома', ex: 'The lead single came out two months before the album.' },
          { en: 'a director', uk: 'режисер', ru: 'режиссёр', ex: 'The director told the actors to start again.' },
        ],
      },
    ],
    grammar: {
      uk: 'Щоб порівняти минуле і теперішнє, використовуємо the same as (такий самий, як), different from (відмінний від) і not as ... as (не такий ... як): My street is not as quiet as it was. Про старі звички й стани кажемо used to + дієслово: I used to play with dolls. У запереченні і питанні: I didn’t use to like tea. Did you use to live here? Щоб сказати, що щось уже не відбувається, ставимо not ... anymore в кінці речення: I don’t watch cartoons anymore. Замість anymore у британській англійській часто кажуть any more або no longer: I no longer watch cartoons.',
      ru: 'Чтобы сравнить прошлое и настоящее, используем the same as (такой же, как), different from (отличающийся от) и not as ... as (не такой ... как): My street is not as quiet as it was. О старых привычках и состояниях говорим used to + глагол: I used to play with dolls. В отрицании и вопросе: I didn’t use to like tea. Did you use to live here? Чтобы сказать, что что-то уже не происходит, ставим not ... anymore в конце предложения: I don’t watch cartoons anymore. Вместо anymore в британском английском часто говорят any more или no longer: I no longer watch cartoons.',
      en: 'To compare the past and the present, we use the same as, different from and not as ... as: My street is not as quiet as it was. For old habits and states we say used to + verb: I used to play with dolls. In negatives and questions: I didn’t use to like tea. Did you use to live here? To say something doesn’t happen now, put not ... anymore at the end: I don’t watch cartoons anymore. British English also uses any more or no longer: I no longer watch cartoons.',
    },
    grammarEx: [
      { q: 'My phone is the same ___ yours.', opts: ['as', 'like', 'than'], a: 'as' },
      { q: 'This school is very different ___ my old one.', opts: ['from', 'as', 'than'], a: 'from' },
      { q: 'The park is not as big ___ I remember.', opts: ['as', 'than', 'like'], a: 'as' },
      { q: 'I ___ to have long hair when I was ten.', opts: ['used', 'use', 'using'], a: 'used' },
      { q: 'Did you ___ to live in Kharkiv?', opts: ['use', 'used', 'using'], a: 'use' },
      { q: 'We don’t play hide and seek ___.', opts: ['anymore', 'already', 'yet'], a: 'anymore' },
      { q: 'She ___ goes to the dance club. She stopped last year.', opts: ['no longer', 'not longer', 'anymore'], a: 'no longer' },
      { q: 'He didn’t use to ___ coffee, but now he loves it.', opts: ['like', 'liked', 'liking'], a: 'like' },
    ],
    gapfill: [
      { q: 'Some things change, and some things stay the ___.', a: 'same' },
      { q: 'It was hard at first, but I got ___ to waking up early.', a: 'used' },
      { q: 'I need some ___ music to start my morning.', a: 'upbeat' },
      { q: 'When everyone left, the house felt quiet and I felt ___.', a: 'lonely' },
      { q: 'Old photos make my grandma feel ___.', a: 'nostalgic' },
      { q: 'The dancer began to ___ faster and faster.', a: 'spin' },
      { q: 'Moving to another country is a big ___.', a: 'change' },
      { q: 'My friend told a joke to cheer me ___.', a: 'up' },
    ],
    listen: [
      { uk: 'Послухай початок. Чий голос ти чуєш ще до музики: дорослого чи дитини?', ru: 'Послушай начало. Чей голос ты слышишь ещё до музыки: взрослого или ребёнка?', en: 'Listen to the beginning. Whose voice do you hear before the music: an adult’s or a child’s?' },
      { uk: 'Музика швидка чи повільна? Весела чи сумна? А тема пісні?', ru: 'Музыка быстрая или медленная? Весёлая или грустная? А тема песни?', en: 'Is the music fast or slow? Happy or sad? And what about the topic of the song?' },
      { uk: 'Які інструменти ти чуєш: синтезатор, барабани, гітару, труби? Відміть, що почув(ла).', ru: 'Какие инструменты ты слышишь: синтезатор, барабаны, гитару, трубы? Отметь, что услышал(а).', en: 'Which instruments can you hear: synthesizer, drums, guitar, horns? Tick what you hear.' },
      { uk: 'Подивись кліп. Якого кольору костюми? Що відбувається зі сценою?', ru: 'Посмотри клип. Какого цвета костюмы? Что происходит со сценой?', en: 'Watch the video. What colour are the costumes? What happens to the stage?' },
    ],
    speaking: [
      'What did you use to do as a child that you don’t do anymore?',
      'Is your town the same as it was five years ago? What is different?',
      'Why do you think some sad songs have happy music?',
      'How do you cheer yourself up when you feel lonely?',
      'Is change usually good or bad? Give examples.',
      'Why do you think this song was the biggest song in the world in 2022?',
    ],
    roleplay: {
      uk: 'A: ти повернувся(лася) до рідного міста після трьох років. B: ти твій давній друг. Порівняйте, що змінилося в місті і в вас самих. Використайте used to, different from і not ... anymore.',
      ru: 'A: ты вернулся(лась) в родной город через три года. B: ты твой старый друг. Сравните, что изменилось в городе и в вас самих. Используйте used to, different from и not ... anymore.',
      en: 'A: you have come back to your home town after three years. B: you are an old friend. Compare what has changed in the town and in yourselves. Use used to, different from and not ... anymore.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) «Я тоді і я зараз». Порівняй себе п’ять років тому і сьогодні: зовнішність, хобі, друзів. Використай used to, not ... anymore і the same as або different from.',
      ru: 'Напиши короткий текст (60-100 слов) «Я тогда и я сейчас». Сравни себя пять лет назад и сегодня: внешность, хобби, друзей. Используй used to, not ... anymore и the same as или different from.',
      en: 'Write a short text (60-100 words) called Me then and me now. Compare yourself five years ago and today: looks, hobbies, friends. Use used to, not ... anymore and the same as or different from.',
    },
  },


  'flowers': {
    lyricVideo: '7V3jqsIe8c0',
    facts: [
      { uk: 'Пісня вийшла 13 січня 2023 року як перший сингл з альбому «Endless Summer Vacation».', ru: 'Песня вышла 13 января 2023 года как первый сингл с альбома «Endless Summer Vacation».', en: 'The song came out on 13 January 2023 as the lead single from the album Endless Summer Vacation.' },
      { uk: 'Пісня провела 8 тижнів на першому місці чарту Billboard Hot 100.', ru: 'Песня провела 8 недель на первом месте чарта Billboard Hot 100.', en: 'The song spent 8 weeks at number one on the Billboard Hot 100.' },
      { uk: 'Тоді пісня встановила рекорд Spotify: найбільше прослуховувань за один тиждень.', ru: 'Тогда песня установила рекорд Spotify: больше всего прослушиваний за одну неделю.', en: 'At the time it set a Spotify record for the most streams in a single week.' },
      { uk: 'У 2024 році пісня принесла Майлі її перші «Греммі»: «Запис року» і «Найкраще сольне поп-виконання».', ru: 'В 2024 году песня принесла Майли её первые «Грэмми»: «Запись года» и «Лучшее сольное поп-исполнение».', en: 'In 2024 the song won Miley her first Grammys: Record of the Year and Best Pop Solo Performance.' },
      { uk: 'Майлі Сайрус стала відомою ще дитиною завдяки серіалу Disney Channel «Ханна Монтана».', ru: 'Майли Сайрус стала известной ещё ребёнком благодаря сериалу Disney Channel «Ханна Монтана».', en: 'Miley Cyrus became famous as a child star in the Disney Channel series Hannah Montana.' },
    ],
    warmup: [
      'Do you like getting flowers? Which flowers are your favourite?',
      'What do you like doing on your own?',
      'How do you cheer yourself up after a bad day?',
    ],
    vocab: [
      {
        group: { uk: 'Турбота про себе', ru: 'Забота о себе', en: 'Self-care' },
        items: [
          { en: 'to relax', uk: 'відпочивати, розслаблятися', ru: 'отдыхать, расслабляться', ex: 'On Sundays I relax with a book and some tea.' },
          { en: 'to treat yourself', uk: 'побалувати себе', ru: 'побаловать себя', ex: 'After the long project, she treated herself to a new notebook.' },
          { en: 'a routine', uk: 'розпорядок, звичка', ru: 'распорядок, привычка', ex: 'My morning routine is shower, breakfast, bus.' },
          { en: 'to work out', uk: 'тренуватися', ru: 'тренироваться', ex: 'My mum works out at home three times a week.' },
          { en: 'healthy', uk: 'здоровий, корисний', ru: 'здоровый, полезный', ex: 'Fruit is a healthy snack.' },
        ],
      },
      {
        group: { uk: 'Незалежність', ru: 'Независимость', en: 'Independence' },
        items: [
          { en: 'independent', uk: 'незалежний, самостійний', ru: 'независимый, самостоятельный', ex: 'My little brother wants to be independent and tie his own shoes.' },
          { en: 'to rely on', uk: 'покладатися на', ru: 'полагаться на', ex: 'You can rely on Anna, she never forgets.' },
          { en: 'strong', uk: 'сильний', ru: 'сильный', ex: 'She felt strong after she finished the race.' },
          { en: 'to manage', uk: 'впоратися', ru: 'справиться', ex: 'The task was hard, but I managed it.' },
          { en: 'confidence', uk: 'впевненість', ru: 'уверенность', ex: 'Singing in the choir gave me confidence.' },
        ],
      },
      {
        group: { uk: 'Почуття після змін', ru: 'Чувства после перемен', en: 'Feelings after a change' },
        items: [
          { en: 'a breakup', uk: 'розставання', ru: 'расставание', ex: 'After the breakup, he spent more time with his friends.' },
          { en: 'to miss', uk: 'сумувати за', ru: 'скучать по', ex: 'I miss my old school friends.' },
          { en: 'grateful', uk: 'вдячний', ru: 'благодарный', ex: 'I’m grateful for my family’s help.' },
          { en: 'to let go', uk: 'відпустити', ru: 'отпустить', ex: 'It’s hard to let go of old toys, but we gave them to younger kids.' },
          { en: 'peaceful', uk: 'спокійний, мирний', ru: 'спокойный, мирный', ex: 'The garden is very peaceful in the morning.' },
        ],
      },
    ],
    grammar: {
      uk: 'Зворотні займенники показують, що дію людина робить сама із собою або сама для себе: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves. I bought myself a present. She taught herself to play guitar. Також вони підсилюють: I made the cake myself (сам, без допомоги). By myself і on my own означають «сам, без інших»: I went to the cinema by myself. He did his homework on his own. Увага: після деяких дієслів зворотний займенник не потрібен: I relax, I feel good, I wash (а не I relax myself). А вираз enjoy yourself означає «добре провести час»: Enjoy yourselves at the party!',
      ru: 'Возвратные местоимения показывают, что действие человек делает сам с собой или сам для себя: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves. I bought myself a present. She taught herself to play guitar. Также они усиливают: I made the cake myself (сам, без помощи). By myself и on my own означают «сам, без других»: I went to the cinema by myself. He did his homework on his own. Внимание: после некоторых глаголов возвратное местоимение не нужно: I relax, I feel good, I wash (а не I relax myself). А выражение enjoy yourself значит «хорошо провести время»: Enjoy yourselves at the party!',
      en: 'Reflexive pronouns show that a person does something to or for themselves: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves. I bought myself a present. She taught herself to play guitar. They can also add emphasis: I made the cake myself (without help). By myself and on my own mean alone, without other people: I went to the cinema by myself. He did his homework on his own. Careful: some verbs don’t need a reflexive pronoun: I relax, I feel good, I wash (not I relax myself). Enjoy yourself means have a good time: Enjoy yourselves at the party!',
    },
    grammarEx: [
      { q: 'I bought ___ a new pair of headphones.', opts: ['myself', 'me', 'mine'], a: 'myself' },
      { q: 'She taught ___ to swim.', opts: ['herself', 'himself', 'her'], a: 'herself' },
      { q: 'We painted the room ___.', opts: ['ourselves', 'ourself', 'us'], a: 'ourselves' },
      { q: 'He went to the park by ___.', opts: ['himself', 'him', 'his'], a: 'himself' },
      { q: 'Kids, enjoy ___ at the camp!', opts: ['yourselves', 'yourself', 'you'], a: 'yourselves' },
      { q: 'I did the puzzle on my ___.', opts: ['own', 'self', 'alone'], a: 'own' },
      { q: 'The cat is washing ___.', opts: ['itself', 'herself', 'it'], a: 'itself' },
      { q: 'After school I like to ___.', opts: ['relax', 'relax myself', 'relaxing me'], a: 'relax' },
    ],
    gapfill: [
      { q: 'My sister lives alone and pays her own bills. She’s very ___.', a: 'independent' },
      { q: 'I go to the gym to ___ out.', a: 'work' },
      { q: 'Thank you for your help, I’m really ___.', a: 'grateful' },
      { q: 'I ___ my grandma when she is away.', a: 'miss' },
      { q: 'My evening ___ is homework, dinner and a short walk.', a: 'routine' },
      { q: 'Vegetables are ___ for you.', a: 'healthy' },
      { q: 'The lake was quiet and ___.', a: 'peaceful' },
      { q: 'Don’t worry, I can ___ it on my own.', a: 'manage' },
    ],
    listen: [
      { uk: 'Послухай початок. Настрій пісні сумний, спокійний чи впевнений?', ru: 'Послушай начало. Настроение песни грустное, спокойное или уверенное?', en: 'Listen to the beginning. Is the mood sad, calm or confident?' },
      { uk: 'Порахуй, скільки разів ти чуєш слово flowers.', ru: 'Посчитай, сколько раз ты слышишь слово flowers.', en: 'Count how many times you hear the word flowers.' },
      { uk: 'Які інструменти ти чуєш: бас-гітару, барабани, скрипки, фортепіано?', ru: 'Какие инструменты ты слышишь: бас-гитару, барабаны, скрипки, фортепиано?', en: 'Which instruments can you hear: bass guitar, drums, strings, piano?' },
      { uk: 'Подивися кліп. Запиши три речі, які Майлі робить сама.', ru: 'Посмотри клип. Запиши три вещи, которые Майли делает сама.', en: 'Watch the video. Write down three things Miley does by herself.' },
    ],
    speaking: [
      'What is something you learned to do by yourself?',
      'Why is it important to take care of yourself?',
      'Do you prefer spending free time alone or with friends? Why?',
      'How can you be kind to yourself after a mistake?',
      'What small things make you happy?',
      'Why do you think this song became so popular?',
    ],
    roleplay: {
      uk: 'A: твій друг засмучений, бо його найкращий друг переїхав в інше місто. B: ти підтримуєш його і пропонуєш план вихідних, щоб він подбав про себе: прогулянка, улюблена їжа, нове хобі.',
      ru: 'A: твой друг расстроен, потому что его лучший друг переехал в другой город. B: ты поддерживаешь его и предлагаешь план выходных, чтобы он позаботился о себе: прогулка, любимая еда, новое хобби.',
      en: 'A: your friend is sad because their best friend has moved to another city. B: support them and suggest a weekend plan to take care of themselves: a walk, favourite food, a new hobby.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) «Мій ідеальний день для себе». Що ти робиш сам(а), як себе балуєш і чому це важливо. Використай щонайменше три зворотні займенники (myself, yourself...) і by myself або on my own.',
      ru: 'Напиши короткий текст (60-100 слов) «Мой идеальный день для себя». Что ты делаешь сам(а), как себя балуешь и почему это важно. Используй как минимум три возвратных местоимения (myself, yourself...) и by myself или on my own.',
      en: 'Write a short text (60-100 words) called My perfect day for me. Say what you do by yourself, how you treat yourself and why it matters. Use at least three reflexive pronouns (myself, yourself...) and by myself or on my own.',
    },
  },

  'zoo': {
    facts: [
      { uk: 'Мультфільм Disney «Зоотрополіс 2» вийшов у кінотеатрах 26 листопада 2025 року.', ru: 'Мультфильм Disney «Зверополис 2» вышел в кинотеатрах 26 ноября 2025 года.', en: 'Disney’s animated film Zootopia 2 came out in cinemas on 26 November 2025.' },
      { uk: 'Шакіра озвучує Газель, газель-поп-зірку. Цю роль вона грала і в першому мультфільмі «Зоотрополіс» (2016), де співала пісню «Try Everything».', ru: 'Шакира озвучивает Газель, газель-поп-звезду. Эту роль она играла и в первом мультфильме «Зверополис» (2016), где пела песню «Try Everything».', en: 'Shakira voices Gazelle, a pop-star gazelle. She played the same role in the first film, Zootopia (2016), where she sang Try Everything.' },
      { uk: 'Пісню «Zoo» написали Шакіра, Ед Ширан і Блейк Слаткін.', ru: 'Песню «Zoo» написали Шакира, Эд Ширан и Блейк Слаткин.', en: 'Zoo was written by Shakira, Ed Sheeran and Blake Slatkin.' },
      { uk: 'Кліп зняла режисерка Ганна Лакс Девіс.', ru: 'Клип сняла режиссёр Ханна Лакс Дэвис.', en: 'The music video was directed by Hannah Lux Davis.' },
      { uk: 'Шакіра родом з Колумбії і співає англійською та іспанською.', ru: 'Шакира родом из Колумбии и поёт на английском и испанском.', en: 'Shakira is from Colombia and sings in English and Spanish.' },
    ],
    warmup: [
      'Have you ever been to a zoo? Which animals did you see?',
      'Did you watch Zootopia? Who is your favourite character?',
      'What songs make you want to dance?',
    ],
    vocab: [
      {
        group: { uk: 'Тварини', ru: 'Животные', en: 'Animals' },
        items: [
          { en: 'a rabbit', uk: 'кролик', ru: 'кролик', ex: 'Judy Hopps is a brave rabbit.' },
          { en: 'a fox', uk: 'лисиця', ru: 'лиса', ex: 'The fox has a long orange tail.' },
          { en: 'a snake', uk: 'змія', ru: 'змея', ex: 'A snake has no legs.' },
          { en: 'a gazelle', uk: 'газель', ru: 'газель', ex: 'A gazelle can run very fast.' },
          { en: 'a giraffe', uk: 'жираф', ru: 'жираф', ex: 'A giraffe is taller than an elephant.' },
        ],
      },
      {
        group: { uk: 'Місто', ru: 'Город', en: 'The city' },
        items: [
          { en: 'a neighbourhood', uk: 'район', ru: 'район', ex: 'There is a big park in my neighbourhood.' },
          { en: 'crowded', uk: 'людний, переповнений', ru: 'многолюдный, переполненный', ex: 'The bus is always crowded in the morning.' },
          { en: 'a citizen', uk: 'мешканець, громадянин', ru: 'житель, гражданин', ex: 'Every citizen of the city came to the festival.' },
          { en: 'busy', uk: 'жвавий, зайнятий', ru: 'оживлённый, занятой', ex: 'Our street is busy and noisy.' },
          { en: 'to live together', uk: 'жити разом', ru: 'жить вместе', ex: 'In this city big and small animals live together.' },
        ],
      },
      {
        group: { uk: 'Вечірка і танці', ru: 'Вечеринка и танцы', en: 'Party and dancing' },
        items: [
          { en: 'a dance floor', uk: 'танцпол', ru: 'танцпол', ex: 'The dance floor was full of kids.' },
          { en: 'to dance', uk: 'танцювати', ru: 'танцевать', ex: 'My grandpa loves to dance at weddings.' },
          { en: 'a beat', uk: 'ритм, біт', ru: 'ритм, бит', ex: 'This song has a great beat.' },
          { en: 'to clap', uk: 'плескати в долоні', ru: 'хлопать в ладоши', ex: 'Everyone clapped along to the music.' },
          { en: 'loud', uk: 'гучний', ru: 'громкий', ex: 'The music was very loud.' },
        ],
      },
    ],
    grammar: {
      uk: 'Порівняння прикметників. Короткі прикметники: fast, faster, the fastest; tall, taller, the tallest; big, bigger, the biggest. Довгі: more colourful, the most colourful. Особливі: good, better, the best; bad, worse, the worst. Після вищого ступеня ставимо than: A cheetah is faster than a lion. Якщо щось однакове, кажемо as + прикметник + as: My cat is as fluffy as a cloud. Заперечення: A rabbit is not as big as a bear. Найвищий ступінь з the: The giraffe is the tallest animal in the zoo.',
      ru: 'Сравнение прилагательных. Короткие прилагательные: fast, faster, the fastest; tall, taller, the tallest; big, bigger, the biggest. Длинные: more colourful, the most colourful. Особые: good, better, the best; bad, worse, the worst. После сравнительной степени ставим than: A cheetah is faster than a lion. Если что-то одинаковое, говорим as + прилагательное + as: My cat is as fluffy as a cloud. Отрицание: A rabbit is not as big as a bear. Превосходная степень с the: The giraffe is the tallest animal in the zoo.',
      en: 'Comparing adjectives. Short adjectives: fast, faster, the fastest; tall, taller, the tallest; big, bigger, the biggest. Long ones: more colourful, the most colourful. Irregular: good, better, the best; bad, worse, the worst. Use than after the comparative: A cheetah is faster than a lion. For the same quality use as + adjective + as: My cat is as fluffy as a cloud. Negative: A rabbit is not as big as a bear. Use the with the superlative: The giraffe is the tallest animal in the zoo.',
    },
    grammarEx: [
      { q: 'A cheetah is ___ than a rabbit.', opts: ['faster', 'fast', 'fastest'], a: 'faster' },
      { q: 'The giraffe is the ___ animal in the zoo.', opts: ['tallest', 'taller', 'tall'], a: 'tallest' },
      { q: 'An elephant is ___ than a fox.', opts: ['bigger', 'biger', 'more big'], a: 'bigger' },
      { q: 'A fox is not as big ___ a bear.', opts: ['as', 'than', 'like'], a: 'as' },
      { q: 'This is the ___ party of the year!', opts: ['best', 'better', 'good'], a: 'best' },
      { q: 'A parrot is ___ colourful than a pigeon.', opts: ['more', 'most', 'much'], a: 'more' },
      { q: 'My dog is as fast ___ my cat.', opts: ['as', 'than', 'so'], a: 'as' },
      { q: 'The music today is ___ than yesterday.', opts: ['louder', 'loud', 'more loud'], a: 'louder' },
    ],
    gapfill: [
      { q: 'A ___ has a long neck and eats leaves from tall trees.', a: 'giraffe' },
      { q: 'The ___ was full of people dancing.', a: 'dance floor' },
      { q: 'Judy Hopps is a ___ who works as a police officer.', a: 'rabbit' },
      { q: 'The market was very ___, we couldn’t move.', a: 'crowded' },
      { q: 'This song has a great ___, I can’t stop moving.', a: 'beat' },
      { q: 'Please don’t be so ___, the baby is sleeping.', a: 'loud' },
      { q: 'At the end of the show everyone started to ___.', a: 'clap' },
      { q: 'A ___ has no legs, but it can move fast.', a: 'snake' },
    ],
    listen: [
      { uk: 'Послухай початок. Пісня швидка чи повільна? Хочеться танцювати?', ru: 'Послушай начало. Песня быстрая или медленная? Хочется танцевать?', en: 'Listen to the beginning. Is the song fast or slow? Do you want to dance?' },
      { uk: 'Порахуй, скільки разів ти чуєш слово zoo.', ru: 'Посчитай, сколько раз ты слышишь слово zoo.', en: 'Count how many times you hear the word zoo.' },
      { uk: 'Подивися кліп. Яких персонажів мультфільму ти впізнав(ла)? Назви їх англійською.', ru: 'Посмотри клип. Каких персонажей мультфильма ты узнал(а)? Назови их по-английски.', en: 'Watch the video. Which characters from the film do you recognise? Name them in English.' },
      { uk: 'Запиши всіх тварин, яких бачиш у кліпі. Хто з них найбільший, а хто найменший?', ru: 'Запиши всех животных, которых видишь в клипе. Кто из них самый большой, а кто самый маленький?', en: 'Write down all the animals you see in the video. Which one is the biggest and which is the smallest?' },
    ],
    speaking: [
      'Which animal is your favourite? Why?',
      'If you lived in Zootopia, which neighbourhood would you choose?',
      'Compare two animals: which is faster, bigger, cuter?',
      'What makes a city a good place for everyone?',
      'Do you prefer quiet places or busy, crowded places?',
      'Why do you think kids love this song?',
    ],
    roleplay: {
      uk: 'A: ти турист, вперше приїхав(ла) в Зоотрополіс. B: ти місцевий мешканець-тварина. Розкажи, які тут райони, де найкраща вечірка і хто найшвидший у місті. Використовуйте порівняння.',
      ru: 'A: ты турист, впервые приехал(а) в Зверополис. B: ты местный житель-животное. Расскажи, какие здесь районы, где лучшая вечеринка и кто самый быстрый в городе. Используйте сравнения.',
      en: 'A: you are a tourist visiting Zootopia for the first time. B: you are an animal who lives there. Tell A about the neighbourhoods, where the best party is and who is the fastest in the city. Use comparisons.',
    },
    writing: {
      uk: 'Напиши короткий текст (50-80 слів) «Моє місто тварин». Яких тварин там багато, хто найвищий, найшвидший і найгучніший? Що там можна робити ввечері? Використай щонайменше чотири порівняння (faster than, the biggest, as tall as).',
      ru: 'Напиши короткий текст (50-80 слов) «Мой город животных». Каких животных там много, кто самый высокий, быстрый и громкий? Что там можно делать вечером? Используй как минимум четыре сравнения (faster than, the biggest, as tall as).',
      en: 'Write a short text (50-80 words) called My animal city. Which animals live there, who is the tallest, fastest and loudest? What can you do there in the evening? Use at least four comparisons (faster than, the biggest, as tall as).',
    },
  },


  'azizam': {
    facts: [
      { uk: 'Пісня вийшла 4 квітня 2025 року як перший сингл з альбому Еда Ширана «Play».', ru: 'Песня вышла 4 апреля 2025 года как первый сингл с альбома Эда Ширана «Play».', en: 'The song came out on 4 April 2025 as the first single from Ed Sheeran’s album Play.' },
      { uk: 'Azizam це перське слово, яке означає «мій дорогий» або «моя дорога». Aziz означає «дорогий, коханий», а закінчення -am означає «мій».', ru: 'Azizam это персидское слово, которое значит «мой дорогой» или «моя дорогая». Aziz значит «дорогой, любимый», а окончание -am значит «мой».', en: 'Azizam is a Persian word that means my dear. Aziz means dear or beloved, and the ending -am means my.' },
      { uk: 'Ед написав пісню після того, як продюсер Ілля Салманзаде запропонував створити музику, натхненну його перською спадщиною.', ru: 'Эд написал песню после того, как продюсер Илья Салманзаде предложил создать музыку, вдохновлённую его персидским наследием.', en: 'Ed wrote the song after producer Ilya Salmanzadeh suggested making music inspired by his Persian heritage.' },
      { uk: 'Ілля Салманзаде народився в Ірані, а виріс у Швеції.', ru: 'Илья Салманзаде родился в Иране, а вырос в Швеции.', en: 'Ilya Salmanzadeh was born in Iran and grew up in Sweden.' },
      { uk: 'Серед співавторів пісні, крім Еда та Іллі, Джонні Макдейд і Саван Котеча.', ru: 'Среди соавторов песни, кроме Эда и Ильи, Джонни Макдейд и Саван Котеча.', en: 'Besides Ed and Ilya, the co-writers include Johnny McDaid and Savan Kotecha.' },
    ],
    warmup: [
      'What music makes you want to dance?',
      'What kind words do people in your family use for each other?',
      'Have you ever heard music from Iran, India or Turkey? What did it sound like?',
    ],
    vocab: [
      {
        group: { uk: 'Почуття', ru: 'Чувства', en: 'Feelings' },
        items: [
          { en: 'joyful', uk: 'радісний', ru: 'радостный', ex: 'The wedding was a joyful day for the whole family.' },
          { en: 'to adore', uk: 'обожнювати', ru: 'обожать', ex: 'I adore my new kitten.' },
          { en: 'to care about', uk: 'піклуватися, бути небайдужим', ru: 'заботиться, быть небезразличным', ex: 'Good friends care about each other.' },
          { en: 'grateful', uk: 'вдячний', ru: 'благодарный', ex: 'I’m grateful for my parents’ help.' },
          { en: 'to cheer up', uk: 'підбадьорити, підняти настрій', ru: 'подбодрить, поднять настроение', ex: 'A funny film always cheers me up.' },
        ],
      },
      {
        group: { uk: 'Свято і танці', ru: 'Праздник и танцы', en: 'Party and dance' },
        items: [
          { en: 'to celebrate', uk: 'святкувати', ru: 'праздновать', ex: 'We celebrated my sister’s birthday at the park.' },
          { en: 'a dance floor', uk: 'танцмайданчик', ru: 'танцпол', ex: 'Everybody ran to the dance floor when the music started.' },
          { en: 'to clap along', uk: 'плескати в долоні в такт', ru: 'хлопать в ладоши в такт', ex: 'The audience clapped along to the song.' },
          { en: 'a rhythm', uk: 'ритм', ru: 'ритм', ex: 'This song has a fast rhythm.' },
          { en: 'catchy', uk: 'чіпкий, що легко запам’ятовується', ru: 'цепляющий, легко запоминающийся', ex: 'The tune is so catchy, I can’t stop humming it.' },
        ],
      },
      {
        group: { uk: 'Культура і мови', ru: 'Культура и языки', en: 'Culture and languages' },
        items: [
          { en: 'Persian', uk: 'перський; перська мова', ru: 'персидский; персидский язык', ex: 'Persian is spoken in Iran.' },
          { en: 'heritage', uk: 'спадщина', ru: 'наследие', ex: 'Embroidered shirts are part of our heritage.' },
          { en: 'traditional', uk: 'традиційний', ru: 'традиционный', ex: 'We cooked a traditional dish for the holiday.' },
          { en: 'to be inspired by', uk: 'надихатися чимось', ru: 'вдохновляться чем-то', ex: 'The painting was inspired by the sea.' },
          { en: 'an instrument', uk: 'музичний інструмент', ru: 'музыкальный инструмент', ex: 'Which instrument do you play?' },
        ],
      },
    ],
    grammar: {
      uk: 'Конструкція make + хтось + дієслово означає «змушувати когось щось робити» або «викликати щось»: You make me smile. This song makes me dance. Важливо: після make дієслово без to. Не кажіть makes me to smile. Інша конструкція: make + хтось + прикметник: Music makes me happy. Rain makes me sleepy. Питання: What makes you laugh? What makes you nervous? У минулому: The film made me cry. Схоже працюють let (дозволяти): My mum lets me stay up late, і help: Can you help me carry this? (тут to можна, але не обов’язково).',
      ru: 'Конструкция make + кто-то + глагол значит «заставлять кого-то что-то делать» или «вызывать что-то»: You make me smile. This song makes me dance. Важно: после make глагол без to. Не говорите makes me to smile. Другая конструкция: make + кто-то + прилагательное: Music makes me happy. Rain makes me sleepy. Вопросы: What makes you laugh? What makes you nervous? В прошлом: The film made me cry. Похоже работают let (позволять): My mum lets me stay up late, и help: Can you help me carry this? (здесь to можно, но не обязательно).',
      en: 'Make + someone + verb means to cause someone to do something: You make me smile. This song makes me dance. Important: no to after make. Don’t say makes me to smile. Another pattern is make + someone + adjective: Music makes me happy. Rain makes me sleepy. Questions: What makes you laugh? What makes you nervous? In the past: The film made me cry. Let works the same way: My mum lets me stay up late. With help, to is optional: Can you help me carry this?',
    },
    grammarEx: [
      { q: 'Your jokes always make me ___.', opts: ['laugh', 'to laugh', 'laughing'], a: 'laugh' },
      { q: 'This song makes me ___ happy.', opts: ['feel', 'to feel', 'feels'], a: 'feel' },
      { q: 'Rainy days make me ___.', opts: ['sleepy', 'sleep', 'to sleepy'], a: 'sleepy' },
      { q: 'What ___ you nervous before a test?', opts: ['makes', 'make', 'making'], a: 'makes' },
      { q: 'The sad film ___ my dad cry last night.', opts: ['made', 'makes', 'make'], a: 'made' },
      { q: 'My parents let me ___ to the party.', opts: ['go', 'to go', 'going'], a: 'go' },
      { q: 'Dancing makes ___ feel free.', opts: ['me', 'I', 'my'], a: 'me' },
      { q: 'Good music makes the party ___.', opts: ['fun', 'funny to', 'to fun'], a: 'fun' },
    ],
    gapfill: [
      { q: 'We ___ my grandma’s 80th birthday with a big lunch.', a: 'celebrated' },
      { q: 'This tune is really ___, everyone is singing it.', a: 'catchy' },
      { q: 'Ilya wanted to make music inspired by his Persian ___.', a: 'heritage' },
      { q: 'The audience began to ___ along to the music.', a: 'clap' },
      { q: 'Thank you for the present, I’m very ___.', a: 'grateful' },
      { q: 'A cup of cocoa always ___ me up.', a: 'cheers' },
      { q: 'People in Iran speak ___.', a: 'Persian' },
      { q: 'It was a ___ day, everyone was smiling.', a: 'joyful' },
    ],
    listen: [
      { uk: 'Послухай вступ. Яка мелодія: весела чи сумна? Під неї хочеться танцювати?', ru: 'Послушай вступление. Какая мелодия: весёлая или грустная? Под неё хочется танцевать?', en: 'Listen to the intro. Is the tune happy or sad? Does it make you want to dance?' },
      { uk: 'Порахуй, скільки разів ти чуєш слово azizam.', ru: 'Посчитай, сколько раз ты слышишь слово azizam.', en: 'Count how many times you hear the word azizam.' },
      { uk: 'Які звуки нагадують тобі музику Сходу? Опиши їх: швидкі, дзвінкі, ритмічні?', ru: 'Какие звуки напоминают тебе музыку Востока? Опиши их: быстрые, звонкие, ритмичные?', en: 'Which sounds remind you of music from the Middle East? Describe them: fast, bright, rhythmic?' },
      { uk: 'Подивися кліп. Опиши місця, які ти бачиш. Що роблять люди навколо Еда? Назви три дії.', ru: 'Посмотри клип. Опиши места, которые ты видишь. Что делают люди вокруг Эда? Назови три действия.', en: 'Watch the video. Describe the places you see. What are the people around Ed doing? Name three actions.' },
    ],
    speaking: [
      'What makes you smile on a normal school day?',
      'How does your family celebrate special days?',
      'Do you like songs that mix music from different countries? Why?',
      'What is a traditional song or dance from Ukraine that you like?',
      'Who do you call my dear or a similar warm name?',
      'Why do you think people around the world like this song?',
    ],
    roleplay: {
      uk: 'A: ти плануєш вечірку на честь дня народження друга. B: ти відповідаєш за музику. Обговоріть, які пісні поставити, щоб усі танцювали, і поясніть, чому кожна пісня робить настрій кращим (використайте make me feel...).',
      ru: 'A: ты планируешь вечеринку в честь дня рождения друга. B: ты отвечаешь за музыку. Обсудите, какие песни поставить, чтобы все танцевали, и объясните, почему каждая песня поднимает настроение (используйте make me feel...).',
      en: 'A: you are planning a birthday party for a friend. B: you are in charge of the music. Discuss which songs to play so everyone dances, and explain why each song makes people feel good (use make me feel...).',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) «Що робить мене щасливим(ою)». Назви три речі або людини і поясни чому. Використай make + me щонайменше тричі і два слова з уроку.',
      ru: 'Напиши короткий текст (60-100 слов) «Что делает меня счастливым(ой)». Назови три вещи или человека и объясни почему. Используй make + me как минимум трижды и два слова из урока.',
      en: 'Write a short text (60-100 words) called What makes me happy. Name three things or people and explain why. Use make + me at least three times and two words from the lesson.',
    },
  },

  'opalite': {
    lyricVideo: '3PJC6uPIekc',
    facts: [
      { uk: 'Пісня входить до 12-го студійного альбому Тейлор Свіфт «The Life of a Showgirl», який вийшов 3 жовтня 2025 року.', ru: 'Песня входит в 12-й студийный альбом Тейлор Свифт «The Life of a Showgirl», который вышел 3 октября 2025 года.', en: 'The song is on Taylor Swift’s 12th studio album, The Life of a Showgirl, released on 3 October 2025.' },
      { uk: 'За перший тиждень у США альбом продався тиражем понад 4 мільйони копій. Це рекорд.', ru: 'За первую неделю в США альбом продался тиражом более 4 миллионов копий. Это рекорд.', en: 'The album sold over 4 million copies in the US in its first week, a record.' },
      { uk: 'Опаліт це штучний, скляний різновид дорогоцінного каменю опалу. Тейлор пояснила, що він символізує щастя, яке ти створюєш сам.', ru: 'Опалит это искусственная, стеклянная разновидность драгоценного камня опала. Тейлор объяснила, что он символизирует счастье, которое ты создаёшь сам.', en: 'Opalite is a man-made glass version of the opal gemstone. Taylor explained that it stands for happiness you make yourself.' },
      { uk: 'Кліп вийшов 6 лютого 2026 року: спершу на стрімінгових сервісах, а пізніше на YouTube. Тейлор сама написала сценарій і зняла його як режисерка.', ru: 'Клип вышел 6 февраля 2026 года: сначала на стриминговых сервисах, а позже на YouTube. Тейлор сама написала сценарий и сняла его как режиссёр.', en: 'The video came out on 6 February 2026, first on streaming services and later on YouTube. Taylor wrote and directed it herself.' },
      { uk: 'Дія кліпу відбувається в 1990-х. Головну роль грає Донал Глісон, а в епізодах з’являються Грем Нортон, Кілліан Мерфі та Льюїс Капальді.', ru: 'Действие клипа происходит в 1990-х. Главную роль играет Донал Глисон, а в эпизодах появляются Грэм Нортон, Киллиан Мёрфи и Льюис Капальди.', en: 'The video is set in the 1990s. It stars Domhnall Gleeson, with cameos from Graham Norton, Cillian Murphy and Lewis Capaldi.' },
    ],
    warmup: [
      'What do you do when you feel sad or tired of everything?',
      'Do you think happiness comes by itself, or do we make it?',
      'Do you know any gemstones in English? Which one is your favourite?',
    ],
    vocab: [
      {
        group: { uk: 'Настрій', ru: 'Настроение', en: 'Mood' },
        items: [
          { en: 'gloomy', uk: 'похмурий', ru: 'мрачный', ex: 'It was a gloomy November afternoon.' },
          { en: 'cheerful', uk: 'життєрадісний, веселий', ru: 'жизнерадостный, весёлый', ex: 'Our new neighbour is always cheerful.' },
          { en: 'to feel down', uk: 'почуватися пригніченим', ru: 'чувствовать себя подавленным', ex: 'I felt down after I lost the game.' },
          { en: 'hopeful', uk: 'сповнений надії', ru: 'полный надежды', ex: 'I’m hopeful that we will win next time.' },
          { en: 'to bounce back', uk: 'швидко оговтатися', ru: 'быстро оправиться', ex: 'She was ill for a week, but she bounced back quickly.' },
        ],
      },
      {
        group: { uk: 'Зміни на краще', ru: 'Перемены к лучшему', en: 'Changes for the better' },
        items: [
          { en: 'to forgive', uk: 'пробачати', ru: 'прощать', ex: 'I forgave my friend for losing my book.' },
          { en: 'to let go of', uk: 'відпустити', ru: 'отпустить', ex: 'It’s time to let go of old worries.' },
          { en: 'a turning point', uk: 'поворотний момент', ru: 'поворотный момент', ex: 'Joining the choir was a turning point in my life.' },
          { en: 'to make a change', uk: 'щось змінити', ru: 'что-то изменить', ex: 'I want to make a change and get up earlier.' },
          { en: 'a habit', uk: 'звичка', ru: 'привычка', ex: 'Reading before bed is a good habit.' },
        ],
      },
      {
        group: { uk: 'Камені й світло', ru: 'Камни и свет', en: 'Stones and light' },
        items: [
          { en: 'a gemstone', uk: 'дорогоцінний камінь', ru: 'драгоценный камень', ex: 'A ruby is a red gemstone.' },
          { en: 'man-made', uk: 'штучний, створений людьми', ru: 'искусственный, созданный людьми', ex: 'This lake is man-made.' },
          { en: 'to shine', uk: 'сяяти', ru: 'сиять', ex: 'The stars shine brightly tonight.' },
          { en: 'to sparkle', uk: 'блищати, іскритися', ru: 'сверкать, искриться', ex: 'Her dress sparkled under the lights.' },
          { en: 'glass', uk: 'скло', ru: 'стекло', ex: 'The bowl is made of glass.' },
        ],
      },
    ],
    grammar: {
      uk: 'Make чи do? Make вживаємо, коли щось створюємо або з’являється щось нове: make a cake, make a plan, make a decision, make a change, make a mistake, make friends, make a noise, make money. Do вживаємо для роботи, обов’язків і дій загалом: do homework, do the dishes, do sport, do your best, do a favour, do nothing. Підказка: якщо результат можна «потримати в руках» або це щось нове, найчастіше make. Порівняйте: I did my homework, but I made three mistakes. Багато виразів треба просто запам’ятати: make your bed (застелити ліжко), але do the shopping.',
      ru: 'Make или do? Make используем, когда что-то создаём или появляется что-то новое: make a cake, make a plan, make a decision, make a change, make a mistake, make friends, make a noise, make money. Do используем для работы, обязанностей и действий вообще: do homework, do the dishes, do sport, do your best, do a favour, do nothing. Подсказка: если результат можно «подержать в руках» или это что-то новое, чаще всего make. Сравните: I did my homework, but I made three mistakes. Многие выражения нужно просто запомнить: make your bed (заправить кровать), но do the shopping.',
      en: 'Make or do? Use make when you create something or something new appears: make a cake, make a plan, make a decision, make a change, make a mistake, make friends, make a noise, make money. Use do for work, duties and actions in general: do homework, do the dishes, do sport, do your best, do a favour, do nothing. Tip: if you can hold the result or it is something new, it is usually make. Compare: I did my homework, but I made three mistakes. Some phrases you just have to learn: make your bed, but do the shopping.',
    },
    grammarEx: [
      { q: 'I need to ___ a decision about my summer plans.', opts: ['make', 'do', 'have'], a: 'make' },
      { q: 'Have you ___ your homework yet?', opts: ['done', 'made', 'did'], a: 'done' },
      { q: 'Everybody ___ mistakes sometimes.', opts: ['makes', 'does', 'gets'], a: 'makes' },
      { q: 'Just ___ your best and don’t worry.', opts: ['do', 'make', 'take'], a: 'do' },
      { q: 'She ___ a lot of friends at the summer camp.', opts: ['made', 'did', 'got'], a: 'made' },
      { q: 'Can you ___ me a favour and close the window?', opts: ['do', 'make', 'give'], a: 'do' },
      { q: 'It’s never too late to ___ a change.', opts: ['make', 'do', 'be'], a: 'make' },
      { q: 'Please ___ your bed before school.', opts: ['make', 'do', 'clean up'], a: 'make' },
    ],
    gapfill: [
      { q: 'The sky was grey and ___ all day.', a: 'gloomy' },
      { q: 'A diamond is a very expensive ___.', a: 'gemstone' },
      { q: 'This stone isn’t natural, it’s ___.', a: 'man-made' },
      { q: 'I’m sorry. Can you ___ me?', a: 'forgive' },
      { q: 'Winning the contest was a turning ___ for her.', a: 'point' },
      { q: 'The snow ___ in the sunlight.', a: 'sparkled' },
      { q: 'After a bad week, I always try to bounce ___.', a: 'back' },
      { q: 'Getting up early is a hard ___ to start.', a: 'habit' },
    ],
    listen: [
      { uk: 'Послухай початок. Настрій пісні світлий чи сумний? Наскільки швидкий темп?', ru: 'Послушай начало. Настроение песни светлое или грустное? Насколько быстрый темп?', en: 'Listen to the beginning. Is the mood bright or sad? How fast is the tempo?' },
      { uk: 'Порахуй, скільки разів ти чуєш слово opalite.', ru: 'Посчитай, сколько раз ты слышишь слово opalite.', en: 'Count how many times you hear the word opalite.' },
      { uk: 'Як змінюється музика від куплету до приспіву: стає гучнішою, швидшою, яскравішою?', ru: 'Как меняется музыка от куплета к припеву: становится громче, быстрее, ярче?', en: 'How does the music change from the verse to the chorus: louder, faster, brighter?' },
      { uk: 'Подивися кліп. За якими деталями видно, що це 1990-ті? Назви три речі.', ru: 'Посмотри клип. По каким деталям видно, что это 1990-е? Назови три вещи.', en: 'Watch the video. What details show that it is the 1990s? Name three things.' },
    ],
    speaking: [
      'What helps you bounce back after a bad day?',
      'Is it harder to forgive other people or to forgive yourself? Why?',
      'What change would you like to make this year?',
      'Do you think we can make our own happiness? How?',
      'What objects remind you of happy moments?',
      'Why do you think Taylor chose a man-made stone for the title?',
    ],
    roleplay: {
      uk: 'A: у тебе був важкий тиждень: погана оцінка і сварка з другом. B: ти друг, який підтримує. Вислухай, дай пораду, як подивитися на ситуацію з хорошого боку, і разом складіть план, що можна змінити (використайте make і do).',
      ru: 'A: у тебя была тяжёлая неделя: плохая оценка и ссора с другом. B: ты друг, который поддерживает. Выслушай, дай совет, как посмотреть на ситуацию с хорошей стороны, и вместе составьте план, что можно изменить (используйте make и do).',
      en: 'A: you had a hard week: a bad mark and an argument with a friend. B: you are a supportive friend. Listen, give advice on how to look on the bright side, and make a plan together for what can change (use make and do).',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) «Мій рецепт хорошого настрою». Розкажи, що ти робиш, коли тобі сумно, і які маленькі речі роблять твій день кращим. Використай щонайменше два вирази з make і два з do.',
      ru: 'Напиши короткий текст (60-100 слов) «Мой рецепт хорошего настроения». Расскажи, что ты делаешь, когда тебе грустно, и какие маленькие вещи делают твой день лучше. Используй как минимум два выражения с make и два с do.',
      en: 'Write a short text (60-100 words) called My recipe for a good mood. Say what you do when you feel sad and which small things make your day better. Use at least two phrases with make and two with do.',
    },
  },

};

export const DEEP_D: Record<string, SongDeep> = {
  'golden': {
    intro: {
      uk: 'Ця пісня стала одним із найбільших хітів 2025 року і найулюбленішою піснею багатьох дітей і підлітків. Вона про те, як перестати ховатися і засяяти на повну силу разом із друзями. Нижче зібрано живі англійські вирази про сміливість, талант, сцену і командну роботу. Усі приклади наші власні й узяті з повсякденного життя.',
      ru: 'Эта песня стала одним из самых больших хитов 2025 года и любимой песней многих детей и подростков. Она о том, как перестать прятаться и засиять в полную силу вместе с друзьями. Ниже собраны живые английские выражения о смелости, таланте, сцене и командной работе. Все примеры наши собственные и взяты из повседневной жизни.',
      en: 'This song became one of the biggest hits of 2025 and a favourite of many kids and teens. It is about stopping hiding and shining at full power together with your friends. Below are lively English expressions about courage, talent, the stage and teamwork. All the examples are our own and come from everyday life.',
    },
    phrases: [
      {
        en: 'to shine bright',
        m: { uk: 'яскраво сяяти, бути помітним завдяки таланту', ru: 'ярко сиять, быть заметным благодаря таланту', en: 'be noticed because of your talent or energy' },
        story: {
          uk: 'Буквально «яскраво світити», як зірка чи сонце. Так кажуть про людину, яка показує свої найкращі сторони. Вираз позитивний, його часто пишуть у листівках і бажаннях перед виступом. Ідея пісні саме в цьому: перестати бути тінню і засяяти.',
          ru: 'Буквально «ярко светить», как звезда или солнце. Так говорят о человеке, который показывает свои лучшие стороны. Выражение позитивное, его часто пишут в открытках и пожеланиях перед выступлением. Идея песни именно в этом: перестать быть тенью и засиять.',
          en: 'Literally to give a strong light, like a star or the sun. People say it about someone who shows their best side. It is positive and often written in cards and good-luck messages before a show. That is exactly the idea of the song: stop being a shadow and start to shine.',
        },
        ex: ['Good luck at the dance contest, shine bright!', 'In the school play, my shy friend really shone bright.'],
        similar: ['to stand out', 'to sparkle'],
        tip: {
          uk: 'Формально правильно brightly, але в розмовній мові й піснях кажуть shine bright. Обидва варіанти зрозумілі.',
          ru: 'Формально правильно brightly, но в разговорной речи и песнях говорят shine bright. Оба варианта понятны.',
          en: 'Strictly it is shine brightly, but people and songs often say shine bright. Both are understood.',
        },
      },
      {
        en: 'to come out of your shell',
        m: { uk: 'перестати соромитися, розкритися', ru: 'перестать стесняться, раскрыться', en: 'become less shy and more open' },
        story: {
          uk: 'Уявіть черепаху, яка нарешті виглядає зі свого панцира. Так кажуть про сором’язливу людину, яка стає впевненішою. Вираз дружній і теплий, батьки й учителі люблять його. Він добре пасує до історії героїнь, які вчаться не ховатися.',
          ru: 'Представьте черепаху, которая наконец выглядывает из своего панциря. Так говорят о стеснительном человеке, который становится увереннее. Выражение дружеское и тёплое, родители и учителя любят его. Оно хорошо подходит к истории героинь, которые учатся не прятаться.',
          en: 'Imagine a turtle finally looking out of its shell. We say this about a shy person who becomes more confident. It is friendly and warm, and parents and teachers love it. It fits the story of heroines learning not to hide.',
        },
        ex: ['After a month in the drama club, Max came out of his shell.', 'Playing in a band helped me come out of my shell.'],
        similar: ['to open up', 'to gain confidence'],
        tip: {
          uk: 'Кажіть your shell, his shell, her shell. Без присвійного слова вираз звучить дивно.',
          ru: 'Говорите your shell, his shell, her shell. Без притяжательного слова выражение звучит странно.',
          en: 'Use a possessive: your shell, his shell, her shell.',
        },
      },
      {
        en: 'to be in the spotlight',
        m: { uk: 'бути в центрі уваги', ru: 'быть в центре внимания', en: 'be the centre of attention' },
        story: {
          uk: 'Spotlight це прожектор на сцені, який світить на одного артиста. Звідси й вираз: бути в центрі уваги. Його вживають і про сцену, і про звичайне життя, наприклад, на дні народження. Героїні фільму постійно в центрі уваги, але мають великий секрет.',
          ru: 'Spotlight это прожектор на сцене, который светит на одного артиста. Отсюда и выражение: быть в центре внимания. Его используют и о сцене, и об обычной жизни, например, на дне рождения. Героини фильма постоянно в центре внимания, но у них большой секрет.',
          en: 'A spotlight is the stage light that shines on one performer. That gives us the phrase: to be the centre of attention. It is used about the stage and about everyday life, like a birthday party. The heroines of the film are always in the spotlight, but they have a big secret.',
        },
        ex: ['On her birthday, Sofia loves being in the spotlight.', 'I don’t like being in the spotlight, I prefer to help backstage.'],
        similar: ['to be the centre of attention', 'to steal the show'],
        tip: {
          uk: 'Протилежне: to stay out of the spotlight, тобто триматися в тіні.',
          ru: 'Противоположное: to stay out of the spotlight, то есть держаться в тени.',
          en: 'The opposite is to stay out of the spotlight.',
        },
      },
      {
        en: 'to have someone’s back',
        m: { uk: 'підтримувати когось, бути на чиємусь боці', ru: 'поддерживать кого-то, быть на чьей-то стороне', en: 'be ready to support and protect someone' },
        story: {
          uk: 'Буквально «прикривати чиюсь спину». Так кажуть друзі, які завжди допоможуть. Вираз розмовний і дуже дружній. Три героїні фільму сильні саме тому, що завжди підтримують одна одну.',
          ru: 'Буквально «прикрывать чью-то спину». Так говорят друзья, которые всегда помогут. Выражение разговорное и очень дружеское. Три героини фильма сильны именно потому, что всегда поддерживают друг друга.',
          en: 'Literally to watch someone’s back. Friends who will always help say this. It is informal and very friendly. The three heroines of the film are strong because they always support each other.',
        },
        ex: ['Don’t worry about the presentation, I’ve got your back.', 'My sister always has my back when Mum is angry.'],
        similar: ['to stand by someone', 'to support someone'],
        tip: {
          uk: 'Найчастіше кажуть I’ve got your back. Тут got не означає «отримав», це просто розмовна форма have.',
          ru: 'Чаще всего говорят I’ve got your back. Здесь got не значит «получил», это просто разговорная форма have.',
          en: 'The most common form is I’ve got your back. Here have got simply means have.',
        },
      },
      {
        en: 'stronger together',
        m: { uk: 'разом ми сильніші', ru: 'вместе мы сильнее', en: 'better as a team than alone' },
        story: {
          uk: 'Коротка фраза, яку часто пишуть на плакатах команд і шкільних проєктів. Вона нагадує, що в команді кожен робить свій внесок. Звучить надихаюче й трохи урочисто. Це головна думка дружби HUNTR/X.',
          ru: 'Короткая фраза, которую часто пишут на плакатах команд и школьных проектов. Она напоминает, что в команде каждый вносит свой вклад. Звучит вдохновляюще и немного торжественно. Это главная мысль дружбы HUNTR/X.',
          en: 'A short phrase often seen on team posters and school projects. It reminds us that everyone in a team adds something. It sounds inspiring and a little formal. It is the main idea of the HUNTR/X friendship.',
        },
        ex: ['Our class cleaned the whole park in one day. We’re stronger together!', 'The coach wrote stronger together on the board before the match.'],
        similar: ['teamwork makes the dream work', 'united we stand'],
        tip: {
          uk: 'Stronger це вищий ступінь від strong. Не кажіть more strong.',
          ru: 'Stronger это сравнительная степень от strong. Не говорите more strong.',
          en: 'Stronger is the comparative of strong. Don’t say more strong.',
        },
      },
      {
        en: 'to find your voice',
        m: { uk: 'знайти свій голос, почати висловлюватися', ru: 'найти свой голос, начать высказываться', en: 'become confident enough to say what you think' },
        story: {
          uk: 'Вираз має два значення: знайти свій стиль у співі й почати сміливо говорити те, що думаєш. Його вживають про артистів, письменників і звичайних людей. Звучить серйозно і надихаюче. Пісня якраз про такий момент, коли героїня нарешті звучить на повну.',
          ru: 'Выражение имеет два значения: найти свой стиль в пении и начать смело говорить то, что думаешь. Его используют об артистах, писателях и обычных людях. Звучит серьёзно и вдохновляюще. Песня как раз о таком моменте, когда героиня наконец звучит в полную силу.',
          en: 'The phrase has two meanings: to find your own style as a singer and to start saying what you think with confidence. It is used about artists, writers and ordinary people. It sounds serious and inspiring. The song is about exactly that moment when the heroine finally sounds at full power.',
        },
        ex: ['At first she only sang covers, but now she has found her voice.', 'Writing a blog helped me find my voice.'],
        similar: ['to speak up', 'to express yourself'],
        tip: {
          uk: 'Можна сказати і to lose your voice, але це означає «захрипнути», а не «перестати висловлюватися».',
          ru: 'Можно сказать и to lose your voice, но это значит «охрипнуть», а не «перестать высказываться».',
          en: 'To lose your voice usually means you can’t speak because your throat hurts.',
        },
      },
      {
        en: 'to hit a high note',
        m: { uk: 'взяти високу ноту; досягти успіху', ru: 'взять высокую ноту; достичь успеха', en: 'sing a very high sound; also, do something very well' },
        story: {
          uk: 'Перше значення музичне: заспівати дуже високо. Друге переносне: момент великого успіху. Пісня відома своїми дуже високими нотами, які фанати намагаються повторити в караоке. Тож вираз тут і буквальний, і переносний.',
          ru: 'Первое значение музыкальное: спеть очень высоко. Второе переносное: момент большого успеха. Песня известна своими очень высокими нотами, которые фанаты пытаются повторить в караоке. Так что выражение здесь и буквальное, и переносное.',
          en: 'The first meaning is musical: to sing very high. The second is figurative: a moment of great success. The song is famous for its very high notes that fans try to copy at karaoke. So here the phrase is both literal and figurative.',
        },
        ex: ['I tried to hit the high note at karaoke, but my voice cracked!', 'The school year ended on a high note with a big party.'],
        similar: ['to end on a high note', 'to nail it'],
        tip: {
          uk: 'End on a high note означає «закінчити на хорошій ноті», дуже поширений вираз.',
          ru: 'End on a high note значит «закончить на хорошей ноте», очень распространённое выражение.',
          en: 'To end on a high note means to finish in a happy, successful way.',
        },
      },
      {
        en: 'to keep a secret',
        m: { uk: 'зберігати таємницю', ru: 'хранить тайну', en: 'not tell anyone something private' },
        story: {
          uk: 'Героїні фільму мають подвійне життя: зірки сцени і таємні героїні. Вираз keep a secret дуже простий і потрібний щодня. Протилежне: to tell a secret або розмовне to spill the beans. Діти часто питають одне одного: Can you keep a secret?',
          ru: 'У героинь фильма двойная жизнь: звёзды сцены и тайные героини. Выражение keep a secret очень простое и нужно каждый день. Противоположное: to tell a secret или разговорное to spill the beans. Дети часто спрашивают друг друга: Can you keep a secret?',
          en: 'The heroines of the film have a double life: stage stars and secret heroes. To keep a secret is simple and useful every day. The opposite is to tell a secret or informal to spill the beans. Kids often ask each other: Can you keep a secret?',
        },
        ex: ['Can you keep a secret? I’m planning a surprise party for Dad.', 'My little brother can’t keep a secret for five minutes.'],
        similar: ['to keep quiet', 'to keep it to yourself'],
        tip: {
          uk: 'Кажіть keep a secret, а не hold a secret. Hold тут звучить неприродно.',
          ru: 'Говорите keep a secret, а не hold a secret. Hold здесь звучит неестественно.',
          en: 'Say keep a secret, not hold a secret.',
        },
      },
      {
        en: 'a dream come true',
        m: { uk: 'мрія, що здійснилася', ru: 'сбывшаяся мечта', en: 'something you wished for that really happened' },
        story: {
          uk: 'Ця фраза не змінюється: a dream come true, без has і без -s у come. Кажуть про великі події: виступ на сцені, зустріч з кумиром, подорож. Звучить радісно й емоційно. Для співачок, які стали голосом героїнь, успіх пісні справді став мрією, що здійснилася.',
          ru: 'Эта фраза не меняется: a dream come true, без has и без -s в come. Говорят о больших событиях: выступление на сцене, встреча с кумиром, путешествие. Звучит радостно и эмоционально. Для певиц, которые стали голосом героинь, успех песни действительно стал сбывшейся мечтой.',
          en: 'This phrase does not change: a dream come true, with no has and no -s on come. We use it for big events: a show on stage, meeting your idol, a trip. It sounds happy and emotional. For the singers behind the heroines, the song’s success really was a dream come true.',
        },
        ex: ['Meeting my favourite footballer was a dream come true.', 'For our choir, singing in the big hall was a dream come true.'],
        similar: ['a wish come true', 'like a fairy tale'],
        tip: {
          uk: 'Як дієслово: My dream came true. Як іменник: It was a dream come true.',
          ru: 'Как глагол: My dream came true. Как существительное: It was a dream come true.',
          en: 'As a verb: My dream came true. As a noun phrase: It was a dream come true.',
        },
      },
      {
        en: 'to be worth its weight in gold',
        m: { uk: 'бути на вагу золота, дуже цінним', ru: 'быть на вес золота, очень ценным', en: 'be extremely useful or valuable' },
        story: {
          uk: 'Буквально «вартий стільки золота, скільки сам важить». Так хвалять людину чи річ, без якої важко обійтися: доброго друга, вчителя, навіть зручний рюкзак. Вираз теплий і трохи старомодний, але його й досі часто вживають. Він гарно перегукується з назвою пісні.',
          ru: 'Буквально «стоит столько золота, сколько сам весит». Так хвалят человека или вещь, без которой трудно обойтись: хорошего друга, учителя, даже удобный рюкзак. Выражение тёплое и немного старомодное, но его до сих пор часто используют. Оно красиво перекликается с названием песни.',
          en: 'Literally worth as much gold as it weighs. We say it about a person or thing we can’t do without: a good friend, a teacher, even a comfy backpack. It is warm and a bit old-fashioned, but still common. It nicely echoes the title of the song.',
        },
        ex: ['A friend who helps with maths is worth her weight in gold.', 'This old bike is worth its weight in gold to me.'],
        similar: ['to be priceless', 'to be a treasure'],
        tip: {
          uk: 'Змінюйте присвійне слово: his weight, her weight, its weight, their weight.',
          ru: 'Меняйте притяжательное слово: his weight, her weight, its weight, their weight.',
          en: 'Change the possessive: his weight, her weight, its weight, their weight.',
        },
      },
    ],
    culture: [
      {
        uk: 'K-pop це корейська поп-музика. Для неї типові великі гурти, складні синхронні танці та дуже віддані фанати по всьому світу.',
        ru: 'K-pop это корейская поп-музыка. Для неё типичны большие группы, сложные синхронные танцы и очень преданные фанаты по всему миру.',
        en: 'K-pop is Korean pop music. It is known for big groups, complex synchronised dances and very loyal fans all over the world.',
      },
      {
        uk: 'Фільм «KPop-мисливиці на демонів» поєднує K-pop, корейські народні казки й анімацію. Пісні з нього співали в караоке, на шкільних концертах і в соцмережах.',
        ru: 'Фильм «KPop-охотницы на демонов» соединяет K-pop, корейские народные сказки и анимацию. Песни из него пели в караоке, на школьных концертах и в соцсетях.',
        en: 'The film KPop Demon Hunters mixes K-pop, Korean folk tales and animation. Its songs were sung at karaoke, school concerts and on social media.',
      },
      {
        uk: 'Слово golden в англійській часто означає щось дуже цінне або щасливе: a golden opportunity (чудова нагода), a golden rule (головне правило), golden memories (найкращі спогади).',
        ru: 'Слово golden в английском часто означает что-то очень ценное или счастливое: a golden opportunity (прекрасная возможность), a golden rule (главное правило), golden memories (лучшие воспоминания).',
        en: 'In English golden often means very valuable or happy: a golden opportunity, a golden rule, golden memories.',
      },
    ],
  },

  'soda-pop': {
    intro: {
      uk: 'Це одна з найприлипливіших пісень 2025 року: раз почуєш, і вона крутиться в голові весь день. Пісня солодка, як газування, а її виконавці у фільмі виявляються лиходіями. Нижче зібрано англійські вирази про солодощі, фанатів, прилипливі мелодії і про те, чому не варто судити за блискучою обгорткою. Усі приклади наші власні й узяті з повсякденного життя.',
      ru: 'Это одна из самых прилипчивых песен 2025 года: раз услышишь, и она крутится в голове весь день. Песня сладкая, как газировка, а её исполнители в фильме оказываются злодеями. Ниже собраны английские выражения о сладостях, фанатах, прилипчивых мелодиях и о том, почему не стоит судить по блестящей обёртке. Все примеры наши собственные и взяты из повседневной жизни.',
      en: 'This is one of the catchiest songs of 2025: hear it once and it stays in your head all day. The song is as sweet as soda, but its singers turn out to be the villains of the film. Below are English expressions about sweets, fans, catchy tunes and why we shouldn’t judge by shiny wrapping. All the examples are our own and come from everyday life.',
    },
    phrases: [
      {
        en: 'an earworm',
        m: { uk: 'мелодія, що застрягла в голові', ru: 'мелодия, застрявшая в голове', en: 'a song you can’t stop hearing in your head' },
        story: {
          uk: 'Буквально «вушний черв’як». Так жартома називають пісню, яка крутиться в голові без зупинки. Слово розмовне й веселе, його часто вживають у музичних статтях. Ця пісня класичний приклад такого «черв’яка».',
          ru: 'Буквально «ушной червяк». Так в шутку называют песню, которая крутится в голове без остановки. Слово разговорное и весёлое, его часто используют в музыкальных статьях. Эта песня классический пример такого «червяка».',
          en: 'Literally an ear worm. It is a funny name for a song that plays in your head nonstop. The word is informal and cheerful and often used in music articles. This song is a classic earworm.',
        },
        ex: ['That advert jingle is a real earworm.', 'Please stop singing, it’s such an earworm!'],
        similar: ['a catchy tune', 'a song stuck in your head'],
        tip: {
          uk: 'Пишеться одним словом: earworm.',
          ru: 'Пишется одним словом: earworm.',
          en: 'It is written as one word: earworm.',
        },
      },
      {
        en: 'to get stuck in your head',
        m: { uk: 'застрягти в голові', ru: 'застрять в голове', en: 'keep playing in your mind' },
        story: {
          uk: 'Найприродніший спосіб сказати, що пісня не відпускає. Носії мови вживають його постійно, особливо про хіти з TikTok і мультфільмів. Вираз нейтральний і розмовний. Порівняйте: The song is stuck in my head (стан) і It got stuck in my head (як це сталося).',
          ru: 'Самый естественный способ сказать, что песня не отпускает. Носители языка используют его постоянно, особенно о хитах из TikTok и мультфильмов. Выражение нейтральное и разговорное. Сравните: The song is stuck in my head (состояние) и It got stuck in my head (как это произошло).',
          en: 'The most natural way to say a song won’t leave you. Native speakers use it all the time, especially about hits from TikTok and cartoons. It is neutral and informal. Compare: The song is stuck in my head (a state) and It got stuck in my head (how it happened).',
        },
        ex: ['The cartoon song got stuck in my head during the test.', 'Is that tune still stuck in your head?'],
        similar: ['to have a song on repeat', 'to not get something out of your head'],
        tip: {
          uk: 'Stuck це третя форма від stick. Не кажіть sticked.',
          ru: 'Stuck это третья форма от stick. Не говорите sticked.',
          en: 'Stuck is the past form of stick. Never say sticked.',
        },
      },
      {
        en: 'to have a sweet tooth',
        m: { uk: 'бути ласуном, любити солодке', ru: 'быть сладкоежкой, любить сладкое', en: 'love sweet food' },
        story: {
          uk: 'Буквально «мати солодкий зуб». Так кажуть про людину, яка не може встояти перед тортом чи цукерками. Вираз дружній і жартівливий. Пісня про щось солодке й газоване, тож вираз тут дуже доречний.',
          ru: 'Буквально «иметь сладкий зуб». Так говорят о человеке, который не может устоять перед тортом или конфетами. Выражение дружеское и шутливое. Песня о чём-то сладком и газированном, так что выражение здесь очень уместно.',
          en: 'Literally to have a sweet tooth. We say it about someone who can’t say no to cake or sweets. It is friendly and humorous. The song is about something sweet and fizzy, so the phrase fits well.',
        },
        ex: ['My dad has a sweet tooth, he hides chocolate in his desk.', 'I don’t have a sweet tooth, I prefer crisps.'],
        similar: ['to love sweets', 'to be a chocoholic'],
        tip: {
          uk: 'Завжди tooth в однині: a sweet tooth, не sweet teeth.',
          ru: 'Всегда tooth в единственном числе: a sweet tooth, не sweet teeth.',
          en: 'Always singular: a sweet tooth, not sweet teeth.',
        },
      },
      {
        en: 'too good to be true',
        m: { uk: 'занадто добре, щоб бути правдою', ru: 'слишком хорошо, чтобы быть правдой', en: 'so good that it is probably not real' },
        story: {
          uk: 'Так кажуть, коли щось виглядає ідеально і через це викликає підозру. Вираз дуже поширений, особливо коли говорять про рекламу й шахраїв в інтернеті. У фільмі ідеальні й чарівні хлопці теж виявляються не тими, ким здаються. Корисна фраза для безпеки в мережі.',
          ru: 'Так говорят, когда что-то выглядит идеально и поэтому вызывает подозрение. Выражение очень распространено, особенно когда говорят о рекламе и мошенниках в интернете. В фильме идеальные и обаятельные парни тоже оказываются не теми, кем кажутся. Полезная фраза для безопасности в сети.',
          en: 'We say this when something looks perfect and that makes us suspicious. It is very common, especially when talking about adverts and online scams. In the film, the perfect, charming boys are not who they seem either. It is a useful phrase for staying safe online.',
        },
        ex: ['A free tablet for one like? Sounds too good to be true.', 'The price was too good to be true, and the shoes broke in a week.'],
        similar: ['a catch', 'what’s the catch?'],
        tip: {
          uk: 'Часто кажуть: If it sounds too good to be true, it probably is. Це популярна порада.',
          ru: 'Часто говорят: If it sounds too good to be true, it probably is. Это популярный совет.',
          en: 'A popular saying: If it sounds too good to be true, it probably is.',
        },
      },
      {
        en: 'to judge a book by its cover',
        m: { uk: 'судити за зовнішністю', ru: 'судить по внешности', en: 'decide what something is like only from how it looks' },
        story: {
          uk: 'Найчастіше звучить із запереченням: Don’t judge a book by its cover. Обкладинка не каже, що всередині книжки, так само й зовнішність. Це прислів’я знають усі. Блискучий бой-бенд із фільму гарний приклад, чому варто дивитися глибше.',
          ru: 'Чаще всего звучит с отрицанием: Don’t judge a book by its cover. Обложка не говорит, что внутри книги, так же и внешность. Эту пословицу знают все. Блестящий бойз-бенд из фильма хороший пример, почему стоит смотреть глубже.',
          en: 'It is usually negative: Don’t judge a book by its cover. A cover doesn’t tell you what is inside, and looks don’t either. Everyone knows this proverb. The shiny boy band in the film is a good example of why we should look deeper.',
        },
        ex: ['The café looked boring, but the pizza was great. Never judge a book by its cover.', 'He looks strict, but he’s the funniest teacher. Don’t judge a book by its cover!'],
        similar: ['looks can be deceiving', 'appearances can be deceptive'],
        tip: {
          uk: 'Its без апострофа, бо це присвійна форма. It’s означає it is.',
          ru: 'Its без апострофа, потому что это притяжательная форма. It’s значит it is.',
          en: 'Its has no apostrophe here. It’s means it is.',
        },
      },
      {
        en: 'to be a big fan of',
        m: { uk: 'бути великим шанувальником', ru: 'быть большим поклонником', en: 'like someone or something very much' },
        story: {
          uk: 'Найпростіший спосіб сказати, що тобі щось дуже подобається. Fan походить від слова fanatic. Вираз вживають про співаків, команди, ігри і навіть їжу. Можна сказати й навпаки: I’m not a big fan of broccoli, і це прозвучить ввічливо.',
          ru: 'Самый простой способ сказать, что тебе что-то очень нравится. Fan происходит от слова fanatic. Выражение используют о певцах, командах, играх и даже еде. Можно сказать и наоборот: I’m not a big fan of broccoli, и это прозвучит вежливо.',
          en: 'The easiest way to say you really like something. Fan comes from the word fanatic. We use it about singers, teams, games and even food. You can also say the opposite: I’m not a big fan of broccoli, and it sounds polite.',
        },
        ex: ['I’m a big fan of KPop Demon Hunters, I’ve seen it three times.', 'My grandma isn’t a big fan of loud music.'],
        similar: ['to be into', 'to be crazy about'],
        tip: {
          uk: 'Не a big fan to, а a big fan of. Прийменник of обов’язковий.',
          ru: 'Не a big fan to, а a big fan of. Предлог of обязателен.',
          en: 'Use of: a big fan of, not a big fan to.',
        },
      },
      {
        en: 'to sing along',
        m: { uk: 'підспівувати', ru: 'подпевать', en: 'sing together with a song or other people' },
        story: {
          uk: 'Along тут означає «разом, услід». На концертах артисти часто просять зал підспівувати. Від цього дієслова походить слово a sing-along, тобто спільний спів. Пісню з простим і прилипливим приспівом завжди легко підспівувати.',
          ru: 'Along здесь значит «вместе, следом». На концертах артисты часто просят зал подпевать. От этого глагола происходит слово a sing-along, то есть совместное пение. Песню с простым и прилипчивым припевом всегда легко подпевать.',
          en: 'Along here means together, following. At concerts singers often ask the crowd to sing along. From this verb we get the noun a sing-along, a time when everyone sings together. A song with a simple, catchy tune is always easy to sing along to.',
        },
        ex: ['Everyone in the car sang along to the radio.', 'The cinema had a sing-along version of the film.'],
        similar: ['to join in', 'to hum along'],
        tip: {
          uk: 'Якщо хочете назвати пісню, додайте to: sing along to a song.',
          ru: 'Если хотите назвать песню, добавьте to: sing along to a song.',
          en: 'To name the song, add to: sing along to a song.',
        },
      },
      {
        en: 'to steal the show',
        m: { uk: 'затьмарити всіх, стати зіркою вечора', ru: 'затмить всех, стать звездой вечера', en: 'get the most attention at an event' },
        story: {
          uk: 'Буквально «вкрасти шоу». Так кажуть, коли хтось несподівано стає найпомітнішим на заході. Вираз позитивний, хоча слово steal означає «красти». У фільмі суперники намагаються затьмарити головних героїнь і забрати їхніх фанатів.',
          ru: 'Буквально «украсть шоу». Так говорят, когда кто-то неожиданно становится самым заметным на мероприятии. Выражение позитивное, хотя слово steal значит «красть». В фильме соперники пытаются затмить главных героинь и забрать их фанатов.',
          en: 'Literally to steal the show. We say it when someone unexpectedly gets the most attention at an event. It is positive, even though steal means to take without asking. In the film the rivals try to steal the show from the heroines and take their fans.',
        },
        ex: ['My little cousin stole the show at the wedding with her dancing.', 'The dog stole the show in the school play.'],
        similar: ['to be the star of the show', 'to steal the spotlight'],
        tip: {
          uk: 'Минулий час: stole the show, третя форма: has stolen the show.',
          ru: 'Прошедшее время: stole the show, третья форма: has stolen the show.',
          en: 'Past: stole the show. Present perfect: has stolen the show.',
        },
      },
      {
        en: 'a sugar rush',
        m: { uk: 'сплеск енергії після солодкого', ru: 'всплеск энергии после сладкого', en: 'a burst of energy after eating a lot of sugar' },
        story: {
          uk: 'Rush означає «порив, поспіх». Так описують дітей, які після торта бігають по кімнаті. Вираз розмовний і жартівливий. Пісню теж іноді називають «цукровим вибухом», бо вона дуже енергійна й солодка на звук.',
          ru: 'Rush значит «порыв, спешка». Так описывают детей, которые после торта бегают по комнате. Выражение разговорное и шутливое. Песню тоже иногда называют «сахарным взрывом», потому что она очень энергичная и сладкая на звук.',
          en: 'A rush is a sudden burst. We use it about kids running around the room after cake. It is informal and funny. People sometimes call a song like this a sugar rush too, because it sounds so sweet and full of energy.',
        },
        ex: ['After the birthday cake, all the kids had a sugar rush.', 'This song gives me a sugar rush, I can’t sit still!'],
        similar: ['a burst of energy', 'to be hyper'],
        tip: {
          uk: 'Після сплеску буває a sugar crash, тобто раптова втома.',
          ru: 'После всплеска бывает a sugar crash, то есть внезапная усталость.',
          en: 'After a sugar rush often comes a sugar crash, when you suddenly feel tired.',
        },
      },
      {
        en: 'to fall for',
        m: { uk: 'повестися на щось, повірити в обман; закохатися', ru: 'повестись на что-то, поверить в обман; влюбиться', en: 'believe a trick, or start to really like someone' },
        story: {
          uk: 'Фразове дієслово має два значення. Перше: повірити в хитрість, наприклад, fall for a joke. Друге: сильно захопитися кимось. У фільмі багато фанатів «ведуться» на чарівність лиходіїв. Корисно знати обидва значення, бо вони часто трапляються в розмовах.',
          ru: 'Фразовый глагол имеет два значения. Первое: поверить в хитрость, например, fall for a joke. Второе: сильно увлечься кем-то. В фильме многие фанаты «ведутся» на обаяние злодеев. Полезно знать оба значения, потому что они часто встречаются в разговорах.',
          en: 'This phrasal verb has two meanings. First, to believe a trick, as in fall for a joke. Second, to start liking someone a lot. In the film many fans fall for the villains’ charm. Both meanings are common in conversation, so they are good to know.',
        },
        ex: ['I fell for my brother’s April Fool’s joke again!', 'Don’t fall for messages that say you’ve won a prize.'],
        similar: ['to be fooled by', 'to be taken in by'],
        tip: {
          uk: 'Минулий час fell for. Не плутайте з fall in, це «провалитися» або «обвалитися».',
          ru: 'Прошедшее время fell for. Не путайте с fall in, это «провалиться» или «обвалиться».',
          en: 'Past: fell for. Don’t mix it up with fall in, which means to collapse or drop into something.',
        },
      },
    ],
    culture: [
      {
        uk: 'Бой-бенди, тобто гурти з кількох хлопців, які співають і танцюють, популярні вже багато десятиліть: від британських і американських гуртів до сучасних корейських.',
        ru: 'Бойз-бенды, то есть группы из нескольких парней, которые поют и танцуют, популярны уже много десятилетий: от британских и американских групп до современных корейских.',
        en: 'Boy bands, groups of young men who sing and dance, have been popular for decades, from British and American bands to modern Korean ones.',
      },
      {
        uk: 'Слово soda в американській англійській означає газований напій. У Британії частіше кажуть fizzy drink, а в деяких регіонах США pop.',
        ru: 'Слово soda в американском английском означает газированный напиток. В Британии чаще говорят fizzy drink, а в некоторых регионах США pop.',
        en: 'In American English soda means a fizzy drink. In Britain people more often say fizzy drink, and in some parts of the USA they say pop.',
      },
      {
        uk: 'Слово pop має кілька значень: поп-музика, звук «пуф» і, в американській розмовній мові, газований напій. Тому назва пісні звучить як весела гра слів.',
        ru: 'Слово pop имеет несколько значений: поп-музыка, звук «пуф» и, в американской разговорной речи, газированный напиток. Поэтому название песни звучит как весёлая игра слов.',
        en: 'The word pop has several meanings: pop music, a popping sound and, in informal American English, a fizzy drink. So the title is a fun play on words.',
      },
    ],
  },


  'ordinary': {
    intro: {
      uk: 'Ця балада про те, як кохання перетворює звичайне життя на щось особливе. Вона дає чудовий привід поговорити англійською про почуття, про дрібниці, які роблять день яскравим, і про те, як описати щось «надзвичайне». Нижче зібрано живі вирази, якими носії мови говорять про закоханість, захоплення і цінність простих моментів. Усі приклади наші власні й узяті з повсякденного життя.',
      ru: 'Эта баллада о том, как любовь превращает обычную жизнь во что-то особенное. Она даёт отличный повод поговорить по-английски о чувствах, о мелочах, которые делают день ярким, и о том, как описать что-то «необыкновенное». Ниже собраны живые выражения, которыми носители языка говорят о влюблённости, восхищении и ценности простых моментов. Все примеры наши собственные и взяты из повседневной жизни.',
      en: 'This ballad is about how love turns ordinary life into something special. It is a great reason to talk in English about feelings, about the small things that make a day bright and about how to describe something extraordinary. Below are lively expressions native speakers use to talk about falling in love, being amazed and valuing simple moments. All the examples are our own and come from everyday life.',
    },
    phrases: [
      {
        en: 'to be head over heels',
        m: { uk: 'бути по вуха закоханим', ru: 'быть по уши влюблённым', en: 'be completely in love' },
        story: {
          uk: 'Буквально «головою над п’ятами», тобто перевернутий догори дриґом. Так англійці описують людину, яка закохалася настільки, що втратила рівновагу. Вираз розмовний, теплий і трохи жартівливий. Він добре передає настрій пісень про сильне кохання.',
          ru: 'Буквально «головой над пятками», то есть перевёрнутый вверх ногами. Так англичане описывают человека, который влюбился настолько, что потерял равновесие. Выражение разговорное, тёплое и немного шутливое. Оно хорошо передаёт настроение песен о сильной любви.',
          en: 'Literally head over heels, as if you were upside down. English speakers use it for someone so in love that they have lost their balance. It is informal, warm and a little playful. It matches the mood of songs about strong love.',
        },
        ex: ['My uncle is head over heels for his new wife.', 'She fell head over heels for Paris on her first trip.'],
        similar: ['to be crazy about someone', 'to be smitten'],
        tip: {
          uk: 'Часто кажуть fall head over heels (for someone). Вираз можна вжити і про місто чи хобі, не лише про людину.',
          ru: 'Часто говорят fall head over heels (for someone). Выражение можно использовать и о городе или хобби, не только о человеке.',
          en: 'People often say fall head over heels (for someone). You can use it about a city or a hobby too, not only a person.',
        },
      },
      {
        en: 'out of this world',
        m: { uk: 'неймовірний, «неземний»', ru: 'невероятный, «неземной»', en: 'extremely good, amazing' },
        story: {
          uk: 'Якщо щось out of this world, воно таке гарне, що ніби не з нашого світу. Найчастіше так хвалять їжу, музику, краєвиди чи виступи. Вираз розмовний і дуже позитивний. Він підходить до ідеї пісні: звичайне стає неймовірним, коли поруч правильна людина.',
          ru: 'Если что-то out of this world, оно такое прекрасное, будто не из нашего мира. Чаще всего так хвалят еду, музыку, пейзажи или выступления. Выражение разговорное и очень позитивное. Оно подходит к идее песни: обычное становится невероятным, когда рядом правильный человек.',
          en: 'If something is out of this world, it is so good that it seems to come from another world. People usually say it about food, music, views or performances. It is informal and very positive. It fits the song’s idea that ordinary things become amazing with the right person.',
        },
        ex: ['The view from the mountain top was out of this world.', 'Have you tried their hot chocolate? It’s out of this world!'],
        similar: ['amazing', 'mind-blowing'],
        tip: {
          uk: 'Не плутайте з out of the world. Правильно лише out of this world, зі словом this.',
          ru: 'Не путайте с out of the world. Правильно только out of this world, со словом this.',
          en: 'Don’t say out of the world. The correct form is out of this world, with this.',
        },
      },
      {
        en: 'to mean the world to someone',
        m: { uk: 'бути дуже важливим для когось', ru: 'быть очень важным для кого-то', en: 'be extremely important to someone' },
        story: {
          uk: 'Коли хтось means the world to you, ця людина для тебе як цілий світ. Вираз щирий і емоційний, його пишуть у листівках, кажуть у промовах на весіллях і днях народження. Ним можна подякувати: It means the world to me. Він ідеально пасує до пісні, яку часто грають на весіллях.',
          ru: 'Когда кто-то means the world to you, этот человек для тебя как целый мир. Выражение искреннее и эмоциональное, его пишут в открытках, говорят в речах на свадьбах и днях рождения. Им можно поблагодарить: It means the world to me. Оно идеально подходит к песне, которую часто играют на свадьбах.',
          en: 'When someone means the world to you, they are like your whole world. The phrase is sincere and emotional, and people write it in cards and say it in wedding and birthday speeches. You can also use it to say thank you: It means the world to me. It fits a song that is often played at weddings.',
        },
        ex: ['Thank you for coming to my show. It means the world to me.', 'My dog means the world to me, he’s always happy to see me.'],
        similar: ['to mean a lot to someone', 'to be everything to someone'],
        tip: {
          uk: 'Кажіть mean the world to someone з прийменником to. Не кажіть mean the world for me.',
          ru: 'Говорите mean the world to someone с предлогом to. Не говорите mean the world for me.',
          en: 'Use to: mean the world to someone, not mean the world for me.',
        },
      },
      {
        en: 'to sweep someone off their feet',
        m: { uk: 'зачарувати, підкорити когось', ru: 'очаровать, покорить кого-то', en: 'make someone fall in love quickly' },
        story: {
          uk: 'Уявіть, що людину буквально підхопили і вона вже не стоїть на ногах. Так кажуть про романтичне, швидке і сильне враження. Вираз трохи казковий, його часто чути у фільмах про кохання. Він добре підходить до весільного кліпу і теми пісні.',
          ru: 'Представьте, что человека буквально подхватили и он уже не стоит на ногах. Так говорят о романтическом, быстром и сильном впечатлении. Выражение немного сказочное, его часто слышно в фильмах о любви. Оно хорошо подходит к свадебному клипу и теме песни.',
          en: 'Imagine someone being lifted up so they are no longer standing on their feet. People say this about a fast, strong, romantic impression. It sounds a bit like a fairy tale and is common in romantic films. It suits the wedding video and the theme of the song.',
        },
        ex: ['He swept her off her feet with a picnic on the roof.', 'The new musical swept the audience off their feet.'],
        similar: ['to win someone’s heart', 'to charm someone'],
        tip: {
          uk: 'Змінюйте займенник: sweep her off her feet, sweep him off his feet.',
          ru: 'Меняйте местоимение: sweep her off her feet, sweep him off his feet.',
          en: 'Change the pronoun: sweep her off her feet, sweep him off his feet.',
        },
      },
      {
        en: 'the little things',
        m: { uk: 'дрібниці, маленькі радощі', ru: 'мелочи, маленькие радости', en: 'small details that make life nice' },
        story: {
          uk: 'Носії мови часто кажуть it’s the little things, коли хочуть сказати, що щастя складається з дрібниць: чашки какао, усмішки, теплої шкарпетки. Вираз простий і теплий. Він чудово описує ідею пісні про звичайне життя, яке стає особливим.',
          ru: 'Носители языка часто говорят it’s the little things, когда хотят сказать, что счастье состоит из мелочей: чашки какао, улыбки, тёплого носка. Выражение простое и тёплое. Оно отлично описывает идею песни об обычной жизни, которая становится особенной.',
          en: 'Native speakers often say it’s the little things to mean that happiness is made of small details: a cup of cocoa, a smile, a warm sock. It is simple and warm. It describes the song’s idea of ordinary life becoming special very well.',
        },
        ex: ['Mum left a note in my lunchbox. It’s the little things!', 'I love the little things, like the smell of rain.'],
        similar: ['small joys', 'simple pleasures'],
        tip: {
          uk: 'Вживайте з the: the little things. Без артикля фраза звучить незавершено.',
          ru: 'Используйте с the: the little things. Без артикля фраза звучит незаконченно.',
          en: 'Use the: the little things. Without the article it sounds unfinished.',
        },
      },
      {
        en: 'to make someone’s day',
        m: { uk: 'зробити комусь день, дуже порадувати', ru: 'сделать кому-то день, очень обрадовать', en: 'make someone very happy' },
        story: {
          uk: 'Якщо щось made my day, воно так порадувало, що весь день став кращим. Це дуже поширена розмовна фраза, її пишуть у коментарях і повідомленнях. Вона показує, як одна дрібниця може змінити звичайний день. Саме про це настрій пісні.',
          ru: 'Если что-то made my day, оно так обрадовало, что весь день стал лучше. Это очень распространённая разговорная фраза, её пишут в комментариях и сообщениях. Она показывает, как одна мелочь может изменить обычный день. Именно об этом настроение песни.',
          en: 'If something made my day, it made you so happy that the whole day got better. It is a very common informal phrase, often written in comments and messages. It shows how one small thing can change an ordinary day. That is the mood of the song.',
        },
        ex: ['Your funny message really made my day.', 'The bus driver smiled and waved. It made my day.'],
        similar: ['to brighten someone’s day', 'to put a smile on someone’s face'],
        tip: {
          uk: 'Найчастіше вживають у минулому часі: That made my day! You made my day!',
          ru: 'Чаще всего используют в прошедшем времени: That made my day! You made my day!',
          en: 'It is most often used in the past: That made my day! You made my day!',
        },
      },
      {
        en: 'larger than life',
        m: { uk: 'яскравий, помітніший за всіх', ru: 'яркий, заметнее всех', en: 'more exciting or impressive than normal' },
        story: {
          uk: 'Larger than life кажуть про людей чи події, які здаються більшими за звичайне життя: яскраві, гучні, незабутні. Вираз нейтральний і позитивний. Ним описують зірок, харизматичних родичів чи великі шоу. Він добре протиставляється слову ordinary.',
          ru: 'Larger than life говорят о людях или событиях, которые кажутся больше обычной жизни: яркие, громкие, незабываемые. Выражение нейтральное и позитивное. Им описывают звёзд, харизматичных родственников или большие шоу. Оно хорошо противопоставляется слову ordinary.',
          en: 'Larger than life describes people or events that seem bigger than normal life: bright, loud and unforgettable. It is neutral and positive. People use it about stars, charismatic relatives or huge shows. It is a nice opposite to the word ordinary.',
        },
        ex: ['My uncle is larger than life, he fills the room with jokes.', 'The concert felt larger than life with all the lights.'],
        similar: ['unforgettable', 'one of a kind'],
        tip: {
          uk: 'Перед іменником пишуть через дефіс: a larger-than-life character.',
          ru: 'Перед существительным пишут через дефис: a larger-than-life character.',
          en: 'Before a noun use hyphens: a larger-than-life character.',
        },
      },
      {
        en: 'to fall for someone',
        m: { uk: 'закохатися в когось', ru: 'влюбиться в кого-то', en: 'start to love someone' },
        story: {
          uk: 'Fall тут означає «впасти» в почуття. Fall for someone коротший і розмовніший варіант fall in love with someone. Вираз дуже поширений у піснях і серіалах. Увага: fall for something має ще значення «повестися на обман».',
          ru: 'Fall здесь значит «упасть» в чувства. Fall for someone более короткий и разговорный вариант fall in love with someone. Выражение очень распространено в песнях и сериалах. Внимание: fall for something имеет ещё значение «повестись на обман».',
          en: 'Fall here means falling into a feeling. Fall for someone is a shorter, more informal way to say fall in love with someone. It is very common in songs and series. Careful: fall for something can also mean to be tricked.',
        },
        ex: ['In the story, the prince falls for a girl from the village.', 'I almost fell for that fake prize message.'],
        similar: ['to fall in love with', 'to have a crush on'],
        tip: {
          uk: 'Після fall потрібен прийменник for: fall for someone, а не fall someone.',
          ru: 'После fall нужен предлог for: fall for someone, а не fall someone.',
          en: 'You need for after fall: fall for someone, not fall someone.',
        },
      },
      {
        en: 'to cherish every moment',
        m: { uk: 'цінувати кожну мить', ru: 'ценить каждое мгновение', en: 'value and enjoy every minute' },
        story: {
          uk: 'Cherish означає «дорожити, берегти з любов’ю». Фразу cherish every moment часто кажуть батькам маленьких дітей, молодятам або випускникам. Вона звучить трохи урочисто й тепло. Ідея пісні саме в тому, щоб помічати красу кожного звичайного моменту.',
          ru: 'Cherish значит «дорожить, беречь с любовью». Фразу cherish every moment часто говорят родителям маленьких детей, молодожёнам или выпускникам. Она звучит немного торжественно и тепло. Идея песни именно в том, чтобы замечать красоту каждого обычного момента.',
          en: 'Cherish means to value something with love. People often say cherish every moment to new parents, newlyweds or graduates. It sounds a little formal and warm. The idea of the song is exactly to notice the beauty of every ordinary moment.',
        },
        ex: ['It’s our last summer before university, let’s cherish every moment.', 'Grandpa told me to cherish every moment with my friends.'],
        similar: ['to make the most of every moment', 'to savour every moment'],
        tip: {
          uk: 'Після every іменник в однині: every moment, every day, а не every moments.',
          ru: 'После every существительное в единственном числе: every moment, every day, а не every moments.',
          en: 'Every takes a singular noun: every moment, every day, not every moments.',
        },
      },
      {
        en: 'a dream come true',
        m: { uk: 'мрія, що здійснилася', ru: 'сбывшаяся мечта', en: 'something you wanted very much that really happened' },
        story: {
          uk: 'Так кажуть, коли збувається щось, про що давно мріяв: подорож, зустріч, перемога. Вираз нейтральний і дуже емоційний. Для Алекса Воррена, який починав як блогер, світовий хіт став справжньою мрією, що здійснилася. І саме так часто описують весілля.',
          ru: 'Так говорят, когда сбывается что-то, о чём давно мечтал: путешествие, встреча, победа. Выражение нейтральное и очень эмоциональное. Для Алекса Уоррена, который начинал как блогер, мировой хит стал настоящей сбывшейся мечтой. И именно так часто описывают свадьбу.',
          en: 'People say this when something they wanted for a long time finally happens: a trip, a meeting, a win. It is neutral and very emotional. For Alex Warren, who started as a content creator, a worldwide hit was a real dream come true. Weddings are often described this way too.',
        },
        ex: ['Meeting my favourite footballer was a dream come true.', 'For my mum, our new garden is a dream come true.'],
        similar: ['a wish come true', 'like a fairy tale'],
        tip: {
          uk: 'Тут come без -s і без -ing: a dream come true. Це стала фраза.',
          ru: 'Здесь come без -s и без -ing: a dream come true. Это устойчивая фраза.',
          en: 'Come has no -s and no -ing here: a dream come true. It is a fixed phrase.',
        },
      },
    ],
    culture: [
      {
        uk: 'Після виходу «Ordinary» пісню почали масово обирати для першого танцю на весіллях. Сам Алекс Воррен випустив спеціальну весільну версію і кліп до неї.',
        ru: 'После выхода «Ordinary» песню начали массово выбирать для первого танца на свадьбах. Сам Алекс Уоррен выпустил специальную свадебную версию и клип к ней.',
        en: 'After Ordinary came out, many couples chose it for their first dance at weddings. Alex Warren himself released a special wedding version with its own music video.',
      },
      {
        uk: 'Перший танець молодят дуже важлива традиція в англомовних країнах. Пару для нього часто обирають пісню заздалегідь і навіть беруть уроки танцю.',
        ru: 'Первый танец молодожёнов очень важная традиция в англоязычных странах. Пары часто выбирают для него песню заранее и даже берут уроки танца.',
        en: 'The first dance of the newlyweds is an important tradition in English-speaking countries. Couples often choose the song long in advance and even take dance lessons.',
      },
      {
        uk: 'Алекс Воррен один із багатьох сучасних артистів, які прийшли в музику з YouTube і TikTok. Платформи коротких відео сьогодні допомагають новим пісням стати світовими хітами.',
        ru: 'Алекс Уоррен один из многих современных артистов, которые пришли в музыку из YouTube и TikTok. Платформы коротких видео сегодня помогают новым песням стать мировыми хитами.',
        en: 'Alex Warren is one of many modern artists who came to music from YouTube and TikTok. Short-video platforms now help new songs become worldwide hits.',
      },
    ],
  },

  'beautiful-things': {
    intro: {
      uk: 'Ця пісня про дивне почуття: коли в житті нарешті все добре, з’являється страх це втратити. Вона допомагає поговорити англійською про вдячність, тривогу і про те, як цінувати те, що маємо. Нижче зібрано живі вирази, якими носії мови говорять про хвилювання, спокій і вдячність. Усі приклади наші власні й узяті з повсякденного життя.',
      ru: 'Эта песня о странном чувстве: когда в жизни наконец всё хорошо, появляется страх это потерять. Она помогает поговорить по-английски о благодарности, тревоге и о том, как ценить то, что имеем. Ниже собраны живые выражения, которыми носители языка говорят о волнении, спокойствии и благодарности. Все примеры наши собственные и взяты из повседневной жизни.',
      en: 'This song is about a strange feeling: when life is finally good, you start to fear losing it. It helps us talk in English about gratitude, worry and valuing what we have. Below are lively expressions native speakers use to talk about worry, calm and gratitude. All the examples are our own and come from everyday life.',
    },
    phrases: [
      {
        en: 'to count your blessings',
        m: { uk: 'цінувати те добре, що маєш', ru: 'ценить то хорошее, что имеешь', en: 'think about the good things you have' },
        story: {
          uk: 'Буквально «рахувати свої блага». Так радять людині, яка сумує чи скаржиться: згадай, що в тебе вже є добре. Вираз старий, але дуже живий, його кажуть батьки, бабусі, вчителі. Він відображає вдячну половину настрою пісні.',
          ru: 'Буквально «считать свои блага». Так советуют человеку, который грустит или жалуется: вспомни, что у тебя уже есть хорошего. Выражение старое, но очень живое, его говорят родители, бабушки, учителя. Оно отражает благодарную половину настроения песни.',
          en: 'Literally count your blessings. People give this advice to someone who is sad or complaining: remember the good things you already have. It is an old phrase but still very much alive, used by parents, grandparents and teachers. It reflects the grateful half of the song’s mood.',
        },
        ex: ['We lost the match, but nobody got hurt. Let’s count our blessings.', 'When I feel down, I count my blessings and write them in a notebook.'],
        similar: ['to be thankful for what you have', 'to look on the bright side'],
        tip: {
          uk: 'Змінюйте займенник: count your blessings, count my blessings, count our blessings.',
          ru: 'Меняйте местоимение: count your blessings, count my blessings, count our blessings.',
          en: 'Change the pronoun: count your blessings, count my blessings, count our blessings.',
        },
      },
      {
        en: 'to take something for granted',
        m: { uk: 'сприймати як належне', ru: 'воспринимать как должное', en: 'not notice how valuable something is' },
        story: {
          uk: 'Коли ми take something for granted, ми думаємо, що це буде завжди, і перестаємо це цінувати. Так часто буває зі здоров’ям, батьками, друзями, теплою квартирою. Вираз нейтральний і дуже поширений. Пісня якраз про протилежне: людина добре знає ціну тому, що має.',
          ru: 'Когда мы take something for granted, мы думаем, что это будет всегда, и перестаём это ценить. Так часто бывает со здоровьем, родителями, друзьями, тёплой квартирой. Выражение нейтральное и очень распространённое. Песня как раз о противоположном: человек хорошо знает цену тому, что имеет.',
          en: 'When we take something for granted, we think it will always be there, so we stop valuing it. This often happens with health, parents, friends or a warm home. The phrase is neutral and very common. The song is about the opposite: the person knows exactly how precious their life is.',
        },
        ex: ['I took hot water for granted until it was turned off for a week.', 'Don’t take your friends for granted, call them sometimes.'],
        similar: ['to not appreciate', 'to overlook'],
        tip: {
          uk: 'Пишеться granted, з -ed. Не кажіть take for grant.',
          ru: 'Пишется granted, с -ed. Не говорите take for grant.',
          en: 'It is granted with -ed. Don’t say take for grant.',
        },
      },
      {
        en: 'to be on edge',
        m: { uk: 'нервувати, бути на взводі', ru: 'нервничать, быть на взводе', en: 'feel nervous and tense' },
        story: {
          uk: 'Edge це край. Людина, яка on edge, ніби стоїть на краю: напружена й чекає чогось поганого. Так кажуть перед іспитами, важливими новинами чи коли все надто добре і страшно, що це скінчиться. Вираз розмовний і дуже поширений.',
          ru: 'Edge это край. Человек, который on edge, будто стоит на краю: напряжён и ждёт чего-то плохого. Так говорят перед экзаменами, важными новостями или когда всё слишком хорошо и страшно, что это закончится. Выражение разговорное и очень распространённое.',
          en: 'Edge means the edge of something. A person who is on edge feels as if they are standing on the edge: tense and waiting for something bad. People say it before exams, important news, or when things are so good that they fear it will end. It is informal and very common.',
        },
        ex: ['Everyone was on edge while we waited for the test results.', 'The thunder kept the dog on edge all night.'],
        similar: ['to be nervous', 'to be on pins and needles'],
        tip: {
          uk: 'Протилежне значення: at ease, тобто спокійно й розслаблено.',
          ru: 'Противоположное значение: at ease, то есть спокойно и расслабленно.',
          en: 'The opposite is at ease, meaning calm and relaxed.',
        },
      },
      {
        en: 'peace of mind',
        m: { uk: 'душевний спокій', ru: 'душевное спокойствие', en: 'a calm feeling with no worries' },
        story: {
          uk: 'Peace of mind це відчуття, коли не треба ні про що хвилюватися. Фразу часто чути в рекламі страховок і замків, але й у звичайних розмовах. Вона описує те, чого так хоче герой пісні: просто спокійно насолоджуватися добрими речами.',
          ru: 'Peace of mind это ощущение, когда не нужно ни о чём волноваться. Фразу часто слышно в рекламе страховок и замков, но и в обычных разговорах. Она описывает то, чего так хочет герой песни: просто спокойно наслаждаться хорошими вещами.',
          en: 'Peace of mind is the feeling of not having to worry about anything. You often hear it in ads for insurance and locks, but also in everyday talk. It describes what the person in the song wants: to simply enjoy the good things calmly.',
        },
        ex: ['I check the door twice for peace of mind.', 'Mum gave me a spare phone charger, just for peace of mind.'],
        similar: ['calm', 'reassurance'],
        tip: {
          uk: 'Без артикля: for peace of mind, а не for a peace of mind.',
          ru: 'Без артикля: for peace of mind, а не for a peace of mind.',
          en: 'No article: for peace of mind, not for a peace of mind.',
        },
      },
      {
        en: 'to hold on tight',
        m: { uk: 'міцно триматися', ru: 'крепко держаться', en: 'hold something firmly so you don’t lose it' },
        story: {
          uk: 'Hold on tight кажуть буквально, наприклад на атракціоні, і переносно, коли не хочеш відпускати щось цінне: дружбу, мрію, щасливий час. Вираз розмовний і енергійний. Він добре передає бажання героя пісні зберегти своє щастя.',
          ru: 'Hold on tight говорят буквально, например на аттракционе, и переносно, когда не хочешь отпускать что-то ценное: дружбу, мечту, счастливое время. Выражение разговорное и энергичное. Оно хорошо передаёт желание героя песни сохранить своё счастье.',
          en: 'Hold on tight is used literally, for example on a fairground ride, and figuratively, when you don’t want to let go of something precious: a friendship, a dream, a happy time. It is informal and energetic. It shows the wish of the person in the song to keep their happiness.',
        },
        ex: ['Hold on tight, the roller coaster is about to start!', 'Good friends are rare, so hold on tight to them.'],
        similar: ['to hang on', 'to never let go'],
        tip: {
          uk: 'Тут tight, а не tightly. У цьому виразі так звучить природніше.',
          ru: 'Здесь tight, а не tightly. В этом выражении так звучит естественнее.',
          en: 'Say tight, not tightly. In this phrase tight sounds more natural.',
        },
      },
      {
        en: 'too good to be true',
        m: { uk: 'занадто добре, щоб бути правдою', ru: 'слишком хорошо, чтобы быть правдой', en: 'so good that it seems unreal' },
        story: {
          uk: 'Так кажуть, коли щось настільки гарне, що в це важко повірити. Іноді це попередження (наприклад, про підозріло дешеву пропозицію), а іноді радісне здивування. Ця фраза точно описує страх героя пісні: щастя здається надто великим, щоб тривати.',
          ru: 'Так говорят, когда что-то настолько хорошее, что в это трудно поверить. Иногда это предупреждение (например, о подозрительно дешёвом предложении), а иногда радостное удивление. Эта фраза точно описывает страх героя песни: счастье кажется слишком большим, чтобы длиться.',
          en: 'People say this when something is so good that it is hard to believe. Sometimes it is a warning, for example about a suspiciously cheap offer, and sometimes it is happy surprise. It describes the fear in the song well: the happiness seems too big to last.',
        },
        ex: ['A free phone for one click? It sounds too good to be true.', 'Sun, a day off and pizza for lunch. It feels too good to be true!'],
        similar: ['unbelievable', 'like a dream'],
        tip: {
          uk: 'Повна приказка: If it sounds too good to be true, it probably is. Її часто кажуть про інтернет-шахраїв.',
          ru: 'Полная поговорка: If it sounds too good to be true, it probably is. Её часто говорят об интернет-мошенниках.',
          en: 'The full saying is If it sounds too good to be true, it probably is. People often say it about online scams.',
        },
      },
      {
        en: 'to keep your fingers crossed',
        m: { uk: 'тримати кулачки', ru: 'держать кулачки', en: 'hope that things go well' },
        story: {
          uk: 'В англомовних країнах на удачу не тримають кулачки, а схрещують пальці. Так кажуть, коли сподіваються, що все буде добре і нічого не зіпсується. Вираз розмовний і дружній. Він підходить до тривожної, але сповненої надії атмосфери пісні.',
          ru: 'В англоязычных странах на удачу не держат кулачки, а скрещивают пальцы. Так говорят, когда надеются, что всё будет хорошо и ничего не испортится. Выражение разговорное и дружеское. Оно подходит к тревожной, но полной надежды атмосфере песни.',
          en: 'In English-speaking countries people don’t make fists for luck, they cross their fingers. They say this when they hope everything will go well and nothing will go wrong. It is informal and friendly. It suits the worried but hopeful mood of the song.',
        },
        ex: ['My exam is tomorrow. Keep your fingers crossed for me!', 'We’re keeping our fingers crossed for sunny weather on Saturday.'],
        similar: ['to hope for the best', 'to wish someone luck'],
        tip: {
          uk: 'Можна коротко: Fingers crossed! Так часто пишуть у повідомленнях.',
          ru: 'Можно коротко: Fingers crossed! Так часто пишут в сообщениях.',
          en: 'You can say it short: Fingers crossed! People often write it in messages.',
        },
      },
      {
        en: 'to lose sleep over something',
        m: { uk: 'не спати через хвилювання', ru: 'не спать из-за волнения', en: 'worry so much that you can’t sleep' },
        story: {
          uk: 'Якщо хтось loses sleep over something, він так переживає, що не може заснути. Часто вживають у запереченні як пораду: Don’t lose sleep over it, тобто не варто так хвилюватися. Вираз розмовний. Він описує нічні тривоги, про які співає Бенсон Бун.',
          ru: 'Если кто-то loses sleep over something, он так переживает, что не может уснуть. Часто используют в отрицании как совет: Don’t lose sleep over it, то есть не стоит так волноваться. Выражение разговорное. Оно описывает ночные тревоги, о которых поёт Бенсон Бун.',
          en: 'If someone loses sleep over something, they worry so much they can’t fall asleep. It is often used in the negative as advice: Don’t lose sleep over it, meaning it is not worth worrying so much. It is informal. It describes the night-time worries in Benson Boone’s song.',
        },
        ex: ['It’s just one bad mark, don’t lose sleep over it.', 'I lost sleep over my speech, but it went fine.'],
        similar: ['to worry yourself sick', 'to toss and turn'],
        tip: {
          uk: 'Прийменник over: lose sleep over, а не lose sleep about.',
          ru: 'Предлог over: lose sleep over, а не lose sleep about.',
          en: 'Use over: lose sleep over, not lose sleep about.',
        },
      },
      {
        en: 'to be on cloud nine',
        m: { uk: 'бути на сьомому небі', ru: 'быть на седьмом небе', en: 'be extremely happy' },
        story: {
          uk: 'Українською ми кажемо «на сьомому небі», а англійці на дев’ятій хмарі. Вираз описує стан повного щастя. Він розмовний і дуже позитивний. Це той щасливий стан, який герой пісні так боїться втратити.',
          ru: 'По-русски мы говорим «на седьмом небе», а англичане на девятом облаке. Выражение описывает состояние полного счастья. Оно разговорное и очень позитивное. Это то счастливое состояние, которое герой песни так боится потерять.',
          en: 'In Ukrainian and Russian people say seventh heaven, but in English it is cloud nine. The phrase describes complete happiness. It is informal and very positive. It is the happy state the person in the song is so afraid of losing.',
        },
        ex: ['She’s been on cloud nine since she got into the dance school.', 'When our team won, we were on cloud nine.'],
        similar: ['to be over the moon', 'to be in seventh heaven'],
        tip: {
          uk: 'Пишемо nine словом, не цифрою: cloud nine.',
          ru: 'Пишем nine словом, не цифрой: cloud nine.',
          en: 'Write nine as a word, not a number: cloud nine.',
        },
      },
      {
        en: 'to let it all out',
        m: { uk: 'виплеснути всі емоції', ru: 'выплеснуть все эмоции', en: 'show all your feelings openly' },
        story: {
          uk: 'Так кажуть, коли людина перестає стримуватись і показує все, що відчуває: плаче, кричить, співає на повний голос. Вираз розмовний і підтримувальний. Він ідеально описує момент, коли тиха пісня раптом вибухає потужною гучною частиною.',
          ru: 'Так говорят, когда человек перестаёт сдерживаться и показывает всё, что чувствует: плачет, кричит, поёт в полный голос. Выражение разговорное и поддерживающее. Оно идеально описывает момент, когда тихая песня вдруг взрывается мощной громкой частью.',
          en: 'People say this when someone stops holding back and shows everything they feel: crying, shouting or singing at full volume. It is informal and supportive. It perfectly describes the moment when the quiet song suddenly explodes into a loud, powerful part.',
        },
        ex: ['If you’re sad, it’s OK to cry. Just let it all out.', 'At the concert we sang along and let it all out.'],
        similar: ['to get it off your chest', 'to let off steam'],
        tip: {
          uk: 'Порядок слів важливий: let it all out, а не let all it out.',
          ru: 'Порядок слов важен: let it all out, а не let all it out.',
          en: 'Word order matters: let it all out, not let all it out.',
        },
      },
    ],
    culture: [
      {
        uk: 'Бенсон Бун відомий тим, що під час виступів робить сальто назад просто на сцені. Ці трюки стали його візитівкою, і фанати чекають їх на кожному концерті.',
        ru: 'Бенсон Бун известен тем, что во время выступлений делает сальто назад прямо на сцене. Эти трюки стали его визитной карточкой, и фанаты ждут их на каждом концерте.',
        en: 'Benson Boone is famous for doing backflips on stage during his shows. The tricks became his trademark, and fans look forward to them at every concert.',
      },
      {
        uk: 'Пісні з тихим початком і раптовою гучною кульмінацією дуже популярні в коротких відео: найемоційніший момент часто стає звуком для тисяч роликів.',
        ru: 'Песни с тихим началом и внезапной громкой кульминацией очень популярны в коротких видео: самый эмоциональный момент часто становится звуком для тысяч роликов.',
        en: 'Songs with a quiet start and a sudden loud climax are very popular in short videos: the most emotional moment often becomes the sound for thousands of clips.',
      },
      {
        uk: 'В англомовних країнах популярна звичка вести «щоденник вдячності» (gratitude journal), куди щодня записують кілька добрих речей. Це простий спосіб count your blessings.',
        ru: 'В англоязычных странах популярна привычка вести «дневник благодарности» (gratitude journal), куда каждый день записывают несколько хороших вещей. Это простой способ count your blessings.',
        en: 'In English-speaking countries many people keep a gratitude journal, writing down a few good things every day. It is a simple way to count your blessings.',
      },
    ],
  },

  'drivers-license': {
    intro: {
      uk: 'Ця пісня стала голосом цілого покоління підлітків, які вперше пережили розставання. Вона поєднує дві великі теми: радість дорослішання (власні права, свобода) і сум через втрачену близькість. Нижче зібрано живі англійські вирази, якими носії мови говорять про розбите серце, підтримку друзів і про те, як рухатися далі. Усі приклади наші власні й узяті з повсякденного життя.',
      ru: 'Эта песня стала голосом целого поколения подростков, которые впервые пережили расставание. Она соединяет две большие темы: радость взросления (собственные права, свобода) и грусть из-за потерянной близости. Ниже собраны живые английские выражения, которыми носители языка говорят о разбитом сердце, поддержке друзей и о том, как двигаться дальше. Все примеры наши собственные и взяты из повседневной жизни.',
      en: 'This song became the voice of a whole generation of teens going through their first break-up. It joins two big topics: the joy of growing up (your own licence, freedom) and sadness about losing someone close. Below are lively English expressions native speakers use to talk about a broken heart, support from friends and moving on. All the examples are our own and come from everyday life.',
    },
    phrases: [
      {
        en: 'to get your licence',
        m: { uk: 'отримати водійські права', ru: 'получить водительские права', en: 'receive the official right to drive' },
        story: {
          uk: 'Для американських підлітків це одна з найважливіших подій: у багатьох штатах права можна отримати вже в 16 років. Це символ свободи й дорослішання. Зверніть увагу на правопис: у британській англійській driving licence (з c), в американській driver’s license (з s). Назва пісні написана саме по-американськи.',
          ru: 'Для американских подростков это одно из самых важных событий: во многих штатах права можно получить уже в 16 лет. Это символ свободы и взросления. Обратите внимание на написание: в британском английском driving licence (с c), в американском driver’s license (с s). Название песни написано именно по-американски.',
          en: 'For American teens this is one of the biggest moments: in many states you can get a licence at 16. It is a symbol of freedom and growing up. Notice the spelling: British English says driving licence (with c), American English says driver’s license (with s). The song title uses the American form.',
        },
        ex: ['I can’t wait to get my licence, then I can drive to the lake.', 'My cousin got her licence and immediately drove to her grandma’s house.'],
        similar: ['to pass your driving test', 'to learn to drive'],
        tip: {
          uk: 'У британській англійській licence це іменник, а license дієслово (to license). В американській обидва пишуться з s.',
          ru: 'В британском английском licence это существительное, а license глагол (to license). В американском оба пишутся с s.',
          en: 'In British English licence is the noun and license is the verb. In American English both are spelled with s.',
        },
      },
      {
        en: 'to have your heart broken',
        m: { uk: 'мати розбите серце', ru: 'иметь разбитое сердце', en: 'feel deep sadness because love ended' },
        story: {
          uk: 'Образ розбитого серця існує в багатьох мовах, і англійська не виняток. Кажуть і someone broke my heart, і I had my heart broken. Вираз нейтральний, його вживають і підлітки, і дорослі. Він описує саме те почуття, з якого виросла ця пісня.',
          ru: 'Образ разбитого сердца есть во многих языках, и английский не исключение. Говорят и someone broke my heart, и I had my heart broken. Выражение нейтральное, его используют и подростки, и взрослые. Оно описывает именно то чувство, из которого выросла эта песня.',
          en: 'The image of a broken heart exists in many languages, and English is no exception. People say someone broke my heart or I had my heart broken. It is neutral and used by teens and adults. It describes exactly the feeling this song grew from.',
        },
        ex: ['Everyone has their heart broken at least once, and everyone gets through it.', 'He had his heart broken last spring, but now he smiles again.'],
        similar: ['to be heartbroken', 'to be crushed'],
        tip: {
          uk: 'Прикметник heartbroken пишеться разом: She is heartbroken.',
          ru: 'Прилагательное heartbroken пишется слитно: She is heartbroken.',
          en: 'The adjective heartbroken is one word: She is heartbroken.',
        },
      },
      {
        en: 'to get over someone',
        m: { uk: 'оговтатися після розставання з кимось', ru: 'оправиться после расставания с кем-то', en: 'stop feeling sad about someone you loved' },
        story: {
          uk: 'Get over буквально «переступити через». Так кажуть, коли людина перестає страждати через колишнього друга чи кохану людину. Також можна get over a cold (одужати від застуди) або get over a fear (подолати страх). Пісня показує момент, коли героїня ще не встигла це зробити.',
          ru: 'Get over буквально «переступить через». Так говорят, когда человек перестаёт страдать из-за бывшего друга или любимого человека. Также можно get over a cold (выздороветь от простуды) или get over a fear (преодолеть страх). Песня показывает момент, когда героиня ещё не успела это сделать.',
          en: 'Get over literally means to climb over something. We say it when a person stops suffering because of a former friend or partner. You can also get over a cold or get over a fear. The song shows a moment when the girl hasn’t done it yet.',
        },
        ex: ['It took me weeks to get over the end of our friendship.', 'Don’t worry, you’ll get over him sooner than you think.'],
        similar: ['to move on', 'to let go'],
        tip: {
          uk: 'Не плутайте get over і get through: get through означає «пережити, витримати» важкий період.',
          ru: 'Не путайте get over и get through: get through значит «пережить, выдержать» трудный период.',
          en: 'Don’t mix up get over and get through: get through means to survive a hard period.',
        },
      },
      {
        en: 'to move on',
        m: { uk: 'рухатися далі, відпустити минуле', ru: 'двигаться дальше, отпустить прошлое', en: 'accept the past and start a new stage' },
        story: {
          uk: 'Одна з найпопулярніших порад англійською після розставання, невдачі чи зміни. Звучить підтримувально й нейтрально. Move on не означає забути, а означає дозволити собі жити далі. Саме це зрештою і має статися з героїнею пісні.',
          ru: 'Один из самых популярных советов по-английски после расставания, неудачи или перемены. Звучит поддерживающе и нейтрально. Move on не значит забыть, а значит позволить себе жить дальше. Именно это в конце концов и должно случиться с героиней песни.',
          en: 'One of the most common pieces of English advice after a break-up, a failure or a change. It sounds supportive and neutral. Moving on doesn’t mean forgetting, it means letting yourself live on. That is what should finally happen to the girl in the song.',
        },
        ex: ['We lost the match, but it’s time to move on and train for the next one.', 'After the break-up she moved on and started a photography course.'],
        similar: ['to let go', 'to turn the page'],
        tip: {
          uk: 'Після move on може йти from: move on from a bad day.',
          ru: 'После move on может идти from: move on from a bad day.',
          en: 'You can add from: move on from a bad day.',
        },
      },
      {
        en: 'to take a drive',
        m: { uk: 'поїхати покататися', ru: 'поехать покататься', en: 'drive somewhere just for pleasure or to think' },
        story: {
          uk: 'Для багатьох людей поїздка автомобілем без мети це спосіб подумати чи заспокоїтися. Кажуть take a drive або go for a drive. Кліп до пісні значною мірою побудований саме на нічній поїздці героїні.',
          ru: 'Для многих людей поездка на машине без цели это способ подумать или успокоиться. Говорят take a drive или go for a drive. Клип к песне во многом построен именно на ночной поездке героини.',
          en: 'For many people driving with no goal is a way to think or calm down. People say take a drive or go for a drive. The song’s video is largely built around the girl’s night drive.',
        },
        ex: ['When Dad is stressed, he takes a drive along the river.', 'Let’s go for a drive and look at the sunset.'],
        similar: ['to go for a drive', 'to go for a ride'],
        tip: {
          uk: 'На велосипеді кажуть go for a ride, а не go for a drive.',
          ru: 'На велосипеде говорят go for a ride, а не go for a drive.',
          en: 'On a bike we say go for a ride, not go for a drive.',
        },
      },
      {
        en: 'to fall out with someone',
        m: { uk: 'посваритися з кимось', ru: 'поссориться с кем-то', en: 'stop being friends after an argument' },
        story: {
          uk: 'Британський розмовний вираз про сварку, після якої люди перестають спілкуватися. Звучить м’якше, ніж have a big fight. Його часто вживають, говорячи про друзів, однокласників чи родичів.',
          ru: 'Британское разговорное выражение о ссоре, после которой люди перестают общаться. Звучит мягче, чем have a big fight. Его часто используют, говоря о друзьях, одноклассниках или родственниках.',
          en: 'A British informal phrase about an argument after which people stop talking. It sounds softer than have a big fight. People often use it about friends, classmates or relatives.',
        },
        ex: ['I fell out with my best friend over a silly game.', 'They fell out last year, but now they’re friends again.'],
        similar: ['to have a fight', 'to break up'],
        tip: {
          uk: 'Після fall out ставимо with: fall out with Anna, а не fall out Anna.',
          ru: 'После fall out ставим with: fall out with Anna, а не fall out Anna.',
          en: 'Use with: fall out with Anna, not fall out Anna.',
        },
      },
      {
        en: 'to bring back memories',
        m: { uk: 'навівати спогади', ru: 'навевать воспоминания', en: 'make you remember the past' },
        story: {
          uk: 'Місця, пісні й запахи можуть миттєво повернути нас у минуле. Англійською це bring back memories. Вираз може бути і про радісні, і про сумні спогади. У пісні знайомі вулиці постійно нагадують героїні про минуле.',
          ru: 'Места, песни и запахи могут мгновенно вернуть нас в прошлое. По-английски это bring back memories. Выражение может быть и о радостных, и о грустных воспоминаниях. В песне знакомые улицы постоянно напоминают героине о прошлом.',
          en: 'Places, songs and smells can take us back in time. In English that is bring back memories. The memories can be happy or sad. In the song, familiar streets keep reminding the girl of the past.',
        },
        ex: ['The smell of pancakes brings back memories of my grandma’s kitchen.', 'Walking past my old school brought back a lot of memories.'],
        similar: ['to remind you of', 'to take you back'],
        tip: {
          uk: 'Можна сказати it brings back memories або it brings memories back.',
          ru: 'Можно сказать it brings back memories или it brings memories back.',
          en: 'You can say it brings back memories or it brings memories back.',
        },
      },
      {
        en: 'time heals',
        m: { uk: 'час лікує', ru: 'время лечит', en: 'pain becomes smaller as time passes' },
        story: {
          uk: 'Відоме прислів’я, повна форма якого time heals all wounds. Його кажуть, щоб підтримати людину після втрати чи розчарування. Звучить тепло, але іноді підліткам здається, що чекати занадто довго. Добрий спосіб нагадати, що сум не вічний.',
          ru: 'Известная пословица, полная форма которой time heals all wounds. Её говорят, чтобы поддержать человека после потери или разочарования. Звучит тепло, но иногда подросткам кажется, что ждать слишком долго. Хороший способ напомнить, что грусть не вечна.',
          en: 'A well-known proverb; the full form is time heals all wounds. People say it to support someone after a loss or disappointment. It sounds warm, though teens sometimes feel the wait is too long. It is a kind way to remind someone that sadness doesn’t last forever.',
        },
        ex: ['I know it hurts now, but time heals.', 'My mum always says time heals, and she was right.'],
        similar: ['it gets better', 'this too shall pass'],
        tip: {
          uk: 'Heal пишеться з ea і вимовляється так само, як heel (п’ятка).',
          ru: 'Heal пишется с ea и произносится так же, как heel (пятка).',
          en: 'Heal is spelled with ea and sounds the same as heel.',
        },
      },
      {
        en: 'to be there for someone',
        m: { uk: 'бути поруч і підтримувати', ru: 'быть рядом и поддерживать', en: 'support someone when they need it' },
        story: {
          uk: 'Справжні друзі «є там» для тебе у важкий момент. Вираз дуже поширений і звучить щиро. Після сумної пісні добре поговорити про те, хто підтримує нас, коли нам погано.',
          ru: 'Настоящие друзья «есть там» для тебя в трудный момент. Выражение очень распространено и звучит искренне. После грустной песни хорошо поговорить о том, кто поддерживает нас, когда нам плохо.',
          en: 'Real friends are there for you in a hard moment. The phrase is very common and sounds sincere. After a sad song it is good to talk about who supports us when we feel bad.',
        },
        ex: ['When my dog was ill, my friends were there for me.', 'Call me any time, I’m always there for you.'],
        similar: ['to have someone’s back', 'to stand by someone'],
        tip: {
          uk: 'Стандартна форма be there for, навіть коли ти поруч із людиною.',
          ru: 'Стандартная форма be there for, даже когда ты рядом с человеком.',
          en: 'The standard form is be there for, even when you are next to the person.',
        },
      },
      {
        en: 'a coming-of-age story',
        m: { uk: 'історія дорослішання', ru: 'история взросления', en: 'a story about a young person growing up' },
        story: {
          uk: 'Так називають книжки, фільми й пісні про перехід від дитинства до дорослості: перше кохання, перші втрати, перша свобода. Термін часто зустрічається в рецензіях. Багато критиків описували цю пісню і альбом SOUR саме як історію дорослішання.',
          ru: 'Так называют книги, фильмы и песни о переходе от детства к взрослости: первая любовь, первые потери, первая свобода. Термин часто встречается в рецензиях. Многие критики описывали эту песню и альбом SOUR именно как историю взросления.',
          en: 'This is what we call books, films and songs about moving from childhood to adulthood: first love, first losses, first freedom. The term is common in reviews. Many critics described this song and the album SOUR as a coming-of-age story.',
        },
        ex: ['My favourite film is a coming-of-age story about a girl at a summer camp.', 'The book is a funny coming-of-age story set in Lviv.'],
        similar: ['a story about growing up'],
        tip: {
          uk: 'Пишіть через дефіси: coming-of-age. Також кажуть to come of age, тобто досягти повноліття.',
          ru: 'Пишите через дефисы: coming-of-age. Также говорят to come of age, то есть достичь совершеннолетия.',
          en: 'Write it with hyphens: coming-of-age. The verb is to come of age, meaning to become an adult.',
        },
      },
    ],
    culture: [
      {
        uk: 'У США в багатьох штатах можна отримати права у 16 років, а спершу підлітки їздять з учнівським дозволом (learner’s permit) поруч із дорослим.',
        ru: 'В США во многих штатах можно получить права в 16 лет, а сначала подростки ездят с ученическим разрешением (learner’s permit) рядом со взрослым.',
        en: 'In many US states you can get a licence at 16. First, teens drive with a learner’s permit and an adult next to them.',
      },
      {
        uk: 'Назва пісні написана маленькими літерами. Олівія Родріго часто так оформлює назви своїх пісень.',
        ru: 'Название песни написано маленькими буквами. Оливия Родриго часто так оформляет названия своих песен.',
        en: 'The title is written in lowercase letters. Olivia Rodrigo often styles her song titles this way.',
      },
      {
        uk: 'Альбом SOUR означає «кислий». Олівія пояснювала, що альбом про «кислі» почуття: ревнощі, сум, розчарування, які теж частина підліткового життя.',
        ru: 'Альбом SOUR значит «кислый». Оливия объясняла, что альбом о «кислых» чувствах: ревности, грусти, разочаровании, которые тоже часть подростковой жизни.',
        en: 'SOUR means sour. Olivia has explained that the album is about sour feelings like jealousy, sadness and disappointment, which are also part of teenage life.',
      },
    ],
  },

  'as-it-was': {
    intro: {
      uk: 'Ця пісня звучить як літо, але розповідає про те, що життя змінилося і вже ніколи не буде таким, як раніше. Такий контраст між веселою музикою і задумливим змістом дуже характерний для сучасного попу. Нижче зібрано живі англійські вирази про зміни, ностальгію, самотність і підтримку. Усі приклади наші власні й узяті з повсякденного життя.',
      ru: 'Эта песня звучит как лето, но рассказывает о том, что жизнь изменилась и уже никогда не будет такой, как раньше. Такой контраст между весёлой музыкой и задумчивым содержанием очень характерен для современного попа. Ниже собраны живые английские выражения о переменах, ностальгии, одиночестве и поддержке. Все примеры наши собственные и взяты из повседневной жизни.',
      en: 'This song sounds like summer, but it is about life changing and never being quite the same again. This contrast between happy music and thoughtful meaning is typical of modern pop. Below are lively English expressions about change, nostalgia, loneliness and support. All the examples are our own and come from everyday life.',
    },
    phrases: [
      {
        en: 'to not be the same anymore',
        m: { uk: 'бути вже не таким, як раніше', ru: 'быть уже не таким, как раньше', en: 'be different from how it was before' },
        story: {
          uk: 'Так кажуть, коли щось чи хтось помітно змінився: місто, школа, друг, ти сам. Може звучати сумно або просто констатувати факт. Це центральна думка пісні: світ навколо змінюється, і повернутися назад неможливо.',
          ru: 'Так говорят, когда что-то или кто-то заметно изменился: город, школа, друг, ты сам. Может звучать грустно или просто констатировать факт. Это центральная мысль песни: мир вокруг меняется, и вернуться назад невозможно.',
          en: 'People say this when something or someone has clearly changed: a town, a school, a friend, yourself. It can sound sad or just state a fact. It is the central idea of the song: the world changes and you can’t go back.',
        },
        ex: ['After they built a mall, our street isn’t the same anymore.', 'Since he joined the band, he isn’t the same anymore, he’s much more confident.'],
        similar: ['to have changed a lot', 'to be different now'],
        tip: {
          uk: 'Anymore ставимо в кінці речення і тільки в запереченнях чи питаннях: It isn’t the same anymore.',
          ru: 'Anymore ставим в конце предложения и только в отрицаниях или вопросах: It isn’t the same anymore.',
          en: 'Put anymore at the end and use it in negatives or questions: It isn’t the same anymore.',
        },
      },
      {
        en: 'to look back',
        m: { uk: 'озиратися назад, згадувати минуле', ru: 'оглядываться назад, вспоминать прошлое', en: 'think about the past' },
        story: {
          uk: 'Буквально «подивитися назад». Ми часто look back, коли закінчується рік, школа чи важливий етап. Часто кажуть look back on: look back on my childhood. Пісня якраз про такий погляд назад.',
          ru: 'Буквально «посмотреть назад». Мы часто look back, когда заканчивается год, школа или важный этап. Часто говорят look back on: look back on my childhood. Песня как раз о таком взгляде назад.',
          en: 'Literally to look behind you. We often look back when a year, school or an important stage ends. We often say look back on: look back on my childhood. The song is about this kind of look back.',
        },
        ex: ['When I look back on primary school, I remember our class pet.', 'Don’t look back, the future is more interesting.'],
        similar: ['to remember', 'to think back'],
        tip: {
          uk: 'Never look back означає «ніколи не шкодувати і не повертатися».',
          ru: 'Never look back значит «никогда не жалеть и не возвращаться».',
          en: 'Never look back means never regret or return.',
        },
      },
      {
        en: 'the good old days',
        m: { uk: 'старі добрі часи', ru: 'старые добрые времена', en: 'a happy time in the past' },
        story: {
          uk: 'Так з усмішкою або сумом говорять про минуле, яке здається кращим. Часто це трохи жартівливо, особливо коли молоді люди говорять про дитинство кілька років тому. Вираз добре передає ностальгію, на якій побудована пісня.',
          ru: 'Так с улыбкой или грустью говорят о прошлом, которое кажется лучше. Часто это немного шутливо, особенно когда молодые люди говорят о детстве несколько лет назад. Выражение хорошо передаёт ностальгию, на которой построена песня.',
          en: 'People say this with a smile or a sigh about a past that seems better. It is often a little humorous, especially when young people talk about childhood a few years ago. It captures the nostalgia the song is built on.',
        },
        ex: ['My dad loves talking about the good old days without smartphones.', 'Remember when we built that treehouse? The good old days!'],
        similar: ['back in the day', 'those were the days'],
        tip: {
          uk: 'Завжди з артиклем the: the good old days.',
          ru: 'Всегда с артиклем the: the good old days.',
          en: 'Always use the: the good old days.',
        },
      },
      {
        en: 'to feel out of place',
        m: { uk: 'почуватися не на своєму місці', ru: 'чувствовать себя не в своей тарелке', en: 'feel that you don’t belong somewhere' },
        story: {
          uk: 'Так кажуть, коли ти в компанії чи місці, де почуваєшся чужим. Це звичне почуття, коли все навколо змінилося, а ти ще ні. Вираз нейтральний, його можна вживати і в розмові, і в есе.',
          ru: 'Так говорят, когда ты в компании или месте, где чувствуешь себя чужим. Это обычное чувство, когда всё вокруг изменилось, а ты ещё нет. Выражение нейтральное, его можно использовать и в разговоре, и в эссе.',
          en: 'We say this when you are with people or in a place where you feel like a stranger. It is a common feeling when everything around you has changed but you haven’t yet. It is neutral, fine for conversation and essays.',
        },
        ex: ['At the fancy party I felt out of place in my sneakers.', 'New students often feel out of place for the first few weeks.'],
        similar: ['to feel left out', 'to not fit in'],
        tip: {
          uk: 'Протилежне значення: feel at home, почуватися як удома.',
          ru: 'Противоположное значение: feel at home, чувствовать себя как дома.',
          en: 'The opposite is feel at home.',
        },
      },
      {
        en: 'to drift apart',
        m: { uk: 'поступово віддалитися', ru: 'постепенно отдалиться', en: 'slowly become less close' },
        story: {
          uk: 'Drift означає «дрейфувати», як човен без весла. Так описують дружбу, яка закінчилася не через сварку, а сама собою: різні школи, різні інтереси. Це одна з тих тихих змін, про які розмірковує пісня.',
          ru: 'Drift значит «дрейфовать», как лодка без весла. Так описывают дружбу, которая закончилась не из-за ссоры, а сама собой: разные школы, разные интересы. Это одна из тех тихих перемен, о которых размышляет песня.',
          en: 'Drift means to float slowly, like a boat without oars. We use it for friendships that end not because of a fight, but on their own: different schools, different interests. It is one of the quiet changes the song thinks about.',
        },
        ex: ['We drifted apart after she moved to a different school.', 'It’s normal for some friends to drift apart as they grow up.'],
        similar: ['to grow apart', 'to lose touch'],
        tip: {
          uk: 'Lose touch with someone означає перестати спілкуватися: I lost touch with my old neighbours.',
          ru: 'Lose touch with someone значит перестать общаться: I lost touch with my old neighbours.',
          en: 'Lose touch with someone means stop being in contact: I lost touch with my old neighbours.',
        },
      },
      {
        en: 'to keep in touch',
        m: { uk: 'підтримувати зв’язок', ru: 'поддерживать связь', en: 'stay in contact' },
        story: {
          uk: 'Протилежність drifting apart. Так прощаються однокласники, сусіди, колеги: Let’s keep in touch! У наш час зв’язок підтримують через месенджери та відеодзвінки. Це добра відповідь на сум через зміни.',
          ru: 'Противоположность drifting apart. Так прощаются одноклассники, соседи, коллеги: Let’s keep in touch! Сейчас связь поддерживают через мессенджеры и видеозвонки. Это хороший ответ на грусть из-за перемен.',
          en: 'The opposite of drifting apart. Classmates, neighbours and colleagues say goodbye with Let’s keep in touch! Today people keep in touch through messengers and video calls. It is a good answer to sadness about change.',
        },
        ex: ['We live in different countries, but we keep in touch every week.', 'Nice to meet you! Let’s keep in touch.'],
        similar: ['to stay in touch', 'to stay in contact'],
        tip: {
          uk: 'Keep in touch with someone: I keep in touch with my old coach.',
          ru: 'Keep in touch with someone: I keep in touch with my old coach.',
          en: 'Add with for the person: I keep in touch with my old coach.',
        },
      },
      {
        en: 'to cheer someone up',
        m: { uk: 'підбадьорити когось', ru: 'подбодрить кого-то', en: 'make someone feel happier' },
        story: {
          uk: 'Фразове дієслово з up, яке означає покращити настрій. Весела музика пісні якраз і підбадьорює, хоча тема в неї сумна. Можна cheer someone up жартом, подарунком або просто прогулянкою.',
          ru: 'Фразовый глагол с up, который значит улучшить настроение. Весёлая музыка песни как раз и подбадривает, хотя тема у неё грустная. Можно cheer someone up шуткой, подарком или просто прогулкой.',
          en: 'A phrasal verb with up that means improve someone’s mood. The song’s happy music does exactly that, even though the topic is sad. You can cheer someone up with a joke, a gift or just a walk.',
        },
        ex: ['I made my sister a card to cheer her up.', 'Cheer up! It’s Friday tomorrow.'],
        similar: ['to lift someone’s spirits', 'to make someone smile'],
        tip: {
          uk: 'Займенник стоїть посередині: cheer her up, а не cheer up her.',
          ru: 'Местоимение стоит посередине: cheer her up, а не cheer up her.',
          en: 'A pronoun goes in the middle: cheer her up, not cheer up her.',
        },
      },
      {
        en: 'a bittersweet feeling',
        m: { uk: 'солодко-гірке почуття, радість із сумом', ru: 'сладко-горькое чувство, радость с грустью', en: 'a feeling that is happy and sad at the same time' },
        story: {
          uk: 'Bittersweet буквально «гірко-солодкий». Так описують моменти, коли радість і сум змішані: випускний, переїзд, останній день канікул. Слово часто вживають критики, говорячи про цю пісню, бо в ній весела мелодія поєднується з сумом.',
          ru: 'Bittersweet буквально «горько-сладкий». Так описывают моменты, когда радость и грусть смешаны: выпускной, переезд, последний день каникул. Слово часто используют критики, говоря об этой песне, потому что в ней весёлая мелодия сочетается с грустью.',
          en: 'Bittersweet literally means bitter and sweet. It describes moments where joy and sadness mix: graduation, moving house, the last day of the holidays. Critics often use the word for this song because its happy tune is mixed with sadness.',
        },
        ex: ['The last day of school was bittersweet for all of us.', 'Moving to a new city gave me a bittersweet feeling.'],
        similar: ['mixed feelings'],
        tip: {
          uk: 'Пишеться разом: bittersweet.',
          ru: 'Пишется слитно: bittersweet.',
          en: 'It is one word: bittersweet.',
        },
      },
      {
        en: 'to go with the flow',
        m: { uk: 'пливти за течією, приймати зміни спокійно', ru: 'плыть по течению, принимать перемены спокойно', en: 'accept what happens without fighting it' },
        story: {
          uk: 'Розмовний вираз про спокійне ставлення до змін. Якщо не можеш щось контролювати, іноді краще go with the flow. Може звучати як порада або як опис характеру: She just goes with the flow.',
          ru: 'Разговорное выражение о спокойном отношении к переменам. Если не можешь что-то контролировать, иногда лучше go with the flow. Может звучать как совет или как описание характера: She just goes with the flow.',
          en: 'An informal phrase about being relaxed about change. If you can’t control something, sometimes it is better to go with the flow. It can be advice or a description of someone’s character: She just goes with the flow.',
        },
        ex: ['Our plans changed because of the rain, so we went with the flow and played board games.', 'I’m not worried about the new timetable, I’ll go with the flow.'],
        similar: ['to take things as they come', 'to roll with it'],
        tip: {
          uk: 'Не плутайте з go against the flow, тобто йти проти течії, робити не як усі.',
          ru: 'Не путайте с go against the flow, то есть идти против течения, делать не как все.',
          en: 'Don’t confuse it with go against the flow, which means doing things differently from everyone else.',
        },
      },
      {
        en: 'change is the only constant',
        m: { uk: 'єдине постійне це зміни', ru: 'единственное постоянное это перемены', en: 'everything always changes' },
        story: {
          uk: 'Цю думку часто приписують давньогрецькому філософу Геракліту. Сьогодні її кажуть, щоб заспокоїти людину перед змінами: усе змінюється, і це нормально. Вона добре підсумовує настрій пісні.',
          ru: 'Эту мысль часто приписывают древнегреческому философу Гераклиту. Сегодня её говорят, чтобы успокоить человека перед переменами: всё меняется, и это нормально. Она хорошо подводит итог настроению песни.',
          en: 'This idea is often linked to the ancient Greek philosopher Heraclitus. Today people say it to calm someone before a change: everything changes and that is normal. It sums up the mood of the song well.',
        },
        ex: ['New school, new friends, new city. Well, change is the only constant!', 'Our teacher reminded us that change is the only constant.'],
        similar: ['nothing lasts forever', 'times change'],
        tip: {
          uk: 'Constant тут іменник: щось незмінне.',
          ru: 'Constant здесь существительное: что-то неизменное.',
          en: 'Here constant is a noun: something that never changes.',
        },
      },
    ],
    culture: [
      {
        uk: 'Гурт One Direction склали з п’яти хлопців, які окремо прийшли на британське шоу талантів The X Factor у 2010 році. Гурт став одним із найпопулярніших бой-бендів світу.',
        ru: 'Группу One Direction собрали из пяти парней, которые по отдельности пришли на британское шоу талантов The X Factor в 2010 году. Группа стала одним из самых популярных бой-бэндов мира.',
        en: 'One Direction was put together from five boys who came separately to the British talent show The X Factor in 2010. The band became one of the most popular boy bands in the world.',
      },
      {
        uk: 'Альбом «Harry’s House» отримав «Греммі» як альбом року у 2023 році. Це одна з найважливіших музичних нагород.',
        ru: 'Альбом «Harry’s House» получил «Грэмми» как альбом года в 2023 году. Это одна из самых важных музыкальных наград.',
        en: 'Harry’s House won the Grammy for Album of the Year in 2023, one of the most important music awards.',
      },
      {
        uk: 'Кліп зняла режисерка Тану Муіно. Велика сцена, що обертається, стала головною візуальною ідеєю кліпу: вона наче показує, що життя рухається, навіть коли ти хочеш зупинитися.',
        ru: 'Клип сняла режиссёр Тану Муино. Большая вращающаяся сцена стала главной визуальной идеей клипа: она словно показывает, что жизнь движется, даже когда ты хочешь остановиться.',
        en: 'The video was directed by Tanu Muino. The big rotating stage is its main visual idea: it seems to show that life keeps moving even when you want to stop.',
      },
    ],
  },


  'flowers': {
    intro: {
      uk: 'Ця пісня про силу, яку людина знаходить у собі після складного періоду. Вона нагадує, що ми можемо самі подбати про себе, радіти дрібницям і не чекати, поки хтось інший зробить нас щасливими. Нижче зібрано живі англійські вирази про турботу про себе, незалежність і новий початок. Усі приклади наші власні й узяті з повсякденного життя.',
      ru: 'Эта песня о силе, которую человек находит в себе после трудного периода. Она напоминает, что мы можем сами позаботиться о себе, радоваться мелочам и не ждать, пока кто-то другой сделает нас счастливыми. Ниже собраны живые английские выражения о заботе о себе, независимости и новом начале. Все примеры наши собственные и взяты из повседневной жизни.',
      en: 'This song is about the strength a person finds inside after a hard time. It reminds us that we can take care of ourselves, enjoy small things and not wait for someone else to make us happy. Below are lively English expressions about self-care, independence and new beginnings. All the examples are our own and come from everyday life.',
    },
    phrases: [
      {
        en: 'to treat yourself',
        m: { uk: 'побалувати себе', ru: 'побаловать себя', en: 'do or buy something nice for yourself' },
        story: {
          uk: 'Treat тут означає «пригостити, зробити приємне». Коли ти treat yourself, ти сам(а) робиш собі подарунок: смачний десерт, нову книжку, вечір із фільмом. Вираз дуже поширений і звучить тепло. Ідея пісні якраз у тому, що не треба чекати подарунків від інших.',
          ru: 'Treat здесь значит «угостить, сделать приятное». Когда ты treat yourself, ты сам(а) делаешь себе подарок: вкусный десерт, новую книгу, вечер с фильмом. Выражение очень распространённое и звучит тепло. Идея песни как раз в том, что не нужно ждать подарков от других.',
          en: 'Treat here means to give someone something nice. When you treat yourself, you give yourself a present: a tasty dessert, a new book, a movie night. The phrase is very common and sounds warm. The idea of the song is exactly that you don’t have to wait for presents from others.',
        },
        ex: ['I finished all my exams, so I’m going to treat myself to pizza.', 'Treat yourself to a long bath after the match.'],
        similar: ['to spoil yourself', 'to pamper yourself'],
        tip: {
          uk: 'Що саме купуєш, вводимо через to: treat yourself to a cake.',
          ru: 'Что именно покупаешь, вводим через to: treat yourself to a cake.',
          en: 'Use to for the thing: treat yourself to a cake.',
        },
      },
      {
        en: 'to stand on your own two feet',
        m: { uk: 'стати самостійним, не залежати від інших', ru: 'стать самостоятельным, не зависеть от других', en: 'be independent' },
        story: {
          uk: 'Буквально «стояти на своїх двох ногах». Так кажуть про людину, яка сама вирішує свої проблеми й не чекає, що хтось усе зробить за неї. Часто так говорять про студентів, які вперше живуть окремо. Пісня саме про цей момент самостійності.',
          ru: 'Буквально «стоять на своих двух ногах». Так говорят о человеке, который сам решает свои проблемы и не ждёт, что кто-то всё сделает за него. Часто так говорят о студентах, которые впервые живут отдельно. Песня именно об этом моменте самостоятельности.',
          en: 'Literally to stand on your own two feet. People say it about someone who solves their own problems and doesn’t expect others to do everything for them. It is often said about students living alone for the first time. The song is about exactly this moment of independence.',
        },
        ex: ['My brother got a job and now he stands on his own two feet.', 'Summer camp taught me to stand on my own two feet.'],
        similar: ['to be independent', 'to fend for yourself'],
        tip: {
          uk: 'Не забудьте two: on your own two feet. Без two фраза звучить незвично.',
          ru: 'Не забудьте two: on your own two feet. Без two фраза звучит непривычно.',
          en: 'Don’t forget two: on your own two feet.',
        },
      },
      {
        en: 'me time',
        m: { uk: 'час для себе', ru: 'время для себя', en: 'time you spend alone doing what you enjoy' },
        story: {
          uk: 'Розмовний вираз, який означає час, коли ти нікому нічого не винен і робиш те, що любиш: читаєш, малюєш, гуляєш. Його часто вживають у соцмережах. Він показує, що бути наодинці не сумно, а корисно. Героїня пісні якраз насолоджується таким часом.',
          ru: 'Разговорное выражение, которое значит время, когда ты никому ничего не должен и делаешь то, что любишь: читаешь, рисуешь, гуляешь. Его часто используют в соцсетях. Оно показывает, что быть наедине не грустно, а полезно. Героиня песни как раз наслаждается таким временем.',
          en: 'An informal phrase for time when you don’t owe anybody anything and do what you love: read, draw, walk. It is often used on social media. It shows that being alone is not sad but useful. The woman in the song is enjoying exactly this kind of time.',
        },
        ex: ['Sunday morning is my me time, I draw and listen to music.', 'Mum needs some me time, let’s cook dinner for her.'],
        similar: ['time to yourself', 'quiet time'],
        tip: {
          uk: 'Тут me без артикля: I need some me time, а не a me time.',
          ru: 'Здесь me без артикля: I need some me time, а не a me time.',
          en: 'No article: I need some me time, not a me time.',
        },
      },
      {
        en: 'to move on',
        m: { uk: 'жити далі, відпустити минуле', ru: 'жить дальше, отпустить прошлое', en: 'stop thinking about something sad and continue your life' },
        story: {
          uk: 'Фразове дієслово move on буквально означає «рухатися далі». Його кажуть після розставання, програшу чи невдачі: досить сумувати, час іти вперед. Звучить нейтрально, підходить для будь-якої ситуації. Це головний настрій пісні.',
          ru: 'Фразовый глагол move on буквально значит «двигаться дальше». Его говорят после расставания, проигрыша или неудачи: хватит грустить, пора идти вперёд. Звучит нейтрально, подходит для любой ситуации. Это главное настроение песни.',
          en: 'The phrasal verb move on literally means to go further. People say it after a breakup, a loss or a failure: enough sadness, time to go forward. It is neutral and fits any situation. This is the main mood of the song.',
        },
        ex: ['I didn’t get into the team, but I’ve moved on and joined the chess club.', 'Let’s move on to the next question.'],
        similar: ['to let go', 'to get over something'],
        tip: {
          uk: 'Move on також означає «перейти до наступного»: Let’s move on to page 10.',
          ru: 'Move on также значит «перейти к следующему»: Let’s move on to page 10.',
          en: 'Move on also means go to the next thing: Let’s move on to page 10.',
        },
      },
      {
        en: 'to be your own best friend',
        m: { uk: 'бути собі найкращим другом', ru: 'быть себе лучшим другом', en: 'treat yourself with the kindness you give a friend' },
        story: {
          uk: 'Так психологи радять ставитися до себе: підтримувати, а не критикувати. Якщо друг помилився, ти скажеш щось добре. Те саме варто казати собі. Вираз теплий і трохи мотиваційний. Він дуже пасує пісні про любов до себе.',
          ru: 'Так психологи советуют относиться к себе: поддерживать, а не критиковать. Если друг ошибся, ты скажешь что-то доброе. То же стоит говорить себе. Выражение тёплое и немного мотивационное. Оно очень подходит песне о любви к себе.',
          en: 'Psychologists advise us to treat ourselves this way: support, don’t criticise. If a friend makes a mistake, you say something kind. You should say the same to yourself. The phrase is warm and a little motivational. It suits a song about self-love very well.',
        },
        ex: ['When I fail a test, I try to be my own best friend and not shout at myself.', 'Be your own best friend, you deserve kindness too.'],
        similar: ['to be kind to yourself', 'to go easy on yourself'],
        tip: {
          uk: 'Змінюйте присвійний займенник: be her own best friend, be my own best friend.',
          ru: 'Меняйте притяжательное местоимение: be her own best friend, be my own best friend.',
          en: 'Change the possessive: be her own best friend, be my own best friend.',
        },
      },
      {
        en: 'to look after yourself',
        m: { uk: 'дбати про себе', ru: 'заботиться о себе', en: 'take care of your health and feelings' },
        story: {
          uk: 'Look after означає «доглядати, піклуватися». Британці часто кажуть на прощання Look after yourself!, тобто «бережи себе». Вираз дружній і турботливий. Пісня показує, як людина вчиться піклуватися про себе сама.',
          ru: 'Look after значит «присматривать, заботиться». Британцы часто говорят на прощание Look after yourself!, то есть «береги себя». Выражение дружеское и заботливое. Песня показывает, как человек учится заботиться о себе сам.',
          en: 'Look after means to care for someone. British people often say Look after yourself! when saying goodbye. It is friendly and caring. The song shows how a person learns to look after herself.',
        },
        ex: ['Look after yourself and drink enough water on the trip.', 'He looks after himself: he sleeps well and plays football.'],
        similar: ['to take care of yourself', 'to take it easy'],
        tip: {
          uk: 'Look after (піклуватися) і look for (шукати) різні: I’m looking for my keys.',
          ru: 'Look after (заботиться) и look for (искать) разные: I’m looking for my keys.',
          en: 'Look after (care for) is different from look for (search): I’m looking for my keys.',
        },
      },
      {
        en: 'to bounce back',
        m: { uk: 'швидко оговтатися, повернутися у форму', ru: 'быстро оправиться, вернуться в форму', en: 'recover quickly after something bad' },
        story: {
          uk: 'Bounce означає «відскакувати», як м’яч від підлоги. Хто bounces back, той після невдачі швидко знову піднімається. Вираз позитивний, його чують у спорті й у звичайному житті. Пісня показує саме таке повернення до сили.',
          ru: 'Bounce значит «отскакивать», как мяч от пола. Кто bounces back, тот после неудачи быстро снова поднимается. Выражение позитивное, его слышно в спорте и в обычной жизни. Песня показывает именно такое возвращение к силе.',
          en: 'Bounce means to jump back up, like a ball from the floor. Someone who bounces back gets up quickly after a failure. The phrase is positive and common in sport and everyday life. The song shows exactly this return to strength.',
        },
        ex: ['Our team lost the first game but bounced back and won the cup.', 'After the flu she bounced back in a week.'],
        similar: ['to recover', 'to get back on your feet'],
        tip: {
          uk: 'Після чого оговтуються, кажемо from: bounce back from a loss.',
          ru: 'После чего оправляются, говорим from: bounce back from a loss.',
          en: 'Use from: bounce back from a loss.',
        },
      },
      {
        en: 'to count your blessings',
        m: { uk: 'цінувати те, що маєш', ru: 'ценить то, что имеешь', en: 'think about the good things in your life' },
        story: {
          uk: 'Буквально «рахувати свої благословення». Так кажуть, коли радять не зосереджуватися на поганому, а згадати все хороше: здоров’я, друзів, родину. Вираз трохи старомодний, але відомий усім. Він пасує настрою вдячності в пісні.',
          ru: 'Буквально «считать свои благословения». Так говорят, когда советуют не сосредотачиваться на плохом, а вспомнить всё хорошее: здоровье, друзей, семью. Выражение немного старомодное, но известное всем. Оно подходит настроению благодарности в песне.',
          en: 'Literally to count your blessings. People say it to advise someone to stop focusing on the bad and remember the good things: health, friends, family. It is a little old-fashioned but everybody knows it. It fits the grateful mood of the song.',
        },
        ex: ['When I feel sad, I count my blessings: a warm home, a cat and good friends.', 'Grandma always tells me to count my blessings.'],
        similar: ['to be grateful', 'to look on the bright side'],
        tip: {
          uk: 'Blessings завжди в множині в цьому виразі.',
          ru: 'Blessings всегда во множественном числе в этом выражении.',
          en: 'Blessings is always plural in this phrase.',
        },
      },
      {
        en: 'to do it yourself',
        m: { uk: 'зробити самому', ru: 'сделать самому', en: 'do something without paying or asking someone else' },
        story: {
          uk: 'Скорочено DIY, «зроби сам». Так називають ремонт, саморобки, подарунки своїми руками. Вираз дуже популярний у блогах і на YouTube. Він нагадує про ідею пісні: те, що тобі потрібно, ти можеш дати собі сам(а).',
          ru: 'Сокращённо DIY, «сделай сам». Так называют ремонт, поделки, подарки своими руками. Выражение очень популярно в блогах и на YouTube. Оно напоминает об идее песни: то, что тебе нужно, ты можешь дать себе сам(а).',
          en: 'Short form DIY. It is used for home repairs, crafts and handmade gifts. The phrase is very popular on blogs and YouTube. It reminds us of the song’s idea: what you need, you can give yourself.',
        },
        ex: ['We didn’t buy a birthday card, we did it ourselves.', 'If you want it done right, do it yourself.'],
        similar: ['to make it by hand', 'to handle it yourself'],
        tip: {
          uk: 'DIY вживають і як прикметник: a DIY project, DIY decorations.',
          ru: 'DIY используют и как прилагательное: a DIY project, DIY decorations.',
          en: 'DIY is also an adjective: a DIY project, DIY decorations.',
        },
      },
      {
        en: 'better off',
        m: { uk: 'у кращому становищі, краще', ru: 'в лучшем положении, лучше', en: 'in a better situation' },
        story: {
          uk: 'Better off кажуть, коли після змін людині стало краще. Наприклад, після переїзду, нової школи чи завершення стосунків. Це прикметниковий вираз, звучить нейтрально. Пісня показує, що героїні без старих стосунків справді краще.',
          ru: 'Better off говорят, когда после перемен человеку стало лучше. Например, после переезда, новой школы или окончания отношений. Это прилагательное выражение, звучит нейтрально. Песня показывает, что героине без старых отношений действительно лучше.',
          en: 'People say better off when a change made someone’s situation better, for example after a move, a new school or the end of a relationship. It works like an adjective and sounds neutral. The song shows that the woman really is better off now.',
        },
        ex: ['You’re better off in the new class, the kids there are friendly.', 'We’d be better off taking the train, it’s faster.'],
        similar: ['in a better place', 'happier'],
        tip: {
          uk: 'Протилежне worse off: Without a map we were worse off.',
          ru: 'Противоположное worse off: Without a map we were worse off.',
          en: 'The opposite is worse off: Without a map we were worse off.',
        },
      },
    ],
    culture: [
      { uk: 'У багатьох країнах квіти дарують на свята й дні народження, але останніми роками популярна ідея купувати квіти собі просто так, щоб підняти настрій.', ru: 'Во многих странах цветы дарят на праздники и дни рождения, но в последние годы популярна идея покупать цветы себе просто так, чтобы поднять настроение.', en: 'In many countries people give flowers for holidays and birthdays, but in recent years buying flowers for yourself just to feel good has become a popular idea.' },
      { uk: 'Майлі Сайрус стала відомою ще дитиною в серіалі Disney Channel «Ханна Монтана», де грала звичайну школярку, яка таємно є поп-зіркою.', ru: 'Майли Сайрус стала известной ещё ребёнком в сериале Disney Channel «Ханна Монтана», где играла обычную школьницу, которая тайно является поп-звездой.', en: 'Miley Cyrus became famous as a child in the Disney Channel series Hannah Montana, where she played an ordinary schoolgirl who was secretly a pop star.' },
      { uk: 'Вираз self-care, турбота про себе, став дуже популярним в англомовних соцмережах. Під ним мають на увазі сон, спорт, хобі й відпочинок від телефону.', ru: 'Выражение self-care, забота о себе, стало очень популярным в англоязычных соцсетях. Под ним понимают сон, спорт, хобби и отдых от телефона.', en: 'The word self-care has become very popular on English-speaking social media. It usually means sleep, exercise, hobbies and a break from your phone.' },
    ],
  },

  'zoo': {
    intro: {
      uk: 'Ця пісня з мультфільму «Зоотрополіс 2» про велике місто, де живуть найрізноманітніші тварини, і всі вони можуть веселитися разом. Вона заряджає енергією й допомагає говорити про дружбу, різноманіття і вечірки. Нижче зібрано живі англійські вирази про веселощі, танці й тварин, які носії мови використовують щодня. Усі приклади наші власні.',
      ru: 'Эта песня из мультфильма «Зверополис 2» о большом городе, где живут самые разные животные, и все они могут веселиться вместе. Она заряжает энергией и помогает говорить о дружбе, разнообразии и вечеринках. Ниже собраны живые английские выражения о веселье, танцах и животных, которые носители языка используют каждый день. Все примеры наши собственные.',
      en: 'This song from Zootopia 2 is about a big city where all kinds of animals live and everyone can have fun together. It is full of energy and helps us talk about friendship, being different and parties. Below are lively English expressions about fun, dancing and animals that native speakers use every day. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to let loose',
        m: { uk: 'розслабитися, відірватися', ru: 'расслабиться, оторваться', en: 'relax and have a lot of fun' },
        story: {
          uk: 'Буквально «відпустити себе». Так кажуть, коли людина перестає хвилюватися й просто веселиться: танцює, сміється, співає. Вираз розмовний, звучить радісно. Під таку енергійну пісню якраз хочеться let loose.',
          ru: 'Буквально «отпустить себя». Так говорят, когда человек перестаёт волноваться и просто веселится: танцует, смеётся, поёт. Выражение разговорное, звучит радостно. Под такую энергичную песню как раз хочется let loose.',
          en: 'Literally to let yourself go. People say it when someone stops worrying and simply has fun: dances, laughs, sings. It is informal and sounds happy. An energetic song like this makes you want to let loose.',
        },
        ex: ['At the end of the school year we let loose at the beach party.', 'Come on, let loose, nobody is watching!'],
        similar: ['to have a blast', 'to let your hair down'],
        tip: {
          uk: 'Пишеться loose (вільний), а не lose (губити).',
          ru: 'Пишется loose (свободный), а не lose (терять).',
          en: 'Spell it loose (free), not lose (to not find).',
        },
      },
      {
        en: 'to have a blast',
        m: { uk: 'чудово провести час', ru: 'отлично провести время', en: 'have a great time' },
        story: {
          uk: 'Blast буквально «вибух». Коли тобі було дуже весело, кажуть I had a blast. Це один із найпоширеніших розмовних виразів у підлітків. Підходить для вечірки, табору, концерту.',
          ru: 'Blast буквально «взрыв». Когда тебе было очень весело, говорят I had a blast. Это одно из самых распространённых разговорных выражений у подростков. Подходит для вечеринки, лагеря, концерта.',
          en: 'Blast literally means an explosion. When you had lots of fun, you say I had a blast. It is one of the most common informal phrases among teens. It works for a party, a camp or a concert.',
        },
        ex: ['We had a blast at the water park.', 'Have a blast at the concert tonight!'],
        similar: ['to have a great time', 'to have the time of your life'],
        tip: {
          uk: 'Завжди з артиклем a: have a blast.',
          ru: 'Всегда с артиклем a: have a blast.',
          en: 'Always with a: have a blast.',
        },
      },
      {
        en: 'to bust a move',
        m: { uk: 'запально затанцювати', ru: 'зажигательно затанцевать', en: 'start dancing with energy' },
        story: {
          uk: 'Жартівливий розмовний вираз, який означає показати свої танцювальні рухи. Його часто кажуть, запрошуючи когось на танцпол. Звучить весело і трохи по-старомодному, тому його люблять використовувати з гумором. Для танцювальної пісні ідеально.',
          ru: 'Шутливое разговорное выражение, которое значит показать свои танцевальные движения. Его часто говорят, приглашая кого-то на танцпол. Звучит весело и немного старомодно, поэтому его любят использовать с юмором. Для танцевальной песни идеально.',
          en: 'A playful informal phrase that means to show your dance moves. People often say it when they invite someone to the dance floor. It sounds fun and a bit old-fashioned, so people like to use it with humour. Perfect for a dance song.',
        },
        ex: ['When the DJ played our song, Dad busted a move.', 'Come on, bust a move, show us your best dance!'],
        similar: ['to hit the dance floor', 'to show your moves'],
        tip: {
          uk: 'Move тут іменник: a dance move, cool moves.',
          ru: 'Move здесь существительное: a dance move, cool moves.',
          en: 'Move is a noun here: a dance move, cool moves.',
        },
      },
      {
        en: 'to fit right in',
        m: { uk: 'одразу стати своїм', ru: 'сразу стать своим', en: 'feel comfortable in a new group at once' },
        story: {
          uk: 'Fit in означає «вписатися», а right підсилює: «одразу, повністю». Так кажуть про новачка, якого всі швидко прийняли. Вираз теплий і позитивний. У місті тварин із пісні кожен вписується, яким би різним він не був.',
          ru: 'Fit in значит «вписаться», а right усиливает: «сразу, полностью». Так говорят о новичке, которого все быстро приняли. Выражение тёплое и позитивное. В городе животных из песни каждый вписывается, каким бы разным он ни был.',
          en: 'Fit in means to be accepted in a group, and right makes it stronger: at once, completely. People say it about a newcomer everyone liked quickly. It is warm and positive. In the animal city of the song, everyone fits in, however different they are.',
        },
        ex: ['The new girl fit right in with our basketball team.', 'Don’t worry about the new school, you’ll fit right in.'],
        similar: ['to belong', 'to feel at home'],
        tip: {
          uk: 'Fit у минулому часі в американській англійській теж fit: She fit right in.',
          ru: 'Fit в прошедшем времени в американском английском тоже fit: She fit right in.',
          en: 'In American English the past of fit is also fit: She fit right in.',
        },
      },
      {
        en: 'the more the merrier',
        m: { uk: 'чим більше, тим веселіше', ru: 'чем больше, тем веселее', en: 'more people make it more fun' },
        story: {
          uk: 'Відома фраза, яку кажуть, коли хтось питає, чи можна приєднатися до компанії. Відповідь означає: «Звісно, приходь!». Merry означає «веселий». Ідеально пасує до пісні, де всі тварини веселяться разом.',
          ru: 'Известная фраза, которую говорят, когда кто-то спрашивает, можно ли присоединиться к компании. Ответ значит: «Конечно, приходи!». Merry значит «весёлый». Идеально подходит к песне, где все животные веселятся вместе.',
          en: 'A well-known phrase people say when someone asks if they can join. It means Of course, come along! Merry means happy. It fits a song where all the animals have fun together perfectly.',
        },
        ex: ['Can my cousin come to the picnic? Sure, the more the merrier!', 'Invite the whole class, the more the merrier.'],
        similar: ['everyone’s welcome', 'to join the party'],
        tip: {
          uk: 'Це стала фраза, слова не змінюємо.',
          ru: 'Это устойчивая фраза, слова не меняем.',
          en: 'It is a fixed phrase, don’t change the words.',
        },
      },
      {
        en: 'to go wild',
        m: { uk: 'шаленіти від радості', ru: 'сходить с ума от радости', en: 'become very excited and noisy' },
        story: {
          uk: 'Wild означає «дикий». Коли публіка go wild, вона кричить, стрибає і плескає. Вираз часто чують про концерти й спортивні матчі. Для пісні про місто тварин він звучить подвійно смішно.',
          ru: 'Wild значит «дикий». Когда публика go wild, она кричит, прыгает и хлопает. Выражение часто слышно о концертах и спортивных матчах. Для песни о городе животных оно звучит вдвойне забавно.',
          en: 'Wild means not tame. When a crowd goes wild, people scream, jump and clap. You often hear it about concerts and sports matches. For a song about an animal city it sounds doubly funny.',
        },
        ex: ['The crowd went wild when our team scored.', 'The kids went wild when they saw the birthday cake.'],
        similar: ['to go crazy', 'to cheer like mad'],
        tip: {
          uk: 'Минулий час went wild, бо go неправильне дієслово.',
          ru: 'Прошедшее время went wild, потому что go неправильный глагол.',
          en: 'The past is went wild, because go is irregular.',
        },
      },
      {
        en: 'to be the life of the party',
        m: { uk: 'бути душею компанії', ru: 'быть душой компании', en: 'be the most fun person at a party' },
        story: {
          uk: 'Буквально «життя вечірки». Так називають людину, з якою всім весело: вона жартує, танцює і всіх запрошує. Вираз позитивний, це комплімент. Газель у мультфільмі явно така.',
          ru: 'Буквально «жизнь вечеринки». Так называют человека, с которым всем весело: он шутит, танцует и всех приглашает. Выражение позитивное, это комплимент. Газель в мультфильме явно такая.',
          en: 'Literally the life of the party. It describes a person who makes everyone have fun: they joke, dance and invite everyone. It is positive, a compliment. Gazelle in the film is clearly like this.',
        },
        ex: ['My aunt is always the life of the party, she knows every song.', 'Max was the life of the party with his funny dance.'],
        similar: ['to be the soul of the party', 'a party animal'],
        tip: {
          uk: 'Party animal теж про веселу людину, але звучить більш розмовно.',
          ru: 'Party animal тоже о весёлом человеке, но звучит более разговорно.',
          en: 'Party animal also means a fun-loving person but sounds more informal.',
        },
      },
      {
        en: 'it’s a jungle out there',
        m: { uk: 'життя складне, там справжні джунглі', ru: 'жизнь сложная, там настоящие джунгли', en: 'the world is busy, wild and hard' },
        story: {
          uk: 'Жартівлива фраза про те, що у великому місті, на роботі чи в школі буває шумно й складно, як у джунглях. Її кажуть з усмішкою. Для пісні про місто тварин вона звучить особливо доречно.',
          ru: 'Шутливая фраза о том, что в большом городе, на работе или в школе бывает шумно и сложно, как в джунглях. Её говорят с улыбкой. Для песни о городе животных она звучит особенно уместно.',
          en: 'A playful phrase saying that a big city, work or school can be noisy and hard, like a jungle. People say it with a smile. For a song about an animal city it sounds especially fitting.',
        },
        ex: ['The shopping centre on Saturday? It’s a jungle out there!', 'First day at a new school, it’s a jungle out there.'],
        similar: ['it’s crazy out there', 'it’s a madhouse'],
        tip: {
          uk: 'Out there означає «там, у світі за дверима».',
          ru: 'Out there значит «там, в мире за дверью».',
          en: 'Out there means in the world outside.',
        },
      },
      {
        en: 'to come out of your shell',
        m: { uk: 'стати менш сором’язливим, розкритися', ru: 'стать менее застенчивым, раскрыться', en: 'become less shy' },
        story: {
          uk: 'Уявіть черепаху, яка висовує голову з панцира. Так кажуть про сором’язливу людину, яка почала більше говорити і веселитися. Вираз добрий і підбадьорливий. Танці й музика часто допомагають come out of your shell.',
          ru: 'Представьте черепаху, которая высовывает голову из панциря. Так говорят о застенчивом человеке, который стал больше говорить и веселиться. Выражение доброе и ободряющее. Танцы и музыка часто помогают come out of your shell.',
          en: 'Imagine a turtle putting its head out of its shell. People say this about a shy person who starts talking and having more fun. The phrase is kind and encouraging. Dancing and music often help you come out of your shell.',
        },
        ex: ['In drama club Lily really came out of her shell.', 'Dance lessons helped me come out of my shell.'],
        similar: ['to open up', 'to loosen up'],
        tip: {
          uk: 'Змінюйте присвійний займенник: his shell, her shell, my shell.',
          ru: 'Меняйте притяжательное местоимение: his shell, her shell, my shell.',
          en: 'Change the possessive: his shell, her shell, my shell.',
        },
      },
      {
        en: 'to be as busy as a bee',
        m: { uk: 'бути дуже зайнятим', ru: 'быть очень занятым', en: 'be very busy' },
        story: {
          uk: 'Бджоли весь день літають і працюють, тому англійці порівнюють з ними зайнятих людей. Це порівняння з as ... as, як у граматиці уроку. В англійській багато таких порівнянь із тваринами: as quiet as a mouse, as brave as a lion.',
          ru: 'Пчёлы весь день летают и работают, поэтому англичане сравнивают с ними занятых людей. Это сравнение с as ... as, как в грамматике урока. В английском много таких сравнений с животными: as quiet as a mouse, as brave as a lion.',
          en: 'Bees fly and work all day, so English speakers compare busy people to them. It uses as ... as, like the grammar in this lesson. English has many animal comparisons like this: as quiet as a mouse, as brave as a lion.',
        },
        ex: ['Before the party Mum was as busy as a bee.', 'I’m as busy as a bee this week with tests.'],
        similar: ['to be up to your ears in work', 'to be snowed under'],
        tip: {
          uk: 'Спробуйте інші: as quiet as a mouse, as slow as a snail, as brave as a lion.',
          ru: 'Попробуйте другие: as quiet as a mouse, as slow as a snail, as brave as a lion.',
          en: 'Try others: as quiet as a mouse, as slow as a snail, as brave as a lion.',
        },
      },
    ],
    culture: [
      { uk: 'Перший мультфільм «Зоотрополіс» вийшов у 2016 році й отримав «Оскар» як найкращий анімаційний фільм. Шакіра тоді вже озвучувала Газель і співала пісню «Try Everything».', ru: 'Первый мультфильм «Зверополис» вышел в 2016 году и получил «Оскар» как лучший анимационный фильм. Шакира тогда уже озвучивала Газель и пела песню «Try Everything».', en: 'The first Zootopia film came out in 2016 and won the Oscar for Best Animated Feature. Shakira already voiced Gazelle and sang Try Everything.' },
      { uk: 'У Великій Британії та деяких інших країнах фільм називається Zootropolis, а в Україні «Зоотрополіс».', ru: 'В Великобритании и некоторых других странах фильм называется Zootropolis, а в России «Зверополис».', en: 'In the UK and some other countries the film is called Zootropolis.' },
      { uk: 'Шакіра родом з Колумбії. Вона співає англійською та іспанською і відома своїми енергійними танцями.', ru: 'Шакира родом из Колумбии. Она поёт на английском и испанском и известна своими энергичными танцами.', en: 'Shakira is from Colombia. She sings in English and Spanish and is famous for her energetic dancing.' },
    ],
  },


  'azizam': {
    intro: {
      uk: 'Ця пісня звучить як свято: Ед Ширан поєднав поп-музику з перськими мелодіями і назвав пісню ніжним словом, яке означає «мій дорогий». Вона допомагає говорити про любов, радість, танці й про те, як різні культури звертаються до близьких людей. Нижче зібрано теплі англійські вирази про щастя і почуття, якими носії мови користуються щодня. Усі приклади наші власні.',
      ru: 'Эта песня звучит как праздник: Эд Ширан соединил поп-музыку с персидскими мелодиями и назвал песню нежным словом, которое значит «мой дорогой». Она помогает говорить о любви, радости, танцах и о том, как разные культуры обращаются к близким людям. Ниже собраны тёплые английские выражения о счастье и чувствах, которыми носители языка пользуются каждый день. Все примеры наши собственные.',
      en: 'This song sounds like a party: Ed Sheeran mixed pop with Persian melodies and named the song after a tender word that means my dear. It helps us talk about love, joy, dancing and how different cultures speak to the people close to them. Below are warm English expressions about happiness and feelings that native speakers use every day. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to be over the moon',
        m: { uk: 'бути на сьомому небі від щастя', ru: 'быть на седьмом небе от счастья', en: 'be extremely happy' },
        story: {
          uk: 'Уявіть, що ви такі щасливі, що можете перестрибнути через Місяць. Цей вираз дуже поширений у британській англійській, його кажуть про великі радісні новини. Звучить розмовно й тепло. Саме такий настрій у пісні: радість, від якої хочеться танцювати.',
          ru: 'Представьте, что вы так счастливы, что можете перепрыгнуть через Луну. Это выражение очень распространено в британском английском, его говорят о больших радостных новостях. Звучит разговорно и тепло. Именно такое настроение в песне: радость, от которой хочется танцевать.',
          en: 'Imagine you are so happy that you could jump over the moon. This phrase is very common in British English and is used for big, happy news. It sounds informal and warm. That is exactly the mood of the song: joy that makes you want to dance.',
        },
        ex: ['Mia got a puppy for her birthday and she’s over the moon.', 'Grandpa was over the moon when we visited him.'],
        similar: ['to be on cloud nine', 'to be thrilled'],
        tip: {
          uk: 'Кажіть over the moon з артиклем the. Не кажіть over moon.',
          ru: 'Говорите over the moon с артиклем the. Не говорите over moon.',
          en: 'Keep the article: over the moon, not over moon.',
        },
      },
      {
        en: 'to light up someone’s life',
        m: { uk: 'робити чиєсь життя яскравішим', ru: 'делать чью-то жизнь ярче', en: 'make someone’s life happier and brighter' },
        story: {
          uk: 'Light up означає «освітлювати». Коли людина освітлює твоє життя, з нею все стає радіснішим. Так кажуть про коханих, дітей, друзів і навіть домашніх тварин. Вираз ніжний і трохи урочистий, він часто трапляється в листівках.',
          ru: 'Light up значит «освещать». Когда человек освещает твою жизнь, с ним всё становится радостнее. Так говорят о любимых, детях, друзьях и даже домашних животных. Выражение нежное и немного торжественное, оно часто встречается в открытках.',
          en: 'Light up means to make bright. When a person lights up your life, everything becomes happier with them. People say it about partners, children, friends and even pets. The phrase is tender and a little formal, and you often see it in cards.',
        },
        ex: ['My baby sister lights up our lives.', 'Our dog has lit up my grandma’s life since she got him.'],
        similar: ['to brighten someone’s day', 'to make someone happy'],
        tip: {
          uk: 'Також кажуть her face lit up, тобто її обличчя засяяло від радості.',
          ru: 'Также говорят her face lit up, то есть её лицо засияло от радости.',
          en: 'People also say her face lit up, meaning she suddenly looked very happy.',
        },
      },
      {
        en: 'to have a spring in your step',
        m: { uk: 'іти бадьоро, бути в чудовому настрої', ru: 'идти бодро, быть в отличном настроении', en: 'walk or act in a happy, energetic way' },
        story: {
          uk: 'Spring тут означає «пружина». Коли ти щасливий, ти ніби пружиниш при ходьбі. Вираз описує людину, яка помітно радіє: закохалася, отримала добру новину чи просто має гарний день. Він легкий і позитивний, як ритм цієї пісні.',
          ru: 'Spring здесь значит «пружина». Когда ты счастлив, ты будто пружинишь при ходьбе. Выражение описывает человека, который заметно радуется: влюбился, получил хорошую новость или просто у него хороший день. Оно лёгкое и позитивное, как ритм этой песни.',
          en: 'Spring here means a coil that bounces. When you are happy, you seem to bounce as you walk. The phrase describes someone who is clearly in a good mood: in love, after good news or just on a great day. It is light and positive, like the rhythm of this song.',
        },
        ex: ['After the good news, Tom had a spring in his step all day.', 'Sunny mornings always put a spring in my step.'],
        similar: ['to feel on top of the world', 'to be full of beans'],
        tip: {
          uk: 'Можна сказати put a spring in someone’s step: Music puts a spring in my step.',
          ru: 'Можно сказать put a spring in someone’s step: Music puts a spring in my step.',
          en: 'You can also say put a spring in someone’s step: Music puts a spring in my step.',
        },
      },
      {
        en: 'to dance like nobody’s watching',
        m: { uk: 'танцювати вільно, не соромлячись', ru: 'танцевать свободно, не стесняясь', en: 'dance freely without worrying what people think' },
        story: {
          uk: 'Це популярна порада: роби те, що любиш, і не переймайся, що подумають інші. Її часто пишуть на постерах і в соцмережах. Вираз підходить до танцювальної пісні, яка кличе забути про сором’язливість і просто радіти.',
          ru: 'Это популярный совет: делай то, что любишь, и не переживай, что подумают другие. Его часто пишут на постерах и в соцсетях. Выражение подходит к танцевальной песне, которая зовёт забыть о стеснительности и просто радоваться.',
          en: 'This is popular advice: do what you love and don’t worry about what others think. You often see it on posters and social media. It suits a dance song that invites you to forget being shy and just enjoy yourself.',
        },
        ex: ['At the school disco, Max danced like nobody was watching.', 'Put on your favourite song and dance like nobody’s watching.'],
        similar: ['to let yourself go', 'to let your hair down'],
        tip: {
          uk: 'Nobody’s тут означає nobody is. У минулому кажуть like nobody was watching.',
          ru: 'Nobody’s здесь значит nobody is. В прошлом говорят like nobody was watching.',
          en: 'Nobody’s here means nobody is. In the past say like nobody was watching.',
        },
      },
      {
        en: 'to mean the world to someone',
        m: { uk: 'бути для когось усім', ru: 'быть для кого-то всем', en: 'be extremely important to someone' },
        story: {
          uk: 'Буквально «означати для когось увесь світ». Так кажуть про найдорожчих людей або про дуже важливі речі. Вираз щирий і емоційний, його часто чути в подяках. Він передає ту саму ніжність, що й слово azizam.',
          ru: 'Буквально «значить для кого-то весь мир». Так говорят о самых дорогих людях или об очень важных вещах. Выражение искреннее и эмоциональное, его часто слышно в благодарностях. Оно передаёт ту же нежность, что и слово azizam.',
          en: 'Literally to mean the whole world to someone. People say it about their dearest people or very important things. It is sincere and emotional and often heard in thank-you speeches. It carries the same tenderness as the word azizam.',
        },
        ex: ['Your help means the world to me.', 'My best friend means the world to me.'],
        similar: ['to mean a lot to someone', 'to be everything to someone'],
        tip: {
          uk: 'Після mean прийменник to: means the world to me. Не кажіть for me.',
          ru: 'После mean предлог to: means the world to me. Не говорите for me.',
          en: 'Use to after mean: means the world to me, not for me.',
        },
      },
      {
        en: 'the apple of someone’s eye',
        m: { uk: 'найдорожча людина, улюбленець', ru: 'самый дорогой человек, любимец', en: 'the person someone loves most' },
        story: {
          uk: 'Дуже старий вираз, він є ще в Біблії. Так кажуть про людину, яку дуже люблять і бережуть, найчастіше про дитину чи онука. Звучить тепло й трохи старомодно. Українською схоже кажуть «як зіницю ока».',
          ru: 'Очень старое выражение, оно есть ещё в Библии. Так говорят о человеке, которого очень любят и берегут, чаще всего о ребёнке или внуке. Звучит тепло и немного старомодно. По-русски похоже говорят «как зеницу ока».',
          en: 'A very old phrase that even appears in the Bible. It describes a person who is loved and protected very much, usually a child or grandchild. It sounds warm and a little old-fashioned. Ukrainian has a similar image about guarding something like the pupil of your eye.',
        },
        ex: ['Little Anya is the apple of her grandpa’s eye.', 'Their first puppy was the apple of their eye.'],
        similar: ['someone’s pride and joy', 'someone’s favourite'],
        tip: {
          uk: 'Apple тут в однині: the apple of my eye, а не the apples.',
          ru: 'Apple здесь в единственном числе: the apple of my eye, а не the apples.',
          en: 'Apple is singular here: the apple of my eye, not the apples.',
        },
      },
      {
        en: 'to sweep someone off their feet',
        m: { uk: 'зачарувати, закохати в себе', ru: 'очаровать, влюбить в себя', en: 'make someone fall in love quickly' },
        story: {
          uk: 'Буквально «збити когось з ніг», але в доброму сенсі: людина настільки вражає, що ти не можеш устояти. Так кажуть про романтичне знайомство або про щось дуже захопливе. Вираз романтичний і трохи казковий, як і настрій пісні.',
          ru: 'Буквально «сбить кого-то с ног», но в хорошем смысле: человек так впечатляет, что ты не можешь устоять. Так говорят о романтическом знакомстве или о чём-то очень захватывающем. Выражение романтичное и немного сказочное, как и настроение песни.',
          en: 'Literally to knock someone off their feet, but in a good way: someone is so impressive that you can’t resist. People use it about romantic meetings or something very exciting. It is romantic and a bit fairy-tale, like the mood of the song.',
        },
        ex: ['In the film, the prince swept her off her feet.', 'The new musical swept the audience off their feet.'],
        similar: ['to charm someone', 'to win someone’s heart'],
        tip: {
          uk: 'Займенник змінюється: sweep me off my feet, sweep her off her feet.',
          ru: 'Местоимение меняется: sweep me off my feet, sweep her off her feet.',
          en: 'Change the pronouns: sweep me off my feet, sweep her off her feet.',
        },
      },
      {
        en: 'to have the time of your life',
        m: { uk: 'чудово провести час, як ніколи', ru: 'отлично провести время, как никогда', en: 'enjoy yourself very much' },
        story: {
          uk: 'Так кажуть про найкращі моменти: свято, подорож, концерт. Буквально «мати найкращий час свого життя». Вираз розмовний і дуже емоційний. Він ідеально описує вечірку, де звучить така пісня, як Azizam.',
          ru: 'Так говорят о лучших моментах: празднике, путешествии, концерте. Буквально «иметь лучшее время своей жизни». Выражение разговорное и очень эмоциональное. Оно идеально описывает вечеринку, где звучит такая песня, как Azizam.',
          en: 'People say this about the best moments: a party, a trip, a concert. It is informal and very emotional. It perfectly describes a party where a song like Azizam is playing.',
        },
        ex: ['We had the time of our lives at the summer festival.', 'The kids are having the time of their lives at the water park.'],
        similar: ['to have a blast', 'to have a great time'],
        tip: {
          uk: 'Займенник має збігатися з підметом: we had the time of our lives.',
          ru: 'Местоимение должно совпадать с подлежащим: we had the time of our lives.',
          en: 'Match the pronoun to the subject: we had the time of our lives.',
        },
      },
      {
        en: 'to bring people together',
        m: { uk: 'об’єднувати людей', ru: 'объединять людей', en: 'help people feel close and connected' },
        story: {
          uk: 'Так кажуть про речі, які зближують: музику, спорт, їжу, свята. Вираз нейтральний, його вживають і в розмові, і в статтях. Пісня, де поєднуються англійська поп-музика і перські мелодії, добрий приклад того, як музика об’єднує культури.',
          ru: 'Так говорят о вещах, которые сближают: музыке, спорте, еде, праздниках. Выражение нейтральное, его используют и в разговоре, и в статьях. Песня, где соединяются английская поп-музыка и персидские мелодии, хороший пример того, как музыка объединяет культуры.',
          en: 'People say this about things that make us closer: music, sport, food, holidays. The phrase is neutral and used in conversation and in articles. A song that mixes English pop with Persian melodies is a good example of music bringing cultures together.',
        },
        ex: ['Football brings people together all over the world.', 'Cooking dinner on Sundays brings our family together.'],
        similar: ['to unite people', 'to connect people'],
        tip: {
          uk: 'Together стоїть у кінці: brings people together, а не brings together people (хоч так теж можна, перше природніше).',
          ru: 'Together стоит в конце: brings people together, а не brings together people (хотя так тоже можно, первое естественнее).',
          en: 'Together usually goes at the end: brings people together sounds more natural than brings together people.',
        },
      },
      {
        en: 'to feel at home',
        m: { uk: 'почуватися як удома', ru: 'чувствовать себя как дома', en: 'feel relaxed and welcome' },
        story: {
          uk: 'Так кажуть, коли в новому місці чи з новими людьми тобі затишно. Господарі часто кажуть гостям: Make yourself at home. Пісня, натхненна культурою, яку продюсер привіз із дитинства, теж про це відчуття: музика нагадує про дім і близьких.',
          ru: 'Так говорят, когда в новом месте или с новыми людьми тебе уютно. Хозяева часто говорят гостям: Make yourself at home. Песня, вдохновлённая культурой, которую продюсер принёс из детства, тоже об этом чувстве: музыка напоминает о доме и близких.',
          en: 'People say this when they feel comfortable in a new place or with new people. Hosts often tell guests: Make yourself at home. A song inspired by the producer’s childhood culture is also about this feeling: music reminds us of home and loved ones.',
        },
        ex: ['From the first day, I felt at home in my new class.', 'Come in and make yourself at home!'],
        similar: ['to feel welcome', 'to feel comfortable'],
        tip: {
          uk: 'Без артикля: feel at home, а не feel at the home.',
          ru: 'Без артикля: feel at home, а не feel at the home.',
          en: 'No article: feel at home, not feel at the home.',
        },
      },
    ],
    culture: [
      {
        uk: 'Англійською до близьких звертаються словами dear, love, honey, sweetheart, darling. У Британії продавці й водії автобусів часто кажуть незнайомим love або dear, і це просто дружня ввічливість.',
        ru: 'По-английски к близким обращаются словами dear, love, honey, sweetheart, darling. В Британии продавцы и водители автобусов часто говорят незнакомым love или dear, и это просто дружеская вежливость.',
        en: 'In English people call loved ones dear, love, honey, sweetheart or darling. In Britain shop assistants and bus drivers often call strangers love or dear, and it is just friendly politeness.',
      },
      {
        uk: 'У багатьох мовах є свої ніжні слова, як azizam. В українській це «серденько», «сонечко», «золотко», у російській «солнышко», «зайка», в іспанській cariño.',
        ru: 'Во многих языках есть свои нежные слова, как azizam. В украинском это «серденько», «сонечко», «золотко», в русском «солнышко», «зайка», в испанском cariño.',
        en: 'Many languages have tender words like azizam. Ukrainian has серденько (little heart), сонечко (little sun) and золотко (little gold), and Spanish has cariño.',
      },
      {
        uk: 'Перська мова (фарсі) звучить в Ірані, а також близькі до неї варіанти в Афганістані й Таджикистані. Деякі англійські слова прийшли з перської, наприклад pyjamas і bazaar.',
        ru: 'Персидский язык (фарси) звучит в Иране, а также близкие к нему варианты в Афганистане и Таджикистане. Некоторые английские слова пришли из персидского, например pyjamas и bazaar.',
        en: 'Persian (Farsi) is spoken in Iran, and close varieties are spoken in Afghanistan and Tajikistan. Some English words come from Persian, for example pyjamas and bazaar.',
      },
    ],
  },

  'opalite': {
    intro: {
      uk: 'Ця пісня про світло після темряви: про те, що щастя не завжди падає з неба, іноді його треба створити самому, як люди створили штучний камінь опаліт. Вона допомагає говорити про невдачі, прощення себе і нові початки. Нижче зібрано англійські вирази, якими носії мови підбадьорюють себе й інших у важкі часи. Усі приклади наші власні.',
      ru: 'Эта песня о свете после темноты: о том, что счастье не всегда падает с неба, иногда его нужно создать самому, как люди создали искусственный камень опалит. Она помогает говорить о неудачах, прощении себя и новых началах. Ниже собраны английские выражения, которыми носители языка подбадривают себя и других в трудные времена. Все примеры наши собственные.',
      en: 'This song is about light after darkness: happiness does not always fall from the sky, sometimes you have to make it yourself, just as people made the stone opalite. It helps us talk about failures, forgiving yourself and new beginnings. Below are English expressions that native speakers use to encourage themselves and others in hard times. All the examples are our own.',
    },
    phrases: [
      {
        en: 'every cloud has a silver lining',
        m: { uk: 'нема лиха без добра', ru: 'нет худа без добра', en: 'something good can come from a bad situation' },
        story: {
          uk: 'Silver lining це срібляста облямівка хмари, коли за нею світить сонце. Прислів’я каже: навіть у поганій ситуації є щось хороше. Його знають усі, і кажуть, щоб когось підбадьорити. Це добре передає ідею пісні про світло після похмурих днів.',
          ru: 'Silver lining это серебристая кайма облака, когда за ним светит солнце. Пословица говорит: даже в плохой ситуации есть что-то хорошее. Её знают все и говорят, чтобы кого-то подбодрить. Это хорошо передаёт идею песни о свете после мрачных дней.',
          en: 'A silver lining is the bright edge of a cloud when the sun is behind it. The proverb says that even a bad situation has something good in it. Everyone knows it and says it to cheer someone up. It captures the song’s idea of light after gloomy days.',
        },
        ex: ['I broke my leg, but I read ten books. Every cloud has a silver lining.', 'The trip was cancelled, but every cloud has a silver lining: we had a picnic at home.'],
        similar: ['to look on the bright side', 'there’s a silver lining'],
        tip: {
          uk: 'Часто кажуть коротко: The silver lining is that... Тобто «плюс у тому, що...».',
          ru: 'Часто говорят коротко: The silver lining is that... То есть «плюс в том, что...».',
          en: 'People often say just: The silver lining is that... meaning the good part is that...',
        },
      },
      {
        en: 'to turn over a new leaf',
        m: { uk: 'почати з чистого аркуша', ru: 'начать с чистого листа', en: 'start behaving in a better way' },
        story: {
          uk: 'Leaf тут означає «аркуш», сторінку в книжці. Перегорнути нову сторінку означає змінити свої звички на краще. Вираз часто вживають на початку року чи після помилок. Він пасує до пісні, бо вона про те, як залишити похмуре в минулому.',
          ru: 'Leaf здесь значит «лист», страницу в книге. Перевернуть новую страницу значит изменить свои привычки к лучшему. Выражение часто используют в начале года или после ошибок. Оно подходит к песне, потому что она о том, как оставить мрачное в прошлом.',
          en: 'Leaf here means a page in a book. Turning over a new page means changing your habits for the better. People often use it at the start of a year or after mistakes. It suits the song, which is about leaving gloomy things in the past.',
        },
        ex: ['After failing the test, Sam turned over a new leaf and studied every day.', 'This September I’m turning over a new leaf: no phone after 10 pm.'],
        similar: ['to make a fresh start', 'to start over'],
        tip: {
          uk: 'Не плутайте з leave (залишати). Тут leaf, у множині leaves.',
          ru: 'Не путайте с leave (оставлять). Здесь leaf, во множественном числе leaves.',
          en: 'Don’t confuse leaf with leave. Leaf is a noun, plural leaves.',
        },
      },
      {
        en: 'to be hard on yourself',
        m: { uk: 'бути надто суворим до себе', ru: 'быть слишком строгим к себе', en: 'criticise yourself too much' },
        story: {
          uk: 'Так кажуть людині, яка постійно себе сварить за помилки. Найчастіше у формі поради: Don’t be so hard on yourself. Вираз теплий і підтримувальний. Пісня якраз про те, щоб пробачити собі й рухатися далі.',
          ru: 'Так говорят человеку, который постоянно ругает себя за ошибки. Чаще всего в виде совета: Don’t be so hard on yourself. Выражение тёплое и поддерживающее. Песня как раз о том, чтобы простить себе и двигаться дальше.',
          en: 'People say this to someone who keeps blaming themselves for mistakes. Most often it is advice: Don’t be so hard on yourself. The phrase is warm and supportive. The song is about exactly that: forgiving yourself and moving on.',
        },
        ex: ['You got a B, not an F. Don’t be so hard on yourself!', 'She’s too hard on herself after every match.'],
        similar: ['to beat yourself up', 'to blame yourself'],
        tip: {
          uk: 'Прийменник on: hard on yourself. Не кажіть hard to yourself.',
          ru: 'Предлог on: hard on yourself. Не говорите hard to yourself.',
          en: 'Use on: hard on yourself, not hard to yourself.',
        },
      },
      {
        en: 'to see the light at the end of the tunnel',
        m: { uk: 'бачити світло в кінці тунелю', ru: 'видеть свет в конце туннеля', en: 'see that a hard time will end soon' },
        story: {
          uk: 'Образ зрозумілий: довгий темний тунель і нарешті світло попереду. Так кажуть, коли важкий період майже закінчився. Вираз однаковий у багатьох мовах, тож його легко запам’ятати. Він добре пасує до пісні про світле після похмурого.',
          ru: 'Образ понятный: длинный тёмный туннель и наконец свет впереди. Так говорят, когда тяжёлый период почти закончился. Выражение одинаковое во многих языках, поэтому его легко запомнить. Оно хорошо подходит к песне о светлом после мрачного.',
          en: 'The image is clear: a long dark tunnel and finally light ahead. People say it when a hard period is almost over. The phrase is the same in many languages, so it is easy to remember. It fits a song about brightness after gloom.',
        },
        ex: ['Exams finish on Friday, I can see the light at the end of the tunnel.', 'After months of repairs, we finally see the light at the end of the tunnel.'],
        similar: ['to be nearly there', 'to see the finish line'],
        tip: {
          uk: 'Можна сказати коротше: There’s light at the end of the tunnel.',
          ru: 'Можно сказать короче: There’s light at the end of the tunnel.',
          en: 'A shorter version: There’s light at the end of the tunnel.',
        },
      },
      {
        en: 'to pick yourself up',
        m: { uk: 'зібратися з силами після невдачі', ru: 'собраться с силами после неудачи', en: 'recover after a failure and continue' },
        story: {
          uk: 'Буквально «підняти себе» після падіння. Так кажуть про людину, яка не здається після невдачі. Часто в парі: pick yourself up and dust yourself off, тобто «піднімись і обтрусися». Вираз підбадьорливий, як і настрій пісні.',
          ru: 'Буквально «поднять себя» после падения. Так говорят о человеке, который не сдаётся после неудачи. Часто в паре: pick yourself up and dust yourself off, то есть «поднимись и отряхнись». Выражение ободряющее, как и настроение песни.',
          en: 'Literally to lift yourself up after a fall. People say it about someone who doesn’t give up after failing. It often comes as pick yourself up and dust yourself off. The phrase is encouraging, like the mood of the song.',
        },
        ex: ['He lost the final, but he picked himself up and trained harder.', 'Pick yourself up, there’s another chance next week.'],
        similar: ['to bounce back', 'to get back on your feet'],
        tip: {
          uk: 'Займенник змінюється: pick myself up, picked herself up.',
          ru: 'Местоимение меняется: pick myself up, picked herself up.',
          en: 'Change the pronoun: pick myself up, picked herself up.',
        },
      },
      {
        en: 'to make the best of it',
        m: { uk: 'взяти найкраще з того, що є', ru: 'взять лучшее из того, что есть', en: 'try to enjoy a situation that is not perfect' },
        story: {
          uk: 'Так кажуть, коли ситуація не ідеальна, але змінити її не можна, тож краще отримати з неї максимум радості. Вираз дуже практичний і позитивний. Він близький до ідеї опаліту: не чекати ідеального каменю, а зробити гарну річ із того, що маєш.',
          ru: 'Так говорят, когда ситуация не идеальна, но изменить её нельзя, поэтому лучше получить из неё максимум радости. Выражение очень практичное и позитивное. Оно близко к идее опалита: не ждать идеального камня, а сделать красивую вещь из того, что есть.',
          en: 'People say this when a situation is not perfect but can’t be changed, so it is better to get as much joy from it as possible. The phrase is practical and positive. It is close to the idea of opalite: don’t wait for the perfect stone, make something beautiful from what you have.',
        },
        ex: ['It rained on our holiday, so we made the best of it and visited museums.', 'The room is small, but let’s make the best of it.'],
        similar: ['to make the most of it', 'to make do'],
        tip: {
          uk: 'Тут лише make, не do: make the best of it.',
          ru: 'Здесь только make, не do: make the best of it.',
          en: 'Only make works here: make the best of it, not do the best of it.',
        },
      },
      {
        en: 'to let bygones be bygones',
        m: { uk: 'що було, те минуло; забути старі образи', ru: 'что было, то прошло; забыть старые обиды', en: 'forget past problems and be friends again' },
        story: {
          uk: 'Bygones це те, що минуло. Вираз означає: не будемо згадувати старі сварки. Його кажуть, коли пропонують помиритися. Звучить трохи старомодно, але його досі часто вживають. Пісня теж про те, щоб відпустити минуле.',
          ru: 'Bygones это то, что прошло. Выражение значит: не будем вспоминать старые ссоры. Его говорят, когда предлагают помириться. Звучит немного старомодно, но его до сих пор часто используют. Песня тоже о том, чтобы отпустить прошлое.',
          en: 'Bygones are things that have passed. The phrase means let’s not bring up old arguments. People say it when they offer to make peace. It sounds a bit old-fashioned but is still common. The song is also about letting go of the past.',
        },
        ex: ['We argued last year, but let’s let bygones be bygones.', 'The two neighbours decided to let bygones be bygones.'],
        similar: ['to forgive and forget', 'to bury the hatchet'],
        tip: {
          uk: 'Слово bygones завжди у множині в цьому виразі.',
          ru: 'Слово bygones всегда во множественном числе в этом выражении.',
          en: 'Bygones is always plural in this phrase.',
        },
      },
      {
        en: 'to be a blessing in disguise',
        m: { uk: 'щастя під маскою невдачі', ru: 'не было бы счастья, да несчастье помогло', en: 'something that seemed bad but turned out good' },
        story: {
          uk: 'Disguise означає «маскування». Річ, яка спершу здавалася невдачею, потім виявилася подарунком долі. Вираз дуже поширений у розповідях про життя. Він підходить до пісні, бо важкий період іноді веде до чогось кращого.',
          ru: 'Disguise значит «маскировка». Вещь, которая сначала казалась неудачей, потом оказалась подарком судьбы. Выражение очень распространено в рассказах о жизни. Оно подходит к песне, потому что тяжёлый период иногда ведёт к чему-то лучшему.',
          en: 'Disguise means a costume that hides who you are. Something that first looked like bad luck later turned out to be a gift. The phrase is very common in life stories. It suits the song, because a hard time sometimes leads to something better.',
        },
        ex: ['Missing the train was a blessing in disguise: I met my best friend at the station.', 'Not getting that part in the play was a blessing in disguise.'],
        similar: ['to turn out for the best', 'a happy accident'],
        tip: {
          uk: 'Вимова: disguise звучить як [дісґАйз].',
          ru: 'Произношение: disguise звучит как [дисгАйз].',
          en: 'Pronunciation: disguise sounds like dis-GUYZ.',
        },
      },
      {
        en: 'to brighten up',
        m: { uk: 'проясніти, повеселішати', ru: 'проясниться, повеселеть', en: 'become brighter or happier' },
        story: {
          uk: 'Brighten up кажуть і про погоду (небо прояснилося), і про людину (вона повеселішала). Можна й когось розвеселити: brighten up someone’s day. Просте й корисне фразове дієслово. Він точно описує зміну настрою, про яку пісня.',
          ru: 'Brighten up говорят и о погоде (небо прояснилось), и о человеке (он повеселел). Можно и кого-то развеселить: brighten up someone’s day. Простой и полезный фразовый глагол. Он точно описывает смену настроения, о которой песня.',
          en: 'Brighten up is used for the weather (the sky got clearer) and for people (they became happier). You can also brighten up someone’s day. It is a simple, useful phrasal verb. It describes exactly the change of mood the song is about.',
        },
        ex: ['The weather brightened up in the afternoon.', 'Your message really brightened up my day.'],
        similar: ['to cheer up', 'to clear up'],
        tip: {
          uk: 'Про погоду часто кажуть просто It’s brightening up.',
          ru: 'О погоде часто говорят просто It’s brightening up.',
          en: 'About the weather people often just say It’s brightening up.',
        },
      },
      {
        en: 'happiness is a choice',
        m: { uk: 'щастя це вибір', ru: 'счастье это выбор', en: 'you can decide to be happy' },
        story: {
          uk: 'Популярна мотиваційна фраза: щастя залежить не лише від обставин, а й від того, як ми на них дивимося. Її можна обговорювати: чи завжди це правда? Вона дуже близька до ідеї Тейлор про щастя, яке створюєш сам. Добра тема для дискусії в класі.',
          ru: 'Популярная мотивационная фраза: счастье зависит не только от обстоятельств, но и от того, как мы на них смотрим. Её можно обсуждать: всегда ли это правда? Она очень близка к идее Тейлор о счастье, которое создаёшь сам. Хорошая тема для дискуссии в классе.',
          en: 'A popular motivational phrase: happiness depends not only on what happens but on how we see it. You can discuss it: is it always true? It is very close to Taylor’s idea of happiness you make yourself. A good topic for a class debate.',
        },
        ex: ['My aunt always says happiness is a choice, and she smiles every day.', 'Do you agree that happiness is a choice?'],
        similar: ['to choose to be happy', 'to make your own happiness'],
        tip: {
          uk: 'Happiness незлічуване: happiness is, а не happinesses are.',
          ru: 'Happiness неисчисляемое: happiness is, а не happinesses are.',
          en: 'Happiness is uncountable: happiness is, not happinesses are.',
        },
      },
    ],
    culture: [
      {
        uk: 'Опал вважається каменем жовтня, а альбом із піснею Opalite вийшов саме в жовтні. В англомовних країнах популярна традиція birthstones: кожен місяць має свій камінь.',
        ru: 'Опал считается камнем октября, а альбом с песней Opalite вышел именно в октябре. В англоязычных странах популярна традиция birthstones: у каждого месяца свой камень.',
        en: 'Opal is the birthstone for October, and the album with Opalite came out in October. In English-speaking countries the birthstone tradition is popular: every month has its own stone.',
      },
      {
        uk: 'Фанатів Тейлор Свіфт називають Swifties. Вони люблять шукати приховані підказки, або easter eggs, у її кліпах і обкладинках.',
        ru: 'Фанатов Тейлор Свифт называют Swifties. Они любят искать скрытые подсказки, или easter eggs, в её клипах и обложках.',
        en: 'Taylor Swift’s fans are called Swifties. They love looking for hidden clues, or easter eggs, in her videos and album covers.',
      },
      {
        uk: 'Кліп стилізований під 1990-ті: у ньому можна побачити моду, техніку й атмосферу того часу. Це гарна нагода розпитати батьків, якими були 90-ті.',
        ru: 'Клип стилизован под 1990-е: в нём можно увидеть моду, технику и атмосферу того времени. Это хороший повод расспросить родителей, какими были 90-е.',
        en: 'The video is styled like the 1990s, with the fashion, gadgets and atmosphere of that time. It is a good reason to ask your parents what the 90s were like.',
      },
    ],
  },

};
