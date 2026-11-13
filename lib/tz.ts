// Часові пояси: учні з різних країн отримують нагадування й бачать час у своєму поясі, учитель у своєму
export const DEFAULT_TZ = 'Europe/Kyiv';

type Lbl = { uk: string; ru: string; en: string };
export const TZS: { id: string; label: Lbl }[] = [
  { id: 'Europe/Kyiv', label: { uk: 'Україна (Київ)', ru: 'Украина (Киев)', en: 'Ukraine (Kyiv)' } },
  { id: 'Europe/Chisinau', label: { uk: 'Молдова', ru: 'Молдова', en: 'Moldova' } },
  { id: 'Europe/Helsinki', label: { uk: 'Фінляндія, Естонія, Латвія, Литва', ru: 'Финляндия, Эстония, Латвия, Литва', en: 'Finland, Estonia, Latvia, Lithuania' } },
  { id: 'Europe/Bucharest', label: { uk: 'Румунія, Болгарія, Греція, Кіпр', ru: 'Румыния, Болгария, Греция, Кипр', en: 'Romania, Bulgaria, Greece, Cyprus' } },
  { id: 'Europe/Warsaw', label: { uk: 'Польща, Чехія, Словаччина, Угорщина', ru: 'Польша, Чехия, Словакия, Венгрия', en: 'Poland, Czechia, Slovakia, Hungary' } },
  { id: 'Europe/Berlin', label: { uk: 'Німеччина, Австрія, Швейцарія, Нідерланди', ru: 'Германия, Австрия, Швейцария, Нидерланды', en: 'Germany, Austria, Switzerland, Netherlands' } },
  { id: 'Europe/Paris', label: { uk: 'Франція, Бельгія', ru: 'Франция, Бельгия', en: 'France, Belgium' } },
  { id: 'Europe/Rome', label: { uk: 'Італія', ru: 'Италия', en: 'Italy' } },
  { id: 'Europe/Madrid', label: { uk: 'Іспанія', ru: 'Испания', en: 'Spain' } },
  { id: 'Europe/Stockholm', label: { uk: 'Швеція, Норвегія, Данія', ru: 'Швеция, Норвегия, Дания', en: 'Sweden, Norway, Denmark' } },
  { id: 'Europe/London', label: { uk: 'Велика Британія', ru: 'Великобритания', en: 'United Kingdom' } },
  { id: 'Europe/Dublin', label: { uk: 'Ірландія', ru: 'Ирландия', en: 'Ireland' } },
  { id: 'Europe/Lisbon', label: { uk: 'Португалія', ru: 'Португалия', en: 'Portugal' } },
  { id: 'Europe/Istanbul', label: { uk: 'Туреччина', ru: 'Турция', en: 'Turkey' } },
  { id: 'Asia/Jerusalem', label: { uk: 'Ізраїль', ru: 'Израиль', en: 'Israel' } },
  { id: 'Asia/Tbilisi', label: { uk: 'Грузія', ru: 'Грузия', en: 'Georgia' } },
  { id: 'Asia/Dubai', label: { uk: 'ОАЕ', ru: 'ОАЭ', en: 'UAE' } },
  { id: 'Asia/Almaty', label: { uk: 'Казахстан', ru: 'Казахстан', en: 'Kazakhstan' } },
  { id: 'Asia/Bangkok', label: { uk: 'Таїланд, В’єтнам', ru: 'Таиланд, Вьетнам', en: 'Thailand, Vietnam' } },
  { id: 'Asia/Singapore', label: { uk: 'Сінгапур, Балі', ru: 'Сингапур, Бали', en: 'Singapore, Bali' } },
  { id: 'Asia/Tokyo', label: { uk: 'Японія, Корея', ru: 'Япония, Корея', en: 'Japan, Korea' } },
  { id: 'Australia/Sydney', label: { uk: 'Австралія (Сідней)', ru: 'Австралия (Сидней)', en: 'Australia (Sydney)' } },
  { id: 'America/New_York', label: { uk: 'США, Канада: схід (Нью-Йорк, Торонто)', ru: 'США, Канада: восток (Нью-Йорк, Торонто)', en: 'USA, Canada: East (New York, Toronto)' } },
  { id: 'America/Chicago', label: { uk: 'США: центр (Чикаго)', ru: 'США: центр (Чикаго)', en: 'USA: Central (Chicago)' } },
  { id: 'America/Denver', label: { uk: 'США: гори (Денвер)', ru: 'США: горы (Денвер)', en: 'USA: Mountain (Denver)' } },
  { id: 'America/Los_Angeles', label: { uk: 'США, Канада: захід (Лос-Анджелес, Ванкувер)', ru: 'США, Канада: запад (Лос-Анджелес, Ванкувер)', en: 'USA, Canada: West (Los Angeles, Vancouver)' } },
  { id: 'America/Sao_Paulo', label: { uk: 'Бразилія', ru: 'Бразилия', en: 'Brazil' } },
];

// Чи існує такий пояс (захист від сміття з форми)
export function validTz(tz: unknown): tz is string {
  if (typeof tz !== 'string' || !tz || tz.length > 64) return false;
  try { new Intl.DateTimeFormat('en-GB', { timeZone: tz }); return true; } catch { return false; }
}
export const tzOr = (tz: unknown, fallback = DEFAULT_TZ) => (validTz(tz) ? tz : fallback);

// Підпис для списку; якщо пояс не з нашого списку (визначив браузер), показуємо його назву як є
export function tzLabel(tz: string, lang: 'uk' | 'ru' | 'en' = 'uk') {
  const f = TZS.find((x) => x.id === tz);
  return f ? f.label[lang] : tz.replace(/_/g, ' ');
}

// Поточна година та дата (YYYY-MM-DD) у поясі
export function localParts(tz: string, d = new Date()) {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' }).formatToParts(d);
  const g = (t: string) => p.find((x) => x.type === t)?.value || '';
  return { date: `${g('year')}-${g('month')}-${g('day')}`, hour: Number(g('hour')) };
}

// Різниця з іншим поясом у годинах (для підказки «у учня на 1 год менше»)
export function tzOffsetMin(tz: string, d = new Date()) {
  const s = d.toLocaleString('en-US', { timeZone: tz });
  return Math.round((new Date(s).getTime() - new Date(d.toLocaleString('en-US', { timeZone: 'UTC' })).getTime()) / 60000);
}

// Короткий час у поясі
export const timeIn = (iso: unknown, tz: string, locale = 'uk-UA') =>
  new Date(String(iso)).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', timeZone: tz });
