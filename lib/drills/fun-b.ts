import type { DrillFun } from './types';

export const FUN_B: Record<string, DrillFun> = {
  'prepositions-time': {
    title: 'Ідеальний план підготовки',
    lines: [
      { who: 'Leo', text: 'When is the maths test?' },
      { who: 'Ruby', text: 'On Monday at nine o’clock.' },
      { who: 'Leo', text: 'Great. Then I’ll start revising on Monday at eight fifty.' },
      { who: 'Ruby', text: 'In the morning? Wow, so early.' },
    ],
    point: 'At для точного часу (at nine o’clock), on для днів (on Monday), in для частин дня (in the morning). Навіть план Лео в останню хвилину підкоряється прийменникам.',
  },
  'present-continuous': {
    title: 'Чим зайнятий кіт',
    lines: [
      { who: 'Emma', text: 'Tom, what are you doing?' },
      { who: 'Tom', text: 'I’m doing my homework.' },
      { who: 'Emma', text: 'Then why is Murly sitting on your laptop?' },
      { who: 'Tom', text: 'He’s helping. He’s checking my spelling.' },
    ],
    point: 'Am / is / are + -ing: дія відбувається прямо зараз. Кіт, який сидить на ноутбуці, теж «працює» в Present Continuous.',
  },
  'present-for-future': {
    title: 'Плани, розклад і програш',
    lines: [
      { who: 'Sophie', text: 'Are you doing anything on Saturday?' },
      { who: 'Harry', text: 'Yes, I’m meeting Oliver online at ten.' },
      { who: 'Sophie', text: 'The new game comes out on Friday, right?' },
      { who: 'Harry', text: 'Exactly. By Saturday I’ll have downloaded it, and at ten I’ll be losing to Oliver.' },
    ],
    point: 'I’m meeting: домовленість, comes out: розклад. I’ll have downloaded: завершиться до суботи, а I’ll be losing: буде в процесі рівно о десятій.',
  },
  'present-perfect': {
    title: 'Досвід, якого краще не мати',
    lines: [
      { who: 'Grace', text: 'Have you ever tried my dad’s soup?' },
      { who: 'Ben', text: 'No, I haven’t. Is it good?' },
      { who: 'Grace', text: 'I don’t know. Biscuit has tried it.' },
      { who: 'Ben', text: 'And?' },
      { who: 'Grace', text: 'He’s just hidden under the bed.' },
    ],
    point: 'Have you ever...? питає про досвід, а has just hidden показує свіжий результат, який видно зараз. Коли саме, не кажемо, тому Present Perfect.',
  },
  'present-perfect-continuous': {
    title: 'Скільки можна чекати оновлення',
    lines: [
      { who: 'Max', text: 'Why are you so sad?' },
      { who: 'Chloe', text: 'I’ve been waiting for this update for two hours.' },
      { who: 'Max', text: 'Two hours? What has your laptop been doing?' },
      { who: 'Chloe', text: 'Since lunch it’s been saying “Almost done”.' },
    ],
    point: 'Have / has been + -ing: почалося в минулому і досі триває (for two hours, since lunch). Ідеальний час для всіх, хто чекає оновлень.',
  },
  'present-simple': {
    title: 'Важкий робочий день собаки',
    lines: [
      { who: 'Lily', text: 'What does Biscuit do every day?' },
      { who: 'Sam', text: 'He wakes up at six, eats and sleeps.' },
      { who: 'Lily', text: 'And in the afternoon?' },
      { who: 'Sam', text: 'He eats and sleeps. He works very hard.' },
    ],
    point: 'Wakes, eats, sleeps з -s, бо he. Щоденні звички завжди в Present Simple, навіть якщо вся робота полягає у сні.',
  },
  'pronouns-possessives': {
    title: 'Чия це піца?',
    lines: [
      { who: 'Jack', text: 'Is this pizza yours?' },
      { who: 'Daisy', text: 'No, it isn’t mine. It’s my brother’s.' },
      { who: 'Jack', text: 'Where is he?' },
      { who: 'Daisy', text: 'At school. So now it’s ours!' },
    ],
    point: 'My стоїть перед іменником, а mine, yours, ours замінюють його повністю. Так піца брата швидко стає «нашою».',
  },
  'quantifiers': {
    title: 'Чесний звіт про печиво',
    lines: [
      { who: 'Mrs Green', text: 'Is there any milk?' },
      { who: 'Oliver', text: 'Not much. But there are a lot of cookies.' },
      { who: 'Mrs Green', text: 'How many cookies did you eat?' },
      { who: 'Oliver', text: 'Not many. Some. Okay, a lot.' },
    ],
    point: 'Much з незлічуваним (milk), many зі злічуваним (cookies), any у питанні, some і a lot of у ствердженні. Олівер чесно пройшов усю шкалу кількості.',
  },
  'question-tags': {
    title: 'Проєкт майже готовий, правда ж?',
    lines: [
      { who: 'Mr Brown', text: 'You’ve finished your project, haven’t you?' },
      { who: 'Harry', text: 'Yes! Well, I’ve finished the title.' },
      { who: 'Mr Brown', text: 'That isn’t a project, is it?' },
      { who: 'Harry', text: 'But it’s a very good title, isn’t it?' },
    ],
    point: 'Після ствердження хвостик заперечний (haven’t you?), після заперечення стверджувальний (is it?). Допоміжне дієслово беремо з самого речення.',
  },
  'question-words': {
    title: 'Хто з’їв торт?',
    lines: [
      { who: 'Mia', text: 'Who ate my cake?' },
      { who: 'Sam', text: 'What cake? Where did you put it?' },
      { who: 'Mia', text: 'In the fridge. Why do you have cream on your nose?' },
      { who: 'Sam', text: 'Who knows?' },
    ],
    point: 'Who ate...? це питання до підмета, тому без did. А в Where did you put...? і Why do you have...? порядок звичний: питальне слово + do / did + підмет.',
  },
  'reflexive-pronouns': {
    title: 'Сам собі перукар',
    lines: [
      { who: 'Chloe', text: 'Who cut your hair?' },
      { who: 'Leo', text: 'I cut it myself.' },
      { who: 'Chloe', text: 'By yourself? Wow. Do you like it?' },
      { who: 'Leo', text: 'I don’t know. I’m too scared to look at myself.' },
    ],
    point: 'Myself: дія повертається на того, хто її робить (look at myself), а by yourself означає «сам, без допомоги». Іноді допомога все ж не завадила б.',
  },
  'relative-clauses': {
    title: 'Кіт, у якого два доми',
    lines: [
      { who: 'Sophie', text: 'Who’s the girl who is waving at you?' },
      { who: 'Ben', text: 'That’s Ruby, whose cat sleeps at my place.' },
      { who: 'Sophie', text: 'Murly? The cat that sleeps on your bed?' },
      { who: 'Ben', text: 'Yes. He has two homes where he gets dinner.' },
    ],
    point: 'Who про людей, that / which про тварин і речі, whose означає «чий», where про місце. З комою (Ruby, whose...) додаємо інформацію, без якої речення й так зрозуміле.',
  },
  'reported-questions': {
    title: 'Бабусин допит',
    lines: [
      { who: 'Oliver', text: 'Grandma asked if I was hungry.' },
      { who: 'Grace', text: 'What did you say?' },
      { who: 'Oliver', text: 'No. Then she asked what I wanted to eat.' },
      { who: 'Grace', text: 'And?' },
      { who: 'Oliver', text: 'Then she asked why I wasn’t eating. I’d had four plates.' },
    ],
    point: 'Переказане питання стає звичайним реченням: asked if I was, asked what I wanted, без did і без знака питання. Час зсувається назад: am → was, want → wanted.',
  },
  'reported-speech': {
    title: 'Найважливіша друга половина',
    lines: [
      { who: 'Lily', text: 'What did Mum say?' },
      { who: 'Max', text: 'She said we could have pizza.' },
      { who: 'Lily', text: 'Yes!' },
      { who: 'Max', text: 'And she told me we had to clean our room first.' },
      { who: 'Lily', text: 'You always forget the second part.' },
    ],
    point: 'Said і told me переказують чужі слова, а час зсувається назад: can → could, have to → had to. Після told завжди кажемо, кому: told me.',
  },
  'should-had-better': {
    title: 'Порада, яка трохи запізнилася',
    lines: [
      { who: 'Chloe', text: 'I ate the whole pizza. I feel terrible.' },
      { who: 'Sam', text: 'You shouldn’t have eaten all of it.' },
      { who: 'Chloe', text: 'Thanks. What should I do now?' },
      { who: 'Sam', text: 'You’d better not tell Mum it was for the whole family.' },
    ],
    point: 'Shouldn’t have + V3 це докір про минуле, should це звичайна порада, а ’d better звучить як попередження «а то буде гірше».',
  },
  'simple-vs-continuous': {
    title: 'Зазвичай паста, а сьогодні...',
    lines: [
      { who: 'Daisy', text: 'Does your dad cook on Sundays?' },
      { who: 'Max', text: 'Yes, he always cooks pasta.' },
      { who: 'Daisy', text: 'Then why is he calling the pizza place?' },
      { who: 'Max', text: 'Because today he’s trying a new recipe.' },
    ],
    point: 'Always cooks: звичка, тому Present Simple. Is calling і ’s trying: те, що відбувається саме зараз, тому Present Continuous, і саме тут уся історія.',
  },
  'so-neither-short-answers': {
    title: 'Я теж! І я теж ні',
    lines: [
      { who: 'Ruby', text: 'I don’t like Mondays.' },
      { who: 'Jack', text: 'Neither do I.' },
      { who: 'Ruby', text: 'I love Saturdays.' },
      { who: 'Jack', text: 'So do I!' },
      { who: 'Ruby', text: 'Do you like homework?' },
      { who: 'Jack', text: 'No, I don’t. Neither does Murly. He just sleeps on it.' },
    ],
    point: 'So do I означає «я теж» у відповідь на ствердження, Neither do I означає «я теж ні» на заперечення. Коротка відповідь повторює допоміжне: No, I don’t.',
  },
  'there-is-are': {
    title: 'Ревізія холодильника',
    lines: [
      { who: 'Mia', text: 'Is there any food in the fridge?' },
      { who: 'Harry', text: 'There is one egg.' },
      { who: 'Mia', text: 'Are there any apples?' },
      { who: 'Harry', text: 'No, there aren’t. But there are two hungry cats.' },
    ],
    point: 'There is для однини (one egg), there are для множини (apples, cats). У питанні is / are стає на початок: Is there...? Are there...?',
  },
  'third-conditional': {
    title: 'Якби я тільки знав',
    lines: [
      { who: 'Leo', text: 'If I had set my alarm, I wouldn’t have missed the bus.' },
      { who: 'Grace', text: 'Relax. The maths test was cancelled.' },
      { who: 'Leo', text: 'Seriously? If I had known that, I would still be in bed now.' },
    ],
    point: 'If + had + V3, would have + V3: уявне минуле, якого не було. А в змішаному типі минула умова дає результат зараз: would still be in bed.',
  },
  'this-that-these-those': {
    title: 'Шопінг на відстані',
    lines: [
      { who: 'Sophie', text: 'Do you like this T-shirt?' },
      { who: 'Emma', text: 'No. I like that one.' },
      { who: 'Sophie', text: 'And these shoes?' },
      { who: 'Emma', text: 'No. Those red ones over there.' },
      { who: 'Sophie', text: 'Emma, those are my shoes.' },
    ],
    point: 'This і these про те, що поруч, that і those про те, що далеко. One / ones замінює іменник, щоб не повторювати: that one, those red ones.',
  },
  'to-be': {
    title: 'Новий учитель має вуса',
    lines: [
      { who: 'Ben', text: 'Hi! I’m Ben. Who are you?' },
      { who: 'Murly', text: 'I’m Murly. I’m your teacher.' },
      { who: 'Ben', text: 'A cat is my teacher?' },
      { who: 'Murly', text: 'Yes. And you are late.' },
    ],
    point: 'Am з I, is з he / she / it, are з you / we / they. Короткі форми I’m і you’re звучать природно, навіть коли тебе сварить кіт.',
  },
  'too-enough': {
    title: 'Коробка, яка завжди підходить',
    lines: [
      { who: 'Lily', text: 'Murly is sitting in that box again.' },
      { who: 'Tom', text: 'But the box is too small for him!' },
      { who: 'Lily', text: 'He thinks it’s big enough.' },
      { who: 'Tom', text: 'He’s such a silly cat.' },
    ],
    point: 'Too small означає «замалий, і це проблема», big enough означає «достатньо великий». So і such просто підсилюють: such a silly cat.',
  },
  'used-to': {
    title: 'Як жили без Wi-Fi',
    lines: [
      { who: 'Sam', text: 'Dad, did you use to have a phone at my age?' },
      { who: 'Mr Brown', text: 'No. We used to play outside. We would climb trees until dark.' },
      { who: 'Sam', text: 'No Wi-Fi? How did you survive?' },
      { who: 'Mr Brown', text: 'Easily. We were used to it. Want to try for one evening?' },
      { who: 'Sam', text: 'I’ll never get used to that.' },
    ],
    point: 'Used to + V і would + V про звички минулого, яких уже немає. Be used to означає «звик», а get used to означає «звикати», і Сем до цього явно не готовий.',
  },
  'was-were': {
    title: 'Дуже хворий уболівальник',
    lines: [
      { who: 'Mrs Green', text: 'Where were you yesterday, Oliver?' },
      { who: 'Oliver', text: 'I was ill.' },
      { who: 'Mrs Green', text: 'Your brother says you were at the football match.' },
      { who: 'Oliver', text: 'Yes. It was a very bad match. I was ill after it.' },
    ],
    point: 'Was з I / he / she / it, were з you / we / they. Так описуємо, де хтось був і яким усе було в минулому: I was ill, you were at the match.',
  },
  'wish-if-only': {
    title: 'Якби ж то кіт умів друкувати',
    lines: [
      { who: 'Harry', text: 'I wish I had a dog.' },
      { who: 'Emma', text: 'But you have Murly.' },
      { who: 'Harry', text: 'I know. I wish he would stop sitting on my keyboard.' },
      { who: 'Emma', text: 'Is that why your essay says “ffffffff”?' },
      { who: 'Harry', text: 'Yes. If only I had checked it before I sent it.' },
    ],
    point: 'Wish + Past Simple про теперішнє, wish + would про те, що дратує, а if only + Past Perfect про жаль за минулим. Есе вже не врятувати.',
  },
  'word-order': {
    title: 'Прикметники стають у чергу',
    lines: [
      { who: 'Mia', text: 'Have you seen my lovely big old blue sweater?' },
      { who: 'Sam', text: 'Yes, I’ve just seen it.' },
      { who: 'Mia', text: 'Where?' },
      { who: 'Sam', text: 'On Biscuit. He’s still wearing it. He was in the garden all morning.' },
    ],
    point: 'Прикметники йдуть у порядку думка → розмір → вік → колір: lovely big old blue. Just і still стоять після допоміжного дієслова, а місце йде перед часом: in the garden all morning.',
  },
};
