import { redirect } from 'next/navigation';

// Окремої сторінки пошуку більше немає: усі матеріали в каталозі уроків
export default function SearchPage() {
  redirect('/lessons');
}
