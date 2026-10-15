// Спільні хелпери для уроків бібліотеки. Кожен файл уроків створює свій набір з унікальним префіксом id блоків.
import { parseSection, type SectionType } from '../exercise';
import type { Block } from '../lesson';

export function makeHelpers(prefix: string) {
  let n = 0;
  const id = () => `${prefix}-${++n}`;
  return {
    h: (text: string): Block => ({ id: id(), type: 'heading', text }),
    t: (text: string): Block => ({ id: id(), type: 'text', text }),
    tip: (text: string): Block => ({ id: id(), type: 'tip', text }),
    note: (text: string): Block => ({ id: id(), type: 'note', text }),
    audio: (title: string, script: string): Block => ({ id: id(), type: 'audio', title, script: script.trim() }),
    video: (url: string, task: string, caption?: string): Block => ({ id: id(), type: 'video', url, task, caption }),
    vocab: (pairs: string): Block => ({
      id: id(), type: 'vocab',
      words: pairs.trim().split('\n').map((l) => { const [en, uk] = l.split('=').map((x) => x.trim()); return { en, uk }; }),
    }),
    ex: (...parts: [SectionType, string, string][]): Block => ({
      id: id(), type: 'exercise', sections: parts.map(([type, instr, text]) => parseSection(type, instr, text.trim())),
    }),
    talk: (q: string): Block => ({ id: id(), type: 'speaking', questions: q.trim().split('\n').map((x) => x.trim()) }),
  };
}
