// «Earn coins»: 5 коротких завдань за темою, яку учень проходив з учителем (слова, домашка, уроки бібліотеки).
// Питання будуємо з даних, які вже є на платформі: слова з блоків vocab і завдання вправ (choice / gap).
import type { Section, Part } from './exercise';
import type { Block } from './lesson';

export type QuizQ = { kind: 'choice' | 'type'; prompt: string; say?: string; options?: string[]; answers: string[] };
export type Pair = { en: string; uk: string };

const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const uniqBy = <T,>(a: T[], k: (x: T) => string) => { const s = new Set<string>(); return a.filter((x) => { const v = k(x).toLowerCase(); if (s.has(v)) return false; s.add(v); return true; }); };

export function fromBlocks(blocks: Block[]) {
  const pairs: Pair[] = []; const sections: Section[] = [];
  blocks.forEach((b) => { if (b.type === 'vocab') pairs.push(...b.words); if (b.type === 'exercise') sections.push(...b.sections); });
  return { pairs, sections };
}

// завдання вправи з одним пропуском або вибором → питання
function fromTask(parts: Part[]): QuizQ | null {
  const inter = parts.filter((p) => p.t !== 'text');
  if (inter.length !== 1) return null;
  const text = parts.map((p) => (p.t === 'text' ? p.v : '___')).join('').replace(/\s+/g, ' ').trim();
  if (text.length > 140 || /[а-яіїєґ]/i.test(text.replace(/\(.*?\)/g, ''))) return null;
  // питання, які потребують тексту, відео чи аудіо уроку, тут не підходять
  if (/\b(text|story|video|dialogue|listen|cartoon|article|paragraph|speaker|says?|said)\b/i.test(text)) return null;
  const p = inter[0];
  if (p.t === 'choice') {
    if (p.options.length < 2 || p.options.some((o) => o.length > 30)) return null;
    return { kind: 'choice', prompt: text, options: shuffle(p.options), answers: [p.options[0]] };
  }
  if (p.t === 'gap') return { kind: 'type', prompt: text, answers: p.answers };
  return null;
}

export function buildQuiz(pairsIn: Pair[], sections: Section[], extraWords: string[] = []): QuizQ[] {
  const pairs = shuffle(uniqBy(pairsIn.filter((p) => p.en && p.uk && p.en.length < 40), (p) => p.en));
  const grammar = shuffle(sections.filter((s) => s.type === 'gap' || s.type === 'choice').flatMap((s) => s.tasks.map((t) => (t.parts ? fromTask(t.parts) : null)).filter(Boolean) as QuizQ[]));
  const out: QuizQ[] = [];
  const g = Math.min(grammar.length, pairs.length >= 3 ? 2 : 5);
  out.push(...grammar.slice(0, g));
  const pool = [...new Set([...pairs.map((p) => p.en), ...extraWords])];
  let i = 0;
  while (out.length < 5 && i < pairs.length) {
    const p = pairs[i]; const kind = i % 3;
    // хибні варіанти спершу з цієї ж теми, а з інших уроків лише якщо слів замало
    const same = shuffle(pairs.map((x) => x.en).filter((w) => w.toLowerCase() !== p.en.toLowerCase()));
    const wrong = [...same, ...shuffle(pool.filter((w) => w.toLowerCase() !== p.en.toLowerCase() && !same.includes(w)))].slice(0, 3);
    if (kind === 0 && wrong.length >= 2) out.push({ kind: 'choice', prompt: `Choose the English word: «${p.uk}»`, options: shuffle([p.en, ...wrong]), answers: [p.en], say: p.en });
    else if (kind === 1) out.push({ kind: 'type', prompt: `Write in English: «${p.uk}»`, answers: [p.en], say: p.en });
    else {
      const wrongUk = shuffle(pairs.filter((x) => x.uk !== p.uk)).slice(0, 3).map((x) => x.uk);
      if (wrongUk.length >= 2) out.push({ kind: 'choice', prompt: `What does “${p.en}” mean?`, options: shuffle([p.uk, ...wrongUk]), answers: [p.uk], say: p.en });
      else out.push({ kind: 'type', prompt: `Write in English: «${p.uk}»`, answers: [p.en], say: p.en });
    }
    i++;
  }
  if (out.length < 5) out.push(...grammar.slice(g, g + 5 - out.length));
  return shuffle(out).slice(0, 5);
}

const norm = (s: string) => s.toLowerCase().replace(/[’`]/g, "'").replace(/[.!?,]/g, '').replace(/^(a|an|the|to)\s+/, '').replace(/\s+/g, ' ').trim();
export const isRightAnswer = (q: QuizQ, given: string) => q.answers.some((a) => norm(a) === norm(given ?? ''));
