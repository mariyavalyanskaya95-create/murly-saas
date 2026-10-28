import type { T } from '@/lib/i18n';

// Завдання квесту: що сказати і на що натиснути.
// all: треба натиснути всі цілі. set: прапорець після успіху (відкрита шафа тощо).
// take: предмет можна взяти. Після знаходження ціль зникає (летить у сумку Бульбашки), а в сумці з’являється ця назва англійською.
// Меблі, крани, двері, персонажі не беруться: для них take не ставимо.
export type QuestTask = { en: string; uk: string; ru: string; target: string[]; all?: boolean; set?: string; take?: string };
export type HitProps = { onClick: () => void; className: string; role: 'button'; tabIndex: number; onKeyDown: (e: React.KeyboardEvent) => void; 'aria-label'?: string };
export type SceneProps = { hit: (id: string) => HitProps; flags: Set<string> };
// topics: що тренує локація (прийменники, лексика, граматика). Показується на сторінці і шукається пошуком по сайту.
export type QuestLocation = { id: string; title: T; place: T; level: string; tasks: QuestTask[]; Scene: (p: SceneProps) => JSX.Element; finale: string; topics: T[] };
