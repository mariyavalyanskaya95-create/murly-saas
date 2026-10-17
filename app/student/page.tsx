import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import Icon from '@/components/Icon';
import StudentHome from '@/components/student/StudentHome';
import JoinCode from '@/components/JoinCode';
import { tr } from '@/lib/i18n-server';
import { getEnrollments } from '@/lib/student-data';
import Kit from '@/components/Kit';
import MockResults from '@/components/mock/MockResults';
import { MOCKS } from '@/lib/mock';

export const dynamic = 'force-dynamic';

export default async function StudentPage() {
  const t = tr();
  const { userId } = await auth();
  const user = await currentUser();
  const enrollments = userId ? await getEnrollments(userId).catch(() => []) : [];
  const first = user?.firstName || enrollments[0]?.name || '';

  if (!enrollments.length) {
    return (
      <div className="t-page">
        <div className="t-card t-welcome">
          <Kit id="il-cat-laptop" className="t-welcome__kit" />
          <div>
            <h2>{t({ uk: 'Привіт', ru: 'Привет', en: 'Hi' })}{first ? `, ${first}` : ''}!</h2>
            <p className="t-muted">{t({ uk: 'Тут з’являться твій розклад, домашка і слова від учителя. Учитель дав код або посилання? Введи його:', ru: 'Здесь появятся твоё расписание, домашка и слова от учителя. Учитель дал код или ссылку? Введи его:', en: 'Your schedule, homework and words from your teacher will appear here. Got a code or link from your teacher? Enter it:' })}</p>
            <div style={{ margin: '12px 0 18px' }}><JoinCode /></div>
            <p className="t-muted">{t({ uk: 'А поки можна вчитися самому:', ru: 'А пока можно учиться самому:', en: 'Meanwhile, you can learn on your own:' })}</p>
            <div className="t-head__actions" style={{ marginTop: 10, flexWrap: 'wrap' }}>
              <Link href="/grammar" className="mu-btn mu-btn--lime">{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</Link>
              <Link href="/irregular-verbs/games" className="mu-btn">{t({ uk: 'Ігри з дієсловами', ru: 'Игры с глаголами', en: 'Verb games' })}</Link>
              <Link href="/practice" className="mu-btn">{t({ uk: 'Слухати і читати', ru: 'Слушать и читать', en: 'Listening and reading' })}</Link>
              <Link href="/nmt/mock" className="mu-btn">{t({ uk: 'Пробний НМТ', ru: 'Пробный НМТ', en: 'Mock NMT' })}</Link>
              <Link href="/play/town" className="mu-btn">Murly Town</Link>
            </div>
          </div>
        </div>
        <MockResults all={MOCKS.map((m) => m.id)} />
      </div>
    );
  }

  return (
    <>
      <StudentHome enrollments={enrollments} name={first} />
      <div className="t-page" style={{ paddingTop: 0 }}><MockResults all={MOCKS.map((m) => m.id)} /></div>
    </>
  );
}
