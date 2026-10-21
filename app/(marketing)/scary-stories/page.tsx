import { redirect } from 'next/navigation';

// Старий розділ «Страшні історії» тепер вкладка в «Історіях».
export default function ScaryStoriesRedirect() { redirect('/stories?g=scary'); }
