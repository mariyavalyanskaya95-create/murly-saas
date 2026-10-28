// Індекс пошуку по сайту (тільки сервер). Один запис на сторінку, назви трьома мовами,
// щоб учитель знайшов тему, хоч би якою мовою писав: «предлоги», «прийменники», «prepositions».
import type { Lang, T } from './i18n';
import { catalog, LESSONS } from './catalog';
import { SKILLS } from './skills';
import { QUEST_LIST } from './quest-list';
import { QUESTS_TEXT } from './quest-text';

export type SearchItem = { href: string; title: T; kind: T; level: string; skill: string; icon: string; color: string; hay: string };

const LANGS: Lang[] = ['uk', 'ru', 'en'];
export const norm = (s: string) => s.toLowerCase().replace(/ё/g, 'е').replace(/[’'`]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

let cache: SearchItem[] | null = null;

export function searchIndex(): SearchItem[] {
  if (cache) return cache;
  const by = new Map<string, SearchItem>();
  for (const lang of LANGS) {
    for (const it of catalog(lang)) {
      const cur = by.get(it.href);
      const skill = SKILLS.find((s) => s.id === it.skill);
      const words = [it.title, it.text, it.kind[lang] ?? it.kind.uk, skill ? skill.label[lang] ?? '' : '', it.level].join(' ');
      if (!cur) {
        by.set(it.href, { href: it.href, title: { uk: it.title }, kind: it.kind, level: String(it.level), skill: it.skill, icon: it.icon, color: it.color, hay: words });
      } else {
        cur.title[lang] = it.title;
        cur.hay += ' ' + words;
      }
      if (lang !== 'uk') { const c = by.get(it.href)!; if (!c.title[lang]) c.title[lang] = it.title; }
    }
  }
  // готові уроки: заголовки розділів і цілі уроку теж шукаються
  for (const p of LESSONS) {
    const it = by.get(`/lessons/${p.id.replace(/^lib-/, '')}`);
    if (!it) continue;
    const heads = p.blocks.filter((b) => b.type === 'heading').map((b) => (b as { text: string }).text);
    it.hay += ' ' + [p.aims ?? '', p.age, ...heads].join(' ');
  }
  // квест «Знайди, Бульбашко!»: кожна локація з темами і текстами завдань
  const tasks = QUESTS_TEXT.join(' ');
  by.set('/play/quest', { href: '/play/quest', title: { uk: 'Знайди, Бульбашко! Усі місця', ru: 'Найди, Пузырёк! Все места', en: 'Find it, Bubbles! All places' }, kind: { uk: 'Гра', ru: 'Игра', en: 'Game' }, level: 'A1', skill: 'vocabulary', icon: 'c-fish', color: 'sky', hay: 'квест quest гра игра game діти дети kids ' + tasks });
  for (const q of QUEST_LIST) {
    by.set(`/play/quest/${q.id}`, {
      href: `/play/quest/${q.id}`,
      title: { uk: `Знайди, Бульбашко! ${q.title.uk}`, ru: `Найди, Пузырёк! ${q.title.ru}`, en: `Find it, Bubbles! ${q.title.en}` },
      kind: { uk: 'Гра-квест', ru: 'Игра-квест', en: 'Quest game' }, level: 'A1', skill: 'vocabulary', icon: 'c-fish', color: 'sky',
      hay: ['квест quest гра игра game діти дети kids', ...LANGS.flatMap((l) => [q.title[l] ?? '', q.place[l] ?? '', ...q.topics.map((x) => x[l] ?? '')])].join(' '),
    });
  }
  // інші ігри й розділи
  const add = (href: string, title: T, kind: T, level: string, skill: string, icon: string, hay: string) => by.set(href, { href, title, kind, level, skill, icon, color: 'lime', hay });
  add('/play/town', { uk: 'Murly Town 3D: місто англійською', ru: 'Murly Town 3D: город на английском', en: 'Murly Town 3D' }, { uk: 'Гра', ru: 'Игра', en: 'Game' }, 'A1', 'vocabulary', 'd-kid', 'місто город town будинок дом house кімнати комнаты rooms меблі мебель furniture предмети предметы there is there are прийменники предлоги prepositions діти дети kids');
  add('/play/story', { uk: 'Funny Life Story: книжка-історія', ru: 'Funny Life Story: книжка-история', en: 'Funny Life Story' }, { uk: 'Гра', ru: 'Игра', en: 'Game' }, 'A1', 'reading', 'e-book', 'книжка книга book історія история story читання чтение reading малювати рисовать draw діти дети kids');
  add('/series', { uk: 'Аудіосеріали', ru: 'Аудиосериалы', en: 'Audio series' }, { uk: 'Аудіювання', ru: 'Аудирование', en: 'Listening' }, 'A2', 'listening', 'e-head', 'серіал сериал series аудіо аудио audio слухати слушать listening lighthouse маяк');
  add('/teacher/team-game', { uk: 'Командна гра для уроку', ru: 'Командная игра для урока', en: 'Team game for a lesson' }, { uk: 'Для вчителя', ru: 'Для учителя', en: 'For teachers' }, 'all', 'vocabulary', 'd-team', 'команди команды teams вікторина викторина quiz група группа group урок lesson повторення повторение revision');
  cache = Array.from(by.values()).map((x) => ({ ...x, hay: norm(`${x.title.uk} ${x.title.ru ?? ''} ${x.title.en ?? ''} ${x.hay}`) }));
  return cache;
}
