import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-lavender-200 bg-white/50">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl gradient-purple flex items-center justify-center text-white font-display font-bold">M</div>
            <span className="font-display font-bold text-xl text-lavender-700">Murly</span>
          </div>
          <p className="text-sm text-lavender-600 leading-relaxed">
            A calm English platform for kids, teachers, and parents.
            Built by one mom, on maternity leave.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lavender-700 mb-3 text-sm uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-sm text-lavender-600">
            <li><Link href="/for-teachers" className="hover:text-lavender-500">For Teachers</Link></li>
            <li><Link href="/for-parents" className="hover:text-lavender-500">For Parents</Link></li>
            <li><Link href="/pricing" className="hover:text-lavender-500">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lavender-700 mb-3 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-lavender-600">
            <li><Link href="/about" className="hover:text-lavender-500">Story</Link></li>
            <li><Link href="/blog" className="hover:text-lavender-500">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-lavender-500">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lavender-700 mb-3 text-sm uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-sm text-lavender-600">
            <li><Link href="/privacy" className="hover:text-lavender-500">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-lavender-500">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-lavender-200 py-6 text-center text-sm text-lavender-500">
        © {new Date().getFullYear()} Murly · Made in Ukraine 🇺🇦
      </div>
    </footer>
  );
}
