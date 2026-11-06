// Гра «Murly City»: поле, місця й колоди завдань для розмовної практики.
// Завдання англійською, підказки для вчителя українською й російською. Тексти наші.

export type Hint = { uk: string; ru: string };
export type CityTask = { en: string; hint: Hint };
export type PlaceId =
  | 'cafe' | 'bakery' | 'park' | 'library'
  | 'cinema' | 'museum' | 'station' | 'market'
  | 'flat' | 'supermarket' | 'pool' | 'school'
  | 'hotel' | 'post' | 'flowers' | 'airport';
export type DeckId = 'renting' | 'city' | 'food' | 'travel';
export type CityDeck = {
  id: DeckId;
  title: string;
  level: string;
  about: { uk: string; ru: string; en: string };
  tasks: Record<PlaceId, CityTask>;
  cards: CityTask[];
};

export type CellKind = 'start' | 'place' | 'murly' | 'coffee' | 'lucky' | 'bike';
export type Cell = { kind: CellKind; place?: PlaceId; name: string; side: number };

// Ціни за сторонами поля: що далі від старту, то дорожче
export const SIDE_PRICE = [60, 80, 100, 120];
export const SIDE_COLOR = ['#AFC3F0', '#F4C0D1', '#9ED9A4', '#F7D46B'];

const P = (place: PlaceId, name: string, side: number): Cell => ({ kind: 'place', place, name, side });
const M = (side: number): Cell => ({ kind: 'murly', name: 'Murly card', side });

// 24 клітинки по колу (7 x 7), за годинниковою стрілкою від лівого верхнього кута
export const CELLS: Cell[] = [
  { kind: 'start', name: 'START', side: -1 },
  P('cafe', 'Cafe', 0), P('bakery', 'Bakery', 0), M(0), P('park', 'Park', 0), P('library', 'Library', 0),
  { kind: 'coffee', name: 'Coffee break', side: -1 },
  P('cinema', 'Cinema', 1), P('museum', 'Museum', 1), M(1), P('station', 'Station', 1), P('market', 'Market', 1),
  { kind: 'lucky', name: 'Lucky street', side: -1 },
  P('flat', 'Flat', 2), P('supermarket', 'Supermarket', 2), M(2), P('pool', 'Pool', 2), P('school', 'School', 2),
  { kind: 'bike', name: 'Bike ride', side: -1 },
  P('hotel', 'Hotel', 3), P('post', 'Post office', 3), M(3), P('flowers', 'Flower shop', 3), P('airport', 'Airport', 3),
];

export const priceOf = (cell: number) => (CELLS[cell].side >= 0 ? SIDE_PRICE[CELLS[cell].side] : 0);

const h = (uk: string, ru: string): Hint => ({ uk, ru });

const renting: CityDeck = {
  id: 'renting',
  title: 'Renting a flat',
  level: 'B1-B2',
  about: {
    uk: 'Оренда житла: пошук квартири, орендодавець, сусіди по квартирі, рахунки.',
    ru: 'Аренда жилья: поиск квартиры, арендодатель, соседи по квартире, счета.',
    en: 'Renting: flat hunting, landlords, flatmates, bills.',
  },
  tasks: {
    cafe: { en: 'You are meeting a possible flatmate in a cafe. Ask four questions to find out if you can live together: habits, guests, cleaning, noise.', hint: h('Do you often...? How do you feel about...? Лексика: tidy, a night owl, share the chores.', 'Do you often...? How do you feel about...? Лексика: tidy, a night owl, share the chores.') },
    bakery: { en: 'The flat is right above a bakery. Name two advantages and two disadvantages of living above a shop.', hint: h('One advantage is... The downside is... Лексика: convenient, early deliveries, the smell, noise.', 'One advantage is... The downside is... Лексика: convenient, early deliveries, the smell, noise.') },
    park: { en: 'Describe your ideal neighbourhood. What must be within walking distance, and why?', hint: h('within walking distance, a quiet area, green spaces, It matters to me because...', 'within walking distance, a quiet area, green spaces, It matters to me because...') },
    library: { en: 'Explain what a lease, a deposit and a utility bill are. Use each word in your own sentence.', hint: h('lease = договір оренди, deposit = застава, utility bill = рахунок за комунальні послуги.', 'lease = договор аренды, deposit = залог, utility bill = счёт за коммунальные услуги.') },
    cinema: { en: 'Tell a flat-hunting horror story, real or invented, in five sentences. Use past tenses.', hint: h('Past Simple і Past Continuous: While we were looking around, suddenly... Лексика: mould, a broken boiler, a rude landlord.', 'Past Simple и Past Continuous: While we were looking around, suddenly... Лексика: mould, a broken boiler, a rude landlord.') },
    museum: { en: 'Compare a flat in an old historic building with a flat in a brand-new block. Which would you choose?', hint: h('Порівняння: more spacious than, not as modern as. Лексика: high ceilings, a lift, insulation.', 'Сравнение: more spacious than, not as modern as. Лексика: high ceilings, a lift, insulation.') },
    station: { en: 'You want to live near public transport. Call the agent and ask how far the flat is from the station and what the commute is like.', hint: h('How long does it take to get to...? Is it far from...? Лексика: commute, a ten-minute walk, rush hour.', 'How long does it take to get to...? Is it far from...? Лексика: commute, a ten-minute walk, rush hour.') },
    market: { en: 'Negotiate the rent. The landlord wants 800 a month and you want to pay less. Give three reasons for a lower price.', hint: h('Would you consider...? I was hoping for... Since the flat needs... Ввічливий торг, умовні речення.', 'Would you consider...? I was hoping for... Since the flat needs... Вежливый торг, условные предложения.') },
    flat: { en: 'Describe the place you live in now: the rooms, the furniture, what you love and what you would change.', hint: h('There is / There are..., If I could, I would change... Лексика: open-plan, a fitted kitchen, a spare room.', 'There is / There are..., If I could, I would change... Лексика: open-plan, a fitted kitchen, a spare room.') },
    supermarket: { en: 'Your flatmate never buys shared things like soap or milk. Politely raise the problem and suggest a fair system.', hint: h("I've noticed that..., Would you mind...?, How about we...? Лексика: split the cost, a shared fund.", "I've noticed that..., Would you mind...?, How about we...? Лексика: split the cost, a shared fund.") },
    pool: { en: 'The building has a pool and a gym, but the rent is much higher. Is it worth it? Give your opinion with reasons.', hint: h('On the one hand... on the other hand..., In my view... Лексика: facilities, a service charge, value for money.', 'On the one hand... on the other hand..., In my view... Лексика: facilities, a service charge, value for money.') },
    school: { en: 'A family with two young children is looking for a flat. Give them three pieces of advice about choosing the area.', hint: h('You should..., Make sure..., It is a good idea to... Лексика: a safe street, a playground, nearby schools.', 'You should..., Make sure..., It is a good idea to... Лексика: a safe street, a playground, nearby schools.') },
    hotel: { en: 'You have just moved to a new city and you are staying in a hotel while you look for a flat. Describe your plan for the first three days.', hint: h("Плани: I'm going to..., First... Then... Finally... Лексика: a viewing, an estate agent, a listing.", "Планы: I'm going to..., First... Then... Finally... Лексика: a viewing, an estate agent, a listing.") },
    post: { en: 'Leave a voice message for your landlord: the heating has stopped working. Be polite but firm.', hint: h("I'm calling to let you know..., Could you please arrange...?, as soon as possible.", "I'm calling to let you know..., Could you please arrange...?, as soon as possible.") },
    flowers: { en: 'Your landlord does not allow pets or plants on the balcony. Persuade them to change the rule.', hint: h("Переконання: I promise to..., It would make the flat..., I'd be happy to... Лексика: responsible, damage.", "Убеждение: I promise to..., It would make the flat..., I'd be happy to... Лексика: responsible, damage.") },
    airport: { en: 'You are moving abroad for a year. What will you do with your flat: sublet it, give it back or leave it empty? Explain.', hint: h('Умовні речення: If I sublet it, I will... Лексика: sublet, a tenant, storage, the notice period.', 'Условные предложения: If I sublet it, I will... Лексика: sublet, a tenant, storage, the notice period.') },
  },
  cards: [
    { en: 'Say three adjectives that describe a perfect landlord and explain one of them.', hint: h('reliable, fair, helpful, easy-going...', 'reliable, fair, helpful, easy-going...') },
    { en: 'Describe your dream bedroom for 30 seconds without stopping.', hint: h('Таймер 30 секунд. Хвалимо за плавність, не за ідеальність.', 'Таймер 30 секунд. Хвалим за беглость, не за идеальность.') },
    { en: 'Role-play: the teacher is the estate agent. Ask about the bills and the deposit.', hint: h('Are the bills included? How much is the deposit? When do I get it back?', 'Are the bills included? How much is the deposit? When do I get it back?') },
    { en: 'Name five things you can find in a kitchen in 20 seconds.', hint: h('fridge, cooker, sink, kettle, microwave...', 'fridge, cooker, sink, kettle, microwave...') },
    { en: "Finish the sentence in three different ways: 'I would never rent a flat that...'", hint: h('Relative clauses: ...that has no windows / that is above a nightclub.', 'Relative clauses: ...that has no windows / that is above a nightclub.') },
    { en: "Explain the difference between 'furnished' and 'unfurnished' without saying 'furniture'.", hint: h('Перефразування: comes with a bed and a sofa / is completely empty.', 'Перефразирование: comes with a bed and a sofa / is completely empty.') },
    { en: 'Role-play: you are the landlord. Show the teacher around the flat and point out its best features.', hint: h("This is the..., As you can see..., The best thing about it is...", "This is the..., As you can see..., The best thing about it is...") },
    { en: "Give two tips for living with flatmates. Use 'should' and 'shouldn't'.", hint: h("You should label your food. You shouldn't play loud music late.", "You should label your food. You shouldn't play loud music late.") },
    { en: "Describe the noisiest neighbour you can imagine. Use 'always' and 'keeps doing'.", hint: h('He is always..., She keeps playing the drums at night...', 'He is always..., She keeps playing the drums at night...') },
    { en: "Ask one question with 'How much...?' and one with 'How many...?' about a flat.", hint: h('How much is the rent? How many bedrooms are there?', 'How much is the rent? How many bedrooms are there?') },
    { en: 'Describe the view from your window in four sentences.', hint: h('In the distance..., Right in front of..., On the left...', 'In the distance..., Right in front of..., On the left...') },
    { en: 'Say three house rules you would put on the fridge in a shared flat.', hint: h("Імператив: Wash up after... Don't... Always...", "Императив: Wash up after... Don't... Always...") },
  ],
};

const city: CityDeck = {
  id: 'city',
  title: 'My city',
  level: 'A2',
  about: {
    uk: 'Моє місто: місця, транспорт, напрямки, що там можна робити.',
    ru: 'Мой город: места, транспорт, направления, чем там заняться.',
    en: 'My city: places, transport, directions, things to do.',
  },
  tasks: {
    cafe: { en: 'Is there a nice cafe in your city? Say its name, where it is and what you order there.', hint: h("It's called..., It's next to..., I usually order...", "It's called..., It's next to..., I usually order...") },
    bakery: { en: 'What can you buy at a bakery? Name five things and say which one you like best.', hint: h('bread, buns, cakes, cookies, pies. I like... best.', 'bread, buns, cakes, cookies, pies. I like... best.') },
    park: { en: 'Describe a park in your town. What can people do there?', hint: h('There is a..., People can walk, ride a bike, have a picnic...', 'There is a..., People can walk, ride a bike, have a picnic...') },
    library: { en: 'Do you go to the library? Why or why not? Say three sentences.', hint: h("I go there because..., I don't go because..., I prefer...", "I go there because..., I don't go because..., I prefer...") },
    cinema: { en: 'When did you last go to the cinema? What did you see? Did you like it?', hint: h('Past Simple: I went..., I saw..., It was...', 'Past Simple: I went..., I saw..., It was...') },
    museum: { en: 'Is there a museum in your city? What is in it? Would you take a tourist there?', hint: h('There are old pictures / clothes / machines... Yes, because...', 'There are old pictures / clothes / machines... Yes, because...') },
    station: { en: "How do you get to the city centre from your home? Use 'by bus', 'by tram' or 'on foot'.", hint: h('I go by..., It takes about... minutes.', 'I go by..., It takes about... minutes.') },
    market: { en: 'What do people sell at the market in your city? Name five things.', hint: h('fruit, vegetables, flowers, clothes, honey...', 'fruit, vegetables, flowers, clothes, honey...') },
    flat: { en: 'Do you live in a flat or a house? Describe your street.', hint: h("I live in a..., My street is quiet / busy, There is a shop at the corner.", "I live in a..., My street is quiet / busy, There is a shop at the corner.") },
    supermarket: { en: "Give directions from your home to the nearest supermarket. Use 'turn left', 'turn right', 'go straight on'.", hint: h('Go out of..., Turn left at..., It is on your right.', 'Go out of..., Turn left at..., It is on your right.') },
    pool: { en: 'What sports can people do in your city? Which one do you like?', hint: h('You can swim, play football, go skating... I like... because...', 'You can swim, play football, go skating... I like... because...') },
    school: { en: 'Describe a school in your town. Is it big or small? Old or new? What colour is it?', hint: h("It's a big old building..., There are... floors.", "It's a big old building..., There are... floors.") },
    hotel: { en: 'A friend is visiting your city. Recommend a place to stay and say why.', hint: h('You can stay at..., It is near..., It is cheap / nice.', 'You can stay at..., It is near..., It is cheap / nice.') },
    post: { en: "Say a postcard about your city to a friend. Start with 'Dear...'", hint: h('Dear Sam, My city is... There is... Love,...', 'Dear Sam, My city is... There is... Love,...') },
    flowers: { en: 'What is the most beautiful place in your city? Describe it with three adjectives.', hint: h('beautiful, green, quiet, old, colourful...', 'beautiful, green, quiet, old, colourful...') },
    airport: { en: 'Is there an airport near your city? Where do people from your city like to travel?', hint: h('The nearest airport is in..., People like to go to the sea / the mountains.', 'The nearest airport is in..., People like to go to the sea / the mountains.') },
  },
  cards: [
    { en: "Say three words that start with 'S' that you can see in a city.", hint: h('street, shop, school, station, square...', 'street, shop, school, station, square...') },
    { en: 'Name five places in a city in 15 seconds.', hint: h('bank, park, hospital, cafe, bridge...', 'bank, park, hospital, cafe, bridge...') },
    { en: 'Role-play: you are a tourist. Ask the teacher the way to the museum.', hint: h('Excuse me, how do I get to...? Is it far?', 'Excuse me, how do I get to...? Is it far?') },
    { en: "Say two things you love and one thing you don't like about your city.", hint: h("I love..., I don't like...", "I love..., I don't like...") },
    { en: "Describe your city in one sentence with 'big', 'old' or 'busy'.", hint: h('My city is big and busy, but the centre is old.', 'My city is big and busy, but the centre is old.') },
    { en: "Say three things people can do at the weekend in your city. Start with 'You can...'", hint: h('You can go to..., You can visit..., You can eat...', 'You can go to..., You can visit..., You can eat...') },
    { en: "Compare your city with the capital: 'My city is smaller than...'", hint: h('Ступені порівняння: smaller, quieter, more beautiful.', 'Степени сравнения: smaller, quieter, more beautiful.') },
    { en: 'Name four kinds of transport and say which one is the fastest.', hint: h('bus, tram, metro, taxi. The fastest is...', 'bus, tram, metro, taxi. The fastest is...') },
    { en: 'Ask the teacher three questions about their city.', hint: h('Is there a...? What is your favourite...? Is it big?', 'Is there a...? What is your favourite...? Is it big?') },
    { en: 'Say where you like to meet friends in the city and why.', hint: h('We usually meet at..., because it is...', 'We usually meet at..., because it is...') },
    { en: 'Describe your favourite street in three sentences.', hint: h('It is long / short..., There are..., I like it because...', 'It is long / short..., There are..., I like it because...') },
    { en: "Say what there is and what there isn't in your street.", hint: h("There is a..., but there isn't a...", "There is a..., but there isn't a...") },
  ],
};

const food: CityDeck = {
  id: 'food',
  title: 'Food and cafes',
  level: 'A1-A2',
  about: {
    uk: 'Їжа й кафе: замовлення, смаки, покупки, сніданок, обід і вечеря.',
    ru: 'Еда и кафе: заказ, вкусы, покупки, завтрак, обед и ужин.',
    en: 'Food and cafes: ordering, likes and dislikes, shopping, meals.',
  },
  tasks: {
    cafe: { en: "Order a drink and a snack. The teacher is the waiter. Start with 'Can I have...?'", hint: h('Can I have a juice and a sandwich, please? How much is it?', 'Can I have a juice and a sandwich, please? How much is it?') },
    bakery: { en: 'Name four things you can buy at a bakery. Which one do you want now?', hint: h('bread, a bun, a cake, a cookie. I want...', 'bread, a bun, a cake, a cookie. I want...') },
    park: { en: 'You are having a picnic in the park. What is in your basket? Name five foods.', hint: h('In my basket there are apples, sandwiches...', 'In my basket there are apples, sandwiches...') },
    library: { en: 'Spell your favourite food letter by letter. Then say why you like it.', hint: h('Алфавіт англійською. I like it because it is sweet / tasty.', 'Алфавит по-английски. I like it because it is sweet / tasty.') },
    cinema: { en: "What do you eat or drink at the cinema? Say 'I like...' and 'I don't like...'", hint: h("popcorn, nachos, cola, water. I like..., I don't like...", "popcorn, nachos, cola, water. I like..., I don't like...") },
    museum: { en: 'Describe a traditional dish from your country. Is it sweet, salty or spicy?', hint: h('It is called..., It has..., It is salty.', 'It is called..., It has..., It is salty.') },
    station: { en: 'You are hungry at the station. Ask how much a sandwich and a coffee cost.', hint: h('How much is a sandwich? How much does a coffee cost?', 'How much is a sandwich? How much does a coffee cost?') },
    market: { en: 'Name three fruits and three vegetables. Say their colours.', hint: h('A banana is yellow. A tomato is red...', 'A banana is yellow. A tomato is red...') },
    flat: { en: "What is in your fridge right now? Use 'There is...' and 'There are some...'", hint: h('There is some milk. There are some eggs.', 'There is some milk. There are some eggs.') },
    supermarket: { en: "Make a shopping list for pancakes. Say it out loud: 'We need...'", hint: h('We need flour, milk, eggs, sugar...', 'We need flour, milk, eggs, sugar...') },
    pool: { en: 'What do you like to eat after sport? Is it healthy?', hint: h('After sport I eat..., It is healthy / not healthy.', 'After sport I eat..., It is healthy / not healthy.') },
    school: { en: 'Describe a school lunch. What did you eat at school as a child?', hint: h('Past Simple: I ate..., We had...', 'Past Simple: I ate..., We had...') },
    hotel: { en: 'Describe your perfect hotel breakfast.', hint: h('I want..., and..., and a cup of...', 'I want..., and..., and a cup of...') },
    post: { en: 'Send a food postcard: tell a friend about a meal you ate yesterday.', hint: h('Yesterday I ate..., It was delicious!', 'Yesterday I ate..., It was delicious!') },
    flowers: { en: 'Name foods that are red, green and yellow. Two for each colour.', hint: h('red: strawberry, tomato. green: ... yellow: ...', 'red: strawberry, tomato. green: ... yellow: ...') },
    airport: { en: 'What food would you like to try in another country? Why?', hint: h("I'd like to try..., because...", "I'd like to try..., because...") },
  },
  cards: [
    { en: "Say three food words with the letter 'P'.", hint: h('pizza, pasta, pear, potato, pie...', 'pizza, pasta, pear, potato, pie...') },
    { en: 'Name five drinks in 15 seconds.', hint: h('water, tea, juice, milk, lemonade...', 'water, tea, juice, milk, lemonade...') },
    { en: "Role-play: you are the waiter. Take the teacher's order.", hint: h('Hello! What would you like? Anything to drink?', 'Hello! What would you like? Anything to drink?') },
    { en: 'Say your favourite food and the food you like least.', hint: h('My favourite food is..., I really don\'t like...', 'My favourite food is..., I really don\'t like...') },
    { en: 'Describe a sandwich you would make. What is in it?', hint: h('My sandwich has cheese, ...', 'My sandwich has cheese, ...') },
    { en: "Say 'I'm hungry' and 'I'm thirsty' and one food or drink for each.", hint: h("I'm hungry. I want a burger. I'm thirsty. I want water.", "I'm hungry. I want a burger. I'm thirsty. I want water.") },
    { en: 'Name three things you use to eat.', hint: h('a fork, a knife, a spoon, a plate, chopsticks...', 'a fork, a knife, a spoon, a plate, chopsticks...') },
    { en: "Ask the teacher two questions with 'Do you like...?'", hint: h('Do you like fish? Do you like ice cream?', 'Do you like fish? Do you like ice cream?') },
    { en: 'Say what you usually have for breakfast, lunch and dinner.', hint: h('For breakfast I have..., For lunch...', 'For breakfast I have..., For lunch...') },
    { en: 'Describe a birthday cake: its colour, its size and its taste.', hint: h('It is big and pink. It tastes like...', 'It is big and pink. It tastes like...') },
    { en: 'Say one healthy food and one unhealthy food and why.', hint: h('Carrots are healthy because... Chips are not healthy because...', 'Carrots are healthy because... Chips are not healthy because...') },
    { en: 'Count from one to five with food: one apple, two eggs...', hint: h('Множина: tomatoes, sandwiches, cherries.', 'Множественное число: tomatoes, sandwiches, cherries.') },
  ],
};

const travel: CityDeck = {
  id: 'travel',
  title: 'Travel',
  level: 'B1',
  about: {
    uk: 'Подорожі: транспорт, житло, проблеми в дорозі, враження й поради.',
    ru: 'Путешествия: транспорт, жильё, проблемы в дороге, впечатления и советы.',
    en: 'Travel: transport, places to stay, problems on the road, tips.',
  },
  tasks: {
    cafe: { en: 'Tell us about a cafe or restaurant you visited on a trip. What made it special?', hint: h('Past Simple: We found..., The best thing was... Лексика: cosy, local dishes, friendly staff.', 'Past Simple: We found..., The best thing was... Лексика: cosy, local dishes, friendly staff.') },
    bakery: { en: 'What local food should a visitor try in your country? Describe it and say where to buy it.', hint: h("You should definitely try..., It's made of..., You can get it at...", "You should definitely try..., It's made of..., You can get it at...") },
    park: { en: 'Describe a famous park or natural place you have visited or would like to visit.', hint: h("I've been to..., I'd love to see... Лексика: breathtaking, a national park, a hiking trail.", "I've been to..., I'd love to see... Лексика: breathtaking, a national park, a hiking trail.") },
    library: { en: 'How do you plan a trip? Guidebooks, apps or friends\' advice? Explain your steps.', hint: h('First I..., Then I check..., Лексика: book in advance, read reviews, an itinerary.', 'First I..., Then I check..., Лексика: book in advance, read reviews, an itinerary.') },
    cinema: { en: 'Describe a film or series that made you want to visit a place.', hint: h('It was set in..., After watching it, I wanted to...', 'It was set in..., After watching it, I wanted to...') },
    museum: { en: 'Do you enjoy museums on holiday or do you prefer being outdoors? Give an example.', hint: h('I prefer... to..., For example, last summer...', 'I prefer... to..., For example, last summer...') },
    station: { en: 'Role-play: buy a return train ticket. Ask about the departure time, the platform and the price.', hint: h('A return ticket to..., please. What time does it leave? Which platform?', 'A return ticket to..., please. What time does it leave? Which platform?') },
    market: { en: 'Have you ever bargained at a market abroad? Tell the story or explain how to do it well.', hint: h("Present Perfect: Have you ever...? Лексика: bargain, a good deal, That's too expensive.", "Present Perfect: Have you ever...? Лексика: bargain, a good deal, That's too expensive.") },
    flat: { en: 'Hotel or rented apartment for a holiday? Compare them and choose one.', hint: h('An apartment is more..., A hotel is less... Лексика: self-catering, room service.', 'An apartment is more..., A hotel is less... Лексика: self-catering, room service.') },
    supermarket: { en: 'You are travelling on a budget. How can you save money on food and transport?', hint: h('You can..., It is cheaper to..., Лексика: a travel pass, street food, cook for yourself.', 'You can..., It is cheaper to..., Лексика: a travel pass, street food, cook for yourself.') },
    pool: { en: 'Beach holiday or city break? Give three reasons for your choice.', hint: h('Firstly..., Secondly..., Finally... Лексика: relax, sightseeing, nightlife.', 'Firstly..., Secondly..., Finally... Лексика: relax, sightseeing, nightlife.') },
    school: { en: 'Talk about a school trip you remember. Where did you go and what happened?', hint: h('Past Simple і Past Continuous: We were walking when...', 'Past Simple и Past Continuous: We were walking when...') },
    hotel: { en: 'Role-play: complain at hotel reception. Your room is noisy and the Wi-Fi does not work.', hint: h("I'm afraid there is a problem with..., Could I change rooms?, I'd like to speak to the manager.", "I'm afraid there is a problem with..., Could I change rooms?, I'd like to speak to the manager.") },
    post: { en: 'What souvenirs do you usually bring home? Describe the best one you have.', hint: h('I usually buy..., I got it in..., It reminds me of...', 'I usually buy..., I got it in..., It reminds me of...') },
    flowers: { en: 'Describe the most beautiful place you have ever seen. Use the present perfect.', hint: h("The most beautiful place I've ever seen is..., I've never seen anything like...", "The most beautiful place I've ever seen is..., I've never seen anything like...") },
    airport: { en: 'Tell us about a travel problem: a delay, lost luggage or a missed flight. What did you do?', hint: h('Лексика: delayed, cancelled, the check-in desk, lost and found. Past tenses.', 'Лексика: delayed, cancelled, the check-in desk, lost and found. Прошедшие времена.') },
  },
  cards: [
    { en: 'Say three things you always pack in your suitcase and why.', hint: h('I always pack..., because...', 'I always pack..., because...') },
    { en: 'Name five countries and their languages in 20 seconds.', hint: h('Spain: Spanish, Japan: Japanese...', 'Spain: Spanish, Japan: Japanese...') },
    { en: 'Role-play: ask a local for directions to the old town.', hint: h('Excuse me, could you tell me how to get to...?', 'Excuse me, could you tell me how to get to...?') },
    { en: "Finish the sentence: 'The next time I travel, I'm going to...'", hint: h('be going to для планів.', 'be going to для планов.') },
    { en: 'Say three words connected with airports.', hint: h('boarding pass, gate, security, luggage, passport control...', 'boarding pass, gate, security, luggage, passport control...') },
    { en: 'Describe your dream holiday for 30 seconds without stopping.', hint: h('Таймер 30 секунд. I would go to..., I would stay...', 'Таймер 30 секунд. I would go to..., I would stay...') },
    { en: "Use 'Have you ever...?' to ask the teacher two travel questions.", hint: h('Have you ever been to...? Have you ever tried...?', 'Have you ever been to...? Have you ever tried...?') },
    { en: 'Explain how to get from your home to the nearest airport.', hint: h('First take..., then change to..., It takes about...', 'First take..., then change to..., It takes about...') },
    { en: "Give a visitor three tips about your country. Use 'should' and 'shouldn't'.", hint: h("You should try..., You shouldn't miss...", "You should try..., You shouldn't miss...") },
    { en: 'Name four types of transport and say one good thing about each.', hint: h('A train is comfortable, a bike is cheap...', 'A train is comfortable, a bike is cheap...') },
    { en: 'Describe a photo from your last trip as if you were holding it now.', hint: h('In this photo..., In the background..., We were...', 'In this photo..., In the background..., We were...') },
    { en: 'Say what you would do if you lost your passport abroad.', hint: h("Second conditional: If I lost my passport, I would...", "Second conditional: If I lost my passport, I would...") },
  ],
};

export const DECKS: CityDeck[] = [renting, city, food, travel];
export const deckById = (id: DeckId) => DECKS.find((d) => d.id === id) ?? renting;
