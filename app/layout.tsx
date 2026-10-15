import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { ukUA } from '@clerk/localizations';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://murly.com.ua'),
  title: 'Murly: англійська для дітей, підлітків і дорослих',
  description:
    'Уроки з учителем, домашка-гра, граматика простими словами і 3D-містечко, де все англійською. Кабінети для вчителя й учня.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Murly: англійська, яку хочеться вчити',
    description: 'Уроки, домашка-гра, граматика і 3D-містечко англійською. Кабінети для вчителя й учня.',
    type: 'website',
    locale: 'uk_UA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      localization={ukUA}
      appearance={{
        variables: {
          colorPrimary: '#1A1A1A',
          colorBackground: '#F4EFE3',
          borderRadius: '1rem',
          fontFamily: 'General Sans, system-ui, sans-serif',
        },
      }}
    >
      <html lang="uk">
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
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
