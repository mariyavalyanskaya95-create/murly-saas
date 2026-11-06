// Розбір виразів до пісень (частина B). Без цитат із текстів пісень.
import type { SongDeep } from './songs-deep';

export const DEEP_B: Record<string, SongDeep> = {
  'shallow': {
    intro: {
      uk: 'Ця пісня з фільму «Народження зірки» про момент, коли людина стоїть на краю і вирішує: залишитися там, де безпечно, чи ризикнути заради справжнього життя. Вона починається тихо, майже як розмова, а потім вибухає емоціями. Саме тому до неї так пасують англійські вирази про сміливість, ризик, страх і відвертість. Далі десять виразів, які допоможуть говорити про великі рішення так, як говорять носії.',
      ru: 'Эта песня из фильма «Звезда родилась» о моменте, когда человек стоит на краю и решает: остаться там, где безопасно, или рискнуть ради настоящей жизни. Она начинается тихо, почти как разговор, а потом взрывается эмоциями. Поэтому к ней так подходят английские выражения о смелости, риске, страхе и откровенности. Дальше десять выражений, которые помогут говорить о больших решениях так, как говорят носители.',
      en: 'This song from A Star Is Born is about the moment when a person stands at the edge and decides whether to stay where it is safe or to risk it all for a real life. It starts quietly, almost like a conversation, and then explodes with emotion. That is why English expressions about courage, risk, fear and honesty fit it so well. Here are ten expressions that will help you talk about big decisions the way native speakers do.',
    },
    phrases: [
      {
        en: 'to take the plunge',
        m: { uk: 'наважитися на рішучий крок', ru: 'решиться на важный шаг', en: 'finally decide to do something big or risky' },
        story: {
          uk: 'Буквально plunge означає стрибок у воду, різке занурення. Переносно take the plunge кажуть, коли людина довго вагалася, а потім нарешті зважилася: переїхати, змінити школу, почати власну справу. Вираз нейтральний, його можна почути і в розмові друзів, і в новинах. Він ідеально пасує до настрою пісні, де головна ідея полягає в тому, щоб залишити безпечну мілину і пірнути в невідоме.',
          ru: 'Буквально plunge означает прыжок в воду, резкое погружение. В переносном смысле take the plunge говорят, когда человек долго колебался, а потом наконец решился: переехать, сменить школу, начать своё дело. Выражение нейтральное, его можно услышать и в разговоре друзей, и в новостях. Оно идеально подходит к настроению песни, где главная идея в том, чтобы покинуть безопасное мелководье и нырнуть в неизвестность.',
          en: 'Literally, a plunge is a jump into water, a sudden dive. Figuratively, we say take the plunge when someone has hesitated for a long time and finally decides to act: to move, change schools or start a business. The expression is neutral, so you can hear it among friends and on the news. It fits the mood of the song perfectly, since its main idea is leaving the safe shallow water and diving into the unknown.',
        },
        ex: [
          'After months of thinking about it, she finally took the plunge and moved to Lviv.',
          'If you love music so much, why not take the plunge and join a band?',
        ],
        similar: ['to go for it', 'to take a leap of faith'],
        tip: {
          uk: 'Кажуть саме take the plunge, а не make the plunge чи do the plunge. Артикль the обов’язковий.',
          ru: 'Говорят именно take the plunge, а не make the plunge или do the plunge. Артикль the обязателен.',
          en: 'Say take the plunge, not make the plunge or do the plunge. The article the is required.',
        },
      },
      {
        en: 'to play it safe',
        m: { uk: 'не ризикувати, діяти обережно', ru: 'не рисковать, действовать осторожно', en: 'avoid risks and choose the safe option' },
        story: {
          uk: 'Play it safe означає обрати найбезпечніший варіант, навіть якщо він нудний. Часто вираз звучить із легким докором, ніби людина боїться спробувати щось нове. Його вживають про гроші, навчання, кар’єру, стосунки і навіть про вибір страви в ресторані. Пісня якраз протиставляє спокійне життя без ризику і сміливий крок назустріч змінам.',
          ru: 'Play it safe означает выбрать самый безопасный вариант, даже если он скучный. Часто выражение звучит с лёгким упрёком, будто человек боится попробовать что-то новое. Его употребляют о деньгах, учёбе, карьере, отношениях и даже о выборе блюда в ресторане. Песня как раз противопоставляет спокойную жизнь без риска и смелый шаг навстречу переменам.',
          en: 'Play it safe means choosing the safest option, even if it is boring. It often sounds a little critical, as if the person is afraid to try something new. People use it about money, studies, careers, relationships and even about ordering food in a restaurant. The song contrasts a calm life without risk with a brave step towards change.',
        },
        ex: [
          'I wanted to try the spicy curry, but I played it safe and ordered pizza.',
          'You can’t play it safe forever if you want to be an artist.',
          'The team played it safe in the second half and kept the score at 1:0.',
        ],
        similar: ['better safe than sorry', 'to err on the side of caution'],
        tip: {
          uk: 'Не забувайте it: play it safe. Варіант без it трапляється в британській англійській, але форма з it значно поширеніша.',
          ru: 'Не забывайте it: play it safe. Вариант без it встречается в британском английском, но форма с it гораздо распространённее.',
          en: 'Don’t forget it: play it safe. The version without it exists in British English, but the form with it is much more common.',
        },
      },
      {
        en: 'sink or swim',
        m: { uk: 'або впораєшся сам, або програєш', ru: 'либо справишься сам, либо проиграешь', en: 'succeed or fail on your own, with no help' },
        story: {
          uk: 'Цей вираз описує ситуацію, коли тобі ніхто не допомагає, і треба або швидко навчитися, або провалитися. Його часто кажуть про першу роботу, переїзд в іншу країну чи перший день у новій команді. Звучить трохи драматично, але в розмовах трапляється щодня. Водна тема пов’язує його з образами глибини й мілини, а сама ідея нагадує історію героїні фільму, яку раптом виводять на велику сцену.',
          ru: 'Это выражение описывает ситуацию, когда тебе никто не помогает, и нужно либо быстро научиться, либо провалиться. Его часто говорят о первой работе, переезде в другую страну или первом дне в новой команде. Звучит немного драматично, но в разговорах встречается каждый день. Водная тема связывает его с образами глубины и мелководья, а сама идея напоминает историю героини фильма, которую вдруг выводят на большую сцену.',
          en: 'This expression describes a situation where nobody helps you, so you either learn fast or fail. People often say it about a first job, moving to another country or a first day in a new team. It sounds a bit dramatic, but it is used every day. The water image links it to the ideas of deep and shallow water, and the idea itself reminds us of the film’s heroine, who is suddenly put on a big stage.',
        },
        ex: [
          'On my first day at the café, nobody trained me. It was sink or swim.',
          'Moving abroad alone at eighteen was a sink-or-swim experience.',
        ],
        similar: ['to learn the hard way', 'trial by fire'],
        tip: {
          uk: 'Порядок слів фіксований: sink or swim, а не swim or sink. Перед іменником пишемо через дефіс: a sink-or-swim situation.',
          ru: 'Порядок слов фиксированный: sink or swim, а не swim or sink. Перед существительным пишем через дефис: a sink-or-swim situation.',
          en: 'The word order is fixed: sink or swim, not swim or sink. Before a noun, use hyphens: a sink-or-swim situation.',
        },
      },
      {
        en: 'to get cold feet',
        m: { uk: 'злякатися в останній момент', ru: 'испугаться в последний момент', en: 'suddenly become too nervous to do something' },
        story: {
          uk: 'Get cold feet кажуть, коли людина вже майже зробила щось важливе, а потім раптом злякалася: перед виступом, співбесідою чи важливою розмовою. Вираз розмовний і дуже поширений. Холодні ноги тут символ страху, який зупиняє тебе за крок до мети. Пісня про протилежне: про момент, коли страх є, але ти все одно робиш крок уперед.',
          ru: 'Get cold feet говорят, когда человек уже почти сделал что-то важное, а потом вдруг испугался: перед выступлением, собеседованием или важным разговором. Выражение разговорное и очень распространённое. Холодные ноги здесь символ страха, который останавливает тебя в шаге от цели. Песня о противоположном: о моменте, когда страх есть, но ты всё равно делаешь шаг вперёд.',
          en: 'We say get cold feet when someone has almost done something important and then suddenly gets scared: before a performance, an interview or a serious talk. It is informal and very common. Cold feet are a symbol of the fear that stops you one step from your goal. The song is about the opposite: the moment when you feel afraid but step forward anyway.',
        },
        ex: [
          'He was going to sing at the school concert, but he got cold feet at the last minute.',
          'Don’t get cold feet now, you have practised for weeks!',
        ],
        similar: ['to chicken out', 'to lose your nerve'],
        tip: {
          uk: 'Не перекладайте дослівно «замерзли ноги»: це не про холод, а про страх. Кажуть get cold feet, а не have cold legs.',
          ru: 'Не переводите дословно «замёрзли ноги»: это не о холоде, а о страхе. Говорят get cold feet, а не have cold legs.',
          en: 'Don’t translate it word for word: it is about fear, not cold weather. Say get cold feet, not have cold legs.',
        },
      },
      {
        en: 'to open up (to someone)',
        m: { uk: 'відкритися, розповісти про свої почуття', ru: 'открыться, рассказать о своих чувствах', en: 'start talking honestly about your feelings' },
        story: {
          uk: 'Open up означає перестати ховати емоції й чесно поговорити з кимось про те, що в тебе на душі. Його вживають про друзів, родину, психологів і стосунки. Носії часто кажуть It took him a long time to open up, тобто людині знадобився час, щоб довіритися. Пісня побудована як щира розмова двох людей, які наважуються бути чесними, тому це фразове дієслово тут дуже до речі.',
          ru: 'Open up означает перестать прятать эмоции и честно поговорить с кем-то о том, что у тебя на душе. Его употребляют о друзьях, семье, психологах и отношениях. Носители часто говорят It took him a long time to open up, то есть человеку понадобилось время, чтобы довериться. Песня построена как искренний разговор двух людей, которые решаются быть честными, поэтому этот фразовый глагол здесь очень к месту.',
          en: 'Open up means to stop hiding your emotions and talk honestly with someone about what is on your mind. People use it about friends, family, therapists and relationships. Native speakers often say It took him a long time to open up, meaning he needed time to trust others. The song is built like an honest conversation between two people who dare to be sincere, so this phrasal verb fits it well.',
        },
        ex: [
          'It’s hard for me to open up to new people.',
          'She finally opened up about why she was so quiet at school.',
        ],
        similar: ['to let someone in', 'to pour your heart out'],
        tip: {
          uk: 'Після open up вживаємо to (кому) і about (про що): open up to my mum about school. Open to something без up має інше значення: бути відкритим до чогось.',
          ru: 'После open up употребляем to (кому) и about (о чём): open up to my mum about school. Open to something без up имеет другое значение: быть открытым к чему-то.',
          en: 'Use to for the person and about for the topic: open up to my mum about school. Open to something without up means something else: willing to consider it.',
        },
      },
      {
        en: 'to wear your heart on your sleeve',
        m: { uk: 'не ховати почуттів, усе показувати відкрито', ru: 'не скрывать чувств, всё показывать открыто', en: 'show your feelings openly' },
        story: {
          uk: 'Так кажуть про людину, чиї емоції одразу видно: якщо вона сумна чи щаслива, це знають усі навколо. Схожий образ використав Шекспір у п’єсі «Отелло», і відтоді вираз став звичним в англійській мові. Він може звучати і як комплімент щирості, і як попередження, що людину легко поранити. Пісня теж про сміливість показати справжні почуття, навіть коли це страшно.',
          ru: 'Так говорят о человеке, чьи эмоции сразу видны: если он грустит или счастлив, это знают все вокруг. Похожий образ использовал Шекспир в пьесе «Отелло», и с тех пор выражение стало привычным в английском языке. Оно может звучать и как комплимент искренности, и как предупреждение, что человека легко ранить. Песня тоже о смелости показать настоящие чувства, даже когда это страшно.',
          en: 'We say this about a person whose emotions are easy to see: if they are sad or happy, everyone around knows it. Shakespeare used a similar image in Othello, and the phrase has been common in English ever since. It can sound like a compliment on honesty or like a warning that the person is easy to hurt. The song is also about the courage to show real feelings, even when it is scary.',
        },
        ex: [
          'My little brother wears his heart on his sleeve, you always know how he feels.',
          'As a teacher, you sometimes can’t wear your heart on your sleeve.',
        ],
        similar: ['to be an open book', 'to speak from the heart'],
        tip: {
          uk: 'Займенник змінюється разом із людиною: wear my/his/her heart on my/his/her sleeve. Не кажіть the heart on the sleeve.',
          ru: 'Местоимение меняется вместе с человеком: wear my/his/her heart on my/his/her sleeve. Не говорите the heart on the sleeve.',
          en: 'The pronoun changes with the person: wear my/his/her heart on my/his/her sleeve. Don’t say the heart on the sleeve.',
        },
      },
      {
        en: 'stage fright',
        m: { uk: 'страх сцени, хвилювання перед виступом', ru: 'страх сцены, волнение перед выступлением', en: 'fear of performing in front of people' },
        story: {
          uk: 'Stage fright це сильне хвилювання перед публікою: тремтять руки, пересихає в роті, хочеться втекти. Його відчувають навіть відомі артисти, і вони часто відверто говорять про це в інтерв’ю. Слово вживають не лише про сцену, а й про будь-який публічний виступ, наприклад доповідь у класі. Фільм «Народження зірки» показує, як героїня вперше виходить до великої аудиторії, тож тема страху сцени тут цілком природна.',
          ru: 'Stage fright это сильное волнение перед публикой: дрожат руки, пересыхает во рту, хочется убежать. Его испытывают даже известные артисты, и они часто откровенно говорят об этом в интервью. Слово употребляют не только о сцене, но и о любом публичном выступлении, например докладе в классе. Фильм «Звезда родилась» показывает, как героиня впервые выходит к большой аудитории, так что тема страха сцены здесь вполне естественна.',
          en: 'Stage fright is strong nervousness in front of an audience: your hands shake, your mouth goes dry and you want to run away. Even famous performers feel it, and many talk about it openly in interviews. The word is used not only about the stage but about any public speaking, like a presentation in class. A Star Is Born shows its heroine facing a huge audience for the first time, so the topic of stage fright feels natural here.',
        },
        ex: [
          'I always get stage fright before a presentation.',
          'Many famous singers say they still have stage fright before every show.',
        ],
        similar: ['butterflies in your stomach', 'the jitters'],
        tip: {
          uk: 'Кажуть have/get stage fright без артикля: I have stage fright, а не I have a stage fright.',
          ru: 'Говорят have/get stage fright без артикля: I have stage fright, а не I have a stage fright.',
          en: 'Use it without an article: I have stage fright, not I have a stage fright.',
        },
      },
      {
        en: 'to get your big break',
        m: { uk: 'отримати свій великий шанс', ru: 'получить свой большой шанс', en: 'get the opportunity that starts your success' },
        story: {
          uk: 'Big break означає перший серйозний успіх, після якого кар’єра злітає: роль у фільмі, контракт зі студією, вірусне відео. Вираз дуже популярний у світі кіно, музики та спорту. Часто кажуть waiting for my big break, тобто чекати свого шансу. «Народження зірки» по суті є історією про великий шанс, який змінює все життя.',
          ru: 'Big break означает первый серьёзный успех, после которого карьера взлетает: роль в фильме, контракт со студией, вирусное видео. Выражение очень популярно в мире кино, музыки и спорта. Часто говорят waiting for my big break, то есть ждать своего шанса. «Звезда родилась» по сути история о большом шансе, который меняет всю жизнь.',
          en: 'A big break is the first serious success that makes a career take off: a film role, a record deal, a viral video. The expression is very popular in film, music and sport. People often say waiting for my big break, meaning waiting for their chance. A Star Is Born is basically a story about a big break that changes a whole life.',
        },
        ex: [
          'She got her big break when a famous director saw her video online.',
          'Every young actor in this city is waiting for their big break.',
        ],
        similar: ['a lucky break', 'to make it big'],
        tip: {
          uk: 'Break тут іменник «шанс», а не «перерва». Не плутайте з take a break, тобто відпочити.',
          ru: 'Break здесь существительное «шанс», а не «перерыв». Не путайте с take a break, то есть отдохнуть.',
          en: 'Here break means a chance, not a pause. Don’t confuse it with take a break, which means to rest.',
        },
      },
      {
        en: 'to go all in',
        m: { uk: 'викластися повністю, ризикнути всім', ru: 'выложиться полностью, рискнуть всем', en: 'commit completely to something' },
        story: {
          uk: 'Вираз прийшов із карткової гри покер, де all in означає поставити все, що маєш. Зараз go all in вживають набагато ширше: про проєкт, хобі, навчання чи стосунки, коли людина віддає справі всю енергію без запасного плану. Звучить розмовно і енергійно. Він передає головну думку пісні: якщо вже пірнати, то на повну.',
          ru: 'Выражение пришло из карточной игры покер, где all in означает поставить всё, что у тебя есть. Сейчас go all in употребляют гораздо шире: о проекте, хобби, учёбе или отношениях, когда человек отдаёт делу всю энергию без запасного плана. Звучит разговорно и энергично. Оно передаёт главную мысль песни: если уж нырять, то по-настоящему.',
          en: 'The phrase comes from the card game poker, where all in means betting everything you have. Today go all in is used much more widely: about a project, a hobby, studies or a relationship, when someone gives it all their energy with no plan B. It sounds informal and energetic. It captures the main idea of the song: if you dive, dive all the way.',
        },
        ex: [
          'If you want to pass the exam, you have to go all in for the next month.',
          'They went all in on their idea and opened a small bakery.',
        ],
        similar: ['to give it your all', 'to put your heart into it'],
        tip: {
          uk: 'Не плутайте з all in all, що означає «загалом, підсумовуючи». Go all in про повну віддачу.',
          ru: 'Не путайте с all in all, что значит «в целом, подводя итог». Go all in о полной отдаче.',
          en: 'Don’t confuse it with all in all, which means overall or in summary. Go all in is about full commitment.',
        },
      },
      {
        en: 'to be in over your head',
        m: { uk: 'взятися за надто складне і не впоратися', ru: 'взяться за слишком сложное и не справиться', en: 'be in a situation that is too difficult for you' },
        story: {
          uk: 'Буквально це коли вода вище твоєї голови, тобто ти вже не дістаєш дна. Переносно так кажуть, коли ситуація стала складнішою, ніж ти очікував, і ти не справляєшся. Вираз нейтрально-розмовний, часто звучить у формі I think I’m in over my head. Він продовжує водну тему пісні і нагадує, що глибина буває не лише захопливою, а й страшною.',
          ru: 'Буквально это когда вода выше твоей головы, то есть ты уже не достаёшь дна. В переносном смысле так говорят, когда ситуация стала сложнее, чем ты ожидал, и ты не справляешься. Выражение нейтрально-разговорное, часто звучит в форме I think I’m in over my head. Оно продолжает водную тему песни и напоминает, что глубина бывает не только захватывающей, но и страшной.',
          en: 'Literally, it is when the water is above your head and you can no longer touch the bottom. Figuratively, we say it when a situation has become harder than you expected and you can’t cope. It is neutral and conversational, often in the form I think I’m in over my head. It continues the water theme of the song and reminds us that deep water can be scary as well as exciting.',
        },
        ex: [
          'I agreed to organise the whole party, but now I’m in over my head.',
          'He signed up for three extra courses and was soon in over his head.',
        ],
        similar: ['out of your depth', 'to bite off more than you can chew'],
        tip: {
          uk: 'Займенник змінюється: in over my/your/her head. Слово over обов’язкове, без нього значення губиться.',
          ru: 'Местоимение меняется: in over my/your/her head. Слово over обязательно, без него смысл теряется.',
          en: 'The pronoun changes: in over my/your/her head. The word over is required, or the meaning is lost.',
        },
      },
    ],
    culture: [
      {
        uk: '«Народження зірки» 2018 року це вже четверта велика версія цієї історії в Голлівуді. Попередні фільми виходили у 1937, 1954 і 1976 роках, а у версії 1976 року головну роль зіграла Барбра Стрейзанд.',
        ru: '«Звезда родилась» 2018 года это уже четвёртая большая версия этой истории в Голливуде. Предыдущие фильмы выходили в 1937, 1954 и 1976 годах, а в версии 1976 года главную роль сыграла Барбра Стрейзанд.',
        en: 'The 2018 A Star Is Born is the fourth major Hollywood version of this story. Earlier films came out in 1937, 1954 and 1976, and the 1976 version starred Barbra Streisand.',
      },
      {
        uk: '«Оскар» у категорії «Найкраща оригінальна пісня» отримують лише пісні, написані спеціально для фільму. Серед відомих переможців цієї категорії, наприклад, «My Heart Will Go On» з «Титаніка» та «Let It Go» з «Крижаного серця».',
        ru: '«Оскар» в категории «Лучшая оригинальная песня» получают только песни, написанные специально для фильма. Среди известных победителей этой категории, например, «My Heart Will Go On» из «Титаника» и «Let It Go» из «Холодного сердца».',
        en: 'The Oscar for Best Original Song only goes to songs written specially for a film. Famous winners in this category include My Heart Will Go On from Titanic and Let It Go from Frozen.',
      },
      {
        uk: 'Леді Гага написала пісню разом із продюсером Марком Ронсоном та ще двома авторами, Ендрю Вайеттом і Ентоні Россомандо.',
        ru: 'Леди Гага написала песню вместе с продюсером Марком Ронсоном и ещё двумя авторами, Эндрю Уайеттом и Энтони Россомандо.',
        en: 'Lady Gaga wrote the song together with producer Mark Ronson and two other writers, Andrew Wyatt and Anthony Rossomando.',
      },
    ],
  },

  'thank-u-next': {
    intro: {
      uk: 'Уявіть, що людина озирається на свої минулі стосунки не зі злістю, а з подякою і легкою усмішкою. Саме так звучить ця пісня: впевнено, іронічно і дуже по-дорослому. Вона про те, що кожен досвід, навіть болючий, чогось навчає, а найважливіші стосунки це стосунки з собою. Англійська має чимало чудових виразів для такого настрою, і ось десять із них.',
      ru: 'Представьте, что человек оглядывается на свои прошлые отношения не со злостью, а с благодарностью и лёгкой улыбкой. Именно так звучит эта песня: уверенно, иронично и очень по-взрослому. Она о том, что любой опыт, даже болезненный, чему-то учит, а самые важные отношения это отношения с собой. В английском немало отличных выражений для такого настроения, и вот десять из них.',
      en: 'Imagine someone looking back at past relationships not with anger but with gratitude and a little smile. That is exactly how this song sounds: confident, ironic and very grown-up. It is about the idea that every experience, even a painful one, teaches you something, and that the most important relationship is the one with yourself. English has plenty of great expressions for this mood, and here are ten of them.',
    },
    phrases: [
      {
        en: 'no hard feelings',
        m: { uk: 'без образ', ru: 'без обид', en: 'I am not angry with you' },
        story: {
          uk: 'Так кажуть, щоб показати, що ти не тримаєш зла після сварки, розставання чи поразки. Часто це звучить як коротка дружня репліка: No hard feelings, okay? Вираз розмовний і теплий. Він ідеально описує загальний настрій пісні: дивитися на минуле спокійно і без злості.',
          ru: 'Так говорят, чтобы показать, что ты не держишь зла после ссоры, расставания или поражения. Часто это звучит как короткая дружеская реплика: No hard feelings, okay? Выражение разговорное и тёплое. Оно идеально описывает общее настроение песни: смотреть на прошлое спокойно и без злости.',
          en: 'People say this to show that they are not angry after an argument, a break-up or a defeat. It often sounds like a short, friendly line: No hard feelings, okay? It is informal and warm. It describes the general mood of the song perfectly: looking at the past calmly and without anger.',
        },
        ex: [
          'You won the match fairly. No hard feelings!',
          'We stopped working together, but there are no hard feelings between us.',
        ],
        similar: ['no offence', 'no grudges'],
        tip: {
          uk: 'Feelings завжди в множині: no hard feelings, а не no hard feeling.',
          ru: 'Feelings всегда во множественном числе: no hard feelings, а не no hard feeling.',
          en: 'Feelings is always plural here: no hard feelings, not no hard feeling.',
        },
      },
      {
        en: 'to turn the page',
        m: { uk: 'перегорнути сторінку, почати новий етап', ru: 'перевернуть страницу, начать новый этап', en: 'leave the past behind and start again' },
        story: {
          uk: 'Як і в українській мові, цей образ означає залишити минуле позаду і почати новий розділ життя. Вираз трохи поетичний, але цілком вживаний у розмові й у медіа. Часто кажуть It’s time to turn the page. Пісня якраз про те, як людина закриває старі розділи з подякою і йде далі.',
          ru: 'Как и в русском языке, этот образ означает оставить прошлое позади и начать новую главу жизни. Выражение немного поэтичное, но вполне употребляется в разговоре и в медиа. Часто говорят It’s time to turn the page. Песня как раз о том, как человек закрывает старые главы с благодарностью и идёт дальше.',
          en: 'Just like in Ukrainian, this image means leaving the past behind and starting a new chapter of life. It is slightly poetic but common in conversation and in the media. People often say It’s time to turn the page. The song is about closing old chapters with gratitude and walking forward.',
        },
        ex: [
          'After a difficult year, our family decided to turn the page.',
          'The club lost the final, but now it’s time to turn the page and prepare for next season.',
        ],
        similar: ['to start a new chapter', 'to turn over a new leaf'],
        tip: {
          uk: 'Тут page в однині й з артиклем the. Схожий вираз turn over a new leaf означає саме змінити себе на краще.',
          ru: 'Здесь page в единственном числе и с артиклем the. Похожее выражение turn over a new leaf означает именно измениться к лучшему.',
          en: 'Page is singular with the. The similar turn over a new leaf specifically means changing yourself for the better.',
        },
      },
      {
        en: 'a blessing in disguise',
        m: { uk: 'нема лиха без добра', ru: 'не было бы счастья, да несчастье помогло', en: 'something bad that later turns into something good' },
        story: {
          uk: 'Disguise означає маскування, тож це ніби «благословення в масці». Подія спершу здається невдачею, а потім виявляється, що вона принесла користь. Вираз нейтральний, його вживають і в розмові, і в статтях. Він чудово описує ідею пісні: навіть невдалий досвід може навчити тебе чогось цінного.',
          ru: 'Disguise означает маскировку, так что это словно «благословение в маске». Событие сначала кажется неудачей, а потом выясняется, что оно принесло пользу. Выражение нейтральное, его употребляют и в разговоре, и в статьях. Оно прекрасно описывает идею песни: даже неудачный опыт может научить тебя чему-то ценному.',
          en: 'Disguise means a costume that hides who you are, so this is like a blessing wearing a mask. An event first looks like a failure, and later you see that it actually helped you. The expression is neutral and used both in speech and in articles. It describes the idea of the song well: even a bad experience can teach you something valuable.',
        },
        ex: [
          'Losing that job was a blessing in disguise, because I found something much better.',
          'Missing the bus was a blessing in disguise: I met an old friend at the stop.',
        ],
        similar: ['every cloud has a silver lining', 'it’s all for the best'],
        tip: {
          uk: 'Не забувайте артикль: a blessing in disguise. Disguise вимовляється [dɪsˈɡaɪz], з наголосом на другий склад.',
          ru: 'Не забывайте артикль: a blessing in disguise. Disguise произносится [dɪsˈɡaɪz], с ударением на второй слог.',
          en: 'Don’t forget the article: a blessing in disguise. Disguise is pronounced [dɪsˈɡaɪz], with stress on the second syllable.',
        },
      },
      {
        en: 'to part ways',
        m: { uk: 'розійтися, припинити спільний шлях', ru: 'разойтись, прекратить общий путь', en: 'stop being together or working together' },
        story: {
          uk: 'Part ways означає, що двоє людей, гурт чи компанія вирішили більше не бути разом або не працювати разом. Вираз звучить спокійно й по-дорослому, без драми, тому його часто використовують у новинах про музичні гурти та футбольні клуби. Іноді кажуть part ways on good terms, тобто розійтися мирно. Саме такий мирний, вдячний підхід до розставань відчувається в пісні.',
          ru: 'Part ways означает, что два человека, группа или компания решили больше не быть вместе или не работать вместе. Выражение звучит спокойно и по-взрослому, без драмы, поэтому его часто используют в новостях о музыкальных группах и футбольных клубах. Иногда говорят part ways on good terms, то есть разойтись мирно. Именно такой мирный, благодарный подход к расставаниям чувствуется в песне.',
          en: 'Part ways means that two people, a band or a company decide not to be or work together any more. It sounds calm and mature, without drama, which is why the news often uses it about bands and football clubs. People sometimes say part ways on good terms, meaning to separate peacefully. That peaceful, grateful attitude to endings is exactly what you feel in the song.',
        },
        ex: [
          'The singer and the band parted ways after ten years.',
          'We parted ways on good terms and still say hi at school.',
        ],
        similar: ['to go your separate ways', 'to split up'],
        tip: {
          uk: 'Кажуть part ways, без артикля, а не part the ways чи divide ways. Також можна part company.',
          ru: 'Говорят part ways, без артикля, а не part the ways или divide ways. Также можно part company.',
          en: 'Say part ways with no article, not part the ways or divide ways. You can also say part company.',
        },
      },
      {
        en: 'to bounce back',
        m: { uk: 'швидко оговтатися, відновитися', ru: 'быстро оправиться, восстановиться', en: 'recover quickly after a problem' },
        story: {
          uk: 'Bounce означає відскочити, як м’яч від підлоги. Bounce back кажуть, коли людина після невдачі, хвороби чи розчарування швидко повертається у форму. Вираз розмовний, позитивний і часто звучить як підбадьорення. Пісня показує саме таку здатність: не застрягати у смутку, а ставати сильнішою.',
          ru: 'Bounce означает отскочить, как мяч от пола. Bounce back говорят, когда человек после неудачи, болезни или разочарования быстро возвращается в форму. Выражение разговорное, позитивное и часто звучит как поддержка. Песня показывает именно такую способность: не застревать в грусти, а становиться сильнее.',
          en: 'Bounce means to jump back up, like a ball hitting the floor. We say bounce back when someone quickly recovers after a failure, an illness or a disappointment. It is informal and positive, and it often sounds encouraging. The song shows exactly this ability: not getting stuck in sadness but becoming stronger.',
        },
        ex: [
          'She failed her first test but bounced back and got top marks in the next one.',
          'Don’t worry, you’ll bounce back from this.',
        ],
        similar: ['to pick yourself up', 'to get back on your feet'],
        tip: {
          uk: 'Від чого саме відновилися, вводимо прийменником from: bounce back from a loss.',
          ru: 'От чего именно восстановились, вводим предлогом from: bounce back from a loss.',
          en: 'Use from for the problem: bounce back from a loss.',
        },
      },
      {
        en: 'water under the bridge',
        m: { uk: 'що було, те минуло', ru: 'что было, то прошло', en: 'something in the past that no longer matters' },
        story: {
          uk: 'Так кажуть про старі сварки чи образи, які вже не мають значення. Образ простий: вода, що пропливла під мостом, назад не повернеться. Вираз неформальний і теплий, часто звучить як знак примирення: Don’t worry about it, it’s water under the bridge. Він передає настрій пісні, де минуле більше не викликає злості.',
          ru: 'Так говорят о старых ссорах или обидах, которые уже не имеют значения. Образ простой: вода, которая проплыла под мостом, назад не вернётся. Выражение неформальное и тёплое, часто звучит как знак примирения: Don’t worry about it, it’s water under the bridge. Оно передаёт настроение песни, где прошлое больше не вызывает злости.',
          en: 'We say this about old arguments or hurt feelings that no longer matter. The image is simple: water that has flowed under a bridge will never come back. It is informal and warm, often a sign of making peace: Don’t worry about it, it’s water under the bridge. It reflects the mood of the song, where the past no longer causes anger.',
        },
        ex: [
          'We argued a lot last year, but that’s all water under the bridge now.',
          'Forget about the broken phone, it’s water under the bridge.',
        ],
        similar: ['to let bygones be bygones', 'that’s in the past'],
        tip: {
          uk: 'Перед water немає артикля: it’s water under the bridge, а не it’s a water.',
          ru: 'Перед water нет артикля: it’s water under the bridge, а не it’s a water.',
          en: 'There is no article before water: it’s water under the bridge, not it’s a water.',
        },
      },
      {
        en: 'to take the high road',
        m: { uk: 'поводитися гідно, не опускатися до образ', ru: 'вести себя достойно, не опускаться до обид', en: 'behave well even when others don’t' },
        story: {
          uk: 'Take the high road означає обрати благородну поведінку, навіть коли інші поводяться погано: не пліткувати, не мститися, не відповідати грубістю. Вираз особливо поширений в американській англійській. Його протилежність take the low road, тобто вчинити дріб’язково. Пісня є гарним прикладом такого підходу: замість звинувачень вона обирає вдячність.',
          ru: 'Take the high road означает выбрать благородное поведение, даже когда другие ведут себя плохо: не сплетничать, не мстить, не отвечать грубостью. Выражение особенно распространено в американском английском. Его противоположность take the low road, то есть поступить мелочно. Песня хороший пример такого подхода: вместо обвинений она выбирает благодарность.',
          en: 'Take the high road means choosing to behave nobly even when others behave badly: not gossiping, not taking revenge, not answering rudeness with rudeness. It is especially common in American English. The opposite is take the low road, to act in a petty way. The song is a good example of this attitude: instead of blame, it chooses gratitude.',
        },
        ex: [
          'He was rude to me, but I decided to take the high road and stay polite.',
          'Taking the high road isn’t easy, but you won’t regret it.',
        ],
        similar: ['to rise above it', 'to be the bigger person'],
        tip: {
          uk: 'Не перекладайте як «їхати високою дорогою». Це ідіома про поведінку, а не про маршрут.',
          ru: 'Не переводите как «ехать по высокой дороге». Это идиома о поведении, а не о маршруте.',
          en: 'Don’t read it as a route on a map. It is an idiom about behaviour.',
        },
      },
      {
        en: 'to get closure',
        m: { uk: 'поставити крапку, емоційно відпустити', ru: 'поставить точку, эмоционально отпустить', en: 'feel that something is finished so you can move forward' },
        story: {
          uk: 'Closure це відчуття завершеності, коли ти зрозумів, що сталося, і можеш спокійно жити далі. Слово дуже популярне в сучасній розмовній англійській, особливо коли говорять про розставання або незавершені конфлікти. Часто кажуть I just need closure, тобто мені потрібна остання розмова чи пояснення. Пісня звучить як спосіб отримати таку завершеність і щиро подякувати минулому.',
          ru: 'Closure это ощущение завершённости, когда ты понял, что произошло, и можешь спокойно жить дальше. Слово очень популярно в современном разговорном английском, особенно когда говорят о расставаниях или незавершённых конфликтах. Часто говорят I just need closure, то есть мне нужен последний разговор или объяснение. Песня звучит как способ получить такую завершённость и искренне поблагодарить прошлое.',
          en: 'Closure is the feeling that something is complete: you understand what happened and can calmly go on with your life. The word is very popular in modern spoken English, especially when people talk about break-ups or unfinished conflicts. People often say I just need closure, meaning they need one last talk or explanation. The song sounds like a way of getting that closure and sincerely thanking the past.',
        },
        ex: [
          'Talking to her one last time helped me get closure.',
          'Writing a letter you never send can help you find closure.',
        ],
        similar: ['to put something behind you', 'to make peace with something'],
        tip: {
          uk: 'Closure тут незлічуване: get closure, need closure, без артикля a.',
          ru: 'Closure здесь неисчисляемое: get closure, need closure, без артикля a.',
          en: 'Closure is uncountable here: get closure, need closure, with no a.',
        },
      },
      {
        en: 'to look on the bright side',
        m: { uk: 'бачити позитив у ситуації', ru: 'видеть позитив в ситуации', en: 'focus on the good part of a bad situation' },
        story: {
          uk: 'Цим виразом підбадьорюють людину в складній ситуації: спробуй помітити хороше. Наприклад, дощ зіпсував пікнік, зате можна подивитися кіно вдома. Часто він стоїть на початку речення: Look on the bright side, ... Пісня дуже в цьому дусі: замість жалю вона шукає, що хорошого дав кожен досвід.',
          ru: 'Этим выражением подбадривают человека в сложной ситуации: попробуй заметить хорошее. Например, дождь испортил пикник, зато можно посмотреть кино дома. Часто оно стоит в начале предложения: Look on the bright side, ... Песня очень в этом духе: вместо сожаления она ищет, что хорошего дал каждый опыт.',
          en: 'People use this to cheer someone up in a hard situation: try to notice the good part. For example, the rain ruined the picnic, but now you can watch a film at home. It often starts a sentence: Look on the bright side, ... The song is very much in this spirit: instead of regret, it looks for what each experience gave.',
        },
        ex: [
          'Look on the bright side: at least you don’t have homework this weekend.',
          'My grandma always looks on the bright side of things.',
        ],
        similar: ['every cloud has a silver lining', 'to count your blessings'],
        tip: {
          uk: 'Найчастіше вживаємо прийменник on: look on the bright side. Варіант look at the bright side трапляється, але рідше.',
          ru: 'Чаще всего употребляем предлог on: look on the bright side. Вариант look at the bright side встречается, но реже.',
          en: 'The usual preposition is on: look on the bright side. Look at the bright side exists but is less common.',
        },
      },
      {
        en: 'to treat yourself',
        m: { uk: 'потішити себе, зробити собі приємне', ru: 'побаловать себя', en: 'do or buy something nice for yourself' },
        story: {
          uk: 'Treat yourself означає дозволити собі щось приємне: смачний десерт, нову книжку, вільний вечір. Вираз дуже поширений у соцмережах і рекламі, але й у звичайних розмовах друзів. Він пов’язаний із ширшою ідеєю турботи про себе. Пісня теж про те, щоб поставити себе й свій спокій на перше місце.',
          ru: 'Treat yourself означает позволить себе что-то приятное: вкусный десерт, новую книгу, свободный вечер. Выражение очень распространено в соцсетях и рекламе, но и в обычных разговорах друзей. Оно связано с более широкой идеей заботы о себе. Песня тоже о том, чтобы поставить себя и своё спокойствие на первое место.',
          en: 'Treat yourself means allowing yourself something nice: a tasty dessert, a new book, a free evening. It is very common on social media and in ads, but also in everyday chats between friends. It is connected with the wider idea of self-care. The song is also about putting yourself and your peace of mind first.',
        },
        ex: [
          'You worked hard all week, so treat yourself to a movie.',
          'I treated myself to a new pair of trainers after the exams.',
        ],
        similar: ['to spoil yourself', 'self-care'],
        tip: {
          uk: 'Те, чим себе потішили, вводиться прийменником to: treat yourself to ice cream. Не кажіть treat yourself with ice cream.',
          ru: 'То, чем себя побаловали, вводится предлогом to: treat yourself to ice cream. Не говорите treat yourself with ice cream.',
          en: 'Use to for the treat: treat yourself to ice cream. Don’t say treat yourself with ice cream.',
        },
      },
    ],
    culture: [
      {
        uk: 'Назва пісні написана маленькими літерами і зі скороченням u замість you. Так пишуть у переписці: u (you), ur (your), thx (thanks), idk (I don’t know). Це неформальний стиль, який добре знати, але не варто вживати в есе чи на іспиті.',
        ru: 'Название песни написано маленькими буквами и с сокращением u вместо you. Так пишут в переписке: u (you), ur (your), thx (thanks), idk (I don’t know). Это неформальный стиль, который полезно знать, но не стоит использовать в эссе или на экзамене.',
        en: 'The title is written in lower case with u instead of you. This is how people write in text messages: u (you), ur (your), thx (thanks), idk (I don’t know). It is an informal style that is good to know, but don’t use it in essays or exams.',
      },
      {
        uk: 'Фільми, які цитує кліп, «Дрянні дівчата» (Mean Girls, 2004), «Блондинка в законі» (Legally Blonde, 2001), «Добийся успіху» (Bring It On, 2000) і «З 13 на 30» (13 Going on 30, 2004), вважаються культовими молодіжними комедіями 2000-х у США. Фрази з них досі живуть у мемах.',
        ru: 'Фильмы, которые цитирует клип, «Дрянные девчонки» (Mean Girls, 2004), «Блондинка в законе» (Legally Blonde, 2001), «Добейся успеха» (Bring It On, 2000) и «Из 13 в 30» (13 Going on 30, 2004), считаются культовыми молодёжными комедиями 2000-х в США. Фразы из них до сих пор живут в мемах.',
        en: 'The films the video references, Mean Girls (2004), Legally Blonde (2001), Bring It On (2000) and 13 Going on 30 (2004), are seen as cult American teen comedies of the 2000s. Lines from them still live on in memes.',
      },
    ],
  },

  'blinding-lights': {
    intro: {
      uk: 'Неонові вогні, порожні нічні вулиці, швидка їзда і відчуття, що ти скучаєш за кимось так сильно, що не можеш заснути. Ця пісня звучить як фільм 1980-х, хоча вийшла у 2019 році. Її енергійний ритм змушує танцювати, а настрій трохи сумний і самотній. Ось десять виразів про ніч, час, безсоння і ностальгію, які пасують до цієї атмосфери.',
      ru: 'Неоновые огни, пустые ночные улицы, быстрая езда и ощущение, что ты скучаешь по кому-то так сильно, что не можешь уснуть. Эта песня звучит как фильм 1980-х, хотя вышла в 2019 году. Её энергичный ритм заставляет танцевать, а настроение немного грустное и одинокое. Вот десять выражений о ночи, времени, бессоннице и ностальгии, которые подходят к этой атмосфере.',
      en: 'Neon lights, empty streets at night, fast driving and the feeling of missing someone so much that you can’t fall asleep. This song sounds like a film from the 1980s, even though it came out in 2019. Its energetic beat makes you dance, while the mood is a little sad and lonely. Here are ten expressions about the night, time, sleeplessness and nostalgia that match this atmosphere.',
    },
    phrases: [
      {
        en: 'a night owl',
        m: { uk: '«сова», людина, яка любить не спати вночі', ru: '«сова», человек, который любит не спать ночью', en: 'a person who likes staying awake late at night' },
        story: {
          uk: 'Night owl називають людину, яка найактивніша пізно ввечері та вночі. Протилежність цьому early bird, тобто «жайворонок». Вираз нейтральний і дружній, часто кажуть I’m a total night owl. Атмосфера пісні з неоновими вогнями й нічними вулицями якраз про світ, у якому живуть «сови».',
          ru: 'Night owl называют человека, который активнее всего поздно вечером и ночью. Противоположность этому early bird, то есть «жаворонок». Выражение нейтральное и дружеское, часто говорят I’m a total night owl. Атмосфера песни с неоновыми огнями и ночными улицами как раз о мире, в котором живут «совы».',
          en: 'A night owl is a person who is most active late in the evening and at night. The opposite is an early bird. The expression is neutral and friendly, and people often say I’m a total night owl. The atmosphere of the song, with its neon lights and night streets, is exactly the world night owls live in.',
        },
        ex: [
          'My sister is a night owl, she does her best drawings after midnight.',
          'I’m not a night owl at all, I fall asleep at ten.',
        ],
        similar: ['an early bird (the opposite)'],
        tip: {
          uk: 'Українською кажемо просто «сова», але англійською лише owl звучить дивно. Потрібно a night owl.',
          ru: 'По-русски говорим просто «сова», но по-английски одно owl звучит странно. Нужно a night owl.',
          en: 'In Ukrainian and Russian you just say owl, but in English owl alone sounds odd. Say a night owl.',
        },
      },
      {
        en: 'to toss and turn',
        m: { uk: 'крутитися в ліжку, не могти заснути', ru: 'ворочаться в постели, не мочь уснуть', en: 'move around in bed because you can’t sleep' },
        story: {
          uk: 'Так описують неспокійну ніч, коли лежиш у ліжку й постійно перевертаєшся з боку на бік, бо думки не дають заснути. Вираз розмовний і дуже наочний. Обидва дієслова завжди йдуть парою. Безсоння і внутрішній неспокій, які передає пісня, добре пасують до цього образу.',
          ru: 'Так описывают беспокойную ночь, когда лежишь в постели и постоянно ворочаешься с боку на бок, потому что мысли не дают уснуть. Выражение разговорное и очень наглядное. Оба глагола всегда идут парой. Бессонница и внутреннее беспокойство, которые передаёт песня, хорошо подходят к этому образу.',
          en: 'This describes a restless night when you lie in bed and keep turning from side to side because your thoughts won’t let you sleep. It is informal and very visual. The two verbs always go together. The sleeplessness and inner restlessness of the song fit this image well.',
        },
        ex: [
          'I tossed and turned all night before my exam.',
          'If you drink coffee in the evening, you’ll toss and turn for hours.',
        ],
        similar: ['to not sleep a wink', 'to have a restless night'],
        tip: {
          uk: 'Змінюються обидва дієслова: I tossed and turned. Не кажіть toss and turned.',
          ru: 'Меняются оба глагола: I tossed and turned. Не говорите toss and turned.',
          en: 'Both verbs change: I tossed and turned. Don’t say toss and turned.',
        },
      },
      {
        en: 'to burn the midnight oil',
        m: { uk: 'працювати або вчитися до пізньої ночі', ru: 'работать или учиться до поздней ночи', en: 'work or study very late at night' },
        story: {
          uk: 'Вираз з’явився тоді, коли люди читали й працювали при олійних лампах. «Палити опівнічну олію» означало сидіти над роботою, коли всі сплять. Сьогодні так кажуть про студентів перед іспитами чи людей із дедлайном. Нічний ритм міста, який створює пісня, нагадує, що для багатьох ніч це час не лише для сну.',
          ru: 'Выражение появилось тогда, когда люди читали и работали при масляных лампах. «Жечь полуночное масло» означало сидеть над работой, когда все спят. Сегодня так говорят о студентах перед экзаменами или людях с дедлайном. Ночной ритм города, который создаёт песня, напоминает, что для многих ночь это время не только для сна.',
          en: 'The phrase comes from the time when people read and worked by oil lamps. Burning oil at midnight meant working while everyone else was asleep. Today we say it about students before exams or people with a deadline. The night-time rhythm of the city in the song reminds us that for many people the night is not only for sleeping.',
        },
        ex: [
          'I’ll have to burn the midnight oil to finish this project.',
          'She burned the midnight oil every night before the NMT.',
        ],
        similar: ['to pull an all-nighter', 'to work late'],
        tip: {
          uk: 'Це не про пожежу, а про пізню працю. Вираз трохи книжний, у розмові підлітки частіше кажуть pull an all-nighter.',
          ru: 'Это не о пожаре, а о поздней работе. Выражение немного книжное, в разговоре подростки чаще говорят pull an all-nighter.',
          en: 'It is not about fire but about working late. It is a bit literary; teenagers more often say pull an all-nighter.',
        },
      },
      {
        en: 'to lose track of time',
        m: { uk: 'втратити лік часу', ru: 'потерять счёт времени', en: 'not notice how much time has passed' },
        story: {
          uk: 'Так кажуть, коли ти так захопився чимось, що не помітив, як минули години. Це може бути цікава розмова, гра, музика чи прогулянка. Вираз нейтральний і дуже поширений, особливо як вибачення: Sorry I’m late, I lost track of time. Пісня з її нічною поїздкою та пульсуючим ритмом створює саме таке відчуття, коли година ночі непомітно стає ранком.',
          ru: 'Так говорят, когда ты так увлёкся чем-то, что не заметил, как прошли часы. Это может быть интересный разговор, игра, музыка или прогулка. Выражение нейтральное и очень распространённое, особенно как извинение: Sorry I’m late, I lost track of time. Песня с её ночной поездкой и пульсирующим ритмом создаёт именно такое ощущение, когда час ночи незаметно становится утром.',
          en: 'We say this when you are so into something that you don’t notice the hours go by. It could be a great conversation, a game, music or a walk. It is neutral and very common, especially as an apology: Sorry I’m late, I lost track of time. With its night drive feeling and pulsing beat, the song creates exactly that sense of one in the morning quietly turning into dawn.',
        },
        ex: [
          'Sorry I’m late, I lost track of time.',
          'We were talking so much that we completely lost track of time.',
        ],
        similar: ['time flies', 'to lose count'],
        tip: {
          uk: 'Перед time немає артикля: lose track of time. Не кажіть lose the time, це звучить як «загубити час» буквально.',
          ru: 'Перед time нет артикля: lose track of time. Не говорите lose the time, это звучит как «потерять время» буквально.',
          en: 'No article before time: lose track of time. Don’t say lose the time.',
        },
      },
      {
        en: 'to go for a spin',
        m: { uk: 'проїхатися для задоволення', ru: 'прокатиться для удовольствия', en: 'take a short ride just for fun' },
        story: {
          uk: 'Spin буквально означає обертання, а go for a spin у розмовній англійській означає коротку поїздку машиною, велосипедом чи скутером просто для задоволення. Також так кажуть, коли пробують щось нове: take the new phone for a spin. Вираз легкий і неформальний. Дорога, швидкість і нічне місто є важливою частиною атмосфери пісні та її кліпу.',
          ru: 'Spin буквально означает вращение, а go for a spin в разговорном английском означает короткую поездку на машине, велосипеде или скутере просто для удовольствия. Также так говорят, когда пробуют что-то новое: take the new phone for a spin. Выражение лёгкое и неформальное. Дорога, скорость и ночной город важная часть атмосферы песни и её клипа.',
          en: 'Spin literally means turning around, but in spoken English go for a spin means a short ride by car, bike or scooter just for fun. We also say it when trying something new: take the new phone for a spin. The expression is light and informal. The road, speed and the city at night are an important part of the atmosphere of the song and its video.',
        },
        ex: [
          'Dad let us go for a spin in his new car around the village.',
          'Let’s take your new bike for a spin in the park.',
        ],
        similar: ['to go for a ride', 'to take something for a test drive'],
        tip: {
          uk: 'Після go for потрібен артикль a: go for a spin, go for a walk, go for a ride.',
          ru: 'После go for нужен артикль a: go for a spin, go for a walk, go for a ride.',
          en: 'After go for you need a: go for a spin, go for a walk, go for a ride.',
        },
      },
      {
        en: 'the small hours',
        m: { uk: 'глуха ніч, перші години після опівночі', ru: 'глубокая ночь, первые часы после полуночи', en: 'the very late hours after midnight' },
        story: {
          uk: 'The small hours це приблизно час з першої до четвертої ночі, коли цифри на годиннику маленькі. Вираз більше британський, часто звучить як in the small hours of the morning. Його вживають, щоб підкреслити, що щось сталося дуже пізно. Порожні нічні вулиці, неон і самотність, які відчуваються в пісні, належать саме цим годинам.',
          ru: 'The small hours это примерно время с часа до четырёх ночи, когда цифры на часах маленькие. Выражение скорее британское, часто звучит как in the small hours of the morning. Его употребляют, чтобы подчеркнуть, что что-то случилось очень поздно. Пустые ночные улицы, неон и одиночество, которые чувствуются в песне, принадлежат именно этим часам.',
          en: 'The small hours are roughly from one to four in the morning, when the numbers on the clock are small. It is more British and often appears as in the small hours of the morning. People use it to stress that something happened very late. The empty streets, neon and loneliness you feel in the song belong to exactly these hours.',
        },
        ex: [
          'The party went on into the small hours.',
          'I woke up in the small hours and couldn’t get back to sleep.',
        ],
        similar: ['the wee hours', 'late at night'],
        tip: {
          uk: 'Артикль the обов’язковий: in the small hours. Без нього вираз звучить як «маленькі години», і значення губиться.',
          ru: 'Артикль the обязателен: in the small hours. Без него выражение звучит как «маленькие часы», и смысл теряется.',
          en: 'The article is required: in the small hours. Without it, the meaning is lost.',
        },
      },
      {
        en: 'at the crack of dawn',
        m: { uk: 'на світанку, дуже рано', ru: 'на рассвете, очень рано', en: 'very early in the morning, as the sun rises' },
        story: {
          uk: 'Crack тут означає першу «тріщину» світла на горизонті. Вираз описує найранішній ранок, коли сонце тільки з’являється. Часто його вживають із легкою скаргою: I had to get up at the crack of dawn. Для тих, хто не спав усю ніч, як нічні мандрівники з атмосфери пісні, світанок часто стає кінцем історії.',
          ru: 'Crack здесь означает первую «трещину» света на горизонте. Выражение описывает самое раннее утро, когда солнце только появляется. Часто его употребляют с лёгкой жалобой: I had to get up at the crack of dawn. Для тех, кто не спал всю ночь, как ночные путники из атмосферы песни, рассвет часто становится концом истории.',
          en: 'Crack here means the first crack of light on the horizon. The phrase describes the earliest morning, when the sun is just appearing. It is often used with a little complaint: I had to get up at the crack of dawn. For people who stay up all night, like the night travellers of the song’s atmosphere, dawn is often where the story ends.',
        },
        ex: [
          'We left at the crack of dawn to catch the first train.',
          'My grandpa gets up at the crack of dawn every day.',
        ],
        similar: ['first thing in the morning', 'at sunrise'],
        tip: {
          uk: 'Прийменник at: at the crack of dawn, а не in the crack of dawn.',
          ru: 'Предлог at: at the crack of dawn, а не in the crack of dawn.',
          en: 'Use at: at the crack of dawn, not in the crack of dawn.',
        },
      },
      {
        en: 'a blast from the past',
        m: { uk: 'привіт із минулого', ru: 'привет из прошлого', en: 'something that suddenly reminds you of old times' },
        story: {
          uk: 'Так кажуть про пісню, річ, фото чи людину, яка раптом повертає тебе в минуле. Вираз розмовний і грайливий, із римою blast і past. Часто ним реагують на старе фото чи хіт дитинства. Пісня звучить як музичний привіт із 1980-х, тому до неї цей вираз пасує ідеально.',
          ru: 'Так говорят о песне, вещи, фото или человеке, который вдруг возвращает тебя в прошлое. Выражение разговорное и игривое, с рифмой blast и past. Часто им реагируют на старое фото или хит детства. Песня звучит как музыкальный привет из 1980-х, поэтому к ней это выражение подходит идеально.',
          en: 'We say this about a song, an object, a photo or a person that suddenly takes you back to the past. It is informal and playful, with the rhyme blast and past. People often say it when they see an old photo or hear a childhood hit. The song sounds like a musical greeting from the 1980s, so the expression suits it perfectly.',
        },
        ex: [
          'Hearing that old cartoon song was a real blast from the past.',
          'My mum’s cassette player is a blast from the past.',
        ],
        similar: ['a trip down memory lane', 'old-school'],
        tip: {
          uk: 'Blast тут означає «сильне враження», а не вибух. Вимова [blɑːst] у британській англійській і [blæst] в американській.',
          ru: 'Blast здесь значит «сильное впечатление», а не взрыв. Произношение [blɑːst] в британском английском и [blæst] в американском.',
          en: 'Here blast means a strong, fun experience, not an explosion. It is [blɑːst] in British English and [blæst] in American English.',
        },
      },
      {
        en: 'to lose yourself in something',
        m: { uk: 'повністю поринути в щось', ru: 'полностью погрузиться во что-то', en: 'become completely absorbed in something' },
        story: {
          uk: 'Коли ти lose yourself in music, a book або a game, ти так захоплюєшся, що забуваєш про все навколо. Вираз позитивний і трохи поетичний. Його часто вживають, говорячи про музику, танці чи мистецтво. Енергійний ритм пісні якраз із тих, у яких легко розчинитися під час танцю чи довгої поїздки.',
          ru: 'Когда ты lose yourself in music, a book или a game, ты так увлекаешься, что забываешь обо всём вокруг. Выражение позитивное и немного поэтичное. Его часто употребляют, говоря о музыке, танцах или искусстве. Энергичный ритм песни как раз из тех, в которых легко раствориться во время танца или долгой поездки.',
          en: 'When you lose yourself in music, a book or a game, you are so absorbed that you forget about everything around you. The expression is positive and a little poetic. People often use it about music, dancing or art. The energetic beat of this song is exactly the kind you can easily lose yourself in while dancing or on a long ride.',
        },
        ex: [
          'When I dance, I lose myself in the music.',
          'She lost herself in the book and missed her stop.',
        ],
        similar: ['to get carried away', 'to be absorbed in'],
        tip: {
          uk: 'Зворотний займенник обов’язковий: lose myself, lose herself. Без нього lose означає просто «загубити».',
          ru: 'Возвратное местоимение обязательно: lose myself, lose herself. Без него lose значит просто «потерять».',
          en: 'The reflexive pronoun is required: lose myself, lose herself. Without it, lose just means to misplace.',
        },
      },
      {
        en: 'to feel blue',
        m: { uk: 'сумувати', ru: 'грустить', en: 'feel sad' },
        story: {
          uk: 'В англійській синій колір пов’язаний зі смутком, звідси й назва музичного жанру блюз. Feel blue означає легкий сум чи меланхолію, без великої драми. Вираз розмовний і м’який. Пісня, попри танцювальний ритм, має сумну нотку, і така суміш веселої музики та смутку дуже типова для поп-музики.',
          ru: 'В английском синий цвет связан с грустью, отсюда и название музыкального жанра блюз. Feel blue означает лёгкую грусть или меланхолию, без большой драмы. Выражение разговорное и мягкое. Песня, несмотря на танцевальный ритм, имеет грустную нотку, и такое сочетание весёлой музыки и грусти очень типично для поп-музыки.',
          en: 'In English, the colour blue is linked to sadness, which is where the music genre blues gets its name. Feel blue means mild sadness, without big drama. It is informal and gentle. Despite its dance beat, the song has a sad note, and that mix of happy music and sadness is very typical of pop.',
        },
        ex: [
          'I’ve been feeling a bit blue since my best friend moved away.',
          'When I feel blue, I go for a long walk with my dog.',
        ],
        similar: ['to feel down', 'to be in low spirits'],
        tip: {
          uk: 'Blue тут саме сум, а не щось радісне. А вираз until you are blue in the face означає інше: довго й марно щось повторювати.',
          ru: 'Blue здесь именно грусть, а не что-то радостное. А until you are blue in the face значит другое: долго и бесполезно что-то повторять.',
          en: 'Here blue means sad. Until you are blue in the face is different: it means repeating something for a long time with no result.',
        },
      },
    ],
    culture: [
      {
        uk: 'Синті-поп 1980-х будувався на синтезаторах і драм-машинах, які тоді були новою технологією. Гурти на кшталт a-ha і Depeche Mode зробили цей «електронний» звук впізнаваним у всьому світі, і сучасні виконавці часто повертаються до нього заради ностальгії.',
        ru: 'Синти-поп 1980-х строился на синтезаторах и драм-машинах, которые тогда были новой технологией. Группы вроде a-ha и Depeche Mode сделали этот «электронный» звук узнаваемым во всём мире, и современные исполнители часто возвращаются к нему ради ностальгии.',
        en: '1980s synth-pop was built on synthesizers and drum machines, which were new technology at the time. Bands like a-ha and Depeche Mode made this electronic sound famous around the world, and modern artists often return to it for nostalgia.',
      },
      {
        uk: 'У 2020 році під цю пісню з’явився вірусний танцювальний челендж у TikTok: люди знімали, як танцюють удома цілими родинами.',
        ru: 'В 2020 году под эту песню появился вирусный танцевальный челлендж в TikTok: люди снимали, как танцуют дома целыми семьями.',
        en: 'In 2020, the song inspired a viral dance challenge on TikTok, with whole families filming themselves dancing at home.',
      },
    ],
  },

  'save-your-tears': {
    intro: {
      uk: 'Ця пісня звучить бадьоро і по-ретро, але за веселим ритмом ховається історія про жаль: людина розуміє, що колись завдала болю, і тепер хотіла б усе змінити. Такий контраст між танцювальною музикою і сумною темою робить її особливо цікавою. Вона про сльози, відповідальність і запізніле розуміння. Ось десять виразів англійської, які допоможуть точно говорити про такі почуття.',
      ru: 'Эта песня звучит бодро и по-ретро, но за весёлым ритмом прячется история о сожалении: человек понимает, что когда-то причинил боль, и теперь хотел бы всё изменить. Такой контраст между танцевальной музыкой и грустной темой делает её особенно интересной. Она о слезах, ответственности и запоздалом понимании. Вот десять выражений английского, которые помогут точно говорить о таких чувствах.',
      en: 'This song sounds upbeat and retro, but behind the happy rhythm there is a story of regret: someone realises they once caused pain and now wishes they could change everything. This contrast between dance music and a sad theme makes it especially interesting. It is about tears, responsibility and understanding things too late. Here are ten English expressions that will help you talk about these feelings precisely.',
    },
    phrases: [
      {
        en: 'to cry your eyes out',
        m: { uk: 'гірко плакати', ru: 'горько плакать', en: 'cry a lot and for a long time' },
        story: {
          uk: 'Це перебільшення, як і багато ідіом: ніхто, звісно, не виплакує очі. Вираз означає дуже довго й сильно плакати. Він розмовний і часто звучить у розповідях: I cried my eyes out at the end of the film. Сльози і те, чи варто їх витрачати, є центральним образом цієї пісні, що видно вже з її назви.',
          ru: 'Это преувеличение, как и многие идиомы: никто, конечно, не выплакивает глаза. Выражение означает очень долго и сильно плакать. Оно разговорное и часто звучит в рассказах: I cried my eyes out at the end of the film. Слёзы и то, стоит ли их тратить, центральный образ этой песни, что видно уже по её названию.',
          en: 'Like many idioms, it is an exaggeration: nobody really cries their eyes out. It means to cry hard for a long time. It is informal and common in stories: I cried my eyes out at the end of the film. Tears, and whether they are worth spending, are the central image of this song, as its title already shows.',
        },
        ex: [
          'I cried my eyes out at the end of that cartoon about the old dog.',
          'She cried her eyes out when her best friend moved to another city.',
        ],
        similar: ['to burst into tears', 'to sob'],
        tip: {
          uk: 'Займенник змінюється: cry my/her/his eyes out. Out у кінці обов’язкове.',
          ru: 'Местоимение меняется: cry my/her/his eyes out. Out в конце обязательно.',
          en: 'The pronoun changes: cry my/her/his eyes out. Out at the end is required.',
        },
      },
      {
        en: 'to hold back tears',
        m: { uk: 'стримувати сльози', ru: 'сдерживать слёзы', en: 'try hard not to cry' },
        story: {
          uk: 'Hold back означає стримати, не випустити. Hold back tears кажуть, коли людина дуже хоче заплакати, але не дозволяє собі цього, наприклад на випускному чи в незручній ситуації. Вираз нейтральний, його вживають і в розмові, і в книжках. Пісня крутиться навколо емоцій, які одні люди показують, а інші ховають.',
          ru: 'Hold back означает сдержать, не выпустить. Hold back tears говорят, когда человек очень хочет заплакать, но не позволяет себе этого, например на выпускном или в неловкой ситуации. Выражение нейтральное, его употребляют и в разговоре, и в книгах. Песня вращается вокруг эмоций, которые одни люди показывают, а другие прячут.',
          en: 'Hold back means to keep something in. We say hold back tears when someone really wants to cry but doesn’t let themselves, for example at a graduation or in an awkward moment. The expression is neutral and used in speech and in books. The song revolves around emotions that some people show and others hide.',
        },
        ex: [
          'I could hardly hold back my tears during the graduation speech.',
          'He tried to hold back tears when he said goodbye to his grandparents.',
        ],
        similar: ['to fight back tears', 'to keep it together'],
        tip: {
          uk: 'Не плутайте з hold on, що означає «зачекай» або «тримайся».',
          ru: 'Не путайте с hold on, что значит «подожди» или «держись».',
          en: 'Don’t confuse it with hold on, which means wait or stay strong.',
        },
      },
      {
        en: 'a lump in your throat',
        m: { uk: 'клубок у горлі', ru: 'ком в горле', en: 'a tight feeling in your throat when you are about to cry' },
        story: {
          uk: 'Як і українською, цей образ описує відчуття, коли від сильних емоцій важко говорити і от-от заплачеш. Зазвичай кажуть have a lump in your throat або I got a lump in my throat. Причиною може бути і смуток, і зворушення, наприклад гарна промова. Атмосфера пісні про несподівану зустріч із минулим добре передає такий момент.',
          ru: 'Как и по-русски, этот образ описывает ощущение, когда от сильных эмоций трудно говорить и вот-вот заплачешь. Обычно говорят have a lump in your throat или I got a lump in my throat. Причиной может быть и грусть, и умиление, например красивая речь. Атмосфера песни о неожиданной встрече с прошлым хорошо передаёт такой момент.',
          en: 'Just like in Ukrainian and Russian, this image describes the feeling when strong emotion makes it hard to speak and you are about to cry. People usually say have a lump in your throat or I got a lump in my throat. It can come from sadness or from being moved, for example by a beautiful speech. The song’s mood of an unexpected meeting with the past captures this kind of moment well.',
        },
        ex: [
          'I had a lump in my throat when I read my grandma’s old letter.',
          'Watching the final scene gave me a lump in my throat.',
        ],
        similar: ['to be choked up', 'to be moved'],
        tip: {
          uk: 'Англійською саме lump, а не ball. А a knot in your stomach означає інше: тривогу.',
          ru: 'По-английски именно lump, а не ball. А a knot in your stomach значит другое: тревогу.',
          en: 'Use lump, not ball. A knot in your stomach is different: it means anxiety.',
        },
      },
      {
        en: 'to put on a brave face',
        m: { uk: 'робити вигляд, що все добре', ru: 'делать вид, что всё хорошо', en: 'hide sadness or fear and look calm' },
        story: {
          uk: 'Put on a brave face означає приховати сум чи страх і показати іншим спокійне обличчя. Вираз часто звучить зі співчуттям: She put on a brave face, but I knew she was upset. Ми ніби «одягаємо» вираз обличчя, як маску. Пісня теж про розрив між тим, що людина показує, і тим, що вона відчуває насправді.',
          ru: 'Put on a brave face означает скрыть грусть или страх и показать другим спокойное лицо. Выражение часто звучит с сочувствием: She put on a brave face, but I knew she was upset. Мы как бы «надеваем» выражение лица, как маску. Песня тоже о разрыве между тем, что человек показывает, и тем, что он чувствует на самом деле.',
          en: 'Put on a brave face means hiding sadness or fear and showing others a calm face. It is often said with sympathy: She put on a brave face, but I knew she was upset. We put on an expression like a mask. The song is also about the gap between what a person shows and what they really feel.',
        },
        ex: [
          'He lost the final, but he put on a brave face for the cameras.',
          'You don’t always have to put on a brave face, it’s okay to be sad.',
        ],
        similar: ['to grin and bear it', 'to keep a stiff upper lip'],
        tip: {
          uk: 'Кажуть put on a brave face, а не make a brave face. Існує також варіант put a brave face on it.',
          ru: 'Говорят put on a brave face, а не make a brave face. Есть также вариант put a brave face on it.',
          en: 'Say put on a brave face, not make a brave face. There is also put a brave face on it.',
        },
      },
      {
        en: 'to have second thoughts',
        m: { uk: 'засумніватися в рішенні', ru: 'засомневаться в решении', en: 'start to doubt a decision' },
        story: {
          uk: 'Second thoughts це думки, які приходять після рішення і змушують засумніватися. Have second thoughts about something означає почати вагатися: а чи правильно я вчинив? Вираз нейтральний і дуже поширений. Він пасує до теми пісні, де мова про жаль і бажання все змінити.',
          ru: 'Second thoughts это мысли, которые приходят после решения и заставляют засомневаться. Have second thoughts about something означает начать колебаться: а правильно ли я поступил? Выражение нейтральное и очень распространённое. Оно подходит к теме песни, где речь о сожалении и желании всё изменить.',
          en: 'Second thoughts are the thoughts that come after a decision and make you doubt it. Have second thoughts about something means starting to wonder: did I do the right thing? It is neutral and very common. It fits the theme of the song, which is about regret and wanting to change things.',
        },
        ex: [
          'I’m having second thoughts about cutting my hair so short.',
          'She agreed to go, but then she had second thoughts.',
        ],
        similar: ['to think twice', 'to be in two minds'],
        tip: {
          uk: 'Thoughts тут у множині: have second thoughts. А on second thought (у британській частіше on second thoughts) означає «хоча ні, передумав».',
          ru: 'Thoughts здесь во множественном числе: have second thoughts. А on second thought (в британском чаще on second thoughts) значит «хотя нет, передумал».',
          en: 'Thoughts is plural: have second thoughts. On second thought (British: on second thoughts) means wait, I’ve changed my mind.',
        },
      },
      {
        en: 'a change of heart',
        m: { uk: 'зміна думки або почуттів', ru: 'перемена мнения или чувств', en: 'when someone changes their opinion or feelings' },
        story: {
          uk: 'Change of heart означає, що людина змінила свою думку чи почуття, часто несподівано. Наприклад, хтось був проти собаки вдома, а потім погодився. Вираз нейтральний і теплий. Ідея, що почуття можуть змінитися і що потім доводиться жити з наслідками, лежить у центрі цієї пісні.',
          ru: 'Change of heart означает, что человек изменил своё мнение или чувства, часто неожиданно. Например, кто-то был против собаки дома, а потом согласился. Выражение нейтральное и тёплое. Идея, что чувства могут измениться и что потом приходится жить с последствиями, лежит в центре этой песни.',
          en: 'A change of heart means that someone changes their opinion or feelings, often unexpectedly. For example, a parent who was against having a dog suddenly agrees. It is neutral and warm. The idea that feelings can change, and that you then live with the results, is at the centre of this song.',
        },
        ex: [
          'Mum had a change of heart and let us get a puppy.',
          'He was going to quit the team, but he had a change of heart.',
        ],
        similar: ['to change your mind', 'to think better of it'],
        tip: {
          uk: 'Heart в однині, і потрібен артикль a: have a change of heart.',
          ru: 'Heart в единственном числе, и нужен артикль a: have a change of heart.',
          en: 'Heart is singular and you need a: have a change of heart.',
        },
      },
      {
        en: 'in hindsight',
        m: { uk: 'заднім числом, оглядаючись назад', ru: 'задним числом, оглядываясь назад', en: 'when you think about the past with what you know now' },
        story: {
          uk: 'Hindsight це розуміння ситуації вже після того, як вона сталася. In hindsight кажуть, коли тепер ясно, що треба було діяти інакше. Відоме прислів’я Hindsight is 20/20 означає, що, оглядаючись назад, усі бачать ідеально, адже 20/20 у США позначає нормальний зір. Жаль про минулі вчинки, який є темою пісні, якраз і народжується з такого погляду назад.',
          ru: 'Hindsight это понимание ситуации уже после того, как она произошла. In hindsight говорят, когда теперь ясно, что надо было действовать иначе. Известная поговорка Hindsight is 20/20 означает, что, оглядываясь назад, все видят идеально, ведь 20/20 в США обозначает нормальное зрение. Сожаление о прошлых поступках, которое является темой песни, как раз и рождается из такого взгляда назад.',
          en: 'Hindsight is understanding a situation after it has happened. We say in hindsight when it is now clear we should have acted differently. The saying Hindsight is 20/20 means that everyone sees perfectly when looking back, because 20/20 is the American term for normal eyesight. The regret about past actions that the song is about comes from exactly this kind of look back.',
        },
        ex: [
          'In hindsight, I should have started revising earlier.',
          'It seemed like a good idea at the time, but in hindsight it was a mistake.',
        ],
        similar: ['looking back', 'with the benefit of hindsight'],
        tip: {
          uk: 'Кажуть in hindsight, без артикля. Часто це вступне слово з комою: In hindsight, I was wrong.',
          ru: 'Говорят in hindsight, без артикля. Часто это вводное слово с запятой: In hindsight, I was wrong.',
          en: 'Say in hindsight with no article. It often starts a sentence with a comma: In hindsight, I was wrong.',
        },
      },
      {
        en: 'to burn bridges',
        m: { uk: 'спалити мости', ru: 'сжечь мосты', en: 'damage a relationship so badly that you can’t go back' },
        story: {
          uk: 'Як і українською, burn bridges означає зробити щось таке, після чого повернутися назад уже неможливо: посваритися, наговорити зайвого, піти з грюкотом дверей. Часто звучить як порада: Don’t burn your bridges. Вираз вживають про роботу, дружбу і стосунки. Пісня показує, що буває, коли мости вже спалені, а людина розуміє, що хотіла б їх відбудувати.',
          ru: 'Как и по-русски, burn bridges означает сделать что-то такое, после чего вернуться назад уже невозможно: поссориться, наговорить лишнего, уйти, хлопнув дверью. Часто звучит как совет: Don’t burn your bridges. Выражение употребляют о работе, дружбе и отношениях. Песня показывает, что бывает, когда мосты уже сожжены, а человек понимает, что хотел бы их восстановить.',
          en: 'Just like in Ukrainian and Russian, burn bridges means doing something that makes it impossible to go back: having a big fight, saying too much or slamming the door. It is often given as advice: Don’t burn your bridges. People use it about work, friendship and relationships. The song shows what happens when the bridges are already burnt and someone realises they want to rebuild them.',
        },
        ex: [
          'Even if you leave the club, try not to burn bridges with the coach.',
          'She burned her bridges with her old friends and now feels lonely.',
        ],
        similar: ['to cut ties', 'there’s no going back'],
        tip: {
          uk: 'Зазвичай у множині: burn bridges або burn your bridges.',
          ru: 'Обычно во множественном числе: burn bridges или burn your bridges.',
          en: 'It is usually plural: burn bridges or burn your bridges.',
        },
      },
      {
        en: 'to own up (to something)',
        m: { uk: 'визнати свою провину', ru: 'признать свою вину', en: 'admit that you did something wrong' },
        story: {
          uk: 'Own up означає чесно зізнатися, що це зробив саме ти, особливо коли щось пішло не так. Вираз розмовний, і його часто чують діти та підлітки: Who broke the window? Come on, own up! Він підкреслює відповідальність за свої вчинки. Тема визнання власних помилок близька до настрою пісні.',
          ru: 'Own up означает честно признаться, что это сделал именно ты, особенно когда что-то пошло не так. Выражение разговорное, и его часто слышат дети и подростки: Who broke the window? Come on, own up! Оно подчёркивает ответственность за свои поступки. Тема признания собственных ошибок близка к настроению песни.',
          en: 'Own up means honestly admitting that you were the one who did something, especially when something went wrong. It is informal, and children and teenagers hear it a lot: Who broke the window? Come on, own up! It stresses taking responsibility for your actions. Admitting your own mistakes is close to the mood of the song.',
        },
        ex: [
          'Nobody owned up to eating the last piece of cake.',
          'He owned up to breaking the vase before his parents asked.',
        ],
        similar: ['to come clean', 'to take responsibility'],
        tip: {
          uk: 'Після own up to вживаємо іменник або -ing: own up to breaking the vase. Не кажіть own up to break.',
          ru: 'После own up to употребляем существительное или -ing: own up to breaking the vase. Не говорите own up to break.',
          en: 'After own up to, use a noun or -ing: own up to breaking the vase. Don’t say own up to break.',
        },
      },
      {
        en: 'to bite your tongue',
        m: { uk: 'прикусити язика, промовчати', ru: 'прикусить язык, промолчать', en: 'stop yourself from saying something' },
        story: {
          uk: 'Bite your tongue означає стриматися і не сказати те, що хочеться, щоб не образити когось чи не зробити гірше. Часто кажуть I had to bite my tongue, тобто довелося промовчати. Вираз розмовний і дуже поширений. Він добре доповнює тему жалю: багатьох помилок можна уникнути, якщо просто зупинитися на мить і подумати.',
          ru: 'Bite your tongue означает сдержаться и не сказать то, что хочется, чтобы не обидеть кого-то или не сделать хуже. Часто говорят I had to bite my tongue, то есть пришлось промолчать. Выражение разговорное и очень распространённое. Оно хорошо дополняет тему сожаления: многих ошибок можно избежать, если просто остановиться на мгновение и подумать.',
          en: 'Bite your tongue means stopping yourself from saying what you want to say, so you don’t hurt someone or make things worse. People often say I had to bite my tongue, meaning they had to stay quiet. It is informal and very common. It goes well with the theme of regret: many mistakes can be avoided if you just stop for a moment and think.',
        },
        ex: [
          'I wanted to argue with the referee, but I bit my tongue.',
          'Sometimes it’s better to bite your tongue than to say something you’ll regret.',
        ],
        similar: ['to hold your tongue', 'to keep quiet'],
        tip: {
          uk: 'Займенник змінюється: bite my/your tongue. Схожий вираз hold your tongue часто звучить як різкий наказ «замовкни».',
          ru: 'Местоимение меняется: bite my/your tongue. Похожее выражение hold your tongue часто звучит как резкий приказ «замолчи».',
          en: 'The pronoun changes: bite my/your tongue. The similar hold your tongue often sounds like a sharp order to be quiet.',
        },
      },
    ],
    culture: [
      {
        uk: 'Альбом After Hours має цілісний візуальний образ: у кліпах і на виступах того періоду The Weeknd з’являється як персонаж у червоному піджаку, якого ми бачимо в нічному місті. Багато поп-зірок так будують «еру» альбому з власним стилем і героєм.',
        ru: 'У альбома After Hours цельный визуальный образ: в клипах и на выступлениях того периода The Weeknd появляется как персонаж в красном пиджаке, которого мы видим в ночном городе. Многие поп-звёзды так строят «эру» альбома с собственным стилем и героем.',
        en: 'The After Hours album has a consistent visual image: in the videos and performances of that period, The Weeknd appears as a character in a red jacket, seen in a city at night. Many pop stars build an album era like this, with its own style and character.',
      },
      {
        uk: 'Сама фраза save your tears існує і поза піснею: так кажуть людині, щоб вона не плакала через когось чи щось, що цього не варте. Схожі поради звучать як don’t waste your tears.',
        ru: 'Сама фраза save your tears существует и вне песни: так говорят человеку, чтобы он не плакал из-за кого-то или чего-то, что этого не стоит. Похожие советы звучат как don’t waste your tears.',
        en: 'The phrase save your tears also exists outside the song: people say it to tell someone not to cry over a person or thing that is not worth it. A similar piece of advice is don’t waste your tears.',
      },
    ],
  },

  'what-was-i-made-for': {
    intro: {
      uk: 'Ця тиха, ніжна балада з фільму «Барбі» звучить як розмова із собою пізно ввечері. Вона про відчуття, знайоме багатьом підліткам і дорослим: коли раптом не розумієш, хто ти, навіщо ти тут і чи можна бути кимось, крім того, ким тебе бачать інші. Пісня не дає готових відповідей, але дає дозвіл шукати. Ось десять англійських виразів про пошук себе, дорослішання і справжність.',
      ru: 'Эта тихая, нежная баллада из фильма «Барби» звучит как разговор с собой поздно вечером. Она о чувстве, знакомом многим подросткам и взрослым: когда вдруг не понимаешь, кто ты, зачем ты здесь и можно ли быть кем-то, кроме того, кем тебя видят другие. Песня не даёт готовых ответов, но даёт разрешение искать. Вот десять английских выражений о поиске себя, взрослении и подлинности.',
      en: 'This quiet, gentle ballad from the Barbie film sounds like talking to yourself late at night. It is about a feeling many teenagers and adults know: suddenly not understanding who you are, why you are here, and whether you can be anything other than what others see in you. The song gives no ready answers, but it gives permission to search. Here are ten English expressions about finding yourself, growing up and being real.',
    },
    phrases: [
      {
        en: 'soul-searching',
        m: { uk: 'глибокі роздуми про себе', ru: 'глубокие размышления о себе', en: 'thinking deeply about your feelings and values' },
        story: {
          uk: 'Soul-searching це процес, коли людина серйозно думає про свої цінності, бажання і вчинки, щоб зрозуміти, чого вона насправді хоче. Слово може бути іменником (a lot of soul-searching) або прикметником. Його часто вживають, коли хтось стоїть перед важливим вибором. Уся пісня звучить як тихий момент такого пошуку себе.',
          ru: 'Soul-searching это процесс, когда человек серьёзно думает о своих ценностях, желаниях и поступках, чтобы понять, чего он на самом деле хочет. Слово может быть существительным (a lot of soul-searching) или прилагательным. Его часто употребляют, когда кто-то стоит перед важным выбором. Вся песня звучит как тихий момент такого поиска себя.',
          en: 'Soul-searching is when you think seriously about your values, wishes and actions to understand what you really want. The word can be a noun (a lot of soul-searching) or an adjective. People often use it when someone faces an important choice. The whole song sounds like a quiet moment of this kind of searching.',
        },
        ex: [
          'After a lot of soul-searching, he decided to study art instead of law.',
          'The summer camp was a time of soul-searching for me.',
        ],
        similar: ['self-reflection', 'to look inside yourself'],
        tip: {
          uk: 'Пишеться через дефіс: soul-searching. Кажуть do some soul-searching, а не make soul-searching.',
          ru: 'Пишется через дефис: soul-searching. Говорят do some soul-searching, а не make soul-searching.',
          en: 'Write it with a hyphen: soul-searching. Say do some soul-searching, not make soul-searching.',
        },
      },
      {
        en: 'to find your feet',
        m: { uk: 'освоїтися на новому місці', ru: 'освоиться на новом месте', en: 'become confident in a new situation' },
        story: {
          uk: 'Find your feet кажуть, коли людина звикає до нової ситуації: нової школи, міста, роботи. Спочатку все незнайоме, а потім поступово з’являється впевненість. Вираз більш британський, нейтрально-розмовний. Він пов’язаний із сюжетом фільму «Барбі», де героїня потрапляє в незнайомий реальний світ і мусить у ньому розібратися.',
          ru: 'Find your feet говорят, когда человек привыкает к новой ситуации: новой школе, городу, работе. Сначала всё незнакомо, а потом постепенно появляется уверенность. Выражение скорее британское, нейтрально-разговорное. Оно связано с сюжетом фильма «Барби», где героиня попадает в незнакомый реальный мир и должна в нём разобраться.',
          en: 'We say find your feet when someone gets used to a new situation: a new school, city or job. At first everything is unfamiliar, and then confidence slowly comes. It is more British and neutral to informal. It connects with the plot of the Barbie film, in which the heroine arrives in an unfamiliar real world and has to make her way in it.',
        },
        ex: [
          'It took me a few weeks to find my feet at the new school.',
          'Give her time, she’s still finding her feet in the team.',
        ],
        similar: ['to settle in', 'to get the hang of it'],
        tip: {
          uk: 'Feet у множині і з присвійним займенником: find my/your feet. Не кажіть find the legs.',
          ru: 'Feet во множественном числе и с притяжательным местоимением: find my/your feet. Не говорите find the legs.',
          en: 'Feet is plural with a possessive: find my/your feet. Don’t say find the legs.',
        },
      },
      {
        en: 'to be true to yourself',
        m: { uk: 'бути вірним собі', ru: 'быть верным себе', en: 'act according to who you really are' },
        story: {
          uk: 'Цей вираз означає жити відповідно до своїх справжніх цінностей і не прикидатися кимось іншим заради інших. Джерелом цієї ідеї часто називають рядок Шекспіра з «Гамлета», To thine own self be true. Вираз звучить трохи серйозно й надихаюче, його люблять у промовах і порадах. Пісня якраз про те, як важко зрозуміти, яке ж воно, твоє справжнє «я».',
          ru: 'Это выражение означает жить в соответствии со своими настоящими ценностями и не притворяться кем-то другим ради других. Источником этой идеи часто называют строку Шекспира из «Гамлета», To thine own self be true. Выражение звучит немного серьёзно и вдохновляюще, его любят в речах и советах. Песня как раз о том, как трудно понять, какое же оно, твоё настоящее «я».',
          en: 'This expression means living according to your real values and not pretending to be someone else for other people. A line from Shakespeare’s Hamlet, To thine own self be true, is often named as the source of the idea. It sounds a little serious and inspiring, and people love it in speeches and advice. The song is about how hard it is to understand what your real self actually is.',
        },
        ex: [
          'Don’t change your style just to fit in, be true to yourself.',
          'My coach always tells us to stay true to ourselves.',
        ],
        similar: ['to stay true to yourself', 'to be yourself'],
        tip: {
          uk: 'Прийменник to: true to yourself. Не кажіть true for yourself чи true with yourself.',
          ru: 'Предлог to: true to yourself. Не говорите true for yourself или true with yourself.',
          en: 'Use to: true to yourself. Don’t say true for yourself or true with yourself.',
        },
      },
      {
        en: 'a work in progress',
        m: { uk: 'незавершена справа; людина, яка ще росте', ru: 'незавершённое дело; человек, который ещё растёт', en: 'something or someone still developing' },
        story: {
          uk: 'Буквально це робота, яка ще триває. Про людину так кажуть із теплою самоіронією: I’m a work in progress, тобто я ще вчуся, змінююся і не мушу бути ідеальним. Вираз популярний у розмовах про саморозвиток. Він дуже пасує до ідеї пісні: ти можеш ще не знати, хто ти, і це нормально.',
          ru: 'Буквально это работа, которая ещё продолжается. О человеке так говорят с тёплой самоиронией: I’m a work in progress, то есть я ещё учусь, меняюсь и не обязан быть идеальным. Выражение популярно в разговорах о саморазвитии. Оно очень подходит к идее песни: ты можешь ещё не знать, кто ты, и это нормально.',
          en: 'Literally, it is work that is still going on. People say it about themselves with warm self-irony: I’m a work in progress, meaning I am still learning and changing and don’t have to be perfect. It is popular in conversations about personal growth. It suits the idea of the song well: you may not know who you are yet, and that is okay.',
        },
        ex: [
          'My English is a work in progress, but I’m getting better every week.',
          'Everyone is a work in progress, so be kind to yourself.',
        ],
        similar: ['still learning', 'growing pains'],
        tip: {
          uk: 'Progress незлічуване і без артикля: a work in progress, а не a work in a progress.',
          ru: 'Progress неисчисляемое и без артикля: a work in progress, а не a work in a progress.',
          en: 'Progress is uncountable with no article: a work in progress, not a work in a progress.',
        },
      },
      {
        en: 'to make sense of something',
        m: { uk: 'розібратися, зрозуміти щось складне', ru: 'разобраться, понять что-то сложное', en: 'understand something confusing' },
        story: {
          uk: 'Make sense of означає спробувати знайти логіку в чомусь заплутаному: у почуттях, подіях, складному тексті. Часто кажуть I’m still trying to make sense of it all. Вираз нейтральний і поширений. Пісня передає саме цей стан, коли людина намагається зрозуміти власні емоції.',
          ru: 'Make sense of означает попытаться найти логику в чём-то запутанном: в чувствах, событиях, сложном тексте. Часто говорят I’m still trying to make sense of it all. Выражение нейтральное и распространённое. Песня передаёт именно это состояние, когда человек пытается понять собственные эмоции.',
          en: 'Make sense of means trying to find the logic in something confusing: feelings, events or a difficult text. People often say I’m still trying to make sense of it all. It is neutral and common. The song expresses exactly this state of trying to understand your own emotions.',
        },
        ex: [
          'I read the poem three times but couldn’t make sense of it.',
          'Writing a diary helps me make sense of my feelings.',
        ],
        similar: ['to get your head around something', 'to work something out'],
        tip: {
          uk: 'Не плутайте make sense of (зрозуміти щось) і make sense (мати сенс): It makes sense. Перше потребує додатка: make sense of the situation.',
          ru: 'Не путайте make sense of (понять что-то) и make sense (иметь смысл): It makes sense. Первое требует дополнения: make sense of the situation.',
          en: 'Don’t mix up make sense of (understand something) and make sense (be logical): It makes sense. The first needs an object: make sense of the situation.',
        },
      },
      {
        en: 'to keep up appearances',
        m: { uk: 'підтримувати видимість, що все добре', ru: 'поддерживать видимость, что всё хорошо', en: 'pretend everything is fine so others think well of you' },
        story: {
          uk: 'Keep up appearances означає поводитися так, щоб інші думали, що все гаразд, хоча насправді це не так. Наприклад, усміхатися на фото, коли на душі сумно. Вираз може звучати з легкою критикою. Лялька Барбі давно символізує ідеальну зовнішність, і фільм разом із піснею ставлять питання, що ховається за такою картинкою.',
          ru: 'Keep up appearances означает вести себя так, чтобы другие думали, что всё в порядке, хотя на самом деле это не так. Например, улыбаться на фото, когда на душе грустно. Выражение может звучать с лёгкой критикой. Кукла Барби давно символизирует идеальную внешность, и фильм вместе с песней задают вопрос, что прячется за такой картинкой.',
          en: 'Keep up appearances means behaving so that others think everything is fine when it isn’t. For example, smiling in photos when you feel sad inside. It can sound slightly critical. The Barbie doll has long been a symbol of a perfect look, and the film and the song ask what is hidden behind that picture.',
        },
        ex: [
          'They kept up appearances on social media, but they were arguing all the time.',
          'I’m tired of keeping up appearances, I just want to be honest.',
        ],
        similar: ['to put on a show', 'to save face'],
        tip: {
          uk: 'Appearances тут у множині. Appearance в однині означає зовнішність: She cares about her appearance.',
          ru: 'Appearances здесь во множественном числе. Appearance в единственном числе значит внешность: She cares about her appearance.',
          en: 'Appearances is plural here. Singular appearance means how someone looks: She cares about her appearance.',
        },
      },
      {
        en: 'to come of age',
        m: { uk: 'подорослішати, досягти зрілості', ru: 'повзрослеть, достичь зрелости', en: 'become an adult or become mature' },
        story: {
          uk: 'Come of age буквально означає досягти повноліття, але переносно так кажуть про момент, коли людина чи навіть ціле явище стає зрілим. Звідси жанр coming-of-age story, тобто історія дорослішання, дуже популярний у кіно та книжках. Фільм «Барбі» теж можна сприймати як незвичну історію дорослішання. Пісня передає цей тонкий момент переходу.',
          ru: 'Come of age буквально означает достичь совершеннолетия, но в переносном смысле так говорят о моменте, когда человек или даже целое явление становится зрелым. Отсюда жанр coming-of-age story, то есть история взросления, очень популярный в кино и книгах. Фильм «Барби» тоже можно воспринимать как необычную историю взросления. Песня передаёт этот тонкий момент перехода.',
          en: 'Come of age literally means reaching adulthood, but figuratively we say it about the moment when a person or even a whole trend becomes mature. That is where the genre coming-of-age story comes from, very popular in films and books. The Barbie film can also be seen as an unusual coming-of-age story. The song captures this delicate moment of change.',
        },
        ex: [
          'In many countries you come of age at eighteen.',
          'My favourite book is a coming-of-age story about a girl in a small town.',
        ],
        similar: ['to grow up', 'to mature'],
        tip: {
          uk: 'Без артикля: come of age, а не come of an age. Прикметник пишеться через дефіс: a coming-of-age film.',
          ru: 'Без артикля: come of age, а не come of an age. Прилагательное пишется через дефис: a coming-of-age film.',
          en: 'No article: come of age, not come of an age. The adjective has hyphens: a coming-of-age film.',
        },
      },
      {
        en: 'to take a step back',
        m: { uk: 'зробити паузу і подивитися збоку', ru: 'сделать паузу и посмотреть со стороны', en: 'pause and look at a situation calmly' },
        story: {
          uk: 'Take a step back означає ненадовго зупинитися і подивитися на ситуацію спокійніше, без поспіху й зайвих емоцій. Його часто радять, коли людина втомилася або заплуталася. Вираз нейтральний, підходить і для розмови, і для роботи. Тиха, повільна пісня сама звучить як такий момент паузи.',
          ru: 'Take a step back означает ненадолго остановиться и посмотреть на ситуацию спокойнее, без спешки и лишних эмоций. Его часто советуют, когда человек устал или запутался. Выражение нейтральное, подходит и для разговора, и для работы. Тихая, медленная песня сама звучит как такой момент паузы.',
          en: 'Take a step back means stopping for a while and looking at a situation more calmly, without rushing or strong emotions. People often suggest it when someone is tired or confused. It is neutral and works both in conversation and at work. This quiet, slow song itself sounds like such a pause.',
        },
        ex: [
          'Let’s take a step back and think about what really matters.',
          'I decided to take a step back from social media for a month.',
        ],
        similar: ['to see the bigger picture', 'to take a breather'],
        tip: {
          uk: 'Від чого саме відпочити, вводимо прийменником from: take a step back from social media.',
          ru: 'От чего именно отдохнуть, вводим предлогом from: take a step back from social media.',
          en: 'Use from for what you are pausing: take a step back from social media.',
        },
      },
      {
        en: 'to feel like yourself (again)',
        m: { uk: 'знову почуватися собою', ru: 'снова чувствовать себя собой', en: 'feel normal and like the person you usually are' },
        story: {
          uk: 'Так кажуть після важкого періоду, хвороби чи стресу, коли сили й настрій нарешті повертаються. Часто звучить у формі I’m starting to feel like myself again. Протилежна ситуація I don’t feel like myself, тобто зі мною щось не те. Пісня описує саме стан, коли людина ніби втратила зв’язок із собою і шукає дорогу назад.',
          ru: 'Так говорят после тяжёлого периода, болезни или стресса, когда силы и настроение наконец возвращаются. Часто звучит в форме I’m starting to feel like myself again. Противоположная ситуация I don’t feel like myself, то есть со мной что-то не так. Песня описывает именно состояние, когда человек будто потерял связь с собой и ищет дорогу назад.',
          en: 'People say this after a hard period, an illness or stress, when their energy and mood finally come back. It often appears as I’m starting to feel like myself again. The opposite is I don’t feel like myself, meaning something is wrong. The song describes exactly the state of losing touch with yourself and looking for the way back.',
        },
        ex: [
          'After a week of rest, I finally feel like myself again.',
          'Sorry I was so quiet yesterday, I didn’t feel like myself.',
        ],
        similar: ['to be back to your old self', 'to get back on track'],
        tip: {
          uk: 'Не плутайте з feel like + -ing, що означає «хотіти»: I feel like dancing. Тут feel like myself означає «почуватися собою».',
          ru: 'Не путайте с feel like + -ing, что значит «хотеть»: I feel like dancing. Здесь feel like myself значит «чувствовать себя собой».',
          en: 'Don’t confuse it with feel like + -ing, which means want to: I feel like dancing. Feel like myself means feel normal.',
        },
      },
      {
        en: 'to go through a phase',
        m: { uk: 'переживати певний (часто тимчасовий) етап', ru: 'переживать определённый (часто временный) этап', en: 'have a temporary period of certain feelings or interests' },
        story: {
          uk: 'Phase означає етап. Go through a phase кажуть, коли людина тимчасово має якісь інтереси, настрої чи стиль, а потім це минає. Батьки часто кажуть про підлітків: It’s just a phase. Інколи це звучить зневажливо, ніби почуття несерйозні, тож вживати вираз варто обережно. Пісня нагадує, що навіть «просто етап» може бути дуже глибоким переживанням.',
          ru: 'Phase означает этап. Go through a phase говорят, когда у человека временно есть какие-то интересы, настроения или стиль, а потом это проходит. Родители часто говорят о подростках: It’s just a phase. Иногда это звучит пренебрежительно, будто чувства несерьёзные, поэтому употреблять выражение стоит осторожно. Песня напоминает, что даже «просто этап» может быть очень глубоким переживанием.',
          en: 'A phase is a stage. We say go through a phase when someone has certain interests, moods or a style for a while and then it passes. Parents often say about teenagers: It’s just a phase. Sometimes this sounds dismissive, as if the feelings aren’t serious, so use it carefully. The song reminds us that even just a phase can be a very deep experience.',
        },
        ex: [
          'I went through a phase of wearing only black clothes.',
          'Everyone goes through a phase of not knowing what they want.',
        ],
        similar: ['a stage', 'to grow out of something'],
        tip: {
          uk: 'Кажуть go through a phase, а не pass a phase.',
          ru: 'Говорят go through a phase, а не pass a phase.',
          en: 'Say go through a phase, not pass a phase.',
        },
      },
    ],
    culture: [
      {
        uk: 'Ляльку Барбі вперше представили у 1959 році. Її придумала Рут Гендлер, одна із засновниць компанії Mattel, і назвала на честь своєї доньки Барбари. Кен отримав ім’я на честь її сина Кеннета.',
        ru: 'Куклу Барби впервые представили в 1959 году. Её придумала Рут Хэндлер, одна из основательниц компании Mattel, и назвала в честь своей дочери Барбары. Кен получил имя в честь её сына Кеннета.',
        en: 'The Barbie doll was first presented in 1959. It was created by Ruth Handler, one of the founders of Mattel, who named it after her daughter Barbara. Ken was named after her son Kenneth.',
      },
      {
        uk: 'Фільм «Барбі» став найкасовішим фільмом 2023 року у світі. А Біллі Айліш після цієї пісні стала наймолодшою людиною в історії з двома «Оскарами»: їй тоді було 22 роки.',
        ru: 'Фильм «Барби» стал самым кассовым фильмом 2023 года в мире. А Билли Айлиш после этой песни стала самым молодым человеком в истории с двумя «Оскарами»: ей тогда было 22 года.',
        en: 'Barbie was the highest-grossing film of 2023 worldwide. And with this song Billie Eilish became the youngest person ever to win two Oscars: she was 22 at the time.',
      },
    ],
  },
};
