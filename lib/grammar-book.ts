// Граматична книга: розворот «сторінка правила + сторінка вправ».
// Порядок тем як у класичних підручниках A1-A2 і B1-B2, але тексти, приклади, вправи й картинки повністю наші.
// Перші 5 юнітів безкоштовні. Вправи пишемо у форматі lib/exercise.ts ([відповідь], {правильний|інший}).
import type { T } from './i18n';
import type { SectionType } from './exercise';

export type BookId = 'beginner' | 'intermediate';
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
      { h: { uk: 'Де? Що? Скільки?', ru: 'Где? Что? Сколько?', en: 'Where? What? How old?' }, p: { uk: 'Питальне слово ставимо ще раніше: Where is my bag? How old are you?', ru: 'Вопросительное слово ставим ещё раньше: Where is my bag? How old are you?', en: 'Where is my bag? How old are you?' } },
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
      { h: { uk: 'Як дописати -ing', ru: 'Как дописать -ing', en: 'Spelling' }, p: { uk: 'Зазвичай просто додаємо -ing: read → reading. Якщо в кінці e, вона зникає: make → making. Коротке слово з однією голосною подвоює останню літеру: swim → swimming.', ru: 'Обычно просто добавляем -ing: read → reading. Если в конце e, она исчезает: make → making. Короткое слово с одной гласной удваивает последнюю букву: swim → swimming.', en: 'read → reading, make → making, swim → swimming.' } },
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
    topic: { uk: 'Звички, розклад і факти', ru: 'Привычки, расписание и факты', en: 'Habits, timetables and facts' },
    story: { uk: 'Present Simple схожий на сімпл-дімпл: натискаєш ті самі кнопочки знову і знову. Так і тут: те, що повторюється (звички, розклад, факти). I, you, we, they беруть дієслово як є: I play. А he, she, it маленькі злодюжки: хотіли вкрасти долари, а вкрали букву S. Тепер мусять додавати її до дієслова: he plays, she likes.', ru: 'Present Simple похож на симпл-димпл: нажимаешь одни и те же кнопочки снова и снова. Так и здесь: то, что повторяется (привычки, расписание, факты). I, you, we, they берут глагол как есть: I play. А he, she, it маленькие воришки: хотели украсть доллары, а украли букву S. Теперь им приходится добавлять её к глаголу: he plays, she likes.', en: 'Like a simple dimple toy, you press the same buttons again and again. He, she and it stole the letter S, so they add it to the verb: he plays.' },
    formula: [
      { label: { uk: '+  Ствердження', ru: '+  Утверждение', en: '+  Positive' }, rows: [['I / you / we / they', 'play'], ['he / she / it', 'plays']] },
      { label: { uk: '−  Заперечення', ru: '−  Отрицание', en: '−  Negative' }, rows: [['I / you / we / they', 'don’t play'], ['he / she / it', 'doesn’t play']] },
      { label: { uk: '?  Питання', ru: '?  Вопрос', en: '?  Question' }, rows: [['Do', 'I / you / we / they play?'], ['Does', 'he / she / it play?']] },
    ],
    rules: [
      { h: { uk: 'He, she, it + s', ru: 'He, she, it + s', en: 'He, she, it + s' }, p: { uk: 'He works, she likes. Після s, sh, ch, x, o пишемо -es: watches, goes. Якщо в кінці приголосна + y, буде -ies: study → studies. Have перетворюється на has.', ru: 'He works, she likes. После s, sh, ch, x, o пишем -es: watches, goes. Если в конце согласная + y, будет -ies: study → studies. Have превращается в has.', en: 'He works, she watches, it goes, he studies, she has.' } },
      { h: { uk: 'Do і does: поліцейські', ru: 'Do и does: полицейские', en: 'Do and does' }, p: { uk: 'У запереченні й питанні з’являється do. Злодюжки віддають йому свою S, і виходить does. Тому дієслово вже без S: He doesn’t play. Does she like pizza?', ru: 'В отрицании и вопросе появляется do. Воришки отдают ему свою S, и получается does. Поэтому глагол уже без S: He doesn’t play. Does she like pizza?', en: 'He doesn’t play. Does she like pizza?' } },
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

export const BOOK_UNITS: Record<BookId, BookUnit[]> = { beginner: RED, intermediate: [] };
// Що буде далі в книзі Beginner (поки «скоро»)
export const RED_NEXT: { n: number; title: string }[] = [
  { n: 6, title: 'I don’t… (present simple negative)' }, { n: 7, title: 'Do you…? (present simple questions)' },
  { n: 8, title: 'I am doing and I do' }, { n: 9, title: 'I have… / I’ve got…' }, { n: 10, title: 'was / were' },
  { n: 11, title: 'worked / got / went (past simple)' }, { n: 12, title: 'I didn’t… Did you…?' },
];
export const getUnit = (book: string, slug: string) => (BOOK_UNITS[book as BookId] ?? []).find((u) => u.slug === slug);
