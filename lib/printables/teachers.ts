// Матеріали для вчителів: Speaking club (10 занять + картки) і перший урок з новим учнем.
// Інструкції для вчителя: uk/ru (L2). Навчальний контент: англійська.
import type { PrintDoc, Block, L2 } from './types';

type Lesson = {
  n: number;
  topic: string;
  goal: L2;
  grammar: string;
  warm: L2;
  questions: string[];
  activity: { name: string; intro: L2; steps: L2[] };
  extra?: Block[];
  phrases: string[];
  vocab: [string, L2][];
  wrap: L2;
};

const lessonBlocks = (l: Lesson, last: boolean): Block[] => {
  const b: Block[] = [
    { h: `Lesson ${l.n}. ${l.topic}` },
    { p: { uk: `Мета: ${l.goal.uk} Граматичний фокус: ${l.grammar}.`, ru: `Цель: ${l.goal.ru} Грамматический фокус: ${l.grammar}.` } },
    { h: { uk: "1. Розминка (5-7 хв)", ru: "1. Разминка (5-7 мин)" } },
    { p: l.warm },
    { h: { uk: "2. Питання для обговорення (20-25 хв)", ru: "2. Вопросы для обсуждения (20-25 мин)" } },
    { list: l.questions },
    { h: { uk: `3. Активність у парах або групах (15-20 хв): ${l.activity.name}`, ru: `3. Активность в парах или группах (15-20 мин): ${l.activity.name}` } },
    { p: l.activity.intro },
    { list: l.activity.steps },
    ...(l.extra ?? []),
    { tip: `Useful phrases:  ${l.phrases.join("  /  ")}` },
    { h: { uk: "4. Лексика заняття", ru: "4. Лексика занятия" } },
    { table: { head: ["Word / phrase", { uk: "Переклад", ru: "Перевод" }], rows: l.vocab.map(([en, tr]) => [en, tr]) } },
    { h: { uk: "5. Підсумок (5 хв)", ru: "5. Итог (5 мин)" } },
    { p: l.wrap },
  ];
  if (!last) b.push({ pagebreak: true });
  return b;
};

const LESSONS: Lesson[] = [
  {
    n: 1,
    topic: "Travel",
    goal: {
      uk: "учні розповідають про власні поїздки, планують подорож разом і порівнюють різні способи відпочинку.",
      ru: "ученики рассказывают о своих поездках, вместе планируют путешествие и сравнивают разные способы отдыха.",
    },
    grammar: "Present Perfect for experience (Have you ever...?) vs Past Simple",
    warm: {
      uk: "«Two truths and a lie». Кожен учень каже три речення про свої поїздки (наприклад, «I have been to Lviv three times»), одне з них вигадане. Інші ставлять по одному уточнювальному питанню й вгадують, де неправда.",
      ru: "«Two truths and a lie». Каждый ученик говорит три предложения о своих поездках (например, «I have been to Lviv three times»), одно из них выдуманное. Остальные задают по одному уточняющему вопросу и угадывают, где неправда.",
    },
    questions: [
      "Where did you go on your last trip? Who did you go with?",
      "Do you prefer the mountains, the sea or a big city? Why?",
      "What do you always take with you when you travel?",
      "Have you ever got lost in a new place? What happened?",
      "Is it better to plan every day of a trip or to decide on the spot?",
      "What is more important on holiday: comfort or adventure?",
      "Would you like to travel alone? What are the pros and cons?",
      "How has travelling changed since your parents were young?",
      "If you could live in another country for one year, which one would you choose and why?",
    ],
    activity: {
      name: "Plan a weekend trip",
      intro: {
        uk: "Пари планують поїздку на 2 дні з бюджетом 300 євро на двох. Обов'язково домовитися англійською, а не поділити завдання мовчки.",
        ru: "Пары планируют поездку на 2 дня с бюджетом 300 евро на двоих. Обязательно договориться по-английски, а не разделить задания молча.",
      },
      steps: [
        { uk: "Оберіть місце, транспорт і житло (5 хв).", ru: "Выберите место, транспорт и жильё (5 мин)." },
        { uk: "Сплануйте 3 активності й одну страву, яку обов'язково спробуєте (5 хв).", ru: "Спланируйте 3 активности и одно блюдо, которое обязательно попробуете (5 мин)." },
        { uk: "Презентуйте план групі за 1 хвилину. Група ставить по питанню кожній парі.", ru: "Презентуйте план группе за 1 минуту. Группа задаёт по вопросу каждой паре." },
        { uk: "Голосування: на яку поїздку ви поїхали б? Голосувати за себе не можна.", ru: "Голосование: в какую поездку вы бы поехали? Голосовать за себя нельзя." },
      ],
    },
    phrases: ["I'd rather... than...", "What about going to...?", "It sounds great, but...", "Let's split the cost.", "The best part was...", "I'll never forget..."],
    vocab: [
      ["to book a room", { uk: "забронювати номер", ru: "забронировать номер" }],
      ["to pack (a suitcase)", { uk: "пакувати (валізу)", ru: "собирать (чемодан)" }],
      ["to set off", { uk: "вирушати в дорогу", ru: "отправляться в путь" }],
      ["to get lost", { uk: "заблукати", ru: "заблудиться" }],
      ["to check in", { uk: "зареєструватися (в готелі, аеропорту)", ru: "зарегистрироваться (в отеле, аэропорту)" }],
      ["to look around", { uk: "роздивлятися, оглядати місце", ru: "осматриваться, осматривать место" }],
      ["to go sightseeing", { uk: "оглядати визначні місця", ru: "осматривать достопримечательности" }],
      ["to run out of (money, time)", { uk: "закінчитися (про гроші, час)", ru: "закончиться (о деньгах, времени)" }],
    ],
    wrap: {
      uk: "Кожен називає одне місце, куди хоче поїхати, і одне нове слово із заняття. Домашнє завдання: 6-8 речень «My dream trip» з трьома словами з таблиці.",
      ru: "Каждый называет одно место, куда хочет поехать, и одно новое слово из занятия. Домашнее задание: 6-8 предложений «My dream trip» с тремя словами из таблицы.",
    },
  },
  {
    n: 2,
    topic: "Food",
    goal: {
      uk: "учні описують страви й смаки, обговорюють харчові звички та розігрують ситуацію в кафе.",
      ru: "ученики описывают блюда и вкусы, обсуждают пищевые привычки и разыгрывают ситуацию в кафе.",
    },
    grammar: "countable / uncountable nouns (some, any, much, many), would like",
    warm: {
      uk: "«Guess the dish». Учень описує страву трьома реченнями, не називаючи її: з чого вона, коли її їдять, який вона має смак. Інші вгадують. Почніть самі з прикладу: «It's red. It's a soup. We often eat it with sour cream.»",
      ru: "«Guess the dish». Ученик описывает блюдо тремя предложениями, не называя его: из чего оно, когда его едят, какой у него вкус. Остальные угадывают. Начните сами с примера: «It's red. It's a soup. We often eat it with sour cream.»",
    },
    questions: [
      "What did you have for breakfast today?",
      "What is your favourite dish? Can you describe how it tastes?",
      "Do you like cooking? What can you cook well?",
      "Which Ukrainian dish would you recommend to a foreign friend and why?",
      "Do you prefer eating at home or eating out?",
      "Is there any food you hated as a child but love now?",
      "Is fast food always bad? Why or why not?",
      "Should schools teach students how to cook?",
      "What will people eat in fifty years, in your opinion?",
    ],
    activity: {
      name: "Our new cafe",
      intro: {
        uk: "Групи по 3 відкривають власне кафе. Потім одна група стає офіціантами, інша клієнтами.",
        ru: "Группы по 3 открывают собственное кафе. Затем одна группа становится официантами, другая клиентами.",
      },
      steps: [
        { uk: "Придумайте назву, 3 страви, 2 напої та ціни (7 хв).", ru: "Придумайте название, 3 блюда, 2 напитка и цены (7 мин)." },
        { uk: "Додайте одну «фішку», яка вирізняє ваше кафе (музика, дизайн, незвичне меню).", ru: "Добавьте одну «фишку», которая выделяет ваше кафе (музыка, дизайн, необычное меню)." },
        { uk: "Рольова гра: клієнти замовляють, питають поради, скаржаться на одну дрібницю.", ru: "Ролевая игра: клиенты заказывают, просят совета, жалуются на одну мелочь." },
        { uk: "Обмін ролями. Наприкінці кожен каже, в яке кафе повернувся б.", ru: "Обмен ролями. В конце каждый говорит, в какое кафе вернулся бы." },
      ],
    },
    phrases: ["Could I have..., please?", "What would you recommend?", "It tastes a bit...", "I'm not a big fan of...", "It's too spicy for me.", "Could we have the bill, please?"],
    vocab: [
      ["to order", { uk: "замовляти", ru: "заказывать" }],
      ["to taste", { uk: "куштувати; мати смак", ru: "пробовать на вкус; иметь вкус" }],
      ["to eat out", { uk: "їсти поза домом (у кафе, ресторані)", ru: "есть вне дома (в кафе, ресторане)" }],
      ["to cut down on (sugar)", { uk: "зменшити споживання (цукру)", ru: "сократить потребление (сахара)" }],
      ["to skip a meal", { uk: "пропустити прийом їжі", ru: "пропустить приём пищи" }],
      ["to heat up", { uk: "розігріти", ru: "разогреть" }],
      ["to cook from scratch", { uk: "готувати з нуля, із сирих продуктів", ru: "готовить с нуля, из сырых продуктов" }],
    ],
    wrap: {
      uk: "Коло: «One dish I want to try is... because...». Домашнє завдання: записати рецепт улюбленої страви англійською (5-7 кроків).",
      ru: "Круг: «One dish I want to try is... because...». Домашнее задание: записать рецепт любимого блюда по-английски (5-7 шагов).",
    },
  },
  {
    n: 3,
    topic: "Technology",
    goal: {
      uk: "учні говорять про гаджети й застосунки, оцінюють переваги та ризики технологій і презентують власний винахід.",
      ru: "ученики говорят о гаджетах и приложениях, оценивают плюсы и риски технологий и презентуют собственное изобретение.",
    },
    grammar: "comparatives and superlatives, It allows you to... / It helps you (to)...",
    warm: {
      uk: "«One week without it». Кожен обирає річ, без якої не прожив би тиждень (телефон, ноутбук, навушники), і за 30 секунд пояснює чому. Група вирішує, чий аргумент найпереконливіший.",
      ru: "«One week without it». Каждый выбирает вещь, без которой не прожил бы неделю (телефон, ноутбук, наушники), и за 30 секунд объясняет почему. Группа решает, чей аргумент самый убедительный.",
    },
    questions: [
      "What devices do you use every day?",
      "Which app do you open first in the morning? Why?",
      "What was your first phone or computer like?",
      "Could you live without the internet for a week? What would be the hardest part?",
      "Does technology make people closer or more distant?",
      "What do you use artificial intelligence for, if you use it at all?",
      "At what age should children get their first smartphone?",
      "Which invention of the last thirty years is the most important?",
      "What jobs could robots do better than people, and what jobs should stay human?",
    ],
    activity: {
      name: "Invention pitch",
      intro: {
        uk: "Пари вигадують гаджет або застосунок, що розв'язує буденну проблему (забуті ключі, ранні підйоми, черги).",
        ru: "Пары придумывают гаджет или приложение, которое решает бытовую проблему (забытые ключи, ранние подъёмы, очереди).",
      },
      steps: [
        { uk: "5 хв: назва, для кого винахід, як працює, скільки коштує.", ru: "5 мин: название, для кого изобретение, как работает, сколько стоит." },
        { uk: "1 хв на презентацію («pitch») для «інвесторів» (решта групи).", ru: "1 мин на презентацию («pitch») для «инвесторов» (остальная группа)." },
        { uk: "Інвестори ставлять 2 питання, а потім розподіляють по 3 жетони між винаходами.", ru: "Инвесторы задают 2 вопроса, а затем распределяют по 3 жетона между изобретениями." },
      ],
    },
    phrases: ["It allows you to...", "It's designed for...", "The main advantage is...", "On the other hand,...", "I'm not sure it's worth it.", "What happens if it breaks?"],
    vocab: [
      ["to charge (a phone)", { uk: "заряджати (телефон)", ru: "заряжать (телефон)" }],
      ["to download", { uk: "завантажувати", ru: "скачивать" }],
      ["to update", { uk: "оновлювати", ru: "обновлять" }],
      ["to log in", { uk: "увійти в акаунт", ru: "войти в аккаунт" }],
      ["to back up (files)", { uk: "робити резервну копію (файлів)", ru: "делать резервную копию (файлов)" }],
      ["to switch off", { uk: "вимикати", ru: "выключать" }],
      ["to keep up with", { uk: "встигати за, не відставати від", ru: "успевать за, не отставать от" }],
      ["to depend on", { uk: "залежати від", ru: "зависеть от" }],
    ],
    wrap: {
      uk: "Кожен завершує речення «Technology makes my life easier when... but harder when...». Домашнє завдання: відгук на улюблений застосунок (80-100 слів).",
      ru: "Каждый заканчивает предложение «Technology makes my life easier when... but harder when...». Домашнее задание: отзыв о любимом приложении (80-100 слов).",
    },
  },
  {
    n: 4,
    topic: "Friendship",
    goal: {
      uk: "учні описують риси характеру, розповідають про друзів і дають поради в непростих ситуаціях.",
      ru: "ученики описывают черты характера, рассказывают о друзьях и дают советы в непростых ситуациях.",
    },
    grammar: "giving advice: should, could, If I were you, I'd...",
    warm: {
      uk: "Кожен завершує речення «A good friend is someone who...». Записуйте відповіді на дошці, потім група обирає три найважливіші риси.",
      ru: "Каждый заканчивает предложение «A good friend is someone who...». Записывайте ответы на доске, затем группа выбирает три самых важных качества.",
    },
    questions: [
      "How did you meet your best friend?",
      "What do you usually do together with your friends?",
      "Do you have more friends online or offline?",
      "What qualities are the most important in a friend?",
      "Have you ever lost touch with a friend? Why did it happen?",
      "Is it possible to stay friends after a big argument? How?",
      "Is it better to have many friends or just a few close ones?",
      "Can parents and children be real friends?",
      "How does friendship change as people get older?",
    ],
    activity: {
      name: "Advice column",
      intro: {
        uk: "Роздайте парам ситуації нижче (по одній). Пара обговорює й готує 3 поради, потім зачитує ситуацію групі та порівнює поради з іншими.",
        ru: "Раздайте парам ситуации ниже (по одной). Пара обсуждает и готовит 3 совета, затем зачитывает ситуацию группе и сравнивает советы с другими.",
      },
      steps: [
        { uk: "Кожна порада починається з різної фрази з рамки нижче.", ru: "Каждый совет начинается с разной фразы из рамки ниже." },
        { uk: "Група голосує за найкращу пораду до кожної ситуації.", ru: "Группа голосует за лучший совет к каждой ситуации." },
      ],
    },
    extra: [
      {
        list: [
          "My friend is always late, and I'm tired of waiting.",
          "My best friend moved to another city, and we talk less and less.",
          "My friend told my secret to other people.",
          "My two best friends don't like each other.",
          "My friend always asks to copy my homework.",
          "I want to make new friends in a new school or job, but I'm shy.",
        ],
      },
    ],
    phrases: ["If I were you, I'd...", "Why don't you...?", "Have you tried...?", "It might be a good idea to...", "I see your point, but...", "That must be hard."],
    vocab: [
      ["to get on (well) with", { uk: "ладнати з кимось", ru: "ладить с кем-то" }],
      ["to count on", { uk: "розраховувати на когось", ru: "рассчитывать на кого-то" }],
      ["to fall out (with)", { uk: "посваритися (з)", ru: "поссориться (с)" }],
      ["to make up", { uk: "помиритися", ru: "помириться" }],
      ["to keep in touch", { uk: "підтримувати зв'язок", ru: "поддерживать связь" }],
      ["to lose touch", { uk: "втратити зв'язок", ru: "потерять связь" }],
      ["to hang out", { uk: "проводити час разом", ru: "проводить время вместе" }],
      ["to trust", { uk: "довіряти", ru: "доверять" }],
    ],
    wrap: {
      uk: "Кожен дає одну пораду для себе на цей тиждень: «This week I'm going to...». Домашнє завдання: лист другові, з яким давно не спілкувалися (8-10 речень).",
      ru: "Каждый даёт один совет себе на эту неделю: «This week I'm going to...». Домашнее задание: письмо другу, с которым давно не общались (8-10 предложений).",
    },
  },
  {
    n: 5,
    topic: "Money",
    goal: {
      uk: "учні обговорюють витрати й заощадження, висловлюють думку про гроші та складають бюджет.",
      ru: "ученики обсуждают траты и сбережения, высказывают мнение о деньгах и составляют бюджет.",
    },
    grammar: "First and Second Conditional (If I had more money, I would...)",
    warm: {
      uk: "«Guess the price». Учитель називає 6 речей (a cup of coffee, a cinema ticket, a pair of trainers, a new phone, a bike, a month of gym), учні в парах вгадують ціну в гривнях. Перемагає пара, найближча до реальних цін.",
      ru: "«Guess the price». Учитель называет 6 вещей (a cup of coffee, a cinema ticket, a pair of trainers, a new phone, a bike, a month of gym), ученики в парах угадывают цену в гривнах. Побеждает пара, ближе всего к реальным ценам.",
    },
    questions: [
      "What do you spend most of your money on?",
      "Do you prefer paying by card or in cash? Why?",
      "What is the best thing you have ever bought?",
      "Have you ever bought something and regretted it later?",
      "Is it better to save money or to enjoy it now?",
      "Should children get money for good marks or for helping at home?",
      "Is it a good idea to lend money to friends?",
      "Can money buy happiness? Give an example.",
      "If you suddenly got a large sum of money, what would you do first?",
    ],
    activity: {
      name: "Monthly budget",
      intro: {
        uk: "Пари планують місячний бюджет студента, який уперше живе сам. Суму задає вчитель відповідно до реалій вашого міста.",
        ru: "Пары планируют месячный бюджет студента, который впервые живёт один. Сумму задаёт учитель в соответствии с реалиями вашего города.",
      },
      steps: [
        { uk: "Заповніть таблицю й домовтеся, на чому можна заощадити.", ru: "Заполните таблицу и договоритесь, на чём можно сэкономить." },
        { uk: "Порівняйте бюджет з іншою парою й поясніть 2 найбільші відмінності.", ru: "Сравните бюджет с другой парой и объясните 2 главных отличия." },
      ],
    },
    extra: [
      {
        table: {
          head: ["Category", "Amount", "Why?"],
          rows: [["Rent", "", ""], ["Food", "", ""], ["Transport", "", ""], ["Phone and internet", "", ""], ["Fun", "", ""], ["Savings", "", ""]],
        },
      },
    ],
    phrases: ["It's worth it.", "It's a waste of money.", "I can't afford it.", "It's a good deal.", "I'd rather save up for...", "In the long run,..."],
    vocab: [
      ["to save up (for)", { uk: "заощаджувати (на)", ru: "копить (на)" }],
      ["to spend (on)", { uk: "витрачати (на)", ru: "тратить (на)" }],
      ["to afford", { uk: "дозволити собі (за коштами)", ru: "позволить себе (по деньгам)" }],
      ["to borrow", { uk: "позичати (брати в борг)", ru: "одалживать (брать в долг)" }],
      ["to lend", { uk: "позичати (давати в борг)", ru: "одалживать (давать в долг)" }],
      ["to pay back", { uk: "повертати борг", ru: "возвращать долг" }],
      ["to earn", { uk: "заробляти", ru: "зарабатывать" }],
      ["to splash out (on)", { uk: "розщедритися (на)", ru: "раскошелиться (на)" }],
    ],
    wrap: {
      uk: "Кожен каже одну річ, на яку варто витрачати гроші, і одну, на яку не варто. Домашнє завдання: 7 речень «If I had..., I would...».",
      ru: "Каждый называет одну вещь, на которую стоит тратить деньги, и одну, на которую не стоит. Домашнее задание: 7 предложений «If I had..., I would...».",
    },
  },
  {
    n: 6,
    topic: "Future jobs",
    goal: {
      uk: "учні говорять про професії та навички, прогнозують майбутнє ринку праці й тренують співбесіду.",
      ru: "ученики говорят о профессиях и навыках, прогнозируют будущее рынка труда и тренируют собеседование.",
    },
    grammar: "future forms: will, might, be going to",
    warm: {
      uk: "«Guess my job». Учень дає три підказки про професію («I work with animals. I wear a uniform. I don't work in an office.»), інші вгадують. Хто вгадав, загадує наступну.",
      ru: "«Guess my job». Ученик даёт три подсказки о профессии («I work with animals. I wear a uniform. I don't work in an office.»), остальные угадывают. Кто угадал, загадывает следующую.",
    },
    questions: [
      "What did you want to be when you were a child?",
      "Which is more important for you: a high salary or an interesting job?",
      "Would you prefer to work from home or in an office?",
      "Which jobs might disappear in the next twenty years?",
      "What new jobs might appear in the future?",
      "Which skills will be useful in any job in ten years?",
      "Is it better to have one career for life or to change jobs often?",
      "Should people choose a job they love or a job that pays well?",
      "Describe your dream working day from morning to evening.",
    ],
    activity: {
      name: "Job interview",
      intro: {
        uk: "Пари: інтерв'юер і кандидат. Вакансії напишіть на дошці або на картках: games tester, dog walker, travel blogger, school librarian, app designer, tour guide.",
        ru: "Пары: интервьюер и кандидат. Вакансии напишите на доске или на карточках: games tester, dog walker, travel blogger, school librarian, app designer, tour guide.",
      },
      steps: [
        { uk: "Інтерв'юер ставить 5 питань: Why do you want this job? What are your strengths? Tell me about a problem you solved. Where do you see yourself in five years? Do you have any questions?", ru: "Интервьюер задаёт 5 вопросов: Why do you want this job? What are your strengths? Tell me about a problem you solved. Where do you see yourself in five years? Do you have any questions?" },
        { uk: "Через 5 хвилин обмін ролями й нова вакансія.", ru: "Через 5 минут обмен ролями и новая вакансия." },
        { uk: "Інтерв'юер оголошує рішення: «You've got the job because...» або «Unfortunately...».", ru: "Интервьюер объявляет решение: «You've got the job because...» или «Unfortunately...»." },
      ],
    },
    phrases: ["I'm good at...", "I have some experience in...", "I'm really interested in...", "My strongest skill is...", "I'd like to learn more about...", "Could you tell me more about...?"],
    vocab: [
      ["to apply for (a job)", { uk: "подавати заявку (на роботу)", ru: "подавать заявку (на работу)" }],
      ["to hire", { uk: "наймати на роботу", ru: "нанимать на работу" }],
      ["to work from home", { uk: "працювати з дому", ru: "работать из дома" }],
      ["to get promoted", { uk: "отримати підвищення", ru: "получить повышение" }],
      ["to earn a living", { uk: "заробляти на життя", ru: "зарабатывать на жизнь" }],
      ["to retrain", { uk: "перекваліфіковуватися", ru: "переквалифицироваться" }],
      ["to deal with", { uk: "мати справу з; впоратися з", ru: "иметь дело с; справляться с" }],
    ],
    wrap: {
      uk: "Кожен називає одну навичку, яку хоче розвинути цього року, і як саме. Домашнє завдання: коротке резюме «About me» англійською (освіта, навички, інтереси).",
      ru: "Каждый называет один навык, который хочет развить в этом году, и как именно. Домашнее задание: короткое резюме «About me» по-английски (образование, навыки, интересы).",
    },
  },
  {
    n: 7,
    topic: "Social media",
    goal: {
      uk: "учні обговорюють роль соцмереж, висловлюють і аргументують думку та беруть участь у дебатах.",
      ru: "ученики обсуждают роль соцсетей, высказывают и аргументируют мнение и участвуют в дебатах.",
    },
    grammar: "expressing opinion, adverbs of frequency, too much / not enough",
    warm: {
      uk: "«Hands up if...». Учитель зачитує твердження, учні піднімають руку, якщо це про них: I check my phone in bed. I have posted a photo today. I follow more than 200 accounts. I have deleted an app to spend less time online. Після кожного одне питання тому, хто підняв руку.",
      ru: "«Hands up if...». Учитель зачитывает утверждения, ученики поднимают руку, если это про них: I check my phone in bed. I have posted a photo today. I follow more than 200 accounts. I have deleted an app to spend less time online. После каждого один вопрос тому, кто поднял руку.",
    },
    questions: [
      "Which social networks do you use? Which one is your favourite?",
      "What kind of content do you like to watch or read?",
      "Have you ever posted something and then deleted it? Why?",
      "How much time a day do you spend online? Is it too much?",
      "Do people show their real life on social media?",
      "Would you like to be a blogger? What would your blog be about?",
      "How can we recognise fake news?",
      "Should there be an age limit for social media?",
      "Imagine all social media disappeared tomorrow. What would change?",
    ],
    activity: {
      name: "Mini debate",
      intro: {
        uk: "Дві команди. Тема: «Social media does more good than harm». Сторону визначає жереб, а не власна думка, це тренує аргументацію.",
        ru: "Две команды. Тема: «Social media does more good than harm». Сторону определяет жребий, а не собственное мнение, это тренирует аргументацию.",
      },
      steps: [
        { uk: "5 хв підготовки: 3 аргументи та приклад до кожного.", ru: "5 мин подготовки: 3 аргумента и пример к каждому." },
        { uk: "По 2 хв на вступне слово для кожної команди.", ru: "По 2 мин на вступительное слово для каждой команды." },
        { uk: "3 хв питань одне одному, потім по 1 хв на підсумок.", ru: "3 мин вопросов друг другу, затем по 1 мин на итог." },
        { uk: "Учитель оцінює не «хто правий», а кількість аргументів, прикладів і вжитих фраз.", ru: "Учитель оценивает не «кто прав», а количество аргументов, примеров и использованных фраз." },
      ],
    },
    phrases: ["In my opinion,...", "I strongly believe that...", "That's a fair point, but...", "Let me finish, please.", "Do you have an example?", "To sum up,..."],
    vocab: [
      ["to post", { uk: "публікувати допис", ru: "публиковать пост" }],
      ["to share", { uk: "поширювати, ділитися", ru: "делиться, репостить" }],
      ["to follow", { uk: "підписатися, стежити", ru: "подписаться, следить" }],
      ["to unfollow", { uk: "відписатися", ru: "отписаться" }],
      ["to scroll through", { uk: "гортати (стрічку)", ru: "листать (ленту)" }],
      ["to go viral", { uk: "стати вірусним", ru: "стать вирусным" }],
      ["to block", { uk: "заблокувати", ru: "заблокировать" }],
    ],
    wrap: {
      uk: "Кожен формулює одне правило «здорових» соцмереж для себе. Домашнє завдання: допис-есе (100 слів) «My life online».",
      ru: "Каждый формулирует одно правило «здоровых» соцсетей для себя. Домашнее задание: пост-эссе (100 слов) «My life online».",
    },
  },
  {
    n: 8,
    topic: "Environment",
    goal: {
      uk: "учні говорять про екологічні звички, пропонують рішення локальних проблем і планують спільний челендж.",
      ru: "ученики говорят об экологических привычках, предлагают решения местных проблем и планируют общий челлендж.",
    },
    grammar: "should / could / have to, We could... It would help if...",
    warm: {
      uk: "«Green or not?». Учитель зачитує звички (taking your own bag to the shop, leaving the charger in the socket, buying water in plastic bottles, repairing old clothes). Учні показують великий палець угору або вниз і одним реченням пояснюють вибір.",
      ru: "«Green or not?». Учитель зачитывает привычки (taking your own bag to the shop, leaving the charger in the socket, buying water in plastic bottles, repairing old clothes). Ученики показывают большой палец вверх или вниз и одним предложением объясняют выбор.",
    },
    questions: [
      "Has the weather where you live changed in recent years?",
      "Do you sort your rubbish at home? Why or why not?",
      "How do you usually get to school or work? Is it eco-friendly?",
      "What things do you buy that you could live without?",
      "Who should protect nature: governments, companies or each of us?",
      "Would you pay more for products that are better for the environment?",
      "What is the biggest environmental problem in your city?",
      "What simple changes could your school or office make?",
      "How do you imagine our planet in fifty years?",
    ],
    activity: {
      name: "7-day eco-challenge",
      intro: {
        uk: "Групи придумують челендж на 7 днів: одна маленька дія на кожен день.",
        ru: "Группы придумывают челлендж на 7 дней: одно маленькое действие на каждый день.",
      },
      steps: [
        { uk: "Дії мають бути реальними й безкоштовними (наприклад, «Day 3: no paper cups»).", ru: "Действия должны быть реальными и бесплатными (например, «Day 3: no paper cups»)." },
        { uk: "Кожна група презентує челендж і пояснює, який із днів найважчий.", ru: "Каждая группа презентует челлендж и объясняет, какой из дней самый трудный." },
        { uk: "Клас обирає один челендж і справді виконує його до наступного заняття.", ru: "Класс выбирает один челлендж и действительно выполняет его до следующего занятия." },
      ],
    },
    phrases: ["We could...", "It would make a difference if...", "The problem is that...", "One possible solution is...", "It's not realistic because...", "Let's start with..."],
    vocab: [
      ["to recycle", { uk: "переробляти (відходи)", ru: "перерабатывать (отходы)" }],
      ["to reduce", { uk: "зменшувати", ru: "уменьшать" }],
      ["to reuse", { uk: "використовувати повторно", ru: "использовать повторно" }],
      ["to throw away", { uk: "викидати", ru: "выбрасывать" }],
      ["to pollute", { uk: "забруднювати", ru: "загрязнять" }],
      ["to turn off (the lights)", { uk: "вимикати (світло)", ru: "выключать (свет)" }],
      ["to switch to", { uk: "перейти на (щось інше)", ru: "перейти на (что-то другое)" }],
      ["to protect", { uk: "захищати, охороняти", ru: "защищать, охранять" }],
    ],
    wrap: {
      uk: "Кожен каже одну звичку, яку змінить цього тижня. На наступному занятті 3 хвилини на звіт про челендж. Домашнє завдання: щоденник челенджу (одне речення на день).",
      ru: "Каждый называет одну привычку, которую изменит на этой неделе. На следующем занятии 3 минуты на отчёт о челлендже. Домашнее задание: дневник челленджа (одно предложение в день).",
    },
  },
  {
    n: 9,
    topic: "Cities",
    goal: {
      uk: "учні описують своє місто, порівнюють життя в місті й селі та проєктують ідеальний район.",
      ru: "ученики описывают свой город, сравнивают жизнь в городе и в деревне и проектируют идеальный район.",
    },
    grammar: "there is / there are, prepositions of place, Second Conditional (If I were the mayor...)",
    warm: {
      uk: "«My city in three words». Кожен описує своє місто (або місто мрії) трьома прикметниками. Група ставить одне питання: «Why green?», «What makes it noisy?».",
      ru: "«My city in three words». Каждый описывает свой город (или город мечты) тремя прилагательными. Группа задаёт один вопрос: «Why green?», «What makes it noisy?».",
    },
    questions: [
      "Do you live in a city, a town or a village? Do you like it?",
      "What is your favourite place in your city? Why?",
      "What would you show a tourist in your city in one day?",
      "Would you prefer to live in a big city or in the countryside?",
      "What is the biggest problem in your city: traffic, noise, prices or something else?",
      "What makes a city a good place for children and for older people?",
      "Which city in the world would you like to visit and why?",
      "Should city centres be closed to cars?",
      "If you were the mayor for one day, what would you change?",
    ],
    activity: {
      name: "Design a perfect district",
      intro: {
        uk: "Групи отримують аркуш А4 і малюють схему району, де розмістять 8 об'єктів: park, school, cafe, library, bus stop, sports ground, shop, one surprise place.",
        ru: "Группы получают лист А4 и рисуют схему района, где разместят 8 объектов: park, school, cafe, library, bus stop, sports ground, shop, one surprise place.",
      },
      steps: [
        { uk: "10 хв на план. Під час роботи говоримо лише англійською.", ru: "10 мин на план. Во время работы говорим только по-английски." },
        { uk: "Презентація: «There is a park in the middle. The school is next to...».", ru: "Презентация: «There is a park in the middle. The school is next to...»." },
        { uk: "Інші групи питають: «Why did you put... next to...?»", ru: "Другие группы спрашивают: «Why did you put... next to...?»" },
      ],
    },
    phrases: ["It's located in/near...", "It's within walking distance.", "It's next to / opposite / between...", "The area is famous for...", "What I like most about it is...", "It gets crowded at..."],
    vocab: [
      ["to get around", { uk: "пересуватися (містом)", ru: "передвигаться (по городу)" }],
      ["to commute", { uk: "щодня їздити на роботу чи навчання", ru: "ежедневно ездить на работу или учёбу" }],
      ["to move (house)", { uk: "переїжджати", ru: "переезжать" }],
      ["to settle down", { uk: "осісти, облаштуватися", ru: "осесть, обустроиться" }],
      ["to show (someone) around", { uk: "показати місто комусь", ru: "показать город кому-то" }],
      ["to get stuck in traffic", { uk: "застрягнути в заторі", ru: "застрять в пробке" }],
      ["to renovate", { uk: "реконструювати, ремонтувати", ru: "реконструировать, ремонтировать" }],
    ],
    wrap: {
      uk: "Кожен завершує речення «The best thing about my city is..., but I wish it had...». Домашнє завдання: міні-путівник своїм містом (5 місць, по 2 речення).",
      ru: "Каждый заканчивает предложение «The best thing about my city is..., but I wish it had...». Домашнее задание: мини-путеводитель по своему городу (5 мест, по 2 предложения).",
    },
  },
  {
    n: 10,
    topic: "Habits",
    goal: {
      uk: "учні описують розпорядок дня, корисні й шкідливі звички та ставлять собі реалістичну мету на 2 тижні.",
      ru: "ученики описывают распорядок дня, полезные и вредные привычки и ставят себе реалистичную цель на 2 недели.",
    },
    grammar: "used to, be/get used to, tend to, Present Simple with frequency",
    warm: {
      uk: "«Morning race». Пари: 1 хвилина, щоб описати свій ранок, вживши якомога більше дієслів. Партнер рахує дієслова. Потім обмін.",
      ru: "«Morning race». Пары: 1 минута, чтобы описать своё утро, использовав как можно больше глаголов. Партнёр считает глаголы. Затем обмен.",
    },
    questions: [
      "What time do you usually get up on weekdays and at weekends?",
      "What is one healthy habit you have?",
      "What is one habit you would like to break?",
      "Are you an early bird or a night owl?",
      "Do you use any apps or lists to organise your day?",
      "Which habits did you get from your parents?",
      "What did you use to do as a child that you don't do now?",
      "Is it easier to start a good habit or to stop a bad one?",
      "If you could give everyone one useful habit, what would it be?",
    ],
    activity: {
      name: "Habit buddy",
      intro: {
        uk: "Кожен обирає одну маленьку звичку на 14 днів (10 хв читання англійською, 8 склянок води, сон до 23:00). Пари стають «habit buddies» і перевіряють одне одного.",
        ru: "Каждый выбирает одну маленькую привычку на 14 дней (10 мин чтения на английском, 8 стаканов воды, сон до 23:00). Пары становятся «habit buddies» и проверяют друг друга.",
      },
      steps: [
        { uk: "Сформулюйте звичку: «Every day I will... for... minutes».", ru: "Сформулируйте привычку: «Every day I will... for... minutes»." },
        { uk: "Обговоріть, що може завадити, і план «Б» на такий випадок.", ru: "Обсудите, что может помешать, и план «Б» на такой случай." },
        { uk: "Відмічайте кожен день у трекері нижче.", ru: "Отмечайте каждый день в трекере ниже." },
      ],
    },
    extra: [
      {
        table: {
          head: ["My habit", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          rows: [["Week 1", "", "", "", "", "", "", ""], ["Week 2", "", "", "", "", "", "", ""]],
        },
      },
    ],
    phrases: ["I tend to...", "I used to..., but now I...", "I'm trying to...", "It's hard for me to...", "every other day", "I've got into the habit of..."],
    vocab: [
      ["to get into the habit of", { uk: "набути звички", ru: "приобрести привычку" }],
      ["to break a habit", { uk: "позбутися звички", ru: "избавиться от привычки" }],
      ["to give up", { uk: "кинути, відмовитися від", ru: "бросить, отказаться от" }],
      ["to stick to", { uk: "дотримуватися (плану)", ru: "придерживаться (плана)" }],
      ["to put off", { uk: "відкладати на потім", ru: "откладывать на потом" }],
      ["to get used to", { uk: "звикати до", ru: "привыкать к" }],
      ["to keep up", { uk: "продовжувати, не кидати", ru: "продолжать, не бросать" }],
    ],
    wrap: {
      uk: "Кожен вголос обіцяє партнерові свою звичку. Через 2 тижні 5 хвилин на початку заняття: «Did you stick to your habit?». Домашнє завдання: 5 речень з used to про дитинство.",
      ru: "Каждый вслух обещает партнёру свою привычку. Через 2 недели 5 минут в начале занятия: «Did you stick to your habit?». Домашнее задание: 5 предложений с used to о детстве.",
    },
  },
];

const speakingClub: PrintDoc = {
  id: "speaking-club-10",
  title: { uk: "Speaking club: 10 готових занять", ru: "Speaking club: 10 готовых занятий" },
  subtitle: {
    uk: "Для підлітків і дорослих, рівні A2-B2. Кожне заняття 60 хвилин, одне заняття на сторінку.",
    ru: "Для подростков и взрослых, уровни A2-B2. Каждое занятие 60 минут, одно занятие на страницу.",
  },
  level: "A2-B2",
  blocks: [
    { h: { uk: "Як користуватися", ru: "Как пользоваться" } },
    {
      list: [
        { uk: "Питання впорядковані від простіших (A2) до складніших (B2). Для групи A2 беріть перші 5-6, для B2 починайте з 4-го і додавайте «Why?» до кожної відповіді.", ru: "Вопросы упорядочены от простых (A2) к более сложным (B2). Для группы A2 берите первые 5-6, для B2 начинайте с 4-го и добавляйте «Why?» к каждому ответу." },
        { uk: "Лексику з таблиці виписуйте на дошку до обговорення й просіть ужити кожне слово хоча б раз за заняття.", ru: "Лексику из таблицы выписывайте на доску до обсуждения и просите использовать каждое слово хотя бы раз за занятие." },
        { uk: "Рамку «Useful phrases» покажіть на екрані або роздайте. За кожну вжиту фразу учень отримує бал.", ru: "Рамку «Useful phrases» покажите на экране или раздайте. За каждую использованную фразу ученик получает балл." },
        { uk: "Не перебивайте, щоб виправити помилку. Записуйте помилки й розберіть 3-5 найважливіших наприкінці.", ru: "Не перебивайте, чтобы исправить ошибку. Записывайте ошибки и разберите 3-5 самых важных в конце." },
        { uk: "Учні мають говорити щонайменше 70% часу. Якщо говорить один-двоє, переходьте в пари або малі групи.", ru: "Ученики должны говорить не менее 70% времени. Если говорят один-двое, переходите в пары или малые группы." },
        { uk: "Картки з питаннями до тих самих тем є в окремому наборі «Speaking club: картки».", ru: "Карточки с вопросами к тем же темам есть в отдельном наборе «Speaking club: карточки»." },
      ],
    },
    { h: { uk: "Схема заняття на 60 хвилин", ru: "Схема занятия на 60 минут" } },
    {
      table: {
        head: [{ uk: "Етап", ru: "Этап" }, { uk: "Час", ru: "Время" }, { uk: "Що відбувається", ru: "Что происходит" }],
        rows: [
          [{ uk: "Розминка", ru: "Разминка" }, "5-7", { uk: "Легка гра, щоб усі заговорили в перші хвилини", ru: "Лёгкая игра, чтобы все заговорили в первые минуты" }],
          [{ uk: "Лексика", ru: "Лексика" }, "5", { uk: "Слова з таблиці на дошці, швидкі приклади", ru: "Слова из таблицы на доске, быстрые примеры" }],
          [{ uk: "Обговорення", ru: "Обсуждение" }, "20", { uk: "Питання в парах, потім найцікавіше в загальне коло", ru: "Вопросы в парах, потом самое интересное в общий круг" }],
          [{ uk: "Активність", ru: "Активность" }, "15-20", { uk: "Рольова гра, дебати, проєкт у групах", ru: "Ролевая игра, дебаты, проект в группах" }],
          [{ uk: "Розбір помилок", ru: "Разбор ошибок" }, "5", { uk: "3-5 типових помилок без імен", ru: "3-5 типичных ошибок без имён" }],
          [{ uk: "Підсумок", ru: "Итог" }, "3-5", { uk: "Кожен каже, що забирає із заняття; домашнє завдання", ru: "Каждый говорит, что забирает с занятия; домашнее задание" }],
        ],
      },
    },
    { h: { uk: "Зміст", ru: "Содержание" } },
    {
      table: {
        head: ["#", "Topic", { uk: "Граматичний фокус", ru: "Грамматический фокус" }, { uk: "Активність", ru: "Активность" }],
        rows: LESSONS.map((l) => [String(l.n), l.topic, l.grammar, l.activity.name]),
      },
    },
    { tip: { uk: "Репліки, які не дають розмові згаснути: «Can you give an example?», «Why do you think so?», «Who agrees?», «What would you do in this situation?»", ru: "Реплики, которые не дают разговору угаснуть: «Can you give an example?», «Why do you think so?», «Who agrees?», «What would you do in this situation?»" } },
    { pagebreak: true },
    ...LESSONS.flatMap((l, i) => lessonBlocks(l, i === LESSONS.length - 1)),
  ],
};

// ---------- Картки для speaking club ----------

type Topic = { uk: string; ru: string; cards: [string, string][] };

const CARD_TOPICS: Topic[] = [
  {
    uk: "Подорожі", ru: "Путешествия",
    cards: [
      ["What is the most beautiful place you have ever seen?", "The most beautiful place I've seen is..."],
      ["Do you prefer travelling by train, by car or by plane?", "I prefer... because it's..."],
      ["What souvenir would you bring a friend from your town?", "I would bring..."],
      ["Describe a perfect day on holiday.", "In the morning I would..."],
      ["Have you ever had a problem during a trip?", "Once, when I was in..., ..."],
      ["Where would you never want to go? Why?", "I'd never go to... because..."],
      ["Do you like trying local food when you travel?", "Yes, I always try... / No, I usually..."],
      ["Is it better to travel with friends or with family?", "I think it's better with... because..."],
    ],
  },
  {
    uk: "Їжа", ru: "Еда",
    cards: [
      ["What food do you eat when you are sad or tired?", "When I'm tired, I usually eat..."],
      ["What is the strangest food you have ever tried?", "The strangest thing I've tried is..."],
      ["Who cooks the best in your family?", "My... cooks the best. Their best dish is..."],
      ["Would you like to be a chef? Why or why not?", "I would / wouldn't like it because..."],
      ["Sweet or salty snacks? Which do you choose?", "I usually choose... because..."],
      ["What does a perfect weekend breakfast look like?", "A perfect breakfast is..."],
      ["Do you read the labels on food packages?", "I sometimes check..."],
      ["Describe a dish from your childhood.", "When I was a child, my... made..."],
    ],
  },
  {
    uk: "Технології", ru: "Технологии",
    cards: [
      ["How many hours a day do you look at a screen?", "I think about... hours a day."],
      ["What app could you delete without missing it?", "I could easily delete..."],
      ["Do you prefer paper books or e-books?", "I prefer... because..."],
      ["What would you ask a robot to do for you?", "I would ask it to..."],
      ["Have you ever had a problem because of technology?", "Once my phone / laptop..."],
      ["Which gadget would you like to invent?", "I'd invent a gadget that..."],
      ["Do you trust online reviews?", "I trust them when..."],
      ["How do you protect your passwords?", "I usually..."],
    ],
  },
  {
    uk: "Дружба", ru: "Дружба",
    cards: [
      ["What makes you laugh with your friends?", "We always laugh when..."],
      ["Describe your best friend in three words.", "My best friend is..., ... and..."],
      ["What is a perfect present for a friend?", "A perfect present is..."],
      ["Have you ever made a friend while travelling?", "Yes, I met... in... / No, but..."],
      ["Do you tell your friends everything?", "I tell them most things, but..."],
      ["What should you do if a friend is sad?", "You should..."],
      ["Can pets be our friends? Why?", "I think pets can... because..."],
      ["What do you and your best friend have in common?", "We both like..."],
    ],
  },
  {
    uk: "Гроші", ru: "Деньги",
    cards: [
      ["What was the first thing you bought with your own money?", "The first thing I bought was..."],
      ["Is it easy for you to save money?", "It's easy / hard for me because..."],
      ["What is something expensive but worth it?", "... is expensive, but it's worth it because..."],
      ["What is something cheap that makes you happy?", "... is cheap, but it makes me happy."],
      ["Do you like shopping or do you find it boring?", "I find shopping... because..."],
      ["Should students have a part-time job?", "I think students should / shouldn't..."],
      ["What would you do with a million?", "First, I would..."],
      ["Do you compare prices before buying?", "I always / never compare prices when..."],
    ],
  },
  {
    uk: "Професії майбутнього", ru: "Профессии будущего",
    cards: [
      ["Which job would you never want to do? Why?", "I'd never be a... because..."],
      ["What job would be perfect for your best friend?", "My friend would be a great..."],
      ["Would you like to work in another country?", "I would / wouldn't like to work in..."],
      ["What is more important: a good team or a good salary?", "For me,... is more important."],
      ["Which school subject is the most useful for work?", "I think... is the most useful."],
      ["Would you like to have your own business?", "If I had my own business, it would be..."],
      ["What job will be popular in 2050?", "I think... will be popular because..."],
      ["Describe a person whose job you admire.", "I admire... because..."],
    ],
  },
  {
    uk: "Соцмережі", ru: "Соцсети",
    cards: [
      ["What was the last video you watched online?", "The last video I watched was about..."],
      ["Do you post photos often? What kind?", "I usually post photos of..."],
      ["Have you ever learned something useful from social media?", "Yes, I learned how to..."],
      ["What kind of posts annoy you?", "I don't like posts that..."],
      ["Would you let your future children use social media?", "I would let them when..."],
      ["Who is an interesting person you follow? Why?", "I follow... because..."],
      ["How would you spend a day without your phone?", "Without my phone, I would..."],
      ["Do likes really matter? Why do people want them?", "I think likes matter / don't matter because..."],
    ],
  },
  {
    uk: "Довкілля", ru: "Окружающая среда",
    cards: [
      ["What is your favourite place in nature?", "My favourite place is..."],
      ["How often do you buy new clothes?", "I buy new clothes about..."],
      ["What do you do with old things you don't need?", "I usually give them away / sell them..."],
      ["Which season is the best and why?", "The best season is... because..."],
      ["Would you like to live in an eco-house?", "I would like to live in an eco-house if..."],
      ["How can a family save water at home?", "A family can..."],
      ["Is it important to plant trees in cities?", "Yes, because trees..."],
      ["What animal would you like to protect most?", "I'd like to protect... because..."],
    ],
  },
  {
    uk: "Міста", ru: "Города",
    cards: [
      ["What is the best place to meet friends in your town?", "The best place is... because..."],
      ["What does your street look like?", "On my street there is / are..."],
      ["Do you like walking around the city at night?", "I like / don't like it because..."],
      ["What would you change about public transport?", "I would add / change..."],
      ["Is it better to live in the centre or outside it?", "I'd rather live... because..."],
      ["What city would you like to live in for one year?", "I'd like to live in... because..."],
      ["Describe your favourite cafe or park.", "It's a small / big place where..."],
      ["What makes a city friendly for tourists?", "A friendly city has..."],
    ],
  },
  {
    uk: "Звички", ru: "Привычки",
    cards: [
      ["What do you do right after you wake up?", "Right after I wake up, I..."],
      ["What is your evening routine?", "In the evening I usually..."],
      ["Do you make your bed every morning?", "I always / sometimes / never..."],
      ["What habit helps you study better?", "It helps me when I..."],
      ["How do you relax after a busy day?", "To relax, I..."],
      ["Do you plan your week in advance?", "I usually plan... / I don't plan because..."],
      ["What did you use to do as a child every weekend?", "I used to..."],
      ["What new habit would you like to start this month?", "This month I want to start..."],
    ],
  },
];

const cardsDoc: PrintDoc = {
  id: "speaking-club-cards",
  title: { uk: "Speaking club: картки з питаннями", ru: "Speaking club: карточки с вопросами" },
  subtitle: {
    uk: "80 карток для вирізання: 10 тем по 8 питань. Лицьовий бік англійською, на звороті тема й початок відповіді.",
    ru: "80 карточек для вырезания: 10 тем по 8 вопросов. Лицевая сторона на английском, на обороте тема и начало ответа.",
  },
  level: "A2-B2",
  blocks: [
    { h: { uk: "Як грати з картками", ru: "Как играть с карточками" } },
    {
      list: [
        { uk: "Друкуйте двосторонньо (переворот по короткому краю), щоб зворот збігся з лицьовим боком. Розріжте по лініях.", ru: "Печатайте двусторонне (переворот по короткому краю), чтобы оборот совпал с лицевой стороной. Разрежьте по линиям." },
        { uk: "«Hot seat»: учень тягне картку й говорить 1 хвилину без зупинки. Група ставить два додаткові питання.", ru: "«Hot seat»: ученик тянет карточку и говорит 1 минуту без остановки. Группа задаёт два дополнительных вопроса." },
        { uk: "«Speed talk»: пари міняються кожні 2 хвилини, кожна пара бере нову картку.", ru: "«Speed talk»: пары меняются каждые 2 минуты, каждая пара берёт новую карточку." },
        { uk: "«Ask me»: учень ставить питання з картки сусідові, а потім сам відповідає на нього інакше.", ru: "«Ask me»: ученик задаёт вопрос с карточки соседу, а потом сам отвечает на него иначе." },
        { uk: "Слабшим учням дозволено перевернути картку й почати з підказки на звороті.", ru: "Более слабым ученикам разрешено перевернуть карточку и начать с подсказки на обороте." },
      ],
    },
    { tip: { uk: "Рахуйте не правильні відповіді, а секунди мовлення: мета набору в тому, щоб учні говорили довше й упевненіше.", ru: "Считайте не правильные ответы, а секунды речи: цель набора в том, чтобы ученики говорили дольше и увереннее." } },
    { pagebreak: true },
    ...CARD_TOPICS.flatMap((t, i): Block[] => {
      const b: Block[] = [
        { h: { uk: `${i + 1}. ${t.uk} (${LESSONS[i].topic})`, ru: `${i + 1}. ${t.ru} (${LESSONS[i].topic})` } },
        {
          cards: t.cards.map(([q, starter]) => ({
            front: q,
            back: { uk: `${t.uk}. Почни так: ${starter}`, ru: `${t.ru}. Начни так: ${starter}` },
          })),
        },
      ];
      if (i < CARD_TOPICS.length - 1) b.push({ pagebreak: true });
      return b;
    }),
  ],
};

// ---------- Перший урок з новим учнем ----------

const firstLesson: PrintDoc = {
  id: "first-lesson",
  title: { uk: "Перший урок з новим учнем", ru: "Первый урок с новым учеником" },
  subtitle: {
    uk: "План на 60 хвилин, питання для знайомства, усна перевірка рівня A1-B2, анкета потреб, цілі, план навчання й повідомлення батькам.",
    ru: "План на 60 минут, вопросы для знакомства, устная проверка уровня A1-B2, анкета потребностей, цели, план обучения и сообщение родителям.",
  },
  level: "A1-B2",
  blocks: [
    { h: { uk: "План уроку (60 хвилин)", ru: "План урока (60 минут)" } },
    {
      table: {
        head: [{ uk: "Хв", ru: "Мин" }, { uk: "Етап", ru: "Этап" }, { uk: "Що робити", ru: "Что делать" }],
        rows: [
          ["0-5", { uk: "Привітання", ru: "Приветствие" }, { uk: "Представтеся, розкажіть, як проходитиме урок. Зніміть напругу: «Сьогодні немає оцінок, ми просто знайомимося».", ru: "Представьтесь, расскажите, как пройдёт урок. Снимите напряжение: «Сегодня нет оценок, мы просто знакомимся»." }],
          ["5-15", { uk: "Знайомство", ru: "Знакомство" }, { uk: "5-7 питань зі списку для відповідного віку. Починайте англійською, переходьте на рідну мову, якщо учень губиться.", ru: "5-7 вопросов из списка для соответствующего возраста. Начинайте по-английски, переходите на родной язык, если ученик теряется." }],
          ["15-30", { uk: "Перевірка рівня", ru: "Проверка уровня" }, { uk: "Питання A1-B2 з таблиці. Рухайтеся вгору, доки учень відповідає впевнено; зупиніться на рівні, де з'являються паузи й помилки в базових формах.", ru: "Вопросы A1-B2 из таблицы. Двигайтесь вверх, пока ученик отвечает уверенно; остановитесь на уровне, где появляются паузы и ошибки в базовых формах." }],
          ["30-40", { uk: "Анкета потреб", ru: "Анкета потребностей" }, { uk: "Заповніть анкету разом (з дитиною молодшого віку можна з батьками).", ru: "Заполните анкету вместе (с младшим ребёнком можно с родителями)." }],
          ["40-50", { uk: "Пробна вправа", ru: "Пробное упражнение" }, { uk: "Коротка активність на виявленому рівні: гра для дітей, діалог для підлітків, рольова ситуація для дорослих. Учень має піти з відчуттям успіху.", ru: "Короткая активность на выявленном уровне: игра для детей, диалог для подростков, ролевая ситуация для взрослых. Ученик должен уйти с ощущением успеха." }],
          ["50-55", { uk: "Цілі", ru: "Цели" }, { uk: "Разом сформулюйте 1-3 цілі за шаблоном.", ru: "Вместе сформулируйте 1-3 цели по шаблону." }],
          ["55-60", { uk: "Підсумок", ru: "Итог" }, { uk: "Назвіть рівень простими словами, 2 сильні сторони й 1-2 зони росту. Домовтеся про розклад і перше домашнє завдання.", ru: "Назовите уровень простыми словами, 2 сильные стороны и 1-2 зоны роста. Договоритесь о расписании и первом домашнем задании." }],
        ],
      },
    },
    { tip: { uk: "Головна мета першого уроку не перевірити, а зацікавити. Хваліть конкретно: не «добре», а «ти правильно вжив минулий час».", ru: "Главная цель первого урока не проверить, а заинтересовать. Хвалите конкретно: не «хорошо», а «ты правильно употребил прошедшее время»." } },
    { h: { uk: "Чек-лист перед уроком", ru: "Чек-лист перед уроком" } },
    {
      check: [
        { uk: "Роздруковані анкета, шаблон цілей і план навчання", ru: "Распечатаны анкета, шаблон целей и план обучения" },
        { uk: "Підготовлено пробні вправи на 2 рівні (нижчий і вищий)", ru: "Подготовлены пробные упражнения на 2 уровня (ниже и выше)" },
        { uk: "Перевірено звук, камеру й посилання (для онлайн-уроку)", ru: "Проверены звук, камера и ссылка (для онлайн-урока)" },
        { uk: "Є картки або картинки для дітей", ru: "Есть карточки или картинки для детей" },
      ],
    },
    { pagebreak: true },

    { h: { uk: "Питання для знайомства", ru: "Вопросы для знакомства" } },
    { p: { uk: "Діти (6-10 років). Говоріть повільно, показуйте жестами, приймайте відповідь одним словом.", ru: "Дети (6-10 лет). Говорите медленно, показывайте жестами, принимайте ответ одним словом." } },
    {
      list: [
        "What's your name? How old are you?",
        "Have you got a brother or a sister?",
        "Have you got a pet? What's its name?",
        "What's your favourite colour?",
        "What do you like to play?",
        "What's your favourite food?",
        "Can you count to ten? Let's count together!",
        "What's your favourite cartoon?",
      ],
    },
    { p: { uk: "Підлітки (11-17 років). Цікавтеся їхнім світом, а не лише навчанням.", ru: "Подростки (11-17 лет). Интересуйтесь их миром, а не только учёбой." } },
    {
      list: [
        "What do you do in your free time?",
        "What music or games are you into right now?",
        "What's your favourite subject at school? And the most difficult one?",
        "Where do you use English outside school?",
        "Do you watch videos or series in English?",
        "What would you like to be able to do in English in a year?",
        "Have you ever been abroad? Would you like to study abroad?",
        "What was your best English lesson ever? Why?",
      ],
    },
    { p: { uk: "Дорослі. Тон партнерський, акцент на цілях і досвіді.", ru: "Взрослые. Тон партнёрский, акцент на целях и опыте." } },
    {
      list: [
        "Could you tell me a little about yourself?",
        "What do you do? Do you need English for work?",
        "How long have you been learning English?",
        "What has worked for you before, and what hasn't?",
        "In which situations do you feel uncomfortable speaking English?",
        "How much time a week can you spend on English?",
        "Do you prefer grammar explanations or lots of speaking practice?",
        "Imagine it's one year from now. What can you do in English?",
      ],
    },
    { pagebreak: true },

    { h: { uk: "Швидка усна перевірка рівня", ru: "Быстрая устная проверка уровня" } },
    { p: { uk: "Ставте питання по черзі, починаючи з A1. Якщо учень упевнено відповідає на 3 з 4 питань рівня, переходьте до наступного. Рівень учня: найвищий, на якому він відповідає зрозуміло і майже без пауз.", ru: "Задавайте вопросы по очереди, начиная с A1. Если ученик уверенно отвечает на 3 из 4 вопросов уровня, переходите к следующему. Уровень ученика: самый высокий, на котором он отвечает понятно и почти без пауз." } },
    {
      table: {
        head: [{ uk: "Рівень", ru: "Уровень" }, "Questions", { uk: "На що звертати увагу", ru: "На что обращать внимание" }],
        rows: [
          ["A1", "Where are you from? / What's in your bag? / What do you do every morning? / What can you see in this room?", { uk: "Відповідає словами або короткими фразами; знає to be, have got, базові слова; розуміє питання з першого разу.", ru: "Отвечает словами или короткими фразами; знает to be, have got, базовые слова; понимает вопрос с первого раза." }],
          ["A2", "What did you do last weekend? / Describe your home. / What are you going to do this summer? / What is your town like?", { uk: "Будує прості речення; вживає Past Simple (правильні й неправильні дієслова), going to; з'єднує ідеї через and, but, because.", ru: "Строит простые предложения; использует Past Simple (правильные и неправильные глаголы), going to; соединяет идеи через and, but, because." }],
          ["B1", "Have you ever had a funny or strange experience? / What would you do if you lost your phone? / What are the pros and cons of living in a big city? / Tell me about a film you liked and why.", { uk: "Розповідає історію з послідовністю подій; вживає Present Perfect, умовні речення, модальні дієслова; висловлює й пояснює думку.", ru: "Рассказывает историю с последовательностью событий; использует Present Perfect, условные предложения, модальные глаголы; высказывает и объясняет мнение." }],
          ["B2", "How has technology changed the way people learn? / If you could change one thing in the education system, what would it be? / Some people say tourism does more harm than good. What do you think? / Describe a difficult decision you had to make.", { uk: "Говорить розгорнуто 1-2 хв; аргументує й наводить приклади; вживає складні речення, пасив, слова-зв'язки (however, although, on the other hand); помилки рідкі й не заважають розумінню.", ru: "Говорит развёрнуто 1-2 мин; аргументирует и приводит примеры; использует сложные предложения, пассив, слова-связки (however, although, on the other hand); ошибки редкие и не мешают пониманию." }],
        ],
      },
    },
    { h: { uk: "Нотатки вчителя", ru: "Заметки учителя" } },
    {
      check: [
        { uk: "Розуміє питання без перекладу", ru: "Понимает вопросы без перевода" },
        { uk: "Відповідає повними реченнями", ru: "Отвечает полными предложениями" },
        { uk: "Правильно вживає минулий час", ru: "Правильно употребляет прошедшее время" },
        { uk: "Вимова не заважає розумінню", ru: "Произношение не мешает пониманию" },
        { uk: "Сам ставить питання вчителеві", ru: "Сам задаёт вопросы учителю" },
      ],
    },
    { p: { uk: "Орієнтовний рівень: ______   Сильні сторони: ____________________   Зони росту: ____________________", ru: "Ориентировочный уровень: ______   Сильные стороны: ____________________   Зоны роста: ____________________" } },
    { lines: 4 },
    { pagebreak: true },

    { h: { uk: "Анкета потреб учня", ru: "Анкета потребностей ученика" } },
    { p: { uk: "Ім'я учня: ____________________   Вік: ______   Дата: ____________", ru: "Имя ученика: ____________________   Возраст: ______   Дата: ____________" } },
    {
      table: {
        head: [{ uk: "Питання", ru: "Вопрос" }, { uk: "Відповідь", ru: "Ответ" }],
        rows: [
          [{ uk: "Навіщо вам (дитині) англійська? Школа, НМТ, робота, подорожі, переїзд, для себе", ru: "Зачем вам (ребёнку) английский? Школа, НМТ, работа, путешествия, переезд, для себя" }, ""],
          [{ uk: "Скільки років вивчаєте мову і де (школа, курси, самостійно)?", ru: "Сколько лет изучаете язык и где (школа, курсы, самостоятельно)?" }, ""],
          [{ uk: "Що дається найлегше: читання, слухання, письмо, говоріння?", ru: "Что даётся легче всего: чтение, аудирование, письмо, говорение?" }, ""],
          [{ uk: "Що дається найважче?", ru: "Что даётся тяжелее всего?" }, ""],
          [{ uk: "Чи є дедлайн (іспит, співбесіда, поїздка)? Коли?", ru: "Есть ли дедлайн (экзамен, собеседование, поездка)? Когда?" }, ""],
          [{ uk: "Скільки часу на тиждень готові приділяти домашнім завданням?", ru: "Сколько времени в неделю готовы уделять домашним заданиям?" }, ""],
          [{ uk: "Як вам легше запам'ятовувати: на слух, через картинки, записуючи, у русі?", ru: "Как вам легче запоминать: на слух, через картинки, записывая, в движении?" }, ""],
          [{ uk: "Які теми вам цікаві (спорт, ігри, мода, IT, кулінарія, кіно...)?", ru: "Какие темы вам интересны (спорт, игры, мода, IT, кулинария, кино...)?" }, ""],
          [{ uk: "Що не сподобалося в попередньому навчанні?", ru: "Что не понравилось в предыдущем обучении?" }, ""],
          [{ uk: "Зручний формат і час уроків (онлайн чи офлайн, дні тижня)", ru: "Удобный формат и время уроков (онлайн или офлайн, дни недели)" }, ""],
          [{ uk: "Як ви зрозумієте, що навчання успішне?", ru: "Как вы поймёте, что обучение успешное?" }, ""],
        ],
      },
    },
    { pagebreak: true },

    { h: { uk: "Шаблон цілей", ru: "Шаблон целей" } },
    { p: { uk: "Добра ціль конкретна, вимірювана й має строк. Не «покращити англійську», а «за 3 місяці вільно розповідати про свою роботу 2 хвилини без пауз».", ru: "Хорошая цель конкретная, измеримая и имеет срок. Не «улучшить английский», а «за 3 месяца свободно рассказывать о своей работе 2 минуты без пауз»." } },
    {
      table: {
        head: [{ uk: "Ціль", ru: "Цель" }, { uk: "До якої дати", ru: "К какой дате" }, { uk: "Як перевіримо", ru: "Как проверим" }, { uk: "Перший крок", ru: "Первый шаг" }],
        rows: [
          [{ uk: "Приклад: читати короткі історії англійською без словника", ru: "Пример: читать короткие истории на английском без словаря" }, { uk: "через 2 місяці", ru: "через 2 месяца" }, { uk: "прочитати історію на 1 сторінку й переказати", ru: "прочитать историю на 1 страницу и пересказать" }, { uk: "15 хв читання 3 рази на тиждень", ru: "15 мин чтения 3 раза в неделю" }],
          ["1.", "", "", ""],
          ["2.", "", "", ""],
          ["3.", "", "", ""],
        ],
      },
    },
    { h: { uk: "План навчання", ru: "План обучения" } },
    {
      table: {
        head: [{ uk: "Тиждень", ru: "Неделя" }, { uk: "Тема", ru: "Тема" }, { uk: "Граматика", ru: "Грамматика" }, { uk: "Лексика", ru: "Лексика" }, { uk: "Навички", ru: "Навыки" }, { uk: "Домашнє", ru: "Домашнее" }, { uk: "Готово", ru: "Готово" }],
        rows: [
          ["1", "", "", "", "", "", ""],
          ["2", "", "", "", "", "", ""],
          ["3", "", "", "", "", "", ""],
          ["4", "", "", "", "", "", ""],
          ["5", "", "", "", "", "", ""],
          ["6", "", "", "", "", "", ""],
          ["7", "", "", "", "", "", ""],
          ["8", { uk: "Повторення й міні-тест", ru: "Повторение и мини-тест" }, "", "", "", "", ""],
        ],
      },
    },
    { tip: { uk: "Кожні 8 тижнів повертайтеся до шаблону цілей: що досягнуто, що змінилося, яка ціль наступна.", ru: "Каждые 8 недель возвращайтесь к шаблону целей: что достигнуто, что изменилось, какая цель следующая." } },
    { pagebreak: true },

    { h: { uk: "Повідомлення батькам після першого уроку", ru: "Сообщение родителям после первого урока" } },
    { p: { uk: "Скопіюйте й заповніть дужки. Надсилайте в день уроку, поки враження свіжі.", ru: "Скопируйте и заполните скобки. Отправляйте в день урока, пока впечатления свежие." } },
    {
      p: {
        uk: "Добрий день, [ім'я батьків]! Дякую за перший урок з [ім'я дитини]. Ми познайомилися, поговорили англійською й виконали кілька завдань, щоб я зрозуміла (зрозумів) поточний рівень.",
        ru: "Добрый день, [имя родителя]! Спасибо за первый урок с [имя ребёнка]. Мы познакомились, поговорили по-английски и выполнили несколько заданий, чтобы я поняла (понял) текущий уровень.",
      },
    },
    {
      p: {
        uk: "Що вже добре виходить: [сильна сторона 1], [сильна сторона 2]. Над чим попрацюємо найближчим часом: [зона росту]. Орієнтовний рівень зараз: [рівень].",
        ru: "Что уже хорошо получается: [сильная сторона 1], [сильная сторона 2]. Над чем поработаем в ближайшее время: [зона роста]. Ориентировочный уровень сейчас: [уровень].",
      },
    },
    {
      p: {
        uk: "Мета на найближчі [кількість] місяці: [ціль]. Пропоную заняття [кількість] рази на тиждень, [дні й час]. Домашні завдання займатимуть 10-15 хвилин на день, і я надсилатиму короткий звіт раз на місяць.",
        ru: "Цель на ближайшие [количество] месяца: [цель]. Предлагаю занятия [количество] раза в неделю, [дни и время]. Домашние задания будут занимать 10-15 минут в день, и я буду присылать короткий отчёт раз в месяц.",
      },
    },
    {
      p: {
        uk: "Як підтримати вдома: попросіть [ім'я дитини] розповісти, що нового ми вивчили, і хваліть за спроби, а не лише за правильні відповіді. Якщо будуть питання, пишіть мені будь-коли. Гарного дня!",
        ru: "Как поддержать дома: попросите [имя ребёнка] рассказать, что нового мы выучили, и хвалите за попытки, а не только за правильные ответы. Если будут вопросы, пишите мне в любое время. Хорошего дня!",
      },
    },
    { h: { uk: "Коротка версія (для месенджера)", ru: "Короткая версия (для мессенджера)" } },
    {
      p: {
        uk: "Добрий день! Перший урок з [ім'я дитини] пройшов чудово. Рівень зараз [рівень], сильна сторона: [ ], працюємо над: [ ]. Пропоную [кількість] заняття на тиждень, [дні]. Підтвердіть, будь ласка, зручний час.",
        ru: "Добрый день! Первый урок с [имя ребёнка] прошёл отлично. Уровень сейчас [уровень], сильная сторона: [ ], работаем над: [ ]. Предлагаю [количество] занятия в неделю, [дни]. Подтвердите, пожалуйста, удобное время.",
      },
    },
    { lines: 5 },
  ],
};

export const TEACHERS: PrintDoc[] = [speakingClub, cardsDoc, firstLesson];
