import { db } from '@/lib/db';
import { DEFAULT_TZ, tzOr } from '@/lib/tz';

// Часовий пояс учителя з налаштувань (порожньо = Київ); кеш на час одного запиту
const cache = new Map<string, Promise<string>>();
export function teacherTz(teacherId: string): Promise<string> {
  if (!cache.has(teacherId)) {
    cache.set(teacherId, db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(teacherId)}&select=tz`)
      .then((r) => tzOr(r[0]?.tz)).catch(() => DEFAULT_TZ));
    setTimeout(() => cache.delete(teacherId), 60000);
  }
  return cache.get(teacherId)!;
}
