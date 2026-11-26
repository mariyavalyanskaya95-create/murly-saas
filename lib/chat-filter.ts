// Фільтр дитячого чату Murly Island. Працює і на сервері (головна перевірка), і в браузері (друга лінія).
// Блокуємо: лайку й образи (англ., укр., рос., транслітом), особисті дані (телефони, пошта, адреси, посилання,
// соцмережі), прохання зустрітися. Список можна доповнювати: додайте корінь слова в BLOCK.
// ROOTS шукаємо будь-де в тексті (однозначна лайка), WORDS лише як окремі слова (з закінченнями),
// щоб не блокувати «father», «skill», «процедура». Список можна доповнювати.
export const ROOTS: string[] = [
  'fuck', 'fuk', 'shit', 'bitch', 'asshole', 'cunt', 'nigg', 'porn', 'blyat', 'pizd', 'ebat', 'nahui', 'nahuy', 'pidor',
  'хуй', 'хуе', 'хуё', 'хую', 'хуя', 'пизд', 'ебат', 'ебал', 'ебан', 'ебуч', 'бля', 'мудак', 'мудил', 'гандон', 'пидор', 'підор', 'пидар', 'шлюх', 'говно', 'гівно', 'порно', 'засранец', 'нахуй',
  'instagram', 'telegram', 'tiktok', 'whatsapp', 'viber', 'snapchat', 'discord', 'facebook', 'youtube', 'vk.com',
];
export const WORDS: string[] = [
  'fck', 'idiot', 'stupid', 'dumb', 'ugly', 'loser', 'kill', 'die', 'dead', 'sex', 'sexy', 'nude', 'naked', 'boobs', 'butt', 'damn', 'wtf', 'stfu', 'moron', 'weirdo', 'fat', 'dick', 'cock', 'pussy', 'whore', 'slut', 'fag', 'retard', 'bastard', 'insta', 'suka', 'blya', 'huy', 'hui', 'debil', 'durak', 'mudak', 'gavno', 'govno',
  'сука', 'сучка', 'ёб', 'йоб', 'еба', 'дебил', 'дебіл', 'идиот', 'ідіот', 'тупой', 'тупая', 'тупий', 'тупа', 'урод', 'жопа', 'срака', 'лох', 'курва', 'заткнись', 'заткнися', 'убью', 'убить', 'вбити', 'сдохни', 'здохни', 'секс', 'голый', 'гола', 'голая', 'дурак', 'дурень', 'дура', 'козел', 'чмо', 'нах', 'отвали', 'відвали', 'адрес', 'адреса', 'телефон', 'номер',
];
export const PHRASES: string[] = [
  'hate you', 'kiss me', 'shut up', 'my address', 'where do you live', 'what school', 'phone number', 'my number', 'call me', 'meet me', 'meet up',
  'вулиця', 'улица', 'зустрінемось', 'встретимся', 'зустрітися', 'встретиться', 'де ти живеш', 'где ты живешь', 'яка школа', 'какая школа', 'дай номер',
];
const PRIVATE = /insta|telegram|tiktok|whats|viber|snap|discord|face|youtube|vk|адрес|телеф|номер|address|live|school|number|phone|call|meet|вулиц|улиц|зустр|встрет|живеш|школа/;
export const BLOCK = [...ROOTS, ...WORDS, ...PHRASES];
const LEET: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's', '!': 'i' };

export function normalize(s: string) {
  return s.toLowerCase().replace(/[013457@$!]/g, (c) => LEET[c] ?? c).replace(/[^\p{L}\s']/gu, '').replace(/(\p{L})\1{2,}/gu, '$1$1');
}

export type FilterResult = { ok: true; text: string } | { ok: false; reason: 'empty' | 'long' | 'bad' | 'private' | 'english' };

export function checkChat(raw: string): FilterResult {
  const text = raw.replace(/\s+/g, ' ').trim();
  if (!text) return { ok: false, reason: 'empty' };
  if (text.length > 120) return { ok: false, reason: 'long' };
  // у чаті пишемо тільки англійською: лише латиниця, цифри й звичайні знаки
  if (/[^\x20-\x7E’‘“”…]/.test(text)) return { ok: false, reason: 'english' };
  // телефони, пошта, посилання, нікнейми
  if (/\d[\d\s\-()]{5,}\d/.test(text) || /\S+@\S+\.\S+/.test(text) || /(https?:|www\.|\.com|\.ua|\.ru|\.net|\.org|t\.me|\bhttp)/i.test(text) || /(^|\s)@\w{3,}/.test(text)) return { ok: false, reason: 'private' };
  const n = ` ${normalize(text)} `; const squashed = n.replace(/\s+/g, '');
  const why = (k: string) => (PRIVATE.test(k) ? 'private' : 'bad') as 'private' | 'bad';
  for (const k of PHRASES) if (n.includes(k)) return { ok: false, reason: why(k) };
  for (const k of ROOTS) if (n.includes(k) || squashed.includes(k)) return { ok: false, reason: why(k) };
  for (const k of WORDS) {
    const cyr = /[а-яіїєґё]/.test(k);
    const re = cyr ? new RegExp(`\\s${k}\\p{L}{0,3}\\s`, 'u') : new RegExp(`\\s${k}(s|es|ed|ing|y|ty)?\\s`, 'u');
    if (re.test(n)) return { ok: false, reason: why(k) };
  }
  return { ok: true, text };
}

export const FILTER_MSG = {
  bad: 'Oops! This message has words we do not use on Murly Island. Please be kind!',
  private: 'Keep it safe! Do not share phone numbers, addresses, links or social media.',
  long: 'This message is too long.',
  english: 'Please write in English! Only English letters work in the island chat.',
  empty: '',
};
