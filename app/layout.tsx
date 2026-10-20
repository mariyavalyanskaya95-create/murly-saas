import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { ruRU, ukUA } from '@clerk/localizations';
import LangProvider from '@/components/LangProvider';
import { getLang } from '@/lib/i18n-server';
import './globals.css';

const META = {
  uk: { title: 'Murly: англійська, яку хочеться вчити', desc: 'Уроки з учителем, домашка-гра, граматика простими словами і 3D-містечко, де все англійською. Кабінети для вчителя й учня.', og: 'Murly: англійська, яку хочеться вчити', locale: 'uk_UA' },
  ru: { title: 'Murly: английский, который хочется учить', desc: 'Уроки с учителем, домашка-игра, грамматика простыми словами и 3D-городок, где всё на английском. Кабинеты для учителя и ученика.', og: 'Murly: английский, который хочется учить', locale: 'ru_UA' },
  en: { title: 'Murly: English you actually want to learn', desc: 'Lessons with a teacher, homework as a game, simple grammar and a 3D town where everything is in English. Dashboards for teachers and students.', og: 'Murly: English you actually want to learn', locale: 'en_US' },
};

export function generateMetadata(): Metadata {
  const m = META[getLang()];
  return {
    metadataBase: new URL('https://murly.com.ua'),
    title: m.title,
    description: m.desc,
    icons: { icon: '/favicon.svg' },
    openGraph: { title: m.og, description: m.desc, type: 'website', locale: m.locale },
  };
}

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
          colorPrimary: '#1A1A1A',
          colorBackground: '#F4EFE3',
          borderRadius: '1rem',
          fontFamily: 'General Sans, system-ui, sans-serif',
        },
      }}
    >
      <html lang={lang}>
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
        </head>
        <body><LangProvider lang={lang}>{children}</LangProvider></body>
      </html>
    </ClerkProvider>
  );
}
