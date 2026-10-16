import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import Icon from '@/components/Icon';
import CatRunner from '@/components/CatRunner';
import { tr } from '@/lib/i18n-server';

export default function NotFound() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <main className="mu-container nf">
        <div className="nf__head">
          <Kit id="st-cat-shock" className="nf__kit" />
          <div>
            <p className="nf__code">404</p>
            <h1>{t({ uk: 'Ой! Котик загубив цю сторінку.', ru: 'Ой! Котик потерял эту страницу.', en: 'Oops! The cat lost this page.' })}</h1>
            <p className="mu-section__lead">{t({
              uk: 'Можливо, вона закотилась під диван разом із клубком. Або посилання з помилкою. Поки шукаємо, пограй: котик тікає від огірків.',
              ru: 'Возможно, она закатилась под диван вместе с клубком. Или в ссылке ошибка. Пока ищем, поиграй: котик убегает от огурцов.',
              en: 'Maybe it rolled under the sofa with the yarn ball. Or the link has a typo. While we look, play a game: the cat is running from cucumbers.',
            })}</p>
          </div>
        </div>
        <CatRunner />
        <p className="nf__tip">{t({
          uk: 'Англійське слово дня: lost (загублений). I’m lost = я заблукав(ла). Ось і ти трохи lost, але ми поруч.',
          ru: 'Английское слово дня: lost (потерянный). I’m lost = я заблудился(лась). Вот и ты немного lost, но мы рядом.',
          en: 'Word of the day: lost. «I’m lost» means you can’t find your way. Don’t worry, we’ll help.',
        })}</p>
        <div className="nf__links">
          <Link href="/" className="mu-btn mu-btn--lime">{t({ uk: 'На головну', ru: 'На главную', en: 'Home' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
          <Link href="/grammar" className="mu-btn">{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</Link>
          <Link href="/irregular-verbs/games" className="mu-btn">{t({ uk: 'Ігри з дієсловами', ru: 'Игры с глаголами', en: 'Verb games' })}</Link>
          <Link href="/nmt" className="mu-btn">{t({ uk: 'НМТ', ru: 'НМТ', en: 'NMT exam' })}</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
