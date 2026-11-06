'use client';
// Гра «Make a room»: дитина розставляє наліпки в кімнаті, а потім описує її англійською.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useT } from '../LangProvider';
import { ROOMS, STICKERS, TABS } from '@/lib/sticker-room';
import { say, stopSpeak } from '@/lib/speak';

type Item = { u: number; id: string; x: number; y: number; s: number; f: boolean };
const KEY = (r: string) => `murly-sticker-${r}`;
// головне слово, за яким перевіряємо опис
const NOUN: Record<string, string> = { teddy: 'teddy', fish: 'fish', bird: 'bird', coffee: 'coffee machine', menu: 'menu', fruit: 'fruit', icecream: 'ice cream', shelf: 'shelf', pizza: 'pizza' };
const noun = (id: string) => NOUN[id] ?? id;
const nameOf = (id: string) => STICKERS[id].en.replace(/^(a|an) /, '');
const PHRASES = ['There is', 'There are', 'next to the', 'on the', 'under the', 'in front of the', 'behind the', 'on the left', 'on the right', 'in the middle', 'on the wall', 'near the window'];

function load(r: string): Item[] {
  try { return JSON.parse(localStorage.getItem(KEY(r)) || '[]'); } catch { return []; }
}

// Підказка Murly: речення з того, що стоїть у кімнаті
function example(items: Item[]): string {
  const big = items.filter((i) => !STICKERS[i.id].wall && STICKERS[i.id].w >= 75);
  return items.slice().sort((a, b) => a.y - b.y).map((i) => {
    const st = STICKERS[i.id];
    if (st.wall) return `There is ${st.en} on the wall.`;
    if (st.w < 75) {
      const host = big.find((b) => { const half = (STICKERS[b.id].w * b.s) / 8; const h = (STICKERS[b.id].w * b.s) / 3.4; return Math.abs(b.x - i.x) < half && i.y < b.y - h * 0.25 && i.y > b.y - h * 0.95; });
      if (host) return `There is ${st.en} on the ${nameOf(host.id)}.`;
    }
    const near = st.w >= 75 ? undefined : items.filter((o) => o !== i && !STICKERS[o.id].wall).map((o) => ({ o, d: Math.hypot(o.x - i.x, (o.y - i.y) * 1.2) })).sort((a, b) => a.d - b.d)[0];
    if (near && near.d < 22) return `There is ${st.en} next to the ${nameOf(near.o.id)}.`;
    const side = i.x < 36 ? 'on the left' : i.x > 64 ? 'on the right' : 'in the middle';
    return `There is ${st.en} ${side}.`;
  }).join(' ');
}

export default function StickerRoom() {
  const t = useT();
  const [room, setRoom] = useState('bedroom');
  const [items, setItems] = useState<Item[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [tab, setTab] = useState<string>('furniture');
  const [text, setText] = useState('');
  const [check, setCheck] = useState<null | { ok: string[]; miss: string[] }>(null);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<null | { u: number; dx: number; dy: number; moved: boolean }>(null);
  const pending = useRef<string | null>(null);
  const uid = useRef(1);
  const loaded = useRef(false);

  useEffect(() => { const it = load(room); uid.current = it.reduce((m, i) => Math.max(m, i.u), 0) + 1; setItems(it); setSel(null); setCheck(null); try { setText(localStorage.getItem(KEY(room) + '-text') || ''); } catch { setText(''); } loaded.current = true; }, [room]);
  useEffect(() => { if (!loaded.current) return; try { localStorage.setItem(KEY(room), JSON.stringify(items)); } catch { /* ignore */ } }, [items, room]);
  useEffect(() => { try { localStorage.setItem(KEY(room) + '-text', text); } catch { /* ignore */ } }, [text, room]);
  useEffect(() => () => stopSpeak(), []);

  const pos = (e: { clientX: number; clientY: number }) => {
    const r = stage.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom };
  };
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  const add = (id: string, x?: number, y?: number) => {
    const st = STICKERS[id];
    let px = x, py = y;
    if (px === undefined || py === undefined) {
      // вільне місце: з кількох випадкових точок беремо найдальшу від інших наліпок
      let best = { x: 50, y: st.wall ? 32 : 78, d: -1 };
      for (let k = 0; k < 16; k++) {
        const cx = 22 + Math.random() * 56, cy = st.wall ? 26 + Math.random() * 14 : 64 + Math.random() * 28;
        const d = Math.min(99, ...items.map((o) => Math.hypot(o.x - cx, o.y - cy)));
        if (d > best.d) best = { x: cx, y: cy, d };
      }
      px = best.x; py = best.y;
    }
    const it: Item = { u: uid.current++, id, x: px, y: py, s: 1, f: false };
    setItems((l) => [...l, it]); setSel(it.u); setCheck(null);
    return it;
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (pending.current && stage.current) {
        const p = pos(e);
        if (p.inside) { const it = add(pending.current, p.x, p.y + 6); pending.current = null; drag.current = { u: it.u, dx: 0, dy: 6, moved: true }; }
        return;
      }
      const d = drag.current; if (!d || !stage.current) return;
      const p = pos(e); d.moved = true;
      setItems((l) => l.map((i) => (i.u === d.u ? { ...i, x: clamp(p.x + d.dx, 2, 98), y: clamp(p.y + d.dy, 8, 100) } : i)));
    };
    const up = () => {
      const d = drag.current;
      if (d && !d.moved) { const it = items.find((i) => i.u === d.u); if (it) say(STICKERS[it.id].en); }
      drag.current = null; setTimeout(() => { pending.current = null; }, 0);
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  });

  const selItem = items.find((i) => i.u === sel);
  const upd = (patch: Partial<Item>) => setItems((l) => l.map((i) => (i.u === sel ? { ...i, ...patch } : i)));
  const placed = useMemo(() => [...new Set(items.map((i) => i.id))], [items]);

  const doCheck = () => {
    const low = ` ${text.toLowerCase()} `;
    const ok: string[] = [], miss: string[] = [];
    placed.forEach((id) => (low.includes(noun(id)) ? ok : miss).push(nameOf(id)));
    setCheck({ ok, miss });
    if (ok.length && !miss.length) say('Great job!');
  };
  const insert = (w: string) => setText((s) => (s && !/\s$/.test(s) ? s + ' ' : s) + w + ' ');

  const savePng = () => {
    const parts = items.slice().sort((a, b) => (STICKERS[a.id].wall === STICKERS[b.id].wall ? a.y - b.y : STICKERS[a.id].wall ? -1 : 1)).map((i) => {
      const st = STICKERS[i.id]; const w = st.w * i.s; const x = i.x * 4 - w / 2; const y = i.y * 3.4 - w;
      return `<svg x="${x}" y="${y}" width="${w}" height="${w}" viewBox="0 0 100 100"><g transform="${i.f ? 'translate(100 0) scale(-1 1)' : ''}">${st.svg}</g></svg>`;
    }).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1020" viewBox="0 0 400 340"><rect width="400" height="340" fill="#EEF0FA"/>${ROOMS[room].svg}${parts}</svg>`;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = 1200; c.height = 1020;
      c.getContext('2d')!.drawImage(img, 0, 0);
      const a = document.createElement('a'); a.download = `murly-${room}.png`; a.href = c.toDataURL('image/png'); a.click();
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  return (
    <div className="sr">
      <div className="g-chips sr-rooms">
        {Object.entries(ROOMS).map(([id, r]) => <button key={id} type="button" className={`g-chip ${room === id ? 'is-on' : ''}`} onClick={() => setRoom(id)}>{t(r)}</button>)}
      </div>

      <div className="sr-main">
        <div className="sr-left">
          <div className="sr-stage" ref={stage} onPointerDown={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('sr-bg')) setSel(null); }}>
            <svg className="sr-bg" viewBox="0 0 400 340" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ROOMS[room].svg }} />
            {items.map((i) => {
              const st = STICKERS[i.id];
              return (
                <button key={i.u} type="button" aria-label={st.en}
                  className={`sr-item ${sel === i.u ? 'is-sel' : ''}`}
                  style={{ left: `${i.x}%`, top: `${i.y}%`, width: `${(st.w * i.s) / 4}%`, zIndex: st.wall ? 2 : 10 + Math.round(i.y * 10) + (sel === i.u ? 2000 : 0) }}
                  onPointerDown={(e) => { e.preventDefault(); setSel(i.u); const p = pos(e); drag.current = { u: i.u, dx: i.x - p.x, dy: i.y - p.y, moved: false }; }}>
                  <svg viewBox="0 0 100 100" style={{ transform: i.f ? 'scaleX(-1)' : undefined }} dangerouslySetInnerHTML={{ __html: st.svg }} />
                </button>
              );
            })}
            {!items.length && <p className="sr-empty">{t({ uk: 'Перетягни наліпки знизу в кімнату', ru: 'Перетащи наклейки снизу в комнату', en: 'Drag stickers from below into the room' })}</p>}
          </div>

          <div className="sr-tools" aria-live="polite">
            {selItem ? (
              <>
                <button type="button" className="sr-say" onClick={() => say(STICKERS[selItem.id].en)}>{STICKERS[selItem.id].en}</button>
                <span className="t-muted">{t(STICKERS[selItem.id])}</span>
                <span className="sr-tools__btns">
                  <button type="button" className="mu-btn t-btn-sm" onClick={() => upd({ s: Math.max(0.5, +(selItem.s - 0.15).toFixed(2)) })} aria-label={t({ uk: 'Менше', ru: 'Меньше', en: 'Smaller' })}>−</button>
                  <button type="button" className="mu-btn t-btn-sm" onClick={() => upd({ s: Math.min(2, +(selItem.s + 0.15).toFixed(2)) })} aria-label={t({ uk: 'Більше', ru: 'Больше', en: 'Bigger' })}>+</button>
                  <button type="button" className="mu-btn t-btn-sm" onClick={() => upd({ f: !selItem.f })}>{t({ uk: 'Розвернути', ru: 'Развернуть', en: 'Flip' })}</button>
                  <button type="button" className="mu-btn t-btn-sm" onClick={() => { setItems((l) => l.filter((i) => i.u !== sel)); setSel(null); }}>{t({ uk: 'Прибрати', ru: 'Убрать', en: 'Remove' })}</button>
                </span>
              </>
            ) : (
              <span className="t-muted">{t({ uk: 'Натисни на наліпку, щоб почути слово, змінити розмір або розвернути.', ru: 'Нажми на наклейку, чтобы услышать слово, изменить размер или развернуть.', en: 'Tap a sticker to hear the word, resize or flip it.' })}</span>
            )}
          </div>

          <div className="sr-tray">
            <div className="g-chips">
              {TABS.map((x) => <button key={x.id} type="button" className={`g-chip ${tab === x.id ? 'is-on' : ''}`} onClick={() => setTab(x.id)}>{t(x)}</button>)}
            </div>
            <div className="sr-tray__list">
              {Object.entries(STICKERS).filter(([, s]) => s.tab === tab).map(([id, s]) => (
                <button key={id} type="button" className="sr-pick" title={s.en}
                  onPointerDown={(e) => { e.preventDefault(); pending.current = id; }}
                  onClick={() => { if (pending.current === id) { pending.current = null; add(id); } }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); add(id); } }}>
                  <svg viewBox="0 0 100 100" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s.svg }} />
                  <small>{s.en.replace(/^(a|an) /, '')}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sr-desc">
          <h2>{t({ uk: 'Опиши свою кімнату', ru: 'Опиши свою комнату', en: 'Describe your room' })}</h2>
          <p className="t-muted">{t({ uk: 'Напиши англійською, що де стоїть. Натискай на слова, щоб вставити їх у текст.', ru: 'Напиши по-английски, что где стоит. Нажимай на слова, чтобы вставить их в текст.', en: 'Write in English what is where. Tap the words to add them.' })}</p>
          <div className="sr-chips">
            {PHRASES.map((p) => <button key={p} type="button" className="sr-chip" onClick={() => insert(p)}>{p}</button>)}
          </div>
          {!!placed.length && (
            <div className="sr-chips">
              {placed.map((id) => <button key={id} type="button" className="sr-chip sr-chip--word" onClick={() => insert(STICKERS[id].en)}>{STICKERS[id].en}</button>)}
            </div>
          )}
          <textarea className="sr-text" rows={6} value={text} onChange={(e) => { setText(e.target.value); setCheck(null); }} placeholder="There is a bed on the left. There is a cat on the bed..." />
          <div className="t-head__actions" style={{ flexWrap: 'wrap' }}>
            <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={doCheck} disabled={!items.length || !text.trim()}>{t({ uk: 'Перевірити', ru: 'Проверить', en: 'Check' })}</button>
            <button type="button" className="mu-btn t-btn-sm" onClick={() => say(text, { slow: true })} disabled={!text.trim()}>{t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}</button>
            <button type="button" className="mu-btn t-btn-sm" onClick={() => setText(example(items))} disabled={!items.length}>{t({ uk: 'Приклад від Murly', ru: 'Пример от Murly', en: 'Murly example' })}</button>
          </div>
          {check && (
            <p className="sr-check">
              {check.miss.length
                ? <>{t({ uk: `Ти описав ${check.ok.length} з ${check.ok.length + check.miss.length}. Ще не згадано:`, ru: `Ты описал ${check.ok.length} из ${check.ok.length + check.miss.length}. Ещё не упомянуто:`, en: `You described ${check.ok.length} of ${check.ok.length + check.miss.length}. Not mentioned yet:` })} <b>{check.miss.join(', ')}</b></>
                : <b>{t({ uk: 'Чудово! Ти описав усе, що є в кімнаті.', ru: 'Отлично! Ты описал всё, что есть в комнате.', en: 'Great! You described everything in the room.' })}</b>}
            </p>
          )}
          <div className="sr-foot">
            <button type="button" className="mu-textlink" onClick={savePng} disabled={!items.length}>{t({ uk: 'Зберегти картинку', ru: 'Сохранить картинку', en: 'Save picture' })}</button>
            <button type="button" className="mu-textlink" onClick={() => { if (confirm(t({ uk: 'Очистити кімнату?', ru: 'Очистить комнату?', en: 'Clear the room?' }))) { setItems([]); setText(''); setSel(null); setCheck(null); } }} disabled={!items.length && !text}>{t({ uk: 'Почати заново', ru: 'Начать заново', en: 'Start again' })}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
