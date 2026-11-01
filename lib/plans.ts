// Тарифи і пробний місяць. Поки немає ФОП (оплати підключимо через ФОП Андрія), PAID_ENABLED = false:
// усе безкоштовно, лічильник пробного місяця і нагадування про оплату вимкнені.
export const PAID_ENABLED = false;
export const TRIAL_DAYS = 30;
export const PRICES = { teacherPro: 249, teacherProYear: 2490, school: 990, schoolYear: 9900, schoolExtraTeacher: 190, studentPlus: 99, studentPlusYear: 790, family: 149, familyYear: 1490, nmtPack: 299 } as const;

// Скільки днів пробного місяця лишилось (від дати старту)
export function trialLeft(startIso: string | null | undefined, now = Date.now()) {
  if (!startIso) return TRIAL_DAYS;
  const used = Math.floor((now - Date.parse(startIso)) / 864e5);
  return Math.max(0, TRIAL_DAYS - used);
}

// Куди приходять відгуки «Чого не вистачає?» (Telegram-чат власниці, береться з її teacher_settings)
export const OWNER_TEACHER_ID = process.env.OWNER_TEACHER_ID || '';

// Тариф учителя: поки оплат немає, у всіх повний доступ
export function teacherPlan(s: { trial_started_at?: unknown; pro_until?: unknown } | null | undefined): 'pro' | 'start' {
  if (!PAID_ENABLED) return 'pro';
  if (s?.pro_until && Date.parse(String(s.pro_until)) > Date.now()) return 'pro';
  return trialLeft(s?.trial_started_at ? String(s.trial_started_at) : null) > 0 ? 'pro' : 'start';
}
export const START_ACTIVE_STUDENTS = 3;
