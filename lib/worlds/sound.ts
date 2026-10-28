import { say as speak } from '@/lib/speak';
// Звуки ігор (WebAudio, без файлів) і озвучка англійських слів
let ctx: AudioContext | null = null;
function beep(freqs: number[], dur = 0.09, type: OscillatorType = 'triangle', vol = 0.12) {
  try {
    ctx = ctx ?? new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = ctx!.createOscillator(), g = ctx!.createGain();
      const t = ctx!.currentTime + i * dur;
      o.type = type; o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur * 1.6);
      o.connect(g).connect(ctx!.destination); o.start(t); o.stop(t + dur * 1.7);
    });
  } catch { /* без звуку */ }
}
export const sfx = {
  pop: () => beep([520, 780], 0.06),
  pick: () => beep([660], 0.05, 'sine', 0.08),
  bad: () => beep([220, 180], 0.08, 'square', 0.05),
  coin: () => beep([880, 1320, 1760], 0.07, 'sine', 0.1),
  paint: () => beep([440, 550, 660], 0.05, 'sine', 0.08),
};
// Озвучка англійських слів живим голосом (з кешу), запасний варіант: голос браузера
export function say(text: string) { void speak(text, { voice: 'narrator' }).catch(() => {}); }
// артикль: some для множини (candles, carrots), an перед голосною
export const art = (w: string) => {
  if (/^(two|three|four|five)\b/i.test(w)) return 'the';
  const head = w.split(' of ')[0].trim().split(' ').pop() ?? '';
  if (/^(grass|hay|food|water)$/i.test(head) || (/s$/i.test(head) && !/(ss|us|is)$/i.test(head))) return 'some';
  return /^[aeiou]/i.test(w) ? 'an' : 'a';
};
