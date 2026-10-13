import { redirect } from 'next/navigation';

// Поки що кабінет є тільки у вчителя; кабінети учня і батьків у роботі
export default function DashboardPage() {
  redirect('/teacher');
}
