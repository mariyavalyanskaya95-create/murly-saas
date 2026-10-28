// Живі голоси (Google Cloud Text-to-Speech, Neural2). Ключ GOOGLE_TTS_API_KEY вводить власниця сайту у Vercel.
export type VoicePreset = 'narrator' | 'woman' | 'man' | 'woman2' | 'man2' | 'girl' | 'boy' | 'old' | 'us_woman' | 'us_man';
// Ключ підключено: GOOGLE_TTS_API_KEY у Vercel (проєкт Google Cloud «Murly»).
export const VOICES: Record<VoicePreset, { lang: string; name: string; pitch: number; rate: number }> = {
  narrator: { lang: 'en-GB', name: 'en-GB-Neural2-C', pitch: 0, rate: 0.95 },
  woman: { lang: 'en-GB', name: 'en-GB-Neural2-A', pitch: 0, rate: 1 },
  man: { lang: 'en-GB', name: 'en-GB-Neural2-B', pitch: 0, rate: 1 },
  woman2: { lang: 'en-GB', name: 'en-GB-Neural2-F', pitch: 0, rate: 1 },
  man2: { lang: 'en-GB', name: 'en-GB-Neural2-D', pitch: 0, rate: 1 },
  girl: { lang: 'en-GB', name: 'en-GB-Neural2-A', pitch: 4, rate: 1.05 },
  boy: { lang: 'en-GB', name: 'en-GB-Neural2-B', pitch: 3.5, rate: 1.05 },
  old: { lang: 'en-GB', name: 'en-GB-Neural2-D', pitch: -3, rate: 0.9 },
  us_woman: { lang: 'en-US', name: 'en-US-Neural2-F', pitch: 0, rate: 1 },
  us_man: { lang: 'en-US', name: 'en-US-Neural2-J', pitch: 0, rate: 1 },
};
export const isPreset = (v: string): v is VoicePreset => v in VOICES;
// для діалогів без явних голосів: диктор, потім чергуємо жіночі й чоловічі
export const ROTATION: VoicePreset[] = ['woman', 'man', 'woman2', 'man2', 'us_woman', 'us_man'];
