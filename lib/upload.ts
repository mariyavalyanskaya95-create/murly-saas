'use client';
// Завантаження файлу вчителя: беремо підписане посилання і кладемо файл прямо в сховище
export async function uploadFile(file: File): Promise<{ url: string } | { error: string }> {
  try {
    const r = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: file.name, type: file.type, size: file.size }) });
    const j = await r.json();
    if (!r.ok) return { error: j.message || 'Не вдалося завантажити файл.' };
    const put = await fetch(j.uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type, 'x-upsert': 'false' }, body: file });
    if (!put.ok) return { error: 'Не вдалося завантажити файл. Спробуй ще раз.' };
    return { url: j.publicUrl as string };
  } catch {
    return { error: 'Немає з’єднання. Спробуй ще раз.' };
  }
}
