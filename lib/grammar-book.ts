// Граматична книга: розворот «сторінка правила + сторінка вправ».
// Порядок тем як у класичних підручниках A1-A2 і B1-B2, але тексти, приклади, вправи й картинки повністю наші.
// Перші 5 юнітів безкоштовні. Вправи пишемо у форматі lib/exercise.ts ([відповідь], {правильний|інший}).
import type { T } from './i18n';
import type { SectionType } from './exercise';

export type BookId = 'beginner' | 'intermediate';
export type Scene = 'be-family' | 'be-flip' | 'ing-motor' | 'ing-flip' | 'simple-thieves' | 'police-do' | 'do-flip' | 'now-vs-always' | 'backpack' | 'time-machine';
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
  beginner: {
    title: { uk: 'Beginner: для початківців', ru: 'Beginner: для начинающих', en: 'Beginner' }, level: 'A1-A2', color: 'tomato', ready: true,
    lead: { uk: 'Перші кроки: to be, теперішні часи, минулий час, питання. Сторінка правила і сторінка вправ.', ru: 'Первые шаги: to be, настоящие времена, прошедшее время, вопросы. Страница правила и страница упражнений.', en: 'First steps: to be, present tenses, the past, questions. A rule page and a practice page.' },
  },
  intermediate: {
    title: { uk: 'Intermediate: для тих, хто вже говорить', ru: 'Intermediate: для тех, кто уже говорит', en: 'Intermediate' }, level: 'B1-B2', color: 'sky', ready: false,
    lead: { uk: 'Усі часи, умовні речення, пасив, модальні дієслова. Готуємо після першої книги.', ru: 'Все времена, условные предложения, пассив, модальные глаголы. Готовим после первой книги.', en: 'All tenses, conditionals, passive, modals. Coming after the first book.' },
  },
};

export const RED: BookUnit[] = [
  {
    n: 1, slug: 'am-is-are', title: 'am / is / are', level: 'A1', scene: 'be-family', free: true,
    topic: { uk: 'Як сказати «я учень», «вона вдома»', ru: 'Как сказать «я ученик», «она дома»', en: 'How to say who and where you are' },
    story: { uk: 'Знайомтеся, родина кульок BE. Am дружить тільки з I. Is дружить з he, she та it. А Are любить компанію і ходить з усіма іншими: you, we, they. Запам’ятай, хто з ким дружить, і помилок не буде.', ru: 'Знакомьтесь, семья шариков BE. Am дружит только с I. Is дружит с he, she и it. А Are любит компанию и ходит со всеми остальными: you, we, they. Запомни, кто с кем дружит, и ошибок не будет.', en: 'Meet the BE family. Am is friends only with I. Is goes with he, she and it. Are loves company and goes with you, we and they.' },
    formula: [
      { label: { uk: 'Ствердження', ru: 'Утверждение', en: 'Positive' }, rows: [['I', 'am (I’m)'], ['he / she / it', 'is (he’s, she’s, it’s)'], ['you / we / they', 'are (you’re, we’re, they’re)']] },
      { label: { uk: 'Заперечення', ru: 'Отрицание', en: 'Negative' }, rows: [['I', 'am not (I’m not)'], ['he / she / it', 'is not (isn’t)'], ['you / we / they', 'are not (aren’t)']] },
    ],
    rules: [
      { h: { uk: 'В англійській «є» не пропускаємо', ru: 'В английском «есть» не пропускаем', en: 'Never skip it' }, p: { uk: 'Ми кажемо просто «Я учень». Англійською так не можна, потрібне am, is або are: I am a student. Вона вдома: She is at home.', ru: 'Мы говорим просто «Я ученик». По-английски так нельзя, нужно am, is или are: I am a student. Она дома: She is at home.', en: 'I am a student. She is at home.' } },
      { h: { uk: 'Один = is, багато = are', ru: 'Один = is, много = are', en: 'One = is, many = are' }, p: { uk: 'Кіт голодний: The cat is hungry. Коти голодні: The cats are hungry.', ru: 'Кот голодный: The cat is hungry. Коты голодные: The cats are hungry.', en: 'The cat is hungry. The cats are hungry.' } },
      { h: { uk: 'Коротко в розмові', ru: 'Коротко в разговоре', en: 'Short forms' }, p: { uk: 'Зазвичай кажуть коротко: I’m, she’s, we’re. «Ні» теж коротко: isn’t, aren’t. Але з I тільки I’m not.', ru: 'Обычно говорят коротко: I’m, she’s, we’re. «Нет» тоже коротко: isn’t, aren’t. Но с I только I’m not.', en: 'I’m, she’s, we’re, isn’t, aren’t. But only I’m not.' } },
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
      { type: 'truefalse', title: { uk: 'Правильно чи ні?', ru: 'Правильно или нет?', en: 'Right or wrong?' }, instruction: 'Is the sentence correct? True or False.', text: 'She is my best friend. = True\nI is ready. = False\nMy cats is hungry. = False\nWe are in the kitchen. = True' },
    ],
  },
  {
    n: 2, slug: 'am-is-are-questions', title: 'am / is / are (questions)', level: 'A1', scene: 'be-flip', free: true,
    topic: { uk: 'Як запитати: ти готовий? це твій?', ru: 'Как спросить: ты готов? это твоё?', en: 'How to ask: are you ready?' },
    story: { uk: 'Щоб запитати, кулька BE робить сальто і стрибає на початок речення. You are ready. Хоп! Are you ready? Хто стрибнув першим, той і питає.', ru: 'Чтобы спросить, шарик BE делает сальто и прыгает в начало предложения. You are ready. Хоп! Are you ready? Кто прыгнул первым, тот и спрашивает.', en: 'To ask a question, the BE ball jumps to the front: You are ready → Are you ready?' },
    formula: [
      { label: { uk: 'Питання', ru: 'Вопрос', en: 'Question' }, rows: [['Am', 'I …?'], ['Is', 'he / she / it …?'], ['Are', 'you / we / they …?']] },
      { label: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answer' }, rows: [['Yes, I am.', 'No, I’m not.'], ['Yes, she is.', 'No, she isn’t.'], ['Yes, they are.', 'No, they aren’t.']] },
    ],
    rules: [
      { h: { uk: 'Міняємо місцями', ru: 'Меняем местами', en: 'Swap places' }, p: { uk: 'It is cold → Is it cold? Слова ті самі, тільки am, is чи are стає першим.', ru: 'It is cold → Is it cold? Слова те же, только am, is или are становится первым.', en: 'It is cold → Is it cold?' } },
      { h: { uk: 'Де? Що? Скільки?', ru: 'Где? Что? Сколько?', en: 'Where? What? How old?' }, p: { uk: 'Питальне слово (where, what, how old) стоїть на самому початку, перед am, is чи are: Where is my bag? How old are you?', ru: 'Вопросительное слово (where, what, how old) стоит в самом начале, перед am, is или are: Where is my bag? How old are you?', en: 'Where is my bag? How old are you?' } },
      { h: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answers' }, p: { uk: 'Відповідаємо «Yes, I am» або «No, I’m not». Після Yes не скорочуємо: не можна Yes, I’m.', ru: 'Отвечаем «Yes, I am» или «No, I’m not». После Yes не сокращаем: нельзя Yes, I’m.', en: 'Yes, I am. No, I’m not.' } },
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
    story: { uk: 'Закінчення -ing як моторчик: чіпляєш його до дієслова, і дія відбувається прямо зараз. Але без водія моторчик не поїде. Водій це am, is або are. She is playing: водій is, дієслово з моторчиком playing.', ru: 'Окончание -ing как моторчик: цепляешь его к глаголу, и действие происходит прямо сейчас. Но без водителя моторчик не поедет. Водитель это am, is или are. She is playing: водитель is, глагол с моторчиком playing.', en: 'The -ing ending is a little motor, and am, is or are is the driver: She is playing.' },
    formula: [
      { label: { uk: 'Водій + дієслово з моторчиком', ru: 'Водитель + глагол с моторчиком', en: 'Driver + verb with the motor' }, rows: [['I', 'am (’m) playing'], ['he / she / it', 'is (’s) playing'], ['you / we / they', 'are (’re) playing']] },
      { label: { uk: 'Як додати -ing', ru: 'Как добавить -ing', en: 'Spelling' }, rows: [['read', 'reading'], ['make', 'making'], ['swim', 'swimming'], ['lie', 'lying']] },
    ],
    rules: [
      { h: { uk: 'Прямо зараз', ru: 'Прямо сейчас', en: 'Right now' }, p: { uk: 'Кажемо про те, що відбувається в цю хвилину: Look! It’s snowing. Підказки: now, look!, listen!', ru: 'Говорим о том, что происходит в эту минуту: Look! It’s snowing. Подсказки: now, look!, listen!', en: 'Look! It’s snowing.' } },
      { h: { uk: 'Як дописати -ing', ru: 'Как дописать -ing', en: 'Spelling' }, p: { uk: 'Зазвичай просто додаємо -ing: read → reading. Якщо в кінці німа e, вона зникає: make → making. Коротке слово на «голосна + приголосна» подвоює останню літеру: swim → swimming, run → running. А ie змінюється на y: lie → lying.', ru: 'Обычно просто добавляем -ing: read → reading. Если в конце немая e, она исчезает: make → making. Короткое слово на «гласная + согласная» удваивает последнюю букву: swim → swimming, run → running. А ie меняется на y: lie → lying.', en: 'read → reading, make → making, swim → swimming.' } },
      { h: { uk: 'Як сказати «ні»', ru: 'Как сказать «нет»', en: 'Negative' }, p: { uk: 'Додаємо not до водія: I’m not sleeping. She isn’t cooking.', ru: 'Добавляем not к водителю: I’m not sleeping. She isn’t cooking.', en: 'I’m not sleeping. She isn’t cooking.' } },
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
    topic: { uk: 'Як запитати: що ти робиш?', ru: 'Как спросить: что ты делаешь?', en: 'How to ask: what are you doing?' },
    story: { uk: 'Знову сальто! Водій am, is чи are стрибає на початок, а дієслово з моторчиком -ing лишається на місці. You are sleeping → Are you sleeping?', ru: 'Снова сальто! Водитель am, is или are прыгает в начало, а глагол с моторчиком -ing остаётся на месте. You are sleeping → Are you sleeping?', en: 'The driver jumps to the front, the -ing verb stays: Are you sleeping?' },
    formula: [
      { label: { uk: 'Питання', ru: 'Вопрос', en: 'Question' }, rows: [['Am', 'I playing?'], ['Is', 'he / she / it playing?'], ['Are', 'you / we / they playing?']] },
      { label: { uk: 'Питальні слова', ru: 'Вопросительные слова', en: 'Question words' }, rows: [['What', 'are you doing?'], ['Where', 'is she going?'], ['Why', 'are you laughing?']] },
    ],
    rules: [
      { h: { uk: 'Водій на початок', ru: 'Водитель в начало', en: 'Driver first' }, p: { uk: 'She is singing → Is she singing? Дієслово з -ing не рухається.', ru: 'She is singing → Is she singing? Глагол с -ing не двигается.', en: 'Is she singing?' } },
      { h: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answers' }, p: { uk: 'Відповідаємо без -ing: Are you working? Yes, I am. / No, I’m not.', ru: 'Отвечаем без -ing: Are you working? Yes, I am. / No, I’m not.', en: 'Yes, I am. / No, I’m not.' } },
      { h: { uk: 'Найпотрібніше питання', ru: 'Самый нужный вопрос', en: 'The most useful question' }, p: { uk: 'What are you doing? Що ти робиш? Його можна почути щодня.', ru: 'What are you doing? Что ты делаешь? Его можно услышать каждый день.', en: 'What are you doing?' } },
    ],
    examples: [
      ['Are you listening to me?', { uk: 'Ти мене слухаєш?', ru: 'Ты меня слушаешь?' }],
      ['Is it raining? No, it isn’t.', { uk: 'Іде дощ? Ні.', ru: 'Идёт дождь? Нет.' }],
      ['What are you doing?', { uk: 'Що ти робиш?', ru: 'Что ты делаешь?' }],
      ['Where are they going?', { uk: 'Куди вони йдуть?', ru: 'Куда они идут?' }],
    ],
    traps: [['You are going home?', 'Are you going home?'], ['What you are doing?', 'What are you doing?'], ['Is she cooking? Yes, she cooking.', 'Is she cooking? Yes, she is.']],
    exercises: [
      { type: 'gap', title: { uk: 'Водій вперед', ru: 'Водитель вперёд', en: 'Driver first' }, instruction: 'Write Am, Is or Are.', text: '[Are] you sleeping?\n[Is] your mum cooking?\n[Are] the dogs barking?\n[Am] I talking too loudly?\n[Is] it snowing?' },
      { type: 'gap', title: { uk: 'Склади питання', ru: 'Составь вопрос', en: 'Make questions' }, instruction: 'Write the question.', text: 'you / play / a game → [Are you playing a game?]\nshe / watch / TV → [Is she watching TV?]\nthey / have / fun → [Are they having fun?]\nwhat / you / do → [What are you doing?]\nwhere / he / go → [Where is he going?]' },
      { type: 'choice', title: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answers' }, instruction: 'Choose the correct short answer.', text: 'Are you working? Yes, {I am|I’m|I working}.\nIs he sleeping? No, {he isn’t|he not|he doesn’t}.\nAre they coming? Yes, {they are|they’re|they coming}.\nIs it raining? No, {it isn’t|it not|it aren’t}.' },
      { type: 'match', title: { uk: 'Питання і відповідь', ru: 'Вопрос и ответ', en: 'Match' }, instruction: 'Match the questions with the answers.', text: 'What are you doing? = I’m reading a comic.\nWhere is Mum going? = To the shop.\nWhy are you laughing? = Because the cat is so funny!\nAre you coming? = Yes, wait a minute!' },
    ],
  },
  {
    n: 5, slug: 'present-simple', title: 'I do / work / like (present simple)', level: 'A1', scene: 'simple-thieves', free: true,
    topic: { uk: 'Звички, розклад і факти', ru: 'Привычки, расписание и факты', en: 'Habits, timetables and facts' },
    story: { uk: 'Present Simple схожий на сімпл-дімпл: натискаєш ті самі кнопочки знову і знову. Так і тут: це те, що повторюється (звички, розклад, факти). I, you, we, they чесні кульки, беруть дієслово як є: I play. А he, she, it маленькі злодюжки: хотіли вкрасти долари, а вкрали букву S. Тепер мусять додавати її до дієслова: he plays, she likes.', ru: 'Present Simple похож на симпл-димпл: нажимаешь одни и те же кнопочки снова и снова. Так и здесь: это то, что повторяется (привычки, расписание, факты). I, you, we, they честные шарики, берут глагол как есть: I play. А he, she, it маленькие воришки: хотели украсть доллары, а украли букву S. Теперь им приходится добавлять её к глаголу: he plays, she likes.', en: 'Like a simple dimple toy, you press the same buttons again and again. He, she and it stole the letter S, so they add it to the verb: he plays.' },
    formula: [
      { label: { uk: 'Хто + дієслово', ru: 'Кто + глагол', en: 'Who + verb' }, rows: [['I / you / we / they', 'play, like, go'], ['he / she / it', 'plays, likes, goes']] },
      { label: { uk: 'Як додати S', ru: 'Как добавить S', en: 'Adding S' }, rows: [['work', 'works'], ['watch, go', 'watches, goes'], ['study', 'studies'], ['have', 'has']] },
    ],
    rules: [
      { h: { uk: 'Коли кажемо', ru: 'Когда говорим', en: 'When' }, p: { uk: 'Про те, що буває регулярно: I get up at 7. Про розклад: The bus leaves at 8. Про факти: Cats love fish.', ru: 'О том, что бывает регулярно: I get up at 7. О расписании: The bus leaves at 8. О фактах: Cats love fish.', en: 'Habits, timetables, facts.' } },
      { h: { uk: 'He, she, it + s', ru: 'He, she, it + s', en: 'He, she, it + s' }, p: { uk: 'До дієслова після he, she, it додаємо -s: works, likes. Після s, sh, ch, x, o пишемо -es: watches, goes. Приголосна + y дає -ies: study → studies. Have перетворюється на has.', ru: 'К глаголу после he, she, it добавляем -s: works, likes. После s, sh, ch, x, o пишем -es: watches, goes. Согласная + y даёт -ies: study → studies. Have превращается в has.', en: 'works, watches, goes, studies, has.' } },
      { h: { uk: 'Слова-підказки', ru: 'Слова-подсказки', en: 'Signal words' }, p: { uk: 'every day, usually, always, often, sometimes, never, on Mondays.', ru: 'every day, usually, always, often, sometimes, never, on Mondays.', en: 'every day, usually, always, often, sometimes, never, on Mondays.' } },
    ],
    examples: [
      ['I play football on Saturdays.', { uk: 'Я граю у футбол по суботах.', ru: 'Я играю в футбол по субботам.' }],
      ['My sister watches cartoons every evening.', { uk: 'Моя сестра щовечора дивиться мультики.', ru: 'Моя сестра каждый вечер смотрит мультики.' }],
      ['The shop opens at nine.', { uk: 'Магазин відкривається о дев’ятій.', ru: 'Магазин открывается в девять.' }],
      ['Cats love fish.', { uk: 'Коти люблять рибу.', ru: 'Коты любят рыбу.' }],
    ],
    traps: [['She play tennis.', 'She plays tennis.'], ['I plays the guitar.', 'I play the guitar.'], ['He haves a dog.', 'He has a dog.']],
    exercises: [
      { type: 'gap', title: { uk: 'Злодюжки беруть S', ru: 'Воришки берут S', en: 'The thieves take the S' }, instruction: 'Write the he / she / it form.', text: 'play → he [plays]\nwatch → she [watches]\ngo → it [goes]\nstudy → he [studies]\nhave → she [has]\nwash → he [washes]\nlike → she [likes]\nfly → it [flies]' },
      { type: 'gap', title: { uk: 'Розкрий дужки', ru: 'Раскрой скобки', en: 'Open the brackets' }, instruction: 'Put the verbs in brackets into the present simple.', text: 'My dad [drinks] (drink) coffee every morning.\nWe [go] (go) to school by bus.\nThe shop [opens] (open) at nine.\nMy cats [sleep] (sleep) all day.\nAnna [speaks] (speak) three languages.\nI [love] (love) pancakes.' },
      { type: 'choice', title: { uk: 'З S чи без?', ru: 'С S или без?', en: 'With or without S?' }, instruction: 'Choose the correct form.', text: 'My brother {plays|play} the guitar.\nThey {live|lives} in Odesa.\nShe {goes|go} to bed at ten.\nI {like|likes} cats.\nOur teacher {has|have} a red car.\nWe {watch|watches} films on Fridays.' },
      { type: 'gap', title: { uk: 'Про себе й друга', ru: 'О себе и друге', en: 'Me and my friend' }, instruction: 'Write the verb in the correct form.', text: 'I get up at seven. My friend [gets] up at eight.\nI like tea. My friend [likes] juice.\nI walk to school. My friend [goes] by bus.\nI have a cat. My friend [has] a parrot.' },
    ],
  },
  {
    n: 6, slug: 'present-simple-negative', title: 'I don’t… (present simple negative)', level: 'A1', scene: 'police-do', free: false,
    topic: { uk: 'Як сказати «не люблю», «не грає»', ru: 'Как сказать «не люблю», «не играет»', en: 'How to say “I don’t…”' },
    story: { uk: 'Щоб сказати «ні», приходить поліцейський do з табличкою NOT. Біля I, you, we, they він просто стоїть: I don’t play. А в злодюжок he, she, it він забирає вкрадену S і бере її собі: do + es = does. Тому дієслово знову без S: He doesn’t play.', ru: 'Чтобы сказать «нет», приходит полицейский do с табличкой NOT. Рядом с I, you, we, they он просто стоит: I don’t play. А у воришек he, she, it он забирает украденную S и берёт её себе: do + es = does. Поэтому глагол снова без S: He doesn’t play.', en: 'To say “no”, officer do comes with a NOT sign. He takes the S back from he, she, it: does. So the verb has no S: He doesn’t play.' },
    formula: [
      { label: { uk: 'Заперечення', ru: 'Отрицание', en: 'Negative' }, rows: [['I / you / we / they', 'don’t play'], ['he / she / it', 'doesn’t play']] },
      { label: { uk: 'Повна форма', ru: 'Полная форма', en: 'Full form' }, rows: [['don’t', 'do not'], ['doesn’t', 'does not']] },
    ],
    rules: [
      { h: { uk: 'Don’t і doesn’t', ru: 'Don’t и doesn’t', en: 'Don’t and doesn’t' }, p: { uk: 'I, you, we, they + don’t. He, she, it + doesn’t. Після них дієслово завжди без змін: doesn’t play, doesn’t go.', ru: 'I, you, we, they + don’t. He, she, it + doesn’t. После них глагол всегда без изменений: doesn’t play, doesn’t go.', en: 'don’t / doesn’t + verb.' } },
      { h: { uk: 'S уже в does', ru: 'S уже в does', en: 'The S is in does' }, p: { uk: 'Не можна дві S в одному реченні: He doesn’t plays: це помилка. Правильно: He doesn’t play.', ru: 'Нельзя две S в одном предложении: He doesn’t plays: это ошибка. Правильно: He doesn’t play.', en: 'He doesn’t play, not “doesn’t plays”.' } },
      { h: { uk: 'Not без do не працює', ru: 'Not без do не работает', en: 'Not needs do' }, p: { uk: 'Не можна просто I not like. Обов’язково з помічником: I don’t like.', ru: 'Нельзя просто I not like. Обязательно с помощником: I don’t like.', en: 'I don’t like, not “I not like”.' } },
    ],
    examples: [
      ['I don’t like rain.', { uk: 'Я не люблю дощ.', ru: 'Я не люблю дождь.' }],
      ['She doesn’t eat meat.', { uk: 'Вона не їсть м’яса.', ru: 'Она не ест мясо.' }],
      ['We don’t have a car.', { uk: 'У нас немає машини.', ru: 'У нас нет машины.' }],
      ['My phone doesn’t work.', { uk: 'Мій телефон не працює.', ru: 'Мой телефон не работает.' }],
    ],
    traps: [['He doesn’t plays.', 'He doesn’t play.'], ['She don’t like it.', 'She doesn’t like it.'], ['I not like milk.', 'I don’t like milk.']],
    exercises: [
      { type: 'choice', title: { uk: 'Don’t чи doesn’t?', ru: 'Don’t или doesn’t?', en: 'Don’t or doesn’t?' }, instruction: 'Choose the correct form.', text: 'I {don’t|doesn’t} like rain.\nShe {doesn’t|don’t} eat meat.\nThey {don’t|doesn’t} live here.\nMy brother {doesn’t|don’t} play the guitar.\nWe {don’t|doesn’t} have a car.\nIt {doesn’t|don’t} work.' },
      { type: 'gap', title: { uk: 'Поліцейський забирає S', ru: 'Полицейский забирает S', en: 'The officer takes the S' }, instruction: 'Make the sentence negative.', text: 'He plays chess. → He [doesn’t play/does not play] chess.\nShe likes coffee. → She [doesn’t like/does not like] coffee.\nI watch TV. → I [don’t watch/do not watch] TV.\nThe bus stops here. → The bus [doesn’t stop/does not stop] here.\nWe go to bed late. → We [don’t go/do not go] to bed late.' },
      { type: 'choice', title: { uk: 'Знайди правильне', ru: 'Найди правильное', en: 'Find the right one' }, instruction: 'Choose the correct sentence.', text: '{He doesn’t speak French.|He doesn’t speaks French.|He don’t speak French.}\n{I don’t know.|I doesn’t know.|I not know.}\n{My cat doesn’t like water.|My cat don’t like water.|My cat doesn’t likes water.}\n{They don’t work on Sundays.|They doesn’t work on Sundays.|They don’t works on Sundays.}' },
      { type: 'gap', title: { uk: 'Розкрий дужки', ru: 'Раскрой скобки', en: 'Open the brackets' }, instruction: 'Write the negative form of the verb.', text: 'My dad [doesn’t drink/does not drink] (not drink) coffee.\nI [don’t understand/do not understand] (not understand) this word.\nOur dog [doesn’t like/does not like] (not like) the rain.\nThey [don’t watch/do not watch] (not watch) TV in the morning.' },
    ],
  },
  {
    n: 7, slug: 'present-simple-questions', title: 'Do you…? (present simple questions)', level: 'A1', scene: 'do-flip', free: false,
    topic: { uk: 'Як запитати: ти любиш? він грає?', ru: 'Как спросить: ты любишь? он играет?', en: 'How to ask: do you like…?' },
    story: { uk: 'У питанні поліцейський do робить сальто і стає на початок речення: Do you like pizza? У злодюжок він знову забирає S: Does she like pizza? Дієслово like без S, бо S уже в does.', ru: 'В вопросе полицейский do делает сальто и встаёт в начало предложения: Do you like pizza? У воришек он снова забирает S: Does she like pizza? Глагол like без S, потому что S уже в does.', en: 'In a question do jumps to the front: Do you like pizza? With he, she, it it becomes does, so the verb has no S.' },
    formula: [
      { label: { uk: 'Питання', ru: 'Вопрос', en: 'Question' }, rows: [['Do', 'I / you / we / they play?'], ['Does', 'he / she / it play?']] },
      { label: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answer' }, rows: [['Yes, I do.', 'No, I don’t.'], ['Yes, she does.', 'No, she doesn’t.']] },
    ],
    rules: [
      { h: { uk: 'Do і does на початку', ru: 'Do и does в начале', en: 'Do or does first' }, p: { uk: 'Do + I, you, we, they. Does + he, she, it. Далі дієслово без S: Does he play?', ru: 'Do + I, you, we, they. Does + he, she, it. Дальше глагол без S: Does he play?', en: 'Do you play? Does he play?' } },
      { h: { uk: 'Питальні слова', ru: 'Вопросительные слова', en: 'Question words' }, p: { uk: 'Where, what, when стоять перед do чи does: Where do you live? What does she like?', ru: 'Where, what, when стоят перед do или does: Where do you live? What does she like?', en: 'Where do you live?' } },
      { h: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answers' }, p: { uk: 'Відповідаємо помічником, без основного дієслова: Do you like it? Yes, I do. / No, I don’t.', ru: 'Отвечаем помощником, без основного глагола: Do you like it? Yes, I do. / No, I don’t.', en: 'Yes, I do. / No, I don’t.' } },
    ],
    examples: [
      ['Do you like pizza? Yes, I do.', { uk: 'Ти любиш піцу? Так.', ru: 'Ты любишь пиццу? Да.' }],
      ['Does your cat sleep a lot? Yes, it does.', { uk: 'Твій кіт багато спить? Так.', ru: 'Твой кот много спит? Да.' }],
      ['Where do you live?', { uk: 'Де ти живеш?', ru: 'Где ты живёшь?' }],
      ['What time does the film start?', { uk: 'О котрій починається фільм?', ru: 'Во сколько начинается фильм?' }],
    ],
    traps: [['You like pizza?', 'Do you like pizza?'], ['Does she likes it?', 'Does she like it?'], ['Where you live?', 'Where do you live?']],
    exercises: [
      { type: 'gap', title: { uk: 'Do чи Does?', ru: 'Do или Does?', en: 'Do or Does?' }, instruction: 'Write Do or Does.', text: '[Do] you play chess?\n[Does] your mum work here?\n[Do] they speak English?\n[Does] it rain a lot in London?\n[Do] we have homework today?\n[Does] Max like dogs?' },
      { type: 'choice', title: { uk: 'Без зайвої S', ru: 'Без лишней S', en: 'No extra S' }, instruction: 'Choose the correct question.', text: '{Does she like pizza?|Does she likes pizza?|Do she like pizza?}\n{Do you play the piano?|Does you play the piano?|Do you plays the piano?}\n{Does it snow here?|Do it snow here?|Does it snows here?}\n{Where does he live?|Where he lives?|Where does he lives?}' },
      { type: 'choice', title: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answers' }, instruction: 'Choose the correct short answer.', text: 'Do you like cats? Yes, {I do|I like|I am}.\nDoes he play football? No, {he doesn’t|he don’t|he isn’t}.\nDo they live here? Yes, {they do|they live|they are}.\nDoes your mum drive? No, {she doesn’t|she don’t|she not}.' },
      { type: 'gap', title: { uk: 'Склади питання', ru: 'Составь вопрос', en: 'Make questions' }, instruction: 'Write the question.', text: 'you / like / ice cream → [Do you like ice cream?]\nshe / play / tennis → [Does she play tennis?]\nwhere / they / live → [Where do they live?]\nwhat / he / eat / for breakfast → [What does he eat for breakfast?]' },
    ],
  },
  {
    n: 8, slug: 'present-continuous-or-simple', title: 'I am doing and I do', level: 'A1-A2', scene: 'now-vs-always', free: false,
    topic: { uk: 'Зараз чи завжди?', ru: 'Сейчас или всегда?', en: 'Now or always?' },
    story: { uk: 'Дві іграшки на одній полиці. Моторчик -ing їде прямо зараз: I’m reading. Сімпл-дімпл натискаємо знову і знову, це звичка: I read every day. Перш ніж сказати, спитай себе: це відбувається зараз чи буває постійно?', ru: 'Две игрушки на одной полке. Моторчик -ing едет прямо сейчас: I’m reading. Симпл-димпл нажимаем снова и снова, это привычка: I read every day. Прежде чем сказать, спроси себя: это происходит сейчас или бывает постоянно?', en: 'The -ing motor runs right now: I’m reading. The simple dimple is pressed again and again: I read every day.' },
    formula: [
      { label: { uk: 'Зараз (моторчик)', ru: 'Сейчас (моторчик)', en: 'Now (motor)' }, rows: [['am / is / are + -ing', 'I’m reading now.'], ['now, at the moment', 'look!, listen!']] },
      { label: { uk: 'Завжди (сімпл-дімпл)', ru: 'Всегда (симпл-димпл)', en: 'Always (simple dimple)' }, rows: [['verb (+s)', 'I read every day.'], ['every day, usually', 'often, never']] },
    ],
    rules: [
      { h: { uk: 'Зараз', ru: 'Сейчас', en: 'Now' }, p: { uk: 'Те, що відбувається в цю хвилину або ці дні: Look! It’s raining. I’m learning to swim this month.', ru: 'То, что происходит в эту минуту или в эти дни: Look! It’s raining. I’m learning to swim this month.', en: 'Look! It’s raining.' } },
      { h: { uk: 'Завжди, зазвичай', ru: 'Всегда, обычно', en: 'Always, usually' }, p: { uk: 'Звички, розклад і факти: It rains a lot in autumn. I swim every Sunday.', ru: 'Привычки, расписание и факты: It rains a lot in autumn. I swim every Sunday.', en: 'It rains a lot in autumn.' } },
      { h: { uk: 'Дієслова без моторчика', ru: 'Глаголы без моторчика', en: 'Verbs without -ing' }, p: { uk: 'Know, like, love, want, need, understand, believe зазвичай не беруть -ing: I know, а не I’m knowing.', ru: 'Know, like, love, want, need, understand, believe обычно не берут -ing: I know, а не I’m knowing.', en: 'I know, not “I’m knowing”.' } },
    ],
    examples: [
      ['She plays the piano, but now she’s playing the guitar.', { uk: 'Вона грає на піаніно, але зараз грає на гітарі.', ru: 'Она играет на пианино, но сейчас играет на гитаре.' }],
      ['I usually walk to school. Today I’m going by bus.', { uk: 'Зазвичай я йду до школи пішки. Сьогодні їду автобусом.', ru: 'Обычно я хожу в школу пешком. Сегодня еду на автобусе.' }],
      ['What do you do? What are you doing?', { uk: 'Ким ти працюєш? Що ти зараз робиш?', ru: 'Кем ты работаешь? Что ты сейчас делаешь?' }],
      ['I know the answer.', { uk: 'Я знаю відповідь.', ru: 'Я знаю ответ.' }],
    ],
    traps: [['I’m knowing the answer.', 'I know the answer.'], ['Look! It snows.', 'Look! It’s snowing.'], ['I am go to school every day.', 'I go to school every day.']],
    exercises: [
      { type: 'choice', title: { uk: 'Зараз чи завжди?', ru: 'Сейчас или всегда?', en: 'Now or always?' }, instruction: 'Choose the correct form.', text: 'Look! The dog {is running|runs} after the cat.\nI {go|am going} to school every day.\nShh! Dad {is sleeping|sleeps}.\nShe {drinks|is drinking} milk every morning.\nWe {are watching|watch} a film right now.\nMy cat usually {sleeps|is sleeping} on the sofa.' },
      { type: 'gap', title: { uk: 'Розкрий дужки', ru: 'Раскрой скобки', en: 'Open the brackets' }, instruction: 'Put the verbs into the present simple or the present continuous.', text: 'It [is raining/’s raining] (rain) now. Take an umbrella!\nMy brother [plays] (play) football on Tuesdays.\nListen! Somebody [is singing/’s singing] (sing).\nI [don’t like/do not like] (not like) horror films.\nWhat [are] you [doing] (do) at the moment?' },
      { type: 'choice', title: { uk: 'Ці дієслова без моторчика', ru: 'Эти глаголы без моторчика', en: 'No -ing with these' }, instruction: 'Choose the correct sentence.', text: '{I know your sister.|I’m knowing your sister.}\n{Do you want some tea?|Are you wanting some tea?}\n{She likes this song.|She is liking this song.}\n{I understand you.|I’m understanding you.}' },
      { type: 'match', title: { uk: 'Питання й відповідь', ru: 'Вопрос и ответ', en: 'Match' }, instruction: 'Match the questions with the answers.', text: 'What do you do? = I’m a teacher.\nWhat are you doing? = I’m making a cake.\nDo you like cake? = Yes, I love it!\nAre you busy now? = No, I’m free.' },
    ],
  },
  {
    n: 9, slug: 'have-and-have-got', title: 'I have… / I’ve got…', level: 'A1-A2', scene: 'backpack', free: false,
    topic: { uk: 'Як сказати «у мене є»', ru: 'Как сказать «у меня есть»', en: 'How to say what you have' },
    story: { uk: 'Уяви рюкзак. Щоб розповісти, що в ньому, англійці кажуть «я маю»: I’ve got a sandwich, а не «у мене є». Have got більше для розмови, have просто як звичайне дієслово. Злодюжки he, she, it і тут зі своєю S: has got, has.', ru: 'Представь рюкзак. Чтобы рассказать, что в нём, англичане говорят «я имею»: I’ve got a sandwich, а не «у меня есть». Have got чаще в разговоре, have просто как обычный глагол. Воришки he, she, it и тут со своей S: has got, has.', en: 'Imagine a backpack: I’ve got a sandwich. He, she, it have their S again: has got, has.' },
    formula: [
      { label: { uk: 'have got (розмовне)', ru: 'have got (разговорное)', en: 'have got' }, rows: [['I / you / we / they', 'have got (’ve got)'], ['he / she / it', 'has got (’s got)']] },
      { label: { uk: 'have (як звичайне дієслово)', ru: 'have (как обычный глагол)', en: 'have' }, rows: [['I / you / we / they', 'have'], ['he / she / it', 'has']] },
    ],
    rules: [
      { h: { uk: '«Я маю» замість «у мене є»', ru: '«Я имею» вместо «у меня есть»', en: 'I have' }, p: { uk: 'У мене є кіт: I’ve got a cat або I have a cat. Обидва варіанти правильні.', ru: 'У меня есть кот: I’ve got a cat или I have a cat. Оба варианта правильные.', en: 'I’ve got a cat = I have a cat.' } },
      { h: { uk: 'Заперечення й питання з got', ru: 'Отрицание и вопрос с got', en: 'With got' }, p: { uk: 'Як у to be: I haven’t got a dog. Have you got a pen? Yes, I have.', ru: 'Как у to be: I haven’t got a dog. Have you got a pen? Yes, I have.', en: 'I haven’t got… Have you got…?' } },
      { h: { uk: 'Заперечення й питання без got', ru: 'Отрицание и вопрос без got', en: 'Without got' }, p: { uk: 'Як у Present Simple, з do і does: I don’t have a dog. Do you have a pen? Does she have a bike?', ru: 'Как в Present Simple, с do и does: I don’t have a dog. Do you have a pen? Does she have a bike?', en: 'I don’t have… Do you have…?' } },
    ],
    examples: [
      ['I’ve got a little sister.', { uk: 'У мене є молодша сестра.', ru: 'У меня есть младшая сестра.' }],
      ['She has a new phone.', { uk: 'У неї новий телефон.', ru: 'У неё новый телефон.' }],
      ['Have you got a pen? Yes, I have.', { uk: 'У тебе є ручка? Так.', ru: 'У тебя есть ручка? Да.' }],
      ['Do you have a pet? No, I don’t.', { uk: 'У тебе є домашній улюбленець? Ні.', ru: 'У тебя есть питомец? Нет.' }],
    ],
    traps: [['He have got a bike.', 'He has got a bike.'], ['I haven’t a car.', 'I haven’t got a car. / I don’t have a car.'], ['Do you have got a pen?', 'Have you got a pen? / Do you have a pen?']],
    exercises: [
      { type: 'choice', title: { uk: 'Have чи has?', ru: 'Have или has?', en: 'Have or has?' }, instruction: 'Choose the correct form.', text: 'I {have|has} got two brothers.\nMy dad {has|have} got a beard.\nThey {have|has} a big garden.\nOur cat {has|have} green eyes.\nWe {have|has} got a test tomorrow.' },
      { type: 'gap', title: { uk: 'Що в рюкзаку?', ru: 'Что в рюкзаке?', en: 'What’s in the bag?' }, instruction: 'Write have got, has got, haven’t got or hasn’t got.', text: 'I [have got/’ve got] a sandwich in my bag.\nTom [hasn’t got/has not got] a pencil. Can you give him one?\nWe [have got/’ve got] three dogs!\nShe [has got/’s got] long hair.\nThey [haven’t got/have not got] a TV.' },
      { type: 'choice', title: { uk: 'Питання й відповіді', ru: 'Вопросы и ответы', en: 'Questions and answers' }, instruction: 'Choose the correct option.', text: '{Have you got|Do you got|Has you got} a brother?\n{Does she have|Has she have|Does she has} a bike?\nHave they got a garden? Yes, {they have|they do|they got}.\nDo you have a pet? No, {I don’t|I haven’t|I not}.' },
      { type: 'gap', title: { uk: 'Без got', ru: 'Без got', en: 'Without got' }, instruction: 'Write have, has, don’t have or doesn’t have.', text: 'I [have] a cat and a dog.\nMy sister [has] a new bike.\nSorry, I [don’t have/do not have] a pen.\nOur school [doesn’t have/does not have] a pool.' },
    ],
  },
  {
    n: 10, slug: 'was-were', title: 'was / were', level: 'A1-A2', scene: 'time-machine', free: false,
    topic: { uk: 'Як сказати «був», «була», «були»', ru: 'Как сказать «был», «была», «были»', en: 'How to say “was” and “were”' },
    story: { uk: 'Сідаємо в машину часу й летимо у вчора. Кульки BE переодягаються: am та is стають was, а are стає were. Хто з ким дружив, той з тим і залишився: I was, she was, they were.', ru: 'Садимся в машину времени и летим во вчера. Шарики BE переодеваются: am и is становятся was, а are становится were. Кто с кем дружил, тот с тем и остался: I was, she was, they were.', en: 'Get into the time machine: am and is become was, are becomes were.' },
    formula: [
      { label: { uk: 'Сьогодні → учора', ru: 'Сегодня → вчера', en: 'Now → yesterday' }, rows: [['am, is', 'was'], ['are', 'were']] },
      { label: { uk: 'Заперечення й питання', ru: 'Отрицание и вопрос', en: 'Negative and question' }, rows: [['I / he / she / it', 'wasn’t · Was he…?'], ['you / we / they', 'weren’t · Were you…?']] },
    ],
    rules: [
      { h: { uk: 'Was і were', ru: 'Was и were', en: 'Was and were' }, p: { uk: 'I, he, she, it + was. You, we, they + were. Yesterday I was at home. They were at school.', ru: 'I, he, she, it + was. You, we, they + were. Yesterday I was at home. They were at school.', en: 'I was, they were.' } },
      { h: { uk: 'Як сказати «ні»', ru: 'Как сказать «нет»', en: 'Negative' }, p: { uk: 'Додаємо not: wasn’t, weren’t. It wasn’t cold. We weren’t late.', ru: 'Добавляем not: wasn’t, weren’t. It wasn’t cold. We weren’t late.', en: 'wasn’t, weren’t.' } },
      { h: { uk: 'Питання', ru: 'Вопрос', en: 'Questions' }, p: { uk: 'Знову сальто: You were late → Were you late? Відповідь: Yes, I was. / No, I wasn’t.', ru: 'Снова сальто: You were late → Were you late? Ответ: Yes, I was. / No, I wasn’t.', en: 'Were you late? Yes, I was.' } },
    ],
    examples: [
      ['I was at home yesterday.', { uk: 'Учора я був удома.', ru: 'Вчера я был дома.' }],
      ['The film was really funny.', { uk: 'Фільм був дуже смішний.', ru: 'Фильм был очень смешной.' }],
      ['We weren’t tired.', { uk: 'Ми не були втомлені.', ru: 'Мы не были уставшими.' }],
      ['Where were you last night?', { uk: 'Де ти був учора ввечері?', ru: 'Где ты был вчера вечером?' }],
    ],
    traps: [['They was at school.', 'They were at school.'], ['I were tired.', 'I was tired.'], ['You was late?', 'Were you late?']],
    exercises: [
      { type: 'choice', title: { uk: 'Was чи were?', ru: 'Was или were?', en: 'Was or were?' }, instruction: 'Choose was or were.', text: 'I {was|were} ill last week.\nMy parents {were|was} in Lviv.\nIt {was|were} cold yesterday.\nWe {were|was} at the cinema.\nThe test {was|were} easy.\nYou {were|was} right!' },
      { type: 'gap', title: { uk: 'Машина часу', ru: 'Машина времени', en: 'Time machine' }, instruction: 'Change the sentence to the past.', text: 'I am happy. → Yesterday I [was] happy.\nThey are at the park. → Yesterday they [were] at the park.\nShe is busy. → Yesterday she [was] busy.\nWe aren’t hungry. → Yesterday we [weren’t/were not] hungry.\nIt isn’t sunny. → Yesterday it [wasn’t/was not] sunny.' },
      { type: 'gap', title: { uk: 'Питання', ru: 'Вопросы', en: 'Questions' }, instruction: 'Write Was or Were.', text: '[Were] you at school yesterday?\n[Was] the pizza good?\nWhere [were] your keys?\n[Was] Anna at the party?\nWhy [were] they late?' },
      { type: 'choice', title: { uk: 'Коротка відповідь', ru: 'Краткий ответ', en: 'Short answers' }, instruction: 'Choose the correct short answer.', text: 'Were you tired? Yes, {I was|I were|I am}.\nWas it expensive? No, {it wasn’t|it weren’t|it isn’t}.\nWere they at home? No, {they weren’t|they wasn’t|they aren’t}.' },
    ],
  },
];

export const BOOK_UNITS: Record<BookId, BookUnit[]> = { beginner: RED, intermediate: [] };
// Що буде далі в книзі Beginner (поки «скоро»)
export const RED_NEXT: { n: number; title: string }[] = [
  { n: 11, title: 'worked / got / went (past simple)' }, { n: 12, title: 'I didn’t… Did you…?' },
  { n: 13, title: 'there is / there are' }, { n: 14, title: 'can / can’t' }, { n: 15, title: 'I’m going to…' },
];
export const getUnit = (book: string, slug: string) => (BOOK_UNITS[book as BookId] ?? []).find((u) => u.slug === slug);
