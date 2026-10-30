// Меню бота: оплата, успішність, монетки, заняття, домашка.
// Хто що бачить: дорослий учень і батьки бачать оплату; діти й батьки бачать монетки; дитина сама оплату не бачить.
import { db } from './db';
import { balanceOf as coinsOf } from './coins';
import { L, esc } from './telegram';

const enc = encodeURIComponent;
type Lang = 'uk' | 'ru' | 'en';
type Role = 'self' | 'parent';
type Link = { role: Role; s: Record<string, unknown> };
const LOC: Record<Lang, string> = { uk: 'uk-UA', ru: 'ru-RU', en: 'en-GB' };
const asLang = (x: unknown): Lang => (x === 'ru' || x === 'en' ? x : 'uk');
const COLS = 'id,name,price,prepaid_lessons,owed_lessons,pay_mode,is_adult,user_id,tg_lang,parent_tg_lang';

// Усі учні, до яких прив’язаний цей чат (сам учень або батьки; у батьків може бути кілька дітей)
export async function linksOf(chat: number): Promise<{ lang: Lang; links: Link[] }> {
  const c = enc(String(chat));
  const [own, kids] = await Promise.all([
    db.query(`students?tg_chat_id=eq.${c}&select=${COLS}`).catch(() => []),
    db.query(`students?parent_tg_chat_id=eq.${c}&select=${COLS}`).catch(() => []),
  ]);
  const links: Link[] = [...own.map((s) => ({ role: 'self' as Role, s })), ...kids.map((s) => ({ role: 'parent' as Role, s }))];
  const lang = asLang(own[0]?.tg_lang ?? kids[0]?.parent_tg_lang);
  return { lang, links };
}

const canPay = (k: Link) => k.role === 'parent' || Boolean(k.s.is_adult);
const hasCoins = (k: Link) => !k.s.is_adult;

export function menuKeyboard(lang: Lang, links: Link[]) {
  const t = (o: { uk: string; ru: string; en: string }) => L(lang, o);
  const rows: { text: string; callback_data: string }[][] = [];
  const first: { text: string; callback_data: string }[] = [];
  if (links.some(canPay)) first.push({ text: t({ uk: 'Оплата', ru: 'Оплата', en: 'Payments' }), callback_data: 'm:pay' });
  first.push({ text: t({ uk: 'Успішність', ru: 'Успеваемость', en: 'Progress' }), callback_data: 'm:stats' });
  rows.push(first);
  const second: { text: string; callback_data: string }[] = [
    { text: t({ uk: 'Заняття', ru: 'Занятия', en: 'Lessons' }), callback_data: 'm:next' },
    { text: t({ uk: 'Домашка', ru: 'Домашка', en: 'Homework' }), callback_data: 'm:hw' },
  ];
  if (links.some(hasCoins)) second.push({ text: t({ uk: 'Монетки', ru: 'Монетки', en: 'Coins' }), callback_data: 'm:coins' });
  rows.push(second);
  rows.push([{ text: t({ uk: 'Мова', ru: 'Язык', en: 'Language' }), callback_data: 'm:lang' }]);
  return { inline_keyboard: rows };
}

export const menuTitle = (lang: Lang) => L(lang, { uk: 'Що подивитися?', ru: 'Что посмотреть?', en: 'What would you like to see?' });
export const notLinked = 'Цей Telegram ще не підключений до учня. Відкрий посилання від учителя.\nЭтот Telegram ещё не подключён к ученику. Открой ссылку от учителя.\nThis Telegram is not linked to a student yet. Open the link from your teacher.';

const money = (n: number, lang: Lang) => `${Math.round(n).toLocaleString(LOC[lang])} ₴`;
const when = (iso: unknown, lang: Lang) => new Date(String(iso)).toLocaleString(LOC[lang], { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Kyiv' });
const day = (iso: unknown, lang: Lang) => new Date(String(iso)).toLocaleDateString(LOC[lang], { day: 'numeric', month: 'short', timeZone: 'Europe/Kyiv' });

// Відповідь на кнопку: текст (HTML) для всіх прив’язаних учнів
export async function menuAnswer(kind: string, lang: Lang, links: Link[]): Promise<string> {
  const t = (o: { uk: string; ru: string; en: string }) => L(lang, o);
  const many = links.length > 1;
  const head = (k: Link) => (many ? `<b>${esc(String(k.s.name || ''))}</b>\n` : '');
  const parts: string[] = [];

  for (const k of links) {
    const sid = enc(String(k.s.id));
    if (kind === 'pay') {
      if (!canPay(k)) continue;
      const price = Number(k.s.price) || 0;
      const [pays, done] = await Promise.all([
        db.query(`payments?student_id=eq.${sid}&select=amount,at&order=at.desc`).catch(() => []),
        db.query(`lessons?student_id=eq.${sid}&status=eq.done&select=id`).catch(() => []),
      ]);
      const paid = pays.reduce((n, p) => n + Number(p.amount || 0), 0);
      const start = ((Number(k.s.prepaid_lessons) || 0) - (Number(k.s.owed_lessons) || 0)) * price;
      const b = paid - done.length * price + start;
      const lessons = price ? Math.round(Math.abs(b) / price) : 0;
      const post = k.s.pay_mode === 'post';
      let line: string;
      if (b < 0) line = post
        ? t({ uk: `До оплати: <b>${money(-b, lang)}</b>`, ru: `К оплате: <b>${money(-b, lang)}</b>`, en: `To pay: <b>${money(-b, lang)}</b>` })
        : t({ uk: `Заборгованість: <b>${money(-b, lang)}</b>`, ru: `Задолженность: <b>${money(-b, lang)}</b>`, en: `Outstanding: <b>${money(-b, lang)}</b>` });
      else if (b > 0) line = t({ uk: `Оплачено наперед: <b>${money(b, lang)}</b>`, ru: `Оплачено наперёд: <b>${money(b, lang)}</b>`, en: `Paid in advance: <b>${money(b, lang)}</b>` });
      else line = t({ uk: 'Заборгованості немає, усе сплачено.', ru: 'Задолженности нет, всё оплачено.', en: 'Nothing owed, all paid.' });
      if (b !== 0 && lessons) line += t({ uk: ` (≈ ${lessons} зан.)`, ru: ` (≈ ${lessons} зан.)`, en: ` (≈ ${lessons} lessons)` });
      const extra = [
        price ? t({ uk: `Ціна заняття: ${money(price, lang)}`, ru: `Цена занятия: ${money(price, lang)}`, en: `Lesson price: ${money(price, lang)}` }) : '',
        pays[0] ? t({ uk: `Остання оплата: ${money(Number(pays[0].amount), lang)}, ${day(pays[0].at, lang)}`, ru: `Последняя оплата: ${money(Number(pays[0].amount), lang)}, ${day(pays[0].at, lang)}`, en: `Last payment: ${money(Number(pays[0].amount), lang)}, ${day(pays[0].at, lang)}` }) : '',
      ].filter(Boolean).join('\n');
      parts.push(`${head(k)}${line}${extra ? `\n${extra}` : ''}`);
    }

    if (kind === 'stats') {
      const [ls, hw, words] = await Promise.all([
        db.query(`lessons?student_id=eq.${sid}&select=status&limit=500`).catch(() => []),
        db.query(`homework?student_id=eq.${sid}&select=status,score,total,due&limit=200`).catch(() => []),
        db.query(`words?student_id=eq.${sid}&select=id`).catch(() => []),
      ]);
      const held = ls.filter((l) => l.status === 'done').length;
      const missed = ls.filter((l) => l.status === 'missed').length;
      const att = held + missed ? Math.round((held / (held + missed)) * 100) : null;
      const done = hw.filter((h) => h.status !== 'assigned');
      const scored = done.filter((h) => Number(h.total) > 0);
      const avg = scored.length ? Math.round((scored.reduce((n, h) => n + Number(h.score) / Number(h.total), 0) / scored.length) * 100) : null;
      const late = hw.filter((h) => h.status === 'assigned' && h.due && +new Date(String(h.due)) < Date.now()).length;
      parts.push(head(k) + [
        t({ uk: `Занять проведено: <b>${held}</b>`, ru: `Занятий проведено: <b>${held}</b>`, en: `Lessons held: <b>${held}</b>` }),
        att != null ? t({ uk: `Відвідуваність: <b>${att}%</b>${missed ? `, пропусків ${missed}` : ''}`, ru: `Посещаемость: <b>${att}%</b>${missed ? `, пропусков ${missed}` : ''}`, en: `Attendance: <b>${att}%</b>${missed ? `, ${missed} missed` : ''}` }) : '',
        t({ uk: `Домашок здано: <b>${done.length} з ${hw.length}</b>${late ? `, прострочено ${late}` : ''}`, ru: `Домашек сдано: <b>${done.length} из ${hw.length}</b>${late ? `, просрочено ${late}` : ''}`, en: `Homework done: <b>${done.length} of ${hw.length}</b>${late ? `, ${late} overdue` : ''}` }),
        avg != null ? t({ uk: `Середній бал: <b>${avg}%</b>`, ru: `Средний балл: <b>${avg}%</b>`, en: `Average score: <b>${avg}%</b>` }) : '',
        t({ uk: `Слів у словнику: <b>${words.length}</b>`, ru: `Слов в словаре: <b>${words.length}</b>`, en: `Words learned: <b>${words.length}</b>` }),
      ].filter(Boolean).join('\n'));
    }

    if (kind === 'coins') {
      if (!hasCoins(k)) continue;
      const uid = k.s.user_id ? String(k.s.user_id) : '';
      const n = uid ? await coinsOf(uid).catch(() => 0) : 0;
      parts.push(head(k) + (uid
        ? t({ uk: `Монетки Murly: <b>${n}</b>. Їх заробляють за домашку, слова та ігри і витрачають у крамничці.`, ru: `Монетки Murly: <b>${n}</b>. Их зарабатывают за домашку, слова и игры и тратят в магазинчике.`, en: `Murly coins: <b>${n}</b>. Earned for homework, words and games, spent in the shop.` })
        : t({ uk: 'Монетки з’являться, коли учень увійде у свій кабінет на сайті.', ru: 'Монетки появятся, когда ученик войдёт в свой кабинет на сайте.', en: 'Coins appear once the student signs in to their account on the site.' })));
    }

    if (kind === 'next') {
      const up = await db.query(`lessons?student_id=eq.${sid}&status=eq.planned&start=gte.${enc(new Date().toISOString())}&select=start,topic&order=start.asc&limit=4`).catch(() => []);
      parts.push(head(k) + (up.length
        ? up.map((l) => `${when(l.start, lang)}${l.topic ? `: ${esc(String(l.topic))}` : ''}`).join('\n')
        : t({ uk: 'Найближчих занять поки не заплановано.', ru: 'Ближайших занятий пока не запланировано.', en: 'No upcoming lessons yet.' })));
    }

    if (kind === 'hw') {
      const open = await db.query(`homework?student_id=eq.${sid}&status=eq.assigned&select=title,due&order=due.asc.nullslast&limit=6`).catch(() => []);
      parts.push(head(k) + (open.length
        ? open.map((h) => {
          const late = h.due && +new Date(String(h.due)) < Date.now();
          return `${esc(String(h.title))}${h.due ? ` (${late ? t({ uk: 'прострочено', ru: 'просрочено', en: 'overdue' }) : t({ uk: 'до', ru: 'до', en: 'due' })} ${when(h.due, lang)})` : ''}`;
        }).join('\n')
        : t({ uk: 'Усі домашки здано.', ru: 'Все домашки сданы.', en: 'All homework is done.' })));
    }
  }
  if (!parts.length) return t({ uk: 'Тут поки нічого показати.', ru: 'Здесь пока нечего показать.', en: 'Nothing to show here yet.' });
  const title = {
    pay: t({ uk: 'Оплата', ru: 'Оплата', en: 'Payments' }), stats: t({ uk: 'Успішність', ru: 'Успеваемость', en: 'Progress' }),
    coins: t({ uk: 'Монетки', ru: 'Монетки', en: 'Coins' }), next: t({ uk: 'Найближчі заняття', ru: 'Ближайшие занятия', en: 'Upcoming lessons' }),
    hw: t({ uk: 'Домашка до здачі', ru: 'Домашка к сдаче', en: 'Homework to do' }),
  }[kind] || '';
  return `<b>${title}</b>\n\n${parts.join('\n\n')}`;
}
