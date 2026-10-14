// Вправи для домашки: вчитель пише завдання звичайним текстом, ми розбираємо їх у поля з автоперевіркою.
// Формати рядків:
//  gap       "She [goes] (go) to school."           у [ ] правильна відповідь, варіанти через /
//  choice    "I {have lived|lived|live} here."      перший варіант у { } правильний
//  translate "Я люблю каву = I love coffee / I like coffee"
//  open      будь-який рядок, відповідь перевіряє вчитель

export type SectionType = 'gap' | 'choice' | 'translate' | 'open';
export type Part = { t: 'text'; v: string } | { t: 'gap'; answers: string[] } | { t: 'choice'; options: string[] };
export type Task = { parts?: Part[]; prompt?: string; answers?: string[] };
export type Section = { type: SectionType; instruction: string; tasks: Task[] };
export type Answers = Record<string, string>; // ключ "секція.завдання.слот"
export type Overrides = Record<string, boolean>; // відповіді, які вчитель зарахував вручну

export const SECTION_TYPES: { id: SectionType; label: string; instruction: string; hint: string; example: string }[] = [
  { id: 'gap', label: 'Розкрий дужки / встав слово', instruction: 'Розкрий дужки.', hint: 'Правильну відповідь пиши в [квадратних дужках]. Кілька правильних варіантів через /.', example: 'She [goes] (go) to school every day.\nThey [didn’t come/did not come] (not come) yesterday.' },
  { id: 'choice', label: 'Обери правильний варіант', instruction: 'Обери правильний варіант.', hint: 'Варіанти у {фігурних дужках} через |. Перший варіант правильний, учень побачить їх перемішаними.', example: 'I {have lived|lived|live} here since 2020.\nShe is {taller|more tall|tallest} than me.' },
  { id: 'translate', label: 'Переклад', instruction: 'Переклади англійською.', hint: 'Речення = правильний переклад. Кілька варіантів через /.', example: 'Я люблю каву = I love coffee / I like coffee\nВона вже пішла = She has already left' },
  { id: 'open', label: 'Відкрите питання', instruction: 'Дай відповідь на питання.', hint: 'Кожен рядок окреме питання. Відповідь перевіряєш ти.', example: 'What did you do last weekend?\nDescribe your best friend in 3 sentences.' },
];

const splitAlts = (s: string, sep: RegExp) => s.split(sep).map((x) => x.trim()).filter(Boolean);

export function parseLine(type: SectionType, line: string): Task | null {
  const l = line.trim();
  if (!l) return null;
  if (type === 'translate') {
    const i = l.indexOf('=');
    if (i < 0) return { prompt: l, answers: [] };
    return { prompt: l.slice(0, i).trim(), answers: splitAlts(l.slice(i + 1), /\s*\/\s*/) };
  }
  if (type === 'open') return { prompt: l };
  const re = type === 'gap' ? /\[([^\]]+)\]/g : /\{([^}]+)\}/g;
  const parts: Part[] = [];
  let last = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(l))) {
    if (m.index > last) parts.push({ t: 'text', v: l.slice(last, m.index) });
    if (type === 'gap') parts.push({ t: 'gap', answers: splitAlts(m[1], /\//) });
    else parts.push({ t: 'choice', options: splitAlts(m[1], /\|/) });
    last = m.index + m[0].length;
  }
  if (last < l.length) parts.push({ t: 'text', v: l.slice(last) });
  return { parts };
}

export function parseSection(type: SectionType, instruction: string, text: string): Section {
  return { type, instruction: instruction.trim(), tasks: text.split('\n').map((x) => parseLine(type, x)).filter((x): x is Task => !!x) };
}

// Скільки балів можна набрати (відкриті питання не рахуються)
export function maxScore(sections: Section[]) {
  let n = 0;
  sections.forEach((s) => s.tasks.forEach((t) => {
    if (s.type === 'translate') n += 1;
    else if (t.parts) n += t.parts.filter((p) => p.t !== 'text').length;
  }));
  return n;
}

export const norm = (s: string) => s.toLowerCase().replace(/[’‘`ʼ]/g, "'").replace(/\s+/g, ' ').replace(/[.!?,;:\s]+$/g, '').trim();
export const isRight = (given: string | undefined, answers: string[]) => !!given && answers.some((a) => norm(a) === norm(given));

// Перевірка: повертає бали і позначки по кожному слоту
export function grade(sections: Section[], answers: Answers, overrides: Record<string, boolean> = {}) {
  let score = 0;
  const marks: Record<string, boolean> = {};
  sections.forEach((s, si) => s.tasks.forEach((t, ti) => {
    if (s.type === 'translate') {
      const k = `${si}.${ti}.0`;
      marks[k] = isRight(answers[k], t.answers ?? []) || !!overrides[k];
      if (marks[k]) score++;
    } else if (t.parts) {
      t.parts.forEach((p, pi) => {
        if (p.t === 'text') return;
        const k = `${si}.${ti}.${pi}`;
        marks[k] = (p.t === 'gap' ? isRight(answers[k], p.answers) : answers[k] === p.options[0]) || !!overrides[k];
        if (marks[k]) score++;
      });
    }
  }));
  return { score, total: maxScore(sections), marks };
}

// Зворотне перетворення: секція → текст для редактора
export function sectionToText(s: Section): string {
  return s.tasks.map((t) => {
    if (s.type === 'translate') return `${t.prompt ?? ''}${t.answers?.length ? ` = ${t.answers.join(' / ')}` : ''}`;
    if (s.type === 'open') return t.prompt ?? '';
    return (t.parts ?? []).map((p) => (p.t === 'text' ? p.v : p.t === 'gap' ? `[${p.answers.join('/')}]` : `{${p.options.join('|')}}`)).join('');
  }).join('\n');
}
