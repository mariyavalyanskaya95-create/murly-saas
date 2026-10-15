import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import Icon from '@/components/Icon';
import StudentHome from '@/components/student/StudentHome';
import JoinCode from '@/components/JoinCode';
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
            <p className="t-muted">Тут з’являться твій розклад, домашка і слова від учителя. Учитель дав код або посилання? Введи його:</p>
            <div style={{ margin: '12px 0 18px' }}><JoinCode /></div>
            <p className="t-muted">А поки можна вчитися самому:</p>
            <div className="t-head__actions" style={{ marginTop: 10, flexWrap: 'wrap' }}>
              <Link href="/grammar" className="mu-btn mu-btn--lime">Граматика</Link>
              <Link href="/irregular-verbs/games" className="mu-btn">Ігри з дієсловами</Link>
              <Link href="/practice" className="mu-btn">Слухати і читати</Link>
              <Link href="/play/town" className="mu-btn">Murly Town</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <StudentHome enrollments={enrollments} name={first} />;
}
