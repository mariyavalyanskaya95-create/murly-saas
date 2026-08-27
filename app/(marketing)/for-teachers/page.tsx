import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ForTeachersPage() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-semibold text-lavender-700 shadow-sm mb-6">
              👩‍🏫 For English teachers
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-lavender-700 leading-tight mb-6">
              Run your own online English school. No tech skills needed.
            </h1>
            <p className="text-lg text-lavender-600 mb-8">
              Manage students, plan lessons, track homework and vocab, chat with parents — all in one calm, cat-themed dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sign-up?role=teacher" className="btn-primary">Start free 14-day trial</Link>
              <Link href="/pricing" className="btn-outline">See pricing</Link>
            </div>
          </div>
          <div className="text-center text-9xl animate-float">👩‍🏫</div>
        </div>

        <h2 className="font-display text-3xl font-bold text-center text-lavender-700 mb-12">
          Everything a modern English teacher needs
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: '👥', title: 'Student management', desc: 'Add students, group them into classes, manage schedules. Auto-generate parent access links.' },
            { icon: '📚', title: 'Ready-made lessons', desc: '200+ lessons for ages 4-15 across 5 levels: Kittens, Paws, Cats, Whiskers, Lions. Edit and reuse.' },
            { icon: '📝', title: 'Homework & auto-grading', desc: 'Assign tasks, receive submissions, mark completion. AI can pre-grade for you.' },
            { icon: '📖', title: 'Personal vocab per student', desc: 'Track every word each student is learning. Add words from lessons in one click.' },
            { icon: '💬', title: 'Messenger with parents', desc: 'Chat inside the platform. No more juggling WhatsApp, Telegram, and Viber.' },
            { icon: '💳', title: 'Get paid automatically', desc: 'Parents pay through the platform. You get 55% of every lesson, transferred monthly.' },
          ].map((f) => (
            <div key={f.title} className="card">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-display font-bold text-lg text-lavender-700 mb-2">{f.title}</h3>
              <p className="text-lavender-600">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="gradient-purple rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to grow your teaching?</h2>
          <p className="text-lavender-100 mb-8">Start your free 14-day trial. Cancel anytime.</p>
          <Link href="/sign-up?role=teacher" className="inline-block bg-white text-lavender-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition">
            Start free →
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
