import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PricingSection from '@/components/PricingSection';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Тарифи Murly: від 0 ₴',
  description: 'Free, Pro для учнів і Tutor для репетиторів. Підготовка до НМТ з англійської, скасування в один клік.',
};

const FAQ = [
  { q: 'Що є у безкоштовному тарифі?', a: 'Один квіз на день, streak і базова статистика. Цього вистачить, щоб зрозуміти, чи підходить тобі Murly.' },
  { q: 'Чим Pro відрізняється від Free?', a: 'Без обмежень на квізи, повні пробники НМТ, детальний розбір кожної помилки і щотижневий прогрес.' },
  { q: 'Як працює тариф Tutor?', a: 'Репетитор отримує кабінет на до 20 учнів: групи, домашка в один клік, прогрес кожного і автозвіт батькам.' },
  { q: 'Можна скасувати будь-коли?', a: 'Так, у кабінеті, в один клік. Доступ лишається до кінця оплаченого періоду, без штрафів.' },
  { q: 'Як оплатити?', a: 'Карткою онлайн, у гривнях. Оплата відкриється разом із кабінетами, а поки квізи можна проходити безкоштовно.' },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-money" />Тарифи</span>
          <h1>Дешевше за один <em>урок</em> з репетитором.</h1>
          <p>Почни безкоштовно. Якщо зайде, переходь на Pro. Скасування в один клік.</p>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <PricingSection />
        </div>
      </section>

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />FAQ</span>
            <h2 className="mu-section__title">Про <em>оплату.</em></h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
