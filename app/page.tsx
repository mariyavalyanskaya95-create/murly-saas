import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-semibold text-lavender-700 shadow-sm mb-6">
              ✨ 14 days free — no card required
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-lavender-700 leading-tight mb-6">
              English for kids.<br />
              <span className="text-peach">Powered by cats.</span>
            </h1>
            <p className="text-lg text-lavender-600 mb-8 leading-relaxed">
              Murly is a playful platform where kids 4–15 learn English through
              gamified lessons with cat characters. For teachers, parents,
              and self-learners.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sign-up?role=teacher" className="btn-primary text-base">
                I&apos;m a teacher →
              </Link>
              <Link href="/sign-up?role=parent" className="btn-outline text-base">
                I&apos;m a parent →
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-lavender-600">
              <div className="flex items-center gap-2"><span>⭐</span> 4.9/5 rating</div>
              <div className="flex items-center gap-2"><span>🎓</span> 200+ lessons</div>
              <div className="flex items-center gap-2"><span>🐱</span> 5 cat friends</div>
            </div>
          </div>

          {/* Cats floating */}
          <div className="relative h-96 hidden md:block">
            <div className="absolute top-8 left-8 text-8xl animate-float cat-hover" style={{animationDelay: '0s'}}>😻</div>
            <div className="absolute top-24 right-12 text-7xl animate-float cat-hover" style={{animationDelay: '1s'}}>🐱</div>
            <div className="absolute bottom-12 left-24 text-9xl animate-float cat-hover" style={{animationDelay: '2s'}}>😺</div>
            <div className="absolute bottom-4 right-0 text-6xl animate-float cat-hover" style={{animationDelay: '0.5s'}}>😽</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl animate-wiggle">😸</div>
          </div>
        </div>
      </section>

      {/* 3 SEGMENTS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-lavender-700 mb-4">
          Three ways to use Murly
        </h2>
        <p className="text-center text-lavender-600 mb-12 max-w-2xl mx-auto">
          Whether you teach English, want to help your kid, or just love cats — we&apos;ve got you.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-6xl mb-4">👩‍🏫</div>
            <h3 className="font-display font-bold text-xl text-lavender-700 mb-2">Teachers</h3>
            <p className="text-lavender-600 mb-4">
              Run your own online school. Manage students, plan lessons, send homework, track progress.
            </p>
            <Link href="/for-teachers" className="text-lavender-500 font-bold hover:text-lavender-700">
              Learn more →
            </Link>
          </div>

          <div className="card text-center border-2 border-peach">
            <div className="text-6xl mb-4">👨‍👩‍👧</div>
            <h3 className="font-display font-bold text-xl text-lavender-700 mb-2">Parents</h3>
            <p className="text-lavender-600 mb-4">
              Give your child fun English lessons with AI or match with a certified teacher.
            </p>
            <Link href="/for-parents" className="text-lavender-500 font-bold hover:text-lavender-700">
              Learn more →
            </Link>
          </div>

          <div className="card text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="font-display font-bold text-xl text-lavender-700 mb-2">Kids</h3>
            <p className="text-lavender-600 mb-4">
              Learn with cats. Earn coins. Customize your kitty. Master English while playing.
            </p>
            <Link href="/for-kids" className="text-lavender-500 font-bold hover:text-lavender-700">
              See it in action →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white/60 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-lavender-700 mb-12">
            Everything you need to teach English
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📚', title: 'Curriculum-ready lessons', desc: 'From Kittens (4-6) to Lions (13-15). 200+ lessons ready to teach.' },
              { icon: '📝', title: 'Homework & vocab', desc: 'Assign tasks, track completion, and manage each student\'s vocabulary list.' },
              { icon: '💬', title: 'Messenger built-in', desc: 'Chat with students and parents inside the platform. No WhatsApp mess.' },
              { icon: '🐱', title: 'Cat Creator', desc: 'Kids customize their cat avatar. Rewards for progress. Engagement 10x.' },
              { icon: '🪙', title: 'Murly Coins', desc: 'Gamified rewards. Kids earn coins for lessons, homework, streaks.' },
              { icon: '📊', title: 'Progress tracking', desc: 'See exactly where each student is. Reports for parents automatically.' },
            ].map((f, i) => (
              <div key={i} className="card">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-display font-bold text-lg text-lavender-700 mb-2">{f.title}</h3>
                <p className="text-lavender-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-lavender-700 mb-4">
          Simple pricing. Cancel anytime.
        </h2>
        <p className="text-center text-lavender-600 mb-12">
          14-day free trial for teachers. No card required.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="card text-center">
            <div className="text-4xl mb-3">👩‍🏫</div>
            <h3 className="font-display font-bold text-xl text-lavender-700 mb-2">For Teachers</h3>
            <p className="text-4xl font-bold text-lavender-700 my-4">
              $19<span className="text-lg text-lavender-500">/mo</span>
            </p>
            <p className="text-sm text-lavender-600 mb-6">Up to 10 students. Everything included.</p>
            <Link href="/pricing" className="btn-primary w-full">See all plans →</Link>
          </div>
          <div className="card text-center border-2 border-peach">
            <div className="text-4xl mb-3">👨‍👩‍👧</div>
            <h3 className="font-display font-bold text-xl text-lavender-700 mb-2">For Families</h3>
            <p className="text-4xl font-bold text-lavender-700 my-4">
              $9<span className="text-lg text-lavender-500">/mo</span>
            </p>
            <p className="text-sm text-lavender-600 mb-6">1 kid, self-serve with AI cat tutor.</p>
            <Link href="/pricing" className="btn-outline w-full">See all plans →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="gradient-purple rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to teach English with cats?
          </h2>
          <p className="text-lavender-100 text-lg mb-8">
            Start your free 14-day trial. No credit card needed.
          </p>
          <Link href="/sign-up" className="inline-block bg-white text-lavender-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition">
            Start free →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
