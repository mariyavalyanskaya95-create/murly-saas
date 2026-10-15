import type { Metadata } from 'next';
import TownGame from '@/components/worlds/TownGame';

export const metadata: Metadata = {
  title: 'Murly Town: 3D-гра англійською | Murly',
  description: 'Будуй місто, двір і кімнати, заробляй монетки, відповідаючи англійською. Гра на весь екран.',
  alternates: { canonical: '/play/town' },
};

// Гра на весь екран, без шапки сайту
export default function PlayTown() {
  return <main className="hm-page"><TownGame full /></main>;
}
