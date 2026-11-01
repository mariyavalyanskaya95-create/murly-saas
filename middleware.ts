import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Protected routes require sign in
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/teacher(.*)',
  '/student(.*)',
  '/parent(.*)',
  '/account(.*)',
  '/welcome(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  // Шлях і мова з адреси (?lang=ru) для canonical/hreflang і серверного рендеру
  const h = new Headers(req.headers);
  h.set('x-path', req.nextUrl.pathname);
  const q = req.nextUrl.searchParams.get('lang');
  const lang = q === 'uk' || q === 'ru' || q === 'en' ? q : null;
  if (lang) h.set('x-lang', lang); else h.delete('x-lang');
  const res = NextResponse.next({ request: { headers: h } });
  if (lang) res.cookies.set('murly_lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
  return res;
}, { signInUrl: '/sign-in', signUpUrl: '/sign-up' });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
