import { NextResponse } from 'next/server';
import { searchIndex } from '@/lib/search-index';

// Індекс пошуку для поля в шапці (вантажиться, коли людина вперше відкриває пошук)
export const dynamic = 'force-static';
export function GET() {
  return NextResponse.json(searchIndex(), { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } });
}
