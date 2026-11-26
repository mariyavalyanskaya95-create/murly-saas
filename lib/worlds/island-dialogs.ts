// Справжні розмови з жителями Murly Island: кілька реплік, учень обирає відповідь.
// Невдала відповідь: житель реагує, і можна вибрати ще раз. У кожного жителя своя історія з кількох розмов.
export type DOpt = { t: string; to?: string; bad?: string };
export type DNode = { say: string; opts: DOpt[] };
export type Dialog = { id: string; npc: string; title: string; nodes: Record<string, DNode> };

const D = (id: string, npc: string, title: string, nodes: Record<string, DNode>): Dialog => ({ id, npc, title, nodes });

export const DIALOGS: Dialog[] = [
  D('fluff-1', 'Mr Fluff', 'Meeting a neighbour', {
    start: { say: 'Hello there! I don’t think we have met. I’m Mr Fluff. What’s your name?', opts: [
      { t: 'Hi! Nice to meet you, Mr Fluff. I’m new here.', to: 'b' },
      { t: 'I am fine, thank you.', bad: 'Oh, I asked about your name, not how you are!' },
      { t: 'Go away.', bad: 'Oh dear, that is not very friendly. Let’s try again.' }] },
    b: { say: 'Welcome to Murly Island! Do you like it here?', opts: [
      { t: 'Yes, I love it! The beach is beautiful.', to: 'c' },
      { t: 'Yes, I do. Is there a good place to eat?', to: 'food' },
      { t: 'Yes, I am.', bad: 'Hmm, we say “Yes, I do” for “Do you like…?”' }] },
    food: { say: 'Of course! The Cat Cafe makes the best sandwiches. Tell them I sent you!', opts: [{ t: 'Thanks a lot! I’ll go there later.', to: 'c' }] },
    c: { say: 'I live on Sunny Street. Come and visit me some time!', opts: [
      { t: 'Thank you! See you soon, Mr Fluff.' },
      { t: 'Thanks! Bye for now!' }] },
  }),
  D('fluff-2', 'Mr Fluff', 'The broken bike', {
    start: { say: 'Oh no, my bike is broken again! The wheel is flat.', opts: [
      { t: 'Oh no! Can I help you?', to: 'b' },
      { t: 'That’s funny!', bad: 'It is not funny for me! I need it to go to work.' }] },
    b: { say: 'That’s very kind. Do you know where I can buy a new wheel?', opts: [
      { t: 'You can try the Murly Store. They sell bikes.', to: 'c' },
      { t: 'At the Bakery, I think.', bad: 'The Bakery? They sell bread, not wheels!' },
      { t: 'I don’t know, but I can ask someone.', to: 'c' }] },
    c: { say: 'Great idea! Thank you, you are a good friend.', opts: [{ t: 'You’re welcome! Good luck with your bike.' }] },
  }),
  D('lily-1', 'Lily', 'Weekend plans', {
    start: { say: 'Hi! What are you going to do this weekend?', opts: [
      { t: 'I’m going to go fishing at the pier.', to: 'fish' },
      { t: 'I’m going to visit my friends.', to: 'b' },
      { t: 'I went to the beach.', bad: 'That was in the past! I asked about this weekend.' }] },
    fish: { say: 'Fishing? Cool! Have you ever caught a golden fish?', opts: [
      { t: 'No, I haven’t. But I hope I will!', to: 'b' },
      { t: 'Yes, I have! It was amazing.', to: 'b' },
      { t: 'No, I didn’t ever.', bad: 'We say “No, I haven’t” here. Try again!' }] },
    b: { say: 'I’m going to have a picnic on Sunday. Would you like to come?', opts: [
      { t: 'Yes, I’d love to! What time?', to: 'c' },
      { t: 'Sorry, I can’t. Maybe next time.', to: 'd' },
      { t: 'Yes, I like.', bad: 'Say “Yes, I’d love to” or “Yes, please”.' }] },
    c: { say: 'At twelve o’clock, near the fountain. Bring some fruit!', opts: [{ t: 'Great! I’ll bring some apples. See you on Sunday!' }] },
    d: { say: 'No problem! Have a nice weekend.', opts: [{ t: 'Thanks, you too!' }] },
  }),
  D('lily-2', 'Lily', 'My birthday', {
    start: { say: 'Guess what? It’s my birthday tomorrow!', opts: [
      { t: 'Happy birthday! How old will you be?', to: 'b' },
      { t: 'Merry Christmas!', bad: 'Ha ha! Not Christmas, my birthday!' }] },
    b: { say: 'I’ll be twelve. I want a big chocolate cake!', opts: [
      { t: 'You can order one at the Bakery. They make great cakes.', to: 'c' },
      { t: 'Chocolate is my favourite too!', to: 'c' }] },
    c: { say: 'Will you come to my party? It starts at four o’clock.', opts: [
      { t: 'Of course! Shall I bring a present?', to: 'd' },
      { t: 'I will come yesterday.', bad: 'Yesterday? The party is tomorrow, silly!' }] },
    d: { say: 'You don’t need to. Just bring a smile!', opts: [{ t: 'OK! See you at four!' }] },
  }),
  D('paws-1', 'Captain Paws', 'Sea stories', {
    start: { say: 'Ahoy, sailor! Do you like the sea?', opts: [
      { t: 'Yes, I do! I love boats.', to: 'b' },
      { t: 'Not really. I can’t swim.', to: 'swim' },
      { t: 'Ahoy! Yes, I does.', bad: 'Arr! We say “Yes, I do”, sailor!' }] },
    swim: { say: 'Don’t worry! A good sailor always wears a life jacket.', opts: [{ t: 'That’s a good idea. Tell me about your boat!', to: 'b' }] },
    b: { say: 'Last year I sailed around the island in a big storm. The waves were huge!', opts: [
      { t: 'Wow! Were you scared?', to: 'c' },
      { t: 'Wow! Are you scared?', bad: 'It was last year, so ask “Were you…?”' }] },
    c: { say: 'A little! But the lighthouse helped me find the way home.', opts: [{ t: 'Captain Ted is a hero, then!' }, { t: 'What a great story! Thank you, Captain.' }] },
  }),
  D('paws-2', 'Captain Paws', 'Lost map', {
    start: { say: 'Have you seen my map? I can’t find it anywhere!', opts: [
      { t: 'No, I haven’t. Where did you see it last?', to: 'b' },
      { t: 'Yes, it’s a map.', bad: 'I know it’s a map! I want to know where it is.' }] },
    b: { say: 'I was reading it on the bench next to the fountain.', opts: [
      { t: 'Let’s look there! Maybe it’s under the bench.', to: 'c' },
      { t: 'Check the Lost & Found board, too.', to: 'c' }] },
    c: { say: 'Smart cat! I’ll go and look. Thanks for your help!', opts: [{ t: 'No problem, Captain. Good luck!' }] },
  }),
  D('whiskers-1', 'Grandma Whiskers', 'Garden', {
    start: { say: 'Good morning, dear. Do you like flowers?', opts: [
      { t: 'Good morning! Yes, I do. Which flowers do you grow?', to: 'b' },
      { t: 'Good night!', bad: 'Good night? It’s not bedtime, dear!' }] },
    b: { say: 'Roses, tulips and sunflowers. Sunflowers are the tallest!', opts: [
      { t: 'How tall are they?', to: 'c' },
      { t: 'Sunflowers are yellow, aren’t they?', to: 'c' }] },
    c: { say: 'Taller than me! Would you like to help me water them one day?', opts: [
      { t: 'I’d be happy to help!' },
      { t: 'Sure! Just tell me when.' },
      { t: 'No.', bad: 'Oh. Maybe you could say it more politely?' }] },
  }),
  D('tom-1', 'Tom', 'Football', {
    start: { say: 'Hey! Do you want to play football with us?', opts: [
      { t: 'Yes, please! Where do you play?', to: 'b' },
      { t: 'Sorry, I’m busy now. Maybe later?', to: 'later' },
      { t: 'Yes, I want play.', bad: 'Say “I want to play”. Come on!' }] },
    later: { say: 'OK, we play every day after school.', opts: [{ t: 'Cool, I’ll come tomorrow!' }] },
    b: { say: 'Near the playground. Can you run fast?', opts: [
      { t: 'Yes, I can! I’m very fast.', to: 'c' },
      { t: 'Not very fast, but I’m a good goalkeeper.', to: 'c' },
      { t: 'Yes, I am run.', bad: 'Try “Yes, I can”.' }] },
    c: { say: 'Great! You can be on my team!', opts: [{ t: 'Awesome! Let’s win!' }] },
  }),
  D('tom-2', 'Tom', 'Homework trouble', {
    start: { say: 'Ugh, I have so much homework today.', opts: [
      { t: 'What subject is it?', to: 'b' },
      { t: 'Homework is fun!', bad: 'Fun? Not for me! It’s maths.' }] },
    b: { say: 'Maths. I don’t understand fractions.', opts: [
      { t: 'I can help you. Half a pizza is one second... I mean, one half!', to: 'c' },
      { t: 'Ask your teacher tomorrow. Teachers like questions.', to: 'c' }] },
    c: { say: 'Thanks! You always make me feel better.', opts: [{ t: 'That’s what friends are for!' }] },
  }),
  D('daisy-1', 'Daisy', 'Pets', {
    start: { say: 'Look at my new kitten! Isn’t she cute?', opts: [
      { t: 'She’s so cute! What’s her name?', to: 'b' },
      { t: 'Is it a dog?', bad: 'A dog? She says “meow”!' }] },
    b: { say: 'Her name is Snowball, because she is all white.', opts: [
      { t: 'That’s a perfect name! How old is she?', to: 'c' },
      { t: 'Do you have any other pets?', to: 'pets' }] },
    pets: { say: 'Yes, I have a goldfish called Bubbles too!', opts: [{ t: 'I want a pet too. Maybe a puppy!', to: 'c' }] },
    c: { say: 'You can buy a pet at the Murly Store. They have bunnies and puppies!', opts: [{ t: 'Really? I’ll save my coins!' }] },
  }),
  D('meow-1', 'Professor Meow', 'Island facts', {
    start: { say: 'Good afternoon. Did you know that our lighthouse is one hundred years old?', opts: [
      { t: 'Really? That’s very old!', to: 'b' },
      { t: 'No, I didn’t. Who built it?', to: 'b' },
      { t: 'Yes, it is a hundred.', bad: 'Hmm. Show some interest! Say “Really?” or ask a question.' }] },
    b: { say: 'The first cats on the island built it. They were fishermen.', opts: [
      { t: 'Why did they need a lighthouse?', to: 'c' },
      { t: 'Interesting! What else do you know?', to: 'c' }] },
    c: { say: 'Ships need light at night, or they hit the rocks. Science helps everyone!', opts: [{ t: 'Thank you, Professor. I learned something new!' }] },
  }),
  D('ruby-1', 'Ruby', 'Shopping', {
    start: { say: 'Hi! I need a new dress for a party, but I can’t decide. Can you help?', opts: [
      { t: 'Sure! What colour do you like?', to: 'b' },
      { t: 'Sure! Go to the Boutique. They have lots of dresses.', to: 'b' }] },
    b: { say: 'I like pink and purple. Which is better, do you think?', opts: [
      { t: 'I think purple is better. It’s very elegant.', to: 'c' },
      { t: 'Pink! It’s brighter and more fun.', to: 'c' },
      { t: 'I think purple is gooder.', bad: 'We say “better”, not “gooder”!' }] },
    c: { say: 'Thanks! I’ll try both on and choose.', opts: [{ t: 'Good idea! Have fun at the party!' }] },
  }),
  D('rose-1', 'Grandma Rose', 'Tea time', {
    start: { say: 'Come in, come in! Would you like a cup of tea?', opts: [
      { t: 'Yes, please. With milk, please.', to: 'b' },
      { t: 'No, thank you. Can I have some juice?', to: 'b' },
      { t: 'Give me tea!', bad: 'Oh my! We always say “please” in this house, dear.' }] },
    b: { say: 'Here you are. When I was young, I lived in a big city by the river.', opts: [
      { t: 'Did you like living there?', to: 'c' },
      { t: 'Do you like living there?', bad: 'It was a long time ago, dear. Ask “Did you…?”' }] },
    c: { say: 'Yes, but I love this island more. It’s quiet and everyone is kind.', opts: [{ t: 'I agree! Thank you for the tea, Grandma Rose.' }] },
  }),
];

export function nextDialog(npc: string, done: string[]) {
  return DIALOGS.find((d) => d.npc === npc && !done.includes(d.id)) ?? null;
}
