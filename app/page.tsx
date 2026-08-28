import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />

      {/* HERO — асимметрия, личный тон */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-[1.2fr,1fr] gap-16 items-start">
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-lavender-700 leading-[1.05] mb-8 tracking-tight">
              A quiet place<br />
              to teach English<br />
              <span className="text-peach">to kids.</span>
            </h1>
            <p className="text-xl text-lavender-700/80 mb-10 leading-relaxed max-w-lg">
              I built Murly on maternity leave — one calm dashboard for teachers,
              parents, and kids who love cats.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/sign-up?role=teacher" className="btn-primary text-base">
                Try as a teacher
              </Link>
              <Link href="/pricing" className="btn-outline text-base">
                See pricing
              </Link>
            </div>
            <p className="text-sm text-lavender-600">
              14-day trial · no card · cancel with one click
            </p>
          </div>

          {/* Dashboard mockup card — вместо простыни эмодзи */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-peach/20 -rotate-2"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-lavender-100 overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-lavender-100 bg-lavender-50/50">
                <span className="w-3 h-3 rounded-full bg-coral/70"></span>
                <span className="w-3 h-3 rounded-full bg-peach/70"></span>
                <span className="w-3 h-3 rounded-full bg-mint/70"></span>
                <span className="ml-3 text-xs text-lavender-500 font-mono">teacher-dashboard</span>
              </div>
              {/* Mock content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-lavender-400 mb-2">This week</div>
                  <div className="text-2xl font-bold text-lavender-700">Welcome back, Anna 🌸</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { n: '8', l: 'students' },
                    { n: '12', l: 'lessons' },
                    { n: '3', l: 'homework' },
                  ].map((s) => (
                    <div key={s.l} className="bg-lavender-50 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-lavender-700">{s.n}</div>
                      <div className="text-xs text-lavender-500">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="border border-lavender-100 rounded-xl divide-y divide-lavender-50">
                  {[
                    { name: 'Мілана', lesson: 'Present Continuous', status: 'done' },
                    { name: 'Артем', lesson: 'Colors quiz', status: 'active' },
                    { name: 'Sophia', lesson: 'Homework #4', status: 'pending' },
                  ].map((row) => (
                    <div key={row.name} className="flex items-center justify-between p-3 text-sm">
                      <div>
                        <div className="font-semibold text-lavender-700">{row.name}</div>
                        <div className="text-xs text-lavender-500">{row.lesson}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        row.status === 'done' ? 'bg-mint/30 text-lavender-700' :
                        row.status === 'active' ? 'bg-peach/30 text-lavender-700' :
                        'bg-lavender-100 text-lavender-500'
                      }`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story — почему Murly существует */}
      <section className="bg-white/60 border-y border-lavender-100">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-sm uppercase tracking-widest text-peach font-bold mb-4">Why Murly exists</p>
          <p className="text-2xl md:text-3xl text-lavender-700 leading-relaxed font-display">
            I&apos;m an English teacher and a mom.<br />
            I got tired of juggling WhatsApp, Zoom, Google Sheets,
            and PDFs to teach 8-year-olds.
          </p>
          <p className="mt-8 text-lg text-lavender-600 leading-relaxed">
            Murly is what I wished existed: one place where I schedule lessons,
            track homework, chat with parents, and give every kid a cat they can call
            their own.
          </p>
          <p className="mt-6 text-sm text-lavender-500">— Masha, founder</p>
        </div>
      </section>

      {/* Three big blocks — не карточки, а stories */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-peach font-bold mb-3">For teachers</p>
            <h2 className="font-display text-4xl font-bold text-lavender-700 mb-6 leading-tight">
              Run your own school<br />without the spreadsheets.
            </h2>
            <p className="text-lg text-lavender-700/80 mb-6 leading-relaxed">
              Add students, plan lessons from a library of 200+ ready-to-use ones,
              assign homework, and track every word each kid is learning.
            </p>
            <ul className="space-y-3 text-lavender-700 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-mint mt-1">✓</span>
                <span>Vocabulary tracker per student — add words from lessons in one click</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-mint mt-1">✓</span>
                <span>Messenger with parents inside the platform — no more WhatsApp mess</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-mint mt-1">✓</span>
                <span>Parents pay through Murly, you get 55% automatically</span>
              </li>
            </ul>
            <Link href="/for-teachers" className="text-lavender-500 font-bold hover:text-lavender-700 border-b-2 border-lavender-300 pb-1">
              How it works for teachers →
            </Link>
          </div>
          <div className="bg-lavender-50 rounded-3xl p-8 relative">
            <div className="text-sm text-lavender-500 mb-4 font-mono">Student · Мілана</div>
            <div className="space-y-2">
              {[
                { word: 'apple', tr: 'яблуко', status: 'learning' },
                { word: 'ocean', tr: 'океан', status: 'learned' },
                { word: 'brave', tr: 'сміливий', status: 'learning' },
                { word: 'friend', tr: 'друг', status: 'learned' },
              ].map((v) => (
                <div key={v.word} className="bg-white rounded-xl p-4 flex items-center justify-between border border-lavender-100">
                  <div>
                    <div className="font-bold text-lavender-700">{v.word}</div>
                    <div className="text-sm text-lavender-500">{v.tr}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    v.status === 'learned' ? 'bg-mint/30 text-lavender-700' : 'bg-peach/30 text-lavender-700'
                  }`}>
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 gradient-warm rounded-3xl p-8 text-white">
            <div className="text-6xl mb-4">🪙</div>
            <div className="text-4xl font-bold mb-2">142 coins</div>
            <div className="text-white/90 mb-6">Мілана earned this week</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between bg-white/10 rounded-lg px-3 py-2">
                <span>Lesson completed</span><span>+30</span>
              </div>
              <div className="flex justify-between bg-white/10 rounded-lg px-3 py-2">
                <span>Homework on time</span><span>+20</span>
              </div>
              <div className="flex justify-between bg-white/10 rounded-lg px-3 py-2">
                <span>5-day streak 🔥</span><span>+50</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-sm uppercase tracking-widest text-peach font-bold mb-3">For kids</p>
            <h2 className="font-display text-4xl font-bold text-lavender-700 mb-6 leading-tight">
              English feels like<br />a game they don&apos;t want to quit.
            </h2>
            <p className="text-lg text-lavender-700/80 mb-6 leading-relaxed">
              Every kid gets their own cat friend to dress up and take care of.
              They earn Murly Coins for lessons, homework, and daily streaks —
              then spend them in the Cat Creator shop.
            </p>
            <p className="text-lavender-600 mb-8">
              Learning happens while they play. Not the other way around.
            </p>
            <Link href="/for-parents" className="text-lavender-500 font-bold hover:text-lavender-700 border-b-2 border-lavender-300 pb-1">
              How it works for parents →
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-peach font-bold mb-3">For parents</p>
            <h2 className="font-display text-4xl font-bold text-lavender-700 mb-6 leading-tight">
              You see progress,<br />not homework fights.
            </h2>
            <p className="text-lg text-lavender-700/80 mb-6 leading-relaxed">
              Weekly reports land in your inbox: what words they learned,
              which lessons they finished, where they got stuck.
              No more asking &ldquo;did you do your English?&rdquo; five times a day.
            </p>
            <p className="text-lavender-600 mb-8">
              Pay through Murly. Your teacher gets 55% automatically — fair and transparent.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-lavender-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-lavender-100">
              <div className="w-10 h-10 rounded-full gradient-purple text-white flex items-center justify-center font-bold">M</div>
              <div>
                <div className="font-bold text-lavender-700 text-sm">Weekly report</div>
                <div className="text-xs text-lavender-500">Мілана · Kittens level</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-lavender-600">Lessons finished</span>
                  <span className="font-bold text-lavender-700">3/3</span>
                </div>
                <div className="h-2 bg-lavender-100 rounded-full overflow-hidden">
                  <div className="h-full w-full gradient-mint rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-lavender-600">New words learned</span>
                  <span className="font-bold text-lavender-700">12</span>
                </div>
                <div className="h-2 bg-lavender-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 gradient-purple rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-lavender-600">Streak</span>
                  <span className="font-bold text-lavender-700">5 days 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honest pricing */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-peach font-bold mb-3">Honest pricing</p>
          <h2 className="font-display text-4xl font-bold text-lavender-700 mb-4">
            No hidden fees. Cancel any time.
          </h2>
          <p className="text-lavender-600">
            14-day free trial for teachers · 7-day money-back for parents
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-lavender-100 shadow-sm">
            <div className="text-sm uppercase tracking-wider text-lavender-400 mb-2">For teachers</div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-lavender-700">$19</span>
              <span className="text-lavender-500">/mo</span>
            </div>
            <p className="text-lavender-600 mb-6">Solo plan. Up to 10 students. Everything included.</p>
            <Link href="/pricing" className="btn-outline w-full">
              See all teacher plans
            </Link>
          </div>
          <div className="bg-white rounded-3xl p-8 border-2 border-peach shadow-lg relative">
            <span className="absolute -top-3 left-8 bg-peach text-white text-xs font-bold px-3 py-1 rounded-full">
              For families
            </span>
            <div className="text-sm uppercase tracking-wider text-lavender-400 mb-2 mt-2">Self-serve with AI</div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-lavender-700">$9</span>
              <span className="text-lavender-500">/mo per child</span>
            </div>
            <p className="text-lavender-600 mb-6">Kitten plan. AI cat tutor, self-paced lessons, Cat Creator.</p>
            <Link href="/pricing" className="btn-primary w-full">
              See family plans
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="gradient-purple rounded-3xl p-12 md:p-16 text-white shadow-2xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to teach without the chaos?
          </h2>
          <p className="text-lavender-100 text-lg mb-8 max-w-lg mx-auto">
            Try Murly free for 14 days. No credit card. Cancel with one click.
          </p>
          <Link href="/sign-up" className="inline-block bg-white text-lavender-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition">
            Start free trial →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
