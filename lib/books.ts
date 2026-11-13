// Книжки для читання з дітьми: власні прості перекази класичних казок (суспільне надбання), рівні A1-A2.
// Текст наш, без чужих ілюстрацій і без версій студій. Кожне слово клікабельне: переклад з BOOK_DICT, озвучка, «+ у словник».
import type { T } from '@/lib/i18n';
export type Book = { id: string; title: string; titleT: T; level: string; age: string; kit: string; color: string; about: T; pages: string[]; words: string[]; questions: { q: string; options: string[]; answer: number }[]; talk: string[] };
export const BOOKS: Book[] = [
 {
  "id": "three-little-pigs",
  "title": "The Three Little Pigs",
  "titleT": {
   "uk": "Три поросятка",
   "ru": "Три поросёнка",
   "en": "The Three Little Pigs"
  },
  "level": "A1",
  "age": "4-9",
  "kit": "st-cat-box",
  "color": "#F6C3D5",
  "about": {
   "uk": "Три поросятка будують будиночки із соломи, хмизу й цегли. Хто встоїть перед вовком?",
   "ru": "Три поросёнка строят домики из соломы, хвороста и кирпича. Кто устоит перед волком?",
   "en": "Three little pigs build houses of straw, sticks and bricks. Which one can stand up to the wolf?"
  },
  "pages": [
   "Once upon a time there were three little pigs. They lived with their mother in a small house. One day Mother Pig said, \"You are big now. Go and build your own houses.\"",
   "The first little pig met a man with some straw. \"Please give me some straw,\" he said. He built a house of straw. It was fast and easy. Then he played all day.",
   "The second little pig met a man with some sticks. He built a house of sticks. It was fast too. Then he sang and danced. The third little pig met a man with some bricks. He worked all day and built a strong house of bricks.",
   "A big bad wolf came to the straw house. \"Little pig, little pig, let me come in!\" \"No, no, not by the hair on my chinny chin chin!\" \"Then I'll huff and I'll puff and I'll blow your house in!\" And he blew the house in. The little pig ran to his brother's house of sticks.",
   "The wolf came to the house of sticks. He huffed and he puffed and he blew the house in! The two pigs ran to the house of bricks. The wolf huffed and puffed, and puffed and huffed, but he could not blow the house in.",
   "The wolf was very angry. He climbed up on the roof and jumped down the chimney. But the third pig had a big pot of hot water on the fire. Splash! The wolf ran away and never came back. The three little pigs lived happily in the strong brick house."
  ],
  "words": [
   "straw",
   "sticks",
   "bricks",
   "build",
   "wolf",
   "blow",
   "strong",
   "chimney",
   "angry",
   "roof"
  ],
  "questions": [
   {
    "q": "What did the first pig use for his house?",
    "options": [
     "straw",
     "sticks",
     "bricks"
    ],
    "answer": 0
   },
   {
    "q": "Why did the third pig work all day?",
    "options": [
     "He was lazy",
     "He built a strong house",
     "He played with friends"
    ],
    "answer": 1
   },
   {
    "q": "How did the wolf try to get into the brick house?",
    "options": [
     "through the door",
     "through the window",
     "down the chimney"
    ],
    "answer": 2
   },
   {
    "q": "What was in the big pot?",
    "options": [
     "hot water",
     "soup",
     "juice"
    ],
    "answer": 0
   }
  ],
  "talk": [
   "Which house would you build? Why?",
   "Who is your favourite character?",
   "Is it better to work fast or to work well?"
  ]
 },
 {
  "id": "little-red-riding-hood",
  "title": "Little Red Riding Hood",
  "titleT": {
   "uk": "Червона Шапочка",
   "ru": "Красная Шапочка",
   "en": "Little Red Riding Hood"
  },
  "level": "A1-A2",
  "age": "5-10",
  "kit": "st-girl-bow",
  "color": "#F2A9A9",
  "about": {
   "uk": "Дівчинка в червоному капюшоні несе бабусі кошик із тортом. А в лісі на неї чекає вовк.",
   "ru": "Девочка в красном капюшоне несёт бабушке корзинку с тортом. А в лесу её ждёт волк.",
   "en": "A girl in a red hood takes a basket of cake to Grandma. But a wolf is waiting in the forest."
  },
  "pages": [
   "Once upon a time there was a little girl. She always wore a red coat with a hood, so everyone called her Little Red Riding Hood.",
   "One morning her mother said, \"Grandma is ill. Please take her this basket with cake and juice. Stay on the path and don't talk to strangers.\"",
   "Little Red Riding Hood walked into the forest. The birds sang and the flowers were beautiful. Then she met a wolf. \"Where are you going, little girl?\" he asked. \"To my grandma's house,\" she said. \"She lives at the end of the path.\"",
   "The wolf ran to Grandma's house very fast. He went inside, and Grandma hid in the cupboard. The wolf put on Grandma's nightcap and got into her bed.",
   "Little Red Riding Hood came in. \"Grandma, what big ears you have!\" \"All the better to hear you with.\" \"Grandma, what big eyes you have!\" \"All the better to see you with.\" \"Grandma, what big teeth you have!\" \"All the better to eat you with!\"",
   "The wolf jumped out of the bed. Little Red Riding Hood screamed and ran. A woodcutter heard her and came with his axe. The wolf ran away into the forest. Grandma came out of the cupboard. They all had cake and juice together, and Little Red Riding Hood never talked to strangers again."
  ],
  "words": [
   "hood",
   "basket",
   "grandma",
   "forest",
   "path",
   "strangers",
   "wolf",
   "cupboard",
   "teeth",
   "woodcutter"
  ],
  "questions": [
   {
    "q": "What was in the basket?",
    "options": [
     "cake and juice",
     "bread and milk",
     "apples"
    ],
    "answer": 0
   },
   {
    "q": "What did Mother say?",
    "options": [
     "Run fast",
     "Don’t talk to strangers",
     "Sing a song"
    ],
    "answer": 1
   },
   {
    "q": "Where did Grandma hide?",
    "options": [
     "under the bed",
     "in the cupboard",
     "in the garden"
    ],
    "answer": 1
   },
   {
    "q": "Who helped Little Red Riding Hood?",
    "options": [
     "a woodcutter",
     "a king",
     "a bird"
    ],
    "answer": 0
   }
  ],
  "talk": [
   "What do you take when you visit your grandma?",
   "Why is it important not to talk to strangers?",
   "What big things does the wolf have?"
  ]
 },
 {
  "id": "cinderella",
  "title": "Cinderella",
  "titleT": {
   "uk": "Попелюшка",
   "ru": "Золушка",
   "en": "Cinderella"
  },
  "level": "A2",
  "age": "6-12",
  "kit": "st-cat-heart",
  "color": "#C6DDF8",
  "about": {
   "uk": "Добра дівчина, зла мачуха, бал у палаці, чарівна хрещена й скляна туфелька. Класична казка простою англійською.",
   "ru": "Добрая девушка, злая мачеха, бал во дворце, волшебная крёстная и стеклянная туфелька. Классическая сказка простым английским.",
   "en": "A kind girl, a cruel stepmother, a ball at the palace, a fairy godmother and a glass slipper. The classic tale in simple English."
  },
  "pages": [
   "Once upon a time there was a kind girl. Her mother died, and her father married again. Her stepmother had two daughters. They were rude and lazy.",
   "The girl did all the work in the house. She cleaned, cooked and washed the clothes. In the evening she sat near the fire in the ashes, so the sisters called her Cinderella.",
   "One day a letter came from the palace. \"The king invites everyone to a ball. The prince wants to find a wife.\" The sisters bought new dresses. \"You can't go,\" the stepmother said to Cinderella. \"You have nothing to wear.\"",
   "On the night of the ball Cinderella cried in the garden. Suddenly her fairy godmother appeared. She touched a pumpkin with her magic wand, and it became a golden coach. The mice became white horses. Cinderella's old dress became a beautiful gown, and on her feet there were glass slippers. \"Go to the ball,\" said the fairy godmother, \"but come home before midnight. At twelve o'clock the magic will end.\"",
   "At the palace everyone looked at the beautiful girl. The prince danced with her all evening. Then the clock started to strike twelve. Cinderella ran out of the palace. On the stairs she lost one glass slipper.",
   "The next day the prince visited every house in the kingdom. \"The girl who can wear this slipper will be my wife.\" The two sisters tried it on, but their feet were too big. Then Cinderella tried it. It fitted perfectly!",
   "Cinderella married the prince. She was kind, so she forgave her stepsisters. And they all lived happily ever after."
  ],
  "words": [
   "stepmother",
   "palace",
   "ball",
   "prince",
   "fairy",
   "godmother",
   "pumpkin",
   "coach",
   "midnight",
   "slipper"
  ],
  "questions": [
   {
    "q": "Why did the sisters call her Cinderella?",
    "options": [
     "She sat in the ashes",
     "She liked cats",
     "Her name was Ella"
    ],
    "answer": 0
   },
   {
    "q": "What did the pumpkin become?",
    "options": [
     "a horse",
     "a golden coach",
     "a dress"
    ],
    "answer": 1
   },
   {
    "q": "When must Cinderella come home?",
    "options": [
     "before midnight",
     "in the morning",
     "at six o’clock"
    ],
    "answer": 0
   },
   {
    "q": "What did Cinderella lose?",
    "options": [
     "her dress",
     "a glass slipper",
     "her bag"
    ],
    "answer": 1
   }
  ],
  "talk": [
   "Was Cinderella kind? How do you know?",
   "What would you ask a fairy godmother for?",
   "Did Cinderella do the right thing when she forgave her sisters?"
  ]
 }
];
export const bookById = (id: string) => BOOKS.find((b) => b.id === id);
