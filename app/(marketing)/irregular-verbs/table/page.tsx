import { permanentRedirect } from 'next/navigation';

// Таблиця тепер головна сторінка розділу
export default function OldTablePage() {
  permanentRedirect('/irregular-verbs');
}
