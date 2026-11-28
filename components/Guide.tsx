'use client';
// «Почему Murly и как всё устроено»: короткий мануал для новичків у кабінеті вчителя й учня
import Link from 'next/link';
import Icon from './Icon';
import { useT } from './LangProvider';
import type { T } from '@/lib/i18n';

type Item = { icon: string; title: T; text: T; href?: string; cta?: T };

const WHY_TEACHER: Item[] = [
  { icon: 'e-pencil', title: { uk: 'Домашка перевіряється сама', ru: 'Домашка проверяется сама', en: 'Homework checks itself' }, text: { uk: 'Учень відповідає, Murly одразу ставить бал і показує помилки. Вам лишається глянути лише письмові відповіді.', ru: 'Ученик отвечает, Murly сразу ставит балл и показывает ошибки. Вам остаётся посмотреть только письменные ответы.', en: 'Students answer, Murly scores it and shows mistakes. You only look at written answers.' } },
  { icon: 'e-book', title: { uk: '110+ готових уроків на 60 хвилин', ru: '110+ готовых уроков на 60 минут', en: '110+ ready 60-minute lessons' }, text: { uk: 'Від A1 до C1, для дітей, підлітків і дорослих. Кнопка «Відкрити урок», версія вчителя з відповідями і підказками, пульт для показу екрана.', ru: 'От A1 до C1, для детей, подростков и взрослых. Кнопка «Открыть урок», версия учителя с ответами и подсказками, пульт для показа экрана.', en: 'A1 to C1, kids, teens and adults. Open lesson button, teacher version with answers and tips, a screen-share remote.' } },
  { icon: 'd-clock', title: { uk: 'Розклад і оплати в одному місці', ru: 'Расписание и оплаты в одном месте', en: 'Schedule and payments in one place' }, text: { uk: 'Повторювані заняття, баланс кожного учня, хто винен за уроки. Без таблиць і нотаток у телефоні.', ru: 'Повторяющиеся занятия, баланс каждого ученика, кто должен за уроки. Без таблиц и заметок в телефоне.', en: 'Repeating lessons, each student’s balance, who owes you. No spreadsheets.' } },
  { icon: 'd-phone', title: { uk: 'Telegram-бот', ru: 'Telegram-бот', en: 'Telegram bot' }, text: { uk: 'Нагадування учням про заняття й домашку, вам: хто здав роботу і хто оплатив. Батькам ранкові нагадування.', ru: 'Напоминания ученикам о занятиях и домашке, вам: кто сдал работу и кто оплатил. Родителям утренние напоминания.', en: 'Reminders to students, alerts to you, morning messages to parents.' } },
  { icon: 'e-trophy', title: { uk: 'Учні хочуть вчитися', ru: 'Ученики хотят учиться', en: 'Students want to learn' }, text: { uk: 'Монетки й рівні за навчання, острів Murly, командна гра для заняття, уроки за Minecraft і Roblox.', ru: 'Монетки и уровни за учёбу, остров Murly, командная игра для занятия, уроки по Minecraft и Roblox.', en: 'Coins and levels, Murly Island, a team game for class, Minecraft and Roblox lessons.' } },
  { icon: 'd-team', title: { uk: 'Батьки бачать прогрес', ru: 'Родители видят прогресс', en: 'Parents see progress' }, text: { uk: 'Окреме посилання для батьків: заняття, домашка, бали. Менше питань «а що ви робили на уроці?».', ru: 'Отдельная ссылка для родителей: занятия, домашка, баллы. Меньше вопросов «а что вы делали на уроке?».', en: 'A parent link with lessons, homework and scores.' } },
];

const START_TEACHER: Item[] = [
  { icon: 'd-kid', title: { uk: '1. Додайте учня', ru: '1. Добавьте ученика', en: '1. Add a student' }, text: { uk: 'Потрібне лише ім’я. Можна одразу дати учню номер і PIN для входу.', ru: 'Нужно только имя. Можно сразу дать ученику номер и PIN для входа.', en: 'Only a name is needed. You can give a phone and PIN for login.' }, href: '/teacher?start=student', cta: { uk: 'Додати учня', ru: 'Добавить ученика', en: 'Add a student' } },
  { icon: 'e-book', title: { uk: '2. Відкрийте урок', ru: '2. Откройте урок', en: '2. Open a lesson' }, text: { uk: 'Оберіть урок за рівнем і темою, натисніть «Відкрити урок» і показуйте екран на занятті.', ru: 'Выберите урок по уровню и теме, нажмите «Открыть урок» и показывайте экран на занятии.', en: 'Pick a lesson, press Open lesson and share your screen.' }, href: '/teacher/lessons', cta: { uk: 'До уроків', ru: 'К урокам', en: 'Lessons' } },
  { icon: 'e-pencil', title: { uk: '3. Задайте домашку', ru: '3. Задайте домашку', en: '3. Set homework' }, text: { uk: 'В уроці натисніть «Задати домашкою»: учень отримає всі вправи розділу з автоперевіркою.', ru: 'В уроке нажмите «Задать домашкой»: ученик получит все упражнения раздела с автопроверкой.', en: 'In a lesson press Set as homework: the student gets every exercise, auto-checked.' }, href: '/teacher/students', cta: { uk: 'Учні', ru: 'Ученики', en: 'Students' } },
  { icon: 'd-clock', title: { uk: '4. Заплануйте заняття', ru: '4. Запланируйте занятие', en: '4. Schedule a lesson' }, text: { uk: 'Раз чи щотижня. Murly нагадає учню, а вам порахує оплати.', ru: 'Один раз или каждую неделю. Murly напомнит ученику, а вам посчитает оплаты.', en: 'Once or weekly. Murly reminds the student and counts payments.' }, href: '/teacher/schedule', cta: { uk: 'Розклад', ru: 'Расписание', en: 'Schedule' } },
];

const WHY_STUDENT: Item[] = [
  { icon: 'e-pencil', title: { uk: 'Домашка з підказками', ru: 'Домашка с подсказками', en: 'Homework with hints' }, text: { uk: 'Одразу бачиш бал і помилки, а вчитель бачить твою роботу.', ru: 'Сразу видишь балл и ошибки, а учитель видит твою работу.', en: 'See your score and mistakes right away.' }, href: '/student#homework', cta: { uk: 'Моя домашка', ru: 'Моя домашка', en: 'My homework' } },
  { icon: 'e-abc', title: { uk: 'Мій словник', ru: 'Мой словарь', en: 'My dictionary' }, text: { uk: 'Слова з уроків повторюються саме тоді, коли ти їх починаєш забувати.', ru: 'Слова с уроков повторяются как раз тогда, когда ты начинаешь их забывать.', en: 'Words come back right when you start to forget them.' }, href: '/student#words', cta: { uk: 'Словник', ru: 'Словарь', en: 'Dictionary' } },
  { icon: 'e-trophy', title: { uk: 'Монетки й гра', ru: 'Монетки и игра', en: 'Coins and a game' }, text: { uk: 'За навчання отримуєш монетки й рівні та витрачаєш їх на острові Murly.', ru: 'За учёбу получаешь монетки и уровни и тратишь их на острове Murly.', en: 'Earn coins and levels and spend them on Murly Island.' }, href: '/play/island', cta: { uk: 'Острів', ru: 'Остров', en: 'Island' } },
  { icon: 'e-book', title: { uk: 'Тренуйся сам', ru: 'Тренируйся сам', en: 'Practise on your own' }, text: { uk: 'Граматика простими словами, аудіо, книжки, пісні й тест на рівень.', ru: 'Грамматика простыми словами, аудио, книжки, песни и тест на уровень.', en: 'Grammar made simple, audio, books, songs and a level test.' }, href: '/learn', cta: { uk: 'Усі матеріали', ru: 'Все материалы', en: 'All materials' } },
];

function Cards({ list }: { list: Item[] }) {
  const t = useT();
  return (
    <div className="gd-grid">
      {list.map((x) => (
        <div key={x.title.uk} className="gd-card">
          <span className="gd-ic"><Icon id={x.icon} /></span>
          <h3>{t(x.title)}</h3>
          <p>{t(x.text)}</p>
          {x.href && x.cta && <Link href={x.href} className="mu-btn mu-btn--lime t-btn-sm">{t(x.cta)}</Link>}
        </div>
      ))}
    </div>
  );
}

export default function Guide({ who }: { who: 'teacher' | 'student' }) {
  const t = useT();
  if (who === 'student') return (
    <div className="gd">
      <h1>{t({ uk: 'Як усе влаштовано в Murly', ru: 'Как всё устроено в Murly', en: 'How Murly works' })}</h1>
      <p className="gd-lead">{t({ uk: 'Тут твоя домашка, слова й ігри. Вчися потроху щодня, а монетки витрачай на острові.', ru: 'Здесь твоя домашка, слова и игры. Учись понемногу каждый день, а монетки трать на острове.', en: 'Your homework, words and games live here. Learn a little every day.' })}</p>
      <Cards list={WHY_STUDENT} />
    </div>
  );
  return (
    <div className="gd">
      <h1>{t({ uk: 'Чому Murly і як почати', ru: 'Почему Murly и как начать', en: 'Why Murly and how to start' })}</h1>
      <p className="gd-lead">{t({ uk: 'Murly замінює кілька сервісів одразу: уроки, домашку з автоперевіркою, розклад, оплати й мотивацію учнів. Зараз усе безкоштовно.', ru: 'Murly заменяет сразу несколько сервисов: уроки, домашку с автопроверкой, расписание, оплаты и мотивацию учеников. Сейчас всё бесплатно.', en: 'Murly replaces several tools at once: lessons, auto-checked homework, schedule, payments and student motivation. Everything is free right now.' })}</p>
      <h2>{t({ uk: 'Почніть за 4 кроки', ru: 'Начните за 4 шага', en: 'Start in 4 steps' })}</h2>
      <Cards list={START_TEACHER} />
      <h2>{t({ uk: 'Чим Murly допомагає', ru: 'Чем Murly помогает', en: 'How Murly helps' })}</h2>
      <Cards list={WHY_TEACHER} />
      <h2>{t({ uk: 'Часті питання', ru: 'Частые вопросы', en: 'FAQ' })}</h2>
      <div className="gd-faq">
        <details><summary>{t({ uk: 'Учню потрібна пошта?', ru: 'Ученику нужна почта?', en: 'Does a student need an email?' })}</summary><p>{t({ uk: 'Ні. Учень входить за номером телефону і PIN, які ви задаєте в картці учня. Або за кодом-запрошенням.', ru: 'Нет. Ученик входит по номеру телефона и PIN, которые вы задаёте в карточке ученика. Или по коду-приглашению.', en: 'No. Students log in with a phone number and PIN you set, or an invite code.' })}</p></details>
        <details><summary>{t({ uk: 'Скільки це коштує?', ru: 'Сколько это стоит?', en: 'How much does it cost?' })}</summary><p>{t({ uk: 'Зараз Murly безкоштовний. Перші користувачі отримають знижку назавжди, коли з’являться платні тарифи.', ru: 'Сейчас Murly бесплатный. Первые пользователи получат скидку навсегда, когда появятся платные тарифы.', en: 'Murly is free right now. Early users keep a discount when paid plans arrive.' })}</p></details>
        <details><summary>{t({ uk: 'Можна свої матеріали?', ru: 'Можно свои материалы?', en: 'Can I use my own materials?' })}</summary><p>{t({ uk: 'Так: створюйте свої уроки й ігри, додавайте картинки, PDF і відео, задавайте домашку з фото завдання.', ru: 'Да: создавайте свои уроки и игры, добавляйте картинки, PDF и видео, задавайте домашку с фото задания.', en: 'Yes: build your own lessons and games, add images, PDFs and videos.' })}</p></details>
        <details><summary>{t({ uk: 'Як провести заняття онлайн?', ru: 'Как провести занятие онлайн?', en: 'How do I teach online?' })}</summary><p>{t({ uk: 'Відкрийте урок і показуйте екран у Zoom чи Meet, або відкрийте «Урок з учнем»: відео й дошка в одному вікні.', ru: 'Откройте урок и показывайте экран в Zoom или Meet, или откройте «Урок с учеником»: видео и доска в одном окне.', en: 'Open a lesson and share your screen, or use the lesson room with video and a whiteboard.' })}</p></details>
      </div>
    </div>
  );
}
