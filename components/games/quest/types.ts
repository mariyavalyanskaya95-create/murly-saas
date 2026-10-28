import type { T } from '@/lib/i18n';

// Завдання квесту: що сказати і на що натиснути. all: треба натиснути всі цілі. set: прапорець після успіху (відкрита шафа тощо)
export type QuestTask = { en: string; uk: string; ru: string; target: string[]; all?: boolean; set?: string };
export type HitProps = { onClick: () => void; className: string; role: 'button'; tabIndex: number; onKeyDown: (e: React.KeyboardEvent) => void };
export type SceneProps = { hit: (id: string) => HitProps; flags: Set<string> };
export type QuestLocation = { id: string; title: T; place: T; level: string; tasks: QuestTask[]; Scene: (p: SceneProps) => JSX.Element; finale: string };
