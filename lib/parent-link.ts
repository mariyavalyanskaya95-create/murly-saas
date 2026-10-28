// Посилання для батьків: підписане сервером, без входу в кабінет
import { createHmac } from 'crypto';

const SECRET = () => process.env.PARENT_LINK_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const sig = (id: string) => createHmac('sha256', `parent:${SECRET()}`).update(id).digest('base64url').slice(0, 14).replace(/[^A-Za-z0-9]/g, 'x');

export function parentToken(studentId: string) {
  const h = studentId.replace(/-/g, '');
  return `${h}${sig(h)}`;
}
export function parseParentToken(tok: string): string | null {
  const m = /^([0-9a-f]{32})([A-Za-z0-9]{14})$/i.exec(tok || '');
  if (!m || !SECRET() || sig(m[1]) !== m[2]) return null;
  const h = m[1];
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
