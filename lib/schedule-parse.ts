// Розбір розкладу, написаного списком (або розпізнаного зі скріну). Підтримує:
// «Пн 16:00 Аня», «вт 18:30-19:30 Полина», «24.10 17:00 Вика 45 хв», «щосереди 15:00 Yeva»,
// кілька занять в одному рядку: «Пн 10:00 Аня, 11:00 Ева С, 12:00 Игорь»,
// і день окремим рядком, а під ним заняття: «Понеділок» / «10:00 Аня» / «11:00 Ева».
export type ParsedRow = { line: string; studentId: string; date: string; time: string; duration: number; weekly: boolean; ok: boolean };

const DAYS: [RegExp, number][] = [
  [/^(пн|пон|mon)/, 1], [/^(вт|вів|втор|tue)/, 2], [/^(ср|сер|сред|wed)/, 3], [/^(чт|чет|thu)/, 4],
  [/^(пт|пят|пятн|fri)/, 5], [/^(сб|суб|sat)/, 6], [/^(нд|нед|вс|воскр|sun)/, 0],
];
const WEEKLY = /(щотиж|кожн|еженед|кажд|every|weekly|щопон|щовів|щосер|щочет|щопят|щосуб|щонед)/;
const TIME = /(\d{1,2})[:.](\d{2})(?:\s*[-–—]\s*(\d{1,2})[:.](\d{2}))?/g;

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const norm = (s: string) => s.toLowerCase().replace(/ё/g, 'е').replace(/[’'`]/g, '');

function findDate(rest: string, now: Date, time: string, dotIsDate = false): { date: Date | null; rest: string } {
  // явна дата 24.10, 24/10, 24.10.2026 (час 16.00 не чіпаємо: місяць 00 і 30 неможливі)
  for (const dm of Array.from(rest.matchAll(/(\d{1,2})[./](\d{1,2})(?:[./](\d{2,4}))?/g))) {
    const d = Number(dm[1]), m = Number(dm[2]);
    if (m < 1 || m > 12 || d < 1 || d > 31) continue;
    if (!dm[3] && !dotIsDate && dm[0].includes('.') && dm[2].length === 2) {
      const times = Array.from(rest.matchAll(/\d{1,2}[.:]\d{2}/g)).length;
      if (times < 2 && !/\d{1,2}:\d{2}/.test(rest)) continue; // «10.10» без іншого часу: це час
    }
    const y = dm[3] ? (dm[3].length === 2 ? 2000 + Number(dm[3]) : Number(dm[3])) : now.getFullYear();
    const date = new Date(y, m - 1, d);
    if (!dm[3] && date < new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)) date.setFullYear(y + 1);
    return { date, rest: rest.replace(dm[0], ' ') };
  }
  for (const w of rest.split(/[\s,;]+/)) {
    const ww = w.replace(/^що/, '');
    const hit = DAYS.find(([re]) => re.test(w) || re.test(ww));
    if (!hit || /^\d/.test(w)) continue;
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let add = (hit[1] - d.getDay() + 7) % 7;
    if (add === 0 && time) { const [h, m] = time.split(':').map(Number); if (h * 60 + m <= now.getHours() * 60 + now.getMinutes()) add = 7; }
    d.setDate(d.getDate() + add);
    return { date: d, rest: rest.replace(w, ' ') };
  }
  return { date: null, rest };
}

// найкращий збіг імені: повне ім’я важить більше, ніж перші літери (щоб «Ева С» і «Ева мол» не плутались)
function matchStudent(seg: string, students: { id: string; name: string }[]) {
  const words = seg.split(/[\s,;:()]+/).filter((w) => w && /^\p{L}/u.test(w));
  let best = '', score = 0;
  for (const s of students) {
    const parts = norm(s.name).split(/\s+/).filter(Boolean);
    let sc = 0;
    parts.forEach((p, pi) => {
      const k = Math.max(2, Math.min(4, p.length - 1));
      const hit = words.some((w) => w === p || (w.length >= Math.min(3, p.length) && Math.abs(w.length - p.length) <= 2 && w.slice(0, k) === p.slice(0, k)) || (pi > 0 && w.length >= 1 && p.startsWith(w)));
      if (hit) sc += pi === 0 ? 10 : 5;
    });
    if (sc >= 10 && sc > score) { score = sc; best = s.id; }
  }
  return best;
}

export function parseSchedule(text: string, students: { id: string; name: string }[], now = new Date()): ParsedRow[] {
  const rows: ParsedRow[] = [];
  let ctxDate: Date | null = null; // день із попереднього рядка-заголовка
  let ctxWeekly = false;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const low = ` ${norm(line)} `;
    let times = Array.from(low.matchAll(TIME)).filter((m) => Number(m[1]) < 24 && Number(m[2]) < 60);
    // «10.10 17:00 Аня»: перше «10.10» відразу перед іншим часом це дата, а не час
    let dotIsDate = false;
    if (times.length >= 2 && times[0][0].includes('.') && !times[0][3] && Number(times[0][2]) >= 1 && Number(times[0][2]) <= 12
      && !low.slice((times[0].index ?? 0) + times[0][0].length, times[1].index).trim()) { times = times.slice(1); dotIsDate = true; }
    const first = times[0] ? `${pad(Number(times[0][1]))}:${times[0][2]}` : '';
    const head = times.length ? low.slice(0, times[0].index) : low;
    const { date, rest: headRest } = findDate(head, now, first, dotIsDate || times.length > 0);
    const weekly = WEEKLY.test(low) || (!date && ctxWeekly);
    if (!times.length) { if (date) { ctxDate = date; ctxWeekly = WEEKLY.test(low); } continue; }
    const day = date ?? ctxDate;
    // кожен час відкриває окреме заняття: текст до наступного часу
    times.forEach((m, i) => {
      const end = i + 1 < times.length ? times[i + 1].index : low.length;
      let seg = low.slice((m.index ?? 0) + m[0].length, end);
      if (i === 0) seg = `${headRest} ${seg}`;
      let duration = 60;
      if (m[3]) { const d = (Number(m[3]) * 60 + Number(m[4])) - (Number(m[1]) * 60 + Number(m[2])); if (d > 0 && d <= 240) duration = d; }
      const dur = seg.match(/(\d{2,3})\s*(хв|мин|min|m\b)/);
      if (dur) { duration = Math.min(240, Math.max(15, Number(dur[1]))); seg = seg.replace(dur[0], ' '); }
      const time = `${pad(Number(m[1]))}:${m[2]}`;
      let d = day;
      if (!date && ctxDate === null && !d) d = null;
      const studentId = matchStudent(seg, students);
      rows.push({ line: times.length > 1 ? `${line} · ${time}` : line, studentId, date: d ? iso(d) : '', time, duration, weekly, ok: Boolean(studentId && d) });
    });
  }
  return rows;
}
