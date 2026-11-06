// Додаткові пісні (частина G): класика, яку люблять батьки й діти. Тексти пісень не публікуємо.
import type { Song } from './songs';
import type { SongLesson } from './songs-more';
import type { SongDeep } from './songs-deep';

export const SONGS_EXTRA5: Song[] = [
  {
    id: 'here-comes-the-sun', artist: 'The Beatles', title: 'Here Comes the Sun', yt: 'KQetemT1sWc', year: 1969, level: 'A2', age: 'all',
    about: { uk: 'Одна з найсвітліших пісень гурту The Beatles. Її написав гітарист Джордж Гаррісон теплого весняного дня в Англії. Пісня про те, що холодні й важкі часи минають, а попереду тепло і радість. Тут офіційне відео з каналу гурту, зроблене до 50-річчя альбому Abbey Road.', ru: 'Одна из самых светлых песен группы The Beatles. Её написал гитарист Джордж Харрисон тёплым весенним днём в Англии. Песня о том, что холодные и трудные времена проходят, а впереди тепло и радость. Здесь официальное видео с канала группы, сделанное к 50-летию альбома Abbey Road.', en: 'One of the brightest songs by The Beatles. Guitarist George Harrison wrote it on a warm spring day in England. It is about cold, hard times coming to an end, with warmth and joy ahead. This is the official video from the band’s channel, made for the 50th anniversary of the album Abbey Road.' },
    grammar: { uk: 'Get + прикметник у вищому ступені для змін: It is getting warmer. The days are getting longer. My English is getting better.', ru: 'Get + прилагательное в сравнительной степени для изменений: It is getting warmer. The days are getting longer. My English is getting better.', en: 'Get + comparative for changes: It is getting warmer. The days are getting longer. My English is getting better.' },
    phrases: [
      { en: 'a ray of sunshine', m: { uk: 'промінчик сонця; людина, що дарує радість', ru: 'лучик солнца; человек, который дарит радость', en: 'a person or thing that makes you happy' }, ex: 'My baby cousin is a real ray of sunshine.' },
      { en: 'to look on the bright side', m: { uk: 'бачити хороше в ситуації', ru: 'видеть хорошее в ситуации', en: 'think about the good part of a bad situation' }, ex: 'We missed the bus, but look on the bright side: we can walk in the sun.' },
      { en: 'to warm up', m: { uk: 'потеплішати; розігрітися', ru: 'потеплеть; разогреться', en: 'become warmer' }, ex: 'It usually warms up in April.' },
      { en: 'the worst is over', m: { uk: 'найгірше позаду', ru: 'худшее позади', en: 'the most difficult part has finished' }, ex: 'The exams are finished, so the worst is over.' },
      { en: 'a breath of fresh air', m: { uk: 'ковток свіжого повітря; щось нове і приємне', ru: 'глоток свежего воздуха; что-то новое и приятное', en: 'something new and pleasant' }, ex: 'Our new teacher is a breath of fresh air.' },
    ],
    talk: ['What is your favourite season? Why?', 'What do you like doing on the first warm day of spring?', 'Who is a ray of sunshine in your life?'],
  },
  {
    id: 'dancing-queen', artist: 'ABBA', title: 'Dancing Queen', yt: 'xFrGuyw1V8s', year: 1976, level: 'A2-B1', age: 'all',
    about: { uk: 'Найвідоміша пісня шведського гурту ABBA. Вона про чисту радість танцю: коли грає улюблена музика, ти забуваєш про все і почуваєшся королевою танцмайданчика. Цю пісню знають і бабусі, і онуки, вона звучить на весіллях, випускних і в мюзиклі «Мамма Міа!».', ru: 'Самая известная песня шведской группы ABBA. Она о чистой радости танца: когда играет любимая музыка, ты забываешь обо всём и чувствуешь себя королевой танцпола. Эту песню знают и бабушки, и внуки, она звучит на свадьбах, выпускных и в мюзикле «Мамма Миа!».', en: 'The most famous song by the Swedish band ABBA. It is about the pure joy of dancing: when your favourite music plays, you forget everything and feel like the queen of the dance floor. Grandparents and grandchildren both know it, and it is played at weddings, proms and in the musical Mamma Mia!' },
    grammar: { uk: 'Дієслово + -ing після love, like, enjoy, hate, can’t stand: I love dancing. She enjoys singing. He can’t stand waiting.', ru: 'Глагол + -ing после love, like, enjoy, hate, can’t stand: I love dancing. She enjoys singing. He can’t stand waiting.', en: 'Verb + -ing after love, like, enjoy, hate and can’t stand: I love dancing. She enjoys singing. He can’t stand waiting.' },
    phrases: [
      { en: 'to hit the dance floor', m: { uk: 'вийти танцювати', ru: 'выйти танцевать', en: 'start dancing at a party' }, ex: 'When our favourite song started, we all hit the dance floor.' },
      { en: 'to steal the show', m: { uk: 'бути в центрі уваги, затьмарити всіх', ru: 'быть в центре внимания, затмить всех', en: 'be the best and most noticed person at an event' }, ex: 'Grandma stole the show with her dance moves.' },
      { en: 'the life of the party', m: { uk: 'душа компанії', ru: 'душа компании', en: 'the most fun person at a party' }, ex: 'My uncle is always the life of the party.' },
      { en: 'to dress up', m: { uk: 'святково вдягнутися', ru: 'нарядно одеться', en: 'put on special, smart clothes' }, ex: 'We dressed up for my sister’s graduation.' },
      { en: 'a dancing queen', m: { uk: 'королева танцю, та, що танцює найкраще', ru: 'королева танца, та, кто танцует лучше всех', en: 'a girl or woman who loves dancing and dances brilliantly' }, ex: 'At the wedding, my aunt was the dancing queen.' },
    ],
    talk: ['Do you like dancing at family parties? Why or why not?', 'Who is the life of the party in your family?', 'Why do you think ABBA songs are still popular after fifty years?'],
  },
  {
    id: 'what-a-wonderful-world', artist: 'Louis Armstrong', title: 'What a Wonderful World', yt: 'rBrd_3VMC3c', year: 1967, level: 'A2', age: 'all',
    about: { uk: 'Тиха, тепла пісня джазової легенди Луї Армстронга. Він співає про звичайну красу навколо нас: природу, людей, дітей, і нагадує, як багато хорошого є у світі, якщо уважно придивитися. Його хриплуватий голос неможливо сплутати ні з чиїм іншим. Тут офіційне відео з каналу виконавця.', ru: 'Тихая, тёплая песня джазовой легенды Луи Армстронга. Он поёт об обычной красоте вокруг нас: природе, людях, детях, и напоминает, как много хорошего есть в мире, если внимательно присмотреться. Его хрипловатый голос невозможно спутать ни с чьим другим. Здесь официальное видео с канала исполнителя.', en: 'A quiet, warm song by jazz legend Louis Armstrong. He sings about the everyday beauty around us: nature, people and children, and reminds us how much good there is in the world if we look carefully. Nobody else has a voice like his rough, friendly one. This is the official video from the artist’s channel.' },
    grammar: { uk: 'Окличні речення: What a + прикметник + іменник! (What a beautiful day!) і How + прикметник! (How beautiful!). З множиною і незлічуваними без a: What lovely flowers! What nice weather!', ru: 'Восклицательные предложения: What a + прилагательное + существительное! (What a beautiful day!) и How + прилагательное! (How beautiful!). С множественным числом и неисчисляемыми без a: What lovely flowers! What nice weather!', en: 'Exclamations: What a + adjective + noun! (What a beautiful day!) and How + adjective! (How beautiful!). With plurals and uncountable nouns, no a: What lovely flowers! What nice weather!' },
    phrases: [
      { en: 'to count your blessings', m: { uk: 'цінувати те хороше, що маєш', ru: 'ценить то хорошее, что имеешь', en: 'think about the good things in your life' }, ex: 'When I feel sad, I try to count my blessings.' },
      { en: 'to stop and smell the roses', m: { uk: 'зупинитися і насолодитися моментом', ru: 'остановиться и насладиться моментом', en: 'slow down and enjoy life' }, ex: 'You work too much. Stop and smell the roses!' },
      { en: 'to take something for granted', m: { uk: 'сприймати щось як належне', ru: 'воспринимать что-то как должное', en: 'not notice how valuable something is' }, ex: 'Don’t take your health for granted.' },
      { en: 'the little things', m: { uk: 'дрібниці, які роблять нас щасливими', ru: 'мелочи, которые делают нас счастливыми', en: 'small, simple things that make life nice' }, ex: 'For me, happiness is in the little things, like hot tea and a good book.' },
      { en: 'breathtaking', m: { uk: 'від якого перехоплює подих', ru: 'захватывающий дух', en: 'extremely beautiful' }, ex: 'The view from the hill was breathtaking.' },
    ],
    talk: ['What three things make the world wonderful for you?', 'What do people often take for granted?', 'Where is the most beautiful place you have ever seen?'],
  },
  {
    id: 'three-little-birds', artist: 'Bob Marley & The Wailers', title: 'Three Little Birds', yt: 'HNBCVM4KbUM', year: 1977, level: 'A2', age: 'all',
    about: { uk: 'Одна з найспокійніших і найдобріших пісень ямайського музиканта Боба Марлі, короля реггі. Вона про те, щоб не панікувати, а вірити, що все налагодиться. Офіційний анімаційний кліп 2020 року розповідає казку про Порося і Вовка, які завдяки трьом пташкам стають друзями.', ru: 'Одна из самых спокойных и добрых песен ямайского музыканта Боба Марли, короля регги. Она о том, чтобы не паниковать, а верить, что всё наладится. Официальный анимационный клип 2020 года рассказывает сказку о Поросёнке и Волке, которые благодаря трём птичкам становятся друзьями.', en: 'One of the calmest and kindest songs by Jamaican musician Bob Marley, the king of reggae. It is about not panicking and believing that things will work out. The official animated video from 2020 tells a fairy tale about a Little Pig and a Big Bad Wolf who become friends thanks to three little birds.' },
    grammar: { uk: 'Наказовий спосіб для порад і підтримки: Relax. Take a deep breath. Don’t panic. Let’s + дієслово: Let’s sit down and think.', ru: 'Повелительное наклонение для советов и поддержки: Relax. Take a deep breath. Don’t panic. Let’s + глагол: Let’s sit down and think.', en: 'Imperatives for advice and support: Relax. Take a deep breath. Don’t panic. Let’s + verb: Let’s sit down and think.' },
    phrases: [
      { en: 'to take it easy', m: { uk: 'не напружуватися, розслабитися', ru: 'не напрягаться, расслабиться', en: 'relax and not work too hard' }, ex: 'It’s Sunday, so let’s take it easy.' },
      { en: 'to calm down', m: { uk: 'заспокоїтися', ru: 'успокоиться', en: 'become less upset or excited' }, ex: 'Calm down and tell me what happened.' },
      { en: 'peace of mind', m: { uk: 'душевний спокій', ru: 'душевный покой', en: 'a feeling that everything is OK' }, ex: 'I check my bag twice for peace of mind.' },
      { en: 'an unlikely friendship', m: { uk: 'несподівана дружба', ru: 'неожиданная дружба', en: 'a friendship between people you would never expect to be friends' }, ex: 'The cat and the dog have an unlikely friendship.' },
      { en: 'an early bird', m: { uk: 'жайворонок, людина, що рано встає', ru: 'жаворонок, человек, который рано встаёт', en: 'a person who gets up early' }, ex: 'My dad is an early bird, he is up at six.' },
    ],
    talk: ['What helps you calm down when you are worried?', 'Do you know an unlikely friendship, in real life or in a story?', 'Are you an early bird or a night owl?'],
  },
  {
    id: 'im-still-standing', artist: 'Elton John', title: 'I’m Still Standing', yt: 'ZHwVBirqD2s', year: 1983, level: 'B1', age: 'all',
    about: { uk: 'Енергійна пісня британської легенди Елтона Джона про силу і стійкість: після важкого періоду людина показує, що вона не зламалася і почувається чудово. Яскравий кліп зняли на набережній французького міста Канни, з танцюристами і кольоровими костюмами. Пісню знають і діти завдяки мультфільму «Співай».', ru: 'Энергичная песня британской легенды Элтона Джона о силе и стойкости: после тяжёлого периода человек показывает, что он не сломался и чувствует себя отлично. Яркий клип сняли на набережной французского города Канны, с танцорами и цветными костюмами. Песню знают и дети благодаря мультфильму «Зверопой».', en: 'An energetic song by British legend Elton John about strength and resilience: after a hard time, someone shows that they have not been broken and feel great. The colourful video was filmed on the seafront in Cannes, France, with dancers and bright costumes. Children know the song too, from the animated film Sing.' },
    grammar: { uk: 'Still, any more, no longer: I still live here. I don’t live there any more. He no longer plays football.', ru: 'Still, any more, no longer: I still live here. I don’t live there any more. He no longer plays football.', en: 'Still, any more and no longer: I still live here. I don’t live there any more. He no longer plays football.' },
    phrases: [
      { en: 'to pick yourself up', m: { uk: 'зібратися з силами після невдачі', ru: 'собраться с силами после неудачи', en: 'recover after a failure' }, ex: 'She lost the match, but she picked herself up and trained harder.' },
      { en: 'to make a comeback', m: { uk: 'повернутися (після перерви чи невдачі)', ru: 'вернуться (после перерыва или неудачи)', en: 'become successful or popular again' }, ex: 'Vinyl records have made a comeback.' },
      { en: 'against all odds', m: { uk: 'всупереч усьому', ru: 'вопреки всему', en: 'when success seemed impossible' }, ex: 'Against all odds, our small team won the cup.' },
      { en: 'to stand tall', m: { uk: 'триматися гідно, з високо піднятою головою', ru: 'держаться достойно, с высоко поднятой головой', en: 'be proud and confident' }, ex: 'Stand tall and believe in yourself.' },
      { en: 'to keep your head up', m: { uk: 'не падати духом', ru: 'не падать духом', en: 'stay positive when things are hard' }, ex: 'Keep your head up, next season will be better.' },
    ],
    talk: ['Tell us about a time you picked yourself up after a failure.', 'Which singer or team made a great comeback?', 'Have you seen the film Sing? Which character do you like?'],
  },
  {
    id: 'i-wanna-dance-with-somebody', artist: 'Whitney Houston', title: 'I Wanna Dance with Somebody (Who Loves Me)', yt: 'eH3giaIzONA', year: 1987, level: 'B1', age: 'teens',
    about: { uk: 'Радісний поп-хіт 80-х від Вітні Г’юстон, однієї з найсильніших співачок в історії. Під веселою музикою захована щира думка: танцювати весело, але ще краще, коли поруч є людина, яка тебе по-справжньому любить. Яскравий кліп у стилі 80-х: кучері, кольоровий одяг і сцена.', ru: 'Радостный поп-хит 80-х от Уитни Хьюстон, одной из самых сильных певиц в истории. Под весёлой музыкой спрятана искренняя мысль: танцевать весело, но ещё лучше, когда рядом есть человек, который тебя по-настоящему любит. Яркий клип в стиле 80-х: кудри, цветная одежда и сцена.', en: 'A joyful 80s pop hit by Whitney Houston, one of the most powerful singers in history. Under the happy music there is an honest idea: dancing is fun, but it is even better when someone who really loves you is there. A bright 80s style video: big curls, colourful clothes and a stage.' },
    grammar: { uk: 'Розмовні скорочення wanna = want to, gonna = going to, gotta = have got to. І займенники somebody, anybody, nobody, everybody.', ru: 'Разговорные сокращения wanna = want to, gonna = going to, gotta = have got to. И местоимения somebody, anybody, nobody, everybody.', en: 'Spoken short forms: wanna = want to, gonna = going to, gotta = have got to. And the pronouns somebody, anybody, nobody and everybody.' },
    phrases: [
      { en: 'to have two left feet', m: { uk: 'зовсім не вміти танцювати', ru: 'совсем не уметь танцевать', en: 'be very bad at dancing' }, ex: 'I’d love to dance, but I have two left feet.' },
      { en: 'to feel lonely', m: { uk: 'почуватися самотнім', ru: 'чувствовать себя одиноким', en: 'feel sad because you are alone' }, ex: 'He felt lonely in the new city at first.' },
      { en: 'to light up the room', m: { uk: 'наповнювати кімнату світлом і радістю', ru: 'наполнять комнату светом и радостью', en: 'make everyone happier when you arrive' }, ex: 'Her smile lights up the room.' },
      { en: 'a dance partner', m: { uk: 'партнер по танцю', ru: 'партнёр по танцу', en: 'a person you dance with' }, ex: 'My grandpa is my favourite dance partner.' },
      { en: 'to come alive', m: { uk: 'оживати, ставати енергійним', ru: 'оживать, становиться энергичным', en: 'become lively and full of energy' }, ex: 'The town comes alive in summer.' },
    ],
    talk: ['Is it more fun to dance alone or with friends?', 'What makes a person light up the room?', 'Why do you think 80s pop is popular again?'],
  },
  {
    id: 'take-on-me', artist: 'a-ha', title: 'Take On Me', yt: 'djV11Xbc914', year: 1985, level: 'B1', age: 'teens',
    about: { uk: 'Головний хіт норвезького гурту a-ha і один із символів 80-х. Пісня про сміливість зробити перший крок і дати шанс почуттям. Легендарний кліп поєднує живе відео з олівцевими малюнками: дівчина в кафе читає комікс, і герой коміксу затягує її у свій намальований світ.', ru: 'Главный хит норвежской группы a-ha и один из символов 80-х. Песня о смелости сделать первый шаг и дать шанс чувствам. Легендарный клип соединяет живое видео с карандашными рисунками: девушка в кафе читает комикс, и герой комикса затягивает её в свой нарисованный мир.', en: 'The biggest hit by the Norwegian band a-ha and a symbol of the 80s. It is about having the courage to take the first step and give feelings a chance. The legendary video mixes real film with pencil drawings: a girl in a café reads a comic, and the hero of the comic pulls her into his drawn world.' },
    grammar: { uk: 'Фразові дієслова з take: take on (взяти на себе), take off (злетіти, зняти), take up (почати хобі), take after (бути схожим на родича), take care of (піклуватися).', ru: 'Фразовые глаголы с take: take on (взять на себя), take off (взлететь, снять), take up (начать хобби), take after (быть похожим на родственника), take care of (заботиться).', en: 'Phrasal verbs with take: take on (accept a challenge), take off (leave the ground, remove), take up (start a hobby), take after (look or act like a relative), take care of (look after).' },
    phrases: [
      { en: 'to take on a challenge', m: { uk: 'взятися за складне завдання', ru: 'взяться за сложную задачу', en: 'agree to do something difficult' }, ex: 'She took on the challenge of running a marathon.' },
      { en: 'to take a chance', m: { uk: 'ризикнути, спробувати', ru: 'рискнуть, попробовать', en: 'try something although it may not work' }, ex: 'I took a chance and sang at the school concert.' },
      { en: 'to give it a shot', m: { uk: 'спробувати', ru: 'попробовать', en: 'try to do something' }, ex: 'I’ve never skated before, but I’ll give it a shot.' },
      { en: 'third time lucky', m: { uk: 'з третьої спроби пощастить', ru: 'с третьей попытки повезёт', en: 'the third try will be successful' }, ex: 'I failed twice, but third time lucky!' },
      { en: 'to hit a high note', m: { uk: 'взяти високу ноту', ru: 'взять высокую ноту', en: 'sing a very high sound well' }, ex: 'Can you hit the high note at the end of the song?' },
    ],
    talk: ['When did you take a chance and it worked?', 'Would you like to step into a comic or a cartoon? Which one?', 'Why do you think the video is still famous today?'],
  },
  {
    id: 'africa', artist: 'Toto', title: 'Africa', yt: 'FTQbiNvZqaY', year: 1982, level: 'B1-B2', age: 'teens',
    about: { uk: 'Культова пісня американського гурту Toto про мрію про далеку країну і про вибір між звичним життям і великою пригодою. Через десятиліття після виходу пісню відкрило нове покоління завдяки мемам, кавер-версіям і навіть арт-інсталяції в пустелі. Кліп знято в старій бібліотеці, де дослідник шукає відомості про Африку.', ru: 'Культовая песня американской группы Toto о мечте о далёкой стране и о выборе между привычной жизнью и большим приключением. Спустя десятилетия после выхода песню открыло новое поколение благодаря мемам, каверам и даже арт-инсталляции в пустыне. Клип снят в старой библиотеке, где исследователь ищет сведения об Африке.', en: 'A cult song by the American band Toto about dreaming of a faraway land and choosing between a familiar life and a big adventure. Decades after it came out, a new generation discovered it through memes, cover versions and even an art installation in a desert. The video is set in an old library, where a researcher looks for information about Africa.' },
    grammar: { uk: 'Present perfect для досвіду і past simple для конкретного часу: Have you ever been to Africa? No, I haven’t. I went to Egypt in 2021.', ru: 'Present perfect для опыта и past simple для конкретного времени: Have you ever been to Africa? No, I haven’t. I went to Egypt in 2021.', en: 'Present perfect for experience and past simple for a specific time: Have you ever been to Africa? No, I haven’t. I went to Egypt in 2021.' },
    phrases: [
      { en: 'wanderlust', m: { uk: 'жага мандрів', ru: 'страсть к путешествиям', en: 'a strong wish to travel' }, ex: 'Travel videos always give me wanderlust.' },
      { en: 'to have itchy feet', m: { uk: 'не сидіти на місці, хотіти подорожувати', ru: 'не сидеть на месте, хотеть путешествовать', en: 'want to travel or move somewhere new' }, ex: 'After a year in the office, I had itchy feet.' },
      { en: 'the middle of nowhere', m: { uk: 'глушина, богом забуте місце', ru: 'глушь, у чёрта на куличках', en: 'a place far from towns and people' }, ex: 'Our holiday house is in the middle of nowhere.' },
      { en: 'a long way from home', m: { uk: 'далеко від дому', ru: 'далеко от дома', en: 'very far from where you live' }, ex: 'Studying abroad, she was a long way from home.' },
      { en: 'an earworm', m: { uk: 'мелодія, що «застрягла» в голові', ru: 'мелодия, которая «застряла» в голове', en: 'a tune you can’t stop hearing in your head' }, ex: 'That song is such an earworm, I’ve hummed it all day.' },
    ],
    talk: ['Which faraway country would you love to visit? Why?', 'Do you have itchy feet, or do you prefer staying at home?', 'Which song is an earworm for you right now?'],
  },
];

export const MORE_G: Record<string, SongLesson> = {
  'here-comes-the-sun': {
    facts: [
      { uk: 'Пісня вийшла у 1969 році на альбомі «Abbey Road». Її написав гітарист гурту Джордж Гаррісон.', ru: 'Песня вышла в 1969 году на альбоме «Abbey Road». Её написал гитарист группы Джордж Харрисон.', en: 'The song came out in 1969 on the album Abbey Road. It was written by the band’s guitarist, George Harrison.' },
      { uk: 'Гаррісон придумав пісню весняного дня в саду свого друга, гітариста Еріка Клептона. Того дня він вирішив пропустити нудні ділові зустрічі й відпочити на сонці.', ru: 'Харрисон придумал песню весенним днём в саду своего друга, гитариста Эрика Клэптона. В тот день он решил пропустить скучные деловые встречи и отдохнуть на солнце.', en: 'Harrison came up with the song on a spring day in the garden of his friend, guitarist Eric Clapton. That day he decided to skip some boring business meetings and relax in the sun.' },
      { uk: 'У травні 2023 року це стала перша пісня The Beatles, яку на Spotify прослухали понад мільярд разів. І це попри те, що вона ніколи не виходила окремим синглом.', ru: 'В мае 2023 года это стала первая песня The Beatles, которую на Spotify прослушали больше миллиарда раз. И это несмотря на то, что она никогда не выходила отдельным синглом.', en: 'In May 2023 it became the first Beatles song to pass one billion streams on Spotify, even though it was never released as a single.' },
      { uk: 'У пісні звучить синтезатор Moog, на той час зовсім нова електронна технологія.', ru: 'В песне звучит синтезатор Moog, в то время совсем новая электронная технология.', en: 'You can hear a Moog synthesizer in the song, which was very new electronic technology at the time.' },
      { uk: 'The Beatles походять з англійського міста Ліверпуль: Джон Леннон, Пол Маккартні, Джордж Гаррісон і Рінго Старр. Обкладинка «Abbey Road», де четверо переходять дорогу по «зебрі» в Лондоні, одна з найвідоміших у світі.', ru: 'The Beatles родом из английского города Ливерпуль: Джон Леннон, Пол Маккартни, Джордж Харрисон и Ринго Старр. Обложка «Abbey Road», где четверо переходят дорогу по «зебре» в Лондоне, одна из самых известных в мире.', en: 'The Beatles came from Liverpool, England: John Lennon, Paul McCartney, George Harrison and Ringo Starr. The Abbey Road cover, with the four of them walking across a zebra crossing in London, is one of the most famous in the world.' },
    ],
    warmup: [
      'How do you feel on the first sunny day after winter?',
      'Do your parents or grandparents listen to The Beatles?',
      'What is the weather like today? Describe it in three words.',
    ],
    vocab: [
      {
        group: { uk: 'Погода і пори року', ru: 'Погода и времена года', en: 'Weather and seasons' },
        items: [
          { en: 'sunny', uk: 'сонячний', ru: 'солнечный', ex: 'It was a sunny morning, so we had breakfast outside.' },
          { en: 'chilly', uk: 'прохолодний, зябкий', ru: 'прохладный, зябкий', ex: 'Take a jacket, it’s chilly this evening.' },
          { en: 'a puddle', uk: 'калюжа', ru: 'лужа', ex: 'My little brother loves jumping in puddles.' },
          { en: 'a frost', uk: 'мороз, іній', ru: 'мороз, иней', ex: 'There was frost on the car this morning.' },
          { en: 'to clear up', uk: 'прояснитися (про погоду)', ru: 'проясниться (о погоде)', ex: 'The rain stopped and the sky cleared up.' },
        ],
      },
      {
        group: { uk: 'Весна і природа', ru: 'Весна и природа', en: 'Spring and nature' },
        items: [
          { en: 'to bloom', uk: 'цвісти', ru: 'цвести', ex: 'The apple trees bloom in April.' },
          { en: 'a bud', uk: 'брунька, пуп’янок', ru: 'почка, бутон', ex: 'Look, there are tiny buds on the branches.' },
          { en: 'sunshine', uk: 'сонячне світло', ru: 'солнечный свет', ex: 'The cat is sleeping in the sunshine.' },
          { en: 'a meadow', uk: 'луг', ru: 'луг', ex: 'We had a picnic in a meadow full of flowers.' },
          { en: 'to come out', uk: 'з’явитися, вийти (про сонце)', ru: 'появиться, выйти (о солнце)', ex: 'The sun came out after lunch.' },
        ],
      },
      {
        group: { uk: 'Почуття і надія', ru: 'Чувства и надежда', en: 'Feelings and hope' },
        items: [
          { en: 'relieved', uk: 'який відчув полегшення', ru: 'испытывающий облегчение', ex: 'I was relieved when the test was over.' },
          { en: 'hopeful', uk: 'сповнений надії', ru: 'полный надежды', ex: 'We are hopeful about the new season.' },
          { en: 'to brighten up', uk: 'повеселішати, проясніти', ru: 'повеселеть, проясниться', ex: 'Her face brightened up when she heard the news.' },
          { en: 'carefree', uk: 'безтурботний', ru: 'беззаботный', ex: 'Summer holidays are a carefree time.' },
          { en: 'to cheer up', uk: 'підбадьоритися', ru: 'приободриться', ex: 'He cheered up when his friend called.' },
        ],
      },
    ],
    grammar: {
      uk: 'Коли щось поступово змінюється, ми вживаємо get + прикметник у вищому ступені, зазвичай у present continuous. It is getting warmer. The days are getting longer. My English is getting better. Для сильної зміни можна повторити прикметник: It is getting warmer and warmer. З довгими прикметниками вживаємо more and more: The park is getting more and more beautiful. Замість get іноді кажуть become, але get звучить природніше в розмові. Не плутайте: It is getting cold (стає холодно) і It is cold (холодно зараз).',
      ru: 'Когда что-то постепенно меняется, мы используем get + прилагательное в сравнительной степени, обычно в present continuous. It is getting warmer. The days are getting longer. My English is getting better. Для сильного изменения можно повторить прилагательное: It is getting warmer and warmer. С длинными прилагательными используем more and more: The park is getting more and more beautiful. Вместо get иногда говорят become, но get звучит естественнее в разговоре. Не путайте: It is getting cold (становится холодно) и It is cold (холодно сейчас).',
      en: 'When something changes little by little, we use get + comparative adjective, usually in the present continuous. It is getting warmer. The days are getting longer. My English is getting better. For a big change, repeat the adjective: It is getting warmer and warmer. With long adjectives use more and more: The park is getting more and more beautiful. You can also say become, but get sounds more natural in conversation. Don’t mix up It is getting cold (it is changing) and It is cold (it is cold now).',
    },
    grammarEx: [
      { q: 'It’s April, and the days are getting ___.', opts: ['longer', 'long', 'longest'], a: 'longer' },
      { q: 'The weather is ___ warmer every day.', opts: ['getting', 'get', 'got to'], a: 'getting' },
      { q: 'My guitar playing is getting ___.', opts: ['better', 'gooder', 'more good'], a: 'better' },
      { q: 'The garden is getting more and more ___.', opts: ['colourful', 'colourfuler', 'colourfullest'], a: 'colourful' },
      { q: 'It’s getting ___ and darker, let’s go home.', opts: ['darker', 'dark', 'more dark'], a: 'darker' },
      { q: 'The grass ___ getting greener.', opts: ['is', 'are', 'be'], a: 'is' },
      { q: 'In autumn the nights get ___.', opts: ['colder', 'more cold', 'coldest'], a: 'colder' },
      { q: 'Are you ___ tired? We can stop for a rest.', opts: ['getting', 'get', 'gets'], a: 'getting' },
    ],
    gapfill: [
      { q: 'After the rain there was a big ___ near our door.', a: 'puddle' },
      { q: 'After the storm, the sky cleared ___.', a: 'up' },
      { q: 'The roses ___ every June in Grandma’s garden.', a: 'bloom' },
      { q: 'My little sister is a ray of ___.', a: 'sunshine' },
      { q: 'Take a scarf, it’s ___ outside.', a: 'chilly' },
      { q: 'I felt so ___ when I found my lost phone.', a: 'relieved' },
      { q: 'We missed the train, but let’s look on the bright ___.', a: 'side' },
      { q: 'The exams are finished, so the worst is ___.', a: 'over' },
    ],
    listen: [
      { uk: 'Послухай вступ. Який інструмент звучить першим: гітара, фортепіано чи барабани?', ru: 'Послушай вступление. Какой инструмент звучит первым: гитара, фортепиано или барабаны?', en: 'Listen to the intro. Which instrument do you hear first: a guitar, a piano or drums?' },
      { uk: 'Скільки разів ти чуєш назву пісні? Порахуй.', ru: 'Сколько раз ты слышишь название песни? Посчитай.', en: 'How many times do you hear the title of the song? Count.' },
      { uk: 'Опиши настрій пісні трьома прикметниками.', ru: 'Опиши настроение песни тремя прилагательными.', en: 'Describe the mood of the song with three adjectives.' },
      { uk: 'Знайди момент, де ритм стає незвичним і ніби «спотикається». Плесни в долоні, коли почуєш.', ru: 'Найди момент, где ритм становится необычным и будто «спотыкается». Хлопни в ладоши, когда услышишь.', en: 'Find the part where the rhythm becomes unusual and seems to stumble. Clap when you hear it.' },
    ],
    speaking: [
      'What is getting better in your life this year?',
      'Why do you think so many people love this song more than fifty years later?',
      'What do you do to feel better after a long, grey winter?',
      'Which song by The Beatles do your family know?',
      'Is it OK to skip a meeting or a lesson to enjoy a sunny day? Why or why not?',
      'Describe your perfect spring day.',
    ],
    roleplay: {
      uk: 'A: ти ведучий прогнозу погоди на радіо і розповідаєш, що погода покращується. B: слухач, який дзвонить у студію і питає, що робити на вихідних. Використовуйте get + вищий ступінь: It is getting warmer, the days are getting longer.',
      ru: 'A: ты ведущий прогноза погоды на радио и рассказываешь, что погода улучшается. B: слушатель, который звонит в студию и спрашивает, чем заняться на выходных. Используйте get + сравнительную степень: It is getting warmer, the days are getting longer.',
      en: 'A: you present the weather forecast on the radio and say the weather is improving. B: you are a listener who calls the studio and asks what to do at the weekend. Use get + comparative: It is getting warmer, the days are getting longer.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-90 слів) «Моя перша весняна прогулянка». Опиши, що змінюється навколо: погода, дерева, люди. Використай щонайменше три речення з get + вищий ступінь.',
      ru: 'Напиши короткий текст (60-90 слов) «Моя первая весенняя прогулка». Опиши, что меняется вокруг: погода, деревья, люди. Используй как минимум три предложения с get + сравнительная степень.',
      en: 'Write a short text (60-90 words) called My first spring walk. Describe what is changing around you: the weather, the trees, the people. Use at least three sentences with get + comparative.',
    },
  },

  'dancing-queen': {
    facts: [
      { uk: 'Пісня вийшла у 1976 році й увійшла до альбому ABBA «Arrival».', ru: 'Песня вышла в 1976 году и вошла в альбом ABBA «Arrival».', en: 'The song came out in 1976 and is on ABBA’s album Arrival.' },
      { uk: '«Dancing Queen» стала єдиною піснею ABBA, яка посіла перше місце в американському чарті Billboard Hot 100.', ru: '«Dancing Queen» стала единственной песней ABBA, которая заняла первое место в американском чарте Billboard Hot 100.', en: 'Dancing Queen is ABBA’s only song to reach No. 1 on the US Billboard Hot 100.' },
      { uk: 'У червні 1976 року ABBA заспівали її на шведському телебаченні на святковому концерті напередодні весілля короля Швеції Карла XVI Густава і Сільвії.', ru: 'В июне 1976 года ABBA спели её на шведском телевидении на праздничном концерте накануне свадьбы короля Швеции Карла XVI Густава и Сильвии.', en: 'In June 1976 ABBA sang it on Swedish TV at a gala on the eve of the wedding of King Carl XVI Gustaf of Sweden and Silvia.' },
      { uk: 'Назва гурту складається з перших літер імен учасників: Агнета, Бйорн, Бенні та Анні-Фрід. Світову славу ABBA здобули у 1974 році, коли перемогли на «Євробаченні» з піснею «Waterloo».', ru: 'Название группы состоит из первых букв имён участников: Агнета, Бьорн, Бенни и Анни-Фрид. Мировую славу ABBA получили в 1974 году, когда победили на «Евровидении» с песней «Waterloo».', en: 'The band’s name comes from the first letters of the members’ names: Agnetha, Björn, Benny and Anni-Frid. ABBA became world famous in 1974 when they won Eurovision with Waterloo.' },
      { uk: 'Пісні ABBA лягли в основу мюзиклу «Мамма Міа!» (1999) і фільму 2008 року. А з 2022 року в Лондоні йде шоу «ABBA Voyage», де на сцені виступають цифрові аватари учасників.', ru: 'Песни ABBA легли в основу мюзикла «Мамма Миа!» (1999) и фильма 2008 года. А с 2022 года в Лондоне идёт шоу «ABBA Voyage», где на сцене выступают цифровые аватары участников.', en: 'ABBA’s songs became the musical Mamma Mia! (1999) and a film in 2008. Since 2022 the show ABBA Voyage has run in London, with digital avatars of the band on stage.' },
    ],
    warmup: [
      'What songs do people dance to at weddings in your country?',
      'Have you seen the film Mamma Mia!?',
      'Do you know any other songs from Eurovision?',
    ],
    vocab: [
      {
        group: { uk: 'Танці й вечірки', ru: 'Танцы и вечеринки', en: 'Dancing and parties' },
        items: [
          { en: 'a dance floor', uk: 'танцмайданчик', ru: 'танцпол', ex: 'The dance floor was full all night.' },
          { en: 'to spin', uk: 'крутитися', ru: 'кружиться', ex: 'She spun around in her new dress.' },
          { en: 'a glitter ball', uk: 'дзеркальна куля', ru: 'зеркальный шар', ex: 'A glitter ball was turning above the stage.' },
          { en: 'a DJ', uk: 'діджей', ru: 'диджей', ex: 'The DJ played all our favourite songs.' },
          { en: 'to sway', uk: 'гойдатися в такт', ru: 'покачиваться в такт', ex: 'Everyone swayed to the slow song.' },
        ],
      },
      {
        group: { uk: 'Свята і події', ru: 'Праздники и события', en: 'Celebrations and events' },
        items: [
          { en: 'a wedding', uk: 'весілля', ru: 'свадьба', ex: 'My cousin’s wedding is in June.' },
          { en: 'a prom', uk: 'випускний бал', ru: 'выпускной бал', ex: 'She bought a blue dress for the prom.' },
          { en: 'a gala', uk: 'урочистий вечір, гала-концерт', ru: 'торжественный вечер, гала-концерт', ex: 'The school had a gala for its 100th birthday.' },
          { en: 'to celebrate', uk: 'святкувати', ru: 'праздновать', ex: 'We celebrated Grandpa’s birthday with a big lunch.' },
          { en: 'a guest', uk: 'гість', ru: 'гость', ex: 'There were fifty guests at the party.' },
        ],
      },
      {
        group: { uk: 'Музика 70-х', ru: 'Музыка 70-х', en: 'Music of the 70s' },
        items: [
          { en: 'disco', uk: 'диско (стиль музики)', ru: 'диско (стиль музыки)', ex: 'Disco was very popular in the seventies.' },
          { en: 'a platform shoe', uk: 'туфля на платформі', ru: 'туфля на платформе', ex: 'My mum found her old platform shoes.' },
          { en: 'sparkly', uk: 'блискучий', ru: 'блестящий', ex: 'The singers wore sparkly costumes.' },
          { en: 'a chart', uk: 'хіт-парад, чарт', ru: 'хит-парад, чарт', ex: 'The song went to the top of the chart.' },
          { en: 'to sing along', uk: 'підспівувати', ru: 'подпевать', ex: 'Everyone sang along to the chorus.' },
        ],
      },
    ],
    grammar: {
      uk: 'Після дієслів, які виражають ставлення, like, love, enjoy, hate, don’t mind, can’t stand, ми зазвичай ставимо дієслово з -ing. I love dancing. She enjoys singing. My brother can’t stand waiting. Після enjoy і don’t mind можна тільки -ing: I enjoy swimming, а не I enjoy to swim. Після like, love, hate можна і to + дієслово, різниця невелика: I like to dance. Але з would ставимо тільки to: I would love to dance.',
      ru: 'После глаголов, которые выражают отношение, like, love, enjoy, hate, don’t mind, can’t stand, мы обычно ставим глагол с -ing. I love dancing. She enjoys singing. My brother can’t stand waiting. После enjoy и don’t mind можно только -ing: I enjoy swimming, а не I enjoy to swim. После like, love, hate можно и to + глагол, разница небольшая: I like to dance. Но с would ставим только to: I would love to dance.',
      en: 'After verbs of liking and disliking, like, love, enjoy, hate, don’t mind and can’t stand, we usually use a verb with -ing. I love dancing. She enjoys singing. My brother can’t stand waiting. After enjoy and don’t mind, use only -ing: I enjoy swimming, not I enjoy to swim. After like, love and hate you can also use to + verb, with little difference: I like to dance. But after would, use only to: I would love to dance.',
    },
    grammarEx: [
      { q: 'My grandma loves ___ to ABBA.', opts: ['dancing', 'dance', 'danced'], a: 'dancing' },
      { q: 'I enjoy ___ at family parties.', opts: ['singing', 'to sing', 'sing'], a: 'singing' },
      { q: 'He can’t stand ___ in long queues.', opts: ['waiting', 'wait', 'waits'], a: 'waiting' },
      { q: 'Would you like ___ with me?', opts: ['to dance', 'dancing', 'dance'], a: 'to dance' },
      { q: 'We don’t mind ___ early.', opts: ['leaving', 'to leave', 'leave'], a: 'leaving' },
      { q: 'She hates ___ up for parties.', opts: ['dressing', 'dress', 'dressed'], a: 'dressing' },
      { q: 'They really enjoyed ___ the musical.', opts: ['watching', 'to watch', 'watch'], a: 'watching' },
      { q: 'I’d love ___ ABBA Voyage one day.', opts: ['to see', 'seeing', 'see'], a: 'to see' },
    ],
    gapfill: [
      { q: 'When our song came on, we hit the dance ___.', a: 'floor' },
      { q: 'A glitter ___ was spinning above the stage.', a: 'ball' },
      { q: 'We dressed ___ for the wedding.', a: 'up' },
      { q: 'Grandpa stole the ___ with his dancing.', a: 'show' },
      { q: 'Everyone sang ___ to the chorus.', a: 'along' },
      { q: 'My uncle is the life of the ___.', a: 'party' },
      { q: 'The singers wore ___ silver costumes.', a: 'sparkly' },
      { q: 'We ___ my parents’ anniversary at a restaurant.', a: 'celebrated' },
    ],
    listen: [
      { uk: 'Послухай вступ. Що ти чуєш спочатку: фортепіано чи гітару? Звучання радісне чи сумне?', ru: 'Послушай вступление. Что ты слышишь сначала: фортепиано или гитару? Звучание радостное или грустное?', en: 'Listen to the intro. What do you hear first, a piano or a guitar? Does it sound happy or sad?' },
      { uk: 'Подивись кліп. Скільки співачок і скільки музикантів ти бачиш?', ru: 'Посмотри клип. Сколько певиц и сколько музыкантов ты видишь?', en: 'Watch the video. How many singers and how many musicians can you see?' },
      { uk: 'Опиши одяг учасників ABBA трьома словами.', ru: 'Опиши одежду участников ABBA тремя словами.', en: 'Describe the ABBA members’ clothes in three words.' },
      { uk: 'Підніми руку щоразу, коли чуєш назву пісні.', ru: 'Подними руку каждый раз, когда слышишь название песни.', en: 'Raise your hand every time you hear the title of the song.' },
    ],
    speaking: [
      'What do you enjoy doing at parties?',
      'Why do you think older and younger people both love ABBA?',
      'Would you like to see a concert with digital avatars? Why or why not?',
      'Which song always makes your family dance?',
      'Is Eurovision popular in your family? Who do you support?',
      'What would you wear to a 70s disco party?',
    ],
    roleplay: {
      uk: 'A: ти організовуєш родинне свято і питаєш гостя про музику й танці. B: гість, який розповідає, що любить і чого терпіти не може. Використовуйте love, enjoy, don’t mind, can’t stand + -ing.',
      ru: 'A: ты организуешь семейный праздник и спрашиваешь гостя о музыке и танцах. B: гость, который рассказывает, что любит и чего терпеть не может. Используйте love, enjoy, don’t mind, can’t stand + -ing.',
      en: 'A: you are planning a family party and ask a guest about music and dancing. B: you are the guest and say what you love and what you can’t stand. Use love, enjoy, don’t mind and can’t stand + -ing.',
    },
    writing: {
      uk: 'Напиши короткий опис (60-90 слів) найвеселішого свята, на якому ти був(ла). Що там робили люди? Хто був душею компанії? Використай щонайменше чотири дієслова з -ing після love, enjoy, hate тощо.',
      ru: 'Напиши короткое описание (60-90 слов) самого весёлого праздника, на котором ты был(а). Что там делали люди? Кто был душой компании? Используй как минимум четыре глагола с -ing после love, enjoy, hate и т. д.',
      en: 'Write a short description (60-90 words) of the most fun party you have been to. What did people do? Who was the life of the party? Use at least four -ing verbs after love, enjoy, hate and so on.',
    },
  },

  'what-a-wonderful-world': {
    facts: [
      { uk: 'Пісню написали Боб Тіле (під псевдонімом Джордж Дуглас) і Джордж Девід Вайсс. Луї Армстронг записав її у 1967 році.', ru: 'Песню написали Боб Тиле (под псевдонимом Джордж Дуглас) и Джордж Дэвид Вайс. Луи Армстронг записал её в 1967 году.', en: 'The song was written by Bob Thiele (as George Douglas) and George David Weiss. Louis Armstrong recorded it in 1967.' },
      { uk: 'У США пісня спочатку майже не продавалася. Зате у Великій Британії у 1968 році вона посіла перше місце і стала найпродаванішим синглом року.', ru: 'В США песня сначала почти не продавалась. Зато в Великобритании в 1968 году она заняла первое место и стала самым продаваемым синглом года.', en: 'At first the song hardly sold in the USA. But in the UK it went to No. 1 in 1968 and became the best-selling single of the year.' },
      { uk: 'Армстронгу тоді було 66 років, і він став найстаршим чоловіком, який очолив британський чарт синглів. Цей рекорд тримався до 2009 року.', ru: 'Армстронгу тогда было 66 лет, и он стал самым старшим мужчиной, возглавившим британский чарт синглов. Этот рекорд держался до 2009 года.', en: 'Armstrong was 66, which made him the oldest man to top the UK singles chart. The record lasted until 2009.' },
      { uk: 'У 1999 році пісню внесли до Зали слави «Греммі».', ru: 'В 1999 году песню внесли в Зал славы «Грэмми».', en: 'In 1999 the song was added to the Grammy Hall of Fame.' },
      { uk: 'Луї Армстронг народився в 1901 році в Новому Орлеані, батьківщині джазу. Він був чудовим трубачем, а друзі називали його Сачмо (Satchmo).', ru: 'Луи Армстронг родился в 1901 году в Новом Орлеане, родине джаза. Он был прекрасным трубачом, а друзья называли его Сачмо (Satchmo).', en: 'Louis Armstrong was born in 1901 in New Orleans, the home of jazz. He was a brilliant trumpet player, and his friends called him Satchmo.' },
    ],
    warmup: [
      'What makes you smile on an ordinary day?',
      'Have you heard jazz music before? Where?',
      'Name three beautiful things you can see from your window.',
    ],
    vocab: [
      {
        group: { uk: 'Природа навколо нас', ru: 'Природа вокруг нас', en: 'Nature around us' },
        items: [
          { en: 'a waterfall', uk: 'водоспад', ru: 'водопад', ex: 'We swam near a small waterfall.' },
          { en: 'a sunset', uk: 'захід сонця', ru: 'закат', ex: 'We watched the sunset from the beach.' },
          { en: 'a breeze', uk: 'легкий вітерець', ru: 'лёгкий ветерок', ex: 'A cool breeze came from the sea.' },
          { en: 'to blossom', uk: 'розквітати', ru: 'расцветать', ex: 'The cherry trees blossom in spring.' },
          { en: 'dawn', uk: 'світанок', ru: 'рассвет', ex: 'Birds start singing at dawn.' },
        ],
      },
      {
        group: { uk: 'Люди і доброта', ru: 'Люди и доброта', en: 'People and kindness' },
        items: [
          { en: 'a stranger', uk: 'незнайомець', ru: 'незнакомец', ex: 'A stranger helped me carry my bags.' },
          { en: 'to wave', uk: 'махати рукою', ru: 'махать рукой', ex: 'The children waved at the passing train.' },
          { en: 'kind-hearted', uk: 'добросердий', ru: 'добросердечный', ex: 'She is a kind-hearted girl who loves animals.' },
          { en: 'to share', uk: 'ділитися', ru: 'делиться', ex: 'She always shares her snacks with friends.' },
          { en: 'a neighbour', uk: 'сусід, сусідка', ru: 'сосед, соседка', ex: 'Our neighbour waters our plants when we travel.' },
        ],
      },
      {
        group: { uk: 'Джаз і голос', ru: 'Джаз и голос', en: 'Jazz and voice' },
        items: [
          { en: 'a trumpet', uk: 'труба', ru: 'труба', ex: 'He plays the trumpet in the school band.' },
          { en: 'husky', uk: 'хриплуватий (про голос)', ru: 'хрипловатый (о голосе)', ex: 'She has a husky voice when she is tired.' },
          { en: 'gentle', uk: 'ніжний, лагідний', ru: 'нежный, мягкий', ex: 'The song has a gentle melody.' },
          { en: 'to hum', uk: 'наспівувати без слів', ru: 'напевать без слов', ex: 'Dad hums when he cooks.' },
          { en: 'a legend', uk: 'легенда', ru: 'легенда', ex: 'Louis Armstrong is a jazz legend.' },
        ],
      },
    ],
    grammar: {
      uk: 'Коли ми захоплюємося чимось, уживаємо окличні речення. What a + прикметник + злічуваний іменник в однині: What a beautiful day! What a kind man! What + прикметник + множина або незлічуваний іменник, без a: What lovely flowers! What nice weather! How + прикметник (без іменника): How beautiful! How kind of you! Типова помилка: What a nice weather! Weather незлічуване, тому правильно What nice weather!',
      ru: 'Когда мы чем-то восхищаемся, используем восклицательные предложения. What a + прилагательное + исчисляемое существительное в единственном числе: What a beautiful day! What a kind man! What + прилагательное + множественное число или неисчисляемое существительное, без a: What lovely flowers! What nice weather! How + прилагательное (без существительного): How beautiful! How kind of you! Типичная ошибка: What a nice weather! Weather неисчисляемое, поэтому правильно What nice weather!',
      en: 'When we admire something, we use exclamations. What a + adjective + singular countable noun: What a beautiful day! What a kind man! What + adjective + plural or uncountable noun, no a: What lovely flowers! What nice weather! How + adjective (no noun): How beautiful! How kind of you! A common mistake is What a nice weather! Weather is uncountable, so say What nice weather!',
    },
    grammarEx: [
      { q: '___ a beautiful sunset!', opts: ['What', 'How', 'So'], a: 'What' },
      { q: '___ lovely! Did you paint it yourself?', opts: ['How', 'What', 'What a'], a: 'How' },
      { q: 'What ___ weather today!', opts: ['nice', 'a nice', 'an nice'], a: 'nice' },
      { q: 'What ___ amazing view!', opts: ['an', 'a', '-'], a: 'an' },
      { q: 'What ___ flowers!', opts: ['pretty', 'a pretty', 'an pretty'], a: 'pretty' },
      { q: '___ kind of you to help!', opts: ['How', 'What', 'What a'], a: 'How' },
      { q: 'What ___ wonderful song!', opts: ['a', 'an', 'the'], a: 'a' },
      { q: 'What ___ news! I’m so happy for you.', opts: ['great', 'a great', 'an great'], a: 'great' },
    ],
    gapfill: [
      { q: 'The water fell from the rocks, it was a beautiful ___.', a: 'waterfall' },
      { q: 'We got up early to watch the ___.', a: 'dawn' },
      { q: 'Don’t take your family for ___.', a: 'granted' },
      { q: 'Louis Armstrong played the ___ brilliantly.', a: 'trumpet' },
      { q: 'A friendly ___ showed us the way to the station.', a: 'stranger' },
      { q: 'When I feel sad, I count my ___.', a: 'blessings' },
      { q: 'The view from the mountain was ___.', a: 'breathtaking' },
      { q: 'My grandma always ___ old songs while she bakes.', a: 'hums' },
    ],
    listen: [
      { uk: 'Послухай початок. Які інструменти ти чуєш? Музика швидка чи повільна?', ru: 'Послушай начало. Какие инструменты ты слышишь? Музыка быстрая или медленная?', en: 'Listen to the beginning. Which instruments can you hear? Is the music fast or slow?' },
      { uk: 'Опиши голос Армстронга трьома прикметниками.', ru: 'Опиши голос Армстронга тремя прилагательными.', en: 'Describe Armstrong’s voice with three adjectives.' },
      { uk: 'Запиши всі кольори, які ти чуєш або бачиш у відео.', ru: 'Запиши все цвета, которые ты слышишь или видишь в видео.', en: 'Write down all the colours you hear or see in the video.' },
      { uk: 'Намалюй одну картинку, яку ця пісня малює у твоїй уяві.', ru: 'Нарисуй одну картинку, которую эта песня рисует в твоём воображении.', en: 'Draw one picture that the song creates in your imagination.' },
    ],
    speaking: [
      'What makes the world wonderful for you?',
      'What is something small that always makes you happy?',
      'Why do you think the song became a hit in the UK before the USA?',
      'Is it important to notice beautiful things every day? Why?',
      'Which older singer do your parents or grandparents love?',
      'If you could show one place in your country to a visitor, what would it be?',
    ],
    roleplay: {
      uk: 'A: ти екскурсовод у своєму місті або селі. B: турист, який приїхав уперше. A показує найкрасивіші місця, B захоплюється, використовуючи What a...! і How...! Потім поміняйтеся ролями.',
      ru: 'A: ты экскурсовод в своём городе или посёлке. B: турист, который приехал впервые. A показывает самые красивые места, B восхищается, используя What a...! и How...! Потом поменяйтесь ролями.',
      en: 'A: you are a tour guide in your town or village. B: you are a tourist visiting for the first time. A shows the most beautiful places, and B reacts with What a...! and How...! Then swap roles.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-90 слів) «Мій чудовий світ». Опиши п’ять речей, людей або місць, які роблять твоє життя прекрасним. Використай щонайменше три окличні речення з What a...! або How...!',
      ru: 'Напиши короткий текст (60-90 слов) «Мой чудесный мир». Опиши пять вещей, людей или мест, которые делают твою жизнь прекрасной. Используй как минимум три восклицательных предложения с What a...! или How...!',
      en: 'Write a short text (60-90 words) called My wonderful world. Describe five things, people or places that make your life beautiful. Use at least three exclamations with What a...! or How...!',
    },
  },

  'three-little-birds': {
    facts: [
      { uk: 'Пісня входить до альбому Боба Марлі та гурту The Wailers «Exodus» 1977 року. Окремим синглом вона вийшла у 1980 році й піднялася до 17-го місця британського чарту.', ru: 'Песня входит в альбом Боба Марли и группы The Wailers «Exodus» 1977 года. Отдельным синглом она вышла в 1980 году и поднялась до 17-го места британского чарта.', en: 'The song is on Bob Marley and The Wailers’ 1977 album Exodus. It came out as a single in 1980 and reached No. 17 in the UK chart.' },
      { uk: 'Друзі Марлі згадували, що на підвіконня його будинку на вулиці Хоуп-роуд у Кінгстоні часто прилітали маленькі пташки. Вважають, що саме вони надихнули музиканта, хоча точно цього ніхто не знає.', ru: 'Друзья Марли вспоминали, что на подоконник его дома на улице Хоуп-роуд в Кингстоне часто прилетали маленькие птички. Считается, что именно они вдохновили музыканта, хотя точно этого никто не знает.', en: 'Marley’s friends remembered small birds that often came to the windowsill of his house on Hope Road in Kingston. Many believe they inspired the song, although nobody knows for sure.' },
      { uk: 'У 1999 році журнал Time назвав «Exodus» найкращим альбомом XX століття.', ru: 'В 1999 году журнал Time назвал «Exodus» лучшим альбомом XX века.', en: 'In 1999 Time magazine named Exodus the best album of the 20th century.' },
      { uk: 'Офіційний анімаційний кліп з’явився у 2020 році до 75-річчя від дня народження Марлі. Його зняв британський режисер Морган Павелл зі студією Seed Animation.', ru: 'Официальный анимационный клип появился в 2020 году к 75-летию со дня рождения Марли. Его снял британский режиссёр Морган Пауэлл со студией Seed Animation.', en: 'The official animated video came out in 2020 for what would have been Marley’s 75th birthday. It was made by British director Morgan Powell with Seed Animation.' },
      { uk: 'Боб Марлі народився на Ямайці у 1945 році і зробив музику реггі відомою в усьому світі. У 2018 році ЮНЕСКО внесло ямайське реггі до списку нематеріальної культурної спадщини людства.', ru: 'Боб Марли родился на Ямайке в 1945 году и сделал музыку регги известной во всём мире. В 2018 году ЮНЕСКО внесло ямайское регги в список нематериального культурного наследия человечества.', en: 'Bob Marley was born in Jamaica in 1945 and made reggae music famous around the world. In 2018 UNESCO added Jamaican reggae to its list of the intangible cultural heritage of humanity.' },
    ],
    warmup: [
      'What do you do when you feel worried?',
      'Which birds can you see near your home?',
      'Do you know any fairy tales with a wolf in them?',
    ],
    vocab: [
      {
        group: { uk: 'Птахи і тварини', ru: 'Птицы и животные', en: 'Birds and animals' },
        items: [
          { en: 'a canary', uk: 'канарка', ru: 'канарейка', ex: 'Our neighbour has a yellow canary.' },
          { en: 'a windowsill', uk: 'підвіконня', ru: 'подоконник', ex: 'A sparrow landed on the windowsill.' },
          { en: 'to chirp', uk: 'цвірінькати', ru: 'чирикать', ex: 'The birds chirp every morning.' },
          { en: 'a nest', uk: 'гніздо', ru: 'гнездо', ex: 'There is a nest in the old tree.' },
          { en: 'to flap', uk: 'махати (крилами)', ru: 'махать (крыльями)', ex: 'The little bird flapped its wings.' },
        ],
      },
      {
        group: { uk: 'Спокій і настрій', ru: 'Спокойствие и настроение', en: 'Calm and mood' },
        items: [
          { en: 'calm', uk: 'спокійний', ru: 'спокойный', ex: 'The sea was calm this morning.' },
          { en: 'to relax', uk: 'розслаблятися', ru: 'расслабляться', ex: 'I relax by reading comics.' },
          { en: 'anxious', uk: 'тривожний, стурбований', ru: 'тревожный, обеспокоенный', ex: 'I feel anxious before tests.' },
          { en: 'to reassure', uk: 'заспокоювати, підбадьорювати', ru: 'успокаивать, ободрять', ex: 'Mum reassured me that the dog would be fine.' },
          { en: 'laid-back', uk: 'розслаблений, невимушений', ru: 'расслабленный, непринуждённый', ex: 'My uncle is very laid-back, he never gets angry.' },
        ],
      },
      {
        group: { uk: 'Казки і дружба', ru: 'Сказки и дружба', en: 'Fairy tales and friendship' },
        items: [
          { en: 'a fairy tale', uk: 'казка', ru: 'сказка', ex: 'My favourite fairy tale is about three little pigs.' },
          { en: 'an enemy', uk: 'ворог', ru: 'враг', ex: 'In the story, the cat and the mouse are enemies.' },
          { en: 'to get along', uk: 'ладнати, дружити', ru: 'ладить, дружить', ex: 'My brother and I get along well.' },
          { en: 'to trust', uk: 'довіряти', ru: 'доверять', ex: 'You can trust me with your secret.' },
          { en: 'to make friends', uk: 'подружитися', ru: 'подружиться', ex: 'It’s easy to make friends at summer camp.' },
        ],
      },
    ],
    grammar: {
      uk: 'Щоб дати пораду або підтримати когось, ми часто вживаємо наказовий спосіб: просто дієслово без підмета. Relax. Take a deep breath. Sit down. Заперечна форма: Don’t + дієслово: Don’t panic. Don’t give up. Щоб звучало м’якше, додаємо please або just: Just breathe. Please sit down. Let’s + дієслово, коли пропонуємо щось зробити разом: Let’s go for a walk. Let’s not argue. Зверніть увагу: у наказовому способі немає you на початку (не кажемо You relax!, якщо не хочемо підкреслити).',
      ru: 'Чтобы дать совет или поддержать кого-то, мы часто используем повелительное наклонение: просто глагол без подлежащего. Relax. Take a deep breath. Sit down. Отрицательная форма: Don’t + глагол: Don’t panic. Don’t give up. Чтобы звучало мягче, добавляем please или just: Just breathe. Please sit down. Let’s + глагол, когда предлагаем что-то сделать вместе: Let’s go for a walk. Let’s not argue. Обратите внимание: в повелительном наклонении нет you в начале (не говорим You relax!, если не хотим подчеркнуть).',
      en: 'To give advice or support someone, we often use the imperative: just the verb, with no subject. Relax. Take a deep breath. Sit down. The negative is Don’t + verb: Don’t panic. Don’t give up. To sound softer, add please or just: Just breathe. Please sit down. Use Let’s + verb to suggest doing something together: Let’s go for a walk. Let’s not argue. Note: there is no you at the start of an imperative (we don’t say You relax! unless we want to stress it).',
    },
    grammarEx: [
      { q: '___ a deep breath and count to ten.', opts: ['Take', 'Taking', 'To take'], a: 'Take' },
      { q: '___ panic, we have plenty of time.', opts: ['Don’t', 'Not', 'No'], a: 'Don’t' },
      { q: 'Let’s ___ outside and listen to the birds.', opts: ['sit', 'to sit', 'sitting'], a: 'sit' },
      { q: 'Let’s ___ argue about it.', opts: ['not', 'don’t', 'no'], a: 'not' },
      { q: 'Just ___ and enjoy the music.', opts: ['relax', 'relaxing', 'relaxes'], a: 'relax' },
      { q: 'Please ___ the window, it’s cold.', opts: ['close', 'closing', 'to close'], a: 'close' },
      { q: 'Don’t ___ up, you can do it!', opts: ['give', 'giving', 'gave'], a: 'give' },
      { q: '___ kind to animals.', opts: ['Be', 'Are', 'Being'], a: 'Be' },
    ],
    gapfill: [
      { q: 'A sparrow landed on the kitchen ___.', a: 'windowsill' },
      { q: 'Calm ___ and tell me what happened.', a: 'down' },
      { q: 'It’s Saturday, so let’s take it ___.', a: 'easy' },
      { q: 'The pig and the wolf had an ___ friendship.', a: 'unlikely' },
      { q: 'I get up at six, I’m an early ___.', a: 'bird' },
      { q: 'My sister and I get ___ really well.', a: 'along' },
      { q: 'The birds started to ___ at sunrise.', a: 'chirp' },
      { q: 'Before the test I felt a bit ___.', a: 'anxious' },
    ],
    listen: [
      { uk: 'Послухай вступ. Опиши ритм: швидкий, повільний, спокійний, нервовий?', ru: 'Послушай вступление. Опиши ритм: быстрый, медленный, спокойный, нервный?', en: 'Listen to the intro. Describe the rhythm: fast, slow, calm or nervous?' },
      { uk: 'Подивись кліп. Які тварини там є? Хто з них друзі, а хто спочатку вороги?', ru: 'Посмотри клип. Какие животные там есть? Кто из них друзья, а кто сначала враги?', en: 'Watch the video. Which animals are in it? Who are friends, and who are enemies at first?' },
      { uk: 'Знайди момент, коли Вовк і Порося вперше роблять щось разом. Що вони роблять?', ru: 'Найди момент, когда Волк и Поросёнок впервые делают что-то вместе. Что они делают?', en: 'Find the moment when the Wolf and the Pig do something together for the first time. What do they do?' },
      { uk: 'Покажи рукою, коли вступають жіночі голоси на задньому плані.', ru: 'Покажи рукой, когда вступают женские голоса на заднем плане.', en: 'Raise your hand when the women’s backing voices come in.' },
    ],
    speaking: [
      'What advice would you give a friend who is worried about a test?',
      'Can enemies really become friends? Give an example.',
      'What sounds help you relax: birds, rain, music or silence?',
      'Why do you think this song is often played to babies and small children?',
      'What do you know about Jamaica?',
      'Are you a laid-back person or do you worry a lot?',
    ],
    roleplay: {
      uk: 'A: твій друг дуже хвилюється перед виступом на шкільному концерті. B: ти підтримуєш друга і даєш поради, використовуючи наказовий спосіб: Relax, Take a deep breath, Don’t think about..., Let’s practise together. Потім поміняйтеся ролями.',
      ru: 'A: твой друг очень волнуется перед выступлением на школьном концерте. B: ты поддерживаешь друга и даёшь советы, используя повелительное наклонение: Relax, Take a deep breath, Don’t think about..., Let’s practise together. Потом поменяйтесь ролями.',
      en: 'A: your friend is very nervous before performing at the school concert. B: you support your friend and give advice using imperatives: Relax, Take a deep breath, Don’t think about..., Let’s practise together. Then swap roles.',
    },
    writing: {
      uk: 'Напиши коротку записку-підтримку (50-80 слів) другові, який переживає. Дай п’ять порад, використовуючи наказовий спосіб і Let’s. Закінчи теплою фразою.',
      ru: 'Напиши короткую записку-поддержку (50-80 слов) другу, который переживает. Дай пять советов, используя повелительное наклонение и Let’s. Закончи тёплой фразой.',
      en: 'Write a short support note (50-80 words) to a friend who is worried. Give five pieces of advice using imperatives and Let’s. End with a warm phrase.',
    },
  },

  'im-still-standing': {
    facts: [
      { uk: 'Пісня вийшла у 1983 році на альбомі Елтона Джона «Too Low for Zero».', ru: 'Песня вышла в 1983 году на альбоме Элтона Джона «Too Low for Zero».', en: 'The song came out in 1983 on Elton John’s album Too Low for Zero.' },
      { uk: 'Слова написав Берні Топін. Він і Елтон Джон працюють разом з 1967 року: Берні пише тексти, а Елтон музику. Це одне з найдовших творчих партнерств в історії поп-музики.', ru: 'Слова написал Берни Топин. Он и Элтон Джон работают вместе с 1967 года: Берни пишет тексты, а Элтон музыку. Это одно из самых долгих творческих партнёрств в истории поп-музыки.', en: 'The words were written by Bernie Taupin. He and Elton John have worked together since 1967: Bernie writes the words and Elton writes the music. It is one of the longest partnerships in pop history.' },
      { uk: 'Кліп зняв режисер Рассел Малкахі на набережній Круазетт у Каннах, на півдні Франції.', ru: 'Клип снял режиссёр Рассел Малкахи на набережной Круазетт в Каннах, на юге Франции.', en: 'The video was directed by Russell Mulcahy on the Croisette, the seafront in Cannes in the south of France.' },
      { uk: 'У мультфільмі «Співай» (2016) цю пісню виконує горила Джонні, якого озвучив Тарон Еджертон. Пізніше Еджертон зіграв самого Елтона Джона в біографічному фільмі «Рокетмен» (2019).', ru: 'В мультфильме «Зверопой» (2016) эту песню исполняет горилла Джонни, которого озвучил Тэрон Эджертон. Позже Эджертон сыграл самого Элтона Джона в биографическом фильме «Рокетмен» (2019).', en: 'In the animated film Sing (2016) the song is sung by Johnny the gorilla, voiced by Taron Egerton. Later Egerton played Elton John himself in the biopic Rocketman (2019).' },
      { uk: 'Справжнє ім’я Елтона Джона Реджинальд Двайт. Він народився в Англії у 1947 році, а у 1998 році отримав лицарський титул і звання «сер».', ru: 'Настоящее имя Элтона Джона Реджинальд Дуайт. Он родился в Англии в 1947 году, а в 1998 году получил рыцарский титул и звание «сэр».', en: 'Elton John’s real name is Reginald Dwight. He was born in England in 1947 and was knighted in 1998, so he is Sir Elton John.' },
    ],
    warmup: [
      'Have you seen the animated film Sing?',
      'What do you do when something goes wrong?',
      'Do you know any songs by Elton John?',
    ],
    vocab: [
      {
        group: { uk: 'Сила і стійкість', ru: 'Сила и стойкость', en: 'Strength and resilience' },
        items: [
          { en: 'strong', uk: 'сильний', ru: 'сильный', ex: 'You are stronger than you think.' },
          { en: 'resilient', uk: 'стійкий, який швидко відновлюється', ru: 'стойкий, быстро восстанавливающийся', ex: 'Children are often very resilient.' },
          { en: 'to survive', uk: 'вижити, вистояти', ru: 'выжить, выстоять', ex: 'These plants can survive a cold winter.' },
          { en: 'to give up', uk: 'здаватися, кидати', ru: 'сдаваться, бросать', ex: 'Never give up on your dreams.' },
          { en: 'to recover', uk: 'одужати, відновитися', ru: 'выздороветь, восстановиться', ex: 'He recovered quickly after the flu.' },
        ],
      },
      {
        group: { uk: 'Сцена і шоу', ru: 'Сцена и шоу', en: 'Stage and show' },
        items: [
          { en: 'a costume', uk: 'костюм (сценічний)', ru: 'костюм (сценический)', ex: 'The dancers wore bright costumes.' },
          { en: 'a performer', uk: 'артист, виконавець', ru: 'артист, исполнитель', ex: 'She is a great performer on stage.' },
          { en: 'flamboyant', uk: 'яскравий, ефектний', ru: 'яркий, эффектный', ex: 'He wears flamboyant glasses.' },
          { en: 'to perform', uk: 'виступати', ru: 'выступать', ex: 'Our band will perform at the festival.' },
          { en: 'an audience', uk: 'глядачі, публіка', ru: 'зрители, публика', ex: 'The audience stood up and clapped.' },
        ],
      },
      {
        group: { uk: 'Подорож на море', ru: 'Поездка на море', en: 'A trip to the seaside' },
        items: [
          { en: 'a seafront', uk: 'набережна', ru: 'набережная', ex: 'We walked along the seafront at sunset.' },
          { en: 'a palm tree', uk: 'пальма', ru: 'пальма', ex: 'There are palm trees along the road.' },
          { en: 'a yacht', uk: 'яхта', ru: 'яхта', ex: 'Big white yachts were in the harbour.' },
          { en: 'a resort', uk: 'курорт', ru: 'курорт', ex: 'Cannes is a famous resort in France.' },
          { en: 'to stroll', uk: 'прогулюватися', ru: 'прогуливаться', ex: 'We strolled along the beach after dinner.' },
        ],
      },
    ],
    grammar: {
      uk: 'Still показує, що щось триває досі, як і раніше: I still live in Kyiv. She is still at school. Still стоїть перед основним дієсловом, але після be: He still plays the piano. He is still happy. Any more (або anymore) показує, що щось уже не відбувається, і стоїть у кінці заперечного речення: I don’t play football any more. No longer означає те саме, але звучить формальніше і стоїть перед дієсловом: He no longer lives here. Не поєднуйте no longer із not: не кажіть He doesn’t no longer live here.',
      ru: 'Still показывает, что что-то продолжается до сих пор, как и раньше: I still live in Kyiv. She is still at school. Still стоит перед основным глаголом, но после be: He still plays the piano. He is still happy. Any more (или anymore) показывает, что что-то уже не происходит, и стоит в конце отрицательного предложения: I don’t play football any more. No longer значит то же самое, но звучит формальнее и стоит перед глаголом: He no longer lives here. Не сочетайте no longer с not: не говорите He doesn’t no longer live here.',
      en: 'Still shows that something continues, as before: I still live in Kyiv. She is still at school. Still goes before the main verb but after be: He still plays the piano. He is still happy. Any more (or anymore) shows that something has stopped and goes at the end of a negative sentence: I don’t play football any more. No longer means the same but sounds more formal and goes before the verb: He no longer lives here. Don’t use no longer with not: don’t say He doesn’t no longer live here.',
    },
    grammarEx: [
      { q: 'After all these years, Elton John is ___ performing.', opts: ['still', 'any more', 'no longer'], a: 'still' },
      { q: 'I don’t watch cartoons ___.', opts: ['any more', 'still', 'no longer'], a: 'any more' },
      { q: 'She ___ lives in London, she moved to Paris.', opts: ['no longer', 'still', 'any more'], a: 'no longer' },
      { q: 'Do you ___ play the guitar?', opts: ['still', 'any more', 'no longer'], a: 'still' },
      { q: 'He ___ angry, he has calmed down.', opts: ['isn’t', 'is still', 'still is'], a: 'isn’t' },
      { q: 'My grandpa ___ goes swimming every morning.', opts: ['still', 'still does', 'any more'], a: 'still' },
      { q: 'We don’t live there ___.', opts: ['anymore', 'still', 'no longer'], a: 'anymore' },
      { q: 'The shop is ___ open, let’s go in.', opts: ['still', 'no longer', 'any more'], a: 'still' },
    ],
    gapfill: [
      { q: 'She fell, but she picked herself ___ and finished the race.', a: 'up' },
      { q: 'Against all ___, the small team won the cup.', a: 'odds' },
      { q: 'Vinyl records have made a ___.', a: 'comeback' },
      { q: 'Don’t give ___, you are nearly there!', a: 'up' },
      { q: 'The dancers wore colourful ___.', a: 'costumes' },
      { q: 'We walked along the ___ and looked at the boats.', a: 'seafront' },
      { q: 'Keep your head ___, tomorrow will be better.', a: 'up' },
      { q: 'He doesn’t play tennis any ___.', a: 'more' },
    ],
    listen: [
      { uk: 'Послухай вступ. Який інструмент веде мелодію? Елтон Джон відомий саме ним.', ru: 'Послушай вступление. Какой инструмент ведёт мелодию? Элтон Джон известен именно им.', en: 'Listen to the intro. Which instrument leads the melody? Elton John is famous for playing it.' },
      { uk: 'Подивись кліп. Назви п’ять кольорів, які ти бачиш у костюмах.', ru: 'Посмотри клип. Назови пять цветов, которые ты видишь в костюмах.', en: 'Watch the video. Name five colours you can see in the costumes.' },
      { uk: 'Де зняли кліп: у горах, у місті біля моря чи в лісі? Які деталі тобі це підказали?', ru: 'Где сняли клип: в горах, в городе у моря или в лесу? Какие детали тебе это подсказали?', en: 'Where was the video filmed: in the mountains, in a town by the sea or in a forest? Which details tell you?' },
      { uk: 'Порахуй, скільки разів звучить назва пісні.', ru: 'Посчитай, сколько раз звучит название песни.', en: 'Count how many times you hear the title.' },
    ],
    speaking: [
      'What do you still do that you did when you were little?',
      'What don’t you do any more?',
      'Who is the most resilient person you know? Why?',
      'Why do you think this song works so well in the film Sing?',
      'Is it good to wear bright, unusual clothes on stage? Why?',
      'Tell us about a comeback in sport or music that you remember.',
    ],
    roleplay: {
      uk: 'A: ти журналіст і береш інтерв’ю у відомого співака, який повертається на сцену після довгої перерви. B: співак розповідає, що змінилося, а що ні. Використовуйте still, any more, no longer.',
      ru: 'A: ты журналист и берёшь интервью у известного певца, который возвращается на сцену после долгого перерыва. B: певец рассказывает, что изменилось, а что нет. Используйте still, any more, no longer.',
      en: 'A: you are a journalist interviewing a famous singer who is returning to the stage after a long break. B: the singer explains what has changed and what hasn’t. Use still, any more and no longer.',
    },
    writing: {
      uk: 'Напиши короткий текст (70-100 слів) «Тоді й тепер». Порівняй себе зараз і п’ять років тому. Що ти досі робиш, а що вже ні? Використай still, any more і no longer щонайменше по одному разу.',
      ru: 'Напиши короткий текст (70-100 слов) «Тогда и сейчас». Сравни себя сейчас и пять лет назад. Что ты до сих пор делаешь, а что уже нет? Используй still, any more и no longer хотя бы по одному разу.',
      en: 'Write a short text (70-100 words) called Then and now. Compare yourself now and five years ago. What do you still do, and what don’t you do any more? Use still, any more and no longer at least once each.',
    },
  },

  'i-wanna-dance-with-somebody': {
    facts: [
      { uk: 'Пісня вийшла у травні 1987 року як перший сингл другого альбому Вітні Г’юстон «Whitney».', ru: 'Песня вышла в мае 1987 года как первый сингл второго альбома Уитни Хьюстон «Whitney».', en: 'The song came out in May 1987 as the first single from Whitney Houston’s second album, Whitney.' },
      { uk: 'Вона очолила американський чарт Billboard Hot 100, а у 1988 році принесла Вітні «Греммі» за найкраще жіноче вокальне поп-виконання.', ru: 'Она возглавила американский чарт Billboard Hot 100, а в 1988 году принесла Уитни «Грэмми» за лучшее женское вокальное поп-исполнение.', en: 'It went to No. 1 on the Billboard Hot 100, and in 1988 it won Whitney the Grammy for Best Female Pop Vocal Performance.' },
      { uk: 'Пісню написали Джордж Меррілл і Шеннон Рубікам з дуету Boy Meets Girl.', ru: 'Песню написали Джордж Меррилл и Шеннон Рубикам из дуэта Boy Meets Girl.', en: 'The song was written by George Merrill and Shannon Rubicam of the duo Boy Meets Girl.' },
      { uk: 'Альбом «Whitney» став першим альбомом жінки-виконавиці, який одразу дебютував на першому місці американського чарту Billboard 200.', ru: 'Альбом «Whitney» стал первым альбомом женщины-исполнительницы, который сразу дебютировал на первом месте американского чарта Billboard 200.', en: 'Whitney was the first album by a female artist to debut at No. 1 on the US Billboard 200.' },
      { uk: 'Вітні Г’юстон мала сім синглів поспіль на першому місці в США, це рекорд. Біографічний фільм про неї 2022 року назвали так само, як цю пісню.', ru: 'У Уитни Хьюстон было семь синглов подряд на первом месте в США, это рекорд. Биографический фильм о ней 2022 года назвали так же, как эту песню.', en: 'Whitney Houston had seven US No. 1 singles in a row, a record. The 2022 film about her life has the same name as this song.' },
    ],
    warmup: [
      'Do you prefer to dance alone, with a partner or in a group?',
      'What do you know about music from the 1980s?',
      'Who is the best singer you have ever heard live?',
    ],
    vocab: [
      {
        group: { uk: 'Почуття і стосунки', ru: 'Чувства и отношения', en: 'Feelings and relationships' },
        items: [
          { en: 'lonely', uk: 'самотній', ru: 'одинокий', ex: 'The old man felt lonely after his friends moved away.' },
          { en: 'to long for', uk: 'прагнути, тужити за', ru: 'стремиться, тосковать по', ex: 'In winter I long for summer.' },
          { en: 'to care about', uk: 'дбати про, перейматися', ru: 'заботиться о, переживать за', ex: 'She really cares about her friends.' },
          { en: 'a soulmate', uk: 'споріднена душа', ru: 'родственная душа', ex: 'They say they are soulmates.' },
          { en: 'affection', uk: 'прихильність, ніжність', ru: 'привязанность, нежность', ex: 'The dog shows affection by wagging its tail.' },
        ],
      },
      {
        group: { uk: 'Вечір і танці', ru: 'Вечер и танцы', en: 'Evening and dancing' },
        items: [
          { en: 'a beat', uk: 'ритм, біт', ru: 'ритм, бит', ex: 'I love the beat of this song.' },
          { en: 'to twirl', uk: 'крутитися, кружляти', ru: 'кружиться, вертеться', ex: 'The little girl twirled in her new dress.' },
          { en: 'to clap along', uk: 'плескати в такт', ru: 'хлопать в такт', ex: 'The audience clapped along to the music.' },
          { en: 'a spotlight', uk: 'прожектор; центр уваги', ru: 'прожектор; центр внимания', ex: 'She stood in the spotlight and smiled.' },
          { en: 'catchy', uk: 'запальний, такий, що легко запам’ятовується', ru: 'цепляющий, легко запоминающийся', ex: 'The chorus is really catchy.' },
        ],
      },
      {
        group: { uk: 'Голос і талант', ru: 'Голос и талант', en: 'Voice and talent' },
        items: [
          { en: 'powerful', uk: 'потужний, сильний', ru: 'мощный, сильный', ex: 'She has a powerful voice.' },
          { en: 'a range', uk: 'діапазон (голосу)', ru: 'диапазон (голоса)', ex: 'Her vocal range is amazing.' },
          { en: 'to belt out', uk: 'співати на повний голос', ru: 'петь во весь голос', ex: 'We belted out our favourite song in the car.' },
          { en: 'gifted', uk: 'обдарований', ru: 'одарённый', ex: 'He is a gifted young pianist.' },
          { en: 'a record', uk: 'рекорд; платівка', ru: 'рекорд; пластинка', ex: 'She broke the record for the most No. 1 songs.' },
        ],
      },
    ],
    grammar: {
      uk: 'У розмовній англійській, піснях і повідомленнях часто трапляються скорочення. Wanna = want to: I wanna go = I want to go. Gonna = going to: I’m gonna call you = I’m going to call you. Gotta = have got to: I gotta go = I have got to go. Їх кажуть усно, але в есе, листах і на іспитах пишуть повну форму. Wanna не вживають після he/she: правильно she wants to, а не she wanna. Ще повторимо займенники: somebody (хтось, у ствердженнях), anybody (хтось/будь-хто, у питаннях і запереченнях), nobody (ніхто), everybody (всі). Is anybody there? Nobody knows. Everybody loves this song.',
      ru: 'В разговорном английском, песнях и сообщениях часто встречаются сокращения. Wanna = want to: I wanna go = I want to go. Gonna = going to: I’m gonna call you = I’m going to call you. Gotta = have got to: I gotta go = I have got to go. Их говорят устно, но в эссе, письмах и на экзаменах пишут полную форму. Wanna не используют после he/she: правильно she wants to, а не she wanna. Ещё повторим местоимения: somebody (кто-то, в утверждениях), anybody (кто-нибудь/кто угодно, в вопросах и отрицаниях), nobody (никто), everybody (все). Is anybody there? Nobody knows. Everybody loves this song.',
      en: 'In spoken English, songs and messages you often see short forms. Wanna = want to: I wanna go = I want to go. Gonna = going to: I’m gonna call you = I’m going to call you. Gotta = have got to: I gotta go = I have got to go. People say them, but in essays, letters and exams write the full form. Don’t use wanna after he or she: say she wants to, not she wanna. Let’s also revise somebody (in positive sentences), anybody (in questions and negatives), nobody and everybody. Is anybody there? Nobody knows. Everybody loves this song.',
    },
    grammarEx: [
      { q: 'I wanna dance = I ___ dance.', opts: ['want to', 'going to', 'have to'], a: 'want to' },
      { q: 'We’re gonna be late = We’re ___ be late.', opts: ['going to', 'want to', 'got to'], a: 'going to' },
      { q: 'I gotta go = I have ___ go.', opts: ['got to', 'going to', 'want to'], a: 'got to' },
      { q: 'She ___ to learn the guitar.', opts: ['wants', 'wanna', 'want'], a: 'wants' },
      { q: 'Is ___ coming to the party?', opts: ['anybody', 'nobody', 'somebody else'], a: 'anybody' },
      { q: '___ knocked on the door, but I didn’t see who.', opts: ['Somebody', 'Anybody', 'Nobody'], a: 'Somebody' },
      { q: '___ in my class loves this song, all thirty of us!', opts: ['Everybody', 'Nobody', 'Anybody'], a: 'Everybody' },
      { q: 'I called, but ___ answered.', opts: ['nobody', 'anybody', 'everybody'], a: 'nobody' },
    ],
    gapfill: [
      { q: 'I’d love to dance, but I have two left ___.', a: 'feet' },
      { q: 'Her smile lights ___ the room.', a: 'up' },
      { q: 'He felt ___ in the new city with no friends.', a: 'lonely' },
      { q: 'This song is so ___, I can’t stop singing it.', a: 'catchy' },
      { q: 'Whitney Houston had a very ___ voice.', a: 'powerful' },
      { q: 'The town comes ___ on summer evenings.', a: 'alive' },
      { q: 'The audience clapped ___ to the music.', a: 'along' },
      { q: 'We belted ___ the song in the car.', a: 'out' },
    ],
    listen: [
      { uk: 'Послухай вступ. Які звуки ти чуєш: електронні барабани, синтезатор, гітару? Чому це звучить як 80-ті?', ru: 'Послушай вступление. Какие звуки ты слышишь: электронные барабаны, синтезатор, гитару? Почему это звучит как 80-е?', en: 'Listen to the intro. Which sounds do you hear: electronic drums, a synthesizer, a guitar? Why does it sound like the 80s?' },
      { uk: 'Подивись кліп. Опиши зачіску й одяг Вітні.', ru: 'Посмотри клип. Опиши причёску и одежду Уитни.', en: 'Watch the video. Describe Whitney’s hair and clothes.' },
      { uk: 'Знайди момент, де голос Вітні звучить найпотужніше. Підніми руку.', ru: 'Найди момент, где голос Уитни звучит мощнее всего. Подними руку.', en: 'Find the moment when Whitney’s voice is at its most powerful. Raise your hand.' },
      { uk: 'Музика весела, а настрій тексту, на твою думку, такий самий чи трохи інший? Чому ти так думаєш?', ru: 'Музыка весёлая, а настроение текста, по-твоему, такое же или немного другое? Почему ты так думаешь?', en: 'The music is happy. Do you think the feeling behind the words is the same or a little different? Why?' },
    ],
    speaking: [
      'Can a happy song have a sad message? Give an example.',
      'Do you ever feel lonely in a crowd? What helps?',
      'Who in your family is the best dancer?',
      'Why do you think so many films and series use 80s songs?',
      'Is it OK to use wanna and gonna in messages to friends? What about emails to teachers?',
      'What makes a voice powerful?',
    ],
    roleplay: {
      uk: 'A: ти запрошуєш друга на шкільну дискотеку в стилі 80-х. B: друг каже, що зовсім не вміє танцювати. Переконуйте одне одного, використовуючи wanna, gonna (усно) і somebody, nobody, everybody.',
      ru: 'A: ты приглашаешь друга на школьную дискотеку в стиле 80-х. B: друг говорит, что совсем не умеет танцевать. Убеждайте друг друга, используя wanna, gonna (устно) и somebody, nobody, everybody.',
      en: 'A: you invite a friend to an 80s school disco. B: your friend says they can’t dance at all. Try to persuade each other using wanna, gonna (in speech) and somebody, nobody, everybody.',
    },
    writing: {
      uk: 'Напиши два повідомлення (по 40-60 слів) з однією новиною: перше другові в чаті з wanna, gonna, gotta, друге вчителю в офіційному листі з повними формами want to, going to, have got to.',
      ru: 'Напиши два сообщения (по 40-60 слов) с одной новостью: первое другу в чате с wanna, gonna, gotta, второе учителю в официальном письме с полными формами want to, going to, have got to.',
      en: 'Write two messages (40-60 words each) with the same news: one to a friend in a chat using wanna, gonna and gotta, and one to a teacher in a formal email using the full forms want to, going to and have got to.',
    },
  },

  'take-on-me': {
    facts: [
      { uk: 'a-ha це гурт із Норвегії: співак Мортен Гаркет, клавішник Магне Фуругольмен і гітарист Пол Воктор-Савой.', ru: 'a-ha это группа из Норвегии: певец Мортен Харкет, клавишник Магне Фурухольмен и гитарист Пол Воктор-Савой.', en: 'a-ha is a band from Norway: singer Morten Harket, keyboard player Magne Furuholmen and guitarist Paul Waaktaar-Savoy.' },
      { uk: 'Перша версія пісні 1984 року майже не мала успіху. Гурт перезаписав її з продюсером Аланом Тарні, а у 1985 році зняв новий кліп, і тоді пісня стала світовим хітом.', ru: 'Первая версия песни 1984 года почти не имела успеха. Группа перезаписала её с продюсером Аланом Тарни, а в 1985 году сняла новый клип, и тогда песня стала мировым хитом.', en: 'The first version from 1984 was not a success. The band re-recorded it with producer Alan Tarney and made a new video in 1985, and then the song became a world hit.' },
      { uk: 'Кліп зняв режисер Стів Беррон. Художники Майкл Паттерсон і Кендіс Рекінджер намалювали тисячі кадрів олівцем поверх відео: така техніка називається ротоскопія.', ru: 'Клип снял режиссёр Стив Бэррон. Художники Майкл Паттерсон и Кэндис Рекинджер нарисовали тысячи кадров карандашом поверх видео: такая техника называется ротоскопия.', en: 'The video was directed by Steve Barron. Artists Michael Patterson and Candace Reckinger drew thousands of pencil frames over real film, a technique called rotoscoping.' },
      { uk: 'У жовтні 1985 року пісня очолила американський чарт Billboard Hot 100, а на церемонії MTV Video Music Awards 1986 року кліп отримав шість нагород.', ru: 'В октябре 1985 года песня возглавила американский чарт Billboard Hot 100, а на церемонии MTV Video Music Awards 1986 года клип получил шесть наград.', en: 'In October 1985 the song reached No. 1 on the Billboard Hot 100, and the video won six awards at the 1986 MTV Video Music Awards.' },
      { uk: 'У 2020 році кліп набрав мільярд переглядів на YouTube. Це одне з перших відео 1980-х, яке досягло такої цифри.', ru: 'В 2020 году клип набрал миллиард просмотров на YouTube. Это одно из первых видео 1980-х, достигших такой цифры.', en: 'In 2020 the video passed one billion views on YouTube, one of the first 1980s videos to do so.' },
    ],
    warmup: [
      'Do you like comics? Which ones?',
      'Have you ever tried something a second or third time and finally succeeded?',
      'What do you know about Norway?',
    ],
    vocab: [
      {
        group: { uk: 'Комікси й анімація', ru: 'Комиксы и анимация', en: 'Comics and animation' },
        items: [
          { en: 'a comic', uk: 'комікс', ru: 'комикс', ex: 'He reads a comic every evening.' },
          { en: 'a sketch', uk: 'ескіз, начерк', ru: 'эскиз, набросок', ex: 'She made a quick sketch of the cat.' },
          { en: 'a frame', uk: 'кадр', ru: 'кадр', ex: 'A cartoon has many frames every second.' },
          { en: 'to draw', uk: 'малювати', ru: 'рисовать', ex: 'My brother loves to draw superheroes.' },
          { en: 'black and white', uk: 'чорно-білий', ru: 'чёрно-белый', ex: 'Grandma has old black and white photos.' },
        ],
      },
      {
        group: { uk: 'Сміливість і спроби', ru: 'Смелость и попытки', en: 'Courage and trying' },
        items: [
          { en: 'to dare', uk: 'наважуватися', ru: 'осмеливаться', ex: 'I didn’t dare to ask her name.' },
          { en: 'shy', uk: 'сором’язливий', ru: 'застенчивый', ex: 'He is shy with new people.' },
          { en: 'an attempt', uk: 'спроба', ru: 'попытка', ex: 'She passed the test on her second attempt.' },
          { en: 'to succeed', uk: 'досягти успіху', ru: 'добиться успеха', ex: 'If you practise, you will succeed.' },
          { en: 'to take a risk', uk: 'ризикнути', ru: 'рискнуть', ex: 'Sometimes you have to take a risk.' },
        ],
      },
      {
        group: { uk: 'Звучання 80-х', ru: 'Звучание 80-х', en: 'The sound of the 80s' },
        items: [
          { en: 'a synthesizer', uk: 'синтезатор', ru: 'синтезатор', ex: 'The song starts with a bright synthesizer.' },
          { en: 'a riff', uk: 'риф, коротка музична фраза, що повторюється', ru: 'рифф, короткая повторяющаяся музыкальная фраза', ex: 'Everyone knows that keyboard riff.' },
          { en: 'falsetto', uk: 'фальцет', ru: 'фальцет', ex: 'He sings the high part in falsetto.' },
          { en: 'to re-record', uk: 'перезаписати', ru: 'перезаписать', ex: 'The band re-recorded the song for the film.' },
          { en: 'a hit', uk: 'хіт', ru: 'хит', ex: 'The song was a hit all over the world.' },
        ],
      },
    ],
    grammar: {
      uk: 'Take утворює багато фразових дієслів. Take on: взяти на себе (завдання, відповідальність): She took on a new project. Take off: злетіти (про літак) або зняти одяг: The plane took off. Take off your shoes. Take up: почати нове хобі: I took up yoga last year. Take after: бути схожим на старшого родича: He takes after his dad. Take care of: піклуватися: I take care of my little sister. Порада: вчіть фразові дієслова з прикладами, а не поодинці, бо значення часто зовсім не таке, як у take.',
      ru: 'Take образует много фразовых глаголов. Take on: взять на себя (задачу, ответственность): She took on a new project. Take off: взлететь (о самолёте) или снять одежду: The plane took off. Take off your shoes. Take up: начать новое хобби: I took up yoga last year. Take after: быть похожим на старшего родственника: He takes after his dad. Take care of: заботиться: I take care of my little sister. Совет: учите фразовые глаголы с примерами, а не по отдельности, потому что значение часто совсем не такое, как у take.',
      en: 'Take makes many phrasal verbs. Take on: accept a task or responsibility: She took on a new project. Take off: leave the ground (a plane) or remove clothes: The plane took off. Take off your shoes. Take up: start a new hobby: I took up yoga last year. Take after: look or behave like an older relative: He takes after his dad. Take care of: look after: I take care of my little sister. Tip: learn phrasal verbs with examples, not alone, because the meaning is often very different from take.',
    },
    grammarEx: [
      { q: 'Our plane took ___ at seven o’clock.', opts: ['off', 'on', 'after'], a: 'off' },
      { q: 'She takes ___ her mum, they both love music.', opts: ['after', 'up', 'off'], a: 'after' },
      { q: 'I took ___ drawing comics last summer.', opts: ['up', 'on', 'after'], a: 'up' },
      { q: 'He took ___ the job of team captain.', opts: ['on', 'off', 'up'], a: 'on' },
      { q: 'Please take ___ your boots in the hall.', opts: ['off', 'up', 'after'], a: 'off' },
      { q: 'Who takes care ___ your dog when you travel?', opts: ['of', 'for', 'about'], a: 'of' },
      { q: 'Don’t take ___ too much work, you need rest.', opts: ['on', 'after', 'off'], a: 'on' },
      { q: 'My brother has taken ___ the guitar.', opts: ['up', 'after', 'off'], a: 'up' },
    ],
    gapfill: [
      { q: 'I’ve never surfed, but I’ll give it a ___.', a: 'shot' },
      { q: 'She took a ___ and asked him to dance.', a: 'chance' },
      { q: 'I failed twice, but third time ___!', a: 'lucky' },
      { q: 'The artist made a pencil ___ of my face.', a: 'sketch' },
      { q: 'He passed his driving test on the third ___.', a: 'attempt' },
      { q: 'The song starts with a famous keyboard ___.', a: 'riff' },
      { q: 'The singer can hit a very high ___.', a: 'note' },
      { q: 'He is too ___ to speak to new people.', a: 'shy' },
    ],
    listen: [
      { uk: 'Послухай вступ. Який інструмент грає відому мелодію: гітара, синтезатор чи скрипка?', ru: 'Послушай вступление. Какой инструмент играет знаменитую мелодию: гитара, синтезатор или скрипка?', en: 'Listen to the intro. Which instrument plays the famous tune: a guitar, a synthesizer or a violin?' },
      { uk: 'Знайди момент, де співак бере дуже високу ноту. Підніми руку.', ru: 'Найди момент, где певец берёт очень высокую ноту. Подними руку.', en: 'Find the moment when the singer hits a very high note. Raise your hand.' },
      { uk: 'Подивись кліп. Що робить дівчина на початку? Як вона потрапляє в комікс?', ru: 'Посмотри клип. Что делает девушка в начале? Как она попадает в комикс?', en: 'Watch the video. What is the girl doing at the beginning? How does she get into the comic?' },
      { uk: 'Які частини кліпу намальовані, а які зняті як звичайне відео? Опиши різницю.', ru: 'Какие части клипа нарисованы, а какие сняты как обычное видео? Опиши разницу.', en: 'Which parts of the video are drawn and which are filmed normally? Describe the difference.' },
    ],
    speaking: [
      'What new hobby would you like to take up?',
      'Who do you take after in your family?',
      'Would you like to live inside a comic or a game for one day? Which one?',
      'Why do you think a-ha did not give up after the first version failed?',
      'Is it easy for you to take a chance on something new?',
      'Why are some old videos still popular on YouTube today?',
    ],
    roleplay: {
      uk: 'A: ти герой коміксу, який запрошує людину зі звичайного світу у свій намальований світ. B: людина вагається, бо їй страшно. A переконує B, B ставить питання. Використайте take a chance, give it a shot і фразові дієслова з take.',
      ru: 'A: ты герой комикса, который приглашает человека из обычного мира в свой нарисованный мир. B: человек колеблется, потому что ему страшно. A убеждает B, B задаёт вопросы. Используйте take a chance, give it a shot и фразовые глаголы с take.',
      en: 'A: you are a comic hero inviting a person from the real world into your drawn world. B: the person is unsure and a little scared. A persuades B, and B asks questions. Use take a chance, give it a shot and phrasal verbs with take.',
    },
    writing: {
      uk: 'Напиши коротку історію (80-110 слів) про людину, яка потрапила в комікс або мультфільм. Що вона там побачила і як повернулася додому? Використай щонайменше три фразові дієслова з take.',
      ru: 'Напиши короткую историю (80-110 слов) о человеке, который попал в комикс или мультфильм. Что он там увидел и как вернулся домой? Используй как минимум три фразовых глагола с take.',
      en: 'Write a short story (80-110 words) about a person who ends up inside a comic or a cartoon. What do they see there, and how do they get home? Use at least three phrasal verbs with take.',
    },
  },

  'africa': {
    facts: [
      { uk: 'Пісня вийшла у 1982 році на альбомі Toto «Toto IV». У лютому 1983 року вона очолила американський чарт Billboard Hot 100.', ru: 'Песня вышла в 1982 году на альбоме Toto «Toto IV». В феврале 1983 года она возглавила американский чарт Billboard Hot 100.', en: 'The song came out in 1982 on Toto’s album Toto IV. In February 1983 it reached No. 1 on the Billboard Hot 100.' },
      { uk: 'Пісню написали клавішник Девід Пейч і барабанщик Джефф Поркаро. Пейч розповідав, що на той час ще не бував в Африці й надихався документальними фільмами про неї.', ru: 'Песню написали клавишник Дэвид Пейч и барабанщик Джефф Поркаро. Пейч рассказывал, что в то время ещё не бывал в Африке и вдохновлялся документальными фильмами о ней.', en: 'It was written by keyboard player David Paich and drummer Jeff Porcaro. Paich said he had not been to Africa at the time and was inspired by documentaries about it.' },
      { uk: 'Альбом «Toto IV» отримав «Греммі» як «Альбом року».', ru: 'Альбом «Toto IV» получил «Грэмми» как «Альбом года».', en: 'The album Toto IV won the Grammy for Album of the Year.' },
      { uk: 'У 2018 році фанатка в соцмережах попросила гурт Weezer записати кавер на «Africa». Гурт погодився, і пісня знову потрапила в чарти, вже з новим поколінням слухачів.', ru: 'В 2018 году фанатка в соцсетях попросила группу Weezer записать кавер на «Africa». Группа согласилась, и песня снова попала в чарты, уже с новым поколением слушателей.', en: 'In 2018 a fan on social media asked the band Weezer to cover Africa. They did, and the song entered the charts again with a new generation of listeners.' },
      { uk: 'У 2019 році художник Макс Зідентопф поставив у пустелі Наміб колонки на сонячних батареях, які грають «Africa» нон-стоп. Точне місце він тримає в секреті.', ru: 'В 2019 году художник Макс Зидентопф установил в пустыне Намиб колонки на солнечных батареях, которые играют «Africa» нон-стоп. Точное место он держит в секрете.', en: 'In 2019 artist Max Siedentopf put solar-powered speakers in the Namib Desert that play Africa non-stop. He keeps the exact place a secret.' },
    ],
    warmup: [
      'What do you know about Africa? Name three countries.',
      'Would you like to travel very far from home? Where?',
      'What songs from the 80s do your parents like?',
    ],
    vocab: [
      {
        group: { uk: 'Подорожі й мрії', ru: 'Путешествия и мечты', en: 'Travel and dreams' },
        items: [
          { en: 'a journey', uk: 'подорож, поїздка', ru: 'путешествие, поездка', ex: 'The journey by train took ten hours.' },
          { en: 'abroad', uk: 'за кордоном, за кордон', ru: 'за границей, за границу', ex: 'She wants to study abroad.' },
          { en: 'faraway', uk: 'далекий', ru: 'далёкий', ex: 'He dreams of faraway islands.' },
          { en: 'to explore', uk: 'досліджувати', ru: 'исследовать', ex: 'We explored the old town on foot.' },
          { en: 'to set off', uk: 'вирушати', ru: 'отправляться', ex: 'We set off early in the morning.' },
        ],
      },
      {
        group: { uk: 'Природа Африки', ru: 'Природа Африки', en: 'African nature' },
        items: [
          { en: 'a savannah', uk: 'савана', ru: 'саванна', ex: 'Lions and zebras live on the savannah.' },
          { en: 'a desert', uk: 'пустеля', ru: 'пустыня', ex: 'The Sahara is the largest hot desert in the world.' },
          { en: 'wildlife', uk: 'дика природа, дикі тварини', ru: 'дикая природа, дикие животные', ex: 'We saw amazing wildlife on our safari.' },
          { en: 'a safari', uk: 'сафарі', ru: 'сафари', ex: 'My dream is to go on a safari.' },
          { en: 'a herd', uk: 'стадо, табун', ru: 'стадо, табун', ex: 'A herd of elephants crossed the river.' },
        ],
      },
      {
        group: { uk: 'Інтернет і популярність', ru: 'Интернет и популярность', en: 'The internet and fame' },
        items: [
          { en: 'a meme', uk: 'мем', ru: 'мем', ex: 'That meme is everywhere this week.' },
          { en: 'a cover', uk: 'кавер-версія', ru: 'кавер-версия', ex: 'I prefer the cover to the original.' },
          { en: 'a fan', uk: 'шанувальник, фанат', ru: 'поклонник, фанат', ex: 'He is a big fan of old rock music.' },
          { en: 'to rediscover', uk: 'заново відкрити', ru: 'заново открыть', ex: 'Teenagers rediscovered the song online.' },
          { en: 'iconic', uk: 'культовий, знаковий', ru: 'культовый, знаковый', ex: 'It is one of the most iconic songs of the 80s.' },
        ],
      },
    ],
    grammar: {
      uk: 'Present perfect (have/has + V3) говорить про досвід у житті, коли час неважливий або невідомий: Have you ever been to Africa? I have never seen a lion. She has travelled a lot. Past simple говорить про конкретний момент у минулому: I went to Egypt in 2021. We saw giraffes last summer. Типова розмова: Have you ever been to Kenya? Yes, I have. When did you go? I went there two years ago. Слова ever, never, already, yet часто йдуть із present perfect, а yesterday, last year, in 2020, ago тільки з past simple.',
      ru: 'Present perfect (have/has + V3) говорит об опыте в жизни, когда время неважно или неизвестно: Have you ever been to Africa? I have never seen a lion. She has travelled a lot. Past simple говорит о конкретном моменте в прошлом: I went to Egypt in 2021. We saw giraffes last summer. Типичный разговор: Have you ever been to Kenya? Yes, I have. When did you go? I went there two years ago. Слова ever, never, already, yet часто идут с present perfect, а yesterday, last year, in 2020, ago только с past simple.',
      en: 'The present perfect (have/has + past participle) talks about life experience when the time is not important or not known: Have you ever been to Africa? I have never seen a lion. She has travelled a lot. The past simple talks about a specific time in the past: I went to Egypt in 2021. We saw giraffes last summer. A typical conversation: Have you ever been to Kenya? Yes, I have. When did you go? I went there two years ago. Ever, never, already and yet often go with the present perfect, while yesterday, last year, in 2020 and ago go only with the past simple.',
    },
    grammarEx: [
      { q: 'Have you ever ___ to Africa?', opts: ['been', 'went', 'go'], a: 'been' },
      { q: 'I ___ to Morocco in 2022.', opts: ['went', 'have gone', 'have been'], a: 'went' },
      { q: 'She has ___ seen an elephant in real life.', opts: ['never', 'ago', 'yesterday'], a: 'never' },
      { q: 'We ___ a safari last summer.', opts: ['did', 'have done', 'has done'], a: 'did' },
      { q: '___ you ever tried African food?', opts: ['Have', 'Did', 'Are'], a: 'Have' },
      { q: 'They visited Kenya two years ___.', opts: ['ago', 'ever', 'yet'], a: 'ago' },
      { q: 'My dad ___ to many countries.', opts: ['has travelled', 'travelled yesterday', 'have travelled'], a: 'has travelled' },
      { q: 'When ___ you see the cover version?', opts: ['did', 'have', 'has'], a: 'did' },
    ],
    gapfill: [
      { q: 'Watching travel videos gives me ___.', a: 'wanderlust' },
      { q: 'After a year at home, I had itchy ___.', a: 'feet' },
      { q: 'The hotel was in the middle of ___.', a: 'nowhere' },
      { q: 'A ___ of zebras ran across the savannah.', a: 'herd' },
      { q: 'This tune is a real ___, I hum it all day.', a: 'earworm' },
      { q: 'We set ___ at five in the morning.', a: 'off' },
      { q: 'The band Weezer recorded a ___ of the song.', a: 'cover' },
      { q: 'He wants to study ___ next year.', a: 'abroad' },
    ],
    listen: [
      { uk: 'Послухай вступ. Які звуки нагадують тобі природу або дощ?', ru: 'Послушай вступление. Какие звуки напоминают тебе природу или дождь?', en: 'Listen to the intro. Which sounds remind you of nature or rain?' },
      { uk: 'Подивись кліп. Де відбувається дія? Що шукає головний герой?', ru: 'Посмотри клип. Где происходит действие? Что ищет главный герой?', en: 'Watch the video. Where does it take place? What is the main character looking for?' },
      { uk: 'Порахуй, скільки музикантів ти бачиш у кліпі.', ru: 'Посчитай, сколько музыкантов ты видишь в клипе.', en: 'Count how many musicians you can see in the video.' },
      { uk: 'Знайди частину пісні, яку хочеться співати хором. Чому, на твою думку, вона так подобається людям?', ru: 'Найди часть песни, которую хочется петь хором. Почему, по-твоему, она так нравится людям?', en: 'Find the part of the song that makes you want to sing along. Why do you think people love it so much?' },
    ],
    speaking: [
      'Have you ever been somewhere very far from home? Tell us about it.',
      'Is it possible to write a good song about a place you have never visited?',
      'Why do you think this song became popular again on the internet?',
      'Would you choose an adventure abroad or a quiet life at home?',
      'Which African country would you like to visit and why?',
      'What do you think about the art installation in the desert: fun or silly?',
    ],
    roleplay: {
      uk: 'A: ти мандрівник, який щойно повернувся з подорожі Африкою. B: друг, який ніколи там не був і має багато питань. Використовуйте present perfect для досвіду (Have you ever...?) і past simple для подробиць (When did you...? What did you see?).',
      ru: 'A: ты путешественник, который только что вернулся из поездки по Африке. B: друг, который никогда там не был и у которого много вопросов. Используйте present perfect для опыта (Have you ever...?) и past simple для подробностей (When did you...? What did you see?).',
      en: 'A: you are a traveller who has just come back from a trip around Africa. B: you are a friend who has never been there and has lots of questions. Use the present perfect for experience (Have you ever...?) and the past simple for details (When did you...? What did you see?).',
    },
    writing: {
      uk: 'Напиши короткий текст (80-110 слів) «Моя подорож мрії». Розкажи, де ти вже був(ла) (present perfect), одну поїздку в подробицях (past simple) і куди мрієш поїхати.',
      ru: 'Напиши короткий текст (80-110 слов) «Моё путешествие мечты». Расскажи, где ты уже был(а) (present perfect), одну поездку подробно (past simple) и куда мечтаешь поехать.',
      en: 'Write a short text (80-110 words) called My dream journey. Say where you have already been (present perfect), describe one trip in detail (past simple) and say where you dream of going.',
    },
  },
};

export const DEEP_G: Record<string, SongDeep> = {
  'here-comes-the-sun': {
    intro: {
      uk: 'Ця пісня про момент, коли після довгої зими нарешті виходить сонце, і разом із ним повертається надія. Тому вона чудово підходить, щоб навчитися говорити англійською про погоду, пори року й оптимізм. Нижче зібрано живі вирази, якими носії мови описують сонячні дні й кращі часи. Усі приклади наші власні.',
      ru: 'Эта песня о моменте, когда после долгой зимы наконец выходит солнце, а вместе с ним возвращается надежда. Поэтому она отлично подходит, чтобы научиться говорить по-английски о погоде, временах года и оптимизме. Ниже собраны живые выражения, которыми носители языка описывают солнечные дни и лучшие времена. Все примеры наши собственные.',
      en: 'This song is about the moment when the sun finally comes out after a long winter and hope comes back with it. That makes it perfect for learning to talk in English about weather, seasons and optimism. Below are lively expressions native speakers use about sunny days and better times. All the examples are our own.',
    },
    phrases: [
      {
        en: 'a ray of sunshine',
        m: { uk: 'промінчик сонця, людина, що дарує радість', ru: 'лучик солнца, человек, который дарит радость', en: 'a person or thing that makes others happy' },
        story: {
          uk: 'Ray означає промінь. Так кажуть про людину, з якою навіть похмурий день стає світлішим. Часто так говорять про дітей, друзів або колег із гарним настроєм.',
          ru: 'Ray значит луч. Так говорят о человеке, с которым даже пасмурный день становится светлее. Часто так говорят о детях, друзьях или коллегах с хорошим настроением.',
          en: 'A ray is a line of light. We use the phrase for a person who makes even a grey day brighter. People often say it about children, friends or cheerful colleagues.',
        },
        ex: ['Our new neighbour is a ray of sunshine, she always smiles.', 'Your message was a ray of sunshine on a rainy day.'],
        similar: ['a breath of fresh air', 'a bright spark'],
        tip: {
          uk: 'Іноді це кажуть з іронією про похмуру людину: He is a real ray of sunshine today! Слухайте інтонацію.',
          ru: 'Иногда это говорят с иронией о хмуром человеке: He is a real ray of sunshine today! Слушайте интонацию.',
          en: 'People sometimes say it ironically about a grumpy person: He is a real ray of sunshine today! Listen to the tone.',
        },
      },
      {
        en: 'to look on the bright side',
        m: { uk: 'бачити хороше в ситуації', ru: 'видеть хорошее в ситуации', en: 'see the positive part of a bad situation' },
        story: {
          uk: 'Bright side означає світлий бік. Вираз радить подивитися на ситуацію з того боку, де світить сонце. Його кажуть, щоб підбадьорити когось після невеликої невдачі.',
          ru: 'Bright side значит светлая сторона. Выражение советует посмотреть на ситуацию с той стороны, где светит солнце. Его говорят, чтобы подбодрить кого-то после небольшой неудачи.',
          en: 'The bright side is the side where the sun shines. The phrase tells you to look at a situation from its positive side. People say it to cheer someone up after a small failure.',
        },
        ex: ['The match was cancelled, but look on the bright side: we can sleep longer.', 'She always looks on the bright side of things.'],
        similar: ['to see the glass half full', 'to stay positive'],
        tip: {
          uk: 'Часто починається з But: But look on the bright side... Прийменник саме on, а не at.',
          ru: 'Часто начинается с But: But look on the bright side... Предлог именно on, а не at.',
          en: 'It often starts with But: But look on the bright side... The preposition is on, not at.',
        },
      },
      {
        en: 'the worst is over',
        m: { uk: 'найгірше позаду', ru: 'худшее позади', en: 'the hardest part has finished' },
        story: {
          uk: 'Просте, але дуже корисне речення. Його кажуть після хвороби, іспитів, важкої зими чи складного тижня. Воно звучить спокійно і дає надію.',
          ru: 'Простое, но очень полезное предложение. Его говорят после болезни, экзаменов, тяжёлой зимы или трудной недели. Оно звучит спокойно и даёт надежду.',
          en: 'A simple but very useful sentence. People say it after an illness, exams, a hard winter or a difficult week. It sounds calm and gives hope.',
        },
        ex: ['The doctor said the worst is over, and Grandpa is getting better.', 'We have finished the hardest test, so the worst is over.'],
        similar: ['to be out of the woods', 'over the hump'],
        tip: {
          uk: 'Over тут означає «закінчений»: The film is over. The winter is over.',
          ru: 'Over здесь значит «законченный»: The film is over. The winter is over.',
          en: 'Over here means finished: The film is over. The winter is over.',
        },
      },
      {
        en: 'every cloud has a silver lining',
        m: { uk: 'немає лиха без добра', ru: 'нет худа без добра', en: 'every bad situation has something good in it' },
        story: {
          uk: 'Silver lining це срібляста облямівка, яку бачиш навколо хмари, коли за нею сонце. Тобто навіть у поганій ситуації є щось світле. Вираз відомий в англійській уже кілька століть.',
          ru: 'Silver lining это серебристая кайма, которую видно вокруг облака, когда за ним солнце. То есть даже в плохой ситуации есть что-то светлое. Выражение известно в английском уже несколько веков.',
          en: 'A silver lining is the bright edge you see around a cloud when the sun is behind it. So even a bad situation has something bright in it. The saying has existed in English for centuries.',
        },
        ex: ['I broke my leg, but every cloud has a silver lining: I read ten books.', 'Losing the game was sad. The silver lining is that we learned a lot.'],
        similar: ['a blessing in disguise', 'to look on the bright side'],
        tip: {
          uk: 'Можна сказати коротко: The silver lining is that...',
          ru: 'Можно сказать коротко: The silver lining is that...',
          en: 'You can say it in a shorter way: The silver lining is that...',
        },
      },
      {
        en: 'to brighten up',
        m: { uk: 'проясніти; повеселішати', ru: 'проясниться; повеселеть', en: 'become sunnier; become happier' },
        story: {
          uk: 'Brighten up кажуть і про погоду, і про людей. Небо прояснюється, коли розходяться хмари, а людина веселішає, коли чує добру новину.',
          ru: 'Brighten up говорят и о погоде, и о людях. Небо проясняется, когда расходятся тучи, а человек веселеет, когда слышит хорошую новость.',
          en: 'We say brighten up about the weather and about people. The sky brightens up when clouds go away, and a person brightens up when they hear good news.',
        },
        ex: ['The forecast says it will brighten up in the afternoon.', 'Her face brightened up when she saw the puppy.'],
        similar: ['to clear up', 'to cheer up'],
        tip: {
          uk: 'Можна і з додатком: Flowers brighten up the room.',
          ru: 'Можно и с дополнением: Flowers brighten up the room.',
          en: 'It can take an object too: Flowers brighten up the room.',
        },
      },
      {
        en: 'to soak up the sun',
        m: { uk: 'грітися на сонці, насолоджуватися сонцем', ru: 'греться на солнце, наслаждаться солнцем', en: 'enjoy sitting in the sunshine' },
        story: {
          uk: 'Soak up буквально означає «вбирати», як губка воду. Коли ти довго сидиш на сонці й насолоджуєшся теплом, ти ніби вбираєш його. Улюблений вираз для весни й відпустки.',
          ru: 'Soak up буквально значит «впитывать», как губка воду. Когда ты долго сидишь на солнце и наслаждаешься теплом, ты будто впитываешь его. Любимое выражение для весны и отпуска.',
          en: 'Soak up literally means to take in, like a sponge takes in water. When you sit in the sun and enjoy the warmth, you seem to take it in. A favourite phrase for spring and holidays.',
        },
        ex: ['The cat lay on the balcony, soaking up the sun.', 'We spent the afternoon in the park, soaking up the sun.'],
        similar: ['to bask in the sun', 'to sunbathe'],
        tip: {
          uk: 'Soak up вживають і про знання: Kids soak up new words quickly.',
          ru: 'Soak up используют и о знаниях: Kids soak up new words quickly.',
          en: 'Soak up is also used about knowledge: Kids soak up new words quickly.',
        },
      },
      {
        en: 'a breath of fresh air',
        m: { uk: 'ковток свіжого повітря, щось нове і приємне', ru: 'глоток свежего воздуха, что-то новое и приятное', en: 'something new and pleasant' },
        story: {
          uk: 'Після душної кімнати свіже повітря дуже приємне. Так само кажуть про нову людину, ідею чи місце, які приносять зміни на краще.',
          ru: 'После душной комнаты свежий воздух очень приятен. Так же говорят о новом человеке, идее или месте, которые приносят перемены к лучшему.',
          en: 'After a stuffy room, fresh air feels wonderful. In the same way, we use the phrase for a new person, idea or place that brings a change for the better.',
        },
        ex: ['The new coach is a breath of fresh air for our team.', 'After the city, the village was a breath of fresh air.'],
        similar: ['a ray of sunshine', 'a welcome change'],
        tip: {
          uk: 'Можна і буквально: Let’s go outside for a breath of fresh air.',
          ru: 'Можно и буквально: Let’s go outside for a breath of fresh air.',
          en: 'It can be literal too: Let’s go outside for a breath of fresh air.',
        },
      },
      {
        en: 'to come out of your shell',
        m: { uk: 'перестати соромитися, розкритися', ru: 'перестать стесняться, раскрыться', en: 'become less shy' },
        story: {
          uk: 'Як черепаха, що визирає з панцира, коли стає тепло і безпечно. Так кажуть про сором’язливу людину, яка стала відкритішою, наприклад, у новому класі.',
          ru: 'Как черепаха, которая выглядывает из панциря, когда становится тепло и безопасно. Так говорят о застенчивом человеке, который стал более открытым, например, в новом классе.',
          en: 'Like a tortoise that looks out of its shell when it feels warm and safe. We say it about a shy person who becomes more open, for example in a new class.',
        },
        ex: ['By the end of the camp, Max had come out of his shell.', 'Drama lessons helped her come out of her shell.'],
        similar: ['to open up', 'to find your voice'],
        tip: {
          uk: 'Займенник змінюється: my shell, his shell, her shell.',
          ru: 'Местоимение меняется: my shell, his shell, her shell.',
          en: 'Change the pronoun: my shell, his shell, her shell.',
        },
      },
      {
        en: 'to take a day off',
        m: { uk: 'взяти вихідний', ru: 'взять выходной', en: 'not go to work or school for one day' },
        story: {
          uk: 'Відомо, що Гаррісон придумав цю пісню того дня, коли вирішив пропустити ділові зустрічі й відпочити в саду. Тобто фактично взяв собі вихідний. Іноді саме так народжуються найкращі ідеї.',
          ru: 'Известно, что Харрисон придумал эту песню в тот день, когда решил пропустить деловые встречи и отдохнуть в саду. То есть фактически взял себе выходной. Иногда именно так рождаются лучшие идеи.',
          en: 'Harrison came up with this song on a day when he decided to skip business meetings and relax in a garden. In other words, he took a day off. Sometimes that is exactly when the best ideas come.',
        },
        ex: ['Mum took a day off to come to my school concert.', 'I’m tired, I need to take a day off.'],
        similar: ['to have a break', 'to recharge your batteries'],
        tip: {
          uk: 'Можна змінювати час: take a week off, take the afternoon off.',
          ru: 'Можно менять время: take a week off, take the afternoon off.',
          en: 'Change the time: take a week off, take the afternoon off.',
        },
      },
      {
        en: 'to have a spring in your step',
        m: { uk: 'іти бадьоро, бути в чудовому настрої', ru: 'идти бодро, быть в отличном настроении', en: 'walk in a happy, energetic way' },
        story: {
          uk: 'Spring тут означає пружину, а не весну. Коли людина щаслива, вона йде легко, ніби на пружинах. Але навесні в багатьох справді з’являється така хода, тож вираз ідеально пасує до цієї пісні.',
          ru: 'Spring здесь значит пружину, а не весну. Когда человек счастлив, он идёт легко, будто на пружинах. Но весной у многих действительно появляется такая походка, так что выражение идеально подходит к этой песне.',
          en: 'Spring here means a coil that bounces, not the season. When people are happy, they walk lightly, as if on springs. But many people really do walk like that in spring, so the phrase suits this song perfectly.',
        },
        ex: ['After the good news, Dad had a spring in his step all day.', 'Sunny mornings put a spring in my step.'],
        similar: ['to walk on air', 'to be full of beans'],
        tip: {
          uk: 'Часто кажуть put a spring in someone’s step: The sun put a spring in her step.',
          ru: 'Часто говорят put a spring in someone’s step: The sun put a spring in her step.',
          en: 'People often say put a spring in someone’s step: The sun put a spring in her step.',
        },
      },
    ],
    culture: [
      {
        uk: 'Студія Abbey Road у Лондоні, де The Beatles записали більшість своїх пісень, працює й досі. А пішохідний перехід з обкладинки альбому щодня фотографують туристи з усього світу.',
        ru: 'Студия Abbey Road в Лондоне, где The Beatles записали большинство своих песен, работает до сих пор. А пешеходный переход с обложки альбома каждый день фотографируют туристы со всего мира.',
        en: 'Abbey Road Studios in London, where The Beatles recorded most of their songs, is still working today. Tourists from all over the world photograph the zebra crossing from the album cover every day.',
      },
      {
        uk: 'Джорджа Гаррісона часто називали «тихим бітлом». Основну частину пісень гурту писали Леннон і Маккартні, тому успіх цієї пісні показав, який талановитий автор і Гаррісон.',
        ru: 'Джорджа Харрисона часто называли «тихим битлом». Большую часть песен группы писали Леннон и Маккартни, поэтому успех этой песни показал, какой талантливый автор и Харрисон.',
        en: 'George Harrison was often called the quiet Beatle. Lennon and McCartney wrote most of the band’s songs, so the success of this one showed what a talented songwriter Harrison was too.',
      },
      {
        uk: 'У Великій Британії погода часто хмарна й дощова, тому сонце там справжня подія. Британці люблять говорити про погоду, і це найпопулярніша тема для розмови з незнайомцем.',
        ru: 'В Великобритании погода часто пасмурная и дождливая, поэтому солнце там настоящее событие. Британцы любят говорить о погоде, и это самая популярная тема для разговора с незнакомцем.',
        en: 'In the UK the weather is often cloudy and rainy, so sunshine is a real event. British people love talking about the weather, and it is the most popular topic for small talk with a stranger.',
      },
    ],
  },

  'dancing-queen': {
    intro: {
      uk: 'Ця пісня про чисту радість танцю і відчуття, що ти найкраща версія себе на танцмайданчику. Тому вона ідеально підходить, щоб вивчити англійські вирази про свята, вечірки й упевненість. Нижче зібрано розмовні вирази, які англійці й американці вживають про танці та веселощі. Усі приклади наші власні.',
      ru: 'Эта песня о чистой радости танца и ощущении, что ты лучшая версия себя на танцполе. Поэтому она идеально подходит, чтобы выучить английские выражения о праздниках, вечеринках и уверенности. Ниже собраны разговорные выражения, которые англичане и американцы используют о танцах и веселье. Все примеры наши собственные.',
      en: 'This song is about the pure joy of dancing and feeling like the best version of yourself on the dance floor. That makes it ideal for learning English phrases about celebrations, parties and confidence. Below are everyday expressions British and American people use about dancing and fun. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to hit the dance floor',
        m: { uk: 'вийти танцювати', ru: 'выйти танцевать', en: 'start dancing' },
        story: {
          uk: 'Hit тут не означає «бити». В розмовній англійській hit часто означає «піти кудись»: hit the road (вирушити в дорогу), hit the shops (піти по магазинах). Тож hit the dance floor означає рішуче вийти танцювати.',
          ru: 'Hit здесь не значит «бить». В разговорном английском hit часто значит «пойти куда-то»: hit the road (отправиться в путь), hit the shops (пойти по магазинам). Так что hit the dance floor значит решительно выйти танцевать.',
          en: 'Hit does not mean to strike here. In informal English hit often means to go somewhere: hit the road (start a journey), hit the shops (go shopping). So hit the dance floor means to go and dance with energy.',
        },
        ex: ['As soon as the music started, the kids hit the dance floor.', 'Come on, let’s hit the dance floor!'],
        similar: ['to bust a move', 'to get up and dance'],
        tip: {
          uk: 'Запам’ятайте сім’ю виразів: hit the road, hit the shops, hit the books (сісти за навчання).',
          ru: 'Запомните семью выражений: hit the road, hit the shops, hit the books (сесть за учёбу).',
          en: 'Remember the family: hit the road, hit the shops, hit the books (start studying).',
        },
      },
      {
        en: 'to steal the show',
        m: { uk: 'бути в центрі уваги, затьмарити всіх', ru: 'быть в центре внимания, затмить всех', en: 'get the most attention and praise' },
        story: {
          uk: 'Вираз прийшов із театру: так казали про актора другого плану, який грав так добре, що всі говорили тільки про нього. Сьогодні так кажуть про будь-кого, хто найбільше сподобався публіці.',
          ru: 'Выражение пришло из театра: так говорили об актёре второго плана, который играл так хорошо, что все говорили только о нём. Сегодня так говорят о любом, кто больше всего понравился публике.',
          en: 'The phrase comes from the theatre: it was said about a minor actor who was so good that everyone talked only about them. Today we use it for anyone the audience loves most.',
        },
        ex: ['The little flower girl stole the show at the wedding.', 'Our dog stole the show in the family video.'],
        similar: ['to be the star of the show', 'to bring the house down'],
        tip: {
          uk: 'Минулий час: stole the show. Не плутайте з буквальним значенням steal (красти).',
          ru: 'Прошедшее время: stole the show. Не путайте с буквальным значением steal (красть).',
          en: 'The past is stole the show. Don’t confuse it with the literal meaning of steal.',
        },
      },
      {
        en: 'the life of the party',
        m: { uk: 'душа компанії', ru: 'душа компании', en: 'the most fun person at a party' },
        story: {
          uk: 'Так кажуть про людину, без якої свято нудне: вона жартує, танцює, всіх знайомить. Українською ми скажемо «душа компанії», англійською party має «життя».',
          ru: 'Так говорят о человеке, без которого праздник скучный: он шутит, танцует, всех знакомит. По-русски мы скажем «душа компании», а по-английски у party есть «жизнь».',
          en: 'We say it about the person who makes a party fun: they joke, dance and introduce everyone. In English the party has a life, and this person is it.',
        },
        ex: ['Aunt Olena is always the life of the party.', 'He is quiet at school but the life of the party at home.'],
        similar: ['a party animal', 'a social butterfly'],
        tip: {
          uk: 'Можна сказати і the life and soul of the party, це британський варіант.',
          ru: 'Можно сказать и the life and soul of the party, это британский вариант.',
          en: 'You can also say the life and soul of the party, which is British.',
        },
      },
      {
        en: 'to dress up',
        m: { uk: 'святково вдягнутися; переодягнутися', ru: 'нарядно одеться; переодеться', en: 'put on smart clothes or a costume' },
        story: {
          uk: 'Dress up має два значення: вдягнути гарний святковий одяг або костюм для карнавалу. Протилежне dress down: одягнутися простіше, ніж зазвичай.',
          ru: 'Dress up имеет два значения: надеть красивую праздничную одежду или костюм для карнавала. Противоположное dress down: одеться проще, чем обычно.',
          en: 'Dress up has two meanings: to put on smart clothes for a special event, or to wear a costume. The opposite is dress down: to dress more casually than usual.',
        },
        ex: ['We dressed up for the school prom.', 'The kids dressed up as pirates for the party.'],
        similar: ['to get dressed up', 'to put on your best clothes'],
        tip: {
          uk: 'Для костюма вживаємо as: dress up as a queen.',
          ru: 'Для костюма используем as: dress up as a queen.',
          en: 'For costumes use as: dress up as a queen.',
        },
      },
      {
        en: 'to dance the night away',
        m: { uk: 'протанцювати всю ніч', ru: 'протанцевать всю ночь', en: 'dance for many hours' },
        story: {
          uk: 'Частка away після дієслова часто означає, що дію довго й безтурботно продовжують: chat away, sing away. Dance the night away означає танцювати, поки ніч не мине.',
          ru: 'Частица away после глагола часто значит, что действие долго и беззаботно продолжают: chat away, sing away. Dance the night away значит танцевать, пока ночь не пройдёт.',
          en: 'The word away after a verb often shows that an action goes on for a long time without worry: chat away, sing away. Dance the night away means to dance until the night is gone.',
        },
        ex: ['At the wedding, my grandparents danced the night away.', 'We danced the night away at the summer festival.'],
        similar: ['to party all night', 'to dance till you drop'],
        tip: {
          uk: 'Так само можна сказати sleep the day away, chat the evening away.',
          ru: 'Так же можно сказать sleep the day away, chat the evening away.',
          en: 'In the same way: sleep the day away, chat the evening away.',
        },
      },
      {
        en: 'to feel like a queen',
        m: { uk: 'почуватися королевою', ru: 'чувствовать себя королевой', en: 'feel special, confident and admired' },
        story: {
          uk: 'Так кажуть, коли тебе особливо добре зустріли, зробили гарний подарунок або ти почуваєшся неймовірно впевнено. Для хлопців є варіант feel like a king.',
          ru: 'Так говорят, когда тебя особенно хорошо встретили, сделали красивый подарок или ты чувствуешь себя невероятно уверенно. Для парней есть вариант feel like a king.',
          en: 'People say this when they are treated very well, get a lovely present or feel extremely confident. For boys and men there is feel like a king.',
        },
        ex: ['In that dress she felt like a queen.', 'The hotel staff made us feel like kings and queens.'],
        similar: ['to feel on top of the world', 'to feel like a million dollars'],
        tip: {
          uk: 'Treat someone like a queen означає ставитися до когось дуже шанобливо.',
          ru: 'Treat someone like a queen значит относиться к кому-то очень уважительно.',
          en: 'Treat someone like a queen means to treat someone with great care and respect.',
        },
      },
      {
        en: 'to sing along',
        m: { uk: 'підспівувати', ru: 'подпевать', en: 'sing together with a song or a singer' },
        story: {
          uk: 'Along означає «разом, поруч». Коли грає улюблена пісня і ти співаєш із нею, ти singing along. Пісні ABBA ідеальні для цього, бо приспіви легко запам’ятовуються.',
          ru: 'Along значит «вместе, рядом». Когда играет любимая песня и ты поёшь с ней, ты singing along. Песни ABBA идеальны для этого, потому что припевы легко запоминаются.',
          en: 'Along means together with. When your favourite song plays and you sing with it, you are singing along. ABBA songs are perfect for this because the choruses are easy to remember.',
        },
        ex: ['The whole family sang along in the car.', 'Can you sing along without looking at the words?'],
        similar: ['to join in', 'to clap along'],
        tip: {
          uk: 'Після along вживаємо to або with: sing along to the radio, sing along with Mum.',
          ru: 'После along используем to или with: sing along to the radio, sing along with Mum.',
          en: 'After along use to or with: sing along to the radio, sing along with Mum.',
        },
      },
      {
        en: 'a golden oldie',
        m: { uk: 'старий хіт, який усі люблять', ru: 'старый хит, который все любят', en: 'an old song that is still popular' },
        story: {
          uk: 'Oldie означає щось старе, а golden додає «цінне, улюблене». Так називають пісні 60-х, 70-х чи 80-х, які досі грають на радіо й вечірках. «Dancing Queen» класичний приклад.',
          ru: 'Oldie значит что-то старое, а golden добавляет «ценное, любимое». Так называют песни 60-х, 70-х или 80-х, которые до сих пор играют на радио и вечеринках. «Dancing Queen» классический пример.',
          en: 'An oldie is something old, and golden adds valuable and loved. We call songs from the 60s, 70s or 80s that are still played on the radio and at parties golden oldies. Dancing Queen is a classic example.',
        },
        ex: ['The DJ played golden oldies for the grandparents.', 'My dad’s playlist is full of golden oldies.'],
        similar: ['a classic', 'an evergreen'],
        tip: {
          uk: 'Вираз доброзичливий. Про людину oldie кажуть жартома і тільки серед друзів.',
          ru: 'Выражение доброжелательное. О человеке oldie говорят в шутку и только среди друзей.',
          en: 'The phrase is friendly. Calling a person an oldie is a joke and only for close friends.',
        },
      },
      {
        en: 'to let loose',
        m: { uk: 'розслабитися і повеселитися на повну', ru: 'расслабиться и повеселиться на полную', en: 'relax completely and have fun' },
        story: {
          uk: 'Loose означає «вільний, не прив’язаний». Коли ти let loose, ти ніби відв’язуєш себе від правил і просто радієш. Так кажуть про танці, свята й відпочинок після важкої роботи.',
          ru: 'Loose значит «свободный, не привязанный». Когда ты let loose, ты будто отвязываешь себя от правил и просто радуешься. Так говорят о танцах, праздниках и отдыхе после тяжёлой работы.',
          en: 'Loose means free, not tied. When you let loose, you untie yourself from the rules and just enjoy yourself. We say it about dancing, celebrations and relaxing after hard work.',
        },
        ex: ['After the exams, the students let loose at the party.', 'At weddings even serious people let loose.'],
        similar: ['to let your hair down', 'to go wild'],
        tip: {
          uk: 'Вимова: loose [лу:с] зі звуком «с». Не плутайте з lose [лу:з], «губити».',
          ru: 'Произношение: loose [лу:с] со звуком «с». Не путайте с lose [лу:з], «терять».',
          en: 'Pronunciation: loose ends with an s sound. Don’t confuse it with lose, which ends with a z sound.',
        },
      },
      {
        en: 'to be in your element',
        m: { uk: 'бути у своїй стихії', ru: 'быть в своей стихии', en: 'be doing what you love and are good at' },
        story: {
          uk: 'Давні філософи вважали, що світ складається з чотирьох стихій: вогню, води, повітря й землі, і кожна істота найкраще почувається у своїй. Тож in your element означає там, де тобі найкомфортніше.',
          ru: 'Древние философы считали, что мир состоит из четырёх стихий: огня, воды, воздуха и земли, и каждое существо лучше всего чувствует себя в своей. Поэтому in your element значит там, где тебе комфортнее всего.',
          en: 'Ancient thinkers believed the world was made of four elements, fire, water, air and earth, and that every creature felt best in its own one. So in your element means where you feel most comfortable.',
        },
        ex: ['On the dance floor, my sister is in her element.', 'Give him a football and he’s in his element.'],
        similar: ['to feel at home', 'to be in the zone'],
        tip: {
          uk: 'Протилежне: out of your element, коли почуваєшся незручно.',
          ru: 'Противоположное: out of your element, когда чувствуешь себя неуютно.',
          en: 'The opposite is out of your element, when you feel uncomfortable.',
        },
      },
    ],
    culture: [
      {
        uk: 'ABBA перемогли на «Євробаченні» 1974 року, яке проходило в британському місті Брайтон. Це один із найвідоміших переможців конкурсу за всю історію.',
        ru: 'ABBA победили на «Евровидении» 1974 года, которое проходило в британском городе Брайтон. Это один из самых известных победителей конкурса за всю историю.',
        en: 'ABBA won Eurovision in 1974, which was held in Brighton in the UK. They are one of the most famous winners in the contest’s history.',
      },
      {
        uk: 'У мюзиклі й фільмі «Мамма Міа!» історія розгортається на грецькому острові, а всі пісні взяті з репертуару ABBA. Це приклад так званого jukebox musical, мюзиклу на готових хітах.',
        ru: 'В мюзикле и фильме «Мамма Миа!» история разворачивается на греческом острове, а все песни взяты из репертуара ABBA. Это пример так называемого jukebox musical, мюзикла на готовых хитах.',
        en: 'In the musical and film Mamma Mia! the story takes place on a Greek island, and all the songs come from ABBA. It is an example of a jukebox musical, a show built on existing hits.',
      },
      {
        uk: 'Після 1982 року ABBA надовго перестали виступати разом. Лише у 2021 році вийшов новий альбом «Voyage», а в Лондоні спеціально для шоу з аватарами збудували окрему арену.',
        ru: 'После 1982 года ABBA надолго перестали выступать вместе. Только в 2021 году вышел новый альбом «Voyage», а в Лондоне специально для шоу с аватарами построили отдельную арену.',
        en: 'After 1982 ABBA stopped performing together for a very long time. Only in 2021 did a new album, Voyage, come out, and a special arena was built in London for the avatar show.',
      },
    ],
  },

  'what-a-wonderful-world': {
    intro: {
      uk: 'Ця пісня вчить помічати красу в звичайних речах: у природі, людях і кожному новому дні. Тому вона чудово підходить, щоб навчитися говорити англійською про вдячність, доброту і прості радощі. Нижче зібрано вирази, якими носії мови описують, що цінують у житті. Усі приклади наші власні.',
      ru: 'Эта песня учит замечать красоту в обычных вещах: в природе, людях и каждом новом дне. Поэтому она отлично подходит, чтобы научиться говорить по-английски о благодарности, доброте и простых радостях. Ниже собраны выражения, которыми носители языка описывают, что ценят в жизни. Все примеры наши собственные.',
      en: 'This song teaches us to notice beauty in ordinary things: nature, people and every new day. That makes it perfect for learning to talk in English about gratitude, kindness and simple joys. Below are expressions native speakers use to describe what they value in life. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to count your blessings',
        m: { uk: 'цінувати те хороше, що маєш', ru: 'ценить то хорошее, что имеешь', en: 'think about the good things you have' },
        story: {
          uk: 'Blessing означає благословення, щось добре в житті. Вираз радить «порахувати» все хороше, що в тебе є, особливо коли настрій поганий. Його часто кажуть батьки й бабусі.',
          ru: 'Blessing значит благословение, что-то хорошее в жизни. Выражение советует «посчитать» всё хорошее, что у тебя есть, особенно когда настроение плохое. Его часто говорят родители и бабушки.',
          en: 'A blessing is something good in your life. The phrase tells you to count all the good things you have, especially when you feel low. Parents and grandparents often say it.',
        },
        ex: ['I complain too much. I should count my blessings.', 'We have a home, food and each other. Let’s count our blessings.'],
        similar: ['to be grateful for what you have', 'to appreciate the little things'],
        tip: {
          uk: 'Займенник змінюється: count my blessings, count your blessings.',
          ru: 'Местоимение меняется: count my blessings, count your blessings.',
          en: 'Change the pronoun: count my blessings, count your blessings.',
        },
      },
      {
        en: 'to stop and smell the roses',
        m: { uk: 'зупинитися і насолодитися моментом', ru: 'остановиться и насладиться моментом', en: 'slow down and enjoy life' },
        story: {
          uk: 'Уявіть людину, яка так поспішає, що навіть не помічає троянд біля дороги. Вираз радить сповільнитися і помітити красу навколо. Його часто кажуть тим, хто занадто багато працює.',
          ru: 'Представьте человека, который так спешит, что даже не замечает роз у дороги. Выражение советует замедлиться и заметить красоту вокруг. Его часто говорят тем, кто слишком много работает.',
          en: 'Imagine someone in such a hurry that they don’t notice the roses by the road. The phrase tells you to slow down and see the beauty around you. People often say it to those who work too much.',
        },
        ex: ['On holiday, try to stop and smell the roses.', 'Grandma taught me to stop and smell the roses.'],
        similar: ['to take time out', 'to live in the moment'],
        tip: {
          uk: 'Вираз образний. Справжні троянди не потрібні.',
          ru: 'Выражение образное. Настоящие розы не нужны.',
          en: 'It is figurative, so you don’t need real roses.',
        },
      },
      {
        en: 'to take something for granted',
        m: { uk: 'сприймати щось як належне', ru: 'воспринимать что-то как должное', en: 'not value something because you always have it' },
        story: {
          uk: 'Granted означає «наданий, гарантований». Коли щось у тебе є завжди, ти перестаєш це помічати і цінувати: чисту воду, здоров’я, турботу батьків. Вираз нагадує, що це не так уже й звичайно.',
          ru: 'Granted значит «предоставленный, гарантированный». Когда что-то у тебя есть всегда, ты перестаёшь это замечать и ценить: чистую воду, здоровье, заботу родителей. Выражение напоминает, что это не так уж и обычно.',
          en: 'Granted means given or guaranteed. When you always have something, you stop noticing and valuing it: clean water, health, your parents’ care. The phrase reminds us it is not so ordinary after all.',
        },
        ex: ['We often take electricity for granted.', 'Don’t take your friends for granted.'],
        similar: ['to not appreciate', 'to overlook'],
        tip: {
          uk: 'Порядок слів: take + що + for granted. I took it for granted.',
          ru: 'Порядок слов: take + что + for granted. I took it for granted.',
          en: 'Word order: take + something + for granted. I took it for granted.',
        },
      },
      {
        en: 'the little things',
        m: { uk: 'дрібниці, які роблять життя приємним', ru: 'мелочи, которые делают жизнь приятной', en: 'small, simple things that make life nice' },
        story: {
          uk: 'Так кажуть про дрібні радощі: теплий чай, усмішку незнайомця, запах дощу. Ідея пісні Армстронга дуже близька до цього виразу: щастя часто в простих речах.',
          ru: 'Так говорят о мелких радостях: тёплом чае, улыбке незнакомца, запахе дождя. Идея песни Армстронга очень близка к этому выражению: счастье часто в простых вещах.',
          en: 'We use it for small joys: warm tea, a stranger’s smile, the smell of rain. The idea of Armstrong’s song is very close to this phrase: happiness is often in simple things.',
        },
        ex: ['It’s the little things that make me happy.', 'He always notices the little things, like my new haircut.'],
        similar: ['simple pleasures', 'small joys'],
        tip: {
          uk: 'Часта конструкція: It’s the little things that... Вона підкреслює думку.',
          ru: 'Частая конструкция: It’s the little things that... Она подчёркивает мысль.',
          en: 'A common pattern is It’s the little things that... It makes the idea stronger.',
        },
      },
      {
        en: 'to see the world through rose-tinted glasses',
        m: { uk: 'дивитися на світ крізь рожеві окуляри', ru: 'смотреть на мир сквозь розовые очки', en: 'see things as better than they really are' },
        story: {
          uk: 'Такий самий образ є і в українській, і в англійській: рожеві скельця роблять усе гарнішим, ніж є насправді. Вираз може звучати трохи критично, ніби людина не бачить проблем.',
          ru: 'Такой же образ есть и в русском, и в английском: розовые стёкла делают всё красивее, чем есть на самом деле. Выражение может звучать немного критично, будто человек не видит проблем.',
          en: 'The same picture exists in Ukrainian and in English: pink lenses make everything look nicer than it really is. The phrase can sound a little critical, as if the person ignores problems.',
        },
        ex: ['He sees his school days through rose-tinted glasses.', 'Be careful, you’re looking at the plan through rose-tinted glasses.'],
        similar: ['to look on the bright side', 'to be an optimist'],
        tip: {
          uk: 'В американській англійській частіше rose-colored glasses.',
          ru: 'В американском английском чаще rose-colored glasses.',
          en: 'In American English people more often say rose-colored glasses.',
        },
      },
      {
        en: 'to make the world a better place',
        m: { uk: 'робити світ кращим', ru: 'делать мир лучше', en: 'do things that help people or nature' },
        story: {
          uk: 'Дуже поширений вираз у промовах, школі й волонтерстві. Його вживають про великі справи і про маленькі: посадити дерево, допомогти сусідові, підтримати друга.',
          ru: 'Очень распространённое выражение в речах, школе и волонтёрстве. Его используют о больших делах и о маленьких: посадить дерево, помочь соседу, поддержать друга.',
          en: 'A very common phrase in speeches, at school and in volunteering. We use it for big actions and small ones: planting a tree, helping a neighbour, supporting a friend.',
        },
        ex: ['Small acts of kindness make the world a better place.', 'She wants to be a doctor and make the world a better place.'],
        similar: ['to make a difference', 'to give back'],
        tip: {
          uk: 'Не забудьте артикль: a better place.',
          ru: 'Не забудьте артикль: a better place.',
          en: 'Don’t forget the article: a better place.',
        },
      },
      {
        en: 'to brighten someone’s day',
        m: { uk: 'зробити комусь день світлішим', ru: 'сделать кому-то день светлее', en: 'make someone feel happier' },
        story: {
          uk: 'Невеликий добрий вчинок, повідомлення чи усмішка можуть зробити чийсь день кращим. Так часто дякують: You brightened my day!',
          ru: 'Небольшой добрый поступок, сообщение или улыбка могут сделать чей-то день лучше. Так часто благодарят: You brightened my day!',
          en: 'A small kind action, a message or a smile can make someone’s day better. People often say thank you like this: You brightened my day!',
        },
        ex: ['Your card really brightened my day.', 'Let’s visit Grandma and brighten her day.'],
        similar: ['to make someone’s day', 'to put a smile on someone’s face'],
        tip: {
          uk: 'Make someone’s day означає майже те саме, але ще сильніше: You made my day!',
          ru: 'Make someone’s day значит почти то же самое, но ещё сильнее: You made my day!',
          en: 'Make someone’s day means almost the same but stronger: You made my day!',
        },
      },
      {
        en: 'a random act of kindness',
        m: { uk: 'випадковий добрий вчинок', ru: 'случайный добрый поступок', en: 'a kind thing you do for a stranger without a reason' },
        story: {
          uk: 'Так називають несподівану доброту до незнайомих людей: заплатити за чужу каву, допомогти донести сумки. У багатьох країнах навіть є день таких вчинків.',
          ru: 'Так называют неожиданную доброту к незнакомым людям: заплатить за чужой кофе, помочь донести сумки. Во многих странах даже есть день таких поступков.',
          en: 'This is unexpected kindness to strangers: paying for someone’s coffee or helping carry their bags. Many countries even have a day for such acts.',
        },
        ex: ['A boy gave me his umbrella. What a random act of kindness!', 'Our class did random acts of kindness all week.'],
        similar: ['a good deed', 'to pay it forward'],
        tip: {
          uk: 'Скорочено пишуть RAK, наприклад у шкільних проєктах.',
          ru: 'Сокращённо пишут RAK, например в школьных проектах.',
          en: 'It is sometimes written as RAK, for example in school projects.',
        },
      },
      {
        en: 'larger than life',
        m: { uk: 'яскравий, незвичайний, «більший за життя»', ru: 'яркий, необычный, «больше жизни»', en: 'very colourful and exciting as a person' },
        story: {
          uk: 'Так описують людей з дуже сильною харизмою, яких неможливо не помітити. Луї Армстронга часто так називають: його широка усмішка, труба і голос робили його особливим.',
          ru: 'Так описывают людей с очень сильной харизмой, которых невозможно не заметить. Луи Армстронга часто так называют: его широкая улыбка, труба и голос делали его особенным.',
          en: 'We describe people with huge charisma, who are impossible not to notice, like this. Louis Armstrong is often called larger than life: his big smile, his trumpet and his voice made him special.',
        },
        ex: ['My grandpa was a larger than life character.', 'The singer has a larger than life personality.'],
        similar: ['one of a kind', 'full of character'],
        tip: {
          uk: 'Перед іменником пишуть через дефіс: a larger-than-life character.',
          ru: 'Перед существительным пишут через дефис: a larger-than-life character.',
          en: 'Before a noun use hyphens: a larger-than-life character.',
        },
      },
      {
        en: 'to have a heart of gold',
        m: { uk: 'мати золоте серце', ru: 'иметь золотое сердце', en: 'be very kind and generous' },
        story: {
          uk: 'Золото цінне і чисте, тому «золоте серце» означає дуже добру людину. Вираз однаковий в українській і англійській, тож його легко запам’ятати.',
          ru: 'Золото ценное и чистое, поэтому «золотое сердце» значит очень доброго человека. Выражение одинаковое в русском и английском, так что его легко запомнить.',
          en: 'Gold is precious and pure, so a heart of gold means a very kind person. The phrase is the same in Ukrainian and English, so it is easy to remember.',
        },
        ex: ['Our neighbour has a heart of gold, she feeds all the stray cats.', 'He looks strict, but he has a heart of gold.'],
        similar: ['to be kind-hearted', 'to be a good soul'],
        tip: {
          uk: 'Часто з but: He seems tough, but he has a heart of gold.',
          ru: 'Часто с but: He seems tough, but he has a heart of gold.',
          en: 'It often comes with but: He seems tough, but he has a heart of gold.',
        },
      },
    ],
    culture: [
      {
        uk: 'Новий Орлеан у США вважають батьківщиною джазу. Там досі на вулицях грають джазові оркестри, а аеропорт міста названо на честь Луї Армстронга.',
        ru: 'Новый Орлеан в США считают родиной джаза. Там до сих пор на улицах играют джазовые оркестры, а аэропорт города назван в честь Луи Армстронга.',
        en: 'New Orleans in the USA is seen as the home of jazz. Jazz bands still play in its streets, and the city’s airport is named after Louis Armstrong.',
      },
      {
        uk: 'Армстронг був одним із перших джазменів, хто співав у стилі скет: замість слів він імпровізував голосом безглузді склади, ніби грав на інструменті.',
        ru: 'Армстронг был одним из первых джазменов, кто пел в стиле скэт: вместо слов он импровизировал голосом бессмысленные слоги, будто играл на инструменте.',
        en: 'Armstrong was one of the first jazz musicians to sing scat: instead of words he improvised nonsense syllables with his voice, as if playing an instrument.',
      },
      {
        uk: 'Цю пісню часто вмикають у фільмах, рекламі й документальних фільмах про природу, бо вона одразу створює теплий і спокійний настрій. Багато відомих співаків записали власні кавер-версії.',
        ru: 'Эту песню часто включают в фильмах, рекламе и документальных фильмах о природе, потому что она сразу создаёт тёплое и спокойное настроение. Многие известные певцы записали свои кавер-версии.',
        en: 'The song is often used in films, adverts and nature documentaries because it creates a warm, calm mood at once. Many famous singers have recorded their own covers.',
      },
    ],
  },

  'three-little-birds': {
    intro: {
      uk: 'Ця пісня про спокій і віру в те, що все налагодиться. А офіційний кліп додає ще одну тему: дружбу між тими, хто здавалося б мав бути ворогами. Нижче зібрано розмовні вирази про спокій, підтримку і дружбу, а також кілька «пташиних» ідіом. Усі приклади наші власні.',
      ru: 'Эта песня о спокойствии и вере в то, что всё наладится. А официальный клип добавляет ещё одну тему: дружбу между теми, кто, казалось бы, должен быть врагами. Ниже собраны разговорные выражения о спокойствии, поддержке и дружбе, а также несколько «птичьих» идиом. Все примеры наши собственные.',
      en: 'This song is about staying calm and believing that things will work out. The official video adds another theme: friendship between characters who seem to be enemies. Below are everyday expressions about calm, support and friendship, plus a few bird idioms. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to take it easy',
        m: { uk: 'не напружуватися, розслабитися', ru: 'не напрягаться, расслабиться', en: 'relax and not work too hard' },
        story: {
          uk: 'Дуже частий вираз у розмові. Його кажуть, коли радять відпочити, або на прощання замість «бувай»: Take it easy! Звучить дружньо і невимушено.',
          ru: 'Очень частое выражение в разговоре. Его говорят, когда советуют отдохнуть, или на прощание вместо «пока»: Take it easy! Звучит дружелюбно и непринуждённо.',
          en: 'A very common phrase in conversation. People say it when they advise someone to rest, or instead of goodbye: Take it easy! It sounds friendly and relaxed.',
        },
        ex: ['You’ve been ill, so take it easy this week.', 'See you tomorrow. Take it easy!'],
        similar: ['to chill out', 'to relax'],
        tip: {
          uk: 'Може означати й «не нервуй»: Take it easy, it’s only a game.',
          ru: 'Может значить и «не нервничай»: Take it easy, it’s only a game.',
          en: 'It can also mean don’t get upset: Take it easy, it’s only a game.',
        },
      },
      {
        en: 'to calm down',
        m: { uk: 'заспокоїтися', ru: 'успокоиться', en: 'become less upset or excited' },
        story: {
          uk: 'Down тут показує, що емоції «опускаються», стають тихішими. Фразове дієслово можна вживати і про себе, і про інших: calm the baby down.',
          ru: 'Down здесь показывает, что эмоции «опускаются», становятся тише. Фразовый глагол можно использовать и о себе, и о других: calm the baby down.',
          en: 'Down here shows that emotions go down and become quieter. You can use it about yourself or about others: calm the baby down.',
        },
        ex: ['Take a breath and calm down.', 'Music helps me calm down after a busy day.'],
        similar: ['to settle down', 'to cool off'],
        tip: {
          uk: 'Сказати сердитій людині Calm down! буває неввічливо. М’якше: It’s OK, let’s talk.',
          ru: 'Сказать сердитому человеку Calm down! бывает невежливо. Мягче: It’s OK, let’s talk.',
          en: 'Saying Calm down! to an angry person can sound rude. Softer: It’s OK, let’s talk.',
        },
      },
      {
        en: 'peace of mind',
        m: { uk: 'душевний спокій', ru: 'душевный покой', en: 'a feeling that you don’t need to worry' },
        story: {
          uk: 'Так називають відчуття, коли тебе нічого не турбує. Цей вираз часто трапляється в рекламі страхування й охорони, але і в звичайній розмові.',
          ru: 'Так называют ощущение, когда тебя ничего не беспокоит. Это выражение часто встречается в рекламе страховки и охраны, но и в обычном разговоре.',
          en: 'This is the feeling when nothing is bothering you. The phrase often appears in adverts for insurance and security, but also in everyday conversation.',
        },
        ex: ['I always lock the door twice for peace of mind.', 'Knowing my dog is safe gives me peace of mind.'],
        similar: ['to feel at ease', 'calm'],
        tip: {
          uk: 'Без артикля: for peace of mind, give someone peace of mind.',
          ru: 'Без артикля: for peace of mind, give someone peace of mind.',
          en: 'No article: for peace of mind, give someone peace of mind.',
        },
      },
      {
        en: 'to work out',
        m: { uk: 'налагодитися, вийти добре', ru: 'наладиться, получиться хорошо', en: 'end in a good way' },
        story: {
          uk: 'Work out має кілька значень: тренуватися, розв’язати задачу і «налагодитися». Саме останнє значення підходить до настрою пісні: навіть складна ситуація врешті закінчиться добре.',
          ru: 'Work out имеет несколько значений: тренироваться, решить задачу и «наладиться». Именно последнее значение подходит к настроению песни: даже сложная ситуация в итоге закончится хорошо.',
          en: 'Work out has several meanings: to exercise, to solve a problem and to end well. The last meaning matches the mood of the song: even a hard situation can end well in the end.',
        },
        ex: ['I was worried about the move, but everything worked out.', 'Don’t panic. It will work out.'],
        similar: ['to turn out fine', 'to fall into place'],
        tip: {
          uk: 'Значення залежить від контексту: I work out at the gym (тренуюся).',
          ru: 'Значение зависит от контекста: I work out at the gym (тренируюсь).',
          en: 'The meaning depends on context: I work out at the gym means I exercise.',
        },
      },
      {
        en: 'an unlikely friendship',
        m: { uk: 'несподівана дружба', ru: 'неожиданная дружба', en: 'a friendship you would not expect' },
        story: {
          uk: 'Unlikely означає «малоймовірний». Так кажуть про дружбу людей або тварин, які дуже різні: кішки й папуги, старого вчителя і школяра. У кліпі до цієї пісні саме така дружба між Поросям і Вовком.',
          ru: 'Unlikely значит «маловероятный». Так говорят о дружбе людей или животных, которые очень разные: кошки и попугая, старого учителя и школьника. В клипе к этой песне именно такая дружба между Поросёнком и Волком.',
          en: 'Unlikely means not expected. We use it for friendships between very different people or animals: a cat and a parrot, an old teacher and a pupil. The video for this song shows exactly that between the Pig and the Wolf.',
        },
        ex: ['The film is about an unlikely friendship between a robot and a girl.', 'Our dog and the neighbour’s rabbit have an unlikely friendship.'],
        similar: ['an odd couple', 'unexpected friends'],
        tip: {
          uk: 'Unlikely тут прикметник: an unlikely hero, an unlikely winner.',
          ru: 'Unlikely здесь прилагательное: an unlikely hero, an unlikely winner.',
          en: 'Unlikely is an adjective here: an unlikely hero, an unlikely winner.',
        },
      },
      {
        en: 'to bury the hatchet',
        m: { uk: 'помиритися, забути ворожнечу', ru: 'помириться, забыть вражду', en: 'stop arguing and become friends again' },
        story: {
          uk: 'Hatchet це маленька сокира. Вираз означає «закопати сокиру», тобто закінчити сварку назавжди. Він добре описує історію з кліпу, де давні вороги стають друзями.',
          ru: 'Hatchet это маленький топорик. Выражение значит «закопать топор», то есть закончить ссору навсегда. Оно хорошо описывает историю из клипа, где давние враги становятся друзьями.',
          en: 'A hatchet is a small axe. The phrase means to bury it, in other words to end a quarrel for good. It describes the story in the video well, where old enemies become friends.',
        },
        ex: ['After years of arguing, the two brothers buried the hatchet.', 'Let’s bury the hatchet and start again.'],
        similar: ['to make up', 'to make peace'],
        tip: {
          uk: 'Вираз трохи формальніший за make up, але дуже поширений.',
          ru: 'Выражение чуть формальнее, чем make up, но очень распространено.',
          en: 'It is a little more formal than make up, but very common.',
        },
      },
      {
        en: 'an early bird',
        m: { uk: 'жайворонок, людина, що рано встає', ru: 'жаворонок, человек, который рано встаёт', en: 'a person who gets up early' },
        story: {
          uk: 'Є прислів’я The early bird catches the worm: рання пташка ловить хробака, тобто хто рано встає, тому щастить. Протилежність early bird це night owl, сова.',
          ru: 'Есть пословица The early bird catches the worm: ранняя птица ловит червяка, то есть кто рано встаёт, тому везёт. Противоположность early bird это night owl, сова.',
          en: 'There is a proverb: The early bird catches the worm, meaning people who start early get the best chances. The opposite of an early bird is a night owl.',
        },
        ex: ['I’m an early bird, I love quiet mornings.', 'We arrived first. The early bird catches the worm!'],
        similar: ['a morning person', 'an early riser'],
        tip: {
          uk: 'Протилежне: I’m a night owl, я сова.',
          ru: 'Противоположное: I’m a night owl, я сова.',
          en: 'The opposite: I’m a night owl.',
        },
      },
      {
        en: 'a little bird told me',
        m: { uk: 'сорока на хвості принесла', ru: 'сорока на хвосте принесла', en: 'I heard it from someone, but I won’t say who' },
        story: {
          uk: 'Так жартома кажуть, коли знають секрет, але не хочуть видавати, хто розповів. Українською схожий образ: «сорока на хвості принесла».',
          ru: 'Так в шутку говорят, когда знают секрет, но не хотят выдавать, кто рассказал. По-русски похожий образ: «сорока на хвосте принесла».',
          en: 'People say this as a joke when they know a secret but don’t want to say who told them. Ukrainian has a similar picture with a magpie.',
        },
        ex: ['A little bird told me it’s your birthday!', 'How did you know? A little bird told me.'],
        similar: ['I heard it on the grapevine', 'word gets around'],
        tip: {
          uk: 'Вираз грайливий і дружній, підходить для привітань і жартів.',
          ru: 'Выражение игривое и дружелюбное, подходит для поздравлений и шуток.',
          en: 'It is playful and friendly, good for birthdays and jokes.',
        },
      },
      {
        en: 'free as a bird',
        m: { uk: 'вільний, як птах', ru: 'свободный, как птица', en: 'completely free' },
        story: {
          uk: 'Птахи можуть летіти куди завгодно, тому вони символ свободи. Так кажуть після закінчення іспитів, роботи чи довгого проєкту.',
          ru: 'Птицы могут лететь куда угодно, поэтому они символ свободы. Так говорят после окончания экзаменов, работы или долгого проекта.',
          en: 'Birds can fly anywhere, so they are a symbol of freedom. People say it after exams, work or a long project are finished.',
        },
        ex: ['School is over and I’m free as a bird!', 'After the last exam she felt free as a bird.'],
        similar: ['footloose and fancy-free', 'to be on top of the world'],
        tip: {
          uk: 'Порівняння as...as: as free as a bird, as busy as a bee.',
          ru: 'Сравнение as...as: as free as a bird, as busy as a bee.',
          en: 'Similes with as...as: as free as a bird, as busy as a bee.',
        },
      },
      {
        en: 'to have someone’s back',
        m: { uk: 'підтримувати когось, бути на чиємусь боці', ru: 'поддерживать кого-то, быть на чьей-то стороне', en: 'be ready to help and protect someone' },
        story: {
          uk: 'Уявіть, що ви стоїте спина до спини з другом, і він захищає вас ззаду. Так кажуть, коли обіцяють підтримку: I’ve got your back.',
          ru: 'Представьте, что вы стоите спина к спине с другом, и он защищает вас сзади. Так говорят, когда обещают поддержку: I’ve got your back.',
          en: 'Imagine standing back to back with a friend who protects you from behind. People say this to promise support: I’ve got your back.',
        },
        ex: ['Don’t be nervous, I’ve got your back.', 'My big sister always has my back.'],
        similar: ['to stand by someone', 'to be there for someone'],
        tip: {
          uk: 'Найчастіша форма I’ve got your back. Звучить розмовно і тепло.',
          ru: 'Самая частая форма I’ve got your back. Звучит разговорно и тепло.',
          en: 'The most common form is I’ve got your back. It sounds informal and warm.',
        },
      },
    ],
    culture: [
      {
        uk: 'Реггі з’явилося на Ямайці наприкінці 1960-х. Його легко впізнати за спокійним ритмом, де гітара грає на «слабку» долю. Боб Марлі зробив цю музику відомою на всіх континентах.',
        ru: 'Регги появилось на Ямайке в конце 1960-х. Его легко узнать по спокойному ритму, где гитара играет на «слабую» долю. Боб Марли сделал эту музыку известной на всех континентах.',
        en: 'Reggae appeared in Jamaica in the late 1960s. You can recognise it by its relaxed rhythm, where the guitar plays on the off-beat. Bob Marley made this music famous on every continent.',
      },
      {
        uk: 'Будинок Боба Марлі на Хоуп-роуд у Кінгстоні тепер музей. Туди приїжджають шанувальники з усього світу, щоб побачити, де він жив і записував музику.',
        ru: 'Дом Боба Марли на Хоуп-роуд в Кингстоне теперь музей. Туда приезжают поклонники со всего мира, чтобы увидеть, где он жил и записывал музыку.',
        en: 'Bob Marley’s house on Hope Road in Kingston is now a museum. Fans from all over the world visit to see where he lived and recorded music.',
      },
      {
        uk: 'Сюжет кліпу заснований на казці «Троє поросят», яку знають англомовні діти. У ній Великий Злий Вовк хоче зруйнувати будиночки поросят, а в кліпі все закінчується дружбою.',
        ru: 'Сюжет клипа основан на сказке «Три поросёнка», которую знают англоязычные дети. В ней Большой Злой Волк хочет разрушить домики поросят, а в клипе всё заканчивается дружбой.',
        en: 'The video is based on the fairy tale The Three Little Pigs, which English-speaking children know well. In the tale the Big Bad Wolf wants to blow down the pigs’ houses, but in the video it all ends in friendship.',
      },
    ],
  },

  'im-still-standing': {
    intro: {
      uk: 'Ця пісня про силу повернутися після важкого періоду і показати всім, що ти не зламався. Тому вона чудово підходить, щоб вивчити англійські вирази про стійкість, повернення і впевненість. Нижче зібрано живі вирази, які вживають і про спорт, і про музику, і про звичайне життя. Усі приклади наші власні.',
      ru: 'Эта песня о силе вернуться после тяжёлого периода и показать всем, что ты не сломался. Поэтому она отлично подходит, чтобы выучить английские выражения о стойкости, возвращении и уверенности. Ниже собраны живые выражения, которые используют и о спорте, и о музыке, и об обычной жизни. Все примеры наши собственные.',
      en: 'This song is about the strength to come back after a hard time and show everyone you have not been broken. That makes it perfect for learning English phrases about resilience, comebacks and confidence. Below are lively expressions used about sport, music and everyday life. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to pick yourself up',
        m: { uk: 'зібратися з силами після невдачі', ru: 'собраться с силами после неудачи', en: 'recover after a failure or a fall' },
        story: {
          uk: 'Буквально це «підняти себе» після падіння. Образно так кажуть, коли людина після невдачі знову береться до справи. Часто вживається в парі: pick yourself up and dust yourself off, підвестися й обтрусити пил.',
          ru: 'Буквально это «поднять себя» после падения. Образно так говорят, когда человек после неудачи снова берётся за дело. Часто используется в паре: pick yourself up and dust yourself off, подняться и отряхнуть пыль.',
          en: 'Literally, to lift yourself up after a fall. Figuratively, it means to start again after a failure. It often comes as a pair: pick yourself up and dust yourself off.',
        },
        ex: ['He didn’t get into the team, but he picked himself up and kept training.', 'Pick yourself up and try again tomorrow.'],
        similar: ['to bounce back', 'to get back on your feet'],
        tip: {
          uk: 'Зворотний займенник змінюється: pick myself up, pick herself up.',
          ru: 'Возвратное местоимение меняется: pick myself up, pick herself up.',
          en: 'Change the reflexive pronoun: pick myself up, pick herself up.',
        },
      },
      {
        en: 'to make a comeback',
        m: { uk: 'повернутися, знову стати успішним', ru: 'вернуться, снова стать успешным', en: 'become successful or popular again' },
        story: {
          uk: 'Comeback означає повернення. Так кажуть про співаків, спортсменів, команди і навіть моду: широкі джинси чи платівки знову стали модними. Елтон Джон кілька разів робив яскраві повернення за свою кар’єру.',
          ru: 'Comeback значит возвращение. Так говорят о певцах, спортсменах, командах и даже моде: широкие джинсы или пластинки снова стали модными. Элтон Джон несколько раз делал яркие возвращения за свою карьеру.',
          en: 'A comeback is a return. We say it about singers, athletes, teams and even fashion: wide jeans and vinyl records have made a comeback. Elton John made several big comebacks during his career.',
        },
        ex: ['Our team was losing 0-2 but made an amazing comeback.', 'Roller skates have made a comeback this year.'],
        similar: ['to return in style', 'to bounce back'],
        tip: {
          uk: 'Іменник comeback пишеться разом, а дієслово окремо: come back.',
          ru: 'Существительное comeback пишется слитно, а глагол раздельно: come back.',
          en: 'The noun comeback is one word, the verb come back is two.',
        },
      },
      {
        en: 'against all odds',
        m: { uk: 'всупереч усьому', ru: 'вопреки всему', en: 'although success seemed very unlikely' },
        story: {
          uk: 'Odds це шанси, імовірність. Коли шанси проти тебе, але ти все одно перемагаєш, це against all odds. Вираз дуже популярний у спортивних новинах і фільмах.',
          ru: 'Odds это шансы, вероятность. Когда шансы против тебя, но ты всё равно побеждаешь, это against all odds. Выражение очень популярно в спортивных новостях и фильмах.',
          en: 'Odds are chances. When the chances are against you but you still win, that is against all odds. The phrase is very popular in sports news and films.',
        },
        ex: ['Against all odds, the tiny kitten survived the winter.', 'She became a pilot against all odds.'],
        similar: ['to beat the odds', 'despite everything'],
        tip: {
          uk: 'Зазвичай стоїть на початку або в кінці речення і відокремлюється комою.',
          ru: 'Обычно стоит в начале или в конце предложения и отделяется запятой.',
          en: 'It usually goes at the start or end of a sentence, with a comma.',
        },
      },
      {
        en: 'to stand tall',
        m: { uk: 'триматися гідно, з високо піднятою головою', ru: 'держаться достойно, с высоко поднятой головой', en: 'be proud and confident' },
        story: {
          uk: 'Людина, яка стоїть рівно, з прямою спиною, виглядає впевнено. Образно stand tall означає не соромитися і не здаватися навіть у складній ситуації.',
          ru: 'Человек, который стоит ровно, с прямой спиной, выглядит уверенно. Образно stand tall значит не стыдиться и не сдаваться даже в трудной ситуации.',
          en: 'A person who stands straight with their back upright looks confident. Figuratively, stand tall means not to feel ashamed or give up, even when things are hard.',
        },
        ex: ['We lost the final, but we can stand tall, we played well.', 'Stand tall and speak clearly in your presentation.'],
        similar: ['to hold your head high', 'to be proud'],
        tip: {
          uk: 'Tall тут прислівник. Не кажіть stand tallly.',
          ru: 'Tall здесь наречие. Не говорите stand tallly.',
          en: 'Tall works as an adverb here. Don’t say stand tallly.',
        },
      },
      {
        en: 'to get back on your feet',
        m: { uk: 'стати на ноги, відновитися', ru: 'встать на ноги, восстановиться', en: 'recover after illness or problems' },
        story: {
          uk: 'Після хвороби людина буквально знову встає на ноги. Образно вираз означає відновитися після будь-яких проблем: фінансових, особистих, робочих.',
          ru: 'После болезни человек буквально снова встаёт на ноги. Образно выражение значит восстановиться после любых проблем: финансовых, личных, рабочих.',
          en: 'After an illness a person literally stands on their feet again. Figuratively, it means to recover after any problems: with money, at work or in life.',
        },
        ex: ['After the flood, the town slowly got back on its feet.', 'It took Grandpa a month to get back on his feet after the operation.'],
        similar: ['to recover', 'to pick yourself up'],
        tip: {
          uk: 'Займенник змінюється: on my feet, on her feet, on its feet.',
          ru: 'Местоимение меняется: on my feet, on her feet, on its feet.',
          en: 'Change the pronoun: on my feet, on her feet, on its feet.',
        },
      },
      {
        en: 'to go from strength to strength',
        m: { uk: 'ставати дедалі успішнішим', ru: 'становиться всё успешнее', en: 'become more and more successful' },
        story: {
          uk: 'Так кажуть про людину чи проєкт, що з кожним кроком стає сильнішим. Вираз британський, часто трапляється в новинах і привітаннях.',
          ru: 'Так говорят о человеке или проекте, который с каждым шагом становится сильнее. Выражение британское, часто встречается в новостях и поздравлениях.',
          en: 'We say it about a person or project that gets stronger with every step. The phrase is British and often used in news and congratulations.',
        },
        ex: ['Since the new coach arrived, the team has gone from strength to strength.', 'Her little bakery is going from strength to strength.'],
        similar: ['to go places', 'to be on a roll'],
        tip: {
          uk: 'Часто вживається в present perfect: has gone from strength to strength.',
          ru: 'Часто используется в present perfect: has gone from strength to strength.',
          en: 'It is often used in the present perfect: has gone from strength to strength.',
        },
      },
      {
        en: 'to prove someone wrong',
        m: { uk: 'довести, що хтось помилявся', ru: 'доказать, что кто-то ошибался', en: 'show that someone’s low opinion of you was false' },
        story: {
          uk: 'Коли хтось у тебе не вірить, найкраща відповідь не сварка, а успіх. Prove someone wrong означає саме це: досягти того, що інші вважали неможливим для тебе.',
          ru: 'Когда кто-то в тебя не верит, лучший ответ не ссора, а успех. Prove someone wrong значит именно это: добиться того, что другие считали невозможным для тебя.',
          en: 'When someone doesn’t believe in you, the best answer is not an argument but success. Prove someone wrong means exactly that: achieving what others thought you could not.',
        },
        ex: ['Everyone said I couldn’t learn to swim, but I proved them wrong.', 'She wants to prove her critics wrong.'],
        similar: ['to show them', 'to defy expectations'],
        tip: {
          uk: 'Протилежне: prove someone right, підтвердити чиюсь правоту.',
          ru: 'Противоположное: prove someone right, подтвердить чью-то правоту.',
          en: 'The opposite is prove someone right.',
        },
      },
      {
        en: 'a tough cookie',
        m: { uk: 'міцний горішок', ru: 'крепкий орешек', en: 'a strong person who doesn’t give up easily' },
        story: {
          uk: 'Буквально «тверде печиво», яке не розламаєш. Так із повагою і трохи жартома кажуть про людину, яка пережила багато труднощів і не втратила сили.',
          ru: 'Буквально «твёрдое печенье», которое не разломаешь. Так с уважением и немного в шутку говорят о человеке, который пережил много трудностей и не потерял силу.',
          en: 'Literally, a hard cookie that won’t break. People say it with respect, and a little humour, about someone who has been through a lot and stayed strong.',
        },
        ex: ['My great-grandma is a tough cookie, nothing scares her.', 'Don’t worry about Anna, she’s a tough cookie.'],
        similar: ['a fighter', 'to be made of strong stuff'],
        tip: {
          uk: 'Вираз розмовний. В офіційному тексті краще сказати a strong person.',
          ru: 'Выражение разговорное. В официальном тексте лучше сказать a strong person.',
          en: 'The phrase is informal. In formal writing say a strong person.',
        },
      },
      {
        en: 'to shake off',
        m: { uk: 'позбутися, струсити з себе', ru: 'избавиться, стряхнуть с себя', en: 'get rid of something bad' },
        story: {
          uk: 'Як собака обтрушується після купання, так людина може «струсити» з себе застуду, поганий настрій чи погану репутацію. Дуже корисне фразове дієслово.',
          ru: 'Как собака отряхивается после купания, так человек может «стряхнуть» с себя простуду, плохое настроение или плохую репутацию. Очень полезный фразовый глагол.',
          en: 'Like a dog shaking itself after a swim, a person can shake off a cold, a bad mood or a bad reputation. A very useful phrasal verb.',
        },
        ex: ['I can’t shake off this cold.', 'The team shook off their early mistakes and won.'],
        similar: ['to get over', 'to throw off'],
        tip: {
          uk: 'Займенник посередині: shake it off, shake them off.',
          ru: 'Местоимение посередине: shake it off, shake them off.',
          en: 'Put a pronoun in the middle: shake it off, shake them off.',
        },
      },
      {
        en: 'to be back with a bang',
        m: { uk: 'гучно повернутися', ru: 'громко вернуться', en: 'return in a very impressive way' },
        story: {
          uk: 'Bang означає гучний вибух чи удар. Коли хтось повертається with a bang, про це повернення говорять усі. Так часто пишуть про нові альбоми, сезони серіалів і спортивні перемоги.',
          ru: 'Bang значит громкий хлопок или удар. Когда кто-то возвращается with a bang, об этом возвращении говорят все. Так часто пишут о новых альбомах, сезонах сериалов и спортивных победах.',
          en: 'A bang is a loud noise. When someone comes back with a bang, everyone talks about it. Journalists often use it for new albums, new seasons of series and sports wins.',
        },
        ex: ['The band is back with a bang, their new song is everywhere.', 'After the injury, she came back with a bang and won gold.'],
        similar: ['to make a comeback', 'to return in style'],
        tip: {
          uk: 'Також кажуть start with a bang і end with a bang: почати чи закінчити дуже яскраво.',
          ru: 'Также говорят start with a bang и end with a bang: начать или закончить очень ярко.',
          en: 'People also say start with a bang and end with a bang.',
        },
      },
    ],
    culture: [
      {
        uk: 'Канни відомі на весь світ своїм кінофестивалем, який щороку проходить саме на набережній Круазетт, де знімали кліп. Тому кліп показує не просто пляж, а одне з найгламурніших місць Європи.',
        ru: 'Канны известны на весь мир своим кинофестивалем, который каждый год проходит именно на набережной Круазетт, где снимали клип. Поэтому клип показывает не просто пляж, а одно из самых гламурных мест Европы.',
        en: 'Cannes is world famous for its film festival, held every year on the Croisette, where the video was filmed. So the video shows not just a beach but one of the most glamorous places in Europe.',
      },
      {
        uk: 'Елтон Джон відомий своїми яскравими окулярами й сценічними костюмами: пір’ям, блискітками, капелюхами. Він вважав, що концерт має бути справжнім шоу.',
        ru: 'Элтон Джон известен своими яркими очками и сценическими костюмами: перьями, блёстками, шляпами. Он считал, что концерт должен быть настоящим шоу.',
        en: 'Elton John is famous for his bright glasses and stage costumes, with feathers, sequins and hats. He believed a concert should be a real show.',
      },
      {
        uk: 'У Британії найвідоміших людей мистецтва, науки й спорту король або королева посвячує в лицарі. Після цього до імені додають Sir для чоловіків і Dame для жінок.',
        ru: 'В Британии самых известных людей искусства, науки и спорта король или королева посвящает в рыцари. После этого к имени добавляют Sir для мужчин и Dame для женщин.',
        en: 'In Britain the king or queen knights the most famous people in the arts, science and sport. After that, Sir is added to a man’s name and Dame to a woman’s.',
      },
    ],
  },

  'i-wanna-dance-with-somebody': {
    intro: {
      uk: 'Ця пісня звучить як свято, але вона ще й про бажання бути поруч із людиною, яка тебе любить. Тому вона підходить, щоб вивчити вирази і про танці, і про почуття. Нижче зібрано розмовні вирази, які англійці й американці вживають на вечірках і в щирих розмовах. Усі приклади наші власні.',
      ru: 'Эта песня звучит как праздник, но она ещё и о желании быть рядом с человеком, который тебя любит. Поэтому она подходит, чтобы выучить выражения и о танцах, и о чувствах. Ниже собраны разговорные выражения, которые англичане и американцы используют на вечеринках и в искренних разговорах. Все примеры наши собственные.',
      en: 'This song sounds like a party, but it is also about wanting to be close to someone who loves you. That makes it good for learning phrases about both dancing and feelings. Below are everyday expressions British and American people use at parties and in honest conversations. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to have two left feet',
        m: { uk: 'зовсім не вміти танцювати', ru: 'совсем не уметь танцевать', en: 'be very clumsy when dancing' },
        story: {
          uk: 'Уявіть людину з двома лівими ногами: вона точно буде спотикатися в танці. Так жартома кажуть про себе, коли соромляться танцювати.',
          ru: 'Представьте человека с двумя левыми ногами: он точно будет спотыкаться в танце. Так в шутку говорят о себе, когда стесняются танцевать.',
          en: 'Imagine someone with two left feet: they would trip over in a dance. People say it jokingly about themselves when they feel shy about dancing.',
        },
        ex: ['I have two left feet, but I still love dancing.', 'Dad says he has two left feet, but he’s actually great.'],
        similar: ['to be a terrible dancer', 'to be clumsy'],
        tip: {
          uk: 'Вживаємо з have: I have two left feet. Не кажіть I am two left feet.',
          ru: 'Используем с have: I have two left feet. Не говорите I am two left feet.',
          en: 'Use it with have: I have two left feet. Don’t say I am two left feet.',
        },
      },
      {
        en: 'to light up the room',
        m: { uk: 'наповнювати кімнату радістю', ru: 'наполнять комнату радостью', en: 'make everyone feel happier when you arrive' },
        story: {
          uk: 'Деякі люди такі енергійні та усміхнені, що коли вони заходять, усім стає світліше. Так часто говорять про співаків, артистів і просто дуже теплих людей.',
          ru: 'Некоторые люди такие энергичные и улыбчивые, что когда они входят, всем становится светлее. Так часто говорят о певцах, артистах и просто очень тёплых людях.',
          en: 'Some people are so lively and smiley that when they walk in, everything feels brighter. We often say it about singers, performers and simply very warm people.',
        },
        ex: ['Her laugh lights up the room.', 'When Grandma arrives, she lights up the room.'],
        similar: ['to brighten someone’s day', 'to be a ray of sunshine'],
        tip: {
          uk: 'Минулий час: lit up the room.',
          ru: 'Прошедшее время: lit up the room.',
          en: 'The past is lit up the room.',
        },
      },
      {
        en: 'to come alive',
        m: { uk: 'оживати', ru: 'оживать', en: 'become lively, energetic and exciting' },
        story: {
          uk: 'Так кажуть про місто ввечері, вечірку після першої пісні або людину, яка займається улюбленою справою. Вона буквально «оживає» і сяє.',
          ru: 'Так говорят о городе вечером, вечеринке после первой песни или человеке, который занимается любимым делом. Он буквально «оживает» и сияет.',
          en: 'We say it about a city at night, a party after the first song, or a person doing what they love. They really come to life and shine.',
        },
        ex: ['The party came alive when the music started.', 'She comes alive on stage.'],
        similar: ['to come to life', 'to light up'],
        tip: {
          uk: 'Alive стоїть після дієслова, не перед іменником: come alive, але a living city.',
          ru: 'Alive стоит после глагола, а не перед существительным: come alive, но a living city.',
          en: 'Alive goes after the verb, not before a noun: come alive, but a living city.',
        },
      },
      {
        en: 'to sweep someone off their feet',
        m: { uk: 'зачарувати когось, закохати з першого погляду', ru: 'очаровать кого-то, влюбить с первого взгляда', en: 'make someone fall in love quickly' },
        story: {
          uk: 'Буквально «змести когось з ніг», як сильний вітер. Образно так кажуть, коли людина когось швидко і сильно зачарувала. Вираз романтичний і трохи казковий.',
          ru: 'Буквально «смести кого-то с ног», как сильный ветер. Образно так говорят, когда человек кого-то быстро и сильно очаровал. Выражение романтичное и немного сказочное.',
          en: 'Literally, to knock someone off their feet like a strong wind. Figuratively, it means to charm someone quickly and completely. The phrase is romantic and a little like a fairy tale.',
        },
        ex: ['In the film, the prince sweeps her off her feet.', 'He wasn’t looking for love, but she swept him off his feet.'],
        similar: ['to fall head over heels', 'to win someone’s heart'],
        tip: {
          uk: 'Займенники змінюються: swept me off my feet.',
          ru: 'Местоимения меняются: swept me off my feet.',
          en: 'Change the pronouns: swept me off my feet.',
        },
      },
      {
        en: 'to feel lonely in a crowd',
        m: { uk: 'почуватися самотнім серед людей', ru: 'чувствовать себя одиноким среди людей', en: 'feel alone even when many people are around' },
        story: {
          uk: 'Самотність не завжди означає бути на самоті. Можна стояти на вечірці серед сотні людей і почуватися самотнім, якщо поруч немає близької людини. Саме це відчуття стоїть за веселою музикою цієї пісні.',
          ru: 'Одиночество не всегда значит быть одному. Можно стоять на вечеринке среди сотни людей и чувствовать себя одиноким, если рядом нет близкого человека. Именно это чувство стоит за весёлой музыкой этой песни.',
          en: 'Loneliness doesn’t always mean being alone. You can be at a party with a hundred people and still feel lonely if no one close is with you. That feeling is behind the happy music of this song.',
        },
        ex: ['In the big new school, I sometimes felt lonely in a crowd.', 'You can feel lonely in a crowd and happy on your own.'],
        similar: ['to feel left out', 'to feel isolated'],
        tip: {
          uk: 'Lonely означає сумний через самотність, а alone просто «на самоті».',
          ru: 'Lonely значит грустный из-за одиночества, а alone просто «в одиночестве».',
          en: 'Lonely means sad because you are alone. Alone just means without other people.',
        },
      },
      {
        en: 'to belt out a song',
        m: { uk: 'співати на повний голос', ru: 'петь во весь голос', en: 'sing loudly and with power' },
        story: {
          uk: 'Belt out кажуть про спів дуже гучно і з емоціями. Вітні Г’юстон славилася саме таким співом: сильним, чистим і потужним.',
          ru: 'Belt out говорят о пении очень громко и с эмоциями. Уитни Хьюстон славилась именно таким пением: сильным, чистым и мощным.',
          en: 'Belt out means to sing very loudly and with emotion. Whitney Houston was famous for singing like this: strong, clear and powerful.',
        },
        ex: ['We belted out the song at karaoke.', 'She belted out the high notes without any effort.'],
        similar: ['to sing your heart out', 'to sing at the top of your lungs'],
        tip: {
          uk: 'Можна сказати і belt it out.',
          ru: 'Можно сказать и belt it out.',
          en: 'You can also say belt it out.',
        },
      },
      {
        en: 'to cut a rug',
        m: { uk: 'запально танцювати', ru: 'зажигательно танцевать', en: 'dance with energy' },
        story: {
          uk: 'Старий американський сленг: колись так енергійно танцювали, що ніби «різали» килим ногами. Сьогодні вираз звучить жартівливо і трохи ретро.',
          ru: 'Старый американский сленг: когда-то так энергично танцевали, что будто «резали» ковёр ногами. Сегодня выражение звучит шутливо и немного ретро.',
          en: 'Old American slang: people danced so hard they seemed to cut the rug with their feet. Today the phrase sounds playful and a bit retro.',
        },
        ex: ['Grandpa can still cut a rug at weddings!', 'Let’s go and cut a rug.'],
        similar: ['to bust a move', 'to hit the dance floor'],
        tip: {
          uk: 'Вираз застарілий, тому часто звучить жартома.',
          ru: 'Выражение устаревшее, поэтому часто звучит в шутку.',
          en: 'It is old-fashioned, so people often use it as a joke.',
        },
      },
      {
        en: 'to be head over heels',
        m: { uk: 'бути закоханим по вуха', ru: 'быть влюблённым по уши', en: 'be completely in love' },
        story: {
          uk: 'Буквально «головою над п’ятами», ніби ти перекинувся від сильних почуттів. Українською ми кажемо «по вуха», англійською «з голови до п’ят».',
          ru: 'Буквально «головой над пятками», будто ты перекувырнулся от сильных чувств. По-русски мы говорим «по уши», а по-английски «через голову».',
          en: 'Literally, head over heels, as if strong feelings turned you upside down. Ukrainian talks about being in love up to your ears.',
        },
        ex: ['They are head over heels in love.', 'She fell head over heels for the new boy.'],
        similar: ['to be madly in love', 'to fall for someone'],
        tip: {
          uk: 'Найчастіше: fall head over heels in love with someone.',
          ru: 'Чаще всего: fall head over heels in love with someone.',
          en: 'The most common form: fall head over heels in love with someone.',
        },
      },
      {
        en: 'a powerhouse',
        m: { uk: 'дуже потужна, сильна людина', ru: 'очень мощный, сильный человек', en: 'a person with great energy, talent or power' },
        story: {
          uk: 'Буквально це електростанція. Так кажуть про людей, які дуже сильні в чомусь. Вітні Г’юстон часто називають vocal powerhouse, людиною з дуже потужним голосом.',
          ru: 'Буквально это электростанция. Так говорят о людях, которые очень сильны в чём-то. Уитни Хьюстон часто называют vocal powerhouse, человеком с очень мощным голосом.',
          en: 'Literally, a power station. We use it for people who are very strong at something. Whitney Houston is often called a vocal powerhouse, someone with an extremely powerful voice.',
        },
        ex: ['Our captain is a powerhouse on the pitch.', 'She is a vocal powerhouse.'],
        similar: ['a force of nature', 'a dynamo'],
        tip: {
          uk: 'Можна поєднувати: a vocal powerhouse, an economic powerhouse.',
          ru: 'Можно сочетать: a vocal powerhouse, an economic powerhouse.',
          en: 'You can combine it: a vocal powerhouse, an economic powerhouse.',
        },
      },
      {
        en: 'to move to the beat',
        m: { uk: 'рухатися в ритм музики', ru: 'двигаться в ритм музыки', en: 'dance or move following the rhythm' },
        story: {
          uk: 'Beat це ритм, удари, які ти відчуваєш у музиці. Move to the beat кажуть, коли просять не думати про рухи, а просто танцювати під ритм.',
          ru: 'Beat это ритм, удары, которые ты чувствуешь в музыке. Move to the beat говорят, когда просят не думать о движениях, а просто танцевать под ритм.',
          en: 'The beat is the rhythm you feel in music. People say move to the beat when they tell you to stop thinking about moves and just dance to the rhythm.',
        },
        ex: ['Don’t count the steps, just move to the beat.', 'Little kids move to the beat as soon as they hear music.'],
        similar: ['to dance to the rhythm', 'to get into the groove'],
        tip: {
          uk: 'Keep the beat означає тримати ритм, наприклад барабанщику.',
          ru: 'Keep the beat значит держать ритм, например барабанщику.',
          en: 'Keep the beat means to keep the rhythm, like a drummer.',
        },
      },
    ],
    culture: [
      {
        uk: 'Вітні Г’юстон виросла в Нью-Джерсі і почала співати в церковному хорі. Її мати Сіссі Г’юстон теж була відомою співачкою, а співачка Діонн Ворвік її двоюрідна сестра.',
        ru: 'Уитни Хьюстон выросла в Нью-Джерси и начала петь в церковном хоре. Её мать Сисси Хьюстон тоже была известной певицей, а певица Дионн Уорвик её двоюродная сестра.',
        en: 'Whitney Houston grew up in New Jersey and started singing in a church choir. Her mother, Cissy Houston, was also a well-known singer, and singer Dionne Warwick is her cousin.',
      },
      {
        uk: 'У 1980-х музичні кліпи стали надзвичайно важливими завдяки каналу MTV. Яскравий кліп міг зробити пісню хітом, тому артисти вкладали в них багато сил.',
        ru: 'В 1980-х музыкальные клипы стали очень важными благодаря каналу MTV. Яркий клип мог сделать песню хитом, поэтому артисты вкладывали в них много сил.',
        en: 'In the 1980s music videos became hugely important because of MTV. A bright video could turn a song into a hit, so artists put a lot of effort into them.',
      },
      {
        uk: 'Пісня досі одна з найпопулярніших на весіллях і шкільних дискотеках в англомовних країнах. Її часто вмикають, щоб покликати всіх на танцмайданчик.',
        ru: 'Песня до сих пор одна из самых популярных на свадьбах и школьных дискотеках в англоязычных странах. Её часто включают, чтобы позвать всех на танцпол.',
        en: 'The song is still one of the most popular at weddings and school discos in English-speaking countries. DJs often play it to get everyone onto the dance floor.',
      },
    ],
  },

  'take-on-me': {
    intro: {
      uk: 'Ця пісня про сміливість зробити перший крок, а історія самого гурту про те, що не варто здаватися після невдачі: хітом пісня стала лише з третьої спроби. Тому вона чудово підходить, щоб вивчити англійські вирази про ризик, спроби і перші кроки. Усі приклади наші власні.',
      ru: 'Эта песня о смелости сделать первый шаг, а история самой группы о том, что не стоит сдаваться после неудачи: хитом песня стала только с третьей попытки. Поэтому она отлично подходит, чтобы выучить английские выражения о риске, попытках и первых шагах. Все примеры наши собственные.',
      en: 'This song is about the courage to take the first step, and the band’s own story shows why you should not give up after a failure: the song only became a hit on the third try. That makes it perfect for learning English phrases about risks, attempts and first steps. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to take on',
        m: { uk: 'взятися за щось, прийняти виклик', ru: 'взяться за что-то, принять вызов', en: 'accept a task, challenge or opponent' },
        story: {
          uk: 'Take on має кілька значень: взяти на себе роботу, прийняти виклик або позмагатися з суперником. Назва пісні звучить як запрошення ризикнути і прийняти щось нове.',
          ru: 'Take on имеет несколько значений: взять на себя работу, принять вызов или посоревноваться с соперником. Название песни звучит как приглашение рискнуть и принять что-то новое.',
          en: 'Take on has several meanings: to accept work, to accept a challenge or to compete against an opponent. The song title sounds like an invitation to take a risk and accept something new.',
        },
        ex: ['Our school will take on the best team in the city.', 'Don’t take on too much, you need time to rest.'],
        similar: ['to tackle', 'to accept a challenge'],
        tip: {
          uk: 'Займенник посередині: take it on, take them on.',
          ru: 'Местоимение посередине: take it on, take them on.',
          en: 'Put a pronoun in the middle: take it on, take them on.',
        },
      },
      {
        en: 'to take a chance on someone',
        m: { uk: 'дати комусь шанс, повірити в когось', ru: 'дать кому-то шанс, поверить в кого-то', en: 'trust someone although it might not work' },
        story: {
          uk: 'Chance це шанс або ризик. Take a chance on someone означає повірити в людину, навіть якщо ти не впевнений. Так кажуть і про кохання, і про роботу: The coach took a chance on a young player.',
          ru: 'Chance это шанс или риск. Take a chance on someone значит поверить в человека, даже если ты не уверен. Так говорят и о любви, и о работе: The coach took a chance on a young player.',
          en: 'A chance is an opportunity or a risk. Take a chance on someone means to trust a person even if you are not sure. We say it about love and about work: The coach took a chance on a young player.',
        },
        ex: ['The director took a chance on an unknown actor.', 'Thank you for taking a chance on me.'],
        similar: ['to give someone a chance', 'to believe in someone'],
        tip: {
          uk: 'Без on просто take a chance: ризикнути.',
          ru: 'Без on просто take a chance: рискнуть.',
          en: 'Without on it is just take a chance: to take a risk.',
        },
      },
      {
        en: 'to give it a shot',
        m: { uk: 'спробувати', ru: 'попробовать', en: 'try something' },
        story: {
          uk: 'Shot тут означає спробу, як постріл у ціль. Дуже розмовний і дружній вираз. Його кажуть, коли не впевнені в успіху, але готові спробувати.',
          ru: 'Shot здесь значит попытку, как выстрел в цель. Очень разговорное и дружелюбное выражение. Его говорят, когда не уверены в успехе, но готовы попробовать.',
          en: 'A shot here is an attempt, like aiming at a target. It is very informal and friendly. People say it when they are not sure they will succeed but are ready to try.',
        },
        ex: ['I’ve never baked bread, but I’ll give it a shot.', 'Why not give it a shot? You might love it.'],
        similar: ['to have a go', 'to give it a try'],
        tip: {
          uk: 'Британці частіше кажуть have a go, американці give it a shot.',
          ru: 'Британцы чаще говорят have a go, американцы give it a shot.',
          en: 'British people often say have a go, Americans give it a shot.',
        },
      },
      {
        en: 'third time lucky',
        m: { uk: 'з третьої спроби пощастить', ru: 'с третьей попытки повезёт', en: 'the third attempt will succeed' },
        story: {
          uk: 'Цей британський вираз ідеально пасує до історії пісні: дві перші версії не мали успіху, а з третьої спроби пісня стала світовим хітом. Його кажуть, щоб підбадьорити себе після двох невдач.',
          ru: 'Это британское выражение идеально подходит к истории песни: две первые версии не имели успеха, а с третьей попытки песня стала мировым хитом. Его говорят, чтобы подбодрить себя после двух неудач.',
          en: 'This British phrase fits the song’s story perfectly: the first versions were not successful, but on the next try it became a world hit. People say it to cheer themselves up after two failures.',
        },
        ex: ['I missed the bus twice this week. Third time lucky tomorrow!', 'She failed the test twice, then passed. Third time lucky!'],
        similar: ['to try, try again', 'the third time’s the charm'],
        tip: {
          uk: 'Американці кажуть the third time’s the charm.',
          ru: 'Американцы говорят the third time’s the charm.',
          en: 'Americans say the third time’s the charm.',
        },
      },
      {
        en: 'to make the first move',
        m: { uk: 'зробити перший крок', ru: 'сделать первый шаг', en: 'be the first to act, especially in a friendship or romance' },
        story: {
          uk: 'Move у шахах означає хід. Хтось має зробити перший хід: заговорити першим, запросити, вибачитися. Вираз часто вживають про стосунки та примирення.',
          ru: 'Move в шахматах значит ход. Кто-то должен сделать первый ход: заговорить первым, пригласить, извиниться. Выражение часто используют об отношениях и примирении.',
          en: 'In chess a move is a turn. Someone has to make the first move: speak first, invite or apologise. The phrase is often used about relationships and making up.',
        },
        ex: ['They both wanted to be friends, but nobody made the first move.', 'After the argument, I decided to make the first move and say sorry.'],
        similar: ['to take the first step', 'to break the ice'],
        tip: {
          uk: 'Артикль the обов’язковий: make the first move.',
          ru: 'Артикль the обязателен: make the first move.',
          en: 'The article the is needed: make the first move.',
        },
      },
      {
        en: 'to hit a high note',
        m: { uk: 'взяти високу ноту', ru: 'взять высокую ноту', en: 'sing a very high sound correctly' },
        story: {
          uk: 'Мортен Гаркет славиться дуже високою нотою наприкінці приспіву, яку пробують повторити в караоке по всьому світу. Образно end on a high note означає закінчити щось на позитиві.',
          ru: 'Мортен Харкет славится очень высокой нотой в конце припева, которую пытаются повторить в караоке по всему миру. Образно end on a high note значит закончить что-то на позитиве.',
          en: 'Morten Harket is famous for a very high note in the chorus that people all over the world try to copy at karaoke. Figuratively, end on a high note means to finish something in a positive way.',
        },
        ex: ['Only my sister can hit that high note.', 'We won the last game and ended the season on a high note.'],
        similar: ['to reach a high note', 'to end on a high note'],
        tip: {
          uk: 'Hit тут означає «влучити», як у ціль.',
          ru: 'Hit здесь значит «попасть», как в цель.',
          en: 'Hit here means to reach exactly, like a target.',
        },
      },
      {
        en: 'to bring something to life',
        m: { uk: 'оживити щось', ru: 'оживить что-то', en: 'make something seem real and exciting' },
        story: {
          uk: 'Так кажуть про художників, акторів і вчителів, які роблять щось живим і цікавим. Аніматори кліпу буквально оживили олівцеві малюнки.',
          ru: 'Так говорят о художниках, актёрах и учителях, которые делают что-то живым и интересным. Аниматоры клипа буквально оживили карандашные рисунки.',
          en: 'We say it about artists, actors and teachers who make something lively and interesting. The video’s animators literally brought pencil drawings to life.',
        },
        ex: ['Our history teacher brings the past to life.', 'The actors brought the book to life on stage.'],
        similar: ['to make something come alive', 'to animate'],
        tip: {
          uk: 'Порядок: bring + що + to life. Без артикля перед life.',
          ru: 'Порядок: bring + что + to life. Без артикля перед life.',
          en: 'Word order: bring + something + to life. No article before life.',
        },
      },
      {
        en: 'to step out of your comfort zone',
        m: { uk: 'вийти із зони комфорту', ru: 'выйти из зоны комфорта', en: 'try something new and a bit scary' },
        story: {
          uk: 'Comfort zone це місце, де все звично і безпечно. Вийти з неї означає спробувати щось нове, від чого трохи страшно. Як героїня кліпу, яка вирішує увійти в намальований світ.',
          ru: 'Comfort zone это место, где всё привычно и безопасно. Выйти из неё значит попробовать что-то новое, от чего немного страшно. Как героиня клипа, которая решает войти в нарисованный мир.',
          en: 'Your comfort zone is where everything is familiar and safe. Stepping out of it means trying something new and a little scary, like the girl in the video who enters the drawn world.',
        },
        ex: ['Speaking English on video was out of my comfort zone, but I did it.', 'Camp helped me step out of my comfort zone.'],
        similar: ['to push yourself', 'to try something new'],
        tip: {
          uk: 'Можна і get out of your comfort zone, значення те саме.',
          ru: 'Можно и get out of your comfort zone, значение то же.',
          en: 'You can also say get out of your comfort zone.',
        },
      },
      {
        en: 'to be ahead of its time',
        m: { uk: 'випередити свій час', ru: 'опередить своё время', en: 'be very modern for the time when it was made' },
        story: {
          uk: 'Так кажуть про винаходи, фільми й кліпи, які були надто новаторськими для свого часу. Кліп «Take On Me» з поєднанням відео й анімації часто називають саме таким.',
          ru: 'Так говорят об изобретениях, фильмах и клипах, которые были слишком новаторскими для своего времени. Клип «Take On Me» с сочетанием видео и анимации часто называют именно таким.',
          en: 'We say it about inventions, films and videos that were very innovative for their time. The Take On Me video, which mixes film and animation, is often described like this.',
        },
        ex: ['That old phone was ahead of its time.', 'The artist was ahead of her time.'],
        similar: ['to be cutting-edge', 'to be groundbreaking'],
        tip: {
          uk: 'Займенник змінюється: ahead of his time, ahead of her time.',
          ru: 'Местоимение меняется: ahead of his time, ahead of her time.',
          en: 'Change the pronoun: ahead of his time, ahead of her time.',
        },
      },
      {
        en: 'to stand the test of time',
        m: { uk: 'витримати випробування часом', ru: 'выдержать испытание временем', en: 'stay popular or useful for a long time' },
        story: {
          uk: 'Багато хітів забувають через рік, але деякі слухають десятиліттями. Про такі пісні кажуть, що вони витримали випробування часом. Ця пісня і кліп до неї саме такі.',
          ru: 'Многие хиты забывают через год, но некоторые слушают десятилетиями. О таких песнях говорят, что они выдержали испытание временем. Эта песня и клип к ней именно такие.',
          en: 'Many hits are forgotten after a year, but some are enjoyed for decades. We say those songs have stood the test of time. This song and its video are exactly like that.',
        },
        ex: ['Good fairy tales stand the test of time.', 'Has this video game stood the test of time?'],
        similar: ['to never go out of style', 'to be timeless'],
        tip: {
          uk: 'Минулий час: stood the test of time.',
          ru: 'Прошедшее время: stood the test of time.',
          en: 'The past is stood the test of time.',
        },
      },
    ],
    culture: [
      {
        uk: 'Ротоскопія з’явилася ще на початку XX століття: художники обводили кадри справжнього фільму. Цю техніку використовували в класичних мультфільмах, а кліп a-ha зробив її знову модною.',
        ru: 'Ротоскопия появилась ещё в начале XX века: художники обводили кадры настоящего фильма. Эту технику использовали в классических мультфильмах, а клип a-ha сделал её снова модной.',
        en: 'Rotoscoping appeared in the early 20th century: artists traced over frames of real film. It was used in classic cartoons, and the a-ha video made it fashionable again.',
      },
      {
        uk: 'Норвегія невелика країна, але дала світові багато відомих музикантів. a-ha досі один із найуспішніших норвезьких гуртів в історії.',
        ru: 'Норвегия небольшая страна, но дала миру много известных музыкантов. a-ha до сих пор одна из самых успешных норвежских групп в истории.',
        en: 'Norway is a small country, but it has given the world many famous musicians. a-ha is still one of the most successful Norwegian bands in history.',
      },
      {
        uk: 'Пісню часто використовують у фільмах, серіалах і рекламі як символ 80-х. Кавер-версії записували різні виконавці, від поп-співаків до рок-гуртів.',
        ru: 'Песню часто используют в фильмах, сериалах и рекламе как символ 80-х. Кавер-версии записывали разные исполнители, от поп-певцов до рок-групп.',
        en: 'The song is often used in films, series and adverts as a symbol of the 80s. Many different artists, from pop singers to rock bands, have recorded covers.',
      },
    ],
  },

  'africa': {
    intro: {
      uk: 'Ця пісня про мрію про далекі краї і про вибір між звичним життям і великою пригодою. А ще її історія показує, як інтернет може повернути стару пісню новому поколінню. Нижче зібрано розмовні вирази про подорожі, відстань і популярність. Усі приклади наші власні.',
      ru: 'Эта песня о мечте о далёких краях и о выборе между привычной жизнью и большим приключением. А ещё её история показывает, как интернет может вернуть старую песню новому поколению. Ниже собраны разговорные выражения о путешествиях, расстоянии и популярности. Все примеры наши собственные.',
      en: 'This song is about dreaming of faraway places and choosing between a familiar life and a big adventure. Its story also shows how the internet can bring an old song back to a new generation. Below are everyday expressions about travel, distance and popularity. All the examples are our own.',
    },
    phrases: [
      {
        en: 'wanderlust',
        m: { uk: 'жага мандрів', ru: 'страсть к путешествиям', en: 'a strong wish to travel' },
        story: {
          uk: 'Слово прийшло з німецької: wandern означає мандрувати, а Lust бажання. Англійці взяли його повністю. Його часто бачиш у дописах про подорожі в соцмережах.',
          ru: 'Слово пришло из немецкого: wandern значит странствовать, а Lust желание. Англичане взяли его полностью. Его часто видишь в постах о путешествиях в соцсетях.',
          en: 'The word comes from German: wandern means to wander and Lust means desire. English borrowed it whole. You often see it in travel posts on social media.',
        },
        ex: ['Looking at old maps fills me with wanderlust.', 'Her wanderlust took her to twenty countries.'],
        similar: ['itchy feet', 'a love of travel'],
        tip: {
          uk: 'Це незлічуваний іменник, без a: кажіть I have wanderlust, а не a wanderlust.',
          ru: 'Это неисчисляемое существительное: без a. Говорите I have wanderlust, а не a wanderlust.',
          en: 'It is uncountable: no a. Say I have wanderlust, not a wanderlust.',
        },
      },
      {
        en: 'to have itchy feet',
        m: { uk: 'не сидіти на місці, прагнути подорожей', ru: 'не сидеть на месте, стремиться к путешествиям', en: 'feel a strong need to travel or move' },
        story: {
          uk: 'Коли ноги «сверблять», хочеться кудись іти. Так кажуть про людину, яка довго не подорожувала і вже мріє про нову поїздку чи переїзд.',
          ru: 'Когда ноги «чешутся», хочется куда-то идти. Так говорят о человеке, который давно не путешествовал и уже мечтает о новой поездке или переезде.',
          en: 'When your feet itch, you want to walk somewhere. We say it about a person who has not travelled for a while and is dreaming of a new trip or a move.',
        },
        ex: ['After two years in one city, I’ve got itchy feet.', 'My brother always gets itchy feet in spring.'],
        similar: ['to have wanderlust', 'to have the travel bug'],
        tip: {
          uk: 'Можна і get itchy feet: почати хотіти мандрувати.',
          ru: 'Можно и get itchy feet: начать хотеть путешествовать.',
          en: 'You can also say get itchy feet, meaning to start wanting to travel.',
        },
      },
      {
        en: 'the middle of nowhere',
        m: { uk: 'глушина, далеке безлюдне місце', ru: 'глушь, далёкое безлюдное место', en: 'a place far from towns and people' },
        story: {
          uk: 'Вираз означає місце, яке ніби навіть не позначене на карті: ні магазинів, ні людей, ні інтернету. Інсталяція з піснею «Africa» стоїть якраз у такому місці посеред пустелі.',
          ru: 'Выражение значит место, которое будто даже не отмечено на карте: ни магазинов, ни людей, ни интернета. Инсталляция с песней «Africa» стоит как раз в таком месте посреди пустыни.',
          en: 'The phrase means a place that hardly seems to be on the map: no shops, no people, no internet. The installation playing Africa stands in exactly such a place in the desert.',
        },
        ex: ['Our car broke down in the middle of nowhere.', 'They built a little house in the middle of nowhere.'],
        similar: ['off the beaten track', 'out in the sticks'],
        tip: {
          uk: 'Прийменник in: in the middle of nowhere.',
          ru: 'Предлог in: in the middle of nowhere.',
          en: 'Use in: in the middle of nowhere.',
        },
      },
      {
        en: 'off the beaten track',
        m: { uk: 'далеко від туристичних маршрутів', ru: 'вдали от туристических маршрутов', en: 'away from places most people visit' },
        story: {
          uk: 'Beaten track це протоптана стежка, якою ходять усі. Off the beaten track означає місця, куди туристи майже не доходять. Мандрівники люблять такі місця за спокій і справжнє місцеве життя.',
          ru: 'Beaten track это протоптанная тропа, по которой ходят все. Off the beaten track значит места, куда туристы почти не доходят. Путешественники любят такие места за покой и настоящую местную жизнь.',
          en: 'A beaten track is a path that everyone walks on. Off the beaten track means places that few tourists reach. Travellers love them for their quiet and real local life.',
        },
        ex: ['We found a lovely café off the beaten track.', 'I prefer holidays off the beaten track.'],
        similar: ['the middle of nowhere', 'a hidden gem'],
        tip: {
          uk: 'В американській англійській часто off the beaten path.',
          ru: 'В американском английском часто off the beaten path.',
          en: 'In American English people often say off the beaten path.',
        },
      },
      {
        en: 'to be miles away',
        m: { uk: 'замріятися, думати про своє', ru: 'замечтаться, думать о своём', en: 'not be listening because you are thinking about something else' },
        story: {
          uk: 'Тіло тут, а думки дуже далеко. Так кажуть про людину, яка замріялася і не чує, що їй кажуть. Підходить до пісні про мрії про далекий край.',
          ru: 'Тело здесь, а мысли очень далеко. Так говорят о человеке, который замечтался и не слышит, что ему говорят. Подходит к песне о мечтах о далёком крае.',
          en: 'Your body is here, but your thoughts are far away. We say it about someone who is daydreaming and doesn’t hear what people say. It suits a song about dreaming of a distant land.',
        },
        ex: ['Sorry, what did you say? I was miles away.', 'In maths class he’s always miles away.'],
        similar: ['to daydream', 'to have your head in the clouds'],
        tip: {
          uk: 'Найчастіше в минулому: I was miles away. Буквально it’s miles away означає «дуже далеко».',
          ru: 'Чаще всего в прошедшем: I was miles away. Буквально it’s miles away значит «очень далеко».',
          en: 'Usually in the past: I was miles away. Literally, it’s miles away means very far.',
        },
      },
      {
        en: 'to go the extra mile',
        m: { uk: 'докласти додаткових зусиль', ru: 'приложить дополнительные усилия', en: 'do more than people expect' },
        story: {
          uk: 'Пройти ще одну милю, коли від тебе цього не чекають. Так кажуть про людей, які роблять більше, ніж треба: допомагають, стараються, піклуються.',
          ru: 'Пройти ещё одну милю, когда от тебя этого не ждут. Так говорят о людях, которые делают больше, чем нужно: помогают, стараются, заботятся.',
          en: 'Walking one more mile when nobody expects it. We say it about people who do more than they have to: they help, try hard and care.',
        },
        ex: ['Our guide went the extra mile and showed us a secret waterfall.', 'Good teachers go the extra mile for their students.'],
        similar: ['to go above and beyond', 'to make an extra effort'],
        tip: {
          uk: 'Артикль the обов’язковий: go the extra mile.',
          ru: 'Артикль the обязателен: go the extra mile.',
          en: 'Use the: go the extra mile.',
        },
      },
      {
        en: 'an earworm',
        m: { uk: 'мелодія, що «застрягла» в голові', ru: 'мелодия, которая «застряла» в голове', en: 'a tune that keeps playing in your mind' },
        story: {
          uk: 'Буквально «вушний черв’як». Слово прийшло з німецької Ohrwurm. Так називають пісні, які ти мимоволі наспівуєш увесь день. «Africa» часто наводять як приклад.',
          ru: 'Буквально «ушной червяк». Слово пришло из немецкого Ohrwurm. Так называют песни, которые ты невольно напеваешь весь день. «Africa» часто приводят как пример.',
          en: 'Literally an ear worm. The word comes from the German Ohrwurm. It describes songs you can’t stop humming all day. Africa is often given as an example.',
        },
        ex: ['That advert jingle is a terrible earworm.', 'I’ve had an earworm since breakfast.'],
        similar: ['a catchy tune', 'to be stuck in your head'],
        tip: {
          uk: 'Часто кажуть: This song is stuck in my head.',
          ru: 'Часто говорят: This song is stuck in my head.',
          en: 'People often say: This song is stuck in my head.',
        },
      },
      {
        en: 'to go viral',
        m: { uk: 'стати вірусним, швидко поширитися в інтернеті', ru: 'стать вирусным, быстро распространиться в интернете', en: 'spread very quickly online' },
        story: {
          uk: 'Як вірус передається від людини до людини, так відео чи мем швидко поширюється в мережі. Прохання фанатки до гурту Weezer записати кавер теж стало вірусним, і гурт погодився.',
          ru: 'Как вирус передаётся от человека к человеку, так видео или мем быстро распространяется в сети. Просьба фанатки к группе Weezer записать кавер тоже стала вирусной, и группа согласилась.',
          en: 'Just as a virus spreads from person to person, a video or meme spreads fast online. A fan’s request for Weezer to cover the song also went viral, and the band agreed.',
        },
        ex: ['Her video of a dancing parrot went viral.', 'The challenge went viral in one week.'],
        similar: ['to spread like wildfire', 'to blow up online'],
        tip: {
          uk: 'Минулий час: went viral. Прикметник: a viral video.',
          ru: 'Прошедшее время: went viral. Прилагательное: a viral video.',
          en: 'The past is went viral. The adjective: a viral video.',
        },
      },
      {
        en: 'a long way from home',
        m: { uk: 'далеко від дому', ru: 'далеко от дома', en: 'very far from where you live' },
        story: {
          uk: 'Простий, але дуже емоційний вираз. Його кажуть студенти за кордоном, мандрівники та всі, хто сумує за домом. Часто додають feeling homesick.',
          ru: 'Простое, но очень эмоциональное выражение. Его говорят студенты за границей, путешественники и все, кто скучает по дому. Часто добавляют feeling homesick.',
          en: 'A simple but emotional phrase. Students abroad, travellers and anyone who misses home use it. People often add feeling homesick.',
        },
        ex: ['She was a long way from home, but she made new friends.', 'It’s a long way from home, so call us every day.'],
        similar: ['far from home', 'miles from home'],
        tip: {
          uk: 'Homesick означає сумувати за домом: I feel homesick.',
          ru: 'Homesick значит скучать по дому: I feel homesick.',
          en: 'Homesick means missing home: I feel homesick.',
        },
      },
      {
        en: 'to see the world',
        m: { uk: 'побачити світ, багато подорожувати', ru: 'повидать мир, много путешествовать', en: 'travel to many different countries' },
        story: {
          uk: 'Дуже поширена мрія і вираз: побачити світ означає відвідати багато країн і познайомитися з різними культурами. Його часто кажуть молоді люди перед навчанням або роботою за кордоном.',
          ru: 'Очень распространённая мечта и выражение: повидать мир значит побывать во многих странах и познакомиться с разными культурами. Его часто говорят молодые люди перед учёбой или работой за границей.',
          en: 'A very common dream and phrase: to see the world means to visit many countries and get to know different cultures. Young people often say it before studying or working abroad.',
        },
        ex: ['My aunt worked on a ship so she could see the world.', 'Before university, I want to see the world.'],
        similar: ['to travel the world', 'to go globetrotting'],
        tip: {
          uk: 'Артикль the обов’язковий: see the world, travel the world.',
          ru: 'Артикль the обязателен: see the world, travel the world.',
          en: 'Use the: see the world, travel the world.',
        },
      },
    ],
    culture: [
      {
        uk: 'Учасники Toto спочатку працювали сесійними музикантами в Лос-Анджелесі, тобто грали в студії на записах інших зірок. Вони звучать на багатьох відомих альбомах 70-х і 80-х.',
        ru: 'Участники Toto сначала работали сессионными музыкантами в Лос-Анджелесе, то есть играли в студии на записях других звёзд. Они звучат на многих известных альбомах 70-х и 80-х.',
        en: 'Toto’s members started as session musicians in Los Angeles, playing in the studio on other stars’ records. You can hear them on many famous albums from the 70s and 80s.',
      },
      {
        uk: 'Пустеля Наміб у південно-західній Африці вважається однією з найдавніших пустель на Землі. Саме туди художник поставив колонки, щоб пісня «звучала вічно», поки їх не зруйнують пісок і сонце.',
        ru: 'Пустыня Намиб в юго-западной Африке считается одной из древнейших пустынь на Земле. Именно туда художник поставил колонки, чтобы песня «звучала вечно», пока их не разрушат песок и солнце.',
        en: 'The Namib Desert in south-western Africa is thought to be one of the oldest deserts on Earth. That is where the artist put his speakers so the song would play forever, or until sand and sun destroy them.',
      },
      {
        uk: 'В інтернеті «Africa» стала популярним мемом: її жартома вмикають у несподіваних ситуаціях і роблять смішні версії. Завдяки цьому підлітки знають пісню не гірше, ніж їхні батьки.',
        ru: 'В интернете «Africa» стала популярным мемом: её в шутку включают в неожиданных ситуациях и делают смешные версии. Благодаря этому подростки знают песню не хуже, чем их родители.',
        en: 'Online, Africa became a popular meme: people play it as a joke in unexpected situations and make funny versions. Because of this, teenagers know the song as well as their parents do.',
      },
    ],
  },
};
