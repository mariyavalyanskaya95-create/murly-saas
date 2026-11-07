// Матеріали для друку (міні-продукти). Інструкції українською й російською, англійський контент англійською.
export type L2 = { uk: string; ru: string };
export type Block =
  | { h: L2 | string }                               // підзаголовок
  | { p: L2 | string }                               // абзац
  | { list: (L2 | string)[] }                        // маркований список
  | { check: (L2 | string)[] }                       // чек-лист з квадратиками для галочок
  | { table: { head: (L2 | string)[]; rows: (L2 | string)[][] } }
  | { cards: { front: string; back: L2 | string }[] } // картки для вирізання (лицьова англ., зворот переклад/пояснення)
  | { tasks: { title: L2 | string; items: string[] } } // вправа: пункти з ___ для відповіді
  | { answers: { title: L2 | string; items: string[] } } // ключі (друкуються в кінці, окремо)
  | { lines: number }                                 // порожні рядки для письма
  | { tip: L2 | string }                              // рамка-порада
  | { pagebreak: true };
export type PrintDoc = { id: string; title: L2; subtitle?: L2; level?: string; blocks: Block[] };
