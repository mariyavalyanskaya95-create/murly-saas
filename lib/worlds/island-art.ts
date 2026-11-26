// Мальована графіка для Murly Island: плакати, вивіски, граффіті, шпалери. Усе малюється кодом на canvas (своє, без чужих картинок).
import * as THREE from 'three';

type Ctx = CanvasRenderingContext2D;
const tex = (cv: HTMLCanvasElement) => { const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
const canvas = (w: number, h: number) => { const cv = document.createElement('canvas'); cv.width = w; cv.height = h; return [cv, cv.getContext('2d')!] as const; };

// маленькі малюнки
export function icon(x: Ctx, kind: string, cx: number, cy: number, s: number, c: string) {
  x.save(); x.translate(cx, cy); x.fillStyle = c; x.strokeStyle = '#1A1A1A'; x.lineWidth = Math.max(2, s * 0.06); x.lineJoin = 'round';
  const path = (f: () => void) => { x.beginPath(); f(); x.fill(); x.stroke(); };
  if (kind === 'star') path(() => { for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2 - Math.PI / 2; const r = i % 2 ? s * 0.22 : s * 0.5; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); });
  if (kind === 'heart') path(() => { x.moveTo(0, s * 0.35); x.bezierCurveTo(-s * 0.6, -s * 0.05, -s * 0.3, -s * 0.5, 0, -s * 0.2); x.bezierCurveTo(s * 0.3, -s * 0.5, s * 0.6, -s * 0.05, 0, s * 0.35); });
  if (kind === 'cat') { path(() => { x.moveTo(-s * 0.4, -s * 0.1); x.lineTo(-s * 0.35, -s * 0.5); x.lineTo(-s * 0.1, -s * 0.3); x.lineTo(s * 0.1, -s * 0.3); x.lineTo(s * 0.35, -s * 0.5); x.lineTo(s * 0.4, -s * 0.1); x.arc(0, 0, s * 0.42, 0, Math.PI); x.closePath(); });
    x.fillStyle = '#1A1A1A'; [-1, 1].forEach((d) => { x.beginPath(); x.arc(d * s * 0.15, 0, s * 0.05, 0, Math.PI * 2); x.fill(); }); x.beginPath(); x.arc(0, s * 0.12, s * 0.06, 0, Math.PI); x.stroke(); }
  if (kind === 'fish') { path(() => { x.ellipse(0, 0, s * 0.38, s * 0.22, 0, 0, Math.PI * 2); }); path(() => { x.moveTo(s * 0.32, 0); x.lineTo(s * 0.55, -s * 0.2); x.lineTo(s * 0.55, s * 0.2); x.closePath(); }); x.fillStyle = '#1A1A1A'; x.beginPath(); x.arc(-s * 0.2, -s * 0.04, s * 0.04, 0, Math.PI * 2); x.fill(); }
  if (kind === 'cake') { path(() => x.rect(-s * 0.4, -s * 0.05, s * 0.8, s * 0.35)); x.fillStyle = '#FFFFFF'; path(() => x.rect(-s * 0.4, -s * 0.12, s * 0.8, s * 0.12)); x.fillStyle = '#E5484D'; path(() => x.arc(0, -s * 0.2, s * 0.08, 0, Math.PI * 2)); }
  if (kind === 'envelope') { path(() => x.rect(-s * 0.45, -s * 0.28, s * 0.9, s * 0.56)); x.beginPath(); x.moveTo(-s * 0.45, -s * 0.28); x.lineTo(0, s * 0.05); x.lineTo(s * 0.45, -s * 0.28); x.stroke(); }
  if (kind === 'cup') { path(() => { x.moveTo(-s * 0.3, -s * 0.2); x.lineTo(s * 0.3, -s * 0.2); x.lineTo(s * 0.22, s * 0.3); x.lineTo(-s * 0.22, s * 0.3); x.closePath(); }); x.beginPath(); x.arc(s * 0.32, 0, s * 0.12, -Math.PI / 2, Math.PI / 2); x.stroke(); x.beginPath(); x.moveTo(-s * 0.08, -s * 0.3); x.quadraticCurveTo(0, -s * 0.45, s * 0.05, -s * 0.55); x.stroke(); }
  if (kind === 'shirt') path(() => { x.moveTo(-s * 0.2, -s * 0.4); x.lineTo(-s * 0.5, -s * 0.2); x.lineTo(-s * 0.38, 0); x.lineTo(-s * 0.28, -s * 0.08); x.lineTo(-s * 0.28, s * 0.45); x.lineTo(s * 0.28, s * 0.45); x.lineTo(s * 0.28, -s * 0.08); x.lineTo(s * 0.38, 0); x.lineTo(s * 0.5, -s * 0.2); x.lineTo(s * 0.2, -s * 0.4); x.quadraticCurveTo(0, -s * 0.25, -s * 0.2, -s * 0.4); x.closePath(); });
  if (kind === 'bread') { path(() => { x.ellipse(0, 0, s * 0.45, s * 0.25, 0, 0, Math.PI * 2); }); [-0.2, 0, 0.2].forEach((d) => { x.beginPath(); x.moveTo(d * s - s * 0.06, -s * 0.12); x.lineTo(d * s + s * 0.06, s * 0.1); x.stroke(); }); }
  if (kind === 'anchor') { x.lineWidth = s * 0.08; x.strokeStyle = c; x.beginPath(); x.arc(0, -s * 0.38, s * 0.1, 0, Math.PI * 2); x.moveTo(0, -s * 0.28); x.lineTo(0, s * 0.4); x.moveTo(-s * 0.25, -s * 0.12); x.lineTo(s * 0.25, -s * 0.12); x.moveTo(-s * 0.38, s * 0.12); x.quadraticCurveTo(-s * 0.3, s * 0.42, 0, s * 0.42); x.quadraticCurveTo(s * 0.3, s * 0.42, s * 0.38, s * 0.12); x.stroke(); }
  if (kind === 'ice') { x.fillStyle = '#E8B46A'; path(() => { x.moveTo(-s * 0.2, 0); x.lineTo(s * 0.2, 0); x.lineTo(0, s * 0.5); x.closePath(); }); x.fillStyle = c; path(() => x.arc(0, -s * 0.12, s * 0.24, 0, Math.PI * 2)); }
  if (kind === 'balloon') { path(() => x.ellipse(0, -s * 0.1, s * 0.28, s * 0.35, 0, 0, Math.PI * 2)); x.beginPath(); x.moveTo(0, s * 0.25); x.quadraticCurveTo(s * 0.1, s * 0.4, 0, s * 0.55); x.stroke(); }
  if (kind === 'note') { x.lineWidth = s * 0.08; x.strokeStyle = c; x.beginPath(); x.moveTo(s * 0.1, s * 0.25); x.lineTo(s * 0.1, -s * 0.35); x.lineTo(s * 0.35, -s * 0.25); x.stroke(); x.fillStyle = c; x.beginPath(); x.ellipse(-s * 0.02, s * 0.28, s * 0.15, s * 0.11, -0.4, 0, Math.PI * 2); x.fill(); }
  if (kind === 'sun') { x.beginPath(); x.arc(0, 0, s * 0.25, 0, Math.PI * 2); x.fill(); x.stroke(); for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * s * 0.33, Math.sin(a) * s * 0.33); x.lineTo(Math.cos(a) * s * 0.48, Math.sin(a) * s * 0.48); x.stroke(); } }
  x.restore();
}

// плакат: фон, заголовок, кілька рядків і малюнки
export function posterTex(o: { title: string; lines?: string[]; bg: string; fg?: string; icons?: [string, string][]; w?: number; h?: number; frame?: string }) {
  const W = o.w ?? 384, H = o.h ?? 512; const [cv, x] = canvas(W, H);
  x.fillStyle = o.frame ?? '#1A1A1A'; x.fillRect(0, 0, W, H); x.fillStyle = o.bg; x.fillRect(12, 12, W - 24, H - 24);
  x.fillStyle = o.fg ?? '#1A1A1A'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = `900 ${Math.round(W / 7.5)}px system-ui, sans-serif`; x.fillText(o.title, W / 2, H * 0.14, W - 40);
  (o.lines ?? []).forEach((l, i) => { x.font = `700 ${Math.round(W / 13)}px system-ui, sans-serif`; x.fillText(l, W / 2, H * 0.3 + i * (W / 10), W - 40); });
  const ic = o.icons ?? []; ic.forEach(([k, c], i) => icon(x, k, (W / (ic.length + 1)) * (i + 1), H * 0.8, W / (ic.length > 2 ? 4.2 : 3.2), c));
  return tex(cv);
}
// дошка-меню крейдою
export function chalkTex(title: string, lines: string[]) {
  const [cv, x] = canvas(512, 384);
  x.fillStyle = '#8B5E34'; x.fillRect(0, 0, 512, 384); x.fillStyle = '#2E3B32'; x.fillRect(16, 16, 480, 352);
  x.fillStyle = '#FFFFFF'; x.font = '900 52px system-ui, sans-serif'; x.textAlign = 'center'; x.fillText(title, 256, 70);
  x.font = '600 32px system-ui, sans-serif'; x.textAlign = 'left';
  lines.forEach((l, i) => { const [a, b] = l.split('|'); x.fillStyle = ['#FFFFFF', '#FFE08A', '#BDE5C4', '#F7B7C8'][i % 4]; x.fillText(a, 40, 130 + i * 46); if (b) { x.textAlign = 'right'; x.fillText(b, 472, 130 + i * 46); x.textAlign = 'left'; } });
  return tex(cv);
}
// граффіті: товсті кольорові літери з обводкою, бризками й підтьоками
export function graffitiTex(text: string, colors: string[], bg: string | null = null, w = 1024, h = 384) {
  const [cv, x] = canvas(w, h);
  if (bg) { x.fillStyle = bg; x.fillRect(0, 0, w, h); }
  for (let i = 0; i < 40; i++) { x.fillStyle = colors[i % colors.length]; x.globalAlpha = 0.5; x.beginPath(); x.arc(Math.random() * w, Math.random() * h, 2 + Math.random() * 7, 0, Math.PI * 2); x.fill(); }
  x.globalAlpha = 1;
  const size = Math.min(h * 0.62, (w * 1.6) / Math.max(4, text.length));
  x.font = `900 ${size}px "Arial Black", system-ui, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle';
  const chars = [...text]; const total = x.measureText(text).width; let cx = w / 2 - total / 2;
  chars.forEach((ch, i) => {
    const cw = x.measureText(ch).width; const y = h / 2 + Math.sin(i * 1.3) * h * 0.06; const rot = Math.sin(i * 2.1) * 0.12;
    x.save(); x.translate(cx + cw / 2, y); x.rotate(rot);
    x.lineWidth = size * 0.22; x.strokeStyle = '#1A1A1A'; x.lineJoin = 'round'; x.strokeText(ch, 4, 6);
    x.lineWidth = size * 0.12; x.strokeStyle = '#FFFFFF'; x.strokeText(ch, 0, 0);
    const g = x.createLinearGradient(0, -size / 2, 0, size / 2); g.addColorStop(0, colors[i % colors.length]); g.addColorStop(1, colors[(i + 1) % colors.length]);
    x.fillStyle = g; x.fillText(ch, 0, 0);
    // підтьоки фарби
    if (i % 3 === 1) { x.fillStyle = colors[i % colors.length]; x.fillRect(-3, size * 0.3, 6, size * 0.25 + (i % 4) * 6); x.beginPath(); x.arc(0, size * 0.55 + (i % 4) * 6, 5, 0, Math.PI * 2); x.fill(); }
    x.restore(); cx += cw;
  });
  [['star', colors[0]], ['heart', colors[1 % colors.length]]].forEach(([k, c], i) => icon(x, k, i ? w - 60 : 60, i ? h - 60 : 60, 70, c));
  return tex(cv);
}
// шпалери з візерунком
export function wallpaperTex(kind: 'stripes' | 'dots' | 'checks' | 'waves' | 'stars' | 'hearts' | 'bricks', a: string, b: string) {
  const [cv, x] = canvas(256, 256); x.fillStyle = a; x.fillRect(0, 0, 256, 256); x.fillStyle = b; x.strokeStyle = b;
  if (kind === 'stripes') for (let i = 0; i < 8; i += 2) x.fillRect(i * 32, 0, 32, 256);
  if (kind === 'dots') for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 10, 0, Math.PI * 2); x.fill(); }
  if (kind === 'checks') for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) x.fillRect(i * 64, j * 64, 64, 64);
  if (kind === 'waves') { x.lineWidth = 10; for (let j = 0; j < 4; j++) { x.beginPath(); for (let i = 0; i <= 256; i += 8) x.lineTo(i, 32 + j * 64 + Math.sin(i / 20) * 10); x.stroke(); } }
  if (kind === 'stars') for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) icon(x, 'star', 32 + i * 64 + (j % 2) * 32, 32 + j * 64, 26, b);
  if (kind === 'hearts') for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) icon(x, 'heart', 32 + i * 64 + (j % 2) * 32, 32 + j * 64, 30, b);
  if (kind === 'bricks') { x.lineWidth = 4; for (let j = 0; j < 8; j++) { x.beginPath(); x.moveTo(0, j * 32); x.lineTo(256, j * 32); x.stroke(); for (let i = 0; i < 4; i++) { const xx = i * 64 + (j % 2) * 32; x.beginPath(); x.moveTo(xx, j * 32); x.lineTo(xx, j * 32 + 32); x.stroke(); } } }
  const t = tex(cv); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
// світна вивіска-«неон»
export function neonTex(text: string, color: string) {
  const [cv, x] = canvas(512, 160);
  x.fillStyle = '#1E1E2A'; x.beginPath(); x.roundRect(4, 4, 504, 152, 30); x.fill();
  x.font = '900 84px system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 30; x.fillStyle = color; x.fillText(text, 256, 84, 470); x.shadowBlur = 10; x.fillStyle = '#FFFFFF'; x.globalAlpha = 0.6; x.fillText(text, 256, 84, 470);
  return tex(cv);
}
