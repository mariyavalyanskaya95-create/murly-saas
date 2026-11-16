// Бібліотека, пакет 9: розмовні уроки (власні тексти, ідеї структури з планів Марії).
// 1) Small favours, big difference: доброта + Past Perfect, B1, для пари учнів.
// 2) My style, my friends: пробний урок A1 для дівчинки 12 років, перевірка to be.
import type { Plan } from '../lesson';
import { makeHelpers } from './helpers';

const { h, t } = makeHelpers('b9');

export const BATCH_9: Plan[] = [
  // ---------- SMALL FAVOURS + PAST PERFECT ----------
  {
    id: 'lib-small-favours', title: 'Small favours, big difference', level: 'B1', age: 'adults', topic: 'Доброта й маленькі послуги + Past Perfect', color: 'pink', source: 'murly',
    focus: ['Speaking', 'Vocabulary', 'Grammar', 'Reading', 'Listening'],
    aims: 'Говоримо про маленькі послуги й доброту в повсякденному житті\nВивчаємо вирази: do someone a favour, help out, give someone a hand, pay it forward\nВживаємо Past Perfect, щоб розповісти, що сталося раніше\nПропонуємо допомогу і ввічливо відповідаємо на пропозиції',
    duration: 75,
    blocks: [
      h('Small favours, big difference'),
      t('**Інтерактивний урок на одній сторінці з пультом учителя** (переклади, зразки відповідей і навідні питання до кожного блоку): https://murly.com.ua/game-lessons/small-favours.html'),
      t(`**Що в уроці (75-90 хв):**\n1. Warm-up: ten minutes, two favours\n2. Цитата Езопа й обговорення\n3. 10 фраз про доброту\n4. 14 фразових дієслів та ідіом, якими говорять носії\n5. Відео Kindness Boomerang\n6. Past Perfect: правило\n7. Past Perfect workout: 4 вправи як у Мерфі + переклад речень\n8. Читання The coffee that came back\n9. Picture story: історія за фото\n10. Пропозиції допомоги й відповіді\n11. Рольова гра\n12. Розмова: твоя історія доброти\n13. Домашка: 7-day favour challenge`),
    ],
  },

  // ---------- TRIAL A1: MY STYLE, MY FRIENDS (TO BE CHECK) ----------
  {
    id: 'lib-trial-my-style', title: 'My style, my friends: a first lesson', level: 'A1', age: 'teens', topic: 'Пробний урок: стиль, косметика, друзі + to be', color: 'pink', source: 'murly',
    focus: ['Vocabulary', 'Grammar', 'Reading', 'Speaking'],
    aims: 'Знайомимося й говоримо про улюблені речі: одяг, косметику, друзів\nВчимо 14 слів про стиль, косметику й друзів\nПеревіряємо, як учень знає to be (am, is, are)\nЧитаємо короткий профіль і пишемо свій',
    duration: 45,
    blocks: [
      h('My style, my friends: a first lesson'),
      t('**Інтерактивний урок на одній сторінці з пультом учителя** (переклади, зразки відповідей і навідні питання до кожного блоку): https://murly.com.ua/game-lessons/trial-my-style.html'),
      t(`**Що в уроці (45-60 хв):**\n1. This or that? Знайомство\n2. 14 слів про стиль, косметику й друзів з фото\n3. Діагностика am, is, are\n4. Am, is, are workout: 4 вправи + переклад речень\n5. Читання: профіль Lily\n6. Опиши картинку\n7. Розмова про себе\n8. Міні-проєкт: мій профіль`),
    ],
  },
];
