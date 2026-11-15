// Книжки для читання з дітьми: власні прості перекази класичних казок (суспільне надбання), рівні A1-A2.
// Текст наш, без чужих ілюстрацій і без версій студій. Кожне слово клікабельне: переклад з BOOK_DICT, озвучка, «+ у словник».
import type { T } from '@/lib/i18n';
export type Book = { id: string; title: string; titleT: T; level: string; age: string; kit: string; color: string; about: T; pages: string[]; words: string[]; questions: { q: string; options: string[]; answer: number }[]; talk: string[]; base?: string; harder?: string };
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
  ],
  "harder": "three-little-pigs-b1"
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
  ],
  "harder": "little-red-riding-hood-b1"
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
  ],
  "harder": "cinderella-b1"
 },
 {
  "id": "ugly-duckling",
  "title": "The Ugly Duckling",
  "titleT": {
   "uk": "Гидке каченя",
   "ru": "Гадкий утёнок",
   "en": "The Ugly Duckling"
  },
  "level": "A1",
  "age": "4-9",
  "kit": "st-cat-shock",
  "color": "#FBEBB2",
  "about": {
   "uk": "Сіре каченя, з якого всі сміються, переживає холодну зиму і навесні дізнається, хто воно насправді.",
   "ru": "Серый утёнок, над которым все смеются, переживает холодную зиму и весной узнаёт, кто он на самом деле.",
   "en": "A grey duckling everyone laughs at survives a cold winter and finds out who he really is in spring."
  },
  "pages": [
   "It was summer. A mother duck sat on her eggs near the river. One by one the eggs opened, and little yellow ducklings came out. But the last egg was very big.",
   "At last the big egg opened. Out came a grey duckling. He was big and ugly. \"He doesn't look like us,\" said the other ducks. They laughed at him every day.",
   "The ugly duckling was very sad. One morning he ran away from the farm. He walked and walked. Nobody wanted to be his friend.",
   "Autumn came, and then winter. It was very cold. The duckling lived alone near a frozen lake. He was hungry and tired, but he did not give up.",
   "Then spring came. The sun was warm again. The duckling saw some beautiful white birds on the lake. \"They are so beautiful,\" he thought. \"They will laugh at me too.\"",
   "He looked into the water and saw his reflection. He was not an ugly duckling now. He was a beautiful white swan! The other swans swam to him. \"Come with us,\" they said. And he was happy at last."
  ],
  "words": [
   "duckling",
   "egg",
   "ugly",
   "laughed",
   "sad",
   "winter",
   "frozen",
   "spring",
   "reflection",
   "swan"
  ],
  "questions": [
   {
    "q": "What colour was the last duckling?",
    "options": [
     "yellow",
     "grey",
     "white"
    ],
    "answer": 1
   },
   {
    "q": "Why did he run away?",
    "options": [
     "He was hungry",
     "The ducks laughed at him",
     "He wanted to swim"
    ],
    "answer": 1
   },
   {
    "q": "Where did he live in winter?",
    "options": [
     "near a frozen lake",
     "on a farm",
     "in a house"
    ],
    "answer": 0
   },
   {
    "q": "What was he at the end?",
    "options": [
     "a duck",
     "a swan",
     "a goose"
    ],
    "answer": 1
   }
  ],
  "talk": [
   "How did the duckling feel? Why?",
   "What can we do when someone is different?",
   "What is your favourite season? Why?"
  ],
  "harder": "ugly-duckling-b1"
 },
 {
  "id": "hansel-and-gretel",
  "title": "Hansel and Gretel",
  "titleT": {
   "uk": "Гензель і Гретель",
   "ru": "Гензель и Гретель",
   "en": "Hansel and Gretel"
  },
  "level": "A2",
  "age": "6-11",
  "kit": "st-boy-backpack",
  "color": "#D7EDB4",
  "about": {
   "uk": "Брат і сестра губляться в лісі й знаходять будиночок із хліба й цукру. Але господиня там зовсім не добра.",
   "ru": "Брат и сестра теряются в лесу и находят домик из хлеба и сахара. Но хозяйка там совсем не добрая.",
   "en": "A brother and sister get lost in the forest and find a house made of bread and sugar. But its owner is not kind at all."
  },
  "pages": [
   "Once upon a time a poor woodcutter lived near a big forest with his two children, Hansel and Gretel. They had very little food.",
   "One day the children got lost in the forest. They walked for hours. They were hungry and scared.",
   "Suddenly they saw a little house. It was made of bread and cake, and the windows were made of sugar! The children started to eat the house.",
   "The door opened, and an old woman came out. \"Come in, children,\" she said with a smile. \"I have more food for you.\" But she was a bad witch.",
   "The witch put Hansel in a cage. \"I will make you fat,\" she said. Gretel had to cook and clean all day. She was very afraid, but she had a clever plan.",
   "One day the witch opened the big oven. \"Look inside, Gretel. Is it hot?\" \"I don't know how,\" said Gretel. \"Show me.\" The witch looked inside, and Gretel pushed her in and shut the door!",
   "Gretel opened the cage. In the house the children found gold and jewels. They ran home through the forest. Their father was so happy to see them. They were never poor again."
  ],
  "words": [
   "poor",
   "lost",
   "hungry",
   "sugar",
   "witch",
   "cage",
   "clever",
   "plan",
   "oven",
   "jewels"
  ],
  "questions": [
   {
    "q": "What was the house made of?",
    "options": [
     "stone and wood",
     "bread, cake and sugar",
     "glass"
    ],
    "answer": 1
   },
   {
    "q": "Where did the witch put Hansel?",
    "options": [
     "in a cage",
     "in the oven",
     "in the garden"
    ],
    "answer": 0
   },
   {
    "q": "Who had a clever plan?",
    "options": [
     "Hansel",
     "the witch",
     "Gretel"
    ],
    "answer": 2
   },
   {
    "q": "What did the children find?",
    "options": [
     "gold and jewels",
     "a map",
     "a cat"
    ],
    "answer": 0
   }
  ],
  "talk": [
   "Was Gretel brave? Why?",
   "What would you do if you got lost in a forest?",
   "What would your dream house be made of?"
  ],
  "harder": "hansel-and-gretel-b1"
 },
 {
  "id": "goldilocks",
  "title": "Goldilocks and the Three Bears",
  "titleT": {
   "uk": "Златовласка і три ведмеді",
   "ru": "Златовласка и три медведя",
   "en": "Goldilocks and the Three Bears"
  },
  "level": "A1",
  "age": "4-9",
  "kit": "st-cat-loaf",
  "color": "#FDD5B8",
  "about": {
   "uk": "Дівчинка із золотим волоссям заходить у будиночок трьох ведмедів: каша, стільці й ліжка, і все «якраз».",
   "ru": "Девочка с золотыми волосами заходит в домик трёх медведей: каша, стулья и кровати, и всё «в самый раз».",
   "en": "A girl with golden hair walks into the three bears’ house: porridge, chairs and beds, and one of each is just right."
  },
  "pages": [
   "Once upon a time three bears lived in a house in the woods: Father Bear, Mother Bear and Baby Bear. One morning they made porridge, but it was too hot. So they went for a walk.",
   "A little girl with golden hair came to the house. Her name was Goldilocks. The door was open, so she went in. Nobody was at home.",
   "On the table there were three bowls of porridge. Father Bear's porridge was too hot. Mother Bear's porridge was too cold. Baby Bear's porridge was just right, and she ate it all up!",
   "Then she saw three chairs. The big chair was too hard. The middle chair was too soft. The little chair was just right, but she sat on it and it broke!",
   "Goldilocks was tired. She went upstairs and saw three beds. The big bed was too hard, the middle bed was too soft, and the little bed was just right. She fell asleep.",
   "The bears came home. \"Someone ate my porridge!\" cried Baby Bear. \"Someone broke my chair!\" Then they went upstairs. \"Someone is sleeping in my bed, and here she is!\"",
   "Goldilocks woke up and saw the three bears. She jumped out of the window and ran home as fast as she could. She never went into the bears' house again."
  ],
  "words": [
   "bear",
   "porridge",
   "bowls",
   "hot",
   "cold",
   "chair",
   "hard",
   "soft",
   "just",
   "upstairs"
  ],
  "questions": [
   {
    "q": "Why did the bears go for a walk?",
    "options": [
     "The porridge was too hot",
     "It was sunny",
     "They were bored"
    ],
    "answer": 0
   },
   {
    "q": "Whose porridge did Goldilocks eat?",
    "options": [
     "Father Bear’s",
     "Mother Bear’s",
     "Baby Bear’s"
    ],
    "answer": 2
   },
   {
    "q": "What happened to the little chair?",
    "options": [
     "It broke",
     "It was too hard",
     "It was red"
    ],
    "answer": 0
   },
   {
    "q": "How did Goldilocks leave?",
    "options": [
     "through the door",
     "through the window",
     "with the bears"
    ],
    "answer": 1
   }
  ],
  "talk": [
   "Was it OK to go into the bears’ house? Why?",
   "Do you like your porridge hot or cold?",
   "What is “just right” for you: big, middle or small?"
  ],
  "harder": "goldilocks-b1"
 },
 {
  "id": "tortoise-and-hare",
  "title": "The Tortoise and the Hare",
  "titleT": {
   "uk": "Черепаха і заєць",
   "ru": "Черепаха и заяц",
   "en": "The Tortoise and the Hare"
  },
  "level": "A1",
  "age": "4-10",
  "kit": "st-cat-nightcap",
  "color": "#C9DEC6",
  "about": {
   "uk": "Байка Езопа: пихатий заєць і повільна черепаха влаштовують перегони. Хто прийде першим?",
   "ru": "Басня Эзопа: хвастливый заяц и медленная черепаха устраивают забег. Кто придёт первым?",
   "en": "Aesop’s fable: a proud hare and a slow tortoise have a race. Who will win?"
  },
  "pages": [
   "A hare was very proud. \"I am the fastest animal in the forest,\" he said every day. \"Nobody can run like me.\"",
   "A tortoise was tired of this. \"Let's have a race,\" she said. The hare laughed. \"You? You are so slow!\" But he said yes.",
   "The race started. The hare ran very fast, and soon he was far ahead. He looked back. The tortoise was a small dot on the road.",
   "\"I have lots of time,\" said the hare. \"I can have a little sleep.\" He lay down under a tree and closed his eyes.",
   "The tortoise walked and walked. She did not stop. Slowly, slowly, she passed the sleeping hare.",
   "The hare woke up and ran to the finish, but it was too late. The tortoise was already there! Slow and steady wins the race."
  ],
  "words": [
   "hare",
   "tortoise",
   "proud",
   "race",
   "fast",
   "slow",
   "sleep",
   "finish",
   "steady",
   "wins"
  ],
  "questions": [
   {
    "q": "Who was proud?",
    "options": [
     "the tortoise",
     "the hare",
     "the fox"
    ],
    "answer": 1
   },
   {
    "q": "What did the hare do during the race?",
    "options": [
     "He ate",
     "He slept",
     "He swam"
    ],
    "answer": 1
   },
   {
    "q": "Who won the race?",
    "options": [
     "the hare",
     "the tortoise",
     "nobody"
    ],
    "answer": 1
   },
   {
    "q": "What is the lesson?",
    "options": [
     "Slow and steady wins the race",
     "Always run fast",
     "Sleep a lot"
    ],
    "answer": 0
   }
  ],
  "talk": [
   "Are you more like the tortoise or the hare?",
   "Why is it bad to be too proud?",
   "Tell about a time you did not give up."
  ],
  "harder": "tortoise-and-hare-b1"
 },
 {
  "id": "lion-and-mouse",
  "title": "The Lion and the Mouse",
  "titleT": {
   "uk": "Лев і миша",
   "ru": "Лев и мышь",
   "en": "The Lion and the Mouse"
  },
  "level": "A1",
  "age": "4-10",
  "kit": "st-cat-please",
  "color": "#F5F0A8",
  "about": {
   "uk": "Байка Езопа: великий лев відпускає маленьку мишку, а згодом вона рятує йому життя.",
   "ru": "Басня Эзопа: большой лев отпускает маленькую мышку, а потом она спасает ему жизнь.",
   "en": "Aesop’s fable: a big lion lets a little mouse go, and later she saves his life."
  },
  "pages": [
   "A big lion was sleeping in the sun. A little mouse ran over his nose. The lion woke up and caught the mouse with his paw.",
   "\"Please don't eat me!\" said the mouse. \"Let me go, and one day I will help you.\" The lion laughed. \"How can a little mouse help a big lion?\" But he let the mouse go.",
   "Some days later, hunters came to the forest. They caught the lion in a big net. He roared and roared, but he could not get out.",
   "The little mouse heard him. She ran to the net and started to bite the ropes. She bit and bit, and soon there was a big hole.",
   "The lion was free! \"Thank you, little friend,\" he said. \"You were right.\" Little friends can be great friends."
  ],
  "words": [
   "lion",
   "mouse",
   "paw",
   "help",
   "hunters",
   "net",
   "roared",
   "bite",
   "ropes",
   "free"
  ],
  "questions": [
   {
    "q": "Where was the lion sleeping?",
    "options": [
     "in the sun",
     "in a cave",
     "in the water"
    ],
    "answer": 0
   },
   {
    "q": "What did the hunters use?",
    "options": [
     "a big net",
     "a cage",
     "a rope ladder"
    ],
    "answer": 0
   },
   {
    "q": "How did the mouse help?",
    "options": [
     "She called friends",
     "She bit the ropes",
     "She roared"
    ],
    "answer": 1
   },
   {
    "q": "What is the lesson?",
    "options": [
     "Little friends can be great friends",
     "Lions are kind",
     "Mice are fast"
    ],
    "answer": 0
   }
  ],
  "talk": [
   "Have you ever helped someone bigger or older than you?",
   "Why did the lion laugh?",
   "What makes a good friend?"
  ],
  "harder": "lion-and-mouse-b1"
 },
 {
  "id": "three-little-pigs-b1",
  "title": "The Three Little Pigs",
  "titleT": {
   "uk": "Три поросятка",
   "ru": "Три поросёнка",
   "en": "The Three Little Pigs"
  },
  "level": "B1-B2",
  "age": "10+",
  "kit": "st-cat-box",
  "color": "#F6C3D5",
  "about": {
   "uk": "Та сама казка для підлітків і дорослих: довші речення, Past Simple і Past Perfect, корисні фрази на кшталт make your own way, good enough, worth the effort.",
   "ru": "Та же сказка для подростков и взрослых: длинные предложения, Past Simple и Past Perfect, полезные фразы вроде make your own way, good enough, worth the effort.",
   "en": "The same tale for teens and adults: longer sentences, past simple and past perfect, phrases like make your own way, good enough, worth the effort."
  },
  "pages": [
   "Once upon a time there was an old mother pig who had three sons. She was poor, and her house was becoming too small for the family. One spring morning she called them together. \"You are grown up now,\" she told them. \"It's time to go out into the world and make your own way. Build your homes carefully, because the big bad wolf is always hungry.\"",
   "The first little pig was lazy and only wanted to have fun. On the road he met a farmer carrying a bundle of straw. \"That will do,\" he thought, and he built a house of straw in less than an hour. Then he spent the rest of the day lying in the sun and playing his flute.",
   "The second little pig was a bit more careful, but not much. He bought some sticks from a woodcutter and put them together with string. His house took a whole afternoon to build. \"It's good enough,\" he said, and went off to dance at the village fair.",
   "The third little pig was different. He knew that a good house needs time and hard work. He bought bricks and cement, and for days he worked from morning until night while his brothers laughed at him. \"Why are you wasting your time?\" they asked. \"You'll see,\" he answered calmly.",
   "Before long, the wolf arrived at the straw house. \"Little pig, little pig, let me come in!\" he called. The pig refused, so the wolf took a deep breath, huffed and puffed, and blew the house down in seconds. The terrified pig escaped and ran all the way to his brother's house of sticks.",
   "The wolf followed him. He huffed and puffed again, and the sticks flew in every direction. Now both brothers were running for their lives towards the brick house, where the third pig let them in and locked the door behind them.",
   "The wolf huffed and puffed until he was red in the face, but the brick house didn't move at all. Furious, he decided to climb onto the roof and slide down the chimney. However, the clever third pig had heard him on the roof and had already put a huge pot of water on the fire.",
   "With a loud splash the wolf landed in the boiling water. He jumped out with a howl, shot back up the chimney and disappeared into the forest, never to be seen again. From that day on, the two lazy brothers understood that doing things properly is always worth the effort."
  ],
  "words": [
   "grown",
   "carefully",
   "bundle",
   "careful",
   "cement",
   "calmly",
   "refused",
   "terrified",
   "furious",
   "effort"
  ],
  "questions": [
   {
    "q": "Why did the mother send her sons away?",
    "options": [
     "She was angry",
     "The house was too small and they were grown up",
     "The wolf came"
    ],
    "answer": 1
   },
   {
    "q": "What did the third pig’s brothers think of his work?",
    "options": [
     "They helped him",
     "They laughed at him",
     "They paid him"
    ],
    "answer": 1
   },
   {
    "q": "How did the third pig know the wolf was coming down the chimney?",
    "options": [
     "He heard him on the roof",
     "A bird told him",
     "He saw him in the window"
    ],
    "answer": 0
   },
   {
    "q": "What did the lazy brothers understand at the end?",
    "options": [
     "Straw is cheap",
     "Doing things properly is worth the effort",
     "Wolves are kind"
    ],
    "answer": 1
   }
  ],
  "talk": [
   "Which brother are you most like? Give an example.",
   "Is “good enough” sometimes good enough? When?",
   "What is something you did that was worth the effort?"
  ],
  "base": "three-little-pigs"
 },
 {
  "id": "little-red-riding-hood-b1",
  "title": "Little Red Riding Hood",
  "titleT": {
   "uk": "Червона Шапочка",
   "ru": "Красная Шапочка",
   "en": "Little Red Riding Hood"
  },
  "level": "B1-B2",
  "age": "10+",
  "kit": "st-girl-bow",
  "color": "#F2A9A9",
  "about": {
   "uk": "Розширена версія: Past Continuous (while she was wandering), умовні речення, ввічливі фрази й should have.",
   "ru": "Расширенная версия: Past Continuous (while she was wandering), условные предложения, вежливые фразы и should have.",
   "en": "The longer version: past continuous (while she was wandering), polite phrases and should have."
  },
  "pages": [
   "There was once a cheerful little girl who lived on the edge of a great forest. Her grandmother had made her a red velvet cloak with a hood, and she loved it so much that she wore it everywhere. Soon the whole village was calling her Little Red Riding Hood.",
   "One morning her mother packed a basket with fresh bread, a cake and a bottle of juice. \"Your grandmother isn't feeling well,\" she said. \"Take this to her, but promise me two things: don't leave the path, and don't stop to chat with anyone you don't know.\" The girl promised and set off happily.",
   "The forest was full of birdsong and wild flowers. Little Red Riding Hood was admiring them when a wolf stepped out from behind a tree. He looked friendly and spoke very politely. \"Good morning, young lady. Where are you going so early?\" Forgetting her promise, she told him everything, even exactly where her grandmother lived.",
   "\"Why don't you pick some flowers for her?\" the wolf suggested. \"She would love them.\" While the girl was wandering off the path, the wolf raced ahead by a shorter way. He knocked on the grandmother's door, pretending to be her granddaughter.",
   "The grandmother, who had been resting in bed, opened the door and saw the wolf. Luckily, she was quicker than he expected and locked herself in the wardrobe. The wolf didn't waste time looking for her. He put on her nightgown and cap, pulled the blanket up to his nose and waited.",
   "When Little Red Riding Hood arrived, she noticed that something was strange. \"Grandmother, what big ears you have!\" \"All the better to hear you with, my dear.\" \"And what big eyes you have!\" \"All the better to see you with.\" \"And what enormous teeth you have!\" \"All the better to eat you with!\"",
   "The wolf leapt out of bed, but the girl screamed so loudly that a woodcutter working nearby heard her. He rushed in with his axe raised, and the wolf, realising he was beaten, ran off into the forest as fast as his legs could carry him.",
   "The grandmother came out of the wardrobe, shaken but unhurt. The three of them sat down to share the cake and juice, and Little Red Riding Hood admitted that she should have listened to her mother. She never left the path again."
  ],
  "words": [
   "cheerful",
   "velvet",
   "cloak",
   "promise",
   "admiring",
   "politely",
   "pretending",
   "wardrobe",
   "realising",
   "admitted"
  ],
  "questions": [
   {
    "q": "Who made the red cloak?",
    "options": [
     "her mother",
     "her grandmother",
     "a woodcutter"
    ],
    "answer": 1
   },
   {
    "q": "What two things did the girl promise?",
    "options": [
     "to run and sing",
     "not to leave the path and not to chat with strangers",
     "to pick flowers and be quick"
    ],
    "answer": 1
   },
   {
    "q": "How did the wolf get to the house first?",
    "options": [
     "He took a shorter way",
     "He had a horse",
     "He flew"
    ],
    "answer": 0
   },
   {
    "q": "What did the girl admit at the end?",
    "options": [
     "She should have listened to her mother",
     "She liked the wolf",
     "She was tired"
    ],
    "answer": 0
   }
  ],
  "talk": [
   "Why did the girl forget her promise?",
   "Why can friendly strangers be dangerous online too?",
   "Tell about a time you should have listened to someone."
  ],
  "base": "little-red-riding-hood"
 },
 {
  "id": "cinderella-b1",
  "title": "Cinderella",
  "titleT": {
   "uk": "Попелюшка",
   "ru": "Золушка",
   "en": "Cinderella"
  },
  "level": "B1-B2",
  "age": "11+",
  "kit": "st-cat-heart",
  "color": "#C6DDF8",
  "about": {
   "uk": "Класична Попелюшка для B1-B2: Past Perfect, пасив (was treated, were invited), фразові дієслова (set off, lose track of time, turn into).",
   "ru": "Классическая Золушка для B1-B2: Past Perfect, пассив (was treated, were invited), фразовые глаголы (set off, lose track of time, turn into).",
   "en": "Classic Cinderella for B1-B2: past perfect, the passive (was treated, were invited) and phrasal verbs (lose track of time, turn into)."
  },
  "pages": [
   "Long ago there lived a gentle, good-hearted girl whose mother had died when she was small. Some years later her father married a proud and selfish woman with two daughters of her own. Soon after the wedding her father went away on a long journey, and the stepmother showed her true character.",
   "From that day the girl was treated like a servant. She scrubbed the floors, cooked every meal and mended her stepsisters' fine clothes, while they spent their time admiring themselves in the mirror. At night, exhausted, she slept by the kitchen fire among the cinders, which is how she got the name Cinderella.",
   "One day an invitation arrived from the palace. The king was giving a grand ball, and every young woman in the kingdom was invited, because the prince was looking for a bride. The stepsisters talked about nothing else for weeks. When Cinderella asked if she could go too, her stepmother laughed. \"You? In those rags? Don't be ridiculous.\"",
   "On the evening of the ball, after helping her stepsisters dress, Cinderella sat alone in the garden and cried. Suddenly a soft light appeared, and an old woman with a silver wand stood in front of her. \"I am your fairy godmother,\" she said kindly. \"Dry your tears. You shall go to the ball.\"",
   "With a wave of her wand she turned a pumpkin into a golden carriage, six mice into elegant horses and a rat into a coachman. Then she touched Cinderella's old dress, and it became a shimmering gown, with a pair of delicate glass slippers to match. \"There is just one condition,\" she warned. \"The magic will only last until midnight. You must leave before the clock strikes twelve.\"",
   "When Cinderella entered the ballroom, the music seemed to stop. Nobody recognised her, not even her stepsisters. The prince could not take his eyes off the mysterious guest, and he danced with no one else all night. Cinderella was so happy that she completely lost track of time.",
   "Suddenly the clock began to strike midnight. Without a word of explanation she ran from the ballroom and down the palace steps. In her hurry one of the glass slippers fell off, but there was no time to go back for it. By the time she reached the road, her carriage had turned back into a pumpkin.",
   "The heartbroken prince announced that he would marry the girl whose foot fitted the slipper. His servants travelled across the whole kingdom. When they came to Cinderella's house, the stepsisters pushed and squeezed, but their feet were far too large. Then Cinderella quietly asked if she might try. The slipper fitted perfectly, and she took the other one out of her pocket.",
   "Cinderella and the prince were married soon afterwards. Instead of punishing her stepfamily, she forgave them and invited them to live at the palace. Her kindness had been her greatest strength all along."
  ],
  "words": [
   "gentle",
   "selfish",
   "servant",
   "exhausted",
   "invitation",
   "ridiculous",
   "condition",
   "mysterious",
   "heartbroken",
   "kindness"
  ],
  "questions": [
   {
    "q": "When did the stepmother show her true character?",
    "options": [
     "before the wedding",
     "after the father went away",
     "at the ball"
    ],
    "answer": 1
   },
   {
    "q": "How did Cinderella get her name?",
    "options": [
     "She slept among the cinders",
     "Her father named her",
     "She liked the colour"
    ],
    "answer": 0
   },
   {
    "q": "What was the fairy godmother’s condition?",
    "options": [
     "to dance with the prince",
     "to leave before midnight",
     "to bring the slipper back"
    ],
    "answer": 1
   },
   {
    "q": "What did Cinderella do with her stepfamily?",
    "options": [
     "punished them",
     "forgave them and invited them to the palace",
     "sent them away"
    ],
    "answer": 1
   }
  ],
  "talk": [
   "Is it always right to forgive? Why or why not?",
   "What does “her kindness had been her greatest strength” mean to you?",
   "Retell the story from the stepmother’s point of view."
  ],
  "base": "cinderella"
 },
 {
  "id": "ugly-duckling-b1",
  "base": "ugly-duckling",
  "title": "The Ugly Duckling",
  "titleT": {
   "uk": "Гидке каченя",
   "ru": "Гадкий утёнок",
   "en": "The Ugly Duckling"
  },
  "level": "B1-B2",
  "age": "11+",
  "kit": "st-cat-heart",
  "color": "#CFE8F7",
  "about": {
   "uk": "Гидке каченя для B1-B2: Past Continuous, used to, порівняння (the ugliest, as ... as) і почуття героя.",
   "ru": "Гадкий утёнок для B1-B2: Past Continuous, used to, сравнения (the ugliest, as ... as) и чувства героя.",
   "en": "The Ugly Duckling for B1-B2: past continuous, used to, comparisons and feelings."
  },
  "pages": [
   "It was a warm summer day, and a mother duck was sitting on her nest beside a quiet lake. She had been waiting for weeks, and at last the eggs began to crack. One by one, five fluffy yellow ducklings climbed out and looked around at the bright new world.",
   "Only one egg, the largest of all, had not opened. An old duck who was swimming past warned her, \"That egg doesn't look like yours. Leave it and take care of the others.\" But the mother duck was patient. A few days later the egg finally cracked, and out came a big grey bird with a long neck.",
   "\"What an ugly duckling!\" laughed the other animals. The hens pecked him, the ducks chased him, and even his brothers and sisters refused to play with him. \"I wish you had never been born,\" one of them said. The poor duckling felt that he didn't belong anywhere.",
   "One morning, while everyone was still sleeping, he ran away. He wandered through fields and marshes, hiding from hunters and their dogs. Wherever he went, he heard the same words: \"You are the ugliest bird we have ever seen.\" He used to hope that someone would be kind to him, but slowly he stopped hoping.",
   "Autumn came, and the leaves turned brown. One evening he saw a group of beautiful white birds flying south over the lake. They had long, elegant necks and wings as white as snow. He didn't know their name, but he felt a strange love for them and wished he could be like them.",
   "The winter was long and terribly cold. The lake froze, and the duckling was so weak that he could hardly move. A farmer found him lying in the ice and carried him home, but the children were so loud and excited that the frightened bird escaped again and spent the rest of the winter alone among the reeds.",
   "At last the sun grew warm, and spring returned. The duckling spread his wings and was surprised to find that they were strong. He flew over a garden and landed on a lake where three of those beautiful white birds were swimming. \"They will probably chase me away,\" he thought, \"but I would rather be hurt by them than live alone.\"",
   "He bowed his head and waited. Then he saw his reflection in the clear water. He was no longer a clumsy grey bird. He was a swan! The other swans swam around him and welcomed him. Children on the shore shouted, \"Look, there's a new one, and he's the most beautiful of all!\" He had never imagined such happiness, but he did not become proud, because he remembered what it felt like to be lonely."
  ],
  "words": [
   "nest",
   "crack",
   "patient",
   "neck",
   "belong",
   "wander",
   "elegant",
   "freeze",
   "reflection",
   "swan"
  ],
  "questions": [
   {
    "q": "Why did the old duck warn the mother?",
    "options": [
     "The egg was too small",
     "The egg looked different",
     "The nest was dangerous"
    ],
    "answer": 1
   },
   {
    "q": "Why did the duckling run away?",
    "options": [
     "Everyone was unkind to him",
     "He wanted to find the swans",
     "The farmer took him"
    ],
    "answer": 0
   },
   {
    "q": "Why did he escape from the farmer's house?",
    "options": [
     "He was hungry",
     "The children frightened him",
     "The farmer was angry"
    ],
    "answer": 1
   },
   {
    "q": "What did he discover in the water?",
    "options": [
     "He had become a swan",
     "He was still ugly",
     "He had a brother"
    ],
    "answer": 0
   }
  ],
  "talk": [
   "Have you ever felt that you didn't belong somewhere? What helped?",
   "Why do people sometimes judge others by how they look?",
   "Why didn't the swan become proud at the end?"
  ]
 },
 {
  "id": "hansel-and-gretel-b1",
  "base": "hansel-and-gretel",
  "title": "Hansel and Gretel",
  "titleT": {
   "uk": "Гензель і Гретель",
   "ru": "Гензель и Гретель",
   "en": "Hansel and Gretel"
  },
  "level": "B1-B2",
  "age": "11+",
  "kit": "st-cat-box",
  "color": "#F9D7A8",
  "about": {
   "uk": "Гензель і Гретель для B1-B2: Past Perfect, непряма мова (She said that...), модальні could, had to, managed to.",
   "ru": "Гензель и Гретель для B1-B2: Past Perfect, косвенная речь (She said that...), модальные could, had to, managed to.",
   "en": "Hansel and Gretel for B1-B2: past perfect, reported speech and modals like could, had to, managed to."
  },
  "pages": [
   "On the edge of a great forest lived a poor woodcutter with his two children, Hansel and Gretel. Their mother had died years before, and their father had married again. Times were hard, and there was hardly enough bread for one meal a day.",
   "One night, when the children were supposed to be asleep, they heard their stepmother whispering. She said that there wasn't enough food for four people and that the children had to be left in the forest. Their father refused at first, but in the end he gave in. Gretel began to cry, but Hansel told her not to worry.",
   "When everyone was asleep, Hansel crept outside and filled his pockets with white pebbles that shone in the moonlight. The next morning, as the family walked deep into the forest, he secretly dropped them along the path. That night the children followed the shining pebbles and managed to find their way home.",
   "Their father was delighted, but the stepmother was furious. A few weeks later she took them into the forest again, and this time Hansel only had a piece of bread. He dropped crumbs along the way, but by the evening the birds had eaten every single one. The children were completely lost.",
   "For three days they wandered among the trees, tired and starving. Then they came to a little house made of gingerbread, with windows of clear sugar and a roof covered in cakes. They were so hungry that they started to break off pieces and eat them. Suddenly the door opened, and an old woman came out, leaning on a stick.",
   "\"Come in, my dears,\" she said kindly. \"Nobody will hurt you here.\" She gave them pancakes with milk and two soft beds. But the old woman was really a wicked witch who had built the house to trap children. The next morning she locked Hansel in a cage and made Gretel do all the housework.",
   "Every day the witch, who couldn't see very well, asked Hansel to hold out his finger so that she could feel whether he had got fatter. Clever Hansel held out a thin old bone instead. After four weeks the witch lost her patience. \"Fat or thin, I will cook him today!\" she cried, and she told Gretel to check whether the oven was hot enough.",
   "Gretel guessed what the witch was planning. \"I don't know how to do it,\" she said. \"Show me.\" When the witch bent down and put her head into the oven, Gretel pushed her in and slammed the door. She freed her brother, and in the witch's house they found boxes of pearls and jewels. They filled their pockets and set off, and at last they recognised the path to their home. Their father, who had regretted his decision every day, hugged them with tears in his eyes. The stepmother had gone, and from then on they lived together without fear or hunger."
  ],
  "words": [
   "woodcutter",
   "whisper",
   "pebble",
   "crumb",
   "starving",
   "wicked",
   "trap",
   "cage",
   "patience",
   "regret"
  ],
  "questions": [
   {
    "q": "What did the children overhear one night?",
    "options": [
     "A plan to leave them in the forest",
     "A plan to move to the city",
     "A story about a witch"
    ],
    "answer": 0
   },
   {
    "q": "Why didn't the bread crumbs help?",
    "options": [
     "Hansel lost them",
     "The birds ate them",
     "It was too dark"
    ],
    "answer": 1
   },
   {
    "q": "How did Hansel trick the witch?",
    "options": [
     "He hid in the oven",
     "He showed her a bone instead of his finger",
     "He ran away at night"
    ],
    "answer": 1
   },
   {
    "q": "How did their father feel when they came back?",
    "options": [
     "angry",
     "surprised but cold",
     "very happy and sorry"
    ],
    "answer": 2
   }
  ],
  "talk": [
   "Was it fair to blame the father? Why or why not?",
   "Which of the two children was braver? Explain.",
   "Why do so many fairy tales have a dangerous forest?"
  ]
 },
 {
  "id": "goldilocks-b1",
  "base": "goldilocks",
  "title": "Goldilocks and the Three Bears",
  "titleT": {
   "uk": "Златовласка і три ведмеді",
   "ru": "Златовласка и три медведя",
   "en": "Goldilocks and the Three Bears"
  },
  "level": "B1-B2",
  "age": "11+",
  "kit": "st-cat-box",
  "color": "#FBE3A4",
  "about": {
   "uk": "Златовласка для B1-B2: too / enough, Present Perfect у діалогах (Someone has been eating...), ввічливі прохання.",
   "ru": "Златовласка для B1-B2: too / enough, Present Perfect в диалогах (Someone has been eating...), вежливые просьбы.",
   "en": "Goldilocks for B1-B2: too and enough, present perfect continuous in dialogue, polite requests."
  },
  "pages": [
   "In a small house at the edge of a wood lived a family of three bears: a huge Father Bear, a medium-sized Mother Bear and a tiny Baby Bear. Every morning Mother Bear made porridge for breakfast, and while it was cooling down, the family went for a short walk among the trees.",
   "Not far away lived a curious girl with golden curls, so everyone called her Goldilocks. She was clever and brave, but she rarely thought before she acted. That morning she was picking flowers when she noticed the bears' house and the open window.",
   "She knocked, but nobody answered. Instead of going home, she pushed the door and stepped inside. On the table there were three bowls of porridge. The big one was far too hot, the middle one was too cold, but the little one was just right, so she ate it all without thinking twice.",
   "Feeling full, she decided to have a rest. The big chair was too hard, and the medium chair was too soft. The little chair seemed comfortable enough, but as soon as she sat down, it cracked and broke into pieces. Goldilocks shrugged and went upstairs to look around.",
   "There were three beds in the bedroom. The first one was too high to climb into, and the second one was so soft that she sank into it. The smallest bed, however, was perfect. She lay down, pulled up the blanket and fell fast asleep.",
   "Meanwhile the bears came home. \"Someone has been eating my porridge,\" growled Father Bear. \"Someone has been eating mine too,\" said Mother Bear. \"And someone has eaten all of mine!\" cried Baby Bear. Then they saw the chairs, and Baby Bear burst into tears when he found his own lying broken on the floor.",
   "Quietly the bears climbed the stairs. \"Someone has been sleeping in my bed,\" said Father Bear in his deep voice. \"And in mine,\" said Mother Bear. \"Someone has been sleeping in my bed,\" squeaked Baby Bear, \"and she's still there!\"",
   "Goldilocks opened her eyes and saw three bears staring at her. She screamed, jumped out of the window and ran all the way home without looking back. Later that evening she felt ashamed. The next day she came back with a basket of honey and a letter of apology, and she even helped Father Bear repair the little chair. From then on, she always knocked and waited before entering anyone's home."
  ],
  "words": [
   "porridge",
   "curious",
   "curls",
   "bowl",
   "comfortable",
   "shrug",
   "growl",
   "stare",
   "ashamed",
   "apology"
  ],
  "questions": [
   {
    "q": "Why did the bears leave the house?",
    "options": [
     "to wait for the porridge to cool",
     "to visit Goldilocks",
     "to buy food"
    ],
    "answer": 0
   },
   {
    "q": "What happened to the little chair?",
    "options": [
     "Goldilocks took it",
     "It broke",
     "Father Bear sat on it"
    ],
    "answer": 1
   },
   {
    "q": "Who found Goldilocks first?",
    "options": [
     "Father Bear",
     "Mother Bear",
     "Baby Bear"
    ],
    "answer": 2
   },
   {
    "q": "How did Goldilocks change at the end?",
    "options": [
     "She never went to the woods again",
     "She apologised and became more careful",
     "She became friends with a wolf"
    ],
    "answer": 1
   }
  ],
  "talk": [
   "What should Goldilocks have done when nobody answered the door?",
   "Is it enough to say sorry? What else can you do?",
   "Which bear would you like to be and why?"
  ]
 },
 {
  "id": "tortoise-and-hare-b1",
  "base": "tortoise-and-hare",
  "title": "The Tortoise and the Hare",
  "titleT": {
   "uk": "Черепаха і заєць",
   "ru": "Черепаха и заяц",
   "en": "The Tortoise and the Hare"
  },
  "level": "B1-B2",
  "age": "11+",
  "kit": "st-cat-heart",
  "color": "#CDEBC3",
  "about": {
   "uk": "Байка про черепаху й зайця для B1-B2: умовні речення (If I..., I would...), сталі вирази, мораль своїми словами.",
   "ru": "Басня про черепаху и зайца для B1-B2: условные предложения (If I..., I would...), устойчивые выражения, мораль своими словами.",
   "en": "The fable for B1-B2: conditionals, set phrases and explaining a moral in your own words."
  },
  "pages": [
   "In a green meadow lived a hare who was extremely proud of his speed. Every day he boasted to the other animals: \"Nobody in this meadow can run as fast as I can. If there were a race, I would win it without even trying.\"",
   "Most animals were tired of his showing off, but nobody dared to say anything. One afternoon a tortoise, who had been listening quietly, looked up and said, \"I'll race you.\" The hare laughed so hard that he nearly fell over. \"You? You're the slowest creature I've ever met!\"",
   "\"Maybe,\" replied the tortoise calmly, \"but a race isn't over until someone crosses the finish line.\" The animals agreed that the race would start at the old oak tree and finish at the river. The fox, who was known to be fair, would be the judge.",
   "The next morning half the meadow came to watch. The fox shouted, \"Ready, steady, go!\" and the hare shot off like an arrow. Within seconds he had disappeared over the hill, while the tortoise was still taking her first slow steps.",
   "Halfway to the river the hare looked back. The tortoise was nowhere to be seen. \"I've got plenty of time,\" he said to himself. \"If I have a short nap under this tree, I'll still win easily.\" The sun was warm, the grass was soft, and soon he was fast asleep.",
   "Meanwhile the tortoise kept going. She didn't stop to rest or to eat, and she didn't waste energy worrying about the hare. Step by step, hour after hour, she moved forward. When she passed the sleeping hare, she didn't wake him. She simply carried on.",
   "When the hare finally woke up, the sun was already setting. He jumped to his feet and ran as fast as he had ever run in his life. But as he reached the top of the last hill, he heard the animals cheering. The tortoise had just crossed the finish line.",
   "The hare was embarrassed, but to everyone's surprise, he walked up to the tortoise and congratulated her. \"I underestimated you,\" he admitted. \"Talent isn't enough if you don't make an effort.\" The tortoise smiled. \"And slow and steady wins the race,\" she said. From that day on, the hare spent less time boasting and more time training."
  ],
  "words": [
   "meadow",
   "boast",
   "show off",
   "dare",
   "judge",
   "arrow",
   "nap",
   "waste",
   "embarrassed",
   "underestimate"
  ],
  "questions": [
   {
    "q": "Why were the animals tired of the hare?",
    "options": [
     "He was always boasting",
     "He was very slow",
     "He never spoke"
    ],
    "answer": 0
   },
   {
    "q": "Who was the judge of the race?",
    "options": [
     "the owl",
     "the fox",
     "the hare's friend"
    ],
    "answer": 1
   },
   {
    "q": "Why did the hare stop?",
    "options": [
     "He was hurt",
     "He thought he had plenty of time",
     "He got lost"
    ],
    "answer": 1
   },
   {
    "q": "What did the hare learn?",
    "options": [
     "Talent needs effort too",
     "Tortoises are cheaters",
     "Races are boring"
    ],
    "answer": 0
   }
  ],
  "talk": [
   "Explain “slow and steady wins the race” with an example from your life.",
   "Is talent or hard work more important? Why?",
   "Was the hare right to congratulate the tortoise?"
  ]
 },
 {
  "id": "lion-and-mouse-b1",
  "base": "lion-and-mouse",
  "title": "The Lion and the Mouse",
  "titleT": {
   "uk": "Лев і миша",
   "ru": "Лев и мышь",
   "en": "The Lion and the Mouse"
  },
  "level": "B1-B2",
  "age": "11+",
  "kit": "st-cat-heart",
  "color": "#F4D2B8",
  "about": {
   "uk": "Байка про лева й мишу для B1-B2: пасив (was caught, was tied), фразові дієслова (let go, give up, pay back) і мораль.",
   "ru": "Басня про льва и мышь для B1-B2: пассив (was caught, was tied), фразовые глаголы (let go, give up, pay back) и мораль.",
   "en": "The fable for B1-B2: the passive, phrasal verbs (let go, give up, pay back) and the moral."
  },
  "pages": [
   "On a hot afternoon in the savannah, a huge lion was sleeping in the shade of a tree. He had eaten a large meal and was snoring loudly. Nearby, a little mouse was looking for seeds and, without noticing, ran straight across the lion's nose.",
   "The lion woke up with a roar and caught the mouse under his enormous paw. \"How dare you disturb the king of the animals?\" he growled. \"I'm going to eat you for my dessert.\" The mouse was trembling with fear, but she managed to speak.",
   "\"Please, Your Majesty, let me go,\" she begged. \"I'm far too small to be a proper meal. If you spare my life, I promise I'll pay you back one day.\" The lion burst out laughing. \"You? Help me? That's the funniest thing I've heard all year!\" But he was in a good mood, so he lifted his paw and let her go.",
   "Several weeks later, a group of hunters came to the savannah. They had been tracking the lion for days, and one night they set a trap made of thick ropes. The next morning the lion walked straight into it. In a moment he was caught in the net and couldn't move.",
   "He roared and pulled with all his strength, but the harder he struggled, the tighter the ropes became. He was tied so firmly that he couldn't even lift his head. Exhausted, he gave up and lay still. The hunters were planning to come back with a cart and take him to the city.",
   "Far away, the mouse heard the lion's desperate roar and recognised it at once. Although she was frightened, she didn't hesitate. She ran as fast as her tiny legs could carry her and soon found the lion lying helpless in the net.",
   "\"Don't move,\" she whispered. Then she began to bite through the ropes with her sharp little teeth. It took a long time, and her mouth was sore, but she didn't stop. One rope broke, then another, until finally the lion was able to pull himself free.",
   "The lion looked at the little mouse in amazement. \"I laughed at you,\" he said quietly, \"but you saved my life. I was wrong to think that someone so small could never help someone so big.\" From that day on, the lion and the mouse were the best of friends, and the lion never again judged anyone by their size."
  ],
  "words": [
   "savannah",
   "shade",
   "snore",
   "paw",
   "disturb",
   "tremble",
   "spare",
   "trap",
   "struggle",
   "hesitate"
  ],
  "questions": [
   {
    "q": "Why did the lion wake up?",
    "options": [
     "The hunters came",
     "The mouse ran across his nose",
     "It started raining"
    ],
    "answer": 1
   },
   {
    "q": "Why did the lion let the mouse go?",
    "options": [
     "He believed her promise",
     "He was in a good mood",
     "He wasn't hungry at all"
    ],
    "answer": 1
   },
   {
    "q": "How was the lion caught?",
    "options": [
     "in a net of ropes",
     "in a cage",
     "in a hole"
    ],
    "answer": 0
   },
   {
    "q": "What is the moral of the story?",
    "options": [
     "Never sleep in the shade",
     "Even small friends can help a lot",
     "Hunters are dangerous"
    ],
    "answer": 1
   }
  ],
  "talk": [
   "Tell about a time when someone unexpected helped you.",
   "Why did the lion laugh at the mouse's promise?",
   "Is it important to keep promises? Why?"
  ]
 }
];
export const bookById = (id: string) => BOOKS.find((b) => b.id === id);
