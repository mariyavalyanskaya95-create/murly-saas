// Розбір розкладу, написаного списком (або розпізнаного зі скріну). Підтримує:
// «Пн 16:00 Аня», «вт 18:30-19:30 Полина», «24.10 17:00 Вика 45 хв», «щосереди 15:00 Yeva»,
// кілька днів: «вт, пт 15:00 Олег», день після часу: «Олег 12.00 вторник»,
// кілька занять в одному рядку: «Пн 10:00 Аня, 11:00 Ева С, 12:00 Игорь»,
// і день окремим рядком, а під ним заняття: «Понеділок» / «10:00 Аня» / «11:00 Ева».
export type ParsedRow = { line: string; studentId: string; date: string; time: string; duration: number; weekly: boolean; ok: boolean };

// день тижня: слово цілком (щоб «Серёжа» чи «все» не ставали днями)
const DAYS: [RegExp, number][] = [
  [/^(пн|пон|понед\p{L}*|понеділ\p{L}*|mon|mondays?)$/u, 1],
  [/^(вт|вів|вівтор\p{L}*|втор\p{L}*|tue|tues|tuesdays?)$/u, 2],
  [/^(ср|сер|серед\p{L}*|сред\p{L}*|wed|wednesdays?)$/u, 3],
  [/^(чт|чет|четвер\p{L}*|четверг\p{L}*|thu|thur|thurs|thursdays?)$/u, 4],
  [/^(пт|пят|пятниц\p{L}*|fri|fridays?)$/u, 5],
  [/^(сб|суб|субот\p{L}*|sat|saturdays?)$/u, 6],
  [/^(нд|нед|вс|неділ\p{L}*|воскр\p{L}*|sun|sundays?)$/u, 0],
];
const WEEKLY = /(щотиж|кожн|еженед|кажд|every|weekly|щопон|щовів|щосер|щочет|щопят|щосуб|щонед|по (понед|вторн|сред|четв|пятн|субб|воскр))/;
const TIME = /(\d{1,2})[:.](\d{2})(?:\s*[-–—]\s*(\d{1,2})[:.](\d{2}))?/g;

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const norm = (s: string) => s.toLowerCase().replace(/ё/g, 'е').replace(/[’'`]/g, '');

const dayOf = (w: string) => {
  const x = w.replace(/^(що|по)/, '');
  const hit = DAYS.find(([re]) => re.test(w) || re.test(x));
  return hit ? hit[1] : -1;
};

// усі дати в шматку тексту: явні 24.10 і дні тижня (кілька: «вт пт», «вторник и пятница»)
function findDates(rest: string, now: Date, time: string, dotIsDate = false): { dates: Date[]; rest: string } {
  const dates: Date[] = [];
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
    dates.push(date);
    rest = rest.replace(dm[0], ' ');
  }
  for (const w of rest.split(/[\s,;/+&]+/)) {
    if (!w || /^\d/.test(w)) continue;
    const wd = dayOf(w.replace(/[.:]$/, ''));
    if (wd < 0) continue;
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let add = (wd - d.getDay() + 7) % 7;
    if (add === 0 && time) { const [h, m] = time.split(':').map(Number); if (h * 60 + m <= now.getHours() * 60 + now.getMinutes()) add = 7; }
    d.setDate(d.getDate() + add);
    if (!dates.some((x) => sameD(x, d))) dates.push(d);
    rest = rest.replace(w, ' ');
  }
  return { dates, rest };
}
const sameD = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

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
  let ctxDates: Date[] = []; // дні з попереднього рядка-заголовка
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
    const lineWeekly = WEEKLY.test(low);
    if (!times.length) {
      const { dates } = findDates(low, now, '', false);
      if (dates.length) { ctxDates = dates; ctxWeekly = lineWeekly; }
      continue;
    }
    const first = `${pad(Number(times[0][1]))}:${times[0][2]}`;
    const head = findDates(low.slice(0, times[0].index), now, first, dotIsDate || times.length > 0);
    // кожен час відкриває окреме заняття: текст до наступного часу
    times.forEach((m, i) => {
      const end = i + 1 < times.length ? times[i + 1].index : low.length;
      const time = `${pad(Number(m[1]))}:${m[2]}`;
      const own = findDates(low.slice((m.index ?? 0) + m[0].length, end), now, time, true);
      let seg = own.rest;
      if (i === 0) seg = `${head.rest} ${seg}`;
      // день після часу («Олег 12.00 вторник») теж рахується; інакше день з початку рядка або із заголовка
      const days = own.dates.length ? own.dates : head.dates.length ? head.dates : ctxDates;
      const explicit = own.dates.length > 0 || head.dates.length > 0;
      let duration = 60;
      if (m[3]) { const d = (Number(m[3]) * 60 + Number(m[4])) - (Number(m[1]) * 60 + Number(m[2])); if (d > 0 && d <= 240) duration = d; }
      const dur = seg.match(/(\d{2,3})\s*(хв|мин|min|m\b)/);
      if (dur) { duration = Math.min(240, Math.max(15, Number(dur[1]))); seg = seg.replace(dur[0], ' '); }
      const studentId = matchStudent(seg, students);
      // кілька днів («вторник пятница 15:00») = щотижневі заняття в кожен з них
      const weekly = lineWeekly || days.length > 1 || (!explicit && ctxWeekly);
      const label = times.length > 1 ? `${line} · ${time}` : line;
      if (!days.length) rows.push({ line: label, studentId, date: '', time, duration, weekly, ok: false });
      for (const d of days) rows.push({ line: days.length > 1 ? `${label} · ${d.toLocaleDateString('uk', { weekday: 'short' })}` : label, studentId, date: iso(d), time, duration, weekly, ok: Boolean(studentId) });
    });
  }
  return rows;
}
