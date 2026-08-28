import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        <div className="grid md:grid-cols-[1fr,1.5fr] gap-12 mb-20 items-start">
          <div className="relative">
            <div className="absolute -inset-4 gradient-warm rounded-3xl -rotate-3 opacity-40"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/founder.jpg"
                alt="Masha, founder of Murly"
                width={400}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <div className="font-display font-bold text-lavender-700">Masha</div>
              <div className="text-sm text-lavender-500">Founder · English teacher · Mom</div>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-peach font-bold mb-4">Hi 👋</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-lavender-700 leading-tight mb-8">
              I built Murly<br />in maternity leave.
            </h1>

            <div className="space-y-5 text-lg text-lavender-700/85 leading-relaxed">
              <p>
                I was on maternity leave with my baby daughter when I started noticing
                how much learning English felt like a chore for the kids I used to teach.
              </p>

              <p>
                Boring textbooks. Frustrated parents. Overworked teachers juggling
                spreadsheets, WhatsApp, PDFs, and Zoom just to run 3 lessons a week.
              </p>

              <p>
                So I built the thing I wished existed — one calm place where kids
                learn with cats they love, teachers actually enjoy running their
                classes, and parents finally see what&apos;s happening
                without having to ask.
              </p>

              <p className="font-bold text-lavender-700">
                Murly is small, honest, and made by one family for other families.
              </p>

              <p>
                No VC. No selling your kid&apos;s data. Just an English platform
                that respects everyone&apos;s time.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white rounded-3xl p-6 border border-lavender-100">
            <div className="text-3xl font-bold text-lavender-700 mb-2">2024</div>
            <div className="text-sm text-lavender-600">First lesson taught on Murly. My own students.</div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-lavender-100">
            <div className="text-3xl font-bold text-lavender-700 mb-2">200+</div>
            <div className="text-sm text-lavender-600">Ready-made lessons across 5 levels for ages 4-15.</div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-lavender-100">
            <div className="text-3xl font-bold text-lavender-700 mb-2">🐱 × 5</div>
            <div className="text-sm text-lavender-600">Cat characters kids fall in love with.</div>
          </div>
        </div>

        <div className="gradient-mint rounded-3xl p-12 text-center text-white shadow-xl">
          <h2 className="font-display text-3xl font-bold mb-4">Want to try Murly?</h2>
          <p className="mb-8 text-white/90">Kids, teachers, and parents welcome. First step is free.</p>
          <Link href="/sign-up" className="inline-block bg-white text-lavender-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition">
            Start free →
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
