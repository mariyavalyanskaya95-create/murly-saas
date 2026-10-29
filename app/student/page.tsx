import { auth, currentUser } from '@clerk/nextjs/server';
import StudentHome from '@/components/student/StudentHome';
import JoinCode from '@/components/JoinCode';
import { tr } from '@/lib/i18n-server';
import { getEnrollments } from '@/lib/student-data';
import Kit from '@/components/Kit';
import MockResults from '@/components/mock/MockResults';
import { MOCKS } from '@/lib/mock';
import ProfileCard from '@/components/ProfileCard';
import SelfStart from '@/components/student/SelfStart';

export const dynamic = 'force-dynamic';

export default async function StudentPage() {
  const t = tr();
  const { userId } = await auth();
  const user = await currentUser();
  const enrollments = userId ? await getEnrollments(userId, t.lang).catch(() => []) : [];
  const first = String((user?.unsafeMetadata as { nick?: string } | undefined)?.nick || '') || user?.firstName || enrollments[0]?.name || '';

  const track = (user?.unsafeMetadata as { track?: string } | undefined)?.track;
  if (!enrollments.length) {
    return (
      <div className="t-page">
        <div className="t-head"><h1>{t({ uk: 'Привіт', ru: 'Привет', en: 'Hi' })}{first ? `, ${first}` : ''}!</h1></div>
        {/* учень без учителя: вибір шляху і план на сьогодні */}
        <SelfStart />
        <div className="t-card t-welcome">
          <Kit id="il-cat-laptop" className="t-welcome__kit" />
          <div>
            <h2>{t({ uk: 'Є код від учителя?', ru: 'Есть код от учителя?', en: 'Have a teacher code?' })}</h2>
            <p className="t-muted">{t({ uk: 'Введи його, і тут з’являться розклад, домашка і слова від учителя.', ru: 'Введи его, и здесь появятся расписание, домашка и слова от учителя.', en: 'Enter it and your schedule, homework and words from your teacher will appear here.' })}</p>
            <div style={{ margin: '12px 0 0' }}><JoinCode /></div>
          </div>
        </div>
        {track === 'nmt' && <MockResults all={MOCKS.map((m) => m.id)} />}
        <ProfileCard />
      </div>
    );
  }

  return (
    <>
      <StudentHome enrollments={enrollments} name={first} />
      {(enrollments.some((x) => x.nmt) || track === 'nmt') && <div className="t-page" style={{ paddingTop: 0 }}><MockResults all={MOCKS.map((m) => m.id)} /></div>}
      <div className="t-page" style={{ paddingTop: 0 }}><ProfileCard /></div>
    </>
  );
}
