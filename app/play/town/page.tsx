import type { Metadata } from 'next';
import { alt } from '@/lib/seo';
import TownGame from '@/components/worlds/TownGame';

export function generateMetadata(): Metadata {
  return {
    title: 'Murly Town: 3D-гра англійською | Murly',
    description: 'Будуй місто, двір і кімнати, заробляй монетки, відповідаючи англійською. Гра на весь екран.',
    alternates: alt('/play/town'),
  };
}

// Гра на весь екран, без шапки сайту
export default function PlayTown({ searchParams }: { searchParams?: { guest?: string } }) {
  return <main className="hm-page"><TownGame full guest={searchParams?.guest === '1'} /></main>;
}
