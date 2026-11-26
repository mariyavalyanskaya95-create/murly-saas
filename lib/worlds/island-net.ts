// Гра по мережі на Murly Island: Supabase Realtime (broadcast), без власного сервера.
// Ключ публічний (publishable): усі таблиці закриті RLS, тож він відкриває тільки канали реального часу.
// Чат лише готовими фразами англійською, без вільного тексту: безпечно для дітей і корисно для мови.
const URL_ = 'wss://tdnfxrlucrafijwgmxmb.supabase.co/realtime/v1/websocket';
const KEY = 'sb_publishable_0YW6jT49gtY_5SMYhy8S8Q_qctOFuep';

export type NetPlayer = { id: string; n: string; x: number; z: number; r: number; room?: string | null; o?: Record<string, string | undefined>; ride?: string | null; pet?: string | null; prof?: string; lv?: string };
type Handlers = { onPlayer: (p: NetPlayer) => void; onLeave: (id: string) => void; onSay: (id: string, text: string) => void; onEvent: (id: string, ev: string, data: Record<string, unknown>) => void; onStatus?: (ok: boolean) => void };

export class IslandNet {
  ws: WebSocket | null = null; ref = 1; joined = false; hb = 0; topic: string; id: string; h: Handlers; closed = false; retry = 0;
  constructor(id: string, h: Handlers, room = 'island-1') { this.id = id; this.h = h; this.topic = `realtime:murly-${room}`; this.connect(); }
  connect() {
    if (this.closed) return;
    const ws = new WebSocket(`${URL_}?apikey=${KEY}&vsn=1.0.0`); this.ws = ws;
    ws.onopen = () => { this.raw('phx_join', { config: { broadcast: { self: false }, presence: { key: this.id }, private: false } }); };
    ws.onmessage = (m) => {
      let d: { event: string; payload: { event?: string; payload?: Record<string, unknown>; status?: string } ; ref?: string };
      try { d = JSON.parse(String(m.data)); } catch { return; }
      if (d.event === 'phx_reply' && d.payload?.status === 'ok' && !this.joined) { this.joined = true; this.retry = 0; this.h.onStatus?.(true); this.send('hello', {}); }
      if (d.event !== 'broadcast' || !d.payload?.payload) return;
      const p = d.payload.payload as Record<string, unknown>; const from = String(p.id ?? ''); if (!from || from === this.id) return;
      const ev = d.payload.event;
      if (ev === 'pos') this.h.onPlayer(p as unknown as NetPlayer);
      else if (ev === 'bye') this.h.onLeave(from);
      else if (ev === 'say') this.h.onSay(from, String(p.text ?? '').slice(0, 80));
      else this.h.onEvent(from, String(ev), p);
    };
    ws.onclose = () => { this.joined = false; this.h.onStatus?.(false); window.clearInterval(this.hb); if (!this.closed) window.setTimeout(() => this.connect(), Math.min(15000, 1000 * 2 ** this.retry++)); };
    ws.onerror = () => { try { ws.close(); } catch { /* */ } };
    window.clearInterval(this.hb);
    this.hb = window.setInterval(() => { if (this.ws?.readyState === 1) this.ws.send(JSON.stringify({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: String(this.ref++) })); }, 25000);
  }
  raw(event: string, payload: unknown) { if (this.ws?.readyState === 1) this.ws.send(JSON.stringify({ topic: this.topic, event, payload, ref: String(this.ref++) })); }
  send(event: string, payload: Record<string, unknown>) { if (this.joined) this.raw('broadcast', { type: 'broadcast', event, payload: { ...payload, id: this.id } }); }
  close() { this.send('bye', {}); this.closed = true; window.clearInterval(this.hb); try { this.ws?.close(); } catch { /* */ } }
}

// готові фрази для чату
export const CHAT: { cat: string; items: string[] }[] = [
  { cat: 'Hello', items: ['Hi!', 'Hello! Nice to meet you!', 'Good morning!', 'Good evening!', 'Welcome to Murly Island!', 'Hi! Can we be friends?'] },
  { cat: 'Questions', items: ["What's your cat's name?", 'What job do you have?', "What's your favourite colour?", "What's your favourite food?", 'Do you like this island?', 'Do you want to play?', 'Where are you going?', 'Can you help me?', 'Have you got a pet?', 'How are you?'] },
  { cat: 'Answers', items: ["I'm fine, thanks!", 'Yes, I do!', "No, I don't.", 'Yes, please!', 'No, thank you.', "My favourite colour is blue.", "My favourite colour is pink.", "My favourite colour is green.", 'I love pizza!', 'I love ice cream!', "I'm a baker.", "I'm a taxi driver.", "I'm a postman.", 'Yes, I have a puppy!', "I'm going to the beach.", "I'm going to the cafe."] },
  { cat: 'Play', items: ["Let's play hide and seek!", "Let's dance!", "Let's go to the beach!", "Let's go fishing!", "Let's have a race!", 'Follow me!', 'Wait for me!', 'Come to my house!', 'Look at my new clothes!', 'Nice hat!'] },
  { cat: 'Feelings', items: ['Great!', 'Cool!', 'Wow!', 'Ha ha ha!', 'Thank you!', "You're welcome!", 'Sorry!', 'Oops!', 'Well done!', 'I love it!'] },
  { cat: 'Bye', items: ['Bye!', 'See you later!', 'See you tomorrow!', 'I have to go now. Bye!', 'Have a nice day!'] },
];
