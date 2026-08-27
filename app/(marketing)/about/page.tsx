import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-lavender-700 mb-8">
          About Murly
        </h1>

        <div className="prose prose-lg text-lavender-700 space-y-6">
          <p className="text-xl leading-relaxed">
            Hi 👋 I&apos;m Masha, and I built Murly while on maternity leave.
          </p>

          <p>
            When my baby was a few months old, I noticed how much learning English
            felt like a chore for most kids I knew. Boring textbooks. Frustrated
            parents. Overworked teachers juggling spreadsheets, WhatsApp, and Zoom.
          </p>

          <p>
            So I built the platform I wished existed — where kids learn with cats they
            love, teachers have one calm place to run their classes, and parents can
            actually see progress without asking &ldquo;did you do your homework?&rdquo; five times a day.
          </p>

          <p>
            Murly is a small, honest product. Made by one family, for other families.
            We&apos;re not VC-funded. We won&apos;t sell your kid&apos;s data. We just want to make
            English fun and teaching sustainable.
          </p>

          <p className="font-bold">Made with 💜 by moms who get it.</p>
        </div>

        <div className="mt-16 gradient-mint rounded-3xl p-12 text-center text-white shadow-xl">
          <h2 className="font-display text-2xl font-bold mb-4">Join us</h2>
          <p className="mb-8">Try Murly free. Kids, teachers, and parents all welcome.</p>
          <Link href="/sign-up" className="inline-block bg-white text-lavender-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition">
            Start free →
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
