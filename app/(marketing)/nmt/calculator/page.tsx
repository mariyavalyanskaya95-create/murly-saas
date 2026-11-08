import type { Metadata } from 'next';
import Link from 'next/link';
import { alt, absUrl } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import NmtCalculator from '@/components/nmt/NmtCalculator';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Калькулятор балів НМТ 2026: переведення в 100-200', ru: 'Калькулятор баллов НМТ 2026: перевод в 100-200', en: 'NMT 2026 score calculator: test points to 100-200' }),
    description: t({ uk: 'Переведи тестові бали НМТ у шкалу 100-200: англійська, українська, математика, історія та інші. Поріг «склав / не склав» і скільки правильних треба для мети.', ru: 'Переведи тестовые баллы НМТ в шкалу 100-200: английский, украинский, математика, история и другие. Порог «сдал / не сдал» и сколько правильных нужно для цели.', en: 'Convert NMT test points to the 100-200 scale: English, Ukrainian, maths, history and more. Pass mark and how many correct answers you need.' }),
    alternates: alt('/nmt/calculator'),
  };
}

const FAQ = [
  { q: { uk: 'Скільки треба правильних відповідей, щоб скласти НМТ з англійської?', ru: 'Сколько нужно правильных ответов, чтобы сдать НМТ по английскому?', en: 'How many correct answers do I need to pass the NMT English test?' }, a: { uk: 'За цією таблицею поріг для іноземної мови становить 5 тестових балів із 32. Це 100 балів за шкалою 100-200.', ru: 'По этой таблице порог для иностранного языка составляет 5 тестовых баллов из 32. Это 100 баллов по шкале 100-200.', en: 'In this table the pass mark for a foreign language is 5 test points out of 32, which is 100 on the 100-200 scale.' } },
  { q: { uk: 'Скільки правильних треба на 180 з англійської?', ru: 'Сколько правильных нужно на 180 по английскому?', en: 'How many correct answers for 180 in English?' }, a: { uk: '30 тестових балів дають 185, 29 дають 179. Тобто для 180+ потрібно 30 правильних із 32.', ru: '30 тестовых баллов дают 185, 29 дают 179. То есть для 180+ нужно 30 правильных из 32.', en: '30 test points give 185 and 29 give 179, so 180+ needs 30 out of 32.' } },
  { q: { uk: 'Чи змінюється таблиця переведення щороку?', ru: 'Меняется ли таблица перевода каждый год?', en: 'Does the conversion table change every year?' }, a: { uk: 'Може змінюватися. Тут таблиця з правил прийому 2026 року на основі даних УЦОЯО. Остаточні таблиці перевіряй на testportal.gov.ua.', ru: 'Может меняться. Здесь таблица из правил приёма 2026 года на основе данных УЦОКО. Окончательные таблицы проверяй на testportal.gov.ua.', en: 'It can change. This is the table from the 2026 admission rules based on UCEQA data. Check testportal.gov.ua for the final tables.' } },
];

export default function NmtCalculatorPage() {
  const t = tr();
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: t({ uk: 'Калькулятор балів НМТ', ru: 'Калькулятор баллов НМТ', en: 'NMT score calculator' }), url: absUrl('/nmt/calculator'), applicationCategory: 'EducationalApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: 0, priceCurrency: 'UAH' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: t(f.q), acceptedAnswer: { '@type': 'Answer', text: t(f.a) } })) },
  ];
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 8 }}>
        <div className="mu-container">
          <h1>{t({ uk: 'Калькулятор балів', ru: 'Калькулятор баллов', en: 'Score calculator' })} <em>{t({ uk: 'НМТ 2026.', ru: 'НМТ 2026.', en: 'NMT 2026.' })}</em></h1>
          <p className="t-muted">{t({ uk: 'Безкоштовно, без реєстрації. Обери предмет і кількість правильних відповідей.', ru: 'Бесплатно, без регистрации. Выбери предмет и количество правильных ответов.', en: 'Free, no sign-up. Pick a subject and your number of correct answers.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <NmtCalculator />
          <div className="nc-faq">
            <h2>{t({ uk: 'Питання й відповіді', ru: 'Вопросы и ответы', en: 'FAQ' })}</h2>
            {FAQ.map((f) => <details key={f.q.uk}><summary>{t(f.q)}</summary><p>{t(f.a)}</p></details>)}
            <p className="t-muted nc-src">{t({ uk: 'Джерело: таблиці переведення тестових балів НМТ до шкали 100-200 (додаток до правил прийому 2026 року, дані УЦОЯО). Калькулятор довідковий, офіційні результати дивись на testportal.gov.ua.', ru: 'Источник: таблицы перевода тестовых баллов НМТ в шкалу 100-200 (приложение к правилам приёма 2026 года, данные УЦОКО). Калькулятор справочный, официальные результаты смотри на testportal.gov.ua.', en: 'Source: NMT test-to-scale conversion tables (annex to the 2026 admission rules, UCEQA data). For reference only; official results are on testportal.gov.ua.' })}</p>
            <p><Link href="/nmt">{t({ uk: 'Усе про НМТ з англійської', ru: 'Всё про НМТ по английскому', en: 'All about NMT English' })}</Link> · <Link href="/shop/nmt-checklist">{t({ uk: 'Чек-лист підготовки', ru: 'Чек-лист подготовки', en: 'Prep checklist' })}</Link></p>
          </div>
        </div>
      </section>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
