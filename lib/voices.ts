// Живі голоси (Google Cloud Text-to-Speech, Neural2). Ключ GOOGLE_TTS_API_KEY вводить власниця сайту у Vercel.
export type VoicePreset = 'narrator' | 'woman' | 'man' | 'woman2' | 'man2' | 'girl' | 'boy' | 'old' | 'us_woman' | 'us_man';
// Chirp 3 HD: найприродніші голоси Google (без «скляного» звуку). Швидкість міняємо в плеєрі, не в синтезі.
export const VOICES: Record<VoicePreset, { lang: string; name: string; pitch?: number; rate?: number }> = {
  narrator: { lang: 'en-GB', name: 'en-GB-Chirp3-HD-Aoede' },
  woman: { lang: 'en-GB', name: 'en-GB-Chirp3-HD-Kore' },
  man: { lang: 'en-GB', name: 'en-GB-Chirp3-HD-Orus' },
  woman2: { lang: 'en-GB', name: 'en-GB-Chirp3-HD-Leda' },
  man2: { lang: 'en-GB', name: 'en-GB-Chirp3-HD-Charon' },
  girl: { lang: 'en-GB', name: 'en-GB-Chirp3-HD-Zephyr' },
  boy: { lang: 'en-GB', name: 'en-GB-Chirp3-HD-Puck' },
  old: { lang: 'en-GB', name: 'en-GB-Chirp3-HD-Algenib' },
  us_woman: { lang: 'en-US', name: 'en-US-Chirp3-HD-Kore' },
  us_man: { lang: 'en-US', name: 'en-US-Chirp3-HD-Charon' },
};
export const isPreset = (v: string): v is VoicePreset => v in VOICES;
// для діалогів без явних голосів: диктор, потім чергуємо жіночі й чоловічі
export const ROTATION: VoicePreset[] = ['woman', 'man', 'woman2', 'man2', 'us_woman', 'us_man'];

// Голос за іменем персонажа: чоловічі імена → чоловічі голоси, жіночі → жіночі.
// idx: порядковий номер серед персонажів цієї статі, щоб двоє чоловіків звучали по-різному.
const MALE = /^(mr|dad|father|grandpa|grandad|uncle|boy|man|sir|king|prince|captain|waiter|tom|max|sam|mark|dan|den|alex|leo|tim|nazar|dima|ben|jack|oleh|ivan|taras|andriy|john|mike|paul|peter|nick|josh|liam|noah|oliver|harry|james|tony|kyle|david|daniel|adam|ryan|matt|chris|steve|bob|joe|rex|igor|bohdan|maksym|denys|artem|roman|yurii|serhii)\b/i;
const FEMALE = /^(mrs|ms|miss|mum|mom|mother|grandma|granny|aunt|girl|woman|queen|princess|lily|kate|emma|ann|anne|sue|olha|kira|lena|marta|sofia|mia|zoe|amy|lucy|ellie|chloe|grace|eve|rose|jess|jessica|sarah|helen|mary|alice|ella|olivia|emily|nina|ira|olena|iryna|yulia|daria|maria|anna|katya|vika|alina|polina|tanya|natalia|oksana)\b/i;
export function genderOf(name: string): 'm' | 'f' | '' {
  const n = name.trim();
  if (MALE.test(n)) return 'm';
  if (FEMALE.test(n)) return 'f';
  if (/a$/i.test(n.split(' ')[0])) return 'f';
  return '';
}
export function voicesForSpeakers(speakers: string[]): Record<string, VoicePreset> {
  const F: VoicePreset[] = ['woman', 'woman2', 'us_woman'];
  const M: VoicePreset[] = ['man', 'man2', 'us_man'];
  let f = 0, m = 0;
  const out: Record<string, VoicePreset> = {};
  speakers.filter(Boolean).forEach((s, i) => {
    const g = genderOf(s) || (i % 2 ? 'm' : 'f');
    out[s] = g === 'f' ? F[f++ % F.length] : M[m++ % M.length];
  });
  return out;
}
