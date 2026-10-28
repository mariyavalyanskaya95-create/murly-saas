// Озвучка англійського тексту: живий голос (Google, MP3 з кешу), а якщо він недоступний, голос браузера.
import type { VoicePreset } from './voices';

let ttsOk: boolean | null = null;
export const ttsUrl = (text: string, voice: VoicePreset) => `/api/tts?v=${voice}&t=${encodeURIComponent(text.slice(0, 1500))}`;
let ttsCheck: Promise<boolean> | null = null;
let current: HTMLAudioElement | null = null;

export function liveVoices(): Promise<boolean> {
  if (ttsOk !== null) return Promise.resolve(ttsOk);
  if (typeof window === 'undefined') return Promise.resolve(false);
  ttsCheck ??= fetch('/api/tts?check=1').then((r) => r.json()).then((j) => (ttsOk = Boolean(j.ok))).catch(() => (ttsOk = false));
  return ttsCheck;
}

// Голос браузера: шукаємо найприродніший (Natural / Neural / Google)
function bestBrowserVoice(lang = 'en-GB') {
  const vs = window.speechSynthesis.getVoices().filter((x) => x.lang.toLowerCase().startsWith('en'));
  const score = (x: SpeechSynthesisVoice) => (/natural|neural|online/i.test(x.name) ? 4 : 0) + (/google/i.test(x.name) ? 2 : 0) + (x.lang === lang ? 1 : 0);
  return vs.sort((a, b) => score(b) - score(a))[0];
}
function browserSay(text: string, rate: number, onEnd?: () => void, pitch = 1) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) { onEnd?.(); return false; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = bestBrowserVoice();
  if (v) u.voice = v;
  u.lang = v?.lang || 'en-GB';
  u.rate = rate; u.pitch = pitch;
  if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
  window.speechSynthesis.speak(u);
  return true;
}

export function stopSpeak() {
  if (current) { current.onended = null; current.pause(); current = null; }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
}

// Сказати фразу живим голосом (preset) або голосом браузера. onEnd викликається в кінці.
export async function say(text: string, opts: { voice?: VoicePreset; slow?: boolean; onEnd?: () => void; pitch?: number } = {}) {
  stopSpeak();
  const rate = opts.slow ? 0.75 : 0.95;
  if (await liveVoices()) {
    const a = new Audio(ttsUrl(text, opts.voice ?? 'narrator'));
    a.playbackRate = opts.slow ? 0.8 : 1;
    current = a;
    let fell = false;
    const fallback = () => { if (fell || current !== a) return; fell = true; current = null; browserSay(text, rate, opts.onEnd, opts.pitch); };
    a.onended = () => { if (current === a) { current = null; opts.onEnd?.(); } };
    a.onerror = fallback;
    try { await a.play(); } catch { fallback(); }
    return true;
  }
  return browserSay(text, rate, opts.onEnd, opts.pitch);
}

// Сумісність зі старим кодом: speakEn(text, rate, onEnd)
export function speakEn(text: string, rate = 1, onEnd?: () => void) {
  if (typeof window === 'undefined') return false;
  say(text, { slow: rate < 0.8, onEnd });
  return true;
}
