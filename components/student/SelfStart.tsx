'use client';
// Учень без учителя: обирає, хто він і навіщо вчить, і одразу бачить план на сьогодні.
// Вибір зберігається в профілі (Clerk unsafeMetadata.track), його можна змінити.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import Icon from '../Icon';
import { useT } from '@/components/LangProvider';
import type { T } from '@/lib/i18n';
import { QUEST_LIST } from '@/lib/quest-list';

export type Track = 'kids' | 'teen' | 'nmt' | 'adult';
type Step = { href: string; icon: string; title: T; text: T; min: number };

const TRACKS: { id: Track; icon: string; title: T; text: T }[] = [
  { id: 'kids', icon: 'd-kid', title: { uk: 'Я дитина 6–11', ru: 'Я ребёнок 6–11', en: 'I am a kid, 6–11' }, text: { uk: 'Ігри, квест, перші слова', ru: 'Игры, квест, первые слова', en: 'Games, a quest, first words' } },
  { id: 'teen', icon: 'd-rocket', title: { uk: 'Я підліток', ru: 'Я подросток', en: 'I am a teen' }, text: { uk: 'Серіали, граматика, ігри', ru: 'Сериалы, грамматика, игры', en: 'Series, grammar, games' } },
  { id: 'nmt', icon: 'e-trophy', title: { uk: 'Готуюся до НМТ', ru: 'Готовлюсь к НМТ', en: 'I am preparing for the NMT' }, text: { uk: 'Пробні тести і вправи', ru: 'Пробные тесты и упражнения', en: 'Mock tests and drills' } },
  { id: 'adult', icon: 'd-team', title: { uk: 'Я дорослий', ru: 'Я взрослый', en: 'I am an adult' }, text: { uk: 'Тексти, аудіо, граматика', ru: 'Тексты, аудио, грамматика', en: 'Texts, audio, grammar' } },
];

// план на сьогодні: щодня трохи інший (квест і серія змінюються)
function plan(track: Track): Step[] {
  const day = Math.floor(Date.now() / 864e5);
  const q = QUEST_LIST[day % QUEST_LIST.length];
  const ep = (day % 10) + 1;
  const P: Record<Track, Step[]> = {
    kids: [
      { href: `/play/quest/${q.id}`, icon: 'c-fish', title: { uk: `Квест: ${q.title.uk}`, ru: `Квест: ${q.title.ru ?? q.title.uk}`, en: `Quest: ${q.title.en ?? q.title.uk}` }, text: { uk: 'Слухай котика і знаходь речі', ru: 'Слушай котика и находи вещи', en: 'Listen to the cat and find things' }, min: 7 },
      { href: '/play/town', icon: 'd-kid', title: { uk: 'Побудуй своє місто', ru: 'Построй свой город', en: 'Build your town' }, text: { uk: 'Виконай 2 завдання англійською', ru: 'Выполни 2 задания на английском', en: 'Do 2 tasks in English' }, min: 10 },
      { href: '/tongue-twisters', icon: 'e-speak', title: { uk: 'Скоромовка дня', ru: 'Скороговорка дня', en: 'Tongue twister of the day' }, text: { uk: 'Скажи її 3 рази', ru: 'Скажи её 3 раза', en: 'Say it 3 times' }, min: 3 },
    ],
    teen: [
      { href: `/series/lighthouse/${ep}`, icon: 'e-head', title: { uk: `Аудіосеріал, серія ${ep}`, ru: `Аудиосериал, серия ${ep}`, en: `Audio series, episode ${ep}` }, text: { uk: 'Слухай і відповідай на питання', ru: 'Слушай и отвечай на вопросы', en: 'Listen and answer the questions' }, min: 7 },
      { href: '/grammar/trainer', icon: 'e-abc', title: { uk: 'Тренажер граматики', ru: 'Тренажёр грамматики', en: 'Grammar trainer' }, text: { uk: 'Обери тему і зроби 20 завдань', ru: 'Выбери тему и сделай 20 заданий', en: 'Pick a topic, do 20 tasks' }, min: 10 },
      { href: '/irregular-verbs/games', icon: 'd-cup', title: { uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' }, text: { uk: 'Одна гра на 5 хвилин', ru: 'Одна игра на 5 минут', en: 'One 5-minute game' }, min: 5 },
    ],
    nmt: [
      { href: '/bonus/nmt-checklist', icon: 'e-pencil', title: { uk: 'НМТ-батл', ru: 'НМТ-батл', en: 'NMT battle' }, text: { uk: 'Граматика у форматі пропусків', ru: 'Грамматика в формате пропусков', en: 'Grammar in the gap format' }, min: 10 },
      { href: '/nmt', icon: 'e-trophy', title: { uk: 'Квіз у форматі НМТ', ru: 'Квиз в формате НМТ', en: 'An NMT-style quiz' }, text: { uk: 'Читання й лексика з поясненнями', ru: 'Чтение и лексика с объяснениями', en: 'Reading and vocabulary, explained' }, min: 15 },
      { href: '/nmt/mock', icon: 'e-board', title: { uk: 'Пробний НМТ', ru: 'Пробный НМТ', en: 'Mock NMT test' }, text: { uk: 'Раз на тиждень повний тест', ru: 'Раз в неделю полный тест', en: 'A full test once a week' }, min: 60 },
    ],
    adult: [
      { href: '/stories', icon: 'e-book', title: { uk: 'Текст для читання', ru: 'Текст для чтения', en: 'A text to read' }, text: { uk: 'Зі словничком і питаннями', ru: 'Со словариком и вопросами', en: 'With a glossary and questions' }, min: 10 },
      { href: '/practice', icon: 'e-head', title: { uk: 'Аудіо з питаннями', ru: 'Аудио с вопросами', en: 'Audio with questions' }, text: { uk: 'Слухай з потрібною швидкістю', ru: 'Слушай с нужной скоростью', en: 'Listen at your own speed' }, min: 10 },
      { href: '/grammar', icon: 'e-abc', title: { uk: 'Одне правило граматики', ru: 'Одно правило грамматики', en: 'One grammar rule' }, text: { uk: 'Простими словами і з тренажером', ru: 'Простыми словами и с тренажёром', en: 'In plain words, with a trainer' }, min: 10 },
    ],
  };
  return P[track];
}

export default function SelfStart() {
  const t = useT();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const saved = (user?.unsafeMetadata as { track?: Track } | undefined)?.track;
  const [track, setTrack] = useState<Track | undefined>(undefined);
  const [change, setChange] = useState(false);
  const cur = track ?? saved;
  if (!isLoaded) return null;

  const choose = async (id: Track) => {
    setTrack(id); setChange(false);
    try { await user?.update({ unsafeMetadata: { ...(user.unsafeMetadata ?? {}), track: id } }); router.refresh(); } catch { /* вибір усе одно видно на сторінці */ }
  };

  if (!cur || change) {
    return (
      <section className="t-card ss-start">
        <h2>{t({ uk: 'З чого почнемо?', ru: 'С чего начнём?', en: 'Where shall we start?' })}</h2>
        <p className="t-muted">{t({ uk: 'Обери, хто ти, і Murly складе план на кожен день.', ru: 'Выбери, кто ты, и Murly составит план на каждый день.', en: 'Tell us who you are and Murly will make a plan for every day.' })}</p>
        <div className="ss-tracks">
          {TRACKS.map((x) => (
            <button key={x.id} type="button" className={`ss-track ${cur === x.id ? 'is-on' : ''}`} onClick={() => choose(x.id)}>
              <span className="ss-track__ic"><Icon id={x.icon} /></span>
              <b>{t(x.title)}</b><small>{t(x.text)}</small>
            </button>
          ))}
        </div>
      </section>
    );
  }

  const steps = plan(cur);
  const total = steps.reduce((n, s) => n + (s.min >= 60 ? 0 : s.min), 0);
  return (
    <section className="t-card ss-plan">
      <div className="t-card__head">
        <h2><Icon id="e-cal" />{t({ uk: 'План на сьогодні', ru: 'План на сегодня', en: 'Today’s plan' })} <small className="t-muted">~{total} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</small></h2>
        <button type="button" className="t-link-btn" onClick={() => setChange(true)}>{t({ uk: 'Змінити', ru: 'Изменить', en: 'Change' })}: {t(TRACKS.find((x) => x.id === cur)!.title)}</button>
      </div>
      <ol className="ss-steps">
        {steps.map((s, i) => (
          <li key={s.href}>
            <Link href={s.href} className="ss-step">
              <span className="ss-step__n">{i + 1}</span>
              <span className="ss-step__ic"><Icon id={s.icon} /></span>
              <span className="ss-step__txt"><b>{t(s.title)}</b><small>{t(s.text)} · {s.min} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</small></span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
