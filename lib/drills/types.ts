// Тренажери граматики Murly: теорія + 100 завдань (5 раундів по 20) з поясненням «Чому так?».
// Один файл = одна тема (lib/drills/<slug>.ts). Ці ж дані стають уроком у бібліотеці (lib/drills/index.ts → drillToPlan).

export type DrillQ =
  // вибір: у q рівно один пропуск ___ (або без пропуску, якщо питання «яке речення правильне?»), a = індекс правильного варіанта
  | { k: 'choice'; q: string; options: string[]; a: number; why: string }
  // впиши сам: у q рівно один ___ і підказка в дужках після нього, напр. «She ___ (go) home.»; answers = усі правильні варіанти
  | { k: 'type'; q: string; answers: string[]; why: string };

export type DrillRound = { title: string; questions: DrillQ[] };

export type Drill = {
  slug: string;              // напр. 'past-simple'
  title: string;             // англійською: 'Past Simple + 3 forms'
  uk: string;                // українською: 'Минулий простий час і 3 форми дієслів'
  level: 'A1' | 'A2' | 'B1';
  color: 'lime' | 'sky' | 'mustard' | 'tomato' | 'pink';
  icon: string;              // id іконки зі спрайту
  lead: string;              // 1-2 речення: про що тема
  theory: {
    when: { title: string; example: string; uk: string }[];        // коли вживаємо (3-5)
    forms: { sign: string; text: string; example: string }[];       // + / − / ? (та інші рядки за потреби)
    trap: { title: string; text: string; wrong: string; right: string }[]; // головні пастки (1-3)
    markers: string[];                                              // слова-маркери
    extra?: { title: string; text: string; rows?: string[][] };     // додатковий блок, напр. «Про 3 форми» з таблицею
  };
  rounds: DrillRound[];      // рівно 5 раундів по 20 завдань
};
