import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import Kit from '@/components/Kit';
import { LangSwitch } from '@/components/LangProvider';
import SeaQuest from '@/components/games/SeaQuest';
import { studentFlags } from '@/lib/student-data';
import { tr } from '@/lib/i18n-server';

export const metadata: Metadata = { title: 'Under the sea: квест англійською | Murly', description: 'Підводний квест з котиком: слухай англійською і знаходь предмети. A1–A2, для дітей 6–11.' };
export const dynamic = 'force-dynamic';

export default async function SeaPage({ searchParams }: { searchParams: { hw?: string } }) {
  const t = tr();
  const { userId } = await auth();
  const f = userId ? await studentFlags(userId).catch(() => ({ adult: false, nmt: false, any: false })) : { adult: false, nmt: false, any: false };
  return (
    <div className="sq-page">
      <header className="sq-top">
        <Link href="/" className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</Link>
        <Link href={searchParams.hw ? '/student#homework' : '/games'} className="t-back">← {searchParams.hw ? t({ uk: 'До домашки', ru: 'К домашке', en: 'Homework' }) : t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link>
        <div style={{ marginLeft: 'auto' }}><LangSwitch /></div>
      </header>
      <SeaQuest hw={searchParams.hw} adult={f.adult} />
    </div>
  );
}
