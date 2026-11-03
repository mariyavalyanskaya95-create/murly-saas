// Легка картка уроку для списку: бібліотеку цілком у браузер не вантажимо, сервер передає лише це
import type { Plan } from './lesson';

export type PlanCardData = Pick<Plan, 'id' | 'title' | 'level' | 'age' | 'topic' | 'color' | 'focus' | 'duration'> & {
  n: number;
  about?: string; // коротко, що буде на уроці (перші пункти aims)
  words?: number; tasks?: number; has?: string[]; // що всередині: слова, завдання, відео, аудіо, говоріння, гра
};
export const toCard = (p: Plan): PlanCardData => {
  let words = 0, tasks = 0; const has = new Set<string>();
  p.blocks.forEach((b) => {
    if (b.type === 'vocab') words += b.words.length;
    if (b.type === 'exercise') tasks += b.sections.reduce((a, s) => a + s.tasks.length, 0);
    if (b.type === 'video' || b.type === 'audio' || b.type === 'game' || b.type === 'speaking') has.add(b.type);
  });
  const aims = (p.aims ?? '').split('\n').map((x) => x.trim()).filter(Boolean);
  const about = aims.slice(0, 3).map((a) => a.replace(/[.;]$/, '')).join('. ') + (aims.length ? '.' : '');
  return { id: p.id, title: p.title, level: p.level, age: p.age, topic: p.topic, color: p.color, focus: p.focus, duration: p.duration, n: p.blocks.length, about: about || undefined, words, tasks, has: [...has] };
};
