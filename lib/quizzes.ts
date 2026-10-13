// Квізи Murly. Новий квіз = новий об'єкт у цьому масиві.
export type Question = {
  stem: string;          // ___ позначає пропуск
  hint: string;
  options: string[];
  answer: number;        // індекс правильного варіанта
  ai: string;            // пояснення "Чому так?"
  passage?: boolean;     // показувати текст для читання
};

export type Quiz = {
  slug: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  passage?: string;      // HTML тексту для reading
  questions: Question[];
};

export const QUIZZES: Quiz[] = [
  {
    slug: 'teen-life',
    number: '01',
    title: 'Teen Life',
    description: '8 завдань НМТ формату на тему шкільного життя, друзів і соцмереж.',
    icon: 'e-speak',
    questions: [
  {
    "stem": "My best friend ___ three languages fluently.",
    "hint": "Teen Life · Present Simple",
    "options": [
      "speak",
      "speaks",
      "is speaking",
      "has spoken"
    ],
    "answer": 1,
    "ai": "З підметом «my best friend» (третя особа однини) у Present Simple дієслово завжди отримує -s / -es. Тому speak → speaks."
  },
  {
    "stem": "I ___ to that Billie Eilish concert last summer. It was unforgettable!",
    "hint": "Teen Life · Past Simple vs Present Perfect",
    "options": [
      "went",
      "have gone",
      "go",
      "was going"
    ],
    "answer": 0,
    "ai": "Маркер «last summer» точно вказує на завершений момент у минулому, тому Past Simple: went. Present Perfect з такими маркерами не ставимо."
  },
  {
    "stem": "By the time the lesson started, we ___ our homework already.",
    "hint": "Teen Life · Past Perfect",
    "options": [
      "finished",
      "were finishing",
      "had finished",
      "have finished"
    ],
    "answer": 2,
    "ai": "Дія сталася ДО іншої минулої дії («the lesson started»), тому ставимо Past Perfect: had finished."
  },
  {
    "stem": "What ___ you doing this weekend?",
    "hint": "Teen Life · Future plans",
    "options": [
      "are",
      "were",
      "will be",
      "had been"
    ],
    "answer": 0,
    "ai": "Про плани на найближче майбутнє говоримо через Present Continuous: are you doing. Це найприродніший і найпоширеніший варіант у розмовній англійській."
  },
  {
    "stem": "If I ___ more sleep, I would be more focused in class.",
    "hint": "Teen Life · Second Conditional",
    "options": [
      "got",
      "get",
      "had got",
      "would get"
    ],
    "answer": 0,
    "ai": "Другий тип умовного речення (нереальна/малоймовірна ситуація): if + Past Simple, would + V. Тому «got», а не «get»."
  },
  {
    "stem": "My phone ___ since Monday: I think I need to repair it.",
    "hint": "Teen Life · Present Perfect Continuous",
    "options": [
      "doesn't work",
      "isn't working",
      "hasn't been working",
      "wasn't working"
    ],
    "answer": 2,
    "ai": "Процес почався в минулому («since Monday») і триває зараз, тому Present Perfect Continuous. Для стану («not working») використовуємо саме цю форму."
  },
  {
    "stem": "TikTok ___ by over a billion people every month.",
    "hint": "Teen Life · Passive Voice",
    "options": [
      "uses",
      "is used",
      "used",
      "has used"
    ],
    "answer": 1,
    "ai": "Пасивний стан у Present Simple: is / are + V3. Тут «TikTok is used», тобто його використовують, а не воно щось робить."
  },
  {
    "stem": "She told me she ___ to the party on Saturday.",
    "hint": "Teen Life · Reported Speech",
    "options": [
      "will come",
      "would come",
      "is coming",
      "came"
    ],
    "answer": 1,
    "ai": "У reported speech час «зсувається» на один крок у минуле. Direct: «I will come.» → Reported: «She said she would come.»"
  }
],
  },
  {
    slug: 'films-netflix',
    number: '02',
    title: 'Films & Netflix',
    description: 'Reading про трейлери і серіали плюс use of English. 8 завдань у форматі НМТ.',
    icon: 'd-camera',
    passage: "<h3 class=\"q-passage__title\">Ten Seconds to Hook You</h3>\n<p><b>A</b> Streaming platforms used to release one long trailer for a new series. Today many studios cut a six-second teaser first, because viewers scrolling on their phones decide almost instantly whether to keep watching.</p>\n<p><b>B</b> Marketing teams test dozens of versions before a show comes out. If audiences skip a clip within the first three seconds, editors move the most exciting scene to the very beginning. Some fans complain that this habit spoils the best moments of the story.</p>\n<p><b>C</b> Not everyone is worried, however. Director Lena Ortiz says that a short teaser works like a movie poster: it only has to make you curious. \"The full trailer still exists,\" she explains, \"but people have to want to find it.\"</p>\n<p><b>D</b> Researchers who study attention also point out that teenagers are not simply less patient. They are better at judging quickly whether something is worth their time.</p>",
    questions: [
  {
    "stem": "Why do many studios release a six-second teaser first?",
    "hint": "Reading · Деталь у тексті",
    "options": [
      "It is cheaper to produce",
      "Viewers decide very quickly whether to watch",
      "Long trailers are not allowed on phones",
      "Fans asked for shorter videos"
    ],
    "answer": 1,
    "ai": "Абзац A: «viewers scrolling on their phones decide almost instantly whether to keep watching». Про ціну, заборони чи прохання фанатів у тексті нічого немає. На НМТ правильна відповідь завжди спирається на конкретне речення.",
    "passage": true
  },
  {
    "stem": "What do editors do if audiences skip a clip in the first three seconds?",
    "hint": "Reading · Деталь у тексті",
    "options": [
      "They delete the clip",
      "They make the clip longer",
      "They put the most exciting scene at the start",
      "They add louder music"
    ],
    "answer": 2,
    "ai": "Абзац B: «editors move the most exciting scene to the very beginning». Move to the beginning і put at the start означають одне й те саме: НМТ любить перефразування.",
    "passage": true
  },
  {
    "stem": "According to Lena Ortiz, the main job of a short teaser is to...",
    "hint": "Reading · Думка автора",
    "options": [
      "tell the whole story",
      "replace the full trailer",
      "make viewers curious",
      "look exactly like a poster"
    ],
    "answer": 2,
    "ai": "Вона каже: «it only has to make you curious». Варіант D пастка: teaser «works like» a poster, тобто схожий за роллю, а не виглядає так само. Повний трейлер «still exists», тож B теж не підходить.",
    "passage": true
  },
  {
    "stem": "What is the main idea of paragraph D?",
    "hint": "Reading · Головна думка",
    "options": [
      "Teenagers cannot concentrate",
      "Teenagers quickly judge what deserves their attention",
      "Researchers dislike short trailers",
      "Attention spans are getting longer"
    ],
    "answer": 1,
    "ai": "Ключове речення: «They are better at judging quickly whether something is worth their time». Варіант A прямо протилежний: автор каже, що підлітки «not simply less patient».",
    "passage": true
  },
  {
    "stem": "The series was so good that I watched all eight episodes ___ one night.",
    "hint": "Use of English · Прийменники",
    "options": [
      "in",
      "at",
      "on",
      "by"
    ],
    "answer": 0,
    "ai": "In one night, тобто за одну ніч, у межах цього часу. At night означає «вночі» взагалі, а on вживаємо з датами й днями: on Friday night."
  },
  {
    "stem": "She was really looking forward to ___ the new season.",
    "hint": "Use of English · Gerund",
    "options": [
      "watch",
      "watching",
      "watched",
      "be watched"
    ],
    "answer": 1,
    "ai": "Look forward to: тут to це прийменник, а не частка інфінітива. Після прийменника завжди йде -ing: looking forward to watching."
  },
  {
    "stem": "By the time the trailer came out, fans ___ about the plot for months.",
    "hint": "Use of English · Past Perfect Continuous",
    "options": [
      "were talking",
      "have talked",
      "had been talking",
      "talk"
    ],
    "answer": 2,
    "ai": "Дія тривала до іншої минулої події (trailer came out) і мала тривалість (for months). Це Past Perfect Continuous: had been talking."
  },
  {
    "stem": "If the ending ___ less predictable, the film would have won more awards.",
    "hint": "Use of English · Third Conditional",
    "options": [
      "was",
      "had been",
      "were",
      "would be"
    ],
    "answer": 1,
    "ai": "Друга частина «would have won» показує нереальне минуле, тобто третій тип умовних. В if-частині Past Perfect: had been."
  }
],
  },
];

export const getQuiz = (slug: string) => QUIZZES.find((q) => q.slug === slug);
