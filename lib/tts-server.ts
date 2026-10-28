// Живий голос на сервері: синтез у Google і кеш у Supabase Storage (один раз на фразу)
import { createHash } from 'crypto';
import { VOICES, type VoicePreset } from './voices';

const URL_ = process.env.SUPABASE_URL || '';
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const TTS = () => process.env.GOOGLE_TTS_API_KEY || '';
const BUCKET = 'lesson-files';
export const ttsReady = () => Boolean(TTS() && URL_ && KEY);

export function ttsPath(text: string, v: VoicePreset, slow: boolean) {
  const voice = VOICES[v];
  void slow; // повільніше: у плеєрі (playbackRate), файл один
  const rate = voice.rate ?? 1;
  const hash = createHash('sha1').update(`${voice.name}|${voice.pitch ?? 0}|${rate}|${text}`).digest('hex');
  const path = `tts/${hash.slice(0, 2)}/${hash}.mp3`;
  return { voice, rate, path, pub: `${URL_}/storage/v1/object/public/${BUCKET}/${path}` };
}

export async function ttsCached(pub: string) {
  const head = await fetch(pub, { method: 'HEAD', cache: 'no-store' }).catch(() => null);
  return Boolean(head && head.ok);
}

// Синтезувати й зберегти. Повертає публічне посилання або MP3-буфер, якщо зберегти не вдалося.
export async function ttsMake(text: string, v: VoicePreset, slow: boolean): Promise<{ url?: string; buf?: Buffer } | null> {
  if (!ttsReady()) return null;
  const { voice, rate, path, pub } = ttsPath(text, v, slow);
  const r = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${TTS()}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: { text }, voice: { languageCode: voice.lang, name: voice.name }, audioConfig: { audioEncoding: 'MP3', ...(voice.rate ? { speakingRate: rate } : {}), ...(voice.pitch ? { pitch: voice.pitch } : {}) } }),
  }).catch(() => null);
  if (!r || !r.ok) { console.error('tts', r?.status, await r?.text().catch(() => '')); return null; }
  const j = await r.json() as { audioContent?: string };
  if (!j.audioContent) return null;
  const buf = Buffer.from(j.audioContent, 'base64');
  const up = await fetch(`${URL_}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST', headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'audio/mpeg', 'x-upsert': 'true' }, body: buf,
  }).catch(() => null);
  return up && up.ok ? { url: pub } : { buf };
}
