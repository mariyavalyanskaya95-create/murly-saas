// Додаткові пісні (частина C): Lady Gaga, Billie Eilish, Bruno Mars. Тексти пісень не публікуємо: лише власні пояснення й вправи.
import type { Song } from './songs';
import type { SongLesson } from './songs-more';
import type { SongDeep } from './songs-deep';

export const SONGS_EXTRA: Song[] = [
  {
    id: 'born-this-way', artist: 'Lady Gaga', title: 'Born This Way', yt: 'wV1FrqwZyKw', year: 2011, level: 'B1', age: 'teens',
    about: { uk: 'Енергійний гімн про те, що кожна людина цінна такою, якою вона є, з усіма своїми відмінностями. Кліп дуже театральний: фантастичний вступ, незвичайний грим і костюми, тому радимо 13+ і спершу переглянути вчителю.', ru: 'Энергичный гимн о том, что каждый человек ценен таким, какой он есть, со всеми своими отличиями. Клип очень театральный: фантастическое вступление, необычный грим и костюмы, поэтому советуем 13+ и сначала посмотреть учителю.', en: 'An energetic anthem about how every person is valuable just as they are, with all their differences. The video is very theatrical, with a sci-fi intro, unusual make-up and costumes, so 13+ and teachers should watch it first.' },
    grammar: { uk: 'Пасив із born: I was born in Kyiv. Where were you born? Ми завжди кажемо was/were born, а не I born.', ru: 'Пассив с born: I was born in Kyiv. Where were you born? Мы всегда говорим was/were born, а не I born.', en: 'Passive with born: I was born in Kyiv. Where were you born? Always say was/were born, never I born.' },
    phrases: [
      { en: 'born this way', m: { uk: 'таким(ою) народився(лася), це частина мене', ru: 'таким(ой) родился(ась), это часть меня', en: 'this is how I have always been' }, ex: 'I’ve always been left-handed. I was born this way.' },
      { en: 'be proud of', m: { uk: 'пишатися', ru: 'гордиться', en: 'feel good about who you are or what you did' }, ex: 'I’m proud of my little sister, she learned to swim.' },
      { en: 'fit in', m: { uk: 'вписатися, бути «своїм»', ru: 'вписаться, быть «своим»', en: 'feel accepted in a group' }, ex: 'At first I didn’t fit in at the new club, but now I have friends there.' },
      { en: 'stand out', m: { uk: 'вирізнятися, бути помітним', ru: 'выделяться, быть заметным', en: 'be easy to notice because you are different' }, ex: 'Her yellow coat really stands out in the crowd.' },
      { en: 'one of a kind', m: { uk: 'єдиний у своєму роді, неповторний', ru: 'единственный в своём роде, неповторимый', en: 'unique, there is nobody like them' }, ex: 'My grandpa is one of a kind, he tells the best stories.' },
    ],
    talk: ['What makes you different from your friends?', 'Is it better to fit in or to stand out? Why?', 'What are you proud of this year?'],
  },
  {
    id: 'million-reasons', artist: 'Lady Gaga', title: 'Million Reasons', yt: 'en2D_5TzXCA', year: 2016, level: 'B1', age: 'teens',
    about: { uk: 'Спокійна балада про важкий момент у стосунках: є багато причин здатися, але людина шукає бодай одну причину лишитися. Пісня про сумніви, складні рішення і віру в людей.', ru: 'Спокойная баллада о тяжёлом моменте в отношениях: есть много причин сдаться, но человек ищет хотя бы одну причину остаться. Песня о сомнениях, трудных решениях и вере в людей.', en: 'A calm ballad about a hard moment in a relationship: there are many reasons to give up, but the person is looking for one reason to stay. A song about doubt, difficult decisions and believing in people.' },
    grammar: { uk: 'Reason to + дієслово, reason for + іменник, the reason why... Великі числа: a hundred, a thousand, millions of.', ru: 'Reason to + глагол, reason for + существительное, the reason why... Большие числа: a hundred, a thousand, millions of.', en: 'Reason to + verb, reason for + noun, the reason why... Big numbers: a hundred, a thousand, millions of.' },
    phrases: [
      { en: 'a million reasons', m: { uk: 'мільйон причин, дуже багато причин', ru: 'миллион причин, очень много причин', en: 'very many reasons' }, ex: 'There are a million reasons to visit Lviv in winter.' },
      { en: 'make up your mind', m: { uk: 'вирішити, визначитися', ru: 'решить, определиться', en: 'decide' }, ex: 'Pizza or pasta? Make up your mind, the waiter is coming!' },
      { en: 'think twice', m: { uk: 'добре подумати, перш ніж щось зробити', ru: 'хорошо подумать, прежде чем что-то сделать', en: 'think carefully before you act' }, ex: 'Think twice before you post a photo of your friend.' },
      { en: 'have second thoughts', m: { uk: 'засумніватися в рішенні', ru: 'засомневаться в решении', en: 'start to doubt a decision' }, ex: 'I bought the ticket, but now I’m having second thoughts.' },
      { en: 'give it a try', m: { uk: 'спробувати', ru: 'попробовать', en: 'try something' }, ex: 'I’ve never played chess, but I’ll give it a try.' },
    ],
    talk: ['How do you make up your mind when a decision is hard?', 'Have you ever had second thoughts after a decision?', 'What is one good reason to learn English?'],
  },
  {
    id: 'always-remember-us-this-way', artist: 'Lady Gaga', title: 'Always Remember Us This Way', yt: '5vheNbQlsyU', year: 2018, level: 'B1', age: 'teens',
    about: { uk: 'Ніжна фортепіанна балада з фільму «Народження зірки». Про особливий момент із близькою людиною, який хочеться зберегти в пам’яті назавжди, хай що станеться далі. Сам фільм для дорослої аудиторії, але пісня й кліп підходять підліткам.', ru: 'Нежная фортепианная баллада из фильма «Звезда родилась». Об особенном моменте с близким человеком, который хочется сохранить в памяти навсегда, что бы ни случилось дальше. Сам фильм для взрослой аудитории, но песня и клип подходят подросткам.', en: 'A gentle piano ballad from the film A Star Is Born. It is about a special moment with someone close that you want to keep in your memory, whatever happens next. The film itself is for adults, but the song and video are fine for teens.' },
    grammar: { uk: 'Remember + -ing (пам’ятаю, як щось було) і remember + to (не забути щось зробити). I remember meeting her. Remember to call me.', ru: 'Remember + -ing (помню, как что-то было) и remember + to (не забыть что-то сделать). I remember meeting her. Remember to call me.', en: 'Remember + -ing (a memory of the past) and remember + to (don’t forget a task). I remember meeting her. Remember to call me.' },
    phrases: [
      { en: 'always remember', m: { uk: 'завжди пам’ятати', ru: 'всегда помнить', en: 'keep something in your memory' }, ex: 'I will always remember my first day at school.' },
      { en: 'bring back memories', m: { uk: 'навівати спогади', ru: 'навевать воспоминания', en: 'make you remember the past' }, ex: 'This old song brings back memories of our summer camp.' },
      { en: 'never forget', m: { uk: 'ніколи не забути', ru: 'никогда не забыть', en: 'always remember' }, ex: 'I’ll never forget the day we got our puppy.' },
      { en: 'look back on', m: { uk: 'озиратися назад, згадувати', ru: 'оглядываться назад, вспоминать', en: 'think about a time in the past' }, ex: 'When I look back on primary school, I smile.' },
      { en: 'the good old days', m: { uk: 'старі добрі часи', ru: 'старые добрые времена', en: 'a happy time in the past' }, ex: 'My dad often talks about the good old days with his band.' },
    ],
    talk: ['Which day of your life will you always remember?', 'What song brings back memories for you?', 'Do you like looking at old photos? Why?'],
  },
  {
    id: 'die-with-a-smile', artist: 'Lady Gaga, Bruno Mars', title: 'Die With A Smile', yt: 'kPa7bsKwL-c', year: 2024, level: 'B1', age: 'teens',
    about: { uk: 'Романтичний дует: хай що станеться, навіть у найгіршій ситуації людина хоче бути поруч із тим, кого любить. Назва звучить драматично, але йдеться про щастя і вдячність за кожну хвилину разом. Кліп стилізований під старе музичне телешоу.', ru: 'Романтический дуэт: что бы ни случилось, даже в самой плохой ситуации человек хочет быть рядом с тем, кого любит. Название звучит драматично, но речь о счастье и благодарности за каждую минуту вместе. Клип стилизован под старое музыкальное телешоу.', en: 'A romantic duet: whatever happens, even in the worst situation, the person wants to be with the one they love. The title sounds dramatic, but it is about happiness and being grateful for every minute together. The video looks like an old TV music show.' },
    grammar: { uk: 'Другий умовний: If + Past Simple, would + дієслово. Уявні ситуації: If I had a free day, I would sleep till noon.', ru: 'Второе условное: If + Past Simple, would + глагол. Воображаемые ситуации: If I had a free day, I would sleep till noon.', en: 'Second conditional: If + Past Simple, would + verb. Imaginary situations: If I had a free day, I would sleep till noon.' },
    phrases: [
      { en: 'with a smile', m: { uk: 'з усмішкою', ru: 'с улыбкой', en: 'smiling, happily' }, ex: 'She answered all the hard questions with a smile.' },
      { en: 'make the most of', m: { uk: 'використати щось якнайкраще', ru: 'использовать что-то по максимуму', en: 'use something as well as you can' }, ex: 'It’s sunny today, let’s make the most of it and go to the park.' },
      { en: 'live in the moment', m: { uk: 'жити теперішнім моментом', ru: 'жить настоящим моментом', en: 'enjoy now, don’t worry about later' }, ex: 'On holiday I put my phone away and live in the moment.' },
      { en: 'spend time with', m: { uk: 'проводити час з', ru: 'проводить время с', en: 'be together with someone' }, ex: 'At weekends I spend time with my grandparents.' },
      { en: 'every moment counts', m: { uk: 'кожна мить важлива', ru: 'каждое мгновение важно', en: 'every little bit of time matters' }, ex: 'The exam is in a week, so every moment counts.' },
    ],
    talk: ['If you had one perfect day, who would you spend it with?', 'How do you make the most of your weekends?', 'Is it easy for you to live in the moment?'],
  },
  {
    id: 'birds-of-a-feather', artist: 'Billie Eilish', title: 'BIRDS OF A FEATHER', yt: 'V9PVRfjEBTI', year: 2024, level: 'B1', age: 'teens',
    about: { uk: 'Тепла пісня про кохання: двоє людей такі близькі й схожі, що хочуть бути разом якомога довше. Назва походить з англійського прислів’я про те, що схожі люди тягнуться одне до одного.', ru: 'Тёплая песня о любви: двое людей такие близкие и похожие, что хотят быть вместе как можно дольше. Название пришло из английской пословицы о том, что похожие люди тянутся друг к другу.', en: 'A warm love song: two people are so close and so alike that they want to be together for as long as possible. The title comes from an English proverb about similar people being drawn to each other.' },
    grammar: { uk: 'Як сказати про схожість: both, the same as, similar to, so do I, neither do I.', ru: 'Как сказать о сходстве: both, the same as, similar to, so do I, neither do I.', en: 'Talking about similarity: both, the same as, similar to, so do I, neither do I.' },
    phrases: [
      { en: 'birds of a feather', m: { uk: 'одного поля ягоди, схожі люди', ru: 'одного поля ягоды, похожие люди', en: 'people who are very similar' }, ex: 'Max and Leo both love robots. They’re birds of a feather.' },
      { en: 'have a lot in common', m: { uk: 'мати багато спільного', ru: 'иметь много общего', en: 'share many interests or qualities' }, ex: 'My cousin and I have a lot in common, we both draw comics.' },
      { en: 'get along', m: { uk: 'ладнати, мати добрі стосунки', ru: 'ладить, хорошо общаться', en: 'have a friendly relationship' }, ex: 'Our cat and dog get along really well.' },
      { en: 'hit it off', m: { uk: 'одразу знайти спільну мову', ru: 'сразу найти общий язык', en: 'like each other from the first meeting' }, ex: 'We met at the summer camp and hit it off immediately.' },
      { en: 'a soulmate', m: { uk: 'споріднена душа, «друга половинка»', ru: 'родственная душа, «вторая половинка»', en: 'a person who understands you perfectly' }, ex: 'My grandparents say they are soulmates.' },
    ],
    talk: ['Who do you have a lot in common with?', 'Do you think opposite people can be good friends?', 'Have you ever hit it off with someone at once? Where?'],
  },
  {
    id: 'ocean-eyes', artist: 'Billie Eilish', title: 'ocean eyes', yt: 'viimfQi_pUw', year: 2016, level: 'A2-B1', age: 'teens',
    about: { uk: 'Тиха мрійлива пісня, з якої почалася кар’єра Біллі. Людина не може відвести погляд від чиїхось очей, глибоких і спокійних, як океан. Про перше захоплення і хвилювання.', ru: 'Тихая мечтательная песня, с которой началась карьера Билли. Человек не может отвести взгляд от чьих-то глаз, глубоких и спокойных, как океан. О первой влюблённости и волнении.', en: 'A quiet, dreamy song that started Billie’s career. Someone can’t look away from a person’s eyes, deep and calm like the ocean. It is about a first crush and the nervous feeling it brings.' },
    grammar: { uk: 'Look + прикметник і look like + іменник: She looks calm. He looks like his dad. What does she look like?', ru: 'Look + прилагательное и look like + существительное: She looks calm. He looks like his dad. What does she look like?', en: 'Look + adjective and look like + noun: She looks calm. He looks like his dad. What does she look like?' },
    phrases: [
      { en: 'ocean eyes', m: { uk: 'очі кольору океану, глибокі очі', ru: 'глаза цвета океана, глубокие глаза', en: 'eyes that are blue-green and deep like the sea' }, ex: 'The girl in the painting has ocean eyes.' },
      { en: 'have a crush on someone', m: { uk: 'бути закоханим, мати симпатію', ru: 'быть влюблённым, испытывать симпатию', en: 'secretly like someone romantically' }, ex: 'In year 5 I had a crush on a boy from the chess club.' },
      { en: 'butterflies in your stomach', m: { uk: 'метелики в животі, хвилювання', ru: 'бабочки в животе, волнение', en: 'a nervous, excited feeling' }, ex: 'I always get butterflies in my stomach before a concert.' },
      { en: 'catch someone’s eye', m: { uk: 'привернути чиюсь увагу', ru: 'привлечь чьё-то внимание', en: 'make someone notice you' }, ex: 'A red bike in the shop window caught my eye.' },
      { en: 'look into someone’s eyes', m: { uk: 'дивитися комусь в очі', ru: 'смотреть кому-то в глаза', en: 'look straight at someone’s eyes' }, ex: 'Look into my eyes and tell me the truth.' },
    ],
    talk: ['What colour are your eyes? Who has the same eyes in your family?', 'What usually catches your eye in a shop?', 'When do you get butterflies in your stomach?'],
  },
  {
    id: 'my-future', artist: 'Billie Eilish', title: 'my future', yt: 'Dm9Zf1WYQ_A', year: 2020, level: 'B1', age: 'teens',
    about: { uk: 'Спокійна і світла пісня про дорослішання. Людина зараз сама, але не самотня: вона з нетерпінням чекає, якою стане в майбутньому. Пісня починається повільно, а посередині стає бадьорішою. Кліп анімаційний.', ru: 'Спокойная и светлая песня о взрослении. Человек сейчас один, но не одинок: он с нетерпением ждёт, каким станет в будущем. Песня начинается медленно, а в середине становится бодрее. Клип анимационный.', en: 'A calm, hopeful song about growing up. The person is on their own now but not lonely, and they are excited about who they will become. It starts slowly and gets more upbeat in the middle. The video is animated.' },
    grammar: { uk: 'Майбутнє: will (рішення, прогноз), be going to (план), Present Continuous (домовленість). I’m going to study design. I’m meeting Ann at five.', ru: 'Будущее: will (решение, прогноз), be going to (план), Present Continuous (договорённость). I’m going to study design. I’m meeting Ann at five.', en: 'The future: will (decisions, predictions), be going to (plans), Present Continuous (arrangements). I’m going to study design. I’m meeting Ann at five.' },
    phrases: [
      { en: 'look forward to', m: { uk: 'з нетерпінням чекати', ru: 'с нетерпением ждать', en: 'feel happy about something that will happen' }, ex: 'I’m looking forward to the summer holidays.' },
      { en: 'a fresh start', m: { uk: 'новий початок', ru: 'новое начало', en: 'a chance to begin again' }, ex: 'A new school year is a fresh start for everyone.' },
      { en: 'set a goal', m: { uk: 'поставити мету', ru: 'поставить цель', en: 'decide what you want to achieve' }, ex: 'This month I set a goal to read three books.' },
      { en: 'future self', m: { uk: 'ти в майбутньому', ru: 'ты в будущем', en: 'the person you will be later' }, ex: 'Save some money now, your future self will thank you.' },
      { en: 'dream big', m: { uk: 'мріяти по-великому', ru: 'мечтать по-крупному', en: 'have big hopes and plans' }, ex: 'My coach always tells us to dream big.' },
    ],
    talk: ['What are you looking forward to this year?', 'What would you like to tell your future self?', 'Is it OK to spend time on your own? Why?'],
  },
  {
    id: 'count-on-me', artist: 'Bruno Mars', title: 'Count on Me', yt: '6k8cpUkKK4c', year: 2010, level: 'A2', age: 'all',
    about: { uk: 'Весела дружня пісня під укулеле про справжню дружбу: друзі завжди допомагають одне одному, хай що трапиться. Чудово підходить для дітей. Офіційного кліпу немає, тому тут офіційне лірик-відео.', ru: 'Весёлая дружеская песня под укулеле о настоящей дружбе: друзья всегда помогают друг другу, что бы ни случилось. Отлично подходит для детей. Официального клипа нет, поэтому здесь официальное лирик-видео.', en: 'A happy ukulele song about true friendship: friends always help each other, whatever happens. Great for kids. There is no official music video, so this is the official lyric video.' },
    grammar: { uk: 'Перший умовний: If + Present Simple, will + дієслово. If you are sad, I will call you.', ru: 'Первое условное: If + Present Simple, will + глагол. If you are sad, I will call you.', en: 'First conditional: If + Present Simple, will + verb. If you are sad, I will call you.' },
    phrases: [
      { en: 'count on someone', m: { uk: 'розраховувати на когось', ru: 'рассчитывать на кого-то', en: 'trust someone to help you' }, ex: 'You can count on me, I’ll bring the ball.' },
      { en: 'a best friend', m: { uk: 'найкращий друг, найкраща подруга', ru: 'лучший друг, лучшая подруга', en: 'your closest friend' }, ex: 'My best friend lives next door.' },
      { en: 'lend a hand', m: { uk: 'допомогти', ru: 'помочь', en: 'help someone' }, ex: 'Can you lend a hand with these bags?' },
      { en: 'keep in touch', m: { uk: 'підтримувати зв’язок', ru: 'поддерживать связь', en: 'talk or write to someone regularly' }, ex: 'My friend moved to Odesa, but we keep in touch.' },
      { en: 'have someone’s back', m: { uk: 'підтримувати когось, бути на чиємусь боці', ru: 'поддерживать кого-то, быть на чьей-то стороне', en: 'be ready to support someone' }, ex: 'Don’t worry about the test, I’ve got your back.' },
    ],
    talk: ['Who can you always count on?', 'How do you help your best friend?', 'How do you keep in touch with friends who live far away?'],
  },
];

export const MORE_C: Record<string, SongLesson> = {
  'born-this-way': {
    facts: [
      { uk: 'Пісня вийшла в лютому 2011 року як перший сингл і заголовна пісня альбому «Born This Way».', ru: 'Песня вышла в феврале 2011 года как первый сингл и заглавная песня альбома «Born This Way».', en: 'The song came out in February 2011 as the first single and title track of the album Born This Way.' },
      { uk: 'Пісня одразу дебютувала на першому місці чарту Billboard Hot 100 і стала тисячною піснею номер один в історії цього чарту.', ru: 'Песня сразу дебютировала на первом месте чарта Billboard Hot 100 и стала тысячной песней номер один в истории этого чарта.', en: 'It debuted at number one on the Billboard Hot 100 and became the 1,000th number one in the history of that chart.' },
      { uk: 'Уперше наживо Леді Гага виконала пісню на церемонії «Греммі» 2011 року, куди її принесли всередині величезного «яйця».', ru: 'Впервые вживую Леди Гага исполнила песню на церемонии «Грэмми» 2011 года, куда её принесли внутри огромного «яйца».', en: 'Lady Gaga first sang it live at the 2011 Grammy Awards, where she arrived inside a giant egg.' },
      { uk: 'Кліп триває близько семи хвилин. Його зняв відомий модний фотограф Нік Найт.', ru: 'Клип длится около семи минут. Его снял известный модный фотограф Ник Найт.', en: 'The music video is about seven minutes long. It was directed by the famous fashion photographer Nick Knight.' },
      { uk: 'У 2021 році до 10-річчя альбому вийшло спеціальне видання, де інші артисти записали свої версії пісень.', ru: 'В 2021 году к 10-летию альбома вышло специальное издание, где другие артисты записали свои версии песен.', en: 'In 2021, for the album’s 10th anniversary, a special edition came out with other artists recording their own versions of the songs.' },
    ],
    warmup: [
      'What makes a person special?',
      'Do you like people who look or dress differently? Why?',
      'Where were you born? Where were your parents born?',
    ],
    vocab: [
      {
        group: { uk: 'Особистість', ru: 'Личность', en: 'Identity' },
        items: [
          { en: 'unique', uk: 'унікальний, неповторний', ru: 'уникальный, неповторимый', ex: 'Every snowflake is unique.' },
          { en: 'self-confidence', uk: 'впевненість у собі', ru: 'уверенность в себе', ex: 'Drama club gave me a lot of self-confidence.' },
          { en: 'accept', uk: 'приймати', ru: 'принимать', ex: 'My friends accept me with all my strange hobbies.' },
          { en: 'an identity', uk: 'ідентичність, хто ти є', ru: 'идентичность, кто ты есть', ex: 'Language is an important part of our identity.' },
          { en: 'a difference', uk: 'відмінність, різниця', ru: 'отличие, разница', ex: 'Can you see the difference between these two photos?' },
        ],
      },
      {
        group: { uk: 'Повага і доброта', ru: 'Уважение и доброта', en: 'Respect and kindness' },
        items: [
          { en: 'respect', uk: 'повага; поважати', ru: 'уважение; уважать', ex: 'We respect our teacher because she is fair.' },
          { en: 'include', uk: 'включати, приймати до компанії', ru: 'включать, принимать в компанию', ex: 'Let’s include the new girl in our game.' },
          { en: 'equal', uk: 'рівний', ru: 'равный', ex: 'All players are equal in this game.' },
          { en: 'support', uk: 'підтримувати; підтримка', ru: 'поддерживать; поддержка', ex: 'My family supports me before every match.' },
          { en: 'a community', uk: 'спільнота', ru: 'сообщество', ex: 'Our town has a big community of volunteers.' },
        ],
      },
      {
        group: { uk: 'Сцена і стиль', ru: 'Сцена и стиль', en: 'Stage and style' },
        items: [
          { en: 'a costume', uk: 'костюм (сценічний)', ru: 'костюм (сценический)', ex: 'I made a dragon costume for the school show.' },
          { en: 'make-up', uk: 'макіяж, грим', ru: 'макияж, грим', ex: 'Actors wear a lot of make-up on stage.' },
          { en: 'a stage', uk: 'сцена', ru: 'сцена', ex: 'My legs were shaking when I walked onto the stage.' },
          { en: 'a performance', uk: 'виступ', ru: 'выступление', ex: 'Her performance at the concert was amazing.' },
          { en: 'bold', uk: 'сміливий, яскравий', ru: 'смелый, яркий', ex: 'She likes bold colours like orange and purple.' },
        ],
      },
    ],
    grammar: {
      uk: 'Born в англійській працює як пасив: be + born. Тому ми кажемо I was born (я народився), she was born, they were born. Питання: Where were you born? When was your brother born? Не можна сказати I born або I am born in 2010. Про дату: in 2010, in May, on 5 May. Про місце: in Kyiv, in Ukraine. Такий самий пасив у минулому: The house was built in 1990. The song was written by Lady Gaga.',
      ru: 'Born в английском работает как пассив: be + born. Поэтому мы говорим I was born (я родился), she was born, they were born. Вопрос: Where were you born? When was your brother born? Нельзя сказать I born или I am born in 2010. О дате: in 2010, in May, on 5 May. О месте: in Kyiv, in Ukraine. Такой же пассив в прошлом: The house was built in 1990. The song was written by Lady Gaga.',
      en: 'In English born works as a passive: be + born. So we say I was born, she was born, they were born. Questions: Where were you born? When was your brother born? You cannot say I born or I am born in 2010. For dates: in 2010, in May, on 5 May. For places: in Kyiv, in Ukraine. The same past passive: The house was built in 1990. The song was written by Lady Gaga.',
    },
    grammarEx: [
      { q: 'I ___ born in Lviv.', opts: ['was', 'am', 'did'], a: 'was' },
      { q: 'Where ___ your parents born?', opts: ['were', 'was', 'did'], a: 'were' },
      { q: 'My little sister was born ___ 2019.', opts: ['in', 'on', 'at'], a: 'in' },
      { q: 'Our cat was born ___ 3 April.', opts: ['on', 'in', 'at'], a: 'on' },
      { q: 'When ___ your grandma born?', opts: ['was', 'were', 'is'], a: 'was' },
      { q: 'This bridge ___ built a hundred years ago.', opts: ['was', 'were', 'is'], a: 'was' },
      { q: 'The songs on this album were ___ by Lady Gaga.', opts: ['written', 'wrote', 'write'], a: 'written' },
      { q: 'We ___ born in the same hospital!', opts: ['were', 'was', 'are'], a: 'were' },
    ],
    gapfill: [
      { q: 'There is nobody like you. You are ___.', a: 'unique' },
      { q: 'Speaking in public gave her more self-___.', a: 'confidence' },
      { q: 'Let’s ___ everyone in the game, not only our friends.', a: 'include' },
      { q: 'Boys and girls should have ___ chances.', a: 'equal' },
      { q: 'For Halloween I wore a pirate ___.', a: 'costume' },
      { q: 'The band came onto the ___ and everyone cheered.', a: 'stage' },
      { q: 'That was a great ___! Everyone clapped.', a: 'performance' },
      { q: 'Good friends ___ you as you are.', a: 'accept' },
    ],
    listen: [
      { uk: 'Послухай початок. Пісня швидка чи повільна? Під неї хочеться танцювати чи сидіти тихо?', ru: 'Послушай начало. Песня быстрая или медленная? Под неё хочется танцевать или сидеть тихо?', en: 'Listen to the beginning. Is the song fast or slow? Does it make you want to dance or sit quietly?' },
      { uk: 'Порахуй, скільки разів ти чуєш назву пісні.', ru: 'Посчитай, сколько раз ты слышишь название песни.', en: 'Count how many times you hear the title of the song.' },
      { uk: 'Які інструменти ти чуєш: синтезатор, барабани, гітару, фортепіано? Відміть, що почув(ла).', ru: 'Какие инструменты ты слышишь: синтезатор, барабаны, гитару, фортепиано? Отметь, что услышал(а).', en: 'Which instruments can you hear: synthesizer, drums, guitar, piano? Tick what you hear.' },
      { uk: 'Кліп починається з довгого вступу, схожого на фантастичний фільм. Опиши трьома прикметниками, як він виглядає.', ru: 'Клип начинается с длинного вступления, похожего на фантастический фильм. Опиши тремя прилагательными, как он выглядит.', en: 'The video starts with a long intro like a sci-fi film. Describe how it looks with three adjectives.' },
    ],
    speaking: [
      'What is unique about you?',
      'Is it easy for teenagers to fit in at school? Why or why not?',
      'How can a class include a new student?',
      'Who is a person you respect? Why?',
      'Do you like bold styles in clothes and make-up? Why or why not?',
      'Why do you think so many people love this song?',
    ],
    roleplay: {
      uk: 'A: ти прийшов(ла) в новий гурток і почуваєшся «не таким(ою)», як усі. B: ти давній учасник гуртка. Підтримай новачка, розпитай про його захоплення і поясни, чому відмінності роблять команду сильнішою.',
      ru: 'A: ты пришёл(ла) в новый кружок и чувствуешь себя «не таким(ой)», как все. B: ты давний участник кружка. Поддержи новичка, расспроси о его увлечениях и объясни, почему отличия делают команду сильнее.',
      en: 'A: you have joined a new club and feel different from everyone. B: you have been in the club for a long time. Support the new member, ask about their hobbies and explain why differences make a team stronger.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) «Що робить мене мною». Розкажи, де ти народився(лася), що в тобі особливого і чим ти пишаєшся. Використай was born і щонайменше три слова з уроку.',
      ru: 'Напиши короткий текст (60-100 слов) «Что делает меня мной». Расскажи, где ты родился(ась), что в тебе особенного и чем ты гордишься. Используй was born и как минимум три слова из урока.',
      en: 'Write a short text (60-100 words) called What makes me me. Say where you were born, what is special about you and what you are proud of. Use was born and at least three words from the lesson.',
    },
  },

  'million-reasons': {
    facts: [
      { uk: 'Пісня вийшла у 2016 році як другий сингл з п’ятого альбому Леді Гаги «Joanne».', ru: 'Песня вышла в 2016 году как второй сингл с пятого альбома Леди Гаги «Joanne».', en: 'The song came out in 2016 as the second single from Lady Gaga’s fifth album, Joanne.' },
      { uk: 'Альбом «Joanne» названо на честь тітки Леді Гаги, яка померла молодою ще до народження співачки.', ru: 'Альбом «Joanne» назван в честь тёти Леди Гаги, которая умерла молодой ещё до рождения певицы.', en: 'The album Joanne is named after Lady Gaga’s aunt, who died young before the singer was born.' },
      { uk: 'Гага написала пісню разом із пісняркою Гілларі Ліндсі та продюсером Марком Ронсоном.', ru: 'Гага написала песню вместе с автором песен Хиллари Линдси и продюсером Марком Ронсоном.', en: 'Gaga wrote the song with songwriter Hillary Lindsey and producer Mark Ronson.' },
      { uk: 'У лютому 2017 року Гага заспівала цю пісню під час шоу в перерві матчу Super Bowl, яке дивилися мільйони людей.', ru: 'В феврале 2017 года Гага спела эту песню во время шоу в перерыве матча Super Bowl, которое смотрели миллионы людей.', en: 'In February 2017 Gaga sang the song at the Super Bowl halftime show, watched by millions of people.' },
      { uk: 'Живу версію пісні номінували на «Греммі» в категорії «Найкраще сольне поп-виконання».', ru: 'Живую версию песни номинировали на «Грэмми» в категории «Лучшее сольное поп-исполнение».', en: 'A live version of the song was nominated for a Grammy for Best Pop Solo Performance.' },
    ],
    warmup: [
      'What was the last difficult decision you made?',
      'Do you decide things quickly or slowly?',
      'Who do you ask for advice when you can’t decide?',
    ],
    vocab: [
      {
        group: { uk: 'Рішення', ru: 'Решения', en: 'Decisions' },
        items: [
          { en: 'decide', uk: 'вирішувати', ru: 'решать', ex: 'I can’t decide which film to watch.' },
          { en: 'a choice', uk: 'вибір', ru: 'выбор', ex: 'You have a choice: tea or juice.' },
          { en: 'doubt', uk: 'сумнів; сумніватися', ru: 'сомнение; сомневаться', ex: 'I have no doubt that you will pass.' },
          { en: 'hesitate', uk: 'вагатися', ru: 'колебаться', ex: 'Don’t hesitate to ask me for help.' },
          { en: 'regret', uk: 'шкодувати; жаль', ru: 'жалеть; сожаление', ex: 'I don’t regret moving to a new school.' },
        ],
      },
      {
        group: { uk: 'Почуття', ru: 'Чувства', en: 'Feelings' },
        items: [
          { en: 'disappointed', uk: 'розчарований', ru: 'разочарованный', ex: 'I was disappointed when the trip was cancelled.' },
          { en: 'hopeful', uk: 'сповнений надії', ru: 'полный надежды', ex: 'The doctor is hopeful that grandpa will be fine soon.' },
          { en: 'exhausted', uk: 'дуже втомлений, виснажений', ru: 'очень уставший, измотанный', ex: 'After the long hike we were exhausted.' },
          { en: 'lonely', uk: 'самотній', ru: 'одинокий', ex: 'Our old neighbour feels lonely, so we visit her.' },
          { en: 'honest', uk: 'чесний', ru: 'честный', ex: 'Please be honest, do you like my haircut?' },
        ],
      },
      {
        group: { uk: 'Великі числа', ru: 'Большие числа', en: 'Big numbers' },
        items: [
          { en: 'a hundred', uk: 'сто', ru: 'сто', ex: 'There are a hundred students in our year.' },
          { en: 'a thousand', uk: 'тисяча', ru: 'тысяча', ex: 'The stadium has seats for twenty thousand people.' },
          { en: 'a billion', uk: 'мільярд', ru: 'миллиард', ex: 'This video has over a billion views.' },
          { en: 'millions of', uk: 'мільйони (чогось)', ru: 'миллионы (чего-то)', ex: 'Millions of people use this app every day.' },
          { en: 'dozens of', uk: 'десятки (чогось)', ru: 'десятки (чего-то)', ex: 'I have dozens of photos of my cat.' },
        ],
      },
    ],
    grammar: {
      uk: 'Слово reason (причина) має три основні моделі. 1) a reason to + дієслово: a reason to stay, a reason to smile. 2) a reason for + іменник: the reason for the delay. 3) the reason why + речення: That’s the reason why I’m late. Великі числа: після точного числа немає -s: two hundred, three million. Але коли кількість не точна, кажемо hundreds of, thousands of, millions of: Millions of people watched the show.',
      ru: 'У слова reason (причина) три основные модели. 1) a reason to + глагол: a reason to stay, a reason to smile. 2) a reason for + существительное: the reason for the delay. 3) the reason why + предложение: That’s the reason why I’m late. Большие числа: после точного числа нет -s: two hundred, three million. Но когда количество неточное, говорим hundreds of, thousands of, millions of: Millions of people watched the show.',
      en: 'Reason has three main patterns. 1) a reason to + verb: a reason to stay, a reason to smile. 2) a reason for + noun: the reason for the delay. 3) the reason why + clause: That’s the reason why I’m late. Big numbers: after an exact number there is no -s: two hundred, three million. When the number is not exact, say hundreds of, thousands of, millions of: Millions of people watched the show.',
    },
    grammarEx: [
      { q: 'Give me one good reason ___ stay at home today.', opts: ['to', 'for', 'of'], a: 'to' },
      { q: 'What was the reason ___ the delay?', opts: ['for', 'to', 'at'], a: 'for' },
      { q: 'That’s the reason ___ I didn’t call you.', opts: ['why', 'what', 'who'], a: 'why' },
      { q: 'The city has three ___ people.', opts: ['million', 'millions', 'millions of'], a: 'million' },
      { q: '___ of fans came to the concert.', opts: ['Thousands', 'Thousand', 'A thousand'], a: 'Thousands' },
      { q: 'There are two ___ pages in this book.', opts: ['hundred', 'hundreds', 'hundreds of'], a: 'hundred' },
      { q: 'Sunny weather is a great reason ___ a picnic.', opts: ['for', 'to', 'why'], a: 'for' },
      { q: 'She has ___ of followers online.', opts: ['millions', 'million', 'a million of'], a: 'millions' },
    ],
    gapfill: [
      { q: 'I can’t ___ between the red shoes and the blue ones.', a: 'decide' },
      { q: 'You have a ___: stay here or come with us.', a: 'choice' },
      { q: 'Don’t ___ to call me if you need help.', a: 'hesitate' },
      { q: 'After ten hours of work, Mum was ___.', a: 'exhausted' },
      { q: 'He felt ___ in the big city without friends.', a: 'lonely' },
      { q: 'Be ___ with me, I want to know the truth.', a: 'honest' },
      { q: 'This song has more than a ___ views on YouTube.', a: 'billion' },
      { q: 'We were ___ when our team lost.', a: 'disappointed' },
    ],
    listen: [
      { uk: 'Послухай початок. Які інструменти ти чуєш? Їх багато чи мало?', ru: 'Послушай начало. Какие инструменты ты слышишь? Их много или мало?', en: 'Listen to the start. Which instruments can you hear? Are there many or just a few?' },
      { uk: 'Голос співачки звучить спокійно чи схвильовано? Як змінюється її голос до кінця пісні?', ru: 'Голос певицы звучит спокойно или взволнованно? Как меняется её голос к концу песни?', en: 'Does the singer’s voice sound calm or emotional? How does her voice change towards the end?' },
      { uk: 'Порахуй, скільки разів ти чуєш слово reasons.', ru: 'Посчитай, сколько раз ты слышишь слово reasons.', en: 'Count how many times you hear the word reasons.' },
      { uk: 'Подивись кліп. Які емоції ти бачиш на обличчі співачки? Назви три.', ru: 'Посмотри клип. Какие эмоции ты видишь на лице певицы? Назови три.', en: 'Watch the video. What emotions can you see on the singer’s face? Name three.' },
    ],
    speaking: [
      'What do you do when you can’t make up your mind?',
      'Is it better to decide quickly or to think twice? Give an example.',
      'Have you ever regretted a choice? What happened?',
      'When do you feel hopeful?',
      'Is it always good to be honest? Why or why not?',
      'Give three reasons to learn a new language.',
    ],
    roleplay: {
      uk: 'A: ти вагаєшся, чи кидати гурток, бо втомився(лася) і розчарований(а). B: ти друг. Розпитай про причини, допоможи зважити «за» і «проти» і порадь, як ухвалити рішення.',
      ru: 'A: ты колеблешься, бросать ли кружок, потому что устал(а) и разочарован(а). B: ты друг. Расспроси о причинах, помоги взвесить «за» и «против» и посоветуй, как принять решение.',
      en: 'A: you can’t decide whether to quit your club, because you are tired and disappointed. B: you are a friend. Ask about the reasons, help weigh the pros and cons and give advice on how to decide.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) про складне рішення, яке ти колись ухвалював(ла). Які були причини «за» і «проти»? Використай reason to, reason for і the reason why.',
      ru: 'Напиши короткий текст (60-100 слов) о трудном решении, которое ты когда-то принимал(а). Какие были причины «за» и «против»? Используй reason to, reason for и the reason why.',
      en: 'Write a short text (60-100 words) about a difficult decision you once made. What were the reasons for and against? Use reason to, reason for and the reason why.',
    },
  },

  'always-remember-us-this-way': {
    facts: [
      { uk: 'Пісня вийшла у 2018 році в саундтреку фільму «Народження зірки». У фільмі Леді Гага грає співачку Еллі.', ru: 'Песня вышла в 2018 году в саундтреке фильма «Звезда родилась». В фильме Леди Гага играет певицу Элли.', en: 'The song came out in 2018 on the soundtrack of A Star Is Born. In the film Lady Gaga plays a singer called Ally.' },
      { uk: 'Режисер фільму Бредлі Купер. Він також зіграв головну чоловічу роль, музиканта Джексона Мейна.', ru: 'Режиссёр фильма Брэдли Купер. Он также сыграл главную мужскую роль, музыканта Джексона Мэйна.', en: 'The film was directed by Bradley Cooper, who also played the male lead, the musician Jackson Maine.' },
      { uk: 'Гага написала пісню разом із трьома авторками з Нешвілла: Наталі Гембі, Гілларі Ліндсі та Лорі Маккенною.', ru: 'Гага написала песню вместе с тремя авторами песен из Нэшвилла: Натали Хемби, Хиллари Линдси и Лори Маккенной.', en: 'Gaga wrote the song with three Nashville songwriters: Natalie Hemby, Hillary Lindsey and Lori McKenna.' },
      { uk: 'Кліп вийшов у листопаді 2018 року. Це добірка сцен із фільму.', ru: 'Клип вышел в ноябре 2018 года. Это подборка сцен из фильма.', en: 'The music video came out in November 2018. It is a montage of scenes from the film.' },
      { uk: 'Інша пісня з цього фільму, «Shallow», отримала «Оскар» як найкраща пісня до фільму.', ru: 'Другая песня из этого фильма, «Shallow», получила «Оскар» как лучшая песня к фильму.', en: 'Another song from the film, Shallow, won the Oscar for Best Original Song.' },
    ],
    warmup: [
      'What is your happiest memory?',
      'Do you keep photos, tickets or other things to remember special days?',
      'Do you like films about musicians? Which ones?',
    ],
    vocab: [
      {
        group: { uk: 'Пам’ять', ru: 'Память', en: 'Memory' },
        items: [
          { en: 'remind', uk: 'нагадувати', ru: 'напоминать', ex: 'Please remind me to buy bread.' },
          { en: 'recall', uk: 'пригадувати', ru: 'вспоминать, припоминать', ex: 'I can’t recall his name, but I know his face.' },
          { en: 'a souvenir', uk: 'сувенір', ru: 'сувенир', ex: 'I bought a small boat as a souvenir from the trip.' },
          { en: 'a photo album', uk: 'фотоальбом', ru: 'фотоальбом', ex: 'Grandma showed us her old photo album.' },
          { en: 'unforgettable', uk: 'незабутній', ru: 'незабываемый', ex: 'Our trip to the mountains was unforgettable.' },
        ],
      },
      {
        group: { uk: 'Кіно і музика', ru: 'Кино и музыка', en: 'Film and music' },
        items: [
          { en: 'a soundtrack', uk: 'саундтрек, музика до фільму', ru: 'саундтрек, музыка к фильму', ex: 'I listen to the soundtrack of my favourite game while I study.' },
          { en: 'a scene', uk: 'сцена (у фільмі)', ru: 'сцена (в фильме)', ex: 'The last scene of the film made me cry.' },
          { en: 'a ballad', uk: 'балада, повільна пісня', ru: 'баллада, медленная песня', ex: 'She sang a quiet ballad at the end of the concert.' },
          { en: 'a piano', uk: 'фортепіано', ru: 'фортепиано', ex: 'My brother practises the piano every evening.' },
          { en: 'a director', uk: 'режисер', ru: 'режиссёр', ex: 'The director told the actors to start again.' },
        ],
      },
      {
        group: { uk: 'Подорожі й краєвиди', ru: 'Путешествия и пейзажи', en: 'Travel and views' },
        items: [
          { en: 'a desert', uk: 'пустеля', ru: 'пустыня', ex: 'It is very hot in the desert in the daytime.' },
          { en: 'a sunset', uk: 'захід сонця', ru: 'закат', ex: 'We watched the sunset from the beach.' },
          { en: 'a road trip', uk: 'подорож машиною', ru: 'путешествие на машине', ex: 'This summer we’re going on a road trip around Ukraine.' },
          { en: 'a view', uk: 'краєвид, вид', ru: 'вид, пейзаж', ex: 'The view from the hotel window is beautiful.' },
          { en: 'a canyon', uk: 'каньйон', ru: 'каньон', ex: 'The Grand Canyon is in the USA.' },
        ],
      },
    ],
    grammar: {
      uk: 'Після remember і forget значення залежить від форми дієслова. Remember + -ing означає «пам’ятаю, як я це зробив(ла)» (спогад про минуле): I remember meeting you at the party. Remember + to + дієслово означає «не забути щось зробити» (дія ще попереду): Remember to lock the door. Так само з forget: I’ll never forget seeing the sea for the first time (спогад). Don’t forget to feed the cat (завдання).',
      ru: 'После remember и forget значение зависит от формы глагола. Remember + -ing значит «помню, как я это сделал(а)» (воспоминание о прошлом): I remember meeting you at the party. Remember + to + глагол значит «не забыть что-то сделать» (действие ещё впереди): Remember to lock the door. Так же с forget: I’ll never forget seeing the sea for the first time (воспоминание). Don’t forget to feed the cat (задача).',
      en: 'After remember and forget, the meaning depends on the verb form. Remember + -ing means you have a memory of doing it: I remember meeting you at the party. Remember + to + verb means don’t forget a task that is still in the future: Remember to lock the door. The same with forget: I’ll never forget seeing the sea for the first time (a memory). Don’t forget to feed the cat (a task).',
    },
    grammarEx: [
      { q: 'I remember ___ to the zoo when I was five.', opts: ['going', 'to go', 'go'], a: 'going' },
      { q: 'Remember ___ your homework tonight!', opts: ['to do', 'doing', 'do'], a: 'to do' },
      { q: 'Don’t forget ___ the plants while I’m away.', opts: ['to water', 'watering', 'water'], a: 'to water' },
      { q: 'I’ll never forget ___ snow for the first time.', opts: ['seeing', 'to see', 'see'], a: 'seeing' },
      { q: 'Did you remember ___ Mum? It’s her birthday.', opts: ['to call', 'calling', 'call'], a: 'to call' },
      { q: 'I remember ___ this film with my dad.', opts: ['watching', 'to watch', 'watched'], a: 'watching' },
      { q: 'Please remember ___ the lights off.', opts: ['to turn', 'turning', 'turned'], a: 'to turn' },
      { q: 'She doesn’t remember ___ the door, so she went back to check.', opts: ['locking', 'to lock', 'lock'], a: 'locking' },
    ],
    gapfill: [
      { q: 'This smell ___ me of my grandma’s kitchen.', a: 'reminds' },
      { q: 'I bought a fridge magnet as a ___ from Paris.', a: 'souvenir' },
      { q: 'Our first concert was ___. I will never forget it.', a: 'unforgettable' },
      { q: 'The ___ of this film has great songs.', a: 'soundtrack' },
      { q: 'Steven Spielberg is a famous film ___.', a: 'director' },
      { q: 'We took a photo of the beautiful ___ over the sea.', a: 'sunset' },
      { q: 'There isn’t much water in the ___.', a: 'desert' },
      { q: 'From the top of the hill there is an amazing ___.', a: 'view' },
    ],
    listen: [
      { uk: 'Послухай вступ. Який інструмент звучить першим?', ru: 'Послушай вступление. Какой инструмент звучит первым?', en: 'Listen to the intro. Which instrument do you hear first?' },
      { uk: 'Пісня тиха весь час чи стає гучнішою? Де саме голос звучить найсильніше?', ru: 'Песня тихая всё время или становится громче? Где именно голос звучит сильнее всего?', en: 'Is the song quiet all the time or does it get louder? Where does the voice sound strongest?' },
      { uk: 'Порахуй, скільки разів ти чуєш слово remember.', ru: 'Посчитай, сколько раз ты слышишь слово remember.', en: 'Count how many times you hear the word remember.' },
      { uk: 'Подивись кліп: це сцени з фільму. Де відбуваються ці сцени? Назви три місця.', ru: 'Посмотри клип: это сцены из фильма. Где происходят эти сцены? Назови три места.', en: 'Watch the video: it shows scenes from the film. Where do the scenes happen? Name three places.' },
    ],
    speaking: [
      'What is one day you will always remember? Why?',
      'What do you keep to remind you of special moments?',
      'Do you prefer photos or videos to remember things?',
      'Which smell or song reminds you of your childhood?',
      'Have you seen a film because of its soundtrack?',
      'Would you like to go on a road trip? Where to?',
    ],
    roleplay: {
      uk: 'A: ти знайшов(ла) старий фотоальбом. B: ти брат, сестра або друг. Разом розгляньте «фото», згадайте, що відбувалося, і використовуйте I remember + -ing та Do you remember...?',
      ru: 'A: ты нашёл(ла) старый фотоальбом. B: ты брат, сестра или друг. Вместе рассмотрите «фото», вспомните, что происходило, и используйте I remember + -ing и Do you remember...?',
      en: 'A: you have found an old photo album. B: you are a brother, sister or friend. Look at the photos together, remember what happened and use I remember + -ing and Do you remember...?',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) про спогад, який ти хочеш зберегти назавжди. Де ти був(ла), з ким, що бачив(ла) і відчував(ла)? Використай remember + -ing щонайменше двічі.',
      ru: 'Напиши короткий текст (60-100 слов) о воспоминании, которое ты хочешь сохранить навсегда. Где ты был(а), с кем, что видел(а) и чувствовал(а)? Используй remember + -ing как минимум дважды.',
      en: 'Write a short text (60-100 words) about a memory you want to keep forever. Where were you, who were you with, what did you see and feel? Use remember + -ing at least twice.',
    },
  },

  'die-with-a-smile': {
    facts: [
      { uk: 'Пісня вийшла в серпні 2024 року. Пізніше її включили до альбому Леді Гаги «Mayhem» (2025).', ru: 'Песня вышла в августе 2024 года. Позже её включили в альбом Леди Гаги «Mayhem» (2025).', en: 'The song came out in August 2024. Later it was included on Lady Gaga’s album Mayhem (2025).' },
      { uk: 'Пісня піднялася на перше місце американського чарту Billboard Hot 100.', ru: 'Песня поднялась на первое место американского чарта Billboard Hot 100.', en: 'The song reached number one on the US Billboard Hot 100.' },
      { uk: 'У 2025 році пісня отримала «Греммі» як найкраще поп-виконання дуетом або групою.', ru: 'В 2025 году песня получила «Грэмми» как лучшее поп-исполнение дуэтом или группой.', en: 'In 2025 the song won the Grammy for Best Pop Duo/Group Performance.' },
      { uk: 'У кліпі Гага і Бруно Марс співають і грають на гітарах, а все виглядає як виступ у старому телешоу.', ru: 'В клипе Гага и Бруно Марс поют и играют на гитарах, а всё выглядит как выступление в старом телешоу.', en: 'In the video Gaga and Bruno Mars sing and play guitars, and it all looks like a performance on an old TV show.' },
    ],
    warmup: [
      'Do you like duets? Which one is your favourite?',
      'Who makes you smile every day?',
      'What would you do if you had a whole free day?',
    ],
    vocab: [
      {
        group: { uk: 'Близькість і турбота', ru: 'Близость и забота', en: 'Love and care' },
        items: [
          { en: 'devoted', uk: 'відданий', ru: 'преданный', ex: 'Our dog is devoted to my little brother.' },
          { en: 'a partner', uk: 'партнер, пара', ru: 'партнёр, пара', ex: 'You need a partner for this dance.' },
          { en: 'together', uk: 'разом', ru: 'вместе', ex: 'Let’s do the project together.' },
          { en: 'hug', uk: 'обіймати; обійми', ru: 'обнимать; объятия', ex: 'I gave my mum a big hug at the airport.' },
          { en: 'care about', uk: 'піклуватися, переживати за', ru: 'заботиться, переживать за', ex: 'I really care about my friends.' },
        ],
      },
      {
        group: { uk: 'Музика', ru: 'Музыка', en: 'Music' },
        items: [
          { en: 'a duet', uk: 'дует', ru: 'дуэт', ex: 'My sister and I sang a duet at the school concert.' },
          { en: 'harmony', uk: 'гармонія, спів на два голоси', ru: 'гармония, пение на два голоса', ex: 'The choir sings in beautiful harmony.' },
          { en: 'a guitar', uk: 'гітара', ru: 'гитара', ex: 'He is learning to play the guitar.' },
          { en: 'a band', uk: 'гурт', ru: 'группа (музыкальная)', ex: 'My cousin plays drums in a band.' },
          { en: 'a microphone', uk: 'мікрофон', ru: 'микрофон', ex: 'Speak into the microphone, please.' },
        ],
      },
      {
        group: { uk: 'Час', ru: 'Время', en: 'Time' },
        items: [
          { en: 'a lifetime', uk: 'усе життя', ru: 'вся жизнь', ex: 'A trip like this happens once in a lifetime.' },
          { en: 'a decade', uk: 'десятиліття', ru: 'десятилетие', ex: 'My parents have lived here for a decade.' },
          { en: 'precious', uk: 'дорогоцінний, дуже цінний', ru: 'драгоценный, очень ценный', ex: 'Time with family is precious.' },
          { en: 'temporary', uk: 'тимчасовий', ru: 'временный', ex: 'This is only a temporary problem.' },
          { en: 'urgent', uk: 'терміновий', ru: 'срочный', ex: 'I have an urgent message for the teacher.' },
        ],
      },
    ],
    grammar: {
      uk: 'Другий умовний говорить про уявні або малоймовірні ситуації в теперішньому чи майбутньому. Формула: If + Past Simple, would + дієслово. If I won a million, I would buy a house by the sea. Would часто скорочуємо: I’d. З to be у формальній мові кажуть were для всіх осіб: If I were you, I would call her. У розмові часто чути і was. Питання: What would you do if you met a famous singer?',
      ru: 'Второе условное говорит о воображаемых или маловероятных ситуациях в настоящем или будущем. Формула: If + Past Simple, would + глагол. If I won a million, I would buy a house by the sea. Would часто сокращаем: I’d. С to be в формальной речи говорят were для всех лиц: If I were you, I would call her. В разговоре часто слышно и was. Вопрос: What would you do if you met a famous singer?',
      en: 'The second conditional talks about imaginary or unlikely situations now or in the future. Formula: If + Past Simple, would + verb. If I won a million, I would buy a house by the sea. We often shorten would to I’d. With to be, formal English uses were for everyone: If I were you, I would call her. In speech you also hear was. Question: What would you do if you met a famous singer?',
    },
    grammarEx: [
      { q: 'If I ___ a dog, I would walk it every morning.', opts: ['had', 'have', 'would have'], a: 'had' },
      { q: 'If she knew the answer, she ___ tell us.', opts: ['would', 'will', 'did'], a: 'would' },
      { q: 'If I ___ you, I would say sorry.', opts: ['were', 'am', 'be'], a: 'were' },
      { q: 'What would you do if you ___ a famous singer?', opts: ['met', 'meet', 'will meet'], a: 'met' },
      { q: 'We ___ go to the beach if it wasn’t so cold.', opts: ['would', 'will', 'are'], a: 'would' },
      { q: 'If they lived closer, we ___ see them more often.', opts: ['would', 'will', 'did'], a: 'would' },
      { q: 'If I could fly, I ___ visit every country.', opts: ['would', 'will', 'can'], a: 'would' },
      { q: 'He would be happier if he ___ more sleep.', opts: ['got', 'gets', 'will get'], a: 'got' },
    ],
    gapfill: [
      { q: 'They sang a ___ together at the wedding.', a: 'duet' },
      { q: 'Give me a ___, I missed you!', a: 'hug' },
      { q: 'My grandparents have been ___ to each other for fifty years.', a: 'devoted' },
      { q: 'Can you play the ___? I have only three chords.', a: 'guitar' },
      { q: 'This ring is very ___ to me, it was my grandma’s.', a: 'precious' },
      { q: 'Don’t worry, the noise is ___. The builders leave tomorrow.', a: 'temporary' },
      { q: 'The two singers sang in perfect ___.', a: 'harmony' },
      { q: 'My parents met more than a ___ ago, in 2012.', a: 'decade' },
    ],
    listen: [
      { uk: 'Послухай початок. Хто співає першим: Бруно Марс чи Леді Гага?', ru: 'Послушай начало. Кто поёт первым: Бруно Марс или Леди Гага?', en: 'Listen to the start. Who sings first: Bruno Mars or Lady Gaga?' },
      { uk: 'Знайди місце, де вони співають разом. Голоси звучать в один тон чи по-різному?', ru: 'Найди место, где они поют вместе. Голоса звучат в один тон или по-разному?', en: 'Find a part where they sing together. Do their voices sound the same or different?' },
      { uk: 'Пісня швидка чи повільна? Весела чи ніжна? Які три прикметники ти обереш?', ru: 'Песня быстрая или медленная? Весёлая или нежная? Какие три прилагательных ты выберешь?', en: 'Is the song fast or slow? Happy or tender? Which three adjectives would you choose?' },
      { uk: 'Подивись кліп. Як виглядає студія? Як ти думаєш, у якому десятилітті «знято» це шоу?', ru: 'Посмотри клип. Как выглядит студия? Как ты думаешь, в каком десятилетии «снято» это шоу?', en: 'Watch the video. What does the studio look like? Which decade do you think the show is from?' },
    ],
    speaking: [
      'If you could sing a duet with any singer, who would it be?',
      'What would you do if you had a free week with your best friend?',
      'Who do you care about most? How do you show it?',
      'What is precious to you that money can’t buy?',
      'Do you prefer solo singers or duets and bands? Why?',
      'How do you make the most of your free time?',
    ],
    roleplay: {
      uk: 'A: ти журналіст музичного шоу. B: ти співак або співачка, які щойно записали дует. Розпитай, як вони познайомилися, як писали пісню і що зробили б, якби пісня стала номером один. Використовуйте would.',
      ru: 'A: ты журналист музыкального шоу. B: ты певец или певица, которые только что записали дуэт. Расспроси, как они познакомились, как писали песню и что сделали бы, если бы песня стала номером один. Используйте would.',
      en: 'A: you are a reporter on a music show. B: you are a singer who has just recorded a duet. Ask how they met, how they wrote the song and what they would do if the song became number one. Use would.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) «Мій ідеальний день». З ким би ти його провів(ла), куди б пішов(ла), що б робив(ла)? Використай другий умовний щонайменше тричі.',
      ru: 'Напиши короткий текст (60-100 слов) «Мой идеальный день». С кем бы ты его провёл(а), куда бы пошёл(ла), что бы делал(а)? Используй второе условное как минимум трижды.',
      en: 'Write a short text (60-100 words) called My perfect day. Who would you spend it with, where would you go, what would you do? Use the second conditional at least three times.',
    },
  },

  'birds-of-a-feather': {
    lyricVideo: 'd5gf9dXbPi0',
    facts: [
      { uk: 'Пісня з третього альбому Біллі Айліш «Hit Me Hard and Soft», який вийшов у травні 2024 року.', ru: 'Песня с третьего альбома Билли Айлиш «Hit Me Hard and Soft», который вышел в мае 2024 года.', en: 'The song is from Billie Eilish’s third album, Hit Me Hard and Soft, released in May 2024.' },
      { uk: 'Біллі написала пісню разом зі своїм братом Фіннеасом, який також її спродюсував.', ru: 'Билли написала песню вместе со своим братом Финнеасом, который также её спродюсировал.', en: 'Billie wrote the song with her brother Finneas, who also produced it.' },
      { uk: 'Пісня стала однією з найпопулярніших у світі у 2024 році, особливо на стрімінгових сервісах.', ru: 'Песня стала одной из самых популярных в мире в 2024 году, особенно на стриминговых сервисах.', en: 'It became one of the most popular songs in the world in 2024, especially on streaming services.' },
      { uk: 'Пісню номінували на «Греммі» у двох головних категоріях: «Запис року» і «Пісня року».', ru: 'Песню номинировали на «Грэмми» в двух главных категориях: «Запись года» и «Песня года».', en: 'The song was nominated for two of the biggest Grammys: Record of the Year and Song of the Year.' },
      { uk: 'Кліп вийшов у вересні 2024 року. У ньому Біллі ніби тягне невидима сила.', ru: 'Клип вышел в сентябре 2024 года. В нём Билли будто тянет невидимая сила.', en: 'The music video came out in September 2024. In it, Billie seems to be pulled by an invisible force.' },
    ],
    warmup: [
      'Are you and your best friend similar or different?',
      'What birds can you see where you live?',
      'Do you know any proverbs about friends in Ukrainian?',
    ],
    vocab: [
      {
        group: { uk: 'Стосунки', ru: 'Отношения', en: 'Relationships' },
        items: [
          { en: 'close', uk: 'близький', ru: 'близкий', ex: 'My cousin and I are very close.' },
          { en: 'loyal', uk: 'вірний, відданий', ru: 'верный, преданный', ex: 'A loyal friend never tells your secrets.' },
          { en: 'caring', uk: 'турботливий', ru: 'заботливый', ex: 'Our nurse is kind and caring.' },
          { en: 'a couple', uk: 'пара', ru: 'пара', ex: 'The couple next door have two cats.' },
          { en: 'a relationship', uk: 'стосунки', ru: 'отношения', ex: 'I have a good relationship with my sister.' },
        ],
      },
      {
        group: { uk: 'Птахи', ru: 'Птицы', en: 'Birds' },
        items: [
          { en: 'a feather', uk: 'пір’їна', ru: 'перо', ex: 'I found a blue feather in the garden.' },
          { en: 'a flock', uk: 'зграя (птахів), отара', ru: 'стая (птиц), стадо', ex: 'A flock of geese flew over our house.' },
          { en: 'a nest', uk: 'гніздо', ru: 'гнездо', ex: 'There is a nest with three eggs in that tree.' },
          { en: 'a wing', uk: 'крило', ru: 'крыло', ex: 'The little bird hurt its wing.' },
          { en: 'migrate', uk: 'мігрувати, відлітати у вирій', ru: 'мигрировать, улетать на юг', ex: 'Storks migrate to Africa in autumn.' },
        ],
      },
      {
        group: { uk: 'Схожість і різниця', ru: 'Сходство и различие', en: 'Similar and different' },
        items: [
          { en: 'similar', uk: 'схожий', ru: 'похожий', ex: 'Your bag is similar to mine.' },
          { en: 'alike', uk: 'однакові, схожі', ru: 'одинаковые, похожие', ex: 'The twins look alike, but they are very different inside.' },
          { en: 'opposite', uk: 'протилежний', ru: 'противоположный', ex: 'Hot is the opposite of cold.' },
          { en: 'a personality', uk: 'характер, особистість', ru: 'характер, личность', ex: 'She has a fun, bright personality.' },
          { en: 'a hobby', uk: 'хобі, захоплення', ru: 'хобби, увлечение', ex: 'My hobby is building model planes.' },
        ],
      },
    ],
    grammar: {
      uk: 'Як говорити про схожість. Both: We both like cats. Both of us play football. The same as: My phone is the same as yours. Similar to: Your idea is similar to mine. Коротка відповідь-згода: якщо речення стверджувальне, кажемо So do I / So am I / So can I. Якщо заперечне, кажемо Neither do I / Neither am I. Приклад: I love pizza. So do I! I can’t swim. Neither can I. Допоміжне дієслово береться з першого речення.',
      ru: 'Как говорить о сходстве. Both: We both like cats. Both of us play football. The same as: My phone is the same as yours. Similar to: Your idea is similar to mine. Короткий ответ-согласие: если предложение утвердительное, говорим So do I / So am I / So can I. Если отрицательное, говорим Neither do I / Neither am I. Пример: I love pizza. So do I! I can’t swim. Neither can I. Вспомогательный глагол берётся из первого предложения.',
      en: 'Talking about similarity. Both: We both like cats. Both of us play football. The same as: My phone is the same as yours. Similar to: Your idea is similar to mine. Short answers to agree: after a positive sentence say So do I / So am I / So can I. After a negative sentence say Neither do I / Neither am I. Example: I love pizza. So do I! I can’t swim. Neither can I. The helping verb comes from the first sentence.',
    },
    grammarEx: [
      { q: 'I like horror films. ___ do I!', opts: ['So', 'Neither', 'Too'], a: 'So' },
      { q: 'I don’t like coffee. ___ do I.', opts: ['Neither', 'So', 'Also'], a: 'Neither' },
      { q: 'I’m tired. So ___ I.', opts: ['am', 'do', 'have'], a: 'am' },
      { q: 'I can’t whistle. Neither ___ I.', opts: ['can', 'do', 'am'], a: 'can' },
      { q: 'We ___ have green eyes.', opts: ['both', 'same', 'alike'], a: 'both' },
      { q: 'My birthday is the same ___ yours!', opts: ['as', 'like', 'to'], a: 'as' },
      { q: 'This song is similar ___ her old one.', opts: ['to', 'as', 'with'], a: 'to' },
      { q: 'I went to the concert. So ___ I.', opts: ['did', 'do', 'was'], a: 'did' },
    ],
    gapfill: [
      { q: 'A ___ dog always waits for its owner.', a: 'loyal' },
      { q: 'Birds build a ___ in spring.', a: 'nest' },
      { q: 'I put a white ___ in my hat.', a: 'feather' },
      { q: 'A ___ of birds flew south.', a: 'flock' },
      { q: 'Your drawing is very ___ to mine.', a: 'similar' },
      { q: 'Up is the ___ of down.', a: 'opposite' },
      { q: 'The two brothers look ___, people often mix them up.', a: 'alike' },
      { q: 'Swallows ___ to warm countries in autumn.', a: 'migrate' },
    ],
    listen: [
      { uk: 'Послухай вступ. Пісня звучить сумно, спокійно чи радісно?', ru: 'Послушай вступление. Песня звучит грустно, спокойно или радостно?', en: 'Listen to the intro. Does the song sound sad, calm or happy?' },
      { uk: 'Порахуй, скільки разів ти чуєш назву пісні.', ru: 'Посчитай, сколько раз ты слышишь название песни.', en: 'Count how many times you hear the title of the song.' },
      { uk: 'Голос Біллі тихий чи гучний? У якій частині пісні він звучить найвище?', ru: 'Голос Билли тихий или громкий? В какой части песни он звучит выше всего?', en: 'Is Billie’s voice quiet or loud? In which part does it sound highest?' },
      { uk: 'Подивись кліп. Що незвичайного відбувається з героїнею? Опиши двома-трьома реченнями.', ru: 'Посмотри клип. Что необычного происходит с героиней? Опиши двумя-тремя предложениями.', en: 'Watch the video. What is unusual about what happens to the singer? Describe it in two or three sentences.' },
    ],
    speaking: [
      'Who are you most similar to in your family?',
      'Can opposite people be good friends? Give an example.',
      'What makes someone a loyal friend?',
      'What hobby do you share with your friends?',
      'How did you meet your closest friend?',
      'Why do you think birds are often used as a symbol of love and freedom?',
    ],
    roleplay: {
      uk: 'A і B: ви щойно познайомилися на літньому таборі. По черзі розповідайте про свої хобі, улюблену їжу і музику. Реагуйте фразами So do I, Neither do I, Me too і знайдіть щонайменше п’ять спільних рис.',
      ru: 'A и B: вы только что познакомились в летнем лагере. По очереди рассказывайте о своих хобби, любимой еде и музыке. Реагируйте фразами So do I, Neither do I, Me too и найдите как минимум пять общих черт.',
      en: 'A and B: you have just met at a summer camp. Take turns talking about your hobbies, favourite food and music. React with So do I, Neither do I, Me too and find at least five things in common.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) про людину, з якою у тебе багато спільного. Чим ви схожі й чим відрізняєтеся? Використай both, similar to і the same as.',
      ru: 'Напиши короткий текст (60-100 слов) о человеке, с которым у тебя много общего. Чем вы похожи и чем отличаетесь? Используй both, similar to и the same as.',
      en: 'Write a short text (60-100 words) about a person you have a lot in common with. How are you similar and how are you different? Use both, similar to and the same as.',
    },
  },

  'ocean-eyes': {
    facts: [
      { uk: 'Пісню написав брат Біллі, Фіннеас. У 2015 році Біллі записала її і виклала на SoundCloud, коли їй було 13 років.', ru: 'Песню написал брат Билли, Финнеас. В 2015 году Билли записала её и выложила на SoundCloud, когда ей было 13 лет.', en: 'The song was written by Billie’s brother Finneas. In 2015 Billie recorded it and posted it on SoundCloud when she was 13.' },
      { uk: 'Біллі записала пісню, бо її викладачка танців попросила музику для хореографії.', ru: 'Билли записала песню, потому что её преподавательница танцев попросила музыку для хореографии.', en: 'Billie recorded the song because her dance teacher asked for music to make a dance to.' },
      { uk: 'Пісня несподівано стала дуже популярною в інтернеті, і після цього Біллі підписала контракт зі студією звукозапису.', ru: 'Песня неожиданно стала очень популярной в интернете, и после этого Билли подписала контракт со студией звукозаписи.', en: 'The song unexpectedly became very popular online, and after that Billie signed a record deal.' },
      { uk: 'Пізніше пісня увійшла до першого міні-альбому Біллі «Don’t Smile at Me» (2017).', ru: 'Позже песня вошла в первый мини-альбом Билли «Don’t Smile at Me» (2017).', en: 'Later the song was included on Billie’s first EP, Don’t Smile at Me (2017).' },
    ],
    warmup: [
      'What colour is the sea in your favourite photo?',
      'What do you notice first when you meet a new person?',
      'Do you like quiet songs or loud songs more?',
    ],
    vocab: [
      {
        group: { uk: 'Зовнішність', ru: 'Внешность', en: 'Appearance' },
        items: [
          { en: 'freckles', uk: 'веснянки', ru: 'веснушки', ex: 'In summer I get freckles on my nose.' },
          { en: 'curly', uk: 'кучерявий', ru: 'кудрявый', ex: 'My sister has long curly hair.' },
          { en: 'a fringe', uk: 'чубчик', ru: 'чёлка', ex: 'I want to cut a short fringe.' },
          { en: 'pale', uk: 'блідий', ru: 'бледный', ex: 'You look pale. Are you OK?' },
          { en: 'eyelashes', uk: 'вії', ru: 'ресницы', ex: 'Our baby has very long eyelashes.' },
        ],
      },
      {
        group: { uk: 'Море й океан', ru: 'Море и океан', en: 'Sea and ocean' },
        items: [
          { en: 'a wave', uk: 'хвиля', ru: 'волна', ex: 'A big wave knocked down my sandcastle.' },
          { en: 'deep', uk: 'глибокий', ru: 'глубокий', ex: 'The lake is very deep in the middle.' },
          { en: 'a tide', uk: 'приплив, відплив', ru: 'прилив, отлив', ex: 'At low tide you can walk to the island.' },
          { en: 'calm', uk: 'спокійний', ru: 'спокойный', ex: 'The sea was calm, so we went kayaking.' },
          { en: 'the surface', uk: 'поверхня', ru: 'поверхность', ex: 'A fish jumped above the surface of the water.' },
        ],
      },
      {
        group: { uk: 'Почуття', ru: 'Чувства', en: 'Feelings' },
        items: [
          { en: 'shy', uk: 'сором’язливий', ru: 'застенчивый', ex: 'He is shy, so he doesn’t talk much in class.' },
          { en: 'blush', uk: 'червоніти', ru: 'краснеть', ex: 'I always blush when people say nice things to me.' },
          { en: 'nervous', uk: 'знервований, схвильований', ru: 'нервный, взволнованный', ex: 'I was nervous before my first piano exam.' },
          { en: 'dreamy', uk: 'мрійливий', ru: 'мечтательный', ex: 'This music is soft and dreamy.' },
          { en: 'admire', uk: 'захоплюватися', ru: 'восхищаться', ex: 'I admire people who can speak five languages.' },
        ],
      },
    ],
    grammar: {
      uk: 'Look має два різні значення. Look + прикметник означає «виглядати якимось»: You look tired. She looks happy today. Look like + іменник означає «бути схожим на когось або щось»: He looks like his dad. That cloud looks like a dog. Питання про зовнішність: What does she look like? (Як вона виглядає?) Відповідь: She’s tall and she has curly hair. Не плутайте з What is she like? (Яка вона за характером?)',
      ru: 'У look два разных значения. Look + прилагательное значит «выглядеть каким-то»: You look tired. She looks happy today. Look like + существительное значит «быть похожим на кого-то или что-то»: He looks like his dad. That cloud looks like a dog. Вопрос о внешности: What does she look like? (Как она выглядит?) Ответ: She’s tall and she has curly hair. Не путайте с What is she like? (Какая она по характеру?)',
      en: 'Look has two different patterns. Look + adjective means to seem: You look tired. She looks happy today. Look like + noun means to be similar to someone or something: He looks like his dad. That cloud looks like a dog. To ask about appearance: What does she look like? Answer: She’s tall and she has curly hair. Don’t mix it up with What is she like? which asks about personality.',
    },
    grammarEx: [
      { q: 'You look ___. Did you sleep well?', opts: ['tired', 'like tired', 'a tired'], a: 'tired' },
      { q: 'She looks ___ her mum.', opts: ['like', 'as', 'to'], a: 'like' },
      { q: 'What does your brother ___ like?', opts: ['look', 'looks', 'looking'], a: 'look' },
      { q: 'That cloud looks like ___ elephant.', opts: ['an', 'a', 'the'], a: 'an' },
      { q: 'The sea looks ___ today.', opts: ['calm', 'like calm', 'calmly'], a: 'calm' },
      { q: '___ is your teacher like? She’s kind and funny.', opts: ['What', 'How', 'Who'], a: 'What' },
      { q: 'Your new jacket looks ___!', opts: ['great', 'like great', 'greatly'], a: 'great' },
      { q: 'He doesn’t look ___ a footballer.', opts: ['like', 'as', 'so'], a: 'like' },
    ],
    gapfill: [
      { q: 'In summer the sun gives me ___ on my cheeks.', a: 'freckles' },
      { q: 'Her hair is not straight, it’s ___.', a: 'curly' },
      { q: 'Be careful, the water is very ___ here.', a: 'deep' },
      { q: 'We jumped over every ___ at the beach.', a: 'wave' },
      { q: 'She is ___ and doesn’t like to speak in front of the class.', a: 'shy' },
      { q: 'I was so ___ before the interview that my hands were cold.', a: 'nervous' },
      { q: 'When the teacher praised me, I started to ___.', a: 'blush' },
      { q: 'I really ___ my grandma, she is so strong and wise.', a: 'admire' },
    ],
    listen: [
      { uk: 'Послухай перші 30 секунд. Пісня швидка чи повільна? Голосна чи тиха?', ru: 'Послушай первые 30 секунд. Песня быстрая или медленная? Громкая или тихая?', en: 'Listen to the first 30 seconds. Is the song fast or slow? Loud or quiet?' },
      { uk: 'Порахуй, скільки разів ти чуєш назву пісні.', ru: 'Посчитай, сколько раз ты слышишь название песни.', en: 'Count how many times you hear the title of the song.' },
      { uk: 'Які слова про море чи воду ти можеш почути? Запиши всі, які розібрав(ла).', ru: 'Какие слова о море или воде ты можешь услышать? Запиши все, которые разобрал(а).', en: 'Can you hear any words about the sea or water? Write down all the ones you catch.' },
      { uk: 'Подивись кліп. Які кольори в ньому переважають? Чому, на твою думку, саме вони?', ru: 'Посмотри клип. Какие цвета в нём преобладают? Почему, по-твоему, именно они?', en: 'Watch the video. Which colours do you see most? Why do you think the director chose them?' },
    ],
    speaking: [
      'What does your best friend look like?',
      'Who do you look like in your family?',
      'When do you feel shy or nervous?',
      'Who do you admire? Why?',
      'Do you prefer the sea when it is calm or when there are big waves?',
      'Would you post your own song online? Why or why not?',
    ],
    roleplay: {
      uk: 'A: ти загубив(ла) друга в торговому центрі й описуєш його зовнішність охоронцеві. B: ти охоронець. Став питання What does he/she look like? і уточнюй деталі: волосся, очі, одяг, зріст.',
      ru: 'A: ты потерял(а) друга в торговом центре и описываешь его внешность охраннику. B: ты охранник. Задавай вопрос What does he/she look like? и уточняй детали: волосы, глаза, одежда, рост.',
      en: 'A: you have lost your friend in a shopping centre and you describe them to a security guard. B: you are the guard. Ask What does he/she look like? and check details: hair, eyes, clothes, height.',
    },
    writing: {
      uk: 'Напиши короткий опис (60-100 слів) людини, якою ти захоплюєшся. Як вона виглядає і яка вона за характером? Використай look + прикметник і look like.',
      ru: 'Напиши короткое описание (60-100 слов) человека, которым ты восхищаешься. Как он выглядит и какой он по характеру? Используй look + прилагательное и look like.',
      en: 'Write a short description (60-100 words) of a person you admire. What do they look like and what are they like? Use look + adjective and look like.',
    },
  },

  'my-future': {
    lyricVideo: 'HfbRVxO7LEE',
    facts: [
      { uk: 'Пісня вийшла в липні 2020 року. Пізніше вона увійшла до другого альбому Біллі «Happier Than Ever» (2021).', ru: 'Песня вышла в июле 2020 года. Позже она вошла во второй альбом Билли «Happier Than Ever» (2021).', en: 'The song came out in July 2020. Later it was included on Billie’s second album, Happier Than Ever (2021).' },
      { uk: 'Як і більшість пісень Біллі, її написали і спродюсували Біллі та її брат Фіннеас.', ru: 'Как и большинство песен Билли, её написали и спродюсировали Билли и её брат Финнеас.', en: 'Like most of Billie’s songs, it was written and produced by Billie and her brother Finneas.' },
      { uk: 'Пісня починається як повільна, спокійна балада, а посередині темп змінюється і з’являється бадьорий ритм.', ru: 'Песня начинается как медленная спокойная баллада, а в середине темп меняется и появляется бодрый ритм.', en: 'The song starts as a slow, calm ballad, and in the middle the tempo changes and an upbeat rhythm comes in.' },
      { uk: 'Офіційний кліп повністю анімаційний, тобто намальований.', ru: 'Официальный клип полностью анимационный, то есть нарисованный.', en: 'The official music video is fully animated.' },
      { uk: 'Альбом «Happier Than Ever» номінували на «Греммі» в категорії «Альбом року».', ru: 'Альбом «Happier Than Ever» номинировали на «Грэмми» в категории «Альбом года».', en: 'The album Happier Than Ever was nominated for the Grammy for Album of the Year.' },
    ],
    warmup: [
      'What do you want to do when you finish school?',
      'Do you like spending time on your own? What do you do?',
      'Where do you see yourself in five years?',
    ],
    vocab: [
      {
        group: { uk: 'Дорослішання', ru: 'Взросление', en: 'Growing up' },
        items: [
          { en: 'grow up', uk: 'дорослішати, виростати', ru: 'взрослеть, вырастать', ex: 'I grew up in a small village.' },
          { en: 'mature', uk: 'дорослий, зрілий', ru: 'взрослый, зрелый', ex: 'She is very mature for her age.' },
          { en: 'independent', uk: 'самостійний, незалежний', ru: 'самостоятельный, независимый', ex: 'I want to be independent and have my own flat.' },
          { en: 'a teenager', uk: 'підліток', ru: 'подросток', ex: 'As a teenager, my mum loved rock music.' },
          { en: 'change', uk: 'змінюватися; зміна', ru: 'меняться; перемена', ex: 'People change a lot between 12 and 18.' },
        ],
      },
      {
        group: { uk: 'Плани й мрії', ru: 'Планы и мечты', en: 'Plans and dreams' },
        items: [
          { en: 'an ambition', uk: 'амбіція, заповітна мета', ru: 'амбиция, заветная цель', ex: 'My ambition is to work for a big game studio.' },
          { en: 'a career', uk: 'кар’єра, професія', ru: 'карьера, профессия', ex: 'She wants a career in medicine.' },
          { en: 'a degree', uk: 'диплом, ступінь (університетський)', ru: 'диплом, степень (университетская)', ex: 'My brother has a degree in physics.' },
          { en: 'achieve', uk: 'досягати', ru: 'достигать', ex: 'If you practise every day, you will achieve a lot.' },
          { en: 'a schedule', uk: 'розклад, графік', ru: 'расписание, график', ex: 'My schedule is very busy this week.' },
        ],
      },
      {
        group: { uk: 'Природа і погода', ru: 'Природа и погода', en: 'Nature and weather' },
        items: [
          { en: 'a forest', uk: 'ліс', ru: 'лес', ex: 'We walked in the forest and found mushrooms.' },
          { en: 'rain', uk: 'дощ; йти (про дощ)', ru: 'дождь; идти (о дожде)', ex: 'It started to rain, so we went inside.' },
          { en: 'a puddle', uk: 'калюжа', ru: 'лужа', ex: 'My little brother loves jumping in puddles.' },
          { en: 'bloom', uk: 'цвісти', ru: 'цвести', ex: 'The cherry trees bloom in April.' },
          { en: 'sunshine', uk: 'сонячне світло', ru: 'солнечный свет', ex: 'The cat is sleeping in the sunshine.' },
        ],
      },
    ],
    grammar: {
      uk: 'Три способи говорити про майбутнє. 1) will: рішення в момент мовлення і прогнози. It’s cold, I’ll close the window. I think you’ll love this book. 2) be going to: план, який уже є. I’m going to study design after school. 3) Present Continuous: домовленість на конкретний час. I’m meeting Ann at five on Saturday. Порада: якщо в календарі вже є запис, обирай Present Continuous. Якщо це намір, обирай going to. Якщо вирішуєш просто зараз, обирай will.',
      ru: 'Три способа говорить о будущем. 1) will: решение в момент речи и прогнозы. It’s cold, I’ll close the window. I think you’ll love this book. 2) be going to: план, который уже есть. I’m going to study design after school. 3) Present Continuous: договорённость на конкретное время. I’m meeting Ann at five on Saturday. Совет: если в календаре уже есть запись, выбирай Present Continuous. Если это намерение, выбирай going to. Если решаешь прямо сейчас, выбирай will.',
      en: 'Three ways to talk about the future. 1) will: decisions made now and predictions. It’s cold, I’ll close the window. I think you’ll love this book. 2) be going to: a plan you already have. I’m going to study design after school. 3) Present Continuous: an arrangement at a fixed time. I’m meeting Ann at five on Saturday. Tip: if it is already in your calendar, use Present Continuous. If it is an intention, use going to. If you decide right now, use will.',
    },
    grammarEx: [
      { q: 'The phone is ringing. I ___ answer it.', opts: ['’ll', '’m going to', '’m answering'], a: '’ll' },
      { q: 'I’ve decided. I ___ learn to play the drums this year.', opts: ['’m going to', '’ll', 'learn'], a: '’m going to' },
      { q: 'We ___ the dentist at 4 pm tomorrow. It’s booked.', opts: ['are seeing', 'will see', 'see'], a: 'are seeing' },
      { q: 'I think it ___ rain later.', opts: ['will', 'is', 'does'], a: 'will' },
      { q: 'Look at those dark clouds! It ___ rain.', opts: ['is going to', 'will', 'rains'], a: 'is going to' },
      { q: 'What ___ you doing this weekend?', opts: ['are', 'will', 'do'], a: 'are' },
      { q: 'She ___ going to study in Kyiv next year.', opts: ['is', 'will', 'does'], a: 'is' },
      { q: 'Don’t worry, I ___ help you with the project.', opts: ['’ll', '’m helping', 'help'], a: '’ll' },
    ],
    gapfill: [
      { q: 'I want to be a vet when I ___ up.', a: 'grow' },
      { q: 'He can cook and clean, he is very ___.', a: 'independent' },
      { q: 'My big ___ is to play in a famous orchestra.', a: 'ambition' },
      { q: 'If you work hard, you can ___ your dreams.', a: 'achieve' },
      { q: 'Check the ___, the train leaves at nine.', a: 'schedule' },
      { q: 'Don’t step in that ___, your shoes will get wet!', a: 'puddle' },
      { q: 'In spring the apple trees ___.', a: 'bloom' },
      { q: 'We lay on the grass and enjoyed the ___.', a: 'sunshine' },
    ],
    listen: [
      { uk: 'Послухай початок. Які інструменти ти чуєш? Настрій сумний чи мрійливий?', ru: 'Послушай начало. Какие инструменты ты слышишь? Настроение грустное или мечтательное?', en: 'Listen to the start. Which instruments can you hear? Is the mood sad or dreamy?' },
      { uk: 'Знайди момент, коли змінюється темп. Що саме змінюється в музиці?', ru: 'Найди момент, когда меняется темп. Что именно меняется в музыке?', en: 'Find the moment when the tempo changes. What exactly changes in the music?' },
      { uk: 'Порахуй, скільки разів ти чуєш слово future.', ru: 'Посчитай, сколько раз ты слышишь слово future.', en: 'Count how many times you hear the word future.' },
      { uk: 'Подивись анімаційний кліп. Як змінюється природа і погода від початку до кінця?', ru: 'Посмотри анимационный клип. Как меняются природа и погода от начала до конца?', en: 'Watch the animated video. How do nature and the weather change from the beginning to the end?' },
    ],
    speaking: [
      'What are you going to do after school or university?',
      'What is your biggest ambition?',
      'What are you doing next weekend?',
      'What do you like doing on your own?',
      'How do you think you will change in five years?',
      'Is it important to have a plan for the future? Why or why not?',
    ],
    roleplay: {
      uk: 'A: ти береш інтерв’ю для шкільного журналу на тему «Я через 10 років». B: ти розповідаєш про свої плани (going to), домовленості на найближчий тиждень (Present Continuous) і прогнози (will).',
      ru: 'A: ты берёшь интервью для школьного журнала на тему «Я через 10 лет». B: ты рассказываешь о своих планах (going to), договорённостях на ближайшую неделю (Present Continuous) и прогнозах (will).',
      en: 'A: you are interviewing a classmate for the school magazine about Me in 10 years. B: talk about your plans (going to), your arrangements for next week (Present Continuous) and your predictions (will).',
    },
    writing: {
      uk: 'Напиши лист собі в майбутнє (60-100 слів). Розкажи, що ти плануєш, які в тебе мрії і яким ти хочеш стати. Використай will, going to і Present Continuous.',
      ru: 'Напиши письмо себе в будущее (60-100 слов). Расскажи, что ты планируешь, какие у тебя мечты и каким ты хочешь стать. Используй will, going to и Present Continuous.',
      en: 'Write a letter to your future self (60-100 words). Say what you are planning, what your dreams are and who you want to become. Use will, going to and Present Continuous.',
    },
  },

  'count-on-me': {
    facts: [
      { uk: 'Пісня з першого альбому Бруно Марса «Doo-Wops & Hooligans», який вийшов у 2010 році.', ru: 'Песня с первого альбома Бруно Марса «Doo-Wops & Hooligans», который вышел в 2010 году.', en: 'The song is from Bruno Mars’s first album, Doo-Wops & Hooligans, released in 2010.' },
      { uk: 'Бруно Марс написав пісню разом із Філіпом Лоуренсом і Арі Левіном. Утрьох вони були продюсерською командою The Smeezingtons.', ru: 'Бруно Марс написал песню вместе с Филипом Лоуренсом и Ари Левином. Втроём они были продюсерской командой The Smeezingtons.', en: 'Bruno Mars wrote the song with Philip Lawrence and Ari Levine. Together the three of them were the production team The Smeezingtons.' },
      { uk: 'У 2011 році пісня вийшла синглом у кількох країнах, зокрема в Австралії, Новій Зеландії та Великій Британії.', ru: 'В 2011 году песня вышла синглом в нескольких странах, в том числе в Австралии, Новой Зеландии и Великобритании.', en: 'In 2011 the song was released as a single in several countries, including Australia, New Zealand and the UK.' },
      { uk: 'Бруно Марс народився і виріс у Гонолулу на Гаваях. Головний інструмент у пісні, укулеле, дуже популярний саме там.', ru: 'Бруно Марс родился и вырос в Гонолулу на Гавайях. Главный инструмент в песне, укулеле, очень популярен именно там.', en: 'Bruno Mars was born and grew up in Honolulu, Hawaii. The main instrument in the song, the ukulele, is very popular there.' },
    ],
    warmup: [
      'Who is your best friend? How did you meet?',
      'How do you help your friends?',
      'Can you count from 1 to 10 and back very fast in English?',
    ],
    vocab: [
      {
        group: { uk: 'Дружба', ru: 'Дружба', en: 'Friendship' },
        items: [
          { en: 'trust', uk: 'довіряти; довіра', ru: 'доверять; доверие', ex: 'I trust my friend, she never lies.' },
          { en: 'share', uk: 'ділитися', ru: 'делиться', ex: 'Let’s share the cake, there is enough for everyone.' },
          { en: 'a secret', uk: 'таємниця, секрет', ru: 'тайна, секрет', ex: 'Can you keep a secret?' },
          { en: 'help', uk: 'допомагати; допомога', ru: 'помогать; помощь', ex: 'Can you help me with my maths?' },
          { en: 'kind', uk: 'добрий', ru: 'добрый', ex: 'Our new neighbour is very kind.' },
        ],
      },
      {
        group: { uk: 'Числа й рахунок', ru: 'Числа и счёт', en: 'Numbers and counting' },
        items: [
          { en: 'count', uk: 'рахувати', ru: 'считать', ex: 'Count the apples in the basket.' },
          { en: 'add', uk: 'додавати', ru: 'прибавлять, добавлять', ex: 'Add two and three, and you get five.' },
          { en: 'plus', uk: 'плюс', ru: 'плюс', ex: 'Four plus four is eight.' },
          { en: 'minus', uk: 'мінус', ru: 'минус', ex: 'Ten minus three is seven.' },
          { en: 'backwards', uk: 'назад, у зворотному порядку', ru: 'назад, в обратном порядке', ex: 'Can you count backwards from ten?' },
        ],
      },
      {
        group: { uk: 'Музика', ru: 'Музыка', en: 'Music' },
        items: [
          { en: 'a ukulele', uk: 'укулеле', ru: 'укулеле', ex: 'A ukulele looks like a small guitar.' },
          { en: 'whistle', uk: 'свистіти; свисток', ru: 'свистеть; свисток', ex: 'My dad can whistle any song.' },
          { en: 'clap', uk: 'плескати в долоні', ru: 'хлопать в ладоши', ex: 'Clap your hands if you know the answer.' },
          { en: 'a drum', uk: 'барабан', ru: 'барабан', ex: 'The boy is playing a big drum in the parade.' },
          { en: 'strum', uk: 'бренькати по струнах', ru: 'бренчать по струнам', ex: 'She strums her guitar every evening.' },
        ],
      },
    ],
    grammar: {
      uk: 'Перший умовний говорить про реальні ситуації в майбутньому: якщо щось станеться, буде результат. Формула: If + Present Simple, will + дієслово. If it rains, we will stay at home. If you are hungry, I’ll make sandwiches. Важливо: після if не ставимо will! Не можна If it will rain. Частини можна поміняти місцями, тоді кома не потрібна: We will stay at home if it rains.',
      ru: 'Первое условное говорит о реальных ситуациях в будущем: если что-то случится, будет результат. Формула: If + Present Simple, will + глагол. If it rains, we will stay at home. If you are hungry, I’ll make sandwiches. Важно: после if не ставим will! Нельзя If it will rain. Части можно поменять местами, тогда запятая не нужна: We will stay at home if it rains.',
      en: 'The first conditional talks about real situations in the future: if something happens, there will be a result. Formula: If + Present Simple, will + verb. If it rains, we will stay at home. If you are hungry, I’ll make sandwiches. Important: no will after if! Don’t say If it will rain. You can swap the parts, then you don’t need a comma: We will stay at home if it rains.',
    },
    grammarEx: [
      { q: 'If you ___ sad, I will call you.', opts: ['are', 'will be', 'were'], a: 'are' },
      { q: 'If it rains, we ___ play inside.', opts: ['will', 'are', 'would'], a: 'will' },
      { q: 'If you need help, I ___ help you.', opts: ['’ll', '’m', '’d'], a: '’ll' },
      { q: 'If she ___ the bus, she will be late.', opts: ['misses', 'will miss', 'missed'], a: 'misses' },
      { q: 'We will go to the park if it ___ sunny.', opts: ['is', 'will be', 'be'], a: 'is' },
      { q: 'If you don’t study, you ___ pass the test.', opts: ['won’t', 'don’t', 'aren’t'], a: 'won’t' },
      { q: 'What will you do if your friend ___ angry?', opts: ['gets', 'will get', 'got'], a: 'gets' },
      { q: 'If I ___ some money, I will buy you an ice cream.', opts: ['find', 'will find', 'found'], a: 'find' },
    ],
    gapfill: [
      { q: 'You can ___ me, I never tell secrets.', a: 'trust' },
      { q: 'Please ___ your crayons with your sister.', a: 'share' },
      { q: 'Don’t tell anyone, it’s a ___!', a: 'secret' },
      { q: 'Can you ___ to twenty in English?', a: 'count' },
      { q: 'Six ___ four is ten.', a: 'plus' },
      { q: 'Nine ___ two is seven.', a: 'minus' },
      { q: 'A ___ has only four strings.', a: 'ukulele' },
      { q: 'Everyone, ___ your hands to the music!', a: 'clap' },
    ],
    listen: [
      { uk: 'Послухай початок. Який інструмент звучить? Він великий чи маленький?', ru: 'Послушай начало. Какой инструмент звучит? Он большой или маленький?', en: 'Listen to the start. Which instrument can you hear? Is it big or small?' },
      { uk: 'Пісня весела чи сумна? Під неї хочеться плескати в долоні?', ru: 'Песня весёлая или грустная? Под неё хочется хлопать в ладоши?', en: 'Is the song happy or sad? Does it make you want to clap?' },
      { uk: 'Слухай уважно і запиши всі числа, які почуєш.', ru: 'Слушай внимательно и запиши все числа, которые услышишь.', en: 'Listen carefully and write down all the numbers you hear.' },
      { uk: 'Ти чуєш свист? У якій частині пісні?', ru: 'Ты слышишь свист? В какой части песни?', en: 'Can you hear whistling? In which part of the song?' },
    ],
    speaking: [
      'Who can you count on when you have a problem?',
      'What will you do if your friend is sad?',
      'Do you share your secrets with your friends?',
      'How do you keep in touch with friends who live far away?',
      'What makes a good friend? Name three things.',
      'Can you play a musical instrument? Would you like to learn the ukulele?',
    ],
    roleplay: {
      uk: 'A: у тебе проблема (загубив(ла) ключі, забув(ла) обід, не розумієш завдання). B: ти друг. Запропонуй допомогу, використовуючи If you..., I will... Потім помінятися ролями.',
      ru: 'A: у тебя проблема (потерял(а) ключи, забыл(а) обед, не понимаешь задание). B: ты друг. Предложи помощь, используя If you..., I will... Потом поменяться ролями.',
      en: 'A: you have a problem (you lost your keys, forgot your lunch, don’t understand the homework). B: you are a friend. Offer help using If you..., I will... Then swap roles.',
    },
    writing: {
      uk: 'Напиши листівку (40-80 слів) своєму найкращому другу чи подрузі. Подякуй за дружбу і пообіцяй три речі, використовуючи If you..., I will...',
      ru: 'Напиши открытку (40-80 слов) своему лучшему другу или подруге. Поблагодари за дружбу и пообещай три вещи, используя If you..., I will...',
      en: 'Write a card (40-80 words) to your best friend. Thank them for being your friend and promise three things using If you..., I will...',
    },
  },
};

export const DEEP_C: Record<string, SongDeep> = {
  'born-this-way': {
    intro: {
      uk: 'Ця пісня стала гімном для всіх, хто колись почувався «не таким», як інші. Її енергія допомагає говорити про важливі теми: самоповагу, прийняття і повагу до чужих відмінностей. Нижче зібрано живі англійські вирази, якими носії мови підбадьорюють себе й друзів і пояснюють, чому бути собою нормально. Усі приклади наші власні й узяті з повсякденного життя.',
      ru: 'Эта песня стала гимном для всех, кто когда-то чувствовал себя «не таким», как другие. Её энергия помогает говорить о важных темах: самоуважении, принятии и уважении к чужим отличиям. Ниже собраны живые английские выражения, которыми носители языка подбадривают себя и друзей и объясняют, почему быть собой нормально. Все примеры наши собственные и взяты из повседневной жизни.',
      en: 'This song became an anthem for everyone who has ever felt different from others. Its energy helps us talk about important topics: self-respect, acceptance and respect for other people’s differences. Below are lively English expressions that native speakers use to encourage themselves and their friends and to explain why being yourself is fine. All the examples are our own and come from everyday life.',
    },
    phrases: [
      {
        en: 'be comfortable in your own skin',
        m: { uk: 'почуватися комфортно у своєму тілі, приймати себе', ru: 'чувствовать себя комфортно в своём теле, принимать себя', en: 'feel relaxed and happy with who you are' },
        story: {
          uk: 'Буквально «зручно у власній шкірі». Так кажуть про людину, яка не соромиться своєї зовнішності чи характеру і не намагається бути кимось іншим. Вираз нейтральний і дуже позитивний, його часто чути в інтерв’ю та статтях про підлітків. Ідея пісні саме в цьому: прийняти себе повністю.',
          ru: 'Буквально «удобно в собственной коже». Так говорят о человеке, который не стесняется своей внешности или характера и не пытается быть кем-то другим. Выражение нейтральное и очень позитивное, его часто слышно в интервью и статьях о подростках. Идея песни именно в этом: принять себя полностью.',
          en: 'Literally comfortable in your own skin. People say it about someone who is not ashamed of their looks or personality and does not try to be someone else. It is neutral and very positive, and you often hear it in interviews and articles about teens. That is exactly the idea of the song: accept yourself completely.',
        },
        ex: ['After a year of dance classes, Mia feels comfortable in her own skin.', 'It takes time to be comfortable in your own skin, so be patient with yourself.'],
        similar: ['be at ease with yourself', 'feel good about yourself'],
        tip: {
          uk: 'Кажіть your own skin, his own skin, her own skin. Слово own тут обов’язкове.',
          ru: 'Говорите your own skin, his own skin, her own skin. Слово own здесь обязательно.',
          en: 'Say your own skin, his own skin, her own skin. The word own is needed here.',
        },
      },
      {
        en: 'show your true colours',
        m: { uk: 'показати своє справжнє обличчя', ru: 'показать своё истинное лицо', en: 'show what you are really like' },
        story: {
          uk: 'Вираз прийшов із мореплавства: кораблі піднімали прапор (colours), щоб показати, чиї вони. Сьогодні так кажуть, коли людина нарешті показує свій справжній характер. Може звучати і позитивно, і негативно, залежно від ситуації. У контексті пісні це заклик не ховати себе справжнього.',
          ru: 'Выражение пришло из мореплавания: корабли поднимали флаг (colours), чтобы показать, чьи они. Сегодня так говорят, когда человек наконец показывает свой настоящий характер. Может звучать и позитивно, и негативно, в зависимости от ситуации. В контексте песни это призыв не прятать себя настоящего.',
          en: 'The phrase comes from sailing: ships raised their flag, called colours, to show who they belonged to. Today we say it when a person finally shows their real character. It can be positive or negative, depending on the situation. In the context of this song it is a call not to hide the real you.',
        },
        ex: ['At the school show, quiet Tom showed his true colours as a brilliant comedian.', 'He was nice at first, but then he showed his true colours and started shouting.'],
        similar: ['be yourself', 'show who you really are'],
        tip: {
          uk: 'У британській англійській пишуть colours, в американській colors. Обидва варіанти правильні.',
          ru: 'В британском английском пишут colours, в американском colors. Оба варианта правильные.',
          en: 'British English spells it colours, American English colors. Both are correct.',
        },
      },
      {
        en: 'embrace who you are',
        m: { uk: 'прийняти себе таким, яким ти є', ru: 'принять себя таким, какой ты есть', en: 'fully accept yourself' },
        story: {
          uk: 'Embrace буквально означає «обійняти». Коли ти «обіймаєш» себе, ти не просто терпиш свої особливості, а радієш їм. Вираз трохи урочистий, його люблять мотиваційні блогери та психологи. Він ідеально передає настрій пісні про гордість за себе.',
          ru: 'Embrace буквально значит «обнять». Когда ты «обнимаешь» себя, ты не просто терпишь свои особенности, а радуешься им. Выражение немного торжественное, его любят мотивационные блогеры и психологи. Оно идеально передаёт настроение песни о гордости за себя.',
          en: 'Embrace literally means to hug. When you embrace who you are, you don’t just put up with your special features, you celebrate them. The phrase sounds a little formal and is popular with motivational bloggers and psychologists. It matches the song’s mood of being proud of yourself perfectly.',
        },
        ex: ['I used to hide my curly hair, but now I embrace who I am.', 'The coach told us to embrace who we are and play our own style.'],
        similar: ['accept yourself', 'celebrate yourself'],
        tip: {
          uk: 'Після embrace не потрібен прийменник: embrace a change, а не embrace to a change.',
          ru: 'После embrace не нужен предлог: embrace a change, а не embrace to a change.',
          en: 'No preposition after embrace: embrace a change, not embrace to a change.',
        },
      },
      {
        en: 'march to the beat of your own drum',
        m: { uk: 'жити по-своєму, не як усі', ru: 'жить по-своему, не как все', en: 'do things your own way' },
        story: {
          uk: 'Уявіть парад, де всі крокують під один барабан, а одна людина йде під свій ритм. Так носії мови описують тих, хто має власний стиль і не повторює за натовпом. Вираз розмовний і зазвичай звучить як комплімент. Пісні про унікальність він пасує ідеально.',
          ru: 'Представьте парад, где все шагают под один барабан, а один человек идёт под свой ритм. Так носители языка описывают тех, у кого свой стиль и кто не повторяет за толпой. Выражение разговорное и обычно звучит как комплимент. Песне об уникальности оно подходит идеально.',
          en: 'Imagine a parade where everyone walks to one drum, but one person walks to their own rhythm. That is how native speakers describe people with their own style who don’t copy the crowd. It is informal and usually sounds like a compliment. It suits a song about being unique perfectly.',
        },
        ex: ['My aunt marches to the beat of her own drum, she travels alone and paints all night.', 'Our art teacher encourages us to march to the beat of our own drum.'],
        similar: ['do your own thing', 'go your own way'],
        tip: {
          uk: 'Часто кажуть коротше: dance to your own beat. Значення те саме.',
          ru: 'Часто говорят короче: dance to your own beat. Значение то же.',
          en: 'A shorter version is dance to your own beat. The meaning is the same.',
        },
      },
      {
        en: 'don’t judge a book by its cover',
        m: { uk: 'не суди за зовнішністю', ru: 'не суди по внешности', en: 'don’t decide what someone is like from how they look' },
        story: {
          uk: 'Це прислів’я: обкладинка книжки не каже, що всередині. Так само зовнішність людини не показує її характер. Прислів’я знають усі, його кажуть і батьки, і вчителі. Пісня нагадує, що кожен цінний незалежно від того, як виглядає.',
          ru: 'Это пословица: обложка книги не говорит, что внутри. Так же внешность человека не показывает его характер. Пословицу знают все, её говорят и родители, и учителя. Песня напоминает, что каждый ценен независимо от того, как выглядит.',
          en: 'This is a proverb: the cover of a book doesn’t tell you what is inside. In the same way, a person’s looks don’t show their character. Everyone knows it, and parents and teachers say it often. The song reminds us that everyone is valuable no matter how they look.',
        },
        ex: ['The new boy looked scary, but he’s the kindest person in class. Don’t judge a book by its cover!', 'That café looks old, but the food is amazing. Never judge a book by its cover.'],
        similar: ['looks can be deceiving', 'appearances can be deceptive'],
        tip: {
          uk: 'Можна сказати і never judge a book by its cover. Слово its без апострофа, бо це присвійна форма.',
          ru: 'Можно сказать и never judge a book by its cover. Слово its без апострофа, потому что это притяжательная форма.',
          en: 'You can also say never judge a book by its cover. Its has no apostrophe because it is possessive.',
        },
      },
      {
        en: 'own it',
        m: { uk: 'приймай це впевнено, «володій» цим', ru: 'принимай это уверенно, «владей» этим', en: 'accept something about yourself with confidence' },
        story: {
          uk: 'Own означає «володіти». Розмовне own it кажуть, коли радять не соромитися чогось, а впевнено це показувати: нову зачіску, акцент, помилку. Дуже сучасний, молодіжний вираз. Сміливий стиль Леді Гаги, її костюми й грим, це класичний приклад того, як own it.',
          ru: 'Own значит «владеть». Разговорное own it говорят, когда советуют не стесняться чего-то, а уверенно это показывать: новую причёску, акцент, ошибку. Очень современное, молодёжное выражение. Смелый стиль Леди Гаги, её костюмы и грим, это классический пример того, как own it.',
          en: 'Own means to possess. Informal own it is advice not to be shy about something but to show it with confidence: a new haircut, an accent, even a mistake. It is a modern, young expression. Lady Gaga’s bold style, costumes and make-up are a classic example of how to own it.',
        },
        ex: ['You chose a pink suit for the party? Great, just own it!', 'I made a mistake in my speech, but I owned it and kept going.'],
        similar: ['rock it', 'wear it with pride'],
        tip: {
          uk: 'Також кажуть own your mistakes, тобто чесно визнавати свої помилки.',
          ru: 'Также говорят own your mistakes, то есть честно признавать свои ошибки.',
          en: 'People also say own your mistakes, meaning admit them honestly.',
        },
      },
      {
        en: 'stay true to yourself',
        m: { uk: 'залишатися вірним собі', ru: 'оставаться верным себе', en: 'keep your values and personality' },
        story: {
          uk: 'Так радять людині, яка змінюється заради інших або під тиском компанії. Вираз нейтральний, його часто пишуть у листівках випускникам. Він означає: що б не казали інші, не зраджуй своїм цінностям. Пісня про те саме: не змінюй себе, щоб комусь сподобатися.',
          ru: 'Так советуют человеку, который меняется ради других или под давлением компании. Выражение нейтральное, его часто пишут в открытках выпускникам. Оно значит: что бы ни говорили другие, не изменяй своим ценностям. Песня о том же: не меняй себя, чтобы кому-то понравиться.',
          en: 'People give this advice to someone who is changing to please others or because of pressure from friends. It is neutral and often written in cards for graduates. It means: whatever others say, keep your values. The song says the same thing: don’t change yourself just to be liked.',
        },
        ex: ['Good luck at your new school, and stay true to yourself.', 'Even when she became famous, she stayed true to herself.'],
        similar: ['be true to yourself', 'keep it real'],
        tip: {
          uk: 'Прийменник to: true to yourself. Не кажіть true for yourself.',
          ru: 'Предлог to: true to yourself. Не говорите true for yourself.',
          en: 'Use to: true to yourself, not true for yourself.',
        },
      },
      {
        en: 'nobody’s perfect',
        m: { uk: 'ніхто не ідеальний', ru: 'никто не идеален', en: 'everyone makes mistakes or has faults' },
        story: {
          uk: 'Коротка фраза-підтримка, яку кажуть після помилки або коли хтось себе критикує. Звучить тепло й по-дружньому. Nobody’s тут означає nobody is. Вона добре доповнює ідею пісні: наші недоліки теж частина нас.',
          ru: 'Короткая фраза-поддержка, которую говорят после ошибки или когда кто-то себя критикует. Звучит тепло и по-дружески. Nobody’s здесь значит nobody is. Она хорошо дополняет идею песни: наши недостатки тоже часть нас.',
          en: 'A short, supportive phrase people say after a mistake or when someone criticises themselves. It sounds warm and friendly. Here nobody’s means nobody is. It fits the song’s idea that our faults are also part of us.',
        },
        ex: ['I burned the pancakes again. Oh well, nobody’s perfect!', 'Don’t be so hard on yourself, nobody’s perfect.'],
        similar: ['we all make mistakes', 'it happens to everyone'],
        tip: {
          uk: 'Після nobody дієслово в однині: nobody is, nobody knows. Не кажіть nobody are.',
          ru: 'После nobody глагол в единственном числе: nobody is, nobody knows. Не говорите nobody are.',
          en: 'Nobody takes a singular verb: nobody is, nobody knows, not nobody are.',
        },
      },
      {
        en: 'think outside the box',
        m: { uk: 'мислити нестандартно', ru: 'мыслить нестандартно', en: 'think in a new, creative way' },
        story: {
          uk: 'Box тут означає рамки, звичні правила. Думати «поза коробкою» означає шукати нові, незвичайні рішення. Вираз дуже поширений у школі та на роботі, звучить нейтрально. Леді Гага відома тим, що завжди мислить нестандартно у своїх кліпах і виступах.',
          ru: 'Box здесь означает рамки, привычные правила. Думать «вне коробки» значит искать новые, необычные решения. Выражение очень распространено в школе и на работе, звучит нейтрально. Леди Гага известна тем, что всегда мыслит нестандартно в своих клипах и выступлениях.',
          en: 'The box here means limits and usual rules. To think outside the box is to look for new, unusual solutions. The phrase is very common at school and at work and sounds neutral. Lady Gaga is famous for always thinking outside the box in her videos and shows.',
        },
        ex: ['We had no glue, so we thought outside the box and used honey.', 'Our teacher wants us to think outside the box for this project.'],
        similar: ['be creative', 'get creative'],
        tip: {
          uk: 'Кажіть outside the box з артиклем the. Без нього фраза звучить неприродно.',
          ru: 'Говорите outside the box с артиклем the. Без него фраза звучит неестественно.',
          en: 'Keep the article: outside the box, not outside box.',
        },
      },
      {
        en: 'a role model',
        m: { uk: 'приклад для наслідування', ru: 'пример для подражания', en: 'a person others want to be like' },
        story: {
          uk: 'Role model це людина, на яку рівняються: батьки, тренер, артист. Вираз нейтральний, його вживають і в розмові, і в статтях. Для багатьох підлітків Леді Гага стала прикладом сміливості й самоприйняття. Добре вміти пояснити англійською, хто твій role model і чому.',
          ru: 'Role model это человек, на которого равняются: родители, тренер, артист. Выражение нейтральное, его используют и в разговоре, и в статьях. Для многих подростков Леди Гага стала примером смелости и принятия себя. Хорошо уметь объяснить по-английски, кто твой role model и почему.',
          en: 'A role model is a person others look up to: a parent, a coach, an artist. The phrase is neutral, used in conversation and in articles. For many teens Lady Gaga became an example of courage and self-acceptance. It is useful to be able to explain in English who your role model is and why.',
        },
        ex: ['My older sister is my role model, she always works hard.', 'Sports stars should be good role models for kids.'],
        similar: ['someone to look up to', 'an idol', 'an inspiration'],
        tip: {
          uk: 'Не кажіть an example person. Природно звучить a role model або someone I look up to.',
          ru: 'Не говорите an example person. Естественно звучит a role model или someone I look up to.',
          en: 'Don’t say an example person. Say a role model or someone I look up to.',
        },
      },
    ],
    culture: [
      {
        uk: 'У 2012 році Леді Гага разом зі своєю мамою заснувала благодійну організацію Born This Way Foundation. Вона підтримує молодь і поширює ідеї доброти та турботи про психічне здоров’я.',
        ru: 'В 2012 году Леди Гага вместе со своей мамой основала благотворительную организацию Born This Way Foundation. Она поддерживает молодёжь и распространяет идеи доброты и заботы о психическом здоровье.',
        en: 'In 2012 Lady Gaga and her mother started the Born This Way Foundation, a charity that supports young people and promotes kindness and mental health.',
      },
      {
        uk: 'Фанатів Леді Гаги називають Little Monsters, «маленькі монстри», а саму співачку вони жартома звуть Mother Monster.',
        ru: 'Фанатов Леди Гаги называют Little Monsters, «маленькие монстры», а саму певицу они в шутку зовут Mother Monster.',
        en: 'Lady Gaga’s fans are called Little Monsters, and they jokingly call the singer Mother Monster.',
      },
      {
        uk: 'Справжнє ім’я Леді Гаги Стефані Джерманотта. Вона виросла в Нью-Йорку і з дитинства грала на фортепіано.',
        ru: 'Настоящее имя Леди Гаги Стефани Джерманотта. Она выросла в Нью-Йорке и с детства играла на фортепиано.',
        en: 'Lady Gaga’s real name is Stefani Germanotta. She grew up in New York and has played the piano since she was a child.',
      },
    ],
  },

  'million-reasons': {
    intro: {
      uk: 'Це пісня про момент, коли важко вирішити: залишитися чи піти, вірити далі чи здатися. Такі ситуації бувають у кожного, і в школі, і в дружбі, і на роботі. Нижче вирази, якими носії мови описують сумніви, вибір і підтримку. Вони допоможуть пояснити англійською, що ти відчуваєш, коли рішення дається нелегко.',
      ru: 'Это песня о моменте, когда трудно решить: остаться или уйти, верить дальше или сдаться. Такие ситуации бывают у каждого, и в школе, и в дружбе, и на работе. Ниже выражения, которыми носители языка описывают сомнения, выбор и поддержку. Они помогут объяснить по-английски, что ты чувствуешь, когда решение даётся нелегко.',
      en: 'This song is about a moment when it is hard to decide: stay or go, keep believing or give up. Everyone faces situations like this, at school, in friendships and at work. Below are expressions native speakers use to talk about doubt, choices and support. They will help you explain in English how you feel when a decision is not easy.',
    },
    phrases: [
      {
        en: 'on the fence',
        m: { uk: 'вагатися, не визначитися', ru: 'колебаться, не определиться', en: 'not able to decide' },
        story: {
          uk: 'Уявіть людину, яка сидить на паркані між двома дворами і не може вирішити, куди стрибнути. Так носії кажуть про того, хто ще не обрав сторону. Вираз розмовний, дуже частий. Героїня пісні саме в такому стані: між двома рішеннями.',
          ru: 'Представьте человека, который сидит на заборе между двумя дворами и не может решить, куда спрыгнуть. Так носители говорят о том, кто ещё не выбрал сторону. Выражение разговорное, очень частое. Героиня песни именно в таком состоянии: между двумя решениями.',
          en: 'Imagine someone sitting on a fence between two gardens, not sure which side to jump down. That is how native speakers describe a person who hasn’t chosen a side yet. It is informal and very common. The singer in this song is in exactly that state, between two decisions.',
        },
        ex: ['I’m still on the fence about joining the drama club.', 'Most of the class wanted pizza, but Ben was on the fence.'],
        similar: ['undecided', 'in two minds'],
        tip: {
          uk: 'Кажемо on the fence about something: on the fence about the trip.',
          ru: 'Говорим on the fence about something: on the fence about the trip.',
          en: 'Use about: on the fence about the trip.',
        },
      },
      {
        en: 'weigh up the pros and cons',
        m: { uk: 'зважити всі «за» і «проти»', ru: 'взвесить все «за» и «против»', en: 'think about the good and bad sides' },
        story: {
          uk: 'Pros походить від латинського «за», cons від «проти». Weigh up буквально «зважити на терезах». Так кажуть, коли спокійно аналізують рішення. Вираз нейтральний, підходить і для школи, і для роботи. Пісня показує, як важко зважувати, коли замішані почуття.',
          ru: 'Pros происходит от латинского «за», cons от «против». Weigh up буквально «взвесить на весах». Так говорят, когда спокойно анализируют решение. Выражение нейтральное, подходит и для школы, и для работы. Песня показывает, как трудно взвешивать, когда замешаны чувства.',
          en: 'Pros comes from the Latin for for, and cons from against. Weigh up literally means to put on scales. We say it when we calmly analyse a decision. It is neutral and works at school and at work. The song shows how hard it is to weigh things up when feelings are involved.',
        },
        ex: ['Before buying a new phone, I weighed up the pros and cons.', 'Let’s write down the pros and cons of moving to a bigger flat.'],
        similar: ['think it through', 'consider both sides'],
        tip: {
          uk: 'Можна сказати коротше: weigh up your options. А pros and cons часто вживають окремо: What are the pros and cons?',
          ru: 'Можно сказать короче: weigh up your options. А pros and cons часто используют отдельно: What are the pros and cons?',
          en: 'A shorter version is weigh up your options. You can also use pros and cons alone: What are the pros and cons?',
        },
      },
      {
        en: 'torn between',
        m: { uk: 'розриватися між', ru: 'разрываться между', en: 'unable to choose between two things you want' },
        story: {
          uk: 'Torn це форма від tear, «рвати». Людина ніби розривається навпіл, бо хоче двох речей одночасно. Вираз емоційний, але звичайний у розмові. Він точно описує почуття, коли і серце, і розум тягнуть у різні боки, як у цій пісні.',
          ru: 'Torn это форма от tear, «рвать». Человек будто разрывается пополам, потому что хочет двух вещей одновременно. Выражение эмоциональное, но обычное в разговоре. Оно точно описывает чувство, когда и сердце, и разум тянут в разные стороны, как в этой песне.',
          en: 'Torn comes from tear, to rip. The person feels split in two because they want two things at once. The phrase is emotional but normal in conversation. It describes exactly the feeling when your heart and your head pull in different directions, as in this song.',
        },
        ex: ['I’m torn between football and swimming, I love both.', 'She was torn between staying with her friends and going on the trip.'],
        similar: ['can’t choose between', 'in a dilemma'],
        tip: {
          uk: 'Після torn between ставимо два варіанти через and: torn between A and B. Не кажіть torn between A or B.',
          ru: 'После torn between ставим два варианта через and: torn between A and B. Не говорите torn between A or B.',
          en: 'Use and: torn between A and B, not A or B.',
        },
      },
      {
        en: 'hang in there',
        m: { uk: 'тримайся, не здавайся', ru: 'держись, не сдавайся', en: 'don’t give up, it will get better' },
        story: {
          uk: 'Буквально «повиси там ще трохи». Цю фразу-підтримку кажуть людині, якій зараз важко: перед іспитом, після сварки, на тренуванні. Звучить тепло і неформально. Вона пасує до настрою пісні: попри всі труднощі, тримайся за надію.',
          ru: 'Буквально «повиси там ещё немного». Эту фразу-поддержку говорят человеку, которому сейчас трудно: перед экзаменом, после ссоры, на тренировке. Звучит тепло и неформально. Она подходит к настроению песни: несмотря на все трудности, держись за надежду.',
          en: 'Literally stay hanging there a little longer. People say this to someone who is having a hard time: before an exam, after an argument, during training. It sounds warm and informal. It matches the mood of the song: hold on to hope despite the difficulties.',
        },
        ex: ['Only two more days of exams. Hang in there!', 'I know your arm hurts, but hang in there, the doctor is coming.'],
        similar: ['keep going', 'stay strong', 'don’t give up'],
        tip: {
          uk: 'Не кажіть hang on there. Правильно hang in there. А hang on означає «зачекай».',
          ru: 'Не говорите hang on there. Правильно hang in there. А hang on значит «подожди».',
          en: 'Don’t say hang on there. It is hang in there. Hang on means wait a moment.',
        },
      },
      {
        en: 'the last straw',
        m: { uk: 'остання крапля', ru: 'последняя капля', en: 'the final problem that makes you lose patience' },
        story: {
          uk: 'Повна версія прислів’я: соломинка, що зламала спину верблюдові. Тобто дрібниця після багатьох проблем стає вирішальною. В українській і російській є схоже «остання крапля». Вираз розмовний. Пісня якраз про момент, коли причин піти вже дуже багато.',
          ru: 'Полная версия пословицы: соломинка, которая сломала спину верблюду. То есть мелочь после многих проблем становится решающей. В русском есть похожее «последняя капля». Выражение разговорное. Песня как раз о моменте, когда причин уйти уже очень много.',
          en: 'The full proverb is about the straw that broke the camel’s back: one small thing after many problems becomes the one that matters. Ukrainian and Russian say the last drop. It is informal. The song is about a moment when there are already many reasons to leave.',
        },
        ex: ['He was late again and forgot my birthday. That was the last straw.', 'The Wi-Fi stopped working during my game, the last straw after a bad day.'],
        similar: ['the final straw', 'enough is enough'],
        tip: {
          uk: 'Не перекладайте дослівно the last drop. Англійською природно the last straw.',
          ru: 'Не переводите дословно the last drop. По-английски естественно the last straw.',
          en: 'Ukrainian and Russian speakers often say the last drop. In English say the last straw.',
        },
      },
      {
        en: 'give someone the benefit of the doubt',
        m: { uk: 'повірити комусь, хоч є сумніви', ru: 'поверить кому-то, хотя есть сомнения', en: 'choose to believe someone even if you are not sure' },
        story: {
          uk: 'Вираз прийшов із суду: якщо немає доказів, рішення на користь обвинуваченого. У житті так кажуть, коли вирішуєш довіритися людині, хоча можна й засумніватися. Звучить нейтрально, трохи по-дорослому. Пісня про бажання знайти бодай одну причину вірити далі.',
          ru: 'Выражение пришло из суда: если нет доказательств, решение в пользу обвиняемого. В жизни так говорят, когда решаешь довериться человеку, хотя можно и засомневаться. Звучит нейтрально, немного по-взрослому. Песня о желании найти хотя бы одну причину верить дальше.',
          en: 'The phrase comes from law courts: if there is no proof, the decision goes in favour of the person. In life we say it when we choose to trust someone, although we could doubt them. It sounds neutral and a bit grown-up. The song is about wanting one reason to keep believing.',
        },
        ex: ['She says she missed the bus. Let’s give her the benefit of the doubt.', 'I gave him the benefit of the doubt, and he really was ill.'],
        similar: ['trust someone', 'believe someone'],
        tip: {
          uk: 'Doubt вимовляється без b: [даут]. Буква b тут німа.',
          ru: 'Doubt произносится без b: [даут]. Буква b здесь немая.',
          en: 'The b in doubt is silent: it sounds like dout.',
        },
      },
      {
        en: 'sleep on it',
        m: { uk: 'відкласти рішення до ранку, «переспати з думкою»', ru: 'отложить решение до утра, «переспать с мыслью»', en: 'wait until tomorrow to decide' },
        story: {
          uk: 'Мудра порада: не вирішуй щось важливе ввечері, коли ти втомлений, а подумай уранці. У російській є схоже «утро вечера мудренее». Вираз розмовний і дружній. Він доречний, коли героїня пісні не може визначитися просто зараз.',
          ru: 'Мудрый совет: не решай что-то важное вечером, когда ты устал, а подумай утром. В русском есть похожее «утро вечера мудренее». Выражение разговорное и дружеское. Оно уместно, когда героиня песни не может определиться прямо сейчас.',
          en: 'Wise advice: don’t decide something important in the evening when you are tired, think again in the morning. Russian has a similar saying, the morning is wiser than the evening. It is informal and friendly. It makes sense when someone, like the singer here, can’t decide right now.',
        },
        ex: ['I don’t know if I want the job. I’ll sleep on it.', 'Don’t buy the jacket now, sleep on it and come back tomorrow.'],
        similar: ['take some time to think', 'think it over'],
        tip: {
          uk: 'Кажемо sleep on it, а не sleep with it. Прийменник on тут ключовий.',
          ru: 'Говорим sleep on it, а не sleep with it. Предлог on здесь ключевой.',
          en: 'Say sleep on it, not sleep with it. The preposition on is the key.',
        },
      },
      {
        en: 'trust your gut',
        m: { uk: 'довіряти своїй інтуїції', ru: 'доверять своей интуиции', en: 'follow your feeling, not only logic' },
        story: {
          uk: 'Gut це «нутро», живіт. Англійською інтуїцію часто описують як відчуття в животі: a gut feeling. Trust your gut радять, коли логіка не допомагає. Вираз розмовний, дуже поширений. Пісня показує, як важко, коли розум і почуття кажуть різне.',
          ru: 'Gut это «нутро», живот. По-английски интуицию часто описывают как ощущение в животе: a gut feeling. Trust your gut советуют, когда логика не помогает. Выражение разговорное, очень распространённое. Песня показывает, как трудно, когда разум и чувства говорят разное.',
          en: 'Gut means your stomach, your insides. In English intuition is often described as a feeling in your stomach: a gut feeling. People say trust your gut when logic doesn’t help. It is informal and very common. The song shows how hard it is when your mind and feelings say different things.',
        },
        ex: ['I had a bad feeling about that website, so I trusted my gut and didn’t buy anything.', 'When you can’t decide, trust your gut.'],
        similar: ['follow your instinct', 'go with your gut', 'follow your heart'],
        tip: {
          uk: 'Корисний вираз: I have a gut feeling that..., тобто «у мене передчуття, що...».',
          ru: 'Полезное выражение: I have a gut feeling that..., то есть «у меня предчувствие, что...».',
          en: 'A useful extra: I have a gut feeling that... means I sense that something is true.',
        },
      },
      {
        en: 'a leap of faith',
        m: { uk: 'стрибок віри, ризикнути, довірившись', ru: 'прыжок веры, рискнуть, доверившись', en: 'doing something without being sure it will work' },
        story: {
          uk: 'Leap означає «стрибок». A leap of faith це рішення, коли ти не маєш гарантій, але віриш, що все вийде. Вираз трохи урочистий, але його чути і в повсякденних розмовах: про переїзд, нову роботу, нову дружбу. Пісня про віру, і цей вираз чудово сюди пасує.',
          ru: 'Leap значит «прыжок». A leap of faith это решение, когда у тебя нет гарантий, но ты веришь, что всё получится. Выражение немного торжественное, но его слышно и в повседневных разговорах: о переезде, новой работе, новой дружбе. Песня о вере, и это выражение отлично сюда подходит.',
          en: 'Leap means jump. A leap of faith is a decision you make without guarantees, believing it will work out. It sounds a little formal, but you hear it in everyday talk too: about moving, a new job, a new friendship. The song is about faith, so this phrase fits well.',
        },
        ex: ['Moving to another city was a leap of faith, but we love it here.', 'Starting her own bakery was a real leap of faith.'],
        similar: ['take a chance', 'take a risk'],
        tip: {
          uk: 'Найчастіше кажуть take a leap of faith: We decided to take a leap of faith.',
          ru: 'Чаще всего говорят take a leap of faith: We decided to take a leap of faith.',
          en: 'The most common verb is take: take a leap of faith.',
        },
      },
      {
        en: 'stand by someone',
        m: { uk: 'бути поруч, підтримувати когось у складний час', ru: 'быть рядом, поддерживать кого-то в трудное время', en: 'support someone when things are hard' },
        story: {
          uk: 'Stand by буквально «стояти поруч». Так кажуть про вірність: друг, який не йде, коли в тебе проблеми. Вираз нейтральний, трохи емоційний. У пісні йдеться про пошук причини лишитися поруч, тож він дуже доречний.',
          ru: 'Stand by буквально «стоять рядом». Так говорят о верности: друг, который не уходит, когда у тебя проблемы. Выражение нейтральное, немного эмоциональное. В песне речь о поиске причины остаться рядом, поэтому оно очень уместно.',
          en: 'Stand by literally means stand next to. We use it about loyalty: a friend who doesn’t leave when you have problems. It is neutral and a little emotional. The song is about looking for a reason to stay by someone, so it fits very well.',
        },
        ex: ['My friends stood by me when I broke my leg.', 'A good team stands by its captain, even after a bad game.'],
        similar: ['support someone', 'stick with someone'],
        tip: {
          uk: 'Не плутайте stand by someone (підтримувати) зі stand by (бути напоготові): Please stand by, the show starts in a minute.',
          ru: 'Не путайте stand by someone (поддерживать) со stand by (быть наготове): Please stand by, the show starts in a minute.',
          en: 'Don’t confuse stand by someone (support) with stand by (be ready): Please stand by, the show starts in a minute.',
        },
      },
    ],
    culture: [
      {
        uk: 'Шоу в перерві Super Bowl, фіналу з американського футболу, найпопулярніший музичний виступ року в США. Виступити там дуже престижно, і щороку його дивляться понад сто мільйонів глядачів.',
        ru: 'Шоу в перерыве Super Bowl, финала по американскому футболу, самое популярное музыкальное выступление года в США. Выступить там очень престижно, и каждый год его смотрят больше ста миллионов зрителей.',
        en: 'The Super Bowl halftime show, during the final of American football, is the biggest music performance of the year in the USA. It is a great honour to perform there, and more than a hundred million people watch it every year.',
      },
      {
        uk: 'Про створення альбому «Joanne» розповідає документальний фільм «Gaga: Five Foot Two» (2017) на Netflix. Five foot two означає 5 футів 2 дюйми, тобто зріст співачки, близько 157 см.',
        ru: 'О создании альбома «Joanne» рассказывает документальный фильм «Gaga: Five Foot Two» (2017) на Netflix. Five foot two значит 5 футов 2 дюйма, то есть рост певицы, около 157 см.',
        en: 'The Netflix documentary Gaga: Five Foot Two (2017) shows the making of Joanne. Five foot two is the singer’s height, about 157 cm.',
      },
      {
        uk: 'У США та Великій Британії зріст досі часто вимірюють у футах і дюймах. Один фут приблизно 30 см, один дюйм приблизно 2,5 см.',
        ru: 'В США и Великобритании рост до сих пор часто измеряют в футах и дюймах. Один фут примерно 30 см, один дюйм примерно 2,5 см.',
        en: 'In the USA and the UK, people still often measure height in feet and inches. One foot is about 30 cm and one inch is about 2.5 cm.',
      },
    ],
  },

  'always-remember-us-this-way': {
    intro: {
      uk: 'Ця балада про бажання зупинити мить і зберегти її в пам’яті назавжди. Тема спогадів дуже зручна для уроку: кожному є що розповісти про улюблене літо, поїздку чи свято. Нижче вирази, якими носії мови говорять про пам’ять, ностальгію та особливі моменти. Усі приклади наші власні, тож ними можна сміливо користуватися в розмові.',
      ru: 'Эта баллада о желании остановить мгновение и сохранить его в памяти навсегда. Тема воспоминаний очень удобна для урока: каждому есть что рассказать о любимом лете, поездке или празднике. Ниже выражения, которыми носители языка говорят о памяти, ностальгии и особенных моментах. Все примеры наши собственные, так что ими можно смело пользоваться в разговоре.',
      en: 'This ballad is about wanting to stop a moment and keep it in your memory forever. Memories are a great lesson topic: everyone has a favourite summer, trip or holiday to talk about. Below are expressions native speakers use to talk about memory, nostalgia and special moments. All the examples are our own, so you can use them in conversation.',
    },
    phrases: [
      {
        en: 'a trip down memory lane',
        m: { uk: 'подорож у минуле, приємні спогади', ru: 'путешествие в прошлое, приятные воспоминания', en: 'a time when you remember happy past moments' },
        story: {
          uk: 'Memory lane це уявна «вуличка спогадів». Коли родина розглядає старі фото чи друзі згадують шкільні роки, це a trip down memory lane. Вираз теплий, розмовний, трохи ностальгійний. Пісня і є такою подорожжю до особливого моменту.',
          ru: 'Memory lane это воображаемая «улочка воспоминаний». Когда семья рассматривает старые фото или друзья вспоминают школьные годы, это a trip down memory lane. Выражение тёплое, разговорное, немного ностальгическое. Песня и есть такое путешествие к особенному моменту.',
          en: 'Memory lane is an imaginary street of memories. When a family looks at old photos or friends talk about their school days, that is a trip down memory lane. The phrase is warm, informal and a little nostalgic. The song itself is a trip like this to a special moment.',
        },
        ex: ['Looking at my baby photos was a fun trip down memory lane.', 'At the reunion, Dad and his friends took a trip down memory lane.'],
        similar: ['reminisce', 'look back'],
        tip: {
          uk: 'Найчастіші дієслова: take a trip down memory lane або go down memory lane.',
          ru: 'Самые частые глаголы: take a trip down memory lane или go down memory lane.',
          en: 'The usual verbs are take a trip down memory lane or go down memory lane.',
        },
      },
      {
        en: 'make memories',
        m: { uk: 'створювати спогади, проводити незабутній час', ru: 'создавать воспоминания, проводить незабываемое время', en: 'do things together that you will remember' },
        story: {
          uk: 'Сучасний і дуже популярний вираз: ми не просто відпочиваємо, а «створюємо спогади». Його часто пишуть під фото з відпустки. Звучить тепло й по-родинному. Пісня про цінність таких моментів, які потім хочеться пам’ятати.',
          ru: 'Современное и очень популярное выражение: мы не просто отдыхаем, а «создаём воспоминания». Его часто пишут под фото из отпуска. Звучит тепло и по-семейному. Песня о ценности таких моментов, которые потом хочется помнить.',
          en: 'A modern and very popular phrase: we are not just on holiday, we are making memories. People often write it under holiday photos. It sounds warm and family-like. The song is about how valuable these moments are, the ones you want to remember later.',
        },
        ex: ['This summer we want to make memories, not just stay at home.', 'Grandma says the best thing about holidays is making memories together.'],
        similar: ['create memories', 'have a great time'],
        tip: {
          uk: 'Не кажіть do memories. Правильне дієслово make.',
          ru: 'Не говорите do memories. Правильный глагол make.',
          en: 'Don’t say do memories. The right verb is make.',
        },
      },
      {
        en: 'treasure a moment',
        m: { uk: 'дорожити моментом', ru: 'дорожить моментом', en: 'value a moment very much' },
        story: {
          uk: 'Treasure як іменник означає «скарб», а як дієслово «дорожити, берегти як скарб». Вираз трохи поетичний, підходить для листівок і щирих розмов. Ним описують мить, яку хочеш назавжди зберегти. Саме про таку мить ця балада.',
          ru: 'Treasure как существительное значит «сокровище», а как глагол «дорожить, беречь как сокровище». Выражение немного поэтичное, подходит для открыток и искренних разговоров. Им описывают миг, который хочешь навсегда сохранить. Именно о таком миге эта баллада.',
          en: 'As a noun, treasure means valuable things like gold. As a verb, it means to value something very much. The phrase is a bit poetic and fits cards and heartfelt talks. It describes a moment you want to keep forever. This ballad is about exactly that kind of moment.',
        },
        ex: ['I treasure every moment with my little cousin before she moves away.', 'We should treasure these quiet evenings together.'],
        similar: ['cherish a moment', 'hold on to a moment'],
        tip: {
          uk: 'Можна treasure будь-що цінне: treasure a gift, treasure a friendship.',
          ru: 'Можно treasure что угодно ценное: treasure a gift, treasure a friendship.',
          en: 'You can treasure anything valuable: treasure a gift, treasure a friendship.',
        },
      },
      {
        en: 'know something by heart',
        m: { uk: 'знати напам’ять', ru: 'знать наизусть', en: 'remember every word without looking' },
        story: {
          uk: 'Англійською знання «напам’ять» живе в серці, а не в пам’яті. Так кажуть про вірші, пісні, номери телефонів. Вираз нейтральний, його вживають і вчителі, і друзі. Багато фанатів знають цю пісню by heart і співають її на концертах.',
          ru: 'По-английски знание «наизусть» живёт в сердце, а не в памяти. Так говорят о стихах, песнях, номерах телефонов. Выражение нейтральное, его используют и учителя, и друзья. Многие фанаты знают эту песню by heart и поют её на концертах.',
          en: 'In English, knowing something perfectly lives in your heart, not your head. We say it about poems, songs and phone numbers. It is neutral, used by teachers and friends. Many fans know this song by heart and sing it at concerts.',
        },
        ex: ['I know my mum’s phone number by heart.', 'We have to learn this poem by heart for Friday.'],
        similar: ['learn something off by heart (British)', 'memorise'],
        tip: {
          uk: 'Не кажіть know by memory. Правильно by heart.',
          ru: 'Не говорите know by memory. Правильно by heart.',
          en: 'Don’t say know by memory. Say by heart.',
        },
      },
      {
        en: 'ring a bell',
        m: { uk: 'щось нагадувати, здаватися знайомим', ru: 'что-то напоминать, казаться знакомым', en: 'sound familiar' },
        story: {
          uk: 'Коли ім’я чи назва «дзвонять у дзвіночок», ти ніби щось пригадуєш, але не до кінця. Вираз розмовний і дуже поширений. Часто вживають у запереченні: It doesn’t ring a bell. Для теми пам’яті й спогадів це корисний щоденний вираз.',
          ru: 'Когда имя или название «звонят в колокольчик», ты будто что-то припоминаешь, но не до конца. Выражение разговорное и очень распространённое. Часто используют в отрицании: It doesn’t ring a bell. Для темы памяти и воспоминаний это полезное повседневное выражение.',
          en: 'When a name rings a bell, you half remember it. The phrase is informal and very common. It is often negative: It doesn’t ring a bell. For the topic of memory, it is a really useful everyday phrase.',
        },
        ex: ['The name Jackson Maine rings a bell. Is she from a film?', 'Sorry, that street name doesn’t ring a bell.'],
        similar: ['sound familiar', 'seem familiar'],
        tip: {
          uk: 'Підмет тут сама річ, а не людина: The name rings a bell. Не кажіть I ring a bell.',
          ru: 'Подлежащее здесь сама вещь, а не человек: The name rings a bell. Не говорите I ring a bell.',
          en: 'The thing is the subject, not the person: The name rings a bell, not I ring a bell.',
        },
      },
      {
        en: 'a moment to remember',
        m: { uk: 'мить, яку варто запам’ятати', ru: 'миг, который стоит запомнить', en: 'a special, important moment' },
        story: {
          uk: 'Так називають особливу подію: перший виступ, перемогу, зустріч із кумиром. Вираз нейтральний, його часто чути в репортажах і на святах. Він зрозумілий без пояснень і легко запам’ятовується. Вся пісня про одну таку мить.',
          ru: 'Так называют особенное событие: первое выступление, победу, встречу с кумиром. Выражение нейтральное, его часто слышно в репортажах и на праздниках. Оно понятно без объяснений и легко запоминается. Вся песня об одном таком миге.',
          en: 'We use this for a special event: a first performance, a win, meeting your idol. It is neutral and often heard in news reports and at celebrations. It is clear without explanation and easy to remember. The whole song is about one moment like this.',
        },
        ex: ['Scoring my first goal was a moment to remember.', 'The fireworks at the end of the festival were a moment to remember.'],
        similar: ['a special moment', 'a moment to treasure'],
        tip: {
          uk: 'Схожа модель: a day to remember, a night to remember, a trip to remember.',
          ru: 'Похожая модель: a day to remember, a night to remember, a trip to remember.',
          en: 'The same pattern works with a day, a night, a trip: a day to remember.',
        },
      },
      {
        en: 'feel nostalgic',
        m: { uk: 'відчувати ностальгію', ru: 'испытывать ностальгию', en: 'feel happy and a little sad about the past' },
        story: {
          uk: 'Ностальгія це суміш радості й легкого суму, коли згадуєш минуле. Слово нейтральне, трохи книжне, але його часто чути в розмовах. Носії кажуть feel nostalgic, коли слухають стару пісню чи переглядають дитячі мультфільми. Повільна мелодія балади викликає саме такий настрій.',
          ru: 'Ностальгия это смесь радости и лёгкой грусти, когда вспоминаешь прошлое. Слово нейтральное, немного книжное, но его часто слышно в разговорах. Носители говорят feel nostalgic, когда слушают старую песню или пересматривают детские мультфильмы. Медленная мелодия баллады вызывает именно такое настроение.',
          en: 'Nostalgia is a mix of happiness and a little sadness when you remember the past. The word is neutral and a bit bookish, but common in conversation. People say feel nostalgic when they hear an old song or rewatch childhood cartoons. The slow melody of this ballad creates exactly that mood.',
        },
        ex: ['Whenever I smell pine trees, I feel nostalgic about our New Year holidays.', 'Old cartoons make my dad feel nostalgic.'],
        similar: ['get nostalgic', 'miss the old days'],
        tip: {
          uk: 'Наголос на другий склад: nos-TAL-gic. Іменник nostalgia.',
          ru: 'Ударение на второй слог: nos-TAL-gic. Существительное nostalgia.',
          en: 'The stress is on the second syllable: nos-TAL-gic. The noun is nostalgia.',
        },
      },
      {
        en: 'once in a lifetime',
        m: { uk: 'раз у житті', ru: 'раз в жизни', en: 'very rare, it may never happen again' },
        story: {
          uk: 'Так кажуть про шанс чи подію, які можуть більше не повторитися: концерт улюбленої зірки, подорож мрії. Вираз нейтральний, його люблять реклама і журналісти. Перед іменником пишуть через дефіси: a once-in-a-lifetime trip. Особливі моменти, про які співають у баладі, саме такі.',
          ru: 'Так говорят о шансе или событии, которые могут больше не повториться: концерт любимой звезды, путешествие мечты. Выражение нейтральное, его любят реклама и журналисты. Перед существительным пишут через дефисы: a once-in-a-lifetime trip. Особенные моменты, о которых поют в балладе, именно такие.',
          en: 'We say this about a chance or event that may never happen again: a concert by your favourite star, a dream trip. It is neutral and loved by adverts and journalists. Before a noun, use hyphens: a once-in-a-lifetime trip. The special moments in this ballad are just like that.',
        },
        ex: ['Seeing the northern lights was once in a lifetime.', 'It’s a once-in-a-lifetime chance, you have to take it!'],
        similar: ['a rare chance', 'a one-off'],
        tip: {
          uk: 'Перед іменником потрібні дефіси: a once-in-a-lifetime experience. Після дієслова без дефісів: It was once in a lifetime.',
          ru: 'Перед существительным нужны дефисы: a once-in-a-lifetime experience. После глагола без дефисов: It was once in a lifetime.',
          en: 'Use hyphens before a noun: a once-in-a-lifetime experience. No hyphens after a verb: It was once in a lifetime.',
        },
      },
      {
        en: 'take a picture',
        m: { uk: 'сфотографувати', ru: 'сфотографировать', en: 'make a photo' },
        story: {
          uk: 'Найпростіший спосіб зберегти мить. Носії кажуть take a picture або take a photo. Звучить нейтрально, підходить у будь-якій ситуації. Корисно знати й прохання: Could you take a picture of us, please?',
          ru: 'Самый простой способ сохранить мгновение. Носители говорят take a picture или take a photo. Звучит нейтрально, подходит в любой ситуации. Полезно знать и просьбу: Could you take a picture of us, please?',
          en: 'The easiest way to keep a moment. Native speakers say take a picture or take a photo. It is neutral and works anywhere. It is useful to know the request too: Could you take a picture of us, please?',
        },
        ex: ['Could you take a picture of us in front of the castle?', 'I took a picture of the sunset to send to Grandma.'],
        similar: ['take a photo', 'snap a picture'],
        tip: {
          uk: 'Не кажіть make a photo. Природно звучить take a photo.',
          ru: 'Не говорите make a photo. Естественно звучит take a photo.',
          en: 'Don’t say make a photo. Say take a photo.',
        },
      },
      {
        en: 'it seems like yesterday',
        m: { uk: 'ніби це було вчора', ru: 'будто это было вчера', en: 'it was long ago, but it feels very recent' },
        story: {
          uk: 'Так кажуть, коли подія давно минула, але пам’ять про неї дуже яскрава. Батьки часто так говорять про дитинство своїх дітей. Звучить тепло і трохи ностальгійно. Пісня передає саме таке почуття: спогад живий, ніби все було щойно.',
          ru: 'Так говорят, когда событие давно прошло, но память о нём очень яркая. Родители часто так говорят о детстве своих детей. Звучит тепло и немного ностальгично. Песня передаёт именно такое чувство: воспоминание живое, будто всё было только что.',
          en: 'People say this when an event was long ago but the memory is still very bright. Parents often say it about their children growing up. It sounds warm and a little nostalgic. The song gives exactly this feeling: the memory is alive, as if it all just happened.',
        },
        ex: ['You’re in high school now? It seems like yesterday you were learning to walk!', 'Our trip to the sea was three years ago, but it seems like yesterday.'],
        similar: ['it feels like yesterday', 'time flies'],
        tip: {
          uk: 'Після seems like часто йде ціле речення: It seems like yesterday we met.',
          ru: 'После seems like часто идёт целое предложение: It seems like yesterday we met.',
          en: 'A full clause often follows: It seems like yesterday we met.',
        },
      },
    ],
    culture: [
      {
        uk: 'Фільм «Народження зірки» (2018) четверта екранізація цієї історії. Попередні версії вийшли в 1937, 1954 і 1976 роках.',
        ru: 'Фильм «Звезда родилась» (2018) четвёртая экранизация этой истории. Предыдущие версии вышли в 1937, 1954 и 1976 годах.',
        en: 'A Star Is Born (2018) is the fourth film version of this story. Earlier versions came out in 1937, 1954 and 1976.',
      },
      {
        uk: 'Нешвілл у штаті Теннессі називають Music City. Там працює багато професійних авторів пісень, і для артистів звично писати пісні командою разом із ними.',
        ru: 'Нэшвилл в штате Теннесси называют Music City. Там работает много профессиональных авторов песен, и для артистов привычно писать песни командой вместе с ними.',
        en: 'Nashville, Tennessee, is called Music City. Many professional songwriters work there, and artists often write songs in teams with them.',
      },
      {
        uk: 'Премію «Оскар» щороку вручає Американська академія кінематографічних мистецтв і наук. Церемонія відбувається в Лос-Анджелесі.',
        ru: 'Премию «Оскар» каждый год вручает Американская академия кинематографических искусств и наук. Церемония проходит в Лос-Анджелесе.',
        en: 'The Oscars are given every year by the Academy of Motion Picture Arts and Sciences. The ceremony takes place in Los Angeles.',
      },
    ],
  },

  'die-with-a-smile': {
    intro: {
      uk: 'Цей дует двох великих зірок про кохання і вдячність за кожну хвилину поруч. Назва звучить драматично, але насправді пісня світла: про те, щоб цінувати своїх людей тут і зараз. Нижче вирази про час, щастя і підтримку, які носії мови вживають щодня. Вони пасують і до розмови про родину, і про дружбу.',
      ru: 'Этот дуэт двух больших звёзд о любви и благодарности за каждую минуту рядом. Название звучит драматично, но на самом деле песня светлая: о том, чтобы ценить своих людей здесь и сейчас. Ниже выражения о времени, счастье и поддержке, которые носители языка используют каждый день. Они подходят и для разговора о семье, и о дружбе.',
      en: 'This duet by two big stars is about love and being grateful for every minute together. The title sounds dramatic, but the song is actually bright: it is about valuing your people here and now. Below are expressions about time, happiness and support that native speakers use every day. They work for talking about family and friendship too.',
    },
    phrases: [
      {
        en: 'seize the day',
        m: { uk: 'лови момент, не відкладай', ru: 'лови момент, не откладывай', en: 'use today well, don’t wait' },
        story: {
          uk: 'Це переклад латинського carpe diem. Фраза радить не відкладати важливе на потім, а діяти сьогодні. Звучить надихаюче, її люблять на постерах і в промовах. Пісня про те саме: цінуй час, поки він є.',
          ru: 'Это перевод латинского carpe diem. Фраза советует не откладывать важное на потом, а действовать сегодня. Звучит вдохновляюще, её любят на постерах и в речах. Песня о том же: цени время, пока оно есть.',
          en: 'This is the English version of the Latin carpe diem. It tells you not to put important things off but to act today. It sounds inspiring and is popular on posters and in speeches. The song says the same: value your time while you have it.',
        },
        ex: ['It’s the last day of the holidays. Let’s seize the day and go to the lake!', 'My coach always says: seize the day, train hard today.'],
        similar: ['carpe diem', 'make every day count'],
        tip: {
          uk: 'Seize вимовляється [сі:з]. Не плутайте з size [сайз].',
          ru: 'Seize произносится [си:з]. Не путайте с size [сайз].',
          en: 'Seize sounds like sees. Don’t confuse it with size.',
        },
      },
      {
        en: 'time flies',
        m: { uk: 'час летить', ru: 'время летит', en: 'time passes very quickly' },
        story: {
          uk: 'Найвідоміший вираз про те, як швидко минає час. Повна версія: time flies when you’re having fun, тобто час летить, коли весело. Звучить легко й дружньо. Коли поруч кохана людина, як у цій пісні, час справді летить.',
          ru: 'Самое известное выражение о том, как быстро проходит время. Полная версия: time flies when you’re having fun, то есть время летит, когда весело. Звучит легко и дружелюбно. Когда рядом любимый человек, как в этой песне, время действительно летит.',
          en: 'The most famous phrase about how fast time goes. The full version is time flies when you’re having fun. It sounds light and friendly. When the person you love is near you, as in this song, time really does fly.',
        },
        ex: ['Is it ten o’clock already? Time flies!', 'Time flies when you’re having fun with friends.'],
        similar: ['the time went so fast', 'where did the time go?'],
        tip: {
          uk: 'Flies тут дієслово «летить», а не «мухи». Дієслово в 3-й особі: time flies.',
          ru: 'Flies здесь глагол «летит», а не «мухи». Глагол в 3-м лице: time flies.',
          en: 'Here flies is the verb to fly, not the insects. Third person: time flies.',
        },
      },
      {
        en: 'cherish',
        m: { uk: 'дорожити, плекати', ru: 'дорожить, лелеять', en: 'love and protect something precious' },
        story: {
          uk: 'Cherish означає дуже дорожити людиною, річчю чи спогадом. Слово тепле й трохи поетичне, його часто чути на весіллях і в листівках. Воно сильніше, ніж просто like або love. Ідея пісні саме така: цінувати кожну мить із близькою людиною.',
          ru: 'Cherish значит очень дорожить человеком, вещью или воспоминанием. Слово тёплое и немного поэтичное, его часто слышно на свадьбах и в открытках. Оно сильнее, чем просто like или love. Идея песни именно такая: ценить каждый миг с близким человеком.',
          en: 'Cherish means to value a person, a thing or a memory very much. It is warm and a bit poetic, often heard at weddings and in cards. It is stronger than just like or love. That is the idea of the song: value every moment with someone close.',
        },
        ex: ['I cherish the letters my grandpa wrote me.', 'Cherish your friends, they are a gift.'],
        similar: ['treasure', 'value', 'hold dear'],
        tip: {
          uk: 'Вимова: [ЧЕ-ріш], наголос на перший склад.',
          ru: 'Произношение: [ЧЕ-риш], ударение на первый слог.',
          en: 'Stress the first syllable: CHER-ish.',
        },
      },
      {
        en: 'grin from ear to ear',
        m: { uk: 'усміхатися на всі 32, від вуха до вуха', ru: 'улыбаться до ушей', en: 'smile very widely' },
        story: {
          uk: 'Grin означає широку усмішку. Усмішка «від вуха до вуха» означає, що людина дуже щаслива. Вираз розмовний і веселий. Він добре пасує до назви пісні: бути настільки щасливим, що усмішка не сходить з обличчя.',
          ru: 'Grin значит широкую улыбку. Улыбка «до ушей» значит, что человек очень счастлив. Выражение разговорное и весёлое. Оно хорошо подходит к названию песни: быть настолько счастливым, что улыбка не сходит с лица.',
          en: 'A grin is a wide smile. Smiling from ear to ear means you are very happy. The phrase is informal and cheerful. It fits the song’s title: being so happy that the smile never leaves your face.',
        },
        ex: ['When she saw the puppy, she was grinning from ear to ear.', 'He got the best mark and came home grinning from ear to ear.'],
        similar: ['beam', 'smile widely'],
        tip: {
          uk: 'Найчастіше вживають у Continuous: He was grinning from ear to ear.',
          ru: 'Чаще всего используют в Continuous: He was grinning from ear to ear.',
          en: 'It is often used in the continuous form: He was grinning from ear to ear.',
        },
      },
      {
        en: 'no matter what',
        m: { uk: 'хай там що, за будь-яких умов', ru: 'несмотря ни на что, в любом случае', en: 'whatever happens' },
        story: {
          uk: 'Коротка обіцянка: я буду поруч, хай що станеться. Вираз нейтральний і дуже частий у фільмах і піснях. Його можна сказати другу, батькам, команді. Головна думка пісні саме в цьому: бути разом за будь-яких обставин.',
          ru: 'Короткое обещание: я буду рядом, что бы ни случилось. Выражение нейтральное и очень частое в фильмах и песнях. Его можно сказать другу, родителям, команде. Главная мысль песни именно в этом: быть вместе при любых обстоятельствах.',
          en: 'A short promise: I will be with you whatever happens. The phrase is neutral and very common in films and songs. You can say it to a friend, your parents or your team. That is the main idea of the song: be together in any situation.',
        },
        ex: ['I’ll support you no matter what.', 'No matter what the weather is like, we go for a walk every evening.'],
        similar: ['whatever happens', 'come what may'],
        tip: {
          uk: 'Може стояти в кінці речення (no matter what) або перед підрядним: no matter what you say, no matter how hard it is.',
          ru: 'Может стоять в конце предложения (no matter what) или перед придаточным: no matter what you say, no matter how hard it is.',
          en: 'It can end a sentence (no matter what) or start a clause: no matter what you say, no matter how hard it is.',
        },
      },
      {
        en: 'side by side',
        m: { uk: 'пліч-о-пліч, поруч', ru: 'бок о бок, рядом', en: 'next to each other, together' },
        story: {
          uk: 'Буквально «бік до боку». Так кажуть про людей, які стоять або працюють поруч, підтримуючи одне одного. Вираз нейтральний, трохи емоційний. У кліпі двоє артистів співають і грають поруч, а сама пісня про бажання бути разом.',
          ru: 'Буквально «бок к боку». Так говорят о людях, которые стоят или работают рядом, поддерживая друг друга. Выражение нейтральное, немного эмоциональное. В клипе двое артистов поют и играют рядом, а сама песня о желании быть вместе.',
          en: 'Literally one side next to the other. We use it for people who stand or work together, supporting each other. It is neutral and a little emotional. In the video the two artists sing and play side by side, and the song is about wanting to be together.',
        },
        ex: ['The two friends walked side by side to school.', 'Our parents worked side by side to paint the house.'],
        similar: ['together', 'shoulder to shoulder'],
        tip: {
          uk: 'Без артиклів: side by side, а не side by the side.',
          ru: 'Без артиклей: side by side, а не side by the side.',
          en: 'No articles: side by side, not side by the side.',
        },
      },
      {
        en: 'count your blessings',
        m: { uk: 'цінувати те, що маєш', ru: 'ценить то, что имеешь', en: 'think about the good things in your life' },
        story: {
          uk: 'Blessings це «благословення», тобто добрі речі в житті. «Порахувати» їх означає згадати, за що ти вдячний(а). Так кажуть, коли хтось скаржиться на дрібниці. Пісня теж про вдячність за людину поруч.',
          ru: 'Blessings это «благословения», то есть хорошие вещи в жизни. «Посчитать» их значит вспомнить, за что ты благодарен(на). Так говорят, когда кто-то жалуется на мелочи. Песня тоже о благодарности за человека рядом.',
          en: 'Blessings are the good things in your life. To count them means to remember what you are grateful for. People say it when someone complains about small things. The song is also about being grateful for the person next to you.',
        },
        ex: ['The bus was late, but we’re all healthy and together. Let’s count our blessings.', 'When I feel down, I count my blessings: my family, my dog, my friends.'],
        similar: ['be grateful', 'be thankful for what you have'],
        tip: {
          uk: 'Займенник змінюється: count your blessings, count our blessings, count my blessings.',
          ru: 'Местоимение меняется: count your blessings, count our blessings, count my blessings.',
          en: 'Change the pronoun: count your, our, my blessings.',
        },
      },
      {
        en: 'a match made in heaven',
        m: { uk: 'ідеальна пара, створені одне для одного', ru: 'идеальная пара, созданы друг для друга', en: 'a perfect pair' },
        story: {
          uk: 'Так кажуть про двох людей чи дві речі, які ідеально пасують одне одному. Можна і про закоханих, і з гумором про їжу: полуниця з вершками. Вираз розмовний. Його легко застосувати й до дуету двох артистів, чиї голоси так гарно звучать разом.',
          ru: 'Так говорят о двух людях или двух вещах, которые идеально подходят друг другу. Можно и о влюблённых, и с юмором о еде: клубника со сливками. Выражение разговорное. Его легко применить и к дуэту двух артистов, чьи голоса так красиво звучат вместе.',
          en: 'We say this about two people or two things that go together perfectly. It can be about a couple, or a joke about food, like strawberries and cream. It is informal. It is easy to use it for a duet of two artists whose voices sound so good together.',
        },
        ex: ['Pizza and movie night, a match made in heaven!', 'My aunt and uncle are a match made in heaven.'],
        similar: ['a perfect match', 'made for each other'],
        tip: {
          uk: 'Match тут означає «пару», а не «сірник» чи «матч».',
          ru: 'Match здесь значит «пару», а не «спичку» или «матч».',
          en: 'Here match means a pair, not a football match or a match for fire.',
        },
      },
      {
        en: 'the best of both worlds',
        m: { uk: 'найкраще з обох варіантів', ru: 'лучшее из двух вариантов', en: 'the good parts of two different things' },
        story: {
          uk: 'Так кажуть, коли вдається поєднати переваги двох різних речей. Наприклад, жити в місті біля лісу. Вираз нейтральний і дуже поширений. У цьому дуеті поєднуються два різні стилі, Гаги й Бруно Марса, тож слухачі отримують the best of both worlds.',
          ru: 'Так говорят, когда удаётся совместить преимущества двух разных вещей. Например, жить в городе рядом с лесом. Выражение нейтральное и очень распространённое. В этом дуэте соединяются два разных стиля, Гаги и Бруно Марса, так что слушатели получают the best of both worlds.',
          en: 'We say this when we get the good sides of two different things, like living in a city next to a forest. It is neutral and very common. This duet mixes two different styles, Gaga’s and Bruno Mars’s, so listeners get the best of both worlds.',
        },
        ex: ['I work from home two days a week, so I have the best of both worlds.', 'Our flat is in the centre but near a park: the best of both worlds.'],
        similar: ['a win-win', 'a perfect mix'],
        tip: {
          uk: 'Worlds у множині: the best of both worlds.',
          ru: 'Worlds во множественном числе: the best of both worlds.',
          en: 'Worlds is plural: the best of both worlds.',
        },
      },
      {
        en: 'against all odds',
        m: { uk: 'всупереч усьому', ru: 'вопреки всему', en: 'even though it seemed impossible' },
        story: {
          uk: 'Odds це шанси. Against all odds означає, що щось вдалося, хоча шансів було дуже мало. Вираз трохи урочистий, його люблять спортивні коментатори та журналісти. Пісня про кохання, яке залишається сильним навіть у найважчих обставинах.',
          ru: 'Odds это шансы. Against all odds значит, что что-то удалось, хотя шансов было очень мало. Выражение немного торжественное, его любят спортивные комментаторы и журналисты. Песня о любви, которая остаётся сильной даже в самых трудных обстоятельствах.',
          en: 'Odds are chances. Against all odds means something happened although the chances were very small. It sounds a little formal and is popular with sports commentators and journalists. The song is about love that stays strong even in the hardest situations.',
        },
        ex: ['Against all odds, our small team won the cup.', 'The kitten was very weak, but against all odds it survived.'],
        similar: ['despite everything', 'beat the odds'],
        tip: {
          uk: 'Odds завжди в множині в цьому значенні: the odds are low.',
          ru: 'Odds всегда во множественном числе в этом значении: the odds are low.',
          en: 'Odds is always plural in this meaning: the odds are low.',
        },
      },
    ],
    culture: [
      {
        uk: 'Бруно Марс відомий хітами «Uptown Funk», «Just the Way You Are» і «Count on Me». Він співає, грає на кількох інструментах і танцює на сцені.',
        ru: 'Бруно Марс известен хитами «Uptown Funk», «Just the Way You Are» и «Count on Me». Он поёт, играет на нескольких инструментах и танцует на сцене.',
        en: 'Bruno Mars is known for hits like Uptown Funk, Just the Way You Are and Count on Me. He sings, plays several instruments and dances on stage.',
      },
      {
        uk: 'Чарт Billboard Hot 100 щотижня показує найпопулярніші пісні США. Перше місце в ньому одна з найбільших перемог для артиста.',
        ru: 'Чарт Billboard Hot 100 каждую неделю показывает самые популярные песни США. Первое место в нём одна из самых больших побед для артиста.',
        en: 'The Billboard Hot 100 chart shows the most popular songs in the USA every week. Reaching number one is one of the biggest wins for an artist.',
      },
    ],
  },

  'birds-of-a-feather': {
    intro: {
      uk: 'Назва цієї пісні це частина старого англійського прислів’я про те, що схожі люди тягнуться одне до одного. Тому урок чудово підходить для розмови про дружбу, кохання і спільні інтереси. Нижче вирази, якими носії мови описують людей, що добре розуміють одне одного. Усі приклади наші власні, з повсякденного життя.',
      ru: 'Название этой песни это часть старой английской пословицы о том, что похожие люди тянутся друг к другу. Поэтому урок отлично подходит для разговора о дружбе, любви и общих интересах. Ниже выражения, которыми носители языка описывают людей, хорошо понимающих друг друга. Все примеры наши собственные, из повседневной жизни.',
      en: 'The title of this song is part of an old English proverb about similar people being drawn to each other. So the lesson is perfect for talking about friendship, love and shared interests. Below are expressions native speakers use to describe people who understand each other well. All the examples are our own, from everyday life.',
    },
    phrases: [
      {
        en: 'two peas in a pod',
        m: { uk: 'як дві краплі води, дуже схожі', ru: 'как две капли воды, очень похожи', en: 'very similar, often together' },
        story: {
          uk: 'Горошини в одному стручку майже однакові. Так носії кажуть про друзів, братів чи сестер, які схожі зовні чи характером і завжди разом. Вираз теплий і розмовний. Він близький за змістом до назви пісні.',
          ru: 'Горошины в одном стручке почти одинаковые. Так носители говорят о друзьях, братьях или сёстрах, которые похожи внешне или характером и всегда вместе. Выражение тёплое и разговорное. Оно близко по смыслу к названию песни.',
          en: 'Peas in one pod are almost the same. Native speakers say this about friends, brothers or sisters who look or act alike and are always together. It is warm and informal. Its meaning is close to the song’s title.',
        },
        ex: ['Anna and Kate are like two peas in a pod, they even finish each other’s sentences.', 'My dad and my uncle are two peas in a pod.'],
        similar: ['like two drops of water', 'very alike'],
        tip: {
          uk: 'Носії не кажуть like two drops of water. Природно like two peas in a pod.',
          ru: 'Носители не говорят like two drops of water. Естественно like two peas in a pod.',
          en: 'Ukrainian and Russian use two drops of water, but in English say two peas in a pod.',
        },
      },
      {
        en: 'on the same wavelength',
        m: { uk: 'на одній хвилі', ru: 'на одной волне', en: 'thinking in the same way' },
        story: {
          uk: 'Вираз прийшов із радіо: щоб чути одне одного, треба налаштуватися на одну хвилю. Так кажуть про людей, які розуміють одне одного з пів слова. Вираз розмовний і дуже поширений. Він передає близькість, про яку співає Біллі.',
          ru: 'Выражение пришло из радио: чтобы слышать друг друга, нужно настроиться на одну волну. Так говорят о людях, которые понимают друг друга с полуслова. Выражение разговорное и очень распространённое. Оно передаёт близость, о которой поёт Билли.',
          en: 'The phrase comes from radio: to hear each other, you need the same wavelength. We say it about people who understand each other easily. It is informal and very common. It captures the closeness Billie sings about.',
        },
        ex: ['My best friend and I are on the same wavelength, we laugh at the same jokes.', 'The new teacher and our class are finally on the same wavelength.'],
        similar: ['on the same page', 'think alike'],
        tip: {
          uk: 'Українське «на одній хвилі» дуже схоже, але англійською потрібне same: on the same wavelength.',
          ru: 'Русское «на одной волне» очень похоже, но по-английски нужно same: on the same wavelength.',
          en: 'Remember the word same: on the same wavelength.',
        },
      },
      {
        en: 'see eye to eye',
        m: { uk: 'погоджуватися, мати однакову думку', ru: 'соглашаться, иметь одинаковое мнение', en: 'agree with someone' },
        story: {
          uk: 'Буквально «дивитися очі в очі». Так кажуть, коли двоє людей мають однаковий погляд на щось. Найчастіше вживають у запереченні: we don’t always see eye to eye. Вираз нейтральний. Навіть дуже близькі люди не завжди бачать усе однаково, і це нормально.',
          ru: 'Буквально «смотреть глаза в глаза». Так говорят, когда двое людей одинаково смотрят на что-то. Чаще всего используют в отрицании: we don’t always see eye to eye. Выражение нейтральное. Даже очень близкие люди не всегда видят всё одинаково, и это нормально.',
          en: 'Literally to look eye to eye. We say it when two people have the same view about something. It is most often negative: we don’t always see eye to eye. It is neutral. Even very close people don’t always agree, and that is OK.',
        },
        ex: ['My sister and I don’t always see eye to eye about music.', 'Finally, the two teams saw eye to eye on the rules.'],
        similar: ['agree', 'be on the same page'],
        tip: {
          uk: 'Часто додають on або about: see eye to eye on something.',
          ru: 'Часто добавляют on или about: see eye to eye on something.',
          en: 'Add on or about for the topic: see eye to eye on something.',
        },
      },
      {
        en: 'opposites attract',
        m: { uk: 'протилежності притягуються', ru: 'противоположности притягиваются', en: 'very different people often like each other' },
        story: {
          uk: 'Це протилежна ідея до назви пісні. Прислів’я про птахів каже, що схожі тягнуться до схожих, а opposites attract, що різні люди теж можуть ідеально доповнювати одне одного. Вираз нейтральний. Цікаве питання для дискусії: яке прислів’я правдивіше?',
          ru: 'Это противоположная идея к названию песни. Пословица о птицах говорит, что похожие тянутся к похожим, а opposites attract, что разные люди тоже могут идеально дополнять друг друга. Выражение нейтральное. Интересный вопрос для дискуссии: какая пословица правдивее?',
          en: 'This is the opposite idea to the song’s title. The bird proverb says similar people come together, while opposites attract says different people can also complete each other. It is neutral. A great question for discussion: which saying is more true?',
        },
        ex: ['He is loud and she is quiet, but opposites attract.', 'Do you think opposites attract, or do similar people get on better?'],
        similar: ['different but perfect together'],
        tip: {
          uk: 'Дієслово attract без s, бо opposites у множині.',
          ru: 'Глагол attract без s, потому что opposites во множественном числе.',
          en: 'Attract has no s because opposites is plural.',
        },
      },
      {
        en: 'click with someone',
        m: { uk: 'одразу порозумітися з кимось', ru: 'сразу найти общий язык с кем-то', en: 'feel a quick connection' },
        story: {
          uk: 'Click це звук, коли щось легко стає на своє місце. Так кажуть, коли з людиною одразу виникає легкість у спілкуванні. Вираз молодіжний, розмовний. Добре описує початок близьких стосунків, про які співає Біллі.',
          ru: 'Click это звук, когда что-то легко встаёт на место. Так говорят, когда с человеком сразу возникает лёгкость в общении. Выражение молодёжное, разговорное. Хорошо описывает начало близких отношений, о которых поёт Билли.',
          en: 'A click is the sound of something fitting into place. We say it when talking to someone feels easy from the start. It is young and informal. It describes the beginning of the close relationship Billie sings about.',
        },
        ex: ['I clicked with my roommate on the first day.', 'We just clicked, we talked for three hours.'],
        similar: ['get on like a house on fire', 'connect with someone'],
        tip: {
          uk: 'Можна і без with: We just clicked.',
          ru: 'Можно и без with: We just clicked.',
          en: 'You can drop with: We just clicked.',
        },
      },
      {
        en: 'a kindred spirit',
        m: { uk: 'споріднена душа', ru: 'родственная душа', en: 'someone who thinks and feels like you' },
        story: {
          uk: 'Kindred означає «споріднений». A kindred spirit не родич, а людина з дуже схожими поглядами й почуттями. Вираз трохи книжний і теплий, його люблять письменники. Його знають з відомої книжки «Енн із Зелених Дахів».',
          ru: 'Kindred значит «родственный». A kindred spirit не родственник, а человек с очень похожими взглядами и чувствами. Выражение немного книжное и тёплое, его любят писатели. Его знают по известной книге «Энн из Зелёных Мезонинов».',
          en: 'Kindred means related. A kindred spirit is not a relative but a person with very similar ideas and feelings. The phrase is a bit literary and warm, loved by writers. Many people know it from the famous book Anne of Green Gables.',
        },
        ex: ['When I met another girl who loves old maps, I knew she was a kindred spirit.', 'Book club is full of kindred spirits.'],
        similar: ['a soul mate', 'a like-minded person'],
        tip: {
          uk: 'Spirit тут означає «душа», а не «привид» і не «спирт».',
          ru: 'Spirit здесь значит «душа», а не «привидение» и не «спирт».',
          en: 'Here spirit means soul, not a ghost.',
        },
      },
      {
        en: 'inseparable',
        m: { uk: 'нерозлучні', ru: 'неразлучные', en: 'always together' },
        story: {
          uk: 'Слово складається з in (не) і separable (той, що можна розділити). Так кажуть про друзів чи пари, яких ніколи не бачиш окремо. Звучить нейтрально і тепло. Близькість, про яку пісня, саме така.',
          ru: 'Слово состоит из in (не) и separable (тот, что можно разделить). Так говорят о друзьях или парах, которых никогда не видишь по отдельности. Звучит нейтрально и тепло. Близость, о которой песня, именно такая.',
          en: 'The word is in (not) plus separable (can be separated). We say it about friends or couples you never see apart. It is neutral and warm. The closeness in the song is just like that.',
        },
        ex: ['Since kindergarten, Max and Leo have been inseparable.', 'My dog and cat are inseparable, they even sleep together.'],
        similar: ['joined at the hip', 'always together'],
        tip: {
          uk: 'Наголос на другий склад: in-SEP-a-ra-ble.',
          ru: 'Ударение на второй слог: in-SEP-a-ra-ble.',
          en: 'Stress the second syllable: in-SEP-a-ra-ble.',
        },
      },
      {
        en: 'like-minded',
        m: { uk: 'однодумці, зі схожими поглядами', ru: 'единомышленники, со схожими взглядами', en: 'having similar ideas and interests' },
        story: {
          uk: 'Like-minded описує людей з однаковими інтересами чи поглядами. Часто кажуть like-minded people про клуби, табори, онлайн-спільноти. Вираз нейтральний, підходить і для розмови, і для резюме. Він точно передає зміст прислів’я з назви пісні.',
          ru: 'Like-minded описывает людей с одинаковыми интересами или взглядами. Часто говорят like-minded people о клубах, лагерях, онлайн-сообществах. Выражение нейтральное, подходит и для разговора, и для резюме. Оно точно передаёт смысл пословицы из названия песни.',
          en: 'Like-minded describes people with the same interests or views. People often say like-minded people about clubs, camps and online communities. It is neutral and works in conversation and on a CV. It expresses the meaning of the proverb in the song’s title.',
        },
        ex: ['At the robotics camp I met lots of like-minded kids.', 'It’s easier to study with like-minded people.'],
        similar: ['with the same interests', 'kindred'],
        tip: {
          uk: 'Пишеться через дефіс: like-minded.',
          ru: 'Пишется через дефис: like-minded.',
          en: 'Always write it with a hyphen: like-minded.',
        },
      },
      {
        en: 'great minds think alike',
        m: { uk: 'великі уми думають однаково (жартівливо)', ru: 'великие умы мыслят одинаково (шутливо)', en: 'a joke when two people have the same idea' },
        story: {
          uk: 'Цю фразу кажуть із посмішкою, коли двоє одночасно придумали те саме. Наприклад, прийшли в однакових светрах. Звучить жартівливо й дружньо. Вона добре показує, як близькі люди часто думають однаково.',
          ru: 'Эту фразу говорят с улыбкой, когда двое одновременно придумали одно и то же. Например, пришли в одинаковых свитерах. Звучит шутливо и дружески. Она хорошо показывает, как близкие люди часто думают одинаково.',
          en: 'People say this with a smile when two of them have the same idea at the same time, like wearing the same jumper. It sounds jokey and friendly. It shows how close people often think the same way.',
        },
        ex: ['You bought me the same book I bought you? Great minds think alike!', 'We both chose pizza. Great minds think alike.'],
        similar: ['we had the same idea', 'jinx'],
        tip: {
          uk: 'Alike тут прислівник «однаково». Не кажіть think like.',
          ru: 'Alike здесь наречие «одинаково». Не говорите think like.',
          en: 'Alike here means in the same way. Don’t say think like.',
        },
      },
      {
        en: 'my other half',
        m: { uk: 'моя друга половинка', ru: 'моя вторая половинка', en: 'my partner, husband or wife' },
        story: {
          uk: 'Так жартома і тепло називають чоловіка, дружину чи партнера. Вираз розмовний, його часто чути від дорослих. В українській є схожа «друга половинка». Пісня про людину, без якої відчуваєш себе неповним.',
          ru: 'Так в шутку и тепло называют мужа, жену или партнёра. Выражение разговорное, его часто слышно от взрослых. В русском есть похожая «вторая половинка». Песня о человеке, без которого чувствуешь себя неполным.',
          en: 'This is a warm, jokey way to talk about your husband, wife or partner. It is informal and common among adults. Ukrainian and Russian have a similar phrase. The song is about a person without whom you feel incomplete.',
        },
        ex: ['I’ll ask my other half if we’re free on Saturday.', 'My mum calls Dad her other half.'],
        similar: ['my partner', 'my better half'],
        tip: {
          uk: 'My better half звучить ще жартівливіше і трохи старомодно.',
          ru: 'My better half звучит ещё шутливее и немного старомодно.',
          en: 'My better half sounds even more jokey and a little old-fashioned.',
        },
      },
    ],
    culture: [
      {
        uk: 'Повне прислів’я звучить birds of a feather flock together: птахи з однаковим пір’ям літають зграєю. Аналог в українській «Рибак рибака бачить здалека», у російській «Рыбак рыбака видит издалека».',
        ru: 'Полная пословица звучит birds of a feather flock together: птицы с одинаковым оперением летают стаей. Аналог в русском «Рыбак рыбака видит издалека», в украинском «Рибак рибака бачить здалека».',
        en: 'The full proverb is birds of a feather flock together: birds with the same feathers fly in one flock. In Ukrainian and Russian the similar saying is about a fisherman who can spot another fisherman from far away.',
      },
      {
        uk: 'Біллі та Фіннеас записали свій перший альбом удома, у невеликій спальні Фіннеаса в Лос-Анджелесі. Це довело, що хіти можна створювати й без великої студії.',
        ru: 'Билли и Финнеас записали свой первый альбом дома, в небольшой спальне Финнеаса в Лос-Анджелесе. Это доказало, что хиты можно создавать и без большой студии.',
        en: 'Billie and Finneas recorded her first album at home, in Finneas’s small bedroom in Los Angeles. It showed that hits can be made without a big studio.',
      },
      {
        uk: 'Чотири головні категорії «Греммі» називають Big Four: «Запис року», «Альбом року», «Пісня року» і «Найкращий новий виконавець».',
        ru: 'Четыре главные категории «Грэмми» называют Big Four: «Запись года», «Альбом года», «Песня года» и «Лучший новый исполнитель».',
        en: 'The four main Grammy categories are called the Big Four: Record of the Year, Album of the Year, Song of the Year and Best New Artist.',
      },
    ],
  },

  'ocean-eyes': {
    intro: {
      uk: 'З цієї тихої пісні почалася кар’єра Біллі Айліш. Вона про захоплення людиною і хвилювання, коли не можеш відвести погляд. Тема очей і моря дає багато корисних англійських виразів. Нижче ідіоми про погляд, почуття і мрії, які носії мови вживають щодня, з нашими власними прикладами.',
      ru: 'С этой тихой песни началась карьера Билли Айлиш. Она о восхищении человеком и волнении, когда не можешь отвести взгляд. Тема глаз и моря даёт много полезных английских выражений. Ниже идиомы о взгляде, чувствах и мечтах, которые носители языка используют каждый день, с нашими собственными примерами.',
      en: 'Billie Eilish’s career started with this quiet song. It is about admiring someone and the nervous feeling of not being able to look away. The topic of eyes and the sea gives us lots of useful English. Below are idioms about looking, feelings and dreams that native speakers use every day, with our own examples.',
    },
    phrases: [
      {
        en: 'in the blink of an eye',
        m: { uk: 'в одну мить, оком не змигнеш', ru: 'в мгновение ока', en: 'very quickly' },
        story: {
          uk: 'Blink означає «кліпнути». Те, що стається за час, поки ти кліпаєш, стається миттєво. Вираз нейтральний, дуже образний. Він нагадує, як швидко ця пісня змінила життя Біллі: щойно викладена в інтернет, вона стала популярною.',
          ru: 'Blink значит «моргнуть». То, что случается за время, пока ты моргаешь, случается мгновенно. Выражение нейтральное, очень образное. Оно напоминает, как быстро эта песня изменила жизнь Билли: только выложенная в интернет, она стала популярной.',
          en: 'Blink means to close and open your eyes quickly. Something that happens in a blink happens instantly. The phrase is neutral and very visual. It reminds us how quickly this song changed Billie’s life: soon after she posted it online, it became popular.',
        },
        ex: ['The cake disappeared in the blink of an eye.', 'Summer holidays go by in the blink of an eye.'],
        similar: ['in a flash', 'in no time'],
        tip: {
          uk: 'Артикль an перед eye, бо eye починається з голосного звуку.',
          ru: 'Артикль an перед eye, потому что eye начинается с гласного звука.',
          en: 'Use an before eye because it starts with a vowel sound.',
        },
      },
      {
        en: 'keep an eye on',
        m: { uk: 'наглядати, стежити за', ru: 'присматривать, следить за', en: 'watch something carefully' },
        story: {
          uk: 'Буквально «тримати око на чомусь». Так просять наглянути за речами, дитиною, супом на плиті. Вираз розмовний і дуже практичний. Корисно знати його для подорожей: Can you keep an eye on my bag?',
          ru: 'Буквально «держать глаз на чём-то». Так просят присмотреть за вещами, ребёнком, супом на плите. Выражение разговорное и очень практичное. Полезно знать его для путешествий: Can you keep an eye on my bag?',
          en: 'Literally keep one eye on something. People ask you to keep an eye on their things, a child or soup on the cooker. It is informal and very practical. It is useful when travelling: Can you keep an eye on my bag?',
        },
        ex: ['Can you keep an eye on my little brother for five minutes?', 'Keep an eye on the pasta, it’s almost ready.'],
        similar: ['watch', 'look after'],
        tip: {
          uk: 'Не кажіть keep the eye. Правильно keep an eye on.',
          ru: 'Не говорите keep the eye. Правильно keep an eye on.',
          en: 'It is keep an eye on, not keep the eye.',
        },
      },
      {
        en: 'love at first sight',
        m: { uk: 'кохання з першого погляду', ru: 'любовь с первого взгляда', en: 'falling in love the first time you see someone' },
        story: {
          uk: 'Вираз майже однаковий в усіх трьох мовах. Sight означає «погляд, бачення». Його вживають і серйозно, і з гумором, наприклад про нові кросівки чи цуценя. Пісня описує саме таке миттєве захоплення.',
          ru: 'Выражение почти одинаковое во всех трёх языках. Sight значит «взгляд, зрение». Его используют и серьёзно, и с юмором, например о новых кроссовках или щенке. Песня описывает именно такое мгновенное восхищение.',
          en: 'This phrase is almost the same in all three languages. Sight means seeing. People use it seriously and as a joke, for new trainers or a puppy. The song describes exactly this kind of instant attraction.',
        },
        ex: ['When I saw this puppy, it was love at first sight.', 'Do you believe in love at first sight?'],
        similar: ['instant attraction'],
        tip: {
          uk: 'Не кажіть love from first look. Правильно love at first sight.',
          ru: 'Не говорите love from first look. Правильно love at first sight.',
          en: 'Don’t say love from first look. Say love at first sight.',
        },
      },
      {
        en: 'make eye contact',
        m: { uk: 'дивитися в очі під час розмови', ru: 'смотреть в глаза во время разговора', en: 'look at someone’s eyes while talking' },
        story: {
          uk: 'У багатьох англомовних країнах вважають, що дивитися в очі під час розмови означає бути чесним і впевненим. Вираз нейтральний, його часто чути на співбесідах і уроках публічних виступів. Для сором’язливих людей, які червоніють від чужого погляду, це справжній виклик.',
          ru: 'Во многих англоязычных странах считают, что смотреть в глаза во время разговора значит быть честным и уверенным. Выражение нейтральное, его часто слышно на собеседованиях и уроках публичных выступлений. Для застенчивых людей, которые краснеют от чужого взгляда, это настоящий вызов.',
          en: 'In many English-speaking countries, looking someone in the eye while talking shows you are honest and confident. The phrase is neutral and common in job interviews and public speaking classes. For shy people who blush when someone looks at them, it can be a real challenge.',
        },
        ex: ['Make eye contact with the audience when you give your presentation.', 'He was so shy he couldn’t make eye contact.'],
        similar: ['look someone in the eye'],
        tip: {
          uk: 'Дієслово make, а не do: make eye contact. Протилежне: avoid eye contact.',
          ru: 'Глагол make, а не do: make eye contact. Противоположное: avoid eye contact.',
          en: 'Use make, not do. The opposite is avoid eye contact.',
        },
      },
      {
        en: 'head over heels',
        m: { uk: 'по самі вуха (закоханий)', ru: 'по уши (влюблён)', en: 'completely in love' },
        story: {
          uk: 'Буквально «головою через п’яти», ніби перекинувся. Так кажуть про людину, яка шалено закохана. Вираз розмовний і веселий. Він описує саме той стан, коли не можеш думати ні про що, крім чиїхось очей.',
          ru: 'Буквально «головой через пятки», будто перевернулся. Так говорят о человеке, который безумно влюблён. Выражение разговорное и весёлое. Оно описывает именно то состояние, когда не можешь думать ни о чём, кроме чьих-то глаз.',
          en: 'Literally your head goes over your heels, as if you flipped over. People say it about someone who is madly in love. It is informal and fun. It describes exactly the state of thinking about nothing but someone’s eyes.',
        },
        ex: ['My cousin is head over heels for her new boyfriend.', 'He fell head over heels in love with Paris.'],
        similar: ['madly in love', 'crazy about someone'],
        tip: {
          uk: 'Найчастіше кажуть fall head over heels (in love) або be head over heels for someone.',
          ru: 'Чаще всего говорят fall head over heels (in love) или be head over heels for someone.',
          en: 'Common forms: fall head over heels (in love) or be head over heels for someone.',
        },
      },
      {
        en: 'lose track of time',
        m: { uk: 'втратити відчуття часу', ru: 'потерять счёт времени', en: 'not notice how much time has passed' },
        story: {
          uk: 'Track тут означає «слід». Коли ти чимось захоплений, ти «губиш слід» часу і не помічаєш, як минають години. Вираз нейтральний і дуже частий. Мрійлива пісня створює саме такий настрій: слухаєш і забуваєш про час.',
          ru: 'Track здесь значит «след». Когда ты чем-то увлечён, ты «теряешь след» времени и не замечаешь, как проходят часы. Выражение нейтральное и очень частое. Мечтательная песня создаёт именно такое настроение: слушаешь и забываешь о времени.',
          en: 'Track here means trail. When you are really into something, you lose the trail of time and don’t notice the hours go by. It is neutral and very common. This dreamy song creates exactly that mood: you listen and forget about time.',
        },
        ex: ['I was drawing and lost track of time. It’s midnight!', 'Sorry I’m late, I lost track of time.'],
        similar: ['forget the time', 'time flew by'],
        tip: {
          uk: 'Також кажуть keep track of time, тобто стежити за часом.',
          ru: 'Также говорят keep track of time, то есть следить за временем.',
          en: 'The opposite is keep track of time, meaning watch the time.',
        },
      },
      {
        en: 'daydream',
        m: { uk: 'мріяти наяву, витати в хмарах', ru: 'мечтать наяву, витать в облаках', en: 'think pleasant thoughts instead of paying attention' },
        story: {
          uk: 'Day + dream: «денний сон», тобто мрії з відкритими очима. Слово може бути дієсловом і іменником. Звучить нейтрально, часто з легким докором від учителя. Сама пісня дуже daydreamy, її легко слухати, задивившись у вікно.',
          ru: 'Day + dream: «дневной сон», то есть мечты с открытыми глазами. Слово может быть глаголом и существительным. Звучит нейтрально, часто с лёгким упрёком от учителя. Сама песня очень daydreamy, её легко слушать, засмотревшись в окно.',
          en: 'Day plus dream: dreaming with your eyes open. It can be a verb or a noun. It is neutral, often with a small complaint from a teacher. The song itself is very daydreamy, easy to listen to while staring out of the window.',
        },
        ex: ['Stop daydreaming and finish your homework!', 'I often daydream about living by the sea.'],
        similar: ['have your head in the clouds', 'be miles away'],
        tip: {
          uk: 'Пишеться одним словом: daydream, daydreaming.',
          ru: 'Пишется одним словом: daydream, daydreaming.',
          en: 'It is one word: daydream, daydreaming.',
        },
      },
      {
        en: 'still waters run deep',
        m: { uk: 'у тихому болоті чорти водяться (тихі люди глибокі)', ru: 'в тихом омуте черти водятся (тихие люди глубокие)', en: 'quiet people often have deep thoughts and feelings' },
        story: {
          uk: 'Прислів’я про те, що тиха вода часто глибока, так само і спокійні люди мають багатий внутрішній світ. В англійській воно звучить позитивно, на відміну від українського «у тихому болоті». Тиха, але глибока пісня Біллі ідеальний приклад.',
          ru: 'Пословица о том, что тихая вода часто глубока, так же и спокойные люди имеют богатый внутренний мир. В английском она звучит позитивно, в отличие от русского «в тихом омуте черти водятся». Тихая, но глубокая песня Билли идеальный пример.',
          en: 'A proverb saying calm water is often deep, and calm people often have a rich inner world. In English it is positive, unlike the similar Ukrainian and Russian sayings, which suggest hidden mischief. Billie’s quiet but deep song is a perfect example.',
        },
        ex: ['Oleh hardly talks, but his poems are amazing. Still waters run deep.', 'Don’t think she’s boring because she’s quiet. Still waters run deep.'],
        similar: ['there’s more to them than meets the eye'],
        tip: {
          uk: 'Будьте обережні з перекладом: англійська версія комплімент, а не попередження.',
          ru: 'Будьте осторожны с переводом: английская версия комплимент, а не предупреждение.',
          en: 'In English this is a compliment, not a warning.',
        },
      },
      {
        en: 'be lost in thought',
        m: { uk: 'глибоко замислитися', ru: 'глубоко задуматься', en: 'think so deeply that you don’t notice things around you' },
        story: {
          uk: 'Людина ніби «загубилася» у своїх думках і не чує, що їй кажуть. Вираз нейтральний, трохи літературний. Його часто можна прочитати в книжках і почути в розмові. Мрійлива атмосфера пісні добре передає цей стан.',
          ru: 'Человек будто «потерялся» в своих мыслях и не слышит, что ему говорят. Выражение нейтральное, немного литературное. Его часто можно прочитать в книгах и услышать в разговоре. Мечтательная атмосфера песни хорошо передаёт это состояние.',
          en: 'The person seems lost inside their thoughts and doesn’t hear what people say. It is neutral and a little literary. You read it in books and hear it in conversation. The dreamy atmosphere of the song shows this state well.',
        },
        ex: ['Sorry, what did you say? I was lost in thought.', 'Grandpa sat by the window, lost in thought.'],
        similar: ['be miles away', 'be deep in thought'],
        tip: {
          uk: 'Thought тут в однині: lost in thought, не lost in thoughts.',
          ru: 'Thought здесь в единственном числе: lost in thought, не lost in thoughts.',
          en: 'Use the singular: lost in thought, not lost in thoughts.',
        },
      },
      {
        en: 'the apple of someone’s eye',
        m: { uk: 'зіниця ока, найулюбленіша людина', ru: 'зеница ока, самый любимый человек', en: 'the person someone loves most' },
        story: {
          uk: 'Давній вираз: колись зіницю ока називали «яблуком ока». Так кажуть про людину, яку дуже люблять і бережуть, найчастіше про онуків чи дітей. Звучить тепло, трохи по-бабусиному. Пісня теж про людину, на яку дивишся з особливою ніжністю.',
          ru: 'Давнее выражение: когда-то зрачок называли «яблоком глаза». Так говорят о человеке, которого очень любят и берегут, чаще всего о внуках или детях. Звучит тепло, немного по-бабушкиному. Песня тоже о человеке, на которого смотришь с особой нежностью.',
          en: 'An old phrase: long ago, the centre of the eye was called its apple. It describes a person who is loved and protected very much, often a grandchild or child. It sounds warm and a bit old-fashioned. The song is also about someone you look at with special tenderness.',
        },
        ex: ['My little sister is the apple of my grandpa’s eye.', 'Their first grandson is the apple of their eye.'],
        similar: ['someone’s favourite', 'someone’s pride and joy'],
        tip: {
          uk: 'Потрібна присвійна форма: the apple of my eye, the apple of Grandma’s eye.',
          ru: 'Нужна притяжательная форма: the apple of my eye, the apple of Grandma’s eye.',
          en: 'Use a possessive: the apple of my eye, the apple of Grandma’s eye.',
        },
      },
    ],
    culture: [
      {
        uk: 'Біллі й Фіннеас у дитинстві навчалися вдома (homeschooling) у Лос-Анджелесі. У США це законний і досить поширений вид освіти.',
        ru: 'Билли и Финнеас в детстве учились дома (homeschooling) в Лос-Анджелесе. В США это законный и довольно распространённый вид образования.',
        en: 'Billie and Finneas were homeschooled as children in Los Angeles. In the USA homeschooling is legal and fairly common.',
      },
      {
        uk: 'SoundCloud це сервіс, де будь-хто може безкоштовно викласти свою музику. Багато сучасних зірок починали саме там.',
        ru: 'SoundCloud это сервис, где любой может бесплатно выложить свою музыку. Многие современные звёзды начинали именно там.',
        en: 'SoundCloud is a service where anyone can post their music for free. Many of today’s stars started there.',
      },
    ],
  },

  'my-future': {
    intro: {
      uk: 'Ця пісня про дорослішання і про те, що бути наодинці із собою не страшно, а корисно. Тема майбутнього, планів і мрій дуже близька підліткам і дорослим. Нижче вирази, якими носії мови говорять про особистий ріст, терпіння і великі плани. Усі приклади наші власні, тож їх легко перенести у свої розповіді.',
      ru: 'Эта песня о взрослении и о том, что быть наедине с собой не страшно, а полезно. Тема будущего, планов и мечт очень близка подросткам и взрослым. Ниже выражения, которыми носители языка говорят о личном росте, терпении и больших планах. Все примеры наши собственные, так что их легко перенести в свои рассказы.',
      en: 'This song is about growing up and how being on your own can be good, not scary. The future, plans and dreams are topics that matter to teens and adults alike. Below are expressions native speakers use to talk about personal growth, patience and big plans. All the examples are our own, so you can easily use them in your own stories.',
    },
    phrases: [
      {
        en: 'step by step',
        m: { uk: 'крок за кроком, поступово', ru: 'шаг за шагом, постепенно', en: 'slowly, one part at a time' },
        story: {
          uk: 'Вираз однаковий у всіх трьох мовах, тому його легко запам’ятати. Так описують будь-який шлях до мети: вивчення мови, ремонт, тренування. Звучить нейтрально і заспокійливо. Пісня теж про поступовий ріст, а не про миттєві зміни.',
          ru: 'Выражение одинаковое во всех трёх языках, поэтому его легко запомнить. Так описывают любой путь к цели: изучение языка, ремонт, тренировки. Звучит нейтрально и успокаивающе. Песня тоже о постепенном росте, а не о мгновенных переменах.',
          en: 'This phrase is the same in all three languages, so it is easy to remember. We use it for any path to a goal: learning a language, fixing a house, training. It sounds neutral and calming. The song is also about slow growth, not instant change.',
        },
        ex: ['I’m learning to code step by step.', 'Follow the recipe step by step and the cake will be perfect.'],
        similar: ['little by little', 'bit by bit'],
        tip: {
          uk: 'Без артиклів і без множини: step by step, а не steps by steps.',
          ru: 'Без артиклей и без множественного числа: step by step, а не steps by steps.',
          en: 'No articles, no plural: step by step, not steps by steps.',
        },
      },
      {
        en: 'in the long run',
        m: { uk: 'зрештою, у довгостроковій перспективі', ru: 'в конечном счёте, в долгосрочной перспективе', en: 'after a long time, in the future' },
        story: {
          uk: 'Вираз прийшов зі спорту: забіг на довгу дистанцію. Так кажуть, коли щось дає результат не одразу, а згодом. Звучить нейтрально, підходить і для розмови, і для есе. Він пасує до ідеї пісні: те, що робиш для себе зараз, окупиться пізніше.',
          ru: 'Выражение пришло из спорта: забег на длинную дистанцию. Так говорят, когда что-то даёт результат не сразу, а со временем. Звучит нейтрально, подходит и для разговора, и для эссе. Оно подходит к идее песни: то, что делаешь для себя сейчас, окупится позже.',
          en: 'The phrase comes from sport: a long-distance race. We say it when something brings results later, not now. It is neutral and works in conversation and essays. It fits the idea of the song: what you do for yourself now pays off later.',
        },
        ex: ['Reading every day will help you in the long run.', 'Cheap shoes are more expensive in the long run.'],
        similar: ['in the end', 'over time', 'opposite: in the short run'],
        tip: {
          uk: 'Корисне слово для есе на НМТ і іспитах: In the long run, this will help students.',
          ru: 'Полезное выражение для эссе и экзаменов: In the long run, this will help students.',
          en: 'A useful phrase for exam essays: In the long run, this will help students.',
        },
      },
      {
        en: 'the sky’s the limit',
        m: { uk: 'немає меж, усе можливо', ru: 'нет пределов, всё возможно', en: 'there is no limit to what you can do' },
        story: {
          uk: 'Якщо межа тільки небо, то можливості безмежні. Так підбадьорюють людину, яка має талант і великі мрії. Вираз розмовний і надихаючий. Він пасує до оптимістичного настрою пісні про майбутнє.',
          ru: 'Если предел только небо, то возможности безграничны. Так подбадривают человека, у которого талант и большие мечты. Выражение разговорное и вдохновляющее. Оно подходит к оптимистичному настроению песни о будущем.',
          en: 'If the only limit is the sky, the possibilities are endless. People say it to encourage someone with talent and big dreams. It is informal and inspiring. It fits the hopeful mood of this song about the future.',
        },
        ex: ['You speak three languages at fifteen? The sky’s the limit for you!', 'With a good idea and hard work, the sky’s the limit.'],
        similar: ['anything is possible', 'there are no limits'],
        tip: {
          uk: 'Sky’s тут означає sky is. Не забувайте апостроф.',
          ru: 'Sky’s здесь значит sky is. Не забывайте апостроф.',
          en: 'Sky’s here means sky is. Don’t forget the apostrophe.',
        },
      },
      {
        en: 'turn over a new leaf',
        m: { uk: 'почати з чистого аркуша', ru: 'начать с чистого листа', en: 'start behaving in a better way' },
        story: {
          uk: 'Leaf тут означає сторінку книжки. Перегорнути нову сторінку означає змінити звички на кращі. Вираз розмовний, часто звучить на Новий рік або 1 вересня. Ідея пісні про те, що можна змінитися і рости.',
          ru: 'Leaf здесь значит страницу книги. Перевернуть новую страницу значит изменить привычки к лучшему. Выражение разговорное, часто звучит на Новый год или 1 сентября. Идея песни о том, что можно измениться и расти.',
          en: 'Leaf here means a page of a book. Turning to a new page means changing your habits for the better. It is informal and often heard at New Year or the start of school. The song’s idea is that you can change and grow.',
        },
        ex: ['This year I’m turning over a new leaf: no phone before bed.', 'He used to be late every day, but he turned over a new leaf.'],
        similar: ['make a fresh start', 'change for the better'],
        tip: {
          uk: 'Українське «з чистого аркуша» англійською краще перекладати саме так, а не from a clean page.',
          ru: 'Русское «с чистого листа» по-английски лучше передавать именно так, а не from a clean page.',
          en: 'Ukrainian and Russian speakers may say from a clean page. In English say turn over a new leaf.',
        },
      },
      {
        en: 'be on your own',
        m: { uk: 'бути на самоті, самостійно', ru: 'быть одному, самостоятельно', en: 'be alone or do something without help' },
        story: {
          uk: 'On your own має два значення: «наодинці» і «без допомоги». Звучить нейтрально, не обов’язково сумно. Багато людей люблять час на самоті, щоб відпочити. Пісня якраз показує, що бути наодинці не те саме, що бути самотнім.',
          ru: 'On your own имеет два значения: «наедине» и «без помощи». Звучит нейтрально, не обязательно грустно. Многие люди любят время наедине, чтобы отдохнуть. Песня как раз показывает, что быть одному не то же самое, что быть одиноким.',
          en: 'On your own has two meanings: alone, and without help. It sounds neutral, not necessarily sad. Many people enjoy time on their own to relax. The song shows that being alone is not the same as being lonely.',
        },
        ex: ['I like being on my own on Sunday mornings.', 'She built the bookshelf on her own.'],
        similar: ['by yourself', 'alone'],
        tip: {
          uk: 'Займенник змінюється: on my own, on his own, on their own.',
          ru: 'Местоимение меняется: on my own, on his own, on their own.',
          en: 'Change the pronoun: on my own, on his own, on their own.',
        },
      },
      {
        en: 'work on yourself',
        m: { uk: 'працювати над собою', ru: 'работать над собой', en: 'try to improve your skills or character' },
        story: {
          uk: 'Сучасний вираз про особистий ріст: читати, займатися спортом, вчитися керувати емоціями. Його часто чути в подкастах і блогах. Звучить нейтрально і позитивно. Пісня про людину, яка зосередилася на собі і своєму розвитку.',
          ru: 'Современное выражение о личном росте: читать, заниматься спортом, учиться управлять эмоциями. Его часто слышно в подкастах и блогах. Звучит нейтрально и позитивно. Песня о человеке, который сосредоточился на себе и своём развитии.',
          en: 'A modern phrase about personal growth: reading, doing sport, learning to manage your feelings. You often hear it in podcasts and blogs. It is neutral and positive. The song is about someone who is focusing on themselves and their growth.',
        },
        ex: ['This summer I want to work on myself and get fit.', 'He’s working on his confidence by speaking more in class.'],
        similar: ['improve yourself', 'self-improvement'],
        tip: {
          uk: 'Прийменник on: work on something. Наприклад, work on your English.',
          ru: 'Предлог on: work on something. Например, work on your English.',
          en: 'Use on: work on something, for example work on your English.',
        },
      },
      {
        en: 'take your time',
        m: { uk: 'не поспішай', ru: 'не спеши', en: 'do it slowly, there is no hurry' },
        story: {
          uk: 'Дружня фраза: у тебе є стільки часу, скільки потрібно. Її кажуть учителі на іспиті, продавці в магазині, друзі. Звучить ввічливо і спокійно. Пісня теж не поспішає: вона починається повільно і дає собі час.',
          ru: 'Дружеская фраза: у тебя есть столько времени, сколько нужно. Её говорят учителя на экзамене, продавцы в магазине, друзья. Звучит вежливо и спокойно. Песня тоже не спешит: она начинается медленно и даёт себе время.',
          en: 'A friendly phrase meaning you have as much time as you need. Teachers say it in exams, shop assistants say it, friends say it. It sounds polite and calm. The song doesn’t hurry either: it starts slowly and takes its time.',
        },
        ex: ['Take your time, the bus doesn’t leave until ten.', 'There’s no rush. Take your time choosing.'],
        similar: ['no rush', 'there’s no hurry'],
        tip: {
          uk: 'Не кажіть take your times. Time тут в однині.',
          ru: 'Не говорите take your times. Time здесь в единственном числе.',
          en: 'Time is singular here: take your time, not take your times.',
        },
      },
      {
        en: 'have your whole life ahead of you',
        m: { uk: 'усе життя попереду', ru: 'вся жизнь впереди', en: 'be young with lots of time for future plans' },
        story: {
          uk: 'Так кажуть молодим людям, щоб нагадати: ще багато часу на мрії й помилки. Вираз теплий, часто звучить від батьків чи бабусь. Його можна сказати, щоб підбадьорити після невдачі. Пісня дивиться в майбутнє з таким самим оптимізмом.',
          ru: 'Так говорят молодым людям, чтобы напомнить: ещё много времени на мечты и ошибки. Выражение тёплое, часто звучит от родителей или бабушек. Его можно сказать, чтобы подбодрить после неудачи. Песня смотрит в будущее с таким же оптимизмом.',
          en: 'People say this to young people to remind them there is plenty of time for dreams and mistakes. It is warm and often comes from parents or grandparents. You can say it to cheer someone up after a failure. The song looks at the future with the same hope.',
        },
        ex: ['Don’t worry about one bad mark, you have your whole life ahead of you.', 'At sixteen, she had her whole life ahead of her.'],
        similar: ['be young', 'have plenty of time'],
        tip: {
          uk: 'Займенники змінюються двічі: you have your whole life ahead of you, he has his whole life ahead of him.',
          ru: 'Местоимения меняются дважды: you have your whole life ahead of you, he has his whole life ahead of him.',
          en: 'Change both pronouns: he has his whole life ahead of him.',
        },
      },
      {
        en: 'one day at a time',
        m: { uk: 'по одному дню, не забігаючи наперед', ru: 'по одному дню, не забегая вперёд', en: 'deal with each day, don’t worry about the far future' },
        story: {
          uk: 'Порада для складних періодів: не думай про весь рік одразу, зосередься на сьогодні. Вираз спокійний і підтримуючий. Його часто кажуть під час підготовки до іспитів або після переїзду. Пісня поєднує мрії про майбутнє з умінням жити сьогоднішнім днем.',
          ru: 'Совет для трудных периодов: не думай о целом годе сразу, сосредоточься на сегодня. Выражение спокойное и поддерживающее. Его часто говорят во время подготовки к экзаменам или после переезда. Песня соединяет мечты о будущем с умением жить сегодняшним днём.',
          en: 'Advice for hard times: don’t think about the whole year at once, focus on today. It is calm and supportive. People often say it when preparing for exams or after moving. The song mixes dreams about the future with living for today.',
        },
        ex: ['The new school is hard, but I’m taking it one day at a time.', 'Don’t panic about the exams. One day at a time.'],
        similar: ['step by step', 'take things slowly'],
        tip: {
          uk: 'Часто з дієсловом take: take it one day at a time.',
          ru: 'Часто с глаголом take: take it one day at a time.',
          en: 'Often used with take: take it one day at a time.',
        },
      },
      {
        en: 'good things take time',
        m: { uk: 'усе добре потребує часу', ru: 'всё хорошее требует времени', en: 'great results need patience' },
        story: {
          uk: 'Фраза про терпіння: великі результати не з’являються одразу. Звучить мудро і спокійно, її люблять тренери й учителі. Подібно в українській кажуть «не одразу Київ будувався», а в російській «не сразу Москва строилась». Ідея пісні про ріст збігається повністю.',
          ru: 'Фраза о терпении: большие результаты не появляются сразу. Звучит мудро и спокойно, её любят тренеры и учителя. Похоже в русском говорят «не сразу Москва строилась», а в украинском «не одразу Київ будувався». Идея песни о росте совпадает полностью.',
          en: 'A phrase about patience: big results don’t come at once. It sounds wise and calm and is loved by coaches and teachers. Ukrainian and Russian have similar sayings about a great city not being built in a day. It matches the song’s idea of growing perfectly.',
        },
        ex: ['Your garden will look great next year. Good things take time.', 'I’m still learning the guitar, but good things take time.'],
        similar: ['Rome wasn’t built in a day', 'patience pays off'],
        tip: {
          uk: 'Англійський відповідник прислів’я про місто: Rome wasn’t built in a day.',
          ru: 'Английский аналог пословицы о городе: Rome wasn’t built in a day.',
          en: 'The English proverb with a city is Rome wasn’t built in a day.',
        },
      },
    ],
    culture: [
      {
        uk: 'Біллі Айліш двічі отримала «Оскар» за найкращу пісню до фільму: за «No Time to Die» і за «What Was I Made For?» з фільму «Барбі».',
        ru: 'Билли Айлиш дважды получила «Оскар» за лучшую песню к фильму: за «No Time to Die» и за «What Was I Made For?» из фильма «Барби».',
        en: 'Billie Eilish has won the Oscar for Best Original Song twice: for No Time to Die and for What Was I Made For? from the Barbie film.',
      },
      {
        uk: 'Біллі пише назви пісень і альбомів маленькими літерами, як «my future». Це її впізнаваний стиль, а не помилка.',
        ru: 'Билли пишет названия песен и альбомов маленькими буквами, как «my future». Это её узнаваемый стиль, а не ошибка.',
        en: 'Billie often writes song titles in small letters, like my future. It is her recognisable style, not a mistake.',
      },
    ],
  },

  'count-on-me': {
    intro: {
      uk: 'Це одна з найдружніших пісень у поп-музиці: проста, весела і про те, що справжні друзі завжди поруч. Вона чудово підходить і малечі, і підліткам. Нижче вирази про дружбу, підтримку й обіцянки, які носії мови вживають щодня. Усі приклади наші власні, тож їх можна сміливо використовувати на уроці.',
      ru: 'Это одна из самых дружеских песен в поп-музыке: простая, весёлая и о том, что настоящие друзья всегда рядом. Она отлично подходит и малышам, и подросткам. Ниже выражения о дружбе, поддержке и обещаниях, которые носители языка используют каждый день. Все примеры наши собственные, так что их можно смело использовать на уроке.',
      en: 'This is one of the friendliest songs in pop music: simple, happy and about real friends always being there for you. It works for young kids and teens. Below are expressions about friendship, support and promises that native speakers use every day. All the examples are our own, so you can use them in class.',
    },
    phrases: [
      {
        en: 'rely on',
        m: { uk: 'покладатися на', ru: 'полагаться на', en: 'trust someone or something to help' },
        story: {
          uk: 'Rely on дуже близьке до count on, але трохи формальніше. Так кажуть про людей, техніку, автобуси, усе, що не підведе. Вираз нейтральний, підходить і для школи, і для роботи. Це гарний синонім до назви пісні.',
          ru: 'Rely on очень близко к count on, но немного формальнее. Так говорят о людях, технике, автобусах, обо всём, что не подведёт. Выражение нейтральное, подходит и для школы, и для работы. Это хороший синоним к названию песни.',
          en: 'Rely on is very close to count on, but a little more formal. We use it for people, machines, buses, anything that won’t let you down. It is neutral and fine at school and at work. It is a good synonym for the song’s title.',
        },
        ex: ['You can rely on Anna, she always does her part.', 'I can’t rely on this old phone, it switches off all the time.'],
        similar: ['count on', 'depend on'],
        tip: {
          uk: 'Тільки прийменник on: rely on, а не rely to або rely at.',
          ru: 'Только предлог on: rely on, а не rely to или rely at.',
          en: 'Only on: rely on, not rely to or rely at.',
        },
      },
      {
        en: 'stick together',
        m: { uk: 'триматися разом', ru: 'держаться вместе', en: 'stay together and help each other' },
        story: {
          uk: 'Stick означає «липнути». Друзі, які stick together, ніби склеєні: вони не кидають одне одного. Вираз розмовний і дуже дружній. Його часто кажуть у таборі, на екскурсії чи в команді.',
          ru: 'Stick значит «липнуть». Друзья, которые stick together, будто склеены: они не бросают друг друга. Выражение разговорное и очень дружеское. Его часто говорят в лагере, на экскурсии или в команде.',
          en: 'Stick means to glue. Friends who stick together seem glued: they don’t leave each other. It is informal and very friendly. People often say it at camp, on a school trip or in a team.',
        },
        ex: ['The museum is big, so let’s stick together.', 'Our class always sticks together.'],
        similar: ['stay together', 'support each other'],
        tip: {
          uk: 'Минулий час неправильний: stick, stuck, stuck. We stuck together.',
          ru: 'Прошедшее время неправильное: stick, stuck, stuck. We stuck together.',
          en: 'Irregular past: stick, stuck, stuck. We stuck together.',
        },
      },
      {
        en: 'through thick and thin',
        m: { uk: 'і в горі, і в радості', ru: 'и в горе, и в радости', en: 'in good times and bad times' },
        story: {
          uk: 'Старий вираз про ліс, густий (thick) і рідкий (thin): хоч куди дорога веде, ти йдеш далі. Сьогодні так кажуть про вірну дружбу. Звучить тепло і трохи урочисто. Пісня саме про таку дружбу, яка не залежить від обставин.',
          ru: 'Старое выражение о лесе, густом (thick) и редком (thin): куда бы ни вела дорога, ты идёшь дальше. Сегодня так говорят о верной дружбе. Звучит тепло и немного торжественно. Песня именно о такой дружбе, которая не зависит от обстоятельств.',
          en: 'An old phrase about woods, thick and thin: wherever the path goes, you keep going. Today we say it about loyal friendship. It sounds warm and a bit formal. The song is about exactly this kind of friendship, whatever happens.',
        },
        ex: ['My best friend has been with me through thick and thin.', 'A real team stays together through thick and thin.'],
        similar: ['in good times and bad', 'no matter what'],
        tip: {
          uk: 'Порядок слів незмінний: thick and thin, а не thin and thick.',
          ru: 'Порядок слов неизменный: thick and thin, а не thin and thick.',
          en: 'The order is fixed: thick and thin, never thin and thick.',
        },
      },
      {
        en: 'go the extra mile',
        m: { uk: 'зробити більше, ніж треба', ru: 'сделать больше, чем нужно', en: 'make a special effort to help' },
        story: {
          uk: 'Пройти «зайву милю» означає докласти більше зусиль, ніж від тебе чекають. Так хвалять друзів, учителів, працівників. Вираз нейтральний, його часто чути і на роботі. Хороший друг, як у пісні, завжди готовий go the extra mile.',
          ru: 'Пройти «лишнюю милю» значит приложить больше усилий, чем от тебя ждут. Так хвалят друзей, учителей, работников. Выражение нейтральное, его часто слышно и на работе. Хороший друг, как в песне, всегда готов go the extra mile.',
          en: 'Going an extra mile means doing more than people expect. We use it to praise friends, teachers and workers. It is neutral and common at work too. A good friend, like in the song, is always ready to go the extra mile.',
        },
        ex: ['My friend went the extra mile and made me a birthday video with all our classmates.', 'Our teacher always goes the extra mile for us.'],
        similar: ['make an extra effort', 'do more than expected'],
        tip: {
          uk: 'Миля приблизно 1,6 км. Вираз завжди з the: go the extra mile.',
          ru: 'Миля примерно 1,6 км. Выражение всегда с the: go the extra mile.',
          en: 'A mile is about 1.6 km. Always use the: go the extra mile.',
        },
      },
      {
        en: 'cheer someone on',
        m: { uk: 'вболівати за когось, підбадьорювати', ru: 'болеть за кого-то, подбадривать', en: 'shout to support someone in a race or game' },
        story: {
          uk: 'Так кажуть, коли кричать і плескають, щоб підтримати когось на змаганнях чи виступі. Вираз розмовний і енергійний. Справжні друзі приходять на твій матч і cheer you on. Це ще одна форма дружньої підтримки.',
          ru: 'Так говорят, когда кричат и хлопают, чтобы поддержать кого-то на соревнованиях или выступлении. Выражение разговорное и энергичное. Настоящие друзья приходят на твой матч и cheer you on. Это ещё одна форма дружеской поддержки.',
          en: 'We say this when people shout and clap to support someone in a competition or show. It is informal and full of energy. Real friends come to your match and cheer you on. It is another way of supporting a friend.',
        },
        ex: ['All my friends came to cheer me on at the race.', 'We cheered our team on until the last minute.'],
        similar: ['support', 'root for someone (American English)'],
        tip: {
          uk: 'Займенник посередині: cheer me on, cheer them on.',
          ru: 'Местоимение посередине: cheer me on, cheer them on.',
          en: 'The pronoun goes in the middle: cheer me on, cheer them on.',
        },
      },
      {
        en: 'make friends',
        m: { uk: 'заводити друзів, подружитися', ru: 'заводить друзей, подружиться', en: 'start a friendship' },
        story: {
          uk: 'Базовий, але дуже важливий вираз. Українською ми «заводимо» друзів, а англійською їх «робимо»: make friends. Звучить нейтрально. Корисно для розповідей про новий клас, табір чи переїзд.',
          ru: 'Базовое, но очень важное выражение. По-русски мы «заводим» друзей, а по-английски их «делаем»: make friends. Звучит нейтрально. Полезно для рассказов о новом классе, лагере или переезде.',
          en: 'A basic but very important phrase. In English you make friends. It is neutral. It is useful for talking about a new class, a camp or moving house.',
        },
        ex: ['I made friends with a girl from Poland at the camp.', 'It’s easy to make friends when you join a club.'],
        similar: ['become friends', 'get to know someone'],
        tip: {
          uk: 'Friends завжди у множині: make friends with someone, навіть якщо друг один.',
          ru: 'Friends всегда во множественном числе: make friends with someone, даже если друг один.',
          en: 'Friends is always plural: make friends with someone, even with one person.',
        },
      },
      {
        en: 'friends for life',
        m: { uk: 'друзі на все життя', ru: 'друзья на всю жизнь', en: 'friends who stay friends forever' },
        story: {
          uk: 'Так кажуть про дружбу, яка триває роками, з дитячого садка до дорослого життя. Вираз теплий, часто звучить на випускних і в листівках. Пісня якраз про таку дружбу. Можна сказати і про одну людину: a friend for life.',
          ru: 'Так говорят о дружбе, которая длится годами, с детского сада до взрослой жизни. Выражение тёплое, часто звучит на выпускных и в открытках. Песня как раз о такой дружбе. Можно сказать и об одном человеке: a friend for life.',
          en: 'We say this about a friendship that lasts for years, from kindergarten to adult life. It is warm and often heard at graduations and in cards. The song is about this kind of friendship. For one person, say a friend for life.',
        },
        ex: ['We met when we were five, and we’re friends for life.', 'Camp is where I found a friend for life.'],
        similar: ['lifelong friends', 'best friends forever'],
        tip: {
          uk: 'Прийменник for: friends for life, а не friends on life.',
          ru: 'Предлог for: friends for life, а не friends on life.',
          en: 'Use for: friends for life, not friends on life.',
        },
      },
      {
        en: 'get on well with someone',
        m: { uk: 'добре ладнати з кимось', ru: 'хорошо ладить с кем-то', en: 'have a good, friendly relationship' },
        story: {
          uk: 'Британський варіант виразу get along. Так кажуть про друзів, сусідів, братів і сестер, які не сваряться. Вираз нейтральний і дуже частий на уроках. Його легко вживати, коли розповідаєш про свою сім’ю чи клас.',
          ru: 'Британский вариант выражения get along. Так говорят о друзьях, соседях, братьях и сёстрах, которые не ссорятся. Выражение нейтральное и очень частое на уроках. Его легко использовать, когда рассказываешь о своей семье или классе.',
          en: 'This is the British version of get along. We use it for friends, neighbours, brothers and sisters who don’t argue. It is neutral and very common in lessons. It is easy to use when talking about your family or class.',
        },
        ex: ['I get on well with my cousin, we like the same games.', 'Do you get on well with your neighbours?'],
        similar: ['get along with someone', 'be on good terms'],
        tip: {
          uk: 'Протилежне: not get on with someone. Наприклад, I don’t get on with my brother.',
          ru: 'Противоположное: not get on with someone. Например, I don’t get on with my brother.',
          en: 'The negative: I don’t get on with my brother.',
        },
      },
      {
        en: 'keep a promise',
        m: { uk: 'дотримати обіцянки', ru: 'сдержать обещание', en: 'do what you said you would do' },
        story: {
          uk: 'Promise це обіцянка. Keep a promise означає її виконати, а break a promise порушити. Вираз нейтральний, його знають з дитинства. Друг, на якого можна розраховувати, завжди тримає слово.',
          ru: 'Promise это обещание. Keep a promise значит его выполнить, а break a promise нарушить. Выражение нейтральное, его знают с детства. Друг, на которого можно рассчитывать, всегда держит слово.',
          en: 'A promise is when you say you will definitely do something. Keep a promise means do it, and break a promise means don’t. It is neutral and known from childhood. A friend you can count on always keeps their word.',
        },
        ex: ['I promised to help you, and I always keep my promises.', 'He broke his promise and didn’t come.'],
        similar: ['keep your word', 'opposite: break a promise'],
        tip: {
          uk: 'Не кажіть hold a promise або do a promise. Правильно keep a promise.',
          ru: 'Не говорите hold a promise или do a promise. Правильно keep a promise.',
          en: 'Don’t say hold or do a promise. Say keep a promise.',
        },
      },
      {
        en: 'drop everything',
        m: { uk: 'кинути все (щоб допомогти)', ru: 'бросить всё (чтобы помочь)', en: 'stop what you are doing at once to help' },
        story: {
          uk: 'Буквально «впустити все з рук». Так кажуть, коли людина негайно залишає свої справи, бо комусь потрібна допомога. Вираз розмовний і показує велику відданість. Саме так поводиться справжній друг, про якого ця пісня.',
          ru: 'Буквально «уронить всё из рук». Так говорят, когда человек сразу оставляет свои дела, потому что кому-то нужна помощь. Выражение разговорное и показывает большую преданность. Именно так ведёт себя настоящий друг, о котором эта песня.',
          en: 'Literally let everything fall from your hands. We say it when someone stops what they are doing at once because a friend needs help. It is informal and shows great loyalty. That is how a real friend, like the one in this song, behaves.',
        },
        ex: ['When my bike broke, my dad dropped everything and came to get me.', 'She’s the kind of friend who drops everything when you call.'],
        similar: ['come straight away', 'be there in a flash'],
        tip: {
          uk: 'Ще один корисний вираз: Drop me a line, тобто «Напиши мені».',
          ru: 'Ещё одно полезное выражение: Drop me a line, то есть «Напиши мне».',
          en: 'Another useful drop phrase: Drop me a line, meaning write to me.',
        },
      },
    ],
    culture: [
      {
        uk: 'Укулеле походить із Гаваїв. Інструмент створили за зразком маленької португальської гітари, яку туди привезли переселенці в XIX столітті.',
        ru: 'Укулеле происходит с Гавайев. Инструмент создали по образцу маленькой португальской гитары, которую туда привезли переселенцы в XIX веке.',
        en: 'The ukulele comes from Hawaii. It was based on a small Portuguese guitar that settlers brought to the islands in the 19th century.',
      },
      {
        uk: 'Гаваї це американський штат, що складається з островів у Тихому океані. Звідти походить відоме вітання aloha, яке означає і «привіт», і «до побачення».',
        ru: 'Гавайи это американский штат, состоящий из островов в Тихом океане. Оттуда происходит известное приветствие aloha, которое значит и «привет», и «до свидания».',
        en: 'Hawaii is a US state made of islands in the Pacific Ocean. The famous word aloha comes from there and means both hello and goodbye.',
      },
    ],
  },
};
