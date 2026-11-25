// Розширені пояснення під пошукові запити для сторінок, які вже на позиціях 8-20 у Google.
// Показуються під уроком або розділом граматики: правило, таблиці, багато прикладів, вправи з відповідями, FAQ і внутрішні посилання.
// Мови: uk і ru (англійською сторінки не дублюємо).

export type GBlock =
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'p'; text: string } // **жирний** і [посилання](/шлях)
  | { t: 'ul'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'ex'; items: [string, string][] } // англійський приклад + переклад
  | { t: 'quiz'; title: string; items: [string, string][] }; // завдання + відповідь (розгортається)
export type Guide = { title: string; blocks: GBlock[]; faq: { q: string; a: string }[]; links: { href: string; label: string }[] };
type Both = { uk: Guide; ru: Guide };

// ---------- Have you ever ----------
const HYE_EX: [string, string, string][] = [
  ['Have you ever tried sushi?', 'Ти коли-небудь куштував суші?', 'Ты когда-нибудь пробовал суши?'],
  ['Have you ever been to London?', 'Ти коли-небудь був у Лондоні?', 'Ты когда-нибудь был в Лондоне?'],
  ['Have you ever seen snow in May?', 'Ти коли-небудь бачив сніг у травні?', 'Ты когда-нибудь видел снег в мае?'],
  ['Have you ever met a famous person?', 'Ти коли-небудь зустрічав відому людину?', 'Ты когда-нибудь встречал известного человека?'],
  ['Have you ever lost your phone?', 'Ти коли-небудь губив телефон?', 'Ты когда-нибудь терял телефон?'],
  ['Have you ever flown on a plane?', 'Ти коли-небудь літав літаком?', 'Ты когда-нибудь летал на самолёте?'],
  ['Have you ever broken a bone?', 'Ти коли-небудь ламав кістку?', 'Ты когда-нибудь ломал кость?'],
  ['Have you ever cooked dinner for your family?', 'Ти коли-небудь готував вечерю для сім’ї?', 'Ты когда-нибудь готовил ужин для семьи?'],
  ['Have you ever won a competition?', 'Ти коли-небудь вигравав змагання?', 'Ты когда-нибудь выигрывал соревнование?'],
  ['Have you ever forgotten someone’s birthday?', 'Ти коли-небудь забував про чийсь день народження?', 'Ты когда-нибудь забывал о чьём-то дне рождения?'],
  ['Have you ever ridden a horse?', 'Ти коли-небудь їздив верхи на коні?', 'Ты когда-нибудь ездил верхом на лошади?'],
  ['Have you ever slept in a tent?', 'Ти коли-небудь спав у наметі?', 'Ты когда-нибудь спал в палатке?'],
  ['Have you ever watched a film twice in one day?', 'Ти коли-небудь дивився фільм двічі за день?', 'Ты когда-нибудь смотрел фильм дважды за день?'],
  ['Have you ever spoken to a native speaker?', 'Ти коли-небудь розмовляв з носієм мови?', 'Ты когда-нибудь разговаривал с носителем языка?'],
  ['Have you ever been on TV?', 'Ти коли-небудь був на телебаченні?', 'Ты когда-нибудь был на телевидении?'],
  ['Has she ever visited Paris?', 'Вона коли-небудь була в Парижі?', 'Она когда-нибудь была в Париже?'],
  ['Has your dad ever cooked pancakes?', 'Твій тато коли-небудь пік млинці?', 'Твой папа когда-нибудь пёк блины?'],
  ['Have they ever played this game?', 'Вони коли-небудь грали в цю гру?', 'Они когда-нибудь играли в эту игру?'],
];
const HYE_ANS: [string, string, string][] = [
  ['Yes, I have. I tried it last summer.', 'Так. Я куштував минулого літа.', 'Да. Я пробовал прошлым летом.'],
  ['No, I haven’t. But I’d love to.', 'Ні. Але дуже хотів би.', 'Нет. Но очень хотел бы.'],
  ['No, never.', 'Ні, ніколи.', 'Нет, никогда.'],
  ['Yes, once. / Yes, twice. / Yes, many times.', 'Так, один раз. / Так, двічі. / Так, багато разів.', 'Да, один раз. / Да, дважды. / Да, много раз.'],
  ['I’ve never been to London.', 'Я ніколи не був у Лондоні.', 'Я никогда не был в Лондоне.'],
  ['Yes, she has. / No, she hasn’t.', 'Так, була. / Ні, не була.', 'Да, была. / Нет, не была.'],
];
const hye = (L: 'uk' | 'ru'): Guide => {
  const u = L === 'uk';
  const tr = (r: [string, string, string]) => [r[0], u ? r[1] : r[2]] as [string, string];
  return {
    title: u ? 'Have you ever: правило, приклади й вправи' : 'Have you ever: правило, примеры и упражнения',
    blocks: [
      { t: 'p', text: u ? '**Have you ever...?** перекладається як «Ти коли-небудь...?». Це питання в часі **Present Perfect** про життєвий досвід: чи траплялося це з людиною хоч раз у житті, без точної дати.' : '**Have you ever...?** переводится как «Ты когда-нибудь...?». Это вопрос во времени **Present Perfect** о жизненном опыте: случалось ли это с человеком хоть раз в жизни, без точной даты.' },
      { t: 'h2', text: u ? 'Як будується питання Have you ever' : 'Как строится вопрос Have you ever' },
      { t: 'table', head: u ? ['Хто', 'Питання', 'Приклад'] : ['Кто', 'Вопрос', 'Пример'], rows: [
        ['I / you / we / they', 'Have + … + ever + V3?', 'Have you ever tried sushi?'],
        ['he / she / it', 'Has + … + ever + V3?', 'Has she ever been to Paris?'],
      ] },
      { t: 'p', text: u ? 'V3 це третя форма дієслова: для правильних дієслів закінчення -ed (tried, visited, watched), неправильні треба знати: been, seen, eaten, flown. Усі форми є в [таблиці неправильних дієслів](/irregular-verbs).' : 'V3 это третья форма глагола: у правильных глаголов окончание -ed (tried, visited, watched), неправильные нужно знать: been, seen, eaten, flown. Все формы есть в [таблице неправильных глаголов](/irregular-verbs).' },
      { t: 'h2', text: u ? '18 прикладів питань Have you ever з перекладом' : '18 примеров вопросов Have you ever с переводом' },
      { t: 'ex', items: HYE_EX.map(tr) },
      { t: 'h2', text: u ? 'Як відповідати на Have you ever' : 'Как отвечать на Have you ever' },
      { t: 'ex', items: HYE_ANS.map(tr) },
      { t: 'p', text: u ? 'Якщо називаємо **коли саме** це сталося, переходимо в Past Simple: Have you ever been to Italy? Yes, I have. I **went** there in 2023. Present Perfect питає про досвід, Past Simple розповідає деталі.' : 'Если называем, **когда именно** это случилось, переходим в Past Simple: Have you ever been to Italy? Yes, I have. I **went** there in 2023. Present Perfect спрашивает об опыте, Past Simple рассказывает детали.' },
      { t: 'h2', text: u ? 'Ever, never, once, twice, many times' : 'Ever, never, once, twice, many times' },
      { t: 'table', head: u ? ['Слово', 'Значення', 'Приклад'] : ['Слово', 'Значение', 'Пример'], rows: [
        ['ever', u ? 'коли-небудь (у питанні)' : 'когда-нибудь (в вопросе)', 'Have you ever seen a whale?'],
        ['never', u ? 'ніколи (без not)' : 'никогда (без not)', 'I have never seen a whale.'],
        ['once / twice', u ? 'один раз / двічі' : 'один раз / дважды', 'I have been there twice.'],
        ['many times', u ? 'багато разів' : 'много раз', 'We have watched it many times.'],
        ['before', u ? 'раніше' : 'раньше', 'Have you done this before?'],
      ] },
      { t: 'h2', text: u ? 'Been чи gone: часта плутанина' : 'Been или gone: частая путаница' },
      { t: 'p', text: u ? '**Have you ever been to Spain?** означає «Ти коли-небудь був в Іспанії (і повернувся)?». **She has gone to Spain** означає «Вона поїхала в Іспанію (і зараз там)». У питаннях про досвід майже завжди потрібне **been**.' : '**Have you ever been to Spain?** значит «Ты когда-нибудь был в Испании (и вернулся)?». **She has gone to Spain** значит «Она уехала в Испанию (и сейчас там)». В вопросах об опыте почти всегда нужно **been**.' },
      { t: 'h2', text: u ? 'Типові помилки' : 'Типичные ошибки' },
      { t: 'table', head: u ? ['Неправильно', 'Правильно', 'Чому'] : ['Неправильно', 'Правильно', 'Почему'], rows: [
        ['Did you ever try sushi?', 'Have you ever tried sushi?', u ? 'досвід без дати = Present Perfect' : 'опыт без даты = Present Perfect'],
        ['Have you ever saw it?', 'Have you ever seen it?', u ? 'після have потрібна V3' : 'после have нужна V3'],
        ['I haven’t never been there.', 'I have never been there.', u ? 'never вже заперечення' : 'never уже отрицание'],
        ['Have you ever been in London last year?', 'Did you go to London last year?', u ? 'last year = Past Simple' : 'last year = Past Simple'],
        ['Has you ever...?', 'Have you ever...?', u ? 'has тільки з he, she, it' : 'has только с he, she, it'],
      ] },
      { t: 'quiz', title: u ? 'Вправа 1. Постав дієслово в правильну форму' : 'Упражнение 1. Поставь глагол в правильную форму', items: [
        ['Have you ever ___ (eat) octopus?', 'eaten'], ['Has he ever ___ (be) to Canada?', 'been'], ['Have you ever ___ (see) a ghost?', 'seen'],
        ['Have they ever ___ (play) chess?', 'played'], ['Have you ever ___ (fly) in a helicopter?', 'flown'], ['Has she ever ___ (write) a song?', 'written'],
        ['Have you ever ___ (lose) your keys?', 'lost'], ['Have you ever ___ (swim) in the ocean?', 'swum'],
      ] },
      { t: 'quiz', title: u ? 'Вправа 2. Переклади англійською' : 'Упражнение 2. Переведи на английский', items: u ? [
        ['Ти коли-небудь бачив веселку двічі за день?', 'Have you ever seen a rainbow twice in one day?'], ['Я ніколи не був у горах.', 'I have never been to the mountains.'],
        ['Вона коли-небудь вигравала приз?', 'Has she ever won a prize?'], ['Ми бачили цей фільм багато разів.', 'We have seen this film many times.'],
        ['Ти коли-небудь готував піцу? Так, минулого тижня.', 'Have you ever made pizza? Yes, I have. I made it last week.'],
      ] : [
        ['Ты когда-нибудь видел радугу дважды за день?', 'Have you ever seen a rainbow twice in one day?'], ['Я никогда не был в горах.', 'I have never been to the mountains.'],
        ['Она когда-нибудь выигрывала приз?', 'Has she ever won a prize?'], ['Мы видели этот фильм много раз.', 'We have seen this film many times.'],
        ['Ты когда-нибудь готовил пиццу? Да, на прошлой неделе.', 'Have you ever made pizza? Yes, I have. I made it last week.'],
      ] },
      { t: 'h2', text: u ? '20 питань Have you ever для розмови' : '20 вопросов Have you ever для разговора' },
      { t: 'ul', items: ['Have you ever been on a plane?', 'Have you ever eaten something really strange?', 'Have you ever lost something important?', 'Have you ever met someone famous?', 'Have you ever stayed up all night?', 'Have you ever been really scared?', 'Have you ever laughed at the wrong moment?', 'Have you ever cooked a meal for friends?', 'Have you ever broken something expensive?', 'Have you ever been late for something important?', 'Have you ever sung karaoke?', 'Have you ever seen a shooting star?', 'Have you ever helped a stranger?', 'Have you ever forgotten your homework?', 'Have you ever won a prize?', 'Have you ever been to a concert?', 'Have you ever tried an extreme sport?', 'Have you ever had a pet?', 'Have you ever cried at a film?', 'Have you ever written a letter by hand?'] },
      { t: 'p', text: u ? 'Порада вчителю: після кожної відповіді Yes ставте follow-up у Past Simple: When was it? Where were you? How did you feel? Так учень тренує обидва часи в живій розмові. Більше ідей у статті [розмовні теми з англійської мови](/blog/temy-dlya-rozmovy-anglijskoyu).' : 'Совет учителю: после каждого ответа Yes задавайте follow-up в Past Simple: When was it? Where were you? How did you feel? Так ученик тренирует оба времени в живом разговоре. Больше идей в статье [темы для разговора на английском](/blog/temy-dlya-rozmovy-anglijskoyu).' },
    ],
    faq: u ? [
      { q: 'Як перекласти Have you ever?', a: 'Have you ever...? означає «Ти коли-небудь...?». Наприклад, Have you ever been to Italy? означає «Ти коли-небудь був в Італії?».' },
      { q: 'Який час у питанні Have you ever?', a: 'Present Perfect: have або has, потім ever і третя форма дієслова (V3): Have you ever tried it?' },
      { q: 'Як коротко відповісти на Have you ever?', a: 'Yes, I have або No, I haven’t. Можна додати never: No, I’ve never tried it. Якщо називаєте дату, далі говоріть у Past Simple.' },
      { q: 'Чому не можна сказати Did you ever...?', a: 'У британській англійській для досвіду без дати вживають Present Perfect: Have you ever...? Did you ever... зустрічається в американській розмовній мові, але в школі й на НМТ правильна форма Have you ever.' },
    ] : [
      { q: 'Как перевести Have you ever?', a: 'Have you ever...? значит «Ты когда-нибудь...?». Например, Have you ever been to Italy? значит «Ты когда-нибудь был в Италии?».' },
      { q: 'Какое время в вопросе Have you ever?', a: 'Present Perfect: have или has, потом ever и третья форма глагола (V3): Have you ever tried it?' },
      { q: 'Как коротко ответить на Have you ever?', a: 'Yes, I have или No, I haven’t. Можно добавить never: No, I’ve never tried it. Если называете дату, дальше говорите в Past Simple.' },
      { q: 'Почему нельзя сказать Did you ever...?', a: 'В британском английском для опыта без даты используют Present Perfect: Have you ever...? Did you ever... встречается в американской разговорной речи, но в школе и на НМТ правильная форма Have you ever.' },
    ],
    links: [
      { href: '/irregular-verbs', label: u ? 'Таблиця неправильних дієслів (V3)' : 'Таблица неправильных глаголов (V3)' },
      { href: '/grammar', label: u ? 'Вся граматика з вправами' : 'Вся грамматика с упражнениями' },
      { href: '/blog/temy-dlya-rozmovy-anglijskoyu', label: u ? 'Розмовні теми з англійської мови' : 'Темы для разговора на английском' },
      { href: '/grammar-book/beginner/am-is-are', label: u ? 'Am, is, are: правило для початківців' : 'Am, is, are: правило для начинающих' },
    ],
  };
};

// ---------- am / is / are ----------
const be = (L: 'uk' | 'ru'): Guide => {
  const u = L === 'uk';
  const x = (en: string, uk: string, ru: string): [string, string] => [en, u ? uk : ru];
  return {
    title: u ? 'Am, is, are: правило, таблиця і вправи з відповідями' : 'Am, is, are: правило, таблица и упражнения с ответами',
    blocks: [
      { t: 'p', text: u ? '**Am, is, are** це три форми дієслова **to be** («бути») в теперішньому часі. Українською ми часто пропускаємо «є»: «Я учень», «Вона вдома». В англійській дієслово потрібне завжди: I **am** a student. She **is** at home.' : '**Am, is, are** это три формы глагола **to be** («быть») в настоящем времени. По-русски мы пропускаем «есть»: «Я ученик», «Она дома». В английском глагол нужен всегда: I **am** a student. She **is** at home.' },
      { t: 'h2', text: u ? 'Правило: коли am, коли is, коли are' : 'Правило: когда am, когда is, когда are' },
      { t: 'table', head: u ? ['Займенник', 'Форма', 'Коротко', 'Приклад'] : ['Местоимение', 'Форма', 'Кратко', 'Пример'], rows: [
        ['I', 'am', 'I’m', 'I am ten. / I’m ten.'],
        ['he / she / it', 'is', 'he’s, she’s, it’s', 'She is my sister.'],
        ['you / we / they', 'are', 'you’re, we’re, they’re', 'They are friends.'],
      ] },
      { t: 'p', text: u ? 'Просте правило для запам’ятовування: **I** завжди з **am**, **один** (he, she, it, my cat, Tom) з **is**, **багато** (we, they, my friends) і **you** з **are**. Навіть коли you це одна людина, все одно **you are**.' : 'Простое правило для запоминания: **I** всегда с **am**, **один** (he, she, it, my cat, Tom) с **is**, **много** (we, they, my friends) и **you** с **are**. Даже если you это один человек, всё равно **you are**.' },
      { t: 'h2', text: u ? 'Заперечення: am not, isn’t, aren’t' : 'Отрицание: am not, isn’t, aren’t' },
      { t: 'table', head: u ? ['Повна форма', 'Коротка форма', 'Приклад'] : ['Полная форма', 'Краткая форма', 'Пример'], rows: [
        ['I am not', 'I’m not', 'I’m not tired.'],
        ['he / she / it is not', 'isn’t', 'It isn’t cold.'],
        ['you / we / they are not', 'aren’t', 'We aren’t late.'],
      ] },
      { t: 'h2', text: u ? 'Питання й короткі відповіді' : 'Вопросы и краткие ответы' },
      { t: 'p', text: u ? 'Щоб запитати, ставимо am, is або are на початок: You are ready → **Are you** ready? Детально про питання в розділі [am, is, are у питаннях](/grammar-book/beginner/am-is-are-questions).' : 'Чтобы спросить, ставим am, is или are в начало: You are ready → **Are you** ready? Подробно о вопросах в разделе [am, is, are в вопросах](/grammar-book/beginner/am-is-are-questions).' },
      { t: 'ex', items: [x('Are you a student? Yes, I am. / No, I’m not.', 'Ти учень? Так. / Ні.', 'Ты ученик? Да. / Нет.'), x('Is she at home? Yes, she is. / No, she isn’t.', 'Вона вдома? Так. / Ні.', 'Она дома? Да. / Нет.'), x('Are they hungry? Yes, they are. / No, they aren’t.', 'Вони голодні? Так. / Ні.', 'Они голодные? Да. / Нет.'), x('Where is my phone? It’s on the table.', 'Де мій телефон? На столі.', 'Где мой телефон? На столе.'), x('How old are you? I’m twelve.', 'Скільки тобі років? Дванадцять.', 'Сколько тебе лет? Двенадцать.')] },
      { t: 'h2', text: u ? '20 речень з am, is, are з перекладом' : '20 предложений с am, is, are с переводом' },
      { t: 'ex', items: [
        x('I am happy today.', 'Я сьогодні щасливий.', 'Я сегодня счастлив.'), x('My name is Anna.', 'Мене звати Анна.', 'Меня зовут Анна.'), x('You are my best friend.', 'Ти мій найкращий друг.', 'Ты мой лучший друг.'),
        x('He is a doctor.', 'Він лікар.', 'Он врач.'), x('She is twelve years old.', 'Їй дванадцять років.', 'Ей двенадцать лет.'), x('It is very hot today.', 'Сьогодні дуже спекотно.', 'Сегодня очень жарко.'),
        x('We are in the park.', 'Ми в парку.', 'Мы в парке.'), x('They are from London.', 'Вони з Лондона.', 'Они из Лондона.'), x('My cat is black.', 'Мій кіт чорний.', 'Мой кот чёрный.'),
        x('My parents are at work.', 'Мої батьки на роботі.', 'Мои родители на работе.'), x('The book is on the table.', 'Книжка на столі.', 'Книга на столе.'), x('The shops are closed.', 'Магазини зачинені.', 'Магазины закрыты.'),
        x('I’m not hungry.', 'Я не голодний.', 'Я не голоден.'), x('She isn’t at school.', 'Її немає в школі.', 'Её нет в школе.'), x('We aren’t tired.', 'Ми не втомлені.', 'Мы не устали.'),
        x('This is my brother.', 'Це мій брат.', 'Это мой брат.'), x('These are my shoes.', 'Це мої черевики.', 'Это мои ботинки.'), x('English is easy!', 'Англійська легка!', 'Английский лёгкий!'),
        x('Tom and Lily are cousins.', 'Том і Лілі двоюрідні брат і сестра.', 'Том и Лили двоюродные брат и сестра.'), x('There is a cat in the garden.', 'У саду є кіт.', 'В саду есть кот.'),
      ] },
      { t: 'h2', text: u ? 'Типові помилки з am, is, are' : 'Типичные ошибки с am, is, are' },
      { t: 'table', head: u ? ['Неправильно', 'Правильно', 'Чому'] : ['Неправильно', 'Правильно', 'Почему'], rows: [
        ['I student.', 'I am a student.', u ? 'to be не пропускаємо' : 'to be не пропускаем'],
        ['She are happy.', 'She is happy.', u ? 'she = один, тому is' : 'she = один, поэтому is'],
        ['My friends is nice.', 'My friends are nice.', u ? 'friends = багато, тому are' : 'friends = много, поэтому are'],
        ['I amn’t tired.', 'I’m not tired.', u ? 'amn’t не існує' : 'amn’t не существует'],
        ['I am agree.', 'I agree.', u ? 'agree вже дієслово' : 'agree уже глагол'],
        ['You is late.', 'You are late.', u ? 'you завжди з are' : 'you всегда с are'],
      ] },
      { t: 'quiz', title: u ? 'Вправа 1. Встав am, is або are' : 'Упражнение 1. Вставь am, is или are', items: [
        ['I ___ at home.', 'am'], ['She ___ my teacher.', 'is'], ['We ___ in class 5.', 'are'], ['It ___ cold today.', 'is'], ['You ___ very kind.', 'are'],
        ['My dog ___ hungry.', 'is'], ['My grandparents ___ from Leeds.', 'are'], ['The milk ___ in the fridge.', 'is'], ['Tom and I ___ friends.', 'are'], ['I ___ not tired.', 'am'],
      ] },
      { t: 'quiz', title: u ? 'Вправа 2. Зроби речення заперечним' : 'Упражнение 2. Сделай предложение отрицательным', items: [
        ['He is at school.', 'He isn’t at school.'], ['I am hungry.', 'I’m not hungry.'], ['They are happy.', 'They aren’t happy.'], ['It is my bag.', 'It isn’t my bag.'], ['We are late.', 'We aren’t late.'],
      ] },
      { t: 'quiz', title: u ? 'Вправа 3. Переклади англійською' : 'Упражнение 3. Переведи на английский', items: u ? [
        ['Я учень.', 'I am a student. / I’m a student.'], ['Вона вдома?', 'Is she at home?'], ['Ми не втомлені.', 'We aren’t tired.'], ['Мої друзі в парку.', 'My friends are in the park.'], ['Скільки тобі років?', 'How old are you?'],
      ] : [
        ['Я ученик.', 'I am a student. / I’m a student.'], ['Она дома?', 'Is she at home?'], ['Мы не устали.', 'We aren’t tired.'], ['Мои друзья в парке.', 'My friends are in the park.'], ['Сколько тебе лет?', 'How old are you?'],
      ] },
    ],
    faq: u ? [
      { q: 'Коли вживати am, is, are?', a: 'Am тільки з I (I am). Is з he, she, it і з одним предметом чи людиною (my cat is). Are з you, we, they і з кількома (my friends are).' },
      { q: 'Чому you are, а не you is?', a: 'Так склалося історично: з you дієслово завжди у формі are, навіть коли ми говоримо до однієї людини.' },
      { q: 'Як сказати «я не» з am?', a: 'I am not або коротко I’m not. Форми amn’t немає. У питанні-хвостику кажуть aren’t I?: I’m late, aren’t I?' },
      { q: 'Чим відрізняється is і are у реченнях з there?', a: 'There is для одного предмета (There is a cat), there are для кількох (There are two cats).' },
    ] : [
      { q: 'Когда употреблять am, is, are?', a: 'Am только с I (I am). Is с he, she, it и с одним предметом или человеком (my cat is). Are с you, we, they и с несколькими (my friends are).' },
      { q: 'Почему you are, а не you is?', a: 'Так сложилось исторически: с you глагол всегда в форме are, даже когда мы говорим с одним человеком.' },
      { q: 'Как сказать «я не» с am?', a: 'I am not или кратко I’m not. Формы amn’t нет. В вопросе-хвостике говорят aren’t I?: I’m late, aren’t I?' },
      { q: 'Чем отличается is и are в предложениях с there?', a: 'There is для одного предмета (There is a cat), there are для нескольких (There are two cats).' },
    ],
    links: [
      { href: '/grammar-book/beginner/am-is-are-questions', label: u ? 'Am, is, are у питаннях' : 'Am, is, are в вопросах' },
      { href: '/grammar-book/beginner/was-were', label: 'Was / were' },
      { href: '/grammar-book/beginner/present-simple', label: 'Present Simple' },
      { href: '/lessons/gr-have-you-ever', label: u ? 'Have you ever: досвід англійською' : 'Have you ever: опыт на английском' },
      { href: '/blog/temy-dlya-rozmovy-anglijskoyu', label: u ? 'Розмовні теми з англійської мови' : 'Темы для разговора на английском' },
    ],
  };
};

export const GUIDES: Record<string, Both> = {
  'lesson:gr-have-you-ever': { uk: hye('uk'), ru: hye('ru') },
  'book:am-is-are': { uk: be('uk'), ru: be('ru') },
};
export function guideFor(key: string, lang: string): Guide | null {
  const g = GUIDES[key]; if (!g) return null;
  return lang === 'ru' ? g.ru : lang === 'uk' ? g.uk : null;
}
