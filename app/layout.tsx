import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Murly School — English for kids with cats',
  description: 'Онлайн-школа английского для детей 4-15 с котиками-персонажами. Платформа для учителей, родителей и детей. Начни бесплатно.',
  keywords: ['английский для детей', 'онлайн-школа', 'murly', 'english for kids', 'edtech'],
  openGraph: {
    title: 'Murly School — English for kids with cats',
    description: 'Learning English with cats, gamified like Toca Boca. Trusted by parents and teachers.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
