// Контент сторінки «Англійська з малюком»: етапи, книжки, наші історії й віршики, фрази, ігри для друку.
import type { Stage, Book, Story, Rhyme, Phrase, PrintGame } from './types';

// ---------- Етапи за віком ----------
export const STAGES: Stage[] = [
  {
    age: { uk: "0-1 рік", ru: "0-1 год", en: "0-1 year" },
    goal: {
      uk: "Малюк щодня чує англійську у спокійних, теплих моментах і звикає до її звучання.",
      ru: "Малыш каждый день слышит английский в спокойные, тёплые моменты и привыкает к его звучанию.",
      en: "Your baby hears English every day in calm, warm moments and gets used to how it sounds.",
    },
    tips: [
      {
        title: { uk: "Оберіть свою систему", ru: "Выберите свою систему", en: "Choose your system" },
        text: {
          uk: "Є два зручні підходи. «Один батько, одна мова»: наприклад, мама говорить англійською, тато українською. Або «час і місце»: англійська звучить у певні моменти, скажімо, під час купання і вечірньої книжки. Головне не сам підхід, а те, що він повторюється щодня.",
          ru: "Есть два удобных подхода. «Один родитель, один язык»: например, мама говорит по-английски, папа по-украински. Или «время и место»: английский звучит в определённые моменты, скажем, во время купания и вечерней книжки. Главное не сам подход, а то, что он повторяется каждый день.",
          en: "There are two easy approaches. One parent, one language: for example, mum speaks English and dad speaks Ukrainian. Or time and place: English is for certain moments, such as bath time and the bedtime book. The approach matters less than doing it every day.",
        },
      },
      {
        title: { uk: "Коментуйте догляд", ru: "Комментируйте уход", en: "Talk through care routines" },
        text: {
          uk: "Переодягання, годування, купання повторюються по кілька разів на день, тож це ідеальні уроки. Кажіть короткими фразами, що ви робите, і завжди однаково.",
          ru: "Переодевание, кормление, купание повторяются по несколько раз в день, так что это идеальные уроки. Говорите короткими фразами, что вы делаете, и всегда одинаково.",
          en: "Changing, feeding and bathing happen several times a day, so they are perfect lessons. Say what you are doing in short phrases, and use the same words each time.",
        },
        example: "Arms up! Let's put on your vest.",
      },
      {
        title: { uk: "Співайте і торкайтеся", ru: "Пойте и прикасайтесь", en: "Sing and touch" },
        text: {
          uk: "Короткі пісеньки з рухами (поплескати в долоні, полоскотати ніжки, покачати на руках) малюк запам’ятовує швидше за слова. Не бійтеся співати не в ноти: дитині важливий ваш голос.",
          ru: "Короткие песенки с движениями (похлопать в ладоши, пощекотать ножки, покачать на руках) малыш запоминает быстрее слов. Не бойтесь петь не в ноты: ребёнку важен ваш голос.",
          en: "Your baby remembers short songs with actions (clapping, tickling toes, rocking) faster than words alone. Don't worry about singing in tune: your voice is what matters.",
        },
        example: "Clap, clap, clap! Tickle, tickle, toes!",
      },
      {
        title: { uk: "Книжки-картонки: показуйте і називайте", ru: "Книжки-картонки: показывайте и называйте", en: "Board books: point and name" },
        text: {
          uk: "Не обов’язково читати текст дослівно. Показуйте пальцем на картинку, називайте її одним-двома словами і додавайте звук: так малюк пов’язує слово з предметом.",
          ru: "Не обязательно читать текст дословно. Показывайте пальцем на картинку, называйте её одним-двумя словами и добавляйте звук: так малыш связывает слово с предметом.",
          en: "You don't have to read every word. Point to a picture, name it in one or two words and add a sound: this helps your baby link the word to the thing.",
        },
        example: "Look! A dog. Woof, woof!",
      },
      {
        title: { uk: "Без екранів, з живим голосом", ru: "Без экранов, с живым голосом", en: "No screens, real voices" },
        text: {
          uk: "Загальні рекомендації для дітей до 18-24 місяців радять обходитися без екранів, крім відеодзвінків з рідними. Мову малюк засвоює з живої розмови, тому ваш голос дає більше, ніж будь-яке відео англійською.",
          ru: "Общие рекомендации для детей до 18-24 месяцев советуют обходиться без экранов, кроме видеозвонков с родными. Язык малыш усваивает из живого общения, поэтому ваш голос даёт больше, чем любое видео на английском.",
          en: "General guidance for children under 18-24 months is to avoid screens, apart from video calls with family. Babies learn language from real conversation, so your voice does more than any English video.",
        },
      },
      {
        title: { uk: "Мало, але щодня", ru: "Мало, но каждый день", en: "A little, every day" },
        text: {
          uk: "10-15 хвилин англійської щодня дають більше, ніж година раз на тиждень. Прив’яжіть англійську до однієї щоденної справи, і вона стане звичкою.",
          ru: "10-15 минут английского каждый день дают больше, чем час раз в неделю. Привяжите английский к одному ежедневному делу, и он станет привычкой.",
          en: "10-15 minutes of English every day does more than an hour once a week. Tie English to one daily routine and it becomes a habit.",
        },
      },
    ],
  },
  {
    age: { uk: "1-2 роки", ru: "1-2 года", en: "1-2 years" },
    goal: {
      uk: "Дитина розуміє десятки простих слів: показує, приносить, а іноді й повторює.",
      ru: "Ребёнок понимает десятки простых слов: показывает, приносит, а иногда и повторяет.",
      en: "Your child understands dozens of simple words: points, fetches things and sometimes repeats.",
    },
    tips: [
      {
        title: { uk: "Гра «Де?»", ru: "Игра «Где?»", en: "The 'Where is it?' game" },
        text: {
          uk: "Питайте, де предмет, і радійте, коли дитина показує або приносить його. Відповідати словами не обов’язково: розуміння завжди йде попереду мовлення.",
          ru: "Спрашивайте, где предмет, и радуйтесь, когда ребёнок показывает или приносит его. Отвечать словами не обязательно: понимание всегда идёт впереди речи.",
          en: "Ask where something is and celebrate when your child points to it or brings it. They don't need to answer in words: understanding always comes before speaking.",
        },
        example: "Where's the ball? There it is!",
      },
      {
        title: { uk: "Давайте вибір із двох", ru: "Давайте выбор из двух", en: "Offer a choice of two" },
        text: {
          uk: "Вибір з двох варіантів підказує дитині потрібне слово. Навіть якщо вона просто покаже пальцем, назвіть обране ще раз.",
          ru: "Выбор из двух вариантов подсказывает ребёнку нужное слово. Даже если он просто покажет пальцем, назовите выбранное ещё раз.",
          en: "A choice of two gives your child the word they need. Even if they just point, say the word again.",
        },
        example: "Apple or banana? Apple! Here's your apple.",
      },
      {
        title: { uk: "Повторіть і додайте слово", ru: "Повторите и добавьте слово", en: "Repeat and add a word" },
        text: {
          uk: "Коли дитина каже одне слово, повторіть його і додайте ще одне. Так ви не виправляєте, а показуєте наступний крок.",
          ru: "Когда ребёнок говорит одно слово, повторите его и добавьте ещё одно. Так вы не исправляете, а показываете следующий шаг.",
          en: "When your child says one word, repeat it and add one more. You are not correcting, you are showing the next step.",
        },
        example: "Ball? Yes, a red ball!",
      },
      {
        title: { uk: "Ігри з рухами", ru: "Игры с движениями", en: "Action games" },
        text: {
          uk: "Вгору і вниз, швидко і повільно, стрибати і зупинятися: прості протилежності легко показати тілом. Дитина чує слово і одразу відчуває його значення.",
          ru: "Вверх и вниз, быстро и медленно, прыгать и останавливаться: простые противоположности легко показать телом. Ребёнок слышит слово и сразу чувствует его значение.",
          en: "Up and down, fast and slow, jump and stop: simple opposites are easy to show with your body. Your child hears the word and feels its meaning straight away.",
        },
        example: "Up, up, up! Down, down, down! Stop!",
      },
      {
        title: { uk: "Змішування мов: це нормально", ru: "Смешивание языков: это нормально", en: "Mixing languages is normal" },
        text: {
          uk: "Дитина може сказати «дай ball» чи «ще milk». Це не плутанина, а звичайний етап у дітей-білінгвів: вона бере найлегше слово з будь-якої мови. З часом мови розділяться самі.",
          ru: "Ребёнок может сказать «дай ball» или «ещё milk». Это не путаница, а обычный этап у детей-билингвов: он берёт самое лёгкое слово из любого языка. Со временем языки разделятся сами.",
          en: "Your child may say «дай ball» or «ще milk». This is not confusion but a normal stage for bilingual children: they use the easiest word from either language. The languages separate over time.",
        },
      },
      {
        title: { uk: "Екрани: якщо вже, то разом", ru: "Экраны: если уж, то вместе", en: "Screens: if at all, together" },
        text: {
          uk: "До півтора-двох років краще обходитися без екранів. Якщо ближче до двох ви вирішите щось показати, обирайте повільне коротке відео, дивіться разом і називайте те, що бачите.",
          ru: "До полутора-двух лет лучше обходиться без экранов. Если ближе к двум вы решите что-то показать, выбирайте медленное короткое видео, смотрите вместе и называйте то, что видите.",
          en: "Until around 18-24 months it is better to avoid screens. If you choose to show something closer to two, pick a short, slow video, watch together and name what you see.",
        },
      },
    ],
  },
  {
    age: { uk: "2-3 роки", ru: "2-3 года", en: "2-3 years" },
    goal: {
      uk: "Малюк розуміє прості прохання англійською і пробує казати слова та фрази з двох слів.",
      ru: "Малыш понимает простые просьбы на английском и пробует говорить слова и фразы из двух слов.",
      en: "Your child understands simple requests in English and tries words and two-word phrases.",
    },
    tips: [
      {
        title: { uk: "Дитина відповідає українською", ru: "Ребёнок отвечает по-украински", en: "When your child answers in Ukrainian" },
        text: {
          uk: "Не вимагайте «скажи англійською». Просто покажіть, що зрозуміли, і повторіть думку англійською. Дитина почує потрібні слова без тиску, і розмова не зупиниться.",
          ru: "Не требуйте «скажи по-английски». Просто покажите, что поняли, и повторите мысль по-английски. Ребёнок услышит нужные слова без давления, и разговор не остановится.",
          en: "Don't insist on 'Say it in English'. Show that you understood and repeat the idea in English. Your child hears the words without pressure and the conversation keeps going.",
        },
        example: "You want some water? Here's your water.",
      },
      {
        title: { uk: "Одягаємося англійською", ru: "Одеваемся по-английски", en: "Getting dressed in English" },
        text: {
          uk: "Ранкове одягання щодня однакове, тому фрази швидко запам’ятовуються. Рахуйте шкарпетки, називайте кольори, дайте дитині сказати останнє слово.",
          ru: "Утреннее одевание каждый день одинаковое, поэтому фразы быстро запоминаются. Считайте носки, называйте цвета, дайте ребёнку сказать последнее слово.",
          en: "Getting dressed is the same every morning, so the phrases stick quickly. Count socks, name colours and let your child say the last word.",
        },
        example: "Socks on! One sock, two socks. Blue socks!",
      },
      {
        title: { uk: "Читайте із запитаннями", ru: "Читайте с вопросами", en: "Read with questions" },
        text: {
          uk: "Перед тим як перегорнути сторінку, спитайте «Де…?» і дочекайтеся, поки дитина покаже. Перечитуйте улюблену книжку знову і знову: повтор для малюка радість, а не нудьга.",
          ru: "Прежде чем перевернуть страницу, спросите «Где…?» и дождитесь, пока ребёнок покажет. Перечитывайте любимую книжку снова и снова: повтор для малыша радость, а не скука.",
          en: "Before you turn the page, ask 'Where is…?' and wait for your child to point. Read the favourite book again and again: for toddlers, repetition is fun, not boring.",
        },
        example: "Where's the cat? Yes! There's the cat.",
      },
      {
        title: { uk: "Гра в «немовби»", ru: "Игра в «понарошку»", en: "Pretend play" },
        text: {
          uk: "Ведмедик хоче їсти, лялька йде спати, машинка їде до бабусі. Іграшки дають привід повторювати прості фрази без жодних уроків.",
          ru: "Мишка хочет есть, кукла идёт спать, машинка едет к бабушке. Игрушки дают повод повторять простые фразы без всяких уроков.",
          en: "Teddy is hungry, the doll is going to bed, the car is driving to Granny's. Toys give you a reason to repeat simple phrases without any lessons.",
        },
        example: "Teddy is hungry. Let's give Teddy some soup.",
      },
      {
        title: { uk: "Екрани: коротко і разом", ru: "Экраны: коротко и вместе", en: "Screens: short and shared" },
        text: {
          uk: "Загальні рекомендації для дітей 2-5 років: не більше години на день, якісні спокійні програми і перегляд разом із дорослим. Після мультика перекажіть пару слів із нього під час гри.",
          ru: "Общие рекомендации для детей 2-5 лет: не больше часа в день, качественные спокойные программы и просмотр вместе со взрослым. После мультика повторите пару слов из него во время игры.",
          en: "General guidance for ages 2-5 is no more than an hour a day, calm good-quality shows and watching with an adult. After a cartoon, use a couple of its words in play.",
        },
      },
    ],
  },
  {
    age: { uk: "3-5 років", ru: "3-5 лет", en: "3-5 years" },
    goal: {
      uk: "Дитина говорить короткими реченнями, грає англійською і розуміє прості історії.",
      ru: "Ребёнок говорит короткими предложениями, играет на английском и понимает простые истории.",
      en: "Your child speaks in short sentences, plays in English and follows simple stories.",
    },
    tips: [
      {
        title: { uk: "Рольові ігри", ru: "Ролевые игры", en: "Role play" },
        text: {
          uk: "Магазин, кафе, лікар для іграшок: у кожній грі є готові фрази, які дитина повторює з радістю. Міняйтеся ролями, щоб вона і питала, і відповідала.",
          ru: "Магазин, кафе, доктор для игрушек: в каждой игре есть готовые фразы, которые ребёнок повторяет с удовольствием. Меняйтесь ролями, чтобы он и спрашивал, и отвечал.",
          en: "A shop, a café, a toy doctor: each game has ready-made phrases your child will happily repeat. Swap roles so they both ask and answer.",
        },
        example: "Can I have an apple, please? Here you are!",
      },
      {
        title: { uk: "Питання «А що далі?»", ru: "Вопрос «А что дальше?»", en: "Ask 'What happens next?'" },
        text: {
          uk: "Під час читання зупиняйтеся і питайте, що буде далі або що відчуває герой. Приймайте будь-яку відповідь, навіть українською, і переказуйте її англійською.",
          ru: "Во время чтения останавливайтесь и спрашивайте, что будет дальше или что чувствует герой. Принимайте любой ответ, даже на украинском, и пересказывайте его по-английски.",
          en: "While reading, pause and ask what happens next or how a character feels. Accept any answer, even in Ukrainian, and say it back in English.",
        },
        example: "What happens next? Is he happy or sad?",
      },
      {
        title: { uk: "Якщо ваша англійська не ідеальна", ru: "Если ваш английский не идеален", en: "If your own English isn't perfect" },
        text: {
          uk: "Це не перешкода. Готуйте кілька фраз на день наперед, вмикайте пісні й аудіокнижки з носіями мови і не соромтеся сказати «Давай дізнаємося разом». Дитина вчиться і у вас, і на тому, як ви самі вчитеся.",
          ru: "Это не препятствие. Готовьте несколько фраз на день заранее, включайте песни и аудиокниги с носителями языка и не стесняйтесь сказать «Давай узнаем вместе». Ребёнок учится и у вас, и на том, как вы сами учитесь.",
          en: "This is not a barrier. Prepare a few phrases for the day, play songs and audiobooks by native speakers and feel free to say 'Let's find out together'. Your child learns from you and from watching you learn.",
        },
        example: "I don't know that word. Let's find out together!",
      },
      {
        title: { uk: "Виправляйте м’яко", ru: "Исправляйте мягко", en: "Correct gently" },
        text: {
          uk: "Замість «неправильно» повторіть фразу правильно і продовжуйте розмову. Пряме виправлення часто зупиняє бажання говорити, а правильний зразок працює непомітно.",
          ru: "Вместо «неправильно» повторите фразу правильно и продолжайте разговор. Прямое исправление часто отбивает желание говорить, а правильный образец работает незаметно.",
          en: "Instead of saying 'That's wrong', repeat the phrase correctly and carry on talking. Direct correction often stops children wanting to speak, while a good model works quietly.",
        },
        example: "I goed to the park? Yes, you went to the park!",
      },
      {
        title: { uk: "Свій ритуал «English time»", ru: "Свой ритуал «English time»", en: "Your own English time ritual" },
        text: {
          uk: "Окрема пісенька на початку, улюблена книжка, коротка гра і та сама фраза наприкінці. 15 хвилин щодня з передбачуваним ритуалом дають більше, ніж довгі заняття час від часу.",
          ru: "Отдельная песенка в начале, любимая книжка, короткая игра и та же фраза в конце. 15 минут каждый день с предсказуемым ритуалом дают больше, чем долгие занятия время от времени.",
          en: "A special song to start, a favourite book, a short game and the same phrase at the end. 15 minutes a day with a predictable ritual does more than long sessions now and then.",
        },
        example: "It's English time! Let's sing our song.",
      },
      {
        title: { uk: "Інші джерела англійської", ru: "Другие источники английского", en: "Other sources of English" },
        text: {
          uk: "Відеодзвінки з англомовними рідними чи друзями, ігри з дітьми, які говорять англійською, англомовні гуртки. Коли англійська потрібна не лише з мамою чи татом, у дитини з’являється справжня причина нею говорити.",
          ru: "Видеозвонки с англоязычными родными или друзьями, игры с детьми, которые говорят по-английски, англоязычные кружки. Когда английский нужен не только с мамой или папой, у ребёнка появляется настоящая причина на нём говорить.",
          en: "Video calls with English-speaking family or friends, playdates with English-speaking children, English clubs. When English is needed beyond mum or dad, your child has a real reason to speak it.",
        },
      },
    ],
  },
  {
    age: { uk: "5-7 років", ru: "5-7 лет", en: "5-7 years" },
    goal: {
      uk: "Дитина впевнено розуміє англійську в знайомих ситуаціях, говорить реченнями і знайомиться з буквами та звуками.",
      ru: "Ребёнок уверенно понимает английский в знакомых ситуациях, говорит предложениями и знакомится с буквами и звуками.",
      en: "Your child understands English confidently in familiar situations, speaks in sentences and starts to learn letters and sounds.",
    },
    tips: [
      {
        title: { uk: "Спершу звуки, потім назви букв", ru: "Сначала звуки, потом названия букв", en: "Sounds first, letter names later" },
        text: {
          uk: "Для читання англійською важливіше знати, як буква звучить у слові, ніж як вона називається в алфавіті. Грайте у «на який звук починається слово» з предметами вдома.",
          ru: "Для чтения на английском важнее знать, как буква звучит в слове, чем как она называется в алфавите. Играйте в «на какой звук начинается слово» с предметами дома.",
          en: "For reading in English, knowing the sound a letter makes matters more than its name in the alphabet. Play 'What sound does it start with?' with things at home.",
        },
        example: "Apple starts with a, a, apple!",
      },
      {
        title: { uk: "Читайте по черзі", ru: "Читайте по очереди", en: "Take turns reading" },
        text: {
          uk: "Ви читаєте текст, дитина «читає» картинки: розповідає, що бачить, або договорює знайомі повтори. Так вона відчуває себе читачем ще до того, як навчиться читати.",
          ru: "Вы читаете текст, ребёнок «читает» картинки: рассказывает, что видит, или договаривает знакомые повторы. Так он чувствует себя читателем ещё до того, как научится читать.",
          en: "You read the words and your child 'reads' the pictures: says what they see or finishes familiar repeated lines. They feel like a reader before they can read.",
        },
        example: "Your turn! What can you see on this page?",
      },
      {
        title: { uk: "Через інтереси дитини", ru: "Через интересы ребёнка", en: "Follow your child's interests" },
        text: {
          uk: "Динозаври, космос, коні, машини: шукайте книжки, ігри й пісні англійською саме про те, що дитина любить зараз. Інтерес тримає мотивацію краще за будь-які нагороди.",
          ru: "Динозавры, космос, лошади, машины: ищите книжки, игры и песни на английском именно о том, что ребёнок любит сейчас. Интерес держит мотивацию лучше любых наград.",
          en: "Dinosaurs, space, horses, cars: find English books, games and songs about whatever your child loves right now. Interest keeps motivation going better than any reward.",
        },
      },
      {
        title: { uk: "Дитина вчить вас", ru: "Ребёнок учит вас", en: "Let your child teach you" },
        text: {
          uk: "Попросіть дитину навчити вас або іграшку нового слова. Пояснювати іншим дуже приємно, і так слова закріплюються міцніше.",
          ru: "Попросите ребёнка научить вас или игрушку новому слову. Объяснять другим очень приятно, и так слова закрепляются крепче.",
          en: "Ask your child to teach you or a toy a new word. Explaining things to others feels great and makes words stick better.",
        },
        example: "Can you teach Teddy the word 'rainbow'?",
      },
      {
        title: { uk: "Екрани як привід поговорити", ru: "Экраны как повод поговорить", en: "Screens as a reason to talk" },
        text: {
          uk: "Обирайте спокійні програми англійською з чистим мовленням, домовтеся про час заздалегідь і хоча б іноді дивіться разом. Після перегляду поставте одне-два питання англійською.",
          ru: "Выбирайте спокойные программы на английском с чистой речью, договоритесь о времени заранее и хотя бы иногда смотрите вместе. После просмотра задайте один-два вопроса по-английски.",
          en: "Choose calm English shows with clear speech, agree on screen time in advance and watch together at least sometimes. Afterwards, ask one or two questions in English.",
        },
        example: "What was your favourite part?",
      },
      {
        title: { uk: "Бережіть обидві мови", ru: "Берегите оба языка", en: "Keep both languages strong" },
        text: {
          uk: "Англійська не має витісняти українську. Читайте книжки обома мовами і не перетворюйте англійську на обов’язок: якщо дитина втомилася, краще коротка гра, ніж пропущений день.",
          ru: "Английский не должен вытеснять украинский. Читайте книжки на обоих языках и не превращайте английский в обязанность: если ребёнок устал, лучше короткая игра, чем пропущенный день.",
          en: "English should not push out Ukrainian. Read books in both languages and don't turn English into a chore: if your child is tired, a short game is better than a missed day.",
        },
      },
    ],
  },
];

// ---------- Справжні книжки (лише назва, автор, наш опис) ----------
export const BOOKS: Book[] = [
  {
    title: "Goodnight Moon",
    author: "Margaret Wise Brown",
    age: "0-3",
    why: {
      uk: "Тиха вечірня книжка з простими повторами, яка легко стає частиною ритуалу перед сном.",
      ru: "Тихая вечерняя книжка с простыми повторами, которая легко становится частью ритуала перед сном.",
      en: "A quiet bedtime book with simple repetition that easily becomes part of the evening routine.",
    },
  },
  {
    title: "Ten Little Fingers and Ten Little Toes",
    author: "Mem Fox",
    age: "0-3",
    why: {
      uk: "Ритмічний текст про пальчики, який хочеться читати, торкаючись рук і ніжок малюка.",
      ru: "Ритмичный текст о пальчиках, который хочется читать, касаясь ручек и ножек малыша.",
      en: "A rhythmic text about fingers and toes that you can read while touching your baby's hands and feet.",
    },
  },
  {
    title: "That's Not My Puppy",
    author: "Fiona Watt",
    age: "0-2",
    why: {
      uk: "Тактильна книжка з однією фразою на сторінці: малюк торкається, а ви називаєте, яке воно на дотик.",
      ru: "Тактильная книжка с одной фразой на странице: малыш трогает, а вы называете, какое оно на ощупь.",
      en: "A touch-and-feel book with one phrase per page: your baby touches and you name how it feels.",
    },
  },
  {
    title: "Where's Spot?",
    author: "Eric Hill",
    age: "1-3",
    why: {
      uk: "Книжка з віконцями, де щоразу звучить те саме питання, тож дитина швидко починає шукати разом з вами.",
      ru: "Книжка с окошками, где каждый раз звучит один и тот же вопрос, поэтому ребёнок быстро начинает искать вместе с вами.",
      en: "A lift-the-flap book with the same question on every page, so your child soon joins in the search.",
    },
  },
  {
    title: "Dear Zoo",
    author: "Rod Campbell",
    age: "1-3",
    why: {
      uk: "Віконця з тваринами і простий повторюваний сюжет допомагають вивчити назви тварин і прості прикметники.",
      ru: "Окошки с животными и простой повторяющийся сюжет помогают выучить названия животных и простые прилагательные.",
      en: "Flaps with animals and a simple repeated pattern help children learn animal names and easy adjectives.",
    },
  },
  {
    title: "Brown Bear, Brown Bear, What Do You See?",
    author: "Bill Martin Jr and Eric Carle",
    age: "1-4",
    why: {
      uk: "Одне питання і одна відповідь на кожній сторінці: ідеально для кольорів, тварин і перших спроб договорити фразу.",
      ru: "Один вопрос и один ответ на каждой странице: идеально для цветов, животных и первых попыток договорить фразу.",
      en: "One question and one answer on every page: perfect for colours, animals and first attempts to finish a line.",
    },
  },
  {
    title: "Where Is the Green Sheep?",
    author: "Mem Fox",
    age: "1-4",
    why: {
      uk: "Весела книжка про протилежності й кольори, де повтор питання тримає увагу до кінця.",
      ru: "Весёлая книжка о противоположностях и цветах, где повтор вопроса держит внимание до конца.",
      en: "A cheerful book about opposites and colours where the repeated question keeps attention to the end.",
    },
  },
  {
    title: "Each Peach Pear Plum",
    author: "Janet and Allan Ahlberg",
    age: "1-4",
    why: {
      uk: "На кожному розвороті треба знайти схованого героя, тож книжка поєднує короткі рими з грою в пошук.",
      ru: "На каждом развороте нужно найти спрятанного героя, поэтому книжка сочетает короткие рифмы с игрой в поиск.",
      en: "Each spread hides a character to find, so the book mixes short rhymes with a looking game.",
    },
  },
  {
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    age: "2-5",
    why: {
      uk: "Дні тижня, лічба і їжа в одній яскравій історії з дірочками, які так і хочеться торкнутися.",
      ru: "Дни недели, счёт и еда в одной яркой истории с дырочками, которых так и хочется коснуться.",
      en: "Days of the week, counting and food in one bright story with holes little fingers love to touch.",
    },
  },
  {
    title: "Owl Babies",
    author: "Martin Waddell",
    age: "2-5",
    why: {
      uk: "Зворушлива історія з короткими фразами, що повторюються, і спокійним щасливим кінцем.",
      ru: "Трогательная история с короткими повторяющимися фразами и спокойным счастливым концом.",
      en: "A gentle story with short repeated phrases and a calm, happy ending.",
    },
  },
  {
    title: "Guess How Much I Love You",
    author: "Sam McBratney",
    age: "2-5",
    why: {
      uk: "Ніжна книжка, яку легко розіграти руками: «ось так високо», «ось так далеко».",
      ru: "Нежная книжка, которую легко разыграть руками: «вот так высоко», «вот так далеко».",
      en: "A tender book that is easy to act out with your arms: this high, this far.",
    },
  },
  {
    title: "Peace at Last",
    author: "Jill Murphy",
    age: "2-5",
    why: {
      uk: "Смішна історія про звуки вдома і на вулиці, де дитина швидко запам’ятовує повторюваний рядок.",
      ru: "Смешная история о звуках дома и на улице, где ребёнок быстро запоминает повторяющуюся строчку.",
      en: "A funny story about noises in and around the house, with a repeated line children quickly remember.",
    },
  },
  {
    title: "Press Here",
    author: "Hervé Tullet",
    age: "2-5",
    why: {
      uk: "Інтерактивна книжка з простими командами: натисни, потруси, нахили, а англійська звучить у дії.",
      ru: "Интерактивная книжка с простыми командами: нажми, потряси, наклони, а английский звучит в действии.",
      en: "An interactive book of simple instructions: press, shake, tilt, so English comes with action.",
    },
  },
  {
    title: "We're Going on a Bear Hunt",
    author: "Michael Rosen and Helen Oxenbury",
    age: "2-6",
    why: {
      uk: "Ритмічна пригода зі звуками і повторами, яку чудово розігрувати всім тілом.",
      ru: "Ритмичное приключение со звуками и повторами, которое здорово разыгрывать всем телом.",
      en: "A rhythmic adventure full of sounds and repetition that is great to act out with the whole body.",
    },
  },
  {
    title: "The Gruffalo",
    author: "Julia Donaldson and Axel Scheffler",
    age: "3-6",
    why: {
      uk: "Для старших малюків: римована історія з чітким повтором, яку діти згодом розповідають напам’ять.",
      ru: "Для старших малышей: рифмованная история с чётким повтором, которую дети потом рассказывают наизусть.",
      en: "For older little ones: a rhyming story with a clear pattern that children soon retell by heart.",
    },
  },
];

// ---------- Наші історії про кошеня Мурлі ----------
export const STORIES: Story[] = [
  {
    slug: "murly-red-ball",
    title: "Murly and the Red Ball",
    age: "1-3",
    art: ["a-ball", "a-bed", "a-face-happy"],
    lines: [
      "This is Murly.",
      "Murly has a ball.",
      "The ball is red.",
      "Murly kicks the ball.",
      "The ball rolls and rolls.",
      "Where is the ball?",
      "Here it is! Under the bed.",
      "Murly is happy.",
    ],
    words: ["ball", "red", "kick", "roll", "under", "bed", "happy"],
    uk: [
      "Це Мурлі.",
      "У Мурлі є м’ячик.",
      "М’ячик червоний.",
      "Мурлі штовхає м’ячик.",
      "М’ячик котиться і котиться.",
      "Де м’ячик?",
      "Ось він! Під ліжком.",
      "Мурлі радіє.",
    ],
    ru: [
      "Это Мурли.",
      "У Мурли есть мячик.",
      "Мячик красный.",
      "Мурли толкает мячик.",
      "Мячик катится и катится.",
      "Где мячик?",
      "Вот он! Под кроватью.",
      "Мурли радуется.",
    ],
  },
  {
    slug: "murly-bath-time",
    title: "Bath Time",
    age: "1-3",
    art: ["a-bath", "a-fish"],
    lines: [
      "It is bath time.",
      "Murly gets in the bath.",
      "Splash, splash, splash!",
      "Murly has a little fish.",
      "The fish is yellow.",
      "Murly washes his paws.",
      "Murly washes his ears.",
      "Now Murly is clean.",
    ],
    words: ["bath", "splash", "fish", "yellow", "wash", "paws", "ears", "clean"],
    uk: [
      "Час купатися.",
      "Мурлі залазить у ванну.",
      "Хлюп, хлюп, хлюп!",
      "У Мурлі є маленька рибка.",
      "Рибка жовта.",
      "Мурлі миє лапки.",
      "Мурлі миє вушка.",
      "Тепер Мурлі чистенький.",
    ],
    ru: [
      "Время купаться.",
      "Мурли залезает в ванну.",
      "Плюх, плюх, плюх!",
      "У Мурли есть маленькая рыбка.",
      "Рыбка жёлтая.",
      "Мурли моет лапки.",
      "Мурли моет ушки.",
      "Теперь Мурли чистенький.",
    ],
  },
  {
    slug: "murly-good-night",
    title: "Good Night, Murly",
    age: "1-4",
    art: ["a-moon", "a-bed", "a-book"],
    lines: [
      "It is night.",
      "The moon is in the sky.",
      "Murly puts on his pyjamas.",
      "Murly brushes his teeth.",
      "Murly gets into bed.",
      "Mum reads a book.",
      "Murly closes his eyes.",
      "Good night, Murly.",
    ],
    words: ["night", "moon", "pyjamas", "teeth", "bed", "book", "eyes"],
    uk: [
      "Настала ніч.",
      "На небі місяць.",
      "Мурлі вдягає піжаму.",
      "Мурлі чистить зубки.",
      "Мурлі лягає в ліжко.",
      "Мама читає книжку.",
      "Мурлі заплющує очі.",
      "На добраніч, Мурлі.",
    ],
    ru: [
      "Наступила ночь.",
      "На небе луна.",
      "Мурли надевает пижаму.",
      "Мурли чистит зубки.",
      "Мурли ложится в кроватку.",
      "Мама читает книжку.",
      "Мурли закрывает глазки.",
      "Спокойной ночи, Мурли.",
    ],
  },
  {
    slug: "murly-in-the-park",
    title: "Murly in the Park",
    age: "2-4",
    art: ["a-tree", "a-bird", "a-dog"],
    lines: [
      "Murly goes to the park.",
      "Murly sees a big tree.",
      "Murly sees a little bird.",
      "The bird says, 'Tweet, tweet!'",
      "Murly sees a dog.",
      "The dog says, 'Woof, woof!'",
      "Murly runs and jumps.",
      "Murly loves the park.",
    ],
    words: ["park", "big", "tree", "little", "bird", "dog", "run", "jump"],
    uk: [
      "Мурлі йде до парку.",
      "Мурлі бачить велике дерево.",
      "Мурлі бачить маленьку пташку.",
      "Пташка каже: «Цвірінь, цвірінь!»",
      "Мурлі бачить собаку.",
      "Собака каже: «Гав, гав!»",
      "Мурлі бігає і стрибає.",
      "Мурлі дуже любить парк.",
    ],
    ru: [
      "Мурли идёт в парк.",
      "Мурли видит большое дерево.",
      "Мурли видит маленькую птичку.",
      "Птичка говорит: «Чик-чирик!»",
      "Мурли видит собаку.",
      "Собака говорит: «Гав, гав!»",
      "Мурли бегает и прыгает.",
      "Мурли очень любит парк.",
    ],
  },
  {
    slug: "murly-colours",
    title: "Murly Paints a Picture",
    age: "2-5",
    art: ["a-palette", "a-apple", "a-rainbow"],
    lines: [
      "Murly paints a picture.",
      "Red, red, a red apple.",
      "Yellow, yellow, a yellow sun.",
      "Green, green, a green leaf.",
      "Blue, blue, a blue fish.",
      "Look! It is a rainbow picture.",
      "Murly likes colours.",
    ],
    words: ["paint", "red", "yellow", "green", "blue", "rainbow", "colours"],
    uk: [
      "Мурлі малює картинку.",
      "Червоне, червоне, червоне яблуко.",
      "Жовте, жовте, жовте сонце.",
      "Зелений, зелений, зелений листочок.",
      "Синя, синя, синя рибка.",
      "Дивись! Це веселкова картинка.",
      "Мурлі любить кольори.",
    ],
    ru: [
      "Мурли рисует картинку.",
      "Красное, красное, красное яблоко.",
      "Жёлтое, жёлтое, жёлтое солнце.",
      "Зелёный, зелёный, зелёный листик.",
      "Синяя, синяя, синяя рыбка.",
      "Смотри! Это радужная картинка.",
      "Мурли любит цвета.",
    ],
  },
  {
    slug: "murly-on-the-farm",
    title: "Murly on the Farm",
    age: "1-4",
    art: ["a-dog", "a-rabbit"],
    lines: [
      "Murly is on a farm.",
      "Hello, cow! Moo, moo!",
      "Hello, pig! Oink, oink!",
      "Hello, duck! Quack, quack!",
      "Hello, dog! Woof, woof!",
      "Hello, little rabbit!",
      "The rabbit says nothing. It eats a carrot.",
      "Goodbye, farm!",
    ],
    words: ["farm", "cow", "pig", "duck", "dog", "rabbit", "carrot"],
    uk: [
      "Мурлі на фермі.",
      "Привіт, корово! Му, му!",
      "Привіт, свинко! Рох, рох!",
      "Привіт, качко! Кря, кря!",
      "Привіт, собако! Гав, гав!",
      "Привіт, маленький кролику!",
      "Кролик нічого не каже. Він їсть моркву.",
      "До побачення, фермо!",
    ],
    ru: [
      "Мурли на ферме.",
      "Привет, корова! Му, му!",
      "Привет, свинка! Хрю, хрю!",
      "Привет, уточка! Кря, кря!",
      "Привет, собака! Гав, гав!",
      "Привет, маленький кролик!",
      "Кролик ничего не говорит. Он ест морковку.",
      "До свидания, ферма!",
    ],
  },
  {
    slug: "murly-breakfast",
    title: "Breakfast with Murly",
    age: "1-4",
    art: ["a-sandwich", "a-apple", "a-coffee"],
    lines: [
      "It is morning.",
      "Murly is hungry.",
      "Murly has some milk.",
      "Murly has a sandwich.",
      "Murly has an apple. Yum, yum!",
      "Mum has a cup of coffee.",
      "All gone!",
      "Thank you, Mum!",
    ],
    words: ["morning", "hungry", "milk", "sandwich", "apple", "cup", "all gone"],
    uk: [
      "Настав ранок.",
      "Мурлі зголоднів.",
      "Мурлі п’є молоко.",
      "Мурлі їсть бутерброд.",
      "Мурлі їсть яблуко. Ням, ням!",
      "Мама п’є чашку кави.",
      "Усе з’їли!",
      "Дякую, мамо!",
    ],
    ru: [
      "Наступило утро.",
      "Мурли проголодался.",
      "Мурли пьёт молоко.",
      "Мурли ест бутерброд.",
      "Мурли ест яблоко. Ням, ням!",
      "Мама пьёт чашку кофе.",
      "Всё съели!",
      "Спасибо, мама!",
    ],
  },
  {
    slug: "murly-and-the-rain",
    title: "Murly and the Rain",
    age: "2-5",
    art: ["a-rain", "a-umbrella", "a-rainbow"],
    lines: [
      "Look! It is raining.",
      "Drip, drop, drip, drop.",
      "Murly puts on his boots.",
      "Murly takes his umbrella.",
      "Murly jumps in a puddle.",
      "Splash!",
      "Now the sun is out.",
      "Look! A rainbow!",
    ],
    words: ["rain", "boots", "umbrella", "jump", "puddle", "sun", "rainbow"],
    uk: [
      "Дивись! Іде дощ.",
      "Кап, кап, кап, кап.",
      "Мурлі взуває гумові чобітки.",
      "Мурлі бере парасольку.",
      "Мурлі стрибає в калюжу.",
      "Хлюп!",
      "А тепер визирнуло сонце.",
      "Дивись! Веселка!",
    ],
    ru: [
      "Смотри! Идёт дождь.",
      "Кап, кап, кап, кап.",
      "Мурли надевает резиновые сапожки.",
      "Мурли берёт зонтик.",
      "Мурли прыгает в лужу.",
      "Плюх!",
      "А теперь выглянуло солнце.",
      "Смотри! Радуга!",
    ],
  },
];

// ---------- Наші віршики з рухами ----------
export const RHYMES: Rhyme[] = [
  {
    title: "Hands Up High",
    lines: [
      "Hands up high, touch the sky,",
      "Hands down low, touch your toe,",
      "Turn around, sit on the ground,",
      "Clap, clap, clap, hands in your lap.",
    ],
    moves: {
      uk: "Тягніться руками вгору, потім нахиліться і торкніться пальців ніг, покрутіться і сядьте на підлогу, поплескайте в долоні й покладіть руки на коліна.",
      ru: "Тянитесь руками вверх, потом наклонитесь и коснитесь пальцев ног, покружитесь и сядьте на пол, похлопайте в ладоши и положите руки на колени.",
      en: "Stretch your arms up high, bend down and touch your toes, turn around and sit on the floor, then clap and put your hands in your lap.",
    },
  },
  {
    title: "Little Fish",
    lines: [
      "One little fish swims in the sea,",
      "Two little fish swim after me,",
      "Wiggle your fingers, wiggle your hands,",
      "Swim, little fish, to the yellow sand!",
    ],
    moves: {
      uk: "Складіть долоні разом і «пливіть» ними хвилею, покажіть один, потім два пальчики, поворушіть пальцями і долонями, а наприкінці «випливіть» рибкою на коліна дитини.",
      ru: "Сложите ладони вместе и «плывите» ими волной, покажите один, потом два пальчика, пошевелите пальцами и ладонями, а в конце «выплывите» рыбкой на коленки ребёнку.",
      en: "Put your palms together and swim them like a wave, show one finger then two, wiggle your fingers and hands, and finally swim your fish onto your child's knees.",
    },
  },
  {
    title: "Splash in the Bath",
    lines: [
      "Splash, splash, in the bath,",
      "Wash your tummy, have a laugh,",
      "Wash your arms and wash your feet,",
      "Now you're clean and very sweet!",
    ],
    moves: {
      uk: "Легенько поплескайте долонями по воді, потріть дитині животик, ручки і ніжки, а наприкінці обійміть її рушником.",
      ru: "Легонько похлопайте ладонями по воде, потрите ребёнку животик, ручки и ножки, а в конце обнимите его полотенцем.",
      en: "Pat the water gently with your hands, rub your child's tummy, arms and feet, and finish with a big towel hug.",
    },
  },
  {
    title: "Sleepy Kitten",
    lines: [
      "The moon is up, the sky is dark,",
      "No more play out in the park,",
      "Stretch your arms and curl up tight,",
      "Sleepy kitten, say good night.",
    ],
    moves: {
      uk: "Намалюйте рукою в повітрі круглий місяць, потягніться, як кошеня, згорніться клубочком і покладіть складені долоні під щоку.",
      ru: "Нарисуйте рукой в воздухе круглую луну, потянитесь, как котёнок, свернитесь клубочком и положите сложенные ладони под щёку.",
      en: "Draw a round moon in the air, stretch like a kitten, curl up into a ball and rest your cheek on your hands.",
    },
  },
  {
    title: "Jump Like a Rabbit",
    lines: [
      "Jump like a rabbit, hop, hop, hop,",
      "Fly like a bird and never stop,",
      "Swim like a fish, swish, swish, swish,",
      "Now sit down and make a wish!",
    ],
    moves: {
      uk: "Пострибайте, як кролик, помахайте руками, як крильцями, поплавайте руками, як рибка, а потім сядьте, заплющте очі й «загадайте бажання».",
      ru: "Попрыгайте, как кролик, помашите руками, как крылышками, поплавайте руками, как рыбка, а потом сядьте, закройте глаза и «загадайте желание».",
      en: "Hop like a rabbit, flap your arms like wings, make swimming movements like a fish, then sit down, close your eyes and make a wish.",
    },
  },
  {
    title: "Beep, Beep, Little Car",
    lines: [
      "Beep, beep, beep, here is my car,",
      "Driving near and driving far,",
      "Turn to the left, turn to the right,",
      "Slow down, slow down, stop at the light!",
    ],
    moves: {
      uk: "Натискайте пальцем на «клаксон» (носик дитини), крутіть уявне кермо, нахиляйтеся вліво і вправо, сповільнюйтеся і зупиняйтеся разом на слові «stop».",
      ru: "Нажимайте пальцем на «клаксон» (носик ребёнка), крутите воображаемый руль, наклоняйтесь влево и вправо, замедляйтесь и останавливайтесь вместе на слове «stop».",
      en: "Press the horn (your child's nose), turn an imaginary steering wheel, lean left and right, slow down and stop together on the word 'stop'.",
    },
  },
];

// ---------- Фрази на кожен день ----------
const W = {
  morning: { uk: "Уранці", ru: "Утром", en: "In the morning" },
  dressing: { uk: "Коли одягаємося", ru: "Когда одеваемся", en: "Getting dressed" },
  meals: { uk: "За їжею", ru: "За едой", en: "At mealtimes" },
  bath: { uk: "Під час купання", ru: "Во время купания", en: "At bath time" },
  walk: { uk: "На прогулянці", ru: "На прогулке", en: "Out for a walk" },
  play: { uk: "Коли граємося", ru: "Когда играем", en: "At play time" },
  bedtime: { uk: "Перед сном", ru: "Перед сном", en: "At bedtime" },
  praise: { uk: "Щоб похвалити", ru: "Чтобы похвалить", en: "To praise" },
};

export const PHRASES: Phrase[] = [
  // ранок
  { en: "Good morning, sunshine!", uk: "Доброго ранку, сонечко!", ru: "Доброе утро, солнышко!", when: W.morning },
  { en: "Did you sleep well?", uk: "Ти добре спав?", ru: "Ты хорошо спал?", when: W.morning },
  { en: "Time to get up!", uk: "Час вставати!", ru: "Пора вставать!", when: W.morning },
  { en: "Let's get dressed.", uk: "Давай одягатися.", ru: "Давай одеваться.", when: W.dressing },
  { en: "Arms up!", uk: "Ручки вгору!", ru: "Ручки вверх!", when: W.dressing },
  { en: "Where are your socks?", uk: "Де твої шкарпетки?", ru: "Где твои носки?", when: W.dressing },
  // їжа
  { en: "Are you hungry?", uk: "Ти голодний?", ru: "Ты голодный?", when: W.meals },
  { en: "Let's wash our hands.", uk: "Давай помиємо руки.", ru: "Давай помоем руки.", when: W.meals },
  { en: "Open wide!", uk: "Відкривай ротик!", ru: "Открывай ротик!", when: W.meals },
  { en: "Do you want some more?", uk: "Хочеш ще?", ru: "Хочешь ещё?", when: W.meals },
  { en: "All gone!", uk: "Усе з’їли!", ru: "Всё съели!", when: W.meals },
  // купання
  { en: "It's bath time!", uk: "Час купатися!", ru: "Время купаться!", when: W.bath },
  { en: "Is the water warm?", uk: "Водичка тепла?", ru: "Водичка тёплая?", when: W.bath },
  { en: "Let's wash your hair.", uk: "Давай помиємо голівку.", ru: "Давай помоем головку.", when: W.bath },
  { en: "Out you come! Here's your towel.", uk: "Вилазимо! Ось твій рушник.", ru: "Вылезаем! Вот твоё полотенце.", when: W.bath },
  // прогулянка
  { en: "Let's go outside.", uk: "Ходімо на вулицю.", ru: "Пойдём на улицу.", when: W.walk },
  { en: "Put on your coat.", uk: "Вдягни курточку.", ru: "Надень курточку.", when: W.walk },
  { en: "Hold my hand.", uk: "Тримай мене за руку.", ru: "Держи меня за руку.", when: W.walk },
  { en: "Look, a dog!", uk: "Дивись, собачка!", ru: "Смотри, собачка!", when: W.walk },
  { en: "Let's go home.", uk: "Ходімо додому.", ru: "Пойдём домой.", when: W.walk },
  // гра
  { en: "Shall we play?", uk: "Пограємося?", ru: "Поиграем?", when: W.play },
  { en: "Your turn!", uk: "Твоя черга!", ru: "Твоя очередь!", when: W.play },
  { en: "Let's tidy up.", uk: "Давай приберемо іграшки.", ru: "Давай уберём игрушки.", when: W.play },
  // сон
  { en: "Time for bed.", uk: "Час спати.", ru: "Пора спать.", when: W.bedtime },
  { en: "Let's read a book.", uk: "Давай почитаємо книжку.", ru: "Давай почитаем книжку.", when: W.bedtime },
  { en: "Sweet dreams.", uk: "Солодких снів.", ru: "Сладких снов.", when: W.bedtime },
  { en: "I love you.", uk: "Я тебе люблю.", ru: "Я тебя люблю.", when: W.bedtime },
  // похвала
  { en: "Well done!", uk: "Молодець!", ru: "Молодец!", when: W.praise },
  { en: "You did it!", uk: "У тебе вийшло!", ru: "У тебя получилось!", when: W.praise },
  { en: "Thank you for helping!", uk: "Дякую, що допоміг!", ru: "Спасибо, что помог!", when: W.praise },
];

// ---------- Ігри для друку ----------
export const GAMES: PrintGame[] = [
  {
    slug: "baby-memory-pairs",
    kind: "memory",
    age: "2-5",
    title: { uk: "Мемо: знайди пару", ru: "Мемо: найди пару", en: "Memory: find the pair" },
    how: {
      uk: "Роздрукуйте сторінку двічі й розріжте картки. Для найменших почніть з 3-4 пар, викладених картинками догори: знайдіть однакові і назвіть їх. Потім переверніть картки і відкривайте по дві, щоразу кажучи слово англійською.",
      ru: "Распечатайте страницу дважды и разрежьте карточки. Для самых маленьких начните с 3-4 пар, выложенных картинками вверх: найдите одинаковые и назовите их. Потом переверните карточки и открывайте по две, каждый раз называя слово по-английски.",
      en: "Print the page twice and cut out the cards. For the youngest, start with 3-4 pairs face up: find matching cards and name them. Then turn the cards face down and turn over two at a time, saying the English word each time.",
    },
    cards: [
      { art: "a-dog", word: "dog" },
      { art: "a-rabbit", word: "rabbit" },
      { art: "a-fish", word: "fish" },
      { art: "a-bird", word: "bird" },
      { art: "a-apple", word: "apple" },
      { art: "a-ball", word: "ball" },
      { art: "a-bed", word: "bed" },
      { art: "a-sun", word: "sun" },
    ],
  },
  {
    slug: "baby-picture-bingo",
    kind: "bingo",
    age: "3-6",
    title: { uk: "Бінго з картинками", ru: "Бинго с картинками", en: "Picture bingo" },
    how: {
      uk: "Роздрукуйте поле для кожного гравця і окремий набір карток для ведучого. Ведучий тягне картку і каже слово, не показуючи її. Гравці шукають картинку на полі й накривають її ґудзиком. Хто закрив ряд, кричить «Bingo!».",
      ru: "Распечатайте поле для каждого игрока и отдельный набор карточек для ведущего. Ведущий тянет карточку и говорит слово, не показывая её. Игроки ищут картинку на поле и накрывают её пуговицей. Кто закрыл ряд, кричит «Bingo!».",
      en: "Print a board for each player and a separate set of cards for the caller. The caller picks a card and says the word without showing it. Players find the picture on their board and cover it with a button. The first to cover a row shouts 'Bingo!'.",
    },
    cards: [
      { art: "a-apple", word: "apple" },
      { art: "a-cake", word: "cake" },
      { art: "a-ball", word: "ball" },
      { art: "a-balloon", word: "balloon" },
      { art: "a-sun", word: "sun" },
      { art: "a-moon", word: "moon" },
      { art: "a-star", word: "star" },
      { art: "a-flower", word: "flower" },
      { art: "a-tree", word: "tree" },
      { art: "a-car", word: "car" },
      { art: "a-bus", word: "bus" },
      { art: "a-house", word: "house" },
    ],
  },
  {
    slug: "baby-flashcards-animals",
    kind: "flashcards",
    age: "1-4",
    title: { uk: "Картки: тварини і природа", ru: "Карточки: животные и природа", en: "Flashcards: animals and nature" },
    how: {
      uk: "Роздрукуйте, розріжте і, якщо можна, заламінуйте картки. Показуйте по одній, називайте слово і додавайте звук чи рух: собачка гавкає, пташка махає крильцями. Старшим дітям покладіть 3 картки і попросіть дати вам потрібну.",
      ru: "Распечатайте, разрежьте и, если можно, заламинируйте карточки. Показывайте по одной, называйте слово и добавляйте звук или движение: собачка лает, птичка машет крылышками. Детям постарше положите 3 карточки и попросите дать вам нужную.",
      en: "Print, cut out and, if you can, laminate the cards. Show one at a time, say the word and add a sound or movement: the dog barks, the bird flaps its wings. For older children, lay out 3 cards and ask for one.",
    },
    cards: [
      { art: "a-dog", word: "dog" },
      { art: "a-rabbit", word: "rabbit" },
      { art: "a-fish", word: "fish" },
      { art: "a-bird", word: "bird" },
      { art: "a-turtle", word: "turtle" },
      { art: "a-hamster", word: "hamster" },
      { art: "a-tree", word: "tree" },
      { art: "a-flower", word: "flower" },
    ],
  },
  {
    slug: "baby-flashcards-food",
    kind: "flashcards",
    age: "1-4",
    title: { uk: "Картки: їжа", ru: "Карточки: еда", en: "Flashcards: food" },
    how: {
      uk: "Покладіть картки на стіл і пограйте в кафе: дитина «замовляє» страву, показуючи картку, а ви називаєте її англійською. Згодом поміняйтеся ролями, щоб слово казала дитина.",
      ru: "Положите карточки на стол и поиграйте в кафе: ребёнок «заказывает» блюдо, показывая карточку, а вы называете его по-английски. Потом поменяйтесь ролями, чтобы слово говорил ребёнок.",
      en: "Put the cards on the table and play cafés: your child 'orders' by pointing to a card and you say the word in English. Later, swap roles so your child says the word.",
    },
    cards: [
      { art: "a-apple", word: "apple" },
      { art: "a-sandwich", word: "sandwich" },
      { art: "a-soup", word: "soup" },
      { art: "a-pizza", word: "pizza" },
      { art: "a-cake", word: "cake" },
      { art: "a-burger", word: "burger" },
      { art: "a-popcorn", word: "popcorn" },
      { art: "a-donut", word: "doughnut" },
    ],
  },
  {
    slug: "baby-flashcards-home",
    kind: "flashcards",
    age: "1-4",
    title: { uk: "Картки: мій дім", ru: "Карточки: мой дом", en: "Flashcards: my home" },
    how: {
      uk: "Покажіть картку, назвіть слово, а потім разом знайдіть цей предмет у квартирі й торкніться його: «Bed! Here's the bed». Можна приклеїти картки поруч зі справжніми речами на тиждень.",
      ru: "Покажите карточку, назовите слово, а потом вместе найдите этот предмет в квартире и коснитесь его: «Bed! Here's the bed». Можно приклеить карточки рядом с настоящими вещами на неделю.",
      en: "Show a card, say the word, then find the real thing at home together and touch it: 'Bed! Here's the bed.' You can stick the cards next to the real things for a week.",
    },
    cards: [
      { art: "a-house", word: "house" },
      { art: "a-sofa", word: "sofa" },
      { art: "a-bed", word: "bed" },
      { art: "a-lamp", word: "lamp" },
      { art: "a-bath", word: "bath" },
      { art: "a-window", word: "window" },
      { art: "a-key", word: "key" },
      { art: "a-fridge", word: "fridge" },
      { art: "a-plant", word: "plant" },
      { art: "a-clock", word: "clock" },
    ],
  },
  {
    slug: "baby-find-and-say",
    kind: "find",
    age: "2-6",
    title: { uk: "Знайди і скажи", ru: "Найди и скажи", en: "Find and say" },
    how: {
      uk: "Розкладіть картки по кімнаті або сховайте під подушки. Скажіть «Find the sun!», і дитина шукає потрібну картинку. Коли знайде, хай назве її англійською (або просто покаже, якщо ще не говорить). Старшим можна давати по два слова за раз.",
      ru: "Разложите карточки по комнате или спрячьте под подушки. Скажите «Find the sun!», и ребёнок ищет нужную картинку. Когда найдёт, пусть назовёт её по-английски (или просто покажет, если ещё не говорит). Старшим можно давать по два слова за раз.",
      en: "Spread the cards around the room or hide them under cushions. Say 'Find the sun!' and your child looks for that picture. When they find it, they say the word in English (or just show it if they are not talking yet). Older children can look for two words at a time.",
    },
    cards: [
      { art: "a-sun", word: "sun" },
      { art: "a-rain", word: "rain" },
      { art: "a-snow", word: "snow" },
      { art: "a-rainbow", word: "rainbow" },
      { art: "a-moon", word: "moon" },
      { art: "a-star", word: "star" },
      { art: "a-leaf", word: "leaf" },
      { art: "a-umbrella", word: "umbrella" },
      { art: "a-car", word: "car" },
      { art: "a-bike", word: "bike" },
      { art: "a-train", word: "train" },
      { art: "a-plane", word: "plane" },
    ],
  },
];
