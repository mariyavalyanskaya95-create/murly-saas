// SEO-тексти для сторінок міні-продуктів /shop/[id]: мета, вступ, «Для кого», «Як користуватися», FAQ
// і блок «Почни безкоштовно» з посиланнями на наші безкоштовні сторінки. Три мови, без довгих тире.
type L = { uk: string; ru: string; en: string };
type Faq = { q: L; a: L };
export type ShopSeo = { title: L; desc: L; intro: L; who: L[]; how: L[]; faq: Faq[]; free: string[] };

// Безкоштовні сторінки Murly, на які ведемо з продуктів (усі адреси існують у app/)
export const FREE_LINKS: Record<string, { label: L; note: L }> = {
  '/nmt/mock/1': { label: { uk: 'Пробний НМТ з англійської, варіант 1', ru: 'Пробный НМТ по английскому, вариант 1', en: 'NMT English mock test 1' }, note: { uk: '32 завдання, таймер і розбір кожної відповіді', ru: '32 задания, таймер и разбор каждого ответа', en: '32 questions, a timer and every answer explained' } },
  '/nmt/mock/2': { label: { uk: 'Пробний НМТ з англійської, варіант 2', ru: 'Пробный НМТ по английскому, вариант 2', en: 'NMT English mock test 2' }, note: { uk: 'ще один повний варіант у форматі іспиту', ru: 'ещё один полный вариант в формате экзамена', en: 'one more full test in the exam format' } },
  '/nmt/mock': { label: { uk: 'Усі пробні НМТ з англійської', ru: 'Все пробные НМТ по английскому', en: 'All NMT English mock tests' }, note: { uk: 'варіанти з поясненнями «Чому так?»', ru: 'варианты с объяснениями «Почему так?»', en: 'tests with «Why?» explanations' } },
  '/grammar': { label: { uk: 'Граматика англійської простими словами', ru: 'Грамматика английского простыми словами', en: 'English grammar made simple' }, note: { uk: 'усі теми від A1 до B2 з прикладами', ru: 'все темы от A1 до B2 с примерами', en: 'all topics from A1 to B2 with examples' } },
  '/grammar/trainer': { label: { uk: 'Тренажери граматики', ru: 'Тренажёры грамматики', en: 'Grammar trainers' }, note: { uk: 'по 100 завдань на тему з поясненнями', ru: 'по 100 заданий на тему с объяснениями', en: '100 tasks per topic with explanations' } },
  '/grammar/trainer/present-perfect': { label: { uk: 'Тренажер Present Perfect', ru: 'Тренажёр Present Perfect', en: 'Present Perfect trainer' }, note: { uk: 'найчастіша тема в тестах', ru: 'самая частая тема в тестах', en: 'the most tested tense' } },
  '/grammar/trainer/phrasal-verbs': { label: { uk: 'Тренажер фразових дієслів', ru: 'Тренажёр фразовых глаголов', en: 'Phrasal verbs trainer' }, note: { uk: 'значення і вправи онлайн', ru: 'значения и упражнения онлайн', en: 'meanings and online practice' } },
  '/irregular-verbs': { label: { uk: 'Таблиця неправильних дієслів', ru: 'Таблица неправильных глаголов', en: 'Irregular verbs table' }, note: { uk: 'три форми, переклад і вимова', ru: 'три формы, перевод и произношение', en: 'three forms, translation and audio' } },
  '/irregular-verbs/games': { label: { uk: 'Ігри з неправильними дієсловами', ru: 'Игры с неправильными глаголами', en: 'Irregular verb games' }, note: { uk: 'квіз, пари, анаграми', ru: 'квиз, пары, анаграммы', en: 'quiz, pairs, anagrams' } },
  '/bonus/verbs-30': { label: { uk: 'Дієслова за 30 днів онлайн', ru: 'Глаголы за 30 дней онлайн', en: 'Irregular verbs in 30 days online' }, note: { uk: 'гра на кожен день плану', ru: 'игра на каждый день плана', en: 'a game for every day of the plan' } },
  '/bonus/100-words': { label: { uk: '100 слів для НМТ: ігри та картки', ru: '100 слов для НМТ: игры и карточки', en: '100 NMT words: games and flashcards' }, note: { uk: '10 тем, квіз і анаграми', ru: '10 тем, квиз и анаграммы', en: '10 topics, quiz and anagrams' } },
  '/bonus/nmt-checklist': { label: { uk: 'НМТ-батл і сталі вирази', ru: 'НМТ-батл и устойчивые выражения', en: 'NMT battle and collocations' }, note: { uk: 'пропуски, make/do/take, хибні друзі', ru: 'пропуски, make/do/take, ложные друзья', en: 'gaps, make/do/take, false friends' } },
  '/level-test': { label: { uk: 'Тест на рівень англійської', ru: 'Тест на уровень английского', en: 'English level test' }, note: { uk: 'A1-C1 за 10 хвилин', ru: 'A1-C1 за 10 минут', en: 'A1-C1 in 10 minutes' } },
  '/tongue-twisters': { label: { uk: 'Скоромовки англійською', ru: 'Скороговорки на английском', en: 'English tongue twisters' }, note: { uk: 'для вимови і розминки', ru: 'для произношения и разминки', en: 'for pronunciation and warm-ups' } },
  '/learn/writing': { label: { uk: 'Writing: письмо англійською', ru: 'Writing: письмо на английском', en: 'Writing practice' }, note: { uk: 'завдання і зразки', ru: 'задания и образцы', en: 'tasks and models' } },
  '/activities': { label: { uk: 'Speaking-активності для уроків', ru: 'Speaking-активности для уроков', en: 'Speaking activities for lessons' }, note: { uk: 'слайди і PDF', ru: 'слайды и PDF', en: 'slides and PDF' } },
  '/lessons': { label: { uk: 'Готові уроки на 60 хвилин', ru: 'Готовые уроки на 60 минут', en: 'Ready 60-minute lessons' }, note: { uk: 'версія учня і вчителя', ru: 'версия ученика и учителя', en: 'student and teacher versions' } },
  '/games': { label: { uk: 'Ігри англійською для дітей', ru: 'Игры на английском для детей', en: 'English games for kids' }, note: { uk: 'квести, наліпки, 3D-містечко', ru: 'квесты, наклейки, 3D-городок', en: 'quests, stickers, a 3D town' } },
  '/play/stickers': { label: { uk: 'Make a room: гра з наліпками', ru: 'Make a room: игра с наклейками', en: 'Make a room: sticker game' }, note: { uk: 'слова про дім для A1', ru: 'слова про дом для A1', en: 'home words for A1' } },
  '/baby-english': { label: { uk: 'Англійська для малюків', ru: 'Английский для малышей', en: 'English for little ones' }, note: { uk: 'для батьків дітей до 7 років', ru: 'для родителей детей до 7 лет', en: 'for parents of kids under 7' } },
};

// Спільні питання
const Q_FILES: Faq = {
  q: { uk: 'Як я отримаю файли?', ru: 'Как я получу файлы?', en: 'How do I get the files?' },
  a: { uk: 'Залиш пошту у формі на цій сторінці. Онлайн-оплату ми саме підключаємо: надішлемо на пошту посилання на оплату, а після оплати одразу прийдуть файли PDF для друку. Купуєш один раз, без підписки.', ru: 'Оставь почту в форме на этой странице. Онлайн-оплату мы как раз подключаем: пришлём на почту ссылку на оплату, а после оплаты сразу придут файлы PDF для печати. Покупаешь один раз, без подписки.', en: 'Leave your email in the form on this page. We are connecting online payments right now: we will email you a payment link, and the printable PDF files arrive right after payment. One-time purchase, no subscription.' },
};
const Q_LANG: Faq = {
  q: { uk: 'Якою мовою пояснення?', ru: 'На каком языке объяснения?', en: 'What language are the explanations in?' },
  a: { uk: 'Є українська і російська версії: пояснення рідною мовою, приклади і вправи англійською.', ru: 'Есть украинская и русская версии: объяснения на родном языке, примеры и упражнения на английском.', en: 'There are Ukrainian and Russian versions: explanations in the native language, examples and exercises in English.' },
};
const Q_PRINT: Faq = {
  q: { uk: 'Можна друкувати кілька разів?', ru: 'Можно печатать несколько раз?', en: 'Can I print it more than once?' },
  a: { uk: 'Так. Файл лишається в тебе, тож можна друкувати сторінки стільки разів, скільки потрібно, або працювати з екрана.', ru: 'Да. Файл остаётся у тебя, поэтому страницы можно печатать столько раз, сколько нужно, или работать с экрана.', en: 'Yes. The file stays with you, so you can print pages as often as you need or use it on screen.' },
};
const Q_FREE_NMT: Faq = {
  q: { uk: 'Чи можна підготуватися до НМТ безкоштовно?', ru: 'Можно ли подготовиться к НМТ бесплатно?', en: 'Can I prepare for the NMT for free?' },
  a: { uk: 'Так. На Murly безкоштовно і без реєстрації є пробні НМТ з поясненнями (варіанти 1 і 2 безкоштовні завжди), граматика з тренажерами, таблиця неправильних дієслів і ігри зі словами. Матеріал для друку додає готовий план і зручну роботу офлайн.', ru: 'Да. На Murly бесплатно и без регистрации есть пробные НМТ с объяснениями (варианты 1 и 2 бесплатны всегда), грамматика с тренажёрами, таблица неправильных глаголов и игры со словами. Материал для печати добавляет готовый план и удобную работу офлайн.', en: 'Yes. Murly has free mock NMT tests with explanations (tests 1 and 2 are always free), grammar with trainers, an irregular verbs table and word games, no sign-up needed. The printable adds a ready plan and easy offline work.' },
};
const Q_FREE_GRAMMAR: Faq = {
  q: { uk: 'Чи є безкоштовна граматика онлайн?', ru: 'Есть ли бесплатная грамматика онлайн?', en: 'Is there free grammar practice online?' },
  a: { uk: 'Так. Усі теми граматики й тренажери по 100 завдань на Murly безкоштовні і без реєстрації. PDF зручний, коли хочеш усе в одному місці на папері.', ru: 'Да. Все темы грамматики и тренажёры по 100 заданий на Murly бесплатны и без регистрации. PDF удобен, когда хочешь всё в одном месте на бумаге.', en: 'Yes. All grammar topics and 100-task trainers on Murly are free with no sign-up. The PDF is handy when you want everything in one place on paper.' },
};

const NMT_FREE = ['/nmt/mock/1', '/nmt/mock/2', '/grammar/trainer', '/irregular-verbs'];

export const SHOP_SEO: Record<string, ShopSeo> = {
  'nmt-checklist': {
    title: { uk: 'Чек-лист підготовки до НМТ 2026 з англійської, PDF', ru: 'Чек-лист подготовки к НМТ 2026 по английскому, PDF', en: 'NMT 2026 English prep checklist: printable PDF' },
    desc: { uk: 'План підготовки до НМТ з англійської на 8 тижнів, стратегії для кожного типу завдань і чек-лист на день іспиту. PDF для друку.', ru: 'План подготовки к НМТ по английскому на 8 недель, стратегии для каждого типа заданий и чек-лист на день экзамена. PDF для печати.', en: 'An 8-week NMT English prep plan, strategies for every task type and an exam-day checklist. Printable PDF.' },
    intro: { uk: 'Чек-лист підготовки до НМТ з англійської показує, що робити кожного тижня, як працювати з оголошеннями, текстами й пропусками і що перевірити в день іспиту. Його зручно роздрукувати і відмічати виконане. Тренуватися паралельно можна на безкоштовних пробних НМТ на Murly.', ru: 'Чек-лист подготовки к НМТ по английскому показывает, что делать каждую неделю, как работать с объявлениями, текстами и пропусками и что проверить в день экзамена. Его удобно распечатать и отмечать сделанное. Тренироваться параллельно можно на бесплатных пробных НМТ на Murly.', en: 'The NMT English checklist shows what to do each week, how to handle notices, texts and gap fills, and what to check on exam day. It is easy to print and tick off. You can practise alongside on the free mock NMT tests on Murly.' },
    who: [
      { uk: 'Учням, які складають НМТ з англійської', ru: 'Ученикам, которые сдают НМТ по английскому', en: 'Students taking the NMT in English' },
      { uk: 'Тим, хто починає за 2-3 місяці до іспиту', ru: 'Тем, кто начинает за 2-3 месяца до экзамена', en: 'Anyone starting 2-3 months before the exam' },
      { uk: 'Батькам і репетиторам, яким потрібен чіткий план', ru: 'Родителям и репетиторам, которым нужен чёткий план', en: 'Parents and tutors who need a clear plan' },
    ],
    how: [
      { uk: 'Роздрукуй план на 8 тижнів і тримай його на видному місці', ru: 'Распечатай план на 8 недель и держи его на виду', en: 'Print the 8-week plan and keep it in sight' },
      { uk: 'Щотижня виконуй завдання і відмічай їх у чек-листі', ru: 'Каждую неделю выполняй задания и отмечай их в чек-листе', en: 'Do the tasks each week and tick them off' },
      { uk: 'Раз на тиждень проходь пробний НМТ на Murly і дивись, що повторити', ru: 'Раз в неделю проходи пробный НМТ на Murly и смотри, что повторить', en: 'Take a mock NMT on Murly once a week and see what to review' },
      { uk: 'Напередодні іспиту пройдися чек-листом на день НМТ', ru: 'Накануне экзамена пройдись по чек-листу на день НМТ', en: 'Go through the exam-day checklist the day before' },
    ],
    faq: [
      { q: { uk: 'Коли почати готуватися до НМТ з англійської?', ru: 'Когда начать готовиться к НМТ по английскому?', en: 'When should I start preparing for the NMT in English?' }, a: { uk: 'Найкомфортніше за 2-3 місяці: план розрахований на 8 тижнів. Якщо часу менше, проходь два тижні плану за один і частіше роби пробні тести.', ru: 'Комфортнее всего за 2-3 месяца: план рассчитан на 8 недель. Если времени меньше, проходи две недели плана за одну и чаще делай пробные тесты.', en: 'Ideally 2-3 months ahead: the plan covers 8 weeks. With less time, do two weeks of the plan in one and take mock tests more often.' } },
      Q_FREE_NMT,
      { q: { uk: 'Що дають стратегії для завдань?', ru: 'Что дают стратегии для заданий?', en: 'What do the task strategies give me?' }, a: { uk: 'Порядок дій для кожного типу завдань: як читати оголошення і тексти, як шукати пастки в пропусках і як розподілити час, щоб встигнути все.', ru: 'Порядок действий для каждого типа заданий: как читать объявления и тексты, как искать ловушки в пропусках и как распределить время, чтобы всё успеть.', en: 'A step-by-step approach for each task type: how to read notices and texts, how to spot traps in gap fills and how to manage your time.' } },
      Q_FILES,
      Q_LANG,
    ],
    free: [...NMT_FREE, '/bonus/nmt-checklist'],
  },
  'words-100': {
    title: { uk: '100 слів для НМТ з англійської: PDF для друку', ru: '100 слов для НМТ по английскому: PDF для печати', en: '100 key words for NMT 2026 English: printable PDF' },
    desc: { uk: '100 важливих слів для НМТ з англійської за 10 темами: переклад, приклади і тест на 40 завдань з ключами. PDF для друку, рівень B1-B2.', ru: '100 важных слов для НМТ по английскому по 10 темам: перевод, примеры и тест на 40 заданий с ключами. PDF для печати, уровень B1-B2.', en: '100 key words for the NMT English exam in 10 topics: translations, examples and a 40-item test with answers. Printable PDF, B1-B2.' },
    intro: { uk: 'Добірка зі 100 слів рівня B1-B2, які часто трапляються в текстах і завданнях НМТ, по 10 слів у кожній із 10 тем. До кожного слова переклад і приклад речення, а в кінці тест на 40 завдань з ключами. Ті самі слова можна безкоштовно тренувати в іграх на Murly.', ru: 'Подборка из 100 слов уровня B1-B2, которые часто встречаются в текстах и заданиях НМТ, по 10 слов в каждой из 10 тем. К каждому слову перевод и пример предложения, а в конце тест на 40 заданий с ключами. Те же слова можно бесплатно тренировать в играх на Murly.', en: 'A set of 100 B1-B2 words that often appear in NMT texts and tasks, 10 words in each of 10 topics. Every word has a translation and an example sentence, with a 40-item test and answers at the end. You can practise the same words for free in games on Murly.' },
    who: [
      { uk: 'Учням, яким бракує слів для текстів НМТ', ru: 'Ученикам, которым не хватает слов для текстов НМТ', en: 'Students who lack vocabulary for NMT texts' },
      { uk: 'Тим, хто вчить слова на картках і в дорозі', ru: 'Тем, кто учит слова на карточках и в дороге', en: 'Anyone who learns words with cards or on the go' },
      { uk: 'Репетиторам для домашніх завдань', ru: 'Репетиторам для домашних заданий', en: 'Tutors who need homework material' },
    ],
    how: [
      { uk: 'Бери одну тему на 2-3 дні: 10 слів з прикладами', ru: 'Бери одну тему на 2-3 дня: 10 слов с примерами', en: 'Take one topic every 2-3 days: 10 words with examples' },
      { uk: 'Закріплюй слова в іграх на Murly: квіз, пари, анаграми', ru: 'Закрепляй слова в играх на Murly: квиз, пары, анаграммы', en: 'Practise them in Murly games: quiz, pairs, anagrams' },
      { uk: 'Після всіх тем пройди тест на 40 завдань і звір з ключами', ru: 'После всех тем пройди тест на 40 заданий и сверь с ключами', en: 'After all topics, take the 40-item test and check the answers' },
    ],
    faq: [
      { q: { uk: 'Скільки слів треба знати для НМТ з англійської?', ru: 'Сколько слов нужно знать для НМТ по английскому?', en: 'How many words do I need for the NMT in English?' }, a: { uk: 'Для впевненого результату потрібен активний словник рівня B1 і більше. Ця добірка не замінює весь словник, а закриває 100 слів, які часто зустрічаються в текстах і пропусках.', ru: 'Для уверенного результата нужен активный словарь уровня B1 и выше. Эта подборка не заменяет весь словарь, а закрывает 100 слов, которые часто встречаются в текстах и пропусках.', en: 'For a confident result you need an active B1+ vocabulary. This set does not replace it, it covers 100 words that often appear in texts and gap fills.' } },
      { q: { uk: 'Де безкоштовно потренувати ці слова?', ru: 'Где бесплатно потренировать эти слова?', en: 'Where can I practise these words for free?' }, a: { uk: 'На сторінці «100 слів для НМТ» на Murly: ігри по кожній темі, картки і режим «навпаки». Без реєстрації.', ru: 'На странице «100 слов для НМТ» на Murly: игры по каждой теме, карточки и режим «наоборот». Без регистрации.', en: 'On the «100 NMT words» page on Murly: games for every topic, flashcards and a reverse mode. No sign-up.' } },
      Q_FREE_NMT,
      Q_FILES,
    ],
    free: ['/bonus/100-words', '/nmt/mock/1', '/nmt/mock/2', '/bonus/nmt-checklist'],
  },
  'verbs-30': {
    title: { uk: 'Неправильні дієслова: картки і план на 30 днів, PDF', ru: 'Неправильные глаголы: карточки и план на 30 дней, PDF', en: 'Irregular verbs: 30-day plan and printable cards' },
    desc: { uk: 'Неправильні дієслова англійської за 30 днів: 150 карток для вирізання, по 5 дієслів на день і щотижневі тести. PDF для друку.', ru: 'Неправильные глаголы английского за 30 дней: 150 карточек для вырезания, по 5 глаголов в день и еженедельные тесты. PDF для печати.', en: 'English irregular verbs in 30 days: 150 cut-out cards, 5 verbs a day and weekly tests. Printable PDF.' },
    intro: { uk: 'План, щоб вивчити неправильні дієслова англійської без зубріння таблиці: по 5 дієслів на день, міні-перевірка щодня і тест наприкінці тижня. Картки для вирізання повторюють порядок плану. Таблицю з вимовою та ігри на кожен день можна відкрити на Murly безкоштовно.', ru: 'План, чтобы выучить неправильные глаголы английского без зубрёжки таблицы: по 5 глаголов в день, мини-проверка каждый день и тест в конце недели. Карточки для вырезания повторяют порядок плана. Таблицу с произношением и игры на каждый день можно открыть на Murly бесплатно.', en: 'A plan to learn English irregular verbs without cramming the table: 5 verbs a day, a daily mini check and a test at the end of each week. The cut-out cards follow the plan order. The table with audio and a game for every day are free on Murly.' },
    who: [
      { uk: 'Школярам і учням, які готуються до НМТ', ru: 'Школьникам и ученикам, которые готовятся к НМТ', en: 'School students and NMT candidates' },
      { uk: 'Дорослим, які хочуть нарешті запам’ятати три форми', ru: 'Взрослым, которые хотят наконец запомнить три формы', en: 'Adults who want to finally learn all three forms' },
      { uk: 'Вчителям для роботи з картками на уроці', ru: 'Учителям для работы с карточками на уроке', en: 'Teachers who use cards in class' },
    ],
    how: [
      { uk: 'Роздрукуй і виріж картки, відклади набір на перший тиждень', ru: 'Распечатай и вырежи карточки, отложи набор на первую неделю', en: 'Print and cut the cards, set aside the first week' },
      { uk: 'Щодня вчи 5 дієслів і проходь міні-перевірку', ru: 'Каждый день учи 5 глаголов и проходи мини-проверку', en: 'Learn 5 verbs a day and do the mini check' },
      { uk: 'Грай з дієсловами дня на Murly, щоб почути вимову', ru: 'Играй с глаголами дня на Murly, чтобы услышать произношение', en: 'Play with the day’s verbs on Murly to hear them' },
      { uk: 'У кінці тижня пиши тест і повторюй картки з помилками', ru: 'В конце недели пиши тест и повторяй карточки с ошибками', en: 'Take the weekly test and review the cards you missed' },
    ],
    faq: [
      { q: { uk: 'Скільки неправильних дієслів треба знати?', ru: 'Сколько неправильных глаголов нужно знать?', en: 'How many irregular verbs do I need to know?' }, a: { uk: 'Для школи і НМТ вистачає приблизно 150 найуживаніших. Саме стільки карток у наборі: за 30 днів по 5 на день.', ru: 'Для школы и НМТ хватает примерно 150 самых употребительных. Именно столько карточек в наборе: за 30 дней по 5 в день.', en: 'For school and the NMT about 150 of the most common ones are enough. That is exactly the number of cards: 5 a day for 30 days.' } },
      { q: { uk: 'Де безкоштовна таблиця неправильних дієслів?', ru: 'Где бесплатная таблица неправильных глаголов?', en: 'Where is the free irregular verbs table?' }, a: { uk: 'На Murly: таблиця за алфавітом з перекладом і озвучкою кожної форми, а також ігри квіз, пари й анаграми. Без реєстрації.', ru: 'На Murly: таблица по алфавиту с переводом и озвучкой каждой формы, а также игры квиз, пары и анаграммы. Без регистрации.', en: 'On Murly: an alphabetical table with translations and audio for every form, plus quiz, pairs and anagram games. No sign-up.' } },
      Q_PRINT,
      Q_FILES,
    ],
    free: ['/irregular-verbs', '/irregular-verbs/games', '/bonus/verbs-30', '/grammar/trainer'],
  },
  'grammar-a1b1': {
    title: { uk: 'Уся базова граматика англійської A1-B1: PDF для друку', ru: 'Вся базовая грамматика английского A1-B1: PDF для печати', en: 'All basic English grammar A1-B1: printable PDF' },
    desc: { uk: 'Граматика англійської для початківців і до НМТ: правила простими словами, приклади, типові помилки і вправи з ключами. PDF A1-B1.', ru: 'Грамматика английского для начинающих и к НМТ: правила простыми словами, примеры, типичные ошибки и упражнения с ключами. PDF A1-B1.', en: 'English grammar for beginners and NMT prep: simple rules, examples, common mistakes and exercises with answers. A1-B1 PDF.' },
    intro: { uk: 'Уся базова граматика англійської від A1 до B1 в одному файлі: 10 ключових тем, серед них основні часи, майбутній час, артиклі, ступені порівняння, умовні речення і пасив. До кожної теми правило простими словами, приклади, типові помилки і вправи з ключами. Кожну тему можна ще й безкоштовно потренувати онлайн на Murly.', ru: 'Вся базовая грамматика английского от A1 до B1 в одном файле: 10 ключевых тем, среди них основные времена, будущее время, артикли, степени сравнения, условные предложения и пассив. К каждой теме правило простыми словами, примеры, типичные ошибки и упражнения с ключами. Каждую тему можно ещё и бесплатно потренировать онлайн на Murly.', en: 'All basic English grammar from A1 to B1 in one file: 10 key topics, including the main tenses, the future, articles, comparatives, conditionals and the passive. Every topic has a simple rule, examples, common mistakes and exercises with answers. You can also practise each topic online for free on Murly.' },
    who: [
      { uk: 'Тим, хто починає англійську з нуля або повертається до неї', ru: 'Тем, кто начинает английский с нуля или возвращается к нему', en: 'Beginners and anyone coming back to English' },
      { uk: 'Учням, які готуються до НМТ', ru: 'Ученикам, которые готовятся к НМТ', en: 'Students preparing for the NMT' },
      { uk: 'Вчителям і репетиторам як роздатка до уроків', ru: 'Учителям и репетиторам как раздатка к урокам', en: 'Teachers and tutors who need handouts' },
    ],
    how: [
      { uk: 'Іди за темами по порядку або обери ту, що потрібна зараз', ru: 'Иди по темам по порядку или выбери ту, что нужна сейчас', en: 'Go through the topics in order or pick the one you need' },
      { uk: 'Прочитай правило і приклади, зверни увагу на типові помилки', ru: 'Прочитай правило и примеры, обрати внимание на типичные ошибки', en: 'Read the rule and examples, note the common mistakes' },
      { uk: 'Зроби вправи і перевір себе за ключами', ru: 'Сделай упражнения и проверь себя по ключам', en: 'Do the exercises and check with the answer key' },
      { uk: 'Закріпи тему в тренажері на Murly: 100 завдань з поясненнями', ru: 'Закрепи тему в тренажёре на Murly: 100 заданий с объяснениями', en: 'Reinforce it in a Murly trainer: 100 tasks with explanations' },
    ],
    faq: [
      { q: { uk: 'З чого почати вивчення граматики англійської?', ru: 'С чего начать изучение грамматики английского?', en: 'Where should I start with English grammar?' }, a: { uk: 'З Present Simple, Present Continuous і артиклів (рівень A1), потім Past Simple і майбутній час (A2). У файлі біля кожної теми позначено рівень, тож легко йти від простого до складного.', ru: 'С Present Simple, Present Continuous и артиклей (уровень A1), потом Past Simple и будущее время (A2). В файле у каждой темы указан уровень, поэтому легко идти от простого к сложному.', en: 'Start with Present Simple, Present Continuous and articles (A1), then Past Simple and the future (A2). Every topic in the file is marked with its level, so it is easy to go from simple to harder.' } },
      { q: { uk: 'Чи вистачить граматики A1-B1 для НМТ?', ru: 'Хватит ли грамматики A1-B1 для НМТ?', en: 'Is A1-B1 grammar enough for the NMT?' }, a: { uk: 'Це основа, на якій тримаються більшість завдань НМТ. Для високого балу варто додати теми B2, вони є в безкоштовних тренажерах на Murly.', ru: 'Это основа, на которой держится большинство заданий НМТ. Для высокого балла стоит добавить темы B2, они есть в бесплатных тренажёрах на Murly.', en: 'It is the base most NMT tasks rely on. For a high score, add B2 topics: they are in the free trainers on Murly.' } },
      Q_FREE_GRAMMAR,
      Q_LANG,
      Q_FILES,
    ],
    free: ['/grammar', '/grammar/trainer', '/grammar/trainer/present-perfect', '/level-test'],
  },
  tenses: {
    title: { uk: 'Усі 12 часів англійської мови: таблиця на 2 сторінки', ru: 'Все 12 времён английского языка: таблица на 2 страницы', en: 'All 12 English tenses: a 2-page printable chart' },
    desc: { uk: 'Часи англійської мови в таблиці: формули, коли вживати, слова-маркери, приклади і 10 типових помилок. PDF для друку на 2 сторінки.', ru: 'Времена английского языка в таблице: формулы, когда употреблять, слова-маркеры, примеры и 10 типичных ошибок. PDF для печати на 2 страницы.', en: 'English tenses in one chart: formulas, when to use them, time markers, examples and 10 common mistakes. 2-page printable PDF.' },
    intro: { uk: 'Таблиця часів англійської мови, яку зручно тримати біля себе під час домашки чи підготовки до НМТ. Для кожного з 12 часів формула, коли вживати, слова-маркери і приклад, а окремо 10 помилок, які роблять найчастіше. Тренувати часи можна безкоштовно в тренажерах на Murly.', ru: 'Таблица времён английского языка, которую удобно держать рядом во время домашки или подготовки к НМТ. Для каждого из 12 времён формула, когда употреблять, слова-маркеры и пример, а отдельно 10 ошибок, которые делают чаще всего. Тренировать времена можно бесплатно в тренажёрах на Murly.', en: 'A chart of English tenses to keep next to you while doing homework or preparing for the NMT. Each of the 12 tenses has a formula, uses, time markers and an example, plus the 10 most common mistakes. You can practise tenses for free in the Murly trainers.' },
    who: [
      { uk: 'Учням, які плутають часи', ru: 'Ученикам, которые путают времена', en: 'Students who mix up tenses' },
      { uk: 'Тим, хто повторює граматику перед НМТ', ru: 'Тем, кто повторяет грамматику перед НМТ', en: 'Anyone reviewing grammar before the NMT' },
      { uk: 'Дорослим, яким потрібна коротка шпаргалка', ru: 'Взрослым, которым нужна короткая шпаргалка', en: 'Adults who want a short cheat sheet' },
    ],
    how: [
      { uk: 'Роздрукуй 2 сторінки і тримай поруч під час домашки', ru: 'Распечатай 2 страницы и держи рядом во время домашки', en: 'Print the 2 pages and keep them nearby' },
      { uk: 'Шукай час за словом-маркером у реченні', ru: 'Ищи время по слову-маркеру в предложении', en: 'Find the tense by the time marker in the sentence' },
      { uk: 'Перед тестом перечитай 10 типових помилок', ru: 'Перед тестом перечитай 10 типичных ошибок', en: 'Reread the 10 common mistakes before a test' },
      { uk: 'Тренуй кожен час у безкоштовному тренажері на Murly', ru: 'Тренируй каждое время в бесплатном тренажёре на Murly', en: 'Practise each tense in a free Murly trainer' },
    ],
    faq: [
      { q: { uk: 'Скільки часів в англійській мові?', ru: 'Сколько времён в английском языке?', en: 'How many tenses are there in English?' }, a: { uk: 'Зазвичай говорять про 12: по чотири види (Simple, Continuous, Perfect, Perfect Continuous) у теперішньому, минулому і майбутньому. У щоденній мові найчастіше вистачає 5-6 з них.', ru: 'Обычно говорят о 12: по четыре вида (Simple, Continuous, Perfect, Perfect Continuous) в настоящем, прошедшем и будущем. В повседневной речи чаще всего хватает 5-6 из них.', en: 'Usually 12: four aspects (Simple, Continuous, Perfect, Perfect Continuous) in the present, past and future. In everyday English 5-6 of them cover most needs.' } },
      { q: { uk: 'Як швидко запам’ятати часи англійської?', ru: 'Как быстро запомнить времена английского?', en: 'How can I learn English tenses quickly?' }, a: { uk: 'Запам’ятай формулу і слова-маркери, а потім тренуй на коротких реченнях. На Murly для кожного часу є тренажер на 100 завдань з поясненням кожної відповіді.', ru: 'Запомни формулу и слова-маркеры, а потом тренируй на коротких предложениях. На Murly для каждого времени есть тренажёр на 100 заданий с объяснением каждого ответа.', en: 'Learn the formula and time markers, then practise on short sentences. Murly has a 100-task trainer for each tense with every answer explained.' } },
      Q_FREE_GRAMMAR,
      Q_FILES,
    ],
    free: ['/grammar/trainer', '/grammar/trainer/present-perfect', '/grammar', '/nmt/mock/1'],
  },
  'phrasal-60': {
    title: { uk: '60 фразових дієслів англійської: PDF з вправами', ru: '60 фразовых глаголов английского: PDF с упражнениями', en: '60 English phrasal verbs: printable PDF with exercises' },
    desc: { uk: '60 найуживаніших фразових дієслів англійської: значення, приклади і вправа на 20 завдань з ключами. PDF для друку, корисно для НМТ.', ru: '60 самых употребительных фразовых глаголов английского: значения, примеры и упражнение на 20 заданий с ключами. PDF для печати.', en: '60 common English phrasal verbs: meanings, examples and a 20-item exercise with answers. Printable PDF, useful for the NMT.' },
    intro: { uk: 'Фразові дієслова часто трапляються в текстах і пропусках НМТ, а в живій мові без них ніяк. У файлі 60 найуживаніших з перекладом і прикладами та вправа на 20 завдань з ключами. Безкоштовний тренажер фразових дієслів є на Murly.', ru: 'Фразовые глаголы часто встречаются в текстах и пропусках НМТ, а в живой речи без них никак. В файле 60 самых употребительных с переводом и примерами и упражнение на 20 заданий с ключами. Бесплатный тренажёр фразовых глаголов есть на Murly.', en: 'Phrasal verbs often appear in NMT texts and gap fills, and real-life English is full of them. The file has the 60 most common ones with translations and examples, plus a 20-item exercise with answers. A free phrasal verbs trainer is on Murly.' },
    who: [
      { uk: 'Учням рівня A2-B2 і тим, хто готується до НМТ', ru: 'Ученикам уровня A2-B2 и тем, кто готовится к НМТ', en: 'A2-B2 learners and NMT candidates' },
      { uk: 'Дорослим, які хочуть звучати природніше', ru: 'Взрослым, которые хотят звучать естественнее', en: 'Adults who want to sound more natural' },
      { uk: 'Вчителям для повторення лексики', ru: 'Учителям для повторения лексики', en: 'Teachers reviewing vocabulary' },
    ],
    how: [
      { uk: 'Вчи по 6-10 дієслів за раз разом із прикладами', ru: 'Учи по 6-10 глаголов за раз вместе с примерами', en: 'Learn 6-10 verbs at a time with the examples' },
      { uk: 'Склади власне речення з кожним дієсловом', ru: 'Составь своё предложение с каждым глаголом', en: 'Write your own sentence with each verb' },
      { uk: 'Зроби вправу на 20 завдань і звір з ключами', ru: 'Сделай упражнение на 20 заданий и сверь с ключами', en: 'Do the 20-item exercise and check the answers' },
    ],
    faq: [
      { q: { uk: 'Що таке фразові дієслова?', ru: 'Что такое фразовые глаголы?', en: 'What are phrasal verbs?' }, a: { uk: 'Дієслово плюс частка або прийменник, які разом мають нове значення: give up (кинути), look after (доглядати), find out (дізнатися).', ru: 'Глагол плюс частица или предлог, которые вместе имеют новое значение: give up (бросить), look after (присматривать), find out (узнать).', en: 'A verb plus a particle or preposition with a new meaning together: give up, look after, find out.' } },
      { q: { uk: 'Де безкоштовно потренувати фразові дієслова?', ru: 'Где бесплатно потренировать фразовые глаголы?', en: 'Where can I practise phrasal verbs for free?' }, a: { uk: 'У тренажері фразових дієслів на Murly: коротка теорія і завдання з поясненнями, без реєстрації.', ru: 'В тренажёре фразовых глаголов на Murly: короткая теория и задания с объяснениями, без регистрации.', en: 'In the Murly phrasal verbs trainer: short theory and tasks with explanations, no sign-up.' } },
      Q_PRINT,
      Q_FILES,
    ],
    free: ['/grammar/trainer/phrasal-verbs', '/grammar/trainer', '/nmt/mock/1', '/irregular-verbs'],
  },
  writing: {
    title: { uk: 'Шаблони для письма англійською: лист і есе, PDF', ru: 'Шаблоны для письма на английском: письмо и эссе, PDF', en: 'English writing templates: letter and essay PDF' },
    desc: { uk: 'Як написати лист другу й есе-думку англійською: структура, фрази-зв’язки, зразки і чек-лист самоперевірки. PDF для друку.', ru: 'Как написать письмо другу и эссе-мнение на английском: структура, связки, образцы и чек-лист самопроверки. PDF для печати.', en: 'How to write a letter to a friend and an opinion paragraph in English: structure, linkers, models and a self-check. Printable PDF.' },
    intro: { uk: 'Готові шаблони для двох найпоширеніших форматів письма в школі: лист другу й есе-думка. Структура по абзацах, слова-зв’язки, корисні фрази, зразки і чек-лист, за яким легко перевірити свій текст. Безкоштовні завдання на письмо є в розділі Writing на Murly.', ru: 'Готовые шаблоны для двух самых частых форматов письма в школе: письмо другу и эссе-мнение. Структура по абзацам, слова-связки, полезные фразы, образцы и чек-лист, по которому легко проверить свой текст. Бесплатные задания на письмо есть в разделе Writing на Murly.', en: 'Ready templates for the two most common school writing formats: a letter to a friend and an opinion paragraph. Paragraph structure, linkers, useful phrases, models and a checklist to review your text. Free writing tasks are in the Writing section on Murly.' },
    who: [
      { uk: 'Школярам, яким задають листи та есе', ru: 'Школьникам, которым задают письма и эссе', en: 'School students who write letters and essays' },
      { uk: 'Тим, хто не знає, з чого почати текст', ru: 'Тем, кто не знает, с чего начать текст', en: 'Anyone who does not know how to start' },
      { uk: 'Вчителям для пояснення структури', ru: 'Учителям для объяснения структуры', en: 'Teachers explaining text structure' },
    ],
    how: [
      { uk: 'Обери формат і подивись зразок', ru: 'Выбери формат и посмотри образец', en: 'Pick a format and read the model' },
      { uk: 'Напиши свій текст за структурою, використовуючи фрази-зв’язки', ru: 'Напиши свой текст по структуре, используя связки', en: 'Write your text following the structure and linkers' },
      { uk: 'Перевір текст за чек-листом самоперевірки', ru: 'Проверь текст по чек-листу самопроверки', en: 'Check it with the self-check list' },
    ],
    faq: [
      { q: { uk: 'Як почати лист другу англійською?', ru: 'Как начать письмо другу на английском?', en: 'How do I start a letter to a friend in English?' }, a: { uk: 'Привітання (Dear Sam, / Hi Sam,), подяка за лист або коротке питання, як справи, а далі відповідь на головне питання. У шаблоні є готові фрази для кожного абзацу.', ru: 'Приветствие (Dear Sam, / Hi Sam,), благодарность за письмо или короткий вопрос, как дела, а дальше ответ на главный вопрос. В шаблоне есть готовые фразы для каждого абзаца.', en: 'A greeting (Dear Sam, / Hi Sam,), thanks for their letter or a quick how are you, then the main point. The template has ready phrases for every paragraph.' } },
      { q: { uk: 'Чи є безкоштовні вправи на письмо?', ru: 'Есть ли бесплатные упражнения на письмо?', en: 'Are there free writing exercises?' }, a: { uk: 'Так, у розділі Writing на Murly. А слова-зв’язки можна потренувати в безкоштовних іграх до НМТ.', ru: 'Да, в разделе Writing на Murly. А слова-связки можно потренировать в бесплатных играх к НМТ.', en: 'Yes, in the Writing section on Murly. You can also practise linking words in the free NMT games.' } },
      Q_LANG,
      Q_FILES,
    ],
    free: ['/learn/writing', '/bonus/nmt-checklist', '/grammar/trainer', '/level-test'],
  },
  'kids-pack': {
    title: { uk: 'Англійська для дітей: картки й ігри для друку A1-A2', ru: 'Английский для детей: карточки и игры для печати A1-A2', en: 'English for kids: printable cards and games A1-A2' },
    desc: { uk: '60 карток для розмови і 6 ігор англійською для дітей: бінго, мемо, гра-ходилка та інші. A1-A2, PDF для друку вдома чи на уроці.', ru: '60 карточек для разговора и 6 игр на английском для детей: бинго, мемо, игра-бродилка и другие. A1-A2, PDF для печати.', en: '60 speaking cards and 6 English games for kids: bingo, memory, a board game and more. A1-A2 printable PDF for home or class.' },
    intro: { uk: 'Набір для занять англійською з дітьми вдома або на уроці: 60 карток з питаннями для розмови і 6 ігор для друку, зокрема бінго, мемо і гра-ходилка. Рівень A1-A2, підходить для дітей молодшого шкільного віку. Онлайн-ігри англійською для дітей на Murly безкоштовні.', ru: 'Набор для занятий английским с детьми дома или на уроке: 60 карточек с вопросами для разговора и 6 игр для печати, в том числе бинго, мемо и игра-бродилка. Уровень A1-A2, подходит для детей младшего школьного возраста. Онлайн-игры на английском для детей на Murly бесплатные.', en: 'A set for English with kids at home or in class: 60 speaking question cards and 6 printable games, including bingo, memory and a board game. Level A1-A2, for primary-school kids. The online English games for kids on Murly are free.' },
    who: [
      { uk: 'Батькам, які займаються з дитиною вдома', ru: 'Родителям, которые занимаются с ребёнком дома', en: 'Parents who practise with their child at home' },
      { uk: 'Вчителям молодших класів і репетиторам', ru: 'Учителям младших классов и репетиторам', en: 'Primary teachers and tutors' },
      { uk: 'Для мінігруп і розмовних клубів для дітей', ru: 'Для мини-групп и разговорных клубов для детей', en: 'Small groups and kids’ speaking clubs' },
    ],
    how: [
      { uk: 'Роздрукуй картки й ігри, за бажанням заламінуй', ru: 'Распечатай карточки и игры, по желанию заламинируй', en: 'Print the cards and games, laminate if you like' },
      { uk: 'Почни заняття з 3-5 карток для розмови', ru: 'Начни занятие с 3-5 карточек для разговора', en: 'Start a session with 3-5 speaking cards' },
      { uk: 'Закінчи грою: бінго, мемо або ходилкою', ru: 'Закончи игрой: бинго, мемо или бродилкой', en: 'End with a game: bingo, memory or the board game' },
    ],
    faq: [
      { q: { uk: 'З якого віку підходять картки?', ru: 'С какого возраста подходят карточки?', en: 'What age are the cards for?' }, a: { uk: 'Для дітей, які вже знають перші слова і прості фрази (A1-A2), зазвичай 6-11 років. Для малюків до 7 років на Murly є окрема безкоштовна сторінка для батьків.', ru: 'Для детей, которые уже знают первые слова и простые фразы (A1-A2), обычно 6-11 лет. Для малышей до 7 лет на Murly есть отдельная бесплатная страница для родителей.', en: 'For kids who already know first words and simple phrases (A1-A2), usually 6-11. For kids under 7 Murly has a separate free page for parents.' } },
      { q: { uk: 'Чи є безкоштовні ігри англійською для дітей?', ru: 'Есть ли бесплатные игры на английском для детей?', en: 'Are there free English games for kids?' }, a: { uk: 'Так, на Murly: квест «Знайди, Бульбашко!», гра з наліпками, словесні ігри і 3D-містечко. Їх можна відкрити без реєстрації.', ru: 'Да, на Murly: квест «Найди, Бульбашка!», игра с наклейками, словесные игры и 3D-городок. Их можно открыть без регистрации.', en: 'Yes, on Murly: the «Find it, Bubbles!» quest, a sticker game, word games and a 3D town. You can open them without signing up.' } },
      Q_PRINT,
      Q_FILES,
    ],
    free: ['/games', '/play/stickers', '/tongue-twisters', '/baby-english'],
  },
  'nmt-start': {
    title: { uk: 'Старт до НМТ 2026 з англійської: 3 в 1, PDF для друку', ru: 'Старт к НМТ 2026 по английскому: 3 в 1, PDF для печати', en: 'NMT 2026 English starter pack: 3 in 1 printable PDF' },
    desc: { uk: 'Чек-лист підготовки до НМТ, 100 важливих слів і неправильні дієслова за 30 днів в одному наборі. PDF для друку дешевше, ніж окремо.', ru: 'Чек-лист подготовки к НМТ, 100 важных слов и неправильные глаголы за 30 дней в одном наборе. PDF для печати дешевле, чем по отдельности.', en: 'The NMT prep checklist, 100 key words and 30-day irregular verbs in one pack. Printable PDF, cheaper than buying separately.' },
    intro: { uk: 'Стартовий набір для підготовки до НМТ з англійської: план на 8 тижнів зі стратегіями, 100 важливих слів з тестом і неправильні дієслова з картками та планом на 30 днів. Три матеріали разом коштують дешевше, ніж окремо. До кожного є безкоштовні ігри на Murly, а тренуватися у форматі іспиту можна на пробних НМТ.', ru: 'Стартовый набор для подготовки к НМТ по английскому: план на 8 недель со стратегиями, 100 важных слов с тестом и неправильные глаголы с карточками и планом на 30 дней. Три материала вместе стоят дешевле, чем по отдельности. К каждому есть бесплатные игры на Murly, а тренироваться в формате экзамена можно на пробных НМТ.', en: 'A starter pack for the NMT in English: an 8-week plan with strategies, 100 key words with a test and irregular verbs with cards and a 30-day plan. The three materials together cost less than separately. Each has free games on Murly, and you can practise in the exam format with the mock NMT tests.' },
    who: [
      { uk: 'Учням, які тільки починають готуватися до НМТ', ru: 'Ученикам, которые только начинают готовиться к НМТ', en: 'Students just starting NMT prep' },
      { uk: 'Тим, хто хоче план, слова і дієслова в одному місці', ru: 'Тем, кто хочет план, слова и глаголы в одном месте', en: 'Anyone who wants the plan, words and verbs together' },
      { uk: 'Батькам, які шукають зрозумілий старт для дитини', ru: 'Родителям, которые ищут понятный старт для ребёнка', en: 'Parents looking for a clear start for their child' },
    ],
    how: [
      { uk: 'Почни з плану на 8 тижнів: він підкаже, що робити щодня', ru: 'Начни с плана на 8 недель: он подскажет, что делать каждый день', en: 'Start with the 8-week plan: it shows what to do each day' },
      { uk: 'Паралельно вчи по 5 неправильних дієслів на день', ru: 'Параллельно учи по 5 неправильных глаголов в день', en: 'Learn 5 irregular verbs a day alongside' },
      { uk: 'Додавай одну тему зі 100 слів кожні 2-3 дні', ru: 'Добавляй одну тему из 100 слов каждые 2-3 дня', en: 'Add one topic from the 100 words every 2-3 days' },
      { uk: 'Раз на тиждень проходь пробний НМТ на Murly', ru: 'Раз в неделю проходи пробный НМТ на Murly', en: 'Take a mock NMT on Murly once a week' },
    ],
    faq: [
      { q: { uk: 'Що входить у набір «Старт до НМТ»?', ru: 'Что входит в набор «Старт к НМТ»?', en: 'What is in the NMT starter pack?' }, a: { uk: 'Чек-лист підготовки (план на 8 тижнів і стратегії), 100 важливих слів з тестом на 40 завдань і неправильні дієслова: 150 карток і план на 30 днів.', ru: 'Чек-лист подготовки (план на 8 недель и стратегии), 100 важных слов с тестом на 40 заданий и неправильные глаголы: 150 карточек и план на 30 дней.', en: 'The prep checklist (8-week plan and strategies), 100 key words with a 40-item test and irregular verbs: 150 cards and a 30-day plan.' } },
      { q: { uk: 'Чим набір відрізняється від «Усе для НМТ»?', ru: 'Чем набор отличается от «Всё для НМТ»?', en: 'How is it different from «Everything for the NMT»?' }, a: { uk: '«Старт» містить три базові матеріали. «Усе для НМТ» додає ще граматику A1-B1, таблицю часів, фразові дієслова і шаблони для письма.', ru: '«Старт» содержит три базовых материала. «Всё для НМТ» добавляет ещё грамматику A1-B1, таблицу времён, фразовые глаголы и шаблоны для письма.', en: 'The starter has three core materials. «Everything for the NMT» adds A1-B1 grammar, the tenses chart, phrasal verbs and writing templates.' } },
      Q_FREE_NMT,
      Q_FILES,
      Q_LANG,
    ],
    free: ['/nmt/mock/1', '/nmt/mock/2', '/bonus/100-words', '/bonus/verbs-30', '/bonus/nmt-checklist'],
  },
  'nmt-all': {
    title: { uk: 'Усе для НМТ 2026 з англійської: 7 матеріалів, PDF', ru: 'Всё для НМТ 2026 по английскому: 7 материалов, PDF', en: 'Everything for NMT 2026 English: 7 printable PDFs' },
    desc: { uk: 'Повний набір до НМТ з англійської: план і стратегії, 100 слів, дієслова, граматика A1-B1, 12 часів, фразові дієслова, письмо. PDF для друку.', ru: 'Полный набор к НМТ по английскому: план и стратегии, 100 слов, глаголы, грамматика A1-B1, 12 времён, фразовые глаголы, письмо. PDF.', en: 'The full NMT English set: plan and strategies, 100 words, irregular verbs, A1-B1 grammar, 12 tenses, phrasal verbs, writing. Printable PDF.' },
    intro: { uk: 'Усі 7 матеріалів Murly для учнів в одному наборі: план підготовки до НМТ, 100 важливих слів, неправильні дієслова за 30 днів, уся базова граматика A1-B1, таблиця 12 часів, 60 фразових дієслів і шаблони для письма. Разом це суттєво дешевше, ніж купувати окремо. Онлайн-практика до кожної теми на Murly безкоштовна.', ru: 'Все 7 материалов Murly для учеников в одном наборе: план подготовки к НМТ, 100 важных слов, неправильные глаголы за 30 дней, вся базовая грамматика A1-B1, таблица 12 времён, 60 фразовых глаголов и шаблоны для письма. Вместе это заметно дешевле, чем покупать по отдельности. Онлайн-практика к каждой теме на Murly бесплатная.', en: 'All 7 Murly student materials in one set: the NMT prep plan, 100 key words, irregular verbs in 30 days, all basic A1-B1 grammar, the 12 tenses chart, 60 phrasal verbs and writing templates. Together it costs much less than separately. Online practice for every topic on Murly is free.' },
    who: [
      { uk: 'Учням, які готуються до НМТ системно', ru: 'Ученикам, которые готовятся к НМТ системно', en: 'Students who prepare for the NMT systematically' },
      { uk: 'Репетиторам, яким потрібна роздатка на весь курс', ru: 'Репетиторам, которым нужна раздатка на весь курс', en: 'Tutors who need handouts for a whole course' },
      { uk: 'Тим, хто хоче все в одному місці на папері', ru: 'Тем, кто хочет всё в одном месте на бумаге', en: 'Anyone who wants it all on paper in one place' },
    ],
    how: [
      { uk: 'Почни з плану на 8 тижнів і йди за ним', ru: 'Начни с плана на 8 недель и иди по нему', en: 'Start with the 8-week plan and follow it' },
      { uk: 'Граматику і часи бери під теми тижня', ru: 'Грамматику и времена бери под темы недели', en: 'Use the grammar and tenses for each week’s topics' },
      { uk: 'Слова й дієслова вчи щодня потроху', ru: 'Слова и глаголы учи каждый день понемногу', en: 'Learn words and verbs a little every day' },
      { uk: 'Перевіряй себе на пробних НМТ на Murly', ru: 'Проверяй себя на пробных НМТ на Murly', en: 'Test yourself with mock NMTs on Murly' },
    ],
    faq: [
      { q: { uk: 'Що входить у «Усе для НМТ»?', ru: 'Что входит во «Всё для НМТ»?', en: 'What is in «Everything for the NMT»?' }, a: { uk: 'Чек-лист підготовки, 100 важливих слів, неправильні дієслова з картками, уся граматика A1-B1, 12 часів на 2 сторінках, 60 фразових дієслів і шаблони для письма.', ru: 'Чек-лист подготовки, 100 важных слов, неправильные глаголы с карточками, вся грамматика A1-B1, 12 времён на 2 страницах, 60 фразовых глаголов и шаблоны для письма.', en: 'The prep checklist, 100 key words, irregular verbs with cards, all A1-B1 grammar, 12 tenses on 2 pages, 60 phrasal verbs and writing templates.' } },
      Q_FREE_NMT,
      Q_LANG,
      Q_FILES,
    ],
    free: [...NMT_FREE, '/grammar', '/bonus/100-words'],
  },
  'speaking-club': {
    title: { uk: '10 уроків для Speaking club англійською, A2-B2', ru: '10 уроков для Speaking club на английском, A2-B2', en: '10 English Speaking club lessons, A2-B2' },
    desc: { uk: 'Готові уроки для розмовного клубу англійської на 60 хвилин і 80 карток з питаннями. A2-B2, PDF для друку для вчителів і репетиторів.', ru: 'Готовые уроки для разговорного клуба английского на 60 минут и 80 карточек с вопросами. A2-B2, PDF для печати для учителей.', en: 'Ready 60-minute lessons for an English speaking club and 80 question cards. A2-B2 printable PDF for teachers and tutors.' },
    intro: { uk: 'Десять готових занять для розмовного клубу на 60 хвилин: розминка, лексика, обговорення і завершальна активність, плюс 80 карток з питаннями. Підходять для груп і індивідуальних уроків рівня A2-B2. Ще більше безкоштовних speaking-активностей зі слайдами є на Murly.', ru: 'Десять готовых занятий для разговорного клуба на 60 минут: разминка, лексика, обсуждение и финальная активность, плюс 80 карточек с вопросами. Подходят для групп и индивидуальных уроков уровня A2-B2. Ещё больше бесплатных speaking-активностей со слайдами есть на Murly.', en: 'Ten ready 60-minute speaking club sessions: warm-up, vocabulary, discussion and a final activity, plus 80 question cards. For groups and one-to-one lessons at A2-B2. Even more free speaking activities with slides are on Murly.' },
    who: [
      { uk: 'Вчителям, які ведуть розмовні клуби', ru: 'Учителям, которые ведут разговорные клубы', en: 'Teachers running speaking clubs' },
      { uk: 'Репетиторам для індивідуальних уроків', ru: 'Репетиторам для индивидуальных уроков', en: 'Tutors for one-to-one lessons' },
      { uk: 'Школам і курсам, яким потрібна готова програма', ru: 'Школам и курсам, которым нужна готовая программа', en: 'Schools and courses needing a ready programme' },
    ],
    how: [
      { uk: 'Обери тему уроку під рівень групи', ru: 'Выбери тему урока под уровень группы', en: 'Pick a lesson topic for the group level' },
      { uk: 'Роздрукуй план і картки з питаннями', ru: 'Распечатай план и карточки с вопросами', en: 'Print the plan and the question cards' },
      { uk: 'Веди урок за етапами з таймінгом', ru: 'Веди урок по этапам с таймингом', en: 'Run the lesson stage by stage with timings' },
      { uk: 'Додай безкоштовні активності з Murly для різноманіття', ru: 'Добавь бесплатные активности из Murly для разнообразия', en: 'Add free Murly activities for variety' },
    ],
    faq: [
      { q: { uk: 'Для якого рівня уроки?', ru: 'Для какого уровня уроки?', en: 'What level are the lessons for?' }, a: { uk: 'A2-B2. Питання на картках легко спростити або ускладнити під конкретну групу.', ru: 'A2-B2. Вопросы на карточках легко упростить или усложнить под конкретную группу.', en: 'A2-B2. The card questions are easy to simplify or extend for your group.' } },
      { q: { uk: 'Чи є безкоштовні матеріали для розмовних уроків?', ru: 'Есть ли бесплатные материалы для разговорных уроков?', en: 'Are there free speaking lesson materials?' }, a: { uk: 'Так. На Murly є speaking-активності зі слайдами і PDF, готові уроки на 60 хвилин і скоромовки для розминки. Частину уроків можна задавати учням у кабінеті вчителя.', ru: 'Да. На Murly есть speaking-активности со слайдами и PDF, готовые уроки на 60 минут и скороговорки для разминки. Часть уроков можно задавать ученикам в кабинете учителя.', en: 'Yes. Murly has speaking activities with slides and PDFs, ready 60-minute lessons and tongue twisters for warm-ups. You can assign some lessons to students in the teacher dashboard.' } },
      Q_PRINT,
      Q_FILES,
    ],
    free: ['/activities', '/lessons', '/tongue-twisters', '/level-test'],
  },
  'first-lesson': {
    title: { uk: 'Перший урок англійської з новим учнем: план і анкета', ru: 'Первый урок английского с новым учеником: план и анкета', en: 'First English lesson with a new student: plan and survey' },
    desc: { uk: 'План першого уроку на 60 хвилин, усна перевірка рівня, анкета потреб, цілі й лист батькам. PDF для вчителів і репетиторів англійської.', ru: 'План первого урока на 60 минут, устная проверка уровня, анкета потребностей, цели и письмо родителям. PDF для учителей английского.', en: 'A 60-minute first lesson plan, oral level check, needs survey, goals and a parent message. PDF for English teachers and tutors.' },
    intro: { uk: 'Готовий сценарій першої зустрічі з новим учнем: план на 60 хвилин, усна перевірка рівня, анкета про цілі й інтереси, бланк цілей і шаблон листа батькам. Допомагає провести перший урок спокійно і показати учневі зрозумілий план. Письмовий тест на рівень учень може пройти на Murly безкоштовно.', ru: 'Готовый сценарий первой встречи с новым учеником: план на 60 минут, устная проверка уровня, анкета о целях и интересах, бланк целей и шаблон письма родителям. Помогает провести первый урок спокойно и показать ученику понятный план. Письменный тест на уровень ученик может пройти на Murly бесплатно.', en: 'A ready script for the first meeting with a new student: a 60-minute plan, an oral level check, a goals and interests survey, a goals sheet and a parent message template. It helps you run the first lesson calmly and show a clear plan. The student can take a written level test on Murly for free.' },
    who: [
      { uk: 'Репетиторам, які беруть нових учнів', ru: 'Репетиторам, которые берут новых учеников', en: 'Tutors taking on new students' },
      { uk: 'Вчителям-початківцям', ru: 'Начинающим учителям', en: 'New teachers' },
      { uk: 'Школам, яким потрібен єдиний стандарт першого уроку', ru: 'Школам, которым нужен единый стандарт первого урока', en: 'Schools that want one first-lesson standard' },
    ],
    how: [
      { uk: 'Перед уроком попроси учня пройти тест на рівень на Murly', ru: 'Перед уроком попроси ученика пройти тест на уровень на Murly', en: 'Before the lesson, ask the student to take the Murly level test' },
      { uk: 'Проведи урок за планом і усну перевірку рівня', ru: 'Проведи урок по плану и устную проверку уровня', en: 'Run the lesson plan and the oral level check' },
      { uk: 'Заповніть разом анкету і бланк цілей', ru: 'Заполните вместе анкету и бланк целей', en: 'Fill in the survey and goals sheet together' },
      { uk: 'Надішли батькам лист за шаблоном', ru: 'Отправь родителям письмо по шаблону', en: 'Send parents the message from the template' },
    ],
    faq: [
      { q: { uk: 'Як провести перший урок англійської з новим учнем?', ru: 'Как провести первый урок английского с новым учеником?', en: 'How do I run a first English lesson with a new student?' }, a: { uk: 'Познайомтеся, коротко перевірте рівень усно, з’ясуйте цілі й інтереси і закінчіть маленькою перемогою: учень має піти з відчуттям, що вже щось вміє. Усе це розписано в плані по хвилинах.', ru: 'Познакомьтесь, коротко проверьте уровень устно, выясните цели и интересы и закончите маленькой победой: ученик должен уйти с ощущением, что уже что-то умеет. Всё это расписано в плане по минутам.', en: 'Get to know each other, briefly check the level orally, find out goals and interests and finish with a small win so the student leaves feeling capable. The plan sets it all out minute by minute.' } },
      { q: { uk: 'Де вести учнів після першого уроку?', ru: 'Где вести учеников после первого урока?', en: 'Where can I manage students after the first lesson?' }, a: { uk: 'У кабінеті вчителя Murly: учні, розклад, домашка з автоперевіркою й оплати. Стартовий тариф безкоштовний.', ru: 'В кабинете учителя Murly: ученики, расписание, домашка с автопроверкой и оплаты. Стартовый тариф бесплатный.', en: 'In the Murly teacher dashboard: students, schedule, auto-checked homework and payments. The starter plan is free.' } },
      Q_FILES,
      Q_LANG,
    ],
    free: ['/level-test', '/lessons', '/activities', '/tongue-twisters'],
  },
};

export const getShopSeo = (id: string): ShopSeo | undefined => SHOP_SEO[id];
