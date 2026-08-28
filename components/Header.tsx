import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/85 border-b border-lavender-100">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-2xl gradient-purple flex items-center justify-center text-white font-display font-bold text-lg group-hover:scale-105 transition">
            M
          </div>
          <span className="font-display font-bold text-2xl text-lavender-700">Murly</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-lavender-700 font-semibold">
          <li><Link href="/for-teachers" className="hover:text-lavender-500 transition">Teachers</Link></li>
          <li><Link href="/for-parents" className="hover:text-lavender-500 transition">Parents</Link></li>
          <li><Link href="/pricing" className="hover:text-lavender-500 transition">Pricing</Link></li>
          <li><Link href="/about" className="hover:text-lavender-500 transition">Story</Link></li>
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="hidden sm:inline text-lavender-700 font-semibold hover:text-lavender-500">
            Sign in
          </Link>
          <Link href="/sign-up" className="btn-primary text-sm">
            Start free
          </Link>
        </div>
      </nav>
    </header>
  );
}
