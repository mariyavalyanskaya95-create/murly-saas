import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

type SearchParams = { role?: string; plan?: string };

export default function SignUpPage(props: { searchParams: SearchParams }) {
  const role = props.searchParams.role || 'teacher';
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 rounded-2xl gradient-purple flex items-center justify-center text-white font-display font-bold text-xl group-hover:scale-105 transition">
          M
        </div>
        <span className="font-display font-bold text-2xl text-lavender-700">Murly</span>
      </Link>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-lavender-700 mb-2 text-center">
        {role === 'teacher' ? 'Start teaching with Murly' : 'Give your kid Murly'}
      </h1>
      <p className="text-lavender-600 mb-8 text-center">
        {role === 'teacher'
          ? '14 days free, no card required'
          : '7-day money-back guarantee'}
      </p>
      <SignUp
        signInUrl="/sign-in"
        fallbackRedirectUrl={`/dashboard?role=${role}`}
        unsafeMetadata={{ role, plan: props.searchParams.plan }}
      />
    </div>
  );
}
