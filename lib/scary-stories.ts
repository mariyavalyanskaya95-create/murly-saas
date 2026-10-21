export type StoryQ = { q: string; options: string[]; answer: number };
export type Story = {
  genre?: 'scary' | 'romance' | 'comedy';
  id: string;
  title: string;
  level: 'A2' | 'B1' | 'B2';
  minutes: number;
  teaser: { uk: string; ru: string; en: string };
  paragraphs: string[];
  glossary: { en: string; uk: string; ru: string }[];
  questions: StoryQ[];
  discuss: string[];
  kit: string;
  color: 'lime' | 'sky' | 'mustard' | 'tomato';
};

export const STORIES: Story[] = [
  {
    id: 'the-ninth-floor',
    title: 'The Ninth Floor',
    level: 'A2',
    minutes: 3,
    teaser: {
      uk: 'У будинку вісім поверхів, але одного вечора в старому ліфті з’являється кнопка «9».',
      ru: 'В доме восемь этажей, но однажды вечером в старом лифте появляется кнопка «9».',
      en: 'The building has eight floors, but one evening the old lift shows a button with the number 9.',
    },
    paragraphs: [
      'Max lives in an old building with eight floors. The lift is very old too. It smells of dust, and the light inside is yellow and tired.',
      'One rainy evening, Max gets into the lift and looks at the buttons. There are numbers from one to eight, like always. But today there is a new button at the top. It says 9. The button is cold, and it glows a soft blue.',
      'Max is curious, so he presses it. The lift goes up for a long time. Too long. Then the doors open. Outside there is a quiet corridor with green walls and a big clock. The clock has no hands. An old woman in a grey coat stands by the window. She knows his name.',
      '"You are early, Max," she says with a smile. "Come back when you are much older. We will keep your room ready."',
      'Max presses 1 again and again. The lift goes down fast. At home, his mum only laughs. "Our building has eight floors, silly."',
      'The next morning, the blue button is gone. Max feels better. But when he gets into the lift after school, he sees something on the wall. Someone has written in small, neat letters: "Room 9 is ready. See you later, Max."',
    ],
    glossary: [
      { en: 'lift', uk: 'ліфт', ru: 'лифт' },
      { en: 'smells of dust', uk: 'пахне пилом', ru: 'пахнет пылью' },
      { en: 'curious', uk: 'допитливий, цікавий', ru: 'любопытный' },
      { en: 'to press', uk: 'натискати', ru: 'нажимать' },
      { en: 'to glow', uk: 'світитися', ru: 'светиться' },
      { en: 'corridor', uk: 'коридор', ru: 'коридор' },
      { en: 'hands (of a clock)', uk: 'стрілки (годинника)', ru: 'стрелки (часов)' },
      { en: 'early', uk: 'рано, зарано', ru: 'рано' },
      { en: 'again and again', uk: 'знову і знову', ru: 'снова и снова' },
      { en: 'neat', uk: 'акуратний', ru: 'аккуратный' },
      { en: 'to be gone', uk: 'зникнути', ru: 'исчезнуть' },
    ],
    questions: [
      {
        q: 'How many floors does Max’s building have?',
        options: ['Nine', 'Eight', 'Ten'],
        answer: 1,
      },
      {
        q: 'What is strange about the clock in the corridor?',
        options: ['It is very loud.', 'It shows the wrong time.', 'It has no hands.'],
        answer: 2,
      },
      {
        q: 'In the story, the button "glows a soft blue". What does "glows" mean here?',
        options: ['It gives a gentle light.', 'It makes a quiet sound.', 'It feels very hot.'],
        answer: 0,
      },
      {
        q: 'What does Max’s mum do when he tells her the story?',
        options: ['She calls the police.', 'She laughs.', 'She goes to see the lift.'],
        answer: 1,
      },
      {
        q: 'What can we guess from the message on the wall?',
        options: [
          'Max imagined everything.',
          'His mum wrote it as a joke.',
          'The ninth floor is real and still waiting for Max.',
        ],
        answer: 2,
      },
    ],
    discuss: [
      'What would you do if a new button appeared in your lift?',
      'Who do you think the old woman is? Explain your idea.',
    ],
    kit: 'st-boy-cap',
    color: 'sky',
  },
  {
    id: 'the-cat-who-knew',
    title: 'The Cat Who Knew',
    level: 'A2',
    minutes: 3,
    teaser: {
      uk: 'Кішка Софії завжди знає, що станеться завтра, і одного разу вона не випускає дівчинку з дому.',
      ru: 'Кошка Софии всегда знает, что случится завтра, и однажды она не выпускает девочку из дома.',
      en: 'Sofia’s cat always knows what will happen tomorrow, and one night she will not let Sofia leave the house.',
    },
    paragraphs: [
      'Sofia has a black cat called Biscuit. Biscuit has one white spot on her nose and very green eyes. She is not an ordinary cat. Biscuit knows things.',
      'When Biscuit sits on Sofia’s umbrella in the morning, it always rains in the afternoon. When she sits next to the phone, Grandma calls ten minutes later. When she hides under the bed, Sofia gets a surprise test at school. It is true every time.',
      'One cold evening, Sofia puts on her coat. She wants to buy milk. But Biscuit runs to the front door and sits in front of it. She does not move. She looks at Sofia and makes a long, low sound. Sofia tries to open the door, but Biscuit scratches her hand. "Fine," says Sofia. "No milk tonight."',
      'At midnight, there is a terrible noise outside. In the morning, Sofia sees a huge old tree lying across the path to the shop. Nobody is hurt, but the path is closed for a week.',
      'That weekend, Sofia visits Grandma and looks at her old photo album. In one photo from fifty years ago, Grandma is a young girl. She is holding a black cat with one white spot on its nose and very green eyes. Under the photo, someone has written: "Biscuit, my clever cat."',
    ],
    glossary: [
      { en: 'spot', uk: 'пляма', ru: 'пятно' },
      { en: 'ordinary', uk: 'звичайний', ru: 'обычный' },
      { en: 'to hide', uk: 'ховатися', ru: 'прятаться' },
      { en: 'surprise test', uk: 'несподівана контрольна', ru: 'внезапная контрольная' },
      { en: 'to believe', uk: 'вірити', ru: 'верить' },
      { en: 'to scratch', uk: 'дряпати', ru: 'царапать' },
      { en: 'terrible noise', uk: 'жахливий шум', ru: 'ужасный шум' },
      { en: 'huge', uk: 'величезний', ru: 'огромный' },
      { en: 'across the path', uk: 'поперек стежки', ru: 'поперёк тропинки' },
      { en: 'to be hurt', uk: 'постраждати', ru: 'пострадать' },
      { en: 'clever', uk: 'розумний', ru: 'умный' },
    ],
    questions: [
      {
        q: 'What happens when Biscuit sits on the umbrella?',
        options: ['Grandma calls.', 'It rains later that day.', 'Sofia has a test.'],
        answer: 1,
      },
      {
        q: 'Why does Sofia not go to the shop?',
        options: ['The shop is closed.', 'It is raining.', 'Biscuit stops her at the door.'],
        answer: 2,
      },
      {
        q: 'Biscuit is "not an ordinary cat". What does "ordinary" mean?',
        options: ['Normal, like many others', 'Very old', 'Friendly'],
        answer: 0,
      },
      {
        q: 'What does Sofia see in the morning?',
        options: ['A broken window', 'A big tree across the path', 'A lost dog'],
        answer: 1,
      },
      {
        q: 'What does the old photo suggest?',
        options: [
          'Grandma had a similar cat by chance.',
          'Biscuit may be the same cat, and she does not get old.',
          'Sofia’s cat came from Grandma’s neighbour.',
        ],
        answer: 1,
      },
    ],
    discuss: [
      'If your pet could tell the future, what would you want to know?',
      'Do you believe that animals can feel danger? Give an example.',
    ],
    kit: 'st-cat-shock',
    color: 'lime',
  },
  {
    id: 'the-library-card',
    title: 'The Library Card',
    level: 'B1',
    minutes: 4,
    teaser: {
      uk: 'Книжку без автора щороку бере новий читач, і щоразу вона описує саме його вечір.',
      ru: 'Книгу без автора каждый год берёт новый читатель, и каждый раз она описывает именно его вечер.',
      en: 'Every year a new reader borrows the book with no author, and every time it describes that reader’s evening.',
    },
    paragraphs: [
      'The town library closes at six, but Anna always stays until the last minute. She likes the way the radiators click like quiet clocks. On the last evening of October, she found a book she had never seen before. It had a dark green cover, no author’s name, and a title in silver letters: "The Reader".',
      'Inside the back cover there was an old paper pocket with a library card. The card was full of names and dates. Every name was different, but every date was the same: 31 October. One borrower every year, all the way back to 1952. The last line was empty.',
      '"Ah, that one," said Mr Pell, the librarian, when she brought it to his desk. He did not smile. "Someone takes it every year. It always comes back on the first of November. Nobody ever brings it, it is just there on the shelf in the morning." He stamped the card anyway and wrote her name on the empty line.',
      'At home, Anna made tea and opened the book. The first page described a girl walking home through wet leaves. The second page described the girl making tea in a kitchen with a broken yellow lamp. Anna looked up at her own kitchen lamp. It was yellow, and it was broken.',
      'She kept reading, faster now. The book knew everything: the crack in her mug, the song on her radio, the way she was holding her breath. On the last page there was only one sentence: "And then she looked at the window, and someone was looking back."',
      'Anna did not look at the window. She closed the book and ran to the library. It was dark and locked. She pushed the book through the return slot and walked home without turning around.',
      'The next day, the book was back on its shelf. Anna opened it with shaking hands. The pages were different now. The story was about someone new, and the first sentence said: "The next reader is already holding this book."',
    ],
    glossary: [
      { en: 'radiator', uk: 'батарея (опалення)', ru: 'батарея (отопления)' },
      { en: 'borrower', uk: 'той, хто бере книжку', ru: 'тот, кто берёт книгу' },
      { en: 'all the way back to', uk: 'аж до (у минуле)', ru: 'вплоть до (в прошлом)' },
      { en: 'to stamp', uk: 'ставити штамп', ru: 'ставить штамп' },
      { en: 'shelf', uk: 'полиця', ru: 'полка' },
      { en: 'wet leaves', uk: 'мокре листя', ru: 'мокрые листья' },
      { en: 'crack', uk: 'тріщина', ru: 'трещина' },
      { en: 'to hold your breath', uk: 'затамувати подих', ru: 'затаить дыхание' },
      { en: 'return slot', uk: 'щілина для повернення книжок', ru: 'щель для возврата книг' },
      { en: 'without turning around', uk: 'не озираючись', ru: 'не оборачиваясь' },
      { en: 'shaking hands', uk: 'тремтячі руки', ru: 'дрожащие руки' },
    ],
    questions: [
      {
        q: 'What was unusual about the dates on the library card?',
        options: [
          'They were all in the future.',
          'They were all on the same day of the year.',
          'They were written in silver ink.',
        ],
        answer: 1,
      },
      {
        q: 'According to Mr Pell, how does the book come back?',
        options: [
          'Readers always return it on time.',
          'He finds it in the post.',
          'It simply appears on the shelf.',
        ],
        answer: 2,
      },
      {
        q: 'The radiators "click like quiet clocks". What does "click" mean here?',
        options: ['Make short, sharp sounds', 'Become very hot', 'Turn off by themselves'],
        answer: 0,
      },
      {
        q: 'What did Anna do after reading the last page?',
        options: [
          'She looked at the window.',
          'She returned the book that night.',
          'She called Mr Pell.',
        ],
        answer: 1,
      },
      {
        q: 'What does the final sentence suggest?',
        options: [
          'The person reading the story right now is the next reader.',
          'Mr Pell wrote the book himself.',
          'Anna will borrow the book again next year.',
        ],
        answer: 0,
      },
    ],
    discuss: [
      'Would you finish reading a book that described your own life? Why or why not?',
      'Why do you think Anna did not look at the window?',
    ],
    kit: 'st-girl-bow',
    color: 'mustard',
  },
  {
    id: 'messages-from-tomorrow',
    title: 'Messages from Tomorrow',
    level: 'B1',
    minutes: 4,
    teaser: {
      uk: 'Деніс отримує повідомлення з невідомого номера, і всі вони здійснюються наступного дня.',
      ru: 'Денис получает сообщения с неизвестного номера, и все они сбываются на следующий день.',
      en: 'Den gets texts from an unknown number, and every one of them comes true the next day.',
    },
    paragraphs: [
      'The first message arrived at 11:59 on a Sunday night. Den was half asleep when his phone lit up on the pillow. Unknown number. "Take the blue umbrella tomorrow. Not the black one."',
      'He laughed and turned the phone over. But in the morning, when he picked up his black umbrella, it opened by itself in the hall and one of the metal ribs snapped. He took the blue one. On the way to school the wind was so strong that he saw three black umbrellas turned inside out in the bin.',
      'The next night, at exactly 11:59, another message came. "Don’t sit next to the window in Chemistry." Den moved to the middle row. Halfway through the lesson, a football from the yard hit the window so hard that the glass cracked right above his usual seat.',
      'After that, Den started waiting for the messages. They were never dramatic. "Do the second exercise first." "Say sorry to Mila before lunch." "Don’t buy the cheese sandwich." Every single one was right. He tried to call the number, but it never rang. He tried to reply, but his messages stayed grey and undelivered.',
      'On Friday the message was different. "Don’t answer when I call." At midnight his phone began to ring. The screen showed a number he knew very well. It was his own. Den stared at it until it stopped. His heart was beating so loudly that he could hear it in his ears.',
      'He did not sleep much that night. At 11:58 on Saturday, he was sitting on his bed when his phone woke up by itself. The messages app opened. A new message was already typed, and the cursor was blinking at the end of it: "Take the blue umbrella tomorrow. Not the black one." The contact name at the top said "Me". His thumb was already above the Send button.',
    ],
    glossary: [
      { en: 'to light up', uk: 'засвітитися', ru: 'загореться, засветиться' },
      { en: 'rib (of an umbrella)', uk: 'спиця (парасолі)', ru: 'спица (зонта)' },
      { en: 'to snap', uk: 'зламатися з тріском', ru: 'сломаться с треском' },
      { en: 'inside out', uk: 'навиворіт', ru: 'наизнанку' },
      { en: 'bin', uk: 'смітник', ru: 'мусорный бак' },
      { en: 'halfway through', uk: 'на середині', ru: 'на середине' },
      { en: 'dramatic', uk: 'драматичний, вражаючий', ru: 'драматичный, впечатляющий' },
      { en: 'undelivered', uk: 'недоставлений', ru: 'недоставленный' },
      { en: 'to stare at', uk: 'витріщатися на', ru: 'пристально смотреть на' },
      { en: 'cursor', uk: 'курсор', ru: 'курсор' },
      { en: 'to blink', uk: 'блимати', ru: 'мигать' },
      { en: 'thumb', uk: 'великий палець', ru: 'большой палец' },
    ],
    questions: [
      {
        q: 'What time did the messages usually arrive?',
        options: ['At midnight', 'At 11:59', 'At 11:58'],
        answer: 1,
      },
      {
        q: 'What happened in the Chemistry lesson?',
        options: [
          'A ball cracked the window near Den’s usual seat.',
          'Den broke a glass.',
          'The teacher moved Den to the window.',
        ],
        answer: 0,
      },
      {
        q: 'Den’s replies "stayed grey and undelivered". What does "undelivered" mean?',
        options: ['Deleted by Den', 'Read but not answered', 'Not received by the other person'],
        answer: 2,
      },
      {
        q: 'Whose number called Den on Friday night?',
        options: ['Mila’s', 'His own', 'An unknown person’s'],
        answer: 1,
      },
      {
        q: 'What can we understand from the ending?',
        options: [
          'Someone has stolen Den’s phone.',
          'The messages were a joke from his friends.',
          'Den is about to send the first message to his past self, so it is a loop.',
        ],
        answer: 2,
      },
    ],
    discuss: [
      'If you could send one short message to yourself yesterday, what would it say?',
      'Should Den press Send? What could happen if he does not?',
    ],
    kit: 'st-boy-backpack',
    color: 'tomato',
  },
  {
    id: 'cabin-seven',
    title: 'Cabin Seven',
    level: 'B1',
    minutes: 4,
    teaser: {
      uk: 'У таборі шість будиночків, але щоночі Лена бачить світло в сьомому.',
      ru: 'В лагере шесть домиков, но каждую ночь Лена видит свет в седьмом.',
      en: 'The summer camp has six cabins, but every night Lena sees a light in the seventh.',
    },
    paragraphs: [
      'Pine Lake Camp had six wooden cabins, a dining hall that smelled of pancakes and a lake so still that it looked like a mirror. Lena loved it from the first day. There was only one thing she did not understand.',
      'Every night, after lights out, she could see a small yellow light on the far side of the lake. It came from a cabin hidden between the trees, and on the door there was a white number: 7. Sometimes, when the wind was quiet, she could hear someone humming a slow, sweet song she did not know.',
      '"There is no Cabin Seven," said Kostya, the camp leader, when she asked him. "There are six. There have always been six." But Lena noticed that he did not look at the lake when he said it.',
      'On the fourth night, Lena woke up her friend Olya, and the two girls followed the path around the water with a torch. The cabin was real. The door was not locked. Inside, the beds were neatly made, and on a small table there was a photo album. The photos were old and slightly yellow: children at Pine Lake swimming, laughing, singing around a fire. Under each picture there was a year: 1989, 1990, 1991.',
      'Olya turned to the last page and went very quiet. The last photo was new and bright. It showed two girls in pyjamas, standing in front of Cabin Seven with a torch. It was Lena and Olya. Under it someone had written today’s date.',
      'They ran back so fast that they did not feel the branches on their arms. In the morning, everything looked normal. The sun was shining, and the lake was blue. Kostya lined everyone up for breakfast and started to count. "Eighteen, nineteen, twenty, twenty one." He stopped and frowned. There were twenty campers at Pine Lake. At the very end of the line stood a small girl in an old-fashioned dress, humming a slow, sweet song.',
    ],
    glossary: [
      { en: 'cabin', uk: 'будиночок (у таборі)', ru: 'домик (в лагере)' },
      { en: 'still (water)', uk: 'нерухомий, спокійний', ru: 'неподвижный, спокойный' },
      { en: 'lights out', uk: 'відбій', ru: 'отбой' },
      { en: 'far side', uk: 'протилежний бік', ru: 'противоположная сторона' },
      { en: 'to hum', uk: 'наспівувати без слів', ru: 'напевать без слов' },
      { en: 'torch', uk: 'ліхтарик', ru: 'фонарик' },
      { en: 'neatly made (bed)', uk: 'акуратно застелене (ліжко)', ru: 'аккуратно заправленная (кровать)' },
      { en: 'slightly', uk: 'трохи', ru: 'слегка' },
      { en: 'branch', uk: 'гілка', ru: 'ветка' },
      { en: 'to line up', uk: 'вишикувати', ru: 'построить в линию' },
      { en: 'to frown', uk: 'насупитися', ru: 'нахмуриться' },
      { en: 'old-fashioned', uk: 'старомодний', ru: 'старомодный' },
    ],
    questions: [
      {
        q: 'What did Lena hear coming from Cabin Seven?',
        options: ['Someone crying', 'Someone humming a song', 'A dog barking'],
        answer: 1,
      },
      {
        q: 'Why did Lena think Kostya was hiding something?',
        options: [
          'He did not look at the lake when he answered.',
          'He laughed at her question.',
          'He told her to go to bed.',
        ],
        answer: 0,
      },
      {
        q: 'The lake was "so still that it looked like a mirror". What does "still" mean here?',
        options: ['Very deep', 'Very cold', 'Not moving at all'],
        answer: 2,
      },
      {
        q: 'What was in the last photo in the album?',
        options: ['Kostya as a child', 'Lena and Olya in front of the cabin', 'An empty lake'],
        answer: 1,
      },
      {
        q: 'Who is probably the extra girl at the end of the line?',
        options: [
          'A new camper who arrived late',
          'Olya’s little sister',
          'Someone who belongs to Cabin Seven and the old photos',
        ],
        answer: 2,
      },
    ],
    discuss: [
      'Would you go to Cabin Seven at night like Lena and Olya? Why or why not?',
      'What do you think Kostya knows about the cabin?',
    ],
    kit: 'st-cat-nightcap',
    color: 'lime',
  },
  {
    id: 'keep-it-burning',
    title: 'Keep It Burning',
    level: 'B2',
    minutes: 5,
    teaser: {
      uk: 'О третій ночі в шторм у двері маяка стукає незнайомець і просить лише одне: не гасити світло.',
      ru: 'В три часа ночи в шторм в дверь маяка стучит незнакомец и просит только об одном: не гасить свет.',
      en: 'At three in the morning, during a storm, a stranger knocks on the lighthouse door and asks for only one thing: keep the light burning.',
    },
    paragraphs: [
      'The lighthouse on Gull Rock had been automatic for twenty years, but the coastal service still liked to have someone on the island during the autumn storms. Marta had volunteered for the job because she wanted silence. She got plenty of it. For six weeks her only company was the wind, the grey sea and an old logbook that previous keepers had filled with careful, boring notes about weather and passing ships.',
      'The worst storm of the season arrived on a Thursday. By midnight the waves were throwing white foam halfway up the tower, and the whole building hummed like a giant instrument. At three o’clock, Marta heard a knock. Not the wind, not a loose shutter. Three slow, clear knocks on the heavy door at the bottom of the stairs.',
      'She opened it. A tall man stood on the step, soaked to the skin, in an oilskin coat of a style she had only seen in museums. Water ran from his beard. He did not try to come in. "Is the light working?" he asked. His voice was calm, but his eyes were not. "There are boats out tonight. Please. Whatever happens, keep it burning."',
      'Marta told him that the lamp was electric and had a backup generator. He nodded slowly, as if that was not quite the answer he needed, and then he stepped back into the rain. She called after him, offered him tea, a towel, a phone. The darkness took him in two steps.',
      'At dawn the storm had passed, and every fishing boat in the harbour had come home safely. Marta went down to the rocks to look for the man, or at least for his footprints in the wet sand. There were none. The only prints on the beach were her own.',
      'That afternoon, unable to concentrate, she started reading the logbook properly, from the very first page. She soon noticed a pattern. Every few years, on the night of the worst storm, a keeper had written almost the same thing: "Visitor at the door, 3 a.m. Asked about the light. Kept it burning. All boats home."',
      'The very first entry was dated 1911, and the handwriting was shaky. "Tonight the lamp failed for an hour. A boat struck the rocks. The crew were saved, thank heaven, but I will never forgive myself. I ask every keeper after me: keep it burning." It was signed Elias Brand, Keeper. Taped beside it was a faded photograph of a tall, bearded man in an oilskin coat.',
    ],
    glossary: [
      { en: 'coastal service', uk: 'берегова служба', ru: 'береговая служба' },
      { en: 'to volunteer', uk: 'зголоситися добровільно', ru: 'вызваться добровольно' },
      { en: 'logbook', uk: 'вахтовий журнал', ru: 'вахтенный журнал' },
      { en: 'foam', uk: 'піна', ru: 'пена' },
      { en: 'loose shutter', uk: 'віконниця, що розхиталася', ru: 'расшатавшийся ставень' },
      { en: 'soaked to the skin', uk: 'промоклий до нитки', ru: 'промокший до нитки' },
      { en: 'oilskin coat', uk: 'непромокальний плащ', ru: 'непромокаемый плащ' },
      { en: 'backup generator', uk: 'резервний генератор', ru: 'резервный генератор' },
      { en: 'at dawn', uk: 'на світанку', ru: 'на рассвете' },
      { en: 'harbour', uk: 'гавань', ru: 'гавань' },
      { en: 'to strike the rocks', uk: 'налетіти на скелі', ru: 'налететь на скалы' },
      { en: 'faded', uk: 'вицвілий', ru: 'выцветший' },
    ],
    questions: [
      {
        q: 'Why was Marta on the island?',
        options: [
          'She had to repair the lamp.',
          'She volunteered to stay there during the autumn storms.',
          'She was writing a book about lighthouses.',
        ],
        answer: 1,
      },
      {
        q: 'What did the visitor ask Marta to do?',
        options: [
          'Call for help on the radio',
          'Let him in out of the rain',
          'Keep the light burning all night',
        ],
        answer: 2,
      },
      {
        q: 'The man was "soaked to the skin". What does this mean?',
        options: ['Completely wet', 'Very cold and pale', 'Badly injured'],
        answer: 0,
      },
      {
        q: 'What did Marta find on the beach in the morning?',
        options: ['The man’s footprints', 'Only her own footprints', 'A small boat'],
        answer: 1,
      },
      {
        q: 'Who was the night visitor most likely to be?',
        options: [
          'A fisherman looking for his brother',
          'Elias Brand, the keeper from 1911',
          'A previous volunteer playing a joke',
        ],
        answer: 1,
      },
    ],
    discuss: [
      'Would you agree to spend six weeks alone in a lighthouse? What would you miss most?',
      'Why do you think the visitor keeps coming back, even though the light is now automatic?',
    ],
    kit: 'st-cat-cool',
    color: 'sky',
  },
  {
    id: 'the-snow-guest',
    title: 'The Snow Guest',
    level: 'B2',
    minutes: 5,
    teaser: {
      uk: 'У гірському селі в найдовшу ніч року ставлять на стіл зайву тарілку для гостя, якого ніхто не бачив.',
      ru: 'В горном селе в самую длинную ночь года ставят на стол лишнюю тарелку для гостя, которого никто не видел.',
      en: 'In a mountain village, on the longest night of the year, people set an extra plate for a guest nobody has ever seen.',
    },
    paragraphs: [
      'Kira had expected the village to be boring, and for the first three days it was. Her grandmother’s house stood at the very end of the road, where the snow was so deep that the fences looked like rows of small white teeth. There was no signal, no shop open after four, and nothing to do but drink tea and watch the stove.',
      'Then, on the longest night of the year, Grandma did something strange. She cooked a big pot of mushroom soup, set the table for three, and put a candle in the window facing the forest. "For the guest," she said simply, as if that explained everything.',
      'Kira laughed. "Grandma, you don’t really believe in that, do you?" Grandma did not argue. She only said that every house in the village did the same, that it had always been done, and that the one year somebody forgot, the road stayed blocked until March.',
      'Kira decided to stay awake and prove that it was all an old story. She sat in the dark kitchen with her coat over her knees, watching the third bowl of soup slowly stop steaming. Around two in the morning, she must have closed her eyes, because the next thing she knew, the candle flame was bending sideways, although the window was shut. The room was freezing. Frost was growing across the glass in long, feathery lines.',
      'Someone was sitting at the table. It was a woman in a pale coat that seemed to be made of snow, with frost in her hair and a face Kira could not quite see. She was eating the soup slowly and with obvious pleasure. When she finished, she looked up, and Kira felt the strange, dizzy feeling of looking into a mirror in a dream.',
      'The woman raised one finger and wrote on the frozen window: "Thank you. Next winter, you cook." Then the candle went out, and the kitchen was dark and empty.',
      'In the morning the sky was blue, and a snowplough was already clearing the road. The third bowl was empty and clean. Kira told her grandmother everything, expecting her to laugh. Instead, Grandma took her hand and said quietly, "So you saw her face. I saw her too, the first winter I stayed here, when I was about your age." She smiled. "She looked exactly like me. Only much, much older."',
    ],
    glossary: [
      { en: 'fence', uk: 'паркан', ru: 'забор' },
      { en: 'stove', uk: 'піч, плита', ru: 'печь, плита' },
      { en: 'to set the table', uk: 'накривати на стіл', ru: 'накрывать на стол' },
      { en: 'to argue', uk: 'сперечатися', ru: 'спорить' },
      { en: 'blocked (road)', uk: 'заблокований, непроїзний', ru: 'заблокированный, непроезжий' },
      { en: 'to steam', uk: 'паруватися', ru: 'дымиться паром' },
      { en: 'sideways', uk: 'убік', ru: 'вбок' },
      { en: 'frost', uk: 'іній, мороз', ru: 'иней, мороз' },
      { en: 'feathery', uk: 'схожий на пір’я', ru: 'похожий на перья' },
      { en: 'dizzy', uk: 'запаморочливий', ru: 'головокружительный' },
      { en: 'snowplough', uk: 'снігоприбиральна машина', ru: 'снегоуборочная машина' },
      { en: 'to clear the road', uk: 'розчищати дорогу', ru: 'расчищать дорогу' },
    ],
    questions: [
      {
        q: 'What did Grandma put in the window on the longest night?',
        options: ['A bowl of soup', 'A candle', 'A photo'],
        answer: 1,
      },
      {
        q: 'According to Grandma, what happened the year somebody forgot the tradition?',
        options: [
          'The road stayed blocked until March.',
          'The guest came into the house angry.',
          'Nothing at all happened.',
        ],
        answer: 0,
      },
      {
        q: 'The soup began to "stop steaming". What does this tell us?',
        options: [
          'The soup was getting cold.',
          'Someone was eating the soup.',
          'The soup was burning.',
        ],
        answer: 0,
      },
      {
        q: 'What did the guest write on the window?',
        options: [
          '"Do not forget the candle."',
          '"See you in March."',
          '"Thank you. Next winter, you cook."',
        ],
        answer: 2,
      },
      {
        q: 'What does Grandma’s last remark suggest about the guest?',
        options: [
          'The guest is Grandma’s sister.',
          'The guest always looks like the person who sees her, but older.',
          'Grandma invented the whole story to scare Kira.',
        ],
        answer: 1,
      },
    ],
    discuss: [
      'Does your family have any unusual winter traditions? Describe one.',
      'What would you do if you met an older version of yourself? What would you ask?',
    ],
    kit: 'st-cat-loaf',
    color: 'mustard',
  },
  {
    id: 'seventeen-thousand-tuesdays',
    title: 'Seventeen Thousand Tuesdays',
    level: 'B2',
    minutes: 5,
    teaser: {
      uk: 'Іван живе той самий вівторок знову і знову, і щоразу зі школи зникає ще одна дрібниця.',
      ru: 'Иван проживает тот же вторник снова и снова, и каждый раз из школы исчезает ещё одна мелочь.',
      en: 'Ivan lives the same Tuesday again and again, and each time one more small thing disappears from his school.',
    },
    paragraphs: [
      'The first time Ivan noticed, it was only a feeling. The maths teacher dropped her keys at 9:14, and Ivan knew, a second before it happened, that they would slide under the radiator. The second time, he knew the whole lesson by heart. By the fifth Tuesday, he was certain: he was living the same day again, and every night, at exactly midnight, the world rewound like an old video.',
      'At first it was almost fun. He answered every question correctly. He caught the falling keys. He beat everyone at table tennis because he already knew where the ball would go. But after a few weeks of identical Tuesdays, Ivan began to notice something that frightened him far more than the loop itself.',
      'Each Tuesday, something small was missing. A poster of the solar system vanished from the science corridor. Then the clock above the library door. Then the third window in the canteen, replaced by smooth, blank wall. Nobody else saw the gaps. When he pointed at the empty place where the clock had been, his friends looked at him with polite worry.',
      'Nobody except Nina. She sat by herself at the back of the history room, a quiet girl with a long grey scarf, and on the twelfth Tuesday she caught his eye and mouthed a single word: "Window." From then on, they met every lunchtime behind the gym and compared lists. Nina had been counting much longer than he had. She would not say how long.',
      'Together, they worked out a theory. The loop seemed to feed on repetition. Every time they followed the same routine, the school got a little emptier. So the next Tuesday they did everything differently. Ivan told his best friend a secret he had kept for two years. Nina put her hand up in history and, for the first time, said what she really thought. It felt terrifying and ridiculous, like jumping into cold water.',
      'Ivan woke up on Wednesday. The poster was back, the clock was ticking, and the canteen had three windows again. He ran to the history room, grinning, to find Nina. Her desk at the back was empty. The teacher read the register, and her name was not on it. None of his classmates had ever heard of a girl with a long grey scarf.',
      'When Ivan opened his bag, he found a folded note in neat, old-fashioned handwriting. "Thank you for the company. Seventeen thousand Tuesdays is a very long time to be alone. Enjoy your Wednesday. N."',
    ],
    glossary: [
      { en: 'to know by heart', uk: 'знати напам’ять', ru: 'знать наизусть' },
      { en: 'to rewind', uk: 'перемотувати назад', ru: 'перематывать назад' },
      { en: 'identical', uk: 'однаковий', ru: 'одинаковый' },
      { en: 'to vanish', uk: 'зникати', ru: 'исчезать' },
      { en: 'canteen', uk: 'їдальня', ru: 'столовая' },
      { en: 'blank wall', uk: 'глуха, порожня стіна', ru: 'глухая, пустая стена' },
      { en: 'polite worry', uk: 'ввічливе занепокоєння', ru: 'вежливое беспокойство' },
      { en: 'to mouth a word', uk: 'беззвучно вимовити слово', ru: 'беззвучно произнести слово' },
      { en: 'to feed on', uk: 'живитися чимось', ru: 'питаться чем-то' },
      { en: 'repetition', uk: 'повторення', ru: 'повторение' },
      { en: 'ridiculous', uk: 'безглуздий, смішний', ru: 'нелепый, смешной' },
      { en: 'register', uk: 'класний журнал', ru: 'классный журнал' },
    ],
    questions: [
      {
        q: 'How did Ivan first realise he was in a time loop?',
        options: [
          'Nina told him about it.',
          'He knew what would happen before it happened.',
          'His phone showed the same date every day.',
        ],
        answer: 1,
      },
      {
        q: 'What frightened Ivan more than the loop itself?',
        options: [
          'Small parts of the school were disappearing.',
          'His friends stopped talking to him.',
          'He kept failing his maths test.',
        ],
        answer: 0,
      },
      {
        q: 'Nina "mouthed a single word". What does this mean?',
        options: [
          'She shouted the word.',
          'She wrote the word on paper.',
          'She formed the word with her lips but made no sound.',
        ],
        answer: 2,
      },
      {
        q: 'How did Ivan and Nina break the loop?',
        options: [
          'By staying awake past midnight',
          'By doing things differently and being honest',
          'By hiding in the gym all day',
        ],
        answer: 1,
      },
      {
        q: 'What does Nina’s note suggest about her?',
        options: [
          'She moved to another school on Wednesday.',
          'She was playing a long joke on Ivan.',
          'She had been trapped in the loop far longer than Ivan, perhaps for decades.',
        ],
        answer: 2,
      },
    ],
    discuss: [
      'If you had to live the same day again and again, which day would you choose and why?',
      'Nina and Ivan escaped by doing something brave and new. What is one small brave thing you could do this week?',
    ],
    kit: 'st-cat-please',
    color: 'tomato',
  },
];
