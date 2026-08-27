import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ForParentsPage() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-semibold text-lavender-700 shadow-sm mb-6">
              👨‍👩‍👧 For parents
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-lavender-700 leading-tight mb-6">
              English lessons your kid will actually want to do.
            </h1>
            <p className="text-lg text-lavender-600 mb-8">
              Learning with cats, coins, and games. Track progress in real time.
              Pick self-paced with AI, or match with a certified teacher.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sign-up?role=parent" className="btn-primary">Start with $9/mo</Link>
              <Link href="/pricing" className="btn-outline">See all plans</Link>
            </div>
          </div>
          <div className="text-center text-9xl animate-float">👨‍👩‍👧</div>
        </div>

        <h2 className="font-display text-3xl font-bold text-center text-lavender-700 mb-12">
          Two ways to learn
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="card">
            <div className="text-5xl mb-3">🤖</div>
            <h3 className="font-display font-bold text-xl text-lavender-700 mb-2">Self-serve with AI</h3>
            <p className="text-lavender-600 mb-4">
              Your kid learns with our AI cat tutor. Adaptive, patient, always available.
              Games, videos, speaking practice.
            </p>
            <p className="font-bold text-lavender-700">From $9/mo per child</p>
          </div>
          <div className="card border-2 border-peach">
            <div className="text-5xl mb-3">👩‍🏫</div>
            <h3 className="font-display font-bold text-xl text-lavender-700 mb-2">Live teacher</h3>
            <p className="text-lavender-600 mb-4">
              Match with a certified English teacher for weekly 1-on-1 lessons on Zoom.
              Homework, vocab, progress reports.
            </p>
            <p className="font-bold text-lavender-700">From 350 UAH per lesson</p>
          </div>
        </div>

        <h2 className="font-display text-3xl font-bold text-center text-lavender-700 mb-12">
          Why parents love Murly
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '🎮', title: 'Kids actually enjoy it', desc: 'Toca Boca-style world with cats. Learning feels like play.' },
            { icon: '📊', title: 'You see real progress', desc: 'Weekly reports, vocab lists, homework completion. No mystery.' },
            { icon: '🐱', title: 'Cat Creator', desc: 'Kids customize their own cat avatar. Earn coins for lessons.' },
            { icon: '🇺🇦', title: 'Ukrainian + English', desc: 'UI in Ukrainian, Russian, or English. Kids read explanations in their language.' },
            { icon: '💜', title: 'Made by a mom', desc: 'Built for real families by a mom in maternity leave who gets it.' },
            { icon: '💳', title: 'Fair pricing', desc: 'No sneaky fees. Cancel anytime. First 7 days money-back.' },
          ].map((f) => (
            <div key={f.title} className="card">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-display font-bold text-lg text-lavender-700 mb-2">{f.title}</h3>
              <p className="text-lavender-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="gradient-warm rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="font-display text-3xl font-bold mb-4">Give your kid the joy of English</h2>
          <p className="text-white/90 mb-8">Try Murly today. First 7 days money-back guaranteed.</p>
          <Link href="/sign-up?role=parent" className="inline-block bg-white text-coral font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition">
            Get started →
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
