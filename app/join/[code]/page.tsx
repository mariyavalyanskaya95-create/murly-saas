import Link from 'next/link';
import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import { claimInvite, inviteInfo } from '@/lib/student-data';

export const metadata: Metadata = { title: 'Запрошення в Murly', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

function Box({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-send" />Запрошення</span>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="mu-hero__cta">{children}</div>
        </div>
      </section>
    </>
  );
}

export default async function JoinPage({ params }: { params: { code: string } }) {
  const code = params.code.toLowerCase();
  const info = await inviteInfo(code);
  if (!info) return <Box title="Посилання не працює" text="Можливо, в ньому помилка або вчитель створив нове. Попроси надіслати посилання ще раз." />;

  const { userId } = await auth();
  const back = `/join/${code}`;
  const teacher = info.teacherName ? `${info.teacherName} запрошує` : 'Тебе запрошують';

  if (!userId) {
    return (
      <Box title={`${teacher} тебе в Murly`} text={`Тут буде твій розклад занять, словник від учителя та ігри з твоїми словами. Створи акаунт або увійди, щоб приєднатися як ${info.studentName}.`}>
        <Link href={`/sign-up?redirect_url=${encodeURIComponent(back)}&role=student`} className="mu-btn mu-btn--lime mu-btn--lg">
          Створити акаунт<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
        </Link>
        <Link href={`/sign-in?redirect_url=${encodeURIComponent(back)}`} className="mu-btn mu-btn--lg">У мене вже є акаунт</Link>
      </Box>
    );
  }

  const res = await claimInvite(code, userId);
  if (res === 'ok') redirect('/student');
  if (res === 'own') return <Box title="Це твоє запрошення" text="Це посилання створене з твого акаунта вчителя. Надішли його учню, щоб він приєднався."><Link href="/teacher/students" className="mu-btn mu-btn--lg">До учнів</Link></Box>;
  if (res === 'taken') return <Box title="Запрошення вже використане" text="До цієї картки учня вже приєднався інший акаунт. Попроси вчителя створити нове посилання." />;
  return <Box title="Щось пішло не так" text="Спробуй ще раз трохи пізніше." />;
}
