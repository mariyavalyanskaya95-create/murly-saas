// Розбір виразів до пісень (частина A). Без цитат із текстів пісень.
import type { SongDeep } from './songs-deep';

export const DEEP_A: Record<string, SongDeep> = {
  'shake-it-off': {
    intro: {
      uk: 'Ця пісня ідеальна для початку: швидка, весела і про те, що знайоме кожному, коли хтось говорить про тебе неприємні речі. Тут живе розмовна англійська, якою підлітки й дорослі щодня відповідають на критику: коротко, з гумором і без драми. Нижче ви знайдете вирази, що допомагають не брати чужі слова близько до серця, підбадьорити друга і просто танцювати далі. Усі приклади наші власні, тож їх можна сміливо використовувати в житті.',
      ru: 'Эта песня идеальна для начала: быстрая, весёлая и о том, что знакомо каждому, когда кто-то говорит о тебе неприятные вещи. Здесь живёт разговорный английский, которым подростки и взрослые каждый день отвечают на критику: коротко, с юмором и без драмы. Ниже вы найдёте выражения, которые помогают не принимать чужие слова близко к сердцу, подбодрить друга и просто танцевать дальше. Все примеры наши собственные, так что их можно смело использовать в жизни.',
      en: 'This song is a perfect place to start: it is fast, fun and about something everyone knows, when people say unkind things about you. It is full of the everyday spoken English that teens and adults use to answer criticism: short, funny and without drama. Below you will find expressions that help you not take other people’s words to heart, cheer up a friend and simply keep dancing. All the examples are our own, so you can use them in real life.',
    },
    phrases: [
      {
        en: 'to let it go',
        m: { uk: 'відпустити, перестати думати про щось', ru: 'отпустить, перестать думать о чём-то', en: 'stop worrying about something' },
        story: {
          uk: 'Let it go буквально означає «відпусти це», як відпускають повітряну кульку. Носії кажуть так, коли хтось занадто довго переживає через дрібницю або образу. Це дружня порада, звучить м’яко і підходить і для дітей, і для дорослих. Уся пісня про те, як не тримати в собі чужі неприємні слова, і цей вираз чудово передає цю ідею.',
          ru: 'Let it go буквально значит «отпусти это», как отпускают воздушный шарик. Носители говорят так, когда кто-то слишком долго переживает из-за мелочи или обиды. Это дружеский совет, звучит мягко и подходит и детям, и взрослым. Вся песня о том, как не держать в себе чужие неприятные слова, и это выражение отлично передаёт эту идею.',
          en: 'Let it go literally means to open your hand and let something fly away, like a balloon. Native speakers say it when someone worries about a small problem or an insult for too long. It is friendly advice, sounds gentle and works for kids and adults. The whole song is about not holding on to unkind words, and this phrase fits that idea perfectly.',
        },
        ex: ['He forgot to say thank you. It’s not a big deal, just let it go.', 'I was angry all morning, but then I decided to let it go.'],
        similar: ['to forget about it', 'to move on', 'don’t worry about it'],
        tip: {
          uk: 'Не кажіть let go it. З займенником it порядок такий: let it go.',
          ru: 'Не говорите let go it. С местоимением it порядок такой: let it go.',
          en: 'Don’t say let go it. With it, the order is let it go.',
        },
      },
      {
        en: 'don’t take it personally',
        m: { uk: 'не сприймай це на свій рахунок', ru: 'не принимай это на свой счёт', en: 'it is not about you, don’t feel hurt' },
        story: {
          uk: 'Цю фразу кажуть, коли хтось засмутився через чужі слова чи поведінку, хоча причина зовсім не в ньому. Наприклад, учитель сьогодні суворий, бо в нього важкий день. Вираз нейтральний, його чути і вдома, і на роботі. Пісня про те, що чужа критика часто більше говорить про інших, ніж про тебе, тож ця фраза тут дуже доречна.',
          ru: 'Эту фразу говорят, когда кто-то расстроился из-за чужих слов или поведения, хотя причина совсем не в нём. Например, учитель сегодня строгий, потому что у него тяжёлый день. Выражение нейтральное, его слышно и дома, и на работе. Песня о том, что чужая критика часто больше говорит о других, чем о тебе, поэтому эта фраза здесь очень уместна.',
          en: 'People say this when someone feels hurt by another person’s words or behaviour, but the reason has nothing to do with them. For example, a teacher is strict today because they are having a bad day. The phrase is neutral, so you hear it at home and at work. The song is about how criticism often says more about other people than about you, so this phrase fits well.',
        },
        ex: ['She didn’t answer your message because she was busy. Don’t take it personally.', 'My boss was grumpy with everyone, so I didn’t take it personally.'],
        similar: ['it’s not about you', 'don’t take it to heart'],
        tip: {
          uk: 'Українською ми кажемо «не ображайся», але англійське don’t be offended звучить формальніше. У розмові частіше чують don’t take it personally.',
          ru: 'По-русски мы говорим «не обижайся», но английское don’t be offended звучит формальнее. В разговоре чаще слышно don’t take it personally.',
          en: 'Don’t be offended is correct but sounds more formal. In everyday talk, don’t take it personally is much more common.',
        },
      },
      {
        en: 'who cares?',
        m: { uk: 'кому яке діло? яка різниця?', ru: 'кому какое дело? какая разница?', en: 'it doesn’t matter' },
        story: {
          uk: 'Who cares? виглядає як питання, але відповіді на нього ніхто не чекає. Це риторичне питання, яке означає «це неважливо». Воно неформальне, тому підходить для розмови з друзями, а не з директором школи. Ідея пісні в тому, щоб не перейматися чужими думками, і who cares? передає саме цей легкий настрій.',
          ru: 'Who cares? выглядит как вопрос, но ответа на него никто не ждёт. Это риторический вопрос, который значит «это неважно». Он неформальный, поэтому подходит для разговора с друзьями, а не с директором школы. Идея песни в том, чтобы не переживать из-за чужих мнений, и who cares? передаёт именно это лёгкое настроение.',
          en: 'Who cares? looks like a question, but nobody expects an answer. It is a rhetorical question that means this is not important. It is informal, so use it with friends, not with your head teacher. The song’s idea is not to worry about what others think, and who cares? has exactly that light, easy mood.',
        },
        ex: ['My socks don’t match. Who cares? They’re comfortable!', 'So what if we lost the game? Who cares, it was fun.'],
        similar: ['so what?', 'it doesn’t matter', 'whatever'],
        tip: {
          uk: 'Інтонація важлива: весело це звучить безтурботно, а різко може здатися грубим. Із дорослими краще сказати it doesn’t really matter.',
          ru: 'Интонация важна: весело это звучит беззаботно, а резко может показаться грубым. Со взрослыми лучше сказать it doesn’t really matter.',
          en: 'Tone matters: said with a smile it sounds relaxed, said sharply it can sound rude. With adults, it doesn’t really matter is safer.',
        },
      },
      {
        en: 'to cheer up',
        m: { uk: 'не сумуй! / підбадьорити когось', ru: 'не грусти! / подбодрить кого-то', en: 'become happier / make someone happier' },
        story: {
          uk: 'Cheer up працює двома способами. Сам по собі це заклик: Cheer up! тобто «Не сумуй!». А з об’єктом це «підбадьорити когось»: cheer someone up. Вираз теплий і дуже поширений. Пісня звучить так бадьоро, що сама може cheer you up у похмурий день.',
          ru: 'Cheer up работает двумя способами. Сам по себе это призыв: Cheer up! то есть «Не грусти!». А с объектом это «подбодрить кого-то»: cheer someone up. Выражение тёплое и очень распространённое. Песня звучит так бодро, что сама может cheer you up в пасмурный день.',
          en: 'Cheer up works in two ways. On its own it is an order or wish: Cheer up! means don’t be sad. With an object it means to make someone happier: cheer someone up. It is warm and very common. The song is so upbeat that it can cheer you up on a grey day.',
        },
        ex: ['Cheer up! It’s Friday tomorrow.', 'My little brother was sad, so I told him a joke to cheer him up.', 'This song always cheers me up.'],
        similar: ['to lift someone’s spirits', 'to make someone smile'],
        tip: {
          uk: 'Пам’ятайте про порядок слів із займенником: cheer him up, а не cheer up him.',
          ru: 'Помните о порядке слов с местоимением: cheer him up, а не cheer up him.',
          en: 'Watch the word order with pronouns: cheer him up, not cheer up him.',
        },
      },
      {
        en: 'to let off steam',
        m: { uk: 'випустити пару, розрядитися', ru: 'выпустить пар, разрядиться', en: 'get rid of stress or energy' },
        story: {
          uk: 'Вираз прийшов від парових машин і чайників: щоб тиск не став небезпечним, пару випускають назовні. Так само людина може «випустити пару»: побігати, потанцювати, покричати на стадіоні. Вираз розмовний, але не грубий. Танцювати під гучну музику, коли щось засмутило, це класичний спосіб let off steam, і ця пісня створена саме для такого.',
          ru: 'Выражение пришло от паровых машин и чайников: чтобы давление не стало опасным, пар выпускают наружу. Так же человек может «выпустить пар»: побегать, потанцевать, покричать на стадионе. Выражение разговорное, но не грубое. Танцевать под громкую музыку, когда что-то расстроило, это классический способ let off steam, и эта песня создана именно для такого.',
          en: 'The phrase comes from steam engines and kettles: to keep the pressure safe, you let some steam out. People can do the same: run, dance or shout at a football match. It is informal but not rude. Dancing to loud music after a bad day is a classic way to let off steam, and this song is made for exactly that.',
        },
        ex: ['After the exam we went to the park to let off steam.', 'The kids let off steam by jumping on the trampoline.'],
        similar: ['to blow off steam (American English)', 'to unwind', 'to chill out'],
        tip: {
          uk: 'Російською є схожий вираз «выпустить пар», тож запам’ятати легко. Але англійською кажуть let off steam без артикля: не let off the steam.',
          ru: 'В русском есть похожее «выпустить пар», так что запомнить легко. Но по-английски говорят let off steam без артикля: не let off the steam.',
          en: 'Say let off steam with no article, not let off the steam.',
        },
      },
      {
        en: 'dance like nobody’s watching',
        m: { uk: 'танцювати так, ніби ніхто не дивиться', ru: 'танцевать так, будто никто не смотрит', en: 'enjoy yourself without feeling shy' },
        story: {
          uk: 'Це популярна мотиваційна фраза, яку часто друкують на постерах і футболках. Вона означає: роби те, що любиш, і не бійся виглядати смішно. Звучить надихаюче, трохи як порада з листівки. Пісня якраз про свободу бути незграбним і щасливим водночас, тож ідея збігається повністю.',
          ru: 'Это популярная мотивационная фраза, которую часто печатают на постерах и футболках. Она значит: делай то, что любишь, и не бойся выглядеть смешно. Звучит вдохновляюще, немного как совет с открытки. Песня как раз о свободе быть неуклюжим и счастливым одновременно, так что идея совпадает полностью.',
          en: 'This is a popular motivational saying, often printed on posters and T-shirts. It means do what you love and don’t be afraid of looking silly. It sounds inspiring, a bit like advice on a greeting card. The song is about the freedom to be clumsy and happy at the same time, so the idea matches perfectly.',
        },
        ex: ['At my cousin’s party I danced like nobody was watching.', 'Put on your favourite song and dance like nobody’s watching!'],
        similar: ['to let loose', 'to let your hair down'],
        tip: {
          uk: 'Nobody’s тут означає nobody is. Не плутайте з присвійним: тут немає значення «нічий».',
          ru: 'Nobody’s здесь значит nobody is. Не путайте с притяжательным: здесь нет значения «ничей».',
          en: 'Here nobody’s means nobody is. It is not a possessive.',
        },
      },
      {
        en: 'to make fun of someone',
        m: { uk: 'насміхатися з когось', ru: 'смеяться над кем-то, высмеивать', en: 'laugh at someone in an unkind way' },
        story: {
          uk: 'Make fun of означає жартувати з людини так, що їй неприємно. Це не те саме, що have fun (веселитися), і цю різницю важливо відчути. Вираз нейтральний, його вживають і діти, і вчителі. Тема пісні в тому, як реагувати, коли з тебе сміються, тому цей вираз тут ключовий.',
          ru: 'Make fun of значит шутить над человеком так, что ему неприятно. Это не то же самое, что have fun (веселиться), и эту разницу важно почувствовать. Выражение нейтральное, его используют и дети, и учителя. Тема песни в том, как реагировать, когда над тобой смеются, поэтому это выражение здесь ключевое.',
          en: 'Make fun of means to joke about a person in a way that hurts them. It is not the same as have fun, and that difference is important. The phrase is neutral, used by kids and teachers alike. The song is about how to react when people laugh at you, so this phrase is central.',
        },
        ex: ['Please don’t make fun of his accent. He’s still learning.', 'Some kids made fun of my glasses, but now everyone wears them.'],
        similar: ['to tease', 'to laugh at', 'to pick on'],
        tip: {
          uk: 'Не забувайте прийменник of: make fun of me, а не make fun me. І не плутайте з have fun.',
          ru: 'Не забывайте предлог of: make fun of me, а не make fun me. И не путайте с have fun.',
          en: 'Don’t forget of: make fun of me, not make fun me. And don’t mix it up with have fun.',
        },
      },
      {
        en: 'to have thick skin',
        m: { uk: 'бути стійким до критики, «товстошкірим»', ru: 'быть устойчивым к критике, «толстокожим»', en: 'not get upset easily by criticism' },
        story: {
          uk: 'Людина з «товстою шкірою» не ображається від кожного слова. В англійській це скоріше комплімент: так кажуть про акторів, спортсменів, блогерів. Протилежне значення має thin-skinned, тобто дуже вразливий. Знаменитостям, як героїні цієї пісні, справді потрібна thick skin, бо про них постійно хтось говорить.',
          ru: 'Человек с «толстой кожей» не обижается от каждого слова. В английском это скорее комплимент: так говорят об актёрах, спортсменах, блогерах. Противоположное значение у thin-skinned, то есть очень ранимый. Знаменитостям, как героине этой песни, действительно нужна thick skin, потому что о них постоянно кто-то говорит.',
          en: 'A person with thick skin is not hurt by every comment. In English this is usually a compliment, used about actors, athletes or bloggers. The opposite is thin-skinned, which means very sensitive. Famous people like the singer of this song really need thick skin, because someone is always talking about them.',
        },
        ex: ['If you want to be a YouTuber, you need thick skin.', 'My sister has really thick skin. Nothing upsets her.'],
        similar: ['to be thick-skinned', 'opposite: to be thin-skinned'],
        tip: {
          uk: 'Російське «толстокожий» часто звучить як докір (нечутливий). Англійське have thick skin зазвичай звучить позитивно.',
          ru: 'Русское «толстокожий» часто звучит как упрёк (нечуткий). Английское have thick skin обычно звучит положительно.',
          en: 'In Ukrainian and Russian a similar word can sound negative. In English have thick skin is usually positive.',
        },
      },
      {
        en: 'to move on',
        m: { uk: 'рухатися далі, залишити минуле позаду', ru: 'двигаться дальше, оставить прошлое позади', en: 'stop thinking about the past and continue' },
        story: {
          uk: 'Move on буквально «рухатися далі», а в переносному значенні це забути неприємну подію і зосередитися на новому. Його кажуть після сварки, поразки чи розставання. Вираз нейтральний і дуже частий у фільмах. Уся енергія пісні про те, щоб не застрягати в поганому, а йти вперед із посмішкою.',
          ru: 'Move on буквально «двигаться дальше», а в переносном значении это забыть неприятное событие и сосредоточиться на новом. Его говорят после ссоры, поражения или расставания. Выражение нейтральное и очень частое в фильмах. Вся энергия песни о том, чтобы не застревать в плохом, а идти вперёд с улыбкой.',
          en: 'Move on literally means to go forward, and figuratively it means to forget a bad event and focus on something new. People say it after an argument, a lost game or a breakup. It is neutral and very common in films. The song’s energy is all about not getting stuck in the bad stuff and going forward with a smile.',
        },
        ex: ['We lost the match, but it’s time to move on and train for the next one.', 'OK, that’s enough about the test. Let’s move on to the next topic.'],
        similar: ['to get over something', 'to put something behind you'],
        tip: {
          uk: 'На уроках move on також означає «перейти до наступного»: Let’s move on to exercise 3. Не кажіть go further для цього значення.',
          ru: 'На уроках move on также значит «перейти к следующему»: Let’s move on to exercise 3. Не говорите go further в этом значении.',
          en: 'In class, move on also means go to the next thing: Let’s move on to exercise 3.',
        },
      },
      {
        en: 'to talk behind someone’s back',
        m: { uk: 'обговорювати когось за спиною', ru: 'обсуждать кого-то за спиной', en: 'say things about someone when they are not there' },
        story: {
          uk: 'Цей вираз майже однаковий в українській, російській та англійській, тому його легко запам’ятати. Він завжди має негативне значення: так поводяться не дуже чесні люди. Звучить нейтрально, підходить для будь-якої розмови. Плітки та чужі розмови за спиною і є тим «шумом», від якого пісня радить просто відмахнутися.',
          ru: 'Это выражение почти одинаковое в украинском, русском и английском, поэтому его легко запомнить. Оно всегда негативное: так ведут себя не очень честные люди. Звучит нейтрально, подходит для любого разговора. Сплетни и разговоры за спиной и есть тот «шум», от которого песня советует просто отмахнуться.',
          en: 'This expression is almost the same in Ukrainian, Russian and English, so it is easy to remember. It is always negative: honest people don’t do it. It sounds neutral and works in any conversation. Gossip and talk behind your back is exactly the kind of noise the song tells you to ignore.',
        },
        ex: ['A real friend never talks behind your back.', 'I found out they were talking behind my back, and it hurt.'],
        similar: ['to gossip about someone', 'opposite: to say it to someone’s face'],
        tip: {
          uk: 'Не забудьте присвійне слово: behind my back, behind her back. Без нього (behind the back) фраза звучить неправильно.',
          ru: 'Не забудьте притяжательное слово: behind my back, behind her back. Без него (behind the back) фраза звучит неправильно.',
          en: 'Use a possessive: behind my back, behind her back, not behind the back.',
        },
      },
    ],
    culture: [
      {
        uk: 'Тейлор Свіфт починала кар’єру в кантрі-музиці в Нешвіллі (штат Теннессі). Це місто називають Music City, «місто музики», бо воно головний центр кантрі в США.',
        ru: 'Тейлор Свифт начинала карьеру в кантри-музыке в Нэшвилле (штат Теннесси). Этот город называют Music City, «город музыки», потому что он главный центр кантри в США.',
        en: 'Taylor Swift started her career in country music in Nashville, Tennessee. The city is called Music City because it is the centre of country music in the USA.',
      },
      {
        uk: 'Фанатів Тейлор Свіфт називають Swifties. В англійській у великих фан-спільнот часто є власні назви, і їх можна почути навіть у новинах.',
        ru: 'Фанатов Тейлор Свифт называют Swifties. В английском у больших фан-сообществ часто есть свои названия, и их можно услышать даже в новостях.',
        en: 'Taylor Swift’s fans are called Swifties. In English, big fan communities often have their own names, and you can even hear them in the news.',
      },
      {
        uk: 'Черлідинг (cheerleading) дуже популярний в американських школах і університетах. Команди черлідерів підтримують шкільні збірні з американського футболу й баскетболу танцями, акробатикою та кричалками.',
        ru: 'Черлидинг (cheerleading) очень популярен в американских школах и университетах. Команды черлидеров поддерживают школьные сборные по американскому футболу и баскетболу танцами, акробатикой и кричалками.',
        en: 'Cheerleading is very popular in American schools and universities. Cheer squads support school American football and basketball teams with dances, acrobatics and chants.',
      },
    ],
  },

  'roar': {
    intro: {
      uk: 'Це пісня-гімн для всіх, хто колись мовчав, коли хотілося сказати своє. Вона про те, як тиха людина знаходить у собі силу, і тому в ній так багато енергії. Англійська навколо цієї теми дуже корисна: вирази про сміливість, впевненість і повагу до себе потрібні і в школі, і на співбесіді. Читайте, і ви отримаєте цілий набір слів, щоб підтримати себе й інших.',
      ru: 'Это песня-гимн для всех, кто когда-то молчал, когда хотелось сказать своё. Она о том, как тихий человек находит в себе силу, и поэтому в ней так много энергии. Английский вокруг этой темы очень полезен: выражения о смелости, уверенности и уважении к себе нужны и в школе, и на собеседовании. Читайте, и вы получите целый набор слов, чтобы поддержать себя и других.',
      en: 'This is an anthem for everyone who once stayed silent when they wanted to speak. It is about a quiet person finding their strength, and that is why it is so full of energy. The English around this topic is really useful: expressions about courage, confidence and self-respect help at school and in a job interview. Read on and you will get a whole set of words to support yourself and others.',
    },
    phrases: [
      {
        en: 'to find your voice',
        m: { uk: 'знайти свій голос, почати говорити впевнено', ru: 'найти свой голос, начать говорить уверенно', en: 'become confident enough to say what you think' },
        story: {
          uk: 'Find your voice не про спів, а про сміливість висловлювати власну думку. Так кажуть про людину, яка довго була сором’язливою, а потім почала говорити. Вираз трохи книжний, його часто чують у промовах і інтерв’ю. Пісня якраз про перехід від мовчання до сили, тож цей вираз описує її головну ідею.',
          ru: 'Find your voice не о пении, а о смелости высказывать своё мнение. Так говорят о человеке, который долго был застенчивым, а потом начал говорить. Выражение немного книжное, его часто слышно в речах и интервью. Песня как раз о переходе от молчания к силе, так что это выражение описывает её главную идею.',
          en: 'Find your voice is not about singing, it is about having the courage to share your opinion. People say it about someone who was shy for a long time and then started to speak up. It is slightly bookish and common in speeches and interviews. The song is about going from silence to strength, so this phrase describes its main idea.',
        },
        ex: ['In the drama club she finally found her voice.', 'Writing a blog helped me find my voice.'],
        similar: ['to speak your mind', 'to come out of your shell'],
        tip: {
          uk: 'Не кажіть find the voice. Потрібне присвійне слово: find your / her / my voice.',
          ru: 'Не говорите find the voice. Нужно притяжательное слово: find your / her / my voice.',
          en: 'Use a possessive: find your / her / my voice, not find the voice.',
        },
      },
      {
        en: 'to believe in yourself',
        m: { uk: 'вірити в себе', ru: 'верить в себя', en: 'trust that you can do it' },
        story: {
          uk: 'Це одна з найпоширеніших фраз підтримки англійською. Її кажуть учителі, тренери й батьки перед важливою подією. Звучить тепло, іноді трохи пафосно, але дуже природно. Пісня про те, як людина починає вірити у свою силу, тож ця фраза могла б бути її підзаголовком.',
          ru: 'Это одна из самых распространённых фраз поддержки на английском. Её говорят учителя, тренеры и родители перед важным событием. Звучит тепло, иногда немного пафосно, но очень естественно. Песня о том, как человек начинает верить в свою силу, так что эта фраза могла бы быть её подзаголовком.',
          en: 'This is one of the most common phrases of support in English. Teachers, coaches and parents say it before an important event. It sounds warm, sometimes a little dramatic, but very natural. The song is about someone starting to believe in their own strength, so this phrase could be its subtitle.',
        },
        ex: ['You studied hard. Believe in yourself!', 'My coach believed in me before I believed in myself.'],
        similar: ['to trust yourself', 'to have faith in yourself'],
        tip: {
          uk: 'Believe in someone означає «вірити в когось», а believe someone означає «вірити словам людини». I believe you = я тобі вірю (що ти кажеш правду).',
          ru: 'Believe in someone значит «верить в кого-то», а believe someone значит «верить словам человека». I believe you = я тебе верю (что ты говоришь правду).',
          en: 'Believe in someone means trust their abilities. Believe someone means think they are telling the truth.',
        },
      },
      {
        en: 'to come out of your shell',
        m: { uk: 'перестати соромитися, «вилізти зі шкаралупи»', ru: 'перестать стесняться, «вылезти из раковины»', en: 'become less shy' },
        story: {
          uk: 'Образ прийшов від черепахи чи равлика, які ховаються в мушлі. Людина, яка come out of her shell, стає відкритішою, більше говорить і посміхається. Вираз теплий і розмовний, його часто кажуть батьки й учителі про дітей. Це саме та зміна, яку описує пісня: від тихої до сміливої.',
          ru: 'Образ пришёл от черепахи или улитки, которые прячутся в раковине. Человек, который come out of his shell, становится открытее, больше говорит и улыбается. Выражение тёплое и разговорное, его часто говорят родители и учителя о детях. Это именно та перемена, которую описывает песня: от тихой к смелой.',
          en: 'The picture comes from a turtle or a snail hiding in its shell. A person who comes out of their shell becomes more open, talks more and smiles more. The phrase is warm and informal, often used by parents and teachers about children. It is exactly the change the song describes: from quiet to brave.',
        },
        ex: ['Tom was very quiet at first, but he came out of his shell after a month.', 'Summer camp really helped my daughter come out of her shell.'],
        similar: ['to open up', 'opposite: to go into your shell'],
        tip: {
          uk: 'Shell тут це мушля або панцир, а не «оболонка». Кажуть out of, а не from: come out of your shell.',
          ru: 'Shell здесь это раковина или панцирь, а не «оболочка». Говорят out of, а не from: come out of your shell.',
          en: 'Say come out of your shell, not come from your shell.',
        },
      },
      {
        en: 'to step out of your comfort zone',
        m: { uk: 'вийти із зони комфорту', ru: 'выйти из зоны комфорта', en: 'try something new and a bit scary' },
        story: {
          uk: 'Comfort zone це все звичне й безпечне. Вийти з неї означає спробувати те, що лякає: виступити на сцені, піти в новий гурток, заговорити англійською з іноземцем. Вираз популярний у психології, бізнесі й спорті. Пісня про людину, яка наважилася на зміни, тож вона ідеально ілюструє цей вираз.',
          ru: 'Comfort zone это всё привычное и безопасное. Выйти из неё значит попробовать то, что пугает: выступить на сцене, пойти в новый кружок, заговорить по-английски с иностранцем. Выражение популярно в психологии, бизнесе и спорте. Песня о человеке, который решился на перемены, так что она идеально иллюстрирует это выражение.',
          en: 'Your comfort zone is everything familiar and safe. Stepping out of it means trying something scary: performing on stage, joining a new club or speaking English with a foreigner. The phrase is popular in psychology, business and sport. The song is about someone who dared to change, so it illustrates this phrase perfectly.',
        },
        ex: ['Singing at the school concert was a big step out of my comfort zone.', 'Travelling alone pushed me out of my comfort zone.'],
        similar: ['to push yourself', 'to take a risk'],
        tip: {
          uk: 'Українською «зона комфорту» без присвійного, а англійською зазвичай your / my comfort zone.',
          ru: 'По-русски «зона комфорта» без притяжательного, а по-английски обычно your / my comfort zone.',
          en: 'In English we usually add a possessive: my / your comfort zone.',
        },
      },
      {
        en: 'to stand your ground',
        m: { uk: 'не відступати, стояти на своєму', ru: 'не отступать, стоять на своём', en: 'not change your opinion under pressure' },
        story: {
          uk: 'Stand your ground означає твердо триматися своєї позиції, навіть коли на тебе тиснуть. Це не про бійку, а про спокійну впевненість: «Я так вважаю, і крапка». Вираз нейтральний, трохи серйозний. Героїня пісні вчиться саме цього: більше не поступатися, коли їй не подобається.',
          ru: 'Stand your ground значит твёрдо держаться своей позиции, даже когда на тебя давят. Это не о драке, а о спокойной уверенности: «Я так считаю, и точка». Выражение нейтральное, немного серьёзное. Героиня песни учится именно этому: больше не уступать, когда ей что-то не нравится.',
          en: 'Stand your ground means to keep your position firmly, even when people push you. It is not about fighting, it is about calm confidence: this is what I think, full stop. The phrase is neutral and a little serious. The singer learns exactly this: not to give in any more when she doesn’t like something.',
        },
        ex: ['Everyone wanted pizza, but I stood my ground and we got sushi.', 'When they tried to change the rules, our captain stood her ground.'],
        similar: ['to stick to your guns', 'to hold firm'],
        tip: {
          uk: 'Не кажіть stand on your ground. Правильно без прийменника: stand your ground.',
          ru: 'Не говорите stand on your ground. Правильно без предлога: stand your ground.',
          en: 'No preposition: stand your ground, not stand on your ground.',
        },
      },
      {
        en: 'to push someone around',
        m: { uk: 'командувати кимось, помикати', ru: 'командовать кем-то, помыкать', en: 'tell someone what to do in an unkind way' },
        story: {
          uk: 'Push someone around це не буквально штовхати, а постійно командувати людиною, не поважаючи її. Найчастіше чують у фразі Don’t let anyone push you around. Вираз розмовний, але не грубий. Пісня про момент, коли людина вирішує, що її більше не будуть push around.',
          ru: 'Push someone around это не буквально толкать, а постоянно командовать человеком, не уважая его. Чаще всего слышно во фразе Don’t let anyone push you around. Выражение разговорное, но не грубое. Песня о моменте, когда человек решает, что им больше не будут push around.',
          en: 'Push someone around doesn’t mean physically pushing. It means always bossing someone about and not respecting them. You often hear it as Don’t let anyone push you around. It is informal but not rude. The song is about the moment someone decides nobody will push them around any more.',
        },
        ex: ['My older brother used to push me around, but not any more.', 'Don’t let anyone push you around. You have a choice.'],
        similar: ['to boss someone around', 'to walk all over someone'],
        tip: {
          uk: 'Займенник стоїть посередині: push me around, а не push around me.',
          ru: 'Местоимение стоит посередине: push me around, а не push around me.',
          en: 'The pronoun goes in the middle: push me around, not push around me.',
        },
      },
      {
        en: 'never give up',
        m: { uk: 'ніколи не здавайся', ru: 'никогда не сдавайся', en: 'keep trying, don’t stop' },
        story: {
          uk: 'Give up означає «здатися, кинути». Never give up одна з найвідоміших мотиваційних фраз англійською, її пишуть на стінах спортзалів. Звучить сильно, але просто, тому підходить навіть малюкам. Пісня сповнена саме такого настрою: впасти можна, а здаватися не можна.',
          ru: 'Give up значит «сдаться, бросить». Never give up одна из самых известных мотивационных фраз на английском, её пишут на стенах спортзалов. Звучит сильно, но просто, поэтому подходит даже малышам. Песня полна именно такого настроения: упасть можно, а сдаваться нельзя.',
          en: 'Give up means stop trying. Never give up is one of the best-known motivational phrases in English, often painted on gym walls. It sounds strong but simple, so even small kids can use it. The song is full of this feeling: you can fall, but you never quit.',
        },
        ex: ['The puzzle was hard, but she never gave up.', 'Never give up on your dreams.'],
        similar: ['keep trying', 'don’t quit', 'hang in there'],
        tip: {
          uk: 'Give up також означає «кинути звичку»: give up sweets. Після give up дієслово з -ing: give up eating sweets, а не give up to eat.',
          ru: 'Give up также значит «бросить привычку»: give up sweets. После give up глагол с -ing: give up eating sweets, а не give up to eat.',
          en: 'After give up, use -ing: give up eating sweets, not give up to eat.',
        },
      },
      {
        en: 'to hold your head high',
        m: { uk: 'триматися гордо, з високо піднятою головою', ru: 'держаться гордо, с высоко поднятой головой', en: 'feel proud and not ashamed' },
        story: {
          uk: 'Цей вираз схожий в українській і російській, і означає не соромитися, а триматися з гідністю. Його кажуть після поразки, коли людина все одно зробила все, що могла. Звучить трохи урочисто. Пісня наповнена саме такою гордістю за себе, і її приємно слухати з високо піднятою головою.',
          ru: 'Это выражение похоже в украинском и русском и значит не стыдиться, а держаться с достоинством. Его говорят после поражения, когда человек всё равно сделал всё, что мог. Звучит немного торжественно. Песня наполнена именно такой гордостью за себя, и её приятно слушать с высоко поднятой головой.',
          en: 'This expression is similar in Ukrainian and Russian. It means don’t be ashamed, keep your dignity. People say it after a loss when someone still did their best. It sounds a little formal and proud. The song is full of this kind of self-respect.',
        },
        ex: ['We lost the final, but we can hold our heads high.', 'She walked into the room with her head held high.'],
        similar: ['to be proud of yourself', 'to keep your chin up'],
        tip: {
          uk: 'Кажуть high, а не up: hold your head high. Для кількох людей: hold our heads high (множина heads).',
          ru: 'Говорят high, а не up: hold your head high. Для нескольких людей: hold our heads high (множественное heads).',
          en: 'Say high, not up. For a group: hold our heads high, with plural heads.',
        },
      },
      {
        en: 'I’ve got this',
        m: { uk: 'я впораюсь, я зможу', ru: 'я справлюсь, у меня получится', en: 'I can do it myself' },
        story: {
          uk: 'Коротка розмовна фраза, яку кажуть, щоб показати впевненість: «Не хвилюйся, я сам». Часто її кажуть самому собі перед важким завданням. Вираз неформальний і дуже сучасний. Це внутрішній голос героїні пісні після її перетворення.',
          ru: 'Короткая разговорная фраза, которую говорят, чтобы показать уверенность: «Не волнуйся, я сам». Часто её говорят самому себе перед трудной задачей. Выражение неформальное и очень современное. Это внутренний голос героини песни после её превращения.',
          en: 'A short spoken phrase to show confidence: don’t worry, I can handle it. People often say it to themselves before a hard task. It is informal and very modern. It sounds like the singer’s inner voice after her change.',
        },
        ex: ['Do you need help with the bags? No thanks, I’ve got this.', 'Big test today. Deep breath. I’ve got this!'],
        similar: ['I can handle it', 'leave it to me', 'you’ve got this (to encourage someone)'],
        tip: {
          uk: 'Не плутайте з I’ve got you (я тебе підтримаю). I’ve got this = я сам впораюсь із цією справою.',
          ru: 'Не путайте с I’ve got you (я тебя поддержу). I’ve got this = я сам справлюсь с этим делом.',
          en: 'Don’t mix it up with I’ve got you, which means I will support you.',
        },
      },
      {
        en: 'a fresh start',
        m: { uk: 'новий початок, почати з чистого аркуша', ru: 'новое начало, начать с чистого листа', en: 'a chance to begin again' },
        story: {
          uk: 'A fresh start це нагода почати все спочатку: новий рік, нова школа, нове місто. Слово fresh тут означає не «свіжий хліб», а «новий, чистий». Вираз нейтральний і дуже оптимістичний. Пісня звучить як момент, коли людина вирішує почати нове життя, сильнішою, ніж була.',
          ru: 'A fresh start это возможность начать всё сначала: новый год, новая школа, новый город. Слово fresh здесь значит не «свежий хлеб», а «новый, чистый». Выражение нейтральное и очень оптимистичное. Песня звучит как момент, когда человек решает начать новую жизнь, сильнее, чем был.',
          en: 'A fresh start is a chance to begin again: a new year, a new school, a new town. Fresh here doesn’t mean fresh bread, it means new and clean. The phrase is neutral and very hopeful. The song feels like the moment someone decides to begin a new life, stronger than before.',
        },
        ex: ['September is a fresh start for every student.', 'After moving to Lviv, our family had a fresh start.'],
        similar: ['a new beginning', 'a clean slate', 'to turn over a new leaf'],
        tip: {
          uk: 'Не забувайте артикль a: make a fresh start, have a fresh start.',
          ru: 'Не забывайте артикль a: make a fresh start, have a fresh start.',
          en: 'Remember the article: make a fresh start, not make fresh start.',
        },
      },
    ],
    culture: [
      {
        uk: 'Слово anthem (гімн) в англійській означає не лише державний гімн (national anthem). Так називають і пісню, яка об’єднує й надихає багатьох людей, наприклад, на стадіоні чи на концерті.',
        ru: 'Слово anthem (гимн) в английском значит не только государственный гимн (national anthem). Так называют и песню, которая объединяет и вдохновляет многих людей, например, на стадионе или на концерте.',
        en: 'In English, anthem doesn’t only mean a national anthem. It is also a song that unites and inspires many people, for example at a stadium or a concert.',
      },
      {
        uk: 'Мабуть, найвідоміший рик у світі кіно належить леву з заставки голлівудської студії MGM. Він звучить на початку фільмів студії ще з часів старого Голлівуду.',
        ru: 'Пожалуй, самый известный рык в мире кино принадлежит льву из заставки голливудской студии MGM. Он звучит в начале фильмов студии ещё со времён старого Голливуда.',
        en: 'Probably the most famous roar in film belongs to the lion in the logo of the Hollywood studio MGM. It has opened the studio’s films since the days of old Hollywood.',
      },
      {
        uk: 'Фанатів Кеті Перрі називають KatyCats, тобто «котики Кеті».',
        ru: 'Фанатов Кэти Перри называют KatyCats, то есть «котики Кэти».',
        en: 'Katy Perry’s fans are called KatyCats.',
      },
    ],
  },

  'firework': {
    intro: {
      uk: 'Ця пісня як обійми для тих, хто почувається непомітним: вона нагадує, що в кожному є щось яскраве. Тому навколо неї зручно вчити англійську про почуття, підтримку і надію. Також ви зустрінете слова про свята й вогні в небі, які стануть у пригоді на Новий рік чи день народження. Розберемо вирази, якими носії підбадьорюють одне одного, і кілька цікавих фактів про феєрверки.',
      ru: 'Эта песня как объятие для тех, кто чувствует себя незаметным: она напоминает, что в каждом есть что-то яркое. Поэтому вокруг неё удобно учить английский о чувствах, поддержке и надежде. Также вы встретите слова о праздниках и огнях в небе, которые пригодятся на Новый год или день рождения. Разберём выражения, которыми носители подбадривают друг друга, и несколько интересных фактов о фейерверках.',
      en: 'This song is like a hug for anyone who feels invisible: it reminds us that everyone has something bright inside. That makes it a great base for English about feelings, support and hope. You will also meet words about celebrations and lights in the sky, useful for New Year or a birthday. Let’s look at the expressions native speakers use to encourage each other, plus a few fun facts about fireworks.',
    },
    phrases: [
      {
        en: 'to stand out',
        m: { uk: 'вирізнятися, бути помітним', ru: 'выделяться, быть заметным', en: 'be easy to notice, be different' },
        story: {
          uk: 'Stand out означає вирізнятися з-поміж інших, і зазвичай це добре. Часто кажуть stand out from the crowd, тобто «вирізнятися з натовпу». Вираз нейтральний, підходить і для школи, і для резюме. Пісня про те, що кожен може засяяти й бути помітним, як вогонь у нічному небі.',
          ru: 'Stand out значит выделяться среди других, и обычно это хорошо. Часто говорят stand out from the crowd, то есть «выделяться из толпы». Выражение нейтральное, подходит и для школы, и для резюме. Песня о том, что каждый может засиять и быть заметным, как огонь в ночном небе.',
          en: 'Stand out means to be different from others, and usually that is a good thing. People often say stand out from the crowd. It is neutral and works at school and in a CV. The song is about how anyone can shine and be noticed, like a light in the night sky.',
        },
        ex: ['Her bright yellow coat really stands out.', 'Your project stood out because it was so creative.'],
        similar: ['to stand out from the crowd', 'to catch someone’s eye'],
        tip: {
          uk: 'Не плутайте stand out (вирізнятися) і stand up (встати). Також не кажіть stand out of the crowd: правильно from the crowd.',
          ru: 'Не путайте stand out (выделяться) и stand up (встать). Также не говорите stand out of the crowd: правильно from the crowd.',
          en: 'Don’t confuse stand out with stand up. Say stand out from the crowd, not of the crowd.',
        },
      },
      {
        en: 'one of a kind',
        m: { uk: 'єдиний у своєму роді, неповторний', ru: 'единственный в своём роде, неповторимый', en: 'unique, there is nobody else like you' },
        story: {
          uk: 'One of a kind означає «такий один», без копій. Так кажуть про людину, річ ручної роботи або особливе місце. Вираз теплий і трохи урочистий, це гарний комплімент. Ідея пісні в тому, що кожна людина неповторна, і ця фраза каже те саме простими словами.',
          ru: 'One of a kind значит «такой один», без копий. Так говорят о человеке, вещи ручной работы или особом месте. Выражение тёплое и немного торжественное, это хороший комплимент. Идея песни в том, что каждый человек неповторим, и эта фраза говорит то же самое простыми словами.',
          en: 'One of a kind means there is only one, with no copies. People say it about a person, a handmade object or a special place. It is warm and a little formal, and it makes a lovely compliment. The song’s idea is that every person is unique, and this phrase says the same thing in simple words.',
        },
        ex: ['My grandma is one of a kind. Nobody tells stories like her.', 'This handmade cup is one of a kind.'],
        similar: ['unique', 'special', 'there’s nobody like you'],
        tip: {
          uk: 'Перед іменником пишуть через дефіс: a one-of-a-kind gift. Після дієслова без дефісів: She is one of a kind.',
          ru: 'Перед существительным пишут через дефис: a one-of-a-kind gift. После глагола без дефисов: She is one of a kind.',
          en: 'Before a noun use hyphens: a one-of-a-kind gift. After a verb, no hyphens: She is one of a kind.',
        },
      },
      {
        en: 'to go off',
        m: { uk: 'вибухнути, спрацювати (про феєрверк, будильник)', ru: 'взорваться, сработать (о фейерверке, будильнике)', en: 'explode or start making a noise' },
        story: {
          uk: 'Go off це фразове дієслово з кількома значеннями. Про феєрверк воно означає «вибухнути в небі», а про будильник чи сигналізацію «задзвонити». Звучить нейтрально і дуже часто. Феєрверк, що спалахує в небі, головний образ пісні, тож це дієслово вам точно знадобиться.',
          ru: 'Go off это фразовый глагол с несколькими значениями. О фейерверке он значит «взорваться в небе», а о будильнике или сигнализации «зазвонить». Звучит нейтрально и очень часто. Фейерверк, вспыхивающий в небе, главный образ песни, так что этот глагол вам точно пригодится.',
          en: 'Go off is a phrasal verb with several meanings. For fireworks it means to explode in the sky, for an alarm clock or a car alarm it means to start ringing. It is neutral and very common. A firework bursting in the sky is the main image of the song, so you will need this verb.',
        },
        ex: ['At midnight the fireworks went off over the river.', 'My alarm didn’t go off, so I was late for school.'],
        similar: ['to set off fireworks (make them start)', 'to explode', 'to ring'],
        tip: {
          uk: 'Хто запускає феєрверк, той set off fireworks. Самі феєрверки go off. Не кажіть I went off the fireworks.',
          ru: 'Кто запускает фейерверк, тот set off fireworks. Сами фейерверки go off. Не говорите I went off the fireworks.',
          en: 'People set off fireworks; fireworks go off. Don’t say I went off the fireworks.',
        },
      },
      {
        en: 'light at the end of the tunnel',
        m: { uk: 'світло в кінці тунелю, надія', ru: 'свет в конце тоннеля, надежда', en: 'a sign that a hard time will end soon' },
        story: {
          uk: 'Цей образ однаковий в українській, російській та англійській. Коли довго йдеш темним тунелем, вогник попереду означає, що вихід близько. Так кажуть про кінець важкого періоду: іспитів, хвороби, ремонту. Пісня дарує надію тим, кому зараз темно, і цей вираз ідеально пасує до її настрою.',
          ru: 'Этот образ одинаковый в украинском, русском и английском. Когда долго идёшь тёмным тоннелем, огонёк впереди значит, что выход близко. Так говорят о конце трудного периода: экзаменов, болезни, ремонта. Песня дарит надежду тем, кому сейчас темно, и это выражение идеально подходит к её настроению.',
          en: 'This image is the same in Ukrainian, Russian and English. When you walk through a dark tunnel, a light ahead means the exit is near. People use it about the end of a hard time: exams, an illness, a long renovation. The song gives hope to people in a dark moment, so this phrase matches its mood perfectly.',
        },
        ex: ['Only two more exams. I can see the light at the end of the tunnel!', 'The renovation took months, but now there’s light at the end of the tunnel.'],
        similar: ['things will get better', 'every cloud has a silver lining'],
        tip: {
          uk: 'Найчастіше кажуть see the light at the end of the tunnel або there is light at the end of the tunnel. Артикль the перед light і tunnel обов’язковий.',
          ru: 'Чаще всего говорят see the light at the end of the tunnel или there is light at the end of the tunnel. Артикль the перед tunnel обязателен.',
          en: 'Usually: see the light at the end of the tunnel. Don’t drop the before tunnel.',
        },
      },
      {
        en: 'to make someone’s day',
        m: { uk: 'зробити комусь день, дуже потішити', ru: 'сделать кому-то день, очень порадовать', en: 'make someone very happy' },
        story: {
          uk: 'Якщо щось made your day, це настільки вас порадувало, що весь день став кращим. Дрібниця, як-от посмішка чи лист від друга, може make someone’s day. Вираз розмовний і дуже позитивний. Пісня про внутрішнє світло, яким людина може освітити не лише себе, а й інших.',
          ru: 'Если что-то made your day, это настолько вас порадовало, что весь день стал лучше. Мелочь, вроде улыбки или письма от друга, может make someone’s day. Выражение разговорное и очень позитивное. Песня о внутреннем свете, которым человек может осветить не только себя, но и других.',
          en: 'If something made your day, it made you so happy that the whole day felt better. A small thing, like a smile or a note from a friend, can make someone’s day. It is informal and very positive. The song is about an inner light that can brighten not only you but other people too.',
        },
        ex: ['Your message really made my day. Thank you!', 'The puppy at the door made everyone’s day.'],
        similar: ['to brighten someone’s day', 'to put a smile on someone’s face'],
        tip: {
          uk: 'Не перекладайте як do someone’s day. Правильне дієслово make.',
          ru: 'Не переводите как do someone’s day. Правильный глагол make.',
          en: 'The verb is make, never do: you made my day.',
        },
      },
      {
        en: 'to look on the bright side',
        m: { uk: 'дивитися на все з оптимізмом, бачити хороше', ru: 'смотреть на всё с оптимизмом, видеть хорошее', en: 'notice the good part of a bad situation' },
        story: {
          uk: 'Look on the bright side означає шукати хороше навіть у неприємній ситуації. Дощ скасував пікнік? Зате можна подивитися фільм удома. Вираз дружній і трохи жартівливий. Пісня якраз про оптимізм і про те, що яскраве обов’язково настане, тому цей вираз тут на своєму місці.',
          ru: 'Look on the bright side значит искать хорошее даже в неприятной ситуации. Дождь отменил пикник? Зато можно посмотреть фильм дома. Выражение дружеское и немного шутливое. Песня как раз об оптимизме и о том, что яркое обязательно наступит, поэтому это выражение здесь на своём месте.',
          en: 'Look on the bright side means to find something good even in a bad situation. Rain cancelled the picnic? Well, now we can watch a film at home. The phrase is friendly and a little playful. The song is about optimism and the promise that bright moments will come, so it fits here.',
        },
        ex: ['I missed the bus, but look on the bright side: I got some exercise walking.', 'Try to look on the bright side. You learned a lot from this mistake.'],
        similar: ['every cloud has a silver lining', 'to stay positive'],
        tip: {
          uk: 'Прийменник on, а не at: look on the bright side.',
          ru: 'Предлог on, а не at: look on the bright side.',
          en: 'The preposition is on, not at: look on the bright side.',
        },
      },
      {
        en: 'to feel left out',
        m: { uk: 'почуватися зайвим, покинутим', ru: 'чувствовать себя лишним, брошенным', en: 'feel that people don’t include you' },
        story: {
          uk: 'Feel left out означає відчувати, що тебе не взяли в гру, компанію чи розмову. Це дуже поширене почуття в школі та на новій роботі. Вираз нейтральний і м’який, ним легко поділитися з дорослим. Пісня звертається саме до тих, хто так почувається, і каже їм, що вони важливі.',
          ru: 'Feel left out значит чувствовать, что тебя не взяли в игру, компанию или разговор. Это очень частое чувство в школе и на новой работе. Выражение нейтральное и мягкое, им легко поделиться со взрослым. Песня обращается именно к тем, кто так себя чувствует, и говорит им, что они важны.',
          en: 'Feel left out means you feel people didn’t include you in a game, a group or a conversation. It is a very common feeling at school or in a new job. The phrase is neutral and gentle, easy to share with an adult. The song speaks to people who feel this way and tells them they matter.',
        },
        ex: ['Everyone went to the party without me and I felt left out.', 'Let’s ask the new girl to play so she doesn’t feel left out.'],
        similar: ['to feel lonely', 'to feel invisible', 'opposite: to feel included'],
        tip: {
          uk: 'Left тут не «лівий», а форма дієслова leave (залишати). Leave someone out = не включити когось.',
          ru: 'Left здесь не «левый», а форма глагола leave (оставлять). Leave someone out = не включить кого-то.',
          en: 'Left here is not the direction; it is from leave. Leave someone out means not include them.',
        },
      },
      {
        en: 'to fit in',
        m: { uk: 'вписатися, стати своїм', ru: 'вписаться, стать своим', en: 'feel accepted by a group' },
        story: {
          uk: 'Fit in означає відчувати, що ти «свій» у групі, класі чи новому місті. Багато людей намагаються fit in і через це ховають свої особливості. Вираз нейтральний, його часто чують у фільмах про школу. Пісня ж каже протилежне: не обов’язково вписуватися, краще сяяти по-своєму.',
          ru: 'Fit in значит чувствовать, что ты «свой» в группе, классе или новом городе. Многие стараются fit in и из-за этого прячут свои особенности. Выражение нейтральное, его часто слышно в фильмах о школе. Песня же говорит обратное: не обязательно вписываться, лучше сиять по-своему.',
          en: 'Fit in means to feel accepted in a group, a class or a new town. Many people try hard to fit in and hide what makes them different. It is neutral and very common in school films. The song says the opposite: you don’t have to fit in, it is better to shine in your own way.',
        },
        ex: ['It took me a few weeks to fit in at my new school.', 'You don’t have to change to fit in.'],
        similar: ['to belong', 'to be part of the group', 'opposite: to stand out'],
        tip: {
          uk: 'Fit in у минулому часі зазвичай fitted in (британський варіант) або fit in (американський). Обидва правильні.',
          ru: 'Fit in в прошедшем времени обычно fitted in (британский вариант) или fit in (американский). Оба правильные.',
          en: 'The past form is fitted in in British English and fit in in American English. Both are correct.',
        },
      },
      {
        en: 'to make a difference',
        m: { uk: 'мати значення, змінити щось на краще', ru: 'иметь значение, изменить что-то к лучшему', en: 'have a good effect' },
        story: {
          uk: 'Make a difference означає своїми діями змінити щось на краще, навіть зовсім трохи. Це улюблений вираз волонтерів, учителів і лікарів. Звучить нейтрально, підходить для есе й промов. Пісня нагадує, що кожна людина важлива і може зробити світ трохи яскравішим.',
          ru: 'Make a difference значит своими действиями изменить что-то к лучшему, даже совсем немного. Это любимое выражение волонтёров, учителей и врачей. Звучит нейтрально, подходит для эссе и речей. Песня напоминает, что каждый человек важен и может сделать мир чуть ярче.',
          en: 'Make a difference means to change something for the better through your actions, even a little. It is a favourite phrase of volunteers, teachers and doctors. It is neutral and great for essays and speeches. The song reminds us that every person matters and can make the world a bit brighter.',
        },
        ex: ['Even a small smile can make a difference.', 'Volunteers at the animal shelter really make a difference.'],
        similar: ['to change things for the better', 'to have an impact'],
        tip: {
          uk: 'Не кажіть do a difference. Правильно make a difference. А It makes no difference означає «Немає різниці».',
          ru: 'Не говорите do a difference. Правильно make a difference. А It makes no difference значит «Нет разницы».',
          en: 'Say make a difference, not do a difference. It makes no difference means it doesn’t matter.',
        },
      },
      {
        en: 'every cloud has a silver lining',
        m: { uk: 'немає лиха без добра', ru: 'нет худа без добра', en: 'something good comes from every bad situation' },
        story: {
          uk: 'Буквально: «у кожної хмари є срібна облямівка». Коли сонце світить із-за хмари, її краї сяють сріблом. Це старе англійське прислів’я, його часто скорочують до a silver lining. Пісня обіцяє, що після темряви буде світло, тож прислів’я дуже близьке їй за духом.',
          ru: 'Буквально: «у каждой тучи есть серебряная кайма». Когда солнце светит из-за тучи, её края сияют серебром. Это старая английская пословица, её часто сокращают до a silver lining. Песня обещает, что после темноты будет свет, так что пословица очень близка ей по духу.',
          en: 'When the sun is behind a cloud, the edges of the cloud shine like silver. This is an old English proverb, often shortened to a silver lining. The song promises that light comes after darkness, so this proverb is very close to its spirit.',
        },
        ex: ['I broke my leg, but the silver lining is that I read ten books.', 'Every cloud has a silver lining: the cancelled trip means more time with family.'],
        similar: ['to look on the bright side', 'it’s a blessing in disguise'],
        tip: {
          uk: 'Прислів’я не перекладають дослівно. Українською краще передати як «немає лиха без добра».',
          ru: 'Пословицы не переводят дословно. По-русски лучше передать как «нет худа без добра».',
          en: 'Don’t translate proverbs word for word; use the matching proverb in your language.',
        },
      },
    ],
    culture: [
      {
        uk: 'Феєрверки винайшли в Стародавньому Китаї. Відтоді вони стали частиною свят у всьому світі, від Нового року до Дня незалежності.',
        ru: 'Фейерверки изобрели в Древнем Китае. С тех пор они стали частью праздников по всему миру, от Нового года до Дня независимости.',
        en: 'Fireworks were invented in ancient China. Since then they have become part of celebrations all over the world, from New Year to Independence Days.',
      },
      {
        uk: 'У Великій Британії 5 листопада святкують Bonfire Night, або Guy Fawkes Night. Того вечора палять багаття й запускають феєрверки на згадку про невдалу змову 1605 року.',
        ru: 'В Великобритании 5 ноября празднуют Bonfire Night, или Guy Fawkes Night. В этот вечер жгут костры и запускают фейерверки в память о неудавшемся заговоре 1605 года.',
        en: 'In the UK, 5 November is Bonfire Night, or Guy Fawkes Night. People light bonfires and set off fireworks to remember a failed plot in 1605.',
      },
      {
        uk: 'Новорічний феєрверк над гаванню Сіднея в Австралії один із найвідоміших у світі. Через часові пояси Австралія зустрічає Новий рік раніше за більшість країн.',
        ru: 'Новогодний фейерверк над гаванью Сиднея в Австралии один из самых известных в мире. Из-за часовых поясов Австралия встречает Новый год раньше большинства стран.',
        en: 'The New Year’s Eve fireworks over Sydney Harbour in Australia are among the most famous in the world. Because of time zones, Australia welcomes the New Year earlier than most countries.',
      },
    ],
  },

  'perfect': {
    intro: {
      uk: 'Це одна з найпопулярніших пісень для першого танцю на весіллі, тому вона ідеальна, щоб поговорити про кохання англійською. Мелодія спокійна, слова співаються чітко, і слухати її приємно навіть тим, хто тільки починає вчити мову. Нижче зібрано вирази, якими носії описують закоханість, стосунки й весілля: від милих розмовних до класичних ідіом. Усі приклади підходять для будь-якого віку.',
      ru: 'Это одна из самых популярных песен для первого танца на свадьбе, поэтому она идеальна, чтобы поговорить о любви по-английски. Мелодия спокойная, слова поются чётко, и слушать её приятно даже тем, кто только начинает учить язык. Ниже собраны выражения, которыми носители описывают влюблённость, отношения и свадьбы: от милых разговорных до классических идиом. Все примеры подходят для любого возраста.',
      en: 'This is one of the most popular songs for a first dance at a wedding, so it is perfect for talking about love in English. The melody is calm, the words are sung clearly, and it is pleasant even for beginners. Below you will find expressions native speakers use for being in love, relationships and weddings, from sweet everyday phrases to classic idioms. All the examples are suitable for any age.',
    },
    phrases: [
      {
        en: 'love at first sight',
        m: { uk: 'кохання з першого погляду', ru: 'любовь с первого взгляда', en: 'falling in love the moment you see someone' },
        story: {
          uk: 'Вираз майже дослівно збігається з українським і російським. Sight тут означає «погляд, бачення». Його вживають і серйозно, і жартома: про людину, улюблене місто або навіть цуценя в притулку. Пісня про почуття, яке здається ідеальним від самого початку, тож ця фраза легко спадає на думку.',
          ru: 'Выражение почти дословно совпадает с русским и украинским. Sight здесь значит «взгляд, зрение». Его используют и серьёзно, и в шутку: о человеке, любимом городе или даже щенке в приюте. Песня о чувстве, которое кажется идеальным с самого начала, так что эта фраза легко приходит на ум.',
          en: 'This phrase matches the Ukrainian and Russian almost word for word. Sight here means seeing. People use it seriously and as a joke: about a person, a favourite city or even a puppy at a shelter. The song is about a feeling that seems perfect from the start, so this phrase comes to mind easily.',
        },
        ex: ['My grandparents say it was love at first sight.', 'When I saw this little kitten, it was love at first sight!'],
        similar: ['to fall in love', 'to fall for someone'],
        tip: {
          uk: 'Не кажіть love from first look. Правильно at first sight, і без артикля перед first.',
          ru: 'Не говорите love from first look. Правильно at first sight, и без артикля перед first.',
          en: 'Say at first sight, not from first look, and no article before first.',
        },
      },
      {
        en: 'head over heels',
        m: { uk: 'закоханий по вуха', ru: 'влюблён по уши', en: 'completely in love' },
        story: {
          uk: 'Буквально «головою через п’яти», як під час перекиду. Так англійці описують сильну закоханість, від якої все перевертається. Зазвичай кажуть be head over heels in love або fall head over heels for someone. Ніжний, мрійливий настрій пісні ідеально пасує до цього виразу.',
          ru: 'Буквально «головой через пятки», как во время кувырка. Так англичане описывают сильную влюблённость, от которой всё переворачивается. Обычно говорят be head over heels in love или fall head over heels for someone. Нежное, мечтательное настроение песни идеально подходит к этому выражению.',
          en: 'Literally, your head goes over your heels, like in a somersault. That is how English describes a strong love that turns everything upside down. You usually hear be head over heels in love or fall head over heels for someone. The gentle, dreamy mood of the song suits this phrase perfectly.',
        },
        ex: ['He fell head over heels for her at a summer camp.', 'They are head over heels in love.'],
        similar: ['madly in love', 'crazy about someone'],
        tip: {
          uk: 'Українське «по вуха» англійською ніколи не up to the ears. Кажуть head over heels.',
          ru: 'Русское «по уши» по-английски никогда не up to the ears. Говорят head over heels.',
          en: 'Don’t translate the Ukrainian or Russian idiom as up to the ears. Say head over heels.',
        },
      },
      {
        en: 'to be made for each other',
        m: { uk: 'бути створеними одне для одного', ru: 'быть созданными друг для друга', en: 'be a perfect match' },
        story: {
          uk: 'Так кажуть про двох людей, які чудово підходять одне одному: мають схожі мрії, гумор і звички. Вираз теплий, часто звучить у весільних тостах. Можна вживати і жартома, наприклад про чай і печиво. Пісня про пару, де все здається на своєму місці, тож вираз їй дуже личить.',
          ru: 'Так говорят о двух людях, которые прекрасно подходят друг другу: у них похожие мечты, юмор и привычки. Выражение тёплое, часто звучит в свадебных тостах. Можно использовать и в шутку, например о чае и печенье. Песня о паре, где всё кажется на своём месте, так что выражение ей очень идёт.',
          en: 'People say this about two people who match perfectly: similar dreams, humour and habits. It is warm and often heard in wedding speeches. You can also use it as a joke, for example about tea and biscuits. The song is about a couple where everything feels right, so the phrase suits it.',
        },
        ex: ['Look at them dancing. They were made for each other.', 'Tea and biscuits were made for each other!'],
        similar: ['a perfect match', 'a match made in heaven'],
        tip: {
          uk: 'Кажуть each other, а не themselves. They were made for themselves означає щось зовсім інше.',
          ru: 'Говорят each other, а не themselves. They were made for themselves значит совсем другое.',
          en: 'Use each other, not themselves.',
        },
      },
      {
        en: 'to mean the world to someone',
        m: { uk: 'означати для когось цілий світ, бути найдорожчим', ru: 'значить для кого-то весь мир, быть самым дорогим', en: 'be extremely important to someone' },
        story: {
          uk: 'Якщо хтось means the world to you, ця людина для вас найважливіша. Вираз підходить не лише для коханих, а й для батьків, дітей, друзів і навіть улюблених тварин. Також кажуть It would mean the world to me, коли щиро про щось просять. Пісня сповнена саме такого почуття до однієї людини.',
          ru: 'Если кто-то means the world to you, этот человек для вас самый важный. Выражение подходит не только для любимых, но и для родителей, детей, друзей и даже любимых животных. Также говорят It would mean the world to me, когда искренне о чём-то просят. Песня полна именно такого чувства к одному человеку.',
          en: 'If someone means the world to you, they are the most important person in your life. It works for partners, parents, children, friends and even pets. People also say It would mean the world to me when they sincerely ask for something. The song is full of this feeling for one special person.',
        },
        ex: ['My little sister means the world to me.', 'Thank you for coming. It means the world to us.'],
        similar: ['to mean a lot to someone', 'to be everything to someone'],
        tip: {
          uk: 'Не кажіть mean all the world for me. Правильно mean the world to me, з прийменником to.',
          ru: 'Не говорите mean all the world for me. Правильно mean the world to me, с предлогом to.',
          en: 'Use to, not for: it means the world to me.',
        },
      },
      {
        en: 'to take someone’s breath away',
        m: { uk: 'аж подих перехопило, вразити красою', ru: 'дух захватывает, поразить красотой', en: 'be so beautiful that it surprises you' },
        story: {
          uk: 'Коли щось take your breath away, воно настільки красиве, що ви на мить завмираєте. Так кажуть про краєвиди, сукні, музику або людей. Від цього виразу походить прикметник breathtaking, тобто «захопливий». Пісня описує момент, коли людина здається найкрасивішою у світі, тому вираз тут дуже доречний.',
          ru: 'Когда что-то take your breath away, оно настолько красиво, что вы на миг замираете. Так говорят о пейзажах, платьях, музыке или людях. От этого выражения образовано прилагательное breathtaking, то есть «захватывающий». Песня описывает момент, когда человек кажется самым красивым в мире, поэтому выражение здесь очень уместно.',
          en: 'When something takes your breath away, it is so beautiful that you freeze for a moment. People say it about views, dresses, music or people. The adjective breathtaking comes from this phrase. The song describes a moment when someone looks like the most beautiful person in the world, so this phrase fits well.',
        },
        ex: ['The view from the mountain took my breath away.', 'When the bride walked in, she took everyone’s breath away.'],
        similar: ['breathtaking', 'stunning', 'to blow someone away'],
        tip: {
          uk: 'Breath (подих, іменник) вимовляється [breθ], а breathe (дихати, дієслово) [briːð]. У цьому виразі потрібен іменник breath.',
          ru: 'Breath (дыхание, существительное) произносится [breθ], а breathe (дышать, глагол) [briːð]. В этом выражении нужно существительное breath.',
          en: 'Breath (noun) sounds like [breθ]; breathe (verb) sounds like [briːð]. This phrase uses the noun breath.',
        },
      },
      {
        en: 'to tie the knot',
        m: { uk: 'одружитися, «зав’язати вузол»', ru: 'пожениться, «завязать узел»', en: 'get married' },
        story: {
          uk: 'Tie the knot це розмовний і трохи жартівливий спосіб сказати get married. Образ вузла означає міцний зв’язок двох людей. Вираз часто зустрічається в новинах про знаменитостей. Оскільки пісню так часто вмикають на весіллях, цей вираз якраз до теми.',
          ru: 'Tie the knot это разговорный и немного шутливый способ сказать get married. Образ узла означает крепкую связь двух людей. Выражение часто встречается в новостях о знаменитостях. Так как песню часто включают на свадьбах, это выражение как раз по теме.',
          en: 'Tie the knot is an informal, slightly playful way to say get married. The knot is a picture of a strong bond between two people. The phrase is common in celebrity news. Since this song is played at so many weddings, the expression fits right in.',
        },
        ex: ['My aunt and her fiancé are tying the knot in June.', 'They tied the knot on a beach in Greece.'],
        similar: ['to get married', 'to get hitched (very informal)'],
        tip: {
          uk: 'Літера k у knot не вимовляється: [nɒt], як not.',
          ru: 'Буква k в knot не произносится: [nɒt], как not.',
          en: 'The k in knot is silent: it sounds like not.',
        },
      },
      {
        en: 'to pop the question',
        m: { uk: 'зробити пропозицію руки й серця', ru: 'сделать предложение руки и сердца', en: 'ask someone to marry you' },
        story: {
          uk: 'Pop тут означає «раптово, швидко сказати». The question це, звісно, «Will you marry me?». Вираз неформальний і веселий, його часто чують у фільмах. Офіційно це propose to someone. Пісня про кохання, яке веде до весілля, тому цей вираз природно продовжує тему.',
          ru: 'Pop здесь значит «внезапно, быстро сказать». The question это, конечно, «Will you marry me?». Выражение неформальное и весёлое, его часто слышно в фильмах. Официально это propose to someone. Песня о любви, которая ведёт к свадьбе, поэтому это выражение естественно продолжает тему.',
          en: 'Pop here means to say something suddenly. The question is, of course, Will you marry me? The phrase is informal and fun, and you hear it a lot in films. The neutral version is propose to someone. The song is about a love that leads to a wedding, so this phrase continues the theme naturally.',
        },
        ex: ['He popped the question at the top of the Eiffel Tower.', 'When are you going to pop the question?'],
        similar: ['to propose (to someone)', 'to get engaged'],
        tip: {
          uk: 'Кажуть propose to someone, а не propose someone. І пропозиція руки це a proposal.',
          ru: 'Говорят propose to someone, а не propose someone. А предложение руки это a proposal.',
          en: 'Say propose to someone, not propose someone. The noun is a proposal.',
        },
      },
      {
        en: 'to walk down the aisle',
        m: { uk: 'іти до вівтаря, одружуватися', ru: 'идти к алтарю, жениться', en: 'walk to the front at your wedding' },
        story: {
          uk: 'Aisle це прохід між рядами (у церкві, літаку, супермаркеті). На традиційному західному весіллі наречена йде цим проходом до нареченого. Тому walk down the aisle часто означає просто «вийти заміж, одружитися». Вираз трохи урочистий і пасує до романтичного настрою пісні.',
          ru: 'Aisle это проход между рядами (в церкви, самолёте, супермаркете). На традиционной западной свадьбе невеста идёт по этому проходу к жениху. Поэтому walk down the aisle часто значит просто «выйти замуж, жениться». Выражение немного торжественное и подходит к романтичному настроению песни.',
          en: 'An aisle is the path between rows of seats in a church, a plane or a supermarket. At a traditional Western wedding the bride walks down this path to the groom. So walk down the aisle often simply means to get married. The phrase is a little formal and suits the romantic mood of the song.',
        },
        ex: ['Her dad walked her down the aisle.', 'Excuse me, where’s the pasta? It’s in aisle 5.'],
        similar: ['to get married', 'to tie the knot'],
        tip: {
          uk: 'У слові aisle літера s не вимовляється: [aɪl], як I’ll. Не плутайте з isle (острів), яке звучить так само.',
          ru: 'В слове aisle буква s не произносится: [aɪl], как I’ll. Не путайте с isle (остров), которое звучит так же.',
          en: 'The s in aisle is silent: it sounds like I’ll. Isle (island) sounds the same.',
        },
      },
      {
        en: 'our song',
        m: { uk: 'наша пісня (особлива для пари)', ru: 'наша песня (особенная для пары)', en: 'a song that is special for a couple' },
        story: {
          uk: 'Багато пар у англомовних країнах мають «свою» пісню, яка нагадує їм першу зустріч, побачення чи весілля. Коли вона звучить по радіо, хтось каже: They’re playing our song! Вираз простий, але дуже теплий. Ця пісня для багатьох пар у світі стала саме our song.',
          ru: 'Многие пары в англоязычных странах имеют «свою» песню, которая напоминает им первую встречу, свидание или свадьбу. Когда она звучит по радио, кто-то говорит: They’re playing our song! Выражение простое, но очень тёплое. Эта песня для многих пар в мире стала именно our song.',
          en: 'Many couples in English-speaking countries have their own song that reminds them of their first meeting, a date or their wedding. When it comes on the radio, someone says: They’re playing our song! The phrase is simple but very warm. For many couples around the world, this song has become their song.',
        },
        ex: ['Mum and Dad always dance when they hear their song.', 'Listen! They’re playing our song!'],
        similar: ['a special song', 'a first dance song'],
        tip: {
          uk: 'Our song це не пісня, яку ви написали, а пісня, яка особлива для вас двох. Контекст підкаже значення.',
          ru: 'Our song это не песня, которую вы написали, а песня, которая особенная для вас двоих. Контекст подскажет значение.',
          en: 'Our song doesn’t mean you wrote it; it means it is special to you as a couple.',
        },
      },
      {
        en: 'with all my heart',
        m: { uk: 'усім серцем, щиро', ru: 'всем сердцем, искренне', en: 'completely and sincerely' },
        story: {
          uk: 'Цей вираз однаковий в українській, російській і англійській, тому його легко запам’ятати. Він підсилює почуття: I love you with all my heart, I hope with all my heart. Звучить щиро і трохи урочисто. Вся пісня про кохання від усього серця, тож вираз їй дуже пасує.',
          ru: 'Это выражение одинаковое в русском, украинском и английском, поэтому его легко запомнить. Оно усиливает чувство: I love you with all my heart, I hope with all my heart. Звучит искренне и немного торжественно. Вся песня о любви от всего сердца, так что выражение ей очень подходит.',
          en: 'This phrase is the same in Ukrainian, Russian and English, so it is easy to remember. It makes a feeling stronger: I love you with all my heart, I hope with all my heart. It sounds sincere and a little formal. The whole song is about loving someone completely, so the phrase fits well.',
        },
        ex: ['I thank you with all my heart for your help.', 'She hoped with all her heart that her cat would come home.'],
        similar: ['from the bottom of my heart', 'sincerely'],
        tip: {
          uk: 'Прийменник with, а не by чи from: with all my heart. Але from the bottom of my heart.',
          ru: 'Предлог with, а не by или from: with all my heart. Но from the bottom of my heart.',
          en: 'Use with: with all my heart. But: from the bottom of my heart.',
        },
      },
    ],
    culture: [
      {
        uk: 'Перший танець (first dance) молодят це важлива традиція весіль у Великій Британії та США. Пара заздалегідь обирає «свою» пісню, а іноді навіть бере уроки танцю.',
        ru: 'Первый танец (first dance) молодожёнов это важная традиция свадеб в Великобритании и США. Пара заранее выбирает «свою» песню, а иногда даже берёт уроки танца.',
        en: 'The couple’s first dance is an important wedding tradition in the UK and the USA. The couple choose their song in advance and sometimes even take dance lessons.',
      },
      {
        uk: 'Є стара англійська весільна прикмета: у нареченої має бути something old, something new, something borrowed, something blue, тобто щось старе, нове, позичене і блакитне.',
        ru: 'Есть старая английская свадебная примета: у невесты должно быть something old, something new, something borrowed, something blue, то есть что-то старое, новое, одолженное и голубое.',
        en: 'An old English wedding rhyme says a bride should wear something old, something new, something borrowed, something blue.',
      },
      {
        uk: 'У Великій Британії є традиція Christmas number one: щороку люди стежать, яка пісня очолить хіт-парад на Різдво. Це справжнє змагання.',
        ru: 'В Великобритании есть традиция Christmas number one: каждый год люди следят, какая песня возглавит хит-парад на Рождество. Это настоящее соревнование.',
        en: 'In the UK there is a tradition called the Christmas number one: every year people watch which song will top the chart at Christmas. It is a real competition.',
      },
    ],
  },

  'levitating': {
    intro: {
      uk: 'Ця пісня звучить як вечірка на дискотеці десь серед зірок: ритм не дає всидіти, а настрій легкий і закоханий. Вона чудово підходить, щоб вивчити сучасну розмовну англійську, якою підлітки говорять про почуття, музику й вечірки. Нижче вирази, щоб описати щастя, коли «літаєш», хімію між людьми і вечір, коли час минає непомітно. А в кінці коротко про те, що таке диско і чому воно знову в моді.',
      ru: 'Эта песня звучит как вечеринка на дискотеке где-то среди звёзд: ритм не даёт усидеть, а настроение лёгкое и влюблённое. Она отлично подходит, чтобы выучить современный разговорный английский, на котором подростки говорят о чувствах, музыке и вечеринках. Ниже выражения, чтобы описать счастье, когда «летаешь», химию между людьми и вечер, когда время проходит незаметно. А в конце коротко о том, что такое диско и почему оно снова в моде.',
      en: 'This song sounds like a disco party somewhere among the stars: the rhythm makes it hard to sit still, and the mood is light and in love. It is great for learning modern spoken English that teens use to talk about feelings, music and parties. Below are expressions to describe floating-on-air happiness, chemistry between people and a night when time just flies. At the end, a short look at what disco is and why it is back in fashion.',
    },
    phrases: [
      {
        en: 'on cloud nine',
        m: { uk: 'на сьомому небі від щастя', ru: 'на седьмом небе от счастья', en: 'extremely happy' },
        story: {
          uk: 'Українською ми на «сьомому небі», а англійці на «дев’ятій хмарі». Походження точно не відоме, але вираз дуже популярний і розмовний. Його кажуть після гарної новини, перемоги чи першого побачення. Пісня передає саме це відчуття: від щастя ніби ширяєш у небі.',
          ru: 'По-русски мы на «седьмом небе», а англичане на «девятом облаке». Происхождение точно не известно, но выражение очень популярное и разговорное. Его говорят после хорошей новости, победы или первого свидания. Песня передаёт именно это ощущение: от счастья будто паришь в небе.',
          en: 'In Ukrainian and Russian you are in the seventh heaven, but in English you are on cloud nine. Nobody knows the exact origin, but the phrase is very popular and informal. People say it after good news, a win or a first date. The song captures exactly this feeling of floating in the sky with happiness.',
        },
        ex: ['When I got the tickets to the concert, I was on cloud nine.', 'She’s been on cloud nine since he asked her to the school dance.'],
        similar: ['over the moon', 'walking on air', 'in seventh heaven'],
        tip: {
          uk: 'Не перекладайте «сьоме небо» як on seventh sky. Природніше сказати on cloud nine.',
          ru: 'Не переводите «седьмое небо» как on seventh sky. Естественнее сказать on cloud nine.',
          en: 'Don’t say on the seventh sky. Use on cloud nine, with no article.',
        },
      },
      {
        en: 'to walk on air',
        m: { uk: 'не відчувати землі під ногами від радості', ru: 'не чувствовать земли под ногами от радости', en: 'feel very happy and light' },
        story: {
          uk: 'Walk on air означає бути таким щасливим, що ніби не торкаєшся землі. Зазвичай вживають у Continuous: I’m walking on air. Вираз розмовний і трохи поетичний. Образ людини, яка від щастя відривається від землі, це серцевина пісні, тому вираз ніби створений для неї.',
          ru: 'Walk on air значит быть таким счастливым, что будто не касаешься земли. Обычно используют в Continuous: I’m walking on air. Выражение разговорное и немного поэтичное. Образ человека, который от счастья отрывается от земли, это сердцевина песни, поэтому выражение будто создано для неё.',
          en: 'Walk on air means being so happy that you don’t seem to touch the ground. It is usually used in the continuous: I’m walking on air. The phrase is informal and a little poetic. The image of someone lifting off the ground with joy is at the heart of the song, so this phrase feels made for it.',
        },
        ex: ['After the good news I was walking on air all day.', 'He’s been walking on air since his band played its first gig.'],
        similar: ['on cloud nine', 'over the moon', 'to feel light'],
        tip: {
          uk: 'Без артикля: walk on air, а не walk on the air.',
          ru: 'Без артикля: walk on air, а не walk on the air.',
          en: 'No article: walk on air, not walk on the air.',
        },
      },
      {
        en: 'to hit the dance floor',
        m: { uk: 'вийти на танцпол, піти танцювати', ru: 'выйти на танцпол, пойти танцевать', en: 'start dancing at a party' },
        story: {
          uk: 'Hit тут не означає «бити». У розмовній англійській hit + місце означає «піти кудись із ентузіазмом»: hit the road, hit the beach, hit the dance floor. Вираз неформальний і веселий. Пісня створена для танцполу, тож почувши її, хочеться саме hit the dance floor.',
          ru: 'Hit здесь не значит «бить». В разговорном английском hit + место значит «пойти куда-то с энтузиазмом»: hit the road, hit the beach, hit the dance floor. Выражение неформальное и весёлое. Песня создана для танцпола, так что, услышав её, хочется именно hit the dance floor.',
          en: 'Hit doesn’t mean to strike here. In spoken English, hit + a place means to go there with energy: hit the road, hit the beach, hit the dance floor. It is informal and fun. The song is made for dancing, so when it starts, you want to hit the dance floor.',
        },
        ex: ['When the DJ played our favourite track, we all hit the dance floor.', 'Come on, let’s hit the dance floor!'],
        similar: ['to bust a move (very informal)', 'to get up and dance'],
        tip: {
          uk: 'Dance floor пишуть окремо двома словами. Артикль the обов’язковий: hit the dance floor.',
          ru: 'Dance floor пишут раздельно двумя словами. Артикль the обязателен: hit the dance floor.',
          en: 'Dance floor is two words, and you need the: hit the dance floor.',
        },
      },
      {
        en: 'to have a blast',
        m: { uk: 'чудово провести час, відірватися', ru: 'отлично провести время, оторваться', en: 'have a lot of fun' },
        story: {
          uk: 'Blast буквально означає «вибух», але в розмові have a blast це «дуже весело провести час». Це сильніше, ніж have fun, і звучить молодіжно та неформально. Його часто кажуть після вечірки, концерту чи подорожі. Енергійна диско-пісня якраз про такий вечір, коли ви have a blast.',
          ru: 'Blast буквально значит «взрыв», но в разговоре have a blast это «очень весело провести время». Это сильнее, чем have fun, и звучит молодёжно и неформально. Его часто говорят после вечеринки, концерта или поездки. Энергичная диско-песня как раз о таком вечере, когда вы have a blast.',
          en: 'Blast literally means an explosion, but in conversation have a blast means to have a great time. It is stronger than have fun and sounds young and informal. People often say it after a party, a concert or a trip. This energetic disco song is all about the kind of night when you have a blast.',
        },
        ex: ['We had a blast at the school disco!', 'Have a blast at the concert tonight!'],
        similar: ['to have the time of your life', 'to have a great time'],
        tip: {
          uk: 'Артикль a обов’язковий: We had a blast, а не We had blast.',
          ru: 'Порядок обычный: We had a blast. Артикль a обязателен, не говорите had blast.',
          en: 'Don’t drop the article: we had a blast, not we had blast.',
        },
      },
      {
        en: 'a throwback',
        m: { uk: 'щось, що нагадує минуле; ретро', ru: 'что-то, напоминающее прошлое; ретро', en: 'something that reminds you of the past' },
        story: {
          uk: 'A throwback це річ, стиль чи пісня, що повертає нас у минуле. У соцмережах популярний хештег Throwback Thursday, коли люди публікують старі фото. Вираз розмовний і сучасний. Пісня звучить як throwback до диско-епохи 70-х і 80-х, але в сучасній обробці.',
          ru: 'A throwback это вещь, стиль или песня, которые возвращают нас в прошлое. В соцсетях популярен хештег Throwback Thursday, когда люди публикуют старые фото. Выражение разговорное и современное. Песня звучит как throwback к диско-эпохе 70-х и 80-х, но в современной обработке.',
          en: 'A throwback is a thing, a style or a song that takes us back to the past. On social media, Throwback Thursday is a popular hashtag when people post old photos. The word is informal and modern. The song sounds like a throwback to the disco era of the 70s and 80s, but with a modern twist.',
        },
        ex: ['These jeans are a total throwback to the nineties.', 'Here’s a throwback photo of me at age five.'],
        similar: ['retro', 'old-school', 'vintage'],
        tip: {
          uk: 'Пишеться разом: throwback. А як дієслово throw back означає «кинути назад» і пишеться окремо.',
          ru: 'Пишется слитно: throwback. А как глагол throw back значит «бросить назад» и пишется раздельно.',
          en: 'The noun is one word, throwback. The verb throw back is two words and means throw something back.',
        },
      },
      {
        en: 'good vibes',
        m: { uk: 'гарна атмосфера, позитивна енергія', ru: 'хорошая атмосфера, позитивная энергия', en: 'a happy, positive feeling' },
        story: {
          uk: 'Vibe походить від слова vibration (вібрація) і означає настрій чи атмосферу місця, людини або музики. Good vibes дуже поширене в молодіжному сленгу та соцмережах. Також кажуть I like the vibe here (мені подобається атмосфера). Пісня створює саме good vibes: легкість, танці й закоханість.',
          ru: 'Vibe происходит от слова vibration (вибрация) и значит настроение или атмосферу места, человека или музыки. Good vibes очень распространено в молодёжном сленге и соцсетях. Также говорят I like the vibe here (мне нравится атмосфера). Песня создаёт именно good vibes: лёгкость, танцы и влюблённость.',
          en: 'Vibe comes from vibration and means the mood or atmosphere of a place, a person or music. Good vibes is very common in teen slang and on social media. You can also say I like the vibe here. The song creates exactly this kind of good vibes: lightness, dancing and being in love.',
        },
        ex: ['This café has such good vibes.', 'Only good vibes at our party tonight!'],
        similar: ['a nice atmosphere', 'a good feeling'],
        tip: {
          uk: 'Це сленг, тож у есе чи офіційному листі краще написати a positive atmosphere.',
          ru: 'Это сленг, так что в эссе или официальном письме лучше написать a positive atmosphere.',
          en: 'It is slang. In an essay or formal letter, write a positive atmosphere instead.',
        },
      },
      {
        en: 'to click with someone',
        m: { uk: 'одразу знайти спільну мову, «зійтися»', ru: 'сразу найти общий язык, «сойтись»', en: 'like and understand someone immediately' },
        story: {
          uk: 'Click це звук, коли щось стає на своє місце. Так і з людьми: we just clicked означає, що ми одразу порозумілися. Вираз розмовний і підходить і для дружби, і для романтики. Пісня про двох людей, які ніби створені танцювати разом, а це і є момент, коли вони clicked.',
          ru: 'Click это звук, когда что-то встаёт на своё место. Так и с людьми: we just clicked значит, что мы сразу поняли друг друга. Выражение разговорное и подходит и для дружбы, и для романтики. Песня о двух людях, которые будто созданы танцевать вместе, а это и есть момент, когда они clicked.',
          en: 'A click is the sound of something falling into place. It is the same with people: we just clicked means we understood each other straight away. The phrase is informal and works for friendship and romance. The song is about two people who seem made to dance together, which is exactly when people click.',
        },
        ex: ['I met Sara at camp and we clicked immediately.', 'We didn’t really click at first, but now we’re best friends.'],
        similar: ['to get on well', 'to hit it off', 'to be on the same wavelength'],
        tip: {
          uk: 'Найчастіше кажуть просто we clicked без додатків. Якщо з об’єктом, то з with: I clicked with her.',
          ru: 'Чаще всего говорят просто we clicked без дополнений. Если с объектом, то с with: I clicked with her.',
          en: 'Most often just we clicked. With an object use with: I clicked with her.',
        },
      },
      {
        en: 'to lose track of time',
        m: { uk: 'втратити лік часу', ru: 'потерять счёт времени', en: 'forget what time it is because you are busy or having fun' },
        story: {
          uk: 'Track тут означає «слід» або «відлік». Коли ви lose track of time, ви настільки захоплені, що не помічаєте, скільки минуло часу. Так буває на вечірці, за грою чи з цікавою книжкою. Пісня передає саме такий вечір, коли танці й музика змушують забути про годинник.',
          ru: 'Track здесь значит «след» или «отсчёт». Когда вы lose track of time, вы настолько увлечены, что не замечаете, сколько прошло времени. Так бывает на вечеринке, за игрой или с интересной книгой. Песня передаёт именно такой вечер, когда танцы и музыка заставляют забыть о часах.',
          en: 'Track here means keeping count. When you lose track of time, you are so busy or happy that you don’t notice how much time has passed. It happens at a party, during a game or with a great book. The song captures a night when the dancing and music make you forget the clock.',
        },
        ex: ['Sorry I’m late, I lost track of time playing the guitar.', 'We were dancing so much that we lost track of time.'],
        similar: ['time flies', 'to forget the time'],
        tip: {
          uk: 'Не кажіть lose the time. Правильно lose track of time, без артиклів.',
          ru: 'Не говорите lose the time. Правильно lose track of time, без артиклей.',
          en: 'Say lose track of time, not lose the time.',
        },
      },
      {
        en: 'starstruck',
        m: { uk: 'зачарований, у захваті (особливо від знаменитості)', ru: 'очарованный, в восторге (особенно от знаменитости)', en: 'amazed and shy when you meet someone famous' },
        story: {
          uk: 'Starstruck буквально «вражений зіркою». Так почувається людина, яка раптом зустріла улюбленого співака чи актора і не може сказати ані слова. Вираз розмовний, часто вживається жартома. Пісня наповнена образами зірок і нічного неба, тож це «зоряне» слово дуже до неї пасує.',
          ru: 'Starstruck буквально «поражённый звездой». Так чувствует себя человек, который вдруг встретил любимого певца или актёра и не может сказать ни слова. Выражение разговорное, часто используется в шутку. Песня наполнена образами звёзд и ночного неба, так что это «звёздное» слово ей очень подходит.',
          en: 'Starstruck literally means hit by a star. It is how you feel when you suddenly meet your favourite singer or actor and can’t say a word. The word is informal and often used jokingly. The song is full of images of stars and the night sky, so this starry word fits it well.',
        },
        ex: ['I was so starstruck when I met the band that I forgot my own name!', 'Don’t be starstruck, they’re normal people too.'],
        similar: ['to be in awe', 'to be dazzled', 'fangirl / fanboy (slang)'],
        tip: {
          uk: 'Пишеться одним словом: starstruck. Це прикметник, тому be starstruck, а не starstruck someone.',
          ru: 'Пишется одним словом: starstruck. Это прилагательное, поэтому be starstruck, а не starstruck someone.',
          en: 'It is one word and an adjective: be starstruck.',
        },
      },
      {
        en: 'chemistry',
        m: { uk: 'хімія між людьми, взаємне тяжіння', ru: 'химия между людьми, взаимное притяжение', en: 'a natural attraction between people' },
        story: {
          uk: 'Крім шкільного предмета, chemistry означає особливий зв’язок між людьми, коли їм легко й цікаво разом. Так кажуть про пару, акторів у фільмі чи навіть футбольну команду. Вираз нейтральний, часто звучить у рецензіях на фільми. Пісня про таку «хімію» між двома людьми на танцполі.',
          ru: 'Кроме школьного предмета, chemistry значит особую связь между людьми, когда им легко и интересно вместе. Так говорят о паре, актёрах в фильме или даже футбольной команде. Выражение нейтральное, часто звучит в рецензиях на фильмы. Песня о такой «химии» между двумя людьми на танцполе.',
          en: 'Besides the school subject, chemistry means a special connection between people who feel easy and excited together. People say it about a couple, actors in a film or even a football team. It is neutral and common in film reviews. The song is about this kind of chemistry between two people on the dance floor.',
        },
        ex: ['The two actors have great chemistry on screen.', 'Our team has amazing chemistry this season.'],
        similar: ['a connection', 'a spark', 'to click with someone'],
        tip: {
          uk: 'Chemistry незлічуване: there is chemistry between them, а не a chemistry.',
          ru: 'Chemistry неисчисляемое: there is chemistry between them, а не a chemistry.',
          en: 'Chemistry is uncountable: there is chemistry between them, not a chemistry.',
        },
      },
    ],
    culture: [
      {
        uk: 'Диско (disco) це танцювальна музика 1970-х з рівним енергійним ритмом. Її символом став нічний клуб Studio 54 у Нью-Йорку і дзеркальна куля під стелею.',
        ru: 'Диско (disco) это танцевальная музыка 1970-х с ровным энергичным ритмом. Её символом стал ночной клуб Studio 54 в Нью-Йорке и зеркальный шар под потолком.',
        en: 'Disco is dance music from the 1970s with a steady, energetic beat. Its symbols became the New York nightclub Studio 54 and the mirror ball hanging from the ceiling.',
      },
      {
        uk: 'Фільм «Лихоманка суботнього вечора» (Saturday Night Fever, 1977) з Джоном Траволтою і піснями гурту Bee Gees зробив диско шалено популярним у всьому світі.',
        ru: 'Фильм «Лихорадка субботнего вечера» (Saturday Night Fever, 1977) с Джоном Траволтой и песнями группы Bee Gees сделал диско безумно популярным во всём мире.',
        en: 'The film Saturday Night Fever (1977), starring John Travolta with songs by the Bee Gees, made disco hugely popular around the world.',
      },
      {
        uk: 'Слово nostalgia (ностальгія) прийшло з грецької: nostos означає «повернення додому», а algos «біль». Назва альбому Future Nostalgia гра слів: сум за минулим, яке звучить як майбутнє.',
        ru: 'Слово nostalgia (ностальгия) пришло из греческого: nostos значит «возвращение домой», а algos «боль». Название альбома Future Nostalgia игра слов: тоска по прошлому, которое звучит как будущее.',
        en: 'The word nostalgia comes from Greek: nostos means returning home and algos means pain. The album title Future Nostalgia is a play on words: missing a past that sounds like the future.',
      },
    ],
  },
};
