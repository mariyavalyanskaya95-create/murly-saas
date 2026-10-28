import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getLibraryPlan } from '@/lib/library';
import { localizeLesson } from '@/lib/content/lessons';
import type { Lang } from '@/lib/i18n';

// Один готовий урок (для дошки): потрібен вхід
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'auth' }, { status: 401 });
  const url = new URL(req.url);
  const p = getLibraryPlan(url.searchParams.get('id') || '');
  if (!p) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  const lang = (['uk', 'ru', 'en'].includes(url.searchParams.get('lang') || '') ? url.searchParams.get('lang') : 'uk') as Lang;
  return NextResponse.json(lang === 'uk' ? p : localizeLesson(p, lang));
}
