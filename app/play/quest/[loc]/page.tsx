import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import Kit from '@/components/Kit';
import { LangSwitch } from '@/components/LangProvider';
import QuestPlay from '@/components/games/quest/QuestPlay';
import { QUEST_LIST, isQuest } from '@/lib/quest-list';
import { studentFlags } from '@/lib/student-data';
import { tr } from '@/lib/i18n-server';

export const dynamic = 'force-dynamic';
export function generateMetadata({ params }: { params: { loc: string } }): Metadata {
  const q = QUEST_LIST.find((x) => x.id === params.loc);
  return { title: `${q ? q.title.en : 'Quest'}: Find it, Bubbles! | Murly`, description: 'Квест англійською для дітей 6–11: слухай котика Бульбашку і знаходь предмети. A1–A2.' };
}

export default async function QuestLocPage({ params, searchParams }: { params: { loc: string }; searchParams: { hw?: string } }) {
  if (!isQuest(params.loc)) notFound();
  const t = tr();
  const { userId } = await auth();
  const f = userId ? await studentFlags(userId).catch(() => ({ adult: false, nmt: false, any: false })) : { adult: false, nmt: false, any: false };
  return (
    <div className="sq-page">
      <header className="sq-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <Link href={searchParams.hw ? '/student#homework' : '/play/quest'} className="t-back">← {searchParams.hw ? t({ uk: 'До домашки', ru: 'К домашке', en: 'Homework' }) : t({ uk: 'Усі локації', ru: 'Все локации', en: 'All places' })}</Link>
        <div style={{ marginLeft: 'auto' }}><LangSwitch /></div>
      </header>
      <QuestPlay id={params.loc} hw={searchParams.hw} adult={f.adult} />
    </div>
  );
}
