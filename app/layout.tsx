import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: 'Murly School — English for kids with cats',
  description: 'Online English school for kids 4-15 with cat characters. Platform for teachers, parents, and students. Start free.',
  keywords: ['англійська для дітей', 'english for kids', 'murly', 'online school', 'edtech'],
  openGraph: {
    title: 'Murly School — English for kids with cats',
    description: 'Learning English with cats. Trusted by teachers and parents.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#7C63C2',
          colorBackground: '#FFF8E7',
          borderRadius: '1rem',
          fontFamily: 'Nunito, system-ui, sans-serif',
        },
      }}
    >
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
