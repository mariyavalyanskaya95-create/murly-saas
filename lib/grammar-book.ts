// Граматична книга Murly: розворот «сторінка правила + сторінка вправ».
// Порядок тем як у класичних підручниках A1-A2 і B1-B2, але тексти, приклади, вправи й картинки повністю наші.
// Перші 5 юнітів безкоштовні. Вправи пишемо у форматі lib/exercise.ts ([відповідь], {правильний|інший}).
import type { T } from './i18n';
import type { SectionType } from './exercise';

export type BookId = 'red' | 'blue';
export type Scene = 'be-family' | 'be-flip' | 'ing-motor' | 'ing-flip' | 'simple-thieves';
export type BookUnit = {
  n: number; slug: string; title: string; level: string; scene: Scene; free: boolean;
  topic: T;                 // коротко, про що юніт
  story: T;                 // смішна асоціація до картинки
  formula: { label: T; rows: [string, string][] }[]; // таблички: ліва частина / права частина
  rules: { h: T; p: T }[];  // коротко, 2-4 пункти
  examples: [string, T][];  // англійське речення + переклад
  traps: [string, string][]; // ✗ помилка / ✓ правильно
  exercises: { type: SectionType; title: T; instruction: string; text: string }[];
};

export const BOOKS: Record<BookId, { title: T; level: string; color: string; lead: T; ready: boolean }> = {
  red: {
    title: { uk: 'Червона книга', ru: 'Красная книга', en: 'Red book' }, level: 'A1-A2', color: 'tomato', ready: true,
    lead: { uk: 'Для початківців: to be, теперішні часи, минулий, питання. Сторінка правила і сторінка вправ.', ru: 'Для начинающих: to be, настоящие времена, прошедшее, вопросы. Страница правила и страница упражнений.', en: 'For beginners: to be, present tenses, the past, questions. A rule page and a practice page.' },
  },
  blue: {
    title: { uk: 'Синя книга', ru: 'Синяя книга', en: 'Blue book' }, level: 'B1-B2', color: 'sky', ready: false,
    lead: { uk: 'Для тих, хто вже говорить: усі часи, умовні, пасив, модальні. Готуємо після червоної.', ru: 'Для тех, кто уже говорит: все времена, условные, пассив, модальные. Готовим после красной.', en: 'For those who already speak: all tenses, conditionals, passive, modals. Coming after the red book.' },
  },
};

export const RED: BookUnit[] = [
  {
    n: 1, slug: 'am-is-are', title: 'am / is / are', level: 'A1', scene: 'be-family', free: true,
    topic: { uk: 'Дієслово to be: я є, він є, вони є', ru: 'Глагол to be: я есть, он есть, они есть', en: 'The verb to be' },
    story: {
      uk: 'Знайомтеся, родина кульок BE. Am одинак: він дружить тільки з I. Is тримається за руки з he, she та it. А Are найкомпанійніший: бере з собою всіх інших, you, we і they. Хто з ким дружить, той з тим і ходить у реченні.',
      ru: 'Знакомьтесь, семья шариков BE. Am одиночка: он дружит только с I. Is держится за руки с he, she и it. А Are самый компанейский: берёт с собой всех остальных, you, we и they. Кто с кем дружит, тот с тем и ходит в предложении.',
      en: 'Meet the BE family. Am is a loner: he is friends only with I. Is holds hands with he, she and it. Are is the friendliest one and takes everybody else: you, we and they.',
    },
    formula: [
      { label: { uk: 'Ствердження', ru: 'Утверждение', en: 'Positive' }, rows: [['I', 'am (I’m)'], ['he / she / it', 'is (he’s, she’s, it’s)'], ['you / we / they', 'are (you’re, we’re, they’re)']] },
      { label: { uk: 'Заперечення', ru: 'Отрицание', en: 'Negative' }, rows: [['I', 'am not (I’m not)'], ['he / she / it', 'is not (isn’t)'], ['you / we / they', 'are not (aren’t)']] },
    ],
    rules: [
      { h: { uk: 'Без «є» речення падає', ru: 'Без «есть» предложение падает', en: 'No sentence without it' }, p: { uk: 'Українською ми кажемо «Я учень», без «є». Англійською так не можна: I am a student. Am, is або are стоїть майже в кожному простому реченні про те, хто ти, який ти і де ти.', ru: 'По-русски мы говорим «Я ученик», без «есть». По-английски так нельзя: I am a student. Am, is или are стоит почти в каждом простом предложении о том, кто ты, какой ты и где ты.', en: 'In English you cannot skip it: I am a student, not “I student”.' } },
      { h: { uk: 'Один предмет = is, багато = are', ru: 'Один предмет = is, много = are', en: 'One thing = is, many = are' }, p: { uk: 'My cat is hungry. My cats are hungry. Якщо замість імені можна сказати he, she чи it, ставимо is. Якщо they, ставимо are.', ru: 'My cat is hungry. My cats are hungry. Если вместо имени можно сказать he, she или it, ставим is. Если they, ставим are.', en: 'If you can say he, she or it, use is. If you can say they, use are.' } },
      { h: { uk: 'Короткі форми', ru: 'Краткие формы', en: 'Short forms' }, p: { uk: 'У розмові кажемо коротко: I’m, she’s, they’re, isn’t, aren’t. Але I am not скорочуємо тільки до I’m not.', ru: 'В разговоре говорим коротко: I’m, she’s, they’re, isn’t, aren’t. Но I am not сокращаем только до I’m not.', en: 'In speech we use short forms. I am not only becomes I’m not.' } },
    ],
    examples: [
      ['I’m twelve.', { uk: 'Мені дванадцять.', ru: 'Мне двенадцать.' }],
      ['My mum is a doctor.', { uk: 'Моя мама лікарка.', ru: 'Моя мама врач.' }],
      ['We’re in the park.', { uk: 'Ми в парку.', ru: 'Мы в парке.' }],
      ['It isn’t cold today.', { uk: 'Сьогодні не холодно.', ru: 'Сегодня не холодно.' }],
      ['They aren’t at home.', { uk: 'Їх немає вдома.', ru: 'Их нет дома.' }],
    ],
    traps: [['I student.', 'I am a student.'], ['She are happy.', 'She is happy.'], ['I amn’t tired.', 'I’m not tired.']],
    exercises: [
      { type: 'choice', title: { uk: 'Хто з ким дружить?', ru: 'Кто с кем дружит?', en: 'Who goes with whom?' }, instruction: 'Choose am, is or are.', text: 'I {am|is|are} hungry.\nMy brother {is|am|are} ten.\nWe {are|is|am} friends.\nThe pizza {is|are|am} hot.\nYou {are|is|am} late!\nMy shoes {are|is|am} new.\nIt {is|are|am} Monday today.\nTom and Kate {are|is|am} at school.' },
      { type: 'gap', title: { uk: 'Впиши am, is або are', ru: 'Впиши am, is или are', en: 'Write am, is or are' }, instruction: 'Write am, is or are.', text: 'My name [is] Anna.\nI [am] from Kyiv.\nMy dog [is] black and white.\nMy parents [are] at work.\nThis game [is] really funny.\nMax and I [are] in the same class.' },
      { type: 'gap', title: { uk: 'Скажи «ні»', ru: 'Скажи «нет»', en: 'Make it negative' }, instruction: 'Write the negative. Use short forms.', text: 'I’m tired. → [I’m not tired/I am not tired].\nShe’s at home. → [She isn’t at home/She is not at home/She’s not at home].\nThey’re hungry. → [They aren’t hungry/They are not hungry/They’re not hungry].\nIt’s my phone. → [It isn’t my phone/It is not my phone/It’s not my phone].\nWe’re late. → [We aren’t late/We are not late/We’re not late].' },
      { type: 'truefalse', title: { uk: 'Правда про тебе?', ru: 'Правда о тебе?', en: 'True for the grammar?' }, instruction: 'Is the sentence correct? True or False.', text: 'She is my best friend. = True\nI is ready. = False\nMy cats is hungry. = False\nWe are in the kitchen. = True' },
    ],
  },
  {
    n: 2, slug: 'am-is-are-questions', title: 'am / is / are (questions)', level: 'A1', scene: 'be-flip', free: true,
    topic: { uk: 'Питання з to be: Are you…? Is it…?', ru: 'Вопросы с to be: Are you…? Is it…?', en: 'Questions with to be' },
    story: {
      uk: 'У питанні кульки BE роблять сальто і стрибають наперед. You are ready. Хоп! Are you ready? Головне правило питання: хто стрибнув першим, той і питає.',
      ru: 'В вопросе шарики BE делают сальто и прыгают вперёд. You are ready. Хоп! Are you ready? Главное правило вопроса: кто прыгнул первым, тот и спрашивает.',
      en: 'In a question the BE balls do a somersault and jump to the front: You are ready → Are you ready?',
    },
    formula: [
      { label: { uk: 'Питання', ru: 'Вопрос', en: 'Question' }, rows: [['Am', 'I …?'], ['Is', 'he / she / it …?'], ['Are', 'you / we / they …?']] },
      { label: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answer' }, rows: [['Yes, I am.', 'No, I’m not.'], ['Yes, she is.', 'No, she isn’t.'], ['Yes, they are.', 'No, they aren’t.']] },
    ],
    rules: [
      { h: { uk: 'Сальто вперед', ru: 'Сальто вперёд', en: 'Jump to the front' }, p: { uk: 'It is cold → Is it cold? Слова ті самі, просто am, is чи are стає першим.', ru: 'It is cold → Is it cold? Слова те же, просто am, is или are становится первым.', en: 'The words stay the same, the verb goes first.' } },
      { h: { uk: 'Питальні слова ще раніше', ru: 'Вопросительные слова ещё раньше', en: 'Question words go first' }, p: { uk: 'Where, what, how old, who стоять перед кулькою: Where is my bag? How old are you?', ru: 'Where, what, how old, who стоят перед шариком: Where is my bag? How old are you?', en: 'Where is my bag? How old are you?' } },
      { h: { uk: 'Yes без скорочень', ru: 'Yes без сокращений', en: 'No short form after Yes' }, p: { uk: 'Кажемо Yes, I am. Не можна Yes, I’m. А після No скорочуємо: No, I’m not.', ru: 'Говорим Yes, I am. Нельзя Yes, I’m. А после No сокращаем: No, I’m not.', en: 'Say Yes, I am, not Yes, I’m.' } },
    ],
    examples: [
      ['Are you hungry? Yes, I am.', { uk: 'Ти голодний? Так.', ru: 'Ты голоден? Да.' }],
      ['Is it your phone? No, it isn’t.', { uk: 'Це твій телефон? Ні.', ru: 'Это твой телефон? Нет.' }],
      ['Where is the cat?', { uk: 'Де кіт?', ru: 'Где кот?' }],
      ['How old is your sister?', { uk: 'Скільки років твоїй сестрі?', ru: 'Сколько лет твоей сестре?' }],
    ],
    traps: [['You are ready?', 'Are you ready?'], ['Where the toilet is?', 'Where is the toilet?'], ['Yes, I’m.', 'Yes, I am.']],
    exercises: [
      { type: 'choice', title: { uk: 'Хто стрибає першим?', ru: 'Кто прыгает первым?', en: 'Which one jumps first?' }, instruction: 'Choose the correct question.', text: '{Are you tired?|You are tired?|Is you tired?}\n{Is it cold today?|It is cold today?|Are it cold today?}\n{Where is my bag?|Where my bag is?|Where are my bag?}\n{Are they your friends?|They are your friends?|Is they your friends?}\n{How old are you?|How old you are?|How are you old?}' },
      { type: 'gap', title: { uk: 'Зроби питання', ru: 'Сделай вопрос', en: 'Make a question' }, instruction: 'Write Am, Is or Are.', text: '[Are] you from Lviv?\n[Is] your dad at home?\n[Am] I late?\n[Are] the children in the garden?\n[Is] this your pen?\nWhere [are] my keys?' },
      { type: 'choice', title: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answers' }, instruction: 'Choose the correct short answer.', text: 'Are you a student? Yes, {I am|I’m|I is}.\nIs she your teacher? No, {she isn’t|she not|she aren’t}.\nAre they at school? Yes, {they are|they’re|they is}.\nIs it your cat? No, {it isn’t|it not|it aren’t}.\nAre you cold? No, {I’m not|I amn’t|I not}.' },
      { type: 'gap', title: { uk: 'Склади питання зі слів', ru: 'Составь вопрос из слов', en: 'Put the words in order' }, instruction: 'Write the question.', text: 'you / are / happy → [Are you happy?]\nis / where / the cat → [Where is the cat?]\nyour brother / is / ten → [Is your brother ten?]\nare / how / you → [How are you?]' },
    ],
  },
  {
    n: 3, slug: 'present-continuous', title: 'I am doing (present continuous)', level: 'A1', scene: 'ing-motor', free: true,
    topic: { uk: 'Що відбувається прямо зараз', ru: 'Что происходит прямо сейчас', en: 'What is happening right now' },
    story: {
      uk: 'Закінчення -ing це моторчик. Чіпляєш його до дієслова, і дія мчить прямо зараз: playing, reading, eating. Але моторчик сам не їде, йому потрібен водій: am, is або are. Немає водія, немає поїздки!',
      ru: 'Окончание -ing это моторчик. Цепляешь его к глаголу, и действие мчится прямо сейчас: playing, reading, eating. Но моторчик сам не едет, ему нужен водитель: am, is или are. Нет водителя, нет поездки!',
      en: 'The -ing ending is a little motor: the action is running right now. But the motor needs a driver: am, is or are.',
    },
    formula: [
      { label: { uk: 'Водій + дієслово з моторчиком', ru: 'Водитель + глагол с моторчиком', en: 'Driver + verb with the motor' }, rows: [['I', 'am (’m) playing'], ['he / she / it', 'is (’s) playing'], ['you / we / they', 'are (’re) playing']] },
      { label: { uk: 'Як чіпляти -ing', ru: 'Как цеплять -ing', en: 'Spelling' }, rows: [['read → reading', 'просто + ing'], ['make → making', 'e зникає'], ['swim → swimming', 'подвоюємо букву'], ['lie → lying', 'ie → y']] },
    ],
    rules: [
      { h: { uk: 'Прямо зараз', ru: 'Прямо сейчас', en: 'Right now' }, p: { uk: 'Дія вже почалась і ще не закінчилась: Look! It’s snowing. Підказки: now, at the moment, look!, listen!', ru: 'Действие уже началось и ещё не закончилось: Look! It’s snowing. Подсказки: now, at the moment, look!, listen!', en: 'The action is in progress: Look! It’s snowing.' } },
      { h: { uk: 'Ці дні, цей тиждень', ru: 'Эти дни, эта неделя', en: 'These days' }, p: { uk: 'Можна й про те, що триває зараз у житті, хоч і не в цю секунду: I’m reading a great book this week.', ru: 'Можно и о том, что длится сейчас в жизни, хоть и не в эту секунду: I’m reading a great book this week.', en: 'Also for things happening around now: I’m reading a great book this week.' } },
      { h: { uk: 'Заперечення', ru: 'Отрицание', en: 'Negative' }, p: { uk: 'Водій каже not: I’m not sleeping. She isn’t watching TV. They aren’t listening.', ru: 'Водитель говорит not: I’m not sleeping. She isn’t watching TV. They aren’t listening.', en: 'I’m not sleeping. She isn’t watching TV.' } },
    ],
    examples: [
      ['Shh! The baby is sleeping.', { uk: 'Тсс! Малюк спить.', ru: 'Тсс! Малыш спит.' }],
      ['I’m doing my homework now.', { uk: 'Я зараз роблю домашку.', ru: 'Я сейчас делаю домашку.' }],
      ['Look! Our cat is dancing.', { uk: 'Дивись! Наш кіт танцює.', ru: 'Смотри! Наш кот танцует.' }],
      ['We aren’t playing, we’re working.', { uk: 'Ми не граємося, ми працюємо.', ru: 'Мы не играем, мы работаем.' }],
    ],
    traps: [['She reading.', 'She is reading.'], ['I am play now.', 'I am playing now.'], ['He is swiming.', 'He is swimming.']],
    exercises: [
      { type: 'gap', title: { uk: 'Причепи моторчик', ru: 'Прицепи моторчик', en: 'Add the motor' }, instruction: 'Write the -ing form.', text: 'play → [playing]\nmake → [making]\nswim → [swimming]\nwrite → [writing]\nrun → [running]\nlie → [lying]\nsit → [sitting]\nwatch → [watching]' },
      { type: 'gap', title: { uk: 'Що відбувається?', ru: 'Что происходит?', en: 'What is happening?' }, instruction: 'Put the verbs in brackets into the present continuous.', text: 'Look! It [is snowing/’s snowing] (snow).\nShh! Grandma [is sleeping/’s sleeping] (sleep).\nI [am eating/’m eating] (eat) a sandwich.\nThe kids [are playing/’re playing] (play) in the garden.\nWe [are watching/’re watching] (watch) a cartoon.\nMy phone [is ringing/’s ringing] (ring)!' },
      { type: 'choice', title: { uk: 'Без водія не можна', ru: 'Без водителя нельзя', en: 'Don’t forget the driver' }, instruction: 'Choose the correct sentence.', text: '{She is cooking dinner.|She cooking dinner.|She is cook dinner.}\n{They aren’t listening.|They not listening.|They isn’t listening.}\n{I’m not sleeping.|I amn’t sleeping.|I not sleeping.}\n{Tom is running.|Tom is runing.|Tom running.}' },
      { type: 'gap', title: { uk: 'Скажи «ні»', ru: 'Скажи «нет»', en: 'Make it negative' }, instruction: 'Write the negative. Use short forms.', text: 'I’m crying. → [I’m not crying/I am not crying].\nHe’s working. → [He isn’t working/He is not working/He’s not working].\nWe’re dancing. → [We aren’t dancing/We are not dancing/We’re not dancing].\nIt’s raining. → [It isn’t raining/It is not raining/It’s not raining].' },
    ],
  },
  {
    n: 4, slug: 'present-continuous-questions', title: 'are you doing? (questions)', level: 'A1', scene: 'ing-flip', free: true,
    topic: { uk: 'Питання: що ти зараз робиш?', ru: 'Вопросы: что ты сейчас делаешь?', en: 'Questions: what are you doing?' },
    story: {
      uk: 'Пам’ятаєш сальто? Тепер водій am, is чи are стрибає вперед, а моторчик -ing лишається біля дієслова й чекає. You are sleeping → Are you sleeping? Моторчик нікуди не стрибає.',
      ru: 'Помнишь сальто? Теперь водитель am, is или are прыгает вперёд, а моторчик -ing остаётся у глагола и ждёт. You are sleeping → Are you sleeping? Моторчик никуда не прыгает.',
      en: 'Remember the somersault? The driver jumps to the front and the -ing motor stays with the verb: Are you sleeping?',
    },
    formula: [
      { label: { uk: 'Питання', ru: 'Вопрос', en: 'Question' }, rows: [['Am', 'I playing?'], ['Is', 'he / she / it playing?'], ['Are', 'you / we / they playing?']] },
      { label: { uk: 'Питальні слова', ru: 'Вопросительные слова', en: 'Question words' }, rows: [['What', 'are you doing?'], ['Where', 'is she going?'], ['Why', 'are you laughing?']] },
    ],
    rules: [
      { h: { uk: 'Водій вперед', ru: 'Водитель вперёд', en: 'The driver goes first' }, p: { uk: 'She is singing → Is she singing? Дієслово з -ing лишається на місці.', ru: 'She is singing → Is she singing? Глагол с -ing остаётся на месте.', en: 'Is she singing?' } },
      { h: { uk: 'Короткі відповіді', ru: 'Краткие ответы', en: 'Short answers' }, p: { uk: 'Відповідаємо водієм, без -ing: Are you working? Yes, I am. / No, I’m not.', ru: 'Отвечаем водителем, без -ing: Are you working? Yes, I am. / No, I’m not.', en: 'Are you working? Yes, I am. / No, I’m not.' } },
      { h: { uk: 'Найпопулярніше питання', ru: 'Самый популярный вопрос', en: 'The most useful question' }, p: { uk: 'What are you doing? Що ти робиш? Його чують щодня і вдома, і в чаті.', ru: 'What are you doing? Что ты делаешь? Его слышат каждый день и дома, и в чате.', en: 'What are you doing?' } },
    ],
    examples: [
      ['Are you listening to me?', { uk: 'Ти мене слухаєш?', ru: 'Ты меня слушаешь?' }],
      ['Is it raining? No, it isn’t.', { uk: 'Іде дощ? Ні.', ru: 'Идёт дождь? Нет.' }],
      ['What are you doing?', { uk: 'Що ти робиш?', ru: 'Что ты делаешь?' }],
      ['Where are they going?', { uk: 'Куди вони йдуть?', ru: 'Куда они идут?' }],
    ],
    traps: [['You are going home?', 'Are you going home?'], ['What you are doing?', 'What are you doing?'], ['Is she cooking? Yes, she cooking.', 'Yes, she is.']],
    exercises: [
      { type: 'gap', title: { uk: 'Водій вперед', ru: 'Водитель вперёд', en: 'Driver first' }, instruction: 'Write Am, Is or Are.', text: '[Are] you sleeping?\n[Is] your mum cooking?\n[Are] the dogs barking?\n[Am] I talking too loudly?\n[Is] it snowing?' },
      { type: 'gap', title: { uk: 'Склади питання', ru: 'Составь вопрос', en: 'Make questions' }, instruction: 'Write the question.', text: 'you / play / a game → [Are you playing a game?]\nshe / watch / TV → [Is she watching TV?]\nthey / have / fun → [Are they having fun?]\nwhat / you / do → [What are you doing?]\nwhere / he / go → [Where is he going?]' },
      { type: 'choice', title: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answers' }, instruction: 'Choose the correct short answer.', text: 'Are you working? Yes, {I am|I’m|I working}.\nIs he sleeping? No, {he isn’t|he not|he doesn’t}.\nAre they coming? Yes, {they are|they’re|they coming}.\nIs it raining? No, {it isn’t|it not|it aren’t}.' },
      { type: 'match', title: { uk: 'Питання і відповідь', ru: 'Вопрос и ответ', en: 'Match' }, instruction: 'Match the questions with the answers.', text: 'What are you doing? = I’m reading a comic.\nWhere is Mum going? = To the shop.\nWhy are you laughing? = Because the cat is so funny!\nAre you coming? = Yes, wait a minute!' },
    ],
  },
  {
    n: 5, slug: 'present-simple', title: 'I do / work / like (present simple)', level: 'A1', scene: 'simple-thieves', free: true,
    topic: { uk: 'Звички, розклад, факти', ru: 'Привычки, расписание, факты', en: 'Habits, timetables, facts' },
    story: {
      uk: 'Present Simple схожий на сімпл-дімпл: натискаєш ті самі кнопочки знову і знову. Так і з цим часом: те, що повторюється, звички, розклад і факти. I, you, we, they чесні кульки, беруть дієслово як є: I play. А he, she, it маленькі злодюжки: хотіли вкрасти долари, а вкрали букву S! Тепер мусять чіпляти її до дієслова: he plays, she likes, it works.',
      ru: 'Present Simple похож на симпл-димпл: нажимаешь те же кнопочки снова и снова. Так и с этим временем: то, что повторяется, привычки, расписание и факты. I, you, we, they честные шарики, берут глагол как есть: I play. А he, she, it маленькие воришки: хотели украсть доллары, а украли букву S! Теперь им приходится цеплять её к глаголу: he plays, she likes, it works.',
      en: 'Present Simple is like a simple dimple toy: you press the same buttons again and again. He, she and it are little thieves: they wanted to steal dollars but stole the letter S, so now they add it to the verb.',
    },
    formula: [
      { label: { uk: '+  Ствердження', ru: '+  Утверждение', en: '+  Positive' }, rows: [['I / you / we / they', 'play'], ['he / she / it', 'plays']] },
      { label: { uk: '−  Заперечення', ru: '−  Отрицание', en: '−  Negative' }, rows: [['I / you / we / they', 'don’t play'], ['he / she / it', 'doesn’t play']] },
      { label: { uk: '?  Питання', ru: '?  Вопрос', en: '?  Question' }, rows: [['Do', 'I / you / we / they play?'], ['Does', 'he / she / it play?']] },
    ],
    rules: [
      { h: { uk: 'Злодюжки і буква S', ru: 'Воришки и буква S', en: 'The thieves and the S' }, p: { uk: 'Після he, she, it дієслово отримує -s: works, likes. Після -s, -sh, -ch, -x, -o додаємо -es: watches, goes. Приголосна + y стає -ies: study → studies. Have стає has.', ru: 'После he, she, it глагол получает -s: works, likes. После -s, -sh, -ch, -x, -o добавляем -es: watches, goes. Согласная + y становится -ies: study → studies. Have становится has.', en: 'He works, she watches, it goes, he studies, she has.' } },
      { h: { uk: 'Поліцейський do / does', ru: 'Полицейский do / does', en: 'Officer do / does' }, p: { uk: 'У запереченні й питанні приходить помічник do. Злодюжки віддають йому вкрадену S: does = do + es. Тому дієслово знову без S: He doesn’t play. Does she like pizza?', ru: 'В отрицании и вопросе приходит помощник do. Воришки отдают ему украденную S: does = do + es. Поэтому глагол снова без S: He doesn’t play. Does she like pizza?', en: 'In negatives and questions do arrives. The thieves give the S back: does. So the verb has no S: He doesn’t play.' } },
      { h: { uk: 'Слова-підказки', ru: 'Слова-подсказки', en: 'Signal words' }, p: { uk: 'every day, usually, always, often, sometimes, never, on Mondays.', ru: 'every day, usually, always, often, sometimes, never, on Mondays.', en: 'every day, usually, always, often, sometimes, never, on Mondays.' } },
    ],
    examples: [
      ['I play football on Saturdays.', { uk: 'Я граю у футбол по суботах.', ru: 'Я играю в футбол по субботам.' }],
      ['My sister watches cartoons every evening.', { uk: 'Моя сестра щовечора дивиться мультики.', ru: 'Моя сестра каждый вечер смотрит мультики.' }],
      ['He doesn’t like broccoli.', { uk: 'Він не любить броколі.', ru: 'Он не любит брокколи.' }],
      ['Does your cat sleep a lot? Yes, it does.', { uk: 'Твій кіт багато спить? Так.', ru: 'Твой кот много спит? Да.' }],
    ],
    traps: [['She play tennis.', 'She plays tennis.'], ['He doesn’t plays.', 'He doesn’t play.'], ['Does she likes it?', 'Does she like it?']],
    exercises: [
      { type: 'gap', title: { uk: 'Злодюжки беруть S', ru: 'Воришки берут S', en: 'The thieves take the S' }, instruction: 'Write the he / she / it form.', text: 'play → he [plays]\nwatch → she [watches]\ngo → it [goes]\nstudy → he [studies]\nhave → she [has]\nwash → he [washes]\nlike → she [likes]\nfly → it [flies]' },
      { type: 'gap', title: { uk: 'Розкрий дужки', ru: 'Раскрой скобки', en: 'Open the brackets' }, instruction: 'Put the verbs in brackets into the present simple.', text: 'My dad [drinks] (drink) coffee every morning.\nWe [go] (go) to school by bus.\nThe shop [opens] (open) at nine.\nMy cats [sleep] (sleep) all day.\nAnna [speaks] (speak) three languages.\nI [love] (love) pancakes.' },
      { type: 'choice', title: { uk: 'Don’t чи doesn’t?', ru: 'Don’t или doesn’t?', en: 'Don’t or doesn’t?' }, instruction: 'Choose the correct form.', text: 'I {don’t|doesn’t} like rain.\nShe {doesn’t|don’t} eat meat.\nThey {don’t|doesn’t} live here.\nMy brother {doesn’t|don’t} play the guitar.\nWe {don’t|doesn’t} have a car.\nIt {doesn’t|don’t} work.' },
      { type: 'choice', title: { uk: 'Поліцейський не любить зайву S', ru: 'Полицейский не любит лишнюю S', en: 'No extra S after does' }, instruction: 'Choose the correct question.', text: '{Does she like pizza?|Does she likes pizza?|Do she like pizza?}\n{Do you play chess?|Does you play chess?|Do you plays chess?}\n{Does it rain a lot here?|Do it rain a lot here?|Does it rains a lot here?}\n{Do they speak English?|Does they speak English?|Do they speaks English?}' },
    ],
  },
];

export const BOOK_UNITS: Record<BookId, BookUnit[]> = { red: RED, blue: [] };
// Що буде далі в червоній книзі (поки «скоро»)
export const RED_NEXT: { n: number; title: string }[] = [
  { n: 6, title: 'I don’t… (present simple negative)' }, { n: 7, title: 'Do you…? (present simple questions)' },
  { n: 8, title: 'I am doing and I do' }, { n: 9, title: 'I have… / I’ve got…' }, { n: 10, title: 'was / were' },
  { n: 11, title: 'worked / got / went (past simple)' }, { n: 12, title: 'I didn’t… Did you…?' },
];
export const getUnit = (book: string, slug: string) => (BOOK_UNITS[book as BookId] ?? []).find((u) => u.slug === slug);
