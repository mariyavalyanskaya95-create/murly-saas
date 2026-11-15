import type { Metadata } from 'next';
import Link from 'next/link';
import { alt, absUrl } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { tr } from '@/lib/i18n-server';

// Довідка під пошук «НМТ англійська 2027 структура / теми / тест онлайн»: формат, теми граматики й лексики, план, посилання на пробні тести
type T = { uk: string; ru: string; en: string };

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'НМТ з англійської 2027: структура тесту, теми і тест онлайн | Murly', ru: 'НМТ по английскому 2027: структура теста, темы и тест онлайн | Murly', en: 'NMT English 2027: test format, topics and online practice | Murly' }),
    description: t({ uk: 'НМТ з англійської 2027: 32 завдання, 6 типів, поріг 5 балів. Які теми граматики й лексики вчити, план підготовки і безкоштовні пробні тести онлайн з поясненнями.', ru: 'НМТ по английскому 2027: 32 задания, 6 типов, порог 5 баллов. Какие темы грамматики и лексики учить, план подготовки и бесплатные пробные тесты онлайн с объяснениями.', en: 'NMT English 2027: 32 tasks, 6 task types, pass mark 5. Grammar and vocabulary topics, a study plan and free online mock tests with explanations.' }),
    alternates: alt('/nmt/english'),
  };
}

const TASKS: { n: string; q: string; what: T }[] = [
  { n: 'Task 1', q: '1-5', what: { uk: 'Читання оголошень: 5 коротких оголошень, до кожного обрати мету з 8 варіантів (3 зайві).', ru: 'Чтение объявлений: 5 коротких объявлений, к каждому выбрать цель из 8 вариантов (3 лишних).', en: 'Short notices: match 5 adverts to 8 options (3 extra).' } },
  { n: 'Task 2', q: '6-10', what: { uk: 'Читання великого тексту: 5 питань з вибором відповіді A-D, часто про конкретний абзац.', ru: 'Чтение большого текста: 5 вопросов с выбором ответа A-D, часто про конкретный абзац.', en: 'A long text: 5 multiple-choice questions A-D, often about a paragraph.' } },
  { n: 'Task 3', q: '11-16', what: { uk: '6 коротких текстів про людей: до кожного підібрати твердження з 8 (2 зайві).', ru: '6 коротких текстов о людях: к каждому подобрать утверждение из 8 (2 лишних).', en: '6 short texts about people: match each to one of 8 statements (2 extra).' } },
  { n: 'Task 4', q: '17-22', what: { uk: 'Текст з 6 пропусками: вставити частини речень з 8 (2 зайві).', ru: 'Текст с 6 пропусками: вставить части предложений из 8 (2 лишних).', en: 'Gapped text: fill 6 gaps with 8 sentence parts (2 extra).' } },
  { n: 'Task 5', q: '23-27', what: { uk: 'Use of English, лексика: 5 пропусків, по 4 варіанти слова.', ru: 'Use of English, лексика: 5 пропусков, по 4 варианта слова.', en: 'Use of English, vocabulary: 5 gaps, 4 options each.' } },
  { n: 'Task 6', q: '28-32', what: { uk: 'Use of English, граматика: 5 пропусків, по 4 варіанти форми.', ru: 'Use of English, грамматика: 5 пропусков, по 4 варианта формы.', en: 'Use of English, grammar: 5 gaps, 4 options each.' } },
];

const GRAMMAR: T[] = [
  { uk: 'Усі часи: Present, Past, Future, Perfect і Continuous', ru: 'Все времена: Present, Past, Future, Perfect и Continuous', en: 'All tenses: Present, Past, Future, Perfect and Continuous' },
  { uk: 'Пасивний стан (is made, was built, has been done)', ru: 'Пассивный залог (is made, was built, has been done)', en: 'Passive voice (is made, was built, has been done)' },
  { uk: 'Умовні речення 0, 1, 2, 3 і wish', ru: 'Условные предложения 0, 1, 2, 3 и wish', en: 'Conditionals 0-3 and wish' },
  { uk: 'Непряма мова і узгодження часів', ru: 'Косвенная речь и согласование времён', en: 'Reported speech' },
  { uk: 'Модальні дієслова: must, have to, should, can, could, might', ru: 'Модальные глаголы: must, have to, should, can, could, might', en: 'Modals: must, have to, should, can, could, might' },
  { uk: 'Інфінітив чи -ing після дієслів (enjoy doing, decide to do)', ru: 'Инфинитив или -ing после глаголов (enjoy doing, decide to do)', en: 'Infinitive or -ing (enjoy doing, decide to do)' },
  { uk: 'Артиклі, прийменники, ступені порівняння', ru: 'Артикли, предлоги, степени сравнения', en: 'Articles, prepositions, comparatives' },
  { uk: 'Відносні займенники who, which, that, whose', ru: 'Относительные местоимения who, which, that, whose', en: 'Relative pronouns who, which, that, whose' },
];

const VOCAB: T[] = [
  { uk: 'Сталі вирази з make, do, take, have', ru: 'Устойчивые выражения с make, do, take, have', en: 'Collocations with make, do, take, have' },
  { uk: 'Словотвір: суфікси й префікси (care, careful, careless)', ru: 'Словообразование: суффиксы и префиксы (care, careful, careless)', en: 'Word formation (care, careful, careless)' },
  { uk: 'Фразові дієслова (give up, look after, find out)', ru: 'Фразовые глаголы (give up, look after, find out)', en: 'Phrasal verbs (give up, look after, find out)' },
  { uk: 'Слова-зв’язки: however, although, despite, therefore', ru: 'Слова-связки: however, although, despite, therefore', en: 'Linking words: however, although, despite, therefore' },
  { uk: 'Теми текстів: освіта, наука, технології, екологія, спорт, подорожі, культура, люди', ru: 'Темы текстов: образование, наука, технологии, экология, спорт, путешествия, культура, люди', en: 'Text topics: education, science, technology, environment, sport, travel, culture, people' },
];

const PLAN: T[] = [
  { uk: 'Пройди один пробний НМТ і подивись, у яких Task найбільше помилок.', ru: 'Пройди один пробный НМТ и посмотри, в каких Task больше всего ошибок.', en: 'Take one mock test and see which tasks cost you the most.' },
  { uk: 'Щотижня: один тест, розбір кожної помилки через «Чому так?», повтор тем, де помилявся.', ru: 'Каждую неделю: один тест, разбор каждой ошибки через «Почему так?», повтор тем, где ошибался.', en: 'Every week: one test, review every mistake with “Why?”, revise weak topics.' },
  { uk: 'Щодня 10-15 хвилин: слова, неправильні дієслова, сталі вирази.', ru: 'Каждый день 10-15 минут: слова, неправильные глаголы, устойчивые выражения.', en: 'Every day 10-15 minutes: words, irregular verbs, collocations.' },
  { uk: 'За місяць до іспиту: тести в режимі «Як на іспиті» з таймером.', ru: 'За месяц до экзамена: тесты в режиме «Как на экзамене» с таймером.', en: 'A month before: timed tests in exam mode.' },
];

const FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Скільки завдань у НМТ з англійської?', ru: 'Сколько заданий в НМТ по английскому?', en: 'How many tasks are in NMT English?' }, a: { uk: '32 завдання, кожне оцінюється в 1 бал, максимум 32 тестові бали. Частини дві: читання (Task 1-4) і використання мови (Task 5-6). Аудіювання і письма немає.', ru: '32 задания, каждое оценивается в 1 балл, максимум 32 тестовых балла. Части две: чтение (Task 1-4) и использование языка (Task 5-6). Аудирования и письма нет.', en: '32 tasks, 1 point each, 32 points max. Two parts: reading (Tasks 1-4) and use of English (Tasks 5-6). No listening or writing.' } },
  { q: { uk: 'Скільки треба, щоб скласти?', ru: 'Сколько нужно, чтобы сдать?', en: 'What is the pass mark?' }, a: { uk: 'Поріг 5 тестових балів, це 100 балів за шкалою 100-200. Скільки треба на 150, 180 чи 200, дивись у калькуляторі балів.', ru: 'Порог 5 тестовых баллов, это 100 баллов по шкале 100-200. Сколько нужно на 150, 180 или 200, смотри в калькуляторе баллов.', en: 'The pass mark is 5 test points, which is 100 on the 100-200 scale. See the score calculator for other targets.' } },
  { q: { uk: 'Скільки часу на англійську?', ru: 'Сколько времени на английский?', en: 'How much time is there?' }, a: { uk: 'Англійська йде в одному блоці з історією України, на блок 120 хвилин, і час між предметами ти розподіляєш сам. Зазвичай на англійську виходить близько години.', ru: 'Английский идёт в одном блоке с историей Украины, на блок 120 минут, и время между предметами ты распределяешь сам. Обычно на английский выходит около часа.', en: 'English shares a 120-minute block with History of Ukraine; you split the time yourself, usually about an hour for English.' } },
  { q: { uk: 'Який рівень англійської потрібен?', ru: 'Какой уровень английского нужен?', en: 'What level is needed?' }, a: { uk: 'Більшість завдань на рівні B1, найскладніші на B2.', ru: 'Большинство заданий на уровне B1, самые сложные на B2.', en: 'Most tasks are B1, the hardest are B2.' } },
];

export default function NmtEnglishPage() {
  const t = tr();
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: t({ uk: 'НМТ з англійської 2027: структура тесту і теми', ru: 'НМТ по английскому 2027: структура теста и темы', en: 'NMT English 2027: format and topics' }), url: absUrl('/nmt/english'), inLanguage: t({ uk: 'uk', ru: 'ru', en: 'en' }), publisher: { '@type': 'Organization', name: 'Murly' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: t(f.q), acceptedAnswer: { '@type': 'Answer', text: t(f.a) } })) },
  ];
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 8 }}>
        <div className="mu-container">
          <h1>{t({ uk: 'НМТ з англійської', ru: 'НМТ по английскому', en: 'NMT English' })} <em>2027.</em></h1>
          <p className="t-muted">{t({ uk: 'Структура тесту, що вчити і як готуватися. Пробні тести онлайн безкоштовно.', ru: 'Структура теста, что учить и как готовиться. Пробные тесты онлайн бесплатно.', en: 'Test format, what to study and how to prepare. Free online mock tests.' })}</p>
          <p className="nt-cta"><Link href="/nmt/mock" className="mu-btn mu-btn--lime">{t({ uk: 'Пройти пробний НМТ', ru: 'Пройти пробный НМТ', en: 'Take a mock test' })}</Link> <Link href="/nmt/calculator" className="mu-btn">{t({ uk: 'Калькулятор балів', ru: 'Калькулятор баллов', en: 'Score calculator' })}</Link></p>
        </div>
      </section>
      <section className="mu-section nt" style={{ paddingTop: 8 }}>
        <div className="mu-container nt-wrap">
          <h2>{t({ uk: 'Структура тесту', ru: 'Структура теста', en: 'Test format' })}</h2>
          <p>{t({ uk: '32 завдання, 1 бал за кожне, максимум 32 бали. Поріг 5 балів. Аудіювання і письма немає.', ru: '32 задания, 1 балл за каждое, максимум 32 балла. Порог 5 баллов. Аудирования и письма нет.', en: '32 tasks, 1 point each, 32 max. Pass mark 5. No listening or writing.' })}</p>
          <table className="nt-table">
            <thead><tr><th>{t({ uk: 'Частина', ru: 'Часть', en: 'Part' })}</th><th>{t({ uk: 'Завдання', ru: 'Задания', en: 'Questions' })}</th><th>{t({ uk: 'Що треба зробити', ru: 'Что нужно сделать', en: 'What to do' })}</th></tr></thead>
            <tbody>{TASKS.map((x) => <tr key={x.n}><td><b>{x.n}</b></td><td>{x.q}</td><td>{t(x.what)}</td></tr>)}</tbody>
          </table>

          <h2>{t({ uk: 'Теми граматики', ru: 'Темы грамматики', en: 'Grammar topics' })}</h2>
          <ul>{GRAMMAR.map((g) => <li key={g.uk}>{t(g)}</li>)}</ul>
          <p><Link href="/grammar">{t({ uk: 'Граматика з вправами', ru: 'Грамматика с упражнениями', en: 'Grammar with exercises' })}</Link> · <Link href="/irregular-verbs">{t({ uk: 'Таблиця неправильних дієслів', ru: 'Таблица неправильных глаголов', en: 'Irregular verbs table' })}</Link></p>

          <h2>{t({ uk: 'Лексика', ru: 'Лексика', en: 'Vocabulary' })}</h2>
          <ul>{VOCAB.map((g) => <li key={g.uk}>{t(g)}</li>)}</ul>
          <p><Link href="/bonus/nmt-checklist">{t({ uk: 'Вправи на сталі вирази, слова-зв’язки і хибних друзів', ru: 'Упражнения на устойчивые выражения, слова-связки и ложных друзей', en: 'Collocations, linking words and false friends practice' })}</Link></p>

          <h2>{t({ uk: 'План підготовки', ru: 'План подготовки', en: 'Study plan' })}</h2>
          <ol>{PLAN.map((g) => <li key={g.uk}>{t(g)}</li>)}</ol>

          <div className="nc-faq">
            <h2>{t({ uk: 'Питання й відповіді', ru: 'Вопросы и ответы', en: 'FAQ' })}</h2>
            {FAQ.map((f) => <details key={f.q.uk}><summary>{t(f.q)}</summary><p>{t(f.a)}</p></details>)}
            <p className="t-muted nc-src">{t({ uk: 'Формат описано за моделлю НМТ 2026 року. Офіційні зміни на 2027 рік дивись на сайті УЦОЯО (testportal.gov.ua).', ru: 'Формат описан по модели НМТ 2026 года. Официальные изменения на 2027 год смотри на сайте УЦОКО (testportal.gov.ua).', en: 'Based on the 2026 NMT model. Check testportal.gov.ua for official 2027 changes.' })}</p>
          </div>
        </div>
      </section>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
