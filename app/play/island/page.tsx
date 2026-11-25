import type { Metadata } from 'next';
import { alt } from '@/lib/seo';
import IslandGame from '@/components/worlds/IslandGame';

export function generateMetadata(): Metadata {
  return {
    title: 'Murly Island: 3D-гра англійською з роботами і магазином | Murly',
    description: 'Острів, де котик працює на пошті, у кафе й на ринку англійською, заробляє Murly-монетки і купує одяг, дім, транспорт і улюбленців.',
    alternates: alt('/play/island'),
  };
}

// Гра на весь екран, без шапки сайту
export default function PlayIsland() {
  return <main className="hm-page"><IslandGame /></main>;
}
