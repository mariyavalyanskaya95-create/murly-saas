import CookieBar from '@/components/CookieBar';
import type { Metadata } from 'next';
import WordPick from '@/components/WordPick';
import SeasonalDecor from '@/components/SeasonalDecor';
import { ClerkProvider } from '@clerk/nextjs';
import { ruRU, ukUA } from '@clerk/localizations';
import LangProvider from '@/components/LangProvider';
import { getLang } from '@/lib/i18n-server';
import { headers } from 'next/headers';
import { alt, PRIVATE_PREFIXES, SITE_URL } from '@/lib/seo';
import './globals.css';

const META = {
  uk: { title: 'Murly: англійська, яку хочеться вчити', desc: 'Уроки з учителем, домашка-гра, граматика простими словами і 3D-містечко, де все англійською. Кабінети для вчителя й учня.', og: 'Murly: англійська, яку хочеться вчити', locale: 'uk_UA' },
  ru: { title: 'Murly: английский, который хочется учить', desc: 'Уроки с учителем, домашка-игра, грамматика простыми словами и 3D-городок, где всё на английском. Кабинеты для учителя и ученика.', og: 'Murly: английский, который хочется учить', locale: 'ru_UA' },
  en: { title: 'Murly: English you actually want to learn', desc: 'Lessons with a teacher, homework as a game, simple grammar and a 3D town where everything is in English. Dashboards for teachers and students.', og: 'Murly: English you actually want to learn', locale: 'en_US' },
};

export function generateMetadata(): Metadata {
  const m = META[getLang()];
  const path = headers().get('x-path') || '/';
  const priv = PRIVATE_PREFIXES.some((x) => path.startsWith(x.replace(/\/$/, '')));
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.desc,
    icons: { icon: '/favicon.svg' },
    alternates: priv ? undefined : alt(path),
    robots: priv ? { index: false, follow: false } : undefined,
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
    openGraph: { title: m.og, description: m.desc, type: 'website', locale: m.locale, siteName: 'Murly', url: path },
  };
}

// Хто ми для пошуковиків: організація і сайт (з пошуком)
const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: 'Murly', url: SITE_URL, logo: `${SITE_URL}/favicon.svg` },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, name: 'Murly', url: SITE_URL, inLanguage: ['uk', 'ru', 'en'], publisher: { '@id': `${SITE_URL}/#org` } },
  ],
};
const GA = process.env.NEXT_PUBLIC_GA_ID;
// Google Tag Manager: усі лічильники (GA4, Meta Pixel тощо) налаштовуються вже в GTM, без змін коду
const GTM = 'GTM-NKKFJ46T';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getLang();
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignOutUrl="/"
      localization={lang === 'ru' ? ruRU : lang === 'en' ? undefined : ukUA}
      appearance={{
        variables: {
          colorPrimary: '#1B2140',
          colorBackground: '#EEF0FA',
          borderRadius: '1rem',
          fontFamily: 'General Sans, system-ui, sans-serif',
        },
      }}
    >
      <html lang={lang} suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
          <link
            rel="stylesheet"
            href="https://api.fontshare.com/v2/css?f[]=boldonse@400&f[]=nippo@700,400&f[]=general-sans@500,600,700&display=swap"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          />
          {/* сторінка відкрита вікном на дошці: ховаємо меню й футер */}
          <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');` }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
          {GA && <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} />}
          {GA && <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}');` }} />}
          {/* Sentry: ловить помилки сайту в браузерах учнів (без персональних даних) */}
          <script dangerouslySetInnerHTML={{ __html: `window.sentryOnLoad=function(){Sentry.init({environment:location.hostname==='murly.com.ua'?'production':'preview',tracesSampleRate:0,sendDefaultPii:false,ignoreErrors:['ResizeObserver loop','Non-Error promise rejection','NotAllowedError','AbortError','Load failed','Failed to fetch'],denyUrls:[/extensions\\//i,/^chrome:\\/\\//i,/^moz-extension:/i]})};` }} />
          <script src="https://js-de.sentry-cdn.com/ab16a8689135769db5b55f83469560fd.min.js" crossOrigin="anonymous" async />
          <script dangerouslySetInnerHTML={{ __html: "try{if(window.self!==window.top)document.documentElement.classList.add('is-embed')}catch(e){document.documentElement.classList.add('is-embed')}" }} />
        </head>
        <body><noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript><LangProvider lang={lang}>{children}<WordPick /><CookieBar /><SeasonalDecor /></LangProvider></body>
      </html>
    </ClerkProvider>
  );
}
