// Одне заняття на учня в одну хвилину. Якщо в базі випадково два однакових записи
// (той самий учень, той самий час), показуємо й рахуємо тільки один: проведений важливіший за запланований,
// запланований важливіший за скасований.
type L = { student_id?: unknown; studentId?: unknown; start?: unknown; status?: unknown };
const RANK: Record<string, number> = { done: 4, charged: 4, noshow: 3, missed: 3, planned: 2, cancelled: 1 };
export function uniqLessons<T extends L>(rows: T[]): T[] {
  const best = new Map<string, T>();
  const order: string[] = [];
  for (const r of rows) {
    const sid = String(r.student_id ?? r.studentId ?? '');
    const t = r.start ? new Date(String(r.start)).getTime() : NaN;
    if (!sid || Number.isNaN(t)) { const k = `x${order.length}`; best.set(k, r); order.push(k); continue; }
    const k = `${sid}|${t}`;
    const cur = best.get(k);
    if (!cur) { best.set(k, r); order.push(k); continue; }
    if ((RANK[String(r.status ?? '')] ?? 0) > (RANK[String(cur.status ?? '')] ?? 0)) best.set(k, r);
  }
  return order.map((k) => best.get(k) as T);
}
