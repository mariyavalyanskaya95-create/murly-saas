// Живий голос на сервері: синтез у Google і кеш у Supabase Storage (один раз на фразу)
import { createHash } from 'crypto';
import { Mp3Encoder } from '@breezystack/lamejs';
import { VOICES, type VoicePreset } from './voices';

const URL_ = process.env.SUPABASE_URL || '';
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const TTS = () => process.env.GOOGLE_TTS_API_KEY || '';
const BUCKET = 'lesson-files';
const SR = 24000;

// WAV (LINEAR16) -> MP3 96 kbps: прибираємо «булькання» стисненого 32 kbps,
// нормалізуємо до -1.5 dB, щоб не було перевантаження, і робимо м’які краї без клацань.
function toMp3(wav: Buffer): Buffer {
  let off = 12, dataOff = 44, dataLen = wav.length - 44;
  while (off + 8 <= wav.length) {
    const id = wav.toString('ascii', off, off + 4); const len = wav.readUInt32LE(off + 4);
    if (id === 'data') { dataOff = off + 8; dataLen = Math.min(len, wav.length - dataOff); break; }
    off += 8 + len + (len & 1);
  }
  const n = Math.floor(dataLen / 2);
  const pcm = new Int16Array(n);
  let peak = 1;
  for (let i = 0; i < n; i++) { const s = wav.readInt16LE(dataOff + i * 2); pcm[i] = s; const a = Math.abs(s); if (a > peak) peak = a; }
  const gain = Math.min(1.5, (32767 * 0.84) / peak); // -1.5 dB від максимуму
  const fade = Math.min(Math.floor(SR * 0.012), Math.floor(n / 4));
  for (let i = 0; i < n; i++) {
    let g = gain;
    if (i < fade) g *= i / fade; else if (i >= n - fade) g *= (n - 1 - i) / fade;
    pcm[i] = Math.max(-32768, Math.min(32767, Math.round(pcm[i] * g)));
  }
  const enc = new Mp3Encoder(1, SR, 96);
  const parts: Uint8Array[] = [];
  for (let i = 0; i < n; i += 1152) { const b = enc.encodeBuffer(pcm.subarray(i, i + 1152)); if (b.length) parts.push(b); }
  parts.push(enc.flush());
  return Buffer.concat(parts.map((p) => Buffer.from(p.buffer, p.byteOffset, p.length)));
}

export const ttsReady =() => Boolean(TTS() && URL_ && KEY);

export function ttsPath(text: string, v: VoicePreset, slow: boolean) {
  const voice = VOICES[v];
  void slow; // повільніше: у плеєрі (playbackRate), файл один
  const rate = voice.rate ?? 1;
  // q2: чистий звук (PCM від Google, власне MP3 96 kbps, запас гучності, м’які краї)
  const hash = createHash('sha1').update(`q2|${voice.name}|${voice.pitch ?? 0}|${rate}|${text}`).digest('hex');
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
    body: JSON.stringify({ input: { text }, voice: { languageCode: voice.lang, name: voice.name }, audioConfig: { audioEncoding: 'LINEAR16', sampleRateHertz: SR, ...(voice.rate ? { speakingRate: rate } : {}), ...(voice.pitch ? { pitch: voice.pitch } : {}) } }),
  }).catch(() => null);
  if (!r || !r.ok) { console.error('tts', r?.status, await r?.text().catch(() => '')); return null; }
  const j = await r.json() as { audioContent?: string };
  if (!j.audioContent) return null;
  const buf = toMp3(Buffer.from(j.audioContent, 'base64'));
  const up = await fetch(`${URL_}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST', headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'audio/mpeg', 'x-upsert': 'true' }, body: new Uint8Array(buf),
  }).catch(() => null);
  return up && up.ok ? { url: pub } : { buf };
}
