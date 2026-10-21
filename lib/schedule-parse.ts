// Розбір розкладу, написаного списком (або розпізнаного зі скріну):
// «Пн 16:00 Аня», «вт 18:30-19:30 Полина», «21.10 17:00 Вика 45 хв», «щосереди 15:00 Yeva».
export type ParsedRow = { line: string; studentId: string; date: string; time: string; duration: number; weekly: boolean; ok: boolean };

const DAYS: [RegExp, number][] = [
  [/^(пн|пон|mon)/, 1], [/^(вт|вів|втор|tue)/, 2], [/^(ср|сер|сред|wed)/, 3], [/^(чт|чет|thu)/, 4],
  [/^(пт|п[’']?ят|пятн|fri)/, 5], [/^(сб|суб|sat)/, 6], [/^(нд|нед|вс|воскр|sun)/, 0],
];
const WEEKLY = /(щотиж|кожн|еженед|кажд|every|weekly|щопон|щовів|щосер|щочет|щоп[’']?ят|щосуб|щонед)/;

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const norm = (s: string) => s.toLowerCase().replace(/ё/g, 'е').replace(/[’']/g, '');

export function parseSchedule(text: string, students: { id: string; name: string }[], now = new Date()): ParsedRow[] {
  const rows: ParsedRow[] = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    let rest = ` ${norm(line)} `;
    let date: Date | null = null;
    // дата 21.10 або 21.10.2026 або 21/10 (але не плутаємо з часом 16.00)
    const hasColonTime = /\d{1,2}:\d{2}/.test(rest);
    for (const dm of Array.from(rest.matchAll(/(\d{1,2})[./](\d{1,2})(?:[./](\d{2,4}))?/g))) {
      const d = Number(dm[1]), m = Number(dm[2]);
      if (m < 1 || m > 12 || d < 1 || d > 31) continue;
      if (!dm[3] && !hasColonTime && dm[0].includes('.') && dm[2].length === 2 && Number(dm[1]) <= 23) {
        // «10.10» без іншого часу: якщо в рядку ще є «x.xx», то це дата, інакше вважаємо часом
        const others = Array.from(rest.matchAll(/\d{1,2}[.:]\d{2}/g)).length;
        if (others < 2) continue;
      }
      const y = dm[3] ? (dm[3].length === 2 ? 2000 + Number(dm[3]) : Number(dm[3])) : now.getFullYear();
      date = new Date(y, m - 1, d);
      if (!dm[3] && date < new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)) date.setFullYear(y + 1);
      rest = rest.replace(dm[0], ' ');
      break;
    }
    // час 16:00, 16.00, діапазон 16:00-17:00
    let time = '';
    let duration = 60;
    const tr = rest.match(/(\d{1,2})[:.](\d{2})\s*[-–—]\s*(\d{1,2})[:.](\d{2})/);
    const tm = tr ?? rest.match(/(\d{1,2})[:.](\d{2})/);
    if (tm && Number(tm[1]) < 24 && Number(tm[2]) < 60) {
      time = `${pad(Number(tm[1]))}:${tm[2]}`;
      if (tr) { const d = (Number(tr[3]) * 60 + Number(tr[4])) - (Number(tr[1]) * 60 + Number(tr[2])); if (d > 0 && d <= 240) duration = d; }
      rest = rest.replace(tm[0], ' ');
    }
    const dur = rest.match(/(\d{2,3})\s*(хв|мин|min|m\b)/);
    if (dur) { duration = Math.min(240, Math.max(15, Number(dur[1]))); rest = rest.replace(dur[0], ' '); }
    const weekly = WEEKLY.test(rest);
    // день тижня
    if (!date) {
      for (const w of rest.split(/[\s,;]+/)) {
        const word = w.replace(/^щ?о?/, (m) => (WEEKLY.test(w) ? '' : m));
        const hit = DAYS.find(([re]) => re.test(word) || re.test(w.replace(/^що/, '')));
        if (hit) {
          const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          let add = (hit[1] - d.getDay() + 7) % 7;
          if (add === 0 && time) { const [h, m] = time.split(':').map(Number); if (h * 60 + m <= now.getHours() * 60 + now.getMinutes()) add = 7; }
          d.setDate(d.getDate() + add);
          date = d;
          break;
        }
      }
    }
    // учень: шукаємо ім’я в рядку (повне або перші 3+ літери)
    const words = rest.split(/[\s,;:()]+/).filter(Boolean);
    let studentId = '';
    for (const s of students) {
      const n = norm(s.name);
      const k = Math.max(2, Math.min(4, n.length - 1)); // відмінки: Аня, Ані, Аню; Полина, Полине
      if (rest.includes(` ${n} `) || words.some((w) => w === n || (w.length >= 3 && Math.abs(w.length - n.length) <= 2 && /^\p{L}/u.test(w) && w.slice(0, k) === n.slice(0, k)))) { studentId = s.id; break; }
    }
    rows.push({ line, studentId, date: date ? iso(date) : '', time, duration, weekly, ok: Boolean(studentId && date && time) });
  }
  return rows;
}
