// Вправи для домашки: вчитель пише завдання звичайним текстом, ми розбираємо їх у поля з автоперевіркою.
// Формати рядків:
//  gap       "She [goes] (go) to school."           у [ ] правильна відповідь, варіанти через /
//  choice    "I {have lived|lived|live} here."      перший варіант у { } правильний
//  translate "Я люблю каву = I love coffee / I like coffee"
//  open      будь-який рядок, відповідь перевіряє вчитель

import type { T } from './i18n';

export type SectionType = 'gap' | 'choice' | 'truefalse' | 'match' | 'sort' | 'translate' | 'open' | 'scale' | 'voice';
export type Part = { t: 'text'; v: string } | { t: 'gap'; answers: string[] } | { t: 'choice'; options: string[] };
export type Task = { parts?: Part[]; prompt?: string; answers?: string[] };
export type Section = { type: SectionType; instruction: string; tasks: Task[] };
export type Answers = Record<string, string>; // ключ "секція.завдання.слот"
export type Overrides = Record<string, boolean>; // відповіді, які вчитель зарахував вручну

// Назви, підказки і стандартні інструкції трьома мовами
export const SECTION_TYPES: { id: SectionType; label: T; instruction: T; hint: T; example: T }[] = [
  { id: 'gap', label: { uk: 'Розкрий дужки / встав слово', ru: 'Раскрой скобки / вставь слово', en: 'Open the brackets / fill the gap' },
    instruction: { uk: 'Розкрий дужки.', ru: 'Раскрой скобки.', en: 'Put the verbs in brackets into the correct form.' },
    hint: { uk: 'Правильну відповідь пиши в [квадратних дужках]. Кілька правильних варіантів через /.', ru: 'Правильный ответ пиши в [квадратных скобках]. Несколько правильных вариантов через /.', en: 'Write the correct answer in [square brackets]. Several correct answers go with /.' },
    example: { uk: 'She [goes] (go) to school every day.\nThey [didn’t come/did not come] (not come) yesterday.' } },
  { id: 'choice', label: { uk: 'Обери правильний варіант', ru: 'Выбери правильный вариант', en: 'Choose the right option' },
    instruction: { uk: 'Обери правильний варіант.', ru: 'Выбери правильный вариант.', en: 'Choose the correct option.' },
    hint: { uk: 'Варіанти у {фігурних дужках} через |. Перший варіант правильний, учень побачить їх перемішаними.', ru: 'Варианты в {фигурных скобках} через |. Первый вариант правильный, ученик увидит их перемешанными.', en: 'Options go in {curly brackets} with |. The first option is correct. The student will see them shuffled.' },
    example: { uk: 'I {have lived|lived|live} here since 2020.\nShe is {taller|more tall|tallest} than me.' } },
  { id: 'truefalse', label: { uk: 'True / False' }, instruction: { uk: 'True or False?' },
    hint: { uk: 'Твердження = True або False (можна T / F).', ru: 'Утверждение = True или False (можно T / F).', en: 'Statement = True or False (T / F is fine too).' },
    example: { uk: 'Tom gets up at 7 o’clock. = True\nTom goes to bed at 10. = False' } },
  { id: 'match', label: { uk: 'Знайди пару', ru: 'Найди пару', en: 'Match the pairs' }, instruction: { uk: 'Match the words with their meanings.' },
    hint: { uk: 'Ліва частина = права частина. Учень обирає пару зі списку, праві частини перемішуються.', ru: 'Левая часть = правая часть. Ученик выбирает пару из списка, правые части перемешиваются.', en: 'Left part = right part. The student picks a pair from a list, the right parts are shuffled.' },
    example: { uk: 'reliable = you can trust them\nawkward = a bit embarrassing\nto give up = to stop trying' } },
  { id: 'sort', label: { uk: 'Розклади по групах', ru: 'Разложи по группам', en: 'Sort into groups' }, instruction: { uk: 'Put the phrases into the right group.' },
    hint: { uk: 'Група: фраза, фраза. Кожна група з нового рядка. Якщо у фразах є коми, розділяй їх крапкою з комою ;', ru: 'Группа: фраза, фраза. Каждая группа с новой строки. Если во фразах есть запятые, разделяй их точкой с запятой ;', en: 'Group: phrase, phrase. Each group on a new line. If the phrases have commas, separate them with a semicolon ;' },
    example: { uk: 'Inviting: Would you like to come?; Are you free on Friday?\nAccepting: I’d love to!; Sounds great!\nDeclining: Sorry, I can’t make it.; Maybe next time.' } },
  { id: 'scale', label: { uk: 'Шкала думки', ru: 'Шкала мнения', en: 'Opinion scale' }, instruction: { uk: 'How much do you agree?' },
    hint: { uk: 'Кожен рядок твердження. Учень обирає від «Strongly disagree» до «Strongly agree». Без правильної відповіді, для обговорення.', ru: 'Каждая строка утверждение. Ученик выбирает от «Strongly disagree» до «Strongly agree». Без правильного ответа, для обсуждения.', en: 'Each line is a statement. The student picks from "Strongly disagree" to "Strongly agree". No right answer, it is for discussion.' },
    example: { uk: 'Homework should be optional.\nSocial media makes people less happy.' } },
  { id: 'voice', label: { uk: 'Голосова відповідь', ru: 'Голосовой ответ', en: 'Voice answer' }, instruction: { uk: 'Record your answer.' },
    hint: { uk: 'Кожен рядок питання. Учень записує відповідь голосом, ти слухаєш у перевірці.', ru: 'Каждая строка вопрос. Ученик записывает ответ голосом, ты слушаешь при проверке.', en: 'Each line is a question. The student records a voice answer, you listen to it when checking.' },
    example: { uk: 'Describe your favourite place in your town.\nWhat did you do last weekend?' } },
  { id: 'translate', label: { uk: 'Переклад', ru: 'Перевод', en: 'Translation' },
    instruction: { uk: 'Переклади англійською.', ru: 'Переведи на английский.', en: 'Translate into English.' },
    hint: { uk: 'Речення = правильний переклад. Кілька варіантів через /.', ru: 'Предложение = правильный перевод. Несколько вариантов через /.', en: 'Sentence = correct translation. Several options go with /.' },
    example: { uk: 'Я люблю каву = I love coffee / I like coffee\nВона вже пішла = She has already left', ru: 'Я люблю кофе = I love coffee / I like coffee\nОна уже ушла = She has already left' } },
  { id: 'open', label: { uk: 'Відкрите питання', ru: 'Открытый вопрос', en: 'Open question' },
    instruction: { uk: 'Дай відповідь на питання.', ru: 'Ответь на вопросы.', en: 'Answer the questions.' },
    hint: { uk: 'Кожен рядок окреме питання. Відповідь перевіряєш ти.', ru: 'Каждая строка отдельный вопрос. Ответ проверяешь ты.', en: 'Each line is a separate question. You check the answer yourself.' },
    example: { uk: 'What did you do last weekend?\nDescribe your best friend in 3 sentences.' } },
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
  if (type === 'open' || type === 'scale' || type === 'voice') return { prompt: l };
  if (type === 'truefalse') {
    const i = l.lastIndexOf('=');
    const st = (i < 0 ? l : l.slice(0, i)).trim();
    const v = (i < 0 ? '' : l.slice(i + 1)).trim().toLowerCase();
    const isFalse = v.startsWith('f') || v === '-' || v.startsWith('н');
    return { parts: [{ t: 'text', v: st + ' ' }, { t: 'choice', options: isFalse ? ['False', 'True'] : ['True', 'False'] }] };
  }
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
  const lines = text.split('\n').map((x) => x.trim()).filter(Boolean);
  if (type === 'match') {
    const pairs = lines.map((l) => { const i = l.indexOf('='); return i < 0 ? null : [l.slice(0, i).trim(), l.slice(i + 1).trim()] as [string, string]; }).filter((x): x is [string, string] => !!x && !!x[0] && !!x[1]);
    const rights = pairs.map((p) => p[1]);
    return { type, instruction: instruction.trim(), tasks: pairs.map(([left, right]) => ({ parts: [{ t: 'text', v: `${left} ` }, { t: 'choice', options: [right, ...rights.filter((r) => r !== right)] }] })) };
  }
  if (type === 'sort') {
    const groups = lines.map((l) => { const i = l.indexOf(':'); return i < 0 ? null : { cat: l.slice(0, i).trim(), items: l.slice(i + 1).split(l.includes(';') ? ';' : ',').map((x) => x.trim()).filter(Boolean) }; }).filter((g): g is { cat: string; items: string[] } => !!g && !!g.cat && g.items.length > 0);
    const cats = groups.map((g) => g.cat);
    // перемішуємо фрази між групами, щоб відповідь не була очевидною
    const flat: { item: string; cat: string }[] = [];
    const max = Math.max(0, ...groups.map((g) => g.items.length));
    for (let k = 0; k < max; k++) groups.forEach((g) => { if (g.items[k]) flat.push({ item: g.items[k], cat: g.cat }); });
    return { type, instruction: instruction.trim(), tasks: flat.map(({ item, cat }) => ({ parts: [{ t: 'text', v: `${item} ` }, { t: 'choice', options: [cat, ...cats.filter((c) => c !== cat)] }] })) };
  }
  return { type, instruction: instruction.trim(), tasks: lines.map((x) => parseLine(type, x)).filter((x): x is Task => !!x) };
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
  const label = (t: Task) => (t.parts?.[0]?.t === 'text' ? t.parts[0].v.trim() : '');
  const first = (t: Task) => { const c = t.parts?.find((p) => p.t === 'choice'); return c && c.t === 'choice' ? c.options[0] : ''; };
  if (s.type === 'truefalse') return s.tasks.map((t) => `${label(t)} = ${first(t)}`).join('\n');
  if (s.type === 'match') return s.tasks.map((t) => `${label(t)} = ${first(t)}`).join('\n');
  if (s.type === 'sort') {
    const g = new Map<string, string[]>();
    s.tasks.forEach((t) => { const c = first(t); g.set(c, [...(g.get(c) ?? []), label(t)]); });
    return Array.from(g.entries()).map(([c, items]) => `${c}: ${items.join(items.some((x) => x.includes(',')) ? '; ' : ', ')}`).join('\n');
  }
  return s.tasks.map((t) => {
    if (s.type === 'translate') return `${t.prompt ?? ''}${t.answers?.length ? ` = ${t.answers.join(' / ')}` : ''}`;
    if (s.type === 'open' || s.type === 'scale' || s.type === 'voice') return t.prompt ?? '';
    return (t.parts ?? []).map((p) => (p.t === 'text' ? p.v : p.t === 'gap' ? `[${p.answers.join('/')}]` : `{${p.options.join('|')}}`)).join('');
  }).join('\n');
}

export const SCALE = ['Strongly disagree', 'Disagree', 'Not sure', 'Agree', 'Strongly agree'];
