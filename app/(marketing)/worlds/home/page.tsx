import { redirect } from 'next/navigation';

// Стара адреса «My home 3D»: тепер це частина Murly Town
export default function HomeRedirect() { redirect('/play/town'); }
