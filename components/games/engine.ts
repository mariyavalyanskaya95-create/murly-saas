// Ігровий движок Murly: один формат даних для всіх шаблонів ігор.
// Учитель (або Murly) вводить пари один раз, а шаблон обирається окремо.
export type GameItem = {
  q: string; // що показуємо (слово, переклад, питання)
  a: string; // правильна відповідь; варіанти через " / " вважаються рівноправними
  hint?: string;
};

export type GameSet = {
  id: string;
  title: string;
  prompt: string; // інструкція над грою, напр. "Обери Past Simple"
  items: GameItem[];
};

export type GameTemplate = 'quiz' | 'match' | 'anagram' | 'cards';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

// Перший варіант відповіді ("dreamt / dreamed" -> "dreamt")
export function mainAnswer(a: string): string {
  return a.split(' / ')[0].trim();
}

// 3 неправильні варіанти, не схожі на правильну відповідь
export function distractors(items: GameItem[], correct: GameItem, n = 3): string[] {
  const pool = Array.from(new Set(items.map((i) => i.a))).filter((a) => a !== correct.a);
  return pick(pool, n);
}
