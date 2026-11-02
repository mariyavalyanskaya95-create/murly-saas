// Автоперевірка ІІ: відповіді без ключа (переклад, пропуски без [відповіді], відкриті питання).
// Працює лише для власниці (teacher_settings.is_owner) і лише коли у Vercel додано ANTHROPIC_API_KEY.
import { db } from './db';
import { manualKeys, type Answers, type Section } from './exercise';

export type AiNote = { ok: boolean; fix?: string; why?: string };
const MODEL = process.env.AI_CHECK_MODEL || 'claude-haiku-5-5';

export const aiReady = () => Boolean(process.env.ANTHROPIC_API_KEY);

export async function isOwnerTeacher(teacherId: string) {
  const r = await db.query(`teacher_settings?teacher_id=eq.${encodeURIComponent(teacherId)}&select=is_owner`).catch(() => []);
  return r[0]?.is_owner === true;
}

// Текст завдання для слоту: речення з ___ на місці пропуску
function itemText(sections: Section[], key: string) {
  const [si, ti, pi] = key.split('.').map(Number);
  const s = sections[si]; const t = s?.tasks[ti];
  if (!s || !t) return null;
  const sentence = t.prompt ?? (t.parts ?? []).map((p, i) => (p.t === 'text' ? p.v : i === pi ? '___' : '…')).join('');
  return { instruction: s.instruction, type: s.type, sentence: sentence.trim() };
}

export async function aiCheck(sections: Section[], answers: Answers, skip: Record<string, boolean> = {}) {
  if (!aiReady()) return null;
  const keys = manualKeys(sections, answers).filter((k) => !(k in skip)).slice(0, 80);
  if (!keys.length) return {};
  const items = keys.map((k) => ({ k, ...itemText(sections, k), answer: String(answers[k] ?? '').trim() })).filter((x) => x.sentence);
  const prompt = `You are an experienced English teacher checking a student's homework (the student is Ukrainian or Russian-speaking).
For each item decide if the student's answer is correct and natural. Accept any correct variant, ignore capitalisation, trailing punctuation and minor typos that do not change the word. For translations accept any accurate, natural English translation (British or American).
If wrong, give the shortest correct answer in "fix" and a very short reason in Russian in "why" (max 12 words). If correct, omit fix and why.
Return ONLY a JSON array: [{"k":"...","ok":true|false,"fix":"...","why":"..."}].

Items:
${JSON.stringify(items, null, 1)}`;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': String(process.env.ANTHROPIC_API_KEY), 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: MODEL, max_tokens: 4000, messages: [{ role: 'user', content: prompt }] }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) { console.error('ai-check', r.status, await r.text().catch(() => '')); return null; }
    const j = await r.json();
    const text = String(j?.content?.[0]?.text ?? '');
    const arr = JSON.parse(text.slice(text.indexOf('['), text.lastIndexOf(']') + 1)) as { k: string; ok: boolean; fix?: string; why?: string }[];
    const out: Record<string, AiNote> = {};
    arr.forEach((x) => { if (keys.includes(x.k)) out[x.k] = { ok: !!x.ok, ...(x.ok ? {} : { fix: String(x.fix ?? '').slice(0, 200), why: String(x.why ?? '').slice(0, 200) }) }; });
    return out;
  } catch (e) {
    console.error('ai-check', e);
    return null;
  }
}
