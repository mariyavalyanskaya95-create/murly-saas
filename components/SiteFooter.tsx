import Link from 'next/link';
import Icon from './Icon';
import { LangSwitch } from './LangProvider';
import { tr } from '@/lib/i18n-server';
import Kit from '@/components/Kit';
import { LEGAL } from '@/lib/legal-config';
import { LEGAL_DOCS } from '@/lib/legal';

export default function SiteFooter() {
  const t = tr();
  return (
    <footer className="mu-footer">
      <div className="mu-container">
        <div className="mu-footer__grid">
          <div>
            <div className="mu-logo">MUR<Kit id="st-cat-blep" className="mu-logo__cat" />LY</div>
            <p>{t({
              uk: 'Онлайн-платформа англійської для дітей, підлітків і дорослих. Кабінети для вчителя й учня. Створено в Україні.',
              ru: 'Онлайн-платформа английского для детей, подростков и взрослых. Кабинеты для учителя и ученика. Создано в Украине.',
              en: 'An online English platform for kids, teens and adults. Dashboards for teachers and students. Made in Ukraine.',
            })}</p>
          </div>
          <div>
            <h4>Murly</h4>
            <ul>
              <li><Link href="/#students">{t({ uk: 'Учням', ru: 'Ученикам', en: 'Students' })}</Link></li>
              <li><Link href="/for-teachers">{t({ uk: 'Вчителям', ru: 'Учителям', en: 'Teachers' })}</Link></li>
              <li><Link href="/for-parents">{t({ uk: 'Батькам', ru: 'Родителям', en: 'Parents' })}</Link></li>
              <li><Link href="/baby-english">{t({ uk: 'Англійська з малюком', ru: 'Английский с малышом', en: 'English with little ones' })}</Link></li>
              <li><Link href="/pricing">{t({ uk: 'Тарифи', ru: 'Тарифы', en: 'Pricing' })}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t({ uk: 'НМТ', ru: 'НМТ', en: 'NMT' })}</h4>
            <ul>
              <li><Link href="/nmt">{t({ uk: 'НМТ з англійської', ru: 'НМТ по английскому', en: 'NMT English exam' })}</Link></li>
              <li><Link href="/nmt/mock">{t({ uk: '20 пробних НМТ', ru: '20 пробных НМТ', en: '20 NMT mock tests' })}</Link></li>
              <li><Link href="/bonus/nmt-checklist">{t({ uk: 'Чек-лист НМТ', ru: 'Чек-лист НМТ', en: 'NMT checklist' })}</Link></li>
              <li><Link href="/bonus/100-words">{t({ uk: '100 слів для НМТ', ru: '100 слов для НМТ', en: '100 NMT words' })}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t({ uk: 'Вчитися', ru: 'Учиться', en: 'Learn' })}</h4>
            <ul>
              <li><Link href="/grammar">{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</Link></li>
              <li><Link href="/grammar/trainer">{t({ uk: 'Тренажери граматики', ru: 'Тренажёры грамматики', en: 'Grammar trainers' })}</Link></li>
              <li><Link href="/irregular-verbs">{t({ uk: 'Неправильні дієслова', ru: 'Неправильные глаголы', en: 'Irregular verbs' })}</Link></li>
              <li><Link href="/bonus/verbs-30">{t({ uk: 'Дієслова за 30 днів', ru: 'Глаголы за 30 дней', en: 'Verbs in 30 days' })}</Link></li>
              <li><Link href="/stories">{t({ uk: 'Історії й серіали', ru: 'Истории и сериалы', en: 'Stories and series' })}</Link></li>
              <li><Link href="/practice">{t({ uk: 'Діалоги й тексти', ru: 'Диалоги и тексты', en: 'Dialogues and texts' })}</Link></li>
              <li><Link href="/games">{t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t({ uk: 'Для уроку', ru: 'Для урока', en: 'For lessons' })}</h4>
            <ul>
              <li><Link href="/activities">{t({ uk: 'Розмовні activities', ru: 'Разговорные activities', en: 'Speaking activities' })}</Link></li>
              <li><Link href="/lessons">{t({ uk: 'Готові уроки', ru: 'Готовые уроки', en: 'Ready lessons' })}</Link></li>
              <li><Link href="/search">{t({ uk: 'Пошук матеріалів', ru: 'Поиск материалов', en: 'Find materials' })}</Link></li>
              <li><Link href="/tongue-twisters">{t({ uk: 'Скоромовки', ru: 'Скороговорки', en: 'Tongue twisters' })}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t({ uk: 'Компанія', ru: 'Компания', en: 'Company' })}</h4>
            <ul>
              <li><Link href="/blog"><Icon id="e-book" />{t({ uk: 'Блог', ru: 'Блог', en: 'Blog' })}</Link></li>
              <li><Link href="/about"><Icon id="c-cat" />{t({ uk: 'Про нас', ru: 'О нас', en: 'About us' })}</Link></li>
              <li><Link href="/contact"><Icon id="d-phone" />{t({ uk: 'Контакти', ru: 'Контакты', en: 'Contact' })}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t({ uk: 'Мова сайту', ru: 'Язык сайта', en: 'Language' })}</h4>
            <LangSwitch className="mu-lang--footer" />
          </div>
        </div>
        {LEGAL.ready && (
          <div className="mu-footer__legal">
            {Object.values(LEGAL_DOCS).map((d) => (
              <Link key={d.id} href={d.href}>{t(d.title)}</Link>
            ))}
          </div>
        )}
        <div className="mu-footer__bottom">
          <Icon id="c-cat-sleep" className="mu-ic mu-ic--sleep" />© {new Date().getFullYear()} Murly · {t({ uk: 'Зроблено в Україні', ru: 'Сделано в Украине', en: 'Made in Ukraine' })}
        </div>
      </div>
    </footer>
  );
}
