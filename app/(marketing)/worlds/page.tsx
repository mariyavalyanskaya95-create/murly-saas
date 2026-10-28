import { permanentRedirect } from 'next/navigation';

// Стара адреса «Світи»: тепер усі ігри на /games
export default function WorldsPage() {
  permanentRedirect('/games');
}
