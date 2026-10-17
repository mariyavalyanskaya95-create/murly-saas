# Як «оживити» урок граматики (для помічника)

Марія: правило читається за 2 хвилини, тож уроку потрібно БІЛЬШЕ ігор, відео, мемів, лексики з перекладом, питань і розборів помилок. Онови уроки у вказаному файлі, НЕ змінюючи id уроків і не ламаючи формат.

Нові хелпери з `makeHelpers` (вже є в lib/lessons/helpers.ts):
- `meme(kit, top, bottom, uk)`: мем-стікер з котиком. kit один з: st-cat-shock, st-cat-cool, st-cat-coffee, st-cat-please, st-cat-blep, st-cat-loaf, st-cat-heart, st-cat-box, st-cat-nightcap, st-girl-bow, st-boy-cap, st-boy-backpack. top/bottom короткі смішні англійські підписи в стилі мемів, що ВЖИВАЮТЬ граматику уроку (напр. top: 'Me: I am not tired', bottom: 'Also me at 3 pm:'), uk: переклад українською. Свої жарти, не копії відомих мемів.
- `game(title, prompt, pairs)`: гра всередині уроку (учень сам обирає квіз, пари, анаграми чи картки). pairs: рядки «питання = відповідь», 8-12 рядків. Напр. title 'Speed round: is or are?', prompt 'Choose am, is or are', pairs 'My cat ___ hungry. = is' ... Відповіді короткі (1-3 слова).
- `video(url, task, caption)`: лише з наданого нижче списку, завдання англійською, caption українською з назвою каналу.

Що додати в КОЖЕН урок (і скоротити блок правила до ~5 хв, перенісши хвилини в практику):
1. 2-3 меми, розставлені між етапами (після правила, в практиці, перед домашкою).
2. 2 гри game(...) (одна після правила, одна в кінці як «Speed round»).
3. 1-2 відео з переліку для цього уроку + завдання «Watch and ...» + note для вчителя (на яких секундах зупиняти, які питання ставити, що відповідають).
4. Лексику: vocab(...) 10-14 слів з перекладом українською, які трапляються в уроці.
5. «Розбір помилок»: tip(...) з 4-5 типовими помилками українськомовних учнів (неправильно → правильно, коротке чому) + вправа choice «Знайди правильне речення» або gap «Виправ помилку».
6. Більше питань для говоріння: у talk(...) по 8-10 питань, частина з них смішні.
Таймінг у заголовках етапів має давати разом 60 хв.

Правила: українською інструкції, tip, note; англійською речення, меми, ігри. Без довгих тире (— –), без емодзі, апостроф ’. Жодної військової тематики, політики, радянського. Відповіді однозначні. Після змін: `cd /sessions/wonderful-brave-ride/murly-saas && npx tsc --noEmit -p .` без помилок.

## Перевірені відео (тільки офіційні канали)
1. to be: https://www.youtube.com/watch?v=WwKJI5cuIug (Peppa Pig - Official Channel, «Muddy Puddles»), https://www.youtube.com/watch?v=PX1d-R59PaA (Mr Bean Official, Village Fete)
2. to be questions: https://www.youtube.com/watch?v=kt6QEjXa3EA (Peppa Pig Official), https://www.youtube.com/watch?v=_Ot_vJLJ86M (Mr Bean, The Exam Cheat)
3. Present Continuous: https://www.youtube.com/watch?v=gZujYUcY5xc (Mr Bean, At the Swimming Pool), https://www.youtube.com/watch?v=aFgLrWiNHFc (Mr Bean, Christmas Turkey)
4. PC questions: https://www.youtube.com/watch?v=6aK2CKrdjbE (Mr Bean, Chemistry Experiment), https://www.youtube.com/watch?v=jG902yH_POY (Mr Bean, Just Dive Bean)
5. Present Simple: https://www.youtube.com/watch?v=dXPLhE_z57M (Mr Bean, Alarm clock and getting up), https://www.youtube.com/watch?v=Cl2udPfNReg (Classic Mr Bean, Morning Routine)
6. PS negative: https://www.youtube.com/watch?v=QQZjYb5d4NM (Mr Bean, Morning Routine from the movie), https://www.youtube.com/watch?v=_palZkuM1BQ (Classic Mr Bean, Swim School)
7. PS questions: https://www.youtube.com/watch?v=frN3nvhIHUk (Super Simple Songs, Do You Like Broccoli Ice Cream?, подати як іронічну розминку для підлітків), https://www.youtube.com/watch?v=j9b1CNN_rFU (BBC Learning English, Asking Questions)
8. Continuous vs Simple: https://www.youtube.com/watch?v=xFsYrTIndhI (BBC Learning English, Present Simple and Present Continuous), https://www.youtube.com/watch?v=X6LuWwb9whM (BBC Learning English, How to use present tenses)
9. have got: https://www.youtube.com/watch?v=WwKJI5cuIug (Peppa Pig, родина: has got a brother), https://www.youtube.com/watch?v=9LhLjpsstPY (Mr Bean, The Exam: що в нього на парті)
10. was/were: https://www.youtube.com/watch?v=PX1d-R59PaA (Mr Bean, Village Fete: описати з пам’яті), https://www.youtube.com/watch?v=HiRSdr88OUs (Mr Bean Rides the Big One, показати лише уривок)

## Відео для уроків 11-20 (минулі часи і Present Perfect)
Можна повторно використовувати кліпи Mr Bean зі списку вище: учні дивляться і ПЕРЕКАЗУЮТЬ у минулому часі (What did he do? What was he doing when...?). Додатково перевірені:
- https://www.youtube.com/watch?v=PgsG98vByiw (BBC Learning English, The past simple tense, 6 Minute Grammar)
- https://www.youtube.com/watch?v=568a0HDEn7w (Classic Mr Bean, Morning Bean, показати уривок)
- https://www.youtube.com/watch?v=RVonJchNPEA (Mr Bean Official, Back to School Mr. Bean, показати уривок)
Інших посилань НЕ вигадувати.
