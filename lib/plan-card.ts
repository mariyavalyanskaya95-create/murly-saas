// Легка картка уроку для списку: бібліотеку цілком у браузер не вантажимо, сервер передає лише це
import type { Plan } from './lesson';

export type PlanCardData = Pick<Plan, 'id' | 'title' | 'level' | 'age' | 'topic' | 'color' | 'focus' | 'duration'> & { n: number };
export const toCard = (p: Plan): PlanCardData => ({ id: p.id, title: p.title, level: p.level, age: p.age, topic: p.topic, color: p.color, focus: p.focus, duration: p.duration, n: p.blocks.length });
