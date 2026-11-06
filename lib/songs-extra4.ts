// Додаткові пісні (частина F): поп, який слухають підлітки. Тексти пісень не публікуємо.
import type { Song } from './songs';
import type { SongLesson } from './songs-more';
import type { SongDeep } from './songs-deep';

export const SONGS_EXTRA4: Song[] = [
  {
    id: 'dynamite', artist: 'BTS', title: 'Dynamite', yt: 'gdZLi9oWNZg', year: 2020, level: 'A2', age: 'all',
    about: { uk: 'Перша пісня гурту BTS, повністю записана англійською. Яскравий диско-поп про радість, енергію і бажання танцювати, навіть коли навколо непрості часи. У кліпі хлопці в барвистому ретро-стилі: кав’ярня, магазин платівок і танцювальний майданчик.', ru: 'Первая песня группы BTS, полностью записанная на английском. Яркий диско-поп о радости, энергии и желании танцевать, даже когда вокруг непростые времена. В клипе ребята в красочном ретро-стиле: кафе, магазин пластинок и танцпол.', en: 'BTS’s first song recorded fully in English. A bright disco-pop track about joy, energy and wanting to dance even when times are hard. In the video the members appear in a colourful retro style: a café, a record shop and a dance floor.' },
    grammar: { uk: 'Пропозиції і запрошення: Let’s dance! Why don’t we go out? How about + -ing: How about meeting at six?', ru: 'Предложения и приглашения: Let’s dance! Why don’t we go out? How about + -ing: How about meeting at six?', en: 'Suggestions and invitations: Let’s dance! Why don’t we go out? How about + -ing: How about meeting at six?' },
    phrases: [
      { en: 'to cheer someone up', m: { uk: 'підбадьорити, розвеселити когось', ru: 'подбодрить, развеселить кого-то', en: 'make someone feel happier' }, ex: 'I sent my friend a funny video to cheer her up.' },
      { en: 'upbeat', m: { uk: 'бадьорий, життєрадісний', ru: 'бодрый, жизнерадостный', en: 'happy and full of energy' }, ex: 'I listen to upbeat music when I clean my room.' },
      { en: 'to have a blast', m: { uk: 'чудово розважитися', ru: 'отлично повеселиться', en: 'have a really great time' }, ex: 'We had a blast at the school disco.' },
      { en: 'full of energy', m: { uk: 'сповнений енергії', ru: 'полон энергии', en: 'very active and lively' }, ex: 'My little sister is full of energy in the morning.' },
      { en: 'to be in a good mood', m: { uk: 'бути в гарному настрої', ru: 'быть в хорошем настроении', en: 'feel happy and positive' }, ex: 'Dad is in a good mood because his team won.' },
    ],
    talk: ['Which song always puts you in a good mood?', 'Do you like dancing? Where do you usually dance?', 'Why do you think BTS decided to record a song in English?'],
  },
  {
    id: 'a-sky-full-of-stars', artist: 'Coldplay', title: 'A Sky Full of Stars', yt: 'VPRjCeoBqrI', year: 2014, level: 'A2', age: 'all',
    about: { uk: 'Світла, танцювальна пісня британського гурту Coldplay про людину, яка для тебе важить так багато, що поруч із нею весь світ ніби сяє. У кліпі співак Кріс Мартін іде вулицею Сіднея як «людина-оркестр», а за ним збирається натовп щасливих фанатів.', ru: 'Светлая танцевальная песня британской группы Coldplay о человеке, который так много для тебя значит, что рядом с ним весь мир будто сияет. В клипе певец Крис Мартин идёт по улице Сиднея как «человек-оркестр», а за ним собирается толпа счастливых фанатов.', en: 'A bright, danceable song by the British band Coldplay about a person who means so much to you that the whole world seems to shine when they are near. In the video singer Chris Martin walks down a street in Sydney as a one-man band, and a crowd of happy fans follows him.' },
    grammar: { uk: 'Перший умовний: If + present simple, will + дієслово. If the sky is clear tonight, we will see the stars.', ru: 'Первое условное: If + present simple, will + глагол. If the sky is clear tonight, we will see the stars.', en: 'The first conditional: If + present simple, will + verb. If the sky is clear tonight, we will see the stars.' },
    phrases: [
      { en: 'to reach for the stars', m: { uk: 'прагнути великого, високо цілитися', ru: 'стремиться к большому, высоко метить', en: 'try to achieve something great' }, ex: 'My coach always tells us to reach for the stars.' },
      { en: 'to be over the moon', m: { uk: 'бути на сьомому небі від щастя', ru: 'быть на седьмом небе от счастья', en: 'be extremely happy' }, ex: 'She was over the moon when she got a puppy.' },
      { en: 'a starry night', m: { uk: 'зоряна ніч', ru: 'звёздная ночь', en: 'a night with many stars in the sky' }, ex: 'We lay on the grass and looked at the starry night.' },
      { en: 'to look up to someone', m: { uk: 'захоплюватися кимось, брати приклад', ru: 'восхищаться кем-то, брать пример', en: 'admire and respect someone' }, ex: 'I really look up to my older cousin.' },
      { en: 'a crowd', m: { uk: 'натовп', ru: 'толпа', en: 'a large group of people' }, ex: 'A huge crowd was waiting outside the stadium.' },
    ],
    talk: ['Have you ever seen a really starry sky? Where?', 'Who do you look up to? Why?', 'Would you like to follow a street musician in a big crowd? Why or why not?'],
  },
  {
    id: 'dont-start-now', artist: 'Dua Lipa', title: 'Don’t Start Now', yt: 'oygrmJFKYZY', year: 2019, level: 'B1', age: 'teens',
    about: { uk: 'Енергійний диско-поп про те, як залишити розставання в минулому і почати нове життя. Героїня вже впоралася з болем і почувається сильнішою, тож не хоче, щоб колишній раптом повертався. Пісня стала першим синглом альбому Future Nostalgia, а кліп схожий на яскраву вечірку з танцями.', ru: 'Энергичный диско-поп о том, как оставить расставание в прошлом и начать новую жизнь. Героиня уже справилась с болью и чувствует себя сильнее, поэтому не хочет, чтобы бывший вдруг возвращался. Песня стала первым синглом альбома Future Nostalgia, а клип похож на яркую вечеринку с танцами.', en: 'An energetic disco-pop song about leaving a break-up in the past and starting a new life. She has already dealt with the pain and feels stronger, so she doesn’t want her ex to suddenly come back. It was the first single from the album Future Nostalgia, and the video looks like a bright dance party.' },
    grammar: { uk: 'Present perfect з already, just, yet: I have already finished. She has just arrived. Have you done it yet?', ru: 'Present perfect с already, just, yet: I have already finished. She has just arrived. Have you done it yet?', en: 'Present perfect with already, just and yet: I have already finished. She has just arrived. Have you done it yet?' },
    phrases: [
      { en: 'to get over someone', m: { uk: 'оговтатися після розставання з кимось', ru: 'прийти в себя после расставания с кем-то', en: 'stop feeling sad about someone after a break-up' }, ex: 'It took him a month to get over his first girlfriend.' },
      { en: 'a fresh start', m: { uk: 'новий початок', ru: 'новое начало', en: 'a chance to begin again' }, ex: 'The new school was a fresh start for me.' },
      { en: 'to bounce back', m: { uk: 'швидко відновитися, повернутися у форму', ru: 'быстро восстановиться, вернуться в форму', en: 'recover quickly after a problem' }, ex: 'Our team lost the first game but bounced back the next week.' },
      { en: 'to turn the page', m: { uk: 'перегорнути сторінку, почати новий етап', ru: 'перевернуть страницу, начать новый этап', en: 'leave the past behind and start something new' }, ex: 'After the argument we decided to turn the page.' },
      { en: 'an ex', m: { uk: 'колишній, колишня', ru: 'бывший, бывшая', en: 'a former boyfriend or girlfriend' }, ex: 'She stayed friends with her ex.' },
    ],
    talk: ['What helps you feel better after a bad week?', 'Is it possible to stay friends with an ex? Why or why not?', 'When did you need a fresh start?'],
  },
  {
    id: 'photograph', artist: 'Ed Sheeran', title: 'Photograph', yt: 'nSDgHBxUbVQ', year: 2014, level: 'A2-B1', age: 'all',
    about: { uk: 'Ніжна балада про спогади і про те, як фотографії допомагають нам бути ближче до людей, з якими ми зараз далеко. У кліпі немає акторів: це справжні домашні відео Еда Ширана з дитинства, від перших кроків до перших концертів.', ru: 'Нежная баллада о воспоминаниях и о том, как фотографии помогают быть ближе к людям, с которыми мы сейчас далеко. В клипе нет актёров: это настоящие домашние видео Эда Ширана из детства, от первых шагов до первых концертов.', en: 'A gentle ballad about memories and about how photos help us feel close to people who are far away. There are no actors in the video: it is made of Ed Sheeran’s real home videos from childhood, from his first steps to his first gigs.' },
    grammar: { uk: 'Used to і would для звичок у минулому: I used to play the guitar every day. On Sundays we would visit Grandma. А ще remember + -ing: I remember singing at school.', ru: 'Used to и would для привычек в прошлом: I used to play the guitar every day. On Sundays we would visit Grandma. А ещё remember + -ing: I remember singing at school.', en: 'Used to and would for past habits: I used to play the guitar every day. On Sundays we would visit Grandma. Also remember + -ing: I remember singing at school.' },
    phrases: [
      { en: 'to bring back memories', m: { uk: 'навіювати спогади', ru: 'навевать воспоминания', en: 'make you remember the past' }, ex: 'This smell of pancakes brings back memories of my grandma’s kitchen.' },
      { en: 'to look back on something', m: { uk: 'згадувати, озиратися назад', ru: 'вспоминать, оглядываться назад', en: 'think about something in the past' }, ex: 'When I look back on primary school, I smile.' },
      { en: 'to stay in touch', m: { uk: 'підтримувати зв’язок', ru: 'поддерживать связь', en: 'keep talking to someone who is far away' }, ex: 'We moved to another city, but we stay in touch online.' },
      { en: 'a keepsake', m: { uk: 'пам’ятна річ', ru: 'памятная вещь', en: 'a small thing you keep to remember someone' }, ex: 'I keep this concert ticket as a keepsake.' },
      { en: 'to miss someone', m: { uk: 'сумувати за кимось', ru: 'скучать по кому-то', en: 'feel sad because someone is not with you' }, ex: 'I miss my best friend when she is on holiday.' },
    ],
    talk: ['Which photo means a lot to you? Why?', 'How do you stay in touch with friends who live far away?', 'What did you use to do when you were little?'],
  },
  {
    id: 'you-belong-with-me', artist: 'Taylor Swift', title: 'You Belong With Me', yt: 'VuNIsY6JdUw', year: 2008, level: 'A2-B1', age: 'teens',
    about: { uk: 'Шкільна історія від Тейлор Свіфт: дівчина закохана в хлопця із сусіднього будинку, який зустрічається з популярною, але зовсім не схожою на нього дівчиною. Героїня вважає, що саме вона розуміє його найкраще. У кліпі Тейлор грає обох дівчат, скромну сусідку і популярну дівчину.', ru: 'Школьная история от Тейлор Свифт: девушка влюблена в парня из соседнего дома, который встречается с популярной, но совсем не похожей на него девушкой. Героиня считает, что именно она понимает его лучше всех. В клипе Тейлор играет обеих девушек, скромную соседку и популярную девушку.', en: 'A school story from Taylor Swift: a girl has a crush on the boy next door, who is dating a popular girl who is nothing like him. She believes she is the one who understands him best. In the video Taylor plays both girls, the shy neighbour and the popular girl.' },
    grammar: { uk: 'Порівняння: more popular than, funnier than, as kind as, not as loud as. She is more popular, but he is happier with me.', ru: 'Сравнение: more popular than, funnier than, as kind as, not as loud as. She is more popular, but he is happier with me.', en: 'Comparisons: more popular than, funnier than, as kind as, not as loud as. She is more popular, but he is happier with me.' },
    phrases: [
      { en: 'to have a crush on someone', m: { uk: 'бути закоханим у когось (часто таємно)', ru: 'быть влюблённым в кого-то (часто тайно)', en: 'like someone romantically, often secretly' }, ex: 'Everybody knows Max has a crush on the new girl.' },
      { en: 'the girl next door', m: { uk: 'проста, мила дівчина з сусіднього дому', ru: 'простая милая девушка из соседнего дома', en: 'a friendly, ordinary girl who lives nearby' }, ex: 'In the film, the hero falls for the girl next door.' },
      { en: 'just friends', m: { uk: 'просто друзі', ru: 'просто друзья', en: 'friends and nothing more' }, ex: 'We’re not dating, we’re just friends.' },
      { en: 'to be out of someone’s league', m: { uk: 'бути «не по зубах» комусь, занадто крутим', ru: 'быть «не по зубам» кому-то, слишком крутым', en: 'seem too good or too popular for someone' }, ex: 'He thinks she’s out of his league, but she likes him.' },
      { en: 'to see someone for who they really are', m: { uk: 'бачити справжню суть людини', ru: 'видеть настоящую суть человека', en: 'understand what a person is really like' }, ex: 'A true friend sees you for who you really are.' },
    ],
    talk: ['Why do you think so many teen films are about a secret crush?', 'Is it better to be popular or to have one real friend? Why?', 'Can a boy and a girl be just friends?'],
  },
  {
    id: 'unstoppable', artist: 'Sia', title: 'Unstoppable', yt: 'cxjvTXo9WWM', year: 2016, level: 'B1', age: 'all',
    about: { uk: 'Потужний гімн упевненості від австралійської співачки Сії. Героїня показує світу силу і сміливість, навіть коли всередині їй непросто, і вірить, що нічого її не зупинить. Пісню часто вмикають перед змаганнями, іспитами й у мотиваційних відео. Тут офіційне аудіо з каналу співачки.', ru: 'Мощный гимн уверенности от австралийской певицы Сии. Героиня показывает миру силу и смелость, даже когда внутри ей непросто, и верит, что ничто её не остановит. Песню часто включают перед соревнованиями, экзаменами и в мотивационных видео. Здесь официальное аудио с канала певицы.', en: 'A powerful anthem of confidence from Australian singer Sia. She shows the world strength and courage, even when things are hard inside, and believes nothing can stop her. People often play it before competitions, exams and in motivational videos. This is the official audio from the singer’s channel.' },
    grammar: { uk: 'Can, can’t, be able to: I can do it. Nobody can stop me. Next year I will be able to run 10 km. А ще nothing, nobody, anything, anybody.', ru: 'Can, can’t, be able to: I can do it. Nobody can stop me. Next year I will be able to run 10 km. А ещё nothing, nobody, anything, anybody.', en: 'Can, can’t and be able to: I can do it. Nobody can stop me. Next year I will be able to run 10 km. Also nothing, nobody, anything and anybody.' },
    phrases: [
      { en: 'to put on a brave face', m: { uk: 'триматися, робити вигляд, що все добре', ru: 'держаться, делать вид, что всё хорошо', en: 'look calm and strong when you feel worried' }, ex: 'She was nervous before the exam but put on a brave face.' },
      { en: 'to believe in yourself', m: { uk: 'вірити в себе', ru: 'верить в себя', en: 'trust that you can do something' }, ex: 'If you believe in yourself, others will too.' },
      { en: 'to push through', m: { uk: 'пробитися, витримати до кінця', ru: 'пробиться, выдержать до конца', en: 'keep going when something is difficult' }, ex: 'The last kilometre was hard, but I pushed through.' },
      { en: 'confident', m: { uk: 'впевнений у собі', ru: 'уверенный в себе', en: 'sure about yourself and your abilities' }, ex: 'He feels confident when he speaks English now.' },
      { en: 'to rise to the challenge', m: { uk: 'гідно впоратися з викликом', ru: 'достойно справиться с вызовом', en: 'deal well with a difficult situation' }, ex: 'Our new goalkeeper rose to the challenge in the final.' },
    ],
    talk: ['What song do you listen to before an exam or a competition?', 'When did you have to put on a brave face?', 'What makes a person confident?'],
  },
  {
    id: 'lose-you-to-love-me', artist: 'Selena Gomez', title: 'Lose You to Love Me', yt: 'zlJDTxahav0', year: 2019, level: 'B1', age: 'teens',
    about: { uk: 'Тиха, щира балада про те, як після складних стосунків людина нарешті обирає себе. Головна ідея: іноді треба відпустити когось, щоб навчитися любити й поважати себе. Кліп чорно-білий і дуже простий: лише Селена Гомес і її голос.', ru: 'Тихая, искренняя баллада о том, как после сложных отношений человек наконец выбирает себя. Главная идея: иногда нужно отпустить кого-то, чтобы научиться любить и уважать себя. Клип чёрно-белый и очень простой: только Селена Гомес и её голос.', en: 'A quiet, honest ballad about finally choosing yourself after a difficult relationship. The main idea is that sometimes you have to let someone go to learn to love and respect yourself. The video is black and white and very simple: just Selena Gomez and her voice.' },
    grammar: { uk: 'Зворотні займенники: myself, yourself, himself, herself, ourselves, themselves. Love yourself. I did it by myself.', ru: 'Возвратные местоимения: myself, yourself, himself, herself, ourselves, themselves. Love yourself. I did it by myself.', en: 'Reflexive pronouns: myself, yourself, himself, herself, ourselves, themselves. Love yourself. I did it by myself.' },
    phrases: [
      { en: 'self-love', m: { uk: 'любов до себе', ru: 'любовь к себе', en: 'caring about and respecting yourself' }, ex: 'Self-love means taking care of your body and your mind.' },
      { en: 'to put yourself first', m: { uk: 'ставити себе на перше місце', ru: 'ставить себя на первое место', en: 'think about your own needs first' }, ex: 'Sometimes it’s OK to say no and put yourself first.' },
      { en: 'to heal', m: { uk: 'зцілюватися, загоюватися', ru: 'исцеляться, заживать', en: 'get better after pain' }, ex: 'Time helps a broken heart heal.' },
      { en: 'to learn the hard way', m: { uk: 'навчитися на власних помилках', ru: 'научиться на собственных ошибках', en: 'learn something through a bad experience' }, ex: 'I learned the hard way to save my homework.' },
      { en: 'to grow stronger', m: { uk: 'ставати сильнішим', ru: 'становиться сильнее', en: 'become stronger over time' }, ex: 'After every difficult year, she grew stronger.' },
    ],
    talk: ['What does self-love mean to you?', 'Is it selfish to put yourself first sometimes? Why or why not?', 'What have you learned the hard way?'],
  },
  {
    id: 'someone-you-loved', artist: 'Lewis Capaldi', title: 'Someone You Loved', yt: 'zABLecsR5UE', year: 2018, level: 'B1-B2', age: 'teens',
    about: { uk: 'Сумна балада шотландського співака Льюїса Капальді про людину, яка після розставання почувається загубленою і дуже сумує за коханою. Кліп розповідає окрему зворушливу історію про донорство органів: чоловік, що втратив дружину, знайомиться з дівчиною, якій пересадили її серце. Головну роль зіграв актор Пітер Капальді, далекий родич співака.', ru: 'Грустная баллада шотландского певца Льюиса Капальди о человеке, который после расставания чувствует себя потерянным и очень скучает по любимой. Клип рассказывает отдельную трогательную историю о донорстве органов: мужчина, потерявший жену, знакомится с девушкой, которой пересадили её сердце. Главную роль сыграл актёр Питер Капальди, дальний родственник певца.', en: 'A sad ballad by Scottish singer Lewis Capaldi about someone who feels lost after a break-up and misses the person he loved. The video tells its own moving story about organ donation: a man who lost his wife meets a young woman who received her heart. The main role is played by actor Peter Capaldi, a distant relative of the singer.' },
    grammar: { uk: 'I wish + past simple і другий умовний: I wish you were here. If I had more time, I would call her.', ru: 'I wish + past simple и второе условное: I wish you were here. If I had more time, I would call her.', en: 'I wish + past simple and the second conditional: I wish you were here. If I had more time, I would call her.' },
    phrases: [
      { en: 'heartbroken', m: { uk: 'з розбитим серцем', ru: 'с разбитым сердцем', en: 'very sad because of love or loss' }, ex: 'She was heartbroken when her best friend moved away.' },
      { en: 'to lean on someone', m: { uk: 'спиратися на когось, шукати підтримки', ru: 'опираться на кого-то, искать поддержки', en: 'depend on someone for help and support' }, ex: 'You can always lean on your family.' },
      { en: 'a shoulder to cry on', m: { uk: 'людина, яка вислухає і підтримає', ru: 'человек, который выслушает и поддержит', en: 'a person who listens when you are sad' }, ex: 'My sister is always a shoulder to cry on.' },
      { en: 'to get through something', m: { uk: 'пережити щось складне', ru: 'пережить что-то трудное', en: 'manage to survive a difficult time' }, ex: 'We got through the winter together.' },
      { en: 'to save a life', m: { uk: 'врятувати життя', ru: 'спасти жизнь', en: 'stop someone from dying' }, ex: 'Learning first aid can help you save a life.' },
    ],
    talk: ['Who is a shoulder to cry on for you?', 'Why do people like sad songs?', 'What do you know about organ donation? What do you think about it?'],
  },
];

export const MORE_F: Record<string, SongLesson> = {
  'dynamite': {
    facts: [
      { uk: 'Пісня вийшла 21 серпня 2020 року. Це перша пісня BTS, повністю записана англійською мовою.', ru: 'Песня вышла 21 августа 2020 года. Это первая песня BTS, полностью записанная на английском языке.', en: 'The song came out on 21 August 2020. It was the first BTS song recorded completely in English.' },
      { uk: '«Dynamite» стала першою піснею BTS на першому місці чарту Billboard Hot 100. Вперше цей чарт очолив гурт, повністю складений із південнокорейських виконавців.', ru: '«Dynamite» стала первой песней BTS на первом месте чарта Billboard Hot 100. Впервые этот чарт возглавила группа, полностью состоящая из южнокорейских исполнителей.', en: 'Dynamite was BTS’s first No. 1 on the Billboard Hot 100. It was the first time an all-South Korean act topped this chart.' },
      { uk: 'За перші 24 години кліп подивилися понад 100 мільйонів разів. На той момент це був рекорд YouTube.', ru: 'За первые 24 часа клип посмотрели больше 100 миллионов раз. На тот момент это был рекорд YouTube.', en: 'The video got more than 100 million views in its first 24 hours, a YouTube record at the time.' },
      { uk: 'Завдяки «Dynamite» BTS вперше отримали номінацію на «Греммі» в категорії «Найкраще поп-виконання дуетом або гуртом».', ru: 'Благодаря «Dynamite» BTS впервые получили номинацию на «Грэмми» в категории «Лучшее поп-исполнение дуэтом или группой».', en: 'Dynamite gave BTS their first Grammy nomination, for Best Pop Duo/Group Performance.' },
      { uk: 'У BTS семеро учасників: RM, Jin, SUGA, j-hope, Jimin, V і Jung Kook. Гурт дебютував у Сеулі у 2013 році.', ru: 'В BTS семь участников: RM, Jin, SUGA, j-hope, Jimin, V и Jung Kook. Группа дебютировала в Сеуле в 2013 году.', en: 'BTS has seven members: RM, Jin, SUGA, j-hope, Jimin, V and Jung Kook. The group debuted in Seoul in 2013.' },
    ],
    warmup: [
      'What music do you play when you want to feel happy?',
      'Do you know any K-pop groups? Which ones?',
      'Where do you like to dance: at home, at parties or not at all?',
    ],
    vocab: [
      {
        group: { uk: 'Настрій і енергія', ru: 'Настроение и энергия', en: 'Mood and energy' },
        items: [
          { en: 'upbeat', uk: 'бадьорий, життєрадісний', ru: 'бодрый, жизнерадостный', ex: 'The café plays upbeat music in the morning.' },
          { en: 'cheerful', uk: 'веселий, радісний', ru: 'весёлый, радостный', ex: 'Our new neighbour is always cheerful.' },
          { en: 'lively', uk: 'жвавий', ru: 'оживлённый, живой', ex: 'The market is very lively on Saturdays.' },
          { en: 'to cheer up', uk: 'підбадьоритися, повеселішати', ru: 'приободриться, повеселеть', ex: 'Cheer up! The weekend is almost here.' },
          { en: 'to brighten', uk: 'робити яскравішим, світлішим', ru: 'делать ярче, светлее', ex: 'Yellow curtains brighten the kitchen.' },
        ],
      },
      {
        group: { uk: 'Танці й вечірки', ru: 'Танцы и вечеринки', en: 'Dancing and parties' },
        items: [
          { en: 'a dance floor', uk: 'танцмайданчик', ru: 'танцпол', ex: 'Everyone ran to the dance floor when the song started.' },
          { en: 'a dance move', uk: 'танцювальний рух', ru: 'танцевальное движение', ex: 'Can you teach me that dance move?' },
          { en: 'to groove', uk: 'рухатися в ритм музики', ru: 'двигаться в ритм музыки', ex: 'Grandpa started to groove to the old song.' },
          { en: 'a disco', uk: 'дискотека; диско (стиль)', ru: 'дискотека; диско (стиль)', ex: 'The school disco is on Friday.' },
          { en: 'to show off', uk: 'хизуватися', ru: 'хвастаться, красоваться', ex: 'He loves to show off his dance moves.' },
        ],
      },
      {
        group: { uk: 'Ретро і стиль', ru: 'Ретро и стиль', en: 'Retro and style' },
        items: [
          { en: 'retro', uk: 'ретро, у старовинному стилі', ru: 'ретро, в старинном стиле', ex: 'My mum loves retro dresses from the seventies.' },
          { en: 'colourful', uk: 'барвистий', ru: 'красочный, разноцветный', ex: 'The video is very colourful.' },
          { en: 'a record shop', uk: 'магазин платівок', ru: 'магазин пластинок', ex: 'There is a small record shop near the station.' },
          { en: 'an outfit', uk: 'вбрання, образ', ru: 'наряд, образ', ex: 'I love your outfit! Where did you get it?' },
          { en: 'old-school', uk: 'старої школи, класичний', ru: 'старой школы, классический', ex: 'He plays old-school video games.' },
        ],
      },
    ],
    grammar: {
      uk: 'Коли ми щось пропонуємо або запрошуємо друзів, маємо кілька простих конструкцій. Let’s + дієслово без to: Let’s dance! Let’s go to the park. Why don’t we + дієслово: Why don’t we watch a film? How about / What about + дієслово з -ing: How about dancing? What about meeting at six? Shall we + дієслово (звучить трохи ввічливіше): Shall we start? Відповідати можна так: Great idea! Sounds good! Sorry, I can’t. Зверніть увагу: після How about не можна сказати How about dance, потрібно How about dancing.',
      ru: 'Когда мы что-то предлагаем или приглашаем друзей, есть несколько простых конструкций. Let’s + глагол без to: Let’s dance! Let’s go to the park. Why don’t we + глагол: Why don’t we watch a film? How about / What about + глагол с -ing: How about dancing? What about meeting at six? Shall we + глагол (звучит немного вежливее): Shall we start? Отвечать можно так: Great idea! Sounds good! Sorry, I can’t. Обратите внимание: после How about нельзя сказать How about dance, нужно How about dancing.',
      en: 'When we make suggestions or invite friends, there are a few simple patterns. Let’s + verb without to: Let’s dance! Let’s go to the park. Why don’t we + verb: Why don’t we watch a film? How about / What about + verb with -ing: How about dancing? What about meeting at six? Shall we + verb (a little more polite): Shall we start? You can answer: Great idea! Sounds good! Sorry, I can’t. Note: you can’t say How about dance, you need How about dancing.',
    },
    grammarEx: [
      { q: 'Let’s ___ to the new song!', opts: ['dance', 'to dance', 'dancing'], a: 'dance' },
      { q: 'How about ___ a party on Saturday?', opts: ['having', 'have', 'to have'], a: 'having' },
      { q: 'Why don’t we ___ a film tonight?', opts: ['watch', 'watching', 'to watch'], a: 'watch' },
      { q: 'What about ___ pizza for dinner?', opts: ['ordering', 'order', 'ordered'], a: 'ordering' },
      { q: '___ we start the music now?', opts: ['Shall', 'Let’s', 'How about'], a: 'Shall' },
      { q: '___ go to the park after school.', opts: ['Let’s', 'How about', 'Why don’t'], a: 'Let’s' },
      { q: 'Why ___ we invite Anna too?', opts: ['don’t', 'not', 'doesn’t'], a: 'don’t' },
      { q: 'How about ___ the dance together?', opts: ['learning', 'learn', 'learns'], a: 'learning' },
    ],
    gapfill: [
      { q: 'This ___ song makes me want to jump.', a: 'upbeat' },
      { q: 'We had a ___ at the school disco.', a: 'blast' },
      { q: 'A funny cat video always ___ me up.', a: 'cheers' },
      { q: 'My grandma is a lively, ___ person who laughs a lot.', a: 'cheerful' },
      { q: 'Everyone ran to the dance ___.', a: 'floor' },
      { q: 'I love your ___! Is that jacket new?', a: 'outfit' },
      { q: 'My dad listens to ___ music from the eighties.', a: 'retro' },
      { q: 'After a good sleep I am full of ___.', a: 'energy' },
    ],
    listen: [
      { uk: 'Послухай вступ. Які інструменти ти чуєш? Звучання нагадує сучасний поп чи музику з минулого?', ru: 'Послушай вступление. Какие инструменты ты слышишь? Звучание напоминает современный поп или музыку из прошлого?', en: 'Listen to the intro. Which instruments can you hear? Does it sound like modern pop or music from the past?' },
      { uk: 'Порахуй, скільки різних локацій ти бачиш у кліпі.', ru: 'Посчитай, сколько разных локаций ты видишь в клипе.', en: 'Count how many different places you can see in the video.' },
      { uk: 'Знайди в кліпі трьох учасників і опиши їхній одяг кольорами.', ru: 'Найди в клипе троих участников и опиши их одежду цветами.', en: 'Find three members in the video and describe their clothes using colours.' },
      { uk: 'Який момент пісні найбільш енергійний? Покажи його рухом руки, коли почуєш.', ru: 'Какой момент песни самый энергичный? Покажи его движением руки, когда услышишь.', en: 'Which part of the song has the most energy? Raise your hand when you hear it.' },
    ],
    speaking: [
      'What do you do to cheer yourself up on a grey day?',
      'Why do you think Dynamite became popular all over the world?',
      'Do you prefer singing in your own language or in English? Why?',
      'Which decade had the best fashion: the seventies, eighties or now?',
      'Would you like to see BTS in concert? Why or why not?',
      'Can music really change your mood? Give an example.',
    ],
    roleplay: {
      uk: 'A: ти хочеш організувати танцювальну вечірку в стилі ретро для класу. B: твій друг/подруга сумнівається і не дуже любить танцювати. Запропонуй ідеї (музика, одяг, ігри), використовуючи Let’s, Why don’t we, How about + -ing. B відповідає і пропонує свої ідеї.',
      ru: 'A: ты хочешь организовать танцевальную вечеринку в стиле ретро для класса. B: твой друг/подруга сомневается и не очень любит танцевать. Предложи идеи (музыка, одежда, игры), используя Let’s, Why don’t we, How about + -ing. B отвечает и предлагает свои идеи.',
      en: 'A: you want to organise a retro dance party for your class. B: your friend is not sure and doesn’t really like dancing. Suggest ideas (music, clothes, games) using Let’s, Why don’t we and How about + -ing. B answers and suggests their own ideas.',
    },
    writing: {
      uk: 'Напиши запрошення (60-90 слів) на вечірку в стилі диско. Вкажи дату, місце, дрес-код і що там буде. Використай щонайменше три конструкції з пропозиціями: Let’s, Why don’t we, How about + -ing.',
      ru: 'Напиши приглашение (60-90 слов) на вечеринку в стиле диско. Укажи дату, место, дресс-код и что там будет. Используй как минимум три конструкции с предложениями: Let’s, Why don’t we, How about + -ing.',
      en: 'Write an invitation (60-90 words) to a disco party. Include the date, place, dress code and what will happen. Use at least three suggestion patterns: Let’s, Why don’t we, How about + -ing.',
    },
  },

  'a-sky-full-of-stars': {
    facts: [
      { uk: 'Пісня вийшла у 2014 році на альбомі Coldplay «Ghost Stories».', ru: 'Песня вышла в 2014 году на альбоме Coldplay «Ghost Stories».', en: 'The song came out in 2014 on Coldplay’s album Ghost Stories.' },
      { uk: 'Пісню створили разом зі шведським діджеєм і продюсером Авічі. Тому вона звучить танцювальніше, ніж багато інших пісень гурту.', ru: 'Песню создали вместе со шведским диджеем и продюсером Авичи. Поэтому она звучит танцевальнее, чем многие другие песни группы.', en: 'The song was made together with the Swedish DJ and producer Avicii. That is why it sounds more like dance music than many other Coldplay songs.' },
      { uk: 'Кліп зняли на вулиці Кінг-стріт у районі Ньютаун у Сіднеї, Австралія. Фанатів запросили взяти участь через соцмережі.', ru: 'Клип сняли на улице Кинг-стрит в районе Ньютаун в Сиднее, Австралия. Фанатов пригласили принять участие через соцсети.', en: 'The video was filmed on King Street in Newtown, Sydney, Australia. Fans were invited to take part through social media.' },
      { uk: 'Режисер кліпу Мет Вайткросс, який зняв для Coldplay багато відео.', ru: 'Режиссёр клипа Мэт Уайткросс, который снял для Coldplay много видео.', en: 'The video was directed by Mat Whitecross, who has made many videos for Coldplay.' },
      { uk: 'Coldplay утворилися в Лондоні наприкінці 1990-х. Співак гурту Кріс Мартін, і гурт відомий яскравими концертами з кольоровими браслетами для глядачів.', ru: 'Coldplay образовались в Лондоне в конце 1990-х. Певец группы Крис Мартин, и группа известна яркими концертами с цветными браслетами для зрителей.', en: 'Coldplay formed in London in the late 1990s. Their singer is Chris Martin, and the band is famous for colourful concerts with light-up wristbands for the audience.' },
    ],
    warmup: [
      'When did you last look at the stars? Where were you?',
      'Have you ever seen a street musician? What did they play?',
      'Do you know any other songs by Coldplay?',
    ],
    vocab: [
      {
        group: { uk: 'Небо і космос', ru: 'Небо и космос', en: 'The sky and space' },
        items: [
          { en: 'a star', uk: 'зірка', ru: 'звезда', ex: 'You can see more stars in the countryside.' },
          { en: 'starry', uk: 'зоряний', ru: 'звёздный', ex: 'It was a cold, starry night.' },
          { en: 'a shooting star', uk: 'падаюча зірка', ru: 'падающая звезда', ex: 'Make a wish when you see a shooting star.' },
          { en: 'a galaxy', uk: 'галактика', ru: 'галактика', ex: 'Our galaxy is called the Milky Way.' },
          { en: 'to stargaze', uk: 'дивитися на зірки', ru: 'смотреть на звёзды', ex: 'We like to stargaze on summer nights.' },
        ],
      },
      {
        group: { uk: 'Музика на вулиці', ru: 'Музыка на улице', en: 'Music in the street' },
        items: [
          { en: 'a busker', uk: 'вуличний музикант', ru: 'уличный музыкант', ex: 'A busker was playing the violin near the bridge.' },
          { en: 'a one-man band', uk: 'людина-оркестр', ru: 'человек-оркестр', ex: 'The one-man band had a drum on his back.' },
          { en: 'an accordion', uk: 'акордеон', ru: 'аккордеон', ex: 'My grandpa plays the accordion at weddings.' },
          { en: 'confetti', uk: 'конфеті', ru: 'конфетти', ex: 'There was confetti everywhere after the party.' },
          { en: 'to gather', uk: 'збиратися', ru: 'собираться', ex: 'People gathered around the singer.' },
        ],
      },
      {
        group: { uk: 'Почуття і захоплення', ru: 'Чувства и восхищение', en: 'Feelings and admiration' },
        items: [
          { en: 'to admire', uk: 'захоплюватися', ru: 'восхищаться', ex: 'I admire people who help animals.' },
          { en: 'breathtaking', uk: 'захопливий, від якого перехоплює подих', ru: 'захватывающий дух', ex: 'The view from the top was breathtaking.' },
          { en: 'joyful', uk: 'радісний', ru: 'радостный', ex: 'It was a joyful day for the whole family.' },
          { en: 'to glow', uk: 'світитися, сяяти', ru: 'светиться, сиять', ex: 'Her face glowed with happiness.' },
          { en: 'precious', uk: 'дорогоцінний', ru: 'драгоценный', ex: 'Time with friends is precious.' },
        ],
      },
    ],
    grammar: {
      uk: 'Перший умовний (first conditional) говорить про реальну ситуацію в майбутньому і її результат. Формула: If + present simple, will + дієслово. If it is clear tonight, we will see the stars. If you come to the concert, you will love it. Частини можна міняти місцями: We will see the stars if it is clear. Тоді кома не потрібна. Головна помилка: після if не ставимо will. Правильно If it rains, а не If it will rain. Замість will можна вжити can або might: If we are lucky, we might see a shooting star.',
      ru: 'Первое условное (first conditional) говорит о реальной ситуации в будущем и её результате. Формула: If + present simple, will + глагол. If it is clear tonight, we will see the stars. If you come to the concert, you will love it. Части можно менять местами: We will see the stars if it is clear. Тогда запятая не нужна. Главная ошибка: после if не ставим will. Правильно If it rains, а не If it will rain. Вместо will можно использовать can или might: If we are lucky, we might see a shooting star.',
      en: 'The first conditional talks about a real situation in the future and its result. The pattern is If + present simple, will + verb. If it is clear tonight, we will see the stars. If you come to the concert, you will love it. You can swap the parts: We will see the stars if it is clear. Then you don’t need a comma. The main mistake: no will after if. Say If it rains, not If it will rain. Instead of will you can use can or might: If we are lucky, we might see a shooting star.',
    },
    grammarEx: [
      { q: 'If the sky ___ clear, we will see the stars.', opts: ['is', 'will be', 'was'], a: 'is' },
      { q: 'If you come with me, you ___ the concert.', opts: ['will love', 'love', 'loved'], a: 'will love' },
      { q: 'We will go outside if it ___ rain.', opts: ['doesn’t', 'won’t', 'didn’t'], a: 'doesn’t' },
      { q: 'If I ___ a shooting star, I will make a wish.', opts: ['see', 'will see', 'saw'], a: 'see' },
      { q: 'If you play in the street, people ___ around you.', opts: ['will gather', 'gather will', 'gathered'], a: 'will gather' },
      { q: 'If we are lucky, we ___ see the Milky Way.', opts: ['might', 'will to', 'are'], a: 'might' },
      { q: 'She ___ happy if you call her.', opts: ['will be', 'is being', 'be'], a: 'will be' },
      { q: 'If they ___ early, they will get good seats.', opts: ['arrive', 'will arrive', 'arrives'], a: 'arrive' },
    ],
    gapfill: [
      { q: 'Make a wish when you see a shooting ___.', a: 'star' },
      { q: 'A ___ was playing the guitar outside the station.', a: 'busker' },
      { q: 'The view from the mountain was ___.', a: 'breathtaking' },
      { q: 'Hundreds of fans ___ in the street to see the band.', a: 'gathered' },
      { q: 'She was over the ___ when she won the prize.', a: 'moon' },
      { q: 'I really ___ my older brother, he is so brave.', a: 'admire' },
      { q: 'There was colourful ___ all over the floor.', a: 'confetti' },
      { q: 'We like to ___ on warm summer nights.', a: 'stargaze' },
    ],
    listen: [
      { uk: 'Послухай початок. Спершу звучить тихе фортепіано чи одразу танцювальний ритм?', ru: 'Послушай начало. Сначала звучит тихое фортепиано или сразу танцевальный ритм?', en: 'Listen to the beginning. Do you hear a quiet piano first, or a dance beat right away?' },
      { uk: 'Знайди момент, коли вступає швидкий електронний ритм. Як змінюється настрій?', ru: 'Найди момент, когда вступает быстрый электронный ритм. Как меняется настроение?', en: 'Find the moment when the fast electronic beat comes in. How does the mood change?' },
      { uk: 'Подивись кліп. Які інструменти Кріс Мартін несе на собі?', ru: 'Посмотри клип. Какие инструменты Крис Мартин несёт на себе?', en: 'Watch the video. Which instruments is Chris Martin carrying?' },
      { uk: 'Опиши трьома прикметниками людей у натовпі наприкінці кліпу.', ru: 'Опиши тремя прилагательными людей в толпе в конце клипа.', en: 'Describe the people in the crowd at the end of the video with three adjectives.' },
    ],
    speaking: [
      'What will you do if it is a clear, starry night this weekend?',
      'Would you join a crowd following a musician in the street? Why or why not?',
      'Why do people compare someone they love to the stars or the sun?',
      'Do you prefer big stadium concerts or small street shows?',
      'Who do you look up to and why?',
      'What makes Coldplay concerts special, in your opinion?',
    ],
    roleplay: {
      uk: 'A: ти вуличний музикант і хочеш, щоб люди зупинилися послухати. B: перехожий, який поспішає. A вмовляє B залишитися, використовуючи перший умовний: If you stay for one song, you will... B спершу відмовляється, а потім погоджується.',
      ru: 'A: ты уличный музыкант и хочешь, чтобы люди остановились послушать. B: прохожий, который спешит. A уговаривает B остаться, используя первое условное: If you stay for one song, you will... B сначала отказывается, а потом соглашается.',
      en: 'A: you are a street musician and want people to stop and listen. B: you are a passer-by in a hurry. A persuades B to stay using the first conditional: If you stay for one song, you will... B says no at first and then agrees.',
    },
    writing: {
      uk: 'Напиши короткий текст (60-100 слів) «Ніч під зорями». Опиши, де б ти хотів(ла) подивитися на зоряне небо, з ким і що ви будете робити. Використай щонайменше три речення з першим умовним.',
      ru: 'Напиши короткий текст (60-100 слов) «Ночь под звёздами». Опиши, где бы ты хотел(а) посмотреть на звёздное небо, с кем и что вы будете делать. Используй как минимум три предложения с первым условным.',
      en: 'Write a short text (60-100 words) called A night under the stars. Describe where you would like to watch the starry sky, who with and what you will do. Use at least three first conditional sentences.',
    },
  },

  'dont-start-now': {
    facts: [
      { uk: 'Пісня вийшла 31 жовтня 2019 року як перший сингл другого альбому Дуа Ліпи «Future Nostalgia».', ru: 'Песня вышла 31 октября 2019 года как первый сингл второго альбома Дуа Липы «Future Nostalgia».', en: 'The song came out on 31 October 2019 as the first single from Dua Lipa’s second album, Future Nostalgia.' },
      { uk: 'У США пісня піднялася на друге місце чарту Billboard Hot 100.', ru: 'В США песня поднялась на второе место чарта Billboard Hot 100.', en: 'In the USA it reached No. 2 on the Billboard Hot 100.' },
      { uk: 'Пісню номінували на «Греммі» у категоріях «Запис року» та «Найкраще сольне поп-виконання».', ru: 'Песню номинировали на «Грэмми» в категориях «Запись года» и «Лучшее сольное поп-исполнение».', en: 'It was nominated for the Grammys for Record of the Year and Best Pop Solo Performance.' },
      { uk: 'Альбом «Future Nostalgia» отримав «Греммі» як найкращий вокальний поп-альбом.', ru: 'Альбом «Future Nostalgia» получил «Грэмми» как лучший вокальный поп-альбом.', en: 'The album Future Nostalgia won the Grammy for Best Pop Vocal Album.' },
      { uk: 'Дуа Ліпа народилася в Лондоні в сім’ї косоварів. Назва альбому «Future Nostalgia» означає «ностальгія за майбутнім»: сучасна музика зі звучанням диско минулих десятиліть.', ru: 'Дуа Липа родилась в Лондоне в семье косоваров. Название альбома «Future Nostalgia» значит «ностальгия по будущему»: современная музыка со звучанием диско прошлых десятилетий.', en: 'Dua Lipa was born in London to a family from Kosovo. The album name Future Nostalgia means modern music with the disco sound of past decades.' },
    ],
    warmup: [
      'What do you usually do after a bad day?',
      'Is disco music popular with your friends?',
      'Do you think it is easy to start again after a problem?',
    ],
    vocab: [
      {
        group: { uk: 'Стосунки і розставання', ru: 'Отношения и расставание', en: 'Relationships and break-ups' },
        items: [
          { en: 'a break-up', uk: 'розставання', ru: 'расставание', ex: 'After the break-up she spent more time with friends.' },
          { en: 'to break up', uk: 'розійтися, розлучитися (про пару)', ru: 'расстаться (о паре)', ex: 'They broke up after two years.' },
          { en: 'an ex', uk: 'колишній, колишня', ru: 'бывший, бывшая', ex: 'He saw his ex at the cinema.' },
          { en: 'to get over', uk: 'оговтатися, пережити', ru: 'прийти в себя, пережить', ex: 'It takes time to get over a break-up.' },
          { en: 'to bump into', uk: 'випадково зустріти', ru: 'случайно встретить', ex: 'I bumped into my old teacher at the shop.' },
        ],
      },
      {
        group: { uk: 'Новий етап', ru: 'Новый этап', en: 'A new chapter' },
        items: [
          { en: 'a fresh start', uk: 'новий початок', ru: 'новое начало', ex: 'The new year is a fresh start.' },
          { en: 'to bounce back', uk: 'швидко відновитися', ru: 'быстро восстановиться', ex: 'Kids bounce back quickly after a cold.' },
          { en: 'independent', uk: 'незалежний', ru: 'независимый', ex: 'My sister is very independent, she travels alone.' },
          { en: 'a glow-up', uk: 'преображення на краще (розм.)', ru: 'преображение к лучшему (разг.)', ex: 'His glow-up this summer was amazing.' },
          { en: 'to turn the page', uk: 'перегорнути сторінку', ru: 'перевернуть страницу', ex: 'It’s time to turn the page and try again.' },
        ],
      },
      {
        group: { uk: 'Диско і вечірка', ru: 'Диско и вечеринка', en: 'Disco and party' },
        items: [
          { en: 'a disco ball', uk: 'дзеркальна куля', ru: 'зеркальный шар', ex: 'A huge disco ball hung above the stage.' },
          { en: 'a bassline', uk: 'партія бас-гітари', ru: 'партия бас-гитары', ex: 'This song has a really funky bassline.' },
          { en: 'catchy', uk: 'прилипливий', ru: 'прилипчивый', ex: 'The chorus is so catchy.' },
          { en: 'a nightclub', uk: 'нічний клуб', ru: 'ночной клуб', ex: 'Part of the video takes place in a nightclub.' },
          { en: 'to hit the dance floor', uk: 'вийти на танцмайданчик', ru: 'выйти на танцпол', ex: 'When they played our song, we hit the dance floor.' },
        ],
      },
    ],
    grammar: {
      uk: 'Present perfect (have/has + третя форма дієслова) показує, що дія вже відбулася і результат важливий зараз. Три корисні слова: already (вже), just (щойно), yet (ще, вже в питаннях і запереченнях). Already і just ставимо між have і дієсловом: I have already moved on. She has just left. Yet ставимо в кінці речення: Have you finished yet? I haven’t decided yet. Не вживайте present perfect з точним часом у минулому: не I have seen him yesterday, а I saw him yesterday.',
      ru: 'Present perfect (have/has + третья форма глагола) показывает, что действие уже произошло и результат важен сейчас. Три полезных слова: already (уже), just (только что), yet (ещё, уже в вопросах и отрицаниях). Already и just ставим между have и глаголом: I have already moved on. She has just left. Yet ставим в конце предложения: Have you finished yet? I haven’t decided yet. Не используйте present perfect с точным временем в прошлом: не I have seen him yesterday, а I saw him yesterday.',
      en: 'The present perfect (have/has + past participle) shows that an action has happened and the result matters now. Three useful words: already, just and yet. Already and just go between have and the verb: I have already moved on. She has just left. Yet goes at the end of questions and negatives: Have you finished yet? I haven’t decided yet. Don’t use the present perfect with a finished past time: not I have seen him yesterday, but I saw him yesterday.',
    },
    grammarEx: [
      { q: 'I have ___ finished my homework, so I can go out.', opts: ['already', 'yet', 'ago'], a: 'already' },
      { q: 'Have you seen the new video ___?', opts: ['yet', 'already', 'just'], a: 'yet' },
      { q: 'She has ___ left. You missed her by one minute.', opts: ['just', 'yet', 'ever'], a: 'just' },
      { q: 'They ___ broken up. Everyone is talking about it.', opts: ['have', 'has', 'are'], a: 'have' },
      { q: 'He hasn’t called me ___.', opts: ['yet', 'already', 'just'], a: 'yet' },
      { q: 'I ___ my ex at the café yesterday.', opts: ['saw', 'have seen', 'have saw'], a: 'saw' },
      { q: 'We have ___ bought tickets for the concert.', opts: ['already', 'yet', 'still'], a: 'already' },
      { q: 'Has she ___ over him?', opts: ['got', 'get', 'getting'], a: 'got' },
    ],
    gapfill: [
      { q: 'It took her a long time to get ___ the break-up.', a: 'over' },
      { q: 'Moving to a new city was a fresh ___ for our family.', a: 'start' },
      { q: 'Our team lost, but we always ___ back.', a: 'bounce' },
      { q: 'I ___ into my ex at the bus stop. So awkward!', a: 'bumped' },
      { q: 'They ___ up last month, but they are still friends.', a: 'broke' },
      { q: 'This song has a very funky ___.', a: 'bassline' },
      { q: 'She is very ___, she doesn’t need anyone’s help.', a: 'independent' },
      { q: 'When our favourite song came on, we hit the dance ___.', a: 'floor' },
    ],
    listen: [
      { uk: 'Послухай вступ. Який інструмент створює головний ритм пісні?', ru: 'Послушай вступление. Какой инструмент создаёт главный ритм песни?', en: 'Listen to the intro. Which instrument creates the main groove of the song?' },
      { uk: 'Голос співачки звучить сумно чи впевнено? Поясни, чому ти так думаєш.', ru: 'Голос певицы звучит грустно или уверенно? Объясни, почему ты так думаешь.', en: 'Does the singer sound sad or confident? Explain why you think so.' },
      { uk: 'Порахуй, скільки разів у пісні звучить її назва.', ru: 'Посчитай, сколько раз в песне звучит её название.', en: 'Count how many times you hear the title.' },
      { uk: 'Подивись кліп. Опиши трьома словами місце, де танцює Дуа Ліпа.', ru: 'Посмотри клип. Опиши тремя словами место, где танцует Дуа Липа.', en: 'Watch the video. Describe the place where Dua Lipa dances in three words.' },
    ],
    speaking: [
      'What helps people get over a break-up or a lost friendship?',
      'Why do you think so many happy-sounding songs are about sad topics?',
      'Is it a good idea to stay friends with an ex? Why or why not?',
      'What have you already done this year that you are proud of?',
      'Why do you think disco music is popular again?',
      'Have you ever had a fresh start? What happened?',
    ],
    roleplay: {
      uk: 'A: ти щойно перейшов(ла) до нової школи і хочеш почати все з чистого аркуша. B: новий однокласник/однокласниця, який(а) розпитує, як справи. Використовуйте present perfect з already, just, yet: I have just joined the drama club. Have you made any friends yet?',
      ru: 'A: ты только что перешёл(ла) в новую школу и хочешь начать всё с чистого листа. B: новый одноклассник/одноклассница, который(ая) расспрашивает, как дела. Используйте present perfect с already, just, yet: I have just joined the drama club. Have you made any friends yet?',
      en: 'A: you have just moved to a new school and want a fresh start. B: a new classmate who asks how things are going. Use the present perfect with already, just and yet: I have just joined the drama club. Have you made any friends yet?',
    },
    writing: {
      uk: 'Напиши допис для блогу (80-110 слів) «Мій новий старт». Розкажи про момент, коли ти почав(ла) щось заново: нова школа, хобі, команда. Що ти вже зробив(ла), чого ще не встиг(ла)? Використай already, just і yet.',
      ru: 'Напиши пост для блога (80-110 слов) «Мой новый старт». Расскажи о моменте, когда ты начал(а) что-то заново: новая школа, хобби, команда. Что ты уже сделал(а), чего ещё не успел(а)? Используй already, just и yet.',
      en: 'Write a blog post (80-110 words) called My fresh start. Tell about a time you started something again: a new school, hobby or team. What have you already done and what haven’t you done yet? Use already, just and yet.',
    },
  },

  'photograph': {
    facts: [
      { uk: 'Пісня входить до другого альбому Еда Ширана «x» (читається multiply), який вийшов у 2014 році. Окремим синглом вона вийшла у 2015 році.', ru: 'Песня входит во второй альбом Эда Ширана «x» (читается multiply), который вышел в 2014 году. Отдельным синглом она вышла в 2015 году.', en: 'The song is on Ed Sheeran’s second album, x (pronounced multiply), released in 2014. It came out as a single in 2015.' },
      { uk: 'Ед Ширан написав пісню разом із музикантом Джонні Макдейдом.', ru: 'Эд Ширан написал песню вместе с музыкантом Джонни Макдейдом.', en: 'Ed Sheeran wrote the song with musician Johnny McDaid.' },
      { uk: 'Кліп складається зі справжніх домашніх відео з дитинства Еда: як він грає, співає, вчиться грати на гітарі й виступає на сцені.', ru: 'Клип состоит из настоящих домашних видео из детства Эда: как он играет, поёт, учится играть на гитаре и выступает на сцене.', en: 'The video is made of real home videos from Ed’s childhood: playing, singing, learning the guitar and performing on stage.' },
      { uk: 'Ед Ширан народився в 1991 році в Англії і виріс у містечку Фрамлінгем у графстві Саффолк.', ru: 'Эд Ширан родился в 1991 году в Англии и вырос в городке Фрамлингем в графстве Суффолк.', en: 'Ed Sheeran was born in 1991 in England and grew up in the small town of Framlingham in Suffolk.' },
      { uk: 'Ед почав виступати ще підлітком у маленьких клубах і пабах Лондона, часто з однією гітарою і педаллю для запису звуку (лупером).', ru: 'Эд начал выступать ещё подростком в маленьких клубах Лондона, часто с одной гитарой и педалью для записи звука (лупером).', en: 'Ed started performing as a teenager at small venues in London, often with just a guitar and a loop pedal.' },
    ],
    warmup: [
      'Do you prefer photos on your phone or printed photos? Why?',
      'Is there a photo of you as a baby that your family loves?',
      'Who do you miss when they are away?',
    ],
    vocab: [
      {
        group: { uk: 'Фото і спогади', ru: 'Фото и воспоминания', en: 'Photos and memories' },
        items: [
          { en: 'a memory', uk: 'спогад', ru: 'воспоминание', ex: 'My best memory is our trip to the Carpathians.' },
          { en: 'a photo album', uk: 'фотоальбом', ru: 'фотоальбом', ex: 'Grandma keeps an old photo album in the cupboard.' },
          { en: 'a keepsake', uk: 'пам’ятна річ', ru: 'памятная вещь', ex: 'This little shell is a keepsake from the sea.' },
          { en: 'to remind', uk: 'нагадувати', ru: 'напоминать', ex: 'This song reminds me of summer.' },
          { en: 'to look back on', uk: 'згадувати, озиратися на минуле', ru: 'вспоминать, оглядываться на прошлое', ex: 'I look back on that day with a smile.' },
        ],
      },
      {
        group: { uk: 'Дитинство і зростання', ru: 'Детство и взросление', en: 'Childhood and growing up' },
        items: [
          { en: 'childhood', uk: 'дитинство', ru: 'детство', ex: 'He had a happy childhood by the sea.' },
          { en: 'a home video', uk: 'домашнє відео', ru: 'домашнее видео', ex: 'We watched home videos of my first birthday.' },
          { en: 'to grow up', uk: 'дорослішати, вирости', ru: 'взрослеть, вырасти', ex: 'I grew up in a small town.' },
          { en: 'a toddler', uk: 'малюк, що вчиться ходити', ru: 'малыш, который учится ходить', ex: 'The toddler took his first steps today.' },
          { en: 'a gig', uk: 'концерт, виступ (розм.)', ru: 'концерт, выступление (разг.)', ex: 'My brother played his first gig at the school fair.' },
        ],
      },
      {
        group: { uk: 'Відстань і зв’язок', ru: 'Расстояние и связь', en: 'Distance and keeping in touch' },
        items: [
          { en: 'to miss', uk: 'сумувати', ru: 'скучать', ex: 'I miss my cousin who lives in Canada.' },
          { en: 'far away', uk: 'далеко', ru: 'далеко', ex: 'My best friend lives far away now.' },
          { en: 'to stay in touch', uk: 'підтримувати зв’язок', ru: 'поддерживать связь', ex: 'Let’s stay in touch after the summer camp.' },
          { en: 'a video call', uk: 'відеодзвінок', ru: 'видеозвонок', ex: 'We have a video call with Grandpa every Sunday.' },
          { en: 'to reunite', uk: 'знову зустрітися, возз’єднатися', ru: 'снова встретиться, воссоединиться', ex: 'The two friends reunited after ten years.' },
        ],
      },
    ],
    grammar: {
      uk: 'Used to + дієслово показує звичку або стан у минулому, яких зараз уже немає: I used to have long hair. We used to live in Lviv. Питання і заперечення: Did you use to...? I didn’t use to... (тут use без -d). Would + дієслово теж описує повторювані дії в минулому, часто в розповідях: Every summer we would go to the village. Але would не вживаємо для станів: правильно I used to love cartoons, а не I would love cartoons. Ще одна корисна конструкція: remember + -ing, щоб згадати щось із минулого: I remember learning to swim.',
      ru: 'Used to + глагол показывает привычку или состояние в прошлом, которых сейчас уже нет: I used to have long hair. We used to live in Lviv. Вопросы и отрицания: Did you use to...? I didn’t use to... (здесь use без -d). Would + глагол тоже описывает повторяющиеся действия в прошлом, часто в рассказах: Every summer we would go to the village. Но would не используем для состояний: правильно I used to love cartoons, а не I would love cartoons. Ещё одна полезная конструкция: remember + -ing, чтобы вспомнить что-то из прошлого: I remember learning to swim.',
      en: 'Used to + verb shows a habit or state in the past that is not true now: I used to have long hair. We used to live in Lviv. Questions and negatives: Did you use to...? I didn’t use to... (use without -d here). Would + verb also describes repeated past actions, often in stories: Every summer we would go to the village. But we don’t use would for states: I used to love cartoons, not I would love cartoons. Another useful pattern is remember + -ing for memories: I remember learning to swim.',
    },
    grammarEx: [
      { q: 'When I was little, I ___ play with toy cars all day.', opts: ['used to', 'use to', 'using to'], a: 'used to' },
      { q: 'Did you ___ have a pet?', opts: ['use to', 'used to', 'using'], a: 'use to' },
      { q: 'I didn’t ___ like vegetables, but now I do.', opts: ['use to', 'used to', 'uses to'], a: 'use to' },
      { q: 'Every summer we ___ swim in the river.', opts: ['would', 'will', 'are'], a: 'would' },
      { q: 'I remember ___ my first concert.', opts: ['watching', 'watch', 'to watching'], a: 'watching' },
      { q: 'She ___ to have short hair.', opts: ['used', 'use', 'was'], a: 'used' },
      { q: 'I ___ love that cartoon when I was five.', opts: ['used to', 'would', 'was used'], a: 'used to' },
      { q: 'Do you remember ___ to ride a bike?', opts: ['learning', 'learn', 'learned'], a: 'learning' },
    ],
    gapfill: [
      { q: 'This old song brings back ___ of my holidays.', a: 'memories' },
      { q: 'We watched home ___ of my first birthday.', a: 'videos' },
      { q: 'I really ___ my grandma when she is away.', a: 'miss' },
      { q: 'Let’s stay in ___ after you move.', a: 'touch' },
      { q: 'He grew ___ in a small town by the sea.', a: 'up' },
      { q: 'I keep this ticket as a ___.', a: 'keepsake' },
      { q: 'This smell ___ me of my mum’s kitchen.', a: 'reminds' },
      { q: 'The band played their first ___ in a tiny café.', a: 'gig' },
    ],
    listen: [
      { uk: 'Послухай початок. Які інструменти звучать першими? Пісня починається тихо чи гучно?', ru: 'Послушай начало. Какие инструменты звучат первыми? Песня начинается тихо или громко?', en: 'Listen to the beginning. Which instruments come first? Does the song start quietly or loudly?' },
      { uk: 'Подивись кліп. Назви три речі, які робить маленький Ед.', ru: 'Посмотри клип. Назови три вещи, которые делает маленький Эд.', en: 'Watch the video. Name three things little Ed is doing.' },
      { uk: 'Як змінюється Ед протягом кліпу? Опиши словами grow up, older, taller.', ru: 'Как меняется Эд на протяжении клипа? Опиши словами grow up, older, taller.', en: 'How does Ed change during the video? Use grow up, older and taller.' },
      { uk: 'Який настрій у пісні: сумний, теплий, радісний? Вибери одне слово і поясни.', ru: 'Какое настроение у песни: грустное, тёплое, радостное? Выбери одно слово и объясни.', en: 'What is the mood of the song: sad, warm or happy? Choose one word and explain.' },
    ],
    speaking: [
      'What did you use to do when you were six that you don’t do now?',
      'Which photo would you save first if you could keep only one?',
      'Why do you think Ed Sheeran used his own home videos for this song?',
      'Is it easy to stay in touch with friends who live in another country?',
      'Do people take too many photos today? Why or why not?',
      'What is your favourite childhood memory?',
    ],
    roleplay: {
      uk: 'A і B: ви гортаєте старий сімейний фотоальбом. A показує фото і розповідає, що на ньому і як було раніше (used to, would). B ставить питання: Did you use to...? Who is this? Do you remember...?',
      ru: 'A и B: вы листаете старый семейный фотоальбом. A показывает фото и рассказывает, что на нём и как было раньше (used to, would). B задаёт вопросы: Did you use to...? Who is this? Do you remember...?',
      en: 'A and B: you are looking through an old family photo album. A shows a photo and explains what is in it and how things used to be (used to, would). B asks questions: Did you use to...? Who is this? Do you remember...?',
    },
    writing: {
      uk: 'Вибери одне своє дитяче фото й опиши його (70-100 слів). Де ти, хто поруч, що ти тоді любив(ла) робити? Використай used to, would і remember + -ing.',
      ru: 'Выбери одну свою детскую фотографию и опиши её (70-100 слов). Где ты, кто рядом, что ты тогда любил(а) делать? Используй used to, would и remember + -ing.',
      en: 'Choose one photo of yourself as a child and describe it (70-100 words). Where are you, who is with you, what did you love doing then? Use used to, would and remember + -ing.',
    },
  },

  'you-belong-with-me': {
    facts: [
      { uk: 'Пісня входить до другого альбому Тейлор Свіфт «Fearless» (2008). Синглом вона вийшла у 2009 році.', ru: 'Песня входит во второй альбом Тейлор Свифт «Fearless» (2008). Синглом она вышла в 2009 году.', en: 'The song is on Taylor Swift’s second album, Fearless (2008). It was released as a single in 2009.' },
      { uk: 'Тейлор написала пісню разом із авторкою пісень Ліз Роуз.', ru: 'Тейлор написала песню вместе с автором песен Лиз Роуз.', en: 'Taylor wrote the song with songwriter Liz Rose.' },
      { uk: 'У США пісня піднялася на друге місце чарту Billboard Hot 100.', ru: 'В США песня поднялась на второе место чарта Billboard Hot 100.', en: 'In the USA it reached No. 2 on the Billboard Hot 100.' },
      { uk: 'Кліп отримав нагороду MTV Video Music Awards 2009 як найкраще жіноче відео. У ньому Тейлор грає дві ролі: скромну сусідку в окулярах і популярну дівчину.', ru: 'Клип получил награду MTV Video Music Awards 2009 как лучшее женское видео. В нём Тейлор играет две роли: скромную соседку в очках и популярную девушку.', en: 'The video won Best Female Video at the 2009 MTV Video Music Awards. In it Taylor plays two roles: the shy neighbour in glasses and the popular girl.' },
      { uk: 'Альбом «Fearless» отримав «Греммі» як альбом року. У 2021 році Тейлор перезаписала його повністю, і з’явилася версія «You Belong With Me (Taylor’s Version)».', ru: 'Альбом «Fearless» получил «Грэмми» как альбом года. В 2021 году Тейлор перезаписала его полностью, и появилась версия «You Belong With Me (Taylor’s Version)».', en: 'Fearless won the Grammy for Album of the Year. In 2021 Taylor re-recorded the whole album, which included You Belong With Me (Taylor’s Version).' },
    ],
    warmup: [
      'Why are there so many films and songs about school love stories?',
      'Do you think popular people at school are always happy?',
      'Do you know your neighbours? Are any of them your age?',
    ],
    vocab: [
      {
        group: { uk: 'Симпатія і стосунки', ru: 'Симпатия и отношения', en: 'Crushes and relationships' },
        items: [
          { en: 'a crush', uk: 'симпатія, закоханість', ru: 'симпатия, влюблённость', ex: 'She has had a crush on him since sixth grade.' },
          { en: 'to date', uk: 'зустрічатися з кимось', ru: 'встречаться с кем-то', ex: 'They have been dating for a year.' },
          { en: 'jealous', uk: 'ревнивий, заздрісний', ru: 'ревнивый, завистливый', ex: 'He gets jealous when she talks to other boys.' },
          { en: 'to get along', uk: 'ладнати', ru: 'ладить', ex: 'My brother and I get along really well.' },
          { en: 'a soulmate', uk: 'споріднена душа', ru: 'родственная душа', ex: 'My grandparents say they are soulmates.' },
        ],
      },
      {
        group: { uk: 'Шкільне життя', ru: 'Школьная жизнь', en: 'School life' },
        items: [
          { en: 'popular', uk: 'популярний', ru: 'популярный', ex: 'She is the most popular girl in our year.' },
          { en: 'a cheerleader', uk: 'чирлідерка', ru: 'чирлидерша', ex: 'The cheerleaders danced at half-time.' },
          { en: 'the school prom', uk: 'випускний бал', ru: 'выпускной бал', ex: 'Who are you going to the school prom with?' },
          { en: 'a nerd', uk: 'ботанік (розм.)', ru: 'ботаник (разг.)', ex: 'He calls himself a nerd because he loves science.' },
          { en: 'to fit in', uk: 'вписатися, бути своїм', ru: 'вписаться, быть своим', ex: 'At first I didn’t fit in at my new school.' },
        ],
      },
      {
        group: { uk: 'Сусіди і характер', ru: 'Соседи и характер', en: 'Neighbours and personality' },
        items: [
          { en: 'next door', uk: 'по сусідству', ru: 'по соседству', ex: 'A new family moved in next door.' },
          { en: 'down-to-earth', uk: 'простий, приземлений', ru: 'простой, приземлённый', ex: 'Even after becoming famous, she is very down-to-earth.' },
          { en: 'shy', uk: 'сором’язливий', ru: 'застенчивый', ex: 'He is too shy to sing in front of the class.' },
          { en: 'loyal', uk: 'вірний, відданий', ru: 'верный, преданный', ex: 'A loyal friend will always help you.' },
          { en: 'to understand', uk: 'розуміти', ru: 'понимать', ex: 'Nobody understands me like my best friend.' },
        ],
      },
    ],
    grammar: {
      uk: 'Порівнюємо людей і речі. Короткі прикметники отримують -er: tall, taller; funny, funnier; big, bigger. Довгі прикметники отримують more: popular, more popular; beautiful, more beautiful. Після порівняльного ступеня вживаємо than: She is more popular than me. He is funnier than his brother. Щоб сказати, що щось однакове: as + прикметник + as: My jokes are as good as yours. Щоб сказати, що щось менше: not as + прикметник + as: I am not as loud as my sister. Неправильні форми: good, better; bad, worse.',
      ru: 'Сравниваем людей и вещи. Короткие прилагательные получают -er: tall, taller; funny, funnier; big, bigger. Длинные прилагательные получают more: popular, more popular; beautiful, more beautiful. После сравнительной степени используем than: She is more popular than me. He is funnier than his brother. Чтобы сказать, что что-то одинаковое: as + прилагательное + as: My jokes are as good as yours. Чтобы сказать, что что-то меньше: not as + прилагательное + as: I am not as loud as my sister. Неправильные формы: good, better; bad, worse.',
      en: 'We compare people and things. Short adjectives add -er: tall, taller; funny, funnier; big, bigger. Long adjectives use more: popular, more popular; beautiful, more beautiful. After a comparative we use than: She is more popular than me. He is funnier than his brother. To say things are equal, use as + adjective + as: My jokes are as good as yours. To say less, use not as + adjective + as: I am not as loud as my sister. Irregular forms: good, better; bad, worse.',
    },
    grammarEx: [
      { q: 'She is ___ than her sister.', opts: ['more popular', 'popularer', 'most popular'], a: 'more popular' },
      { q: 'He is ___ than me at maths.', opts: ['better', 'gooder', 'more good'], a: 'better' },
      { q: 'My jokes are ___ funny as yours.', opts: ['as', 'than', 'so'], a: 'as' },
      { q: 'I’m not as loud ___ my brother.', opts: ['as', 'than', 'like'], a: 'as' },
      { q: 'This film is ___ than the book.', opts: ['worse', 'badder', 'more bad'], a: 'worse' },
      { q: 'The new girl is ___ than everyone thinks.', opts: ['funnier', 'more funny', 'funnyer'], a: 'funnier' },
      { q: 'Your house is ___ than ours.', opts: ['bigger', 'biger', 'more big'], a: 'bigger' },
      { q: 'He is more relaxed ___ me.', opts: ['than', 'as', 'that'], a: 'than' },
    ],
    gapfill: [
      { q: 'Everyone knows Tom has a ___ on Lily.', a: 'crush' },
      { q: 'A new family moved in next ___.', a: 'door' },
      { q: 'She is too ___ to speak in front of the class.', a: 'shy' },
      { q: 'We are not dating, we are just ___.', a: 'friends' },
      { q: 'It was hard to fit ___ at my new school.', a: 'in' },
      { q: 'My best friend is very ___, she never tells my secrets.', a: 'loyal' },
      { q: 'He gets ___ when his girlfriend talks to other boys.', a: 'jealous' },
      { q: 'Are you going to the school ___ in June?', a: 'prom' },
    ],
    listen: [
      { uk: 'Послухай початок. Який інструмент звучить першим? Пісня більше схожа на поп чи на кантрі?', ru: 'Послушай начало. Какой инструмент звучит первым? Песня больше похожа на поп или на кантри?', en: 'Listen to the beginning. Which instrument plays first? Does it sound more like pop or country?' },
      { uk: 'Подивись кліп. Як героїня спілкується з хлопцем через вікно?', ru: 'Посмотри клип. Как героиня общается с парнем через окно?', en: 'Watch the video. How does the girl talk to the boy through the window?' },
      { uk: 'Порівняй двох героїнь, яких грає Тейлор. Опиши кожну трьома прикметниками.', ru: 'Сравни двух героинь, которых играет Тейлор. Опиши каждую тремя прилагательными.', en: 'Compare the two girls Taylor plays. Describe each one with three adjectives.' },
      { uk: 'Що відбувається на випускному балу наприкінці кліпу?', ru: 'Что происходит на выпускном балу в конце клипа?', en: 'What happens at the prom at the end of the video?' },
    ],
    speaking: [
      'Is it better to be popular or to have a few close friends? Why?',
      'Why do you think Taylor chose to play both girls in the video?',
      'Can a boy and a girl be best friends without dating?',
      'What makes someone a good neighbour?',
      'Compare yourself to a friend or a sibling: who is funnier, louder, calmer?',
      'Why do you think teens still love this song many years later?',
    ],
    roleplay: {
      uk: 'A: ти сценарист(ка) і пропонуєш новий фільм для підлітків про двох сусідів. B: продюсер, який ставить питання. Описуйте персонажів, порівнюючи їх: She is shyer than..., He is not as popular as... Домовтеся, чим закінчиться фільм.',
      ru: 'A: ты сценарист(ка) и предлагаешь новый фильм для подростков о двух соседях. B: продюсер, который задаёт вопросы. Описывайте персонажей, сравнивая их: She is shyer than..., He is not as popular as... Договоритесь, чем закончится фильм.',
      en: 'A: you are a screenwriter pitching a new teen film about two neighbours. B: a producer who asks questions. Describe the characters by comparing them: She is shyer than..., He is not as popular as... Agree on how the film ends.',
    },
    writing: {
      uk: 'Напиши короткий сюжет фільму для підлітків (80-110 слів) про двох друзів, які живуть по сусідству. Опиши героїв, використовуючи щонайменше чотири порівняння (-er, more, as...as, not as...as).',
      ru: 'Напиши короткий сюжет фильма для подростков (80-110 слов) о двух друзьях, которые живут по соседству. Опиши героев, используя как минимум четыре сравнения (-er, more, as...as, not as...as).',
      en: 'Write a short plot for a teen film (80-110 words) about two friends who live next door to each other. Describe the characters using at least four comparisons (-er, more, as...as, not as...as).',
    },
  },

  'unstoppable': {
    facts: [
      { uk: 'Пісня входить до альбому Сії «This Is Acting», який вийшов у 2016 році.', ru: 'Песня входит в альбом Сии «This Is Acting», который вышел в 2016 году.', en: 'The song is on Sia’s album This Is Acting, released in 2016.' },
      { uk: 'Пісню написали Сія і Крістофер Брейд.', ru: 'Песню написали Сия и Кристофер Брейд.', en: 'The song was written by Sia and Christopher Braide.' },
      { uk: 'Через кілька років після виходу пісня знову стала популярною завдяки TikTok і рекламі, тож у 2022 році її випустили на радіо в США як офіційний сингл.', ru: 'Через несколько лет после выхода песня снова стала популярной благодаря TikTok и рекламе, поэтому в 2022 году её выпустили на радио в США как официальный сингл.', en: 'A few years after its release, the song became popular again thanks to TikTok and adverts, so in 2022 it was sent to US radio as an official single.' },
      { uk: 'Наприкінці 2023 року пісня набрала понад мільярд прослуховувань на Spotify.', ru: 'В конце 2023 года песня набрала больше миллиарда прослушиваний на Spotify.', en: 'By the end of 2023 the song had more than one billion streams on Spotify.' },
      { uk: 'Сія з Австралії. Вона відома тим, що часто виступає в перуці, яка закриває їй обличчя, а також пише хіти для інших зірок.', ru: 'Сия из Австралии. Она известна тем, что часто выступает в парике, который закрывает ей лицо, а ещё пишет хиты для других звёзд.', en: 'Sia is from Australia. She is known for often performing in a wig that hides her face, and for writing hits for other stars.' },
    ],
    warmup: [
      'What song do you listen to when you need energy?',
      'Do you get nervous before tests or competitions? What do you do?',
      'Who is the most confident person you know?',
    ],
    vocab: [
      {
        group: { uk: 'Сила і впевненість', ru: 'Сила и уверенность', en: 'Strength and confidence' },
        items: [
          { en: 'confident', uk: 'впевнений', ru: 'уверенный', ex: 'She looks confident on stage.' },
          { en: 'powerful', uk: 'потужний, сильний', ru: 'мощный, сильный', ex: 'He has a powerful voice.' },
          { en: 'determined', uk: 'рішучий, цілеспрямований', ru: 'решительный, целеустремлённый', ex: 'She is determined to win the race.' },
          { en: 'fearless', uk: 'безстрашний', ru: 'бесстрашный', ex: 'The little girl was fearless on the climbing wall.' },
          { en: 'an anthem', uk: 'гімн, головна пісня', ru: 'гимн, главная песня', ex: 'This song is the anthem of our football team.' },
        ],
      },
      {
        group: { uk: 'Виклики і труднощі', ru: 'Вызовы и трудности', en: 'Challenges and difficulties' },
        items: [
          { en: 'a challenge', uk: 'виклик, складне завдання', ru: 'вызов, трудная задача', ex: 'Learning a new language is a big challenge.' },
          { en: 'to struggle', uk: 'боротися, мати труднощі', ru: 'бороться, испытывать трудности', ex: 'I struggled with maths last year.' },
          { en: 'to push through', uk: 'витримати, не здатися', ru: 'выдержать, не сдаться', ex: 'I was tired, but I pushed through.' },
          { en: 'to give up', uk: 'здаватися', ru: 'сдаваться', ex: 'Don’t give up, you’re almost there!' },
          { en: 'pressure', uk: 'тиск', ru: 'давление', ex: 'There is a lot of pressure before exams.' },
        ],
      },
      {
        group: { uk: 'Показати і приховати', ru: 'Показать и скрыть', en: 'Showing and hiding' },
        items: [
          { en: 'to hide', uk: 'ховати', ru: 'прятать', ex: 'He hides his feelings behind jokes.' },
          { en: 'to pretend', uk: 'вдавати, прикидатися', ru: 'притворяться', ex: 'She pretended she wasn’t scared.' },
          { en: 'a mask', uk: 'маска', ru: 'маска', ex: 'Sometimes a smile is just a mask.' },
          { en: 'a wig', uk: 'перука', ru: 'парик', ex: 'The actor wore a long blonde wig.' },
          { en: 'deep down', uk: 'глибоко в душі', ru: 'в глубине души', ex: 'Deep down, he was very worried.' },
        ],
      },
    ],
    grammar: {
      uk: 'Can і can’t говорять про вміння і можливість зараз: I can swim. Nobody can stop me. Після can дієслово без to: can run, а не can to run. Be able to вживаємо там, де can не працює: у майбутньому (I will be able to drive next year), після інших дієслів (I want to be able to speak English) і в present perfect (I haven’t been able to sleep). У минулому: could або was/were able to. А ще слова nothing, nobody, anything, anybody: у реченні без not кажемо Nothing can stop me, а з not уживаємо any-: I can’t do anything. Не кажіть I can’t do nothing, бо в англійській лише одне заперечення.',
      ru: 'Can и can’t говорят об умении и возможности сейчас: I can swim. Nobody can stop me. После can глагол без to: can run, а не can to run. Be able to используем там, где can не работает: в будущем (I will be able to drive next year), после других глаголов (I want to be able to speak English) и в present perfect (I haven’t been able to sleep). В прошлом: could или was/were able to. А ещё слова nothing, nobody, anything, anybody: в предложении без not говорим Nothing can stop me, а с not используем any-: I can’t do anything. Не говорите I can’t do nothing, потому что в английском только одно отрицание.',
      en: 'Can and can’t talk about ability and possibility now: I can swim. Nobody can stop me. After can use the verb without to: can run, not can to run. Use be able to where can doesn’t work: in the future (I will be able to drive next year), after other verbs (I want to be able to speak English) and in the present perfect (I haven’t been able to sleep). In the past use could or was/were able to. Also nothing, nobody, anything and anybody: without not we say Nothing can stop me, and with not we use any-: I can’t do anything. Don’t say I can’t do nothing, because English uses only one negative.',
    },
    grammarEx: [
      { q: 'Nobody ___ stop me now.', opts: ['can', 'can to', 'cans'], a: 'can' },
      { q: 'Next year I will ___ drive a car.', opts: ['be able to', 'can', 'able'], a: 'be able to' },
      { q: 'I can’t see ___ in the dark.', opts: ['anything', 'nothing', 'something'], a: 'anything' },
      { q: '___ can make me give up.', opts: ['Nothing', 'Anything', 'Not anything'], a: 'Nothing' },
      { q: 'When I was five, I ___ ride a bike.', opts: ['could', 'can', 'am able'], a: 'could' },
      { q: 'I want to ___ sing like Sia.', opts: ['be able to', 'can', 'could'], a: 'be able to' },
      { q: 'She ___ run very fast.', opts: ['can', 'can to', 'is can'], a: 'can' },
      { q: 'There isn’t ___ in the room.', opts: ['anybody', 'nobody', 'somebody'], a: 'anybody' },
    ],
    gapfill: [
      { q: 'Don’t give ___! You can do it.', a: 'up' },
      { q: 'She was scared, but she put on a brave ___.', a: 'face' },
      { q: 'If you believe in ___, you can do amazing things.', a: 'yourself' },
      { q: 'The last lap was hard, but I pushed ___.', a: 'through' },
      { q: 'He feels ___ when he speaks in front of people.', a: 'confident' },
      { q: 'Learning to play the piano is a big ___.', a: 'challenge' },
      { q: 'Deep ___, she was very nervous.', a: 'down' },
      { q: 'This song is the ___ of our school team.', a: 'anthem' },
    ],
    listen: [
      { uk: 'Послухай початок. Голос звучить тихо чи одразу сильно?', ru: 'Послушай начало. Голос звучит тихо или сразу сильно?', en: 'Listen to the beginning. Is the voice soft or strong from the start?' },
      { uk: 'Знайди момент, коли пісня стає найпотужнішою. Які інструменти там звучать?', ru: 'Найди момент, когда песня становится самой мощной. Какие инструменты там звучат?', en: 'Find the moment when the song gets most powerful. Which instruments can you hear there?' },
      { uk: 'Порахуй, скільки разів звучить назва пісні.', ru: 'Посчитай, сколько раз звучит название песни.', en: 'Count how many times you hear the title.' },
      { uk: 'Уяви, що ця пісня звучить у рекламі. Що це за реклама: спорт, машини, одяг? Поясни.', ru: 'Представь, что эта песня звучит в рекламе. Что это за реклама: спорт, машины, одежда? Объясни.', en: 'Imagine this song in an advert. What is the advert for: sport, cars, clothes? Explain.' },
    ],
    speaking: [
      'What can you do now that you couldn’t do two years ago?',
      'What would you like to be able to do in five years?',
      'Is it OK to pretend to be confident when you are not? Why or why not?',
      'Why do you think this song became popular again on TikTok?',
      'What is the biggest challenge you have pushed through?',
      'Why do you think Sia often hides her face?',
    ],
    roleplay: {
      uk: 'A: ти тренер(ка), а B: спортсмен(ка), який(а) хвилюється перед фіналом. A підбадьорює B, використовуючи can, be able to і nothing/nobody: Nothing can stop you. You will be able to... B розповідає про свої страхи, а потім погоджується спробувати.',
      ru: 'A: ты тренер, а B: спортсмен(ка), который(ая) волнуется перед финалом. A подбадривает B, используя can, be able to и nothing/nobody: Nothing can stop you. You will be able to... B рассказывает о своих страхах, а потом соглашается попробовать.',
      en: 'A: you are a coach and B is an athlete who is nervous before the final. A encourages B using can, be able to and nothing/nobody: Nothing can stop you. You will be able to... B talks about their fears and then agrees to try.',
    },
    writing: {
      uk: 'Напиши мотиваційний лист самому собі перед важливою подією (70-100 слів): іспит, змагання, виступ. Використай can, could, be able to і хоча б одне речення з nothing або nobody.',
      ru: 'Напиши мотивационное письмо самому себе перед важным событием (70-100 слов): экзамен, соревнование, выступление. Используй can, could, be able to и хотя бы одно предложение с nothing или nobody.',
      en: 'Write a motivational letter to yourself before an important event (70-100 words): an exam, a competition or a performance. Use can, could, be able to and at least one sentence with nothing or nobody.',
    },
  },

  'lose-you-to-love-me': {
    facts: [
      { uk: 'Пісня вийшла 23 жовтня 2019 року і згодом увійшла до альбому Селени Гомес «Rare» (2020).', ru: 'Песня вышла 23 октября 2019 года и позже вошла в альбом Селены Гомес «Rare» (2020).', en: 'The song came out on 23 October 2019 and later appeared on Selena Gomez’s album Rare (2020).' },
      { uk: 'Це перша пісня Селени Гомес, яка очолила чарт Billboard Hot 100.', ru: 'Это первая песня Селены Гомес, которая возглавила чарт Billboard Hot 100.', en: 'It was Selena Gomez’s first song to reach No. 1 on the Billboard Hot 100.' },
      { uk: 'Селена написала пісню разом з відомими авторами пісень Джулією Майклз і Джастіном Трантером.', ru: 'Селена написала песню вместе с известными авторами песен Джулией Майклз и Джастином Трантером.', en: 'Selena wrote the song with well-known songwriters Julia Michaels and Justin Tranter.' },
      { uk: 'Кліп повністю чорно-білий: у ньому немає сюжету, лише крупні плани співачки.', ru: 'Клип полностью чёрно-белый: в нём нет сюжета, только крупные планы певицы.', en: 'The video is completely black and white: there is no story, just close-ups of the singer.' },
      { uk: 'Селена Гомес почала кар’єру акторкою на каналі Disney, у серіалі «Чарівники з Вейверлі Плейс». Пізніше вона заснувала косметичний бренд Rare Beauty.', ru: 'Селена Гомес начала карьеру актрисой на канале Disney, в сериале «Волшебники из Вэйверли Плэйс». Позже она основала косметический бренд Rare Beauty.', en: 'Selena Gomez started her career as an actress on the Disney Channel in Wizards of Waverly Place. Later she founded the beauty brand Rare Beauty.' },
    ],
    warmup: [
      'What does it mean to love yourself?',
      'Do you prefer happy songs or quiet, emotional songs?',
      'Have you ever stopped being friends with someone? How did you feel?',
    ],
    vocab: [
      {
        group: { uk: 'Почуття після розставання', ru: 'Чувства после расставания', en: 'Feelings after a break-up' },
        items: [
          { en: 'hurt', uk: 'ображений, якому боляче', ru: 'обиженный, которому больно', ex: 'She felt hurt when he forgot her birthday.' },
          { en: 'to heal', uk: 'загоюватися, зцілюватися', ru: 'заживать, исцеляться', ex: 'It takes time for a broken heart to heal.' },
          { en: 'to let go', uk: 'відпустити', ru: 'отпустить', ex: 'Sometimes you have to let go of the past.' },
          { en: 'closure', uk: 'відчуття завершеності', ru: 'ощущение завершённости', ex: 'Talking to him one last time gave her closure.' },
          { en: 'to regret', uk: 'шкодувати', ru: 'сожалеть', ex: 'I don’t regret anything.' },
        ],
      },
      {
        group: { uk: 'Турбота про себе', ru: 'Забота о себе', en: 'Looking after yourself' },
        items: [
          { en: 'self-love', uk: 'любов до себе', ru: 'любовь к себе', ex: 'Self-love is not selfish.' },
          { en: 'self-respect', uk: 'самоповага', ru: 'самоуважение', ex: 'Saying no shows self-respect.' },
          { en: 'to put yourself first', uk: 'ставити себе на перше місце', ru: 'ставить себя на первое место', ex: 'This year I want to put myself first.' },
          { en: 'a boundary', uk: 'межа, особистий кордон', ru: 'граница, личная граница', ex: 'It’s important to set clear boundaries.' },
          { en: 'to take care of', uk: 'дбати про', ru: 'заботиться о', ex: 'Take care of yourself when you are tired.' },
        ],
      },
      {
        group: { uk: 'Зростання і зміни', ru: 'Рост и перемены', en: 'Growth and change' },
        items: [
          { en: 'to grow', uk: 'зростати, розвиватися', ru: 'расти, развиваться', ex: 'I have grown a lot this year.' },
          { en: 'stronger', uk: 'сильніший', ru: 'сильнее', ex: 'She came back stronger after the injury.' },
          { en: 'a lesson', uk: 'урок (з життя)', ru: 'урок (из жизни)', ex: 'That mistake taught me an important lesson.' },
          { en: 'to realise', uk: 'усвідомити', ru: 'осознать', ex: 'I realised that I needed a break.' },
          { en: 'honest', uk: 'чесний, щирий', ru: 'честный, искренний', ex: 'Thank you for your honest answer.' },
        ],
      },
    ],
    grammar: {
      uk: 'Зворотні займенники показують, що людина робить щось сама собі: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves. I looked at myself in the mirror. Love yourself. They taught themselves to play the guitar. By + зворотний займенник означає «сам, без допомоги»: I did it by myself. Не вживайте зворотний займенник після дієслів, які в українській мові мають -ся, але в англійській його не потребують: правильно I feel tired, I relax, I wash in the morning, а не I feel myself tired. Порівняйте: They love themselves (кожен себе) і They love each other (один одного).',
      ru: 'Возвратные местоимения показывают, что человек делает что-то сам себе: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves. I looked at myself in the mirror. Love yourself. They taught themselves to play the guitar. By + возвратное местоимение значит «сам, без помощи»: I did it by myself. Не используйте возвратное местоимение после глаголов, которые в русском языке имеют -ся, но в английском его не требуют: правильно I feel tired, I relax, I wash in the morning, а не I feel myself tired. Сравните: They love themselves (каждый себя) и They love each other (друг друга).',
      en: 'Reflexive pronouns show that a person does something to themselves: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves. I looked at myself in the mirror. Love yourself. They taught themselves to play the guitar. By + reflexive pronoun means alone, without help: I did it by myself. Don’t add a reflexive pronoun where English doesn’t need one: say I feel tired, I relax, I wash in the morning, not I feel myself tired. Compare: They love themselves (each loves himself or herself) and They love each other.',
    },
    grammarEx: [
      { q: 'I made this cake by ___.', opts: ['myself', 'me', 'my'], a: 'myself' },
      { q: 'She taught ___ to play the piano.', opts: ['herself', 'himself', 'her'], a: 'herself' },
      { q: 'We enjoyed ___ at the party.', opts: ['ourselves', 'ourself', 'us'], a: 'ourselves' },
      { q: 'Take care of ___, Tom!', opts: ['yourself', 'yourselves', 'you'], a: 'yourself' },
      { q: 'They looked at ___ in the mirror.', opts: ['themselves', 'theirselves', 'them'], a: 'themselves' },
      { q: 'After a long day I like to ___.', opts: ['relax', 'relax myself', 'relax me'], a: 'relax' },
      { q: 'The two friends hugged ___.', opts: ['each other', 'themselves', 'theirself'], a: 'each other' },
      { q: 'He hurt ___ when he fell off his bike.', opts: ['himself', 'hisself', 'him'], a: 'himself' },
    ],
    gapfill: [
      { q: 'Sometimes you have to let ___ of the past.', a: 'go' },
      { q: 'It takes time for a broken heart to ___.', a: 'heal' },
      { q: 'This year I want to put ___ first.', a: 'myself' },
      { q: 'She felt ___ when her friend ignored her.', a: 'hurt' },
      { q: 'I learned the ___ way to back up my photos.', a: 'hard' },
      { q: 'Saying no to things you don’t like shows self-___.', a: 'respect' },
      { q: 'After that summer I ___ that I wanted to be a doctor.', a: 'realised' },
      { q: 'She came back ___ after a difficult year.', a: 'stronger' },
    ],
    listen: [
      { uk: 'Послухай початок. Який інструмент супроводжує голос? Чи багато інструментів у пісні?', ru: 'Послушай начало. Какой инструмент сопровождает голос? Много ли инструментов в песне?', en: 'Listen to the beginning. Which instrument plays with the voice? Are there many instruments in the song?' },
      { uk: 'Голос співачки звучить сумно, спокійно чи сильно? Чи змінюється настрій до кінця пісні?', ru: 'Голос певицы звучит грустно, спокойно или сильно? Меняется ли настроение к концу песни?', en: 'Does the singer sound sad, calm or strong? Does the mood change by the end of the song?' },
      { uk: 'Подивись кліп. Чому, на твою думку, він чорно-білий?', ru: 'Посмотри клип. Почему, по-твоему, он чёрно-белый?', en: 'Watch the video. Why do you think it is black and white?' },
      { uk: 'Порахуй, скільки разів звучить назва пісні.', ru: 'Посчитай, сколько раз звучит название песни.', en: 'Count how many times you hear the title.' },
    ],
    speaking: [
      'What are three things you can do to take care of yourself?',
      'Is it selfish to put yourself first? When is it a good idea?',
      'Why do you think so many people connected with this song?',
      'What lesson have you learned the hard way?',
      'Why do some artists choose very simple videos?',
      'How can friends help someone after a difficult break-up?',
    ],
    roleplay: {
      uk: 'A: твій друг/подруга B засмучений(а) після сварки з найкращим другом. A вислуховує і дає поради: Take care of yourself. Don’t blame yourself. B розповідає, що сталося, і разом ви шукаєте, як рухатися далі. Використайте щонайменше чотири зворотні займенники.',
      ru: 'A: твой друг/подруга B расстроен(а) после ссоры с лучшим другом. A выслушивает и даёт советы: Take care of yourself. Don’t blame yourself. B рассказывает, что случилось, и вместе вы ищете, как двигаться дальше. Используйте как минимум четыре возвратных местоимения.',
      en: 'A: your friend B is upset after a fight with their best friend. A listens and gives advice: Take care of yourself. Don’t blame yourself. B explains what happened, and together you find a way forward. Use at least four reflexive pronouns.',
    },
    writing: {
      uk: 'Напиши лист підтримки самому собі (70-100 слів). Подумай про складний період і про те, чого він тебе навчив. Що ти обіцяєш собі зараз? Використай щонайменше чотири зворотні займенники (myself, yourself тощо).',
      ru: 'Напиши письмо поддержки самому себе (70-100 слов). Подумай о трудном периоде и о том, чему он тебя научил. Что ты обещаешь себе сейчас? Используй как минимум четыре возвратных местоимения (myself, yourself и т.д.).',
      en: 'Write a letter of support to yourself (70-100 words). Think about a difficult time and what it taught you. What do you promise yourself now? Use at least four reflexive pronouns (myself, yourself and so on).',
    },
  },

  'someone-you-loved': {
    facts: [
      { uk: 'Пісня вперше вийшла у 2018 році, а потім увійшла до дебютного альбому Льюїса Капальді «Divinely Uninspired to a Hellish Extent» (2019).', ru: 'Песня впервые вышла в 2018 году, а затем вошла в дебютный альбом Льюиса Капальди «Divinely Uninspired to a Hellish Extent» (2019).', en: 'The song first came out in 2018 and then appeared on Lewis Capaldi’s debut album, Divinely Uninspired to a Hellish Extent (2019).' },
      { uk: 'У Великій Британії пісня кілька тижнів трималася на першому місці, а в листопаді 2019 року очолила і американський чарт Billboard Hot 100.', ru: 'В Великобритании песня несколько недель держалась на первом месте, а в ноябре 2019 года возглавила и американский чарт Billboard Hot 100.', en: 'It spent several weeks at No. 1 in the UK, and in November 2019 it also topped the US Billboard Hot 100.' },
      { uk: 'Пісня отримала премію BRIT Awards 2020 як пісня року і номінацію на «Греммі» в категорії «Пісня року».', ru: 'Песня получила премию BRIT Awards 2020 как песня года и номинацию на «Грэмми» в категории «Песня года».', en: 'It won Song of the Year at the 2020 BRIT Awards and was nominated for Song of the Year at the Grammys.' },
      { uk: 'Головну роль у кліпі зіграв Пітер Капальді, відомий як Доктор у серіалі «Доктор Хто». Він далекий родич співака.', ru: 'Главную роль в клипе сыграл Питер Капальди, известный как Доктор в сериале «Доктор Кто». Он дальний родственник певца.', en: 'The main role in the video is played by Peter Capaldi, famous as the Doctor in Doctor Who. He is a distant relative of the singer.' },
      { uk: 'Кліп зняли разом із благодійною організацією, яка розповідає людям про донорство органів. Льюїс Капальді родом із Шотландії і відомий своїм гумором у соцмережах.', ru: 'Клип сняли вместе с благотворительной организацией, которая рассказывает людям о донорстве органов. Льюис Капальди родом из Шотландии и известен своим юмором в соцсетях.', en: 'The video was made with a charity that raises awareness of organ donation. Lewis Capaldi is from Scotland and is known for his sense of humour on social media.' },
    ],
    warmup: [
      'Why do people sometimes listen to sad songs when they are sad?',
      'Who do you talk to when you feel down?',
      'Do you know any famous Scottish singers or actors?',
    ],
    vocab: [
      {
        group: { uk: 'Сум і втрата', ru: 'Грусть и потеря', en: 'Sadness and loss' },
        items: [
          { en: 'heartbroken', uk: 'з розбитим серцем', ru: 'с разбитым сердцем', ex: 'He was heartbroken when his dog got lost.' },
          { en: 'lonely', uk: 'самотній', ru: 'одинокий', ex: 'I felt lonely in the new city.' },
          { en: 'to miss', uk: 'сумувати', ru: 'скучать', ex: 'I miss our long summer walks.' },
          { en: 'a loss', uk: 'втрата', ru: 'потеря', ex: 'Losing a pet is a big loss.' },
          { en: 'to grieve', uk: 'сумувати, переживати горе', ru: 'горевать, переживать утрату', ex: 'It is normal to grieve when someone leaves.' },
        ],
      },
      {
        group: { uk: 'Підтримка', ru: 'Поддержка', en: 'Support' },
        items: [
          { en: 'to lean on', uk: 'спиратися на (когось)', ru: 'опираться на (кого-то)', ex: 'You can always lean on me.' },
          { en: 'to comfort', uk: 'втішати', ru: 'утешать', ex: 'Mum comforted me after the match.' },
          { en: 'to get through', uk: 'пережити', ru: 'пережить', ex: 'We will get through this together.' },
          { en: 'a shoulder to cry on', uk: 'людина, яка підтримає', ru: 'человек, который поддержит', ex: 'My best friend is always a shoulder to cry on.' },
          { en: 'to reach out', uk: 'звернутися, вийти на зв’язок', ru: 'обратиться, выйти на связь', ex: 'If you feel sad, reach out to someone you trust.' },
        ],
      },
      {
        group: { uk: 'Медицина і донорство', ru: 'Медицина и донорство', en: 'Medicine and donation' },
        items: [
          { en: 'a donor', uk: 'донор', ru: 'донор', ex: 'My uncle is a blood donor.' },
          { en: 'to donate', uk: 'жертвувати, бути донором', ru: 'жертвовать, быть донором', ex: 'You can donate blood when you are eighteen.' },
          { en: 'a transplant', uk: 'пересадка (органа)', ru: 'пересадка (органа)', ex: 'The heart transplant saved her life.' },
          { en: 'a charity', uk: 'благодійна організація', ru: 'благотворительная организация', ex: 'Our school raised money for a children’s charity.' },
          { en: 'grateful', uk: 'вдячний', ru: 'благодарный', ex: 'I am so grateful for your help.' },
        ],
      },
    ],
    grammar: {
      uk: 'I wish + past simple говорить про бажання, щоб зараз усе було інакше: I wish you were here (тебе зараз немає). I wish I knew the answer (я не знаю). Після I wish з дієсловом be часто вживають were для всіх осіб: I wish I were taller. Другий умовний (second conditional) описує уявну, нереальну ситуацію в теперішньому чи майбутньому: If + past simple, would + дієслово. If I had a time machine, I would go back to that summer. If she lived closer, we would see each other every day. Після if не ставимо would: не If I would have, а If I had.',
      ru: 'I wish + past simple говорит о желании, чтобы сейчас всё было иначе: I wish you were here (тебя сейчас нет). I wish I knew the answer (я не знаю). После I wish с глаголом be часто используют were для всех лиц: I wish I were taller. Второе условное (second conditional) описывает воображаемую, нереальную ситуацию в настоящем или будущем: If + past simple, would + глагол. If I had a time machine, I would go back to that summer. If she lived closer, we would see each other every day. После if не ставим would: не If I would have, а If I had.',
      en: 'I wish + past simple expresses a wish for the present to be different: I wish you were here (you are not here now). I wish I knew the answer (I don’t know it). After I wish we often use were for all persons: I wish I were taller. The second conditional describes an imaginary, unreal situation in the present or future: If + past simple, would + verb. If I had a time machine, I would go back to that summer. If she lived closer, we would see each other every day. Don’t use would after if: not If I would have, but If I had.',
    },
    grammarEx: [
      { q: 'I wish you ___ here with me.', opts: ['were', 'are', 'will be'], a: 'were' },
      { q: 'If I ___ a time machine, I would visit the past.', opts: ['had', 'have', 'would have'], a: 'had' },
      { q: 'If she lived closer, we ___ meet every day.', opts: ['would', 'will', 'did'], a: 'would' },
      { q: 'I wish I ___ how to fix this.', opts: ['knew', 'know', 'would know'], a: 'knew' },
      { q: 'If I were you, I ___ call him.', opts: ['would', 'will', 'am'], a: 'would' },
      { q: 'I wish it ___ summer now.', opts: ['were', 'is', 'be'], a: 'were' },
      { q: 'What would you do if you ___ famous?', opts: ['were', 'are', 'would be'], a: 'were' },
      { q: 'If we ___ more time, we would travel more.', opts: ['had', 'have', 'would have'], a: 'had' },
    ],
    gapfill: [
      { q: 'She was ___ when her best friend moved to another country.', a: 'heartbroken' },
      { q: 'You can always lean ___ your family.', a: 'on' },
      { q: 'If you feel sad, reach ___ to a friend.', a: 'out' },
      { q: 'A heart ___ can save a person’s life.', a: 'transplant' },
      { q: 'My uncle gives blood, he is a regular ___.', a: 'donor' },
      { q: 'We will get ___ this hard time together.', a: 'through' },
      { q: 'I felt very ___ during my first week at camp.', a: 'lonely' },
      { q: 'I am so ___ for everything you have done for me.', a: 'grateful' },
    ],
    listen: [
      { uk: 'Послухай початок. Який інструмент супроводжує голос? Як ти описав(ла) б голос Льюїса?', ru: 'Послушай начало. Какой инструмент сопровождает голос? Как бы ты описал(а) голос Льюиса?', en: 'Listen to the beginning. Which instrument plays with the voice? How would you describe Lewis’s voice?' },
      { uk: 'Знайди момент, коли голос стає найсильнішим. Яку емоцію він передає?', ru: 'Найди момент, когда голос становится самым сильным. Какую эмоцию он передаёт?', en: 'Find the moment when the voice is strongest. What emotion does it show?' },
      { uk: 'Подивись кліп. Хто головні герої і як вони пов’язані?', ru: 'Посмотри клип. Кто главные герои и как они связаны?', en: 'Watch the video. Who are the main characters and how are they connected?' },
      { uk: 'Як закінчується кліп: сумно, з надією чи радісно? Поясни.', ru: 'Как заканчивается клип: грустно, с надеждой или радостно? Объясни.', en: 'How does the video end: sadly, with hope or happily? Explain.' },
    ],
    speaking: [
      'Why do you think sad songs are so popular?',
      'If you could send a message to someone you miss, what would you say?',
      'Who can you lean on when things are hard?',
      'Why do you think the video tells a story about organ donation and not about a break-up?',
      'What would you do if a friend felt lonely?',
      'Is it easier to talk about feelings or to sing about them? Why?',
    ],
    roleplay: {
      uk: 'A: твій друг/подруга B сумує, бо найкращий друг переїхав в інше місто. A підтримує B і пропонує ідеї, як залишатися на зв’язку. B ділиться почуттями, використовуючи I wish...: I wish he lived closer. A відповідає з другим умовним: If I were you, I would...',
      ru: 'A: твой друг/подруга B грустит, потому что лучший друг переехал в другой город. A поддерживает B и предлагает идеи, как оставаться на связи. B делится чувствами, используя I wish...: I wish he lived closer. A отвечает со вторым условным: If I were you, I would...',
      en: 'A: your friend B is sad because their best friend has moved to another city. A supports B and suggests ways to stay in touch. B shares feelings using I wish...: I wish he lived closer. A answers with the second conditional: If I were you, I would...',
    },
    writing: {
      uk: 'Напиши лист (70-100 слів) людині, за якою ти сумуєш: другу, родичу чи вчителю, який далеко. Розкажи, чого тобі бракує, і що б ви робили, якби були разом. Використай I wish і щонайменше два речення з другим умовним.',
      ru: 'Напиши письмо (70-100 слов) человеку, по которому ты скучаешь: другу, родственнику или учителю, который далеко. Расскажи, чего тебе не хватает и что бы вы делали, если бы были вместе. Используй I wish и как минимум два предложения со вторым условным.',
      en: 'Write a letter (70-100 words) to someone you miss: a friend, relative or teacher who is far away. Say what you miss and what you would do if you were together. Use I wish and at least two second conditional sentences.',
    },
  },
};

export const DEEP_F: Record<string, SongDeep> = {
  'dynamite': {
    intro: {
      uk: 'Це одна з найрадісніших пісень останніх років: вона про енергію, танці й гарний настрій навіть у сірі дні. Тому вона чудово підходить, щоб навчитися англійською говорити про радість, вечірки і про те, як підбадьорити себе та інших. Нижче зібрано живі розмовні вирази, які носії мови щодня вживають про гарний настрій. Усі приклади наші власні.',
      ru: 'Это одна из самых радостных песен последних лет: она об энергии, танцах и хорошем настроении даже в серые дни. Поэтому она отлично подходит, чтобы научиться по-английски говорить о радости, вечеринках и о том, как подбодрить себя и других. Ниже собраны живые разговорные выражения, которые носители языка каждый день используют о хорошем настроении. Все примеры наши собственные.',
      en: 'This is one of the happiest songs of recent years: it is about energy, dancing and a good mood even on grey days. That makes it perfect for learning how to talk in English about joy, parties and cheering yourself and others up. Below are lively everyday expressions native speakers use about feeling good. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to cheer someone up',
        m: { uk: 'підбадьорити, розвеселити когось', ru: 'подбодрить, развеселить кого-то', en: 'make someone feel happier' },
        story: {
          uk: 'Cheer означає радісний вигук, а cheer up буквально «підняти настрій угору». Фразове дієслово дуже поширене в розмові. Ще можна сказати самому собі або другові просто Cheer up! Саме так багато людей описують дію цієї пісні: вона піднімає настрій.',
          ru: 'Cheer значит радостный возглас, а cheer up буквально «поднять настроение вверх». Фразовый глагол очень распространён в разговоре. Можно сказать себе или другу просто Cheer up! Именно так многие описывают действие этой песни: она поднимает настроение.',
          en: 'A cheer is a happy shout, and cheer up literally lifts your mood. This phrasal verb is very common in conversation. You can also simply say Cheer up! to a friend. Many people describe this song exactly like that: it cheers them up.',
        },
        ex: ['My little brother drew me a card to cheer me up.', 'Cheer up! It’s only one bad mark.'],
        similar: ['to lift someone’s spirits', 'to brighten someone’s day'],
        tip: {
          uk: 'Займенник ставимо в середину: cheer me up, cheer her up. Не кажіть cheer up me.',
          ru: 'Местоимение ставим в середину: cheer me up, cheer her up. Не говорите cheer up me.',
          en: 'Put the pronoun in the middle: cheer me up, cheer her up. Don’t say cheer up me.',
        },
      },
      {
        en: 'to have a blast',
        m: { uk: 'чудово розважитися', ru: 'отлично повеселиться', en: 'have a really great time' },
        story: {
          uk: 'Blast буквально означає «вибух». У розмовній мові have a blast означає провести час так весело, ніби від радості аж «вибухаєш». Так кажуть про вечірки, концерти, поїздки. Вираз дуже неформальний і позитивний.',
          ru: 'Blast буквально значит «взрыв». В разговорной речи have a blast значит провести время так весело, будто от радости «взрываешься». Так говорят о вечеринках, концертах, поездках. Выражение очень неформальное и позитивное.',
          en: 'A blast is literally an explosion. In informal English have a blast means to have so much fun that you almost explode with joy. People say it about parties, concerts and trips. It is very informal and positive.',
        },
        ex: ['We had a blast at the water park.', 'Have a blast at the concert tonight!'],
        similar: ['to have the time of your life', 'to have a great time'],
        tip: {
          uk: 'Вживаємо з артиклем a: have a blast. Без артикля фраза звучить неправильно.',
          ru: 'Используем с артиклем a: have a blast. Без артикля фраза звучит неправильно.',
          en: 'Use the article a: have a blast. Without it the phrase sounds wrong.',
        },
      },
      {
        en: 'to be on cloud nine',
        m: { uk: 'бути на сьомому небі', ru: 'быть на седьмом небе', en: 'be extremely happy' },
        story: {
          uk: 'В англійській щасливі люди сидять не на сьомій, а на дев’ятій хмарі. Точне походження виразу невідоме, але він дуже популярний у розмові. Так кажуть про радість після гарної новини, перемоги чи подарунка.',
          ru: 'В английском счастливые люди сидят не на седьмом небе, а на девятом облаке. Точное происхождение выражения неизвестно, но оно очень популярно в разговоре. Так говорят о радости после хорошей новости, победы или подарка.',
          en: 'In English happy people sit on the ninth cloud. Nobody knows exactly where the phrase comes from, but it is very common in conversation. People use it about joy after good news, a win or a present.',
        },
        ex: ['She was on cloud nine after she passed her driving test.', 'When our team won, we were all on cloud nine.'],
        similar: ['to be over the moon', 'to be on top of the world'],
        tip: {
          uk: 'Не перекладайте дослівно «на сьомому небі». Англійською кажуть cloud nine.',
          ru: 'Не переводите дословно «на седьмом небе». По-английски говорят cloud nine.',
          en: 'Don’t translate the Ukrainian idea of the seventh heaven word for word. In English it is cloud nine.',
        },
      },
      {
        en: 'to let your hair down',
        m: { uk: 'розслабитися, відпочити від правил', ru: 'расслабиться, отдохнуть от правил', en: 'relax and enjoy yourself' },
        story: {
          uk: 'Колись жінки на людях носили високі зачіски і розпускали волосся лише вдома, коли могли розслабитися. Звідси вираз: let your hair down означає забути про серйозність і просто відпочивати. Його кажуть і про хлопців, і про дівчат.',
          ru: 'Когда-то женщины на людях носили высокие причёски и распускали волосы только дома, когда могли расслабиться. Отсюда выражение: let your hair down значит забыть о серьёзности и просто отдыхать. Его говорят и о парнях, и о девушках.',
          en: 'In the past women wore their hair up in public and let it down only at home, where they could relax. So let your hair down means to stop being serious and just have fun. It is used for anyone, boys and girls.',
        },
        ex: ['After the exams, it’s time to let your hair down.', 'Even our strict teacher let her hair down at the school party.'],
        similar: ['to chill out', 'to unwind'],
        tip: {
          uk: 'Змінюйте займенник: let my hair down, let his hair down. Це образний вираз, волосся не обов’язково довге.',
          ru: 'Меняйте местоимение: let my hair down, let his hair down. Это образное выражение, волосы не обязательно длинные.',
          en: 'Change the pronoun: let my hair down, let his hair down. It is figurative, so you don’t need long hair.',
        },
      },
      {
        en: 'to dance like nobody’s watching',
        m: { uk: 'танцювати, не соромлячись', ru: 'танцевать, не стесняясь', en: 'dance freely without worrying what others think' },
        story: {
          uk: 'Цей вираз став популярним завдяки мотиваційним цитатам на листівках і плакатах. Він означає не боятися чужої думки і робити те, що приносить радість. Його часто пишуть під відео з танцями в соцмережах.',
          ru: 'Это выражение стало популярным благодаря мотивационным цитатам на открытках и плакатах. Оно значит не бояться чужого мнения и делать то, что приносит радость. Его часто пишут под видео с танцами в соцсетях.',
          en: 'This phrase became popular through motivational quotes on cards and posters. It means not being afraid of what others think and doing what makes you happy. People often write it under dance videos on social media.',
        },
        ex: ['At my cousin’s wedding, Grandpa danced like nobody was watching.', 'Put on your favourite song and dance like nobody’s watching.'],
        similar: ['to let loose', 'to go for it'],
        tip: {
          uk: 'У минулому часі змінюється і друга частина: danced like nobody was watching.',
          ru: 'В прошедшем времени меняется и вторая часть: danced like nobody was watching.',
          en: 'In the past, change both parts: danced like nobody was watching.',
        },
      },
      {
        en: 'feel-good',
        m: { uk: 'який піднімає настрій', ru: 'поднимающий настроение', en: 'making you feel happy and positive' },
        story: {
          uk: 'Feel-good вживають як прикметник перед іменником: a feel-good song, a feel-good film. Так описують щось легке, позитивне, після чого стає тепло на душі. Це слово часто трапляється в музичних оглядах саме про такі пісні, як ця.',
          ru: 'Feel-good используют как прилагательное перед существительным: a feel-good song, a feel-good film. Так описывают что-то лёгкое, позитивное, после чего становится тепло на душе. Это слово часто встречается в музыкальных обзорах именно о таких песнях, как эта.',
          en: 'Feel-good is used as an adjective before a noun: a feel-good song, a feel-good film. It describes something light and positive that leaves you warm inside. Music reviews often use it about songs like this one.',
        },
        ex: ['We watched a feel-good film about a dog and a boy.', 'This is my favourite feel-good playlist.'],
        similar: ['uplifting', 'heart-warming'],
        tip: {
          uk: 'Пишеться через дефіс і стоїть перед іменником: a feel-good song.',
          ru: 'Пишется через дефис и стоит перед существительным: a feel-good song.',
          en: 'Write it with a hyphen and put it before a noun: a feel-good song.',
        },
      },
      {
        en: 'to be full of beans',
        m: { uk: 'бути сповненим енергії', ru: 'быть полным энергии', en: 'have lots of energy' },
        story: {
          uk: 'Вираз британський і жартівливий. Колись казали, що коні, яких годували бобами, ставали особливо енергійними. Сьогодні так кажуть про дітей, які не можуть всидіти на місці, або про людей у чудовому настрої.',
          ru: 'Выражение британское и шутливое. Когда-то говорили, что лошади, которых кормили бобами, становились особенно энергичными. Сегодня так говорят о детях, которые не могут усидеть на месте, или о людях в отличном настроении.',
          en: 'This is a playful British phrase. People once said that horses fed on beans became very lively. Today it describes children who can’t sit still or people in a great mood.',
        },
        ex: ['The kids were full of beans after the birthday cake.', 'You’re full of beans today! Did you sleep well?'],
        similar: ['to be full of energy', 'to be bouncing off the walls'],
        tip: {
          uk: 'Звучить по-британськи. В американській англійській частіше кажуть full of energy.',
          ru: 'Звучит по-британски. В американском английском чаще говорят full of energy.',
          en: 'It sounds British. Americans more often say full of energy.',
        },
      },
      {
        en: 'to get the party started',
        m: { uk: 'розпочати веселощі, «розкачати» вечірку', ru: 'начать веселье, «раскачать» вечеринку', en: 'make a party begin and become fun' },
        story: {
          uk: 'Так кажуть, коли хтось вмикає музику, починає танцювати перший або придумує гру, і вечірка нарешті оживає. Вираз розмовний і енергійний. Його можна почути від ведучих, діджеїв і просто друзів.',
          ru: 'Так говорят, когда кто-то включает музыку, начинает танцевать первым или придумывает игру, и вечеринка наконец оживает. Выражение разговорное и энергичное. Его можно услышать от ведущих, диджеев и просто друзей.',
          en: 'People say this when someone puts on music, dances first or starts a game, and the party finally comes alive. It is informal and full of energy. You hear it from hosts, DJs and friends.',
        },
        ex: ['Our DJ played an old disco hit to get the party started.', 'Who’s going to get the party started?'],
        similar: ['to break the ice', 'to kick things off'],
        tip: {
          uk: 'Тут конструкція get + об’єкт + третя форма: get the party started.',
          ru: 'Здесь конструкция get + объект + третья форма: get the party started.',
          en: 'The pattern is get + object + past participle: get the party started.',
        },
      },
      {
        en: 'to go viral',
        m: { uk: 'стати вірусним, швидко поширитися в інтернеті', ru: 'стать вирусным, быстро распространиться в интернете', en: 'spread very quickly online' },
        story: {
          uk: 'Як вірус швидко передається від людини до людини, так і відео чи пісня швидко поширюються мережею. Кліп до цієї пісні набрав рекордну кількість переглядів за першу добу, тобто буквально став вірусним. Вираз сучасний і дуже вживаний.',
          ru: 'Как вирус быстро передаётся от человека к человеку, так и видео или песня быстро распространяются по сети. Клип к этой песне набрал рекордное количество просмотров за первые сутки, то есть буквально стал вирусным. Выражение современное и очень употребительное.',
          en: 'Just as a virus spreads quickly from person to person, a video or song can spread quickly online. The video for this song got a record number of views in its first day, so it really went viral. The phrase is modern and very common.',
        },
        ex: ['Her cat video went viral overnight.', 'The dance challenge went viral on TikTok.'],
        similar: ['to blow up (online)', 'to take the internet by storm'],
        tip: {
          uk: 'Минулий час went viral. Можна сказати і a viral video.',
          ru: 'Прошедшее время went viral. Можно сказать и a viral video.',
          en: 'The past is went viral. You can also say a viral video.',
        },
      },
      {
        en: 'to brighten up someone’s day',
        m: { uk: 'зробити чийсь день світлішим', ru: 'сделать чей-то день светлее', en: 'make someone’s day happier' },
        story: {
          uk: 'Bright означає «яскравий», а brighten up зробити світлішим. Вираз кажуть про маленькі приємності: повідомлення, усмішку, улюблену пісню. Він теплий і ввічливий, підходить і для друзів, і для дорослих.',
          ru: 'Bright значит «яркий», а brighten up сделать светлее. Выражение говорят о маленьких приятностях: сообщении, улыбке, любимой песне. Оно тёплое и вежливое, подходит и для друзей, и для взрослых.',
          en: 'Bright means full of light, and brighten up means to make lighter. People use the phrase about small nice things: a message, a smile, a favourite song. It is warm and polite and works with friends and adults.',
        },
        ex: ['Your postcard really brightened up my day.', 'Fresh flowers can brighten up any room.'],
        similar: ['to make someone’s day', 'to put a smile on someone’s face'],
        tip: {
          uk: 'Можна і без up: brighten someone’s day. Обидва варіанти правильні.',
          ru: 'Можно и без up: brighten someone’s day. Оба варианта правильные.',
          en: 'You can drop up: brighten someone’s day. Both are correct.',
        },
      },
    ],
    culture: [
      {
        uk: 'BTS часто називають гуртом, який допоміг K-pop стати по-справжньому світовим явищем. Їхні фанати називають себе ARMY.',
        ru: 'BTS часто называют группой, которая помогла K-pop стать по-настоящему мировым явлением. Их фанаты называют себя ARMY.',
        en: 'BTS is often called the group that helped K-pop become a truly global phenomenon. Their fans call themselves ARMY.',
      },
      {
        uk: 'Пісня вийшла влітку 2020 року, коли багато людей сиділи вдома. Гурт хотів подарувати слухачам трохи радості й енергії в складний час.',
        ru: 'Песня вышла летом 2020 года, когда многие люди сидели дома. Группа хотела подарить слушателям немного радости и энергии в трудное время.',
        en: 'The song came out in summer 2020, when many people were staying at home. The group wanted to give listeners some joy and energy in a difficult time.',
      },
      {
        uk: 'Стиль пісні нагадує диско і фанк 1970-х років. Ретро-звучання сьогодні знову модне серед молоді в усьому світі.',
        ru: 'Стиль песни напоминает диско и фанк 1970-х годов. Ретро-звучание сегодня снова модно среди молодёжи во всём мире.',
        en: 'The style of the song is like the disco and funk of the 1970s. Retro sounds are fashionable again with young people around the world.',
      },
    ],
  },

  'a-sky-full-of-stars': {
    intro: {
      uk: 'Це пісня про людину, поруч із якою світ ніби сяє, а кліп про радість, яку музика дарує цілій вулиці. Вона дає чудовий привід вивчити англійські вирази про зірки, небо і захоплення. В англійській мові багато ідіом зі словами star, moon і sky, і ними користуються щодня, навіть коли не говорять про космос. Усі приклади наші власні.',
      ru: 'Это песня о человеке, рядом с которым мир будто сияет, а клип о радости, которую музыка дарит целой улице. Она даёт отличный повод выучить английские выражения о звёздах, небе и восхищении. В английском много идиом со словами star, moon и sky, и ими пользуются каждый день, даже когда не говорят о космосе. Все примеры наши собственные.',
      en: 'This is a song about a person who makes the world seem to shine, and the video is about the joy music brings to a whole street. It is a great reason to learn English expressions about stars, the sky and admiration. English has many idioms with star, moon and sky, and people use them every day, even when they are not talking about space. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to reach for the stars',
        m: { uk: 'прагнути великого', ru: 'стремиться к большому', en: 'try to achieve something very difficult or great' },
        story: {
          uk: 'Зірки дуже далеко, тож тягнутися до них означає мати великі мрії й не боятися високих цілей. Вираз часто кажуть учителі, тренери й батьки, щоб надихнути. Він звучить позитивно і трохи урочисто.',
          ru: 'Звёзды очень далеко, поэтому тянуться к ним значит иметь большие мечты и не бояться высоких целей. Выражение часто говорят учителя, тренеры и родители, чтобы вдохновить. Оно звучит позитивно и немного торжественно.',
          en: 'Stars are very far away, so reaching for them means having big dreams and not being afraid of high goals. Teachers, coaches and parents often say it to inspire. It sounds positive and a little formal.',
        },
        ex: ['Our head teacher told the graduates to reach for the stars.', 'She wants to be an astronaut. She really reaches for the stars.'],
        similar: ['to aim high', 'to dream big'],
        tip: {
          uk: 'Після reach обов’язково for: reach for the stars, а не reach the stars.',
          ru: 'После reach обязательно for: reach for the stars, а не reach the stars.',
          en: 'Use for after reach: reach for the stars, not reach the stars.',
        },
      },
      {
        en: 'to be over the moon',
        m: { uk: 'бути безмежно щасливим', ru: 'быть безмерно счастливым', en: 'be extremely happy' },
        story: {
          uk: 'Уявіть, що ви такі щасливі, що можете перестрибнути через Місяць. Так британці кажуть про велику радість. Вираз дуже поширений, його люблять футболісти після перемог і батьки після гарних новин.',
          ru: 'Представьте, что вы так счастливы, что можете перепрыгнуть через Луну. Так британцы говорят о большой радости. Выражение очень распространённое, его любят футболисты после побед и родители после хороших новостей.',
          en: 'Imagine being so happy that you could jump over the moon. That is how British people describe great joy. It is very common, and footballers love it after a win, as do parents after good news.',
        },
        ex: ['I was over the moon when I got the tickets.', 'Grandma was over the moon with her birthday surprise.'],
        similar: ['to be on cloud nine', 'to be thrilled'],
        tip: {
          uk: 'Вживаємо з the: over the moon. Не кажіть over a moon.',
          ru: 'Используем с the: over the moon. Не говорите over a moon.',
          en: 'Use the: over the moon, not over a moon.',
        },
      },
      {
        en: 'to look up to someone',
        m: { uk: 'захоплюватися кимось, брати приклад', ru: 'восхищаться кем-то, брать пример', en: 'admire and respect someone' },
        story: {
          uk: 'Буквально «дивитися знизу вгору» на когось, як на зірку на небі. Так кажуть про людей, якими ми захоплюємося: старших братів і сестер, учителів, спортсменів. Протилежне значення має look down on someone, тобто зневажати.',
          ru: 'Буквально «смотреть снизу вверх» на кого-то, как на звезду в небе. Так говорят о людях, которыми мы восхищаемся: старших братьях и сёстрах, учителях, спортсменах. Противоположное значение у look down on someone, то есть презирать.',
          en: 'Literally to look up at someone, like at a star in the sky. We use it about people we admire: older brothers and sisters, teachers, athletes. The opposite is look down on someone, which means to think you are better than them.',
        },
        ex: ['I’ve always looked up to my older sister.', 'Many kids look up to famous footballers.'],
        similar: ['to admire someone', 'to be a role model for someone'],
        tip: {
          uk: 'Не плутайте з look up (шукати інформацію): look up a word in a dictionary.',
          ru: 'Не путайте с look up (искать информацию): look up a word in a dictionary.',
          en: 'Don’t confuse it with look up meaning to search: look up a word in a dictionary.',
        },
      },
      {
        en: 'to thank your lucky stars',
        m: { uk: 'дякувати долі', ru: 'благодарить судьбу', en: 'feel very grateful because you were lucky' },
        story: {
          uk: 'Колись люди вірили, що зірки впливають на долю. Звідси вираз: thank your lucky stars означає радіти, що все склалося вдало, особливо коли могло бути гірше. Вираз розмовний, часто звучить як порада: You should thank your lucky stars.',
          ru: 'Когда-то люди верили, что звёзды влияют на судьбу. Отсюда выражение: thank your lucky stars значит радоваться, что всё сложилось удачно, особенно когда могло быть хуже. Выражение разговорное, часто звучит как совет: You should thank your lucky stars.',
          en: 'People once believed that stars controlled their fate. So thank your lucky stars means to be glad things went well, especially when they could have been worse. It is informal and often sounds like advice: You should thank your lucky stars.',
        },
        ex: ['I thanked my lucky stars that I didn’t miss the train.', 'You can thank your lucky stars that it didn’t rain.'],
        similar: ['to count your blessings', 'to be grateful'],
        tip: {
          uk: 'Займенник змінюється: thank my lucky stars, thank her lucky stars.',
          ru: 'Местоимение меняется: thank my lucky stars, thank her lucky stars.',
          en: 'Change the pronoun: thank my lucky stars, thank her lucky stars.',
        },
      },
      {
        en: 'a rising star',
        m: { uk: 'висхідна зірка, новий талант', ru: 'восходящая звезда, новый талант', en: 'a person who is quickly becoming successful' },
        story: {
          uk: 'Так називають молодих людей, які швидко стають відомими: співаків, спортсменів, акторів. Вираз нейтральний і часто трапляється в новинах. Колись так говорили і про Coldplay, коли гурт тільки починав у Лондоні.',
          ru: 'Так называют молодых людей, которые быстро становятся известными: певцов, спортсменов, актёров. Выражение нейтральное и часто встречается в новостях. Когда-то так говорили и о Coldplay, когда группа только начинала в Лондоне.',
          en: 'This is what we call young people who are quickly becoming famous: singers, athletes, actors. It is neutral and often appears in the news. People once said it about Coldplay too, when the band was just starting in London.',
        },
        ex: ['She is a rising star in Ukrainian tennis.', 'The magazine wrote about ten rising stars of pop music.'],
        similar: ['an up-and-coming artist', 'a newcomer'],
        tip: {
          uk: 'Rising стоїть перед іменником: a rising star, a rising talent.',
          ru: 'Rising стоит перед существительным: a rising star, a rising talent.',
          en: 'Rising goes before the noun: a rising star, a rising talent.',
        },
      },
      {
        en: 'to be starstruck',
        m: { uk: 'бути враженим зустріччю із зіркою', ru: 'быть поражённым встречей со звездой', en: 'feel amazed and shy when you meet someone famous' },
        story: {
          uk: 'Struck означає «вражений, ніби ударом». Starstruck кажуть, коли людина так розгубилася перед знаменитістю, що не може й слова вимовити. Уявіть, що Кріс Мартін раптом іде вашою вулицею. Більшість людей були б starstruck.',
          ru: 'Struck значит «поражённый, будто ударом». Starstruck говорят, когда человек так растерялся перед знаменитостью, что не может и слова сказать. Представьте, что Крис Мартин вдруг идёт по вашей улице. Большинство людей были бы starstruck.',
          en: 'Struck means hit. Starstruck describes someone so amazed by a celebrity that they can’t say a word. Imagine Chris Martin suddenly walking down your street. Most people would be starstruck.',
        },
        ex: ['I was so starstruck that I forgot to ask for a photo.', 'The kids were starstruck when the footballer visited their school.'],
        similar: ['to be lost for words', 'to be in awe'],
        tip: {
          uk: 'Пишеться одним словом: starstruck.',
          ru: 'Пишется одним словом: starstruck.',
          en: 'Write it as one word: starstruck.',
        },
      },
      {
        en: 'to take someone’s breath away',
        m: { uk: 'захопити дух', ru: 'захватить дух', en: 'be so beautiful or exciting that you can hardly breathe' },
        story: {
          uk: 'Коли щось неймовірно гарне, ми на мить ніби забуваємо дихати. Так кажуть про краєвиди, зоряне небо, концерти чи виступи. Від цього виразу походить прикметник breathtaking.',
          ru: 'Когда что-то невероятно красиво, мы на миг будто забываем дышать. Так говорят о пейзажах, звёздном небе, концертах или выступлениях. От этого выражения происходит прилагательное breathtaking.',
          en: 'When something is amazingly beautiful, we almost forget to breathe for a moment. People say this about views, starry skies, concerts and performances. The adjective breathtaking comes from this idea.',
        },
        ex: ['The view of the mountains took my breath away.', 'Her performance took everyone’s breath away.'],
        similar: ['breathtaking', 'stunning'],
        tip: {
          uk: 'Займенник стоїть після take: took my breath away.',
          ru: 'Местоимение стоит после take: took my breath away.',
          en: 'The possessive goes after take: took my breath away.',
        },
      },
      {
        en: 'once in a blue moon',
        m: { uk: 'дуже рідко', ru: 'очень редко', en: 'very rarely' },
        story: {
          uk: '«Блакитним місяцем» англійці називають рідкісний другий повний місяць за один календарний місяць. Тому once in a blue moon означає «майже ніколи». Вираз розмовний і трохи жартівливий.',
          ru: '«Голубой луной» англичане называют редкое второе полнолуние за один календарный месяц. Поэтому once in a blue moon значит «почти никогда». Выражение разговорное и немного шутливое.',
          en: 'In English a blue moon is a rare second full moon in one calendar month. So once in a blue moon means almost never. It is informal and a bit playful.',
        },
        ex: ['My brother cleans his room once in a blue moon.', 'We go to the cinema once in a blue moon.'],
        similar: ['hardly ever', 'very rarely'],
        tip: {
          uk: 'Зазвичай ставимо в кінці речення.',
          ru: 'Обычно ставим в конце предложения.',
          en: 'It usually goes at the end of the sentence.',
        },
      },
      {
        en: 'to stand out from the crowd',
        m: { uk: 'вирізнятися з натовпу', ru: 'выделяться из толпы', en: 'be different and easy to notice' },
        story: {
          uk: 'У кліпі Кріс Мартін з інструментами на спині помітний серед сотень людей. Stand out from the crowd кажуть про тих, хто відрізняється талантом, стилем чи ідеями. Вираз позитивний і часто звучить у порадах про резюме і співбесіди.',
          ru: 'В клипе Крис Мартин с инструментами на спине заметен среди сотен людей. Stand out from the crowd говорят о тех, кто отличается талантом, стилем или идеями. Выражение позитивное и часто звучит в советах о резюме и собеседованиях.',
          en: 'In the video Chris Martin, with instruments on his back, is easy to spot among hundreds of people. Stand out from the crowd is said about people who are different because of their talent, style or ideas. It is positive and often appears in advice about CVs and interviews.',
        },
        ex: ['Her bright yellow coat made her stand out from the crowd.', 'A good idea will help your project stand out from the crowd.'],
        similar: ['to be one of a kind', 'to catch someone’s eye'],
        tip: {
          uk: 'Можна сказати коротше: stand out. From the crowd додає образності.',
          ru: 'Можно сказать короче: stand out. From the crowd добавляет образности.',
          en: 'You can say just stand out. From the crowd makes it more vivid.',
        },
      },
      {
        en: 'a street performer',
        m: { uk: 'вуличний артист', ru: 'уличный артист', en: 'someone who performs in public places for money' },
        story: {
          uk: 'Вуличних музикантів у Британії ще називають buskers. Кліп показує, як один музикант може зібрати величезний натовп. У багатьох містах для виступів на вулиці потрібен спеціальний дозвіл.',
          ru: 'Уличных музыкантов в Британии ещё называют buskers. Клип показывает, как один музыкант может собрать огромную толпу. Во многих городах для выступлений на улице нужно специальное разрешение.',
          en: 'In Britain street musicians are also called buskers. The video shows how one musician can gather a huge crowd. In many cities you need a special permit to perform in the street.',
        },
        ex: ['A street performer juggled fire in the main square.', 'We gave some coins to a street performer in London.'],
        similar: ['a busker', 'an entertainer'],
        tip: {
          uk: 'Дієслово до busker: to busk (виступати на вулиці).',
          ru: 'Глагол к busker: to busk (выступать на улице).',
          en: 'The verb for busker is to busk (to perform in the street).',
        },
      },
    ],
    culture: [
      {
        uk: 'Coldplay відомі тим, що на концертах роздають глядачам браслети, які світяться в такт музиці. Стадіон перетворюється на справжнє «небо, повне зірок».',
        ru: 'Coldplay известны тем, что на концертах раздают зрителям браслеты, которые светятся в такт музыке. Стадион превращается в настоящее «небо, полное звёзд».',
        en: 'Coldplay are known for giving fans wristbands that light up in time with the music at concerts. The stadium turns into a real sky full of stars.',
      },
      {
        uk: 'Авічі (Тім Берглінг) був одним із найвідоміших шведських діджеїв. Співпраця з ним додала рок-гурту звучання електронної танцювальної музики.',
        ru: 'Авичи (Тим Берглинг) был одним из самых известных шведских диджеев. Сотрудничество с ним добавило рок-группе звучание электронной танцевальной музыки.',
        en: 'Avicii (Tim Bergling) was one of the most famous Swedish DJs. Working with him gave the rock band an electronic dance sound.',
      },
      {
        uk: 'Ньютаун у Сіднеї відомий вуличним мистецтвом, маленькими кав’ярнями і живою музикою. Тому він ідеально підійшов для кліпу про вуличного музиканта.',
        ru: 'Ньютаун в Сиднее известен уличным искусством, маленькими кафе и живой музыкой. Поэтому он идеально подошёл для клипа об уличном музыканте.',
        en: 'Newtown in Sydney is famous for street art, small cafés and live music. That made it perfect for a video about a street musician.',
      },
    ],
  },

  'dont-start-now': {
    intro: {
      uk: 'Під енергійний диско-ритм ця пісня говорить про дуже знайому тему: як оговтатися після розставання і почати нове життя сильнішим. Англійська має багато виразів про те, щоб залишити минуле позаду, швидко відновитися і зустріти колишнього без драми. Нижче вирази, які допоможуть говорити про такі ситуації спокійно і з гумором. Усі приклади наші власні.',
      ru: 'Под энергичный диско-ритм эта песня говорит об очень знакомой теме: как прийти в себя после расставания и начать новую жизнь сильнее. В английском много выражений о том, чтобы оставить прошлое позади, быстро восстановиться и встретить бывшего без драмы. Ниже выражения, которые помогут говорить о таких ситуациях спокойно и с юмором. Все примеры наши собственные.',
      en: 'With an energetic disco beat, this song talks about a familiar topic: getting over a break-up and starting a new life stronger. English has many expressions about leaving the past behind, bouncing back and meeting an ex without drama. Below are phrases that help you talk about these situations calmly and with humour. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to get over someone',
        m: { uk: 'оговтатися після розставання', ru: 'прийти в себя после расставания', en: 'stop feeling sad about someone you were close to' },
        story: {
          uk: 'Get over буквально «перебратися через щось», як через перешкоду. Про людину так кажуть, коли біль після розставання вже минув. Фразове дієслово також вживають про хворобу чи страх: get over a cold, get over your fear.',
          ru: 'Get over буквально «перебраться через что-то», как через препятствие. О человеке так говорят, когда боль после расставания уже прошла. Фразовый глагол также используют о болезни или страхе: get over a cold, get over your fear.',
          en: 'Get over literally means to climb over something, like an obstacle. With a person it means the pain of a break-up has passed. It is also used for illness or fear: get over a cold, get over your fear.',
        },
        ex: ['It took her a whole summer to get over him.', 'He still hasn’t got over losing the final.'],
        similar: ['to move on from someone', 'to recover from something'],
        tip: {
          uk: 'Об’єкт ставимо після over: get over him, а не get him over.',
          ru: 'Объект ставим после over: get over him, а не get him over.',
          en: 'The object goes after over: get over him, not get him over.',
        },
      },
      {
        en: 'a fresh start',
        m: { uk: 'новий початок', ru: 'новое начало', en: 'a chance to begin again without past problems' },
        story: {
          uk: 'Fresh означає «свіжий, новий». A fresh start кажуть про переїзд, нову школу, новий рік чи нові стосунки. Вираз позитивний і дає надію: усе можна почати з чистого аркуша.',
          ru: 'Fresh значит «свежий, новый». A fresh start говорят о переезде, новой школе, новом годе или новых отношениях. Выражение позитивное и даёт надежду: всё можно начать с чистого листа.',
          en: 'Fresh means new and clean. People say a fresh start about a move, a new school, a new year or a new relationship. It is positive and full of hope: you can begin again.',
        },
        ex: ['September always feels like a fresh start.', 'After the argument, they agreed to make a fresh start.'],
        similar: ['a clean slate', 'a new beginning'],
        tip: {
          uk: 'Часто кажуть make a fresh start або need a fresh start.',
          ru: 'Часто говорят make a fresh start или need a fresh start.',
          en: 'People often say make a fresh start or need a fresh start.',
        },
      },
      {
        en: 'to bounce back',
        m: { uk: 'швидко відновитися', ru: 'быстро восстановиться', en: 'recover quickly after a problem' },
        story: {
          uk: 'Як м’ячик, що відскакує від підлоги, людина після невдачі швидко повертається у форму. Вираз люблять спортивні коментатори, але його кажуть і про настрій, навчання чи бізнес. Він звучить бадьоро й оптимістично.',
          ru: 'Как мячик, который отскакивает от пола, человек после неудачи быстро возвращается в форму. Выражение любят спортивные комментаторы, но его говорят и о настроении, учёбе или бизнесе. Оно звучит бодро и оптимистично.',
          en: 'Like a ball bouncing off the floor, a person quickly comes back after a failure. Sports commentators love this phrase, but it is also used about mood, studies or business. It sounds energetic and optimistic.',
        },
        ex: ['She failed her first test but bounced back with an A.', 'Teenagers usually bounce back fast.'],
        similar: ['to get back on your feet', 'to pick yourself up'],
        tip: {
          uk: 'Можна додати from: bounce back from a bad week.',
          ru: 'Можно добавить from: bounce back from a bad week.',
          en: 'You can add from: bounce back from a bad week.',
        },
      },
      {
        en: 'to turn the page',
        m: { uk: 'перегорнути сторінку', ru: 'перевернуть страницу', en: 'leave the past behind and start a new period' },
        story: {
          uk: 'Життя часто порівнюють із книжкою. Перегорнути сторінку означає закінчити один розділ і почати наступний. Вираз трохи книжний, але дуже зрозумілий, і його охоче вживають у мотиваційних дописах.',
          ru: 'Жизнь часто сравнивают с книгой. Перевернуть страницу значит закончить одну главу и начать следующую. Выражение немного книжное, но очень понятное, и его охотно используют в мотивационных постах.',
          en: 'Life is often compared to a book. To turn the page means to finish one part and start the next. The phrase is a little bookish but very clear, and people like to use it in motivational posts.',
        },
        ex: ['After graduation, it’s time to turn the page.', 'Let’s turn the page and forget that silly fight.'],
        similar: ['to start a new chapter', 'to close a chapter'],
        tip: {
          uk: 'Вживаємо з the: turn the page. Turn a page звучить буквально.',
          ru: 'Используем с the: turn the page. Turn a page звучит буквально.',
          en: 'Use the: turn the page. Turn a page sounds too literal.',
        },
      },
      {
        en: 'to bump into someone',
        m: { uk: 'випадково зустріти когось', ru: 'случайно встретить кого-то', en: 'meet someone by chance' },
        story: {
          uk: 'Bump означає «наштовхнутися». Але найчастіше bump into someone означає несподівану зустріч у магазині, на вулиці чи в кав’ярні. Зустріти колишнього якраз тоді, коли ти вже щасливий(а), класичний сюжет для пісень і серіалів.',
          ru: 'Bump значит «натолкнуться». Но чаще всего bump into someone значит неожиданную встречу в магазине, на улице или в кафе. Встретить бывшего именно тогда, когда ты уже счастлив(а), классический сюжет для песен и сериалов.',
          en: 'Bump means to hit something lightly. But bump into someone usually means meeting them unexpectedly in a shop, in the street or in a café. Meeting your ex just when you are happy again is a classic plot for songs and series.',
        },
        ex: ['I bumped into my old classmate at the airport.', 'Guess who I bumped into at the cinema?'],
        similar: ['to run into someone', 'to come across someone'],
        tip: {
          uk: 'Минулий час bumped into. Звучить розмовно, у листах краще met by chance.',
          ru: 'Прошедшее время bumped into. Звучит разговорно, в письмах лучше met by chance.',
          en: 'The past is bumped into. It is informal; in formal writing use met by chance.',
        },
      },
      {
        en: 'no hard feelings',
        m: { uk: 'без образ', ru: 'без обид', en: 'I am not angry with you' },
        story: {
          uk: 'Hard feelings це образа чи гнів. Фразу No hard feelings кажуть, щоб показати, що конфлікт залишився в минулому. Її часто вживають після суперечки, програної гри чи розставання. Звучить дружньо і по-дорослому.',
          ru: 'Hard feelings это обида или злость. Фразу No hard feelings говорят, чтобы показать, что конфликт остался в прошлом. Её часто используют после спора, проигранной игры или расставания. Звучит дружелюбно и по-взрослому.',
          en: 'Hard feelings are anger or resentment. People say No hard feelings to show that a conflict is in the past. It is common after an argument, a lost game or a break-up. It sounds friendly and mature.',
        },
        ex: ['You won fair and square. No hard feelings!', 'We broke up, but there are no hard feelings.'],
        similar: ['no grudges', 'it’s all good'],
        tip: {
          uk: 'Слово feelings завжди в множині в цьому виразі.',
          ru: 'Слово feelings всегда во множественном числе в этом выражении.',
          en: 'Feelings is always plural in this phrase.',
        },
      },
      {
        en: 'plenty more fish in the sea',
        m: { uk: 'світ не зійшовся клином на одній людині', ru: 'свет не сошёлся клином на одном человеке', en: 'there are many other people you could love' },
        story: {
          uk: 'Цей вираз кажуть, щоб утішити друга після розставання: у морі ще багато риби, тобто знайдеться інша людина. Він розмовний і трохи жартівливий. Найкраще звучить у дружній розмові, а не в серйозному листі.',
          ru: 'Это выражение говорят, чтобы утешить друга после расставания: в море ещё много рыбы, то есть найдётся другой человек. Оно разговорное и немного шутливое. Лучше всего звучит в дружеском разговоре, а не в серьёзном письме.',
          en: 'People say this to comfort a friend after a break-up: there are lots of fish in the sea, so there will be someone else. It is informal and a bit playful. It works best in a friendly chat, not in a serious letter.',
        },
        ex: ['Don’t cry over him. There are plenty more fish in the sea.', 'My mum told me there were plenty more fish in the sea.'],
        similar: ['there’s someone better out there', 'it’s not the end of the world'],
        tip: {
          uk: 'Повна форма: There are plenty more fish in the sea. Fish тут у множині без -es.',
          ru: 'Полная форма: There are plenty more fish in the sea. Fish здесь во множественном числе без -es.',
          en: 'The full form is There are plenty more fish in the sea. Fish is plural here without -es.',
        },
      },
      {
        en: 'to have the last laugh',
        m: { uk: 'сміється той, хто сміється останнім', ru: 'смеётся тот, кто смеётся последним', en: 'be successful in the end after others doubted you' },
        story: {
          uk: 'Так кажуть, коли людина, з якої колись сміялися чи в яку не вірили, зрештою виграє. Після розставання це означає жити щасливо і краще, ніж очікував колишній. Вираз має відтінок тріумфу, але без злості.',
          ru: 'Так говорят, когда человек, над которым когда-то смеялись или в которого не верили, в итоге выигрывает. После расставания это значит жить счастливо и лучше, чем ожидал бывший. Выражение имеет оттенок триумфа, но без злости.',
          en: 'People say this when someone who was laughed at or doubted wins in the end. After a break-up it means living happily, better than your ex expected. It has a feeling of triumph, but without anger.',
        },
        ex: ['They laughed at his idea, but he had the last laugh when it won the prize.', 'Keep working hard and you’ll have the last laugh.'],
        similar: ['to prove someone wrong', 'to come out on top'],
        tip: {
          uk: 'Вживаємо з the: have the last laugh.',
          ru: 'Используем с the: have the last laugh.',
          en: 'Use the: have the last laugh.',
        },
      },
      {
        en: 'to glow up',
        m: { uk: 'змінитися на краще (розм.)', ru: 'измениться к лучшему (разг.)', en: 'become more attractive or confident over time' },
        story: {
          uk: 'Glow означає «сяяти». Glow up це сучасний сленг із соцмереж: так кажуть, коли людина помітно змінилася на краще, зовні чи внутрішньо. Є й іменник a glow-up. Слово популярне серед підлітків і часто трапляється в TikTok.',
          ru: 'Glow значит «сиять». Glow up это современный сленг из соцсетей: так говорят, когда человек заметно изменился к лучшему, внешне или внутренне. Есть и существительное a glow-up. Слово популярно среди подростков и часто встречается в TikTok.',
          en: 'Glow means to shine. Glow up is modern social media slang for when a person changes for the better, on the outside or the inside. There is also a noun, a glow-up. It is popular with teens and common on TikTok.',
        },
        ex: ['She really glowed up over the summer.', 'His glow-up after joining the gym was amazing.'],
        similar: ['to blossom', 'to transform'],
        tip: {
          uk: 'Дієслово пишемо окремо (glow up), іменник через дефіс (a glow-up). Це сленг, у твори на іспиті краще не вживати.',
          ru: 'Глагол пишем раздельно (glow up), существительное через дефис (a glow-up). Это сленг, в сочинения на экзамене лучше не использовать.',
          en: 'Write the verb as two words (glow up) and the noun with a hyphen (a glow-up). It is slang, so avoid it in exam essays.',
        },
      },
      {
        en: 'to close a chapter',
        m: { uk: 'закрити розділ, завершити етап', ru: 'закрыть главу, завершить этап', en: 'finish a period of your life' },
        story: {
          uk: 'Ще одна «книжкова» метафора. Close a chapter означає завершити певний період: стосунки, навчання, роботу. Вираз трохи серйозніший за turn the page і часто звучить у промовах та інтерв’ю.',
          ru: 'Ещё одна «книжная» метафора. Close a chapter значит завершить определённый период: отношения, учёбу, работу. Выражение немного серьёзнее, чем turn the page, и часто звучит в речах и интервью.',
          en: 'Another book metaphor. Close a chapter means to end a period of life: a relationship, school or a job. It is a little more serious than turn the page and often appears in speeches and interviews.',
        },
        ex: ['Leaving our old flat closed a chapter in my life.', 'With this win, the team closed a difficult chapter.'],
        similar: ['to turn the page', 'to start a new chapter'],
        tip: {
          uk: 'Можна сказати і close the chapter on something: close the chapter on the past.',
          ru: 'Можно сказать и close the chapter on something: close the chapter on the past.',
          en: 'You can also say close the chapter on something: close the chapter on the past.',
        },
      },
    ],
    culture: [
      {
        uk: 'Альбом «Future Nostalgia» вийшов навесні 2020 року, і багато людей танцювали під нього вдома. Його диско-звучання повернуло моду на музику 1970-1980-х.',
        ru: 'Альбом «Future Nostalgia» вышел весной 2020 года, и многие люди танцевали под него дома. Его диско-звучание вернуло моду на музыку 1970-1980-х.',
        en: 'Future Nostalgia came out in spring 2020, and many people danced to it at home. Its disco sound brought back the fashion for music from the 1970s and 1980s.',
      },
      {
        uk: 'В англомовній поп-музиці є ціла традиція «пісень незалежності» після розставання, де героїня почувається сильнішою, а не сумною.',
        ru: 'В англоязычной поп-музыке есть целая традиция «песен независимости» после расставания, где героиня чувствует себя сильнее, а не грустной.',
        en: 'English-language pop has a whole tradition of independence songs after a break-up, where the singer feels stronger rather than sad.',
      },
      {
        uk: 'Дуа Ліпа знає кілька мов, зокрема англійську та албанську. Вона виросла між Лондоном і Приштиною, столицею Косова.',
        ru: 'Дуа Липа знает несколько языков, в том числе английский и албанский. Она выросла между Лондоном и Приштиной, столицей Косово.',
        en: 'Dua Lipa speaks several languages, including English and Albanian. She grew up between London and Pristina, the capital of Kosovo.',
      },
    ],
  },

  'photograph': {
    intro: {
      uk: 'Ця тепла балада про спогади, фотографії і людей, з якими ми зараз далеко. Тема дуже близька кожному: у всіх є улюблені фото, речі на пам’ять і друзі чи родичі, за якими ми сумуємо. Нижче вирази, які допоможуть англійською говорити про минуле, ностальгію і про те, як підтримувати зв’язок на відстані. Усі приклади наші власні.',
      ru: 'Эта тёплая баллада о воспоминаниях, фотографиях и людях, с которыми мы сейчас далеко. Тема очень близка каждому: у всех есть любимые фото, вещи на память и друзья или родственники, по которым мы скучаем. Ниже выражения, которые помогут по-английски говорить о прошлом, ностальгии и о том, как поддерживать связь на расстоянии. Все примеры наши собственные.',
      en: 'This warm ballad is about memories, photos and people who are far away from us. The topic is close to everyone: we all have favourite photos, keepsakes and friends or relatives we miss. Below are expressions that help you talk in English about the past, nostalgia and staying in touch over distance. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to bring back memories',
        m: { uk: 'навіювати спогади', ru: 'навевать воспоминания', en: 'make you remember the past' },
        story: {
          uk: 'Буквально «приносити спогади назад». Так кажуть про запахи, пісні, фото, місця, які раптом повертають нас у минуле. Вираз нейтральний і дуже поширений. Часто додають of: brings back memories of summer.',
          ru: 'Буквально «приносить воспоминания обратно». Так говорят о запахах, песнях, фото, местах, которые вдруг возвращают нас в прошлое. Выражение нейтральное и очень распространённое. Часто добавляют of: brings back memories of summer.',
          en: 'Literally to bring memories back. People say it about smells, songs, photos or places that suddenly take us back to the past. It is neutral and very common. We often add of: brings back memories of summer.',
        },
        ex: ['This song brings back memories of our trip to the sea.', 'Looking at old photos brought back so many memories.'],
        similar: ['to remind someone of something', 'to take someone back'],
        tip: {
          uk: 'Memories у множині: bring back memories, а не bring back memory.',
          ru: 'Memories во множественном числе: bring back memories, а не bring back memory.',
          en: 'Use the plural: bring back memories, not bring back memory.',
        },
      },
      {
        en: 'to take a trip down memory lane',
        m: { uk: 'поринути у спогади', ru: 'погрузиться в воспоминания', en: 'spend time remembering the past' },
        story: {
          uk: 'Memory lane це уявна «вуличка спогадів». Прогулятися нею означає згадувати приємні моменти минулого: дивитися старі фото, відео, говорити про дитинство. Кліп до цієї пісні по суті і є такою прогулянкою.',
          ru: 'Memory lane это воображаемая «улочка воспоминаний». Прогуляться по ней значит вспоминать приятные моменты прошлого: смотреть старые фото, видео, говорить о детстве. Клип к этой песне по сути и есть такая прогулка.',
          en: 'Memory lane is an imaginary street of memories. Walking down it means remembering nice moments from the past: old photos, videos, talking about childhood. The video for this song is really a trip down memory lane.',
        },
        ex: ['We took a trip down memory lane with Grandma’s photo album.', 'Visiting my old school was a real trip down memory lane.'],
        similar: ['to reminisce', 'to look back on the old days'],
        tip: {
          uk: 'Можна сказати коротше: a walk down memory lane або просто down memory lane.',
          ru: 'Можно сказать короче: a walk down memory lane или просто down memory lane.',
          en: 'You can also say a walk down memory lane or just down memory lane.',
        },
      },
      {
        en: 'to stay in touch',
        m: { uk: 'підтримувати зв’язок', ru: 'поддерживать связь', en: 'keep communicating with someone' },
        story: {
          uk: 'Touch означає «дотик», а in touch «на зв’язку». Цю фразу кажуть, коли прощаються після табору, переїзду чи випускного. Сьогодні підтримувати зв’язок допомагають месенджери і відеодзвінки, а колись листи й фотографії.',
          ru: 'Touch значит «прикосновение», а in touch «на связи». Эту фразу говорят, когда прощаются после лагеря, переезда или выпускного. Сегодня поддерживать связь помогают мессенджеры и видеозвонки, а когда-то письма и фотографии.',
          en: 'Touch is contact, and in touch means connected. People say this when they say goodbye after camp, a move or graduation. Today messengers and video calls help us stay in touch; in the past it was letters and photos.',
        },
        ex: ['Let’s stay in touch after the summer camp!', 'I still stay in touch with my first teacher.'],
        similar: ['to keep in touch', 'to keep in contact'],
        tip: {
          uk: 'Протилежне: lose touch (with someone), втратити зв’язок.',
          ru: 'Противоположное: lose touch (with someone), потерять связь.',
          en: 'The opposite is lose touch (with someone).',
        },
      },
      {
        en: 'a picture is worth a thousand words',
        m: { uk: 'краще один раз побачити', ru: 'лучше один раз увидеть', en: 'an image can say more than a long description' },
        story: {
          uk: 'Це відоме англійське прислів’я: одна картинка може розповісти більше, ніж тисяча слів. Його часто кажуть про фотографії, які передають емоції краще за будь-який опис. Саме тому пісня про фото звучить так зворушливо.',
          ru: 'Это известная английская пословица: одна картинка может рассказать больше, чем тысяча слов. Её часто говорят о фотографиях, которые передают эмоции лучше любого описания. Именно поэтому песня о фото звучит так трогательно.',
          en: 'This is a well-known English saying: one picture can tell more than a thousand words. People often say it about photos that show emotions better than any description. That is why a song about a photo feels so moving.',
        },
        ex: ['Look at their faces in this photo. A picture is worth a thousand words.', 'Add a photo to your presentation. A picture is worth a thousand words.'],
        similar: ['seeing is believing', 'to speak for itself'],
        tip: {
          uk: 'Прислів’я вживаємо цілим, без змін: a picture is worth a thousand words.',
          ru: 'Пословицу используем целиком, без изменений: a picture is worth a thousand words.',
          en: 'Use the saying as it is, without changes.',
        },
      },
      {
        en: 'absence makes the heart grow fonder',
        m: { uk: 'у розлуці почуття міцнішають', ru: 'в разлуке чувства крепнут', en: 'we love people more when they are away' },
        story: {
          uk: 'Прислів’я каже: коли людина далеко, ми цінуємо її ще більше. Fond означає «ніжно прив’язаний». Його згадують, коли говорять про стосунки на відстані, друзів у інших країнах чи родичів, яких рідко бачимо.',
          ru: 'Пословица говорит: когда человек далеко, мы ценим его ещё больше. Fond значит «нежно привязанный». Её вспоминают, когда говорят об отношениях на расстоянии, друзьях в других странах или родственниках, которых редко видим.',
          en: 'The saying means that when someone is away, we value them even more. Fond means loving. People quote it when they talk about long-distance relationships, friends in other countries or relatives they rarely see.',
        },
        ex: ['I didn’t see my cousin all year. Absence makes the heart grow fonder!', 'They say absence makes the heart grow fonder, and it’s true.'],
        similar: ['to miss someone like crazy', 'distance makes you appreciate people'],
        tip: {
          uk: 'Є протилежне прислів’я: out of sight, out of mind (з очей геть, з серця геть).',
          ru: 'Есть противоположная пословица: out of sight, out of mind (с глаз долой, из сердца вон).',
          en: 'There is an opposite saying: out of sight, out of mind.',
        },
      },
      {
        en: 'to capture the moment',
        m: { uk: 'зловити мить', ru: 'поймать мгновение', en: 'record a special moment in a photo or video' },
        story: {
          uk: 'Capture означає «захопити, зловити». Фотографи і блогери постійно говорять про те, щоб зловити ідеальний момент. Вираз можна вживати і про спогади: деякі моменти хочеться зберегти назавжди.',
          ru: 'Capture значит «захватить, поймать». Фотографы и блогеры постоянно говорят о том, чтобы поймать идеальный момент. Выражение можно использовать и о воспоминаниях: некоторые моменты хочется сохранить навсегда.',
          en: 'Capture means to catch. Photographers and bloggers always talk about capturing the perfect moment. You can also use it about memories: some moments you want to keep forever.',
        },
        ex: ['Dad captured the moment when I scored the goal.', 'Quick, take a photo and capture the moment!'],
        similar: ['to snap a photo', 'to freeze the moment'],
        tip: {
          uk: 'Capture вживаємо і про фото, і про відео: capture something on camera.',
          ru: 'Capture используем и о фото, и о видео: capture something on camera.',
          en: 'Use capture for photos and videos: capture something on camera.',
        },
      },
      {
        en: 'a blast from the past',
        m: { uk: 'привіт із минулого', ru: 'привет из прошлого', en: 'something that suddenly reminds you of an earlier time' },
        story: {
          uk: 'Так кажуть, коли раптом бачать стару річ, чують давню пісню чи зустрічають людину з минулого. Вираз жартівливий і веселий, бо слова blast і past римуються. Його часто пишуть під старими фото в соцмережах.',
          ru: 'Так говорят, когда вдруг видят старую вещь, слышат давнюю песню или встречают человека из прошлого. Выражение шутливое и весёлое, потому что слова blast и past рифмуются. Его часто пишут под старыми фото в соцсетях.',
          en: 'People say this when they suddenly see an old thing, hear an old song or meet someone from the past. It is fun and playful because blast and past rhyme. It is often written under old photos on social media.',
        },
        ex: ['Mum found her old cassette player. What a blast from the past!', 'Seeing my primary school teacher was a blast from the past.'],
        similar: ['a throwback', 'a trip down memory lane'],
        tip: {
          uk: 'У соцмережах схожу ідею передає хештег #tbt (Throwback Thursday), коли в четвер публікують старі фото.',
          ru: 'В соцсетях похожую идею передаёт хештег #tbt (Throwback Thursday), когда в четверг публикуют старые фото.',
          en: 'On social media a similar idea is the hashtag #tbt (Throwback Thursday), when people post old photos on Thursdays.',
        },
      },
      {
        en: 'to treasure something',
        m: { uk: 'дорожити чимось', ru: 'дорожить чем-то', en: 'value something very much' },
        story: {
          uk: 'Treasure як іменник означає «скарб». Як дієслово воно означає берегти щось як скарб: спогади, подарунки, дружбу. Вираз теплий і трохи урочистий, його часто вживають про сімейні речі й фото.',
          ru: 'Treasure как существительное значит «сокровище». Как глагол оно значит беречь что-то как сокровище: воспоминания, подарки, дружбу. Выражение тёплое и немного торжественное, его часто используют о семейных вещах и фото.',
          en: 'As a noun, treasure means valuable things. As a verb, it means to keep something like a treasure: memories, presents, friendship. It is warm and a little formal and often used about family things and photos.',
        },
        ex: ['I treasure the letters my grandpa wrote to me.', 'We will always treasure that holiday.'],
        similar: ['to cherish something', 'to hold something dear'],
        tip: {
          uk: 'Також є прикметник treasured: a treasured memory, a treasured photo.',
          ru: 'Также есть прилагательное treasured: a treasured memory, a treasured photo.',
          en: 'There is also the adjective treasured: a treasured memory, a treasured photo.',
        },
      },
      {
        en: 'to look back on something',
        m: { uk: 'озиратися на минуле, згадувати', ru: 'оглядываться на прошлое, вспоминать', en: 'think about something that happened in the past' },
        story: {
          uk: 'Буквально «дивитися назад». Так говорять про роздуми над минулим: шкільними роками, подорожами, важкими часами. Часто додають, з яким почуттям: look back on it with a smile, look back with pride.',
          ru: 'Буквально «смотреть назад». Так говорят о размышлениях о прошлом: школьных годах, путешествиях, трудных временах. Часто добавляют, с каким чувством: look back on it with a smile, look back with pride.',
          en: 'Literally to look backwards. We use it for thinking about the past: school years, trips, hard times. People often add a feeling: look back on it with a smile, look back with pride.',
        },
        ex: ['When I look back on my first year at school, I laugh.', 'One day you will look back on this and smile.'],
        similar: ['to remember', 'to reflect on something'],
        tip: {
          uk: 'Прийменник on обов’язковий, якщо далі йде об’єкт: look back on those days.',
          ru: 'Предлог on обязателен, если дальше идёт объект: look back on those days.',
          en: 'You need on before an object: look back on those days.',
        },
      },
      {
        en: 'to grow up',
        m: { uk: 'дорослішати, вирости', ru: 'взрослеть, вырасти', en: 'change from a child into an adult' },
        story: {
          uk: 'У кліпі ми бачимо, як Ед Ширан дорослішає від малюка до підлітка, що виступає на сцені. Grow up означає і «вирости фізично», і «стати дорослішим у поведінці». Grow up! кажуть людині, яка поводиться по-дитячому.',
          ru: 'В клипе мы видим, как Эд Ширан взрослеет от малыша до подростка, который выступает на сцене. Grow up значит и «вырасти физически», и «стать взрослее в поведении». Grow up! говорят человеку, который ведёт себя по-детски.',
          en: 'In the video we see Ed Sheeran grow up from a toddler to a teenager performing on stage. Grow up means both to get older and to become more mature. Grow up! is said to someone acting childish.',
        },
        ex: ['I grew up in a small village near Poltava.', 'What do you want to be when you grow up?'],
        similar: ['to get older', 'to mature'],
        tip: {
          uk: 'Не плутайте з grow (рости, вирощувати): we grow tomatoes, але I grew up in Kyiv.',
          ru: 'Не путайте с grow (расти, выращивать): we grow tomatoes, но I grew up in Kyiv.',
          en: 'Don’t confuse it with grow: we grow tomatoes, but I grew up in Kyiv.',
        },
      },
    ],
    culture: [
      {
        uk: 'Ед Ширан став відомим завдяки виступам з гітарою і лупером, який дозволяє одній людині записати кілька партій просто на сцені.',
        ru: 'Эд Ширан стал известным благодаря выступлениям с гитарой и лупером, который позволяет одному человеку записать несколько партий прямо на сцене.',
        en: 'Ed Sheeran became famous for performing with a guitar and a loop pedal, which lets one person record several parts live on stage.',
      },
      {
        uk: 'Колись фотографії друкували і зберігали в альбомах, а сьогодні більшість фото живе в телефонах. Багато сімей у Британії й США досі мають великі домашні архіви з плівковими відео.',
        ru: 'Когда-то фотографии печатали и хранили в альбомах, а сегодня большинство фото живёт в телефонах. Многие семьи в Британии и США до сих пор хранят большие домашние архивы с плёночными видео.',
        en: 'People used to print photos and keep them in albums; today most photos live on phones. Many families in Britain and the USA still keep big home archives of old video tapes.',
      },
      {
        uk: 'П’ять альбомів Еда Ширана названі математичними символами: «+», «x», «÷», «=», «-». Це його впізнавана фішка.',
        ru: 'Пять альбомов Эда Ширана названы математическими символами: «+», «x», «÷», «=», «-». Это его узнаваемая фишка.',
        en: 'Five of Ed Sheeran’s albums are named after maths symbols: +, x, ÷, = and -. It is his signature idea.',
      },
    ],
  },

  'you-belong-with-me': {
    intro: {
      uk: 'Це одна з найвідоміших «шкільних» пісень у поп-музиці: про таємну симпатію, дружбу, популярність і бажання, щоб тебе помітили таким, який ти є. Тема зрозуміла кожному підліткові, тож це ідеальна нагода вивчити англійські вирази про симпатію, дружбу і стосунки. Нижче живі розмовні фрази, які постійно звучать у серіалах і фільмах про школу. Усі приклади наші власні.',
      ru: 'Это одна из самых известных «школьных» песен в поп-музыке: о тайной симпатии, дружбе, популярности и желании, чтобы тебя заметили таким, какой ты есть. Тема понятна каждому подростку, так что это идеальный повод выучить английские выражения о симпатии, дружбе и отношениях. Ниже живые разговорные фразы, которые постоянно звучат в сериалах и фильмах о школе. Все примеры наши собственные.',
      en: 'This is one of the best-known school songs in pop music: about a secret crush, friendship, popularity and wanting to be seen for who you are. Every teenager understands the topic, so it is a perfect chance to learn English expressions about crushes, friendship and relationships. Below are lively phrases you hear all the time in school series and films. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to have a crush on someone',
        m: { uk: 'бути закоханим у когось, часто таємно', ru: 'быть влюблённым в кого-то, часто тайно', en: 'have romantic feelings for someone, often secretly' },
        story: {
          uk: 'Crush буквально означає «розчавити», але в розмовній мові це сильна, часто таємна симпатія. Найчастіше так кажуть про підлітків або про перше кохання. Вираз легкий і не дуже серйозний, на відміну від be in love.',
          ru: 'Crush буквально значит «раздавить», но в разговорной речи это сильная, часто тайная симпатия. Чаще всего так говорят о подростках или о первой любви. Выражение лёгкое и не очень серьёзное, в отличие от be in love.',
          en: 'Crush literally means to squash, but in everyday English it is a strong, often secret, liking for someone. It is mostly used about teenagers or first love. It is lighter and less serious than be in love.',
        },
        ex: ['I had a crush on my maths teacher in fifth grade.', 'Does Sam have a crush on you? He’s always smiling at you!'],
        similar: ['to fancy someone', 'to be into someone'],
        tip: {
          uk: 'Прийменник on: have a crush on someone. Також кажуть my crush, тобто людина, у яку закоханий.',
          ru: 'Предлог on: have a crush on someone. Также говорят my crush, то есть человек, в которого влюблён.',
          en: 'Use on: have a crush on someone. People also say my crush, meaning the person you like.',
        },
      },
      {
        en: 'the girl next door',
        m: { uk: 'проста, мила дівчина з сусіднього дому', ru: 'простая милая девушка из соседнего дома', en: 'a friendly, natural, ordinary girl' },
        story: {
          uk: 'Це не лише сусідка, а образ: щира, проста, природна дівчина без зіркових манер. Так часто описують героїнь романтичних фільмів і навіть акторок. Є і чоловічий варіант: the boy next door.',
          ru: 'Это не только соседка, а образ: искренняя, простая, естественная девушка без звёздных манер. Так часто описывают героинь романтических фильмов и даже актрис. Есть и мужской вариант: the boy next door.',
          en: 'It is not just a neighbour but a type: a sincere, simple, natural girl with no star attitude. People often describe heroines of romantic films and even actresses like this. There is a male version too: the boy next door.',
        },
        ex: ['Everyone loves her because she’s the girl next door type.', 'In the film, the rock star falls for the girl next door.'],
        similar: ['down-to-earth', 'the boy next door'],
        tip: {
          uk: 'Перед іменником пишуть через дефіси: a girl-next-door look.',
          ru: 'Перед существительным пишут через дефисы: a girl-next-door look.',
          en: 'Before a noun use hyphens: a girl-next-door look.',
        },
      },
      {
        en: 'the friend zone',
        m: { uk: '«френдзона», коли тебе бачать лише другом', ru: '«френдзона», когда тебя видят только другом', en: 'a situation where someone sees you only as a friend' },
        story: {
          uk: 'Сучасний розмовний вираз із серіалів. Якщо ти in the friend zone, людина, яка тобі подобається, вважає тебе лише другом. Є й дієслово to friend-zone someone. Тема дуже близька до сюжету пісні.',
          ru: 'Современное разговорное выражение из сериалов. Если ты in the friend zone, человек, который тебе нравится, считает тебя только другом. Есть и глагол to friend-zone someone. Тема очень близка к сюжету песни.',
          en: 'A modern informal phrase from TV series. If you are in the friend zone, the person you like sees you only as a friend. There is also a verb, to friend-zone someone. The topic is very close to the story of the song.',
        },
        ex: ['He’s been in the friend zone for two years.', 'I think she friend-zoned me.'],
        similar: ['just friends', 'to see someone as a friend'],
        tip: {
          uk: 'Розмовне слово, вживайте його з друзями, а не в офіційному листі.',
          ru: 'Разговорное слово, используйте его с друзьями, а не в официальном письме.',
          en: 'It is informal, so use it with friends, not in formal writing.',
        },
      },
      {
        en: 'to be out of someone’s league',
        m: { uk: 'бути «не по зубах» комусь', ru: 'быть «не по зубам» кому-то', en: 'seem too attractive, popular or successful for someone' },
        story: {
          uk: 'League це спортивна ліга. Якщо людина out of your league, вона ніби грає у вищій лізі: здається занадто популярною чи успішною для тебе. Часто це лише страх, а не правда, як і в багатьох шкільних історіях.',
          ru: 'League это спортивная лига. Если человек out of your league, он будто играет в высшей лиге: кажется слишком популярным или успешным для тебя. Часто это лишь страх, а не правда, как и во многих школьных историях.',
          en: 'A league is a sports division. If someone is out of your league, they seem to play in a higher division: too popular or successful for you. Often it is just a fear, not the truth, as in many school stories.',
        },
        ex: ['Don’t be silly, she isn’t out of your league.', 'He thought the captain of the team was out of his league.'],
        similar: ['to be way above someone', 'to be too good for someone'],
        tip: {
          uk: 'Займенник змінюється: out of my league, out of his league.',
          ru: 'Местоимение меняется: out of my league, out of his league.',
          en: 'Change the pronoun: out of my league, out of his league.',
        },
      },
      {
        en: 'to be on the same wavelength',
        m: { uk: 'бути на одній хвилі', ru: 'быть на одной волне', en: 'understand each other easily and think in a similar way' },
        story: {
          uk: 'Як два радіоприймачі на одній частоті, двоє людей легко розуміють одне одного. Вираз ідеально описує дружбу, де не треба багато пояснювати. Героїня пісні вірить, що саме вона на одній хвилі з хлопцем.',
          ru: 'Как два радиоприёмника на одной частоте, два человека легко понимают друг друга. Выражение идеально описывает дружбу, где не нужно много объяснять. Героиня песни верит, что именно она на одной волне с парнем.',
          en: 'Like two radios on the same frequency, two people understand each other easily. The phrase describes a friendship where you don’t need to explain much. The girl in the song believes she is the one on his wavelength.',
        },
        ex: ['My best friend and I are always on the same wavelength.', 'We weren’t on the same wavelength, so the project was hard.'],
        similar: ['to click with someone', 'to see eye to eye'],
        tip: {
          uk: 'Wavelength пишемо одним словом.',
          ru: 'Wavelength пишем одним словом.',
          en: 'Write wavelength as one word.',
        },
      },
      {
        en: 'to have a lot in common',
        m: { uk: 'мати багато спільного', ru: 'иметь много общего', en: 'share many interests or qualities' },
        story: {
          uk: 'In common означає «спільне». Цю фразу кажуть, коли в людей схожі хобі, смаки чи погляди. Вона нейтральна і корисна в будь-якій розмові про друзів. Протилежне: have nothing in common.',
          ru: 'In common значит «общее». Эту фразу говорят, когда у людей похожие хобби, вкусы или взгляды. Она нейтральная и полезна в любом разговоре о друзьях. Противоположное: have nothing in common.',
          en: 'In common means shared. We say this when people have similar hobbies, tastes or opinions. It is neutral and useful in any conversation about friends. The opposite is have nothing in common.',
        },
        ex: ['We have a lot in common: we both love music and cats.', 'They have nothing in common, but they are great friends.'],
        similar: ['to share interests', 'to be alike'],
        tip: {
          uk: 'Можна змінювати кількість: a lot, a bit, nothing, something in common.',
          ru: 'Можно менять количество: a lot, a bit, nothing, something in common.',
          en: 'You can change the amount: a lot, a bit, nothing, something in common.',
        },
      },
      {
        en: 'to get on like a house on fire',
        m: { uk: 'чудово порозумітися', ru: 'отлично поладить', en: 'become friends very quickly and easily' },
        story: {
          uk: 'Звучить дивно, але цей британський вираз дуже позитивний. Як вогонь швидко охоплює будинок, так і дружба розгоряється дуже швидко. Його кажуть про людей, які щойно познайомилися і вже не можуть наговоритися.',
          ru: 'Звучит странно, но это британское выражение очень позитивное. Как огонь быстро охватывает дом, так и дружба разгорается очень быстро. Его говорят о людях, которые только познакомились и уже не могут наговориться.',
          en: 'It sounds strange, but this British phrase is very positive. Just as fire spreads quickly through a house, a friendship grows very fast. People say it about people who have just met and can’t stop talking.',
        },
        ex: ['My new neighbour and I got on like a house on fire.', 'The two dogs got on like a house on fire.'],
        similar: ['to hit it off', 'to get along well'],
        tip: {
          uk: 'В американській англійській частіше кажуть get along, а в британській get on.',
          ru: 'В американском английском чаще говорят get along, а в британском get on.',
          en: 'Americans usually say get along; British people say get on.',
        },
      },
      {
        en: 'to make the first move',
        m: { uk: 'зробити перший крок', ru: 'сделать первый шаг', en: 'be the first to show interest or start something' },
        story: {
          uk: 'Move тут означає «хід», як у шахах. Make the first move кажуть про того, хто першим зізнається в симпатії, запрошує на побачення або мириться після сварки. Для багатьох це найважча частина.',
          ru: 'Move здесь значит «ход», как в шахматах. Make the first move говорят о том, кто первым признаётся в симпатии, приглашает на свидание или мирится после ссоры. Для многих это самая трудная часть.',
          en: 'Move here means a turn, like in chess. Make the first move is about the person who first shows they like someone, asks them out or makes peace after a fight. For many people it is the hardest part.',
        },
        ex: ['She was too shy to make the first move.', 'After our argument, I decided to make the first move and call him.'],
        similar: ['to take the first step', 'to break the ice'],
        tip: {
          uk: 'Вживаємо з the: make the first move.',
          ru: 'Используем с the: make the first move.',
          en: 'Use the: make the first move.',
        },
      },
      {
        en: 'opposites attract',
        m: { uk: 'протилежності притягуються', ru: 'противоположности притягиваются', en: 'very different people are often drawn to each other' },
        story: {
          uk: 'Цей вираз прийшов із фізики: різні полюси магніту притягуються. Про людей так кажуть, коли тихий і гучний, спортсмен і ботанік раптом стають друзями чи парою. У пісні героїня якраз заперечує цю ідею: їй здається, що з хлопцем у них багато спільного.',
          ru: 'Это выражение пришло из физики: разные полюса магнита притягиваются. О людях так говорят, когда тихий и громкий, спортсмен и ботаник вдруг становятся друзьями или парой. В песне героиня как раз спорит с этой идеей: ей кажется, что у неё с парнем много общего.',
          en: 'This phrase comes from physics: opposite poles of a magnet attract. We say it when a quiet person and a loud one, or an athlete and a nerd, become friends or a couple. In the song the girl argues against this idea: she thinks she and the boy have a lot in common.',
        },
        ex: ['He loves football and she loves books. Opposites attract!', 'Do you think opposites attract, or do similar people get on better?'],
        similar: ['chalk and cheese', 'to complement each other'],
        tip: {
          uk: 'Це повне речення, дієслово attract без -s, бо opposites у множині.',
          ru: 'Это полное предложение, глагол attract без -s, потому что opposites во множественном числе.',
          en: 'It is a full sentence; attract has no -s because opposites is plural.',
        },
      },
      {
        en: 'to see someone for who they really are',
        m: { uk: 'бачити людину справжньою', ru: 'видеть человека настоящим', en: 'understand what someone is truly like inside' },
        story: {
          uk: 'Головна ідея багатьох шкільних історій: справжній друг бачить не імідж, а людину. Вираз трохи емоційний, його часто кажуть про кохання і дружбу. Він протиставляє зовнішню популярність і справжній характер.',
          ru: 'Главная идея многих школьных историй: настоящий друг видит не имидж, а человека. Выражение немного эмоциональное, его часто говорят о любви и дружбе. Оно противопоставляет внешнюю популярность и настоящий характер.',
          en: 'The main idea of many school stories: a true friend sees the person, not the image. The phrase is a bit emotional and is often used about love and friendship. It contrasts outward popularity with real character.',
        },
        ex: ['A true friend sees you for who you really are.', 'Finally, the prince saw her for who she really was.'],
        similar: ['to know the real you', 'to see beyond appearances'],
        tip: {
          uk: 'Займенники змінюються: see me for who I really am, see her for who she really is.',
          ru: 'Местоимения меняются: see me for who I really am, see her for who she really is.',
          en: 'Change the pronouns: see me for who I really am, see her for who she really is.',
        },
      },
    ],
    culture: [
      {
        uk: 'Тема «скромна дівчина і популярна дівчина» дуже поширена в американських підліткових фільмах. Часто там є чирлідерки, футбольна команда і випускний бал (prom).',
        ru: 'Тема «скромная девушка и популярная девушка» очень распространена в американских подростковых фильмах. Часто там есть чирлидерши, футбольная команда и выпускной бал (prom).',
        en: 'The shy girl versus the popular girl is a very common theme in American teen films. They often include cheerleaders, a football team and the prom.',
      },
      {
        uk: 'Тейлор Свіфт починала як кантрі-співачка в Нашвіллі. «You Belong With Me» поєднує кантрі і поп, тому стала популярною серед дуже різних слухачів.',
        ru: 'Тейлор Свифт начинала как кантри-певица в Нэшвилле. «You Belong With Me» сочетает кантри и поп, поэтому стала популярной среди очень разных слушателей.',
        en: 'Taylor Swift started as a country singer in Nashville. You Belong With Me mixes country and pop, so it became popular with very different listeners.',
      },
      {
        uk: 'Тейлор перезаписала свої ранні альбоми як «Taylor’s Version», щоб володіти власними записами. Фанати часто слухають саме нові версії.',
        ru: 'Тейлор перезаписала свои ранние альбомы как «Taylor’s Version», чтобы владеть собственными записями. Фанаты часто слушают именно новые версии.',
        en: 'Taylor re-recorded her early albums as Taylor’s Version so that she could own her recordings. Fans often choose to listen to the new versions.',
      },
    ],
  },

  'unstoppable': {
    intro: {
      uk: 'Ця пісня про силу і впевненість, яку людина показує світу, навіть коли всередині їй страшно чи важко. Її часто вмикають перед змаганнями, іспитами і важливими виступами. Нижче вирази, які допоможуть англійською говорити про сміливість, мотивацію і подолання труднощів. Усі приклади наші власні.',
      ru: 'Эта песня о силе и уверенности, которую человек показывает миру, даже когда внутри ему страшно или трудно. Её часто включают перед соревнованиями, экзаменами и важными выступлениями. Ниже выражения, которые помогут по-английски говорить о смелости, мотивации и преодолении трудностей. Все примеры наши собственные.',
      en: 'This song is about the strength and confidence a person shows the world, even when they feel scared or tired inside. People often play it before competitions, exams and important performances. Below are expressions that help you talk in English about courage, motivation and overcoming difficulties. All the examples are our own.',
    },
    phrases: [
      {
        en: 'to put on a brave face',
        m: { uk: 'триматися, не показувати страху', ru: 'держаться, не показывать страха', en: 'look calm and strong when you are worried or sad' },
        story: {
          uk: 'Буквально «надягти сміливе обличчя», ніби маску. Так кажуть про людину, яка не показує хвилювання чи суму. Вираз співчутливий: ми розуміємо, що всередині їй непросто. Він добре передає настрій пісні.',
          ru: 'Буквально «надеть смелое лицо», будто маску. Так говорят о человеке, который не показывает волнения или грусти. Выражение сочувственное: мы понимаем, что внутри ему непросто. Оно хорошо передаёт настроение песни.',
          en: 'Literally to put on a brave face, like a mask. We say it about someone who doesn’t show they are worried or sad. It is sympathetic: we know it is hard for them inside. It matches the mood of the song well.',
        },
        ex: ['She put on a brave face at the hospital.', 'He was nervous before the match but put on a brave face.'],
        similar: ['to keep a stiff upper lip', 'to grin and bear it'],
        tip: {
          uk: 'Можна сказати і put a brave face on it.',
          ru: 'Можно сказать и put a brave face on it.',
          en: 'You can also say put a brave face on it.',
        },
      },
      {
        en: 'to believe in yourself',
        m: { uk: 'вірити в себе', ru: 'верить в себя', en: 'trust your own abilities' },
        story: {
          uk: 'Мабуть, найпопулярніша мотиваційна фраза англійською. Believe in означає довіряти комусь чи чомусь. Її кажуть учителі, тренери, батьки, і вона постійно звучить у фільмах про спорт.',
          ru: 'Пожалуй, самая популярная мотивационная фраза по-английски. Believe in значит доверять кому-то или чему-то. Её говорят учителя, тренеры, родители, и она постоянно звучит в фильмах о спорте.',
          en: 'Perhaps the most popular motivational phrase in English. Believe in means to trust someone or something. Teachers, coaches and parents say it, and it is everywhere in sports films.',
        },
        ex: ['If you believe in yourself, you can learn anything.', 'My coach taught me to believe in myself.'],
        similar: ['to trust yourself', 'to have faith in yourself'],
        tip: {
          uk: 'Believe someone означає «вірити словам людини», а believe in someone «вірити в людину, в її сили».',
          ru: 'Believe someone значит «верить словам человека», а believe in someone «верить в человека, в его силы».',
          en: 'Believe someone means to think they are telling the truth; believe in someone means to trust their abilities.',
        },
      },
      {
        en: 'to push through',
        m: { uk: 'витримати, пробитися крізь труднощі', ru: 'выдержать, пробиться сквозь трудности', en: 'keep going until you finish something hard' },
        story: {
          uk: 'Push означає «штовхати». Push through кажуть, коли треба продовжувати попри втому, біль чи страх. Вираз часто звучить у спорті, але ним можна описати і підготовку до іспитів.',
          ru: 'Push значит «толкать». Push through говорят, когда нужно продолжать несмотря на усталость, боль или страх. Выражение часто звучит в спорте, но им можно описать и подготовку к экзаменам.',
          en: 'Push means to press forward. Push through is used when you must keep going despite tiredness, pain or fear. It is common in sport, but you can also use it about exam preparation.',
        },
        ex: ['I was exhausted, but I pushed through and finished the race.', 'Push through the last week of exams, then you can rest.'],
        similar: ['to keep going', 'to hang in there'],
        tip: {
          uk: 'Можна додати об’єкт: push through the pain, push through the tiredness.',
          ru: 'Можно добавить объект: push through the pain, push through the tiredness.',
          en: 'You can add an object: push through the pain, push through the tiredness.',
        },
      },
      {
        en: 'to rise to the challenge',
        m: { uk: 'гідно відповісти на виклик', ru: 'достойно ответить на вызов', en: 'deal successfully with a difficult situation' },
        story: {
          uk: 'Rise означає «підніматися». Якщо людина rises to the challenge, вона ніби піднімається до рівня складного завдання і справляється з ним. Вираз нейтральний, часто звучить у новинах, спортивних репортажах і на роботі.',
          ru: 'Rise значит «подниматься». Если человек rises to the challenge, он будто поднимается до уровня трудной задачи и справляется с ней. Выражение нейтральное, часто звучит в новостях, спортивных репортажах и на работе.',
          en: 'Rise means to go up. If someone rises to the challenge, they lift themselves to the level of a hard task and manage it. It is neutral and common in news, sports reports and at work.',
        },
        ex: ['The young actor rose to the challenge and played the lead role.', 'When our captain got injured, the whole team rose to the challenge.'],
        similar: ['to step up', 'to meet the challenge'],
        tip: {
          uk: 'Rise неправильне дієслово: rise, rose, risen.',
          ru: 'Rise неправильный глагол: rise, rose, risen.',
          en: 'Rise is irregular: rise, rose, risen.',
        },
      },
      {
        en: 'to fake it till you make it',
        m: { uk: 'вдавай упевненість, поки вона не з’явиться', ru: 'изображай уверенность, пока она не появится', en: 'act confident until you really become confident' },
        story: {
          uk: 'Популярна англійська порада: якщо ти ще не впевнений(а), поводься так, ніби вже впевнений(а), і поступово так і станеться. Вираз римований і легко запам’ятовується. Він дуже пасує до теми пісні про силу, яку показуєш назовні.',
          ru: 'Популярный английский совет: если ты ещё не уверен(а), веди себя так, будто уже уверен(а), и постепенно так и будет. Выражение рифмованное и легко запоминается. Оно очень подходит к теме песни о силе, которую показываешь снаружи.',
          en: 'A popular piece of English advice: if you are not confident yet, act as if you are, and slowly it will become true. It rhymes and is easy to remember. It fits the song’s theme of showing strength on the outside.',
        },
        ex: ['I was scared of public speaking, so I decided to fake it till I made it.', 'Fake it till you make it: smile, stand tall and start.'],
        similar: ['to act the part', 'to put on a brave face'],
        tip: {
          uk: 'Till тут розмовна форма until. У письмі можна писати until.',
          ru: 'Till здесь разговорная форма until. В письме можно писать until.',
          en: 'Till is an informal form of until. In writing you can use until.',
        },
      },
      {
        en: 'to keep your chin up',
        m: { uk: 'не падати духом', ru: 'не падать духом', en: 'stay positive in a difficult situation' },
        story: {
          uk: 'Коли людина сумна, вона опускає голову. Тримати підборіддя високо означає не здаватися і зберігати гідність. Часто кажуть коротко: Chin up! Це тепле підбадьорення для друга.',
          ru: 'Когда человек грустит, он опускает голову. Держать подбородок высоко значит не сдаваться и сохранять достоинство. Часто говорят коротко: Chin up! Это тёплое ободрение для друга.',
          en: 'When people are sad, they look down. Keeping your chin up means not giving up and staying proud. People often just say Chin up! It is a warm way to encourage a friend.',
        },
        ex: ['Keep your chin up, the next test will go better.', 'Chin up! Everyone makes mistakes.'],
        similar: ['to stay positive', 'to look on the bright side'],
        tip: {
          uk: 'Займенник змінюється: keep your chin up, she kept her chin up.',
          ru: 'Местоимение меняется: keep your chin up, she kept her chin up.',
          en: 'Change the pronoun: keep your chin up, she kept her chin up.',
        },
      },
      {
        en: 'to be on a roll',
        m: { uk: 'бути на хвилі успіху', ru: 'быть на волне успеха', en: 'have several successes one after another' },
        story: {
          uk: 'Уявіть м’яч, який котиться й не зупиняється. Be on a roll означає, що все вдається одне за одним: перемоги, гарні оцінки, вдалі дні. Розмовний і бадьорий вираз, підходить до відчуття «мене не зупинити».',
          ru: 'Представьте мяч, который катится и не останавливается. Be on a roll значит, что всё получается одно за другим: победы, хорошие оценки, удачные дни. Разговорное и бодрое выражение, подходит к ощущению «меня не остановить».',
          en: 'Imagine a ball that keeps rolling and doesn’t stop. Be on a roll means that things keep going well: wins, good marks, great days. It is informal and energetic and fits the feeling that nothing can stop you.',
        },
        ex: ['Our team is on a roll, we’ve won five games in a row.', 'I got three A’s this week. I’m on a roll!'],
        similar: ['to be on fire', 'to be on a winning streak'],
        tip: {
          uk: 'Не плутайте з a roll (булочка). Тут обов’язково on a roll.',
          ru: 'Не путайте с a roll (булочка). Здесь обязательно on a roll.',
          en: 'Don’t confuse it with a roll (bread). The phrase is always on a roll.',
        },
      },
      {
        en: 'to step out of your comfort zone',
        m: { uk: 'вийти із зони комфорту', ru: 'выйти из зоны комфорта', en: 'try something new that feels difficult or scary' },
        story: {
          uk: 'Comfort zone це ситуації, де нам спокійно і звично. Вийти з неї означає спробувати нове: виступити на сцені, заговорити англійською, піти в нову секцію. Саме так, крок за кроком, з’являється впевненість.',
          ru: 'Comfort zone это ситуации, где нам спокойно и привычно. Выйти из неё значит попробовать новое: выступить на сцене, заговорить по-английски, пойти в новую секцию. Именно так, шаг за шагом, появляется уверенность.',
          en: 'Your comfort zone is where you feel safe and used to things. Stepping out of it means trying something new: performing on stage, speaking English, joining a new club. This is how confidence grows, step by step.',
        },
        ex: ['Speaking English with a native speaker took me out of my comfort zone.', 'Step out of your comfort zone and join the drama club.'],
        similar: ['to take a risk', 'to challenge yourself'],
        tip: {
          uk: 'Можна сказати й get out of your comfort zone або leave your comfort zone.',
          ru: 'Можно сказать и get out of your comfort zone или leave your comfort zone.',
          en: 'You can also say get out of or leave your comfort zone.',
        },
      },
      {
        en: 'to go the extra mile',
        m: { uk: 'докласти більше зусиль, ніж треба', ru: 'приложить больше усилий, чем нужно', en: 'do more than people expect' },
        story: {
          uk: 'Буквально «пройти зайву милю». Так кажуть про людей, які роблять більше, ніж від них чекають: тренуються довше, допомагають іншим, роблять роботу ідеально. Вираз позитивний, його часто вживають у школі й на роботі.',
          ru: 'Буквально «пройти лишнюю милю». Так говорят о людях, которые делают больше, чем от них ждут: тренируются дольше, помогают другим, делают работу идеально. Выражение позитивное, его часто используют в школе и на работе.',
          en: 'Literally to walk an extra mile. We say this about people who do more than expected: train longer, help others, do a perfect job. It is positive and common at school and at work.',
        },
        ex: ['Our teacher always goes the extra mile to help us.', 'If you want to win, you have to go the extra mile.'],
        similar: ['to give it your all', 'to make an extra effort'],
        tip: {
          uk: 'Вживаємо з the: go the extra mile.',
          ru: 'Используем с the: go the extra mile.',
          en: 'Use the: go the extra mile.',
        },
      },
      {
        en: 'to give up',
        m: { uk: 'здаватися', ru: 'сдаваться', en: 'stop trying' },
        story: {
          uk: 'Одне з найважливіших фразових дієслів. Give up означає перестати намагатися. Майже у всіх мотиваційних промовах звучить Never give up! Також give up something означає «кинути звичку»: give up sweets.',
          ru: 'Один из самых важных фразовых глаголов. Give up значит перестать пытаться. Почти во всех мотивационных речах звучит Never give up! Также give up something значит «бросить привычку»: give up sweets.',
          en: 'One of the most important phrasal verbs. Give up means to stop trying. Almost every motivational speech says Never give up! Give up something also means to stop a habit: give up sweets.',
        },
        ex: ['Don’t give up, you are almost at the top!', 'My dad gave up coffee last year.'],
        similar: ['to quit', 'to throw in the towel'],
        tip: {
          uk: 'Після give up дієслово з -ing: give up eating sweets.',
          ru: 'После give up глагол с -ing: give up eating sweets.',
          en: 'After give up use -ing: give up eating sweets.',
        },
      },
    ],
    culture: [
      {
        uk: 'Сія відома тим, що на виступах часто ховає обличчя за перукою або бантом. Так вона береже своє особисте життя і хоче, щоб люди зосереджувалися на музиці.',
        ru: 'Сия известна тем, что на выступлениях часто прячет лицо за париком или бантом. Так она бережёт свою личную жизнь и хочет, чтобы люди сосредотачивались на музыке.',
        en: 'Sia is known for often hiding her face behind a wig or a big bow on stage. She does it to protect her privacy and to let people focus on the music.',
      },
      {
        uk: 'Сія написала багато хітів для інших виконавців, зокрема для Ріанни та Бейонсе. Назва альбому «This Is Acting» натякає на те, що вона ніби «грає роль», виконуючи пісні.',
        ru: 'Сия написала много хитов для других исполнителей, в том числе для Рианны и Бейонсе. Название альбома «This Is Acting» намекает на то, что она будто «играет роль», исполняя песни.',
        en: 'Sia has written many hits for other singers, including Rihanna and Beyoncé. The album title This Is Acting suggests that she is playing a role when she sings the songs.',
      },
      {
        uk: 'Пісні з мотиваційними темами часто стають популярними в TikTok, бо їх легко поєднати з відео про спорт, навчання і власні досягнення.',
        ru: 'Песни с мотивационными темами часто становятся популярными в TikTok, потому что их легко сочетать с видео о спорте, учёбе и собственных достижениях.',
        en: 'Songs with motivational themes often become popular on TikTok because they are easy to match with videos about sport, study and personal achievements.',
      },
    ],
  },

  'lose-you-to-love-me': {
    intro: {
      uk: 'Ця пісня про дуже дорослу ідею: інколи, щоб полюбити себе, треба відпустити людину чи стосунки, які роблять тобі боляче. Вона дає гарний привід поговорити англійською про почуття, турботу про себе, особисті межі і внутрішній ріст. Нижче вирази, якими носії мови говорять про відновлення після складного періоду. Усі приклади наші власні.',
      ru: 'Эта песня об очень взрослой идее: иногда, чтобы полюбить себя, нужно отпустить человека или отношения, которые причиняют тебе боль. Она даёт хороший повод поговорить по-английски о чувствах, заботе о себе, личных границах и внутреннем росте. Ниже выражения, которыми носители языка говорят о восстановлении после трудного периода. Все примеры наши собственные.',
      en: 'This song is about a very grown-up idea: sometimes, to love yourself, you have to let go of a person or a relationship that hurts you. It is a good reason to talk in English about feelings, self-care, personal boundaries and growth. Below are expressions native speakers use about recovering after a hard time. All the examples are our own.',
    },
    phrases: [
      {
        en: 'self-love',
        m: { uk: 'любов до себе', ru: 'любовь к себе', en: 'respect and care for yourself' },
        story: {
          uk: 'Self- означає «себе». Self-love це не егоїзм, а вміння дбати про себе, поважати свої почуття і не дозволяти іншим тебе ображати. Слово дуже популярне в соцмережах, психології та піснях останніх років.',
          ru: 'Self- значит «себя». Self-love это не эгоизм, а умение заботиться о себе, уважать свои чувства и не позволять другим тебя обижать. Слово очень популярно в соцсетях, психологии и песнях последних лет.',
          en: 'Self- means yourself. Self-love is not selfishness; it is caring for yourself, respecting your feelings and not letting others hurt you. The word is very popular on social media, in psychology and in recent songs.',
        },
        ex: ['Self-love means getting enough sleep and saying no sometimes.', 'Her new song is all about self-love.'],
        similar: ['self-care', 'self-respect'],
        tip: {
          uk: 'Пишеться через дефіс: self-love, self-care, self-esteem.',
          ru: 'Пишется через дефис: self-love, self-care, self-esteem.',
          en: 'Write it with a hyphen: self-love, self-care, self-esteem.',
        },
      },
      {
        en: 'to put yourself first',
        m: { uk: 'ставити себе на перше місце', ru: 'ставить себя на первое место', en: 'think about your own needs before others' },
        story: {
          uk: 'Іноді люди так стараються для інших, що забувають про себе. Put yourself first означає згадати про власні потреби: відпочинок, здоров’я, мрії. Вираз звучить як порада і часто трапляється в статтях про психологію.',
          ru: 'Иногда люди так стараются для других, что забывают о себе. Put yourself first значит вспомнить о собственных потребностях: отдыхе, здоровье, мечтах. Выражение звучит как совет и часто встречается в статьях о психологии.',
          en: 'Sometimes people try so hard for others that they forget about themselves. Put yourself first means remembering your own needs: rest, health, dreams. It sounds like advice and often appears in articles about wellbeing.',
        },
        ex: ['It’s OK to put yourself first when you are tired.', 'This summer she decided to put herself first.'],
        similar: ['to take care of yourself', 'to prioritise yourself'],
        tip: {
          uk: 'Змінюйте займенник: put myself first, put herself first.',
          ru: 'Меняйте местоимение: put myself first, put herself first.',
          en: 'Change the pronoun: put myself first, put herself first.',
        },
      },
      {
        en: 'to let go',
        m: { uk: 'відпустити', ru: 'отпустить', en: 'stop holding on to someone or something' },
        story: {
          uk: 'Буквально «дозволити піти», наприклад, розтиснути руку. У переносному значенні let go означає перестати триматися за минуле, образу чи стосунки. Це одне з найважливіших фразових дієслів у розмовах про почуття.',
          ru: 'Буквально «позволить уйти», например, разжать руку. В переносном значении let go значит перестать держаться за прошлое, обиду или отношения. Это один из самых важных фразовых глаголов в разговорах о чувствах.',
          en: 'Literally to allow something to go, like opening your hand. Figuratively, let go means to stop holding on to the past, anger or a relationship. It is one of the most important phrasal verbs for talking about feelings.',
        },
        ex: ['It’s time to let go of the past.', 'She finally let go of her anger.'],
        similar: ['to move on', 'to release'],
        tip: {
          uk: 'Перед об’єктом потрібен of: let go of the past.',
          ru: 'Перед объектом нужен of: let go of the past.',
          en: 'Use of before an object: let go of the past.',
        },
      },
      {
        en: 'to heal',
        m: { uk: 'загоюватися, зцілюватися', ru: 'заживать, исцеляться', en: 'become healthy again after pain' },
        story: {
          uk: 'Heal кажуть і про рану, і про душевний біль. Після розставання чи втрати людина поступово heals, тобто відновлюється. Від цього слова походить healing (зцілення), яке часто трапляється в піснях.',
          ru: 'Heal говорят и о ране, и о душевной боли. После расставания или потери человек постепенно heals, то есть восстанавливается. От этого слова происходит healing (исцеление), которое часто встречается в песнях.',
          en: 'Heal is used for both a wound and emotional pain. After a break-up or a loss, a person slowly heals. The noun healing comes from it and is common in songs.',
        },
        ex: ['My broken arm healed in six weeks.', 'Writing in a diary helped her heal.'],
        similar: ['to recover', 'to get better'],
        tip: {
          uk: 'Не плутайте heal (зцілюватися) і heel (п’ята). Вимова однакова.',
          ru: 'Не путайте heal (исцеляться) и heel (пятка). Произношение одинаковое.',
          en: 'Don’t confuse heal and heel (the back of your foot). They sound the same.',
        },
      },
      {
        en: 'to learn the hard way',
        m: { uk: 'навчитися на власних помилках', ru: 'научиться на собственных ошибках', en: 'learn something from a painful experience' },
        story: {
          uk: 'The hard way означає «важким шляхом». Так кажуть, коли урок довелося засвоїти через неприємний досвід, а не з порад. Вираз чесний і трохи самоіронічний.',
          ru: 'The hard way значит «трудным путём». Так говорят, когда урок пришлось усвоить через неприятный опыт, а не из советов. Выражение честное и немного самоироничное.',
          en: 'The hard way means the difficult route. We say it when a lesson came from a bad experience, not from advice. It is honest and a little self-mocking.',
        },
        ex: ['I learned the hard way that you should always save your work.', 'He learned the hard way not to trust everyone online.'],
        similar: ['to learn from your mistakes', 'to learn your lesson'],
        tip: {
          uk: 'Протилежне: the easy way. Вживаємо з the: the hard way.',
          ru: 'Противоположное: the easy way. Используем с the: the hard way.',
          en: 'The opposite is the easy way. Use the: the hard way.',
        },
      },
      {
        en: 'to get closure',
        m: { uk: 'поставити крапку, відчути завершеність', ru: 'поставить точку, почувствовать завершённость', en: 'feel that something painful has finally ended' },
        story: {
          uk: 'Closure походить від close (закривати). Після розставання людям часто потрібна розмова чи пояснення, щоб остаточно закрити цю історію. Слово дуже поширене в американській розмовній мові й у серіалах.',
          ru: 'Closure происходит от close (закрывать). После расставания людям часто нужен разговор или объяснение, чтобы окончательно закрыть эту историю. Слово очень распространено в американской разговорной речи и в сериалах.',
          en: 'Closure comes from close. After a break-up people often need a conversation or an explanation to finally close that story. The word is very common in American English and TV series.',
        },
        ex: ['She needed one last talk with him to get closure.', 'Writing a letter can help you get closure.'],
        similar: ['to put something behind you', 'to close a chapter'],
        tip: {
          uk: 'Closure тут незлічуваний іменник, без артикля: get closure, need closure.',
          ru: 'Closure здесь неисчисляемое существительное, без артикля: get closure, need closure.',
          en: 'Closure is uncountable here, with no article: get closure, need closure.',
        },
      },
      {
        en: 'to set boundaries',
        m: { uk: 'встановлювати особисті межі', ru: 'устанавливать личные границы', en: 'decide what behaviour you will and won’t accept' },
        story: {
          uk: 'Boundaries буквально «кордони». У психології це правила, які ми встановлюємо для себе і для інших: що для нас нормально, а що ні. Вираз сучасний і корисний, його вживають про дружбу, родину і стосунки.',
          ru: 'Boundaries буквально «границы». В психологии это правила, которые мы устанавливаем для себя и для других: что для нас нормально, а что нет. Выражение современное и полезное, его используют о дружбе, семье и отношениях.',
          en: 'Boundaries are literally borders. In psychology they are the rules we set for ourselves and others: what is OK for us and what is not. The phrase is modern and useful for friendship, family and relationships.',
        },
        ex: ['It’s healthy to set boundaries with friends.', 'I set a boundary: no phone calls after ten.'],
        similar: ['to draw the line', 'to say no'],
        tip: {
          uk: 'Часто в множині: set boundaries, respect someone’s boundaries.',
          ru: 'Часто во множественном числе: set boundaries, respect someone’s boundaries.',
          en: 'It is often plural: set boundaries, respect someone’s boundaries.',
        },
      },
      {
        en: 'a blessing in disguise',
        m: { uk: 'не було б щастя, та нещастя допомогло', ru: 'не было бы счастья, да несчастье помогло', en: 'something bad that later turns out to be good' },
        story: {
          uk: 'Disguise означає «маскування». Blessing in disguise це «замасковане благословення»: подія, яка спершу здається поганою, а потім виявляється корисною. Так часто описують розставання, після якого людина стала щасливішою.',
          ru: 'Disguise значит «маскировка». Blessing in disguise это «замаскированное благословение»: событие, которое сначала кажется плохим, а потом оказывается полезным. Так часто описывают расставание, после которого человек стал счастливее.',
          en: 'Disguise means a costume that hides who you are. A blessing in disguise is something that seems bad at first but turns out to be good. People often describe a break-up that made them happier in this way.',
        },
        ex: ['Missing the bus was a blessing in disguise: I met my best friend at the stop.', 'Losing that job was a blessing in disguise.'],
        similar: ['every cloud has a silver lining', 'it’s for the best'],
        tip: {
          uk: 'Вживаємо з артиклем a: a blessing in disguise.',
          ru: 'Используем с артиклем a: a blessing in disguise.',
          en: 'Use a: a blessing in disguise.',
        },
      },
      {
        en: 'time heals all wounds',
        m: { uk: 'час лікує', ru: 'время лечит', en: 'pain gets smaller as time passes' },
        story: {
          uk: 'Давнє прислів’я, схоже на українське «час лікує». Його кажуть, щоб утішити людину після втрати чи розчарування. Іноді вживають коротку форму: time heals.',
          ru: 'Старая пословица, похожая на русское «время лечит». Её говорят, чтобы утешить человека после потери или разочарования. Иногда используют короткую форму: time heals.',
          en: 'An old saying that means pain becomes smaller with time. People say it to comfort someone after a loss or disappointment. Sometimes they use the short form: time heals.',
        },
        ex: ['I know it hurts now, but time heals all wounds.', 'Time heals, and now we can laugh about it.'],
        similar: ['time is a great healer', 'this too shall pass'],
        tip: {
          uk: 'Дієслово heals з -s, бо time в однині.',
          ru: 'Глагол heals с -s, потому что time в единственном числе.',
          en: 'Heals has -s because time is singular.',
        },
      },
      {
        en: 'to come out stronger',
        m: { uk: 'вийти сильнішим', ru: 'выйти сильнее', en: 'become stronger after a difficult experience' },
        story: {
          uk: 'Так кажуть, коли людина пройшла через складний період і не зламалася, а навпаки, стала сильнішою. Вираз оптимістичний і дуже поширений у спорті, бізнесі й особистих історіях.',
          ru: 'Так говорят, когда человек прошёл через трудный период и не сломался, а наоборот, стал сильнее. Выражение оптимистичное и очень распространённое в спорте, бизнесе и личных историях.',
          en: 'We say this when someone goes through a hard time and doesn’t break, but becomes stronger instead. It is optimistic and very common in sport, business and personal stories.',
        },
        ex: ['After the injury, he came out stronger than ever.', 'Every difficult year, our family comes out stronger.'],
        similar: ['to grow stronger', 'to bounce back'],
        tip: {
          uk: 'Часто додають than ever: came out stronger than ever.',
          ru: 'Часто добавляют than ever: came out stronger than ever.',
          en: 'People often add than ever: came out stronger than ever.',
        },
      },
    ],
    culture: [
      {
        uk: 'Селена Гомес відкрито говорить про турботу про психічне здоров’я. Вона заснувала проєкт Wondermind, присвячений психічному здоров’ю, і частину прибутку Rare Beauty спрямовує на цю тему.',
        ru: 'Селена Гомес открыто говорит о заботе о психическом здоровье. Она основала проект Wondermind, посвящённый психическому здоровью, и часть прибыли Rare Beauty направляет на эту тему.',
        en: 'Selena Gomez talks openly about looking after mental health. She co-founded Wondermind, a mental health platform, and Rare Beauty supports mental health causes.',
      },
      {
        uk: 'В англомовних країнах популярні слова self-care і me time: час, який людина присвячує лише собі, наприклад прогулянці, книжці чи ванні.',
        ru: 'В англоязычных странах популярны слова self-care и me time: время, которое человек посвящает только себе, например прогулке, книге или ванне.',
        en: 'In English-speaking countries the words self-care and me time are popular: time you spend only on yourself, like a walk, a book or a bath.',
      },
      {
        uk: 'Чорно-білі кліпи часто обирають для дуже особистих пісень. Без яскравих кольорів глядач більше зосереджується на голосі та емоціях.',
        ru: 'Чёрно-белые клипы часто выбирают для очень личных песен. Без ярких цветов зритель больше сосредотачивается на голосе и эмоциях.',
        en: 'Black-and-white videos are often chosen for very personal songs. Without bright colours, viewers focus more on the voice and emotions.',
      },
    ],
  },

  'someone-you-loved': {
    intro: {
      uk: 'Це сумна, але дуже щира балада про те, як важко буває після втрати близької людини. А кліп розповідає ще й історію надії: про донорство органів, яке може врятувати чиєсь життя. Тема серйозна, тож це гарна нагода вивчити англійські вирази про сум, підтримку і вдячність. Усі приклади наші власні.',
      ru: 'Это грустная, но очень искренняя баллада о том, как тяжело бывает после потери близкого человека. А клип рассказывает ещё и историю надежды: о донорстве органов, которое может спасти чью-то жизнь. Тема серьёзная, поэтому это хороший повод выучить английские выражения о грусти, поддержке и благодарности. Все примеры наши собственные.',
      en: 'This is a sad but very honest ballad about how hard life can be after losing someone close. The video also tells a story of hope about organ donation, which can save someone’s life. The topic is serious, so it is a good chance to learn English expressions about sadness, support and gratitude. All the examples are our own.',
    },
    phrases: [
      {
        en: 'heartbroken',
        m: { uk: 'з розбитим серцем', ru: 'с разбитым сердцем', en: 'extremely sad, especially because of love or loss' },
        story: {
          uk: 'Як і в українській, в англійській серце «розбивається» від горя. Heartbroken кажуть не лише про кохання, а й про втрату друга, домашньої тварини чи важливу поразку. Слово сильне й емоційне.',
          ru: 'Как и в русском, в английском сердце «разбивается» от горя. Heartbroken говорят не только о любви, но и о потере друга, домашнего животного или важном поражении. Слово сильное и эмоциональное.',
          en: 'In English, as in many languages, a heart can break from sadness. Heartbroken is used not only about love but also about losing a friend, a pet or an important match. It is a strong, emotional word.',
        },
        ex: ['The fans were heartbroken when the band split up.', 'She was heartbroken when her cat ran away.'],
        similar: ['devastated', 'crushed'],
        tip: {
          uk: 'Є іменник heartbreak: She is getting over a heartbreak.',
          ru: 'Есть существительное heartbreak: She is getting over a heartbreak.',
          en: 'There is a noun too: heartbreak. She is getting over a heartbreak.',
        },
      },
      {
        en: 'to lean on someone',
        m: { uk: 'спиратися на когось, шукати підтримки', ru: 'опираться на кого-то, искать поддержки', en: 'depend on someone for emotional support' },
        story: {
          uk: 'Lean означає «спиратися». Як ми спираємося на стіну, коли втомилися, так у важкі часи спираємося на близьких. Фразу You can lean on me кажуть, щоб запропонувати підтримку.',
          ru: 'Lean значит «опираться». Как мы опираемся на стену, когда устали, так в трудные времена опираемся на близких. Фразу You can lean on me говорят, чтобы предложить поддержку.',
          en: 'Lean means to rest your weight on something. Just as we lean on a wall when we are tired, we lean on people we love in hard times. People say You can lean on me to offer support.',
        },
        ex: ['When my grandpa was ill, I leaned on my friends.', 'You can always lean on me.'],
        similar: ['to rely on someone', 'to count on someone'],
        tip: {
          uk: 'Після lean потрібен on: lean on someone.',
          ru: 'После lean нужен on: lean on someone.',
          en: 'You need on after lean: lean on someone.',
        },
      },
      {
        en: 'a shoulder to cry on',
        m: { uk: 'людина, яка вислухає і підтримає', ru: 'человек, который выслушает и поддержит', en: 'someone who listens and comforts you' },
        story: {
          uk: 'Образ дуже теплий: людина, на плечі якої можна поплакати. Так називають справжніх друзів, які поруч у сумні моменти. Вираз часто звучить у фразах I’m here if you need a shoulder to cry on.',
          ru: 'Образ очень тёплый: человек, на плече которого можно поплакать. Так называют настоящих друзей, которые рядом в грустные моменты. Выражение часто звучит во фразе I’m here if you need a shoulder to cry on.',
          en: 'A very warm image: a person whose shoulder you can cry on. It describes real friends who are there in sad moments. You often hear it in the phrase I’m here if you need a shoulder to cry on.',
        },
        ex: ['My sister has always been a shoulder to cry on.', 'Call me if you need a shoulder to cry on.'],
        similar: ['a good listener', 'a source of comfort'],
        tip: {
          uk: 'Прийменник on стоїть у кінці: a shoulder to cry on.',
          ru: 'Предлог on стоит в конце: a shoulder to cry on.',
          en: 'On goes at the end: a shoulder to cry on.',
        },
      },
      {
        en: 'to get through something',
        m: { uk: 'пережити щось складне', ru: 'пережить что-то трудное', en: 'manage to survive a difficult experience' },
        story: {
          uk: 'Through означає «крізь». Get through something це пройти крізь складний період до кінця: хворобу, іспити, розлуку. Фраза We’ll get through this together звучить як обіцянка підтримки.',
          ru: 'Through значит «сквозь». Get through something это пройти сквозь трудный период до конца: болезнь, экзамены, разлуку. Фраза We’ll get through this together звучит как обещание поддержки.',
          en: 'Through means from one side to the other. To get through something is to go all the way through a hard time: illness, exams, being apart. We’ll get through this together sounds like a promise of support.',
        },
        ex: ['We got through the long winter together.', 'Music helped me get through exam week.'],
        similar: ['to survive', 'to pull through'],
        tip: {
          uk: 'Get through також означає «додзвонитися»: I couldn’t get through to the doctor.',
          ru: 'Get through также значит «дозвониться»: I couldn’t get through to the doctor.',
          en: 'Get through can also mean to reach someone by phone: I couldn’t get through to the doctor.',
        },
      },
      {
        en: 'to fall apart',
        m: { uk: 'розвалюватися; не витримати емоційно', ru: 'разваливаться; не выдержать эмоционально', en: 'break into pieces; lose emotional control' },
        story: {
          uk: 'Буквально fall apart кажуть про речі, які розпадаються на шматки: старе взуття, книжку. Про людину так кажуть, коли вона емоційно не витримує після важкої події. Протилежна ідея: pull yourself together, тобто зібратися.',
          ru: 'Буквально fall apart говорят о вещах, которые разваливаются на куски: старой обуви, книге. О человеке так говорят, когда он эмоционально не выдерживает после тяжёлого события. Противоположная идея: pull yourself together, то есть собраться.',
          en: 'Literally fall apart is used for things that break into pieces: old shoes, a book. About a person it means losing control of your emotions after something hard. The opposite idea is pull yourself together.',
        },
        ex: ['My old trainers are falling apart.', 'After the news, he felt like he was falling apart.'],
        similar: ['to break down', 'to go to pieces'],
        tip: {
          uk: 'Fall неправильне дієслово: fall, fell, fallen. He fell apart.',
          ru: 'Fall неправильный глагол: fall, fell, fallen. He fell apart.',
          en: 'Fall is irregular: fall, fell, fallen. He fell apart.',
        },
      },
      {
        en: 'to feel down',
        m: { uk: 'почуватися пригніченим', ru: 'чувствовать себя подавленным', en: 'feel sad or low' },
        story: {
          uk: 'В англійській сум часто описують словом down (вниз), а радість словом up (вгору). Feel down м’якше, ніж depressed, і підходить для звичайних сумних днів. Можна також сказати I’m a bit down today.',
          ru: 'В английском грусть часто описывают словом down (вниз), а радость словом up (вверх). Feel down мягче, чем depressed, и подходит для обычных грустных дней. Можно также сказать I’m a bit down today.',
          en: 'In English sadness is often down and happiness is up. Feel down is softer than depressed and suits ordinary sad days. You can also say I’m a bit down today.',
        },
        ex: ['I feel down when it rains all week.', 'You look a bit down. What’s wrong?'],
        similar: ['to feel blue', 'to be low'],
        tip: {
          uk: 'Обережно: feel up to something означає «мати сили на щось», а не «бути щасливим».',
          ru: 'Осторожно: feel up to something значит «иметь силы на что-то», а не «быть счастливым».',
          en: 'Careful: feel up to something means to have the energy for it, not to be happy.',
        },
      },
      {
        en: 'to be there for someone',
        m: { uk: 'бути поруч, підтримувати', ru: 'быть рядом, поддерживать', en: 'support someone when they need help' },
        story: {
          uk: 'Проста, але дуже важлива фраза. Be there for someone не обов’язково означає фізично бути поруч. Це про готовність вислухати, допомогти й не залишити людину саму. Її часто кажуть друзі й родичі.',
          ru: 'Простая, но очень важная фраза. Be there for someone не обязательно значит физически быть рядом. Это о готовности выслушать, помочь и не оставить человека одного. Её часто говорят друзья и родственники.',
          en: 'A simple but very important phrase. Be there for someone doesn’t always mean being in the same place. It is about being ready to listen, help and not leave someone alone. Friends and family often say it.',
        },
        ex: ['My friends were there for me when I moved schools.', 'I’ll always be there for you.'],
        similar: ['to stand by someone', 'to have someone’s back'],
        tip: {
          uk: 'Прийменник for: be there for someone, а не be there with someone.',
          ru: 'Предлог for: be there for someone, а не be there with someone.',
          en: 'Use for: be there for someone, not be there with someone.',
        },
      },
      {
        en: 'to pick up the pieces',
        m: { uk: 'зібрати себе докупи, почати знову', ru: 'собрать себя по кусочкам, начать заново', en: 'try to return to normal life after something bad' },
        story: {
          uk: 'Якщо щось розбилося, треба зібрати уламки. Так і після складної події людина поступово «збирає себе по шматочках» і повертається до звичного життя. Вираз співчутливий і образний.',
          ru: 'Если что-то разбилось, нужно собрать осколки. Так и после трудного события человек постепенно «собирает себя по кусочкам» и возвращается к привычной жизни. Выражение сочувственное и образное.',
          en: 'When something breaks, you have to pick up the pieces. In the same way, after a hard event a person slowly puts their life back together. The phrase is sympathetic and vivid.',
        },
        ex: ['After the storm, the town began to pick up the pieces.', 'It took him a year to pick up the pieces after the break-up.'],
        similar: ['to start over', 'to rebuild your life'],
        tip: {
          uk: 'Вживаємо з the: pick up the pieces.',
          ru: 'Используем с the: pick up the pieces.',
          en: 'Use the: pick up the pieces.',
        },
      },
      {
        en: 'to save a life',
        m: { uk: 'врятувати життя', ru: 'спасти жизнь', en: 'stop someone from dying' },
        story: {
          uk: 'Кліп до пісні нагадує, що донор органів може врятувати життя іншим людям. Вираз вживають про лікарів, рятувальників і просто людей, які допомогли в критичний момент. Також кажуть: You saved my life! у жартівливому значенні «ти мене дуже виручив».',
          ru: 'Клип к песне напоминает, что донор органов может спасти жизнь другим людям. Выражение используют о врачах, спасателях и просто людях, которые помогли в критический момент. Также говорят: You saved my life! в шутливом значении «ты меня очень выручил».',
          en: 'The video reminds us that an organ donor can save other people’s lives. The phrase is used about doctors, rescuers and anyone who helped at a critical moment. People also say You saved my life! as a joke, meaning you helped me a lot.',
        },
        ex: ['A quick call to the ambulance can save a life.', 'Thanks for the charger, you saved my life!'],
        similar: ['to rescue someone', 'to be a lifesaver'],
        tip: {
          uk: 'Множина: save lives. Blood donors save lives.',
          ru: 'Множественное число: save lives. Blood donors save lives.',
          en: 'The plural is save lives: Blood donors save lives.',
        },
      },
      {
        en: 'to wear your heart on your sleeve',
        m: { uk: 'не приховувати своїх почуттів', ru: 'не скрывать своих чувств', en: 'show your emotions openly' },
        story: {
          uk: 'Буквально «носити серце на рукаві», тобто так, щоб усі бачили. Так кажуть про людей, які відкрито показують емоції. Льюїса Капальді часто описують саме так: його пісні дуже щирі, а в житті він відкрито говорить про свої почуття.',
          ru: 'Буквально «носить сердце на рукаве», то есть так, чтобы все видели. Так говорят о людях, которые открыто показывают эмоции. Льюиса Капальди часто описывают именно так: его песни очень искренние, а в жизни он открыто говорит о своих чувствах.',
          en: 'Literally to wear your heart on your sleeve, where everyone can see it. We say it about people who show their emotions openly. Lewis Capaldi is often described like this: his songs are very honest, and he talks openly about his feelings.',
        },
        ex: ['My brother wears his heart on his sleeve, you always know how he feels.', 'She’s not shy about feelings, she wears her heart on her sleeve.'],
        similar: ['to be an open book', 'to be open about your feelings'],
        tip: {
          uk: 'Займенники змінюються: wears his heart on his sleeve.',
          ru: 'Местоимения меняются: wears his heart on his sleeve.',
          en: 'Change the pronouns: wears his heart on his sleeve.',
        },
      },
    ],
    culture: [
      {
        uk: 'Льюїс Капальді відомий не лише сумними баладами, а й смішними відео в соцмережах. Цей контраст між сумною музикою і веселою особистістю зробив його дуже популярним.',
        ru: 'Льюис Капальди известен не только грустными балладами, но и смешными видео в соцсетях. Этот контраст между грустной музыкой и весёлой личностью сделал его очень популярным.',
        en: 'Lewis Capaldi is known not only for sad ballads but also for funny social media videos. The contrast between his sad music and cheerful personality made him very popular.',
      },
      {
        uk: 'У Великій Британії діє система, за якою дорослі можуть заздалегідь зареєструватися як донори органів. Кампанії, як цей кліп, допомагають людям дізнатися більше і поговорити про це з родиною.',
        ru: 'В Великобритании действует система, по которой взрослые могут заранее зарегистрироваться как доноры органов. Кампании, как этот клип, помогают людям узнать больше и поговорить об этом с семьёй.',
        en: 'In the UK adults can register in advance as organ donors. Campaigns like this video help people learn more and talk about it with their families.',
      },
      {
        uk: 'Пітер Капальді грав Доктора в культовому британському серіалі «Доктор Хто». Для британських глядачів його поява в кліпі стала приємною несподіванкою.',
        ru: 'Питер Капальди играл Доктора в культовом британском сериале «Доктор Кто». Для британских зрителей его появление в клипе стало приятной неожиданностью.',
        en: 'Peter Capaldi played the Doctor in the cult British series Doctor Who. For British viewers, seeing him in the video was a nice surprise.',
      },
    ],
  },
};
