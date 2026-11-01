// Детальні сторінки тарифів: /pricing/start, /pricing/pro, /pricing/school, /pricing/plus, /pricing/family
import type { T } from './i18n';
import { PRICES } from './plans';

export type PlanFeature = { icon: string; title: T; text: T };
export type PlanBlock = { title: T; text: T; points: T[] };
export type PlanPage = {
  slug: string;
  icon: string;
  kit: string;
  name: T;
  price: { month: number; year?: number };
  note: T;
  title: T;
  em: T;
  lead: T;
  who: T[];
  unique: PlanFeature[];
  blocks: PlanBlock[];
  bot?: 'teacher' | 'parent';
  faq: { q: T; a: T }[];
  cta: { label: T; href: string };
  paid: boolean;
};

const BOT_TEACHER: PlanBlock = {
  title: { uk: 'Telegram-бот, який веде облік замість тебе', ru: 'Telegram-бот, который ведёт учёт вместо тебя', en: 'A Telegram bot that keeps the records for you' },
  text: {
    uk: 'Більшість репетиторів тримають оплати в нотатках, розклад у календарі, а домашку в чатах. Бот Murly збирає це в одне місце, і все робиться двома натисканнями прямо з телефона, без відкривання ноутбука.',
    ru: 'Большинство репетиторов держат оплаты в заметках, расписание в календаре, а домашку в чатах. Бот Murly собирает это в одно место, и всё делается двумя нажатиями прямо с телефона, без открытия ноутбука.',
    en: 'Most tutors keep payments in notes, the schedule in a calendar and homework in chats. The Murly bot puts it all in one place, and everything takes two taps on your phone, no laptop needed.',
  },
  points: [
    { uk: 'Записати оплату: обираєш учня і суму (1, 4 чи 8 уроків), баланс рахується сам. Помилився? Кнопка «Скасувати».', ru: 'Записать оплату: выбираешь ученика и сумму (1, 4 или 8 уроков), баланс считается сам. Ошибся? Кнопка «Отменить».', en: 'Record a payment: pick the student and amount (1, 4 or 8 lessons), the balance updates itself. Made a mistake? Tap Undo.' },
    { uk: 'Відмітити урок: був, пропустив, скасовано, або позаплановий урок. Одразу видно, хто скільки винен.', ru: 'Отметить урок: был, пропустил, отменён, или внеплановый урок. Сразу видно, кто сколько должен.', en: 'Mark a lesson: attended, missed, cancelled, or an extra lesson. You instantly see who owes what.' },
    { uk: 'Ранкове зведення: уроки на сьогодні, що чекає перевірки і хто чекає оплати.', ru: 'Утренняя сводка: уроки на сегодня, что ждёт проверки и кто ждёт оплаты.', en: 'Morning summary: today’s lessons, what needs checking and who still has to pay.' },
    { uk: 'Учні отримують повідомлення про нову домашку і нагадування про урок, тож менше «ой, я забув».', ru: 'Ученики получают сообщение о новой домашке и напоминание об уроке, так что меньше «ой, я забыл».', en: 'Students get a message about new homework and a lesson reminder, so fewer “oops, I forgot”.' },
    { uk: 'Батьки самі дивляться в боті баланс, успіхи й монетки дитини. Тобі не треба писати кожному.', ru: 'Родители сами смотрят в боте баланс, успехи и монетки ребёнка. Тебе не нужно писать каждому.', en: 'Parents check the balance, progress and coins in the bot themselves. You don’t have to message each one.' },
  ],
};

const BOT_PARENT: PlanBlock = {
  title: { uk: 'Усе про навчання дитини в Telegram', ru: 'Всё об учёбе ребёнка в Telegram', en: 'Everything about your child’s learning in Telegram' },
  text: {
    uk: 'Не треба заходити на сайт, щоб дізнатися, як справи. Бот Murly сам нагадає і покаже головне.',
    ru: 'Не нужно заходить на сайт, чтобы узнать, как дела. Бот Murly сам напомнит и покажет главное.',
    en: 'No need to open the site to see how things are going. The Murly bot reminds you and shows what matters.',
  },
  points: [
    { uk: 'Повідомлення, коли вчитель задав домашку, і нагадування, якщо її ще не здано.', ru: 'Сообщение, когда учитель задал домашку, и напоминание, если её ещё не сдали.', en: 'A message when the teacher sets homework, and a reminder if it isn’t done yet.' },
    { uk: 'Кнопки «Успіхи», «Монетки», «Оплата»: усе видно за секунду.', ru: 'Кнопки «Успехи», «Монетки», «Оплата»: всё видно за секунду.', en: 'Progress, Coins and Payment buttons: everything in a second.' },
    { uk: 'Мова бота на вибір: українська, російська або англійська.', ru: 'Язык бота на выбор: украинский, русский или английский.', en: 'Choose the bot language: Ukrainian, Russian or English.' },
  ],
};

export const PLAN_PAGES: PlanPage[] = [
  {
    slug: 'start', icon: 'd-smile', kit: 'st-cat-blep', paid: false,
    name: { uk: 'Старт', ru: 'Старт', en: 'Start' },
    price: { month: 0 },
    note: { uk: 'Назавжди безкоштовно', ru: 'Навсегда бесплатно', en: 'Free forever' },
    title: { uk: 'Спробуй Murly', ru: 'Попробуй Murly', en: 'Try Murly' },
    em: { uk: 'без жодної гривні.', ru: 'без единой гривны.', en: 'without paying a thing.' },
    lead: {
      uk: 'Кабінет для вчителя, який тільки починає або веде кількох учнів. Без картки, без пробних термінів, без обмеження в часі.',
      ru: 'Кабинет для учителя, который только начинает или ведёт нескольких учеников. Без карты, без пробных сроков, без ограничения по времени.',
      en: 'A dashboard for a teacher who is just starting or has a few students. No card, no trial period, no time limit.',
    },
    who: [
      { uk: 'Ти щойно почав репетиторство', ru: 'Ты только начал репетиторство', en: 'You have just started tutoring' },
      { uk: 'У тебе 1-3 постійні учні', ru: 'У тебя 1-3 постоянных ученика', en: 'You have 1-3 regular students' },
      { uk: 'Хочеш спокійно подивитися, як усе працює', ru: 'Хочешь спокойно посмотреть, как всё работает', en: 'You want to look around calmly first' },
    ],
    unique: [
      { icon: 'e-cal', title: { uk: 'Розклад і домашка', ru: 'Расписание и домашка', en: 'Schedule and homework' }, text: { uk: 'Уроки, домашка-гра і словник учня в одному кабінеті.', ru: 'Уроки, домашка-игра и словарь ученика в одном кабинете.', en: 'Lessons, game-like homework and the student’s word list in one place.' } },
      { icon: 'e-book', title: { uk: 'Частина бібліотеки', ru: 'Часть библиотеки', en: 'Part of the library' }, text: { uk: 'Готові уроки й activities, щоб провести заняття без підготовки.', ru: 'Готовые уроки и activities, чтобы провести занятие без подготовки.', en: 'Ready lessons and activities to teach without preparation.' } },
      { icon: 'd-lock', title: { uk: 'Дані назавжди', ru: 'Данные навсегда', en: 'Your data stays' }, text: { uk: 'Перейдеш на Pro або ні, нічого не зникне.', ru: 'Перейдёшь на Pro или нет, ничего не пропадёт.', en: 'Whether or not you move to Pro, nothing disappears.' } },
    ],
    blocks: [
      {
        title: { uk: 'Чим Старт відрізняється від Pro', ru: 'Чем Старт отличается от Pro', en: 'How Start differs from Pro' },
        text: { uk: 'Старт закриває базу. Pro потрібен, коли учнів стає більше і хочеться, щоб облік вівся сам.', ru: 'Старт закрывает базу. Pro нужен, когда учеников становится больше и хочется, чтобы учёт вёлся сам.', en: 'Start covers the basics. Pro is for when you have more students and want the records to keep themselves.' },
        points: [
          { uk: 'До 3 учнів замість необмеженої кількості', ru: 'До 3 учеников вместо неограниченного количества', en: 'Up to 3 students instead of unlimited' },
          { uk: 'Частина уроків і activities замість усієї бібліотеки', ru: 'Часть уроков и activities вместо всей библиотеки', en: 'Some lessons and activities instead of the full library' },
          { uk: 'Без Telegram-бота для оплат і відміток уроків', ru: 'Без Telegram-бота для оплат и отметок уроков', en: 'No Telegram bot for payments and lesson marks' },
        ],
      },
    ],
    faq: [
      { q: { uk: 'Це справді безкоштовно назавжди?', ru: 'Это правда бесплатно навсегда?', en: 'Is it really free forever?' }, a: { uk: 'Так. Старт не має терміну дії і не потребує картки.', ru: 'Да. У Старта нет срока действия, и карта не нужна.', en: 'Yes. Start has no expiry and needs no card.' } },
      { q: { uk: 'Що буде, якщо з’явиться четвертий учень?', ru: 'Что будет, если появится четвёртый ученик?', en: 'What if I get a fourth student?' }, a: { uk: 'Перейдеш на Pro, і всі дані залишаться на місці. Перший місяць Pro безкоштовний.', ru: 'Перейдёшь на Pro, и все данные останутся на месте. Первый месяц Pro бесплатный.', en: 'Move to Pro and all your data stays. The first month of Pro is free.' } },
    ],
    cta: { label: { uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' }, href: '/sign-up?role=teacher' },
  },
  {
    slug: 'pro', icon: 'd-rocket', kit: 'st-cat-coffee', paid: true, bot: 'teacher',
    name: { uk: 'Вчитель Pro', ru: 'Учитель Pro', en: 'Teacher Pro' },
    price: { month: PRICES.teacherPro, year: PRICES.teacherProYear },
    note: { uk: 'Перший місяць безкоштовно, без картки', ru: 'Первый месяц бесплатно, без карты', en: 'First month free, no card' },
    title: { uk: 'Усе для репетитора', ru: 'Всё для репетитора', en: 'Everything a tutor needs' },
    em: { uk: 'в одному місці.', ru: 'в одном месте.', en: 'in one place.' },
    lead: {
      uk: 'Уроки, домашка, оплати, розклад і батьки в одному кабінеті, а облік веде Telegram-бот. Коштує менше, ніж один урок з репетитором на місяць, а економить години підготовки.',
      ru: 'Уроки, домашка, оплаты, расписание и родители в одном кабинете, а учёт ведёт Telegram-бот. Стоит меньше, чем один урок с репетитором в месяц, а экономит часы подготовки.',
      en: 'Lessons, homework, payments, schedule and parents in one dashboard, with a Telegram bot keeping the records. Costs less than one tutoring lesson a month and saves hours of prep.',
    },
    who: [
      { uk: 'Приватний репетитор з 4+ учнями', ru: 'Частный репетитор с 4+ учениками', en: 'A private tutor with 4+ students' },
      { uk: 'Ведеш і дітей, і дорослих, і НМТ', ru: 'Ведёшь и детей, и взрослых, и НМТ', en: 'You teach kids, adults and NMT prep' },
      { uk: 'Втомився від таблиць і нотаток з оплатами', ru: 'Устал от таблиц и заметок с оплатами', en: 'You’re tired of spreadsheets and payment notes' },
    ],
    unique: [
      { icon: 'd-send', title: { uk: 'Бот для обліку', ru: 'Бот для учёта', en: 'A bot for records' }, text: { uk: 'Оплати, відмітки уроків і борги в Telegram двома натисканнями.', ru: 'Оплаты, отметки уроков и долги в Telegram двумя нажатиями.', en: 'Payments, lesson marks and debts in Telegram in two taps.' } },
      { icon: 'e-board', title: { uk: 'Кімната уроку', ru: 'Комната урока', en: 'Lesson room' }, text: { uk: 'Відео й дошка в одному вікні, дошка в кожного учня своя і зберігається.', ru: 'Видео и доска в одном окне, у каждого ученика своя доска, и она сохраняется.', en: 'Video and whiteboard in one window, each student has their own saved board.' } },
      { icon: 'e-speak', title: { uk: 'Activities і уроки', ru: 'Activities и уроки', en: 'Activities and lessons' }, text: { uk: 'Готові слайди для розмовної практики з фото, таймером і випадковим вибором учня.', ru: 'Готовые слайды для разговорной практики с фото, таймером и случайным выбором ученика.', en: 'Ready speaking slides with photos, a timer and random student pick.' } },
      { icon: 'd-heart', title: { uk: 'Сторінка для батьків', ru: 'Страница для родителей', en: 'Parent page' }, text: { uk: 'Батьки бачать успіхи дитини за посиланням, без реєстрації.', ru: 'Родители видят успехи ребёнка по ссылке, без регистрации.', en: 'Parents see their child’s progress via a link, no sign-up.' } },
      { icon: 'd-lock', title: { uk: 'Режим уроку', ru: 'Режим урока', en: 'Lesson mode' }, text: { uk: 'Одна кнопка ховає ціни, оплати й нотатки, поки показуєш екран учню.', ru: 'Одна кнопка прячет цены, оплаты и заметки, пока показываешь экран ученику.', en: 'One button hides prices, payments and notes while you share your screen.' } },
      { icon: 'e-trophy', title: { uk: 'Домашка-гра', ru: 'Домашка-игра', en: 'Homework as a game' }, text: { uk: 'Учні заробляють монетки і хочуть робити домашку самі. Ти бачиш результат і помилки.', ru: 'Ученики зарабатывают монетки и хотят делать домашку сами. Ты видишь результат и ошибки.', en: 'Students earn coins and want to do homework. You see scores and mistakes.' } },
    ],
    blocks: [
      BOT_TEACHER,
      {
        title: { uk: 'Що ще входить', ru: 'Что ещё входит', en: 'What else is included' },
        text: { uk: 'Усе, що є на Старті, плюс:', ru: 'Всё, что есть на Старте, плюс:', en: 'Everything in Start, plus:' },
        points: [
          { uk: 'Скільки завгодно учнів і групи', ru: 'Сколько угодно учеников и группы', en: 'Any number of students, plus groups' },
          { uk: 'Уся бібліотека уроків, activities, тренажерів і 20 пробних НМТ', ru: 'Вся библиотека уроков, activities, тренажёров и 20 пробных НМТ', en: 'The full library: lessons, activities, trainers and 20 NMT mocks' },
          { uk: 'Перевірка домашки зі списком помилок', ru: 'Проверка домашки со списком ошибок', en: 'Homework review with a list of mistakes' },
          { uk: 'Словник учня з повторенням слів за розкладом', ru: 'Словарь ученика с повторением слов по расписанию', en: 'Student word lists with spaced review' },
          { uk: 'Командна гра-вікторина для груп і свої ігри', ru: 'Командная игра-викторина для групп и свои игры', en: 'A team quiz game for groups and your own games' },
          { uk: 'Заробіток за тиждень і місяць на головній кабінету', ru: 'Заработок за неделю и месяц на главной кабинета', en: 'Weekly and monthly earnings on your dashboard' },
        ],
      },
      {
        title: { uk: 'Чому це вигідно', ru: 'Почему это выгодно', en: 'Why it pays off' },
        text: {
          uk: `Середня ціна уроку англійської в Україні зараз 350-430 ₴. Pro коштує ${PRICES.teacherPro} ₴ на місяць, тобто менше одного уроку. Якщо Murly економить тобі хоча б годину підготовки на тиждень і допомагає не загубити одну оплату, він окупається в перший же тиждень.`,
          ru: `Средняя цена урока английского в Украине сейчас 350-430 ₴. Pro стоит ${PRICES.teacherPro} ₴ в месяц, то есть меньше одного урока. Если Murly экономит тебе хотя бы час подготовки в неделю и помогает не потерять одну оплату, он окупается в первую же неделю.`,
          en: `An English lesson in Ukraine now costs 350-430 ₴ on average. Pro costs ${PRICES.teacherPro} ₴ a month, less than one lesson. If Murly saves you just an hour of prep a week and helps you not lose a single payment, it pays for itself in the first week.`,
        },
        points: [],
      },
    ],
    faq: [
      { q: { uk: 'Як працює безкоштовний місяць?', ru: 'Как работает бесплатный месяц?', en: 'How does the free month work?' }, a: { uk: '30 днів усіх можливостей Pro без картки. Потім сам вирішуєш: продовжити або залишитися на Старті, дані збережуться.', ru: '30 дней всех возможностей Pro без карты. Потом сам решаешь: продлить или остаться на Старте, данные сохранятся.', en: '30 days of everything in Pro, no card. Then you decide: continue or stay on Start, your data stays.' } },
      { q: { uk: 'Учням теж треба платити?', ru: 'Ученикам тоже нужно платить?', en: 'Do my students need to pay too?' }, a: { uk: 'Ні. Усе, що дає вчитель на Pro, для його учнів безкоштовне.', ru: 'Нет. Всё, что даёт учитель на Pro, для его учеников бесплатно.', en: 'No. Everything a Pro teacher gives is free for their students.' } },
      { q: { uk: 'Як підключити бота?', ru: 'Как подключить бота?', en: 'How do I connect the bot?' }, a: { uk: 'У налаштуваннях кабінету є кнопка Telegram. Одне натискання, і бот знає, що ти вчитель.', ru: 'В настройках кабинета есть кнопка Telegram. Одно нажатие, и бот знает, что ты учитель.', en: 'There is a Telegram button in settings. One tap and the bot knows you’re the teacher.' } },
      { q: { uk: 'Чи можна платити за рік?', ru: 'Можно платить за год?', en: 'Can I pay yearly?' }, a: { uk: `Так, ${PRICES.teacherProYear.toLocaleString('uk-UA')} ₴ на рік: знижка 25%, це три місяці в подарунок.`, ru: `Да, ${PRICES.teacherProYear.toLocaleString('uk-UA')} ₴ в год: скидка 25%, это три месяца в подарок.`, en: `Yes, ${PRICES.teacherProYear.toLocaleString('uk-UA')} ₴ a year: 25% off, three months free.` } },
    ],
    cta: { label: { uk: 'Спробувати місяць безкоштовно', ru: 'Попробовать месяц бесплатно', en: 'Try a month free' }, href: '/sign-up?role=teacher&plan=pro' },
  },
  {
    slug: 'school', icon: 'd-team', kit: 'st-girl-bow', paid: true, bot: 'teacher',
    name: { uk: 'Школа', ru: 'Школа', en: 'School' },
    price: { month: PRICES.school, year: PRICES.schoolYear },
    note: { uk: `До 5 вчителів, далі +${PRICES.schoolExtraTeacher} ₴ за кожного`, ru: `До 5 учителей, дальше +${PRICES.schoolExtraTeacher} ₴ за каждого`, en: `Up to 5 teachers, then +${PRICES.schoolExtraTeacher} ₴ each` },
    title: { uk: 'Маленька школа', ru: 'Маленькая школа', en: 'A small school' },
    em: { uk: 'без хаосу.', ru: 'без хаоса.', en: 'without the chaos.' },
    lead: {
      uk: 'Для мовної школи або команди вчителів: у кожного свій Pro, а власник бачить загальну картину учнів, груп і оплат.',
      ru: 'Для языковой школы или команды учителей: у каждого свой Pro, а владелец видит общую картину учеников, групп и оплат.',
      en: 'For a language school or a team of teachers: everyone gets Pro, and the owner sees students, groups and payments in one place.',
    },
    who: [
      { uk: 'Мовна школа на 2-10 вчителів', ru: 'Языковая школа на 2-10 учителей', en: 'A language school with 2-10 teachers' },
      { uk: 'Кілька репетиторів, які працюють разом', ru: 'Несколько репетиторов, которые работают вместе', en: 'Several tutors working together' },
      { uk: 'Учні переходять між вчителями й групами', ru: 'Ученики переходят между учителями и группами', en: 'Students move between teachers and groups' },
    ],
    unique: [
      { icon: 'd-rocket', title: { uk: 'Pro кожному', ru: 'Pro каждому', en: 'Pro for everyone' }, text: { uk: 'Кожен учитель отримує все з Pro, разом з ботом.', ru: 'Каждый учитель получает всё из Pro, вместе с ботом.', en: 'Every teacher gets everything in Pro, bot included.' } },
      { icon: 'd-money', title: { uk: 'Оплати школи', ru: 'Оплаты школы', en: 'School payments' }, text: { uk: 'Хто заплатив, хто винен, по всій школі одразу.', ru: 'Кто заплатил, кто должен, по всей школе сразу.', en: 'Who paid and who owes, across the whole school.' } },
      { icon: 'd-team', title: { uk: 'Спільні учні', ru: 'Общие ученики', en: 'Shared students' }, text: { uk: 'Учень переходить до іншого вчителя з усією історією.', ru: 'Ученик переходит к другому учителю со всей историей.', en: 'A student moves to another teacher with their full history.' } },
    ],
    blocks: [
      {
        title: { uk: 'Як це влаштовано', ru: 'Как это устроено', en: 'How it works' },
        text: { uk: 'Ми підключаємо школу разом з тобою, щоб усе було налаштовано з першого дня.', ru: 'Мы подключаем школу вместе с тобой, чтобы всё было настроено с первого дня.', en: 'We set up the school together with you so everything works from day one.' },
        points: [
          { uk: 'Пишеш нам, ми додаємо вчителів і переносимо учнів', ru: 'Пишешь нам, мы добавляем учителей и переносим учеников', en: 'You message us, we add teachers and move students over' },
          { uk: 'Перший місяць безкоштовно для всієї школи', ru: 'Первый месяц бесплатно для всей школы', en: 'The first month is free for the whole school' },
          { uk: `${PRICES.school} ₴ на місяць за 5 вчителів, це менше ${Math.ceil(PRICES.school / 5)} ₴ на вчителя`, ru: `${PRICES.school} ₴ в месяц за 5 учителей, это меньше ${Math.ceil(PRICES.school / 5)} ₴ на учителя`, en: `${PRICES.school} ₴ a month for 5 teachers, under ${Math.ceil(PRICES.school / 5)} ₴ per teacher` },
        ],
      },
      BOT_TEACHER,
    ],
    faq: [
      { q: { uk: 'Що якщо в нас 3 вчителі?', ru: 'Что если у нас 3 учителя?', en: 'What if we have 3 teachers?' }, a: { uk: 'Можна взяти Pro кожному окремо або Школу, якщо потрібні спільні учні й загальні оплати.', ru: 'Можно взять Pro каждому отдельно или Школу, если нужны общие ученики и общие оплаты.', en: 'Take Pro for each, or School if you need shared students and payments.' } },
      { q: { uk: 'Як підключитися?', ru: 'Как подключиться?', en: 'How do we join?' }, a: { uk: 'Напиши нам через сторінку контактів, і ми все налаштуємо.', ru: 'Напиши нам через страницу контактов, и мы всё настроим.', en: 'Message us via the contact page and we’ll set it all up.' } },
    ],
    cta: { label: { uk: 'Написати нам', ru: 'Написать нам', en: 'Contact us' }, href: '/contact' },
  },
  {
    slug: 'plus', icon: 'd-rocket', kit: 'st-boy-cap', paid: true, bot: 'parent',
    name: { uk: 'Учень Плюс', ru: 'Ученик Плюс', en: 'Student Plus' },
    price: { month: PRICES.studentPlus, year: PRICES.studentPlusYear },
    note: { uk: 'Перший місяць безкоштовно', ru: 'Первый месяц бесплатно', en: 'First month free' },
    title: { uk: 'Англійська щодня', ru: 'Английский каждый день', en: 'English every day' },
    em: { uk: 'за ціною кави.', ru: 'по цене кофе.', en: 'for the price of a coffee.' },
    lead: {
      uk: 'Для тих, хто вчиться сам або хоче більше, ніж дає урок: усі тренажери, пробні НМТ з розбором, історії, серіали й повторення слів.',
      ru: 'Для тех, кто учится сам или хочет больше, чем даёт урок: все тренажёры, пробные НМТ с разбором, истории, сериалы и повторение слов.',
      en: 'For self-learners or anyone who wants more than their lessons: all trainers, NMT mocks with explanations, stories, series and word review.',
    },
    who: [
      { uk: 'Готуєшся до НМТ', ru: 'Готовишься к НМТ', en: 'You’re preparing for the NMT' },
      { uk: 'Вчишся сам, без репетитора', ru: 'Учишься сам, без репетитора', en: 'You learn on your own' },
      { uk: 'Хочеш практику між уроками', ru: 'Хочешь практику между уроками', en: 'You want practice between lessons' },
    ],
    unique: [
      { icon: 'e-cap', title: { uk: '20 пробних НМТ', ru: '20 пробных НМТ', en: '20 NMT mocks' }, text: { uk: 'Як на справжньому тесті, з підказкою і поясненням до кожного завдання.', ru: 'Как на настоящем тесте, с подсказкой и объяснением к каждому заданию.', en: 'Just like the real test, with a hint and explanation for every task.' } },
      { icon: 'e-abc', title: { uk: 'Тренажери на 100 завдань', ru: 'Тренажёры на 100 заданий', en: '100-task trainers' }, text: { uk: 'Граматика простими словами і практика, поки не стане легко.', ru: 'Грамматика простыми словами и практика, пока не станет легко.', en: 'Simple grammar and practice until it feels easy.' } },
      { icon: 'e-head', title: { uk: 'Слова не забуваються', ru: 'Слова не забываются', en: 'Words that stick' }, text: { uk: 'Повторення за розкладом: 5 хвилин на день замість зубріння.', ru: 'Повторение по расписанию: 5 минут в день вместо зубрёжки.', en: 'Spaced review: 5 minutes a day instead of cramming.' } },
      { icon: 'e-book', title: { uk: 'Історії й серіали', ru: 'Истории и сериалы', en: 'Stories and series' }, text: { uk: 'Аудіосеріали з живими голосами і короткі історії для читання.', ru: 'Аудиосериалы с живыми голосами и короткие истории для чтения.', en: 'Audio series with natural voices and short stories to read.' } },
    ],
    blocks: [
      BOT_PARENT,
      {
        title: { uk: 'Якщо в тебе є вчитель', ru: 'Если у тебя есть учитель', en: 'If you have a teacher' },
        text: { uk: 'Домашка і все, що дає твій учитель, безкоштовні завжди. Плюс потрібен лише для самостійної практики понад це.', ru: 'Домашка и всё, что даёт твой учитель, бесплатны всегда. Плюс нужен только для самостоятельной практики сверх этого.', en: 'Homework and everything your teacher gives you are always free. Plus is only for extra self-study.' },
        points: [],
      },
    ],
    faq: [
      { q: { uk: 'Чим Плюс відрізняється від безкоштовного?', ru: 'Чем Плюс отличается от бесплатного?', en: 'How is Plus different from free?' }, a: { uk: 'Безкоштовно: граматика, неправильні дієслова, квіз дня й ігри. Плюс відкриває всі тренажери, усі пробні НМТ, серіали й повторення слів.', ru: 'Бесплатно: грамматика, неправильные глаголы, квиз дня и игры. Плюс открывает все тренажёры, все пробные НМТ, сериалы и повторение слов.', en: 'Free: grammar, irregular verbs, daily quiz and games. Plus unlocks all trainers, all NMT mocks, series and word review.' } },
      { q: { uk: 'Можна скасувати?', ru: 'Можно отменить?', en: 'Can I cancel?' }, a: { uk: 'Так, у будь-який момент. Прогрес нікуди не зникне.', ru: 'Да, в любой момент. Прогресс никуда не пропадёт.', en: 'Yes, any time. Your progress stays.' } },
    ],
    cta: { label: { uk: 'Спробувати місяць безкоштовно', ru: 'Попробовать месяц бесплатно', en: 'Try a month free' }, href: '/sign-up?role=student&plan=plus' },
  },
  {
    slug: 'family', icon: 'd-heart', kit: 'st-girl-bow', paid: true, bot: 'parent',
    name: { uk: "Сім'я", ru: 'Семья', en: 'Family' },
    price: { month: PRICES.family, year: PRICES.familyYear },
    note: { uk: 'Для 2-3 дітей', ru: 'Для 2-3 детей', en: 'For 2-3 kids' },
    title: { uk: 'Один тариф', ru: 'Один тариф', en: 'One plan' },
    em: { uk: 'на всіх дітей.', ru: 'на всех детей.', en: 'for all your kids.' },
    lead: {
      uk: 'Учень Плюс для кожної дитини, окремий прогрес у кожного і один зрозумілий звіт для батьків.',
      ru: 'Ученик Плюс для каждого ребёнка, отдельный прогресс у каждого и один понятный отчёт для родителей.',
      en: 'Student Plus for each child, separate progress for each, and one clear report for parents.',
    },
    who: [
      { uk: 'У вас 2-3 дітей різного віку', ru: 'У вас 2-3 детей разного возраста', en: 'You have 2-3 kids of different ages' },
      { uk: 'Хочете бачити, хто займався, а хто ні', ru: 'Хотите видеть, кто занимался, а кто нет', en: 'You want to see who practised and who didn’t' },
      { uk: 'Шукаєте безпечне місце без реклами', ru: 'Ищете безопасное место без рекламы', en: 'You want a safe, ad-free place' },
    ],
    unique: [
      { icon: 'd-kid', title: { uk: 'Кожному своє', ru: 'Каждому своё', en: 'Each their own' }, text: { uk: 'Свій рівень, свої слова і свої монетки в кожної дитини.', ru: 'Свой уровень, свои слова и свои монетки у каждого ребёнка.', en: 'Each child has their own level, words and coins.' } },
      { icon: 'c-fish', title: { uk: 'Хочеться самим', ru: 'Хочется самим', en: 'They want to' }, text: { uk: 'За вправи діти отримують монетки і витрачають їх у 3D-містечку.', ru: 'За упражнения дети получают монетки и тратят их в 3D-городке.', en: 'Kids earn coins for practice and spend them in a 3D town.' } },
      { icon: 'd-lock', title: { uk: 'Без реклами', ru: 'Без рекламы', en: 'No ads' }, text: { uk: 'Жодної реклами і сторонніх посилань, у грі все англійською.', ru: 'Никакой рекламы и посторонних ссылок, в игре всё на английском.', en: 'No ads or outside links, and everything in the game is in English.' } },
    ],
    blocks: [BOT_PARENT],
    faq: [
      { q: { uk: 'Що якщо дитина одна?', ru: 'Что если ребёнок один?', en: 'What if we have one child?' }, a: { uk: `Тоді вигідніше Учень Плюс за ${PRICES.studentPlus} ₴.`, ru: `Тогда выгоднее Ученик Плюс за ${PRICES.studentPlus} ₴.`, en: `Then Student Plus at ${PRICES.studentPlus} ₴ is the better deal.` } },
      { q: { uk: 'З якого віку?', ru: 'С какого возраста?', en: 'From what age?' }, a: { uk: 'Кабінет учня з 6 років. Для молодших є безкоштовна сторінка «Англійська з малюком».', ru: 'Кабинет ученика с 6 лет. Для младших есть бесплатная страница «Английский с малышом».', en: 'The student account is for ages 6+. For younger kids there’s a free “English with little ones” page.' } },
    ],
    cta: { label: { uk: 'Спробувати місяць безкоштовно', ru: 'Попробовать месяц бесплатно', en: 'Try a month free' }, href: '/sign-up?role=student&plan=family' },
  },
];

export const planPage = (slug: string) => PLAN_PAGES.find((p) => p.slug === slug);
