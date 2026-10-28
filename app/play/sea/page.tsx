import { redirect } from 'next/navigation';

// Стара адреса квесту: тепер це локація «Під водою» в «Знайди, Бульбашко!»
export default function SeaPage({ searchParams }: { searchParams: { hw?: string } }) {
  redirect(`/play/quest/sea${searchParams.hw ? `?hw=${encodeURIComponent(searchParams.hw)}` : ''}`);
}
