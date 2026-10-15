// Монетки Murly: один гаманець на учня для всіх ігор сайту.
// Заробляє: учитель (урок, домашка, поведінка), автоматично за здану домашку, за ігри зі словами, за завдання в іграх.
import { db, dbReady } from './db';

const enc = encodeURIComponent;
export type CoinSource = 'teacher' | 'homework' | 'words' | 'game' | 'shop';

export async function balanceOf(userId: string): Promise<number> {
  if (!dbReady()) return 0;
  const r = await db.query(`coin_wallets?user_id=eq.${enc(userId)}&select=balance`);
  return Number(r[0]?.balance ?? 0);
}
export async function coinLog(userId: string, limit = 10) {
  if (!dbReady()) return [];
  return db.query(`coin_log?user_id=eq.${enc(userId)}&select=amount,reason,source,created_at&order=created_at.desc&limit=${limit}`);
}
// додає (або списує, якщо amount < 0) монетки; повертає новий баланс або -1, якщо не вистачає
export async function addCoins(userId: string, amount: number, reason: string, source: CoinSource, teacherId?: string): Promise<number> {
  const r = await db.rpc('add_coins', { p_user: userId, p_amount: Math.round(amount), p_reason: reason.slice(0, 120), p_source: source, p_teacher: teacherId ?? null });
  return Number(r);
}
// скільки монет учень уже заробив сьогодні з цього джерела (ліміт, щоб не «фармили»)
export async function earnedToday(userId: string, source: CoinSource): Promise<number> {
  const since = new Date(); since.setHours(0, 0, 0, 0);
  const r = await db.query(`coin_log?user_id=eq.${enc(userId)}&source=eq.${source}&amount=gt.0&created_at=gte.${enc(since.toISOString())}&select=amount`);
  return r.reduce((a, x) => a + Number(x.amount ?? 0), 0);
}
export const DAILY_CAP: Partial<Record<CoinSource, number>> = { game: 100, words: 40 };
