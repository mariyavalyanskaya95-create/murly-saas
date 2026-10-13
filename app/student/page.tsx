import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import Icon from '@/components/Icon';
import StudentHome from '@/components/student/StudentHome';
import { getEnrollments } from '@/lib/student-data';

export const dynamic = 'force-dynamic';

export default async function StudentPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const enrollments = userId ? await getEnrollments(userId).catch(() => []) : [];
  const first = user?.firstName || enrollments[0]?.name || '';

  if (!enrollments.length) {
    return (
      <div className="t-page">
        <div className="t-card t-welcome">
          <Icon id="c-cat-sit" className="mu-ic t-welcome__ic" />
          <div>
            <h2>Привіт{first ? `, ${first}` : ''}!</h2>
            <p className="t-muted">Твій кабінет з’явиться, коли вчитель надішле тобі посилання-запрошення. Відкрий його, і тут будуть розклад, словник та ігри.</p>
            <p className="t-muted">А поки можна потренуватися самостійно:</p>
            <div className="t-head__actions" style={{ marginTop: 10 }}>
              <Link href="/irregular-verbs/games" className="mu-btn mu-btn--lime">Ігри з дієсловами</Link>
              <Link href="/grammar" className="mu-btn">Граматика</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <StudentHome enrollments={enrollments} name={first} />;
}
