'use client';
import QuestGame from './QuestGame';
import { QUESTS, getQuest } from './index';
import { useT } from '@/components/LangProvider';

export default function QuestPlay({ id, hw, adult }: { id: string; hw?: string; adult?: boolean }) {
  const t = useT();
  const loc = getQuest(id);
  if (!loc) return null;
  const i = QUESTS.indexOf(loc);
  const n = QUESTS[i + 1];
  return <QuestGame key={loc.id} loc={loc} hw={hw} adult={adult} next={n ? { id: n.id, title: t(n.title) } : undefined} />;
}
