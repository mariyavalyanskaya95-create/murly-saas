import { auth, currentUser } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();
  const role =
    searchParams.role ||
    (user?.unsafeMetadata?.role as string) ||
    (user?.publicMetadata?.role as string) ||
    'teacher';
  const firstName = user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'friend';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/85 border-b border-lavender-100">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-2xl gradient-purple flex items-center justify-center text-white font-display font-bold text-lg">
              M
            </div>
            <span className="font-display font-bold text-2xl text-lavender-700">Murly</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-lavender-600 text-sm">
              Welcome, {firstName}
            </span>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10 rounded-full ring-2 ring-lavender-300',
                },
              }}
            />
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-peach font-bold mb-2">
            {role === 'teacher' ? 'Teacher account' : role === 'parent' ? 'Parent account' : 'Student account'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-lavender-700 mb-4">
            Welcome to Murly, {firstName} 🌸
          </h1>
          <p className="text-lg text-lavender-700/80 max-w-2xl">
            Your account is ready. Full dashboards are coming soon — for now
            you can access existing tools below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="https://darkcyan-raven-710473.hostingersite.com/teacher-dashboard/"
            target="_blank"
            className="card group"
          >
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-display font-bold text-xl text-lavender-700 mb-2 group-hover:text-lavender-500 transition">
              Teacher Dashboard
            </h3>
            <p className="text-lavender-600 text-sm mb-4">
              Manage students, lessons, homework, vocabulary. Currently on our WordPress version — will move here soon.
            </p>
            <span className="text-lavender-500 font-bold text-sm">
              Open in new tab →
            </span>
          </Link>

          <Link
            href="https://darkcyan-raven-710473.hostingersite.com/student-dashboard/"
            target="_blank"
            className="card group"
          >
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-display font-bold text-xl text-lavender-700 mb-2 group-hover:text-lavender-500 transition">
              Student Dashboard
            </h3>
            <p className="text-lavender-600 text-sm mb-4">
              Home, schedule, homework, chat, Cat Creator, Murly Coins. Currently WordPress version.
            </p>
            <span className="text-lavender-500 font-bold text-sm">
              Open in new tab →
            </span>
          </Link>
        </div>

        <div className="gradient-purple rounded-3xl p-8 text-white">
          <h2 className="font-display text-2xl font-bold mb-3">🚧 Under construction</h2>
          <p className="text-lavender-100 mb-2">
            We&apos;re actively migrating both dashboards to this new platform.
            Auth ✅ done. Payments 🚧 next. Dashboards 🚧 after.
          </p>
          <p className="text-white/80 text-sm">
            Meanwhile, all your data stays safe on Railway PostgreSQL.
          </p>
        </div>
      </main>
    </div>
  );
}
